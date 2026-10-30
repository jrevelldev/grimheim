import { MASTER_EQUIPMENT_LIST, WARBANDS, MASTER_INJURY_LIST, VEHICLES, SKILLS } from './data/index.js';
import { findSkillForWarband } from './skill-lookup.js';
import { translateEquipmentCategory, translateEquipment, translateRarity, translateEquipmentRules, translateSkill, translateSpecialRule, translateSkillCategory } from './i18n.js';

// Global variables for storage modal
window.selectedItemId = null;

// Global function for setting custom cost
window.setCustomCost = function(cost) {
    const input = document.getElementById('custom-cost-input');
    if (input) {
        input.value = parseFloat(cost) || 0;
    }
};

// Global function for selecting item
window.selectItemForStorage = function(itemId, cost) {
    window.selectedItemId = itemId;
    setCustomCost(cost);
    renderStorageEquipmentOptions(); // Update the UI to show selection
};
import { STATS_FIELDS } from './config.js';
import { getWarbandData, calculateEquipmentCost, adjustEquipmentCosts, calculateArmorSave, showMessage, displayModal, parseCostString, hideModal, checkGroupRetrievalConstraint, applyBlackpowderPreGameDiscount, applyBlackpowder20PercentDiscount, applyArmourShieldHalfCostDiscount, normalizeEquipment, isV2Warband, serializeEquipment, getApplicablePregameModifier } from './utility.js';
import { currentWarband, currentFighterBaseStats, tempItemToRemove, tempItemToRetrieve, setTempItemToRemove, setTempItemToRetrieve, setTempItemToAdd, availableEquipmentFilterIds, setAvailableEquipmentFilterIds, setCurrentFighterMultiStats, getAvailableEquipmentFilterIds, setAvailableSkillCategories, getAvailableSkillCategories, getBaseSkillCategories, setRestrictedSkillCategories } from './state.js';
import { applyCarnivalOfChaosUILogic } from './equiprules/carnival-ui.js';
import { getDwarfTreasureHunterDiscountedCost, getDwarfDiscountDisplayInfo } from './equiprules/dwarf-treasure-hunters.js';
import { getHochlandBanditDiscountDisplayInfo } from './equiprules/hochland-bandits.js';
import { getOrderOfTheMareDiscountDisplayInfo, getOrderOfTheMareDiscountedCost, applyOrderOfTheMareEquipmentRules } from './equiprules/order-of-the-mare.js';
import { getDruchiiDiscountDisplayInfo } from './equiprules/druchii.js';
import { getImperialOutridersDiscountDisplayInfo, getImperialOutridersDiscountedCost } from './equiprules/imperial-outriders-ui.js';
import { validateCursedMaskEquipmentRules } from './equiprules/cursed-masks.js';
import { getLizardmenDiscountDisplayInfo } from './equiprules/lizardmen.js';
import { getNightGoblinsWebDiscountDisplayInfo, getNightGoblinsWebDiscountedCost } from './equiprules/night-goblins-web.js';
import { applyHeavyArmourShieldPenalty, applyPaviseMovementPenalty, validateArmourCompatibility } from './equiprules/armour.js';
import { validateSistersOfSigmarEquipmentRules } from './equiprules/sisters-of-sigmar.js';
import { validateLordsBoonEquipmentRules } from './equiprules/lords-boon.js';
import { renderGromrilWeaponOption } from './equiprules/gromril.js';
import { renderObsidianWeaponOption, isObsidianAvailable } from './equiprules/obsidian.js';
import { handleBookOfTheDeadEquipmentChange } from './equiprules/undead.js';
import { handleLiberBubonicusEquipmentChange } from './equiprules/skaven.js';
import { handleLookoutGnoblarEquipmentChange } from './equiprules/maneaters.js';
import { applyBattleMonksEquipmentRules } from './equiprules/battle-monks-of-cathay.js';
import { applyNorseExplorersEquipmentRules } from './equiprules/norse-explorers.js';
import { applyBretonnianChapelGuardEquipmentRules } from './equiprules/bretonnian-chapel-guard.js';
import { applyProfanePleasuresEquipmentRules } from './equiprules/profane-pleasures.js';
import { countSelectedMutations, getCultOfPossessedMutationCostInfo } from './equiprules/cult-of-possessed.js';
import { renderMagicSelection } from './spell-management.js';
import { updateWarriorRulesDisplay, renderStatInputs } from './ui.js';
import { getMountMovementModifier, applyMountStats } from './equiprules/mounts.js';
import { currentFighterMultiStats } from './state.js';

/** 
 * Returns true if the warband should be treated as "in pregame" for cost purposes.
 * This is true if either:
 * 1. The warband's pre_game flag is not false (warband is genuinely in pregame), OR
 * 2. The equipment filter toggle in the modal is set to 'starting'
 */
export const isEffectivePreGame = () => {
    const warbandPreGame = currentWarband && currentWarband.pre_game !== false;
    const filterModeInput = document.getElementById('equipment-filter-mode');
    const isStartingToggle = filterModeInput && filterModeInput.value === 'starting';
    return warbandPreGame || isStartingToggle;
};

/**
 * Returns display info for a data-driven pregame cost override (item.pregameCostModifiers),
 * or null if none applies. The "from" text reflects the item's normal (non-pregame) cost,
 * including any warband costModifiers, and is shown when either the base cost changes or
 * the variable (dice) cost is removed.
 */
export const getPregameCostDisplayInfo = (item, warbandName, specificName) => {
    const pgModifier = getApplicablePregameModifier(item, warbandName, specificName);
    if (!pgModifier) return null;

    let normalBase = item.baseCost !== undefined ? item.baseCost : parseFloat(item.cost) || 0;
    let normalVariable = item.variableCost || null;
    const warbandModifier = item.costModifiers?.warbands?.[warbandName];
    if (warbandModifier !== undefined) {
        if (typeof warbandModifier === 'object') {
            if (warbandModifier.baseCost !== undefined) normalBase = warbandModifier.baseCost;
            if (warbandModifier.variableCost !== undefined) normalVariable = warbandModifier.variableCost;
        } else {
            normalBase += warbandModifier;
        }
    }

    const pgBase = pgModifier.baseCost !== undefined ? pgModifier.baseCost : normalBase;
    const pgVariable = pgModifier.variableCost !== undefined ? pgModifier.variableCost : normalVariable;
    if (pgBase === normalBase && pgVariable === normalVariable) return null;

    const normalText = normalVariable ? `${normalBase} + ${String(normalVariable).toUpperCase()}` : `${normalBase}`;
    // Compare average costs so e.g. 85 vs 80 + 2D6 (avg 87) counts as cheaper
    const averageDice = (variable) => {
        const match = variable ? String(variable).match(/^(\d*)[dD](\d+)(?:x(\d+))?$/) : null;
        if (!match) return 0;
        return (parseInt(match[1]) || 1) * (parseInt(match[2]) + 1) / 2 * (parseInt(match[3]) || 1);
    };
    const isCheaper = pgBase + averageDice(pgVariable) <= normalBase + averageDice(normalVariable);
    return {
        originalCostText: ` de ${normalText} CO`,
        textColor: isCheaper ? 'green-300' : 'red-300'
    };
};

/**
 * Returns an array of equipment categories that should be hidden based on the fighter's
 * currently equipped items. Reads the `restrictCategories` property from each equipped
 * item's master data entry.
 */
export const getRestrictedCategoriesFromEquipment = () => {
    const jsonInput = document.getElementById('f-equipment-json');
    if (!jsonInput) return [];
    let currentEquipment;
    try {
        currentEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        return [];
    }
    const restricted = new Set();
    currentEquipment.forEach(equip => {
        const name = typeof equip === 'object' ? equip.name : equip;
        const masterItem = MASTER_EQUIPMENT_LIST.find(m => m.name === name);
        if (masterItem && Array.isArray(masterItem.restrictCategories)) {
            masterItem.restrictCategories.forEach(cat => restricted.add(cat));
        }
    });
    return [...restricted];
};

/**
 * Returns an array of equipment IDs that should be added to the starting equipment
 * filter based on the fighter's currently equipped items. Reads the `grantStartingEquipment`
 * property from each equipped item's master data entry.
 */
export const getGrantedStartingEquipmentFromEquipment = () => {
    const jsonInput = document.getElementById('f-equipment-json');
    if (!jsonInput) return [];
    let currentEquipment;
    try {
        currentEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        return [];
    }
    const granted = new Set();
    currentEquipment.forEach(equip => {
        const name = typeof equip === 'object' ? equip.name : equip;
        const masterItem = MASTER_EQUIPMENT_LIST.find(m => m.name === name);
        if (masterItem && Array.isArray(masterItem.grantStartingEquipment)) {
            masterItem.grantStartingEquipment.forEach(id => granted.add(id));
        }
    });
    return [...granted];
};

/** Validates Beastmaster equipment rules - limits War Beasts to 2 total */
export const validateBeastmasterEquipmentRules = (selectedEquipment, item, specificName) => {
    if (specificName !== "Beastmaster" || item.category !== "War Beasts") {
        return { valid: true };
    }

    // Count current War Beasts
    const warBeastCount = selectedEquipment.filter(eq => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        return masterItem && masterItem.category === "War Beasts";
    }).length;

    if (warBeastCount >= 2) {
        return {
            valid: false,
            message: "The Beastmaster may only have 2 War Beasts total."
        };
    }

    return { valid: true };
};

/** Validates lucky items house rule - limits to one each of Lucky Rabbit Foot, Lucky Charm, Holy (Unholy) Relic */
export const validateLuckyItemsLimit = (selectedEquipment, item, currentWarband) => {
    // Import the state dynamically to avoid circular dependency
    return import('./state.js').then(stateModule => {
        const isLuckyItemsLimited = stateModule.isLuckyItemsLimited;

        if (!isLuckyItemsLimited) {
            return { valid: true };
        }

        // Define the lucky item IDs
        const luckyItemIds = [32, 60, 69]; // Lucky Charm, Holy (Unholy) Relic, Rabbit's Foot

        if (!luckyItemIds.includes(item.id)) {
            return { valid: true };
        }

        // Count lucky items already in the warband (across all fighters and storage)
        let luckyItemCounts = {};

        // Count in current fighter's equipment
        selectedEquipment.forEach(eq => {
            const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
            if (masterItem && luckyItemIds.includes(masterItem.id)) {
                luckyItemCounts[masterItem.id] = (luckyItemCounts[masterItem.id] || 0) + 1;
            }
        });

        // Count in warband storage
        if (currentWarband && currentWarband.stored_equipment) {
            currentWarband.stored_equipment.forEach(eq => {
                const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
                if (masterItem && luckyItemIds.includes(masterItem.id)) {
                    luckyItemCounts[masterItem.id] = (luckyItemCounts[masterItem.id] || 0) + 1;
                }
            });
        }

        // Count in other fighters' equipment
        if (currentWarband && currentWarband.members) {
            currentWarband.members.forEach(member => {
                if (member.equipment && Array.isArray(member.equipment)) {
                    member.equipment.forEach(eq => {
                        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
                        if (masterItem && luckyItemIds.includes(masterItem.id)) {
                            luckyItemCounts[masterItem.id] = (luckyItemCounts[masterItem.id] || 0) + 1;
                        }
                    });
                }
            });
        }

        // Check if adding this item would exceed the limit
        if (luckyItemCounts[item.id] >= 1) {
            return {
                valid: false,
                message: `Regla de la Casa: Los objetos de la suerte están limitados a uno por banda. ${translateEquipment(item.name)} ya está equipado en la banda.`
            };
        }

        return { valid: true };
    });
};

/** Formats equipment rules for display, handling both string and array formats */
export const formatEquipmentRules = (rules, itemName = '') => {
    return translateEquipmentRules(itemName, rules);
};

/** Gets unique grades for a given category */
export const getUniqueGradesForCategory = (category) => {
    const itemsInCategory = MASTER_EQUIPMENT_LIST.filter(item => item.category === category);
    const grades = [...new Set(itemsInCategory.map(item => item.grade?.toLowerCase()).filter(grade => grade))];
    return grades.sort(); // Sort alphabetically
};

/** Renders grade filter checkboxes for the equipment modal */
export const renderGradeFilterCheckboxes = (category) => {
    const gradeFilterContainer = document.getElementById('grade-filter-container');
    if (!gradeFilterContainer) return;

    const grades = getUniqueGradesForCategory(category);

    // If no grades in this category, hide the filter
    if (grades.length === 0) {
        gradeFilterContainer.style.display = 'none';
        return;
    }

    gradeFilterContainer.style.display = 'block';

    const gradeCheckboxes = document.getElementById('grade-checkboxes');
    gradeCheckboxes.innerHTML = '';

    // Add checkboxes for each grade
    grades.forEach(grade => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'flex items-center space-x-2';
        checkboxWrapper.innerHTML = `
            <input type="checkbox" id="grade-${grade}" value="${grade}" class="w-4 h-4 text-mordheim-gold bg-slate-700 border-slate-600 rounded focus:ring-mordheim-gold focus:ring-2">
            <label for="grade-${grade}" class="text-sm text-slate-300 cursor-pointer">${grade}</label>
        `;
        gradeCheckboxes.appendChild(checkboxWrapper);
    });

    // Set up event listeners for checkboxes
    grades.forEach(grade => {
        const checkbox = document.getElementById(`grade-${grade}`);
        checkbox.addEventListener('change', () => {
            renderModalEquipmentOptions();
        });
    });

    // Set up Select All button
    const selectAllBtn = document.getElementById('select-all-grades-btn');
    if (selectAllBtn) {
        selectAllBtn.onclick = () => {
            grades.forEach(grade => {
                const checkbox = document.getElementById(`grade-${grade}`);
                if (checkbox) checkbox.checked = true;
            });
            renderModalEquipmentOptions();
        };
    }

    // Set up Clear All button
    const clearAllBtn = document.getElementById('clear-all-grades-btn');
    if (clearAllBtn) {
        clearAllBtn.onclick = () => {
            grades.forEach(grade => {
                const checkbox = document.getElementById(`grade-${grade}`);
                if (checkbox) checkbox.checked = false;
            });
            renderModalEquipmentOptions();
        };
    }

    // Initially select all grades
    selectAllBtn?.click();
};

/** Formats equipment rarity for display */
export const formatEquipmentRarity = (rarity, warbandName, race) => {
    if (!rarity && rarity !== 0) return '';
    let val = rarity;
    if (typeof rarity === 'object' && rarity !== null) {
        if (race && rarity[race] !== undefined) {
            val = rarity[race];
        } else if (warbandName && rarity[warbandName] !== undefined) {
            val = rarity[warbandName];
        } else if (rarity.base !== undefined) {
            val = rarity.base;
        } else {
            return '';
        }
    }
    const translated = translateRarity(val);
    return translated ? `Rareza: ${translated}` : '';
};

/** Renders the equipment selector with categories and initial options */
export const renderEquipmentSelector = (selectedEquipment = []) => {
    const categorySelect = document.getElementById('equipment-category-select');

    // Only render category select if it exists (for backward compatibility)
    if (categorySelect) {
        let categories = [...new Set(MASTER_EQUIPMENT_LIST.map(item => item.category))];

    // Restrict "Blessings of Nurgle", "Sacred Markings", and "Lords Boon" to:
    // - Add fighter modal, OR
    // - Pre-game build mode / Starting equipment toggle
    const isEditing = document.getElementById('fighter-id').value !== '';
    if (isEditing && !isEffectivePreGame()) {
        categories = categories.filter(cat => cat !== "Blessings of Nurgle" && cat !== "Sacred Markings" && cat !== "Lords Boon");
    }

    // Filter out categories restricted by equipped items (e.g. Swordmaster blocks Missile Weapon / Blackpowder)
    const restrictedCats = getRestrictedCategoriesFromEquipment();
    if (restrictedCats.length > 0) {
        categories = categories.filter(cat => !restrictedCats.includes(cat));
    }

        categorySelect.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
        // Set "Close Combat" as the default category if it exists
        if (categories.includes('Close Combat')) {
            categorySelect.value = 'Close Combat';
        }
        renderEquipmentOptions();
    }

    setAvailableEquipmentFilterIds(null); // Clear filter when modal is opened

    // Store selected items in the hidden input as JSON string
    document.getElementById('f-equipment-json').value = JSON.stringify(selectedEquipment);

    renderSelectedEquipment();
};

