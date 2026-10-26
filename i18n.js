/**
 * Grimheim - Localización al Castellano (Spanish Localization)
 * Basado en el reglamento oficial de Mordheim de Games Workshop
 */

export const STATS_LABELS = {
    'M': 'M',
    'WS': 'HA',
    'BS': 'HP',
    'S': 'F',
    'T': 'R',
    'W': 'H',
    'I': 'I',
    'A': 'A',
    'Ld': 'L'
};

export const STATS_TITLES = {
    'M': 'Movimiento (M)',
    'WS': 'Habilidad de Armas (HA)',
    'BS': 'Habilidad de Proyectiles (HP)',
    'S': 'Fuerza (F)',
    'T': 'Resistencia (R)',
    'W': 'Heridas (H)',
    'I': 'Iniciativa (I)',
    'A': 'Ataques (A)',
    'Ld': 'Liderazgo (L)'
};

export const WARBANDS_ES = {
    "Cult of the Possessed": "Culto de los Poseídos",
    "Mercenaries": "Mercenarios",
    "Mercenaries: Reikland": "Mercenarios: Reikland",
    "Mercenaries: Middenheim": "Mercenaries: Middenheim",
    "Mercenaries: Marienburg": "Mercenarios: Marienburgo",
    "Witch Hunters": "Cazadores de Brujas",
    "Sisters of Sigmar": "Hermanas de Sigmar",
    "Undead": "No Muertos",
    "Skaven": "Skavens (Clan Eshin)",
    "Skaven Clan Eshin": "Skavens (Clan Eshin)",
    "Dwarf Treasure Hunters": "Enanos Buscadores de Tesoros",
    "Orcs & Goblins": "Orcos y Goblins",
    "Beastmen Raiders": "Incursores Hombres Bestia",
    "Carnival of Chaos": "Carnaval del Caos",
    "Pit Fighters": "Luchadores del Pozo (Gladiadores)",
    "Shadow Warriors": "Guerreros Sombríos Altos Elfos",
    "Averland": "Mercenarios de Averland",
    "Ostland": "Mercenarios de Ostland",
    "Kislevites": "Kislevitas",
    "Lizardmen": "Hombres Lagarto",
    "Dark Elves": "Elfos Oscuros (Druchii)",
    "Possessed": "Poseídos",
    "Restless Dead": "Muertos Inquietos",
    "Bretonnian Knights": "Caballeros Bretonianos",
    "Outlaws of Stirwood Forest": "Fugitivos del Bosque de Stirwood",
    "Gunnery School of Nuln": "Escuela de Artillería de Nuln",
    "Imperial Outriders": "Batidores Imperiales",
    "Hochland Bandits": "Bandidos de Hochland",
    "Merchant Caravans": "Caravanas de Comerciantes",
    "Tilean": "Tileanos"
};

export const WARRIOR_ROLES_ES = {
    // Mercenarios
    "Captain": "Capitán",
    "Mercenary Captain": "Capitán Mercenario",
    "Champion": "Campeón",
    "Champions": "Campeones",
    "Youngblood": "Recluta",
    "Youngbloods": "Reclutas",
    "Marksman": "Tirador",
    "Marksmen": "Tiradores",
    "Swordsman": "Espadachín",
    "Swordsmen": "Espadachines",
    "Warrior": "Guerrero",
    "Warriors": "Guerreros",
    "Fighter": "Guerrero",
    "Fighters": "Guerreros",

    // Cazadores de Brujas
    "Witch Hunter Captain": "Capitán Cazador de Brujas",
    "Witch Hunter": "Cazador de Brujas",
    "Witch Hunters": "Cazadores de Brujas",
    "Warrior Priest": "Sacerdote Guerrero",
    "Zealot": "Fanático",
    "Zealots": "Fanáticos",
    "Warhound": "Sabueso de Guerra",
    "Warhounds": "Sabuesos de Guerra",
    "Flagellant": "Flagelante",
    "Flagellants": "Flagelantes",

    // No Muertos
    "Vampire": "Vampiro",
    "Necromancer": "Nigromante",
    "Dreg": "Paria",
    "Dregs": "Parias",
    "Zombie": "Zombi",
    "Zombies": "Zombis",
    "Ghoul": "Necrófago",
    "Ghouls": "Necrófagos",
    "Dire Wolf": "Lobo Siniestro",
    "Dire Wolves": "Lobos Siniestros",

    // Culto de los Poseídos
    "Magister": "Magíster",
    "Possessed": "Poseído",
    "Mutant": "Mutante",
    "Mutants": "Mutantes",
    "Darksoul": "Alma Oscura",
    "Darksouls": "Almas Oscuras",
    "Brethren": "Hermanos",
    "Chaos Hound": "Sabueso del Caos",
    "Chaos Hounds": "Sabuesos del Caos",

    // Hermanas de Sigmar
    "Matriarch": "Matriarca",
    "Sister Superior": "Hermana Superiora",
    "Augur": "Augur",
    "Sister": "Hermana",
    "Sisters": "Hermanas",
    "Novice": "Novicia",
    "Novices": "Novicias",

    // Skaven
    "Assassin Adept": "Adepto Asesino",
    "Black Hunger": "Hambre Negra",
    "Eshin Sorcerer": "Hechicero Eshin",
    "Night Runner": "Corredor Nocturno",
    "Night Runners": "Corredores Nocturnos",
    "Verminkin": "Guerreros del Clan",
    "Giant Rat": "Rata Gigante",
    "Giant Rats": "Ratas Gigantes",
    "Rat Ogre": "Rata Ogro",

    // Enanos
    "Noble": "Noble Enano",
    "Engineer": "Ingeniero Enano",
    "Troll Slayer": "Matador de Trolls",
    "Troll Slayers": "Matadores de Trolls",
    "Thunderer": "Atronador",
    "Thunderers": "Atronadores",
    "Beardling": "Barbilampiño",
    "Beardlings": "Barbilampiños",
    "Clansman": "Guerrero del Clan Enano",
    "Clansmen": "Guerreros del Clan Enano",

    // Orcos y Goblins
    "Orc Boss": "Jefe Orco",
    "Orc Shaman": "Chamán Orco",
    "Big 'Un": "Grandote",
    "Big 'Uns": "Grandotes",
    "Orc Boy": "Chico Orco",
    "Orc Boyz": "Chicos Orcos",
    "Goblin": "Goblin",
    "Goblins": "Goblins",
    "Cave Squig": "Garrapato Cavernícola",
    "Cave Squigs": "Garrapatos Cavernícolas",

    // Hombres Bestia
    "Chieftain": "Caudillo Hombre Bestia",
    "Shaman": "Chamán Hombre Bestia",
    "Bestigor": "Bestigor",
    "Bestigors": "Bestigors",
    "Gor": "Gor",
    "Gors": "Gores",
    "Ungor": "Ungor",
    "Ungors": "Ungores",
    "Centigor": "Centigor",
    "Warhound of Chaos": "Sabueso de Guerra del Caos"
};

export const FIGHTER_TYPES_ES = {
    'Hero': 'Héroe',
    'hero': 'Héroe',
    'Henchman': 'Secuaz',
    'henchman': 'Secuaz',
    'Hired Sword': 'Espada de Alquiler',
    'Dramatis Personae': 'Personaje Dramático',
    'Vehicle': 'Vehículo'
};

export const RACES_ES = {
    "Human": "Humano",
    "Elf": "Elfo",
    "Dwarf": "Enano",
    "Ogre": "Ogro",
    "Ogre Hunting Party": "Partida de Caza de Ogros",
    "Gnoblar": "Gnoblar",
    "Halfling": "Mediano",
    "Possessed": "Poseído",
    "Vampire": "Vampiro",
    "Saurus": "Saurio",
    "Skaven": "Skaven",
    "Skaven (Clan Pestilens)": "Skaven (Clan Pestilens)",
    "Skink": "Eslizón",
    "Ghoul": "Necrófago",
    "Orc": "Orco",
    "Black Orc": "Orco Negro",
    "Werecreature": "Hombre Lobo / Licántropo",
    "Tomb Lord": "Señor de la Tumba",
    "Beastmen": "Hombres Bestia",
    "Beastman": "Hombre Bestia",
    "Centigors": "Centigores",
    "Centigor": "Centigor",
    "Ungor": "Ungor",
    "Minotaur": "Minotauro",
    "Zombie": "Zombi",
    "Zombie(MH)": "Zombi (MH)",
    "Dire Wolf": "Lobo Siniestro",
    "Warhound": "Sabueso de Guerra",
    "Bear": "Oso",
    "Goblin": "Goblin",
    "Squig": "Garrapato",
    "Troll": "Troll",
    "Warhound of Chaos": "Sabueso de Guerra del Caos",
    "Black Hound": "Sabueso Negro",
    "Cold One": "Gélido",
    "Gigantic Spider": "Araña Gigante",
    "Kroxigor": "Kroxigor",
    "Bull Centaur": "Centauro Toro",
    "Marauder of Chaos": "Bárbaro del Caos",
    "Warrior of Chaos": "Guerrero del Caos",
    "Wild Beast": "Bestia Salvaje",
    "Fighting Ape": "Simio Luchador",
    "Liche": "Liche",
    "Grave Guard": "Guardia de los Túmulos",
    "Wights": "Tumularios",
    "Chaos Dwarf": "Enano del Caos",
    "Bull Centaur Hashut": "Centauro Toro de Hashut",
    "Bull Centaur Black Dwarf": "Centauro Toro Enano Oscuro",
    "Hobgoblin": "Hobgoblin",
    "Dark Elf": "Elfo Oscuro",
    "Wolfman": "Hombre Lobo",
    "Construct": "Constructo",
    "Necrarch Vampire": "Vampiro Necrarca",
    "Skeleton": "Esqueleto",
    "Sabretusk": "Dientes de Sable",
    "Giant Rat": "Rata Gigante",
    "Wolf Rats": "Ratas Lobo",
    "Rat Ogre": "Rata Ogro",
    "Snotling": "Snotling",
    "Wheelo": "Wheelo",
    "Giant Bat": "Murciélago Gigante",
    "Wolfhound": "Lobero",
    "Wolf": "Lobo",
    "Night Goblin": "Goblin Nocturno",
    "Great Squig": "Gran Garrapato",
    "Hunting Cats": "Felinos Cazadores",
    "Wood Spirit": "Espíritu del Bosque",
    "Jackal": "Chacal",
    "Liche Priest": "Sacerdote Liche",
    "Acolyte": "Acólito",
    "Acolyte ": "Acólito",
    "Skeleton Chariot": "Carro de Esqueletos",
    "Mixed": "Mixta",
    "Mix": "Mixta"
};

export const ALIGNMENT_ES = {
    'good': 'Bueno',
    'evil': 'Malvado',
    'neutral': 'Neutral',
    'Good': 'Bueno',
    'Evil': 'Malvado',
    'Neutral': 'Neutral'
};

export const SKILL_CATEGORIES_ES = {
    'Combat': 'Combate',
    'Shooting': 'Disparo',
    'Academic': 'Académicas',
    'Strength': 'Fuerza',
    'Speed': 'Velocidad',
    'Special': 'Especiales'
};

