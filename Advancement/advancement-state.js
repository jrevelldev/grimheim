import { currentWarband } from '../state.js';
import { saveWarband } from '../warband-service.js';
import { HERO_XP_THRESHOLDS, STANDARD_XP_THRESHOLDS, STATS_FIELDS } from '../config.js';
import { hideModal, showMessage, showEditorView, getWarbandData, getWarriorSkills, generateUUID, getOriginalName, normalizeEquipment, serializeEquipment, isV2Warband } from '../utility.js';
import { renderWarbandEditor } from '../ui.js';
import { isSlowWitted, getXPIncrement, formatXPDisplay, getEffectiveXPForThresholds, getAdvancementsEarned } from '../slow-witted.js';
import { SKILLS, SPECIAL_RULES_DETAILS, HIRED_SWORDS, MASTER_EQUIPMENT_LIST } from '../data/index.js';
import { findSkillForWarband } from '../skill-lookup.js';
import { checkFighterHasMagicRule, getMagicGroupForFighter, getSpellsForGroup, MAGIC } from '../spell-management.js';
import { getAvailableSkillCategories, getRestrictedSkillCategories } from '../state.js';
import { handleChosenOfChaosSkillChange } from '../equiprules/marauders-of-chaos.js';
import { filterLizardmenSkillsByRace } from '../equiprules/lizardmen.js';
import { buildDemiVampireTransformation } from './demi-vampire-handler.js';
import { recordEquipmentPurchase } from '../Treasury/ledger.js';

// ─── Central Advancement State ──────────────────────────────────────────────
const advancementState = {
    // Map of fighterId -> { xpChange, statChanges, skillsAdded, spellsAdded, ladsGotTalent }
    fighterChanges: new Map(),
    // Currently selected fighter in the detail view
    selectedFighterId: null
};

// ─── Reset ──────────────────────────────────────────────────────────────────
export function resetAdvancementState() {
    advancementState.fighterChanges.clear();
    advancementState.selectedFighterId = null;
}

// ─── Getters ────────────────────────────────────────────────────────────────
export function getAdvancementState() {
    return advancementState;
}

export function getSelectedFighterId() {
    return advancementState.selectedFighterId;
}

export function setSelectedFighterId(id) {
    advancementState.selectedFighterId = id;
}

export function getFighterChanges(fighterId) {
    if (!advancementState.fighterChanges.has(fighterId)) {
        advancementState.fighterChanges.set(fighterId, {
            xpChange: 0,
            statChanges: {},    // { stat: amount }
            skillsAdded: [],    // [ skillName ]
            spellsAdded: [],    // [ spellName ]
            ladsGotTalent: null, // { selectedCategories: [] } or null
            demiVampireReplacement: null, // transformation data or null
            maneaterBonusSkill: null, // { maneaterSkillName, bonusSkillName } or null — tracks coupled Maneater + bonus skill
            bigBullyBonusSkill: null, // { parentSkillName, bonusSkillName } or null — tracks coupled Big Bully + bonus Strength skill
            pupilOfNagashSpell: null, // { skillName, spellName } or null — tracks coupled Pupil of Nagash + first spell
            darkArtsSpell: null, // { skillName, spellName } or null — tracks coupled Dark Arts + first spell
            nobleBloodSpell: null, // { skillName, spellName } or null — tracks coupled Nehekhara's Noble Blood + free spell
            twistkinEquipment: null // { equipmentId, equipmentName, cost } or null — tracks Twistkin mutation purchase at half cost
        });
    }
    return advancementState.fighterChanges.get(fighterId);
}

// ─── Fighter Helpers ────────────────────────────────────────────────────────

/** Checks if a fighter has the "Do not gain experience" special rule */
export function fighterCanGainExperience(fighter) {
    if (!fighter || !fighter.special_rules) return true;
    const rules = typeof fighter.special_rules === 'string'
        ? fighter.special_rules.split(';').map(r => r.trim())
        : (Array.isArray(fighter.special_rules) ? fighter.special_rules : []);
    const hasNoExpRule = rules.some(rule => rule.toLowerCase().includes('do not gain experience'));
    if (!hasNoExpRule) return true;

    // Apt Revitalist override: Zombie(MH) fighters can gain XP if any warband member has the skill
    if (fighter.race === 'Zombie(MH)' && currentWarband && currentWarband.members) {
        const hasAptRevitalist = currentWarband.members.some(m =>
            Array.isArray(m.skills) && m.skills.includes('Apt Revitalist')
        );
        if (hasAptRevitalist) return true;
    }

    return false;
}

/** Gets fighters eligible for advancement display */
export function getEligibleFighters() {
    if (!currentWarband || !currentWarband.members) return [];
    return currentWarband.members.filter(f => fighterCanGainExperience(f));
}

/** Gets the XP thresholds for a fighter based on type */
export function getFighterThresholds(fighter) {
    if (fighter.type === 'Hero') return HERO_XP_THRESHOLDS;
    return STANDARD_XP_THRESHOLDS;
}