/** Renders the list of selectable items based on the chosen category */
export const renderEquipmentOptions = () => {
    const categorySelect = document.getElementById('equipment-category-select');
    const optionsContainer = document.getElementById('equipment-options-list');

    // Only render if elements exist (for backward compatibility)
    if (!categorySelect || !optionsContainer) return;

    const selectedCategory = categorySelect.value;
    optionsContainer.innerHTML = '';

    let items = MASTER_EQUIPMENT_LIST.filter(item => item.category === selectedCategory);

    // Apply Battle Monks of Cathay equipment restrictions
    const warbandName = currentWarband ? currentWarband.type : null;
    const specificName = document.getElementById('f-warrior-choice').value.trim() || document.getElementById('f-name').value.trim();
    if (warbandName === 'Battle Monks of Cathay') {
        items = applyBattleMonksEquipmentRules(items, specificName);
    }

    // Apply Court of the Profane Pleasures equipment restrictions
    if (warbandName === 'Court of the Profane Pleasures') {
        items = applyProfanePleasuresEquipmentRules(items, specificName);
    }

    // Apply Norse Explorers Berserker equipment restrictions
    if (warbandName === 'Norse Explorers') {
        items = applyNorseExplorersEquipmentRules(items, specificName);
    }

    // Apply Bretonnian Chapel Guard equipment restrictions
    const isEditing = document.getElementById('fighter-id').value !== '';
    if (warbandName === 'Bretonnian Chapel Guard') {
        items = applyBretonnianChapelGuardEquipmentRules(items, specificName, isEditing);
    }

    // Apply Order of the Mare equipment restrictions
    if (warbandName === 'Order of the Mare') {
        items = applyOrderOfTheMareEquipmentRules(items, specificName, isEditing);
    }

    // Get current fighter info for restrictions and cost calculations
    const fighterType = document.getElementById('f-type').value.toLowerCase() === 'hero' ? 'hero' : 'henchman';
    const race = document.getElementById('f-race').value;

    // Get fighter skills for restriction checks (only for existing fighters)
    let fighterSkills = null;
    const fighterId = document.getElementById('fighter-id').value;
    if (fighterId && currentWarband && currentWarband.members) {
        const fighter = currentWarband.members.find(m => m.id === fighterId);
        if (fighter) {
            fighterSkills = fighter.skills || [];
        }
    }

    // Get fighter special rules
    const specialRulesInput = document.getElementById('f-special-rules');
    const fighterSpecialRules = specialRulesInput ? specialRulesInput.value.split('; ').filter(r => r.trim()) : [];

    // For new fighters, limit equipment options to starting equipment
    const isNewFighterModal = document.getElementById('fighter-id').value === '';
    if (isNewFighterModal && warbandName) {
        const warbandData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === warbandName);
        const warriorChoice = document.getElementById('f-warrior-choice').value;
        const warrior = warbandData?.data?.warriors.find(w => w.name === warriorChoice);
        let startingEquipment = warrior?.starting_equipment || [];
        // Lahmian Beloved: use alt equipment based on location
        if (warbandName === 'Lahmian' && warriorChoice === 'Beloved' && warrior?.starting_equipment_alt) {
            const location = currentWarband.location || 'Foreign';
            if (location === 'Khemrian') {
                startingEquipment = warrior.starting_equipment_alt;
            }
        }
        // Add equipment IDs granted by currently equipped items (e.g. Sea Guard grants Elf Bow)
        const grantedIds = getGrantedStartingEquipmentFromEquipment();
        if (grantedIds.length > 0) {
            startingEquipment = [...startingEquipment, ...grantedIds.filter(id => !startingEquipment.includes(id))];
        }
        setAvailableEquipmentFilterIds(startingEquipment);
    }

    // Get the available equipment filter from global state
    const availableEquipmentFilterIds = getAvailableEquipmentFilterIds();

    // For vehicles, limit equipment options to starting equipment (always, not just for new vehicles)
    const isVehicle = document.getElementById('f-type').value === 'Vehicle';
    if (isVehicle) {
        const vehicleChoice = document.getElementById('f-vehicle-choice').value;
        const vehicle = VEHICLES.flatMap(g => g.vehicles).find(v => v.name === vehicleChoice);
        const startingEquipment = vehicle?.data?.starting_equipment || [];
        setAvailableEquipmentFilterIds(startingEquipment);
    }

    // Special handling for different categories
    if (selectedCategory === "Mutations") {
        // Check if the current warband is listed in any mutation's restrictedWarbands
        const isMutationWarband = currentWarband && MASTER_EQUIPMENT_LIST
            .some(item => item.category === "Mutations" && 
                  item.restrictedWarbands?.includes(currentWarband.type));
        const isAddNewFighter = document.getElementById('fighter-id').value === '';

        if ((isMutationWarband && isAddNewFighter) || (fighterSkills && fighterSkills.includes('Mutant'))) {
            // Show mutations without applying the general filter
            items = MASTER_EQUIPMENT_LIST.filter(item => item.category === "Mutations");
        } else {
            // Hide mutations if conditions not met
            items = [];
        }
    } else {
        // Apply filter if availableEquipmentFilterIds is set (for other categories)
        if (availableEquipmentFilterIds && availableEquipmentFilterIds.length > 0) {
            items = items.filter(item => availableEquipmentFilterIds.includes(item.id));
        }
    }

    // Filter out restricted items
    items = items.filter(item => isEquipmentAvailable(item, warbandName, fighterType, race, specificName, fighterSkills, fighterSpecialRules));

    items.forEach(item => {
        const isNewFighterModal = document.getElementById('fighter-id').value === '';
        const isPreGame = isEffectivePreGame();
        const isDwarf = currentWarband && (currentWarband.type === 'Dwarf Treasure Hunters' || currentWarband.type === 'Dwarf Rangers' || currentWarband.type === 'Dwarf Slayer Cult');
        const hasGromril = document.getElementById('f-special-rules').value.split('; ').includes('Gromril');
        const isGromilArmour = item.name === 'Armour; Heavy - Gromril';
        const isHochlandBandit = currentWarband && currentWarband.type === 'Hochland Bandits';

        // Calculate modified cost using the new system
        const modifiedCost = calculateModifiedCost(item, warbandName, fighterType, race, specificName);
        const baseCost = item.baseCost !== undefined ? item.baseCost : parseFloat(item.cost) || 0;

        let displayedCost = modifiedCost;
        let originalCostText = '';
        let textColor = 'slate-400';

        // Apply Armour & Shield 50% Discount BEFORE all other modifiers
        const armourShieldResult = applyArmourShieldHalfCostDiscount(displayedCost, item);
        if (armourShieldResult.discountApplied) {
            displayedCost = armourShieldResult.finalCost;
            originalCostText = ` (Regla de la Casa: 50% Descuento Armadura/Escudo - Antes: ${armourShieldResult.originalCost} CO)`;
            textColor = 'green-300';
        }

        // Check if cost is different from base (for display purposes)
        if (!armourShieldResult.discountApplied && modifiedCost !== baseCost) {
            originalCostText = ` (Base: ${baseCost} CO)`;
            textColor = modifiedCost < baseCost ? 'green-300' : 'red-300';
        }

        // Apply Dwarf Treasure Hunter discounts
        if (isDwarf) {
            const discountInfo = getDwarfDiscountDisplayInfo(item, isPreGame, hasGromril, baseCost);
            displayedCost = discountInfo.displayedCost;
            originalCostText = discountInfo.originalCostText;
            textColor = discountInfo.textColor;
        }

        // Apply Hochland Bandits discounts
        if (isHochlandBandit) {
            const banditDiscountInfo = getHochlandBanditDiscountDisplayInfo(item, isNewFighterModal, displayedCost);
            displayedCost = banditDiscountInfo.displayedCost;
            originalCostText = banditDiscountInfo.originalCostText;
            textColor = banditDiscountInfo.textColor;
        }

        // Apply Lizardmen light armor cost
        const isLizardmen = currentWarband && currentWarband.type === 'Lizardmen';
        if (isLizardmen) {
            const lizardmenDiscountInfo = getLizardmenDiscountDisplayInfo(item, baseCost);
            // Only override if the item is Armour; Light, otherwise use the calculated modified cost
            if (item.name === 'Armour; Light') {
                displayedCost = lizardmenDiscountInfo.displayedCost;
                originalCostText = lizardmenDiscountInfo.originalCostText;
                textColor = lizardmenDiscountInfo.textColor;
            }
        }

        // Apply data-driven pregame cost modifiers (generic). displayedCost already reflects the
        // pregame price via calculateModifiedCost; this only updates the label. Skipped when the
        // Armour/Shield house rule label is already showing.
        if (!armourShieldResult.discountApplied) {
            const pgInfo = getPregameCostDisplayInfo(item, warbandName, specificName);
            if (pgInfo) {
                originalCostText = pgInfo.originalCostText;
                textColor = pgInfo.textColor;
            }
        }

        // Apply Druchii Crossbow Repeater discount
        if (race === 'Dark Elf') {
            const druchiiDiscountInfo = getDruchiiDiscountDisplayInfo(item, race, isNewFighterModal, displayedCost);
            displayedCost = druchiiDiscountInfo.displayedCost;
            originalCostText = druchiiDiscountInfo.originalCostText;
            textColor = druchiiDiscountInfo.textColor;
        }

        // Apply Order of the Mare mount discounts
        const isOrderOfTheMare = currentWarband && currentWarband.type === 'Order of the Mare';
        if (isOrderOfTheMare && (specificName === 'Paragon' || specificName === 'Gallant')) {
            const orderOfTheMareDiscountInfo = getOrderOfTheMareDiscountDisplayInfo(item, isNewFighterModal, specificName, baseCost);
            displayedCost = orderOfTheMareDiscountInfo.displayedCost;
            originalCostText = orderOfTheMareDiscountInfo.originalCostText;
            textColor = orderOfTheMareDiscountInfo.textColor;
        }

        // Apply Imperial Outriders Warhorse discount
        const isImperialOutriders = currentWarband && currentWarband.type === 'Imperial Outriders';
        if (isImperialOutriders && isNewFighterModal) {
            const imperialOutridersDiscountInfo = getImperialOutridersDiscountDisplayInfo(item, isNewFighterModal, displayedCost);
            displayedCost = imperialOutridersDiscountInfo.displayedCost;
            originalCostText = imperialOutridersDiscountInfo.originalCostText;
            textColor = imperialOutridersDiscountInfo.textColor;
        }

        // Apply Night Goblins Web spear discount
        const isNightGoblinsWeb = currentWarband && currentWarband.type === 'Night Goblins Web';
        if (isNightGoblinsWeb && isPreGame) {
            const nightGoblinsWebDiscountInfo = getNightGoblinsWebDiscountDisplayInfo(item, isPreGame, specificName, displayedCost);
            displayedCost = nightGoblinsWebDiscountInfo.displayedCost;
            originalCostText = nightGoblinsWebDiscountInfo.originalCostText;
            textColor = nightGoblinsWebDiscountInfo.textColor;
        }

        // Apply Cult of the Possessed mutation double-cost
        if (currentWarband && currentWarband.type === 'Cult of the Possessed' && item.category === 'Mutations') {
            const mutationCostInfo = getCultOfPossessedMutationCostInfo(item, displayedCost);
            displayedCost = mutationCostInfo.displayedCost;
            originalCostText = mutationCostInfo.originalCostText;
            textColor = mutationCostInfo.textColor;
        }

        // Apply Blackpowder Pre-Game Discount (AFTER all other modifiers)
        const blackpowderResult = applyBlackpowderPreGameDiscount(displayedCost, item);
        let preGameDiscountApplied = false;
        let preGameOriginalCost = displayedCost;
        if (blackpowderResult.discountApplied) {
            displayedCost = blackpowderResult.finalCost;
            preGameDiscountApplied = true;
            preGameOriginalCost = blackpowderResult.originalCost;
        }

        // Apply Blackpowder 20% Discount (AFTER pre-game discount so they stack)
        const blackpowder20Result = applyBlackpowder20PercentDiscount(displayedCost, item);
        if (blackpowder20Result.discountApplied || preGameDiscountApplied) {
            if (preGameDiscountApplied && blackpowder20Result.discountApplied) {
                displayedCost = blackpowder20Result.finalCost;
                originalCostText = ` (Reglas de la Casa: Pre-Partida 1/3 + 20% Descuento Pólvora - Antes: ${preGameOriginalCost} CO)`;
            } else if (blackpowder20Result.discountApplied) {
                displayedCost = blackpowder20Result.finalCost;
                originalCostText = ` (Regla de la Casa: 20% Descuento Pólvora - Antes: ${blackpowder20Result.originalCost} CO)`;
            } else {
                originalCostText = ` (Regla de la Casa: Descuento Pólvora Pre-Partida - Antes: ${preGameOriginalCost} CO)`;
            }
            textColor = 'green-300';
        }

        const rarityText = formatEquipmentRarity(item.rarity, warbandName, race);
        const rarityDisplay = rarityText ? ` <span class="text-blue-300 text-xs">${rarityText}</span>` : '';

        // Determine effective variable cost display
        let variableCostDisplay = '';
        const parsedCost = parseCostString(item, warbandName, fighterType, race, specificName);
        if (parsedCost.isVariable) {
            const diceText = parsedCost.multiplier > 1
                ? `${parsedCost.diceCount}D6x${parsedCost.multiplier}`
                : `${parsedCost.diceCount}D6`;
            variableCostDisplay = ` + ${diceText}`;
        }

        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center p-2 rounded-lg hover:bg-slate-700 cursor-pointer text-sm transition';
        const rulesId = `equip-rules-${item.id}`;
        const displayName = translateEquipment(item.name) !== item.name
            ? `${translateEquipment(item.name)} <span class="text-slate-400 font-normal">(${item.name})</span>`
            : item.name;
        itemElement.innerHTML = `
            <div style="flex: 1; min-width: 0;">
                <p class="font-semibold equip-name-toggle" data-rules-target="${rulesId}" style="cursor: pointer;">
                    <i class="fas fa-chevron-right text-xs text-slate-500 equip-chevron" style="transition: transform 0.2s; margin-right: 4px; font-size: 0.6rem;"></i>${displayName} <span class="text-${textColor} text-xs">(${displayedCost}${variableCostDisplay} CO${originalCostText})</span>${rarityDisplay}
                </p>
                <p id="${rulesId}" class="text-xs text-slate-500 italic equip-rules-content hidden" style="margin-top: 4px;">${formatEquipmentRules(item.rules, item.name)}</p>
            </div>
            <button class="text-green-400 hover:text-green-300 ml-2 flex-shrink-0" data-action="add-equipment" data-item-id="${item.id}">
                <i class="fas fa-plus-circle"></i> Añadir
            </button>
        `;
        // Add click handler to toggle description visibility
        const nameToggle = itemElement.querySelector('.equip-name-toggle');
        nameToggle.addEventListener('click', () => {
            const rulesEl = document.getElementById(rulesId);
            const chevron = nameToggle.querySelector('.equip-chevron');
            if (rulesEl) {
                rulesEl.classList.toggle('hidden');
                if (chevron) {
                    chevron.style.transform = rulesEl.classList.contains('hidden') ? '' : 'rotate(90deg)';
                }
            }
        });
        optionsContainer.appendChild(itemElement);
    });
};

/**
 * Updates the display of granted skill categories based on current equipment.
 * Combines base skill categories (from fighter data/warband) with equipment-granted
 * categories and displays them in the Available Skill Tables section.
 * @param {Array} selectedEquipment - Array of currently selected equipment items
 */
export const updateGrantedSkillCategoriesDisplay = (selectedEquipment) => {
    const grantedCategories = [];
    const restrictedCategories = [];
    
    // Collect all skill categories granted and restricted by current equipment
    selectedEquipment.forEach(item => {
        // Find the master item by name first
        const masterItems = MASTER_EQUIPMENT_LIST.filter(i => i.name === item.name);
        
        let masterItem = null;
        
        // If there are multiple items with the same name, try to find the best match
        if (masterItems.length > 1) {
            // For "Mark of Arkhar the Dog", prefer the Seer version (ID 433) over Leader version (ID 432)
            if (item.name === "Mark of Arkhar the Dog") {
                masterItem = masterItems.find(i => i.id === 433) || masterItems[0];
            } else {
                // For other duplicate names, use the first match
                masterItem = masterItems[0];
            }
        } else {
            masterItem = masterItems[0];
        }
        
        if (masterItem && masterItem.grantsSKillCat && Array.isArray(masterItem.grantsSKillCat)) {
            masterItem.grantsSKillCat.forEach(category => {
                if (!grantedCategories.includes(category)) {
                    grantedCategories.push(category);
                }
            });
        }

        // Collect restricted skill categories from equipment
        if (masterItem && masterItem.restrictSkillCat && Array.isArray(masterItem.restrictSkillCat)) {
            masterItem.restrictSkillCat.forEach(category => {
                if (!restrictedCategories.includes(category)) {
                    restrictedCategories.push(category);
                }
            });
        }
    });
    
    // Update the global state
    setAvailableSkillCategories(grantedCategories);
    setRestrictedSkillCategories(restrictedCategories);
    
    // Get current fighter skills from modal DOM if available
    let skillsList = [];
    const skillsInput = document.getElementById('f-skills-hidden');
    if (skillsInput && skillsInput.value) {
        try {
            skillsList = JSON.parse(skillsInput.value);
        } catch (e) {}
    }
    const hasSkillGrant = skillsList.includes("Powerful Build") || skillsList.includes("Aspect of the Stag");

    // Combine base skill categories with equipment-granted categories
    const baseCats = getBaseSkillCategories();
    const combined = [...new Set([...baseCats, ...grantedCategories])];

    if (hasSkillGrant && !combined.includes("Strength")) {
        combined.push("Strength");
    }

    // Filter out restricted categories for the effective list
    const effective = combined.filter(cat => !restrictedCategories.includes(cat));
    
    // Update the Available Skill Tables display
    const skillTablesDisplay = document.getElementById('skill-tables-display');
    const skillTablesList = document.getElementById('skill-tables-list');
    if (skillTablesDisplay && skillTablesList) {
        if (effective.length > 0 || restrictedCategories.length > 0) {
            // Build display: base categories as plain text, equipment-granted ones highlighted
            const categoriesHtml = effective.map(category => {
                const categoryEs = translateSkillCategory(category);
                const isFromEquipment = grantedCategories.includes(category) && !baseCats.includes(category);
                if (isFromEquipment) {
                    return `<span class="text-slate-300">${categoryEs}</span> <span class="text-green-400 text-xs">(por equipo)</span>`;
                }
                const isFromSkill = category === "Strength" && hasSkillGrant && !baseCats.includes(category);
                if (isFromSkill) {
                    return `<span class="text-slate-300">${categoryEs}</span> <span class="text-green-400 text-xs">(por habilidad)</span>`;
                }
                return `<span class="text-slate-300">${categoryEs}</span>`;
            }).join(', ');

            // Show restricted categories with strikethrough
            const restrictedHtml = restrictedCategories.length > 0
                ? (effective.length > 0 ? ', ' : '') + restrictedCategories.map(cat =>
                    `<span class="text-red-400 line-through">${translateSkillCategory(cat)}</span> <span class="text-red-400 text-xs">(restringido por equipo)</span>`
                ).join(', ')
                : '';

            // Check if a skill access override is active
            const overrideInput = document.getElementById('f-skill-categories-override-json');
            const hasOverride = overrideInput && overrideInput.value && overrideInput.value !== '[]';
            const overrideIndicator = hasOverride ? ' <span class="text-orange-400 text-xs font-semibold ml-2">(personalizado)</span>' : '';

            skillTablesList.innerHTML = categoriesHtml + restrictedHtml + overrideIndicator;
            skillTablesDisplay.classList.remove('hidden');
        } else {
            skillTablesDisplay.classList.add('hidden');
        }
    }
    
    // Clear the old granted-skill-categories-display since info is now in skill tables
    const grantedCategoriesDisplay = document.getElementById('granted-skill-categories-display');
    if (grantedCategoriesDisplay) {
        grantedCategoriesDisplay.innerHTML = '';
    }
};

