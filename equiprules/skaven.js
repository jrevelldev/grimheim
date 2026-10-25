/**
 * Skaven warband equipment rules
 * Handles special equipment interactions for Skaven warbands, particularly Clan Pestilens Plague Priests
 */

const LIBER_BUBONICUS_ID = 179;
const MAGIC_OF_THE_HORNED_RAT_RULE = 'Magic of the Horned Rat';

/**
 * Checks if the Liber Bubonicus is in the equipment list
 * @param {Array} selectedEquipment - Array of equipment objects
 * @returns {boolean} True if Liber Bubonicus is present
 */
export function hasLiberBubonicus(selectedEquipment) {
    return selectedEquipment.some(item =>
        item.name === 'Liber Bubonicus' || item.id === LIBER_BUBONICUS_ID
    );
}

/**
 * Checks if a fighter is a Plague Priest based on warrior type
 * @param {string} warriorChoice - The warrior type name
 * @returns {boolean} True if the fighter is a Plague Priest
 */
export function isPlaguePriest(warriorChoice) {
    return warriorChoice && warriorChoice.toLowerCase() === 'plague priest';
}

/**
 * Checks if Magic of the Horned Rat is an inherent rule (not granted by equipment)
 * Eshin Sorcerers have Magic of the Horned Rat as an inherent rule
 * @param {string} warriorChoice - The warrior type name
 * @returns {boolean} True if Magic of the Horned Rat is inherent to this warrior type
 */
export function hasInherentMagicOfTheHornedRat(warriorChoice) {
    const hornedRatWarriors = ['Eshin Sorcerer'];
    return hornedRatWarriors.includes(warriorChoice);
}

/**
 * Parses special rules string into an array
 * @param {string} rulesString - Semicolon-separated rules string
 * @returns {Array<string>} Array of trimmed rule strings
 */
function parseSpecialRules(rulesString) {
    if (!rulesString || rulesString === '(None)') return [];
    return rulesString.split(';').map(r => r.trim()).filter(r => r && r !== '(None)');
}

/**
 * Joins special rules array back into a string
 * @param {Array<string>} rulesArray - Array of rule strings
 * @returns {string} Semicolon-separated rules string
 */
function joinSpecialRules(rulesArray) {
    if (!rulesArray || rulesArray.length === 0) return '(None)';
    return rulesArray.join('; ');
}

/**
 * Applies the Liber Bubonicus rule - adds Magic of the Horned Rat to Plague Priests
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {string} currentSpecialRules - Current special rules string
 * @param {string} warriorChoice - The warrior type name
 * @returns {Object} Object containing updated rules and whether a change was made
 */
export function applyLiberBubonicusRule(selectedEquipment, currentSpecialRules, warriorChoice) {
    const rules = parseSpecialRules(currentSpecialRules);
    const hasLiber = hasLiberBubonicus(selectedEquipment);
    const isPlaguePriestFighter = isPlaguePriest(warriorChoice);
    const hasHornedRatMagic = rules.includes(MAGIC_OF_THE_HORNED_RAT_RULE);

    // If fighter is a Plague Priest and has Liber Bubonicus, add Magic of the Horned Rat
    if (hasLiber && isPlaguePriestFighter && !hasHornedRatMagic) {
        rules.push(MAGIC_OF_THE_HORNED_RAT_RULE);
        return {
            specialRules: joinSpecialRules(rules),
            changed: true,
            added: true
        };
    }

    return {
        specialRules: currentSpecialRules,
        changed: false,
        added: false
    };
}

/**
 * Removes the Magic of the Horned Rat rule if Liber Bubonicus is no longer present
 * Only removes if Magic of the Horned Rat was granted by the book (not inherent)
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {string} currentSpecialRules - Current special rules string
 * @param {string} warriorChoice - The warrior type name
 * @returns {Object} Object containing updated rules and whether a change was made
 */
export function removeLiberBubonicusRule(selectedEquipment, currentSpecialRules, warriorChoice) {
    const rules = parseSpecialRules(currentSpecialRules);
    const hasLiber = hasLiberBubonicus(selectedEquipment);
    const isPlaguePriestFighter = isPlaguePriest(warriorChoice);
    const hasHornedRatMagic = rules.includes(MAGIC_OF_THE_HORNED_RAT_RULE);
    const inherentHornedRatMagic = hasInherentMagicOfTheHornedRat(warriorChoice);

    // If Plague Priest doesn't have Liber Bubonicus anymore, remove Magic of the Horned Rat
    // But only if it's not an inherent rule
    if (!hasLiber && isPlaguePriestFighter && hasHornedRatMagic && !inherentHornedRatMagic) {
        const updatedRules = rules.filter(r => r !== MAGIC_OF_THE_HORNED_RAT_RULE);
        return {
            specialRules: joinSpecialRules(updatedRules),
            changed: true,
            removed: true
        };
    }

    return {
        specialRules: currentSpecialRules,
        changed: false,
        removed: false
    };
}

/**
 * Comprehensive function to handle Liber Bubonicus logic
 * Call this after any equipment change to properly update special rules
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {string} currentSpecialRules - Current special rules string
 * @param {string} warriorChoice - The warrior type name
 * @returns {Object} Object containing updated rules and change info
 */
export function handleLiberBubonicusEquipmentChange(selectedEquipment, currentSpecialRules, warriorChoice) {
    // First try to apply the rule (in case Liber was added)
    const applyResult = applyLiberBubonicusRule(selectedEquipment, currentSpecialRules, warriorChoice);
    if (applyResult.changed) {
        return applyResult;
    }

    // Then try to remove the rule (in case Liber was removed)
    const removeResult = removeLiberBubonicusRule(selectedEquipment, currentSpecialRules, warriorChoice);
    return removeResult;
}
