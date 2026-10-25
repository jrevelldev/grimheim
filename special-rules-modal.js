import { SPECIAL_RULES_DETAILS } from './data/special_rules.js';
import { WARBANDS } from './data/warbands.js';
import { showListView } from './ui.js';
import { trackScreenView } from './analytics.js';
import { getWarbands, setCurrentWarband } from './state.js';

// Timing mapping constants
const TIMING_MAP = {
    '1': 'Pre Game',
    '2': 'Recovery',
    '3': 'Movement',
    '4': 'My Movement',
    '5': 'Opponent Movement',
    '6': 'Shooting',
    '7': 'My Shooting',
    '8': 'Opponent Shooting',
    '9': 'Melee',
    '10': 'My Melee',
    '11': 'Opponent Melee',
    '12': 'Misc',
    '13': 'Post Game'
};

class SpecialRulesModal {
    constructor() {
        this.container = null;
        this.searchInput = null;
        this.allWarbandsContainer = null;
        this.timingFilterToggle = null;
        this.timingFilterContainer = null;
        this.timingFilterText = null;
        this.currentRules = [];
        this.selectedWarband = '';
        this.selectedTimings = new Set();
        this.isTimingFilterOpen = false;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Back button
        const backBtn = document.getElementById('back-to-main-from-special-rules-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.closeModal());
        }

        // Search functionality
        this.searchInput = document.getElementById('special-rules-search');
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.filterAndRenderRules(e.target.value, this.selectedWarband);
            });
        }

        // All Warbands container
        this.allWarbandsContainer = document.getElementById('all-warbands-option-container');

        // Timing filter functionality
        this.timingFilterToggle = document.getElementById('timing-filter-toggle');
        this.timingFilterContainer = document.getElementById('timing-filter-container');
        this.timingFilterText = document.getElementById('timing-filter-text');
        
        if (this.timingFilterToggle) {
            this.timingFilterToggle.addEventListener('click', () => {
                this.toggleTimingFilter();
            });
        }

        // Close timing filter when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isTimingFilterOpen && 
                !this.timingFilterToggle?.contains(e.target) && 
                !this.timingFilterContainer?.contains(e.target)) {
                this.closeTimingFilter();
            }
        });
    }

    toggleTimingFilter() {
        if (this.isTimingFilterOpen) {
            this.closeTimingFilter();
        } else {
            this.openTimingFilter();
        }
    }

    openTimingFilter() {
        this.timingFilterContainer.classList.remove('hidden');
        this.isTimingFilterOpen = true;
        // Update chevron icon
        const chevron = this.timingFilterToggle.querySelector('i');
        if (chevron) {
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
        }
    }

    closeTimingFilter() {
        this.timingFilterContainer.classList.add('hidden');
        this.isTimingFilterOpen = false;
        // Update chevron icon
        const chevron = this.timingFilterToggle.querySelector('i');
        if (chevron) {
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        }
    }

    openModal() {
        trackScreenView('Special Rules');
        // Hide all other views
        document.getElementById('warband-list-view').classList.add('hidden');
        document.getElementById('warband-editor-view').classList.add('hidden');
        document.getElementById('turn-order-tracker-view').classList.add('hidden');
        document.getElementById('battle-view').classList.add('hidden');
        document.getElementById('rules-view')?.classList.add('hidden');
        document.getElementById('special-rules-view').classList.remove('hidden');
        
        // Show header and footer
        document.getElementById('main-header').classList.remove('hidden');
        document.getElementById('main-footer').classList.remove('hidden');
        
        // Render the special rules
        this.renderSpecialRulesView();
    }

    closeModal() {
        // Hide the special rules view
        document.getElementById('special-rules-view').classList.add('hidden');
        setCurrentWarband(showListView(getWarbands()));
    }

    renderSpecialRulesView() {
        this.container = document.getElementById('special-rules-list');
        this.searchInput = document.getElementById('special-rules-search');
        this.allWarbandsContainer = document.getElementById('all-warbands-option-container');
        this.timingFilterToggle = document.getElementById('timing-filter-toggle');
        this.timingFilterContainer = document.getElementById('timing-filter-container');
        this.timingFilterText = document.getElementById('timing-filter-text');
        
        if (!this.container || !this.searchInput || !this.allWarbandsContainer || !this.timingFilterToggle || !this.timingFilterContainer || !this.timingFilterText) return;
        
        // Populate warband sections
        this.populateWarbandSections();
        
        // Populate timing options
        this.populateTimingOptions();
        
        // Reset selection
        this.selectedWarband = '';
        this.selectedTimings.clear();
        this.timingFilterText.textContent = 'Timing: All';
        
        // Initial render with all rules
        this.filterAndRenderRules();
    }

    populateWarbandSections() {
        // Clear existing content
        this.allWarbandsContainer.innerHTML = '';

        // Create container for All Warbands and its nested grades
        const allWarbandsWrapper = document.createElement('div');
        allWarbandsWrapper.className = 'all-warbands-wrapper';

        // Add "All Warbands" option with chevron
        const allWarbandsOption = document.createElement('div');
        allWarbandsOption.className = 'warband-option p-3 rounded-lg bg-slate-700 border border-slate-600 text-white font-semibold cursor-pointer hover:bg-slate-600 transition flex justify-between items-center';
        allWarbandsOption.innerHTML = `
            <span>All Warbands</span>
            <i class="fas fa-chevron-right chevron"></i>
        `;
        allWarbandsOption.dataset.value = '';
        allWarbandsOption.addEventListener('click', (e) => {
            // Toggle grades expansion
            this.toggleAllWarbandsGrades();
            
            // Only select if not clicking the chevron
            if (!e.target.classList.contains('chevron')) {
                this.selectWarband('', 'All Warbands');
            }
        });
        allWarbandsWrapper.appendChild(allWarbandsOption);

        // Create nested container for grades
        const gradesContainer = document.createElement('div');
        gradesContainer.className = 'grades-nested-container';
        gradesContainer.id = 'all-warbands-grades-container';

        // Add grade sections under "All Warbands"
        WARBANDS.forEach((grade, gradeIndex) => {
            // Create grade section
            const gradeSection = document.createElement('div');
            gradeSection.className = 'grade-section nested';

            // Create grade header
            const gradeHeader = document.createElement('div');
            gradeHeader.className = 'grade-header';
            gradeHeader.innerHTML = `
                <span>${grade.grade}</span>
                <i class="fas fa-chevron-right chevron"></i>
            `;

            // Create grade content
            const gradeContent = document.createElement('div');
            gradeContent.className = 'grade-content';
            gradeContent.id = `special-rules-grade-content-${gradeIndex}`;

            // Add warbands to grade content
            grade.warbands.forEach(warband => {
                if (warband.sublist) {
                    // Add main warband as non-clickable header
                    const mainWarband = document.createElement('div');
                    mainWarband.className = 'warband-option';
                    mainWarband.textContent = warband.name;
                    mainWarband.style.fontWeight = '600';
                    mainWarband.style.cursor = 'default';
                    gradeContent.appendChild(mainWarband);

                    // Add sublist items
                    warband.sublist.forEach(sub => {
                        const subOption = document.createElement('div');
                        subOption.className = 'warband-option sub-warband';
                        subOption.textContent = sub;
                        subOption.dataset.value = `${warband.name}: ${sub}`;
                        subOption.addEventListener('click', () => {
                            this.selectWarband(`${warband.name}: ${sub}`, sub);
                        });
                        gradeContent.appendChild(subOption);
                    });
                } else {
                    const warbandOption = document.createElement('div');
                    warbandOption.className = 'warband-option';
                    warbandOption.textContent = warband.name;
                    warbandOption.dataset.value = warband.name;
                    warbandOption.addEventListener('click', () => {
                        this.selectWarband(warband.name, warband.name);
                    });
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

            // Assemble grade section
            gradeSection.appendChild(gradeHeader);
            gradeSection.appendChild(gradeContent);
            gradesContainer.appendChild(gradeSection);
        });

        allWarbandsWrapper.appendChild(gradesContainer);
        this.allWarbandsContainer.appendChild(allWarbandsWrapper);
    }

    populateTimingOptions() {
        // Clear existing content
        this.timingFilterContainer.innerHTML = '';

        // Add "All" option
        const allOption = document.createElement('label');
        allOption.className = 'timing-option flex items-center p-3 hover:bg-slate-600 cursor-pointer';
        allOption.innerHTML = `
            <input type="checkbox" class="timing-checkbox mr-3" value="all" checked>
            <span>All Timings</span>
        `;
        allOption.querySelector('input').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.selectedTimings.clear();
                this.selectedTimings.add('all');
                // Uncheck all other checkboxes
                this.timingFilterContainer.querySelectorAll('.timing-checkbox:not([value="all"])').forEach(cb => {
                    cb.checked = false;
                });
            } else {
                this.selectedTimings.delete('all');
            }
            this.updateTimingFilterText();
            this.filterAndRenderRules(this.searchInput?.value || '', this.selectedWarband);
        });
        this.timingFilterContainer.appendChild(allOption);

        // Add divider
        const divider = document.createElement('div');
        divider.className = 'border-t border-slate-600 my-2';
        this.timingFilterContainer.appendChild(divider);

        // Add individual timing options
        Object.entries(TIMING_MAP).forEach(([code, name]) => {
            const option = document.createElement('label');
            option.className = 'timing-option flex items-center p-3 hover:bg-slate-600 cursor-pointer';
            option.innerHTML = `
                <input type="checkbox" class="timing-checkbox mr-3" value="${code}">
                <span>${name}</span>
            `;
            option.querySelector('input').addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.selectedTimings.delete('all');
                    this.selectedTimings.add(code);
                    // Uncheck "All" checkbox
                    const allCheckbox = this.timingFilterContainer.querySelector('.timing-checkbox[value="all"]');
                    if (allCheckbox) {
                        allCheckbox.checked = false;
                    }
                } else {
                    this.selectedTimings.delete(code);
                    // If no timings selected, check "All"
                    if (this.selectedTimings.size === 0) {
                        this.selectedTimings.add('all');
                        const allCheckbox = this.timingFilterContainer.querySelector('.timing-checkbox[value="all"]');
                        if (allCheckbox) {
                            allCheckbox.checked = true;
                        }
                    }
                }
                this.updateTimingFilterText();
                this.filterAndRenderRules(this.searchInput?.value || '', this.selectedWarband);
            });
            this.timingFilterContainer.appendChild(option);
        });
    }

    updateTimingFilterText() {
        if (this.selectedTimings.has('all') || this.selectedTimings.size === 0) {
            this.timingFilterText.textContent = 'Timing: All';
        } else {
            const timingNames = Array.from(this.selectedTimings).map(code => TIMING_MAP[code]).join(', ');
            this.timingFilterText.textContent = `Timing: ${timingNames}`;
        }
    }

    toggleAllWarbandsGrades() {
        const gradesContainer = document.getElementById('all-warbands-grades-container');
        const chevron = document.querySelector('.all-warbands-wrapper .chevron');
        
        if (gradesContainer.classList.contains('expanded')) {
            gradesContainer.classList.remove('expanded');
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-right');
        } else {
            gradesContainer.classList.add('expanded');
            chevron.classList.remove('fa-chevron-right');
            chevron.classList.add('fa-chevron-down');
        }
    }

    
    selectWarband(value, displayText) {
        // Update selected warband
        this.selectedWarband = value;
        
        // Collapse All Warbands section if a specific warband is selected
        if (value) {
            const gradesContainer = document.getElementById('all-warbands-grades-container');
            const chevron = document.querySelector('.all-warbands-wrapper .chevron');
            if (gradesContainer && gradesContainer.classList.contains('expanded')) {
                gradesContainer.classList.remove('expanded');
                if (chevron) {
                    chevron.classList.remove('fa-chevron-down');
                    chevron.classList.add('fa-chevron-right');
                }
            }
        }
        
        // Filter and render rules
        this.filterAndRenderRules(this.searchInput?.value || '', this.selectedWarband);
    }

    filterAndRenderRules(searchTerm = '', selectedWarband = '') {
        let filteredRules = SPECIAL_RULES_DETAILS;

        // If a specific warband is selected, get its special rules
        if (selectedWarband) {
            const warbandData = this.getWarbandSpecialRules(selectedWarband);
            if (warbandData && warbandData.specialRules && warbandData.specialRules.length > 0) {
                // Filter to only show rules that are in the warband's special rules
                filteredRules = SPECIAL_RULES_DETAILS.filter(rule => 
                    warbandData.specialRules.some(warbandRule => 
                        warbandRule.toLowerCase().trim() === rule.name.toLowerCase().trim()
                    )
                );
            } else {
                // If warband has no special rules, show empty
                filteredRules = [];
            }
        }

        // Apply timing filter
        if (!this.selectedTimings.has('all') && this.selectedTimings.size > 0) {
            filteredRules = filteredRules.filter(rule => 
                rule.timing && rule.timing.length > 0 && 
                rule.timing.some(t => this.selectedTimings.has(t))
            );
        }

        // Apply search filter
        if (searchTerm) {
            filteredRules = filteredRules.filter(rule => 
                rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (typeof rule.rules === 'string' ? rule.rules : '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (filteredRules.length === 0) {
            const emptyMessage = selectedWarband 
                ? `No special rules found for "${selectedWarband}"${searchTerm ? ` matching "${searchTerm}"` : ''}`
                : `No special rules found matching "${searchTerm}"`;
            
            this.container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-4xl text-slate-400 mb-4"></i>
                    <p class="text-slate-400">${emptyMessage}</p>
                </div>
            `;
            return;
        }
        
        const rulesHTML = filteredRules.map(rule => {
            const timingInfo = rule.timing && rule.timing.length > 0 
                ? `<div class="text-xs text-slate-400 mb-2">
                    Timing: ${rule.timing.map(t => {
                        return TIMING_MAP[t] || t;
                    }).join(', ')}
                   </div>`
                : '';
            
            return `
                <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-bold text-mordheim-gold">${rule.name}</h3>
                        ${timingInfo}
                    </div>
                    <div class="text-slate-300">
                        ${typeof rule.rules === 'string' ? rule.rules : rule.rules}
                    </div>
                </div>
            `;
        }).join('');
        
        this.container.innerHTML = rulesHTML;
    }

    getWarbandSpecialRules(warbandName) {
        // Find the warband in the WARBANDS data
        for (const grade of WARBANDS) {
            for (const warband of grade.warbands) {
                if (warband.name === warbandName) {
                    const specialRules = warband.data.special_rules ? warband.data.special_rules.split(';').map(rule => rule.trim()).filter(rule => rule) : [];
                    return {
                        name: warband.name,
                        specialRules: specialRules
                    };
                }
                
                // Check sublist items
                if (warband.sublist) {
                    for (const sub of warband.sublist) {
                        const fullSubName = `${warband.name}: ${sub}`;
                        if (fullSubName === warbandName) {
                            const specialRules = warband.data.special_rules ? warband.data.special_rules.split(';').map(rule => rule.trim()).filter(rule => rule) : [];
                            return {
                                name: fullSubName,
                                specialRules: specialRules
                            };
                        }
                    }
                }
            }
        }
        return null;
    }
}

// Create and export instance
export const specialRulesModal = new SpecialRulesModal();

// Export the openModal function for backward compatibility
export const showSpecialRulesView = () => specialRulesModal.openModal();
