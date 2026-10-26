import { showMessage, getWarbandData, getWarriorSkills, showConfirmationModal } from '../utility.js';
import { currentWarband, isIgnoreRacialMaximumsActive } from '../state.js';
import { STATS_FIELDS } from '../config.js';
import { formatXPDisplay, isSlowWitted, isElemental, hasHalfXPRate } from '../slow-witted.js';
import { RACIAL_MAXIMUMS } from '../data/races.js';
import { SKILLS, MASTER_EQUIPMENT_LIST } from '../data/index.js';
import { checkFighterHasMagicRule, MAGIC } from '../spell-management.js';
import { returnToAdvancementHub } from './advancement-hub.js';
import { hasDemiVampireRule, getDemiVampireBlockers, getDemiVampireRuleText } from './demi-vampire-handler.js';
import { translateSkill, translateSkillCategory, translateSpecialRule, translateEquipment, translateEquipmentRules, translateRace, getSpecialRuleSummary } from '../i18n.js';
import {
    getFighterChanges,
    setXPChange,
    stageStatIncrease,
    stageSkillAdd,
    stageManeaterBonusSkill,
    stageBigBullyBonusSkill,
    stagePupilOfNagashSpell,
    stageDarkArtsSpell,
    stageNobleBloodSpell,
    stageTwistkinEquipment,
    stageSpellAdd,
    stageLadsGotTalent,
    stageLadsHeroAdvancement,
    stageLadsSkryreSpell,
    stageLadsHarnessedSpell,
    stageDemiVampireReplacement,
    removeStagedDemiVampireReplacement,
    removeStageStatIncrease,
    removeStageSkillAdd,
    removeStageSpellAdd,
    getAvailableSkillsForFighter,
    getAvailableSpellsForFighter,
    fighterHasSkill,
    fighterHasSpell,
    getStagedPendingAdvancements,
    getFighterThresholds,
    getNextLevelXP,
    getPendingAdvancements
} from './advancement-state.js';

// ─── Show Fighter Advancement View ──────────────────────────────────────────
export function showFighterAdvancementView(fighter) {
    renderFighterView(fighter);
}

// ─── Render Fighter Detail View ─────────────────────────────────────────────
function renderFighterView(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';
    const changes = getFighterChanges(fighter.id);

    // Header with back button
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="adv-back-to-hub-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Volver a la Lista</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold truncate max-w-[60%]">${fighter.name}</h3>
    `;
    container.appendChild(header);
    header.querySelector('#adv-back-to-hub-btn').addEventListener('click', () => {
        returnToAdvancementHub();
    });

    // Fighter info bar
    const infoBar = document.createElement('div');
    infoBar.className = 'bg-slate-800 rounded-lg p-3 mb-4';
    const currentXP = (fighter.xp || 0) + changes.xpChange;
    const thresholds = getFighterThresholds(fighter);
    const maxXP = fighter.type === 'Hero' ? 90 : 14;
    const fillPct = Math.min(100, (currentXP / maxXP) * 100);
    const nextLevel = getNextLevelXP(fighter);
    const slowWitted = isSlowWitted(fighter);
    const elemental = isElemental(fighter);

    let badgeHtml = '';
    if (slowWitted) {
        badgeHtml = '<span class="ml-2 text-amber-400 text-xs"><i class="fas fa-brain"></i> Slow Witted (½ XP rate)</span>';
    } else if (elemental) {
        badgeHtml = '<span class="ml-2 text-amber-400 text-xs"><i class="fas fa-leaf"></i> Elemental (½ XP rate)</span>';
    }

    infoBar.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <div class="text-sm text-slate-400">
                <span class="uppercase">${fighter.type}</span> &middot; <span>${fighter.race || 'Unknown'}</span>
                ${badgeHtml}
            </div>
            <div class="text-sm text-slate-300">
                ${nextLevel !== null ? `Next level: <span class="text-mordheim-gold font-semibold">${nextLevel}</span>` : '<span class="text-green-400 font-semibold">MAX LEVEL</span>'}
            </div>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-2 mb-1">
            <div class="h-2 rounded-full ${currentXP >= (nextLevel || maxXP) ? 'bg-mordheim-gold' : 'bg-blue-500'} transition-all" style="width: ${fillPct}%"></div>
        </div>
        <div class="flex justify-between text-xs text-slate-400">
            <span>XP: <span class="text-yellow-200 font-bold">${formatXPDisplay(currentXP)}</span></span>
            <span>Max: ${maxXP}</span>
        </div>
    `;
    container.appendChild(infoBar);

    // XP Modification Section
    const xpSection = createXPSection(fighter, changes);
    container.appendChild(xpSection);

    // Advancement section (if has pending)
    const pendingAdvs = getStagedPendingAdvancements(fighter);
    if (pendingAdvs > 0) {
        const advSection = createAdvancementSection(fighter, changes, pendingAdvs);
        container.appendChild(advSection);
    }

    // Staged changes display
    const stagedSection = createStagedChangesSection(fighter, changes);
    if (stagedSection) {
        container.appendChild(stagedSection);
    }

    // Advancements taken display
    const takenSection = createAdvancementsTakenSection(fighter);
    if (takenSection) {
        container.appendChild(takenSection);
    }
}

// ─── XP Modification Section ────────────────────────────────────────────────
function createXPSection(fighter, changes) {
    const section = document.createElement('div');
    section.className = 'bg-slate-800 rounded-lg p-4 mb-4';

    const currentXP = (fighter.xp || 0);
    const stagedXP = currentXP + changes.xpChange;
    const slowWitted = isSlowWitted(fighter);
    const elemental = isElemental(fighter);
    const halfXPRate = slowWitted || elemental;
    const increment = halfXPRate ? 0.5 : 1;

    let instructionMsg = '';
    if (slowWitted) {
        instructionMsg = `<p class="text-xs text-amber-400 text-center mt-2"><i class="fas fa-info-circle"></i> Lento de Reflejos: La PX cambia ±${formatXPDisplay(increment)} por clic</p>`;
    } else if (elemental) {
        instructionMsg = `<p class="text-xs text-amber-400 text-center mt-2"><i class="fas fa-info-circle"></i> Elemental: La PX cambia ±${formatXPDisplay(increment)} por clic</p>`;
    }

    section.innerHTML = `
        <h4 class="text-sm font-semibold text-mordheim-gold mb-3 uppercase tracking-wide">Puntos de Experiencia</h4>
        <div class="flex items-center justify-center gap-4">
            <button id="adv-xp-down" class="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition flex items-center justify-center">
                <i class="fas fa-minus"></i>
            </button>
            <div class="text-center">
                <span class="text-3xl font-bold text-yellow-200">${formatXPDisplay(stagedXP)}</span>
                ${changes.xpChange !== 0 ? `<div class="text-xs text-slate-400 mt-1">(${changes.xpChange > 0 ? '+' : ''}${formatXPDisplay(changes.xpChange)} respecto a base ${formatXPDisplay(currentXP)})</div>` : '<div class="text-xs text-slate-400 mt-1">PX Actual</div>'}
            </div>
            <button id="adv-xp-up" class="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg transition flex items-center justify-center">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        ${instructionMsg}
    `;

    section.querySelector('#adv-xp-down').addEventListener('click', () => {
        const newChange = changes.xpChange - increment;
        if ((fighter.xp || 0) + newChange < 0) {
            showMessage('La PX no puede ser menor que 0.', 'error');
            return;
        }
        setXPChange(fighter.id, newChange);
        renderFighterView(fighter);
    });

    section.querySelector('#adv-xp-up').addEventListener('click', () => {
        setXPChange(fighter.id, changes.xpChange + increment);
        renderFighterView(fighter);
    });

    return section;
}

