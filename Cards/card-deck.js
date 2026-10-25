/**
 * Card Deck Management & Fighter Catalog Module
 * Manages the custom deck of fighter cards created outside of (or alongside) active warbands,
 * and provides catalog indexing for all warbands, warriors, hired swords, dramatis personae, and vehicles.
 */

import { WARBANDS, HIRED_SWORDS, DRAMATIS_PERSONAE, VEHICLES, MASTER_EQUIPMENT_LIST } from '../data/index.js';
import { canHireCharacter } from '../hiring-validation.js';
import { getWarbandData } from '../utility.js';
import { calculateFighterOrGroupTotalCost } from './card-renderer.js';
import { getWarbands, currentWarband } from '../state.js';

const DECK_STORAGE_KEY = 'rosterheim_builder_custom_cards';

export function sanitizeCustomCard(card) {
    if (!card || typeof card !== 'object') return card;
    if (card.fromSavedWarband || (typeof card.warband_key === 'string' && card.warband_key.startsWith('saved_'))) {
        card.fromSavedWarband = true;
        card.isTemplateCard = false;
        return card;
    }
    const SKILL_CATEGORY_NAMES = new Set(['Combat', 'Shooting', 'Academic', 'Strength', 'Speed', 'Special']);
    
    card.isTemplateCard = true;

    // Filter out free dagger / auto-assigned dagger on template cards
    if (Array.isArray(card.equipment)) {
        card.equipment = card.equipment.filter(e => {
            const name = typeof e === 'string' ? e : e?.name;
            return name && name.toLowerCase() !== 'dagger';
        });
    }

    // Sanitize skills: Leader is a special rule, NOT a skill. Also skill categories are not acquired skills.
    const rawSkills = Array.isArray(card.skills) ? card.skills : (typeof card.skills === 'string' ? card.skills.split(';') : []);
    const cleanSkills = [];
    let hadLeader = false;

    rawSkills.forEach(s => {
        const str = typeof s === 'string' ? s.trim() : (s?.name || '');
        if (!str) return;
        const lower = str.toLowerCase();
        if (lower === 'leader' || lower === 'leader expanded') {
            hadLeader = true;
        } else if (!SKILL_CATEGORY_NAMES.has(str)) {
            cleanSkills.push(str);
        }
    });

    card.skills = cleanSkills;

    // If Leader was erroneously in skills, ensure it is preserved under special rules
    if (hadLeader) {
        const rules = Array.isArray(card.special_rules)
            ? [...card.special_rules]
            : (typeof card.special_rules === 'string' && card.special_rules ? [card.special_rules] : []);
        const hasLeaderRule = rules.some(r => typeof r === 'string' && r.toLowerCase().includes('leader'));
        if (!hasLeaderRule) {
            rules.push('Leader');
            card.special_rules = rules;
        }
    }

    return card;
}

/**
 * Retrieves the current standalone card deck from localStorage
 * @returns {{ name: string, isCustomDeck: boolean, members: Array<object> }}
 */
export function getBuilderDeck() {
    try {
        const raw = localStorage.getItem(DECK_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.members)) {
                return {
                    name: parsed.name || 'Custom Card Deck',
                    isCustomDeck: true,
                    members: parsed.members
                        .filter(m => m && typeof m === 'object' && typeof m.type === 'string')
                        .map(m => sanitizeCustomCard(m))
                };
            }
        }
    } catch (e) {
        console.warn('Failed to parse builder custom card deck from localStorage:', e);
    }
    return {
        name: 'Custom Card Deck',
        isCustomDeck: true,
        members: []
    };
}

/**
 * Saves the card deck to localStorage and notifies listeners
 * @param {{ name?: string, members: Array<object> }} deck
 */
export function saveBuilderDeck(deck) {
    try {
        const toSave = {
            name: deck.name || 'Custom Card Deck',
            members: Array.isArray(deck.members) ? deck.members : []
        };
        localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(toSave));
        window.dispatchEvent(new CustomEvent('rosterheim:card-deck-updated', { detail: toSave }));
    } catch (e) {
        console.error('Failed to save builder card deck to localStorage:', e);
    }
}

/**
 * Adds a new fighter card to the builder deck
 * @param {object} card
 * @returns {object} The added card
 */
