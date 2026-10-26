import { displayModal, hideModal, showMessage, showConfirmationModal } from '../utility.js';
import { currentWarband } from '../state.js';
import { formatXPDisplay } from '../slow-witted.js';
import { STATS_FIELDS } from '../config.js';
import { translateSkill, translateSkillCategory, translateWarriorRole, translateEquipment, translateRace } from '../i18n.js';
import {
    advancementState,
    resetAdvancementState,
    getEligibleFighters,
    getNextLevelXP,
    getPendingAdvancements,
    isReadyToAdvance,
    getFighterChanges,
    hasAnyChanges,
    getSummaryData,
    applyAllAdvancementChanges,
    setSelectedFighterId,
    getFighterThresholds
} from './advancement-state.js';
import { showFighterAdvancementView } from './advancement-steps.js';

// ─── Show Hub ────────────────────────────────────────────────────────────────
export function showAdvancementHub() {
    if (!currentWarband || !currentWarband.members) {
        showMessage('Por favor, carga una banda primero.', 'error');
        return;
    }

    resetAdvancementState();
    renderHub();
    displayModal('advancement-hub-modal');
}

// ─── Return to Hub (from fighter detail, without resetting) ──────────────────
export function returnToAdvancementHub() {
    renderHub();
    displayModal('advancement-hub-modal');
}

