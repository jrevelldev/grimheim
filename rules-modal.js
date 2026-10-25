import { RULES } from './data/rules.js';
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
        let filteredRules = [...RULES].sort((a, b) => a.name.localeCompare(b.name));

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase().trim();

            // Rank: 0 = title starts with term, 1 = title contains term, 2 = body only
            const getRank = (rule) => {
                const name = rule.name.toLowerCase();
                if (name.startsWith(term)) return 0;
                if (name.includes(term)) return 1;
                if (stripHtml(rule.rules).toLowerCase().includes(term)) return 2;
                return -1;
            };

            // Sort is stable, so alphabetical order is preserved within each rank
            filteredRules = filteredRules
                .map(rule => ({ rule, rank: getRank(rule) }))
                .filter(item => item.rank !== -1)
                .sort((a, b) => a.rank - b.rank)
                .map(item => item.rule);
        }

        if (filteredRules.length === 0) {
            this.container.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-search text-4xl text-slate-400 mb-4"></i>
                    <p class="text-slate-400">No rules found matching "${searchTerm}"</p>
                </div>
            `;
            return;
        }

        const rulesHTML = filteredRules.map(rule => `
            <div class="bg-slate-700 p-6 rounded-lg shadow-md border border-slate-600">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-mordheim-gold">${rule.name}</h3>
                </div>
                <div class="text-slate-300">
                    ${rule.rules}
                </div>
            </div>
        `).join('');

        this.container.innerHTML = rulesHTML;
    }
}

// Create and export instance
export const rulesModal = new RulesModal();

export const showRulesView = () => rulesModal.openModal();
