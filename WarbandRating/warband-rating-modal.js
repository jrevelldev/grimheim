import { calculateWarbandRatingBreakdown } from './warband-rating.js';
import { displayModal, hideModal } from '../utility.js';

const MODAL_ID = 'warband-rating-breakdown-modal';

/**
 * Creates the rating breakdown modal DOM element if it doesn't exist.
 */
function ensureModalExists() {
    if (document.getElementById(MODAL_ID)) return;

    const modal = document.createElement('div');
    modal.id = MODAL_ID;
    modal.className = 'hidden fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50';
    modal.innerHTML = `
        <div class="bg-slate-700 p-6 rounded-xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll">
            <div class="flex justify-between items-center mb-4 border-b border-slate-600 pb-3">
                <h3 class="text-2xl font-bold text-mordheim-gold">
                    Desglose de Valoración de la Banda
                </h3>
                <button id="close-rating-breakdown-btn" class="text-slate-400 hover:text-white transition text-xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="rating-breakdown-house-rule-note"></div>
            <div id="rating-breakdown-summary"></div>
            <div id="rating-breakdown-content"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close button
    document.getElementById('close-rating-breakdown-btn').addEventListener('click', () => {
        hideModal(MODAL_ID);
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(MODAL_ID);
        }
    });
}

/**
 * Groups members by their type category for display.
 */
function groupByType(members) {
    const groups = {
        'Hero': [],
        'Henchman': [],
        'Hired Sword': [],
        'Dramatis Personae': [],
        'Vehicle': []
    };

    members.forEach(m => {
        if (groups[m.type]) {
            groups[m.type].push(m);
        } else {
            groups['Vehicle'].push(m);
        }
    });

    return groups;
}

/**
 * Returns the border color class for a fighter type.
 */
function getTypeBorderColor(type) {
    switch (type) {
        case 'Hero': return 'border-red-500';
        case 'Henchman': return 'border-yellow-500';
        case 'Hired Sword': return 'border-blue-500';
        case 'Dramatis Personae': return 'border-purple-500';
        case 'Vehicle': return 'border-slate-500';
        default: return 'border-slate-500';
    }
}

/**
 * Returns the accent color class for a fighter type.
 */
function getTypeAccentColor(type) {
    switch (type) {
        case 'Hero': return 'text-red-400';
        case 'Henchman': return 'text-yellow-400';
        case 'Hired Sword': return 'text-blue-400';
        case 'Dramatis Personae': return 'text-purple-400';
        case 'Vehicle': return 'text-slate-400';
        default: return 'text-slate-400';
    }
}

/**
 * Returns the Spanish plural display name for a fighter type.
 */
function getTypePluralDisplayName(type) {
    switch (type) {
        case 'Hero': return 'Héroes';
        case 'Henchman': return 'Secuaces';
        case 'Hired Sword': return 'Espadas de Alquiler';
        case 'Dramatis Personae': return 'Personajes Ilustres';
        case 'Vehicle': return 'Vehículos';
        default: return `${type}s`;
    }
}

/**
 * Renders a single member row.
 */
function renderMemberRow(member) {
    const borderColor = getTypeBorderColor(member.type);
    const groupLabel = member.groupSize > 1 ? ` <span class="text-xs text-slate-400">×${member.groupSize}</span>` : '';

    const equipmentPart = member.breakdownParts.find(p => p.startsWith('Equipo') || p.startsWith('Equipment'));
    const otherParts = member.breakdownParts.filter(p => !p.startsWith('Equipo') && !p.startsWith('Equipment'));
    
    const lines = [];
    if (equipmentPart) {
        lines.push(equipmentPart);
    }
    if (otherParts.length > 0) {
        if (member.groupSize > 1) {
            lines.push(...otherParts);
        } else {
            lines.push(otherParts.join(' + '));
        }
    }
    
    const breakdownHTML = lines.map(line => `<div class="truncate" title="${line}">${line}</div>`).join('');

    return `
        <div class="bg-slate-800 rounded-lg p-3 border-l-3 ${borderColor} mb-2" style="border-left-width: 3px;">
            <div class="flex justify-between items-center">
                <div class="flex-1 min-w-0">
                    <span class="font-semibold text-slate-200 text-sm">${member.name}${groupLabel}</span>
                    <div class="text-xs text-slate-400 mt-1 space-y-0.5">
                        ${breakdownHTML}
                    </div>
                </div>
                <div class="ml-4 text-right flex-shrink-0">
                    <span class="text-lg font-bold text-mordheim-gold">${member.totalContribution}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders a type group section.
 */
function renderTypeGroup(type, members) {
    if (members.length === 0) return '';

    const accentColor = getTypeAccentColor(type);
    const groupTotal = members.reduce((sum, m) => sum + m.totalContribution, 0);
    const fighterCount = members.reduce((sum, m) => sum + m.groupSize, 0);

    return `
        <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
                <h4 class="text-sm font-semibold ${accentColor} uppercase tracking-wide">
                    ${getTypePluralDisplayName(type)}
                    <span class="text-xs text-slate-500 font-normal ml-1">(${fighterCount})</span>
                </h4>
                <span class="text-sm font-bold text-slate-300">${groupTotal}</span>
            </div>
            ${members.map(m => renderMemberRow(m)).join('')}
        </div>
    `;
}

/**
 * Shows the warband rating breakdown modal.
 * @param {Array} members - The warband members array
 */
export function showWarbandRatingBreakdown(members) {
    ensureModalExists();

    const breakdown = calculateWarbandRatingBreakdown(members);
    const groups = groupByType(breakdown.members);

    // House rule note
    const houseRuleNote = breakdown.isExcludeStartingXpActive
        ? `<div class="bg-blue-900/30 border border-blue-700/50 rounded-lg px-3 py-2 mb-4 text-xs text-blue-300">
               <i class="fas fa-info-circle mr-1"></i>
               Regla de la Casa Activa: Solo la experiencia obtenida más allá de la inicial cuenta para la valoración.
           </div>`
        : '';
    document.getElementById('rating-breakdown-house-rule-note').innerHTML = houseRuleNote;

    // Summary section
    const summaryHTML = `
        <div class="bg-slate-800 rounded-lg p-4 mb-4">
            <div class="flex justify-between items-center">
                <span class="text-sm text-slate-400 uppercase tracking-wide">Valoración Total de la Banda</span>
                <span class="text-3xl font-bold text-mordheim-gold">${breakdown.total}</span>
            </div>
        </div>
    `;
    document.getElementById('rating-breakdown-summary').innerHTML = summaryHTML;

    // Render each type group
    const typeOrder = ['Hero', 'Henchman', 'Hired Sword', 'Dramatis Personae', 'Vehicle'];
    const contentHTML = typeOrder.map(type => renderTypeGroup(type, groups[type])).join('');
    document.getElementById('rating-breakdown-content').innerHTML = contentHTML;

    displayModal(MODAL_ID);
}
