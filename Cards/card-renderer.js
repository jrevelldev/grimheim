/**
 * Card Rendering Engine
 * Renders high-fidelity, modular 63mm x 88mm fighter cards according to active layout settings.
 */

import { MASTER_EQUIPMENT_LIST, SKILLS, MASTER_INJURY_LIST } from '../data/index.js';
import { findSkillForWarband } from '../skill-lookup.js';
import { applyHeavyArmourShieldPenalty, applyPaviseMovementPenalty } from '../equiprules/armour.js';
import { STATS_FIELDS } from '../config.js';
import { calculateArmorSave, normalizeEquipment, getOriginalName, adjustEquipmentCosts } from '../utility.js';
import { isShieldMeleeIgnored } from '../state.js';
import { getStatLabel, translateEquipment, translateInjury, translateWarrior, translateRace, translateSpecialRule, translateSkill, getWeaponRuleSummary, getSpecialRuleSummary, formatMovementStat, getDistanceUnit } from '../i18n.js';

function escapeAttr(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Calculates modified stats for a fighter, taking into account equipment, skills, and injuries.
 */
export function calculateFighterStats(fighter, statLineKey = 'Fighter') {
    const isMultiStatLine = fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v));
    const baseSource = isMultiStatLine ? (fighter.stats[statLineKey] || {}) : (fighter.stats || {});
    const calculated = {};

    // Characteristic modifiers accumulator
    const characteristicModifiers = {};

    // Equipment modifiers
    (fighter.equipment || []).forEach(item => {
        const normalized = normalizeEquipment(item);
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === normalized.name);
        if (masterItem && masterItem.characteristicModifiers) {
            Object.keys(masterItem.characteristicModifiers).forEach(stat => {
                characteristicModifiers[stat] = (characteristicModifiers[stat] || 0) + masterItem.characteristicModifiers[stat];
            });
        }
    });

    // Skill modifiers
    if (fighter.skills && SKILLS) {
        fighter.skills.forEach(skillName => {
            const skill = findSkillForWarband(skillName, null, fighter);
            if (skill && skill.characteristicModifiers) {
                Object.keys(skill.characteristicModifiers).forEach(stat => {
                    characteristicModifiers[stat] = (characteristicModifiers[stat] || 0) + skill.characteristicModifiers[stat];
                });
            }
        });
    }

    // Injury modifiers (only to main Fighter stat line, not Mount/Vehicle parts)
    if (statLineKey === 'Fighter' && fighter.injuries && fighter.injuries.length > 0) {
        fighter.injuries.forEach(injuryName => {
            const injury = MASTER_INJURY_LIST.find(i => i.name === injuryName);
            if (injury && injury.characteristicModifiers) {
                Object.keys(injury.characteristicModifiers).forEach(stat => {
                    characteristicModifiers[stat] = (characteristicModifiers[stat] || 0) + injury.characteristicModifiers[stat];
                });
            }
        });
    }

    STATS_FIELDS.forEach(stat => {
        let statValue = baseSource[stat] !== undefined ? baseSource[stat] : '-';
        if (typeof statValue === 'number') {
            const modifier = characteristicModifiers[stat] || 0;
            statValue = Math.max(0, statValue + modifier);

            if (statLineKey === 'Fighter') {
                // armour.js expects the roster format: a '; '-separated string
                const rulesString = Array.isArray(fighter.special_rules)
                    ? fighter.special_rules.join('; ')
                    : (typeof fighter.special_rules === 'string' ? fighter.special_rules : '');
                const penaltyResult = applyHeavyArmourShieldPenalty(stat, statValue, fighter.equipment, rulesString, fighter.skills);
                statValue = penaltyResult.value;

                const paviseResult = applyPaviseMovementPenalty(stat, statValue, fighter.equipment);
                statValue = paviseResult.value;
            }
        }
        calculated[stat] = statValue;
    });

    return calculated;
}

/**
 * Generates the HTML for the Armour Save badge
 */
