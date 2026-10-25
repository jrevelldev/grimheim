// Cult of the Possessed specific equipment rules
// This module handles the mutation double-cost rule:
// The first mutation bought for a fighter is at the listed price,
// any additional mutations bought for that same fighter are at double cost.

import { MASTER_EQUIPMENT_LIST } from '../data/equipment.js';

/**
 * Counts the number of mutations currently in the fighter's selected equipment.
 * Reads from the f-equipment-json hidden input in the DOM.
 * @returns {number} Number of mutations currently selected
 */
export const countSelectedMutations = () => {
    const jsonInput = document.getElementById('f-equipment-json');
    if (!jsonInput) return 0;

    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        return 0;
    }

    return selectedEquipment.filter(item => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.id === item.id || i.name === item.name);
        return masterItem && masterItem.category === "Mutations";
    }).length;
};

/**
 * Returns display information for Cult of the Possessed mutation cost doubling.
 * The first mutation is at listed price; subsequent mutations cost double.
 * @param {Object} item - The mutation equipment item from MASTER_EQUIPMENT_LIST
 * @param {number} baseCost - The base cost of the mutation
 * @returns {{ displayedCost: number, originalCostText: string, textColor: string }}
 */
export const getCultOfPossessedMutationCostInfo = (item, baseCost) => {
    if (item.category !== "Mutations") {
        return {
            displayedCost: baseCost,
            originalCostText: '',
            textColor: 'slate-400'
        };
    }

    const mutationCount = countSelectedMutations();

    if (mutationCount >= 1) {
        const doubledCost = baseCost * 2;
        return {
            displayedCost: doubledCost,
            originalCostText: ` (Base: ${baseCost} GC, doubled for additional mutation)`,
            textColor: 'red-300'
        };
    }

    return {
        displayedCost: baseCost,
        originalCostText: '',
        textColor: 'slate-400'
    };
};