/** Gets the next level XP threshold for a fighter */
export function getNextLevelXP(fighter) {
    const thresholds = getFighterThresholds(fighter);
    const currentXP = fighter.xp || 0;
    const effectiveXP = getEffectiveXPForThresholds(fighter, currentXP);
    
    for (const threshold of thresholds) {
        if (effectiveXP < threshold) return threshold;
    }
    return null; // Max level reached
}

/** Gets the number of pending (unclaimed) advancements for a fighter */
export function getPendingAdvancements(fighter) {
    const currentXP = fighter.xp || 0;
    const startingXP = fighter.starting_xp || 0;
    const thresholds = getFighterThresholds(fighter);
    const advancementsTaken = (fighter.advancements || []).length;
    const promotionAdvancements = fighter.promotion_advancements || 0;

    if (fighter.type === 'Hero') {
        const advancementsAtStart = thresholds.filter(t => startingXP >= t).length;
        const advancementsAtCurrent = thresholds.filter(t => currentXP >= t).length;
        const advancementsEarned = Math.max(0, advancementsAtCurrent - advancementsAtStart);
        return Math.max(0, advancementsEarned - (advancementsTaken - promotionAdvancements));
    } else {
        const advancementsEarned = getAdvancementsEarned(fighter, currentXP);
        return Math.max(0, advancementsEarned - advancementsTaken);
    }
}

/** Gets pending advancements including staged XP changes */
export function getStagedPendingAdvancements(fighter) {
    const changes = getFighterChanges(fighter.id);
    const currentXP = (fighter.xp || 0) + changes.xpChange;
    const startingXP = fighter.starting_xp || 0;
    const thresholds = getFighterThresholds(fighter);
    const advancementsTaken = (fighter.advancements || []).length;
    const promotionAdvancements = fighter.promotion_advancements || 0;
    const stagedAdvancementCount = changes.statChanges ? Object.values(changes.statChanges).reduce((a, b) => a + Math.abs(b), 0) : 0;
    // Maneater bonus skill is free (doesn't consume an advancement slot), so subtract 1 if present
    const maneaterBonusCount = changes.maneaterBonusSkill ? 1 : 0;
    // Big Bully bonus Strength skill is free (comes with the skill), so subtract 1 if present
    const bigBullyBonusCount = changes.bigBullyBonusSkill ? 1 : 0;
    // Pupil of Nagash first spell is free (comes with the skill), so subtract 1 if present
    const pupilOfNagashSpellCount = changes.pupilOfNagashSpell ? 1 : 0;
    // Dark Arts first spell is free (comes with the skill), so subtract 1 if present
    const darkArtsSpellCount = changes.darkArtsSpell ? 1 : 0;
    // Nehekhara's Noble Blood free spell (comes with the skill), so subtract 1 if present
    const nobleBloodSpellCount = changes.nobleBloodSpell ? 1 : 0;
    const totalTaken = advancementsTaken + stagedAdvancementCount + changes.skillsAdded.length + changes.spellsAdded.length - maneaterBonusCount - bigBullyBonusCount - pupilOfNagashSpellCount - darkArtsSpellCount - nobleBloodSpellCount;

    if (fighter.type === 'Hero') {
        const advancementsAtStart = thresholds.filter(t => startingXP >= t).length;
        const advancementsAtCurrent = thresholds.filter(t => currentXP >= t).length;
        const advancementsEarned = Math.max(0, advancementsAtCurrent - advancementsAtStart);
        return Math.max(0, advancementsEarned - (totalTaken - promotionAdvancements));
    } else {
        const advancementsEarned = getAdvancementsEarned(fighter, currentXP);
        return Math.max(0, advancementsEarned - totalTaken);
    }
}

/** Checks if fighter is ready to level up (has unclaimed advancements) */
export function isReadyToAdvance(fighter) {
    return getPendingAdvancements(fighter) > 0;
}

// ─── Staged Change Operations ───────────────────────────────────────────────

export function stageXPChange(fighterId, amount) {
    const changes = getFighterChanges(fighterId);
    changes.xpChange += amount;
}

export function setXPChange(fighterId, totalChange) {
    const changes = getFighterChanges(fighterId);
    changes.xpChange = totalChange;
}

export function stageStatIncrease(fighterId, stat) {
    const changes = getFighterChanges(fighterId);
    changes.statChanges[stat] = (changes.statChanges[stat] || 0) + 1;
}

export function stageSkillAdd(fighterId, skillName) {
    const changes = getFighterChanges(fighterId);
    changes.skillsAdded.push(skillName);
}

export function stageManeaterBonusSkill(fighterId, maneaterSkillName, bonusSkillName) {
    const changes = getFighterChanges(fighterId);
    changes.maneaterBonusSkill = { maneaterSkillName, bonusSkillName };
}

export function stageBigBullyBonusSkill(fighterId, parentSkillName, bonusSkillName) {
    const changes = getFighterChanges(fighterId);
    changes.bigBullyBonusSkill = { parentSkillName, bonusSkillName };
}

export function stagePupilOfNagashSpell(fighterId, skillName, spellName) {
    const changes = getFighterChanges(fighterId);
    changes.pupilOfNagashSpell = { skillName, spellName };
}

