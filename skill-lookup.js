import { SKILLS } from './data/skills.js';
import { currentWarband } from './state.js';
import { getOriginalName } from './get-original-name.js';
import { HIRED_SWORDS } from './data/hired_swords.js';

/**
 * Checks if a single category string matches a warband name.
 * Uses includes() for substring matching (e.g. "Beastmen Raiders" includes "Beastmen"),
 * but excludes generic parent categories that should not bleed into sub-warbands.
 */
function categoryMatchesWarbandType(category, warbandName) {
    if (Array.isArray(category)) {
        return category.some(cat => categoryMatchesWarbandType(cat, warbandName));
    }
    if (category === 'Skaven' && warbandName !== 'Skaven') return false;
    if (category === 'Night Goblins' && warbandName !== 'Night Goblins') return false;
    return warbandName.includes(category);
}

/**
 * Finds the correct skill for the current warband context when duplicate names exist.
 * 
 * When multiple skills share the same name (e.g., "Netter" for Ogres vs Night Goblins),
 * this function prefers the one whose category matches the given warband type.
 * Falls back to the first match if no category matches (preserving existing behavior).
 * 
 * @param {string} skillName - The skill name to look up
 * @param {string} [warbandType] - The warband type string (defaults to currentWarband.type)
 * @param {object} [fighter] - Optional fighter object, used for Hired Sword lookups
 * @returns {object|undefined} The matching skill object, or undefined if not found
 */
export function findSkillForWarband(skillName, warbandType, fighter) {
    if (!skillName) return undefined;

    // For Hired Swords, match against the hired sword's own category
    if (fighter && fighter.type === 'Hired Sword') {
        const hiredSwordName = getOriginalName(fighter, HIRED_SWORDS);
        const hiredSwordMatch = SKILLS.find(s => s.name === skillName && s.type === 'Hired Sword' && s.category === hiredSwordName);
        if (hiredSwordMatch) return hiredSwordMatch;
    }

    const effectiveWarbandType = warbandType || (currentWarband && currentWarband.type) || '';
    const warbandName = effectiveWarbandType.split(':')[0].trim();

    // Find all skills matching the name
    const matches = SKILLS.filter(s => s.name === skillName);

    if (matches.length === 0) return undefined;
    if (matches.length === 1) return matches[0];

    // Multiple matches — prefer the one whose category matches the warband
    const warbandMatch = matches.find(s => categoryMatchesWarbandType(s.category, warbandName));
    if (warbandMatch) return warbandMatch;

    // Fallback to first match (same as original behavior)
    return matches[0];
}

/**
 * Case-insensitive version of findSkillForWarband.
 * Used in places where the existing code does case-insensitive lookup.
 */
export function findSkillForWarbandCI(skillName, warbandType, fighter) {
    if (!skillName) return undefined;

    const lowerName = skillName.toLowerCase();

    // For Hired Swords, match against the hired sword's own category
    if (fighter && fighter.type === 'Hired Sword') {
        const hiredSwordName = getOriginalName(fighter, HIRED_SWORDS);
        const hiredSwordMatch = SKILLS.find(s => s.name.toLowerCase() === lowerName && s.type === 'Hired Sword' && s.category === hiredSwordName);
        if (hiredSwordMatch) return hiredSwordMatch;
    }

    const effectiveWarbandType = warbandType || (currentWarband && currentWarband.type) || '';
    const warbandName = effectiveWarbandType.split(':')[0].trim();

    const matches = SKILLS.filter(s => s.name.toLowerCase() === lowerName);

    if (matches.length === 0) return undefined;
    if (matches.length === 1) return matches[0];

    const warbandMatch = matches.find(s => categoryMatchesWarbandType(s.category, warbandName));
    if (warbandMatch) return warbandMatch;

    return matches[0];
}
