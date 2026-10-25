/** Validates Sisters of Sigmar specific equipment rules */
export const validateSistersOfSigmarEquipmentRules = (equipment, fighterName, warbandType) => {
    if (warbandType !== 'Sisters of Sigmar') {
        return { valid: true };
    }

    // Check if fighter is eligible for two Sigmarite Warhammers
    const eligibleFighters = ['Sigmarite Matriarch', 'Sister Superior'];
    const isEligible = eligibleFighters.includes(fighterName);

    // Count existing Sigmarite Warhammers
    const sigmariteHammerCount = equipment.filter(item => item.name === 'Warhammer; Sigmarite').length;

    if (!isEligible && sigmariteHammerCount >= 1) {
        return {
            valid: false,
            message: 'Only Sigmarite Matriarchs and Sister Superiors may carry two Sigmarite warhammers. Other fighters are limited to one.'
        };
    }

    if (isEligible && sigmariteHammerCount > 2) {
        return {
            valid: false,
            message: 'Fighters may carry a maximum of two Sigmarite warhammers.'
        };
    }

    return { valid: true };
};

/** Applies Sisters of Sigmar equipment rules during fighter saving/updating */
export const applySistersOfSigmarEquipmentRules = (warband, equipment, isNew, specialRules) => {
    // For Sisters of Sigmar, ensure Sigmarite Warhammer rules are enforced
    // This is mainly for any future cost modifications or special handling
    return equipment;
};
