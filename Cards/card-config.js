/**
 * Card Builder Configuration & Component Registry
 * Defines available blocks, default layouts per fighter type, and block settings.
 */

export const FIGHTER_TYPES = [
    { id: 'Hero', label: 'Héroe' },
    { id: 'Henchman', label: 'Secuaz' },
    { id: 'Hired Sword', label: 'Espada de Alquiler' },
    { id: 'Vehicle', label: 'Vehículo' },
    { id: 'Dramatis Personae', label: 'Personaje Ilustre' }
];

export const AVAILABLE_BLOCKS = {
    header: {
        id: 'header',
        name: 'Cabecera e Identidad',
        description: 'Nombre, rol, banda, raza y coste',
        icon: 'fa-id-badge',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword', 'Vehicle', 'Dramatis Personae'],
        defaultOptions: {
            showCost: true,
            showSubtype: true,
            showRace: true,
            showWarbandName: true,
            showGroupCount: true,
            showFees: true
        }
    },
    characteristics: {
        id: 'characteristics',
        name: 'Perfil de Atributos',
        description: 'Tabla de M, HA, HP, F, R, H, I, A, L',
        icon: 'fa-chart-bar',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword', 'Vehicle', 'Dramatis Personae'],
        defaultOptions: {
            applyModifiers: true
        }
    },
    armour_save: {
        id: 'armour_save',
        name: 'Salvación por Armadura',
        description: 'Muestra la salvación calculada (cuerpo a cuerpo, proyectiles o básica)',
        icon: 'fa-shield-alt',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword', 'Dramatis Personae'],
        defaultOptions: {
            showSplit: true
        }
    },
    equipment: {
        id: 'equipment',
        name: 'Armas y Equipo',
        description: 'Armas, armaduras y equipo diverso equipado',
        icon: 'fa-khanda',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword', 'Vehicle', 'Dramatis Personae'],
        defaultOptions: {
            format: 'tags', // 'tags' | 'list'
            showWeaponRules: true
        }
    },
    skills: {
        id: 'skills',
        name: 'Habilidades',
        description: 'Lista de habilidades aprendidas',
        icon: 'fa-book-open',
        allowedTypes: ['Hero', 'Hired Sword', 'Dramatis Personae'],
        defaultOptions: {
            showDescriptions: false
        }
    },
    injuries: {
        id: 'injuries',
        name: 'Heridas Graves',
        description: 'Heridas permanentes y secuelas físicas',
        icon: 'fa-crutch',
        allowedTypes: ['Hero'],
        defaultOptions: {
            showModifiers: true
        }
    },
    special_rules: {
        id: 'special_rules',
        name: 'Reglas Especiales',
        description: 'Reglas especiales innatas y raciales',
        icon: 'fa-scroll',
        allowedTypes: ['Henchman', 'Hired Sword', 'Vehicle', 'Dramatis Personae', 'Hero'],
        defaultOptions: {
            showDescriptions: true,
            format: 'tags'
        }
    },
    spells: {
        id: 'spells',
        name: 'Magia / Hechizos / Plegarias',
        description: 'Hechizos conocidos, saber de magia y dificultad',
        icon: 'fa-hat-wizard',
        allowedTypes: ['Hero', 'Hired Sword', 'Dramatis Personae'],
        defaultOptions: {
            showDifficulty: true
        }
    },
    advancement: {
        id: 'advancement',
        name: 'Hitos de Experiencia (PX)',
        description: 'Casillas de progreso de experiencia',
        icon: 'fa-check-square',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword'],
        defaultOptions: {
            format: 'milestones', // 'milestones' | 'compact'
            prefillEarned: true
        }
    },

    advancement_full: {
        id: 'advancement_full',
        name: 'XP Full',
        description: 'Complete 90-box experience grid with all milestone markers for heroes',
        icon: 'fa-th',
        allowedTypes: ['Hero'],
        defaultOptions: {
            prefillEarned: true
        }
    },
    notes: {
        id: 'notes',
        name: 'Notas y Recordatorios',
        description: 'Notas personalizadas, trasfondo o recordatorios',
        icon: 'fa-sticky-note',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword', 'Vehicle', 'Dramatis Personae'],
        defaultOptions: {
            showBlankLines: false,
            blankLineCount: 2
        }
    },
    blank_lines: {
        id: 'blank_lines',
        name: 'Líneas Pautadas',
        description: 'Líneas pautadas para notas manuscritas o marcas',
        icon: 'fa-grip-lines',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword', 'Vehicle', 'Dramatis Personae'],
        defaultOptions: {
            lineCount: 3
        }
    },
    spacer: {
        id: 'spacer',
        name: 'Espacio / Espaciador (Spacer)',
        description: 'Añade un espacio vertical en blanco o línea entre bloques',
        icon: 'fa-arrows-alt-v',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword', 'Vehicle', 'Dramatis Personae'],
        defaultOptions: {
            height: 'medium', // 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
            style: 'space'    // 'space' | 'line' | 'gold' | 'dashed' | 'double' | 'ornament'
        }
    },
    divider: {
        id: 'divider',
        name: 'Separador / Línea (Divider)',
        description: 'Línea divisoria o segundo espacio para estructurar la carta',
        icon: 'fa-minus',
        allowedTypes: ['Hero', 'Henchman', 'Hired Sword', 'Vehicle', 'Dramatis Personae'],
        defaultOptions: {
            height: 'small',
            style: 'line'
        }
    }
};

