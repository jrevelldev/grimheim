import { displayModal, hideModal } from '../utility.js';

const MODAL_ID = 'aristocracy-info-modal';

const BLOODLINE_DATA = {
    'None': {
        name: 'Core Undead',
        title: 'Core Undead Warband',
        description: 'The standard Mordheim Undead warband configuration, representing a traditional coven led by a Vampire of no particular lineage or a newly turned creature.',
        powers: [
            {
                name: 'Standard Roster',
                type: 'Power',
                text: 'Allows standard Undead recruitment, item rules, and equipment choices as specified in the Mordheim rulebook.'
            }
        ]
    },
    'Von Carstein': {
        name: 'Von Carstein',
        title: 'Von Carstein Bloodline',
        description: 'The most common and noble of the vampire lineages. They are elegant, charismatic, and hold dominion over creatures of the night.',
        powers: [
            {
                name: 'Von Carstein Bloodline Powers',
                type: 'Power',
                text: 'Vampire has access to Von Carstein specific bloodline powers (e.g., Transfix, Aura of Majesty, Call Winds, Summon Bats).'
            }
        ]
    },
    'Blood Dragon': {
        name: 'Blood Dragon',
        title: 'Blood Dragon Bloodline',
        description: 'Vampiric knights dedicated entirely to martial perfection and the art of combat. They seek out great warriors to test their skills.',
        powers: [
            {
                name: 'Martial Prowess',
                type: 'Power',
                text: 'Blood Dragon Vampires start with +2 Weapon Skill.'
            },
            {
                name: 'Eternally Brave',
                type: 'Power',
                text: 'Blood Dragon Vampires may re-roll the first failed Rout test (if the Vampire is not out of action).'
            },
            {
                name: 'Honour',
                type: 'Restriction',
                text: 'Blood Dragon Vampires may not attempt to break away from combat or Voluntarily Rout (if the Vampire is not out of action).'
            },
            {
                name: 'Warrior Code',
                type: 'Restriction',
                text: 'Blood Dragon Vampires cannot use Magic (even with the Book of the Dead from TC #11).'
            },
            {
                name: 'Men-at-arms',
                type: 'Power',
                text: 'Dregs start with +1 Weapon Skill.'
            }
        ]
    },
    'Necrarchs': {
        name: 'Necrarchs',
        title: 'Necrarch Bloodline',
        description: 'Hermetic, grotesque scholars of necromancy who seek to unravel the secrets of life and death, sacrificing physical prowess for supreme magical lore.',
        powers: [
            {
                name: 'Poor warrior',
                type: 'Restriction',
                text: 'Necrarch Vampires start with -2 Weapon Skill, may only be armed with a single-handed dagger, sword, axe or mace and cannot take Strength Skills.'
            },
            {
                name: 'Necromantic Lore',
                type: 'Power',
                text: 'The Necrarch starts the game as a Wizard in exactly the same way as the Necromancer.'
            },
            {
                name: 'Loathes the Living',
                type: 'Restriction',
                text: 'May not hire any Hired Swords.'
            }
        ]
    },
    'Lahmia': {
        name: 'Lahmia',
        title: 'Lahmia Bloodline',
        description: 'Seductive and stunningly beautiful vampires who manipulate kingdoms from the shadows. They possess supernatural quickness and lethal elegance.',
        powers: [
            {
                name: 'Poor warrior',
                type: 'Restriction',
                text: 'Lahmian Vampires start with -1 Weapon Skill and cannot wear Heavy armour, and may only be armed with a single-handed dagger, sword, axe or mace.'
            },
            {
                name: 'Enchanting Beauty',
                type: 'Power',
                text: '-1 to any living opponent’s Leadership while in base contact with Vampire (note: this has no effect against the Undead or Daemons).'
            },
            {
                name: 'Unnatural Speed',
                type: 'Power',
                text: 'Lahmian Vampires start with +2 to Initiative.'
            }
        ]
    },
    'Strigoi': {
        name: 'Strigoi',
        title: 'Strigoi Bloodline',
        description: 'Tragic, bestial outcasts who have degenerated into monstrous Ghoul Kings. They are physically fearsome but reviled by both the living and other undead.',
        powers: [
            {
                name: 'Bestial',
                type: 'Power', // Has a penalty but counts as power here
                text: 'Strigoi Vampires start with +1 Attack but cannot use any Items or Equipment.'
            },
            {
                name: 'Hatred',
                type: 'Power',
                text: 'Strigoi Vampires suffer Hatred of all living things.'
            },
            {
                name: 'Ghoul King',
                type: 'Power',
                text: 'Strigoi Vampires may hire up to one Ghast at 50 gc (counts as a Ghoul hero that starts with 0 exp.). Ghoul Henchmen cost 5 gc less to hire.'
            },
            {
                name: 'Reviled',
                type: 'Restriction',
                text: 'Strigoi Vampires hire Necromancers and Dregs at +10 gc to hire.'
            },
            {
                name: 'Feared',
                type: 'Restriction',
                text: 'Strigoi Vampires may not hire any Hired Swords.'
            }
        ]
    }
};

/**
 * Ensures the Aristocracy rules modal DOM element exists.
 */
