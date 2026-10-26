import { MASTER_EQUIPMENT_LIST, SKILLS, MASTER_INJURY_LIST } from './data/index.js';
import { findSkillForWarband } from './skill-lookup.js';
import { applyHeavyArmourShieldPenalty, applyPaviseMovementPenalty } from './equiprules/armour.js';
import { STATS_FIELDS } from './config.js';
import { getWarbandData, calculateWarbandRating, showMessage, calculateArmorSave, normalizeEquipment } from './utility.js';
import { formatXPDisplay } from './slow-witted.js';
import { currentWarband, isShieldMeleeIgnored } from './state.js';
import { getStatLabel, translateFighterType, translateWarband, translateWarrior, translateSkill, translateSpecialRule, translateEquipment, translateInjury, translateWarriorRole, formatMovementStat, getDistanceUnit } from './i18n.js';

/** Generates and prints a print-friendly version of the warband */
export const printWarband = (includeNotes = true, includeSkills = true, includeWarbandNotes = true) => {
    if (!currentWarband) {
        showMessage("No hay ninguna banda cargada para imprimir.", 'error');
        return;
    }

    // Track print event
    trackEvent('warband_print', {
        warband_name: currentWarband.name,
        warband_type: currentWarband.type
    });

    // Create print content
    const printContent = generatePrintContent(currentWarband, includeNotes, includeSkills, includeWarbandNotes);
    
    // Create print container
    const printContainer = document.createElement('div');
    printContainer.className = 'print-content';
    printContainer.innerHTML = printContent;
    
    // Add to body
    document.body.appendChild(printContainer);
    
    // Force layout flush synchronously
    void printContainer.offsetHeight;

    let cleanedUp = false;
    const cleanup = () => {
        if (cleanedUp) return;
        cleanedUp = true;
        if (printContainer && printContainer.parentNode) {
            printContainer.parentNode.removeChild(printContainer);
        }
        window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);
    setTimeout(cleanup, 120000);

    try {
        window.print();
    } catch (err) {
        console.error('Print trigger failed:', err);
        cleanup();
    }
};

/** Generates the HTML content for printing */
const generatePrintContent = (warband, includeNotes, includeSkills, includeWarbandNotes) => {
    const warbandData = getWarbandData(warband.type);
    
    // Calculate total member count (counting henchmen group members individually)
    const totalMemberCount = warband.members.reduce((total, fighter) => {
        if (fighter.type === 'Henchman') {
            const groupSize = fighter.group_size || 1;
            const casualties = fighter.casualties || 0;
            return total + Math.max(0, groupSize - casualties);
        }
        return total + 1;
    }, 0);
    
    let fightersHTML = '';
    
    // Group fighters by type
    const fighterGroups = {
        'Hero': [],
        'Henchman': [],
        'Hired Sword': [],
        'Dramatis Personae': [],
        'Vehicle': []
    };
    
    // Sort fighters into groups while maintaining original order
    warband.members.forEach(fighter => {
        if (fighterGroups[fighter.type]) {
            fighterGroups[fighter.type].push(fighter);
        }
    });
    
    // Generate HTML by type in order, maintaining original order within groups
    const typeOrder = ['Hero', 'Henchman', 'Hired Sword', 'Dramatis Personae', 'Vehicle'];
    
    const typeTitles = {
        'Hero': 'Héroes',
        'Henchman': 'Secuaces',
        'Hired Sword': 'Espadas de Alquiler',
        'Dramatis Personae': 'Personajes Dramáticos',
        'Vehicle': 'Vehículos'
    };

    let isFirstGroup = true;
    typeOrder.forEach(type => {
        const group = fighterGroups[type];
        if (group && group.length > 0) {
            // Add section header with appropriate margin
            const marginTop = isFirstGroup ? '20px' : '30px';
            const title = typeTitles[type] || `${type}s`;
            fightersHTML += `<h2 style="page-break-before: auto; margin-top: ${marginTop};">${title} (${group.length})</h2>`;
            isFirstGroup = false;
            
            // Add fighters in this group in their original order
            group.forEach(fighter => {
                fightersHTML += generateFighterPrintHTML(fighter, includeNotes);
            });
        }
    });

    // Generate skills reference page if requested
    let skillsReferenceHTML = '';
    if (includeSkills) {
        skillsReferenceHTML = generateSkillsReference(warband);
    }

    // Generate warband notes page if requested
    let warbandNotesHTML = '';
    if (includeWarbandNotes) {
        warbandNotesHTML = generateWarbandNotesPage(warband);
    }
    
    return `
        <div class="print-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 15px;">
            <div>
                <h1 style="margin: 0; font-size: 20pt;">${warband.name}</h1>
                <div class="warband-info" style="margin-top: 5px; font-size: 10pt;">
                    <strong>Tipo:</strong> ${translateWarband(warband.type)} | 
                    <strong>Valoración:</strong> ${warband.rating} | 
                    <strong>Tesorería:</strong> ${warband.gc_treasury || 0} CO | 
                    <strong>Guerreros:</strong> ${totalMemberCount}
                </div>
            </div>
            <img src="grimheim-logo.svg" alt="Grimheim" style="height: 42px; width: auto; max-width: 150px; object-fit: contain;">
        </div>
        
        <div class="print-warband-summary">
            <h3>Notas:</h3>
            <div class="print-notes-lines">
                <div class="print-notes-line"></div>
                <div class="print-notes-line"></div>
                <div class="print-notes-line"></div>
            </div>
        </div>
        
        ${fightersHTML}
        
        ${skillsReferenceHTML}
        
        ${warbandNotesHTML}
        
        <div class="print-footer" style="margin-top: 30px; text-align: center; font-size: 10pt; color: #666;">
            Generado el ${new Date().toLocaleDateString()} por Grimheim - Gestor de Bandas de Mordheim
        </div>
    `;
};

