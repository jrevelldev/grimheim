// Battle Monks of Cathay specific equipment rules
// This module handles special equipment restrictions for Battle Monks of Cathay warbands

/**
 * Applies Battle Monks of Cathay specific equipment rules.
 * Removes the entire "Armour" category from available equipment for Warrior Monks and Dragon Monks.
 * @param {Array} equipmentList - The list of equipment items to filter
 * @param {string} specificName - The name of the specific warrior type (e.g., "Warrior Monks", "Dragon Monks")
 * @returns {Array} - The filtered equipment list
 */
export const applyBattleMonksEquipmentRules = (equipmentList, specificName) => {
    if (specificName === 'Warrior Monks' || specificName === 'Dragon Monks') {
        return equipmentList.filter(item => item.category !== 'Armour');
    }
    return equipmentList;
};
