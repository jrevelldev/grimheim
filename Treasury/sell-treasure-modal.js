import { getTreasureSellingValue, SELLING_TREASURE_VALUES } from './selling_treasure.js';
import { displayModal, hideModal } from '../utility.js';
import { renderWarbandEditor } from '../ui.js';
import { STATS_FIELDS } from '../config.js';
import { setCurrentWarband, currentWarband as globalCurrentWarband } from '../state.js';
import { createTransaction, addTransaction, TRANSACTION_TYPES, TRANSACTION_CATEGORIES } from './ledger.js';
import { getReplenishmentSelections, clearReplenishmentSelections } from '../End Battle/replenish-henchmen-modal.js';

// Local function to avoid import issues
const getWarbandDataLocal = (warband) => warband;

/**
 * Sell Treasure Modal Module
 * Handles the selling treasure modal functionality
 */

let modalWarband = null;
let currentTreasureCount = 0;

/**
 * Opens the sell treasure modal
 * @param {Object} warband - Current warband object
 * @param {number} treasureCount - Number of treasure shards to sell
 */
export function openSellTreasureModal(warband, treasureCount) {
    modalWarband = warband;
    currentTreasureCount = treasureCount;
    
    initializeModal();
    populateTreasureTable();
    displayModal('sell-treasure-modal');
}

/**
 * Initializes the modal with default values
 */
function initializeModal() {
    if (!modalWarband) return;

    // Set default warband size based on actual warband size
    const actualWarbandSize = modalWarband.members ? modalWarband.members.length : 1;
    const warbandSizeSelect = document.getElementById('warband-size-select');
    const modalWarbandSizeDisplay = document.getElementById('current-warband-size');

    if (warbandSizeSelect) {
        // Determine the correct range based on actual warband size
        let defaultValue;
        if (actualWarbandSize >= 16) {
            defaultValue = "16"; // 16+ warriors
        } else if (actualWarbandSize >= 13) {
            defaultValue = "14"; // 13-15 warriors
        } else if (actualWarbandSize >= 10) {
            defaultValue = "11"; // 10-12 warriors
        } else if (actualWarbandSize >= 7) {
            defaultValue = "8"; // 7-9 warriors
        } else if (actualWarbandSize >= 4) {
            defaultValue = "5"; // 4-6 warriors
        } else {
            defaultValue = "2"; // 1-3 warriors
        }

        warbandSizeSelect.value = defaultValue;

        // Update current warband size display
        if (modalWarbandSizeDisplay) {
            modalWarbandSizeDisplay.textContent = actualWarbandSize;
        }

        // Update the display when warband size changes
        warbandSizeSelect.addEventListener('change', () => {
            populateTreasureTable();
            updateSellButtonState();
        });
    }

    // Set max treasure input and update available treasure display
    const treasureInput = document.getElementById('treasure-to-sell');
    const availableTreasureDisplay = document.getElementById('available-treasure');
    const sellBtn = document.getElementById('sell-treasure-btn');
    if (treasureInput) {
        treasureInput.max = currentTreasureCount;
        treasureInput.value = 0; // Default to 0 to allow selling no treasure

        // Update available treasure display
        if (availableTreasureDisplay) {
            availableTreasureDisplay.textContent = currentTreasureCount;
        }

        // Update calculations when treasure amount changes
        treasureInput.addEventListener('input', () => {
            updateValuePerTreasure();
            updateSellButtonState();
        });
    }

    // Reset sell button to default behavior
    if (sellBtn) {
        sellBtn.textContent = 'Vender Tesoro';
        sellBtn.onclick = showSellConfirmation;
    }

    // Check for existing replenishment selections and update display
    updateSellTreasureWithReplenishment();
}

/**
 * Populates the treasure selling table with current values
 */
