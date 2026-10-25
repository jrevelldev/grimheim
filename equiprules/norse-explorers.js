// Norse Explorers Berserker specific equipment rules
// This module handles special equipment restrictions for Norse Explorers Berserker warriors

/**
 * Applies Norse Explorers Berserker specific equipment rules.
 * Removes the entire "Armour" category from available equipment for Berserker warriors.
 * @param {Array} equipmentList - The list of equipment items to filter
 * @param {string} specificName - The name of the specific warrior type (e.g., "Berserker")
 * @returns {Array} - The filtered equipment list
 */
export const applyNorseExplorersEquipmentRules = (equipmentList, specificName) => {
    if (specificName === 'Berserker') {
        return equipmentList.filter(item => item.category !== 'Armour');
    }
    return equipmentList;
};
