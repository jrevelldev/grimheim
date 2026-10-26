import { currentWarband } from '../state.js';
import { saveWarband } from '../warband-service.js';
import { MASTER_INJURY_LIST } from '../data/index.js';
import { STATS_FIELDS } from '../config.js';
import { calculateWarbandRating, hideModal, showMessage, getWarbandData, showEditorView } from '../utility.js';
import { renderWarbandEditor, resetBattleCasualties, checkForAdvancement } from '../ui.js';
import { createTransaction, addTransaction, TRANSACTION_TYPES, TRANSACTION_CATEGORIES } from '../Treasury/ledger.js';
import { translateSkill } from '../i18n.js';

// ─── Central End Battle State ────────────────────────────────────────────────
const endBattleState = {
    step1: {
        battleResult: null,
        xpOptions: {
            survival: true,
            winningLeader: true,
            perEnemy: true,
            underdog: true,
            opponentRating: 0
        }
    },
    step2: {
        casualtyResolutions: new Map()
    },
    step3: {
        experienceAllocations: new Map()
    },
    step4: {
        completed: false
    },
    step5: {
        treasureFound: 0,
        diceTotal: 0,
        inputMode: 'total'
    },
    step6: {
        veteranPool: 0,
        replenishments: new Map(),
        totalReplenishmentCost: 0
    },
    step7: {
        treasureToSell: 0,
        goldFromSale: 0,
        warbandSizeValue: 2
    },
    step8: {
        specialResults: new Map()  // Map<fighterId, { skillName, successful, goldEarned, injury, removed }>
    },
    stepStatus: {
        1: 'incomplete',
        2: 'locked',
        3: 'locked',
        4: 'locked',
        5: 'locked',
        6: 'locked',
        7: 'locked',
        8: 'locked',
        9: 'incomplete'
    }
};

// ─── Reset ───────────────────────────────────────────────────────────────────
export function resetEndBattleState() {
    endBattleState.step1.battleResult = null;
    endBattleState.step1.xpOptions = {
        survival: true,
        winningLeader: true,
        perEnemy: true,
        underdog: true,
        opponentRating: 0
    };

    endBattleState.step2.casualtyResolutions.clear();

    endBattleState.step3.experienceAllocations.clear();

    endBattleState.step4.completed = false;

    endBattleState.step5.treasureFound = 0;
    endBattleState.step5.diceTotal = 0;
    endBattleState.step5.inputMode = 'total';

    endBattleState.step6.veteranPool = 0;
    endBattleState.step6.replenishments.clear();
    endBattleState.step6.totalReplenishmentCost = 0;

    endBattleState.step7.treasureToSell = 0;
    endBattleState.step7.goldFromSale = 0;
    endBattleState.step7.warbandSizeValue = 2;

    endBattleState.step8.specialResults.clear();

    endBattleState.stepStatus = {
        1: 'incomplete',
        2: 'locked',
        3: 'locked',
        4: 'locked',
        5: 'locked',
        6: 'locked',
        7: 'locked',
        8: 'locked',
        9: 'incomplete'
    };
}

// ─── Step Status ─────────────────────────────────────────────────────────────
export function getStepStatus(stepNum) {
    return endBattleState.stepStatus[stepNum] || 'locked';
}

export function setStepStatus(stepNum, status) {
    endBattleState.stepStatus[stepNum] = status;
}

// ─── Step Locking Logic ──────────────────────────────────────────────────────
function evaluateStepLocks() {
    const s = endBattleState.stepStatus;
    const isComplete = (n) => s[n] === 'complete' || s[n] === 'warning';

    // Step 1 always unlocked
    if (s[1] === 'locked') s[1] = 'incomplete';

    // Step 2 unlocks after step 1 complete
    if (isComplete(1) && s[2] === 'locked') s[2] = 'incomplete';
    if (!isComplete(1) && s[2] !== 'complete' && s[2] !== 'warning') s[2] = 'locked';

    // Step 3 unlocks after steps 1+2 complete
    if (isComplete(1) && isComplete(2) && s[3] === 'locked') s[3] = 'incomplete';
    if ((!isComplete(1) || !isComplete(2)) && s[3] !== 'complete' && s[3] !== 'warning') s[3] = 'locked';

    // Step 4 unlocks after step 1 complete
    if (isComplete(1) && s[4] === 'locked') s[4] = 'incomplete';
    if (!isComplete(1) && s[4] !== 'complete' && s[4] !== 'warning') s[4] = 'locked';

    // Step 5 unlocks after step 1 complete (not gated by step 4 — allows house rules with 0 dice)
    if (isComplete(1) && s[5] === 'locked') s[5] = 'incomplete';
    if (!isComplete(1) && s[5] !== 'complete' && s[5] !== 'warning') s[5] = 'locked';

    // Step 6 unlocks after step 2 complete
    if (isComplete(2) && s[6] === 'locked') s[6] = 'incomplete';
    if (!isComplete(2) && s[6] !== 'complete' && s[6] !== 'warning') s[6] = 'locked';

    // Step 7 unlocks after step 1 complete (user may sell stored treasure regardless of exploration)
    if (isComplete(1) && s[7] === 'locked') s[7] = 'incomplete';
    if (!isComplete(1) && s[7] !== 'complete' && s[7] !== 'warning') s[7] = 'locked';

    // Step 8 (Special) unlocks after step 1 complete
    if (isComplete(1) && s[8] === 'locked') s[8] = 'incomplete';
    if (!isComplete(1) && s[8] !== 'complete' && s[8] !== 'warning') s[8] = 'locked';

    // Step 9 (Summary) always unlocked (but Apply disabled unless all complete)
    if (s[9] === 'locked') s[9] = 'incomplete';
}

