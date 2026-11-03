/**
 * Card Print Module
 * Handles fighter selection, A4 2x3 sheet generation (63x88mm trim + 3mm bleed = 69x94mm,
 * 6 cards per A4 sheet with 8mm gap and external crop marks, identical to Configurador-Mordheim),
 * and print triggers.
 */

import { renderFighterCard } from './card-renderer.js';
import { loadLayout, loadFighterLayout, isFighterLayoutLocked } from './card-storage.js';
import { FIGHTER_TYPES, getBlankFighter } from './card-config.js';
import { translateWarriorRole } from '../i18n.js';

let printModalElement = null;

/**
 * Exact physical constants (in mm) matching Configurador-Mordheim.html
 */
const A4_PRINT_SPEC = {
    paperW: 210,
    paperH: 297,
    cardW: 63,
    cardH: 88,
    bleed: 3,
    gapX: 8,
    gapY: 8,
    cols: 2,
    rows: 3,
    perPage: 6,
    // Centered trim origin on 210x297mm A4:
    // gridW = 63*2 + 8 = 134mm -> trimOriginX = (210 - 134)/2 = 38mm (bleedOriginX = 35mm)
    // gridH = 88*3 + 8*2 = 280mm -> trimOriginY = (297 - 280)/2 = 8.5mm (bleedOriginY = 5.5mm)
    trimOriginX: 38,
    trimOriginY: 8.5
};

/**
 * Builds the full-page A4 SVG overlay (210x297mm) with external crop marks, bleed boundary,
 * and optional dashed trim contour at exact millimeter coordinates matching Configurador-Mordheim.
 * @param {number} populatedSlots - Number of populated card slots on this sheet (1..6)
 * @param {string} cutGuides - 'crop' | 'both' | 'dashed' | 'none'
 * @returns {string} SVG markup string
 */
function buildSheetMarksSvg(populatedSlots, cutGuides) {
    if (cutGuides === 'none') return '';

    const { paperW, paperH, cardW, cardH, bleed, gapX, gapY, cols, trimOriginX, trimOriginY } = A4_PRINT_SPEC;
    const mStart = bleed + 0.4; // 3.4mm outside trim
    const mEnd = mStart + 1.5;  // 4.9mm outside trim
    const showCropMarks = cutGuides === 'crop' || cutGuides === 'both';
    const showDashedTrim = cutGuides === 'dashed' || cutGuides === 'both';

    const parts = [];

    for (let i = 0; i < populatedSlots; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = trimOriginX + col * (cardW + gapX);
        const y = trimOriginY + row * (cardH + gapY);

        // Subtle outer bleed boundary (69x94mm), matching Configurador-Mordheim
        parts.push(
            `<rect x="${x - bleed}" y="${y - bleed}" width="${cardW + 2 * bleed}" height="${cardH + 2 * bleed}" fill="none" stroke="#b7765b" stroke-width="0.13" opacity="0.5"/>`
        );

        // Dashed trim guide right on the 63x88mm cut line (when requested)
        if (showDashedTrim) {
            parts.push(
                `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" fill="none" stroke="#5d655f" stroke-width="0.23" stroke-dasharray="1 0.8"/>`
            );
        }

        // External crop marks outside the 3mm bleed aligned with the 63x88mm trim lines
        if (showCropMarks) {
            const lines = [
                [x - mEnd, y, x - mStart, y],
                [x - mEnd, y + cardH, x - mStart, y + cardH],
                [x + cardW + mStart, y, x + cardW + mEnd, y],
                [x + cardW + mStart, y + cardH, x + cardW + mEnd, y + cardH],
                [x, y - mEnd, x, y - mStart],
                [x + cardW, y - mEnd, x + cardW, y - mStart],
                [x, y + cardH + mStart, x, y + cardH + mEnd],
                [x + cardW, y + cardH + mStart, x + cardW, y + cardH + mEnd]
            ];
            lines.forEach(([x1, y1, x2, y2]) => {
                parts.push(
                    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333333" stroke-width="0.16"/>`
                );
            });
        }
    }

    return `<svg class="cards-print-marks-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${paperW} ${paperH}" width="${paperW}mm" height="${paperH}mm" aria-hidden="true">${parts.join('')}</svg>`;
}

/**
 * Ensures the print options modal exists in the DOM
 */
