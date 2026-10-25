import { MASTER_INJURY_LIST } from '../data/index.js';
import { STATS_FIELDS } from '../config.js';
import { getWarbandData, calculateWarbandRating, showMessage, displayModal, hideModal } from '../utility.js';
import { currentWarband } from '../state.js';
import { saveWarband } from '../warband-service.js';
import { isSicknessCasualty, markAsSicknessCasualty, removeSicknessInjury, showInjurySelectionModal, checkForAdvancement } from '../ui.js';
import { trackEvent } from '../analytics.js';

// End Battle state variables
let battleResult = null;
let casualtyResolutions = new Map(); // fighterId -> { injury: string, removed: boolean }

// Initialize window references for cross-module access
window.battleResult = null;

// Note: battleCasualties and sicknessCasualties remain in ui.js as they're used by battle view functions
// Access them via window.battleCasualties and window.sicknessCasualties

/** Gets the current warband leader */
const getWarbandLeader = () => {
    if (!currentWarband || !currentWarband.members) return null;
    
    return currentWarband.members.find(member => 
        member.type === 'Hero' && 
        member.special_rules && 
        member.special_rules.includes('Leader')
    );
};

/** Gets the current battle result from the UI state */
const getCurrentBattleResult = () => {
    const resultText = document.getElementById('battle-result-text').textContent;
    if (resultText.includes('Victory')) return 'victory';
    if (resultText.includes('Defeat')) return 'defeat';
    return null;
};

/** Calculates the underdog bonus based on rating difference */
const calculateUnderdogBonus = () => {
    const underdogEnabled = document.getElementById('xp-underdog')?.checked ?? false;
    if (!underdogEnabled) return 0;
    
    const opponentRating = parseInt(document.getElementById('opponent-rating')?.value) || 0;
    const yourRating = calculateWarbandRating(currentWarband.members);
    const difference = yourRating - opponentRating;
    
    // Apply bonus table: only underdogs (your rating lower than opponent) get bonuses
    if (difference >= 0) return 0; // Not an underdog (your rating is equal or higher)
    
    const absDifference = Math.abs(difference);
    
    if (absDifference >= 0 && absDifference <= 50) return 0;
    if (absDifference >= 51 && absDifference <= 75) return 1;
    if (absDifference >= 76 && absDifference <= 100) return 2;
    if (absDifference >= 101 && absDifference <= 150) return 3;
    if (absDifference >= 151 && absDifference <= 300) return 4;
    if (absDifference >= 301) return 5;
    
    return 0;
};

/** Updates the underdog rating display */
export const updateUnderdogRatingDisplay = () => {
    const opponentRating = parseInt(document.getElementById('opponent-rating')?.value) || 0;
    const yourRating = calculateWarbandRating(currentWarband.members);
    const difference = yourRating - opponentRating; // Your rating minus opponent rating
    const bonus = calculateUnderdogBonus();
    
    // Update displays
    document.getElementById('your-rating').textContent = yourRating;
    document.getElementById('rating-difference').textContent = difference > 0 ? `+${difference}` : difference;
    
    // Update bonus display
    const bonusDisplay = document.getElementById('underdog-bonus-display');
    if (bonus > 0) {
        bonusDisplay.innerHTML = `<span class="text-green-400 font-semibold">Underdog Bonus: +${bonus} experience per eligible fighter</span>`;
        bonusDisplay.className = 'mt-2 text-center text-sm text-green-400';
    } else {
        bonusDisplay.innerHTML = '<span class="text-slate-500">No underdog bonus (your warband rating is equal or higher)</span>';
        bonusDisplay.className = 'mt-2 text-center text-sm text-slate-500';
    }
};

