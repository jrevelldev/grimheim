/**
 * Card Viewer Modal ("Modo Mesa" / Horizontal Swipe Card Carousel)
 * Provides a mobile-first horizontal scroll-snap carousel of 63mm x 88mm fighter cards
 * with quick fighter jumping, tabletop status tracking (wounds, standing/knocked down/stunned/OOA,
 * turn activation), and tap-to-inspect rule popups for weapons, skills, rules, injuries, and spells.
 */

import { currentWarband, getWarbands } from '../state.js';
import { renderFighterCard, calculateFighterStats } from './card-renderer.js';
import { loadFighterLayout } from './card-storage.js';
import { getBuilderDeck } from './card-deck.js';
import { MASTER_EQUIPMENT_LIST, SPECIAL_RULES_DETAILS, MAGIC, MASTER_INJURY_LIST } from '../data/index.js';
import { findSkillForWarband } from '../skill-lookup.js';
import {
    translateEquipment,
    translateEquipmentRules,
    translateSkill,
    translateSpecialRule,
    translateInjury,
    translateInjuryDescription,
    translateWarriorRole,
    translateFighterType,
    getWeaponRuleSummary,
    getSpecialRuleSummary,
    formatDistanceText
} from '../i18n.js';

const VIEWER_STATE_STORAGE_KEY = 'grimheim_card_viewer_tabletop_v1';

let viewerModalEl = null;
let activeViewerWarband = null;
let activeFilter = 'all'; // 'all' | 'Hero' | 'Henchman' | ...
let activeSlideIndex = 0;
let tabletopState = {};
let resizeObserver = null;
let scrollDebounceTimer = null;

function loadTabletopState() {
    try {
        const raw = localStorage.getItem(VIEWER_STATE_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                tabletopState = parsed;
                return;
            }
        }
    } catch (e) {
        console.warn('Could not load tabletop card state:', e);
    }
    tabletopState = {};
}

function saveTabletopState() {
    try {
        localStorage.setItem(VIEWER_STATE_STORAGE_KEY, JSON.stringify(tabletopState));
    } catch (e) {
        console.warn('Could not save tabletop card state:', e);
    }
}

function getDeckId(warband) {
    if (!warband) return 'default_deck';
    if (warband.isCustomDeck || warband.id === 'custom-card-deck') return 'custom_card_deck';
    return String(warband.id || warband.name || 'warband');
}

function getFighterMaxWounds(fighter) {
    if (!fighter) return 1;
    const isMulti = fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v));
    if (isMulti) {
        const firstKey = Object.keys(fighter.stats)[0] || 'Fighter';
        const calc = calculateFighterStats(fighter, firstKey);
        return Math.max(1, parseInt(calc?.W) || 1);
    }
    const calc = calculateFighterStats(fighter, 'Fighter');
    return Math.max(1, parseInt(calc?.W) || 1);
}

function getFighterGroupCount(fighter) {
    if (!fighter || fighter.type !== 'Henchman') return 1;
    const size = parseInt(fighter.group_size) || 1;
    const cas = parseInt(fighter.casualties) || 0;
    return Math.max(1, size - cas);
}

function getFighterState(warband, fighter) {
    const deckId = getDeckId(warband);
    const fId = String(fighter?.id || fighter?.name || 'unknown');
    const key = `${deckId}::${fId}`;
    const maxWounds = getFighterMaxWounds(fighter);
    const maxGroup = getFighterGroupCount(fighter);

    if (!tabletopState[key]) {
        tabletopState[key] = {
            wounds: maxWounds,
            maxWounds,
            groupAlive: maxGroup,
            maxGroup,
            status: 'standing', // 'standing' | 'knocked_down' | 'stunned' | 'out_of_action'
            activated: false
        };
    } else {
        // Keep max bounds in sync with current stats
        tabletopState[key].maxWounds = maxWounds;
        if (typeof tabletopState[key].wounds !== 'number' || tabletopState[key].wounds > maxWounds) {
            tabletopState[key].wounds = maxWounds;
        }
        tabletopState[key].maxGroup = maxGroup;
        if (typeof tabletopState[key].groupAlive !== 'number' || tabletopState[key].groupAlive > maxGroup) {
            tabletopState[key].groupAlive = maxGroup;
        }
    }
    return tabletopState[key];
}

function updateFighterState(warband, fighter, patch) {
    const state = getFighterState(warband, fighter);
    Object.assign(state, patch);
    saveTabletopState();
    return state;
}

function getFilteredMembers() {
    const members = activeViewerWarband?.members || [];
    if (activeFilter === 'all') return members;
    return members.filter(m => m.type === activeFilter);
}

/**
 * Ensures the Card Viewer Modal exists in the DOM
 */