// ─── Advancement Section (Stats, Skills, Spells) ────────────────────────────
function createAdvancementSection(fighter, changes, pendingAdvs) {
    const section = document.createElement('div');
    section.className = 'bg-slate-900 rounded-lg p-4 mb-4 border border-mordheim-gold';

    const isHenchman = fighter.type === 'Henchman';
    const isHiredSword = fighter.type === 'Hired Sword';
    const usesHenchmanPath = isHenchman || isHiredSword;

    section.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            <h4 class="text-sm font-semibold text-mordheim-gold uppercase tracking-wide">
                Avance de ${usesHenchmanPath ? 'Secuaz' : 'Héroe'}
            </h4>
            <span class="text-xs bg-mordheim-gold text-slate-900 font-bold px-2 py-1 rounded-full">
                ${pendingAdvs} disponible${pendingAdvs !== 1 ? 's' : ''}
            </span>
        </div>
    `;

    // Stat buttons
    const statsGrid = document.createElement('div');
    statsGrid.className = 'grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3';

    const maximums = RACIAL_MAXIMUMS[fighter.race] || {};
    const advancementsTaken = fighter.advancements || [];

    // Collect advancement restrictions from equipped items (e.g. Swordmaster blocks BS)
    const restrictedStats = new Set();
    (fighter.equipment || []).forEach(equip => {
        let masterItem;
        if (typeof equip === 'object') {
            // V2 format stores id; V1 format stores name
            masterItem = (equip.id !== undefined && MASTER_EQUIPMENT_LIST.find(m => m.id === equip.id))
                      || MASTER_EQUIPMENT_LIST.find(m => m.name === equip.name);
        } else {
            masterItem = MASTER_EQUIPMENT_LIST.find(m => m.name === equip);
        }
        if (masterItem && Array.isArray(masterItem.restrictAdvancement)) {
            masterItem.restrictAdvancement.forEach(s => restrictedStats.add(s));
        }
    });

    STATS_FIELDS.forEach(stat => {
        const currentStatVal = getEffectiveStatValue(fighter, stat, changes);
        const isMaxed = isIgnoreRacialMaximumsActive ? false : currentStatVal >= (maximums[stat] || 99);
        // For henchmen/hired swords, a stat can only be advanced once (already taken or staged)
        const isAlreadyAdvancedHenchman = usesHenchmanPath && (advancementsTaken.includes(stat) || (changes.statChanges[stat] && changes.statChanges[stat] > 0));
        // Check if an equipped item restricts advancing this stat
        const isBlockedByEquipment = restrictedStats.has(stat);
        const isDisabled = isMaxed || isAlreadyAdvancedHenchman || isBlockedByEquipment;

        const btn = document.createElement('button');
        btn.className = `p-2 rounded-lg text-white font-semibold text-sm transition ${isDisabled ? 'bg-slate-600 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`;
        btn.textContent = `+1 ${stat}`;
        btn.disabled = isDisabled;
        if (!isDisabled) {
            btn.addEventListener('click', () => {
                stageStatIncrease(fighter.id, stat);
                renderFighterView(fighter);
            });
        }
        statsGrid.appendChild(btn);
    });

    section.appendChild(statsGrid);

    // Skill button — determine if this fighter is allowed to choose skills
    // Henchmen cannot choose skills by default; they need an explicit reason:
    // 1. Their warrior data defines a non-empty skills array (e.g. Wheelo, Squires)
    // 2. They have skill_categories set (e.g. promoted via Lads Got Talent)
    // 3. They have the "Proven Warrior" skill
    // Heroes and Hired Swords always have access to skills.
    let canChooseSkill = true;
    if (isHenchman) {
        const warbandData = getWarbandData(currentWarband.type);
        const warriorData = warbandData?.warriors?.find(w => w.name === (fighter.warrior_choice || fighter.name));
        const warriorSkills = warriorData ? getWarriorSkills(warriorData, currentWarband) : [];
        const hasWarriorSkills = Array.isArray(warriorSkills) && warriorSkills.length > 0;
        const hasSkillCategories = (fighter.skill_categories_override && fighter.skill_categories_override.length > 0) || (fighter.skill_categories && fighter.skill_categories.length > 0);
        const hasProvenWarrior = fighterHasSkill(fighter, "Proven Warrior");
        canChooseSkill = hasWarriorSkills || hasSkillCategories || hasProvenWarrior;
    }

    if (canChooseSkill) {
        const skillBtn = document.createElement('button');
        skillBtn.className = 'w-full p-2 rounded-lg text-white font-semibold text-sm transition bg-purple-600 hover:bg-purple-700 mb-2';
        skillBtn.innerHTML = '<i class="fas fa-book mr-1"></i> Elegir una Habilidad';
        skillBtn.addEventListener('click', () => showSkillPicker(fighter));
        section.appendChild(skillBtn);
    }

    // Spell button (if magic-capable)
    if (checkFighterHasMagicRule(fighter)) {
        const spellBtn = document.createElement('button');
        spellBtn.className = 'w-full p-2 rounded-lg text-white font-semibold text-sm transition bg-indigo-600 hover:bg-indigo-700 mb-2';
        spellBtn.innerHTML = '<i class="fas fa-hat-wizard mr-1"></i> Elegir un Hechizo';
        spellBtn.addEventListener('click', () => showSpellPicker(fighter));
        section.appendChild(spellBtn);
    }

    // Lads Got Talent (henchmen only, not hired swords, and hero count < 6)
    if (isHenchman && !isHiredSword) {
        const heroCount = currentWarband.members.filter(m => m.type === 'Hero').length;
        const isWheeloInSnotlings = fighter.name === "Wheelo" && currentWarband.type.includes("Snotlings");

        if (heroCount < 6 && !isWheeloInSnotlings) {
            const ladsBtn = document.createElement('button');
            ladsBtn.className = 'w-full p-2 rounded-lg text-white font-semibold text-sm transition bg-green-600 hover:bg-green-700';
            ladsBtn.innerHTML = '<i class="fas fa-medal mr-1"></i> Este Chico Vale';
            ladsBtn.addEventListener('click', () => showLadsGotTalentPicker(fighter));
            section.appendChild(ladsBtn);
        }
    }

    // Wheelo and Hired Swords get skill choice instead of Lads Got Talent
    // (already handled above via the skill button)

    // Demi-Vampire Replacement (for fighters with the Demi-Vampires special rule)
    if (hasDemiVampireRule(fighter)) {
        const blockers = getDemiVampireBlockers(fighter.id);
        const isBlocked = blockers.length > 0;
        const ruleText = getDemiVampireRuleText();

        const dvrWrapper = document.createElement('div');
        dvrWrapper.className = 'mt-3 pt-3 border-t border-slate-700';

        const dvrBtn = document.createElement('button');
        dvrBtn.className = `w-full p-2 rounded-lg text-white font-semibold text-sm transition mb-1 ${isBlocked ? 'bg-slate-600 opacity-50 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'}`;
        dvrBtn.innerHTML = '<i class="fas fa-skull-crossbones mr-1"></i> Reemplazo por Semi-Vampiro';
        dvrBtn.disabled = isBlocked;

        if (!isBlocked) {
            dvrBtn.addEventListener('click', () => {
                stageDemiVampireReplacement(fighter.id);
                renderFighterView(fighter);
            });
        }
        dvrWrapper.appendChild(dvrBtn);

        // Show rule text
        if (ruleText) {
            const ruleP = document.createElement('p');
            ruleP.className = 'text-xs text-slate-400 mt-1 mb-1';
            ruleP.textContent = ruleText;
            dvrWrapper.appendChild(ruleP);
        }

        // Show blocker reasons
        if (isBlocked) {
            blockers.forEach(reason => {
                const reasonP = document.createElement('p');
                reasonP.className = 'text-xs text-red-400 mt-1';
                reasonP.innerHTML = `<i class="fas fa-exclamation-triangle mr-1"></i>${reason}`;
                dvrWrapper.appendChild(reasonP);
            });
        }

        section.appendChild(dvrWrapper);
    }

    return section;
}

