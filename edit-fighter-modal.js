import { MASTER_EQUIPMENT_LIST, RACIAL_MAXIMUMS, WARBANDS, DRAMATIS_PERSONAE, SPECIAL_RULES_DETAILS, SKILLS, MASTER_INJURY_LIST, VEHICLES, HIRED_SWORDS } from './data/index.js';
import { findSkillForWarbandCI } from './skill-lookup.js';
import { MAGIC } from './data/magic.js';
import { renderMagicSelection, getSelectedSpells, saveSpellsToFighter, getMagicGroupForFighter, getSpellsForGroup } from './spell-management.js';
import { STATS_FIELDS, HERO_XP_THRESHOLDS, STANDARD_XP_THRESHOLDS } from './config.js';
import { getWarbandData, calculateWarbandRating, calculateEquipmentCost, adjustEquipmentCosts, countItemInStorage, calculateArmorSave, showMessage, displayModal, hideModal, showConfirmationModal, showEditorView, showNewWarbandModal, saveHouseRuleState, handleHouseRuleChange, checkGroupRetrievalConstraint, getOriginalName } from './utility.js'; // Updated import
import { renderHeroXPBar, renderXPBar, renderFighterXPBar } from './advancement.js';
import { renderWarbandList, showListView, renderWarbandEditor, toggleGroupSize, updateGroupSizeDisplay, renderRacialMaximums, renderStatInputs, renderRaceOptions, populateWarriorChoices, updateFighterDataFromSelection, populateDramatisPersonaeChoices, updateFighterDataFromDramatisPersonaeSelection, populateHiredSwordChoices, updateFighterDataFromHiredSwordSelection, populateVehicleChoices, updateFighterDataFromVehicleSelection, showInjurySelectionModal, renderSelectedInjuries, addInjury, removeInjury, toggleExperienceVisibility, toggleSkillsLayout, resetComponentVisibility } from './ui.js';
import { renderEquipmentSelector, renderEquipmentOptions, renderSelectedEquipment, updateStatModifiers, showAddToStorageModal, updateSellPrice, renderStorageEquipmentOptions, showSellFromStorageModal, showRetrieveModal, renderArmorSave, addEquipment, removeEquipment } from './equipment-management.js';
import { useLocalStorage, userId, currentWarband, warbands, tempItemToRemove, tempItemToRetrieve, tempItemToAdd, currentFighterBaseStats, setUseLocalStorage, setUserId, setCurrentWarband, setWarbands, setTempItemToRemove, setTempItemToRetrieve, setTempItemToAdd, setCurrentFighterBaseStats, setCurrentFighterMultiStats, setIsShieldMeleeIgnored, setAvailableSkillCategories, setBaseSkillCategories } from './state.js';
import { isSlowWitted, isElemental, hasHalfXPRate, formatXPDisplay } from './slow-witted.js';
import { handleChosenOfChaosSkillChange } from './equiprules/marauders-of-chaos.js';
import { applyMountStats } from './equiprules/mounts.js';
import { translateEquipment, translateSkill, translateWarriorRole } from './i18n.js';


/** Updates the race display in the edit fighter modal when race changes */
const updateRaceDisplayInModal = (newRace) => {
    const raceSelect = document.getElementById('f-race');
    if (raceSelect) {
        raceSelect.value = newRace;
        // Update the racial maximums display to reflect the new race
        renderRacialMaximums();
        showMessage(`Raza cambiada a ${newRace}`, 'success');
    }
};

/** Refreshes the modal data from the current warband to ensure it shows the latest information */
const refreshModalDataFromWarband = (fighterId) => {
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;

    // Update the race field to show the current race from the warband
    const raceSelect = document.getElementById('f-race');
    if (raceSelect) {
        raceSelect.value = fighter.race || '';
        renderRacialMaximums();
    }

    // Update the skills display
    const skillsInput = document.getElementById('f-skills-hidden');
    const skillsDisplay = document.getElementById('f-skills');
    if (skillsInput && skillsDisplay) {
        const groupName = getMagicGroupForFighter(fighter);
        const allSpellsInGroup = groupName ? getSpellsForGroup(groupName) : [];
        let skillsToShow = (Array.isArray(fighter.skills) ? fighter.skills : []).filter(skill => !allSpellsInGroup.includes(skill));

        skillsInput.value = JSON.stringify(skillsToShow);
        if (skillsToShow.length > 0) {
            const skillsHtml = skillsToShow.map((skill, index) => `
                <div class="flex justify-between items-center text-yellow-200 text-sm mb-1">
                    <span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}" data-fighter-id="${fighter.id}">${skill}</span>
                    <button class="text-red-400 hover:text-red-300 ml-2" data-action="remove-skill" data-skill-name="${skill}" data-skill-index="${index}">
                        <i class="fas fa-times-circle"></i>
                    </button>
                </div>
            `).join('');
            skillsDisplay.innerHTML = skillsHtml;
        } else {
            skillsDisplay.textContent = 'Ninguna';
        }
    }

    // Update the XP display
    const xpInput = document.getElementById('f-xp');
    if (xpInput) {
        xpInput.value = fighter.xp || 0;
        renderFighterXPBar(fighter);
    }

    // Update the stats display
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid && fighter.type !== 'Vehicle') {
        renderStatInputs(fighter.stats);
    }

    // Advancement is now handled in the Advancement Hub
};

