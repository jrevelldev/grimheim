// Night Goblins Web specific equipment rules
// This module handles special equipment rules for Night Goblins Web warbands

/** Returns display information for Night Goblins Web spear discount during pre-game build phase */
export const getNightGoblinsWebDiscountDisplayInfo = (item, isPreGame, specificName, baseCost) => {
    // Night Goblin Warriors get Spears at 5 GC during pre-game build phase
    if (item.name === 'Spear' && isPreGame && specificName === 'Night Goblin Warriors') {
        return {
            displayedCost: 5,
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

/** Returns the discounted cost for a single item for Night Goblins Web */
export const getNightGoblinsWebDiscountedCost = (item, isPreGame, specificName) => {
    if (item.name === 'Spear' && isPreGame && specificName === 'Night Goblin Warriors') {
        return 5;
    }
    return item.baseCost !== undefined ? item.baseCost : parseFloat(item.cost) || 0;
};
