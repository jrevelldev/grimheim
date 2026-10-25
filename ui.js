import { MASTER_EQUIPMENT_LIST, RACIAL_MAXIMUMS, WARBANDS, DRAMATIS_PERSONAE, HIRED_SWORDS, SKILLS, SPECIAL_RULES_DETAILS, MASTER_INJURY_LIST, MAGIC, VEHICLES, PIT_FIGHTER_STYLES } from './data/index.js';
import { findSkillForWarband } from './skill-lookup.js';
import { getAllExplorationResults, getExplorationResultByName, analyzeExplorationDice, findAllExplorationResults, calculateDiceToRemoveForResult } from './data/exploration.js';
import { STATS_FIELDS, HERO_XP_THRESHOLDS, STANDARD_XP_THRESHOLDS } from './config.js';
import { getWarbandData, getWarriorSkills, calculateEquipmentCost, calculateArmorSave, showMessage, displayModal, parseCostString, hideModal, calculateWarbandRating, showEditorView, normalizeEquipment, getFighterTypeSubtitle, formatEquipmentCostDisplay } from './utility.js'; // Updated import
import { trackCharacterMenuAccess, trackScreenView } from './analytics.js'; // NEW: Import trackCharacterMenuAccess
import { currentWarband, currentFighterBaseStats, currentFighterMultiStats, tempItemToRemove, setTempItemToRetrieve, tempItemToRetrieve, setTempItemToRemove, setCurrentFighterBaseStats, setCurrentFighterMultiStats, setTempItemToAdd, tempHiredSwordToAdd, setTempHiredSwordToAdd, availableEquipmentFilterIds, setAvailableEquipmentFilterIds, getAvailableSkillCategories, setAvailableSkillCategories, getBaseSkillCategories, setBaseSkillCategories, getIsOrderingMode, isUniversalHiringAccessActive, isFullyPaintedActive, isShieldMeleeIgnored, isIgnoreRacialMaximumsActive, getRestrictedSkillCategories } from './state.js';
import { saveWarband } from './warband-service.js';
import { checkGroupRetrievalConstraint } from './utility.js'; // Removed showModal from here
import { filterCharactersByHiringRestrictions } from './hiring-validation.js'; // Import hiring validation
import { applyCarnivalOfChaosUILogic, isCarnivalOfChaosWarband, applyCarnivalRaceVisibility } from './equiprules/carnival-ui.js'; // Import Carnival-specific UI logic
import { getMountMovementModifier, applyMountStats } from './equiprules/mounts.js'; // Import mount movement modifier and mount stats application
import { applyHeavyArmourShieldPenalty, applyPaviseMovementPenalty } from './equiprules/armour.js'; // Import armour movement penalties
import { getMaraudersOfChaosTheHungStartingSkills } from './equiprules/marauders-of-chaos.js'; // Import Marauders of Chaos (The Hung) starting skills
import { getMerchantCaravansStartingSkills } from './equiprules/merchant-caravans.js'; // Import Merchant Caravans starting skills
import { getOgreHuntingPartyStartingSkills, getTrapperSkillOptions } from './equiprules/ogre-hunting-party.js'; // Import Ogre Hunting Party starting skills
import { getSkavenMoulderStartingSkills, getPackmasterBeastHandlingOptions } from './equiprules/skaven-moulder.js'; // Import Skaven of Clan Moulder starting skills
import { renderHeroXPBar, renderXPBar, renderFighterXPBar } from './advancement.js';
import { renderEquipmentSelector, renderEquipmentOptions, renderSelectedEquipment, updateStatModifiers, updateSellPrice, renderArmorSave, showAddToStorageModal, showSellFromStorageModal, showRetrieveModal, updateEquipmentCostsForSpecialRules, formatEquipmentRules } from './equipment-management.js';
import { getStartingSpells, renderMagicSelection, getMagicGroupForFighter, getSpellsForGroup } from './spell-management.js'; // Import magic functions
import { showEndBattleModal, setBattleResult, processBattleEnd, renderExperienceSection, updateUnderdogRatingDisplay, updateCasualtyResolution } from './End Battle/end_battle.js'; // Import end battle functions
import { formatXPDisplay } from './slow-witted.js'; // Import XP formatting function
import { createTransaction, addTransaction, TRANSACTION_TYPES, TRANSACTION_CATEGORIES } from './Treasury/ledger.js'; // Import ledger functions
import { initPreGameUI } from './PreGame/pre-game.js'; // Import Pre-Game Build Phase UI logic
import {
    STATS_LABELS,
    STATS_TITLES,
    getStatLabel,
    getStatTitle,
    translateWarband,
    translateWarrior,
    translateFighterType,
    translateRace,
    translateAlignment,
    translateEquipment,
    translateInjury,
    translateBattleStatus,
    translateSkillCategory
} from './i18n.js';