function ensureViewerModal() {
    const existing = document.getElementById('card-viewer-modal');
    if (existing) {
        viewerModalEl = existing;
        return;
    }

    const html = `
        <div id="card-viewer-modal" class="hidden fixed inset-0 bg-[#08090c]/95 backdrop-blur-xl flex flex-col z-[10050] select-none">
            <!-- Top Header Bar -->
            <div class="card-viewer-header flex items-center justify-between gap-2 px-3 sm:px-5 py-2.5 bg-[#101114] border-b border-white/10 flex-shrink-0">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                    <div class="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#dfbc77] flex-shrink-0">
                        <i class="fas fa-layer-group text-sm"></i>
                    </div>
                    <div class="min-w-0 flex-1 max-w-xs">
                        <select id="card-viewer-deck-select" class="w-full bg-[#15161a] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-bold text-[#dfbc77] truncate focus:border-[#dfbc77] focus:outline-none transition cursor-pointer">
                        </select>
                    </div>
                </div>

                <!-- Right Header Actions -->
                <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <button type="button" id="card-viewer-new-turn-btn" class="px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border border-amber-500/35 rounded-lg text-xs font-semibold transition flex items-center gap-1.5" title="Nuevo Turno: desmarca los guerreros activados y pasa Aturdidos a Derribados">
                        <i class="fas fa-hourglass-start text-[11px]"></i>
                        <span class="hidden sm:inline">Nuevo Turno</span>
                    </button>
                    <button type="button" id="card-viewer-reset-state-btn" class="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 rounded-lg text-xs font-medium transition flex items-center gap-1.5" title="Reiniciar heridas y estados de mesa">
                        <i class="fas fa-undo-alt text-[11px]"></i>
                        <span class="hidden md:inline">Reiniciar</span>
                    </button>
                    <button type="button" id="card-viewer-open-studio-btn" class="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 rounded-lg text-xs font-semibold transition flex items-center gap-1.5" title="Personalizar diseño en el Creador de Cartas">
                        <i class="fas fa-sliders-h text-[11px] text-[#dfbc77]"></i>
                        <span class="hidden sm:inline">Diseño</span>
                    </button>
                    <button type="button" id="card-viewer-close-btn" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 border border-white/10 flex items-center justify-center transition" title="Cerrar Visor">
                        <i class="fas fa-times text-base"></i>
                    </button>
                </div>
            </div>

            <!-- Sub-bar: Filter Pills & Counter -->
            <div class="flex items-center justify-between gap-2 px-3 sm:px-5 py-1.5 bg-[#121317] border-b border-white/5 flex-shrink-0 overflow-x-auto no-scrollbar">
                <div id="card-viewer-filter-bar" class="flex items-center gap-1.5">
                    <!-- Populated dynamically -->
                </div>
                <div class="flex items-center gap-2 flex-shrink-0 pl-2">
                    <span class="text-[11px] text-slate-400 hidden sm:inline"><i class="fas fa-hand-pointer mr-1 text-[#dfbc77]/80"></i>Toca un arma o regla en la carta para ver su detalle</span>
                    <span id="card-viewer-counter-badge" class="px-2.5 py-0.5 rounded-full bg-[#1a1c23] border border-white/10 text-xs font-bold text-[#dfbc77]">
                        0 / 0
                    </span>
                </div>
            </div>

            <!-- Main Carousel Viewport -->
            <div id="card-viewer-viewport" class="relative flex-1 min-h-0 flex items-center overflow-hidden">
                <!-- Desktop / Tablet Prev Button -->
                <button type="button" id="card-viewer-prev-btn" class="hidden sm:flex absolute left-3 z-20 w-10 h-10 rounded-full bg-[#15161a]/90 hover:bg-[#1f2128] text-[#dfbc77] border border-white/15 shadow-xl items-center justify-center transition disabled:opacity-25 disabled:pointer-events-none" title="Carta anterior">
                    <i class="fas fa-chevron-left"></i>
                </button>

                <!-- Horizontal Scroll-Snap Track -->
                <div id="card-viewer-carousel" class="card-viewer-carousel w-full h-full flex items-center overflow-x-auto overflow-y-hidden">
                    <!-- Slides populated dynamically -->
                </div>

                <!-- Desktop / Tablet Next Button -->
                <button type="button" id="card-viewer-next-btn" class="hidden sm:flex absolute right-3 z-20 w-10 h-10 rounded-full bg-[#15161a]/90 hover:bg-[#1f2128] text-[#dfbc77] border border-white/15 shadow-xl items-center justify-center transition disabled:opacity-25 disabled:pointer-events-none" title="Carta siguiente">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>

            <!-- Bottom Quick-Jump Fighter Strip -->
            <div class="bg-[#101114] border-t border-white/10 px-2.5 sm:px-5 py-2 flex-shrink-0">
                <div id="card-viewer-thumb-strip" class="flex items-center gap-1.5 overflow-x-auto custom-scroll pb-0.5">
                    <!-- Quick-jump pills populated dynamically -->
                </div>
            </div>

            <!-- Tap-to-Inspect Rule / Equipment / Skill Detail Sheet -->
            <div id="card-viewer-detail-overlay" class="hidden fixed inset-0 bg-black/70 backdrop-blur-xs z-[10060] flex items-end sm:items-center justify-center p-0 sm:p-4">
                <div class="bg-[#15161a] border-t sm:border border-white/15 rounded-t-2xl sm:rounded-2xl w-full max-w-md p-4 sm:p-5 shadow-2xl max-h-[80vh] flex flex-col animate-slide-up">
                    <div class="flex items-start justify-between gap-3 border-b border-white/10 pb-3 mb-3">
                        <div>
                            <span id="card-viewer-detail-badge" class="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-[#dfbc77] border border-amber-500/30 mb-1">Regla</span>
                            <h4 id="card-viewer-detail-title" class="text-base sm:text-lg font-bold text-white leading-snug"></h4>
                        </div>
                        <button type="button" id="card-viewer-detail-close" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div id="card-viewer-detail-body" class="text-xs sm:text-sm text-slate-200 leading-relaxed overflow-y-auto custom-scroll space-y-2 pr-1">
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    viewerModalEl = document.getElementById('card-viewer-modal');
    bindViewerEvents();
}

function bindViewerEvents() {
    if (!viewerModalEl) return;

    document.getElementById('card-viewer-close-btn')?.addEventListener('click', closeCardViewerModal);

    // Deck selector change
    document.getElementById('card-viewer-deck-select')?.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === '__custom_deck__') {
            activeViewerWarband = getBuilderDeck();
        } else {
            const warbands = getWarbands() || [];
            const found = warbands.find(w => String(w.id) === val);
            if (found) activeViewerWarband = found;
        }
        activeFilter = 'all';
        activeSlideIndex = 0;
        renderViewerAll();
    });

    // New Turn button: clear 'activated' and optionally recover stunned -> knocked_down
    document.getElementById('card-viewer-new-turn-btn')?.addEventListener('click', () => {
        const members = activeViewerWarband?.members || [];
        members.forEach(f => {
            const st = getFighterState(activeViewerWarband, f);
            st.activated = false;
            if (st.status === 'stunned') {
                st.status = 'knocked_down';
            }
        });
        saveTabletopState();
        refreshSlideStatesUI();
        renderThumbStrip();
    });

    // Reset Battle States button
    document.getElementById('card-viewer-reset-state-btn')?.addEventListener('click', () => {
        const members = activeViewerWarband?.members || [];
        members.forEach(f => {
            const maxWounds = getFighterMaxWounds(f);
            const maxGroup = getFighterGroupCount(f);
            updateFighterState(activeViewerWarband, f, {
                wounds: maxWounds,
                maxWounds,
                groupAlive: maxGroup,
                maxGroup,
                status: 'standing',
                activated: false
            });
        });
        refreshSlideStatesUI();
        renderThumbStrip();
    });

    // Open Studio button (jumps to Card Builder for the active fighter)
    document.getElementById('card-viewer-open-studio-btn')?.addEventListener('click', () => {
        const members = getFilteredMembers();
        const currentFighter = members[activeSlideIndex] || null;
        const targetWarband = activeViewerWarband;
        const isCustom = targetWarband?.isCustomDeck || targetWarband?.id === 'custom-card-deck';
        closeCardViewerModal();
        import('./card-builder-modal.js').then(mod => {
            mod.openCardBuilderModal(targetWarband, currentFighter?.id || null, {
                source: isCustom ? 'menu' : 'warband'
            });
        });
    });

    // Prev / Next buttons
    document.getElementById('card-viewer-prev-btn')?.addEventListener('click', () => {
        scrollToSlide(activeSlideIndex - 1);
    });
    document.getElementById('card-viewer-next-btn')?.addEventListener('click', () => {
        scrollToSlide(activeSlideIndex + 1);
    });

    // Carousel scroll tracking
    const carousel = document.getElementById('card-viewer-carousel');
    carousel?.addEventListener('scroll', () => {
        if (scrollDebounceTimer) cancelAnimationFrame(scrollDebounceTimer);
        scrollDebounceTimer = requestAnimationFrame(updateActiveSlideFromScroll);
    }, { passive: true });

    // Delegate clicks inside carousel (status buttons, wound counters, and card pills)
    carousel?.addEventListener('click', (e) => {
        // 1. Check tabletop control buttons
        const actionBtn = e.target.closest('[data-viewer-action]');
        if (actionBtn) {
            e.stopPropagation();
            const slideEl = actionBtn.closest('.card-viewer-slide');
            if (!slideEl) return;
            const idx = parseInt(slideEl.dataset.slideIndex);
            const members = getFilteredMembers();
            const fighter = members[idx];
            if (!fighter) return;

            const action = actionBtn.dataset.viewerAction;
            const st = getFighterState(activeViewerWarband, fighter);

            if (action === 'wound-dec') {
                st.wounds = Math.max(0, st.wounds - 1);
                if (st.wounds === 0 && st.status === 'standing') {
                    st.status = 'out_of_action';
                }
            } else if (action === 'wound-inc') {
                st.wounds = Math.min(st.maxWounds, st.wounds + 1);
                if (st.wounds > 0 && st.status === 'out_of_action') {
                    st.status = 'standing';
                }
            } else if (action === 'group-dec') {
                st.groupAlive = Math.max(0, st.groupAlive - 1);
                if (st.groupAlive === 0) {
                    st.status = 'out_of_action';
                }
            } else if (action === 'group-inc') {
                st.groupAlive = Math.min(st.maxGroup, st.groupAlive + 1);
                if (st.groupAlive > 0 && st.status === 'out_of_action') {
                    st.status = 'standing';
                }
            } else if (action === 'set-status') {
                const newStatus = actionBtn.dataset.statusValue;
                st.status = (st.status === newStatus && newStatus !== 'standing') ? 'standing' : newStatus;
            } else if (action === 'toggle-activated') {
                st.activated = !st.activated;
            }

            saveTabletopState();
            updateSingleSlideStateUI(slideEl, fighter);
            renderThumbStrip();
            return;
        }

        // 2. Check interactive card pills (weapon, skill, rule, injury, spell)
        const equipEl = e.target.closest('[data-card-equip]');
        if (equipEl) {
            e.stopPropagation();
            showEquipmentDetailSheet(equipEl.dataset.cardEquip);
            return;
        }

        const skillEl = e.target.closest('[data-card-skill]');
        if (skillEl) {
            e.stopPropagation();
            const slideEl = skillEl.closest('.card-viewer-slide');
            const idx = slideEl ? parseInt(slideEl.dataset.slideIndex) : activeSlideIndex;
            const fighter = getFilteredMembers()[idx];
            showSkillDetailSheet(skillEl.dataset.cardSkill, fighter);
            return;
        }

        const ruleEl = e.target.closest('[data-card-rule]');
        if (ruleEl) {
            e.stopPropagation();
            showSpecialRuleDetailSheet(ruleEl.dataset.cardRule);
            return;
        }

        const injuryEl = e.target.closest('[data-card-injury]');
        if (injuryEl) {
            e.stopPropagation();
            showInjuryDetailSheet(injuryEl.dataset.cardInjury);
            return;
        }

        const spellEl = e.target.closest('[data-card-spell]');
        if (spellEl) {
            e.stopPropagation();
            showSpellDetailSheet(spellEl.dataset.cardSpell);
            return;
        }
    });

    // Detail sheet close handlers
    const detailOverlay = document.getElementById('card-viewer-detail-overlay');
    document.getElementById('card-viewer-detail-close')?.addEventListener('click', closeDetailSheet);
    detailOverlay?.addEventListener('click', (e) => {
        if (e.target === detailOverlay) closeDetailSheet();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!viewerModalEl || viewerModalEl.classList.contains('hidden')) return;
        if (detailOverlay && !detailOverlay.classList.contains('hidden')) {
            if (e.key === 'Escape') closeDetailSheet();
            return;
        }
        if (e.key === 'Escape') {
            closeCardViewerModal();
        } else if (e.key === 'ArrowLeft') {
            scrollToSlide(activeSlideIndex - 1);
        } else if (e.key === 'ArrowRight') {
            scrollToSlide(activeSlideIndex + 1);
        }
    });

    // ResizeObserver on viewport to keep cards scaled to screen
    const viewport = document.getElementById('card-viewer-viewport');
    if (viewport && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
            recalculateCardScale();
        });
        resizeObserver.observe(viewport);
    } else {
        window.addEventListener('resize', recalculateCardScale);
    }
}

/**
 * Populates the top deck selector with all saved warbands and the custom deck
 */
function populateDeckSelector() {
    const select = document.getElementById('card-viewer-deck-select');
    if (!select) return;
    select.innerHTML = '';

    const warbands = getWarbands() || [];
    const customDeck = getBuilderDeck();

    if (warbands.length > 0) {
        const grp = document.createElement('optgroup');
        grp.label = 'Tus Bandas Guardadas';
        warbands.forEach(wb => {
            const opt = document.createElement('option');
            opt.value = String(wb.id);
            const count = (wb.members || []).length;
            opt.textContent = `${wb.name} (${count} ${count === 1 ? 'guerrero' : 'guerreros'})`;
            grp.appendChild(opt);
        });
        select.appendChild(grp);
    }

    const customCount = (customDeck?.members || []).length;
    if (customCount > 0 || activeViewerWarband?.isCustomDeck) {
        const grpCustom = document.createElement('optgroup');
        grpCustom.label = 'Creador de Cartas';
        const opt = document.createElement('option');
        opt.value = '__custom_deck__';
        opt.textContent = `Mazo Personalizado (${customCount} ${customCount === 1 ? 'carta' : 'cartas'})`;
        grpCustom.appendChild(opt);
        select.appendChild(grpCustom);
    }

    if (activeViewerWarband?.isCustomDeck || activeViewerWarband?.id === 'custom-card-deck') {
        select.value = '__custom_deck__';
    } else if (activeViewerWarband?.id) {
        select.value = String(activeViewerWarband.id);
    }
}

/**
 * Renders the filter pills (Todos, Héroes, Secuaces, etc.)
 */
function renderFilterBar() {
    const bar = document.getElementById('card-viewer-filter-bar');
    if (!bar) return;

    const allMembers = activeViewerWarband?.members || [];
    const counts = { all: allMembers.length };
    allMembers.forEach(m => {
        const t = m.type || 'Hero';
        counts[t] = (counts[t] || 0) + 1;
    });

    const filters = [
        { id: 'all', label: 'Todos', count: counts.all },
        { id: 'Hero', label: 'Héroes', count: counts['Hero'] || 0 },
        { id: 'Henchman', label: 'Secuaces', count: counts['Henchman'] || 0 },
        { id: 'Hired Sword', label: 'Espadas Alq.', count: counts['Hired Sword'] || 0 },
        { id: 'Vehicle', label: 'Vehículos', count: counts['Vehicle'] || 0 },
        { id: 'Dramatis Personae', label: 'P. Ilustres', count: counts['Dramatis Personae'] || 0 }
    ].filter(f => f.id === 'all' || f.count > 0);

    bar.innerHTML = filters.map(f => {
        const isActive = activeFilter === f.id;
        return `
            <button type="button" data-filter-id="${f.id}" class="card-viewer-filter-pill px-2.5 py-1 rounded-full text-xs font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                    ? 'bg-amber-500/20 text-[#dfbc77] border border-amber-500/45 shadow-xs'
                    : 'bg-[#181920] text-slate-400 hover:text-slate-200 border border-white/5'
            }">
                <span>${f.label}</span>
                <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-amber-500/25 text-amber-200' : 'bg-white/5 text-slate-400'}">${f.count}</span>
            </button>
        `;
    }).join('');

    bar.querySelectorAll('[data-filter-id]').forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.dataset.filterId;
            activeSlideIndex = 0;
            renderViewerAll();
        });
    });
}

/**
 * Renders the horizontal carousel slides
 */
function renderCarouselSlides() {
    const carousel = document.getElementById('card-viewer-carousel');
    if (!carousel) return;

    const members = getFilteredMembers();

    if (members.length === 0) {
        carousel.innerHTML = `
            <div class="w-full h-full flex flex-col items-center justify-center text-center p-6">
                <div class="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-[#dfbc77] mb-3">
                    <i class="fas fa-id-card text-2xl"></i>
                </div>
                <h3 class="text-base sm:text-lg font-bold text-white mb-1">No hay cartas para mostrar</h3>
                <p class="text-xs sm:text-sm text-slate-400 max-w-xs mb-4">Añade guerreros a tu banda o crea cartas en el Creador de Cartas para verlas aquí en modo carrusel.</p>
                <button type="button" id="card-viewer-empty-open-studio" class="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2">
                    <i class="fas fa-plus-circle"></i> Abrir Creador de Cartas
                </button>
            </div>
        `;
        document.getElementById('card-viewer-empty-open-studio')?.addEventListener('click', () => {
            document.getElementById('card-viewer-open-studio-btn')?.click();
        });
        updateCounterAndButtons();
        return;
    }

    carousel.innerHTML = members.map((fighter, idx) => {
        const fType = fighter.type || 'Hero';
        const layout = loadFighterLayout(fType, fighter.id);
        const cardHtml = renderFighterCard(fighter, activeViewerWarband, layout, false);

        return `
            <div class="card-viewer-slide" data-slide-index="${idx}" data-fighter-id="${fighter.id || ''}">
                <div class="card-viewer-slide-inner">
                    <!-- Scaled Card Holder -->
                    <div class="card-viewer-card-stage">
                        <div class="card-viewer-scale-box">
                            ${cardHtml}
                            <!-- Visual Status Overlay Stamp -->
                            <div class="card-viewer-status-stamp hidden"></div>
                            <!-- Activated Badge -->
                            <div class="card-viewer-activated-badge hidden">
                                <i class="fas fa-check-circle"></i> Activado
                            </div>
                        </div>
                    </div>

                    <!-- Tabletop Battle Controls Under Card -->
                    <div class="card-viewer-tabletop-bar">
                        <div class="card-viewer-counters-row">
                            <!-- Wounds Counter -->
                            <div class="card-viewer-counter-group">
                                <span class="card-viewer-counter-label">Heridas</span>
                                <div class="card-viewer-stepper">
                                    <button type="button" data-viewer-action="wound-dec" class="card-viewer-step-btn" title="Restar herida">-</button>
                                    <span class="card-viewer-wound-val">1/1</span>
                                    <button type="button" data-viewer-action="wound-inc" class="card-viewer-step-btn" title="Sumar herida">+</button>
                                </div>
                            </div>

                            <!-- Group Members Counter (only for Henchmen with group > 1) -->
                            <div class="card-viewer-counter-group card-viewer-group-counter hidden">
                                <span class="card-viewer-counter-label">Grupo</span>
                                <div class="card-viewer-stepper">
                                    <button type="button" data-viewer-action="group-dec" class="card-viewer-step-btn" title="Baja en el grupo">-</button>
                                    <span class="card-viewer-group-val">1/1</span>
                                    <button type="button" data-viewer-action="group-inc" class="card-viewer-step-btn" title="Recuperar miembro">+</button>
                                </div>
                            </div>

                            <!-- Activated This Turn Toggle -->
                            <button type="button" data-viewer-action="toggle-activated" class="card-viewer-activate-btn">
                                <i class="far fa-circle"></i>
                                <span>Activar</span>
                            </button>
                        </div>

                        <!-- Status Pills Row (En pie | Derribado | Aturdido | F. Combate) -->
                        <div class="card-viewer-status-row">
                            <button type="button" data-viewer-action="set-status" data-status-value="standing" class="card-viewer-status-btn status-standing">
                                En pie
                            </button>
                            <button type="button" data-viewer-action="set-status" data-status-value="knocked_down" class="card-viewer-status-btn status-knocked">
                                Derribado
                            </button>
                            <button type="button" data-viewer-action="set-status" data-status-value="stunned" class="card-viewer-status-btn status-stunned">
                                Aturdido
                            </button>
                            <button type="button" data-viewer-action="set-status" data-status-value="out_of_action" class="card-viewer-status-btn status-ooa">
                                F. Combate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    refreshSlideStatesUI();
    recalculateCardScale();
    updateCounterAndButtons();
}

