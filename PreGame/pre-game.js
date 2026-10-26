/**
 * Pre-Game Build Phase UI module
 * Handles conditional UI sections shown during the pre-game build phase,
 * such as warband-specific dropdowns (e.g., Aristocracy of the Night for Undead).
 * 
 * Designed to be easily extended with future warband-specific pre-game options.
 */

import { saveWarband } from '../warband-service.js';
import { showMessage } from '../utility.js';
import { showAristocracyModal } from './aristocracy-modal.js';

/**
 * Configuration for warband-specific pre-game sections.
 * Add new entries here to support additional warband types in the future.
 */
const PRE_GAME_SECTIONS = [
    {
        warbandType: 'Undead',
        sectionId: 'pre-game-aristocracy-section',
        selectId: 'pre-game-aristocracy-select',
        displayId: 'aristocracy-display',
        displayTextClass: 'aristocracy-text',
        field: 'aristocracy',
        label: 'Aristocracia de la Noche'
    },
    {
        warbandType: 'Lahmian',
        sectionId: 'pre-game-location-section',
        selectId: 'pre-game-location-select',
        displayId: null,
        field: 'location',
        label: 'Localización',
        alwaysVisible: true,
        defaultValue: 'Foreign'
    }
];

/**
 * Bloodline → special rules mapping.
 * Each bloodline lists rules to assign to Vampire fighters, and optionally to other races.
 * Rule names must match entries in SPECIAL_RULES_DETAILS (special_rules.js).
 */
const BLOODLINE_SPECIAL_RULES = {
    'Blood Dragon': {
        vampire: ['Martial Prowess', 'Eternally Brave', 'Honour', 'Warrior Code', 'Men-at-arms'],
        dreg: ['Men-at-arms']
    },
    'Necrarchs': {
        vampire: ['Necrarchs Poor warrior', 'Necromantic Lore', 'Loathes the Living', 'Necromancy'],
        dreg: []
    },
    'Lahmia': {
        vampire: ['Lahmia Poor warrior', 'Enchanting Beauty', 'Unnatural Speed'],
        dreg: []
    },
    'Strigoi': {
        vampire: ['Strigoi Bestial', 'Strigoi Hatred', 'Feared', 'Ghoul King'],
        dreg: []
    }
};

/**
 * Flat set of ALL bloodline-managed rule names (across all bloodlines).
 * Used to cleanly strip old rules when switching bloodlines.
 */
const ALL_BLOODLINE_RULES = new Set(
    Object.values(BLOODLINE_SPECIAL_RULES).flatMap(b => [...b.vampire, ...b.dreg])
);

/**
 * Applies (or removes) bloodline special rules to warband fighters.
 * Called when the Aristocracy dropdown changes or on warband load.
 *
 * @param {Object} warband - The current warband object
 * @param {string} bloodline - The selected bloodline key ('None', 'Blood Dragon', etc.)
 */
function applyBloodlineRules(warband, bloodline) {
    if (!warband || !warband.members || warband.type !== 'Undead') return;

    const bloodlineData = BLOODLINE_SPECIAL_RULES[bloodline] || null;

    warband.members.forEach(fighter => {
        // Auto-heal Necromancer if Necromancy rule was stripped
        const warriorType = fighter.warrior_choice || fighter.name;
        if (warriorType === 'Necromancer') {
            let existingRules = fighter.special_rules
                ? fighter.special_rules.split(';').map(r => r.trim()).filter(Boolean)
                : [];
            if (!existingRules.includes('Necromancy')) {
                existingRules.push('Necromancy');
                fighter.special_rules = existingRules.join('; ');
            }
        }

        if (!fighter.race) return;

        // Determine which rules this fighter should receive based on race
        let rulesToAdd = [];
        const raceLC = fighter.race.toLowerCase();

        const isVamp = raceLC === 'vampire' || raceLC === 'necrarch vampire';
        const isDreg = fighter.race === 'Human' && isUndeadDreg(fighter);

        if (isVamp) {
            rulesToAdd = bloodlineData ? bloodlineData.vampire : [];
        } else if (isDreg) {
            rulesToAdd = bloodlineData ? bloodlineData.dreg : [];
        } else {
            // Not a Vampire or Dreg — skip stripping or modifying bloodline rules
            return;
        }

        // Parse existing rules
        let existingRules = [];
        if (fighter.special_rules) {
            existingRules = fighter.special_rules
                .split(';')
                .map(r => r.trim())
                .filter(Boolean);
        }

        // Remove all bloodline-managed rules
        const cleaned = existingRules.filter(r => !ALL_BLOODLINE_RULES.has(r));

        // Add the new bloodline's rules (avoid duplicates)
        rulesToAdd.forEach(rule => {
            if (!cleaned.includes(rule)) {
                cleaned.push(rule);
            }
        });

        // Reconstruct special_rules string
        fighter.special_rules = cleaned.join('; ') || undefined;
    });
}

