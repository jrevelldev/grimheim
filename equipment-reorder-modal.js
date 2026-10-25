import { displayModal, hideModal, normalizeEquipment } from './utility.js';
import { renderSelectedEquipment } from './equipment-management.js';

/**
 * Equipment Reorder Modal
 * Lets the user change the order of a fighter's equipment in the Add/Edit Fighter view.
 * Works on a copy of #f-equipment-json; changes are only applied when "Done" is pressed,
 * and are persisted to the fighter when the fighter itself is saved.
 */

const MODAL_ID = 'equipment-reorder-modal';

let workingList = [];       // Working copy of the equipment array
let originalList = [];      // Snapshot taken when the modal was opened
let listenersAttached = false;
let lastMovedIndex = null;  // Used to briefly highlight the row that moved
let focusAfterRender = null; // { index, action } - restores focus to an arrow button after re-render

/** Reads the current equipment array from the fighter modal's hidden input */
const readEquipmentJson = () => {
    const jsonInput = document.getElementById('f-equipment-json');
    try {
        return JSON.parse(jsonInput?.value || '[]');
    } catch (e) {
        return [];
    }
};

/** Escapes text for safe HTML insertion */
const escapeHtml = (str) => String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Keeps the "first Dagger is free" cost on whichever Dagger ends up first.
 * adjustEquipmentCosts() only zeroes the first Dagger and never restores later ones,
 * so without this, swapping two Daggers would leave both at 0 GC.
 * The Dagger cost values are re-assigned to Daggers in their new order.
 */
const preserveDaggerCostOrder = (before, after) => {
    const isDagger = (item) => normalizeEquipment(item).name === 'Dagger';
    const daggerCosts = before.filter(isDagger).map(item => item.cost);
    let daggerIdx = 0;
    return after.map(item => {
        if (!isDagger(item)) return item;
        const cost = daggerCosts[daggerIdx++];
        return cost === undefined ? item : { ...item, cost };
    });
};

/** Formats the cost label for a row */
const formatCost = (item) => {
    const cost = typeof item.variableCost === 'number' ? item.variableCost : item.cost;
    if (cost === undefined || cost === null || cost === '') return '';
    return `${cost} GC`;
};

/** Renders the rows of the reorder list from workingList */
const renderReorderList = () => {
    const list = document.getElementById('equipment-reorder-list');
    if (!list) return;

    if (workingList.length === 0) {
        list.innerHTML = `<li class="text-slate-500 text-sm p-2">No equipment selected.</li>`;
        return;
    }

    const lastIndex = workingList.length - 1;
    list.innerHTML = workingList.map((item, index) => {
        const normalized = normalizeEquipment(item);
        const costLabel = formatCost(normalized);
        const movedClass = index === lastMovedIndex ? ' equip-reorder-moved' : '';
        return `
            <li class="equip-reorder-item${movedClass}" data-index="${index}">
                <span class="equip-reorder-grab equip-reorder-handle" title="Drag to reorder" aria-hidden="true">
                    <i class="fas fa-grip-vertical"></i>
                </span>
                <span class="equip-reorder-position">${index + 1}.</span>
                <span class="equip-reorder-grab equip-reorder-name">
                    ${escapeHtml(normalized.name || 'Unknown Item')}
                    ${costLabel ? `<span class="equip-reorder-cost">${escapeHtml(costLabel)}</span>` : ''}
                </span>
                <span class="equip-reorder-arrows">
                    <button type="button" class="equip-reorder-arrow" data-action="move-up" data-index="${index}"
                        title="Move up" aria-label="Move ${escapeHtml(normalized.name)} up" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button type="button" class="equip-reorder-arrow" data-action="move-down" data-index="${index}"
                        title="Move down" aria-label="Move ${escapeHtml(normalized.name)} down" ${index === lastIndex ? 'disabled' : ''}>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </span>
            </li>
        `;
    }).join('');

    // Restore keyboard focus to the arrow of the row that just moved
    if (focusAfterRender) {
        const { index, action } = focusAfterRender;
        let btn = list.querySelector(`button[data-action="${action}"][data-index="${index}"]`);
        if (!btn || btn.disabled) {
            const other = action === 'move-up' ? 'move-down' : 'move-up';
            btn = list.querySelector(`button[data-action="${other}"][data-index="${index}"]`);
        }
        btn?.focus();
        focusAfterRender = null;
    }
    lastMovedIndex = null;
};

/** Moves an item within workingList */
const moveItem = (from, to) => {
    if (from === to || from < 0 || to < 0 || from >= workingList.length || to >= workingList.length) return;
    const [item] = workingList.splice(from, 1);
    workingList.splice(to, 0, item);
    lastMovedIndex = to;
};

/** Applies the working copy to the fighter modal and closes */
const applyAndClose = () => {
    const finalList = preserveDaggerCostOrder(originalList, workingList);
    const jsonInput = document.getElementById('f-equipment-json');
    if (jsonInput) jsonInput.value = JSON.stringify(finalList);
    renderSelectedEquipment();
    closeModal();
};

const closeModal = () => {
    document.removeEventListener('keydown', handleKeydown);
    hideModal(MODAL_ID);
};

const handleKeydown = (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
    }
};