function ensureModalExists() {
    if (document.getElementById(MODAL_ID)) return;

    const modal = document.createElement('div');
    modal.id = MODAL_ID;
    modal.className = 'hidden fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50';
    modal.innerHTML = `
        <div class="bg-slate-700 p-6 rounded-xl w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scroll flex flex-col">
            <!-- Modal Header -->
            <div class="flex justify-between items-center mb-4 border-b border-slate-600 pb-3 flex-shrink-0">
                <div class="flex items-center space-x-2">
                    <h3 class="text-2xl font-bold text-mordheim-gold uppercase tracking-wide">
                        Aristocracy of the Night
                    </h3>
                </div>
                <button id="close-aristocracy-modal-btn" class="text-slate-400 hover:text-white transition text-xl p-1">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <!-- Tab Buttons Container -->
            <div class="flex flex-wrap gap-2 mb-4 border-b border-slate-600 pb-3 flex-shrink-0" id="aristocracy-tab-list">
                <!-- Dynamic tabs will be inserted here -->
            </div>

            <!-- Tab Content Display -->
            <div id="aristocracy-tab-content" class="flex-1 overflow-y-auto custom-scroll pr-1">
                <!-- Dynamic contents will be inserted here -->
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    document.getElementById('close-aristocracy-modal-btn').addEventListener('click', () => {
        hideModal(MODAL_ID);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(MODAL_ID);
        }
    });
}

/**
 * Renders the tabs and active content.
 * @param {string} activeKey 
 */
function renderTabContent(activeKey) {
    const tabListEl = document.getElementById('aristocracy-tab-list');
    const contentEl = document.getElementById('aristocracy-tab-content');
    if (!tabListEl || !contentEl) return;

    // Normalize Von Carstei vs Von Carstein
    let normalizedActive = activeKey;
    if (activeKey === 'Von Carstei') {
        normalizedActive = 'Von Carstein';
    }

    // Render Tab buttons
    tabListEl.innerHTML = Object.keys(BLOODLINE_DATA).map(key => {
        const bloodline = BLOODLINE_DATA[key];
        const isActive = key === normalizedActive;
        const btnClass = isActive 
            ? 'px-3 py-2 text-sm font-bold bg-mordheim-gold text-slate-900 rounded-lg shadow-md border border-mordheim-gold transition-all duration-150 transform hover:scale-[1.02]' 
            : 'px-3 py-2 text-sm font-semibold bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all duration-150';
        return `
            <button class="aristocracy-tab-btn ${btnClass}" data-key="${key}">
                ${bloodline.name}
            </button>
        `;
    }).join('');

    // Render Content for Active Tab
    const data = BLOODLINE_DATA[normalizedActive] || BLOODLINE_DATA['None'];

    let powersHTML = data.powers.map(p => {
        const isPower = p.type === 'Power';
        const typeBadge = isPower 
            ? '<span class="px-2 py-0.5 text-xs font-bold bg-emerald-900/50 text-emerald-400 border border-emerald-800 rounded-full flex items-center gap-1 flex-shrink-0"><i class="fas fa-plus-circle text-[10px]"></i> Power</span>'
            : '<span class="px-2 py-0.5 text-xs font-bold bg-rose-900/50 text-rose-400 border border-rose-800 rounded-full flex items-center gap-1 flex-shrink-0"><i class="fas fa-minus-circle text-[10px]"></i> Restriction</span>';

        const itemBg = isPower 
            ? 'bg-emerald-950/20 border-emerald-900/20' 
            : 'bg-rose-950/20 border-rose-900/20';

        return `
            <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700/50 flex flex-col md:flex-row md:items-start justify-between gap-3 shadow-md hover:border-slate-600 transition-colors duration-200 ${itemBg}">
                <div class="flex-1">
                    <h5 class="text-base font-bold text-slate-200 flex items-center gap-2">
                        ${p.name}
                    </h5>
                    <p class="text-sm text-slate-300 mt-1 leading-relaxed">
                        ${p.text}
                    </p>
                </div>
                ${typeBadge}
            </div>
        `;
    }).join('');

    contentEl.innerHTML = `
        <div class="space-y-3 animate-fade-in pt-2">
            ${powersHTML}
        </div>
    `;

    // Wire up tab button clicks
    const buttons = tabListEl.querySelectorAll('.aristocracy-tab-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const key = e.target.getAttribute('data-key');
            renderTabContent(key);
        });
    });
}

/**
 * Shows the Aristocracy rules modal, optionally focusing on a specific bloodline tab.
 * @param {string} currentSelection - The bloodline key to focus on ('None', 'Blood Dragon', etc.)
 */
export function showAristocracyModal(currentSelection = 'None') {
    ensureModalExists();
    
    // Normalize input to handle Von Carstei vs Von Carstein
    let focusTab = currentSelection || 'None';
    if (focusTab === 'Von Carstei') {
        focusTab = 'Von Carstein';
    } else if (focusTab === 'Von Carstein Bloodline Powers') {
        focusTab = 'Von Carstein';
    }

    renderTabContent(focusTab);
    displayModal(MODAL_ID);
}