// ─── Validation Helpers ──────────────────────────────────────────────────────
function getWarbandSizeValue(warbandSize) {
    if (warbandSize >= 16) return 16;
    if (warbandSize >= 13) return 14;
    if (warbandSize >= 10) return 11;
    if (warbandSize >= 7) return 8;
    if (warbandSize >= 4) return 5;
    return 2;
}

function validateStep6Affordability() {
    const totalCost = endBattleState.step6.totalReplenishmentCost;
    if (totalCost === 0) return true;

    const treasury = currentWarband?.gc_treasury || 0;
    const goldFromSale = endBattleState.step7.goldFromSale || 0;
    return (treasury + goldFromSale) >= totalCost;
}

function validateStep7TreasureAvailable() {
    const treasureToSell = endBattleState.step7.treasureToSell;
    if (treasureToSell === 0) return true;

    const currentTreasure = currentWarband?.treasure || 0;
    const treasureFound = endBattleState.step5.treasureFound || 0;
    return treasureToSell <= (currentTreasure + treasureFound);
}

// ─── Cross-Step Revalidation ─────────────────────────────────────────────────
export function revalidateDownstreamSteps(changedStep) {
    const s = endBattleState.stepStatus;

    if (changedStep <= 1) {
        // Step 3 depends on step 1 (battle result for leader XP, underdog)
        if (s[3] === 'complete' || s[3] === 'warning') {
            // Mark for user review — XP may have changed
            s[3] = 'warning';
        }
    }

    if (changedStep <= 2) {
        // Step 3 depends on step 2 (removed fighters excluded from XP)
        if (s[3] === 'complete' || s[3] === 'warning') {
            s[3] = 'warning';
        }
        // Step 6 depends on step 2 (henchmen deaths)
        if (s[6] === 'complete' || s[6] === 'warning') {
            if (!validateStep6Affordability()) {
                s[6] = 'warning';
            }
        }
    }

    if (changedStep <= 5) {
        // Step 7 depends on step 5 (treasure found)
        if (s[7] === 'complete' || s[7] === 'warning') {
            if (!validateStep7TreasureAvailable()) {
                s[7] = 'warning';
            } else {
                s[7] = 'complete';
            }
        }
        // Step 6 affordability depends on step 7 gold which depends on step 5 treasure
        if (s[6] === 'complete' || s[6] === 'warning') {
            if (!validateStep6Affordability()) {
                s[6] = 'warning';
            } else {
                s[6] = 'complete';
            }
        }
    }

    if (changedStep <= 7) {
        // Step 6 affordability depends on step 7 gold
        if (s[6] === 'complete' || s[6] === 'warning') {
            if (!validateStep6Affordability()) {
                s[6] = 'warning';
            } else {
                s[6] = 'complete';
            }
        }
    }

    evaluateStepLocks();
}

// ─── Can Apply ───────────────────────────────────────────────────────────────
export function canApplyAll() {
    for (let i = 1; i <= 8; i++) {
        if (endBattleState.stepStatus[i] !== 'complete') return false;
    }
    return true;
}