// ─── Staged Changes Display ─────────────────────────────────────────────────
function createStagedChangesSection(fighter, changes) {
    const hasStats = Object.keys(changes.statChanges).length > 0;
    const hasSkills = changes.skillsAdded.length > 0;
    const hasSpells = changes.spellsAdded.length > 0;
    const hasLads = changes.ladsGotTalent !== null;
    const hasDvr = changes.demiVampireReplacement !== null;
    const hasTwistkin = changes.twistkinEquipment !== null;

    if (!hasStats && !hasSkills && !hasSpells && !hasLads && !hasDvr && !hasTwistkin) return null;

    const section = document.createElement('div');
    section.className = 'bg-slate-800 rounded-lg p-4 mb-4';
    section.innerHTML = `<h4 class="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide"><i class="fas fa-pen mr-1"></i> Cambios Pendientes</h4>`;

    const list = document.createElement('div');
    list.className = 'space-y-1';

    // Stats
    for (const [stat, amount] of Object.entries(changes.statChanges)) {
        for (let i = 0; i < amount; i++) {
            const item = document.createElement('div');
            item.className = 'flex justify-between items-center text-sm py-1 px-2 bg-slate-700 rounded';
            item.innerHTML = `
                <span class="text-blue-300"><i class="fas fa-arrow-up mr-1"></i> +1 ${stat}</span>
                <button class="text-red-400 hover:text-red-300" data-remove-stat="${stat}"><i class="fas fa-times"></i></button>
            `;
            item.querySelector(`[data-remove-stat="${stat}"]`).addEventListener('click', () => {
                removeStageStatIncrease(fighter.id, stat);
                renderFighterView(fighter);
            });
            list.appendChild(item);
        }
    }

    // Skills
    changes.skillsAdded.forEach(skillName => {
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center text-sm py-1 px-2 bg-slate-700 rounded';
        item.innerHTML = `
            <span class="text-purple-300"><i class="fas fa-book mr-1"></i> ${translateSkill(skillName)}</span>
            <button class="text-red-400 hover:text-red-300" data-remove-skill="${skillName}"><i class="fas fa-times"></i></button>
        `;
        item.querySelector(`[data-remove-skill="${skillName}"]`).addEventListener('click', () => {
            removeStageSkillAdd(fighter.id, skillName);
            renderFighterView(fighter);
        });
        list.appendChild(item);
    });

    // Spells
    changes.spellsAdded.forEach(spellName => {
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center text-sm py-1 px-2 bg-slate-700 rounded';
        item.innerHTML = `
            <span class="text-indigo-300"><i class="fas fa-hat-wizard mr-1"></i> ${translateSkill(spellName)}</span>
            <button class="text-red-400 hover:text-red-300" data-remove-spell="${spellName}"><i class="fas fa-times"></i></button>
        `;
        item.querySelector(`[data-remove-spell="${spellName}"]`).addEventListener('click', () => {
            removeStageSpellAdd(fighter.id, spellName);
            renderFighterView(fighter);
        });
        list.appendChild(item);
    });

    // Lads Got Talent
    if (hasLads) {
        const lgt = changes.ladsGotTalent;
        let ladsLabel = `Este Chico Vale (${lgt.selectedCategories.map(c => translateSkillCategory(c)).join(', ')})`;
        if (lgt.heroAdvancement) {
            if (lgt.heroAdvancement.type === 'stat') {
                ladsLabel += ` — Héroe: +1 ${lgt.heroAdvancement.stat}`;
            } else if (lgt.heroAdvancement.type === 'skill') {
                ladsLabel += ` — Héroe: ${translateSkill(lgt.heroAdvancement.skillName)}`;
            }
        }
        if (lgt.skryreSpell) {
            ladsLabel += ` — Hechizo: ${translateSkill(lgt.skryreSpell)}`;
        }
        if (lgt.harnessedSpell) {
            ladsLabel += ` — Hechizo: ${translateSkill(lgt.harnessedSpell)}`;
        }
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center text-sm py-1 px-2 bg-slate-700 rounded';
        item.innerHTML = `
            <span class="text-green-300"><i class="fas fa-medal mr-1"></i> ${ladsLabel}</span>
            <button class="text-red-400 hover:text-red-300" id="remove-lads"><i class="fas fa-times"></i></button>
        `;
        item.querySelector('#remove-lads').addEventListener('click', () => {
            changes.ladsGotTalent = null;
            renderFighterView(fighter);
        });
        list.appendChild(item);
    }

    // Demi-Vampire Replacement
    if (hasDvr) {
        const dvr = changes.demiVampireReplacement;
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center text-sm py-1 px-2 bg-slate-700 rounded';
        const statsStr = STATS_FIELDS.map(s => `${s}:${dvr.newStats[s]}`).join(' ');
        item.innerHTML = `
            <span class="text-red-300"><i class="fas fa-skull-crossbones mr-1"></i> Reemplazo por Semi-Vampiro — Raza: ${translateRace(dvr.newRace) || dvr.newRace}, Atributos: ${statsStr}</span>
            <button class="text-red-400 hover:text-red-300" id="remove-dvr"><i class="fas fa-times"></i></button>
        `;
        item.querySelector('#remove-dvr').addEventListener('click', () => {
            removeStagedDemiVampireReplacement(fighter.id);
            renderFighterView(fighter);
        });
        list.appendChild(item);
    }

    // Twistkin equipment purchase
    if (hasTwistkin) {
        const twistkin = changes.twistkinEquipment;
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center text-sm py-1 px-2 bg-slate-700 rounded';
        item.innerHTML = `
            <span class="text-orange-300"><i class="fas fa-dna mr-1"></i> Mutación Twistkin: ${translateEquipment(twistkin.equipmentName)} (${twistkin.cost} CO)</span>
            <button class="text-red-400 hover:text-red-300" id="remove-twistkin-equip"><i class="fas fa-times"></i></button>
        `;
        item.querySelector('#remove-twistkin-equip').addEventListener('click', () => {
            // Remove both the Twistkin skill and the equipment purchase
            removeStageSkillAdd(fighter.id, 'Twistkin');
            renderFighterView(fighter);
        });
        list.appendChild(item);
    }

    section.appendChild(list);
    return section;
}

// ─── Advancements Taken Display ─────────────────────────────────────────────
function createAdvancementsTakenSection(fighter) {
    const taken = fighter.advancements || [];
    if (taken.length === 0) return null;

    const section = document.createElement('div');
    section.className = 'bg-slate-800 rounded-lg p-4 mb-4';
    section.innerHTML = `
        <h4 class="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">Avances Anteriores</h4>
        <p class="text-sm text-slate-300 italic">${taken.join(', ')}</p>
    `;
    return section;
}