function renderArmourSaveBlock(fighter, options = {}) {
    if (fighter.isBlank || options.isMenuCard) {
        return `
            <div class="card-section card-armour-save">
                <span class="card-label">Salvación:</span>
                <span class="card-blank-line-field card-blank-save-field"></span>
            </div>
        `;
    }

    if (!fighter.equipment || fighter.equipment.length === 0) {
        return `
            <div class="card-section card-armour-save">
                <span class="card-label">Salvación:</span> <span class="card-val-subtle">Ninguna</span>
            </div>
        `;
    }

    const armorSave = calculateArmorSave(fighter.equipment, isShieldMeleeIgnored, fighter.skills || []);
    if (!armorSave) {
        return `
            <div class="card-section card-armour-save">
                <span class="card-label">Salvación:</span> <span class="card-val-subtle">Ninguna</span>
            </div>
        `;
    }

    let saveText = '';
    if (armorSave.isSplit && options?.showSplit !== false) {
        const melee = armorSave.melee.finalSaveValue === 7 ? 'Ninguna' : `${armorSave.melee.finalSaveValue}+`;
        const ranged = armorSave.ranged.finalSaveValue === 7 ? 'Ninguna' : `${armorSave.ranged.finalSaveValue}+`;
        saveText = `<span class="card-save-split">C.a C.: <strong>${melee}</strong> / Disparo: <strong>${ranged}</strong></span>`;
    } else {
        const basic = armorSave.basic.finalSaveValue === 7 ? 'Ninguna' : `${armorSave.basic.finalSaveValue}+`;
        saveText = `<strong>${basic}</strong>`;
    }

    return `
        <div class="card-section card-armour-save">
            <span class="card-label">Salvación:</span> ${saveText}
        </div>
    `;
}


/**
 * Calculates total gear cost for a fighter, taking into account free daggers and variable costs.
 * @param {object} fighter
 * @returns {number}
 */
export function calculateFighterGearCost(fighter) {
    if (!fighter || !Array.isArray(fighter.equipment) || fighter.equipment.length === 0) {
        return 0;
    }
    const sanitized = fighter.equipment.map(item => {
        if (typeof item === 'string') {
            return { name: item };
        }
        return item;
    });
    const adjusted = adjustEquipmentCosts(sanitized);
    return adjusted.reduce((total, item) => {
        if (!item) return total;
        if (typeof item.variableCost === 'number') {
            return total + item.variableCost;
        }
        const masterItem = MASTER_EQUIPMENT_LIST.find(i => (item.id && i.id === item.id) || i.name === item.name);
        const costVal = item.cost !== undefined ? item.cost : (item.baseCost !== undefined ? item.baseCost : (masterItem?.baseCost ?? 0));
        return total + (parseFloat(costVal) || 0);
    }, 0);
}

/**
 * Calculates the display cost for a single fighter card:
 * - For Hero: base cost + gear
 * - For Henchman: base cost of 1 fighter + gear + experience cost (2 GC per XP)
 * - For others (Hired Sword, Vehicle, Dramatis Personae): base cost + gear
 * @param {object} fighter
 * @returns {number}
 */
export function calculateFighterCardCost(fighter) {
    if (!fighter) return 0;
    const baseCost = (fighter.cost !== undefined && fighter.cost !== null && fighter.cost !== '')
        ? (parseFloat(fighter.cost) || 0)
        : (parseFloat(fighter.hire_fee) || 0);
    const gearCost = calculateFighterGearCost(fighter);
    const isHenchman = fighter.type === 'Henchman';
    const xpCost = isHenchman ? ((parseInt(fighter.xp) || 0) * 2) : 0;
    return baseCost + gearCost + xpCost;
}

/**
 * Calculates the total cost of a fighter or group of fighters
 * @param {object} fighter
 * @returns {number}
 */
export function calculateFighterOrGroupTotalCost(fighter) {
    if (!fighter) return 0;
    const perFighterCost = calculateFighterCardCost(fighter);
    const groupSize = (fighter.type === 'Henchman')
        ? Math.max(1, (fighter.group_size || 1) - (fighter.casualties || 0))
        : 1;
    return perFighterCost * groupSize;
}

/**
 * Generates the Header / Identity Block
 */