export function stageDarkArtsSpell(fighterId, skillName, spellName) {
    const changes = getFighterChanges(fighterId);
    changes.darkArtsSpell = { skillName, spellName };
}

export function stageNobleBloodSpell(fighterId, skillName, spellName) {
    const changes = getFighterChanges(fighterId);
    changes.nobleBloodSpell = { skillName, spellName };
}

export function stageTwistkinEquipment(fighterId, equipmentId, equipmentName, cost) {
    const changes = getFighterChanges(fighterId);
    changes.twistkinEquipment = { equipmentId, equipmentName, cost };
}

export function stageSpellAdd(fighterId, spellName) {
    const changes = getFighterChanges(fighterId);
    changes.spellsAdded.push(spellName);
}

export function stageLadsGotTalent(fighterId, selectedCategories) {
    const changes = getFighterChanges(fighterId);
    changes.ladsGotTalent = { selectedCategories, heroAdvancement: null };
}

export function stageLadsHeroAdvancement(fighterId, advancement) {
    const changes = getFighterChanges(fighterId);
    if (changes.ladsGotTalent) {
        changes.ladsGotTalent.heroAdvancement = advancement;
    }
}

export function stageLadsSkryreSpell(fighterId, spellName) {
    const changes = getFighterChanges(fighterId);
    if (changes.ladsGotTalent) {
        changes.ladsGotTalent.skryreSpell = spellName;
    }
}

export function stageLadsHarnessedSpell(fighterId, spellName) {
    const changes = getFighterChanges(fighterId);
    if (changes.ladsGotTalent) {
        changes.ladsGotTalent.harnessedSpell = spellName;
    }
}

export function stageDemiVampireReplacement(fighterId) {
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;
    const transformation = buildDemiVampireTransformation(fighter);
    if (!transformation) return;
    const changes = getFighterChanges(fighterId);
    changes.demiVampireReplacement = transformation;
}

export function removeStagedDemiVampireReplacement(fighterId) {
    const changes = getFighterChanges(fighterId);
    changes.demiVampireReplacement = null;
}

export function removeStageStatIncrease(fighterId, stat) {
    const changes = getFighterChanges(fighterId);
    if (changes.statChanges[stat] && changes.statChanges[stat] > 0) {
        changes.statChanges[stat]--;
        if (changes.statChanges[stat] === 0) delete changes.statChanges[stat];
    }
}

export function removeStageSkillAdd(fighterId, skillName) {
    const changes = getFighterChanges(fighterId);
    const idx = changes.skillsAdded.indexOf(skillName);
    if (idx !== -1) changes.skillsAdded.splice(idx, 1);

    // Coupled Maneater/bonus removal: removing either removes both
    if (changes.maneaterBonusSkill) {
        const { maneaterSkillName, bonusSkillName } = changes.maneaterBonusSkill;
        if (skillName === maneaterSkillName) {
            // Removing Maneater → also remove the bonus skill
            const bonusIdx = changes.skillsAdded.indexOf(bonusSkillName);
            if (bonusIdx !== -1) changes.skillsAdded.splice(bonusIdx, 1);
            changes.maneaterBonusSkill = null;
        } else if (skillName === bonusSkillName) {
            // Removing the bonus skill → also remove Maneater
            const maneaterIdx = changes.skillsAdded.indexOf(maneaterSkillName);
            if (maneaterIdx !== -1) changes.skillsAdded.splice(maneaterIdx, 1);
            changes.maneaterBonusSkill = null;
        }
    }

    // Coupled Big Bully/bonus removal: removing either removes both
    if (changes.bigBullyBonusSkill) {
        const { parentSkillName, bonusSkillName: bbBonus } = changes.bigBullyBonusSkill;
        if (skillName === parentSkillName) {
            // Removing Big Bully → also remove the bonus Strength skill
            const bonusIdx = changes.skillsAdded.indexOf(bbBonus);
            if (bonusIdx !== -1) changes.skillsAdded.splice(bonusIdx, 1);
            changes.bigBullyBonusSkill = null;
        } else if (skillName === bbBonus) {
            // Removing the bonus Strength skill → also remove Big Bully
            const parentIdx = changes.skillsAdded.indexOf(parentSkillName);
            if (parentIdx !== -1) changes.skillsAdded.splice(parentIdx, 1);
            changes.bigBullyBonusSkill = null;
        }
    }

    // Coupled Pupil of Nagash/spell removal: removing the skill also removes the spell
    if (changes.pupilOfNagashSpell) {
        const { skillName: ponSkill, spellName: ponSpell } = changes.pupilOfNagashSpell;
        if (skillName === ponSkill) {
            const spellIdx = changes.spellsAdded.indexOf(ponSpell);
            if (spellIdx !== -1) changes.spellsAdded.splice(spellIdx, 1);
            changes.pupilOfNagashSpell = null;
        }
    }

    // Coupled Dark Arts/spell removal: removing the skill also removes the spell
    if (changes.darkArtsSpell) {
        const { skillName: daSkill, spellName: daSpell } = changes.darkArtsSpell;
        if (skillName === daSkill) {
            const spellIdx = changes.spellsAdded.indexOf(daSpell);
            if (spellIdx !== -1) changes.spellsAdded.splice(spellIdx, 1);
            changes.darkArtsSpell = null;
        }
    }

    // Coupled Noble Blood/spell removal: removing the skill also removes the spell
    if (changes.nobleBloodSpell) {
        const { skillName: nbSkill, spellName: nbSpell } = changes.nobleBloodSpell;
        if (skillName === nbSkill) {
            const spellIdx = changes.spellsAdded.indexOf(nbSpell);
            if (spellIdx !== -1) changes.spellsAdded.splice(spellIdx, 1);
            changes.nobleBloodSpell = null;
        }
    }

    // Coupled Twistkin/equipment removal: removing Twistkin also clears the equipment purchase
    if (changes.twistkinEquipment && skillName === 'Twistkin') {
        changes.twistkinEquipment = null;
    }
}

