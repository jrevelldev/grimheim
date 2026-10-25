import { showNewFighterModal, createNewFighter } from './add-fighter-modal.js';
import { editFighter } from './edit-fighter-modal.js';
import { initHenchmenGroupMgmt, showGroupManageModal, confirmReduceGroupSize, showAddHenchmenModal, addHenchmenToGroup, updateAddHenchmenTotalCost } from './Henchmen_Group_Mgmt/henchmen-group-mgmt.js';
import { MASTER_EQUIPMENT_LIST, RACIAL_MAXIMUMS, WARBANDS, DRAMATIS_PERSONAE, SPECIAL_RULES_DETAILS, SKILLS, MASTER_INJURY_LIST } from './data/index.js';
import { findSkillForWarbandCI } from './skill-lookup.js';
import { MAGIC } from './data/magic.js';
import { renderMagicSelection, getSelectedSpells, saveSpellsToFighter, getMagicGroupForFighter, getSpellsForGroup, checkFighterHasMagicRule } from './spell-management.js';
import { STATS_FIELDS, HERO_XP_THRESHOLDS, STANDARD_XP_THRESHOLDS } from './config.js';
import { getWarbandData, calculateWarbandRating, calculateEquipmentCost, adjustEquipmentCosts, countItemInStorage, calculateArmorSave, showMessage, displayModal, hideModal, showConfirmationModal, showEditorView, showNewWarbandModal, saveHouseRuleState, handleHouseRuleChange, checkGroupRetrievalConstraint, parseCostString, generateUUID, normalizeEquipment, isV2Warband, serializeEquipment } from './utility.js'; 
import { renderHeroXPBar, renderXPBar } from './advancement.js';
import { renderWarbandList, showListView, renderWarbandEditor, toggleGroupSize, updateGroupSizeDisplay, renderRacialMaximums, renderStatInputs, renderRaceOptions, populateWarbandTypes, populateWarriorChoices, updateFighterDataFromSelection, populateDramatisPersonaeChoices, updateFighterDataFromDramatisPersonaeSelection, populateHiredSwordChoices, updateFighterDataFromHiredSwordSelection, populateVehicleChoices, updateFighterDataFromVehicleSelection, showInjurySelectionModal, renderSelectedInjuries, addInjury, removeInjury, toggleExperienceVisibility, toggleSkillsLayout, showSkillOverrideModal, finalizeHiredSwordCost, showStatsOverrideModal, submitStatsOverride, showSkillAccessOverrideModal, submitSkillAccessOverride, resetSkillAccessOverride } from './ui.js';
import { renderEquipmentSelector, renderEquipmentOptions, renderSelectedEquipment, updateStatModifiers, showAddToStorageModal, updateSellPrice, renderStorageEquipmentOptions, showSellFromStorageModal, showRetrieveModal, renderArmorSave, addEquipment, removeEquipment, removeSkillsFromEquipment, removeSpecialRulesFromEquipment } from './equipment-management.js';
import { applyDwarfTreasureHuntersEquipmentRules } from './equiprules/dwarf-treasure-hunters.js';
import { applyMountStats, validateMountEquipmentRules } from './equiprules/mounts.js';
import { applySistersOfSigmarEquipmentRules } from './equiprules/sisters-of-sigmar.js';
import { validateProfanePleasuresMutations } from './equiprules/profane-pleasures.js';
import { handleChosenOfChaosSkillChange } from './equiprules/marauders-of-chaos.js';
import { recordEquipmentPurchase, recordEquipmentSale, recordHireFee, recordHireFeeTreasure, linkEquipmentToHire, recordFighterRefund } from './Treasury/ledger.js';
import { useLocalStorage, userId, currentWarband, warbands, tempItemToRemove, tempItemToRetrieve, tempItemToAdd, tempHiredSwordToAdd, currentFighterBaseStats, currentFighterMultiStats, setUseLocalStorage, setUserId, setCurrentWarband, setWarbands, setTempItemToRemove, setTempItemToRetrieve, setTempItemToAdd, setTempHiredSwordToAdd, setCurrentFighterBaseStats, setCurrentFighterMultiStats, setIsShieldMeleeIgnored, setAvailableSkillCategories, getAvailableSkillCategories, isLuckyItemsLimited, isIgnoreRacialMaximumsActive, setRestrictedSkillCategories } from './state.js';

// --- Fighter Management (CRUD) ---

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

/** Saves the granted skill categories to the fighter data */
const saveGrantedSkillCategories = (fighterId) => {
    const grantedCategories = getAvailableSkillCategories();
    if (grantedCategories.length > 0) {
        // Store granted categories in a hidden input or data attribute for persistence
        const grantedCategoriesInput = document.getElementById('f-granted-skill-categories');
        if (grantedCategoriesInput) {
            grantedCategoriesInput.value = JSON.stringify(grantedCategories);
        }
    }
};

/** Restores the granted skill categories from fighter data */
const restoreGrantedSkillCategories = (fighter) => {
    // Get granted and restricted categories from equipment
    const grantedCategories = [];
    const restrictedCategories = [];
    
    if (fighter && fighter.equipment) {
        fighter.equipment.forEach(item => {
            const masterItems = MASTER_EQUIPMENT_LIST.filter(i => i.name === item.name);
            let masterItem = null;
            if (masterItems.length > 1) {
                if (item.name === "Mark of Arkhar the Dog") {
                    masterItem = masterItems.find(i => i.id === 433) || masterItems[0];
                } else {
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
            if (masterItem && masterItem.restrictSkillCat && Array.isArray(masterItem.restrictSkillCat)) {
                masterItem.restrictSkillCat.forEach(category => {
                    if (!restrictedCategories.includes(category)) {
                        restrictedCategories.push(category);
                    }
                });
            }
        });
    }
    
    // Set the global state
    setAvailableSkillCategories(grantedCategories);
    setRestrictedSkillCategories(restrictedCategories);
};

/**
 * Builds and renders the equipment changes confirmation modal content.
 * Each row has an undo button and editable gold values.
 * @returns {boolean} true if there are changes to show, false if modal was closed
 */
const buildEquipmentChangesModal = () => {
    const fighterModal = document.getElementById('fighter-modal');
    const groupSize = parseInt(document.getElementById('f-group-size').value) || 1;
    let pendingPurchases = [];
    let pendingSells = [];
    let pendingStores = [];
    try { pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases || '[]'); } catch (e) {}
    try { pendingSells = JSON.parse(fighterModal.dataset.pendingSells || '[]'); } catch (e) {}
    try { pendingStores = JSON.parse(fighterModal.dataset.pendingStores || '[]'); } catch (e) {}

    const hasChanges = pendingPurchases.length > 0 || pendingSells.length > 0 || pendingStores.length > 0;

    if (!hasChanges) {
        hideModal('equipment-changes-modal');
        return false;
    }

    let contentHtml = '';

    // Purchased items section
    if (pendingPurchases.length > 0) {
        contentHtml += `<div class="bg-slate-800 p-3 rounded-lg">
            <h4 class="text-sm font-semibold text-green-400 mb-2"><i class="fas fa-plus-circle mr-1"></i>Equipment Purchased</h4>`;
        pendingPurchases.forEach((p, i) => {
            const totalItemCost = Math.round(p.cost * groupSize);
            contentHtml += `<div class="flex justify-between items-center text-sm py-1">
                <div class="flex items-center gap-2">
                    <button class="undo-change-btn text-slate-500 hover:text-red-400 transition" data-action="purchase" data-index="${i}" title="Undo purchase"><i class="fas fa-times-circle pointer-events-none"></i></button>
                    <span class="text-slate-300">${groupSize > 1 ? groupSize + 'x ' : ''}${p.name}</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="text-red-400 text-xs">-</span>
                    <input type="number" class="edit-cost-input w-16 bg-slate-700 border border-slate-600 rounded px-2 py-0.5 text-red-400 text-right text-sm focus:border-mordheim-gold focus:outline-none" value="${totalItemCost}" min="0" data-action="purchase" data-index="${i}" />
                    <span class="text-red-400 text-xs">GC</span>
                </div>
            </div>`;
        });
        contentHtml += `</div>`;
    }

    // Sold items section
    if (pendingSells.length > 0) {
        contentHtml += `<div class="bg-slate-800 p-3 rounded-lg">
            <h4 class="text-sm font-semibold text-yellow-400 mb-2"><i class="fas fa-coins mr-1"></i>Equipment Sold</h4>`;
        pendingSells.forEach((s, i) => {
            contentHtml += `<div class="flex justify-between items-center text-sm py-1">
                <div class="flex items-center gap-2">
                    <button class="undo-change-btn text-slate-500 hover:text-red-400 transition" data-action="sell" data-index="${i}" title="Undo sale"><i class="fas fa-times-circle pointer-events-none"></i></button>
                    <span class="text-slate-300">${s.groupSize > 1 ? s.groupSize + 'x ' : ''}${s.itemName}</span>
                </div>
                <div class="flex items-center gap-1">
                    <span class="text-green-400 text-xs">+</span>
                    <input type="number" class="edit-cost-input w-16 bg-slate-700 border border-slate-600 rounded px-2 py-0.5 text-green-400 text-right text-sm focus:border-mordheim-gold focus:outline-none" value="${s.sellPrice}" min="0" data-action="sell" data-index="${i}" />
                    <span class="text-green-400 text-xs">GC</span>
                </div>
            </div>`;
        });
        contentHtml += `</div>`;
    }

    // Stored items section
    if (pendingStores.length > 0) {
        contentHtml += `<div class="bg-slate-800 p-3 rounded-lg">
            <h4 class="text-sm font-semibold text-blue-400 mb-2"><i class="fas fa-warehouse mr-1"></i>Equipment Stored</h4>`;
        pendingStores.forEach((s, i) => {
            contentHtml += `<div class="flex justify-between items-center text-sm py-1">
                <div class="flex items-center gap-2">
                    <button class="undo-change-btn text-slate-500 hover:text-red-400 transition" data-action="store" data-index="${i}" title="Undo store"><i class="fas fa-times-circle pointer-events-none"></i></button>
                    <span class="text-slate-300">${s.groupSize > 1 ? s.groupSize + 'x ' : ''}${s.name}</span>
                </div>
                <span class="text-slate-400">To Storage</span>
            </div>`;
        });
        contentHtml += `</div>`;
    }

    document.getElementById('equipment-changes-content').innerHTML = contentHtml;
    updateEquipmentChangesSummary();
    return true;
};

/**
 * Updates the equipment changes summary section with current totals.
 */
const updateEquipmentChangesSummary = () => {
    const fighterModal = document.getElementById('fighter-modal');
    const groupSize = parseInt(document.getElementById('f-group-size').value) || 1;
    let pendingPurchases = [];
    try { pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases || '[]'); } catch (e) {}
    const pendingSellGc = parseInt(fighterModal.dataset.pendingSellGc || 0);

    const totalPurchaseCost = pendingPurchases.reduce((sum, p) => sum + Math.round(p.cost * groupSize), 0);
    const totalSellProceeds = pendingSellGc;
    const netGcChange = totalSellProceeds - totalPurchaseCost;

    const netColor = netGcChange >= 0 ? 'text-green-400' : 'text-red-400';
    const netSign = netGcChange >= 0 ? '+' : '';
    document.getElementById('equipment-changes-summary').innerHTML = `
        <div class="flex justify-between items-center">
            <span class="text-slate-300 font-semibold">Net Treasury Change</span>
            <span class="${netColor} font-bold text-lg">${netSign}${netGcChange} GC</span>
        </div>
        <div class="text-xs text-slate-400 mt-1">Current Treasury: ${currentWarband.gc_treasury} GC → ${currentWarband.gc_treasury + netGcChange} GC</div>
    `;
};