/** Toggles the expansion div for Gromril options */
window.toggleExpansion = (element) => {
    const expansion = element.nextElementSibling;
    expansion.classList.toggle('hidden');
};

/** Updates the display when weapon modifier checkbox is changed */
window.updateWeaponModifier = (checkbox, itemId, modifierType) => {
    // Navigate from checkbox to the cost span: input -> label -> div.expansion -> previous div -> p -> span
    const costSpan = checkbox.parentElement.parentElement.previousElementSibling.querySelector('p.font-semibold span');
    const rulesP = checkbox.parentElement.parentElement.previousElementSibling.querySelector('p.text-xs');
    const nameSpan = checkbox.parentElement.parentElement.previousElementSibling.querySelector('p.font-semibold');
    // Use a more specific selector to find the outer flex container (not the label.flex)
    const button = checkbox.closest('.flex.justify-between')?.querySelector('button[data-action="add-equipment-from-modal"]');

    const item = MASTER_EQUIPMENT_LIST.find(i => i.id == itemId);
    const baseCost = item.baseCost !== undefined ? item.baseCost : parseFloat(item.cost) || 0;

    const isDwarf = currentWarband && (currentWarband.type === 'Dwarf Treasure Hunters' || currentWarband.type === 'Dwarf Rangers' || currentWarband.type === 'Dwarf Slayer Cult');
    const hasGromril = document.getElementById('f-special-rules').value.split('; ').includes('Gromril');
    const isPreGame = currentWarband && currentWarband.pre_game !== false;

    // Make checkboxes mutually exclusive
    const expansionDiv = checkbox.parentElement.parentElement;
    const checkboxes = expansionDiv.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (cb !== checkbox) {
            cb.checked = false;
        }
    });

    if (checkbox.checked) {
        let newCost;
        let newRules;
        let modifierName;
        if (modifierType === 'gromril') {
            newCost = baseCost * 4;
            if (isDwarf && hasGromril && isPreGame) {
                newCost = baseCost * 3;
            }
            newRules = item.rules + "\n\nA gromril weapon has an extra -1 save modifier.";
            modifierName = "Gromril";
        } else if (modifierType === 'ithilmar') {
            newCost = baseCost * 3;
            const hasIthilmar = document.getElementById('f-special-rules').value.split('; ').includes('Ithilmar');
            if (hasIthilmar && isPreGame) {
                newCost = baseCost * 2;
            }
            newRules = item.rules + "\n\n+1 Initiative in hand-to-hand combat.";
            modifierName = "Ithilmar";
        } else if (modifierType === 'obsidian') {
            newCost = baseCost * 4;
            newRules = item.rules + "\n\nStrength +1\n\nBlemished: Obsidian weapons may never be used by Dwarfs, Elves, Sisters of Sigmar, Witch Hunters or Priests.\n\nHeavy: Obsidian weapons are so heavy that the warrior using them always strikes last, even when charging.";
            modifierName = "Obsidian";
        }
        
        // Update display with modified name
        const modifiedName = `${item.name} - ${modifierName}`;
        nameSpan.innerHTML = `${modifiedName} <span class="text-slate-400 text-xs">(${newCost} CO)</span>`;
        rulesP.textContent = newRules;
        button.dataset.cost = newCost;
        button.dataset.rules = newRules;
        button.dataset.modifiedName = modifiedName;
    } else {
        // Reset to original
        const originalCost = button.dataset.originalCost;
        const originalText = button.dataset.originalText || '';
        const textColor = button.dataset.textColor || 'slate-400';
        nameSpan.innerHTML = `${item.name} <span class="text-${textColor} text-xs">(${originalCost} CO${originalText})</span>`;
        rulesP.textContent = item.rules;
        delete button.dataset.cost;
        delete button.dataset.rules;
        delete button.dataset.modifiedName;
    }
};

/** Calculates the modified cost of an equipment item based on all cost modifiers */
export const calculateModifiedCost = (masterItem, warbandName, fighterType, race, specificName) => {
    if (!masterItem) return 0;

    // Start with base cost (handle new format)
    let cost = masterItem.baseCost !== undefined ? masterItem.baseCost : parseFloat(masterItem.cost) || 0;

    // Apply data-driven pregame cost modifiers (takes priority over normal warband costModifiers)
    let pregameApplied = false;
    const pgModifier = getApplicablePregameModifier(masterItem, warbandName, specificName);
    if (pgModifier) {
        if (pgModifier.baseCost !== undefined) cost = pgModifier.baseCost;
        pregameApplied = true;
    }

    // Get cost modifiers
    const costModifiers = masterItem.costModifiers || {};

    // Apply warband modifiers (skipped when a pregame override applied, so it isn't overwritten)
    if (!pregameApplied && warbandName && costModifiers.warbands && costModifiers.warbands[warbandName]) {
        const warbandModifier = costModifiers.warbands[warbandName];
        if (typeof warbandModifier === 'object' && warbandModifier.baseCost !== undefined) {
            cost = warbandModifier.baseCost;
        } else {
            cost += warbandModifier;
        }
    }

    // Apply hero type modifiers
    if (fighterType && costModifiers.heroTypes && costModifiers.heroTypes[fighterType]) {
        cost += costModifiers.heroTypes[fighterType];
    }

    // Apply race modifiers
    if (race && costModifiers.races && costModifiers.races[race]) {
        cost += costModifiers.races[race];
    }

        // Apply specific hero modifiers (override instead of add)
        if (specificName && costModifiers.specificHeroes && costModifiers.specificHeroes[specificName]) {
            const heroModifier = costModifiers.specificHeroes[specificName];
            if (heroModifier.baseCost !== undefined) {
                cost = heroModifier.baseCost;
            } else {
                cost += heroModifier;
            }
        }

    // Apply specific henchman modifiers
    if (specificName && costModifiers.specificHenchmen && costModifiers.specificHenchmen[specificName]) {
        cost += costModifiers.specificHenchmen[specificName];
    }

    return Math.max(0, cost); // Ensure cost is not negative
};

/** Checks if an equipment item is available for the given fighter */
export const isEquipmentAvailable = (masterItem, warbandName, fighterType, race, specificName, skills = null, specialRules = null) => {
    if (!masterItem) return false;

    // Mutant Skill (ID 702) allows purchase of mutations
    if (masterItem.category === "Mutations" && skills && skills.includes("Mutant")) {
        return true;
    }

    // Check warband restrictions
    const restrictedWarbands = masterItem.restrictedWarbands || [];
    if (restrictedWarbands.length > 0 && warbandName && !restrictedWarbands.includes(warbandName)) {
        return false;
    }

    // Check cannotPurchase
    const cannotPurchase = masterItem.cannotPurchase || [];
    if (cannotPurchase.length > 0 && warbandName && cannotPurchase.includes(warbandName)) {
        return false;
    }

    // Check hero type restrictions
    const restrictedHeroTypes = masterItem.restrictedHeroTypes || [];
    if (restrictedHeroTypes.length > 0 && fighterType && restrictedHeroTypes.includes(fighterType)) {
        return false;
    }

    // Check race restrictions
    const restrictedRaces = masterItem.restrictedRaces || [];
    if (restrictedRaces.length > 0 && race && !restrictedRaces.includes(race)) {
        return false;
    }

    // Check allowed specific heroes
    const allowedSpecificHeroes = masterItem.allowedSpecificHeroes || [];
    if (allowedSpecificHeroes.length > 0 && specificName && !allowedSpecificHeroes.includes(specificName)) {
        return false;
    }

    // Check skill restrictions (only for existing fighters)
    const restrictedSkills = masterItem.restrictedSkills || [];
    if (restrictedSkills.length > 0 && skills !== null && !restrictedSkills.every(skill => skills.includes(skill))) {
        return false;
    }

    // Check special rule prerequisites
    const specialRulePrereq = masterItem.specialRulePrereq || [];
    if (specialRulePrereq.length > 0 && specialRules && !specialRulePrereq.every(rule => specialRules.includes(rule))) {
        return false;
    }

    return true;
};

/** Updates the costs of selected equipment based on current special rules */
export const updateEquipmentCostsForSpecialRules = (selectedEquipment, isNewFighterModal, isDwarfTreasureHunter, hasGromril, isLizardmen) => {
    selectedEquipment.forEach(item => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
        if (!masterItem) return;

        // Get current fighter info
        const fighterType = document.getElementById('f-type').value.toLowerCase() === 'hero' ? 'hero' : 'henchman';
        const race = document.getElementById('f-race').value;
        const specificName = document.getElementById('f-warrior-choice').value.trim() || document.getElementById('f-name').value.trim();
        const warbandName = currentWarband ? currentWarband.type : null;

        // Calculate modified cost (includes data-driven pregame overrides)
        const modifiedCost = calculateModifiedCost(masterItem, warbandName, fighterType, race, specificName);
        item.cost = modifiedCost;
    });
};

/** Renders the currently selected equipment list */
export const renderSelectedEquipment = () => {
    const listContainer = document.getElementById('selected-equipment-list');
    const jsonInput = document.getElementById('f-equipment-json');

    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedEquipment = [];
    }

    // Normalize equipment to handle both V1 and V2 formats
    selectedEquipment = selectedEquipment.map(item => normalizeEquipment(item));
    console.log('After normalization:', selectedEquipment);

    // Adjust equipment costs (e.g., first Dagger free)
    selectedEquipment = adjustEquipmentCosts(selectedEquipment);
    console.log('After cost adjustment:', selectedEquipment);

    // Update the JSON with adjusted costs
    jsonInput.value = JSON.stringify(selectedEquipment);

    // Get current fighter info for rarity display
    const warbandName = currentWarband ? currentWarband.type : null;
    const race = document.getElementById('f-race').value;

    listContainer.innerHTML = '';

    // Calculate and update the total cost display (cost per fighter)
    const totalCostPerFighter = calculateEquipmentCost(selectedEquipment);

    if (selectedEquipment.length === 0) {
         listContainer.innerHTML = `<li class="text-slate-500">Ningún equipo seleccionado.</li>`;
    }

    selectedEquipment.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'flex justify-between items-center text-yellow-200 text-sm py-1 px-2 rounded hover:bg-slate-800/60 transition';

        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
        const originalCost = masterItem ? masterItem.baseCost : item.baseCost || item.cost;

        // Use variableCost if available (for variable cost equipment), otherwise use cost
        // But if variableCost is a string like "D6", use cost instead
        let displayCost = item.cost;
        if (typeof item.variableCost === 'number') {
            displayCost = item.variableCost;
        }
        
        let costDisplay = `(${displayCost} CO)`;
        if (masterItem && displayCost != originalCost) {
            costDisplay = `(${displayCost} CO, Base: ${originalCost} CO)`;
        }

        // Format rarity for display
        const rarityText = formatEquipmentRarity(masterItem?.rarity, warbandName, race);
        const rarityDisplay = rarityText ? ` <span class="text-blue-300 text-xs">${rarityText}</span>` : '';

        const isEditing = document.getElementById('fighter-id').value !== '';
        const canRemove = !(masterItem && masterItem.category === "Blessings of Nurgle" && isEditing);

        const displayName = translateEquipment(item.name) !== item.name
            ? `${translateEquipment(item.name)} <span class="text-slate-400 font-normal text-xs">(${item.name})</span>`
            : item.name;

        const canMoveUp = index > 0;
        const canMoveDown = index < selectedEquipment.length - 1;
        const showMoveBtns = selectedEquipment.length > 1;

        listItem.innerHTML = `
            <span>${displayName} <span class="text-slate-400 text-xs">${costDisplay}</span>${rarityDisplay}</span>
            <div class="flex items-center gap-1.5 flex-shrink-0 ml-2">
                ${showMoveBtns ? `
                <button type="button" class="text-slate-400 hover:text-white px-1.5 py-0.5 rounded transition ${!canMoveUp ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-700'}" data-action="move-equipment-up" data-item-index="${index}" title="Subir" ${!canMoveUp ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up text-xs"></i>
                </button>
                <button type="button" class="text-slate-400 hover:text-white px-1.5 py-0.5 rounded transition ${!canMoveDown ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-700'}" data-action="move-equipment-down" data-item-index="${index}" title="Bajar" ${!canMoveDown ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down text-xs"></i>
                </button>
                ` : ''}
                ${canRemove ? `
                <button type="button" class="text-red-400 hover:text-red-300 px-1 py-0.5" data-action="remove-equipment" data-item-index="${index}" data-item-name="${item.name}" data-item-cost="${displayCost}" data-item-rules="${item.rules}" title="Eliminar">
                    <i class="fas fa-times-circle"></i>
                </button>
                ` : ''}
            </div>
        `;
        listContainer.appendChild(listItem);
    });

    document.getElementById('equipment-cost-total').textContent = ` (Total: ${totalCostPerFighter} CO)`;

    // Enable the Reorder button only when there are at least 2 items to reorder
    const reorderBtn = document.getElementById('reorder-equipment-btn');
    if (reorderBtn) {
        const canReorder = selectedEquipment.length >= 2;
        reorderBtn.disabled = !canReorder;
        reorderBtn.classList.toggle('opacity-50', !canReorder);
        reorderBtn.classList.toggle('cursor-not-allowed', !canReorder);
        reorderBtn.title = canReorder ? 'Reordenar el equipo de este guerrero' : 'Añade al menos 2 objetos para reordenar';
    }

    // Update granted skill categories display
    updateGrantedSkillCategoriesDisplay(selectedEquipment);

    // CRITICAL: Update armor save after equipment changes
    renderArmorSave();
    updateStatModifiers();

    // Handle Book of the Dead special rule for Vampires
    applyBookOfTheDeadLogic(selectedEquipment);

    // Handle Liber Bubonicus special rule for Plague Priests
    applyLiberBubonicusLogic(selectedEquipment);

    // Handle Lookout-Gnoblar special rule for Maneaters
    applyManeatersLogic(selectedEquipment);

    // Notify listeners (e.g. the Gear quick-manage modal) that the equipment list changed
    document.dispatchEvent(new CustomEvent('fighter-equipment-changed'));
};

/** Moves an equipment item up or down in the selected equipment list */
export const moveEquipmentItem = (fromIndex, toIndex) => {
    const jsonInput = document.getElementById('f-equipment-json');
    if (!jsonInput) return;

    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        return;
    }

    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= selectedEquipment.length || toIndex >= selectedEquipment.length) {
        return;
    }

    const [item] = selectedEquipment.splice(fromIndex, 1);
    selectedEquipment.splice(toIndex, 0, item);

    // Keep first dagger free cost logic intact
    const isDagger = (it) => normalizeEquipment(it).name === 'Dagger';
    let daggerCount = 0;
    selectedEquipment = selectedEquipment.map(it => {
        if (isDagger(it)) {
            daggerCount++;
            return { ...it, cost: daggerCount === 1 ? 0 : (it.baseCost || 2) };
        }
        return it;
    });

    jsonInput.value = JSON.stringify(selectedEquipment);

    // If an existing fighter in currentWarband is being edited, keep its equipment array in sync
    const fighterId = document.getElementById('fighter-id')?.value;
    if (fighterId && currentWarband && Array.isArray(currentWarband.members)) {
        const fighter = currentWarband.members.find(f => String(f.id) === String(fighterId));
        if (fighter) {
            fighter.equipment = selectedEquipment.map(it => ({ ...it }));
        }
    }

    renderSelectedEquipment();
};

/** Applies Book of the Dead logic - adds/removes Necromancy for Vampires */
const applyBookOfTheDeadLogic = (selectedEquipment) => {
    const specialRulesInput = document.getElementById('f-special-rules');
    const raceInput = document.getElementById('f-race');
    const warriorChoiceInput = document.getElementById('f-warrior-choice');
    
    if (!specialRulesInput || !raceInput) return;
    
    const currentSpecialRules = specialRulesInput.value;
    const fighterRace = raceInput.value;
    const warriorChoice = warriorChoiceInput ? warriorChoiceInput.value : '';
    
    // Apply the Book of the Dead rule
    const result = handleBookOfTheDeadEquipmentChange(
        selectedEquipment,
        currentSpecialRules,
        fighterRace,
        warriorChoice
    );
    
    if (result.changed) {
        // Update the special rules input
        specialRulesInput.value = result.specialRules;

        // Update the displayed special rules text using the existing function
        updateWarriorRulesDisplay();

        // If Necromancy was removed, also remove any Necromancy spells from skills
        if (result.removed) {
            removeNecromancySpellsFromSkills();
        }

        // Re-render the magic selection to show/hide Necromancy spells
        renderMagicSelection();
    }
};