/** Generates armour save display for a fighter */
const generateArmorSaveDisplay = (fighter) => {
    if (!fighter.equipment || fighter.equipment.length === 0) {
        return '';
    }
    
    const armorSave = calculateArmorSave(fighter.equipment, isShieldMeleeIgnored, fighter.skills || []);
    
    if (!armorSave) {
        return '';
    }
    
    let armorSaveHTML = '<div class="print-armour-save"><strong>Salvación por Armadura:</strong> ';
    
    if (armorSave.isSplit) {
        // Show both melee and ranged saves when they differ
        const meleeSave = armorSave.melee.finalSaveValue === 7 ? 'Ninguna' : `${armorSave.melee.finalSaveValue}+`;
        const rangedSave = armorSave.ranged.finalSaveValue === 7 ? 'Ninguna' : `${armorSave.ranged.finalSaveValue}+`;
        armorSaveHTML += `Cuerpo a cuerpo: ${meleeSave}, Disparo: ${rangedSave}`;
    } else {
        // Show single save value
        const saveValue = armorSave.basic.finalSaveValue === 7 ? 'Ninguna' : `${armorSave.basic.finalSaveValue}+`;
        armorSaveHTML += saveValue;
    }
    
    armorSaveHTML += '</div>';
    return armorSaveHTML;
};

/** Generates experience boxes/checkboxes for a fighter */
const generateExperienceBoxes = (fighter) => {
    const currentXP = fighter.xp || 0;
    const isHero = fighter.type === 'Hero';
    
    // Heroes get more boxes (90), henchmen and hired swords get fewer (14)
    const totalBoxes = isHero ? 90 : 14;
    
    // Each box represents 1 XP point
    const earnedBoxes = Math.min(totalBoxes, Math.floor(currentXP));
    
    const xpXMarkSVG = `<svg class="print-xp-x" viewBox="0 0 10 10" preserveAspectRatio="none" style="width: 100%; height: 100%; stroke: black; stroke-width: 1.8; stroke-linecap: round; display: block;"><line x1="1.5" y1="1.5" x2="8.5" y2="8.5"/><line x1="8.5" y1="1.5" x2="1.5" y2="8.5"/></svg>`;
    
    let boxesHTML = '';
    for (let i = 0; i < totalBoxes; i++) {
        const isChecked = i < earnedBoxes;
        const boxNumber = i + 1;
        // Henchmen/Hired Sword milestone boxes: 2, 5, 9, 14
        // Hero milestone boxes: 2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90
        const henchmenMilestones = [2, 5, 9, 14];
        const heroMilestones = [2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83, 90];
        const isMilestone = isHero ? heroMilestones.includes(boxNumber) : henchmenMilestones.includes(boxNumber);
        boxesHTML += `
            <div class="print-xp-box ${isChecked ? 'print-xp-box-checked' : ''} ${isMilestone ? 'print-xp-box-milestone' : ''}" title="PX: ${boxNumber}">${isChecked ? xpXMarkSVG : ''}</div>
        `;
    }
    
    return `
        <div class="print-experience-section">
            <strong>Experiencia (PX):</strong> ${formatXPDisplay(currentXP, fighter.type)}
            <div class="print-xp-boxes ${isHero ? 'print-xp-boxes-hero' : ''}">
                ${boxesHTML}
            </div>
        </div>
    `;
};