/* ---------- Pointer-based drag & drop (mouse + touch + pen) ---------- */

const dragState = {
    active: false,
    pointerId: null,
    item: null,
    list: null,
    startIndex: -1,
    scrollTimer: null,
    lastClientY: 0
};

const AUTO_SCROLL_EDGE = 36; // px from the edge of the list that triggers auto-scroll
const AUTO_SCROLL_SPEED = 8;

/** Moves the dragged row in the DOM according to the pointer's Y position */
const updateDragPosition = (clientY) => {
    const { list, item } = dragState;
    const siblings = [...list.querySelectorAll('.equip-reorder-item')].filter(el => el !== item);
    const next = siblings.find(el => {
        const rect = el.getBoundingClientRect();
        return clientY < rect.top + rect.height / 2;
    });
    if (next) {
        if (item.nextElementSibling !== next) list.insertBefore(item, next);
    } else if (list.lastElementChild !== item) {
        list.appendChild(item);
    }
};

const autoScrollTick = () => {
    if (!dragState.active) return;
    const { list, lastClientY } = dragState;
    const rect = list.getBoundingClientRect();
    let delta = 0;
    if (lastClientY < rect.top + AUTO_SCROLL_EDGE) delta = -AUTO_SCROLL_SPEED;
    else if (lastClientY > rect.bottom - AUTO_SCROLL_EDGE) delta = AUTO_SCROLL_SPEED;
    if (delta !== 0) {
        list.scrollTop += delta;
        updateDragPosition(lastClientY);
    }
    dragState.scrollTimer = requestAnimationFrame(autoScrollTick);
};

const onPointerDown = (e) => {
    const grab = e.target.closest('.equip-reorder-grab');
    if (!grab) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const item = grab.closest('.equip-reorder-item');
    const list = document.getElementById('equipment-reorder-list');
    if (!item || !list || workingList.length < 2) return;

    e.preventDefault();
    dragState.active = true;
    dragState.pointerId = e.pointerId;
    dragState.item = item;
    dragState.list = list;
    dragState.startIndex = parseInt(item.dataset.index, 10);
    dragState.lastClientY = e.clientY;

    item.classList.add('is-dragging');
    list.classList.add('is-drag-active');
    // Capture on the list (not the row) because the row is moved in the DOM while dragging
    try { list.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }

    dragState.scrollTimer = requestAnimationFrame(autoScrollTick);
};

const onPointerMove = (e) => {
    if (!dragState.active || e.pointerId !== dragState.pointerId) return;
    e.preventDefault();
    dragState.lastClientY = e.clientY;
    updateDragPosition(e.clientY);
};

const endDrag = (e, cancelled = false) => {
    if (!dragState.active || (e && e.pointerId !== dragState.pointerId)) return;
    const { item, list, startIndex } = dragState;

    cancelAnimationFrame(dragState.scrollTimer);
    item.classList.remove('is-dragging');
    list.classList.remove('is-drag-active');

    const newIndex = [...list.querySelectorAll('.equip-reorder-item')].indexOf(item);

    dragState.active = false;
    dragState.pointerId = null;
    dragState.item = null;
    dragState.list = null;

    if (!cancelled && newIndex !== -1 && newIndex !== startIndex) {
        moveItem(startIndex, newIndex);
    }
    // Always re-render so the DOM matches workingList (also resets a cancelled drag)
    renderReorderList();
};

/* ---------- Setup ---------- */

const attachListeners = () => {
    if (listenersAttached) return;
    const modal = document.getElementById(MODAL_ID);
    const list = document.getElementById('equipment-reorder-list');
    if (!modal || !list) return;

    modal.addEventListener('click', (e) => {
        // Click on the backdrop closes without applying
        if (e.target === modal) {
            closeModal();
            return;
        }
        const button = e.target.closest('button');
        if (!button) return;

        if (button.id === 'equipment-reorder-cancel-btn' || button.id === 'equipment-reorder-close-btn') {
            closeModal();
        } else if (button.id === 'equipment-reorder-save-btn') {
            applyAndClose();
        } else if (button.dataset.action === 'move-up' || button.dataset.action === 'move-down') {
            const index = parseInt(button.dataset.index, 10);
            const target = button.dataset.action === 'move-up' ? index - 1 : index + 1;
            moveItem(index, target);
            focusAfterRender = { index: target, action: button.dataset.action };
            renderReorderList();
        }
    });

    list.addEventListener('pointerdown', onPointerDown);
    list.addEventListener('pointermove', onPointerMove);
    list.addEventListener('pointerup', (e) => endDrag(e));
    list.addEventListener('pointercancel', (e) => endDrag(e, true));

    listenersAttached = true;
};

/** Opens the reorder modal for the fighter currently in the Add/Edit Fighter view */
export const showEquipmentReorderModal = () => {
    const current = readEquipmentJson();
    if (current.length < 2) return;

    originalList = current.map(item => ({ ...item }));
    workingList = current.map(item => ({ ...item }));
    lastMovedIndex = null;
    focusAfterRender = null;

    attachListeners();
    renderReorderList();
    displayModal(MODAL_ID);
    document.addEventListener('keydown', handleKeydown);
};