/** Removes Necromancy spells from the fighter's skills when Necromancy rule is removed */
const removeNecromancySpellsFromSkills = () => {
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    if (!skillsHiddenInput) return;

    let skills;
    try {
        skills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        skills = [];
    }

    // Import MAGIC to get Necromancy spells - we need to filter them out
    // The Necromancy spells are defined in data/magic.js
    const necromancySpells = [
        'Lifestealer', 'Re-Animation', 'Death Vision', 'Spell of Doom',
        'Call of Vanhel', 'Spell of Awakening'
    ];

    // Remove any Necromancy spells from skills
    const filteredSkills = skills.filter(skill => !necromancySpells.includes(skill));

    if (filteredSkills.length !== skills.length) {
        skillsHiddenInput.value = JSON.stringify(filteredSkills);

        // Update the skills display
        const skillsDisplay = document.getElementById('f-skills');
        if (skillsDisplay) {
            if (filteredSkills.length > 0) {
                const skillsHtml = filteredSkills.map(skill =>
                    `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${translateSkill(skill)}</span>`
                ).join(', ');
                skillsDisplay.innerHTML = skillsHtml;
            } else {
                skillsDisplay.textContent = 'Ninguna';
            }
        }
    }
};

/** Applies Liber Bubonicus logic - adds/removes Magic of the Horned Rat for Plague Priests */
const applyLiberBubonicusLogic = (selectedEquipment) => {
    const specialRulesInput = document.getElementById('f-special-rules');
    const warriorChoiceInput = document.getElementById('f-warrior-choice');

    if (!specialRulesInput || !warriorChoiceInput) return;

    const currentSpecialRules = specialRulesInput.value;
    const warriorChoice = warriorChoiceInput.value;

    // Apply the Liber Bubonicus rule
    const result = handleLiberBubonicusEquipmentChange(
        selectedEquipment,
        currentSpecialRules,
        warriorChoice
    );

    if (result.changed) {
        // Update the special rules input
        specialRulesInput.value = result.specialRules;

        // Update the displayed special rules text using the existing function
        updateWarriorRulesDisplay();

        // If Magic of the Horned Rat was removed, also remove any Horned Rat spells from skills
        if (result.removed) {
            removeHornedRatSpellsFromSkills();
        }

        // Re-render the magic selection to show/hide Horned Rat spells
        renderMagicSelection();
    }
};

/** Removes Magic of the Horned Rat spells from the fighter's skills when Magic of the Horned Rat rule is removed */
const removeHornedRatSpellsFromSkills = () => {
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    if (!skillsHiddenInput) return;

    let skills;
    try {
        skills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        skills = [];
    }

    // Horned Rat magic spells defined in data/magic.js
    const hornedRatSpells = [
        'Warpfire', 'Children of the Horned Rat', 'Gnawdoom', 'Black Fury',
        'Eye of the Warp', 'Sorcerer\'s Curse'
    ];

    // Remove any Horned Rat spells from skills
    const filteredSkills = skills.filter(skill => !hornedRatSpells.includes(skill));

    if (filteredSkills.length !== skills.length) {
        skillsHiddenInput.value = JSON.stringify(filteredSkills);

        // Update the skills display
        const skillsDisplay = document.getElementById('f-skills');
        if (skillsDisplay) {
            if (filteredSkills.length > 0) {
                const skillsHtml = filteredSkills.map(skill =>
                    `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${translateSkill(skill)}</span>`
                ).join(', ');
                skillsDisplay.innerHTML = skillsHtml;
            } else {
                skillsDisplay.textContent = 'Ninguna';
            }
        }
    }
};

/** Applies Lookout-Gnoblar logic - adds/removes Dodge skill for Maneaters */
const applyManeatersLogic = (selectedEquipment) => {
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    if (!skillsHiddenInput) return;

    let currentSkills;
    try {
        currentSkills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        currentSkills = [];
    }

    // Apply the Lookout-Gnoblar rule
    const result = handleLookoutGnoblarEquipmentChange(selectedEquipment, currentSkills);

    if (result.changed) {
        // Update the skills hidden input
        skillsHiddenInput.value = JSON.stringify(result.skills);

        // Update the skills display
        const skillsDisplay = document.getElementById('f-skills');
        if (skillsDisplay) {
            if (result.skills.length > 0) {
                const skillsHtml = result.skills.map(skill =>
                    `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${translateSkill(skill)}</span>`
                ).join(', ');
                skillsDisplay.innerHTML = skillsHtml;
            } else {
                skillsDisplay.textContent = 'Ninguna';
            }
        }
    }
};

/** Adds an equipment item to the fighter's selected equipment list */
export const addEquipment = async (itemId, customCost = null, customRules = null, customName = null) => {
    const item = MASTER_EQUIPMENT_LIST.find(i => i.id === itemId);
    if (!item) return;

    const jsonInput = document.getElementById('f-equipment-json');
    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedEquipment = [];
    }

    // Validate armour compatibility
    const validation = validateArmourCompatibility(item, selectedEquipment);
    if (!validation.valid) {
        showMessage(validation.message, 'error');
        return;
    }

    // Validate Sisters of Sigmar equipment rules
    const fighterName = document.getElementById('f-warrior-choice').value;
    const warbandType = currentWarband ? currentWarband.type : null;
    const sistersValidation = validateSistersOfSigmarEquipmentRules(selectedEquipment, fighterName, warbandType);
    if (!sistersValidation.valid) {
        showMessage(sistersValidation.message, 'error');
        return;
    }

    // Validate Lords Boon equipment rules
    const lordsBoonValidation = validateLordsBoonEquipmentRules(selectedEquipment, item);
    if (!lordsBoonValidation.valid) {
        showMessage(lordsBoonValidation.message, 'error');
        return;
    }

    // Get current fighter info for cost calculation and variable cost check
    const warbandName = currentWarband ? currentWarband.type : null;
    const fighterType = document.getElementById('f-type').value.toLowerCase() === 'hero' ? 'hero' : 'henchman';
    const race = document.getElementById('f-race').value;
    const specificName = document.getElementById('f-warrior-choice').value.trim() || document.getElementById('f-name').value.trim();
    const isDwarf = currentWarband && (currentWarband.type === 'Dwarf Treasure Hunters' || currentWarband.type === 'Dwarf Rangers' || currentWarband.type === 'Dwarf Slayer Cult');

    // Validate Beastmaster equipment rules
    const beastmasterValidation = validateBeastmasterEquipmentRules(selectedEquipment, item, specificName);
    if (!beastmasterValidation.valid) {
        showMessage(beastmasterValidation.message, 'error');
        return;
    }

    // Validate Cursed Mask equipment rules
    const cursedMaskValidation = validateCursedMaskEquipmentRules(item);
    if (!cursedMaskValidation.valid) {
        showMessage(cursedMaskValidation.message, 'error');
        return;
    }

    // Validate lucky items house rule
    const luckyItemsValidation = await validateLuckyItemsLimit(selectedEquipment, item, currentWarband);
    if (!luckyItemsValidation.valid) {
        showMessage(luckyItemsValidation.message, 'error');
        return;
    }

    // Check if the item has a variable cost (after applying modifiers)
    const parsedCost = parseCostString(item, warbandName, fighterType, race, specificName);
    if (parsedCost.isVariable) {
        // Show modal for user to enter the variable cost value
        setTempItemToAdd({ item: item, parsedCost: parsedCost });
        document.getElementById('dice-roll-item-name').textContent = item.name;
        const diceDescription = parsedCost.multiplier > 1 ?
            `${parsedCost.diceCount}D6 × ${parsedCost.multiplier}` :
            `${parsedCost.diceCount}D6`;
        document.getElementById('dice-roll-base-cost').textContent = `Base: ${parsedCost.base} CO + (resultado de ${diceDescription})`;
        document.getElementById('dice-roll-value').value = ''; // Clear previous value
        displayModal('dice-roll-modal'); // Updated call
        return;
    }

    // Calculate modified cost using the new system
    let finalCost = calculateModifiedCost(item, warbandName, fighterType, race, specificName);

    // Apply Armour & Shield 50% Discount BEFORE all other modifiers
    const armourShieldResult = applyArmourShieldHalfCostDiscount(finalCost, item);
    if (armourShieldResult.discountApplied) {
        finalCost = armourShieldResult.finalCost;
    }

    // Apply Dwarf Treasure Hunter discounts
    if (isDwarf) {
        const isPreGame = currentWarband && currentWarband.pre_game !== false;
        const hasGromril = document.getElementById('f-special-rules').value.split('; ').includes('Gromril');
        finalCost = getDwarfTreasureHunterDiscountedCost(item, isPreGame, hasGromril);
    }

    // Apply Hochland Bandits pricing
    const isHochlandBandit = currentWarband && currentWarband.type === 'Hochland Bandits';
    if (isHochlandBandit) {
        const isNewFighterModal = document.getElementById('fighter-id').value === '';
        const banditDiscountInfo = getHochlandBanditDiscountDisplayInfo(item, isNewFighterModal, finalCost);
        finalCost = banditDiscountInfo.displayedCost;
    }

    // Apply Lizardmen light armor cost
    if (item.name === 'Armour; Light' && currentWarband && currentWarband.type === 'Lizardmen') {
        finalCost = 50;
    }

    // Apply Druchii Crossbow Repeater discount
    if (item.name === "Crossbow; Repeater" && race === "Dark Elf" && document.getElementById('fighter-id').value === '') {
        finalCost = 20;
    }

    // Apply Order of the Mare mount discounts
    const isOrderOfTheMare = currentWarband && currentWarband.type === 'Order of the Mare';
    if (isOrderOfTheMare && (specificName === 'Paragon' || specificName === 'Gallant') && document.getElementById('fighter-id').value === '') {
        finalCost = getOrderOfTheMareDiscountedCost(item, true, specificName);
    }

    // Apply Imperial Outriders Warhorse discount
    const isImperialOutriders = currentWarband && currentWarband.type === 'Imperial Outriders';
    if (isImperialOutriders && document.getElementById('fighter-id').value === '') {
        finalCost = getImperialOutridersDiscountedCost(item, true);
    }

    // Apply Night Goblins Web spear discount
    if (currentWarband && currentWarband.type === 'Night Goblins Web') {
        const isPreGameForPurchase = currentWarband.pre_game !== false;
        finalCost = getNightGoblinsWebDiscountedCost(item, isPreGameForPurchase, specificName);
    }

    // Apply Cult of the Possessed mutation double-cost
    if (currentWarband && currentWarband.type === 'Cult of the Possessed' && item.category === 'Mutations') {
        const mutationCount = countSelectedMutations();
        if (mutationCount >= 1) {
            finalCost = finalCost * 2;
        }
    }

    // Apply Blackpowder Pre-Game Discount (AFTER all other modifiers)
    const blackpowderResult = applyBlackpowderPreGameDiscount(finalCost, item);
    if (blackpowderResult.discountApplied) {
        finalCost = blackpowderResult.finalCost;
    }

    // Apply Blackpowder 20% Discount (AFTER pre-game discount so they stack)
    const blackpowder20Result = applyBlackpowder20PercentDiscount(finalCost, item);
    if (blackpowder20Result.discountApplied) {
        finalCost = blackpowder20Result.finalCost;
    }

    // Use custom cost, rules, and name if provided
    const itemName = customName !== null ? customName : item.name;
    const itemRules = customRules !== null ? customRules : item.rules;
    const itemCost = customCost !== null ? customCost : finalCost;

    // Handle variable cost equipment properly
    const equipmentItem = { id: item.id, name: itemName, rules: itemRules };
    
    if (item.variableCost != null && customCost !== null) {
        // Variable cost equipment with custom cost - store base cost and variable cost
        equipmentItem.cost = item.baseCost;
        equipmentItem.variableCost = customCost;
        console.log('Variable cost equipment added:', equipmentItem);
    } else {
        // Fixed cost equipment or variable cost without custom cost
        equipmentItem.cost = itemCost;
        console.log('Fixed cost equipment added:', equipmentItem);
    }

    selectedEquipment.push(equipmentItem);
    jsonInput.value = JSON.stringify(selectedEquipment);

    // Track pending purchase for existing fighters (deferred to save time)
    const fighterId = document.getElementById('fighter-id').value;
    if (fighterId) {
        const fighterModal = document.getElementById('fighter-modal');
        let pendingPurchases = [];
        try { pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases || '[]'); } catch (e) {}
        const effectiveCost = parseFloat(typeof equipmentItem.variableCost === 'number' ? equipmentItem.variableCost : equipmentItem.cost) || 0;
        pendingPurchases.push({ name: itemName, cost: effectiveCost });
        fighterModal.dataset.pendingPurchases = JSON.stringify(pendingPurchases);
    }

    renderSelectedEquipment();

    // Handle magic access from equipment
    if (item.grantsMagic && Array.isArray(item.grantsMagic)) {
        addMagicAccessFromEquipment(item.grantsMagic);
    }

    // Handle skill categories from equipment - use comprehensive update function
    if (item.grantsSKillCat && Array.isArray(item.grantsSKillCat)) {
        // The skill categories will be properly updated when renderSelectedEquipment is called
        // which calls updateGrantedSkillCategoriesDisplay to process all equipment
    }

    // Handle skills granted by equipment
    if (item.grantSkill && Array.isArray(item.grantSkill)) {
        addSkillsFromEquipment(item.grantSkill);
    }

    // Handle skill selection from equipment (e.g., Loremaster → choose Academic skill)
    if (item.skillSelection && Array.isArray(item.skillSelection)) {
        showEquipmentSkillSelectionModal(item);
    }

    // Handle special rules granted by equipment
    if (item.grantSpecialRule && Array.isArray(item.grantSpecialRule)) {
        addSpecialRulesFromEquipment(item.grantSpecialRule);
    }

    // Re-render equipment options if the item grants additional starting equipment
    if (item.grantStartingEquipment && Array.isArray(item.grantStartingEquipment)) {
        renderEquipmentOptions();
    }

    // Auto-add additional equipment at no cost (e.g., White Lion Cloak with White Lion honor)
    if (item.addAdditionalEquipment && Array.isArray(item.addAdditionalEquipment)) {
        let currentEquipment;
        try {
            currentEquipment = JSON.parse(jsonInput.value || '[]');
        } catch (e) {
            currentEquipment = [];
        }

        item.addAdditionalEquipment.forEach(additionalId => {
            const additionalItem = MASTER_EQUIPMENT_LIST.find(i => i.id === additionalId);
            if (!additionalItem) return;

            // Don't add if already equipped
            const alreadyEquipped = currentEquipment.some(eq => eq.name === additionalItem.name);
            if (alreadyEquipped) return;

            const additionalEquipmentEntry = {
                id: additionalItem.id,
                name: additionalItem.name,
                rules: additionalItem.rules,
                cost: 0
            };
            currentEquipment.push(additionalEquipmentEntry);
            console.log(`Auto-added additional equipment: ${additionalItem.name} (free)`);
        });

        jsonInput.value = JSON.stringify(currentEquipment);
        renderSelectedEquipment();
    }

    // Check if a mount or war beast was added and refresh stats display if needed
    const hasMountOrBeast = selectedEquipment.some(eq => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        return masterItem && (masterItem.category === 'Mounts' || masterItem.category === 'War Beasts');
    });
    if (hasMountOrBeast) {
        const multiStats = applyMountStats(selectedEquipment, currentFighterBaseStats);
        setCurrentFighterMultiStats(multiStats);
        renderStatInputs(multiStats); // Remove the second parameter - function auto-detects multi-stat
    }
};

/**
 * Adds magic access to fighter's special rules when equipment grants magic
 * @param {Array} magicGroups - Array of magic group names to grant access to
 */
const addMagicAccessFromEquipment = (magicGroups) => {
    const specialRulesInput = document.getElementById('f-special-rules');
    const currentRules = specialRulesInput.value.trim();
    
    // Parse existing rules into an array
    const existingRules = currentRules ? currentRules.split(';').map(r => r.trim()) : [];
    
    // Add new magic rules, avoiding duplicates
    const newRules = magicGroups.filter(magicGroup => {
        return !existingRules.includes(magicGroup);
    });
    
    // Combine existing rules with new magic rules
    const updatedRules = [...existingRules, ...newRules];
    
    // Update the special rules input
    specialRulesInput.value = updatedRules.join('; ');
    
    // Update the display in the modal
    updateWarriorRulesDisplay();
    
    // Re-render magic selection to show the new magic groups
    renderMagicSelection();
    
    // Show success message
    if (newRules.length > 0) {
        showMessage(`Acceso a magia concedido: ${newRules.join(', ')}`, 'success');
    }
};

