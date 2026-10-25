/**
 * Merchant Caravans warband equipment rules
 * Handles the Ride skill logic for Knights Vanguard
 */

/**
 * Gets additional starting skills for Merchant Caravans warriors
 * @param {string} warriorName - The name of the warrior
 * @returns {string[]} Array of additional starting skill names
 */
export const getMerchantCaravansStartingSkills = (warriorName) => {
    const additionalSkills = [];

    // Knights Vanguard start with Ride skill
    if (warriorName === "Knights Vanguard") {
        additionalSkills.push("Ride");
    }

    // Blackguards start with Strongman skill
    if (warriorName === "Blackguards") {
        additionalSkills.push("Strongman");
    }

    return additionalSkills;
};