/** Validates and formats XP input for Slow Witted/Elemental fighters */
const validateAndFormatXPInput = (fighter, newValue, saveWarband) => {
    const xpInput = document.getElementById('f-xp');
    if (!xpInput) return;

    // Parse the input value
    const parsedValue = parseFloat(newValue);
    
    // Check if the value is a valid number
    if (isNaN(parsedValue) || parsedValue < 0) {
        showMessage("Valor de PX no válido. Por favor, introduce un número mayor o igual a cero.", 'error');
        // Reset to previous valid value
        xpInput.value = fighter.xp;
        return;
    }

    // Check if fighter has Slow Witted or Elemental rule
    const ruleName = isSlowWitted(fighter) ? "Lento de Reflejos" : (isElemental(fighter) ? "Elemental" : null);
    if (ruleName) {
        // For Slow Witted / Elemental fighters, XP must be in 0.5 increments
        // Check if the value is a multiple of 0.5
        const isMultipleOfHalf = Math.abs((parsedValue * 2) % 1) < 0.0001;
        
        if (!isMultipleOfHalf) {
            showMessage(`Los guerreros con la regla ${ruleName} solo pueden tener valores de PX en incrementos de 0,5 (ej. 0,5, 1,0, 1,5, 2,0).`, 'error');
            // Round to nearest valid 0.5 increment
            const roundedValue = Math.round(parsedValue * 2) / 2;
            xpInput.value = formatXPDisplay(roundedValue);
            showMessage(`PX corregida automáticamente a ${formatXPDisplay(roundedValue)}`, 'info');
        } else {
            // Valid value, update the display format
            xpInput.value = formatXPDisplay(parsedValue);
        }
    } else {
        // For normal fighters, ensure whole numbers
        if (!Number.isInteger(parsedValue)) {
            showMessage("Los guerreros normales deben tener valores de PX enteros. Los valores decimales se redondearán.", 'warning');
            const roundedValue = Math.round(parsedValue);
            xpInput.value = roundedValue.toString();
            showMessage(`PX corregida automáticamente a ${roundedValue}`, 'info');
        }
    }

    // Update the fighter's XP value in memory
    fighter.xp = parseFloat(xpInput.value) || 0;
    
    // Re-render the XP bar to reflect changes
    renderFighterXPBar(fighter);
    
    // Get role from UI input to ensure consistency with what user sees/edits
    const role = document.getElementById('f-type').value;

    // Advancement is now handled in the Advancement Hub
};


/**
 * Opens the modal to edit an existing fighter.
 * @param {Object} [options]
 * @param {boolean} [options.silent=false] - Populate the edit form without displaying the modal
 *   (used by the Gear modal to reuse the equipment purchase/sale logic).
 */