/** Saves a new or edited fighter to the warband data structure */
const saveFighter = async function(gcDeltaFromSale = 0, isCasualty = false, saveWarband, confirmed = false) { // Added isCasualty flag, saveWarband dependency, and confirmed flag
    const initialGc = currentWarband ? currentWarband.gc_treasury : 0;
    const initialTreasure = currentWarband ? currentWarband.treasure : 0;

    // Handle pending henchmen additions
    const fighterModal = document.getElementById('fighter-modal');
    const pendingGroupSizeIncrease = parseInt(fighterModal.dataset.pendingGroupSizeIncrease || 0);
    const pendingCostDeduction = parseInt(fighterModal.dataset.pendingCostDeduction || 0);
    
    if (pendingGroupSizeIncrease > 0) {
        // Apply the pending changes
        const fighterId = document.getElementById('fighter-id').value;
        const fighter = currentWarband.members.find(f => f.id === fighterId);
        if (fighter) {
            // Deduct the cost from treasury
            currentWarband.gc_treasury -= pendingCostDeduction;
            
            // Update the fighter's group size
            const currentSize = fighter.group_size || 1;
            fighter.group_size = currentSize + pendingGroupSizeIncrease;
            
            // Update the modal input to match the new size
            document.getElementById('f-group-size').value = fighter.group_size;

            // Record the addition in the Ledger
            if (pendingCostDeduction > 0) {
                await recordHireFee(
                    fighter.name,
                    pendingCostDeduction,
                    'Henchman',
                    { group_size_added: pendingGroupSizeIncrease, new_group_size: fighter.group_size }
                );
            }
        }
        
        // Clear pending changes
        delete fighterModal.dataset.pendingGroupSizeIncrease;
        delete fighterModal.dataset.pendingCostDeduction;
    }

    const fighterId = document.getElementById('fighter-id').value;
    const name = document.getElementById('f-name').value.trim();
    if (!name) {
        showMessage("Fighter name is required.", 'error');
        return;
    }
    const notes = document.getElementById('f-notes').value.trim();

    const role = document.getElementById('f-type').value.trim();
    const warriorChoice = document.getElementById('f-warrior-choice').value.trim();

    if (role === 'Hero' && !warriorChoice) {
        showMessage("You must select a Warrior Choice for a Hero.", 'error');
        return;
    }

    if (role === 'Henchman' && !warriorChoice) {
        showMessage("You must select a Warrior Choice for a Henchman.", 'error');
        return;
    }

    // Check warrior type limits
    if (warriorChoice) {
        const warbandData = WARBANDS.flatMap(g => g.warbands).find(w => w.name === currentWarband.type);
        if (warbandData) {
            const warriorData = warbandData.data.warriors.find(w => w.name === warriorChoice);
            if (warriorData && warriorData.allowed) {
                const maxAllowed = parseAllowed(warriorData.allowed);
                if (maxAllowed !== Infinity) {
                    let currentCount = currentWarband.members.filter(m => (m.warrior_choice || m.name) === warriorChoice).length;

                    const existingFighter = currentWarband.members.find(m => m.id === fighterId);
                    if (existingFighter && (existingFighter.warrior_choice || existingFighter.name) !== warriorChoice) {
                        // Changing to a different warrior type
                        if (currentCount >= maxAllowed) {
                            showMessage(`Cannot change to ${warriorChoice}; the warband already has the maximum allowed (${maxAllowed}).`, 'error');
                            return;
                        }
                    }
                    // If changing within the same type or staying the same, allow it
                }
            }
        }
    }

    // Special check for Lustrian Reavers: Jungle Shadow and Jungle Shadow Wizard are mutually exclusive
    if (currentWarband.type === 'Lustrian Reavers') {
        if (warriorChoice === 'Jungle Shadow') {
            const hasWizard = currentWarband.members.some(m => (m.warrior_choice || m.name) === 'Jungle Shadow Wizard');
            if (hasWizard) {
                showMessage('Cannot add Jungle Shadow; the warband already has a Jungle Shadow Wizard. You may only have one or the other.', 'error');
                return;
            }
        } else if (warriorChoice === 'Jungle Shadow Wizard') {
            const hasShadow = currentWarband.members.some(m => (m.warrior_choice || m.name) === 'Jungle Shadow');
            if (hasShadow) {
                showMessage('Cannot add Jungle Shadow Wizard; the warband already has a Jungle Shadow. You may only have one or the other.', 'error');
                return;
            }
        }
    }

    // Hero limit validation
    if (role === 'Hero') {
        let heroCount = currentWarband.members.filter(m => m.type === 'Hero').length;

        const existingFighter = currentWarband.members.find(m => m.id === fighterId);
        if (existingFighter && existingFighter.type !== 'Hero' && heroCount >= 6) {
            showMessage("Cannot change this fighter to a Hero; the warband already has 6 heroes.", 'error');
            return;
        }
    }

    // Leader validation - only one Hero can be leader per warband
    if (role === 'Hero') {
        const isLeaderChecked = document.getElementById('f-is-leader').checked;
        if (isLeaderChecked) {
            const existingLeaders = currentWarband.members.filter(m =>
                m.type === 'Hero' &&
                m.id !== fighterId && // Exclude current fighter if editing
                m.special_rules &&
                m.special_rules.includes('Leader')
            );
            if (existingLeaders.length > 0) {
                showMessage("Cannot assign leader: another Hero is already the leader. Only one leader allowed per warband.", 'error');
                return;
            }
        }
    }
    const race = document.getElementById('f-race').value.trim();
    const groupSize = parseInt(document.getElementById('f-group-size').value) || 1;
    
    if (role === 'Henchman' && groupSize < 1) {
        showMessage("Henchman Group Size must be 1 or greater.", 'error');
        return;
    }
    if (groupSize < 1) {
         showMessage("Group Size cannot be less than 1.", 'error');
        return;
    }

    // 1. Use the stored base stats and check limits
    const stats = { ...currentFighterBaseStats };
    let exceedsMax = false;
    let exceedsHenchmanLimit = false;
    
    const maximums = RACIAL_MAXIMUMS[race] || {};
    const isNew = !fighterId;
    let originalBaseStats = {};

    if (!isNew) {
        const existingFighter = currentWarband.members.find(f => f.id === fighterId);
        originalBaseStats = existingFighter.base_stats || existingFighter.stats || {}; 
    }
    
    // 2. Iterate and check limits against the true base stats
    STATS_FIELDS.forEach(stat => {
        const val = stats[stat];

        // Racial Max Check
        if (!isIgnoreRacialMaximumsActive && maximums[stat] && typeof maximums[stat] === 'number' && val > maximums[stat]) {
            exceedsMax = true;
        }

        // CRITICAL: Henchman Advancement Check
        if (!isNew && role === 'Henchman') {
            const baseVal = parseInt(originalBaseStats[stat]) || 0;
            if (val > baseVal + 1) {
                exceedsHenchmanLimit = true;
            }
        }
    });

    if (exceedsHenchmanLimit) {
        showMessage("Henchman advancement limit exceeded: Henchmen can only increase any characteristic by +1 from their starting profile.", 'error');
        return; // Block save
    }
    
    if (exceedsMax) {
        // Warning message for the user, but allow save as this may be a deliberate override
        showMessage("Warning: Fighter stats exceed the maximums for their race!", 'error');
    }


    // Get structured equipment from hidden input
    let equipment;
    try {
        equipment = JSON.parse(document.getElementById('f-equipment-json').value || '[]');
    } catch (e) {
        console.error("Failed to parse equipment JSON:", e);
        equipment = [];
    }

    // Normalize equipment to handle both V1 and V2 formats
    equipment = equipment.map(item => normalizeEquipment(item));

    // Adjust equipment costs (e.g., first Dagger free)
    equipment = adjustEquipmentCosts(equipment);

    // Validate mount equipment rules
    const mountValidationError = validateMountEquipmentRules(equipment);
    if (mountValidationError) {
        showMessage(mountValidationError, 'error');
        return; // Block save
    }

    // Validate Court of the Profane Pleasures mutation rules
    // Skip validation if the Override Equipment Restrictions toggle is enabled
    const equipOverrideToggle = document.getElementById('equipment-override-toggle');
    const isEquipOverrideEnabled = equipOverrideToggle && equipOverrideToggle.checked;
    if (!isEquipOverrideEnabled) {
        const existingFighter = !isNew ? currentWarband.members.find(f => f.id === fighterId) : null;
        const originalEquipment = existingFighter ? (existingFighter.equipment || []).map(item => normalizeEquipment(item)) : [];
        const mutationValidationError = validateProfanePleasuresMutations(currentWarband, equipment, isNew, originalEquipment);
        if (mutationValidationError && !mutationValidationError.valid) {
            showMessage(mutationValidationError.message, 'error');
            return; // Block save
        }
    }

    // Initialize equipmentForCostCalculation
    let equipmentForCostCalculation = equipment;

    // Calculate costs (Per Fighter Cost)
    const fighterBaseCost = parseInt(document.getElementById('f-cost').value) || 0;
    const newEquipmentCostPerFighter = calculateEquipmentCost(equipmentForCostCalculation);
    
    // Calculate total group cost based on old/new configuration
    const newTotalGroupCost = (fighterBaseCost + newEquipmentCostPerFighter) * groupSize;

    // CRITICAL: Purchase/Refund Logic (Uses Total Group Cost Difference)
    if (isNew) {
        // Scenario 1: New Fighter Purchase (full cost)
        // Check if this is a treasure-based hire for Hired Swords/Dramatis Personae
        let isTreasureCost = false;
        let hireFeeAmount = 0;
        
        if (role === 'Hired Sword' || role === 'Dramatis Personae') {
            const hireFeeElement = document.getElementById('f-cost');
            const costType = hireFeeElement ? hireFeeElement.dataset.costType || 'GC' : 'GC';
            hireFeeAmount = hireFeeElement ? parseInt(hireFeeElement.value) || 0 : 0;
            isTreasureCost = (costType === 'Treasure');
        }
        
        // Calculate total cost excluding hire fee for treasure-based hires
        const equipmentCost = newEquipmentCostPerFighter * groupSize;
        let totalGoldCost = equipmentCost;
        let totalTreasureCost = 0;
        
        if (isTreasureCost) {
            totalTreasureCost = hireFeeAmount * groupSize;
        } else {
            totalGoldCost = newTotalGroupCost;
        }
        
        // Validate gold crowns
        if (currentWarband.gc_treasury < totalGoldCost) {
            showMessage(`Insufficient Gold Crowns. Purchase requires ${totalGoldCost} GC (for ${groupSize} models), but treasury only has ${currentWarband.gc_treasury} GC.`, 'error');
            return; // Block purchase
        }
        
        // Validate treasure if needed
        if (isTreasureCost && currentWarband.treasure < totalTreasureCost) {
            showMessage(`Insufficient Treasure. Purchase requires ${totalTreasureCost} Treasure (for ${groupSize} models), but treasury only has ${currentWarband.treasure} Treasure.`, 'error');
            return; // Block purchase
        }
        
        // Deduct costs
        currentWarband.gc_treasury -= totalGoldCost;
        if (isTreasureCost) {
            currentWarband.treasure -= totalTreasureCost;
        }
        
        let hireTransactionId = null;
        
        // Record base hiring cost for Heroes and Henchmen
        if (role === 'Hero' || role === 'Henchman') {
            const baseCost = fighterBaseCost;
            if (baseCost > 0) {
                hireTransactionId = await recordHireFee(name, baseCost * groupSize, role, { group_size: groupSize });
            }
        }
        
        // Record hire fee for Hired Swords and Dramatis Personae
        if (role === 'Hired Sword' || role === 'Dramatis Personae') {
            const hireFeeElement = document.getElementById('f-cost');
            const hireFee = hireFeeElement ? parseInt(hireFeeElement.value) || 0 : 0;
            const costType = hireFeeElement ? hireFeeElement.dataset.costType || 'GC' : 'GC';
            
            if (hireFee > 0) {
                if (costType === 'Treasure') {
                    // Use treasure-based hiring
                    hireTransactionId = await recordHireFeeTreasure(name, hireFee * groupSize, role, { group_size: groupSize });
                } else {
                    // Use regular gold-based hiring
                    hireTransactionId = await recordHireFee(name, hireFee * groupSize, role, { group_size: groupSize });
                }
            }
        }
        
        // Record equipment purchase transaction linked to hire
        if (newEquipmentCostPerFighter > 0 && hireTransactionId) {
            const equipmentTransactionId = await recordEquipmentPurchase(
                'Equipment for new fighter', 
                newEquipmentCostPerFighter, 
                groupSize, 
                hireTransactionId
            );
            
            // Link the equipment transaction to the hire transaction
            if (equipmentTransactionId) {
                await linkEquipmentToHire(equipmentTransactionId, hireTransactionId);
            }
        } else if (newEquipmentCostPerFighter > 0) {
            // Fallback for cases without hire fee (shouldn't normally happen)
            await recordEquipmentPurchase('Equipment for new fighter', newEquipmentCostPerFighter, groupSize);
        }
    } else {
        // Scenario 2: Existing Fighter Edit/Upgrade/Casualty
        // Safety check: if group size increased without going through the Manage flow, block save
        if (!isCasualty && pendingGroupSizeIncrease === 0) {
            const existingFighter = currentWarband.members.find(f => f.id === fighterId);
            if (existingFighter && groupSize > (existingFighter.group_size || 1)) {
                showMessage('Group size changes must be done through the Manage Group Size dialog.', 'error');
                return;
            }
        }

        // Read pending equipment change data from modal data attributes
        let pendingPurchases = [];
        let pendingSells = [];
        let pendingStores = [];
        try { pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases || '[]'); } catch (e) {}
        try { pendingSells = JSON.parse(fighterModal.dataset.pendingSells || '[]'); } catch (e) {}
        try { pendingStores = JSON.parse(fighterModal.dataset.pendingStores || '[]'); } catch (e) {}
        const pendingSellGc = parseInt(fighterModal.dataset.pendingSellGc || 0);
        const pendingRemovedCost = parseFloat(fighterModal.dataset.pendingRemovedCost || 0);

        const hasEquipmentChanges = pendingPurchases.length > 0 || pendingSells.length > 0 || pendingStores.length > 0;

        if (isCasualty) {
            // Rule: No refund for casualty. Clear all pending equipment actions.
            delete fighterModal.dataset.pendingPurchases;
            delete fighterModal.dataset.pendingSellGc;
            delete fighterModal.dataset.pendingSells;
            delete fighterModal.dataset.pendingStores;
            delete fighterModal.dataset.pendingRemovedCost;
        } else if (hasEquipmentChanges && !confirmed) {
            // Phase 1: Show confirmation modal with equipment change breakdown
            buildEquipmentChangesModal();
            displayModal('equipment-changes-modal');
            return;
        }

        // Phase 2: Apply equipment changes (runs when confirmed or no pending changes)
        if (hasEquipmentChanges && confirmed && !isCasualty) {
            // Calculate total purchase cost for the group
            const totalPurchaseCost = pendingPurchases.reduce((sum, p) => sum + (p.cost * groupSize), 0);
            const totalSellProceeds = pendingSellGc;
            const netGcChange = totalSellProceeds - totalPurchaseCost;

            // Validate treasury can afford the net cost
            if (netGcChange < 0 && currentWarband.gc_treasury < Math.abs(netGcChange)) {
                showMessage(`Insufficient Gold Crowns. Need ${Math.abs(netGcChange)} GC but treasury has ${currentWarband.gc_treasury} GC.`, 'error');
                return;
            }

            // Apply purchases (deduct from treasury)
            if (totalPurchaseCost > 0) {
                currentWarband.gc_treasury -= totalPurchaseCost;
                await recordEquipmentPurchase('Equipment purchase', totalPurchaseCost, 1);
            }

            // Apply sells (add to treasury)
            if (totalSellProceeds > 0) {
                currentWarband.gc_treasury += totalSellProceeds;
                for (const sell of pendingSells) {
                    await recordEquipmentSale(sell.itemName, sell.sellPrice / sell.groupSize, sell.groupSize);
                }
            }

            // Apply stores (move items to warband storage)
            if (pendingStores.length > 0) {
                if (!currentWarband.stored_equipment) {
                    currentWarband.stored_equipment = [];
                }
                for (const storeItem of pendingStores) {
                    const normalizedItem = normalizeEquipment({ name: storeItem.name, cost: storeItem.cost, rules: storeItem.rules });
                    const serialized = serializeEquipment(normalizedItem, isV2Warband(currentWarband));
                    for (let i = 0; i < storeItem.groupSize; i++) {
                        currentWarband.stored_equipment.push({ ...serialized });
                    }
                }
            }

            // Clear all pending data attributes
            delete fighterModal.dataset.pendingPurchases;
            delete fighterModal.dataset.pendingSellGc;
            delete fighterModal.dataset.pendingSells;
            delete fighterModal.dataset.pendingStores;
            delete fighterModal.dataset.pendingRemovedCost;
        }
    }


    // Parse skills from hidden JSON input
    let skills;
    try {
        skills = JSON.parse(document.getElementById('f-skills-hidden').value || '[]');
    } catch (e) {
        skills = [];
    }
    if (role === 'Henchman') {
        skills = []; // Henchmen never get skills.
    }

    // Special validation for Trapper requiring a skill
    if (currentWarband.type === "Ogre Hunting Party" && warriorChoice === "Trapper") {
        const trapperSkillSelect = document.getElementById('f-trapper-skill-choice');
        if (!trapperSkillSelect || trapperSkillSelect.value === '') {
            showMessage("You must select a starting skill for the Trapper.", 'error');
            return;
        }
        // Ensure the selected skill is in skills
        const selectedSkillId = trapperSkillSelect.value;
        const skillData = SKILLS.find(s => s.id === parseInt(selectedSkillId));
        if (skillData && !skills.includes(skillData.name)) {
            skills.push(skillData.name);
        }
    }

    // Auto-assign Pit Fighter skill for Pit Fighters warband
    if (currentWarband.type === 'Pit Fighters') {
        const pitFighterSkill = SKILLS.find(s => s.id === 402); // Pit Fighter skill
        if (pitFighterSkill && !skills.includes(pitFighterSkill.name)) {
            skills.push(pitFighterSkill.name);
        }
    }

    // Handle Chosen of Chaos skill race change for Marauders of Chaos warband
    if (currentWarband.type === 'Marauders of Chaos') {
        const raceChangeResult = handleChosenOfChaosSkillChange(skills, race);
        if (raceChangeResult.changed) {
            race = raceChangeResult.race;
            showMessage(raceChangeResult.reason, 'success');
        }
    }


    let injuries;
    try {
        injuries = JSON.parse(document.getElementById('f-injuries-json').value || '[]');
    } catch (e) {
        injuries = [];
    }

    // Get special rules early for spell handling and leader assignment
    let specialRules = document.getElementById('f-special-rules').value.trim();

    // Apt Revitalist: if any warband member has the skill, remove "Do not gain experience" from Zombie(MH) fighters
    if (race === 'Zombie(MH)' && specialRules) {
        const aptRevitalistSkill = SKILLS.find(s => s.id === 912);
        if (aptRevitalistSkill && currentWarband.members.some(m =>
            Array.isArray(m.skills) && m.skills.includes(aptRevitalistSkill.name)
        )) {
            specialRules = specialRules.split(';').map(r => r.trim()).filter(r => r)
                .filter(r => r.toLowerCase() !== 'do not gain experience')
                .join('; ');
        }
    }

    // Handle magic spells - ONLY for fighters that can use magic (Heroes, not Henchmen)
    let magicSpells = [];
    if (role !== 'Henchman' && checkFighterHasMagicRule({ special_rules: specialRules || '', skills })) {
        const selectedSpells = getSelectedSpells();
        const isV2Warband = currentWarband && currentWarband._isV2;
        const tempFighter = { skills, special_rules: specialRules || '' };
        saveSpellsToFighter(tempFighter, selectedSpells, false, isV2Warband); // Don't update DOM inputs
        skills = tempFighter.skills; // Update skills after spell handling
        
        // For V2 warbands, capture the magic spells separately
        if (isV2Warband) {
            magicSpells = tempFighter.magic || [];
        }
    }

    // 3. Construct the data object
    const currentXp = parseFloat(document.getElementById('f-xp').value) || 0;
    const existingFighter = fighterId ? currentWarband.members.find(f => f.id === fighterId) : null;

    // Handle leader assignment for Heroes
    if (role === 'Hero') {
        const isLeaderChecked = document.getElementById('f-is-leader').checked;
        const hasLeaderRule = specialRules.includes('Leader');

        if (isLeaderChecked && !hasLeaderRule) {
            // Add Leader rule
            specialRules = specialRules ? `${specialRules}; Leader` : 'Leader';
        } else if (!isLeaderChecked && hasLeaderRule) {
            // Remove Leader rule
            specialRules = specialRules.split(';').filter(rule => rule.trim() !== 'Leader').join('; ');
        }
    }

    // Get chosen magic lore
    const chosenMagicLore = document.getElementById('f-chosen-magic-lore').value || null;

    // Apply warband-specific equipment rules
    const isPreGame = currentWarband && currentWarband.pre_game !== false;
    equipmentForCostCalculation = applyDwarfTreasureHuntersEquipmentRules(currentWarband, equipment, isPreGame, specialRules);
    equipmentForCostCalculation = applySistersOfSigmarEquipmentRules(currentWarband, equipment, isNew, specialRules);

    // For Vehicles, use the multi-stat structure; for others, apply mount stats
    let finalStats;
    let finalBaseStats;
    if (role === 'Vehicle' && currentFighterMultiStats) {
        // Vehicles have multi-component stats (COACH, WHEEL, HORSE, etc.)
        finalStats = JSON.parse(JSON.stringify(currentFighterMultiStats)); // Deep copy
        finalBaseStats = finalStats; // For vehicles, base stats = the multi-stat structure
    } else if (currentFighterMultiStats) {
        // Mounted fighters or other multi-stat fighters: preserve currentFighterMultiStats (so overrides are kept!)
        finalStats = JSON.parse(JSON.stringify(currentFighterMultiStats)); // Deep copy
        finalBaseStats = isNew ? stats : originalBaseStats;
    } else {
        finalStats = stats;
        finalBaseStats = isNew ? stats : originalBaseStats;
    }

    const newFighterData = {
        id: fighterId || generateUUID(),
        name,
        type: role,
        group_size: groupSize, // NEW FIELD
        race: race, // Save the new race field
        cost: fighterBaseCost, // Stored as PER FIGHTER cost
        cost_type: (() => {
            if (existingFighter?.cost_type) return existingFighter.cost_type;
            const costEl = document.getElementById('f-cost');
            return (costEl && costEl.dataset.costType === 'Treasure') ? 'Treasure' : 'GC';
        })(),
        xp: currentXp,
        starting_xp: isNew ? currentXp : (existingFighter?.starting_xp ?? 0), // Store starting XP
        stats: finalStats,
        equipment: equipment.map(item => serializeEquipment(item, isV2Warband(currentWarband))),
        skills,
        injuries,
        special_rules: specialRules || undefined, // Store special rules
        base_stats: finalBaseStats,
        advancements: (existingFighter?.advancements || []),
        stats_override_history: existingFighter?.stats_override_history || [],
        chosen_magic_lore: chosenMagicLore,
        warrior_choice: warriorChoice, // Store the selected warrior type
        // Preserve originalName for Hired Swords and Dramatis Personae (used for data lookups after rename)
        originalName: (() => {
            if (existingFighter?.originalName) return existingFighter.originalName;
            if (role === 'Hired Sword') {
                return document.getElementById('f-hired-sword-choice')?.value || undefined;
            }
            if (role === 'Dramatis Personae') {
                return document.getElementById('f-dramatis-personae-choice')?.value || undefined;
            }
            return undefined;
        })(),
        // Preserve skill_categories for fighters promoted via "Lads got talent"
        skill_categories: existingFighter?.skill_categories || undefined,
        // Preserve skill_categories_override for manual skill access overrides
        skill_categories_override: (() => {
            const overrideInput = document.getElementById('f-skill-categories-override-json');
            if (overrideInput) {
                // If the input exists, use its value (empty = override was cleared/reset)
                if (overrideInput.value) {
                    try {
                        const parsed = JSON.parse(overrideInput.value);
                        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
                    } catch (e) {}
                }
                return undefined; // Explicitly cleared
            }
            return existingFighter?.skill_categories_override || undefined;
        })(),
        notes: notes || undefined,
        // V2 warbands: store magic spells separately from skills
        ...(isV2Warband(currentWarband) && { magic: magicSpells })
    };
    
    // Clear multi-stats after save
    if (role === 'Vehicle') {
        setCurrentFighterMultiStats(null);
    }


    let isUpdate = !isNew;
    if (isNew) {
        currentWarband.members.push(newFighterData);
        showMessage(`${name} recruited (${groupSize} models) for ${newTotalGroupCost} GC!`);
    } else {
        currentWarband.members = currentWarband.members.map(f =>
            f.id === fighterId ? newFighterData : f
        );
        
        if(isCasualty) {
             showMessage(`${name} group size reduced to ${groupSize} due to casualty. No refund issued.`, 'error');
        } else {
             const finalGc = currentWarband ? currentWarband.gc_treasury : 0;
             const finalTreasure = currentWarband ? currentWarband.treasure : 0;
             const treasuryChanged = (finalGc !== initialGc) || (finalTreasure !== initialTreasure);
             if (treasuryChanged) {
                 showMessage(`${name} updated! Treasury adjusted.`);
             } else {
                 showMessage(`${name} updated!`);
             }
        }
    }

    // Determine the actual fighter ID (for new fighters, it's the generated UUID)
    let actualFighterId;
    if (isNew) {
        actualFighterId = currentWarband.members[currentWarband.members.length - 1].id;
    } else {
        actualFighterId = fighterId;
    }

    // Check for leader rule in Court of the Profane Pleasures and Lustrian Reavers warbands
    if (['Court of the Profane Pleasures', 'Lustrian Reavers'].includes(currentWarband.type) && role === 'Hero') {
        const hasLeader = currentWarband.members.some(m => m.type === 'Hero' && m.special_rules && m.special_rules.includes('Leader'));
        if (!hasLeader) {
            showConfirmationModal(`No hero in the warband has the Leader rule. Would you like to add it to ${name}?`, async () => {
                const fighter = currentWarband.members.find(f => f.id === actualFighterId);
                if (fighter) {
                    if (!fighter.special_rules) {
                        fighter.special_rules = 'Leader';
                    } else {
                        fighter.special_rules += '; Leader';
                    }
                    await saveWarband();
                    showMessage(`Leader rule added to ${name}.`, 'success');
                }
            });
        }
    }

    // Save granted skill categories to fighter data
    saveGrantedSkillCategories(fighterId);

    hideModal('fighter-modal');
    // Also close the Gear quick-manage modal if this save originated from it
    const gearModal = document.getElementById('fighter-gear-modal');
    if (gearModal && gearModal.dataset.active === 'true') {
        delete gearModal.dataset.active;
        hideModal('fighter-gear-modal');
    }
    // saveWarband is passed as a dependency
    await saveWarband();
    
    // After saving, re-open the fighter modal if it was a casualty event, so the user can see the new size/continue editing
    if(isCasualty) {
        editFighter(fighterId, saveWarband);
    }
}

