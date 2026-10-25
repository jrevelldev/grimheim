import { calculateEquipmentCost, adjustEquipmentCosts, showMessage, displayModal, hideModal } from '../utility.js';
import { currentWarband } from '../state.js';
import { getTreasureSellingValue } from '../Treasury/selling_treasure.js';

/**
 * Replenish Henchmen Modal Module
 * Handles the modal for replenishing henchmen groups using veteran experience pool
 */

// State management for replenishment
let veteranPool = 0;
let replenishmentSelections = new Map(); // henchmenId -> { count: number, cost: number, xpUsed: number }
let totalReplenishmentCost = 0;

/**
 * Opens the replenish henchmen modal
 */
export function showReplenishHenchmenModal() {
    if (!currentWarband || !currentWarband.members) {
        showMessage('No warband loaded.', 'error');
        return;
    }

    // Reset state
    veteranPool = 0;
    replenishmentSelections.clear();
    totalReplenishmentCost = 0;

    // Initialize modal
    initializeModal();
    displayModal('replenish-henchmen-modal');
}

/**
 * Initializes the modal with default values
 */
function initializeModal() {
    // Set veteran pool input to default
    const veteranInput = document.getElementById('veteran-pool-input');
    const setBtn = document.getElementById('set-replenish-btn');
    const veteranRemainingDisplay = document.getElementById('veteran-pool-remaining');

    if (veteranInput) {
        veteranInput.value = '';
        veteranInput.min = 2;
        veteranInput.max = 12;
        veteranInput.placeholder = '2-12';

        // Add event listener to update calculations when veteran pool changes
        veteranInput.addEventListener('input', updateReplenishmentDisplay);
    }

    // Reset button state and display colors
    if (setBtn) {
        setBtn.disabled = false;
        setBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    if (veteranRemainingDisplay) {
        veteranRemainingDisplay.classList.remove('text-red-400');
        veteranRemainingDisplay.classList.add('text-yellow-200');
    }

    // Populate henchmen groups
    populateHenchmenGroups();

    // Update displays
    updateReplenishmentDisplay();
}

/**
 * Populates the henchmen groups section
 */
function populateHenchmenGroups() {
    const container = document.getElementById('replenish-henchmen-groups');
    if (!container) return;

    container.innerHTML = '';

    // Get all henchmen groups
    const henchmenGroups = currentWarband.members.filter(m => m.type === 'Henchman');

    if (henchmenGroups.length === 0) {
        container.innerHTML = '<p class="text-slate-400">No henchmen groups in warband.</p>';
        return;
    }

    henchmenGroups.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600 mb-3';

        const currentSize = group.group_size || 1;
        const currentXP = group.xp || 0;

        groupDiv.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h5 class="font-semibold text-mordheim-gold">${group.name}</h5>
                    <p class="text-sm text-slate-400">Current size: ${currentSize} | XP: ${currentXP}</p>
                </div>
            </div>
            
            <div class="space-y-3">
                <div class="flex items-center space-x-4">
                    <label class="text-slate-300">Fighters to add:</label>
                    <input type="number" inputmode="numeric"
                           id="replenish-count-${group.id}" 
                           value="0" 
                           min="0" 
                           max="10"
                           class="w-20 p-2 rounded bg-slate-700 border border-slate-600 text-white text-center"
                           data-henchmen-id="${group.id}">
                </div>
                
                <div class="text-sm space-y-1">
                    <div class="flex justify-between">
                        <span class="text-slate-400">Base cost:</span>
                        <span id="replenish-base-${group.id}" class="text-yellow-200">${group.cost || 0} GC</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">Equipment cost:</span>
                        <span id="replenish-equip-${group.id}" class="text-yellow-200">0 GC</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">XP cost (${currentXP} XP):</span>
                        <span id="replenish-xp-${group.id}" class="text-yellow-200">${currentXP * 2} GC</span>
                    </div>
                    <div class="flex justify-between font-bold border-t border-slate-600 pt-1 mt-1">
                        <span class="text-slate-200">Cost per fighter:</span>
                        <span id="replenish-per-${group.id}" class="text-mordheim-gold">0 GC</span>
                    </div>
                    <div class="flex justify-between font-bold">
                        <span class="text-slate-200">Total for this group:</span>
                        <span id="replenish-group-total-${group.id}" class="text-mordheim-gold">0 GC</span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(groupDiv);

        // Calculate initial costs for this group
        const equipmentCost = calculateEquipmentCost(adjustEquipmentCosts(group.equipment || []));
        const experienceCost = currentXP * 2;
        const perFighterCost = (group.cost || 0) + equipmentCost + experienceCost;

        // Update cost displays
        document.getElementById(`replenish-equip-${group.id}`).textContent = `${equipmentCost} GC`;
        document.getElementById(`replenish-per-${group.id}`).textContent = `${perFighterCost} GC`;

        // Add event listener for count input
        const countInput = groupDiv.querySelector(`#replenish-count-${group.id}`);
        countInput.addEventListener('input', () => updateReplenishmentDisplay());
        countInput.addEventListener('focus', () => countInput.select());
    });
}