// ─── Skill Picker ───────────────────────────────────────────────────────────
function showSkillPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="skill-picker-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Volver</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Elegir una Habilidad</h3>
    `;
    container.appendChild(header);
    header.querySelector('#skill-picker-back-btn').addEventListener('click', () => renderFighterView(fighter));

    const availableSkills = getAvailableSkillsForFighter(fighter);

    // Group by category
    const groupedSkills = availableSkills.reduce((acc, skill) => {
        let groupKey;
        if (skill.type === 'Warband Specific') {
            groupKey = 'Special';
        } else if (skill.type.endsWith('Bloodline Powers')) {
            groupKey = 'Bloodline Powers';
        } else {
            groupKey = skill.category;
        }
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(skill);
        return acc;
    }, {});

    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-2';

    for (const category in groupedSkills) {
        const categoryId = category.replace(/\s+/g, '-');

        // Category header
        const catHeader = document.createElement('div');
        catHeader.className = 'flex items-center justify-between cursor-pointer text-lg font-semibold text-mordheim-gold mt-3 hover:text-yellow-400 transition p-2 bg-slate-800 rounded-lg';
        catHeader.innerHTML = `
            <span>${translateSkillCategory(category)}</span>
            <i class="fas fa-chevron-right transition-transform" id="adv-chevron-${categoryId}"></i>
        `;

        const skillsDiv = document.createElement('div');
        skillsDiv.id = `adv-skills-${categoryId}`;
        skillsDiv.className = 'hidden mt-1 space-y-1';

        catHeader.addEventListener('click', () => {
            skillsDiv.classList.toggle('hidden');
            const chevron = catHeader.querySelector('i');
            chevron.classList.toggle('fa-chevron-right');
            chevron.classList.toggle('fa-chevron-down');
        });

        groupedSkills[category].forEach(skill => {
            const alreadyHas = fighterHasSkill(fighter, skill.name);
            const canSelectMultiple = skill.canSelectMultiple || skill.id === 313; // Animal Handling

            const skillEl = document.createElement('div');
            skillEl.className = `p-3 rounded-lg cursor-pointer transition hover:bg-slate-700 bg-slate-800 ${alreadyHas ? 'border border-red-500' : ''}`;

            let warningHtml = '';
            if (alreadyHas) {
                warningHtml = '<span class="text-xs text-red-400 ml-2"><i class="fas fa-exclamation-triangle"></i> Ya seleccionada</span>';
            }

            skillEl.innerHTML = `
                <div class="flex items-center">
                    <p class="font-semibold text-sm text-white">${translateSkill(skill.name)}</p>
                    ${warningHtml}
                </div>
                <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(skill.name)?.full || skill.rules || ''}</p>
            `;

            skillEl.addEventListener('click', () => {
                if (alreadyHas) {
                    // Show confirmation for duplicate via modal
                    showConfirmationModal(`${fighter.name} ya tiene "${translateSkill(skill.name)}". ¿Seguro que quieres añadirla de nuevo?`, () => {
                        if (skill.id === 313) {
                            const animal = prompt('Introduce el tipo de animal para Trato con Animales (ej. Caballo, Perro, Lobo):');
                            if (animal && animal.trim()) {
                                stageSkillAdd(fighter.id, `Animal Handling (${animal.trim()})`);
                            }
                        } else {
                            stageSkillAdd(fighter.id, skill.name);
                        }
                        renderFighterView(fighter);
                    });
                    return;
                }

                if (skill.id === 313) {
                    // Animal Handling - prompt for animal type
                    const animal = prompt('Introduce el tipo de animal para Trato con Animales (ej. Caballo, Perro, Lobo):');
                    if (animal && animal.trim()) {
                        stageSkillAdd(fighter.id, `Animal Handling (${animal.trim()})`);
                    } else {
                        return;
                    }
                } else if (skill.id === 264) {
                    // Maneater - stage it, then show bonus skill picker
                    stageSkillAdd(fighter.id, skill.name);
                    showManeaterBonusSkillPicker(fighter);
                    return;
                } else if (skill.id === 1001) {
                    // Pupil of Nagash - stage it, then show Nagash spell picker
                    stageSkillAdd(fighter.id, skill.name);
                    showPupilOfNagashSpellPicker(fighter);
                    return;
                } else if (skill.id === 1203) {
                    // Twistkin - stage it, then show mutation picker at half cost
                    stageSkillAdd(fighter.id, skill.name);
                    showTwistkinMutationPicker(fighter);
                    return;
                } else if (skill.id === 1304) {
                    // Big Bully - stage it, then show Strength skill picker
                    stageSkillAdd(fighter.id, skill.name);
                    showBigBullyStrengthPicker(fighter);
                    return;
                } else if (skill.id === 1403) {
                    // Dark Arts - stage it, then show Dark Arts spell picker
                    stageSkillAdd(fighter.id, skill.name);
                    showDarkArtsSpellPicker(fighter);
                    return;
                } else if (skill.id === 1676) {
                    // Nehekhara's Noble Blood - stage it, then show Noble Blood spell picker
                    stageSkillAdd(fighter.id, skill.name);
                    showNobleBloodSpellPicker(fighter);
                    return;
                } else {
                    stageSkillAdd(fighter.id, skill.name);
                }
                renderFighterView(fighter);
            });

            skillsDiv.appendChild(skillEl);
        });

        listContainer.appendChild(catHeader);
        listContainer.appendChild(skillsDiv);
    }

    container.appendChild(listContainer);
}

// ─── Maneater Bonus Skill Picker ────────────────────────────────────────────
/** Shows a filtered skill picker for the Maneater bonus (Shooting + Academic only) */
function showManeaterBonusSkillPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header with back button (back = cancel = unstage Maneater)
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="maneater-bonus-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Cancelar</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Elegir Habilidad Adicional (Comehombres)</h3>
    `;
    container.appendChild(header);
    header.querySelector('#maneater-bonus-back-btn').addEventListener('click', () => {
        // Cancel: unstage the Maneater skill and go back
        removeStageSkillAdd(fighter.id, 'Maneater');
        renderFighterView(fighter);
    });

    // Info banner
    const info = document.createElement('div');
    info.className = 'mb-4 p-3 bg-slate-800 rounded-lg border border-mordheim-gold/30';
    info.innerHTML = `
        <p class="text-sm text-slate-300">
            <i class="fas fa-info-circle text-mordheim-gold mr-1"></i>
            La habilidad Comehombres otorga una habilidad gratuita de las listas de <span class="text-mordheim-gold font-semibold">Disparo</span> o 
            <span class="text-mordheim-gold font-semibold">Académicas</span>.
        </p>
    `;
    container.appendChild(info);

    // Filter to only Shooting and Academic general skills, excluding already-owned
    const bonusSkills = SKILLS.filter(skill =>
        skill.type === 'General' &&
        (skill.category === 'Shooting' || skill.category === 'Academic') &&
        !fighterHasSkill(fighter, skill.name)
    );

    // Group by category
    const groupedSkills = bonusSkills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-2';

    for (const category in groupedSkills) {
        const categoryId = `maneater-${category.replace(/\s+/g, '-')}`;

        // Category header
        const catHeader = document.createElement('div');
        catHeader.className = 'flex items-center justify-between cursor-pointer text-lg font-semibold text-mordheim-gold mt-3 hover:text-yellow-400 transition p-2 bg-slate-800 rounded-lg';
        catHeader.innerHTML = `
            <span>${translateSkillCategory(category)}</span>
            <i class="fas fa-chevron-down transition-transform" id="adv-chevron-${categoryId}"></i>
        `;

        const skillsDiv = document.createElement('div');
        skillsDiv.id = `adv-skills-${categoryId}`;
        skillsDiv.className = 'mt-1 space-y-1'; // Start expanded

        catHeader.addEventListener('click', () => {
            skillsDiv.classList.toggle('hidden');
            const chevron = catHeader.querySelector('i');
            chevron.classList.toggle('fa-chevron-right');
            chevron.classList.toggle('fa-chevron-down');
        });

        groupedSkills[category].forEach(skill => {
            const skillEl = document.createElement('div');
            skillEl.className = 'p-3 rounded-lg cursor-pointer transition hover:bg-slate-700 bg-slate-800';
            skillEl.innerHTML = `
                <p class="font-semibold text-sm text-white">${translateSkill(skill.name)}</p>
                <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(skill.name)?.full || skill.rules || ''}</p>
            `;

            skillEl.addEventListener('click', () => {
                // Stage the bonus skill and record the Maneater link
                stageSkillAdd(fighter.id, skill.name);
                stageManeaterBonusSkill(fighter.id, 'Maneater', skill.name);
                renderFighterView(fighter);
            });

            skillsDiv.appendChild(skillEl);
        });

        listContainer.appendChild(catHeader);
        listContainer.appendChild(skillsDiv);
    }

    if (bonusSkills.length === 0) {
        listContainer.innerHTML = '<p class="text-slate-400 text-center py-4">No hay habilidades de Disparo o Académicas disponibles.</p>';
    }

    container.appendChild(listContainer);
}

// ─── Big Bully Bonus Strength Skill Picker ──────────────────────────────────
/** Shows a filtered skill picker for the Big Bully bonus (Strength only) */
function showBigBullyStrengthPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header with back button (back = cancel = unstage Big Bully)
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="big-bully-bonus-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Cancelar</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Elegir Habilidad de Fuerza (Matón)</h3>
    `;
    container.appendChild(header);
    header.querySelector('#big-bully-bonus-back-btn').addEventListener('click', () => {
        // Cancel: unstage the Big Bully skill and go back
        removeStageSkillAdd(fighter.id, 'Big Bully');
        renderFighterView(fighter);
    });

    // Info banner
    const info = document.createElement('div');
    info.className = 'mb-4 p-3 bg-slate-800 rounded-lg border border-mordheim-gold/30';
    info.innerHTML = `
        <p class="text-sm text-slate-300">
            <i class="fas fa-info-circle text-mordheim-gold mr-1"></i>
            La habilidad Matón otorga una habilidad gratuita de la lista de <span class="text-mordheim-gold font-semibold">Fuerza</span>.
        </p>
    `;
    container.appendChild(info);

    // Filter to only Strength general skills, excluding already-owned
    const bonusSkills = SKILLS.filter(skill =>
        skill.type === 'General' &&
        skill.category === 'Strength' &&
        !fighterHasSkill(fighter, skill.name)
    );

    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-1';

    bonusSkills.forEach(skill => {
        const skillEl = document.createElement('div');
        skillEl.className = 'p-3 rounded-lg cursor-pointer transition hover:bg-slate-700 bg-slate-800';
        skillEl.innerHTML = `
            <p class="font-semibold text-sm text-white">${translateSkill(skill.name)}</p>
            <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(skill.name)?.full || skill.rules || ''}</p>
        `;

        skillEl.addEventListener('click', () => {
            // Stage the bonus skill and record the Big Bully link
            stageSkillAdd(fighter.id, skill.name);
            stageBigBullyBonusSkill(fighter.id, 'Big Bully', skill.name);
            renderFighterView(fighter);
        });

        listContainer.appendChild(skillEl);
    });

    if (bonusSkills.length === 0) {
        listContainer.innerHTML = '<p class="text-slate-400 text-center py-4">No hay habilidades de Fuerza disponibles.</p>';
    }

    container.appendChild(listContainer);
}

// ─── Twistkin Mutation Picker ───────────────────────────────────────────────
/** Shows a mutation picker for the Twistkin skill (mutations at half cost) */
function showTwistkinMutationPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Twistkin mutation IDs (233-241)
    const TWISTKIN_MUTATION_IDS = [233, 234, 235, 236, 237, 238, 239, 240, 241];

    // Header with back button (back = cancel = unstage Twistkin)
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="twistkin-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Cancelar</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Elegir una Mutación (Twistkin)</h3>
    `;
    container.appendChild(header);
    header.querySelector('#twistkin-back-btn').addEventListener('click', () => {
        // Cancel: unstage the Twistkin skill and go back
        removeStageSkillAdd(fighter.id, 'Twistkin');
        renderFighterView(fighter);
    });

    // Treasury info banner
    const currentGC = currentWarband.gc_treasury || 0;
    const info = document.createElement('div');
    info.className = 'mb-4 p-3 bg-slate-800 rounded-lg border border-mordheim-gold/30';
    info.innerHTML = `
        <p class="text-sm text-slate-300">
            <i class="fas fa-info-circle text-mordheim-gold mr-1"></i>
            La habilidad Twistkin te permite adquirir una <span class="text-mordheim-gold font-semibold">Mutación</span> a 
            <span class="text-mordheim-gold font-semibold">mitad de precio</span>.
        </p>
        <p class="text-sm text-slate-400 mt-1">
            <i class="fas fa-coins text-yellow-400 mr-1"></i>
            Tesorería: <span class="text-yellow-200 font-semibold">${currentGC} CO</span>
        </p>
    `;
    container.appendChild(info);

    // Get mutation equipment data
    const mutations = MASTER_EQUIPMENT_LIST.filter(item => TWISTKIN_MUTATION_IDS.includes(item.id));

    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[60vh] overflow-y-auto custom-scroll space-y-2';

    mutations.forEach(mutation => {
        const halfCost = Math.ceil(mutation.baseCost / 2);
        const canAfford = currentGC >= halfCost;

        const mutationEl = document.createElement('div');
        mutationEl.className = `p-3 rounded-lg transition ${canAfford ? 'cursor-pointer hover:bg-slate-700 bg-slate-800' : 'bg-slate-800 opacity-50 cursor-not-allowed'}`;
        mutationEl.innerHTML = `
            <div class="flex justify-between items-center">
                <p class="font-semibold text-sm ${canAfford ? 'text-white' : 'text-slate-500'}">${translateEquipment(mutation.name)}</p>
                <div class="flex items-center gap-2">
                    <span class="text-xs text-slate-500 line-through">${mutation.baseCost} CO</span>
                    <span class="text-sm font-semibold ${canAfford ? 'text-mordheim-gold' : 'text-red-400'}">${halfCost} CO</span>
                </div>
            </div>
            <p class="text-xs text-slate-400 mt-1">${translateEquipmentRules(mutation.name, mutation.rules)}</p>
            ${!canAfford ? '<p class="text-xs text-red-400 mt-1"><i class="fas fa-exclamation-triangle mr-1"></i>Fondos insuficientes</p>' : ''}
        `;

        if (canAfford) {
            mutationEl.addEventListener('click', () => {
                // Stage the equipment purchase
                stageTwistkinEquipment(fighter.id, mutation.id, mutation.name, halfCost);
                renderFighterView(fighter);
            });
        }

        listContainer.appendChild(mutationEl);
    });

    if (mutations.length === 0) {
        listContainer.innerHTML = '<p class="text-slate-400 text-center py-4">No hay mutaciones disponibles.</p>';
    }

    container.appendChild(listContainer);
}

