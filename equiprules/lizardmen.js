// Lizardmen specific equipment rules
// This module handles special equipment rules for Lizardmen warbands

/** Returns display information for Lizardmen equipment costs */
export const getLizardmenDiscountDisplayInfo = (item, baseCost) => {
    if (item.name === 'Armour; Light') {
        return {
            displayedCost: 50,
            originalCostText: ' from 20 GC',
            textColor: 'green-300'
        };
    }
    // For other items, use the base cost since calculateModifiedCost should handle specific hero modifiers
    return {
        displayedCost: baseCost,
        originalCostText: '',
        textColor: 'slate-400'
    };
};

/**
 * Filters available skills for Lizardmen warbands based on race restrictions
 * @param {Array} availableSkills - Array of skills to filter
 * @param {Object} fighter - The fighter object containing race information
 * @returns {Array} Filtered array of skills
 */
export const filterLizardmenSkillsByRace = (availableSkills, fighter) => {
    return availableSkills.filter(skill => {
        // Check if this skill is for Lizardmen (handle both string and array categories)
        const isLizardmenSkill = skill.category === "Lizardmen" || 
                                (Array.isArray(skill.category) && skill.category.includes("Lizardmen"));
        
        if (isLizardmenSkill) {
            if (skill.name === "Infiltration" || skill.name === "Great Hunter") {
                return fighter.race === "Skink" || fighter.race === "Skinks";
            } else if (skill.name === "Bellowing Battle Roar" || skill.name === "Toughened Hide") {
                return fighter.race === "Saurus";
            }
        }
        return true; // Allow other skills
    });
};
