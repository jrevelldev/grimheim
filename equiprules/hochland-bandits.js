// Hochland Bandits specific equipment rules
// This module handles special equipment rules for Hochland Bandits warbands

/** Returns display information for Hochland Bandits pistol discounts for new fighters */
export const getHochlandBanditDiscountDisplayInfo = (item, isNewFighter, baseCost) => {
    if (item.category === "Blackpowder" && isNewFighter) {
        if (item.name === 'Pistol') {
            return {
                displayedCost: 20,
                originalCostText: ' from 15 GC',
                textColor: 'green-300'
            };
        } else if (item.name === 'Pistol; Duelling') {
            return {
                displayedCost: 30,
                originalCostText: '',
                textColor: 'slate-400'
            };
        }
    }
    return {
        displayedCost: baseCost,
        originalCostText: '',
        textColor: 'slate-400'
    };
};
