import { BanditryHandler } from './banditry-handler.js';
import { WilyThiefHandler } from './wily-thief-handler.js';
import { currentWarband } from '../../state.js';
import { endBattleState } from '../end-battle-state.js';

// ═══════════════════════════════════════════════════════════════════════════════
// Special Skills Registry
// ═══════════════════════════════════════════════════════════════════════════════
// To add a new post-game special skill:
//   1. Create a new handler file in this directory (e.g., my-skill-handler.js)
//   2. Import it here and add it to the SPECIAL_SKILL_HANDLERS array
//   3. No other files need to change
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Registry of all special skill handlers.
 * Each handler must implement: detect, render, isComplete, getSummaryHtml
 */
export const SPECIAL_SKILL_HANDLERS = [
    BanditryHandler,
    WilyThiefHandler,
];

/**
 * Returns applicable specials for the current warband.
 * @returns {Array<{ handler, fighters }>} — Only handlers where at least one fighter qualifies
 */
export function getApplicableSpecials(warband) {
    const wb = warband || currentWarband;
    if (!wb) return [];

    return SPECIAL_SKILL_HANDLERS
        .map(handler => ({
            handler,
            fighters: handler.detect(wb)
        }))
        .filter(entry => entry.fighters.length > 0);
}

/**
 * Checks if all applicable specials have been fully resolved.
 * Returns true if there are no specials or all are complete.
 */
export function areAllSpecialsComplete(warband) {
    const applicable = getApplicableSpecials(warband);
    if (applicable.length === 0) return true;
    return applicable.every(({ handler, fighters }) => handler.isComplete(fighters));
}

/**
 * Aggregates summary HTML from all applicable special handlers.
 * Returns empty string if no specials apply.
 */
export function getSpecialsSummaryHtml(warband) {
    const applicable = getApplicableSpecials(warband);
    if (applicable.length === 0) return '';

    return applicable
        .map(({ handler, fighters }) => handler.getSummaryHtml(fighters))
        .filter(html => html.length > 0)
        .join('');
}
