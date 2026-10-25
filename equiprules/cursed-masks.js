import { currentWarband } from '../state.js';

/** Validates Cursed Mask equipment rules - only one of each mask type per warband */
export const validateCursedMaskEquipmentRules = (item) => {
    // Check if the item is a Cursed Mask
    const cursedMaskNames = [
        "Sun King Mask",
        "Silver Death Mask",
        "Fish Head Mask",
        "Faceless Mask",
        "Plague Doctor Mask",
        "Evil Jester Mask"
    ];

    if (!cursedMaskNames.includes(item.name)) {
        return { valid: true };
    }

    // Check if this mask is already equipped by any fighter in the warband
    if (currentWarband && currentWarband.members) {
        for (const fighter of currentWarband.members) {
            if (fighter.equipment) {
                // Check if this fighter has the same mask equipped
                const hasMask = fighter.equipment.some(eq => eq.name === item.name);
                if (hasMask) {
                    return {
                        valid: false,
                        message: `A warband may only have one ${item.name}. This mask is already equipped by ${fighter.name}.`
                    };
                }
            }
        }
    }

    return { valid: true };
};
