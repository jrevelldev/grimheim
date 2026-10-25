import { MAGIC } from './data/magic.js';
import { currentWarband } from './state.js';

export { MAGIC };

/**
 * Checks if a fighter has a special rule that matches any magic group name.
 * @param {Object} fighter - The fighter object with special_rules property.
 * @returns {boolean} True if the fighter has a matching magic rule.
 */
export function checkFighterHasMagicRule(fighter) {
    if (!fighter) return false;

    // Check for Arcane Lore skill granting Lesser Magic
    if (fighter.skills && fighter.skills.some(skill => skill === 'Arcane Lore')) return true;

    if (!fighter.special_rules) return false;

    const rules = fighter.special_rules.split(';').map(r => r.trim().toLowerCase());
    const magicGroups = Object.keys(MAGIC).map(group => group.toLowerCase());

    return rules.some(rule => magicGroups.includes(rule));
}

/**
 * Gets the magic group name that matches the fighter's special rules or chosen lore.
 * @param {Object} fighter - The fighter object.
 * @returns {string|null} The matching magic group name or null.
 */
export function getMagicGroupForFighter(fighter) {
    if (!fighter) return null;

    // If chosen_magic_lore is set, use that
    if (fighter.chosen_magic_lore) {
        return fighter.chosen_magic_lore;
    }

    if (!fighter.special_rules) return null;

    const rules = fighter.special_rules.split(';').map(r => r.trim());
    const magicGroups = Object.keys(MAGIC);

    return magicGroups.find(group => rules.includes(group)) || null;
}

/**
 * Gets the list of spell names for a given magic group.
 * @param {string} groupName - The name of the magic group.
 * @returns {Array<string>} Array of spell names.
 */
export function getSpellsForGroup(groupName) {
    const group = MAGIC[groupName];
    if (!group) return [];

    return group.map(spell => spell.name);
}

/**
 * Gets starting spells from a warrior's data.
 * @param {Object} warrior - The warrior object.
 * @returns {Array<string>} Array of starting spell names.
 */
export function getStartingSpells(warrior) {
    if (!warrior) return [];
    
    if (warrior.starting_spells && Array.isArray(warrior.starting_spells)) {
        return warrior.starting_spells;
    }
    
    return [];
}

/**
 * Renders the magic selection UI for the fighter modal.
 * @param {Object} fighter - The fighter object (optional, for edit mode).
 * @param {Array<string>} startingSpells - Optional array of starting spells to pre-select.
 */
export function renderMagicSelection(fighter, startingSpells = []) {
    const magicSection = document.getElementById('magic-selection-section');
    const magicLoreSelection = document.getElementById('magic-lore-selection');
    const magicSpellsContainer = document.getElementById('magic-spells-container');
    const magicLoreSelect = document.getElementById('magic-lore-select');

    // For new fighters, check the special rules input field
    let specialRules = '';
    let fighterSkills = [];

    if (fighter && fighter.special_rules) {
        specialRules = fighter.special_rules;
    } else {
        // Check the hidden input for special rules
        const specialRulesInput = document.getElementById('f-special-rules');
        if (specialRulesInput) {
            specialRules = specialRulesInput.value;
        }
    }

    // Get fighter skills from either fighter object or hidden input
    if (fighter && fighter.skills) {
        fighterSkills = fighter.skills;
    } else {
        // Check the hidden input for skills
        const skillsInput = document.getElementById('f-skills-hidden');
        if (skillsInput) {
            try {
                fighterSkills = JSON.parse(skillsInput.value) || [];
            } catch (e) {
                fighterSkills = [];
            }
        }
    }
    
    // For V2 warbands, also check for magic field
    const isV2Warband = currentWarband && currentWarband._isV2;
    if (isV2Warband && fighter && fighter.magic) {
        // Add magic spells to fighterSkills for pre-selection
        fighterSkills = [...new Set([...fighterSkills, ...fighter.magic])];
    } else if (isV2Warband) {
        // Check magic hidden input for V2 warbands
        const magicInput = document.getElementById('f-magic-hidden');
        if (magicInput) {
            try {
                const magicSpells = JSON.parse(magicInput.value) || [];
                fighterSkills = [...new Set([...fighterSkills, ...magicSpells])];
            } catch (e) {
                // Ignore magic input errors
            }
        }
    }

    // Merge starting spells with existing fighter skills for pre-selection
    if (startingSpells && startingSpells.length > 0) {
        fighterSkills = [...new Set([...fighterSkills, ...startingSpells])];
    }

    // Check for multi-lore magic selection
    const rules = specialRules.split(';').map(r => r.trim());
    const magicGroups = Object.keys(MAGIC);
    const availableMagicGroups = rules.filter(rule => magicGroups.includes(rule));

    // If multiple magic groups available and no chosen lore, show multi-lore selection
    if (availableMagicGroups.length > 1 && !fighter?.chosen_magic_lore) {
        renderMultiLoreSelection(availableMagicGroups, fighterSkills, fighter);
        magicSection.classList.remove('hidden');
        return;
    }

    // Normal case: get group name
    const tempFighter = { special_rules: specialRules, chosen_magic_lore: fighter ? fighter.chosen_magic_lore : null };
    let groupName = getMagicGroupForFighter(tempFighter);

    // Check if fighter has Arcane Lore skill
    const hasArcaneLore = fighterSkills.some(skill => skill === 'Arcane Lore');

    // If fighter has Arcane Lore but no magic group from special rules, use Lesser Magic
    if (hasArcaneLore && !groupName) {
        // Check if Lesser Magic exists in MAGIC
        if (Object.keys(MAGIC).includes('Lesser Magic')) {
            groupName = 'Lesser Magic';
        }
    }

    if (!groupName) {
        magicSection.classList.add('hidden');
        return;
    }

    // Render spells
    renderSpellsForLore(groupName, fighterSkills);
    magicLoreSelection.classList.add('hidden');
    magicSection.classList.remove('hidden');
}