const editFighter = (fighterId, saveWarband, { silent = false } = {}) => {
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;

    // Handle multi-stat fighters (with mounts) and vehicles
    const isMultiStat = fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v));
    let fighterStats;
    if (fighter.type === 'Vehicle') {
        // Vehicles have multi-component stats - use first component as base
        setCurrentFighterMultiStats(JSON.parse(JSON.stringify(fighter.stats)));
        fighterStats = Object.values(fighter.stats)[0]; // First component's stats
    } else {
        fighterStats = isMultiStat ? fighter.stats.Fighter : fighter.stats;
    }
    setCurrentFighterBaseStats({ ...fighterStats });

    document.getElementById('fighter-modal-title').textContent = `Editar ${fighter.name}`;
    document.getElementById('fighter-id').value = fighter.id;
    document.getElementById('delete-fighter-btn').classList.remove('hidden');
    document.getElementById('cost-breakdown-btn').classList.remove('hidden');
    
    // Populate Notes (always hidden by default in the edit modal, but button color shows if content exists)
    const notesValue = fighter.notes || '';
    document.getElementById('f-notes').value = notesValue;
    const notesWrapper = document.getElementById('f-notes-wrapper');
    const notesBtn = document.getElementById('f-notes-btn');
    if (notesWrapper) {
        notesWrapper.classList.add('hidden');
    }
    if (notesBtn) {
        if (notesValue) {
            notesBtn.classList.remove('text-slate-400');
            notesBtn.classList.add('text-mordheim-gold');
        } else {
            notesBtn.classList.remove('text-mordheim-gold');
            notesBtn.classList.add('text-slate-400');
        }
    }

    document.getElementById('f-cost-wrapper').classList.add('hidden');
    document.getElementById('f-name').value = fighter.name;

    // Set Fighter Role
    const allowedRoles = ['Hero', 'Henchman', 'Hired Sword', 'Dramatis Personae', 'Vehicle'];
    let fighterRole = fighter.type || 'Henchman';
    if (!allowedRoles.includes(fighterRole) && (fighterRole.toLowerCase().includes('hero') || fighterRole.toLowerCase().includes('leader'))) {
        fighterRole = 'Hero';
    } else if (!allowedRoles.includes(fighterRole)) {
        fighterRole = 'Henchman';
    }
    // Set fighter type without triggering change event
    const typeSelect = document.getElementById('f-type');
    typeSelect.value = fighterRole;

    // Disable the 'Hero' option if the warband is full and the current fighter is not a hero
    const heroCount = currentWarband.members.filter(member => member.type === 'Hero').length;
    const heroOption = document.querySelector('#f-type option[value="Hero"]');
    if (heroOption) {
        if (heroCount >= 6 && fighter.type !== 'Hero') {
            heroOption.disabled = true;
        } else {
            heroOption.disabled = false;
        }
    }

    // Populate warrior choices and set the current fighter's choice
    populateWarriorChoices(fighter.type);
    populateVehicleChoices(); // Populate vehicle choices for edit mode

    // Ensure the fighter's warrior_choice is available in the dropdown if it's not already there
    if (fighter.type !== 'Vehicle' && fighter.warrior_choice) {
        const warriorChoiceSelect = document.getElementById('f-warrior-choice');
        const existingOptions = Array.from(warriorChoiceSelect.options).map(opt => opt.value);
        if (!existingOptions.includes(fighter.warrior_choice)) {
            const option = document.createElement('option');
            option.value = fighter.warrior_choice;
            option.textContent = translateWarriorRole(fighter.warrior_choice) || fighter.warrior_choice;
            warriorChoiceSelect.appendChild(option);
        }
    }

    // Set the warrior choice value AFTER populating the dropdown
    // This ensures the equipment rules system can properly recognize the fighter type
    if (fighter.type === 'Vehicle') {
        document.getElementById('f-vehicle-choice').value = fighter.name;
    } else {
        document.getElementById('f-warrior-choice').value = fighter.warrior_choice || fighter.name;
    }

    // Set Race
    let selectedRace = fighter.race || '';
    
    // Check for Chosen of Chaos race change for Marauders of Chaos warband
    if (currentWarband.type.includes('Marauders of Chaos')) {
        const skillsToShow = (Array.isArray(fighter.skills) ? fighter.skills : []).filter(skill => !getSpellsForGroup(getMagicGroupForFighter(fighter)).includes(skill));
        const raceChangeResult = handleChosenOfChaosSkillChange(skillsToShow, selectedRace);
        if (raceChangeResult.changed) {
            selectedRace = raceChangeResult.race;
            // Update the fighter's race in memory to reflect the change
            fighter.race = selectedRace;
            showMessage(raceChangeResult.reason, 'success');
        }
    }
    
    renderRaceOptions(selectedRace);
    document.getElementById('f-race').value = selectedRace;

    // Apply Carnival race visibility adjustments for Plague Cart if applicable
    if (currentWarband && currentWarband.type === 'Carnival of Chaos') {
        const raceLabel = document.querySelector('label[for="f-race"]');
        const raceSelect = document.getElementById('f-race');

        if (fighter.name === 'Plague Cart') {
            if (raceLabel) raceLabel.classList.add('hidden');
            if (raceSelect) raceSelect.classList.add('hidden');
        } else {
            if (raceLabel) raceLabel.classList.remove('hidden');
            if (raceSelect) raceSelect.classList.remove('hidden');
        }
    }

    // Hide race field for vehicles as it's not applicable
    if (fighter.type === 'Vehicle') {
        const raceLabel = document.querySelector('label[for="f-race"]');
        const raceSelect = document.getElementById('f-race');
        if (raceLabel) raceLabel.classList.add('hidden');
        if (raceSelect) raceSelect.classList.add('hidden');
    }

    // Initialize leader checkbox
    const leaderWrapper = document.getElementById('leader-checkbox-wrapper');
    const leaderCheckbox = document.getElementById('f-is-leader');
    if (fighterRole === 'Hero') {
        leaderWrapper.classList.remove('hidden');
        // Pre-check if fighter has Leader rule
        const hasLeaderRule = (fighter.special_rules || '').includes('Leader');
        leaderCheckbox.checked = hasLeaderRule;
    } else {
        leaderWrapper.classList.add('hidden');
        leaderCheckbox.checked = false;
    }

    // Set Group Size
    document.getElementById('f-group-size').value = fighter.group_size || 1;
    document.getElementById('f-cost').value = fighter.cost;
    document.getElementById('f-xp').value = fighter.xp;
    
    // Reset cost and upkeep labels to default for editing
    document.getElementById('f-cost-label').textContent = 'Coste (CO, por guerrero)';
    document.getElementById('f-upkeep-label').textContent = 'Coste de Mantenimiento (CO por batalla)';
    
    // Filter out spells from skills display
    const groupName = getMagicGroupForFighter(fighter);
    const allSpellsInGroup = groupName ? getSpellsForGroup(groupName) : [];
    let skillsToShow = (Array.isArray(fighter.skills) ? fighter.skills : []).filter(skill => !allSpellsInGroup.includes(skill));
    
    document.getElementById('f-skills-hidden').value = JSON.stringify(skillsToShow);

    // Add real-time monitoring of skill changes for race updates
    const skillsInput = document.getElementById('f-skills-hidden');
    if (skillsInput && currentWarband.type.includes('Marauders of Chaos')) {
        skillsInput.addEventListener('change', (e) => {
            const newSkills = JSON.parse(e.target.value || '[]');
            const currentRace = document.getElementById('f-race').value;
            const raceChangeResult = handleChosenOfChaosSkillChange(newSkills, currentRace);
            if (raceChangeResult.changed) {
                // Update the fighter's race in memory
                fighter.race = raceChangeResult.race;
                // Update the modal display
                updateRaceDisplayInModal(raceChangeResult.race);
            }
        });
    }

    const skillsDisplay = document.getElementById('f-skills');
    if (skillsToShow.length > 0) {
        const skillsHtml = skillsToShow.map((skill, index) => `
            <div class="flex justify-between items-center text-yellow-200 text-sm mb-1">
                <span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}" data-fighter-id="${fighter.id}">${skill}</span>
                <button class="text-red-400 hover:text-red-300 ml-2" data-action="remove-skill" data-skill-name="${skill}" data-skill-index="${index}">
                    <i class="fas fa-times-circle"></i>
                </button>
            </div>
        `).join('');
        skillsDisplay.innerHTML = skillsHtml;
    } else {
        skillsDisplay.textContent = 'Ninguna';
    }
    document.getElementById('f-injuries-json').value = JSON.stringify(Array.isArray(fighter.injuries) ? fighter.injuries : []);
    document.getElementById('f-chosen-magic-lore').value = fighter.chosen_magic_lore || '';
    fighter.advancements = fighter.advancements || [];

    // Render advancements taken
    const takenList = document.getElementById('advancements-taken-list');
    const takenWrapper = document.getElementById('advancements-taken-wrapper');
    if (fighter.advancements.length > 0) {
        takenList.textContent = fighter.advancements.join(', ');
        takenWrapper.classList.remove('hidden');
    } else {
        takenList.textContent = 'Ninguno';
        takenWrapper.classList.add('hidden');
    }

    const rulesDisplay = document.getElementById('warrior-rules-display');
    
    // Check if it's a vehicle first, then fall back to warrior
    let warriorChoice;
    if (fighter.type === 'Vehicle') {
        // Look up in VEHICLES data
        warriorChoice = VEHICLES.flatMap(g => g.vehicles).find(v => v.name === fighter.name);
    } else {
        // Look up in warband's warriors
        const warriorType = fighter.warrior_choice || fighter.name;
        warriorChoice = WARBANDS.flatMap(g => g.warbands).find(w => w.name === currentWarband.type)?.data.warriors.find(w => w.name === warriorType);
    }

    // Collect all rules from different sources
    let allRules = [];
    if (warriorChoice) {
        // For vehicles, rules are in data.special_rules; for warriors, they're in rules
        const rulesSource = fighter.type === 'Vehicle' ? warriorChoice.data?.special_rules : warriorChoice.rules;
        if (rulesSource) {
            allRules.push(...rulesSource.split(';').map(r => r.trim()));
        }
    }

    const skills = fighter.skills || [];
    if (skills.length > 0) {
        // Ensure skills have details for modal popup
        skills.forEach(skill => {
            if (!SPECIAL_RULES_DETAILS.find(r => r.name.toLowerCase() === skill.toLowerCase())) {
                const skillData = findSkillForWarbandCI(skill, null, fighter);
                if (skillData) {
                    SPECIAL_RULES_DETAILS.push({name: skill, rules: skillData.rules, timing: skillData.timing});
                }
            }
        });
    }

    // Add special rules from injuries/other sources
    const specialRules = fighter.special_rules;
    if (specialRules) {
        allRules.push(...specialRules.split(';').map(r => r.trim()));
    }

    // Remove duplicates
    let uniqueRules = [...new Set(allRules)];

    // Apt Revitalist: filter out "Do not gain experience" for Zombie(MH) fighters if warband has the skill
    if (fighter.race === 'Zombie(MH)') {
        const aptRevitalistSkill = SKILLS.find(s => s.id === 912);
        if (aptRevitalistSkill && currentWarband && currentWarband.members &&
            currentWarband.members.some(m => Array.isArray(m.skills) && m.skills.includes(aptRevitalistSkill.name))
        ) {
            uniqueRules = uniqueRules.filter(r => r.toLowerCase() !== 'do not gain experience');
        }
    }

    // Build HTML and update display
    let rulesHtml = '';
    if (uniqueRules.length > 0) {
        rulesHtml = uniqueRules.map(rule => {
            const ruleName = rule.split('(')[0].trim();
            return `<span class="underline cursor-pointer text-mordheim-gold" data-rule="${ruleName}">${rule}</span>`;
        }).join('<br>');
        rulesDisplay.innerHTML = rulesHtml;
    } else {
        rulesDisplay.textContent = 'Ninguna';
    }

    // Update the hidden input with the combined unique rules
    document.getElementById('f-special-rules').value = uniqueRules.join('; ');

    // Re-render XP bar with special rules for existing fighters
    renderFighterXPBar(fighter);

    // Add XP input validation for Slow Witted/Elemental fighters
    const xpInput = document.getElementById('f-xp');
    if (xpInput) {
        // Set step attribute based on Slow Witted/Elemental rules
        if (hasHalfXPRate(fighter)) {
            xpInput.step = 0.5; // Allow 0.5 increments for half-rate XP fighters
        } else {
            xpInput.step = 1; // Default 1 increment for normal fighters
        }
        
        // CRITICAL: Clone the input element to remove ALL old event listeners
        // This prevents stale listeners from previous modals interfering
        const newXpInput = xpInput.cloneNode(true);
        xpInput.parentNode.replaceChild(newXpInput, xpInput);
        
        // Add real-time validation for browser arrow clicks (input event)
        newXpInput.addEventListener('input', (e) => {
            validateAndFormatXPInput(fighter, e.target.value, saveWarband);
        });
        
        // Add validation on change event (for manual typing)
        newXpInput.addEventListener('change', (e) => {
            validateAndFormatXPInput(fighter, e.target.value, saveWarband);
        });
    }

    // Add functionality for custom XP up/down buttons
    const xpUpBtn = document.getElementById('xp-up-btn');
    const xpDownBtn = document.getElementById('xp-down-btn');
    
    if (xpUpBtn && xpDownBtn) {
        // Remove existing event listeners by cloning
        const newUpBtn = xpUpBtn.cloneNode(true);
        const newDownBtn = xpDownBtn.cloneNode(true);
        xpUpBtn.parentNode.replaceChild(newUpBtn, xpUpBtn);
        xpDownBtn.parentNode.replaceChild(newDownBtn, xpDownBtn);
        
        // Add click handlers for up button
        newUpBtn.addEventListener('click', () => {
            const xpInput = document.getElementById('f-xp');
            if (xpInput && !xpInput.disabled) {
                const step = hasHalfXPRate(fighter) ? 0.5 : 1;
                const currentValue = parseFloat(xpInput.value) || 0;
                const newValue = currentValue + step;
                xpInput.value = newValue;
                validateAndFormatXPInput(fighter, newValue, saveWarband);
            }
        });
        
        // Add click handlers for down button
        newDownBtn.addEventListener('click', () => {
            const xpInput = document.getElementById('f-xp');
            if (xpInput && !xpInput.disabled) {
                const step = hasHalfXPRate(fighter) ? 0.5 : 1;
                const currentValue = parseFloat(xpInput.value) || 0;
                const newValue = Math.max(0, currentValue - step); // Don't go below 0
                xpInput.value = newValue;
                validateAndFormatXPInput(fighter, newValue, saveWarband);
            }
        });
    }

    // Determine base skill categories (from promotion, warband data, or hired sword data)
    let baseCats = [];
    if (fighter.skills && fighter.skills.includes("Proven Warrior")) {
        baseCats = ["Combat", "Shooting", "Strength", "Speed", "Special"];
    } else if (fighter.skill_categories_override && fighter.skill_categories_override.length > 0) {
        // Manual override takes priority over all other sources (except Proven Warrior)
        baseCats = [...fighter.skill_categories_override];
    } else if (fighter.skill_categories && fighter.skill_categories.length > 0) {
        baseCats = [...fighter.skill_categories];
    } else if (warriorChoice && warriorChoice.type === 'hero' && warriorChoice.skills && warriorChoice.skills.length > 0) {
        baseCats = [...warriorChoice.skills];
    } else if (fighter.type === 'Hired Sword') {
        const hiredSwordData = HIRED_SWORDS.flatMap(g => g.characters).find(c => c.name === getOriginalName(fighter, HIRED_SWORDS));
        if (hiredSwordData && hiredSwordData.data.skills && hiredSwordData.data.skills.length > 0) {
            baseCats = [...hiredSwordData.data.skills];
        }
    }
    // Store base categories in state so equipment-management can combine them
    setBaseSkillCategories(baseCats);

    // Populate the skill categories override hidden input
    const overrideInput = document.getElementById('f-skill-categories-override-json');
    if (overrideInput) {
        if (fighter.skill_categories_override && fighter.skill_categories_override.length > 0) {
            overrideInput.value = JSON.stringify(fighter.skill_categories_override);
        } else {
            overrideInput.value = '';
        }
    }

    
    // Handle new vs. old equipment format
    let equipmentArray = [];
    if (fighter.equipment && Array.isArray(fighter.equipment)) {
        equipmentArray = fighter.equipment;
    }

    // Check if fighter has mounts and recalculate multi-stats if needed
    const hasMount = equipmentArray.some(eq => {
        const masterItem = eq.id !== undefined
            ? MASTER_EQUIPMENT_LIST.find(i => i.id === eq.id)
            : MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        return masterItem && (masterItem.category === 'Mounts' || masterItem.category === 'War Beasts');
    });

    if (hasMount) {
        // Recalculate multi-stats from current equipment
        const multiStats = applyMountStats(equipmentArray, fighterStats);
        setCurrentFighterMultiStats(multiStats);
    } else {
        // No mounts - clear multi-stats
        setCurrentFighterMultiStats(null);
    }

    // CRITICAL: Set the original equipment cost before loading the editor
    // This is PER FIGHTER COST
    document.getElementById('f-original-equipment-cost').value = calculateEquipmentCost(equipmentArray);

    // Clear pending equipment change data from any previous session
    const fighterModal = document.getElementById('fighter-modal');
    delete fighterModal.dataset.pendingPurchases;
    delete fighterModal.dataset.pendingSellGc;
    delete fighterModal.dataset.pendingSells;
    delete fighterModal.dataset.pendingStores;
    delete fighterModal.dataset.pendingRemovedCost;

    renderEquipmentSelector(equipmentArray);

    // Hide equipment section if starting_equipment is ["None"]
    const equipmentSection = document.getElementById('equipment-section');
    const startingEquipment = fighter.type === 'Vehicle' ? warriorChoice?.data?.starting_equipment : warriorChoice?.starting_equipment;
    if (startingEquipment && startingEquipment.includes("None")) {
        equipmentSection.classList.add('hidden');
    } else {
        equipmentSection.classList.remove('hidden');
    }

    // Only render stat inputs for non-vehicles (vehicles have fixed multi-component stats)
    const statsGrid = document.getElementById('stats-grid');
    if (fighter.type === 'Vehicle') {
        if (statsGrid) statsGrid.classList.add('hidden');
    } else {
        if (statsGrid) statsGrid.classList.remove('hidden');
        renderStatInputs(fighter.stats);
    }
    toggleGroupSize(); // Update visibility based on loaded role and render grid

    // Reset component visibility to default vertical layout
    resetComponentVisibility();
    // toggleSkillsLayout(startingEquipment, uniqueRules.join('; ')); // Removed - using default vertical layout

    // Toggle experience visibility based on special rules (after toggleGroupSize to override if needed)
    toggleExperienceVisibility(uniqueRules.join('; '));

    renderRacialMaximums();

    renderArmorSave(); // Calculate for loaded equipment
    updateStatModifiers();
    renderSelectedInjuries(); // Render the injuries list

    // Render magic selection if applicable
    renderMagicSelection(fighter);

    // Make XP field readonly in edit mode - XP changes handled in Advancement Hub
    xpInput.readOnly = true;
    xpInput.classList.add('opacity-70', 'cursor-not-allowed');
    document.getElementById('xp-up-btn').classList.add('hidden');
    document.getElementById('xp-down-btn').classList.add('hidden');

    // Disable fields that should not be editable in edit mode
    document.getElementById('f-type').disabled = true;
    document.getElementById('f-race').disabled = true;
    document.getElementById('f-warrior-choice').disabled = true;
    document.getElementById('f-vehicle-choice').disabled = true;
    document.getElementById('f-group-size').readOnly = true;
    document.getElementById('f-group-size').classList.add('opacity-70', 'cursor-not-allowed');

    // Populate and set hired sword / dramatis personae dropdowns for edit mode
    if (fighterRole === 'Hired Sword') {
        populateHiredSwordChoices();
        const originalName = getOriginalName(fighter, HIRED_SWORDS);
        document.getElementById('f-hired-sword-choice').value = originalName;
        document.getElementById('f-hired-sword-choice').disabled = true;
    }
    if (fighterRole === 'Dramatis Personae') {
        populateDramatisPersonaeChoices();
        const originalName = getOriginalName(fighter, DRAMATIS_PERSONAE);
        document.getElementById('f-dramatis-personae-choice').value = originalName;
        document.getElementById('f-dramatis-personae-choice').disabled = true;
    }

    // Handle upkeep cost display based on fighter type
    const upkeepWrapper = document.getElementById('f-upkeep-wrapper');
    const upkeepCostElement = document.getElementById('f-upkeep-cost');
    
    if (fighterRole === 'Hired Sword') {
        // Look up hired sword data to get upkeep fee and check for special costs
        const hiredSwordData = HIRED_SWORDS.flatMap(g => g.characters).find(c => c.name === getOriginalName(fighter, HIRED_SWORDS));
        const upkeepCost = hiredSwordData?.data?.upkeep_fee || 0;
        const specialUpkeepTreasure = hiredSwordData?.data?.special_upkeep_treasure || 0;
        const specialHireTreasure = hiredSwordData?.data?.special_hire_treasure || 0;
        
        upkeepWrapper.classList.remove('hidden');
        
        if (specialUpkeepTreasure > 0) {
            upkeepCostElement.textContent = specialUpkeepTreasure;
            document.getElementById('f-upkeep-label').textContent = 'Coste de Mantenimiento (Tesoro por batalla)';
        } else {
            upkeepCostElement.textContent = upkeepCost;
            document.getElementById('f-upkeep-label').textContent = 'Coste de Mantenimiento (CO por batalla)';
        }
        
        // Update cost label based on whether this was a treasure hire
        if (specialHireTreasure > 0) {
            document.getElementById('f-cost-label').textContent = 'Coste (Tesoro, por guerrero)';
        } else {
            document.getElementById('f-cost-label').textContent = 'Coste (CO, por guerrero)';
        }
    } else if (fighterRole === 'Dramatis Personae') {
        // Look up dramatis personae data to get upkeep fee
        const dramatisPersonaeData = DRAMATIS_PERSONAE.flatMap(g => g.characters).find(c => c.name === getOriginalName(fighter, DRAMATIS_PERSONAE));
        const upkeepCost = dramatisPersonaeData?.data?.upkeep_fee || 0;
        upkeepWrapper.classList.remove('hidden');
        upkeepCostElement.textContent = upkeepCost;
        // Dramatis Personae don't have special treasure costs in current data
        document.getElementById('f-upkeep-label').textContent = 'Coste de Mantenimiento (CO por batalla)';
        document.getElementById('f-cost-label').textContent = 'Coste (CO, por guerrero)';
    } else {
        // Hide upkeep for regular warriors, heroes, henchmen, and vehicles
        upkeepWrapper.classList.add('hidden');
        upkeepCostElement.textContent = '0';
    }

    // Initialize mobile collapsible Fighter Identity section
    const identityContent = document.getElementById('fighter-identity-content');
    const identityToggleBtn = document.getElementById('fighter-identity-toggle-btn');
    const identityChevron = document.getElementById('fighter-identity-chevron');
    
    if (identityContent && identityToggleBtn) {
        // Show the toggle button (will only be visible on mobile due to md:!hidden)
        identityToggleBtn.classList.remove('hidden');
        // Ensure content starts expanded
        identityContent.style.display = '';
        if (identityChevron) {
            identityChevron.style.transform = '';
        }
        
        // Clone button to remove previous listeners
        const newToggleBtn = identityToggleBtn.cloneNode(true);
        identityToggleBtn.parentNode.replaceChild(newToggleBtn, identityToggleBtn);
        
        newToggleBtn.addEventListener('click', () => {
            const chevron = document.getElementById('fighter-identity-chevron');
            const content = document.getElementById('fighter-identity-content');
            const isCollapsed = content.style.display === 'none';
            
            if (isCollapsed) {
                content.style.display = '';
                if (chevron) chevron.style.transform = '';
            } else {
                content.style.display = 'none';
                if (chevron) chevron.style.transform = 'rotate(180deg)';
            }
        });
    }

    if (!silent) {
        displayModal('fighter-modal'); // Updated call
    }
};