export const EQUIPMENT_NAMES_ES = {
    "Axe": "Hacha",
    "Axe; Dwarf": "Hacha enana",
    "Axe; Great": "Gran hacha",
    "Ball and Chain": "Bola y cadena",
    "Beastlash": "Látigo para bestias",
    "Beastwhip": "Látigo para bestias",
    "Bec de Corbin": "Pico de cuervo (Bec de Corbin)",
    "Bo": "Bastón Bo",
    "Boar Spear": "Lanza de jabalí",
    "Boat Hook": "Bichero",
    "Boss Pole": "Estandarte de jefe",
    "Brass Knuckles": "Puño americano",
    "Brazier Iron": "Brasero de hierro",
    "Broadsword": "Espada ancha",
    "Broadsword of Damnation": "Espada ancha de la condenación",
    "Cat O' Nine Tails": "Gato de nueve colas",
    "Censer": "Incensario",
    "Chain Sticks": "Palos con cadena (Nunchaku)",
    "Chainsaw Sword": "Espada sierra",
    "Chest Talon": "Garra pectoral",
    "Choppa": "Rebanadora",
    "Claw of the Old Ones": "Garra de los Ancestrales",
    "Cleaver": "Cuchillo de carnicero",
    "Club": "Garrote / Porra",
    "Club / Mace / Hammer": "Maza / Martillo / Garrote",
    "Dagger": "Daga",
    "Dagger; Disease": "Daga pestilente",
    "Dagger; Hobgoblin Poisoned": "Daga envenenada hobgoblin",
    "Dagger; Poisoned": "Daga envenenada",
    "Double-handed weapon": "Arma a dos manos",
    "Draich": "Draich (Mandoble de ejecución)",
    "Electric Trident": "Tridente eléctrico",
    "Fighting Claws": "Garras de combate",
    "Flail": "Mangual",
    "Free Dagger": "Daga gratuita",
    "Great Weapon": "Gran arma (dos manos)",
    "Gwen's Rolling Pin": "Rodillo de Gwen",
    "Halberd": "Alabarda",
    "Hammer": "Martillo",
    "Hammer; Horseman's": "Martillo de jinete",
    "Hedonist Whip": "Látigo hedonista",
    "Icefang Axe": "Hacha Colmillo Helado",
    "Iron Fan": "Abanico de hierro",
    "Iron Fist": "Puño de hierro",
    "Ithilmar Weapon": "Arma de Ithilmar",
    "Gromril Weapon": "Arma de Gromril",
    "Kanabo": "Kanabo",
    "Katana": "Katana",
    "Katar": "Katar",
    "Kitchen Knife": "Cuchillo de cocina",
    "Kusarigama": "Kusarigama",
    "Ladle": "Cucharón",
    "Lance": "Lanza de caballería",
    "Lizardman Sword": "Espada de hombre lagarto",
    "Mace": "Maza",
    "Mace, hammer or club": "Maza, martillo o garrote",
    "Mad Max Holy Weapon": "Arma sagrada de Mad Max",
    "Main Gauche": "Daga de parada (Main Gauche)",
    "Man-catcher": "Atrapahombres",
    "Misericordia": "Misericordia",
    "Morning Star": "Mayal de combate",
    "Nagamaki": "Nagamaki",
    "Naginata": "Naginata",
    "Obsidian Axe": "Hacha de obsidiana",
    "Obsidian Hammer": "Martillo de obsidiana",
    "Obsidian Sword": "Espada de obsidiana",
    "Ogre Club": "Garrote de ogro",
    "Pike; Merchant Caravan": "Pica de caravana",
    "Pike; Tilean": "Pica tileana",
    "Poison Dagger": "Daga envenenada",
    "Pry Bar": "Palanca",
    "Quarter Staff": "Bastón de combate",
    "Rapier": "Estoque",
    "Sai": "Sai",
    "Scythe": "Guadaña",
    "Serpent Staff": "Bastón serpiente",
    "Serpent Whip": "Látigo serpiente",
    "Shortsword": "Espada corta",
    "Sigmarite Warhammer": "Martillo de guerra de Sigmar",
    "Silver-tip Stake": "Estaca con punta de plata",
    "Slaaneshi Man-catcher": "Atrapahombres de Slaanesh",
    "Spear": "Lanza",
    "Spiked Gauntlet": "Guantelete con púas",
    "Staff of Damnation": "Bastón de la condenación",
    "Starblade": "Hoja estelar",
    "Starsword": "Espada estelar",
    "Steel Whip": "Látigo de acero",
    "Sword": "Espada",
    "Sword Breaker": "Rompeespadas",
    "Sword; Cathayan Long": "Espada larga de Catay",
    "Sword; Dragon": "Espada dragón",
    "Tanto": "Tanto",
    "Tenderiser": "Ablandador",
    "Thingcatcher": "Atrapacosas",
    "Thornblade": "Hoja de espinas",
    "Trident": "Tridente",
    "Two-handed Weapon": "Arma a dos manos",
    "Wakizashi": "Wakizashi",
    "Warhammer; Sigmarite": "Martillo de guerra de Sigmar",
    "Weeping Blades": "Hojas supurantes",
    "Whip": "Látigo",
    "Whip; Barbed": "Látigo de púas",
    "Whirling Blades": "Hojas giratorias",
    "Wizard Staff": "Bastón de hechicero",
    "Yari": "Yari",
    "Armour; Chaos": "Armadura del Caos",
    "Armour; Heavy": "Armadura pesada",
    "Heavy Armour": "Armadura pesada",
    "Armour; Heavy - Gromril": "Armadura pesada de gromril",
    "Armour; Heavy - Ithilmar": "Armadura pesada de ithilmar",
    "Armour; Heavy Masterwork": "Armadura pesada magistral",
    "Armour; Ithilmar": "Armadura de ithilmar",
    "Ithilmar Armour": "Armadura de ithilmar",
    "Armour; Gromril": "Armadura de gromril",
    "Gromril Armour": "Armadura de gromril",
    "Armour; Lamellar": "Armadura laminar",
    "Armour; Light": "Armadura ligera",
    "Light Armour": "Armadura ligera",
    "Armour; Mechanical Suit": "Traje mecánico",
    "Armour; Toughened Leathers": "Cuero endurecido",
    "Barding": "Barda",
    "Barding; Bretonnian": "Barda bretoniana",
    "Cathayan Quilted Silk Armour": "Armadura de seda acolchada de Catay",
    "Deerhide Leather Armor": "Armadura de piel de ciervo",
    "Helmet": "Casco",
    "Helmet; Cooking Pot": "Casco olla / cacerola",
    "Horo": "Horo (Capa defensiva japonesa)",
    "Sashimono": "Sashimono (Estandarte dorsal)",
    "Throat Guard": "Gorjal / Barbeta",
    "Trophy Slann Holy Headdress": "Tocado sagrado Slann (Trofeo)",
    "Veskit Metalic Body": "Cuerpo metálico de Veskit",
    "Warpstone Armour": "Armadura de piedra bruja",
    "Buckler": "Rodela",
    "Shield": "Escudo",
    "Shield of Sigmar": "Escudo de Sigmar",
    "Shield; Kite": "Escudo de cometa",
    "Shield; Pavise": "Pavés",
    "Pavise": "Pavés",
    "Tourosh Bark": "Corteza de Tourosh",
    "Beast Hunter Throwing Axe": "Hacha arrojadiza de cazador de bestias",
    "Belaying Pins": "Cabillas de amarre",
    "Blowpipe": "Cerbatana",
    "Bolas": "Boleadoras",
    "Bow": "Arco",
    "Bow; Elf": "Arco élfico",
    "Bow; Long": "Arco largo",
    "Bow; Short": "Arco corto",
    "Short Bow": "Arco corto",
    "Long Bow": "Arco largo",
    "Elf Bow": "Arco élfico",
    "Cathayan Candles": "Velas pirotécnicas de Catay",
    "Clan Skryre Warpfire Thrower": "Lanzallamas de disformidad del Clan Skryre",
    "Crossbow": "Ballesta",
    "Crossbow; Harpoon": "Ballesta con arpón",
    "Crossbow; Repeater": "Ballesta de repetición",
    "Repeater Crossbow": "Ballesta de repetición",
    "Crossbow Pistol": "Pistola ballesta",
    "Crossbow; pistol": "Pistola ballesta",
    "Firepots Miragliano": "Vasijas incendiarias de Miragliano",
    "Fish-Hook Shot": "Disparo de anzuelo",
    "Glade-wood Bow": "Arco del Bosque de los Claros",
    "Hankyu": "Hankyu (Arco corto)",
    "Javelins": "Jabalinas",
    "Javelins; Nehekharan": "Jabalinas nehekharianas",
    "Poison Wind Globes": "Globos de viento envenenado",
    "Sharp Stuff": "Cosas afiladas",
    "Sling": "Honda",
    "Slingshot": "Tirachinas",
    "Small Pebble": "Guijarro pequeño",
    "Sun Gauntlet": "Guantelete solar",
    "Sunstaff": "Bastón solar",
    "Sunstaff (Lustria)": "Bastón solar (Lustria)",
    "Throwing Axe": "Hacha arrojadiza",
    "Throwing Axes": "Hachas arrojadizas",
    "Throwing Knives": "Cuchillos arrojadizos",
    "Throwing Stars": "Estrellas arrojadizas",
    "Throwing Knives/Stars": "Cuchillos / Estrellas arrojadizas",
    "Tufenk": "Tufenk (Tubo lanzallamas)",
    "Warpfire Thrower": "Lanzallamas de disformidad",
    "Yumi": "Yumi (Arco largo japonés)",
    "Ball Shot": "Bala sólida",
    "Blunderbuss": "Trabuco",
    "Blunderbuss; Chaos Dwarf": "Trabuco de enano del Caos",
    "Chain Shot": "Bala encadenada",
    "Grape Shot": "Bote de metralla",
    "Handgun": "Arcabuz",
    "Handgun; Double-barrelled": "Arcabuz de doble cañón",
    "Handgun; Repeater": "Arcabuz de repetición",
    "Hersten-Wenkler Pigeon Bombs": "Palomas bomba Hersten-Wenkler",
    "Hochland Long Rifle": "Rifle largo de Hochland",
    "Hunting Rifle": "Rifle de caza",
    "Mortar; Hand-held": "Mortero de mano",
    "Pistol": "Pistola",
    "Brace of Pistols": "Pareja de pistolas",
    "Pistol; Brace": "Pareja de pistolas",
    "Pistol; Double-barrelled": "Pistola de doble cañón",
    "Pistol; Double-barrelled Duelling": "Pistola de duelo de doble cañón",
    "Pistol; Double-barrelled Duelling; Brace": "Pareja de pistolas de duelo de doble cañón",
    "Pistol; Double-barrelled Ostlander": "Pistola de doble cañón de Ostland",
    "Pistol; Double-barrelled Ostlander; Brace": "Pareja de pistolas de doble cañón de Ostland",
    "Pistol; Double-barrelled; Brace": "Pareja de pistolas de doble cañón",
    "Pistol; Duelling": "Pistola de duelo",
    "Duelling Pistol": "Pistola de duelo",
    "Pistol; Duelling; Brace": "Pareja de pistolas de duelo",
    "Brace of Duelling Pistols": "Pareja de pistolas de duelo",
    "Pistol; Repeater": "Pistola de repetición",
    "Pistol; Repeater (Masters Of Horror)": "Pistola de repetición (Maestros del Terror)",
    "Pistol; Warplock": "Pistola bruja",
    "Warplock Pistol": "Pistola bruja",
    "Pistol; Warplock; Brace": "Pareja de pistolas brujas",
    "Rifle; Hunting": "Rifle de caza",
    "Rifle; Ostlander Double-barrelled Hunting": "Rifle de caza de doble cañón de Ostland",
    "Swivel Gun": "Cañón de borda (Pedrero)",
    "Teppo": "Teppo (Arcabuz japonés)",
    "Warplock Jezzail": "Jezzail brujo",
    "Blessed Stag Hide": "Piel de ciervo bendecida",
    "Cloak ; Lizardmen Skin": "Capa de piel de hombre lagarto",
    "Cloak ; White Lion": "Capa de león blanco",
    "Cloak ; White Wolfcloak": "Capa de lobo blanco",
    "Cloak ; Wolfcloak": "Capa de lobo",
    "Cloak; Elven": "Capa élfica",
    "Cloak; Hunters": "Capa de cazador",
    "Cloak; Thief": "Capa de ladrón",
    "Hillman Cloak": "Capa de las colinas",
    "Nomad Robes": "Túnicas nómadas",
    "Rain Coat": "Impermeable",
    "Sabertooth Tiger Hide": "Piel de dientes de sable",
    "Sea Dragon Cloak": "Capa de dragón marino",
    "Amulet of the Moon": "Amuleto de la Luna",
    "Arrows of Blood Ivy": "Flechas de hiedra sangrienta",
    "Asp Arrows": "Flechas de áspid",
    "Banner": "Estandarte",
    "Banner of the Noble House": "Estandarte de la Casa Noble",
    "Bear-Claw Necklace": "Collar de garras de oso",
    "Bearcloak": "Capa de oso",
    "Black Gold Wristbands": "Brazaletes de oro negro",
    "Blessed Bolts": "Virotes bendecidos",
    "Blessed Water": "Agua bendita",
    "Holy Water": "Agua bendita",
    "Book of the Dead": "Libro de los Muertos",
    "Bota Bag": "Bota de vino",
    "Caltrops": "Abrojos",
    "Cat Familiar": "Familiar felino",
    "Cathayan Silk Clothes": "Ropajes de seda de Catay",
    "Chest": "Cofre",
    "Clan Pestilens Banner": "Estandarte del Clan Pestilens",
    "Compass": "Brújula",
    "Conch Shell Horn": "Cuerno de concha marina",
    "Cursed Book": "Libro maldito",
    "Damned Book": "Libro condenado",
    "Dog Familiar": "Familiar canino",
    "Elven Boots": "Botas élficas",
    "Elven Runestones": "Piedras rúnicas élficas",
    "Enchanted Acorns": "Bellotas encantadas",
    "Enchanted Skins": "Pieles encantadas",
    "Falcon": "Halcón",
    "Familiar": "Familiar",
    "Finger Pendant": "Colgante de dedo",
    "Fire Arrows": "Flechas incendiarias",
    "Fire Bomb": "Bomba de fuego",
    "Firecrackers": "Petardos",
    "Flash Powder": "Polvo cegador",
    "Fog-enhancing Warpstone Shards": "Fragmentos de piedra bruja para niebla",
    "Forest Cloak": "Capa forestal",
    "Forest Familiar": "Familiar del bosque",
    "Garlic": "Ajo",
    "Halfling Cookbook": "Libro de recetas del mediano",
    "Hammer of Witches": "Martillo de brujas (Malleus Maleficarum)",
    "Hardtack Biscuits": "Galletas de marinero",
    "Holy (Unholy) Relic": "Reliquia Sagrada (Profana)",
    "Holy Tome": "Tomo Sagrado",
    "Hooded Lantern and Rig": "Linterna sorda con arnés",
    "Hook Hand": "Garfio de mano",
    "Hunting Arrows": "Flechas de caza",
    "Iron Shod Boots": "Botas herradas",
    "Jezzail Support": "Soporte de jezzail (Pabellón)",
    "Jolly Roger": "Bandera pirata (Jolly Roger)",
    "Ladders Large": "Escalas grandes",
    "Ladders Small": "Escalas pequeñas",
    "Lamp of the Djinn": "Lámpara del Genio",
    "Lantern": "Linterna",
    "Liber Bubonicus": "Liber Bubonicus",
    "Liturgicus Infecticus": "Liturgicus Infecticus",
    "Lock Picks": "Ganzúas",
    "Lookout-Gnoblar": "Gnoblar vigía",
    "Luck-Gnoblar": "Gnoblar de la suerte",
    "Lucky Charm": "Amuleto de la suerte",
    "Magic Carpet": "Alfombra mágica",
    "Magic Gubbinz": "Trastos mágicos",
    "Map of Cathay": "Mapa de Catay",
    "Monkey's Paw": "Pata de mono",
    "Mordheim Map": "Mapa de Mordheim",
    "Net": "Red",
    "Parrot": "Loro",
    "Peg Leg": "Pata de palo",
    "Poisoned Weapon": "Arma envenenada",
    "Powder Keg": "Barril de pólvora",
    "Power Squig": "Garrapato de fuerza",
    "Rabbit's Foot": "Pata de conejo",
    "Raven Familiar": "Familiar cuervo",
    "Red Toof Tribal Jewellery": "Joyería tribal Diente Rojo",
    "Ring of Strigos": "Anillo de Strigos",
    "Rope & Hook": "Cuerda y gancho",
    "Rosary": "Rosario",
    "Scorpion Ring": "Anillo de escorpión",
    "Scroll of the Rat Familiar": "Pergamino de familiar rata",
    "Skavenbrew": "Brebaje skaven",
    "Smoke Bomb": "Bomba de humo",
    "Snake Charmer's Flute": "Flauta de encantador de serpientes",
    "Spy Glass": "Catalejo",
    "Squig Prodder": "Picador de garrapatos",
    "Standard of Nagarythe": "Estandarte de Nagarythe",
    "Superior Blackpowder": "Pólvora de calidad superior",
    "Surgeon’s Journal": "Diario del cirujano",
    "Sword-Gnoblar": "Gnoblar portaespadas",
    "Tarot Cards": "Cartas de tarot",
    "Telescope": "Telescopio",
    "Tome of Magic": "Tomo de magia",
    "Torch": "Antorcha",
    "Treasure Map": "Mapa del tesoro",
    "Trip Wire": "Alambre de trampa",
    "Two Cymbals": "Dos platillos",
    "Vemon Ring": "Anillo de veneno",
    "Victuals": "Víveres",
    "Viper Familiar": "Familiar víbora",
    "Vodka": "Vodka",
    "War Horn": "Cuerno de guerra",
    "War Horn of Nagarythe": "Cuerno de guerra de Nagarythe",
    "Warpfire Barrel": "Barril de fuego disforme",
    "Warpstone Amulet": "Amuleto de piedra bruja",
    "Warpstone Shard": "Fragmento de piedra bruja",
    "Wheelbarrow": "Carretilla",
    "Winter Furs": "Pieles de invierno",
    "Wyrdstone Pendulum": "Péndulo de piedra bruja",
    "Birch Wine": "Vino de abedul",
    "Black Lotus": "Loto negro",
    "Bugman’s Ale": "Cerveza de Bugman",
    "Crimson Shade": "Sombra carmesí",
    "Dark Venom": "Veneno oscuro",
    "Elven Wine": "Vino élfico",
    "Healing Herbs": "Hierbas curativas",
    "Mad Cap Mushrooms": "Hongos Sombrerete Loco",
    "Mandrake Root": "Raíz de mandrágora",
    "Manticore Spoor": "Rastro de mantícora",
    "Reptile Venom": "Veneno de reptil",
    "Spider Spittle": "Saliva de araña",
    "Tears of Shallaya": "Lágrimas de Shallaya",
    "Vial of Pestilens": "Vial de Pestilens",
    "Bird of Prey": "Ave de presa",
    "Chaos Steed": "Corcel del Caos",
    "Cold One": "Gélido",
    "Elven Steed": "Corcel élfico",
    "Giant Spider": "Araña gigante",
    "Giant Wolf": "Lobo gigante",
    "Gnoblar Fighter": "Luchador gnoblar",
    "Halfling Hound": "Sabueso mediano",
    "Headless Horesman Horse": "Caballo del jinete sin cabeza",
    "Hobgoblin Giant Wolf": "Lobo gigante hobgoblin",
    "Maglah Khan's Horde Giant Wolf": "Lobo gigante de la horda de Maglah Khan",
    "Mule": "Mula",
    "Nightmare": "Pesadilla",
    "Pantomime Horse": "Caballo de farsa",
    "Pigback Mount": "Montura a espaldas",
    "Rhinox": "Rinoceronte (Rhinox)",
    "Riding/Draft Horse": "Caballo de monta/tiro",
    "Snake": "Serpiente",
    "Temple Dog": "Perro guardián del templo",
    "War Boar": "Jabalí de guerra",
    "Wardogs": "Perros de guerra",
    "Warhorse": "Caballo de guerra",
    "Horse": "Caballo",
    "Cart": "Carro",
    "Wolf Rat Mount": "Montura de rata lobo",
    "Barbary Monkey": "Mono de Berbería",
    "Estalian Warhound": "Sabueso de guerra estaliano",
    "Tilean Hunting Hawk": "Halcón cazador tileano",
    "Blackblood": "Sangre negra",
    "Cloven Hoofs": "Pezuñas hendidas",
    "Daemon Soul": "Alma demoníaca",
    "Extra Arm": "Brazo adicional",
    "Great Claw": "Gran pinza",
    "Hideous": "Aspecto horrible",
    "Scorpion Tail": "Cola de escorpión",
    "Spines": "Espinas",
    "Tentacle": "Tentáculo",
    "Bloated Foulness": "Pudrición hinchada",
    "Cloud of Flies": "Nube de moscas",
    "Mark of Nurgle": "Marca de Nurgle",
    "Nurgle’s Rot": "Pudrición de Nurgle",
    "Stream of Corruption": "Torrente de corrupción",
    "Evil Jester Mask": "Máscara de bufón maligno",
    "Faceless Mask": "Máscara sin rostro",
    "Fish Head Mask": "Máscara de cabeza de pez",
    "Plague Doctor Mask": "Máscara de médico de la peste",
    "Silver Death Mask": "Máscara mortuoria de plata",
    "Sun King Mask": "Máscara del Rey Sol",
    "Loremaster": "Maestro del Saber",
    "Loremaster-Bossuns": "Maestro de Contramaestres",
    "Phoenix Guard": "Guardia del Fénix",
    "Pure of Heart": "Puro de Corazón",
    "Ranger": "Guardabosques",
    "Sea Guard": "Guardia del Mar",
    "Spearmaster": "Maestro de la Lanza",
    "Swordmaster": "Maestro de la Espada",
    "White Lion": "León Blanco",
    "Lords Boon Armour; Heavy": "Don del Señor: Armadura pesada",
    "Lords Boon Armour; Light": "Don del Señor: Armadura ligera",
    "Lords Boon Warhorse": "Don del Señor: Caballo de guerra",
    "Mark of Arkhar the Dog": "Marca de Arkhar el Perro (Khorne)",
    "Mark of Chaos Undivided": "Marca del Caos Absoluto",
    "Mark of Onogal the Crow": "Marca de Onogal el Cuervo (Nurgle)",
    "Mark of Onogal the Crow - Seer": "Marca de Onogal el Cuervo - Vidente (Nurgle)",
    "Mark of Shornaal the Serpent": "Marca de Shornaal la Serpiente (Slaanesh)",
    "Mark of Tchar the Eagle": "Marca de Tchar el Águila (Tzeentch)",
    "Mark of the Old Ones": "Marca de los Ancestrales",
    "Oversized Jaws": "Mandíbulas enormes",
    "Poison Glands": "Glándulas de veneno"
};