// ─── Apply All Changes ──────────────────────────────────────────────────────
export async function applyAllChanges() {
    if (!currentWarband || !currentWarband.members) {
        showMessage('No hay ninguna banda cargada.', 'error');
        return;
    }

    try {
        // 1. Apply injuries, removals, group size reductions (step 2)
        applyInjuriesAndRemovals();

        // 2. Apply experience (step 3)
        applyExperienceFromState();

        // 3. Reset hero kill counts
        currentWarband.members.forEach(fighter => {
            if (fighter.type === 'Hero') {
                fighter.kills = 0;
            }
        });

        // 4. Add treasure found (step 5) + cutpurse bonus + wily thief bonus
        const cutpurseBonus = getCutpurseBonusTreasure();
        const wilyThiefBonus = getWilyThiefBonusTreasure();
        const treasureFound = (endBattleState.step5.treasureFound || 0) + cutpurseBonus + wilyThiefBonus;
        if (treasureFound > 0) {
            currentWarband.treasure = (currentWarband.treasure || 0) + treasureFound;
            const bonusNotes = [];
            if (cutpurseBonus > 0) bonusNotes.push('+1 por Cortabolsas');
            if (wilyThiefBonus > 0) bonusNotes.push(`+${wilyThiefBonus} por Ladrón Astuto`);
            const bonusSuffix = bonusNotes.length > 0 ? ` (incluye ${bonusNotes.join(', ')})` : '';
            addTransaction(createTransaction(
                TRANSACTION_TYPES.INCOME,
                TRANSACTION_CATEGORIES.TREASURE_FOUND,
                treasureFound,
                `Encontrado(s) ${treasureFound} fragmento(s) de piedra bruja durante la exploración${bonusSuffix}`
            ));
        }

        // 5. Sell treasure and add gold (step 7)
        const treasureToSell = endBattleState.step7.treasureToSell || 0;
        const goldFromSale = endBattleState.step7.goldFromSale || 0;
        if (treasureToSell > 0 && goldFromSale > 0) {
            currentWarband.treasure = (currentWarband.treasure || 0) - treasureToSell;
            currentWarband.gc_treasury = (currentWarband.gc_treasury || 0) + goldFromSale;
            addTransaction(createTransaction(
                TRANSACTION_TYPES.INCOME,
                TRANSACTION_CATEGORIES.TREASURE_SALE,
                goldFromSale,
                `Vendidos ${treasureToSell} fragmento(s) de piedra bruja por ${goldFromSale} CO`
            ));
        }

        // 6. Add henchmen and deduct cost (step 6)
        applyHenchmenReplenishment();

        // 7. Apply special results (step 8)
        applySpecialResults();

        // 8. Save warband
        await saveWarband();

        // 9. Cleanup
        resetEndBattleState();
        if (typeof resetBattleCasualties === 'function') {
            resetBattleCasualties();
        }
        hideModal('end-battle-hub-modal');

        showMessage('¡Todos los cambios de fin de batalla se han aplicado con éxito!', 'success');

        // Return to warband editor
        showEditorView();
        renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);

    } catch (error) {
        console.error('Error applying end battle changes:', error);
        showMessage('Error al aplicar los cambios: ' + error.message, 'error');
    }
}

// ─── Apply Helpers ───────────────────────────────────────────────────────────
function applyInjuriesAndRemovals() {
    const fightersToRemove = [];

    currentWarband.members.forEach(fighter => {
        const resolution = endBattleState.step2.casualtyResolutions.get(fighter.id);
        if (!resolution) return;

        // Handle sickness
        if (resolution.sicknessResolved !== undefined) {
            if (resolution.sicknessResolved) {
                // Remove sickness injury
                if (fighter.injuries && Array.isArray(fighter.injuries)) {
                    fighter.injuries = fighter.injuries.filter(i => i !== 'Sickness');
                }
            }
            return;
        }

        if (fighter.type === 'Henchman') {
            // Henchmen group size reduction
            if (resolution.deadCount && resolution.deadCount > 0) {
                const originalGroupSize = fighter.group_size || 1;
                const newGroupSize = originalGroupSize - resolution.deadCount;
                if (newGroupSize <= 0) {
                    fightersToRemove.push(fighter.id);
                } else {
                    fighter.group_size = newGroupSize;
                }
            }
        } else {
            // Individual fighter
            if (resolution.removed) {
                fightersToRemove.push(fighter.id);
            } else if (resolution.injury) {
                if (!fighter.injuries) fighter.injuries = [];
                fighter.injuries.push(resolution.injury);

                const injuryData = MASTER_INJURY_LIST.find(i => i.name === resolution.injury);
                if (injuryData) {
                    if (injuryData.characteristicModifiers) {
                        STATS_FIELDS.forEach(stat => {
                            if (injuryData.characteristicModifiers[stat]) {
                                if (!fighter.stat_modifiers) fighter.stat_modifiers = {};
                                fighter.stat_modifiers[stat] = (fighter.stat_modifiers[stat] || 0) + injuryData.characteristicModifiers[stat];
                            }
                        });
                    }
                    if (injuryData.special_rules && injuryData.special_rules.length > 0) {
                        let rulesArray = [];
                        if (typeof fighter.special_rules === 'string') {
                            rulesArray = fighter.special_rules.split(';').map(r => r.trim()).filter(rule => rule);
                        } else if (Array.isArray(fighter.special_rules)) {
                            rulesArray = fighter.special_rules;
                        }
                        injuryData.special_rules.forEach(rule => {
                            if (!rulesArray.includes(rule)) {
                                rulesArray.push(rule);
                            }
                        });
                        fighter.special_rules = rulesArray.join('; ');
                    }
                }
            }
        }
    });

    currentWarband.members = currentWarband.members.filter(f => !fightersToRemove.includes(f.id));
}

