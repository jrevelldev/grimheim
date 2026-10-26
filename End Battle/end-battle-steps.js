import { displayModal, hideModal, calculateWarbandRating, showMessage, calculateEquipmentCost, adjustEquipmentCosts } from '../utility.js';
import { currentWarband, isFullyPaintedActive } from '../state.js';
import { isSicknessCasualty, showInjurySelectionModal, getHeroExplorationStats, getExplorationRerollStats, showTreasureExplorationModal, handleTreasureCalculation, showBattleSkillDetails } from '../ui.js';
import { fighterCanGainExperience } from '../Advancement/advancement-state.js';
import { getTreasureSellingValue } from '../Treasury/selling_treasure.js';
import {
    endBattleState,
    getStepStatus,
    setStepStatus,
    revalidateDownstreamSteps,
    refreshStepLocks,
    calculateUnderdogBonusFromState,
    calculateFighterExperience,
    getAvailableTreasure,
    getCutpurseBonusTreasure,
    getWilyThiefBonusTreasure,
    getEffectiveGroupSize,
    getWarbandSizeValueFromState,
    canApplyAll,
    applyAllChanges
} from './end-battle-state.js';
import { returnToHub } from './end-battle-hub.js';
import { getApplicableSpecials, areAllSpecialsComplete, getSpecialsSummaryHtml } from './specials/special-registry.js';
import { translateFighterType } from '../i18n.js';

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1 — Battle Results
// ═══════════════════════════════════════════════════════════════════════════════
export function showBattleResultStep() {
    const modal = document.getElementById('end-battle-hub-modal');
    const content = document.getElementById('end-battle-hub-content');
    if (!content) return;

    const state = endBattleState.step1;
    const yourRating = calculateWarbandRating(currentWarband?.members || []);
    const opponentRating = state.xpOptions.opponentRating || yourRating;

    content.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-mordheim-gold">
                    <i class="fas fa-flag mr-2"></i>Paso 1: Resultados de la Batalla
                </h3>
                <button id="step1-close-btn" class="text-slate-400 hover:text-white transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>

            <div>
                <h4 class="text-lg font-semibold text-slate-200 mb-3">Resultado de la Batalla</h4>
                <div class="flex space-x-4">
                    <button id="step1-victory-btn" class="flex-1 py-3 rounded-lg font-bold transition
                        ${state.battleResult === 'victory' ? 'bg-green-600 ring-2 ring-green-400 text-white' : 'bg-slate-700 text-slate-300 hover:bg-green-700 hover:text-white'}">
                        <i class="fas fa-trophy mr-2"></i>Victoria
                    </button>
                    <button id="step1-defeat-btn" class="flex-1 py-3 rounded-lg font-bold transition
                        ${state.battleResult === 'defeat' ? 'bg-red-600 ring-2 ring-red-400 text-white' : 'bg-slate-700 text-slate-300 hover:bg-red-700 hover:text-white'}">
                        <i class="fas fa-skull mr-2"></i>Derrota
                    </button>
                </div>
            </div>

            <div>
                <h4 class="text-lg font-semibold text-slate-200 mb-3">Opciones de Experiencia</h4>
                <div class="space-y-2">
                    <label class="flex items-center space-x-3 p-2 bg-slate-800 rounded">
                        <input type="checkbox" id="step1-xp-survival" ${state.xpOptions.survival ? 'checked' : ''}
                            class="text-mordheim-gold focus:ring-mordheim-gold rounded">
                        <span class="text-slate-300">+1 Supervivencia (por cada guerrero superviviente)</span>
                    </label>
                    <label class="flex items-center space-x-3 p-2 bg-slate-800 rounded">
                        <input type="checkbox" id="step1-xp-winning-leader" ${state.xpOptions.winningLeader ? 'checked' : ''}
                            class="text-mordheim-gold focus:ring-mordheim-gold rounded">
                        <span class="text-slate-300">+1 Líder Ganador (solo líder, en caso de victoria)</span>
                    </label>
                    <label class="flex items-center space-x-3 p-2 bg-slate-800 rounded">
                        <input type="checkbox" id="step1-xp-per-enemy" ${state.xpOptions.perEnemy ? 'checked' : ''}
                            class="text-mordheim-gold focus:ring-mordheim-gold rounded">
                        <span class="text-slate-300">+1 Por Cada Enemigo Fuera de Combate</span>
                    </label>
                    <label class="flex items-center space-x-3 p-2 bg-slate-800 rounded">
                        <input type="checkbox" id="step1-xp-underdog" ${state.xpOptions.underdog ? 'checked' : ''}
                            class="text-mordheim-gold focus:ring-mordheim-gold rounded">
                        <span class="text-slate-300">Bonificación por Desfavorecido</span>
                    </label>
                </div>
            </div>

            <div id="step1-underdog-section" class="${state.xpOptions.underdog ? '' : 'hidden'}">
                <h4 class="text-lg font-semibold text-slate-200 mb-3">Valoración de la Banda</h4>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-slate-800 p-3 rounded">
                        <span class="text-slate-400 text-sm">Tu Valoración</span>
                        <p id="step1-your-rating" class="text-xl font-bold text-mordheim-gold">${yourRating}</p>
                    </div>
                    <div class="bg-slate-800 p-3 rounded">
                        <span class="text-slate-400 text-sm">Valoración del Oponente</span>
                        <input type="number" inputmode="numeric" id="step1-opponent-rating" value="${opponentRating}" min="0"
                            class="w-full mt-1 p-2 rounded bg-slate-700 border border-slate-600 text-white">
                    </div>
                </div>
                <div id="step1-underdog-display" class="mt-2 text-center text-sm text-slate-500"></div>
            </div>

            <button id="step1-save-btn" class="w-full py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition">
                Guardar y Volver
            </button>
        </div>
    `;

    // Update underdog display
    updateStep1UnderdogDisplay();

    // Event listeners
    content.querySelector('#step1-close-btn').addEventListener('click', () => saveAndCloseStep1());
    content.querySelector('#step1-save-btn').addEventListener('click', () => saveAndCloseStep1());

    content.querySelector('#step1-victory-btn').addEventListener('click', () => {
        state.battleResult = 'victory';
        content.querySelector('#step1-victory-btn').className = 'flex-1 py-3 rounded-lg font-bold transition bg-green-600 ring-2 ring-green-400 text-white';
        content.querySelector('#step1-defeat-btn').className = 'flex-1 py-3 rounded-lg font-bold transition bg-slate-700 text-slate-300 hover:bg-red-700 hover:text-white';
    });

    content.querySelector('#step1-defeat-btn').addEventListener('click', () => {
        state.battleResult = 'defeat';
        content.querySelector('#step1-defeat-btn').className = 'flex-1 py-3 rounded-lg font-bold transition bg-red-600 ring-2 ring-red-400 text-white';
        content.querySelector('#step1-victory-btn').className = 'flex-1 py-3 rounded-lg font-bold transition bg-slate-700 text-slate-300 hover:bg-green-700 hover:text-white';
    });

    // XP option checkboxes
    ['survival', 'winningLeader', 'perEnemy', 'underdog'].forEach(opt => {
        const id = opt === 'winningLeader' ? 'step1-xp-winning-leader' : `step1-xp-${opt === 'perEnemy' ? 'per-enemy' : opt}`;
        const el = content.querySelector(`#${id}`);
        if (el) {
            el.addEventListener('change', () => {
                state.xpOptions[opt] = el.checked;
                if (opt === 'underdog') {
                    const section = content.querySelector('#step1-underdog-section');
                    section.classList.toggle('hidden', !el.checked);
                }
                updateStep1UnderdogDisplay();
            });
        }
    });

    // Opponent rating input
    const oppInput = content.querySelector('#step1-opponent-rating');
    if (oppInput) {
        oppInput.addEventListener('input', () => {
            state.xpOptions.opponentRating = parseInt(oppInput.value) || 0;
            updateStep1UnderdogDisplay();
        });
        oppInput.addEventListener('focus', () => oppInput.select());
    }

    displayModal('end-battle-hub-modal');
}