/** Deletes the currently edited fighter */
const deleteFighter = async (saveWarband) => {
     const fighterId = document.getElementById('fighter-id').value;
     const fighterName = document.getElementById('f-name').value;
     const isPreGame = currentWarband && currentWarband.pre_game !== false;

     // Set up the confirmation message
     document.getElementById('confirmation-message').textContent = `Are you sure you want to delete ${fighterName}?`;

     // Standard delete (no refund) callback
     const confirmBtn = document.getElementById('confirm-action-btn');
     confirmBtn.onclick = async () => {
         currentWarband.members = currentWarband.members.filter(f => f.id !== fighterId);
         hideModal('confirmation-modal');
         hideModal('fighter-modal');
         await saveWarband();
         showMessage(`${fighterName} has been removed from the roster.`);
     };

     // Show/hide refund button based on pre-game state
     const refundBtn = document.getElementById('refund-action-btn');
     if (isPreGame) {
         refundBtn.classList.remove('hidden');
         refundBtn.onclick = () => {
             hideModal('confirmation-modal');
             showRefundBreakdownModal(fighterId, fighterName, saveWarband);
         };
     } else {
         refundBtn.classList.add('hidden');
     }

     displayModal('confirmation-modal');
}

/** Shows the refund breakdown modal for a fighter being deleted in pre-game mode */
const showRefundBreakdownModal = (fighterId, fighterName, saveWarband) => {
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;

    const contentDiv = document.getElementById('refund-breakdown-content');
    const baseCost = fighter.cost || 0;
    const groupSize = fighter.group_size || 1;
    const isHenchman = fighter.type === 'Henchman';
    const costType = fighter.cost_type || 'GC';

    // Get adjusted equipment for cost calculation (same formula as showCostBreakdownModal)
    const equipment = adjustEquipmentCosts(fighter.equipment || []);

    // Build equipment rows
    let equipmentRowsHtml = '';
    let equipmentTotal = 0;
    if (equipment.length > 0) {
        equipment.forEach(item => {
            const itemCost = typeof item.variableCost === 'number' ? item.variableCost : (item.cost || 0);
            const cost = parseFloat(itemCost) || 0;
            equipmentTotal += cost;
            equipmentRowsHtml += `
                <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-300">${item.name}</span>
                    <span class="text-yellow-200">${cost} GC</span>
                </div>`;
        });
    } else {
        equipmentRowsHtml = `<div class="text-sm text-slate-500">No equipment</div>`;
    }

    const perFighterTotal = baseCost + equipmentTotal;

    // Determine GC and Treasure refund amounts
    let gcRefund = 0;
    let treasureRefund = 0;
    if (costType === 'Treasure') {
        // Hire fee was paid in Treasure, equipment was paid in GC
        treasureRefund = baseCost * groupSize;
        gcRefund = equipmentTotal * groupSize;
    } else {
        gcRefund = perFighterTotal * groupSize;
    }

    // Build the breakdown HTML (mirrors cost breakdown modal)
    let html = `
        <!-- Fighter Base Cost -->
        <div class="bg-slate-800 p-3 rounded-lg">
            <div class="flex justify-between items-center">
                <span class="text-slate-300 font-medium">${fighter.name}</span>
                <span class="text-mordheim-gold font-bold">${baseCost} ${costType === 'Treasure' ? 'Treasure' : 'GC'}</span>
            </div>
        </div>

        <!-- Equipment Costs -->
        <div class="bg-slate-800 p-3 rounded-lg">
            <div class="text-sm font-medium text-slate-400 mb-2">Equipment</div>
            ${equipmentRowsHtml}
            <div class="flex justify-between items-center mt-2 pt-2 border-t border-slate-600 text-sm">
                <span class="text-slate-400">Equipment Subtotal</span>
                <span class="text-yellow-200 font-medium">${equipmentTotal} GC</span>
            </div>
        </div>`;

    // Henchmen multiplier
    if (isHenchman && groupSize > 1) {
        html += `
        <div class="bg-slate-800 p-3 rounded-lg">
            <div class="flex justify-between items-center text-sm">
                <span class="text-slate-300">Cost per fighter</span>
                <span class="text-yellow-200">${perFighterTotal} ${costType === 'Treasure' ? 'Treasure + GC' : 'GC'}</span>
            </div>
            <div class="flex justify-between items-center text-sm mt-1">
                <span class="text-slate-300">Group size</span>
                <span class="text-yellow-200">&times; ${groupSize}</span>
            </div>
        </div>`;
    }

    // Refund totals
    html += `
        <div class="bg-slate-900 p-3 rounded-lg border border-mordheim-gold">
            <div class="text-sm font-medium text-green-400 mb-2"><i class="fas fa-coins mr-1"></i>Refund to Treasury</div>`;
    if (gcRefund > 0) {
        html += `
            <div class="flex justify-between items-center">
                <span class="text-mordheim-gold font-bold text-lg">Gold Crowns</span>
                <span class="text-green-400 font-bold text-lg">+${gcRefund} GC</span>
            </div>`;
    }
    if (treasureRefund > 0) {
        html += `
            <div class="flex justify-between items-center mt-1">
                <span class="text-mordheim-gold font-bold text-lg">Treasure</span>
                <span class="text-green-400 font-bold text-lg">+${treasureRefund} Treasure</span>
            </div>`;
    }
    html += `</div>`;

    contentDiv.innerHTML = html;

    // Set up confirm handler
    document.getElementById('confirm-refund-delete-btn').onclick = async () => {
        // Refund to treasury
        currentWarband.gc_treasury += gcRefund;
        if (treasureRefund > 0) {
            currentWarband.treasure = (currentWarband.treasure || 0) + treasureRefund;
        }

        // Record ledger transaction
        await recordFighterRefund(fighterName, gcRefund, treasureRefund, {
            fighter_type: fighter.type,
            group_size: groupSize,
            base_cost: baseCost,
            equipment_cost: equipmentTotal,
            cost_type: costType
        });

        // Remove fighter
        currentWarband.members = currentWarband.members.filter(f => f.id !== fighterId);
        hideModal('refund-breakdown-modal');
        hideModal('fighter-modal');
        await saveWarband();

        // Success message
        let refundMsg = `${fighterName} deleted. Refunded ${gcRefund} GC`;
        if (treasureRefund > 0) {
            refundMsg += ` and ${treasureRefund} Treasure`;
        }
        showMessage(refundMsg);
    };

    displayModal('refund-breakdown-modal');
}


