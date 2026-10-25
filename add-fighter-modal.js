import { MASTER_EQUIPMENT_LIST, RACIAL_MAXIMUMS, WARBANDS, DRAMATIS_PERSONAE, SPECIAL_RULES_DETAILS, SKILLS, MASTER_INJURY_LIST } from './data/index.js';
import { MAGIC } from './data/magic.js';
import { renderMagicSelection, getSelectedSpells, saveSpellsToFighter, getMagicGroupForFighter, getSpellsForGroup, getStartingSpells } from './spell-management.js';
import { STATS_FIELDS, HERO_XP_THRESHOLDS, STANDARD_XP_THRESHOLDS } from './config.js';
import { getWarbandData, calculateWarbandRating, calculateEquipmentCost, countItemInStorage, calculateArmorSave, showMessage, displayModal, hideModal, showConfirmationModal, showEditorView, showNewWarbandModal, saveHouseRuleState, handleHouseRuleChange, checkGroupRetrievalConstraint, generateUUID } from './utility.js'; // Updated import
import { renderHeroXPBar, renderXPBar, renderFighterXPBar } from './advancement.js';
import { renderWarbandList, showListView, renderWarbandEditor, toggleGroupSize, updateGroupSizeDisplay, renderRacialMaximums, renderStatInputs, renderRaceOptions, populateWarbandTypes, populateWarriorChoices, updateFighterDataFromSelection, populateDramatisPersonaeChoices, updateFighterDataFromDramatisPersonaeSelection, populateHiredSwordChoices, updateFighterDataFromHiredSwordSelection, populateVehicleChoices, updateFighterDataFromVehicleSelection, showInjurySelectionModal, renderSelectedInjuries, addInjury, removeInjury, toggleExperienceVisibility, toggleSkillsLayout } from './ui.js';
import { renderEquipmentSelector, renderEquipmentOptions, renderSelectedEquipment, updateStatModifiers, showAddToStorageModal, updateSellPrice, renderStorageEquipmentOptions, showSellFromStorageModal, showRetrieveModal, renderArmorSave, addEquipment, removeEquipment } from './equipment-management.js';
import { useLocalStorage, userId, currentWarband, warbands, tempItemToRemove, tempItemToRetrieve, tempItemToAdd, currentFighterBaseStats, setUseLocalStorage, setUserId, setCurrentWarband, setWarbands, setTempItemToRemove, setTempItemToRetrieve, setTempItemToAdd, setCurrentFighterBaseStats, setIsShieldMeleeIgnored, setAvailableSkillCategories, setBaseSkillCategories } from './state.js';

/** Parses the allowed field to get the maximum number of fighters allowed */
const parseAllowed = (allowed) => {
    if (!allowed || allowed === "Any number") return Infinity;
    if (allowed.includes("only")) return 1;
    if (allowed.includes("-")) {
        const parts = allowed.split("-");
        return parseInt(parts[1]) || 0;
    }
    return parseInt(allowed) || 0;
};

