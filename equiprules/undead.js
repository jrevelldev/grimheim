/**
 * Undead warband equipment rules
 * Handles special equipment interactions for Undead warbands, particularly Vampires
 */

const BOOK_OF_THE_DEAD_ID = 178;
const NECROMANCY_RULE = 'Necromancy';

/**
 * Checks if the Book of the Dead is in the equipment list
 * @param {Array} selectedEquipment - Array of equipment objects
 * @returns {boolean} True if Book of the Dead is present
 */
export function hasBookOfTheDead(selectedEquipment) {
    return selectedEquipment.some(item => 
        item.name === 'Book of the Dead' || item.id === BOOK_OF_THE_DEAD_ID
    );
}

/**
 * Checks if a fighter is a Vampire based on race
 * @param {string} race - The fighter's race
 * @returns {boolean} True if the fighter is a Vampire
 */
export function isVampire(race) {
    return race && race.toLowerCase() === 'vampire';
}

/**
 * Checks if Necromancy is an inherent rule (not granted by equipment)
 * Necromancers have Necromancy as an inherent rule
 * @param {string} warriorChoice - The warrior type name
 * @returns {boolean} True if Necromancy is inherent to this warrior type
 */
export function hasInherentNecromancy(warriorChoice) {
    const necromancyWarriors = ['Necromancer'];
    return necromancyWarriors.includes(warriorChoice);
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
 * Applies the Book of the Dead rule - adds Necromancy to Vampires
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {string} currentSpecialRules - Current special rules string
 * @param {string} fighterRace - The fighter's race
 * @param {string} warriorChoice - The warrior type name (to check for inherent Necromancy)
 * @returns {Object} Object containing updated rules and whether a change was made
 */
export function applyBookOfTheDeadRule(selectedEquipment, currentSpecialRules, fighterRace, warriorChoice) {
    const rules = parseSpecialRules(currentSpecialRules);
    const hasBook = hasBookOfTheDead(selectedEquipment);
    const isVampireFighter = isVampire(fighterRace);
    const hasNecromancy = rules.includes(NECROMANCY_RULE);
    
    // If fighter is a Vampire and has Book of the Dead, add Necromancy
    if (hasBook && isVampireFighter && !hasNecromancy) {
        rules.push(NECROMANCY_RULE);
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
 * Removes the Necromancy rule if Book of the Dead is no longer present
 * Only removes if Necromancy was granted by the book (not inherent)
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {string} currentSpecialRules - Current special rules string
 * @param {string} fighterRace - The fighter's race
 * @param {string} warriorChoice - The warrior type name (to check for inherent Necromancy)
 * @returns {Object} Object containing updated rules and whether a change was made
 */
export function removeBookOfTheDeadRule(selectedEquipment, currentSpecialRules, fighterRace, warriorChoice) {
    const rules = parseSpecialRules(currentSpecialRules);
    const hasBook = hasBookOfTheDead(selectedEquipment);
    const isVampireFighter = isVampire(fighterRace);
    const hasNecromancy = rules.includes(NECROMANCY_RULE);
    const inherentNecromancy = hasInherentNecromancy(warriorChoice);
    
    // If Vampire doesn't have Book of the Dead anymore, remove Necromancy
    // But only if it's not an inherent rule
    if (!hasBook && isVampireFighter && hasNecromancy && !inherentNecromancy) {
        const updatedRules = rules.filter(r => r !== NECROMANCY_RULE);
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
 * Comprehensive function to handle Book of the Dead logic
 * Call this after any equipment change to properly update special rules
 * @param {Array} selectedEquipment - Array of equipment objects
 * @param {string} currentSpecialRules - Current special rules string
 * @param {string} fighterRace - The fighter's race
 * @param {string} warriorChoice - The warrior type name
 * @returns {Object} Object containing updated rules and change info
 */
export function handleBookOfTheDeadEquipmentChange(selectedEquipment, currentSpecialRules, fighterRace, warriorChoice) {
    // First try to apply the rule (in case book was added)
    const applyResult = applyBookOfTheDeadRule(selectedEquipment, currentSpecialRules, fighterRace, warriorChoice);
    if (applyResult.changed) {
        return applyResult;
    }
    
    // Then try to remove the rule (in case book was removed)
    const removeResult = removeBookOfTheDeadRule(selectedEquipment, currentSpecialRules, fighterRace, warriorChoice);
    return removeResult;
}
