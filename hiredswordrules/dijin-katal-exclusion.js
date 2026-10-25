/**
 * Dijin Katal, The Renegade Assassin Exclusion Rule
 * Dijin Katal will not work for any warband that has the following hired swords:
 * - Wood Elf Hunter
 * - Elf Mage  
 * - Elf Ranger
 * Or the following dramatis personae:
 * - Aenur, the Sword of Twilight
 */

/**
 * Checks if Dijin Katal can be hired based on existing warband members
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function canHireDijinKatal(warbandMembers = [], universalHiringAccess = false) {
    // If universal hiring access is enabled, bypass this restriction
    if (universalHiringAccess) {
        return { canHire: true, reason: '' };
    }
    
    // Define excluded characters
    const excludedHiredSwords = [
        'wood elf hunter',
        'elf mage', 
        'elf ranger'
    ];
    
    const excludedDramatisPersonae = [
        'aenur, the sword of twilight'
    ];
    
    // Check for excluded hired swords in the warband
    const hasExcludedHiredSword = warbandMembers.some(member => {
        const memberName = (member.name || '').toLowerCase();
        const originalName = (member.originalName || '').toLowerCase();
        const hiredSwordType = (member.hiredSwordType || '').toLowerCase();
        
        return excludedHiredSwords.some(excludedName => 
            memberName === excludedName || 
            originalName === excludedName || 
            hiredSwordType === excludedName
        );
    });
    
    if (hasExcludedHiredSword) {
        return { 
            canHire: false, 
            reason: 'Dijin Katal cannot be hired: Warband contains excluded elf hired sword (Wood Elf Hunter, Elf Mage, or Elf Ranger)' 
        };
    }
    
    // Check for excluded dramatis personae in the warband
    const hasExcludedDramatisPersonae = warbandMembers.some(member => {
        const memberName = (member.name || '').toLowerCase();
        const originalName = (member.originalName || '').toLowerCase();
        
        return excludedDramatisPersonae.some(excludedName => 
            memberName === excludedName || 
            originalName === excludedName
        );
    });
    
    if (hasExcludedDramatisPersonae) {
        return { 
            canHire: false, 
            reason: 'Dijin Katal cannot be hired: Aenur, the Sword of Twilight is already in the warband' 
        };
    }
    
    return { canHire: true, reason: '' };
}

/**
 * Applies the Dijin Katal exclusion rule to a character being hired
 * @param {Object} characterData - The character's data containing selection value
 * @param {Array} warbandMembers - Current warband members
 * @param {boolean} universalHiringAccess - Whether universal hiring access is enabled
 * @returns {Object} - { canHire: boolean, reason: string }
 */
export function applyDijinKatalExclusion(characterData, warbandMembers = [], universalHiringAccess = false) {
    // Use the selection value (which is the original character name) for validation
    const selectionValue = characterData.selectionValue || characterData.name || '';
    
    // Only apply rule to Dijin Katal (case-insensitive match)
    if (selectionValue.toLowerCase() === 'dijin katal, the renegade assassin') {
        return canHireDijinKatal(warbandMembers, universalHiringAccess);
    }
    
    // Not applicable to other characters
    return { canHire: true, reason: '' };
}
