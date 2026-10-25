export const MASTER_EQUIPMENT_LIST = [
    // ARMOUR (Modifier: -X means Save improves by X. 7 - 2 = 5+)
    {
        id: 1,
        category: "Armour",
        name: "Armour; Heavy",
        baseCost: 50,
        variableCost: null,
        rules: "Save: 5+ basic save. -1 Movement penalty with shield.",
        grade: "core",
        modifierGeneral: -2,
        isPrimaryArmour: true,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 549,
        category: "Armour",
        name: "Warpstone Armour",
        baseCost: 60,
        variableCost: null,
        rules: [
            "-1 Movement penalty with shield.",
            "Magical: The addition of warpstone dust in the forging of warpstone armour grants the armour the unusual property of not encumbering magic users. A Skaven spellcaster wearing a suit of warpstone armour may still cast spells as per usual."
        ],
        turnOrderRules: [
            { name: "-1 Movement penalty with shield.", rule: "-1 Movement penalty with shield.", timing: "4" },
            { name: "Magical", rule: "A Skaven spellcaster wearing a suit of warpstone armour may still cast spells as per usual.", timing: "7" }
        ],
        grade: "3a",
        modifierGeneral: -2,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Skaven Clan Skryre"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 418,
        category: "Armour",
        name: "Armour; Heavy Masterwork",
        baseCost: 0,
        variableCost: null,
        rules: "Save: 4+ basic save. -1 Movement penalty.",
        grade: "1C",
        modifierGeneral: -3,
        isPrimaryArmour: true,
        rarity: "common",
        restrictedWarbands: ["Lustrian Reavers"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 2,
        category: "Armour",
        name: "Armour; Heavy - Gromril",
        baseCost: 150,
        variableCost: null,
        rules: "Save: 4+ basic save. No Movement penalty with shield.",
        grade: "core",
        modifierGeneral: -3,
        isPrimaryArmour: true,
        rarity: {
            base: 11
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 3,
        category: "Armour",
        name: "Armour; Heavy - Ithilmar",
        baseCost: 90,
        variableCost: null,
        rules: "Save: 5+ basic save. No Movement penalty with shield.",
        grade: "core",
        modifierGeneral: -2,
        isPrimaryArmour: true,
        rarity: {
            base: 11
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Lothern Sea Patrol": { baseCost: 60 },
            "Asrai Wayfarer": { baseCost: 80 }
        }
    },
    {
        id: 4,
        category: "Armour",
        name: "Armour; Light",
        baseCost: 20,
        variableCost: null,
        rules: "Save: 6+ basic save.",
        grade: "core",
        modifierGeneral: -1,
        isPrimaryArmour: true,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 541,
        category: "Armour",
        name: "Deerhide Leather Armor",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Save: 6+ basic save.",
            "Cannot be combined with the effects of any other armor except a helmet or buckler. Deerhide Leather Armor cannot be sold back at the Trading Post"
        ],
        grade: "3",
        modifierGeneral: -1,
        isPrimaryArmour: true,
        rarity: "common",
        restrictedWarbands: ["Asrai Wayfarer"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 5,
        category: "Armour",
        name: "Armour; Toughened Leathers",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Save: 6+ save",
            "Compatibility: Cannot be combined with other armour except helmet/buckler.",
            "Sellback: Toughened leathers cannot be sold back at the Trading Posts; the stench alone is enough to drive away even the most desperate of buyers!,",
            "Spell Casting: Even though Toughened Leathers are purchased as miscellaneous equipment and need not be listed on a Hero’s starting armour list to be taken, they are still armour and prevent spell casting."
        ],
        grade: "1a",
        modifierGeneral: -1,
        isPrimaryArmour: false,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 6,
        category: "Armour",
        name: "Helmet",
        baseCost: 10,
        variableCost: null,
        rules: "A model that is equipped with a helmet has a special 4+ save on a D6 against being stunned. If the save is made, treat the stunned result as knocked down instead. This save is not modified by the opponent's Strength.",
        turnOrderRules: ["4+ against being stunned"],
        grade: "core",
        modifierGeneral: 0,
        timing: ["9"],
        isPrimaryArmour: false,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 496,
        category: "Armour",
        name: "Throat Guard",
        baseCost: 10,
        variableCost: null,
        rules: "Life Saver: As the vampires of Sylvania rely upon hapless human victims to sate their thirst for blood, it is only prudent to protect vulnerable areas. As such, the Throat Guard allows a Slayer the peace of mind knowing that their blood shall remain in their veins. All injury rolls caused by a Vampire have a special 6+ save while this equipment is worn. This save is not modified by strength, but can be bypassed by criticals that ignore armour. It does not add any armour-save modifiers, and can be worn on its own, or combined with light or heavy armour.",
        turnOrderRules: ["All injury rolls caused by a Vampire have a special 6+ save while this equipment is worn"],
        grade: "2a",
        modifierGeneral: 0,
        timing: ["9"],
        isPrimaryArmour: false,
        rarity: 7,
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 426,
        category: "Armour",
        name: "Trophy Slann Holy Headdress",
        baseCost: 35,
        variableCost: null,
        rules: "+2 bonus to armour saves.",
        grade: "core",
        modifierGeneral: -2,
        timing: ["9"],
        isPrimaryArmour: false,
        rarity: "common",
        restrictedWarbands: ["Lustrian Reavers"],
        allowedSpecificHeroes: ["Saurus Slayer"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 97,
        category: "Armour",
        name: "Armour; Chaos",
        baseCost: 185,
        variableCost: null,
        rules: [
            "Rarity: When searching for Chaos armour a warrior gains +1 on his Rarity roll for each model he took out of action in the previous battle.",
            "Cost: The cost for found Chaos armour is decreased by 1 gold crown for each Experience point the Hero has.",
            "Gift of Chaos: Chaos armour is a gift from the Dark Gods to the worthy warrior. A Hero who has successfully purchased a suit of Chaos armour will never give it away to another warband member but put it on himself immediately. Chaos armour becomes fused to the body of its wearer. It can never be removed.",
            "Spellcasters: Chaos armour does not hinder its wearer from casting spells or rituals. It can be worn by spellcasters but they cannot combine it with a shield or buckler without appropriate skills",
            "Movement Penalty: There is no Movement penalty for combining Chaos Armour with a Shield."
        ],
        turnOrderRules: ["Rarity: When searching for Chaos armour a warrior gains +1 on his Rarity roll for each model he took out of action in the previous battle.", "Cost: The cost for found Chaos armour is decreased by 1 gold crown for each Experience point the Hero has."],
        grade: "1c",
        modifierGeneral: -3,
        timing: ["13"],
        isPrimaryArmour: true,
        rarity: {
            base: 13
        },
        restrictedWarbands: ["Cult of the Possessed", "Marauders of Chaos", "Norse Explorers", "Beastmen Raiders", "The Sons of Hashut", "Carnival of Chaos"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 98,
        category: "Armour",
        name: "Helmet; Cooking Pot",
        baseCost: 10,
        variableCost: null,
        rules: "Avoid Stun: A Master Chef equipped with a cooking pot helmet has a special save of 5+ against being stunned. This save is never modified.",
        turnOrderRules: ["5+ against being stunned"],
        grade: "1b",
        modifierGeneral: 0,
        timing: ["9"],
        isPrimaryArmour: false,
        rarity: "common",
        restrictedWarbands: ["Mootlanders"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 100,
        category: "Armour",
        name: "Armour; Lamellar",
        baseCost: 120,
        variableCost: null,
        rules: "Save: 4+ basic save. Movement -1 with shield",
        grade: "1c",
        modifierGeneral: -3,
        isPrimaryArmour: true,
        rarity: {
            base: 9
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 101,
        category: "Armour",
        name: "Armour; Mechanical Suit",
        baseCost: 225,
        variableCost: null,
        rules: [
            "Rarity: When searching for Chaos armour a warrior gains +1 on his Rarity roll for each model he took out of action in the previous battle.",
            "Cost: The cost for found Chaos armour is decreased by 1 gold crown for each Experience point the Hero has.",
            "Gift of Chaos: Chaos armour is a gift from the Dark Gods to the worthy warrior. A Hero who has successfully purchased a suit of Chaos armour will never give it away to another warband member but put it on himself immediately. Chaos armour becomes fused to the body of its wearer. It can never be removed.",
            "Spellcasters: Chaos armour does not hinder its wearer from casting spells or rituals. It can be worn by spellcasters but they cannot combine it with a shield or buckler without appropriate skills",
            "Suited and Booted: A Sorcerer equipped with a Mechanical suit receives +3 to Movement.",
            "Movement Penalty: There is no Movement penalty for combining Chaos Armour with a Shield."
        ],
        turnOrderRules: ["Rarity: When searching for Chaos armour a warrior gains +1 on his Rarity roll for each model he took out of action in the previous battle.", "Cost: The cost for found Chaos armour is decreased by 1 gold crown for each Experience point the Hero has."],
        grade: "1c",
        modifierGeneral: -4,
        timing: ["13"],
        characteristicModifiers: { M: 3 },
        isPrimaryArmour: true,
        rarity: {
            base: 14
        },
        restrictedWarbands: ["Black Dwarfs", "The Sons of Hashut"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Black Dwarfs": { baseCost: 175, specificHeroes: ["Sorcerer"], includeNewFighters: true }
        }
    },
    {
        id: 442,
        category: "Armour",
        name: "Cathayan Quilted Silk Armour",
        baseCost: 15,
        variableCost: null,
        rules: [
            "The Silk Armour adds +1 to the armour saves against any type of attack. It can be combined with any other type of armour."
        ],
        grade: "1c",
        modifierGeneral: -1,
        isPrimaryArmour: true,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Aristocrat"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 507,
        category: "Armour",
        name: "Veskit Metalic Body",
        baseCost: 0,
        variableCost: null,
        rules: "These give Veskit his high Toughness and a 3+ armour save.",
        grade: "1a",
        modifierGeneral: -4,
        isPrimaryArmour: false,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Veskit, high executioner of clan eshin"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    // MOUNTS & BARDING (Contributes to the Mount Save component only)
    {
        id: 7,
        category: "Armour",
        name: "Barding",
        baseCost: 80,
        variableCost: null,
        rules: "For Warhorses only. Provides +1 Save to rider. -1 Movement to horse. Warhorse is only killed on a roll of 1 on serious injury roll",
        turnOrderRules: "Warhorse is only killed on a roll of 1 on serious injury roll",
        grade: "1a",
        modifierGeneral: -1,
        timing: ["13"],
        isPrimaryArmour: false,
        rarity: {
            base: 8
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 96,
        category: "Armour",
        name: "Barding; Bretonnian",
        baseCost: 30,
        variableCost: null,
        rules: "For Bretonnian Warhorses only. Gives 6+ save.",
        turnOrderRules: "Warhorse is only killed on a roll of 1 on serious injury roll",
        grade: "1a",
        modifierGeneral: -1,
        timing: ["13"],
        isPrimaryArmour: false,
        rarity: {
            base: 11
        },
        restrictedWarbands: ["Bretonnian Knights", "Bretonnian Chapel Guard"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 221,
        category: "Mounts",
        name: "Chaos Steed",
        baseCost: 90,
        variableCost: null,
        rules: "M8 WS3 S4 T4 W1 I4 A1 Ld5. Fear.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 222,
        category: "Mounts",
        name: "Cold One",
        baseCost: 100,
        variableCost: null,
        rules: "M6 WS3 S4 T4 W1 I1 A1 Ld3. Stupidity.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 223,
        category: "Mounts",
        name: "Elven Steed",
        baseCost: 90,
        variableCost: null,
        rules: "M9 WS3 S3 T3 W1 I5 A1 Ld5.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 224,
        category: "Mounts",
        name: "Giant Spider",
        baseCost: 100,
        variableCost: null,
        rules: "M6 WS3 S4 T3 W1 I4 A1 Ld5. Poisoned Attacks.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 225,
        category: "Mounts",
        name: "Giant Wolf",
        baseCost: 85,
        variableCost: null,
        rules: "M9 WS3 S4 T3 W1 I4 A1 Ld6",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 502,
        category: "Mounts",
        name: "Hobgoblin Giant Wolf",
        baseCost: 0,
        variableCost: null,
        rules: "M9 WS3 S3 T3 W1 I4 A1 Ld4",
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Hobgoblin Scout"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 514,
        category: "Mounts",
        name: "Maglah Khan's Horde Giant Wolf",
        baseCost: 0,
        variableCost: null,
        rules: "M9 WS3 S3 T3 W1 I4 A1 Ld4",
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Maglah Khan's Horde"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 226,
        category: "Mounts",
        name: "Gnoblar Fighter",
        baseCost: 15,
        variableCost: "D6",
        rules: "M4 WS2 S3 T3 W1 I3 A1 Ld6.",
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 227,
        category: "Mounts",
        name: "Mule",
        baseCost: 30,
        variableCost: null,
        rules: "M6 WS2 S3 T3 W1 I3 A1 Ld5. Stubborn.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 228,
        category: "Mounts",
        name: "Nightmare",
        baseCost: 95,
        variableCost: null,
        rules: "M8 WS3 S4 T4 W1 I4 A1 Ld5. Fear.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 229,
        category: "Mounts",
        name: "Rhinox",
        baseCost: 200,
        variableCost: "D6x10",
        rules: "M6 WS3 S5 T5 W3 I2 A3 Ld6. Fear. Large Target.",
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 15 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 46,
        category: "Mounts",
        name: "Riding/Draft Horse",
        baseCost: 40,
        variableCost: null,
        rules: "M8 WS2 S3 T3 W1 I3 A1 Ld5.",
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        warbandRating: 3
    },
    {
        id: 230,
        category: "Mounts",
        name: "Temple Dog",
        baseCost: 250,
        variableCost: "D6x10",
        rules: "M6 WS4 S4 T4 W2 I4 A2 Ld7. Magic Resistance (2+).",
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 13 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 231,
        category: "Mounts",
        name: "War Boar",
        baseCost: 90,
        variableCost: null,
        rules: "M7 WS3 S4 T4 W1 I3 A1 Ld6. Fear.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 88,
        category: "Mounts",
        name: "Wardogs",
        baseCost: 25,
        variableCost: "2D6",
        rules: "M5 WS4 BS0 S4 T3 W1 I4 A1 Ld6.",
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 504,
        category: "Mounts",
        name: "Halfling Hound",
        baseCost: 0,
        variableCost: null,
        rules: "M5 WS4 BS0 S4 T3 W1 I4 A1 Ld5.",
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Halfling Knight"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 45,
        category: "Mounts",
        name: "Warhorse",
        baseCost: 80,
        variableCost: null,
        rules: "M8 WS3 S4 T3 W1 I3 A1 Ld5.",
        grade: "core",
        modifierGeneral: -1,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: { "Marauders of Chaos (The Hung)": { baseCost: 40, variableCost: null } },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        warbandRating: 5
    },
    {
        id: 517,
        category: "Mounts",
        name: "Pantomime Horse",
        baseCost: 0,
        variableCost: null,
        rules: [
            "M8 WS3 S3 T3 W1 I3 A1 Ld5",
            "Will not bolt: The Pantomime Horse will never bolt"
        ],
        turnOrderRules: [
            { name: "Will not bolt", rule: "The Pantomime Horse will never bolt", timing: ["8", "9"] }
        ],
        grade: "2a",
        modifierGeneral: -1,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["William Schäke­stange, Master Bard"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 511,
        category: "Mounts",
        name: "Warhorse",
        baseCost: 0,
        variableCost: null,
        rules: [
            "M8 WS3 S0 T0 W1 I3 A1 Ld5",
            "Inconsistency: Strength and Toughness get rolled every turn"
        ],
        turnOrderRules: [
            { name: "Inconsistency", rule: "Strength and Toughness get rolled every turn", timing: "2" }
        ],
        grade: "1c",
        modifierGeneral: -1,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Belandysh, Condemned Champion Of Chen"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 516,
        category: "Mounts",
        name: "Headless Horesman Horse",
        baseCost: 0,
        variableCost: null,
        rules: [
            "M8 WS2 S3 T4 W2 I2 A1 Ld5"
        ],
        turnOrderRules: [],
        grade: "2a",
        modifierGeneral: -1,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["The Headless Horseman"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 443,
        category: "Mounts",
        name: "Bird of Prey",
        baseCost: 30,
        variableCost: null,
        rules: [
            "The Bird of Prey can be used in the Missile Phase exactly like a missile weapon with the following exceptions: it has a reach of 18\", can attack even hidden targets, and ignores penalties for cover. Use the BS of its owner to determine if it hits and it causes S3 hit if it does hit."
        ],
        turnOrderRules: [
            { name: "Bird of Prey", rule: "Range of 18\", can attack even hidden targets, and ignores penalties for cover. Use the BS of its owner to determine if it hits and it causes S3 hit if it does hit.", timing: "7" }
        ],
        grade: "1C",
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Aristocrat"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 477,
        category: "Mounts",
        name: "Pigback Mount",
        baseCost: 50,
        variableCost: null,
        rules: [
            "M5 WS2 S2 W1 I3 A1 Ld5",
            "Like a Mount: Uses the following standard rules for Mounted Combat in the PHB: cannot climb, uses movement of mount, can jump obstacles up to 2”, and uses Mounted rules for Spears. Cannot Infiltrate.",
            "Not Like a Mount: Unlike a mount, a gnoblar on Pigback does NOT count as a large target, may enter buildings, and doesn’t gain +1AS. May not wear barding.",
            "Extra Hand: The Pigback has 1 free hand to hold a weapon. It starts with a free dagger, but may given a club or axe. Alternatively, may be given a shield (this increases the rider’s save by +1, but the mount cannot attack)."
        ],
        turnOrderRules: [],
        grade: "2a",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: [],
        restrictedHeroTypes: ["henchman"],
        restrictedRaces: ["Gnoblar"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 482,
        category: "Mounts",
        name: "Wolf Rat Mount",
        baseCost: 90,
        variableCost: null,
        rules: [
            "M9 WS3 S4 T3 W1 I4 A1 Ld4",
            "Poisoned Attack: The mouths of Wolf Rats fester with any number of poxes and corrosive agents. Any attacks made by a Wolf Rat Mount are considered to be Strength 4, but do not modify armour saves."
        ],
        turnOrderRules: [
            { name: "Poisoned Attack", rule: "Any attacks made by a Wolf Rat Mount are considered to be Strength 4, but do not modify armour saves.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: {
            base: 11
        },
        restrictedWarbands: ["Skaven of Clan Moulder"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 500,
        category: "Mounts",
        name: "Snake",
        baseCost: 0,
        variableCost: null,
        rules: [
            "M4 WS3 S1 T2 W1 I5 A1 Ld5",
            "Venomous: The snakes are venomous and count as attacking using Black Lotus."
        ],
        turnOrderRules: [
            { name: "Venomous", rule: "The snakes are venomous and count as attacking using Black Lotus.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Snake Charmer"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    // SHIELDS (Treated as a layered modifier over the best base save)
    // CRITICAL FIX: Changed modifierMelee from -2 to -1 to allow the cumulative -1 to have effect before the 4+ cap.
    {
        id: 18,
        category: "Shields/Bucklers",
        name: "Shield",
        baseCost: 5,
        variableCost: null,
        rules: "+1 Save bonus",
        grade: "core",
        modifierGeneral: -1,
        modifierMelee: -1,
        modifierRanged: -1,
        isShield: true,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 19,
        category: "Shields/Bucklers",
        name: "Buckler",
        baseCost: 5,
        variableCost: null,
        rules: "Parry",
        turnOrderRules: "A model equipped with a buckler may parry the first blow in each round of hand-to-hand combat.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["9"],
        isShield: false,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 99,
        category: "Shields/Bucklers",
        name: "Shield; Kite",
        baseCost: 10,
        variableCost: null,
        rules: "A model with a kite shield has a basic save of 5+ on a D6 while on foot, and 6+ while mounted (or, if the model is already wearing armour, as +2 on foot, and +1 save while mounted). This cannot bring a save over 1+",
        grade: "1c",
        modifierGeneral: -1,
        modifierMelee: -1,
        modifierRanged: -1,
        isShield: true,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 102,
        category: "Shields/Bucklers",
        name: "Shield; Pavise",
        baseCost: 25,
        variableCost: null,
        rules: [
            "A warrior using a pavise counts as if he is in cover against missile attacks (-1 to hit).",
            "In close combat, The pavise counts as a shield (+1 armour save) but only if the warrior was charged to his front.",
            "Movement Penalty: The pavise reduces the fighter's movement by half, rounded up."
        ],
        turnOrderRules: ["A warrior using a pavise counts as if he is in cover against missile attacks (-1 to hit)."],
        grade: "1a",
        modifierGeneral: -1,
        timing: ["8"],
        modifierMelee: -1,
        modifierRanged: -3,
        isShield: false,
        rarity: {
            base: 8
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 479,
        category: "Shields/Bucklers",
        name: "Shield of Sigmar",
        baseCost: 20,
        variableCost: null,
        rules: [
            "An aura surrounds these shields, granting their bearer uncanny protection. Anyone protected by a Shield of Sigmar has a special 6+ save versus all ranged attacks.",
            "The -1 penalty for bearing a shield with Heavy Armour does not apply."
        ],
        turnOrderRules: ["Anyone protected by a Shield of Sigmar has a special 6+ save versus all ranged attacks."],
        grade: "2a",
        modifierGeneral: -1,
        timing: ["8"],
        modifierMelee: -1,
        modifierRanged: -1,
        isShield: false,
        rarity: {
            base: 9
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    // CLOAKS
    {
        id: 89,
        category: "Cloaks",
        name: "Blessed Stag Hide",
        baseCost: 40,
        variableCost: null,
        rules: "Re-roll a failed Initiative test once per turn.",
        grade: "1b",
        turnOrderRules: ["Re-roll a failed Initiative test once per turn."],
        modifierGeneral: 0,
        timing: ["12"],
        rarity: { base: 10 },
        restrictedWarbands: ["Horned Hunters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 497,
        category: "Cloaks",
        name: "Cloak; Elven",
        baseCost: 100,
        variableCost: "D6x10",
        rules: "A warrior aiming a missile weapon at a warrior wearing an Elven cloak suffers -1 on his to hit roll.",
        grade: "core",
        turnOrderRules: ["Ranged attacks against this model -1 on to hit roll."],
        modifierGeneral: 0,
        timing: ["8"],
        rarity: { base: 12, "Asrai Wayfarer": 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Asrai Wayfarer":
                {
                    baseCost: 80,
                    variableCost: "2d6",
                }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Asrai Wayfarer": { baseCost: 85, variableCost: null }
        }
    },
    {
        id: 423,
        category: "Cloaks",
        name: "Cloak ; Lizardmen Skin",
        baseCost: 10,
        variableCost: null,
        rules: "Grants 6+ Ward save, separate from Armour Save that is not reduced by enemy strength or other modifiers",
        grade: "1c",
        turnOrderRules: [" Grants 6+ Ward save, separate from Armour Save that is not reduced by enemy strength or other modifiers"],
        modifierGeneral: 0,
        timing: ["8", "9"],
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        allowedSpecificHeroes: ["Saurus Slayer"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 455,
        category: "Cloaks",
        name: "Cloak; Hunters",
        baseCost: 0,
        variableCost: null,
        rules: "This cloak is fashioned by Kislevites and is only worn by their rangers. A hidden ranger will not reveal her position by shooting. The target model can take an initiative test in order to try and spot the firing ranger. If the test is successful, the ranger is no longer hidden.",
        turnOrderRules: [
            { name: "Shoot While Hidden", rule: "A hidden ranger will not reveal her position by shooting. The target model can take an initiative test in order to try and spot the firing ranger. If the test is successful, the ranger is no longer hidden.", timing: "7" },
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroe: ["Kislev Ranger"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 499,
        category: "Cloaks",
        name: "Cloak; Thief",
        baseCost: 0,
        variableCost: null,
        rules: "Thieves wear cloaks that help them blend in with their surroundings and can disguise them very well in both the desert and the towns. A warrior firing a missile weapon at a warrior wearing a Thief's cloak suffers -1 on his roll to hit. Also the distance required to spot a thief when Hidden is doubled.",
        turnOrderRules: [
            { name: "-1 to hit", rule: "A warrior firing a missile weapon at a warrior wearing a Thief's cloak suffers -1 on his roll to hit.", timing: "8" },
            { name: "Hidden", rule: "The distance required to spot a thief when Hidden is doubled.", timing: "5" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroe: ["Thief"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 92,
        category: "Cloaks",
        name: "Cloak ; Wolfcloak",
        baseCost: 10,
        variableCost: null,
        rules: "To acquire a Wolfcloak, a Hero must pay 10 gc (to represent the expense of traveling to Middenheim and taking part in a hunt). In addition, the Hero must roll equal to or under his Strength on a D6. If successful, the Hero finds and slays the wolf and can wear its cloak as a mark of his skill and prowess. Note that Middenheimers may buy Wolfcloaks when starting their warband without making a test for availability. A model wearing a Wolfcloak will gain +1 to his armour saves against all shooting attacks.",
        grade: "core",
        turnOrderRules: ["+1 Armor against ranged attacks"],
        modifierGeneral: 0,
        modifierRanged: -1,
        timing: ["8"],
        rarity: "common",
        restrictedWarbands: ["Mercenaries (Middenheim)", "Norse Explorers", "Marauders of Chaos"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 501,
        category: "Cloaks",
        name: "Cloak ; White Wolfcloak",
        baseCost: 0,
        variableCost: null,
        rules: "Cost of Cloak is included in price for Wolf Priese of UlricTo acquire a Wolfcloak and grants 6+ save.",
        grade: "1b",
        turnOrderRules: ["6+ Armor save"],
        modifierGeneral: -1,
        modifierRanged: 0,
        timing: ["8", "9"],
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroe: ["Wolf Priest of Ulric"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 562,
        category: "Cloaks",
        name: "Cloak ; White Lion",
        baseCost: 10,
        variableCost: null,
        rules: [
            "+1 Armour save against missile attacks"
        ],
        turnOrderRules: [
            { name: "+1 Armour Save", rule: "+1 Armour save against missile attacks", timing: "8" }
        ],
        grade: "2b",
        modifierGeneral: 0,
        modifierRanged: -1,
        rarity: "common",
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroe: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 503,
        category: "Cloaks",
        name: "Hillman Cloak",
        baseCost: 0,
        variableCost: null,
        rules: "5+ versus ranged attacks, and 6+ in close combat",
        grade: "2a",
        turnOrderRules: ["5+ versus ranged attacks, and 6+ in close combat"],
        modifierGeneral: -1,
        modifierRanged: -2,
        timing: ["8", "9"],
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroe: ["Cursed Hillman"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 509,
        category: "Cloaks",
        name: "Sabertooth Tiger Hide",
        baseCost: 0,
        variableCost: null,
        rules: "5+ versus ranged attacks, and 6+ in close combat",
        grade: "1b",
        turnOrderRules: ["5+ versus ranged attacks, and 6+ in close combat"],
        modifierGeneral: -1,
        modifierRanged: -2,
        timing: ["8", "9"],
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroe: ["Drenok Johansen, Wielder Of The Great Axe"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 93,
        category: "Cloaks",
        name: "Nomad Robes",
        baseCost: 25,
        variableCost: null,
        rules: [
            "Woven by native desert dwellers these robes enable the wearer to suffer only half penalties from Weather Conditions. The robes affect the following results on the Weather table:",
            "It’s Raining: The robe protects the warrior’s equipment. When rolling a D6 each time that you fire a black powder weapon, the shot is only wasted on a 1.",
            "Hot as Hades: A warrior wearing a Nomad Robe only suffers a penalty of -1 to WS and BS and he only requires the normal amount of water.",
            "Hot: A warrior wearing a Nomad Robe suffers no penalty to WS or BS. If at least half of the warband are wearing Nomad Robes, they only require the normal amount of water.",
            "Dust Storm: The robe has no effect – not even the Nomad Robes can protect the warrior from the ferocity of the storm. Apply rules for a Dust Storm as normal."],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 94,
        category: "Cloaks",
        name: "Rain Coat",
        baseCost: 10,
        variableCost: null,
        rules: "Rain Coats or Capes protect its wearer – and especially his equipment – from becoming soaked with water. Note that this miscellaneous item is an exception to the normal rules as it is available to Henchmen.",
        grade: "1c",
        modifierGeneral: 0,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 206,
        category: "Cloaks",
        name: "Sea Dragon Cloak",
        baseCost: 50,
        variableCost: "2D6",
        rules: "Scales: 5+ armour save in close combat, 4+ armour save against missiles.",
        grade: "1b",
        modifierGeneral: 0,
        modifierMelee: -2,
        modifierRanged: -3,
        rarity: { base: 10 },
        restrictedWarbands: ["Dark Elves", "Druchii", "Dwarf Slayer Cult"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 86,
        category: "Miscellaneous Gear",
        name: "Winter Furs",
        baseCost: 5,
        variableCost: null,
        rules: "If the pelt clothing becomes soaked with water, it is useless for the rest of the battle. Note that like Rain Coats, this item may be used by Henchmen also.",
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Beastmen"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 519,
        category: "Miscellaneous Gear",
        name: "Bearcloak",
        baseCost: 10,
        variableCost: null,
        rules: "To acquire a bearcloak, a Sheepherder must pay 10 gc (to represent expense of taking part to the hunt). In addition, the Sheepherder must roll equal to or under his Strength on a D6. If successful, the Sheepherder finds and slays the bear and can wear its cloak as a mark of skill and prowess. Note that Sheepherders may buy bearcloaks when starting their warband without making a test for availabilit",
        turnOrderRules: [
            { name: "+1 Ranged Save", rule: "+1 against all shooting attacks.", timing: "8" }
        ],
        grade: "2a",
        modifierRanged: -1,
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    // CLOSE COMBAT
    {
        id: 12,
        category: "Close Combat",
        name: "Axe",
        baseCost: 5,
        variableCost: null,
        rules: "Extra -1 Save modifier.",
        turnOrderRules: ["Extra -1 Save modifier."],
        grade: "core",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 453,
        category: "Close Combat",
        name: "Obsidian Axe",
        baseCost: 60,
        variableCost: null,
        rules: [
            "Strength +1",
            "Initiative -1",
            "Target has extra -1 Save modifier"
        ],
        turnOrderRules: [
            { name: "-1 Save", rule: "Target has extra -1 Save modifier", timing: "9" },
            { name: "Str +1", rule: "Str +1", timing: "9" },
            { name: "Initiative -1", rule: "Initiative -1", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: 10,
        restrictedWarbands: ["Marauders of Chaos", "The Sons of Hashut", "Black Dwarfs"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 103,
        category: "Close Combat",
        name: "Axe; Dwarf",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Cutting Edge: Dwarf axes have an extra save modifier of -1, so a model with Strength 4 using a Dwarf axe has a -2 save modifier when he hits an opponent with the axe in close combat.",
            "Parry: Dwarf axes offer an excellent balance of defence and offense. A model armed with a Dwarf axe may parry blows. When his opponent rolls to hit, the model armed with a Dwarf axe may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow and that attack is discarded. A model may not parry attacks made with double or more its own Strength - they are simply too powerful to be stopped. A model may not parry more than one attack in a single Close Combat phase; a model armed with two Dwarf axes (or a Dwarf axe and a sword, etc) does not get to parry two attacks but may instead re-roll a failed parry."
        ],
        turnOrderRules: [
            "Extra -1 Save modifier.",
            "Parry: Greater than attackers roll. Two Dwarf Axes allow for re-roll not extra parry"
        ],
        grade: "1a",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Dwarf"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 104,
        category: "Close Combat",
        name: "Axe; Great",
        baseCost: 25,
        variableCost: null,
        rules: [
            "Strength +2",
            "Two-handed: As a great axe requires two hands to use, a model using a great axe may not use a shield, buckler or additional weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting.",
            "Strike last: Great Axes are so heavy that the model using them always strikes last, even when charging, unless it has the Strongman skill.",
            "Cutting Edge: A Great Axe has an extra save modifier of -1, so a model with Strength 4 using a Chaos Battle Axe has a -4 save modifier in hand-to-hand combat."
        ],
        turnOrderRules: [
            "Strength +2",
            "Extra -1 Save modifier.",
            "Strike Last: Great Axes are so heavy that the model using them always strikes last, even when charging, unless it has the Strongman skill."
        ],
        grade: "1c",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: { base: 8 },
        restrictedWarbands: ["Marauders of Chaos"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        restrictedSkills: ["Chosen of Chaos"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 105,
        category: "Close Combat",
        name: "Ball and Chain",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Strength +2",
            "Incredible Force: Because the Ball and Chain is so heavy, normal armour does very little to protect against it. No armour saves are allowed against wounds caused by a Ball and Chain. In addition, any hit from a Ball and Chain is very likely to take off someone's head (or at least break some ribs!). Therefore, any hit that successfully wounds will do 1D3 wounds instead of 1.",
            "Random: (See book for full rules) The first turn he starts swinging the Ball and Chain, the model is moved 2D6\" in a direction nominated by the controlling player. In his subsequent Movement phases, roll a D6 to determine what the model does. See book for details",
            "Cumbersome: Because the Ball and Chain is so heavy, a model equipped with one may carry no other weapons or equipment. In addition, only a model under the influence of Mad Cap Mushrooms has the strength to wield a ball and chain.",
            "Unwieldy: The great weight of the Ball and Chain can easily tear ligaments or pull a wielder's arms out of their sockets. While someone under the influence of Mad Cap Mushrooms will not notice such effects, when the drug wears off he will be in great pain. To represent this, at the end of the battle the controlling player must roll for Injury for each model that used a Ball and Chain, just as if the model had been taken out of action. If the model was actually taken out of action normally, just roll once for Injury – there is no need to make a second roll."
        ],
        turnOrderRules: [
            "Strength +2",
            "Random: See book for rules"
        ],
        grade: "1a",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Goblin"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 232,
        category: "Close Combat",
        name: "Beastlash",
        baseCost: 10,
        variableCost: "D6",
        rules: [
            "Strength as user -1.",
            "Beastbane: The Beastmaster wielding a Beastlash causes Fear in animals, any animal charged or wishing to charge a Beastmaster with one of these weapons must first take a Fear test as mentioned in the psychology section of the Mordheim rules.",
            "Cannot Be Parried: The Beastlash is a flexible weapon and the Beastmaster use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a Beastlash may not make parries with swords or bucklers.",
            "Whipcrack: When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will ‘strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A."
        ],
        turnOrderRules: [
            { name: "Strength -1", rule: "Strength -1", timing: "9" },
            { name: "Beastbane", rule: "Beastbane: The Beastmaster wielding a Beastlash causes Fear in animals, any animal charged or wishing to charge a Beastmaster with one of these weapons must first take a Fear test as mentioned in the psychology section of the Mordheim rules.", timing: "3" },
            { name: "Cannot Be Parried", rule: "Cannot Be Parried: The Beastlash is a flexible weapon and the Beastmaster use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a Beastlash may not make parries with swords or bucklers.", timing: "9" },
            { name: "Whipcrack", rule: "Whipcrack: When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A.", timing: "4" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Druchii", "Dark Elves"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Beastmaster"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 106,
        category: "Close Combat",
        name: "Boat Hook",
        baseCost: 8,
        variableCost: null,
        rules: [
            "Strenght -1.",
            "Strike First: Boat Hooks are used in Close Combat. They allow the user to Strike First in the first round of any close combat, no matter which model charged, but require both hands to use.",
            "Two Handed: Models using a Boat Hook in combat cannot use any other weapons, or gain benefit from a shield or buckler, while in close combat."
        ],
        turnOrderRules: [
            { name: "Strength -1", rule: "Strength -1", timing: "9" },
            { name: "Stike First", rule: "They allow the user to Strike First in the first round of any close combat, no matter which model charged, but require both hands to use.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Pirates", "Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 107,
        category: "Close Combat",
        name: "Boss Pole",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Strike First: A warrior with a spear strikes first, even if charged. Note that this only applies in the first turn of hand-to-hand combat.",
            "Unwieldy: A warrior with a spear may only use a shield or a buckler in his other hand. He may not use a second weapon.",
            "Cavalry Bonus: If using the optional rules for mounted models, a mounted warrior armed with a spear receives a +1 Strength bonus when he charges. This bonus only applies for that turn.",
            "Ignore Animosity: Heroes and henchmen within 6\" ignore Animosity."
        ],
        turnOrderRules: [
            { name: "Cavalry Bonus", rule: "If using the optional rules for mounted models, a mounted warrior armed with a spear receives a +1 Strength bonus when he charges. This bonus only applies for that turn.", timing: "4" },
            { name: "Stike First", rule: "They allow the user to Strike First in the first round of any close combat, no matter which model charged, but require both hands to use.", timing: "9" },
            { name: "Ignore Animosity", rule: "Heroes and henchmen within 6\" ignore Animosity.", timing: "12" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Forest Goblins", "Night Goblins"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 108,
        category: "Close Combat",
        name: "Brass Knuckles",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Strength +1",
            "Pair: Brass knuckles are used in pairs and the warrior fighting with them gains an extra Attack. He may not use any other weapons or items in his hands while doing this however. He is free to swap his brass knuckles for other weapons and items during the battle but may not do this if in combat.",
            "Cumbersome: Brass knuckles are difficult to use due to the fact that they offer little in the way of range and a warrior must get close up to his opponent before he can strike. For this reason a warrior using brass knuckles suffers a -2 to Initiative in close combat."
        ],
        turnOrderRules: [
            { name: "Pair", rule: "Brass knuckles are used in pairs and the warrior fighting with them gains an extra Attack. He may not use any other weapons or items in his hands while doing this however.", timing: "9" },
            { name: "Cumbersome", rule: "A warrior using brass knuckles suffers a -2 to Initiative in close combat.", timing: "9" },
            { name: "Strength +1", rule: "Strength +1", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 6 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 109,
        category: "Close Combat",
        name: "Brazier Iron",
        baseCost: 35,
        variableCost: null,
        rules: [
            "Strength +1",
            "Two handed: A warrior armed with a brazier staff requires two hands to wield it effectively and so may not use a shield with it or another hand weapon or buckler in close combat. The warrior may still use a shield for the purposes of missile fire though.",
            "Fire: The burning brazier of coals atop the staff is deadly, capable of setting an opponent ablaze with even the slightest glancing blow. Whenever you score a successful hit with the brazier staff roll a D6. If you roll a 5+ the victim is set on fire. If the warrior survives the attack they must score a 4+ in the recovery phase or they will suffer a strength 4 hit each turn they are on fire and will be unable to do anything other than move. Other warriors from the same warband may help to put the warrior out if they wish. They must move into base-to-base contact and score a 4+ in the recovery phase."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" },
            { name: "Fire", rule: "The burning brazier of coals atop the staff is deadly, capable of setting an opponent ablaze with even the slightest glancing blow. Whenever you score a successful hit with the brazier staff roll a D6. If you roll a 5+ the victim is set on fire. If the warrior survives the attack they must score a 4+ in the recovery phase or they will suffer a strength 4 hit each turn they are on fire and will be unable to do anything other than move. Other warriors from the same warband may help to put the warrior out if they wish. They must move into base-to-base contact and score a 4+ in the recovery phase.", timing: "9" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Witch Hunters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 110,
        category: "Close Combat",
        name: "Broadsword",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Strength +1",
            "Difficult to use: A model with a Broadsword may not use a second weapon or buckler in his other hand because it requires all his skill to wield it. He may carry a shield or a kite shield as normal though.",
            "Strike last: Broadswords are so heavy that the model using them always strikes last, even when charging. Just like a Double-Handed weapon, learning the skill 'Strongman' negates 'Strike Last'."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" },
            { name: "Strike Last", rule: "Always strikes last, even when charging. Just like a Double-Handed weapon, learning the skill 'Strongman' negates 'Strike Last'.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Bretonnian Chapel Guard"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Questing Knight", "Knights Errant"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 111,
        category: "Close Combat",
        name: "Cat O' Nine Tails",
        baseCost: 8,
        variableCost: null,
        rules: [
            "Weak: Since they are made of rope and not steel, they give the enemy model a +1 to his armour save (6+ for no armour), like a hit from a fist or dagger.",
            "Cannot Be Parried: Like the Steel Whips of the Sisterhood, Cats cannot be parried by swords or bucklers.",
            "Whipcrack: When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A"
        ],
        turnOrderRules: [
            { name: "Weak", rule: "Since they are made of rope and not steel, they give the enemy model a +1 to his armour save (6+ for no armour), like a hit from a fist or dagger.", timing: "9" },
            { name: "Cannot Be Parried", rule: "Like the Steel Whips of the Sisterhood, Cats cannot be parried by swords or bucklers.", timing: "9" },
            { name: "Whipcrack", rule: "When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A", timing: "4" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: ["henchman"],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 480,
        category: "Close Combat",
        name: "Beastwhip",
        baseCost: 25,
        variableCost: null,
        rules: [
            "Cruel Barbs: Models equipped with a Beastwhip gain a +1 bonus to their roll when making Difficulty checks during Goading attempts. Note this bonus applies only once in each attempt even if the model is armed with two Beastwhips.",
            "Cannot Be Parried: the Beastwhip coils and twists like a serpent, attempts to parry its attacks are futile. A model attacked with a Beastwhip may not make parries with weapons or bucklers.",
            "Whipcrack: When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A"
        ],
        turnOrderRules: [
            { name: "Cruel Barbs", rule: "Models equipped with a Beastwhip gain a +1 bonus to their roll when making Difficulty checks during Goading attempts.", timing: "2" },
            { name: "Cannot Be Parried", rule: "Cannot be parried by swords or bucklers.", timing: "9" },
            { name: "Whipcrack", rule: "When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A", timing: "4" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Skaven of Clan Moulder"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 544,
        category: "Close Combat",
        name: "Serpent Whip",
        baseCost: 25,
        variableCost: null,
        rules: [
            "Reach: User can attack enemies up to 4\" away and such enemies cannot strike back",
            "Cannot Be Parried: The flexibility of the whip renders it impossible to be parried by swords or bucklers, provided no other enemy is in base contact",
            "Poisoned: Treat as coated with black lotus"
        ],
        turnOrderRules: [
            { name: "Reach", rule: "User can attack enemies up to 4\" away and such enemies cannot strike back", timing: "9" },
            { name: "Cannot Be Parried", rule: "The flexibility of the whip renders it impossible to be parried by swords or bucklers, provided no other enemy is in base contact", timing: "9" },
            { name: "Poisoned", rule: "Treat as coated with black lotus", timing: "9" }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Lahmian"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 112,
        category: "Close Combat",
        name: "Censer",
        baseCost: 40,
        variableCost: null,
        rules: [
            "Heavy: The +2 Strength bonus applies only to the first turn of hand to hand combat",
            "Two Handed: A censer requires two hands to be used and the wielder cannot use a shield, buckler or additional weapon in close combat.",
            "Fog of Death: A model hit by the censer must take a Toughness test. Roll a D6. If the result is higher than the Toughness of the model taking the test, he will suffer an automatic wound in addition to the censer hit. A result of 6 always inflicts a wound. Also the model wielding the censer must take the test and will suffer a wound with a result of 6. Models of undead and possessed are immune to the fog of death and do not take the test. If the model wielding the censer also has the fog-enhancing warpstone shards, he becomes a difficult target to shoot at, and models targeting him with missile weapons suffer a -1 penalty to hit."
        ],
        turnOrderRules: [
            { name: "Strength +2", rule: "The +2 Strength bonus applies only to the first turn of hand to hand combat", timing: "9" },
            { name: "Fog of Death", rule: "A model hit by the censer must take a Toughness test. Roll a D6. If the result is higher than the Toughness of the model taking the test, he will suffer an automatic wound in addition to the censer hit. A result of 6 always inflicts a wound. Also the model wielding the censer must take the test and will suffer a wound with a result of 6. Models of undead and possessed are immune to the fog of death and do not take the test.", timing: "9" },
            { name: "Fog of Death", rule: "If the model wielding the censer also has the fog-enhancing warpstone shards, he becomes a difficult target to shoot at, and models targeting him with missile weapons suffer a -1 penalty to hit.", timing: "8" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Skaven of Clan Pestilens"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 113,
        category: "Close Combat",
        name: "Chain Sticks",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Flurry: A set of chain sticks allows its wielder to unleash a furious bludgeoning. A warrior armed with chain sticks gets +2 Attacks. This bonus only applies in the first turn of each hand-to-hard combat. Using chain sticks otherwise counts as having two hand weapons.",
            "Two-handed: Requires two hands to wield"
        ],
        turnOrderRules: [
            { name: "Flurry", rule: "A warrior armed with chain sticks gets +2 Attacks. This bonus only applies in the first turn of each hand-to-hard combat.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Battle Monks of Cathay"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 114,
        category: "Close Combat",
        name: "Claw of the Old Ones",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Strenght+1",
            "No save: The blade of the Claw can literally cut through anything. A warrior wounded by a Claw receives no armour save whatsoever."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" },
            { name: "No Save", rule: "The blade of the Claw can literally cut through anything. A warrior wounded by a Claw receives no armour save whatsoever.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: ["Amazons (Mordheim)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 115,
        category: "Close Combat",
        name: "Cleaver",
        baseCost: 3,
        variableCost: null,
        rules: ["-1 Armour Save"],
        turnOrderRules: [
            { name: "-1 Save", rule: "Target gets -1 to armour save", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Mootlanders"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 11,
        category: "Close Combat",
        name: "Club / Mace / Hammer",
        baseCost: 3,
        variableCost: null,
        rules: ["Concussion: Hammers and other bludgeoning weapons are excellent to use for striking your enemy senseless. When using a hammer, club or mace, a roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries."],
        turnOrderRules: [
            { name: "Concussion", rule: "A roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 515,
        category: "Close Combat",
        name: "Gwen's Rolling Pin",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Concussion: Hammers and other bludgeoning weapons are excellent to use for striking your enemy senseless. When using a hammer, club or mace, a roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries.",
            "+1 Strength"
        ],
        turnOrderRules: [
            { name: "Concussion", rule: "A roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries.", timing: "9" },
            { name: "+1 Strength", rule: "+1 Strength", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Busty Gwen"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 468,
        category: "Close Combat",
        name: "Pry Bar",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Concussion: Hammers and other bludgeoning weapons are excellent to use for striking your enemy senseless. When using a hammer, club or mace, a roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries.",
            "Parry: Whilst acting as a club in every sense, the pry bar allows the Graver to parry attacks."
        ],
        turnOrderRules: [
            { name: "Concussion", rule: "A roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries.", timing: "9" },
            { name: "Parry", rule: "Whilst acting as a club in every sense, the pry bar allows the Graver to parry attacks.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Grave Robbers"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 454,
        category: "Close Combat",
        name: "Obsidian Hammer",
        baseCost: 60,
        variableCost: null,
        rules: [
            "Strength +1",
            "Initiative -1",
            "Concussion: Hammers are excellent to use for striking your enemy senseless. When using a hammer roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries."
        ],
        turnOrderRules: [
            { name: "Concussion", rule: "A roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries.", timing: "9" },
            { name: "Str +1", rule: "Str +1", timing: "9" },
            { name: "Initiative -1", rule: "Initiative -1", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Marauders of Chaos", "The Sons of Hashut", "Black Dwarfs"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 8,
        category: "Close Combat",
        name: "Dagger",
        baseCost: 2,
        variableCost: null,
        rules: [
            "An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally."
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 537,
        category: "Close Combat",
        name: "Thornblade",
        baseCost: 3,
        variableCost: null,
        rules: [
            "Concussion: 2-4 on injury table is Stunned"
        ],
        turnOrderRules: [
            { name: "Concussionr", rule: "2-4 on injury table is Stunned", timing: "9" }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Asrai Wayfarer"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 520,
        category: "Close Combat",
        name: "Poison Dagger",
        baseCost: 25,
        variableCost: null,
        rules: [
            "An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.",
            "Paired: Poisoned Daggers are traditionally used in pairs, one in each hand. A warrior armed with Poisoned Daggers gets an additional attack.",
            "Poisoned: These blades are coated in Death Cap Mushroom juice. The daggers are re-coated for free after every game, and they have the same effect as Black Lotus. For reference: they will wound the target automatically if you roll a 6 to hit. Note that you can still roll a dice for every wound inflicted in this way. If you roll a 6, you will inflict a critical hit with that roll. If you do not roll a 6, you will cause a normal wound. Take armour saves as normal."
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.", timing: "9" },
            { name: "Paired", rule: "Poisoned Daggers are traditionally used in pairs, one in each hand. A warrior armed with Poisoned Daggers gets an additional attack.", timing: "9" },
            { name: "Poisoned", rule: "Will wound the target automatically if you roll a 6 to hit. Note that you can still roll a dice for every wound inflicted in this way. If you roll a 6, you will inflict a critical hit with that roll. If you do not roll a 6, you will cause a normal wound. Take armour saves as normal.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 513,
        category: "Close Combat",
        name: "Iron Fan",
        baseCost: 0,
        variableCost: null,
        rules: [
            "+1 Initiative",
            "Parry: Allows for parrying of both melee and ranged attacks",
            "Art of Silent Death: The Art of Silent Death skill applies to Lin’s fan attacks as well."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Allows for parrying of both melee and ranged attacks", timing: ["8", "9"] },
            { name: "Art of Silent Death", rule: "The Art of Silent Death skill applies to Lin’s fan attacks as well.", timing: ["9"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        characteristicModifiers: { I: 1 },
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Grand Master Ippan Shu"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 463,
        category: "Close Combat",
        name: "Scythe",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Strength +1",
            "Two-Handed: As a scythe requires two hands to use, a model using one may not use a shield, buckler, or additional weapon in close combat."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" },
            { name: "Two-Handed", rule: "A model using one may not use a shield, buckler, or additional weapon in close combat.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 495,
        category: "Close Combat",
        name: "Silver-tip Stake",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Heart-seeker: Such is the destructive power of silver over a Vampire's form that the silver-tip stake adds +1 to the injury roll when it causes a wound."
        ],
        turnOrderRules: [
            { name: "Heart-seeker", rule: "Such is the destructive power of silver over a Vampire's form that the silver-tip stake adds +1 to the injury roll when it causes a wound.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 117,
        category: "Close Combat",
        name: "Dagger; Disease",
        baseCost: 15,
        variableCost: null,
        rules: [
            "+1 Enemy armour save: Daggers are not the best weapons to use for penetrating an enemy model's armour. An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.",
            "Infecting: A natural 6 on an hit roll means that the model hit has been infected with the disease and that he must take a Toughness test. Roll a D6. If the result is higher than the Toughness of the model taking the test, he will suffer an automatic wound in addition to the dagger hit. Models of undead and possessed are immune to this disease and do not take the test. A model wielding two Disease Daggers gains a +1 Attack bonus for wielding two weapons and there is no further effect, except that the chances of rolling an infecting 6 on the hit rolls are higher."
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.", timing: "9" },
            { name: "Infecting", rule: "A roll of 6 on an hit roll means that the model hit has been infected with the disease and that he must take a Toughness test. Roll a D6. If the result is higher than the Toughness of the model taking the test, he will suffer an automatic wound in addition to the dagger hit. Models of undead and possessed are immune to this disease and do not take the test. A model wielding two Disease Daggers gains a +1 Attack bonus for wielding two weapons and there is no further effect, except that the chances of rolling an infecting 6 on the hit rolls are higher.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Skaven of Clan Pestilens"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 118,
        category: "Close Combat",
        name: "Dagger; Hobgoblin Poisoned",
        baseCost: 15,
        variableCost: null,
        rules: [
            "+1 Enemy armour save: Daggers are not the best weapons to use for penetrating an enemy model's armour. An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.",
            "Pair: Poisoned Daggers are traditionally used in pairs, one in each hand. A warrior armed with Poisoned Daggers gets an additional attack (for the offhand weapon attack).",
            "Swift: Hobgoblins armed with Poisoned Daggers count as having +1 Initiative when determining combat order.",
            "Poisoned: The venom of Poisoned Daggers will enter the blood of the victim and ravage his organs and muscles. The weapons count as being permanently coated in Black Lotus. No additional poison may be applied to Poisoned Daggers."
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.", timing: "9" },
            { name: "Pair", rule: "Poisoned Daggers are traditionally used in pairs, one in each hand. A warrior armed with Poisoned Daggers gets an additional attack (for the offhand weapon attack).", timing: "9" },
            { name: "Swift", rule: "Hobgoblins armed with Poisoned Daggers count as having +1 Initiative when determining combat order.", timing: "9" },
            { name: "Poisoned", rule: "The venom of Poisoned Daggers will enter the blood of the victim and ravage his organs and muscles. The weapons count as being permanently coated in Black Lotus. No additional poison may be applied to Poisoned Daggers.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Hobgoblin"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 119,
        category: "Close Combat",
        name: "Dagger; Poisoned",
        baseCost: 25,
        variableCost: null,
        rules: [
            "+1 Enemy armour save: Daggers are not the best weapons to use for penetrating an enemy model's armour. An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.",
            "Pair: Poisoned Daggers are traditionally used in pairs, one in each hand. A warrior armed with Poisoned Daggers gets an additional attack (for the offhand weapon attack).",
            "Poisoned: These blades are coated in Death Cap Mushroom juice. The daggers are re-coated for free after every game, and they have the same effect as Black Lotus. For reference: they will wound the target automatically if you roll a 6 to hit. Note that you can still roll a dice for every wound inflicted in this way. If you roll a 6, you will inflict a critical hit with that roll. If you do not roll a 6, you will cause a normal wound. Take armour saves as normal."
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.", timing: "9" },
            { name: "Pair", rule: "Poisoned Daggers are traditionally used in pairs, one in each hand. A warrior armed with Poisoned Daggers gets an additional attack (for the offhand weapon attack).", timing: "9" },
            { name: "Poisoned", rule: "These blades are coated in Death Cap Mushroom juice. The daggers are re-coated for free after every game, and they have the same effect as Black Lotus. For reference: they will wound the target automatically if you roll a 6 to hit. Note that you can still roll a dice for every wound inflicted in this way. If you roll a 6, you will inflict a critical hit with that roll. If you do not roll a 6, you will cause a normal wound. Take armour saves as normal.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Night Goblins"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 17,
        category: "Close Combat",
        name: "Double-handed weapon",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Two-Handed: A model armed with a double-handed weapon may not use a shield, buckler or additional weapon in close combat. If the model is equipped with a shield he will still get a +1 bonus to his armour save against shooting.",
            "Strength +2",
            "Strikes Last: Double-handed weapons are so heavy that the model using them always strikes last, even when charging."
        ],
        turnOrderRules: [
            { name: "Strength +2", rule: "Strength +2", timing: "9" },
            { name: "Strike Last", rule: "Double-handed weapons are so heavy that the model using them always strikes last, even when charging.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 512,
        category: "Close Combat",
        name: "Broadsword of Damnation",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Two-Handed: A model armed with a double-handed weapon may not use a shield, buckler or additional weapon in close combat. If the model is equipped with a shield he will still get a +1 bonus to his armour save against shooting.",
            "Strength +2",
            "Strikes Last: Double-handed weapons are so heavy that the model using them always strikes last, even when charging.",
            "Spawn of Chaos: Whenever a warrior is taken out of action by a critical hit of the Broadsword, the warrior is transformed into a horrible Spawn of Chaos, that is controlled by the Chaos player. The warrior dies permanently after the battle."
        ],
        turnOrderRules: [
            { name: "Strength +2", rule: "Strength +2", timing: "9" },
            { name: "Strike Last", rule: "Double-handed weapons are so heavy that the model using them always strikes last, even when charging.", timing: "9" },
            { name: "Spawn of Chaos", rule: "Whenever a warrior is taken out of action by a critical hit of the Broadsword, the warrior is transformed into a horrible Spawn of Chaos, that is controlled by the Chaos player.", timing: "9" },
            { name: "Spawn of Chaos Post Game", rule: "A warrior that got turned into a spawn of chaos has died permanently after the battle.", timing: "13" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Belandysh, Condemned Champion Of Chen"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 508,
        category: "Close Combat",
        name: "Icefang Axe",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Two-Handed: A model armed with a double-handed weapon may not use a shield, buckler or additional weapon in close combat. If the model is equipped with a shield he will still get a +1 bonus to his armour save against shooting.",
            "Strength +2",
            "Strikes Last: Double-handed weapons are so heavy that the model using them always strikes last, even when charging.",
            "Parry: Can be used to parry",
            "+1 Injury: +1 modifier to injury rolls"
        ],
        turnOrderRules: [
            { name: "Strength +2", rule: "Strength +2", timing: "9" },
            { name: "Parry", rule: "Can be used to parry", timing: "9" },
            { name: "+1 Injury", rule: "+1 modifier to injury rolls", timing: "9" },
            { name: "Strike Last", rule: "Double-handed weapons are so heavy that the model using them always strikes last, even when charging.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Drenok Johansen, Wielder Of The Great Axe"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 120,
        category: "Close Combat",
        name: "Fighting Claws",
        baseCost: 35,
        variableCost: null,
        rules: [
            "Pair: Fighting Claws are traditionally used in pairs, one in each hand. A warrior armed with Fighting Claws gets an additional attack.",
            "Climb: A Skaven equipped with Fighting Claws can add +1 to his Initiative when making Climbing tests.",
            "Parry: A Skaven armed with Fighting Claws may parry blows and can re-roll a failed attempt once, in the same way as a model armed with a sword and buckler.",
            "Cumbersome: A model armed with Fighting Claws may not use any other weapons in the entire battle."
        ],
        turnOrderRules: [
            { name: "Pair", rule: "A warrior armed with Fighting Claws gets an additional attack.", timing: "9" },
            { name: "Climb", rule: "A Skaven equipped with Fighting Claws can add +1 to his Initiative when making Climbing tests.", timing: "4" },
            { name: "Parry", rule: "A Skaven armed with Fighting Claws may parry blows and can re-roll a failed attempt once, in the same way as a model armed with a sword and buckler.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 13,
        category: "Close Combat",
        name: "Flail",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Heavy: A flail is extremely tiring to use and thus the +2 Strength bonus applies only in the first turn of each hand-to-hand combat.",
            "Two-handed: As a flail requires two hands to use, a model using a flail may not use a shield, buckler or additional weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting."
        ],
        turnOrderRules: [
            { name: "Heavy", rule: "A flail is extremely tiring to use and thus the +2 Strength bonus applies only in the first turn of each hand-to-hand combat.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 14,
        category: "Close Combat",
        name: "Halberd",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Strength +1",
            "Two-handed: A model armed with a halberd may not use a shield, buckler or additional weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 420,
        category: "Close Combat",
        name: "Bec de Corbin",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Strength +1",
            "The model armed with Bec de Corbin strikes in initiative order when charged instead of going last.",
            "When rolling for Injuries, 2-4 is treated as stunned when rolling on the Injury chart. Dwarfs are immune to this effect.",
            "Two-handed: A model may not use a shield, buckler or additional weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" },
            { name: "Injury", rule: "When rolling for Injuries, 2-4 is treated as stunned when rolling on the Injury chart. Dwarfs are immune to this effect.", timing: "9" },
            { name: "Initiative Order", rule: "The model armed with Bec de Corbin strikes in initiative order when charged instead of going last.", timing: "8" }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 122,
        category: "Close Combat",
        name: "Hammer; Horseman's",
        baseCost: 12,
        variableCost: null,
        rules: [
            "Strength +1",
            "Two-handed: A model may not use a shield, buckler or additional weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting.",
            "Cavalry Charge: A model armed with a Horseman's Hammer may use the speed of his charge to increase the might of his attacks. A model on a steed with a Horseman's Hammer gains a further +1 Strength bonus when he charges. This bonus only applies for that turn."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" },
            { name: "Cavalry Charge", rule: "A model armed with a Horseman's Hammer may use the speed of his charge to increase the might of his attacks. A model on a steed with a Horseman's Hammer gains a further +1 Strength bonus when he charges. This bonus only applies for that turn.", timing: "4" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 123,
        category: "Close Combat",
        name: "Warhammer; Sigmarite",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Strength +1",
            "Concussion: Warhammers are excellent at striking people senseless. When using a warhammer in close combat a roll of 2-4 is treated as stunned when rolling on the Injury chart.",
            "Holy Weapon: Each warhammer is blessed by the High Matriarch herself before it is handed to the Sisters. The warhammer has a +1 bonus on all to wound rolls against any Possessed or Undead models. Note that you will still need to score a 6 before any modifiers in order to cause a critical hit. Only Matriarchs and Sister Superiors may carry two Sigmarite warhammers."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" },
            { name: "Holy Weapon", rule: "The warhammer has a +1 bonus on all to wound rolls against any Possessed or Undead models.", timing: "9" },
            { name: "Concussion", rule: "Warhammers are excellent at striking people senseless. When using a warhammer in close combat a roll of 2-4 is treated as stunned when rolling on the Injury chart.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Sisters of Sigmar"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 510,
        category: "Close Combat",
        name: "Mad Max Holy Weapon",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Strength +2",
            "Holy Weapon: +1 to rolls to wound on Undead, Possessed, Carnival of Chaos, Beastmen"
        ],
        turnOrderRules: [
            { name: "Strength +2", rule: "Strength +2", timing: "9" },
            { name: "Holy Weapon", rule: "+1 to rolls to wound on Undead, Possessed, Carnival of Chaos, Beastmen", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Maximilian The Mad"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 124,
        category: "Close Combat",
        name: "Iron Fist",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Parry: A model with an iron fist may parry enemy blows.",
            "Gloved: A model armed with an iron fist may not hold another weapon in the same hand. This means a double-handed weapon cannot be used. Having two iron fists means the Ogre may not use any other close combat weapons during a battle.",
            "Dual-role: Iron fists operate like a buckler and a bladed hand weapon at the same time. This means that an iron fist allows the wearer to re-roll failed parry attempts if paired with a sword or another iron fist."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "A model with an iron fist may parry enemy blows.", timing: "9" },
            { name: "Dual-role", rule: "Iron fists operate like a buckler and a bladed hand weapon at the same time. This means that an iron fist allows the wearer to re-roll failed parry attempts if paired with a sword or another iron fist.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Maneaters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 126,
        category: "Close Combat",
        name: "Kitchen Knife",
        baseCost: 2,
        variableCost: null,
        rules: ["+1 Enemy armour save: Daggers are not the best weapons to use for penetrating an enemy model's armour. An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally."],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Mootlanders"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 127,
        category: "Close Combat",
        name: "Ladle",
        baseCost: 2,
        variableCost: null,
        rules: [
            "No save except shields: A Master Chef knows exactly where to aim his ladle, helmets and breast plates are of little use against a ladle whacked across the hands. The only saving throws allowed are from shields or skills.",
            "Knuckle Cracking: If a Master Chef manages to hit an enemy in close combat (a feat within itself) and scores a '6' in doing so he has rapped his enemy across the knuckles and forced him to drop his weapon."
        ],
        turnOrderRules: [
            { name: "No save except shields", rule: "The only saving throws allowed are from shields or skills.", timing: "9" },
            { name: "Knuckle Cracking", rule: "If a Master Chef manages to hit an enemy in close combat and scores a '6' in doing so he has rapped his enemy across the knuckles and forced him to drop his weapon.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Mootlanders"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 128,
        category: "Close Combat",
        name: "Lance",
        baseCost: 40,
        variableCost: null,
        rules: [
            "Strength +2 when charging on horseback",
            "Cavalry weapon: A warrior must own a warhorse to use a lance, as it can only be used whilst he is on horseback.",
            "Cavalry bonus: If using optional rules for mounted models, a warrior armed with a lance receives a +2 Strength bonus when he charges. This bonus only applies for that turn."
        ],
        turnOrderRules: [
            { name: "Cavalry bonus", rule: "A warrior armed with a lance receives a +2 Strength bonus when he charges. This bonus only applies for that turn.", timing: "4" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 129,
        category: "Close Combat",
        name: "Main Gauche",
        baseCost: 7,
        variableCost: null,
        rules: [
            "+1 Enemy armour save: Daggers are not the best weapons to use for penetrating an enemy model's armour. An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.",
            "Parry: Can parry enemy blows"
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "Target gets +1 to armour save", timing: "9" },
            { name: "Parry", rule: "Can parry enemy blows", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Hochland Bandits", "Dreamwalkers, Cult Of Morr"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 130,
        category: "Close Combat",
        name: "Man-catcher",
        baseCost: 25,
        variableCost: null,
        rules: [
            "Capture: A model taken out of action by a Mancatcher becomes captured. Do not roll for Serious Injuries. The catch is locked up in the Engine of Chaos instead. If the warband does not include an Engine of Chaos, roll for Serious Injuries as normal. Large models, such as Ogres, Trolls and Minotaurs, cannot be captured this way, and neither can animals.",
            "Two-handed: Requires two hands to wield"
        ],
        turnOrderRules: [
            { name: "Capture", rule: "A model taken out of action by a Mancatcher becomes captured. Do not roll for Serious Injuries. The catch is locked up in the Engine of Chaos instead. If the warband does not include an Engine of Chaos, roll for Serious Injuries as normal. Large models, such as Ogres, Trolls and Minotaurs, cannot be captured this way, and neither can animals", timing: "13" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["The Sons of Hashut", "Black Dwarfs"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 481,
        category: "Close Combat",
        name: "Thingcatcher",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Capture: A model taken out of action by a Mancatcher becomes captured. Do not roll for Serious Injuries. The catch is locked up in the Engine of Chaos instead. If the warband does not include an Engine of Chaos, roll for Serious Injuries as normal. Large models, such as Ogres, Trolls and Minotaurs, cannot be captured this way, and neither can animals.",
            "Two-handed: Requires two hands to wield",
            "Strength +1"
        ],
        turnOrderRules: [
            { name: "Iron Grip", rule: "Models equipped with a Thingcatcher can force beasts to reroll a failed Stupidity test resulting from a failed Goading attempt.", timing: "2" },
            { name: "Strength +1", rule: "Strength +1", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Skaven of Clan Moulder"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 417,
        category: "Close Combat",
        name: "Slaaneshi Man-catcher",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Strength as user +1",
            "Lock: If it hits and causes an unsaved wound, do not roll on the injury chart. Instead, the enemy is knocked down, and cannot stand up as long as it is in melee combat with the wielder. The target cannot move away from the combat unless magic is used. The wielder can move (and drags the enemy with them) as long as they are not engaged in combat with any other model. The Man-Catcher does not work on Large creatures such as Ogres, or Steeds such as Horses. If you switch weapons while using the Man-Catcher, the opponent can then stand up as normal in their recovery phase. At the end of the battle, the target model is captured as a result of a 61 on the Serious Injury chart if still pinned down by the Man-Catcher. This happens even if it is a Henchman.",
            "Two-handed: Requires two hands to wield"
        ],
        turnOrderRules: [
            { name: "Lock Combat", rule: "If it hits and causes an unsaved wound, do not roll on the injury chart. Instead, the enemy is knocked down, and cannot stand up as long as it is in melee combat with the wielder. The target cannot move away from the combat unless magic is used. The wielder can move (and drags the enemy with them) as long as they are not engaged in combat with any other model. The Man-Catcher does not work on Large creatures such as Ogres, or Steeds such as Horses. If you switch weapons while using the Man-Catcher, the opponent can then stand up as normal in their recovery phase.", timing: "9" },
            { name: "Lock Post Game", rule: "At the end of the battle, the target model is captured as a result of a 61 on the Serious Injury chart if still pinned down by the Man-Catcher. This happens even if it is a Henchman.", timing: "13" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Court of the Profane Pleasures"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Slaaneshi Whipmaster"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 131,
        category: "Close Combat",
        name: "Misericordia",
        baseCost: 10,
        variableCost: null,
        rules: [
            "+1 Enemy armour save: Daggers are not the best weapons to use for penetrating an enemy model's armour. An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.",
            "Armour Piercing: When attacking enemies that are Knocked-Down you get to roll 2D6 and pick the highest number on ‘to wound’ roll."
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "Target gets +1 to armour save", timing: "9" },
            { name: "Armour Piercing", rule: "Armour Piercing: When attacking enemies that are Knocked-Down you get to roll 2D6 and pick the highest number on ‘to wound’ roll.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 441,
        category: "Close Combat",
        name: "Misericordia",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Coup de grace: When attacking knocked down opponents, Misericordia bypasses all armour saves. As the warriors of the Cursed Cavalcade are experts at hitting the vital spots of their opponents, the Misericordia can find the smallest chink in even the best suit of armour. Often the wielders choose a spot that causes indescribable pain but does not kill the target outright so he can be dragged before the Throne of Worms."
        ],
        turnOrderRules: [
            { name: "Coup de grace", rule: "When attacking knocked down opponents, Misericordia bypasses all armour saves.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 16,
        category: "Close Combat",
        name: "Morning Star",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Heavy: The morning star is extremely tiring to use, so its +1 Strength bonus applies only in the first turn of each hand-to-hand combat.",
            "Difficult to use: A model with a morning star may not use a second weapon or buckler in his other hand because it requires all his skill to wield it. He may carry a shield as normal though."
        ],
        turnOrderRules: [
            { name: "Heavy", rule: "The morning star is extremely tiring to use, so its +1 Strength bonus applies only in the first turn of each hand-to-hand combat.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 305,
        category: "Close Combat",
        name: "Choppa",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Heavy: The morning star is extremely tiring to use, so its +1 Strength bonus applies only in the first turn of each hand-to-hand combat.",
            "Difficult to use: A model with a morning star may not use a second weapon or buckler in his other hand because it requires all his skill to wield it. He may carry a shield as normal though."
        ],
        turnOrderRules: [
            { name: "Heavy", rule: "The morning star is extremely tiring to use, so its +1 Strength bonus applies only in the first turn of each hand-to-hand combat.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Black Orcs"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 133,
        category: "Close Combat",
        name: "Ogre Club",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Concussion: Ogre clubs are excellent to use for striking enemies senseless. When using an Ogre club, a roll of 2-4 is treated as stunned when rolling for Injuries.",
            "Crushing Attack: Ogre clubs may be wielded with impressive strength imposing -1 to enemy armour saves. Also the Strength of the attack is considered one higher for parry attempts by the defender, so a S3 model may not parry attacks by a S5 Ogre wielding the club. Crushing Attack only applies if the Ogre uses the club with both hands."
        ],
        turnOrderRules: [
            { name: "Concussion", rule: "Ogre clubs are excellent to use for striking enemies senseless. When using an Ogre club, a roll of 2-4 is treated as stunned when rolling for Injuries.", timing: "9" },
            { name: "Crushing Attack", rule: "Ogre clubs may be wielded with impressive strength imposing -1 to enemy armour saves. Also the Strength of the attack is considered one higher for parry attempts by the defender, so a S3 model may not parry attacks by a S5 Ogre wielding the club. Crushing Attack only applies if the Ogre uses the club with both hands.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Maneaters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 134,
        category: "Close Combat",
        name: "Pike; Tilean",
        baseCost: 12,
        variableCost: null,
        rules: [
            "Strike First: A model wielding a pike can strike first in the first round of combat even when charged by a model wielding a spear. After the initial round of combat resolve strikes in Initiative order. The model can change to normal hand-to-hand weapons after the initial round.",
            "Long Polearm: Due to its considerable length, a model that has a pike can attack another model from up to 3\" away without being a part of a hand-to-hand melee.",
            "Unwieldy: Pikes have to be used with both hands therefore only 1 attack is allowed. The model also cannot take advantage of a shield or buckler while using a pike.",
            "Large: Because of its length and weight only man-sized or larger creatures can use pikes. Skaven, Skinks, Halflings, etc cannot."
        ],
        turnOrderRules: [
            { name: "Strike First", rule: "A model wielding a pike can strike first in the first round of combat even when charged by a model wielding a spear. After the initial round of combat resolve strikes in Initiative order. The model can change to normal hand-to-hand weapons after the initial round.", timing: "9" },
            { name: "Long Polearm", rule: "Due to its considerable length, a model that has a pike can attack another model from up to 3\" away without being a part of a hand-to-hand melee.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 415,
        category: "Close Combat",
        name: "Pike; Merchant Caravan",
        baseCost: 12,
        variableCost: null,
        rules: [
            "Strike First: A warrior with a pike strikes first in the first turn of a hand-to-hand combat. For that turn, he gains +1 Initiative representing the pike's long shaft that allows him to attack even before the enemy reaches him.",
            "Two Handed: A model armed with a pike may not use a shield, buckler, or additional weapon in close combat. However, it gets an additional +1 armor save bonus against ranged attacks if it carries a shield."
        ],
        turnOrderRules: [
            { name: "Strike First", rule: "A warrior with a pike strikes first in the first turn of a hand-to-hand combat. For that turn, he gains +1 Initiative representing the pike's long shaft that allows him to attack even before the enemy reaches him.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Merchant Caravans"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 135,
        category: "Close Combat",
        name: "Quarter Staff",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Balanced: A quarter staff is especially light and easy to wield. A model armed with a fighting staff gets +1 Initiative in close combat.",
            "Parry: Can parry enemy blows",
            "Freestyle: Although a staff does not always require two hands to use, it cannot be combined with another weapon, shield, buckler, etc. However, it can be combined with the Monks bare hand attacks. This means that the Monk is still getting +1 Attack."
        ],
        turnOrderRules: [
            { name: "Balanced", rule: "A model armed with a fighting staff gets +1 Initiative in close combat.", timing: "9" },
            { name: "Freestyle", rule: "Although a staff does not always require two hands to use, it cannot be combined with another weapon, shield, buckler, etc. However, it can be combined with the Monks bare hand attacks. This means that the Monk is still getting +1 Attack.", timing: "9" },
            { name: "Parry", rule: "Can parry enemy blows", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Battle Monks of Cathay"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 535,
        category: "Close Combat",
        name: "Asrai Blade-Staff",
        baseCost: 20,
        variableCost: "2d6",
        rules: [
            "+1 Strength when charging",
            "Parry: Can parry enemy blows",
            "Two Handed: A model armed with an Asrai Blade may not use a shield, buckler, or additional weapon in close combat. If the model is equipped with a shield he will still get a +1 bonus to his Armor save against shooting",
            "Additional Attack: The user gains an additional attack when using this weapon. When used in this fashion, the normal rules for fighting with two weapons apply."],
        turnOrderRules: [
            { name: "+1 Str", rule: "+1 Strength when charging", timing: "9" },
            { name: "Two Handed", rule: "A model armed with an Asrai Blade may not use a shield, buckler, or additional weapon in close combat.", timing: "9" },
            { name: "Parry", rule: "Can parry enemy blows", timing: "9" },
            { name: "Additional Attack", rule: "The user gains an additional attack when using this weapon", timing: "9" }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Asrai Wayfarer"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Asrai Wayfarer": { baseCost: 20, variableCost: null }
        }
    },
    {
        id: 505,
        category: "Close Combat",
        name: "Bo",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Extra Attack: Grants +1 Attack",
            "Parry: Can parry enemy blows",
            "Two Hands: Requires two hands"
        ],
        turnOrderRules: [
            { name: "Extra Attack", rule: "Weapon grants an extra attack", timing: "9" },
            { name: "Two Hands", rule: "Weapon requires two hands", timing: "9" },
            { name: "Parry", rule: "Can parry enemy blows", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Ninja Gnoblar"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 486,
        category: "Close Combat",
        name: "Wizard Staff",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Parry: Can parry enemy blows",
            "Two Handed: A model using a Wizard’s Staff may not use a shield, buckler or additional weapon in close combat. If the model has a shield, it receives a +1 bonus to his armour save versus shooting attacks.",
            "Concussion: When using a Wizard’s Staff, a roll of 2–4 is treated as stunned when rolling on the injury table."
        ],
        turnOrderRules: [
            { name: "Concussion", rule: "A roll of 2–4 is treated as stunned when rolling on the injury table.", timing: "9" },
            { name: "Parry", rule: "Can parry enemy blows", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Battle Monks of Cathay"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 474,
        category: "Close Combat",
        name: "Staff of Damnation",
        baseCost: 25,
        variableCost: null,
        rules: [
            "Two-Handed: As the Staff of Damnation requires two hands to wield, a model equipped with it may not use a shield, buckler or secondary weapon in close combat. If the model has a shield it will still get a +1 bonus to its armour save against shooting.",
            "Magic-well: A Necrarch Vampire may cast a spell into the Staff of Damnation during his Magic phase instead of casting as normal. Upon a successful casting, the spell is stored within the staff. The spell may be released during a later shooting phase in lieu of casting another spell."
        ],
        turnOrderRules: [
            { name: "Two-Handed", rule: "Requires two hands to wield, a model equipped with it may not use a shield, buckler or secondary weapon in close combat. If the model has a shield it will still get a +1 bonus to its armour save against shooting.", timing: "9" },
            { name: "Magic-well", rule: "Vampire may cast a spell into the Staff of Damnation during his Magic phase instead of casting as normal. Upon a successful casting, the spell is stored within the staff. The spell may be released during a later shooting phase in lieu of casting another spell.", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Necrarchs, the Soul Stealers"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Necrarch Vampire"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 136,
        category: "Close Combat",
        name: "Rapier",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Barrage: A warrior armed with a rapier rolls to hit and wound as normal. However, if you mange to hit your opponent but fail to wound, you may attack again just as if you had another attack but at –1 to hit (down to a maximum to needing a 6 to hit). You may continue attacking as long as you hit and it is possible to strike your opponent many times, particularly if your warrior has more then one attack on his profile.",
            "Parry: Like all swords, you may use a rapier to parry in hand to hand combat. When your opponent scores a hit you must roll a D6. If you can score greater than the highest 'to hit' roll you have parried the blow and the attack is discarded.",
            "Armour Save: Because a rapier is a very light sword that lacks the thick armour breaking blade of the broadsword, armour saves are made at +1."
        ],
        turnOrderRules: [
            { name: "Barrage", rule: "A warrior armed with a rapier rolls to hit and wound as normal. However, if you mange to hit your opponent but fail to wound, you may attack again just as if you had another attack but at –1 to hit (down to a maximum to needing a 6 to hit). You may continue attacking as long as you hit and it is possible to strike your opponent many times, particularly if your warrior has more then one attack on his profile.", timing: "9" },
            { name: "Armour Save", rule: "Because a rapier is a very light sword that lacks the thick armour breaking blade of the broadsword, armour saves are made at +1.", timing: "9" },
            { name: "Parry", rule: "Can parry enemy blows", timing: "9" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 5 },
        restrictedWarbands: ["Mercenaries (Reikland)", "Mercenaries (Marienburg)", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Hochland Bandits", "Merchant Caravans", "Dreamwalkers, Cult Of Morr"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 137,
        category: "Close Combat",
        name: "Serpent Staff",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Parry: The staff is used with two hands and may be used to Parry. However, the Liche Priest may forgo all his normal attacks and parries in a round to use the power contained within the staff. A single word of command brings the serpent to life to attack their enemy. The staff always attacks first in close combat and makes a single attack with WS4 and S4."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "The staff is used with two hands and may be used to Parry. However, the Liche Priest may forgo all his normal attacks and parries in a round to use the power contained within the staff. A single word of command brings the serpent to life to attack their enemy. The staff always attacks first in close combat and makes a single attack with WS4 and S4.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Tomb Guardians"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Liche Priest"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 138,
        category: "Close Combat",
        name: "Shortsword",
        baseCost: 7,
        variableCost: null,
        rules: [
            "Parry: Shortswords offer an excellent balance of defence and offence. A model armed with a sword may parry blows. When his opponent rolls to hit, the model armed with a sword may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped.",
            "+1 Enemy armour save: Shortswords are not the best weapons to use for penetrating an enemy model's armour. An enemy wounded by a short sword gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Shortswords offer an excellent balance of defence and offence. A model armed with a sword may parry blows. When his opponent rolls to hit, the model armed with a sword may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped.", timing: "9" },
            { name: "+1 Enemy armour save", rule: "An enemy wounded by a short sword gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Bretonnian Chapel Guard"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Questing Knight", "Knights Errant"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 15,
        category: "Close Combat",
        name: "Spear",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Strike first: A warrior with a spear 'strikes first' in the first turn of hand-to-hand combat.",
            "Cavalry bonus: If using the rules for mounted models, a mounted warrior armed with a spear receives a +1 Strength bonus when he charges. This bonus only applies for that turn.",
            "Unwieldy: A warrior with a spear may only use a shield or a buckler in his other hand. He may not use a second weapon."
        ],
        turnOrderRules: [
            { name: "Strike first", rule: "A warrior with a spear 'strikes first' in the first turn of hand-to-hand combat.", timing: "9" },
            { name: "Cavalry bonus", rule: "If using the rules for mounted models, a mounted warrior armed with a spear receives a +1 Strength bonus when he charges. This bonus only applies for that turn.", timing: "4" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 440,
        category: "Close Combat",
        name: "Boar Spear",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Strike first: A warrior with a spear 'strikes first' in the first turn of hand-to-hand combat.",
            "Cavalry bonus: If using the rules for mounted models, a mounted warrior armed with a spear receives a +1 Strength bonus when he charges. This bonus only applies for that turn.",
            "Strength +1",
            "Cross Guard: The Boar Spear has been designed to stop the charge of an enraged boar on its tracks. When charged it reduces the number of attacks of the first assailant into the close combat by 1 (down to a minimum of 1). Attacks from a second hand weapon or from any other source except base stats are not affected. Boar Spear has no effect on Large creatures such as Ogres save for the Charge Bonus. The Aristocrat cannot wield two Boar Spears at once."
        ],
        turnOrderRules: [
            { name: "Strike first", rule: "A warrior with a spear 'strikes first' in the first turn of hand-to-hand combat.", timing: "9" },
            { name: "Cavalry bonus", rule: "If using the rules for mounted models, a mounted warrior armed with a spear receives a +1 Strength bonus when he charges. This bonus only applies for that turn.", timing: "4" },
            { name: "Cross Guard", rule: "When charged it reduces the number of attacks of the first assailant into the close combat by 1 (down to a minimum of 1). Attacks from a second hand weapon or from any other source except base stats are not affected. Boar Spear has no effect on Large creatures such as Ogres save for the Charge Bonus. The Aristocrat cannot wield two Boar Spears at once.", timing: "11" }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Aristocrat"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 36,
        category: "Close Combat",
        name: "Spiked Gauntlet",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Parry: Can parry enemy blows"
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Can parry enemy blows", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Pit Fighters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 139,
        category: "Close Combat",
        name: "Starblade",
        baseCost: 15,
        variableCost: null,
        rules: [
            "+1 Enemy armour save: Enemy gets +1 to armour save",
            "Potential Parry: A Starblade can parry the first successful hit of any combat on a 4+."
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "Enemy gets +1 to armour save", timing: "9" },
            { name: "Potential Parry:", rule: "A Starblade can parry the first successful hit of any combat on a 4+.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Amazons (Lustria)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 140,
        category: "Close Combat",
        name: "Starsword",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Parry: Can parry enemy blows",
            "Ignores Armour: A Starsword ignores all armour saves except for ward and Dodge saves"
        ],
        turnOrderRules: [
            { name: "Ignores Armour", rule: "A Starsword ignores all armour saves except for ward and Dodge saves", timing: "9" },
            { name: "Parry:", rule: "Can parry enemy blows", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Amazons (Lustria)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 141,
        category: "Close Combat",
        name: "Steel Whip",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Cannot be parried: The steel whip is a flexible weapon and the Priestesses use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a steel whip may not make parries with swords or bucklers.",
            "Whip Crack: When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A"
        ],
        turnOrderRules: [
            { name: "Cannot be parried", rule: "The steel whip is a flexible weapon and the Priestesses use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a steel whip may not make parries with swords or bucklers.", timing: "9" },
            { name: "Whipcrack", rule: "When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Sisters of Sigmar", "Black Dwarfs", "The Sons of Hashut"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 456,
        category: "Close Combat",
        name: "Whip",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Range 4\"",
            "Strength -1",
            "Cannot be parried: The steel whip is a flexible weapon and the Priestesses use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a steel whip may not make parries with swords or bucklers.",
            "Whip Crack: When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A",
            "Disamr: Instead of striking to injure, a warrior with a Whip may try to strike his opponent's weapon making him drop it. Roll to hit as normal, but instead of rolling to wound, the opponent gets a single Parry attempt; if the Parry attempt is failed, he has dropped his weapon. He must now fight with whatever back-up weapon he has in his equipment for the rest of this combat (or fight unarmed if he has no other weapons). At the end of the combat, the model is assumed to retrieve the dropped weapon, as long as he is not put out of action. Disarmed opponents put out of action lose the weapon permanently.",
            "+1 Armour Save"
        ],
        turnOrderRules: [
            { name: "Cannot be parried", rule: "The steel whip is a flexible weapon and the Priestesses use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a steel whip may not make parries with swords or bucklers.", timing: "9" },
            { name: "Whipcrack", rule: "When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A.", timing: "9" },
            { name: "Range 4\"", rule: "Range 4\"", timing: "9" },
            { name: "Strength -1", rule: "Strength -1", timing: "9" },
            { name: "+1 Armour Save", rule: "+1 Armour Save", timing: "9" },
            { name: "Disamr", rule: "Instead of striking to injure, a warrior with a Whip may try to strike his opponent's weapon making him drop it. Roll to hit as normal, but instead of rolling to wound, the opponent gets a single Parry attempt; if the Parry attempt is failed, he has dropped his weapon. He must now fight with whatever back-up weapon he has in his equipment for the rest of this combat (or fight unarmed if he has no other weapons). At the end of the combat, the model is assumed to retrieve the dropped weapon, as long as he is not put out of action. Disarmed opponents put out of action lose the weapon permanently.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [""],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Mule Skinner"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 416,
        category: "Close Combat",
        name: "Hedonist Whip",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Cannot be parried: The Hedonist Whip is a flexible weapon and the zealots of the Dark Prince use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a Hedonist Whip may not make parries with swords or bucklers.",
            "Whip Crack: When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A"
        ],
        turnOrderRules: [
            { name: "Cannot be parried", rule: "A model attacked by a steel whip may not make parries with swords or bucklers.", timing: "9" },
            { name: "Whipcrack", rule: "When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: ["henchmen"],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 10,
        category: "Close Combat",
        name: "Sword",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Parry: Swords offer an excellent balance of defence and offence. A model armed with a sword may parry blows. When his opponent rolls to hit, the model armed with a sword may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Parry: Swords offer an excellent balance of defence and offence. A model armed with a sword may parry blows. When his opponent rolls to hit, the model armed with a sword may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 491,
        category: "Close Combat",
        name: "Chest Talon",
        baseCost: 15,
        variableCost: null,
        rules: [
            "wo-Handed: As the Chest Talon requires two hands to wield, a model equipped with it may not use a shield, buckler or secondary weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting.",
            "Heart-Pierce: Such is the destructive design of the weapon that it adds +1 to wound against a blood-thirster."
        ],
        turnOrderRules: [
            { name: "Heart-Pierce", rule: "Such is the destructive design of the weapon that it adds +1 to wound against a blood-thirster.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Survivors Of Strigos"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 471,
        category: "Close Combat",
        name: "Chainsaw Sword",
        baseCost: 15,
        variableCost: "1d6",
        rules: [
            "Fear: Incredibly loud and belching forth a sickly green smoke, this weapon causes even seasoned soldiers to quiver. A model bearing a Chainsaw Sword causes Fear.",
            "Shredder: The Chainsaw sword rips and chews through armour as if it were cloth. All blows from a Chainsaw Sword are at -2 Armour Save."
        ],
        turnOrderRules: [
            { name: "Fear", rule: "A model bearing a Chainsaw Sword causes Fear.", timing: "9" },
            { name: "Shredder", rule: "All blows from a Chainsaw Sword are at -2 Armour Save.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Masters Of Horror"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 464,
        category: "Close Combat",
        name: "Draich",
        baseCost: 25,
        variableCost: "1d6",
        rules: [
            "Strength +2",
            "Swift: A Draich, unlike other double-handed weapons, does not Strike last.",
            "Two-handed: A model armed with a double-handed weapon may not use a shield, buckler or additional weapon in close combat. If the model is equipped with a shield, he will still get a +1 bonus to his armour save against shooting."
        ],
        turnOrderRules: [
            { name: "Strength +2", rule: "Strength +2", timing: "9" },
            { name: "Swift", rule: "Does not Strike last", timing: "9" },
            { name: "Two-handed", rule: "May not use a shield, buckler or additional weapon in close combat. If the model is equipped with a shield, he will still get a +1 bonus to his armour save against shooting.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Druchii"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 452,
        category: "Close Combat",
        name: "Obsidian Sword",
        baseCost: 60,
        variableCost: null,
        rules: [
            "Strength +1",
            "Initiative -1",
            "Parry: Swords offer an excellent balance of defence and offence. A model armed with a sword may parry blows. When his opponent rolls to hit, the model armed with a sword may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Parry: Swords offer an excellent balance of defence and offence. A model armed with a sword may parry blows. When his opponent rolls to hit, the model armed with a sword may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped.", timing: "9" },
            { name: "Str +1", rule: "Str +1", timing: "9" },
            { name: "Initiative -1", rule: "Initiative -1", timing: "9" }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Marauders of Chaos", "The Sons of Hashut", "Black Dwarfs"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 425,
        category: "Close Combat",
        name: "Lizardman Sword",
        baseCost: 30,
        variableCost: null,
        rules: [
            "+1 to Wound",
            "Parry: Swords offer an excellent balance of defence and offence. A model armed with a sword may parry blows. When his opponent rolls to hit, the model armed with a sword may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Parry: Swords offer an excellent balance of defence and offence. A model armed with a sword may parry blows. When his opponent rolls to hit, the model armed with a sword may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped.", timing: "9" },
            { name: "+1 to Wound", rule: "+1 to Wound", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        allowedSpecificHeroes: ["Saurus Slayer"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 142,
        category: "Close Combat",
        name: "Sword Breaker",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Parry: The sword breaker allows the wielder to parry the attacks of his opponents in close combat. When your opponent scores a hit roll a D6. If you can roll greater than the highest 'to hit' roll of your opponent you have parried the attack and the blow is wasted.",
            "Trap Blade: The two prongs used to trap an opponent's weapon are snapped out when the warrior parries. Whenever you make a successful parry attempt roll a D6. If you score a 4+ you break the weapon your opponent was using. The weapon is now useless and they must use another one, or if they have no other weapon, resort to unarmed combat."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "The sword breaker allows the wielder to parry the attacks of his opponents in close combat. When your opponent scores a hit roll a D6. If you can roll greater than the highest 'to hit' roll of your opponent you have parried the attack and the blow is wasted.", timing: "9" },
            { name: "Disarm", rule: "Whenever you make a successful parry attempt roll a D6. If you score a 4+ you break the weapon your opponent was using. The weapon is now useless and they must use another one, or if they have no other weapon, resort to unarmed combat.", timing: "9" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 143,
        category: "Close Combat",
        name: "Sword; Cathayan Long",
        baseCost: 75,
        variableCost: "2D6",
        rules: [
            "Mastercrafted: Attacks made with a Cathayan longsword give the bearer +1 Initiative and +1 Weapon Skill."
        ],
        turnOrderRules: [
            { name: "Mastercrafted", rule: "Mastercrafted: Attacks made with a Cathayan longsword give the bearer +1 Initiative and +1 Weapon Skill.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 144,
        category: "Close Combat",
        name: "Sword; Dragon",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Strength +1",
            "Two-handed: A model armed with a Dragon Sword may not use a shield, buckler or additional weapon in close combat. It gets an additional +1 armour save bonus against ranged attacks if it carries a shield.",
            "Parry: Dragon Swords, despite their great size, can be used for parrying like a sword. When his opponent rolls to hit, the model armed with it may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength - they are simply too powerful to be stopped."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Dragon Swords, despite their great size, can be used for parrying like a sword. When his opponent rolls to hit, the model armed with it may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength - they are simply too powerful to be stopped.", timing: "9" },
            { name: "Strength +1", rule: "Strength +1", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 145,
        category: "Close Combat",
        name: "Tenderiser",
        baseCost: 3,
        variableCost: null,
        rules: [
            "Stuns on 2-4"
        ],
        turnOrderRules: [
            { name: "Stuns on 2-4", rule: "Stuns on 2-4", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Mootlanders"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 146,
        category: "Close Combat",
        name: "Trident",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Parry: Can parry enemy blows",
            "Strike first: Strikes first when charged"
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Can parry enemy blows", timing: "9" },
            { name: "Strike first", rule: "Strikes first when charged", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Pit Fighters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 472,
        category: "Close Combat",
        name: "Electric Trident",
        baseCost: 15,
        variableCost: "1d6",
        rules: [
            "Zzap!: So stunning is the Electric Trident that a model wounded by it is considered Stunned on a roll of 2-4.",
            "Shocking: On a natural 6 To-Hit followed by a natural 6 To-Wound, the Electric Trident discharges a field 2\" around the target. All models (save for the bearer of the weapon) are struck with a S3 hit.",
            "Nail in Boot: If a D6 roll of 1 occurs on the To-Hit roll with the Trident, the bearer is struck with a S3 hit."
        ],
        turnOrderRules: [
            { name: "Zzap!", rule: "A model wounded by it is considered Stunned on a roll of 2-4.", timing: "9" },
            { name: "Shocking", rule: "On a natural 6 To-Hit followed by a natural 6 To-Wound, the Electric Trident discharges a field 2\" around the target. All models (save for the bearer of the weapon) are struck with a S3 hit.", timing: "9" },
            { name: "Nail in Boot", rule: "If a D6 roll of 1 occurs on the To-Hit roll with the Trident, the bearer is struck with a S3 hit.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Masters Of Horror"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 147,
        category: "Close Combat",
        name: "Weeping Blades",
        baseCost: 50,
        variableCost: null,
        rules: [
            "Pair: Weeping Blades are traditionally used in pairs, one in each hand. A warrior armed with Weeping Blades gets an additional attack.",
            "Venomous: The venom of Weeping Blades will enter the blood of the victim and ravage his organs and muscles. These weapons count as being permanently coated in black lotus. No additional poison may be applied to Weeping Blades.",
            "Parry: Weeping Blades are swords and can be used for parrying."
        ],
        turnOrderRules: [
            { name: "Venomous", rule: "These weapons count as being permanently coated in black lotus", timing: "9" },
            { name: "Parry", rule: "Weeping Blades are swords and can be used for parrying.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Skaven"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 148,
        category: "Close Combat",
        name: "Whip; Barbed",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Whipcrack: When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A.",
            "Cannot Be Parried: A model attacked by a barbed whip may not parry with a sword or buckler.",
            "Enrage: The Hero may use his whip to make the Warhounds charge wildly. As long as he is not involved in close combat all Warhounds of Chaos within 4\" gain +1 attack."
        ],
        turnOrderRules: [
            { name: "Whipcrack", rule: "When the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whipcrack +1A.", timing: "9" },
            { name: "Cannot Be Parried", rule: "A model attacked by a barbed whip may not parry with a sword or buckler.", timing: "9" },
            { name: "Enrage", rule: "The Hero may use his whip to make the Warhounds charge wildly. As long as he is not involved in close combat all Warhounds of Chaos within 4\" gain +1 attack.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Marauders of Chaos"],
        restrictedHeroTypes: ["Henchman"],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 303,
        category: "Close Combat",
        name: "Katar",
        baseCost: 5,
        variableCost: null,
        rules: [
            "-1 enemy armour save"
        ],
        turnOrderRules: [
            { name: "-1 enemy armour save", rule: "-1 enemy armour save", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 4 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 466,
        category: "Close Combat",
        name: "Whirling Blades",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Cannot be parried: The Whirling Blades is a flexible weapon and a Doomseeker use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a whirling blade may not make parries with swords or bucklers.",
            "Cutting Edge: Whirling Blades have an extra save modifier of -1, so a model with Strength 4 using a Whirling Blade has a -2 save modifier when he hits an opponent with the blade in close combat.",
            "Pair: Whirling Blades are traditionally used in pairs, one in each hand. This off-hand weapon provides an additional attack like normal. A warrior armed with a pair of whirling blades may not wield a different off-hand weapon, and may never split up the pair (unless he loses a hand).",
            "Dance of Doom: Whenever the Doomseeker charges, the blade in their main hand provides a +1 attack in the first round of combat. The main hand also grants an additional attack in any turn in which the doomseeker is charged by one or opponents; this attack must be used against one of the chargers. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. “Dance of Doom” does apply to the off-hand Whirling Blade.",
            "Whirlwind of Death: Whenever the Doomseeker is charged, the free attack from the Dance of Doom attack and the additional attack from the off-hand both gain ‘Strike First,’ like a Steel Whip for that turn. All of the Slayers other attacks strike at normal speed."
        ],
        turnOrderRules: [
            { name: "Cannot be parried", rule: "A model attacked by a whirling blade may not make parries with swords or bucklers.", timing: "9" },
            { name: "Cutting Edge", rule: "Whirling Blades have an extra save modifier of -1, so a model with Strength 4 using a Whirling Blade has a -2 save modifier when he hits an opponent with the blade in close combat.", timing: "9" },
            { name: "Pair", rule: "A warrior armed with a pair of whirling blades may not wield a different off-hand weapon, and may never split up the pair (unless he loses a hand).", timing: "9" },
            { name: "Dance of Doom", rule: "Whenever the Doomseeker charges, the blade in their main hand provides a +1 attack in the first round of combat. The main hand also grants an additional attack in any turn in which the doomseeker is charged by one or opponents; this attack must be used against one of the chargers. If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A. “Dance of Doom” does apply to the off-hand Whirling Blade.", timing: ["4", "5"] },
            { name: "Whirlwind of Death", rule: "Whenever the Doomseeker is charged, the free attack from the Dance of Doom attack and the additional attack from the off-hand both gain ‘Strike First,’ like a Steel Whip for that turn. All of the Slayers other attacks strike at normal speed.", timing: "5" },
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Dwarf Slayer Cult"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    // MISSILE
    {
        id: 422,
        category: "Missile Weapon",
        name: "Firepots Miragliano",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Range 8\" and suffer no hit penalties for long rang",
            "If the orb hits, the target suffers 1 S2 hit from the bursting flames, and in addition the model needs to roll under the Initiative at the start of its next turn in order to see through the smoke. If the model fails, it cannot charge or shoot until the beginning of its next turn, though can otherwise move or act normally, and fight in hand-to-hand combat.",
        ],
        turnOrderRules: [
            { name: "Range 8\"", rule: "Range 8\" and suffer no hit penalties for long rang", timing: "7" },
            { name: "Damage", rule: "If the orb hits, the target suffers 1 S2 hit from the bursting flames, and in addition the model needs to roll under the Initiative at the start of its next turn in order to see through the smoke. If the model fails, it cannot charge or shoot until the beginning of its next turn, though can otherwise move or act normally, and fight in hand-to-hand combat.", timing: ["5", "7"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 149,
        category: "Missile Weapon",
        name: "Belaying Pins",
        baseCost: 3,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength As user -1",
            "Awkward Thrown Weapon: Models using Belaying Pins do not suffer any penalties for range, but still suffer a -1 to hit penalty if they use them after moving that turn.",
            "Weak: They also do not hit very hard, so strike at User Strength -1 and give the target +1 to its armour save (or a 6+ if they have none), exactly as if the enemy had been hit by a bare fist.",
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Weak", rule: "They also do not hit very hard, so strike at User Strength -1 and give the target +1 to its armour save (or a 6+ if they have none), exactly as if the enemy had been hit by a bare fist.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Pirates", "Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 150,
        category: "Missile Weapon",
        name: "Blowpipe",
        baseCost: 25,
        variableCost: null,
        rules: [
            "Range 1\"",
            "Strength 1",
            "Poison: The needles fired by a blowpipe are coated in a venom very similar in its effects to the Black Lotus (if you roll a 6 on the To Hit roll, the victim is automatically wounded). A blowpipe cannot cause critical hits. This weapon has a positive armour save modifier, so a model that normally has a save of 5+ will get a save of 4+ against a blowpipe dart. Even models that normally do not have an armour save will get a 6+ save to take into account protection offered by clothes, fur or the like.",
            "Stealthy: A model armed with a blowpipe can fire while hidden without revealing his position to the enemy. The target model can take an Initiative test in order to try to spot the firing model. If the test is successful, the model no longer counts as hidden.",
        ],
        turnOrderRules: [
            { name: "Range 1\"", rule: "Range 1\"", timing: "7" },
            { name: "Stealthy", rule: "A model armed with a blowpipe can fire while hidden without revealing his position to the enemy. The target model can take an Initiative test in order to try to spot the firing model. If the test is successful, the model no longer counts as hidden.", timing: "7" },
            { name: "Poison", rule: "The needles fired by a blowpipe are coated in a venom very similar in its effects to the Black Lotus (if you roll a 6 on the To Hit roll, the victim is automatically wounded). A blowpipe cannot cause critical hits. This weapon has a positive armour save modifier, so a model that normally has a save of 5+ will get a save of 4+ against a blowpipe dart. Even models that normally do not have an armour save will get a 6+ save to take into account protection offered by clothes, fur or the like.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 7, "Forest Goblins": "common" },
        restrictedWarbands: ["Forest Goblins", "Lizardmen", "Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 151,
        category: "Missile Weapon",
        name: "Bolas",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Range 16\"",
            "Strength Special",
            "Dangerous: If the to hit roll is a natural 1, the bolas brain the wielder with a Strength 3 hit.",
            "Entangle: A model hit by bolas isn't hurt, but his legs are entangled and he is unable to move. The model also suffers a –2 Weapon Skill penalty in hand-to-hand combat, but may still shoot normally. The model may try to free himself in the Recovery phase. If the model rolls a 4+ on a D6 he is freed and may move and fight normally.",
        ],
        turnOrderRules: [
            { name: "Range 16\"", rule: "Range 16\"", timing: "7" },
            { name: "Dangerous", rule: "If the to hit roll is a natural 1, the bolas brain the wielder with a Strength 3 hit.", timing: "7" },
            { name: "Entangle", rule: "A model hit by bolas isn't hurt, but his legs are entangled and he is unable to move. The model also suffers a –2 Weapon Skill penalty in hand-to-hand combat, but may still shoot normally. The model may try to free himself in the Recovery phase. If the model rolls a 4+ on a D6 he is freed and may move and fight normally.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lizardmen", "Amazons (Lustria)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 21,
        category: "Missile Weapon",
        name: "Bow",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Range 24\"",
            "Strength 3"
        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 538,
        category: "Missile Weapon",
        name: "Glade-wood Bow",
        baseCost: 50,
        variableCost: "2d6",
        rules: [
            "Range 30\"",
            "Strength 3",
            "Power Shot: If the wielder doesn’t move during their movement phase, then all shots at targets in short range (15\”) are counted as strength 4."],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" },
            { name: "Power Shot", rule: "If the wielder doesn’t move during their movement phase, then all shots at targets in short range (15\”) are counted as strength 4.", timing: "7" }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 152,
        category: "Missile Weapon",
        name: "Cathayan Candles",
        baseCost: 25,
        variableCost: "D6",
        rules: [
            "Range 6\"",
            "Strength 6",
            "Thrown Weapon: A model using Cathayan candles does not suffer penalties for range or moving.",
            "Volatile: On a roll of 1 to hit, Cathayan candles explode in the throwers hand. Roll to wound treating the throwing model as the target.",
            "Set on Fire: If you hit with the Cathayan candles roll a D6. If you score a 5+ your opponent has been set on fire. They must roll a D6 in the Recovery phase and score a 4+ to put themselves out or they will suffer a Strength 4 hit and will be unable to do anything other than move for each turn they are on fire. Allies may also attempt to put the warrior out. They must be in base contact and need a 4+ to be successful.",
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 6", rule: "Strength 6", timing: "7" },
            { name: "Thrown Weapon", rule: "A model using Cathayan candles does not suffer penalties for range or moving.", timing: "7" },
            { name: "Volatile", rule: "On a roll of 1 to hit, Cathayan candles explode in the throwers hand. Roll to wound treating the throwing model as the target.", timing: "7" },
            { name: "Set on Fire", rule: "If you hit with the Cathayan candles roll a D6. If you score a 5+ your opponent has been set on fire. They must roll a D6 in the Recovery phase and score a 4+ to put themselves out or they will suffer a Strength 4 hit and will be unable to do anything other than move for each turn they are on fire. Allies may also attempt to put the warrior out. They must be in base contact and need a 4+ to be successful.", timing: "7" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 153,
        category: "Missile Weapon",
        name: "Bow; Elf",
        baseCost: 35,
        variableCost: "3D6",
        rules: [
            "Range 36\"",
            "Strength 3",
            "Save Modifier: An Elf bow has a -1 save modifier on armour saves against it."
        ],
        turnOrderRules: [
            { name: "Range 36\"", rule: "Range 36\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" },
            { name: "Save Modifier", rule: "An Elf bow has a -1 save modifier on armour saves against it.", timing: "7" },
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 22,
        category: "Missile Weapon",
        name: "Bow; Long",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Range 30\"",
            "Strength 3"
        ],
        turnOrderRules: [
            { name: "Range 30\"", rule: "Range 30\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 20,
        category: "Missile Weapon",
        name: "Bow; Short",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Range 16\"",
            "Strength 3"
        ],
        turnOrderRules: [
            { name: "Range 16\"", rule: "Range 16\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 23,
        category: "Missile Weapon",
        name: "Crossbow",
        baseCost: 25,
        variableCost: null,
        rules: [
            "Range 30\"",
            "Strength 4",
            "Move or Fire: You may not move and fire a crossbow on the same turn, other than to pivot on the spot to face your target or to stand up."
        ],
        turnOrderRules: [
            { name: "Range 30\"", rule: "Range 30\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or Fire", rule: "You may not move and fire a crossbow on the same turn, other than to pivot on the spot to face your target or to stand up.", timing: ["4", "7"] }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 154,
        category: "Missile Weapon",
        name: "Crossbow; Harpoon",
        baseCost: 50,
        variableCost: null,
        rules: [
            "Range 30\"",
            "Strength 5",
            "Move or Fire: You may not move and fire a crossbow on the same turn, other than to pivot on the spot to face your target or to stand up.",
            "Prepare shot: Requires a full turn to prepare before shooting."
        ],
        turnOrderRules: [
            { name: "Range 30\"", rule: "Range 30\"", timing: "7" },
            { name: "Strength 5", rule: "Strength 5", timing: "7" },
            { name: "Move or Fire", rule: "You may not move and fire a crossbow on the same turn, other than to pivot on the spot to face your target or to stand up.", timing: ["4", "7"] },
            { name: "Prepare shot:", rule: "Requires a full turn to prepare before shooting.", timing: "7" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Maneaters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 155,
        category: "Missile Weapon",
        name: "Crossbow; pistol",
        baseCost: 35,
        variableCost: null,
        rules: [
            "Range 10\"",
            "Strength 4",
            "Shoot In Hand-To-Hand Combat: A model armed with a crossbow pistol may shoot it in the first round of a hand-to-hand combat and this shot is always resolved first, before any blows are struck. This shot has an extra -2 to hit penalty. Use model's Ballistic Skill to see whether it hits or not. This bonus attack is in addition to any close combat weapon attacks",
            "Hand-To-Hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4, regardless of the firer's Strength."
        ],
        turnOrderRules: [
            { name: "Range 10\"", rule: "Range 10\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Shoot In Hand-To-Hand Combat", rule: "A model armed with a crossbow pistol may shoot it in the first round of a hand-to-hand combat and this shot is always resolved first, before any blows are struck. This shot has an extra -2 to hit penalty. Use model's Ballistic Skill to see whether it hits or not. This bonus attack is in addition to any close combat weapon attacks", timing: "9" },
            { name: "Hand-To-Hand:", rule: "Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4, regardless of the firer's Strength.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 156,
        category: "Missile Weapon",
        name: "Crossbow; Repeater",
        baseCost: 40,
        variableCost: null,
        rules: [
            "Range 24\"",
            "Strength 3",
            "Fire twice: A model armed with a repeater crossbow may choose to fire twice per turn with an extra -1 to hit penalty on both shots."
        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" },
            { name: "Fire twice", rule: "May choose to fire twice per turn with an extra -1 to hit penalty on both shots.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 157,
        category: "Missile Weapon",
        name: "Fish-Hook Shot",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Range 3\"",
            "Strength 3",
            "Thrown Weapon: Models using a fish-hook shot do not suffer penalties for range or moving as it is designed for short-range use anyway.",
            "Precise: A model using a fish-hook shot is so well-trained in the use of this weapon that he may attack enemy models that are engaged in close combat. However, the hook shot is useless when the monk himself is engaged in close combat.",
            "Caused Fall: The warrior may declare to try and cause an enemy model to fall instead of causing damage. The warrior must roll to hit as normal and then pass a Strength test. If the test is successful, the enemy model counts as knocked down. Apply a +1 modifier to the Strength test against large models. When a mount gets knocked down, the rider falls off (see 3-4 on the Whoa Boy! table)."
        ],
        turnOrderRules: [
            { name: "Range 3\"", rule: "Range 3\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" },
            { name: "Thrown Weapon", rule: "Models using a fish-hook shot do not suffer penalties for range or moving as it is designed for short-range use anyway.", timing: ["4", "7"] },
            { name: "Precise", rule: "A model using a fish-hook shot is so well-trained in the use of this weapon that he may attack enemy models that are engaged in close combat. However, the hook shot is useless when the monk himself is engaged in close combat.", timing: "7" },
            { name: "Caused Fall", rule: "The warrior may declare to try and cause an enemy model to fall instead of causing damage. The warrior must roll to hit as normal and then pass a Strength test. If the test is successful, the enemy model counts as knocked down. Apply a +1 modifier to the Strength test against large models.", timing: "7" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: ["Battle Monks of Cathay"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 158,
        category: "Missile Weapon",
        name: "Javelins",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Range 8\"",
            "Strength User",
            "Thrown weapon: Javelins are thrown weapons and the warrior suffers no penalty for range or moving."
        ],
        turnOrderRules: [
            { name: "Range 8\"", rule: "Range 8\"", timing: "7" },
            { name: "Strength User", rule: "Strength User", timing: "7" },
            { name: "Thrown weapon", rule: "Javelins are thrown weapons and the warrior suffers no penalty for range or moving.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Amazons (Mordheim)", "Pit Fighters", "Lizardmen", "Norse Explorers"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Lizardmen": { baseCost: 10, variableCost: null }
        }
    },
    {
        id: 159,
        category: "Missile Weapon",
        name: "Javelins; Nehekharan",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Range 8\"",
            "Strength User",
            "+1 to hit: These javelins receive +1 to hit when thrown."
        ],
        turnOrderRules: [
            { name: "Range 8\"", rule: "Range 8\"", timing: "7" },
            { name: "Strength User", rule: "Strength User", timing: "7" },
            { name: "+1 to hit", rule: "+1 to hit", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Tomb Guardians"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Tomb Lord"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 30,
        category: "Missile Weapon",
        name: "Sling",
        baseCost: 2,
        variableCost: null,
        rules: [
            "Range 18\"",
            "Strength 3",
            "Fire twice at half range: A slinger may fire twice in the shooting phase if he does not move in the movement phase. He cannot shoot over half range (9\") though, if he fires twice. If the model fires twice then each shot is at -1 to hit."
        ],
        turnOrderRules: [
            { name: "Range 18\"", rule: "Range 18\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" },
            { name: "Fire twice at half range", rule: "A slinger may fire twice in the shooting phase if he does not move in the movement phase. He cannot shoot over half range (9\") though, if he fires twice. If the model fires twice then each shot is at -1 to hit.", timing: ["4", "7"] }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 484,
        category: "Missile Weapon",
        name: "Slingshot",
        baseCost: 2,
        variableCost: null,
        rules: [
            "Range 18\"",
            "Strength 2",
            "Fire twice at half range: A slinger may fire twice in the shooting phase if he does not move in the movement phase. He cannot shoot over half range (9\") though, if he fires twice. If the model fires twice then each shot is at -1 to hit."
        ],
        turnOrderRules: [
            { name: "Range 18\"", rule: "Range 18\"", timing: "7" },
            { name: "Strength 2", rule: "Strength 2", timing: "7" },
            { name: "Fire twice at half range", rule: "A slinger may fire twice in the shooting phase if he does not move in the movement phase. He cannot shoot over half range (9\") though, if he fires twice. If the model fires twice then each shot is at -1 to hit.", timing: ["4", "7"] }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Snotlings"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 160,
        category: "Missile Weapon",
        name: "Sun Gauntlet",
        baseCost: 40,
        variableCost: null,
        rules: [
            "Range 12\"",
            "Strength 4",
            "Accurate: The Sun Gauntlet does not suffer the usual -1 modifier to hit for long range.",
            "No Save: The beam from a Sun Gauntlet can literally cut through anything. A warrior wounded by a Sun Gauntlet receives no armour save whatsoever.",
            "Hand-To-Hand: The Sun Gauntlet can be used with another close combat weapon in hand-to-hand combat with Strength 4 and no armour save. Because it does not require prepared shot, this bonus attack may be used in each turn of combat."
        ],
        turnOrderRules: [
            { name: "Range 12\"", rule: "Range 12\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Accurate", rule: "The Sun Gauntlet does not suffer the usual -1 modifier to hit for long range.", timing: "7" },
            { name: "No Save", rule: "The beam from a Sun Gauntlet can literally cut through anything. A warrior wounded by a Sun Gauntlet receives no armour save whatsoever.", timing: "7" },
            { name: "Hand-To-Hand", rule: "The Sun Gauntlet can be used with another close combat weapon in hand-to-hand combat with Strength 4 and no armour save. Because it does not require prepared shot, this bonus attack may be used in each turn of combat.", timing: ["7", "9"] }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 12
        },
        restrictedWarbands: ["Amazons (Mordheim)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 161,
        category: "Missile Weapon",
        name: "Sunstaff",
        baseCost: 50,
        variableCost: null,
        rules: [
            "Range 24\"",
            "Strength 4",
            "Accurate: The Sun Gauntlet does not suffer the usual -1 modifier to hit for long range.",
            "No Save: The beam from a Sun Gauntlet can literally cut through anything. A warrior wounded by a Sun Gauntlet receives no armour save whatsoever."
        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Accurate", rule: "The Sun Gauntlet does not suffer the usual -1 modifier to hit for long range.", timing: "7" },
            { name: "No Save", rule: "The beam from a Sun Gauntlet can literally cut through anything. A warrior wounded by a Sun Gauntlet receives no armour save whatsoever.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 12
        },
        restrictedWarbands: ["Amazons (Mordheim)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 162,
        category: "Missile Weapon",
        name: "Sunstaff (Lustria)",
        baseCost: 35,
        variableCost: null,
        rules: [
            "Range 12\" and Close Combat",
            "Strength as User",
            "Sunbolt: The wielder of the sunstaff can discharge a beam of energy in the shooting phase that is akin to rays of the sun. The Sunbolt has a range of 12\" and hits at Strength 4. Aside from ward and dodge saves a Sunbolt ignores armour saves and penalties for long range."
        ],
        turnOrderRules: [
            { name: "Range 12\"", rule: "Range 12\"", timing: "7" },
            { name: "Strength as User", rule: "Strength as User", timing: "7" },
            { name: "Sunbolt", rule: "Sunbolt: The wielder of the sunstaff can discharge a beam of energy in the shooting phase that is akin to rays of the sun. The Sunbolt has a range of 12\" and hits at Strength 4. Aside from ward and dodge saves a Sunbolt ignores armour saves and penalties for long range.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Amazons (Lustria)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 9,
        category: "Missile Weapon",
        name: "Tufenk",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Range 8\" and Close Combat",
            "Strength 2",
            "Fire: If you hit roll a D6, on a 4+ your opponent is set on fire. They must roll a D6 each Recovery phase, on a 4+ they extinguish the fire or they immediately suffer a S4 hit and may only move. Friendly models may help in extinguishing the model that is ablaze. They must be in base-to-base contact and need to roll a 4+ on a D6. Against dry targets like Mummies they are Strength 3 and on a 2+ on 1D6 the Mummy catches fire.",
            "Prepare Shot: The Tufenk takes a complete turn to reload, so your model may only fire every other turn."
        ],
        turnOrderRules: [
            { name: "Range 8\"", rule: "Range 8\"", timing: "7" },
            { name: "Strength 2", rule: "Strength 2", timing: "7" },
            { name: "Fire", rule: "If you hit roll a D6, on a 4+ your opponent is set on fire. They must roll a D6 each Recovery phase, on a 4+ they extinguish the fire or they immediately suffer a S4 hit and may only move. Friendly models may help in extinguishing the model that is ablaze. They must be in base-to-base contact and need to roll a 4+ on a D6. Against dry targets like Mummies they are Strength 3 and on a 2+ on 1D6 the Mummy catches fire.", timing: "7" },
            { name: "Prepare Shot", rule: "The Tufenk takes a complete turn to reload, so your model may only fire every other turn.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 28,
        category: "Missile Weapon",
        name: "Throwing Knives/Stars",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Range 6\" and Close Combat",
            "Strength as User",
            "Thrown Weapon: Models using throwing stars or knives do not suffer penalties for range or moving as these weapons are perfectly balanced for throwing. They cannot be used in close combat."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength as User", rule: "Strength as User", timing: "7" },
            { name: "Thrown Weapon", rule: "Models using throwing stars or knives do not suffer penalties for range or moving as these weapons are perfectly balanced for throwing. They cannot be used in close combat.", timing: ["4", "7"] }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 5
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 483,
        category: "Missile Weapon",
        name: "Small Pebble",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Range 6\" and Close Combat",
            "Strength as User",
            "Thrown Weapon: Models using pebbles do not suffer penalties for range or moving as these weapons are perfectly balanced for throwing. They cannot be used in close combat.",
            "+1 Enemy Armour: Any model wounded with a Pebble gains +1 to its armour save.",
            "Easy to Find: Finding a Pebble is easy! They are free for Snotling warband members. If lost, they can easily be found for no cost. Also, Pebbles do NOT count towards the maximum number of missile weapons a warrior can carry."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength as User", rule: "Strength as User", timing: "7" },
            { name: "Thrown Weapon", rule: "Models using pebbles do not suffer penalties for range or moving as these weapons are perfectly balanced for throwing. They cannot be used in close combat.", timing: ["4", "7"] },
            { name: "+1 Enemy Armour", rule: "+1 Enemy Armour Piercing: Any model wounded with a Pebble gains +1 to its armour save.", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Snotlings"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 476,
        category: "Missile Weapon",
        name: "Sharp Stuff",
        baseCost: 3,
        variableCost: null,
        rules: [
            "Range 8\" and Close Combat",
            "Strength 2",
            "Thrown Weapon: Gnoblars throwing Sharp Stuff suffer no penalty for moving and shooting, nor for throwing over half range.",
            "No Limit: Sharp Stuff does not count towards the limit of missile weapons a Gnoblar can carry.",
            "Armour Save: All targets hit by Sharp Stuff receive +1 Armour Save.",
            "Stuff Thrower: If combined with the Shooting skill 'Knife Thrower', a Gnoblar is allowed to throw three pieces of scrap instead of the normal one. He may not throw three pieces of \"stuff\" and three knives in the same turn."
        ],
        turnOrderRules: [
            { name: "Range 8\"", rule: "Range 8\"", timing: "7" },
            { name: "Strength 2", rule: "Strength 2", timing: "7" },
            { name: "Thrown Weapon", rule: "Gnoblars throwing Sharp Stuff suffer no penalty for moving and shooting, nor for throwing over half range", timing: ["4", "7"] },
            { name: "Armour Save", rule: "All targets hit by Sharp Stuff receive +1 Armour Save.", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Gnoblar"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 465,
        category: "Missile Weapon",
        name: "Throwing Axe",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength as User",
            "Axe Thrower: All heroes armed with Throwing Axes and have access to Shooting Skills may learn the following skill, Axe Thrower.",
            "Thrown Weapon: Throwing axes suffer no penalty for throwing over half range, or for moving and shooting."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength as User", rule: "Strength as User", timing: "7" },
            { name: "Thrown Weapon", rule: "Throwing axes suffer no penalty for throwing over half range, or for moving and shooting.", timing: ["4", "7"] }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: {
            base: 5, "Dwarf Slayer Cult": "common"
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 132,
        category: "Missile Weapon",
        name: "Beast Hunter Throwing Axe",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength as User +1",
            "Throwing Axe for the Beast Hunter hired Sword"
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength as User +1", rule: "Strength as User +1", timing: "7" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Beast Hunter"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 498,
        category: "Missile Weapon",
        name: "Warpfire Thrower",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength 4",
            "Jet of Flame: Draw a line 6” long and 2\" wide. All models in its path are hit on a 4 + with no modifiers. In addition, the warpfire thrower causes fire damage (see the rules for the Brazier Iron).",
            "Unreliable: The technology of biomechanics is still pretty much in its infancy and as with most Clan Skryre experiments is neither safe nor entirely reliable! At the beginning of each turn, the Skaven player should roll a D6 to activate and work the Rat Ogre. On a roll of 2-6 everything is fine and the Rat Ogre may be moved normally. On the roll of a 1, something has gone drastically wrong - roll again on the Malfunction table. 1: Something has gone horribly wrong with the Rat Ogre's warpstone generator and it has overloaded, exploding in a bright green flash! All models within 6\" of the Rat Ogre receive a single Strength 5 hit. The Rat Ogre is completely destroyed. Do not roll for injuries after the game. 2: From now until the end of the game, the Rat Ogre is out of control. At the start of each of the Skaven player's turns, the Rat Ogre will move randomly (use the Artillery Scatter dice from Warhammer to determine the distance and direction moved) - if there are any warriors within charge range (of either side) it will charge them, otherwise it will move at full pace towards the nearest warrior. 3: The warpstone generator tizzies out and the Rat Ogre comes to a halt for the rest of the battle. It is hit automatically if engaged in close combat. 4: The Rat Ogre moves in a random direction and if it comes into contact with any warriors (of either side) it attacks and counts as charging. If it does not move into contact with any warriors but there are warriors within range of its warpfire thrower, it will fire this at them instead. 5-6: The Rat Ogre just freezes on the spot for this turn, it is hit automatically if engaged in close combat."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Jet of Flame", rule: "Draw a line 6” long and 2\" wide. All models in its path are hit on a 4 + with no modifiers. In addition, the warpfire thrower causes fire damage", timing: "7" },
            { name: "Unreliable", rule: "At the beginning of each turn, the Skaven player should roll a D6 to activate and work the Rat Ogre. On a roll of 2-6 everything Ogre may be moved normally. On the roll of a 1 - roll again on the Malfunction table. 1: All models within 6\" of the Rat Ogre receive a single Strength 5 hit. The Rat Ogre is completely destroyed. Do not roll for injuries after the game. 2: From now until the end of the game, the Rat Ogre is out of control. At the start of each of the Skaven player's turns, the Rat Ogre will move randomly (use the Artillery Scatter dice from Warhammer to determine the distance and direction moved) - if there are any warriors within charge range (of either side) it will charge them, otherwise it will move at full pace towards the nearest warrior. 3: The warpstone generator tizzies out and the Rat Ogre comes to a halt for the rest of the battle. It is hit automatically if engaged in close combat. 4: The Rat Ogre moves in a random direction and if it comes into contact with any warriors (of either side) it attacks and counts as charging. If it does not move into contact with any warriors but there are warriors within range of its warpfire thrower, it will fire this at them instead. 5-6: The Rat Ogre just freezes on the spot for this turn, it is hit automatically if engaged in close combat.", timing: "2" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Clan Skryre Rat Ogre"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 547,
        category: "Missile Weapon",
        name: "Clan Skryre Warpfire Thrower",
        baseCost: 40,
        variableCost: null,
        rules: [
            "Range 6+2d6\"",
            "Strength 4",
            "Random Range: The distance traveled by a gout of warpfire is determined randomly. When a warpfire thrower is fired, work out the range and draw a straight line from the firer up to that distance. Any models within 1” of this line will take a single S4 hit from the stream of burning warpfire.",
            "Move or Fire: You may not move and fire a warpfire thrower in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Dangerous: Warpfire throwers are notoriously unstable. If you roll a double for the distance that the warpfire travels then something has gone wrong. Roll another D6 - if the result is a 5+, then warpfire has been splattered on the crew of the machine. Resolve this as if their own weapon had hit them, instead of firing as usual.",
            "Fuel Hungry: Warpfire throwers are incredibly fuel hungry - each gout of flame uses up a substantial amount of fuel. To represent this, a warpfire thrower may only fire twice per battle. This penalty can be removed by purchasing a Warpfire Barrel."
        ],
        turnOrderRules: [
            { name: "Range 6+2d6\"", rule: "6+2d6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Random Range:", rule: "The distance traveled by a gout of warpfire is determined randomly. When a warpfire thrower is fired, work out the range and draw a straight line from the firer up to that distance. Any models within 1” of this line will take a single S4 hit from the stream of burning warpfire.", timing: "7" },
            { name: "Move or Fire", rule: "You may not move and fire a warpfire thrower in the same turn, other than to pivot on the spot to face your target or stand up.", timing: "7" },
            { name: "Dangerous", rule: "If you roll a double for the distance that the warpfire travels then something has gone wrong. Roll another D6 - if the result is a 5+, then warpfire has been splattered on the crew of the machine. Resolve this as if their own weapon had hit them, instead of firing as usual.", timing: "7" },
            { name: "Fuel Hungry", rule: "A warpfire thrower may only fire twice per battle. This penalty can be removed by purchasing a Warpfire Barrel.", timing: "7" }
        ],
        grade: "3a",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Skaven Clan Skryre"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 550,
        category: "Missile Weapon",
        name: "Poison Wind Globes",
        baseCost: 50,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength 4",
            "No Armour Save: Hits caused by poison wind globes do not permit an armour save - armour is no protection against gas!",
            "Template: When thrown, poison wind globes target an area rather than a particular person. Roll to hit as usual. If the to-hit roll is successful, anyone within 1” of the point targeted takes a S4 hit (Note that this means models up to 7\” away from the thrower can be hit - the central point of the template must be within 6”). If the to-hit roll fails, the template deviates D3” in a random direction. Deviation can carry the template further than its maximum range.",
            "Fragile: By their very nature, poison wind globes are extremely fragile. If a model carrying poison wind globes is knocked down or stunned, roll a D6. On a 1, a poison wind globe has burst. Resolve this as if a globe had been thrown at a point centred on the model carrying the globes."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "No Armour Save", rule: "Hits caused by poison wind globes do not permit an armour save", timing: "7" },
            { name: "Template", rule: "Roll to hit as usual. If the to-hit roll is successful, anyone within 1” of the point targeted takes a S4 hit (Note that this means models up to 7\” away from the thrower can be hit - the central point of the template must be within 6”). If the to-hit roll fails, the template deviates D3” in a random direction. Deviation can carry the template further than its maximum range.", timing: "7" },
            { name: "Fragile", rule: "If a model carrying poison wind globes is knocked down or stunned, roll a D6. On a 1, a poison wind globe has burst. Resolve this as if a globe had been thrown at a point centred on the model carrying the globes", timing: ["8", "9"] }
        ],
        grade: "3a",
        modifierGeneral: 0,
        rarity: {
            base: 6
        },
        restrictedWarbands: ["Skaven Clan Skryre"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    // BLACKPOWDER
    {
        id: 25,
        category: "Blackpowder",
        name: "Blunderbuss",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Range Special",
            "Strength 3",
            "Shot: When your model fires the blunderbuss, draw a line 16\" long and 1\" wide in any direction from the firer (the line must be absolutely straight). Any and all models in its path are automatically hit by a Strength 3 hit.",
            "Fire Once: It takes a very long time to load a blunderbuss so it may only be fired it once per battle."
        ],
        turnOrderRules: [
            { name: "Range 16\"", rule: "Range 16\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" },
            { name: "Fire Once", rule: "May only be fired once per battle", timing: "7" },
            { name: "Shot", rule: "Draw a line 16\" long and 1\" wide in any direction from the firer (the line must be absolutely straight). Any and all models in its path are automatically hit by a Strength 3 hit.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 9
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 20, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 163,
        category: "Blackpowder",
        name: "Blunderbuss; Chaos Dwarf",
        baseCost: 40,
        variableCost: null,
        rules: [
            "Range Special",
            "Strength 3",
            "Shot: When your model fires the blunderbuss, draw a line 16\" long and 1\" wide in any direction from the firer (the line must be absolutely straight). Any and all models in its path are automatically hit by a Strength 3 hit.",
            "Prepare Shot: A superior blunderbuss may be fired more than once per game; it takes a complete turn to reload, so you may only fire it every other turn."
        ],
        turnOrderRules: [
            { name: "Range 16\"", rule: "Range 16\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Shot", rule: "Draw a line 16\" long and 1\" wide in any direction from the firer (the line must be absolutely straight). Any and all models in its path are automatically hit by a Strength 3 hit.", timing: "7" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: {
            base: 9
        },
        restrictedWarbands: ["Black Dwarfs", "The Sons of Hashut"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 24,
        category: "Blackpowder",
        name: "Handgun",
        baseCost: 35,
        variableCost: null,
        rules: [
            "Range 24\"",
            "Strength 4",
            "Move or fire: You may not move and fire a handgun in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Save Modifier: Handguns are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A handgun takes a complete turn to reload, so you may only fire it every other turn."
        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire a handgun in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "Handguns are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 8
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 25, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 164,
        category: "Blackpowder",
        name: "Handgun; Double-barrelled",
        baseCost: 60,
        variableCost: "2D6",
        rules: [
            "Range 24\"",
            "Strength 4",
            "Move or fire: You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Save Modifier: Handguns are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A handgun takes a complete turn to reload, so you may only fire it every other turn.",
            "Double-barrelled: A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels.",
            "To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon.",
            "To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately.",
            "Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload."
        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "Handguns are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Double-barrelled", rule: "When firing such a weapon, the bearer must declare whether he is firing one or both barrels.", timing: "7" },
            { name: "Usage", rule: "1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Gunnery School of Nuln"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 45, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 165,
        category: "Blackpowder",
        name: "Handgun; Repeater",
        baseCost: 60,
        variableCost: "2D6",
        rules: [
            "Range 24\"",
            "Strength 4",
            "Move or fire: You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Save Modifier: Handguns are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Fire Thrice: The Repeater Handgun may fire up to three shots; if more than one shot is made the to hit roll is at -1. Resolve each shot individually, you may choose to shot later shots at a different target, but they must be within 3\" of the previous target. Ordinary targeting restrictions apply to shots as per Mordheim rulebook.",
            "Experimental: The Repeater Handgun is always Experimental: subject to the optional Blackpowder Weapons rules from the Mordheim rulebook, even if they are not normally used in your campaign. On any result other than “BOOM!”, the weapon has jammed or run out of loaded barrels and must be reloaded.",
            "Slow Reload: To reload a Repeater Handgun takes a Slow Reload long time and a bit of focus. The warrior must do nothing (no moving, no shooting, no fighting in close combat, etc.) for a complete turn in order to reload the weapon."
        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "Handguns are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Fire Thrice", rule: "The Repeater Handgun may fire up to three shots; if more than one shot is made the to hit roll is at -1. Resolve each shot individually, you may choose to shot later shots at a different target, but they must be within 3\" of the previous target. Ordinary targeting restrictions apply to shots as per Mordheim rulebook.", timing: "7" },
            { name: "Experimental", rule: "The Repeater Handgun is always Experimental: subject to the optional Blackpowder Weapons rules from the Mordheim rulebook, even if they are not normally used in your campaign. On any result other than “BOOM!”, the weapon has jammed or run out of loaded barrels and must be reloaded.", timing: "7" },
            { name: "Slow Reload", rule: "The warrior must do nothing (no moving, no shooting, no fighting in close combat, etc.) for a complete turn in order to reload the weapon.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 11
        },
        restrictedWarbands: ["Gunnery School of Nuln"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 50, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 166,
        category: "Blackpowder",
        name: "Hersten-Wenkler Pigeon Bombs",
        baseCost: 30,
        variableCost: "2D6",
        rules: [
            "Range Special",
            "Strength 4",
            "Move or fire: You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Explosive Radius: If the Pigeon Bomb lands on target, use the Explosive Radius rule under the Hand-Held Mortar",
            "Temperamental: When launching a pigeon bomb, do not use the BS of the warrior. Instead, roll a D6: on a 5-6, the a pigeon bomb hits its target; on a 2-4 the fuse wasn't cut properly and the pigeon explodes harmlessly in the air before reaching its target; on a result of 1, something has gone disastrously wrong and the pigeon explodes in the hero's hands… he and everyone within 1 ½” takes a S4 hit.",
            "Pigeon Roost: Once a Hero buys pigeon bombs, he has enough for the full game, and his supply gets replenished at the start of each new game."
        ],
        turnOrderRules: [
            { name: "Range Special", rule: "Range Special", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Explosive Radius", rule: "If the Pigeon Bomb lands on target, the target and any models within 1.5\” of him each take a single S4 hit from the blast", timing: "7" },
            { name: "Temperamental", rule: "When launching a pigeon bomb, do not use the BS of the warrior. Instead, roll a D6: on a 5-6, the a pigeon bomb hits its target; on a 2-4 the fuse wasn't cut properly and the pigeon explodes harmlessly in the air before reaching its target; on a result of 1, something has gone disastrously wrong and the pigeon explodes in the hero's hands… he and everyone within 1.5\" takes a S4 hit.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 8
        },
        restrictedWarbands: ["Gunnery School of Nuln"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 25, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 167,
        category: "Blackpowder",
        name: "Mortar; Hand-held",
        baseCost: 80,
        variableCost: "2D6",
        rules: [
            "Range 24\"",
            "Strength 4",
            "Move or fire: You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Prepare shot: A Hand-held Mortar takes a complete turn to reload, so you may only fire it every other turn.",
            "Save Modifier: Hand-held Mortar are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a Hand-held Mortar must take its armour save with a -2 modifier.",
            "Scatter: If the warrior misses his roll to hit, the shot will land 2D6” in a random direction (determined using a Warhammer directional die, using the “clockface method” of scattering, or whatever other method the players can agree to).",
            "Explosive Radius: After determining the final landing spot, the explosion created by the bomb will cover a small area. The target and any models within 1.5\” of him each take a single S4 hit from the blast.",
            "Experimental: The Hand-held Mortar is always Experimental: subject to the optional Blackpowder Weapons rules from the Mordheim rulebook, even if they are not normally used in your campaign. On any result other than “BOOM!”, the weapon has jammed or run out of loaded barrels and must be reloaded."

        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Prepare shot", rule: "You may only fire it every other turn.", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "A warrior wounded by this weapon must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Scatter", rule: "If the warrior misses his roll to hit, the shot will land 2D6” in a random direction (determined using a Warhammer directional die, using the “clockface method” of scattering, or whatever other method the players can agree to).", timing: "7" },
            { name: "Explosive Radius", rule: "If hit, the target and any models within 1.5\” of him each take a single S4 hit from the blast.", timing: "7" },
            { name: "Experimental", rule: "The Hand-held Mortar is always Experimental: subject to the optional Blackpowder Weapons rules from the Mordheim rulebook, even if they are not normally used in your campaign. On any result other than “BOOM!”, the weapon has jammed or run out of loaded barrels and must be reloaded.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 12
        },
        restrictedWarbands: ["Gunnery School of Nuln", "Maneaters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 70, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 26,
        category: "Blackpowder",
        name: "Pistol",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength 4",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 8,
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 10, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {
                "Moot Elder": { baseCost: 15, variableCost: null },
            },
            specificHenchmen: {}
        }
    },
    {
        id: 248,
        category: "Blackpowder",
        name: "Pistol; Brace",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength 4",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 8
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 20, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 168,
        category: "Blackpowder",
        name: "Pistol; Double-barrelled",
        baseCost: 25,
        variableCost: "D6",
        rules: [
            "Range 6\"",
            "Strength 4",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn.",
            "Double-barrelled: A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels.",
            "Double Barrelled Usage: If firing both barrels 1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload. 4. Firing a Brace: If you fire both guns and barrels at the same time, place 4 tokens down, 2 each of different colours (one for each pistol in the brace). Remove one token of each colour every turn."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Double-barrelled", rule: " When firing such a weapon, the bearer must declare whether he is firing one or both barrels.", timing: "7" },
            { name: "Double Barrelled Usage", rule: "If firing both barrels 1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload. 4. Firing a Brace: If you fire both guns and barrels at the same time, place 4 tokens down, 2 each of different colours (one for each pistol in the brace). Remove one token of each colour every turn.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 9
        },
        restrictedWarbands: ["Gunnery School of Nuln"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 20, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 121,
        category: "Blackpowder",
        name: "Pistol; Double-barrelled; Brace",
        baseCost: 46,
        variableCost: "2D6",
        rules: [
            "Range 6\"",
            "Strength 4",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn.",
            "Double-barrelled: A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels.",
            "Double Barrelled Usage: If firing both barrels 1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload. 4. Firing a Brace: If you fire both guns and barrels at the same time, place 4 tokens down, 2 each of different colours (one for each pistol in the brace). Remove one token of each colour every turn."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Double-barrelled", rule: " When firing such a weapon, the bearer must declare whether he is firing one or both barrels.", timing: "7" },
            { name: "Double Barrelled Usage", rule: "If firing both barrels 1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload. 4. Firing a Brace: If you fire both guns and barrels at the same time, place 4 tokens down, 2 each of different colours (one for each pistol in the brace). Remove one token of each colour every turn.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Gunnery School of Nuln"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 35, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 169,
        category: "Blackpowder",
        name: "Pistol; Double-barrelled Duelling",
        baseCost: 45,
        variableCost: "2D6",
        rules: [
            "Range 9\"",
            "Strength 4",
            "Accuracy: A duelling pistol is built for accuracy as a skilled duellist is able to hit a coin from twenty paces. All shots and close combat attacks from a duelling pistol have a +1 bonus to hit",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn.",
            "Double-barrelled: A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels.",
            "Double Barrelled Usage: If firing both barrels 1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload. 4. Firing a Brace: If you fire both guns and barrels at the same time, place 4 tokens down, 2 each of different colours (one for each pistol in the brace). Remove one token of each colour every turn."
        ],
        turnOrderRules: [
            { name: "Range 9\"", rule: "Range 9\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Accuracy", rule: "All shots and close combat attacks from a duelling pistol have a +1 bonus to hit", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Double-barrelled", rule: " When firing such a weapon, the bearer must declare whether he is firing one or both barrels.", timing: "7" },
            { name: "Double Barrelled Usage", rule: "If firing both barrels 1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload. 4. Firing a Brace: If you fire both guns and barrels at the same time, place 4 tokens down, 2 each of different colours (one for each pistol in the brace). Remove one token of each colour every turn.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 11
        },
        restrictedWarbands: ["Gunnery School of Nuln"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 35, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 125,
        category: "Blackpowder",
        name: "Pistol; Double-barrelled Duelling; Brace",
        baseCost: 80,
        variableCost: "4D6",
        rules: [
            "Range 9\"",
            "Strength 4",
            "Accuracy: A duelling pistol is built for accuracy as a skilled duellist is able to hit a coin from twenty paces. All shots and close combat attacks from a duelling pistol have a +1 bonus to hit",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn.",
            "Double-barrelled: A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels.",
            "Double Barrelled Usage: If firing both barrels 1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload. 4. Firing a Brace: If you fire both guns and barrels at the same time, place 4 tokens down, 2 each of different colours (one for each pistol in the brace). Remove one token of each colour every turn."
        ],
        turnOrderRules: [
            { name: "Range 9\"", rule: "Range 9\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Accuracy", rule: "All shots and close combat attacks from a duelling pistol have a +1 bonus to hit", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Double-barrelled", rule: " When firing such a weapon, the bearer must declare whether he is firing one or both barrels.", timing: "7" },
            { name: "Double Barrelled Usage", rule: "If firing both barrels 1. To hit: roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. 2. To wound: roll for each shot individually, as each shot can wound on it's own. Treat each shot that inflicts Critical Hits separately. 3. Reloading: After firing both barrels, place 2 tokens on the model. In your next shooting phase remove 1 token to represent one barrel having been reloaded. Token removal should be the last thing done in your shooting phase and you cannot shoot in the same phase as your reload. 4. Firing a Brace: If you fire both guns and barrels at the same time, place 4 tokens down, 2 each of different colours (one for each pistol in the brace). Remove one token of each colour every turn.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 12
        },
        restrictedWarbands: ["Gunnery School of Nuln"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 65, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 170,
        category: "Blackpowder",
        name: "Pistol; Double-barrelled Ostlander",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength 4",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn.",
            "Double-barrelled: A double-barrelled gun (of any sort) is treated exactly like a normal version with one exception. Any enemy is hit by two blasts rather than one (ie, a pistol causes two S4 hits rather than one for each successful hit). However, each barrel takes a full turn to reload (although if you reload only one barrel you can fire it like a normal pistol/rifle). If you own a brace of double-barreled pistols you may fire them every other round (rather than every round like a normal brace)."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Double-barrelled", rule: " Any enemy is hit by two blasts rather than one (ie, a pistol causes two S4 hits rather than one for each successful hit). However, each barrel takes a full turn to reload (although if you reload only one barrel you can fire it like a normal pistol/rifle). If you own a brace of double-barreled pistols you may fire them every other round (rather than every round like a normal brace).", timing: "7" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Ostlanders"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 170,
        category: "Blackpowder",
        name: "Pistol; Double-barrelled Ostlander; Brace",
        baseCost: 60,
        variableCost: null,
        rules: [
            "Range 6\"",
            "Strength 4",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn.",
            "Double-barrelled: A double-barrelled gun (of any sort) is treated exactly like a normal version with one exception. Any enemy is hit by two blasts rather than one (ie, a pistol causes two S4 hits rather than one for each successful hit). However, each barrel takes a full turn to reload (although if you reload only one barrel you can fire it like a normal pistol/rifle). If you own a brace of double-barreled pistols you may fire them every other round (rather than every round like a normal brace)."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Double-barrelled", rule: " Any enemy is hit by two blasts rather than one (ie, a pistol causes two S4 hits rather than one for each successful hit). However, each barrel takes a full turn to reload (although if you reload only one barrel you can fire it like a normal pistol/rifle). If you own a brace of double-barreled pistols you may fire them every other round (rather than every round like a normal brace).", timing: "7" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Ostlanders"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 27,
        category: "Blackpowder",
        name: "Pistol; Duelling",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Range 10\"",
            "Strength 4",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn.",
            "Accuracy: A duelling pistol is built for accuracy as a skilled duellist is able to hit a coin from twenty paces. All shots and close combat attacks from a duelling pistol have a +1 bonus to hit."
        ],
        turnOrderRules: [
            { name: "Range 10\"", rule: "Range 10\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Accuracy", rule: "All shots and close combat attacks from a duelling pistol have a +1 bonus to hit", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 20, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 518,
        category: "Blackpowder",
        name: "Pistol; Duelling; Brace",
        baseCost: 60,
        variableCost: null,
        rules: [
            "Range 10\"",
            "Strength 4",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn.",
            "Accuracy: A duelling pistol is built for accuracy as a skilled duellist is able to hit a coin from twenty paces. All shots and close combat attacks from a duelling pistol have a +1 bonus to hit."
        ],
        turnOrderRules: [
            { name: "Range 10\"", rule: "Range 10\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Accuracy", rule: "All shots and close combat attacks from a duelling pistol have a +1 bonus to hit", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 35, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 171,
        category: "Blackpowder",
        name: "Pistol; Repeater",
        baseCost: 30,
        variableCost: "2D6",
        rules: [
            "Range 6\"",
            "Strength 4",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a pistol must take its armour save with a -2 modifier.",
            "Fire Thrice: The Repeater Pistol may fire up to three shots; if more than one shot is made the to hit roll is at -1. Resolve each shot individually, you may choose to shot later shots at a different target, but they must be within 3\" of the previous target. Ordinary targeting restrictions apply to shots as per Mordheim rulebook.",
            "Experimental: The Repeater Pistol is always Experimental: subject to the optional Blackpowder Weapons rules from the Mordheim rulebook, even if they are not normally used in your campaign. On any result other than “BOOM!”, the weapon has jammed or run out of loaded barrels and must be reloaded.",
            "Quick Reload: The basic design of the pistol and number of barrels allows quick reloading, the pistol will always be able to fire at least one shot. After shooting more than one shot in a single turn the model must spend a complete shooting phase without shooting and without being in combat, before firing multiple shots (see Fire Thrice, above) may be taken again.",
            "Not a Club: The Repeater Pistol may be used as a normal pistol in the first round of combat. After that it doesn't count as an additional hand weapon as it is far too delicate to risk in such a crude fashion. Its owner will not willingly discard it in a fight and so must fight on without the use of an additional hand weapon."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a Pistol must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Fire Thrice", rule: "The Repeater Pistol may fire up to three shots; if more than one shot is made the to hit roll is at -1. Resolve each shot individually, you may choose to shot later shots at a different target, but they must be within 3\" of the previous target. Ordinary targeting restrictions apply to shots as per Mordheim rulebook.", timing: "7" },
            { name: "Experimental", rule: "The Repeater Pistol is always Experimental: subject to the optional Blackpowder Weapons rules from the Mordheim rulebook, even if they are not normally used in your campaign. On any result other than “BOOM!”, the weapon has jammed or run out of loaded barrels and must be reloaded.", timing: "7" },
            { name: "Quick Reload", rule: "The basic design of the pistol and number of barrels allows quick reloading, the pistol will always be able to fire at least one shot. After shooting more than one shot in a single turn the model must spend a complete shooting phase without shooting and without being in combat, before firing multiple shots (see Fire Thrice, above) may be taken again.", timing: "7" },
            { name: "Not a Club", rule: "The Repeater Pistol may be used as a normal pistol in the first round of combat. After that it doesn't count as an additional hand weapon as it is far too delicate to risk in such a crude fashion. Its owner will not willingly discard it in a fight and so must fight on without the use of an additional hand weapon.", timing: "9" },
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 9
        },
        restrictedWarbands: ["Gunnery School of Nuln"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Gunnery School of Nuln": { baseCost: 25, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 473,
        category: "Blackpowder",
        name: "Pistol; Repeater (Masters Of Horror)",
        baseCost: 25,
        variableCost: "3D6",
        rules: [
            "Range 8\"",
            "Strength 4",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a pistol must take its armour save with a -2 modifier.",
            "Repeater: The Repeater Pistol has the possibility of firing more than once during the Shooting phase. For each additional shot, you must roll a D6 at -1 on the above table. For example, for one shot, you must roll a 4+, with a roll of a 1 forcing a roll on the Misfire Table. For a second shot, you need a 5+, with a roll of 1-2 forcing a roll on the misfire table. Of course, it is impossible to attempt more than 3 shots per round.",
            "Too Much Tinkering: The Repeater Pistol is a heavily modified weapon. To represent its unstable mechanics, each time the trigger is pulled, you must roll a D6. On a roll of 4+, the pistol works fine. On a roll of 2-3, the pistol does nothing. One a roll of 1, roll on the \"Misfire\" Chart."
        ],
        turnOrderRules: [
            { name: "Range 6\"", rule: "Range 6\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a Pistol must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Repeater", rule: "For each additional shot, you must roll a D6 at -1 on the above table. For example, for one shot, you must roll a 4+, with a roll of a 1 forcing a roll on the Misfire Table. For a second shot, you need a 5+, with a roll of 1-2 forcing a roll on the misfire table. Of course, it is impossible to attempt more than 3 shots per round.", timing: "7" },
            { name: "Too Much Tinkering", rule: "Each time the trigger is pulled, you must roll a D6. On a roll of 4+, the pistol works fine. On a roll of 2-3, the pistol does nothing. One a roll of 1, roll on the \"Misfire\" Chart.", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Masters Of Horror"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 172,
        category: "Blackpowder",
        name: "Pistol; Warplock",
        baseCost: 35,
        variableCost: null,
        rules: [
            "Range 8\"",
            "Strength 5",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 5 with a -3 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 5 and with a -3 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 5 suggests. A warrior wounded by a handgun must take its armour save with a -3 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn."
        ],
        turnOrderRules: [
            { name: "Range 8\"", rule: "Range 8\"", timing: "7" },
            { name: "Strength 5", rule: "Strength 5", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 5 with a -3 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 5 and with a -3 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 5 suggests. A warrior wounded by a handgun must take its armour save with a -3 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 11
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Skaven"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 545,
        category: "Blackpowder",
        name: "Warplock Jezzail",
        baseCost: 100,
        variableCost: null,
        rules: [
            "Range 36\"",
            "Strength 5",
            "Move of Fire: You may not move and fire a warplock jezzail in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Save Modifier: This weapon is even better at penetrating armour than their Strength 5 suggests. A warrior wounded by it must take its armour save with a -3 modifier.",
            "Prepare Shot: Weapon takes a complete turn to reload, so you may only fire it every other turn.",
            "Difficult to Use: In order to get the range and punch needed for jezzails to be so useful, they are long and unwieldy pieces of equipment. To represent this, all shots fired from a jezzail are at -2 to hit. Purchasing a separate support, which is used by a second Initiate or Apprentice, can alleviate this penalty."
        ],
        turnOrderRules: [
            { name: "Range 36\"", rule: "Range 36\"", timing: "7" },
            { name: "Strength 5", rule: "Strength 5", timing: "7" },
            { name: "Move of Fire", rule: "You may not move and fire a warplock jezzail in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "A warrior wounded by this weapon must take its armour save with a -3 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Difficult to Use", rule: "All shots fired from a jezzail are at -2 to hit. Purchasing a separate support, which is used by a second Initiate or Apprentice, can alleviate this penalty.", timing: "7" }
        ],
        grade: "3a",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Skaven Clan Skryre"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 506,
        category: "Blackpowder",
        name: "Pistol; Warplock; Brace",
        baseCost: 70,
        variableCost: null,
        rules: [
            "Range 8\"",
            "Strength 5",
            "Hand-to-hand: Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 5 with a -3 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 5 and with a -3 save modifier, regardless of the firer's Strength.",
            "Save Modifier: Pistols are even better at penetrating armour than their Strength 5 suggests. A warrior wounded by a handgun must take its armour save with a -3 modifier.",
            "Prepare Shot: Prepare shot: A Pistol takes a complete turn to reload, so you may only fire it every other turn."
        ],
        turnOrderRules: [
            { name: "Range 8\"", rule: "Range 8\"", timing: "7" },
            { name: "Strength 5", rule: "Strength 5", timing: "7" },
            { name: "Hand-to-hand", rule: "A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 5 with a -3 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 5 and with a -3 save modifier, regardless of the firer's Strength.", timing: "9" },
            { name: "Save Modifier", rule: "Pistols are even better at penetrating armour than their Strength 5 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 11
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Skaven"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 173,
        category: "Blackpowder",
        name: "Rifle; Hunting",
        baseCost: 200,
        variableCost: null,
        rules: [
            "Range 48\"",
            "Strength 4",
            "Move or fire: You may not move and fire a rifle in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Save Modifier: Rifles are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A rfile takes a complete turn to reload, so you may only fire it every other turn.",
            "Pick target: A model armed with a rifle can target any enemy model in sight, not just the closest one."
        ],
        turnOrderRules: [
            { name: "Range 48\"", rule: "Range 48\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire a rifle in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "Rifles are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Pick target", rule: "A model armed with a rifle can target any enemy model in sight, not just the closest one.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: {
            base: 11
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 174,
        category: "Blackpowder",
        name: "Rifle; Ostlander Double-barrelled Hunting",
        baseCost: 300,
        variableCost: null,
        rules: [
            "Range 48\"",
            "Strength 4",
            "Move or fire: You may not move and fire a rifle in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Save Modifier: Rifles are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A rfile takes a complete turn to reload, so you may only fire it every other turn.",
            "Pick target: A model armed with a rifle can target any enemy model in sight, not just the closest one.",
            "Double Barrelled: A double-barrelled gun (of any sort) is treated exactly like a normal version with one exception. Any enemy is hit by two blasts rather than one (ie, a pistol causes two S4 hits rather than one for each successful hit). However, each barrel takes a full turn to reload (although if you reload only one barrel you can fire it like a normal pistol/rifle)."
        ],
        turnOrderRules: [
            { name: "Range 48\"", rule: "Range 48\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire a rifle in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "Rifles are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Pick target", rule: "A model armed with a rifle can target any enemy model in sight, not just the closest one.", timing: "7" },
            { name: "Double Barrelled", rule: "Any enemy is hit by two blasts rather than one. However, each barrel takes a full turn to reload (although if you reload only one barrel you can fire it like a normal pistol/rifle).", timing: "7" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: {
            base: 12
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 175,
        category: "Blackpowder",
        name: "Swivel Gun",
        baseCost: 65,
        variableCost: null,
        rules: [
            "Max One Per Warband",
            "Prepare shot: Takes a complete turn to reload, so you may only fire it every other turn.",
            "Move or fire: You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Cumbersome: The user is at –1 Initiative and –1 Movement throughout the battle. Also, Swivel Guns may never be fired twice per turn, or fired if the user moved, no matter what Skills the user may have.",
            "Blackpowder Rules: The normally optional rules for Blackpowder weapons are always in effect for Swivel Guns, due to unpredictable nature of the local materials used in their construction.",
            "Special Ammunition: Swivel Guns use nonstandard ammunition types, which must be bought for each game. Each type only lasts one game, so if it is used in a game it cannot be used again until another supply is bought. Before firing, the Gunner must declare which type is being used, if he has more than one type available in the game.",
            "Ball Shot: Range 36\" Strength 5, Armour Save -2, Concussion: The impact of the heavy lead projectile is enough to rattle even the hardiest warrior. Treat any resulting Injury Rolls of 2-4 as a Stunned result.",
            "Chain Shot: Range 24\" Strength 4, Armour Save -1, All Wrapped Up: Enemy hit by Chain Shot which are not wounded are Knocked Down on a roll of 4+, even if they normally can never be Knocked Down.",
            "Grape Shot: Range 24\" Strength 3, It's Everywhere!:  If a hit is scored, D6 other enemy models within 4\" of the target and also in Line of Sight will automatically take a single hit. If the original target was in the open, no hits can be applied to models in cover though (only if the original target was in cover can hits go to models in cover as well). The closest enemy model to the target must take the first hit, then the next closest, and so on. Models in Hiding will also count towards being close to the target, and can be hit as well. There is no Armour Save modifier from Grape Shot hits. Pirates know to duck out of the way when they hear a Swivel Gun going off, and thus are never hit by friendly Grape Shot.",
        ],
        turnOrderRules: [
            { name: "Cumbersome", rule: "The user is at –1 Initiative and –1 Movement throughout the battle. Also, Swivel Guns may never be fired twice per turn, or fired if the user moved, no matter what Skills the user may have.", timing: "7" },
            { name: "Prepare shot", rule: "May only fire it every other turn", timing: "7" },
            { name: "Move or fire", rule: "You may not move and fire in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Blackpowder Rules", rule: "The normally optional rules for Blackpowder weapons are always in effect for Swivel Guns, due to unpredictable nature of the local materials used in their construction.", timing: "7" },
            { name: "Ball Shot", rule: "Range 36\" Strength 5, Armour Save -2, Concussion: The impact of the heavy lead projectile is enough to rattle even the hardiest warrior. Treat any resulting Injury Rolls of 2-4 as a Stunned result.", timing: "7" },
            { name: "Chain Shot", rule: "Range 24\" Strength 4, Armour Save -1, All Wrapped Up: Enemy hit by Chain Shot which are not wounded are Knocked Down on a roll of 4+, even if they normally can never be Knocked Down.", timing: "7" },
            { name: "Grape Shot", rule: "Range 24\" Strength 3, It's Everywhere!:  If a hit is scored, D6 other enemy models within 4\" of the target and also in Line of Sight will automatically take a single hit. If the original target was in the open, no hits can be applied to models in cover though (only if the original target was in cover can hits go to models in cover as well). The closest enemy model to the target must take the first hit, then the next closest, and so on. Models in Hiding will also count towards being close to the target, and can be hit as well. There is no Armour Save modifier from Grape Shot hits. Pirates know to duck out of the way when they hear a Swivel Gun going off, and thus are never hit by friendly Grape Shot.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 8
        },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        allowedSpecificHenchmen: ["Gunners"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 252,
        category: "Blackpowder",
        name: "Ball Shot",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Ball Shot: Range 36\" Strength 5, Armour Save -2, Concussion: The impact of the heavy lead projectile is enough to rattle even the hardiest warrior. Treat any resulting Injury Rolls of 2-4 as a Stunned result."
        ],
        turnOrderRules: [
            { name: "Ball Shot", rule: "Range 36\" Strength 5, Armour Save -2, Concussion: The impact of the heavy lead projectile is enough to rattle even the hardiest warrior. Treat any resulting Injury Rolls of 2-4 as a Stunned result.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        allowedSpecificHenchmen: ["Gunners"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 253,
        category: "Blackpowder",
        name: "Chain Shot",
        baseCost: 2,
        variableCost: null,
        rules: [
            "Chain Shot: Range 24\" Strength 4, Armour Save -1, All Wrapped Up: Enemy hit by Chain Shot which are not wounded are Knocked Down on a roll of 4+, even if they normally can never be Knocked Down."
        ],
        turnOrderRules: [
            { name: "Chain Shot", rule: "Range 24\" Strength 4, Armour Save -1, All Wrapped Up: Enemy hit by Chain Shot which are not wounded are Knocked Down on a roll of 4+, even if they normally can never be Knocked Down.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        allowedSpecificHenchmen: ["Gunners"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 254,
        category: "Blackpowder",
        name: "Grape Shot",
        baseCost: 2,
        variableCost: null,
        rules: [
            "Grape Shot: Range 24\" Strength 3, It's Everywhere!:  If a hit is scored, D6 other enemy models within 4\" of the target and also in Line of Sight will automatically take a single hit. If the original target was in the open, no hits can be applied to models in cover though (only if the original target was in cover can hits go to models in cover as well). The closest enemy model to the target must take the first hit, then the next closest, and so on. Models in Hiding will also count towards being close to the target, and can be hit as well. There is no Armour Save modifier from Grape Shot hits. Pirates know to duck out of the way when they hear a Swivel Gun going off, and thus are never hit by friendly Grape Shot.",
        ],
        turnOrderRules: [
            { name: "Grape Shot", rule: "Range 24\" Strength 3, It's Everywhere!:  If a hit is scored, D6 other enemy models within 4\" of the target and also in Line of Sight will automatically take a single hit. If the original target was in the open, no hits can be applied to models in cover though (only if the original target was in cover can hits go to models in cover as well). The closest enemy model to the target must take the first hit, then the next closest, and so on. Models in Hiding will also count towards being close to the target, and can be hit as well. There is no Armour Save modifier from Grape Shot hits. Pirates know to duck out of the way when they hear a Swivel Gun going off, and thus are never hit by friendly Grape Shot.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        allowedSpecificHenchmen: ["Gunners"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    // MISCELLANEOUS
    {
        id: 49,
        category: "Miscellaneous Gear",
        name: "Amulet of the Moon",
        baseCost: 50,
        variableCost: null,
        rules: "Any missile fire directed at a model equipped with the amulet suffers a penalty of -1 to hit. The amulet also confers a special save of 5+ against missile fire.",
        turnOrderRules: [
            { name: "Ranged -1 To Hit", rule: "-1 to hit vs when shot at", timing: "8" },
            { name: "5+ Save", rule: "Special 5+ save vs missile fire", timing: "8" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 12, "Amazons (Lustria)": 11 },
        restrictedWarbands: ["Amazons (Lustria)", "Amazons (Mordheim)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 546,
        category: "Miscellaneous Gear",
        name: "Jezzail Support",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Steady Jezzail: When a warrior with a jezzail support is in base contact with warrior armed with a jezzail in the shooting phase, the warrior firing the jezzail does not suffer the usual penalties from the difficult to use special rule.",
            "May Not Shoot: When using a jezzail support, a warrior may not fire any other shooting weapons in his possession. All his strength is focussed on holding the support steady"

        ],
        turnOrderRules: [
            { name: "Steady Jezzail", rule: "When a warrior with a jezzail support is in base contact with warrior armed with a jezzail in the shooting phase, the warrior firing the jezzail does not suffer the usual penalties from the difficult to use special rule.", timing: "7" },
            { name: "May Not Shoot", rule: "When using a jezzail support, a warrior may not fire any other shooting weapons in his possession.", timing: "7" }
        ],
        grade: "3a",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Skaven Clan Skryre"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 548,
        category: "Miscellaneous Gear",
        name: "Warpfire Barrel",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Store Fuel: If a warrior with a warpfire barrel is in base contact with a warrior armed with a warpfire thrower in the shooting phase, the warrior with the warpfire thrower does not suffer the normal penalties from the fuel hungry special rule. (This means the warpfire thrower is no longer restricted to two shots per battle)",
            "Must Remain in Base Contact: In order for the warpfire barrel to be any use, the warrior carrying the barrel must be in base contact with the model holding the warpfire thrower. If for any reason the model carrying the barrel is killed, the warpfire thrower it is attached to will only be able to fire two more times before running out of fuel.<br><br>Note that if a warpfire thrower carrier is killed, the Skaven with warpfire barrel may separate and join a different warpfire thrower armed model. There is no benefit from having more warpfire barrels than warpfire throwers (apart from the decreased likelihood of running out of fuel!).",
            "Unstable: Warpfire is notoriously unstable, and a large amount of it sloshing about in a barrel is decidedly dangerous. A model carrying a barrel may not move further than 5” per turn - i.e. he may not run and can only charge up to his normal movement.<br><br>If for any reason the model is forced to move faster than this, roll a D6. On a 1, the barrel bursts, and warpfire goes everywhere. Every model (including the barrel bearer) within D3+1” takes a S4 hit. This may not be done deliberately - no suicide rats!<br><br>Similarly, if a model carrying a fuel barrel suffers a critical hit in close combat, roll a D6. On a 5+, the barrel explodes with the same effect as indicated above. Once damage for the explosion has been worked out, the critical hit is resolved as usual."
        ],
        turnOrderRules: [
            { name: "Store Fuel", rule: "warpfire thrower is no longer restricted to two shots per battle", timing: "7" },
            { name: "Must Remain in Base Contact", rule: "In order for the warpfire barrel to be any use, the warrior carrying the barrel must be in base contact with the model holding the warpfire thrower", timing: "7" },
            { name: "Unstable", rule: "A model carrying a barrel may not move further than 5” per turn - i.e. he may not run and can only charge up to his normal movement.<br><br>If for any reason the model is forced to move faster than this, roll a D6. On a 1, the barrel bursts, and warpfire goes everywhere. Every model (including the barrel bearer) within D3+1” takes a S4 hit. This may not be done deliberately - no suicide rats!<br><br>Similarly, if a model carrying a fuel barrel suffers a critical hit in close combat, roll a D6. On a 5+, the barrel explodes with the same effect as indicated above. Once damage for the explosion has been worked out, the critical hit is resolved as usual.", timing: ["8", "9"] }
        ],
        grade: "3a",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Skaven Clan Skryre"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 551,
        category: "Miscellaneous Gear",
        name: "Warpstone Shard",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Casting: If a Warlock Engineer (and only a Warlock Engineer - warpstone is too valuable to give to apprentices) swallows a shard of warpstone before casting a spell, the difficulty of the spell will be reduced by two for that casting only. This is a one use only item.",
            "Side Effects: Warpstone has a powerful corrupting influence on anyone who maintains contact with it. Though Warlock Engineers are somewhat hardened, swallowing a chunk can be quite dangerous. Immediately after a warpstone shard is used, roll a D6. On a 4+ the Warlock Engineer is stunned. Note that the effects of the spell are worked out before you determine whether or not the Engineer becomes stunned."
        ],
        turnOrderRules: [
            { name: "Casting", rule: "The difficulty of the spell will be reduced by two for that casting only. This is a one use only item.", timing: "7" },
            { name: "Side Effects", rule: "Immediately after a warpstone shard is used, roll a D6. On a 4+ the Warlock Engineer is stunned. Note that the effects of the spell are worked out before you determine whether or not the Engineer becomes stunned.", timing: "7" }
        ],
        grade: "3a",
        modifierGeneral: 0,
        rarity: {
            base: 10
        },
        restrictedWarbands: ["Skaven Clan Skryre"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 552,
        category: "Miscellaneous Gear",
        name: "Skavenbrew",
        baseCost: 25,
        variableCost: "2d6",
        rules: [
            "Drug: Skavenbrew is a drug. Each batch can be given to a single warrior, and its effects last for a single game. When giving it to a warrior (this must be a hero - henchmen are not deemed worthy of skavenbrew), roll on the following table to determine the results: 1-2: The brew has no effect, 3-4: The model hates all non-Skaven and is affected by the psychology rules for hatred for the next battle, 5-6: The model enters a killing fury and is affected by the psychology rules for frenzy for the next battle.",
            "Side Effects: After a game in which a warrior has used skavenbrew, roll 2D6. On a roll of 2-3, the model loses a point of Initiative permanently. If this would reduce Initiative to 2 or below, the model suffers from stupidity instead. Note that you do not need to make this roll if the skavenbrew had no effect.",
            "Test Subject: In order to improve the chances of skavenbrew being exactly right, Warlock Engineers may opt to test it out on a slave. This is, after all, what the slaves are used for. If you choose to do this, roll a D6. If a 6 is rolled, there is no effect on the slave. Otherwise, immediately remove the slave from your roster (he is considered dead - the tests often go wrong!). Regardless of the roll’s result, you may now add +1 or -1 to the D6 roll for the effect of skavenbrew."
        ],
        turnOrderRules: [
            { name: "Drug", rule: "When giving it to a warrior (this must be a hero - henchmen are not deemed worthy of skavenbrew), roll on the following table to determine the results: 1-2: The brew has no effect, 3-4: The model hates all non-Skaven and is affected by the psychology rules for hatred for the next battle, 5-6: The model enters a killing fury and is affected by the psychology rules for frenzy for the next battle.", timing: "1" },
            { name: "Side Effects", rule: "Roll 2D6. On a roll of 2-3, the model loses a point of Initiative permanently. If this would reduce Initiative to 2 or below, the model suffers from stupidity instead. Note that you do not need to make this roll if the skavenbrew had no effect.", timing: "13" },
            { name: "Test Subject", rule: "If you choose to do this, roll a D6. If a 6 is rolled, there is no effect on the slave. Otherwise, immediately remove the slave from your roster (he is considered dead - the tests often go wrong!). Regardless of the roll’s result, you may now add +1 or -1 to the D6 roll for the effect of skavenbrew.", timing: "1" }
        ],
        grade: "3a",
        modifierGeneral: 0,
        rarity: {
            base: 6
        },
        restrictedWarbands: ["Skaven Clan Skryre"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 176,
        category: "Miscellaneous Gear",
        name: "Asp Arrows",
        baseCost: 10,
        variableCost: null,
        rules: "+1 to hit.",
        turnOrderRules: [
            { name: "+1 To Hit", rule: "+1 To Hit", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Tomb Guardians"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Tomb Lord"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 47,
        category: "Miscellaneous Gear",
        name: "Banner",
        baseCost: 10,
        variableCost: null,
        rules: "A banner requires one hand to use and can be carried by any Hero in the warband. Friendly warriors within 12\" of the banner bearer may re-roll any failed 'All Alone' test; but remember, you can't re-roll a failed re-roll.",
        turnOrderRules: [
            { name: "Banner", rule: "Friendly warriors within 12\" of the banner bearer may re-roll any failed 'All Alone' test; but remember, you can't re-roll a failed re-roll.", timing: "2" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 5 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 539,
        category: "Miscellaneous Gear",
        name: "Enchanted Acorns",
        baseCost: 60,
        variableCost: "3d6",
        rules: "After locating/purchasing, roll to determine how many acorns are acquired (D3+1 acorns.) When a hero has to roll on the Serious Injury Chart and the roll result is 11-35, the hero may \“consume\” one, and only one, acorn to re-roll the first die (i.e. If a result of 14 is rolled, and the hero has at least one enchanted acorn, then the player mayre-roll the \“1\”). The second roll result must be accepted, and cannot be re-rolled again. The player should then note that an acorn has been used and remove it from the hero’s equipment",
        turnOrderRules: [
            { name: "Enchanted Acorns", rule: "When a hero has to roll on the Serious Injury Chart and the roll result is 11-35, the hero may \“consume\” one, and only one, acorn to re-roll the first die (i.e. If a result of 14 is rolled, and the hero has at least one enchanted acorn, then the player mayre-roll the \“1\”). The second roll result must be accepted, and cannot be re-rolled again. The player should then note that an acorn has been used and remove it from the hero’s equipment", timing: "13" }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Asrai Wayfarer": { baseCost: 50, variableCost: null }
        }
    },
    {
        id: 444,
        category: "Miscellaneous Gear",
        name: "Banner of the Noble House",
        baseCost: 30,
        variableCost: null,
        rules: "The pride of holding the banner and never abandoning it to the enemy boosts the Leadership of the model by 1, and can increase the Ld of the character carrying it to a maximum of 10. The model carrying the banner must use one of his hands to hold it aloft, and cannot carry a shield, buckler, double-handed weapon or additional weapon.",
        turnOrderRules: [
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: { base: 10 },
        characteristicModifiers: { LD: 1 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 50,
        category: "Miscellaneous Gear",
        name: "Bear-Claw Necklace",
        baseCost: 75,
        variableCost: "3D6",
        rules: "A warrior wearing a bearclaw necklace receives some of the strength and wild ferocity of the bear it came from. A warrior wearing a bear-claw necklace becomes subject to Frenzy.",
        turnOrderRules: [
            { name: "Frenzy", rule: "Must charge if enemy within range. Fight with double Attacks in combat. Immune to other psychology while within charge range. Loses frenzy if knocked down or stunned.", timing: ["4", "9"] }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Kislevites"],
        restrictedHeroTypes: ["Henchman"],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 177,
        category: "Miscellaneous Gear",
        name: "Blessed Water",
        baseCost: 10,
        variableCost: "3D6",
        rules: "A vial of blessed water contains enough liquid for just one use, and has a thrown range of twice the thrower's Strength in inches. Roll to hit using the model's BS. No modifiers for range or moving apply. Blessed water causes 1 wound on Undead, Daemon or Possessed models automatically. There is no armour save. Undead or Possessed models may not use blessed water.",
        turnOrderRules: [
            { name: "Blessed Water", rule: "Just one use, and has a thrown range of twice the thrower's Strength in inches. Roll to hit using the model's BS. No modifiers for range or moving apply. Blessed water causes 1 wound on Undead, Daemon or Possessed models automatically. There is no armour save. Undead or Possessed models may not use blessed water.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 6, "Sisters of Sigmar": "common", "Protectorate of Sigmar": "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 424,
        category: "Miscellaneous Gear",
        name: "Blessed Water",
        baseCost: 15,
        variableCost: null,
        rules: "Cause Fear",
        turnOrderRules: [
            { name: "Cause Fear", rule: "Cause Fear", timing: ["5", "9"] }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        allowedSpecificHeroes: ["Saurus Slayer"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 178,
        category: "Miscellaneous Gear",
        name: "Book of the Dead",
        baseCost: 200,
        variableCost: "D6x25",
        rules: "A Vampire can learn Necromantic magic with the Arcane Lore skill and this book and a Necromancer will gain a new spell permanently.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Necromancer", "Vampire"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 475,
        category: "Miscellaneous Gear",
        name: "Damned Book",
        baseCost: 43,
        variableCost: "3d6",
        rules: "Cursed Aura: A model bearing the Damned Book causes all enemy models within 2 inches to suffer a -1 penalty to hit in close combat.",
        turnOrderRules: [
            { name: "Cursed Aura", rule: "A model bearing the Damned Book causes all enemy models within 2 inches to suffer a -1 penalty to hit in close combat.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 492,
        category: "Miscellaneous Gear",
        name: "Black Gold Wristbands",
        baseCost: 35,
        variableCost: "2d6",
        rules: [
            "Quickened: A model wearing Black Gold Wristbands gains a 6+ save against all missile-fire, including magical. This ability will stack with the Dodge skill."
        ],
        turnOrderRules: [
            { name: "Quickened", rule: "A model wearing Black Gold Wristbands gains a 6+ save against all missile-fire, including magical. This ability will stack with the Dodge skill", timing: "8" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 493,
        category: "Miscellaneous Gear",
        name: "Ring of Strigos",
        baseCost: 20,
        variableCost: "1d6",
        rules: [
            "Arcane Barrier: A model wearing a Ring of Strigos gains a 6+ save versus all spells that they are a target of, or find themselves affect by."
        ],
        turnOrderRules: [
            { name: "Arcane Barrier", rule: "A model wearing a Ring of Strigos gains a 6+ save versus all spells that they are a target of, or find themselves affect by.", timing: "8" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 494,
        category: "Miscellaneous Gear",
        name: "Cursed Book",
        baseCost: 50,
        variableCost: "3d6",
        rules: [
            "Cursed Aura: A model bearing the Cursed Book causes all enemy models within 2\" to suffer a -1 penalty to hit in close combat."
        ],
        turnOrderRules: [
            { name: "Cursed Aura", rule: "A model bearing the Cursed Book causes all enemy models within 2\" to suffer a -1 penalty to hit in close combat.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 64,
        category: "Miscellaneous Gear",
        name: "Bota Bag",
        baseCost: 5,
        variableCost: "2D6",
        rules: "Like a wine skin it allows the owner to carry one more water unit than normal. Each character may only take one Bota Bag.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 52,
        category: "Miscellaneous Gear",
        name: "Caltrops",
        baseCost: 15,
        variableCost: "2D6",
        rules: "There are enough caltrops to last for one use only. They may be used when an opponent decides to charge. The defender simply throws the caltrops into the path of his attacker and they reduce his charge range by D6 inches. If this means that the attacker cannot reach his target then it is a failed charge.",
        turnOrderRules: [
            { name: "Caltrops", rule: "There are enough caltrops to last for one use only. They may be used when an opponent decides to charge. The defender simply throws the caltrops into the path of his attacker and they reduce his charge range by D6 inches. If this means that the attacker cannot reach his target then it is a failed charge.", timing: "5" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 6 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 53,
        category: "Miscellaneous Gear",
        name: "Cathayan Silk Clothes",
        baseCost: 50,
        variableCost: "2D6",
        rules: "Any Mercenary warband whose leader is wearing silk clothes may re-roll the first failed Rout test. However, after each battle in which the leader is taken out of action, roll a D6. On a roll of 1-3 the clothes are ruined and must be discarded.",
        turnOrderRules: [
            { name: "Rout Test Re-roll", rule: "Any Mercenary warband whose leader is wearing silk clothes may re-roll the first failed Rout test. However, after each battle in which the leader is taken out of action, roll a D6. On a roll of 1-3 the clothes are ruined and must be discarded.", timing: ["2", "13"] }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 83,
        category: "Miscellaneous Gear",
        name: "Chest",
        baseCost: 5,
        variableCost: null,
        rules: "Cumbersome: A chest must be carried by two models. The carriers must remain in base contact with the chest or it is dropped. They may not use ranged weapons or attack in combat.",
        turnOrderRules: [
            { name: "Cumbersome Chest", rule: "A chest must be carried by two models. The carriers must remain in base contact with the chest or it is dropped. They may not use ranged weapons or attack in combat.", timing: ["7", "9"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 179,
        category: "Miscellaneous Gear",
        name: "Clan Pestilens Banner",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Only One Banner Per Warband",
            "A model within 12\" of the standard bearer of the band, usually a Plague Monk or a Monk Initiate, may reroll once every failed all alone test. The staff of the Clan Pestilens banner counts as a two-handed weapon. A warband may have a single Clan Pestilens banner at any one time. (Clan Pestilens members use this item instead of the normal Banner)."
        ],
        turnOrderRules: [
            { name: "All Alone Re-Roll", rule: "A model within 12\" of the standard bearer of the band, usually a Plague Monk or a Monk Initiate, may reroll once every failed all alone test. The staff of the Clan Pestilens banner counts as a two-handed weapon. A warband may have a single Clan Pestilens banner at any one time. (Clan Pestilens members use this item instead of the normal Banner).", timing: "2" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 5 },
        restrictedWarbands: ["Skaven of Clan Pestilens"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 180,
        category: "Miscellaneous Gear",
        name: "Compass",
        baseCost: 45,
        variableCost: "2D6",
        rules: "In any scenarios where players roll to see which side deploys first, then his warband may re-roll their result. This can only be done if the pirate with the compass is not missing the game though! Note that only one re-roll is allowed, even If multiple pirates have a Compass, and if both sides have one then no re-rolls are allowed.",
        turnOrderRules: [
            { name: "Deployment Re-roll", rule: "In any scenarios where players roll to see which side deploys first, then his warband may re-roll their result. This can only be done if the pirate with the compass is not missing the game though! Note that only one re-roll is allowed, even If multiple pirates have a Compass, and if both sides have one then no re-rolls are allowed.", timing: "1" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 181,
        category: "Miscellaneous Gear",
        name: "Conch Shell Horn",
        baseCost: 25,
        variableCost: null,
        rules: "At the beginning of the game a Piranha warrior may use the horn to re-roll when deciding who deploys first and who goes first. Multiple models that have the horn cannot force a second re-roll.",
        turnOrderRules: [
            { name: "Deployment Re-roll", rule: "At the beginning of the game a Piranha warrior may use the horn to re-roll when deciding who deploys first and who goes first. Multiple models that have the horn cannot force a second re-roll.", timing: "1" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Amazons (Lustria)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Piranha Warriors"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 90,
        category: "Miscellaneous Gear",
        name: "Elven Boots",
        baseCost: 75,
        variableCost: "D6x10",
        rules: "Elven boots increase the wearer's move characteristic by +1. This can take a warrior's move value above its maximum.",
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        characteristicModifiers: { M: 1 },
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 54,
        category: "Miscellaneous Gear",
        name: "Elven Runestones",
        baseCost: 50,
        variableCost: "2D6",
        rules: "A mage with Elven Runestones may use them to attempt to dispel a spell that has been successfully cast against himself or another member of his warband. To dispel such a spell, the mage must roll against the spell's Difficulty (Sorcery does not help here). If he succeeds, the spell fails to work. If the roll fails, the spell works normally",
        turnOrderRules: [
            { name: "Dispell Magic", rule: "A mage with Elven Runestones may use them to attempt to dispel a spell that has been successfully cast against himself or another member of his warband. To dispel such a spell, the mage must roll against the spell's Difficulty (Sorcery does not help here). If he succeeds, the spell fails to work. If the roll fails, the spell works normally", timing: "8" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Shadow Weaver"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 182,
        category: "Miscellaneous Gear",
        name: "Enchanted Skins",
        baseCost: 20,
        variableCost: null,
        rules: "Any model wearing Skins and Charms receives a 6+ special save versus any wounds inflicted. In addition, the wearer of Skins and Charms is unaffected by enemy magic on a roll of 5+.",
        turnOrderRules: [
            { name: "Special Save", rule: "Any model wearing Skins and Charms receives a 6+ special save versus any wounds inflicted. In addition, the wearer of Skins and Charms is unaffected by enemy magic on a roll of 5+.", timing: ["8", "9"] }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 6 },
        restrictedWarbands: ["Amazons (Lustria)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 55,
        category: "Miscellaneous Gear",
        name: "Familiar",
        baseCost: 20,
        variableCost: "D6",
        rules: [
            "Gold is spent even on unsuccessful rare roll",
            "Only Casters may attempt to find",
            "See Rule book for full details",
            "A wizard with a familiar is allowed to re-roll one failed roll to cast a spell each turn. The result of this re-roll must be accepted, even if it fails, and remember that you may never reroll a re-roll. Spell-users only (does not include users of Prayers). "
        ],
        turnOrderRules: [
            { name: "Familiar", rule: "A wizard with a familiar is allowed to re-roll one failed roll to cast a spell each turn. The result of this re-roll must be accepted, even if it fails, and remember that you may never reroll a re-roll. Spell-users only (does not include users of Prayers).", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 542,
        category: "Miscellaneous Gear",
        name: "Forest Familiar",
        baseCost: 20,
        variableCost: null,
        rules: [
            "The forest familiar will grant Wild Hunter an additional 2\” to his spotting distance to detect hidden enemies",
            "***Once per game, the fortunate presence of the forest familiar may allow any model within 6\” of the Wild.. ADMIN NOTE THE REST OF THIS SENTENCE WAS NOT IN THE PDF***"
        ],
        turnOrderRules: [
            { name: "Forest Familiar", rule: "The forest familiar will grant Wild Hunter an additional 2\” to his spotting distance to detect hidden enemies", timing: "4" }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        allowedSpecificHeroes: ["Wild Hunter"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 543,
        category: "Miscellaneous Gear",
        name: "Falcon",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Falcons allow you to modify one die roll by -1/+1 made during the Exploration Phase, only if the owning hero has not been taken Out of Action during the battle. Only one Falcon per warband"
        ],
        turnOrderRules: [
            { name: "Falcon", rule: "Falcons allow you to modify one die roll by -1/+1 made during the Exploration Phase, only if the owning hero has not been taken Out of Action during the battle.", timing: "13" }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        allowedSpecificHeroes: ["Wild Hunter"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 485,
        category: "Miscellaneous Gear",
        name: "Power Squig",
        baseCost: 20,
        variableCost: "D6",
        rules: [
            "Gold is spent even on unsuccessful rare roll",
            "Only Casters may attempt to find",
            "See Rule book for familiar for full details",
            "A wizard with a Power Squig is allowed to re-roll one failed roll to cast a spell each turn. The result of this re-roll must be accepted, even if it fails, and remember that you may never reroll a re-roll. Spell-users only (does not include users of Prayers). "
        ],
        turnOrderRules: [
            { name: "Power Squig", rule: "A wizard with a Power Squig is allowed to re-roll one failed roll to cast a spell each turn. The result of this re-roll must be accepted, even if it fails, and remember that you may never reroll a re-roll. Spell-users only (does not include users of Prayers).", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Snotlings"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 87,
        category: "Miscellaneous Gear",
        name: "Fire Arrows",
        baseCost: 30,
        variableCost: "D6",
        rules: "If you hit with a fire arrow roll a D6. If you score a 4+ your opponent has been set on fire. They must roll a D6 in the recovery phase and score a 4+ to put themselves out or they will suffer a strength 4 hit and will be unable to do anything other than move for each turn they are on fire. Allies may also attempt to put the warrior out. They must be in base contact and need a 4+ to be successful. The fire arrows last for one battle only.",
        turnOrderRules: [
            { name: "Fire Arrows", rule: "If you hit with a fire arrow roll a D6. If you score a 4+ your opponent has been set on fire. They must roll a D6 in the recovery phase and score a 4+ to put themselves out or they will suffer a strength 4 hit and will be unable to do anything other than move for each turn they are on fire. Allies may also attempt to put the warrior out. They must be in base contact and need a 4+ to be successful.", timing: "7" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 184,
        category: "Miscellaneous Gear",
        name: "Fire Bomb",
        baseCost: 35,
        variableCost: "2D6",
        rules: "The fire bomb may be thrown in the shooting phase in the same way as blessed water (see p53 Mordheim rule book). If the bomb lands on target the warrior hit takes D3 Strength 4 hits with no saves for armour and all warriors, friend or foe, within 1 inch of him take 1 Strength 3 hit with saves as normal. If the throwing warrior rolls a 1 when rolling to hit the bomb misfires and explodes just as if the throwing warrior had been hit by his own fire bomb!",
        turnOrderRules: [
            { name: "Fire Bomb", rule: "The fire bomb may be thrown in the shooting phase in the same way as blessed water (see p53 Mordheim rule book). If the bomb lands on target the warrior hit takes D3 Strength 4 hits with no saves for armour and all warriors, friend or foe, within 1 inch of him take 1 Strength 3 hit with saves as normal. If the throwing warrior rolls a 1 when rolling to hit the bomb misfires and explodes just as if the throwing warrior had been hit by his own fire bomb!", timing: "7" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 185,
        category: "Miscellaneous Gear",
        name: "Firecrackers",
        baseCost: 20,
        variableCost: null,
        rules: [
            "There are enough firecrackers to last for one game.",
            "If an animal or mounted warrior tries to charge the model, while it is not in combat, knocked down or stunned, it may pass an Initiative test in order to use the firecrackers. If it succeeds the animal must pass an Ld test (animals may not use the Ld of the warband's leader and mounts may not use the Ld of its rider). If it fails the test, the charge has failed and mounted warriors have to roll on the Whoa Boy! table. If the mount has the battle schooled special rule, the rider may re-roll the result of the Whoa Boy! table once.",
            "The model can also throw the firecrackers in the shooting phase. It may throw them at any point in 8” distance. All Mounts or Animals in 3” around the detonation spot have to take a Ld test. If it fails, mounts have to roll on the Whoa Boy! table, and animals flee as if they failed an all alone test."
        ],
        turnOrderRules: [
            { name: "Fire Cracker Charge", rule: "If an animal or mounted warrior tries to charge the model, while it is not in combat, knocked down or stunned, it may pass an Initiative test in order to use the firecrackers. If it succeeds the animal must pass an Ld test (animals may not use the Ld of the warband's leader and mounts may not use the Ld of its rider). If it fails the test, the charge has failed and mounted warriors have to roll on the Whoa Boy! table. If the mount has the battle schooled special rule, the rider may re-roll the result of the Whoa Boy! table once.", timing: "5" },
            { name: "Fire Cracker Throw", rule: "The model can also throw the firecrackers in the shooting phase. It may throw them at any point in 8” distance. All Mounts or Animals in 3” around the detonation spot have to take a Ld test. If it fails, mounts have to roll on the Whoa Boy! table, and animals flee as if they failed an all alone test. ", timing: "7" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 56,
        category: "Miscellaneous Gear",
        name: "Flash Powder",
        baseCost: 25,
        variableCost: "2D6",
        rules: [
            "There is only enough flash powder for one use during the battle.",
            "Flash powder can be thrown as an enemy charges the wielder (as an interrupt). The charger must take an immediate Initiative test in order to cover their eyes. If he fails, he is temporarily blinded and it counts as a failed charge."
        ],
        turnOrderRules: [
            { name: "Flash Powder", rule: "Flash powder can be thrown as an enemy charges the wielder (as an interrupt). The charger must take an immediate Initiative test in order to cover their eyes. If he fails, he is temporarily blinded and it counts as a failed charge.", timing: "5" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 186,
        category: "Miscellaneous Gear",
        name: "Fog-enhancing Warpstone Shards",
        baseCost: 100,
        variableCost: "D6x10",
        rules: "The wielder of a censer who also have some fog-enhancing warpstone shards is a difficult target to shoot at, and other models suffer a -1 penalty to hit when targeting him with missile weapons (Clan Pestilens members use this item instead of the Elven Cloak).",
        turnOrderRules: [
            { name: "-1 to hit with missile", rule: "opponent has -1 to hit with missile weapons", timing: "8" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Skaven of Clan Pestilens"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 91,
        category: "Miscellaneous Gear",
        name: "Forest Cloak",
        baseCost: 50,
        variableCost: null,
        rules: "So long as the wearer is beside a tree, bush or hedge, any enemy using any kind of missile weapon at a warrior wearing a Forest Cloak is at an additional –1BS to hit (in addition to all other modifiers). Similarly, if any spellcaster wishes to target a magical attack against an Outlaw camouflaged in this way, he can only do so by successfully rolling a 4+ on a D6. The only exception to this is if the shooting warrior or the spellcaster is already within their Initiative range in inches.",
        turnOrderRules: [
            { name: "-1BS to hit with missile", rule: "As long as opponent is not within initiative range of target and the target is next to tree, bush or hedge enemy shooter is at -1 BS", timing: "8" },
            { name: "Magic Save", rule: "Any spellcaster wishes to target a magical attack against an Outlaw camouflaged in this way, he can only do so by successfully rolling a 4+ on a D6.", timing: "8" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Outlaws of Stirwood Forest"],
        restrictedHeroTypes: ["henchman"],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 57,
        category: "Miscellaneous Gear",
        name: "Garlic",
        baseCost: 1,
        variableCost: null,
        rules: [
            "May not be purchased by undead",
            "A Vampire must pass a Leadership test or it will be unable to charge a model carrying a clove of garlic. Garlic lasts for the duration of one battle only, whether it is used or not.",
        ],
        turnOrderRules: [
            { name: "Vampire LD Test", rule: "A Vampire must pass a Leadership test or it will be unable to charge a model carrying a clove of garlic. Garlic lasts for the duration of one battle only, whether it is used or not.", timing: "5" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        cannotPurchase: ["Undead"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 58,
        category: "Miscellaneous Gear",
        name: "Halfling Cookbook",
        baseCost: 30,
        variableCost: "3D6",
        rules: "The maximum number of warriors allowed in your warband is increased by +1.",
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        cannotPurchase: ["Undead", "Carnival of Chaos"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 59,
        category: "Miscellaneous Gear",
        name: "Hammer of Witches",
        baseCost: 100,
        variableCost: null,
        rules: "A Hero with the Hammer of Witches will hate all Possessed, Skaven, Beastmen, Chaos, Daemons, Dark Elf, Orc & Goblins and Sigmarite Sisters.",
        turnOrderRules: [
            { name: "Hate", rule: "May re-roll missed attacks in first turn of combat against Possessed, Skaven, Beastmen, Chaos, Daemons, Dark Elf, Orc & Goblins and Sigmarite Sisters.", timing: "9" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Witch Hunters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 187,
        category: "Miscellaneous Gear",
        name: "Hardtack Biscuits",
        baseCost: 5,
        variableCost: null,
        rules: "At the start of any one of his turns the pirate may pop some in his mouth as long as he is not already in hand-to-hand combat. His Toughness is temporarily increased by +1 for the duration of that turn and the following enemy turn, with the effects generally wearing off afterwards. Roll a D6 after that turn; on a 1 his biscuits were tainted and filled with maggots. Make a note of his name – the pirate must miss the next game as he recovers. If the Pirate winds up missing a game because of other effects, the losses will add together and he will miss the next two games.",
        turnOrderRules: [
            { name: "Biscuits Toughness +1", rule: "At the start of any one of his turns the pirate may pop some in his mouth as long as he is not already in hand-to-hand combat. His Toughness is temporarily increased by +1 for the duration of that turn and the following enemy turn, with the effects generally wearing off afterwards", timing: "9" },
            { name: "Biscuits After Effects", rule: "Roll a D6 after that turn; on a 1 his biscuits were tainted and filled with maggots. Make a note of his name – the pirate must miss the next game as he recovers. If the Pirate winds up missing a game because of other effects, the losses will add together and he will miss the next two games.", timing: "13" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 60,
        category: "Miscellaneous Gear",
        name: "Holy (Unholy) Relic",
        baseCost: 15,
        variableCost: "3D6",
        rules: [
            "A model with a holy relic will automatically pass the first Leadership test he is required to make in the game. If worn by the leader, it will allow him to automatically pass the first Rout test if he has not taken any Leadership tests before.",
            "You can only ignore the first Leadership test in any single game – owning two or more holy relics will not allow you to ignore second and subsequent tests."
        ],
        turnOrderRules: [
            { name: "Pass Leadership", rule: "A model with a holy relic will automatically pass the first Leadership test he is required to make in the game. If worn by the leader, it will allow him to automatically pass the first Rout test if he has not taken any Leadership tests before.", timing: "12" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8, "Sisters of Sigmar": 6, "Protectorate of Sigmar": 6 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 61,
        category: "Miscellaneous Gear",
        name: "Holy Tome",
        baseCost: 100,
        variableCost: "D6x10",
        rules: "A Warrior Priest or Sister of Sigmar with a holy tome can add +1 to the score when determining whether he (or she) can recite a spell successfully or not.",
        turnOrderRules: [
            { name: "+1 Spell Casting", rule: "Add +1 to the score when determining whether he (or she) can recite a spell successfully or not.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Sisters of Sigmar"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Warrior Priest"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 188,
        category: "Miscellaneous Gear",
        name: "Hook Hand",
        baseCost: 4,
        variableCost: null,
        rules: "The wearer cannot use any two-handed weapons and will always count as having a close combat weapon in that hand. The hook strikes in close combat in the same manner as a dagger. A new pirate joining the warband, either during initial warband creation or as a new hire, may also start out with a Hook Hand. If the wearer gets a Hand Injury or Arm Wound in further battles, these can be ignored on a roll of 4+ as the hit was taken by the Hook Hand instead.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 62,
        category: "Miscellaneous Gear",
        name: "Hunting Arrows",
        baseCost: 25,
        variableCost: "D6",
        rules: "A model using a short bow, bow, long bow or Elf bow may use these arrows. They add +1 to all Injury rolls.",
        turnOrderRules: [
            { name: "Hunting Arrows", rule: "A model using a Short Bow, Bow, Long Bow or Elf Bow may use these arrows. They add +1 to all Injury rolls.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8, "Asrai Wayfarer": "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Asrai Wayfarer": {
                    baseCost: 35,
                    variableCost: null
                }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 540,
        category: "Miscellaneous Gear",
        name: "Arrows of Blood Ivy",
        baseCost: 40,
        variableCost: "2D6",
        rules: "If a model is wounded from an arrow of Blood Ivy, that model must immediately succeed at a toughness test or suffer -1 strength for the remainder of the battle. Multiple effects from these arrows are not cumulative. There are enough arrows to last one campaign.",
        turnOrderRules: [
            { name: "Arrows of Blood Ivy", rule: "If a model is wounded from an arrow of Blood Ivy, that model must immediately succeed at a toughness test or suffer -1 strength for the remainder of the battle. Multiple effects from these arrows are not cumulative.", timing: "7" }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Asrai Wayfarer": { baseCost: 40, variableCost: null }
        }
    },
    {
        id: 478,
        category: "Miscellaneous Gear",
        name: "Blessed Bolts",
        baseCost: 25,
        variableCost: null,
        rules: "Holy: Blessed by the Warrior Priest and his Acolytes, the Blessed Bolts may be fired against the enemies of Sigmar. Any Chaotic being, be they Undead, Chaos-infused (mutants or Possessed) or Twister of Magic suffers greatly from these missiles. Add +1S to the weapon when fired against such a target.",
        turnOrderRules: [
            { name: "Holy", rule: "Any Chaotic being, be they Undead, Chaos-infused (mutants or Possessed) or Twister of Magic suffers greatly from these missiles. Add +1S to the weapon when fired against such a target.", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 189,
        category: "Miscellaneous Gear",
        name: "Iron Shod Boots",
        baseCost: 20,
        variableCost: "3D6",
        rules: "Any warrior wearing a pair of iron shod boots may make an additional kick attack in hand-to-hand combat each turn. The attack is resolved at -1 to hit.",
        turnOrderRules: [
            { name: "Extra Attack", rule: "Any warrior wearing a pair of iron shod boots may make an additional kick attack in hand-to-hand combat each turn. The attack is resolved at -1 to hit.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 190,
        category: "Miscellaneous Gear",
        name: "Jolly Roger",
        baseCost: 40,
        variableCost: "2D6",
        rules: [
            "Any Hero may carry the Jolly Roger; the cost represents the effort to have the ship's sail makers create a smaller version that one man may carry on a long pole.",
            "Any Pirates within 12\" of the Jolly Roger never count as being all alone in combat. Carrying the banner takes up one hand though, so that model may not carry or use any two-handed weapons during the game. Note that Swabbies, lacking the true Pirate spirit, do not gain any benefit from the Jolly Roger."
        ],
        turnOrderRules: [
            { name: "Never All Alone", rule: "Any Pirates within 12\" of the Jolly Roger never count as being all alone in combat. Carrying the banner takes up one hand though, so that model may not carry or use any two-handed weapons during the game. Note that Swabbies, lacking the true Pirate spirit, do not gain any benefit from the Jolly Roger.", timing: "2" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 191,
        category: "Miscellaneous Gear",
        name: "Ladders Small",
        baseCost: 5,
        variableCost: null,
        rules: [
            "A ladder is placed on the board like any other model. If you have no adequate model, use a marker to represent the ladder. A Ladder requires two models, Heroes or Henchmen, (or a single large model) to carry it. However, one model can carry a ladder alone, but may then move at half speed only. Models carrying a ladder may not run. They may drop the ladder any time they wish (e.g. when charged). A ladder may be set up in the Movement phase in base contact with any of the carriers. This requires a quarter of their Movement. Note that if one of the models has a lower Movement than the other, both models are slowed down while carrying the ladder.",
            "Ladders are considered open ground and do not affect the model's movement rate (see Mordheim Rulebook). Any model in base contact with a ladder may try to knock it over in the hand-to-hand combat phase. The model must pass a Strength test with a –1 modifier for every model on the ladder after the first. If the test is successful treat the models as falling from where they were.",
            "Small ladders have a length of up to 3\”"

        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 51,
        category: "Miscellaneous Gear",
        name: "Ladders Large",
        baseCost: 10,
        variableCost: null,
        rules: [
            "A ladder is placed on the board like any other model. If you have no adequate model, use a marker to represent the ladder. A Ladder requires two models, Heroes or Henchmen, (or a single large model) to carry it. However, one model can carry a ladder alone, but may then move at quarter speed only. Models carrying a ladder may not run. They may drop the ladder any time they wish (e.g. when charged). A ladder may be set up in the Movement phase in base contact with any of the carriers. This requires half of their Movement. Note that if one of the models has a lower Movement than the other, both models are slowed down while carrying the ladder.",
            "Ladders are considered open ground and do not affect the model's movement rate (see Mordheim Rulebook). Any model in base contact with a ladder may try to knock it over in the hand-to-hand combat phase. The model must pass a Strength test with a –1 modifier for every model on the ladder after the first. If the test is successful treat the models as falling from where they were.",
            "Small ladders have a length of up to 3\”"

        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 5 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 67,
        category: "Miscellaneous Gear",
        name: "Lamp of the Djinn",
        baseCost: 50,
        variableCost: "2D6",
        rules: "Each time a hero uses the lamp it grants him three wishes but each time you roll on the 'Light table' you must roll on the 'Dark table' and apply the results.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 33,
        category: "Miscellaneous Gear",
        name: "Lantern",
        baseCost: 10,
        variableCost: null,
        rules: "A model that is in possession of a lantern may add +4\" to the distance from which he is able to spot hidden enemies.",
        turnOrderRules: [
            { name: "+4 Spot Hidden Enemies", rule: "A model that is in possession of a lantern may add +4\" to the distance from which he is able to spot hidden enemies.", timing: "4" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 467,
        category: "Miscellaneous Gear",
        name: "Hooded Lantern and Rig",
        baseCost: 15,
        variableCost: "1d6",
        rules: [
            "A model that is in possession of a lantern may add +4\" to the distance from which he is able to spot hidden enemies.",
            "Concealed Light: Provides light like a regular Lantern, but removes the visibility for enemy models.",
            "Free-hand: The Rig that the Hooded Lantern attaches to allows the Graver free hands with which to ply his trade."
        ],
        turnOrderRules: [
            { name: "+4 Spot Hidden Enemies", rule: "A model that is in possession of a lantern may add +4\" to the distance from which he is able to spot hidden enemies.", timing: "4" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 469,
        category: "Miscellaneous Gear",
        name: "Surgeon’s Journal",
        baseCost: 80,
        variableCost: "4d6",
        rules: [
            "Skilled Hand: A Medic equipped with the Journal may modify a single dice rolled for Serious Injury for one friendly model by +/- 1 instead of using his Sawbones skill."
        ],
        turnOrderRules: [
            { name: "Skilled Hand", rule: "A Medic equipped with the Journal may modify a single dice rolled for Serious Injury for one friendly model by +/- 1 instead of using his Sawbones skill.", timing: "13" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 470,
        category: "Miscellaneous Gear",
        name: "Finger Pendant",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Death-Ward: Gives a one-time 5+ save vs. Necromantic or Dark Arts magic."
        ],
        turnOrderRules: [
            { name: "Death-Ward", rule: "Gives a one-time 5+ save vs. Necromantic or Dark Arts magic.", timing: "8" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Grave Robbers"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 192,
        category: "Miscellaneous Gear",
        name: "Liber Bubonicus",
        baseCost: 200,
        variableCost: "D6x25",
        rules: "If a Clan Pestilens warband includes a Pestilens Sorcerer, he may use the Liber Bubonicus to permanently learn an additional spell randomly chosen from the Horned Rat spell list. A Plague Priest may use the Liber Bubonicus to learn the Horned Rat magic if he has the Magical Aptitude skill: that means he would gain the special rule \"Spellcaster: is a spellcaster and may cast spells from the Horned Rat spell list.\" and permanently learn a randomly chosen spell from the Horned Rat spell List. The Liber Bubonicus may be used a single time, and a warband cannot have and use more than one Liber Bubonicus in a given campaign (Clan Pestilens members use this item instead of the Tome of Magic).",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: ["Skaven of Clan Pestilens"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 193,
        category: "Miscellaneous Gear",
        name: "Liturgicus Infecticus",
        baseCost: 30,
        variableCost: "2D6",
        rules: "At the beginning of a turn, or just before taking a Rout Test, the warband may chant the Liturgicus Infecticus, and benefit of a +1 Leadership bonus until the end of the turn. (Clan Pestilens members use this item instead of the War horn).",
        turnOrderRules: [
            { name: "+1 Route Test", rule: "At the beginning of a turn, or just before taking a Rout Test, the warband may chant the Liturgicus Infecticus, and benefit of a +1 Leadership bonus until the end of the turn.", timing: "2" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Skaven of Clan Pestilens"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 63,
        category: "Miscellaneous Gear",
        name: "Lock Picks",
        baseCost: 15,
        variableCost: null,
        rules: "A model equipped with a set of lock picks may make his test to open doors on his Initiative rather than his Strength characteristic if he wishes. This is done at the end of his Movement phase as if the model were ripping the door off its hinges, though he uses his Initiative rather than Strength, there is no -1 modifier, and there is no chance that the door is too damaged to be locked again l",
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 194,
        category: "Miscellaneous Gear",
        name: "Lookout-Gnoblar",
        baseCost: 20,
        variableCost: null,
        rules: "An Ogre with a Lookout-Gnoblar gains the skill Dodge from the Speed skill list.",
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Maneaters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 195,
        category: "Miscellaneous Gear",
        name: "Luck-Gnoblar",
        baseCost: 25,
        variableCost: null,
        rules: "An Ogre with a Luck-Gnoblar may re-roll one dice during the battle. Remember you may never re-roll a re-roll.",
        turnOrderRules: [
            { name: "Luck", rule: "May re-roll one dice during the battle. Remember you may never re-roll a re-roll.", timing: "12" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Maneaters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 212,
        category: "Miscellaneous Gear",
        name: "Sword-Gnoblar",
        baseCost: 30,
        variableCost: null,
        rules: "An Ogre with a Sword-Gnoblar gains one extra Strength 2 attack in Close Combat, at the weapon skill of the owning model. This attack is made at the same time as the owning Hero's attacks and must be directed at a model the Ogre has directed attacks toward. The opponent's attention is on the Ogre!",
        turnOrderRules: [
            { name: "Extra Attack", rule: "Gain one extra Strength 2 attack in Close Combat, at the weapon skill of the owning model. This attack is made at the same time as the owning Hero's attacks and must be directed at a model the Ogre has directed attacks toward.", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Maneaters"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 32,
        category: "Miscellaneous Gear",
        name: "Lucky Charm",
        baseCost: 10,
        variableCost: null,
        rules: "The first time a model with a lucky charm is hit in a battle they roll a D6. On a 4+ the hit is discarded and no damage is suffered. Owning two or more charms does not confer any extra benefits, the model may still only try to discard the first hit.",
        turnOrderRules: [
            { name: "Lucky Charm", rule: "The first time a model with a lucky charm is hit in a battle they roll a D6. On a 4+ the hit is discarded and no damage is suffered.", timing: ["8", "9"] }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 6 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 72,
        category: "Miscellaneous Gear",
        name: "Magic Carpet",
        baseCost: 50,
        variableCost: "4d6",
        rules: "A magic carpet is indeed just that – a carpet that flies! It counts as a mount and allows movement of 16\" with no restrictions for terrain. You can move onto the roofs of buildings and other high places with no penalty. The carpet may carry up to three men or one large creature and a man. One of the riders must be a character. Due to its magical nature it cannot be destroyed.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 65,
        category: "Miscellaneous Gear",
        name: "Magic Gubbinz",
        baseCost: 50,
        variableCost: null,
        rules: "Shaman may re-roll a failed magic test on a D6 roll of 4+.",
        turnOrderRules: [
            { name: "Re-roll Failed Magic", rule: "Shaman may re-roll a failed magic test on a D6 roll of 4+.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Forest Goblins"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 197,
        category: "Miscellaneous Gear",
        name: "Map of Cathay",
        baseCost: 20,
        variableCost: "4D6",
        rules: [
            "Roll d6",
            "1: The map is fake and completely useless!",
            "2-3: The map shows the way to a mysterious lady. As the warband follows the depicted route, the first random happening to occur in the next battle will be \"The Old Crone\" (56) automatically.",
            "4-5: The next time a roll of 4+ is scored on the progress table, the warband with a map of Cathay automatically counts as having the most campaign points and thus may choose the next scenario. If both warbands have a map of Cathay, compare campaign points as usual.",
            "6: The map leads to the hideout of Belandysh! Whenever the warband with this map rolls a 1 for random happenings, they may choose to have the \"Belandysh comes!\" (42-43) event happen automatically instead of determining at random."
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 71,
        category: "Miscellaneous Gear",
        name: "Monkey's Paw",
        baseCost: 50,
        variableCost: "D6",
        rules: "Each time a Hero uses the paw it grants three wishes but you only have to roll once on the dark side. If you roll this item you must take it. Every two games you have it and don't use it you have to roll on the dark side. You may not get rid of the paw unless you use it three times or roll lose the paw. After the third use it disappears.",
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        turnOrderRules: []
    },
    {
        id: 66,
        category: "Miscellaneous Gear",
        name: "Mordheim Map",
        baseCost: 20,
        variableCost: "4D6",
        rules: [
            "Roll d6",
            "1: Fake. The map is a fake, and is completely worthless. It leads you on a fool's errand. Your opponent may automatically choose the next scenario you play.",
            "2-3: Vague. Though crude, the map is generally accurate (well... parts of it are... perhaps!). You may re-roll any one dice during the next exploration phase if you wish but you must accept the result of the second roll.",
            "4: Catacomb map. The map shows a way through the catacombs into the city. You may automatically choose the scenario next time you fight a battle.",
            "5: Accurate. The map is recently made and very detailed. You may re-roll up to three dice during the next exploration phase if you wish. You must accept the result of the second roll.",
            "6: Master map. This is one of the twelve master maps of Mordheim made for Count von Steinhardt of Ostermark. From now on you may always re-roll one dice when rolling on the Exploration chart as long as the Hero who possesses this map was not taken out of action in the battle."
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        turnOrderRules: []
    },
    {
        id: 35,
        category: "Miscellaneous Gear",
        name: "Net",
        baseCost: 5,
        variableCost: null,
        rules: "Once per game, the net may be thrown in the shooting phase instead of the model shooting a missile weapon. Treat the net as a missile weapon in all respects with a range of 8\". Use the model's BS to determine whether the net hits or not – there are no movement or range penalties. If it hits, the target must immediately roll a D6. If the result is equal to, or lower than his Strength, he rips the net apart. If the result is higher, he may not move, shoot or cast spells in his next turn, although he is not otherwise affected.",
        turnOrderRules: [
            { name: "Throw Net", rule: "Once per game, the net may be thrown in the shooting phase instead of the model shooting a missile weapon. Treat the net as a missile weapon in all respects with a range of 8\". Use the model's BS to determine whether the net hits or not – there are no movement or range penalties. If it hits, the target must immediately roll a D6. If the result is equal to, or lower than his Strength, he rips the net apart. If the result is higher, he may not move, shoot or cast spells in his next turn, although he is not otherwise affected.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 198,
        category: "Miscellaneous Gear",
        name: "Parrot",
        baseCost: 15,
        variableCost: null,
        rules: "All enemy in base contact with the owner will be at –1 to hit in their first round of combat with the pirate unless they can pass a Leadership Test.",
        turnOrderRules: [
            { name: "-1 to Hit", rule: "All enemy in base contact with the owner will be at –1 to hit in their first round of combat with the pirate unless they can pass a Leadership Test.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 8
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Ship’s Captain", "Mates"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 199,
        category: "Miscellaneous Gear",
        name: "Peg Leg",
        baseCost: 8,
        variableCost: null,
        rules: "This will reduce his Movement (and maximum possible Movement characteristic) by -1, but offers a chance that stray hits will strike the leg instead. This gives him a special saving throw of 6+, which can be taken whenever he fails any other saving throws allowed against any wounding shooting or hand-to-hand hits. This save is not modified, and can be used even if no saving throw is normally allowed. A new pirate joining the warband, either during initial warband creation or as a new hire, may also start out with a Peg Leg. If the wearer gets a Leg Wound or Smashed Leg in further battles, these can be ignored on a roll of 4+ as the hit was taken by the Peg Leg instead.",
        turnOrderRules: [
            { name: "Peg Leg Save", rule: "Special 6+ save which can be taken whenever he fails any other saving throws allowed against any wounding shooting or hand-to-hand hits. This save is not modified, and can be used even if no saving throw is normally allowed.", timing: ["9", "8"] },
            { name: "Peg Leg Post Game", rule: "If the wearer gets a Leg Wound or Smashed Leg in further battles, these can be ignored on a roll of 4+ as the hit was taken by the Peg Leg instead.", timing: "13" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        characteristicModifiers: { M: -1 },
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 200,
        category: "Miscellaneous Gear",
        name: "Poisoned Weapon",
        baseCost: 25,
        variableCost: null,
        rules: "Once this poison is bought, it is applied to one weapon, and may not be traded or sold later on. The weapon in question, once poisoned, adds +1 to any injury rolls from then on.",
        turnOrderRules: [
            { name: "Poison", rule: "The weapon in question, once poisoned, adds +1 to any injury rolls from then on.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Forest Goblins"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 84,
        category: "Miscellaneous Gear",
        name: "Powder Keg",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Warriors may shoot at a powder keg with blackpowder weapons, Cathayan candles, fire bombs and fire arrows and they may attack the keg in close combat using torches and brazier irons. Of course, they may also use all similar weapons and items that can ignite the powder inside.",
            "The model must hit and wound as usual (Toughness 4). Then roll a D6: on a 4+ the keg explodes (remove the keg from the game). If the model rolled a critical hit the keg automatically explodes.",
            "An exploding powder keg causes an automatic Strength 6 hit to all models within a range of D6+3”.",
            "When playing the Horrors of the Underground scenario, roll another D6: on a 4+ the explosion caused the tunnel to cave in. Place a marker at the powder keg's previous position as described in the Tunnel collapse event."
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: {
            base: 7
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 69,
        category: "Miscellaneous Gear",
        name: "Rabbit's Foot",
        baseCost: 10,
        variableCost: null,
        rules: "A rabbit's foot allows the warrior wearing it to reroll one dice during the battle. If not used in the battle it can be used to reroll one dice during the exploration phase providing the hero is able to search through the ruins.",
        turnOrderRules: [
            { name: "Rabbit Foot", rule: "A rabbit's foot allows the warrior wearing it to reroll one dice during the battle.", timing: "12" },
            { name: "Rabit Foot Post Game", rule: "If not used in the battle it can be used to reroll one dice during the exploration phase providing the hero is able to search through the ruins.", timing: "13" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: {
            base: 5
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 70,
        category: "Miscellaneous Gear",
        name: "Red Toof Tribal Jewellery",
        baseCost: 40,
        variableCost: null,
        rules: "This cannot be removed. The model will now be subject to the rules for Frenzy.",
        turnOrderRules: [
            { name: "Frenzy", rule: "Must charge if enemy within range. Fight with double Attacks in combat. Immune to other psychology while within charge range. Loses frenzy if knocked down or stunned.", timing: ["4", "10"] }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 9
        },
        restrictedWarbands: ["Forest Goblins"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 31,
        category: "Miscellaneous Gear",
        name: "Rope & Hook",
        baseCost: 5,
        variableCost: null,
        rules: "A warrior equipped with a rope and hook may re-roll failed Initiative tests when climbing up and down.",
        turnOrderRules: [
            { name: "Re-roll Climb", rule: "A warrior equipped with a rope & hook may re-roll failed Initiative tests when climbing up and down.", timing: "4" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 203,
        category: "Miscellaneous Gear",
        name: "Rosary",
        baseCost: 10,
        variableCost: null,
        rules: "A prayer user wearing a Rosary may re-roll a failed Difficulty test if he hasn't done anything that turn except moving (no running) or remaining stationary. A Rosary cannot be used in combat.",
        turnOrderRules: [
            { name: "Re-roll Difficulty Test", rule: "A prayer user wearing a Rosary may re-roll a failed Difficulty test if he hasn't done anything that turn except moving (no running) or remaining stationary. A Rosary cannot be used in combat.", timing: "7" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: {
            base: 6
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 79,
        category: "Miscellaneous Gear",
        name: "Scorpion Ring",
        baseCost: 10,
        variableCost: "D6",
        rules: "At the beginning of the battle the warrior is able to call forth a single Tomb Scorpion to fight for the warband if he can pass a Leadership test. The summoned scorpion will fight for a single battle only (use Tomb Scorpion from Tomb Guardians list).",
        turnOrderRules: [
            { name: "Summon Scorpion", rule: "At the beginning of the battle the warrior is able to call forth a single Tomb Scorpion to fight for the warband if he can pass a Leadership test. The summoned scorpion will fight for a single battle only (use Tomb Scorpion from Tomb Guardians list).", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 11
        },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 205,
        category: "Miscellaneous Gear",
        name: "Scroll of the Rat Familiar",
        baseCost: 25,
        variableCost: "D6",
        rules: [
            "The Scroll of Familiar Rat has a spell inscribed on it, usable by a Pestilens Sorcerer as many times as he wants. If the warband includes at least one Giant Rat, the spell may be cast on it before the combat begins, transforming it in a Rat Familiar. If his Rat Familiar is within 6\", the sorcerer may reroll once in a game the dice to overcome the difficulty of a spell. A sorcerer may only have one Rat Familiar at any one time, it is an henchman and it counts normally toward the maximum number of models permitted co the warband. If the sorcerer dies, his Rat Familiar turns back to Giant Rat form. (Clan Pestilens members use this item instead of the normal Familiar).",
            "Enchanted Animal: The Rat Familiar earns experience as an henchman. A result of 10 - 12 on the henchmen advancement table, instead of the promotion to hero status gives as a result \"Improved spellcasting: if the sorcerer is within 6\" of the Rat Familiar, he gain a +1 bonus when rolling dice to overcome the difficulty of a spell. This ability is cumulative."
        ],
        turnOrderRules: [
            { name: "Re-Roll Spell Difficulty", rule: "If his Rat Familiar is within 6\", the sorcerer may reroll once in a game the dice to overcome the difficulty of a spell.", timing: "7" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 8
        },
        restrictedWarbands: ["Skaven of Clan Pestilens"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 208,
        category: "Miscellaneous Gear",
        name: "Smoke Bomb",
        baseCost: 30,
        variableCost: "2D6",
        rules: [
            "At the beginning of the Movement phase, a smoke bomb may be thrown at any point within 4\" where it creates a thick smoke of 2\" radius that lasts until the beginning of the model's next turn. If the model is in close combat, it must pass an Initiative test or suffer one automatic hit from each enemy model. After that the bomb detonates anyhow – even if the model is wounded.",
            "Models within the smoke may not attack/shoot or be attacked/shot at. Same applies to casting spells and prayers. Models engaged in close combat are immediately moved 1\" away from each other.",
            "As models cannot see through the smoke, they cannot attack through it either.",
            "However, models can move in the smoke, out of it and through it as normal. Note that the Augur of the Sisters of Sigmar is not affected by smoke bombs due to her Blessed Sight.",
            "Whenever a model carrying a smoke bomb is knocked down, stunned or out of action, the bomb detonates on a roll of 4+. Note that no extra roll is needed when a stunned model turns knocked down at the beginning of its turn."
        ],
        turnOrderRules: [
            { name: "Smoke Bomb", rule: "At the beginning of the Movement phase, a smoke bomb may be thrown at any point within 4\" where it creates a thick smoke of 2\" radius that lasts until the beginning of the model's next turn. If the model is in close combat, it must pass an Initiative test or suffer one automatic hit from each enemy model. After that the bomb detonates anyhow – even if the model is wounded.", timing: "4" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 95,
        category: "Miscellaneous Gear",
        name: "Snake Charmer's Flute",
        baseCost: 10,
        variableCost: "D6",
        rules: [
            "A warrior who possesses this item is able to transfix and control serpents. If the warrior does nothing for a whole turn, he may play the flute. If this happens, any serpent within 6\" may not move or attack in their subsequent turn."
        ],
        turnOrderRules: [
            { name: "Snake Chamer's Flute", rule: "If the warrior does nothing for a whole turn, he may play the flute. If this happens, any serpent within 6\" may not move or attack in their subsequent turn.", timing: "2" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 210,
        category: "Miscellaneous Gear",
        name: "Spy Glass",
        baseCost: 20,
        variableCost: null,
        rules: "At the start of his turn, the owner can try to detect one Hidden enemy model to which he has normal Line of Sight. On a roll of 4+, the model looses his Hidden status. The spying Pirate can move as normal in that turn, but cannot run or charge.",
        turnOrderRules: [
            { name: "Spy Glass", rule: "At the start of his turn, the owner can try to detect one Hidden enemy model to which he has normal Line of Sight. On a roll of 4+, the model looses his Hidden status. The spying Pirate can move as normal in that turn, but cannot run or charge.", timing: "2" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 211,
        category: "Miscellaneous Gear",
        name: "Squig Prodder",
        baseCost: 15,
        variableCost: null,
        rules: "To represent this, a Goblin with a Squig prodder can keep all Cave Squigs within 12\" from going wild, instead of the normal 6\" (see the Minderz special rule under the Cave Squig entry). In addition, a Squig prodder is treated exactly like a spear in hand-to-hand combat.",
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Goblin"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 48,
        category: "Miscellaneous Gear",
        name: "Standard of Nagarythe",
        baseCost: 75,
        variableCost: "3D6",
        rules: [
            "A standard may only ever be purchased when the warband is created and may never be added later to the warband.",
            "A Standard of Nagarythe can serve as a second rallying point (the Shadow Master is the first, represented by his Leader skill) for the unit. Any members of the Shadow Warrior warband within 12\" of their standard may re-roll any failed Leadership tests",
            "Should the standard be captured by the enemy (model holding the standard is taken Out of Action), all members of the warband will be subject to Hatred for the remainder of the game, and may not voluntarily Rout. Note that these effects do not affect any Hired Swords in the warband, only actual Shadow Warriors (including Shadow Warrior heroes) are affected.",
            "A model carrying a standard requires one hand free to do so, so no weapons, shields, etc, may be carried in this hand, and no double-handed weapons may be used while the standard is carried. A standard may be used in close combat as a makeshift spear (use the rules for a spear but with -1 on the to hit rolls)."
        ],
        turnOrderRules: [
            { name: "Standard of Nagarythe as Spear", rule: "A model carrying a standard requires one hand free to do so, so no weapons, shields, etc, may be carried in this hand, and no double-handed weapons may be used while the standard is carried. A standard may be used in close combat as a makeshift spear (use the rules for a spear but with -1 on the to hit rolls).", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: ["Shadow Warriors"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 73,
        category: "Miscellaneous Gear",
        name: "Superior Blackpowder",
        baseCost: 30,
        variableCost: null,
        rules: "This new batch adds +1 Strength to all blackpowder weapons that the model has. There is enough superior blackpowder to last for one game.",
        turnOrderRules: [
            { name: "Superior Blackpowder", rule: "This new batch adds +1 Strength to all blackpowder weapons that the model has.", timing: "7" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 74,
        category: "Miscellaneous Gear",
        name: "Tarot Cards",
        baseCost: 50,
        variableCost: null,
        rules: "A Hero with a deck of tarot cards may consult them before each game. Make a Leadership test. If successful, the Hero gains a favorable insight into the future and you may modify the result of any one dice in the Exploration phase by -1/+1 (even if the Hero with the cards is taken Out Of Action). If the Leadership test is failed by three or more (i.e., a Hero with Ld of 8 rolls 11 or 12) the cards show a portent of doom and despair and the Hero refuses to fight in the following battle and must miss the next game.",
        turnOrderRules: [
            { name: "Tarot Cards Pre Game", rule: "A Hero with a deck of tarot cards may consult them before each game. Make a Leadership test. If successful, the Hero gains a favorable insight into the future and you may modify the result of any one dice in the Exploration phase by -1/+1 (even if the Hero with the cards is taken Out Of Action). If the Leadership test is failed by three or more (i.e., a Hero with Ld of 8 rolls 11 or 12) the cards show a portent of doom and despair and the Hero refuses to fight in the following battle and must miss the next game.", timing: "1" },
            { name: "Tarot Cards Post Game", rule: "A Hero with a deck of tarot cards may consult them before each game. Make a Leadership test. If successful, the Hero gains a favorable insight into the future and you may modify the result of any one dice in the Exploration phase by -1/+1 (even if the Hero with the cards is taken Out Of Action). If the Leadership test is failed by three or more (i.e., a Hero with Ld of 8 rolls 11 or 12) the cards show a portent of doom and despair and the Hero refuses to fight in the following battle and must miss the next game.", timing: "13" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        cannotPurchase: ["Witch Hunters", "Sisters of Sigmar"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 75,
        category: "Miscellaneous Gear",
        name: "Telescope",
        baseCost: 75,
        variableCost: "3D6",
        rules: "Any hero using a telescope may increase the range of any missile weapon he is using by D6 inches each turn. Furthermore, he triples the distance at which he can spot hidden enemies.",
        turnOrderRules: [
            { name: "Telescope Increase Range", rule: "May increase the range of any missile weapon he is using by D6 inches each turn. ", timing: "7" },
            { name: "Telescope Spot Hidden", rule: "Triple the distance at which he can spot hidden enemies.", timing: "4" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 76,
        category: "Miscellaneous Gear",
        name: "Tome of Magic",
        baseCost: 200,
        variableCost: "D6x25",
        rules: "If a warband includes a wizard, he will gain an extra spell from the tome, permanently. He may randomly generate this new spell from his own list or the Lesser Magic list. See the Magic section for details. The benefits from each Tome of Magic apply to only one model.",
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 77,
        category: "Miscellaneous Gear",
        name: "Torch",
        baseCost: 2,
        variableCost: null,
        rules: [
            "Torches act exactly as lanterns, adding +4\" to the range the model may spot hidden enemies",
            "A torch will only last one game.",
            "A model armed with a torch counts as causing fear in animals (Hunting Dogs, all riding steeds, Bears, Wolves, etc).",
            "May use a torch as a makeshift club. When used in combat, a torch is treated as a normal club, though with a -1 to hit modifier.",
            "Any models that have a Regeneration special rule (like Trolls) will not be able to regenerate wounds caused by a torch during the battle.",
            "Torches may also cause buildings to catch fire – see 'Let the Damned Burn', from Town Cryer 8."
        ],
        turnOrderRules: [
            { name: "Spot Hidden Enemies", rule: "Torches act exactly as lanterns, adding +4\" to the range the model may spot hidden enemies. ", timing: "4" },
            { name: "Only Last One Game", rule: "A torch will only last one game.", timing: "13" },
            { name: "Use as Club", rule: "May use a torch as a makeshift club. When used in combat, a torch is treated as a normal club, though with a -1 to hit modifier. Any models that have a Regeneration special rule (like Trolls) will not be able to regenerate wounds caused by a torch during the battle.", timing: "9" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 215,
        category: "Miscellaneous Gear",
        name: "Treasure Map",
        baseCost: 75,
        variableCost: "4D6",
        rules: [
            "Roll a D6 after the game to determine where the map leads you",
            "1: The map turns out to be a fake! However, you do manage to return and trounce the bilge-drinking swine who sold it to you, and he gives your Warband D6x5 gold crowns to make amends (and prevent himself getting keel-hauled!).",
            "2: The map leads your crew to a minor stash. After some hours digging, the find a chest containing 1 shard of wyrdstone and some jewels worth 2D6x10 gold crowns.",
            "3: The map reveals one of the fabled alestashes of Long Drong Slayer himself! You uncover several barrels of the finest rums, ales, and other assorted spirits. One is a barrel of Bugman's XXXX, which can be used as per the rules for Bugman's Ale. After 'sampling' many of the other barrels, the remainders are sold off for 2D6x10 gold crowns (after the crew wakes up, of course).",
            "4: Buried deep in the ruins of an unassuming hovel you find several chests filled with fine clothes, plus several notebooks outlining blackmail information for many of the local trading merchants. You realise this must be one of the stashes left by Facio, the great Tilean trickster and rogue. Armed with your new clothing and information, on your next visit to the trading posts you may buy any one item listed on the regular Price Chart as if it was Common (except any other Pirate Warband unique items, such as Swivel Guns or Treasure Maps), assuming you have the money. Once the transaction is complete, you turn around and sell the notebooks to his competitors for 2D6x10 gold crowns, and make any other trading post purchases as normal. Also, if in your next game your warband captures anyone, or finds any Stragglers or Prisoners, the fine clothing impresses them quite a bit! The Captain's Leadership is increased by +1 when testing to see if any join your warband.",
            "5: The treasure chest that is found has been carefully booby-trapped! One of your Heroes must try to penetrate the maze of poisoned dart-shooters and collapsing pathways that surround the chest by passing an Initiative test. If he passes, his expert approach reveals a Lucky Charm near the chest (which he claims for himself!), and 3D6x10 gold crowns in the chest itself. If he fails the test, he must sit out the next game as he recovers, but the crew do manage to open the chest now that the traps have been set off and gain the gold as above. They do not find the Lucky Charm though as it is drawn back into it's hiding place, there to await a more careful adventurer.",
            "6: Your crew bow their heads in reverent silence, as the map has lead them to one of the legendary secret burial spots used by Black-Wyrd the Pirate King, first and finest pirate to ever ravage Mordheim. Known for tying shards of Wyrdstone into the thick strands of his hair and beard and then setting them alight so they set off sparks of unholy fire, he was rightly feared by all Warbands throughout the land and sea. Though only a small chest is found at the site, when opened it reveals 2+D3 shards of Wyrdstone, plus a Mordheim Map!"
        ],
        turnOrderRules: [
            { name: "Roll Treasure Map", rule: "Roll a D6 after the game to determine where the map leads you", timing: "13" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Pirates"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 78,
        category: "Miscellaneous Gear",
        name: "Trip Wire",
        baseCost: 15,
        variableCost: null,
        rules: [
            "A Hero may set a trap if he spends a turn doing nothing else (he may not set traps if he's just recovered from being knocked down). Place a marker in base contact with the Hero.",
            "When a model, friend or foe, moves within 2\" of the marker he risks setting off the trap – roll a D6. On a score of 3+ he has triggered the trap and suffers a S4 hit (note that the Hero won't trigger his own traps).If the trap did not wound the model or it didn't trigger, the victim may finish his move otherwise he is placed knocked down or stunned 2\" from the marker. The marker is removed whether the trap was triggered or not."
        ],
        turnOrderRules: [
            { name: "Set Trap", rule: "A Hero may set a trap if he spends a turn doing nothing else (he may not set traps if he's just recovered from being knocked down). Place a marker in base contact with the Hero.", timing: "2" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 116,
        category: "Miscellaneous Gear",
        name: "Vemon Ring",
        baseCost: 20,
        variableCost: "D6",
        rules: [
            "The Venom Ring renders the wearer immune to the effects of all poisons."
        ],
        turnOrderRules: [
            { name: "Immune to Poisons", rule: "The Venom Ring renders the wearer immune to the effects of all poisons.", timing: "12" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 85,
        category: "Miscellaneous Gear",
        name: "Victuals",
        baseCost: 8,
        variableCost: null,
        rules: "Victuals may be used after a battle. If the warband sells Treasures, the warband is considered to be one size lower (so a warband with 10-12 members is considered to be comprised of 7-9 members instead). A warband may use as many victuals as they wish, but note that the warband size cannot be considered lower than 1-3 models.",
        turnOrderRules: [
            { name: "Sell Teasure", rule: "Victuals may be used after a battle. If the warband sells Treasures, the warband is considered to be one size lower (so a warband with 10-12 members is considered to be comprised of 7-9 members instead). A warband may use as many victuals as they wish, but note that the warband size cannot be considered lower than 1-3 models.", timing: "13" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 217,
        category: "Miscellaneous Gear",
        name: "Vodka",
        baseCost: 35,
        variableCost: "2D6",
        rules: "In game terms, vodka is a one-use item of equipment that a Kislevite Hero may give to the warband before the start of the game. Every warrior in the warband receives +1 Leadership (up to a maximum of 10) for that game. In addition, because of its nullifying alcoholic effects, every warband member must test against their Toughness before the start of the game — a failure resulting in -1 Initiative for the duration of the game.",
        turnOrderRules: [
            { name: "Drink Vodka", rule: "Every warrior in the warband receives +1 Leadership (up to a maximum of 10) for that game. In addition, because of its nullifying alcoholic effects, every warband member must test against their Toughness before the start of the game — a failure resulting in -1 Initiative for the duration of the game.", timing: "1" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Kislevites"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 80,
        category: "Miscellaneous Gear",
        name: "War Horn",
        baseCost: 30,
        variableCost: "2D6",
        rules: "A war horn may be used once per battle at the beginning of any turn. It allows the warband to increase its Leadership by +1. The effect will last from the start of one turn to the start of the next. The war horn can be used just before a warband is about to take a rout test.",
        turnOrderRules: [
            { name: "War horn", rule: "A war horn may be used once per battle at the beginning of any turn. It allows the warband to increase its Leadership by +1. The effect will last from the start of one turn to the start of the next. The war horn can be used just before a warband is about to take a rout test.", timing: "2" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 81,
        category: "Miscellaneous Gear",
        name: "War Horn of Nagarythe",
        baseCost: 25,
        variableCost: "D6",
        rules: "A war horn may be used once per battle at the beginning of any turn. It allows the warband to increase its Leadership by +1. The effect will last from the start of one turn to the start of the next. The war horn can be used just before a warband is about to take a rout test.",
        turnOrderRules: [
            { name: "War horn", rule: "A war horn may be used once per battle at the beginning of any turn. It allows the warband to increase its Leadership by +1. The effect will last from the start of one turn to the start of the next. The war horn can be used just before a warband is about to take a rout test.", timing: "2" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 6
        },
        restrictedWarbands: ["Shadow Warriors"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 219,
        category: "Miscellaneous Gear",
        name: "Warpstone Amulet",
        baseCost: 10,
        variableCost: null,
        rules: "The owner of a warpstone amulet may reroll a single die during the battle or, if not out of combat at the end of the game, a single die when looking for wyrdstone shards (Clan Pestilens members use this item instead of the Rabbit's Foot).",
        turnOrderRules: [
            { name: "Warpstone Amulet", rule: "Reroll one dice during the battle.", timing: "12" },
            { name: "Warpstone Amulet Post Game", rule: "If not used in the battle it can be used to reroll one dice during the exploration phase providing the hero is able to search through the ruins.", timing: "13" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: {
            base: 5
        },
        restrictedWarbands: ["Skaven of Clan Pestilens"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 220,
        category: "Miscellaneous Gear",
        name: "Wheelbarrow",
        baseCost: 5,
        variableCost: null,
        rules: [
            "A Hero or Henchman who is neither an animal nor stupid may push a wheelbarrow while he is in base-contact with it.",
            "Pushing a wheelbarrow does not affect the normal movement of the model. However, it cannot charge whilst pushing a wheelbarrow but it may let go of it at any time.",
            "A wheelbarrow can be used to transport cumbersome items such as chests and barrels. First, the item must be dropped on the wheelbarrow. After that, a model can push the wheelbarrow and its load. A wheelbarrow can contain no more than one cumbersome item at a time, but any number of smaller items (weapons, armour and small misc equipment)."
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 5 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 82,
        category: "Miscellaneous Gear",
        name: "Wyrdstone Pendulum",
        baseCost: 25, variableCost: "3D6",
        rules: "If he was not taken out, the Hero using the Wyrdstone Pendulum may make a Leadership test after the battle. If he is successful, you may re-roll any one dice in the Exploration phase. This dice may not be re-rolled",
        turnOrderRules: [
            { name: "Exploration Re-Roll", rule: "If he was not taken out, the Hero using the Wyrdstone Pendulum may make a Leadership test after the battle. If he is successful, you may re-roll any one dice in the Exploration phase. This dice may not be re-rolled", timing: "13" }
        ],
        grade: "1a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 451,
        category: "Miscellaneous Gear",
        name: "Two Cymbals",
        baseCost: 10,
        variableCost: null,
        rules: "Fighting Ape can be equipped with two cymbals which it frenziedly beats together to the forbidding tune of Danse Macabre. Any enemy model within 6\" will be so disturbed by the sound that they suffer –1 BS penalty and –1 Ld penalty.",
        turnOrderRules: [
            { name: "Two Cymbals", rule: "Any enemy model within 6\" will be so disturbed by the sound that they suffer –1 BS penalty and –1 Ld penalty.", timing: ["2", "8"] }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Fighting Ape"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 487,
        category: "Miscellaneous Gear",
        name: "Dog Familiar",
        baseCost: 20,
        variableCost: "2d6",
        rules: [
            "Familiars are animals that share a special connection with a particular Wizard. Each Wizard may possess only one Familiar. While Familiars are considered equipment they are also living creatures. If one is taken Out Of Action during a battle then they roll for injuries as a Henchman. They do not, however, count towards maximum warband size or towards Rout Tests. If a Wizard’s Familiar dies or leaves then he may search for a replacement using rarity rules.",
            "M:6 WS:4 BS:0 S:3 T:3 W:1 I:4 A:1 LD:5 ",
            "Small Target: Models shooting at a Familiar suffer a -1 to their BS due to the small size of the target.",
            "Loyal: A Dog Familiar that remains within 6” of its wizard is immune to fear.",
            "Sniff: A Dog has a keen sense of smell and can be used to aid during exploration. The warband may roll one additional dice and may use the result of this dice rather than that of one of the surviving heroes."
        ],
        turnOrderRules: [
            { name: "Small Targe", rule: "Models shooting at a Familiar suffer a -1 to their BS due to the small size of the target.", timing: ["8"] },
            { name: "Loyal", rule: "A Dog Familiar that remains within 6” of its wizard is immune to fear.", timing: ["4", "5", "9"] },
            { name: "Sniff", rule: "The warband may roll one additional dice and may use the result of this dice rather than that of one of the surviving heroes.", timing: ["13"] }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 488,
        category: "Miscellaneous Gear",
        name: "Cat Familiar",
        baseCost: 20,
        variableCost: "2d6",
        rules: [
            "Familiars are animals that share a special connection with a particular Wizard. Each Wizard may possess only one Familiar. While Familiars are considered equipment they are also living creatures. If one is taken Out Of Action during a battle then they roll for injuries as a Henchman. They do not, however, count towards maximum warband size or towards Rout Tests. If a Wizard’s Familiar dies or leaves then he may search for a replacement using rarity rules.",
            "M:6 WS:4 BS:0 S:2 T:2 W:1 I:6 A:1 LD:5 ",
            "Small Target: Models shooting at a Familiar suffer a -1 to their BS due to the small size of the target.",
            "Go for the Eyes!: If both attacks successfully wound in one round then the enemy model is blinded and may not fight back until their next turn. If only one attack wounds then the affected model suffers a -1 to both WS & BS until the beginning of their next turn."
        ],
        turnOrderRules: [
            { name: "Small Targe", rule: "Models shooting at a Familiar suffer a -1 to their BS due to the small size of the target.", timing: ["8"] },
            { name: "Go for the Eyes!", rule: "If both attacks successfully wound in one round then the enemy model is blinded and may not fight back until their next turn. If only one attack wounds then the affected model suffers a -1 to both WS & BS until the beginning of their next turn.", timing: ["9"] }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 489,
        category: "Miscellaneous Gear",
        name: "Raven Familiar",
        baseCost: 20,
        variableCost: "2d6",
        rules: [
            "Familiars are animals that share a special connection with a particular Wizard. Each Wizard may possess only one Familiar. While Familiars are considered equipment they are also living creatures. If one is taken Out Of Action during a battle then they roll for injuries as a Henchman. They do not, however, count towards maximum warband size or towards Rout Tests. If a Wizard’s Familiar dies or leaves then he may search for a replacement using rarity rules.",
            "M:2 WS:2 BS:0 S:1 T:1 W:1 I:4 A:1 LD:5 ",
            "Small Target: Models shooting at a Familiar suffer a -1 to their BS due to the small size of the target.",
            "Fly: May fly up to 12” anywhere on the table.",
            "I see you!: Spells may be cast on models if they are within range of either the Wizard or the Raven. Therefore, a spell with a 12” range may be cast on models within 12” of either model."
        ],
        turnOrderRules: [
            { name: "Small Targe", rule: "Models shooting at a Familiar suffer a -1 to their BS due to the small size of the target.", timing: ["8"] },
            { name: "Fly", rule: "May fly up to 12” anywhere on the table.", timing: ["4"] },
            { name: "I see you!", rule: "Spells may be cast on models if they are within range of either the Wizard or the Raven. Therefore, a spell with a 12” range may be cast on models within 12” of either model.", timing: ["7"] }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 490,
        category: "Miscellaneous Gear",
        name: "Viper Familiar",
        baseCost: 20,
        variableCost: "2d6",
        rules: [
            "Familiars are animals that share a special connection with a particular Wizard. Each Wizard may possess only one Familiar. While Familiars are considered equipment they are also living creatures. If one is taken Out Of Action during a battle then they roll for injuries as a Henchman. They do not, however, count towards maximum warband size or towards Rout Tests. If a Wizard’s Familiar dies or leaves then he may search for a replacement using rarity rules.",
            "M:3 WS:4 BS:0 S:2 T:1 W:1 I:5 A:1 LD:5 ",
            "Small Target: Models shooting at a Familiar suffer a -1 to their BS due to the small size of the target.",
            "Poison: Should a Viper roll a 6 to hit, the attack automatically wounds with no armour save. Any other successful hit result on a target susceptible to poison will suffer a S4 hit. If the creature is immune to poison then treat the attack as S2.",
            "Coiled and Ready: A Viper is not easily caught unaware. A Viper has Lightning Reflexes."
        ],
        turnOrderRules: [
            { name: "Small Targe", rule: "Models shooting at a Familiar suffer a -1 to their BS due to the small size of the target.", timing: ["8"] },
            { name: "Poison", rule: "Should a Viper roll a 6 to hit, the attack automatically wounds with no armour save. Any other successful hit result on a target susceptible to poison will suffer a S4 hit. If the creature is immune to poison then treat the attack as S2.", timing: ["9"] },
            { name: "Coiled and Ready", rule: "If the Viper is charged it will 'strike first' against those that charged that turn. As the charger(s) will also normally 'strike first' (for charging), the order of attack between the charger(s) and the viper will be determined by comparing Initiative values.", timing: ["9"] }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    // POISONS & POTIONS
    {
        id: 37,
        category: "Poisons & Potions",
        name: "Black Lotus",
        baseCost: 10,
        variableCost: "D6",
        rules: "A weapon coated with the sap of the Black Lotus will wound its target automatically if you roll a 6 to hit. Note that you can still roll a dice for every wound inflicted in this way. If you roll a 6, you will inflict a critical hit with that roll. If you do not roll a 6, you will cause a normal wound. Take armour saves as normal.",
        turnOrderRules: [
            { name: "Poison", rule: "A weapon coated with the sap of the Black Lotus will wound its target automatically if you roll a 6 to hit.", timing: "9" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 9, "Skaven": 7, "Lizardmen": 7, "Skink": "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        cannotPurchase: ["Witch Hunters", "Protectorate Of Sigmar", "Sisters of Sigmar", "Battle Monks of Cathay", "Shadow Warriors"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {
                "Skink Priest": { baseCost: 10, variableCost: null },
                "Skink Great Crests": { baseCost: 10, variableCost: null }
            },
            specificHenchmen: {}
        }
    },
    {
        id: 40,
        category: "Poisons & Potions",
        name: "Crimson Shade",
        baseCost: 35,
        variableCost: "D6",
        rules: [
            "Effect: A model using Crimson Shade has his Initiative increased by +D3 points, and Movement and Strength by +1 (this effect lasts for one game). Crimson Shade has no effect on Undead such as Vampires and Zombies, or the Possessed.",
            "Side effects: After the battle, roll 2D6. On a roll of 2-3, the model becomes addicted and you must try to buy him a new batch of Crimson Shade before every battle from now on. If you fail to buy any, he will leave your warband. On a roll of 12 the model's Initiative is increased permanently by +1."
        ],
        turnOrderRules: [
            { name: "Potion Effect", rule: "A model using Crimson Shade has his Initiative increased by +D3 points, and Movement and Strength by +1 (this effect lasts for one game).", timing: ["4", "9"] },
            { name: "Potion Side Effect", rule: "After the battle, roll 2D6. On a roll of 2-3, the model becomes addicted and you must try to buy him a new batch of Crimson Shade before every battle from now on. If you fail to buy any, he will leave your warband. On a roll of 12 the model's Initiative is increased permanently by +1.", timing: "13" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        cannotPurchase: ["Battle Monks of Cathay", "Shadow Warriors"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 38,
        category: "Poisons & Potions",
        name: "Dark Venom",
        baseCost: 30,
        variableCost: "2D6",
        rules: "Any hit caused by a weapon coated with Dark Venom counts as having +1 Strength, so, for example, if a warrior with Strength 3 wielding a poisoned sword hits an opponent, he will cause a Strength 4 hit instead. Armour saving throws are modified to take into account the increased Strength of the attack.",
        turnOrderRules: [
            { name: "Poison", rule: "Any hit caused by a weapon coated with Dark Venom counts as having +1 Strength, so, for example, if a warrior with Strength 3 wielding a poisoned sword hits an opponent, he will cause a Strength 4 hit instead. Armour saving throws are modified to take into account the increased Strength of the attack..", timing: ["7", "9"] }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8, "Dark Elves": 6, "Lizardmen": 6, "Skink": "common" },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        cannotPurchase: ["Witch Hunters", "Warrior-Priests", "Sisters of Sigmar", "Battle Monks of Cathay", "Shadow Warriors"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {
                "Skink Priest": { baseCost: 20, variableCost: null },
                "Skink Great Crests": { baseCost: 20, variableCost: null }
            },
            specificHenchmen: {}
        }
    },
    {
        id: 39,
        category: "Poisons & Potions",
        name: "Bugman’s Ale",
        baseCost: 50,
        variableCost: "3D6",
        rules: [
            "A warband that drinks a barrel of Bugman's before a battle will be immune to fear for the whole of the battle.",
            "Elves may not drink Bugman's ale as they are far too delicate to cope with its effects.",
            "There is only enough ale to supply the warband for one battle."],
        turnOrderRules: [
            { name: "Immune to Fear", rule: "A warband that drinks a barrel of Bugman's before a battle will be immune to fear for the whole of the battle.", timing: ["3", "9"] }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 41,
        category: "Poisons & Potions",
        name: "Elven Wine",
        baseCost: 50,
        variableCost: "3D6",
        rules: "A Shadow Warrior Warband that drinks Elven Wine before a battle will be immune to fear for the whole of the battle.",
        turnOrderRules: [
            { name: "Immune to Fear", rule: "A Shadow Warrior Warband that drinks Elven Wine before a battle will be immune to fear for the whole of the battle.", timing: ["3", "9"] }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Shadow Warriors"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 536,
        category: "Poisons & Potions",
        name: "Birch Wine",
        baseCost: 55,
        variableCost: "3D6",
        rules: "A Wood Elf Warband that drinks Birch Wine before a battle will be immune to Fear and in addition immune to Stunned results for the whole of the battle. (One use only)",
        turnOrderRules: [
            { name: "Immune to Fear", rule: "A Wood Elf Warband that drinks Birch Wine before a battle will be immune to Fear", timing: ["3", "9"] },
            { name: "Immune to Stun", rule: "A Wood Elf Warband that drinks Birch Wine before a battle will be immune to Stun", timing: ["8", "9"] }
        ],
        grade: "3",
        modifierGeneral: 0,
        rarity: { base: 11 },
        restrictedWarbands: ["Asrai Wayfarer"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Asrai Wayfarer": { baseCost: 35, variableCost: null }
        }
    },
    {
        id: 42,
        category: "Poisons & Potions",
        name: "Healing Herbs",
        baseCost: 20,
        variableCost: "2D6",
        rules: "A Hero with healing herbs can use them at the beginning of any of his recovery phases as long as he is not engaged in hand-to-hand combat. This restores all wounds he has previously lost during the game.",
        turnOrderRules: [
            { name: "Heal", rule: "A Hero with healing herbs can use them at the beginning of any of his recovery phases as long as he is not engaged in hand-to-hand combat. This restores all wounds he has previously lost during the game.", timing: "2" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8, "Amazons (Lustria)": "common", "Asrai Wayfarer": 7 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        },
        pregameCostModifiers: {
            "Asrai Wayfarer": { baseCost: 25, variableCost: null }
        }
    },
    {
        id: 44,
        category: "Poisons & Potions",
        name: "Mad Cap Mushrooms",
        baseCost: 30,
        variableCost: "3D6",
        rules: [
            "Common Rarity if Warband Includes Goblins",
            "Effect: Any warrior who takes Mad Cap Mushrooms before a battle will be subject to frenzy. The Mad Cap Mushroom has no effect on Undead such as Vampires and Zombies, or the Possessed.",
            "Side effect: After the battle, roll a D6. On a roll of a 1 the model becomes permanently stupid."
        ],
        turnOrderRules: [
            { name: "Potion Effect", rule: "Any warrior who takes Mad Cap Mushrooms before a battle will be subject to frenzy. The Mad Cap Mushroom has no effect on Undead such as Vampires and Zombies, or the Possessed.", timing: ["4", "9"] },
            { name: "Potion Side Effect", rule: "After the battle, roll a D6. On a roll of a 1 the model becomes permanently stupid.", timing: "13" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {
                "Orc Mob": { baseCost: 25, variableCost: null }
            },
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 43,
        category: "Poisons & Potions",
        name: "Mandrake Root",
        baseCost: 25,
        variableCost: "D6",
        rules: [
            "Effect: Mandrake Root makes a man almost oblivious to pain. His Toughness is increased by +1 for the duration of a battle and he treats all stunned results as knocked down instead. Mandrake Root has no effect on Undead, such as Vampires and Zombies, or on the Possessed.",
            "Side effects: Mandrake Root is highly poisonous. At the end of the battle, roll 2D6. On a roll of 2-3 the model loses 1 point of Toughness permanently."
        ],
        turnOrderRules: [
            { name: "Potion Effect", rule: "Mandrake Root makes a man almost oblivious to pain. His Toughness is increased by +1 for the duration of a battle and he treats all stunned results as knocked down instead. Mandrake Root has no effect on Undead, such as Vampires and Zombies, or on the Possessed.", timing: ["8", "9"] },
            { name: "Potion Side Effect", rule: "Mandrake Root is highly poisonous. At the end of the battle, roll 2D6. On a roll of 2-3 the model loses 1 point of Toughness permanently.", timing: "13" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 196,
        category: "Poisons & Potions",
        name: "Manticore Spoor",
        baseCost: 30,
        variableCost: "2D6",
        rules: "Any model wounded by a weapon smeared with Manticore Spoor must roll a D6 at the beginning of its turn: On a roll of 1 the poisoned model loses one wound. On a roll of 6 the poison's effect ends and the model has to test no more. Multiple wounds caused by a weapon using Manticore Spoor do not cause the victim to test more than once per turn.",
        turnOrderRules: [
            { name: "Manticore Spoor", rule: "Any model wounded by a weapon smeared with Manticore Spoor must roll a D6 at the beginning of its turn: On a roll of 1 the poisoned model loses one wound. On a roll of 6 the poison's effect ends and the model has to test no more. Multiple wounds caused by a weapon using Manticore Spoor do not cause the victim to test more than once per turn.", timing: "2" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 563,
        category: "Poisons & Potions",
        name: "Reptile Venom",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Skink henchmen may buy low-strength Reptile Venom for their missile weapons at a cost of 5 pts per weapon.",
            "This adds +1 to the Strength of the weapon but does not grant the -1 save modifier.",
            "The poison only lasts for one battle and remember that all the henchmen in a group must be armed in the same manner."
        ],
        turnOrderRules: [
            { name: "Poison", rule: "This adds +1 to the Strength of the weapon but does not grant the -1 save modifier.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "Common" },
        restrictedWarbands: ["Lizardmen"],
        restrictedHeroTypes: ["hero"],
        restrictedRaces: ["Skink"],
        cannotPurchase: ["Battle Monks of Cathay", "Shadow Warriors"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 209,
        category: "Poisons & Potions",
        name: "Spider Spittle",
        baseCost: 30,
        variableCost: "D6",
        rules: "Any warrior hit by a weapon laced with Spider Spittle must pass an immediate Toughness test or becomes paralyzed. A paralyzed warrior cannot move or fight and is hit automatically in close combat. The model remains paralyzed until it passes a Toughness test in its recovery phase.",
        turnOrderRules: [
            { name: "Poison", rule: "Any warrior hit by a weapon laced with Spider Spittle must pass an immediate Toughness test or becomes paralyzed. A paralyzed warrior cannot move or fight and is hit automatically in close combat. The model remains paralyzed until it passes a Toughness test in its recovery phase.", timing: "9" }
        ],
        grade: "1c", modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        cannotPurchase: ["Battle Monks of Cathay", "Shadow Warriors"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 213,
        category: "Poisons & Potions",
        name: "Tears of Shallaya",
        baseCost: 10,
        variableCost: "2D6",
        rules: [
            "A model who drinks a vial of the Tears of Shallaya at the beginning of a battle will be completely immune to all poisons for the duration of combat. Undead and Possessed warriors may not use the Tears of Shallaya.",
            "There is enough liquid in a vial of the Tears of Shallaya to last for the duration of one battle."
        ],
        turnOrderRules: [
            { name: "Immune to poisons", rule: "A model who drinks a vial of the Tears of Shallaya at the beginning of a battle will be completely immune to all poisons for the duration of combat.", timing: "1" }
        ],
        grade: "core",
        modifierGeneral: 0,
        rarity: { base: 7 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        cannotPurchase: ["Cult of the Possessed", "Undead"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 216,
        category: "Poisons & Potions",
        name: "Vial of Pestilens",
        baseCost: 25,
        variableCost: "2D6",
        rules: "The vial may be opened and shoved in the face of the model in base contact that just took the Skaven Out of Action. The opponent must roll equal to or under its Toughness or automatically be taken Out of Action, no save is allowed. If the opponent succumbs to the disease, he didn't manage to go through with the attack and the Skaven is only Stunned not Out of Action. The vial may be used once.",
        turnOrderRules: [
            { name: "Poison", rule: "The vial may be opened and shoved in the face of the model in base contact that just took the Skaven Out of Action. The opponent must roll equal to or under its Toughness or automatically be taken Out of Action, no save is allowed. If the opponent succumbs to the disease, he didn't manage to go through with the attack and the Skaven is only Stunned not Out of Action. The vial may be used once.", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: 9 },
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: ["Skaven"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 233,
        category: "Mutations",
        name: "Daemon Soul",
        baseCost: 20,
        variableCost: null,
        rules: "A Daemon lives within the mutant’s soul. This gives him a 4+ save against the effects of spells or prayers.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["8"],
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants", "Packmaster", "Stormvermin", "Apprentice"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 234,
        category: "Mutations",
        name: "Great Claw",
        baseCost: 50,
        variableCost: null,
        rules: "One of the mutant’s arms ends in a great, crab-like claw. He may carry no weapons in this arm, but gains an extra attack in hand-to-hand combat with a +1 Strength bonus.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["9", "12"],
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed", "Court of the Profane Pleasures"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants", "Slaaneshi Whipmaster", "Slaaneshi Danseuse", "Slaaneshi Flesh Merchant", "Slaaneshi Priest of Obscene", "Slaaneshi Devout"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 235,
        category: "Mutations",
        name: "Cloven Hoofs",
        baseCost: 40,
        variableCost: null,
        rules: "The warrior gains +1 Movement.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["4"],
        characteristicModifiers: { M: 1 },
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 236,
        category: "Mutations",
        name: "Tentacle",
        baseCost: 35,
        variableCost: null,
        rules: "One of the mutant’s arms ends in a tentacle. He may grapple his opponent in close combat to reduce his attacks by -1, down to a minimum of 1. The mutant may decide which attack his opponent loses.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed", "Court of the Profane Pleasures"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants", "Slaaneshi Whipmaster", "Slaaneshi Danseuse", "Slaaneshi Flesh Merchant", "Slaaneshi Priest of Obscene", "Slaaneshi Devout"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 237,
        category: "Mutations",
        name: "Blackblood",
        baseCost: 30,
        variableCost: null,
        rules: "If the model loses a wound in close combat, anyone in base contact with the model suffers a Strength 3 hit (no critical hits) from the spurting corrosive blood.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 238,
        category: "Mutations",
        name: "Spines",
        baseCost: 35,
        variableCost: null,
        rules: "Any model in base contact with the mutant suffers an automatic Strength 1 hit at the beginning of each close combat phase. Spines will never cause critical hits.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 239,
        category: "Mutations",
        name: "Scorpion Tail",
        baseCost: 40,
        variableCost: null,
        rules: "The mutant has a long barbed tail with a venomed tip, allowing him to make an extra Strength 5 attack in each hand-to-hand combat phase. If the model hit by the tail is immune to poison, the Strength of the hit is reduced to 2.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 240,
        category: "Mutations",
        name: "Extra Arm",
        baseCost: 40,
        variableCost: null,
        rules: "The mutant may use any single-handed weapon in the extra arm, giving him +1 attack when fighting in hand-to-hand combat. Alternatively, he may carry a shield or a buckler in the extra arm. If a Possessed chooses to do this, he gains an extra attack but still cannot carry a weapon.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed", "Court of the Profane Pleasures"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants", "Slaaneshi Whipmaster", "Slaaneshi Danseuse", "Slaaneshi Flesh Merchant", "Slaaneshi Priest of Obscene", "Slaaneshi Devout"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 241,
        category: "Mutations",
        name: "Hideous",
        baseCost: 40,
        variableCost: null,
        rules: "The mutant causes fear.",
        grade: "core",
        modifierGeneral: 0,
        timing: ["3", "9"],
        rarity: "common",
        restrictedWarbands: ["Cult of the Possessed"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Chaos Centaur", "Ungor Trapper", "Possessed", "Mutants"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 242,
        category: "Blessings of Nurgle",
        name: "Stream of Corruption",
        baseCost: 25,
        variableCost: null,
        rules: "The Tainted One can spew forth a grotesque stream of maggots, entrails and filth. This is counted as a shooting attack with a range of 6\" and is resolved at Strength 3 with no saves for armour.",
        grade: "1A",
        modifierGeneral: 0,
        timing: ["7"],
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 243,
        category: "Blessings of Nurgle",
        name: "Nurgle’s Rot",
        baseCost: 50,
        variableCost: null,
        rules: "The Tainted One is immune to all poisons. Nurgle’s Rot is a deadly contagion for which there is no known cure. This virulent disease can be passed on in hand-to-hand combat. If the Tainted One makes a successful to wound roll of 6 this will result in the target model contracting the Rot (note: Nurgle’s Rot only affects the living, so Undead, Daemons and the Possessed are immune). Once a warrior has contracted the Rot, mark this on the warband roster. Rather than killing the victim immediately, the Rot can take some time to set in. From now on, before the start of each battle, the warrior must pass a Toughness test. If successful, his constitution has managed to stave off the Rot’s effects. If unsuccessful, the warrior loses one point of Toughness permanently (if he reaches zero, he has succumbed to the Rot and died, remove him from the roster). In addition, if a 6 is rolled for the Toughness test then he has unwittingly passed the Rot on to another member of the warband (randomly allocate a warband member and mark this on the roster).",
        grade: "1A",
        modifierGeneral: 0,
        timing: ["12", "13"],
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 244,
        category: "Blessings of Nurgle",
        name: "Cloud of Flies",
        baseCost: 25,
        variableCost: null,
        rules: "The Tainted One is surrounded by a cloud of flies, which buzz around him and his combat opponent. They do not affect the Tainted One but distract foes by buzzing into eyes, nostrils and mouths. The Tainted One’s close combat opponent suffers a -1 to hit modifier on all attacks.",
        grade: "1A",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 245,
        category: "Blessings of Nurgle",
        name: "Bloated Foulness",
        baseCost: 40,
        variableCost: null,
        rules: "The Tainted One is a huge, disgusting mass of diseased, flabby folds. It gains +1 Wound and +1 Toughness but has its Movement reduced by -1.",
        grade: "1A",
        modifierGeneral: 0,
        timing: ["12"],
        characteristicModifiers: { W: 1, T: 1, M: -1 },
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 246,
        category: "Blessings of Nurgle",
        name: "Mark of Nurgle",
        baseCost: 35,
        variableCost: null,
        rules: "The Tainted One is burned with the great mark of Nurgle, the three spheres, that weep foul pus constantly. It gains +1 Wound and is immune to all poisons.",
        grade: "1A",
        modifierGeneral: 0,
        timing: ["12"],
        characteristicModifiers: { W: 1 },
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 247,
        category: "Blessings of Nurgle",
        name: "Hideous",
        baseCost: 40,
        variableCost: null,
        rules: "The Tainted One is so disgusting that its flesh hangs in tatters from its body and its entrails are rotten and exposed. It causes Fear.",
        grade: "1A",
        modifierGeneral: 0,
        timing: ["3", "9"],
        rarity: "common",
        restrictedWarbands: [],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    //Lizardmen Sacred Markings
    {
        id: 249,
        category: "Sacred Markings",
        name: "Oversized Jaws",
        baseCost: 40,
        variableCost: null,
        rules: "The Hero may make his bite attack with +1 Strength",
        grade: "1B",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: ["Lizardmen"],
        restrictedHeroTypes: [],
        restrictedRaces: ["Saurus"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 250,
        category: "Sacred Markings",
        name: "Poison Glands",
        baseCost: 40,
        variableCost: null,
        rules: "May choose to make any number of attacks with teeth instead of weapons; these attacks are treated just like a Saurus bite attack. These attacks at +1 save modifier, regardless of the Strength of the Skinks, in addition add +1 to the roll on the Injury table as well.",
        grade: "1B",
        modifierGeneral: 0,
        timing: ["9"],
        rarity: "common",
        restrictedWarbands: ["Lizardmen"],
        restrictedHeroTypes: [],
        restrictedRaces: ["Skink"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 251,
        category: "Sacred Markings",
        name: "Mark of the Old Ones",
        baseCost: 50,
        variableCost: null,
        rules: "The Hero may change one of his failed dice rolls into a successful one; this mark may only be used once per battle and only on actions that the Hero is making himself. You may use this mark on a failed Rout test if you wish.",
        grade: "1B",
        modifierGeneral: 0,
        timing: ["12"],
        rarity: "common",
        restrictedWarbands: ["Lizardmen"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },


    //Dark Elf Blade
    {
        id: 29,
        category: "Dark Elf Dagger",
        name: "Dagger",
        baseCost: 17,
        variableCost: null,
        rules: [
            "6+ Save bonus",
            "+1 to critical hit results",
            "2-4 on injury table is Stunned"
        ],
        turnOrderRules: [
            { name: "Dark Elf Blade Dagger", rule: "6+ Save bonus, +1 to critical hit results, 2-4 on injury table is Stunned", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Dark Elves", "Druchii"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 34,
        category: "Dark Elf Sword",
        name: "Sword",
        baseCost: 25,
        variableCost: null,
        rules: [
            "May parry",
            "+1 to critical hit results",
            "2-4 on injury table is Stunned"
        ],
        turnOrderRules: [
            { name: "Dark Elf Blade Sword", rule: "May Parry, +1 to critical hit results, 2-4 on injury table is Stunned", timing: "9" }
        ],
        grade: "1b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Dark Elves", "Druchii"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    //Lords Boon
    {
        id: 298,
        category: "Lords Boon",
        name: "Lords Boon Armour; Light",
        baseCost: 10,
        variableCost: null,
        rules: "Save: 6+ basic save.",
        grade: "core",
        modifierGeneral: -1,
        isPrimaryArmour: true,
        rarity: "common",
        restrictedWarbands: ["Bretonnian Chapel Guard"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 299,
        category: "Lords Boon",
        name: "Lords Boon Armour; Heavy",
        baseCost: 25,
        variableCost: null,
        rules: "Save: 5+ basic save. -1 Movement penalty with shield.",
        grade: "core",
        modifierGeneral: -2,
        isPrimaryArmour: true,
        rarity: "common",
        restrictedWarbands: ["Bretonnian Chapel Guard"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 300,
        category: "Lords Boon",
        name: "Lords Boon Warhorse",
        baseCost: 40,
        variableCost: null,
        rules: "M8 WS3 S4 T3 W1 I3 A1 Ld5.",
        grade: "core",
        modifierGeneral: -1,
        rarity: { base: 11 },
        restrictedWarbands: ["Bretonnian Chapel Guard"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    //Lustrian Reavers WarBeasts
    {
        id: 427,
        category: "War Beasts",
        name: "Estalian Warhound",
        allowed: "0-2",
        stats: { "M": 6, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
        baseCost: 25,
        variableCost: null,
        rules: "5+ armour save: Beastmasters raise savage Estalian warhounds: giant beasts trained to bring down any prey or enemy, and protected by padded armour to ward off arrows and iron collars against blades.",
        grade: "1C",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        allowedSpecificHeroes: ["Beastmaster"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 428,
        category: "War Beasts",
        name: "Barbary Monkey",
        allowed: "0-1",
        stats: { "M": 6, "WS": 4, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 5, "A": 2, "Ld": 6 },
        baseCost: 40,
        variableCost: null,
        rules: "Nimble: Can climb any sheer surfaces without taking Initiative tests. Can re-roll all failed Diving Charge tests. The Monkey can enter buildings unlike other animals. Due to its agility, the Monkey also has a 5+ Ward save which it can take against any and all wounds it suffers in Melee combat or from shooting/magic or even falling damage.",
        grade: "1C",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        allowedSpecificHeroes: ["Beastmaster"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 429,
        category: "War Beasts",
        name: "Tilean Hunting Hawk",
        allowed: "0-1",
        stats: { "M": 12, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 0, "I": 5, "A": 1, "Ld": 0 },
        baseCost: 30,
        variableCost: null,
        rules: "Part of the Equipment. Acts at the same time as the Beastmaster. Can attack any enemy within 12” as a melee attack, even those out of line of sight (unless Hidden), and return to the Beastmaster immediately. The hawk cannot be targeted separately by any attack or spell. The Hawk does not attack if the Beastmaster is engaged in hand-to-hand combat, being too busy to command the hawk!",
        grade: "1C",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lustrian Reavers"],
        allowedSpecificHeroes: ["Beastmaster"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    //Lustrian Reavers WarBeasts
    {
        id: 430,
        category: "Mark of Chaos - Leader",
        name: "Mark of Chaos Undivided",
        baseCost: 0,
        variableCost: null,
        rules: "All warband members within the leader rule's radius may re-roll all failed Ld tests.",
        grade: "1C",
        modifierGeneral: 0,
        timing: ["2"],
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        specialRulePrereq: ["Leader"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 431,
        category: "Mark of Chaos - Seer",
        name: "Mark of Chaos Undivided",
        baseCost: 0,
        variableCost: null,
        rules: "With the Seer of Chaos Undivided as the tribe's spiritual leader the warband may include 0-3 Gors (see Beastmen Raiders) that count towards the maximum of 15 members. Re-roll all results of ‘The lad’s got talent’ for them.",
        grade: "1C",
        modifierGeneral: 0,
        timing: ["2"],
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Seer"],
        grantsMagic: ["Chaos Rituals"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 432,
        category: "Mark of Chaos - Leader",
        name: "Mark of Arkhar the Dog",
        baseCost: 0,
        variableCost: null,
        rules: [
            "The Hero is subject to frenzy from now on.",
            "Any spell that targets the Hero fails on a roll of 4+"],
        turnOrderRules: [
            { name: "Frenzy", rule: "The Hero is subject to frenzy from now on.", timing: ["4", "9"] },
            { name: "Spell Save", rule: "Any spell that targets the Hero fails on a roll of 4+", timing: "8" }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        specialRulePrereq: ["Leader"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 433,
        category: "Mark of Chaos - Seer",
        name: "Mark of Arkhar the Dog",
        baseCost: 0,
        variableCost: null,
        rules: [
            "A Seer with the mark of Arkhar counts as a Bloodfather. A Bloodfather is a war-priest and cannot cast spells. Instead he communes with daemons and his almighty deity through visions.",
            "Take a Leadership test each time a Bloodfather takes an enemy out of action in hand-to-hand combat. If the test is passed add +1 to the Weapons Skill, Strength, Toughness or Initiative of the war-priest until the end of the battle. Each characteristic can be increased only once in this way."
        ],
        turnOrderRules: [
            { name: "BloodFather", rule: "Take a Leadership test each time a Bloodfather takes an enemy out of action in hand-to-hand combat. If the test is passed add +1 to the Weapons Skill, Strength, Toughness or Initiative of the war-priest until the end of the battle. Each characteristic can be increased only once in this way.", timing: ["9"] }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Seer"],
        grantsMagic: [],
        grantsSKillCat: ["Strength"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 434,
        category: "Mark of Chaos - Leader",
        name: "Mark of Tchar the Eagle",
        baseCost: 0,
        variableCost: null,
        rules: [
            "The Hero is capable of casting spells and immediately learns one random spell from the Tchar Rituals.",
            "However, he suffers –1 on all rolls for Difficulty unless he was a wizard before."
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        specialRulePrereq: ["Leader"],
        grantsMagic: ["Tchar Rituals"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 435,
        category: "Mark of Chaos - Seer",
        name: "Mark of Tchar the Eagle",
        baseCost: 0,
        variableCost: null,
        rules: [
            "A Seer of Tchar has command of powerful sorcery. The sorcerer starts with two spells from the Tchar Rituals. One can be chosen freely, the second is randomly determined."
        ],
        turnOrderRules: [],
        grade: "1C",
        modifierGeneral: 0,
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        specialRulePrereq: [],
        allowedSpecificHeroes: ["Seer"],
        grantsMagic: ["Tchar Rituals"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 436,
        category: "Mark of Chaos - Leader",
        name: "Mark of Onogal the Crow",
        baseCost: 0,
        variableCost: null,
        rules: [
            "The Hero gets +1 T",
            "May re-roll on the Serious Injuries table once.",
            "Immune to poison."
        ],
        turnOrderRules: [
            { name: "Immune to Poison", rule: "Immune to poison", timing: ["8", "9"] },
            { name: "Re-Roll on Injury Table", rule: "May re-roll on the Serious Injuries table once.", timing: ["13"] }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: "common",
        characteristicModifiers: { T: 1 },
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        specialRulePrereq: ["Leader"],
        grantsMagic: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 437,
        category: "Mark of Chaos - Seer",
        name: "Mark of Onogal the Crow - Seer",
        baseCost: 0,
        variableCost: null,
        rules: "The Seer can use Onogal Rituals",
        grade: "1C",
        modifierGeneral: 0,
        timing: [],
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Seer"],
        grantsMagic: ["Onogal Rituals"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 438,
        category: "Mark of Chaos - Leader",
        name: "Mark of Shornaal the Serpent",
        baseCost: 0,
        variableCost: null,
        rules: [
            "Enemy models that are not immune to psychology cannot attack the Hero in close combat unless they pass a Ld test with 3D6, discarding the lowest D6 result. If the roll is failed, these models are hit automatically in close combat. Once they pass, they do not have to test again for the duration of the battle. Note that the Lizardman’s Cold Blooded special rule cannot be applied to this effect."
        ],
        turnOrderRules: [
            { name: "Psychology Check", rule: "Enemy models that are not immune to psychology cannot attack the Hero in close combat unless they pass a Ld test with 3D6, discarding the lowest D6 result. If the roll is failed, these models are hit automatically in close combat. Once they pass, they do not have to test again for the duration of the battle. Note that the Lizardman’s Cold Blooded special rule cannot be applied to this effect.", timing: ["9"] }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        specialRulePrereq: ["Leader"],
        grantsMagic: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 439,
        category: "Mark of Chaos - Seer",
        name: "Mark of Shornaal the Serpent",
        baseCost: 0,
        variableCost: null,
        rules: [
            "The Seer can use Shornaal Rituals",
            "If the Seer wasn't taken out of action during the battle, instead of searching for rare items he may brew a strong drink for the warband (treat as Bugman's Ale). Note that this item cannot be sold."
        ],
        turnOrderRules: [
            { name: "Brew Potion", rule: "If the Seer wasn't taken out of action during the battle, instead of searching for rare items he may brew a strong drink for the warband (treat as Bugman's Ale). Note that this item cannot be sold.", timing: ["13"] }
        ],
        grade: "1C",
        modifierGeneral: 0,
        rarity: "common",
        restrictedWarbands: ["Marauders of Chaos (The Norse)"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: ["Seer"],
        grantsMagic: ["Shornaal Rituals"],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    //Cursed Masks
    {
        id: 445,
        category: "Cursed Masks",
        name: "Sun King Mask",
        baseCost: 70,
        variableCost: null,
        rules: "Golden mask fashioned to the likeness of the emperors of old adorned with a crown of laurels. The mask symbolizes the hidden wish of the house of Steinhardt to betray the Empire and rise to the throne of Sigmar in Altdorf. None wearing this mask can be brought to his knees, as fitting to an Emperor. The warrior Wearing the Sun King Mask cannot be knocked down or Stunned, and these results on the Injury Chart have no effect. The only way to bring to remove him from combat is to roll so that he is taken Out of Action. Aristocrat only.",
        turnOrderRules: [
            { name: "Sun King Mask", rule: "The warrior Wearing the Sun King Mask cannot be knocked down or Stunned, and these results on the Injury Chart have no effect. The only way to bring to remove him from combat is to roll so that he is taken Out of Action.", timing: ["8", "9"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "Common" },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: ["henchman"],
        allowedSpecificHeroes: ["Aristocrat"],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 446,
        category: "Cursed Masks",
        name: "Silver Death Mask",
        baseCost: 50,
        variableCost: null,
        rules: "This mask appears as an ornately decorated skull, and yet it animates as skin of a living man, matching the expressions of the wearer beneath it. If the Hero wearing the Silver Mask is taken Out of Action, he may reroll any result on a Serious Injury chart. He must accept the second result even if it is worse than the previous roll. Only one Silver Death Mask per Warband.",
        turnOrderRules: [
            { name: "Silver Death Mask", rule: "If the Hero wearing the Silver Mask is taken Out of Action, he may reroll any result on a Serious Injury chart. He must accept the second result even if it is worse than the previous roll. ", timing: ["13"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "Common" },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: ["henchman"],
        allowedSpecificHeroes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 447,
        category: "Cursed Masks",
        name: "Fish Head Mask",
        baseCost: 60,
        variableCost: null,
        rules: "A disturbing silver mask with studded jeweled eyes liked to a fish from the depths of the Great Ocean. It is whispered that such masks were once used by worshippers of forgotten evil deities that slumber deep beneath the sea, dreaming of the day when they rise from the depths to bring ruin to men. A man wearing this mask can swallow a human whole as snake swallows a rat. Every time the wearer of the Fish Head Mask takes an opponent Out of Action he gains a wound that can take his number of wounds to a maximum of 5 and lasts until the end of the battle when his number of Wounds returns to normal.",
        turnOrderRules: [
            { name: "Fish Head Mask", rule: "Every time the wearer of the Fish Head Mask takes an opponent Out of Action he gains a wound that can take his number of wounds to a maximum of 5 and lasts until the end of the battle when his number of Wounds returns to normal.", timing: ["7", "9"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "Common" },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: ["henchman"],
        allowedSpecificHeroes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 448,
        category: "Cursed Masks",
        name: "Faceless Mask",
        baseCost: 30,
        variableCost: null,
        rules: "This mask has little if any human features, save for two eye slits filled with nothing but blackness. He can move with utter purpose that none dare to stop. The warrior wearing the Faceless Mask may stop one model from Intercepting his charge once per game. Models immune to psychology such as Undead and Flagellants are unaffected by this.",
        turnOrderRules: [
            { name: "Faceless Mask", rule: "The warrior wearing the Faceless Mask may stop one model from Intercepting his charge once per game. Models immune to psychology such as Undead and Flagellants are unaffected by this.", timing: ["5"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "Common" },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: ["henchman"],
        allowedSpecificHeroes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 449,
        category: "Cursed Masks",
        name: "Plague Doctor Mask",
        baseCost: 70,
        variableCost: null,
        rules: "A silver mask with long, bird-like beak, it is a very symbol of death to people of Old World ravaged by the many diseases. In battle a cloud of black death billows forth from the empty eye sockets of the Mask. Once per game, in the shooting phase, the wearer may unleash the black cloud from within the mask, burning those not part of the Cavalcade. The longer the power is held within the mask, the more potent its effect will be. On the first turn it hits any enemy model within 3\" of the wearer at Strength 1, and the distance and the Strength of the effect increases by 1 in the beginning of each turn of the Cavalcade, up to range of 7\" and Strength 5 if you wait for 4 turns before releasing the cloud. Roll to hit (with no penalties for range or cover) and to wound as usual. It does not cause critical hits.",
        turnOrderRules: [
            { name: "Plague Doctor Mask", rule: "The longer the power is held within the mask, the more potent its effect will be. On the first turn it hits any enemy model within 3\" of the wearer at Strength 1, and the distance and the Strength of the effect increases by 1 in the beginning of each turn of the Cavalcade, up to range of 7\" and Strength 5 if you wait for 4 turns before releasing the cloud. Roll to hit (with no penalties for range or cover) and to wound as usual. It does not cause critical hits.", timing: ["7"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "Common" },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: ["henchman"],
        allowedSpecificHeroes: ["Twisted Scholar"],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 450,
        category: "Cursed Masks",
        name: "Evil Jester Mask",
        baseCost: 45,
        variableCost: null,
        rules: "Erratic and unpredictable. The face of the Evil Jester mask twists into either a manic grin, a gaze of pure hatred or terrifying rage before each battle. In the beginning of the battle roll D6: on a roll of 1 the warrior is subject to Stupidity for the duration of the battle. On a roll of 2-5, the warrior hates all the enemies during the battle. On a roll of 6, the warrior is affected by the rules of Frenzy.",
        turnOrderRules: [
            { name: "Evil Jester Mask", rule: "In the beginning of the battle roll D6: on a roll of 1 the warrior is subject to Stupidity for the duration of the battle. On a roll of 2-5, the warrior hates all the enemies during the battle. On a roll of 6, the warrior is affected by the rules of Frenzy.", timing: ["1", "4", "9"] }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: "Common" },
        restrictedWarbands: ["The Cursed Cavalcade"],
        restrictedHeroTypes: ["henchman"],
        allowedSpecificHeroes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    //Nipponese Expedition
    {
        id: 521,
        category: "Close Combat",
        name: "Tanto",
        baseCost: 2,
        variableCost: null,
        rules: [
            "An enemy wounded by a Tanto gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally."
        ],
        turnOrderRules: [
            { name: "+1 Enemy armour save", rule: "An enemy wounded by a Tanto gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 522,
        category: "Close Combat",
        name: "Wakizashi",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Parry: Wakizashi offer an excellent balance of defence and offence. A model armed with a Wakizashi may parry blows. When his opponent rolls to hit, the model armed with a Wakizashi may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Parry: Wakizashi offer an excellent balance of defence and offence. A model armed with a Wakizashi may parry blows. When his opponent rolls to hit, the model armed with a Wakizashi may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength – they are simply too powerful to be stopped.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 523,
        category: "Close Combat",
        name: "Katana",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Strength +1",
            "Two-handed: A model armed with a Katana may not use a shield, buckler or additional weapon in close combat. It gets an additional +1 armour save bonus against ranged attacks if it carries a shield.",
            "Parry: Katana, despite their great size, can be used for parrying like a sword. When his opponent rolls to hit, the model armed with it may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength - they are simply too powerful to be stopped."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "Katana, despite their great size, can be used for parrying like a sword. When his opponent rolls to hit, the model armed with it may roll a D6. If the score is greater than the highest to hit score of his opponent, the model has parried the blow, and that attack is discarded. A model may not parry attacks made with double or more its own Strength - they are simply too powerful to be stopped.", timing: "9" },
            { name: "Strength +1", rule: "Strength +1", timing: "9" }
        ],
        grade: "1c",
        modifierGeneral: 0,
        rarity: { base: 10 },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 524,
        category: "Close Combat",
        name: "Yari",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Strike first: A warrior with a Yari 'strikes first' in the first turn of hand-to-hand combat.",
            "Cavalry bonus: If using the rules for mounted models, a mounted warrior armed with a Yari receives a +1 Strength bonus when he charges. This bonus only applies for that turn.",
            "Unwieldy: A warrior with a Yari may only use a shield or a buckler in his other hand. He may not use a second weapon."
        ],
        turnOrderRules: [
            { name: "Strike first", rule: "A warrior with a Yari 'strikes first' in the first turn of hand-to-hand combat.", timing: "9" },
            { name: "Cavalry bonus", rule: "If using the rules for mounted models, a mounted warrior armed with a Yari receives a +1 Strength bonus when he charges. This bonus only applies for that turn.", timing: "4" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 525,
        category: "Close Combat",
        name: "Naginata",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Strength +1",
            "Two-handed: A model armed with a Naginata may not use a shield, buckler or additional weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 526,
        category: "Close Combat",
        name: "Kanabo",
        baseCost: 15,
        variableCost: null,
        rules: [
            "Strength +1",
            "Two-handed: A model armed with a Kanabo may not use a shield, buckler or additional weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting.",
            "Concussion: Kanabo weapons are excellent to use for striking your enemy senseless. When using a Kanabo, a roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries."
        ],
        turnOrderRules: [
            { name: "Strength +1", rule: "Strength +1", timing: "9" },
            { name: "Concussion", rule: "When using a Kanabo, a roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 527,
        category: "Missile Weapon",
        name: "Hankyu",
        baseCost: 5,
        variableCost: null,
        rules: [
            "Range 16\"",
            "Strength 3"
        ],
        turnOrderRules: [
            { name: "Range 16\"", rule: "Range 16\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 528,
        category: "Missile Weapon",
        name: "Yumi",
        baseCost: 10,
        variableCost: null,
        rules: [
            "Range 24\"",
            "Strength 3"
        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 3", rule: "Strength 3", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 529,
        category: "Blackpowder",
        name: "Teppo",
        baseCost: 35,
        variableCost: null,
        rules: [
            "Range 24\"",
            "Strength 4",
            "Move or fire: You may not move and fire a Teppo in the same turn, other than to pivot on the spot to face your target or stand up.",
            "Save Modifier: Teppos are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a Teppo must take its armour save with a -2 modifier.",
            "Prepare Shot: Prepare shot: A Teppo takes a complete turn to reload, so you may only fire it every other turn."
        ],
        turnOrderRules: [
            { name: "Range 24\"", rule: "Range 24\"", timing: "7" },
            { name: "Strength 4", rule: "Strength 4", timing: "7" },
            { name: "Move or fire:", rule: "You may not move and fire a Teppo in the same turn, other than to pivot on the spot to face your target or stand up.", timing: ["4", "7"] },
            { name: "Save Modifier", rule: "Teppos are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a Teppo must take its armour save with a -2 modifier.", timing: "7" },
            { name: "Prepare Shot", rule: "May only fire it every other turn", timing: "7" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: {
            base: 8
        },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 530,
        category: "Armour",
        name: "Sashimono",
        baseCost: 15,
        variableCost: null,
        rules: [
            "A model wearing a Sashimono can re-roll all non-rout related leadership checks but must keep the second roll."
        ],
        turnOrderRules: [
            { name: "Re-Roll Leadership", rule: "Can re-roll all non-rout related leadership checks but must keep the second roll.", timing: ["4", "5", "9"] },
        ],
        grade: "2a",
        modifierGeneral: 0,
        isPrimaryArmour: false,
        rarity: {
            base: "common"
        },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 531,
        category: "Close Combat",
        name: "Nagamaki",
        baseCost: 75,
        variableCost: "2D6",
        rules: [
            "Mastercrafted: Attacks made with a Nagamaki give the bearer +1 Initiative and +1 Weapon Skill."
        ],
        turnOrderRules: [
            { name: "Mastercrafted", rule: "Mastercrafted: Attacks made with a Nagamaki give the bearer +1 Initiative and +1 Weapon Skill.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 12 },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 532,
        category: "Armour",
        name: "Horo",
        baseCost: 10,
        variableCost: null,
        rules: [
            "A model wearing a horo receives a +1 to all armor saves, (6+ if no armor is worn) against ranged weapons, as long as they are mounted on a horse or warhorse"
        ],
        turnOrderRules: [
            { name: "Ranged Armour", rule: "Receives a +1 to all armor saves, (6+ if no armor is worn) against ranged weapons, as long as they are mounted on a horse or warhorse", timing: ["8"] },
        ],
        grade: "2a",
        modifierGeneral: 0,
        isPrimaryArmour: false,
        rarity: {
            base: 6
        },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        allowedSpecificHeroes: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 533,
        category: "Close Combat",
        name: "Kusarigama",
        baseCost: 20,
        variableCost: null,
        rules: [
            "Cannot be parried: A model attacked by a Kusarigama may not make parries with a sword or buckler.",
            "Two-handed: A model armed with a Kusarigama may not use a shield, buckler or additional weapon in close combat. If the model has a shield he still gets a +1 bonus to his armour save against shooting.",
            "Chain Strike: Due to the length of the chain attached to the weapon, a model not engaged in combat that has a Kusarigama can force enemies who fail a charge against them or friendlies within 3\” to become knocked down"
        ],
        turnOrderRules: [
            { name: "Cannot be parried", rule: "A model attacked by a Kusarigama may not make parries with a sword or buckler.", timing: "9" },
            { name: "Chain Strike", rule: "A model not engaged in combat that has a Kusarigama can force enemies who fail a charge against them or friendlies within 3\” to become knocked down", timing: "5" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 534,
        category: "Close Combat",
        name: "Sai",
        baseCost: 30,
        variableCost: null,
        rules: [
            "Parry: The Sai allows the wielder to parry the attacks of his opponents in close combat. When your opponent scores a hit roll a D6. If you can roll greater than the highest 'to hit' roll of your opponent you have parried the attack and the blow is wasted.",
            "Trap Blade: The two prongs used to trap an opponent's weapon are snapped out when the warrior parries. Whenever you make a successful parry attempt roll a D6. If you score a 4+ you break the weapon your opponent was using. The weapon is now useless and they must use another one, or if they have no other weapon, resort to unarmed combat."
        ],
        turnOrderRules: [
            { name: "Parry", rule: "The Sai allows the wielder to parry the attacks of his opponents in close combat. When your opponent scores a hit roll a D6. If you can roll greater than the highest 'to hit' roll of your opponent you have parried the attack and the blow is wasted.", timing: "9" },
            { name: "Disarm", rule: "Whenever you make a successful parry attempt roll a D6. If you score a 4+ you break the weapon your opponent was using. The weapon is now useless and they must use another one, or if they have no other weapon, resort to unarmed combat.", timing: "9" }
        ],
        grade: "2a",
        modifierGeneral: 0,
        rarity: { base: 8 },
        restrictedWarbands: ["Nipponese Expedition"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },

    // MUTATIONS
    //Timing Options
    //1. Pre Game - For any skills that are used before a game starts
    //2. Recovery - For any skills that are used during the recovery phase
    //3. Movement - For any skills that are used during both player and opponent movement phase
    //4. My Movmement - For any skills used during players movment phase
    //5. Opponent Movement - For any skills used during opponents movement phase
    //6. Shooting - For any skills that are used during both players shooting phases
    //7. My Shooting - For any skills used during players shooting phase
    //8. Opponent Shooting - For any skills used during opponents shooting phase
    //9. Melee - For any skill used during both players melee phase
    //10. My Melee - For any skills used during players melee phase
    //11. Opponent Melee - For any skills used during opponents melee phase
    //12. Misc - For any skill that isnt used during a phase
    //13. Post Game - For any skill that is used post game

    // High Elf Honors
    {
        id: 553,
        category: "High Elf Honors",
        name: "Pure of Heart",
        baseCost: 5,
        variableCost: null,
        rules: [
            "This warrior immediately passes the first leadership test he is required to take each game (if taken by a leader, this does not include rout checks.)",
            "The hero may not charge stunned foes."
        ],
        turnOrderRules: [
            { name: "Pure of Heart", rule: "This warrior immediately passes the first leadership test he is required to take each game (if taken by a leader, this does not include rout checks.)", timing: ["2", "4", "9"] },
            { name: "Pure of Heart-charge", rule: "The hero may not charge stunned foes.", timing: ["4"] }
        ],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 554,
        category: "High Elf Honors",
        name: "Spearmaster",
        baseCost: 10,
        variableCost: null,
        rules: [
            "In the first round of combat, when using a spear, a hero adds +1 to his Strength and may reroll one failed roll to hit."
        ],
        turnOrderRules: [
            { name: "Spearmaster", rule: "In the first round of combat, when using a spear, a hero adds +1 to his Strength and may reroll one failed roll to hit.", timing: "9" }
        ],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 555,
        category: "High Elf Honors",
        name: "Swordmaster",
        baseCost: 10,
        variableCost: null,
        rules: [
            "This warrior gains +1 WS",
            "In addition he starts with the Graceful Strength skill.",
            "A Swordmaster may never use any missile weapon, and he may not increase his ballistic skill."

        ],
        turnOrderRules: [
            { name: "Swordmaster", rule: "This warrior gains +1 WS, in addition he starts with the Graceful Strength skill. However, a Swordmaster may never use any missile weapon, and he may not increase his ballistic skill.", timing: "12" }
        ],
        characteristicModifiers: { WS: 1 },
        grantSkill: ["Graceful Strength"],
        restrictCategories: ["Missile Weapon", "Blackpowder"],
        restrictAdvancement: ["BS"],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 556,
        category: "High Elf Honors",
        name: "Sea Guard",
        baseCost: 10,
        variableCost: null,
        rules: [
            "In addition to the normal Warriors Equipment, the warrior may purchase and use an Elf Bow without additional training.",
            "When armed with a spear, he fights at +2 Initiative when determining combat order."
        ],
        turnOrderRules: [
            { name: "Sea Guard", rule: "When armed with a spear, he fights at +2 Initiative when determining combat order.", timing: "9" }
        ],
        grantStartingEquipment: [153],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 557,
        category: "High Elf Honors",
        name: "White Lion",
        baseCost: 20,
        variableCost: null,
        rules: [
            "This warrior starts with Strength 4",
            "Starts off with a white lion pelt: this is a cloak that adds +1 to armour save against missile attacks. Only White Lions may wear it, and if stolen, costs 10gc to replace it (no roll for rarity.)",
            "A white lion may never use a spear and loses access to Shooting skills, but may use missile weapons as normal."
        ],
        turnOrderRules: [
            { name: "White Lion", rule: "A white lion may never use a spear and loses access to Shooting skills, but may use missile weapons as normal.", timing: "12" }
        ],
        characteristicModifiers: { S: 1 },
        addAdditionalEquipment: [562],
        restrictSkillCat: ["Shooting"],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 558,
        category: "High Elf Honors",
        name: "Phoenix Guard",
        baseCost: 15,
        variableCost: null,
        grantSpecialRule: ["Immune to Psychology"],
        rules: [
            "Only one hero in the warband may be a Phoenix Guard.",
            "This warrior may not speak, and thus he may not be the warband leader and he may not look for rare items.",
            "He is Immune to Psychology",
            "Rolls 2 dice for exploration.",
            "Immune Leaders still need to roll for rout."
        ],
        turnOrderRules: [
            { name: "Phoenix Guard - Exploration", rule: "rolls 2 dice for exploration", timing: ["13"] }
        ],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 559,
        category: "High Elf Honors",
        name: "Ranger",
        baseCost: 10,
        variableCost: null,
        grantSpecialRule: ["Seeker"],
        rules: [
            "Only one hero in the warband may be a ranger.",
            "A ranger must be equipped with long bow or an elf bow at all times; if not, you must purchase one for him when next able to.",
            "A ranger uses the Ranger equipment list instead of the Warrior Equipment list.",
            "A ranger gains the Seeker special rule, which allows him to modify one dice roll in the Exploration phase by +1/-1."
        ],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 560,
        category: "High Elf Honors",
        name: "Loremaster",
        baseCost: 10,
        variableCost: null,
        rules: [
            "The Hero starts with an Academic Skill of your choice"
        ],
        skillSelection: ["Academic"],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    },
    {
        id: 561,
        category: "High Elf Honors",
        name: "Loremaster-Bossuns",
        baseCost: 15,
        variableCost: null,
        rules: [
            "The Hero starts with an Academic Skill of your choice"
        ],
        skillSelection: ["Academic"],
        grade: "2b",
        modifierGeneral: 0,
        rarity: { base: "common" },
        restrictedWarbands: ["Lothern Sea Patrol"],
        restrictedHeroTypes: [],
        restrictedRaces: [],
        costModifiers: {
            warbands: {},
            heroTypes: {},
            races: {},
            specificHeroes: {},
            specificHenchmen: {}
        }
    }

];
