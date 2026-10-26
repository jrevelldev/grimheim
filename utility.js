import { WARBANDS, MASTER_EQUIPMENT_LIST, HIRED_SWORDS, DRAMATIS_PERSONAE, SKILLS } from './data/index.js';
import { findSkillForWarband } from './skill-lookup.js';
import { setIsShieldMeleeIgnored, setIsBlackpowderPreGameDiscountActive, currentWarband, tempItemToRetrieve, isBlackpowderPreGameDiscountActive, isBlackpowder20PercentDiscountActive, isArmourShieldHalfCostActive, isExcludeStartingXpFromRatingActive, setIsFullyPaintedActive } from './state.js';
import { renderArmorSave } from './equipment-management.js';
import { getOriginalName } from './get-original-name.js';
import { shouldBypassElfBowVariableCost } from './equiprules/wood-elves.js';
import { trackScreenView } from './analytics.js';
import { translateFighterType, translateRace, translateWarrior, translateEquipment } from './i18n.js';

export { getOriginalName };

// Re-export rating functions from WarbandRating module (moved for better organization)
export { calculateWarbandRating, parseRatingString } from './WarbandRating/warband-rating.js';

/** Subtitle for fighter cards: selection name for Hired Swords / Dramatis Personae, race otherwise */
export const getFighterTypeSubtitle = (fighter) => {
    const typeEs = translateFighterType(fighter.type);
    const raceEs = translateRace(fighter.race);
    if (fighter.type === 'Hired Sword') {
        const orig = getOriginalName(fighter, HIRED_SWORDS);
        return `${typeEs} (${translateWarrior(orig)})`;
    }
    if (fighter.type === 'Dramatis Personae') {
        const orig = getOriginalName(fighter, DRAMATIS_PERSONAE);
        return `${typeEs} (${translateWarrior(orig)})`;
    }
    if (fighter.race) {
        return `${typeEs} (${raceEs})`;
    }
    return typeEs;
};

/** Compares two arrays for deep equality */
const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

/** Calculates the fighter's final armor save based on equipped items. */
export const calculateArmorSave = (equipment, isHouseRuleActive, skills = []) => {
    let selectedEquipment = equipment || [];

    // Normalize equipment to handle both V1 and V2 formats
    selectedEquipment = selectedEquipment.map(item => normalizeEquipment(item));

    // Helper to get the correct modifier from the list
    const getModifier = (item, type = 'general') => {
        const itemData = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
        if (!itemData) {
            console.error(`ERROR: Missing master data for equipped item: ${item.name}. Check name match.`);
            return 0;
        }

        if (type === 'melee') return itemData.modifierMelee || 0;
        if (type === 'ranged') return itemData.modifierRanged || 0;
        return itemData.modifierGeneral || 0;
    };

    const calculateSaveForType = (type) => {
        const BASE_SAVE_VALUE = 7; // Represents 7+ (no save)

        let totalModifier = 0;
        let hasPrimaryArmour = false;
        let hasShield = false;

        selectedEquipment.forEach(item => {
            const itemData = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
            
            if (!itemData) {
                return;
            }

            // Track if we have a shield for the cumulative bonus logic
            if (itemData.isShield) {
                hasShield = true;
            }

            // Handle all equipment (armor, barding, shields, etc.)
            let mod = 0;
            if (type === 'melee' && itemData.modifierMelee !== undefined) {
                mod = itemData.modifierMelee;
            } else if (type === 'ranged' && itemData.modifierRanged !== undefined) {
                mod = itemData.modifierRanged;
            } else {
                mod = itemData.modifierGeneral || 0;
            }
            
            totalModifier += mod;
            
            // Track if we have primary armor for the cumulative bonus logic
            if (itemData.isPrimaryArmour) {
                hasPrimaryArmour = true;
            }
        });

        // Apply skill modifiers
        const activeSkills = skills || [];
        activeSkills.forEach(skillName => {
            const skillData = findSkillForWarband(skillName);
            if (skillData) {
                let mod = 0;
                if (type === 'melee' && skillData.modifierMelee !== undefined) {
                    mod = skillData.modifierMelee;
                } else if (type === 'ranged' && skillData.modifierRanged !== undefined) {
                    mod = skillData.modifierRanged;
                } else {
                    mod = skillData.modifierGeneral || 0;
                }
                totalModifier += mod;
            }
        });

        let saveValue = BASE_SAVE_VALUE + totalModifier;
        let finalSaveValue = saveValue;

        let detailMessage = `Base: 7+, Total Mod: ${totalModifier}, Initial: ${saveValue}+.`;

        // Apply house rule bonus: shield gets extra -1 for melee only
        if (isHouseRuleActive && type === 'melee' && hasShield) {
            finalSaveValue = finalSaveValue - 1;
            detailMessage += ` Shield +1 in Melee House Rule Applied. Final: ${finalSaveValue}+.`;
        } else {
            detailMessage += ` Final: ${finalSaveValue}+.`;
        }

        // Clamp to valid range
        finalSaveValue = Math.max(1, Math.min(7, finalSaveValue));

        return { finalSaveValue, detailMessage };
    };

    // Check if any equipped armor has different modifiers for melee and ranged
    let hasMixedModifiers = false;
    selectedEquipment.forEach(item => {
        const itemData = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
        if (itemData) {
            const hasMeleeModifier = itemData.modifierMelee !== undefined;
            const hasRangedModifier = itemData.modifierRanged !== undefined;

            // If item has only melee or only ranged modifier, or both with different values
            if ((hasMeleeModifier && !hasRangedModifier) ||
                (!hasMeleeModifier && hasRangedModifier) ||
                (hasMeleeModifier && hasRangedModifier && itemData.modifierMelee !== itemData.modifierRanged)) {
                hasMixedModifiers = true;
            }
        }
    });

    if (isHouseRuleActive || hasMixedModifiers) {
        const meleeResult = calculateSaveForType('melee');
        const rangedResult = calculateSaveForType('ranged');
        return {
            isSplit: true,
            melee: meleeResult,
            ranged: rangedResult
        };
    } else {
        const basicResult = calculateSaveForType('basic');
        return {
            isSplit: false,
            basic: basicResult
        };
    }
};