export function removeStageSpellAdd(fighterId, spellName) {
    const changes = getFighterChanges(fighterId);
    const idx = changes.spellsAdded.indexOf(spellName);
    if (idx !== -1) changes.spellsAdded.splice(idx, 1);

    // Coupled Pupil of Nagash removal: removing the spell also removes the skill
    if (changes.pupilOfNagashSpell && spellName === changes.pupilOfNagashSpell.spellName) {
        const skillIdx = changes.skillsAdded.indexOf(changes.pupilOfNagashSpell.skillName);
        if (skillIdx !== -1) changes.skillsAdded.splice(skillIdx, 1);
        changes.pupilOfNagashSpell = null;
    }

    // Coupled Dark Arts removal: removing the spell also removes the skill
    if (changes.darkArtsSpell && spellName === changes.darkArtsSpell.spellName) {
        const skillIdx = changes.skillsAdded.indexOf(changes.darkArtsSpell.skillName);
        if (skillIdx !== -1) changes.skillsAdded.splice(skillIdx, 1);
        changes.darkArtsSpell = null;
    }

    // Coupled Noble Blood removal: removing the spell also removes the skill
    if (changes.nobleBloodSpell && spellName === changes.nobleBloodSpell.spellName) {
        const skillIdx = changes.skillsAdded.indexOf(changes.nobleBloodSpell.skillName);
        if (skillIdx !== -1) changes.skillsAdded.splice(skillIdx, 1);
        changes.nobleBloodSpell = null;
    }
}

// ─── Skill Availability Logic ───────────────────────────────────────────────