/** Removes an item from Warband Storage. User must re-purchase for a fighter. */
const takeFromStorage = (index) => {
    // Initiate the new retrieval workflow
    showRetrieveModal(index);
};

// --- NEW RETRIEVAL FUNCTIONS ---

/** Transfers the stored item to the selected fighter without charging GC. */
const transferStoredItem = async function(saveWarband) {
    if (!tempItemToRetrieve) return;

    const selectedFighterId = document.getElementById('retrieve-fighter-select').value;
    const targetFighterIndex = currentWarband.members.findIndex(f => f.id === selectedFighterId);
    
    if (targetFighterIndex === -1) {
        showMessage('Fighter not found.', 'error');
        return;
    }
    
    const targetFighter = currentWarband.members[targetFighterIndex];
    const item = tempItemToRetrieve.item;

    // Check lucky items limit for restricted items
    const luckyItemNames = ["Lucky Charm", "Holy (Unholy) Relic", "Rabbit's Foot"];
    if (isLuckyItemsLimited && luckyItemNames.includes(item.name)) {
        const hasItemAlready = currentWarband.members.some(fighter =>
            fighter.equipment && fighter.equipment.some(eq => eq.name === item.name)
        );
        if (hasItemAlready) {
            showMessage(`House Rule: Lucky items are limited to one each per warband. ${item.name} is already assigned to another fighter.`, 'error');
            return;
        }
    }

    const isHenchmanGroup = targetFighter.type === 'Henchman' && (targetFighter.group_size || 1) > 1;
    const needed = targetFighter.group_size || 1;

    if (isHenchmanGroup) {
        // Pre-check the constraints
        const totalItemInstancesInStorage = countItemInStorage(currentWarband, item.name);
        const alreadyHasItem = targetFighter.equipment.some(e => e.name === item.name);

        if (alreadyHasItem) {
            showMessage(`Transfer blocked: Henchman Group must be uniformly equipped. ${targetFighter.name} already has ${item.name}.`, 'error');
            return;
        }
        
        if (totalItemInstancesInStorage < needed) {
            showMessage(`Transfer blocked: ${targetFighter.name} group (size ${needed}) needs ${needed} instances of ${item.name}, but only ${totalItemInstancesInStorage} are in storage.`, 'error');
            return;
        }
        
        // --- EXECUTE GROUP TRANSFER ---
        
        // 1. Remove the *retrieved* item (at index)
        currentWarband.stored_equipment.splice(tempItemToRetrieve.index, 1);
        
        // 2. Remove the remaining `needed - 1` *additional* items from storage
        const remainingToRemove = needed - 1;
        let removedCount = 0;
        
        // Iterate backwards to safely remove items by name
        for (let i = currentWarband.stored_equipment.length - 1; i >= 0 && removedCount < remainingToRemove; i--) {
            if (currentWarband.stored_equipment[i].name === item.name) {
                currentWarband.stored_equipment.splice(i, 1);
                removedCount++;
            }
        }
        
        // 3. Add ONE instance to the fighter's equipment list
        targetFighter.equipment.push(item);

    } else {
        // Hero/Hired Sword/Single Henchman logic
        
        // 1. Check for duplicate equipment FIRST (before removing from storage)
        if (!targetFighter.equipment || !Array.isArray(targetFighter.equipment)) {
            targetFighter.equipment = [];
        }
        // Only allow one instance for non-Henchman Groups (to prevent accidental duplication)
        const alreadyHasItem = targetFighter.equipment.some(e => e.name === item.name);
        if (alreadyHasItem) {
            showMessage(`Transfer blocked: ${targetFighter.name} already has a ${item.name}.`, 'error');
            // Refresh UI to ensure storage display is consistent
            renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
            return;
        }

        // 2. Remove from Warband Storage (only after validation passes)
        currentWarband.stored_equipment.splice(tempItemToRetrieve.index, 1);

        // 3. Add to Target Fighter's Equipment
        targetFighter.equipment.push(item);
    }
    
    // 4. Update the warband data (update the member)
    currentWarband.members[targetFighterIndex] = targetFighter;
    
    // 5. Save and Update UI
    hideModal('retrieve-modal');
    await saveWarband();

    showMessage(`Successfully transferred ${item.name} to ${targetFighter.name}.`, 'success');
}