export const INJURIES_ES = {
    "Dead": "Muerto",
    "Multiple Injuries": "Múltiples heridas",
    "Leg Wound": "Herida en la pierna (-1 M)",
    "Arm Wound": "Herida en el brazo",
    "Madness": "Locura",
    "Smashed Leg": "Pierna destrozada",
    "Chest Wound": "Herida en el pecho (-1 R)",
    "Blinded in One Eye": "Tuerto (-1 HP)",
    "Old Battle Wound": "Vieja herida de batalla",
    "Nervous Condition": "Estado nervioso (-1 I)",
    "Hand Injury": "Lesión en la mano (-1 HA)",
    "Deep Wound": "Herida profunda (Se pierde la siguiente batalla)",
    "Robbed": "Desvalijado (Pierde todo su equipo)",
    "Full Recovery": "Recuperación total (Sin secuelas)",
    "Bitter Enmity": "Enemistad acérrima",
    "Captured": "Capturado por el enemigo",
    "Hardened": "Curtido (Inmune al miedo)",
    "Survives Against the Odds": "Sobrevive contra todo pronóstico (+1 PX)"
};

export const BATTLE_STATUS_ES = {
    "Standing": "De pie",
    "Knocked Down": "Derribado",
    "Stunned": "Aturdido",
    "Out of Action": "Fuera de combate"
};

export const EQUIPMENT_CATEGORIES_ES = {
    'Close Combat': 'Combate Cuerpo a Cuerpo',
    'Missile Weapon': 'Armas de Proyectiles',
    'Armour': 'Armaduras',
    'Miscellaneous': 'Equipo Diverso',
    'Special Weapons': 'Armas Especiales',
    'Mutations': 'Mutaciones',
    'Blessings of Nurgle': 'Bendiciones de Nurgle',
    'Sacred Markings': 'Marcas Sagradas',
    'Lords Boon': 'Dones del Señor',
    'Vehicles': 'Vehículos',
    'Horses and Animals': 'Monturas y Animales',
    'Special': 'Especial'
};

// Funciones de utilidad para traducción
export const getStatLabel = (stat) => STATS_LABELS[stat] || stat;
export const getStatTitle = (stat, unit = getDistanceUnit()) => {
    if (stat === 'M') {
        return unit === 'cm' ? 'Movimiento en cm (M)' : 'Movimiento en pulgadas (M)';
    }
    return STATS_TITLES[stat] || stat;
};

export const inchesToCm = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return Math.round(num * 2.5);
};

export const cmToInches = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return Math.round(num / 2.5);
};

export const getDistanceUnit = () => {
    try {
        return localStorage.getItem('grimheim_distance_unit') || localStorage.getItem('rosterheim_distance_unit') || 'inches';
    } catch {
        return 'inches';
    }
};

export const setDistanceUnit = (unit) => {
    const clean = unit === 'cm' ? 'cm' : 'inches';
    try {
        localStorage.setItem('grimheim_distance_unit', clean);
        localStorage.setItem('rosterheim_distance_unit', clean);
    } catch (e) {
        console.error('Error saving distance unit:', e);
    }
    updateDistanceUnitButtons(clean);
    window.dispatchEvent(new CustomEvent('distance-unit-changed', { detail: { unit: clean } }));
};

export const formatMovementStat = (val, unit = getDistanceUnit()) => {
    if (val === undefined || val === null || val === '-' || val === '') return val;
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return unit === 'cm' ? inchesToCm(num) : num;
};

export const getMovementTooltip = (val, unit = getDistanceUnit()) => {
    if (val === undefined || val === null || val === '-' || val === '') return 'Movimiento (M)';
    const num = parseFloat(val);
    if (isNaN(num)) return 'Movimiento (M)';
    const inches = num;
    const cm = inchesToCm(num);
    if (unit === 'cm') {
        return `Movimiento: ${cm} cm (${inches}")`;
    }
    return `Movimiento: ${inches}" (${cm} cm)`;
};

