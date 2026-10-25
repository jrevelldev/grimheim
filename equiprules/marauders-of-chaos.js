/**
 * Marauders of Chaos warband equipment rules
 * Handles the Chosen of Chaos skill logic that changes race from Marauder of Chaos to Warrior of Chaos
 */

const CHOSEN_OF_CHAOS_SKILL = 'Chosen of Chaos';
const MARAUDER_OF_CHAOS_RACE = 'Marauder of Chaos';
const WARRIOR_OF_CHAOS_RACE = 'Warrior of Chaos';

/**
 * Checks if the fighter has the Chosen of Chaos skill
 * @param {Array} currentSkills - Array of skill names
 * @returns {boolean} True if fighter has Chosen of Chaos skill
 */
export function hasChosenOfChaos(currentSkills) {
    return currentSkills && currentSkills.includes(CHOSEN_OF_CHAOS_SKILL);
}

/**
 * Determines the appropriate race based on Chosen of Chaos skill status
 * @param {Array} currentSkills - Array of skill names
 * @param {string} currentRace - Current race of the fighter
 * @returns {Object} Object containing updated race and change information
 */
export function determineChaosRace(currentSkills, currentRace) {
    const hasChosen = hasChosenOfChaos(currentSkills);
    const isMarauder = currentRace === MARAUDER_OF_CHAOS_RACE;
    const isWarrior = currentRace === WARRIOR_OF_CHAOS_RACE;

    // If fighter has Chosen of Chaos skill and is currently Marauder of Chaos, change to Warrior of Chaos
    if (hasChosen && isMarauder) {
        return {
            race: WARRIOR_OF_CHAOS_RACE,
            changed: true,
            reason: 'Gained Chosen of Chaos skill - promoted to Warrior of Chaos'
        };
    }

    // If fighter no longer has Chosen of Chaos skill but is currently Warrior of Chaos, change back to Marauder
    if (!hasChosen && isWarrior) {
        return {
            race: MARAUDER_OF_CHAOS_RACE,
            changed: true,
            reason: 'Lost Chosen of Chaos skill - demoted to Marauder of Chaos'
        };
    }

    // No change needed
    return {
        race: currentRace,
        changed: false,
        reason: null
    };
}

/**
 * Applies the Chosen of Chaos race change rule
 * @param {Array} currentSkills - Array of skill names
 * @param {string} currentRace - Current race of the fighter
 * @returns {Object} Object containing updated race and change information
 */
export function applyChosenOfChaosRule(currentSkills, currentRace) {
    return determineChaosRace(currentSkills, currentRace);
}

/**
 * Comprehensive function to handle Chosen of Chaos skill changes
 * Call this after any skill change to properly update the race
 * @param {Array} currentSkills - Array of skill names
 * @param {string} currentRace - Current race of the fighter
 * @returns {Object} Object containing updated race and change info
 */
export function handleChosenOfChaosSkillChange(currentSkills, currentRace) {
    // Apply the Chosen of Chaos rule
    const result = applyChosenOfChaosRule(currentSkills, currentRace);
    return result;
}

/**
 * Checks if a fighter is eligible for the Chosen of Chaos skill
 * (i.e., they are currently a Marauder of Chaos)
 * @param {string} currentRace - Current race of the fighter
 * @returns {boolean} True if eligible for Chosen of Chaos skill
 */
export function isEligibleForChosenOfChaos(currentRace) {
    return currentRace === MARAUDER_OF_CHAOS_RACE;
}

/**
 * Gets the appropriate equipment list based on race
 * @param {string} race - Current race of the fighter
 * @returns {string} Equipment list identifier
 */
export function getChaosEquipmentList(race) {
    if (race === WARRIOR_OF_CHAOS_RACE) {
        return 'warrior-of-chaos-equipment';
    }
    return 'marauder-of-chaos-equipment';
}

/**
 * Validates if the current race and skills combination is valid
 * @param {Array} currentSkills - Array of skill names
 * @param {string} currentRace - Current race of the fighter
 * @returns {Object} Validation result with isValid boolean and message
 */
export function validateChaosRaceAndSkills(currentSkills, currentRace) {
    const hasChosen = hasChosenOfChaos(currentSkills);
    const isMarauder = currentRace === MARAUDER_OF_CHAOS_RACE;
    const isWarrior = currentRace === WARRIOR_OF_CHAOS_RACE;

    // If fighter has Chosen of Chaos but is not Warrior of Chaos, this is invalid
    if (hasChosen && !isWarrior) {
        return {
            isValid: false,
            message: 'Fighter has Chosen of Chaos skill but race is not Warrior of Chaos'
        };
    }

    // If fighter is Warrior of Chaos but doesn't have Chosen of Chaos, this might be invalid depending on game rules
    // For now, we'll allow it as they might have gained the race through other means
    if (isWarrior && !hasChosen) {
        return {
            isValid: true,
            message: 'Warrior of Chaos without Chosen of Chaos skill (may be valid depending on game rules)'
        };
    }

    return {
        isValid: true,
        message: 'Race and skills combination is valid'
    };
}

/**
 * Gets additional starting skills for Marauders of Chaos (The Hung) warriors
 * @param {string} warriorName - The name of the warrior
 * @returns {string[]} Array of additional starting skill names
 */
export const getMaraudersOfChaosTheHungStartingSkills = (warriorName) => {
    const additionalSkills = [];

    // Heroes in Marauders of Chaos (The Hung) start with Ride skill
    const heroNames = ["Chieftain", "Seer", "Condemned", "Champions"];

    if (heroNames.includes(warriorName)) {
        additionalSkills.push("Ride");
    }

    return additionalSkills;
};