/** Gets available skills for a fighter (same logic as advancement.js showSkillSelectionModal) */
export function getAvailableSkillsForFighter(fighter) {
    const warbandData = getWarbandData(currentWarband.type);
    if (!warbandData) return [];

    const warriorData = warbandData.warriors ? warbandData.warriors.find(w => w.name === (fighter.warrior_choice || fighter.name)) : null;

    let availableCategories;
    if (fighterHasSkill(fighter, "Proven Warrior")) {
        availableCategories = ["Combat", "Shooting", "Strength", "Speed", "Special"];
    } else if (fighter.skill_categories_override && fighter.skill_categories_override.length > 0) {
        availableCategories = fighter.skill_categories_override;
    } else if (fighter.skill_categories && fighter.skill_categories.length > 0) {
        availableCategories = fighter.skill_categories;
    } else if (fighter.type === 'Hired Sword') {
        const hiredSwordData = HIRED_SWORDS.flatMap(g => g.characters).find(c => c.name === getOriginalName(fighter, HIRED_SWORDS));
        if (hiredSwordData && hiredSwordData.data.skills) {
            availableCategories = hiredSwordData.data.skills;
        } else {
            availableCategories = [];
        }
    } else if (warriorData) {
        availableCategories = getWarriorSkills(warriorData, currentWarband);
    } else {
        availableCategories = ['Combat', 'Shooting', 'Academic', 'Strength', 'Speed', 'Cavalry'];
    }

    const warbandName = currentWarband.type.split(':')[0].trim();
    
    // Derive granted and restricted categories directly from the fighter's equipment
    const equipmentGrantedCats = new Set();
    const equipmentRestrictedCats = new Set();

    if (fighter && Array.isArray(fighter.equipment)) {
        fighter.equipment.forEach(item => {
            const masterItem = MASTER_EQUIPMENT_LIST.find(i => (item.id !== undefined && i.id === item.id) || i.name === item.name);
            if (masterItem) {
                if (masterItem.grantsSKillCat && Array.isArray(masterItem.grantsSKillCat)) {
                    masterItem.grantsSKillCat.forEach(cat => equipmentGrantedCats.add(cat));
                }
                if (masterItem.restrictSkillCat && Array.isArray(masterItem.restrictSkillCat)) {
                    masterItem.restrictSkillCat.forEach(cat => equipmentRestrictedCats.add(cat));
                }
            }
        });
    } else {
        getAvailableSkillCategories().forEach(cat => equipmentGrantedCats.add(cat));
        getRestrictedSkillCategories().forEach(cat => equipmentRestrictedCats.add(cat));
    }

    const allAvailableCategories = [...new Set([...availableCategories, ...equipmentGrantedCats])];

    // Remove skill categories restricted by equipment
    const effectiveCategories = allAvailableCategories.filter(cat => !equipmentRestrictedCats.has(cat));

    if (fighterHasSkill(fighter, "Powerful Build") || fighterHasSkill(fighter, "Aspect of the Stag")) {
        if (!effectiveCategories.includes("Strength")) {
            effectiveCategories.push("Strength");
        }
    }

    // Helper: check if a single category string matches the warband name.
    // Uses includes() for substring matching (e.g. "Beastmen Raiders" includes "Beastmen"),
    // but excludes generic parent categories that should not bleed into sub-warbands
    // (e.g. "Skaven" should not match "Skaven Clan Skryre" — sub-warbands list their own categories explicitly).
    const categoryMatchesWarband = (cat) => {
        if (cat === 'Skaven' && warbandName !== 'Skaven') return false;
        if (cat === 'Night Goblins' && warbandName !== 'Night Goblins') return false;
        return warbandName.includes(cat);
    };

    let availableSkills = SKILLS.filter(skill => {
        const isGeneralSkill = skill.type === 'General' && effectiveCategories.includes(skill.category);
        const isWarbandSkill = fighter.type !== 'Hired Sword' &&
            skill.type === 'Warband Specific' &&
            effectiveCategories.includes('Special') &&
            ((!Array.isArray(skill.category) && categoryMatchesWarband(skill.category)) ||
                (Array.isArray(skill.category) && skill.category.some(cat => categoryMatchesWarband(cat))));
        const isHiredSwordSkill = fighter.type === 'Hired Sword' && skill.type === 'Hired Sword' && skill.category === getOriginalName(fighter, HIRED_SWORDS);
        return isGeneralSkill || isWarbandSkill || isHiredSwordSkill;
    });

    if (availableSkills.length === 0) {
        availableSkills = SKILLS.filter(skill => skill.type === 'General');
    }

    // Apply race restrictions for Lizardmen warband
    if (warbandName === "Lizardmen") {
        availableSkills = filterLizardmenSkillsByRace(availableSkills, fighter);
    }

    // Special case: Troll Slayers
    if (warriorData && (warriorData.name === "Troll Slayers" || warriorData.name === "Pit Fighter Troll Slayer")) {
        const additionalSlayerSkills = SKILLS.filter(skill => [811, 812, 813].includes(skill.id));
        additionalSlayerSkills.forEach(skill => {
            if (!availableSkills.find(existing => existing.id === skill.id)) {
                availableSkills.push(skill);
            }
        });
    }

    // Aristocracy of the Night: Add bloodline powers for Vampires based on warband's aristocracy selection
    if (currentWarband.type === 'Undead' && fighter.race === 'Vampire' &&
        currentWarband.aristocracy && currentWarband.aristocracy !== 'None') {
        const bloodlineType = `${currentWarband.aristocracy} Bloodline Powers`;
        const bloodlineSkills = SKILLS.filter(skill => skill.type === bloodlineType);
        bloodlineSkills.forEach(skill => {
            if (!availableSkills.find(existing => existing.id === skill.id)) {
                availableSkills.push(skill);
            }
        });
    }

    // Night Goblins Web: Add Squig Herder Skills only for the Squig Herder hero
    if (currentWarband.type.includes('Night Goblins Web') &&
        (fighter.warrior_choice || fighter.name) === 'Squig Herder') {
        const squigHerderSkills = SKILLS.filter(skill => skill.type === 'Squig Herder Skills');
        squigHerderSkills.forEach(skill => {
            if (!availableSkills.find(existing => existing.id === skill.id)) {
                availableSkills.push(skill);
            }
        });
    }

    return availableSkills;
}

/** Gets available spells for a fighter */
export function getAvailableSpellsForFighter(fighter) {
    let groupName = getMagicGroupForFighter(fighter);

    const rules = fighter.special_rules ? 
        (typeof fighter.special_rules === 'string' ? fighter.special_rules.split(';').map(r => r.trim()) : fighter.special_rules) 
        : [];
    const magicGroups = Object.keys(MAGIC);
    const availableMagicGroups = rules.filter(rule => magicGroups.includes(rule));

    // Check for Arcane Lore skill
    const hasArcaneLore = fighter.skills && fighter.skills.some(skill => skill === 'Arcane Lore');
    if (hasArcaneLore && !availableMagicGroups.includes('Lesser Magic')) {
        availableMagicGroups.push('Lesser Magic');
        if (!groupName) groupName = 'Lesser Magic';
    }

    if (!groupName && availableMagicGroups.length === 0) return { groups: [], allSpells: [] };

    if (availableMagicGroups.length === 0 && groupName) {
        availableMagicGroups.push(groupName);
    }

    const groups = availableMagicGroups.map(group => ({
        name: group,
        spells: getSpellsForGroup(group)
    }));

    const allSpells = groups.flatMap(g => g.spells);
    return { groups, allSpells };
}

