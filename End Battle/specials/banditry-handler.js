import { displayModal, hideModal } from '../../utility.js';
import { endBattleState } from '../end-battle-state.js';
import { showInjurySelectionModal, showBattleSkillDetails } from '../../ui.js';
import { MASTER_INJURY_LIST } from '../../data/index.js';

// ═══════════════════════════════════════════════════════════════════════════════
// Banditry Skill Handler
// ═══════════════════════════════════════════════════════════════════════════════
// "Instead of searching for Rare equipment, the hero may engage in banditry -
//  roll a D6, on a result of 2-6, the banditry is successful and the hero adds
//  D6+1 gold to the warband's stash. However, on a result of 1, the attempted
//  robbery has somehow gone wrong - roll on the Serious Injury table for the
//  bandit, as if he had been taken Out of Action in the last game."
// ═══════════════════════════════════════════════════════════════════════════════

export const BanditryHandler = {
    skillName: 'Banditry',

    /**
     * Returns array of fighters in the warband who have the Banditry skill.
     */
    detect(warband) {
        if (!warband || !warband.members) return [];
        return warband.members.filter(fighter =>
            Array.isArray(fighter.skills) && fighter.skills.includes('Banditry')
        );
    },

    /**
     * Renders the UI cards for each fighter with Banditry.
     * @param {HTMLElement} container - The container to render into
     * @param {Array} fighters - Fighters with this skill
     * @param {Function} onStateChange - Callback to re-render after state changes
     */
    render(container, fighters, onStateChange) {
        const state = endBattleState.step8.specialResults;

        fighters.forEach(fighter => {
            const result = state.get(fighter.id);

            const card = document.createElement('div');
            card.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600 mb-3';

            // Header with fighter name and clickable skill name
            card.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h5 class="font-semibold text-mordheim-gold">${fighter.name}</h5>
                        <p class="text-xs text-slate-300 mt-1">
                            Habilidad: <span class="underline cursor-pointer text-mordheim-gold hover:text-yellow-300 transition banditry-skill-link" data-fighter-id="${fighter.id}">Bandolerismo</span>
                        </p>
                        <p class="text-sm text-slate-400">${fighter.type}</p>
                    </div>
                </div>
                <div class="space-y-3">
                    <p class="text-slate-300 font-semibold">¿Tuvo éxito el Bandolerismo?</p>
                    <div class="flex space-x-3">
                        <button class="banditry-yes-btn px-4 py-2 rounded-lg font-bold transition
                            ${result?.successful === true ? 'bg-green-600 ring-2 ring-green-400 text-white' : 'bg-slate-700 text-slate-300 hover:bg-green-700 hover:text-white'}"
                            data-fighter-id="${fighter.id}">
                            <i class="fas fa-check mr-1"></i>Sí
                        </button>
                        <button class="banditry-no-btn px-4 py-2 rounded-lg font-bold transition
                            ${result?.successful === false ? 'bg-red-600 ring-2 ring-red-400 text-white' : 'bg-slate-700 text-slate-300 hover:bg-red-700 hover:text-white'}"
                            data-fighter-id="${fighter.id}">
                            <i class="fas fa-times mr-1"></i>No
                        </button>
                    </div>
                    ${result?.successful === true ? renderSuccessUI(fighter, result) : ''}
                    ${result?.successful === false ? renderFailureUI(fighter, result) : ''}
                </div>
            `;
            container.appendChild(card);

            // Skill name click handler
            card.querySelector('.banditry-skill-link').addEventListener('click', () => {
                showBattleSkillDetails('Banditry');
            });

            // Yes button handler
            card.querySelector('.banditry-yes-btn').addEventListener('click', () => {
                const existing = state.get(fighter.id);
                const goldEarned = existing?.goldEarned || 2;  // Default to minimum D6+1
                state.set(fighter.id, {
                    skillName: 'Banditry',
                    successful: true,
                    goldEarned: goldEarned,
                    injury: null,
                    removed: false
                });
                onStateChange();
            });

            // No button handler
            card.querySelector('.banditry-no-btn').addEventListener('click', () => {
                state.set(fighter.id, {
                    skillName: 'Banditry',
                    successful: false,
                    goldEarned: 0,
                    injury: null,
                    removed: false
                });
                onStateChange();
            });

            // Gold input handler (if success UI is rendered)
            const goldInput = card.querySelector('.banditry-gold-input');
            if (goldInput) {
                goldInput.addEventListener('input', () => {
                    const val = parseInt(goldInput.value) || 0;
                    const existing = state.get(fighter.id);
                    if (existing) {
                        existing.goldEarned = val;
                    }
                });
            }

            // Injury/removal handlers (if failure UI is rendered)
            if (result?.successful === false) {
                attachFailureHandlers(card, fighter, fighters, onStateChange);
            }
        });
    },

    /**
     * Returns true if all fighters with Banditry have a complete resolution.
     */
    isComplete(fighters) {
        const state = endBattleState.step8.specialResults;
        return fighters.every(fighter => {
            const result = state.get(fighter.id);
            if (!result) return false;
            if (result.successful === true) return result.goldEarned > 0;
            if (result.successful === false) return result.injury !== null || result.removed === true;
            return false;
        });
    },

    /**
     * Returns summary HTML for the Summary step.
     */
    getSummaryHtml(fighters) {
        const state = endBattleState.step8.specialResults;
        let html = '';
        let totalGold = 0;

        fighters.forEach(fighter => {
            const result = state.get(fighter.id);
            if (!result) return;

            if (result.successful) {
                totalGold += result.goldEarned;
                html += `<div class="text-green-400 text-sm">${fighter.name} — Bandolerismo con éxito: +${result.goldEarned} CO</div>`;
            } else if (result.removed) {
                html += `<div class="text-red-400 text-sm">${fighter.name} — Bandolerismo fallido: Eliminado de la banda</div>`;
            } else if (result.injury) {
                html += `<div class="text-yellow-300 text-sm">${fighter.name} — Bandolerismo fallido: ${result.injury}</div>`;
            }
        });

        if (totalGold > 0) {
            html += `<div class="text-sm font-bold text-mordheim-gold mt-1">Total Coronas por Bandolerismo: +${totalGold} CO</div>`;
        }

        return html;
    }
};

// ─── UI Helpers ──────────────────────────────────────────────────────────────

function renderSuccessUI(fighter, result) {
    return `
        <div class="ml-2 mt-2 p-3 bg-slate-700 rounded-lg">
            <label class="text-slate-300 text-sm block mb-2">Coronas obtenidas (1D6+1):</label>
            <input type="number" inputmode="numeric" class="banditry-gold-input w-24 p-2 rounded bg-slate-600 border border-slate-500 text-white text-center text-lg"
                value="${result?.goldEarned || 2}" min="1"
                data-fighter-id="${fighter.id}">
            <span class="text-slate-400 ml-2">CO</span>
        </div>
    `;
}

function renderFailureUI(fighter, result) {
    const injuryDisplay = result?.injury
        ? `<div class="ml-6 p-2 bg-slate-700 rounded mt-2">
               <span class="text-yellow-200">${result.injury}</span>
               <button class="banditry-change-injury ml-2 text-blue-400 hover:text-blue-300" data-fighter-id="${fighter.id}">
                   <i class="fas fa-edit"></i> Cambiar
               </button>
           </div>`
        : `<div class="ml-6 mt-2">
               <button class="banditry-select-injury px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition" data-fighter-id="${fighter.id}">
                   Seleccionar secuela
               </button>
           </div>`;

    return `
        <div class="mt-2 space-y-2">
            <p class="text-slate-400 text-sm">El asalto salió mal — tira en la tabla de Heridas Graves:</p>
            <label class="flex items-center space-x-2">
                <input type="radio" name="banditry-outcome-${fighter.id}" value="injury"
                    ${result?.injury || (!result?.removed) ? 'checked' : ''}
                    class="text-mordheim-gold focus:ring-mordheim-gold">
                <span class="text-slate-300">Seleccionar secuela</span>
            </label>
            ${result?.injury || (!result?.removed) ? injuryDisplay : ''}
            <label class="flex items-center space-x-2">
                <input type="radio" name="banditry-outcome-${fighter.id}" value="remove"
                    ${result?.removed ? 'checked' : ''}
                    class="text-mordheim-gold focus:ring-mordheim-gold">
                <span class="text-slate-300">Eliminar de la banda</span>
            </label>
        </div>
    `;
}

function attachFailureHandlers(card, fighter, fighters, onStateChange) {
    const state = endBattleState.step8.specialResults;

    // Radio button handlers
    const radios = card.querySelectorAll(`input[name="banditry-outcome-${fighter.id}"]`);
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const result = state.get(fighter.id);
            if (!result) return;

            if (radio.value === 'injury') {
                result.removed = false;
                if (!result.injury) {
                    openBanditryInjurySelection(fighter.id, fighters, onStateChange);
                }
                onStateChange();
            } else if (radio.value === 'remove') {
                result.injury = null;
                result.removed = true;
                onStateChange();
            }
        });
    });

    // Select/Change injury button handlers
    const selectBtn = card.querySelector('.banditry-select-injury');
    if (selectBtn) {
        selectBtn.addEventListener('click', () => {
            openBanditryInjurySelection(fighter.id, fighters, onStateChange);
        });
    }
    const changeBtn = card.querySelector('.banditry-change-injury');
    if (changeBtn) {
        changeBtn.addEventListener('click', () => {
            openBanditryInjurySelection(fighter.id, fighters, onStateChange);
        });
    }
}

function openBanditryInjurySelection(fighterId, fighters, onStateChange) {
    const state = endBattleState.step8.specialResults;

    showInjurySelectionModal();

    setTimeout(() => {
        const injuryElements = document.querySelectorAll('#injury-selection-options > div');
        injuryElements.forEach(element => {
            const injuryName = element.querySelector('p.font-semibold')?.textContent;
            element.onclick = () => {
                const result = state.get(fighterId);
                if (result) {
                    result.injury = injuryName;
                    result.removed = false;
                }
                hideModal('injury-selection-modal');
                onStateChange();
            };
        });
    }, 100);
}
