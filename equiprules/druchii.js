// Druchii specific equipment rules
// This module handles special equipment rules for Druchii (Dark Elf) fighters

/** Returns display information for Druchii Crossbow Repeater discount for new Dark Elf fighters */
export const getDruchiiDiscountDisplayInfo = (item, race, isNewFighter, baseCost) => {
    if (item.name === "Crossbow; Repeater" && race === "Dark Elf" && isNewFighter) {
        return {
            displayedCost: 20,
            originalCostText: ' from 40 GC',
            textColor: 'green-300'
        };
    }
    return {
        displayedCost: baseCost,
        originalCostText: '',
        textColor: 'slate-400'
    };
};