function populateTreasureTable() {
    const warbandSize = parseInt(document.getElementById('warband-size-select')?.value) || 1;
    const tableBody = document.getElementById('treasure-table-body');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Generate rows for each possible treasure amount (1-8+)
    for (let shards = 1; shards <= 8; shards++) {
        if (shards > currentTreasureCount) break; // Only show up to available treasure
        
        const value = getTreasureSellingValue(shards, warbandSize);
        // For value per treasure, use 8 as divisor for any amount 8 or higher
        const divisor = shards >= 8 ? 8 : shards;
        const valuePerTreasure = (value / divisor).toFixed(2);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${shards}</td>
            <td>${value} CO</td>
            <td>${valuePerTreasure} CO/tesoro</td>
        `;
        
        tableBody.appendChild(row);
    }
    
    updateValuePerTreasure();
}

/**
 * Updates the value per treasure display
 */
function updateValuePerTreasure() {
    const treasureInput = document.getElementById('treasure-to-sell');
    const warbandSizeSelect = document.getElementById('warband-size-select');
    const valuePerTreasureDisplay = document.getElementById('value-per-treasure-display');
    
    if (!treasureInput || !warbandSizeSelect || !valuePerTreasureDisplay) return;
    
    const treasureToSell = parseInt(treasureInput.value) || 0;
    const warbandSizeValue = parseInt(warbandSizeSelect.value) || 1;
    
    if (treasureToSell > 0) {
        const totalValue = getTreasureSellingValue(treasureToSell, warbandSizeValue);
        // For value per treasure, use 8 as divisor for any amount 8 or higher
        const divisor = treasureToSell >= 8 ? 8 : treasureToSell;
        const valuePerTreasure = (totalValue / divisor).toFixed(2);
        valuePerTreasureDisplay.textContent = `${valuePerTreasure} CO por tesoro`;
    } else {
        valuePerTreasureDisplay.textContent = '0 CO por tesoro';
    }
}


/**
 * Shows the sell confirmation modal
 */
export function showSellConfirmation() {
    const treasureInput = document.getElementById('treasure-to-sell');
    const warbandSizeSelect = document.getElementById('warband-size-select');

    if (!treasureInput || !warbandSizeSelect) return;

    const treasureToSell = parseInt(treasureInput.value) || 0;
    const warbandSizeValue = parseInt(warbandSizeSelect.value) || 1;

    if (treasureToSell < 0) {
        showMessage('Por favor, introduce un número válido de tesoro para vender.', 'error');
        return;
    }

    if (treasureToSell > currentTreasureCount) {
        showMessage(`Solo tienes disponibles ${currentTreasureCount} fragmento(s) de piedra bruja.`, 'error');
        return;
    }

    const totalValue = getTreasureSellingValue(treasureToSell, warbandSizeValue);
    
    // Get the selected range text for display
    const selectedOption = warbandSizeSelect.options[warbandSizeSelect.selectedIndex];
    const warbandSizeText = selectedOption ? selectedOption.text.split(' ')[0] : 'Desconocido';
    
    // Update confirmation modal content
    const confirmationContent = document.getElementById('sell-confirmation-content');
    if (confirmationContent) {
        confirmationContent.innerHTML = `
            <div class="space-y-3">
                <p><strong>Tesoro a vender:</strong> ${treasureToSell} fragmentos</p>
                <p><strong>Tamaño de la banda:</strong> ${warbandSizeText}</p>
                <p><strong>Oro a recibir:</strong> ${totalValue} CO</p>
                <p class="text-sm text-slate-400">Esto eliminará ${treasureToSell} de tesoro de tu banda y añadirá ${totalValue} CO.</p>
            </div>
        `;
    }
    
    // Show confirmation modal
    displayModal('sell-treasure-confirmation-modal');
    
    // Store sale data for confirmation
    window.pendingTreasureSale = { treasureToSell, totalValue };
}

/**
 * Executes the treasure sale
 * @param {number} treasureSold - Number of treasure shards sold
 * @param {number} goldReceived - Amount of gold received
 */
async function executeSale(treasureSold, goldReceived) {
    if (!modalWarband) {
        showMessage('No hay ninguna banda cargada.', 'error');
        return;
    }

    try {
        // If selling 0 treasure, skip the sale but continue with replenishment
        if (treasureSold === 0) {
            // No changes needed to warband for 0 treasure sale
            // Save warband to ensure any other changes are persisted
            const { saveWarband } = await import('../warband-service.js');
            await saveWarband();

            // Update the global state
            setCurrentWarband(modalWarband);
            currentTreasureCount = modalWarband.treasure || 0;

            showMessage('No se ha vendido tesoro.', 'info');

            // Close confirmation modal
            hideModal('sell-treasure-confirmation-modal');

            // Update available treasure display in the modal (if still open)
            const availableTreasureDisplay = document.getElementById('available-treasure');
            if (availableTreasureDisplay) {
                availableTreasureDisplay.textContent = currentTreasureCount;
            }

            // Update treasure input max and value (if still open)
            const treasureInput = document.getElementById('treasure-to-sell');
            if (treasureInput) {
                treasureInput.max = currentTreasureCount;
                if (parseInt(treasureInput.value) > currentTreasureCount) {
                    treasureInput.value = 0;
                }
            }

            // Refresh UI to show updated gold/treasure
            renderWarbandEditor(modalWarband, getWarbandDataLocal, STATS_FIELDS);

            return;
        }

        // Update the global warband data directly
        modalWarband.treasure = Math.max(0, (modalWarband.treasure || 0) - treasureSold);
        modalWarband.gc_treasury = (modalWarband.gc_treasury || 0) + goldReceived;

        // Record the treasure sale transaction in the ledger
        const transaction = createTransaction(
            TRANSACTION_TYPES.INCOME,
            TRANSACTION_CATEGORIES.TREASURE_SALE,
            goldReceived,
            `Vendidos ${treasureSold} fragmento(s) de piedra bruja`,
            {
                treasure_sold: treasureSold,
                gold_received: goldReceived
            }
        );
        addTransaction(transaction);

        // Save warband (uses the global modalWarband from state.js)
        const { saveWarband } = await import('../warband-service.js');
        await saveWarband();

        // Update the global state with the modified warband
        setCurrentWarband(modalWarband);
        currentTreasureCount = modalWarband.treasure || 0;

        showMessage(`¡Se han vendido con éxito ${treasureSold} de tesoro por ${goldReceived} CO!`, 'success');

        // Close confirmation modal
        hideModal('sell-treasure-confirmation-modal');

        // Update available treasure display in the modal (if still open)
        const availableTreasureDisplay = document.getElementById('available-treasure');
        if (availableTreasureDisplay) {
            availableTreasureDisplay.textContent = currentTreasureCount;
        }
                
        // Update treasure input max and value (if still open)
        const treasureInput = document.getElementById('treasure-to-sell');
        if (treasureInput) {
            treasureInput.max = currentTreasureCount;
            // If current input is greater than new available, adjust it
            if (parseInt(treasureInput.value) > currentTreasureCount) {
                treasureInput.value = 0;
            }
        }
                
        // Refresh UI to show updated gold/treasure
        renderWarbandEditor(modalWarband, getWarbandDataLocal, STATS_FIELDS);
                
    } catch (error) {
        console.error('Error executing treasure sale:', error);
        showMessage('Error al completar la venta de tesoro. Por favor, inténtalo de nuevo.', 'error');
    }
}

/**
 * Handles confirmation modal cancel button
 */
export function cancelSellConfirmation() {
    // Clear the replenishment-only flag if set
    if (window.pendingReplenishmentOnly) {
        delete window.pendingReplenishmentOnly;
    }
    hideModal('sell-treasure-confirmation-modal');
}

/**
 * Handles replenishment when treasury covers full cost (no treasure sale needed)
 */
export async function confirmReplenishmentOnly() {
    const replenishmentData = getReplenishmentSelections();
    if (!replenishmentData || replenishmentData.totalCost === 0) {
        return;
    }

    // Show confirmation modal
    const confirmationContent = document.getElementById('sell-confirmation-content');
    if (confirmationContent) {
        confirmationContent.innerHTML = `
            <div class="space-y-3">
                <p><strong>Acción:</strong> Actualizar grupos de secuaces</p>
                <p><strong>Coste total:</strong> ${replenishmentData.totalCost} CO</p>
                <p><strong>Cubierto por la tesorería:</strong> ${replenishmentData.totalCost} CO</p>
                <p><strong>Tesoro a vender:</strong> 0 fragmentos</p>
                <p class="text-sm text-slate-400">Esto deducirá ${replenishmentData.totalCost} CO de tu tesorería y actualizará tus grupos de secuaces.</p>
            </div>
        `;
    }

    // Show confirmation modal
    displayModal('sell-treasure-confirmation-modal');

    // Store that this is a replenishment-only action
    window.pendingReplenishmentOnly = true;
}

/**
 * Handles confirmation modal confirm button
 */
export async function confirmSellConfirmation() {
    // Check if this is a replenishment-only action (no treasure sale)
    if (window.pendingReplenishmentOnly) {
        // Apply replenishment changes directly
        await applyReplenishmentChanges();

        // Clear replenishment selections
        clearReplenishmentSelections();

        // Clear the flag
        delete window.pendingReplenishmentOnly;

        // Close both modals
        hideModal('sell-treasure-confirmation-modal');
        closeSellTreasureModal();
        return;
    }

    // Regular treasure sale flow
    if (!window.pendingTreasureSale) return;

    const { treasureToSell, totalValue } = window.pendingTreasureSale;
    await executeSale(treasureToSell, totalValue);

    // Apply replenishment changes if applicable
    await applyReplenishmentChanges();

    // Clear pending sale data and replenishment selections
    delete window.pendingTreasureSale;
    clearReplenishmentSelections();

    // Close both modals
    hideModal('sell-treasure-confirmation-modal');
    closeSellTreasureModal();
}

/**
 * Closes the sell treasure modal
 */
export function closeSellTreasureModal() {
    hideModal('sell-treasure-modal');

    // Clean up event listeners
    const warbandSizeSelect = document.getElementById('warband-size-select');
    const treasureInput = document.getElementById('treasure-to-sell');

    if (warbandSizeSelect) {
        warbandSizeSelect.removeEventListener('change', populateTreasureTable);
    }

    if (treasureInput) {
        treasureInput.removeEventListener('input', updateValuePerTreasure);
    }

    // Clear replenishment selections when modal is closed
    clearReplenishmentSelections();
}

/**
 * Shows a message to the user (fallback if global showMessage not available)
 * @param {string} message - Message to display
 * @param {string} type - Type of message (success, error, info)
 */
function showMessage(message, type = 'info') {
    // Try to use global showMessage if available
    if (typeof window.showMessage === 'function') {
        window.showMessage(message, type);
        return;
    }
    
    // Fallback to alert
    console.log(`[${type.toUpperCase()}] ${message}`);
    if (type === 'error') {
        alert(message);
    }
}

// Export functions for global access if needed
window.openSellTreasureModal = openSellTreasureModal;
window.closeSellTreasureModal = closeSellTreasureModal;
window.showSellConfirmation = showSellConfirmation;
window.confirmReplenishmentOnly = confirmReplenishmentOnly;

/**
 * Updates the sell treasure modal with replenishment information
 */
export function updateSellTreasureWithReplenishment() {
    const replenishmentData = getReplenishmentSelections();

    if (!replenishmentData || replenishmentData.totalCost === 0) {
        // Hide replenishment info if no selections
        const replenishmentInfo = document.getElementById('replenishment-info');
        if (replenishmentInfo) {
            replenishmentInfo.classList.add('hidden');
        }

        // Reset button text
        const sellBtn = document.getElementById('sell-treasure-btn');
        if (sellBtn) {
            sellBtn.textContent = 'Vender Tesoro';
        }

        return;
    }

    // Show replenishment info
    const replenishmentInfo = document.getElementById('replenishment-info');
    if (replenishmentInfo) {
        replenishmentInfo.classList.remove('hidden');

        // Update cost display
        const costDisplay = document.getElementById('replenishment-cost-display');
        if (costDisplay) {
            costDisplay.textContent = `${replenishmentData.totalCost} CO`;
        }

        // Calculate how much is covered by treasury
        const availableTreasury = modalWarband.gc_treasury || 0;
        const costCoveredByTreasury = Math.min(availableTreasury, replenishmentData.totalCost);
        const remainingCost = replenishmentData.totalCost - costCoveredByTreasury;

        // Calculate minimum treasure needed for remaining cost
        const treasureNeeded = calculateMinimumTreasureNeeded(remainingCost);
        const treasureNeededDisplay = document.getElementById('treasure-needed-display');
        if (treasureNeededDisplay) {
            if (remainingCost <= 0) {
                treasureNeededDisplay.textContent = `0 fragmentos (cubierto por la tesorería)`;
            } else {
                treasureNeededDisplay.textContent = `${treasureNeeded}+ fragmentos (${costCoveredByTreasury} CO cubiertos por la tesorería)`;
            }
        }
    }

    // Check if current treasure selection is sufficient
    updateSellButtonState();
}

/**
 * Calculates minimum treasure needed based on cost
 */
function calculateMinimumTreasureNeeded(cost) {
    if (cost <= 0) return 0;

    const warbandSize = modalWarband?.members?.length || 1;
    let treasureNeeded = 1;

    // Try increasing treasure count until we get enough gold
    for (let shards = 1; shards <= 12; shards++) {
        const totalValue = getTreasureSellingValue(shards, getWarbandSizeValue(warbandSize));
        if (totalValue >= cost) {
            treasureNeeded = shards;
            break;
        }
    }

    return treasureNeeded;
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
 * Updates the sell button state based on treasure availability
 */
function updateSellButtonState() {
    const replenishmentData = getReplenishmentSelections();
    if (!replenishmentData || replenishmentData.totalCost === 0) {
        return;
    }

    const treasureInput = document.getElementById('treasure-to-sell');
    const warbandSizeSelect = document.getElementById('warband-size-select');
    const sellBtn = document.getElementById('sell-treasure-btn');

    if (!treasureInput || !warbandSizeSelect || !sellBtn) return;

    const treasureToSell = parseInt(treasureInput.value) || 0;
    const warbandSizeValue = parseInt(warbandSizeSelect.value) || 1;

    // Calculate how much is covered by treasury
    const availableTreasury = modalWarband.gc_treasury || 0;
    const costCoveredByTreasury = Math.min(availableTreasury, replenishmentData.totalCost);
    const remainingCost = replenishmentData.totalCost - costCoveredByTreasury;

    if (treasureToSell > 0) {
        const totalValue = getTreasureSellingValue(treasureToSell, warbandSizeValue);

        if (totalValue >= remainingCost) {
            sellBtn.textContent = 'Vender fragmentos y actualizar grupos de secuaces';
            sellBtn.onclick = showSellConfirmation;
        } else {
            sellBtn.textContent = 'Vender Tesoro';
            sellBtn.onclick = showSellConfirmation;
        }
    } else {
        // If no treasure being sold, check if treasury covers full cost
        if (remainingCost <= 0) {
            sellBtn.textContent = 'Actualizar grupos de secuaces (la tesorería cubre el coste)';
            sellBtn.onclick = confirmReplenishmentOnly;
        } else {
            sellBtn.textContent = 'Vender Tesoro';
            sellBtn.onclick = showSellConfirmation;
        }
    }
}

/**
 * Applies replenishment changes to the warband
 */
async function applyReplenishmentChanges() {
    const replenishmentData = getReplenishmentSelections();
    if (!replenishmentData || replenishmentData.totalCost === 0) {
        return;
    }

    try {
        // Check if treasury has enough gold
        if (modalWarband.gc_treasury < replenishmentData.totalCost) {
            showMessage(`Tesorería insuficiente. Se necesitan ${replenishmentData.totalCost} CO pero solo tienes ${modalWarband.gc_treasury} CO.`, 'error');
            return;
        }

        // Apply each replenishment selection
        for (const [henchmenId, selection] of Object.entries(replenishmentData.selections)) {
            const henchmen = modalWarband.members.find(m => m.id === henchmenId);
            if (henchmen && selection.count > 0) {
                // Increase group size
                henchmen.group_size = (henchmen.group_size || 1) + selection.count;
            }
        }

        // Calculate how much was covered by treasury before treasure sale (if any)
        const treasureSaleValue = window.pendingTreasureSale?.totalValue || 0;
        const originalTreasury = (modalWarband.gc_treasury || 0) - treasureSaleValue;
        const costCoveredByTreasury = Math.min(originalTreasury, replenishmentData.totalCost);
        const costCoveredByTreasureSale = replenishmentData.totalCost - costCoveredByTreasury;

        // Deduct cost from treasury
        modalWarband.gc_treasury = (modalWarband.gc_treasury || 0) - replenishmentData.totalCost;

        // Record the replenishment transaction in the ledger
        let description;
        if (costCoveredByTreasureSale > 0) {
            description = `Refuerzo de grupos de secuaces (${costCoveredByTreasury} CO de la tesorería, ${costCoveredByTreasureSale} CO de la venta de tesoro)`;
        } else {
            description = `Refuerzo de grupos de secuaces (${costCoveredByTreasury} CO de la tesorería)`;
        }

        const transaction = createTransaction(
            TRANSACTION_TYPES.EXPENSE,
            TRANSACTION_CATEGORIES.RECRUITMENT,
            replenishmentData.totalCost,
            description,
            {
                veteran_pool: replenishmentData.veteranPool,
                selections: replenishmentData.selections,
                treasury_coverage: costCoveredByTreasury,
                treasure_coverage: costCoveredByTreasureSale
            }
        );
        addTransaction(transaction);

        // Save warband to persist changes
        const { saveWarband } = await import('../warband-service.js');
        await saveWarband();

        // Update the global state with the modified warband
        setCurrentWarband(modalWarband);

        // Refresh UI to show updated warband
        renderWarbandEditor(modalWarband, getWarbandDataLocal, STATS_FIELDS);

        showMessage(`¡Se han reforzado con éxito los grupos de secuaces por ${replenishmentData.totalCost} CO!`, 'success');

    } catch (error) {
        console.error('Error applying replenishment changes:', error);
        showMessage('Error al aplicar los cambios de refuerzo. Por favor, inténtalo de nuevo.', 'error');
    }
}

// Make the update function globally accessible for the replenishment modal
window.updateSellTreasureWithReplenishment = updateSellTreasureWithReplenishment;