/**
 * Updates the replenishment display with current selections
 */
function updateReplenishmentDisplay() {
    // Get veteran pool value
    const veteranInput = document.getElementById('veteran-pool-input');
    veteranPool = parseInt(veteranInput?.value) || 0;

    // Reset calculations
    replenishmentSelections.clear();
    totalReplenishmentCost = 0;
    let remainingVeteranPool = veteranPool;

    // Get all henchmen groups
    const henchmenGroups = currentWarband.members.filter(m => m.type === 'Henchman');

    henchmenGroups.forEach(group => {
        const countInput = document.getElementById(`replenish-count-${group.id}`);
        const countToAdd = parseInt(countInput?.value) || 0;

        if (countToAdd > 0) {
            const currentXP = group.xp || 0;
            const equipmentCost = calculateEquipmentCost(adjustEquipmentCosts(group.equipment || []));
            const baseCost = group.cost || 0;

            // Veteran pool is an availability cap only — all XP always costs 2 GC per point
            const totalXPCost = currentXP * countToAdd;
            remainingVeteranPool -= totalXPCost;

            // Total cost: base + equipment + (XP × 2 GC) per fighter
            const experienceCost = currentXP * 2;
            const perFighterCost = baseCost + equipmentCost + experienceCost;
            const groupTotalCost = perFighterCost * countToAdd;

            // Store selection
            replenishmentSelections.set(group.id, {
                count: countToAdd,
                cost: groupTotalCost,
                xpUsed: totalXPCost // XP points used from pool (for availability tracking)
            });

            totalReplenishmentCost += groupTotalCost;

            // Update group displays
            document.getElementById(`replenish-group-total-${group.id}`).textContent = `${groupTotalCost} GC`;
        } else {
            // Reset display if no fighters to add
            document.getElementById(`replenish-group-total-${group.id}`).textContent = '0 GC';
            replenishmentSelections.delete(group.id);
        }
    });

    // Update total display
    const totalCostDisplay = document.getElementById('replenish-total-cost');
    if (totalCostDisplay) {
        totalCostDisplay.textContent = `${totalReplenishmentCost} GC`;
    }

    // Update veteran pool remaining display
    const veteranRemainingDisplay = document.getElementById('veteran-pool-remaining');
    const setBtn = document.getElementById('set-replenish-btn');
    if (veteranRemainingDisplay) {
        veteranRemainingDisplay.textContent = `${remainingVeteranPool} XP`;

        // Turn red and disable set button if veteran pool is negative
        if (remainingVeteranPool < 0) {
            veteranRemainingDisplay.classList.remove('text-yellow-200');
            veteranRemainingDisplay.classList.add('text-red-400');
            if (setBtn) {
                setBtn.disabled = true;
                setBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        } else {
            veteranRemainingDisplay.classList.remove('text-red-400');
            veteranRemainingDisplay.classList.add('text-yellow-200');
            if (setBtn) {
                setBtn.disabled = false;
                setBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
    }

    // Calculate minimum treasure needed
    updateTreasureRequirement();
}

/**
 * Updates the treasure requirement display
 */
function updateTreasureRequirement() {
    if (totalReplenishmentCost === 0) {
        const treasureReqDisplay = document.getElementById('treasure-requirement');
        if (treasureReqDisplay) {
            treasureReqDisplay.textContent = '0 shards';
        }
        return;
    }

    // Get available treasury
    const availableTreasury = currentWarband.gc_treasury || 0;
    const costCoveredByTreasury = Math.min(availableTreasury, totalReplenishmentCost);
    const remainingCost = totalReplenishmentCost - costCoveredByTreasury;

    const treasureReqDisplay = document.getElementById('treasure-requirement');
    if (treasureReqDisplay) {
        if (remainingCost <= 0) {
            // Treasury covers the full cost
            treasureReqDisplay.textContent = `0 shards (covered by treasury)`;
        } else {
            // Calculate minimum treasure needed for remaining cost
            const warbandSize = currentWarband.members.length;
            let treasureNeeded = 1;

            // Find the minimum treasure that would provide enough gold
            const warbandSizeValue = getWarbandSizeValue(warbandSize);

            // Try increasing treasure count until we get enough gold
            for (let shards = 1; shards <= 12; shards++) {
                const totalValue = getTreasureSellingValue(shards, warbandSizeValue);
                if (totalValue >= remainingCost) {
                    treasureNeeded = shards;
                    break;
                }
            }

            treasureReqDisplay.textContent = `${treasureNeeded}+ shards (${costCoveredByTreasury} GC covered by treasury)`;
        }
    }
}

/**
 * Gets the warband size value for treasure calculation
 */
function getWarbandSizeValue(warbandSize) {
    if (warbandSize >= 16) return 16;
    if (warbandSize >= 13) return 14;
    if (warbandSize >= 10) return 11;
    if (warbandSize >= 7) return 8;
    if (warbandSize >= 4) return 5;
    return 2;
}

/**
 * Sets the replenishment changes and closes the modal
 */
export function setReplenishmentChanges() {
    // Check if veteran pool is negative
    const veteranInput = document.getElementById('veteran-pool-input');
    const veteranPoolValue = parseInt(veteranInput?.value) || 0;
    let remainingPool = veteranPoolValue;

    // Calculate actual remaining pool based on selections (in XP points)
    replenishmentSelections.forEach((selection) => {
        remainingPool -= selection.xpUsed;
    });

    if (remainingPool < 0) {
        showMessage('Cannot set changes: Veteran pool is negative. Reduce fighter additions or increase veteran pool.', 'error');
        return;
    }

    // Store selections globally for the sell treasure modal to access
    window.pendingReplenishment = {
        veteranPool: veteranPool,
        selections: Object.fromEntries(replenishmentSelections),
        totalCost: totalReplenishmentCost
    };

    // Close modal
    hideModal('replenish-henchmen-modal');

    // Notify sell treasure modal to update its display
    if (typeof window.updateSellTreasureWithReplenishment === 'function') {
        window.updateSellTreasureWithReplenishment();
    }

    showMessage('Replenishment changes set. Sell treasure to apply changes.', 'success');
}

/**
 * Closes the replenishment modal without saving
 */
export function closeReplenishModal() {
    // Clear selections
    replenishmentSelections.clear();
    totalReplenishmentCost = 0;
    delete window.pendingReplenishment;

    // Clean up event listener
    const veteranInput = document.getElementById('veteran-pool-input');
    if (veteranInput) {
        veteranInput.removeEventListener('input', updateReplenishmentDisplay);
    }

    hideModal('replenish-henchmen-modal');
}

/**
 * Gets the current replenishment selections
 */
export function getReplenishmentSelections() {
    return window.pendingReplenishment || null;
}

/**
 * Clears the replenishment selections
 */
export function clearReplenishmentSelections() {
    delete window.pendingReplenishment;
}

// Export functions for global access
window.showReplenishHenchmenModal = showReplenishHenchmenModal;
window.setReplenishmentChanges = setReplenishmentChanges;
window.closeReplenishModal = closeReplenishModal;
