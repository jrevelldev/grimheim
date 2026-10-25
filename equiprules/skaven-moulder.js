/**
 * Gets additional starting skills for Skaven of Clan Moulder warriors
 * @param {string} warriorName - The name of the warrior
 * @returns {string[]} Array of additional starting skill names
 */
export const getSkavenMoulderStartingSkills = (warriorName) => {
    const additionalSkills = [];

    if (warriorName === "Packmaster") {
        additionalSkills.push("Ride");
    }

    return additionalSkills;
};

/**
 * Gets the Beast Handling skill options available for Skaven of Clan Moulder Packmasters
 * @returns {Array<{id: number, name: string}>} Array of skill objects with id and name
 */
export const getPackmasterBeastHandlingOptions = () => [
    { id: 313, name: "Animal Handling (Giant Rats)" },
    { id: 313, name: "Animal Handling (Wolf Rat)" }
];