function applyExperienceFromState() {
    endBattleState.step3.experienceAllocations.forEach((xpAmount, fighterId) => {
        const fighter = currentWarband.members.find(f => f.id === fighterId);
        if (!fighter || xpAmount <= 0) return;

        fighter.xp = (fighter.xp || 0) + xpAmount;

        if (fighter.type !== 'Henchman') {
            checkForAdvancement(fighter);
        }
    });
}

function applyHenchmenReplenishment() {
    const totalCost = endBattleState.step6.totalReplenishmentCost;

    endBattleState.step6.replenishments.forEach((selection, groupId) => {
        const group = currentWarband.members.find(f => f.id === groupId);
        if (!group || selection.count <= 0) return;

        group.group_size = (group.group_size || 1) + selection.count;
    });

    if (totalCost > 0) {
        currentWarband.gc_treasury = (currentWarband.gc_treasury || 0) - totalCost;
        addTransaction(createTransaction(
            TRANSACTION_TYPES.EXPENSE,
            TRANSACTION_CATEGORIES.RECRUITMENT,
            totalCost,
            `Refuerzo de grupos de secuaces por ${totalCost} CO`
        ));
    }
}

function applySpecialResults() {
    const fightersToRemove = [];

    endBattleState.step8.specialResults.forEach((result, fighterId) => {
        const fighter = currentWarband.members.find(f => f.id === fighterId);
        if (!fighter) return;

        if (result.successful && result.goldEarned > 0) {
            // Add gold to treasury
            currentWarband.gc_treasury = (currentWarband.gc_treasury || 0) + result.goldEarned;
            addTransaction(createTransaction(
                TRANSACTION_TYPES.INCOME,
                TRANSACTION_CATEGORIES.BANDITRY,
                result.goldEarned,
                `${fighter.name} obtuvo ${result.goldEarned} CO de ${translateSkill(result.skillName) || result.skillName}`
            ));
        } else if (!result.successful) {
            if (result.removed) {
                fightersToRemove.push(fighter.id);
            } else if (result.injury) {
                if (!fighter.injuries) fighter.injuries = [];
                fighter.injuries.push(result.injury);

                const injuryData = MASTER_INJURY_LIST.find(i => i.name === result.injury);
                if (injuryData) {
                    if (injuryData.characteristicModifiers) {
                        STATS_FIELDS.forEach(stat => {
                            if (injuryData.characteristicModifiers[stat]) {
                                if (!fighter.stat_modifiers) fighter.stat_modifiers = {};
                                fighter.stat_modifiers[stat] = (fighter.stat_modifiers[stat] || 0) + injuryData.characteristicModifiers[stat];
                            }
                        });
                    }
                    if (injuryData.special_rules && injuryData.special_rules.length > 0) {
                        let rulesArray = [];
                        if (typeof fighter.special_rules === 'string') {
                            rulesArray = fighter.special_rules.split(';').map(r => r.trim()).filter(rule => rule);
                        } else if (Array.isArray(fighter.special_rules)) {
                            rulesArray = fighter.special_rules;
                        }
                        injuryData.special_rules.forEach(rule => {
                            if (!rulesArray.includes(rule)) {
                                rulesArray.push(rule);
                            }
                        });
                        fighter.special_rules = rulesArray.join('; ');
                    }
                }
            }
        }
    });

    if (fightersToRemove.length > 0) {
        currentWarband.members = currentWarband.members.filter(f => !fightersToRemove.includes(f.id));
    }
}