/** Finalizes the removal of equipment from a fighter (sell or store) - deferred to save time */
const finalizeEquipmentRemoval = async (saveWarband) => {
    if (!tempItemToRemove || !currentWarband) return;

    const action = document.querySelector('input[name="removal-action"]:checked').value;
    const item = tempItemToRemove.item;
    const originalCost = tempItemToRemove.originalCost;
    const itemIndex = tempItemToRemove.index;

    // Get fighter info for group size
    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    const groupSize = fighter && fighter.type === 'Henchman' ? (fighter.group_size || 1) : 1;

    // Remove item from the modal's equipment JSON (NOT from fighter data)
    const jsonInput = document.getElementById('f-equipment-json');
    let selectedEquipment;
    try {
        selectedEquipment = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedEquipment = [];
    }
    selectedEquipment.splice(itemIndex, 1);
    jsonInput.value = JSON.stringify(selectedEquipment);

    const fighterModal = document.getElementById('fighter-modal');

    // Track the per-fighter base cost of the removed item for cost difference calculation
    const pendingRemovedCost = parseFloat(fighterModal.dataset.pendingRemovedCost || 0);
    fighterModal.dataset.pendingRemovedCost = pendingRemovedCost + (parseFloat(originalCost) || 0);

    if (action === 'sell') {
        const sellPrice = parseInt(document.getElementById('sell-price-input').value) || 0;

        // Accumulate sell proceeds (total including group multiplier)
        const pendingSellGc = parseInt(fighterModal.dataset.pendingSellGc || 0);
        fighterModal.dataset.pendingSellGc = pendingSellGc + sellPrice;

        // Track sell details for ledger and confirmation modal
        let pendingSells = [];
        try { pendingSells = JSON.parse(fighterModal.dataset.pendingSells || '[]'); } catch (e) {}
        pendingSells.push({ itemName: item.name, sellPrice, groupSize, itemCost: originalCost, itemRules: item.rules });
        fighterModal.dataset.pendingSells = JSON.stringify(pendingSells);

        showMessage(`${item.name} marked for sale at ${sellPrice} GC. Changes apply when you save.`, 'info');
    } else if (action === 'store') {
        // Track items to store for confirmation modal and save-time processing
        let pendingStores = [];
        try { pendingStores = JSON.parse(fighterModal.dataset.pendingStores || '[]'); } catch (e) {}
        pendingStores.push({ name: item.name, cost: originalCost, rules: item.rules, groupSize });
        fighterModal.dataset.pendingStores = JSON.stringify(pendingStores);

        showMessage(`${item.name} marked for storage. Changes apply when you save.`, 'info');
    }

    hideModal('sell-store-modal');

    // Re-render equipment display in-place (no modal re-open)
    renderSelectedEquipment();
    renderArmorSave();
    updateStatModifiers();

    // Note: Magic access and skill category removal will be handled when equipment
    // is committed to the fighter data at save time. The renderSelectedEquipment()
    // call above keeps the visual display consistent.
    const removedItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);

    // Handle skills removal from equipment for existing fighters
    if (removedItem && removedItem.grantSkill && Array.isArray(removedItem.grantSkill)) {
        removeSkillsFromEquipment(removedItem.grantSkill);
    }

    // Handle special rules removal from equipment for existing fighters
    if (removedItem && removedItem.grantSpecialRule && Array.isArray(removedItem.grantSpecialRule)) {
        removeSpecialRulesFromEquipment(removedItem.grantSpecialRule);
    }

    // Handle skill selection removal from equipment for existing fighters (e.g., Loremaster Academic skill)
    if (removedItem && removedItem.skillSelection && Array.isArray(removedItem.skillSelection)) {
        if (item && item.selectedSkill) {
            removeSkillsFromEquipment([item.selectedSkill]);
        }
    }

    // Check if a mount or war beast was removed and refresh stats display
    const hasMountOrBeast = selectedEquipment.some(eq => {
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        return masterItem && (masterItem.category === 'Mounts' || masterItem.category === 'War Beasts');
    });
    if (hasMountOrBeast) {
        const multiStats = applyMountStats(selectedEquipment, currentFighterBaseStats);
        setCurrentFighterMultiStats(multiStats);
        renderStatInputs(multiStats);
    } else if (removedItem && (removedItem.category === 'Mounts' || removedItem.category === 'War Beasts')) {
        setCurrentFighterMultiStats(null);
        renderStatInputs(currentFighterBaseStats);
    }
};

// --- NEW STORAGE MODAL FUNCTIONS ---

/** Adds a selected item to the warband's storage */
const addEquipmentToStorage = async (itemId, saveWarband) => {
    const item = MASTER_EQUIPMENT_LIST.find(i => i.id === itemId);
    if (!item) return;

    const subtractCost = document.getElementById('storage-cost-toggle').checked;
    const parsedCost = parseCostString(item);
    let itemCost;

    if (parsedCost.isVariable) {
        // For variable costs, we need user input
        setTempItemToAdd({ item: item, parsedCost: parsedCost, isStorage: true });
        document.getElementById('dice-roll-item-name').textContent = item.name;
        const diceDescription = parsedCost.multiplier > 1 ?
            `${parsedCost.diceCount}D6 × ${parsedCost.multiplier}` :
            `${parsedCost.diceCount}D6`;
        document.getElementById('dice-roll-base-cost').textContent = `Base: ${parsedCost.base} GC + (result of ${diceDescription})`;
        document.getElementById('dice-roll-value').value = ''; // Clear previous value
        displayModal('dice-roll-modal'); // Updated call
        return;
    } else {
        itemCost = parsedCost.base;
    }

    // If subtracting cost, check for custom cost input
    if (subtractCost) {
        const customCostInput = document.getElementById('custom-cost-input');
        if (!customCostInput.value) {
            customCostInput.value = itemCost;
        }
        const customCost = customCostInput.value ? parseInt(customCostInput.value) : null;
        if (customCost !== null && !isNaN(customCost) && customCost >= 0) {
            itemCost = customCost;
        }
    }

    if (subtractCost && currentWarband.gc_treasury < itemCost) {
        showMessage(`Insufficient Gold Crowns. Purchase requires ${itemCost} GC, but treasury only has ${currentWarband.gc_treasury} GC.`, 'error');
        return;
    }

    if (subtractCost) {
        currentWarband.gc_treasury -= itemCost;
        
        // Record equipment purchase in ledger
        await recordEquipmentPurchase(item.name, itemCost, 1);
    }

    if (!currentWarband.stored_equipment) {
        currentWarband.stored_equipment = [];
    }

    // Normalize item to ensure it has all required fields
    const normalizedItem = normalizeEquipment({ id: item.id, name: item.name, cost: itemCost, rules: item.rules });
    currentWarband.stored_equipment.push(serializeEquipment(normalizedItem, isV2Warband(currentWarband)));

    showMessage(`${item.name} added to storage. ${subtractCost ? `Spent ${itemCost} GC.` : ''}`, 'success');

    await saveWarband();
};