/**
 * Updates the tabletop UI controls and visual stamps on a single slide
 */
function updateSingleSlideStateUI(slideEl, fighter) {
    if (!slideEl || !fighter) return;
    const st = getFighterState(activeViewerWarband, fighter);

    // Wounds
    const woundVal = slideEl.querySelector('.card-viewer-wound-val');
    if (woundVal) {
        woundVal.textContent = `${st.wounds}/${st.maxWounds}`;
        woundVal.classList.toggle('text-rose-400', st.wounds === 0);
        woundVal.classList.toggle('text-amber-300', st.wounds > 0 && st.wounds < st.maxWounds);
    }

    // Group counter (Henchmen with maxGroup > 1)
    const groupWrap = slideEl.querySelector('.card-viewer-group-counter');
    const groupVal = slideEl.querySelector('.card-viewer-group-val');
    if (groupWrap && groupVal) {
        if (fighter.type === 'Henchman' && st.maxGroup > 1) {
            groupWrap.classList.remove('hidden');
            groupVal.textContent = `${st.groupAlive}/${st.maxGroup}`;
        } else {
            groupWrap.classList.add('hidden');
        }
    }

    // Activated button & badge
    const actBtn = slideEl.querySelector('.card-viewer-activate-btn');
    const actBadge = slideEl.querySelector('.card-viewer-activated-badge');
    if (actBtn) {
        actBtn.classList.toggle('is-activated', !!st.activated);
        actBtn.innerHTML = st.activated
            ? '<i class="fas fa-check-circle"></i><span>Activado</span>'
            : '<i class="far fa-circle"></i><span>Activar</span>';
    }
    if (actBadge) {
        actBadge.classList.toggle('hidden', !st.activated);
    }

    // Status buttons
    slideEl.querySelectorAll('.card-viewer-status-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.statusValue === st.status);
    });

    // Visual stamp on the card
    const stampEl = slideEl.querySelector('.card-viewer-status-stamp');
    const cardEl = slideEl.querySelector('.mordheim-card');
    if (stampEl && cardEl) {
        cardEl.classList.remove('viewer-card-ooa', 'viewer-card-down', 'viewer-card-stunned');
        if (st.status === 'standing') {
            stampEl.classList.add('hidden');
            stampEl.className = 'card-viewer-status-stamp hidden';
        } else if (st.status === 'knocked_down') {
            cardEl.classList.add('viewer-card-down');
            stampEl.className = 'card-viewer-status-stamp stamp-knocked';
            stampEl.innerHTML = '<i class="fas fa-level-down-alt mr-1.5"></i>DERRIBADO';
        } else if (st.status === 'stunned') {
            cardEl.classList.add('viewer-card-stunned');
            stampEl.className = 'card-viewer-status-stamp stamp-stunned';
            stampEl.innerHTML = '<i class="fas fa-dizzy mr-1.5"></i>ATURDIDO';
        } else if (st.status === 'out_of_action') {
            cardEl.classList.add('viewer-card-ooa');
            stampEl.className = 'card-viewer-status-stamp stamp-ooa';
            stampEl.innerHTML = '<i class="fas fa-skull mr-1.5"></i>FUERA DE COMBATE';
        }
    }
}