function renderHeaderBlock(fighter, warband, options = {}) {
    if (fighter.isBlank) {
        const isHenchman = fighter.type === 'Henchman';
        return `
            <div class="card-header-block card-header-blank">
                <div class="card-header-row">
                    <div class="card-name-group card-blank-name-group">
                        <span class="card-blank-label">Nombre:</span>
                        <span class="card-blank-line-field"></span>
                        ${isHenchman && options.showGroupCount ? `<span class="card-blank-group-badge">&times; ___</span>` : ''}
                    </div>
                    ${options.showCost !== false ? `
                        <div class="card-blank-cost-group">
                            <span class="card-blank-label">Coste:</span>
                            <span class="card-blank-cost-field"></span>
                        </div>
                    ` : ''}
                </div>
                ${options.showSubtype !== false ? `
                    <div class="card-header-row card-header-subrow">
                        <div class="card-blank-sub-group">
                            <span class="card-blank-label">Tipo / Rol:</span>
                            <span class="card-blank-line-field"></span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    const isHenchman = fighter.type === 'Henchman';
    const groupSize = fighter.group_size || 1;
    const casualties = fighter.casualties || 0;
    const effectiveSize = Math.max(0, groupSize - casualties);

    // Subtitle parts
    const subParts = [];
    if (options.showSubtype && fighter.warrior_choice) {
        subParts.push(translateWarrior(fighter.warrior_choice));
    }
    if (options.showRace && fighter.race) {
        subParts.push(translateRace(fighter.race));
    }
    const displayWarbandName = fighter.warband_name || (warband?.isCustomDeck ? '' : warband?.name);
    if (options.showWarbandName && displayWarbandName) {
        subParts.push(displayWarbandName);
    }

    // Cost
    let metaRight = '';
    if (options.showCost !== false && (fighter.cost !== undefined || (fighter.equipment && fighter.equipment.length) || (isHenchman && fighter.xp))) {
        const costType = fighter.cost_type === 'GC' || !fighter.cost_type ? 'CO' : fighter.cost_type;
        const totalFighterCost = calculateFighterCardCost(fighter);
        metaRight = `<span class="card-cost-badge">${totalFighterCost} ${costType}</span>`;
    }

    // Henchmen count badge
    let groupBadge = '';
    if (isHenchman && options.showGroupCount) {
        const casualtyText = casualties > 0 ? ` <span class="card-casualty">(-${casualties})</span>` : '';
        groupBadge = `<span class="card-group-badge">x${effectiveSize}${casualtyText}</span>`;
    }

    // Fees for Hired Sword / Dramatis Personae
    let feesHtml = '';
    if (options.showFees && (fighter.hire_fee !== undefined || fighter.upkeep_fee !== undefined)) {
        const hire = fighter.hire_fee !== undefined ? `Contratación: ${fighter.hire_fee} CO` : '';
        const upkeep = fighter.upkeep_fee !== undefined ? `Mantenimiento: ${fighter.upkeep_fee} CO` : '';
        const combined = [hire, upkeep].filter(Boolean).join(' | ');
        if (combined) {
            feesHtml = `<div class="card-fees-line">${combined}</div>`;
        }
    }

    return `
        <div class="card-header-block">
            <div class="card-header-row">
                <div class="card-name-group">
                    <span class="card-fighter-name">${fighter.name || 'Guerrero sin nombre'}</span>
                    ${groupBadge}
                </div>
                ${metaRight}
            </div>
            ${subParts.length > 0 ? `<div class="card-fighter-subtitle">${subParts.join(' &bull; ')}</div>` : ''}
            ${feesHtml}
        </div>
    `;
}


/**
 * Generates Characteristics / Stat Line Block
 */
function renderCharacteristicsBlock(fighter, options = {}) {
    if (fighter.isBlank) {
        return `
            <div class="card-section card-characteristics card-blank-characteristics">
                <div class="card-stat-grid">
                    ${STATS_FIELDS.map(s => `
                        <div class="card-stat-cell">
                            <span class="card-stat-name">${getStatLabel(s)}</span>
                            <span class="card-stat-val">&nbsp;</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    const isMultiStatLine = fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v));

    if (isMultiStatLine) {
        const statKeys = Object.keys(fighter.stats);
        let rowsHtml = '';

        statKeys.forEach(statKey => {
            const stats = options.applyModifiers !== false
                ? calculateFighterStats(fighter, statKey)
                : (fighter.stats[statKey] || {});

            rowsHtml += `
                <div class="card-multi-stat-row">
                    <div class="card-multi-stat-label">${statKey}</div>
                    <div class="card-stat-grid">
                        ${STATS_FIELDS.map(s => {
                            const val = stats[s] !== undefined ? stats[s] : '-';
                            const displayVal = s === 'M' ? formatMovementStat(val) : val;
                            return `
                            <div class="card-stat-cell">
                                <span class="card-stat-name">${getStatLabel(s)}</span>
                                <span class="card-stat-val">${displayVal}</span>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });

        return `<div class="card-section card-characteristics-multi">${rowsHtml}</div>`;
    }

    // Single stat line
    const stats = options.applyModifiers !== false
        ? calculateFighterStats(fighter, 'Fighter')
        : (fighter.stats || {});

    return `
        <div class="card-section card-characteristics">
            <div class="card-stat-grid">
                ${STATS_FIELDS.map(s => {
                    const val = stats[s] !== undefined ? stats[s] : '-';
                    const displayVal = s === 'M' ? formatMovementStat(val) : val;
                    return `
                    <div class="card-stat-cell">
                        <span class="card-stat-name">${getStatLabel(s)}</span>
                        <span class="card-stat-val">${displayVal}</span>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}