/** Retrieves the specific warband data object based on the warband type string. */
export const getWarbandData = (warbandType) => {
    if (!warbandType) return null;

    // Handle special case for Mercenary sub-types
    let warbandDataKey = warbandType;
    if (warbandType.startsWith("Mercenaries:")) {
        const subType = warbandType.split(": ")[1]?.trim();
        if (subType) {
            warbandDataKey = `Mercenaries (${subType})`;
        }
    }

    const warband = WARBANDS.flatMap(g => g.warbands).find(w => w.name === warbandDataKey);
    if (!warband) return null;
    
    // Return the full warband object with both name and data
    return {
        name: warband.name,
        ...warband.data
    };
};

/**
 * Resolves the correct skill categories array for a warrior definition.
 * For warbands like Mercenaries (Ostermark) that use skills_1/skills_2/skills_3,
 * this looks up the warband's stored skill_set to pick the correct one.
 * For all other warriors with a standard 'skills' property, returns it unchanged.
 *
 * @param {Object} warrior - The warrior definition from warband data (e.g., from getWarbandData().warriors)
 * @param {Object} warband - The current warband instance (with skill_set if applicable)
 * @returns {Array} The resolved skill categories array
 */
export const getWarriorSkills = (warrior, warband) => {
    if (!warrior) return [];

    // If warrior has the standard skills property, use it directly
    if (warrior.skills) return warrior.skills;

    // Check for Ostermark-style multi-skill-set properties
    if (warrior.skills_1 || warrior.skills_2 || warrior.skills_3) {
        const skillSet = warband?.skill_set || '1'; // Default to set 1 (Reikland) if not set
        const key = `skills_${skillSet}`;
        return warrior[key] || warrior.skills_1 || [];
    }

    return [];
};

