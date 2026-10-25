/**
 * Hiring Validation Logic for Hired Swords and Dramatis Personae
 * Handles alignment and warband-based hiring restrictions
 */

import { applyHighwaymanRoadwardenExclusion } from './hiredswordrules/highwayman-roadwarden-exclusion.js';
import { applyKnightWarriorPriestExclusion } from './hiredswordrules/knight-warrior-priest-exclusion.js';
import { applyNinjaGnoblarFearExclusion } from './hiredswordrules/ninja-gnoblar-fear-exclusion.js';
import { applyDijinKatalExclusion } from './hiredswordrules/dijin-katal-exclusion.js';

/**
 * Main validation function to determine if a character can be hired by a warband
 * @param {Object} characterData - The character's data containing hiring restrictions
 * @param {Object} warbandData - The warband's data containing alignment and name
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @param {Array} warbandMembers - Current warband members (for exclusion rules)
 * @param {string} characterName - The character's name (for exclusion rules)
 * @param {Array} additionalWarbandIdentities - Extra warband identities [{name, alignment}] to also check against (e.g. from Dog of War skill granting Mercenaries (Reikland) hiring access)
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function canHireCharacter(characterData, warbandData, universalHiringAccess = false, warbandMembers = [], characterName = '', additionalWarbandIdentities = []) {
    // If universal hiring access is enabled, bypass all restrictions
    if (universalHiringAccess) {
        return { canHire: true, reason: '' };
    }

    // Apply Highwayman-Roadwarden mutual exclusion rule first
    const exclusionResult = applyHighwaymanRoadwardenExclusion({ selectionValue: characterName }, warbandMembers, universalHiringAccess);
    if (!exclusionResult.canHire) {
        return exclusionResult;
    }

    // Apply Knight of the White Wolf - Warrior Priest of Sigmar mutual exclusion rule
    const knightPriestExclusionResult = applyKnightWarriorPriestExclusion({ selectionValue: characterName }, warbandMembers, universalHiringAccess);
    if (!knightPriestExclusionResult.canHire) {
        return knightPriestExclusionResult;
    }

    // Apply Ninja Gnoblar Fear exclusion rule
    const ninjaGnoblarExclusionResult = applyNinjaGnoblarFearExclusion({ selectionValue: characterName }, warbandMembers, universalHiringAccess);
    if (!ninjaGnoblarExclusionResult.canHire) {
        return ninjaGnoblarExclusionResult;
    }

    // Apply Dijin Katal exclusion rule
    const dijinKatalExclusionResult = applyDijinKatalExclusion({ selectionValue: characterName }, warbandMembers, universalHiringAccess);
    if (!dijinKatalExclusionResult.canHire) {
        return dijinKatalExclusionResult;
    }

    const { may_be_hired_alignment, may_hire, may_not_hire } = characterData;
    const warbandAlignment = warbandData.alignment || '';
    const warbandName = warbandData.name || '';
    
    // Helper to check if the warband name OR any additional warband names match a list
    const nameMatchesList = (list) => {
        if (list.includes(warbandName)) return true;
        return additionalWarbandIdentities.some(identity => list.includes(identity.name));
    };

    // Helper to check if the warband alignment OR any additional warband alignments match a required alignment
    const alignmentMatchesAny = (requiredAlignment) => {
        if (checkAlignmentCompatibility(requiredAlignment, warbandAlignment)) return true;
        return additionalWarbandIdentities.some(identity => checkAlignmentCompatibility(requiredAlignment, identity.alignment));
    };
    
    // Helper function to normalize array data (handle empty strings vs arrays)
    const normalizeArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (typeof data === 'string') {
            return data === '' ? [] : [data];
        }
        return [];
    };
    
    const mayHireArray = normalizeArray(may_hire);
    const mayNotHireArray = normalizeArray(may_not_hire);
    
    // First check may_not_hire - this always blocks hiring
    if (mayNotHireArray.length > 0) {
        if (mayNotHireArray.includes(warbandName)) {
            return { 
                canHire: false, 
                reason: `This character cannot be hired by ${warbandName}` 
            };
        }
    }
    
    // Handle missing alignment (empty string)
    if (!may_be_hired_alignment || may_be_hired_alignment === '') {
        // Character is only available to warbands in may_hire list
        if (mayHireArray.length > 0) {
            if (nameMatchesList(mayHireArray)) {
                return { canHire: true, reason: '' };
            } else {
                return { 
                    canHire: false, 
                    reason: `This character can only be hired by: ${mayHireArray.join(', ')}` 
                };
            }
        } else {
            // No alignment and no may_hire list - not available to anyone
            return { 
                canHire: false, 
                reason: 'This character is not available for hire' 
            };
        }
    }
    
    // Handle specific alignment requirements
    if (may_be_hired_alignment && may_be_hired_alignment !== 'any') {
        // Check if warband alignment (or any additional warband alignment) matches character's required alignment
        const alignmentMatches = alignmentMatchesAny(may_be_hired_alignment);
        
        if (alignmentMatches) {
            return { canHire: true, reason: '' };
        } else {
            // Check if warband is in the may_hire list (exception to alignment rule)
            if (mayHireArray.length > 0) {
                if (nameMatchesList(mayHireArray)) {
                    return { canHire: true, reason: '' };
                }
            }
            return { 
                canHire: false, 
                reason: `This character requires ${may_be_hired_alignment} alignment` 
            };
        }
    }
    
    // Handle "any" alignment - universal availability unless restricted
    if (may_be_hired_alignment === 'any') {
        // If there's a may_hire list, those warbands get priority access
        if (mayHireArray.length > 0) {
            if (nameMatchesList(mayHireArray)) {
                return { canHire: true, reason: '' };
            }
            // For "any" alignment, if not in may_hire, still allow (may_hire is just priority)
            return { canHire: true, reason: '' };
        }
        return { canHire: true, reason: '' };
    }
    
    // Default case - allow hiring if we haven't found a reason to block
    return { canHire: true, reason: '' };
}

/**
 * Checks if warband alignment is compatible with character's required alignment
 * @param {string} characterAlignment - Character's required alignment
 * @param {string} warbandAlignment - Warband's alignment
 * @returns {boolean} - True if compatible
 */