function updateStep1UnderdogDisplay() {
    const display = document.getElementById('step1-underdog-display');
    if (!display) return;

    const bonus = calculateUnderdogBonusFromState();
    if (bonus > 0) {
        display.innerHTML = `<span class="text-green-400 font-semibold">Bonificación por Desfavorecido: +${bonus} experiencia por guerrero apto</span>`;
        display.className = 'mt-2 text-center text-sm text-green-400';
    } else {
        display.innerHTML = '<span class="text-slate-500">Sin bonificación por desfavorecido</span>';
        display.className = 'mt-2 text-center text-sm text-slate-500';
    }
}

function saveAndCloseStep1() {
    const state = endBattleState.step1;
    // Read current checkbox states
    state.xpOptions.survival = document.getElementById('step1-xp-survival')?.checked ?? true;
    state.xpOptions.winningLeader = document.getElementById('step1-xp-winning-leader')?.checked ?? true;
    state.xpOptions.perEnemy = document.getElementById('step1-xp-per-enemy')?.checked ?? true;
    state.xpOptions.underdog = document.getElementById('step1-xp-underdog')?.checked ?? true;
    state.xpOptions.opponentRating = parseInt(document.getElementById('step1-opponent-rating')?.value) || 0;

    // Also update window.battleResult for exploration dice compatibility
    window.battleResult = state.battleResult;

    if (state.battleResult) {
        setStepStatus(1, 'complete');
    } else {
        setStepStatus(1, 'incomplete');
    }

    revalidateDownstreamSteps(1);
    hideModal('end-battle-hub-modal');
    returnToHub();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2 — Injuries
// ═══════════════════════════════════════════════════════════════════════════════
export function showInjuriesStep() {
    const content = document.getElementById('end-battle-hub-content');
    if (!content) return;

    const casualties = getStep2Casualties();

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-mordheim-gold">
                    <i class="fas fa-skull-crossbones mr-2"></i>Paso 2: Heridas Graves
                </h3>
                <button id="step2-close-btn" class="text-slate-400 hover:text-white transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div id="step2-casualties-list" class="space-y-3 max-h-96 overflow-y-auto"></div>
            <button id="step2-save-btn" class="w-full py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition">
                Guardar y Volver
            </button>
        </div>
    `;

    renderStep2Casualties(casualties);

    content.querySelector('#step2-close-btn').addEventListener('click', () => saveAndCloseStep2());
    content.querySelector('#step2-save-btn').addEventListener('click', () => saveAndCloseStep2());

    displayModal('end-battle-hub-modal');
}

function getStep2Casualties() {
    if (!currentWarband || !currentWarband.members) return { individualFighters: [], henchmenGroups: [], sicknessFighters: [] };

    const individualFighters = [];
    const henchmenGroups = [];
    const sicknessFighters = [];

    currentWarband.members.forEach(fighter => {
        const casualtyCount = window.battleCasualties?.get(fighter.id) || 0;
        if (casualtyCount > 0) {
            if (isSicknessCasualty(fighter.id)) {
                sicknessFighters.push(fighter);
            } else if (fighter.type === 'Henchman') {
                henchmenGroups.push(fighter);
            } else {
                individualFighters.push(fighter);
            }
        }
    });

    return { individualFighters, henchmenGroups, sicknessFighters };
}

function renderStep2Casualties(casualties) {
    const container = document.getElementById('step2-casualties-list');
    if (!container) return;
    container.innerHTML = '';

    const { individualFighters, henchmenGroups, sicknessFighters } = casualties;

    if (individualFighters.length === 0 && henchmenGroups.length === 0 && sicknessFighters.length === 0) {
        container.innerHTML = '<p class="text-slate-400 text-center py-4">No hay bajas que resolver.</p>';
        return;
    }

    // Sickness fighters
    sicknessFighters.forEach(fighter => {
        const resolution = endBattleState.step2.casualtyResolutions.get(fighter.id);
        const div = document.createElement('div');
        div.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h5 class="font-semibold text-mordheim-gold">${fighter.name}</h5>
                    <p class="text-sm text-orange-400">Baja por Enfermedad</p>
                </div>
            </div>
            <div class="space-y-2">
                <p class="text-slate-300 mb-3">¿Sigue enfermo ${fighter.name}?</p>
                <div class="flex space-x-3">
                    <button class="step2-sickness-recovered px-3 py-1 rounded transition
                        ${resolution?.sicknessResolved === true ? 'bg-green-700 ring-2 ring-green-400 text-white' : 'bg-green-600 text-white hover:bg-green-700'}"
                        data-fighter-id="${fighter.id}">No - Recuperado</button>
                    <button class="step2-sickness-still-sick px-3 py-1 rounded transition
                        ${resolution?.sicknessResolved === false ? 'bg-orange-700 ring-2 ring-orange-400 text-white' : 'bg-orange-600 text-white hover:bg-orange-700'}"
                        data-fighter-id="${fighter.id}">Sí - Sigue Enfermo</button>
                </div>
                <div id="step2-sickness-status-${fighter.id}" class="mt-2 text-sm ${resolution?.sicknessResolved === true ? 'text-green-400 font-semibold' : resolution?.sicknessResolved === false ? 'text-orange-400 font-semibold' : 'text-slate-400'}">
                    ${resolution?.sicknessResolved === true ? 'Seleccionado: Recuperado' : resolution?.sicknessResolved === false ? 'Seleccionado: Sigue Enfermo' : ''}
                </div>
            </div>
        `;
        container.appendChild(div);

        div.querySelector('.step2-sickness-recovered').addEventListener('click', () => {
            endBattleState.step2.casualtyResolutions.set(fighter.id, { sicknessResolved: true });
            renderStep2Casualties(casualties);
        });
        div.querySelector('.step2-sickness-still-sick').addEventListener('click', () => {
            endBattleState.step2.casualtyResolutions.set(fighter.id, { sicknessResolved: false });
            renderStep2Casualties(casualties);
        });
    });

    // Individual fighters
    individualFighters.forEach(fighter => {
        const casualtyCount = window.battleCasualties?.get(fighter.id) || 0;
        const resolution = endBattleState.step2.casualtyResolutions.get(fighter.id) || { injury: null, removed: false };
        const hasBlessedByKami = Array.isArray(fighter.skills) && fighter.skills.includes("Blessed by the Kami");

        const injuryDisplay = resolution.injury
            ? `<div class="ml-6 p-2 bg-slate-700 rounded">
                   <span class="text-yellow-200">${resolution.injury}</span>
                   <button class="step2-change-injury ml-2 text-blue-400 hover:text-blue-300" data-fighter-id="${fighter.id}">
                       <i class="fas fa-edit"></i> Cambiar
                   </button>
               </div>`
            : `<div class="ml-6">
                   <button class="step2-select-injury px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition" data-fighter-id="${fighter.id}">
                       Seleccionar secuela
                   </button>
               </div>`;

        const div = document.createElement('div');
        div.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h5 class="font-semibold text-mordheim-gold">${fighter.name}</h5>
                    ${hasBlessedByKami ? `
                        <p class="text-xs text-slate-300 mt-1">
                            Habilidad: <span class="underline cursor-pointer text-mordheim-gold hover:text-yellow-300 transition" data-skill="Blessed by the Kami">Bendecido por los Kami</span>
                        </p>
                    ` : ''}
                    <p class="text-sm text-slate-400">${translateFighterType(fighter.type)} - ${casualtyCount} baja(s)</p>
                </div>
            </div>
            <div class="space-y-2">
                <label class="flex items-center space-x-2">
                    <input type="radio" name="step2-casualty-${fighter.id}" value="no-injury"
                        ${!resolution.injury && !resolution.removed ? 'checked' : ''}
                        class="text-mordheim-gold focus:ring-mordheim-gold">
                    <span class="text-slate-300">Sin secuela</span>
                </label>
                <label class="flex items-center space-x-2">
                    <input type="radio" name="step2-casualty-${fighter.id}" value="injury"
                        ${resolution.injury ? 'checked' : ''}
                        class="text-mordheim-gold focus:ring-mordheim-gold">
                    <span class="text-slate-300">Seleccionar secuela</span>
                </label>
                ${injuryDisplay}
                <label class="flex items-center space-x-2">
                    <input type="radio" name="step2-casualty-${fighter.id}" value="remove"
                        ${resolution.removed ? 'checked' : ''}
                        class="text-mordheim-gold focus:ring-mordheim-gold">
                    <span class="text-slate-300">Eliminar de la banda</span>
                </label>
            </div>
        `;
        container.appendChild(div);

        // Radio button handlers
        div.querySelectorAll(`input[name="step2-casualty-${fighter.id}"]`).forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'no-injury') {
                    endBattleState.step2.casualtyResolutions.set(fighter.id, { injury: null, removed: false });
                    renderStep2Casualties(casualties);
                } else if (radio.value === 'injury') {
                    const current = endBattleState.step2.casualtyResolutions.get(fighter.id) || { injury: null, removed: false };
                    if (!current.injury) {
                        openStep2InjurySelection(fighter.id, casualties);
                    } else {
                        endBattleState.step2.casualtyResolutions.set(fighter.id, { injury: current.injury, removed: false });
                    }
                } else if (radio.value === 'remove') {
                    endBattleState.step2.casualtyResolutions.set(fighter.id, { injury: null, removed: true });
                    renderStep2Casualties(casualties);
                }
            });
        });

        // Select/change injury buttons
        const selectBtn = div.querySelector('.step2-select-injury');
        if (selectBtn) {
            selectBtn.addEventListener('click', () => openStep2InjurySelection(fighter.id, casualties));
        }
        const changeBtn = div.querySelector('.step2-change-injury');
        if (changeBtn) {
            changeBtn.addEventListener('click', () => openStep2InjurySelection(fighter.id, casualties));
        }
        if (hasBlessedByKami) {
            const skillEl = div.querySelector('[data-skill="Blessed by the Kami"]');
            if (skillEl) {
                skillEl.addEventListener('click', () => showBattleSkillDetails("Blessed by the Kami"));
            }
        }
    });

    // Henchmen groups
    henchmenGroups.forEach(group => {
        const casualtyCount = window.battleCasualties?.get(group.id) || 0;
        const originalGroupSize = group.group_size || 1;
        const resolution = endBattleState.step2.casualtyResolutions.get(group.id) || { deadCount: 0 };
        const remainingSize = originalGroupSize - resolution.deadCount;

        const div = document.createElement('div');
        div.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h5 class="font-semibold text-mordheim-gold">${group.name}</h5>
                    <p class="text-sm text-slate-400">Grupo de Secuaces - ${originalGroupSize} miembros, ${casualtyCount} bajas</p>
                </div>
            </div>
            <div class="space-y-3">
                <div class="flex items-center space-x-4">
                    <label class="text-slate-300">Cantidad a eliminar (muertos):</label>
                    <input type="number" inputmode="numeric" id="step2-dead-${group.id}" value="${resolution.deadCount}" min="0" max="${casualtyCount}"
                        class="w-20 p-2 rounded bg-slate-700 border border-slate-600 text-white text-center">
                    <span class="text-sm text-slate-400">de ${casualtyCount} bajas</span>
                </div>
                <div class="text-sm text-slate-300">
                    <span>Tamaño original: ${originalGroupSize}</span>
                    <span class="mx-2">→</span>
                    <span class="${remainingSize > 0 ? 'text-green-400' : 'text-red-400'}">Restantes: ${remainingSize}</span>
                </div>
                ${remainingSize === 0 ? '<div class="text-sm text-red-400">El grupo será eliminado de la banda</div>' : ''}
            </div>
        `;
        container.appendChild(div);

        const deadInput = div.querySelector(`#step2-dead-${group.id}`);
        deadInput.addEventListener('input', () => {
            const deadCount = parseInt(deadInput.value) || 0;
            const validDead = Math.max(0, Math.min(deadCount, casualtyCount, originalGroupSize));
            endBattleState.step2.casualtyResolutions.set(group.id, { deadCount: validDead });
            renderStep2Casualties(casualties);
        });
        deadInput.addEventListener('focus', () => deadInput.select());
    });
}

