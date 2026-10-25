/**
 * Court of the Profane Pleasures equipment rules
 * Handles mutation restrictions for Court of the Profane Pleasures warband
 */

// The three specific mutations allowed for Court of the Profane Pleasures
const ALLOWED_MUTATIONS = ['Great Claw', 'Tentacle', 'Extra Arm'];

/**
 * Validates Court of the Profane Pleasures mutation rules
 * @param {Object} warband - The current warband object
 * @param {Array} equipment - Array of equipment items
 * @param {boolean} isNew - Whether this is a new fighter being created
 * @param {Array} [originalEquipment] - Original equipment of the fighter before editing (only needed when !isNew)
 * @returns {Object} Validation result with valid flag and message
 */
export const validateProfanePleasuresMutations = (warband, equipment, isNew, originalEquipment) => {
    // Only apply rules to Court of the Profane Pleasures warband
    if (warband.type !== "Court of the Profane Pleasures") {
        return { valid: true, message: "" };
    }
    
    // Count mutations from the allowed list
    const mutations = equipment.filter(item => ALLOWED_MUTATIONS.includes(item.name));
    
    // Rule 1: Only one mutation allowed per hero
    if (mutations.length > 1) {
        return { 
            valid: false, 
            message: "Court of the Profane Pleasures heroes can only have one mutation." 
        };
    }
    
    // Rule 2: Mutations can only be added when creating a hero, not when editing
    // When editing, only block if new mutations were actually added (not already present)
    if (!isNew && mutations.length > 0) {
        const originalMutationNames = (originalEquipment || [])
            .filter(item => ALLOWED_MUTATIONS.includes(item.name))
            .map(item => item.name);
        const newMutations = mutations.filter(m => !originalMutationNames.includes(m.name));
        if (newMutations.length > 0) {
            return { 
                valid: false, 
                message: "Mutations can only be added when creating a hero, not when editing." 
            };
        }
    }
    
    return { valid: true, message: "" };
};

/**
 * Checks if a fighter already has a mutation
 * @param {Array} equipment - Array of equipment items
 * @returns {boolean} True if fighter has a mutation
 */
export const hasMutation = (equipment) => {
    return equipment.some(item => ALLOWED_MUTATIONS.includes(item.name));
};

/**
 * Gets the mutation count for a fighter
 * @param {Array} equipment - Array of equipment items
 * @returns {number} Number of mutations
 */
export const getMutationCount = (equipment) => {
    return equipment.filter(item => ALLOWED_MUTATIONS.includes(item.name)).length;
};

/**
 * Checks if a specific mutation can be added to a fighter
 * @param {Array} equipment - Current equipment array
 * @param {string} mutationName - Name of the mutation to add
 * @param {boolean} isNew - Whether this is a new fighter
 * @returns {Object} Validation result
 */
export const canAddMutation = (equipment, mutationName, isNew) => {
    // Check if mutation is allowed for Court of the Profane Pleasures
    if (!ALLOWED_MUTATIONS.includes(mutationName)) {
        return {
            valid: false,
            message: `${mutationName} is not available for Court of the Profane Pleasures heroes.`
        };
    }

    // Check if fighter already has a mutation
    const currentMutationCount = getMutationCount(equipment);
    if (currentMutationCount > 0) {
        return {
            valid: false,
            message: "This hero already has a mutation. Court of the Profane Pleasures heroes can only have one mutation."
        };
    }

    // Check if mutation is being added to existing hero
    if (!isNew) {
        return {
            valid: false,
            message: "Mutations can only be added when creating a hero, not when editing."
        };
    }

    return { valid: true, message: "" };
};

/**
 * Applies Court of the Profane Pleasures specific equipment rules.
 * Removes the entire "Armour" category from available equipment for Slaaneshi Danseuse.
 * @param {Array} equipmentList - The list of equipment items to filter
 * @param {string} specificName - The name of the specific warrior type (e.g., "Slaaneshi Danseuse")
 * @returns {Array} - The filtered equipment list
 */
export const applyProfanePleasuresEquipmentRules = (equipmentList, specificName) => {
    if (specificName === 'Slaaneshi Danseuse') {
        return equipmentList.filter(item => item.category !== 'Armour');
    }
    return equipmentList;
};