/**
 * Checks whether a fighter is an Undead Dreg (hero named "Dregs" or warrior_choice "Dregs").
 */
function isUndeadDreg(fighter) {
    const wc = (fighter.warrior_choice || fighter.name || '').toLowerCase();
    return wc === 'dregs';
}

/**
 * Initializes the Pre-Game Build Phase UI for the current warband.
 * Shows or hides warband-specific sections based on warband type and pre-game status.
 * Also ensures bloodline rules are applied consistently on load.
 * 
 * @param {Object} currentWarband - The current warband object
 * @param {Object} warbandData - The static warband data from WARBANDS
 */
export function initPreGameUI(currentWarband, warbandData) {
    if (!currentWarband) return;

    const isPreGame = currentWarband.pre_game !== false;

    PRE_GAME_SECTIONS.forEach(section => {
        const sectionEl = document.getElementById(section.sectionId);
        const selectEl = document.getElementById(section.selectId);
        const displayEl = document.getElementById(section.displayId);

        if (!sectionEl || !selectEl) return;

        const isMatchingWarband = currentWarband.type === section.warbandType;
        const defaultVal = section.defaultValue || 'None';

        if (isMatchingWarband && (isPreGame || section.alwaysVisible)) {
            // Show the dropdown (always for alwaysVisible sections, otherwise only in pre-game)
            sectionEl.classList.remove('hidden');
            // Set the current value
            selectEl.value = currentWarband[section.field] || defaultVal;
        } else {
            // Hide the dropdown
            sectionEl.classList.add('hidden');
        }

        // Handle the header display (shown when NOT in pre-game, like alignment)
        // Skipped for alwaysVisible sections since the dropdown itself is always shown
        if (displayEl) {
            if (isMatchingWarband && !isPreGame && !section.alwaysVisible) {
                displayEl.classList.remove('hidden');
                const textClass = section.displayTextClass || 'aristocracy-text';
                const textEl = displayEl.querySelector('.' + textClass);
                if (textEl) {
                    textEl.textContent = currentWarband[section.field] || defaultVal;
                }
            } else {
                displayEl.classList.add('hidden');
            }
        }
    });

    // Ensure bloodline rules are applied consistently on warband load
    if (currentWarband.type === 'Undead') {
        applyBloodlineRules(currentWarband, currentWarband.aristocracy || 'None');
    }
}

/**
 * Sets up event listeners for Pre-Game Build Phase warband-specific controls.
 * Should be called once during app initialization.
 * 
 * @param {Object} currentWarbandRef - Reference to get the current warband (imported from state)
 */
export function setupPreGameEventListeners(currentWarbandRef) {
    PRE_GAME_SECTIONS.forEach(section => {
        const selectEl = document.getElementById(section.selectId);
        if (!selectEl) return;

        selectEl.addEventListener('change', async (e) => {
            const currentWarband = currentWarbandRef();
            if (!currentWarband) return;

            const newValue = e.target.value;
            if (currentWarband[section.field] !== newValue) {
                currentWarband[section.field] = newValue;

                // Apply bloodline special rules to Vampire and Dreg fighters
                if (section.field === 'aristocracy') {
                    applyBloodlineRules(currentWarband, newValue);
                }

                await saveWarband();

                // Update the header display text as well
                if (section.displayId) {
                    const displayEl = document.getElementById(section.displayId);
                    if (displayEl) {
                        const textClass = section.displayTextClass || 'aristocracy-text';
                        const textEl = displayEl.querySelector('.' + textClass);
                        if (textEl) {
                            textEl.textContent = newValue;
                        }
                    }
                }

                showMessage(`${section.label} cambiado a ${newValue}.`, 'success');
            }
        });
    });

    // Setup click listener for Aristocracy modal links
    const aristocracyInfoLink = document.getElementById('aristocracy-info-link');
    const aristocracyHeaderInfoLink = document.getElementById('aristocracy-header-info-link');
    const aristocracyHeaderTextLink = document.getElementById('aristocracy-header-text-link');

    const handleAristocracyClick = (e) => {
        e.preventDefault();
        const currentWarband = currentWarbandRef();
        const selection = currentWarband ? currentWarband.aristocracy : 'None';
        showAristocracyModal(selection);
    };

    if (aristocracyInfoLink) {
        aristocracyInfoLink.addEventListener('click', handleAristocracyClick);
    }
    if (aristocracyHeaderInfoLink) {
        aristocracyHeaderInfoLink.addEventListener('click', handleAristocracyClick);
    }
    if (aristocracyHeaderTextLink) {
        aristocracyHeaderTextLink.addEventListener('click', handleAristocracyClick);
    }
}
