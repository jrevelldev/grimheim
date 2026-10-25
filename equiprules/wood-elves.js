// Wood Elves specific equipment rules

/**
 * Checks if the Elf Bow should have its variable cost bypassed for Wood Elves.
 * Wood Elves of Athel Loren always purchase the Elf Bow at a set cost of 35 GC,
 * regardless of the game phase.
 * @param {Object} item - The equipment item
 * @param {string} warbandType - The type/name of the warband
 * @param {Object} currentWarband - The global current warband state object
 * @returns {boolean} True if variable cost should be bypassed
 */
export const shouldBypassElfBowVariableCost = (item, warbandType, currentWarband) => {
    if (!item) return false;
    const itemId = item.id;
    const isElfBow = itemId === 153 || item.name === "Bow; Elf";
    const isWoodElves = warbandType === "Wood Elves of Athel Loren" || (currentWarband && currentWarband.type === "Wood Elves of Athel Loren");

    return isElfBow && isWoodElves;
};
