/**
 * Card Builder Drag & Drop and Reordering Logic
 * Enables reordering card blocks both directly on the card preview and via the sidebar block list.
 */

/**
 * Initializes drag-and-drop listeners on the live card preview
 * @param {HTMLElement} cardContainer - The container holding .mordheim-card
 * @param {Function} onReorder - Callback when order changes (fromId, toId, dropBefore, targetPlacement)
 */
export function setupCardPreviewDragDrop(cardContainer, onReorder) {
    if (!cardContainer) return;

    let draggedBlock = null;

    cardContainer.addEventListener('dragstart', (e) => {
        const wrapper = e.target.closest('.card-block-wrapper');
        if (!wrapper) return;

        draggedBlock = wrapper;
        wrapper.classList.add('is-dragging');
        const card = cardContainer.querySelector('.mordheim-card');
        if (card) {
            card.classList.add('is-dragging-card-block');
            if (wrapper.dataset.placement === 'bottom') {
                card.classList.add('is-dragging-bottom-block');
            } else {
                card.classList.add('is-dragging-top-block');
            }
        }
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', wrapper.dataset.blockId);
    });

    cardContainer.addEventListener('dragend', () => {
        if (draggedBlock) {
            draggedBlock.classList.remove('is-dragging');
            draggedBlock = null;
        }
        const card = cardContainer.querySelector('.mordheim-card');
        if (card) {
            card.classList.remove('is-dragging-card-block', 'is-dragging-top-block', 'is-dragging-bottom-block');
        }
        cardContainer.querySelectorAll('.drag-over-above, .drag-over-below, .is-drop-active').forEach(el => {
            el.classList.remove('drag-over-above', 'drag-over-below', 'is-drop-active');
        });
    });

    cardContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        // 1. Direct block wrapper hover (highest priority)
        const targetWrapper = e.target.closest('.card-block-wrapper');
        if (targetWrapper && targetWrapper !== draggedBlock) {
            cardContainer.querySelectorAll('.card-flow-spacer').forEach(s => s.classList.remove('is-drop-active'));

            const rect = targetWrapper.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;

            cardContainer.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
                if (el !== targetWrapper) el.classList.remove('drag-over-above', 'drag-over-below');
            });

            if (e.clientY < midY) {
                targetWrapper.classList.add('drag-over-above');
                targetWrapper.classList.remove('drag-over-below');
            } else {
                targetWrapper.classList.add('drag-over-below');
                targetWrapper.classList.remove('drag-over-above');
            }
            return;
        }

        // 2. Middle/bottom spacer hover (only for top blocks being moved down)
        const spacer = e.target.closest('.card-flow-spacer');
        if (spacer) {
            cardContainer.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
                el.classList.remove('drag-over-above', 'drag-over-below');
            });
            if (draggedBlock && draggedBlock.dataset.placement !== 'bottom') {
                spacer.classList.add('is-drop-active');
            }
            return;
        }

        // Neither: clear highlights
        cardContainer.querySelectorAll('.drag-over-above, .drag-over-below, .is-drop-active').forEach(el => {
            el.classList.remove('drag-over-above', 'drag-over-below', 'is-drop-active');
        });
    });

    cardContainer.addEventListener('dragleave', (e) => {
        const targetWrapper = e.target.closest('.card-block-wrapper');
        if (targetWrapper && !targetWrapper.contains(e.relatedTarget)) {
            targetWrapper.classList.remove('drag-over-above', 'drag-over-below');
        }
        const spacer = e.target.closest('.card-flow-spacer');
        if (spacer && !spacer.contains(e.relatedTarget)) {
            spacer.classList.remove('is-drop-active');
        }
    });

    cardContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!draggedBlock) return;

        const fromId = draggedBlock.dataset.blockId;

        // 1. Dropped directly onto a block wrapper (highest priority)
        const targetWrapper = e.target.closest('.card-block-wrapper');
        if (targetWrapper && targetWrapper !== draggedBlock) {
            const toId = targetWrapper.dataset.blockId;
            const targetPlacement = targetWrapper.dataset.placement || 'top';
            const rect = targetWrapper.getBoundingClientRect();
            const dropBefore = e.clientY < (rect.top + rect.height / 2);

            if (typeof onReorder === 'function') {
                onReorder(fromId, toId, dropBefore, targetPlacement);
            }
            return;
        }

        // 2. Dropped onto the middle/bottom spacer -> moves to bottom area (only for top blocks)
        const spacer = e.target.closest('.card-flow-spacer');
        if (spacer) {
            if (draggedBlock && draggedBlock.dataset.placement !== 'bottom') {
                if (typeof onReorder === 'function') {
                    onReorder(fromId, null, false, 'bottom');
                }
            }
            return;
        }

        // 3. Dropped in top flow area
        const topZone = e.target.closest('.card-flow-top');
        if (topZone) {
            if (typeof onReorder === 'function') {
                onReorder(fromId, null, false, 'top');
            }
            return;
        }

        // 4. Dropped in bottom flow area
        const bottomZone = e.target.closest('.card-flow-bottom');
        if (bottomZone) {
            if (typeof onReorder === 'function') {
                onReorder(fromId, null, false, 'bottom');
            }
            return;
        }
    });
}

/**
 * Initializes drag-and-drop on the sidebar block list
 * @param {HTMLElement} listContainer - The container holding .card-config-item
 * @param {Function} onReorder - Callback when order changes (fromId, toId, dropBefore)
 */
export function setupSidebarListDragDrop(listContainer, onReorder) {
    if (!listContainer) return;

    let draggedItem = null;

    listContainer.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.card-config-item');
        if (!item) return;

        draggedItem = item;
        item.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item.dataset.blockId);
    });

    listContainer.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('is-dragging');
            draggedItem = null;
        }
        listContainer.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
            el.classList.remove('drag-over-above', 'drag-over-below');
        });
    });

    listContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const targetItem = e.target.closest('.card-config-item');
        if (!targetItem || targetItem === draggedItem) return;

        const rect = targetItem.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;

        listContainer.querySelectorAll('.drag-over-above, .drag-over-below').forEach(el => {
            if (el !== targetItem) el.classList.remove('drag-over-above', 'drag-over-below');
        });

        if (e.clientY < midY) {
            targetItem.classList.add('drag-over-above');
            targetItem.classList.remove('drag-over-below');
        } else {
            targetItem.classList.add('drag-over-below');
            targetItem.classList.remove('drag-over-above');
        }
    });

    listContainer.addEventListener('dragleave', (e) => {
        const targetItem = e.target.closest('.card-config-item');
        if (targetItem && !targetItem.contains(e.relatedTarget)) {
            targetItem.classList.remove('drag-over-above', 'drag-over-below');
        }
    });

    listContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetItem = e.target.closest('.card-config-item');
        if (!targetItem || !draggedItem || targetItem === draggedItem) return;

        const fromId = draggedItem.dataset.blockId;
        const toId = targetItem.dataset.blockId;
        const rect = targetItem.getBoundingClientRect();
        const dropBefore = e.clientY < (rect.top + rect.height / 2);

        if (typeof onReorder === 'function') {
            onReorder(fromId, toId, dropBefore);
        }
    });
}