/** Returns true if fighter already has this skill (including staged) */
export function fighterHasSkill(fighter, skillName) {
    const existingSkills = fighter.skills || [];
    const changes = getFighterChanges(fighter.id);
    return existingSkills.includes(skillName) || changes.skillsAdded.includes(skillName);
}

/** Returns true if fighter already has this spell (including staged) */
export function fighterHasSpell(fighter, spellName) {
    const isV2 = currentWarband && currentWarband._isV2;
    const existingSpells = isV2 ? (fighter.magic || []) : (fighter.skills || []);
    const changes = getFighterChanges(fighter.id);
    return existingSpells.includes(spellName) || changes.spellsAdded.includes(spellName);
}

// ─── Summary Data ───────────────────────────────────────────────────────────

/** Returns a summary of all staged changes for display */
export function getSummaryData() {
    const summary = [];
    advancementState.fighterChanges.forEach((changes, fighterId) => {
        const fighter = currentWarband.members.find(f => f.id === fighterId);
        if (!fighter) return;

        const hasChanges = changes.xpChange !== 0 ||
            Object.keys(changes.statChanges).length > 0 ||
            changes.skillsAdded.length > 0 ||
            changes.spellsAdded.length > 0 ||
            changes.ladsGotTalent !== null ||
            changes.demiVampireReplacement !== null ||
            changes.twistkinEquipment !== null;

        if (!hasChanges) return;

        summary.push({
            fighterId,
            fighterName: fighter.name,
            fighterType: fighter.type,
            xpChange: changes.xpChange,
            statChanges: { ...changes.statChanges },
            skillsAdded: [...changes.skillsAdded],
            spellsAdded: [...changes.spellsAdded],
            ladsGotTalent: changes.ladsGotTalent,
            demiVampireReplacement: changes.demiVampireReplacement,
            twistkinEquipment: changes.twistkinEquipment
        });
    });
    return summary;
}

/** Returns true if there are any staged changes to apply */
export function hasAnyChanges() {
    return getSummaryData().length > 0;
}

// ─── Apply All Changes ──────────────────────────────────────────────────────

