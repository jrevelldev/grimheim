import { currentWarband } from '../state.js';
import { getWarbandData } from '../utility.js';
import { SPECIAL_RULES_DETAILS } from '../data/index.js';
import { STATS_FIELDS } from '../config.js';

// ═══════════════════════════════════════════════════════════════════════════════
// Demi-Vampire Replacement Handler
// ═══════════════════════════════════════════════════════════════════════════════
// When the Lahmia Vampire is killed/removed, the Blood Sister (who has the
// Demi-Vampires special rule) may transform into a vampire at her next advance.
// This module provides detection, blocker checks, and transformation logic.
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Checks if a fighter has the Demi-Vampires special rule.
 * @param {Object} fighter - The fighter to check
 * @returns {boolean}
 */
export function hasDemiVampireRule(fighter) {
    if (!fighter || !fighter.special_rules) return false;
    const rules = typeof fighter.special_rules === 'string'
        ? fighter.special_rules.split(';').map(r => r.trim())
        : (Array.isArray(fighter.special_rules) ? fighter.special_rules : []);
    return rules.some(rule => rule === 'Demi-Vampires');
}

/**
 * Returns an array of reason strings explaining why the Demi-Vampire Replacement
 * option is blocked. Returns an empty array if the option is available.
 * @param {string} [currentFighterId] - The ID of the fighter being checked (excluded from leader check)
 * @returns {string[]}
 */
export function getDemiVampireBlockers(currentFighterId) {
    const blockers = [];
    if (!currentWarband || !currentWarband.members) return blockers;

    // Check 1: Is a Lahmia Vampire still in the warband?
    const hasLahmiaVampire = currentWarband.members.some(f =>
        (f.warrior_choice || f.name) === 'Lahmia Vampire'
    );
    if (hasLahmiaVampire) {
        blockers.push('El tipo de guerrero Vampira Lahmia todavía está en la lista de la banda');
    }

    // Check 2: Does another fighter already have the Leader rule?
    const existingLeader = currentWarband.members.find(f =>
        f.id !== currentFighterId &&
        f.special_rules &&
        f.special_rules.includes('Leader')
    );
    if (existingLeader) {
        blockers.push(`Otro guerrero (${existingLeader.name}) ya está asignado como Líder de la banda`);
    }

    return blockers;
}

/**
 * Fetches the Lahmia Vampire warrior definition from the warband data.
 * @returns {Object|null} The Lahmia Vampire warrior data, or null if not found
 */
export function getLahmiaVampireData() {
    const warbandData = getWarbandData('Lahmian');
    if (!warbandData || !warbandData.warriors) return null;
    return warbandData.warriors.find(w => w.name === 'Lahmia Vampire') || null;
}

/**
 * Fetches the Demi-Vampires rule text from SPECIAL_RULES_DETAILS.
 * @returns {string} The rule text
 */
export function getDemiVampireRuleText() {
    const rule = SPECIAL_RULES_DETAILS.find(r => r.name === 'Demi-Vampires');
    return rule ? rule.rules : '';
}

/**
 * Parses the fighter's advancements array to extract stat increases earned
 * via advancement only (not equipment). Hero stat advancements are stored
 * as "+1 WS", "+1 S", etc.
 * @param {Object} fighter - The fighter whose advancements to parse
 * @returns {Object} Stat deltas, e.g. { WS: 1, S: 2 }
 */
function getAdvancementStatDeltas(fighter) {
    const deltas = {};
    const advancements = fighter.advancements || [];

    advancements.forEach(adv => {
        // Match hero-style advancement entries like "+1 WS", "+1 S", etc.
        const match = adv.match(/^\+1\s+(.+)$/);
        if (match) {
            const stat = match[1].trim();
            if (STATS_FIELDS.includes(stat)) {
                deltas[stat] = (deltas[stat] || 0) + 1;
            }
        }
    });

    return deltas;
}

/**
 * Builds the full transformation data for a Demi-Vampire Replacement.
 * @param {Object} fighter - The Blood Sister fighter being transformed
 * @returns {Object|null} The transformation data, or null if Lahmia Vampire data not found
 */
export function buildDemiVampireTransformation(fighter) {
    const vampireData = getLahmiaVampireData();
    if (!vampireData) return null;

    const vampireBaseStats = { ...vampireData.stats };
    const earnedDeltas = getAdvancementStatDeltas(fighter);

    // New stats = Lahmia Vampire base stats + earned advancement deltas
    const newStats = { ...vampireBaseStats };
    STATS_FIELDS.forEach(stat => {
        if (earnedDeltas[stat]) {
            newStats[stat] = (newStats[stat] || 0) + earnedDeltas[stat];
        }
    });

    return {
        newStats,
        newBaseStats: { ...vampireBaseStats },
        newSpecialRules: vampireData.rules,  // "Leader; Fear; Immune to Psychology; Immune to Poison; No Pain; Local Knowledge"
        newRace: vampireData.race,           // "Vampire"
        newWarriorChoice: 'Lahmia Vampire'
    };
}