function checkAlignmentCompatibility(characterAlignment, warbandAlignment) {
    if (!characterAlignment || !warbandAlignment) {
        return false;
    }
    
    // Normalize to lowercase for comparison
    const charAlign = characterAlignment.toLowerCase().trim();
    const warAlign = warbandAlignment.toLowerCase().trim();
    
    return charAlign === warAlign;
}

/**
 * Filters a list of characters based on hiring restrictions for a specific warband
 * @param {Array} characters - Array of character objects with data property
 * @param {Object} warbandData - The warband's data
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @param {Array} warbandMembers - Current warband members (for exclusion rules)
 * @param {Array} additionalWarbandIdentities - Extra warband identities [{name, alignment}] to also check against (e.g. from Dog of War skill)
 * @returns {Array} - Array of { character, canHire, reason } objects
 */
export function filterCharactersByHiringRestrictions(characters, warbandData, universalHiringAccess = false, warbandMembers = [], additionalWarbandIdentities = []) {
    return characters.map(character => {
        const validation = canHireCharacter(character.data, warbandData, universalHiringAccess, warbandMembers, character.name, additionalWarbandIdentities);
        return {
            character,
            canHire: validation.canHire,
            reason: validation.reason
        };
    });
}

/**
 * Gets available characters for hiring (filters out unavailable ones)
 * @param {Array} characters - Array of character objects with data property
 * @param {Object} warbandData - The warband's data
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @param {Array} warbandMembers - Current warband members (for exclusion rules)
 * @param {Array} additionalWarbandIdentities - Extra warband identities [{name, alignment}] to also check against (e.g. from Dog of War skill)
 * @returns {Array} - Array of available character objects
 */
export function getAvailableCharacters(characters, warbandData, universalHiringAccess = false, warbandMembers = [], additionalWarbandIdentities = []) {
    const filtered = filterCharactersByHiringRestrictions(characters, warbandData, universalHiringAccess, warbandMembers, additionalWarbandIdentities);
    return filtered
        .filter(item => item.canHire)
        .map(item => item.character);
}

/**
 * Gets hiring availability summary for a character
 * @param {Object} characterData - The character's data
 * @returns {Object} - Summary of hiring conditions
 */
export function getCharacterHiringSummary(characterData) {
    const { may_be_hired_alignment, may_hire, may_not_hire } = characterData;
    
    // Helper function to normalize array data (handle empty strings vs arrays)
    const normalizeArray = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (typeof data === 'string') {
            return data === '' ? [] : [data];
        }
        return [];
    };
    
    const mayHireArray = normalizeArray(may_hire);
    const mayNotHireArray = normalizeArray(may_not_hire);
    
    return {
        requiredAlignment: may_be_hired_alignment || null,
        allowedWarbands: mayHireArray,
        forbiddenWarbands: mayNotHireArray,
        universalAvailability: may_be_hired_alignment === 'any',
        restrictedToWarbandList: !may_be_hired_alignment && mayHireArray.length > 0,
        unavailable: !may_be_hired_alignment && mayHireArray.length === 0
    };
}
