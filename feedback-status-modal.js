import { FEEDBACK_ENTRIES, FEEDBACK_STATUS_OPTIONS, formatFeedbackDate, getStatusStyling, getEntriesByStatus } from './data/feedback-status.js';
import { displayModal, hideModal, closeAllDropdowns } from './utility.js';

class FeedbackStatusModal {
    constructor() {
        this.currentEntries = [];
        this.expandedEntries = new Set(); // Track which entries are expanded
        
        this.initializeEventListeners();
        this.loadEntries();
    }

    initializeEventListeners() {
        // Desktop dropdown menu
        const dropdownBtn = document.getElementById('feedback-dropdown-btn');
        const dropdown = document.getElementById('feedback-dropdown');
        
        const submitFeedbackBtn = document.getElementById('submit-feedback-btn');
        const feedbackStatusBtn = document.getElementById('feedback-status-btn');
        
        if (dropdownBtn && dropdown) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllDropdowns('feedback-dropdown');
                dropdown.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target) && e.target !== dropdownBtn) {
                    dropdown.classList.add('hidden');
                }
            });

            // Prevent dropdown clicks from bubbling to document
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Feedback option buttons
        if (submitFeedbackBtn) {
            submitFeedbackBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openSubmitFeedback();
            });
        }

        if (feedbackStatusBtn) {
            feedbackStatusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openFeedbackStatus();
            });
        }

        // Mobile dropdown menu
        const mobileDropdownBtn = document.getElementById('mobile-feedback-review-btn');
        const mobileDropdown = document.getElementById('mobile-feedback-submenu');
        
        const mobileSubmitFeedbackBtn = document.getElementById('mobile-submit-feedback-btn');
        const mobileFeedbackStatusBtn = document.getElementById('mobile-feedback-status-btn');

        if (mobileDropdownBtn) {
            mobileDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileDropdown.classList.toggle('hidden');
            });

            // Close mobile dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileDropdown.contains(e.target) && e.target !== mobileDropdownBtn) {
                    mobileDropdown.classList.add('hidden');
                }
            });

            mobileDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            mobileSubmitFeedbackBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openSubmitFeedback();
                mobileDropdown.classList.add('hidden');
                this.closeMobileMenu();
            });

            mobileFeedbackStatusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openFeedbackStatus();
                mobileDropdown.classList.add('hidden');
                this.closeMobileMenu();
            });
        }

        // Modal controls
        document.getElementById('close-feedback-status-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // Filter controls
        document.getElementById('status-filter').addEventListener('change', () => {
            this.filterAndDisplayEntries();
        });

        document.getElementById('sort-filter').addEventListener('change', () => {
            this.filterAndDisplayEntries();
        });

        // Close modal on background click
        document.getElementById('feedback-status-modal').addEventListener('click', (e) => {
            if (e.target.id === 'feedback-status-modal') {
                this.closeModal();
            }
        });

        // Event delegation for expandable entries
        document.getElementById('feedback-status-list').addEventListener('click', (e) => {
            if (e.target.closest('.feedback-subject')) {
                const entryId = e.target.closest('.feedback-entry').dataset.entryId;
                this.toggleEntryExpansion(entryId);
            }
        });
    }

    openSubmitFeedback() {
        // Close dropdowns
        document.getElementById('feedback-dropdown').classList.add('hidden');
        const mobileDropdown = document.getElementById('mobile-feedback-submenu');
        if (mobileDropdown) {
            mobileDropdown.classList.add('hidden');
        }
        
        // Open existing feedback modal
        import('./feedback.js').then(module => {
            module.showFeedbackModal();
        });
    }

    openFeedbackStatus() {
        // Close dropdowns
        document.getElementById('feedback-dropdown').classList.add('hidden');
        const mobileDropdown = document.getElementById('mobile-feedback-submenu');
        if (mobileDropdown) {
            mobileDropdown.classList.add('hidden');
        }
        
        // Show modal
        displayModal('feedback-status-modal');
    }

    closeModal() {
        hideModal('feedback-status-modal');
        this.expandedEntries.clear(); // Reset expanded state when closing
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
        }
        document.body.classList.remove('mobile-menu-open');
    }

    loadEntries() {
        this.currentEntries = [...FEEDBACK_ENTRIES];
        this.filterAndDisplayEntries();
    }

    filterAndDisplayEntries() {
        const statusFilter = document.getElementById('status-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;

        // Filter entries
        let filteredEntries = getEntriesByStatus(statusFilter);

        // Sort entries
        filteredEntries = this.sortEntries(filteredEntries, sortFilter);

        this.displayEntries(filteredEntries);
    }

    sortEntries(entries, sortType) {
        const sorted = [...entries];
        
        switch (sortType) {
            case 'date-desc':
                return sorted.sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));
            case 'date-asc':
                return sorted.sort((a, b) => new Date(a.dateSubmitted) - new Date(b.dateSubmitted));
            case 'subject':
                return sorted.sort((a, b) => a.subject.localeCompare(b.subject));
            default:
                return sorted;
        }
    }

    displayEntries(entries) {
        const feedbackList = document.getElementById('feedback-status-list');
        
        if (entries.length === 0) {
            feedbackList.innerHTML = `
                <div class="text-center py-8 text-slate-400">
                    <i class="fas fa-comments text-4xl mb-4"></i>
                    <p>No se encontraron comentarios que coincidan con los filtros.</p>
                </div>
            `;
            return;
        }

        feedbackList.innerHTML = entries.map(entry => this.createFeedbackEntry(entry)).join('');
    }

    createFeedbackEntry(entry) {
        const statusStyling = getStatusStyling(entry.status);
        const isExpanded = this.expandedEntries.has(entry.id);
        
        return `
            <div class="feedback-entry bg-slate-800 rounded-lg border border-slate-600 overflow-hidden" data-entry-id="${entry.id}">
                <div class="feedback-subject p-4 cursor-pointer hover:bg-slate-700 transition flex items-center justify-between">
                    <div class="flex items-center space-x-3 flex-1">
                        <span class="feedback-status-indicator ${statusStyling.bgColor} w-3 h-3 rounded-full flex-shrink-0"></span>
                        <h4 class="font-semibold text-white flex-1">${entry.subject}</h4>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-xs px-2 py-1 ${statusStyling.bgColor} text-white rounded">
                            ${statusStyling.name}
                        </span>
                        <i class="fas fa-chevron-${isExpanded ? 'up' : 'down'} text-slate-400 transition-transform"></i>
                    </div>
                </div>
                
                <div class="feedback-details ${isExpanded ? 'block' : 'hidden'} border-t border-slate-600">
                    <div class="p-4 space-y-3">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="text-slate-400">Fecha de Envío:</span>
                                <span class="text-white ml-2">${formatFeedbackDate(entry.dateSubmitted)}</span>
                            </div>
                            <div>
                                <span class="text-slate-400">Estado:</span>
                                <span class="text-white ml-2">${statusStyling.name}</span>
                            </div>
                        </div>
                        
                        <div>
                            <span class="text-slate-400 text-sm">Mensaje:</span>
                            <div class="mt-2 p-3 bg-slate-900 rounded text-slate-200 text-sm leading-relaxed">
                                ${entry.message}
                            </div>
                        </div>
                        
                        ${entry.notes ? `
                        <div>
                            <span class="text-slate-400 text-sm">Notas:</span>
                            <div class="mt-2 p-3 bg-slate-800 rounded text-slate-300 text-sm leading-relaxed border border-slate-600">
                                ${entry.notes.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        ` : ''}
                        
                        <div class="flex items-center justify-between pt-2 border-t border-slate-700">
                            <div class="text-xs text-slate-500">
                                ID: ${entry.id}
                            </div>
                            <div class="text-xs text-slate-500">
                                Haz clic en el asunto para ${isExpanded ? 'contraer' : 'desplegar'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    toggleEntryExpansion(entryId) {
        if (this.expandedEntries.has(entryId)) {
            this.expandedEntries.delete(entryId);
        } else {
            this.expandedEntries.add(entryId);
        }
        
        // Re-render the entries to update the expansion state
        this.filterAndDisplayEntries();
    }
}

// Initialize modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FeedbackStatusModal();
});
