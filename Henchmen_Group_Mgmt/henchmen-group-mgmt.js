import { currentWarband } from '../state.js';
import { calculateEquipmentCost, adjustEquipmentCosts, showMessage, displayModal, hideModal, showConfirmationModal } from '../utility.js';

// Module-scoped references to fighter-management functions (set during init)
let _saveFighter = null;
let _saveWarband = null;

/** Initialize the module with references to saveFighter and saveWarband */
export const initHenchmenGroupMgmt = (saveFighter, saveWarband) => {
    _saveFighter = saveFighter;
    _saveWarband = saveWarband;
};

/** Shows the Manage Group Size modal */
export const showGroupManageModal = () => {
    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter || fighter.type !== 'Henchman') return;

    const groupSize = parseInt(document.getElementById('f-group-size').value) || 1;

    // Update modal info
    document.getElementById('manage-group-fighter-name').textContent = fighter.name;
    document.getElementById('manage-group-current-size').textContent = groupSize;

    // Enable/disable reduce button based on group size
    const reduceBtn = document.getElementById('manage-reduce-group-btn');
    if (groupSize > 1) {
        reduceBtn.disabled = false;
        reduceBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        reduceBtn.disabled = true;
        reduceBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    displayModal('manage-group-modal');
};

/** Confirms and reduces the group size of a henchman group (e.g., due to casualty) */
export const confirmReduceGroupSize = async () => {
    const fighterId = document.getElementById('fighter-id').value;
    const fighterName = document.getElementById('f-name').value;
    const currentGroupSize = parseInt(document.getElementById('f-group-size').value) || 1;

    if (currentGroupSize <= 1) {
        showMessage("Group size cannot be reduced below 1.", 'error');
        return;
    }

    hideModal('manage-group-modal');

    showConfirmationModal(`Are you sure you want to reduce the group size of ${fighterName} by 1 (casualty)? This will not refund any GC.`, async () => {
        document.getElementById('f-group-size').value = currentGroupSize - 1;
        await _saveFighter(0, true, _saveWarband); // Pass 0 for gcDeltaFromSale and true for isCasualty
    });
};

/** Shows the modal to add fighters to a henchman group */
export const showAddHenchmenModal = () => {
    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter || fighter.type !== 'Henchman') return;

    // Clear any existing pending changes
    const fighterModal = document.getElementById('fighter-modal');
    delete fighterModal.dataset.pendingGroupSizeIncrease;
    delete fighterModal.dataset.pendingCostDeduction;

    // Set group name in modal
    document.getElementById('add-henchmen-group-name').textContent = fighter.name;

    // Calculate costs
    const baseCost = fighter.cost || 0;
    const equipmentCost = calculateEquipmentCost(adjustEquipmentCosts(fighter.equipment || []));
    const experienceCost = (fighter.xp || 0) * 2; // 2 GC per experience point
    const perFighterCost = baseCost + equipmentCost + experienceCost;

    // Update modal with cost breakdown
    document.getElementById('add-henchmen-base-cost').textContent = `${baseCost} GC`;
    document.getElementById('add-henchmen-equipment-cost').textContent = `${equipmentCost} GC`;
    document.getElementById('add-henchmen-xp-amount').textContent = fighter.xp || 0;
    document.getElementById('add-henchmen-experience-cost').textContent = `${experienceCost} GC`;
    document.getElementById('add-henchmen-per-fighter-cost').textContent = `${perFighterCost} GC`;
    document.getElementById('add-henchmen-treasury').textContent = `${currentWarband.gc_treasury} GC`;

    // Reset input and update total
    document.getElementById('add-henchmen-count').value = 1;
    updateAddHenchmenTotalCost();

    // Hide the manage modal and show the add henchmen modal
    hideModal('manage-group-modal');
    displayModal('add-henchmen-modal');
};

/** Updates the total cost display when number of fighters changes */
export const updateAddHenchmenTotalCost = () => {
    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;

    const count = parseInt(document.getElementById('add-henchmen-count').value) || 1;
    const baseCost = fighter.cost || 0;
    const equipmentCost = calculateEquipmentCost(adjustEquipmentCosts(fighter.equipment || []));
    const experienceCost = (fighter.xp || 0) * 2;
    const perFighterCost = baseCost + equipmentCost + experienceCost;
    const totalCost = perFighterCost * count;

    document.getElementById('add-henchmen-total-cost').textContent = `${totalCost} GC`;

    // Enable/disable confirm button based on treasury
    const confirmBtn = document.getElementById('confirm-add-henchmen-btn');
    if (totalCost > currentWarband.gc_treasury) {
        confirmBtn.disabled = true;
        confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        confirmBtn.disabled = false;
        confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
};

/** Adds fighters to the henchman group after confirmation */
export const addHenchmenToGroup = () => {
    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;

    const countToAdd = parseInt(document.getElementById('add-henchmen-count').value) || 1;
    
    // Calculate total cost
    const baseCost = fighter.cost || 0;
    const equipmentCost = calculateEquipmentCost(adjustEquipmentCosts(fighter.equipment || []));
    const experienceCost = (fighter.xp || 0) * 2;
    const perFighterCost = baseCost + equipmentCost + experienceCost;
    const totalCost = perFighterCost * countToAdd;

    // Check treasury
    if (totalCost > currentWarband.gc_treasury) {
        showMessage('Insufficient Gold Crowns for this purchase.', 'error');
        return;
    }

    // Store the pending changes in a data attribute on the modal
    const fighterModal = document.getElementById('fighter-modal');
    fighterModal.dataset.pendingGroupSizeIncrease = countToAdd;
    fighterModal.dataset.pendingCostDeduction = totalCost;

    // Update the modal input to show the new size (but don't update the actual fighter yet)
    const currentSize = fighter.group_size || 1;
    const newSize = currentSize + countToAdd;
    document.getElementById('f-group-size').value = newSize;

    // Hide modal
    hideModal('add-henchmen-modal');

    // Show success message (but note that changes are pending save)
    showMessage(`Ready to add ${countToAdd} fighter(s) to ${fighter.name}. New group size will be: ${newSize}. Cost: ${totalCost} GC (will be deducted when saved)`, 'success');
};