// ─── Pupil of Nagash Spell Picker ───────────────────────────────────────────
/** Shows a spell picker for the Dreaded Scrolls of Nagash (triggered when Pupil of Nagash skill is selected) */
function showPupilOfNagashSpellPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header with cancel button (cancel = unstage Pupil of Nagash)
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="nagash-spell-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Cancelar</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Temidos Pergaminos de Nagash</h3>
    `;
    container.appendChild(header);
    header.querySelector('#nagash-spell-back-btn').addEventListener('click', () => {
        // Cancel: unstage the Pupil of Nagash skill and go back
        removeStageSkillAdd(fighter.id, 'Pupil of Nagash');
        renderFighterView(fighter);
    });

    // Info banner
    const info = document.createElement('div');
    info.className = 'mb-4 p-3 bg-slate-800 rounded-lg border border-mordheim-gold/30';
    info.innerHTML = `
        <p class="text-sm text-slate-300">
            <i class="fas fa-info-circle text-mordheim-gold mr-1"></i>
            La habilidad <span class="text-mordheim-gold font-semibold">Pupilo de Nagash</span> otorga la lista de hechizos 
            <span class="text-mordheim-gold font-semibold">Temidos Pergaminos de Nagash</span> y un hechizo gratuito.
            Selecciona tu primer hechizo a continuación.
        </p>
    `;
    container.appendChild(info);

    // Spell list from Dreaded Scrolls of Nagash
    const spells = MAGIC["Dreaded Scrolls of Nagash"] || [];
    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-2';

    spells.forEach(spell => {
        const isKnown = fighterHasSpell(fighter, spell.name);
        const spellEl = document.createElement('div');
        spellEl.className = `p-3 rounded-lg transition border border-slate-600 ${isKnown ? 'opacity-50 cursor-not-allowed bg-slate-700' : 'hover:bg-slate-700 cursor-pointer bg-slate-800'}`;
        spellEl.innerHTML = `
            <p class="font-semibold text-sm text-white">${translateSkill(spell.name)}</p>
            <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(spell.name)?.full || spell.description || ''}</p>
            <p class="text-xs text-indigo-400 mt-1">Dificultad: ${spell.difficulty === 'Auto' ? 'Automática' : spell.difficulty}</p>
            ${isKnown ? '<p class="text-xs text-red-400 mt-1">Ya conocido</p>' : ''}
        `;

        if (!isKnown) {
            spellEl.addEventListener('click', () => {
                // Stage the spell and record the Pupil of Nagash coupling
                stageSpellAdd(fighter.id, spell.name);
                stagePupilOfNagashSpell(fighter.id, 'Pupil of Nagash', spell.name);
                renderFighterView(fighter);
            });
        }

        listContainer.appendChild(spellEl);
    });

    if (spells.length === 0) {
        listContainer.innerHTML = '<p class="text-slate-400 text-center py-4">No hay hechizos de los Pergaminos Malditos de Nagash disponibles.</p>';
    }

    container.appendChild(listContainer);
}

// ─── Dark Arts Spell Picker ─────────────────────────────────────────────────
/** Shows a spell picker for Dark Arts (triggered when Dark Arts skill is selected) */
function showDarkArtsSpellPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header with cancel button (cancel = unstage Dark Arts)
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="dark-arts-spell-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Cancelar</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Artes Oscuras</h3>
    `;
    container.appendChild(header);
    header.querySelector('#dark-arts-spell-back-btn').addEventListener('click', () => {
        // Cancel: unstage the Dark Arts skill and go back
        removeStageSkillAdd(fighter.id, 'Dark Arts');
        renderFighterView(fighter);
    });

    // Info banner
    const info = document.createElement('div');
    info.className = 'mb-4 p-3 bg-slate-800 rounded-lg border border-mordheim-gold/30';
    info.innerHTML = `
        <p class="text-sm text-slate-300">
            <i class="fas fa-info-circle text-mordheim-gold mr-1"></i>
            La habilidad <span class="text-mordheim-gold font-semibold">Artes Oscuras</span> otorga la lista de hechizos 
            <span class="text-mordheim-gold font-semibold">Artes Oscuras</span> y un hechizo gratuito.
            Selecciona tu primer hechizo a continuación.
        </p>
    `;
    container.appendChild(info);

    // Spell list from Dark Arts
    const spells = MAGIC["Dark Arts"] || [];
    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-2';

    spells.forEach(spell => {
        const isKnown = fighterHasSpell(fighter, spell.name);
        const spellEl = document.createElement('div');
        spellEl.className = `p-3 rounded-lg transition border border-slate-600 ${isKnown ? 'opacity-50 cursor-not-allowed bg-slate-700' : 'hover:bg-slate-700 cursor-pointer bg-slate-800'}`;
        spellEl.innerHTML = `
            <p class="font-semibold text-sm text-white">${translateSkill(spell.name)}</p>
            <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(spell.name)?.full || spell.description || ''}</p>
            <p class="text-xs text-indigo-400 mt-1">Dificultad: ${spell.difficulty === 'Auto' ? 'Automática' : spell.difficulty}</p>
            ${isKnown ? '<p class="text-xs text-red-400 mt-1">Ya conocido</p>' : ''}
        `;

        if (!isKnown) {
            spellEl.addEventListener('click', () => {
                // Stage the spell and record the Dark Arts coupling
                stageSpellAdd(fighter.id, spell.name);
                stageDarkArtsSpell(fighter.id, 'Dark Arts', spell.name);
                renderFighterView(fighter);
            });
        }

        listContainer.appendChild(spellEl);
    });

    if (spells.length === 0) {
        listContainer.innerHTML = '<p class="text-slate-400 text-center py-4">No hay hechizos de Artes Oscuras disponibles.</p>';
    }

    container.appendChild(listContainer);
}

