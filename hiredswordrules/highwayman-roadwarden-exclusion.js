/**
 * Highwayman and Roadwarden Mutual Exclusion Rule
 * These two hiredswords will never work together in the same warband
 */

/**
 * Checks if a Highwayman can be hired based on existing warband members
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function canHireHighwayman(warbandMembers = [], universalHiringAccess = false) {
    // If universal hiring access is enabled, bypass this restriction
    if (universalHiringAccess) {
        return { canHire: true, reason: '' };
    }
    
    // Check if Roadwarden already exists in the warband (case-insensitive)
    // Check both the name and if they were originally hired as a Roadwarden
    const hasRoadwarden = warbandMembers.some(member => 
        (member.name && member.name.toLowerCase() === 'roadwarden') || 
        (member.originalName && member.originalName.toLowerCase() === 'roadwarden') ||
        (member.hiredSwordType && member.hiredSwordType.toLowerCase() === 'roadwarden')
    );
    
    if (hasRoadwarden) {
        return { 
            canHire: false, 
            reason: 'Highwayman cannot be hired: Roadwarden is already in the warband' 
        };
    }
    
    return { canHire: true, reason: '' };
}

/**
 * Checks if a Roadwarden can be hired based on existing warband members
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function canHireRoadwarden(warbandMembers = [], universalHiringAccess = false) {
    // If universal hiring access is enabled, bypass this restriction
    if (universalHiringAccess) {
        return { canHire: true, reason: '' };
    }
    
    // Check if Highwayman already exists in the warband (case-insensitive)
    // Check both the name and if they were originally hired as a Highwayman
    const hasHighwayman = warbandMembers.some(member => 
        (member.name && member.name.toLowerCase() === 'highwayman') || 
        (member.originalName && member.originalName.toLowerCase() === 'highwayman') ||
        (member.hiredSwordType && member.hiredSwordType.toLowerCase() === 'highwayman')
    );
    
    if (hasHighwayman) {
        return { 
            canHire: false, 
            reason: 'Roadwarden cannot be hired: Highwayman is already in the warband' 
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
export function applyHighwaymanRoadwardenExclusion(characterData, warbandMembers = [], universalHiringAccess = false) {
    // Use the selection value (which is the original hired sword name) for validation
    const selectionValue = characterData.selectionValue || characterData.name || '';
    
    // Only apply rule to Highwayman and Roadwarden (case-insensitive match)
    if (selectionValue.toLowerCase() === 'highwayman') {
        return canHireHighwayman(warbandMembers, universalHiringAccess);
    } else if (selectionValue.toLowerCase() === 'roadwarden') {
        return canHireRoadwarden(warbandMembers, universalHiringAccess);
    }
    
    // Not applicable to other characters
    return { canHire: true, reason: '' };
}