/** Removes an equipment item from the fighter's selected equipment list */
export const removeEquipment = (itemIndex, itemName, itemCost, itemRules) => {
    const jsonInput = document.getElementById('f-equipment-json');
    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedEquipment = [];
    }

    // Check if this is an existing fighter being edited
    const fighterId = document.getElementById('fighter-id').value;
    const originalEquipmentCost = parseFloat(document.getElementById('f-original-equipment-cost').value) || 0;
    const currentEquipmentCost = calculateEquipmentCost(selectedEquipment);

    // Check if the item is a pending purchase (unsaved)
    let isPendingPurchase = false;
    const fighterModal = document.getElementById('fighter-modal');
    if (fighterId && fighterModal.dataset.pendingPurchases) {
        try {
            const pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases);
            const parsedItemCost = parseFloat(itemCost) || 0;
            
            const pendingPurchaseIndex = pendingPurchases.findIndex(p => 
                p.name === itemName && Math.abs((parseFloat(p.cost) || 0) - parsedItemCost) < 0.1
            );
            
            if (pendingPurchaseIndex !== -1) {
                isPendingPurchase = true;
                pendingPurchases.splice(pendingPurchaseIndex, 1);
                fighterModal.dataset.pendingPurchases = JSON.stringify(pendingPurchases);
                console.log(`Cancelled pending purchase of ${itemName}`);
            }
        } catch (e) {
            console.error("Error parsing pending purchases:", e);
        }
    }

    // If editing an existing fighter and not removing an unsaved pending purchase, show the sell/store modal
    if (fighterId && !isPendingPurchase) {
        setTempItemToRemove({
            index: itemIndex,
            item: { name: itemName, cost: itemCost, rules: itemRules },
            originalCost: itemCost // Pass the actual cost of the item being removed
        });
        const fighter = currentWarband.members.find(f => f.id === fighterId);
        const groupSize = fighter && fighter.type === 'Henchman' ? (fighter.group_size || 1) : 1;
        document.getElementById('item-to-remove-name-label').textContent = groupSize > 1 ? `${groupSize}x ${itemName}` : itemName;
        document.getElementById('item-to-remove-cost-label').textContent = groupSize > 1 ? `${itemCost * groupSize} (${itemCost} each)` : itemCost;
        updateSellPrice(); // Set default sell price
        displayModal('sell-store-modal'); // Updated call
    } else {
        // Capture skill selection data before splice (for skillSelection removal)
        const removedEntry = selectedEquipment[itemIndex];

        // Directly remove the item if it's a new fighter or no cost implications
        selectedEquipment.splice(itemIndex, 1);
        jsonInput.value = JSON.stringify(selectedEquipment);
        renderSelectedEquipment();
        
        // Handle magic access removal from equipment
        const removedItem = MASTER_EQUIPMENT_LIST.find(i => i.name === itemName);
        if (removedItem && removedItem.grantsMagic && Array.isArray(removedItem.grantsMagic)) {
            removeMagicAccessFromEquipment(removedItem.grantsMagic);
        }

        // Handle skill categories removal from equipment
        if (removedItem && removedItem.grantsSKillCat && Array.isArray(removedItem.grantsSKillCat)) {
            removeSkillCategoriesFromEquipment(removedItem.grantsSKillCat);
        }

        // Handle skills removal from equipment
        if (removedItem && removedItem.grantSkill && Array.isArray(removedItem.grantSkill)) {
            removeSkillsFromEquipment(removedItem.grantSkill);
        }

        // Handle skill selection removal from equipment (e.g., Loremaster Academic skill)
        if (removedItem && removedItem.skillSelection && Array.isArray(removedItem.skillSelection)) {
            if (removedEntry && removedEntry.selectedSkill) {
                removeSkillsFromEquipment([removedEntry.selectedSkill]);
            }
        }

        // Handle special rules removal from equipment
        if (removedItem && removedItem.grantSpecialRule && Array.isArray(removedItem.grantSpecialRule)) {
            removeSpecialRulesFromEquipment(removedItem.grantSpecialRule);
        }

        // Remove additional equipment that was auto-added by this item
        if (removedItem && removedItem.addAdditionalEquipment && Array.isArray(removedItem.addAdditionalEquipment)) {
            removedItem.addAdditionalEquipment.forEach(additionalId => {
                const additionalItem = MASTER_EQUIPMENT_LIST.find(i => i.id === additionalId);
                if (!additionalItem) return;

                const additionalIndex = selectedEquipment.findIndex(eq => eq.name === additionalItem.name);
                if (additionalIndex !== -1) {
                    selectedEquipment.splice(additionalIndex, 1);
                    console.log(`Auto-removed additional equipment: ${additionalItem.name}`);
                }
            });
            jsonInput.value = JSON.stringify(selectedEquipment);
            renderSelectedEquipment();
        }

        // Check if a mount or war beast was removed and refresh stats display if needed
        const hasMountOrBeast = selectedEquipment.some(eq => {
            const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
            return masterItem && (masterItem.category === 'Mounts' || masterItem.category === 'War Beasts');
        });
        
        if (hasMountOrBeast) {
            // Still have mounts - update multi-stats
            const multiStats = applyMountStats(selectedEquipment, currentFighterBaseStats);
            setCurrentFighterMultiStats(multiStats);
            renderStatInputs(multiStats);
        } else {
            // No more mounts - revert to single stats
            setCurrentFighterMultiStats(null);
            renderStatInputs(currentFighterBaseStats);
        }

        // Re-apply all modifiers (equipment, skills, injuries) to the stat display
        updateStatModifiers();
    }
};

/**
 * Removes magic access from fighter's special rules when equipment that grants magic is removed
 * @param {Array} magicGroups - Array of magic group names that were granted by the removed equipment
 */
const removeMagicAccessFromEquipment = (magicGroups) => {
    const specialRulesInput = document.getElementById('f-special-rules');
    const currentRules = specialRulesInput.value.trim();
    
    if (!currentRules) return;
    
    // Parse existing rules into an array
    const existingRules = currentRules.split(';').map(r => r.trim());
    
    // Remove magic rules that are no longer granted by any equipment
    const remainingEquipment = getRemainingEquipment();
    const remainingMagicGroups = new Set();
    
    // Collect all magic groups still granted by remaining equipment
    remainingEquipment.forEach(eq => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        if (masterItem && masterItem.grantsMagic && Array.isArray(masterItem.grantsMagic)) {
            masterItem.grantsMagic.forEach(magicGroup => remainingMagicGroups.add(magicGroup));
        }
    });
    
    // Filter out magic groups that are no longer granted
    const updatedRules = existingRules.filter(rule => {
        // Keep non-magic rules and magic rules that are still granted
        return !magicGroups.includes(rule) || remainingMagicGroups.has(rule);
    });
    
    // Update the special rules input
    specialRulesInput.value = updatedRules.join('; ');
    
    // Update the display in the modal
    updateWarriorRulesDisplay();
    
    // Re-render magic selection to hide removed magic groups
    renderMagicSelection();
    
    // Show success message if any magic groups were removed
    const removedMagicGroups = magicGroups.filter(mg => !remainingMagicGroups.has(mg));
    if (removedMagicGroups.length > 0) {
        showMessage(`Acceso a magia eliminado: ${removedMagicGroups.join(', ')}`, 'info');
    }
};

/**
 * Gets the remaining equipment after removal (used for magic access validation)
 * @returns {Array} Array of remaining equipment items
 */
const getRemainingEquipment = () => {
    const jsonInput = document.getElementById('f-equipment-json');
    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedEquipment = [];
    }
    return selectedEquipment;
};

/**
 * Adds skills to the fighter's skills list when equipment grants them
 * @param {Array} skillNames - Array of skill names to grant
 */
const addSkillsFromEquipment = (skillNames) => {
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    const skillsDisplay = document.getElementById('f-skills');
    if (!skillsHiddenInput || !skillsDisplay) return;

    let currentSkills = [];
    try {
        currentSkills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        currentSkills = [];
    }

    let added = false;
    skillNames.forEach(skillName => {
        // Skip if the fighter already has this skill
        if (currentSkills.includes(skillName)) return;
        currentSkills.push(skillName);
        added = true;
    });

    if (added) {
        skillsHiddenInput.value = JSON.stringify(currentSkills);

        // Update display
        if (currentSkills.length > 0) {
            const skillsHtml = currentSkills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
            skillsDisplay.innerHTML = skillsHtml;
        }

        showMessage(`Habilidad concedida: ${skillNames.map(s => translateSkill(s) || s).join(', ')}`, 'info');
    }
};

/**
 * Removes skills from the fighter's skills list when equipment that grants them is removed.
 * Only removes skills that are no longer granted by any remaining equipment.
 * @param {Array} skillNames - Array of skill names that were granted by the removed equipment
 */
export const removeSkillsFromEquipment = (skillNames) => {
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    const skillsDisplay = document.getElementById('f-skills');
    if (!skillsHiddenInput || !skillsDisplay) return;

    let currentSkills = [];
    try {
        currentSkills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        currentSkills = [];
    }

    // Check which skills are still granted by remaining equipment
    const remainingEquipment = getRemainingEquipment();
    const stillGrantedSkills = new Set();
    remainingEquipment.forEach(eq => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        if (masterItem && masterItem.grantSkill && Array.isArray(masterItem.grantSkill)) {
            masterItem.grantSkill.forEach(skill => stillGrantedSkills.add(skill));
        }
    });

    // Remove skills no longer granted by any equipment
    const removedSkills = [];
    const updatedSkills = currentSkills.filter(skill => {
        if (skillNames.includes(skill) && !stillGrantedSkills.has(skill)) {
            removedSkills.push(skill);
            return false;
        }
        return true;
    });

    if (removedSkills.length > 0) {
        skillsHiddenInput.value = JSON.stringify(updatedSkills);

        // Update display
        if (updatedSkills.length > 0) {
            const skillsHtml = updatedSkills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
            skillsDisplay.innerHTML = skillsHtml;
        } else {
            skillsDisplay.textContent = 'Ninguna';
        }

        showMessage(`Habilidad eliminada: ${removedSkills.map(s => translateSkill(s) || s).join(', ')}`, 'info');
    }
};

// ─── Equipment Skill Selection Modal ────────────────────────────────────────
/**
 * Shows a modal for the user to select a skill from specified categories when
 * equipping items with the skillSelection property (e.g., Loremaster → Academic).
 * If the user cancels, the equipment item is rolled back (unequipped).
 * @param {Object} item - The equipment master item with skillSelection array
 */
const showEquipmentSkillSelectionModal = (item) => {
    const modal = document.getElementById('equipment-skill-selection-modal');
    const title = document.getElementById('equip-skill-modal-title');
    const info = document.getElementById('equip-skill-modal-info');
    const list = document.getElementById('equip-skill-modal-list');
    const cancelBtn = document.getElementById('equip-skill-modal-cancel-btn');
    if (!modal || !title || !info || !list || !cancelBtn) return;

    const categories = item.skillSelection;

    // Set title and info
    title.textContent = `Elegir una Habilidad (${translateEquipment(item.name)})`;
    info.innerHTML = `
        <p class="text-sm text-slate-300">
            <i class="fas fa-info-circle text-mordheim-gold mr-1"></i>
            <span class="font-semibold text-mordheim-gold">${translateEquipment(item.name)}</span> otorga una habilidad gratuita de la lista de 
            ${categories.map(c => `<span class="text-mordheim-gold font-semibold">${translateSkillCategory(c)}</span>`).join(' o ')}.
        </p>
    `;

    // Get fighter's current skills to exclude already-owned
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    let currentSkills = [];
    try {
        currentSkills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        currentSkills = [];
    }

    // Filter to matching General skills, excluding already-owned
    const availableSkills = SKILLS.filter(skill =>
        skill.type === 'General' &&
        (Array.isArray(skill.category)
            ? skill.category.some(c => categories.includes(c))
            : categories.includes(skill.category)) &&
        !currentSkills.includes(skill.name)
    );

    // Group by category
    const groupedSkills = availableSkills.reduce((acc, skill) => {
        const cat = Array.isArray(skill.category)
            ? skill.category.find(c => categories.includes(c)) || skill.category[0]
            : skill.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    // Build skill list
    list.innerHTML = '';

    if (availableSkills.length === 0) {
        const categoryNamesEs = categories.map(c => translateSkillCategory(c)).join(' o ');
        list.innerHTML = `<p class="text-slate-400 text-center py-4">No hay habilidades de ${categoryNamesEs} disponibles.</p>`;
    } else {
        for (const category in groupedSkills) {
            const categoryId = `equip-skill-${category.replace(/\s+/g, '-')}`;

            // Category header (only if multiple categories)
            if (Object.keys(groupedSkills).length > 1) {
                const catHeader = document.createElement('div');
                catHeader.className = 'flex items-center justify-between cursor-pointer text-lg font-semibold text-mordheim-gold mt-3 hover:text-yellow-400 transition p-2 bg-slate-800 rounded-lg';
                catHeader.innerHTML = `
                    <span>${translateSkillCategory(category)}</span>
                    <i class="fas fa-chevron-down transition-transform" id="equip-chevron-${categoryId}"></i>
                `;

                const skillsDiv = document.createElement('div');
                skillsDiv.id = `equip-skills-${categoryId}`;
                skillsDiv.className = 'mt-1 space-y-1';

                catHeader.addEventListener('click', () => {
                    skillsDiv.classList.toggle('hidden');
                    const chevron = catHeader.querySelector('i');
                    chevron.classList.toggle('fa-chevron-right');
                    chevron.classList.toggle('fa-chevron-down');
                });

                groupedSkills[category].forEach(skill => {
                    skillsDiv.appendChild(createEquipmentSkillElement(skill, item));
                });

                list.appendChild(catHeader);
                list.appendChild(skillsDiv);
            } else {
                // Single category — no header needed
                groupedSkills[category].forEach(skill => {
                    list.appendChild(createEquipmentSkillElement(skill, item));
                });
            }
        }
    }

    // Cancel handler — remove the equipped item (rollback)
    const newCancelBtn = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
    newCancelBtn.addEventListener('click', () => {
        rollbackEquipmentSkillSelection(item);
        hideModal('equipment-skill-selection-modal');
    });

    displayModal('equipment-skill-selection-modal');
};

/** Creates a clickable skill element for the equipment skill selection modal */
const createEquipmentSkillElement = (skill, equipmentItem) => {
    const skillEl = document.createElement('div');
    skillEl.className = 'p-3 rounded-lg cursor-pointer transition hover:bg-slate-700 bg-slate-800';
    skillEl.innerHTML = `
        <p class="font-semibold text-sm text-white">${translateSkill(skill.name)}</p>
        <p class="text-xs text-slate-400 mt-1">${skill.rules || ''}</p>
    `;

    skillEl.addEventListener('click', () => {
        // Add the selected skill to the fighter
        addSkillsFromEquipment([skill.name]);

        // Store the selected skill name on the equipment JSON entry for later removal
        const jsonInput = document.getElementById('f-equipment-json');
        let currentEquipment;
        try {
            currentEquipment = JSON.parse(jsonInput.value || '[]');
        } catch (e) {
            currentEquipment = [];
        }

        // Find the equipment entry and set selectedSkill
        const equipEntry = currentEquipment.find(eq => eq.id === equipmentItem.id && eq.name === equipmentItem.name);
        if (equipEntry) {
            equipEntry.selectedSkill = skill.name;
            jsonInput.value = JSON.stringify(currentEquipment);
        }

        hideModal('equipment-skill-selection-modal');
        showMessage(`¡${translateEquipment(equipmentItem.name)} equipado — habilidad ${translateSkill(skill.name) || skill.name} concedida!`, 'success');
    });

    return skillEl;
};

/** Rolls back the equipment addition when skill selection is cancelled */
const rollbackEquipmentSkillSelection = (item) => {
    const jsonInput = document.getElementById('f-equipment-json');
    let currentEquipment;
    try {
        currentEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        currentEquipment = [];
    }

    // Find and remove the equipment entry that was just added
    const itemIndex = currentEquipment.findIndex(eq => eq.id === item.id && eq.name === item.name);
    if (itemIndex !== -1) {
        currentEquipment.splice(itemIndex, 1);
        jsonInput.value = JSON.stringify(currentEquipment);
        renderSelectedEquipment();

        // Also remove pending purchase if applicable
        const fighterId = document.getElementById('fighter-id').value;
        if (fighterId) {
            const fighterModal = document.getElementById('fighter-modal');
            try {
                const pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases || '[]');
                const pendingIndex = pendingPurchases.findIndex(p => p.name === item.name);
                if (pendingIndex !== -1) {
                    pendingPurchases.splice(pendingIndex, 1);
                    fighterModal.dataset.pendingPurchases = JSON.stringify(pendingPurchases);
                }
            } catch (e) {}
        }

        showMessage(`${translateEquipment(item.name)} no fue equipado (selección de habilidad cancelada).`, 'info');
    }
};

/**
 * Adds special rules to the fighter's special rules when equipment grants them.
 * Operates on the semicolon-separated f-special-rules hidden input.
 * @param {Array} ruleNames - Array of special rule names to grant
 */
const addSpecialRulesFromEquipment = (ruleNames) => {
    const specialRulesInput = document.getElementById('f-special-rules');
    if (!specialRulesInput) return;

    const currentRules = specialRulesInput.value.trim();
    const existingRules = currentRules ? currentRules.split(';').map(r => r.trim()) : [];

    // Add new rules, skipping duplicates
    const newRules = ruleNames.filter(ruleName => !existingRules.includes(ruleName));

    if (newRules.length > 0) {
        const updatedRules = [...existingRules, ...newRules];
        specialRulesInput.value = updatedRules.join('; ');

        // Update the display in the modal
        updateWarriorRulesDisplay();

        showMessage(`Regla especial concedida: ${newRules.map(r => translateSpecialRule(r) || r).join(', ')}`, 'info');
    }
};

/**
 * Removes special rules from the fighter when equipment that grants them is removed.
 * Only removes rules that are no longer granted by any remaining equipment.
 * @param {Array} ruleNames - Array of special rule names that were granted by the removed equipment
 */
export const removeSpecialRulesFromEquipment = (ruleNames) => {
    const specialRulesInput = document.getElementById('f-special-rules');
    if (!specialRulesInput) return;

    const currentRules = specialRulesInput.value.trim();
    if (!currentRules) return;

    const existingRules = currentRules.split(';').map(r => r.trim());

    // Check which special rules are still granted by remaining equipment
    const remainingEquipment = getRemainingEquipment();
    const stillGrantedRules = new Set();
    remainingEquipment.forEach(eq => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        if (masterItem && masterItem.grantSpecialRule && Array.isArray(masterItem.grantSpecialRule)) {
            masterItem.grantSpecialRule.forEach(rule => stillGrantedRules.add(rule));
        }
    });

    // Remove rules no longer granted by any equipment
    const removedRules = [];
    const updatedRules = existingRules.filter(rule => {
        if (ruleNames.includes(rule) && !stillGrantedRules.has(rule)) {
            removedRules.push(rule);
            return false;
        }
        return true;
    });

    if (removedRules.length > 0) {
        specialRulesInput.value = updatedRules.join('; ');

        // Update the display in the modal
        updateWarriorRulesDisplay();

        showMessage(`Regla especial eliminada: ${removedRules.map(r => translateSpecialRule(r) || r).join(', ')}`, 'info');
    }
};