function refreshSlideStatesUI() {
    const carousel = document.getElementById('card-viewer-carousel');
    if (!carousel) return;
    const members = getFilteredMembers();
    carousel.querySelectorAll('.card-viewer-slide').forEach(slideEl => {
        const idx = parseInt(slideEl.dataset.slideIndex);
        if (members[idx]) {
            updateSingleSlideStateUI(slideEl, members[idx]);
        }
    });
}

/**
 * Renders the bottom quick-jump fighter pills
 */
function renderThumbStrip() {
    const strip = document.getElementById('card-viewer-thumb-strip');
    if (!strip) return;

    const members = getFilteredMembers();
    if (members.length === 0) {
        strip.innerHTML = '';
        return;
    }

    strip.innerHTML = members.map((f, idx) => {
        const st = getFighterState(activeViewerWarband, f);
        const isCurrent = idx === activeSlideIndex;

        let dotClass = 'bg-emerald-400';
        if (st.status === 'knocked_down') dotClass = 'bg-amber-400';
        else if (st.status === 'stunned') dotClass = 'bg-orange-500';
        else if (st.status === 'out_of_action') dotClass = 'bg-rose-500';

        const groupSuffix = (f.type === 'Henchman' && st.maxGroup > 1) ? ` (${st.groupAlive})` : '';
        const name = f.name || translateWarriorRole(f.warrior_choice) || translateFighterType(f.type) || `Guerrero ${idx + 1}`;

        return `
            <button type="button" data-thumb-index="${idx}" class="card-viewer-thumb-pill flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition flex-shrink-0 ${
                isCurrent
                    ? 'bg-[#dfbc77]/20 text-[#dfbc77] border border-[#dfbc77]/50 shadow-sm'
                    : 'bg-[#17181f] text-slate-300 hover:text-white border border-white/10'
            } ${st.status === 'out_of_action' ? 'opacity-55 line-through' : ''}">
                <span class="w-2 h-2 rounded-full ${dotClass} flex-shrink-0"></span>
                <span class="text-[10px] text-slate-400 font-bold">${idx + 1}.</span>
                <span class="max-w-[110px] truncate">${name}${groupSuffix}</span>
                ${st.activated ? '<i class="fas fa-check text-[10px] text-emerald-400 ml-0.5"></i>' : ''}
            </button>
        `;
    }).join('');

    strip.querySelectorAll('[data-thumb-index]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.thumbIndex);
            scrollToSlide(idx);
        });
    });

    // Ensure active thumb pill is visible in strip
    const activeThumb = strip.querySelector(`[data-thumb-index="${activeSlideIndex}"]`);
    if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