export async function applyAllAdvancementChanges() {
    if (!currentWarband || !currentWarband.members) {
        showMessage('No warband loaded.', 'error');
        return;
    }

    try {
        const summary = getSummaryData();
        if (summary.length === 0) {
            showMessage('No changes to apply.', 'info');
            return;
        }

        for (const entry of summary) {
            const fighter = currentWarband.members.find(f => f.id === entry.fighterId);
            if (!fighter) continue;

            // Apply XP change
            if (entry.xpChange !== 0) {
                fighter.xp = (fighter.xp || 0) + entry.xpChange;
            }

            // Handle Lads Got Talent BEFORE applying group advancements,
            // so the promoted hero is cloned from the original henchman state
            // and doesn't inherit the group's stat/skill changes.
            if (entry.ladsGotTalent) {
                applyLadsGotTalentFromState(fighter, entry.ladsGotTalent);
            }

            // Apply stat changes
            for (const [stat, amount] of Object.entries(entry.statChanges)) {
                if (typeof fighter.stats === 'object' && !Array.isArray(fighter.stats)) {
                    const statLineKeys = Object.keys(fighter.stats);
                    const isMultiStat = statLineKeys.every(k => typeof fighter.stats[k] === 'object' && !Array.isArray(fighter.stats[k]));
                    
                    if (isMultiStat) {
                        if (fighter.stats['Fighter'] && fighter.stats['Fighter'][stat] !== undefined) {
                            fighter.stats['Fighter'][stat] += amount;
                        }
                    } else {
                        fighter.stats[stat] = (fighter.stats[stat] || 0) + amount;
                    }
                }
                
                fighter.advancements = fighter.advancements || [];
                for (let i = 0; i < amount; i++) {
                    fighter.advancements.push(fighter.type === 'Hero' ? `+1 ${stat}` : stat);
                }
            }

            // Apply skills
            for (const skillName of entry.skillsAdded) {
                fighter.skills = fighter.skills || [];
                if (!fighter.skills.includes(skillName)) {
                    fighter.skills.push(skillName);
                }
                fighter.advancements = fighter.advancements || [];
                fighter.advancements.push(skillName);

                // Characteristic modifiers from skills are applied at display time
                // by updateStatModifiers() — do NOT modify fighter.stats here to avoid double-counting.
                const skill = findSkillForWarband(skillName, null, fighter);

                // Add to SPECIAL_RULES_DETAILS if needed
                if (skill && !SPECIAL_RULES_DETAILS.find(r => r.name.toLowerCase() === skillName.toLowerCase())) {
                    SPECIAL_RULES_DETAILS.push({ name: skillName, rules: skill.rules, timing: skill.timing });
                }



                // Handle Chosen of Chaos race change
                if (currentWarband.type.includes('Marauders of Chaos')) {
                    const raceChangeResult = handleChosenOfChaosSkillChange(fighter.skills, fighter.race);
                    if (raceChangeResult.changed) {
                        fighter.race = raceChangeResult.race;
                    }
                }

                // Handle Pupil of Nagash - add Dreaded Scrolls of Nagash special rule
                if (skillName === 'Pupil of Nagash') {
                    const currentRules = fighter.special_rules || '';
                    const rulesArray = currentRules ? currentRules.split(';').map(r => r.trim()).filter(r => r) : [];
                    if (!rulesArray.includes('Dreaded Scrolls of Nagash')) {
                        rulesArray.push('Dreaded Scrolls of Nagash');
                        fighter.special_rules = rulesArray.join('; ');
                    }
                }

                // Handle Dark Arts - add Dark Arts special rule for future spell selection
                if (skillName === 'Dark Arts') {
                    const currentRules = fighter.special_rules || '';
                    const rulesArray = currentRules ? currentRules.split(';').map(r => r.trim()).filter(r => r) : [];
                    if (!rulesArray.includes('Dark Arts')) {
                        rulesArray.push('Dark Arts');
                        fighter.special_rules = rulesArray.join('; ');
                    }
                }

                // Handle Apt Revitalist - remove "Do not gain experience" from all Zombie(MH) fighters
                if (skillName === 'Apt Revitalist') {
                    for (const member of currentWarband.members) {
                        if (member.race === 'Zombie(MH)' && member.special_rules) {
                            const memberRules = member.special_rules.split(';').map(r => r.trim()).filter(r => r);
                            const filtered = memberRules.filter(r => r.toLowerCase() !== 'do not gain experience');
                            member.special_rules = filtered.join('; ') || undefined;
                        }
                    }
                }
            }

            // Apply spells
            for (const spellName of entry.spellsAdded) {
                const isV2 = currentWarband._isV2;
                if (isV2) {
                    fighter.magic = fighter.magic || [];
                    if (!fighter.magic.includes(spellName)) {
                        fighter.magic.push(spellName);
                    }
                } else {
                    fighter.skills = fighter.skills || [];
                    if (!fighter.skills.includes(spellName)) {
                        fighter.skills.push(spellName);
                    }
                }
                fighter.advancements = fighter.advancements || [];
                fighter.advancements.push(spellName);


            }

            // Handle Demi-Vampire Replacement
            if (entry.demiVampireReplacement) {
                const dvr = entry.demiVampireReplacement;
                fighter.stats = { ...dvr.newStats };
                fighter.base_stats = { ...dvr.newBaseStats };
                fighter.special_rules = dvr.newSpecialRules;
                fighter.race = dvr.newRace;
                fighter.warrior_choice = dvr.newWarriorChoice;
                fighter.advancements = fighter.advancements || [];
                fighter.advancements.push('Demi-Vampire Replacement');
            }

            // Handle Twistkin mutation purchase
            if (entry.twistkinEquipment) {
                const twistkin = entry.twistkinEquipment;
                const halfCost = twistkin.cost;

                // Validate treasury has enough funds
                if (currentWarband.gc_treasury < halfCost) {
                    showMessage(`Cannot apply Twistkin mutation: Insufficient Gold Crowns. Need ${halfCost} GC but treasury has ${currentWarband.gc_treasury} GC.`, 'error');
                    return;
                }

                // Add mutation to fighter's equipment
                fighter.equipment = fighter.equipment || [];
                const mutationItem = { id: twistkin.equipmentId, cost: halfCost };
                const serialized = serializeEquipment(normalizeEquipment(mutationItem), isV2Warband(currentWarband));
                fighter.equipment.push(serialized);

                // Deduct cost from treasury
                currentWarband.gc_treasury -= halfCost;

                // Record ledger entry
                await recordEquipmentPurchase(twistkin.equipmentName, halfCost, 1);
            }
        }

        // Save warband
        await saveWarband();

        // Cleanup
        resetAdvancementState();
        hideModal('advancement-hub-modal');

        showMessage('All advancement changes applied successfully!', 'success');

        // Return to warband editor
        showEditorView();
        renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);

    } catch (error) {
        console.error('Error applying advancement changes:', error);
        showMessage('Error applying changes: ' + error.message, 'error');
    }
}

// ─── Lads Got Talent Helper ─────────────────────────────────────────────────

