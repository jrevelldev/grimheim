/**
 * Ninja Gnoblar Fear Exclusion Rule
 * Ninja Gnoblar cannot be hired by warbands that have members with the Fear special rule
 */

/**
 * Checks if a Ninja Gnoblar can be hired based on existing warband members having Fear
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function canHireNinjaGnoblar(warbandMembers = [], universalHiringAccess = false) {
    // If universal hiring access is enabled, bypass this restriction
    if (universalHiringAccess) {
        return { canHire: true, reason: '' };
    }
    
    // Check if any member has the Fear special rule
    const hasFearMember = warbandMembers.some(member => {
        if (!member.special_rules) return false;
        
        // Parse the special rules string (semicolon-separated)
        const rulesArray = member.special_rules.split(';').map(rule => rule.trim());
        
        // Check if any rule is "Fear" (case-insensitive)
        return rulesArray.some(rule => rule.toLowerCase() === 'fear');
    });
    
    if (hasFearMember) {
        return { 
            canHire: false, 
            reason: 'Ninja Gnoblar cannot be hired: Warband contains members with Fear special rule' 
        };
    }
    
    return { canHire: true, reason: '' };
}

/**
 * Applies the Ninja Gnoblar Fear exclusion rule to a character being hired
 * @param {Object} characterData - The character's data containing selection value
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function applyNinjaGnoblarFearExclusion(characterData, warbandMembers = [], universalHiringAccess = false) {
    // Use the selection value (which is the original hired sword name) for validation
    const selectionValue = characterData.selectionValue || characterData.name || '';
    
    // Only apply rule to Ninja Gnoblar (case-insensitive match)
    if (selectionValue.toLowerCase() === 'ninja gnoblar') {
        return canHireNinjaGnoblar(warbandMembers, universalHiringAccess);
    }
    
    // Not applicable to other characters
    return { canHire: true, reason: '' };
}