/** Generates a UUID */
export function generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    } else {
        // Fallback for older browsers or non-secure contexts
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

/**
 * Returns the item's pregameCostModifiers entry for the warband if it currently applies, else null.
 * An entry applies when the warband is in pre-game or the equipment filter is set to 'starting'.
 * Optional entry fields:
 *  - specificHeroes: [names] - only applies to these fighters (needs specificName; skipped without it)
 *  - includeNewFighters: true - also applies when buying for a fighter that hasn't been saved yet
 */
export const getApplicablePregameModifier = (item, warbandName, specificName = null) => {
    const pgModifier = warbandName ? item?.pregameCostModifiers?.[warbandName] : null;
    if (!pgModifier) return null;

    if (Array.isArray(pgModifier.specificHeroes) && pgModifier.specificHeroes.length > 0) {
        if (!specificName || !pgModifier.specificHeroes.includes(specificName)) return null;
    }

    const filterModeInput = document.getElementById('equipment-filter-mode');
    const isPreGame = (currentWarband && currentWarband.pre_game !== false) || (filterModeInput && filterModeInput.value === 'starting');
    if (isPreGame) return pgModifier;

    if (pgModifier.includeNewFighters === true) {
        const fighterIdInput = document.getElementById('fighter-id');
        if (fighterIdInput && fighterIdInput.value === '') return pgModifier;
    }
    return null;
};

/** Parses cost information from equipment item to extract base cost and variable components */
export const parseCostString = (item, warbandName = null, fighterType = null, race = null, specificName = null) => {
    // New format: item has baseCost and variableCost fields
    let base = item.baseCost !== undefined ? item.baseCost : parseFloat(item.cost) || 0;
    let variableCost = item.variableCost;

    // Special rule for Wood Elves: Elf Bow at set cost of 35 GC
    if (shouldBypassElfBowVariableCost(item, warbandName, currentWarband)) {
        variableCost = null;
    }

    // Apply data-driven pregame cost modifiers (takes priority over normal warband costModifiers)
    let pregameApplied = false;
    const pgModifier = getApplicablePregameModifier(item, warbandName, specificName);
    if (pgModifier) {
        if (pgModifier.baseCost !== undefined) base = pgModifier.baseCost;
        if (pgModifier.variableCost !== undefined) variableCost = pgModifier.variableCost;
        pregameApplied = true;
    }

    // Apply cost modifiers if parameters provided (skip warband modifiers if pregame override was applied)
    if (warbandName || fighterType || race || specificName) {
        const costModifiers = item.costModifiers || {};

        // Apply warband modifiers
        if (!pregameApplied && warbandName && costModifiers.warbands && costModifiers.warbands[warbandName]) {
            const modifier = costModifiers.warbands[warbandName];
            if (modifier.baseCost !== undefined) base = modifier.baseCost;
            if (modifier.variableCost !== undefined) variableCost = modifier.variableCost;
        }

        // Apply hero type modifiers
        if (fighterType && costModifiers.heroTypes && costModifiers.heroTypes[fighterType]) {
            const modifier = costModifiers.heroTypes[fighterType];
            if (modifier.baseCost !== undefined) base = modifier.baseCost;
            if (modifier.variableCost !== undefined) variableCost = modifier.variableCost;
        }

        // Apply race modifiers
        if (race && costModifiers.races && costModifiers.races[race]) {
            const modifier = costModifiers.races[race];
            if (modifier.baseCost !== undefined) base = modifier.baseCost;
            if (modifier.variableCost !== undefined) variableCost = modifier.variableCost;
        }

        // Apply specific hero modifiers
        if (specificName && costModifiers.specificHeroes && costModifiers.specificHeroes[specificName]) {
            const modifier = costModifiers.specificHeroes[specificName];
            if (modifier.variableCost !== undefined) variableCost = modifier.variableCost;
        }

        // Apply specific henchman modifiers
        if (specificName && costModifiers.specificHenchmen && costModifiers.specificHenchmen[specificName]) {
            const modifier = costModifiers.specificHenchmen[specificName];
            if (modifier.baseCost !== undefined) base = modifier.baseCost;
            if (modifier.variableCost !== undefined) variableCost = modifier.variableCost;
        }
    }

    if (!variableCost || variableCost === null) {
        return { base, diceCount: 0, multiplier: 1, isVariable: false };
    }

    // Parse variableCost: "D6", "2D6", "D6x10", "3D6x2"
    const varMatch = variableCost.match(/^(\d*)(D|d)(\d+)(?:x(\d+))?$/);
    if (varMatch) {
        const diceCount = parseInt(varMatch[1]) || 1; // Default to 1 if not specified
        const multiplier = parseInt(varMatch[4]) || 1; // Multiplier after 'x', default 1
        return { base, diceCount, multiplier, isVariable: true };
    }

    // If variableCost doesn't match expected pattern, treat as fixed
    return { base, diceCount: 0, multiplier: 1, isVariable: false };
};

/** Formats equipment cost for display using catalogue baseCost and variableCost */
export const formatEquipmentCostDisplay = (item) => {
    if (!item) return '0';

    const masterItem = item.id
        ? MASTER_EQUIPMENT_LIST.find(i => i.id === item.id)
        : (item.name ? MASTER_EQUIPMENT_LIST.find(i => i.name === item.name) : null);

    const base = masterItem?.baseCost ?? (item.baseCost !== undefined ? item.baseCost : (parseFloat(item.cost) || 0));
    let variable = masterItem?.variableCost ?? (typeof item.variableCost === 'string' ? item.variableCost : null);

    // Special rule for Wood Elves: Elf Bow at set cost of 35 GC
    if (shouldBypassElfBowVariableCost(masterItem || item, currentWarband?.type, currentWarband)) {
        variable = null;
    }

    let finalBase = base;

    // Apply data-driven pregame cost modifiers for display (also applies when starting toggle is active).
    // No fighter context here, so hero-specific entries (specificHeroes) are skipped.
    const pgMod = getApplicablePregameModifier(masterItem || item, currentWarband?.type);
    if (pgMod) {
        if (pgMod.baseCost !== undefined) finalBase = pgMod.baseCost;
        if (pgMod.variableCost !== undefined) variable = pgMod.variableCost;
    }

    if (!variable) return String(finalBase);

    const varDisplay = String(variable).toUpperCase();
    return finalBase > 0 ? `${finalBase} + ${varDisplay}` : varDisplay;
};

/** Adjusts equipment costs based on special rules (e.g., first Dagger is free) */
export const adjustEquipmentCosts = (equipmentArray) => {
    let daggerFound = false;
    return equipmentArray.map(item => {
        // Normalize equipment to ensure name is available for comparison
        const normalizedItem = normalizeEquipment(item);
        if (normalizedItem.name === 'Dagger' && !daggerFound) {
            daggerFound = true;
            // Return the normalized item with adjusted cost to preserve all fields
            return { ...normalizedItem, cost: 0 };
        }
        // Return normalized item to ensure all fields are present
        return normalizedItem;
    });
};

/** Helper function to calculate total equipment cost */
export const calculateEquipmentCost = (equipmentArray) => {
    return equipmentArray.reduce((total, item) => {
        // Use variableCost if available (for variable cost equipment), otherwise use cost
        const itemCost = typeof item.variableCost === 'number' ? item.variableCost : (item.cost || 0);
        return total + (parseFloat(itemCost) || 0);
    }, 0);
};

/** Helper to count occurrences of a specific item name in a warband's storage. */
export const countItemInStorage = (warband, itemName) => {
    if (!warband || !warband.stored_equipment) return 0;
    // Normalize stored equipment to handle both V1 and V2 formats
    return warband.stored_equipment
        .map(item => normalizeEquipment(item))
        .filter(item => item.name === itemName).length;
};

/** Shows a temporary success or error message. */
export const showMessage = (message, type = 'success') => {
    const box = document.getElementById('message-box');
    box.textContent = message;
    box.className = `fixed bottom-4 right-4 p-3 rounded-lg shadow-xl transition-opacity duration-300 z-50`;
    box.classList.add(type === 'success' ? 'bg-green-600' : 'bg-red-600');
    box.classList.remove('hidden', 'opacity-0');
    box.classList.add('opacity-100');
    setTimeout(() => {
        box.classList.remove('opacity-100');
        box.classList.add('opacity-0');
        setTimeout(() => box.classList.add('hidden'), 300);
    }, 3000);
};

/** Opens a modal by ID */
export const displayModal = (id) => { // Renamed from showModal
    const modal = document.getElementById(id);
    if (modal) {
        // Move modal to the end of body to ensure it's not hidden by other elements
        document.body.appendChild(modal);
        
        // Reset to original classes but ensure proper styling
        modal.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50';
        // Clear any inline styles that might have been set by hideModal
        modal.style.display = 'flex';
        modal.style.visibility = 'visible';
        modal.style.removeProperty('display');
        modal.style.removeProperty('visibility');
        
        // Only apply custom sizing to specific modals that need it
        if (modal.children.length > 0) {
            const firstChild = modal.children[0];
            
            // Apply custom sizing only to specific modals
            if (id === 'special-thanks-modal') {
                firstChild.className = 'bg-slate-700 p-6 rounded-xl w-full max-w-2xl shadow-2xl';
                firstChild.style.display = 'block';
                firstChild.style.maxHeight = '90vh';
                firstChild.style.overflow = 'auto';
            } else if (id === 'character-review-modal') {
                firstChild.className = 'bg-slate-700 p-6 rounded-xl w-full max-w-6xl shadow-2xl';
                firstChild.style.display = 'block';
                firstChild.style.maxHeight = '90vh';
                firstChild.style.overflow = 'auto';
            } else {
                // For all other modals, preserve their original styling
                // Don't modify the child's classes or styles
            }
        }
        
        // Re-attach event listeners after moving the modal
        if (id === 'special-thanks-modal') {
            const closeBtn = document.getElementById('close-special-thanks-btn');
            const closeModalBtn = document.getElementById('close-special-thanks-modal-btn');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    hideModal('special-thanks-modal');
                });
            }
            if (closeModalBtn) {
                closeModalBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    hideModal('special-thanks-modal');
                });
            }
        } else if (id === 'changelog-modal') {
            // Re-attach changelog expand/collapse event listeners without resetting state
            
            // Remove existing event listeners to prevent duplicates
            const monthHeaders = document.querySelectorAll('.month-header');
            monthHeaders.forEach(header => {
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
            });
            
            const changelogEntries = document.querySelectorAll('.changelog-entry button[data-target]');
            changelogEntries.forEach(button => {
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
            });
            
            // Changelog month collapse/expand functionality
            const newMonthHeaders = document.querySelectorAll('.month-header');
            newMonthHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const monthId = 'month-' + this.dataset.month;
                    const monthContent = document.getElementById(monthId);
                    const chevron = this.querySelector('.month-chevron');
                    
                    if (monthContent) {
                        if (monthContent.classList.contains('hidden')) {
                            // Expand
                            monthContent.classList.remove('hidden');
                            chevron.classList.remove('fa-chevron-right');
                            chevron.classList.add('fa-chevron-down');
                        } else {
                            // Collapse
                            monthContent.classList.add('hidden');
                            chevron.classList.remove('fa-chevron-down');
                            chevron.classList.add('fa-chevron-right');
                        }
                    }
                });
            });

            // Changelog individual entry collapse/expand functionality
            const newChangelogEntries = document.querySelectorAll('.changelog-entry button[data-target]');
            newChangelogEntries.forEach((button) => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const targetId = this.dataset.target;
                    const targetContent = document.getElementById(targetId);
                    const chevron = this.querySelector('i');
                    
                    if (targetContent) {
                        if (targetContent.classList.contains('hidden')) {
                            // Expand
                            targetContent.classList.remove('hidden');
                            chevron.classList.remove('fa-chevron-right');
                            chevron.classList.add('fa-chevron-down');
                        } else {
                            // Collapse
                            targetContent.classList.add('hidden');
                            chevron.classList.remove('fa-chevron-down');
                            chevron.classList.add('fa-chevron-right');
                        }
                    }
                });
            });

            // Collapse All button
            const collapseAllBtn = document.getElementById('collapse-all-btn');
            if (collapseAllBtn) {
                // Remove existing listener
                const newCollapseBtn = collapseAllBtn.cloneNode(true);
                collapseAllBtn.parentNode.replaceChild(newCollapseBtn, collapseAllBtn);
                
                newCollapseBtn.addEventListener('click', function() {
                    // Collapse all months
                    document.querySelectorAll('.month-content').forEach(content => {
                        content.classList.add('hidden');
                    });
                    // Update all month chevrons
                    document.querySelectorAll('.month-chevron').forEach(chevron => {
                        chevron.classList.remove('fa-chevron-down');
                        chevron.classList.add('fa-chevron-right');
                    });
                    // Collapse all individual entries
                    document.querySelectorAll('.changelog-entry div[id^="changelog-"]').forEach(content => {
                        content.classList.add('hidden');
                    });
                    // Update all entry chevrons
                    document.querySelectorAll('.changelog-entry button[data-target] i').forEach(chevron => {
                        chevron.classList.remove('fa-chevron-down');
                        chevron.classList.add('fa-chevron-right');
                    });
                });
            }

            // Expand All button
            const expandAllBtn = document.getElementById('expand-all-btn');
            if (expandAllBtn) {
                // Remove existing listener
                const newExpandBtn = expandAllBtn.cloneNode(true);
                expandAllBtn.parentNode.replaceChild(newExpandBtn, expandAllBtn);
                
                newExpandBtn.addEventListener('click', function() {
                    // Expand all months
                    document.querySelectorAll('.month-content').forEach(content => {
                        content.classList.remove('hidden');
                    });
                    // Update all month chevrons
                    document.querySelectorAll('.month-chevron').forEach(chevron => {
                        chevron.classList.remove('fa-chevron-right');
                        chevron.classList.add('fa-chevron-down');
                    });
                    // Expand all individual entries
                    document.querySelectorAll('.changelog-entry div[id^="changelog-"]').forEach(content => {
                        content.classList.remove('hidden');
                    });
                    // Update all entry chevrons
                    document.querySelectorAll('.changelog-entry button[data-target] i').forEach(chevron => {
                        chevron.classList.remove('fa-chevron-right');
                        chevron.classList.add('fa-chevron-down');
                    });
                });
            }
        }
    } else {
        console.error('Modal not found with id:', id);
    }
};

