import { HIRED_SWORDS } from './data/hired_swords.js';
import { DRAMATIS_PERSONAE } from './data/dramatis_personae.js';
import { WARBANDS } from './data/warbands.js';
import { MASTER_EQUIPMENT_LIST } from './data/equipment.js';
import { SKILLS } from './data/skills.js';
import { findSkillForWarband } from './skill-lookup.js';
import { SPECIAL_RULES_DETAILS } from './data/special_rules.js';
import { displayModal, hideModal } from './utility.js';

class CharacterReviewModal {
    constructor() {
        this.currentCharacterType = null;
        this.currentCharacters = [];
        this.warbandList = [];
        this.gradeList = [];
        
        this.initializeEventListeners();
        this.populateWarbandFilter();
    }

    initializeEventListeners() {
        // Character type buttons - dropdown handling is now in event-handlers.js
        const hiredSwordBtn = document.getElementById('hired-sword-review-btn');
        const dramatisPersonaeBtn = document.getElementById('dramatis-personae-review-btn');

        // Character type buttons
        hiredSwordBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openModal('hired-sword');
        });

        dramatisPersonaeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openModal('dramatis-personae');
        });

        // Modal controls
        document.getElementById('close-character-review-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // Filter controls
        document.getElementById('alignment-filter').addEventListener('change', () => {
            this.filterCharacters();
        });

        document.getElementById('warband-filter').addEventListener('change', () => {
            this.filterCharacters();
        });

        document.getElementById('grade-filter').addEventListener('change', () => {
            this.filterCharacters();
        });

        // Close modal on background click
        document.getElementById('character-review-modal').addEventListener('click', (e) => {
            if (e.target.id === 'character-review-modal') {
                this.closeModal();
            }
        });

        // Event delegation for skill and rule links
        document.getElementById('character-list').addEventListener('click', (e) => {
            if (e.target.classList.contains('skill-link')) {
                this.showSkillDescription(e.target.dataset.skill);
            } else if (e.target.classList.contains('rule-link')) {
                this.showRuleDescription(e.target.dataset.rule);
            }
        });
    }

    populateWarbandFilter() {
        const warbandFilter = document.getElementById('warband-filter');
        
        // Extract all unique warband names
        const allWarbands = new Set();
        WARBANDS.forEach(grade => {
            grade.warbands.forEach(warband => {
                allWarbands.add(warband.name);
            });
        });

        this.warbandList = Array.from(allWarbands).sort();
        
        // Populate dropdown
        this.warbandList.forEach(warbandName => {
            const option = document.createElement('option');
            option.value = warbandName;
            option.textContent = warbandName;
            warbandFilter.appendChild(option);
        });
    }

    openModal(characterType) {
        this.currentCharacterType = characterType;
        const title = document.getElementById('character-review-title');
        const modal = document.getElementById('character-review-modal');
        
        // Set title
        title.textContent = characterType === 'hired-sword' ? 'Hired Sword Review' : 'Dramatis Personae Review';
        
        // Load characters
        this.loadCharacters();
        
        // Move modal to body to ensure it's not constrained by parent containers
        document.body.appendChild(modal);
        
        // Show modal
        displayModal('character-review-modal');
    }

    closeModal() {
        hideModal('character-review-modal');
        this.resetFilters();
    }

    resetFilters() {
        document.getElementById('alignment-filter').value = 'any';
        document.getElementById('warband-filter').value = '';
        document.getElementById('grade-filter').value = '';
    }

    loadCharacters() {
        const characterData = this.currentCharacterType === 'hired-sword' ? HIRED_SWORDS : DRAMATIS_PERSONAE;
        
        // Flatten character data and extract grades
        this.currentCharacters = [];
        this.gradeList = [];
        
        characterData.forEach(grade => {
            this.gradeList.push(grade.grade);
            grade.characters.forEach(character => {
                this.currentCharacters.push({
                    ...character,
                    grade: grade.grade
                });
            });
        });

        // Populate grade filter
        this.populateGradeFilter();
        
        // Display all characters initially
        this.filterCharacters();
    }

    populateGradeFilter() {
        const gradeFilter = document.getElementById('grade-filter');
        gradeFilter.innerHTML = '<option value="">All Grades</option>';
        
        this.gradeList.sort().forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            gradeFilter.appendChild(option);
        });
    }

    filterCharacters() {
        const alignmentFilter = document.getElementById('alignment-filter').value;
        const warbandFilter = document.getElementById('warband-filter').value;
        const gradeFilter = document.getElementById('grade-filter').value;

        let filteredCharacters = this.currentCharacters.filter(character => {
            // Grade filter
            if (gradeFilter && character.grade !== gradeFilter) return false;
            
            // Alignment filter
            const characterAlignment = character.data.may_be_hired_alignment || '';
            if (alignmentFilter !== 'any') {
                if (characterAlignment && characterAlignment !== alignmentFilter && characterAlignment !== 'any') {
                    return false;
                }
            }
            
            // Warband filter
            if (warbandFilter) {
                if (!this.isCharacterAvailableToWarband(character.data, warbandFilter)) {
                    return false;
                }
            }
            
            return true;
        });

        this.displayCharacters(filteredCharacters);
    }

    isCharacterAvailableToWarband(characterData, warbandName) {
        // If may_hire is specified, check if warband is in the list
        if (characterData.may_hire && characterData.may_hire.length > 0) {
            return characterData.may_hire.includes(warbandName);
        }
        
        // If may_not_hire is specified, check if warband is NOT in the list
        if (characterData.may_not_hire && characterData.may_not_hire.length > 0) {
            return !characterData.may_not_hire.includes(warbandName);
        }
        
        // If neither is specified, character is available to all warbands
        return true;
    }

    displayCharacters(characters) {
        const characterList = document.getElementById('character-list');
        characterList.innerHTML = '';

        if (characters.length === 0) {
            characterList.innerHTML = `
                <div class="text-center py-8 text-slate-400">
                    <i class="fas fa-search text-4xl mb-4"></i>
                    <p>No characters found matching your filters.</p>
                </div>
            `;
            return;
        }

        // Group characters by grade
        const charactersByGrade = {};
        characters.forEach(character => {
            if (!charactersByGrade[character.grade]) {
                charactersByGrade[character.grade] = [];
            }
            charactersByGrade[character.grade].push(character);
        });

        // Display each grade
        Object.keys(charactersByGrade).sort().forEach(grade => {
            const gradeSection = document.createElement('div');
            gradeSection.className = 'mb-6';
            gradeSection.innerHTML = `
                <h4 class="text-xl font-semibold text-mordheim-gold mb-3 border-b border-slate-600 pb-2">${grade}</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${charactersByGrade[grade].map(character => this.createCharacterCard(character)).join('')}
                </div>
            `;
            characterList.appendChild(gradeSection);
        });
    }

    createCharacterCard(character) {
        const data = character.data;
        const stats = data.stats || {};
        
        // Format equipment names
        const equipmentNames = (data.initial_equipment || []).map(id => {
            const equipment = MASTER_EQUIPMENT_LIST.find(eq => eq.id === id);
            return equipment ? equipment.name : `Item ${id}`;
        }).join(', ');

        // Format skills
        const skills = (data.skills || []).join(', ');
        const startingSkills = (data.starting_skills || []).join(', ');

        return `
            <div class="bg-slate-800 p-4 rounded-lg border border-slate-600 hover:border-mordheim-gold transition">
                <div class="flex justify-between items-start mb-2">
                    <h5 class="font-semibold text-white text-lg">${character.name}</h5>
                </div>
                
                <div class="text-sm text-slate-300 mb-3">
                    <div class="grid grid-cols-3 gap-2 text-xs mb-2">
                        <div><strong>M:</strong> ${stats.M || 0}</div>
                        <div><strong>WS:</strong> ${stats.WS || 0}</div>
                        <div><strong>BS:</strong> ${stats.BS || 0}</div>
                        <div><strong>S:</strong> ${stats.S || 0}</div>
                        <div><strong>T:</strong> ${stats.T || 0}</div>
                        <div><strong>W:</strong> ${stats.W || 0}</div>
                        <div><strong>I:</strong> ${stats.I || 0}</div>
                        <div><strong>A:</strong> ${stats.A || 0}</div>
                        <div><strong>Ld:</strong> ${stats.Ld || 0}</div>
                    </div>
                    
                    <div class="space-y-1">
                        <div><strong class="text-slate-400">Hire Fee:</strong> ${data.hire_fee ? `${data.hire_fee} gold crowns` : 'N/A'}</div>
                        <div><strong class="text-slate-400">Upkeep:</strong> ${data.upkeep_fee ? `${data.upkeep_fee} gold crowns per game` : 'N/A'}</div>
                        ${data.may_be_hired_alignment ? `<div><strong class="text-slate-400">Alignment:</strong> ${data.may_be_hired_alignment}</div>` : ''}
                        <div><strong class="text-slate-400">Rating:</strong> <span class="text-mordheim-gold">+${data.rating || 'N/A'}</span></div>
                    </div>
                </div>

                <div class="text-xs text-slate-400 space-y-1">
                    ${equipmentNames ? `<div><strong>Equipment:</strong> ${equipmentNames}</div>` : ''}
                    ${skills ? `<div><strong>Skills:</strong> ${skills}</div>` : ''}
                    ${startingSkills ? `<div><strong>Starting Skills:</strong> ${this.createSkillLinks(startingSkills)}</div>` : ''}
                    ${data.rules ? `<div><strong>Rules:</strong> ${this.createRuleLinks(data.rules)}</div>` : ''}
                    ${data.special_rules ? `<div><strong>Special Rules:</strong> ${this.createRuleLinks(data.special_rules)}</div>` : ''}
                </div>
            </div>
        `;
    }

    createSkillLinks(skillsString) {
        if (!skillsString) return '';
        
        const skills = skillsString.split(',').map(skill => skill.trim());
        return skills.map(skill => 
            `<span class="skill-link text-white hover:text-mordheim-gold cursor-pointer underline" data-skill="${skill}">${skill}</span>`
        ).join(', ');
    }

    createRuleLinks(rulesString) {
        if (!rulesString) return '';
        
        const rules = rulesString.split(';').map(rule => rule.trim());
        return rules.map(rule => 
            `<span class="rule-link text-white hover:text-mordheim-gold cursor-pointer underline" data-rule="${rule}">${rule}</span>`
        ).join(', ');
    }

    showSkillDescription(skillName) {
        const skill = findSkillForWarband(skillName);
        if (skill) {
            this.showDescriptionModal(skillName, skill.rules || 'No description available', 'skill');
        } else {
            this.showDescriptionModal(skillName, 'Skill description not found', 'skill');
        }
    }

    showRuleDescription(ruleName) {
        const rule = SPECIAL_RULES_DETAILS.find(r => r.name === ruleName);
        if (rule) {
            this.showDescriptionModal(ruleName, rule.rules || 'No description available', 'rule');
        } else {
            this.showDescriptionModal(ruleName, 'Rule description not found', 'rule');
        }
    }

    showDescriptionModal(title, description, type) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('description-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'description-modal';
            modal.className = 'hidden fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50';
            modal.innerHTML = `
                <div class="bg-slate-700 p-6 rounded-xl w-full max-w-md shadow-2xl">
                    <div class="flex justify-between items-center mb-4 border-b border-slate-600 pb-2">
                        <h4 id="description-title" class="text-xl font-bold text-mordheim-gold"></h4>
                        <button id="close-description-btn" class="text-slate-300 hover:text-white transition">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div id="description-content" class="text-slate-300"></div>
                </div>
            `;
            document.body.appendChild(modal);

            // Add close event listener
            document.getElementById('close-description-btn').addEventListener('click', () => {
                modal.classList.add('hidden');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }

        // Set content
        document.getElementById('description-title').textContent = title;
        document.getElementById('description-content').innerHTML = `
            <div class="mb-2">
                <span class="text-xs bg-${type === 'skill' ? 'blue' : 'green'}-600 text-white px-2 py-1 rounded">${type === 'skill' ? 'Skill' : 'Special Rule'}</span>
            </div>
            <p class="text-sm">${description}</p>
        `;

        // Show modal
        modal.classList.remove('hidden');
    }
}

// Initialize the modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CharacterReviewModal();
});