/**
 * Removes skill categories from fighter's available skill categories when equipment that grants them is removed
 * @param {Array} skillCategories - Array of skill category names that were granted by the removed equipment
 */
const removeSkillCategoriesFromEquipment = (skillCategories) => {
    const currentCategories = getAvailableSkillCategories();
    
    if (currentCategories.length === 0) return;
    
    // Remove skill categories that are no longer granted by any equipment
    const remainingEquipment = getRemainingEquipment();
    const remainingSkillCategories = new Set();
    
    // Collect all skill categories still granted by remaining equipment
    remainingEquipment.forEach(eq => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        if (masterItem && masterItem.grantsSKillCat && Array.isArray(masterItem.grantsSKillCat)) {
            masterItem.grantsSKillCat.forEach(category => remainingSkillCategories.add(category));
        }
    });
    
    // Filter out skill categories that are no longer granted
    const updatedCategories = currentCategories.filter(category => {
        return !skillCategories.includes(category) || remainingSkillCategories.has(category);
    });
    
    setAvailableSkillCategories(updatedCategories);
    
    // Show success message if any skill categories were removed
    const removedCategories = skillCategories.filter(cat => !remainingSkillCategories.has(cat));
    if (removedCategories.length > 0) {
        showMessage(`Categorías de habilidad eliminadas: ${removedCategories.join(', ')}`, 'info');
    }
};

/** Updates the display of stat modifiers based on equipment */
export const updateStatModifiers = () => {
    const jsonInput = document.getElementById('f-equipment-json');
    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedEquipment = [];
    }

    // Calculate characteristic modifiers from equipment
    const characteristicModifiers = {};
    selectedEquipment.forEach(item => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
        if (masterItem && masterItem.characteristicModifiers) {
            Object.keys(masterItem.characteristicModifiers).forEach(stat => {
                characteristicModifiers[stat] = (characteristicModifiers[stat] || 0) + masterItem.characteristicModifiers[stat];
            });
        }
    });

    // Calculate skill characteristic modifiers
    const skillsInput = document.getElementById('f-skills-hidden');
    let selectedSkills = [];
    try {
        selectedSkills = JSON.parse(skillsInput.value || '[]');
    } catch (e) {
        selectedSkills = [];
    }
    selectedSkills.forEach(skillName => {
        const skill = findSkillForWarband(skillName);
        if (skill && skill.characteristicModifiers) {
            Object.keys(skill.characteristicModifiers).forEach(stat => {
                characteristicModifiers[stat] = (characteristicModifiers[stat] || 0) + skill.characteristicModifiers[stat];
            });
        }
    });

    // Calculate injury modifiers
    const injuryModifiers = {};
    const jsonInjuriesInput = document.getElementById('f-injuries-json');
    let selectedInjuries;
    try {
        selectedInjuries = JSON.parse(jsonInjuriesInput.value || '[]');
    } catch (e) {
        selectedInjuries = [];
    }
    selectedInjuries.forEach(injuryName => {
        const injury = MASTER_INJURY_LIST.find(i => i.name === injuryName);
        if (injury && injury.characteristicModifiers) {
            Object.keys(injury.characteristicModifiers).forEach(stat => {
                injuryModifiers[stat] = (injuryModifiers[stat] || 0) + injury.characteristicModifiers[stat];
            });
        }
    });

    // Check if we have multi-stat (mount or war beast)
    const mountItem = selectedEquipment.find(item => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
        return masterItem && (masterItem.category === 'Mounts' || masterItem.category === 'War Beasts');
    });
    const isMultiStat = !!mountItem;

    // Handle special cases and display modifiers
    const specialRulesValue = document.getElementById('f-special-rules')?.value || '';
    const hasArmourRule = specialRulesValue.split('; ').includes('Armour');
    const hasUntiringSkill = selectedSkills.includes('Untiring');
    const hasHeavyArmour = selectedEquipment.some(item => item.name === 'Armour; Heavy' || item.name === 'Warpstone Armour' || item.name === 'Lords Boon Armour; Heavy');
    const hasShield = selectedEquipment.some(item => item.name === 'Shield');
    const hasLamellar = selectedEquipment.some(item => item.name === 'Armour; Lamellar');
    const hasHeavyMasterwork = selectedEquipment.some(item => item.name === 'Armour; Heavy Masterwork');
    const modifiersDisplay = document.getElementById('stat-modifiers-display');

    if (modifiersDisplay) {
        modifiersDisplay.classList.add('hidden');
        modifiersDisplay.innerHTML = '';
    }

    let modifierMessages = [];

    if (isMultiStat) {
        // Multi-stat fighter: handle each stat line separately
        const multiStats = currentFighterMultiStats || {};
        const statLineKeys = Object.keys(multiStats);

        statLineKeys.forEach(statLineKey => {
            const statLineStats = multiStats[statLineKey];
            
            STATS_FIELDS.forEach(stat => {
                const inputElement = document.getElementById(`stat-${statLineKey}-${stat}`);
                if (!inputElement) return;

                const baseValue = statLineStats[stat] || 0;
                let modifiedValue = baseValue;
                let equipmentModifier = 0;

                // Apply equipment modifiers (only to Fighter stat line)
                if (statLineKey === 'Fighter') {
                    equipmentModifier = characteristicModifiers[stat] || 0;
                    modifiedValue += equipmentModifier;
                }

                // Apply mount-specific modifiers (only to Mount stat line)
                if (statLineKey === 'Mount' && stat === 'M') {
                    const mountMovementModifier = getMountMovementModifier(selectedEquipment);
                    modifiedValue += mountMovementModifier;
                    if (mountMovementModifier !== 0) {
                        modifierMessages.push(`Mount Movement ${mountMovementModifier > 0 ? '+' : ''}${mountMovementModifier} from barding`);
                    }
                }

                // Apply injury modifiers (only to Fighter stat line)
                if (statLineKey === 'Fighter') {
                    modifiedValue += injuryModifiers[stat] || 0;
                }

                // Apply special penalties to Fighter only
                if (statLineKey === 'Fighter' && stat === 'M') {
                    if (!hasArmourRule && !hasUntiringSkill) {
                        if (hasHeavyArmour && hasShield) {
                            modifiedValue -= 1;
                            const equippedArmour = selectedEquipment.find(item => item.name === 'Warpstone Armour' || item.name === 'Lords Boon Armour; Heavy' || item.name === 'Armour; Heavy');
                            const armourName = equippedArmour ? equippedArmour.name : 'Heavy Armour';
                            modifierMessages.push(`Movement reduced by -1 for wearing ${armourName} with a Shield`);
                        }
                        if (hasLamellar) {
                            modifiedValue -= 1;
                            modifierMessages.push('Movement reduced by -1 for wearing Lamellar Armour');
                        }
                        if (hasHeavyMasterwork) {
                            modifiedValue -= 1;
                            modifierMessages.push('Movement reduced by -1 for wearing Heavy Masterwork Armour');
                        }
                    }
                    if (hasUntiringSkill && !hasArmourRule && (hasHeavyArmour && hasShield || hasLamellar || hasHeavyMasterwork)) {
                        modifierMessages.push('Movement penalty ignored (Untiring skill)');
                    }

                    // Apply Pavise penalty
                    const paviseResult = applyPaviseMovementPenalty(stat, modifiedValue, selectedEquipment);
                    if (paviseResult.color === 'text-red-400') {
                        modifiedValue = paviseResult.value;
                        modifierMessages.push('Movement halved (rounded up) for Pavise');
                    }
                }

                inputElement.value = modifiedValue;
                
                // Highlight based on comparison with base value
                inputElement.classList.remove('text-yellow-400', 'text-green-400', 'text-red-400');
                if (modifiedValue > baseValue) {
                    inputElement.classList.add('text-green-400');
                } else if (modifiedValue < baseValue) {
                    inputElement.classList.add('text-red-400');
                }
            });
        });

        // Show equipment modifier messages for Fighter
        STATS_FIELDS.forEach(stat => {
            const modifier = characteristicModifiers[stat] || 0;
            if (modifier !== 0) {
                const sign = modifier > 0 ? '+' : '';
                modifierMessages.push(`Fighter ${stat} ${sign}${modifier} from equipment`);
            }
        });

        // Show injury modifier messages for Fighter
        STATS_FIELDS.forEach(stat => {
            const modifier = injuryModifiers[stat] || 0;
            if (modifier !== 0) {
                const sign = modifier > 0 ? '+' : '';
                modifierMessages.push(`Fighter ${stat} ${sign}${modifier} from injury`);
            }
        });

    } else {
        // Single-stat fighter: original logic
        STATS_FIELDS.forEach(stat => {
            const inputElement = document.getElementById(`stat-${stat}`);
            if (!inputElement) return;

            const baseValue = currentFighterBaseStats[stat] || 0;
            const equipmentModifier = characteristicModifiers[stat] || 0;
            let modifiedValue = baseValue + equipmentModifier;

            // Apply injury modifiers
            modifiedValue += injuryModifiers[stat] || 0;

            // Apply special penalties
            if (stat === 'M') {
                if (!hasArmourRule && !hasUntiringSkill) {
                    if (hasHeavyArmour && hasShield) {
                        modifiedValue -= 1;
                        const equippedArmour = selectedEquipment.find(item => item.name === 'Warpstone Armour' || item.name === 'Lords Boon Armour; Heavy' || item.name === 'Armour; Heavy');
                        const armourName = equippedArmour ? equippedArmour.name : 'Heavy Armour';
                        modifierMessages.push(`Movement reduced by -1 for wearing ${armourName} with a Shield`);
                    }
                    if (hasLamellar) {
                        modifiedValue -= 1;
                        modifierMessages.push('Movement reduced by -1 for wearing Lamellar Armour');
                    }
                    if (hasHeavyMasterwork) {
                        modifiedValue -= 1;
                        modifierMessages.push('Movement reduced by -1 for wearing Heavy Masterwork Armour');
                    }
                }
                if (hasUntiringSkill && !hasArmourRule && (hasHeavyArmour && hasShield || hasLamellar || hasHeavyMasterwork)) {
                    modifierMessages.push('Movement penalty ignored (Untiring skill)');
                }

                // Apply Pavise penalty
                const paviseResult = applyPaviseMovementPenalty(stat, modifiedValue, selectedEquipment);
                if (paviseResult.color === 'text-red-400') {
                    modifiedValue = paviseResult.value;
                    modifierMessages.push('Movement halved (rounded up) for Pavise');
                }
            }

            inputElement.value = modifiedValue;
            
            // Highlight based on comparison with base value
            inputElement.classList.remove('text-yellow-400', 'text-green-400', 'text-red-400');
            if (modifiedValue > baseValue) {
                inputElement.classList.add('text-green-400');
            } else if (modifiedValue < baseValue) {
                inputElement.classList.add('text-red-400');
            }
        });

        // Characteristic modifiers from equipment
        STATS_FIELDS.forEach(stat => {
            const modifier = characteristicModifiers[stat] || 0;
            if (modifier !== 0) {
                const sign = modifier > 0 ? '+' : '';
                modifierMessages.push(`${stat} ${sign}${modifier} from equipment`);
            }
        });

        // Characteristic modifiers from injuries
        STATS_FIELDS.forEach(stat => {
            const modifier = injuryModifiers[stat] || 0;
            if (modifier !== 0) {
                const sign = modifier > 0 ? '+' : '';
                modifierMessages.push(`${stat} ${sign}${modifier} from injury`);
            }
        });
    }

    if (modifierMessages.length > 0) {
        if (modifiersDisplay) {
            modifiersDisplay.classList.remove('hidden');
            // Add caution icon to each message individually
            const messagesWithIcons = modifierMessages.map(message => 
                '<i class="fas fa-exclamation-triangle mr-2"></i>' + message
            );
            modifiersDisplay.innerHTML = '<p>' + messagesWithIcons.join('<br>') + '</p>';
        }
    }
};

/** Function to update the default sell price when the original cost changes (for dice roll items) */
export const updateSellPrice = () => {
     const originalCost = tempItemToRemove ? tempItemToRemove.originalCost : 0;
     const fighterId = document.getElementById('fighter-id')?.value;
     const fighter = fighterId && currentWarband ? currentWarband.members.find(f => f.id === fighterId) : null;
     const groupSize = fighter && fighter.type === 'Henchman' ? (fighter.group_size || 1) : 1;

     let defaultSellPrice = Math.floor(originalCost / 2) * groupSize;
     let sellPriceNote = "Enter the amount of Gold Crowns to receive from selling this item (default is 50% of original cost).";

     if (groupSize > 1) {
         sellPriceNote = `Introduce la cantidad de Coronas de Oro a recibir por vender este objeto (por defecto el 50% del coste original por miniatura × ${groupSize} miniaturas).`;
     }

     if (tempItemToRemove && tempItemToRemove.name === "Armour; Toughened Leathers") {
        defaultSellPrice = 0;
        sellPriceNote = "El Cuero Endurecido no se puede vender por ninguna CO (Regla de la Casa). Vender devuelve 0 CO.";
     }

     document.getElementById('sell-price-input').value = defaultSellPrice;
     document.getElementById('sell-price-note').textContent = sellPriceNote;
};

/** Renders the input fields for a fighter's stats */
export const renderArmorSave = () => {
    const jsonInput = document.getElementById('f-equipment-json');
    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedEquipment = [];
    }

    const skillsInput = document.getElementById('f-skills-hidden');
    let selectedSkills = [];
    try {
        selectedSkills = JSON.parse(skillsInput ? skillsInput.value : '[]');
    } catch (e) {}

    const isHouseRuleActive = document.getElementById('house-rule-toggle')?.checked || false;
    const armorSaveResult = calculateArmorSave(selectedEquipment, isHouseRuleActive, selectedSkills);

    const displayWrapper = document.getElementById('final-armor-save-display-wrapper');
    const detailsDisplay = document.getElementById('armor-save-details');

    if (armorSaveResult.isSplit) {
        const { melee, ranged } = armorSaveResult;
        displayWrapper.innerHTML = `
            <div class="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p class="text-xs uppercase text-slate-400">vs. Melee <i class="fas fa-swords"></i></p>
                    <p class="text-3xl font-bold ${melee.finalSaveValue >= 7 ? 'text-red-400' : 'text-green-400'}">
                        ${melee.finalSaveValue >= 7 ? 'None' : `${melee.finalSaveValue}+`}
                    </p>
                </div>
                <div>
                    <p class="text-xs uppercase text-slate-400">vs. Ranged <i class="fas fa-crosshairs"></i></p>
                    <p class="text-3xl font-bold ${ranged.finalSaveValue >= 7 ? 'text-red-400' : 'text-green-400'}">
                        ${ranged.finalSaveValue >= 7 ? 'None' : `${ranged.finalSaveValue}+`}
                    </p>
                </div>
            </div>
        `;
        detailsDisplay.textContent = melee.detailMessage.replace('Base Save:', 'Melee Base Save:').replace('Final Save:', 'Final Melee Save:');
    } else {
        const { basic } = armorSaveResult;
        displayWrapper.innerHTML = `
            <p id="final-armor-save" class="text-3xl font-bold text-center ${basic.finalSaveValue >= 7 ? 'text-red-400' : 'text-green-400'}">
                ${basic.finalSaveValue >= 7 ? 'None' : `${basic.finalSaveValue}+`}
            </p>
        `;
        detailsDisplay.textContent = basic.detailMessage.replace('Base Save:', 'Basic Base Save:').replace('Final Save:', 'Final Save:');
    }
};

/** Shows the modal to add equipment directly to warband storage */
export const showAddToStorageModal = () => {
    window.selectedItemId = null; // Clear any previous selection
    renderStorageEquipmentSelector();
    displayModal('add-to-storage-modal'); // Updated call
};

/** Renders the equipment selector for the storage modal */
export const renderStorageEquipmentSelector = () => {
    const categorySelect = document.getElementById('storage-equipment-category-select');
    const searchInput = document.getElementById('storage-equipment-search');
    const categories = [...new Set(MASTER_EQUIPMENT_LIST.map(item => item.category))];

    categorySelect.innerHTML = categories.map(cat => `<option value="${cat}">${translateEquipmentCategory(cat)}</option>`).join('');

    // Clear search input when modal opens
    if (searchInput) {
        searchInput.value = '';
    }

    // Add event listener for search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderStorageEquipmentOptions(e.target.value);
        });
    }

    renderStorageEquipmentOptions();
};