export const formatDistanceText = (text, unit = getDistanceUnit()) => {
    if (!text || typeof text !== 'string') return text;

    if (unit === 'inches') {
        let t = text.replace(/(\d+(?:[.,]\d+)?)\s*cm\s*\(\s*(\d+)"\s*\)/gi, '$2"');
        t = t.replace(/\bAlc(?:\.|ance)?\s*(\d+(?:[.,]\d+)?)\s*cm\b/gi, (match, cm) => {
            const inch = Math.round(parseFloat(cm.replace(',', '.')) / 2.5);
            return match.startsWith('Alcance') ? `Alcance ${inch}"` : `Alc. ${inch}"`;
        });
        t = t.replace(/Línea\s*40\s*[×x]\s*3\s*cm/gi, 'Línea 16"×1"');
        t = t.replace(/línea recta de 40 cm de largo por 3 cm de ancho/gi, 'línea recta de 16" de largo por 1" de ancho');
        t = t.replace(/\ba\s*30\s*cm\s*(?:\(12"\))?/gi, 'a 12"');
        t = t.replace(/\ba\s*15\s*cm\s*(?:\(6"\))?/gi, 'a 6"');
        t = t.replace(/\bAtaca a 10 cm\b/gi, 'Ataca a 4"');
        t = t.replace(/Líder\s*\(\s*(?:30\s*cm|12\*)\s*\)/gi, 'Líder (12")');
        return t;
    } else {
        let t = text.replace(/(\d+(?:[.,]\d+)?)\s*cm\s*\(\s*(\d+)"\s*\)/gi, '$1 cm');
        t = t.replace(/\bAlc(?:\.|ance)?\s*(\d+)"/gi, (match, inch) => {
            const cm = Math.round(parseFloat(inch) * 2.5);
            return match.startsWith('Alcance') ? `Alcance ${cm} cm` : `Alc. ${cm} cm`;
        });
        t = t.replace(/Línea\s*16"?\s*[×x]\s*1"?/gi, 'Línea 40×3 cm');
        t = t.replace(/línea recta de 16" de largo por 1" de ancho/gi, 'línea recta de 40 cm de largo por 3 cm de ancho');
        t = t.replace(/\ba\s*12"\b/gi, 'a 30 cm');
        t = t.replace(/\ba\s*6"\b/gi, 'a 15 cm');
        t = t.replace(/\bAtaca a 4"\b/gi, 'Ataca a 10 cm');
        t = t.replace(/Líder\s*\(\s*12["\*]\s*\)/gi, 'Líder (30 cm)');
        return t;
    }
};

export const updateDistanceUnitButtons = (unit = getDistanceUnit()) => {
    const isCm = unit === 'cm';
    const cleanUnit = isCm ? 'cm' : 'inches';

    const select = document.getElementById('distance-unit-select');
    if (select && select.value !== cleanUnit) {
        select.value = cleanUnit;
    }

    const mobileSelect = document.getElementById('mobile-distance-unit-select');
    if (mobileSelect && mobileSelect.value !== cleanUnit) {
        mobileSelect.value = cleanUnit;
    }

    const inchesBtn = document.getElementById('unit-btn-inches');
    const cmBtn = document.getElementById('unit-btn-cm');
    if (inchesBtn && cmBtn) {
        const activeClass = 'bg-slate-700 text-amber-200 border-amber-600/40 font-semibold';
        const inactiveClass = 'text-slate-400 hover:text-slate-200 font-medium';
        if (!isCm) {
            inchesBtn.className = `px-2.5 py-1 rounded transition flex items-center gap-1 border ${activeClass}`;
            cmBtn.className = `px-2.5 py-1 rounded transition flex items-center gap-1 border border-transparent ${inactiveClass}`;
        } else {
            inchesBtn.className = `px-2.5 py-1 rounded transition flex items-center gap-1 border border-transparent ${inactiveClass}`;
            cmBtn.className = `px-2.5 py-1 rounded transition flex items-center gap-1 border ${activeClass}`;
        }
    }
};

export const initDistanceUnitUI = () => {
    updateDistanceUnitButtons();

    const select = document.getElementById('distance-unit-select');
    select?.addEventListener('change', (e) => {
        setDistanceUnit(e.target.value);
    });

    const mobileSelect = document.getElementById('mobile-distance-unit-select');
    mobileSelect?.addEventListener('change', (e) => {
        setDistanceUnit(e.target.value);
    });

    const inchesBtn = document.getElementById('unit-btn-inches');
    const cmBtn = document.getElementById('unit-btn-cm');
    const mobileInchesBtn = document.getElementById('mobile-unit-btn-inches');
    const mobileCmBtn = document.getElementById('mobile-unit-btn-cm');

    inchesBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        setDistanceUnit('inches');
    });
    cmBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        setDistanceUnit('cm');
    });
    mobileInchesBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        setDistanceUnit('inches');
    });
    mobileCmBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        setDistanceUnit('cm');
    });
};

export const translateWarband = (name) => {
    if (!name) return '';
    return WARBANDS_ES[name] || name;
};

export const translateWarrior = (name) => {
    if (!name) return '';
    return WARRIOR_ROLES_ES[name] || name;
};

export const translateWarriorRole = (role) => {
    if (!role) return '';
    return WARRIOR_ROLES_ES[role] || FIGHTER_TYPES_ES[role] || role;
};

export const translateFighterType = (type) => {
    if (!type) return '';
    return FIGHTER_TYPES_ES[type] || type;
};

export const translateRace = (race) => {
    if (!race) return '';
    return RACES_ES[race] || race;
};

export const translateAlignment = (alignment) => {
    if (!alignment) return '';
    return ALIGNMENT_ES[alignment] || alignment;
};

export const translateEquipment = (name) => {
    if (!name) return '';
    return EQUIPMENT_NAMES_ES[name] || name;
};

export const translateEquipmentCategory = (cat) => {
    if (!cat) return '';
    return EQUIPMENT_CATEGORIES_ES[cat] || cat;
};

export const translateInjury = (name) => {
    if (!name) return '';
    return INJURIES_ES[name] || name;
};

export const translateBattleStatus = (status) => {
    if (!status) return '';
    return BATTLE_STATUS_ES[status] || status;
};

export const translateSkillCategory = (cat) => {
    if (!cat) return '';
    return SKILL_CATEGORIES_ES[cat] || cat;
};


export const translateRarity = (rarity) => {
    if (rarity === null || rarity === undefined) return '';
    const str = String(rarity).trim().toLowerCase();
    if (str === 'common') return 'común';
    if (str === 'rare') return 'rara';
    return rarity;
};

export const SPECIAL_RULES_ES = {
    // Reglas universales y de psicología
    "Leader": "Líder",
    "Leader Expanded": "Líder (12\")",
    "Fear": "Miedo",
    "Cause Fear": "Causa Miedo",
    "Terror": "Terror",
    "Cause Terror": "Causa Terror",
    "Immune to Psychology": "Inmune a la Psicología",
    "Immune to psychology": "Inmune a la Psicología",
    "Immune to Poison": "Inmune al Veneno",
    "Immune to poison": "Inmune al Veneno",
    "Immune to Fear": "Inmune al Miedo",
    "No Pain": "Sin Dolor",
    "Frenzy": "Furia Asesina",
    "Hatred": "Odio",
    "Hate": "Odio",
    "Stupidity": "Estupidez",
    "Animosity": "Animosidad",
    "All Alone": "Solo ante el Peligro",
    "All-Alone": "Solo ante el Peligro",
    "Ignore All Alone Tests": "Ignora pruebas de Solo ante el Peligro",
    "Hard to Kill": "Difícil de Matar",
    "Large Target": "Objetivo Grande",
    "Small Target": "Objetivo Pequeño",
    "Scaly Skin": "Piel Escamosa",
    "Lizardmen Scaly Skin": "Piel Escamosa",
    "Cannot become a Hero": "No puede ser Héroe",
    "Fanatical": "Fanático",
    "Stubborn": "Tozudo",
    "Cold Blooded": "Sangre Fría",
    "Fly": "Volar",
    "Flight": "Volar",
    "Giant Bats Fly": "Volar",
    "Climb": "Trepar",
    "Swarm": "Enjambre",
    "Regeneration": "Regeneración",
    "May not run": "No puede correr",
    "May not Run": "No puede correr",
    "Cannot Run": "No puede correr",
    "Do not gain experience": "No gana experiencia",
    "Magic User": "Usuario de Magia",
    "Warrior Wizard": "Mago Guerrero",
    "Prayers": "Plegarias",
    "Prayers of Sigmar": "Plegarias de Sigmar",
    "Prayers of Ulric": "Plegarias de Ulric",
    "Prayers of Taal": "Plegarias de Taal",
    "Lady’s Prayers": "Plegarias de la Dama",
    "Cannot cast spells in armour": "No puede lanzar hechizos con armadura",
    "May not wear armour": "No puede vestir armadura",
    "Strike First": "Ataca Primero",
    "Strike Last": "Ataca en Último Lugar",
    "Parry": "Parada",
    "Poison": "Veneno",
    "Poisoned Attack": "Ataque Envenenado",
    "Poisonous": "Venenoso",
    "Flammable": "Inflamable",
    "Vulnerable to Fire": "Vulnerable al Fuego",
    "Animal": "Animal",
    "Undead": "No Muerto",
    "Demon": "Demonio",
    "Daemon": "Demonio",
    "Daemonic Flesh": "Carne Demoníaca",
    "Daemonic Aura": "Aura Demoníaca",
    "Daemonic Instability": "Inestabilidad Demoníaca",
    "Hardened": "Curtido",
    "Hard Head": "Cabeza Dura",
    "Cloud of Flies": "Nube de Moscas",
    "Stream of Corruption": "Torrente de Corrupción",
    "Nurgle's Blessings": "Bendiciones de Nurgle",
    "Nurgle Rituals": "Rituales de Nurgle",
    "Chaos Rituals": "Rituales del Caos",
    "Necromancy": "Nigromancia",
    "Necromancy (The Restless Dead)": "Nigromancia",
    "Gromril": "Gromril",
    "Ithilmar": "Ithilmar",
    "Grudgebearers": "Rencorosos",
    "Hate Orcs and Goblins": "Odio a Orcos y Goblins",
    "Hate Undead": "Odio a los No Muertos",
    "Hate Skaven": "Odio a los Skavens",
    "Hate Chaos": "Odio al Caos",
    "Hate Dark Elves": "Odio a los Elfos Oscuros",
    "Hate dark elves": "Odio a los Elfos Oscuros",
    "Hate Stunties": "Odio a los Tapones (Enanos)",
    "Drunk": "Borracho",
    "Drunken": "Borracho",
    "Savage": "Salvaje",
    "Crazy": "Loco",
    "Unstable": "Inestable",
    "Self Assured": "Seguro de Sí Mismo",
    "Chivalry": "Caballerosidad",
    "Knight's Virtue": "Virtud del Caballero",
    "Knighthood": "Caballería",
    "Vow of Poverty": "Voto de Pobreza",
    "Vow of poverty": "Voto de Pobreza",
    "Virtue of Purity": "Virtud de la Pureza",
    "Deathwish": "Deseo de Muerte",
    "Infiltration": "Infiltración",
    "Stealthy": "Sigiloso",
    "Natural Stealth": "Sigilo Natural",
    "Druchii Natural Stealth": "Sigilo Natural Druchii",
    "Shinobi Infiltration": "Infiltración Shinobi",
    "Loner": "Solitario",
    "Sniper": "Francotirador",
    "Crack Shot": "Tiro Certero",
    "Deadeye": "Ojo Clínico",
    "Quick Reload": "Recarga Rápida",
    "Gun-Rest": "Horquilla de Apoyo",
    "Recoil": "Retroceso",
    "Vomit": "Vómito Ácido",
    "Vomit Attack": "Vómito Ácido",
    "Trample": "Pisotear",
    "Pounce": "Abalanzarse",
    "Construct": "Constructo",
    "Animated Construct": "Constructo Animado",
    "Undead Construct": "Constructo No Muerto",
    "Scarecrows Flammable": "Espantapájaros Inflamables",
    "No Substance": "Sin Sustancia",
    "Wight Blades": "Armas de Tumulario",
    "Wight weapons": "Armas de Tumulario",
    "Wights Experience": "Experiencia de Tumulario",
    "Plague Cart": "Carreta de la Plaga",
    "Guardian": "Guardián",
    "Mutations": "Mutaciones",
    "Cutpurse": "Cortabolsas",
    "Pickpocket": "Carterista",
    "Petty thief": "Ladrón de poca monta",
    "Peasants": "Campesinos",
    "Rabble": "Chusma",
    "Downtrodden": "Oprimido",
    "Low Caste": "Casta Baja",
    "Lowest of the Low": "Lo más Bajo de lo Bajo",
    "Fungus Brew": "Brebaje de Hongos",
    "Snotling Mob": "Muchedumbre de Snotlings",
    "Snotling Waaagh!": "¡Waaagh! Snotling",
    "Mob Rule": "Regla de la Masa",
    "Mob Mentality": "Mentalidad de Chusma",
    "Da Biggest Boss": "El Kaudillo Más Grande",
    "Eadache!": "¡Dolor de Kabezorro!",
    "Minderz": "Kuidadores",
    "Oi Behave!": "¡Eh, Pórtate Bien!",
    "Poke 'em in the squidgy bits": "Pincha en lo Blando",
    "Squig Movement": "Movimiento de Garrapato",
    "Great Squig Movement": "Movimiento de Gran Garrapato",
    "Handle Animal - Squig": "Manejar Garrapatos",
    "Squig Herder Trained": "Pastor de Garrapatos",
    "Just Squigs": "Solo Garrapatos",
    "Ride Horse": "Montar a Caballo",
    "Ride Spiders": "Montar Arañas",
    "Ride": "Montar",
    "Combat Riding": "Combate Montado",
    "Horse Handling": "Manejo de Caballos",
    "Master Handler": "Maestro de Bestias",
    "Novice Handler": "Manejador Novato",
    "Slavehounds": "Sabuesos Esclavos",
    "War Beasts": "Bestias de Guerra",
    "Wild": "Salvaje",
    "Wild Beast Charge": "Carga de Bestia Salvaje",
    "Fiercely Loyal": "Ferozmente Leal",
    "Disciplined": "Disciplinado",
    "Devoted": "Devoto",
    "Zealous": "Fervoroso",
    "Swordmaster": "Maestro de la Espada",
    "Spear Master": "Maestro de la Lanza",
    "Wall of Steel": "Muralla de Acero",
    "Expert Swordsmen": "Espadachines Expertos",
    "Expert Halberdier": "Alabardero Experto",
    "Lightning Reflexes": "Reflejos Felinos",
    "Ranger": "Guardabosques",
    "Veteran Tracker": "Rastreador Veterano",
    "Trailblazers": "Pioneros",
    "Silent Hunter": "Cazador Silencioso",
    "Silent Guardian": "Guardián Silencioso",
    "Promotion Only": "Solo por Ascenso",
    "Prove that Talent!": "¡Demuestra ese Talento!",
    "Experience": "Experiencia",
    "Slayer Skills": "Habilidades de Matador",
    "Ogre Skills": "Habilidades de Ogro",
    "Lesser Magic": "Magia Menor",
    "Dark Elf Magic": "Magia de los Elfos Oscuros",
    "Goblin Magic": "Magia Goblin",
    "Forest Goblin Magic": "Magia de los Goblins Silvanos",
    "Shadow Warrior Magic": "Magia del Guerrero Sombrío",
    "Waaaagh! Magic": "Magia ¡Waaagh!",
    "Rituals of Hashut": "Rituales de Hashut",
    "Funerary Rites": "Ritos Funerarios",
    "Mortuary Cult Scrolls": "Pergaminos del Culto Mortuorio",
    "Barkskin": "Piel de Roble",
    "Thick Fur": "Pelaje Grueso",
    "Tough Hide": "Piel Dura",
    "Feral Instinct": "Instinto Feral",
    "Unnatural Strength": "Fuerza Antinatural",
    "Maddened With Pain": "Enloquecido por el Dolor",
    "Pain and Pleasure": "Dolor y Placer",
    "Strange Allure": "Atracción Extraña",
    "Vain": "Vanidoso",
    "Loony": "Chiflado",
    "Frantic": "Frenético",
    "Teamwork": "Trabajo en Equipo",
    "Pack Attack": "Ataque en Manada",
    "Pack Leader": "Líder de Manada",
    "Pack Sense": "Sentido de Manada",
    "Pack Work": "Trabajo de Manada",
    "Pack Size": "Tamaño de Manada",
    "Inspired Cooking": "Cocina Inspirada",
    "Master Chef": "Maestro Cocinero",
    "Halfling Promotion": "Ascenso de Mediano",
    "Hireling": "Mercenario",
    "Hirelings": "Mercenarios",
    "Sawbones": "Matasanos",
    "Looting the Dead": "Saquear a los Muertos",
    "Rememberer": "Recordador",
    "Chronicler": "Cronista",
    "Heir to Power": "Heredero del Poder",
    "Inheritance": "Herencia",
    "Decree": "Decreto",
    "Honours": "Honores",
    "Vassal": "Vasallo",
    "Slick Operator": "Operador Astuto",
    "Nasty Reputation": "Mala Reputación",
    "He’s No Threat!": "¡No es una Amenaza!",
    "Don't look at me!": "¡No me mires!",
    "Respect your betters": "Respeta a tus Mayores",
    "Nobody cares about them": "A nadie le importan",
    "Not a Snotling": "No es un Snotling",
    "Not So Small, Surprisingly Tough": "No tan Pequeño, Sorprendentemente Duro",
    "Not So Tough": "No tan Duro",
    "Skinny": "Flaquucho",
    "Skittish": "Asustadizo",
    "Slow Witted": "Lento de Reflejos",
    "Weedy": "Enclenque",
    "Inexperienced": "Inexperto",
    "No Talent": "Sin Talento",
    "No deal": "Sin Trato",
    "No Respect": "Sin Respeto",
    "Scarecrows Flammable": "Espantapájaros Inflamables",
    "It's Alive!": "¡Está Vivo!",
    "Spare Parts": "Piezas de Repuesto",
    "Powered": "Energizado",
    "Metallic Body": "Cuerpo Metálico",
    "Unblinking Eye": "Ojo Inmóvil",
    "The Eye Pendant": "El Colgante del Ojo",
    "Djinn Master": "Amo de los Djinn",
    "Master Wizard": "Maestro Hechicero",
    "Mad Wizard": "Mago Loco",
    "Bare-handed Fighting": "Lucha sin Armas",
    "Pit Master": "Amo del Foso",
    "Thumbs Up": "Pulgar Arriba",
    "Thumbs Down": "Pulgar Abajo"
};

export const SKILLS_ES = {
    // Combate
    "Strike to Injure": "Golpear para Herir",
    "Combat Master": "Maestro del Combate",
    "Weapons Training": "Entrenamiento en Armas",
    "Web of Steel": "Red de Acero",
    "Expert Swordsman": "Espadachín Experto",
    "Step Aside": "Paso al Lado",

    // Disparo
    "Quick Shot": "Disparo Rápido",
    "Pistolier": "Pistolero",
    "Eagle Eyes": "Ojo de Águila",
    "Weapons Expert": "Experto en Armas",
    "Nimble": "Ágil",
    "Trick Shooter": "Tirador Tramposo",
    "Hunter": "Cazador",
    "Knife Fighter": "Luchador con Cuchillo",
    "Axe thrower": "Lanzador de Hachas",

    // Académicas
    "Battle Tongue": "Voz de Mando",
    "Sorcery": "Hechicería",
    "Streetwise": "Conocimiento de los Callejones",
    "Haggle": "Regatear",
    "Arcane Lore": "Saber Arcano",
    "Wyrdstone Hunter": "Buscador de Piedra Bruja",
    "Warrior Wizard": "Mago Guerrero",
    "Scribe": "Escriba",
    "Mind Focus": "Concentración Mental",
    "Tactician": "Táctico",
    "Hunch": "Corazonada",
    "Magical Aptitude": "Aptitud Mágica",
    "Animal Handling": "Manejo de Animales",
    "Tomb Raider": "Saqueador de Tumbas",
    "Trap Expert": "Experto en Trampas",

    // Fuerza
    "Mighty Blow": "Golpe Poderoso",
    "Pit Fighter": "Luchador del Pozo",
    "Resilient": "Resistente",
    "Fearsome": "Temible",
    "Strongman": "Forzudo",
    "Unstoppable Charge": "Carga Imparable",

    // Velocidad
    "Leap": "Salto",
    "Sprint": "Esprintar",
    "Acrobat": "Acróbata",
    "Lightning Reflexes": "Reflejos Felinos",
    "Jump Up": "Ponerse en Pie",
    "Dodge": "Esquivar",
    "Scale Sheer Surfaces": "Escalar Superficies Lisas",

    // Especiales / Raciales
    "Black Hunger": "Hambre Negra",
    "Tail Fighting": "Lucha con la Cola",
    "Art of Silent Death": "Arte de la Muerte Silenciosa",
    "Swarm of Vermin": "Enjambre de Alimañas",
    "Ferocious Charge": "Carga Feroz",
    "Righteous Fury": "Furia Recta",
    "Sign of Sigmar": "Signo de Sigmar",
    "True Believer": "Verdadero Creyente",
    "Armour of Righteousness": "Armadura de Rectitud",
    "Beloved of Sigmar": "Amado de Sigmar",
    "Daemon Soul": "Alma Demoníaca",
    "Dark Majesty": "Majestad Oscura",
    "Spined Hide": "Piel Espinosa",
    "Great Claw": "Gran Pinza",
    "Tentacle": "Tentáculo",
    "Extra Arm": "Brazo Adicional",
    "Cloven Hooves": "Pezuñas Hendidas",
    "Hideous": "Aspecto Horrible",
    "Scorpion Tail": "Cola de Escorpión",
    "Thick Hide": "Piel Gruesa",
    "Lord of the Dead": "Señor de los Muertos",
    "Call of the Vanquished": "Llamada de los Vencidos",
    "Invulnerable": "Invulnerable",
    "Children of the Night": "Hijos de la Noche",
    "Crimson Fury": "Furia Carmesí",
    "Deathless Minions": "Siervos Inmortales",
    "Beguile": "Cautivar",
    "Wolf Form": "Forma de Lobo",
    "Transfix": "Paralizar",
    "Mist Form": "Forma de Niebla",
    "Hunter in the Shadows": "Cazador en las Sombras"
};

export const WEAPON_RULES_ES = {
    // Armas cuerpo a cuerpo
    "sword": {
        short: "Parada (1D6 > imp.)",
        full: "Parada: Si en 1D6 superas la tirada para impactar más alta del rival, paras y anulas el ataque. No puede parar ataques de Fuerza doble o superior."
    },
    "dagger": {
        short: "+1 Salv. rival (6+)",
        full: "+1 a la tirada de salvación por armadura del enemigo (y salvación de 6+ si no tenía normalmente)."
    },
    "axe": {
        short: "Cortante (-1 Salv.)",
        full: "Cortante: -1 adicional a la tirada de salvación por armadura del enemigo."
    },
    "dwarf axe": {
        short: "Cortante (-1 Salv.) y Parada",
        full: "Cortante (-1 adicional a la salvación rival) y permite parar ataques como una espada."
    },
    "club / mace / hammer": {
        short: "Conmoción (2-4 Aturdido)",
        full: "Conmoción: En la tabla de heridas, un resultado de 2-4 se considera aturdido (en lugar de derribado)."
    },
    "club": {
        short: "Conmoción (2-4 Aturdido)",
        full: "Conmoción: En la tabla de heridas, un resultado de 2-4 se considera aturdido (en lugar de derribado)."
    },
    "mace": {
        short: "Conmoción (2-4 Aturdido)",
        full: "Conmoción: En la tabla de heridas, un resultado de 2-4 se considera aturdido (en lugar de derribado)."
    },
    "hammer": {
        short: "Conmoción (2-4 Aturdido)",
        full: "Conmoción: En la tabla de heridas, un resultado de 2-4 se considera aturdido (en lugar de derribado)."
    },
    "double-handed weapon": {
        short: "+2 F, Dos manos, Último",
        full: "+2 a la Fuerza del usuario, Dos manos (no permite escudo ni segunda arma). Ataca siempre en último lugar, incluso si carga."
    },
    "two-handed weapon": {
        short: "+2 F, Dos manos, Último",
        full: "+2 a la Fuerza del usuario, Dos manos. Ataca siempre en último lugar, incluso si carga."
    },
    "halberd": {
        short: "+1 F, Dos manos",
        full: "+1 a la Fuerza del usuario, Dos manos (no permite escudo ni segunda arma en combate cuerpo a cuerpo)."
    },
    "spear": {
        short: "Ataca 1º (1er turno), Caballo (+1 F)",
        full: "Ataca primero en el primer turno de combate cuerpo a cuerpo incluso si ha sido cargado. +1 F a la carga si va montado a caballo."
    },
    "lance": {
        short: "+2 F a la carga (caballo)",
        full: "+2 a la Fuerza en el turno que carga si va montado a caballo. Solo utilizable montado."
    },
    "flail": {
        short: "+2 F (1er turno), Dos manos",
        full: "+2 a la Fuerza en el primer turno de combate cuerpo a cuerpo. Dos manos."
    },
    "morning star": {
        short: "+1 F (1er turno), Difícil de usar",
        full: "+1 a la Fuerza en el primer turno de combate cuerpo a cuerpo. No puede usarse con una segunda arma o rodela."
    },
    "choppa": {
        short: "+1 F (1er turno)",
        full: "+1 a la Fuerza en el primer turno de combate cuerpo a cuerpo."
    },
    "fighting claws": {
        short: "Parada (repite), Trepar",
        full: "Parada: puede parar y repetir una parada fallada. +1 a la Iniciativa al trepar."
    },
    "steel whip": {
        short: "Alc. 10cm, No puede pararse",
        full: "Ataca a 10 cm antes de que empiece el combate cuerpo a cuerpo. No puede ser parado por espadas o rodelas."
    },
    "rapier": {
        short: "Parada, +1 Salv. rival",
        full: "Permite parar como una espada. El enemigo tiene un bonificador de +1 a su tirada de salvación."
    },
    "shortsword": {
        short: "Parada, +1 Salv. rival",
        full: "Permite parar como una espada. El enemigo tiene un bonificador de +1 a su tirada de salvación."
    },
    "warhammer; sigmarite": {
        short: "+1 F, Conmoción, Sagrada",
        full: "+1 a la Fuerza, Conmoción (2-4 aturdido). Causa doble herida contra No Muertos y Poseídos."
    },
    "sword breaker": {
        short: "Parada, Romper arma (4+)",
        full: "Parada: si para un golpe de espada con éxito, con 4+ en 1D6 rompe el arma rival."
    },
    "pike; tilean": {
        short: "Ataca 1º (incluso cargado)",
        full: "Ataca primero en el primer turno de combate cuerpo a cuerpo incluso si es cargado."
    },

    // Armas de proyectiles
    "bow; short": {
        short: "Alc. 40cm (16\"), F3",
        full: "Alcance 40 cm (16\"), Fuerza 3."
    },
    "short bow": {
        short: "Alc. 40cm (16\"), F3",
        full: "Alcance 40 cm (16\"), Fuerza 3."
    },
    "bow": {
        short: "Alc. 60cm (24\"), F3",
        full: "Alcance 60 cm (24\"), Fuerza 3."
    },
    "bow; long": {
        short: "Alc. 75cm (30\"), F3",
        full: "Alcance 75 cm (30\"), Fuerza 3."
    },
    "long bow": {
        short: "Alc. 75cm (30\"), F3",
        full: "Alcance 75 cm (30\"), Fuerza 3."
    },
    "bow; elf": {
        short: "Alc. 90cm (36\"), F3, -1 Salv.",
        full: "Alcance 90 cm (36\"), Fuerza 3, -1 a la salvación enemiga."
    },
    "crossbow": {
        short: "Alc. 75cm (30\"), F4, Mueve o dispara",
        full: "Alcance 75 cm (30\"), Fuerza 4. Mueve o dispara: no puede moverse y disparar en el mismo turno."
    },
    "crossbow; repeater": {
        short: "Alc. 60cm (24\"), F3, Disparo x2 (-1 imp.)",
        full: "Alcance 60 cm (24\"), Fuerza 3. Dispara dos veces con un penalizador de -1 a impactar en ambos disparos."
    },
    "crossbow; pistol": {
        short: "Alc. 25cm (10\"), F4, Disparo en C.a C.",
        full: "Alcance 25 cm (10\"), Fuerza 4. Disparo en C.a C.: se puede disparar en el primer turno de combate a -2 para impactar."
    },
    "pistol": {
        short: "Alc. 15cm (6\"), F4, -2 Salv., C.a C.",
        full: "Alcance 15 cm (6\"), Fuerza 4, -2 a la salvación rival, Recarga (1 tiro cada 2 turnos). En C.a C.: +1 Ataque F4 y -2 salvación en el primer turno."
    },
    "duelling pistol": {
        short: "Alc. 25cm (10\"), F4, +1 Imp., -2 Salv.",
        full: "Alcance 25 cm (10\"), Fuerza 4, Precisión (+1 para impactar en disparo y C.a C.), -2 a la salvación rival, Recarga. En C.a C.: +1 Ataque en el primer turno."
    },
    "pistol; duelling": {
        short: "Alc. 25cm (10\"), F4, +1 Imp., -2 Salv.",
        full: "Alcance 25 cm (10\"), Fuerza 4, Precisión (+1 para impactar), -2 a la salvación rival, Recarga."
    },
    "blunderbuss": {
        short: "Línea 40×3cm, F3, Impacto auto",
        full: "Alcance especial (línea recta de 40 cm de largo por 3 cm de ancho), Fuerza 3, impacto automático a todas las miniaturas en el área. 1 disparo por batalla."
    },
    "handgun": {
        short: "Alc. 60cm (24\"), F4, -2 Salv., Mueve o dispara",
        full: "Alcance 60 cm (24\"), Fuerza 4, -2 a la salvación rival, Recarga (1 tiro cada 2 turnos), Mueve o dispara."
    },
    "hochland long rifle": {
        short: "Alc. 120cm (48\"), F4, -2 Salv., Escoge blanco",
        full: "Alcance 120 cm (48\"), Fuerza 4, -2 a la salvación rival, Recarga, Mueve o dispara, Puede escoger cualquier objetivo visible."
    },
    "rifle; hochland long": {
        short: "Alc. 120cm (48\"), F4, -2 Salv., Escoge blanco",
        full: "Alcance 120 cm (48\"), Fuerza 4, -2 a la salvación rival, Recarga, Mueve o dispara, Puede escoger cualquier objetivo visible."
    },
    "sling": {
        short: "Alc. 45cm (18\"), F3, Disparo x2 a corto alc.",
        full: "Alcance 45 cm (18\"), Fuerza 3. Disparo doble hasta la mitad del alcance (23 cm) si el guerrero no ha movido."
    },
    "throwing knives/stars": {
        short: "Alc. 15cm (6\"), F Usuario",
        full: "Alcance 15 cm (6\"), Fuerza del usuario. Arma arrojadiza (no sufre penalizaciones por mover o largo alcance)."
    },
    "blowpipe": {
        short: "Alc. 20cm (8\"), F1, Veneno",
        full: "Alcance 20 cm (8\"), Fuerza 1. Ataque envenenado (con 6 para impactar hiere automáticamente)."
    },
    "javelins": {
        short: "Alc. 20cm (8\"), F Usuario",
        full: "Alcance 20 cm (8\"), Fuerza del usuario. Arma arrojadiza."
    },

    // Armaduras y escudos
    "shield": {
        short: "+1 Salvación (6+ básica)",
        full: "+1 a la tirada de salvación por armadura (proporciona 6+ básica si no lleva armadura)."
    },
    "buckler": {
        short: "Parada (Repite con espada)",
        full: "Parada: permite parar un impacto si en 1D6 superas el impacto rival. Si se combina con Espada, permite repetir una parada fallada."
    },
    "pavise": {
        short: "+2 Salv. proyectiles (-2,5cm M)",
        full: "+2 a la tirada de salvación contra proyectiles. Cobertura si se planta en el suelo."
    },
    "helmet": {
        short: "Evita aturdido (4+)",
        full: "Evitar aturdimiento: Si resulta aturdido, supera una tirada de 4+ en 1D6 para pasar a estar únicamente derribado."
    },
    "armour; light": {
        short: "Salvación 6+",
        full: "Tirada básica de salvación por armadura de 6+."
    },
    "armour; heavy": {
        short: "Salvación 5+ (-2,5cm M con escudo)",
        full: "Tirada básica de salvación de 5+. -2,5 cm de Movimiento si se combina con un escudo."
    },
    "armour; heavy - ithilmar": {
        short: "Salvación 5+ (sin penaliz. M)",
        full: "Tirada básica de salvación de 5+. El guerrero no sufre penalización de movimiento al llevar escudo."
    },
    "armour; heavy - gromril": {
        short: "Salvación 4+ (sin penaliz. M)",
        full: "Tirada básica de salvación de 4+. El guerrero no sufre penalización de movimiento al llevar escudo."
    },
    "armour; toughened leathers": {
        short: "Salvación 6+",
        full: "Tirada básica de salvación por armadura de 6+."
    },
    "dagger; free": {
        short: "+1 Salv. rival (6+)",
        full: "+1 a la tirada de salvación por armadura del enemigo (y salvación de 6+ si no tenía normalmente)."
    },
    "free dagger": {
        short: "+1 Salv. rival (6+)",
        full: "+1 a la tirada de salvación por armadura del enemigo (y salvación de 6+ si no tenía normalmente)."
    },
    "knife": {
        short: "+1 Salv. rival (6+)",
        full: "+1 a la tirada de salvación por armadura del enemigo (y salvación de 6+ si no tenía normalmente)."
    },
    "cuchillo": {
        short: "+1 Salv. rival (6+)",
        full: "+1 a la tirada de salvación por armadura del enemigo (y salvación de 6+ si no tenía normalmente)."
    },
    "rope & hook": {
        short: "+1 Trepar",
        full: "Cuerda y garfio: Concede un bonificador de +1 a todas las tiradas de Iniciativa para trepar."
    },
    "cuerda y garfio": {
        short: "+1 Trepar",
        full: "Cuerda y garfio: Concede un bonificador de +1 a todas las tiradas de Iniciativa para trepar."
    },
    "lucky charm": {
        short: "4+ Anula 1er imp.",
        full: "Amuleto de la suerte: Concede una tirada de salvación especial de 4+ contra el primer impacto que reciba el portador en la batalla (un solo uso por batalla)."
    },
    "amuleto de la suerte": {
        short: "4+ Anula 1er imp.",
        full: "Amuleto de la suerte: Concede una tirada de salvación especial de 4+ contra el primer impacto que reciba el portador en la batalla (un solo uso por batalla)."
    },
    "rabbit's foot": {
        short: "Repite 1D6",
        full: "Pata de conejo: Permite a su portador repetir una única tirada de 1D6 por batalla (un solo uso por batalla)."
    },
    "pata de conejo": {
        short: "Repite 1D6",
        full: "Pata de conejo: Permite a su portador repetir una única tirada de 1D6 por batalla (un solo uso por batalla)."
    },
    "holy water": {
        short: "1D3 imp. F4 No Muertos",
        full: "Agua bendita: Causa 1D3 impactos de Fuerza 4 a una miniatura No Muerta o Poseída. Se lanza a 15 cm como arma arrojadiza. Un solo uso."
    },
    "agua bendita": {
        short: "1D3 imp. F4 No Muertos",
        full: "Agua bendita: Causa 1D3 impactos de Fuerza 4 a una miniatura No Muerta o Poseída. Se lanza a 15 cm como arma arrojadiza. Un solo uso."
    },
    "garlic": {
        short: "Chequeo L Vampiros",
        full: "Ajo: Cualquier Vampiro que desee atacar en cuerpo a cuerpo al portador debe superar un chequeo de Liderazgo."
    },
    "ajo": {
        short: "Chequeo L Vampiros",
        full: "Ajo: Cualquier Vampiro que desee atacar en cuerpo a cuerpo al portador debe superar un chequeo de Liderazgo."
    },
    "healing herbs": {
        short: "Recupera / Sana",
        full: "Hierbas curativas: Permiten a un guerrero derribado o aturdido recuperarse de inmediato al inicio del turno, o curar una herida grave tras la partida."
    },
    "hierbas curativas": {
        short: "Recupera / Sana",
        full: "Hierbas curativas: Permiten a un guerrero derribado o aturdido recuperarse de inmediato al inicio del turno, o curar una herida grave tras la partida."
    },
    "mad cap mushrooms": {
        short: "Furia Asesina (chequeo R)",
        full: "Hongos sombrero loco: Otorgan Furia Asesina (duplica Ataques). Al inicio de cada turno debe superar un chequeo de R o sufrir 1 herida."
    },
    "hongos sombrero loco": {
        short: "Furia Asesina (chequeo R)",
        full: "Hongos sombrero loco: Otorgan Furia Asesina (duplica Ataques). Al inicio de cada turno debe superar un chequeo de R o sufrir 1 herida."
    },
    "net": {
        short: "Atrapa rival (6 para escapar)",
        full: "Red: Arma arrojadiza a 20 cm. Si impacta, la miniatura enemiga no puede mover ni atacar hasta liberarse sacando un 6 en 1D6."
    },
    "red": {
        short: "Atrapa rival (6 para escapar)",
        full: "Red: Arma arrojadiza a 20 cm. Si impacta, la miniatura enemiga no puede mover ni atacar hasta liberarse sacando un 6 en 1D6."
    },
    "whip": {
        short: "Alc. 10cm, No se para",
        full: "Látigo: Ataca a 10 cm antes de que empiece el combate cuerpo a cuerpo. No puede ser parado por espadas o rodelas."
    },
    "látigo": {
        short: "Alc. 10cm, No se para",
        full: "Látigo: Ataca a 10 cm antes de que empiece el combate cuerpo a cuerpo. No puede ser parado por espadas o rodelas."
    },
    "whip; barbed": {
        short: "+1A carga / Ataca 1º",
        full: "Látigo con púas: Concede +1A en la carga o al ser cargado (ataca primero). No puede ser parado por espadas o rodelas."
    },
    "tarot cards": {
        short: "+1 Exploración",
        full: "Cartas del tarot: Permiten sumar +1 a la tirada de la tabla de Exploración tras la batalla si el usuario no ha quedado fuera de combate."
    },
    "tears of shallaa": {
        short: "Salva lesión permanente",
        full: "Lágrimas de Shallaa: Permiten repetir una tirada de Heridas Graves para evitar una lesión permanente o muerte."
    },
    "superior blackpowder": {
        short: "+1 F disparo pólvora",
        full: "Pólvora de calidad superior: +1 a la Fuerza del primer disparo de cada arma de pólvora en la batalla y permite repetir tiradas de pifia."
    },
    "hunting arrows": {
        short: "Repite herir a corto alc.",
        full: "Flechas de caza: Permiten repetir las tiradas para herir falladas cuando se dispara a corto alcance."
    },
    "fire arrows": {
        short: "Inflamable",
        full: "Flechas de fuego: Si causan herida a una miniatura inflamable, esta arde en llamas y sufre heridas adicionales."
    },
    "wardog": {
        short: "Sabueso M15 F4",
        full: "Sabueso de guerra: M15 HA4 HP0 F4 R3 H1 I4 A1 L5. Causa Miedo en animales. No puede ganar experiencia."
    },
    "warhound": {
        short: "Sabueso M15 F4",
        full: "Sabueso de guerra: M15 HA4 HP0 F4 R3 H1 I4 A1 L5. Causa Miedo en animales. No puede ganar experiencia."
    },
    "horse": {
        short: "+1 Salv., Montura M20",
        full: "Caballo: M20 HA3 HP0 F3 R3 H1 I3 A1 L5. Concede +1 a la salvación por armadura del jinete."
    },
    "warhorse": {
        short: "+1 Salv., Montura M20",
        full: "Caballo de guerra: M20 HA3 HP0 F3 R3 H1 I3 A1 L5. Concede +1 a la salvación por armadura del jinete."
    },
    "elven cloak": {
        short: "Camuflaje (-1 a ser impactado)",
        full: "Capa élfica: Los enemigos sufren un penalizador de -1 para impactarle con armas de proyectiles si está en cobertura (-2 en total)."
    },
    "cathayan silk cloak": {
        short: "Ropajes de seda",
        full: "Capa de seda de Catay: Modifica favorablemente la tirada de supervivencia si el héroe queda fuera de combate."
    },
    "mistletoe": {
        short: "Repite hechizo fallado",
        full: "Muérdago: Permite repetir una tirada de lanzamiento de hechizo fallada una vez por batalla."
    },
    "halfling cookbook": {
        short: "+1 Guerreros en banda",
        full: "Libro de cocina Halfling: Incrementa en +1 el número máximo de guerreros que puede tener la banda."
    },
    "mordheim map": {
        short: "±1 Exploración",
        full: "Mapa de Mordheim: Permite modificar en +1 o -1 la tirada en la tabla de Exploración tras la batalla."
    },
    "tome of magic": {
        short: "Aprende Hechizos",
        full: "Tomo de magia: Permite a un héroe aprender a lanzar hechizos o concede un nuevo hechizo de su lista de magia."
    },
    "black lotus": {
        short: "Veneno (-1 Salv)",
        full: "Loto negro: Veneno para armas. Una tirada para herir de 6 inflige una herida automática con un modificador adicional de -1 a la salvación."
    },
    "dark venom": {
        short: "Veneno mortal",
        full: "Veneno oscuro: Veneno para armas. Una tirada para impactar de 6 hiere automáticamente sin posibilidad de salvación por armadura normal."
    },
    "mandrake root": {
        short: "Inmune a psicología",
        full: "Raíz de mandrágora: Concede inmunidad a la psicología durante toda la batalla debido a los efectos del trance."
    },
    "crimson shade": {
        short: "+1 I, +1 A",
        full: "Sombra carmesí: Otorga +1 a la Iniciativa y +1 Ataque durante una batalla. Requiere tirada de adicción al terminar."
    },
    "deerhide leather armor": {
        short: "Salvación 6+",
        full: "Tirada básica de salvación por armadura de 6+. No combinable con otras armaduras excepto casco o rodela."
    },
    "warpstone armour": {
        short: "Salvación 4+ (permite magia)",
        full: "Salvación básica de 4+. -1 penalización de Movimiento con escudo. No impide lanzar hechizos a hechiceros Skaven."
    },
    "armour; chaos": {
        short: "Salvación 4+ (sin penaliz. M)",
        full: "Armadura del Caos: Salvación básica de 4+. Sin penalización de movimiento con escudo. Permite lanzar magia."
    },
    "armour; lamellar": {
        short: "Salvación 4+ (-2,5cm M con escudo)",
        full: "Armadura laminar: Salvación básica de 4+. -2,5 cm de Movimiento si se combina con un escudo."
    },
    "barding": {
        short: "+1 Salv. jinete (-2,5cm M montura)",
        full: "Barda para caballo de guerra: Concede +1 adicional a la salvación por armadura del jinete. -2,5 cm al Movimiento de la montura."
    },
    "weeping blades": {
        short: "+1A, Parada, Veneno Loto",
        full: "Espadas lloronas: Par de armas (+1 Ataque), Parada (cuenta como espada) y veneno permanente de Loto Negro."
    },
    "fighting claw": {
        short: "Parada (repite), Trepar",
        full: "Garras de combate: Parada (puede parar y repetir una parada fallada). +1 a la Iniciativa al trepar."
    },
    "katar": {
        short: "-1 Salvación rival",
        full: "Katar: -1 adicional a la tirada de salvación por armadura del enemigo."
    },
    "trident": {
        short: "Parada, Ataca 1º al ser cargado",
        full: "Tridente: Permite parar ataques enemigos. Ataca primero en el turno que es cargado."
    },
    "draich": {
        short: "+2 F, A Dos Manos",
        full: "Draich: +2 a la Fuerza del usuario, Dos manos. A diferencia de otras armas a dos manos, no ataca en último lugar."
    }
};

export const translateSpecialRule = (rule) => {
    if (!rule) return '';
    const raw = String(rule).trim();
    if (SPECIAL_RULES_ES[raw]) return SPECIAL_RULES_ES[raw];
    const clean = raw.toLowerCase();
    for (const [key, val] of Object.entries(SPECIAL_RULES_ES)) {
        if (key.toLowerCase() === clean) return val;
    }
    return raw;
};

export const translateSkill = (skill) => {
    if (!skill) return '';
    const raw = String(skill).trim();
    if (SKILLS_ES[raw]) return SKILLS_ES[raw];
    const clean = raw.toLowerCase();
    for (const [key, val] of Object.entries(SKILLS_ES)) {
        if (key.toLowerCase() === clean) return val;
    }
    return raw;
};

const _resolveRawWeaponRule = (name) => {
    if (!name) return { short: '', full: '' };
    const raw = String(name).trim();
    const clean = raw.toLowerCase();
    
    // Direct match
    if (WEAPON_RULES_ES[clean]) {
        return WEAPON_RULES_ES[clean];
    }
    
    // Check against Spanish equipment names dictionary
    const esName = (EQUIPMENT_NAMES_ES[raw] || '').toLowerCase();
    if (esName && WEAPON_RULES_ES[esName]) {
        return WEAPON_RULES_ES[esName];
    }
    for (const [enKey, esVal] of Object.entries(EQUIPMENT_NAMES_ES)) {
        if (esVal.toLowerCase() === clean) {
            const enClean = enKey.toLowerCase();
            if (WEAPON_RULES_ES[enClean]) return WEAPON_RULES_ES[enClean];
        }
    }

    // Substring checks for variants
    if (clean.includes('sword') || clean.includes('espada')) {
        return WEAPON_RULES_ES['sword'];
    }
    if (clean.includes('dagger') || clean.includes('daga') || clean.includes('knife') || clean.includes('cuchillo')) {
        return WEAPON_RULES_ES['dagger'];
    }
    if (clean.includes('short bow') || clean.includes('bow; short') || clean.includes('arco corto')) {
        return WEAPON_RULES_ES['bow; short'];
    }
    if (clean.includes('long bow') || clean.includes('bow; long') || clean.includes('arco largo')) {
        return WEAPON_RULES_ES['bow; long'];
    }
    if (clean.includes('elf bow') || clean.includes('bow; elf') || clean.includes('arco élfico')) {
        return WEAPON_RULES_ES['bow; elf'];
    }
    if (clean.includes('crossbow; repeater') || clean.includes('ballesta de repetición')) {
        return WEAPON_RULES_ES['crossbow; repeater'];
    }
    if (clean.includes('crossbow; pistol') || clean.includes('pistola ballesta')) {
        return WEAPON_RULES_ES['crossbow; pistol'];
    }
    if (clean.includes('crossbow') || clean.includes('ballesta')) {
        return WEAPON_RULES_ES['crossbow'];
    }
    if (clean.includes('duelling pistol') || clean.includes('pistola de duelo')) {
        return WEAPON_RULES_ES['duelling pistol'];
    }
    if (clean.includes('pistol') || clean.includes('pistola')) {
        return WEAPON_RULES_ES['pistol'];
    }
    if (clean.includes('blunderbuss') || clean.includes('trabuco')) {
        return WEAPON_RULES_ES['blunderbuss'];
    }
    if (clean.includes('handgun') || clean.includes('arcabuz')) {
        return WEAPON_RULES_ES['handgun'];
    }
    if (clean.includes('hochland') || clean.includes('rifle')) {
        return WEAPON_RULES_ES['hochland long rifle'];
    }
    if (clean.includes('sling') || clean.includes('honda')) {
        return WEAPON_RULES_ES['sling'];
    }
    if (clean.includes('bow') || clean.includes('arco')) {
        return WEAPON_RULES_ES['bow'];
    }
    if (clean.includes('axe') || clean.includes('hacha')) {
        return WEAPON_RULES_ES['axe'];
    }
    if (clean.includes('halberd') || clean.includes('alabarda')) {
        return WEAPON_RULES_ES['halberd'];
    }
    if (clean.includes('spear') || clean.includes('lanza')) {
        return WEAPON_RULES_ES['spear'];
    }
    if (clean.includes('lance')) {
        return WEAPON_RULES_ES['lance'];
    }
    if (clean.includes('flail') || clean.includes('mayal') || clean.includes('mangual')) {
        return WEAPON_RULES_ES['flail'];
    }
    if (clean.includes('morning star') || clean.includes('estrella matutina')) {
        return WEAPON_RULES_ES['morning star'];
    }
    if (clean.includes('club') || clean.includes('mace') || clean.includes('hammer') || clean.includes('garrote') || clean.includes('maza') || clean.includes('martillo')) {
        return WEAPON_RULES_ES['club / mace / hammer'];
    }
    if (clean.includes('shield') || clean.includes('escudo')) {
        return WEAPON_RULES_ES['shield'];
    }
    if (clean.includes('buckler') || clean.includes('rodela')) {
        return WEAPON_RULES_ES['buckler'];
    }
    if (clean.includes('helmet') || clean.includes('casco')) {
        return WEAPON_RULES_ES['helmet'];
    }
    if (clean.includes('gromril')) {
        return WEAPON_RULES_ES['armour; heavy - gromril'];
    }
    if (clean.includes('ithilmar')) {
        return WEAPON_RULES_ES['armour; heavy - ithilmar'];
    }
    if (clean.includes('heavy') || clean.includes('pesada')) {
        return WEAPON_RULES_ES['armour; heavy'];
    }
    if (clean.includes('light') || clean.includes('ligera')) {
        return WEAPON_RULES_ES['armour; light'];
    }

    return { short: '', full: '' };
};

export const getWeaponRuleSummary = (name, unit = getDistanceUnit()) => {
    const raw = _resolveRawWeaponRule(name);
    if (!raw) return { short: '', full: '' };
    return {
        short: formatDistanceText(raw.short, unit),
        full: formatDistanceText(raw.full, unit)
    };
};

export const SPECIAL_RULE_REMINDERS_ES = {
    'Sin Dolor': {
        short: 'Aturdido = Derribado',
        full: 'Trata los resultados de Aturdido en la tabla de heridas como Derribado.'
    },
    'Inmune a la Psicología': {
        short: 'Inmune Miedo/Terror/Pánico',
        full: 'No le afectan el Miedo, el Terror, el Pánico ni las pruebas de Solo ante el Peligro. No puede entrar en Furia Asesina.'
    },
    'Inmune al Veneno': {
        short: 'Inmune a venenos',
        full: 'No le afecta ningún tipo de veneno, toxina o ataque venenoso.'
    },
    'Inmune al Miedo': {
        short: 'Inmune a Miedo',
        full: 'Supera automáticamente cualquier chequeo de Miedo.'
    },
    'Líder': {
        short: 'Liderazgo a 15 cm',
        full: 'Permite a los guerreros aliados a 15 cm (6") o menos utilizar su atributo de Liderazgo.'
    },
    'Líder (12")': {
        short: 'Liderazgo a 30 cm',
        full: 'Permite a los guerreros aliados a 30 cm (12") o menos utilizar su atributo de Liderazgo.'
    },
    'Miedo': {
        short: 'Chequeo L al cargar',
        full: 'Causa chequeo de Miedo (Liderazgo) a los enemigos al cargar o ser cargado. Si fallan, necesitan 6s para impactar o no pueden cargar.'
    },
    'Causa Miedo': {
        short: 'Chequeo L al cargar',
        full: 'Causa chequeo de Miedo (Liderazgo) a los enemigos al cargar o ser cargado. Si fallan, necesitan 6s para impactar o no pueden cargar.'
    },
    'Terror': {
        short: 'Causa Terror (huida)',
        full: 'Causa chequeo de Terror al ser visto o cargar. Si se falla, el enemigo huye de inmediato.'
    },
    'Causa Terror': {
        short: 'Causa Terror (huida)',
        full: 'Causa chequeo de Terror al ser visto o cargar. Si se falla, el enemigo huye de inmediato.'
    },
    'Furia Asesina': {
        short: 'x2 Ataques (debe cargar)',
        full: 'Duplica sus Ataques en cuerpo a cuerpo e ignora psicología. Debe cargar siempre si hay enemigos a distancia.'
    },
    'Odio': {
        short: 'Repite impactar 1er T',
        full: 'Repite todas las tiradas para impactar falladas en el primer turno de cada combate cuerpo a cuerpo.'
    },
    'Estupidez': {
        short: 'Chequeo L al inicio',
        full: 'Debe chequear Liderazgo al inicio de cada turno si no está trabado. Si falla, se mueve a mitad o se queda quieto.'
    },
    'Animosidad': {
        short: '1D6 al inicio (1 = pelea)',
        full: 'Tira 1D6 por secuaz Orco/Goblin al inicio del turno. Con un 1, tira en la tabla de animosidad.'
    },
    'Difícil de Matar': {
        short: '-1 Herida Grave',
        full: 'Resta 1 a la tirada en la tabla de Heridas Graves al quedar fuera de combate (un 6 cuenta como 5).'
    },
    'Cabeza Dura': {
        short: 'Ignora Conmoción',
        full: 'Ignora la regla especial conmoción causada por armas contundentes como mazas y martillos.'
    },
    'Objetivo Grande': {
        short: '+1 a impactarle',
        full: 'Los enemigos reciben un modificador de +1 para impactarle con armas de proyectiles.'
    },
    'Objetivo Pequeño': {
        short: '-1 a impactarle',
        full: 'Los enemigos sufren un modificador de -1 para impactarle con armas de proyectiles.'
    },
    'Piel Escamosa': {
        short: 'Salvación natural',
        full: 'Posee una tirada de salvación natural por armadura gracias a su dura piel o escamas.'
    },
    'Regeneración': {
        short: '4+ Anula herida',
        full: 'Tira 1D6 por cada herida sufrida. Con 4+, la herida queda completamente anulada.'
    },
    'Volar': {
        short: 'Mov 30 cm (ignora terreno)',
        full: 'Vuela hasta 30 cm (12") por turno ignorando obstáculos y terreno difícil.'
    },
    'Trepar': {
        short: 'Sin chequeo I',
        full: 'Puede trepar edificios y muros sin necesidad de realizar chequeos de Iniciativa.'
    },
    'No puede correr': {
        short: 'Solo mov normal',
        full: 'No puede duplicar su movimiento para correr, aunque sí puede declarar cargas con normalidad.'
    },
    'No gana experiencia': {
        short: 'Sin PX',
        full: 'No obtiene puntos de experiencia ni realiza tiradas de avance.'
    },
    'No puede ser Héroe': {
        short: 'Sin ascenso a Héroe',
        full: 'No puede convertirse en Héroe si obtiene el resultado "Ese Chico Promete".'
    },
    'Sangre Fría': {
        short: '3D6 en L (2 mejores)',
        full: 'Tira 3D6 en los chequeos de Liderazgo y descarta el dado con el resultado más alto.'
    },
    'Ataca Primero': {
        short: 'Ataca 1º en CaC',
        full: 'Ataca siempre en primer lugar en combate cuerpo a cuerpo, incluso antes que los que cargan.'
    },
    'Ataca en Último Lugar': {
        short: 'Ataca último',
        full: 'Ataca en último lugar en combate cuerpo a cuerpo, independientemente de la Iniciativa.'
    },
    'Parada': {
        short: 'Parada con arma',
        full: 'Puede intentar parar un impacto cuerpo a cuerpo superando la tirada para impactar del atacante.'
    },
    'Solo ante el Peligro': {
        short: 'Chequeo L si superado',
        full: 'Debe chequear Liderazgo si combate solo contra 2+ enemigos sin aliados a 15 cm.'
    },
    'Ignora pruebas de Solo ante el Peligro': {
        short: 'Ignora Solo ante Peligro',
        full: 'Nunca necesita efectuar chequeos de Solo ante el Peligro.'
    },
    'Veneno': {
        short: 'Hiere auto con 6',
        full: 'Cualquier tirada de 6 para impactar hiere de forma automática, independientemente de la Resistencia.'
    },
    'Ataque Envenenado': {
        short: 'Hiere auto con 6',
        full: 'Cualquier tirada de 6 para impactar hiere de forma automática, independientemente de la Resistencia.'
    },
    'Venenoso': {
        short: 'Hiere auto con 6',
        full: 'Cualquier tirada de 6 para impactar hiere de forma automática, independientemente de la Resistencia.'
    },
    'Inflamable': {
        short: 'Doble daño por fuego',
        full: 'Sufre el doble de heridas por ataques de fuego o hechizos basados en llamas.'
    },
    'Vulnerable al Fuego': {
        short: 'Doble daño por fuego',
        full: 'Sufre el doble de heridas por ataques de fuego o hechizos basados en llamas.'
    },
    'No Muerto': {
        short: 'Inmune psic/ven, Sin dolor',
        full: 'Inmune a psicología y venenos, no sufre dolor (Aturdido = Derribado) y no puede correr.'
    },
    'Animal': {
        short: 'Sin PX, no líder',
        full: 'No gana experiencia, no puede convertirse en Héroe ni liderar la banda.'
    },
    'Demonio': {
        short: 'Esp 4+, inmune psic',
        full: 'Salvación especial demoníaca de 4+, inmune a venenos y a toda la psicología.'
    },
    'Tozudo': {
        short: 'Repite chequeos L',
        full: 'Puede repetir cualquier chequeo de Liderazgo o moral fallado.'
    },
    'Fanático': {
        short: 'Inmune a psicología',
        full: 'Completamente inmune a todos los efectos psicológicos y chequeos de moral.'
    },
    'Ágil': {
        short: '+1 Trepar / Saltar',
        full: 'Recibe +1 a los chequeos de Iniciativa para trepar, saltar huecos o evitar caídas.'
    },
    'Camuflaje': {
        short: '-1 a ser impactado',
        full: 'Los enemigos sufren un penalizador de -1 al dispararle cuando se encuentra en cobertura.'
    },
    'Infiltración': {
        short: 'Despliegue libre',
        full: 'Puede desplegarse en cualquier lugar del campo a más de 30 cm de los enemigos y fuera de su visión.'
    },
    'Sigiloso': {
        short: 'Ocultación mejorada',
        full: 'Puede ocultarse incluso a la vista de enemigos que estén a más de 10 cm si está en cobertura.'
    },
    'Sigilo Natural': {
        short: 'Ocultación mejorada',
        full: 'Puede ocultarse incluso a la vista de enemigos que estén a más de 10 cm si está en cobertura.'
    },
    'Enjambre': {
        short: 'Inmune a psicología',
        full: 'No le afecta la psicología ni las pruebas de Solo ante el Peligro.'
    },
    'Ataque de Mordisco': {
        short: '+1 Ataque mordisco',
        full: 'Realiza un ataque adicional de mordisco con la Fuerza del perfil en cada ronda de combate.'
    },
    'Deseo de Muerte': {
        short: 'Inmune a psicología',
        full: 'Busca una muerte honorable; inmune a psicología y nunca realiza chequeos de Solo ante el Peligro.'
    },
    'Borracho': {
        short: 'Inmune psic, -1 I',
        full: 'Inmune a la psicología por estar ebrio, pero sufre un penalizador de -1 a la Iniciativa.'
    },
    'No puede lanzar hechizos con armadura': {
        short: 'Sin armadura para magia',
        full: 'No puede lanzar hechizos ni plegarias si lleva cualquier tipo de armadura o escudo.'
    },
    'No puede vestir armadura': {
        short: 'Sin armadura',
        full: 'No puede equipar ni vestir ningún tipo de armadura corporal ni escudo.'
    },
    'Rencorosos': {
        short: 'Odio a Orcos y Goblins',
        full: 'Sujeto a las reglas de Odio hacia cualquier miniatura de piel verde.'
    },
    'Odio a los No Muertos': {
        short: 'Odio a No Muertos',
        full: 'Sujeto a las reglas de Odio hacia cualquier miniatura No Muerta.'
    },
    'Odio a los Skavens': {
        short: 'Odio a Skavens',
        full: 'Sujeto a las reglas de Odio hacia cualquier miniatura Skaven.'
    },
    'Odio al Caos': {
        short: 'Odio al Caos',
        full: 'Sujeto a las reglas de Odio hacia miniaturas devotas del Caos.'
    },
    'Odio a los Elfos Oscuros': {
        short: 'Odio a Elfos Oscuros',
        full: 'Sujeto a las reglas de Odio hacia cualquier Elfo Oscuro.'
    },
    'Caballerosidad': {
        short: 'Código de honor',
        full: 'No puede usar armas de proyectiles ni atacar a traición; sigue el código de caballería.'
    },
    'Voto de Pobreza': {
        short: 'Sin armas mágicas/oro',
        full: 'No puede portar objetos mágicos ni acumular tesoros.'
    },
    'Virtud de la Pureza': {
        short: 'Inmune Solo ante Peligro',
        full: 'Nunca huye voluntariamente del combate y es inmune a Solo ante el Peligro.'
    },
    'Curtido': {
        short: 'Inmune a Miedo',
        full: 'Habiendo sobrevivido a incontables horrores, es inmune a las pruebas de Miedo.'
    },
    'Carne Demoníaca': {
        short: 'Salvación especial 5+',
        full: 'Otorga una tirada de salvación especial de 5+ contra cualquier herida.'
    },
    'Aura Demoníaca': {
        short: 'Salvación especial 5+',
        full: 'Protección sobrenatural que concede una tirada de salvación especial de 5+.'
    },
    'Inestabilidad Demoníaca': {
        short: 'Chequeo L al perder',
        full: 'Si pierde un combate cuerpo a cuerpo, debe chequear Liderazgo o sufrir heridas adicionales.'
    },
    'Nube de Moscas': {
        short: '-1 a impactarle en CaC',
        full: 'Cualquier enemigo en combate cuerpo a cuerpo sufre un penalizador de -1 para impactarle.'
    },
    'Torrente de Corrupción': {
        short: 'Ataque de vómito F3',
        full: 'Puede lanzar un vómito putrefacto con plantilla que impacta con Fuerza 3 ignorando armadura.'
    },
    'Bendiciones de Nurgle': {
        short: 'Bendición de plaga',
        full: 'Favorecido por el Señor de la Plaga; inmune a venenos y enfermedades.'
    }
};

const _resolveRawSpecialRule = (ruleName) => {
    if (!ruleName || typeof ruleName !== 'string') {
        return { name: '', short: '', full: '' };
    }
    const raw = ruleName.trim();
    const esName = translateSpecialRule(raw);

    // Try direct Spanish or English key
    if (SPECIAL_RULE_REMINDERS_ES[esName]) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES[esName] };
    }
    if (SPECIAL_RULE_REMINDERS_ES[raw]) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES[raw] };
    }

    // Try case and accent normalized match
    const clean = esName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    for (const [key, val] of Object.entries(SPECIAL_RULE_REMINDERS_ES)) {
        const kClean = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (kClean === clean) {
            return { name: esName, ...val };
        }
    }

    // Partial contains matches for common patterns
    if (clean.includes('sin dolor') || clean.includes('no pain')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Sin Dolor'] };
    }
    if (clean.includes('inmune a la psicologia') || clean.includes('inmune a psicologia') || clean.includes('immune to psychology')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Inmune a la Psicología'] };
    }
    if (clean.includes('inmune al veneno') || clean.includes('immune to poison')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Inmune al Veneno'] };
    }
    if (clean.includes('inmune al miedo') || clean.includes('immune to fear')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Inmune al Miedo'] };
    }
    if (clean.includes('lider') || clean.includes('leader')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Líder'] };
    }
    if (clean.includes('miedo') || clean.includes('fear')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Miedo'] };
    }
    if (clean.includes('furia asesina') || clean.includes('frenzy')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Furia Asesina'] };
    }
    if (clean.includes('odio') || clean.includes('hatred')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Odio'] };
    }
    if (clean.includes('estupidez') || clean.includes('stupidity')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Estupidez'] };
    }
    if (clean.includes('animosidad') || clean.includes('animosity')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Animosidad'] };
    }
    if (clean.includes('dificil de matar') || clean.includes('hard to kill')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Difícil de Matar'] };
    }
    if (clean.includes('cabeza dura') || clean.includes('hard head')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Cabeza Dura'] };
    }
    if (clean.includes('regeneracion') || clean.includes('regeneration')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Regeneración'] };
    }
    if (clean.includes('piel escamosa') || clean.includes('scaly skin')) {
        return { name: esName, ...SPECIAL_RULE_REMINDERS_ES['Piel Escamosa'] };
    }

    return { name: esName, short: '', full: '' };
};

export const getSpecialRuleSummary = (ruleName, unit = getDistanceUnit()) => {
    const raw = _resolveRawSpecialRule(ruleName);
    if (!raw) return { name: '', short: '', full: '' };
    return {
        name: raw.name,
        short: formatDistanceText(raw.short, unit),
        full: formatDistanceText(raw.full, unit)
    };
};

export const INJURY_DESCRIPTIONS_ES = {
    "Leg Wound": "La pierna del guerrero está rota. Sufre un penalizador permanente de -1 a su atributo de Movimiento (M).",
    "Arm Wound (Light)": "El guerrero se lesiona levemente un brazo y debe perderse la próxima partida mientras se recupera.",
    "Arm Wound (Severe)": "El brazo del guerrero queda gravemente inutilizado. Solo puede empuñar una única arma de una mano (no puede portar armas a dos manos ni segunda arma).",
    "Madness (Stupidity)": "El guerrero pierde la razón y queda sujeto permanentemente a la regla especial de Estupidez.",
    "Madness (Frenzy)": "La mente del guerrero enloquece de rabia y queda sujeto permanentemente a la regla especial de Furia Asesina.",
    "Smashed Leg (Light)": "Pierna magullada. El guerrero debe perderse la próxima partida de la campaña.",
    "Smashed Leg (Severe)": "Pierna destrozada. El guerrero no puede correr, aunque aún puede declarar cargas con normalidad.",
    "Chest Wound": "El guerrero ha sido gravemente herido en el pecho. Su atributo de Resistencia (R) se reduce en -1 de forma permanente.",
    "Blinded in One Eye": "El guerrero pierde un ojo. Su Habilidad de Proyectiles (HP) se reduce en -1 permanentemente. Si en el futuro pierde el otro ojo, debe retirarse de la banda.",
    "Old Battle Wound": "Una dolorosa secuela de combate. Tira 1D6 al inicio de cada batalla: con un 1, la vieja herida se resiente y le impide participar en esa partida.",
    "Nervous Condition": "El sistema nervioso del guerrero queda seriamente dañado. Su atributo de Iniciativa (I) se reduce permanentemente en -1.",
    "Hand Injury": "La mano del guerrero queda mutilada. Su Habilidad de Armas (HA) se reduce permanentemente en -1.",
    "Deep Wound": "El guerrero ha sufrido una herida profunda y debe perderse las próximas 1D3 partidas mientras convalece.",
    "Bitter Enmity": "El guerrero guarda un profundo rencor psicológico tras la batalla y Odia a la banda que le causó la lesión.",
    "Hardened": "Endurecido por el dolor y los horrores de la Ciudad Condenada. A partir de ahora es inmune al Miedo.",
    "Horrible Scars": "Cicatrices espantosas y rostro desfigurado. El guerrero tiene un aspecto aterrador y Causa Miedo a partir de ahora.",
    "Sickness": "El guerrero cae enfermo y debe perderse la próxima partida de la campaña."
};

export const translateInjuryDescription = (injuryName, originalDesc) => {
    if (!injuryName) return originalDesc || '';
    const raw = String(injuryName).trim();
    if (INJURY_DESCRIPTIONS_ES[raw]) return INJURY_DESCRIPTIONS_ES[raw];
    const clean = raw.toLowerCase();
    for (const [key, val] of Object.entries(INJURY_DESCRIPTIONS_ES)) {
        if (key.toLowerCase() === clean) return val;
    }
    const esName = translateInjury(raw);
    if (INJURY_DESCRIPTIONS_ES[esName]) return INJURY_DESCRIPTIONS_ES[esName];
    return originalDesc || '';
};

export const translateEquipmentRules = (equipmentName, originalRules) => {
    // 1. Direct summary lookup from official Mordheim weapon rules
    const summary = getWeaponRuleSummary(equipmentName);
    if (summary && summary.full) {
        return summary.full;
    }

    if (!originalRules) return 'Ninguna';

    // Helper to translate common rule sentences, stats, and keywords
    const translateText = (text) => {
        if (!text || typeof text !== 'string') return text;
        let t = text;

        // Stat profiles like: M8 WS3 S4 T4 W1 I4 A1 Ld5
        t = t.replace(/\bM(\d+)\s+WS(\d+)\s+(?:BS(\d+)\s+)?S(\d+)\s+T(\d+)\s+W(\d+)\s+I(\d+)\s+A(\d+)\s+Ld(\d+)\b/g,
            (match, m, ws, bs, s, t_, w, i, a, ld) => {
                let res = `M${m} HA${ws}`;
                if (bs) res += ` HP${bs}`;
                res += ` F${s} R${t_} H${w} I${i} A${a} L${ld}`;
                return res;
            });

        const replacements = [
            [/An enemy wounded by a dagger gains a \+1 bonus to his armour save, and a 6\+ armour save if he has none normally\./gi,
                '+1 a la tirada de salvación por armadura del enemigo (y salvación de 6+ si no tenía normalmente).'],
            [/Save:\s*(\d+)\+\s*basic save\.?\s*-1 Movement penalty with shield\.?/gi,
                'Salvación: Salvación básica de $1+. -1 penalización al Movimiento con escudo.'],
            [/Save:\s*(\d+)\+\s*basic save\.?\s*No Movement penalty with shield\.?/gi,
                'Salvación: Salvación básica de $1+. Sin penalización de Movimiento con escudo.'],
            [/Save:\s*(\d+)\+\s*basic save\.?/gi,
                'Salvación: Salvación básica de $1+.'],
            [/Save:\s*(\d+)\+\s*save/gi,
                'Salvación: Salvación de $1+.'],
            [/-1 Movement penalty with shield\.?/gi,
                '-1 penalización al Movimiento si se combina con escudo.'],
            [/No Movement penalty with shield\.?/gi,
                'Sin penalización al Movimiento si se combina con escudo.'],
            [/Cannot be combined with the effects of any other armor except a helmet or buckler/gi,
                'No se puede combinar con otra armadura excepto casco o rodela.'],
            [/Cannot be combined with other armour except helmet\/buckler/gi,
                'No se puede combinar con otra armadura excepto casco o rodela.'],
            [/\+2 bonus to armour saves/gi,
                '+2 de bonificador a la tirada de salvación por armadura.'],
            [/\+(\d+)\s*bonus to armour save/gi,
                '+$1 a la tirada de salvación por armadura.'],
            [/Provides \+(\d+) Save to rider/gi,
                'Proporciona salvación de +$1 al jinete.'],
            [/-1 Movement to horse/gi,
                '-1 al Movimiento del caballo.'],
            [/For Warhorses only/gi,
                'Solo para Caballos de Guerra.'],
            [/For Bretonnian Warhorses only/gi,
                'Solo para Caballos de Guerra Bretonianos.'],
            [/Gives (\d+)\+ save/gi,
                'Otorga salvación de $1+.'],
            [/Strength \+(\d+)/gi,
                'Fuerza +$1'],
            [/Parry:\s*Can parry enemy blows/gi,
                'Parada: Puede parar golpes enemigos.'],
            [/Strike first:\s*Strikes first when charged/gi,
                'Ataca primero: Ataca en primer lugar cuando es cargado.'],
            [/Stuns on 2-4/gi,
                'Conmoción: Aturde con un resultado de 2-4 en la tabla de heridas.'],
            [/-1 enemy armour save/gi,
                '-1 adicional a la salvación por armadura del enemigo.'],
            [/Cannot be parried/gi,
                'No puede pararse'],
            [/Two-Handed:/gi,
                'A Dos Manos:'],
            [/Cutting Edge:/gi,
                'Filo Cortante:'],
            [/Poisoned Attacks\./gi,
                'Ataques Envenenados.'],
            [/Fear\./gi,
                'Miedo.'],
            [/Terror\./gi,
                'Terror.'],
            [/Stupidity\./gi,
                'Estupidez.'],
            [/Frenzy\./gi,
                'Furia Asesina.'],
            [/Hatred\./gi,
                'Odio.']
        ];

        for (const [pattern, rep] of replacements) {
            t = t.replace(pattern, rep);
        }
        return t;
    };

    if (Array.isArray(originalRules)) {
        return originalRules.map(r => {
            if (typeof r === 'object' && r !== null) {
                const name = r.name ? `<strong>${translateSpecialRule(r.name) || r.name}:</strong> ` : '';
                return `${name}${translateText(r.rule || '')}`;
            }
            return translateText(String(r));
        }).join('<br><br>');
    }

    return translateText(String(originalRules)).replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
};

