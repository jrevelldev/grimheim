// Rule reference utilities for displaying rule modals
import { RULES } from './rules.js';

// Global function to show rule modal
window.showRuleModal = function(ruleName) {
    const clean = (ruleName || '').toLowerCase().trim();
    const rule = RULES.find(r => 
        r.name.toLowerCase().trim() === clean ||
        (r.englishName && r.englishName.toLowerCase().trim() === clean) ||
        (r.aliases && r.aliases.some(a => a.toLowerCase().trim() === clean))
    );
    if (!rule) {
        console.error(`Rule "${ruleName}" not found`);
        return;
    }

    // Generate unique modal ID
    const modalId = `rule-modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create modal HTML
    const modalHtml = `
        <div id="${modalId}" class="rule-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-slate-800 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto w-full border-2 border-mordheim-gold">
                <div class="sticky top-0 bg-slate-800 border-b border-slate-600 p-4 flex justify-between items-center">
                    <h2 class="text-xl font-bold text-mordheim-gold">${rule.name}</h2>
                    <button onclick="window.closeRuleModal('${modalId}')" class="text-slate-400 hover:text-white text-2xl">&times;</button>
                </div>
                <div class="p-4">
                    ${typeof rule.rules === 'string' ?
                        `<div class="text-slate-300">${rule.rules}</div>` :
                        rule.rules
                    }
                    ${rule.timing ? `
                        <div class="mt-4 pt-4 border-t border-slate-600">
                            <span class="text-sm text-slate-400">Momento: </span>
                            <span class="text-sm text-mordheim-gold">${rule.timing.join(', ')}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Add escape key listener specific to this modal
    const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
            window.closeRuleModal(modalId);
        }
    };
    document.addEventListener('keydown', handleEscapeKey);

    // Store the event listener reference on the modal element for cleanup
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
        modalElement._escapeHandler = handleEscapeKey;
    }
};

// Global function to close rule modal
window.closeRuleModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Remove the escape key listener if it exists
        if (modal._escapeHandler) {
            document.removeEventListener('keydown', modal._escapeHandler);
        }
        modal.remove();
    }
};

// Note: Functions are already attached to window object as globals
// No additional exports needed