/** Calculates experience based on selected options */
const calculateExperienceFromOptions = (fighter) => {
    let survivalXP = 0;
    let leaderXP = 0;
    let killXP = 0;
    let underdogXP = 0;
    
    // Get checkbox states
    const survivalEnabled = document.getElementById('xp-survival')?.checked ?? true;
    const winningLeaderEnabled = document.getElementById('xp-winning-leader')?.checked ?? true;
    const perEnemyEnabled = document.getElementById('xp-per-enemy')?.checked ?? true;
    
    // Get current battle result
    const currentBattleResult = getCurrentBattleResult();
    
    // +1 Survival
    if (survivalEnabled) {
        survivalXP = 1;
    }
    
    // +1 Winning Leader (only if victory and fighter is the leader)
    if (winningLeaderEnabled && currentBattleResult === 'victory') {
        const leader = getWarbandLeader();
        if (leader && leader.id === fighter.id) {
            leaderXP = 1;
        }
    }
    
    // +1 Per Enemy Out of Action
    if (perEnemyEnabled) {
        const kills = fighter.kills || 0;
        killXP = kills * 1;
    }
    
    // Underdog bonus (applies to Heroes, Hired Swords, Dramatis Personae, Vehicles, and Henchmen who can gain experience)
    const underdogBonus = calculateUnderdogBonus();
    if (underdogBonus > 0) {
        // Check if fighter can gain experience (not being removed)
        const resolution = casualtyResolutions.get(fighter.id);
        if (!resolution || !resolution.removed) {
            underdogXP = underdogBonus;
        }
    }
    
    return { survivalXP, leaderXP, killXP, underdogXP, totalXP: survivalXP + leaderXP + killXP + underdogXP };
};

/** Shows the End Battle modal */
export const showEndBattleModal = () => {
    if (!currentWarband) return;
    
    // Reset state
    battleResult = null;
    casualtyResolutions.clear();
    
    // Reset modal UI
    document.getElementById('battle-result-text').textContent = 'Select battle result to continue';
    document.getElementById('casualties-section').classList.add('hidden');
    document.getElementById('experience-section').classList.add('hidden');
    document.getElementById('confirm-end-battle-btn').disabled = true;
    
    // Reset experience options to enabled by default
    document.getElementById('xp-survival').checked = true;
    document.getElementById('xp-winning-leader').checked = true;
    document.getElementById('xp-per-enemy').checked = true;
    document.getElementById('xp-underdog').checked = true;
    
    // Set opponent rating to equal your warband rating by default
    const yourRating = calculateWarbandRating(currentWarband.members);
    document.getElementById('opponent-rating').value = yourRating;
    
    // Initialize underdog rating display
    updateUnderdogRatingDisplay();
    
    // Show modal
    displayModal('end-battle-modal');
};

/** Sets the battle result and shows casualties section */
export const setBattleResult = (result) => {
    battleResult = result;
    window.battleResult = result; // Update window reference for ui.js
    
    // Update UI
    const resultText = result === 'victory' ? 'Victory! Your warband was victorious.' : 'Defeat. Your warband was defeated.';
    document.getElementById('battle-result-text').textContent = resultText;
    
    // Show casualties section if there are any casualties
    const { individualFighters, henchmenGroups } = getFightersWithCasualties();
    const allCasualties = [...individualFighters, ...henchmenGroups];
    if (allCasualties.length > 0) {
        renderCasualtiesSection(individualFighters, henchmenGroups);
        document.getElementById('casualties-section').classList.remove('hidden');
    } else {
        document.getElementById('casualties-section').classList.add('hidden');
    }
    
    // Always show experience section
    renderExperienceSection();
    document.getElementById('experience-section').classList.remove('hidden');
    
    // Enable confirm button
    document.getElementById('confirm-end-battle-btn').disabled = false;
};

/** Gets fighters who have taken casualties */
export const getFightersWithCasualties = () => {
    if (!currentWarband || !currentWarband.members) return {
        individualFighters: [],
        henchmenGroups: []
    };
    
    const individualFighters = [];
    const henchmenGroups = [];
    
    currentWarband.members.forEach(fighter => {
        // battleCasualties is imported from ui.js
        const casualtyCount = window.battleCasualties?.get(fighter.id) || 0;
        if (casualtyCount > 0) {
            if (fighter.type === 'Henchman') {
                henchmenGroups.push(fighter);
            } else {
                // Only Heroes, Hired Swords, and Dramatis Personae can get injuries
                individualFighters.push(fighter);
            }
        }
    });
    
    return { individualFighters, henchmenGroups };
};