// ─── Noble Blood Spell Picker ───────────────────────────────────────────────
/** Shows a spell picker for Nehekhara's Noble Blood (triggered when the skill is selected) */
function showNobleBloodSpellPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header with cancel button (cancel = unstage Nehekhara's Noble Blood)
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="noble-blood-spell-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Cancelar</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Sangre Noble de Nehekhara</h3>
    `;
    container.appendChild(header);
    header.querySelector('#noble-blood-spell-back-btn').addEventListener('click', () => {
        // Cancel: unstage the skill and go back
        removeStageSkillAdd(fighter.id, "Nehekhara's Noble Blood");
        renderFighterView(fighter);
    });

    // Info banner
    const info = document.createElement('div');
    info.className = 'mb-4 p-3 bg-slate-800 rounded-lg border border-mordheim-gold/30';
    info.innerHTML = `
        <p class="text-sm text-slate-300">
            <i class="fas fa-info-circle text-mordheim-gold mr-1"></i>
            La habilidad <span class="text-mordheim-gold font-semibold">Sangre Noble de Nehekhara</span> otorga un hechizo adicional gratuito.
            Selecciona tu hechizo a continuación.
        </p>
    `;
    container.appendChild(info);

    // Get available spells from the fighter's existing spell schools
    const { groups } = getAvailableSpellsForFighter(fighter);

    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-3';

    groups.forEach(group => {
        const groupSection = document.createElement('div');
        groupSection.className = 'bg-slate-800 rounded-lg p-3 border border-slate-600';

        const groupTitle = document.createElement('h5');
        groupTitle.className = 'text-md font-semibold text-mordheim-gold mb-2';
        groupTitle.textContent = group.name;
        groupSection.appendChild(groupTitle);

        group.spells.forEach(spell => {
            const isKnown = fighterHasSpell(fighter, spell);
            const spellEl = document.createElement('div');
            spellEl.className = `p-3 rounded-lg transition border border-slate-600 ${isKnown ? 'opacity-50 cursor-not-allowed bg-slate-700' : 'hover:bg-slate-700 cursor-pointer bg-slate-800'}`;
            spellEl.innerHTML = `
                <p class="font-semibold text-sm text-white">${translateSkill(spell)}</p>
                <p class="text-xs text-slate-400 mt-1">${isKnown ? 'Ya conocido' : 'Haz clic para aprender'}</p>
            `;

            if (!isKnown) {
                spellEl.addEventListener('click', () => {
                    // Stage the spell and record the Noble Blood coupling
                    stageSpellAdd(fighter.id, spell);
                    stageNobleBloodSpell(fighter.id, "Nehekhara's Noble Blood", spell);
                    renderFighterView(fighter);
                });
            }

            groupSection.appendChild(spellEl);
        });

        listContainer.appendChild(groupSection);
    });

    if (groups.length === 0) {
        listContainer.innerHTML = '<p class="text-slate-400 text-center py-4">No hay hechizos disponibles para este guerrero.</p>';
    }

    container.appendChild(listContainer);
}

// ─── Spell Picker ───────────────────────────────────────────────────────────
function showSpellPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="spell-picker-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Volver</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Elegir un Hechizo</h3>
    `;
    container.appendChild(header);
    header.querySelector('#spell-picker-back-btn').addEventListener('click', () => renderFighterView(fighter));

    const { groups } = getAvailableSpellsForFighter(fighter);

    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-3';

    groups.forEach(group => {
        const groupSection = document.createElement('div');
        groupSection.className = 'bg-slate-800 rounded-lg p-3 border border-slate-600';

        const groupTitle = document.createElement('h5');
        groupTitle.className = 'text-md font-semibold text-mordheim-gold mb-2';
        groupTitle.textContent = translateSkillCategory(group.name);
        groupSection.appendChild(groupTitle);

        group.spells.forEach(spell => {
            const isKnown = fighterHasSpell(fighter, spell);
            const spellEl = document.createElement('div');
            spellEl.className = `p-2 rounded-lg transition ${isKnown ? 'opacity-50 cursor-not-allowed bg-slate-700' : 'hover:bg-slate-700 cursor-pointer'}`;
            spellEl.innerHTML = `
                <p class="font-semibold text-sm">${translateSkill(spell)}</p>
                <p class="text-xs text-slate-400">${isKnown ? 'Ya conocido' : 'Clic para aprender'}</p>
            `;

            if (!isKnown) {
                spellEl.addEventListener('click', () => {
                    stageSpellAdd(fighter.id, spell);
                    renderFighterView(fighter);
                });
            }

            groupSection.appendChild(spellEl);
        });

        listContainer.appendChild(groupSection);
    });

    if (groups.length === 0) {
        listContainer.innerHTML = '<p class="text-slate-400 text-center py-4">No hay hechizos disponibles para este guerrero.</p>';
    }

    container.appendChild(listContainer);
}

