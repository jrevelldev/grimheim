import { CHANGELOG_ENTRIES, getAllMonths, getLatestEntry } from './data/changelog.js';

// Function to render the changelog modal content
export function renderChangelog() {
    const changelogContent = document.getElementById('changelog-content');
    if (!changelogContent) return;

    const months = getAllMonths();
    let html = '<div class="space-y-3">';
    
    months.forEach(month => {
        const monthEntries = CHANGELOG_ENTRIES.filter(entry => entry.month === month);
        const firstEntry = monthEntries[0];
        
        html += `
            <div class="month-group">
                <div class="month-header bg-slate-900 rounded-t-lg border border-slate-600 p-3 cursor-pointer hover:bg-slate-800 transition" data-month="${month}">
                    <div class="flex justify-between items-center">
                        <h4 class="text-xl font-bold text-mordheim-gold">${firstEntry.monthName}</h4>
                        <i class="fas fa-chevron-down text-slate-400 text-sm month-chevron"></i>
                    </div>
                </div>
                <div id="month-${month}" class="month-content">
        `;
        
        monthEntries.forEach(entry => {
            html += renderChangelogEntry(entry);
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    changelogContent.innerHTML = html;
    
    // Initialize collapsible functionality
    initializeChangelogCollapsibility();
}

// Function to render a single changelog entry
function renderChangelogEntry(entry) {
    let entryHtml = `
        <div class="changelog-entry bg-slate-800 rounded-lg border border-slate-600 border-t-0">
            <button class="w-full text-left p-3 flex justify-between items-center hover:bg-slate-700 transition" data-target="changelog-${entry.id}">
                <span class="font-semibold text-mordheim-gold">${formatDate(entry.date)}</span>
                <i class="fas fa-chevron-right text-slate-400 text-sm"></i>
            </button>
            <div id="changelog-${entry.id}" class="px-3 pb-3 hidden">
    `;
    
    entry.entries.forEach(section => {
        entryHtml += `
            <div class="feature-section mb-2">
                <h5 class="font-semibold text-slate-200 mb-1">${section.title}</h5>
                <ul class="list-disc list-inside space-y-1 text-sm">
        `;
        
        section.items.forEach(item => {
            // Check if the item is a single word (likely a character name) and add proper indentation
            if (item.split(' ').length === 1 && !item.includes('.') && !item.includes('Fixed') && !item.includes('Added') && !item.includes('Updated')) {
                entryHtml += `<li class="ml-6">${item}</li>`;
            } else {
                entryHtml += `<li>${item}</li>`;
            }
        });
        
        entryHtml += `
                </ul>
            </div>
        `;
        
        // Add line breaks between sections (except for the last one)
        if (entry.entries.indexOf(section) < entry.entries.length - 1) {
            entryHtml += '<br>';
        }
    });
    
    entryHtml += `
            </div>
        </div>
    `;
    
    return entryHtml;
}

// Function to format date string
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Function to initialize changelog collapsibility
function initializeChangelogCollapsibility() {
    // Expand the latest entry by default
    const latestEntry = getLatestEntry();
    if (latestEntry) {
        const latestEntryElement = document.getElementById(`changelog-${latestEntry.id}`);
        if (latestEntryElement) {
            latestEntryElement.classList.remove('hidden');
            const button = latestEntryElement.parentElement.querySelector('button');
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-down');
            }
        }
    }

    // Add click event listeners to all changelog entry buttons
    document.querySelectorAll('.changelog-entry button').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (target) {
                target.classList.toggle('hidden');
                if (icon) {
                    icon.classList.toggle('fa-chevron-right');
                    icon.classList.toggle('fa-chevron-down');
                }
            }
        });
    });

    // Add click event listeners to month headers
    document.querySelectorAll('.month-header').forEach(header => {
        header.addEventListener('click', function() {
            const monthId = this.getAttribute('data-month');
            const monthContent = document.getElementById(`month-${monthId}`);
            const chevron = this.querySelector('.month-chevron');
            
            if (monthContent) {
                monthContent.classList.toggle('hidden');
                if (chevron) {
                    chevron.classList.toggle('fa-chevron-down');
                    chevron.classList.toggle('fa-chevron-right');
                }
            }
        });
    });

    // Collapse all functionality
    const collapseAllBtn = document.getElementById('collapse-all-btn');
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function() {
            document.querySelectorAll('.changelog-entry > div[id^="changelog-"]').forEach(div => {
                div.classList.add('hidden');
            });
            document.querySelectorAll('.changelog-entry button i').forEach(icon => {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-right');
            });
        });
    }

    // Expand all functionality
    const expandAllBtn = document.getElementById('expand-all-btn');
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function() {
            document.querySelectorAll('.changelog-entry > div[id^="changelog-"]').forEach(div => {
                div.classList.remove('hidden');
            });
            document.querySelectorAll('.changelog-entry button i').forEach(icon => {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-down');
            });
        });
    }
}