/** Shows the rename warband modal */
export const showRenameWarbandModal = (warbandId, currentName) => {
    // Set current name in input field
    const nameInput = document.getElementById('rename-warband-name');
    if (nameInput) {
        nameInput.value = currentName;
        nameInput.focus();
        nameInput.select(); // Select all text for easy editing
    }
    
    // Store warband ID for the save function
    const modal = document.getElementById('rename-warband-modal');
    if (modal) {
        modal.dataset.warbandId = warbandId;
    }
    
    // Reset validation state
    const renameBtn = document.getElementById('rename-warband-confirm-btn');
    
    if (renameBtn) {
        renameBtn.disabled = false;
        renameBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Check if we have valid input to enable the button
    const checkRenameButtonState = () => {
        const isValidName = nameInput.value.trim().length > 0;
        const isSameName = nameInput.value.trim() === currentName.trim();
        const canRename = isValidName && !isSameName;
        
        if (renameBtn) {
            renameBtn.disabled = !canRename;
            if (canRename) {
                renameBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                renameBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        }
    };
    
    // Add input event listener
    nameInput.addEventListener('input', checkRenameButtonState);
    
    // Initial check
    checkRenameButtonState();
    
    displayModal('rename-warband-modal');
};

/** Hides a modal by ID */
export const hideModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        // Force hide with inline styles to override any CSS conflicts
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
    } else {
        console.error('Modal not found with id:', id);
    }
};