/** Renders the list of warbands in the list view */
export const renderWarbandList = (warbands) => {
    const container = document.getElementById('warbands-container');

    if (!warbands || warbands.length === 0) {
        container.innerHTML = `<p class="text-slate-400 text-center py-8">No se ha encontrado ninguna banda. Pulsa 'Crear Nueva Banda' o 'Importar Banda' para empezar.</p>`;
        return;
    }

    const warbandsHTML = warbands.map(wb => `
        <div class="bg-slate-700 p-4 rounded-lg shadow-md flex justify-between items-center transition hover:bg-slate-600">
            <div>
                <h3 class="text-xl font-bold text-mordheim-gold">${wb.name}</h3>
                <p class="text-sm text-slate-300">Tipo: ${translateWarband(wb.type)}</p>
                <p class="text-xs text-slate-400">Valoración: ${wb.rating} | Miembros: ${wb.members?.length || 0}</p>
                <p class="text-xs text-slate-500">Guardado: ${wb._storageLocation === 'Browser Cache' ? 'Memoria Local (Navegador)' : (wb._storageLocation || 'Local')}</p>
            </div>
            <div class="flex space-x-3">
                <button data-action="load-warband" data-warband-id="${wb.id}" class="py-2 px-4 text-white text-sm font-semibold rounded-lg hover:opacity-80 transition shadow-md" style="background-color: var(--sage-green);">
                    <i class="fas fa-eye"></i> Ver Banda
                </button>
                <div class="relative">
                    <button data-action="toggle-warband-menu" data-warband-id="${wb.id}" class="py-2 px-3 bg-slate-600 text-white text-sm font-semibold rounded-lg hover:bg-slate-500 transition shadow-md">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div id="warband-menu-${wb.id}" class="warband-dropdown-menu hidden absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg z-50 py-1">
                        <button data-action="copy-warband" data-warband-id="${wb.id}" class="w-full text-left px-4 py-2 text-white hover:bg-slate-700 transition flex items-center space-x-2">
                            <i class="fas fa-copy"></i>
                            <span>Duplicar</span>
                        </button>
                        <button data-action="rename-warband" data-warband-id="${wb.id}" data-warband-name="${wb.name}" class="w-full text-left px-4 py-2 text-white hover:bg-slate-700 transition flex items-center space-x-2">
                            <i class="fas fa-edit"></i>
                            <span>Renombrar</span>
                        </button>
                        <button data-action="export-warband" data-warband-id="${wb.id}" class="w-full text-left px-4 py-2 text-yellow-300 hover:bg-slate-700 transition flex items-center space-x-2">
                            <i class="fas fa-download"></i>
                            <span>Exportar (JSON)</span>
                        </button>
                        <button data-action="delete-warband" data-warband-id="${wb.id}" data-warband-name="${wb.name}" class="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 transition flex items-center space-x-2">
                            <i class="fas fa-trash-alt"></i>
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = warbandsHTML;
};


/** Toggles between the list view and the editor view */
export const showListView = (warbands) => {
    trackScreenView('Warband List');
    document.getElementById('warband-list-view').classList.remove('hidden');
    document.getElementById('warband-editor-view').classList.add('hidden');
    document.getElementById('turn-order-tracker-view').classList.add('hidden');
    document.getElementById('battle-view').classList.add('hidden');
    document.getElementById('special-rules-view').classList.add('hidden');
    document.getElementById('rules-view')?.classList.add('hidden');
    
    // Show header and footer when returning from battle view
    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('main-footer').classList.remove('hidden');
    
    renderWarbandList(warbands); // Re-render the list to show any updates
    return null; // The caller will set currentWarband to null
};

/** Toggles to show the Turn Order Tracker view */
export const showTurnOrderTrackerView = () => {
    trackScreenView('Turn Order Tracker');
    document.getElementById('warband-list-view').classList.add('hidden');
    document.getElementById('warband-editor-view').classList.add('hidden');
    document.getElementById('turn-order-tracker-view').classList.remove('hidden');
    
    // Show header and footer in turn order tracker view
    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('main-footer').classList.remove('hidden');
};



/** Renders the main warband editor view with current data */
export const renderWarbandEditor = (currentWarband, getWarbandData, STATS_FIELDS) => {
    if (!currentWarband) return;

    // Header and Treasury
    document.getElementById('warband-title').textContent = currentWarband.name;
    document.getElementById('warband-rating').textContent = currentWarband.rating;
    document.getElementById('warband-gc').textContent = currentWarband.gc_treasury;
    document.getElementById('current-gc').textContent = currentWarband.gc_treasury;
    document.getElementById('current-treasure').textContent = currentWarband.treasure || 0;
    
    // Games Played count
    const gamesPlayed = currentWarband.games_played || 0;
    document.getElementById('games-played-count').textContent = gamesPlayed;
    document.getElementById('warband-notes').value = currentWarband.notes || '';

    // Alignment Display and Edit
    const alignmentDisplay = document.getElementById('alignment-display');
    const alignmentEdit = document.getElementById('alignment-edit');
    const alignmentText = document.getElementById('alignment-text');
    const alignmentSelect = document.getElementById('alignment-select');
    const preGameAlignmentSection = document.getElementById('pre-game-alignment-section');
    const preGameAlignmentSelect = document.getElementById('pre-game-alignment-select');
    const isPreGame = currentWarband.pre_game !== false; // Default to true if not set
    
    // Get alignment - use custom alignment if set, otherwise use default from warband data
    const warbandData = getWarbandData(currentWarband.type);
    const defaultAlignment = warbandData?.alignment || 'good';
    const currentAlignment = currentWarband.alignment || defaultAlignment;
    
    // Update alignment displays
    alignmentText.textContent = translateAlignment(currentAlignment);
    alignmentSelect.value = currentAlignment;
    preGameAlignmentSelect.value = currentAlignment;
    
    // Show/hide alignment controls based on pre-game status
    if (isPreGame) {
        // Pre-game mode: show dropdown in Pre-Game Build Phase box, hide header alignment
        alignmentDisplay.classList.add('hidden');
        alignmentEdit.classList.add('hidden');
        preGameAlignmentSection.classList.remove('hidden');
    } else {
        // Pre-game completed: show alignment text in header, hide Pre-Game Build Phase dropdown
        alignmentDisplay.classList.remove('hidden');
        alignmentEdit.classList.add('hidden');
        preGameAlignmentSection.classList.add('hidden');
    }

    // Pre-Game Build Phase: warband-specific sections (e.g., Aristocracy of the Night for Undead)
    initPreGameUI(currentWarband, warbandData);

    // Pre-Game Toggle
    const preGameToggle = document.getElementById('pre-game-toggle');
    const preGameStatus = document.getElementById('pre-game-status');
    preGameToggle.checked = isPreGame;
    preGameStatus.textContent = isPreGame ? 'En fase inicial de creación / reclutamiento' : 'Fase inicial de creación completada';

    // Game Tracker visibility
    const gameTrackerCard = document.getElementById('game-tracker-card');
    if (isPreGame) {
        gameTrackerCard.classList.add('hidden');
    } else {
        gameTrackerCard.classList.remove('hidden');
    }
    
    // Display warband special rules
    const warbandSpecialRulesContainer = document.getElementById('warband-special-rules-container');
    const warbandSpecialRules = document.getElementById('warband-special-rules');

    if (warbandData && warbandData.special_rules) {
        let rulesArray = [];
        if (Array.isArray(warbandData.special_rules)) {
            rulesArray = warbandData.special_rules;
        } else if (typeof warbandData.special_rules === 'string') {
            rulesArray = warbandData.special_rules.split(';').map(r => r.trim());
        }

        const clickableRules = rulesArray.map(ruleName => {
            const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);
            if (ruleData) {
                return `<span class="underline cursor-pointer text-mordheim-gold" data-rule="${ruleName}">${ruleName}</span>`;
            } else {
                return `<span>${ruleName}</span>`;
            }
        }).join('<br>');

        warbandSpecialRules.innerHTML = clickableRules;
        warbandSpecialRulesContainer.style.display = 'block';
    } else {
        warbandSpecialRulesContainer.style.display = 'none';
    }

    // Roster List
    const rosterContainer = document.getElementById('roster-container');
    const rosterHTML = currentWarband.members.map((fighter, index) => {
        const isHenchman = fighter.type === 'Henchman';
        const groupSize = fighter.group_size || 1;
        const equipmentList = (fighter.equipment || []).map(e => {
            const normalized = normalizeEquipment(e);
            return `<span class="bg-slate-600 px-2 py-1 rounded-full text-xs text-yellow-300 cursor-pointer hover:bg-slate-500" data-equipment-name="${normalized.name}" data-equipment-rules="${encodeURIComponent(JSON.stringify(normalized.rules))}" data-equipment-cost="${formatEquipmentCostDisplay(normalized)}">${normalized.name}</span>`;
        }).join('');

        // Add style information for Pit Fighters
        let styleInfo = '';
        if (currentWarband.type === "Pit Fighters" && fighter.special_rules && fighter.special_rules.includes("Pit Fighter Style")) {
            const styleMatch = fighter.special_rules.match(/Pit Fighter Style: ([^;]+)/);
            if (styleMatch) {
                styleInfo = `<span class="bg-blue-600 px-2 py-1 rounded-full text-xs text-white font-semibold">Style: ${styleMatch[1].trim()}</span>`;
            }
        }

        // Check if stats has multiple sub-objects
        const isMultiStatLine = fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v));

        let statsHTML = '';

        if (isMultiStatLine) {
            // Multi-stat fighter: render each statline separately
            const statLineKeys = Object.keys(fighter.stats);
            statLineKeys.forEach(statLineKey => {
                const statLineStats = fighter.stats[statLineKey];
                statsHTML += `<div class="text-center font-bold text-slate-300 mb-1 uppercase text-sm">${statLineKey}</div>`;
                statsHTML += `<div class="grid grid-cols-9 gap-1 mb-2 bg-slate-800 p-2 rounded-lg">`;
                statsHTML += STATS_FIELDS.map(stat => {
                    let statValue = statLineStats[stat] !== undefined ? statLineStats[stat] : '-';
                    let statColor = '';

                    // Apply equipment modifiers (shared between all parts)
                    const characteristicModifiers = {};
                    (fighter.equipment || []).forEach(item => {
                        const normalized = normalizeEquipment(item);
                        const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === normalized.name);
                        if (masterItem && masterItem.characteristicModifiers) {
                            Object.keys(masterItem.characteristicModifiers).forEach(modStat => {
                                characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + masterItem.characteristicModifiers[modStat];
                            });
                        }
                    });

                    // Apply skill characteristic modifiers
                    if (fighter.skills && SKILLS) {
                        fighter.skills.forEach(skillName => {
                            const skill = findSkillForWarband(skillName, null, fighter);
                            if (skill && skill.characteristicModifiers) {
                                Object.keys(skill.characteristicModifiers).forEach(modStat => {
                                    characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + skill.characteristicModifiers[modStat];
                                });
                            }
                        });
                    }

                    // Apply injury modifiers (only to Fighter stat line, not Mount)
                    if (statLineKey === 'Fighter' && fighter.injuries && fighter.injuries.length > 0) {
                        fighter.injuries.forEach(injuryName => {
                            const injury = MASTER_INJURY_LIST.find(i => i.name === injuryName);
                            if (injury && injury.characteristicModifiers) {
                                Object.keys(injury.characteristicModifiers).forEach(modStat => {
                                    characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + injury.characteristicModifiers[modStat];
                                });
                            }
                        });
                    }

                    // Special case: Barding penalty to Mount movement
                    if (statLineKey === 'Mount' && stat === 'M') {
                        characteristicModifiers['M'] = (characteristicModifiers['M'] || 0) + getMountMovementModifier(fighter.equipment);
                    }

                    const modifier = characteristicModifiers[stat] || 0;
                    if (modifier !== 0) {
                        statValue = Math.max(0, statValue + modifier);
                        statColor = modifier > 0 ? 'text-green-400' : 'text-red-400';
                    }

                    const penaltyResult = applyHeavyArmourShieldPenalty(stat, statValue, fighter.equipment, fighter.special_rules, fighter.skills);
                    statValue = penaltyResult.value;
                    if (penaltyResult.color) statColor = penaltyResult.color;

                    const paviseResult = applyPaviseMovementPenalty(stat, statValue, fighter.equipment);
                    statValue = paviseResult.value;
                    if (paviseResult.color) statColor = paviseResult.color;

                    return `
                    <div class="flex flex-col">
                        <span class="text-xs uppercase text-slate-400" title="${getStatTitle(stat)}">${getStatLabel(stat)}</span>
                        <span class="font-bold text-lg ${statColor}">${statValue}</span>
                    </div>
                    `;
                }).join('');
                statsHTML += `</div>`;
            });
        } else {
            // Single-stat fighter
            statsHTML = STATS_FIELDS.map(stat => {
                let statValue = fighter.stats?.[stat] !== undefined ? fighter.stats[stat] : '-';
                let statColor = '';

                // Apply equipment modifiers
                const characteristicModifiers = {};
                (fighter.equipment || []).forEach(item => {
                    const normalized = normalizeEquipment(item);
                    const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === normalized.name);
                    if (masterItem && masterItem.characteristicModifiers) {
                        Object.keys(masterItem.characteristicModifiers).forEach(modStat => {
                            characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + masterItem.characteristicModifiers[modStat];
                        });
                    }
                });

                // Apply skill characteristic modifiers
                if (fighter.skills && SKILLS) {
                    fighter.skills.forEach(skillName => {
                        const skill = findSkillForWarband(skillName, null, fighter);
                        if (skill && skill.characteristicModifiers) {
                            Object.keys(skill.characteristicModifiers).forEach(modStat => {
                                characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + skill.characteristicModifiers[modStat];
                            });
                        }
                    });
                }

                // Apply injury modifiers
                if (fighter.injuries && fighter.injuries.length > 0) {
                    fighter.injuries.forEach(injuryName => {
                        const injury = MASTER_INJURY_LIST.find(i => i.name === injuryName);
                        if (injury && injury.characteristicModifiers) {
                            Object.keys(injury.characteristicModifiers).forEach(modStat => {
                                characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + injury.characteristicModifiers[modStat];
                            });
                        }
                    });
                }

                const modifier = characteristicModifiers[stat] || 0;
                if (modifier !== 0) {
                    statValue = Math.max(0, statValue + modifier);
                    statColor = modifier > 0 ? 'text-green-400' : 'text-red-400';
                }

                const penaltyResult = applyHeavyArmourShieldPenalty(stat, statValue, fighter.equipment, fighter.special_rules, fighter.skills);
                statValue = penaltyResult.value;
                if (penaltyResult.color) statColor = penaltyResult.color;

                const paviseResult = applyPaviseMovementPenalty(stat, statValue, fighter.equipment);
                statValue = paviseResult.value;
                if (paviseResult.color) statColor = paviseResult.color;

                return `
                <div class="flex flex-col">
                    <span class="text-xs uppercase text-slate-400" title="${getStatTitle(stat)}">${getStatLabel(stat)}</span>
                    <span class="font-bold text-lg ${statColor}">${statValue}</span>
                </div>
                `;
            }).join('');
        }

        const statsGridClass = isMultiStatLine ? 'text-center p-2 rounded-lg' : 'grid grid-cols-9 gap-1 text-center bg-slate-800 p-2 rounded-lg';

        // Create move buttons (hide up for first item, down for last item, only show when ordering mode is active)
        const isFirst = index === 0;
        const isLast = index === currentWarband.members.length - 1;
        const isOrderingModeActive = getIsOrderingMode();
        const moveButtons = isOrderingModeActive ? `
            <div class="flex space-x-1 ml-2">
                ${!isFirst ? `<button data-action="move-fighter-up" data-fighter-id="${fighter.id}" class="py-1 px-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition shadow-md" title="Move Up">
                    <i class="fas fa-chevron-up"></i>
                </button>` : '<div class="w-8"></div>'}
                ${!isLast ? `<button data-action="move-fighter-down" data-fighter-id="${fighter.id}" class="py-1 px-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition shadow-md" title="Move Down">
                    <i class="fas fa-chevron-down"></i>
                </button>` : '<div class="w-8"></div>'}
            </div>
        ` : '';

        // Filter out spells from skills display
        const groupName = getMagicGroupForFighter(fighter);
        let allSpellsInGroup = [];
        let skillsToShow = fighter.skills || [];

        // Get all spells for this fighter's magic group(s)
        if (groupName) {
            allSpellsInGroup = getSpellsForGroup(groupName);
        } else {
            // Handle multi-lore fighters
            const rules = fighter.special_rules ? fighter.special_rules.split(';').map(r => r.trim()) : [];
            const magicGroups = Object.keys(MAGIC);
            const availableMagicGroups = rules.filter(rule => magicGroups.includes(rule));
            
            if (availableMagicGroups.length > 0) {
                availableMagicGroups.forEach(group => {
                    const groupSpells = getSpellsForGroup(group);
                    allSpellsInGroup.push(...groupSpells);
                });
            }
        }

        // Remove duplicates and filter out spells from skills
        const uniqueSpells = [...new Set(allSpellsInGroup)];
        skillsToShow = skillsToShow.filter(skill => !uniqueSpells.includes(skill));
        
        // Get actual spells this fighter has (from magic field for V2, skills for V1)
        let fighterSpells;
        if (currentWarband._isV2) {
            fighterSpells = fighter.magic || [];
        } else {
            fighterSpells = (fighter.skills || []).filter(skill => uniqueSpells.includes(skill));
        }

        // Create clickable spell HTML
        const spellsHtml = fighterSpells.length > 0 
            ? fighterSpells.map(spell => 
                `<span class="underline cursor-pointer" data-spell="${spell}">${spell}</span>`
              ).join(', ')
            : '';

        // Create clickable skills HTML
        const skillsHtml = skillsToShow.length > 0 
            ? skillsToShow.map(skill => 
                `<span class="underline cursor-pointer" data-skill="${skill}" data-fighter-id="${fighter.id}">${skill}</span>`
              ).join(', ')
            : 'None';

        // Create clickable special rules HTML
        let specialRulesHtml = 'None';
        if (fighter.special_rules) {
            const rulesArray = fighter.special_rules.split(';').map(r => r.trim());
            specialRulesHtml = rulesArray.map(ruleName => {
                const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);
                if (ruleData) {
                    return `<span class="underline cursor-pointer" data-rule="${ruleName}">${ruleName}</span>`;
                } else {
                    return `<span>${ruleName}</span>`;
                }
            }).join(', ');
        }

        // Create clickable injuries HTML
        const injuriesHtml = (fighter.injuries && fighter.injuries.length > 0)
            ? fighter.injuries.map(injuryName => {
                const injuryData = MASTER_INJURY_LIST.find(i => i.name === injuryName);
                if (injuryData) {
                    return `<span class="underline cursor-pointer" data-injury="${injuryName}">${injuryName}</span>`;
                }
                return `<span>${injuryName}</span>`;
            }).join(', ')
            : 'None';

        return `
        <div class="bg-slate-700 p-4 rounded-xl shadow-lg border-l-4 ${isHenchman ? 'border-yellow-500' : 'border-red-500'} transition hover:shadow-2xl">
            <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                    <h4 class="text-xl font-bold">${fighter.name}</h4>
                    <p class="text-sm text-slate-400">${getFighterTypeSubtitle(fighter)} ${isHenchman ? `x${groupSize}` : ''}</p>
                    <p class="text-xs text-slate-500 mt-1">PX: ${formatXPDisplay(fighter.xp)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    ${moveButtons}
                    <button data-action="edit-notes" data-fighter-id="${fighter.id}" class="py-1 px-2.5 bg-slate-600 text-white hover:bg-slate-500 text-sm rounded-lg transition shadow-md" title="Notas del Guerrero">
                        <i class="fas fa-sticky-note ${fighter.notes ? 'text-mordheim-gold' : 'text-slate-400'}"></i>
                    </button>
                    <button data-action="gear-fighter" data-fighter-id="${fighter.id}" class="py-1 px-3 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-500 transition shadow-md" title="Comprar y gestionar equipo">
                        Equipo
                    </button>
                    <button data-action="edit-fighter" data-fighter-id="${fighter.id}" class="py-1 px-3 bg-slate-600 text-white text-sm rounded-lg hover:bg-slate-500 transition shadow-md">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 mb-2">
                ${styleInfo}
            </div>
            <div class="${statsGridClass}">
                ${statsHTML}
            </div>
            <div class="mt-3 text-sm">
                <p class="font-semibold text-slate-300 mb-1">Equipo:</p>
                <div class="flex flex-wrap gap-2">${equipmentList || '<span class="text-slate-500 text-xs">Ninguno</span>'}</div>
            </div>
            <div class="mt-3 border-t border-slate-600 pt-2 text-xs text-slate-400">
                <p>Habilidades: ${skillsHtml}</p>
                ${spellsHtml ? `<p>Magia: ${spellsHtml}</p>` : ''}
                <p>Reglas Especiales: ${specialRulesHtml}</p>
                <p>Heridas Graves: ${injuriesHtml}</p>
            </div>
        </div>
        `;
    }).join('');
    rosterContainer.innerHTML = rosterHTML;
    
    // Render Stored Equipment
    const storedList = document.getElementById('stored-equipment-list');
    storedList.innerHTML = '';
    
    if (currentWarband.stored_equipment.length === 0) {
        storedList.innerHTML = `<li class="text-slate-500 py-3 text-center">La Armería de la Banda está vacía.</li>`;
    } else {
        const groupedItems = currentWarband.stored_equipment.reduce((acc, item, index) => {
            // Normalize equipment to ensure name is available
            const normalizedItem = normalizeEquipment(item);
            const key = normalizedItem.name;
            if (!acc[key]) {
                acc[key] = { count: 0, firstIndex: index, item: normalizedItem }; 
            }
            acc[key].count++;
            return acc;
        }, {});

        const storedItemsHTML = Object.values(groupedItems).map(group => `
            <li class="flex justify-between items-center p-2 bg-slate-800 rounded-md">
                <span class="text-white cursor-help" title="${group.item.rules}">${group.item.name} <span class="text-yellow-400 font-bold">x${group.count}</span></span>
                <div class="flex space-x-2">
                    <button data-action="sell-from-storage" data-item-name="${group.item.name}" data-item-cost="${typeof group.item.variableCost === 'number' ? group.item.variableCost : group.item.cost}" data-item-quantity="${group.count}" class="py-0.5 px-2 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition">
                        Sell
                    </button>
                    <button data-action="take-from-storage" data-item-index="${group.firstIndex}" class="py-0.5 px-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition">
                        Retrieve
                    </button>
                </div>
            </li>
        `).join('');
        storedList.innerHTML = storedItemsHTML;
    }
};

/** Toggles the visibility of the Group Size input based on Fighter Role. */
export const toggleGroupSize = () => {
    const role = document.getElementById('f-type').value.trim();
    const wrapper = document.getElementById('group-size-wrapper');
    const groupSizeInput = document.getElementById('f-group-size');
    const advancementWrapper = document.getElementById('hero-xp-bar-wrapper');
    const warriorChoiceWrapper = document.getElementById('warrior-choice-wrapper');
    const dramatisPersonaeWrapper = document.getElementById('dramatis-personae-wrapper');
    const hiredSwordWrapper = document.getElementById('hired-sword-wrapper');

    const statsGrid = document.getElementById('stats-grid');
    const vehicleWrapper = document.getElementById('vehicle-wrapper');
    const raceLabel = document.querySelector('label[for="f-race"]');
    const raceSelect = document.getElementById('f-race');
    const equipmentSection = document.getElementById('equipment-section');
    const racialMaximumsDisplay = document.getElementById('racial-maximums-display');

    // Show racial maximums by default
    racialMaximumsDisplay.classList.remove('hidden');

    // Hide all conditional wrappers by default
    warriorChoiceWrapper.classList.add('hidden');
    dramatisPersonaeWrapper.classList.add('hidden');
    hiredSwordWrapper.classList.add('hidden');
    vehicleWrapper.classList.add('hidden');
    wrapper.classList.add('hidden');
    advancementWrapper.classList.add('hidden');

    const fighterName = document.getElementById('f-name').value.trim();

    if (role === 'Henchman') {
        // Apply standard logic for group size
        wrapper.classList.remove('hidden');
        advancementWrapper.classList.remove('hidden');
        warriorChoiceWrapper.classList.remove('hidden');

        // Apply Carnival of Chaos specific UI adjustments
        applyCarnivalOfChaosUILogic(role, fighterName, wrapper);
    } else if (role === 'Hero') {
        advancementWrapper.classList.remove('hidden');
        warriorChoiceWrapper.classList.remove('hidden');
    } else if (role === 'Dramatis Personae') {
        dramatisPersonaeWrapper.classList.remove('hidden');
        advancementWrapper.classList.remove('hidden');
    } else if (role === 'Hired Sword') {
        hiredSwordWrapper.classList.remove('hidden');
        advancementWrapper.classList.remove('hidden');
    } else if (role === 'Vehicle') {
        vehicleWrapper.classList.remove('hidden');
        advancementWrapper.classList.remove('hidden');
        // Hide race field and max stats for vehicles as it's not applicable
        if (raceLabel) raceLabel.classList.add('hidden');
        if (raceSelect) raceSelect.classList.add('hidden');
        racialMaximumsDisplay.classList.add('hidden');
        // Hide skills and injuries sections for vehicles as they don't have these, but keep special rules visible
        const verticalSkillsWrapper = document.getElementById('vertical-skills-wrapper');
        if (verticalSkillsWrapper) {
            // Hide skills and injuries divs, but keep special rules visible
            const children = verticalSkillsWrapper.children;
            if (children.length >= 2) {
                children[0].classList.add('hidden'); // Skills section
                children[1].classList.add('hidden'); // Injuries section
            }
        }
        const horizontalSkillsSection = document.getElementById('horizontal-skills-section');
        if (horizontalSkillsSection) {
            // Hide skills container, but keep rules container visible
            const horizontalSkills = document.getElementById('horizontal-skills-container');
            if (horizontalSkills) horizontalSkills.classList.add('hidden');
        }
        // Initialize horizontal layout for vehicles (they always have "None" equipment)
        // toggleSkillsLayout(["None"], ""); // Removed - vehicles already hide skills/injuries sections above
    }

    // Show race field, equipment section, and skills/injuries sections for all non-vehicle roles
    if (role !== 'Vehicle') {
        if (statsGrid) statsGrid.classList.remove('hidden');
        if (raceLabel) raceLabel.classList.remove('hidden');
        if (raceSelect) raceSelect.classList.remove('hidden');
        if (equipmentSection) equipmentSection.classList.remove('hidden');
        // Show skills and injuries sections for non-vehicle roles
        const verticalSkillsWrapper = document.getElementById('vertical-skills-wrapper');
        if (verticalSkillsWrapper) {
            verticalSkillsWrapper.classList.remove('hidden');
            // Show skills and injuries divs that were hidden for vehicles
            const children = verticalSkillsWrapper.children;
            if (children.length >= 2) {
                children[0].classList.remove('hidden'); // Skills section
                children[1].classList.remove('hidden'); // Injuries section
            }
        }
        const horizontalSkillsSection = document.getElementById('horizontal-skills-section');
        if (horizontalSkillsSection) {
            horizontalSkillsSection.classList.add('hidden'); // Start with vertical layout
            // Show skills container that was hidden for vehicles
            const horizontalSkills = document.getElementById('horizontal-skills-container');
            if (horizontalSkills) horizontalSkills.classList.remove('hidden');
        }
    }

    if (role !== 'Henchman') {
        groupSizeInput.value = 1;
    }

    // Show stats grid for all roles, including vehicles
    if (statsGrid) statsGrid.classList.remove('hidden');

    updateGroupSizeDisplay();
};

/** Toggles the visibility of experience-related elements based on special rules */
export const toggleExperienceVisibility = (specialRulesString) => {
    const hasNoExperienceRule = specialRulesString && specialRulesString.includes('Do not gain experience');
    const xpInputContainer = document.getElementById('f-xp').parentElement; // The div containing the XP input
    const xpLabel = xpInputContainer.previousElementSibling; // The label element before the input container
    const xpBarWrapper = document.getElementById('hero-xp-bar-wrapper');

    if (hasNoExperienceRule) {
        xpInputContainer.classList.add('hidden');
        if (xpLabel && xpLabel.textContent.includes('Experience (XP)')) {
            xpLabel.classList.add('hidden');
        }
        xpBarWrapper.classList.add('hidden');
    } else {
        xpInputContainer.classList.remove('hidden');
        if (xpLabel && xpLabel.textContent.includes('Experience (XP)')) {
            xpLabel.classList.remove('hidden');
        }
        // Don't automatically show the advancement wrappers here, let other functions handle it
    }
};

/** Resets all component visibility to default state before applying specific layout logic */
export const resetComponentVisibility = () => {
    // Show all main sections by default
    const equipmentSection = document.getElementById('equipment-section');
    const verticalWrapper = document.getElementById('vertical-skills-wrapper');
    const horizontalSection = document.getElementById('horizontal-skills-section');
    
    if (equipmentSection) equipmentSection.classList.remove('hidden');
    if (verticalWrapper) verticalWrapper.classList.remove('hidden');
    if (horizontalSection) horizontalSection.classList.add('hidden');
};

/** Toggles layout of skills/injuries/rules sections based on fighter conditions */
export const toggleSkillsLayout = (startingEquipment, specialRulesString) => {
    const currentRole = document.getElementById('f-type').value.trim();

    // For Vehicle role, keep skills/injuries sections hidden
    if (currentRole === 'Vehicle') {
        return;
    }

    const hasNoneEquipment = startingEquipment && startingEquipment.includes("None");
    const hasNoExperienceRule = specialRulesString && specialRulesString.includes('Do not gain experience');
    const shouldUseHorizontal = hasNoneEquipment || hasNoExperienceRule;


    const verticalWrapper = document.getElementById('vertical-skills-wrapper');
    const horizontalSection = document.getElementById('horizontal-skills-section');
    const horizontalSkills = document.getElementById('horizontal-skills-container');
    const horizontalRules = document.getElementById('horizontal-rules-container');

    // Elements to move
    const skillsDiv = document.querySelector('#f-skills').parentElement;
    const injuriesDiv = document.querySelector('#f-injuries-list').parentElement;
    const rulesDiv = document.querySelector('#warrior-rules-display').parentElement;
    const advancementsWrapper = document.getElementById('advancements-taken-wrapper');

    if (shouldUseHorizontal) {
        // Move elements to horizontal layout - skills and injuries in left column, rules in right column
        if (horizontalSkills && skillsDiv) {
            horizontalSkills.appendChild(skillsDiv);
        }
        if (horizontalSkills && injuriesDiv) {
            horizontalSkills.appendChild(injuriesDiv);
        }
        if (horizontalRules && rulesDiv) {
            horizontalRules.appendChild(rulesDiv);
            if (advancementsWrapper) {
                horizontalRules.appendChild(advancementsWrapper);
            }
        }
        // Show horizontal, hide vertical
        verticalWrapper.classList.add('hidden');
        horizontalSection.classList.remove('hidden');
    } else {
        // Move elements back to vertical layout
        if (verticalWrapper && skillsDiv) {
            // First, ensure elements are not null
            if (!injuriesDiv) {
                injuriesDiv = document.querySelector('#f-injuries-list').parentElement;
            }
            if (!rulesDiv) {
                rulesDiv = document.querySelector('#warrior-rules-display').parentElement;
            }
            if (!advancementsWrapper) {
                advancementsWrapper = document.getElementById('advancements-taken-wrapper');
            }
            
            // Clear vertical wrapper first to ensure clean state
            while (verticalWrapper.firstChild) {
                verticalWrapper.removeChild(verticalWrapper.firstChild);
            }
            
            // Re-add elements in the correct order
            if (skillsDiv) verticalWrapper.appendChild(skillsDiv);
            if (injuriesDiv) verticalWrapper.appendChild(injuriesDiv);
            if (rulesDiv) verticalWrapper.appendChild(rulesDiv);
            if (advancementsWrapper) verticalWrapper.appendChild(advancementsWrapper);
        }
        // Show vertical, hide horizontal
        if (verticalWrapper) verticalWrapper.classList.remove('hidden');
        if (horizontalSection) horizontalSection.classList.add('hidden');
    }
};

/** Updates the visibility/state of the Manage Group Size link */
export const updateGroupSizeDisplay = () => {
    const role = document.getElementById('f-type').value.trim();
    const manageLink = document.getElementById('manage-group-link');
    
    // Check if this is an EDIT operation (fighter-id is present)
    const isEditing = document.getElementById('fighter-id').value;
    
    if (role === 'Henchman' && isEditing) {
        manageLink.classList.remove('hidden');
    } else {
        manageLink.classList.add('hidden');
    }
};



export const showResetPasswordForm = () => {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('reset-password-form').classList.remove('hidden');
    document.getElementById('reset-email').focus();
    // Clear any previous messages
    document.getElementById('reset-error').classList.add('hidden');
    document.getElementById('reset-success').classList.add('hidden');
};

export const showLoginForm = () => {
    document.getElementById('reset-password-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('login-email').focus();
};

// Authentication UI functions
export const showAuthModal = () => {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('login-tab').classList.add('bg-mordheim-gold', 'text-slate-900');
    document.getElementById('login-tab').classList.remove('bg-slate-600', 'text-white');
    document.getElementById('register-tab').classList.remove('bg-mordheim-gold', 'text-slate-900');
    document.getElementById('register-tab').classList.add('bg-slate-600', 'text-white');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('reset-password-form').classList.add('hidden');
    document.getElementById('login-email').focus();
};

export const hideAuthModal = () => {
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('login-form-element').reset();
    document.getElementById('register-form-element').reset();
    document.getElementById('login-error').classList.add('hidden');
    document.getElementById('register-error').classList.add('hidden');
};

export const switchToLoginTab = () => {
    document.getElementById('login-tab').classList.add('bg-mordheim-gold', 'text-slate-900');
    document.getElementById('login-tab').classList.remove('bg-slate-600', 'text-white');
    document.getElementById('register-tab').classList.remove('bg-mordheim-gold', 'text-slate-900');
    document.getElementById('register-tab').classList.add('bg-slate-600', 'text-white');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-email').focus();
};

export const switchToRegisterTab = () => {
    document.getElementById('register-tab').classList.add('bg-mordheim-gold', 'text-slate-900');
    document.getElementById('register-tab').classList.remove('bg-slate-600', 'text-white');
    document.getElementById('login-tab').classList.remove('bg-mordheim-gold', 'text-slate-900');
    document.getElementById('login-tab').classList.add('bg-slate-600', 'text-white');
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-email').focus();
};

export const showAuthError = (type, message) => {
    const errorDiv = document.getElementById(`${type}-error`);
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
};

/** Displays the racial maximums based on the selected race */
export const renderRacialMaximums = () => {
    const raceSelect = document.getElementById('f-race');
    const displayDiv = document.getElementById('racial-maximums-display');
    const selectedRace = raceSelect.value;

    if (!selectedRace || selectedRace === '') {
        displayDiv.innerHTML = `<p class="text-slate-400">Selecciona una raza para ver los atributos máximos.</p>`;
        return;
    }

    const maximums = RACIAL_MAXIMUMS[selectedRace];

    if (!maximums) {
        displayDiv.innerHTML = `<p class="text-red-400">No se han encontrado atributos máximos para ${translateRace(selectedRace)}.</p>`;
        return;
    }

    const maxHtml = STATS_FIELDS.map(stat => {
        const maxVal = maximums[stat] !== undefined ? maximums[stat] : '-';
        // Check if the current input value exceeds the maximum for visual warning
        const inputElement = document.getElementById(`stat-${stat}`);
        let isOverMax = false;
        if (inputElement && typeof maxVal === 'number' && !isIgnoreRacialMaximumsActive) {
            if (parseInt(inputElement.value) > maxVal) {
                isOverMax = true;
            }
        }

        return `
            <span class="${isOverMax ? 'text-red-400 font-bold' : 'text-slate-300'}">
                ${getStatLabel(stat)}: ${maxVal}
            </span>
        `;
    }).join(' | ');

    displayDiv.innerHTML = `<p class="font-bold text-mordheim-gold">Atributos Máximos (${translateRace(selectedRace)}):</p><p class="mt-1">${maxHtml}</p>`;

    // Re-render stat inputs to apply any color/styling changes based on new max.
    // For simplicity, we rely on the save function to check the actual data.
};




/** Renders the input fields for a fighter's stats */
export const renderStatInputs = (stats = {}) => {
    const container = document.getElementById('stats-grid');

    // Handle multi-stat fighters (with mounts/vehicles) - render each component separately
    const isMultiStat = stats && Object.values(stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v));

    if (isMultiStat) {
        // Multi-stat fighter: render each statline separately
        container.className = ''; // Remove grid layout for stacking components
        const statLineKeys = Object.keys(stats);
        container.innerHTML = statLineKeys.map(statLineKey => {
            const statLineStats = stats[statLineKey];
            return `
                <div class="mb-4">
                    <div class="text-center font-bold text-slate-300 mb-1 uppercase text-sm">${statLineKey}</div>
                    <div class="grid grid-cols-9 gap-px sm:gap-2 justify-items-stretch bg-slate-800 p-2 rounded-lg">
                        ${STATS_FIELDS.map(stat => `
                            <div class="stat-box min-w-0">
                                <label for="stat-${statLineKey}-${stat}" class="stat-box-label" title="${getStatTitle(stat)}">${getStatLabel(stat)}</label>
                                <input
                                    type="number"
                                    id="stat-${statLineKey}-${stat}"
                                    value="${statLineStats[stat] !== undefined ? statLineStats[stat] : 3}"
                                    class="stat-box-value w-full text-center bg-transparent border-0 shadow-none focus:outline-none p-0"
                                    min="0"
                                    disabled
                                >
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    } else {
        // Single-stat fighter
        container.className = 'grid grid-cols-9 gap-px sm:gap-2 justify-items-stretch';
        container.innerHTML = STATS_FIELDS.map(stat => `
            <div class="stat-box min-w-0">
                <label for="stat-${stat}" class="stat-box-label" title="${getStatTitle(stat)}">${getStatLabel(stat)}</label>
                <input
                    type="number"
                    id="stat-${stat}"
                    value="${stats[stat] !== undefined ? stats[stat] : 3}"
                    class="stat-box-value w-full text-center bg-transparent border-0 shadow-none focus:outline-none p-0"
                    min="0"
                    disabled
                >
            </div>
        `).join('');
    }
};

/** Renders the race options dropdown */
export const renderRaceOptions = (selectedRace, races = null) => {
    const select = document.getElementById('f-race');
    // If no races provided, use all from RACIAL_MAXIMUMS
    if (!races) {
        races = Object.keys(RACIAL_MAXIMUMS).sort();
    }
    select.innerHTML = races.map(race => `<option value="${race}" ${race === selectedRace ? 'selected' : ''}>${translateRace(race)}</option>`).join('');
};

/** Populates the warband selection with collapsible grade sections */
export const populateWarbandTypes = () => {
    const container = document.getElementById('warband-selection-container');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    WARBANDS.forEach((grade, gradeIndex) => {
        // Create grade section
        const gradeSection = document.createElement('div');
        gradeSection.className = 'grade-section';

        let gradeTitle = grade.grade;
        if (gradeTitle === 'Core Warband') gradeTitle = 'Bandas Principales (Reglamento)';
        else if (gradeTitle === 'Grade 1a') gradeTitle = 'Bandas Grado 1a (Oficiales GW)';
        else if (gradeTitle === 'Grade 1b') gradeTitle = 'Bandas Grado 1b (Ampliaciones)';
        else if (gradeTitle === 'Grade 1c') gradeTitle = 'Bandas Grado 1c';
        else if (gradeTitle === 'Grade 2') gradeTitle = 'Bandas Grado 2 (Town Cryer / Fanatic)';

        // Create grade header
        const gradeHeader = document.createElement('div');
        gradeHeader.className = 'grade-header';
        gradeHeader.innerHTML = `
            <span>${gradeTitle}</span>
            <i class="fas fa-chevron-right chevron"></i>
        `;

        // Create grade content
        const gradeContent = document.createElement('div');
        gradeContent.className = 'grade-content';
        gradeContent.id = `grade-content-${gradeIndex}`;

        // Add warbands to grade content
        grade.warbands.forEach(warband => {
            if (warband.sublist) {
                // Add main warband as non-clickable header
                const mainWarband = document.createElement('div');
                mainWarband.className = 'warband-option';
                mainWarband.textContent = translateWarband(warband.name);
                mainWarband.style.fontWeight = '600';
                mainWarband.style.cursor = 'default';
                gradeContent.appendChild(mainWarband);

                // Add sublist items
                warband.sublist.forEach(sub => {
                    const subOption = document.createElement('div');
                    subOption.className = 'warband-option sub-warband';
                    subOption.textContent = translateWarband(`${warband.name}: ${sub}`);
                    subOption.dataset.value = `${warband.name}: ${sub}`;
                    gradeContent.appendChild(subOption);
                });
            } else {
                const warbandOption = document.createElement('div');
                warbandOption.className = 'warband-option';
                warbandOption.textContent = translateWarband(warband.name);
                warbandOption.dataset.value = warband.name;
                gradeContent.appendChild(warbandOption);
            }
        });

        // Add click handler for grade header
        gradeHeader.addEventListener('click', () => {
            const isExpanded = gradeHeader.classList.contains('expanded');
            
            if (isExpanded) {
                gradeHeader.classList.remove('expanded');
                gradeContent.classList.remove('expanded');
            } else {
                gradeHeader.classList.add('expanded');
                gradeContent.classList.add('expanded');
            }
        });

        // Add click handlers for warband options
        gradeContent.querySelectorAll('.warband-option[data-value]').forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                container.querySelectorAll('.warband-option.selected').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selection to clicked option
                option.classList.add('selected');
                
                // Update hidden input
                const typeInput = document.getElementById('new-warband-type');
                typeInput.value = option.dataset.value;
                typeInput.dispatchEvent(new Event('change'));
                
                // Check if create button should be enabled
                checkCreateButtonState();
            });
        });

        // Assemble grade section
        gradeSection.appendChild(gradeHeader);
        gradeSection.appendChild(gradeContent);
        container.appendChild(gradeSection);
    });

    // Add input event listener to warband name field
    const warbandNameInput = document.getElementById('new-warband-name');
    if (warbandNameInput) {
        warbandNameInput.addEventListener('input', checkCreateButtonState);
    }
};

/** Checks if create button should be enabled based on name and warband type selection */
const checkCreateButtonState = () => {
    const nameInput = document.getElementById('new-warband-name');
    const typeInput = document.getElementById('new-warband-type');
    const createBtn = document.getElementById('create-warband-confirm-btn');
    
    const hasName = nameInput.value.trim().length > 0;
    const hasType = typeInput.value.trim().length > 0;
    const canCreate = hasName && hasType;
    
    if (createBtn) {
        createBtn.disabled = !canCreate;
        if (canCreate) {
            createBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            createBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
};

/**
 * Shows the Ostermark skill set selection modal.
 * Returns a Promise that resolves with the selected skill set number ('1', '2', or '3'),
 * or null if the user cancels.
 */
export const showOstermarkSkillSetModal = () => {
    return new Promise((resolve) => {
        const modal = document.getElementById('ostermark-skillset-modal');
        const optionsContainer = document.getElementById('ostermark-skillset-options');
        const confirmBtn = document.getElementById('confirm-ostermark-skillset-btn');
        const cancelBtn = document.getElementById('cancel-ostermark-skillset-btn');

        // Find Ostermark warband data
        const ostermarkWarband = WARBANDS.flatMap(g => g.warbands).find(w => w.name === 'Mercenaries (Ostermark)');
        if (!ostermarkWarband) {
            console.error('Mercenaries (Ostermark) warband data not found');
            resolve(null);
            return;
        }

        const heroes = ostermarkWarband.data.warriors.filter(w => w.type === 'hero');

        const SKILL_SETS = [
            { key: '1', label: 'Reikland', prop: 'skills_1' },
            { key: '2', label: 'Middenheim', prop: 'skills_2' },
            { key: '3', label: 'Marienburg', prop: 'skills_3' }
        ];

        let selectedSet = null;

        // Build option cards
        optionsContainer.innerHTML = SKILL_SETS.map(set => {
            const rows = heroes.map(hero => {
                const skills = hero[set.prop] || [];
                return `<tr>
                    <td class="py-1.5 px-2 text-slate-300 font-medium border-b border-slate-600">${hero.name}</td>
                    <td class="py-1.5 px-2 text-slate-400 border-b border-slate-600">${skills.join(', ') || 'None'}</td>
                </tr>`;
            }).join('');

            return `
                <div class="ostermark-skillset-card cursor-pointer rounded-lg border-2 border-slate-600 p-4 hover:border-mordheim-gold transition-all" data-skillset="${set.key}">
                    <div class="flex items-center gap-2 mb-3">
                        <div class="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center ostermark-radio">
                            <div class="w-2.5 h-2.5 rounded-full bg-mordheim-gold hidden ostermark-radio-dot"></div>
                        </div>
                        <h4 class="text-lg font-bold text-white">${set.label}</h4>
                    </div>
                    <table class="w-full text-sm">
                        <thead>
                            <tr>
                                <th class="text-left py-1 px-2 text-mordheim-gold border-b border-slate-500 w-1/3">Fighter</th>
                                <th class="text-left py-1 px-2 text-mordheim-gold border-b border-slate-500">Skill Categories</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>`;
        }).join('');

        // Reset state
        confirmBtn.disabled = true;
        confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');

        // Click handlers for cards
        const cards = optionsContainer.querySelectorAll('.ostermark-skillset-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Deselect all
                cards.forEach(c => {
                    c.classList.remove('border-mordheim-gold', 'bg-slate-600/30');
                    c.classList.add('border-slate-600');
                    c.querySelector('.ostermark-radio-dot').classList.add('hidden');
                });
                // Select this one
                card.classList.remove('border-slate-600');
                card.classList.add('border-mordheim-gold', 'bg-slate-600/30');
                card.querySelector('.ostermark-radio-dot').classList.remove('hidden');
                selectedSet = card.dataset.skillset;
                confirmBtn.disabled = false;
                confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            });
        });

        // Cleanup function to remove listeners and hide modal
        const cleanup = () => {
            confirmBtn.replaceWith(confirmBtn.cloneNode(true));
            cancelBtn.replaceWith(cancelBtn.cloneNode(true));
            hideModal('ostermark-skillset-modal');
        };

        // Button handlers
        confirmBtn.addEventListener('click', () => {
            cleanup();
            resolve(selectedSet);
        });

        cancelBtn.addEventListener('click', () => {
            cleanup();
            resolve(null);
        });

        // Show modal
        displayModal('ostermark-skillset-modal');
    });
};

export const populateWarriorChoices = (role = null) => {
    const warriorSelect = document.getElementById('f-warrior-choice');
    const warbandType = currentWarband.type;
    const warbandData = getWarbandData(warbandType);

    if (!warbandData) {
        warriorSelect.innerHTML = '<option value="">-- No data for this warband --</option>';
        return;
    }

    let warriors = warbandData.warriors;
    if (role) {
        warriors = warriors.filter(w => w.type === role.toLowerCase());
    }

    // Filter out warriors that require a specific bloodline (e.g. Ghast requires Strigoi)
    warriors = warriors.filter(w => {
        if (w.requires_bloodline) {
            return currentWarband.aristocracy === w.requires_bloodline;
        }
        return true;
    });

    // Filter out warriors excluded by Lahmian location selection
    if (currentWarband.type === 'Lahmian') {
        const location = currentWarband.location || 'Foreign';
        const excludedByLocation = {
            'Foreign': ['Wights', 'Jackals'],
            'Khemrian': ['Blood Slaves', 'Black Hounds']
        };
        const excluded = excludedByLocation[location] || [];
        warriors = warriors.filter(w => !excluded.includes(w.name));
    }
    
    warriorSelect.innerHTML = '<option value="">-- Selecciona un Guerrero --</option>';
    warriors.forEach(warrior => {
        const option = document.createElement('option');
        option.value = warrior.name;
        option.textContent = translateWarrior(warrior.name);
        warriorSelect.appendChild(option);
    });
};

/** Populates the style choices dropdown for Pit Fighters */
export const populateStyleChoices = () => {
    const styleSelect = document.getElementById('f-style-choice');
    const warbandType = currentWarband.type;
    const warbandData = getWarbandData(warbandType);

    // Only show style selection for Pit Fighters
    if (warbandType !== "Pit Fighters" || !warbandData || !warbandData.uses_styles) {
        styleSelect.innerHTML = '<option value="">-- No styles available --</option>';
        return;
    }

    styleSelect.innerHTML = '<option value="">-- Select a Style --</option>';
    warbandData.available_styles.forEach(styleId => {
        const styleData = PIT_FIGHTER_STYLES.find(s => s.id === styleId);
        if (styleData) {
            const option = document.createElement('option');
            option.value = styleData.id;
            option.textContent = `${styleData.name} (${styleData.cost} GC)`;
            styleSelect.appendChild(option);
        }
    });
};

/** Populates the starting skill choices dropdown for Ogre Hunting Party Trapper */
export const populateTrapperSkillChoices = () => {
    const trapperSkillSelect = document.getElementById('f-trapper-skill-choice');
    if (!trapperSkillSelect) return;

    const trapperSkills = getTrapperSkillOptions();

    trapperSkillSelect.innerHTML = '<option value="">-- Select a Starting Skill --</option>';
    trapperSkills.forEach(skill => {
        const option = document.createElement('option');
        option.value = skill.id;
        option.textContent = skill.name;
        trapperSkillSelect.appendChild(option);
    });

    // Attach the change event listener after populating options
    trapperSkillSelect.addEventListener('change', handleTrapperSkillSelection);
};

/** Handles Trapper skill selection change */
export const handleTrapperSkillSelection = () => {
    const trapperSkillSelect = document.getElementById('f-trapper-skill-choice');
    const selectedSkillId = trapperSkillSelect.value;
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    const skillsDisplay = document.getElementById('f-skills');

    let currentSkills = [];
    try {
        currentSkills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        currentSkills = [];
    }

    // Remove any existing Trapper starting skill
    const trapperSkillIds = [133, 267, 268, 265];
    currentSkills = currentSkills.filter(skillName => {
        const skillData = findSkillForWarband(skillName);
        return !skillData || !trapperSkillIds.includes(skillData.id);
    });

    // Add the selected skill if one is chosen
    if (selectedSkillId) {
        const skillData = SKILLS.find(s => s.id === parseInt(selectedSkillId));
        if (skillData && !currentSkills.includes(skillData.name)) {
            currentSkills.push(skillData.name);
        }
    }

    // Update hidden input
    skillsHiddenInput.value = JSON.stringify(currentSkills);

    // Update display
    if (currentSkills.length > 0) {
        const skillsHtml = currentSkills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
        skillsDisplay.innerHTML = skillsHtml;
    } else {
        skillsDisplay.textContent = 'Ninguna';
    }
};

/** Populates the starting Beast Handling skill choices dropdown for Skaven of Clan Moulder Packmaster */
export const populatePackmasterBeastHandlingChoices = () => {
    const packmasterBeastHandlingSelect = document.getElementById('f-packmaster-beast-handling-choice');
    if (!packmasterBeastHandlingSelect) return;

    const beastHandlingOptions = getPackmasterBeastHandlingOptions();

    packmasterBeastHandlingSelect.innerHTML = '<option value="">-- Select a Beast Handling Skill --</option>';
    beastHandlingOptions.forEach(skill => {
        const option = document.createElement('option');
        option.value = skill.id;
        option.textContent = skill.name;
        packmasterBeastHandlingSelect.appendChild(option);
    });

    };

/** Handles Packmaster Beast Handling skill selection change */
export const handlePackmasterBeastHandlingSelection = () => {
    const packmasterBeastHandlingSelect = document.getElementById('f-packmaster-beast-handling-choice');
    const selectedSkillId = packmasterBeastHandlingSelect.value;
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    const skillsDisplay = document.getElementById('f-skills');

    let currentSkills = [];
    try {
        currentSkills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        currentSkills = [];
    }

    // Remove any existing Packmaster Beast Handling starting skill (Animal Handling with specific names)
    currentSkills = currentSkills.filter(skillName => {
        return !skillName.includes('Animal Handling');
    });

    // Add the selected skill if one is chosen
    if (selectedSkillId) {
        const skillData = SKILLS.find(s => s.id === parseInt(selectedSkillId));
        if (skillData) {
            // Use the specific name from the options
            const beastHandlingOptions = getPackmasterBeastHandlingOptions();
            const selectedOption = beastHandlingOptions.find(opt => opt.id === parseInt(selectedSkillId));
            if (selectedOption && !currentSkills.includes(selectedOption.name)) {
                currentSkills.push(selectedOption.name);
            }
        }
    }

    // Update hidden input
    skillsHiddenInput.value = JSON.stringify(currentSkills);

    // Update display
    if (currentSkills.length > 0) {
        const skillsHtml = currentSkills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
        skillsDisplay.innerHTML = skillsHtml;
    } else {
        skillsDisplay.textContent = 'None';
    }
};

/** Handles style selection change for Pit Fighters */
export const handleStyleSelection = () => {
    const styleSelect = document.getElementById('f-style-choice');
    const selectedStyleId = styleSelect.value;
    const selectedWarriorName = document.getElementById('f-warrior-choice').value;
    const warbandData = getWarbandData(currentWarband.type);
    
    if (!selectedStyleId || !selectedWarriorName || !warbandData) {
        return;
    }

    const selectedWarrior = warbandData.warriors.find(w => w.name === selectedWarriorName);
    if (!selectedWarrior || !selectedWarrior.requires_style) {
        return;
    }

    const styleData = PIT_FIGHTER_STYLES.find(s => s.id === selectedStyleId);
    if (!styleData) {
        return;
    }

    // Convert style equipment IDs to equipment objects
    const styleEquipment = styleData.equipment_ids.map(equipmentId => {
        const equipmentItem = MASTER_EQUIPMENT_LIST.find(item => item.id === equipmentId);
        if (equipmentItem) {
            return {
                name: equipmentItem.name,
                cost: equipmentItem.cost,
                rules: equipmentItem.rules
            };
        }
        return null;
    }).filter(Boolean);

    // Set the equipment to the style's equipment
    document.getElementById('f-equipment-json').value = JSON.stringify(styleEquipment);
    renderSelectedEquipment();
    renderArmorSave();
    updateStatModifiers();

    // Update the fighter's cost to include the style cost
    const baseCost = parseInt(document.getElementById('f-cost').value) || 0;
    const styleCost = styleData.cost || 0;
    document.getElementById('f-cost').value = baseCost + styleCost;

    // Add the style's rules to the fighter's special rules
    const specialRulesInput = document.getElementById('f-special-rules');
    let currentRules = specialRulesInput.value.trim();
    if (currentRules) {
        currentRules += '; ';
    }
    currentRules += styleData.rules;
    specialRulesInput.value = currentRules;

    // Update the rules display
    updateWarriorRulesDisplay();

    // Re-render XP bar with updated special rules (use null for add fighter modal - reads from DOM)
    renderFighterXPBar(null);

    // Update equipment display prices immediately after special rules change
    renderEquipmentOptions();
};

export const updateFighterDataFromSelection = () => {
    const warriorSelect = document.getElementById('f-warrior-choice');
    const selectedWarriorName = warriorSelect.value;
    const warbandType = currentWarband.type;
    const warbandData = getWarbandData(warbandType);
    if (!warbandData) return;

    const selectedWarrior = warbandData.warriors.find(w => w.name === selectedWarriorName);

    if (selectedWarrior) {
        // Always clear multi-stats from previous selection (e.g. mounted hired sword)
        setCurrentFighterMultiStats(null);

        // Only auto-fill the name if the user hasn't entered a custom name.
        // We consider the name "custom" if it's non-empty AND doesn't match any warrior type name.
        const currentNameInput = document.getElementById('f-name');
        const currentName = currentNameInput.value.trim();
        const isNameCustom = currentName !== '' && !warbandData.warriors.some(w => w.name === currentName);
        if (!isNameCustom) {
            currentNameInput.value = selectedWarrior.name;
        }
        document.getElementById('f-type').value = selectedWarrior.type === 'hero' ? 'Hero' : 'Henchman';
        document.getElementById('f-cost').value = parseInt(selectedWarrior.hire_fee) || 0;
        document.getElementById('f-xp').value = selectedWarrior.exp;
        // Set starting skills if defined
        let initialSkills = [];
        if (selectedWarrior.starting_skill && Array.isArray(selectedWarrior.starting_skill)) {
            const startingSkillNames = selectedWarrior.starting_skill.map(id => {
                const skillData = SKILLS.find(s => s.id === id);
                return skillData ? skillData.name : null;
            }).filter(Boolean);
            initialSkills = startingSkillNames;
        }

        // Render magic selection if applicable
        const startingSpells = getStartingSpells(selectedWarrior);
        renderMagicSelection({ special_rules: selectedWarrior.rules || '' }, startingSpells);

        // Add starting skills for Marauders of Chaos (The Hung)
        if (warbandType === 'Marauders of Chaos (The Hung)') {
            const additionalSkills = getMaraudersOfChaosTheHungStartingSkills(selectedWarrior.name);
            initialSkills = [...initialSkills, ...additionalSkills];
        }

        // Add starting skills for Merchant Caravans
        if (warbandType === 'Merchant Caravans') {
            const additionalSkills = getMerchantCaravansStartingSkills(selectedWarrior.name);
            initialSkills = [...initialSkills, ...additionalSkills];
        }

        // Add starting skills for Ogre Hunting Party
        if (warbandType === 'Ogre Hunting Party') {
            const additionalSkills = getOgreHuntingPartyStartingSkills(selectedWarrior.name);
            initialSkills = [...initialSkills, ...additionalSkills];
        }

        // Add starting skills for Skaven of Clan Moulder
        if (warbandType === 'Skaven of Clan Moulder') {
            const additionalSkills = getSkavenMoulderStartingSkills(selectedWarrior.name);
            initialSkills = [...initialSkills, ...additionalSkills];
        }

        document.getElementById('f-skills-hidden').value = JSON.stringify(initialSkills);

        const skillsDisplay = document.getElementById('f-skills');
        if (initialSkills.length > 0) {
            const skillsHtml = initialSkills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
            skillsDisplay.innerHTML = skillsHtml;
        } else {
            skillsDisplay.textContent = 'None';
        }
        
        const rulesDisplay = document.getElementById('warrior-rules-display');
        if (selectedWarrior.rules) {
            const rulesHtml = selectedWarrior.rules.split(';').map(rule => {
                const ruleName = rule.trim().split('(')[0].trim();
                return `<span class="underline cursor-pointer" data-rule="${ruleName}">${rule.trim()}</span>`;
            }).join('<br>');
            rulesDisplay.innerHTML = `${rulesHtml}`;
        } else {
            rulesDisplay.textContent = 'None';
        }
        
        const skillTablesDisplay = document.getElementById('skill-tables-display');
        const skillTablesList = document.getElementById('skill-tables-list');
        const resolvedSkills = getWarriorSkills(selectedWarrior, currentWarband);
        if (selectedWarrior.type === 'hero' && resolvedSkills.length > 0) {
            setBaseSkillCategories([...resolvedSkills]);
            skillTablesList.textContent = resolvedSkills.join(', ');
            skillTablesDisplay.classList.remove('hidden');
        } else {
            setBaseSkillCategories([]);
            skillTablesDisplay.classList.add('hidden');
        }

        // Set stats from warband data if available
        if (selectedWarrior.stats) {
            setCurrentFighterBaseStats({ ...selectedWarrior.stats });
            renderStatInputs(selectedWarrior.stats);
        } else {
            // Fallback to default human stats
            const defaultStats = { M: 4, WS: 3, BS: 3, S: 3, T: 3, W: 1, I: 3, A: 1, Ld: 7 };
            setCurrentFighterBaseStats({ ...defaultStats });
            renderStatInputs(defaultStats);
        }

        // Lahmian Beloved: use alt equipment based on location
        if (currentWarband.type === 'Lahmian' && selectedWarrior.name === 'Beloved') {
            const location = currentWarband.location || 'Foreign';
            if (location === 'Khemrian' && selectedWarrior.starting_equipment_alt) {
                setAvailableEquipmentFilterIds(selectedWarrior.starting_equipment_alt);
            } else {
                setAvailableEquipmentFilterIds(selectedWarrior.starting_equipment || []);
            }
        } else {
            setAvailableEquipmentFilterIds(selectedWarrior.starting_equipment || []);
        }

        // Store initial_equipment for later re-addition if needed
        const initialEquipmentIds = selectedWarrior.initial_equipment || [];
        
        // Add initial_equipment items to the fighter's equipment
        if (initialEquipmentIds.length > 0) {
            const currentEquipmentInput = document.getElementById('f-equipment-json');
            let currentEquipment = currentEquipmentInput.value ? JSON.parse(currentEquipmentInput.value) : [];
            
            initialEquipmentIds.forEach(id => {
                const item = MASTER_EQUIPMENT_LIST.find(i => i.id === id);
                if (item && !currentEquipment.some(eq => eq.name === item.name)) {
                    currentEquipment.push({ id: item.id, name: item.name, cost: 0, rules: item.rules });
                }
            });
            
            currentEquipmentInput.value = JSON.stringify(currentEquipment);
            
            // Check if the equipment includes a mount and apply mount stats
            const hasMount = currentEquipment.some(item => {
                const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
                return masterItem && masterItem.category === 'Mounts';
            });
            
            if (hasMount && selectedWarrior.stats) {
                const multiStats = applyMountStats(currentEquipment, selectedWarrior.stats);
                setCurrentFighterMultiStats(multiStats);
                renderStatInputs(multiStats);
            }
            
            // Delay to re-add initial_equipment and render after any resets
            setTimeout(() => {
                const jsonInput = document.getElementById('f-equipment-json');
                let finalEquipment = jsonInput.value ? JSON.parse(jsonInput.value) : [];
                
                // Re-add initial_equipment items if they were removed
                initialEquipmentIds.forEach(id => {
                    const item = MASTER_EQUIPMENT_LIST.find(i => i.id === id);
                    if (item && !finalEquipment.some(eq => eq.name === item.name)) {
                        finalEquipment.push({ id: item.id, name: item.name, cost: 0, rules: item.rules });
                    }
                });
                
                jsonInput.value = JSON.stringify(finalEquipment);
                
                // Check for mount again and apply stats if needed
                const hasMountFinal = finalEquipment.some(item => {
                    const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
                    return masterItem && masterItem.category === 'Mounts';
                });
                
                if (hasMountFinal && selectedWarrior.stats) {
                    const multiStats = applyMountStats(finalEquipment, selectedWarrior.stats);
                    setCurrentFighterMultiStats(multiStats);
                    renderStatInputs(multiStats);
                }
                
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
                renderEquipmentOptions(); // Re-render equipment options with correct filter
            }, 150);
        }
        toggleGroupSize();

        // Hide equipment section if starting_equipment is ["None"]
        const equipmentSection = document.getElementById('equipment-section');
        if (selectedWarrior.starting_equipment && selectedWarrior.starting_equipment.includes("None")) {
            equipmentSection.classList.add('hidden');
        } else {
            equipmentSection.classList.remove('hidden');
        }

        // Store special rules for turn order tracker
        document.getElementById('f-special-rules').value = selectedWarrior.rules || '';

        // Strigoi bloodline adjustments: Reviled (+10 gc for Necromancers/Dregs) and Ghoul King (-5 gc for Ghouls)
        if (currentWarband.type === 'Undead' && currentWarband.aristocracy === 'Strigoi') {
            if (selectedWarrior.name === 'Necromancer' || selectedWarrior.name === 'Dregs') {
                // Reviled: Necromancers and Dregs cost +10 gc and gain the Reviled special rule
                const currentCost = parseInt(document.getElementById('f-cost').value) || 0;
                document.getElementById('f-cost').value = currentCost + 10;

                let currentRules = document.getElementById('f-special-rules').value.trim();
                if (currentRules && !currentRules.split(';').map(r => r.trim()).includes('Reviled')) {
                    currentRules += '; Reviled';
                } else if (!currentRules) {
                    currentRules = 'Reviled';
                }
                document.getElementById('f-special-rules').value = currentRules;

                // Also update the rules display to show Reviled
                const rulesDisplay = document.getElementById('warrior-rules-display');
                if (rulesDisplay) {
                    const updatedRulesHtml = currentRules.split(';').map(rule => {
                        const ruleName = rule.trim().split('(')[0].trim();
                        return `<span class="underline cursor-pointer" data-rule="${ruleName}">${rule.trim()}</span>`;
                    }).join('<br>');
                    rulesDisplay.innerHTML = updatedRulesHtml;
                }
            } else if (selectedWarrior.name === 'Ghouls') {
                // Ghoul King: Ghoul Henchmen cost 5 gc less to hire and gain the Ghoul King special rule
                const currentCost = parseInt(document.getElementById('f-cost').value) || 0;
                document.getElementById('f-cost').value = Math.max(0, currentCost - 5);

                let currentRules = document.getElementById('f-special-rules').value.trim();
                if (currentRules && !currentRules.split(';').map(r => r.trim()).includes('Ghoul King')) {
                    currentRules += '; Ghoul King';
                } else if (!currentRules) {
                    currentRules = 'Ghoul King';
                }
                document.getElementById('f-special-rules').value = currentRules;

                // Update the rules display to show Ghoul King
                const rulesDisplay = document.getElementById('warrior-rules-display');
                if (rulesDisplay) {
                    const updatedRulesHtml = currentRules.split(';').map(rule => {
                        const ruleName = rule.trim().split('(')[0].trim();
                        return `<span class="underline cursor-pointer" data-rule="${ruleName}">${rule.trim()}</span>`;
                    }).join('<br>');
                    rulesDisplay.innerHTML = updatedRulesHtml;
                }
            }
        }

        // Re-render XP bar with special rules (use null for add fighter modal - reads from DOM)
        renderFighterXPBar(null);

        // Update equipment display prices immediately after special rules change
        renderEquipmentOptions();

        // Hide upkeep cost for regular warriors (they don't have upkeep)
        document.getElementById('f-upkeep-wrapper').classList.add('hidden');
        document.getElementById('f-upkeep-cost').textContent = '0';

        // Special case: Pirates Boatswain gets both free dagger AND free rope & hook
        if (currentWarband.type === "Pirates" && selectedWarrior.name === "Boatswains") {
            const daggerItem = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Dagger');
            const ropeHookItem = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Rope & Hook');
            if (daggerItem && ropeHookItem) {
                const newEquipment = [
                    {name: daggerItem.name, cost: 0, rules: daggerItem.rules},
                    {name: ropeHookItem.name, cost: 0, rules: ropeHookItem.rules}
                ];
                document.getElementById('f-equipment-json').value = JSON.stringify(newEquipment);
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
            }
        } else if (selectedWarrior.name === "Kroxigor") {
            // Remove any existing equipment and add free halberd
            const halberdItem = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Halberd');
            if (halberdItem) {
                const newEquipment = [{name: halberdItem.name, cost: 0, rules: halberdItem.rules}];
                document.getElementById('f-equipment-json').value = JSON.stringify(newEquipment);
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
            }
        } else if (selectedWarrior.name === "Conqueror") {
            // Special case: Lustrian Reaver Conqueror gets free Masterwork Heavy Armour, Bec de Corbin, Helmet
            const masterworkArmour = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Armour; Heavy Masterwork');
            const becDeCorbin = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Bec de Corbin');
            const helmet = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Helmet');
            if (masterworkArmour && becDeCorbin && helmet) {
                const newEquipment = [
                    {name: masterworkArmour.name, cost: 0, rules: masterworkArmour.rules},
                    {name: becDeCorbin.name, cost: 0, rules: becDeCorbin.rules},
                    {name: helmet.name, cost: 0, rules: helmet.rules}
                ];
                document.getElementById('f-equipment-json').value = JSON.stringify(newEquipment);
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
            }
        } else if (selectedWarrior.name === "Saurus Slayer") {
            // Special case: Lustrian Reaver Saurus Slayer gets free Heavy Armour, Misericordia, 2 Swords, Helmet
            const heavyArmour = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Armour; Heavy');
            const misericordia = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Misericordia');
            const sword = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Sword');
            const helmet = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Helmet');
            if (heavyArmour && misericordia && sword && helmet) {
                const newEquipment = [
                    {name: heavyArmour.name, cost: 0, rules: heavyArmour.rules},
                    {name: misericordia.name, cost: 0, rules: misericordia.rules},
                    {name: sword.name, cost: 0, rules: sword.rules},
                    {name: sword.name, cost: 0, rules: sword.rules},
                    {name: helmet.name, cost: 0, rules: helmet.rules}
                ];
                document.getElementById('f-equipment-json').value = JSON.stringify(newEquipment);
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
            }
        } else if (selectedWarrior.name === "Beastmaster") {
            // Special case: Lustrian Reaver Reaver Beastmaster gets free Heavy Armour, Spear, Sword
            const heavyArmour = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Armour; Heavy');
            const spear = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Spear');
            const sword = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Sword');
            if (heavyArmour && spear && sword) {
                const newEquipment = [
                    {name: heavyArmour.name, cost: 0, rules: heavyArmour.rules},
                    {name: spear.name, cost: 0, rules: spear.rules},
                    {name: sword.name, cost: 0, rules: sword.rules}
                ];
                document.getElementById('f-equipment-json').value = JSON.stringify(newEquipment);
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
            }
        } else if (selectedWarrior.name === "Jungle Shadow") {
            // Special case: Lustrian Reaver Jungle Shadow gets free Javelins, Light Armour, two Daggers
            const javelins = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Javelins');
            const lightArmour = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Armour; Light');
            const dagger = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Dagger');
            if (javelins && lightArmour && dagger) {
                const newEquipment = [
                    {name: javelins.name, cost: 0, rules: javelins.rules},
                    {name: lightArmour.name, cost: 0, rules: lightArmour.rules},
                    {name: dagger.name, cost: 0, rules: dagger.rules},
                    {name: dagger.name, cost: 0, rules: dagger.rules}
                ];
                document.getElementById('f-equipment-json').value = JSON.stringify(newEquipment);
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
            }
        } else if (selectedWarrior.name === "Jungle Shadow Wizard") {
            // Special case: Lustrian Reaver Jungle Shadow gets free Javelins, Light Armour, two Daggers
            const javelins = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Javelins');
            const dagger = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Dagger');
            if (javelins && lightArmour && dagger) {
                const newEquipment = [
                    {name: javelins.name, cost: 0, rules: javelins.rules},
                    {name: dagger.name, cost: 0, rules: dagger.rules},
                    {name: dagger.name, cost: 0, rules: dagger.rules}
                ];
                document.getElementById('f-equipment-json').value = JSON.stringify(newEquipment);
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
            }
        } else if (selectedWarrior.name === "Trapmaster") {
            // Special case: Lustrian Reaver Trapmaster gets free Heavy Armour, Sword, Hochland Long Rifle, Firepots, Elven Cloak
            const heavyArmour = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Armour; Heavy');
            const sword = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Sword');
            const huntingRifle = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Rifle; Hunting');
            const firepots = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Firepots Miragliano');
            const elvenCloak = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Cloak ; Elven');
            if (heavyArmour && sword && huntingRifle && firepots && elvenCloak) {
                const newEquipment = [
                    {name: heavyArmour.name, cost: 0, rules: heavyArmour.rules},
                    {name: sword.name, cost: 0, rules: sword.rules},
                    {name: huntingRifle.name, cost: 0, rules: huntingRifle.rules},
                    {name: firepots.name, cost: 0, rules: firepots.rules},
                    {name: elvenCloak.name, cost: 0, rules: elvenCloak.rules}
                ];
                document.getElementById('f-equipment-json').value = JSON.stringify(newEquipment);
                renderSelectedEquipment();
                renderArmorSave();
                updateStatModifiers();
            }
        } else {
            // Apply normal starting equipment logic for other warriors
            // This ensures that when switching FROM Kroxigor, the equipment gets properly reset
            let initialEquipment = [];
            const startingEquipment = selectedWarrior.starting_equipment || [];
            
            if (!startingEquipment.includes("None")) {
                // Normal logic for other warriors - add dagger if not "None"
                const daggerItem = MASTER_EQUIPMENT_LIST.find(i => i.name === 'Dagger');
                if (daggerItem) {
                    initialEquipment = [{name: daggerItem.name, cost: 0, rules: daggerItem.rules}];
                }
            }
            
            // Set the equipment to the appropriate starting equipment
            document.getElementById('f-equipment-json').value = JSON.stringify(initialEquipment);
            renderSelectedEquipment();
            renderArmorSave();
            updateStatModifiers();
            
            // Then update costs based on special rules
            const jsonInput = document.getElementById('f-equipment-json');
            let selectedEquipment;
            try {
                selectedEquipment = JSON.parse(jsonInput.value || '[]');
            } catch (e) {
                selectedEquipment = [];
            }
            const hasGromril = selectedWarrior.rules ? selectedWarrior.rules.split('; ').includes('Gromril') : false;
            updateEquipmentCostsForSpecialRules(selectedEquipment, document.getElementById('fighter-id').value === '', currentWarband.type === 'Dwarf Treasure Hunters', hasGromril, currentWarband.type === 'Lizardmen');
            jsonInput.value = JSON.stringify(selectedEquipment);
            renderSelectedEquipment(); // Refresh equipment display with updated costs
        }

        // Toggle experience visibility based on special rules
        toggleExperienceVisibility(selectedWarrior.rules || '');

        // Reset all component visibility to default vertical layout
        resetComponentVisibility();
        
        // Toggle skills layout based on conditions
        // toggleSkillsLayout(selectedWarrior.starting_equipment, selectedWarrior.rules || ''); // Removed - using default vertical layout

        // Set the race to the selected warrior's race
        document.getElementById('f-race').value = selectedWarrior.race;
        renderRacialMaximums(); // Update the racial maximums display

        // Apply Carnival of Chaos race visibility adjustments
        if (isCarnivalOfChaosWarband(currentWarband)) {
            applyCarnivalRaceVisibility(selectedWarrior.name);
        }

        // Handle Pit Fighter style selection
        const styleSelectionWrapper = document.getElementById('style-selection-wrapper');
        const styleSelect = document.getElementById('f-style-choice');

        if (currentWarband.type === "Pit Fighters" && selectedWarrior.requires_style) {
            styleSelectionWrapper.classList.remove('hidden');
            populateStyleChoices();
            // Clear any existing style selection
            styleSelect.value = '';
        } else {
            styleSelectionWrapper.classList.add('hidden');
            styleSelect.value = '';
        }

        // Handle Ogre Hunting Party Trapper skill selection
        const trapperSkillSelectionWrapper = document.getElementById('trapper-skill-selection-wrapper');
        const trapperSkillSelect = document.getElementById('f-trapper-skill-choice');

        if (currentWarband.type === "Ogre Hunting Party" && selectedWarrior.name === "Trapper") {
            // Show the skill selection wrapper (create it if it doesn't exist)
            if (!trapperSkillSelectionWrapper) {
                const wrapper = document.createElement('div');
                wrapper.id = 'trapper-skill-selection-wrapper';
                wrapper.className = 'mb-4';
                wrapper.innerHTML = `
                    <label for="f-trapper-skill-choice" class="block text-sm font-semibold text-slate-300 mb-2">Choose Starting Skill:</label>
                    <select id="f-trapper-skill-choice" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-mordheim-gold">
                        <option value="">-- Select a Starting Skill --</option>
                    </select>
                `;
                // Insert after the warrior choice wrapper
                const warriorChoiceWrapper = document.getElementById('warrior-choice-wrapper');
                if (warriorChoiceWrapper) {
                    warriorChoiceWrapper.parentNode.insertBefore(wrapper, warriorChoiceWrapper.nextSibling);
                }
            } else {
                trapperSkillSelectionWrapper.classList.remove('hidden');
            }
            populateTrapperSkillChoices();
            // Clear any existing skill selection
            if (trapperSkillSelect) trapperSkillSelect.value = '';
        } else {
            if (trapperSkillSelectionWrapper) {
                trapperSkillSelectionWrapper.classList.add('hidden');
            }
        }

        // Handle Skaven of Clan Moulder Packmaster Beast Handling skill selection
        const packmasterBeastHandlingSelectionWrapper = document.getElementById('packmaster-beast-handling-selection-wrapper');
        const packmasterBeastHandlingSelect = document.getElementById('f-packmaster-beast-handling-choice');

        if (currentWarband.type === "Skaven of Clan Moulder" && selectedWarrior.name === "Packmaster") {
            // Show the skill selection wrapper (create it if it doesn't exist)
            if (!packmasterBeastHandlingSelectionWrapper) {
                const wrapper = document.createElement('div');
                wrapper.id = 'packmaster-beast-handling-selection-wrapper';
                wrapper.className = 'mb-4';
                wrapper.innerHTML = `
                    <label for="f-packmaster-beast-handling-choice" class="block text-sm font-semibold text-slate-300 mb-2">Choose Beast Handling Skill:</label>
                    <select id="f-packmaster-beast-handling-choice" class="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-mordheim-gold">
                        <option value="">-- Select a Beast Handling Skill --</option>
                    </select>
                `;
                // Insert after the warrior choice wrapper
                const warriorChoiceWrapper = document.getElementById('warrior-choice-wrapper');
                if (warriorChoiceWrapper) {
                    warriorChoiceWrapper.parentNode.insertBefore(wrapper, warriorChoiceWrapper.nextSibling);
                }
            } else {
                packmasterBeastHandlingSelectionWrapper.classList.remove('hidden');
            }
            populatePackmasterBeastHandlingChoices();
            // Clear any existing skill selection
            if (packmasterBeastHandlingSelect) packmasterBeastHandlingSelect.value = '';
        } else {
            if (packmasterBeastHandlingSelectionWrapper) {
                packmasterBeastHandlingSelectionWrapper.classList.add('hidden');
            }
        }

        // Render magic selection if applicable
        const warriorStartingSpells = getStartingSpells(selectedWarrior);
        renderMagicSelection({ special_rules: selectedWarrior.rules || '' }, warriorStartingSpells);

        // Hide upkeep cost for regular warriors (they don't have upkeep)
        document.getElementById('f-upkeep-wrapper').classList.add('hidden');
        document.getElementById('f-upkeep-cost').textContent = '0';
    } else {
        const rulesDisplay = document.getElementById('warrior-rules-display');
        rulesDisplay.textContent = 'None';
        document.getElementById('skill-tables-display').classList.add('hidden');
        setAvailableEquipmentFilterIds(null); // Clear filter if no warrior is selected
        renderEquipmentOptions(); // Re-render to show all options

        // Hide conditional wrappers when no warrior is selected
        if (trapperSkillSelectionWrapper) {
            trapperSkillSelectionWrapper.classList.add('hidden');
        }
        if (packmasterBeastHandlingSelectionWrapper) {
            packmasterBeastHandlingSelectionWrapper.classList.add('hidden');
        }

        // Hide upkeep cost when no warrior is selected
        document.getElementById('f-upkeep-wrapper').classList.add('hidden');
        document.getElementById('f-upkeep-cost').textContent = '0';
    }
};

export const populateDramatisPersonaeChoices = () => {
    // Track Dramatis Personae menu access
    trackCharacterMenuAccess('dramatis_personae');
    
    const dramatisPersonaeSelect = document.getElementById('f-dramatis-personae-choice');
    dramatisPersonaeSelect.innerHTML = '<option value="">-- Select a Dramatis Personae --</option>';
    
    // Get current warband data for validation
    const staticWarbandData = getWarbandData(currentWarband.type);
    const warbandData = {
        ...staticWarbandData,
        alignment: currentWarband.alignment || staticWarbandData?.alignment || 'good'
    };
    
    let availableCount = 0;
    let totalCount = 0;
    
    // Check if any warband member has the Dog of War skill (ID 263)
    // Dog of War allows hiring the same Hired Swords available to Mercenaries (Reikland)
    const additionalWarbandIdentities = [];
    const members = currentWarband.members || [];
    if (members.some(fighter => fighter.skills && fighter.skills.includes('Dog of War'))) {
        additionalWarbandIdentities.push({ name: 'Mercenaries (Reikland)', alignment: 'good' });
    }
    
    DRAMATIS_PERSONAE.forEach(grade => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = grade.grade;
        
        // Filter characters based on hiring restrictions
        const filteredCharacters = filterCharactersByHiringRestrictions(grade.characters, warbandData, isUniversalHiringAccessActive, currentWarband.members || [], additionalWarbandIdentities);
        
        filteredCharacters.forEach(({ character, canHire, reason }) => {
            totalCount++;
            
            if (canHire) {
                availableCount++;
                const option = document.createElement('option');
                option.value = character.name;
                option.textContent = character.name;
                optgroup.appendChild(option);
            } else {
                // Add disabled option with tooltip explaining why it's not available
                const option = document.createElement('option');
                option.value = character.name;
                option.textContent = `${character.name} (Not Available)`;
                option.disabled = true;
                option.title = reason; // Show reason as tooltip
                option.style.color = '#999';
                option.style.fontStyle = 'italic';
                optgroup.appendChild(option);
            }
        });
        
        // Only add optgroup if it has any characters
        if (optgroup.children.length > 0) {
            dramatisPersonaeSelect.appendChild(optgroup);
        }
    });
    
    // Update the select label to show availability summary
    const selectLabel = document.querySelector('label[for="f-dramatis-personae-choice"]');
    if (selectLabel) {
        const originalText = selectLabel.textContent.replace(/ \(\d+\/\d+ available\)/, '');
        selectLabel.textContent = `${originalText} (${availableCount}/${totalCount} available)`;
    }
    
    console.log(`Dramatis Personae: ${availableCount}/${totalCount} available`);
};

export const updateFighterDataFromDramatisPersonaeSelection = () => {
    const dramatisPersonaeSelect = document.getElementById('f-dramatis-personae-choice');
    const selectedName = dramatisPersonaeSelect.value;
    
    // Check if the selected option is disabled (unavailable character)
    const selectedOption = dramatisPersonaeSelect.options[dramatisPersonaeSelect.selectedIndex];
    if (selectedOption && selectedOption.disabled) {
        // Clear the selection and return
        dramatisPersonaeSelect.value = '';
        return;
    }
    
    const character = DRAMATIS_PERSONAE.flatMap(g => g.characters).find(c => c.name === selectedName);

    if (character) {
        // Only auto-fill the name if the user hasn't entered a custom name.
        // We consider the name "custom" if it's non-empty AND doesn't match any Dramatis Personae character name.
        const currentNameInput = document.getElementById('f-name');
        const currentName = currentNameInput.value.trim();
        const isNameCustom = currentName !== '' && !DRAMATIS_PERSONAE.flatMap(g => g.characters).some(c => c.name === currentName);
        if (!isNameCustom) {
            currentNameInput.value = character.name;
        }
        document.getElementById('f-cost').value = parseInt(character.data.hire_fee) || 0;
        document.getElementById('f-xp').value = 0; // Dramatis Personae don't gain XP
        
        // Display upkeep cost
        const upkeepCost = parseInt(character.data.upkeep_fee) || 0;
        const upkeepWrapper = document.getElementById('f-upkeep-wrapper');
        const upkeepCostElement = document.getElementById('f-upkeep-cost');
        
        upkeepWrapper.classList.remove('hidden');
        upkeepCostElement.textContent = upkeepCost;
        
        renderStatInputs(character.data.stats);
        setCurrentFighterBaseStats({ ...character.data.stats });

        // Show all races in dropdown for Dramatis Personae (not limited to warband races)
        // If the character data specifies a race, pre-select it; otherwise preserve current selection
        renderRaceOptions(character.data.race || document.getElementById('f-race').value);

        const equipment = (character.data.initial_equipment || []).map(id => {
            const item = MASTER_EQUIPMENT_LIST.find(i => i.id === id);
            return item ? { id: item.id, cost: item.cost } : null;
        }).filter(Boolean); // Filter out any nulls if an ID wasn't found
        renderEquipmentSelector(equipment);

        // Handle skills - check for starting_skills first (dramatis personae use this), then fallback to skills
        let skills = [];
        if (character.data.starting_skills) {
            if (typeof character.data.starting_skills === 'object' && !Array.isArray(character.data.starting_skills)) {
                // Multi-stat fighter with skills per form (like Ulli & Marquand)
                // Flatten all skills from all forms into a single array
                skills = Object.values(character.data.starting_skills).flat();
            } else {
                // Regular array of skills
                skills = character.data.starting_skills || [];
            }
        } else {
            // Fallback to skills field for consistency with other data types
            skills = character.data.skills || [];
        }

        document.getElementById('f-skills-hidden').value = JSON.stringify(skills);

        const skillsDisplay = document.getElementById('f-skills');
        if (skills.length > 0) {
            const skillsHtml = skills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
            skillsDisplay.innerHTML = skillsHtml;
        } else {
            skillsDisplay.textContent = 'None';
        }
        document.getElementById('f-injuries-json').value = '[]';
        
        const rulesDisplay = document.getElementById('warrior-rules-display');
        if (character.data.special_rules) {
            const rulesHtml = character.data.special_rules.split(';').map(rule => {
                const ruleName = rule.trim().split('(')[0].trim();
                return `<span class="underline cursor-pointer" data-rule="${ruleName}">${rule.trim()}</span>`;
            }).join('<br>');
            rulesDisplay.innerHTML = rulesHtml;
        } else {
            rulesDisplay.textContent = 'None';
        }

        // Toggle experience visibility based on special rules
        toggleExperienceVisibility(character.data.special_rules || '');

        // Render magic selection if applicable
        renderMagicSelection({ special_rules: character.data.special_rules || '' });

        // Disable fields
        ['f-cost', 'f-skills', 'f-injuries'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.disabled = true;
        });
        STATS_FIELDS.forEach(stat => {
            document.getElementById(`stat-${stat}`).disabled = true;
        });
        const equipmentCategorySelect = document.getElementById('equipment-category-select');
        if (equipmentCategorySelect) equipmentCategorySelect.disabled = true;
    } else {
        // Re-enable fields if none is selected
        ['f-cost', 'f-xp', 'f-skills', 'f-injuries', 'f-race'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.disabled = false;
        });
        STATS_FIELDS.forEach(stat => {
            document.getElementById(`stat-${stat}`).disabled = true;
        });
        const equipmentCategorySelectReenable = document.getElementById('equipment-category-select');
        if (equipmentCategorySelectReenable) equipmentCategorySelectReenable.disabled = false;
        
        // Hide upkeep cost
        document.getElementById('f-upkeep-wrapper').classList.add('hidden');
        document.getElementById('f-upkeep-cost').textContent = '0';
    }
};

export const populateHiredSwordChoices = () => {
    // Track Hired Sword menu access
    trackCharacterMenuAccess('hired_sword');
    
    const hiredSwordSelect = document.getElementById('f-hired-sword-choice');
    hiredSwordSelect.innerHTML = '<option value="">-- Select a Hired Sword --</option>';
    
    // Get current warband data for validation
    const staticWarbandData = getWarbandData(currentWarband.type);
    const warbandData = {
        ...staticWarbandData,
        alignment: currentWarband.alignment || staticWarbandData?.alignment || 'good'
    };
    
    let availableCount = 0;
    let totalCount = 0;
    
    // Check if any warband member has the Dog of War skill (ID 263)
    // Dog of War allows hiring the same Hired Swords available to Mercenaries (Reikland)
    const additionalWarbandIdentities = [];
    const members = currentWarband.members || [];
    if (members.some(fighter => fighter.skills && fighter.skills.includes('Dog of War'))) {
        additionalWarbandIdentities.push({ name: 'Mercenaries (Reikland)', alignment: 'good' });
    }
    
    HIRED_SWORDS.forEach(grade => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = grade.grade;
        
        // Filter characters based on hiring restrictions
        const filteredCharacters = filterCharactersByHiringRestrictions(grade.characters, warbandData, isUniversalHiringAccessActive, currentWarband.members || [], additionalWarbandIdentities);
        
        filteredCharacters.forEach(({ character, canHire, reason }) => {
            totalCount++;
            
            if (canHire) {
                availableCount++;
                const option = document.createElement('option');
                option.value = character.name;
                option.textContent = character.name;
                optgroup.appendChild(option);
            } else {
                // Add disabled option with tooltip explaining why it's not available
                const option = document.createElement('option');
                option.value = character.name;
                option.textContent = `${character.name} (Not Available)`;
                option.disabled = true;
                option.title = reason; // Show reason as tooltip
                option.style.color = '#999';
                option.style.fontStyle = 'italic';
                optgroup.appendChild(option);
            }
        });
        
        // Only add optgroup if it has any characters
        if (optgroup.children.length > 0) {
            hiredSwordSelect.appendChild(optgroup);
        }
    });
    
    // Update the select label to show availability summary
    const selectLabel = document.querySelector('label[for="f-hired-sword-choice"]');
    if (selectLabel) {
        const originalText = selectLabel.textContent.replace(/ \(\d+\/\d+ available\)/, '');
        selectLabel.textContent = `${originalText} (${availableCount}/${totalCount} available)`;
    }
    
    console.log(`Hired Swords: ${availableCount}/${totalCount} available`);
};

/** Populates the equipment choice dropdown for hired swords with equipment options */
export const populateHiredSwordEquipmentChoices = (equipmentOptions) => {
    const equipmentChoiceSelect = document.getElementById('f-hired-sword-equipment-choice');
    if (!equipmentChoiceSelect) return;

    equipmentChoiceSelect.innerHTML = '<option value="">-- Select Equipment --</option>';
    
    equipmentOptions.forEach((option, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = option.description;
        equipmentChoiceSelect.appendChild(optionElement);
    });

    };

/** Handles hired sword equipment selection change */
export const handleHiredSwordEquipmentSelection = () => {
    const hiredSwordSelect = document.getElementById('f-hired-sword-choice');
    const equipmentChoiceSelect = document.getElementById('f-hired-sword-equipment-choice');
    const selectedHiredSwordName = hiredSwordSelect.value;
    const selectedOptionIndex = equipmentChoiceSelect.value;
    
    if (!selectedHiredSwordName || selectedOptionIndex === '') {
        return;
    }
    
    const hiredSword = HIRED_SWORDS.flatMap(g => g.characters).find(c => c.name === selectedHiredSwordName);
    if (!hiredSword || !hiredSword.data.equipment_options) {
        return;
    }
    
    // Access the nested options array
    const selectedOption = hiredSword.data.equipment_options[0].options[parseInt(selectedOptionIndex)];
    if (!selectedOption) {
        return;
    }
    
    // Get initial equipment (equipment that's always included)
    const initialEquipment = (hiredSword.data.initial_equipment || []).map(id => {
        const item = MASTER_EQUIPMENT_LIST.find(i => i.id === id);
        return item ? { id: item.id, cost: item.cost } : null;
    }).filter(Boolean);
    
    // Convert selected option equipment IDs to equipment objects
    const optionEquipment = selectedOption.items.map(equipmentId => {
        const equipmentItem = MASTER_EQUIPMENT_LIST.find(item => item.id === equipmentId);
        return equipmentItem ? { id: equipmentItem.id, cost: equipmentItem.cost } : null;
    }).filter(Boolean);
    
    // Combine initial equipment with selected option equipment
    const combinedEquipment = [...initialEquipment, ...optionEquipment];
    
    // Set the equipment
    document.getElementById('f-equipment-json').value = JSON.stringify(combinedEquipment);
    renderSelectedEquipment();
    renderArmorSave();
    updateStatModifiers();
};

export const updateFighterDataFromHiredSwordSelection = () => {
    const hiredSwordSelect = document.getElementById('f-hired-sword-choice');
    const selectedName = hiredSwordSelect.value;
    
    // Check if the selected option is disabled (unavailable character)
    const selectedOption = hiredSwordSelect.options[hiredSwordSelect.selectedIndex];
    if (selectedOption && selectedOption.disabled) {
        // Clear the selection and return
        hiredSwordSelect.value = '';
        return;
    }
    
    const hiredSword = HIRED_SWORDS.flatMap(g => g.characters).find(c => c.name === selectedName);

    if (hiredSword) {
        // Only auto-fill the name if the user hasn't entered a custom name.
        // We consider the name "custom" if it's non-empty AND doesn't match any Hired Sword name.
        const currentNameInput = document.getElementById('f-name');
        const currentName = currentNameInput.value.trim();
        const isNameCustom = currentName !== '' && !HIRED_SWORDS.flatMap(g => g.characters).some(c => c.name === currentName);
        if (!isNameCustom) {
            currentNameInput.value = hiredSword.name;
        }
        document.getElementById('f-xp').value = 0;

        // Check for special hire treasure cost first
        const specialHireTreasure = parseInt(hiredSword.data.special_hire_treasure) || 0;
        let hireFee = parseFloat(hiredSword.data.hire_fee) || 0;
        let costDisplayType = 'GC'; // Default to gold crowns
        
        if (specialHireTreasure > 0) {
            hireFee = specialHireTreasure;
            costDisplayType = 'Treasure';
        }
        
        if (hiredSword.data.variableCost && costDisplayType === 'GC') {
            // Parse the variable cost using the existing utility function
            const parsedCost = parseCostString({
                cost: hireFee,
                variableCost: hiredSword.data.variableCost
            });
            
            if (parsedCost.isVariable) {
                // Set temp hired sword data for dice roll modal
                setTempHiredSwordToAdd({ 
                    hiredSword: hiredSword, 
                    parsedCost: parsedCost 
                });
                
                // Show dice roll modal
                document.getElementById('dice-roll-item-name').textContent = hiredSword.name;
                const diceDescription = parsedCost.multiplier > 1 ?
                    `${parsedCost.diceCount}D6 × ${parsedCost.multiplier}` :
                    `${parsedCost.diceCount}D6`;
                document.getElementById('dice-roll-base-cost').textContent = `Base: ${parsedCost.base} GC + (result of ${diceDescription})`;
                document.getElementById('dice-roll-value').value = ''; // Clear previous value
                displayModal('dice-roll-modal');
                return;
            }
        }
        
        // If no variable cost or parsing failed, use fixed cost
        document.getElementById('f-cost').value = hireFee;
        // Store the cost type in a data attribute for later use
        document.getElementById('f-cost').dataset.costType = costDisplayType;
        
        // Update labels based on cost type
        const costLabel = document.getElementById('f-cost-label');
        const upkeepLabel = document.getElementById('f-upkeep-label');
        
        if (costDisplayType === 'Treasure') {
            costLabel.textContent = 'Cost (Treasure, per fighter)';
        } else {
            costLabel.textContent = 'Cost (GC, per fighter)';
        }
        
        // Display upkeep cost
        const upkeepCost = parseInt(hiredSword.data.upkeep_fee) || 0;
        const specialUpkeepTreasure = parseInt(hiredSword.data.special_upkeep_treasure) || 0;
        const upkeepWrapper = document.getElementById('f-upkeep-wrapper');
        const upkeepCostElement = document.getElementById('f-upkeep-cost');
        
        upkeepWrapper.classList.remove('hidden');
        
        if (specialUpkeepTreasure > 0) {
            upkeepCostElement.textContent = specialUpkeepTreasure;
            upkeepLabel.textContent = 'Upkeep Cost (Treasure per battle)';
        } else {
            upkeepCostElement.textContent = upkeepCost;
            upkeepLabel.textContent = 'Upkeep Cost (GC per battle)';
        }

        // Set initial equipment and check for mounts
        const equipment = (hiredSword.data.initial_equipment || []).map(id => {
            const item = MASTER_EQUIPMENT_LIST.find(i => i.id === id);
            return item ? { id: item.id, cost: item.cost } : null;
        }).filter(Boolean);

        // Check if hired sword has mounts and apply multi-stats if needed
        const hasMount = equipment.some(eq => {
            const masterItem = eq.id !== undefined
                ? MASTER_EQUIPMENT_LIST.find(i => i.id === eq.id)
                : MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
            return masterItem && (masterItem.category === 'Mounts' || masterItem.category === 'War Beasts');
        });

        if (hasMount) {
            // Apply mount stats for multi-stat display
            const multiStats = applyMountStats(equipment, hiredSword.data.stats);
            setCurrentFighterMultiStats(multiStats);
            renderStatInputs(multiStats);
        } else {
            // Single stat display
            setCurrentFighterMultiStats(null);
            renderStatInputs(hiredSword.data.stats);
            setCurrentFighterBaseStats({ ...hiredSword.data.stats });
        }

        // Show all races in dropdown for Hired Swords (not limited to warband races)
        // If the hired sword data specifies a race, pre-select it; otherwise preserve current selection
        renderRaceOptions(hiredSword.data.race || document.getElementById('f-race').value);

        const equipmentOptionsWrapper = document.getElementById('hired-sword-equipment-selection-wrapper');
        if (hiredSword.data.equipment_options && hiredSword.data.equipment_options.length > 0) {
            // Show equipment selection dropdown
            equipmentOptionsWrapper.classList.remove('hidden');
            // Extract the actual options array from the nested structure
            const actualOptions = hiredSword.data.equipment_options[0].options;
            populateHiredSwordEquipmentChoices(actualOptions);
            // Clear any existing selection
            document.getElementById('f-hired-sword-equipment-choice').value = '';
            
            // Set initial equipment (if any) but don't add option-based equipment yet
            renderEquipmentSelector(equipment);
        } else {
            // Hide equipment selection dropdown
            equipmentOptionsWrapper.classList.add('hidden');
            
            // Set initial equipment normally
            renderEquipmentSelector(equipment);
        }

        const skills = hiredSword.data.skills || [];

        // Check for starting_skills and add them to the fighter's initial skills
        let initialSkills = [];
        if (hiredSword.data.starting_skills && Array.isArray(hiredSword.data.starting_skills)) {
            initialSkills = [...hiredSword.data.starting_skills];
        }

        document.getElementById('f-skills-hidden').value = JSON.stringify(initialSkills);

        const skillsDisplay = document.getElementById('f-skills');
        if (initialSkills.length > 0) {
            const skillsHtml = initialSkills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
            skillsDisplay.innerHTML = skillsHtml;
        } else {
            skillsDisplay.textContent = 'None';
        }

        // Display skill categories in the skill tables section (like Heroes)
        const skillTablesDisplay = document.getElementById('skill-tables-display');
        const skillTablesList = document.getElementById('skill-tables-list');
        if (skills.length > 0) {
            setBaseSkillCategories([...skills]);
            skillTablesList.textContent = skills.join(', ');
            skillTablesDisplay.classList.remove('hidden');
        } else {
            setBaseSkillCategories([]);
            skillTablesDisplay.classList.add('hidden');
        }

        document.getElementById('f-injuries-json').value = '[]';

         // Store special rules for turn order tracker and saving
        document.getElementById('f-special-rules').value = hiredSword.data.rules || '';

        // Toggle experience visibility based on special rules
        toggleExperienceVisibility(hiredSword.data.rules || '');

        // Render magic selection if applicable
        renderMagicSelection({ special_rules: hiredSword.data.rules || '' });

        // Toggle skills layout based on conditions
        // toggleSkillsLayout(hiredSword.data.initial_equipment, hiredSword.data.rules || ''); // Removed - using default vertical layout


        const rulesDisplay = document.getElementById('warrior-rules-display');
        if (hiredSword.data.rules) {
            const rulesHtml = hiredSword.data.rules.split(';').map(rule => {
                const ruleName = rule.trim().split('(')[0].trim();
                return `<span class="underline cursor-pointer" data-rule="${ruleName}">${rule.trim()}</span>`;
            }).join('<br>');
            rulesDisplay.innerHTML = rulesHtml;
        } else {
            rulesDisplay.textContent = 'None';
        }

        // Disable fields
        ['f-cost', 'f-skills', 'f-injuries'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.disabled = true;
        });
        STATS_FIELDS.forEach(stat => {
            const element = document.getElementById(`stat-${stat}`);
            if (element) element.disabled = true;
        });
        const equipmentSelect = document.getElementById('equipment-category-select');
        if (equipmentSelect) equipmentSelect.disabled = true;
    } else {
        // Re-enable fields if none is selected
        ['f-cost', 'f-xp', 'f-skills', 'f-injuries', 'f-race'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.disabled = false;
        });
        STATS_FIELDS.forEach(stat => {
            const element = document.getElementById(`stat-${stat}`);
            if (element) element.disabled = true;
        });
        const equipmentSelect = document.getElementById('equipment-category-select');
        if (equipmentSelect) equipmentSelect.disabled = false;
        
        // Hide upkeep cost
        document.getElementById('f-upkeep-wrapper').classList.add('hidden');
        document.getElementById('f-upkeep-cost').textContent = '0';
    }
};

/** Finalizes hired sword cost after dice roll */
export const finalizeHiredSwordCost = () => {
    if (!tempHiredSwordToAdd) return;

    const userInputValue = parseInt(document.getElementById('dice-roll-value').value);
    if (isNaN(userInputValue) || userInputValue < 0) {
        showMessage("Please enter a valid value (0 or higher).", 'error');
        return;
    }

    const hiredSword = tempHiredSwordToAdd.hiredSword;
    const parsedCost = tempHiredSwordToAdd.parsedCost;

    // Calculate final cost: base + (multiplier * user_input)
    const finalCost = parsedCost.base + (parsedCost.multiplier * userInputValue);

    // Set the calculated cost in the form
    document.getElementById('f-cost').value = finalCost;

    // Continue with the rest of the hired sword setup
    // Set initial equipment and check for mounts
    const equipment = (hiredSword.data.initial_equipment || []).map(id => {
        const item = MASTER_EQUIPMENT_LIST.find(i => i.id === id);
        return item ? { id: item.id, cost: item.cost } : null;
    }).filter(Boolean);

    // Check if hired sword has mounts and apply multi-stats if needed
    const hasMount = equipment.some(eq => {
        const masterItem = eq.id !== undefined
            ? MASTER_EQUIPMENT_LIST.find(i => i.id === eq.id)
            : MASTER_EQUIPMENT_LIST.find(i => i.name === eq.name);
        return masterItem && (masterItem.category === 'Mounts' || masterItem.category === 'War Beasts');
    });

    if (hasMount) {
        // Apply mount stats for multi-stat display
        const multiStats = applyMountStats(equipment, hiredSword.data.stats);
        setCurrentFighterMultiStats(multiStats);
        renderStatInputs(multiStats);
    } else {
        // Single stat display
        setCurrentFighterMultiStats(null);
        renderStatInputs(hiredSword.data.stats);

        // Show all races in dropdown for Hired Swords (not limited to warband races)
        // If the hired sword data specifies a race, pre-select it; otherwise preserve current selection
        renderRaceOptions(hiredSword.data.race || document.getElementById('f-race').value);
        setCurrentFighterBaseStats({ ...hiredSword.data.stats });
    }

    // Check if hired sword has equipment options
    const equipmentOptionsWrapper = document.getElementById('hired-sword-equipment-selection-wrapper');
    if (hiredSword.data.equipment_options && hiredSword.data.equipment_options.length > 0) {
        // Show equipment selection dropdown
        if (equipmentOptionsWrapper) {
            equipmentOptionsWrapper.classList.remove('hidden');
            // Extract the actual options array from the nested structure
            const actualOptions = hiredSword.data.equipment_options[0].options;
            populateHiredSwordEquipmentChoices(actualOptions);
            // Clear any existing selection
            const hiredSwordEquipmentChoice = document.getElementById('f-hired-sword-equipment-choice');
            if (hiredSwordEquipmentChoice) hiredSwordEquipmentChoice.value = '';
        }
        
        // Set initial equipment (if any) but don't add option-based equipment yet
        renderEquipmentSelector(equipment);
    } else {
        // Hide equipment selection dropdown
        equipmentOptionsWrapper.classList.add('hidden');
        
        // Set initial equipment normally
        renderEquipmentSelector(equipment);
    }

    const skills = hiredSword.data.skills || [];

    // Check for starting_skills and add them to the fighter's initial skills
    let initialSkills = [];
    if (hiredSword.data.starting_skills && Array.isArray(hiredSword.data.starting_skills)) {
        initialSkills = [...hiredSword.data.starting_skills];
    }

    document.getElementById('f-skills-hidden').value = JSON.stringify(initialSkills);

    const skillsDisplay = document.getElementById('f-skills');
    if (initialSkills.length > 0) {
        const skillsHtml = initialSkills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
        skillsDisplay.innerHTML = skillsHtml;
    } else {
        skillsDisplay.textContent = 'None';
    }

    // Display skill categories in the skill tables section (like Heroes)
    const skillTablesDisplay = document.getElementById('skill-tables-display');
    const skillTablesList = document.getElementById('skill-tables-list');
    if (skills.length > 0) {
        setBaseSkillCategories([...skills]);
        skillTablesList.textContent = skills.join(', ');
        skillTablesDisplay.classList.remove('hidden');
    } else {
        setBaseSkillCategories([]);
        skillTablesDisplay.classList.add('hidden');
    }

    document.getElementById('f-injuries-json').value = '[]';

     // Store special rules for turn order tracker and saving
    document.getElementById('f-special-rules').value = hiredSword.data.rules || '';

    // Toggle experience visibility based on special rules
    toggleExperienceVisibility(hiredSword.data.rules || '');

    // Render magic selection if applicable
    renderMagicSelection({ special_rules: hiredSword.data.rules || '' });

    // Toggle skills layout based on conditions
    // toggleSkillsLayout(hiredSword.data.initial_equipment, hiredSword.data.rules || ''); // Removed - using default vertical layout

    const rulesDisplay = document.getElementById('warrior-rules-display');
    if (hiredSword.data.rules) {
        const rulesHtml = hiredSword.data.rules.split(';').map(rule => {
            const ruleName = rule.trim().split('(')[0].trim();
            return `<span class="underline cursor-pointer" data-rule="${ruleName}">${rule.trim()}</span>`;
        }).join('<br>');
        rulesDisplay.innerHTML = rulesHtml;
    } else {
        rulesDisplay.textContent = 'None';
    }

    // Disable fields
    ['f-cost', 'f-skills', 'f-injuries'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.disabled = true;
    });
    STATS_FIELDS.forEach(stat => {
        const element = document.getElementById(`stat-${stat}`);
        if (element) element.disabled = true;
    });
    const equipmentSelect = document.getElementById('equipment-category-select');
    if (equipmentSelect) equipmentSelect.disabled = true;

    // Hide modal and clear temp data
    hideModal('dice-roll-modal');
    setTempHiredSwordToAdd(null);
};

/** Populates the vehicle choices dropdown */
export const populateVehicleChoices = () => {
    const vehicleSelect = document.getElementById('f-vehicle-choice');
    const currentWarbandType = currentWarband.type;
    vehicleSelect.innerHTML = '<option value="">-- Select a Vehicle --</option>';
    VEHICLES.forEach(grade => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = grade.grade;
        grade.vehicles.forEach(vehicle => {
            // Check if vehicle has hiring restrictions
            const mayBeHired = vehicle.data.may_be_hired;
            let canBeHired = true;

            if (mayBeHired) {
                // Parse the semicolon-separated list of allowed warbands
                const allowedWarbands = mayBeHired.split(';').map(w => w.trim());
                canBeHired = allowedWarbands.includes(currentWarbandType);
            }

            // Only add the option if the vehicle can be hired by this warband
            if (canBeHired) {
                const option = document.createElement('option');
                option.value = vehicle.name;
                option.textContent = vehicle.name;
                optgroup.appendChild(option);
            }
        });
        // Only add the optgroup if it has options
        if (optgroup.children.length > 0) {
            vehicleSelect.appendChild(optgroup);
        }
    });
};

/** Updates the fighter data from the selected vehicle */
export const updateFighterDataFromVehicleSelection = () => {
    const vehicleSelect = document.getElementById('f-vehicle-choice');
    const selectedName = vehicleSelect.value;
    const vehicle = VEHICLES.flatMap(g => g.vehicles).find(v => v.name === selectedName);

    if (vehicle) {
        // Only auto-fill the name if the user hasn't entered a custom name.
        // We consider the name "custom" if it's non-empty AND doesn't match any vehicle name.
        const currentNameInput = document.getElementById('f-name');
        const currentName = currentNameInput.value.trim();
        const isNameCustom = currentName !== '' && !VEHICLES.flatMap(g => g.vehicles).some(v => v.name === currentName);
        if (!isNameCustom) {
            currentNameInput.value = vehicle.name;
        }
        document.getElementById('f-cost').value = parseInt(vehicle.data.hire_fee) || 0;
        document.getElementById('f-xp').value = 0; // Vehicles don't gain XP
        
        // Vehicles have multi-stat lines (components) - store full structure
        setCurrentFighterMultiStats(JSON.parse(JSON.stringify(vehicle.data.stats))); // Deep copy
        renderStatInputs(vehicle.data.stats);
        // Use first component stats as base for single-stat operations
        const firstComponentKey = Object.keys(vehicle.data.stats)[0];
        setCurrentFighterBaseStats({ ...vehicle.data.stats[firstComponentKey] });

        const equipment = (vehicle.data.starting_equipment || []).map(id => {
            const item = MASTER_EQUIPMENT_LIST.find(i => i.id === id);
            return item ? { id: item.id, cost: item.cost } : null;
        }).filter(Boolean);
        renderEquipmentSelector(equipment);

        const skills = vehicle.data.skills || [];

        document.getElementById('f-skills-hidden').value = JSON.stringify(skills);

        const skillsDisplay = document.getElementById('f-skills');
        if (skills.length > 0) {
            const skillsHtml = skills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
            skillsDisplay.innerHTML = skillsHtml;
        } else {
            skillsDisplay.textContent = 'None';
        }

        // Store special rules for turn order tracker
        document.getElementById('f-special-rules').value = vehicle.data.special_rules || '';

        // Toggle experience visibility based on special rules
        toggleExperienceVisibility(vehicle.data.special_rules || '');

        // Toggle skills layout based on conditions
        // toggleSkillsLayout(vehicle.data.starting_equipment, vehicle.data.special_rules || ''); // Removed - using default vertical layout
        
        // Set rules display AFTER layout is established to ensure element is in correct container
        const rulesDisplay = document.getElementById('warrior-rules-display');
        if (vehicle.data.special_rules) {
            const rulesHtml = vehicle.data.special_rules.split(';').map(rule => {
                const ruleName = rule.trim().split('(')[0].trim();
                return `<span class="underline cursor-pointer" data-rule="${ruleName}">${rule.trim()}</span>`;
            }).join('<br>');
            rulesDisplay.innerHTML = rulesHtml;
        } else {
            rulesDisplay.textContent = 'None';
        }

        // Ensure horizontal section is visible after setting rules
        const horizontalSection = document.getElementById('horizontal-skills-section');
        if (horizontalSection) {
            horizontalSection.classList.remove('hidden');
        }

        // Handle equipment section visibility for vehicles
        const equipmentSection = document.getElementById('equipment-section');
        const startingEquipment = vehicle.data.starting_equipment || [];
        if (startingEquipment.length > 0 && !startingEquipment.includes("None")) {
            // Show equipment section for vehicles with actual starting equipment
            equipmentSection.classList.remove('hidden');
            setAvailableEquipmentFilterIds(startingEquipment);
            renderEquipmentOptions(); // Update equipment list with the filter
        } else {
            // Hide equipment section for vehicles with no starting equipment
            equipmentSection.classList.add('hidden');
            setAvailableEquipmentFilterIds(null); // Clear filter
        }

        // Disable fields
        ['f-cost', 'f-skills', 'f-injuries', 'f-race'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.disabled = true;
        });
        STATS_FIELDS.forEach(stat => {
            const el = document.getElementById(`stat-${stat}`);
            if (el) el.disabled = true;
        });
        const equipCatSelect = document.getElementById('equipment-category-select');
        if (equipCatSelect) equipCatSelect.disabled = true;

        // Hide upkeep cost for vehicles (they don't have upkeep)
        document.getElementById('f-upkeep-wrapper').classList.add('hidden');
        document.getElementById('f-upkeep-cost').textContent = '0';
    } else {
        // Re-enable fields if none is selected
        ['f-cost', 'f-xp', 'f-skills', 'f-injuries', 'f-race'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.disabled = false;
        });
        STATS_FIELDS.forEach(stat => {
            const el = document.getElementById(`stat-${stat}`);
            if (el) el.disabled = true;
        });
        const equipCatSelect = document.getElementById('equipment-category-select');
        if (equipCatSelect) equipCatSelect.disabled = false;

        // Hide upkeep cost when no vehicle is selected
        document.getElementById('f-upkeep-wrapper').classList.add('hidden');
        document.getElementById('f-upkeep-cost').textContent = '0';
    }
};

/** Renders the selected injuries list */
export const renderSelectedInjuries = () => {
    const listContainer = document.getElementById('f-injuries-list');
    const jsonInput = document.getElementById('f-injuries-json');

    let selectedInjuries;
    try {
        selectedInjuries = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedInjuries = [];
    }

    listContainer.innerHTML = '';

    if (selectedInjuries.length === 0) {
         listContainer.innerHTML = `<li class="text-slate-500 text-sm">No injuries selected.</li>`;
    }

    selectedInjuries.forEach((injuryName, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'flex justify-between items-center text-yellow-200 text-sm';

        listItem.innerHTML = `
            <span class="injury-name underline cursor-pointer" data-injury-name="${injuryName}">${injuryName}</span>
            <button class="text-red-400 hover:text-red-300" data-action="remove-injury" data-injury-index="${index}">
                <i class="fas fa-minus-circle"></i>
            </button>
        `;
        listContainer.appendChild(listItem);
    });
};

/** Adds an injury to the fighter's selected injuries list */
export const addInjury = (injuryName) => {
    const jsonInput = document.getElementById('f-injuries-json');
    let selectedInjuries;
    try {
        selectedInjuries = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedInjuries = [];
    }

    // Check if injury is already selected
    if (selectedInjuries.includes(injuryName)) {
        showMessage("This injury is already selected.", 'error');
        return;
    }

    selectedInjuries.push(injuryName);
    jsonInput.value = JSON.stringify(selectedInjuries);
    renderSelectedInjuries();

    // Injury characteristic modifiers are computed display-only by updateStatModifiers()
    // Do NOT mutate currentFighterBaseStats here to prevent double-counting
    const injuryData = MASTER_INJURY_LIST.find(i => i.name === injuryName);

    // Add special rules from the injury
    if (injuryData && injuryData.special_rules && injuryData.special_rules.length > 0) {
        const specialRulesInput = document.getElementById('f-special-rules');
        let currentRules = specialRulesInput.value.trim();
        if (currentRules) {
            currentRules += '; ';
        }
        currentRules += injuryData.special_rules.join('; ');
        specialRulesInput.value = currentRules;

        // Update the display in the modal
        updateWarriorRulesDisplay();
    }

    // Update stat modifiers display
    updateStatModifiers();
};

/** Adds a skill to the fighter's skills list */
export const addSkill = (skillName) => {
    const skillsHiddenInput = document.getElementById('f-skills-hidden');
    const skillsDisplay = document.getElementById('f-skills');

    let currentSkills = [];
    try {
        currentSkills = JSON.parse(skillsHiddenInput.value || '[]');
    } catch (e) {
        currentSkills = [];
    }

    // Check if skill is already selected
    if (currentSkills.includes(skillName)) {
        showMessage("This skill is already selected.", 'error');
        return;
    }

    currentSkills.push(skillName);
    skillsHiddenInput.value = JSON.stringify(currentSkills);

    // Update display
    if (currentSkills.length > 0) {
        const skillsHtml = currentSkills.map(skill => `<span class="underline cursor-pointer text-mordheim-gold" data-skill="${skill}">${skill}</span>`).join(', ');
        skillsDisplay.innerHTML = skillsHtml;
    } else {
        skillsDisplay.textContent = 'None';
    }

    // Add the skill to the SPECIAL_RULES_DETAILS array if it's not already there
    const skillData = findSkillForWarband(skillName);
    if (skillData && !SPECIAL_RULES_DETAILS.find(r => r.name.toLowerCase() === skillName.toLowerCase())) {
        SPECIAL_RULES_DETAILS.push({name: skillName, rules: skillData.rules, timing: skillData.timing});
    }
};

/** Removes an injury from the fighter's selected injuries list */
export const removeInjury = (injuryIndex) => {
    const jsonInput = document.getElementById('f-injuries-json');
    let selectedInjuries;
    try {
        selectedInjuries = JSON.parse(jsonInput.value || '[]');
    } catch (e) {
        selectedInjuries = [];
    }

    const removedInjuryName = selectedInjuries[injuryIndex];
    selectedInjuries.splice(injuryIndex, 1);
    jsonInput.value = JSON.stringify(selectedInjuries);
    renderSelectedInjuries();

    // Injury characteristic modifiers are computed display-only by updateStatModifiers()
    // Do NOT mutate currentFighterBaseStats here to prevent double-counting
    const injuryData = MASTER_INJURY_LIST.find(i => i.name === removedInjuryName);

    // Remove special rules from the injury
    if (injuryData && injuryData.special_rules && injuryData.special_rules.length > 0) {
        const specialRulesInput = document.getElementById('f-special-rules');
        let currentRules = specialRulesInput.value.trim();
        if (currentRules) {
            // Remove the specific rules from the injury
            const rulesToRemove = injuryData.special_rules.join('; ');
            const rulesArray = currentRules.split('; ').filter(rule => !rulesToRemove.includes(rule));
            specialRulesInput.value = rulesArray.join('; ');
        }

        // Update the display in the modal
        updateWarriorRulesDisplay();
    }

    // Update stat modifiers display
    updateStatModifiers();
};

/** Updates the warrior rules display in the modal */
export const updateWarriorRulesDisplay = () => {
    const rulesDisplay = document.getElementById('warrior-rules-display');
    const specialRulesInput = document.getElementById('f-special-rules');
    const specialRules = specialRulesInput.value.trim();

    if (specialRules) {
        const specialRulesHtml = specialRules.split(';').map(rule => {
            const ruleName = rule.trim().split('(')[0].trim();
            return `<span class="underline cursor-pointer" data-rule="${ruleName}">${rule.trim()}</span>`;
        }).join('<br>');
        rulesDisplay.innerHTML = specialRulesHtml;
    } else {
        rulesDisplay.textContent = 'None';
    }
};

/** Shows the equipment details modal */
export const showEquipmentDetailsModal = (equipmentName, equipmentRules, equipmentCost) => {
    document.getElementById('equipment-details-title').textContent = equipmentName;
    document.getElementById('equipment-name').textContent = equipmentName;

    let costDisplay = equipmentCost;
    if (!costDisplay || costDisplay === 'undefined') {
        const masterItem = MASTER_EQUIPMENT_LIST.find(e => e.name === equipmentName);
        costDisplay = masterItem ? formatEquipmentCostDisplay(masterItem) : '0';
    }
    document.getElementById('equipment-cost').textContent = costDisplay;

    document.getElementById('equipment-rules').innerHTML = formatEquipmentRules(equipmentRules);
    displayModal('equipment-details-modal');
};

/** Renders the skill list in the override modal, filtered by warband if specified */
const renderSkillOverrideList = (warbandName) => {
    const listContainer = document.getElementById('skill-override-list');
    listContainer.innerHTML = '';

    let skillsToShow;

    if (warbandName) {
        // Get warband data and determine available skill categories
        const warbandData = getWarbandData(warbandName);
        const allCategories = new Set();

        if (warbandData && warbandData.warriors) {
            warbandData.warriors.forEach(warrior => {
                const skills = getWarriorSkills(warrior, currentWarband);
                if (skills && skills.length > 0) {
                    skills.forEach(cat => allCategories.add(cat));
                }
            });
        }

        const warbandBaseName = warbandName.split(':')[0].trim();

        skillsToShow = SKILLS.filter(skill => {
            const isGeneralSkill = skill.type === 'General' && allCategories.has(skill.category);
            const isWarbandSkill = skill.type === 'Warband Specific' &&
                allCategories.has('Special') &&
                (warbandBaseName.includes(skill.category) ||
                    (Array.isArray(skill.category) && skill.category.some(cat => warbandBaseName.includes(cat)))) &&
                !(skill.category === 'Night Goblins' && warbandBaseName === 'Night Goblins Web');
            return isGeneralSkill || isWarbandSkill;
        });
    } else {
        skillsToShow = SKILLS;
    }

    // Group skills by category
    const groupedSkills = skillsToShow.reduce((acc, skill) => {
        const groupKey = skill.type === 'Warband Specific' ? 'Special' : skill.category;
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(skill);
        return acc;
    }, {});

    // Sort categories alphabetically
    const sortedCategories = Object.keys(groupedSkills).sort();

    sortedCategories.forEach(category => {
        const categoryId = category.replace(/\s+/g, '-');

        // Category header with chevron icon
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'flex items-center justify-between cursor-pointer text-lg font-semibold text-mordheim-gold mt-4 hover:text-yellow-400 transition p-2 bg-slate-800 rounded-lg';
        categoryHeader.innerHTML = `
            <span>${category}</span>
            <i class="fas fa-chevron-right transition-transform" id="override-chevron-${categoryId}"></i>
        `;

        // Collapsible container for skills
        const skillsContainer = document.createElement('div');
        skillsContainer.id = `override-skills-${categoryId}`;
        skillsContainer.className = 'hidden mt-1 space-y-1';

        // Click handler to toggle
        categoryHeader.onclick = () => {
            skillsContainer.classList.toggle('hidden');
            const chevron = categoryHeader.querySelector('i');
            chevron.classList.toggle('fa-chevron-right');
            chevron.classList.toggle('fa-chevron-down');
        };

        listContainer.appendChild(categoryHeader);
        listContainer.appendChild(skillsContainer);

        groupedSkills[category].forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'p-3 rounded-lg hover:bg-slate-700 cursor-pointer transition bg-slate-800';
            skillElement.innerHTML = `
                <p class="font-semibold text-sm text-white">${skill.name}</p>
                <p class="text-xs text-slate-400 mt-1">${skill.rules}</p>
            `;
            skillElement.onclick = () => {
                addSkill(skill.name);
                hideModal('skill-override-modal');
            };
            skillsContainer.appendChild(skillElement);
        });
    });
};

/** Shows the modal to select a skill for override */
export const showSkillOverrideModal = () => {
    const optionsContainer = document.getElementById('skill-override-options');
    optionsContainer.innerHTML = '';

    // Build warband filter dropdown
    const filterWrapper = document.createElement('div');
    filterWrapper.className = 'mb-4';

    const filterSelect = document.createElement('select');
    filterSelect.className = 'w-full p-2 rounded-lg bg-slate-800 border border-slate-600 text-white text-sm';
    filterSelect.innerHTML = '<option value="">All Skills</option>';

    // Collect all warband names
    const allWarbandNames = WARBANDS.flatMap(g => g.warbands.map(w => w.name)).sort();
    allWarbandNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        filterSelect.appendChild(option);
    });

    // Default to current warband if loaded
    if (currentWarband && currentWarband.type) {
        filterSelect.value = currentWarband.type;
    }

    filterSelect.onchange = () => renderSkillOverrideList(filterSelect.value || null);
    filterWrapper.appendChild(filterSelect);
    optionsContainer.appendChild(filterWrapper);

    // Container for the skill list (separate from the filter)
    const listContainer = document.createElement('div');
    listContainer.id = 'skill-override-list';
    listContainer.className = 'space-y-1 max-h-[60vh] overflow-y-auto custom-scroll';
    optionsContainer.appendChild(listContainer);

    // Initial render with selected filter
    renderSkillOverrideList(filterSelect.value || null);

    displayModal('skill-override-modal');
};

/** Shows the modal to override characteristics manually */
export const showStatsOverrideModal = () => {
    const contentContainer = document.getElementById('stats-override-content');
    if (!contentContainer) return;
    contentContainer.innerHTML = '';

    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband && currentWarband.members ? currentWarband.members.find(f => f.id === fighterId) : null;

    // Check if we have multi-stats (from state or fighter object)
    const isMultiStat = currentFighterMultiStats !== null || (fighter && fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v)));

    if (isMultiStat && currentFighterMultiStats === null && fighter && fighter.stats) {
        setCurrentFighterMultiStats(JSON.parse(JSON.stringify(fighter.stats)));
    }

    let inputsHtml = '';

    if (isMultiStat) {
        const statLineKeys = Object.keys(currentFighterMultiStats);
        inputsHtml = statLineKeys.map(statLineKey => {
            const statLineStats = currentFighterMultiStats[statLineKey];
            return `
                <div class="bg-slate-800 p-4 rounded-lg border border-slate-600 mb-4">
                    <div class="text-center font-bold text-mordheim-gold mb-2 uppercase text-sm">${statLineKey}</div>
                    <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                        ${STATS_FIELDS.map(stat => `
                            <div class="flex flex-col items-center bg-slate-900 p-2 rounded border border-slate-700">
                                <label for="override-stat-${statLineKey}-${stat}" class="text-xs text-slate-400 font-semibold mb-1 uppercase">${stat}</label>
                                <input
                                    type="number"
                                    id="override-stat-${statLineKey}-${stat}"
                                    value="${statLineStats[stat] !== undefined ? statLineStats[stat] : 3}"
                                    class="w-full text-center bg-slate-800 border border-slate-600 rounded text-white p-1 focus:ring-1 focus:ring-mordheim-gold text-sm font-semibold"
                                    min="0"
                                >
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    } else {
        // Single stat line (use currentFighterBaseStats or empty object fallback)
        const stats = currentFighterBaseStats || {};
        inputsHtml = `
            <div class="bg-slate-800 p-4 rounded-lg border border-slate-600">
                <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                    ${STATS_FIELDS.map(stat => `
                        <div class="flex flex-col items-center bg-slate-900 p-2 rounded border border-slate-700">
                            <label for="override-stat-${stat}" class="text-xs text-slate-400 font-semibold mb-1 uppercase">${stat}</label>
                            <input
                                type="number"
                                id="override-stat-${stat}"
                                value="${stats[stat] !== undefined ? stats[stat] : 3}"
                                class="w-full text-center bg-slate-800 border border-slate-600 rounded text-white p-1 focus:ring-1 focus:ring-mordheim-gold text-sm font-semibold"
                                min="0"
                            >
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Build history entries
    let historyHtml = '<p class="text-sm text-slate-500 italic">No past overrides.</p>';
    if (fighter && Array.isArray(fighter.stats_override_history) && fighter.stats_override_history.length > 0) {
        historyHtml = fighter.stats_override_history.map(entry => `
            <div class="bg-slate-900 p-2.5 rounded border border-slate-700 text-xs space-y-1 text-left">
                <div class="flex justify-between items-center text-slate-400 font-medium">
                    <span>${entry.date}</span>
                    <span class="text-slate-300 font-bold">${entry.change}</span>
                </div>
                <div class="text-slate-305">
                    <span class="text-slate-500 font-semibold">Reason:</span> ${entry.reason || 'No reason provided'}
                </div>
            </div>
        `).join('');
    }

    const extraFieldsHtml = `
        <!-- Override Reason -->
        <div class="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-600 text-left">
            <label for="override-reason" class="block text-sm font-semibold text-slate-300 mb-1">Reason for Override (Optional - Max 50 chars)</label>
            <input
                type="text"
                id="override-reason"
                maxlength="50"
                placeholder="e.g., Glitch fix for advances"
                class="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white text-sm focus:ring-1 focus:ring-mordheim-gold"
            >
        </div>

        <!-- Override History -->
        <div class="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-600 text-left">
            <h4 class="text-sm font-bold text-mordheim-gold mb-2"><i class="fas fa-history mr-1"></i>Override History</h4>
            <div id="override-history-list" class="space-y-2 max-h-40 overflow-y-auto custom-scroll">
                ${historyHtml}
            </div>
        </div>
    `;

    // Build characteristic breakdown showing what modifies each stat
    let breakdownHtml = '';
    {
        const breakdownBaseStats = isMultiStat 
            ? (currentFighterMultiStats?.['Fighter'] || currentFighterBaseStats || {})
            : (currentFighterBaseStats || {});
        
        // Get equipment modifiers
        const eqJson = document.getElementById('f-equipment-json');
        let eqItems = [];
        try { eqItems = JSON.parse(eqJson?.value || '[]'); } catch (e) { eqItems = []; }
        
        const eqMods = {};
        eqItems.forEach(item => {
            const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === item.name);
            if (masterItem && masterItem.characteristicModifiers) {
                Object.keys(masterItem.characteristicModifiers).forEach(stat => {
                    eqMods[stat] = (eqMods[stat] || 0) + masterItem.characteristicModifiers[stat];
                });
            }
        });
        
        // Get skill modifiers
        const skJson = document.getElementById('f-skills-hidden');
        let skItems = [];
        try { skItems = JSON.parse(skJson?.value || '[]'); } catch (e) { skItems = []; }
        
        const skMods = {};
        skItems.forEach(skillName => {
            const skill = findSkillForWarband(skillName);
            if (skill && skill.characteristicModifiers) {
                Object.keys(skill.characteristicModifiers).forEach(stat => {
                    skMods[stat] = (skMods[stat] || 0) + skill.characteristicModifiers[stat];
                });
            }
        });
        
        // Get injury modifiers
        const injJson = document.getElementById('f-injuries-json');
        let injItems = [];
        try { injItems = JSON.parse(injJson?.value || '[]'); } catch (e) { injItems = []; }
        
        const injMods = {};
        injItems.forEach(injuryName => {
            const injury = MASTER_INJURY_LIST.find(i => i.name === injuryName);
            if (injury && injury.characteristicModifiers) {
                Object.keys(injury.characteristicModifiers).forEach(stat => {
                    injMods[stat] = (injMods[stat] || 0) + injury.characteristicModifiers[stat];
                });
            }
        });
        
        const hasAnyMods = STATS_FIELDS.some(stat => 
            (eqMods[stat] || 0) !== 0 || (skMods[stat] || 0) !== 0 || (injMods[stat] || 0) !== 0
        );
        
        if (hasAnyMods) {
            const formatMod = (val) => val === 0 ? '' : (val > 0 ? '+' + val : '' + val);
            
            breakdownHtml = `
                <div class="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <h4 class="text-sm font-bold text-mordheim-gold mb-3"><i class="fas fa-chart-bar mr-1"></i>Characteristic Modifiers</h4>
                    <div class="overflow-x-auto">
                        <table class="w-full text-xs text-center">
                            <thead>
                                <tr class="text-slate-400 uppercase">
                                    <th class="text-left p-1">Source</th>
                                    ${STATS_FIELDS.map(stat => `<th class="p-1">${stat}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-slate-300 border-t border-slate-700">
                                    <td class="text-left p-1 font-semibold">Base</td>
                                    ${STATS_FIELDS.map(stat => `<td class="p-1">${breakdownBaseStats[stat] !== undefined ? breakdownBaseStats[stat] : '-'}</td>`).join('')}
                                </tr>
                                ${STATS_FIELDS.some(stat => (eqMods[stat] || 0) !== 0) ? `
                                <tr class="text-green-400 border-t border-slate-700">
                                    <td class="text-left p-1 font-semibold">Equipment</td>
                                    ${STATS_FIELDS.map(stat => `<td class="p-1">${formatMod(eqMods[stat] || 0)}</td>`).join('')}
                                </tr>` : ''}
                                ${STATS_FIELDS.some(stat => (skMods[stat] || 0) !== 0) ? `
                                <tr class="text-blue-400 border-t border-slate-700">
                                    <td class="text-left p-1 font-semibold">Skills</td>
                                    ${STATS_FIELDS.map(stat => `<td class="p-1">${formatMod(skMods[stat] || 0)}</td>`).join('')}
                                </tr>` : ''}
                                ${STATS_FIELDS.some(stat => (injMods[stat] || 0) !== 0) ? `
                                <tr class="text-red-400 border-t border-slate-700">
                                    <td class="text-left p-1 font-semibold">Injuries</td>
                                    ${STATS_FIELDS.map(stat => `<td class="p-1">${formatMod(injMods[stat] || 0)}</td>`).join('')}
                                </tr>` : ''}
                                <tr class="text-mordheim-gold font-bold border-t-2 border-mordheim-gold">
                                    <td class="text-left p-1">Displayed</td>
                                    ${STATS_FIELDS.map(stat => {
                                        const base = breakdownBaseStats[stat] !== undefined ? breakdownBaseStats[stat] : 0;
                                        const total = base + (eqMods[stat] || 0) + (skMods[stat] || 0) + (injMods[stat] || 0);
                                        return `<td class="p-1">${total}</td>`;
                                    }).join('')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }
    }

    contentContainer.innerHTML = inputsHtml + breakdownHtml + extraFieldsHtml;
    displayModal('stats-override-modal');
};

/** Handles submitting overridden stats, saving to state and updating UI */
export const submitStatsOverride = () => {
    const fighterId = document.getElementById('fighter-id').value;
    const fighter = currentWarband && currentWarband.members ? currentWarband.members.find(f => f.id === fighterId) : null;

    const isMultiStat = currentFighterMultiStats !== null || (fighter && fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v)));

    if (isMultiStat && currentFighterMultiStats === null && fighter && fighter.stats) {
        setCurrentFighterMultiStats(JSON.parse(JSON.stringify(fighter.stats)));
    }

    const oldStats = JSON.parse(JSON.stringify(isMultiStat ? (currentFighterMultiStats || {}) : (currentFighterBaseStats || {})));
    const changes = [];

    if (isMultiStat) {
        const statLineKeys = Object.keys(currentFighterMultiStats);
        const updatedMultiStats = {};
        statLineKeys.forEach(statLineKey => {
            updatedMultiStats[statLineKey] = {};
            const oldLineStats = oldStats[statLineKey] || {};
            STATS_FIELDS.forEach(stat => {
                const input = document.getElementById(`override-stat-${statLineKey}-${stat}`);
                const newVal = input ? (parseInt(input.value) || 0) : (currentFighterMultiStats[statLineKey]?.[stat] || 0);
                updatedMultiStats[statLineKey][stat] = newVal;

                const oldVal = oldLineStats[stat] !== undefined ? oldLineStats[stat] : 3;
                const diff = newVal - oldVal;
                if (diff !== 0) {
                    changes.push(`[${statLineKey}] ${diff > 0 ? '+' : ''}${diff} ${stat}`);
                }
            });
        });
        // Update the state
        setCurrentFighterMultiStats(updatedMultiStats);
        
        // Also update the currentFighterBaseStats as the first component's stats
        const baseStats = Object.values(updatedMultiStats)[0];
        setCurrentFighterBaseStats({ ...baseStats });
        
        // Update the fighter's stats directly in the member list
        if (fighter) {
            fighter.stats = updatedMultiStats;
            if (fighter.base_stats) {
                fighter.base_stats = JSON.parse(JSON.stringify(updatedMultiStats));
            }
        }

        // Re-render the main stats grid using multiStats
        renderStatInputs(updatedMultiStats);
    } else {
        const updatedStats = {};
        STATS_FIELDS.forEach(stat => {
            const input = document.getElementById(`override-stat-${stat}`);
            const newVal = input ? (parseInt(input.value) || 0) : (currentFighterBaseStats?.[stat] || 0);
            updatedStats[stat] = newVal;

            const oldVal = oldStats[stat] !== undefined ? oldStats[stat] : 3;
            const diff = newVal - oldVal;
            if (diff !== 0) {
                changes.push(`${diff > 0 ? '+' : ''}${diff} ${stat}`);
            }
        });
        // Update the state
        setCurrentFighterBaseStats(updatedStats);
        
        // Update the fighter's stats directly in the member list
        if (fighter) {
            fighter.stats = updatedStats;
            if (fighter.base_stats) {
                fighter.base_stats = JSON.parse(JSON.stringify(updatedStats));
            }
        }

        // Re-render the main stats grid using updatedStats
        renderStatInputs(updatedStats);
    }

    // Capture changes if any occurred
    if (changes.length > 0) {
        const reasonInput = document.getElementById('override-reason');
        const reason = reasonInput ? reasonInput.value.trim() : '';
        const changeString = changes.join(', ');

        const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        const newEntry = {
            date: date,
            change: changeString,
            reason: reason || 'No reason provided'
        };

        if (fighter) {
            fighter.stats_override_history = fighter.stats_override_history || [];
            fighter.stats_override_history.unshift(newEntry); // Prepend
        }
    }

    // Re-apply modifiers & racial maximums to reflect changes
    updateStatModifiers();
    renderRacialMaximums();

    hideModal('stats-override-modal');
    showMessage("Characteristics successfully overridden!", 'success');
};

// ─── Skill Access Override ──────────────────────────────────────────────────

const SKILL_ACCESS_CATEGORIES = ['Combat', 'Shooting', 'Academic', 'Strength', 'Speed', 'Special'];

/** Shows the modal to toggle skill table access for the current fighter */
export const showSkillAccessOverrideModal = () => {
    const optionsContainer = document.getElementById('skill-access-override-options');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    // Determine current effective categories
    const baseCats = getBaseSkillCategories();
    const grantedCats = getAvailableSkillCategories();
    const restrictedCats = getRestrictedSkillCategories();
    const currentEffective = [...new Set([...baseCats, ...grantedCats])].filter(cat => !restrictedCats.includes(cat));

    // Check if there's already an override stored
    const overrideInput = document.getElementById('f-skill-categories-override-json');
    let overrideCategories = null;
    if (overrideInput && overrideInput.value) {
        try {
            overrideCategories = JSON.parse(overrideInput.value);
        } catch (e) {}
    }

    // Use override if set, otherwise use current effective
    const checkedCategories = overrideCategories || currentEffective;

    SKILL_ACCESS_CATEGORIES.forEach(category => {
        const isChecked = checkedCategories.includes(category);
        const isFromEquipment = grantedCats.includes(category) && !baseCats.includes(category);
        const isRestricted = restrictedCats.includes(category);

        const row = document.createElement('label');
        row.className = 'flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-600 cursor-pointer';
        row.innerHTML = `
            <input type="checkbox" class="w-5 h-5 text-mordheim-gold bg-slate-800 border-slate-600 rounded focus:ring-mordheim-gold focus:ring-2"
                data-category="${category}" ${isChecked ? 'checked' : ''}>
            <span class="text-slate-200 font-semibold">${category}</span>
            ${isFromEquipment ? '<span class="text-green-400 text-xs">(from equipment)</span>' : ''}
            ${isRestricted ? '<span class="text-red-400 text-xs">(restricted by equipment)</span>' : ''}
        `;
        optionsContainer.appendChild(row);
    });

    displayModal('skill-access-override-modal');
};

/** Saves the skill access override from the modal checkboxes */
export const submitSkillAccessOverride = () => {
    const optionsContainer = document.getElementById('skill-access-override-options');
    if (!optionsContainer) return;

    const checkboxes = optionsContainer.querySelectorAll('input[type="checkbox"]');
    const selectedCategories = [];
    checkboxes.forEach(cb => {
        if (cb.checked) {
            selectedCategories.push(cb.dataset.category);
        }
    });

    // Store in hidden input for save
    const overrideInput = document.getElementById('f-skill-categories-override-json');
    if (overrideInput) {
        overrideInput.value = JSON.stringify(selectedCategories);
    }

    // Update base categories to reflect the override immediately
    setBaseSkillCategories(selectedCategories);

    // Refresh the Available Skill Tables display
    refreshSkillTablesDisplay();

    hideModal('skill-access-override-modal');
    showMessage('Skill access override applied!', 'success');
};

/** Resets the skill access override, reverting to default warband/fighter data */
export const resetSkillAccessOverride = () => {
    // Clear the hidden input
    const overrideInput = document.getElementById('f-skill-categories-override-json');
    if (overrideInput) {
        overrideInput.value = '';
    }

    // Recalculate base categories from fighter/warband data
    // We need to get the fighter data to recalculate
    const fighterNameEl = document.getElementById('f-name');
    const fighterName = fighterNameEl ? fighterNameEl.value : '';
    const fighterId = document.getElementById('f-id')?.value;

    let originalBaseCats = [];
    if (currentWarband && currentWarband.members) {
        const fighter = currentWarband.members.find(f => f.id === fighterId);
        if (fighter) {
            // Check skills for Proven Warrior
            if (fighter.skills && fighter.skills.includes('Proven Warrior')) {
                originalBaseCats = ['Combat', 'Shooting', 'Strength', 'Speed', 'Special'];
            } else if (fighter.skill_categories && fighter.skill_categories.length > 0) {
                originalBaseCats = [...fighter.skill_categories];
            } else {
                // Look up from warband data
                const warbandData = getWarbandData(currentWarband.type);
                if (warbandData && warbandData.warriors) {
                    const warriorData = warbandData.warriors.find(w => w.name === (fighter.warrior_choice || fighter.name));
                    if (warriorData) {
                        originalBaseCats = getWarriorSkills(warriorData, currentWarband);
                    }
                }
            }
        }
    }

    setBaseSkillCategories(originalBaseCats);

    // Refresh the Available Skill Tables display
    refreshSkillTablesDisplay();

    hideModal('skill-access-override-modal');
    showMessage('Skill access override removed — reverted to defaults.', 'success');
};

/** Refreshes the Available Skill Tables display using current state */
const refreshSkillTablesDisplay = () => {
    const baseCats = getBaseSkillCategories();
    const grantedCats = getAvailableSkillCategories();
    const restrictedCats = getRestrictedSkillCategories();
    const combined = [...new Set([...baseCats, ...grantedCats])];

    // Check for skill-based grants
    let skillsList = [];
    const skillsInput = document.getElementById('f-skills-hidden');
    if (skillsInput && skillsInput.value) {
        try {
            skillsList = JSON.parse(skillsInput.value);
        } catch (e) {}
    }
    const hasSkillGrant = skillsList.includes('Powerful Build') || skillsList.includes('Aspect of the Stag');
    if (hasSkillGrant && !combined.includes('Strength')) {
        combined.push('Strength');
    }

    // Filter out restricted categories for the effective list
    const effective = combined.filter(cat => !restrictedCats.includes(cat));

    // Check if override is active
    const overrideInput = document.getElementById('f-skill-categories-override-json');
    const hasOverride = overrideInput && overrideInput.value && overrideInput.value !== '[]';

    const skillTablesDisplay = document.getElementById('skill-tables-display');
    const skillTablesList = document.getElementById('skill-tables-list');
    if (skillTablesDisplay && skillTablesList) {
        if (effective.length > 0 || restrictedCats.length > 0) {
            const categoriesHtml = effective.map(category => {
                const isFromEquipment = grantedCats.includes(category) && !baseCats.includes(category);
                if (isFromEquipment) {
                    return `<span class="text-slate-300">${category}</span> <span class="text-green-400 text-xs">(from equipment)</span>`;
                }
                const isFromSkill = category === 'Strength' && hasSkillGrant && !baseCats.includes(category);
                if (isFromSkill) {
                    return `<span class="text-slate-300">${category}</span> <span class="text-green-400 text-xs">(from skill)</span>`;
                }
                return `<span class="text-slate-300">${category}</span>`;
            }).join(', ');

            // Show restricted categories with strikethrough
            const restrictedHtml = restrictedCats.length > 0
                ? (effective.length > 0 ? ', ' : '') + restrictedCats.map(cat =>
                    `<span class="text-red-400 line-through">${cat}</span> <span class="text-red-400 text-xs">(restricted by equipment)</span>`
                ).join(', ')
                : '';

            let overrideIndicator = '';
            if (hasOverride) {
                overrideIndicator = ' <span class="text-orange-400 text-xs font-semibold ml-2">(overridden)</span>';
            }

            skillTablesList.innerHTML = categoriesHtml + restrictedHtml + overrideIndicator;
            skillTablesDisplay.classList.remove('hidden');
        } else {
            skillTablesDisplay.classList.add('hidden');
        }
    }
};

/** Shows the modal to select a permanent injury */
export const showInjurySelectionModal = () => {
    const optionsContainer = document.getElementById('injury-selection-options');
    optionsContainer.innerHTML = '';

    MASTER_INJURY_LIST.forEach(injury => {
        const injuryElement = document.createElement('div');
        injuryElement.className = 'p-2 rounded-lg hover:bg-slate-600 cursor-pointer';
        injuryElement.innerHTML = `
            <p class="font-semibold">${injury.name}</p>
            <p class="text-xs text-slate-400">${injury.description}</p>
            ${injury.characteristicModifiers && Object.keys(injury.characteristicModifiers).length > 0 ?
                `<p class="text-xs text-yellow-300">Modifiers: ${Object.entries(injury.characteristicModifiers).map(([stat, mod]) => `${stat} ${mod > 0 ? '+' : ''}${mod}`).join(', ')}</p>` :
                ''
            }
        `;
        injuryElement.onclick = () => {
            addInjury(injury.name);
            hideModal('injury-selection-modal');
        };
        optionsContainer.appendChild(injuryElement);
    });

    displayModal('injury-selection-modal');
};



/** Renders the skills in the Turn Order Tracker based on their timing */
export const renderTurnOrderTracker = (warband) => {
    const timingSections = {
        "1": "pre-game-skills",
        "2": "recovery-skills",
        "3": "movement-skills",
        "4": "my-movement-skills",
        "5": "opponent-movement-skills",
        "6": "shooting-skills",
        "7": "my-shooting-skills",
        "8": "opponent-shooting-skills",
        "9": "melee-skills",
        "10": "my-melee-skills",
        "11": "opponent-melee-skills",
        "12": "misc-skills",
        "13": "post-game-skills",
    };

    // Clear all sections first
    for (const key in timingSections) {
        document.getElementById(timingSections[key]).innerHTML = '';
    }

    if (!warband || !warband.members || warband.members.length === 0) {
        for (const key in timingSections) {
            document.getElementById(timingSections[key]).innerHTML = '<li class="text-slate-500 italic">No skills for this phase.</li>';
        }
        return;
    }

    const allFighterSkills = [];
    const allFighterSpecialRules = [];
    const allFighterEquipmentRules = [];
    const allFighterInjuries = [];

    warband.members.forEach(fighter => {
        // Collect skills (for V2 warbands, these are non-spell skills only)
        if (fighter.skills && fighter.skills.length > 0) {
            fighter.skills.forEach(skillName => {
                let skillData = findSkillForWarband(skillName, null, fighter);
                if (skillData) {
                    allFighterSkills.push({
                        fighterName: fighter.name,
                        fighterId: fighter.id,
                        skill: skillData
                    });
                }
            });
        }
        
        // Collect spells from magic field (V2 warbands) or skills field (V1 warbands)
        const isV2Warband = warband._isV2;
        const spellsToCheck = isV2Warband ? (fighter.magic || []) : (fighter.skills || []);
        
        spellsToCheck.forEach(spellName => {
            // Check if it's a spell
            for (const group in MAGIC) {
                const spell = MAGIC[group].find(s => s.name === spellName);
                if (spell) {
                    allFighterSkills.push({
                        fighterName: fighter.name,
                        skill: spell
                    });
                    break;
                }
            }
        });

        // Collect special rules from fighter data
        if (fighter.special_rules) {
            const rules = fighter.special_rules.split(';').map(r => r.trim().split('(')[0].trim());
            rules.forEach(ruleName => {
                const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);
                if (ruleData && ruleData.timing && ruleData.timing.length > 0) {
                    allFighterSpecialRules.push({
                        fighterName: fighter.name,
                        rule: ruleData
                    });
                }
            });
        }

        // Collect equipment rules with timing
        if (fighter.equipment && fighter.equipment.length > 0) {
            fighter.equipment.forEach(equip => {
                const normalizedEquip = normalizeEquipment(equip);
                const equipData = MASTER_EQUIPMENT_LIST.find(e => e.name === normalizedEquip.name);
                if (equipData) {
                    if (equipData.turnOrderRules && Array.isArray(equipData.turnOrderRules) && equipData.turnOrderRules.every(r => typeof r === 'object' && r.timing)) {
                        // New way: each rule has its own timing
                        equipData.turnOrderRules.forEach(ruleObj => {
                            allFighterEquipmentRules.push({
                                fighterName: fighter.name,
                                name: ruleObj.name,
                                timing: Array.isArray(ruleObj.timing) ? ruleObj.timing : [ruleObj.timing],
                                equipmentName: equipData.name
                            });
                        });
                    } else if (equipData.timing && equipData.timing.length > 0) {
                        // Old way: single timing for equipment
                        allFighterEquipmentRules.push({
                            fighterName: fighter.name,
                            name: equipData.name,
                            timing: equipData.timing,
                            equipmentName: equipData.name
                        });
                    }
                }
            });
        }

        // Collect injuries with timing
        if (fighter.injuries && fighter.injuries.length > 0) {
            fighter.injuries.forEach(injuryName => {
                const injuryData = MASTER_INJURY_LIST.find(i => i.name === injuryName);
                if (injuryData && injuryData.timing) {
                    allFighterInjuries.push({
                        fighterName: fighter.name,
                        injury: injuryData
                    });
                }
            });
        }
    });

    // Group skills and special rules by timing
    const skillsByTiming = {};
    for (const key in timingSections) {
        skillsByTiming[key] = [];
    }

    allFighterSkills.forEach(fs => {
        fs.skill.timing.forEach(timingId => {
            if (skillsByTiming[timingId]) {
                skillsByTiming[timingId].push({ type: 'skill', data: fs });
            }
        });
    });

    allFighterSpecialRules.forEach(fr => {
        fr.rule.timing.forEach(timingId => {
            if (skillsByTiming[timingId]) {
                skillsByTiming[timingId].push({ type: 'rule', data: fr });
            }
        });
    });

    allFighterEquipmentRules.forEach(fe => {
        fe.timing.forEach(timingId => {
            if (skillsByTiming[timingId]) {
                skillsByTiming[timingId].push({ type: 'equipment', data: fe });
            }
        });
    });

    allFighterInjuries.forEach(fi => {
        if (skillsByTiming[fi.injury.timing]) {
            skillsByTiming[fi.injury.timing].push({ type: 'injury', data: fi });
        }
    });

    // Render skills and special rules into their respective sections
    for (const timingId in skillsByTiming) {
        const ulElement = document.getElementById(timingSections[timingId]);
        const sectionDiv = ulElement.parentElement; // Get the parent div of the ul

        if (skillsByTiming[timingId].length === 0) {
            ulElement.innerHTML = '<li class="text-slate-500 italic">No skills for this phase.</li>';
            sectionDiv.style.display = 'none'; // Hide section with no data
        } else {
            // Sort by name
            skillsByTiming[timingId].sort((a, b) => {
                const nameA = a.type === 'skill' ? a.data.skill.name : (a.type === 'rule' ? a.data.rule.name : (a.type === 'equipment' ? a.data.name : a.data.injury.name));
                const nameB = b.type === 'skill' ? b.data.skill.name : (b.type === 'rule' ? b.data.rule.name : (b.type === 'equipment' ? b.data.name : b.data.injury.name));
                return nameA.localeCompare(nameB);
            });

            // Group items by type and name to combine fighters with identical rules
            const groupedItems = skillsByTiming[timingId].reduce((acc, item) => {
                const name = item.type === 'skill' ? item.data.skill.name : (item.type === 'rule' ? item.data.rule.name : (item.type === 'equipment' ? item.data.name : item.data.injury.name));
                const key = `${item.type}-${name}`;
                if (!acc[key]) {
                    acc[key] = {
                        type: item.type,
                        name: name,
                        fighters: [],
                        fighterId: item.data.fighterId,
                        item: item // Keep reference to original item for data attributes
                    };
                }
                acc[key].fighters.push(item.data.fighterName);
                return acc;
            }, {});

            ulElement.innerHTML = Object.values(groupedItems).map(group => {
                const combinedFighterNames = group.fighters.join(', ');
                // Escape HTML attributes to prevent syntax errors
                const escapeHtml = (str) => str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                const escapedName = escapeHtml(group.name);
                const escapedEquipmentName = group.type === 'equipment' ? escapeHtml(group.item.data.equipmentName) : '';
                
                const fighterIdAttr = group.type === 'skill' && group.fighterId ? ` data-fighter-id="${group.fighterId}"` : '';
                const dataAttr = group.type === 'skill' ? `data-skill-name="${escapedName}"${fighterIdAttr}` : (group.type === 'rule' ? `data-rule="${escapedName}"` : (group.type === 'equipment' ? `data-equipment-name="${escapedEquipmentName}" data-equipment-rule-name="${escapedName}"` : `data-injury-name="${escapedName}"`));
                return `
                    <li class="flex items-center justify-between p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition">
                        <span class="font-semibold text-yellow-200 underline cursor-pointer" ${dataAttr}>${group.name}</span>
                        <span class="text-xs text-slate-400 ml-2">(${combinedFighterNames})</span>
                    </li>
                `;
            }).join('');
            sectionDiv.style.display = 'block'; // Show section with data
        }
    }
};

/** Renders the granted skill categories display in the fighter modal */
export const renderGrantedSkillCategories = () => {
    const grantedCategories = getAvailableSkillCategories();
    const displayContainer = document.getElementById('granted-skill-categories-display');
    
    if (!displayContainer) return;
    
    if (grantedCategories.length === 0) {
        displayContainer.innerHTML = '<p class="text-slate-500 text-sm italic">No skill categories granted by equipment.</p>';
        return;
    }
    
    const categoriesHtml = grantedCategories.map(category => `
        <span class="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold mr-2 mb-1">
            ${category}
        </span>
    `).join('');
    
    displayContainer.innerHTML = `
        <div class="mb-2">
            <p class="text-sm font-semibold text-slate-300 mb-1">Skill Categories Granted by Equipment:</p>
            <div class="flex flex-wrap">
                ${categoriesHtml}
            </div>
        </div>
    `;
};

// Battle View Implementation
const PHASES = [
    { id: 1, name: "Pre Game", description: "Setup and pre-game skills" },
    { id: 2, name: "Recovery", description: "Recovery phase skills" },
    { id: 3, name: "Movement", description: "General movement skills" },
    { id: 4, name: "My Movement", description: "Your movement phase" },
    { id: 5, name: "Opponent Movement", description: "Opponent movement phase" },
    { id: 6, name: "Shooting", description: "General shooting skills" },
    { id: 7, name: "My Shooting", description: "Your shooting phase" },
    { id: 8, name: "Opponent Shooting", description: "Opponent shooting phase" },
    { id: 9, name: "Melee", description: "General melee skills" },
    { id: 10, name: "My Melee", description: "Your melee phase" },
    { id: 11, name: "Opponent Melee", description: "Opponent melee phase" },
    { id: 12, name: "Misc", description: "Miscellaneous phase" },
    { id: 13, name: "Post Game", description: "Post game skills" }
];

let currentPhase = 1;
let battleState = {
    kills: {},
    statusConditions: {}
};

/** Toggles to show the Battle View */
export const showBattleView = () => {
    trackScreenView('Battle View');
    document.getElementById('warband-list-view').classList.add('hidden');
    document.getElementById('warband-editor-view').classList.add('hidden');
    document.getElementById('turn-order-tracker-view').classList.add('hidden');
    document.getElementById('battle-view').classList.remove('hidden');
    
    // Hide header and footer for battle view to save space
    document.getElementById('main-header').classList.add('hidden');
    document.getElementById('main-footer').classList.add('hidden');
    
    // Check for sickness injuries before starting battle
    checkSicknessAtBattleStart(() => {
        // Initialize battle state after sickness check
        currentPhase = 1;
        renderBattleView(currentWarband);
    });
};

/** Renders the main battle view */
export const renderBattleView = (warband) => {
    if (!warband) return;
    
    // Update header
    document.getElementById('battle-warband-name').textContent = warband.name;
    document.getElementById('battle-warband-rating').textContent = warband.rating;
    
    // Populate dropdown with only phases that have data
    populatePhaseDropdown(warband);
    
    // Render current phase
    renderCurrentPhase();
    
    // Render fighters
    renderBattleFighters(warband);
};

/** Populates the phase dropdown with only phases that have relevant data */
const populatePhaseDropdown = (warband) => {
    const phaseSelect = document.getElementById('phase-select');
    if (!phaseSelect || !warband || !warband.members) return;
    
    // Collect all phases that have data
    const phasesWithData = new Set();
    
    warband.members.forEach(fighter => {
        // Check skills with timing (for V2 warbands, these are non-spell skills only)
        if (fighter.skills && fighter.skills.length > 0) {
            fighter.skills.forEach(skillName => {
                let skillData = findSkillForWarband(skillName, null, fighter);
                if (skillData && skillData.timing) {
                    skillData.timing.forEach(timingId => phasesWithData.add(timingId));
                }
            });
        }
        
        // Check spells with timing from magic field (V2 warbands) or skills field (V1 warbands)
        const isV2Warband = warband._isV2;
        const spellsToCheck = isV2Warband ? (fighter.magic || []) : (fighter.skills || []);
        
        spellsToCheck.forEach(spellName => {
            // Check if it's a spell
            for (const group in MAGIC) {
                const spell = MAGIC[group].find(s => s.name === spellName);
                if (spell && spell.timing) {
                    spell.timing.forEach(timingId => phasesWithData.add(timingId));
                    break;
                }
            }
        });
        
        // Check special rules with timing
        if (fighter.special_rules) {
            const rules = fighter.special_rules.split(';').map(r => r.trim().split('(')[0].trim());
            rules.forEach(ruleName => {
                const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);
                if (ruleData && ruleData.timing) {
                    ruleData.timing.forEach(timingId => phasesWithData.add(timingId));
                }
            });
        }
        
        // Check equipment with timing
        if (fighter.equipment && fighter.equipment.length > 0) {
            fighter.equipment.forEach(equip => {
                const normalizedEquip = normalizeEquipment(equip);
                const equipData = MASTER_EQUIPMENT_LIST.find(e => e.name === normalizedEquip.name);
                if (equipData) {
                    // Handle new turnOrderRules format (array of objects with timing)
                    if (equipData.turnOrderRules && Array.isArray(equipData.turnOrderRules) && equipData.turnOrderRules.length > 0 && typeof equipData.turnOrderRules[0] === 'object') {
                        equipData.turnOrderRules.forEach(ruleObj => {
                            if (ruleObj.timing) {
                                const timings = Array.isArray(ruleObj.timing) ? ruleObj.timing : [ruleObj.timing];
                                timings.forEach(timingId => phasesWithData.add(timingId));
                            }
                        });
                    }
                    // Handle old timing format (timing field or turnOrderRules as array of strings)
                    else if (equipData.timing) {
                        const timings = Array.isArray(equipData.timing) ? equipData.timing : [equipData.timing];
                        timings.forEach(timingId => phasesWithData.add(timingId));
                    }
                }
            });
        }
        
        // Check injuries with timing
        if (fighter.injuries && fighter.injuries.length > 0) {
            fighter.injuries.forEach(injuryName => {
                const injuryData = MASTER_INJURY_LIST.find(i => i.name === injuryName);
                if (injuryData && injuryData.timing) {
                    phasesWithData.add(injuryData.timing);
                }
            });
        }
    });
    
    // Clear existing options
    phaseSelect.innerHTML = '';
    
    // Add only phases with data, sorted by phase number
    const sortedPhases = Array.from(phasesWithData)
        .map(phaseId => parseInt(phaseId))
        .filter(phaseId => phaseId >= 1 && phaseId <= 13)
        .sort((a, b) => a - b);
    
    if (sortedPhases.length === 0) {
        // If no phases have data, add a default option
        phaseSelect.innerHTML = '<option value="1">Phase 1: Pre Game (No abilities)</option>';
        currentPhase = 1;
    } else {
        // Add phases with data
        sortedPhases.forEach(phaseId => {
            const phase = PHASES[phaseId - 1];
            const option = document.createElement('option');
            option.value = phaseId;
            option.textContent = `Phase ${phaseId}: ${phase.name}`;
            phaseSelect.appendChild(option);
        });
        
        // Set current phase to the first available phase
        currentPhase = sortedPhases[0];
    }
};

/** Renders the current phase information */
const renderCurrentPhase = () => {
    // Update dropdown selection
    const phaseSelect = document.getElementById('phase-select');
    if (phaseSelect) {
        phaseSelect.value = currentPhase.toString();
    }
    
    // Render abilities for current phase
    renderPhaseAbilities(currentPhase);
};

/** Renders abilities for the current phase */
const renderPhaseAbilities = (phaseId) => {
    const abilitiesList = document.getElementById('phase-abilities-list');
    
    if (!currentWarband || !currentWarband.members) {
        abilitiesList.innerHTML = '<p class="text-slate-500 italic">No abilities for this phase.</p>';
        return;
    }
    
    const phaseAbilities = [];
    
    currentWarband.members.forEach(fighter => {
        // Collect skills for this phase (for V2 warbands, these are non-spell skills only)
        if (fighter.skills && fighter.skills.length > 0) {
            fighter.skills.forEach(skillName => {
                let skillData = findSkillForWarband(skillName, null, fighter);
                if (skillData && skillData.timing && skillData.timing.includes(phaseId.toString())) {
                    phaseAbilities.push({
                        type: 'skill',
                        name: skillData.name,
                        fighterName: fighter.name,
                        fighterId: fighter.id,
                        description: skillData.rules || skillData.description,
                        data: skillData
                    });
                }
            });
        }
        
        // Collect spells for this phase from magic field (V2 warbands) or skills field (V1 warbands)
        const isV2Warband = currentWarband._isV2;
        const spellsToCheck = isV2Warband ? (fighter.magic || []) : (fighter.skills || []);
        
        spellsToCheck.forEach(spellName => {
            // Check if it's a spell
            for (const group in MAGIC) {
                const spell = MAGIC[group].find(s => s.name === spellName);
                if (spell && spell.timing && spell.timing.includes(phaseId.toString())) {
                    phaseAbilities.push({
                        type: 'skill', // Keep as 'skill' type for display consistency
                        name: spell.name,
                        fighterName: fighter.name,
                        description: spell.description || spell.rules,
                        data: spell
                    });
                    break;
                }
            }
        });
        
        // Collect special rules for this phase
        if (fighter.special_rules) {
            const rules = fighter.special_rules.split(';').map(r => r.trim().split('(')[0].trim());
            rules.forEach(ruleName => {
                const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);
                if (ruleData && ruleData.timing && ruleData.timing.includes(phaseId.toString())) {
                    phaseAbilities.push({
                        type: 'rule',
                        name: ruleData.name,
                        fighterName: fighter.name,
                        description: ruleData.rules || ruleData.description,
                        data: ruleData
                    });
                }
            });
        }
        
        // Collect equipment rules for this phase
        if (fighter.equipment && fighter.equipment.length > 0) {
            fighter.equipment.forEach(equip => {
                const normalizedEquip = normalizeEquipment(equip);
                const equipData = MASTER_EQUIPMENT_LIST.find(e => e.name === normalizedEquip.name);
                if (equipData) {
                    // Handle new turnOrderRules format (array of objects with timing)
                    if (equipData.turnOrderRules && Array.isArray(equipData.turnOrderRules) && equipData.turnOrderRules.length > 0 && typeof equipData.turnOrderRules[0] === 'object') {
                        equipData.turnOrderRules.forEach(ruleObj => {
                            if (ruleObj.timing) {
                                const timings = Array.isArray(ruleObj.timing) ? ruleObj.timing : [ruleObj.timing];
                                if (timings.includes(phaseId.toString())) {
                                    phaseAbilities.push({
                                        type: 'equipment',
                                        name: ruleObj.name || ruleObj.rule,
                                        fighterName: fighter.name,
                                        description: ruleObj.rule || equipData.rules,
                                        data: equipData
                                    });
                                }
                            }
                        });
                    }
                    // Handle old timing format (timing field or turnOrderRules as array of strings)
                    else if (equipData.timing) {
                        const timings = Array.isArray(equipData.timing) ? equipData.timing : [equipData.timing];
                        if (timings.includes(phaseId.toString())) {
                            phaseAbilities.push({
                                type: 'equipment',
                                name: equipData.name,
                                fighterName: fighter.name,
                                description: equipData.rules,
                                data: equipData
                            });
                        }
                    }
                }
            });
        }
    });
    
    if (phaseAbilities.length === 0) {
        abilitiesList.innerHTML = '<p class="text-slate-500 italic">No abilities for this phase.</p>';
    } else {
        // Group abilities by type and name
        const groupedAbilities = phaseAbilities.reduce((acc, ability) => {
            const key = `${ability.type}-${ability.name}`;
            if (!acc[key]) {
                acc[key] = {
                    type: ability.type,
                    name: ability.name,
                    description: ability.description,
                    fighters: [],
                    fighterId: ability.fighterId,
                    data: ability.data
                };
            }
            acc[key].fighters.push(ability.fighterName);
            return acc;
        }, {});
        
        abilitiesList.innerHTML = Object.values(groupedAbilities).map((group, index) => {
            const combinedFighterNames = group.fighters.join(', ');
            const uniqueId = `ability-${group.type}-${index}`;
            // Escape HTML attributes to prevent syntax errors
            const escapeHtml = (str) => str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            const escapedName = escapeHtml(group.name);
            const escapedType = escapeHtml(group.type);
            
            // Create data attributes based on type
            let dataAttributes = '';
            if (group.type === 'skill') {
                const fighterIdAttr = group.fighterId ? ` data-fighter-id="${group.fighterId}"` : '';
                dataAttributes = `data-skill-name="${escapedName}"${fighterIdAttr}`;
            } else if (group.type === 'rule') {
                dataAttributes = `data-rule="${escapedName}"`;
            } else if (group.type === 'equipment') {
                // For equipment, we need to get the actual equipment name from the data
                const equipmentName = group.data?.name || escapedName;
                const escapedEquipmentName = escapeHtml(equipmentName);
                dataAttributes = `data-equipment-name="${escapedEquipmentName}" data-equipment-rule-name="${escapedName}"`;
            }
            
            return `
                <div class="bg-slate-700 p-3 rounded-lg border-l-4 ${group.type === 'skill' ? 'border-blue-500' : group.type === 'rule' ? 'border-purple-500' : 'border-green-500'}">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <span class="font-semibold text-yellow-200 underline cursor-pointer" 
                                          ${dataAttributes}
                                          title="Click for details">
                                        ${group.name}
                                    </span>
                                    <button class="text-slate-400 hover:text-slate-200 ml-2 p-1 transition-colors duration-200" 
                                            onclick="toggleAbilityDetails('${uniqueId}')" 
                                            title="Toggle details">
                                        <i class="fas fa-chevron-down text-sm" id="${uniqueId}-icon"></i>
                                    </button>
                                </div>
                            </div>
                            <span class="text-sm text-slate-400 block mt-1">(${combinedFighterNames})</span>
                        </div>
                        <span class="text-xs px-2 py-1 rounded ${group.type === 'skill' ? 'bg-blue-600' : group.type === 'rule' ? 'bg-purple-600' : 'bg-green-600'} text-white">
                            ${group.type}
                        </span>
                    </div>
                    <div id="${uniqueId}" class="mt-3 text-sm text-slate-300 hidden transition-all duration-200">
                        <div class="border-t border-slate-600 pt-2">
                            <p>${group.description}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
};

/** Renders fighters in battle format */
export const renderBattleFighters = (warband) => {
    const fightersGrid = document.getElementById('battle-fighters-grid');
    
    if (!warband.members || warband.members.length === 0) {
        fightersGrid.innerHTML = '<p class="text-slate-500 italic">No fighters in warband.</p>';
        return;
    }
    
    const fightersHTML = warband.members.map((fighter, index) => {
        const isHenchman = fighter.type === 'Henchman';
        const canTrackKills = fighter.type === 'Hero';
        const currentKills = fighter.kills || 0;
        
        // Get casualty count for this fighter
        const casualtyCount = battleCasualties.get(fighter.id) || 0;
        const hasCasualties = casualtyCount > 0;
        // Sickness casualties (from battle-start check) cannot be undone
        const isSickCasualty = sicknessCasualties.has(fighter.id);
        const canUndoCasualty = casualtyCount > (isSickCasualty ? 1 : 0);
        
        // Calculate effective group size for henchmen
        let effectiveGroupSize = fighter.group_size || 1;
        if (isHenchman && hasCasualties) {
            effectiveGroupSize = Math.max(0, effectiveGroupSize - casualtyCount);
        }
        
        // Check if stats has multiple sub-objects
        const isMultiStatLine = fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v));
        
        let statsHTML = '';
        
        if (isMultiStatLine) {
            // Multi-stat fighter: render each statline separately
            const statLineKeys = Object.keys(fighter.stats);
            statsHTML = statLineKeys.map(statLineKey => {
                const statLineStats = fighter.stats[statLineKey];
                return `
                    <div class="mb-2">
                        <div class="text-center font-bold text-slate-300 mb-1 uppercase text-xs">${statLineKey}</div>
                        <div class="grid grid-cols-9 gap-1 text-xs">
                            ${STATS_FIELDS.map(stat => {
                                let statValue = statLineStats[stat] !== undefined ? statLineStats[stat] : '-';
                                let statColor = '';

                                // Apply equipment modifiers
                                const characteristicModifiers = {};
                                (fighter.equipment || []).forEach(item => {
                                    const normalized = normalizeEquipment(item);
                                    const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === normalized.name);
                                    if (masterItem && masterItem.characteristicModifiers) {
                                        Object.keys(masterItem.characteristicModifiers).forEach(modStat => {
                                            characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + masterItem.characteristicModifiers[modStat];
                                        });
                                    }
                                });

                                // Apply skill characteristic modifiers
                                if (fighter.skills && SKILLS) {
                                    fighter.skills.forEach(skillName => {
                                        const skill = findSkillForWarband(skillName, null, fighter);
                                        if (skill && skill.characteristicModifiers) {
                                            Object.keys(skill.characteristicModifiers).forEach(modStat => {
                                                characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + skill.characteristicModifiers[modStat];
                                            });
                                        }
                                    });
                                }

                                // Apply injury modifiers (only to Fighter stat line, not Mount)
                                if (statLineKey === 'Fighter' && fighter.injuries && fighter.injuries.length > 0) {
                                    fighter.injuries.forEach(injuryName => {
                                        const injury = MASTER_INJURY_LIST.find(i => i.name === injuryName);
                                        if (injury && injury.characteristicModifiers) {
                                            Object.keys(injury.characteristicModifiers).forEach(modStat => {
                                                characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + injury.characteristicModifiers[modStat];
                                            });
                                        }
                                    });
                                }

                                // Special case: Barding penalty to Mount movement
                                if (statLineKey === 'Mount' && stat === 'M') {
                                    characteristicModifiers['M'] = (characteristicModifiers['M'] || 0) + getMountMovementModifier(fighter.equipment);
                                }

                                const modifier = characteristicModifiers[stat] || 0;
                                if (modifier !== 0) {
                                    statValue = Math.max(0, statValue + modifier);
                                    statColor = modifier > 0 ? 'text-green-400' : 'text-red-400';
                                }

                                const penaltyResult = applyHeavyArmourShieldPenalty(stat, statValue, fighter.equipment, fighter.special_rules, fighter.skills);
                                statValue = penaltyResult.value;
                                if (penaltyResult.color) statColor = penaltyResult.color;

                                const paviseResult = applyPaviseMovementPenalty(stat, statValue, fighter.equipment);
                                statValue = paviseResult.value;
                                if (paviseResult.color) statColor = paviseResult.color;

                                return `
                                    <div class="flex flex-col">
                                        <span class="text-xs uppercase text-slate-400">${stat}</span>
                                        <span class="font-bold ${statColor}">${statValue}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            // Single-stat fighter
            statsHTML = `
                <div class="grid grid-cols-9 gap-1 text-xs">
                    ${STATS_FIELDS.map(stat => {
                        let statValue = fighter.stats?.[stat] !== undefined ? fighter.stats[stat] : '-';
                        let statColor = '';

                        // Apply equipment modifiers
                        const characteristicModifiers = {};
                        (fighter.equipment || []).forEach(item => {
                            const normalized = normalizeEquipment(item);
                            const masterItem = MASTER_EQUIPMENT_LIST.find(i => i.name === normalized.name);
                            if (masterItem && masterItem.characteristicModifiers) {
                                Object.keys(masterItem.characteristicModifiers).forEach(modStat => {
                                    characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + masterItem.characteristicModifiers[modStat];
                                });
                            }
                        });

                        // Apply skill characteristic modifiers
                        if (fighter.skills && SKILLS) {
                            fighter.skills.forEach(skillName => {
                                const skill = findSkillForWarband(skillName, null, fighter);
                                if (skill && skill.characteristicModifiers) {
                                    Object.keys(skill.characteristicModifiers).forEach(modStat => {
                                        characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + skill.characteristicModifiers[modStat];
                                    });
                                }
                            });
                        }

                        // Apply injury modifiers
                        if (fighter.injuries && fighter.injuries.length > 0) {
                            fighter.injuries.forEach(injuryName => {
                                const injury = MASTER_INJURY_LIST.find(i => i.name === injuryName);
                                if (injury && injury.characteristicModifiers) {
                                    Object.keys(injury.characteristicModifiers).forEach(modStat => {
                                        characteristicModifiers[modStat] = (characteristicModifiers[modStat] || 0) + injury.characteristicModifiers[modStat];
                                    });
                                }
                            });
                        }

                        const modifier = characteristicModifiers[stat] || 0;
                        if (modifier !== 0) {
                            statValue = Math.max(0, statValue + modifier);
                            statColor = modifier > 0 ? 'text-green-400' : 'text-red-400';
                        }

                        const penaltyResult = applyHeavyArmourShieldPenalty(stat, statValue, fighter.equipment, fighter.special_rules, fighter.skills);
                        statValue = penaltyResult.value;
                        if (penaltyResult.color) statColor = penaltyResult.color;

                        const paviseResult = applyPaviseMovementPenalty(stat, statValue, fighter.equipment);
                        statValue = paviseResult.value;
                        if (paviseResult.color) statColor = paviseResult.color;

                        return `
                            <div class="flex flex-col">
                                <span class="text-xs uppercase text-slate-400">${stat}</span>
                                <span class="font-bold ${statColor}">${statValue}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
        
        // Get essential equipment only (weapons, armor, shields, and battle-relevant items)
        const essentialEquipment = (fighter.equipment || []).map(e => normalizeEquipment(e)).filter(e => {
            const equipData = MASTER_EQUIPMENT_LIST.find(item => item.name === e.name);
            if (!equipData) return false;
            // Show core combat equipment categories
            if (equipData.category === "Close Combat" || equipData.category === "Missile Weapon" || equipData.category === "Armour" || equipData.category === "Shields/Bucklers" || equipData.category === "Mutations") return true;
            // Also show items with battle-relevant effects or stat modifiers
            if (equipData.turnOrderRules || equipData.characteristicModifiers) return true;
            return false;
        });

        // Check if fighter has Rabbit's Foot
        const hasRabbitsFoot = (fighter.equipment || []).map(e => normalizeEquipment(e)).some(e => {
            const equipData = MASTER_EQUIPMENT_LIST.find(item => item.name === e.name);
            return equipData && equipData.id === 69; // Rabbit's Foot ID
        });

        // Check if Rabbit's Foot has been used
        const rabbitFootUsed = rabbitFootUsage.get(fighter.id) || false;

        // Calculate armor save for this fighter
        const armorSaveResult = calculateArmorSave(fighter.equipment || [], isShieldMeleeIgnored, fighter.skills || []);
        let armorSaveDisplay = '';
        
        if (armorSaveResult.isSplit) {
            // Show different saves for melee and ranged
            const meleeSave = armorSaveResult.melee.finalSaveValue;
            const rangedSave = armorSaveResult.ranged.finalSaveValue;
            if (meleeSave === 7 && rangedSave === 7) {
                armorSaveDisplay = '<span class="text-slate-500">None</span>';
            } else if (meleeSave === rangedSave) {
                armorSaveDisplay = `<span class="text-cyan-400 font-bold" title="Melee/Ranged: ${meleeSave}+">${meleeSave}+</span>`;
            } else {
                armorSaveDisplay = `<span class="text-cyan-400 font-bold" title="Melee: ${meleeSave}+, Ranged: ${rangedSave}+">M:${meleeSave}+ R:${rangedSave}+</span>`;
            }
        } else {
            // Single save value
            const saveValue = armorSaveResult.basic.finalSaveValue;
            armorSaveDisplay = saveValue === 7 ? '<span class="text-slate-500">None</span>' : `<span class="text-cyan-400 font-bold" title="Armor Save: ${saveValue}+">${saveValue}+</span>`;
        }

        const equipmentHTML = essentialEquipment.map(e =>
            `<span class="show-equipment-btn bg-slate-600 px-1 py-0.5 rounded text-xs text-yellow-300 underline cursor-pointer hover:bg-slate-500"
                   data-equipment="${e.name}"
                   title="Click for details">${e.name}</span>`
        ).join('');
        
        // Separate skills and spells for display
        const groupName = getMagicGroupForFighter(fighter);
        let allSpellsInGroup = [];
        let skillsToShow = fighter.skills || [];

        // Get all spells for this fighter's magic group(s)
        if (groupName) {
            allSpellsInGroup = getSpellsForGroup(groupName);
        } else {
            // Handle multi-lore fighters
            const rules = fighter.special_rules ? fighter.special_rules.split(';').map(r => r.trim()) : [];
            const magicGroups = Object.keys(MAGIC);
            const availableMagicGroups = rules.filter(rule => magicGroups.includes(rule));
            
            if (availableMagicGroups.length > 0) {
                availableMagicGroups.forEach(group => {
                    const groupSpells = getSpellsForGroup(group);
                    allSpellsInGroup.push(...groupSpells);
                });
            }
        }

        // Remove duplicates and filter out spells from skills
        const uniqueSpells = [...new Set(allSpellsInGroup)];
        skillsToShow = skillsToShow.filter(skill => !uniqueSpells.includes(skill));
        
        // Get actual spells this fighter has (from magic field for V2, skills for V1)
        let fighterSpells;
        if (currentWarband._isV2) {
            fighterSpells = fighter.magic || [];
        } else {
            fighterSpells = (fighter.skills || []).filter(skill => uniqueSpells.includes(skill));
        }

        // Create clickable skill HTML
        const skillsHtml = skillsToShow.length > 0 
            ? skillsToShow.map(skill => 
                `<span class="show-skills-btn text-blue-400 underline cursor-pointer hover:text-blue-300" 
                       data-skills="${skill}" 
                       data-fighter-id="${fighter.id}"
                       title="Click for details">${skill}</span>`
              ).join(', ')
            : 'None';

        // Create clickable spell HTML
        const spellsHtml = fighterSpells.length > 0 
            ? fighterSpells.map(spell => 
                `<span class="show-spells-btn text-mordheim-gold underline cursor-pointer hover:text-yellow-300" 
                       data-spell="${spell}" 
                       title="Click for details">${spell}</span>`
              ).join(', ')
            : '';

        // Parse special rules (string or array)
        let rulesArray = [];
        if (fighter.special_rules) {
            if (Array.isArray(fighter.special_rules)) {
                rulesArray = [...fighter.special_rules];
            } else if (typeof fighter.special_rules === 'string') {
                rulesArray = fighter.special_rules.split(';').map(r => r.trim()).filter(Boolean);
            }
        }

        const specialRulesHtml = rulesArray.length > 0
            ? rulesArray.map(name => {
                const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === name);
                if (ruleData) {
                    return `<span class="show-rules-btn text-purple-400 underline cursor-pointer hover:text-purple-300" 
                               data-rule="${name}" 
                               title="Click for details">${name}</span>`;
                }
                return `<span class="text-slate-300">${name}</span>`;
              }).join(', ')
            : 'None';

        const injuriesHtml = (fighter.injuries && fighter.injuries.length > 0)
            ? fighter.injuries.map(injuryName => {
                const injuryData = MASTER_INJURY_LIST.find(i => i.name === injuryName);
                if (injuryData) {
                    return `<span class="show-injuries-btn text-red-400 underline cursor-pointer hover:text-red-300" 
                               data-injury="${injuryName}" 
                               title="Click for details">${injuryName}</span>`;
                }
                return `<span class="text-slate-300">${injuryName}</span>`;
              }).join(', ')
            : 'None';
        
        // Determine card styling based on casualty state
        const isHenchmanDead = isHenchman && effectiveGroupSize === 0;
        const cardOpacity = (hasCasualties && !isHenchman) || isHenchmanDead ? 'opacity-60' : '';
        const cardBorder = (hasCasualties && !isHenchman) || isHenchmanDead ? 'border-gray-500' : (isHenchman ? 'border-yellow-500' : 'border-red-500');
        const contentVisibility = (hasCasualties && !isHenchman) || isHenchmanDead ? 'hidden' : '';
        const cardPadding = (hasCasualties && !isHenchman) || isHenchmanDead ? 'py-2 px-3' : 'p-3';
        const headerMargin = (hasCasualties && !isHenchman) || isHenchmanDead ? 'mb-1' : 'mb-2';
        
        const fighterTypeLabel = fighter.warrior_choice || fighter.originalName || fighter.type;
        
        return `
            <div class="bg-slate-700 ${cardPadding} rounded-lg border-l-4 ${cardBorder} ${cardOpacity}" id="fighter-card-${fighter.id}" style="position: relative;">
                <div class="flex justify-between items-start ${headerMargin}">
                    <div>
                        <h4 class="fighter-card-toggle font-bold text-sm cursor-pointer hover:text-mordheim-gold transition" data-fighter-id="${fighter.id}">${fighter.name}</h4>
                        <p class="text-xs text-slate-400">${fighterTypeLabel} ${isHenchman ? `x${effectiveGroupSize}${hasCasualties ? ` (${fighter.group_size || 1} - ${casualtyCount} casualties)` : ''}` : ''}</p>
                        <p class="text-xs text-cyan-400">Armor: ${armorSaveDisplay}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="text-center">
                            <div class="text-xs text-slate-400">Casualty</div>
                            <button class="casualty-btn p-1 ${(hasCasualties && !isHenchman) || isHenchmanDead ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-orange-600'} text-white rounded ${(hasCasualties && !isHenchman) || isHenchmanDead ? '' : 'hover:bg-orange-700'} transition relative" title="${(hasCasualties && !isHenchman) || isHenchmanDead ? (isHenchmanDead ? 'Group eliminated' : 'Unit has taken casualties') : 'Mark Casualty'}" data-fighter-id="${fighter.id}" data-fighter-name="${fighter.name.replace(/'/g, '\\\'').replace(/"/g, '\\"')}" ${(hasCasualties && !isHenchman) || isHenchmanDead ? 'disabled' : ''}>
                                <i class="fas fa-heart-broken text-xs"></i>
                                ${casualtyCount > 0 ? `<span class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">${casualtyCount}</span>` : ''}
                            </button>
                            ${canUndoCasualty ? `
                                <button class="undo-casualty-btn p-1 bg-slate-600 hover:bg-slate-500 text-white rounded transition ml-1" title="Undo last casualty" data-fighter-id="${fighter.id}">
                                    <i class="fas fa-undo text-xs"></i>
                                </button>
                            ` : (isSickCasualty ? `
                                <span class="ml-1 text-xs text-slate-400" title="Sickness casualty - cannot be undone"><i class="fas fa-procedures"></i></span>
                            ` : '')}
                        </div>
                        ${hasRabbitsFoot ? `
                            <div class="text-center">
                                <div class="text-xs text-slate-400">Rabbit's Foot</div>
                                <button class="rabbit-foot-btn p-1 ${rabbitFootUsed ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded transition relative" 
                                        title="${rabbitFootUsed ? "Click to cancel Rabbit's Foot usage" : "Use Rabbit's Foot to reroll one dice"}" 
                                        data-fighter-id="${fighter.id}" 
                                        data-fighter-name="${fighter.name.replace(/'/g, '\\\'').replace(/"/g, '\\"')}">
                                    <i class="fas fa-paw text-xs"></i>
                                    ${rabbitFootUsed ? '<span class="absolute -top-1 -right-1 bg-gray-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center"><i class="fas fa-check text-xs"></i></span>' : ''}
                                </button>
                            </div>
                        ` : ''}
                        ${canTrackKills ? `
                            <div class="text-right">
                                <div class="text-xs text-slate-400">Kills</div>
                                <div class="flex items-center space-x-1">
                                    <button class="track-kill-btn p-1 ${(hasCasualties && !isHenchman) || isHenchmanDead ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white rounded transition"
                                            data-fighter-id="${fighter.id}" 
                                            ${(hasCasualties && !isHenchman) || isHenchmanDead ? 'disabled title="Cannot track kills - unit has taken casualties"' : 'title="Track Kill"'}>
                                        <i class="fas fa-plus text-xs"></i>
                                    </button>
                                    <button class="remove-kill-btn p-1 ${currentKills === 0 || (hasCasualties && !isHenchman) || isHenchmanDead ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'} text-white rounded transition"
                                            data-fighter-id="${fighter.id}" 
                                            ${currentKills === 0 || (hasCasualties && !isHenchman) || isHenchmanDead ? 'disabled title="No kills to remove"' : 'title="Remove Kill"'}>
                                        <i class="fas fa-minus text-xs"></i>
                                    </button>
                                    <span class="font-bold text-mordheim-gold">${currentKills}</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div id="fighter-content-${fighter.id}" class="${contentVisibility}">
                    <div class="mb-2">
                        ${statsHTML}
                    </div>
                    
                    <div class="text-xs">
                        <div class="flex flex-wrap gap-1 mb-1">
                            ${equipmentHTML || '<span class="text-slate-500">No essential equipment</span>'}
                        </div>
                        <div class="text-slate-400 mb-1">
                            Skills: ${skillsHtml}
                        </div>
                        ${spellsHtml ? `<div class="text-slate-400 mb-1">Magic: ${spellsHtml}</div>` : ''}
                        <div class="text-slate-400 mb-1">
                            Special Rules: ${specialRulesHtml}
                        </div>
                        <div class="text-slate-400">
                            Injuries: ${injuriesHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    fightersGrid.innerHTML = fightersHTML;
};

/** Shows details for a skill in battle view */
export const showBattleSkillDetails = (skillName, fighterId) => {
    // Look up fighter to get correct skill version (e.g. Hired Sword vs Warband Specific)
    const fighter = fighterId && currentWarband ? currentWarband.members.find(f => f.id === fighterId) : null;
    const skillData = findSkillForWarband(skillName, null, fighter);
    if (!skillData) {
        // Check if it's a spell
        for (const group in MAGIC) {
            const spell = MAGIC[group].find(s => s.name === skillName);
            if (spell) {
                showBattleSpellDetails(skillName);
                return;
            }
        }
        return;
    }
    
    document.getElementById('rule-details-title').textContent = skillData.name;
    document.getElementById('rule-details-content').innerHTML = skillData.rules;
    displayModal('rule-details-modal');
};

/** Shows details for a spell in battle view */
export const showBattleSpellDetails = (spellName) => {
    let spellData = null;
    
    // Search through all magic groups to find the spell
    for (const group in MAGIC) {
        const spell = MAGIC[group].find(s => s.name === spellName);
        if (spell) {
            spellData = spell;
            break;
        }
    }
    
    if (!spellData) return;
    
    document.getElementById('rule-details-title').textContent = spellData.name;
    
    // Format spell details with difficulty
    const difficultyText = spellData.difficulty === "Auto" ? "Automatic" : `Difficulty ${spellData.difficulty}`;
    document.getElementById('rule-details-content').innerHTML = `
        <div class="mb-2">
            <strong>Difficulty:</strong> ${difficultyText}
        </div>
        <div>
            <strong>Description:</strong> ${spellData.description}
        </div>
    `;
    
    displayModal('rule-details-modal');
};

/** Shows details for equipment in battle view */
export const showBattleEquipmentDetails = (equipmentName) => {
    const equipData = MASTER_EQUIPMENT_LIST.find(e => e.name === equipmentName);
    if (!equipData) return;
    
    document.getElementById('rule-details-title').textContent = equipData.name;
    
    let detailsHTML = `
        <div class="mb-2">
            <strong>Category:</strong> ${equipData.category || 'Unknown'}
        </div>
        <div class="mb-2">
            <strong>Cost:</strong> ${formatEquipmentCostDisplay(equipData)} GC
        </div>
    `;
    
    if (equipData.rules) {
        detailsHTML += `
            <div class="mb-2">
                <strong>Rules:</strong><br>${formatEquipmentRules(equipData.rules)}
            </div>
        `;
    }
    
    if (equipData.characteristicModifiers && Object.keys(equipData.characteristicModifiers).length > 0) {
        detailsHTML += `
            <div class="mb-2">
                <strong>Stat Modifiers:</strong>
                <ul class="ml-4 mt-1">
                    ${Object.entries(equipData.characteristicModifiers).map(([stat, mod]) => 
                        `<li>${stat}: ${mod > 0 ? '+' : ''}${mod}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }
    
    document.getElementById('rule-details-content').innerHTML = detailsHTML;
    displayModal('rule-details-modal');
};

/** Shows details for abilities in phase abilities list */
export const showBattleAbilityDetails = (type, name, fighterId) => {
    if (type === 'skill') {
        showBattleSkillDetails(name, fighterId);
    } else if (type === 'rule') {
        // For special rules, we can use the existing equipment details modal
        const ruleData = SPECIAL_RULES_DETAILS.find(r => r.name === name);
        if (ruleData) {
            document.getElementById('rule-details-title').textContent = ruleData.name;
            document.getElementById('rule-details-content').innerHTML = ruleData.rules || ruleData.description;
            displayModal('rule-details-modal');
        }
    } else if (type === 'injury') {
        const injuryData = MASTER_INJURY_LIST.find(i => i.name === name);
        if (injuryData) {
            document.getElementById('rule-details-title').textContent = injuryData.name;
            document.getElementById('rule-details-content').innerHTML = injuryData.description;
            displayModal('rule-details-modal');
        }
    } else if (type === 'equipment') {
        // For equipment rules, use the same logic as turn order tracker
        const equipmentSpan = document.querySelector(`[data-equipment-name="${name}"]`);
        if (equipmentSpan) {
            const equipmentName = equipmentSpan.dataset.equipmentName;
            const ruleName = equipmentSpan.dataset.equipmentRuleName;
            const equipmentData = MASTER_EQUIPMENT_LIST.find(e => e.name === equipmentName);

            if (equipmentData) {
                let title = equipmentData.name;
                let content = equipmentData.turnOrderRules || equipmentData.rules;
                if (ruleName && Array.isArray(content) && content.length > 0 && typeof content[0] === 'object') {
                    // Filter to show only the specific rule
                    const specificRule = content.find(ruleObj => ruleObj.name === ruleName);
                    if (specificRule) {
                        title += ` - ${ruleName}`;
                        document.getElementById('rule-details-title').textContent = title;
                        document.getElementById('rule-details-content').innerHTML = `<p><strong>${specificRule.name}:</strong> ${specificRule.rule}</p>`;
                        displayModal('rule-details-modal');
                        return;
                    }
                }
                
                // Fallback to showing full equipment details
                showBattleEquipmentDetails(equipmentData.name);
            }
        }
    }
};

/** Toggles the visibility of ability details */
export const toggleAbilityDetails = (abilityId) => {
    const detailsDiv = document.getElementById(abilityId);
    const icon = document.getElementById(`${abilityId}-icon`);
    
    if (detailsDiv && icon) {
        if (detailsDiv.classList.contains('hidden')) {
            detailsDiv.classList.remove('hidden');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            detailsDiv.classList.add('hidden');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    }
};

/** Tracks a kill for a hero */
export const trackKill = (fighterId) => {
    if (!currentWarband || !currentWarband.members) return;
    
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;
    
    // Only allow kill tracking for heroes
    if (fighter.type !== 'Hero') {
        return;
    }
    
    // Check if this fighter has taken casualties
    const casualtyCount = battleCasualties.get(fighterId) || 0;
    if (casualtyCount > 0) {
        console.log('Cannot track kills - unit has taken casualties');
        return;
    }
    
    // Increment kills
    fighter.kills = (fighter.kills || 0) + 1;
    
    // Update display
    renderBattleFighters(currentWarband);
    
    // Save to storage
    saveWarband();
};

/** Removes a kill from a hero */
export const removeKill = (fighterId) => {
    if (!currentWarband || !currentWarband.members) return;
    
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;
    
    // Only allow kill removal for heroes
    if (fighter.type !== 'Hero') {
        return;
    }
    
    // Check if this fighter has taken casualties
    const casualtyCount = battleCasualties.get(fighterId) || 0;
    if (casualtyCount > 0) {
        console.log('Cannot remove kills - unit has taken casualties');
        return;
    }
    
    // Check if there are any kills to remove
    if (!fighter.kills || fighter.kills <= 0) {
        console.log('No kills to remove');
        return;
    }
    
    // Decrement kills
    fighter.kills = fighter.kills - 1;
    
    // Update display
    renderBattleFighters(currentWarband);
    
    // Save to storage
    saveWarband();
};

/** Sets the current phase and updates the display */
export const setCurrentPhase = (phaseId) => {
    currentPhase = phaseId;
    renderCurrentPhase();
};

/** Advances to the next phase */
export const nextPhase = () => {
    if (currentPhase < PHASES.length) {
        currentPhase++;
        renderCurrentPhase();
    }
};

/** Goes to the previous phase */
export const prevPhase = () => {
    if (currentPhase > 1) {
        currentPhase--;
        renderCurrentPhase();
    }
};

// Store temporary casualty state
let battleCasualties = new Map(); // fighterId -> casualty count
window.battleCasualties = battleCasualties; // Make accessible for end_battle.js

// Store temporary Rabbit's Foot usage state
let rabbitFootUsage = new Map(); // fighterId -> boolean (used or not)

// Store sickness casualties tracking (shared between battle view and end battle)
let sicknessCasualties = new Set(); // fighterId -> boolean (true if casualty due to sickness)
window.sicknessCasualties = sicknessCasualties; // Make accessible for end_battle.js

/** Shows the casualty modal for a fighter */
export const showCasualtyModal = (fighterId, fighterName) => {
    // Remove any existing modal
    const existingModal = document.getElementById('casualty-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal directly in body
    const modal = document.createElement('div');
    modal.id = 'casualty-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: rgb(51, 65, 80);
        border: 1px solid rgb(71, 85, 105);
        padding: 24px;
        border-radius: 12px;
        width: 400px;
        max-width: 90vw;
        text-align: center;
        color: white;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid rgb(71, 85, 105); padding-bottom: 8px;">
            <h3 style="color: rgb(251, 191, 36); margin: 0; font-size: 20px; font-weight: bold;">Casualty Taken</h3>
            <button id="close-casualty-modal-btn" style="background: none; border: none; color: rgb(203, 213, 225); cursor: pointer; font-size: 18px; padding: 4px;">×</button>
        </div>
        <div style="margin-bottom: 24px;">
            <p style="color: rgb(203, 213, 225); margin: 0 0 8px 0; font-size: 18px;">Did this unit take a casualty?</p>
            <p id="casualty-unit-name" style="color: rgb(251, 191, 36); margin: 0; font-weight: bold;">${fighterName}</p>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button id="casualty-no-btn" style="background: rgb(71, 85, 105); color: white; padding: 8px 16px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">No</button>
            <button id="casualty-yes-btn" style="background: rgb(220, 38, 38); color: white; padding: 8px 16px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;">Yes</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Store fighter ID for use in button handlers
    modal.dataset.fighterId = fighterId;
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalContent) {
            modal.remove();
        }
    });
};

/** Applies casualty to a fighter */
export const applyCasualty = (fighterId) => {
    if (!currentWarband || !currentWarband.members) return;
    
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;
    
    // Get current casualty count for this fighter
    const currentCasualties = battleCasualties.get(fighterId) || 0;
    const newCasualtyCount = currentCasualties + 1;
    battleCasualties.set(fighterId, newCasualtyCount);
    
    if (fighter.type === 'Henchman') {
        // For henchmen, temporarily reduce group size
        const originalGroupSize = fighter.group_size || 1;
        const currentEffectiveSize = Math.max(0, originalGroupSize - newCasualtyCount);
        
        // Update display to show reduced group size
        updateFighterCardDisplay(fighterId, currentEffectiveSize, newCasualtyCount > 0);
        
        // If group size reaches 0, collapse the card
        if (currentEffectiveSize === 0) {
            collapseFighterCard(fighterId);
        }
    } else {
        // For heroes, hired swords, dramatis personae, and vehicles, collapse the card
        collapseFighterCard(fighterId);
        
        // Disable the kill button for heroes and hired swords
        if (fighter.type === 'Hero' || fighter.type === 'Hired Sword' || fighter.type === 'Dramatis Personae') {
            disableKillButton(fighterId);
        }
    }
    
    // Update the casualty button to show casualty count
    updateCasualtyButton(fighterId, newCasualtyCount);
};

/** Removes one casualty from a fighter (undo). Sickness casualties cannot be undone. */
export const undoCasualty = (fighterId) => {
    if (!currentWarband || !currentWarband.members) return;
    
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;
    
    const currentCasualties = battleCasualties.get(fighterId) || 0;
    const minCasualties = sicknessCasualties.has(fighterId) ? 1 : 0;
    
    if (currentCasualties <= minCasualties) {
        if (minCasualties > 0) {
            showMessage(`${fighter.name} is out due to Sickness - this cannot be undone.`, 'info');
        }
        return;
    }
    
    const newCasualtyCount = currentCasualties - 1;
    if (newCasualtyCount === 0) {
        battleCasualties.delete(fighterId);
    } else {
        battleCasualties.set(fighterId, newCasualtyCount);
    }
    
    showMessage(`Casualty removed from ${fighter.name}.`, 'info');
    
    // Re-render restores card state (expanded, kill buttons, group size)
    renderBattleFighters(currentWarband);
};

/** Disables the kill button for a fighter */
const disableKillButton = (fighterId) => {
    const cardElement = document.getElementById(`fighter-card-${fighterId}`);
    if (!cardElement) return;
    
    // Find the kill button within the card
    const killButton = cardElement.querySelector('button[onclick*="trackKill"]');
    if (killButton) {
        killButton.disabled = true;
        killButton.classList.add('opacity-50', 'cursor-not-allowed', 'bg-gray-600');
        killButton.classList.remove('bg-red-600', 'hover:bg-red-700');
        killButton.title = 'Cannot track kills - unit has taken casualties';
    }
};

/** Collapses a fighter card to show only the name */
const collapseFighterCard = (fighterId) => {
    const contentElement = document.getElementById(`fighter-content-${fighterId}`);
    const cardElement = document.getElementById(`fighter-card-${fighterId}`);
    
    if (contentElement) {
        contentElement.classList.add('hidden');
    }
    
    if (cardElement) {
        cardElement.classList.add('opacity-60', 'border-gray-500');
        cardElement.classList.remove('border-l-4');
        // Add visual indicator for casualty
        const indicator = document.createElement('div');
        indicator.className = 'absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold';
        indicator.innerHTML = '';
        indicator.id = `casualty-indicator-${fighterId}`;
        cardElement.style.position = 'relative';
        cardElement.appendChild(indicator);
    }
};

/** Toggles a fighter card between collapsed and expanded state */
export const toggleFighterCard = (fighterId) => {
    const contentElement = document.getElementById(`fighter-content-${fighterId}`);
    const cardElement = document.getElementById(`fighter-card-${fighterId}`);
    
    if (contentElement && cardElement) {
        const isCollapsed = contentElement.classList.contains('hidden');
        
        if (isCollapsed) {
            contentElement.classList.remove('hidden');
            cardElement.classList.remove('opacity-60');
        } else {
            contentElement.classList.add('hidden');
            cardElement.classList.add('opacity-60');
        }
    }
};

/** Updates the fighter card display with current group size and casualty state */
const updateFighterCardDisplay = (fighterId, effectiveGroupSize, hasCasualties) => {
    const fighter = currentWarband.members.find(f => f.id === fighterId);
    if (!fighter) return;
    
    // Re-render the fighters grid to update the display
    renderBattleFighters(currentWarband);
};

/** Updates the casualty button to show casualty count */
const updateCasualtyButton = (fighterId, casualtyCount) => {
    // This will be handled by re-rendering the fighters grid
    renderBattleFighters(currentWarband);
};

/** Handles Rabbit's Foot usage toggle for a fighter */
export const useRabbitsFoot = (fighterId, fighterName) => {
    // Toggle the usage state
    const currentState = rabbitFootUsage.get(fighterId) || false;
    const newState = !currentState;
    
    // Update state
    rabbitFootUsage.set(fighterId, newState);
    
    // Show appropriate message
    if (newState) {
        showMessage(`${fighterName} used Rabbit's Foot to reroll one dice!`, 'success');
    } else {
        showMessage(`${fighterName}'s Rabbit's Foot usage has been cancelled.`, 'info');
    }
    
    // Update display
    renderBattleFighters(currentWarband);
};

/** Resets all battle casualties (call when leaving battle view) */
export const resetBattleCasualties = () => {
    battleCasualties.clear();
    rabbitFootUsage.clear();
    sicknessCasualties.clear();
};

/** Checks if a fighter has the Sickness injury */
const hasSicknessInjury = (fighter) => {
    if (!fighter.injuries || !Array.isArray(fighter.injuries)) return false;
    return fighter.injuries.includes('Sickness');
};

/** Removes Sickness injury from a fighter */
export const removeSicknessInjury = (fighter) => {
    if (!fighter.injuries || !Array.isArray(fighter.injuries)) return;
    
    const sicknessIndex = fighter.injuries.indexOf('Sickness');
    if (sicknessIndex > -1) {
        fighter.injuries.splice(sicknessIndex, 1);
        console.log(`Removed Sickness injury from ${fighter.name}`);
    }
};

/** Checks if a fighter was marked as casualty due to sickness */
export const isSicknessCasualty = (fighterId) => {
    return sicknessCasualties.has(fighterId);
};

/** Marks a fighter as casualty due to sickness */
export const markAsSicknessCasualty = (fighterId) => {
    sicknessCasualties.add(fighterId);
    console.log(`Marked fighter ${fighterId} as sickness casualty`);
};

/** Shows modal to check sickness status at battle start */
const showSicknessCheckModal = (sickFighters, callback) => {
    // Remove any existing modal
    const existingModal = document.getElementById('sickness-check-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal directly in body
    const modal = document.createElement('div');
    modal.id = 'sickness-check-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgb(30, 41, 59);
        padding: 24px;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Generate fighter list
    const fightersHTML = sickFighters.map(fighter => `
        <div class="bg-slate-800 p-3 rounded-lg mb-3 border border-slate-600">
            <div class="flex justify-between items-center mb-2">
                <h5 class="font-semibold text-mordheim-gold">${fighter.name}</h5>
                <span class="text-sm text-slate-400">${fighter.type}</span>
            </div>
            <p class="text-slate-300 mb-3">Is this fighter still sick?</p>
            <div class="flex space-x-3">
                <button class="sickness-no-btn px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition" 
                        data-fighter-id="${fighter.id}" data-fighter-name="${fighter.name}">
                    No - Recovered
                </button>
                <button class="sickness-yes-btn px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition" 
                        data-fighter-id="${fighter.id}" data-fighter-name="${fighter.name}">
                    Yes - Still Sick
                </button>
            </div>
            <div class="selection-status mt-2 text-sm text-slate-400"></div>
        </div>
    `).join('');
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid rgb(71, 85, 105); padding-bottom: 8px;">
            <h3 style="color: rgb(251, 191, 36); margin: 0; font-size: 20px; font-weight: bold;">Sickness Check</h3>
            <button id="close-sickness-check-modal-btn" style="background: none; border: none; color: rgb(203, 213, 225); cursor: pointer; font-size: 18px; padding: 4px;">×</button>
        </div>
        <div style="margin-bottom: 24px;">
            <p style="color: rgb(203, 213, 225); margin: 0 0 12px 0;">The following fighters have the Sickness injury. Please check their status:</p>
        </div>
        <div class="sickness-fighters-list">
            ${fightersHTML}
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;">
            <button id="finish-sickness-check-btn" class="px-4 py-2 bg-mordheim-gold text-slate-900 font-bold rounded-lg hover:bg-yellow-600 transition" disabled>
                Continue to Battle
            </button>
        </div>
    `;
    
    // Track fighter selections
    const fighterSelections = new Map(); // fighterId -> 'recovered' | 'still-sick'
    
    // Add event listeners
    modalContent.querySelectorAll('.sickness-no-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fighterId = e.target.dataset.fighterId;
            const fighterName = e.target.dataset.fighterName;
            const fighterDiv = e.target.closest('.bg-slate-800');
            const yesBtn = fighterDiv.querySelector('.sickness-yes-btn');
            const statusDiv = fighterDiv.querySelector('.selection-status');
            
            // Update selection
            fighterSelections.set(fighterId, 'recovered');
            
            // Update button states
            e.target.classList.remove('bg-green-600', 'hover:bg-green-700');
            e.target.classList.add('bg-green-700', 'ring-2', 'ring-green-400');
            yesBtn.classList.remove('bg-orange-700', 'ring-2', 'ring-orange-400');
            yesBtn.classList.add('bg-orange-600', 'hover:bg-orange-700');
            
            // Update status display
            statusDiv.textContent = 'Selected: Recovered';
            statusDiv.className = 'selection-status mt-2 text-sm text-green-400 font-semibold';
            
            console.log(`${fighterName} marked as recovered`);
            checkAllProcessed();
        });
    });
    
    modalContent.querySelectorAll('.sickness-yes-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fighterId = e.target.dataset.fighterId;
            const fighterName = e.target.dataset.fighterName;
            const fighterDiv = e.target.closest('.bg-slate-800');
            const noBtn = fighterDiv.querySelector('.sickness-no-btn');
            const statusDiv = fighterDiv.querySelector('.selection-status');
            
            // Update selection
            fighterSelections.set(fighterId, 'still-sick');
            
            // Update button states
            e.target.classList.remove('bg-orange-600', 'hover:bg-orange-700');
            e.target.classList.add('bg-orange-700', 'ring-2', 'ring-orange-400');
            noBtn.classList.remove('bg-green-700', 'ring-2', 'ring-green-400');
            noBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            
            // Update status display
            statusDiv.textContent = 'Selected: Still Sick';
            statusDiv.className = 'selection-status mt-2 text-sm text-orange-400 font-semibold';
            
            console.log(`${fighterName} marked as still sick`);
            checkAllProcessed();
        });
    });
    
    const checkAllProcessed = () => {
        if (fighterSelections.size === sickFighters.length) {
            document.getElementById('finish-sickness-check-btn').disabled = false;
        }
    };
    
    // Close button
    document.getElementById('close-sickness-check-modal-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    // Finish button
    document.getElementById('finish-sickness-check-btn').addEventListener('click', () => {
        // Apply all selections
        fighterSelections.forEach((selection, fighterId) => {
            const fighter = currentWarband.members.find(f => f.id === fighterId);
            if (!fighter) return;
            
            if (selection === 'recovered') {
                // Remove sickness injury
                removeSicknessInjury(fighter);
            } else if (selection === 'still-sick') {
                // Mark as sickness casualty
                markAsSicknessCasualty(fighterId);
                
                // Add to battle casualties
                const currentCasualties = battleCasualties.get(fighterId) || 0;
                battleCasualties.set(fighterId, currentCasualties + 1);
            }
        });
        
        modal.remove();
        if (callback) callback();
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
};

/** Checks for sickness injuries at battle start */
const checkSicknessAtBattleStart = (callback) => {
    if (!currentWarband || !currentWarband.members) {
        if (callback) callback();
        return;
    }
    
    // Find all fighters with Sickness injury
    const sickFighters = currentWarband.members.filter(hasSicknessInjury);
    
    if (sickFighters.length === 0) {
        // No one is sick, continue to battle
        if (callback) callback();
        return;
    }
    
    console.log(`Found ${sickFighters.length} fighters with Sickness injury:`, sickFighters.map(f => f.name));
    
    // Show sickness check modal
    showSicknessCheckModal(sickFighters, callback);
};

// End battle functions moved to End Battle/end_battle.js

/** Gets hero exploration statistics */
export const getHeroExplorationStats = () => {
    if (!currentWarband || !currentWarband.members) {
        return { totalHeroes: 0, casualtyHeroes: 0, availableHeroes: 0 };
    }
    
    const heroes = currentWarband.members.filter(f => f.type === 'Hero');
    const casualtyHeroes = heroes.filter(h => (battleCasualties.get(h.id) || 0) > 0);
    const availableHeroes = heroes.filter(h => (battleCasualties.get(h.id) || 0) === 0);
    
    return {
        totalHeroes: heroes.length,
        casualtyHeroes: casualtyHeroes.length,
        availableHeroes: availableHeroes.length
    };
};

/** Gets exploration reroll statistics from available heroes */
export const getExplorationRerollStats = () => {
    if (!currentWarband || !currentWarband.members) {
        return { 
            rerolls: 0, 
            diceModifications: 0, 
            additionalDice: 0, 
            victoryBonus: 0,
            rerollSources: [],
            modificationSources: [],
            additionalDiceSources: []
        };
    }
    
    // Count available fighters (not casualties) - includes Heroes, Henchmen, Hired Swords, and Dramatis Personae
    const availableFighters = currentWarband.members.filter(f =>
        (f.type === 'Hero' || f.type === 'Henchman' || f.type === 'Hired Sword' || f.type === 'Dramatis Personae') && (battleCasualties.get(f.id) || 0) === 0
    );
    
    const REROLL_SKILLS = ['Wyrdstone Hunter', 'Tomb Raider', 'Organized Search Party'];
    const MODIFICATION_SKILLS = ['Resource Hunter', 'Seeker'];
    const ADDITIONAL_DICE_SKILLS = ['Pathfinder'];
    const ADDITIONAL_DICE_SPECIAL_RULES = ['Explorer']; // Dwarf Pathfinder special rule
    const REROLL_SPECIAL_RULES = ['Trailblazers']; // Poacher special rule
    const WARBAND_ADDITIONAL_DICE_SPECIAL_RULES = ['Home Ground']; // Warband-level special rules
    
    let rerolls = 0;
    let diceModifications = 0;
    let additionalDice = 0;
    let victoryBonus = 0;
    
    const rerollSources = [];
    const modificationSources = [];
    const additionalDiceSources = [];
    
    // Check for victory bonus
    if (window.battleResult === 'victory') {
        victoryBonus = 1;
    }
    
    // Check warband-level special rules
    let warbandSpecialRules = currentWarband.special_rules;
    // Fallback to warband definition if current warband doesn't have special_rules (for existing warbands)
    if (!warbandSpecialRules) {
        const warbandData = getWarbandData(currentWarband.type);
        if (warbandData && warbandData.special_rules) {
            warbandSpecialRules = warbandData.special_rules;
        }
    }

    if (warbandSpecialRules) {
        const warbandRulesArray = Array.isArray(warbandSpecialRules)
            ? warbandSpecialRules
            : warbandSpecialRules.split(';').map(r => r.trim());
        warbandRulesArray.forEach(rule => {
            if (WARBAND_ADDITIONAL_DICE_SPECIAL_RULES.includes(rule)) {
                additionalDice++;
                additionalDiceSources.push({ name: currentWarband.name, type: 'Warband Rule', source: rule });
            }
        });
    }
    
    availableFighters.forEach(fighter => {
        // Check skills
        if (fighter.skills) {
            fighter.skills.forEach(skill => {
                if (REROLL_SKILLS.includes(skill)) {
                    rerolls++;
                    rerollSources.push({ name: fighter.name, type: 'Skill', source: skill });
                }
                if (MODIFICATION_SKILLS.includes(skill)) {
                    diceModifications++;
                    modificationSources.push({ name: fighter.name, type: 'Skill', source: skill });
                }
                if (ADDITIONAL_DICE_SKILLS.includes(skill)) {
                    additionalDice++;
                    additionalDiceSources.push({ name: fighter.name, type: 'Skill', source: skill });
                }
            });
        }
        
        // Check special rules
        if (fighter.special_rules) {
            const rulesArray = Array.isArray(fighter.special_rules)
                ? fighter.special_rules
                : fighter.special_rules.split(';').map(r => r.trim());
            rulesArray.forEach(rule => {
                if (ADDITIONAL_DICE_SPECIAL_RULES.includes(rule)) {
                    const groupSize = fighter.type === 'Henchman' ? (fighter.group_size || 1) : 1;
                    additionalDice += groupSize;
                    additionalDiceSources.push({ name: fighter.name, type: 'Special Rule', source: rule });
                }
                if (REROLL_SPECIAL_RULES.includes(rule)) {
                    const groupSize = fighter.type === 'Henchman' ? (fighter.group_size || 1) : 1;
                    rerolls += groupSize;
                    rerollSources.push({ name: fighter.name, type: 'Special Rule', source: rule });
                }
            });
        }
        
        // Check equipment for lucky rabbit's foot
        if (fighter.equipment) {
            fighter.equipment.forEach(equip => {
                if (equip.name === "Rabbit's Foot") {
                    // Only allow reroll if Rabbit's Foot was NOT used in battle
                    const rabbitFootUsedInBattle = rabbitFootUsage.get(fighter.id) || false;
                    if (!rabbitFootUsedInBattle) {
                        rerolls++;
                        rerollSources.push({ name: fighter.name, type: 'Equipment', source: equip.name });
                    }
                }
                if (equip.name === "Warpstone Amulet") {
                    rerolls++;
                    rerollSources.push({ name: fighter.name, type: 'Equipment', source: equip.name });
                }
            });
        }
    });
    
    return {
        rerolls,
        diceModifications,
        additionalDice,
        victoryBonus,
        rerollSources,
        modificationSources,
        additionalDiceSources
    };
};

/** Toggle exploration section details */
window.toggleExplorationSection = (sectionId) => {
    const details = document.getElementById(sectionId);
    const chevron = document.getElementById(sectionId.replace('-details', '-chevron'));
    
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        chevron.classList.add('rotate-180');
    } else {
        details.classList.add('hidden');
        chevron.classList.remove('rotate-180');
    }
};

// showPostBattleChoiceModal moved to End Battle/end_battle.js

/** Shows the exploration modal with hero statistics */
export const showExplorationModal = () => {
    const stats = getHeroExplorationStats();
    const rerollStats = getExplorationRerollStats();
    
    document.getElementById('total-heroes').textContent = stats.totalHeroes;
    document.getElementById('casualty-heroes').textContent = stats.casualtyHeroes;
    document.getElementById('available-heroes').textContent = stats.availableHeroes;
    
    // Update reroll statistics
    document.getElementById('rerolls-available').textContent = rerollStats.rerolls;
    document.getElementById('dice-modifications').textContent = rerollStats.diceModifications;
    document.getElementById('additional-dice').textContent = rerollStats.additionalDice;
    document.getElementById('victory-bonus').textContent = rerollStats.victoryBonus;
    
    // Update fully painted bonus
    const fullyPaintedBonus = isFullyPaintedActive ? 1 : 0;
    document.getElementById('fully-painted-bonus').textContent = fullyPaintedBonus;
    
    // Populate warrior source details
    populateWarriorSourceDetails('additional-dice-sources', rerollStats.additionalDiceSources);
    populateWarriorSourceDetails('rerolls-available-sources', rerollStats.rerollSources);
    populateWarriorSourceDetails('dice-modifications-sources', rerollStats.modificationSources);
    
    displayModal('exploration-modal');
};

/** Populates warrior source details in expandable sections */
const populateWarriorSourceDetails = (elementId, sources) => {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    if (sources.length === 0) {
        container.innerHTML = '<p class="text-slate-500 italic">No bonuses from warriors</p>';
        return;
    }
    
    sources.forEach(source => {
        const sourceElement = document.createElement('div');
        sourceElement.className = 'flex justify-between items-center p-2 bg-slate-700 rounded border border-slate-600';
        sourceElement.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-user text-slate-400 text-sm"></i>
                <span class="text-slate-200 font-medium">${source.name}</span>
            </div>
            <div class="text-right">
                <span class="text-slate-300 text-sm">${source.source}</span>
                <span class="text-slate-500 text-xs ml-2">(${source.type})</span>
            </div>
        `;
        container.appendChild(sourceElement);
    });
};

/** Shows the treasure exploration modal */
export const showTreasureExplorationModal = () => {
    // Reset form
    document.getElementById('total-dice-input').value = '';
    document.querySelectorAll('.dice-input').forEach(input => input.value = '');
    document.getElementById('calculated-total').textContent = '0';
    document.getElementById('treasure-result').classList.add('hidden');
    document.getElementById('apply-treasure-btn').classList.add('hidden');

    // Reset exploration results
    document.getElementById('exploration-result').classList.add('hidden');
    document.getElementById('exploration-results-list').innerHTML = '';

    // Reset advanced section
    document.getElementById('total-dice-count-input').value = '';
    document.getElementById('advanced-input-section').classList.add('hidden');
    document.getElementById('advanced-dice-inputs-container').classList.add('hidden');
    document.getElementById('advanced-dice-inputs').innerHTML = '';
    document.getElementById('advanced-calculated-total').textContent = '0';
    document.getElementById('advanced-locked-toggle').checked = false;
    document.getElementById('calculation-mode-label').textContent = 'all dice';
    document.getElementById('dice-modifiers-section-details').classList.remove('hidden');
    document.getElementById('dice-modifiers-section-chevron').classList.remove('rotate-180');
    document.getElementById('advanced-rerolls-available-details').classList.add('hidden');
    document.getElementById('advanced-dice-modifications-details').classList.add('hidden');
    document.getElementById('advanced-rerolls-available-chevron').classList.remove('rotate-180');
    document.getElementById('advanced-dice-modifications-chevron').classList.remove('rotate-180');

    // Calculate and display dice count for advanced mode
    const stats = getHeroExplorationStats();
    const rerollStats = getExplorationRerollStats();
    const fullyPaintedBonus = isFullyPaintedActive ? 1 : 0;
    const totalDiceCount = stats.availableHeroes + rerollStats.additionalDice + rerollStats.victoryBonus + fullyPaintedBonus;
    document.getElementById('calculated-dice-count').textContent = totalDiceCount;

    // Populate advanced dice modifiers
    document.getElementById('advanced-rerolls-available').textContent = rerollStats.rerolls;
    document.getElementById('advanced-dice-modifications').textContent = rerollStats.diceModifications;
    populateWarriorSourceDetails('advanced-rerolls-available-sources', rerollStats.rerollSources);
    populateWarriorSourceDetails('advanced-dice-modifications-sources', rerollStats.modificationSources);

    // Reset to total input mode
    document.querySelector('input[name="dice-input-mode"][value="total"]').checked = true;
    document.getElementById('total-input-section').classList.remove('hidden');
    document.getElementById('individual-input-section').classList.add('hidden');

    displayModal('treasure-exploration-modal');
};

/** Checks if the warband has the Incomparable Miners special rule */
const hasIncomparableMiners = () => {
    if (!currentWarband) return false;
    
    let warbandSpecialRules = currentWarband.special_rules;
    // Fallback to warband definition if current warband doesn't have special_rules
    if (!warbandSpecialRules) {
        const warbandData = getWarbandData(currentWarband.type);
        if (warbandData && warbandData.special_rules) {
            warbandSpecialRules = warbandData.special_rules;
        }
    }
    
    if (!warbandSpecialRules) return false;
    
    // Handle both string and array formats
    const rulesArray = Array.isArray(warbandSpecialRules) 
        ? warbandSpecialRules 
        : warbandSpecialRules.split(';').map(r => r.trim());
    
    return rulesArray.includes('Incomparable Miners');
};

/** Calculates treasure based on dice total */
const calculateTreasure = (diceTotal) => {
    if (diceTotal <= 5) return 1;
    if (diceTotal <= 11) return 2;
    if (diceTotal <= 17) return 3;
    if (diceTotal <= 24) return 4;
    if (diceTotal <= 30) return 5;
    if (diceTotal <= 35) return 6;
    return 7;
};

/** Handles treasure calculation */
export const handleTreasureCalculation = () => {
    const mode = document.querySelector('input[name="dice-input-mode"]:checked').value;
    let total = 0;

    if (mode === 'total') {
        const totalInput = document.getElementById('total-dice-input');
        total = parseInt(totalInput.value) || 0;
    } else if (mode === 'individual') {
        const diceInputs = document.querySelectorAll('.dice-input');
        let sum = 0;
        diceInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            sum += value;
        });
        total = sum;
    } else if (mode === 'advanced') {
        const diceInputs = document.querySelectorAll('.advanced-dice-input');
        let sum = 0;
        let filledCount = 0;
        diceInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            if (value > 0) {
                sum += value;
                filledCount++;
            }
        });
        
        if (filledCount === 0) {
            showMessage('Please enter dice values.', 'error');
            return;
        }
        
        total = sum;
    }

    if (total <= 0) {
        showMessage('Please enter valid dice values.', 'error');
        return;
    }

    const shards = calculateTreasure(total);
    
    // Check for Incomparable Miners bonus
    const hasBonus = hasIncomparableMiners();
    const bonus = hasBonus ? 1 : 0;
    const totalShards = shards + bonus;

    // Show result
    document.getElementById('treasure-shards').textContent = totalShards;
    document.getElementById('treasure-result').classList.remove('hidden');
    document.getElementById('apply-treasure-btn').classList.remove('hidden');
    
    // Show/hide Incomparable Miners bonus message
    const bonusElement = document.getElementById('incomparable-miners-bonus');
    if (hasBonus) {
        bonusElement.classList.remove('hidden');
    } else {
        bonusElement.classList.add('hidden');
    }

    // Store result for application
    window.currentTreasureResult = { total, shards: totalShards, baseShards: shards, bonus };
};

/** Applies treasure to warband */
export const applyTreasureToWarband = async () => {
    if (!window.currentTreasureResult || !currentWarband) return;
    
    const { shards, baseShards, bonus } = window.currentTreasureResult;
    
    // Add shards to warband's treasure count (this is what the UI displays)
    if (!currentWarband.treasure) {
        currentWarband.treasure = 0;
    }
    currentWarband.treasure += shards;
    
    // Record the treasure found transaction in the ledger
    const transaction = createTransaction(
        TRANSACTION_TYPES.INCOME,
        TRANSACTION_CATEGORIES.TREASURE_FOUND,
        shards,
        `Found ${shards} Wyrdstone Shard${shards > 1 ? 's' : ''} during exploration`,
        {
            base_shards: baseShards,
            bonus_shards: bonus,
            total_shards: shards
        }
    );
    addTransaction(transaction);
    
    // Save warband
    saveWarband();
    
    // Show detailed message
    if (bonus > 0) {
        showMessage(`Added ${shards} Wyrdstone Shards to your warband! (${baseShards} + ${bonus} from Incomparable Miners)`, 'success');
    } else {
        showMessage(`Added ${shards} Wyrdstone Shards to your warband!`, 'success');
    }
    
    // Close modal and reset battle state
    hideModal('treasure-exploration-modal');
    resetBattleCasualties();
    showEditorView();
    
    // Open Sell Treasure modal after applying treasure
    try {
        const { openSellTreasureModal } = await import('./Treasury/sell-treasure-modal.js');
        openSellTreasureModal(currentWarband, currentWarband.treasure);
    } catch (error) {
        console.error('Failed to open sell treasure modal:', error);
    }
    
    // Clear stored result
    delete window.currentTreasureResult;
};

/** Toggles dice input mode */
export const toggleDiceInputMode = () => {
    const mode = document.querySelector('input[name="dice-input-mode"]:checked').value;

    if (mode === 'total') {
        document.getElementById('total-input-section').classList.remove('hidden');
        document.getElementById('individual-input-section').classList.add('hidden');
        document.getElementById('advanced-input-section').classList.add('hidden');
        document.getElementById('advanced-locked-toggle').checked = false;
        document.getElementById('calculation-mode-label').textContent = 'all dice';
        // Hide exploration results in total mode
        document.getElementById('exploration-result').classList.add('hidden');
    } else if (mode === 'individual') {
        document.getElementById('total-input-section').classList.add('hidden');
        document.getElementById('individual-input-section').classList.remove('hidden');
        document.getElementById('advanced-input-section').classList.add('hidden');
        document.getElementById('advanced-locked-toggle').checked = false;
        document.getElementById('calculation-mode-label').textContent = 'all dice';
        // Trigger exploration results update when switching to individual mode
        const diceInputs = document.querySelectorAll('.dice-input');
        const diceValues = [];
        diceInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            if (value > 0 && value <= 6) {
                diceValues.push(value);
            }
        });
        updateExplorationResults(diceValues);
    } else if (mode === 'advanced') {
        document.getElementById('total-input-section').classList.add('hidden');
        document.getElementById('individual-input-section').classList.add('hidden');
        document.getElementById('advanced-input-section').classList.remove('hidden');
        // Auto-fill the calculated dice count if input is empty
        const diceCountInput = document.getElementById('total-dice-count-input');
        const calculatedCount = document.getElementById('calculated-dice-count').textContent;
        if (!diceCountInput.value && calculatedCount !== '0') {
            let count = parseInt(calculatedCount) || 0;
            // Limit to 10
            if (count > 10) count = 10;
            diceCountInput.value = count;
        }
        // Generate dice inputs if there's a value
        if (diceCountInput.value) {
            generateAdvancedDiceInputs(parseInt(diceCountInput.value));
        }
    }
};

/** Generates dynamic dice inputs for advanced mode */
export const generateAdvancedDiceInputs = (count) => {
    const container = document.getElementById('advanced-dice-inputs');
    container.innerHTML = '';

    if (count <= 0 || count > 10) {
        document.getElementById('advanced-dice-inputs-container').classList.add('hidden');
        return;
    }

    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.inputMode = 'numeric';
        input.className = 'advanced-dice-input w-full px-2 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mordheim-gold text-center cursor-pointer';
        input.min = '1';
        input.max = '6';
        input.placeholder = (i + 1).toString();
        input.dataset.state = 'neutral'; // Track selection state
        input.addEventListener('input', updateAdvancedCalculatedTotal);
        input.addEventListener('click', handleDiceSelection);
        input.addEventListener('focus', () => input.select());
        container.appendChild(input);
    }

    document.getElementById('advanced-dice-inputs-container').classList.remove('hidden');
    updateAdvancedCalculatedTotal();
};

/** Handles dice selection cycling (neutral -> green -> red -> neutral) */
const handleDiceSelection = (event) => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    if (!lockedToggle.checked) return;

    const input = event.target;
    const currentState = input.dataset.state || 'neutral';

    // Count current green dice
    const greenCount = document.querySelectorAll('.advanced-dice-input[data-state="green"]').length;

    // Remove all state classes
    input.classList.remove('bg-green-600', 'border-green-500', 'bg-red-600', 'border-red-500', 'bg-slate-600', 'border-slate-500');

    // Cycle through states
    if (currentState === 'neutral') {
        // Limit to 6 green dice
        if (greenCount >= 6) {
            // Don't allow more than 6 green dice, but allow turning red
            input.dataset.state = 'red';
            input.classList.add('bg-red-600', 'border-red-500');
        } else {
            input.dataset.state = 'green';
            input.classList.add('bg-green-600', 'border-green-500');
        }
    } else if (currentState === 'green') {
        input.dataset.state = 'red';
        input.classList.add('bg-red-600', 'border-red-500');
    } else if (currentState === 'red') {
        input.dataset.state = 'neutral';
        input.classList.add('bg-slate-600', 'border-slate-500');
    }

    // Recalculate total after state change
    updateAdvancedCalculatedTotal();
};

/** Toggles locked state for advanced dice inputs */
export const toggleAdvancedLocked = () => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    const isLocked = lockedToggle.checked;
    const diceInputs = document.querySelectorAll('.advanced-dice-input');
    const calculationModeLabel = document.getElementById('calculation-mode-label');

    diceInputs.forEach(input => {
        if (isLocked) {
            input.readOnly = true;
            input.classList.add('cursor-pointer');
        } else {
            input.readOnly = false;
            input.classList.remove('cursor-pointer');
            // Reset to neutral state when unlocking
            input.dataset.state = 'neutral';
            input.classList.remove('bg-green-600', 'border-green-500', 'bg-red-600', 'border-red-500');
            input.classList.add('bg-slate-600', 'border-slate-500');
        }
    });

    // Update calculation mode label
    if (calculationModeLabel) {
        calculationModeLabel.textContent = isLocked ? 'green dice' : 'all dice';
    }

    // Recalculate total after toggling locked state
    updateAdvancedCalculatedTotal();
};

/** Maximizes total by selecting the 6 highest dice as green */
export const maximizeTotalDice = () => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    const diceInputs = document.querySelectorAll('.advanced-dice-input');

    // Lock if not already locked
    if (!lockedToggle.checked) {
        lockedToggle.checked = true;
        toggleAdvancedLocked();
    }

    // Get all dice with their values
    const diceArray = [];
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        if (value > 0 && value <= 6) {
            diceArray.push({ input, value });
        }
    });

    // Sort by value descending
    diceArray.sort((a, b) => b.value - a.value);

    // Reset all dice to neutral first
    diceInputs.forEach(input => {
        input.dataset.state = 'neutral';
        input.classList.remove('bg-green-600', 'border-green-500', 'bg-red-600', 'border-red-500', 'bg-slate-600', 'border-slate-500');
        input.classList.add('bg-slate-600', 'border-slate-500');
    });

    // Turn top 6 dice green, rest red
    diceArray.forEach((dice, index) => {
        if (index < 6) {
            dice.input.dataset.state = 'green';
            dice.input.classList.remove('bg-slate-600', 'border-slate-500', 'bg-red-600', 'border-red-500');
            dice.input.classList.add('bg-green-600', 'border-green-500');
        } else {
            dice.input.dataset.state = 'red';
            dice.input.classList.remove('bg-slate-600', 'border-slate-500', 'bg-green-600', 'border-green-500');
            dice.input.classList.add('bg-red-600', 'border-red-500');
        }
    });

    // Recalculate total
    updateAdvancedCalculatedTotal();
};

/** Selects dice to achieve a specific exploration result while maximizing total */
export const selectDiceForResult = (result) => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    const diceInputs = document.querySelectorAll('.advanced-dice-input');

    // Lock if not already locked
    if (!lockedToggle.checked) {
        lockedToggle.checked = true;
        toggleAdvancedLocked();
    }

    // Get the dice requirement for this result
    const requirement = result.dice_requirement;
    const requiredValue = requirement.value;
    const requiredCount = requirement.count;

    // Get all dice with their values
    const diceArray = [];
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        if (value > 0 && value <= 6) {
            diceArray.push({ input, value });
        }
    });

    // Separate dice that match the required value from others
    const matchingDice = diceArray.filter(dice => dice.value === requiredValue);
    const otherDice = diceArray.filter(dice => dice.value !== requiredValue);

    // Check if result is achievable (need at least requiredCount matching dice)
    if (matchingDice.length < requiredCount) {
        return; // Cannot achieve this result
    }

    // Reset all dice to neutral first
    diceInputs.forEach(input => {
        input.dataset.state = 'neutral';
        input.classList.remove('bg-green-600', 'border-green-500', 'bg-red-600', 'border-red-500', 'bg-slate-600', 'border-slate-500');
        input.classList.add('bg-slate-600', 'border-slate-500');
    });

    // Select the required number of matching dice (green)
    let greenCount = 0;
    matchingDice.slice(0, requiredCount).forEach(dice => {
        dice.input.dataset.state = 'green';
        dice.input.classList.remove('bg-slate-600', 'border-slate-500', 'bg-red-600', 'border-red-500');
        dice.input.classList.add('bg-green-600', 'border-green-500');
        greenCount++;
    });

    // Sort other dice by value descending to maximize total
    otherDice.sort((a, b) => b.value - a.value);

    // Add highest other dice that don't create competing results until we reach 6 green dice total
    for (const dice of otherDice) {
        if (greenCount >= 6) break;
        
        // Test if adding this die would create a competing result
        const currentGreenDice = diceArray.filter(d => d.input.dataset.state === 'green').map(d => d.value);
        const testSelection = [...currentGreenDice, dice.value];
        const testResult = analyzeExplorationDice(testSelection);
        
        // Only add if it doesn't create a competing result
        if (testResult.dice_requirement.type === 'exact' &&
            testResult.dice_requirement.value === requiredValue &&
            testResult.dice_requirement.count === requiredCount) {
            dice.input.dataset.state = 'green';
            dice.input.classList.remove('bg-slate-600', 'border-slate-500', 'bg-red-600', 'border-red-500');
            dice.input.classList.add('bg-green-600', 'border-green-500');
            greenCount++;
        }
        // If this die creates a competing result, skip it and try the next one
    }

    // Turn all remaining dice red (these are the ones to remove)
    diceArray.forEach(dice => {
        if (dice.input.dataset.state !== 'green') {
            dice.input.dataset.state = 'red';
            dice.input.classList.remove('bg-slate-600', 'border-slate-500', 'bg-green-600', 'border-green-500');
            dice.input.classList.add('bg-red-600', 'border-red-500');
        }
    });

    // Recalculate total
    updateAdvancedCalculatedTotal();
};

