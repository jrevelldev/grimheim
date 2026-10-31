/**
 * Build Cards Feature Entry Point
 * Wires the "Build Cards" button adjacent to "Change Order" and initializes card builder studio.
 */

import { currentWarband } from '../state.js';
import { openCardBuilderModal } from './card-builder-modal.js';
import { openCardViewerModal } from './card-viewer-modal.js';
import { getBuilderDeck } from './card-deck.js';
import { closeAllDropdowns } from '../utility.js';
import { trackCardBuilderOpen } from '../analytics.js';

/**
 * Opens Card Viewer Carousel from anywhere
 */
export function openCardViewerFromMenu(warband = null) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
    }
    document.body.classList.remove('mobile-menu-open');
    try {
        closeAllDropdowns();
        openCardViewerModal(warband || currentWarband);
    } catch (err) {
        console.error('Failed to open Card Viewer Modal:', err);
    }
}

/**
 * Opens Card Builder Studio from the main navigation (desktop or mobile)
 */
export function openCardBuilderFromMenu(accessType = null) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
    }
    document.body.classList.remove('mobile-menu-open');
    try {
        closeAllDropdowns();
        openCardBuilderModal(getBuilderDeck(), null, { source: 'menu' });
        trackCardBuilderOpen('menu', accessType);
    } catch (err) {
        console.error('Failed to open Card Builder Studio:', err);
    }
}

// Expose globally so inline onclick and event-handlers can invoke directly
if (typeof window !== 'undefined') {
    window.openCardBuilderStudio = openCardBuilderFromMenu;
    window.openCardViewer = openCardViewerFromMenu;
}

export function initCardBuilder() {
    // In-warband roster action button (Studio)
    const buildCardsBtn = document.getElementById('build-cards-btn');
    if (buildCardsBtn) {
        buildCardsBtn.addEventListener('click', () => {
            openCardBuilderModal(currentWarband, null, { source: 'warband' });
            trackCardBuilderOpen('warband', null, {
                warband_type: currentWarband?.type || null
            });
        });
    }

    // In-warband roster action button (Card Viewer Carousel)
    const viewCardsBtn = document.getElementById('view-cards-btn');
    if (viewCardsBtn) {
        viewCardsBtn.addEventListener('click', () => {
            openCardViewerModal(currentWarband);
        });
    }

    // In-battle action button (Card Viewer Carousel)
    const battleViewCardsBtn = document.getElementById('battle-view-cards-btn');
    if (battleViewCardsBtn) {
        battleViewCardsBtn.addEventListener('click', () => {
            openCardViewerModal(currentWarband);
        });
    }

    // Mobile drawer Card Viewer button
    const mobileCardViewerBtn = document.getElementById('mobile-card-viewer-btn');
    if (mobileCardViewerBtn) {
        mobileCardViewerBtn.addEventListener('click', () => {
            openCardViewerFromMenu(currentWarband);
        });
    }

    // Main navigation desktop button
    const navCardBuilderBtn = document.getElementById('card-builder-btn');
    if (navCardBuilderBtn) {
        navCardBuilderBtn.addEventListener('click', () => {
            openCardBuilderFromMenu('desktop');
        });
    }

    // Main navigation mobile drawer button
    const mobileCardBuilderBtn = document.getElementById('mobile-card-builder-btn');
    if (mobileCardBuilderBtn) {
        mobileCardBuilderBtn.addEventListener('click', () => {
            openCardBuilderFromMenu('mobile');
        });
    }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCardBuilder);
} else {
    initCardBuilder();
}