// ─── Lads Got Talent Picker ─────────────────────────────────────────────────
function showLadsGotTalentPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="lads-picker-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Volver</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Este Chico Vale</h3>
    `;
    container.appendChild(header);
    header.querySelector('#lads-picker-back-btn').addEventListener('click', () => renderFighterView(fighter));

    // Description
    const desc = document.createElement('p');
    desc.className = 'text-slate-300 mb-4 text-sm';
    desc.textContent = 'Selecciona exactamente dos categorías de habilidad para el héroe ascendido. Determinarán qué habilidades podrá aprender.';
    container.appendChild(desc);

    // Get available categories
    const warbandData = getWarbandData(currentWarband.type);
    const heroCategories = new Set();
    if (warbandData && warbandData.warriors) {
        warbandData.warriors.forEach(warrior => {
            if (warrior.type === 'hero' && warrior.skills) {
                warrior.skills.forEach(category => {
                    if (['Combat', 'Shooting', 'Academic', 'Strength', 'Speed', 'Cavalry'].includes(category)) {
                        heroCategories.add(category);
                    }
                });
            }
        });
    }

    const categories = Array.from(heroCategories).sort();
    const selectedCategories = [];

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-2 gap-3 mb-6';

    categories.forEach(category => {
        const catEl = document.createElement('div');
        catEl.className = 'p-3 rounded-lg border-2 border-slate-600 hover:border-mordheim-gold cursor-pointer transition text-center';
        catEl.innerHTML = `<p class="font-semibold text-mordheim-gold">${translateSkillCategory(category)}</p>`;
        catEl.addEventListener('click', () => {
            if (catEl.classList.contains('selected')) {
                catEl.classList.remove('selected', 'border-green-500', 'bg-green-900');
                catEl.classList.add('border-slate-600');
                selectedCategories.splice(selectedCategories.indexOf(category), 1);
            } else if (selectedCategories.length < 2) {
                catEl.classList.add('selected', 'border-green-500', 'bg-green-900');
                catEl.classList.remove('border-slate-600');
                selectedCategories.push(category);
            }
            confirmBtn.disabled = selectedCategories.length !== 2;
            confirmBtn.classList.toggle('opacity-50', selectedCategories.length !== 2);
        });
        grid.appendChild(catEl);
    });

    container.appendChild(grid);

    // Confirm button
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'w-full py-2 px-4 bg-mordheim-gold text-slate-900 font-bold rounded-lg hover:bg-yellow-600 transition opacity-50';
    confirmBtn.textContent = 'Confirmar Selección';
    confirmBtn.disabled = true;
    confirmBtn.addEventListener('click', () => {
        if (selectedCategories.length === 2) {
            stageLadsGotTalent(fighter.id, selectedCategories);
            // Check for Clan Skryre special LGT rule — spell pick replaces hero advancement
            const rules = fighter.special_rules ?
                (typeof fighter.special_rules === 'string' ? fighter.special_rules.split(';').map(r => r.trim()) : fighter.special_rules)
                : [];
            if (rules.includes('Clan Skryre The Lads Got Talent')) {
                showSkryreSpellPicker(fighter);
            } else if (rules.includes('Harnessed')) {
                showHarnessedAdvancementPicker(fighter, selectedCategories);
            } else {
                showLadsHeroAdvancementPicker(fighter, selectedCategories);
            }
        }
    });
    container.appendChild(confirmBtn);
}

// ─── Lads Got Talent: Hero Advancement Picker ───────────────────────────────
function showLadsHeroAdvancementPicker(fighter, selectedCategories) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="lads-hero-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Volver</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Avance de Héroe</h3>
    `;
    container.appendChild(header);
    header.querySelector('#lads-hero-back-btn').addEventListener('click', () => renderFighterView(fighter));

    // Description
    const desc = document.createElement('p');
    desc.className = 'text-slate-300 mb-4 text-sm';
    desc.textContent = 'El héroe ascendido ahora puede realizar un avance de Héroe. Elige un incremento de atributo o una habilidad de las categorías seleccionadas.';
    container.appendChild(desc);

    // ── Stat Increase Section ──
    const statSection = document.createElement('div');
    statSection.className = 'bg-slate-800 rounded-lg p-4 mb-4';
    statSection.innerHTML = `<h4 class="text-sm font-semibold text-mordheim-gold mb-3 uppercase tracking-wide">Incremento de Atributo</h4>`;

    const statsGrid = document.createElement('div');
    statsGrid.className = 'grid grid-cols-3 sm:grid-cols-5 gap-2';

    const maximums = RACIAL_MAXIMUMS[fighter.race] || {};

    STATS_FIELDS.forEach(stat => {
        let baseVal = 0;
        if (typeof fighter.stats === 'object' && !Array.isArray(fighter.stats)) {
            const statLineKeys = Object.keys(fighter.stats);
            const isMultiStat = statLineKeys.every(k => typeof fighter.stats[k] === 'object' && !Array.isArray(fighter.stats[k]));
            if (isMultiStat) {
                const firstKey = statLineKeys[0];
                baseVal = fighter.stats[firstKey][stat] || 0;
            } else {
                baseVal = fighter.stats[stat] || 0;
            }
        }
        const isMaxed = isIgnoreRacialMaximumsActive ? false : baseVal >= (maximums[stat] || 99);

        const btn = document.createElement('button');
        btn.className = `p-2 rounded-lg text-white font-semibold text-sm transition ${isMaxed ? 'bg-slate-600 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`;
        btn.textContent = `+1 ${stat}`;
        btn.disabled = isMaxed;
        if (!isMaxed) {
            btn.addEventListener('click', () => {
                stageLadsHeroAdvancement(fighter.id, { type: 'stat', stat });
                renderFighterView(fighter);
            });
        }
        statsGrid.appendChild(btn);
    });

    statSection.appendChild(statsGrid);
    container.appendChild(statSection);

    // ── Skill Section ──
    const skillSection = document.createElement('div');
    skillSection.className = 'bg-slate-800 rounded-lg p-4 mb-4';
    skillSection.innerHTML = `<h4 class="text-sm font-semibold text-mordheim-gold mb-3 uppercase tracking-wide">Elegir una Habilidad</h4>`;

    // Get skills filtered to the two selected categories
    const warbandName = currentWarband.type.split(':')[0].trim();

    // Helper: check if a single category string matches the warband name.
    // Uses includes() for substring matching (e.g. "Beastmen Raiders" includes "Beastmen"),
    // but excludes generic parent categories that should not bleed into sub-warbands.
    const categoryMatchesWarband = (cat) => {
        if (cat === 'Skaven' && warbandName !== 'Skaven') return false;
        if (cat === 'Night Goblins' && warbandName !== 'Night Goblins') return false;
        return warbandName.includes(cat);
    };

    const availableSkills = SKILLS.filter(skill => {
        const isGeneralSkill = skill.type === 'General' && selectedCategories.includes(skill.category);
        const isWarbandSkill = skill.type === 'Warband Specific' &&
            selectedCategories.includes('Special') &&
            ((!Array.isArray(skill.category) && categoryMatchesWarband(skill.category)) ||
                (Array.isArray(skill.category) && skill.category.some(cat => categoryMatchesWarband(cat))));
        return isGeneralSkill || isWarbandSkill;
    });

    if (availableSkills.length === 0) {
        const noSkills = document.createElement('p');
        noSkills.className = 'text-slate-400 text-sm italic';
        noSkills.textContent = 'No hay habilidades disponibles para las categorías seleccionadas.';
        skillSection.appendChild(noSkills);
    } else {
        // Group by category
        const groupedSkills = availableSkills.reduce((acc, skill) => {
            let groupKey = skill.type === 'Warband Specific' ? 'Special' : skill.category;
            if (!acc[groupKey]) acc[groupKey] = [];
            acc[groupKey].push(skill);
            return acc;
        }, {});

        const listContainer = document.createElement('div');
        listContainer.className = 'max-h-[40vh] overflow-y-auto custom-scroll space-y-2';

        for (const category in groupedSkills) {
            const categoryId = `lads-hero-${category.replace(/\s+/g, '-')}`;

            const catHeader = document.createElement('div');
            catHeader.className = 'flex items-center justify-between cursor-pointer text-base font-semibold text-mordheim-gold mt-2 hover:text-yellow-400 transition p-2 bg-slate-700 rounded-lg';
            catHeader.innerHTML = `
                <span>${translateSkillCategory(category)}</span>
                <i class="fas fa-chevron-right transition-transform" id="chevron-${categoryId}"></i>
            `;

            const skillsDiv = document.createElement('div');
            skillsDiv.id = `skills-${categoryId}`;
            skillsDiv.className = 'hidden mt-1 space-y-1';

            catHeader.addEventListener('click', () => {
                skillsDiv.classList.toggle('hidden');
                const chevron = catHeader.querySelector('i');
                chevron.classList.toggle('fa-chevron-right');
                chevron.classList.toggle('fa-chevron-down');
            });

            groupedSkills[category].forEach(skill => {
                const alreadyHas = fighterHasSkill(fighter, skill.name);

                const skillEl = document.createElement('div');
                skillEl.className = `p-3 rounded-lg cursor-pointer transition hover:bg-slate-600 bg-slate-800 ${alreadyHas ? 'border border-red-500' : ''}`;

                let warningHtml = '';
                if (alreadyHas) {
                    warningHtml = '<span class="text-xs text-red-400 ml-2"><i class="fas fa-exclamation-triangle"></i> Ya seleccionada</span>';
                }

                skillEl.innerHTML = `
                    <div class="flex items-center">
                        <p class="font-semibold text-sm text-white">${translateSkill(skill.name)}</p>
                        ${warningHtml}
                    </div>
                    <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(skill.name)?.full || skill.rules || ''}</p>
                `;

                skillEl.addEventListener('click', () => {
                    stageLadsHeroAdvancement(fighter.id, { type: 'skill', skillName: skill.name });
                    renderFighterView(fighter);
                });

                skillsDiv.appendChild(skillEl);
            });

            listContainer.appendChild(catHeader);
            listContainer.appendChild(skillsDiv);
        }

        skillSection.appendChild(listContainer);
    }

    container.appendChild(skillSection);

    // Skip button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'w-full py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition text-sm';
    skipBtn.innerHTML = '<i class="fas fa-forward mr-1"></i> Omitir Avance de Héroe';
    skipBtn.addEventListener('click', () => renderFighterView(fighter));
    container.appendChild(skipBtn);
}

