import { MASTER_EQUIPMENT_LIST } from '../data/index.js';
import { parseMountStats } from '../utility.js';

/** Validates mount-related equipment rules */
export const validateMountEquipmentRules = (equipment) => {
    const hasBarding = equipment.some(item => item.name === 'Barding' || item.id === 7 || item.id === 96);
    const hasWarhorse = equipment.some(item => item.name === 'Warhorse' || item.id === 45 || item.id === 511);
    const hasHalflingHound = equipment.some(item => item.name === 'Halfling Hound' || item.id === 504);

    if (hasBarding && !hasWarhorse && !hasHalflingHound) {
        return "Barding can only be equipped if the fighter also has a Warhorse or Halfling Hound.";
    }
    return null; // No error
};

/** Applies mount/war beast related stat restructuring if the fighter has mount or war beast equipment */
export const applyMountStats = (equipment, stats) => {
    let finalStats = stats;

    // Check for mounts first (backward compatibility - mounts are singular)
    const mountItem = equipment.find(item => {
        const masterItem = item.id !== undefined
            ? MASTER_EQUIPMENT_LIST.find(i => i.id === item.id)
            : MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
        return masterItem && masterItem.category === 'Mounts';
    });

    if (mountItem) {
        // Handle traditional mount (only one allowed)
        const masterMount = mountItem.id !== undefined
            ? MASTER_EQUIPMENT_LIST.find(i => i.id === mountItem.id)
            : MASTER_EQUIPMENT_LIST.find(i => i.name === mountItem.name);
        const mountStats = parseMountStats(masterMount.rules);
        if (mountStats) {
            finalStats = {
                "Fighter": stats,
                "Mount": mountStats
            };
        }
    } else {
        // Check for war beasts (can be multiple)
        const warBeastItems = equipment.filter(item => {
            const masterItem = item.id !== undefined
                ? MASTER_EQUIPMENT_LIST.find(i => i.id === item.id)
                : MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
            return masterItem && masterItem.category === 'War Beasts';
        });

        if (warBeastItems.length > 0) {
            finalStats = { "Fighter": stats };

            // Add each war beast as a separate stat line
            warBeastItems.forEach((beastItem, index) => {
                const masterBeast = beastItem.id !== undefined
                    ? MASTER_EQUIPMENT_LIST.find(i => i.id === beastItem.id)
                    : MASTER_EQUIPMENT_LIST.find(i => i.name === beastItem.name);
                if (masterBeast && masterBeast.stats) {
                    const displayName = beastItem.name || masterBeast.name;
                    finalStats[displayName] = masterBeast.stats;
                }
            });
        }
    }

    return finalStats;
};

/** Gets mount movement modifier based on equipment */
export const getMountMovementModifier = (equipment) => {
    if ((equipment || []).some(e => e.name === 'Barding' || e.id === 7)) {
        return -1;
    }
    return 0;
};