/** Renders the list of selectable items for the storage modal */
export const renderStorageEquipmentOptions = (searchTerm = '') => {
    const categorySelect = document.getElementById('storage-equipment-category-select');
    const optionsContainer = document.getElementById('storage-equipment-options-list');
    const selectedCategory = categorySelect.value;
    optionsContainer.innerHTML = '';

    // Ensure searchTerm is a string
    searchTerm = searchTerm || '';
    
    let items = MASTER_EQUIPMENT_LIST.filter(item => item.category === selectedCategory);

    // Apply search filter if provided
    if (searchTerm.trim()) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        items = items.filter(item => item.name.toLowerCase().includes(lowerSearchTerm));
    }

    items.forEach(item => {
        const parsedCost = parseCostString(item);
        const isVariable = parsedCost.isVariable;
        const displayCost = isVariable ? `${parsedCost.base}+` : item.cost;

        const isSelected = item.id === window.selectedItemId;
        const itemElement = document.createElement('div');
        itemElement.className = `flex justify-between items-center p-2 rounded-lg hover:bg-slate-700 cursor-pointer text-sm transition ${isSelected ? 'bg-blue-600' : ''}`;
        const displayName = translateEquipment(item.name) !== item.name
            ? `${translateEquipment(item.name)} <span class="text-slate-400 font-normal text-xs">(${item.name})</span>`
            : item.name;
        itemElement.innerHTML = `
            <div>
                <p class="font-semibold">${displayName} <span class="text-slate-400 text-xs">(${displayCost} CO)</span></p>
                <p class="text-xs text-slate-500 italic">${formatEquipmentRules(item.rules, item.name)}</p>
                <button class="${isSelected ? 'text-green-400 hover:text-green-300' : 'text-blue-400 hover:text-blue-300'} ml-2" onclick="selectItemForStorage(${item.id}, ${parsedCost.base}); return false;">
                    <i class="fas fa-${isSelected ? 'check-circle' : 'check-circle'}"></i> ${isSelected ? 'Seleccionado' : 'Seleccionar'}
                </button>
            </div>
        `;
        optionsContainer.appendChild(itemElement);
    });
};

/** Shows the modal to sell an item directly from storage */
export const showSellFromStorageModal = (name, cost, maxQuantity) => {
    document.getElementById('sell-storage-item-name').textContent = name;
    document.getElementById('sell-storage-item-cost').textContent = cost;

    const quantityInput = document.getElementById('sell-storage-quantity');
    quantityInput.value = 1;
    quantityInput.max = maxQuantity;

    const priceInput = document.getElementById('sell-storage-price');
    priceInput.value = Math.floor(cost / 2); // Default to half price

    displayModal('sell-from-storage-modal'); // Updated call
};

/** Shows the modal to select a fighter for retrieval */
export const showRetrieveModal = (index) => {
    if (!currentWarband || !currentWarband.members || currentWarband.members.length === 0) {
         showMessage('Debes tener guerreros en tu banda para recuperar objetos almacenados.', 'error');
         return;
    }

    // Check if the equipment exists at the given index
    if (!currentWarband.stored_equipment || !currentWarband.stored_equipment[index]) {
        console.error('Equipment not found at index:', index, 'stored_equipment:', currentWarband.stored_equipment);
        showMessage('Equipo no encontrado en el almacén.', 'error');
        return;
    }

    // Normalize the item to ensure it has all required fields
    const normalizedItem = normalizeEquipment(currentWarband.stored_equipment[index]);
    
    if (!normalizedItem || !normalizedItem.name) {
        console.error('Failed to normalize equipment or missing name:', currentWarband.stored_equipment[index], 'normalized:', normalizedItem);
        showMessage('Datos de equipo no válidos.', 'error');
        return;
    }
    
    setTempItemToRetrieve({
        index: index,
        item: normalizedItem
    });

    document.getElementById('retrieve-item-name').textContent = normalizedItem.name;

    const selectElement = document.getElementById('retrieve-fighter-select');

    // Populate fighter options
    selectElement.innerHTML = [...currentWarband.members]
        .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically (on a copy to avoid mutating the original array)
        .map(f => `<option value="${f.id}">${f.name} (${f.type}${f.group_size > 1 ? ` x${f.group_size}` : ''})</option>`)
        .join('');

    // Hide warnings initially
    document.getElementById('retrieve-warning').classList.add('hidden');
    // Attach the exposed global constraint checker
    selectElement.onchange = checkGroupRetrievalConstraint;

    displayModal('retrieve-modal'); // Updated call
    // Initial check in case the first option is a group
    checkGroupRetrievalConstraint();
};

/** Shows the equipment selection modal */
export const showEquipmentSelectionModal = () => {
    // Reset override checkbox to unchecked when modal opens
    const overrideToggle = document.getElementById('equipment-override-toggle');
    if (overrideToggle) {
        overrideToggle.checked = false;
    }

    // Clear custom cost input when modal opens
    const customCostInput = document.getElementById('fighter-custom-cost-input');
    if (customCostInput) {
        customCostInput.value = '';
    }

    // Initialize the collapsible Options section - start collapsed
    const optionsContent = document.getElementById('equipment-options-content');
    const optionsToggleBtn = document.getElementById('equipment-options-toggle-btn');
    const optionsChevron = document.getElementById('equipment-options-chevron');

    if (optionsContent && optionsToggleBtn) {
        // Ensure content starts collapsed
        optionsContent.classList.add('hidden');
        if (optionsChevron) {
            optionsChevron.style.transform = '';
        }

        // Clone button to remove previous listeners
        const newToggleBtn = optionsToggleBtn.cloneNode(true);
        optionsToggleBtn.parentNode.replaceChild(newToggleBtn, optionsToggleBtn);

        newToggleBtn.addEventListener('click', () => {
            const content = document.getElementById('equipment-options-content');
            const chevron = document.getElementById('equipment-options-chevron');
            const isCollapsed = content.classList.contains('hidden');

            if (isCollapsed) {
                content.classList.remove('hidden');
                if (chevron) chevron.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                if (chevron) chevron.style.transform = '';
            }
        });
    }

    // Initialize the Equipment Filter Toggle (All / Starting)
    const filterToggleContainer = document.getElementById('equipment-filter-toggle-container');
    const filterModeInput = document.getElementById('equipment-filter-mode');
    const allBtn = document.getElementById('equipment-filter-all-btn');
    const startingBtn = document.getElementById('equipment-filter-starting-btn');
    const isNewFighterModal = document.getElementById('fighter-id').value === '';

    if (filterToggleContainer && filterModeInput && allBtn && startingBtn) {
        if (isNewFighterModal) {
            // Hide toggle in Add New Fighter modal - starting equipment is always enforced
            filterToggleContainer.classList.add('hidden');
            filterModeInput.value = 'starting';
        } else {
            // Show toggle in Edit Fighter modal
            filterToggleContainer.classList.remove('hidden');

            // Default based on pre-game state
            const isPreGame = currentWarband && currentWarband.pre_game !== false;
            const defaultMode = isPreGame ? 'starting' : 'all';
            filterModeInput.value = defaultMode;

            // Update button styling to reflect the default
            updateFilterToggleButtons(defaultMode, allBtn, startingBtn);
        }

        // Remove old listeners by cloning buttons
        const newAllBtn = allBtn.cloneNode(true);
        const newStartingBtn = startingBtn.cloneNode(true);
        allBtn.parentNode.replaceChild(newAllBtn, allBtn);
        startingBtn.parentNode.replaceChild(newStartingBtn, startingBtn);

        // Add click handlers for toggle buttons
        newAllBtn.addEventListener('click', () => {
            filterModeInput.value = 'all';
            updateFilterToggleButtons('all', newAllBtn, newStartingBtn);
            renderModalEquipmentSelector();
        });
        newStartingBtn.addEventListener('click', () => {
            filterModeInput.value = 'starting';
            updateFilterToggleButtons('starting', newAllBtn, newStartingBtn);
            renderModalEquipmentSelector();
        });
    }

    renderModalEquipmentSelector();
    displayModal('equipment-selection-modal');

    // Add event listener for the override toggle
    if (overrideToggle) {
        overrideToggle.addEventListener('change', () => {
            renderModalEquipmentSelector();
        });
    }
};

/** Updates the visual state of the filter toggle buttons */
const updateFilterToggleButtons = (mode, allBtn, startingBtn) => {
    const activeClasses = ['bg-slate-600', 'text-slate-300'];
    const inactiveClasses = ['bg-mordheim-gold', 'text-slate-900'];

    if (mode === 'all') {
        allBtn.classList.remove(...inactiveClasses);
        allBtn.classList.add(...activeClasses);
        startingBtn.classList.remove(...activeClasses);
        startingBtn.classList.add(...inactiveClasses);
    } else {
        startingBtn.classList.remove(...inactiveClasses);
        startingBtn.classList.add(...activeClasses);
        allBtn.classList.remove(...activeClasses);
        allBtn.classList.add(...inactiveClasses);
    }
};

/** Renders the equipment selector for the modal */
export const renderModalEquipmentSelector = () => {
    const categorySelect = document.getElementById('modal-equipment-category-select');
    let categories = [...new Set(MASTER_EQUIPMENT_LIST.map(item => item.category))];

    // Check if override toggle is enabled
    const overrideToggle = document.getElementById('equipment-override-toggle');
    const isOverrideEnabled = overrideToggle && overrideToggle.checked;

    // Restrict "Blessings of Nurgle", "Sacred Markings", and "Lords Boon" to:
    // - Add fighter modal, OR
    // - Pre-game build mode / Starting equipment toggle
    // (unless override is enabled)
    const isEditing = document.getElementById('fighter-id').value !== '';
    if (isEditing && !isOverrideEnabled && !isEffectivePreGame()) {
        categories = categories.filter(cat => cat !== "Blessings of Nurgle" && cat !== "Sacred Markings" && cat !== "Lords Boon");
    }

    // Filter out categories restricted by equipped items (e.g. Swordmaster blocks Missile Weapon / Blackpowder)
    // Override toggle bypasses this restriction
    if (!isOverrideEnabled) {
        const restrictedCats = getRestrictedCategoriesFromEquipment();
        if (restrictedCats.length > 0) {
            categories = categories.filter(cat => !restrictedCats.includes(cat));
        }
    }

    // Get current fighter info for filtering categories
    const warbandName = currentWarband ? currentWarband.type : null;
    const fighterType = document.getElementById('f-type').value.toLowerCase() === 'hero' ? 'hero' : 'henchman';
    const race = document.getElementById('f-race').value;
    const specificName = document.getElementById('f-warrior-choice').value.trim() || document.getElementById('f-name').value.trim();
    const isNewFighterModal = document.getElementById('fighter-id').value === '';

    // Get fighter skills for restriction checks (only for existing fighters)
    let fighterSkills = null;
    const fighterId = document.getElementById('fighter-id').value;
    if (fighterId && currentWarband && currentWarband.members) {
        const fighter = currentWarband.members.find(m => m.id === fighterId);
        if (fighter) {
            fighterSkills = fighter.skills || [];
        }
    }

    // Get fighter special rules
    const specialRulesInput = document.getElementById('f-special-rules');
    const fighterSpecialRules = specialRulesInput ? specialRulesInput.value.split('; ').filter(r => r.trim()) : [];

    let availableEquipmentFilterIds = null;

    // For new fighters, limit equipment options to starting equipment
    if (isNewFighterModal && warbandName) {
        const warbandData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === warbandName);
        const warriorChoice = document.getElementById('f-warrior-choice').value;
        const warrior = warbandData?.data?.warriors.find(w => w.name === warriorChoice);
        let startingEquipment = warrior?.starting_equipment || [];
        // Add equipment IDs granted by currently equipped items (e.g. Sea Guard grants Elf Bow)
        const grantedIds = getGrantedStartingEquipmentFromEquipment();
        if (grantedIds.length > 0) {
            startingEquipment = [...startingEquipment, ...grantedIds.filter(id => !startingEquipment.includes(id))];
        }
        availableEquipmentFilterIds = startingEquipment;
    }

    // For edit modal, apply starting equipment filter when toggle is set to 'starting'
    if (!isNewFighterModal && warbandName) {
        const filterModeInput = document.getElementById('equipment-filter-mode');
        const filterMode = filterModeInput ? filterModeInput.value : 'all';
        if (filterMode === 'starting') {
            const warbandData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === warbandName);
            const warriorChoice = document.getElementById('f-warrior-choice').value;
            const warrior = warbandData?.data?.warriors.find(w => w.name === warriorChoice);
            let startingEquipment = warrior?.starting_equipment || [];
            // Add equipment IDs granted by currently equipped items (e.g. Sea Guard grants Elf Bow)
            const grantedIds2 = getGrantedStartingEquipmentFromEquipment();
            if (grantedIds2.length > 0) {
                startingEquipment = [...startingEquipment, ...grantedIds2.filter(id => !startingEquipment.includes(id))];
            }
            availableEquipmentFilterIds = startingEquipment;
        }
    }

    // Filter categories to only include those with available items (unless override is enabled)
    if (!isOverrideEnabled) {
        categories = categories.filter(cat => {
            let items = MASTER_EQUIPMENT_LIST.filter(item => item.category === cat);

            // Special handling for different categories
            if (cat === "Mutations") {
                // Check if the current warband is listed in any mutation's restrictedWarbands
                const isMutationWarband = currentWarband && MASTER_EQUIPMENT_LIST
                    .some(item => item.category === "Mutations" && 
                          item.restrictedWarbands?.includes(currentWarband.type));
                const isAddNewFighter = document.getElementById('fighter-id').value === '';

                // Check if the edit modal's filter toggle is set to 'starting'
                const catFilterModeInput = document.getElementById('equipment-filter-mode');
                const catFilterMode = catFilterModeInput ? catFilterModeInput.value : 'all';
                const isStartingMode = isAddNewFighter || catFilterMode === 'starting';

                if ((isMutationWarband && isStartingMode) || (fighterSkills && fighterSkills.includes('Mutant'))) {
                    // Show mutations without applying the general filter
                    items = MASTER_EQUIPMENT_LIST.filter(item => item.category === "Mutations");
                } else {
                    // Hide mutations if conditions not met
                    items = [];
                }
            } else {
                // Apply filter if availableEquipmentFilterIds is set (for other categories)
                if (availableEquipmentFilterIds && availableEquipmentFilterIds.length > 0) {
                    items = items.filter(item => availableEquipmentFilterIds.includes(item.id));
                }
            }

        // Filter out restricted items
        items = items.filter(item => isEquipmentAvailable(item, warbandName, fighterType, race, specificName, fighterSkills, fighterSpecialRules));

            // Return true if category has any items left
            return items.length > 0;
        });
    }

    categorySelect.innerHTML = categories.map(cat => `<option value="${cat}">${translateEquipmentCategory(cat)}</option>`).join('');
    // Set "Close Combat" as the default category if it exists
    if (categories.includes('Close Combat')) {
        categorySelect.value = 'Close Combat';
    }

    // Add search input
    let searchInput = document.getElementById('modal-equipment-search');
    if (!searchInput) {
        searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'modal-equipment-search';
        searchInput.placeholder = 'Buscar equipo...';
        searchInput.className = 'w-full p-2 mb-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:ring-mordheim-gold focus:border-mordheim-gold';
        categorySelect.parentNode.insertBefore(searchInput, categorySelect.nextSibling);
    }
    searchInput.value = ''; // Clear search when modal opens
    searchInput.oninput = () => {
        renderModalEquipmentOptions();
    };

    // Set event handler for category changes to update grade checkboxes (use onchange to prevent stacking)
    categorySelect.onchange = () => {
        renderGradeFilterCheckboxes(categorySelect.value);
        renderModalEquipmentOptions();
    };

    // Render grade filter checkboxes
    renderGradeFilterCheckboxes(categorySelect.value);

    setAvailableEquipmentFilterIds(availableEquipmentFilterIds); // Set the filter for the options rendering
    renderModalEquipmentOptions();
};

