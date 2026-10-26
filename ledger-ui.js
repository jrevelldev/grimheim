// Ledger UI Management
// Handles all ledger-related UI functionality

import { currentWarband } from './state.js';
import { 
    getLedgerSummary, 
    getLedgerEntriesByGame, 
    recordManualIncome, 
    recordManualExpense,
    formatTransactionAmount,
    getCategoryDisplayName,
    TRANSACTION_TYPES,
    getGroupedTransactions,
    hasUpkeepBeenPaidForPhase,
    payUpkeepCosts
} from './Treasury/ledger.js';
import { showMessage, displayModal, hideModal, getOriginalName } from './utility.js';
import { HIRED_SWORDS } from './data/hired_swords.js';
import { DRAMATIS_PERSONAE } from './data/dramatis_personae.js';

/**
 * Calculates total upkeep costs for all Hired Swords and Dramatis Personae in the warband
 * @returns {Object} Object with gc_total and treasure_total properties
 */
function calculateTotalUpkeepCosts() {
    if (!currentWarband?.members) {
        return { gc_total: 0, treasure_total: 0 };
    }

    let gcTotal = 0;
    let treasureTotal = 0;

    currentWarband.members.forEach(member => {
        if (member.type === 'Hired Sword') {
            const lookupName = getOriginalName(member, HIRED_SWORDS);
            const hiredSwordData = HIRED_SWORDS.flatMap(g => g.characters)
                .find(c => c.name === lookupName);
            
            if (hiredSwordData?.data) {
                const specialUpkeepTreasure = hiredSwordData.data.special_upkeep_treasure || 0;
                const upkeepFee = hiredSwordData.data.upkeep_fee || 0;
                
                if (specialUpkeepTreasure > 0) {
                    treasureTotal += parseInt(specialUpkeepTreasure);
                } else {
                    gcTotal += parseInt(upkeepFee);
                }
            }
        } else if (member.type === 'Dramatis Personae') {
            const lookupName = getOriginalName(member, DRAMATIS_PERSONAE);
            const dramatisPersonaeData = DRAMATIS_PERSONAE.flatMap(g => g.characters)
                .find(c => c.name === lookupName);
            
            if (dramatisPersonaeData?.data?.upkeep_fee) {
                gcTotal += parseInt(dramatisPersonaeData.data.upkeep_fee);
            }
        }
    });

    return { gc_total: gcTotal, treasure_total: treasureTotal };
}

/**
 * Shows the ledger modal
 */
export function showLedgerModal() {
    if (!currentWarband) return;
    
    // Setup event listeners for modal
    setupLedgerEventListeners();
    
    // Render ledger content
    renderLedgerTab();
    
    // Show modal
    displayModal('ledger-modal');
}

/**
 * Renders the ledger tab content
 */
export function renderLedgerTab() {
    if (!currentWarband) return;

    // Update summary cards
    updateLedgerSummary();

    // Update game filter options
    updateGameFilter();

    // Render transaction list
    renderTransactionList();
}

/**
 * Updates the ledger summary cards
 */
function updateLedgerSummary() {
    const summary = getLedgerSummary();
    const upkeepCosts = calculateTotalUpkeepCosts();
    
    document.getElementById('total-income').textContent = summary.total_income;
    document.getElementById('total-expenses').textContent = summary.total_expenses;
    document.getElementById('net-total').textContent = summary.net_total;
    
    // Display total upkeep costs
    let upkeepDisplay = '';
    if (upkeepCosts.gc_total > 0 && upkeepCosts.treasure_total > 0) {
        upkeepDisplay = `${upkeepCosts.gc_total} CO, ${upkeepCosts.treasure_total} Tesoro`;
    } else if (upkeepCosts.gc_total > 0) {
        upkeepDisplay = `${upkeepCosts.gc_total} CO`;
    } else if (upkeepCosts.treasure_total > 0) {
        upkeepDisplay = `${upkeepCosts.treasure_total} Tesoro`;
    } else {
        upkeepDisplay = '0';
    }
    document.getElementById('total-upkeep').textContent = upkeepDisplay;
    
    // Update Pay Upkeep button state based on available funds
    const payUpkeepBtn = document.getElementById('pay-upkeep-btn');
    const currentGC = currentWarband.gc_treasury || 0;
    const currentTreasure = currentWarband.treasure || 0;
    const totalUpkeepCost = upkeepCosts.gc_total + upkeepCosts.treasure_total;
    
    if (totalUpkeepCost === 0) {
        // No upkeep costs - disable button
        payUpkeepBtn.disabled = true;
        payUpkeepBtn.className = 'absolute top-1 right-1 px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-50 cursor-not-allowed';
        payUpkeepBtn.title = 'No hay costes de mantenimiento que pagar';
    } else if (upkeepCosts.gc_total > currentGC || upkeepCosts.treasure_total > currentTreasure) {
        // Insufficient funds - disable button with warning style
        payUpkeepBtn.disabled = true;
        payUpkeepBtn.className = 'absolute top-1 right-1 px-2 py-1 bg-red-700 text-white text-xs rounded opacity-75 cursor-not-allowed';
        payUpkeepBtn.title = 'Fondos insuficientes para pagar mantenimiento';
    } else {
        // Sufficient funds - enable button
        payUpkeepBtn.disabled = false;
        payUpkeepBtn.className = 'absolute top-1 right-1 px-2 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition';
        payUpkeepBtn.title = 'Pagar costes de mantenimiento';
    }
    
    // Color code the net total
    const netElement = document.getElementById('net-total');
    if (summary.net_total > 0) {
        netElement.className = 'text-lg font-bold text-green-400';
    } else if (summary.net_total < 0) {
        netElement.className = 'text-lg font-bold text-red-400';
    } else {
        netElement.className = 'text-lg font-bold text-mordheim-gold';
    }
}

