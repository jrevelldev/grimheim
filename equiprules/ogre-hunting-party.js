/**
 * Gets additional starting skills for Ogre Hunting Party warriors
 * @param {string} warriorName - The name of the warrior
 * @returns {string[]} Array of additional starting skill names
 */
export const getOgreHuntingPartyStartingSkills = (warriorName) => {
    const additionalSkills = [];

    if (warriorName === "Ogre Hunter") {
        additionalSkills.push("Sabre Trainer");
    }

    return additionalSkills;
};

/**
 * Gets the skill options available for Ogre Hunting Party Trappers
 * @returns {Array<{id: number, name: string}>} Array of skill objects with id and name
 */
export const getTrapperSkillOptions = () => [
    { id: 133, name: "Infiltration" },
    { id: 267, name: "Set Traps" },
    { id: 268, name: "Netter" },
    { id: 265, name: "Scent Hound" }
];