/**
 * Default preset configurations per fighter type
 */
export const DEFAULT_LAYOUTS = {
    'Hero': {
        cardDensity: 'normal', // 'compact' | 'normal'
        cardTheme: 'parchment', // 'parchment' | 'clean'
        blocks: [
            { id: 'header', enabled: true, options: { ...AVAILABLE_BLOCKS.header.defaultOptions } },
            { id: 'characteristics', enabled: true, options: { ...AVAILABLE_BLOCKS.characteristics.defaultOptions } },
            { id: 'armour_save', enabled: true, options: { ...AVAILABLE_BLOCKS.armour_save.defaultOptions } },
            { id: 'equipment', enabled: true, options: { ...AVAILABLE_BLOCKS.equipment.defaultOptions } },
            { id: 'skills', enabled: true, options: { ...AVAILABLE_BLOCKS.skills.defaultOptions } },
            { id: 'special_rules', enabled: true, options: { ...AVAILABLE_BLOCKS.special_rules.defaultOptions } },
            { id: 'injuries', enabled: true, options: { ...AVAILABLE_BLOCKS.injuries.defaultOptions } },
            { id: 'spells', enabled: true, options: { ...AVAILABLE_BLOCKS.spells.defaultOptions } },
            { id: 'advancement', enabled: true, options: { ...AVAILABLE_BLOCKS.advancement.defaultOptions } },
            { id: 'advancement_full', enabled: false, options: { ...AVAILABLE_BLOCKS.advancement_full.defaultOptions } },
            { id: 'notes', enabled: false, options: { ...AVAILABLE_BLOCKS.notes.defaultOptions } },
            { id: 'blank_lines', enabled: false, options: { ...AVAILABLE_BLOCKS.blank_lines.defaultOptions } },
            { id: 'spacer', enabled: false, options: { ...AVAILABLE_BLOCKS.spacer.defaultOptions } },
            { id: 'divider', enabled: false, options: { ...AVAILABLE_BLOCKS.divider.defaultOptions } }
        ]
    },
    'Henchman': {
        cardDensity: 'normal',
        cardTheme: 'parchment',
        blocks: [
            { id: 'header', enabled: true, options: { ...AVAILABLE_BLOCKS.header.defaultOptions } },
            { id: 'characteristics', enabled: true, options: { ...AVAILABLE_BLOCKS.characteristics.defaultOptions } },
            { id: 'armour_save', enabled: true, options: { ...AVAILABLE_BLOCKS.armour_save.defaultOptions } },
            { id: 'equipment', enabled: true, options: { ...AVAILABLE_BLOCKS.equipment.defaultOptions } },
            { id: 'special_rules', enabled: true, options: { ...AVAILABLE_BLOCKS.special_rules.defaultOptions } },
            { id: 'advancement', enabled: true, options: { ...AVAILABLE_BLOCKS.advancement.defaultOptions } },
            { id: 'blank_lines', enabled: false, options: { ...AVAILABLE_BLOCKS.blank_lines.defaultOptions } },
            { id: 'spacer', enabled: false, options: { ...AVAILABLE_BLOCKS.spacer.defaultOptions } },
            { id: 'divider', enabled: false, options: { ...AVAILABLE_BLOCKS.divider.defaultOptions } }
        ]
    },
    'Hired Sword': {
        cardDensity: 'normal',
        cardTheme: 'parchment',
        blocks: [
            { id: 'header', enabled: true, options: { ...AVAILABLE_BLOCKS.header.defaultOptions } },
            { id: 'characteristics', enabled: true, options: { ...AVAILABLE_BLOCKS.characteristics.defaultOptions } },
            { id: 'armour_save', enabled: true, options: { ...AVAILABLE_BLOCKS.armour_save.defaultOptions } },
            { id: 'equipment', enabled: true, options: { ...AVAILABLE_BLOCKS.equipment.defaultOptions } },
            { id: 'skills', enabled: true, options: { ...AVAILABLE_BLOCKS.skills.defaultOptions } },
            { id: 'special_rules', enabled: true, options: { ...AVAILABLE_BLOCKS.special_rules.defaultOptions } },
            { id: 'advancement', enabled: true, options: { ...AVAILABLE_BLOCKS.advancement.defaultOptions } },
            { id: 'notes', enabled: false, options: { ...AVAILABLE_BLOCKS.notes.defaultOptions } },
            { id: 'blank_lines', enabled: false, options: { ...AVAILABLE_BLOCKS.blank_lines.defaultOptions } },
            { id: 'spacer', enabled: false, options: { ...AVAILABLE_BLOCKS.spacer.defaultOptions } },
            { id: 'divider', enabled: false, options: { ...AVAILABLE_BLOCKS.divider.defaultOptions } }
        ]
    },
    'Vehicle': {
        cardDensity: 'normal',
        cardTheme: 'parchment',
        blocks: [
            { id: 'header', enabled: true, options: { ...AVAILABLE_BLOCKS.header.defaultOptions } },
            { id: 'characteristics', enabled: true, options: { ...AVAILABLE_BLOCKS.characteristics.defaultOptions } },
            { id: 'equipment', enabled: true, options: { ...AVAILABLE_BLOCKS.equipment.defaultOptions } },
            { id: 'special_rules', enabled: true, options: { ...AVAILABLE_BLOCKS.special_rules.defaultOptions } },
            { id: 'notes', enabled: false, options: { ...AVAILABLE_BLOCKS.notes.defaultOptions } },
            { id: 'blank_lines', enabled: false, options: { ...AVAILABLE_BLOCKS.blank_lines.defaultOptions } },
            { id: 'spacer', enabled: false, options: { ...AVAILABLE_BLOCKS.spacer.defaultOptions } },
            { id: 'divider', enabled: false, options: { ...AVAILABLE_BLOCKS.divider.defaultOptions } }
        ]
    },
    'Dramatis Personae': {
        cardDensity: 'normal',
        cardTheme: 'parchment',
        blocks: [
            { id: 'header', enabled: true, options: { ...AVAILABLE_BLOCKS.header.defaultOptions } },
            { id: 'characteristics', enabled: true, options: { ...AVAILABLE_BLOCKS.characteristics.defaultOptions } },
            { id: 'armour_save', enabled: true, options: { ...AVAILABLE_BLOCKS.armour_save.defaultOptions } },
            { id: 'equipment', enabled: true, options: { ...AVAILABLE_BLOCKS.equipment.defaultOptions } },
            { id: 'skills', enabled: true, options: { ...AVAILABLE_BLOCKS.skills.defaultOptions } },
            { id: 'special_rules', enabled: true, options: { ...AVAILABLE_BLOCKS.special_rules.defaultOptions } },
            { id: 'spells', enabled: true, options: { ...AVAILABLE_BLOCKS.spells.defaultOptions } },
            { id: 'notes', enabled: false, options: { ...AVAILABLE_BLOCKS.notes.defaultOptions } },
            { id: 'blank_lines', enabled: false, options: { ...AVAILABLE_BLOCKS.blank_lines.defaultOptions } },
            { id: 'spacer', enabled: false, options: { ...AVAILABLE_BLOCKS.spacer.defaultOptions } },
            { id: 'divider', enabled: false, options: { ...AVAILABLE_BLOCKS.divider.defaultOptions } }
        ]
    }
};