/**
 * Dynamically calculates the optimal scale factor for the 63mm x 88mm (238.1px x 332.6px) card
 * so it fills the mobile/desktop viewport comfortably without overflowing.
 */
function recalculateCardScale() {
    const viewport = document.getElementById('card-viewer-viewport');
    if (!viewport || !viewerModalEl || viewerModalEl.classList.contains('hidden')) return;

    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    if (!vw || !vh) return;

    // 63mm x 88mm in CSS pixels (96 DPI: 1mm = 3.7795275591px)
    const baseCardW = 238.11;
    const baseCardH = 332.60;

    // Reserve space for the tabletop bar below the card (~86px) and padding (~20px)
    const reservedVertical = window.innerWidth < 640 ? 92 : 104;
    const reservedHorizontal = window.innerWidth < 640 ? 28 : 96;

    const availW = Math.max(180, vw - reservedHorizontal);
    const availH = Math.max(200, vh - reservedVertical);

    const scaleX = availW / baseCardW;
    const scaleY = availH / baseCardH;
    const scale = Math.max(0.75, Math.min(2.1, Math.min(scaleX, scaleY)));

    const scaledW = Math.round(baseCardW * scale);
    const scaledH = Math.round(baseCardH * scale);

    viewerModalEl.style.setProperty('--viewer-card-scale', scale.toFixed(3));
    viewerModalEl.style.setProperty('--viewer-scaled-w', `${scaledW}px`);
    viewerModalEl.style.setProperty('--viewer-scaled-h', `${scaledH}px`);
}