/** Removes a skill from the fighter with confirmation */
const removeSkill = (skillName, skillIndex, saveWarband) => {
    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;

    // Show confirmation dialog
    const displaySkill = translateSkill(skillName) || skillName;
    showConfirmationModal(
        `¿Seguro que quieres eliminar "${displaySkill}" de ${fighter.name}? Esta acción no se puede deshacer.`,
        async () => {
            // Remove the skill from the fighter's skills array
            if (Array.isArray(fighter.skills)) {
                fighter.skills.splice(skillIndex, 1);
            }

            // Update the hidden skills input FIRST (updateStatModifiers reads from it)
            const skillsInput = document.getElementById('f-skills-hidden');
            if (skillsInput) {
                skillsInput.value = JSON.stringify(fighter.skills || []);
            }

            // Skill characteristic modifiers are computed display-only by updateStatModifiers()
            // Do NOT mutate fighter.stats here to prevent double-counting
            updateStatModifiers();
            renderArmorSave();

            // Check for Chosen of Chaos race change for Marauders of Chaos warband
            if (currentWarband.type.includes('Marauders of Chaos')) {
                const groupName = getMagicGroupForFighter(fighter);
                const allSpellsInGroup = groupName ? getSpellsForGroup(groupName) : [];
                const skillsToShow = (Array.isArray(fighter.skills) ? fighter.skills : []).filter(skill => !allSpellsInGroup.includes(skill));
                const raceChangeResult = handleChosenOfChaosSkillChange(skillsToShow, fighter.race);
                if (raceChangeResult.changed) {
                    fighter.race = raceChangeResult.race;
                    const raceSelect = document.getElementById('f-race');
                    if (raceSelect) {
                        raceSelect.value = raceChangeResult.race;
                        renderRacialMaximums();
                        showMessage(raceChangeResult.reason, 'success');
                    }
                }
            }

            // Refresh the skills display
            const skillsDisplay = document.getElementById('f-skills');
            if (skillsDisplay) {
                const groupName = getMagicGroupForFighter(fighter);
                const allSpellsInGroup = groupName ? getSpellsForGroup(groupName) : [];
                let skillsToShow = (Array.isArray(fighter.skills) ? fighter.skills : []).filter(skill => !allSpellsInGroup.includes(skill));

                if (skillsToShow.length > 0) {
                    const skillsHtml = skillsToShow.map((skill, index) => `
                        <div class="flex justify-between items-center text-yellow-200 text-sm mb-1">
                            <span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>
                            <button class="text-red-400 hover:text-red-300 ml-2" data-action="remove-skill" data-skill-name="${skill}" data-skill-index="${index}">
                                <i class="fas fa-times-circle"></i>
                            </button>
                        </div>
                    `).join('');
                    skillsDisplay.innerHTML = skillsHtml;
                } else {
                    skillsDisplay.textContent = 'Ninguna';
                }
            }

            // Advancement is now handled in the Advancement Hub

            // Save the warband
            await saveWarband();

            showMessage(`Habilidad "${displaySkill}" eliminada de ${fighter.name}.`, 'success');
        }
    );
};

