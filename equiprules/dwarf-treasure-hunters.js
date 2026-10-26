// Dwarf Treasure Hunters specific equipment rules
// This module handles special equipment rules for Dwarf Treasure Hunters warbands

/** Applies Dwarf Treasure Hunters specific equipment rules */
export const applyDwarfTreasureHuntersEquipmentRules = (currentWarband, equipment, isPreGame, specialRules) => {
    // Apply Dwarf Treasure Hunters Gromril discount during pre-game build phase with "Gromril" special rule
    if (isPreGame && currentWarband.type === 'Dwarf Treasure Hunters') {
        const hasGromril = specialRules.split('; ').includes('Gromril');
        if (hasGromril) {
            return equipment.map(item => {
                if (item.name === 'Armour; Heavy - Gromril') {
                    return { ...item, cost: Math.floor(item.baseCost / 2) };
                }
                return item;
            });
        }
    }
    return equipment;
};

/** Returns the discounted cost for a single item for Dwarf Treasure Hunters */
export const getDwarfTreasureHunterDiscountedCost = (item, isPreGame, hasGromril) => {
    if (isPreGame && hasGromril) {
        if (item.name === 'Armour; Heavy - Gromril') {
            return Math.floor(item.baseCost / 2);
        } else if (item.category === 'Gromril Weapons') {
            return item.baseCost * 3;
        }
    } else if (item.category === 'Gromril Weapons') {
        return item.baseCost * 4;
    }
    return item.baseCost;
};

/** Returns display information for Dwarf Treasure Hunter discounts */
export const getDwarfDiscountDisplayInfo = (item, isPreGame, hasGromril, baseCost) => {
    const dwarfDiscountedCost = getDwarfTreasureHunterDiscountedCost(item, isPreGame, hasGromril);
    if (dwarfDiscountedCost !== baseCost) {
        let originalCostText = '';
        if (item.name === 'Armour; Heavy - Gromril') {
            originalCostText = ` desde ${baseCost} CO`;
        } else if (item.category === "Gromril Weapons") {
            originalCostText = ` desde ${baseCost * 4} CO`;
        }
        return {
            displayedCost: dwarfDiscountedCost,
            originalCostText,
            textColor: 'green-300'
        };
    }
    return {
        displayedCost: baseCost,
        originalCostText: '',
        textColor: 'slate-400'
    };
};