export function addCardToDeck(card) {
    const deck = getBuilderDeck();
    const finalCard = {
        ...card,
        id: card.id || `card_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
    };
    deck.members.push(finalCard);
    saveBuilderDeck(deck);
    return finalCard;
}

/**
 * Removes a fighter card from the builder deck by ID
 * @param {string} cardId
 */
export function removeCardFromDeck(cardId) {
    const deck = getBuilderDeck();
    deck.members = deck.members.filter(m => String(m.id) !== String(cardId));
    saveBuilderDeck(deck);
}

/**
 * Clears all cards in the builder deck
 */
export function clearBuilderDeck() {
    saveBuilderDeck({ name: 'Custom Card Deck', members: [] });
}

/**
 * Returns saved warbands from application state (Firestore / active) or localStorage
 * @returns {Array<object>}
 */
function getSavedWarbandsList() {
    const map = new Map();

    // 1. In-memory state warbands (populated from Firestore or local storage)
    try {
        const stateWarbands = getWarbands();
        if (Array.isArray(stateWarbands)) {
            stateWarbands.forEach(w => {
                if (w && w.id) {
                    map.set(String(w.id), w);
                }
            });
        }
    } catch (e) {
        console.warn('Failed to retrieve warbands from state:', e);
    }

    // 2. Currently active warband if present
    try {
        if (currentWarband && currentWarband.id) {
            map.set(String(currentWarband.id), currentWarband);
        }
    } catch (e) {
        // Ignore
    }

    // 3. LocalStorage cached / offline warbands
    try {
        const raw = localStorage.getItem('mordheim_warbands');
        if (raw) {
            const list = JSON.parse(raw);
            if (Array.isArray(list)) {
                list.forEach(w => {
                    if (w && w.id && !map.has(String(w.id))) {
                        map.set(String(w.id), w);
                    }
                });
            }
        }
    } catch (e) {
        // Ignore
    }

    return Array.from(map.values());
}

/**
 * Resolves warband metadata context from a warband key (official or saved)
 * @param {string} warbandKey
 * @returns {{ name: string, type: string, alignment: string, members: Array<object>, raw?: object }|null}
 */
export function resolveWarbandContext(warbandKey) {
    if (!warbandKey) return null;

    if (warbandKey.startsWith('wb_')) {
        const wbName = warbandKey.replace('wb_', '');
        const staticData = getWarbandData(wbName);
        const allWbs = WARBANDS.flatMap(g => g.warbands || []);
        const found = allWbs.find(w => w.name === wbName);
        return {
            name: wbName,
            type: wbName,
            alignment: staticData?.alignment || found?.data?.alignment || 'neutral',
            members: [],
            raw: found
        };
    }

    if (warbandKey.startsWith('saved_')) {
        const savedId = warbandKey.replace('saved_', '');
        const savedWarbands = getSavedWarbandsList();
        const found = savedWarbands.find(w => String(w.id) === String(savedId));
        if (found) {
            const staticData = getWarbandData(found.type || found.name);
            return {
                name: found.name,
                type: found.type || found.name,
                alignment: found.alignment || staticData?.alignment || 'neutral',
                members: found.members || [],
                raw: found
            };
        }
    }

    return null;
}

/**
 * Normalizes and compares two fighter type strings (e.g. 'Hired Sword' === 'hired_sword')
 * @param {string} mType
 * @param {string} targetType
 * @returns {boolean}
 */
export function matchesFighterType(mType, targetType) {
    if (!mType || !targetType) return false;
    const normM = String(mType).trim().toLowerCase().replace(/[_\-\s]+/g, ' ');
    const normTarget = String(targetType).trim().toLowerCase().replace(/[_\-\s]+/g, ' ');
    return normM === normTarget;
}

/**
 * Returns an organized catalog of all selectable warband sources
 * @param {string|null} [fighterType=null]
 * @returns {Array<{ group: string, items: Array<{ key: string, name: string, type: string, raw?: object }> }>}
 */
export function getWarbandCatalog(fighterType = null) {
    const groups = [];

    // Official Warbands grouped by grade (Core Warbands, Grade 1a, Grade 1b, etc.)
    WARBANDS.forEach(category => {
        const warbands = category.warbands || [];
        if (warbands.length > 0) {
            const groupName = category.grade && category.grade.toLowerCase().includes('core')
                ? 'Core Warbands'
                : (category.grade || 'Official Warbands');

            groups.push({
                group: groupName,
                items: warbands.map(wb => ({
                    key: `wb_${wb.name}`,
                    name: wb.name,
                    type: 'official',
                    raw: wb
                }))
            });
        }
    });

    // Saved Warbands from local storage (only include if they contain fighters of the requested type)
    const saved = getSavedWarbandsList();
    if (saved.length > 0) {
        const filteredSaved = saved.filter(w => {
            if (!Array.isArray(w.members) || w.members.length === 0) return false;
            if (!fighterType) return true;
            return w.members.some(m => matchesFighterType(m.type, fighterType));
        });

        if (filteredSaved.length > 0) {
            groups.push({
                group: 'Your Saved Warbands',
                items: filteredSaved.map(w => ({
                    key: `saved_${w.id}`,
                    name: `${w.name} (${w.type || 'Warband'})`,
                    type: 'saved',
                    raw: w
                }))
            });
        }
    }

    // Auxiliary / Unrestricted Categories based on fighterType
    if (fighterType === 'Hired Sword') {
        groups.push({
            group: 'Auxiliary & Freelance',
            items: [
                { key: 'all_hired_swords', name: 'Show All Hired Swords (Unrestricted)', type: 'special' }
            ]
        });
    } else if (fighterType === 'Dramatis Personae') {
        groups.push({
            group: 'Auxiliary & Freelance',
            items: [
                { key: 'all_dramatis_personae', name: 'Show All Dramatis Personae (Unrestricted)', type: 'special' }
            ]
        });
    } else if (fighterType === 'Vehicle') {
        groups.push({
            group: 'Auxiliary & Freelance',
            items: [
                { key: 'all_vehicles', name: 'Show All Vehicles (Unrestricted)', type: 'special' }
            ]
        });
    } else if (!fighterType) {
        // Fallback when fighterType is not provided
        groups.push({
            group: 'Auxiliary & Freelance',
            items: [
                { key: 'hired_swords', name: 'Hired Swords (All)', type: 'special' },
                { key: 'dramatis_personae', name: 'Dramatis Personae (All)', type: 'special' },
                { key: 'vehicles', name: 'Vehicles & Mounts', type: 'special' }
            ]
        });
    }

    return groups;
}

/**
 * Retrieves list of fighters for a selected warband key
 * @param {string} warbandKey
 * @param {string|null} [fighterType=null]
 * @returns {Array<{ id: string, name: string, type: string, subtitle?: string, cost?: number, raw: object, warbandName?: string, warbandRace?: string }>}
 */
export function getFightersForWarbandKey(warbandKey, fighterType = null) {
    if (!warbandKey) return [];

    // All / Unrestricted Hired Swords
    if (warbandKey === 'hired_swords' || warbandKey === 'all_hired_swords') {
        return HIRED_SWORDS.flatMap(g => g.characters || []).map(char => ({
            id: `hs_${char.name}`,
            name: char.name,
            type: 'Hired Sword',
            subtitle: `Grade: ${char.grade || 'Hired Sword'} | Fee: ${char.data?.hire_fee || 0}gc`,
            cost: parseInt(char.data?.hire_fee) || 0,
            raw: char
        }));
    }

    // All / Unrestricted Dramatis Personae
    if (warbandKey === 'dramatis_personae' || warbandKey === 'all_dramatis_personae') {
        return DRAMATIS_PERSONAE.flatMap(g => g.characters || []).map(char => ({
            id: `dp_${char.name}`,
            name: char.name,
            type: 'Dramatis Personae',
            subtitle: `Fee: ${char.data?.hire_fee || 0}gc`,
            cost: parseInt(char.data?.hire_fee) || 0,
            raw: char
        }));
    }

    // All / Unrestricted Vehicles
    if (warbandKey === 'vehicles' || warbandKey === 'all_vehicles') {
        return VEHICLES.flatMap(g => g.vehicles || g.characters || []).map(char => ({
            id: `veh_${char.name}`,
            name: char.name,
            type: 'Vehicle',
            subtitle: `Cost: ${char.data?.hire_fee || 0}gc`,
            cost: parseInt(char.data?.hire_fee) || 0,
            raw: char
        }));
    }

    // Saved Warband members (return matching fighters from that saved warband's roster)
    if (warbandKey.startsWith('saved_')) {
        const savedId = warbandKey.replace('saved_', '');
        const savedWarbands = getSavedWarbandsList();
        const foundWarband = savedWarbands.find(w => String(w.id) === String(savedId));
        if (foundWarband && Array.isArray(foundWarband.members)) {
            let list = foundWarband.members;
            if (fighterType) {
                list = list.filter(m => matchesFighterType(m.type, fighterType));
            }
            return list.map(m => {
                const groupSize = (m.type === 'Henchman')
                    ? Math.max(1, (m.group_size || 1) - (m.casualties || 0))
                    : 1;
                const totalCost = calculateFighterOrGroupTotalCost(m);
                const groupLabel = groupSize > 1 ? ` x${groupSize}` : '';
                return {
                    id: `saved_m_${m.id}`,
                    name: m.name || 'Unnamed Fighter',
                    type: m.type || fighterType || 'Hero',
                    groupSize,
                    subtitle: `${m.warrior_choice || m.type}${groupLabel} (XP: ${m.xp || 0})`,
                    cost: totalCost,
                    raw: m,
                    warbandName: foundWarband.name
                };
            });
        }
        return [];
    }

    // Hired Sword filtered for selected warband
    if (fighterType === 'Hired Sword') {
        const wbCtx = resolveWarbandContext(warbandKey);
        if (!wbCtx) return [];
        const warbandData = { name: wbCtx.type || wbCtx.name, alignment: wbCtx.alignment };
        const additionalWarbandIdentities = [];
        if (Array.isArray(wbCtx.members) && wbCtx.members.some(m => m.skills && m.skills.includes('Dog of War'))) {
            additionalWarbandIdentities.push({ name: 'Mercenaries (Reikland)', alignment: 'good' });
        }

        const available = [];
        HIRED_SWORDS.forEach(grade => {
            (grade.characters || []).forEach(char => {
                const validation = canHireCharacter(char.data || {}, warbandData, false, wbCtx.members || [], char.name, additionalWarbandIdentities);
                if (validation.canHire) {
                    available.push({
                        id: `hs_${char.name}`,
                        name: char.name,
                        type: 'Hired Sword',
                        subtitle: `Grade: ${grade.grade || 'Hired Sword'} | Fee: ${char.data?.hire_fee || 0}gc`,
                        cost: parseInt(char.data?.hire_fee) || 0,
                        raw: char,
                        warbandName: wbCtx.name
                    });
                }
            });
        });
        return available;
    }

    // Dramatis Personae filtered for selected warband
    if (fighterType === 'Dramatis Personae') {
        const wbCtx = resolveWarbandContext(warbandKey);
        if (!wbCtx) return [];
        const warbandData = { name: wbCtx.type || wbCtx.name, alignment: wbCtx.alignment };
        const additionalWarbandIdentities = [];
        if (Array.isArray(wbCtx.members) && wbCtx.members.some(m => m.skills && m.skills.includes('Dog of War'))) {
            additionalWarbandIdentities.push({ name: 'Mercenaries (Reikland)', alignment: 'good' });
        }

        const available = [];
        DRAMATIS_PERSONAE.forEach(grade => {
            (grade.characters || []).forEach(char => {
                const validation = canHireCharacter(char.data || {}, warbandData, false, wbCtx.members || [], char.name, additionalWarbandIdentities);
                if (validation.canHire) {
                    available.push({
                        id: `dp_${char.name}`,
                        name: char.name,
                        type: 'Dramatis Personae',
                        subtitle: `Fee: ${char.data?.hire_fee || 0}gc`,
                        cost: parseInt(char.data?.hire_fee) || 0,
                        raw: char,
                        warbandName: wbCtx.name
                    });
                }
            });
        });
        return available;
    }

    // Vehicle filtered for selected warband
    if (fighterType === 'Vehicle') {
        const wbCtx = resolveWarbandContext(warbandKey);
        if (!wbCtx) return [];
        const wbTypeName = wbCtx.type || wbCtx.name;
        const available = [];
        VEHICLES.forEach(grade => {
            (grade.vehicles || grade.characters || []).forEach(char => {
                const mayBeHired = char.data?.may_be_hired;
                let canBeHired = true;
                if (mayBeHired) {
                    const allowedWarbands = mayBeHired.split(';').map(w => w.trim());
                    canBeHired = allowedWarbands.includes(wbTypeName);
                }
                if (canBeHired) {
                    available.push({
                        id: `veh_${char.name}`,
                        name: char.name,
                        type: 'Vehicle',
                        subtitle: `Cost: ${char.data?.hire_fee || 0}gc`,
                        cost: parseInt(char.data?.hire_fee) || 0,
                        raw: char,
                        warbandName: wbCtx.name
                    });
                }
            });
        });
        return available;
    }

    // Official Warband warriors
    if (warbandKey.startsWith('wb_')) {
        const wbName = warbandKey.replace('wb_', '');
        const allWbs = WARBANDS.flatMap(g => g.warbands || []);
        const found = allWbs.find(w => w.name === wbName);
        if (found && found.data && Array.isArray(found.data.warriors)) {
            let warriors = found.data.warriors;
            if (fighterType === 'Hero') {
                warriors = warriors.filter(w => (w.type || '').toLowerCase() === 'hero');
            } else if (fighterType === 'Henchman') {
                warriors = warriors.filter(w => (w.type || '').toLowerCase() === 'henchman');
            }
            return warriors.map(w => {
                const isHero = (w.type || '').toLowerCase() === 'hero';
                return {
                    id: `warrior_${w.name}`,
                    name: w.name,
                    type: isHero ? 'Hero' : 'Henchman',
                    subtitle: `${isHero ? 'Hero' : 'Henchman'} | Cost: ${w.hire_fee || 0}gc`,
                    cost: parseInt(w.hire_fee) || 0,
                    raw: w,
                    warbandName: found.name,
                    warbandRace: found.data.Race
                };
            });
        }
    }

    return [];
}

/**
 * Builds a complete fighter card object from the user's selection
 * @param {string} warbandKey
 * @param {string} fighterOptionId
 * @param {string} [customName='']
 * @param {string|null} [fighterType=null]
 * @returns {object|null}
 */
export function createFighterCardFromSelection(warbandKey, fighterOptionId, customName = '', fighterType = null) {
    const fighters = getFightersForWarbandKey(warbandKey, fighterType);
    const selected = fighters.find(f => f.id === fighterOptionId);
    if (!selected) return null;

    const trimmedCustom = (customName || '').trim();
    const uniqueId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    // If copied from an existing saved warband fighter (not a special external type)
    if (selected.id.startsWith('saved_m_')) {
        const orig = selected.raw;
        return {
            ...JSON.parse(JSON.stringify(orig)),
            id: uniqueId,
            name: trimmedCustom || orig.name || selected.name,
            fromSavedWarband: true,
            isTemplateCard: false,
            warband_name: orig.warband_name || selected.warbandName || 'Warband',
            warband_key: warbandKey
        };
    }

    // Hired Sword
    if (selected.type === 'Hired Sword' || warbandKey === 'hired_swords' || warbandKey === 'all_hired_swords') {
        const char = selected.raw;
        const data = char.data || {};
        const equipment = (data.initial_equipment || []).map(id => {
            const eq = MASTER_EQUIPMENT_LIST.find(e => e.id === id);
            return eq ? { name: eq.name, cost: eq.baseCost || 0, category: eq.category || 'Hand-to-Hand Weapons' } : null;
        }).filter(Boolean);

        const wbName = selected.warbandName || 'Hired Sword';

        return sanitizeCustomCard({
            id: uniqueId,
            name: trimmedCustom || char.name,
            originalName: char.name,
            warrior_choice: char.name,
            warband_name: wbName,
            type: 'Hired Sword',
            race: data.race || 'Human',
            cost: parseInt(data.hire_fee) || 0,
            cost_type: 'GC',
            hire_fee: parseInt(data.hire_fee) || 0,
            upkeep_fee: parseInt(data.upkeep_fee) || 0,
            rating: parseInt(data.rating) || 0,
            xp: parseInt(data.rating) || 0,
            starting_xp: parseInt(data.rating) || 0,
            stats: data.stats || { M: 4, WS: 3, BS: 3, S: 3, T: 3, W: 1, I: 3, A: 1, Ld: 7 },
            equipment,
            skills: Array.isArray(data.starting_skills) ? data.starting_skills : [],
            special_rules: data.rules || data.special_rules || '',
            injuries: [],
            warband_key: warbandKey,
            notes: wbName !== 'Hired Sword' ? `Hired Sword (${wbName})` : 'Hired Sword',
            isTemplateCard: true
        });
    }

    // Dramatis Personae
    if (selected.type === 'Dramatis Personae' || warbandKey === 'dramatis_personae' || warbandKey === 'all_dramatis_personae') {
        const char = selected.raw;
        const data = char.data || {};
        const equipment = (data.initial_equipment || []).map(id => {
            const eq = MASTER_EQUIPMENT_LIST.find(e => e.id === id);
            return eq ? { name: eq.name, cost: eq.baseCost || 0, category: eq.category || 'Hand-to-Hand Weapons' } : null;
        }).filter(Boolean);

        const wbName = selected.warbandName || 'Dramatis Personae';

        return sanitizeCustomCard({
            id: uniqueId,
            name: trimmedCustom || char.name,
            originalName: char.name,
            warrior_choice: char.name,
            warband_name: wbName,
            warband_key: warbandKey,
            type: 'Dramatis Personae',
            race: data.race || 'Human',
            cost: parseInt(data.hire_fee) || 0,
            cost_type: 'GC',
            hire_fee: parseInt(data.hire_fee) || 0,
            upkeep_fee: parseInt(data.upkeep_fee) || 0,
            rating: parseInt(data.rating) || 0,
            xp: 0,
            starting_xp: 0,
            stats: data.stats || { M: 4, WS: 4, BS: 4, S: 4, T: 4, W: 2, I: 4, A: 2, Ld: 8 },
            equipment,
            skills: Array.isArray(data.starting_skills) ? data.starting_skills : [],
            special_rules: data.special_rules || data.rules || '',
            injuries: [],
            notes: wbName !== 'Dramatis Personae' ? `Dramatis Personae (${wbName})` : 'Dramatis Personae',
            isTemplateCard: true
        });
    }

    // Vehicle
    if (selected.type === 'Vehicle' || warbandKey === 'vehicles' || warbandKey === 'all_vehicles') {
        const char = selected.raw;
        const data = char.data || {};
        const equipment = (data.initial_equipment || []).map(id => {
            const eq = MASTER_EQUIPMENT_LIST.find(e => e.id === id);
            return eq ? { name: eq.name, cost: eq.baseCost || 0, category: eq.category || 'Hand-to-Hand Weapons' } : null;
        }).filter(Boolean);

        const wbName = selected.warbandName || 'Vehicle';

        return sanitizeCustomCard({
            id: uniqueId,
            name: trimmedCustom || char.name,
            originalName: char.name,
            warrior_choice: char.name,
            warband_name: wbName,
            warband_key: warbandKey,
            type: 'Vehicle',
            cost: parseInt(data.hire_fee) || 0,
            cost_type: 'GC',
            stats: data.stats || {},
            equipment,
            skills: [],
            special_rules: data.special_rules || '',
            injuries: [],
            notes: wbName !== 'Vehicle' ? `Vehicle (${wbName})` : 'Vehicle',
            isTemplateCard: true
        });
    }

    // Official Warband Warrior
    const w = selected.raw;
    const isHero = selected.type === 'Hero';
    const wbName = selected.warbandName || warbandKey.replace('wb_', '');

    const equipment = [];
    const SKILL_CATEGORY_NAMES = new Set(['Combat', 'Shooting', 'Academic', 'Strength', 'Speed', 'Special']);
    const startingSkills = (Array.isArray(w.starting_skills) ? w.starting_skills : (Array.isArray(w.skills) ? w.skills : []))
        .filter(s => typeof s === 'string' && !SKILL_CATEGORY_NAMES.has(s) && s.toLowerCase() !== 'leader');

    return sanitizeCustomCard({
        id: uniqueId,
        name: trimmedCustom || w.name,
        warrior_choice: w.name,
        warband_name: wbName,
        warband_key: warbandKey,
        type: isHero ? 'Hero' : 'Henchman',
        race: w.race || selected.warbandRace || 'Human',
        cost: parseInt(w.hire_fee) || 0,
        cost_type: 'GC',
        xp: parseInt(w.exp) || 0,
        starting_xp: parseInt(w.exp) || 0,
        group_size: 1,
        casualties: 0,
        stats: w.stats || { M: 4, WS: 3, BS: 3, S: 3, T: 3, W: 1, I: 3, A: 1, Ld: 7 },
        equipment,
        skills: startingSkills,
        special_rules: w.rules || w.special_rules || '',
        injuries: [],
        notes: `${wbName} - ${w.name}`,
        isTemplateCard: true
    });
}