/** Renders the list of selectable items for the modal */
export const renderModalEquipmentOptions = () => {
    const categorySelect = document.getElementById('modal-equipment-category-select');
    const optionsContainer = document.getElementById('modal-equipment-options-list');
    const selectedCategory = categorySelect.value;
    optionsContainer.innerHTML = '';

    // Check if override toggle is enabled
    const overrideToggle = document.getElementById('equipment-override-toggle');
    const isOverrideEnabled = overrideToggle && overrideToggle.checked;

    // Get current fighter info for restrictions and cost calculations (needed regardless of override)
    const warbandName = currentWarband ? currentWarband.type : null;
    const fighterType = document.getElementById('f-type').value.toLowerCase() === 'hero' ? 'hero' : 'henchman';
    const race = document.getElementById('f-race').value;
    const specificName = document.getElementById('f-warrior-choice').value.trim() || document.getElementById('f-name').value.trim();

    // Always filter by category first, regardless of override setting
    // Override only affects restrictions, not category selection
    let items = MASTER_EQUIPMENT_LIST.filter(item => item.category === selectedCategory);

    // Skip restrictions if override is enabled, but keep category filter
    if (!isOverrideEnabled) {
        // Apply grade filter if any grades are selected
        const selectedGrades = [];
        const grades = getUniqueGradesForCategory(selectedCategory);
        grades.forEach(grade => {
            const checkbox = document.getElementById(`grade-${grade}`);
            if (checkbox && checkbox.checked) {
                selectedGrades.push(grade);
            }
        });

        // If any grades are selected, filter items to only show those grades (case insensitive)
        if (selectedGrades.length > 0) {
            items = items.filter(item => item.grade && selectedGrades.includes(item.grade.toLowerCase()));
        }
        // Apply Battle Monks of Cathay equipment restrictions
        if (warbandName === 'Battle Monks of Cathay') {
            items = applyBattleMonksEquipmentRules(items, specificName);
        }

        // Apply Court of the Profane Pleasures equipment restrictions
        if (warbandName === 'Court of the Profane Pleasures') {
            items = applyProfanePleasuresEquipmentRules(items, specificName);
        }

        // Apply Norse Explorers Berserker equipment restrictions
        if (warbandName === 'Norse Explorers') {
            items = applyNorseExplorersEquipmentRules(items, specificName);
        }

        // Apply Bretonnian Chapel Guard equipment restrictions
        const isEditing = document.getElementById('fighter-id').value !== '';
        if (warbandName === 'Bretonnian Chapel Guard') {
            items = applyBretonnianChapelGuardEquipmentRules(items, specificName, isEditing);
        }

        // Get fighter skills for restriction checks (only for existing fighters)
        let fighterSkills = null;
        const fighterId = document.getElementById('fighter-id').value;
        if (fighterId && currentWarband && currentWarband.members) {
            const fighter = currentWarband.members.find(m => m.id === fighterId);
            if (fighter) {
                fighterSkills = fighter.skills || [];
            }
        }

        // Get fighter special rules
        const specialRulesInput = document.getElementById('f-special-rules');
        const fighterSpecialRules = specialRulesInput ? specialRulesInput.value.split('; ').filter(r => r.trim()) : [];

        // For new fighters, limit equipment options to starting equipment
        const isNewFighterModal = document.getElementById('fighter-id').value === '';
        if (isNewFighterModal && warbandName) {
            const warbandData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === warbandName);
            const warriorChoice = document.getElementById('f-warrior-choice').value;
            const warrior = warbandData?.data?.warriors.find(w => w.name === warriorChoice);
            let startingEquipment = warrior?.starting_equipment || [];
            // Lahmian Beloved: use alt equipment based on location
            if (warbandName === 'Lahmian' && warriorChoice === 'Beloved' && warrior?.starting_equipment_alt) {
                const location = currentWarband.location || 'Foreign';
                if (location === 'Khemrian') {
                    startingEquipment = warrior.starting_equipment_alt;
                }
            }
            // Add equipment IDs granted by currently equipped items (e.g. Sea Guard grants Elf Bow)
            const grantedIdsNew = getGrantedStartingEquipmentFromEquipment();
            if (grantedIdsNew.length > 0) {
                startingEquipment = [...startingEquipment, ...grantedIdsNew.filter(id => !startingEquipment.includes(id))];
            }
            setAvailableEquipmentFilterIds(startingEquipment);
        }

        // For edit modal, apply starting equipment filter when toggle is set to 'starting'
        if (!isNewFighterModal && warbandName) {
            const filterModeInput = document.getElementById('equipment-filter-mode');
            const filterMode = filterModeInput ? filterModeInput.value : 'all';
            if (filterMode === 'starting') {
                const warbandData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === warbandName);
                const warriorChoice = document.getElementById('f-warrior-choice').value;
                const warrior = warbandData?.data?.warriors.find(w => w.name === warriorChoice);
                let startingEquipment = warrior?.starting_equipment || [];
                // Lahmian Beloved: use alt equipment based on location
                if (warbandName === 'Lahmian' && warriorChoice === 'Beloved' && warrior?.starting_equipment_alt) {
                    const location = currentWarband.location || 'Foreign';
                    if (location === 'Khemrian') {
                        startingEquipment = warrior.starting_equipment_alt;
                    }
                }
                // Add equipment IDs granted by currently equipped items (e.g. Sea Guard grants Elf Bow)
                const grantedIdsEdit = getGrantedStartingEquipmentFromEquipment();
                if (grantedIdsEdit.length > 0) {
                    startingEquipment = [...startingEquipment, ...grantedIdsEdit.filter(id => !startingEquipment.includes(id))];
                }
                setAvailableEquipmentFilterIds(startingEquipment);
            } else {
                // 'all' mode - no starting equipment filter for edit modal
                setAvailableEquipmentFilterIds(null);
            }
        }

        // For vehicles, limit equipment options to starting equipment (always, not just for new vehicles)
        const isVehicle = document.getElementById('f-type').value === 'Vehicle';
        if (isVehicle) {
            const vehicleChoice = document.getElementById('f-vehicle-choice').value;
            const vehicle = VEHICLES.flatMap(g => g.vehicles).find(v => v.name === vehicleChoice);
            const startingEquipment = vehicle?.data?.starting_equipment || [];
            setAvailableEquipmentFilterIds(startingEquipment);
        }

        // Special handling for different categories
        if (selectedCategory === "Mutations") {
            // Check if the current warband is listed in any mutation's restrictedWarbands
            const isMutationWarband = currentWarband && MASTER_EQUIPMENT_LIST
                .some(item => item.category === "Mutations" && 
                      item.restrictedWarbands?.includes(currentWarband.type));
            const isAddNewFighter = document.getElementById('fighter-id').value === '';

            // Check if the edit modal's filter toggle is set to 'starting'
            const optFilterModeInput = document.getElementById('equipment-filter-mode');
            const optFilterMode = optFilterModeInput ? optFilterModeInput.value : 'all';
            const isStartingMode = isAddNewFighter || optFilterMode === 'starting';

            if ((isMutationWarband && isStartingMode) || (fighterSkills && fighterSkills.includes('Mutant'))) {
                // Show mutations without applying the general filter
                items = MASTER_EQUIPMENT_LIST.filter(item => item.category === "Mutations");
            } else {
                // Hide mutations if conditions not met
                items = [];
            }
        } else {
            // Apply filter if availableEquipmentFilterIds is set (for other categories)
            if (availableEquipmentFilterIds && availableEquipmentFilterIds.length > 0) {
                items = items.filter(item => availableEquipmentFilterIds.includes(item.id));
            }
        }

        // Filter out restricted items
        items = items.filter(item => isEquipmentAvailable(item, warbandName, fighterType, race, specificName, fighterSkills, fighterSpecialRules));

        // Filter out items whose category is restricted by equipped items (safety net)
        const restrictedCatsModal = getRestrictedCategoriesFromEquipment();
        if (restrictedCatsModal.length > 0) {
            items = items.filter(item => !restrictedCatsModal.includes(item.category));
        }
    }

    // Apply search filter
    const searchInput = document.getElementById('modal-equipment-search');
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (searchTerm) {
        items = items.filter(item => {
            const esName = (translateEquipment(item.name) || '').toLowerCase();
            return item.name.toLowerCase().includes(searchTerm) || esName.includes(searchTerm);
        });
    }

    const isNewFighterModal = document.getElementById('fighter-id').value === '';
    const isEditModal = !isNewFighterModal;
    const isPreGame = currentWarband && currentWarband.pre_game !== false;
    const hasGromrilRule = document.getElementById('f-special-rules').value.split('; ').includes('Gromril');
    const hasObsidianRule = isObsidianAvailable();

    items.forEach(item => {
        const isDwarf = currentWarband && (currentWarband.type === 'Dwarf Treasure Hunters' || currentWarband.type === 'Dwarf Rangers' || currentWarband.type === 'Dwarf Slayer Cult');
        const isPreGame = isEffectivePreGame();
        const hasGromril = document.getElementById('f-special-rules').value.split('; ').includes('Gromril');
        const isGromilArmour = item.name === 'Armour; Heavy - Gromril';
        const isHochlandBandit = currentWarband && currentWarband.type === 'Hochland Bandits';

        // Calculate modified cost using the new system
        const modifiedCost = calculateModifiedCost(item, warbandName, fighterType, race, specificName);
        const baseCost = item.baseCost !== undefined ? item.baseCost : parseFloat(item.cost) || 0;

        let displayedCost = modifiedCost;
        let originalCostText = '';
        let textColor = 'slate-400';

        // Apply Armour & Shield 50% Discount BEFORE all other modifiers
        const armourShieldResultModal = applyArmourShieldHalfCostDiscount(displayedCost, item);
        if (armourShieldResultModal.discountApplied) {
            displayedCost = armourShieldResultModal.finalCost;
            originalCostText = ` (House Rule: 50% Armour/Shield Discount - Was: ${armourShieldResultModal.originalCost} CO)`;
            textColor = 'green-300';
        }

        // Check if cost is different from base (for display purposes)
        if (!armourShieldResultModal.discountApplied && modifiedCost !== baseCost) {
            originalCostText = ` (Base: ${baseCost} CO)`;
            textColor = modifiedCost < baseCost ? 'green-300' : 'red-300';
        }

        // Apply Dwarf Treasure Hunter discounts
        if (isDwarf) {
            const discountInfo = getDwarfDiscountDisplayInfo(item, isPreGame, hasGromril, baseCost);
            displayedCost = discountInfo.displayedCost;
            originalCostText = discountInfo.originalCostText;
            textColor = discountInfo.textColor;
        }

        // Apply Hochland Bandits discounts
        if (isHochlandBandit) {
            const banditDiscountInfo = getHochlandBanditDiscountDisplayInfo(item, isNewFighterModal, displayedCost);
            displayedCost = banditDiscountInfo.displayedCost;
            originalCostText = banditDiscountInfo.originalCostText;
            textColor = banditDiscountInfo.textColor;
        }

        // Apply Lizardmen light armor cost
        const isLizardmen = currentWarband && currentWarband.type === 'Lizardmen';
        if (isLizardmen) {
            const lizardmenDiscountInfo = getLizardmenDiscountDisplayInfo(item, baseCost);
            // Only override if the item is Armour; Light, otherwise use the calculated modified cost
            if (item.name === 'Armour; Light') {
                displayedCost = lizardmenDiscountInfo.displayedCost;
                originalCostText = lizardmenDiscountInfo.originalCostText;
                textColor = lizardmenDiscountInfo.textColor;
            }
        }

        // Apply data-driven pregame cost modifiers (generic). displayedCost already reflects the
        // pregame price via calculateModifiedCost; this only updates the label. Skipped when the
        // Armour/Shield house rule label is already showing.
        if (!armourShieldResultModal.discountApplied) {
            const pgInfo = getPregameCostDisplayInfo(item, warbandName, specificName);
            if (pgInfo) {
                originalCostText = pgInfo.originalCostText;
                textColor = pgInfo.textColor;
            }
        }

        // Apply Druchii Crossbow Repeater discount
        if (race === 'Dark Elf') {
            const druchiiDiscountInfoModal = getDruchiiDiscountDisplayInfo(item, race, isNewFighterModal, displayedCost);
            displayedCost = druchiiDiscountInfoModal.displayedCost;
            originalCostText = druchiiDiscountInfoModal.originalCostText;
            textColor = druchiiDiscountInfoModal.textColor;
        }

        // Apply Imperial Outriders Warhorse discount
        const isImperialOutridersModal = currentWarband && currentWarband.type === 'Imperial Outriders';
        if (isImperialOutridersModal && isNewFighterModal) {
            const imperialOutridersDiscountInfoModal = getImperialOutridersDiscountDisplayInfo(item, isNewFighterModal, displayedCost);
            displayedCost = imperialOutridersDiscountInfoModal.displayedCost;
            originalCostText = imperialOutridersDiscountInfoModal.originalCostText;
            textColor = imperialOutridersDiscountInfoModal.textColor;
        }

        // Apply Night Goblins Web spear discount
        const isNightGoblinsWebModal = currentWarband && currentWarband.type === 'Night Goblins Web';
        if (isNightGoblinsWebModal && isPreGame) {
            const nightGoblinsWebDiscountInfoModal = getNightGoblinsWebDiscountDisplayInfo(item, isPreGame, specificName, displayedCost);
            displayedCost = nightGoblinsWebDiscountInfoModal.displayedCost;
            originalCostText = nightGoblinsWebDiscountInfoModal.originalCostText;
            textColor = nightGoblinsWebDiscountInfoModal.textColor;
        }

        // Apply Cult of the Possessed mutation double-cost
        if (currentWarband && currentWarband.type === 'Cult of the Possessed' && item.category === 'Mutations') {
            const mutationCostInfoModal = getCultOfPossessedMutationCostInfo(item, displayedCost);
            displayedCost = mutationCostInfoModal.displayedCost;
            originalCostText = mutationCostInfoModal.originalCostText;
            textColor = mutationCostInfoModal.textColor;
        }

        // Apply Blackpowder Pre-Game Discount (AFTER all other modifiers)
        const blackpowderResultModal = applyBlackpowderPreGameDiscount(displayedCost, item);
        let preGameDiscountAppliedModal = false;
        let preGameOriginalCostModal = displayedCost;
        if (blackpowderResultModal.discountApplied) {
            displayedCost = blackpowderResultModal.finalCost;
            preGameDiscountAppliedModal = true;
            preGameOriginalCostModal = blackpowderResultModal.originalCost;
        }

        // Apply Blackpowder 20% Discount (AFTER pre-game discount so they stack)
        const blackpowder20ResultModal = applyBlackpowder20PercentDiscount(displayedCost, item);
        if (blackpowder20ResultModal.discountApplied || preGameDiscountAppliedModal) {
            if (preGameDiscountAppliedModal && blackpowder20ResultModal.discountApplied) {
                displayedCost = blackpowder20ResultModal.finalCost;
                originalCostText = ` (House Rules: Pre-Game 1/3 + 20% Blackpowder Discount - Was: ${preGameOriginalCostModal} CO)`;
            } else if (blackpowder20ResultModal.discountApplied) {
                displayedCost = blackpowder20ResultModal.finalCost;
                originalCostText = ` (House Rule: 20% Blackpowder Discount - Was: ${blackpowder20ResultModal.originalCost} CO)`;
            } else {
                originalCostText = ` (House Rule: Pre-Game Blackpowder Discount - Was: ${preGameOriginalCostModal} CO)`;
            }
            textColor = 'green-300';
        }

        const rarityText = formatEquipmentRarity(item.rarity, warbandName, race);
        const rarityDisplay = rarityText ? ` <span class="text-blue-300 text-xs">${rarityText}</span>` : '';

        // Determine effective variable cost display
        let variableCostDisplay = '';
        const parsedCost = parseCostString(item, warbandName, fighterType, race, specificName);
        if (parsedCost.isVariable) {
            const diceText = parsedCost.multiplier > 1
                ? `${parsedCost.diceCount}D6x${parsedCost.multiplier}`
                : `${parsedCost.diceCount}D6`;
            variableCostDisplay = ` + ${diceText}`;
        }

        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center p-2 rounded-lg hover:bg-slate-700 cursor-pointer text-sm transition';

        // Check if this is a Close Combat weapon that should be expandable
        const isCloseCombat = selectedCategory === "Close Combat";
        const shouldBeExpandable = isCloseCombat && (isEditModal || isNewFighterModal || (isPreGame && hasGromrilRule) || (isPreGame && hasObsidianRule));

        if (shouldBeExpandable) {
            if (isObsidianAvailable()) {
                itemElement.innerHTML = renderObsidianWeaponOption(item, displayedCost, originalCostText, textColor, rarityDisplay, variableCostDisplay);
            } else {
                itemElement.innerHTML = renderGromrilWeaponOption(item, displayedCost, originalCostText, textColor, rarityDisplay, variableCostDisplay);
            }
        } else {
            // Check for custom cost input for variable cost equipment
            let actualCost = displayedCost;
            if (item.variableCost != null) {
                const customCostInput = document.getElementById('custom-cost-input');
                if (customCostInput && customCostInput.value) {
                    // For variable cost equipment, use custom cost if provided
                    actualCost = parseFloat(customCostInput.value) || displayedCost;
                }
            }
            
            const modalRulesId = `modal-equip-rules-${item.id}`;
            const displayName = translateEquipment(item.name) !== item.name
                ? `${translateEquipment(item.name)} <span class="text-slate-400 font-normal">(${item.name})</span>`
                : item.name;
            itemElement.innerHTML = `
                <div style="flex: 1; min-width: 0;">
                    <p class="font-semibold equip-name-toggle" data-rules-target="${modalRulesId}" style="cursor: pointer;">
                        <i class="fas fa-chevron-right text-xs text-slate-500 equip-chevron" style="transition: transform 0.2s; margin-right: 4px; font-size: 0.6rem;"></i>${displayName} <span class="text-${textColor} text-xs">(${displayedCost}${variableCostDisplay} CO${originalCostText})</span>${rarityDisplay}
                    </p>
                    <p id="${modalRulesId}" class="text-xs text-slate-500 italic equip-rules-content hidden" style="margin-top: 4px;">${formatEquipmentRules(item.rules, item.name)}</p>
                </div>
                <button class="text-green-400 hover:text-green-300 ml-2 flex-shrink-0" data-action="add-equipment-from-modal" data-item-id="${item.id}" data-cost="${actualCost}">
                    <i class="fas fa-plus-circle"></i> Añadir
                </button>
            `;

        }

        // Add click handler to toggle description visibility (for non-expandable items)
        const modalNameToggle = itemElement.querySelector('.equip-name-toggle');
        if (modalNameToggle) {
            modalNameToggle.addEventListener('click', () => {
                const targetId = modalNameToggle.getAttribute('data-rules-target');
                const rulesEl = document.getElementById(targetId);
                const chevron = modalNameToggle.querySelector('.equip-chevron');
                if (rulesEl) {
                    rulesEl.classList.toggle('hidden');
                    if (chevron) {
                        chevron.style.transform = rulesEl.classList.contains('hidden') ? '' : 'rotate(90deg)';
                    }
                }
            });
        }
        optionsContainer.appendChild(itemElement);
    });
};