/**
 * Renders multiple magic lore selection UI for fighters with multiple magic schools.
 * @param {Array<string>} availableGroups - Available magic groups.
 * @param {Array<string>} fighterSkills - The fighter's skills.
 * @param {Object} fighter - The fighter object (optional).
 */
function renderMultiLoreSelection(availableGroups, fighterSkills, fighter) {
    const magicSpellsContainer = document.getElementById('magic-spells-container');
    const magicGroupTitle = document.getElementById('magic-group-title');
    
    // Hide lore selection since we're showing all schools
    const magicLoreSelection = document.getElementById('magic-lore-selection');
    magicLoreSelection.classList.add('hidden');
    
    // Clear container
    magicSpellsContainer.innerHTML = '';
    
    // Create a section for each magic school
    availableGroups.forEach(groupName => {
        const groupSection = document.createElement('div');
        groupSection.className = 'mb-6 p-4 bg-slate-700 rounded-lg border border-slate-600';
        
        const groupTitle = document.createElement('h5');
        groupTitle.className = 'text-lg font-semibold text-mordheim-gold mb-3';
        groupTitle.textContent = groupName;
        groupSection.appendChild(groupTitle);
        
        const spellsContainer = document.createElement('div');
        spellsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-2';
        spellsContainer.id = `spells-${groupName.toLowerCase().replace(/\s+/g, '-')}`;
        
        const spells = getSpellsForGroup(groupName);
        const currentSpells = fighterSkills.filter(skill => spells.includes(skill));
        
        spells.forEach(spell => {
            const isChecked = currentSpells.includes(spell);
            const spellElement = document.createElement('div');
            spellElement.className = 'flex items-center space-x-2';
            spellElement.innerHTML = `
                <input type="checkbox" 
                       id="spell-${spell.replace(/\s+/g, '-').toLowerCase()}" 
                       value="${spell}" 
                       data-group="${groupName}"
                       ${isChecked ? 'checked' : ''} 
                       class="form-checkbox h-4 w-4 text-mordheim-gold bg-slate-800 border-slate-600 rounded focus:ring-mordheim-gold">
                <span class="text-sm">
                    <span data-spell="${spell}" class="underline cursor-pointer text-mordheim-gold">${spell}</span>
                </span>
            `;
            spellsContainer.appendChild(spellElement);
        });
        
        groupSection.appendChild(spellsContainer);
        magicSpellsContainer.appendChild(groupSection);
    });
    
    // Update title to indicate multiple schools
    magicGroupTitle.textContent = 'Multiple Magic Schools';
}

/**
 * Helper function to render spells for a given lore.
 * @param {string} groupName - The magic group name.
 * @param {Array<string>} fighterSkills - The fighter's skills.
 */
function renderSpellsForLore(groupName, fighterSkills) {
    const magicSpellsContainer = document.getElementById('magic-spells-container');
    const spells = getSpellsForGroup(groupName);
    const currentSpells = fighterSkills.filter(skill => spells.includes(skill));

    magicSpellsContainer.innerHTML = '';

    spells.forEach(spell => {
        const isChecked = currentSpells.includes(spell);
        const spellElement = document.createElement('div');
        spellElement.className = 'flex items-center space-x-2';
        spellElement.innerHTML = `
            <input type="checkbox" id="spell-${spell.replace(/\s+/g, '-').toLowerCase()}" value="${spell}" ${isChecked ? 'checked' : ''} class="form-checkbox h-4 w-4 text-mordheim-gold bg-slate-800 border-slate-600 rounded focus:ring-mordheim-gold">
            <span class="text-sm"><span data-spell="${spell}" class="underline cursor-pointer text-mordheim-gold">${spell}</span></span>
        `;
        magicSpellsContainer.appendChild(spellElement);
    });

    document.getElementById('magic-group-title').textContent = groupName;
    magicSpellsContainer.dataset.group = groupName;
}

/**
 * Gets the selected spells from the magic selection UI.
 * @returns {Array<string>} Array of selected spell names.
 */
