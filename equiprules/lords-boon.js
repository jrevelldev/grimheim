import { MASTER_EQUIPMENT_LIST } from '../data/index.js';

/**
 * Validates Lords Boon equipment rules for Bretonnian Chapel Guard
 * Ensures only one Lords Boon item can be equipped per fighter
 */
export const validateLordsBoonEquipmentRules = (selectedEquipment, item) => {
    // Check if the item being added is a Lords Boon item
    if (item.category === "Lords Boon") {
        // Check if any Lords Boon item is already selected
        const hasLordsBoon = selectedEquipment.some(eq => {
            const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
            return masterItem && masterItem.category === "Lords Boon";
        });

        if (hasLordsBoon) {
            return {
                valid: false,
                message: "A fighter may only have one Lords Boon item."
            };
        }
    }

    return { valid: true };
};