/** Updates calculated total from advanced dice inputs */
const updateAdvancedCalculatedTotal = () => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    const isLocked = lockedToggle && lockedToggle.checked;
    const diceInputs = document.querySelectorAll('.advanced-dice-input');
    let sum = 0;
    const diceValues = [];

    // Get all dice values for results calculation (always use all original values)
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        if (value > 0 && value <= 6) {
            diceValues.push(value);
        }
    });

    // Calculate sum based on state when locked
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        const state = input.dataset.state || 'neutral';

        if (isLocked) {
            // When locked, include only green dice
            if (state === 'green' && value > 0 && value <= 6) {
                sum += value;
            }
        } else {
            // When unlocked, include all dice
            if (value > 0 && value <= 6) {
                sum += value;
            }
        }
    });

    document.getElementById('advanced-calculated-total').textContent = sum;

    // Update exploration results when in advanced mode (always pass all original dice values)
    updateExplorationResults(diceValues);
};

/** Updates calculated total from individual dice */
export const updateCalculatedTotal = () => {
    const diceInputs = document.querySelectorAll('.dice-input');
    let sum = 0;
    const diceValues = [];
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        sum += value;
        if (value > 0 && value <= 6) {
            diceValues.push(value);
        }
    });
    document.getElementById('calculated-total').textContent = sum;

    // Update exploration results when in individual mode
    updateExplorationResults(diceValues);
};