// ─── Pure Calculation Helpers ────────────────────────────────────────────────
export function calculateUnderdogBonusFromState() {
    if (!endBattleState.step1.xpOptions.underdog) return 0;

    const opponentRating = endBattleState.step1.xpOptions.opponentRating || 0;
    const yourRating = calculateWarbandRating(currentWarband?.members || []);
    const difference = yourRating - opponentRating;

    if (difference >= 0) return 0;

    const absDifference = Math.abs(difference);
    if (absDifference >= 0 && absDifference <= 50) return 0;
    if (absDifference >= 51 && absDifference <= 75) return 1;
    if (absDifference >= 76 && absDifference <= 100) return 2;
    if (absDifference >= 101 && absDifference <= 150) return 3;
    if (absDifference >= 151 && absDifference <= 300) return 4;
    if (absDifference >= 301) return 5;
    return 0;
}

export function calculateFighterExperience(fighter) {
    const { battleResult, xpOptions } = endBattleState.step1;
    const casualtyResolutions = endBattleState.step2.casualtyResolutions;

    let survivalXP = 0;
    let leaderXP = 0;
    let killXP = 0;
    let underdogXP = 0;

    // Check if removed
    const resolution = casualtyResolutions.get(fighter.id);
    if (resolution && resolution.removed) {
        return { survivalXP: 0, leaderXP: 0, killXP: 0, underdogXP: 0, totalXP: 0 };
    }

    // Survival XP
    if (xpOptions.survival) {
        survivalXP = 1;
    }

    // Winning leader XP
    if (xpOptions.winningLeader && battleResult === 'victory') {
        const leader = getWarbandLeaderFromState();
        if (leader && leader.id === fighter.id) {
            leaderXP = 1;
        }
    }

    // Per enemy XP (Heroes/Hired Swords only, not henchmen)
    if (xpOptions.perEnemy && fighter.type !== 'Henchman') {
        killXP = (fighter.kills || 0) * 1;
    }

    // Underdog bonus
    const underdogBonus = calculateUnderdogBonusFromState();
    if (underdogBonus > 0) {
        underdogXP = underdogBonus;
    }

    return {
        survivalXP,
        leaderXP,
        killXP,
        underdogXP,
        totalXP: survivalXP + leaderXP + killXP + underdogXP
    };
}

function getWarbandLeaderFromState() {
    if (!currentWarband || !currentWarband.members) return null;
    return currentWarband.members.find(member =>
        member.type === 'Hero' &&
        member.special_rules &&
        member.special_rules.includes('Leader')
    );
}

/**
 * Returns 1 if the warband has a fighter with the Cutpurse special rule
 * who was NOT taken OOA (not a battle casualty), 0 otherwise.
 */
export function getCutpurseBonusTreasure() {
    if (!currentWarband || !currentWarband.members) return 0;

    const hasCutpurseActive = currentWarband.members.some(fighter => {
        // Check if fighter has Cutpurse rule
        const hasRule = typeof fighter.special_rules === 'string'
            && fighter.special_rules.includes('Cutpurse');
        if (!hasRule) return false;

        // Fighter must NOT be a battle casualty (not taken OOA)
        const casualtyCount = window.battleCasualties?.get(fighter.id) || 0;
        return casualtyCount === 0;
    });

    return hasCutpurseActive ? 1 : 0;
}

/**
 * Returns the total bonus treasure from Wily Thief skill results in step 8.
 * Checks specialResults for entries where skillName === 'Wily Thief' and addTreasure === true.
 */
export function getWilyThiefBonusTreasure() {
    let bonus = 0;
    endBattleState.step8.specialResults.forEach(result => {
        if (result.skillName === 'Wily Thief' && result.addTreasure === true) {
            bonus += 1;
        }
    });
    return bonus;
}

export function getAvailableTreasure() {
    return (currentWarband?.treasure || 0) + (endBattleState.step5.treasureFound || 0) + getCutpurseBonusTreasure() + getWilyThiefBonusTreasure();
}

export function getEffectiveGroupSize(groupId) {
    const group = currentWarband?.members?.find(f => f.id === groupId);
    if (!group) return 0;
    const originalSize = group.group_size || 1;
    const resolution = endBattleState.step2.casualtyResolutions.get(groupId);
    const deadCount = resolution?.deadCount || 0;
    return Math.max(0, originalSize - deadCount);
}

export function getWarbandSizeValueFromState() {
    const memberCount = currentWarband?.members?.length || 1;
    return getWarbandSizeValue(memberCount);
}

// ─── Refresh step locks (call after any status change) ───────────────────────
export function refreshStepLocks() {
    evaluateStepLocks();
}

// ─── Export state for read access ────────────────────────────────────────────
export { endBattleState };