/**
 * Updates the game filter dropdown
 */
function updateGameFilter() {
    if (!currentWarband?.ledger_entries) return;

    const filterSelect = document.getElementById('ledger-game-filter');
    const games = new Set();
    
    // Add all game numbers from transactions
    currentWarband.ledger_entries.forEach(entry => {
        games.add(entry.games_played);
    });
    
    // Clear existing options (except "All Games")
    filterSelect.innerHTML = '<option value="all">Todas las partidas</option>';
    
    // Add game options in order
    Array.from(games).sort((a, b) => a - b).forEach(game => {
        const option = document.createElement('option');
        option.value = game;
        option.textContent = game === 0 ? 'Antes de la Partida' : `Partida ${game}`;
        filterSelect.appendChild(option);
    });
}

/**
 * Renders the transaction list
 */
function renderTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    const filterValue = document.getElementById('ledger-game-filter').value;
    
    let transactions;
    if (filterValue === 'all') {
        transactions = currentWarband?.ledger_entries || [];
    } else {
        const gameNumber = parseInt(filterValue);
        transactions = getLedgerEntriesByGame(gameNumber);
    }
    
    if (transactions.length === 0) {
        transactionList.innerHTML = `
            <div class="text-center text-slate-500 py-4">
                <i class="fas fa-receipt text-2xl mb-2"></i>
                <p class="text-sm">No se han encontrado transacciones</p>
            </div>
        `;
        return;
    }
    
    // Get grouped transactions
    const groupedTransactions = getGroupedTransactions(transactions);
    
    // Sort by date (newest first)
    const sortedTransactions = [...groupedTransactions].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    transactionList.innerHTML = sortedTransactions.map(transaction => 
        renderTransactionItem(transaction)
    ).join('');
}

/**
 * Renders a single transaction item
 */
function renderTransactionItem(transaction) {
    const isIncome = transaction.type === TRANSACTION_TYPES.INCOME;
    const amountClass = isIncome ? 'text-green-400' : 'text-red-400';
    const icon = isIncome ? 'fa-arrow-up' : 'fa-arrow-down';
    
    const date = new Date(transaction.date);
    const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const gameLabel = transaction.games_played === 0 ? 'Antes de la Partida' : `Partida ${transaction.games_played}`;
    
    // Check if this is a hire transaction with equipment
    const hasEquipment = transaction.equipment && transaction.equipment.length > 0;
    const equipmentTotal = hasEquipment ? 
        transaction.equipment.reduce((sum, eq) => sum + eq.amount, 0) : 0;
    
    if (isIncome) {
        // Income: everything aligned to the right
        let html = `
            <div class="bg-slate-700 p-2 rounded-lg text-sm">
                <div class="flex justify-end items-start">
                    <div class="text-right">
                        <div class="flex items-center justify-end space-x-2 mb-1">
                            <span class="text-xs text-slate-500">${gameLabel}</span>
                            <i class="fas ${icon} ${amountClass} text-xs"></i>
                            <span class="font-medium ${amountClass}">${formatTransactionAmount(transaction)}</span>
                        </div>
                        <p class="text-slate-300 text-xs">${transaction.description}</p>
                        <p class="text-slate-500 text-xs">${getCategoryDisplayName(transaction.category)} • ${dateStr}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add equipment subsections if present
        if (hasEquipment) {
            html += renderEquipmentSubsections(transaction.equipment, true);
        }
        
        return html;
    } else {
        // Expense: keep original layout with amount on left
        let equipmentInfo = '';
        if (hasEquipment) {
            equipmentInfo = `
                <div class="text-xs text-slate-400 mb-1">
                    <i class="fas fa-toolbox text-xs mr-1"></i>
                    Incluye ${transaction.equipment.length} objeto${transaction.equipment.length > 1 ? 's' : ''} de equipo (${equipmentTotal} CO)
                </div>
            `;
        }
        
        let html = `
            <div class="bg-slate-700 p-2 rounded-lg text-sm">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <i class="fas ${icon} ${amountClass} text-xs"></i>
                            <span class="font-medium ${amountClass}">${formatTransactionAmount(transaction)}</span>
                            <span class="text-xs text-slate-500">${gameLabel}</span>
                        </div>
                        ${equipmentInfo}
                        <p class="text-slate-300 text-xs">${transaction.description}</p>
                        <p class="text-slate-500 text-xs">${getCategoryDisplayName(transaction.category)} • ${dateStr}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add equipment subsections if present
        if (hasEquipment) {
            html += renderEquipmentSubsections(transaction.equipment, false);
        }
        
        return html;
    }
}