/**
 * Generates Equipment Block
 */
function renderEquipmentBlock(fighter, options = {}) {
    if (fighter.isBlank || options.isMenuCard) {
        const linesCount = options.isMenuCard ? 2 : 3;
        const linesHtml = Array(linesCount).fill('<div class="card-ruled-line"></div>').join('');
        return `
            <div class="card-section card-equipment card-blank-section">
                <div class="card-blank-section-header">
                    <span class="card-label">Equipo:</span>
                </div>
                <div class="card-blank-lines-group">
                    ${linesHtml}
                </div>
            </div>
        `;
    }

    const items = (fighter.equipment || []).map(e => {
        if (!e) return '';
        if (typeof e === 'string') return e;
        const norm = normalizeEquipment(e);
        return norm?.name || e?.name || '';
    }).filter(Boolean);
    if (items.length === 0) {
        return `
            <div class="card-section card-equipment">
                <span class="card-label">Equipo:</span> <span class="card-val-subtle">Ninguno</span>
            </div>
        `;
    }

    const showRules = options.showWeaponRules !== false;

    if (options.format === 'list') {
        return `
            <div class="card-section card-equipment">
                <span class="card-label">Equipo:</span>
                <div class="card-equip-list">
                    ${items.map(name => {
                        const trName = translateEquipment(name);
                        const ruleInfo = getWeaponRuleSummary(name);
                        const shortRule = showRules ? ruleInfo.short : '';
                        const titleText = escapeAttr(ruleInfo.full || ruleInfo.short || trName);
                        return `
                            <div class="card-equip-list-item" data-card-equip="${escapeAttr(name)}" title="${titleText}">
                                <span class="card-equip-list-name">${trName}${shortRule ? ':' : ''}</span>
                                ${shortRule ? `<span class="card-equip-list-rule">${shortRule}</span>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    return `
        <div class="card-section card-equipment">
            <span class="card-label">Equipo:</span>
            <div class="card-pill-container">
                ${items.map(name => {
                    const trName = translateEquipment(name);
                    const ruleInfo = getWeaponRuleSummary(name);
                    const shortRule = showRules ? ruleInfo.short : '';
                    const titleText = escapeAttr(ruleInfo.full || ruleInfo.short || trName);
                    return `<span class="card-pill card-pill-equip" data-card-equip="${escapeAttr(name)}" title="${titleText}"><span class="card-equip-name">${trName}</span>${shortRule ? ` <span class="card-pill-rule-tag">${shortRule}</span>` : ''}</span>`;
                }).join(' ')}
            </div>
        </div>
    `;
}


/**
 * Normalizes list-like fighter data (strings, arrays, semicolon-separated values)
 * into a flat array of individual trimmed strings.
 */
function parseSemicolonList(input) {
    if (!input) return [];
    const list = [];
    const items = Array.isArray(input) ? input : [input];

    items.forEach(item => {
        if (typeof item === 'string') {
            item.split(';').forEach(part => {
                const trimmed = part.trim();
                if (trimmed) {
                    list.push(trimmed);
                }
            });
        } else if (item && typeof item === 'object') {
            const strVal = item.name || item.rule || item.skill || item.title || '';
            if (typeof strVal === 'string' && strVal.trim()) {
                strVal.split(';').forEach(part => {
                    const trimmed = part.trim();
                    if (trimmed) {
                        list.push(trimmed);
                    }
                });
            }
        }
    });

    return list;
}

function isLeaderRule(str) {
    if (!str || typeof str !== 'string') return false;
    const lower = str.trim().toLowerCase();
    return lower === 'leader' || lower === 'leader expanded' || lower.startsWith('leader ');
}

/**
 * Extracts all special rules for a fighter across any fighter type (Hero, Henchman, Hired Sword, Vehicle, Dramatis Personae).
 * Checks fighter.special_rules, fighter.specialRules, and fighter.rules, splits semicolon-separated rules into individual
 * tokens, and dedupes while preserving original order.
 */
export function extractFighterSpecialRules(fighter) {
    if (!fighter) return [];

    const rawSources = [
        fighter.special_rules,
        fighter.specialRules,
        fighter.rules
    ];

    // If 'Leader' was placed in fighter.skills, migrate/include it as a special rule
    const parsedSkills = parseSemicolonList(fighter.skills);
    parsedSkills.forEach(s => {
        if (isLeaderRule(s)) {
            rawSources.push('Leader');
        }
    });

    const combined = [];
    const seen = new Set();

    rawSources.forEach(source => {
        const parsed = parseSemicolonList(source);
        parsed.forEach(rule => {
            if (!rule || typeof rule !== 'string') return;
            let cleaned = rule.trim();
            if (/^leader\s+expanded$/i.test(cleaned)) {
                cleaned = 'Leader';
            }
            if (!cleaned || cleaned.toLowerCase() === '(none)' || cleaned.toLowerCase() === 'none') {
                return;
            }
            const key = cleaned.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                combined.push(cleaned);
            }
        });
    });

    return combined;
}

/**
 * Generates Skills Block
 */
const SKILL_CATEGORY_NAMES = new Set(['Combat', 'Shooting', 'Academic', 'Strength', 'Speed', 'Special']);

function renderSkillsBlock(fighter, options = {}) {
    const rawSkills = parseSemicolonList(fighter.skills);
    const skills = rawSkills.filter(s => {
        if (!s || typeof s !== 'string') return false;
        const trimmed = s.trim();
        return !SKILL_CATEGORY_NAMES.has(trimmed) && !isLeaderRule(trimmed);
    });

    if (fighter.isBlank || options.isMenuCard) {
        const startingSkillsHtml = skills.length > 0
            ? `<div class="card-pill-container" style="display:inline-flex; flex-wrap:wrap; margin-left:1mm;">${skills.map(skill => `<span class="card-pill card-pill-skill">${skill}</span>`).join(' ')}</div>`
            : '';
        return `
            <div class="card-section card-skills card-blank-section">
                <div class="card-blank-section-header">
                    <span class="card-label">Habilidades:</span>
                    ${startingSkillsHtml}
                </div>
                <div class="card-blank-lines-group">
                    <div class="card-ruled-line"></div>
                    <div class="card-ruled-line"></div>
                </div>
            </div>
        `;
    }

    if (skills.length === 0) return '';

    return `
        <div class="card-section card-skills">
            <span class="card-label">Habilidades:</span>
            <div class="card-pill-container">
                ${skills.map(skill => `<span class="card-pill card-pill-skill" data-card-skill="${escapeAttr(skill)}">${translateSkill(skill)}</span>`).join(' ')}
            </div>
        </div>
    `;
}

/**
 * Generates Injuries Block
 */
function renderInjuriesBlock(fighter, options = {}) {
    if (fighter.isBlank || options.isMenuCard) {
        return `
            <div class="card-section card-injuries card-blank-section">
                <div class="card-blank-section-header">
                    <span class="card-label">Heridas Graves:</span>
                </div>
                <div class="card-blank-lines-group">
                    <div class="card-ruled-line"></div>
                    <div class="card-ruled-line"></div>
                </div>
            </div>
        `;
    }

    const injuries = parseSemicolonList(fighter.injuries);
    if (injuries.length === 0) return '';

    return `
        <div class="card-section card-injuries">
            <span class="card-label">Heridas Graves:</span>
            <div class="card-pill-container">
                ${injuries.map(injury => `<span class="card-pill card-pill-injury" data-card-injury="${escapeAttr(injury)}">${translateInjury(injury)}</span>`).join(' ')}
            </div>
        </div>
    `;
}

/**
 * Generates Special Rules Block
 */
function renderSpecialRulesBlock(fighter, options = {}) {
    if (fighter.isBlank) {
        return `
            <div class="card-section card-special-rules card-blank-section">
                <div class="card-blank-section-header">
                    <span class="card-label">Reglas Especiales:</span>
                </div>
                <div class="card-blank-lines-group">
                    <div class="card-ruled-line"></div>
                    <div class="card-ruled-line"></div>
                </div>
            </div>
        `;
    }

    const rules = extractFighterSpecialRules(fighter);

    if (rules.length === 0) {
        if (options.isMenuCard) {
            return `
                <div class="card-section card-special-rules card-blank-section">
                    <div class="card-blank-section-header">
                        <span class="card-label">Reglas Especiales:</span>
                    </div>
                    <div class="card-blank-lines-group">
                        <div class="card-ruled-line"></div>
                        <div class="card-ruled-line"></div>
                    </div>
                </div>
            `;
        }
        return '';
    }

    const showReminders = options.showDescriptions !== false;
    const format = options.format || 'tags';

    if (format === 'list') {
        return `
            <div class="card-section card-special-rules">
                <span class="card-label">Reglas Especiales:</span>
                <div class="card-rules-list">
                    ${rules.map(rule => {
                        const trName = translateSpecialRule(rule);
                        const summary = getSpecialRuleSummary(rule);
                        const desc = showReminders ? (summary.short || summary.full || '') : '';
                        const titleText = escapeAttr(summary.full || trName);
                        return `
                            <div class="card-rule-row" data-card-rule="${escapeAttr(rule)}" title="${titleText}">
                                <span class="card-rule-row-name">${trName}</span>
                                ${desc ? `<span class="card-rule-row-desc">${desc}</span>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    return `
        <div class="card-section card-special-rules">
            <span class="card-label">Reglas Especiales:</span>
            <div class="card-pill-container">
                ${rules.map(rule => {
                    const trName = translateSpecialRule(rule);
                    const summary = getSpecialRuleSummary(rule);
                    const titleText = escapeAttr(summary.full ? `${trName}: ${summary.full}` : trName);
                    const reminderTag = showReminders && summary.short
                        ? `<span class="card-pill-rule-tag">${summary.short}</span>`
                        : '';
                    return `<span class="card-pill card-pill-rule" data-card-rule="${escapeAttr(rule)}" title="${titleText}"><span class="card-rule-name">${trName}</span>${reminderTag}</span>`;
                }).join(' ')}
            </div>
        </div>
    `;
}

/**
 * Generates Magic / Spells Block
 */
function renderSpellsBlock(fighter, options = {}) {
    if (fighter.isBlank) {
        return `
            <div class="card-section card-spells card-blank-section">
                <div class="card-blank-section-header">
                    <span class="card-label">Hechizos:</span>
                </div>
                <div class="card-blank-lines-group">
                    <div class="card-ruled-line"></div>
                    <div class="card-ruled-line"></div>
                </div>
            </div>
        `;
    }

    const spells = parseSemicolonList(fighter.magic);
    const lore = fighter.chosen_magic_lore ? ` (${fighter.chosen_magic_lore})` : '';
    const isSpellcaster = spells.length > 0 || fighter.chosen_magic_lore || /magister|warlock|priest|wizard|shaman|sorcerer|witch/i.test(fighter.warrior_choice || fighter.name || '');

    if (options.isMenuCard) {
        if (!isSpellcaster) return '';
        const startingSpellsHtml = spells.length > 0
            ? `<div class="card-pill-container" style="display:inline-flex; flex-wrap:wrap; margin-left:1mm;">${spells.map(spell => `<span class="card-pill card-pill-spell">${spell}</span>`).join(' ')}</div>`
            : '';
        return `
            <div class="card-section card-spells card-blank-section">
                <div class="card-blank-section-header">
                    <span class="card-label">Hechizos${lore}:</span>
                    ${startingSpellsHtml}
                </div>
                <div class="card-blank-lines-group">
                    <div class="card-ruled-line"></div>
                    <div class="card-ruled-line"></div>
                </div>
            </div>
        `;
    }

    if (spells.length === 0 && !fighter.chosen_magic_lore) return '';

    return `
        <div class="card-section card-spells">
            <span class="card-label">Hechizos${lore}:</span>
            <div class="card-pill-container">
                ${spells.map(spell => `<span class="card-pill card-pill-spell" data-card-spell="${escapeAttr(spell)}">${spell}</span>`).join(' ')}
            </div>
        </div>
    `;
}


const XP_X_MARK_SVG = `<svg class="card-xp-x" viewBox="0 0 10 10" preserveAspectRatio="none"><line x1="1.5" y1="1.5" x2="8.5" y2="8.5"/><line x1="8.5" y1="1.5" x2="1.5" y2="8.5"/></svg>`;

/**
 * Generates Advancement / XP Block
 */
function renderAdvancementBlock(fighter, options = {}) {
    const isBlank = !!fighter.isBlank;
    const currentXp = isBlank ? 0 : (fighter.xp || 0);
    const isHero = fighter.type === 'Hero';
    const prefill = isBlank ? false : (options.prefillEarned !== false);

    // Henchman milestones: 2, 5, 9, 14
    // Hero milestones: 2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90
    const henchMilestones = [2, 5, 9, 14];
    const heroMilestones = [2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90];

    if (!isHero) {
        // Henchman 14-box track
        let boxesHtml = '';
        for (let i = 1; i <= 14; i++) {
            const isEarned = prefill && i <= currentXp;
            const isMilestone = henchMilestones.includes(i);
            boxesHtml += `
                <div class="card-xp-box ${isEarned ? 'checked' : ''} ${isMilestone ? 'milestone' : ''}" title="XP ${i}">
                    ${isMilestone ? `<span class="card-xp-ms-num">${i}</span>` : ''}
                    ${isEarned ? XP_X_MARK_SVG : ''}
                </div>
            `;
        }
        return `
            <div class="card-section card-advancement">
                <div class="card-xp-header">
                    <span class="card-label">PX:</span> ${isBlank ? '<span class="card-blank-line-field card-blank-xp-field"></span>' : `<strong>${currentXp}</strong>`}
                </div>
                <div class="card-xp-track-14">${boxesHtml}</div>
            </div>
        `;
    }

    // Hero: milestone progression track (compact and readable on 63mm)
    let milestonesHtml = '';
    heroMilestones.forEach(ms => {
        const isReached = prefill && currentXp >= ms;
        milestonesHtml += `
            <div class="card-hero-ms ${isReached ? 'reached' : ''}" title="Hito: ${ms} PX">
                <span class="card-hero-ms-num">${ms}</span>
                <span class="card-hero-ms-box">${isReached ? XP_X_MARK_SVG : ''}</span>
            </div>
        `;
    });

    return `
        <div class="card-section card-advancement">
            <div class="card-xp-header">
                <span class="card-label">Hito de PX:</span> ${isBlank ? '<span class="card-blank-line-field card-blank-xp-field"></span>' : `<strong>${currentXp} PX</strong>`}
            </div>
            <div class="card-hero-ms-grid">${milestonesHtml}</div>
        </div>
    `;
}


/**
 * Generates Full 90-Box Advancement Block for Heroes
 */
function renderAdvancementFullBlock(fighter, options = {}) {
    const isBlank = !!fighter.isBlank;
    const currentXp = isBlank ? 0 : (fighter.xp || 0);
    const prefill = isBlank ? false : (options.prefillEarned !== false);
    const heroMilestones = [2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90];

    let boxesHtml = '';
    for (let i = 1; i <= 90; i++) {
        const isEarned = prefill && i <= currentXp;
        const isMilestone = heroMilestones.includes(i);
        boxesHtml += `
            <div class="card-xp-box-full ${isEarned ? 'checked' : ''} ${isMilestone ? 'milestone' : ''}" title="XP ${i}">
                ${isMilestone ? `<span class="ms-marker">${i}</span>` : ''}
                ${isEarned ? XP_X_MARK_SVG : ''}
            </div>
        `;
    }

    return `
        <div class="card-section card-advancement-full">
            <div class="card-xp-header">
                <span class="card-label">PX Completo:</span> ${isBlank ? '<span class="card-blank-line-field card-blank-xp-field"></span>' : `<strong>${currentXp} PX</strong>`}
            </div>
            <div class="card-xp-grid-90">${boxesHtml}</div>
        </div>
    `;
}

/**
 * Generates Notes Block
 */
function renderNotesBlock(fighter, options = {}) {
    if (fighter.isBlank || options.isMenuCard) {
        return '';
    }

    const notesText = fighter.notes ? fighter.notes.trim() : '';
    if (!notesText && !options.showBlankLines) return '';

    return `
        <div class="card-section card-notes">
            <span class="card-label">Notas:</span>
            ${notesText ? `<div class="card-notes-text">${notesText.replace(/\n/g, '<br>')}</div>` : ''}
            ${options.showBlankLines ? `
                <div class="card-blank-lines">
                    <div class="card-blank-line"></div>
                    <div class="card-blank-line"></div>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Generates Blank Writing Lines Block (just ruled lines for handwriting)
 */
function renderBlankLinesBlock(fighter, options = {}) {
    const lineCount = Math.max(1, Math.min(8, parseInt(options?.lineCount) || 3));
    let linesHtml = '';
    for (let i = 0; i < lineCount; i++) {
        linesHtml += '<div class="card-ruled-line"></div>';
    }
    return `
        <div class="card-section card-blank-lines">
            ${linesHtml}
        </div>
    `;
}

/**
 * Generates a Spacer or Divider Block (blank vertical space or styled separator)
 */
function renderSpacerBlock(options = {}) {
    const height = options?.height || 'medium';
    const style = options?.style || 'space';

    let content = '';
    if (style === 'ornament') {
        content = '<div class="card-divider-line"><span class="card-divider-ornament">♦</span></div>';
    } else if (style !== 'space') {
        content = '<div class="card-divider-line"></div>';
    }

    return `
        <div class="card-section card-spacer-block card-spacer-height-${height} card-spacer-style-${style}">
            ${content}
        </div>
    `;
}

function renderSingleBlockContent(blockConfig, fighter, warband) {
    const isSavedFighter = Boolean(fighter.fromSavedWarband) || (fighter.isTemplateCard === false && !String(fighter.id || '').startsWith('sample'));
    const isMenuCard = !fighter.isBlank && !isSavedFighter && (
        fighter.isTemplateCard === true ||
        warband?.isCustomDeck === true ||
        warband?.name === 'Custom Card Deck' ||
        warband?.key === 'custom_deck' ||
        (typeof fighter.id === 'string' && (fighter.id.startsWith('sample') || fighter.id.startsWith('card_')))
    );
    const options = { ...(blockConfig.options || {}), isMenuCard };

    if (isMenuCard && blockConfig.id === 'notes') {
        return '';
    }

    switch (blockConfig.id) {
        case 'header':
            return renderHeaderBlock(fighter, warband, options);
        case 'characteristics':
            return renderCharacteristicsBlock(fighter, options);
        case 'armour_save':
            return renderArmourSaveBlock(fighter, options);
        case 'equipment':
            return renderEquipmentBlock(fighter, options);
        case 'skills':
            return renderSkillsBlock(fighter, options);
        case 'injuries':
            return renderInjuriesBlock(fighter, options);
        case 'special_rules':
            return renderSpecialRulesBlock(fighter, options);
        case 'spells':
            return renderSpellsBlock(fighter, options);
        case 'advancement':
            return renderAdvancementBlock(fighter, options);
        case 'advancement_full':
            return renderAdvancementFullBlock(fighter, options);
        case 'notes':
            return renderNotesBlock(fighter, options);
        case 'blank_lines':
            return renderBlankLinesBlock(fighter, options);
        case 'spacer':
        case 'divider':
            return renderSpacerBlock(options);
        default:
            return '';
    }
}

/**
 * Main render function for a single 63mm x 88mm card
 * @param {object} fighter - Fighter data object
 * @param {object} warband - Warband context
 * @param {object} layout - Layout configuration
 * @param {boolean} isInteractive - Whether to render drag handles and interactive attributes
 * @returns {string} HTML string of the card
 */
export function renderFighterCard(fighter, warband, layout, isInteractive = false) {
    if (!fighter) return '<div class="card-empty-placeholder">Ningún guerrero seleccionado</div>';

    const densityClass = layout?.cardDensity === 'compact' ? 'density-compact' : 'density-normal';
    const themeClass = layout?.cardTheme === 'clean' ? 'theme-clean' : 'theme-parchment';
    const blocks = layout?.blocks || [];

    let topBlocksHtml = '';
    let bottomBlocksHtml = '';

    blocks.forEach((blockConfig, index) => {
        if (!blockConfig.enabled) return;

        const blockContent = renderSingleBlockContent(blockConfig, fighter, warband);
        if (!blockContent) return;

        const isBottom = blockConfig.placement === 'bottom';
        const wrapperHtml = isInteractive ? `
            <div class="card-block-wrapper ${isBottom ? 'placement-bottom' : 'placement-top'}" data-block-id="${blockConfig.id}" data-index="${index}" data-placement="${isBottom ? 'bottom' : 'top'}" draggable="true">
                <div class="card-block-drag-handle" title="Drag to move"><i class="fas fa-grip-vertical"></i></div>
                <div class="card-block-inner">${blockContent}</div>
            </div>
        ` : `
            <div class="card-block-wrapper static ${isBottom ? 'placement-bottom' : 'placement-top'}">${blockContent}</div>
        `;

        if (isBottom) {
            bottomBlocksHtml += wrapperHtml;
        } else {
            topBlocksHtml += wrapperHtml;
        }
    });

    return `
        <div class="mordheim-card ${densityClass} ${themeClass} ${isInteractive ? 'interactive' : 'print-mode'}" data-fighter-id="${fighter.id || ''}">
            <div class="card-outer-border">
                <div class="card-inner-frame">
                    <div class="card-flow-top" data-zone="top">
                        ${topBlocksHtml}
                    </div>
                    <div class="card-flow-spacer" data-zone="spacer">
                        ${isInteractive ? `
                            <div class="card-spacer-drop-hint">
                                <span><i class="fas fa-arrow-down mr-1"></i> Align to Bottom</span>
                            </div>
                        ` : ''}
                    </div>
                    ${bottomBlocksHtml ? `
                        <div class="card-flow-bottom" data-zone="bottom">
                            ${bottomBlocksHtml}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}
