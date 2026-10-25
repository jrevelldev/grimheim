/**
 * Card Builder Studio Modal
 * Manages the interactive visual studio, type tabs, live 63mm x 88mm card preview, and block controls.
 */

import { currentWarband } from '../state.js';
import { showMessage } from '../utility.js';
import { FIGHTER_TYPES, AVAILABLE_BLOCKS, getSampleFighter, getBlankFighter } from './card-config.js';
import { loadLayout, saveLayout, resetLayout, isFighterLayoutLocked, saveFighterLayout, unlockFighterLayout, loadFighterLayout } from './card-storage.js';
import { renderFighterCard } from './card-renderer.js';
import { setupCardPreviewDragDrop, setupSidebarListDragDrop } from './card-drag-drop.js';
import { openPrintModal } from './card-print.js';
import {
    getBuilderDeck,
    addCardToDeck,
    removeCardFromDeck,
    getWarbandCatalog,
    getFightersForWarbandKey,
    createFighterCardFromSelection
} from './card-deck.js';

let modalElement = null;
let activeFighterType = 'Hero';
let selectedFighterId = null;
let currentLayout = null;
let currentZoom = 1.35; // Default comfortable viewing scale
let activeMobileView = 'preview'; // 'preview' | 'components'
let activeDeckWarband = null;
let studioMode = 'menu'; // 'warband' | 'menu'
let sessionDefaultWarbandKey = null; // Remembers selected warband while in studio

/**
 * Resolves the currently active warband or custom card deck
 */
export function getActiveDeck() {
    if (studioMode === 'warband' && currentWarband && Array.isArray(currentWarband.members)) {
        return currentWarband;
    }
    if (activeDeckWarband && Array.isArray(activeDeckWarband.members)) {
        return activeDeckWarband;
    }
    if (currentWarband && Array.isArray(currentWarband.members) && studioMode !== 'menu') {
        return currentWarband;
    }
    return getBuilderDeck();
}

/**
 * Ensures the studio modal DOM exists in the document
 */
