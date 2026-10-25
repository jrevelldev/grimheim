import { MASTER_EQUIPMENT_LIST, RACIAL_MAXIMUMS, WARBANDS, DRAMATIS_PERSONAE, SPECIAL_RULES_DETAILS, SKILLS } from './data/index.js';
import { STATS_FIELDS, HERO_XP_THRESHOLDS, STANDARD_XP_THRESHOLDS } from './config.js';
import { calculateEquipmentCost, countItemInStorage, calculateArmorSave, saveHouseRuleState, checkGroupRetrievalConstraint, displayModal } from './utility.js'; // Updated import
import { toggleGroupSize, updateGroupSizeDisplay, renderRacialMaximums, renderStatInputs, renderRaceOptions, populateWarriorChoices, updateFighterDataFromSelection, populateDramatisPersonaeChoices, updateFighterDataFromDramatisPersonaeSelection } from './ui.js';
import { renderEquipmentSelector, renderEquipmentOptions, renderSelectedEquipment, updateStatModifiers, updateSellPrice, renderStorageEquipmentOptions, showRetrieveModal, renderArmorSave } from './equipment-management.js';
import { 
    tempItemToRemove,
    tempItemToRetrieve,
    tempItemToAdd,
    currentFighterBaseStats,
    setTempItemToRemove,
    setTempItemToRetrieve,
    setTempItemToAdd,
    setCurrentFighterBaseStats
} from './state.js';
import { setupEventListeners } from './event-handlers.js';

// --- App Initialization ---