function openStep2InjurySelection(fighterId, casualties) {
    window.currentEndBattleFighterId = fighterId;
    showInjurySelectionModal();

    setTimeout(() => {
        const injuryElements = document.querySelectorAll('#injury-selection-options > div');
        injuryElements.forEach(element => {
            const injuryName = element.querySelector('p.font-semibold')?.textContent;
            element.onclick = () => {
                endBattleState.step2.casualtyResolutions.set(fighterId, { injury: injuryName, removed: false });
                hideModal('injury-selection-modal');
                renderStep2Casualties(casualties);
            };
        });
    }, 100);
}

function saveAndCloseStep2() {
    const casualties = getStep2Casualties();
    const { individualFighters, henchmenGroups, sicknessFighters } = casualties;
    const allCasualties = [...individualFighters, ...henchmenGroups, ...sicknessFighters];

    if (allCasualties.length === 0) {
        setStepStatus(2, 'complete');
    } else {
        // Check all have resolutions
        // Note: "no-injury" is the default radio state, so missing Map entries
        // for individual fighters and henchmen groups count as resolved.
        // Only sickness fighters require an explicit choice.
        let allResolved = true;
        individualFighters.forEach(f => {
            if (!endBattleState.step2.casualtyResolutions.has(f.id)) {
                endBattleState.step2.casualtyResolutions.set(f.id, { injury: null, removed: false });
            }
        });
        henchmenGroups.forEach(g => {
            if (!endBattleState.step2.casualtyResolutions.has(g.id)) {
                endBattleState.step2.casualtyResolutions.set(g.id, { deadCount: 0 });
            }
        });
        sicknessFighters.forEach(f => {
            const res = endBattleState.step2.casualtyResolutions.get(f.id);
            if (!res || res.sicknessResolved === undefined) allResolved = false;
        });

        setStepStatus(2, allResolved ? 'complete' : 'incomplete');
    }

    revalidateDownstreamSteps(2);
    hideModal('end-battle-hub-modal');
    returnToHub();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3 — Experience Allocation
// ═══════════════════════════════════════════════════════════════════════════════
export function showExperienceStep() {
    const content = document.getElementById('end-battle-hub-content');
    if (!content) return;

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-mordheim-gold">
                    <i class="fas fa-star mr-2"></i>Paso 3: Asignación de Experiencia
                </h3>
                <button id="step3-close-btn" class="text-slate-400 hover:text-white transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div id="step3-xp-list" class="space-y-2 max-h-96 overflow-y-auto"></div>
            <div class="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-600">
                <span class="font-bold text-slate-200">Experiencia Total:</span>
                <span id="step3-total-xp" class="text-xl font-bold text-mordheim-gold">0</span>
            </div>
            <button id="step3-save-btn" class="w-full py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition">
                Guardar y Volver
            </button>
        </div>
    `;

    renderStep3Experience();

    content.querySelector('#step3-close-btn').addEventListener('click', () => saveAndCloseStep3());
    content.querySelector('#step3-save-btn').addEventListener('click', () => saveAndCloseStep3());

    displayModal('end-battle-hub-modal');
}

function renderStep3Experience() {
    const container = document.getElementById('step3-xp-list');
    if (!container || !currentWarband?.members) return;
    container.innerHTML = '';

    let totalXP = 0;

    // Heroes and other individual fighters
    currentWarband.members.forEach(fighter => {
        if (fighter.type === 'Henchman') return;
        if (!['Hero', 'Hired Sword', 'Dramatis Personae', 'Vehicle'].includes(fighter.type)) return;

        const resolution = endBattleState.step2.casualtyResolutions.get(fighter.id);
        if (resolution && resolution.removed) return;
        if (isSicknessCasualty(fighter.id)) return;

        const canGainXP = fighterCanGainExperience(fighter);
        const xpCalc = calculateFighterExperience(fighter);
        // Use saved allocation if exists, otherwise use calculated
        const savedXP = endBattleState.step3.experienceAllocations.get(fighter.id);
        const displayXP = canGainXP ? (savedXP !== undefined ? savedXP : xpCalc.totalXP) : 0;
        const hasTeaCeremony = Array.isArray(fighter.skills) && fighter.skills.includes("Tea Ceremony");

        totalXP += displayXP;

        let xpBreakdown = '';
        if (canGainXP) {
            if (xpCalc.survivalXP > 0) xpBreakdown += `<span class="text-green-400 text-xs">+${xpCalc.survivalXP} supervivencia</span> `;
            if (xpCalc.leaderXP > 0) xpBreakdown += `<span class="text-yellow-400 text-xs">+${xpCalc.leaderXP} líder</span> `;
            if (xpCalc.killXP > 0) xpBreakdown += `<span class="text-blue-400 text-xs">+${xpCalc.killXP} bajas</span> `;
            if (xpCalc.underdogXP > 0) xpBreakdown += `<span class="text-purple-400 text-xs">+${xpCalc.underdogXP} desfavorecido</span> `;
        }

        const noXpNote = !canGainXP
            ? `<p class="text-xs text-amber-400 mt-1 italic"><i class="fas fa-exclamation-triangle mr-1"></i>${fighter.name} tiene la regla especial <strong>No Gana Experiencia</strong>.</p>`
            : '';

        const div = document.createElement('div');
        div.className = 'bg-slate-800 p-3 rounded-lg border border-slate-600';
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <span class="font-semibold text-mordheim-gold">${fighter.name}</span>
                    <span class="text-sm text-slate-400 ml-2">(${translateFighterType(fighter.type)})</span>
                    ${hasTeaCeremony ? `
                        <p class="text-xs text-slate-300 mt-1">
                            Habilidad: <span class="underline cursor-pointer text-mordheim-gold hover:text-yellow-300 transition" data-skill="Tea Ceremony">Ceremonia del Té</span>
                        </p>
                    ` : ''}
                    ${noXpNote}
                    <div class="mt-1">${xpBreakdown}</div>
                </div>
                <input type="number" inputmode="numeric" data-fighter-id="${fighter.id}" value="${displayXP}" min="0" max="${canGainXP ? 99 : 0}"
                    class="step3-xp-input w-16 p-1 rounded bg-slate-700 border border-slate-600 text-white text-center${!canGainXP ? ' opacity-50 cursor-not-allowed' : ''}"
                    ${!canGainXP ? 'disabled' : ''}>
            </div>
        `;
        container.appendChild(div);

        // Store initial allocation
        if (savedXP === undefined || !canGainXP) {
            endBattleState.step3.experienceAllocations.set(fighter.id, displayXP);
        }
        if (hasTeaCeremony) {
            const skillEl = div.querySelector('[data-skill="Tea Ceremony"]');
            if (skillEl) {
                skillEl.addEventListener('click', () => showBattleSkillDetails("Tea Ceremony"));
            }
        }
    });

    // Henchmen groups
    currentWarband.members.forEach(group => {
        if (group.type !== 'Henchman') return;

        const resolution = endBattleState.step2.casualtyResolutions.get(group.id) || { deadCount: 0 };
        const originalSize = group.group_size || 1;
        const remainingSize = originalSize - (resolution.deadCount || 0);
        if (remainingSize < 1) return;

        const canGainXP = fighterCanGainExperience(group);
        const xpCalc = calculateFighterExperience(group);
        const savedXP = endBattleState.step3.experienceAllocations.get(group.id);
        const displayXP = canGainXP ? (savedXP !== undefined ? savedXP : xpCalc.totalXP) : 0;

        totalXP += displayXP;

        let xpBreakdown = '';
        if (canGainXP) {
            if (xpCalc.survivalXP > 0) xpBreakdown += `<span class="text-green-400 text-xs">+${xpCalc.survivalXP} supervivencia</span> `;
            if (xpCalc.underdogXP > 0) xpBreakdown += `<span class="text-purple-400 text-xs">+${xpCalc.underdogXP} desfavorecido</span> `;
        }

        const noXpNote = !canGainXP
            ? `<p class="text-xs text-amber-400 mt-1 italic"><i class="fas fa-exclamation-triangle mr-1"></i>${group.name} tiene la regla especial <strong>No Gana Experiencia</strong>.</p>`
            : '';

        const div = document.createElement('div');
        div.className = 'bg-slate-800 p-3 rounded-lg border border-slate-600';
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <span class="font-semibold text-mordheim-gold">${group.name}</span>
                    <span class="text-sm text-slate-400 ml-2">(Secuaces - ${remainingSize}/${originalSize})</span>
                    ${noXpNote}
                    <div class="mt-1">${xpBreakdown}</div>
                </div>
                <input type="number" inputmode="numeric" data-fighter-id="${group.id}" value="${displayXP}" min="0" max="${canGainXP ? 99 : 0}"
                    class="step3-xp-input w-16 p-1 rounded bg-slate-700 border border-slate-600 text-white text-center${!canGainXP ? ' opacity-50 cursor-not-allowed' : ''}"
                    ${!canGainXP ? 'disabled' : ''}>
            </div>
        `;
        container.appendChild(div);

        if (savedXP === undefined || !canGainXP) {
            endBattleState.step3.experienceAllocations.set(group.id, displayXP);
        }
    });

    // Update total
    document.getElementById('step3-total-xp').textContent = totalXP;

    // Add input listeners
    container.querySelectorAll('.step3-xp-input').forEach(input => {
        input.addEventListener('input', () => {
            const fid = input.dataset.fighterId;
            endBattleState.step3.experienceAllocations.set(fid, parseInt(input.value) || 0);
            updateStep3Total();
        });
        input.addEventListener('focus', () => input.select());
    });
}

function updateStep3Total() {
    let total = 0;
    endBattleState.step3.experienceAllocations.forEach(xp => { total += xp; });
    const el = document.getElementById('step3-total-xp');
    if (el) el.textContent = total;
}

function saveAndCloseStep3() {
    // Read all current input values
    document.querySelectorAll('.step3-xp-input').forEach(input => {
        const fid = input.dataset.fighterId;
        endBattleState.step3.experienceAllocations.set(fid, parseInt(input.value) || 0);
    });

    setStepStatus(3, 'complete');
    revalidateDownstreamSteps(3);
    hideModal('end-battle-hub-modal');
    returnToHub();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4 — Exploration Dice
// ═══════════════════════════════════════════════════════════════════════════════
export function showExplorationDiceStep() {
    const content = document.getElementById('end-battle-hub-content');
    if (!content) return;

    const stats = getHeroExplorationStats();
    const rerollStats = getExplorationRerollStats();
    const fullyPaintedBonus = isFullyPaintedActive ? 1 : 0;
    const totalDice = stats.availableHeroes + rerollStats.additionalDice + rerollStats.victoryBonus + fullyPaintedBonus;

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-mordheim-gold">
                    <i class="fas fa-dice mr-2"></i>Paso 4: Dados de Exploración
                </h3>
                <button id="step4-close-btn" class="text-slate-400 hover:text-white transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>

            <div class="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h4 class="font-semibold text-slate-200 mb-3">Estadísticas de Héroes</h4>
                <div class="grid grid-cols-3 gap-3 text-center">
                    <div><span class="text-slate-400 text-sm">Héroes Totales</span><p class="text-xl font-bold text-mordheim-gold">${stats.totalHeroes}</p></div>
                    <div><span class="text-slate-400 text-sm">Bajas</span><p class="text-xl font-bold text-red-400">${stats.casualtyHeroes}</p></div>
                    <div><span class="text-slate-400 text-sm">Disponibles</span><p class="text-xl font-bold text-green-400">${stats.availableHeroes}</p></div>
                </div>
            </div>

            <div class="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h4 class="font-semibold text-slate-200 mb-3">Modificadores de Dados</h4>
                <div class="space-y-2">
                    <div class="flex justify-between"><span class="text-slate-400">Dados Adicionales</span><span class="text-mordheim-gold font-bold">${rerollStats.additionalDice}</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Repeticiones Disponibles</span><span class="text-mordheim-gold font-bold">${rerollStats.rerolls}</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Modificaciones de Dados</span><span class="text-mordheim-gold font-bold">${rerollStats.diceModifications}</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Bonificación por Victoria</span><span class="text-mordheim-gold font-bold">${rerollStats.victoryBonus}</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Banda Totalmente Pintada</span><span class="text-mordheim-gold font-bold">${fullyPaintedBonus}</span></div>
                </div>
            </div>

            ${renderDiceSources(rerollStats)}

            <div class="bg-green-900/30 p-4 rounded-lg border border-green-700 text-center">
                <span class="text-slate-300">Total de Dados a Tirar:</span>
                <p class="text-3xl font-bold text-green-400">${totalDice}</p>
            </div>

            <button id="step4-save-btn" class="w-full py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition">
                Continuar al Panel
            </button>
        </div>
    `;

    content.querySelector('#step4-close-btn').addEventListener('click', () => saveAndCloseStep4());
    content.querySelector('#step4-save-btn').addEventListener('click', () => saveAndCloseStep4());

    displayModal('end-battle-hub-modal');
}

function renderDiceSources(rerollStats) {
    let html = '';
    const allSources = [
        ...rerollStats.additionalDiceSources.map(s => ({ ...s, category: 'Dados Adicionales' })),
        ...rerollStats.rerollSources.map(s => ({ ...s, category: 'Repetición' })),
        ...rerollStats.modificationSources.map(s => ({ ...s, category: 'Modificación' }))
    ];

    if (allSources.length > 0) {
        html = '<div class="bg-slate-800 p-4 rounded-lg border border-slate-600"><h4 class="font-semibold text-slate-200 mb-3">Fuentes</h4><div class="space-y-1">';
        allSources.forEach(s => {
            html += `<div class="flex justify-between text-sm p-1"><span class="text-slate-300"><i class="fas fa-user text-slate-500 mr-1"></i>${s.name} — ${s.source}</span><span class="text-slate-500">${s.category}</span></div>`;
        });
        html += '</div></div>';
    }
    return html;
}

function saveAndCloseStep4() {
    endBattleState.step4.completed = true;
    setStepStatus(4, 'complete');
    refreshStepLocks();
    hideModal('end-battle-hub-modal');
    returnToHub();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 5 — Treasure Exploration
// ═══════════════════════════════════════════════════════════════════════════════
export function showTreasureExplorationStep() {
    // Use the existing treasure exploration modal but in hub mode
    window._endBattleHubMode = true;
    showTreasureExplorationModal();

    // After modal is shown, modify button behaviors for hub mode
    setTimeout(() => {
        // Override the calculate button to show save-to-hub button after calculation
        const calcBtn = document.getElementById('calculate-treasure-btn');
        if (calcBtn) {
            const originalCalc = calcBtn.cloneNode(true);
            calcBtn.parentNode.replaceChild(originalCalc, calcBtn);
            originalCalc.addEventListener('click', () => {
                handleTreasureCalculation();
                // After calculation, relabel and rewire the apply button
                setTimeout(() => {
                    const saveBtn = document.getElementById('apply-treasure-btn');
                    if (saveBtn && window.currentTreasureResult) {
                        saveBtn.textContent = 'Guardar y Volver';
                        saveBtn.className = 'py-2 px-4 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition';
                        saveBtn.classList.remove('hidden');

                        const freshBtn = saveBtn.cloneNode(true);
                        saveBtn.parentNode.replaceChild(freshBtn, saveBtn);
                        freshBtn.addEventListener('click', () => saveStep5AndReturn());
                    }
                }, 50);
            });
        }

        // Override the close (X) button to return to hub
        const closeBtn = document.getElementById('close-treasure-exploration-modal-btn');
        if (closeBtn) {
            const newCloseBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            newCloseBtn.addEventListener('click', () => {
                skipStep5AndReturn();
            });
        }

        // Override the Back button to return to hub
        const backBtn = document.getElementById('back-to-exploration-btn');
        if (backBtn) {
            const newBackBtn = backBtn.cloneNode(true);
            backBtn.parentNode.replaceChild(newBackBtn, backBtn);
            newBackBtn.addEventListener('click', () => {
                skipStep5AndReturn();
            });
        }
    }, 100);
}

function skipStep5AndReturn() {
    // User chose to skip treasure exploration (e.g., all heroes are casualties)
    // Mark as complete with null — no treasure found this battle
    endBattleState.step5.treasureFound = endBattleState.step5.treasureFound || 0;
    setStepStatus(5, 'complete');
    revalidateDownstreamSteps(5);
    hideModal('treasure-exploration-modal');
    window._endBattleHubMode = false;
    const saveBtn = document.getElementById('apply-treasure-btn');
    if (saveBtn) {
        saveBtn.className = 'hidden py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 transition';
        saveBtn.textContent = 'Aplicar a la Banda';
    }
    returnToHub();
}

function saveStep5AndReturn() {
    if (window.currentTreasureResult) {
        endBattleState.step5.treasureFound = window.currentTreasureResult.shards;
        endBattleState.step5.diceTotal = window.currentTreasureResult.total;
    }
    setStepStatus(5, 'complete');
    revalidateDownstreamSteps(5);
    hideModal('treasure-exploration-modal');
    window._endBattleHubMode = false;
    const saveBtn = document.getElementById('apply-treasure-btn');
    if (saveBtn) {
        saveBtn.className = 'hidden py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 transition';
        saveBtn.textContent = 'Aplicar a la Banda';
    }
    returnToHub();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 6 — Henchmen Groups
// ═══════════════════════════════════════════════════════════════════════════════
export function showHenchmenStep() {
    const content = document.getElementById('end-battle-hub-content');
    if (!content) return;

    const warningStep2 = getStepStatus(2) !== 'complete';

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-mordheim-gold">
                    <i class="fas fa-users mr-2"></i>Paso 6: Grupos de Secuaces
                </h3>
                <button id="step6-close-btn" class="text-slate-400 hover:text-white transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            ${warningStep2 ? '<div class="bg-amber-900/40 border border-amber-600 p-3 rounded-lg text-amber-300 text-sm"><i class="fas fa-exclamation-triangle mr-2"></i>Los datos de bajas (Paso 2) no están completos. El recuento de bajas de secuaces puede ser inexacto.</div>' : ''}
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-600">
                <label class="text-slate-300 font-semibold">Reserva de Experiencia Veterana (2D6):</label>
                <input type="number" inputmode="numeric" id="step6-veteran-pool" value="${endBattleState.step6.veteranPool || ''}" min="2" max="12" placeholder="2-12"
                    class="w-24 ml-3 p-2 rounded bg-slate-700 border border-slate-600 text-white text-center">
                <span class="ml-3 text-slate-400">Restante: <span id="step6-veteran-remaining" class="text-yellow-200">0 PX</span></span>
            </div>
            <div id="step6-groups-list" class="space-y-3 max-h-72 overflow-y-auto"></div>
            <div class="bg-slate-800 p-3 rounded-lg border border-slate-600 space-y-2">
                <div class="flex justify-between"><span class="text-slate-400">Coste Total de Refuerzo:</span><span id="step6-total-cost" class="text-mordheim-gold font-bold">0 CO</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Tesorería de la Banda:</span><span class="text-yellow-200">${currentWarband?.gc_treasury || 0} CO</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Coronas por Venta de Tesoro (Paso 7):</span><span class="text-yellow-200">${endBattleState.step7.goldFromSale || 0} CO</span></div>
                <div id="step6-affordability" class="text-sm"></div>
            </div>
            <button id="step6-save-btn" class="w-full py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition">
                Guardar y Volver
            </button>
        </div>
    `;

    renderStep6Groups();

    content.querySelector('#step6-close-btn').addEventListener('click', () => saveAndCloseStep6());
    content.querySelector('#step6-save-btn').addEventListener('click', () => saveAndCloseStep6());

    const vetInput = document.getElementById('step6-veteran-pool');
    if (vetInput) {
        vetInput.addEventListener('input', () => {
            endBattleState.step6.veteranPool = parseInt(vetInput.value) || 0;
            updateStep6Display();
        });
        vetInput.addEventListener('focus', () => vetInput.select());
    }

    displayModal('end-battle-hub-modal');
}

function renderStep6Groups() {
    const container = document.getElementById('step6-groups-list');
    if (!container || !currentWarband?.members) return;
    container.innerHTML = '';

    const henchmenGroups = currentWarband.members.filter(m => m.type === 'Henchman');

    if (henchmenGroups.length === 0) {
        container.innerHTML = '<p class="text-slate-400">No hay grupos de secuaces en la banda.</p>';
        return;
    }

    henchmenGroups.forEach(group => {
        const originalSize = group.group_size || 1;
        const effectiveSize = getEffectiveGroupSize(group.id);
        const deadCount = originalSize - effectiveSize;
        const savedSelection = endBattleState.step6.replenishments.get(group.id);
        const currentCount = savedSelection?.count || 0;

        const currentXP = group.xp || 0;
        const pendingXP = endBattleState.step3.experienceAllocations.get(group.id) || 0;
        const totalXP = currentXP + pendingXP;
        const equipmentCost = calculateEquipmentCost(adjustEquipmentCosts(group.equipment || []));
        const baseCost = group.cost || 0;
        const experienceCost = totalXP * 2;
        const perFighterCost = baseCost + equipmentCost + experienceCost;

        const div = document.createElement('div');
        div.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600';
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h5 class="font-semibold text-mordheim-gold">${group.name}</h5>
                    <p class="text-sm text-slate-400">Actual: ${originalSize} | Tras secuelas: ${effectiveSize}${deadCount > 0 ? ` <span class="text-red-400">(${deadCount} muertos)</span>` : ''}</p>
                </div>
            </div>
            <div class="space-y-3">
                <div class="flex items-center space-x-4">
                    <label class="text-slate-300">Guerreros a añadir:</label>
                    <input type="number" inputmode="numeric" id="step6-count-${group.id}" value="${currentCount}" min="0" max="10"
                        class="step6-count-input w-20 p-2 rounded bg-slate-700 border border-slate-600 text-white text-center"
                        data-group-id="${group.id}" data-per-fighter-cost="${perFighterCost}" data-xp-per-fighter="${totalXP}">
                </div>
                <div class="text-sm space-y-1">
                    <div class="flex justify-between"><span class="text-slate-400">Coste base:</span><span class="text-yellow-200">${baseCost} CO</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Coste de equipo:</span><span class="text-yellow-200">${equipmentCost} CO</span></div>
                    <div class="flex justify-between"><span class="text-slate-400">Coste PX (${currentXP}${pendingXP > 0 ? ` + ${pendingXP} pendientes` : ''} = ${totalXP} PX × 2 CO):</span><span class="text-yellow-200">${experienceCost} CO</span></div>
                    <div class="flex justify-between font-bold border-t border-slate-600 pt-1 mt-1">
                        <span class="text-slate-200">Coste por guerrero:</span>
                        <span class="text-mordheim-gold">${perFighterCost} CO</span>
                    </div>
                    <div class="flex justify-between font-bold">
                        <span class="text-slate-200">Total para el grupo:</span>
                        <span id="step6-group-total-${group.id}" class="text-mordheim-gold">${currentCount * perFighterCost} CO</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);

        const countInput = div.querySelector(`#step6-count-${group.id}`);
        countInput.addEventListener('input', () => updateStep6Display());
        countInput.addEventListener('focus', () => countInput.select());
    });

    updateStep6Display();
}

function updateStep6Display() {
    let totalCost = 0;
    let remainingVeteranPool = endBattleState.step6.veteranPool;
    endBattleState.step6.replenishments.clear();

    document.querySelectorAll('.step6-count-input').forEach(input => {
        const groupId = input.dataset.groupId;
        const perFighterCost = parseFloat(input.dataset.perFighterCost) || 0;
        const xpPerFighter = parseInt(input.dataset.xpPerFighter) || 0;
        const count = parseInt(input.value) || 0;

        if (count > 0) {
            const xpUsed = xpPerFighter * count;
            remainingVeteranPool -= xpUsed;

            const groupTotal = perFighterCost * count;

            totalCost += groupTotal;

            endBattleState.step6.replenishments.set(groupId, {
                count,
                cost: groupTotal,
                xpUsed
            });

            const groupTotalEl = document.getElementById(`step6-group-total-${groupId}`);
            if (groupTotalEl) groupTotalEl.textContent = `${groupTotal} CO`;
        } else {
            endBattleState.step6.replenishments.delete(groupId);
            const groupTotalEl = document.getElementById(`step6-group-total-${groupId}`);
            if (groupTotalEl) groupTotalEl.textContent = '0 CO';
        }
    });

    endBattleState.step6.totalReplenishmentCost = totalCost;

    // Update displays
    const totalCostEl = document.getElementById('step6-total-cost');
    if (totalCostEl) totalCostEl.textContent = `${totalCost} CO`;

    const vetRemainingEl = document.getElementById('step6-veteran-remaining');
    if (vetRemainingEl) {
        vetRemainingEl.textContent = `${remainingVeteranPool} PX`;
        vetRemainingEl.className = remainingVeteranPool < 0 ? 'text-red-400 font-bold' : 'text-yellow-200';
    }

    // Affordability check
    const treasury = currentWarband?.gc_treasury || 0;
    const goldFromSale = endBattleState.step7.goldFromSale || 0;
    const canAfford = (treasury + goldFromSale) >= totalCost;
    const vetPoolOk = remainingVeteranPool >= 0;

    const affordEl = document.getElementById('step6-affordability');
    if (affordEl) {
        if (totalCost === 0) {
            affordEl.innerHTML = '';
        } else if (!vetPoolOk) {
            affordEl.innerHTML = '<span class="text-red-400"><i class="fas fa-times-circle mr-1"></i>No hay suficientes puntos de PX veterana</span>';
        } else if (!canAfford) {
            affordEl.innerHTML = '<span class="text-red-400"><i class="fas fa-times-circle mr-1"></i>No se puede pagar — tesorería + venta de tesoro insuficiente</span>';
        } else {
            affordEl.innerHTML = '<span class="text-green-400"><i class="fas fa-check-circle mr-1"></i>Asequible</span>';
        }
    }

    // Disable save button if invalid
    const saveBtn = document.getElementById('step6-save-btn');
    if (saveBtn) {
        if (totalCost > 0 && (!vetPoolOk || !canAfford)) {
            saveBtn.disabled = true;
            saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            saveBtn.disabled = false;
            saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
}

function saveAndCloseStep6() {
    setStepStatus(6, 'complete');
    revalidateDownstreamSteps(6);
    hideModal('end-battle-hub-modal');
    returnToHub();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 7 — Sell Treasure
// ═══════════════════════════════════════════════════════════════════════════════
// STEP 7 — Sell Treasure
// ═══════════════════════════════════════════════════════════════════════════════
export function showSellTreasureStep() {
    const content = document.getElementById('end-battle-hub-content');
    if (!content) return;

    const available = getAvailableTreasure();
    const warbandSizeVal = getWarbandSizeValueFromState();
    const savedToSell = endBattleState.step7.treasureToSell;
    const repCost = endBattleState.step6.totalReplenishmentCost;
    const treasury = currentWarband?.gc_treasury || 0;
    const remainingCost = Math.max(0, repCost - treasury);

    // Calculate min treasure needed for replenishment
    let minTreasureNeeded = 0;
    if (remainingCost > 0) {
        for (let s = 1; s <= 12; s++) {
            if (getTreasureSellingValue(s, warbandSizeVal) >= remainingCost) {
                minTreasureNeeded = s;
                break;
            }
        }
        if (minTreasureNeeded === 0) minTreasureNeeded = 12;
    }

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-mordheim-gold">
                    <i class="fas fa-coins mr-2"></i>Paso 7: Vender Tesoro
                </h3>
                <button id="step7-close-btn" class="text-slate-400 hover:text-white transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>

            <div class="bg-slate-800 p-3 rounded-lg border border-slate-600">
                <div class="flex justify-between mb-2"><span class="text-slate-400">Tesoro Disponible:</span><span class="text-mordheim-gold font-bold">${available} fragmento(s)</span></div>
                <div class="flex justify-between mb-2"><span class="text-slate-400">Tesoro Actual de la Banda:</span><span class="text-yellow-200">${currentWarband?.treasure || 0}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">Tesoro Encontrado (Paso 5):</span><span class="text-yellow-200">${endBattleState.step5.treasureFound}</span></div>
                ${getCutpurseBonusTreasure() > 0 ? `<div class="flex justify-between"><span class="text-slate-400">Regla especial Cortabolsas:</span><span class="text-yellow-200">+1</span></div>` : ''}
                ${getWilyThiefBonusTreasure() > 0 ? `<div class="flex justify-between"><span class="text-slate-400">Ladrón Astuto:</span><span class="text-yellow-200">+${getWilyThiefBonusTreasure()}</span></div>` : ''}
            </div>

            ${repCost > 0 ? `
            <div class="bg-amber-900/30 p-3 rounded-lg border border-amber-700 text-sm">
                <div class="flex justify-between mb-1"><span class="text-amber-300">Coste de Refuerzo de Secuaces:</span><span class="text-amber-200 font-bold">${repCost} CO</span></div>
                <div class="flex justify-between mb-1"><span class="text-amber-300">Cubierto por la Tesorería:</span><span class="text-amber-200">${Math.min(treasury, repCost)} CO</span></div>
                ${remainingCost > 0 ? `<div class="flex justify-between"><span class="text-amber-300">Tesoro Mínimo Necesario:</span><span class="text-amber-200 font-bold">${minTreasureNeeded}+ fragmento(s)</span></div>` : '<div class="text-green-400">Totalmente cubierto por la tesorería</div>'}
            </div>` : ''}

            <div class="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <label class="text-slate-300 font-semibold block mb-2">Tamaño de la Banda (para valor de venta):</label>
                <select id="step7-warband-size" class="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white">
                    <option value="2" ${warbandSizeVal === 2 ? 'selected' : ''}>1-3 guerreros</option>
                    <option value="5" ${warbandSizeVal === 5 ? 'selected' : ''}>4-6 guerreros</option>
                    <option value="8" ${warbandSizeVal === 8 ? 'selected' : ''}>7-9 guerreros</option>
                    <option value="11" ${warbandSizeVal === 11 ? 'selected' : ''}>10-12 guerreros</option>
                    <option value="14" ${warbandSizeVal === 14 ? 'selected' : ''}>13-15 guerreros</option>
                    <option value="16" ${warbandSizeVal === 16 ? 'selected' : ''}>16+ guerreros</option>
                </select>
            </div>

            <div class="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <label class="text-slate-300 font-semibold block mb-2">Tesoro a Vender:</label>
                <input type="number" inputmode="numeric" id="step7-treasure-to-sell" value="${savedToSell}" min="0" max="${available}"
                    class="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white text-center text-lg">
                <div class="mt-3 text-center">
                    <span class="text-slate-400">Coronas por la Venta:</span>
                    <span id="step7-gold-value" class="text-2xl font-bold text-mordheim-gold ml-2">0</span>
                    <span class="text-slate-400"> CO</span>
                </div>
            </div>

            <button id="step7-save-btn" class="w-full py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition">
                Guardar y Volver
            </button>
        </div>
    `;

    // Initial value calculation
    updateStep7Value();

    content.querySelector('#step7-close-btn').addEventListener('click', () => saveAndCloseStep7());
    content.querySelector('#step7-save-btn').addEventListener('click', () => saveAndCloseStep7());

    const treasureToSellInput = document.getElementById('step7-treasure-to-sell');
    treasureToSellInput?.addEventListener('input', () => updateStep7Value());
    treasureToSellInput?.addEventListener('focus', () => treasureToSellInput.select());
    document.getElementById('step7-warband-size')?.addEventListener('change', () => updateStep7Value());

    displayModal('end-battle-hub-modal');
}

function updateStep7Value() {
    const toSell = parseInt(document.getElementById('step7-treasure-to-sell')?.value) || 0;
    const warbandSizeVal = parseInt(document.getElementById('step7-warband-size')?.value) || 2;
    const gold = toSell > 0 ? getTreasureSellingValue(toSell, warbandSizeVal) : 0;

    endBattleState.step7.treasureToSell = toSell;
    endBattleState.step7.goldFromSale = gold;
    endBattleState.step7.warbandSizeValue = warbandSizeVal;

    const goldEl = document.getElementById('step7-gold-value');
    if (goldEl) goldEl.textContent = gold;
}

function saveAndCloseStep7() {
    updateStep7Value();
    setStepStatus(7, 'complete');
    revalidateDownstreamSteps(7);
    hideModal('end-battle-hub-modal');
    returnToHub();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 8 — Special (Post-Game Skills & Rules)
// ═══════════════════════════════════════════════════════════════════════════════
export function showSpecialStep() {
    const content = document.getElementById('end-battle-hub-content');
    if (!content) return;

    const applicable = getApplicableSpecials(currentWarband);

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-mordheim-gold">
                    <i class="fas fa-bolt mr-2"></i>Paso 8: Especial
                </h3>
                <button id="step8-special-close-btn" class="text-slate-400 hover:text-white transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div id="step8-special-list" class="space-y-3 max-h-96 overflow-y-auto"></div>
            <button id="step8-special-save-btn" class="w-full py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition">
                Guardar y Volver
            </button>
        </div>
    `;

    const listContainer = content.querySelector('#step8-special-list');

    if (applicable.length === 0) {
        listContainer.innerHTML = '<p class="text-slate-400 text-center py-4">No se aplican reglas especiales tras la batalla a esta banda.</p>';
    } else {
        renderSpecialsList(listContainer, applicable);
    }

    content.querySelector('#step8-special-close-btn').addEventListener('click', () => saveAndCloseStep8Special(applicable));
    content.querySelector('#step8-special-save-btn').addEventListener('click', () => saveAndCloseStep8Special(applicable));

    displayModal('end-battle-hub-modal');
}

function renderSpecialsList(container, applicable) {
    container.innerHTML = '';
    applicable.forEach(({ handler, fighters }) => {
        handler.render(container, fighters, () => {
            // Re-render on state change
            renderSpecialsList(container, applicable);
        });
    });
}

function saveAndCloseStep8Special(applicable) {
    if (applicable.length === 0 || areAllSpecialsComplete(currentWarband)) {
        setStepStatus(8, 'complete');
    } else {
        setStepStatus(8, 'incomplete');
    }
    revalidateDownstreamSteps(8);
    hideModal('end-battle-hub-modal');
    returnToHub();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 9 — Summary
// ═══════════════════════════════════════════════════════════════════════════════
export function showSummaryStep() {
    const content = document.getElementById('end-battle-hub-content');
    if (!content) return;

    const canApply = canApplyAll();
    const warnings = getActiveWarnings();

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-bold text-mordheim-gold">
                    <i class="fas fa-clipboard-check mr-2"></i>Paso 9: Resumen
                </h3>
                <button id="step9-close-btn" class="text-slate-400 hover:text-white transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>

            ${warnings.length > 0 ? `
            <div class="bg-red-900/30 border border-red-700 p-3 rounded-lg space-y-1">
                <p class="text-red-400 font-bold"><i class="fas fa-exclamation-triangle mr-2"></i>No se pueden aplicar — resuelve primero los avisos:</p>
                ${warnings.map(w => `<p class="text-red-300 text-sm">• ${w}</p>`).join('')}
            </div>` : ''}

            <div id="step9-summary-content" class="space-y-3 max-h-80 overflow-y-auto"></div>

            <button id="step9-apply-btn" class="w-full py-3 font-bold rounded-lg transition
                ${canApply ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-slate-600 text-slate-400 cursor-not-allowed'}"
                ${canApply ? '' : 'disabled'}>
                <i class="fas fa-check mr-2"></i>Aplicar Todos los Cambios
            </button>
            <button id="step9-back-btn" class="w-full py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition">
                Volver al Panel
            </button>
        </div>
    `;

    renderSummaryContent();

    content.querySelector('#step9-close-btn').addEventListener('click', () => {
        hideModal('end-battle-hub-modal');
        returnToHub();
    });
    content.querySelector('#step9-back-btn').addEventListener('click', () => {
        hideModal('end-battle-hub-modal');
        returnToHub();
    });

    if (canApply) {
        content.querySelector('#step9-apply-btn').addEventListener('click', async () => {
            await applyAllChanges();
        });
    }

    displayModal('end-battle-hub-modal');
}

function getActiveWarnings() {
    const warnings = [];
    for (let i = 1; i <= 8; i++) {
        const status = getStepStatus(i);
        const label = ['', 'Resultados de la Batalla', 'Heridas Graves', 'Asignación de Experiencia', 'Dados de Exploración', 'Exploración del Tesoro', 'Grupos de Secuaces', 'Vender Tesoro', 'Especial'][i];
        if (status === 'warning') {
            warnings.push(`El Paso ${i} (${label}) tiene un aviso`);
        } else if (status === 'incomplete' || status === 'locked') {
            warnings.push(`El Paso ${i} (${label}) no está completo`);
        }
    }
    return warnings;
}

function renderSummaryContent() {
    const container = document.getElementById('step9-summary-content');
    if (!container) return;
    container.innerHTML = '';

    // Step 1 — Battle Result
    const br = endBattleState.step1.battleResult;
    addSummarySection(container, 'Resultado de la Batalla', br ? (br === 'victory' ? '<span class="text-green-400">Victoria</span>' : '<span class="text-red-400">Derrota</span>') : '<span class="text-slate-500">No establecido</span>');

    // Step 2 — Injuries
    let injurySummary = '';
    endBattleState.step2.casualtyResolutions.forEach((res, fid) => {
        const fighter = currentWarband?.members?.find(f => f.id === fid);
        if (!fighter) return;
        if (res.removed) {
            injurySummary += `<div class="text-red-400 text-sm">${fighter.name} — Eliminado</div>`;
        } else if (res.injury) {
            injurySummary += `<div class="text-yellow-300 text-sm">${fighter.name} — ${res.injury}</div>`;
        } else if (res.deadCount > 0) {
            injurySummary += `<div class="text-red-400 text-sm">${fighter.name} — ${res.deadCount} muerto(s)</div>`;
        } else if (res.sicknessResolved !== undefined) {
            injurySummary += `<div class="text-sm ${res.sicknessResolved ? 'text-green-400' : 'text-orange-400'}">${fighter.name} — ${res.sicknessResolved ? 'Recuperado' : 'Sigue Enfermo'}</div>`;
        }
    });
    addSummarySection(container, 'Heridas Graves', injurySummary || '<span class="text-slate-500">Sin bajas</span>');

    // Step 3 — Experience
    let xpSummary = '';
    let totalXP = 0;
    endBattleState.step3.experienceAllocations.forEach((xp, fid) => {
        if (xp <= 0) return;
        const fighter = currentWarband?.members?.find(f => f.id === fid);
        if (!fighter) return;
        xpSummary += `<div class="text-sm text-slate-300">${fighter.name}: +${xp} PX</div>`;
        totalXP += xp;
    });
    addSummarySection(container, `Experiencia (Total: ${totalXP})`, xpSummary || '<span class="text-slate-500">Sin PX</span>');

    // Step 5 — Treasure Found
    const cutpurseBonus = getCutpurseBonusTreasure();
    const wilyThiefBonus = getWilyThiefBonusTreasure();
    let treasureHtml = `<span class="text-mordheim-gold">${endBattleState.step5.treasureFound} fragmento(s)</span>`;
    if (cutpurseBonus > 0) {
        treasureHtml += `<div class="text-sm text-green-400 mt-1"><i class="fas fa-plus-circle mr-1"></i>+1 regla especial Cortabolsas</div>`;
    }
    if (wilyThiefBonus > 0) {
        treasureHtml += `<div class="text-sm text-green-400 mt-1"><i class="fas fa-plus-circle mr-1"></i>+${wilyThiefBonus} Ladrón Astuto</div>`;
    }
    addSummarySection(container, 'Tesoro Encontrado', treasureHtml);

    // Step 6 — Henchmen
    let henchSummary = '';
    endBattleState.step6.replenishments.forEach((sel, gid) => {
        const group = currentWarband?.members?.find(f => f.id === gid);
        if (!group || sel.count <= 0) return;
        henchSummary += `<div class="text-sm text-slate-300">${group.name}: +${sel.count} guerrero(s) (${sel.cost} CO)</div>`;
    });
    if (endBattleState.step6.totalReplenishmentCost > 0) {
        henchSummary += `<div class="text-sm font-bold text-mordheim-gold mt-1">Total: ${endBattleState.step6.totalReplenishmentCost} CO</div>`;
    }
    addSummarySection(container, 'Refuerzo de Secuaces', henchSummary || '<span class="text-slate-500">Sin cambios</span>');

    // Step 7 — Treasure Sale
    const ts = endBattleState.step7;
    const existingTreasure = currentWarband?.treasure || 0;
    const foundTreasure = endBattleState.step5.treasureFound || 0;
    const totalAvailable = existingTreasure + foundTreasure;
    const overselling = ts.treasureToSell > totalAvailable;

    if (ts.treasureToSell > 0) {
        let saleHtml = `<span class="${overselling ? 'text-red-400' : 'text-mordheim-gold'}">Vender ${ts.treasureToSell} fragmento(s) por ${ts.goldFromSale} CO</span>`;
        if (overselling) {
            saleHtml += `<div class="text-red-400 text-sm mt-1"><i class="fas fa-exclamation-triangle mr-1"></i>Vendiendo ${ts.treasureToSell} fragmento(s) pero solo hay ${totalAvailable} disponible(s) (${existingTreasure} en reserva + ${foundTreasure} encontrado(s))</div>`;
        }
        addSummarySection(container, 'Venta de Tesoro', saleHtml, overselling);
    } else {
        addSummarySection(container, 'Venta de Tesoro', '<span class="text-slate-500">Sin venta</span>');
    }

    // Step 8 — Special Results
    const specialsHtml = getSpecialsSummaryHtml(currentWarband);
    addSummarySection(container, 'Especial', specialsHtml || '<span class="text-slate-500">Sin eventos especiales</span>');
}

function addSummarySection(container, title, contentHtml, isWarning = false) {
    const div = document.createElement('div');
    div.className = isWarning
        ? 'bg-red-900/30 p-3 rounded-lg border border-red-700'
        : 'bg-slate-800 p-3 rounded-lg border border-slate-600';
    const titleClass = isWarning ? 'text-red-400' : 'text-slate-200';
    div.innerHTML = `<h5 class="font-semibold ${titleClass} mb-1">${title}</h5><div>${contentHtml}</div>`;
    container.appendChild(div);
}