/**
 * Renders equipment subsections for a hire transaction
 */
function renderEquipmentSubsections(equipment, isIncomeParent) {
    return equipment.map(eq => {
        const eqDate = new Date(eq.date);
        const eqDateStr = eqDate.toLocaleDateString() + ' ' + eqDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const eqGameLabel = eq.games_played === 0 ? 'Antes de la Partida' : `Partida ${eq.games_played}`;
        
        return `
            <div class="bg-slate-600 p-2 rounded-lg text-sm ml-4 mr-2 mt-1 border-l-2 border-slate-500">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2 mb-1">
                            <i class="fas fa-toolbox text-red-400 text-xs"></i>
                            <span class="font-medium text-red-400">-${eq.amount} CO</span>
                            <span class="text-xs text-slate-400">${eqGameLabel}</span>
                        </div>
                        <p class="text-slate-300 text-xs">${eq.description}</p>
                        <p class="text-slate-400 text-xs">${getCategoryDisplayName(eq.category)} • ${eqDateStr}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Switches to the ledger tab (deprecated - kept for compatibility)
 */
export function switchToLedgerTab() {
    // Redirect to modal instead
    showLedgerModal();
}

/**
 * Sets up ledger modal event listeners
 */
export function setupLedgerEventListeners() {
    // View ledger button click (handled in event-handlers.js)
    
    // Close modal button
    const closeLedgerBtn = document.getElementById('close-ledger-modal-btn');
    if (closeLedgerBtn && !closeLedgerBtn.hasAttribute('data-listener-added')) {
        closeLedgerBtn.addEventListener('click', () => {
            hideModal('ledger-modal');
        });
        closeLedgerBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Game filter change
    const gameFilter = document.getElementById('ledger-game-filter');
    if (gameFilter && !gameFilter.hasAttribute('data-listener-added')) {
        gameFilter.addEventListener('change', renderTransactionList);
        gameFilter.setAttribute('data-listener-added', 'true');
    }
    
    // Clear filter button
    const clearFilterBtn = document.getElementById('clear-ledger-filter');
    if (clearFilterBtn && !clearFilterBtn.hasAttribute('data-listener-added')) {
        clearFilterBtn.addEventListener('click', () => {
            gameFilter.value = 'all';
            renderTransactionList();
        });
        clearFilterBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Add transaction button
    const addTransactionBtn = document.getElementById('add-transaction-btn');
    if (addTransactionBtn && !addTransactionBtn.hasAttribute('data-listener-added')) {
        addTransactionBtn.addEventListener('click', async () => {
            const type = document.getElementById('transaction-type').value;
            const amount = parseInt(document.getElementById('transaction-amount').value) || 0;
            const description = document.getElementById('transaction-description').value.trim();
            
            if (amount <= 0) {
                showMessage('Por favor, introduce una cantidad válida superior a 0.', 'error');
                return;
            }
            
            if (!description) {
                showMessage('Por favor, introduce una descripción.', 'error');
                return;
            }
            
            if (type === 'income') {
                await recordManualIncome(amount, description);
            } else {
                await recordManualExpense(amount, description);
            }
            
            // Clear form
            document.getElementById('transaction-amount').value = '';
            document.getElementById('transaction-description').value = '';
            
            // Refresh ledger display
            renderLedgerTab();
        });
        addTransactionBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Pay Upkeep button
    const payUpkeepBtn = document.getElementById('pay-upkeep-btn');
    if (payUpkeepBtn && !payUpkeepBtn.hasAttribute('data-listener-added')) {
        payUpkeepBtn.addEventListener('click', async () => {
            await handlePayUpkeep();
        });
        payUpkeepBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Upkeep confirmation modal buttons
    const cancelUpkeepBtn = document.getElementById('cancel-upkeep-payment-btn');
    if (cancelUpkeepBtn && !cancelUpkeepBtn.hasAttribute('data-listener-added')) {
        cancelUpkeepBtn.addEventListener('click', () => {
            hideModal('upkeep-confirmation-modal');
        });
        cancelUpkeepBtn.setAttribute('data-listener-added', 'true');
    }
    
    const confirmUpkeepBtn = document.getElementById('confirm-upkeep-payment-btn');
    if (confirmUpkeepBtn && !confirmUpkeepBtn.hasAttribute('data-listener-added')) {
        confirmUpkeepBtn.addEventListener('click', async () => {
            hideModal('upkeep-confirmation-modal');
            const result = await payUpkeepCosts(true); // Force payment
            if (result && result.success) {
                renderLedgerTab(); // Refresh the ledger display
            }
        });
        confirmUpkeepBtn.setAttribute('data-listener-added', 'true');
    }
    
    // Enter key support for transaction form
    const transactionDesc = document.getElementById('transaction-description');
    const transactionAmount = document.getElementById('transaction-amount');
    
    if (transactionDesc && !transactionDesc.hasAttribute('data-listener-added')) {
        transactionDesc.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTransactionBtn.click();
            }
        });
        transactionDesc.setAttribute('data-listener-added', 'true');
    }
    
    if (transactionAmount && !transactionAmount.hasAttribute('data-listener-added')) {
        transactionAmount.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                transactionDesc.focus();
            }
        });
        transactionAmount.setAttribute('data-listener-added', 'true');
    }
}

/**
 * Handles the Pay Upkeep button click
 */
async function handlePayUpkeep() {
    if (!currentWarband) {
        showMessage("Por favor, carga una banda primero.", 'error');
        return;
    }

    // First check if there are any upkeep costs
    const upkeepCosts = calculateTotalUpkeepCosts();
    const totalCost = upkeepCosts.gc_total + upkeepCosts.treasure_total;
    
    if (totalCost === 0) {
        showMessage("No hay costes de mantenimiento que pagar para los miembros actuales de la banda.", 'info');
        return;
    }

    // Check funds before attempting payment
    const currentGC = currentWarband.gc_treasury || 0;
    const currentTreasure = currentWarband.treasure || 0;
    
    let hasInsufficientFunds = false;
    if (upkeepCosts.gc_total > currentGC || upkeepCosts.treasure_total > currentTreasure) {
        hasInsufficientFunds = true;
        
        // Visual warning with cost breakdown
        const costBreakdown = [];
        if (upkeepCosts.gc_total > 0) {
            costBreakdown.push(`${upkeepCosts.gc_total} Coronas de Oro`);
        }
        if (upkeepCosts.treasure_total > 0) {
            costBreakdown.push(`${upkeepCosts.treasure_total} Tesoro`);
        }
        
        showMessage(`⚠️ ¡No se puede pagar el mantenimiento: Fondos insuficientes!`, 'error');
        showMessage(`Necesario: ${costBreakdown.join(' y ')}`, 'error');
        showMessage(`Disponible: ${currentGC} Coronas de Oro, ${currentTreasure} Tesoro`, 'error');
        return;
    }

    const result = await payUpkeepCosts();
    
    if (result && result.alreadyPaid) {
        // Show confirmation dialog
        const currentGames = currentWarband.games_played || 0;
        
        // Populate cost breakdown
        const breakdownDiv = document.getElementById('upkeep-cost-breakdown');
        const costBreakdown = [];
        if (upkeepCosts.gc_total > 0) {
            costBreakdown.push(`${upkeepCosts.gc_total} Coronas de Oro`);
        }
        if (upkeepCosts.treasure_total > 0) {
            costBreakdown.push(`${upkeepCosts.treasure_total} Tesoro`);
        }
        
        breakdownDiv.innerHTML = `
            <div class="text-slate-300 mb-2">
                <strong>Fase:</strong> ${currentGames === 0 ? 'Antes de la Partida' : `Partida ${currentGames}`}
            </div>
            <div class="text-slate-300">
                <strong>Costes:</strong> ${costBreakdown.join(' + ')}
            </div>
        `;
        
        displayModal('upkeep-confirmation-modal');
    } else if (result && result.success) {
        // Payment successful, refresh display
        renderLedgerTab();
    }
}
