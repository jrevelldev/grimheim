/**
 * Fighter Gear Quick-Manage Modal
 *
 * Lets the user view, buy and sell a fighter's equipment straight from the roster card
 * without opening the full Edit Fighter modal.
 *
 * How it works: the fighter is loaded into the (hidden) Edit Fighter form using
 * editFighter(..., { silent: true }). All purchase/sale actions then reuse the existing
 * equipment logic (Select Equipment modal, Sell/Store modal, pending purchase/sale tracking),
 * and Save goes through saveFighter(), which shows the Equipment Changes confirmation and
 * records the transactions in the Ledger.
 */
import { MASTER_EQUIPMENT_LIST } from './data/index.js';
import { calculateEquipmentCost, normalizeEquipment, displayModal, hideModal, showMessage } from './utility.js';
import { currentWarband } from './state.js';
import { removeEquipment, showEquipmentSelectionModal } from './equipment-management.js';
import { showEquipmentReorderModal } from './equipment-reorder-modal.js';
import { editFighter } from './edit-fighter-modal.js';
import { saveFighter } from './fighter-management.js';

const MODAL_ID = 'fighter-gear-modal';
let gearSaveWarband = null;
let listenersInitialized = false;

const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isGearModalActive = () => document.getElementById(MODAL_ID)?.dataset.active === 'true';

const parseJson = (value, fallback) => {
    try { return JSON.parse(value || ''); } catch (e) { return fallback; }
};

/** Reads the fighter's working equipment list from the hidden Edit Fighter form */
const getWorkingEquipment = () => {
    const raw = parseJson(document.getElementById('f-equipment-json')?.value, []);
    return Array.isArray(raw) ? raw.map(item => normalizeEquipment(item)) : [];
};

/** Returns the cost that the existing remove logic expects (variableCost when it is a number) */
const getDisplayCost = (item) => (typeof item.variableCost === 'number' ? item.variableCost : item.cost);

/** Clears pending equipment changes stored on the hidden Edit Fighter modal */
const clearPendingEquipmentChanges = () => {
    const fighterModal = document.getElementById('fighter-modal');
    if (!fighterModal) return;
    delete fighterModal.dataset.pendingPurchases;
    delete fighterModal.dataset.pendingSellGc;
    delete fighterModal.dataset.pendingSells;
    delete fighterModal.dataset.pendingStores;
    delete fighterModal.dataset.pendingRemovedCost;
};

/** Renders the equipment rows of the Gear modal */
const renderGearList = () => {
    const listEl = document.getElementById('gear-equipment-list');
    if (!listEl) return;

    const equipment = getWorkingEquipment();
    const warbandName = currentWarband ? currentWarband.type : null;

    if (equipment.length === 0) {
        listEl.innerHTML = `<li class="text-slate-500 text-sm py-2 text-center">No equipment.</li>`;
    } else {
        listEl.innerHTML = equipment.map((item, index) => {
            const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
            const displayCost = getDisplayCost(item);
            // Blessings of Nurgle can only be gained on recruitment and cannot be removed (same as Edit)
            const canRemove = !(masterItem && masterItem.category === 'Blessings of Nurgle');
            const category = masterItem?.category ? `<span class="text-slate-500 text-xs ml-1">${escapeHtml(masterItem.category)}</span>` : '';
            return `
                <li class="flex justify-between items-center gap-2 text-sm py-1 px-1 rounded hover:bg-slate-800 transition">
                    <span class="text-yellow-200">${escapeHtml(item.name)}
                        <span class="text-slate-400 text-xs">(${escapeHtml(displayCost)} GC)</span>${category}
                    </span>
                    ${canRemove ? `
                    <button type="button" data-gear-action="sell" data-item-index="${index}"
                        class="flex-shrink-0 py-0.5 px-2 text-xs font-semibold rounded bg-slate-700 text-red-300 hover:bg-red-700 hover:text-white transition"
                        title="Sell or store ${escapeHtml(item.name)}">
                        Sell
                    </button>` : ''}
                </li>`;
        }).join('');
    }

    const totalEl = document.getElementById('gear-equipment-total');
    if (totalEl) {
        totalEl.textContent = `(${calculateEquipmentCost(equipment)} GC per fighter)`;
    }

    const reorderBtn = document.getElementById('gear-reorder-btn');
    if (reorderBtn) {
        const canReorder = equipment.length >= 2;
        reorderBtn.disabled = !canReorder;
        reorderBtn.classList.toggle('opacity-50', !canReorder);
        reorderBtn.classList.toggle('cursor-not-allowed', !canReorder);
        reorderBtn.title = canReorder ? 'Change the order of this fighter\'s equipment' : 'Add at least 2 items to reorder';
    }

    renderPendingSummary();
};