/** Shows the cost breakdown modal for the currently edited fighter */
const showCostBreakdownModal = () => {
    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;

    const contentDiv = document.getElementById('cost-breakdown-content');
    const baseCost = fighter.cost || 0;
    const groupSize = parseInt(document.getElementById('f-group-size').value) || fighter.group_size || 1;
    const isHenchman = fighter.type === 'Henchman';

    // Get adjusted equipment for cost calculation
    const equipment = adjustEquipmentCosts(fighter.equipment || []);

    // Build equipment rows
    let equipmentRowsHtml = '';
    let equipmentTotal = 0;
    if (equipment.length > 0) {
        equipment.forEach(item => {
            const itemCost = typeof item.variableCost === 'number' ? item.variableCost : (item.cost || 0);
            const cost = parseFloat(itemCost) || 0;
            equipmentTotal += cost;

            // Check if cost differs from base cost (custom value entered)
            const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
            const originalCost = masterItem ? masterItem.baseCost : null;
            let costLabel = `${cost} CO`;
            if (originalCost !== null && cost != originalCost) {
                costLabel = `${cost} CO <span class="text-slate-500 text-xs line-through">${originalCost} CO</span>`;
            }

            const itemDisplayName = translateEquipment(item.name) !== item.name
                ? `${translateEquipment(item.name)} <span class="text-slate-400 font-normal">(${item.name})</span>`
                : item.name;

            equipmentRowsHtml += `
                <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-300">${itemDisplayName}</span>
                    <span class="text-yellow-200">${costLabel}</span>
                </div>`;
        });
    } else {
        equipmentRowsHtml = `<div class="text-sm text-slate-500">Ningún equipo</div>`;
    }

    const perFighterTotal = baseCost + equipmentTotal;

    let html = `
        <!-- Fighter Base Cost -->
        <div class="bg-slate-800 p-3 rounded-lg">
            <div class="flex justify-between items-center">
                <span class="text-slate-300 font-medium">${fighter.name}</span>
                <span class="text-mordheim-gold font-bold">${baseCost} CO</span>
            </div>
        </div>

        <!-- Equipment Costs -->
        <div class="bg-slate-800 p-3 rounded-lg">
            <div class="text-sm font-medium text-slate-400 mb-2">Equipo</div>
            ${equipmentRowsHtml}
            <div class="flex justify-between items-center mt-2 pt-2 border-t border-slate-600 text-sm">
                <span class="text-slate-400">Subtotal de Equipo</span>
                <span class="text-yellow-200 font-medium">${equipmentTotal} CO</span>
            </div>
        </div>`;

    // Henchmen multiplier
    if (isHenchman && groupSize > 1) {
        html += `
        <div class="bg-slate-800 p-3 rounded-lg">
            <div class="flex justify-between items-center text-sm">
                <span class="text-slate-300">Coste por guerrero</span>
                <span class="text-yellow-200">${perFighterTotal} CO</span>
            </div>
            <div class="flex justify-between items-center text-sm mt-1">
                <span class="text-slate-300">Tamaño del grupo</span>
                <span class="text-yellow-200">&times; ${groupSize}</span>
            </div>
        </div>`;
    }

    // Total
    const totalCost = perFighterTotal * groupSize;
    html += `
        <div class="bg-slate-900 p-3 rounded-lg border border-mordheim-gold">
            <div class="flex justify-between items-center">
                <span class="text-mordheim-gold font-bold text-lg">Total</span>
                <span class="text-mordheim-gold font-bold text-lg">${totalCost} CO</span>
            </div>
        </div>`;

    contentDiv.innerHTML = html;
    displayModal('cost-breakdown-modal');
};

export { editFighter, refreshModalDataFromWarband, removeSkill, showCostBreakdownModal };