/** Sells a specified quantity of an item from storage */
const sellFromStorage = async (saveWarband) => {
    const name = document.getElementById('sell-storage-item-name').textContent;
    const quantityToSell = parseInt(document.getElementById('sell-storage-quantity').value);
    const pricePerItem = parseInt(document.getElementById('sell-storage-price').value);
    const originalCost = parseInt(document.getElementById('sell-storage-item-cost').textContent);

    if (isNaN(quantityToSell) || quantityToSell <= 0) {
        showMessage("Please enter a valid quantity to sell.", 'error');
        return;
    }

    if (isNaN(pricePerItem) || pricePerItem < 0) {
        showMessage("Please enter a valid sell price.", 'error');
        return;
    }
    
    if (pricePerItem > originalCost) {
        showMessage(`Sale blocked: Cannot sell item for more than its original purchase price (${originalCost} GC).`, 'error');
        return;
    }

    // Normalize storage items to ensure names are available for comparison
    const normalizedStorage = currentWarband.stored_equipment.map(item => normalizeEquipment(item));
    const itemsInStorage = normalizedStorage.filter(item => item.name === name).length;

    if (quantityToSell > itemsInStorage) {
        showMessage(`Cannot sell ${quantityToSell} items. Only ${itemsInStorage} in storage.`, 'error');
        return;
    }

    // Remove the items from storage
    let removedCount = 0;
    currentWarband.stored_equipment = currentWarband.stored_equipment.filter((item, index) => {
        const normalizedItem = normalizeEquipment(item);
        if (normalizedItem.name === name && removedCount < quantityToSell) {
            removedCount++;
            return false; // Remove this item
        }
        return true; // Keep this item
    });

    // Add gold to treasury
    const totalGain = quantityToSell * pricePerItem;
    currentWarband.gc_treasury += totalGain;
    
    // Record equipment sale in ledger
    await recordEquipmentSale(name, pricePerItem, quantityToSell);

    hideModal('sell-from-storage-modal');
    showMessage(`Sold ${quantityToSell} x ${name} for ${totalGain} GC.`, 'success');
    await saveWarband();
};

/** Finalizes adding equipment after a dice roll (if applicable) */
const finalizeEquipmentAdd = async (saveWarband) => {
    if (!tempItemToAdd) return;

    const userInputValue = parseInt(document.getElementById('dice-roll-value').value);
    if (isNaN(userInputValue) || userInputValue < 0) {
        showMessage("Please enter a valid value (0 or higher).", 'error');
        return;
    }

    const item = { ...tempItemToAdd.item }; // Clone to avoid modifying original MASTER_EQUIPMENT_LIST item
    const parsedCost = tempItemToAdd.parsedCost;

    // Calculate final cost: base + (multiplier * user_input)
    item.cost = parsedCost.base + (parsedCost.multiplier * userInputValue);

    if (!tempItemToAdd.isStorage) {
        // Adding to fighter equipment
        const jsonInput = document.getElementById('f-equipment-json');
        let selectedEquipment;
        try {
            selectedEquipment = JSON.parse(jsonInput.value || '[]');
        } catch (e) {
            selectedEquipment = [];
        }

        if (item.category === "Blessings of Nurgle") {
            const existingBlessings = selectedEquipment.filter(e => {
                const master = MASTER_EQUIPMENT_LIST.find(i => i.name === e.name);
                return master && master.category === "Blessings of Nurgle";
            }).length;
            if (existingBlessings >= 1) {
                item.cost *= 2;
            }
        }
    }

    if (tempItemToAdd.isStorage) {
        // Adding to storage
        const subtractCost = document.getElementById('storage-cost-toggle').checked;

        if (subtractCost && currentWarband.gc_treasury < item.cost) {
            showMessage(`Insufficient Gold Crowns. Purchase requires ${item.cost} GC, but treasury only has ${currentWarband.gc_treasury} GC.`, 'error');
            return;
        }

        if (subtractCost) {
            currentWarband.gc_treasury -= item.cost;
            
            // Record equipment purchase in ledger
            await recordEquipmentPurchase(item.name, item.cost, 1);
        }

        if (!currentWarband.stored_equipment) {
            currentWarband.stored_equipment = [];
        }

        // Normalize item to ensure it has all required fields
        const normalizedItem = normalizeEquipment({ name: item.name, cost: item.cost, rules: item.rules });
        currentWarband.stored_equipment.push(serializeEquipment(normalizedItem, isV2Warband(currentWarband)));

        showMessage(`${item.name} added to storage. ${subtractCost ? `Spent ${item.cost} GC.` : ''}`, 'success');
        await saveWarband();
    } else {
        // Adding to fighter equipment
        const jsonInput = document.getElementById('f-equipment-json');
        let selectedEquipment;
        try {
            selectedEquipment = JSON.parse(jsonInput.value || '[]');
        } catch (e) {
            selectedEquipment = [];
        }
        selectedEquipment.push(item);
        jsonInput.value = JSON.stringify(selectedEquipment);

        // Track pending purchase for existing fighters (variable cost items bypass addEquipment's tracking)
        const fighterId = document.getElementById('fighter-id').value;
        if (fighterId) {
            const fighterModal = document.getElementById('fighter-modal');
            let pendingPurchases = [];
            try { pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases || '[]'); } catch (err) {}
            pendingPurchases.push({ name: item.name, cost: parseFloat(item.cost) || 0 });
            fighterModal.dataset.pendingPurchases = JSON.stringify(pendingPurchases);
        }

        renderSelectedEquipment(); // Re-render to show the new item
        showMessage(`${item.name} added with a cost of ${item.cost} GC.`, 'success');
        // saveWarband(); // No need to save here, saveFighter will handle it.
    }

    hideModal('dice-roll-modal');
    setTempItemToAdd(null); // Clear the temporary item
};