/** Updates exploration results display based on dice values */
const updateExplorationResults = (diceValues) => {
    const mode = document.querySelector('input[name="dice-input-mode"]:checked').value;

    // Update in both individual and advanced modes
    if (mode !== 'individual' && mode !== 'advanced') {
        document.getElementById('exploration-result').classList.add('hidden');
        return;
    }

    // Clear previous results
    const resultsList = document.getElementById('exploration-results-list');
    resultsList.innerHTML = '';

    if (mode === 'individual') {
        // Individual mode: show only the winner per Mordheim rules
        const result = analyzeExplorationDice(diceValues);

        const resultCard = document.createElement('div');
        resultCard.className = 'bg-slate-700 p-3 rounded-lg border border-slate-600';
        resultCard.innerHTML = `
            <div class="mb-2">
                <div class="text-sm text-slate-400 mb-1">Result:</div>
                <div class="text-lg font-bold text-white">${result.result}</div>
            </div>
            <div class="mb-2">
                <div class="text-sm text-slate-400 mb-1">Description:</div>
                <div class="text-slate-300 text-sm">${result.description}</div>
            </div>
            <div>
                <div class="text-sm text-slate-400 mb-1">Details:</div>
                <div class="text-slate-300 text-sm whitespace-pre-line">${result.details}</div>
            </div>
        `;
        resultsList.appendChild(resultCard);
    } else if (mode === 'advanced') {
        // Advanced mode: show all potential results with removal instructions
        const results = findAllExplorationResults(diceValues);

        // Determine if we're in locked mode
        const lockedToggle = document.getElementById('advanced-locked-toggle');
        const isLocked = lockedToggle && lockedToggle.checked;

        // Find the winner based on current dice values
        // When locked, use only green dice; when unlocked, use all dice
        let winnerDiceValues = diceValues;
        if (isLocked) {
            const diceInputs = document.querySelectorAll('.advanced-dice-input');
            winnerDiceValues = [];
            diceInputs.forEach(input => {
                const value = parseInt(input.value) || 0;
                const state = input.dataset.state || 'neutral';
                if (state === 'green' && value > 0 && value <= 6) {
                    winnerDiceValues.push(value);
                }
            });
        }
        const winner = analyzeExplorationDice(winnerDiceValues);

        // Generate HTML for each result
        results.forEach((result, index) => {
            const resultCard = document.createElement('div');
            let cardClass = 'bg-slate-700 p-3 rounded-lg border border-slate-600';

            // Highlight winner with green border when locked
            if (isLocked && result === winner) {
                cardClass = 'bg-slate-700 p-3 rounded-lg border-2 border-green-500';
            }

            resultCard.className = cardClass;

            // Add winner badge when locked
            let winnerBadge = '';
            if (isLocked && result === winner) {
                winnerBadge = `
                    <div class="inline-block px-2 py-1 bg-green-600 rounded text-white text-xs font-bold mb-2">
                        WINNER
                    </div>
                `;
            }

            // Add Select/Reroll button (only for exact type results, not default)
            let selectButton = '';
            if (result.dice_requirement.type === 'exact') {
                // Check if result is achievable with current dice
                const requiredValue = result.dice_requirement.value;
                const requiredCount = result.dice_requirement.count;

                // Get original dice values from inputs (not filtered by state)
                const diceInputs = document.querySelectorAll('.advanced-dice-input');
                const allDiceValues = [];
                diceInputs.forEach(input => {
                    const value = parseInt(input.value) || 0;
                    if (value > 0 && value <= 6) {
                        allDiceValues.push(value);
                    }
                });

                // Simulate the selection: required dice + highest other dice that don't create a competing result
                const matchingDice = allDiceValues.filter(v => v === requiredValue);
                const otherDice = allDiceValues.filter(v => v !== requiredValue).sort((a, b) => b - a);
                const requiredDiceToKeep = matchingDice.slice(0, requiredCount);
                
                // Try to add other dice from highest to lowest, but skip if they would create a competing result
                const otherDiceToKeep = [];
                for (const die of otherDice) {
                    if (otherDiceToKeep.length >= 6 - requiredCount) break;
                    
                    const testSelection = [...requiredDiceToKeep, ...otherDiceToKeep, die];
                    const testResult = analyzeExplorationDice(testSelection);
                    
                    // Only add this die if it doesn't create a competing result
                    if (testResult.dice_requirement.type === 'exact' &&
                        testResult.dice_requirement.value === requiredValue &&
                        testResult.dice_requirement.count === requiredCount) {
                        otherDiceToKeep.push(die);
                    }
                }
                
                const simulatedSelection = [...requiredDiceToKeep, ...otherDiceToKeep];

                // Check what result would actually occur with this selection
                const actualResult = analyzeExplorationDice(simulatedSelection);
                const isAchievable = matchingDice.length >= requiredCount &&
                                   actualResult.dice_requirement.type === 'exact' &&
                                   actualResult.dice_requirement.value === requiredValue &&
                                   actualResult.dice_requirement.count === requiredCount;

                // Store result data as JSON in data attribute
                const resultData = JSON.stringify({
                    dice_requirement: result.dice_requirement
                });

                if (isAchievable) {
                    selectButton = `
                        <button class="select-result-btn w-full mt-3 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition" data-result-data='${resultData}'>
                            Select
                        </button>
                    `;
                } else {
                    selectButton = `
                        <button class="select-result-btn w-full mt-3 py-2 px-4 bg-gray-400 text-white font-bold rounded-lg cursor-not-allowed" disabled data-result-data='${resultData}'>
                            Select
                        </button>
                    `;
                }
            }

            resultCard.innerHTML = `
                ${winnerBadge}
                <div class="mb-2">
                    <div class="text-sm text-slate-400 mb-1">Result ${index + 1}:</div>
                    <div class="text-lg font-bold text-white">${result.result}</div>
                </div>
                <div class="mb-2">
                    <div class="text-sm text-slate-400 mb-1">Description:</div>
                    <div class="text-slate-300 text-sm">${result.description}</div>
                </div>
                <div>
                    <div class="text-sm text-slate-400 mb-1">Details:</div>
                    <div class="text-slate-300 text-sm whitespace-pre-line">${result.details}</div>
                </div>
                ${selectButton}
            `;
            resultsList.appendChild(resultCard);
        });
    }

    // Show the exploration result section
    document.getElementById('exploration-result').classList.remove('hidden');
};