/** Renders the casualties resolution section */
const renderCasualtiesSection = (individualFighters, henchmenGroups) => {
    const container = document.getElementById('casualties-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Render individual fighters (Heroes, Hired Swords, Dramatis Personae)
    individualFighters.forEach(fighter => {
        // battleCasualties is imported from ui.js
        const casualtyCount = window.battleCasualties?.get(fighter.id) || 0;
        const resolution = casualtyResolutions.get(fighter.id) || { injury: null, removed: false };
        const isSickness = isSicknessCasualty(fighter.id);
        
        const casualtyDiv = document.createElement('div');
        casualtyDiv.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600';
        
        if (isSickness) {
            // Special handling for sickness casualties
            casualtyDiv.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h5 class="font-semibold text-mordheim-gold">${fighter.name}</h5>
                        <p class="text-sm text-slate-400">${fighter.type} - ${casualtyCount} casualty(ies)</p>
                        <p class="text-sm text-orange-400">Sickness Casualty</p>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <p class="text-slate-300 mb-3">Is ${fighter.name} still sick?</p>
                    <div class="flex space-x-3">
                        <button class="sickness-recovered-btn px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition" 
                                data-fighter-id="${fighter.id}" data-fighter-name="${fighter.name}">
                            No - Recovered
                        </button>
                        <button class="sickness-still-sick-btn px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition" 
                                data-fighter-id="${fighter.id}" data-fighter-name="${fighter.name}">
                            Yes - Still Sick
                        </button>
                    </div>
                    <div id="sickness-resolution-${fighter.id}" class="mt-2 text-sm text-slate-400"></div>
                </div>
            `;
            
            // Add event listeners for sickness resolution
            const recoveredBtn = casualtyDiv.querySelector('.sickness-recovered-btn');
            const stillSickBtn = casualtyDiv.querySelector('.sickness-still-sick-btn');
            const resolutionDiv = casualtyDiv.querySelector(`#sickness-resolution-${fighter.id}`);
            
            // Track selection state for this fighter
            let currentSelection = null;
            
            recoveredBtn.addEventListener('click', () => {
                // Update selection
                currentSelection = 'recovered';
                
                // Update button states
                recoveredBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                recoveredBtn.classList.add('bg-green-700', 'ring-2', 'ring-green-400');
                stillSickBtn.classList.remove('bg-orange-700', 'ring-2', 'ring-orange-400');
                stillSickBtn.classList.add('bg-orange-600', 'hover:bg-orange-700');
                
                // Update status display
                resolutionDiv.textContent = 'Selected: Recovered - Sickness injury will be removed';
                resolutionDiv.className = 'mt-2 text-sm text-green-400 font-semibold';
                
                console.log(`${fighter.name} marked as recovered in casualty resolution`);
            });
            
            stillSickBtn.addEventListener('click', () => {
                // Update selection
                currentSelection = 'still-sick';
                
                // Update button states
                stillSickBtn.classList.remove('bg-orange-600', 'hover:bg-orange-700');
                stillSickBtn.classList.add('bg-orange-700', 'ring-2', 'ring-orange-400');
                recoveredBtn.classList.remove('bg-green-700', 'ring-2', 'ring-green-400');
                recoveredBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                
                // Update status display
                resolutionDiv.textContent = 'Selected: Still Sick - Sickness injury will be kept';
                resolutionDiv.className = 'mt-2 text-sm text-orange-400 font-semibold';
                
                console.log(`${fighter.name} marked as still sick in casualty resolution`);
            });
            
        } else {
            // Normal casualty handling
            const injuryDisplay = resolution.injury ? `
                <div class="ml-6 p-2 bg-slate-700 rounded">
                    <span class="text-yellow-200">${resolution.injury}</span>
                    <button onclick="changeInjury('${fighter.id}')" class="ml-2 text-blue-400 hover:text-blue-300">
                        <i class="fas fa-edit"></i> Change
                    </button>
                </div>
            ` : `
                <div class="ml-6">
                    <button onclick="selectInjury('${fighter.id}')" 
                            class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                        Select Injury
                    </button>
                </div>
            `;
            
            casualtyDiv.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h5 class="font-semibold text-mordheim-gold">${fighter.name}</h5>
                        <p class="text-sm text-slate-400">${fighter.type} - ${casualtyCount} casualty(ies)</p>
                    </div>
                </div>
                
                <div class="space-y-2">
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="casualty-${fighter.id}" value="no-injury" 
                               ${!resolution.injury && !resolution.removed ? 'checked' : ''}
                               class="text-mordheim-gold focus:ring-mordheim-gold">
                        <span class="text-slate-300">No injury</span>
                    </label>
                    
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="casualty-${fighter.id}" value="injury" 
                               ${resolution.injury ? 'checked' : ''}
                               class="text-mordheim-gold focus:ring-mordheim-gold">
                        <span class="text-slate-300">Select injury</span>
                    </label>
                    
                    ${injuryDisplay}
                    
                    <label class="flex items-center space-x-2">
                        <input type="radio" name="casualty-${fighter.id}" value="remove" 
                               ${resolution.removed ? 'checked' : ''}
                               class="text-mordheim-gold focus:ring-mordheim-gold">
                        <span class="text-slate-300">Remove from warband</span>
                    </label>
                </div>
            `;
        }
        
        // Add event listeners for radio buttons
        const radioButtons = casualtyDiv.querySelectorAll(`input[name="casualty-${fighter.id}"]`);
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                updateCasualtyResolution(fighter.id, radio.value);
            });
        });
        
        container.appendChild(casualtyDiv);
    });
    
    // Render henchmen groups
    henchmenGroups.forEach(henchmenGroup => {
        // battleCasualties is imported from ui.js
        const casualtyCount = window.battleCasualties?.get(henchmenGroup.id) || 0;
        const originalGroupSize = henchmenGroup.group_size || 1;
        const resolution = casualtyResolutions.get(henchmenGroup.id) || { deadCount: 0 };
        const remainingSize = originalGroupSize - resolution.deadCount;
        
        const henchmenDiv = document.createElement('div');
        henchmenDiv.className = 'bg-slate-800 p-4 rounded-lg border border-slate-600';
        
        henchmenDiv.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h5 class="font-semibold text-mordheim-gold">${henchmenGroup.name}</h5>
                    <p class="text-sm text-slate-400">Henchmen Group - ${originalGroupSize} members, ${casualtyCount} casualties</p>
                </div>
            </div>
            
            <div class="space-y-3">
                <div class="flex items-center space-x-4">
                    <label class="text-slate-300">Number to remove (dead):</label>
                    <input type="number" inputmode="numeric"
                           id="dead-count-${henchmenGroup.id}" 
                           value="${resolution.deadCount}" 
                           min="0" 
                           max="${casualtyCount}"
                           class="w-20 p-2 rounded bg-slate-700 border border-slate-600 text-white text-center">
                    <span class="text-sm text-slate-400">of ${casualtyCount} casualties</span>
                </div>
                
                <div class="text-sm text-slate-300">
                    <span>Original size: ${originalGroupSize}</span>
                    <span class="mx-2">→</span>
                    <span class="${remainingSize > 0 ? 'text-green-400' : 'text-red-400'}">
                        Remaining: ${remainingSize}
                    </span>
                </div>
                
                ${remainingSize === 0 ? '<div class="text-sm text-red-400">Group will be removed from warband</div>' : ''}
            </div>
        `;
        
        container.appendChild(henchmenDiv);
        
        // Add event listener for dead count input
        const deadCountInput = henchmenDiv.querySelector(`#dead-count-${henchmenGroup.id}`);
        deadCountInput.addEventListener('input', (e) => {
            updateHenchmenCasualtyResolution(henchmenGroup.id, parseInt(e.target.value) || 0);
        });
        deadCountInput.addEventListener('focus', () => deadCountInput.select());
    });
};

/** Updates casualty resolution for a fighter */
export const updateCasualtyResolution = (fighterId, resolution) => {
    const current = casualtyResolutions.get(fighterId) || { injury: null, removed: false };
    
    if (resolution === 'no-injury') {
        casualtyResolutions.set(fighterId, { injury: null, removed: false });
    } else if (resolution === 'injury') {
        // Keep existing injury or prompt to select one
        if (!current.injury) {
            selectInjury(fighterId);
        } else {
            casualtyResolutions.set(fighterId, { injury: current.injury, removed: false });
        }
    } else if (resolution === 'remove') {
        casualtyResolutions.set(fighterId, { injury: null, removed: true });
    }
    
    // Update experience distribution dynamically
    renderExperienceSection();
};

/** Updates casualty resolution for henchmen groups */
const updateHenchmenCasualtyResolution = (henchmenId, deadCount) => {
    // battleCasualties is imported from ui.js
    const casualtyCount = window.battleCasualties?.get(henchmenId) || 0;
    const henchmen = currentWarband.members.find(f => f.id === henchmenId);
    const originalGroupSize = henchmen ? (henchmen.group_size || 1) : 1;
    
    // Validate dead count
    const validDeadCount = Math.max(0, Math.min(deadCount, casualtyCount, originalGroupSize));
    
    casualtyResolutions.set(henchmenId, { deadCount: validDeadCount });
    
    // Re-render casualties section to update remaining size display
    const { individualFighters, henchmenGroups } = getFightersWithCasualties();
    renderCasualtiesSection(individualFighters, henchmenGroups);
    
    // Update experience distribution dynamically
    renderExperienceSection();
};

/** Opens injury selection modal for a fighter */
export const selectInjury = (fighterId) => {
    // Store the current fighter ID for the injury selection
    window.currentEndBattleFighterId = fighterId;
    
    // Show injury selection modal
    showInjurySelectionModal();
    
    // After the modal is shown, override the onclick handlers for injury elements
    setTimeout(() => {
        const injuryElements = document.querySelectorAll('#injury-selection-options > div');
        
        injuryElements.forEach((element) => {
            // Get the injury name from the element content
            const injuryName = element.querySelector('p.font-semibold')?.textContent;
            
            // Override the onclick handler
            element.onclick = () => {
                // Update casualty resolution with selected injury
                const current = casualtyResolutions.get(fighterId) || { injury: null, removed: false };
                casualtyResolutions.set(fighterId, { injury: injuryName, removed: false });
                
                // Re-render casualties section to show selected injury
                const { individualFighters, henchmenGroups } = getFightersWithCasualties();
                renderCasualtiesSection(individualFighters, henchmenGroups);
                
                // Update experience distribution dynamically
                renderExperienceSection();
                
                // Close the modal
                hideModal('injury-selection-modal');
            };
        });
    }, 100); // Small delay to ensure modal is rendered
};

/** Changes injury for a fighter */
export const changeInjury = (fighterId) => {
    selectInjury(fighterId);
};

/** Renders the experience distribution section */
export const renderExperienceSection = () => {
    const container = document.getElementById('experience-list');
    container.innerHTML = '';
    
    let totalExperience = 0;
    
    if (currentWarband && currentWarband.members) {
        // Process individual fighters (Heroes, Hired Swords, Dramatis Personae, Vehicles)
        currentWarband.members.forEach(fighter => {
            if (fighter.type === 'Henchman') return;
            
            // Check if fighter can gain experience (Heroes, Hired Swords, Dramatis Personae, Vehicles)
            if (!['Hero', 'Hired Sword', 'Dramatis Personae', 'Vehicle'].includes(fighter.type)) return;
            
            // Check if fighter is being removed
            const resolution = casualtyResolutions.get(fighter.id);
            if (resolution && resolution.removed) return;
            
            // Check if fighter is a sickness casualty (no experience for sickness casualties)
            if (isSicknessCasualty(fighter.id)) return;
            
            // Calculate experience using the new options-based system
            const { survivalXP, leaderXP, killXP, underdogXP, totalXP } = calculateExperienceFromOptions(fighter);
            
            if (totalXP > 0) {
                totalExperience += totalXP;
                
                const xpDiv = document.createElement('div');
                xpDiv.className = 'bg-slate-800 p-3 rounded-lg border border-slate-600';
                
                // Build experience breakdown display
                let xpBreakdown = '';
                if (survivalXP > 0) xpBreakdown += `<span class="text-green-400 text-sm">+${survivalXP} survival</span>`;
                if (leaderXP > 0) xpBreakdown += `${xpBreakdown ? ' ' : ''}<span class="text-yellow-400 text-sm">+${leaderXP} leader</span>`;
                if (killXP > 0) xpBreakdown += `${xpBreakdown ? ' ' : ''}<span class="text-blue-400 text-sm">+${killXP} kills</span>`;
                if (underdogXP > 0) xpBreakdown += `${xpBreakdown ? ' ' : ''}<span class="text-purple-400 text-sm">+${underdogXP} underdog</span>`;
                
                xpDiv.innerHTML = `
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="font-semibold text-mordheim-gold">${fighter.name}</span>
                            <span class="text-sm text-slate-400 ml-2">(${fighter.type})</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            ${xpBreakdown}
                            <input type="number" inputmode="numeric"
                                   id="xp-${fighter.id}" 
                                   value="${totalXP}" 
                                   min="0" 
                                   max="99"
                                   class="w-16 p-1 rounded bg-slate-700 border border-slate-600 text-white text-center">
                        </div>
                    </div>
                `;
                container.appendChild(xpDiv);
                
                // Add event listener for XP input changes
                const xpInput = xpDiv.querySelector(`#xp-${fighter.id}`);
                xpInput.addEventListener('input', () => {
                    updateTotalExperience();
                });
                xpInput.addEventListener('focus', () => xpInput.select());
            }
        });
        
        // Process surviving henchmen groups
        currentWarband.members.forEach(henchmenGroup => {
            if (henchmenGroup.type !== 'Henchman') return;
            
            // battleCasualties is imported from ui.js
            const casualtyCount = window.battleCasualties?.get(henchmenGroup.id) || 0;
            const resolution = casualtyResolutions.get(henchmenGroup.id) || { deadCount: 0 };
            const originalGroupSize = henchmenGroup.group_size || 1;
            const remainingSize = originalGroupSize - resolution.deadCount;
            
            // Only include if group survives (has at least 1 member)
            if (remainingSize >= 1) {
                // Get survival XP option state
                const survivalEnabled = document.getElementById('xp-survival')?.checked ?? true;
                const survivalXP = survivalEnabled ? 1 : 0;
                
                // Get underdog bonus
                const underdogBonus = calculateUnderdogBonus();
                const underdogXP = underdogBonus > 0 ? underdogBonus : 0;
                const totalXP = survivalXP + underdogXP;
                
                if (totalXP > 0) {
                    totalExperience += totalXP;
                    
                    const xpDiv = document.createElement('div');
                    xpDiv.className = 'bg-slate-800 p-3 rounded-lg border border-slate-600';
                    
                    // Build experience breakdown display
                    let xpBreakdown = '';
                    if (survivalXP > 0) xpBreakdown += `<span class="text-green-400 text-sm">+${survivalXP} survival</span>`;
                    if (underdogXP > 0) xpBreakdown += `${xpBreakdown ? ' ' : ''}<span class="text-purple-400 text-sm">+${underdogXP} underdog</span>`;
                    
                    xpDiv.innerHTML = `
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="font-semibold text-mordheim-gold">${henchmenGroup.name}</span>
                                <span class="text-sm text-slate-400 ml-2">(Henchmen Group - ${remainingSize}/${originalGroupSize})</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                ${xpBreakdown}
                                <input type="number" inputmode="numeric"
                                       id="xp-${henchmenGroup.id}" 
                                       value="${totalXP}" 
                                       min="0" 
                                       max="99"
                                       class="w-16 p-1 rounded bg-slate-700 border border-slate-600 text-white text-center">
                            </div>
                        </div>
                    `;
                    container.appendChild(xpDiv);
                    
                    // Add event listener for XP input changes
                    const xpInput = xpDiv.querySelector(`#xp-${henchmenGroup.id}`);
                    xpInput.addEventListener('input', () => {
                        updateTotalExperience();
                    });
                    xpInput.addEventListener('focus', () => xpInput.select());
                }
            }
        });
    }
    
    // Update total experience display
    document.getElementById('total-experience').textContent = totalExperience;
};

/** Updates the total experience display */
const updateTotalExperience = () => {
    let total = 0;
    
    if (currentWarband && currentWarband.members) {
        currentWarband.members.forEach(fighter => {
            // Check if fighter is being removed
            const resolution = casualtyResolutions.get(fighter.id);
            if (resolution) {
                // Handle individual fighters
                if (fighter.type !== 'Henchman' && resolution.removed) return;
                // Handle henchmen groups
                if (fighter.type === 'Henchman') {
                    // battleCasualties is imported from ui.js
                    const casualtyCount = window.battleCasualties?.get(fighter.id) || 0;
                    if (casualtyCount === 0) return; // Skip henchmen with no casualties
                    
                    const originalGroupSize = fighter.group_size || 1;
                    const remainingSize = originalGroupSize - (resolution.deadCount || 0);
                    if (remainingSize < 1) return; // Skip removed henchmen groups
                }
            }
            
            const xpInput = document.getElementById(`xp-${fighter.id}`);
            if (xpInput) {
                total += parseInt(xpInput.value) || 0;
            }
        });
    }
    
    document.getElementById('total-experience').textContent = total;
};

/** Shows the post-battle choice modal */
const showPostBattleChoiceModal = () => {
    displayModal('post-battle-choice-modal');
};

/** Processes the end of battle */
export const processBattleEnd = async () => {
    if (!currentWarband || !battleResult) return;
    
    // Track battle ended
    trackEvent('battle_ended', {
        result: battleResult,
        warband_name: currentWarband.name,
        warband_type: currentWarband.type
    });

    // Apply casualties and injuries
    applyCasualtyResolutions();
    
    // Save warband to persist casualty removals
    await saveWarband();
    
    // Apply experience
    applyExperience();
    
    // Reset hero kill counts to 0
    if (currentWarband && currentWarband.members) {
        currentWarband.members.forEach(fighter => {
            if (fighter.type === 'Hero') {
                fighter.kills = 0;
            }
        });
    }
    
    // Close end battle modal and show post-battle choice
    hideModal('end-battle-modal');
    showPostBattleChoiceModal();
    
    // Show success message
    const resultText = battleResult === 'victory' ? 'victory' : 'defeat';
    showMessage(`Battle ended successfully. Your warband suffered a ${resultText}.`, 'success');
    
    // Reset battle state will be called after exploration phase is complete
    // Don't reset here so exploration modal can access casualty data
};

/** Applies casualty resolutions to fighters */
const applyCasualtyResolutions = () => {
    if (!currentWarband || !currentWarband.members) return;
    
    const fightersToRemove = [];
    
    currentWarband.members.forEach(fighter => {
        const resolution = casualtyResolutions.get(fighter.id);
        
        // Handle sickness casualties separately
        if (isSicknessCasualty(fighter.id)) {
            // Check if user selected to remove sickness injury
            const resolutionDiv = document.getElementById(`sickness-resolution-${fighter.id}`);
            if (resolutionDiv) {
                const statusText = resolutionDiv.textContent;
                if (statusText.includes('Recovered')) {
                    // Remove sickness injury
                    removeSicknessInjury(fighter);
                    console.log(`Applied: Removed Sickness injury from ${fighter.name}`);
                } else {
                    // Keep sickness injury - do nothing
                    console.log(`Applied: Kept Sickness injury for ${fighter.name}`);
                }
            }
            return;
        }
        
        if (!resolution) return;
        
        if (fighter.type === 'Henchman') {
            // Handle henchmen group size reduction
            if (resolution.deadCount && resolution.deadCount > 0) {
                const originalGroupSize = fighter.group_size || 1;
                const newGroupSize = originalGroupSize - resolution.deadCount;
                
                if (newGroupSize <= 0) {
                    // Remove entire group
                    fightersToRemove.push(fighter.id);
                } else {
                    // Update group size
                    fighter.group_size = newGroupSize;
                }
            }
        } else {
            // Handle individual fighters
            if (resolution.removed) {
                fightersToRemove.push(fighter.id);
            } else if (resolution.injury) {
                // Add injury to fighter
                if (!fighter.injuries) fighter.injuries = [];
                fighter.injuries.push(resolution.injury);
                
                // Apply injury effects (characteristic modifiers, special rules)
                const injuryData = MASTER_INJURY_LIST.find(i => i.name === resolution.injury);
                if (injuryData) {
                    // Apply characteristic modifiers
                    if (injuryData.characteristicModifiers) {
                        STATS_FIELDS.forEach(stat => {
                            if (injuryData.characteristicModifiers[stat]) {
                                if (!fighter.stat_modifiers) fighter.stat_modifiers = {};
                                fighter.stat_modifiers[stat] = (fighter.stat_modifiers[stat] || 0) + injuryData.characteristicModifiers[stat];
                            }
                        });
                    }
                    
                    // Apply special rules
                    if (injuryData.special_rules && injuryData.special_rules.length > 0) {
                        let rulesArray = [];
                        if (typeof fighter.special_rules === 'string') {
                            // Convert string to array if needed
                            rulesArray = fighter.special_rules.split(';').map(r => r.trim()).filter(rule => rule);
                        } else if (Array.isArray(fighter.special_rules)) {
                            rulesArray = fighter.special_rules;
                        }
                        
                        injuryData.special_rules.forEach(rule => {
                            if (!rulesArray.includes(rule)) {
                                rulesArray.push(rule);
                            }
                        });
                        fighter.special_rules = rulesArray.join('; ');
                    }
                }
            }
        }
    });
    
    // Remove fighters marked for removal
    currentWarband.members = currentWarband.members.filter(f => !fightersToRemove.includes(f.id));
};

/** Applies experience to fighters */
const applyExperience = () => {
    if (!currentWarband || !currentWarband.members) return;
    
    currentWarband.members.forEach(fighter => {
        // Skip experience for sickness casualties
        if (isSicknessCasualty(fighter.id)) {
            console.log(`Skipping experience for ${fighter.name} - sickness casualty`);
            return;
        }
        
        const xpInput = document.getElementById(`xp-${fighter.id}`);
        if (xpInput) {
            const xpToAdd = parseInt(xpInput.value) || 0;
            if (xpToAdd > 0) {
                // Add experience
                fighter.xp = (fighter.xp || 0) + xpToAdd;
                
                // Check for advancement (only for non-henchmen)
                if (fighter.type !== 'Henchman') {
                    checkForAdvancement(fighter);
                }
            }
        }
    });
};

/** Exports for testing and external access */
window.endBattleState = {
    battleResult: () => battleResult,
    casualtyResolutions: () => casualtyResolutions
};

// Make selectInjury and changeInjury globally accessible for onclick handlers
window.selectInjury = selectInjury;
window.changeInjury = changeInjury;

// battleResult is made accessible via window in setBattleResult() for ui.js exploration stats
