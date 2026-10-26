import { RULES } from './data/rules.js';
import { SPECIAL_RULES_DETAILS } from './data/special_rules.js';
import { translateSpecialRule, getSpecialRuleSummary } from './i18n.js';
import { showListView } from './ui.js';
import { trackScreenView } from './analytics.js';
import { getWarbands, setCurrentWarband } from './state.js';

/** Strips HTML tags so search only matches visible rule text */
const stripHtml = (html) => {
    if (typeof html !== 'string') return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

const normalize = (str) => {
    if (!str) return '';
    return String(str).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

class RulesModal {
    constructor() {
        this.container = null;
        this.searchInput = null;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Back button
        const backBtn = document.getElementById('back-to-main-from-rules-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.closeModal());
        }

        // Search functionality
        this.searchInput = document.getElementById('rules-search');
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.filterAndRenderRules(e.target.value);
            });
        }
    }

    openModal() {
        trackScreenView('Rules');
        // Hide all other views
        document.getElementById('warband-list-view').classList.add('hidden');
        document.getElementById('warband-editor-view').classList.add('hidden');
        document.getElementById('turn-order-tracker-view').classList.add('hidden');
        document.getElementById('battle-view').classList.add('hidden');
        document.getElementById('special-rules-view')?.classList.add('hidden');
        document.getElementById('rules-view').classList.remove('hidden');

        // Show header and footer
        document.getElementById('main-header').classList.remove('hidden');
        document.getElementById('main-footer').classList.remove('hidden');

        // Render the rules
        this.renderRulesView();
    }

    closeModal() {
        document.getElementById('rules-view').classList.add('hidden');
        setCurrentWarband(showListView(getWarbands()));
    }

    renderRulesView() {
        this.container = document.getElementById('rules-list');
        this.searchInput = document.getElementById('rules-search');
        if (!this.container || !this.searchInput) return;

        // Reset search
        this.searchInput.value = '';

        // Initial render with all rules
        this.filterAndRenderRules();
    }

    filterAndRenderRules(searchTerm = '') {
        if (!this.container) return;

        // Sort a copy alphabetically so the shared RULES array isn't mutated
        let filteredRules = [...RULES].sort((a, b) => a.name.localeCompare(b.name, 'es'));

        // Apply search filter
        if (searchTerm) {
            const rawTerm = searchTerm.toLowerCase().trim();
            const term = normalize(searchTerm);
            const isImmuneQuery = term.includes('inmun') || term.includes('immun');
            const isPainQuery = term.includes('dolor') || term.includes('pain');

            // Rank: 0 = title starts with term, 1 = title or alias contains term, 2 = body only
            const getRank = (rule) => {
                const name = normalize(rule.name);
                const enName = normalize(rule.englishName || '');
                const aliases = (rule.aliases || []).map(a => normalize(a));

                if (isImmuneQuery && (name.includes('inmun') || enName.includes('immun') || aliases.some(a => a.includes('inmun') || a.includes('immun')))) {
                    return 0;
                }
                if (isPainQuery && (name.includes('dolor') || enName.includes('pain') || aliases.some(a => a.includes('dolor') || a.includes('pain')))) {
                    return 0;
                }

                if (name.startsWith(term) || enName.startsWith(term)) return 0;
                if (name.includes(term) || enName.includes(term) || aliases.some(a => a.includes(term))) return 1;
                if (normalize(stripHtml(rule.rules)).includes(term)) return 2;
                return -1;
            };

            filteredRules = filteredRules
                .map(rule => ({ rule, rank: getRank(rule) }))
                .filter(item => item.rank !== -1)
                .sort((a, b) => a.rank - b.rank)
                .map(item => item.rule);

            // Also check SPECIAL_RULES_DETAILS for any matching rules not already present in RULES
            const existingNames = new Set(filteredRules.map(r => normalize(r.name)));
            const matchingSpecialRules = [];

            SPECIAL_RULES_DETAILS.forEach(sr => {
                const enName = normalize(sr.name);
                const esName = normalize(translateSpecialRule(sr.name));
                const summary = getSpecialRuleSummary(sr.name);
                const bodyText = normalize(typeof sr.rules === 'string' ? sr.rules : '');
                const fullEs = normalize(summary.full || '');

                if (existingNames.has(esName) || existingNames.has(enName)) return;

                let matches = false;
                if (isImmuneQuery && (enName.includes('immun') || esName.includes('inmun'))) matches = true;
                if (isPainQuery && (enName.includes('pain') || esName.includes('dolor'))) matches = true;
                if (enName.includes(term) || esName.includes(term) || bodyText.includes(term) || fullEs.includes(term)) matches = true;

                if (matches) {
                    existingNames.add(esName);
                    matchingSpecialRules.push({
                        name: translateSpecialRule(sr.name),
                        englishName: sr.name,
                        isSpecialRule: true,
                        rules: summary.full ? `
                            <div class="mb-2 text-slate-100 font-medium">${summary.full}</div>
                            ${sr.rules && sr.rules !== summary.full ? `<div class="text-xs text-slate-400 border-t border-slate-600/60 pt-2 mt-2 leading-relaxed">${sr.rules}</div>` : ''}
                        ` : sr.rules
                    });
                }
            });

            if (matchingSpecialRules.length > 0) {
                filteredRules = [...filteredRules, ...matchingSpecialRules];
            }
        }

        if (filteredRules.length === 0) {
            this.container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-4xl text-slate-400 mb-4"></i>
                    <p class="text-slate-400">No se han encontrado reglas que coincidan con "${searchTerm}"</p>
                </div>
            `;
            return;
        }

        const rulesHTML = filteredRules.map(rule => {
            const hasDiffEnglish = rule.englishName && rule.englishName.toLowerCase() !== rule.name.toLowerCase();
            const badgeHtml = rule.isSpecialRule 
                ? `<span class="text-xs bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded border border-amber-600/50 font-medium">Regla Especial</span>`
                : '';

            return `
                <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-bold text-mordheim-gold">
                                ${rule.name}
                                ${hasDiffEnglish ? `<span class="text-sm font-normal text-slate-400 ml-2">(${rule.englishName})</span>` : ''}
                            </h3>
                        </div>
                        ${badgeHtml}
                    </div>
                    <div class="text-slate-300">
                        ${rule.rules}
                    </div>
                </div>
            `;
        }).join('');

        this.container.innerHTML = rulesHTML;
    }
}

// Create and export instance
export const rulesModal = new RulesModal();

export const showRulesView = () => rulesModal.openModal();