function scrollToSlide(index, smooth = true) {
    const carousel = document.getElementById('card-viewer-carousel');
    const members = getFilteredMembers();
    if (!carousel || members.length === 0) return;

    const clamped = Math.max(0, Math.min(members.length - 1, index));
    activeSlideIndex = clamped;

    const slideEl = carousel.querySelector(`[data-slide-index="${clamped}"]`);
    if (slideEl) {
        slideEl.scrollIntoView({
            behavior: smooth ? 'smooth' : 'auto',
            block: 'nearest',
            inline: 'center'
        });
    }
    updateCounterAndButtons();
    renderThumbStrip();
}

function updateActiveSlideFromScroll() {
    const carousel = document.getElementById('card-viewer-carousel');
    if (!carousel) return;
    const slides = carousel.querySelectorAll('.card-viewer-slide');
    if (slides.length === 0) return;

    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    slides.forEach((slide, idx) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const diff = Math.abs(slideCenter - center);
        if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
        }
    });

    if (closestIdx !== activeSlideIndex) {
        activeSlideIndex = closestIdx;
        updateCounterAndButtons();
        renderThumbStrip();
    }
}

function updateCounterAndButtons() {
    const members = getFilteredMembers();
    const total = members.length;
    const current = total > 0 ? activeSlideIndex + 1 : 0;

    const badge = document.getElementById('card-viewer-counter-badge');
    if (badge) {
        badge.textContent = `${current} / ${total}`;
    }

    const prevBtn = document.getElementById('card-viewer-prev-btn');
    const nextBtn = document.getElementById('card-viewer-next-btn');
    if (prevBtn) prevBtn.disabled = total <= 1 || activeSlideIndex <= 0;
    if (nextBtn) nextBtn.disabled = total <= 1 || activeSlideIndex >= total - 1;
}