/** Closes all navigation and options dropdown menus except the one specified */
export const closeAllDropdowns = (exceptId) => {
    const dropdownIds = [
        'helper-dropdown',
        'data-dropdown',
        'blog-dropdown',
        'feedback-dropdown',
        'options-dropdown'
    ];
    dropdownIds.forEach(id => {
        if (id !== exceptId) {
            const dropdown = document.getElementById(id);
            if (dropdown) {
                dropdown.classList.add('hidden');
                
                // If we're closing the data-dropdown, also close the character-submenu
                if (id === 'data-dropdown') {
                    const characterSubmenu = document.getElementById('character-submenu');
                    const characterReviewDropdownBtn = document.getElementById('character-review-dropdown-btn');
                    if (characterSubmenu) {
                        characterSubmenu.classList.add('hidden');
                    }
                    const chevron = characterReviewDropdownBtn?.querySelector('i');
                    if (chevron) {
                        chevron.classList.remove('fa-chevron-down');
                        chevron.classList.add('fa-chevron-right');
                    }
                }
            }
        }
    });
};

/** Shows the new warband modal */
export const showNewWarbandModal = () => {
    // Reset form fields
    document.getElementById('new-warband-name').value = '';
    document.getElementById('new-warband-type').value = '';
    document.querySelectorAll('#warband-selection-container .warband-option.selected').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Reset validation state
    const createBtn = document.getElementById('create-warband-confirm-btn');
    const nameInput = document.getElementById('new-warband-name');
    const typeSelect = document.getElementById('new-warband-type');
    
    if (createBtn) {
        createBtn.disabled = true;
        createBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    
    // Check if we have valid inputs to enable the button
    const checkCreateButtonState = () => {
        const isValidName = nameInput.value.trim().length > 0;
        const isValidType = typeSelect.value.length > 0;
        const canCreate = isValidName && isValidType;
        
        if (createBtn) {
            createBtn.disabled = !canCreate;
            if (canCreate) {
                createBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                createBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        }
    };
    
    // Add input event listeners
    nameInput.addEventListener('input', checkCreateButtonState);
    typeSelect.addEventListener('change', checkCreateButtonState);
    
    // Initial check
    checkCreateButtonState();
    
    displayModal('new-warband-modal'); // Updated call
};

/** Toggles between the editor view and the list view */
export const showEditorView = () => {
    trackScreenView('Warband Editor');
    document.getElementById('warband-list-view').classList.add('hidden');
    document.getElementById('warband-editor-view').classList.remove('hidden');
    document.getElementById('turn-order-tracker-view').classList.add('hidden'); // Hide the turn order tracker
    document.getElementById('battle-view').classList.add('hidden'); // Hide the battle view
    
    // Show header and footer when returning from battle view
    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('main-footer').classList.remove('hidden');
    
    // Reset mobile tabs to members view when returning to editor
    if (window.resetMobileTabs) {
        window.resetMobileTabs();
    }
};

/** Confirms an action */
export const showConfirmationModal = (message, callback) => {
    document.getElementById('confirmation-message').textContent = message;
    const confirmBtn = document.getElementById('confirm-action-btn');
    confirmBtn.onclick = () => {
        callback();
        hideModal('confirmation-modal');
    };
    // Hide the refund button — it's only shown by deleteFighter() in pre-game mode
    const refundBtn = document.getElementById('refund-action-btn');
    if (refundBtn) refundBtn.classList.add('hidden');
    displayModal('confirmation-modal'); // Updated call
};

/** Saves the House Rule toggle state and returns the new state. */
export const saveHouseRuleState = () => {
    const toggle = document.getElementById('house-rule-toggle');
    const isChecked = toggle.checked;
    localStorage.setItem('isShieldMeleeIgnored', isChecked);
    return isChecked;
};

/** Handles the House Rule toggle change event. */
export const handleHouseRuleChange = () => {
    setIsShieldMeleeIgnored(saveHouseRuleState());

    // CRITICAL FIX: If the modal is open, force re-calculation and re-render of the armor save display
    const modal = document.getElementById('fighter-modal');
    if (modal && !modal.classList.contains('hidden')) {
        renderArmorSave();
    }

    // Update battle view if it's active
    const battleView = document.getElementById('battle-view');
    if (battleView && !battleView.classList.contains('hidden')) {
        import('./ui.js').then(uiModule => {
            import('./state.js').then(stateModule => {
                if (stateModule.currentWarband) {
                    uiModule.renderBattleFighters(stateModule.currentWarband);
                }
            });
        });
    }
};

/** Saves the Fully Painted House Rule toggle state and returns the new state. */
export const saveFullyPaintedState = () => {
    const toggle = document.getElementById('fully-painted-toggle');
    const isChecked = toggle.checked;
    localStorage.setItem('isFullyPaintedActive', isChecked);
    return isChecked;
};

/** Handles the Fully Painted House Rule toggle change event. */
export const handleFullyPaintedChange = () => {
    setIsFullyPaintedActive(saveFullyPaintedState());
};

/** Parses mount stats from equipment rules string */
export const parseMountStats = (rulesString) => {
    if (!rulesString) return null;

    // Handle both string and array formats
    let rulesStr = rulesString;
    if (Array.isArray(rulesString)) {
        rulesStr = rulesString[0];
    }

    // Extract stats part before the dot
    const statsPart = rulesStr.split('.')[0].trim();

    // Split by spaces and parse each stat
    const parts = statsPart.split(/\s+/);
    const stats = {};

    // Expected order: M WS [BS] S T W I A Ld
    let index = 0;
    const statOrder = ['M', 'WS', 'S', 'T', 'W', 'I', 'A', 'Ld'];

    for (let i = 0; i < parts.length && index < statOrder.length; i++) {
        const part = parts[i];
        const match = part.match(/^([A-Z]+)(\d+)$/);
        if (match) {
            const [, stat, value] = match;
            stats[stat] = parseInt(value);
            index++;
        }
    }

    // If BS is missing, set to 0
    if (!stats.hasOwnProperty('BS')) {
        stats.BS = 0;
    }

    return stats;
};

/** Checks if a selected Henchman Group can receive the stored item */
export const checkGroupRetrievalConstraint = () => {
     const selectElement = document.getElementById('retrieve-fighter-select');
     const selectedFighterId = selectElement.value;
     const targetFighter = currentWarband.members.find(f => f.id === selectedFighterId);
     const warningDiv = document.getElementById('retrieve-warning');

     if (!targetFighter || !tempItemToRetrieve) {
         warningDiv.classList.add('hidden');
         return;
     }

     const isHenchmanGroup = targetFighter.type === 'Henchman' && (targetFighter.group_size || 1) > 1;

     if (!isHenchmanGroup) {
         warningDiv.classList.add('hidden');
         return;
     }

     const item = tempItemToRetrieve.item;
     const needed = targetFighter.group_size;
     const totalItemInstancesInStorage = countItemInStorage(currentWarband, item.name);
     const alreadyHasItem = targetFighter.equipment.some(e => e.name === item.name);

     if (alreadyHasItem) {
         warningDiv.textContent = `El grupo ya tiene ${translateEquipment(item.name)}. No se puede equipar un objeto duplicado.`;
         warningDiv.classList.remove('hidden');
         return;
     }

     if (totalItemInstancesInStorage < needed) {
         const missing = needed - totalItemInstancesInStorage;
         warningDiv.textContent = `El tamaño del grupo (${needed}) requiere ${needed} unidades de ${translateEquipment(item.name)}. Solo hay ${totalItemInstancesInStorage} en el almacén. Faltan ${missing}.`;
         warningDiv.classList.remove('hidden');
     } else {
         warningDiv.classList.add('hidden');
     }
};

/**
 * Applies the blackpowder pre-game discount house rule to a cost.
 * This should be called AFTER all other cost modifiers have been applied.
 *
 * @param {number} cost - The cost after all other modifiers have been applied
 * @param {Object} item - The equipment item object
 * @returns {Object} - { finalCost: number, discountApplied: boolean, originalCost: number }
 */
export const applyBlackpowderPreGameDiscount = (cost, item) => {
    // Check if house rule is active
    if (!isBlackpowderPreGameDiscountActive) {
        return { finalCost: cost, discountApplied: false, originalCost: cost };
    }

    // Check if warband is in pre-game mode
    if (!currentWarband || currentWarband.pre_game !== true) {
        return { finalCost: cost, discountApplied: false, originalCost: cost };
    }

    // Check if item is blackpowder category
    if (!item || item.category !== 'Blackpowder') {
        return { finalCost: cost, discountApplied: false, originalCost: cost };
    }

    // Apply 1/3 discount rounded up
    const discountedCost = Math.ceil(cost / 3);

    return {
        finalCost: discountedCost,
        discountApplied: true,
        originalCost: cost
    };
};

/**
 * Applies the blackpowder 20% discount house rule to a cost.
 * This applies regardless of game phase (pre-game or post-game).
 * Should be called AFTER applyBlackpowderPreGameDiscount so discounts stack.
 *
 * @param {number} cost - The cost after all other modifiers have been applied
 * @param {Object} item - The equipment item object
 * @returns {Object} - { finalCost: number, discountApplied: boolean, originalCost: number }
 */
export const applyBlackpowder20PercentDiscount = (cost, item) => {
    // Check if house rule is active
    if (!isBlackpowder20PercentDiscountActive) {
        return { finalCost: cost, discountApplied: false, originalCost: cost };
    }

    // Check if item is blackpowder category
    if (!item || item.category !== 'Blackpowder') {
        return { finalCost: cost, discountApplied: false, originalCost: cost };
    }

    // Apply 20% discount rounded up (i.e. multiply by 0.8, round up)
    const discountedCost = Math.ceil(cost * 0.8);

    return {
        finalCost: discountedCost,
        discountApplied: true,
        originalCost: cost
    };
};

/**
 * Applies the Armour & Shields/Bucklers 50% cost reduction house rule.
 * This should be applied BEFORE any other modifiers (warband-specific, blackpowder, etc.).
 *
 * @param {number} cost - The cost to apply the discount to
 * @param {Object} item - The equipment item object
 * @returns {Object} - { finalCost: number, discountApplied: boolean, originalCost: number }
 */
export const applyArmourShieldHalfCostDiscount = (cost, item) => {
    // Check if house rule is active
    if (!isArmourShieldHalfCostActive) {
        return { finalCost: cost, discountApplied: false, originalCost: cost };
    }

    // Check if item is in Armour or Shields/Bucklers category
    if (!item || (item.category !== 'Armour' && item.category !== 'Shields/Bucklers')) {
        return { finalCost: cost, discountApplied: false, originalCost: cost };
    }

    // Apply 50% discount rounded up (i.e. multiply by 0.5, round up)
    const discountedCost = Math.ceil(cost * 0.5);

    return {
        finalCost: discountedCost,
        discountApplied: true,
        originalCost: cost
    };
};

/**
 * Normalizes equipment to a standard format, handling both V1 (name-based) and V2 (ID-based) formats.
 * For V2 format, looks up name and rules from MASTER_EQUIPMENT_LIST by ID.
 * For V1 format, looks up by name to ensure all fields are present.
 *
 * @param {Object} equipment - Equipment object (either { id, cost, name?, rules? } or { name, cost, rules })
 * @returns {Object} Normalized equipment with id, name, cost, rules, baseCost, and variableCost
 */
export const normalizeEquipment = (equipment) => {
    if (!equipment) return equipment;

    if (equipment.id) {
        // V2 format: Look up by ID
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.id === equipment.id);
        if (masterItem) {
            // Handle variable cost - if it's a string like "D6", convert to calculated cost
            let processedVariableCost = equipment.variableCost;
            if (typeof equipment.variableCost === 'string' && equipment.variableCost !== masterItem.variableCost) {
                // If variableCost is a custom string (not the master "D6"), try to calculate it
                // For now, we'll keep it as-is since we can't recalculate without the original roll
                processedVariableCost = equipment.variableCost;
            } else if (equipment.variableCost === masterItem.variableCost) {
                // If it matches master variable cost, remove it to use base cost
                processedVariableCost = undefined;
            }
            
            return {
                ...equipment,
                name: equipment.name || masterItem.name, // Use custom name if stored (e.g., "Axe - Gromril")
                rules: equipment.rules || masterItem.rules, // Use custom rules if present
                baseCost: masterItem.baseCost, // Include base cost for display
                variableCost: typeof processedVariableCost === 'number' ? processedVariableCost : undefined, // Only keep if it's a custom calculated cost
                warbandRating: masterItem.warbandRating // Add warbandRating from master list
            };
        }
        // If master item not found, return as-is with warning
        console.warn(`Master equipment item not found for ID: ${equipment.id}`);
        return equipment;
    }

    // V1 format or equipment without ID: Look up by name to ensure all fields are present
    if (equipment.name) {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === equipment.name);
        if (masterItem) {
            let variableCost = equipment.variableCost !== undefined ? equipment.variableCost : masterItem.variableCost;

            // Special rule for Wood Elves: Elf Bow at set cost of 35 GC
            if (shouldBypassElfBowVariableCost(masterItem, currentWarband?.type, currentWarband)) {
                variableCost = undefined;
            }

            return {
                ...equipment,
                id: masterItem.id, // Add ID from master list for V2 compatibility
                name: equipment.name, // Preserve the name
                rules: equipment.rules || masterItem.rules, // Use custom rules if present, otherwise master rules
                baseCost: masterItem.baseCost, // Include base cost for display
                variableCost: variableCost, // Preserve calculated variableCost, fallback to master
                warbandRating: masterItem.warbandRating // Add warbandRating from master list
            };
        }
    }

    // If no name or master item not found, return as-is
    return equipment;
};

