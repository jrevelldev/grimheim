/**
 * Maneaters warband equipment rules
 * Handles special equipment interactions for Maneaters warbands, particularly Lookout-Gnoblar granting Dodge skill
 */

const LOOKOUT_GNOBLAR_ID = 194;
const DODGE_SKILL = 'Dodge';

/**
 * Checks if the Lookout-Gnoblar is in the equipment list
 * @param {Array} selectedEquipment - Array of equipment objects
 * @returns {boolean} True if Lookout-Gnoblar is present
 */
export function hasLookoutGnoblar(selectedEquipment) {
    return selectedEquipment.some(item =>
        item.name === 'Lookout-Gnoblar' || item.id === LOOKOUT_GNOBLAR_ID
    );
}

/**
 * Applies the Lookout-Gnoblar rule - adds Dodge skill
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {Array} currentSkills - Current skills array
 * @returns {Object} Object containing updated skills and whether a change was made
 */
export function applyLookoutGnoblarRule(selectedEquipment, currentSkills) {
    const hasLookout = hasLookoutGnoblar(selectedEquipment);
    const hasDodge = currentSkills.includes(DODGE_SKILL);

    // If fighter has Lookout-Gnoblar, add Dodge skill
    if (hasLookout && !hasDodge) {
        const updatedSkills = [...currentSkills, DODGE_SKILL];
        return {
            skills: updatedSkills,
            changed: true,
            added: true
        };
    }

    return {
        skills: currentSkills,
        changed: false,
        added: false
    };
}

/**
 * Removes the Dodge skill if Lookout-Gnoblar is no longer present
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {Array} currentSkills - Current skills array
 * @returns {Object} Object containing updated skills and whether a change was made
 */
export function removeLookoutGnoblarRule(selectedEquipment, currentSkills) {
    const hasLookout = hasLookoutGnoblar(selectedEquipment);
    const hasDodge = currentSkills.includes(DODGE_SKILL);

    // If fighter doesn't have Lookout-Gnoblar anymore, remove Dodge skill
    if (!hasLookout && hasDodge) {
        const updatedSkills = currentSkills.filter(s => s !== DODGE_SKILL);
        return {
            skills: updatedSkills,
            changed: true,
            removed: true
        };
    }

    return {
        skills: currentSkills,
        changed: false,
        removed: false
    };
}

/**
 * Comprehensive function to handle Lookout-Gnoblar logic
 * Call this after any equipment change to properly update skills
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {Array} currentSkills - Current skills array
 * @returns {Object} Object containing updated skills and change info
 */
export function handleLookoutGnoblarEquipmentChange(selectedEquipment, currentSkills) {
    // First try to apply the rule (in case Lookout-Gnoblar was added)
    const applyResult = applyLookoutGnoblarRule(selectedEquipment, currentSkills);
    if (applyResult.changed) {
        return applyResult;
    }

    // Then try to remove the rule (in case Lookout-Gnoblar was removed)
    const removeResult = removeLookoutGnoblarRule(selectedEquipment, currentSkills);
    return removeResult;
}