const initFighterManagement = (saveWarband) => {
    // Fighter Modal Inputs & Buttons
    document.getElementById('f-type').addEventListener('change', () => {
        const role = document.getElementById('f-type').value;
        toggleGroupSize();
        populateWarriorChoices(role);
        
        // Clear equipment and mount state from previous selection (e.g. Hired Sword with a mount)
        document.getElementById('f-equipment-json').value = '[]';
        setCurrentFighterMultiStats(null);
        renderSelectedEquipment();
        renderArmorSave();
        updateStatModifiers();
        
        // Re-enable fields that may have been disabled by Hired Sword/Dramatis Personae/Vehicle selection
        ['f-cost', 'f-xp', 'f-skills', 'f-injuries', 'f-race'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.disabled = false;
        });
        STATS_FIELDS.forEach(stat => {
            const element = document.getElementById(`stat-${stat}`);
            if (element) element.disabled = true;
        });
        const equipmentCategorySelectReEnable = document.getElementById('equipment-category-select');
        if (equipmentCategorySelectReEnable) equipmentCategorySelectReEnable.disabled = false;
        
        // Clear skills and warrior special rules when role changes
        document.getElementById('f-skills-hidden').value = '[]';
        document.getElementById('f-skills').textContent = 'None';
        document.getElementById('warrior-rules-display').textContent = 'None';
        document.getElementById('f-special-rules').value = '';
        
        // Hide packmaster beast handling selection when role changes
        const packmasterBeastHandlingSelectionWrapper = document.getElementById('packmaster-beast-handling-selection-wrapper');
        if (packmasterBeastHandlingSelectionWrapper) {
            packmasterBeastHandlingSelectionWrapper.classList.add('hidden');
        }
        const packmasterBeastHandlingSelect = document.getElementById('f-packmaster-beast-handling-choice');
        if (packmasterBeastHandlingSelect) {
            packmasterBeastHandlingSelect.value = '';
        }

        // Hide trapper skill selection when role changes
        const trapperSkillSelectionWrapper = document.getElementById('trapper-skill-selection-wrapper');
        if (trapperSkillSelectionWrapper) {
            trapperSkillSelectionWrapper.classList.add('hidden');
        }
        const trapperSkillSelect = document.getElementById('f-trapper-skill-choice');
        if (trapperSkillSelect) {
            trapperSkillSelect.value = '';
        }

        // Clear magic selection when role changes
        document.getElementById('magic-selection-section').classList.add('hidden');
        document.getElementById('magic-spells-container').innerHTML = '';
        document.getElementById('f-chosen-magic-lore').value = '';
        
        // Don't override layout for Vehicle role - toggleGroupSize handles it
        // For other roles, adjust layout based on their characteristics
        if (role !== 'Vehicle') {
            // toggleSkillsLayout([], ''); // Removed - using default vertical layout
        }
    });
    document.getElementById('f-race').addEventListener('change', renderRacialMaximums);
    document.getElementById('f-group-size').addEventListener('change', updateGroupSizeDisplay);
    
    // Initialize Notes toggle behavior
    const notesBtn = document.getElementById('f-notes-btn');
    const notesWrapper = document.getElementById('f-notes-wrapper');
    const notesTextarea = document.getElementById('f-notes');
    if (notesBtn && notesWrapper && notesTextarea) {
        notesBtn.addEventListener('click', () => {
            const isHidden = notesWrapper.classList.toggle('hidden');
            if (isHidden) {
                if (notesTextarea.value.trim()) {
                    notesBtn.classList.remove('text-slate-400');
                    notesBtn.classList.add('text-mordheim-gold');
                } else {
                    notesBtn.classList.remove('text-mordheim-gold');
                    notesBtn.classList.add('text-slate-400');
                }
            } else {
                notesBtn.classList.remove('text-slate-400');
                notesBtn.classList.add('text-mordheim-gold');
                notesTextarea.focus();
            }
        });
    }

    // Initialize Henchmen Group Management module
    initHenchmenGroupMgmt(saveFighter, saveWarband);
    document.getElementById('manage-group-link').addEventListener('click', showGroupManageModal);
    document.getElementById('manage-reduce-group-btn').addEventListener('click', confirmReduceGroupSize);
    document.getElementById('manage-increase-group-btn').addEventListener('click', showAddHenchmenModal);
    document.getElementById('cancel-manage-group-btn').addEventListener('click', () => hideModal('manage-group-modal'));
    const equipmentCategorySelect = document.getElementById('equipment-category-select');
    if (equipmentCategorySelect) {
        equipmentCategorySelect.addEventListener('change', renderEquipmentOptions);
    }
    document.getElementById('f-warrior-choice').addEventListener('change', () => {
        // Hide equipment selection dropdown when warrior choice changes
        document.getElementById('hired-sword-equipment-selection-wrapper').classList.add('hidden');
        updateFighterDataFromSelection();
    });
    document.getElementById('f-dramatis-personae-choice').addEventListener('change', () => {
        // Hide equipment selection dropdown when dramatis personae choice changes
        document.getElementById('hired-sword-equipment-selection-wrapper').classList.add('hidden');
        updateFighterDataFromDramatisPersonaeSelection();
    });
    document.getElementById('f-hired-sword-choice').addEventListener('change', updateFighterDataFromHiredSwordSelection); // Add event listener for hired swords
    document.getElementById('f-vehicle-choice').addEventListener('change', () => {
        // Hide equipment selection dropdown when vehicle choice changes
        document.getElementById('hired-sword-equipment-selection-wrapper').classList.add('hidden');
        updateFighterDataFromVehicleSelection();
    });
    document.getElementById('f-xp').addEventListener('change', (e) => {
        const role = document.getElementById('f-type').value;
        const newXP = e.target.value;

        if (role === 'Hero') {
            renderHeroXPBar(newXP);
        } else {
            const specialRules = document.getElementById('f-special-rules').value;
            renderXPBar(newXP, specialRules);
        }

    });

    
    // Add up/down button functionality for XP field
    const xpUpBtn = document.getElementById('xp-up-btn');
    const xpDownBtn = document.getElementById('xp-down-btn');
    
    if (xpUpBtn && xpDownBtn) {
        xpUpBtn.addEventListener('click', () => {
            const xpInput = document.getElementById('f-xp');
            if (xpInput && !xpInput.disabled) {
                const currentValue = parseFloat(xpInput.value) || 0;
                const newValue = currentValue + 1;
                xpInput.value = newValue.toString();
                // Trigger change event to update UI
                xpInput.dispatchEvent(new Event('change', { bubbles: true }));
                xpInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
        
        xpDownBtn.addEventListener('click', () => {
            const xpInput = document.getElementById('f-xp');
            if (xpInput && !xpInput.disabled) {
                const currentValue = parseFloat(xpInput.value) || 0;
                const newValue = Math.max(0, currentValue - 1); // Don't go below 0
                xpInput.value = newValue.toString();
                // Trigger change event to update UI
                xpInput.dispatchEvent(new Event('change', { bubbles: true }));
                xpInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    }

    // Temporarily disabled input event listener to test mobile editing
    // document.getElementById('f-xp').addEventListener('input', (e) => {
    //     const role = document.getElementById('f-type').value;
    //     const newXP = e.target.value;

    //     if (role === 'Hero') {
    //         renderHeroXPBar(newXP);
    //         const fighterId = document.getElementById('fighter-id').value;
    //         if (fighterId) {
    //             const fighter = currentWarband.members.find(f => f.id === fighterId);
    //             if (fighter) {
    //                 const tempFighter = { ...fighter, xp: parseInt(newXP) || 0 };
    //                 renderHeroAdvancement(tempFighter, saveWarband);
    //             }
    //         }
    //     } else {
    //         const specialRules = document.getElementById('f-special-rules').value;
    //         renderXPBar(newXP, specialRules);
    //     }

    //     if (role === 'Henchman' || role === 'Hired Sword') {
    //         const fighterId = document.getElementById('fighter-id').value;
    //         if (fighterId) { // Only for existing fighters
    //             const fighter = currentWarband.members.find(f => f.id === fighterId);
    //             if (fighter) {
    //                 // Create a temporary fighter object with the new XP to check for advancements
    //                 const tempFighter = { ...fighter, xp: parseInt(newXP) || 0 };
    //                 renderHenchmanAdvancement(tempFighter, saveWarband);
    //             }
    //         }
    //     }
    // });
    
    const statsGrid = document.getElementById('stats-grid');
    statsGrid.addEventListener('change', (e) => {
        if (e.target.matches('input[type="number"]')) {
            const stat = e.target.id.replace('stat-', '');
            const value = parseInt(e.target.value) || 0;

            // Update the base stat value in our temporary store
            setCurrentFighterBaseStats({ ...currentFighterBaseStats, [stat]: value });
            
            // Re-apply modifiers, which will read from the updated base stat
            // This is important if the user manually changes the M stat while the penalty is active
            updateStatModifiers(); 
            renderRacialMaximums();
        }
    });


    document.getElementById('delete-fighter-btn').addEventListener('click', () => deleteFighter(saveWarband));
    document.getElementById('cancel-fighter-btn').addEventListener('click', () => {
        // Clean up pending henchmen additions
        const fighterModal = document.getElementById('fighter-modal');
        const pendingGroupSizeIncrease = parseInt(fighterModal.dataset.pendingGroupSizeIncrease || 0);
        
        if (pendingGroupSizeIncrease > 0) {
            // Revert the group size input to the actual fighter's current size
            const fighterId = document.getElementById('fighter-id').value;
            const fighter = currentWarband.members.find(f => f.id === fighterId);
            if (fighter) {
                document.getElementById('f-group-size').value = fighter.group_size || 1;
            }
            
            // Clear pending changes
            delete fighterModal.dataset.pendingGroupSizeIncrease;
            delete fighterModal.dataset.pendingCostDeduction;
            
            showMessage('Cancelled adding fighters. Group size reverted.', 'info');
        }
        
        // Clear pending equipment changes
        delete fighterModal.dataset.pendingPurchases;
        delete fighterModal.dataset.pendingSellGc;
        delete fighterModal.dataset.pendingSells;
        delete fighterModal.dataset.pendingStores;
        delete fighterModal.dataset.pendingRemovedCost;
        
        hideModal('fighter-modal');
    });
    document.getElementById('save-fighter-btn').addEventListener('click', () => saveFighter(0, false, saveWarband));

    // Stats Override Modal Handlers
    document.getElementById('stats-override-btn').addEventListener('click', showStatsOverrideModal);
    document.getElementById('cancel-stats-override-btn').addEventListener('click', () => hideModal('stats-override-modal'));
    document.getElementById('submit-stats-override-btn').addEventListener('click', submitStatsOverride);

    // Skill Access Override Modal Handlers
    document.getElementById('skill-access-override-btn').addEventListener('click', showSkillAccessOverrideModal);
    document.getElementById('cancel-skill-access-override-btn').addEventListener('click', () => hideModal('skill-access-override-modal'));
    document.getElementById('submit-skill-access-override-btn').addEventListener('click', submitSkillAccessOverride);
    document.getElementById('reset-skill-access-override-btn').addEventListener('click', resetSkillAccessOverride);

    // Sell/Store Modal
    document.getElementById('action-sell').addEventListener('change', updateSellPrice);
    document.getElementById('cancel-sell-store-btn').addEventListener('click', () => hideModal('sell-store-modal'));
    document.getElementById('confirm-removal-btn').addEventListener('click', () => finalizeEquipmentRemoval(saveWarband));

    // Equipment Changes Confirmation Modal
    document.getElementById('cancel-equipment-changes-btn').addEventListener('click', () => hideModal('equipment-changes-modal'));
    document.getElementById('confirm-equipment-changes-btn').addEventListener('click', () => {
        hideModal('equipment-changes-modal');
        saveFighter(0, false, saveWarband, true); // confirmed = true
    });

    // Equipment Changes Modal - undo button delegation
    const equipChangesContent = document.getElementById('equipment-changes-content');
    equipChangesContent.addEventListener('click', (e) => {
        const undoBtn = e.target.closest('.undo-change-btn');
        if (!undoBtn) return;

        const action = undoBtn.dataset.action;
        const index = parseInt(undoBtn.dataset.index);
        const fighterModal = document.getElementById('fighter-modal');

        // Read current equipment JSON
        const jsonInput = document.getElementById('f-equipment-json');
        let selectedEquipment;
        try { selectedEquipment = JSON.parse(jsonInput.value || '[]'); } catch (err) { selectedEquipment = []; }

        if (action === 'purchase') {
            let pendingPurchases = [];
            try { pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases || '[]'); } catch (err) {}
            const removed = pendingPurchases.splice(index, 1)[0];
            fighterModal.dataset.pendingPurchases = JSON.stringify(pendingPurchases);

            // Remove the item from f-equipment-json (find last match by name)
            if (removed) {
                for (let i = selectedEquipment.length - 1; i >= 0; i--) {
                    if (selectedEquipment[i].name === removed.name) {
                        selectedEquipment.splice(i, 1);
                        break;
                    }
                }
                jsonInput.value = JSON.stringify(selectedEquipment);
            }
        } else if (action === 'sell') {
            let pendingSells = [];
            try { pendingSells = JSON.parse(fighterModal.dataset.pendingSells || '[]'); } catch (err) {}
            const removed = pendingSells.splice(index, 1)[0];
            fighterModal.dataset.pendingSells = JSON.stringify(pendingSells);

            if (removed) {
                // Recalculate pendingSellGc from remaining sells
                const newTotalSellGc = pendingSells.reduce((sum, s) => sum + s.sellPrice, 0);
                fighterModal.dataset.pendingSellGc = newTotalSellGc;

                // Reduce pendingRemovedCost
                const currentRemovedCost = parseFloat(fighterModal.dataset.pendingRemovedCost || 0);
                fighterModal.dataset.pendingRemovedCost = Math.max(0, currentRemovedCost - (parseFloat(removed.itemCost) || 0));

                // Add item back to equipment JSON
                selectedEquipment.push({ name: removed.itemName, cost: removed.itemCost, rules: removed.itemRules });
                jsonInput.value = JSON.stringify(selectedEquipment);
            }
        } else if (action === 'store') {
            let pendingStores = [];
            try { pendingStores = JSON.parse(fighterModal.dataset.pendingStores || '[]'); } catch (err) {}
            const removed = pendingStores.splice(index, 1)[0];
            fighterModal.dataset.pendingStores = JSON.stringify(pendingStores);

            if (removed) {
                // Reduce pendingRemovedCost
                const currentRemovedCost = parseFloat(fighterModal.dataset.pendingRemovedCost || 0);
                fighterModal.dataset.pendingRemovedCost = Math.max(0, currentRemovedCost - (parseFloat(removed.cost) || 0));

                // Add item back to equipment JSON
                selectedEquipment.push({ name: removed.name, cost: removed.cost, rules: removed.rules });
                jsonInput.value = JSON.stringify(selectedEquipment);
            }
        }

        // Re-render equipment display behind the modal
        renderSelectedEquipment();
        renderArmorSave();
        updateStatModifiers();

        // Re-render the confirmation modal content (or close if empty)
        if (!buildEquipmentChangesModal()) {
            showMessage('All equipment changes undone.', 'info');
        }
    });

    // Equipment Changes Modal - gold value edit delegation
    equipChangesContent.addEventListener('input', (e) => {
        if (!e.target.classList.contains('edit-cost-input')) return;

        const action = e.target.dataset.action;
        const index = parseInt(e.target.dataset.index);
        const newValue = parseInt(e.target.value) || 0;
        const fighterModal = document.getElementById('fighter-modal');
        const groupSize = parseInt(document.getElementById('f-group-size').value) || 1;

        if (action === 'purchase') {
            let pendingPurchases = [];
            try { pendingPurchases = JSON.parse(fighterModal.dataset.pendingPurchases || '[]'); } catch (err) {}
            if (pendingPurchases[index]) {
                // Input shows total cost for group; store per-fighter cost
                pendingPurchases[index].cost = groupSize > 1 ? newValue / groupSize : newValue;
                fighterModal.dataset.pendingPurchases = JSON.stringify(pendingPurchases);
            }
        } else if (action === 'sell') {
            let pendingSells = [];
            try { pendingSells = JSON.parse(fighterModal.dataset.pendingSells || '[]'); } catch (err) {}
            if (pendingSells[index]) {
                pendingSells[index].sellPrice = newValue;
                fighterModal.dataset.pendingSells = JSON.stringify(pendingSells);

                // Recalculate pendingSellGc from all sells
                const totalSellGc = pendingSells.reduce((sum, s) => sum + s.sellPrice, 0);
                fighterModal.dataset.pendingSellGc = totalSellGc;
            }
        }

        updateEquipmentChangesSummary();
    });

    // Add to Storage Modal
    document.getElementById('cancel-add-to-storage-btn').addEventListener('click', () => hideModal('add-to-storage-modal'));
    document.getElementById('storage-equipment-category-select').addEventListener('change', () => renderStorageEquipmentOptions());
    document.getElementById('storage-cost-toggle').addEventListener('change', (e) => {
        const section = document.getElementById('custom-cost-section');
        if (e.target.checked) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
    document.getElementById('confirm-add-to-storage-btn').addEventListener('click', () => {
        if (window.selectedItemId) {
            addEquipmentToStorage(window.selectedItemId, saveWarband);
            window.selectedItemId = null; // Clear selection
        }
    });

    // Retrieve Modal
    document.getElementById('cancel-retrieve-btn').addEventListener('click', () => hideModal('retrieve-modal'));
    document.getElementById('transfer-item-btn').addEventListener('click', () => transferStoredItem(saveWarband));

    // Sell from Storage Modal
    document.getElementById('cancel-sell-from-storage-btn').addEventListener('click', () => hideModal('sell-from-storage-modal'));
    document.getElementById('confirm-sell-from-storage-btn').addEventListener('click', () => sellFromStorage(saveWarband));

    // Dice Roll Modal
    document.getElementById('cancel-dice-roll-btn').addEventListener('click', () => {
        hideModal('dice-roll-modal');
        setTempItemToAdd(null);
        setTempHiredSwordToAdd(null);
    });
    document.getElementById('confirm-dice-roll-btn').addEventListener('click', () => {
        if (tempItemToAdd) {
            finalizeEquipmentAdd(saveWarband);
        } else if (tempHiredSwordToAdd) {
            finalizeHiredSwordCost();
        }
    });

    // Confirmation Modal
    document.getElementById('cancel-confirmation-btn').addEventListener('click', () => {
        // Hide refund button when cancelling so it doesn't persist for non-delete confirmations
        document.getElementById('refund-action-btn').classList.add('hidden');
        hideModal('confirmation-modal');
    });

    // Refund Breakdown Modal
    document.getElementById('cancel-refund-btn').addEventListener('click', () => hideModal('refund-breakdown-modal'));

    // Add Henchmen Modal (opened from Manage Group modal)
    document.getElementById('cancel-add-henchmen-btn').addEventListener('click', () => hideModal('add-henchmen-modal'));
    document.getElementById('add-henchmen-count').addEventListener('input', updateAddHenchmenTotalCost);
    document.getElementById('add-henchmen-count').addEventListener('change', updateAddHenchmenTotalCost);
    document.getElementById('confirm-add-henchmen-btn').addEventListener('click', () => addHenchmenToGroup());

    // --- Event Delegation for Dynamically Generated Content ---

    // Roster and Stored Equipment Clicks
    document.getElementById('warband-editor-view').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
            const { action, fighterId, itemIndex, itemName, itemCost, itemQuantity } = button.dataset;

            if (action === 'edit-fighter') {
                editFighter(fighterId, saveWarband);
            } else if (action === 'take-from-storage') {
                takeFromStorage(parseInt(itemIndex));
            } else if (action === 'sell-from-storage') {
                showSellFromStorageModal(itemName, parseInt(itemCost), parseInt(itemQuantity));
            }
        }

        // Handle spell, skill, and rule clicks in warband members screen
        const spellSpan = e.target.closest('[data-spell]');
        if (spellSpan) {
            const spellName = spellSpan.dataset.spell;
            
            // Warband members screen context - search all magic groups
            let spell = null;
            for (const group in MAGIC) {
                spell = MAGIC[group].find(s => s.name === spellName);
                if (spell) break;
            }
            
            if (spell) {
                document.getElementById('rule-details-title').textContent = spell.name;
                const difficultyText = spell.difficulty === "Auto" ? "Automatic" : `Difficulty ${spell.difficulty}`;
                document.getElementById('rule-details-content').innerHTML = `
                    <div class="mb-2">
                        <strong>Difficulty:</strong> ${difficultyText}
                    </div>
                    <div>
                        <strong>Description:</strong> ${spell.description}
                    </div>
                `;
                displayModal('rule-details-modal');
            }
            e.stopPropagation();
            return;
        }

        const skillSpan = e.target.closest('[data-skill]');
        if (skillSpan) {
            const skillName = skillSpan.dataset.skill;
            const fighterId = skillSpan.dataset.fighterId;
            const fighter = fighterId && currentWarband ? currentWarband.members.find(f => f.id === fighterId) : null;
            const skillDetails = findSkillForWarbandCI(skillName, null, fighter);
            if (skillDetails) {
                document.getElementById('rule-details-title').textContent = skillName;
                document.getElementById('rule-details-content').innerHTML = skillDetails.rules;
                displayModal('rule-details-modal');
            }
            e.stopPropagation();
            return;
        }

        const ruleSpan = e.target.closest('[data-rule]');
        if (ruleSpan) {
            const ruleName = ruleSpan.dataset.rule;
            const ruleDetails = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);
            if (ruleDetails) {
                document.getElementById('rule-details-title').textContent = ruleName;
                document.getElementById('rule-details-content').innerHTML = ruleDetails.rules;
                displayModal('rule-details-modal');
            }
            e.stopPropagation();
            return;
        }

        const injurySpan = e.target.closest('[data-injury]');
        if (injurySpan) {
            const injuryName = injurySpan.dataset.injury;
            const injuryData = MASTER_INJURY_LIST.find(i => i.name === injuryName);
            if (injuryData) {
                document.getElementById('rule-details-title').textContent = injuryName;
                document.getElementById('rule-details-content').innerHTML = injuryData.description;
                displayModal('rule-details-modal');
            }
            e.stopPropagation();
            return;
        }
    });

    // Add to Storage Modal Equipment Clicks
    document.getElementById('add-to-storage-modal').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button && button.dataset.action === 'add-equipment-to-storage') {
            addEquipmentToStorage(parseInt(button.dataset.itemId), saveWarband);
        }
    });

    // Fighter Modal Equipment Clicks
    document.getElementById('fighter-modal').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
            const { action, itemId, itemIndex, itemName, itemCost, itemRules, injuryIndex } = button.dataset;

            if (action === 'add-equipment') {
                addEquipment(parseInt(itemId));
            } else if (action === 'remove-equipment') {
                removeEquipment(parseInt(itemIndex), itemName, parseInt(itemCost), itemRules);
            } else if (action === 'remove-injury') {
                removeInjury(parseInt(injuryIndex));
            } else if (button.id === 'select-injury-btn') {
                showInjurySelectionModal();
            } else if (button.id === 'skill-override-btn') {
                showSkillOverrideModal();
            }
        }

        const ruleSpan = e.target.closest('[data-rule]');
        if (ruleSpan) {
            const ruleName = ruleSpan.dataset.rule;
            const ruleDetails = SPECIAL_RULES_DETAILS.find(r => r.name.toLowerCase() === ruleName.toLowerCase())?.rules;
            if (ruleDetails) {
                document.getElementById('rule-details-title').textContent = ruleName;
                document.getElementById('rule-details-content').innerHTML = ruleDetails;
                displayModal('rule-details-modal'); // Updated call
            }
        }

        const injurySpan = e.target.closest('.injury-name');
        if (injurySpan) {
            const injuryName = injurySpan.dataset.injuryName;
            const injuryData = MASTER_INJURY_LIST.find(i => i.name === injuryName);
            if (injuryData) {
                document.getElementById('rule-details-title').textContent = injuryName;
                document.getElementById('rule-details-content').innerHTML = injuryData.description;
                displayModal('rule-details-modal'); // Reuse the rule details modal for injuries
            }
        }

        const spellSpan = e.target.closest('[data-spell]');
        if (spellSpan) {
            const spellName = spellSpan.dataset.spell;
            
            // Try to get the group from magic-spells-container first (for edit modal)
            let groupName = document.getElementById('magic-spells-container')?.dataset.group;
            let spell = null;
            
            if (groupName) {
                // Edit modal context - use the specific group
                spell = MAGIC[groupName]?.find(s => s.name === spellName);
            } else {
                // Warband members screen context - search all magic groups
                for (const group in MAGIC) {
                    spell = MAGIC[group].find(s => s.name === spellName);
                    if (spell) break;
                }
            }
            
            if (spell) {
                document.getElementById('rule-details-title').textContent = spell.name;
                const difficultyText = spell.difficulty === "Auto" ? "Automatic" : `Difficulty ${spell.difficulty}`;
                document.getElementById('rule-details-content').innerHTML = `
                    <div class="mb-2">
                        <strong>Difficulty:</strong> ${difficultyText}
                    </div>
                    <div>
                        <strong>Description:</strong> ${spell.description}
                    </div>
                `;
                displayModal('rule-details-modal');
            }
            e.stopPropagation(); // Prevent other click handlers
        }

        const skillSpan = e.target.closest('[data-skill]');
        if (skillSpan) {
            const skillName = skillSpan.dataset.skill;
            const fighterId = skillSpan.dataset.fighterId;
            const fighter = fighterId && currentWarband ? currentWarband.members.find(f => f.id === fighterId) : null;
            const skillDetails = findSkillForWarbandCI(skillName, null, fighter);
            if (skillDetails) {
                document.getElementById('rule-details-title').textContent = skillName;
                document.getElementById('rule-details-content').innerHTML = skillDetails.rules;
                displayModal('rule-details-modal');
            }
            e.stopPropagation(); // Prevent other click handlers
        }
    });

    document.getElementById('close-rule-details-btn').addEventListener('click', () => hideModal('rule-details-modal'));
    document.getElementById('cancel-skill-override-btn').addEventListener('click', () => hideModal('skill-override-modal'));
    document.getElementById('cancel-injury-selection-btn').addEventListener('click', () => hideModal('injury-selection-modal'));
};

export { initFighterManagement, showNewFighterModal, editFighter, takeFromStorage, saveFighter };
