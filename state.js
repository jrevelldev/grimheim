// Global state
export let useLocalStorage = true;
export let userId = 'local';
export const APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

export let currentWarband = null;
export let warbands = [];

// Temporary state for modals
export let tempItemToRemove = null;
export let tempItemToRetrieve = null; 
export let tempItemToAdd = null;
export let tempHiredSwordToAdd = null; // For hired sword variable cost calculation
export let currentFighterBaseStats = {};
export let currentFighterMultiStats = null; // For vehicles/multi-stat-line fighters

// Global House Rule State
export let isShieldMeleeIgnored = false;
export let isBlackpowderPreGameDiscountActive = false;
export let isLuckyItemsLimited = false;
export let isUniversalHiringAccessActive = false;
export let isExcludeStartingXpFromRatingActive = false;
export let isFullyPaintedActive = false;
export let isIgnoreRacialMaximumsActive = false;
export let isBlackpowder20PercentDiscountActive = false;
export let isArmourShieldHalfCostActive = false;

// Equipment filter for new fighter modal
export let availableEquipmentFilterIds = null; // Initialize as null to indicate no filter initially

export function setUseLocalStorage(value) {
    useLocalStorage = value;
}

export function setUserId(value) {
    userId = value;
}

export function setCurrentWarband(value) {
    currentWarband = value;
}

export function setWarbands(value) {
    warbands = value;
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('grimheim:warbands-updated', { detail: value }));
        window.dispatchEvent(new CustomEvent('rosterheim:warbands-updated', { detail: value }));
    }
}

export function getWarbands() {
    return warbands;
}

export function setTempItemToRemove(value) {
    tempItemToRemove = value;
}

export function setTempItemToRetrieve(value) {
    tempItemToRetrieve = value;
}

export function setTempItemToAdd(value) {
    tempItemToAdd = value;
}

export function setTempHiredSwordToAdd(value) {
    tempHiredSwordToAdd = value;
}

export function setCurrentFighterBaseStats(value) {
    currentFighterBaseStats = value;
}

export function setIsShieldMeleeIgnored(value) {
    isShieldMeleeIgnored = value;
}

export function setIsBlackpowderPreGameDiscountActive(value) {
    isBlackpowderPreGameDiscountActive = value;
}

export function getIsBlackpowderPreGameDiscountActive() {
    return isBlackpowderPreGameDiscountActive;
}

export function setIsLuckyItemsLimited(value) {
    isLuckyItemsLimited = value;
}

export function setIsUniversalHiringAccessActive(value) {
    isUniversalHiringAccessActive = value;
}

export function setIsExcludeStartingXpFromRatingActive(value) {
    isExcludeStartingXpFromRatingActive = value;
}

export function setIsFullyPaintedActive(value) {
    isFullyPaintedActive = value;
}

export function setIsIgnoreRacialMaximumsActive(value) {
    isIgnoreRacialMaximumsActive = value;
}

export function setIsBlackpowder20PercentDiscountActive(value) {
    isBlackpowder20PercentDiscountActive = value;
}

export function getIsBlackpowder20PercentDiscountActive() {
    return isBlackpowder20PercentDiscountActive;
}

export function setIsArmourShieldHalfCostActive(value) {
    isArmourShieldHalfCostActive = value;
}

export function getIsArmourShieldHalfCostActive() {
    return isArmourShieldHalfCostActive;
}

export function setAvailableEquipmentFilterIds(newFilter) {
    availableEquipmentFilterIds = newFilter;
}

export function getAvailableEquipmentFilterIds() {
    return availableEquipmentFilterIds;
}

export function setCurrentFighterMultiStats(value) {
    currentFighterMultiStats = value;
}

export function setAvailableSkillCategories(value) {
    currentFighterAvailableSkillCategories = value;
}

export function getAvailableSkillCategories() {
    return currentFighterAvailableSkillCategories;
}

export function setIsOrderingMode(value) {
    isOrderingMode = value;
}

export function getIsOrderingMode() {
    return isOrderingMode;
}

// Global state for current fighter's available skill categories
export let currentFighterAvailableSkillCategories = [];

// Base skill categories for the current fighter (from promotion/warband data, NOT equipment)
let baseSkillCategories = [];

export function setBaseSkillCategories(value) {
    baseSkillCategories = value;
}

export function getBaseSkillCategories() {
    return baseSkillCategories;
}

// Skill categories restricted by equipment (e.g., White Lion restricts Shooting)
let restrictedSkillCategories = [];

export function setRestrictedSkillCategories(value) {
    restrictedSkillCategories = value;
}

export function getRestrictedSkillCategories() {
    return restrictedSkillCategories;
}

// Ordering mode for fighter roster
export let isOrderingMode = false;