/**
 * Detail Popover Helpers (Weapons, Skills, Special Rules, Injuries, Spells)
 */
function openDetailSheet(badgeText, titleText, bodyHtml) {
    const overlay = document.getElementById('card-viewer-detail-overlay');
    const badge = document.getElementById('card-viewer-detail-badge');
    const title = document.getElementById('card-viewer-detail-title');
    const body = document.getElementById('card-viewer-detail-body');
    if (!overlay || !badge || !title || !body) return;

    badge.textContent = badgeText;
    title.textContent = titleText;
    body.innerHTML = bodyHtml;
    overlay.classList.remove('hidden');
}

function closeDetailSheet() {
    const overlay = document.getElementById('card-viewer-detail-overlay');
    if (overlay) overlay.classList.add('hidden');
}

export function showEquipmentDetailSheet(rawName) {
    if (!rawName) return;
    ensureViewerModal();
    const trName = translateEquipment(rawName);
    const master = MASTER_EQUIPMENT_LIST.find(i => i.name.toLowerCase() === rawName.toLowerCase());
    const weaponRule = getWeaponRuleSummary(rawName);
    const rulesHtml = translateEquipmentRules(rawName, master?.rules);

    let metaHtml = '';
    if (master) {
        const parts = [];
        if (master.range) parts.push(`<span><strong>Alcance:</strong> ${formatDistanceText(String(master.range))}</span>`);
        if (master.strength) parts.push(`<span><strong>Fuerza:</strong> ${master.strength}</span>`);
        if (parts.length > 0) {
            metaHtml = `<div class="flex flex-wrap gap-3 p-2.5 rounded-lg bg-[#101114] border border-white/10 text-xs text-amber-200 mb-2">${parts.join('')}</div>`;
        }
    }

    const body = `
        ${metaHtml}
        ${weaponRule?.short ? `<div class="text-xs font-semibold text-[#dfbc77] mb-1">Resumen: ${weaponRule.short}</div>` : ''}
        <div class="text-slate-200 leading-relaxed">${rulesHtml || weaponRule?.full || 'Sin reglas especiales adicionales.'}</div>
    `;
    openDetailSheet('Equipo / Arma', trName, body);
}

