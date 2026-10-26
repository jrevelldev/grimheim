/**
 * Card Print Module
 * Handles fighter selection, 3x3 sheet generation (standard 9 cards per page), and print triggers.
 */

import { renderFighterCard } from './card-renderer.js';
import { loadLayout, loadFighterLayout, isFighterLayoutLocked } from './card-storage.js';
import { FIGHTER_TYPES, getBlankFighter } from './card-config.js';

let printModalElement = null;

/**
 * Ensures the print options modal exists in the DOM
 */
function ensurePrintModal() {
    let existing = document.getElementById('card-print-modal');
    if (existing && (existing.querySelector('#quick-print-preview-btn') || existing.querySelector('.fa-check-double'))) {
        existing.remove();
        existing = null;
    }
    if (existing) {
        document.body.appendChild(existing);
        printModalElement = existing;
        return;
    }

    const modalHtml = `
        <div id="card-print-modal" class="hidden fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4" style="z-index: 99999;">
            <div class="bg-[#15161a] border border-white/10 p-6 rounded-2xl w-full max-w-xl shadow-2xl flex flex-col max-h-[90vh]">
                <div class="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                    <h3 class="text-xl font-bold text-[#dfbc77] flex items-center">
                        <i class="fas fa-print mr-2"></i> Imprimir Cartas de Guerreros
                    </h3>
                    <button id="close-card-print-modal-btn" class="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <div class="mb-4 text-sm text-slate-300">
                    Las cartas tienen formato de <strong>63mm &times; 88mm</strong> estándar. Caben <strong>9 cartas por página (cuadrícula 3&times;3)</strong> en A4 o Carta.
                </div>

                <!-- Print Options -->
                <div class="grid grid-cols-2 gap-3 mb-4 bg-[#101114] p-3.5 rounded-xl border border-white/10 text-sm">
                    <div>
                        <label class="block text-slate-400 text-xs font-semibold mb-1">Tema (Impresión)</label>
                        <select id="card-print-theme-select" class="w-full bg-[#15161a] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs focus:border-[#dfbc77] focus:outline-none transition">
                            <option value="as-designed">Según diseño en el estudio (Por defecto)</option>
                            <option value="clean">Limpio / Ahorro de tinta (B/N)</option>
                            <option value="parchment">Pergamino Grimdark (Color)</option>
                        </select>
                        <span class="block text-[11px] text-slate-400 mt-1">Mantiene el tema de cada carta o fuerza un modo económico en B/N.</span>
                    </div>
                    <div>
                        <label class="block text-slate-400 text-xs font-semibold mb-1">Guías de Corte</label>
                        <select id="card-print-guides-select" class="w-full bg-[#15161a] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs focus:border-[#dfbc77] focus:outline-none transition">
                            <option value="dashed">Líneas de corte punteadas</option>
                            <option value="crop">Marcas de corte en esquinas</option>
                            <option value="none">Sin guías de corte</option>
                        </select>
                    </div>
                </div>

                <!-- Fighter Selection List -->
                <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <span class="text-sm font-semibold text-slate-200">Seleccionar Guerreros a Imprimir</span>
                    <div class="flex items-center space-x-2 text-xs">
                        <button id="card-print-select-roster-top" class="text-[#dfbc77] hover:underline font-semibold">Toda la Banda</button>
                        <span class="text-slate-500">|</span>
                        <button id="card-print-select-all" class="text-slate-300 hover:text-white hover:underline">Seleccionar Todos</button>
                        <span class="text-slate-500">|</span>
                        <button id="card-print-deselect-all" class="text-slate-400 hover:text-white hover:underline">Deseleccionar Todos</button>
                    </div>
                </div>

                <div id="card-print-fighter-list" class="flex-1 overflow-y-auto space-y-1 mb-4 bg-[#101114] p-3 rounded-xl border border-white/10 max-h-60 custom-scroll">
                    <!-- Dynamic fighter checkboxes -->
                </div>

                <!-- Modal Actions -->
                <div class="flex justify-end space-x-3 pt-3 border-t border-white/10">
                    <button id="cancel-card-print-btn" class="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold rounded-lg transition">
                        Cancelar
                    </button>
                    <button id="execute-card-print-btn" class="px-5 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-sm font-semibold rounded-lg shadow-sm transition flex items-center gap-2">
                        <i class="fas fa-print"></i> Imprimir Cartas
                    </button>
                </div>

            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    printModalElement = document.getElementById('card-print-modal');

    // Attach modal close handlers
    document.getElementById('close-card-print-modal-btn').addEventListener('click', closePrintModal);
    document.getElementById('cancel-card-print-btn').addEventListener('click', closePrintModal);
}

/**
 * Opens the Print Modal
 * @param {object} [warband] - Current warband object (optional)
 */
export function openPrintModal(warband) {
    const safeWarband = warband || { name: 'Card Studio', members: [] };

    ensurePrintModal();

    const listContainer = document.getElementById('card-print-fighter-list');
    listContainer.innerHTML = '';

    // Warband Members section
    if (safeWarband.members && safeWarband.members.length > 0) {
        const warbandHeader = document.createElement('div');
        warbandHeader.className = 'text-xs font-bold text-[#dfbc77] uppercase tracking-wider px-2 pt-2 pb-1 border-t border-white/10';
        warbandHeader.textContent = `Lista de la Banda (${safeWarband.members.length} Guerreros)`;
        listContainer.appendChild(warbandHeader);

        safeWarband.members.forEach((fighter, idx) => {
            const item = document.createElement('label');
            item.className = 'flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer text-sm text-slate-200 transition';
            const isLocked = isFighterLayoutLocked(fighter.id);
            const roleName = fighter.type === 'Hero' ? 'Héroe' : (fighter.type === 'Henchman' ? 'Secuaz' : fighter.type);
            item.innerHTML = `
                <input type="checkbox" class="fighter-print-checkbox rounded text-[#dfbc77] accent-[#dfbc77] focus:ring-[#dfbc77]" data-fighter-id="${fighter.id || ''}" data-fighter-index="${idx}" checked>
                <span class="font-medium text-white">${fighter.name || 'Guerrero sin nombre'}</span>
                <span class="text-xs text-slate-400">(${roleName}${fighter.warrior_choice ? ` - ${fighter.warrior_choice}` : ''})</span>
                ${isLocked ? '<span class="text-xs text-[#dfbc77] font-medium ml-auto flex items-center gap-1"><i class="fas fa-lock text-[10px]"></i> Diseño Bloqueado</span>' : ''}
            `;
            listContainer.appendChild(item);
        });
    }

    // Blank template cards section
    const blankSectionHeader = document.createElement('div');
    blankSectionHeader.className = 'text-xs font-bold text-[#dfbc77] uppercase tracking-wider px-2 pt-3 pb-1 border-t border-white/10 mt-2';
    blankSectionHeader.textContent = 'Plantillas de Cartas en Blanco';
    listContainer.appendChild(blankSectionHeader);

    FIGHTER_TYPES.forEach(t => {
        const typeId = t.id || t;
        const typeLabel = t.label || typeId;
        const item = document.createElement('label');
        item.className = 'flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer text-sm text-slate-200 transition';
        item.innerHTML = `
            <input type="checkbox" class="fighter-print-checkbox rounded text-[#dfbc77] accent-[#dfbc77] focus:ring-[#dfbc77]" data-blank-type="${typeId}">
            <span class="font-medium text-white">[Carta en blanco: ${typeLabel}]</span>
            <span class="text-xs text-slate-400">(Encabezados y Líneas)</span>
        `;
        listContainer.appendChild(item);
    });

    // Select all warband roster fighters helper
    const selectAllWarbandRoster = () => {
        // Check all warband roster fighters
        listContainer.querySelectorAll('.fighter-print-checkbox[data-fighter-index]').forEach(cb => cb.checked = true);
        // Uncheck blank templates
        listContainer.querySelectorAll('.fighter-print-checkbox[data-blank-type]').forEach(cb => cb.checked = false);
    };

    const rosterBtnTop = document.getElementById('card-print-select-roster-top');
    if (rosterBtnTop) {
        if (safeWarband.members && safeWarband.members.length > 0) {
            rosterBtnTop.style.display = 'inline-flex';
            rosterBtnTop.onclick = selectAllWarbandRoster;
        } else {
            rosterBtnTop.style.display = 'none';
        }
    }

    // Select/Deselect handlers
    document.getElementById('card-print-select-all').onclick = () => {
        listContainer.querySelectorAll('.fighter-print-checkbox').forEach(cb => cb.checked = true);
    };
    document.getElementById('card-print-deselect-all').onclick = () => {
        listContainer.querySelectorAll('.fighter-print-checkbox').forEach(cb => cb.checked = false);
    };

    // Print execute handler
    document.getElementById('execute-card-print-btn').onclick = () => {
        const checkedBoxes = Array.from(listContainer.querySelectorAll('.fighter-print-checkbox:checked'));

        if (checkedBoxes.length === 0) {
            alert('Por favor, selecciona al menos un guerrero o carta para imprimir.');
            return;
        }

        const selectedFighters = [];
        checkedBoxes.forEach(cb => {
            if (cb.dataset.blankType) {
                selectedFighters.push(getBlankFighter(cb.dataset.blankType));
            } else if (cb.dataset.fighterIndex !== undefined && safeWarband.members) {
                const idx = parseInt(cb.dataset.fighterIndex, 10);
                if (safeWarband.members[idx]) {
                    selectedFighters.push(safeWarband.members[idx]);
                }
            } else if (cb.dataset.fighterId && safeWarband.members) {
                const found = safeWarband.members.find(f => String(f.id) === String(cb.dataset.fighterId));
                if (found) selectedFighters.push(found);
            }
        });

        if (selectedFighters.length === 0) {
            alert('No se han podido encontrar las cartas de guerrero seleccionadas para imprimir.');
            return;
        }

        const theme = document.getElementById('card-print-theme-select').value;
        const cutGuides = document.getElementById('card-print-guides-select').value;

        closePrintModal();
        executePrint(selectedFighters, safeWarband, theme, cutGuides);
    };

    document.body.appendChild(printModalElement);
    printModalElement.style.zIndex = '99999';
    printModalElement.classList.remove('hidden');
}

/**
 * Closes the Print Modal
 */
export function closePrintModal() {
    if (printModalElement) {
        printModalElement.classList.add('hidden');
    }
}

/**
 * Assembles the 3x3 sheets and executes window.print()
 */
function executePrint(fighters, warband, theme, cutGuides) {
    if (!fighters || fighters.length === 0) {
        alert('Por favor, selecciona al menos una carta para imprimir.');
        return;
    }

    // Remove any existing print container
    const oldContainer = document.getElementById('cards-print-container');
    if (oldContainer) oldContainer.remove();

    const printContainer = document.createElement('div');
    printContainer.id = 'cards-print-container';
    printContainer.className = `cards-print-container guides-${cutGuides || 'dashed'}`;

    // Chunk fighters into groups of 9 for 3x3 sheets
    const sheets = [];
    for (let i = 0; i < fighters.length; i += 9) {
        sheets.push(fighters.slice(i, i + 9));
    }

    sheets.forEach((sheetFighters) => {
        const sheetElement = document.createElement('div');
        sheetElement.className = 'cards-print-sheet';

        sheetFighters.forEach(fighter => {
            const layout = loadFighterLayout(fighter.type, fighter.id);
            // Override layout theme with print theme selection if explicitly forced
            const activeTheme = (theme === 'clean' || theme === 'parchment') ? theme : (layout?.cardTheme || 'parchment');
            const activeLayout = { ...layout, cardTheme: activeTheme };
            const cardHtml = renderFighterCard(fighter, warband, activeLayout, false);

            const cardCell = document.createElement('div');
            cardCell.className = 'cards-print-cell';
            cardCell.innerHTML = cardHtml;
            sheetElement.appendChild(cardCell);
        });

        // Fill remaining cells if less than 9 to maintain 3x3 grid alignment
        const remaining = 9 - sheetFighters.length;
        for (let j = 0; j < remaining; j++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'cards-print-cell empty-cell';
            sheetElement.appendChild(emptyCell);
        }

        printContainer.appendChild(sheetElement);
    });

    // Mark body so print.css and cards.css apply card print rules
    document.body.classList.add('printing-cards');
    document.body.appendChild(printContainer);

    // Force synchronous layout recalculation
    void printContainer.offsetHeight;

    let cleanedUp = false;
    const cleanup = () => {
        if (cleanedUp) return;
        cleanedUp = true;
        document.body.classList.remove('printing-cards');
        if (printContainer && printContainer.parentNode) {
            printContainer.parentNode.removeChild(printContainer);
        }
        window.removeEventListener('afterprint', cleanup);
    };

    // Clean up after the print dialog finishes (either printed or canceled)
    window.addEventListener('afterprint', cleanup);

    // Safety fallback: if afterprint doesn't fire after 2 minutes, cleanup
    setTimeout(cleanup, 120000);

    // Synchronously invoke print dialog directly within the user interaction callstack
    try {
        window.print();
    } catch (err) {
        console.error('Print trigger failed:', err);
        cleanup();
    }
}