function ensureStudioModal() {
    if (modalElement && document.getElementById('card-builder-studio-modal')) {
        return;
    }
    const existing = document.getElementById('card-builder-studio-modal');
    if (existing) {
        existing.remove();
    }

    const modalHtml = `
        <div id="card-builder-studio-modal" class="hidden fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-0 sm:p-4 z-[10000]">
            <div class="studio-dialog">
                <!-- Top Header -->
                <div class="studio-header">
                    <div class="studio-title-group">
                        <h2><span id="studio-header-title">Crear Cartas de Guerreros</span> <span class="text-xs text-slate-400 font-normal hidden sm:inline">(63mm &times; 88mm Cartulina Estándar)</span></h2>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button id="studio-open-print-btn" class="px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold rounded-lg shadow transition flex items-center">
                            <i class="fas fa-print mr-1.5"></i> Imprimir Cartas
                        </button>
                        <button id="studio-close-btn" class="text-slate-400 hover:text-white p-1 transition" title="Cerrar Creador de Cartas">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Fighter Type Tabs -->
                <div class="studio-type-tabs" id="studio-type-tabs">
                    ${FIGHTER_TYPES.map(t => `
                        <button class="studio-tab-btn ${t.id === activeFighterType ? 'active' : ''}" data-type="${t.id}">
                            ${t.label}
                        </button>
                    `).join('')}
                </div>

                <!-- Mobile View Switcher (Visible only on mobile/tablet <= 1023px) -->
                <div class="studio-mobile-nav" id="studio-mobile-nav">
                    <button type="button" class="studio-mobile-nav-btn active" data-view="preview">
                        <i class="fas fa-eye"></i> Vista Previa
                    </button>
                    <button type="button" class="studio-mobile-nav-btn" data-view="components">
                        <i class="fas fa-sliders-h"></i> Componentes y Ajustes
                    </button>
                </div>

                <!-- Main Body (Sidebar + Preview) -->
                <div class="studio-body mobile-view-preview">
                    <!-- Left Sidebar (Layout & Block Controls) -->
                    <div class="studio-sidebar">
                        <div class="sidebar-scroll custom-scroll">
                            <!-- Global Card Options -->
                            <div class="mb-4 bg-slate-900 p-3 rounded-lg border border-slate-700">
                                <div class="sidebar-section-title">
                                    <span>Ajustes de la Carta</span>
                                    <button id="studio-reset-layout-btn" class="text-xs text-amber-400 hover:underline cursor-pointer">
                                        Restablecer
                                    </button>
                                </div>
                                <div class="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <label class="block text-slate-400 mb-1">Densidad</label>
                                        <select id="studio-card-density-select" class="w-full bg-slate-800 border border-slate-600 rounded p-1 text-white">
                                            <option value="normal">Normal</option>
                                            <option value="compact">Compacta</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-slate-400 mb-1">Tema Visual</label>
                                        <select id="studio-card-theme-select" class="w-full bg-slate-800 border border-slate-600 rounded p-1 text-white">
                                            <option value="parchment">Pergamino Grimdark</option>
                                            <option value="clean">Minimalista Limpio</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Blocks Reordering & Visibility -->
                            <div class="sidebar-section-title">
                                <span>Componentes de la Carta</span>
                                <span class="text-xs font-normal text-slate-400 lowercase">arrastrar o activar</span>
                            </div>
                            <div class="card-config-list" id="studio-blocks-list">
                                <!-- Populated dynamically -->
                            </div>

                            <!-- Mobile Quick Switch to Preview Banner -->
                            <div class="studio-mobile-switch-banner">
                                <button type="button" id="studio-mobile-view-card-btn" class="studio-mobile-card-preview-btn">
                                    <i class="fas fa-eye"></i> Ver Vista Previa
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Right Workspace (Toolbar + Live Card Preview) -->
                    <div class="studio-workspace">
                        <div class="workspace-toolbar">
                            <div class="flex items-center space-x-2">
                                <label class="text-slate-300 text-xs font-semibold">Guerrero:</label>
                                <select id="studio-fighter-select" class="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white text-xs max-w-xs truncate">
                                    <!-- Populated dynamically -->
                                </select>
                                <button id="studio-add-card-btn" type="button" class="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-slate-900 rounded text-xs font-bold transition ${studioMode === 'menu' ? 'inline-flex' : 'hidden'} items-center gap-1 shadow" title="Añadir otra carta de guerrero a este mazo">
                                    <i class="fas fa-plus text-[10px]"></i>
                                    <span>Añadir</span>
                                </button>
                                <button id="studio-delete-card-btn" type="button" class="px-2 py-1 bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700/60 rounded text-xs transition hidden items-center gap-1" title="Eliminar esta carta">
                                    <i class="fas fa-trash-alt text-[10px]"></i>
                                </button>
                                <button id="studio-lock-layout-btn" type="button" class="studio-lock-btn" title="Bloquear diseño para este guerrero">
                                    <i class="fas fa-lock-open text-xs"></i>
                                    <span>Bloquear</span>
                                </button>
                                <button id="studio-mobile-edit-components-btn" type="button" class="studio-mobile-edit-btn" title="Personalizar Componentes">
                                    <i class="fas fa-sliders-h text-xs"></i>
                                    <span>Editar</span>
                                </button>
                            </div>
                            <div class="flex items-center space-x-2 text-xs text-slate-400 studio-zoom-controls">
                                <span>Zoom:</span>
                                <button class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-white zoom-btn" data-zoom="1.0">100%</button>
                                <button class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-white zoom-btn" data-zoom="1.35">135%</button>
                                <button class="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-white zoom-btn" data-zoom="1.6">160%</button>
                            </div>
                        </div>


                        <div class="workspace-preview-area" id="studio-preview-area">
                            <div class="card-scale-wrapper" id="studio-card-scale-wrapper">
                                <div id="studio-card-container">
                                    <!-- Rendered 63mm x 88mm card -->
                                </div>
                            </div>
                            <div id="studio-overflow-indicator"></div>
                        </div>
                    </div>
                </div>

                <!-- Inline Add Card Modal for Studio -->
                <div id="studio-add-card-modal" class="hidden fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div class="bg-slate-800 border border-slate-600 rounded-xl p-4 w-full max-w-sm shadow-2xl text-slate-200 space-y-3">
                        <div class="flex items-center justify-between border-b border-slate-700 pb-2">
                            <h3 id="studio-add-modal-title" class="font-bold text-white text-sm flex items-center gap-1.5">
                                Add Fighter Card to Deck
                            </h3>
                            <button type="button" id="studio-close-add-modal-btn" class="text-slate-400 hover:text-white transition">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div>
                            <label id="studio-modal-warband-label" class="block text-xs text-slate-300 font-medium mb-1">1. Select Warband</label>
                            <select id="studio-modal-warband-select" class="w-full bg-slate-900 border border-slate-600 rounded px-2.5 py-1.5 text-xs text-white">
                                <option value="">-- Choose Warband --</option>
                            </select>
                        </div>
                        <div>
                            <label id="studio-modal-fighter-label" class="block text-xs text-slate-300 font-medium mb-1">2. Select Fighter Type / Warrior</label>
                            <select id="studio-modal-fighter-select" class="w-full bg-slate-900 border border-slate-600 rounded px-2.5 py-1.5 text-xs text-white" disabled>
                                <option value="">-- Choose Warband First --</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs text-slate-300 font-medium mb-1">Custom Name <span class="text-slate-500 font-normal">(optional)</span></label>
                            <input type="text" id="studio-modal-custom-name" placeholder="Leave blank to use default name" class="w-full bg-slate-900 border border-slate-600 rounded px-2.5 py-1.5 text-xs text-white">
                        </div>
                        <div class="flex items-center space-x-2 pt-2 border-t border-slate-700">
                            <button type="button" id="studio-cancel-add-btn" class="flex-1 py-1.5 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition">
                                Cancel
                            </button>
                            <button type="button" id="studio-confirm-add-btn" class="flex-1 py-1.5 px-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-bold rounded text-xs transition flex items-center justify-center gap-1 shadow" disabled>
                                <i class="fas fa-plus"></i> Add Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalElement = document.getElementById('card-builder-studio-modal');

    // Attach base events
    document.getElementById('studio-close-btn').addEventListener('click', closeCardBuilderModal);
    document.getElementById('studio-open-print-btn').addEventListener('click', () => {
        openPrintModal(getActiveDeck());
    });

    // In-studio Add Card controls
    const studioAddCardBtn = document.getElementById('studio-add-card-btn');
    const studioAddModal = document.getElementById('studio-add-card-modal');
    const studioCloseAddModal = document.getElementById('studio-close-add-modal-btn');
    const studioCancelAddBtn = document.getElementById('studio-cancel-add-btn');
    const studioWbSelect = document.getElementById('studio-modal-warband-select');
    const studioFighterSelect = document.getElementById('studio-modal-fighter-select');
    const studioNameInput = document.getElementById('studio-modal-custom-name');
    const studioConfirmAddBtn = document.getElementById('studio-confirm-add-btn');
    const studioDeleteCardBtn = document.getElementById('studio-delete-card-btn');

    const populateFightersForWb = (wbKey) => {
        if (!wbKey) {
            studioFighterSelect.innerHTML = '<option value="">-- Choose Warband First --</option>';
            studioFighterSelect.disabled = true;
            studioConfirmAddBtn.disabled = true;
            return;
        }

        const typeLabel = activeFighterType || 'Fighter';
        const fighters = getFightersForWarbandKey(wbKey, activeFighterType);
        if (fighters.length === 0) {
            studioFighterSelect.innerHTML = `<option value="">-- No ${typeLabel}s Available for this Warband --</option>`;
            studioFighterSelect.disabled = true;
            studioConfirmAddBtn.disabled = true;
            return;
        }

        studioFighterSelect.innerHTML = `<option value="">-- Select ${typeLabel} (${fighters.length} available) --</option>`;
        fighters.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f.id;
            const hasGroupInName = f.groupSize > 1 && new RegExp(`x\\s*${f.groupSize}`, 'i').test(f.name);
            const groupText = (f.groupSize && f.groupSize > 1 && !hasGroupInName) ? ` x${f.groupSize}` : '';
            opt.textContent = `${f.name} [${f.type}${groupText}]${(f.cost !== undefined && f.cost !== null) ? ` (${f.cost}gc)` : ''}`;
            studioFighterSelect.appendChild(opt);
        });
        studioFighterSelect.disabled = false;
        studioConfirmAddBtn.disabled = !studioFighterSelect.value;
    };

    const openAddCardModal = () => {
        if (!studioWbSelect) return;

        const modalTitle = document.getElementById('studio-add-modal-title');
        const wbLabel = document.getElementById('studio-modal-warband-label');
        const fighterLabel = document.getElementById('studio-modal-fighter-label');
        const typeLabel = activeFighterType || 'Fighter';

        if (modalTitle) {
            modalTitle.textContent = `Add ${typeLabel} Card to Deck`;
        }
        if (wbLabel) {
            if (activeFighterType === 'Hired Sword' || activeFighterType === 'Dramatis Personae' || activeFighterType === 'Vehicle') {
                wbLabel.textContent = '1. Select Hiring Warband';
            } else {
                wbLabel.textContent = '1. Select Warband';
            }
        }
        if (fighterLabel) {
            if (activeFighterType === 'Hired Sword') {
                fighterLabel.textContent = '2. Select Hired Sword (Available for Warband)';
            } else if (activeFighterType === 'Dramatis Personae') {
                fighterLabel.textContent = '2. Select Dramatis Personae (Available for Warband)';
            } else if (activeFighterType === 'Vehicle') {
                fighterLabel.textContent = '2. Select Vehicle (Available for Warband)';
            } else {
                fighterLabel.textContent = `2. Select ${typeLabel}`;
            }
        }

        studioWbSelect.innerHTML = '<option value="">-- Choose Warband --</option>';
        const catalog = getWarbandCatalog(activeFighterType);
        const activeF = getActiveFighter();
        const defaultWbKey = sessionDefaultWarbandKey || (activeF?.warband_key && !activeF.warband_key.startsWith('sample') ? activeF.warband_key : null);

        catalog.forEach(group => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = group.group;
            group.items.forEach(item => {
                const opt = document.createElement('option');
                opt.value = item.key;
                opt.textContent = item.name;
                optgroup.appendChild(opt);
            });
            studioWbSelect.appendChild(optgroup);
        });

        studioNameInput.value = '';

        const isValidDefault = defaultWbKey && Array.from(studioWbSelect.options).some(o => o.value === defaultWbKey);
        const selectedKey = isValidDefault ? defaultWbKey : '';
        studioWbSelect.value = selectedKey;
        populateFightersForWb(selectedKey);

        studioAddModal.classList.remove('hidden');
    };

    const closeAddCardModal = () => {
        studioAddModal.classList.add('hidden');
    };

    studioAddCardBtn?.addEventListener('click', openAddCardModal);
    studioCloseAddModal?.addEventListener('click', closeAddCardModal);
    studioCancelAddBtn?.addEventListener('click', closeAddCardModal);

    const handleWbSelectChange = () => {
        const wbKey = studioWbSelect.value;
        sessionDefaultWarbandKey = wbKey || null;
        populateFightersForWb(wbKey);
    };
    studioWbSelect?.addEventListener('change', handleWbSelectChange);
    studioWbSelect?.addEventListener('input', handleWbSelectChange);

    studioFighterSelect?.addEventListener('change', () => {
        studioConfirmAddBtn.disabled = !studioFighterSelect.value;
    });

    studioConfirmAddBtn?.addEventListener('click', () => {
        const wbKey = studioWbSelect.value;
        const fighterId = studioFighterSelect.value;
        const customName = studioNameInput.value;

        if (!wbKey || !fighterId) return;

        sessionDefaultWarbandKey = wbKey;

        const newCard = createFighterCardFromSelection(wbKey, fighterId, customName, activeFighterType);
        if (newCard) {
            addCardToDeck(newCard);
            const deck = getActiveDeck();
            if (deck !== currentWarband && !deck.members.some(m => m.id === newCard.id)) {
                deck.members.push(newCard);
            }
            activeFighterType = newCard.type;
            selectedFighterId = newCard.id;
            closeAddCardModal();
            switchFighterType(activeFighterType);
            showMessage(`Added ${newCard.name} to Card Builder deck!`, 'success');
        }
    });

    studioDeleteCardBtn?.addEventListener('click', () => {
        if (!selectedFighterId || selectedFighterId === 'sample' || selectedFighterId === 'blank') return;
        const fighter = getActiveFighter();
        const fName = fighter?.name || 'this card';
        if (confirm(`Remove ${fName} from this deck?`)) {
            removeCardFromDeck(selectedFighterId);
            const deck = getActiveDeck();
            deck.members = deck.members.filter(m => String(m.id) !== String(selectedFighterId));
            selectedFighterId = null;
            populateFighterDropdown();
            updatePreview();
            showMessage(`Removed ${fName} from deck.`, 'info');
        }
    });

    // Listen for real-time warband updates (e.g. when Firestore loads warbands)
    window.addEventListener('rosterheim:warbands-updated', () => {
        if (studioAddModal && !studioAddModal.classList.contains('hidden')) {
            const prevWbKey = studioWbSelect.value;
            studioWbSelect.innerHTML = '<option value="">-- Choose Warband --</option>';
            const catalog = getWarbandCatalog(activeFighterType);
            catalog.forEach(group => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = group.group;
                group.items.forEach(item => {
                    const opt = document.createElement('option');
                    opt.value = item.key;
                    opt.textContent = item.name;
                    optgroup.appendChild(opt);
                });
                studioWbSelect.appendChild(optgroup);
            });
            const isValid = prevWbKey && Array.from(studioWbSelect.options).some(o => o.value === prevWbKey);
            studioWbSelect.value = isValid ? prevWbKey : '';
            populateFightersForWb(studioWbSelect.value);
        }
    });

    // Mobile navigation tabs
    const mobileNav = document.getElementById('studio-mobile-nav');
    if (mobileNav) {
        mobileNav.addEventListener('click', (e) => {
            const btn = e.target.closest('.studio-mobile-nav-btn');
            if (!btn) return;
            setMobileView(btn.dataset.view);
        });
    }

    // Mobile shortcut buttons
    const mobileViewCardBtn = document.getElementById('studio-mobile-view-card-btn');
    if (mobileViewCardBtn) {
        mobileViewCardBtn.addEventListener('click', () => {
            setMobileView('preview');
        });
    }

    const mobileEditBtn = document.getElementById('studio-mobile-edit-components-btn');
    if (mobileEditBtn) {
        mobileEditBtn.addEventListener('click', () => {
            setMobileView('components');
        });
    }

    // Tab switcher
    document.getElementById('studio-type-tabs').addEventListener('click', (e) => {
        const btn = e.target.closest('.studio-tab-btn');
        if (!btn) return;
        switchFighterType(btn.dataset.type);
    });

    // Fighter selector change
    document.getElementById('studio-fighter-select').addEventListener('change', (e) => {
        selectedFighterId = e.target.value;
        const currentF = getActiveFighter();
        if (currentF?.warband_key) {
            sessionDefaultWarbandKey = currentF.warband_key;
        }
        currentLayout = loadFighterLayout(activeFighterType, selectedFighterId);

        const densitySelect = document.getElementById('studio-card-density-select');
        const themeSelect = document.getElementById('studio-card-theme-select');
        if (densitySelect) densitySelect.value = currentLayout.cardDensity || 'normal';
        if (themeSelect) themeSelect.value = currentLayout.cardTheme || 'parchment';

        updateLockButton();
        renderConfigSidebar();
        updatePreview();
        updateDeleteButton();
    });

    // Lock button click
    document.getElementById('studio-lock-layout-btn').addEventListener('click', () => {
        if (!selectedFighterId || selectedFighterId === 'sample' || selectedFighterId === 'blank') return;

        const fighter = getActiveFighter();
        const fighterName = fighter?.name || 'Fighter';
        const isLocked = isFighterLayoutLocked(selectedFighterId);

        if (isLocked) {
            // Unlock
            unlockFighterLayout(selectedFighterId);
            currentLayout = loadLayout(activeFighterType);

            const densitySelect = document.getElementById('studio-card-density-select');
            const themeSelect = document.getElementById('studio-card-theme-select');
            if (densitySelect) densitySelect.value = currentLayout.cardDensity || 'normal';
            if (themeSelect) themeSelect.value = currentLayout.cardTheme || 'parchment';

            populateFighterDropdown();
            updateLockButton();
            renderConfigSidebar();
            updatePreview();
            showMessage(`Unlocked card layout for ${fighterName}. Reverted to ${activeFighterType} group layout.`, 'info');
        } else {
            // Lock
            saveFighterLayout(selectedFighterId, JSON.parse(JSON.stringify(currentLayout)));
            populateFighterDropdown();
            updateLockButton();
            showMessage(`Locked card layout for ${fighterName}. Modifications will now only apply to this fighter.`, 'success');
        }
    });

    // Card density & theme change
    document.getElementById('studio-card-density-select').addEventListener('change', (e) => {
        currentLayout.cardDensity = e.target.value;
        persistCurrentLayout();
        updatePreview();
    });

    document.getElementById('studio-card-theme-select').addEventListener('change', (e) => {
        currentLayout.cardTheme = e.target.value;
        persistCurrentLayout();
        updatePreview();
    });

    // Reset button
    document.getElementById('studio-reset-layout-btn').addEventListener('click', () => {
        const isLocked = selectedFighterId && selectedFighterId !== 'sample' && selectedFighterId !== 'blank' && isFighterLayoutLocked(selectedFighterId);
        const targetDesc = isLocked ? `the locked card layout for ${getActiveFighter()?.name || 'this fighter'}` : `the card layout for ${activeFighterType}`;
        if (confirm(`Reset ${targetDesc} to defaults?`)) {
            if (isLocked) {
                unlockFighterLayout(selectedFighterId);
                populateFighterDropdown();
                updateLockButton();
            }
            currentLayout = resetLayout(activeFighterType);
            document.getElementById('studio-card-density-select').value = currentLayout.cardDensity;
            document.getElementById('studio-card-theme-select').value = currentLayout.cardTheme;
            renderConfigSidebar();
            updatePreview();
        }
    });

    // Zoom buttons
    document.querySelectorAll('.zoom-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentZoom = parseFloat(btn.dataset.zoom) || 1.0;
            applyZoom();
        });
    });

    // Initialize drag-drop on preview container
    const previewContainer = document.getElementById('studio-card-container');
    setupCardPreviewDragDrop(previewContainer, handleReorder);

    // Initialize drag-drop on sidebar list
    const sidebarList = document.getElementById('studio-blocks-list');
    setupSidebarListDragDrop(sidebarList, handleReorder);
}

/**
 * Applies the scale transform to the card preview wrapper
 */
function applyZoom() {
    const wrapper = document.getElementById('studio-card-scale-wrapper');
    if (wrapper) {
        wrapper.style.transform = `scale(${currentZoom})`;
    }
}

/**
 * Persists the current layout configuration.
 * If the current fighter has a locked layout, saves it under their fighter override.
 * Otherwise, saves it under the fighter type group layout.
 */
function persistCurrentLayout() {
    if (!currentLayout) return;
    if (selectedFighterId && selectedFighterId !== 'sample' && selectedFighterId !== 'blank' && isFighterLayoutLocked(selectedFighterId)) {
        saveFighterLayout(selectedFighterId, currentLayout);
    } else {
        saveLayout(activeFighterType, currentLayout);
    }
}

/**
 * Updates the state, icon, text, and styling of the Lock/Unlock button
 */
function updateLockButton() {
    const lockBtn = document.getElementById('studio-lock-layout-btn');
    if (!lockBtn) return;

    if (!selectedFighterId || selectedFighterId === 'sample' || selectedFighterId === 'blank') {
        lockBtn.disabled = true;
        lockBtn.classList.add('opacity-50', 'cursor-not-allowed');
        lockBtn.classList.remove('is-locked');
        lockBtn.innerHTML = '<i class="fas fa-lock-open text-xs"></i><span>Lock</span>';
        lockBtn.title = selectedFighterId === 'blank'
            ? 'Blank template cards share the group layout'
            : 'Cannot lock layout for sample fighter';
        return;
    }

    lockBtn.disabled = false;
    lockBtn.classList.remove('opacity-50', 'cursor-not-allowed');

    const locked = isFighterLayoutLocked(selectedFighterId);
    if (locked) {
        lockBtn.classList.add('is-locked');
        lockBtn.innerHTML = '<i class="fas fa-lock text-xs"></i><span>Locked</span>';
        lockBtn.title = 'Card layout is locked specifically for this fighter. Click to unlock and revert to group layout.';
    } else {
        lockBtn.classList.remove('is-locked');
        lockBtn.innerHTML = '<i class="fas fa-lock-open text-xs"></i><span>Lock</span>';
        lockBtn.title = 'Lock layout for this fighter to customize independently from the group';
    }
}

/**
 * Handles block reordering (from either card preview or sidebar)
 */
function handleReorder(fromId, toId, dropBefore, targetPlacement) {
    if (!currentLayout || !currentLayout.blocks) return;

    const blocks = [...currentLayout.blocks];
    const fromIdx = blocks.findIndex(b => b.id === fromId);
    if (fromIdx === -1) return;

    const [movedBlock] = blocks.splice(fromIdx, 1);
    if (targetPlacement) {
        movedBlock.placement = targetPlacement;
    }

    if (toId) {
        let toIdx = blocks.findIndex(b => b.id === toId);
        if (toIdx !== -1) {
            if (!dropBefore) toIdx++;
            blocks.splice(toIdx, 0, movedBlock);
        } else {
            blocks.push(movedBlock);
        }
    } else {
        if (targetPlacement === 'bottom') {
            blocks.push(movedBlock);
        } else {
            // Place at the end of top blocks (before any bottom-placed blocks)
            const firstBottomIdx = blocks.findIndex(b => b.placement === 'bottom');
            if (firstBottomIdx !== -1) {
                blocks.splice(firstBottomIdx, 0, movedBlock);
            } else {
                blocks.push(movedBlock);
            }
        }
    }

    currentLayout.blocks = blocks;
    persistCurrentLayout();

    renderConfigSidebar();
    updatePreview();
}

/**
 * Switches the active fighter type tab
 */
function switchFighterType(newType) {
    activeFighterType = newType;

    // Update active tab style
    document.querySelectorAll('.studio-tab-btn').forEach(btn => {
        if (btn.dataset.type === newType) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    selectedFighterId = null;
    populateFighterDropdown();

    // Load layout for selected fighter (or group layout)
    currentLayout = loadFighterLayout(newType, selectedFighterId);

    // Update density & theme selects
    const densitySelect = document.getElementById('studio-card-density-select');
    const themeSelect = document.getElementById('studio-card-theme-select');
    if (densitySelect) densitySelect.value = currentLayout.cardDensity || 'normal';
    if (themeSelect) themeSelect.value = currentLayout.cardTheme || 'parchment';

    updateLockButton();
    renderConfigSidebar();
    updatePreview();
}

/**
 * Updates UI elements that depend on studioMode (warband vs menu)
 */
function updateStudioModeUI() {
    const addBtn = document.getElementById('studio-add-card-btn');
    if (addBtn) {
        if (studioMode === 'menu') {
            addBtn.classList.remove('hidden');
            addBtn.classList.add('inline-flex');
        } else {
            addBtn.classList.add('hidden');
            addBtn.classList.remove('inline-flex');
        }
    }

    const headerTitle = document.getElementById('studio-header-title');
    if (headerTitle) {
        if (studioMode === 'warband' && currentWarband?.name) {
            headerTitle.textContent = `Build Fighter Cards (${currentWarband.name})`;
        } else {
            headerTitle.textContent = 'Build Fighter Cards';
        }
    }

    updateDeleteButton();
}

/**
 * Updates the visibility of the delete card button in the studio toolbar
 */
function updateDeleteButton() {
    const deleteBtn = document.getElementById('studio-delete-card-btn');
    if (!deleteBtn) return;
    const isCustomDeck = studioMode === 'menu' && getActiveDeck() !== currentWarband;
    const isDeletable = isCustomDeck && selectedFighterId && selectedFighterId !== 'sample' && selectedFighterId !== 'blank';
    if (isDeletable) {
        deleteBtn.classList.remove('hidden');
        deleteBtn.classList.add('inline-flex');
    } else {
        deleteBtn.classList.add('hidden');
        deleteBtn.classList.remove('inline-flex');
    }
}

/**
 * Populates the fighter selector dropdown with matching members or fallback sample
 */
function populateFighterDropdown() {
    const select = document.getElementById('studio-fighter-select');
    if (!select) return;

    select.innerHTML = '';

    const warband = getActiveDeck();
    const matchingFighters = (warband?.members || []).filter(f => f.type === activeFighterType);

    if (matchingFighters.length > 0) {
        matchingFighters.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f.id;
            const locked = isFighterLayoutLocked(f.id);
            const extra = (studioMode === 'menu' && f.warband_name) ? ` - ${f.warband_name}` : '';
            opt.textContent = `${f.name} (${f.warrior_choice || f.type}${extra})${locked ? ' [Locked]' : ''}`;
            select.appendChild(opt);
        });

        const hasSelected = matchingFighters.some(f => String(f.id) === String(selectedFighterId)) || selectedFighterId === 'blank';
        if (!hasSelected) {
            selectedFighterId = matchingFighters[0].id;
        }
    } else {
        // Fallback sample fighter
        const opt = document.createElement('option');
        opt.value = 'sample';
        opt.textContent = `[Sample ${activeFighterType} Fighter]`;
        select.appendChild(opt);
        if (selectedFighterId !== 'blank') {
            selectedFighterId = 'sample';
        }
    }

    // Always add the Blank Card option for this section
    const blankOpt = document.createElement('option');
    blankOpt.value = 'blank';
    blankOpt.textContent = `[Blank ${activeFighterType} Card]`;
    select.appendChild(blankOpt);

    select.value = selectedFighterId;
    updateDeleteButton();
}

/**
 * Retrieves the currently active fighter object for rendering
 */
function getActiveFighter() {
    if (selectedFighterId === 'blank') {
        return getBlankFighter(activeFighterType);
    }
    const warband = getActiveDeck();
    if (selectedFighterId === 'sample' || !warband) {
        return getSampleFighter(activeFighterType, warband);
    }
    const found = (warband.members || []).find(f => String(f.id) === String(selectedFighterId));
    return found || getSampleFighter(activeFighterType, warband);
}

/**
 * Renders the sidebar block list
 */
function renderConfigSidebar() {
    const container = document.getElementById('studio-blocks-list');
    if (!container || !currentLayout) return;

    container.innerHTML = '';

    currentLayout.blocks.forEach((blockConfig, idx) => {
        const blockDef = AVAILABLE_BLOCKS[blockConfig.id];
        if (!blockDef) return;

        // Check if allowed for this fighter type
        if (!blockDef.allowedTypes.includes(activeFighterType)) return;

        // When accessed from the main menu, Notes & Reminders component is not needed for template cards
        const currentFighter = getActiveFighter();
        const isSavedCard = currentFighter?.fromSavedWarband || (currentFighter && !currentFighter.isBlank && !currentFighter.isTemplateCard && !String(currentFighter.id || '').startsWith('sample'));
        if (studioMode === 'menu' && !isSavedCard && blockConfig.id === 'notes') return;

        const isBottom = blockConfig.placement === 'bottom';
        const item = document.createElement('div');
        item.className = 'card-config-item';
        item.dataset.blockId = blockConfig.id;
        item.dataset.index = idx;
        item.draggable = true;

        let optionsHtml = '';
        if (blockConfig.id === 'blank_lines') {
            const lineCount = blockConfig.options?.lineCount || 3;
            optionsHtml = `
                <div class="config-item-options flex items-center space-x-2 mt-1.5 pt-1 border-t border-slate-700/60 text-xs text-slate-300">
                    <span class="text-slate-400">Lines:</span>
                    <select class="blank-lines-count-select bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-xs text-white">
                        <option value="2" ${lineCount === 2 ? 'selected' : ''}>2 lines</option>
                        <option value="3" ${lineCount === 3 ? 'selected' : ''}>3 lines</option>
                        <option value="4" ${lineCount === 4 ? 'selected' : ''}>4 lines</option>
                        <option value="5" ${lineCount === 5 ? 'selected' : ''}>5 lines</option>
                        <option value="6" ${lineCount === 6 ? 'selected' : ''}>6 lines</option>
                    </select>
                </div>
            `;
        } else if (blockConfig.id === 'header') {
            const showCost = blockConfig.options?.showCost !== false;
            optionsHtml = `
                <div class="config-item-options flex items-center space-x-2 mt-1.5 pt-1 border-t border-slate-700/60 text-xs text-slate-300">
                    <label class="flex items-center space-x-1.5 cursor-pointer">
                        <input type="checkbox" class="header-show-cost-checkbox rounded text-mordheim-gold focus:ring-mordheim-gold" ${showCost ? 'checked' : ''}>
                        <span class="text-slate-300 font-medium">Show Cost</span>
                    </label>
                </div>
            `;
        }

        item.innerHTML = `
            <div class="config-item-header">
                <div class="config-item-left">
                    <span class="config-drag-handle" title="Drag to reorder"><i class="fas fa-grip-vertical"></i></span>
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" class="block-toggle-checkbox rounded text-mordheim-gold focus:ring-mordheim-gold" ${blockConfig.enabled ? 'checked' : ''}>
                        <span class="config-item-title">${blockDef.name}</span>
                    </label>
                </div>
                <div class="config-item-actions">
                    <div class="config-placement-toggle">
                        <button type="button" class="btn-placement btn-place-top ${!isBottom ? 'active' : ''}" title="Flow at Top">Top</button>
                        <button type="button" class="btn-placement btn-place-bottom ${isBottom ? 'active' : ''}" title="Align to Bottom of Card">Bottom</button>
                    </div>
                    <button class="config-btn-move btn-move-up" title="Move Up" ${idx === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                    <button class="config-btn-move btn-move-down" title="Move Down" ${idx === currentLayout.blocks.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                </div>
            </div>
            <div class="config-item-desc">${blockDef.description}</div>
            ${optionsHtml}
        `;

        // Blank lines count change handler
        const lineSelect = item.querySelector('.blank-lines-count-select');
        if (lineSelect) {
            lineSelect.addEventListener('change', (e) => {
                if (!blockConfig.options) blockConfig.options = {};
                blockConfig.options.lineCount = parseInt(e.target.value) || 3;
                persistCurrentLayout();
                updatePreview();
            });
        }

        // Header show cost checkbox handler
        const showCostCheckbox = item.querySelector('.header-show-cost-checkbox');
        if (showCostCheckbox) {
            showCostCheckbox.addEventListener('change', () => {
                if (!blockConfig.options) blockConfig.options = {};
                blockConfig.options.showCost = showCostCheckbox.checked;
                persistCurrentLayout();
                updatePreview();
            });
        }

        // Checkbox change handler
        const checkbox = item.querySelector('.block-toggle-checkbox');
        checkbox.addEventListener('change', () => {
            blockConfig.enabled = checkbox.checked;
            persistCurrentLayout();
            updatePreview();
        });

        // Top / Bottom placement buttons
        const topBtn = item.querySelector('.btn-place-top');
        topBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            blockConfig.placement = 'top';
            persistCurrentLayout();
            renderConfigSidebar();
            updatePreview();
        });

        const bottomBtn = item.querySelector('.btn-place-bottom');
        bottomBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            blockConfig.placement = 'bottom';
            persistCurrentLayout();
            renderConfigSidebar();
            updatePreview();
        });

        // Up / Down buttons
        const upBtn = item.querySelector('.btn-move-up');
        upBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (idx > 0) {
                const prevBlock = currentLayout.blocks[idx - 1];
                handleReorder(blockConfig.id, prevBlock.id, true);
            }
        });

        const downBtn = item.querySelector('.btn-move-down');
        downBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (idx < currentLayout.blocks.length - 1) {
                const nextBlock = currentLayout.blocks[idx + 1];
                handleReorder(blockConfig.id, nextBlock.id, false);
            }
        });

        container.appendChild(item);
    });
}

/**
 * Sets the active view on mobile devices ('preview' or 'components')
 */
export function setMobileView(view) {
    activeMobileView = view;
    const bodyEl = document.querySelector('.studio-body');
    if (!bodyEl) return;

    if (view === 'components') {
        bodyEl.classList.remove('mobile-view-preview');
        bodyEl.classList.add('mobile-view-components');
    } else {
        bodyEl.classList.remove('mobile-view-components');
        bodyEl.classList.add('mobile-view-preview');
    }

    document.querySelectorAll('.studio-mobile-nav-btn').forEach(btn => {
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (view === 'preview') {
        updatePreview();
    }
}

/**
 * Updates the live card preview and checks overflow status
 */
function updatePreview() {
    const container = document.getElementById('studio-card-container');
    const overflowEl = document.getElementById('studio-overflow-indicator');
    if (!container || !currentLayout) return;

    const fighter = getActiveFighter();
    const warband = getActiveDeck();
    container.innerHTML = renderFighterCard(fighter, warband, currentLayout, true);

    // Check overflow
    setTimeout(() => {
        const cardInner = container.querySelector('.card-inner-frame');
        if (cardInner && overflowEl) {
            const isOverflowing = cardInner.scrollHeight > cardInner.clientHeight + 2;
            if (isOverflowing) {
                overflowEl.className = 'card-overflow-badge';
                overflowEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Content exceeds 88mm height (use Compact mode or hide some blocks)';
            } else {
                overflowEl.className = 'card-fits-badge';
                overflowEl.innerHTML = '<i class="fas fa-check-circle"></i> Fits within 63mm &times; 88mm boundary';
            }
        }
    }, 50);
}

/**
 * Opens the Card Builder Studio Modal
 * @param {Object|null} overrideWarband - Optional warband or deck to view
 * @param {string|number|null} initialSelectedFighterId - Optional fighter ID to select immediately
 * @param {Object} options - Options including source ('warband' | 'menu')
 */
export function openCardBuilderModal(overrideWarband = null, initialSelectedFighterId = null, options = {}) {
    const source = options?.source || null;

    if (source === 'warband') {
        studioMode = 'warband';
        activeDeckWarband = currentWarband;
    } else if (source === 'menu') {
        studioMode = 'menu';
        activeDeckWarband = overrideWarband || getBuilderDeck();
    } else if (overrideWarband && overrideWarband !== currentWarband) {
        activeDeckWarband = overrideWarband;
        studioMode = 'menu';
    } else if (currentWarband && Array.isArray(currentWarband.members)) {
        activeDeckWarband = currentWarband;
        studioMode = 'warband';
    } else {
        activeDeckWarband = getBuilderDeck();
        studioMode = 'menu';
    }

    ensureStudioModal();

    try {
        const deck = getActiveDeck();
        updateStudioModeUI();

        if (initialSelectedFighterId) {
            const found = (deck.members || []).find(m => String(m.id) === String(initialSelectedFighterId));
            if (found) {
                activeFighterType = found.type;
                selectedFighterId = found.id;
            }
        } else if (Array.isArray(deck.members) && deck.members.length > 0) {
            const typesInDeck = deck.members.map(f => f.type);
            if (!typesInDeck.includes(activeFighterType)) {
                activeFighterType = typesInDeck[0] || 'Hero';
            }
        }

        // Switch to active fighter type
        switchFighterType(activeFighterType);

        if (initialSelectedFighterId) {
            selectedFighterId = initialSelectedFighterId;
            const sel = document.getElementById('studio-fighter-select');
            if (sel) sel.value = selectedFighterId;
            currentLayout = loadFighterLayout(activeFighterType, selectedFighterId);

            const densitySelect = document.getElementById('studio-card-density-select');
            const themeSelect = document.getElementById('studio-card-theme-select');
            if (densitySelect) densitySelect.value = currentLayout.cardDensity || 'normal';
            if (themeSelect) themeSelect.value = currentLayout.cardTheme || 'parchment';

            updateLockButton();
            renderConfigSidebar();
            updatePreview();
            updateDeleteButton();
        }

        // Auto-fit zoom on narrow mobile screens
        if (window.innerWidth <= 640 && currentZoom > 1.0) {
            currentZoom = 1.0;
        }
        applyZoom();
        setMobileView('preview');

        if (modalElement) {
            modalElement.classList.remove('hidden');
        }
    } catch (err) {
        console.error('Card Builder Studio failed to populate:', err);
        showMessage('Card Builder error: ' + (err?.message || err), 'error');
    }
}

/**
 * Closes the Card Builder Studio Modal
 */
export function closeCardBuilderModal() {
    sessionDefaultWarbandKey = null;
    if (modalElement) {
        modalElement.classList.add('hidden');
    }
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
    }
    document.body.classList.remove('mobile-menu-open');
}
