import { endBattleState } from '../end-battle-state.js';
import { showBattleSkillDetails } from '../../ui.js';

// ═══════════════════════════════════════════════════════════════════════════════
// Wily Thief Skill Handler
// ═══════════════════════════════════════════════════════════════════════════════
// "If the Thief takes out any members of the enemy warband during a game (and
//  he was not taken Out of Action himself), the Halfling Thief's warband
//  receives one additional Treasure."
// ═══════════════════════════════════════════════════════════════════════════════

export const WilyThiefHandler = {
    skillName: 'Wily Thief',

    /**
     * Returns array of fighters in the warband who have the "wily thief" skill
     * AND were not taken Out of Action (not a battle casualty).
     */
    detect(warband) {
        if (!warband || !warband.members) return [];
        return warband.members.filter(fighter => {
            const hasSkill = Array.isArray(fighter.skills) &&
                fighter.skills.some(s => s.toLowerCase() === 'wily thief');
            if (!hasSkill) return false;

            // Fighter must NOT be a battle casualty (not taken OOA)
            const casualtyCount = window.battleCasualties?.get(fighter.id) || 0;
            return casualtyCount === 0;
        });
    },

    /**
     * Renders the UI cards for each fighter with Wily Thief.
     * @param {HTMLElement} container - The container to render into
     * @param {Array} fighters - Fighters with this skill
     * @param {Function} onStateChange - Callback to re-render after state changes
     */
    render(container, fighters, onStateChange) {
        const state = endBattleState.step8.specialResults;

        fighters.forEach(fighter => {
            const result = state.get(fighter.id);

            const card = document.createElement('div');
            card.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600 mb-3';

            card.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h5 class="font-semibold text-mordheim-gold">${fighter.name}</h5>
                        <p class="text-xs text-slate-300 mt-1">
                            Skill: <span class="underline cursor-pointer text-mordheim-gold hover:text-yellow-300 transition wily-thief-skill-link" data-fighter-id="${fighter.id}">Wily Thief</span>
                        </p>
                        <p class="text-sm text-slate-400">${fighter.type}</p>
                    </div>
                </div>
                <div class="space-y-3">
                    <p class="text-slate-300 font-semibold">Did the Thief take out any enemy warband members?</p>
                    <div class="flex space-x-3">
                        <button class="wily-thief-yes-btn px-4 py-2 rounded-lg font-bold transition
                            ${result?.addTreasure === true ? 'bg-green-600 ring-2 ring-green-400 text-white' : 'bg-slate-700 text-slate-300 hover:bg-green-700 hover:text-white'}"
                            data-fighter-id="${fighter.id}">
                            <i class="fas fa-check mr-1"></i>Yes (+1 Treasure)
                        </button>
                        <button class="wily-thief-no-btn px-4 py-2 rounded-lg font-bold transition
                            ${result?.addTreasure === false ? 'bg-red-600 ring-2 ring-red-400 text-white' : 'bg-slate-700 text-slate-300 hover:bg-red-700 hover:text-white'}"
                            data-fighter-id="${fighter.id}">
                            <i class="fas fa-times mr-1"></i>No
                        </button>
                    </div>
                    ${result?.addTreasure === true ? `
                        <div class="ml-2 mt-2 p-3 bg-green-900/30 rounded-lg border border-green-700">
                            <span class="text-green-400 text-sm">+1 Treasure will be added to the warband</span>
                        </div>
                    ` : ''}
                </div>
            `;
            container.appendChild(card);

            // Skill name click handler
            card.querySelector('.wily-thief-skill-link').addEventListener('click', () => {
                showBattleSkillDetails('wily thief');
            });

            // Yes button handler
            card.querySelector('.wily-thief-yes-btn').addEventListener('click', () => {
                state.set(fighter.id, {
                    skillName: 'Wily Thief',
                    addTreasure: true
                });
                onStateChange();
            });

            // No button handler
            card.querySelector('.wily-thief-no-btn').addEventListener('click', () => {
                state.set(fighter.id, {
                    skillName: 'Wily Thief',
                    addTreasure: false
                });
                onStateChange();
            });
        });
    },

    /**
     * Returns true if all fighters with Wily Thief have a complete resolution.
     */
    isComplete(fighters) {
        const state = endBattleState.step8.specialResults;
        return fighters.every(fighter => {
            const result = state.get(fighter.id);
            if (!result) return false;
            return result.addTreasure === true || result.addTreasure === false;
        });
    },

    /**
     * Returns summary HTML for the Summary step.
     */
    getSummaryHtml(fighters) {
        const state = endBattleState.step8.specialResults;
        let html = '';
        let totalTreasure = 0;

        fighters.forEach(fighter => {
            const result = state.get(fighter.id);
            if (!result) return;

            if (result.addTreasure) {
                totalTreasure += 1;
                html += `<div class="text-green-400 text-sm">${fighter.name} — Wily Thief: +1 Treasure</div>`;
            } else {
                html += `<div class="text-slate-400 text-sm">${fighter.name} — Wily Thief: No bonus</div>`;
            }
        });

        if (totalTreasure > 0) {
            html += `<div class="text-sm font-bold text-mordheim-gold mt-1">Total Wily Thief Treasure: +${totalTreasure}</div>`;
        }

        return html;
    }
};