/**
 * Determines if a warband is using V2 equipment storage format.
 * Validates both the flag and actual equipment structure.
 *
 * @param {Object} warband - Warband object
 * @returns {boolean} True if warband is V2 format
 */
export const isV2Warband = (warband) => {
    if (!warband) return false;
    
    // Check flag first (primary indicator)
    if (warband._isV2 === true) return true;
    if (warband._isV2 === false) return false;
    
    // If flag is undefined, validate equipment structure
    const hasEquipment = warband.equipment && Array.isArray(warband.equipment);
    const hasStoredEquipment = warband.stored_equipment && Array.isArray(warband.stored_equipment);
    
    if (!hasEquipment && !hasStoredEquipment) return false; // No equipment to check
    
    const equipmentToCheck = hasEquipment ? warband.equipment : warband.stored_equipment;
    
    // Check if equipment uses V2 format (has ID field)
    const hasV2Equipment = equipmentToCheck.some(item => item.id !== undefined);
    
    // Check if equipment uses V1 format (has name field but no ID)
    const hasV1Equipment = equipmentToCheck.some(item => 
        item.name !== undefined && item.id === undefined
    );
    
    // If we find V2 format equipment, treat as V2 warband
    if (hasV2Equipment && !hasV1Equipment) {
        console.warn(`Warband ${warband.id} has V2 equipment but missing _isV2 flag. Setting to V2 format.`);
        warband._isV2 = true; // Auto-correct the flag
        return true;
    }
    
    // If we find V1 format equipment, treat as V1 warband
    if (hasV1Equipment && !hasV2Equipment) {
        warband._isV2 = false; // Auto-correct the flag
        return false;
    }
    
    // Mixed format - prioritize V2 but log warning
    if (hasV2Equipment && hasV1Equipment) {
        console.warn(`Warband ${warband.id} has mixed equipment formats. Treating as V2.`);
        warband._isV2 = true;
        return true;
    }
    
    // Default to false if no clear format detected
    warband._isV2 = false;
    return false;
};