/** Renders the treasury / pending changes summary */
const renderPendingSummary = () => {
    const summaryEl = document.getElementById('gear-pending-summary');
    const fighterModal = document.getElementById('fighter-modal');
    if (!summaryEl || !fighterModal || !currentWarband) return;

    const groupSize = parseInt(document.getElementById('f-group-size')?.value) || 1;
    const pendingPurchases = parseJson(fighterModal.dataset.pendingPurchases, []);
    const pendingSells = parseJson(fighterModal.dataset.pendingSells, []);
    const pendingStores = parseJson(fighterModal.dataset.pendingStores, []);
    const pendingSellGc = parseInt(fighterModal.dataset.pendingSellGc || 0) || 0;

    const totalPurchaseCost = pendingPurchases.reduce((sum, p) => sum + Math.round((parseFloat(p.cost) || 0) * groupSize), 0);
    const net = pendingSellGc - totalPurchaseCost;
    const treasury = currentWarband.gc_treasury || 0;
    const hasChanges = pendingPurchases.length > 0 || pendingSells.length > 0 || pendingStores.length > 0;
    const prefix = groupSize > 1 ? `${groupSize}x ` : '';

    let changesHtml = '';
    if (hasChanges) {
        const rows = [
            ...pendingPurchases.map(p => `<li class="text-green-300"><i class="fas fa-plus-circle mr-1"></i>Buy ${prefix}${escapeHtml(p.name)} <span class="text-red-400">-${Math.round((parseFloat(p.cost) || 0) * groupSize)} GC</span></li>`),
            ...pendingSells.map(s => `<li class="text-yellow-300"><i class="fas fa-coins mr-1"></i>Sell ${s.groupSize > 1 ? s.groupSize + 'x ' : ''}${escapeHtml(s.itemName)} <span class="text-green-400">+${s.sellPrice} GC</span></li>`),
            ...pendingStores.map(s => `<li class="text-blue-300"><i class="fas fa-warehouse mr-1"></i>Store ${s.groupSize > 1 ? s.groupSize + 'x ' : ''}${escapeHtml(s.name)}</li>`)
        ];
        changesHtml = `<ul class="text-xs space-y-0.5 mb-2">${rows.join('')}</ul>`;
    }

    const netColor = net > 0 ? 'text-green-400' : (net < 0 ? 'text-red-400' : 'text-slate-300');
    const netSign = net > 0 ? '+' : '';

    summaryEl.innerHTML = `
        ${changesHtml}
        <div class="flex justify-between items-center">
            <span class="text-slate-300">Treasury</span>
            <span class="text-slate-200 font-semibold">
                ${treasury} GC${hasChanges ? ` <span class="${netColor}">(${netSign}${net})</span> → <span class="text-mordheim-gold">${treasury + net} GC</span>` : ''}
            </span>
        </div>
        ${hasChanges ? '<p class="text-xs text-slate-400 mt-1">Changes are applied and recorded in the Ledger when you Save.</p>' : ''}
    `;
};

/** Closes the Gear modal and discards any unsaved changes */
const cancelGearModal = () => {
    clearPendingEquipmentChanges();
    const modal = document.getElementById(MODAL_ID);
    if (modal) delete modal.dataset.active;
    hideModal(MODAL_ID);
};

/** Wires up the Gear modal's static listeners (once) */
const initGearModalListeners = () => {
    if (listenersInitialized) return;
    const modal = document.getElementById(MODAL_ID);
    if (!modal) return;
    listenersInitialized = true;

    // Keep the list in sync with every change made through the shared equipment logic
    document.addEventListener('fighter-equipment-changed', () => {
        if (isGearModalActive()) renderGearList();
    });

    modal.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        if (button.dataset.gearAction === 'sell') {
            const index = parseInt(button.dataset.itemIndex);
            const item = getWorkingEquipment()[index];
            if (!item) return;
            // Same arguments the Edit modal's remove button passes
            removeEquipment(index, item.name, parseInt(getDisplayCost(item)), item.rules);
            return;
        }

        switch (button.id) {
            case 'gear-buy-btn':
                showEquipmentSelectionModal();
                break;
            case 'gear-reorder-btn':
                if (!button.disabled) showEquipmentReorderModal();
                break;
            case 'gear-save-btn':
                saveFighter(0, false, gearSaveWarband);
                break;
            case 'gear-cancel-btn':
            case 'gear-close-x-btn':
                cancelGearModal();
                break;
        }
    });
};

/**
 * Opens the Gear quick-manage modal for a fighter.
 * @param {string} fighterId
 * @param {Function} saveWarband
 */
export const openGearModal = (fighterId, saveWarband) => {
    if (!currentWarband) return;
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;

    initGearModalListeners();
    gearSaveWarband = saveWarband;

    // Load the fighter into the hidden Edit Fighter form so the shared equipment logic works
    editFighter(fighterId, saveWarband, { silent: true });

    // Respect fighters that cannot carry equipment (starting_equipment: ["None"])
    const equipmentSection = document.getElementById('equipment-section');
    if (equipmentSection && equipmentSection.classList.contains('hidden')) {
        showMessage(`${fighter.name} cannot carry equipment.`, 'info');
        return;
    }

    const groupSize = fighter.type === 'Henchman' ? (fighter.group_size || 1) : 1;
    document.getElementById('gear-modal-title').textContent = `Gear – ${fighter.name}`;
    document.getElementById('gear-modal-subtitle').textContent =
        `${fighter.warrior_choice || fighter.type || ''}${groupSize > 1 ? ` x${groupSize} (costs apply to each model)` : ''}`;

    const modal = document.getElementById(MODAL_ID);
    modal.dataset.active = 'true';
    renderGearList();
    displayModal(MODAL_ID);
};