// ─── Harnessed: Combined Spell/Skill/Stat Picker ────────────────────────────
function showHarnessedAdvancementPicker(fighter, selectedCategories) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="harnessed-picker-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Volver</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Avance de Héroe (Harnessed)</h3>
    `;
    container.appendChild(header);
    header.querySelector('#harnessed-picker-back-btn').addEventListener('click', () => renderFighterView(fighter));

    // Description
    const desc = document.createElement('p');
    desc.className = 'text-slate-300 mb-4 text-sm';
    desc.textContent = 'Elige una opción: un hechizo de los saberes disponibles, una habilidad o un incremento de atributo.';
    container.appendChild(desc);

    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-4';

    // ── Spell Section ──
    const spellSection = document.createElement('div');
    spellSection.className = 'bg-slate-800 rounded-lg p-4';
    spellSection.innerHTML = `<h4 class="text-sm font-semibold text-mordheim-gold mb-3 uppercase tracking-wide"><i class="fas fa-hat-wizard mr-1"></i> Elegir un Hechizo</h4>`;

    const harnessedLores = ['Lesser Magic', 'Elemental Lore of Water', 'Elemental Lore of Fire', 'Elemental Lore of Earth', 'Elemental Lore of Air'];
    const spellListContainer = document.createElement('div');
    spellListContainer.className = 'space-y-2';

    harnessedLores.forEach(loreName => {
        const spells = MAGIC[loreName] || [];
        if (spells.length === 0) return;

        const loreId = `harnessed-lore-${loreName.replace(/\s+/g, '-')}`;

        const loreHeader = document.createElement('div');
        loreHeader.className = 'flex items-center justify-between cursor-pointer text-base font-semibold text-mordheim-gold mt-1 hover:text-yellow-400 transition p-2 bg-slate-700 rounded-lg';
        loreHeader.innerHTML = `
            <span>${translateSkillCategory(loreName)}</span>
            <i class="fas fa-chevron-right transition-transform" id="chevron-${loreId}"></i>
        `;

        const spellsDiv = document.createElement('div');
        spellsDiv.id = `spells-${loreId}`;
        spellsDiv.className = 'hidden mt-1 space-y-1';

        loreHeader.addEventListener('click', () => {
            spellsDiv.classList.toggle('hidden');
            const chevron = loreHeader.querySelector('i');
            chevron.classList.toggle('fa-chevron-right');
            chevron.classList.toggle('fa-chevron-down');
        });

        spells.forEach(spell => {
            const spellEl = document.createElement('div');
            spellEl.className = 'p-3 rounded-lg cursor-pointer transition hover:bg-slate-600 bg-slate-800 border border-slate-600';
            spellEl.innerHTML = `
                <p class="font-semibold text-sm text-white">${translateSkill(spell.name)}</p>
                <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(spell.name)?.full || spell.description || ''}</p>
                <p class="text-xs text-indigo-400 mt-1">Dificultad: ${spell.difficulty === 'Auto' ? 'Automática' : spell.difficulty}</p>
            `;
            spellEl.addEventListener('click', () => {
                stageLadsHarnessedSpell(fighter.id, spell.name);
                renderFighterView(fighter);
            });
            spellsDiv.appendChild(spellEl);
        });

        spellListContainer.appendChild(loreHeader);
        spellListContainer.appendChild(spellsDiv);
    });

    spellSection.appendChild(spellListContainer);
    scrollContainer.appendChild(spellSection);

    // ── Stat Increase Section ──
    const statSection = document.createElement('div');
    statSection.className = 'bg-slate-800 rounded-lg p-4';
    statSection.innerHTML = `<h4 class="text-sm font-semibold text-mordheim-gold mb-3 uppercase tracking-wide"><i class="fas fa-arrow-up mr-1"></i> Incremento de Atributo</h4>`;

    const statsGrid = document.createElement('div');
    statsGrid.className = 'grid grid-cols-3 sm:grid-cols-5 gap-2';

    const maximums = RACIAL_MAXIMUMS[fighter.race] || {};

    STATS_FIELDS.forEach(stat => {
        let baseVal = 0;
        if (typeof fighter.stats === 'object' && !Array.isArray(fighter.stats)) {
            const statLineKeys = Object.keys(fighter.stats);
            const isMultiStat = statLineKeys.every(k => typeof fighter.stats[k] === 'object' && !Array.isArray(fighter.stats[k]));
            if (isMultiStat) {
                const firstKey = statLineKeys[0];
                baseVal = fighter.stats[firstKey][stat] || 0;
            } else {
                baseVal = fighter.stats[stat] || 0;
            }
        }
        const isMaxed = isIgnoreRacialMaximumsActive ? false : baseVal >= (maximums[stat] || 99);

        const btn = document.createElement('button');
        btn.className = `p-2 rounded-lg text-white font-semibold text-sm transition ${isMaxed ? 'bg-slate-600 opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`;
        btn.textContent = `+1 ${stat}`;
        btn.disabled = isMaxed;
        if (!isMaxed) {
            btn.addEventListener('click', () => {
                stageLadsHeroAdvancement(fighter.id, { type: 'stat', stat });
                renderFighterView(fighter);
            });
        }
        statsGrid.appendChild(btn);
    });

    statSection.appendChild(statsGrid);
    scrollContainer.appendChild(statSection);

    // ── Skill Section ──
    const skillSection = document.createElement('div');
    skillSection.className = 'bg-slate-800 rounded-lg p-4';
    skillSection.innerHTML = `<h4 class="text-sm font-semibold text-mordheim-gold mb-3 uppercase tracking-wide"><i class="fas fa-book mr-1"></i> Elegir una Habilidad</h4>`;

    const warbandName = currentWarband.type.split(':')[0].trim();

    const categoryMatchesWarband = (cat) => {
        if (cat === 'Skaven' && warbandName !== 'Skaven') return false;
        if (cat === 'Night Goblins' && warbandName !== 'Night Goblins') return false;
        return warbandName.includes(cat);
    };

    const availableSkills = SKILLS.filter(skill => {
        const isGeneralSkill = skill.type === 'General' && selectedCategories.includes(skill.category);
        const isWarbandSkill = skill.type === 'Warband Specific' &&
            selectedCategories.includes('Special') &&
            ((!Array.isArray(skill.category) && categoryMatchesWarband(skill.category)) ||
                (Array.isArray(skill.category) && skill.category.some(cat => categoryMatchesWarband(cat))));
        return isGeneralSkill || isWarbandSkill;
    });

    if (availableSkills.length === 0) {
        const noSkills = document.createElement('p');
        noSkills.className = 'text-slate-400 text-sm italic';
        noSkills.textContent = 'No hay habilidades disponibles para las categorías seleccionadas.';
        skillSection.appendChild(noSkills);
    } else {
        const groupedSkills = availableSkills.reduce((acc, skill) => {
            let groupKey = skill.type === 'Warband Specific' ? 'Special' : skill.category;
            if (!acc[groupKey]) acc[groupKey] = [];
            acc[groupKey].push(skill);
            return acc;
        }, {});

        const listContainer = document.createElement('div');
        listContainer.className = 'space-y-2';

        for (const category in groupedSkills) {
            const categoryId = `harnessed-skill-${category.replace(/\s+/g, '-')}`;

            const catHeader = document.createElement('div');
            catHeader.className = 'flex items-center justify-between cursor-pointer text-base font-semibold text-mordheim-gold mt-2 hover:text-yellow-400 transition p-2 bg-slate-700 rounded-lg';
            catHeader.innerHTML = `
                <span>${translateSkillCategory(category)}</span>
                <i class="fas fa-chevron-right transition-transform" id="chevron-${categoryId}"></i>
            `;

            const skillsDiv = document.createElement('div');
            skillsDiv.id = `skills-${categoryId}`;
            skillsDiv.className = 'hidden mt-1 space-y-1';

            catHeader.addEventListener('click', () => {
                skillsDiv.classList.toggle('hidden');
                const chevron = catHeader.querySelector('i');
                chevron.classList.toggle('fa-chevron-right');
                chevron.classList.toggle('fa-chevron-down');
            });

            groupedSkills[category].forEach(skill => {
                const alreadyHas = fighterHasSkill(fighter, skill.name);

                const skillEl = document.createElement('div');
                skillEl.className = `p-3 rounded-lg cursor-pointer transition hover:bg-slate-600 bg-slate-800 ${alreadyHas ? 'border border-red-500' : ''}`;

                let warningHtml = '';
                if (alreadyHas) {
                    warningHtml = '<span class="text-xs text-red-400 ml-2"><i class="fas fa-exclamation-triangle"></i> Ya seleccionada</span>';
                }

                skillEl.innerHTML = `
                    <div class="flex items-center">
                        <p class="font-semibold text-sm text-white">${translateSkill(skill.name)}</p>
                        ${warningHtml}
                    </div>
                    <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(skill.name)?.full || skill.rules || ''}</p>
                `;

                skillEl.addEventListener('click', () => {
                    stageLadsHeroAdvancement(fighter.id, { type: 'skill', skillName: skill.name });
                    renderFighterView(fighter);
                });

                skillsDiv.appendChild(skillEl);
            });

            listContainer.appendChild(catHeader);
            listContainer.appendChild(skillsDiv);
        }

        skillSection.appendChild(listContainer);
    }

    scrollContainer.appendChild(skillSection);

    // Skip button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'w-full py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition text-sm mt-2';
    skipBtn.innerHTML = '<i class="fas fa-forward mr-1"></i> Omitir Avance de Héroe';
    skipBtn.addEventListener('click', () => renderFighterView(fighter));
    scrollContainer.appendChild(skipBtn);

    container.appendChild(scrollContainer);
}

// ─── Clan Skryre: Mandatory Spell Picker ────────────────────────────────────
function showSkryreSpellPicker(fighter) {
    const container = document.getElementById('advancement-hub-content');
    if (!container) return;

    container.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4 border-b border-slate-600 pb-2';
    header.innerHTML = `
        <button id="skryre-spell-back-btn" class="text-slate-300 hover:text-white transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i>
            <span class="text-sm">Volver</span>
        </button>
        <h3 class="text-xl font-bold text-mordheim-gold">Magia de la Rata Cornuda</h3>
    `;
    container.appendChild(header);
    header.querySelector('#skryre-spell-back-btn').addEventListener('click', () => renderFighterView(fighter));

    // Description
    const desc = document.createElement('p');
    desc.className = 'text-slate-300 mb-4 text-sm';
    desc.textContent = 'El Iniciado ascendido debe seleccionar un hechizo de la Magia de la Rata Cornuda.';
    container.appendChild(desc);

    // Spell list
    const spells = MAGIC["Magic of the Horned Rat"] || [];
    const listContainer = document.createElement('div');
    listContainer.className = 'max-h-[65vh] overflow-y-auto custom-scroll space-y-2';

    spells.forEach(spell => {
        const spellEl = document.createElement('div');
        spellEl.className = 'p-3 rounded-lg cursor-pointer transition hover:bg-slate-600 bg-slate-800 border border-slate-600';
        spellEl.innerHTML = `
            <p class="font-semibold text-sm text-white">${translateSkill(spell.name)}</p>
            <p class="text-xs text-slate-400 mt-1">${getSpecialRuleSummary(spell.name)?.full || spell.description || ''}</p>
            <p class="text-xs text-indigo-400 mt-1">Dificultad: ${spell.difficulty === 'Auto' ? 'Automática' : spell.difficulty}</p>
        `;
        spellEl.addEventListener('click', () => {
            stageLadsSkryreSpell(fighter.id, spell.name);
            renderFighterView(fighter);
        });
        listContainer.appendChild(spellEl);
    });

    container.appendChild(listContainer);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getEffectiveStatValue(fighter, stat, changes) {
    let baseVal = 0;
    if (typeof fighter.stats === 'object' && !Array.isArray(fighter.stats)) {
        const statLineKeys = Object.keys(fighter.stats);
        const isMultiStat = statLineKeys.every(k => typeof fighter.stats[k] === 'object' && !Array.isArray(fighter.stats[k]));

        if (isMultiStat) {
            // Use first form's value for max checking
            const firstKey = statLineKeys[0];
            baseVal = fighter.stats[firstKey][stat] || 0;
        } else {
            baseVal = fighter.stats[stat] || 0;
        }
    }
    const stagedIncrease = changes.statChanges[stat] || 0;
    return baseVal + stagedIncrease;
}