export function getSelectedSpells() {
    const checkboxes = document.querySelectorAll('#magic-spells-container input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

/**
 * Saves the selected spells to the fighter's skills array or magic field (for V2).
 * @param {Object} fighter - The fighter object.
 * @param {Array<string>} spells - The selected spells.
 * @param {boolean} updateDom - Whether to update DOM inputs (default: true).
 * @param {boolean} isV2Warband - Whether this is a V2 warband (default: false).
 */
export function saveSpellsToFighter(fighter, spells, updateDom = true, isV2Warband = false) {
    if (!fighter) return;

    // For V2 warbands, store spells in separate magic field
    if (isV2Warband) {
        fighter.magic = spells;
        
        // Remove spells from skills array for V2 warbands
        const allMagicSpells = getAllMagicSpellsForFighter(fighter);
        fighter.skills = (fighter.skills || []).filter(skill => !allMagicSpells.includes(skill));
    } else {
        // Legacy behavior: store spells in skills array
        // Get all magic groups to handle multi-lore fighters
        const rules = fighter.special_rules ? fighter.special_rules.split(';').map(r => r.trim()) : [];
        const magicGroups = Object.keys(MAGIC);
        const availableMagicGroups = rules.filter(rule => magicGroups.includes(rule));
        
        // Remove existing spells from all available magic groups
        if (availableMagicGroups.length > 0) {
            const allSpellsInGroups = [];
            availableMagicGroups.forEach(group => {
                const groupSpells = getSpellsForGroup(group);
                allSpellsInGroups.push(...groupSpells);
            });
            
            // Remove duplicates and filter out all magic spells
            const uniqueMagicSpells = [...new Set(allSpellsInGroups)];
            fighter.skills = (fighter.skills || []).filter(skill => !uniqueMagicSpells.includes(skill));
        } else {
            // Single group case (backward compatibility)
            const groupName = getMagicGroupForFighter(fighter);
            if (groupName) {
                const allSpellsInGroup = getSpellsForGroup(groupName);
                fighter.skills = (fighter.skills || []).filter(skill => !allSpellsInGroup.includes(skill));
            }
        }

        // Add selected spells
        fighter.skills = [...(fighter.skills || []), ...spells];
    }

    // Update the skills hidden input and display only if updateDom is true
    if (updateDom) {
        // For V2 warbands, update magic hidden input
        if (isV2Warband) {
            const magicHiddenInput = document.getElementById('f-magic-hidden');
            if (magicHiddenInput) {
                magicHiddenInput.value = JSON.stringify(fighter.magic || []);
            }
        }
        
        // Always update skills hidden input
        document.getElementById('f-skills-hidden').value = JSON.stringify(fighter.skills || []);

        // Update skills display - filter out spells so they only appear in magic selection
        const skillsDisplay = document.getElementById('f-skills');
        
        // Get all spells to hide from display
        const allMagicSpells = getAllMagicSpellsForFighter(fighter);
        const skillsToShow = fighter.skills.filter(skill => !allMagicSpells.includes(skill));
        
        if (skillsToShow.length > 0) {
            const skillsHtml = skillsToShow.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
            skillsDisplay.innerHTML = skillsHtml;
        } else {
            skillsDisplay.textContent = 'None';
        }
    }
}

/**
 * Gets all magic spells available to a fighter based on their special rules.
 * @param {Object} fighter - The fighter object.
 * @returns {Array<string>} Array of all available spell names.
 */
function getAllMagicSpellsForFighter(fighter) {
    if (!fighter) return [];
    
    const rules = fighter.special_rules ? fighter.special_rules.split(';').map(r => r.trim()) : [];
    const magicGroups = Object.keys(MAGIC);
    const availableMagicGroups = rules.filter(rule => magicGroups.includes(rule));
    
    // Check for Arcane Lore skill granting Lesser Magic
    const hasArcaneLore = fighter.skills && fighter.skills.some(skill => skill === 'Arcane Lore');
    if (hasArcaneLore && !availableMagicGroups.includes('Lesser Magic')) {
        availableMagicGroups.push('Lesser Magic');
    }
    
    const allMagicSpells = [];
    if (availableMagicGroups.length > 0) {
        availableMagicGroups.forEach(group => {
            const groupSpells = getSpellsForGroup(group);
            allMagicSpells.push(...groupSpells);
        });
    } else {
        const groupName = getMagicGroupForFighter(fighter);
        if (groupName) {
            const groupSpells = getSpellsForGroup(groupName);
            allMagicSpells.push(...groupSpells);
        }
    }
    
    return [...new Set(allMagicSpells)];
}

/**
 * Gets the fighter's spells from either magic field (V2) or skills array (V1).
 * @param {Object} fighter - The fighter object.
 * @param {boolean} isV2Warband - Whether this is a V2 warband.
 * @returns {Array<string>} Array of spell names.
 */
export function getFighterSpells(fighter, isV2Warband = false) {
    if (!fighter) return [];
    
    if (isV2Warband) {
        return fighter.magic || [];
    }
    
    // Legacy: get spells from skills array
    const allMagicSpells = getAllMagicSpellsForFighter(fighter);
    return (fighter.skills || []).filter(skill => allMagicSpells.includes(skill));
}
