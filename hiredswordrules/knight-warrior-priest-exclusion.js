/**
 * Knight of the White Wolf and Warrior Priest of Sigmar Mutual Exclusion Rule
 * These two hiredswords will never work together in the same warband
 */

/**
 * Checks if a Knight of the White Wolf can be hired based on existing warband members
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function canHireKnightOfWhiteWolf(warbandMembers = [], universalHiringAccess = false) {
    // If universal hiring access is enabled, bypass this restriction
    if (universalHiringAccess) {
        return { canHire: true, reason: '' };
    }
    
    // Check if Warrior Priest Of Sigmar already exists in the warband (case-insensitive)
    // Check both the name and if they were originally hired as a Warrior Priest Of Sigmar
    const hasWarriorPriest = warbandMembers.some(member => 
        (member.name && member.name.toLowerCase() === 'warrior priest of sigmar') || 
        (member.originalName && member.originalName.toLowerCase() === 'warrior priest of sigmar') ||
        (member.hiredSwordType && member.hiredSwordType.toLowerCase() === 'warrior priest of sigmar')
    );
    
    if (hasWarriorPriest) {
        return { 
            canHire: false, 
            reason: 'Knight of the White Wolf cannot be hired: Warrior Priest of Sigmar is already in the warband' 
        };
    }
    
    return { canHire: true, reason: '' };
}

/**
 * Checks if a Warrior Priest Of Sigmar can be hired based on existing warband members
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function canHireWarriorPriestOfSigmar(warbandMembers = [], universalHiringAccess = false) {
    // If universal hiring access is enabled, bypass this restriction
    if (universalHiringAccess) {
        return { canHire: true, reason: '' };
    }
    
    // Check if Knight of the White Wolf already exists in the warband (case-insensitive)
    // Check both the name and if they were originally hired as a Knight of the White Wolf
    const hasKnight = warbandMembers.some(member => 
        (member.name && member.name.toLowerCase() === 'knight of the white wolf') || 
        (member.originalName && member.originalName.toLowerCase() === 'knight of the white wolf') ||
        (member.hiredSwordType && member.hiredSwordType.toLowerCase() === 'knight of the white wolf')
    );
    
    if (hasKnight) {
        return { 
            canHire: false, 
            reason: 'Warrior Priest of Sigmar cannot be hired: Knight of the White Wolf is already in the warband' 
        };
    }
    
    return { canHire: true, reason: '' };
}

/**
 * Applies the mutual exclusion rule to a character being hired
 * @param {Object} characterData - The character's data containing selection value
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function applyKnightWarriorPriestExclusion(characterData, warbandMembers = [], universalHiringAccess = false) {
    // Use the selection value (which is the original hired sword name) for validation
    const selectionValue = characterData.selectionValue || characterData.name || '';
    
    // Only apply rule to Knight of the White Wolf and Warrior Priest Of Sigmar (case-insensitive match)
    if (selectionValue.toLowerCase() === 'knight of the white wolf') {
        return canHireKnightOfWhiteWolf(warbandMembers, universalHiringAccess);
    } else if (selectionValue.toLowerCase() === 'warrior priest of sigmar') {
        return canHireWarriorPriestOfSigmar(warbandMembers, universalHiringAccess);
    }
    
    // Not applicable to other characters
    return { canHire: true, reason: '' };
}