/**
 * Serializes equipment to the appropriate storage format based on warband version.
 * For V2 warbands: { id, cost, name?, rules? } (name and rules only if custom/modified)
 * For V1 warbands: { name, cost, rules }
 *
 * @param {Object} equipment - Equipment object with full data
 * @param {boolean} isV2 - Whether to use V2 format
 * @returns {Object} Serialized equipment for storage
 */
export const serializeEquipment = (equipment, isV2) => {
    if (!equipment) return equipment;

    // Ensure equipment is normalized before serialization
    const normalized = normalizeEquipment(equipment);

    if (isV2) {
        // V2 format: Store ID and cost, name and rules only if custom/modified
        const serialized = {
            id: normalized.id,
            cost: normalized.cost,
            ...(typeof normalized.variableCost === 'number' && { variableCost: normalized.variableCost })
        };

        // Look up master item to compare
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.id === normalized.id);
        if (masterItem) {
            // Only store name if it differs from master (e.g., "Axe - Gromril")
            if (normalized.name && normalized.name !== masterItem.name) {
                serialized.name = normalized.name;
            }
            // Only store rules if they differ from master (custom/modified)
            if (normalized.rules && !arraysEqual(normalized.rules, masterItem.rules)) {
                serialized.rules = normalized.rules;
            }
        }

        return serialized;
    }

    // V1 format: Store name, cost, and rules
    return {
        name: normalized.name,
        cost: normalized.cost,
        rules: normalized.rules
    };
};