/** Generates HTML for a single fighter in print format */
const generateFighterPrintHTML = (fighter, includeNotes) => {
    const isHenchman = fighter.type === 'Henchman';
    const groupSize = fighter.group_size || 1;
    const casualties = fighter.casualties || 0;
    const effectiveSize = Math.max(0, groupSize - casualties);
    
    // Equipment - normalize to handle both V1 and V2 formats
    const equipmentHTML = (fighter.equipment || []).map(e => {
        const normalized = normalizeEquipment(e);
        return `<span class="print-equipment-item">${translateEquipment(normalized.name) || 'Objeto desconocido'}</span>`;
    }).join(' ');
    
    // Skills
    const skillsHTML = (fighter.skills || []).map(skill => 
        `<span class="print-skill">${translateSkill(skill)}</span>`
    ).join(' ');
    
    // Special Rules - handle both string and array formats
    const specialRulesArray = Array.isArray(fighter.special_rules) 
        ? fighter.special_rules 
        : (fighter.special_rules ? [fighter.special_rules] : []);
    const specialRulesHTML = specialRulesArray.map(rule => 
        `<span class="print-special-rule">${translateSpecialRule(rule)}</span>`
    ).join(' ');
    
    // Check for multi-stat fighters
    const isMultiStatLine = fighter.stats && Object.values(fighter.stats).every(v => typeof v === 'object' && v !== null && !Array.isArray(v));
    
    let statsHTML = '';
    
    if (isMultiStatLine) {
        // Multi-stat fighter
        statsHTML = '<div class="print-multi-stat">';
        const statLineKeys = Object.keys(fighter.stats);
        
        statLineKeys.forEach(statLineKey => {
            const statLineStats = fighter.stats[statLineKey];
            statsHTML += `<div class="print-stat-line-name">${translateWarriorRole(statLineKey)}</div>`;
            statsHTML += '<div class="print-stats">';
            
            STATS_FIELDS.forEach(stat => {
                let statValue = statLineStats[stat] !== undefined ? statLineStats[stat] : '-';
                
                // Apply modifiers (simplified for print)
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

                const modifier = characteristicModifiers[stat] || 0;
                if (modifier !== 0) {
                    statValue = Math.max(0, statValue + modifier);
                }

                // Apply armour movement penalties (only to Fighter stat line)
                if (statLineKey === 'Fighter') {
                    const penaltyResult = applyHeavyArmourShieldPenalty(stat, statValue, fighter.equipment, fighter.special_rules, fighter.skills);
                    statValue = penaltyResult.value;

                    const paviseResult = applyPaviseMovementPenalty(stat, statValue, fighter.equipment);
                    statValue = paviseResult.value;
                }
                
                const displayVal = stat === 'M' ? formatMovementStat(statValue) : statValue;
                const statLabel = (stat === 'M' && getDistanceUnit() === 'cm') ? 'M(cm)' : getStatLabel(stat);
                statsHTML += `
                    <div class="print-stat">
                        <div class="print-stat-name">${statLabel}</div>
                        <div class="print-stat-value">${displayVal}</div>
                    </div>
                `;
            });
            
            statsHTML += '</div>';
        });
        
        statsHTML += '</div>';
    } else {
        // Single-stat fighter
        statsHTML = '<div class="print-stats">';
        STATS_FIELDS.forEach(stat => {
            let statValue = fighter.stats?.[stat] !== undefined ? fighter.stats[stat] : '-';
            
            // Apply modifiers (simplified for print)
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
            }

            // Apply armour movement penalties
            const penaltyResult = applyHeavyArmourShieldPenalty(stat, statValue, fighter.equipment, fighter.special_rules, fighter.skills);
            statValue = penaltyResult.value;

            const paviseResult = applyPaviseMovementPenalty(stat, statValue, fighter.equipment);
            statValue = paviseResult.value;
            
            const displayVal = stat === 'M' ? formatMovementStat(statValue) : statValue;
            const statLabel = (stat === 'M' && getDistanceUnit() === 'cm') ? 'M(cm)' : getStatLabel(stat);
            statsHTML += `
                <div class="print-stat">
                    <div class="print-stat-name">${statLabel}</div>
                    <div class="print-stat-value">${displayVal}</div>
                </div>
            `;
        });
        statsHTML += '</div>';
    }
    
    return `
        <div class="print-fighter">
            <div class="print-fighter-header">
                ${fighter.name} - ${translateFighterType(fighter.type)}
                ${isHenchman ? ` (x${effectiveSize}${casualties > 0 ? ` - ${casualties} bajas` : ''})` : ''}
            </div>
            
            ${statsHTML}
            
            ${generateArmorSaveDisplay(fighter)}
            ${equipmentHTML ? `<div class="print-equipment"><strong>Equipo:</strong> ${equipmentHTML}</div>` : ''}
            ${skillsHTML ? `<div class="print-skills"><strong>Habilidades:</strong> ${skillsHTML}</div>` : ''}
            ${(fighter.injuries && fighter.injuries.length > 0) ? `<div class="print-injuries"><strong>Heridas Graves:</strong> ${fighter.injuries.map(i => `<span class="print-injury">${translateInjury(i)}</span>`).join(' ')}</div>` : ''}
            ${specialRulesHTML ? `<div class="print-special-rules"><strong>Reglas Especiales:</strong> ${specialRulesHTML}</div>` : ''}
            ${(fighter.type === 'Hero' || fighter.type === 'Henchman' || fighter.type === 'Hired Sword') ? generateExperienceBoxes(fighter) : ''}
            ${(includeNotes && fighter.notes) ? `<div class="print-fighter-notes" style="margin-top: 5px; font-style: italic; font-size: 0.85rem; color: #475569;"><strong>Notas:</strong> ${fighter.notes.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
    `;
};

/** Strips HTML tags from a string to produce plain text for printing */
const stripHtmlTags = (html) => {
    if (typeof html !== 'string') return '';
    // Create a temporary element to leverage the browser's HTML parser
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
};

/** Generates a deduplicated, alphabetized skills reference section for printing */
const generateSkillsReference = (warband) => {
    // Collect all unique skill names across all fighters
    const skillNames = new Set();
    warband.members.forEach(fighter => {
        (fighter.skills || []).forEach(skillName => {
            skillNames.add(skillName);
        });
    });

    if (skillNames.size === 0) return '';

    // Look up each skill and build entries
    const skillEntries = [];
    skillNames.forEach(skillName => {
        const skill = findSkillForWarband(skillName);
        if (skill) {
            skillEntries.push({
                name: skill.name,
                rules: stripHtmlTags(skill.rules || 'No hay descripción disponible.')
            });
        } else {
            skillEntries.push({
                name: skillName,
                rules: 'No hay descripción disponible.'
            });
        }
    });

    // Sort alphabetically by name
    skillEntries.sort((a, b) => a.name.localeCompare(b.name));

    const entriesHTML = skillEntries.map(entry => `
        <div class="print-skill-entry">
            <strong>${translateSkill(entry.name)}</strong>
            <p>${entry.rules}</p>
        </div>
    `).join('');

    return `
        <div class="print-skills-reference" style="page-break-before: always;">
            <h2>Habilidades</h2>
            ${entriesHTML}
        </div>
    `;
};

/** Escapes HTML special characters so user-entered text prints literally */
const escapeHtml = (text) => String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Generates a Warband Notes page for printing (empty string if no notes) */
const generateWarbandNotesPage = (warband) => {
    const textarea = document.getElementById('warband-notes');
    const raw = (textarea ? textarea.value : (warband.notes || '')).trim();
    if (!raw) return '';

    return `
        <div class="print-warband-notes-page" style="page-break-before: always;">
            <h2>Notas de la Banda</h2>
            <div class="print-warband-notes-body">${escapeHtml(raw)}</div>
        </div>
    `;
};

// Make the function globally accessible
window.printWarband = printWarband;
