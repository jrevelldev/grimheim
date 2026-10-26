import { displayModal, hideModal } from '../utility.js';

const MODAL_ID = 'aristocracy-info-modal';

const BLOODLINE_DATA = {
    'None': {
        name: 'Ninguno',
        title: 'Banda de No Muertos Básica',
        description: 'La configuración estándar de banda de No Muertos de Mordheim, que representa un aquelarre tradicional liderado por un Vampiro sin un linaje particular o una criatura recién convertida.',
        powers: [
            {
                name: 'Lista Estándar',
                type: 'Poder',
                text: 'Permite el reclutamiento estándar de No Muertos, reglas de objetos y opciones de equipo según lo especificado en el reglamento de Mordheim.'
            }
        ]
    },
    'Von Carstein': {
        name: 'Von Carstein',
        title: 'Linaje Von Carstein',
        description: 'El linaje vampírico más común y noble. Son elegantes, carismáticos y tienen dominio sobre las criaturas de la noche.',
        powers: [
            {
                name: 'Poderes del Linaje Von Carstein',
                type: 'Poder',
                text: 'El Vampiro tiene acceso a los poderes del linaje específicos de Von Carstein (p. ej., Petrificación, Aura de Majestad, Llamada del Viento, Invocar Murciélagos).'
            }
        ]
    },
    'Blood Dragon': {
        name: 'Dragón Sangriento',
        title: 'Linaje Dragón Sangriento',
        description: 'Caballeros vampíricos dedicados por completo a la perfección marcial y al arte del combate. Buscan a grandes guerreros para poner a prueba sus habilidades.',
        powers: [
            {
                name: 'Destreza Marcial',
                type: 'Poder',
                text: 'Los Vampiros Dragón Sangriento comienzan con +2 a Habilidad de Armas.'
            },
            {
                name: 'Eternamente Valiente',
                type: 'Poder',
                text: 'Los Vampiros Dragón Sangriento pueden repetir el primer chequeo de Retirada fallido (si el Vampiro no está fuera de combate).'
            },
            {
                name: 'Honor',
                type: 'Restricción',
                text: 'Los Vampiros Dragón Sangriento no pueden intentar huir de un combate ni Retirarse Voluntariamente (si el Vampiro no está fuera de combate).'
            },
            {
                name: 'Código del Guerrero',
                type: 'Restricción',
                text: 'Los Vampiros Dragón Sangriento no pueden usar Magia (ni siquiera con el Libro de los Muertos).'
            },
            {
                name: 'Hombres de Armas',
                type: 'Poder',
                text: 'Los Parásitos comienzan con +1 a Habilidad de Armas.'
            }
        ]
    },
    'Necrarchs': {
        name: 'Necrarcas',
        title: 'Linaje Necrarca',
        description: 'Eruditos de la nigromancia herméticos y grotescos que buscan desvelar los secretos de la vida y de la muerte, sacrificando su destreza física en favor de un conocimiento mágico supremo.',
        powers: [
            {
                name: 'Mal Guerrero',
                type: 'Restricción',
                text: 'Los Vampiros Necrarcas comienzan con -2 a Habilidad de Armas, solo pueden armarse con una sola daga, espada, hacha o maza de una mano y no pueden elegir Habilidades de Fuerza.'
            },
            {
                name: 'Saber Nigromántico',
                type: 'Poder',
                text: 'El Necrarca empieza la partida siendo un Hechicero de la misma forma que el Nigromante.'
            },
            {
                name: 'Desprecio a los Vivos',
                type: 'Restricción',
                text: 'No puede contratar ninguna Espada de Alquiler.'
            }
        ]
    },
    'Lahmia': {
        name: 'Lahmia',
        title: 'Linaje Lahmia',
        description: 'Vampiresas seductoras y de impresionante belleza que manipulan reinos desde las sombras. Poseen una rapidez sobrenatural y una elegancia letal.',
        powers: [
            {
                name: 'Mal Guerrero',
                type: 'Restricción',
                text: 'Las Vampiresas Lahmia comienzan con -1 a Habilidad de Armas, no pueden llevar armadura pesada, y solo pueden armarse con una sola daga, espada, hacha o maza de una mano.'
            },
            {
                name: 'Belleza Cautivadora',
                type: 'Poder',
                text: '-1 al Liderazgo de cualquier enemigo vivo mientras esté en contacto peana con peana con la Vampiresa (nota: esto no tiene efecto contra No Muertos ni Demonios).'
            },
            {
                name: 'Velocidad Sobrenatural',
                type: 'Poder',
                text: 'Las Vampiresas Lahmia comienzan con +2 a Iniciativa.'
            }
        ]
    },
    'Strigoi': {
        name: 'Strigoi',
        title: 'Linaje Strigoi',
        description: 'Trágicos parias bestiales que han degenerado en monstruosos Reyes Necrófagos. Son temibles físicamente, pero repudiados tanto por los vivos como por otros no muertos.',
        powers: [
            {
                name: 'Bestial',
                type: 'Poder',
                text: 'Los Vampiros Strigoi comienzan con +1 Ataque pero no pueden usar ningún Objeto ni Equipo.'
            },
            {
                name: 'Odio',
                type: 'Poder',
                text: 'Los Vampiros Strigoi sufren Odio hacia todos los seres vivos.'
            },
            {
                name: 'Rey Necrófago',
                type: 'Poder',
                text: 'Los Vampiros Strigoi pueden contratar hasta un Campeón Necrófago por 50 CO (cuenta como un héroe Necrófago que empieza con 0 PX). Los secuaces Necrófagos cuestan 5 CO menos al contratarlos.'
            },
            {
                name: 'Repudiado',
                type: 'Restricción',
                text: 'Los Vampiros Strigoi contratan Nigromantes y Parásitos con un coste adicional de +10 CO.'
            },
            {
                name: 'Temido',
                type: 'Restricción',
                text: 'Los Vampiros Strigoi no pueden contratar ninguna Espada de Alquiler.'
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
                        Aristocracia de la Noche
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
        const isPower = p.type === 'Power' || p.type === 'Poder';
        const typeBadge = isPower 
            ? '<span class="px-2 py-0.5 text-xs font-bold bg-emerald-900/50 text-emerald-400 border border-emerald-800 rounded-full flex items-center gap-1 flex-shrink-0"><i class="fas fa-plus-circle text-[10px]"></i> Poder</span>'
            : '<span class="px-2 py-0.5 text-xs font-bold bg-rose-900/50 text-rose-400 border border-rose-800 rounded-full flex items-center gap-1 flex-shrink-0"><i class="fas fa-minus-circle text-[10px]"></i> Restricción</span>';

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