function ensurePrintModal() {
    let existing = document.getElementById('card-print-modal');
    if (
        existing &&
        (
            existing.querySelector('#quick-print-preview-btn') ||
            existing.querySelector('.fa-check-double') ||
            !existing.querySelector('option[value="both"]')
        )
    ) {
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

                <div class="mb-4 text-sm text-slate-300 leading-relaxed">
                    Formato idéntico al Configurador Mordheim: tamaño de corte real de <strong>63 &times; 88 mm</strong> con <strong>3 mm de sangrado</strong> (69 &times; 94 mm), <strong>6 cartas por hoja A4 (2&times;3)</strong> con separación de 8 mm y marcas de corte.
                    <span class="block text-xs text-[#dfbc77] mt-1 font-medium"><i class="fas fa-ruler-combined mr-1"></i>En el diálogo de impresión, usa Papel A4, Escala 100% (Tamaño real) y Márgenes: Ninguno.</span>
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
                        <label class="block text-slate-400 text-xs font-semibold mb-1">Guías de Corte (63&times;88 mm)</label>
                        <select id="card-print-guides-select" class="w-full bg-[#15161a] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs focus:border-[#dfbc77] focus:outline-none transition">
                            <option value="crop" selected>Marcas de corte exteriores (Sangrado 3mm)</option>
                            <option value="both">Marcas exteriores + guía punteada 63&times;88mm</option>
                            <option value="dashed">Solo guía punteada en corte (63&times;88mm)</option>
                            <option value="none">Sin guías de corte</option>
                        </select>
                        <span class="block text-[11px] text-slate-400 mt-1">Las marcas exteriores quedan fuera del sangrado de 3 mm.</span>
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
                <span class="text-xs text-slate-400">(${roleName}${fighter.warrior_choice ? ` - ${translateWarriorRole(fighter.warrior_choice) || fighter.warrior_choice}` : ''})</span>
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
 * Assembles the A4 2x3 sheets (63x88mm trim + 3mm bleed = 69x94mm, 8mm trim gap,
 * external crop marks) matching Configurador-Mordheim.html and executes window.print()
 */
function executePrint(fighters, warband, theme, cutGuides) {
    if (!fighters || fighters.length === 0) {
        alert('Por favor, selecciona al menos una carta para imprimir.');
        return;
    }

    const activeGuides = cutGuides || 'crop';

    // Remove any existing print container or temporary @page style override
    const oldContainer = document.getElementById('cards-print-container');
    if (oldContainer) oldContainer.remove();
    const oldPageStyle = document.getElementById('cards-print-page-override');
    if (oldPageStyle) oldPageStyle.remove();

    // Inject @page { size: A4 portrait; margin: 0mm !important; } so print.css margin: 8mm
    // never overrides card printing and browsers do not shrink the 210x297mm A4 sheet
    const pageStyle = document.createElement('style');
    pageStyle.id = 'cards-print-page-override';
    pageStyle.textContent = '@media print { @page { size: A4 portrait; margin: 0mm !important; } }';
    document.head.appendChild(pageStyle);

    const printContainer = document.createElement('div');
    printContainer.id = 'cards-print-container';
    printContainer.className = `cards-print-container guides-${activeGuides}`;

    // Chunk fighters into groups of 6 for 2x3 A4 sheets (matching Configurador-Mordheim)
    const { perPage } = A4_PRINT_SPEC;
    const sheets = [];
    for (let i = 0; i < fighters.length; i += perPage) {
        sheets.push(fighters.slice(i, i + perPage));
    }

    sheets.forEach((sheetFighters) => {
        const sheetElement = document.createElement('div');
        sheetElement.className = 'cards-print-sheet';

        const gridElement = document.createElement('div');
        gridElement.className = 'cards-print-grid';

        sheetFighters.forEach(fighter => {
            const layout = loadFighterLayout(fighter.type, fighter.id);
            // Override layout theme with print theme selection if explicitly forced
            const activeTheme = (theme === 'clean' || theme === 'parchment') ? theme : (layout?.cardTheme || 'parchment');
            const activeLayout = { ...layout, cardTheme: activeTheme };
            const cardHtml = renderFighterCard(fighter, warband, activeLayout, false);

            const cardCell = document.createElement('div');
            cardCell.className = `cards-print-cell bleed-${activeTheme}`;
            cardCell.innerHTML = cardHtml;
            gridElement.appendChild(cardCell);
        });

        // Fill remaining cells if less than 6 to maintain 2x3 grid alignment
        const remaining = perPage - sheetFighters.length;
        for (let j = 0; j < remaining; j++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'cards-print-cell empty-cell';
            gridElement.appendChild(emptyCell);
        }

        sheetElement.appendChild(gridElement);

        // Append full-sheet A4 SVG overlay with external crop marks / cut guides
        const marksSvg = buildSheetMarksSvg(sheetFighters.length, activeGuides);
        if (marksSvg) {
            sheetElement.insertAdjacentHTML('beforeend', marksSvg);
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
        const styleEl = document.getElementById('cards-print-page-override');
        if (styleEl && styleEl.parentNode) {
            styleEl.parentNode.removeChild(styleEl);
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
