/**
 * Applies Bretonnian Chapel Guard specific equipment rules.
 * Removes Lance (id 128) from available equipment for Questing Knight when editing.
 * Removes Helmet (id 6) from available equipment for Knight Errant when editing.
 * @param {Array} equipmentList - The list of equipment items to filter
 * @param {string} specificName - The name of the specific warrior type (e.g., "Questing Knight", "Knight Errant")
 * @param {boolean} isEditing - Whether the fighter is being edited (true) or added new (false)
 * @returns {Array} - The filtered equipment list
 */
export const applyBretonnianChapelGuardEquipmentRules = (equipmentList, specificName, isEditing) => {
    if (specificName === 'Questing Knight' && isEditing) {
        return equipmentList.filter(item => item.id !== 128);
    }
    if (specificName === 'Knight Errant' && isEditing) {
        return equipmentList.filter(item => item.id !== 6);
    }
    return equipmentList;
};