// ─── Render Hub Content ─────────────────────────────────────────────────────
function renderHub() {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <h3 class="text-2xl font-bold text-mordheim-gold">Avances de los Guerreros</h3>
        <button id="close-advancement-hub-btn" class="text-slate-300 hover:text-white transition">
            <i class="fas fa-times text-xl"></i>
        </button>
    `;
    container.appendChild(header);

    header.querySelector('#close-advancement-hub-btn').addEventListener('click', () => cancelAdvancementHub());

    // Fighter List
    const fighters = getEligibleFighters();

    if (fighters.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'text-slate-400 text-center py-8';
        empty.textContent = 'No hay guerreros que puedan recibir avances.';
        container.appendChild(empty);
        return;
    }

    // Info banner
    const infoBanner = document.createElement('div');
    infoBanner.className = 'bg-slate-800 rounded-lg p-3 mb-4 text-sm text-slate-300';
    infoBanner.innerHTML = `<i class="fas fa-info-circle text-mordheim-gold mr-2"></i>Selecciona un guerrero para gestionar su experiencia y avances.`;
    container.appendChild(infoBanner);

    // Fighter cards
    const listContainer = document.createElement('div');
    listContainer.className = 'space-y-2 max-h-[55vh] overflow-y-auto custom-scroll pr-1';

    fighters.forEach(fighter => {
        const card = createFighterCard(fighter);
        listContainer.appendChild(card);
    });

    container.appendChild(listContainer);

    // Bottom actions
    const actions = document.createElement('div');
    actions.className = 'flex justify-between items-center mt-4 pt-3 border-t border-slate-600';

    const changesCount = getSummaryData().length;
    const hasChanges = changesCount > 0;

    actions.innerHTML = `
        <span class="text-sm text-slate-400">${hasChanges ? `<i class="fas fa-edit text-mordheim-gold"></i> ${changesCount} guerrero(s) modificado(s)` : 'Sin cambios pendientes'}</span>
        <div class="flex space-x-2">
            <button id="advancement-cancel-btn" class="py-2 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition text-sm">
                Cancelar
            </button>
            <button id="advancement-summary-btn" class="py-2 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition text-sm ${!hasChanges ? 'opacity-50 cursor-not-allowed' : ''}" ${!hasChanges ? 'disabled' : ''}>
                Revisar y Guardar
            </button>
        </div>
    `;
    container.appendChild(actions);

    actions.querySelector('#advancement-cancel-btn').addEventListener('click', () => cancelAdvancementHub());
    if (hasChanges) {
        actions.querySelector('#advancement-summary-btn').addEventListener('click', () => showSummaryView());
    }
}

// ─── Create Fighter Card ────────────────────────────────────────────────────
function createFighterCard(fighter) {
    const currentXP = fighter.xp || 0;
    const nextLevel = getNextLevelXP(fighter);
    const pending = getPendingAdvancements(fighter);
    const ready = pending > 0;
    const changes = getFighterChanges(fighter.id);
    const hasStaged = changes.xpChange !== 0 || Object.keys(changes.statChanges).length > 0 ||
        changes.skillsAdded.length > 0 || changes.spellsAdded.length > 0 || changes.ladsGotTalent !== null ||
        changes.demiVampireReplacement !== null || changes.twistkinEquipment !== null;

    const isHenchman = fighter.type === 'Henchman';
    const groupSize = fighter.group_size || 1;

    const card = document.createElement('button');
    card.className = `w-full flex items-center justify-between p-3 rounded-lg border transition 
        ${ready ? 'border-mordheim-gold bg-slate-800 hover:bg-slate-700 shadow-md' : 'border-slate-600 bg-slate-800 hover:bg-slate-700'}
        ${hasStaged ? 'ring-1 ring-green-500' : ''}`;

    // XP progress bar width
    const thresholds = getFighterThresholds(fighter);
    const maxXP = thresholds[thresholds.length - 1] || 90;
    const fillPct = Math.min(100, (currentXP / maxXP) * 100);

    card.innerHTML = `
        <div class="flex-1 text-left min-w-0">
            <div class="flex items-center gap-2 mb-1">
                <span class="font-semibold text-white truncate">${fighter.name}</span>
                ${isHenchman ? `<span class="text-xs text-slate-400">x${groupSize}</span>` : ''}
                ${ready ? '<span class="text-xs bg-mordheim-gold text-slate-900 font-bold px-2 py-0.5 rounded-full">¡AVANCE!</span>' : ''}
                ${hasStaged ? '<i class="fas fa-pen text-green-400 text-xs" title="Cambios pendientes"></i>' : ''}
            </div>
            <div class="flex items-center gap-3 text-xs text-slate-400">
                <span class="uppercase">${fighter.type === 'Hero' ? 'Héroe' : (fighter.type === 'Henchman' ? 'Secuaz' : fighter.type)}</span>
                <span>PX: <span class="text-yellow-200 font-semibold">${formatXPDisplay(currentXP)}</span></span>
                ${nextLevel !== null ? `<span>Siguiente: <span class="text-slate-300">${nextLevel}</span></span>` : '<span class="text-green-400">MÁX</span>'}
                ${pending > 0 ? `<span class="text-mordheim-gold font-semibold">${pending} avance${pending > 1 ? 's' : ''} pendiente${pending > 1 ? 's' : ''}</span>` : ''}
            </div>
            <div class="w-full bg-slate-700 rounded-full h-1.5 mt-1.5">
                <div class="h-1.5 rounded-full ${ready ? 'bg-mordheim-gold' : 'bg-blue-500'}" style="width: ${fillPct}%"></div>
            </div>
        </div>
        <div class="ml-3 flex-shrink-0">
            <i class="fas fa-chevron-right text-slate-400"></i>
        </div>
    `;


    card.addEventListener('click', () => {
        setSelectedFighterId(fighter.id);
        showFighterAdvancementView(fighter);
    });

    return card;
}

// ─── Summary View ───────────────────────────────────────────────────────────
function showSummaryView() {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <h3 class="text-2xl font-bold text-mordheim-gold">Revisar Cambios</h3>
        <button id="summary-back-btn" class="text-slate-300 hover:text-white transition">
            <i class="fas fa-arrow-left text-lg mr-2"></i> Volver
        </button>
    `;
    container.appendChild(header);
    header.querySelector('#summary-back-btn').addEventListener('click', () => renderHub());

    // Changes list
    const summary = getSummaryData();
    const listContainer = document.createElement('div');
    listContainer.className = 'space-y-3 max-h-[55vh] overflow-y-auto custom-scroll pr-1';

    summary.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600';

        let changesHTML = '';

        if (entry.xpChange !== 0) {
            const sign = entry.xpChange > 0 ? '+' : '';
            changesHTML += `<div class="text-sm">PX: ${sign}${formatXPDisplay(entry.xpChange)}</div>`;
        }

        if (Object.keys(entry.statChanges).length > 0) {
            const statsStr = Object.entries(entry.statChanges).map(([stat, amt]) => `+${amt} ${stat}`).join(', ');
            changesHTML += `<div class="text-sm"><i class="fas fa-arrow-up text-blue-400 mr-1"></i> Atributos: ${statsStr}</div>`;
        }

        if (entry.skillsAdded.length > 0) {
            changesHTML += `<div class="text-sm"><i class="fas fa-book text-purple-400 mr-1"></i> Habilidades: ${entry.skillsAdded.map(s => translateSkill(s)).join(', ')}</div>`;
        }

        if (entry.spellsAdded.length > 0) {
            changesHTML += `<div class="text-sm"><i class="fas fa-hat-wizard text-indigo-400 mr-1"></i> Hechizos: ${entry.spellsAdded.map(s => translateSkill(s)).join(', ')}</div>`;
        }

        if (entry.ladsGotTalent) {
            let ladsText = `Este Chico Vale (${entry.ladsGotTalent.selectedCategories.map(c => translateSkillCategory(c)).join(', ')})`;
            changesHTML += `<div class="text-sm"><i class="fas fa-medal text-green-400 mr-1"></i> ${ladsText}</div>`;
            if (entry.ladsGotTalent.heroAdvancement) {
                const ha = entry.ladsGotTalent.heroAdvancement;
                if (ha.type === 'stat') {
                    changesHTML += `<div class="text-xs text-slate-400 ml-5"><i class="fas fa-arrow-up text-blue-400 mr-1"></i> Héroe: +1 ${ha.stat}</div>`;
                } else if (ha.type === 'skill') {
                    changesHTML += `<div class="text-xs text-slate-400 ml-5"><i class="fas fa-book text-purple-400 mr-1"></i> Héroe: ${translateSkill(ha.skillName)}</div>`;
                }
            }
            if (entry.ladsGotTalent.skryreSpell) {
                changesHTML += `<div class="text-xs text-slate-400 ml-5"><i class="fas fa-hat-wizard text-indigo-400 mr-1"></i> Hechizo: ${translateSkill(entry.ladsGotTalent.skryreSpell)}</div>`;
            }
            if (entry.ladsGotTalent.harnessedSpell) {
                changesHTML += `<div class="text-xs text-slate-400 ml-5"><i class="fas fa-hat-wizard text-indigo-400 mr-1"></i> Hechizo: ${translateSkill(entry.ladsGotTalent.harnessedSpell)}</div>`;
            }
        }

        if (entry.demiVampireReplacement) {
            const dvr = entry.demiVampireReplacement;
            const statsStr = STATS_FIELDS.map(s => `${s}:${dvr.newStats[s]}`).join(' ');
            changesHTML += `<div class="text-sm"><i class="fas fa-skull-crossbones text-red-400 mr-1"></i> Reemplazo por Semi-Vampiro</div>`;
            changesHTML += `<div class="text-xs text-slate-400 ml-5">Raza: ${translateRace(dvr.newRace) || dvr.newRace} | Atributos: ${statsStr}</div>`;
            changesHTML += `<div class="text-xs text-slate-400 ml-5">Reglas: ${dvr.newSpecialRules}</div>`;
        }

        if (entry.twistkinEquipment) {
            const tw = entry.twistkinEquipment;
            changesHTML += `<div class="text-sm"><i class="fas fa-dna text-orange-400 mr-1"></i> Mutación Twistkin: ${translateEquipment(tw.equipmentName)} (${tw.cost} CO)</div>`;
        }

        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <span class="font-semibold text-white">${entry.fighterName}</span>
                    <span class="text-xs text-slate-400 ml-2">${translateWarriorRole(entry.fighterType)}</span>
                </div>
                <button class="text-red-400 hover:text-red-300 text-sm" data-remove-fighter="${entry.fighterId}" title="Eliminar todos los cambios para este guerrero">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="space-y-1 text-slate-300">${changesHTML}</div>
        `;

        card.querySelector(`[data-remove-fighter="${entry.fighterId}"]`).addEventListener('click', () => {
            advancementState.fighterChanges.delete(entry.fighterId);
            if (getSummaryData().length === 0) {
                renderHub();
            } else {
                showSummaryView();
            }
        });

        listContainer.appendChild(card);
    });

    container.appendChild(listContainer);

    // Calculate total Twistkin equipment costs and validate treasury
    const totalTwistkinCost = summary.reduce((total, entry) => {
        return total + (entry.twistkinEquipment ? entry.twistkinEquipment.cost : 0);
    }, 0);
    const currentGC = currentWarband.gc_treasury || 0;
    const insufficientFunds = totalTwistkinCost > 0 && currentGC < totalTwistkinCost;

    // Bottom actions
    const actions = document.createElement('div');
    actions.className = 'flex justify-between items-center mt-4 pt-3 border-t border-slate-600';

    // Show treasury warning if insufficient funds
    let warningHTML = '';
    if (insufficientFunds) {
        warningHTML = `
            <div class="w-full mb-3 p-2 bg-red-900/30 border border-red-500/50 rounded-lg text-sm text-red-300">
                <i class="fas fa-exclamation-triangle mr-1"></i>
                Coronas de Oro insuficientes para la(s) mutación(es) Twistkin. Se necesitan ${totalTwistkinCost} CO pero la tesorería tiene ${currentGC} CO.
            </div>
        `;
    }

    actions.innerHTML = `
        ${warningHTML}
        <div class="flex justify-between items-center w-full">
            <button id="summary-back-btn-2" class="py-2 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition text-sm">
                <i class="fas fa-arrow-left mr-1"></i> Volver a la Lista
            </button>
            <button id="summary-apply-btn" class="py-2 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition text-sm ${insufficientFunds ? 'opacity-50 cursor-not-allowed' : ''}" ${insufficientFunds ? 'disabled' : ''}>
                Aplicar Todos los Cambios
            </button>
        </div>
    `;
    container.appendChild(actions);

    actions.querySelector('#summary-back-btn-2').addEventListener('click', () => renderHub());
    if (!insufficientFunds) {
        actions.querySelector('#summary-apply-btn').addEventListener('click', async () => {
            await applyAllAdvancementChanges();
        });
    }
}

// ─── Cancel Hub ─────────────────────────────────────────────────────────────
export function cancelAdvancementHub() {
    if (hasAnyChanges()) {
        showConfirmationModal('Tienes cambios de avances sin guardar. ¿Seguro que quieres cancelar?', () => {
            resetAdvancementState();
            hideModal('advancement-hub-modal');
        });
        return;
    }
    resetAdvancementState();
    hideModal('advancement-hub-modal');
}
