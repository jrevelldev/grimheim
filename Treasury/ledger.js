// Ledger Management System
// Handles all financial transaction tracking for warbands

import { currentWarband } from '../state.js';
import { saveWarband } from '../warband-service.js';
import { showMessage, generateUUID, getOriginalName } from '../utility.js';

/**
 * Calculates total upkeep costs for all Hired Swords and Dramatis Personae
 * Separates Gold Crowns and Treasure costs
 * @param {Object} warband - Warband object (defaults to currentWarband)
 * @returns {Object} Object with gc_total and treasure_total properties
 */
async function calculateTotalUpkeepCosts(warband = currentWarband) {
    if (!warband?.members) {
        return { gc_total: 0, treasure_total: 0 };
    }

    let gcTotal = 0;
    let treasureTotal = 0;

    // Import data arrays dynamically
    const { HIRED_SWORDS } = await import('../data/hired_swords.js');
    const { DRAMATIS_PERSONAE } = await import('../data/dramatis_personae.js');

    warband.members.forEach(member => {
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
 * Transaction categories and types
 */
export const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense'
};

export const TRANSACTION_CATEGORIES = {
    HIRE_FEE: 'hire_fee',
    HIRE_FEE_TREASURE: 'hire_fee_treasure',
    UPKEEP: 'upkeep',
    UPKEEP_TREASURE: 'upkeep_treasure',
    EQUIPMENT_PURCHASE: 'equipment_purchase',
    EQUIPMENT_SELL: 'equipment_sell',
    SCENARIO_REWARD: 'scenario_reward',
    STARTING_TREASURY: 'starting_treasury',
    TREASURE_SALE: 'treasure_sale',
    TREASURE_FOUND: 'treasure_found',
    RECRUITMENT: 'recruitment',
    OTHER_INCOME: 'other_income',
    OTHER_EXPENSE: 'other_expense',
    BANDITRY: 'banditry',
    FIGHTER_REFUND: 'fighter_refund',
    FIGHTER_REFUND_TREASURE: 'fighter_refund_treasure'
};

/**
 * Creates a new transaction entry
 */
export function createTransaction(type, category, amount, description, details = {}) {
    return {
        id: generateUUID(),
        date: new Date().toISOString(),
        games_played: currentWarband?.games_played || 0,
        type,
        category,
        amount: parseInt(amount) || 0,
        description,
        details
    };
}

/**
 * Adds a transaction to the warband ledger
 */
export function addTransaction(transaction) {
    if (!currentWarband) {
        showMessage("Por favor, carga una banda primero.", 'error');
        return false;
    }

    // Initialize ledger fields if they don't exist
    if (!currentWarband.ledger_entries) {
        currentWarband.ledger_entries = [];
    }
    if (!currentWarband.total_income) {
        currentWarband.total_income = 0;
    }
    if (!currentWarband.total_expenses) {
        currentWarband.total_expenses = 0;
    }

    // Add the transaction
    currentWarband.ledger_entries.push(transaction);

    // Update running totals
    if (transaction.type === TRANSACTION_TYPES.INCOME) {
        currentWarband.total_income += transaction.amount;
    } else {
        currentWarband.total_expenses += transaction.amount;
    }

    return true;
}

/**
 * Calculates total upkeep costs for all hired swords and dramatis personae
 */
export function calculateUpkeepCosts(warband = currentWarband) {
    if (!warband || !warband.members) return 0;
    
    let totalUpkeep = 0;
    
    warband.members.forEach(member => {
        if (member.type === 'Hired Sword' || member.type === 'Dramatis Personae') {
            const upkeep = parseInt(member.upkeep_fee) || 0;
            totalUpkeep += upkeep;
        }
    });
    
    return totalUpkeep;
}

/**
 * Records automatic upkeep costs when games played increases
 */
export async function recordUpkeepCosts(previousGames, newGames) {
    if (!currentWarband || newGames <= previousGames) return;

    const upkeepCosts = calculateUpkeepCosts();
    
    if (upkeepCosts > 0) {
        const transaction = createTransaction(
            TRANSACTION_TYPES.EXPENSE,
            TRANSACTION_CATEGORIES.UPKEEP,
            upkeepCosts,
            `Costes de mantenimiento de la partida ${newGames}`,
            {
                previous_games: previousGames,
                new_games: newGames,
                members_count: currentWarband.members.filter(m => 
                    m.type === 'Hired Sword' || m.type === 'Dramatis Personae'
                ).length
            }
        );
        
        if (addTransaction(transaction)) {
            // Update treasury
            currentWarband.gc_treasury = Math.max(0, currentWarband.gc_treasury - upkeepCosts);
            await saveWarband();
            showMessage(`Costes de mantenimiento de ${upkeepCosts} CO deducidos para la partida ${newGames}`, 'info');
        }
    }
}

/**
 * Records a hire fee transaction
 */
export async function recordHireFee(characterName, hireFee, characterType, characterDetails = {}) {
    const transaction = createTransaction(
        TRANSACTION_TYPES.EXPENSE,
        TRANSACTION_CATEGORIES.HIRE_FEE,
        hireFee,
        `Hire fee: ${characterName}`,
        {
            character_name: characterName,
            character_type: characterType,
            related_equipment_ids: [],
            ...characterDetails
        }
    );
    
    if (addTransaction(transaction)) {
        await saveWarband();
        return transaction.id; // Return transaction ID for linking equipment
    }
    return null;
}

/**
 * Records a hire fee transaction paid with treasure
 */
export async function recordHireFeeTreasure(characterName, hireFee, characterType, characterDetails = {}) {
    const transaction = createTransaction(
        TRANSACTION_TYPES.EXPENSE,
        TRANSACTION_CATEGORIES.HIRE_FEE_TREASURE,
        hireFee,
        `Hire fee (treasure): ${characterName}`,
        {
            character_name: characterName,
            character_type: characterType,
            related_equipment_ids: [],
            ...characterDetails
        }
    );
    
    if (addTransaction(transaction)) {
        // Note: Treasure is already deducted in the validation logic in fighter-management.js
        // We only need to save the warband state here
        await saveWarband();
        return transaction.id; // Return transaction ID for linking equipment
    }
    return null;
}

/**
 * Records an equipment purchase transaction
 */
export async function recordEquipmentPurchase(equipmentName, cost, quantity = 1, parentTransactionId = null) {
    const transaction = createTransaction(
        TRANSACTION_TYPES.EXPENSE,
        TRANSACTION_CATEGORIES.EQUIPMENT_PURCHASE,
        cost * quantity,
        `Purchased ${quantity > 1 ? quantity + 'x ' : ''}${equipmentName}`,
        {
            equipment_name: equipmentName,
            quantity,
            unit_cost: cost,
            parent_transaction_id: parentTransactionId
        }
    );
    
    if (addTransaction(transaction)) {
        await saveWarband();
        return true;
    }
    return false;
}

/**
 * Records an equipment sale transaction
 */
export async function recordEquipmentSale(equipmentName, salePrice, quantity = 1) {
    const transaction = createTransaction(
        TRANSACTION_TYPES.INCOME,
        TRANSACTION_CATEGORIES.EQUIPMENT_SELL,
        salePrice * quantity,
        `Sold ${quantity > 1 ? quantity + 'x ' : ''}${equipmentName}`,
        {
            equipment_name: equipmentName,
            quantity,
            unit_price: salePrice
        }
    );
    
    if (addTransaction(transaction)) {
        await saveWarband();
        return true;
    }
    return false;
}

/**
 * Records a fighter refund transaction (pre-game deletion with refund)
 */
export async function recordFighterRefund(fighterName, gcAmount, treasureAmount = 0, details = {}) {
    let recorded = false;

    if (gcAmount > 0) {
        const gcTransaction = createTransaction(
            TRANSACTION_TYPES.INCOME,
            TRANSACTION_CATEGORIES.FIGHTER_REFUND,
            gcAmount,
            `Pre-game refund: ${fighterName}`,
            {
                fighter_name: fighterName,
                refund_type: 'gc',
                ...details
            }
        );
        if (addTransaction(gcTransaction)) {
            recorded = true;
        }
    }

    if (treasureAmount > 0) {
        const treasureTransaction = createTransaction(
            TRANSACTION_TYPES.INCOME,
            TRANSACTION_CATEGORIES.FIGHTER_REFUND_TREASURE,
            treasureAmount,
            `Pre-game refund (treasure): ${fighterName}`,
            {
                fighter_name: fighterName,
                refund_type: 'treasure',
                ...details
            }
        );
        if (addTransaction(treasureTransaction)) {
            recorded = true;
        }
    }

    if (recorded) {
        await saveWarband();
    }
    return recorded;
}

/**
 * Records a manual income transaction
 */
export async function recordManualIncome(amount, description, category = TRANSACTION_CATEGORIES.OTHER_INCOME) {
    const transaction = createTransaction(
        TRANSACTION_TYPES.INCOME,
        category,
        amount,
        description
    );
    
    if (addTransaction(transaction)) {
        await saveWarband();
        showMessage(`Ingreso de ${amount} CO registrado: ${description}`, 'success');
        return true;
    }
    return false;
}

/**
 * Records a manual expense transaction
 */
export async function recordManualExpense(amount, description, category = TRANSACTION_CATEGORIES.OTHER_EXPENSE) {
    const transaction = createTransaction(
        TRANSACTION_TYPES.EXPENSE,
        category,
        amount,
        description
    );
    
    if (addTransaction(transaction)) {
        await saveWarband();
        showMessage(`Gasto de ${amount} CO registrado: ${description}`, 'info');
        return true;
    }
    return false;
}

/**
 * Gets ledger entries filtered by game number
 */
export function getLedgerEntriesByGame(gameNumber = null) {
    if (!currentWarband?.ledger_entries) return [];
    
    if (gameNumber === null) {
        return currentWarband.ledger_entries;
    }
    
    return currentWarband.ledger_entries.filter(entry => entry.games_played === gameNumber);
}

/**
 * Gets ledger summary statistics
 */
export function getLedgerSummary() {
    if (!currentWarband) {
        return {
            total_income: 0,
            total_expenses: 0,
            net_total: 0,
            transaction_count: 0
        };
    }
    
    const total_income = currentWarband.total_income || 0;
    const total_expenses = currentWarband.total_expenses || 0;
    const transaction_count = currentWarband.ledger_entries?.length || 0;
    
    return {
        total_income,
        total_expenses,
        net_total: total_income - total_expenses,
        transaction_count
    };
}

/**
 * Initializes ledger for existing warbands (migration)
 */
export function initializeLedgerForWarband(warband) {
    if (!warband.ledger_entries) {
        warband.ledger_entries = [];
        warband.total_income = 0;
        warband.total_expenses = 0;
        
        // Add starting treasury transaction for existing warbands
        if (warband.gc_treasury > 0) {
            const startingTransaction = createTransaction(
                TRANSACTION_TYPES.INCOME,
                TRANSACTION_CATEGORIES.STARTING_TREASURY,
                warband.gc_treasury,
                'Starting treasury (migrated)',
                {
                    migrated: true,
                    migration_date: new Date().toISOString()
                }
            );
            warband.ledger_entries.push(startingTransaction);
            warband.total_income = warband.gc_treasury;
        }
    }
}

/**
 * Links an equipment transaction to a hire transaction
 */
export async function linkEquipmentToHire(equipmentTransactionId, hireTransactionId) {
    if (!currentWarband?.ledger_entries) return false;
    
    const hireTransaction = currentWarband.ledger_entries.find(t => t.id === hireTransactionId);
    const equipmentTransaction = currentWarband.ledger_entries.find(t => t.id === equipmentTransactionId);
    
    if (hireTransaction && equipmentTransaction) {
        // Add equipment ID to hire transaction's related_equipment_ids
        if (!hireTransaction.details.related_equipment_ids) {
            hireTransaction.details.related_equipment_ids = [];
        }
        hireTransaction.details.related_equipment_ids.push(equipmentTransactionId);
        
        // Add parent transaction ID to equipment transaction
        equipmentTransaction.details.parent_transaction_id = hireTransactionId;
        
        await saveWarband();
        return true;
    }
    return false;
}

/**
 * Gets transactions grouped by parent-child relationships
 */
export function getGroupedTransactions(transactions = null) {
    if (!transactions) {
        transactions = currentWarband?.ledger_entries || [];
    }
    
    const hireTransactions = transactions.filter(t => 
        t.category === TRANSACTION_CATEGORIES.HIRE_FEE || t.category === TRANSACTION_CATEGORIES.HIRE_FEE_TREASURE
    );
    
    const equipmentTransactions = transactions.filter(t => 
        t.category === TRANSACTION_CATEGORIES.EQUIPMENT_PURCHASE
    );
    
    const grouped = [];
    
    hireTransactions.forEach(hire => {
        const relatedEquipment = equipmentTransactions.filter(eq => 
            eq.details.parent_transaction_id === hire.id
        );
        
        grouped.push({
            ...hire,
            equipment: relatedEquipment
        });
    });
    
    // Add standalone transactions (those without parent-child relationships)
    const standaloneTransactions = transactions.filter(t => {
        // Include non-hire/non-equipment transactions
        if (t.category !== TRANSACTION_CATEGORIES.HIRE_FEE && 
            t.category !== TRANSACTION_CATEGORIES.HIRE_FEE_TREASURE &&
            t.category !== TRANSACTION_CATEGORIES.EQUIPMENT_PURCHASE) {
            return true;
        }
        
        // Include equipment transactions that don't have a parent
        if (t.category === TRANSACTION_CATEGORIES.EQUIPMENT_PURCHASE && 
            !t.details.parent_transaction_id) {
            return true;
        }
        
        // Exclude hire transactions that are already grouped
        if (t.category === TRANSACTION_CATEGORIES.HIRE_FEE || t.category === TRANSACTION_CATEGORIES.HIRE_FEE_TREASURE) {
            return false;
        }
        
        return false;
    });
    
    grouped.push(...standaloneTransactions);
    
    return grouped;
}

/**
 * Checks if upkeep has already been paid for a specific phase
 * @param {number} gamesPlayed - The games played number to check
 * @returns {boolean} True if upkeep has been paid for this phase
 */
export function hasUpkeepBeenPaidForPhase(gamesPlayed) {
    if (!currentWarband?.ledger_entries) return false;
    
    return currentWarband.ledger_entries.some(entry => 
        entry.category === TRANSACTION_CATEGORIES.UPKEEP && 
        entry.games_played === gamesPlayed
    );
}

/**
 * Gets upkeep payment details for a specific phase
 * @param {number} gamesPlayed - The games played number to check
 * @returns {Object|null} The upkeep transaction if found, null otherwise
 */
export function getUpkeepPaymentForPhase(gamesPlayed) {
    if (!currentWarband?.ledger_entries) return null;
    
    return currentWarband.ledger_entries.find(entry => 
        entry.category === TRANSACTION_CATEGORIES.UPKEEP && 
        entry.games_played === gamesPlayed
    );
}

/**
 * Processes upkeep payment with validation
 * @param {boolean} forcePayment - Force payment even if already paid
 */
export async function payUpkeepCosts(forcePayment = false) {
    if (!currentWarband) {
        showMessage("Por favor, carga una banda primero.", 'error');
        return false;
    }

    const currentGames = currentWarband.games_played || 0;
    
    // Use a simple calculation based on member data
    const totalUpkeepCosts = await calculateTotalUpkeepCosts();
    const totalCost = totalUpkeepCosts.gc_total + totalUpkeepCosts.treasure_total;
    
    if (totalCost === 0) {
        showMessage("No hay costes de mantenimiento que pagar.", 'info');
        return false;
    }

    // Check if already paid for this phase
    if (!forcePayment && hasUpkeepBeenPaidForPhase(currentGames)) {
        return { alreadyPaid: true, costs: totalCost };
    }

    // Check if warband has enough funds
    const currentGC = currentWarband.gc_treasury || 0;
    const currentTreasure = currentWarband.treasure || 0;
    
    const gcCosts = totalUpkeepCosts.gc_total;
    const treasureCosts = totalUpkeepCosts.treasure_total;
    
    if (gcCosts > currentGC || treasureCosts > currentTreasure) {
        const insufficientFunds = [];
        const totalNeeded = [];
        
        if (gcCosts > currentGC) {
            insufficientFunds.push(`Coronas de Oro: se necesitan ${gcCosts} CO pero tienes ${currentGC} CO (faltan ${gcCosts - currentGC} CO)`);
            totalNeeded.push(`${gcCosts} CO`);
        }
        if (treasureCosts > currentTreasure) {
            insufficientFunds.push(`Tesoro: se necesitan ${treasureCosts} de Tesoro pero tienes ${currentTreasure} de Tesoro (faltan ${treasureCosts - currentTreasure} de Tesoro)`);
            totalNeeded.push(`${treasureCosts} de Tesoro`);
        }
        
        const totalCostMessage = totalNeeded.join(' y ');
        const detailedMessage = insufficientFunds.join('. ');
        
        showMessage(`⚠️ ¡Fondos insuficientes para el pago de mantenimiento!`, 'error');
        showMessage(`Total necesario: ${totalCostMessage}`, 'error');
        showMessage(`${detailedMessage}`, 'error');
        showMessage(`Por favor, añade más fondos a la tesorería antes de pagar el mantenimiento.`, 'warning');
        
        return false;
    }

    // Process payment
    try {
        // Create transaction description
        let description = `Costes de mantenimiento pagados`;
        if (currentGames === 0) {
            description += ' (Antes de la Partida)';
        } else {
            description += ` de la Partida ${currentGames}`;
        }

        // Record transaction with proper currency handling
        let transaction;
        if (gcCosts > 0 && treasureCosts > 0) {
            // Mixed currency payment - create separate transactions
            transaction = createTransaction(
                TRANSACTION_TYPES.EXPENSE,
                TRANSACTION_CATEGORIES.UPKEEP,
                gcCosts,
                description,
                {
                    games_played: currentGames,
                    gc_costs: gcCosts,
                    treasure_costs: treasureCosts,
                    members_count: currentWarband.members.filter(m => 
                        m.type === 'Hired Sword' || m.type === 'Dramatis Personae'
                    ).length,
                    force_payment: forcePayment,
                    mixed_currency: true
                }
            );
        } else if (treasureCosts > 0) {
            // Treasure only payment
            transaction = createTransaction(
                TRANSACTION_TYPES.EXPENSE,
                TRANSACTION_CATEGORIES.UPKEEP_TREASURE,
                treasureCosts,
                description,
                {
                    games_played: currentGames,
                    gc_costs: 0,
                    treasure_costs: treasureCosts,
                    members_count: currentWarband.members.filter(m => 
                        m.type === 'Hired Sword' || m.type === 'Dramatis Personae'
                    ).length,
                    force_payment: forcePayment
                }
            );
        } else {
            // GC only payment
            transaction = createTransaction(
                TRANSACTION_TYPES.EXPENSE,
                TRANSACTION_CATEGORIES.UPKEEP,
                gcCosts,
                description,
                {
                    games_played: currentGames,
                    gc_costs: gcCosts,
                    treasure_costs: 0,
                    members_count: currentWarband.members.filter(m => 
                        m.type === 'Hired Sword' || m.type === 'Dramatis Personae'
                    ).length,
                    force_payment: forcePayment
                }
            );
        }
        
        if (addTransaction(transaction)) {
            // Deduct from treasury
            currentWarband.gc_treasury = Math.max(0, currentGC - gcCosts);
            currentWarband.treasure = Math.max(0, currentTreasure - treasureCosts);
            
            await saveWarband();
            
            const costBreakdown = [];
            if (gcCosts > 0) costBreakdown.push(`${gcCosts} CO`);
            if (treasureCosts > 0) costBreakdown.push(`${treasureCosts} de Tesoro`);
            
            showMessage(`Costes de mantenimiento pagados: ${costBreakdown.join(' y ')}`, 'success');
            return { success: true, costs: totalCost };
        }
    } catch (error) {
        console.error('Error paying upkeep costs:', error);
        showMessage('Error al procesar el pago de mantenimiento.', 'error');
        return false;
    }
    
    return false;
}

/**
 * Formats transaction amount for display
 */
export function formatTransactionAmount(transaction) {
    const prefix = transaction.type === TRANSACTION_TYPES.INCOME ? '+' : '-';
    
    // Handle mixed currency transactions
    if (transaction.details?.mixed_currency && transaction.category === TRANSACTION_CATEGORIES.UPKEEP) {
        const gcCosts = transaction.details.gc_costs || 0;
        const treasureCosts = transaction.details.treasure_costs || 0;
        const parts = [];
        if (gcCosts > 0) parts.push(`${gcCosts} CO`);
        if (treasureCosts > 0) parts.push(`${treasureCosts} de Tesoro`);
        return `${prefix}${parts.join(' + ')}`;
    }
    
    // Handle treasure-only transactions
    if (transaction.category === TRANSACTION_CATEGORIES.HIRE_FEE_TREASURE || 
        transaction.category === TRANSACTION_CATEGORIES.UPKEEP_TREASURE ||
        transaction.category === TRANSACTION_CATEGORIES.TREASURE_FOUND) {
        return `${prefix}${transaction.amount} Tesoro`;
    }
    
    // Default to GC
    return `${prefix}${transaction.amount} CO`;
}

/**
 * Gets category display name
 */
export function getCategoryDisplayName(category) {
    const names = {
        [TRANSACTION_CATEGORIES.HIRE_FEE]: 'Coste de Contratación',
        [TRANSACTION_CATEGORIES.HIRE_FEE_TREASURE]: 'Coste de Contratación (Tesoro)',
        [TRANSACTION_CATEGORIES.UPKEEP]: 'Mantenimiento',
        [TRANSACTION_CATEGORIES.UPKEEP_TREASURE]: 'Mantenimiento (Tesoro)',
        [TRANSACTION_CATEGORIES.EQUIPMENT_PURCHASE]: 'Compra de Equipo',
        [TRANSACTION_CATEGORIES.EQUIPMENT_SELL]: 'Venta de Equipo',
        [TRANSACTION_CATEGORIES.SCENARIO_REWARD]: 'Recompensa del Escenario',
        [TRANSACTION_CATEGORIES.STARTING_TREASURY]: 'Tesorería Inicial',
        [TRANSACTION_CATEGORIES.TREASURE_SALE]: 'Venta de Tesoro',
        [TRANSACTION_CATEGORIES.TREASURE_FOUND]: 'Tesoro Encontrado',
        [TRANSACTION_CATEGORIES.RECRUITMENT]: 'Reclutamiento',
        [TRANSACTION_CATEGORIES.OTHER_INCOME]: 'Otros Ingresos',
        [TRANSACTION_CATEGORIES.OTHER_EXPENSE]: 'Otros Gastos',
        [TRANSACTION_CATEGORIES.BANDITRY]: 'Bandolerismo'
    };
    return names[category] || category;
}
