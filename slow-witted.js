// Import required constants at the top
import { STANDARD_XP_THRESHOLDS, HERO_XP_THRESHOLDS } from './config.js';

/**
 * Slow Witted Logic Module
 * 
 * This module centralizes all Slow Witted special rule functionality.
 * Fighters with the Slow Witted rule gain XP at half the normal rate:
 * - Each advancement grants 0.5 XP instead of 1 XP
 * - Uses the same advancement thresholds as normal fighters
 * - Displays fractional XP values (e.g., 2.5, 3.0, 3.5)
 */

/**
 * Checks if a fighter has the Slow Witted special rule
 * @param {Object} fighter - The fighter object
 * @returns {boolean} True if fighter has Slow Witted rule
 */
export function isSlowWitted(fighter) {
    if (!fighter || !fighter.special_rules) {
        return false;
    }
    
    // Handle both string and array formats for special_rules
    const rules = Array.isArray(fighter.special_rules) 
        ? fighter.special_rules 
        : fighter.special_rules.split(';').map(r => r.trim());
    
    return rules.some(rule => rule && rule.toLowerCase() === 'slow witted');
}

/**
 * Checks if a fighter has the Elemental special rule
 * @param {Object} fighter - The fighter object
 * @returns {boolean} True if fighter has Elemental rule
 */
export function isElemental(fighter) {
    if (!fighter || !fighter.special_rules) {
        return false;
    }
    
    // Handle both string and array formats for special_rules
    const rules = Array.isArray(fighter.special_rules) 
        ? fighter.special_rules 
        : fighter.special_rules.split(';').map(r => r.trim());
    
    return rules.some(rule => rule && rule.toLowerCase() === 'elemental');
}

/**
 * Checks if a fighter has any special rule that grants half XP rate
 * @param {Object} fighter - The fighter object
 * @returns {boolean} True if fighter has Slow Witted or Elemental rules
 */
export function hasHalfXPRate(fighter) {
    return isSlowWitted(fighter) || isElemental(fighter);
}

/**
 * Gets the XP increment amount for a fighter
 * @param {Object} fighter - The fighter object
 * @returns {number} XP increment (0.5 for Slow Witted/Elemental, 1.0 for others)
 */
export function getXPIncrement(fighter) {
    return hasHalfXPRate(fighter) ? 0.5 : 1.0;
}


/**
 * Formats XP value for display, showing fractional values appropriately
 * @param {number} xp - The XP value
 * @returns {string} Formatted XP string
 */
export function formatXPDisplay(xp) {
    if (typeof xp !== 'number') {
        return '0';
    }
    
    // If the value is a whole number, display without decimal
    if (Number.isInteger(xp)) {
        return xp.toString();
    }
    
    // For fractional values, show one decimal place
    return xp.toFixed(1);
}

/**
 * Applies Slow Witted logic when adding XP to a fighter
 * @param {Object} fighter - The fighter object
 * @param {number} xpAmount - The base XP amount to add
 * @returns {number} The actual XP to add (0.5x for Slow Witted)
 */
export function applySlowWittedLogic(fighter, xpAmount) {
    const increment = getXPIncrement(fighter);
    return xpAmount * increment;
}

/**
 * Calculates the effective XP for advancement threshold checking
 * For Slow Witted fighters, this converts their displayed XP back to equivalent standard XP
 * @param {Object} fighter - The fighter object
 * @param {number} currentXP - The current displayed XP
 * @returns {number} Effective XP for threshold comparison
 */
export function getEffectiveXPForThresholds(fighter, currentXP) {
    // Both Slow Witted and Elemental fighters use standard XP thresholds,
    // but because they accumulate XP at a 0.5 rate, they naturally reach
    // those thresholds half as fast. Therefore, we compare their current XP
    // directly without doubling.
    return currentXP;
}

/**
 * Gets the appropriate XP thresholds for a fighter
 * Slow Witted fighters use the same thresholds but reach them at half the displayed XP
 * @param {Object} fighter - The fighter object
 * @returns {Array<number>} The XP thresholds array
 */
export function getXPThresholds(fighter) {
    // Return appropriate thresholds based on fighter type
    if (fighter && fighter.type === 'Hero') {
        return HERO_XP_THRESHOLDS;
    }
    return STANDARD_XP_THRESHOLDS;
}

/**
 * Checks if a fighter has earned a new advancement
 * @param {Object} fighter - The fighter object
 * @param {number} currentXP - The current XP value
 * @returns {boolean} True if a new advancement is earned
 */
export function hasEarnedAdvancement(fighter, currentXP) {
    const thresholds = getXPThresholds(fighter);
    const effectiveXP = getEffectiveXPForThresholds(fighter, currentXP);
    
    // Check if the effective XP meets or exceeds any threshold
    return thresholds.some(threshold => effectiveXP >= threshold);
}

/**
 * Gets the number of advancements a fighter has earned
 * @param {Object} fighter - The fighter object  
 * @param {number} currentXP - The current XP value
 * @returns {number} Number of advancements earned
 */
export function getAdvancementsEarned(fighter, currentXP) {
    const thresholds = getXPThresholds(fighter);
    const effectiveXP = getEffectiveXPForThresholds(fighter, currentXP);
    
    return thresholds.filter(threshold => effectiveXP >= threshold).length;
}

/**
 * Validates that a fighter's XP is consistent with their Slow Witted status
 * @param {Object} fighter - The fighter object
 * @returns {boolean} True if XP is valid for the fighter's status
 */
export function validateFighterXP(fighter) {
    if (!fighter || typeof fighter.xp !== 'number') {
        return true; // Can't validate without proper data
    }
    
    if (hasHalfXPRate(fighter)) {
        // For half XP rate fighters, XP should be in 0.5 increments
        // This means XP * 2 should be an integer
        return Number.isInteger(fighter.xp * 2);
    }
    
    // For normal fighters, XP should be whole numbers
    return Number.isInteger(fighter.xp);
}