function applyLadsGotTalentFromState(henchman, ladsGotTalentData) {
    const { selectedCategories, heroAdvancement } = ladsGotTalentData;
    const newHero = JSON.parse(JSON.stringify(henchman));
    newHero.warrior_choice = henchman.warrior_choice;
    newHero.id = generateUUID();
    newHero.type = 'Hero';
    newHero.group_size = 1;
    newHero.name = `${henchman.name} (Lad)`;
    newHero.skills = newHero.skills || [];
    newHero.skills.push("Lads got talent");
    newHero.skill_categories = selectedCategories;

    // Retain the henchman's current XP per Mordheim rules.
    // Fall back to the first Hero threshold if XP is missing.
    const promotionXp = henchman.xp || HERO_XP_THRESHOLDS[0] || 2;
    newHero.xp = promotionXp;
    newHero.starting_xp = promotionXp;
    newHero.advancements = [];
    newHero.base_stats = { ...newHero.stats };

    // Apply hero advancement pick (stat or skill) to the promoted hero
    if (heroAdvancement) {
        if (heroAdvancement.type === 'stat') {
            if (typeof newHero.stats === 'object' && !Array.isArray(newHero.stats)) {
                const statLineKeys = Object.keys(newHero.stats);
                const isMultiStat = statLineKeys.every(k => typeof newHero.stats[k] === 'object' && !Array.isArray(newHero.stats[k]));
                if (isMultiStat) {
                    if (newHero.stats['Fighter'] && newHero.stats['Fighter'][heroAdvancement.stat] !== undefined) {
                        newHero.stats['Fighter'][heroAdvancement.stat] += 1;
                    }
                } else {
                    newHero.stats[heroAdvancement.stat] = (newHero.stats[heroAdvancement.stat] || 0) + 1;
                }
            }
            newHero.base_stats = { ...newHero.stats };
            newHero.advancements.push(`+1 ${heroAdvancement.stat}`);
        } else if (heroAdvancement.type === 'skill') {
            newHero.skills = newHero.skills || [];
            if (!newHero.skills.includes(heroAdvancement.skillName)) {
                newHero.skills.push(heroAdvancement.skillName);
            }
            newHero.advancements.push(heroAdvancement.skillName);

            // Characteristic modifiers from skills are applied at display time
            // by updateStatModifiers() — do NOT modify newHero.stats here to avoid double-counting.
            const skill = findSkillForWarband(heroAdvancement.skillName);

            // Add to SPECIAL_RULES_DETAILS if needed
            if (skill && !SPECIAL_RULES_DETAILS.find(r => r.name.toLowerCase() === heroAdvancement.skillName.toLowerCase())) {
                SPECIAL_RULES_DETAILS.push({ name: heroAdvancement.skillName, rules: skill.rules, timing: skill.timing });
            }
        }
    }

    // Handle Clan Skryre The Lads Got Talent special case
    const henchmanRules = henchman.special_rules ?
        (typeof henchman.special_rules === 'string' ? henchman.special_rules.split(';').map(r => r.trim()) : henchman.special_rules)
        : [];
    if (henchmanRules.includes('Clan Skryre The Lads Got Talent')) {
        // Set special rules for the promoted hero (same as Warlock Apprentice)
        newHero.special_rules = "Trainees; Inexperienced; Magic of the Horned Rat";
        // Update starting equipment to match Warlock Apprentice
        newHero.starting_equipment = [8, 10, 13, 15, 14, 172, 545, 547, 550, 4, 6, 549, 506];
        // Apply the mandatory spell
        if (ladsGotTalentData.skryreSpell) {
            const isV2 = currentWarband._isV2;
            if (isV2) {
                newHero.magic = newHero.magic || [];
                if (!newHero.magic.includes(ladsGotTalentData.skryreSpell)) {
                    newHero.magic.push(ladsGotTalentData.skryreSpell);
                }
            } else {
                newHero.skills = newHero.skills || [];
                if (!newHero.skills.includes(ladsGotTalentData.skryreSpell)) {
                    newHero.skills.push(ladsGotTalentData.skryreSpell);
                }
            }
            newHero.advancements.push(ladsGotTalentData.skryreSpell);
        }
    }

    // Handle Harnessed special case (Sorcerous Society Untrained)
    if (henchmanRules.includes('Harnessed')) {
        // Append magic lore rules to existing special rules
        const magicLores = 'Lesser Magic; Elemental Lore of Water; Elemental Lore of Fire; Elemental Lore of Earth; Elemental Lore of Air';
        if (newHero.special_rules) {
            newHero.special_rules = newHero.special_rules + '; ' + magicLores;
        } else {
            newHero.special_rules = magicLores;
        }
        // Apply the chosen spell if one was selected
        if (ladsGotTalentData.harnessedSpell) {
            const isV2 = currentWarband._isV2;
            if (isV2) {
                newHero.magic = newHero.magic || [];
                if (!newHero.magic.includes(ladsGotTalentData.harnessedSpell)) {
                    newHero.magic.push(ladsGotTalentData.harnessedSpell);
                }
            } else {
                newHero.skills = newHero.skills || [];
                if (!newHero.skills.includes(ladsGotTalentData.harnessedSpell)) {
                    newHero.skills.push(ladsGotTalentData.harnessedSpell);
                }
            }
            newHero.advancements.push(ladsGotTalentData.harnessedSpell);
        }
    }

    // Track the number of advancements granted as part of the TLGT promotion.
    // These are free and should not count against threshold-earned advancement slots.
    newHero.promotion_advancements = newHero.advancements.length;

    // Update henchman group
    henchman.group_size = (henchman.group_size || 1) - 1;

    // Add hero to warband
    currentWarband.members.push(newHero);

    // Remove group if depleted
    if (henchman.group_size <= 0) {
        currentWarband.members = currentWarband.members.filter(f => f.id !== henchman.id);
    }
}

// ─── Export state ───────────────────────────────────────────────────────────
export { advancementState };