/** Creates a new fighter with validation and purchase logic */
const createNewFighter = async (fighterId, name, role, warriorChoice, race, groupSize, stats, equipment, skills, specialRules, currentXp, fighterBaseCost, newEquipmentCostPerFighter, newTotalGroupCost, saveWarband) => {
    // Warrior type limits check
    if (warriorChoice) {
        const warbandData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === currentWarband.type);
        if (warbandData) {
            const warriorData = warbandData.data.warriors.find(w => w.name === warriorChoice);
            if (warriorData && warriorData.allowed) {
                const maxAllowed = parseAllowed(warriorData.allowed);
                if (maxAllowed !== Infinity) {
                    let currentCount = currentWarband.members.filter(m => m.name === warriorChoice).length;
                    if (currentCount >= maxAllowed) {
                        showMessage(`Cannot add ${warriorChoice}; the warband already has the maximum allowed (${maxAllowed}).`, 'error');
                        return false; // Indicate failure
                    }
                }
            }
        }
    }

    // Hero limit validation
    if (role === 'Hero') {
        const heroCount = currentWarband.members.filter(m => m.type === 'Hero').length;
        if (heroCount >= 6) {
            showMessage("Cannot add a new hero; the warband already has 6 heroes.", 'error');
            return false;
        }
    }

    // Purchase
    if (currentWarband.gc_treasury < newTotalGroupCost) {
        showMessage(`Coronas de Oro insuficientes. La compra requiere ${newTotalGroupCost} CO (para ${groupSize} miniaturas), pero la tesorería solo dispone de ${currentWarband.gc_treasury} CO.`, 'error');
        return false;
    }
    currentWarband.gc_treasury -= newTotalGroupCost;

    // Handle Pit Fighter Troll Slayer special skills
    let finalSkills = skills;
    if (warriorChoice === "Pit Fighter Troll Slayer") {
        const specialSkills = [811, 812, 813]; // Ferocious Charge, Monster Slayer, Berserker
        const skillObjects = specialSkills.map(id => SKILLS.find(s => s.id === id)).filter(Boolean);
        const skillNames = skillObjects.map(s => s.name);
        
        // Add special skills to skills array if not already present
        skillNames.forEach(skillName => {
            if (!finalSkills.includes(skillName)) {
                finalSkills.push(skillName);
            }
        });
    }

    // Auto-assign Pit Fighter skill for Pit Fighters warband
    if (currentWarband.type === 'Pit Fighters') {
        const pitFighterSkill = SKILLS.find(s => s.id === 402); // Pit Fighter skill
        if (pitFighterSkill && !finalSkills.includes(pitFighterSkill.name)) {
            finalSkills.push(pitFighterSkill.name);
        }
    }

    // Apt Revitalist: if any warband member has the skill, remove "Do not gain experience" from new Zombie(MH) fighters
    if (race === 'Zombie(MH)' && specialRules) {
        const aptRevitalistSkill = SKILLS.find(s => s.id === 912);
        if (aptRevitalistSkill && currentWarband.members.some(m =>
            Array.isArray(m.skills) && m.skills.includes(aptRevitalistSkill.name)
        )) {
            const rulesArray = specialRules.split(';').map(r => r.trim()).filter(r => r);
            const filtered = rulesArray.filter(r => r.toLowerCase() !== 'do not gain experience');
            specialRules = filtered.join('; ') || undefined;
        }
    }

    // Auto-assign starting spells from warrior data
    const warriorData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === currentWarband.type)?.data?.warriors?.find(w => w.name === warriorChoice);
    if (warriorData) {
        const startingSpells = getStartingSpells(warriorData);
        // Note: Starting spells will be handled by renderMagicSelection, not added to finalSkills
    }

    // Construct new fighter data
    const chosenMagicLore = document.getElementById('f-chosen-magic-lore').value || null;
    
    // Store the original hired sword/dramatis personae name for data lookups after rename
    let originalName = null;
    if (role === 'Hired Sword') {
        const hiredSwordSelect = document.getElementById('f-hired-sword-choice');
        originalName = hiredSwordSelect.value;
    } else if (role === 'Dramatis Personae') {
        const dramatisPersonaeSelect = document.getElementById('f-dramatis-personae-choice');
        originalName = dramatisPersonaeSelect.value;
    }
    
    const newFighterData = {
        id: fighterId || generateUUID(),
        name,
        type: role,
        group_size: groupSize,
        race: race,
        cost: fighterBaseCost,
        xp: currentXp,
        starting_xp: currentXp,
        stats,
        equipment,
        skills: finalSkills,
        injuries: [],
        special_rules: specialRules || undefined,
        base_stats: stats,
        advancements: [],
        chosen_magic_lore: chosenMagicLore,
        originalName: originalName // Store original hired sword type
    };

    currentWarband.members.push(newFighterData);
    showMessage(`¡${name} reclutado (${groupSize} miniaturas) por ${newTotalGroupCost} CO!`);
    await saveWarband();
    return true;
};

