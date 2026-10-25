// Order of the Mare specific equipment rules
// This module handles special equipment rules for Order of the Mare warbands

/** Returns the discounted cost for a single item for Order of the Mare */
export const getOrderOfTheMareDiscountedCost = (item, isNew, specificName) => {
    if (isNew && (specificName === 'Paragon' || specificName === 'Gallant')) {
        if (item.name === 'Riding/Draft Horse') {
            return 20; // Half of 40
        } else if (item.name === 'Warhorse') {
            return 40; // Half of 80
        }
    }
    return item.baseCost !== undefined ? item.baseCost : parseFloat(item.cost) || 0;
};

/** Returns display information for Order of the Mare discounts */
export const getOrderOfTheMareDiscountDisplayInfo = (item, isNew, specificName, baseCost) => {
    const discountedCost = getOrderOfTheMareDiscountedCost(item, isNew, specificName);
    if (discountedCost !== baseCost) {
        return {
            displayedCost: discountedCost,
            originalCostText: ` from ${baseCost} GC`,
            textColor: 'green-300'
        };
    }
    return {
        displayedCost: baseCost,
        originalCostText: '',
        textColor: 'slate-400'
    };
};

/**
 * Applies Order of the Mare specific equipment rules.
 * Removes Lance (id 128) from available equipment for Paragon when editing.
 * @param {Array} equipmentList - The list of equipment items to filter
 * @param {string} specificName - The name of the specific warrior type (e.g., "Paragon")
 * @param {boolean} isEditing - Whether the fighter is being edited (true) or added new (false)
 * @returns {Array} - The filtered equipment list
 */
export const applyOrderOfTheMareEquipmentRules = (equipmentList, specificName, isEditing) => {
    if (specificName === 'Paragon' && isEditing) {
        return equipmentList.filter(item => item.id !== 128);
    }
    return equipmentList;
};