export function showSkillDetailSheet(rawSkill, fighter = null) {
    if (!rawSkill) return;
    ensureViewerModal();
    const trName = translateSkill(rawSkill);
    const skillObj = findSkillForWarband(rawSkill, activeViewerWarband?.type || null, fighter);
    const desc = skillObj?.rule || skillObj?.description || 'Sin descripción disponible.';
    openDetailSheet('Habilidad', trName, `<div class="text-slate-200 leading-relaxed">${formatDistanceText(desc)}</div>`);
}

export function showSpecialRuleDetailSheet(rawRule) {
    if (!rawRule) return;
    ensureViewerModal();
    const trName = translateSpecialRule(rawRule);
    const summary = getSpecialRuleSummary(rawRule);
    let desc = summary?.full || '';
    if (!desc && SPECIAL_RULES_DETAILS) {
        const key = Object.keys(SPECIAL_RULES_DETAILS).find(k => k.toLowerCase() === rawRule.toLowerCase());
        if (key) {
            desc = SPECIAL_RULES_DETAILS[key]?.rule || SPECIAL_RULES_DETAILS[key]?.description || '';
        }
    }
    openDetailSheet('Regla Especial', trName, `<div class="text-slate-200 leading-relaxed">${desc || summary?.short || 'Regla especial del guerrero.'}</div>`);
}

export function showInjuryDetailSheet(rawInjury) {
    if (!rawInjury) return;
    ensureViewerModal();
    const trName = translateInjury(rawInjury);
    const master = MASTER_INJURY_LIST?.find(i => i.name.toLowerCase() === rawInjury.toLowerCase());
    const desc = translateInjuryDescription(rawInjury, master?.description || master?.rule || '');
    openDetailSheet('Herida Grave', trName, `<div class="text-slate-200 leading-relaxed">${desc || 'Herida permanente.'}</div>`);
}

export function showSpellDetailSheet(rawSpell) {
    if (!rawSpell) return;
    ensureViewerModal();
    let foundSpell = null;
    let loreName = '';
    if (MAGIC && typeof MAGIC === 'object') {
        for (const [lore, spellsArr] of Object.entries(MAGIC)) {
            if (Array.isArray(spellsArr)) {
                const match = spellsArr.find(s => s.name && s.name.toLowerCase() === rawSpell.toLowerCase());
                if (match) {
                    foundSpell = match;
                    loreName = lore;
                    break;
                }
            }
        }
    }
    const diffHtml = foundSpell?.difficulty
        ? `<div class="p-2 rounded-lg bg-[#101114] border border-white/10 text-xs text-amber-200 mb-2"><strong>Dificultad:</strong> ${foundSpell.difficulty}+ ${loreName ? `&bull; <span class="text-slate-400">${loreName}</span>` : ''}</div>`
        : '';
    const desc = foundSpell?.rule || foundSpell?.description || 'Hechizo o plegaria conocida por el guerrero.';
    openDetailSheet('Magia / Plegaria', foundSpell?.name || rawSpell, `${diffHtml}<div class="text-slate-200 leading-relaxed">${formatDistanceText(desc)}</div>`);
}

function renderViewerAll() {
    populateDeckSelector();
    renderFilterBar();
    renderCarouselSlides();
    renderThumbStrip();
}

/**
 * Opens the Card Viewer Modal (Horizontal Swipe Carousel)
 * @param {object} [warbandOrDeck] - Warband or custom deck object to display
 * @param {string|null} [initialFighterId] - Optional fighter ID to focus initially
 */
export function openCardViewerModal(warbandOrDeck = null, initialFighterId = null) {
    loadTabletopState();
    ensureViewerModal();

    if (warbandOrDeck && Array.isArray(warbandOrDeck.members) && warbandOrDeck.members.length > 0) {
        activeViewerWarband = warbandOrDeck;
    } else if (currentWarband && Array.isArray(currentWarband.members) && currentWarband.members.length > 0) {
        activeViewerWarband = currentWarband;
    } else {
        const saved = getWarbands() || [];
        const customDeck = getBuilderDeck();
        if (customDeck?.members?.length > 0) {
            activeViewerWarband = customDeck;
        } else if (saved.length > 0) {
            activeViewerWarband = saved[0];
        } else {
            activeViewerWarband = warbandOrDeck || currentWarband || customDeck;
        }
    }

    activeFilter = 'all';
    activeSlideIndex = 0;

    if (initialFighterId && activeViewerWarband?.members) {
        const idx = activeViewerWarband.members.findIndex(f => String(f.id) === String(initialFighterId));
        if (idx !== -1) activeSlideIndex = idx;
    }

    viewerModalEl.classList.remove('hidden');
    document.body.classList.add('modal-open');

    renderViewerAll();

    requestAnimationFrame(() => {
        recalculateCardScale();
        if (activeSlideIndex > 0) {
            scrollToSlide(activeSlideIndex, false);
        }
    });
}

export function closeCardViewerModal() {
    if (!viewerModalEl) return;
    closeDetailSheet();
    viewerModalEl.classList.add('hidden');
    document.body.classList.remove('modal-open');
}
