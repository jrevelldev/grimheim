/**
 * Card Layout Persistence Module
 * Saves and loads customized fighter card layouts from localStorage.
 */

import { DEFAULT_LAYOUTS, AVAILABLE_BLOCKS } from './card-config.js';

const STORAGE_KEY = 'grimheim_fighter_card_layouts';
const LEGACY_STORAGE_KEY = 'rosterheim_fighter_card_layouts';

/**
 * Loads all saved layouts from localStorage
 */
function getAllSavedLayouts() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
        if (raw) {
            return JSON.parse(raw);
        }
    } catch (e) {
        console.warn('Failed to parse card layouts from localStorage:', e);
    }
    return {};
}

function persistSavedLayouts(allSaved) {
    try {
        const str = JSON.stringify(allSaved);
        localStorage.setItem(STORAGE_KEY, str);
        localStorage.setItem(LEGACY_STORAGE_KEY, str);
    } catch (e) {
        console.error('Failed to save card layouts to localStorage:', e);
    }
}

/**
 * Normalizes and merges a saved layout configuration with default blocks and settings.
 * @param {object} saved
 * @param {string} fighterType
 * @returns {object}
 */
function normalizeSavedLayout(saved, fighterType) {
    const defaultLayout = DEFAULT_LAYOUTS[fighterType] || DEFAULT_LAYOUTS['Hero'];
    if (!saved || !Array.isArray(saved.blocks)) {
        return JSON.parse(JSON.stringify(defaultLayout));
    }

    // Filter out any blocks that no longer exist in AVAILABLE_BLOCKS
    const validSavedBlocks = saved.blocks.filter(b => AVAILABLE_BLOCKS[b.id]);
    const savedBlockIds = new Set(validSavedBlocks.map(b => b.id));
    const mergedBlocks = [...validSavedBlocks];

    // Check if any block from defaults is missing from saved
    defaultLayout.blocks.forEach(defaultBlock => {
        if (!savedBlockIds.has(defaultBlock.id)) {
            const defaultIndex = defaultLayout.blocks.findIndex(b => b.id === defaultBlock.id);
            const prevDefaultBlock = defaultIndex > 0 ? defaultLayout.blocks[defaultIndex - 1] : null;
            const insertIdx = prevDefaultBlock
                ? mergedBlocks.findIndex(b => b.id === prevDefaultBlock.id)
                : -1;

            if (insertIdx !== -1) {
                mergedBlocks.splice(insertIdx + 1, 0, JSON.parse(JSON.stringify(defaultBlock)));
            } else {
                mergedBlocks.push(JSON.parse(JSON.stringify(defaultBlock)));
            }
            savedBlockIds.add(defaultBlock.id);
        }
    });

    return {
        cardDensity: saved.cardDensity || defaultLayout.cardDensity || 'normal',
        cardTheme: saved.cardTheme || defaultLayout.cardTheme || 'parchment',
        blocks: mergedBlocks
    };
}

/**
 * Loads the layout configuration for a specific fighter type.
 * Gracefully merges with default settings to ensure new blocks or options are present.
 * @param {string} fighterType - 'Hero' | 'Henchman' | 'Hired Sword' | 'Vehicle' | 'Dramatis Personae'
 * @returns {object} Layout configuration
 */
export function loadLayout(fighterType) {
    const allSaved = getAllSavedLayouts();
    const saved = allSaved[fighterType];
    return normalizeSavedLayout(saved, fighterType);
}

/**
 * Saves a layout configuration for a specific fighter type.
 * @param {string} fighterType
 * @param {object} layoutConfig
 */
export function saveLayout(fighterType, layoutConfig) {
    try {
        const allSaved = getAllSavedLayouts();
        allSaved[fighterType] = layoutConfig;
        persistSavedLayouts(allSaved);
    } catch (e) {
        console.error('Failed to save card layout to localStorage:', e);
    }
}

/**
 * Checks whether a specific fighter has a locked custom layout.
 * @param {string} fighterId
 * @returns {boolean}
 */
export function isFighterLayoutLocked(fighterId) {
    if (!fighterId || fighterId === 'sample' || fighterId === 'blank') return false;
    const allSaved = getAllSavedLayouts();
    return Boolean(allSaved['fighter_' + fighterId]);
}

/**
 * Saves a locked custom layout for a specific fighter.
 * @param {string} fighterId
 * @param {object} layoutConfig
 */
export function saveFighterLayout(fighterId, layoutConfig) {
    if (!fighterId || fighterId === 'sample' || fighterId === 'blank') return;
    try {
        const allSaved = getAllSavedLayouts();
        allSaved['fighter_' + fighterId] = layoutConfig;
        persistSavedLayouts(allSaved);
    } catch (e) {
        console.error('Failed to save fighter card layout to localStorage:', e);
    }
}

/**
 * Unlocks and removes a specific fighter's custom layout, reverting them to their type's layout.
 * @param {string} fighterId
 */
export function unlockFighterLayout(fighterId) {
    if (!fighterId || fighterId === 'sample' || fighterId === 'blank') return;
    try {
        const allSaved = getAllSavedLayouts();
        delete allSaved['fighter_' + fighterId];
        persistSavedLayouts(allSaved);
    } catch (e) {
        console.error('Failed to unlock fighter card layout in localStorage:', e);
    }
}

/**
 * Loads layout for a fighter: if the fighter has a locked layout, returns it; otherwise returns the type layout.
 * @param {string} fighterType
 * @param {string} fighterId
 * @returns {object}
 */
export function loadFighterLayout(fighterType, fighterId) {
    if (fighterId && fighterId !== 'sample' && fighterId !== 'blank') {
        const allSaved = getAllSavedLayouts();
        const saved = allSaved['fighter_' + fighterId];
        if (saved && Array.isArray(saved.blocks)) {
            return normalizeSavedLayout(saved, fighterType);
        }
    }
    return loadLayout(fighterType);
}

/**
 * Resets a fighter type's layout to its default preset.
 * @param {string} fighterType
 * @returns {object} Fresh default layout
 */
export function resetLayout(fighterType) {
    try {
        const allSaved = getAllSavedLayouts();
        delete allSaved[fighterType];
        persistSavedLayouts(allSaved);
    } catch (e) {
        console.error('Failed to reset card layout in localStorage:', e);
    }
    const defaultLayout = DEFAULT_LAYOUTS[fighterType] || DEFAULT_LAYOUTS['Hero'];
    return JSON.parse(JSON.stringify(defaultLayout));
}