// End battle functions (processBattleEnd, applyCasualtyResolutions, applyExperience) moved to End Battle/end_battle.js

/** Checks if a fighter should advance */
export const checkForAdvancement = (fighter) => {
    if (!fighter.xp) return;
    
    const thresholds = fighter.type === 'Hero' ? HERO_XP_THRESHOLDS : STANDARD_XP_THRESHOLDS;
    const currentThreshold = thresholds.find(t => t.xp === fighter.starting_xp) || thresholds[0];
    
    if (fighter.xp >= currentThreshold.next_level_xp) {
        // Mark for advancement (this would trigger the existing advancement system)
        fighter.advancement_pending = true;
    }
};

// Make battle view functions globally accessible for onclick handlers
window.trackKill = trackKill;
window.removeKill = removeKill;
window.showBattleSkillDetails = showBattleSkillDetails;
window.showBattleSpellDetails = showBattleSpellDetails;
window.showBattleEquipmentDetails = showBattleEquipmentDetails;
window.showBattleAbilityDetails = showBattleAbilityDetails;
window.toggleAbilityDetails = toggleAbilityDetails;
window.showCasualtyModal = showCasualtyModal;
window.toggleFighterCard = toggleFighterCard;
// selectInjury and changeInjury are now globally accessible from End Battle/end_battle.js
window.addInjury = addInjury;

// Migration progress modal functions
export const showMigrationProgressModal = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-slate-800 rounded-lg p-6 max-w-md mx-4">
            <h3 class="text-xl font-bold text-mordheim-gold mb-4">Migrating Your Data</h3>
            <div class="text-slate-300 mb-4">
                <p>We're upgrading your warband data to our new structure.</p>
                <p class="mt-2 text-sm">This should only take a few moments...</p>
            </div>
            <div class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-mordheim-gold"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
};

export const hideMigrationProgressModal = (modal) => {
    if (modal && modal.parentNode) {
        modal.parentNode.removeChild(modal);
    }
};
