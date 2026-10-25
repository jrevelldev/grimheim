import { MASTER_EQUIPMENT_LIST } from '../data/index.js';

/**
 * Resolves the name of an equipment item, handling both V1 (name stored) and V2 (id-only) formats.
 * @param {Object} item - Equipment item (may have name, id, or both)
 * @returns {string} The resolved equipment name, or '' if not found
 */
const resolveEquipmentName = (item) => {
    if (item.name) return item.name;
    if (item.id) {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.id === item.id);
        return masterItem ? masterItem.name : '';
    }
    return '';
};

/**
 * Applies armour-related movement penalties if conditions are met.
 * Reduces movement by 1 for:
 *   - Heavy Armour + Shield combo
 *   - Lamellar Armour (standalone)
 *   - Heavy Masterwork Armour (standalone)
 * Unless the fighter has the Armour or Silent Guardian special rules, or the Untiring skill.
 * @param {string} stat - The stat being calculated (only applies to 'M')
 * @param {number} statValue - The current stat value
 * @param {Array} equipment - The fighter's equipment array
 * @param {string} special_rules - The fighter's special rules string
 * @param {Array} skills - The fighter's skills array (skill name strings)
 * @returns {Object} - {value: modified stat value, color: CSS class for display}
 */
export const applyHeavyArmourShieldPenalty = (stat, statValue, equipment, special_rules, skills) => {
    if (stat !== 'M' || statValue <= 0) {
        return { value: statValue, color: '' };
    }

    const hasArmourRule = special_rules?.split('; ').includes('Armour');
    const hasSilentGuardianRule = special_rules?.split('; ').includes('Silent Guardian');
    const hasUntiringSkill = Array.isArray(skills) && skills.includes('Untiring');

    // Resolve equipment names to handle both V1 and V2 formats
    const resolvedEquipment = (equipment || []).map(e => ({ ...e, resolvedName: resolveEquipmentName(e) }));

    const hasHeavyArmour = resolvedEquipment.some(e => e.resolvedName === 'Armour; Heavy' || e.resolvedName === 'Warpstone Armour' || e.resolvedName === 'Lords Boon Armour; Heavy');
    const hasShield = resolvedEquipment.some(e => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === e.resolvedName);
        return masterItem && masterItem.isShield === true;
    });
    const hasLamellar = resolvedEquipment.some(e => e.resolvedName === 'Armour; Lamellar');
    const hasHeavyMasterwork = resolvedEquipment.some(e => e.resolvedName === 'Armour; Heavy Masterwork');

    if (hasArmourRule || hasSilentGuardianRule || hasUntiringSkill) {
        return { value: statValue, color: '' };
    }

    let penalty = 0;
    if (hasHeavyArmour && hasShield) penalty += 1;
    if (hasLamellar) penalty += 1;
    if (hasHeavyMasterwork) penalty += 1;

    if (penalty > 0) {
        return { value: Math.max(0, statValue - penalty), color: 'text-red-400' };
    }

    return { value: statValue, color: '' };
};

/**
 * Applies the Pavise movement penalty if the fighter is equipped with a Pavise.
 * Reduces movement by half, rounded up.
 * @param {string} stat - The stat being calculated (only applies to 'M')
 * @param {number} statValue - The current stat value
 * @param {Array} equipment - The fighter's equipment array
 * @returns {Object} - {value: modified stat value, color: CSS class for display}
 */
export const applyPaviseMovementPenalty = (stat, statValue, equipment) => {
    if (stat !== 'M' || statValue <= 0) {
        return { value: statValue, color: '' };
    }

    const hasPavise = (equipment || []).some(e => resolveEquipmentName(e) === 'Shield; Pavise');

    if (hasPavise) {
        return { value: Math.max(0, Math.ceil(statValue / 2)), color: 'text-red-400' };
    }

    return { value: statValue, color: '' };
};

/**
 * Validates armour compatibility rules for equipment addition.
 * Checks for toughened leather and shield incompatibility.
 * @param {Object} item - The equipment item being added
 * @param {Array} selectedEquipment - The fighter's current equipment array
 * @returns {Object} - {valid: boolean, message: string}
 */
export const validateArmourCompatibility = (item, selectedEquipment) => {
    const hasToughenedLeather = (selectedEquipment || []).some(e => resolveEquipmentName(e) === 'Armour; Toughened Leathers');
    const isAddingShield = item.isShield === true;
    const isAddingToughenedLeather = (item.name || resolveEquipmentName(item)) === 'Armour; Toughened Leathers';
    const hasShield = (selectedEquipment || []).some(e => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === resolveEquipmentName(e));
        return masterItem && masterItem.isShield === true;
    });

    if ((isAddingShield && hasToughenedLeather) || (isAddingToughenedLeather && hasShield)) {
        return { valid: false, message: "A fighter with Toughened Leathers cannot have shields, and vice versa." };
    }

    return { valid: true, message: "" };
};
