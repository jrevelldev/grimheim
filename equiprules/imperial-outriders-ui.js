// Imperial Outriders specific UI logic
// This module handles special equipment rules for Imperial Outriders warbands

import { MASTER_EQUIPMENT_LIST } from '../data/index.js';
import { renderEquipmentSelector } from '../equipment-management.js';

/** Returns the discounted cost for a single item for Imperial Outriders */
export const getImperialOutridersDiscountedCost = (item, isNew) => {
    if (isNew && item.name === 'Warhorse') {
        return 40; // Half of 80
    }
    return item.baseCost !== undefined ? item.baseCost : parseFloat(item.cost) || 0;
};

/** Returns display information for Imperial Outriders discounts */
export const getImperialOutridersDiscountDisplayInfo = (item, isNew, baseCost) => {
    const discountedCost = getImperialOutridersDiscountedCost(item, isNew);
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

/** Applies Imperial Outriders specific equipment rules */
export const applyImperialOutridersEquipmentRules = (currentWarband) => {
    // Automatically add Riding Horse at no cost for Imperial Outriders
    if (currentWarband.type === 'Imperial Outriders') {
        const ridingHorse = MASTER_EQUIPMENT_LIST.find(i => i.id === 46);
        if (ridingHorse) {
            const equipment = [{ id: ridingHorse.id, cost: 0 }];
            renderEquipmentSelector(equipment);
        }
    }
};