/**
 * Creates a blank template fighter object for fill-in-the-blank cards (headers and writing lines)
 * @param {string} fighterType
 * @returns {object}
 */
export function getBlankFighter(fighterType = 'Hero') {
    return {
        id: `blank_${fighterType.toLowerCase().replace(/\s+/g, '_')}`,
        name: '',
        type: fighterType,
        warrior_choice: '',
        race: '',
        isBlank: true,
        xp: 0,
        group_size: 1,
        casualties: 0,
        cost: undefined,
        cost_type: 'GC',
        stats: { M: '', WS: '', BS: '', S: '', T: '', W: '', I: '', A: '', Ld: '' },
        equipment: [],
        skills: [],
        special_rules: [],
        injuries: [],
        spells: [],
        notes: ''
    };
}

/**
 * Creates a sample fallback fighter for preview if the warband has none of that type
 */
export function getSampleFighter(fighterType, warband) {
    const warbandName = warband ? warband.name : 'Sample Warband';
    const warbandType = warband ? warband.type : 'Mercenaries of Reikland';

    switch (fighterType) {
        case 'Hero':
            return {
                id: 'sample-hero',
                name: 'Captain',
                type: 'Hero',
                warrior_choice: 'Captain',
                race: 'Human',
                cost: 60,
                cost_type: 'GC',
                xp: 20,
                starting_xp: 20,
                stats: { M: 4, WS: 4, BS: 4, S: 3, T: 3, W: 1, I: 4, A: 1, Ld: 8 },
                equipment: [],
                skills: [],
                injuries: [],
                special_rules: ['Leader'],
                notes: '',
                isTemplateCard: true
            };
        case 'Henchman':
            return {
                id: 'sample-henchman',
                name: 'Reikland Marksmen',
                type: 'Henchman',
                warrior_choice: 'Marksman',
                group_size: 1,
                casualties: 0,
                race: 'Human',
                cost: 25,
                cost_type: 'GC',
                xp: 0,
                starting_xp: 0,
                stats: { M: 4, WS: 3, BS: 4, S: 3, T: 3, W: 1, I: 3, A: 1, Ld: 7 },
                equipment: [],
                skills: [],
                special_rules: ['Marksman (+1 BS)'],
                injuries: [],
                notes: '',
                isTemplateCard: true
            };
        case 'Hired Sword':
            return {
                id: 'sample-hired-sword',
                name: 'Ogre Bodyguard',
                type: 'Hired Sword',
                originalName: 'Ogre Bodyguard',
                race: 'Ogre',
                cost: 80,
                cost_type: 'GC',
                hire_fee: 80,
                upkeep_fee: 30,
                rating: 25,
                xp: 11,
                starting_xp: 11,
                stats: { M: 6, WS: 4, BS: 2, S: 5, T: 5, W: 3, I: 3, A: 3, Ld: 7 },
                equipment: [{ name: 'Two-Handed Weapon', cost: 15, category: 'Hand-to-Hand Weapons' }],
                skills: ['Large Target'],
                special_rules: ['Fear', 'Large Target'],
                injuries: [],
                notes: '',
                isTemplateCard: true
            };
        case 'Vehicle':
            return {
                id: 'sample-vehicle',
                name: 'Opulent Coach',
                type: 'Vehicle',
                originalName: 'Opulent Coach',
                cost: 250,
                cost_type: 'GC',
                stats: {
                    'COACH': { M: 0, WS: 0, BS: 0, S: 0, T: 8, W: 6, I: 0, A: 0, Ld: 0 },
                    'WHEEL': { M: 0, WS: 0, BS: 0, S: 0, T: 6, W: 1, I: 0, A: 0, Ld: 0 },
                    'HORSE': { M: 8, WS: 3, BS: 0, S: 3, T: 3, W: 1, I: 3, A: 1, Ld: 5 }
                },
                equipment: [],
                special_rules: ['Opulent Coach', 'Wagon', 'Do not gain experience'],
                notes: 'Heavily armoured transit for noble patrons.'
            };
        case 'Dramatis Personae':
            return {
                id: 'sample-dp',
                name: 'Aenur, the Sword of Twilight',
                type: 'Dramatis Personae',
                originalName: 'Aenur, the Sword of Twilight',
                race: 'Elf',
                cost: 150,
                cost_type: 'GC',
                hire_fee: 150,
                upkeep_fee: 0,
                rating: 35,
                stats: { M: 5, WS: 6, BS: 6, S: 4, T: 3, W: 2, I: 7, A: 3, Ld: 9 },
                equipment: [
                    { name: 'Ithilmar Sword', cost: 0, category: 'Hand-to-Hand Weapons' }
                ],
                skills: ['Lightning Reflexes', 'Step Aside', 'Dodge'],
                special_rules: ['The Blade of Twilight', 'Unforgiven', 'Do not gain experience'],
                notes: 'A lone wanderer driven by tragic purpose.'
            };
        default:
            return {
                id: 'sample-generic',
                name: 'Warrior',
                type: fighterType,
                stats: { M: 4, WS: 3, BS: 3, S: 3, T: 3, W: 1, I: 3, A: 1, Ld: 7 },
                equipment: [{ name: 'Sword' }]
            };
    }
}