/** Opens the modal to add a new fighter */
const showNewFighterModal = () => {
    // Check if a warband is loaded
    if (!currentWarband) {
        showMessage("Por favor, carga una banda antes de añadir guerreros.", 'error');
        return;
    }
    
    document.getElementById('fighter-modal-title').textContent = 'Añadir Nuevo Guerrero';
    document.getElementById('fighter-id').value = '';
    document.getElementById('delete-fighter-btn').classList.add('hidden');
    document.getElementById('cost-breakdown-btn').classList.add('hidden');
    
    // Reset Notes
    document.getElementById('f-notes').value = '';
    document.getElementById('f-notes-wrapper').classList.add('hidden');
    const notesBtn = document.getElementById('f-notes-btn');
    if (notesBtn) {
        notesBtn.classList.remove('text-mordheim-gold');
        notesBtn.classList.add('text-slate-400');
    }

    document.getElementById('f-cost-wrapper').classList.remove('hidden');
    document.getElementById('f-original-equipment-cost').value = 0; // Reset original cost for new fighter
    
    // Reset mobile collapsible Fighter Identity section (not used in add mode)
    const identityToggleBtn = document.getElementById('fighter-identity-toggle-btn');
    const identityContent = document.getElementById('fighter-identity-content');
    if (identityToggleBtn) identityToggleBtn.classList.add('hidden');
    if (identityContent) {
        identityContent.style.display = '';
    }
    
    // Reset upkeep cost
    document.getElementById('f-upkeep-wrapper').classList.add('hidden');
    document.getElementById('f-upkeep-cost').textContent = '0';

    // Default stats for a Human Henchman
    const defaultStats = { M: 4, WS: 3, BS: 3, S: 3, T: 3, W: 1, I: 3, A: 1, Ld: 7 };
    setCurrentFighterBaseStats({ ...defaultStats });

    document.getElementById('f-name').value = '';
    document.getElementById('f-type').value = 'Henchman'; // Default role
    document.getElementById('f-group-size').value = 1; // Default group size for new Henchman
    document.getElementById('f-group-size').readOnly = false;
    document.getElementById('f-group-size').classList.remove('opacity-70', 'cursor-not-allowed');

    // Determine default race based on warband's race, unless it's 'Mix'
    let warbandDataRace = null;
    let warbandRace = null;
    
    if (currentWarband && currentWarband.type) {
        warbandDataRace = WARBANDS.flatMap(g => g.warbands).find(w => w.name === currentWarband.type);
        warbandRace = warbandDataRace?.data?.Race;
    }
    
    let defaultRace = 'Human';
    let availableRaces = null;

    if (warbandRace && (warbandRace === 'Mix' || warbandRace === 'Mixed')) {
        // For mixed warbands, collect unique races from warriors
        if (warbandDataRace && warbandDataRace.data && warbandDataRace.data.warriors) {
            const uniqueRaces = [...new Set(warbandDataRace.data.warriors.map(w => w.race).filter(Boolean))].sort();
            availableRaces = uniqueRaces;
            defaultRace = uniqueRaces.includes('Human') ? 'Human' : (uniqueRaces[0] || 'Human');
        }
    } else if (warbandRace) {
        defaultRace = warbandRace;
        availableRaces = [warbandRace];
    }

    document.getElementById('f-race').value = defaultRace;
    // Ensure race dropdown is visible for new fighters (reset from Carnival logic)
    document.querySelector('label[for="f-race"]').classList.remove('hidden');
    document.getElementById('f-race').classList.remove('hidden');
    document.getElementById('f-cost').value = 35;
    document.getElementById('f-xp').value = 0;
    document.getElementById('f-skills-hidden').value = '[]';
    document.getElementById('f-skills').textContent = 'Ninguna';
    document.getElementById('f-injuries-json').value = '[]';
    document.getElementById('warrior-rules-display').textContent = 'Ninguna';
    document.getElementById('f-special-rules').value = '';
    document.getElementById('f-chosen-magic-lore').value = '';

    // Reset cost and upkeep labels to default
    document.getElementById('f-cost-label').textContent = 'Coste (CO, por guerrero)';
    document.getElementById('f-upkeep-label').textContent = 'Coste de Mantenimiento (CO por batalla)';

    // Clear any leftover magic spell checkboxes from previous modal sessions
    document.getElementById('magic-spells-container').innerHTML = '';

    // Initialize leader checkbox (hidden by default)
    document.getElementById('f-is-leader').checked = false;
    document.getElementById('leader-checkbox-wrapper').classList.add('hidden');

    // Render stat inputs and racial maximums
    renderStatInputs(defaultStats);
    renderRaceOptions(defaultRace, availableRaces); // Set default race dropdown with filtered races if mixed
    
    // Initialize the layout to vertical (default for Henchman/Hero roles)
    // toggleSkillsLayout([], ""); // Removed - using default vertical layout
    
    toggleGroupSize(); // Show group size for Henchman and update button state
    renderFighterXPBar(); // Render the XP bar for the modal
    renderRacialMaximums();

    // Initialize equipment selector with Dagger(Free) unless starting equipment is "None" or fighter is a Vehicle
    const warbandData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === currentWarband.type);
    const warriorChoice = document.getElementById('f-warrior-choice').value;
    const warrior = warbandData?.data?.warriors.find(w => w.name === warriorChoice);
    const startingEquipment = warrior?.starting_equipment || [];
    const currentRole = document.getElementById('f-type').value;

    let initialEquipment = [];
    if (!startingEquipment.includes("None") && currentRole !== 'Vehicle') {
        // Normal logic for other warriors
        const daggerItem = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Dagger');
        if (daggerItem) {
            initialEquipment = [{id: daggerItem.id, cost: 0}];
        }
    }

    // Initialize base skill categories for new fighter (empty - new fighters have no base categories yet)
    setBaseSkillCategories([]);

    // Clear any previous skill access override
    const overrideInput = document.getElementById('f-skill-categories-override-json');
    if (overrideInput) overrideInput.value = '';

    renderEquipmentSelector(initialEquipment);

    renderArmorSave(); // Calculate for default equipment (Dagger)
    updateStatModifiers();
    renderSelectedInjuries(); // Render the injuries list

    // Enable fields for new fighter modal
    document.getElementById('f-type').disabled = false;
    document.getElementById('f-race').disabled = false;
    document.getElementById('f-warrior-choice').disabled = false;
    document.getElementById('f-vehicle-choice').disabled = false;
    document.getElementById('f-hired-sword-choice').disabled = false;
    document.getElementById('f-dramatis-personae-choice').disabled = false;

    populateWarriorChoices('Henchman');
    populateDramatisPersonaeChoices();
    populateHiredSwordChoices(); // Populate hired sword choices
    populateVehicleChoices(); // Populate vehicle choices

    // Hide trapper skill selection if it exists from previous modal
    const trapperSkillSelectionWrapper = document.getElementById('trapper-skill-selection-wrapper');
    if (trapperSkillSelectionWrapper) {
        trapperSkillSelectionWrapper.classList.add('hidden');
    }
    const trapperSkillSelect = document.getElementById('f-trapper-skill-choice');
    if (trapperSkillSelect) {
        trapperSkillSelect.value = '';
    }

    // Hide packmaster beast handling selection if it exists from previous modal
    const packmasterBeastHandlingSelectionWrapper = document.getElementById('packmaster-beast-handling-selection-wrapper');
    if (packmasterBeastHandlingSelectionWrapper) {
        packmasterBeastHandlingSelectionWrapper.classList.add('hidden');
    }
    const packmasterBeastHandlingSelect = document.getElementById('f-packmaster-beast-handling-choice');
    if (packmasterBeastHandlingSelect) {
        packmasterBeastHandlingSelect.value = '';
    }

    // Render magic selection if applicable
    const warriorData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === currentWarband.type)?.data?.warriors?.find(w => w.name === warriorChoice);
    const startingSpells = warriorData ? getStartingSpells(warriorData) : [];
    renderMagicSelection({ special_rules: '' }, startingSpells); // New fighter, no special rules yet

    // Add event listener for role change to show/hide leader checkbox
    document.getElementById('f-type').addEventListener('change', (e) => {
        const role = e.target.value;
        const leaderWrapper = document.getElementById('leader-checkbox-wrapper');
        if (role === 'Hero') {
            leaderWrapper.classList.remove('hidden');
        } else {
            leaderWrapper.classList.add('hidden');
            document.getElementById('f-is-leader').checked = false;
        }
        
        // Re-enable fields that may have been disabled by Hired Sword/Dramatis Personae/Vehicle selection
        ['f-cost', 'f-xp', 'f-skills', 'f-injuries', 'f-race'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.disabled = false;
        });
        STATS_FIELDS.forEach(stat => {
            const element = document.getElementById(`stat-${stat}`);
            if (element) element.disabled = false;
        });
        const equipmentCategorySelectReEnable = document.getElementById('equipment-category-select');
        if (equipmentCategorySelectReEnable) equipmentCategorySelectReEnable.disabled = false;
        
        // Hide upkeep cost when role changes
        document.getElementById('f-upkeep-wrapper').classList.add('hidden');
        document.getElementById('f-upkeep-cost').textContent = '0';
        
        // Hide equipment selection dropdown when role changes
        document.getElementById('hired-sword-equipment-selection-wrapper').classList.add('hidden');
    });

    // Add event listener for hired sword selection
    document.getElementById('f-hired-sword-choice').addEventListener('change', updateFighterDataFromHiredSwordSelection);
    
    // Add event listener for warrior selection
    document.getElementById('f-warrior-choice').addEventListener('change', () => {
        // Hide equipment selection dropdown when warrior choice changes
        document.getElementById('hired-sword-equipment-selection-wrapper').classList.add('hidden');
        updateFighterDataFromSelection();
    });

    displayModal('fighter-modal'); // Updated call

    // Disable the 'Hero' option if the warband is full
    const heroCount = currentWarband.members.filter(member => member.type === 'Hero').length;
    const heroOption = document.querySelector('#f-type option[value="Hero"]');
    if (heroOption) {
        if (heroCount >= 6) {
            heroOption.disabled = true;
            showMessage("Hero limit reached. You can only add non-hero fighters.", 'info');
        } else {
            heroOption.disabled = false;
        }
    }
};

export { showNewFighterModal, createNewFighter, parseAllowed };
