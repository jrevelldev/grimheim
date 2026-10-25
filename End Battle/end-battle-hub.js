import { displayModal, hideModal } from '../utility.js';
import {
    endBattleState,
    resetEndBattleState,
    getStepStatus,
    refreshStepLocks,
    canApplyAll,
    applyAllChanges
} from './end-battle-state.js';
import {
    showBattleResultStep,
    showInjuriesStep,
    showExperienceStep,
    showExplorationDiceStep,
    showTreasureExplorationStep,
    showHenchmenStep,
    showSellTreasureStep,
    showSpecialStep,
    showSummaryStep
} from './end-battle-steps.js';

// ─── Step Metadata ───────────────────────────────────────────────────────────
const STEP_CONFIG = [
    { num: 1, label: 'Resultados de la Batalla',  icon: 'fa-flag',            desc: 'Victoria/Derrota, opciones de PX, valoración de la banda' },
    { num: 2, label: 'Heridas Graves',            icon: 'fa-skull-crossbones', desc: 'Resolución de bajas para los guerreros' },
    { num: 3, label: 'Asignación de Experiencia', icon: 'fa-star',           desc: 'Revisar y ajustar puntos de PX' },
    { num: 4, label: 'Dados de Exploración',     icon: 'fa-dice',           desc: 'Ver dados de exploración disponibles' },
    { num: 5, label: 'Exploración del Tesoro',   icon: 'fa-gem',            desc: 'Calcular fragmentos de piedra bruja hallados' },
    { num: 6, label: 'Grupos de Secuaces',       icon: 'fa-users',          desc: 'Reponer o aumentar secuaces' },
    { num: 7, label: 'Vender Tesoro',            icon: 'fa-coins',          desc: 'Vender fragmentos de piedra bruja por coronas de oro' },
    { num: 8, label: 'Especial',                 icon: 'fa-bolt',            desc: 'Habilidades tras la batalla y reglas especiales' },
    { num: 9, label: 'Resumen',                 icon: 'fa-clipboard-check', desc: 'Revisar todos los cambios y aplicarlos' }
];

const STATUS_STYLES = {
    locked:     { btnClass: 'opacity-40 cursor-not-allowed', iconHtml: '<i class="fas fa-lock text-slate-500 ml-2"></i>',           textClass: 'text-slate-500' },
    incomplete: { btnClass: 'hover:bg-slate-700 cursor-pointer',  iconHtml: '',                                                        textClass: 'text-slate-300' },
    complete:   { btnClass: 'hover:bg-slate-700 cursor-pointer',  iconHtml: '<i class="fas fa-check-circle text-green-400 ml-2"></i>', textClass: 'text-green-400' },
    warning:    { btnClass: 'hover:bg-slate-700 cursor-pointer',  iconHtml: '<i class="fas fa-exclamation-triangle text-amber-400 ml-2"></i>', textClass: 'text-amber-400' }
};

// ─── Show Hub ────────────────────────────────────────────────────────────────
export function showEndBattleHub() {
    resetEndBattleState();
    refreshStepLocks();
    renderHub();
    displayModal('end-battle-hub-modal');
}

// ─── Re-open Hub (from sub-modal, without resetting) ─────────────────────────
export function returnToHub() {
    refreshStepLocks();
    renderHub();
    displayModal('end-battle-hub-modal');
}

// ─── Render Hub Content ──────────────────────────────────────────────────────
function renderHub() {
    const container = document.getElementById('end-battle-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Hub header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <h3 class="text-2xl font-bold text-mordheim-gold">Opciones de Fin de Batalla</h3>
        <button id="cancel-end-battle-hub-btn" class="text-slate-300 hover:text-white transition">
            <i class="fas fa-times text-xl"></i>
        </button>
    `;
    container.appendChild(header);


    // Cancel button handler
    header.querySelector('#cancel-end-battle-hub-btn').addEventListener('click', () => cancelEndBattleHub());

    STEP_CONFIG.forEach(step => {
        const status = getStepStatus(step.num);
        const style = STATUS_STYLES[status] || STATUS_STYLES.locked;

        const btn = document.createElement('button');
        btn.className = `w-full flex items-center justify-between p-4 rounded-lg border border-slate-600 bg-slate-800 transition mb-2 ${style.btnClass}`;
        btn.dataset.step = step.num;

        btn.innerHTML = `
            <div class="flex items-center">
                <span class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 text-sm font-bold ${style.textClass} mr-3">${step.num}</span>
                <div class="text-left">
                    <span class="font-semibold ${style.textClass}">${step.label}</span>
                    <p class="text-xs text-slate-500">${step.desc}</p>
                </div>
            </div>
            <div class="flex items-center">
                ${style.iconHtml}
                <i class="fas fa-chevron-right ml-2 ${status === 'locked' ? 'text-slate-600' : 'text-slate-400'}"></i>
            </div>
        `;

        if (status !== 'locked') {
            btn.addEventListener('click', () => openStep(step.num));
        }

        container.appendChild(btn);
    });
}

// ─── Open a Step Sub-Modal ───────────────────────────────────────────────────
function openStep(stepNum) {
    hideModal('end-battle-hub-modal');

    switch (stepNum) {
        case 1: showBattleResultStep(); break;
        case 2: showInjuriesStep(); break;
        case 3: showExperienceStep(); break;
        case 4: showExplorationDiceStep(); break;
        case 5: showTreasureExplorationStep(); break;
        case 6: showHenchmenStep(); break;
        case 7: showSellTreasureStep(); break;
        case 8: showSpecialStep(); break;
        case 9: showSummaryStep(); break;
    }
}

// ─── Cancel Hub ──────────────────────────────────────────────────────────────
export function cancelEndBattleHub() {
    resetEndBattleState();
    hideModal('end-battle-hub-modal');
}

// ─── Update Hub Step Statuses (called when returning from sub-modal) ─────────
export function updateHubStepStatuses() {
    refreshStepLocks();
    renderHub();
}
