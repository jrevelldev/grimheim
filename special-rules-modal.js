import { SPECIAL_RULES_DETAILS } from './data/special_rules.js';
import { WARBANDS } from './data/warbands.js';
import { translateSpecialRule, getSpecialRuleSummary } from './i18n.js';
import { showListView } from './ui.js';
import { trackScreenView } from './analytics.js';
import { getWarbands, setCurrentWarband } from './state.js';

const normalize = (str) => {
    if (!str) return '';
    return String(str).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

// Timing mapping constants
const TIMING_MAP = {
    '1': 'Antes de la Partida',
    '2': 'Fase de Recuperación',
    '3': 'Fase de Movimiento',
    '4': 'Mi Movimiento',
    '5': 'Movimiento del Rival',
    '6': 'Fase de Disparo',
    '7': 'Mi Disparo',
    '8': 'Disparo del Rival',
    '9': 'Combate Cuerpo a Cuerpo',
    '10': 'Mi Combate',
    '11': 'Combate del Rival',
    '12': 'Varios',
    '13': 'Después de la Partida'
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
        this.timingFilterText.textContent = 'Momento: Todos';
        
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
            <span>Todas las Bandas</span>
            <i class="fas fa-chevron-right chevron"></i>
        `;
        allWarbandsOption.dataset.value = '';
        allWarbandsOption.addEventListener('click', (e) => {
            // Toggle grades expansion
            this.toggleAllWarbandsGrades();
            
            // Only select if not clicking the chevron
            if (!e.target.classList.contains('chevron')) {
                this.selectWarband('', 'Todas las Bandas');
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
            <span>Todos los Momentos</span>
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
            this.timingFilterText.textContent = 'Momento: Todos';
        } else {
            const timingNames = Array.from(this.selectedTimings).map(code => TIMING_MAP[code]).join(', ');
            this.timingFilterText.textContent = `Momento: ${timingNames}`;
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
            const term = normalize(searchTerm);
            const isImmuneQuery = term.includes('inmun') || term.includes('immun');
            const isPainQuery = term.includes('dolor') || term.includes('pain');

            filteredRules = filteredRules.filter(rule => {
                const enName = normalize(rule.name);
                const esName = normalize(translateSpecialRule(rule.name));
                const bodyText = normalize(typeof rule.rules === 'string' ? rule.rules : '');
                const summary = getSpecialRuleSummary(rule.name);
                const shortEs = normalize(summary.short || '');
                const fullEs = normalize(summary.full || '');

                if (isImmuneQuery && (enName.includes('immun') || esName.includes('inmun') || bodyText.includes('immun') || bodyText.includes('inmun'))) {
                    return true;
                }
                if (isPainQuery && (enName.includes('pain') || esName.includes('dolor') || bodyText.includes('pain') || bodyText.includes('dolor'))) {
                    return true;
                }

                return enName.includes(term) ||
                       esName.includes(term) ||
                       bodyText.includes(term) ||
                       shortEs.includes(term) ||
                       fullEs.includes(term);
            });
        }
        
        if (filteredRules.length === 0) {
            const emptyMessage = selectedWarband 
                ? `No se han encontrado reglas especiales para "${selectedWarband}"${searchTerm ? ` que coincidan con "${searchTerm}"` : ''}`
                : `No se han encontrado reglas especiales que coincidan con "${searchTerm}"`;
            
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
                    Momento: ${rule.timing.map(t => {
                        return TIMING_MAP[t] || t;
                    }).join(', ')}
                   </div>`
                : '';
            
            const esName = translateSpecialRule(rule.name);
            const summary = getSpecialRuleSummary(rule.name);
            const hasDiffEnglish = esName && esName.toLowerCase() !== rule.name.toLowerCase();
            const titleHtml = hasDiffEnglish
                ? `${esName} <span class="text-sm font-normal text-slate-400 ml-2">(${rule.name})</span>`
                : rule.name;
            
            const ruleDescription = summary.full ? `
                <div class="mb-2 text-slate-100 font-medium">${summary.full}</div>
                ${rule.rules && rule.rules !== summary.full ? `<div class="text-xs text-slate-400 border-t border-slate-600/60 pt-2 mt-2 leading-relaxed">${typeof rule.rules === 'string' ? rule.rules : ''}</div>` : ''}
            ` : (typeof rule.rules === 'string' ? rule.rules : rule.rules);
            
            return `
                <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-bold text-mordheim-gold">${titleHtml}</h3>
                        ${timingInfo}
                    </div>
                    <div class="text-slate-300">
                        ${ruleDescription}
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
