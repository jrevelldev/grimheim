export const WARBANDS = [
    {
        grade: "Core Warband",
        description: "Core Starting Warbands",
        warbands: [
            {
                name: "Cult of the Possessed",
                data: {
                    "special_rules": null,
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Magister",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Speed"],
                            rules: "Leader; Chaos Rituals",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 21, 20, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Possessed",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Fear; Mutations",
                            starting_equipment: [233, 234, 235, 236, 237, 238, 239, 240, 241],
                            stats: { "M": 5, "WS": 4, "BS": 0, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 7 },
                            hire_fee: "90",
                            race: "Possessed"
                        },
                        {
                            name: "Mutants",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Speed"],
                            rules: "Mutations",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 21, 20, 4, 1, 18, 6, 233, 234, 235, 236, 237, 238, 239, 240, 241],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Darksouls",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Fanatical",
                            starting_equipment: [8, 11, 12, 10, 17, 13, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Beastmen",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 20, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 2, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Beastmen"
                        },
                        {
                            name: "Brethren",
                            type: "henchman",
                            allowed: "Any Number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 21, 20, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                    ]
                }
            },
            {
                name: "Mercenaries (Reikland)",
                data: {
                    "special_rules": null,
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader Expanded",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"

                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youngbloods",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Funerary Rites; Priest of Morr Loner; Priest of Morr",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "Reikland Marksmen",
                            starting_equipment: [8, 11, 12, 10, 23, 26, 21, 22, 25, 24, 173, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Swordsmen",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Expert Swordsmen",
                            starting_equipment: [88, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Mercenaries (Middenheim)",
                data: {
                    "special_rules": null,
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader; Middenheim Strength",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6, 92],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Middenheim Strength",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6, 92],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youngbloods",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6, 92],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Funerary Rites; Priest of Morr Loner; Priest of Morr",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Wolf Priest of Ulric",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Academic", "Strength", "Speed"],
                            rules: "Prayers of Ulric; Wolf Priest Hatred",
                            starting_equipment: [501, 8, 11, 13, 16, 17],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6, 92],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 23, 26, 21, 22, 25, 24, 173, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Swordsmen",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Expert Swordsmen",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6, 92],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Wolf Companion",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Wolf Companion; Do not gain experience; Thick Fur",
                            starting_equipment: [],
                            stats: { "M": 4, "WS": 4, "BS": 0, "S": 4, "T": 4, "W": 1, "I": 4, "A": 2, "Ld": 5 },
                            hire_fee: "25",
                            race: "Wolf"
                        }
                    ]
                }
            },
            {
                name: "Mercenaries (Marienburg)",
                data: {
                    "special_rules": "Mercenaries (Marienburg)",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youngbloods",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Funerary Rites; Priest of Morr Loner; Priest of Morr",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 23, 26, 21, 22, 25, 24, 173, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Swordsmen",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Expert Swordsmen",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Mercenaries (Ostermark)",
                data: {
                    "special_rules": "Mercenaries (Ostermark); Ostermarker Wardog",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills_1: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            skills_2: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            skills_3: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6, 88],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills_1: ["Combat", "Shooting", "Strength"],
                            skills_2: ["Combat", "Strength", "Speed"],
                            skills_3: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youngbloods",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills_1: ["Combat", "Shooting", "Speed"],
                            skills_2: ["Combat", "Strength", "Speed"],
                            skills_3: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 23, 26, 21, 22, 25, 24, 173, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Swordsmen",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Expert Swordsmen",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Sisters of Sigmar",
                data: {
                    "special_rules": null,
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Sigmarite Matriarch",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader; Prayers of Sigmar",
                            starting_equipment: [8, 11, 11, 123, 13, 141, 17, 4, 1, 18, 19, 6, 61, 177, 60, 30],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Sister Superior",
                            type: "hero",
                            allowed: "0-3",
                            exp: 8,
                            skills: ["Combat", "Academic", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 11, 123, 13, 141, 17, 4, 1, 18, 19, 6, 61, 177, 60, 30],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Augur",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Blessed Sight",
                            starting_equipment: [8, 11, 11, 123, 13, 141, 17, 61, 177, 60],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Sigmarite Sisters",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 11, 123, 13, 141, 17, 4, 1, 18, 19, 6, 30],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Novices",
                            type: "henchman",
                            allowed: "0-10",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 11, 123, 13, 141, 17, 4, 1, 18, 19, 6, 30],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Skaven",
                data: {
                    "special_rules": null,
                    "Race": "Skaven",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Assassin Adept",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader; Perfect Killer",
                            starting_equipment: [8, 10, 13, 15, 14, 147, 120, 30, 28, 150, 172, 4, 19, 6],
                            stats: { "M": 6, "WS": 4, "BS": 4, "S": 4, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "60",
                            race: "Skaven"
                        },
                        {
                            name: "Eshin Sorcerer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Magic of the Horned Rat",
                            starting_equipment: [8, 10, 13, 15, 14, 147, 120, 30, 28, 150, 172, 4, 19, 6],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "45",
                            race: "Skaven"
                        },
                        {
                            name: "Black Skaven",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 10, 13, 15, 14, 147, 120, 30, 28, 150, 172, 4, 19, 6],
                            stats: { "M": 6, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 6 },
                            hire_fee: "40",
                            race: "Skaven"
                        },
                        {
                            name: "Night Runners",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 30, 4, 18, 6],
                            stats: { "M": 6, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "20",
                            race: "Skaven"
                        },
                        {
                            name: "Verminkin",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 30, 4, 18, 6],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Skaven"
                        },
                        {
                            name: "Giant Rats",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Pack Size; Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "15",
                            race: "Skaven"
                        },
                        {
                            name: "Rat Ogre",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Skaven Stupidity; Do not gain experience; Large Target",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 3, "S": 5, "T": 5, "W": 3, "I": 4, "A": 3, "Ld": 4 },
                            hire_fee: "210",
                            race: "Skaven"
                        }
                    ]
                }
            },
            {
                name: "Undead",
                data: {
                    "special_rules": null,
                    "Race": "Mix",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Vampire",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader; Fear; Immune to Psychology; Immune to Poison; No Pain",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 15, 14, 21, 20, 4, 1, 18, 6],
                            stats: { "M": 6, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 5, "A": 2, "Ld": 8 },
                            hire_fee: "110",
                            race: "Vampire"
                        },
                        {
                            name: "Necromancer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Necromancy",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 15, 14, 21, 20, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Dregs",
                            type: "hero",
                            allowed: "0-3",
                            exp: 0,
                            skills: ["Combat", "Strength"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 15, 14, 21, 20, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Ghast",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 3, "A": 2, "Ld": 5 },
                            hire_fee: "50",
                            race: "Ghoul",
                            requires_bloodline: "Strigoi"
                        },
                        {
                            name: "Zombies",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Fear; May not run; Immune to Psychology; Immune to Poison; No Pain; Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 1, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Zombie"
                        },
                        {
                            name: "Ghouls",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Fear",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 3, "A": 2, "Ld": 5 },
                            hire_fee: "40",
                            race: "Ghoul"
                        },
                        {
                            name: "Dire Wolves",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Charge; May not Run; Fear; Immune to Psychology; Immune to Poison; Do not gain experience; No Pain",
                            starting_equipment: ["None"],
                            stats: { "M": 9, "WS": 3, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 4 },
                            hire_fee: "50",
                            race: "Dire Wolf"
                        }
                    ]
                }
            },
            {
                name: "Witch Hunters",
                data: {
                    "special_rules": null,
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Witch Hunter Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader; Burn the Witch!",
                            starting_equipment: [8, 11, 12, 10, 17, 23, 26, 155, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Warrior-Priest",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Combat", "Academic", "Strength"],
                            rules: "Prayers of Sigmar",
                            starting_equipment: [8, 11, 12, 10, 17, 23, 26, 155, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Witch Hunters",
                            type: "hero",
                            allowed: "0-3",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Academic", "Speed"],
                            rules: "Burn the Witch!",
                            starting_equipment: [8, 11, 12, 10, 17, 23, 26, 155, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Zealots",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 21, 20, 4, 18, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Flagellants",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Fanatical",
                            starting_equipment: [13, 16, 17],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 10 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Warhounds",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Warhound"
                        }
                    ]
                }
            }
        ]
    },
    {
        grade: "Grade 1a",
        description: "GW/Fanatic Rules deemed \"official\" in the 2005 Rules Review.",
        warbands: [
            {
                name: "Averlanders",
                data: {
                    "special_rules": null,
                    "Race": "Mixed",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 16, 17, 26, 27, 23, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Sergeant",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 16, 17, 26, 27, 23, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Bergjaegers",
                            type: "hero",
                            allowed: "0-2",
                            exp: 4,
                            skills: ["Shooting", "Speed"],
                            rules: "Set Traps",
                            starting_equipment: [8, 11, 12, 10, 21, 22, 4, 19, 6, 62],
                            stats: { "M": 4, "WS": 2, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youngblood",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 16, 17, 26, 27, 23, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Funerary Rites; Priest of Morr Loner; Priest of Morr",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Mountainguards",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 16, 17, 26, 27, 23, 21, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Marksman",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 23, 26, 21, 22, 25, 24, 173, 4, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Halfling Scouts",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Halfling Promotion",
                            starting_equipment: [8, 11, 12, 10, 21, 22, 4, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 4, "S": 2, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "20",
                            race: "Halfling"
                        }
                    ]
                }
            },
            {
                name: "Beastmen Raiders",
                data: {
                    "special_rules": "Animals",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Beastman Chief",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "65",
                            race: "Beastmen"
                        },
                        {
                            name: "Beastman Shaman",
                            type: "hero",
                            allowed: "0-1",
                            exp: 11,
                            skills: ["Combat", "Speed", "Special"],
                            rules: "Chaos Rituals",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "45",
                            race: "Beastmen"
                        },
                        {
                            name: "Bestigors",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Beastmen"
                        },
                        {
                            name: "Centigors",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Drunken; Woodland Dwelling; Trample",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 8, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 1, "A": 1, "Ld": 7 },
                            hire_fee: "80",
                            race: "Centigor"
                        },
                        {
                            name: "Ungor",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Lowest of the Low",
                            starting_equipment: [8, 11, 12, 15, 18],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Ungor"
                        },
                        {
                            name: "Gor",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Beastmen"
                        },
                        {
                            name: "Warhounds of Chaos",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 7, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Warhound of Chaos"
                        },
                        {
                            name: "Minotaur",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Bloodgreed; Cannot become a Hero; Large Target",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 6, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 3, "I": 4, "A": 3, "Ld": 8 },
                            hire_fee: "200",
                            race: "Minotaur"
                        }
                    ]
                }
            },
            {
                name: "Carnival of Chaos",
                data: {
                    "special_rules": "Dangerous to Know; Tainted",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Carnival Master",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader; Nurgle Rituals",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 20, 21, 26, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Brutes",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Unnatural Strength",
                            starting_equipment: [17, 13],
                            stats: { "M": 4, "WS": 4, "BS": 0, "S": 4, "T": 4, "W": 1, "I": 2, "A": 2, "Ld": 7 },
                            hire_fee: "60",
                            race: "Human",
                            starting_skill: [405]
                        },
                        {
                            name: "Tainted Ones",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Speed"],
                            rules: "Nurgle's Blessings",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 20, 21, 26, 4, 1, 18, 6, 242, 243, 244, 245, 246, 247],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Plague Bearers",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Cloud of Flies; Stream of Corruption; Do not gain experience; Immune to Poison; Immune to Psychology; Fear; Daemonic Aura; Daemonic Instability",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 2, "Ld": 10 },
                            hire_fee: "50",
                            race: ""
                        },
                        {
                            name: "Nurglings",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Cloud of Flies; Swarm; Do not gain experience; Immune to Psychology; Immune to Poison; Daemonic Aura; Daemonic Instability",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 3, "BS": 0, "S": 3, "T": 2, "W": 1, "I": 3, "A": 1, "Ld": 10 },
                            hire_fee: "15",
                            race: ""
                        },
                        {
                            name: "Brethren",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 20, 21, 26, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Plague Cart",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Plague Cart; Guardian; Immune to Psychology; Do not gain experience",
                            starting_equipment: ["None"],
                            stats: {
                                "CART": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 8, "W": 4, "I": 0, "A": 0, "Ld": 0 },
                                "WHEEL": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 6, "W": 1, "I": 0, "A": 0, "Ld": 0 },
                                "HORSE": { "M": 8, "WS": 0, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 3, "A": 0, "Ld": 0 },
                                "GUARDIAN": { "M": 0, "WS": 3, "BS": 0, "S": 3, "T": 3, "W": 0, "I": 3, "A": 1, "Ld": 0 }
                            },
                            hire_fee: "120",
                            race: ""
                        }
                    ]
                }
            },
            {
                name: "Dwarf Treasure Hunters",
                data: {
                    "special_rules": "Grudgebearers; Incomparable Miners",
                    "Race": "Dwarf",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Noble",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Special"],
                            rules: "Leader; Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 12, 10, 103, 17, 15, 14, 4, 1, 18, 6, 26, 2],
                            stats: { "M": 3, "WS": 5, "BS": 4, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "85",
                            race: "Dwarf"
                        },
                        {
                            name: "Engineer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 10,
                            skills: ["Shooting", "Academic", "Special"],
                            rules: "Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Dwarf Expert Weaponsmith; Gromril",
                            starting_equipment: [8, 11, 12, 10, 26, 23, 24, 4, 1, 18, 6],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "50",
                            race: "Dwarf"
                        },
                        {
                            name: "Troll Slayers",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Deathwish; Slayer Skills; Gromril",
                            starting_equipment: [8, 11, 12, 10, 103, 17, 15, 14],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "50",
                            race: "Dwarf"
                        },
                        {
                            name: "Dwarf Clansmen",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 12, 10, 103, 17, 15, 14, 4, 1, 18, 6, 26, 2],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Dwarf Thunderers",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 12, 10, 26, 23, 24, 4, 1, 18, 6],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Beardlings",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 12, 10, 103, 17, 15, 14, 4, 1, 18, 6, 26, 2],
                            stats: { "M": 3, "WS": 3, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 8 },
                            hire_fee: "25",
                            race: "Dwarf"
                        }
                    ]
                }
            },
            {
                name: "Kislevites",
                data: {
                    "special_rules": "Ancient Enemies",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Druzhina Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader; Inheritance",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 28, 20, 21, 23, 26, 27, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Esaul",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 28, 20, 21, 23, 26, 27, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Bear Tamer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Bear Handler",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 28, 20, 21, 23, 26, 27, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youths",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 28, 20, 21, 23, 26, 27, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Funerary Rites; Priest of Morr Loner; Priest of Morr",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 28, 20, 21, 23, 26, 27, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Cossacks",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hate Chaos",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 28, 20, 21, 23, 26, 27, 4, 1, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Streltsi",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Gun-Rest",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 21, 23, 26, 27, 24, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Trained Bear",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Trained; Fear; Bear Hug; Fiercely Loyal; Do not gain experience; Large Target",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 5, "T": 5, "W": 2, "I": 2, "A": 2, "Ld": 6 },
                            hire_fee: "125",
                            race: "Bear"
                        }
                    ]
                }
            },
            {
                name: "Orc Mob",
                data: {
                    "special_rules": "Distasteful Company; Animosity",
                    "Race": "Orc",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Boss",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 16, 21, 23, 4, 18, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "80",
                            race: "Orc"
                        },
                        {
                            name: "Shaman",
                            type: "hero",
                            allowed: "0-1",
                            exp: 10,
                            skills: ["Strength", "Special"],
                            rules: "Waaaagh! Magic",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 16, 21, 23],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Orc"
                        },
                        {
                            name: "Big 'Uns",
                            type: "hero",
                            allowed: "0-2",
                            exp: 15,
                            skills: ["Combat", "Shooting", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 16, 21, 23, 4, 18, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Orc"
                        },
                        {
                            name: "Orc Boyz",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Animosity",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 16, 21, 23, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Orc"
                        },
                        {
                            name: "Goblin Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Animosity; Not Orcs; Runts; Orc Limit",
                            starting_equipment: [8, 11, 10, 15, 105, 20, 18, 6, 211, 44],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Goblin"
                        },
                        {
                            name: "Cave Squigs",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Squig Movement; Minderz; Not Orcs; Do not gain experience; Goblin Limit",
                            starting_equipment: ["None"],
                            stats: { "M": 2, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Squig"
                        },
                        {
                            name: "Troll",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Stupidity; Regeneration; Always Hungry; Vomit; Do not gain experience; Large Target",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 1, "S": 5, "T": 4, "W": 3, "I": 1, "A": 3, "Ld": 4 },
                            hire_fee: "200",
                            race: "Troll"
                        }
                    ]
                }
            },
            {
                name: "Ostlanders",
                data: {
                    "special_rules": "Self-Sufficient",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Elder",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 21, 26, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Blood-Brothers",
                            type: "hero",
                            allowed: "0-2",
                            exp: 12,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 21, 26, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Priest of Taal",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Combat", "Academic", "Strength", "Speed", "Special"],
                            rules: "Prayers of Taal",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 21, 26, 4, 18, 6],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Kin",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 21, 26, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Ruffians",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Drunk; No Respect; Ruffian Weapon Limitation",
                            starting_equipment: [8, 11, 12, 10, 17, 4],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Jaeger",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 12, 10, 15, 26, 168, 21, 25, 24, 173, 174, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Ogre",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Strength"],
                            rules: "Fear; Large Target; Ogre Skills; Slow Witted",
                            starting_equipment: [11, 12, 10, 17, 4],
                            stats: { "M": 6, "WS": 3, "BS": 2, "S": 4, "T": 4, "W": 3, "I": 3, "A": 2, "Ld": 7 },
                            hire_fee: "160",
                            race: "Ogre"
                        }
                    ]
                }
            }
        ]
    },
    {
        grade: "Grade 1b",
        description: "Unofficial, but released through GW/Fanatic. Professional quality.",
        warbands: [
            {
                name: "Amazons (Lustria)",
                data: {
                    "special_rules": "Isolationists; Sacrafice; Norse Enmity; None One of Us",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Serpent Priestess",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Speed", "Special"],
                            rules: "Leader; Amazon Rituals",
                            starting_equipment: [8, 11, 10, 15, 17, 139, 140, 21, 162, 19, 6, 182, 49, 42],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Eagle Warriors",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 17, 139, 140, 21, 162, 19, 6, 182, 49, 42],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Piranha Warriors",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 17, 139, 140, 21, 162, 19, 6, 182, 49, 42],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Amazon Warriors",
                            type: "henchman",
                            allowed: "1-20",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 30, 21, 162, 19, 6, 182],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Jaguar Warriors",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "One with the Jungle",
                            starting_equipment: [8, 11, 10, 15, 30, 151, 158, 21, 162, 6, 182],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Amazons (Mordheim)",
                data: {
                    "special_rules": "Sacrifice; Not one of us",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Priestess",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed"],
                            rules: "Leader; Amazon Rituals",
                            starting_equipment: [8, 11, 10, 15, 114, 161, 160, 19, 6, 49, 42],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 114, 161, 160, 19, 6, 49, 42],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Totem Warriors",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Frenzy",
                            starting_equipment: [8, 11, 10, 15, 114, 161, 160, 19, 6, 49, 42],
                            stats: { "M": 4, "WS": 4, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Amazon Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 30, 21, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Scouts",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Stealthy",
                            starting_equipment: [8, 11, 10, 15, 30, 158, 21, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Arabian Tomb Raiders",
                data: {
                    "special_rules": "Hate Undead",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Sheikh",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 10, 15, 13, 17, 20, 21, 24, 18, 19, 6, 4, 9],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 13, 17, 20, 21, 24, 18, 19, 6, 4, 9],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Nomadic Mystic",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Arabian Elemental Magic",
                            starting_equipment: [8, 11, 10, 15, 13, 17, 20, 21, 24, 18, 19, 6, 4, 9],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Bedouins",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Desert Trader",
                            starting_equipment: [8, 11, 10, 15, 13, 17, 20, 21, 24, 18, 19, 6, 4, 9],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Nomad Warriors",
                            type: "henchman",
                            allowed: "Max 1 per Orc Boy",
                            exp: 0,
                            skills: [8, 11, 10, 15, 13, 17, 20, 21, 24, 18, 19, 6, 4, 9],
                            rules: "(None)",
                            starting_equipment: [2, 30, 4, 31, 5, 6, 9, 32, 35, 12, 33],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Slaves",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Life of Slavery",
                            starting_equipment: [8, 11, 10, 15, 18, 303],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Black Orcs",
                data: {
                    "special_rules": "Let the goons do the work; Da Boss is Dead!; Animosity",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Black Orc Boss",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Leader; Black Orc; Oi Behave!",
                            starting_equipment: [8, 12, 10, 305, 15, 17, 21, 23, 19, 18, 6, 4, 1],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "80",
                            race: "Black Orc"
                        },
                        {
                            name: "Black Orcs",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Black Orc",
                            starting_equipment: [8, 12, 10, 305, 15, 17, 21, 23, 19, 18, 6, 4, 1],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Black Orc"
                        },
                        {
                            name: "Young'uns",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Special"],
                            rules: "Black Orc Blood",
                            starting_equipment: [8, 12, 10, 305, 15, 17, 21, 18, 6, 4],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Black Orc"
                        },
                        {
                            name: "Orc Boyz",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Animosity",
                            starting_equipment: [8, 12, 10, 305, 15, 17, 21, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Orc"
                        },
                        {
                            name: "Orc Shootaz",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Animosity; Uncommon",
                            starting_equipment: [8, 12, 10, 305, 15, 21, 23, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Orc"
                        },
                        {
                            name: "Orc Nuttaz",
                            type: "henchman",
                            allowed: "0-4",
                            exp: 0,
                            skills: [],
                            rules: "Unstable; Crazy; Savage",
                            starting_equipment: [8, 12, 10, 305, 15, 17, 21, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 5 },
                            hire_fee: "25",
                            race: "Orc"
                        },
                        {
                            name: "Troll",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Stupidity; Regeneration; Do not gain experience; Always Hungry; Vomit Attack; Large Target",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 1, "S": 5, "T": 4, "W": 3, "I": 1, "A": 3, "Ld": 4 },
                            hire_fee: "200",
                            race: "Troll"
                        }
                    ]
                }
            },
            {
                name: "Bretonnian Knights",
                data: {
                    "special_rules": "Lady's Blessing",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Questing Knight",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Leader; Knight's Virtue",
                            starting_equipment: [8, 11, 12, 10, 17, 16, 128, 4, 1, 18, 6, 96, 45],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "80",
                            race: "Human",
                            starting_skill: [601]
                        },
                        {
                            name: "Knight Errant",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Speed", "Special"],
                            rules: "Knight's Virtue",
                            starting_equipment: [8, 11, 12, 10, 17, 16, 128, 4, 1, 18, 6, 96, 45],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "50",
                            race: "Human"
                        },
                        {
                            name: "Squires",
                            type: "hero",
                            allowed: "0-3",
                            exp: 0,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 21, 22, 18, 19, 6, 4, 46],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Men-at-arms",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Bowmen",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 12, 10, 21, 22, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Dark Elves",
                data: {
                    "special_rules": "Kindred Hatred; Excellent Sight; Black Powder Weapons (Dark Elves)",
                    "Race": "Dark Elf",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "High Born",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 29, 34, 156, 155, 19, 18, 6, 4, 38, 206],
                            stats: { "M": 5, "WS": 5, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 9 },
                            hire_fee: "70",
                            race: "Dark Elf"
                        },
                        {
                            name: "Beastmaster",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Speed", "Special"],
                            rules: "Cold One Beasthound",
                            starting_equipment: [8, 12, 10, 15, 14, 232, 17, 29, 34, 156, 155, 19, 18, 6, 4, 38, 206],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Dark Elf"
                        },
                        {
                            name: "Fellblades",
                            type: "hero",
                            allowed: "0-2",
                            exp: 12,
                            skills: ["Combat", "Speed", "Special"],
                            rules: "Melee Specialists",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 29, 34, 19, 18, 6, 4, 38, 206],
                            stats: { "M": 5, "WS": 5, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Dark Elf"
                        },
                        {
                            name: "Sorceress",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Dark Elf Magic; Cannot cast spells in armour",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 29, 34, 156, 155, 19, 18, 6, 4, 38, 206],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "55",
                            race: "Dark Elf"
                        },
                        {
                            name: "Corsairs",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 156, 155, 19, 18, 6, 4, 38, 206],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Dark Elf"
                        },
                        {
                            name: "Shades",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Natural Stealth",
                            starting_equipment: [8, 12, 10, 156, 6, 4],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "30",
                            race: "Dark Elf"
                        },
                        {
                            name: "Cold One Beasthounds",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Beastmaster; Stupidity; Scaly Skin; Fear",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 4, "T": 4, "W": 1, "I": 1, "A": 1, "Ld": 4 },
                            hire_fee: "30",
                            race: "Cold One"
                        }
                    ]
                }
            },
            {
                name: "Dwarf Rangers",
                data: {
                    "special_rules": "Don't Trust 'Em; Grudgebearers; Incomparable Miners",
                    "Race": "Dwarf",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Runesmith",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Special"],
                            rules: "Leader; Inscribe Runes; Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 11, 12, 10, 103, 17, 15, 14, 26, 4, 1, 2, 18, 6],
                            stats: { "M": 3, "WS": 5, "BS": 4, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 10 },
                            hire_fee: "85",
                            race: "Dwarf"
                        },
                        {
                            name: "Apprentice Runesmith",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Academic", "Strength", "Special"],
                            rules: "Extra Set of Hands; Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril ",
                            starting_equipment: [8, 11, 11, 12, 10, 103, 17, 15, 14, 26, 4, 1, 2, 18, 6],
                            stats: { "M": 3, "WS": 3, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Troll Slayers",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Deathwish; Slayer Skills; Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 11, 12, 10, 103, 17, 15, 14, 4, 1, 2, 18, 6],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "50",
                            race: "Dwarf"
                        },
                        {
                            name: "Dwarf Longbeards",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Stubborn, Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 11, 12, 10, 103, 17, 15, 14, 26, 4, 1, 2, 18, 6],
                            stats: { "M": 3, "WS": 5, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 9 },
                            hire_fee: "50",
                            race: "Dwarf"
                        },
                        {
                            name: "Dwarf Clansmen",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 11, 12, 10, 103, 17, 15, 14, 26, 4, 1, 2, 18, 6],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Dwarf Crossbowmen",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins",
                            starting_equipment: [, 11, 12, 10, 23, 4, 1, 18, 6],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Beardlings",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Armour; Hate Orcs and Goblins; Gromril",
                            starting_equipment: [8, 11, 11, 12, 10, 103, 17, 15, 14, 26, 4, 1, 2, 18, 6],
                            stats: { "M": 3, "WS": 3, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 8 },
                            hire_fee: "25",
                            race: "Dwarf"
                        }
                    ]
                }
            },
            {
                name: "Forest Goblins",
                data: {
                    "special_rules": "Woodland Dwelling; Animosity",
                    "Race": "Goblin",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Chieftain",
                            type: "hero",
                            allowed: "1",
                            exp: 17,
                            skills: ["Combat", "Shooting", "Academic", "Speed"],
                            rules: "Leader; Ride Spiders",
                            starting_equipment: [8, 12, 10, 17, 15, 14, 107, 150, 20, 4, 18],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "50",
                            race: "Goblin"
                        },
                        {
                            name: "Braves",
                            type: "hero",
                            allowed: "0-4",
                            exp: 6,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Animosity",
                            starting_equipment: [8, 12, 10, 17, 15, 14, 107, 150, 20, 4, 18],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Goblin"
                        },
                        {
                            name: "Shaman",
                            type: "hero",
                            allowed: "0-1",
                            exp: 6,
                            skills: ["Academic", "Speed"],
                            rules: "Forest Goblin Magic",
                            starting_equipment: [8, 12, 10, 17, 15, 14, 107, 150, 20, 4, 18],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Goblin"
                        },
                        {
                            name: "Forest Goblins",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Animosity",
                            starting_equipment: [8, 10, 15, 150, 28, 21, 18],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Goblin"
                        },
                        {
                            name: "Red Toof Boyz",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Animosity; Berserkers",
                            starting_equipment: [8, 10, 15, 150, 28, 21, 18],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Goblin"
                        },
                        {
                            name: "Sluggas",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Animosity; Sluggas",
                            starting_equipment: [8, 10, 15, 150, 28, 21, 18],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Goblin"
                        },
                        {
                            name: "Gigantic Spider",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Large Target; Poisonous; Woodland Dwelling; Stupidity; May Ride; Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 5, "T": 5, "W": 3, "I": 4, "A": 2, "Ld": 4 },
                            hire_fee: "200",
                            race: "Gigantic Spider"
                        }
                    ]
                }
            },
            {
                name: "Gunnery School of Nuln",
                data: {
                    "special_rules": "Impeccable Care; Properly Used; Proud To A Fault!",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Senior Gunnery Officer",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader Expanded; Hunter",
                            starting_equipment: [15, 8, 11, 12, 10, 14, 16, 17, 4, 1, 18, 19, 6, 73, 26, 168, 27, 169, 24, 164, 248, 121, 518, 125],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Instructor",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Shooting", "Academic", "Speed"],
                            rules: "Nuln Expert Weaponsmith",
                            starting_equipment: [8, 11, 12, 10, 26, 168, 171, 248, 121, 25, 24, 164, 165, 167, 166, 4, 18, 6, 73, 14, 16, 17, 1, 19, 27, 169, 518, 125],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Senior Student",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Speed"],
                            rules: "(None)",
                            starting_equipment: [15, 8, 11, 12, 10, 14, 16, 17, 4, 1, 18, 19, 6, 73, 26, 168, 27, 169, 24, 164, 248, 121, 518, 125],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Underclassmen",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [15, 8, 11, 12, 10, 14, 16, 17, 4, 1, 18, 19, 6, 73, 26, 168, 27, 169, 24, 164, 248, 121, 518, 125],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Sons of the Guns",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [15, 8, 11, 12, 10, 14, 16, 17, 4, 1, 18, 19, 6, 73, 26, 168, 27, 169, 24, 164, 248, 121, 518, 125],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "Quick Reload",
                            starting_equipment: [8, 11, 12, 10, 26, 168, 171, 248, 121, 25, 24, 164, 165, 167, 166, 4, 18, 6, 73],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Pistoliers",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Crack Shot",
                            starting_equipment: [15, 8, 11, 12, 10, 14, 16, 17, 4, 1, 18, 19, 6, 73, 26, 168, 27, 169, 24, 164, 248, 121, 518, 125],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Hochland Bandits",
                data: {
                    "special_rules": "Hired Swords; Powder's Expensive!; Foragers; Know Who To Sell To",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Bandit Prince",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 12, 4, 18, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Footpads",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Concealment",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 12, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Duelist",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Swordmaster; Weapon Knowledge",
                            starting_equipment: [8, 136, 129, 10, 15, 26, 27, 18, 19],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Huckster",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Academic", "Special"],
                            rules: "Convincing Manner; Slick Operator",
                            starting_equipment: [8, 15, 30],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 2, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Thugs",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 12, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Blackhearts",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Hardened",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 12, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Looters",
                            type: "henchman",
                            allowed: "0-4",
                            exp: 0,
                            skills: [],
                            rules: "Looting the Dead",
                            starting_equipment: [8, 15, 30],
                            stats: { "M": 4, "WS": 2, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Gutterscum",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: [8, 15, 30],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "10",
                            race: "Human"
                        },
                        {
                            name: "Poachers",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Trailblazers",
                            starting_equipment: [8, 15, 20, 21, 22, 23, 6],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Horned Hunters",
                data: {
                    "special_rules": "Woodcraft",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Horned Hunter",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Leader; Hang the Bandit!",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 22, 5, 4, 18, 62, 89, 78],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Priest of Taal",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Combat", "Academic", "Strength", "Speed", "Special"],
                            rules: "Prayers of Taal; May not wear armour",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 22, 18, 62, 89, 78],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Initiates",
                            type: "hero",
                            allowed: "0-3",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Infiltrator; Hang the Bandit!; May not wear armour",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 22, 18, 62, 89, 78],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Drunken Gang",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Drunk",
                            starting_equipment: [8, 11, 12, 10, 15, 21, 5, 18],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Zealots",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "May not wear armour",
                            starting_equipment: [8, 11, 12, 10, 15, 21, 18],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Warhounds",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Warhound"
                        }
                    ]
                }
            },
            {
                name: "Imperial Outriders",
                data: {
                    "special_rules": "Outriders Hired Swords",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Knight",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed", "Cavalry"],
                            rules: "Leader; Ride; Outrider Horse",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 128, 19, 18, 6, 4, 1, 7, 45],
                            initial_equipment: [46],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "85",
                            race: "Human"
                        },
                        {
                            name: "Outriders",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Cavalry"],
                            rules: "Ride; Outrider Horse",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 128, 19, 18, 6, 4, 1, 7, 26, 24, 25, 173, 45],
                            initial_equipment: [46],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "65",
                            race: "Human"
                        },
                        {
                            name: "Scouts",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed", "Cavalry"],
                            rules: "Ride",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 128, 19, 18, 6, 4, 1, 7, 28, 45],
                            initial_equipment: [46],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Chasseurs",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Ride",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 128, 19, 18, 6, 4, 1, 7, 26, 24, 25, 173, 45],
                            initial_equipment: [46],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "55",
                            race: "Human"
                        },
                        {
                            name: "Hussars",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Ride; Combat Riding; Outrider Horse",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 128, 19, 18, 6, 4, 1, 7, 45],
                            initial_equipment: [46],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Grooms",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Ride; Horse Handling",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 128, 19, 18, 6, 4, 1, 7, 28, 45],
                            initial_equipment: [46],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "50",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Lizardmen",
                data: {
                    "special_rules": "Lizardmen Light Armour; Cold Blooded; Aquatic; One with the Jungle; Saurus Rarity",
                    "Race": "Mixed",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Skink Priest",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Leader; Lizardman Magic; Lizardmen Scaly Skin; Skink Poisoned Weapons",
                            starting_equipment: [8, 11, 12, 10, 15, 20, 151, 158, 28, 150, 18, 19, 6, 250, 251, 37, 38],
                            stats: { "M": 6, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "60",
                            race: "Skink"
                        },
                        {
                            name: "Saurus Totem Warrior",
                            type: "hero",
                            allowed: "0-1",
                            exp: 11,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Bite Attack; Lizardmen Scaly Skin",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 18, 6, 4, 249, 251, 37, 38],
                            stats: { "M": 4, "WS": 4, "BS": 0, "S": 4, "T": 4, "W": 2, "I": 2, "A": 2, "Ld": 8 },
                            hire_fee: "60",
                            race: "Saurus"
                        },
                        {
                            name: "Skink Great Crests",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Shooting", "Speed", "Special"],
                            rules: "Lizardmen Scaly Skin; Skink Poisoned Weapons",
                            starting_equipment: [8, 11, 12, 10, 15, 20, 151, 158, 28, 150, 18, 19, 250, 251, 37, 38],
                            stats: { "M": 6, "WS": 3, "BS": 3, "S": 3, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Skink"
                        },
                        {
                            name: "Skink Braves",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Lizardmen Scaly Skin",
                            starting_equipment: [8, 11, 12, 15, 20, 151, 158, 28, 150, 18, 19, 563],
                            stats: { "M": 6, "WS": 2, "BS": 3, "S": 3, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Skink"
                        },
                        {
                            name: "Saurus Braves",
                            type: "henchman",
                            allowed: "0-4",
                            exp: 0,
                            skills: [],
                            rules: "Bite Attack; Lizardmen Scaly Skin",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 0, "S": 4, "T": 4, "W": 1, "I": 1, "A": 2, "Ld": 7 },
                            hire_fee: "40",
                            race: "Saurus"
                        },
                        {
                            name: "Kroxigor",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Lizardmen Scaly Skin; Aquatic; Fear; Large; Do not gain experience",
                            starting_equipment: [14],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 5, "T": 4, "W": 3, "I": 1, "A": 3, "Ld": 8 },
                            hire_fee: "200",
                            race: "Kroxigor"
                        }
                    ]
                }
            },
            {
                name: "Mootlanders",
                data: {
                    "special_rules": "Weakness",
                    "Race": "Halfling",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Moot Elder",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed"],
                            rules: "Leader",
                            starting_equipment: [8, 15, 10, 11, 21, 20, 30, 4, 18, 98, 26],
                            stats: { "M": 4, "WS": 3, "BS": 5, "S": 2, "T": 2, "W": 1, "I": 6, "A": 1, "Ld": 9 },
                            hire_fee: "55",
                            race: "Halfling"
                        },
                        {
                            name: "Master Chef",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Speed"],
                            rules: "Inspired Cooking",
                            starting_equipment: [126, 115, 127, 145],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 2, "W": 1, "I": 5, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Halfling"
                        },
                        {
                            name: "Halfling Thieves",
                            type: "hero",
                            allowed: "0-3",
                            exp: 0,
                            skills: ["Shooting", "Academic", "Speed"],
                            rules: "Sneaky",
                            starting_equipment: [8, 15, 10, 11, 21, 20, 30, 4, 18, 98],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 2, "T": 2, "W": 1, "I": 5, "A": 1, "Ld": 9 },
                            hire_fee: "25",
                            race: "Halfling"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 15, 10, 11, 21, 20, 30, 4, 18, 98],
                            stats: { "M": 4, "WS": 2, "BS": 4, "S": 2, "T": 2, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "15",
                            race: "Halfling"
                        },
                        {
                            name: "Scouts",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Keen Eyesight",
                            starting_equipment: [8, 15, 10, 11, 21, 20, 30, 4, 18, 98],
                            stats: { "M": 4, "WS": 2, "BS": 4, "S": 2, "T": 2, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "20",
                            race: "Halfling"
                        }
                    ]
                }
            },
            {
                name: "Norse Explorers",
                data: {
                    "special_rules": "Seafaring",
                    "Race": "Mixed",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Jarl",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 17, 13, 28, 18, 6, 4],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Berserker",
                            type: "hero",
                            allowed: "0-2",
                            exp: 11,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Frenzy",
                            starting_equipment: [8, 11, 12, 10, 17, 13, 28],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "50",
                            race: "Human"
                        },
                        {
                            name: "Bondsmen",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 17, 13, 28, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Ulfwerenar",
                            type: "hero",
                            allowed: "0-1",
                            exp: 11,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Fear; Bestial",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 4, "BS": 0, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 7 },
                            hire_fee: "90",
                            race: "Werecreature"
                        },
                        {
                            name: "Marauders",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 28, 18, 6, 4],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Hunters",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 158, 18, 6, 4, 21],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Wolves",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Pack Leader",
                            starting_equipment: [],
                            stats: { "M": 9, "WS": 3, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Wolf"
                        }
                    ]
                }
            },
            {
                name: "Outlaws of Stirwood Forest",
                data: {
                    "special_rules": "Missile Restriction; Outlaws of Stirwood Forest Hired Swords",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Bandit Leader",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 22, 18, 6, 4, 62, 91],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champion",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 22, 18, 6, 4, 62, 91],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Cleric",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic"],
                            rules: "Hiring Restriction; Prayers of Sigmar",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 22, 18, 6, 4, 62, 91],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Petty Thieves",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 22, 18, 6, 4, 62, 91],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 22, 18, 6, 4, 62],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Outlaws",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 20, 21, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Pirates",
                data: {
                    "special_rules": "Swabbies-Kidnapped; Swabbies-Henchmen; Swabbies-Stragglers; Swabbies-Prisoner; Pirate Hired Swords; Succession; One-Off Game",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Ship’s Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 106, 111, 10, 17, 149, 23, 26, 27, 19, 5, 6, 4, 248, 518],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Mates",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 106, 111, 10, 17, 149, 23, 26, 27, 19, 5, 6, 4, 248, 518],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Cabin Boys",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 106, 111, 10, 17, 149, 23, 26, 27, 19, 5, 6, 4, 248, 518],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Crew",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 106, 10, 17, 149, 23, 26, 27, 19, 5, 6, 4, 248, 518],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Gunners",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "Swivel Guns is Dangerous, Matey",
                            starting_equipment: [8, 11, 12, 10, 26, 25, 27, 24, 175, 5, 6, 4, 252, 253, 254],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Boatswains",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Expert Riggers",
                            starting_equipment: [8, 11, 12, 106, 10, 17, 149, 23, 26, 27, 19, 5, 6, 4, 248, 518],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Swabbies",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Not Hired; Do not gain experience; Rabble; Blimey, they got away; Don’t mind them mates they ain’t true pirates",
                            starting_equipment: [8, 11, 12, 106, 10, 17, 149, 21, 19, 5],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "0",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Pit Fighters",
                data: {
                    "special_rules": "Pit Fighter; Pit Fighter Hired Swords; Free the Slaves; In the Pit",
                    "Race": "Human",
                    "uses_styles": true,
                    "available_styles": ["orc", "empire", "undead", "chaos", "skink1", "skink2", "skink3", "skink4", "witchelf", "witchelf2"],
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Pit King",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            requires_style: true,
                            starting_equipment: [8],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 2, "Ld": 8 },
                            hire_fee: "80",
                            race: "Human"
                        },
                        {
                            name: "Pit Fighter Troll Slayer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Hard to Kill; Hard Head; Hate Orcs and Goblins; Gromril; Grudgebearers; Immune to Psychology",
                            requires_style: false,
                            starting_equipment: [8, 11, 12, 103, 10, 13, 36],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "50",
                            race: "Dwarf"
                        },
                        {
                            name: "Pit Fighter Veterans",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            requires_style: true,
                            starting_equipment: [8],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Pit Fighters",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            requires_style: true,
                            starting_equipment: [8],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Pursuers",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "Evade",
                            requires_style: true,
                            starting_equipment: [8],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Ogre Pit Fighter",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            requires_style: false,
                            rules: "Fear; Large Target; Slow Witted",
                            starting_equipment: [8, 11, 12, 10, 13, 36, 4, 6],
                            stats: { "M": 6, "WS": 3, "BS": 2, "S": 4, "T": 4, "W": 3, "I": 3, "A": 2, "Ld": 7 },
                            hire_fee: "165",
                            race: "Ogre"
                        }
                    ]
                }
            },
            {
                name: "Shadow Warriors",
                data: {
                    "special_rules": "Distaste for Poison; Unforgiving; Tolerant",
                    "Race": "Elf",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Shadow Master",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed", "Special"],
                            rules: "Leader; Hate Dark Elves; Excellent Sight; Ithilmar",
                            starting_equipment: [8, 10, 15, 17, 21, 22, 23, 4, 18, 6, 48, 81, 90, 41, 54],
                            stats: { "M": 5, "WS": 5, "BS": 5, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 9 },
                            hire_fee: "70",
                            race: "Elf"
                        },
                        {
                            name: "Shadow Walker",
                            type: "hero",
                            allowed: "0-3",
                            exp: 12,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Hate Dark Elves; Excellent Sight; Ithilmar",
                            starting_equipment: [8, 10, 15, 17, 21, 22, 23, 4, 18, 6, 48, 81, 90, 41, 54],
                            stats: { "M": 5, "WS": 5, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Elf"
                        },
                        {
                            name: "Shadow Weaver",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Combat", "Academic", "Speed", "Special"],
                            rules: "Hate Dark Elves; Excellent Sight; Shadow Warrior Magic; Ithilmar",
                            starting_equipment: [8, 10, 15, 17, 21, 22, 23, 4, 18, 6, 48, 81, 90, 41, 54],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "55",
                            race: "Elf"
                        },
                        {
                            name: "Shadow Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hate Dark Elves; Excellent Sight; Ithilmar",
                            starting_equipment: [8, 10, 15, 17, 21, 22, 23, 4, 18, 6],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Elf"
                        },
                        {
                            name: "Shadow Novices",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hate Dark Elves; Excellent Sight; Ithilmar",
                            starting_equipment: [8, 10, 15, 17, 21, 22, 23, 4, 18, 6],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Elf"
                        }
                    ]
                }
            },
            {
                name: "Skaven of Clan Pestilens",
                data: {
                    "special_rules": null,
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Plague Priest",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 10, 15, 14, 13, 117, 112, 30, 18, 6, 4],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "85",
                            race: "Skaven (Clan Pestilens)"
                        },
                        {
                            name: "Pestilens Sorcerer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Magic of the Horned Rat",
                            starting_equipment: [8, 11, 10, 15, 14, 13, 117, 112, 30, 18, 6, 4],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "45",
                            race: "Skaven (Clan Pestilens)"
                        },
                        {
                            name: "Plague Monks",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 14, 13, 117, 112, 30, 18, 6, 4],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 5, "A": 1, "Ld": 6 },
                            hire_fee: "45",
                            race: "Skaven (Clan Pestilens)"
                        },
                        {
                            name: "Monk Initiates",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 14, 13, 117, 112, 30, 18, 6, 4],
                            stats: { "M": 5, "WS": 2, "BS": 3, "S": 2, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "20",
                            race: "Skaven (Clan Pestilens)"
                        },
                        {
                            name: "Plague Novices",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 30, 18, 6, 4],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Skaven (Clan Pestilens)"
                        },
                        {
                            name: "Giant Rats",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "15",
                            race: "Giant Rat"
                        },
                        {
                            name: "Rat Ogre",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Skaven Stupidity; Do not gain experience; Large Target",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 3, "BS": 3, "S": 5, "T": 5, "W": 3, "I": 4, "A": 3, "Ld": 4 },
                            hire_fee: "210",
                            race: "Rat Ogre"
                        }
                    ]
                }
            },
            {
                name: "Tileans (Miragleans)",
                data: {
                    "special_rules": "Miragleans Hired Sword",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Miragleans Crossbow Expert; Hate Skaven; Leader",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "Miragleans Crossbow Expert; Hate Skaven",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youngbloods",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Shooting", "Strength", "Speed"],
                            rules: "Miragleans Crossbow Expert; Hate Skaven",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Funerary Rites; Priest of Morr Loner; Priest of Morr",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hate Skaven",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "Miragleans Marksmen; Hate Skaven",
                            starting_equipment: [8, 11, 12, 10, 23, 26, 248, 27, 518, 22, 24, 173, 4, 6],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Duellists",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Cloak & Dagger; Hate Skaven",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Tileans (Remasens)",
                data: {
                    "special_rules": "Remasens Dark Elf Rout Test; Remasens Hired Sword",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader; Steadfast Officers",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 9 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Academic", "Strength"],
                            rules: "Steadfast Officers",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youngbloods",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Academic", "Speed"],
                            rules: "Steadfast Officers",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Funerary Rites; Priest of Morr Loner; Priest of Morr",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 23, 26, 248, 27, 518, 22, 24, 173, 4, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Duellists",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Cloak & Dagger",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Tileans (Trantios)",
                data: {
                    "special_rules": "Mercenaries (Trantios)",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Youngbloods",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Strength"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Funerary Rites; Priest of Morr Loner; Priest of Morr",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 23, 26, 248, 27, 518, 22, 24, 173, 4, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Duellists",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Cloak & Dagger",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 134, 16, 17, 136, 23, 26, 248, 27, 518, 21, 4, 18, 19, 6],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Tomb Guardians",
                data: {
                    "special_rules": "Undead; Flammable; Home Ground; Special Skill; Special Equipment",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Tomb Lord",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength"],
                            rules: "Fear; Immune to Psychology; No Pain; Leader; May not run; Immune to Poison; Flammable; Do not Drink; Flammable",
                            starting_equipment: [8, 11, 12, 10, 14, 15, 16, 17, 13, 21, 176, 159, 18, 4],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 5, "W": 3, "I": 3, "A": 2, "Ld": 8 },
                            hire_fee: "150",
                            race: "Tomb Lord"
                        },
                        {
                            name: "Liche Priest",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Special"],
                            rules: "Fear; Immune to Psychology; No Pain; May not run; Immune to Poison; Flammable; Do not Drink; Mortuary Cult Scrolls; May not wear armour",
                            starting_equipment: [8, 11, 135, 12, 10, 16, 137],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "55",
                            race: "Liche Priest"
                        },
                        {
                            name: "Acolytes",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Academic", "Special"],
                            rules: "Fear; Immune to Psychology; No Pain; May not run; Immune to Poison; Flammable; Do not Drink; Undead",
                            starting_equipment: [8, 11, 135, 12, 10, 16],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "20",
                            race: "Acolyte"
                        },
                        {
                            name: "Skeleton Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; No Pain; May not run; Immune to Poison; Do not gain experience; Flammable; Do not Drink; Undead",
                            starting_equipment: [8, 11, 12, 10, 14, 15, 16, 17, 13, 21, 176, 18, 4],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Skeleton"
                        },
                        {
                            name: "Tomb Guards",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; No Pain; May not run; Immune to Poison; Flammable; Do not Drink; Undead",
                            starting_equipment: [8, 11, 12, 10, 14, 15, 16, 17, 13, 21, 176, 18, 4],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "30",
                            race: "Skeleton"
                        },
                        {
                            name: "Tomb Scorpions",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Scorpions sting",
                            starting_equipment: [],
                            stats: { "M": 5, "WS": 2, "BS": 0, "S": 2, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "15",
                            race: "Scorpion"
                        },
                        {
                            name: "Skeleton Chariot",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Chariot Mounting; Chariot Movement; Chariot Difficult Ground; Chariot Melee; Chariot Shooting; Chariot Skill Requirment; Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 8, "WS": 0, "BS": 0, "S": 5, "T": 7, "W": 4, "I": 0, "A": 0, "Ld": 0 },
                            hire_fee: "150",
                            race: "Skeleton Chariot"
                        }
                    ]
                }
            }
        ]
    },
    {
        grade: "Grade 1c",
        description: "Experimental, not released through GW/Fanatic. Approved by people who previously submitted grade 1a/1b material and vouch for it's quality.",
        warbands: [
            {
                name: "Battle Monks of Cathay",
                data: {
                    "special_rules": "Strictures; Distaste for Poison; Outsiders",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Emissary",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Shooting", "Academic", "Speed", "Special"],
                            rules: "Leader; Ride Horse; Decree",
                            starting_equipment: [8, 15, 10, 144, 143, 27, 24, 21, 23, 4, 1, 18, 6, 53, 46],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Officer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Combat", "Shooting", "Strength", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 15, 10, 144, 27, 24, 21, 23, 4, 1, 18, 6, 53, 46],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Dragon Monks",
                            type: "hero",
                            allowed: "0-3",
                            exp: 15,
                            skills: ["Combat", "Academic", "Strength", "Speed", "Special"],
                            rules: "Cathayan Monk Unarmed; Art of Silent Death",
                            starting_equipment: [12, 15, 10, 135, 144, 113, 157, 28],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "55",
                            race: "Human"
                        },
                        {
                            name: "Soldiers",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 15, 10, 144, 27, 24, 21, 23, 4, 1, 18, 6, 53, 46],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Warrior Monks",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Cathayan Monk Unarmed",
                            starting_equipment: [12, 15, 10, 135, 144, 113, 157, 28],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Raging Peasants",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Unarmed; Do not gain experience; Mob; Ignored; Downtrodden",
                            starting_equipment: [],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "10",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Black Dwarfs",
                data: {
                    "special_rules": "Black Dwarf Hired Sword",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Sorcerer",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Strength", "Special"],
                            rules: "Hard to Kill; Hard Head; Armour; Leader; Rituals of Hashut",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 18, 6, 4, 1, 101, 26, 248, 25, 24, 452, 453, 454],
                            starting_spells: ["Sacrificial Ritual"],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "85",
                            race: "Dwarf"
                        },
                        {
                            name: "Bull Centaur",
                            type: "hero",
                            allowed: "0-1",
                            exp: 10,
                            skills: ["Combat", "Strength"],
                            rules: "Hard to Kill; Hard Head; Armour; Large Target",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 18, 6, 4, 1, 26, 248, 25, 24, 452, 453, 454],
                            stats: { "M": 8, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 3, "A": 2, "Ld": 9 },
                            hire_fee: "100",
                            race: "Bull Centaur Black Dwarf"
                        },
                        {
                            name: "Gaolers",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Special"],
                            rules: "Hard to Kill; Hard Head; Armour; Nasty Reputation",
                            starting_equipment: [8, 11, 11, 12, 10, 141, 17, 130, 18, 6, 4, 1, 26, 248, 25, 24, 452, 453, 454],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "50",
                            race: "Dwarf"
                        },
                        {
                            name: "Chaos Dwarfs",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Armour",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 18, 6, 4, 1, 26, 248, 25, 24, 452, 453, 454],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Informers",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Drudgery",
                            starting_equipment: [8, 11, 12, 15, 30, 21, 18, 6, 4, 452, 453, 454],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "15",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Bretonnian Chapel Guard",
                data: {
                    "special_rules": "Chivalry; Lord's Boon; **Virtue of Purity:** Knights with the Virtue of Purity may never voluntarily break from combat. **Special Skill List:** Heroes can choose from this list (e.g., Renowned Virtue, Questing Vow, Shield Bash, Bulging Muscles, Untiring).",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Questing Knight",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Strength", "Speed", "Special"],
                            rules: "Chivalry; Virtue of Purity; Leader; Ride; Vow of Poverty",
                            starting_equipment: [298, 299, 300, 8, 11, 15, 10, 110, 17, 16, 13, 4, 1, 18, 99, 6, 96, 45, 32],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "75",
                            race: "Human",
                            starting_skill: [601]
                        },
                        {
                            name: "Damsel",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Academic", "Speed"],
                            rules: "Lady’s Prayers",
                            starting_equipment: [8, 11, 12, 138, 15, 46],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Knight Errant",
                            type: "hero",
                            allowed: "0-3",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Chivalry; Virtue of Purity; Vain; Impetuous",
                            starting_equipment: [298, 299, 300, 8, 11, 15, 10, 110, 17, 16, 13, 128, 4, 1, 18, 99, 96, 45, 32],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Squires",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: ["Combat", "Academic", "Strength", "Speed"],
                            rules: "Knighthood",
                            starting_equipment: [8, 11, 12, 138, 15, 21, 22, 4, 6, 46, 10, 14, 17, 18, 19, 60],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Battle Pilgrim",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Low Caste; Hatred; Stubborn; Holy Relics Effect; Holy Relics Rules",
                            starting_equipment: [8, 11, 12, 138, 10, 15, 14, 17, 4, 18, 6, 19, 60],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Bowmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "Low Caste",
                            starting_equipment: [8, 11, 12, 138, 15, 21, 22, 4, 6],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 4 },
                            hire_fee: "15",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Court of the Profane Pleasures",
                data: {
                    "special_rules": "Corruption of the Mind and Flesh",
                    "Race": "Human",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Slaaneshi Whipmaster",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: [],
                            rules: "Mutations; Agony and Ecstasy; Pain and Pleasure",
                            starting_equipment: [8, 10, 11, 416, 417, 17, 4, 18, 19, 6, 40, 22, 26, 173, 155, 248],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Slaaneshi Danseuse",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: [],
                            rules: "Mutations; Strange Allure",
                            starting_equipment: [8, 10, 11, 416, 17, 40, 22, 26, 173, 155, 248],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Slaaneshi Flesh Merchant",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: [],
                            rules: "Mutations; Pound of Flesh; Cruel Fate",
                            starting_equipment: [8, 10, 11, 416, 17, 4, 18, 19, 6, 40, 22, 26, 173, 155, 248],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "65",
                            race: "Human"
                        },
                        {
                            name: "Slaaneshi Priest of Obscene",
                            type: "hero",
                            allowed: "0-1",
                            exp: 6,
                            skills: [],
                            rules: "Mutations; Flesh Reserve; Chaos Rituals",
                            starting_equipment: [8, 10, 11, 416, 17, 4, 18, 19, 6, 40, 22, 26, 173, 155, 248],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "50",
                            race: "Human"
                        },
                        {
                            name: "Slaaneshi Devout",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: [],
                            rules: "Mutations; Fluctuating Form; Immune to Psychology",
                            starting_equipment: [8, 10, 11, 416, 17, 4, 18, 19, 6, 40, 22, 26, 173, 155, 248],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "65",
                            race: "Human"
                        },
                        {
                            name: "Slaaneshi Chaos Hounds",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 7, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 3 },
                            hire_fee: "15",
                            race: "Chaos Hound"
                        },
                        {
                            name: "Slaaneshi Beastmen",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 10, 11, 17, 4, 18, 19, 6, 40, 22, 26, 173, 155, 248],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Beastmen"
                        },
                        {
                            name: "Cultists",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 10, 11, 17, 4, 18, 19, 6, 40, 22, 26, 173, 155, 2485],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Wretches",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Slaves to Darkness",
                            starting_equipment: [8, 11, 10, 15, 18, 19, 21],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Lustrian Reavers",
                data: {
                    "special_rules": "Promotions; Lustrian Reaver Hired Swords",
                    "Race": "Human",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Conqueror",
                            type: "hero",
                            allowed: "0-1",
                            exp: 24,
                            skills: ["Combat", "Strength"],
                            rules: "Survivor Combat; Survivor Post",
                            starting_equipment: [8, 10, 11, 131, 17, 128, 158, 28, 150, 26, 4, 18, 6, 19, 31, 40, 38, 35, 45, 88],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 2, "I": 3, "A": 2, "Ld": 7 },
                            hire_fee: "150",
                            race: "Human"
                        },
                        {
                            name: "Saurus Slayer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Duellist",
                            starting_equipment: [8, 10, 11, 131, 17, 128, 158, 28, 150, 26, 4, 18, 6, 19, 31, 40, 38, 35, 45, 88],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 8 },
                            hire_fee: "135",
                            race: "Human"
                        },
                        {
                            name: "Beastmaster",
                            type: "hero",
                            allowed: "0-1",
                            exp: 20,
                            skills: ["Shooting", "Strength", "Speed"],
                            rules: "War Beasts",
                            starting_equipment: [427, 428, 429, 8, 10, 11, 131, 17, 128, 158, 28, 150, 26, 4, 18, 6, 19, 31, 40, 38, 35, 45, 88],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "90",
                            race: "Human"
                        },
                        {
                            name: "Jungle Shadow",
                            type: "hero",
                            allowed: "0-1",
                            exp: 20,
                            skills: ["Academic", "Shooting", "Speed"],
                            rules: "Silent Hunter; Surprise attack; Canopy Walker",
                            starting_equipment: [8, 10, 11, 131, 17, 128, 158, 28, 150, 26, 4, 18, 6, 19, 31, 40, 38, 35, 45, 88],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "90",
                            race: "Human"
                        },
                        {
                            name: "Jungle Shadow Wizard",
                            type: "hero",
                            allowed: "0-1",
                            exp: 20,
                            skills: ["Academic", "Shooting", "Speed"],
                            rules: "Silent Hunter; Surprise attack; Canopy Walker; Lesser Magic",
                            starting_equipment: [8, 10, 11, 131, 17, 128, 158, 28, 150, 26, 4, 18, 6, 19, 31, 40, 38, 35, 45, 88],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "120",
                            race: "Human"
                        },
                        {
                            name: "Trapmaster",
                            type: "hero",
                            allowed: "0-1",
                            exp: 17,
                            skills: ["Combat", "Academic", "Shooting"],
                            rules: "Deadeye; Traps",
                            starting_equipment: [8, 10, 11, 131, 17, 128, 158, 28, 150, 26, 4, 18, 6, 19, 31, 40, 38, 35, 45, 88],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "140",
                            race: "Human"
                        },
                        {
                            name: "Prospects",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Promotion Only",
                            starting_equipment: [8, 10, 11, 15, 20, 4, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Maneaters",
                data: {
                    "special_rules": "Gluttony; Difficult Customers; Cannibals",
                    "Race": "Human",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Captain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Slow Witted; Large Target; Fear; Leader",
                            starting_equipment: [12, 133, 10, 15, 16, 17, 124, 143, 167, 6, 4, 1, 226, 194, 195, 212],
                            stats: { "M": 6, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 3, "I": 3, "A": 2, "Ld": 8 },
                            hire_fee: "145",
                            race: "Ogre"
                        },
                        {
                            name: "Mountain Guide",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Slow Witted; Large Target; Fear; Ranger; Loner",
                            starting_equipment: [12, 133, 10, 15, 17, 154, 6, 4],
                            stats: { "M": 6, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 3, "I": 3, "A": 2, "Ld": 8 },
                            hire_fee: "145",
                            race: "Ogre"
                        },
                        {
                            name: "Youngbloods",
                            type: "hero",
                            allowed: "0-3",
                            exp: 0,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Slow Witted",
                            starting_equipment: [12, 133, 10, 15, 16, 17, 124, 167, 6, 4, 1, 226, 194, 195, 212],
                            stats: { "M": 6, "WS": 2, "BS": 2, "S": 3, "T": 4, "W": 2, "I": 2, "A": 1, "Ld": 6 },
                            hire_fee: "45",
                            race: "Ogre"
                        },
                        {
                            name: "Half-growns",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Slow Witted; Fear",
                            starting_equipment: [12, 133, 10, 15, 16, 17, 124, 167, 6, 4, 1, 226, 194, 195, 212],
                            stats: { "M": 6, "WS": 3, "BS": 2, "S": 4, "T": 4, "W": 2, "I": 2, "A": 2, "Ld": 7 },
                            hire_fee: "85",
                            race: "Ogre"
                        },
                        {
                            name: "Bulls",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Slow Witted; Large Target; Fear; Bull Charge",
                            starting_equipment: [12, 133, 10, 15, 16, 17, 124, 167, 6, 4, 1, 226, 194, 195, 212],
                            stats: { "M": 6, "WS": 3, "BS": 2, "S": 4, "T": 4, "W": 2, "I": 3, "A": 2, "Ld": 7 },
                            hire_fee: "140",
                            race: "Ogre"
                        },
                        {
                            name: "Sabretusks",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Sabretusks Trained; Feral Instinct; Ignored; Fear; Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 8, "WS": 4, "BS": 0, "S": 4, "T": 4, "W": 2, "I": 4, "A": 3, "Ld": 4 },
                            hire_fee: "125",
                            race: "Sabretusk"
                        }
                    ]
                }
            },
            {
                name: "Marauders of Chaos (The Norse)",
                data: {
                    "special_rules": "Eye of the Gods; Marauders of Chaos Hired Swords; Reavers; Pantheon",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Chieftain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1],
                            stats: { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "95",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Seer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Combat", "Special"],
                            rules: "Mark of Chaos",
                            starting_equipment: [431, 433, 435, 437, 439, 8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Condemned",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Speed", "Strength", "Special"],
                            rules: "Inconsistency; Fear; Condemned Experience; Condemned Fate",
                            starting_equipment: [],
                            stats: { "M": 4, "WS": 0, "BS": 3, "S": 0, "T": 0, "W": 1, "I": 4, "A": 0, "Ld": 7 },
                            hire_fee: "55",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Marauders",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 13, 28, 18, 6, 4],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Warhounds of Chaos",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 7, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Warhound of Chaos"
                        },
                        {
                            name: "Spawn of Chaos",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Spawn of Chaos Special Attacks; Fear; Spawn of Chaos Special Movement; Immune to Psychology; Do not gain experience; Large Target",
                            starting_equipment: [],
                            stats: { "M": 0, "WS": 3, "BS": 0, "S": 4, "T": 5, "W": 3, "I": 32, "A": 0, "Ld": 10 },
                            hire_fee: "180",
                            race: "Spawn"
                        },
                        {
                            name: "Gor",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Hiring Limitation; No Talent",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Beastmen"
                        }
                    ]
                }
            },
            {
                name: "Marauders of Chaos (The Kurgan)",
                data: {
                    "special_rules": "Eye of the Gods; Marauders of Chaos Hired Swords; Pedigree; Bone Bows; Chaos Difficult Customers",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Chieftain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1, 21],
                            stats: { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "95",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Seer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Combat", "Special"],
                            rules: "Mark of Chaos",
                            starting_equipment: [431, 433, 435, 437, 439, 8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1, 21],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Condemned",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Speed", "Strength", "Special"],
                            rules: "Inconsistency; Fear; Condemned Experience; Condemned Fate",
                            starting_equipment: [],
                            stats: { "M": 4, "WS": 0, "BS": 3, "S": 0, "T": 0, "W": 1, "I": 4, "A": 0, "Ld": 7 },
                            hire_fee: "55",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1, 21],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Marauders",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 13, 28, 18, 6, 4, 21],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Warhounds of Chaos",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 7, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Warhound of Chaos"
                        },
                        {
                            name: "Spawn of Chaos",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Spawn of Chaos Special Attacks; Fear; Spawn of Chaos Special Movement; Immune to Psychology; Do not gain experience; Large Target",
                            starting_equipment: [],
                            stats: { "M": 0, "WS": 3, "BS": 0, "S": 4, "T": 5, "W": 3, "I": 32, "A": 0, "Ld": 10 },
                            hire_fee: "180",
                            race: "Spawn"
                        },
                        {
                            name: "Gor",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Hiring Limitation; No Talent",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Beastmen"
                        }
                    ]
                }
            },
            {
                name: "Marauders of Chaos (The Hung)",
                data: {
                    "special_rules": "Eye of the Gods; Marauders of Chaos Hired Swords; Disloyalty; Affinity with Horses",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Chieftain",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1, 21],
                            stats: { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "95",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Seer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Combat", "Special"],
                            rules: "Mark of Chaos",
                            starting_equipment: [431, 433, 435, 437, 439, 8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1, 21],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Condemned",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Speed", "Strength", "Special"],
                            rules: "Inconsistency; Fear; Condemned Experience; Condemned Fate",
                            starting_equipment: [],
                            stats: { "M": 4, "WS": 0, "BS": 3, "S": 0, "T": 0, "W": 1, "I": 4, "A": 0, "Ld": 7 },
                            hire_fee: "55",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 14, 16, 17, 13, 148, 104, 18, 6, 4, 1, 21],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Marauders",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 16, 13, 28, 18, 6, 4, 21],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Marauder of Chaos"
                        },
                        {
                            name: "Warhounds of Chaos",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 7, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Warhound of Chaos"
                        },
                        {
                            name: "Spawn of Chaos",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Spawn of Chaos Special Attacks; Fear; Spawn of Chaos Special Movement; Immune to Psychology; Do not gain experience; Large Target",
                            starting_equipment: [],
                            stats: { "M": 0, "WS": 3, "BS": 0, "S": 4, "T": 5, "W": 3, "I": 32, "A": 0, "Ld": 10 },
                            hire_fee: "180",
                            race: "Spawn"
                        },
                        {
                            name: "Gor",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Hiring Limitation; No Talent",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 4, 1, 18, 6],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Beastmen"
                        }
                    ]
                }
            },
            {
                name: "Merchant Caravans",
                data: {
                    "special_rules": "Merchant; Trade; Open for Business; Rarity; Merchant Caravan Hired Swords",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Merchant",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Shooting", "Academic", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 10, 136, 26, 248, 27, 518, 4, 1, 18, 6, 53],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "50",
                            race: "Human"
                        },
                        {
                            name: "Apprentice",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Academic", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 136, 26, 248, 27, 518, 4, 1, 18, 6, 53],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Knights Vanguard",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Lightning Reflexes; Ride; Hirelings",
                            starting_equipment: [8, 11, 10, 17, 144, 4, 1, 18, 6, 136, 26, 248, 27, 518, 53, 45],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Magician",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Lesser Magic; Hireling",
                            starting_equipment: [8, 11, 10, 136, 26, 248, 27, 518, 4, 1, 18, 6, 53],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Sell-swords",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 23, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 23, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Blackguards",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Unreliable Hirelings",
                            starting_equipment: [8, 11, 10, 17, 144, 4, 1, 18, 6],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Night Goblins",
                data: {
                    "special_rules": "Animosity; Hate Stunties",
                    "Race": "Goblin",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Big Boss",
                            type: "hero",
                            allowed: "1",
                            exp: 17,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 10, 15, 20, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Goblin"
                        },
                        {
                            name: "Shaman",
                            type: "hero",
                            allowed: "0-1",
                            exp: 10,
                            skills: ["Academic", "Speed", "Shooting"],
                            rules: "Waaaagh! Magic",
                            starting_equipment: [8, 11, 10, 15, 20, 18, 6, 4],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "50",
                            race: "Goblin"
                        },
                        {
                            name: "Boss",
                            type: "hero",
                            allowed: "0-4",
                            exp: 6,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 20, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Goblin"
                        },
                        {
                            name: "Night Goblin",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 20, 18, 6, 4],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Goblin"
                        },
                        {
                            name: "Fanatics",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Addict; Do not gain experience; Frenzy; Frantic",
                            starting_equipment: [17, 105, 119, 441],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Goblin"
                        },
                        {
                            name: "Cave Squig",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Squig Movement; Minderz; Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 0, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Squig"
                        },
                        {
                            name: "Troll",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Stupidity; Regeneration; Do not gain experience; Always Hungry; Vomit Attack; Large Target",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 3, "BS": 1, "S": 5, "T": 4, "W": 3, "I": 1, "A": 3, "Ld": 4 },
                            hire_fee: "200",
                            race: "Troll"
                        },
                        {
                            name: "Snotlings",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Snotlings Replacement Fee; Snotling Mob; Weedy; Dodgy; Insignificant",
                            starting_equipment: [8],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 2, "T": 2, "W": 1, "I": 3, "A": 1, "Ld": 4 },
                            hire_fee: "50",
                            race: "Snotling"
                        }
                    ]
                }
            },
            {
                name: "Night Goblins Web",
                data: {
                    "special_rules": "Animosity; Night Goblin Distasteful Company; Mad Cap Master",
                    "Race": "Night Goblin",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Boss",
                            type: "hero",
                            allowed: "1",
                            exp: 17,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Leader; Hate Stunties; Fear Elves; Da Biggest Boss",
                            starting_equipment: [8, 11, 10, 15, 14, 17, 107, 520, 30, 30, 28, 18, 6, 4, 35, 44, 211],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Night Goblin"
                        },
                        {
                            name: "Squig Herder",
                            type: "hero",
                            allowed: "0-1",
                            exp: 6,
                            skills: ["Combat", "Speed", "Special"],
                            rules: "Hate Stunties; Fear Elves; Handle Animal - Squig; Master Herder",
                            starting_equipment: [8, 11, 10, 15, 14, 17, 107, 520, 30, 30, 28, 18, 6, 4, 35, 44, 211],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Night Goblin"
                        },
                        {
                            name: "Goonz",
                            type: "hero",
                            allowed: "0-3",
                            exp: 4,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Hate Stunties; Fear Elves",
                            starting_equipment: [8, 11, 10, 15, 14, 17, 107, 520, 30, 30, 28, 18, 6, 4, 35, 44, 211],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Night Goblin"
                        },
                        {
                            name: "Shaman",
                            type: "hero",
                            allowed: "0-1",
                            exp: 6,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Goblin Magic; Hate Stunties; Fear Elves; Fungus Brew",
                            starting_equipment: [8, 11, 10, 15, 14, 17, 107, 520, 30, 30, 28, 18, 6, 4, 35, 44, 211],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Night Goblin"
                        },
                        {
                            name: "Night Goblin Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hate Stunties; Fear Elves; Animosity",
                            starting_equipment: [8, 11, 10, 15, 20, 18, 4, 35, 44, 211],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Night Goblin"
                        },
                        {
                            name: "Fanatics",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Addict; Loony",
                            starting_equipment: [17, 105, 520, 44],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Night Goblin"
                        },
                        {
                            name: "Cave Squig",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Squig Movement; Minderz; Do not gain experience; Just Squigs",
                            starting_equipment: [],
                            stats: { "M": 0, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Squig"
                        },
                        {
                            name: "Cave Squig - Trained",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Squig Movement; Minderz; Squig Herder Trained; Just Squigs",
                            starting_equipment: [],
                            stats: { "M": 0, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Squig"
                        },
                        {
                            name: "Troll",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Stupidity; Regeneration; Do not gain experience; Always Hungry; Vomit Attack; Large Target",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 3, "BS": 1, "S": 5, "T": 4, "W": 3, "I": 1, "A": 3, "Ld": 4 },
                            hire_fee: "200",
                            race: "Troll"
                        },
                        {
                            name: "Great Squig",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Great Squig Movement; Wild; Fear; Do not gain experience; Large Target",
                            starting_equipment: [],
                            stats: { "M": 0, "WS": 4, "BS": 0, "S": 5, "T": 5, "W": 3, "I": 4, "A": 3, "Ld": 5 },
                            hire_fee: "210",
                            race: "Great Squig"
                        },
                        {
                            name: "Snotlings",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Night Goblin Web Snotling Mob; Weedy; Night Goblin Web Dodgy; Night Goblin Web Insignificant; Do not gain experience",
                            starting_equipment: [8],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 2, "T": 2, "W": 1, "I": 3, "A": 1, "Ld": 4 },
                            hire_fee: "10",
                            race: "Snotling"
                        }
                    ]
                }
            },
            {
                name: "The Cursed Cavalcade",
                data: {
                    "special_rules": "Capture!; The Throne of Worms",
                    "Race": "Human",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Aristocrat",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed", "Special"],
                            rules: "Leader; Capture!",
                            starting_equipment: [445, 446, 447, 448, 450, 8, 441, 10, 11, 17, 440, 128, 443, 4, 1, 18, 19, 6, 442, 73, 22, 27, 518, 173, 25],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "65",
                            race: "Human"
                        },
                        {
                            name: "Companions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Capture!",
                            starting_equipment: [446, 447, 448, 450, 8, 441, 10, 11, 17, 128, 4, 1, 18, 19, 6, 442, 73, 22, 27, 518, 173, 25],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human",
                            starting_skill: [105]
                        },
                        {
                            name: "Twisted Scholar",
                            type: "hero",
                            allowed: "0-1",
                            exp: 4,
                            skills: ["Academic", "Speed"],
                            rules: "(None)",
                            starting_equipment: [446, 447, 448, 449, 450, 8, 441, 10, 11, 17, 128, 4, 1, 18, 19, 6, 442, 73, 22, 27, 518, 173, 25],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Twisted Scholar Wizard",
                            type: "hero",
                            allowed: "0-1",
                            exp: 4,
                            skills: ["Academic", "Speed"],
                            rules: "Lesser Magic",
                            starting_equipment: [446, 447, 448, 449, 450, 8, 441, 10, 11, 17, 128, 73, 22, 27, 518, 173, 25],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Twisted Scholar Chronicler",
                            type: "hero",
                            allowed: "0-1",
                            exp: 4,
                            skills: ["Academic", "Speed"],
                            rules: "Chronicler ",
                            starting_equipment: [446, 447, 448, 449, 450, 8, 441, 10, 11, 17, 128, 4, 1, 18, 19, 6, 442, 73, 22, 27, 518, 173, 25],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Cursed Piper",
                            type: "hero",
                            allowed: "0-1",
                            exp: 6,
                            skills: ["Academic", "Speed"],
                            rules: "Danse Macabre; Capture!",
                            starting_equipment: [446, 447, 448, 450, 8, 441, 10, 11, 128, 4, 1, 18, 19, 6, 442, 73, 27, 173, 25],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Thralls",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Thralls",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 17, 4, 18, 6, 20, 21, 23],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Great Bear",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Maddened With Pain; Large Target; Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 5, "WS": 3, "BS": 0, "S": 5, "T": 5, "W": 2, "I": 3, "A": 2, "Ld": 6 },
                            hire_fee: "140",
                            race: "Bear"
                        },
                        {
                            name: "Wild Beasts",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Wild Beast Charge; Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 4, "T": 4, "W": 1, "I": 5, "A": 2, "Ld": 5 },
                            hire_fee: "45",
                            race: "Wild Beast"
                        },
                        {
                            name: "Fighting Ape",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Agile; Do not gain experience; Two Cymbals",
                            starting_equipment: [451],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 4, "T": 4, "W": 1, "I": 5, "A": 2, "Ld": 5 },
                            hire_fee: "95",
                            race: "Ape"
                        }
                    ]
                }
            },
            {
                name: "The Restless Dead",
                data: {
                    "special_rules": null,
                    "Race": "Undead",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Liche",///done with equipment
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Academic", "Special"],
                            rules: "Leader; Necromancy (The Restless Dead); Fear; Immune to Psychology; No Pain; Immune to Poison; Eternal; Feed Upon Magic; Warrior Wizard; Liche Advancement",
                            starting_equipment: [18, 19, 6, 4, 1],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 2, "T": 2, "W": 4, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "125",
                            race: "Liche"
                        },
                        {
                            name: "Necromancer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Necromancy (The Restless Dead); Apprentices; Gofer",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 14, 17, 20, 21, 18, 19, 6, 4, 1],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Grave Guard",
                            type: "hero",
                            allowed: "0-3",
                            exp: 6,
                            skills: ["Combat", "Strength"],
                            rules: "Wight Blades; Fear; Immune to Poison; Immune to Psychology; No Pain; May not Run; No deal",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 14, 17, 20, 21, 18, 19, 6, 4, 1],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Grave Guard"
                        },
                        {
                            name: "Zombies",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Fear; May not run; Immune to Psychology; Immune to Poison; No Pain; Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 1, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Zombie"
                        },
                        {
                            name: "Skeletons",
                            type: "henchman",
                            allowed: "0-8",
                            exp: 0,
                            skills: [],
                            rules: "Fear; May not run; Immune to Psychology; Immune to Poison; No Pain; Do not gain experience",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 14, 17, 20, 21, 18, 19, 6, 4, 1],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Undead"
                        },
                        {
                            name: "Wights",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Fear; May not run; Immune to Psychology; Immune to Poison; No Pain; Wights Experience",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 14, 17, 20, 21, 18, 19, 6, 4, 1],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Wights"
                        },
                        {
                            name: "Scarecrows",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; Immune to Poison; No Pain; Do not gain experience; No Substance; Scarecrows Flammable; Construct; Animated Construct",
                            starting_equipment: [],
                            stats: { "M": 5, "WS": 3, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 3, "A": 2, "Ld": 10 },
                            hire_fee: "65",
                            race: "Undead"
                        }
                    ]
                }
            },

            {
                name: "The Sons of Hashut",
                data: {
                    "special_rules": "Slavers; Uncommon; Indentured Servants; Hashut Hired Swords",
                    "Race": "Chaos Dwarf",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Apprentice Sorcerer",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Special"],
                            rules: "Hard Head; Armour; Hard to Kill; Leader; Chaos Dwarfs Magic",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 26, 248, 4, 1, 18, 6, 452, 453, 454],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 9 },
                            hire_fee: "85",
                            race: "Chaos Dwarf"
                        },
                        {
                            name: "Bull Centaur",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Large Target",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 26, 248, 4, 1, 18, 6, 452, 453, 454],
                            stats: { "M": 7, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 3, "A": 2, "Ld": 9 },
                            hire_fee: "75",
                            race: "Bull Centaur Hashut"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Special"],
                            rules: "Hard Head; Armour; Hard to Kill",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 26, 248, 4, 1, 18, 6, 452, 453, 454],
                            stats: { "M": 3, "WS": 5, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "50",
                            race: "Chaos Dwarf"
                        },
                        {
                            name: "Chaos Dwarf Warriors",
                            type: "henchman",
                            allowed: "0-6",
                            exp: 0,
                            skills: [],
                            rules: "Hard Head; Armour; Hard to Kill",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 26, 248, 4, 1, 18, 6, 452, 453, 454],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Chaos Dwarf"
                        },
                        {
                            name: "Blunderbussers Chaos Dwarfs",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Hard Head; Armour; Hard to Kill;",
                            starting_equipment: [8, 11, 12, 10, 163, 26, 248, 4, 1, 6],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Chaos Dwarf"
                        },
                        {
                            name: "Hobgoblins",
                            type: "henchman",
                            allowed: "4+",
                            exp: 0,
                            skills: [],
                            rules: "Skinny; Nobody cares about them",
                            starting_equipment: [8, 12, 10, 118, 20, 21, 4, 18],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Hobgoblin"
                        }
                    ]
                }
            }
        ]
    },
    {
        grade: "Grade 2a",
        description: "Reliable, created and tested by fans and gaming groups. Will likely blend well with grade 1 warbands.",
        warbands: [
            {
                name: "Dreamwalkers, Cult Of Morr",
                data: {
                    "special_rules": "Choosen Of Morr; Dreamwalker Hired Swords; Dreamwalker Alliances",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Dreamer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader; Hate Undead; Guiding Dream",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 15, 4, 1, 18, 19, 6, 23, 21, 20, 26, 248],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Priest Of Morr",
                            type: "hero",
                            allowed: "1",
                            exp: 8,
                            skills: ["Academic", "Special", "Speed"],
                            rules: "Morr's ultimate enemies; Hate Undead; Dreamwalker Loner; Funerary Rites",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Andanti",
                            type: "hero",
                            allowed: "0-1",
                            exp: 6,
                            skills: ["Combat", "Shooting", "Strength", "Special"],
                            rules: "Morr's ultimate enemies; Hate Undead; Estalian Tecnique; Andanti Knowledge",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 15, 136, 129, 4, 1, 18, 19, 6, 23, 21, 20, 26, 248],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Black Guards",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Special", "Speed"],
                            rules: "Morr's ultimate enemies; Hate Undead; Silent Guardian",
                            starting_equipment: [8, 11, 11, 12, 10, 17, 15, 4, 1, 18, 19, 6, 23, 21, 20, 26, 248, 45],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "65",
                            race: "Human"
                        },
                        {
                            name: "Morr Worshwishpers",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Morr's ultimate enemies",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 4, 18, 6, 19, 21, 20],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Death's Heads Of Ostermark",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Morr's ultimate enemies; Expert Halberdier",
                            starting_equipment: [8, 10, 14, 4, 18, 6, 19, 23, 21, 20],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Druchii",
                data: {
                    "special_rules": "Black Powder Weapons (Dark Elves); Fey Acuity; Druchii Slavers; Druchii Hired Sword",
                    "Race": "Dark Elf",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Noble",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed", "Special"],
                            rules: "Kindred Hatred; Leader",
                            starting_equipment: [29, 34, 8, 12, 10, 464, 14, 15, 232, 6, 4, 18, 19, 206, 38, 156, 155, 28],
                            stats: { "M": 5, "WS": 5, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 9 },
                            hire_fee: "75",
                            race: "Dark Elf"
                        },
                        {
                            name: "Sorceress",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Kindred Hatred; Dark Elf Magic",
                            starting_equipment: [29, 34, 8, 12, 10, 464, 14, 15, 232, 6, 4, 18, 19, 206, 38, 156, 155, 28],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Dark Elf"
                        },
                        {
                            name: "Beastmaster",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Speed", "Special"],
                            rules: "Kindred Hatred; Slavehounds",
                            starting_equipment: [29, 34, 8, 12, 10, 464, 14, 15, 232, 6, 4, 18, 19, 206, 38, 156, 155, 28],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Dark Elf"
                        },
                        {
                            name: "Lordling",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Kindred Hatred",
                            starting_equipment: [29, 34, 8, 12, 10, 464, 14, 15, 232, 6, 4, 18, 19, 206, 38, 156, 155, 28],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Dark Elf"
                        },
                        {
                            name: "Corsairs",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Kindred Hatred",
                            starting_equipment: [8, 12, 10, 14, 15, 156, 6, 4, 18, 19, 206],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Dark Elf"
                        },
                        {
                            name: "Witch Elves",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Kindred Hatred; Frenzy; Maibd Poison",
                            starting_equipment: [],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Dark Elf"
                        },
                        {
                            name: "Shades",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [8, 12, 10, 14, 15, 6, 4, 37],
                            rules: "Kindred Hatred; Druchii Natural Stealth",
                            starting_equipment: [8, 12, 10, 156, 21, 28, 6, 4],
                            stats: { "M": 5, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Dark Elf"
                        },
                        {
                            name: "Slavehounds",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Slavehound Beastmaster; Pack Work",
                            starting_equipment: ["None"],
                            stats: { "M": 7, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "25",
                            race: "Cold One"
                        }
                    ]
                }
            },
            {
                name: "Dwarf Slayer Cult",
                data: {
                    "special_rules": "Grudgebearers; Damnable Luck; No Armour, No Toys!; Only in Victory; Record of Valor; Back-up Records; THE RITE OF TROLLSLAYING; THE RITE OF DRAGONSLAYING",
                    "Race": "Dwarf",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Giant Slayer",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Academic", "Special"],
                            rules: "Hard to Kill; Hard Head; Hate Orcs and Goblins; Deathwish; Leader; Gromril",
                            starting_equipment: [8, 11, 12, 103, 10, 17, 465],
                            stats: { "M": 3, "WS": 5, "BS": 4, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 9 },
                            hire_fee: "85",
                            race: "Dwarf"
                        },
                        {
                            name: "Doomseeker",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Hard to Kill; Hard Head; Hate Orcs and Goblins; Deathwish; Gromril",
                            starting_equipment: [8, 11, 12, 103, 10, 17, 13, 466],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "55",
                            race: "Dwarf"
                        },
                        {
                            name: "Rememberer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Academic", "Special"],
                            rules: "Hard to Kill; Hard Head; Hate Orcs and Goblins; Gromril; Rememberer; Pick up the Slack",
                            starting_equipment: [8, 11, 12, 103, 10, 15, 17, 4, 6, 18, 19, 465, 26, 248, 23],
                            stats: { "M": 3, "WS": 3, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Troll Slayer",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Hate Orcs and Goblins; Deathwish; Gromril",
                            starting_equipment: [8, 11, 12, 103, 10, 17, 465],
                            stats: { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Axe Hurlers",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Hate Orcs and Goblins; Gromril, Strong Arm; Born Marksmen; Skittish",
                            starting_equipment: [8, 11, 12, 103, 10, 17, 465],
                            stats: { "M": 3, "WS": 3, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                            hire_fee: "40",
                            race: "Dwarf"
                        },
                        {
                            name: "Stubbles",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hard to Kill; Hard Head; Hate Orcs and Goblins; Gromril; Skittish",
                            starting_equipment: [8, 11, 12, 103, 10, 17, 465],
                            stats: { "M": 3, "WS": 3, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 8 },
                            hire_fee: "25",
                            race: "Dwarf"
                        }
                    ]
                }
            },
            {
                name: "Grave Robbers",
                data: {
                    "special_rules": "Grave Goods; Shady Reputation; Hate Undead",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Graver",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 468, 4, 1, 18, 19, 6, 20, 21, 23, 467, 469, 470],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Grave Robber",
                            type: "hero",
                            allowed: "0-2",
                            exp: 4,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 468, 4, 1, 18, 19, 6, 20, 21, 23, 467, 469, 470],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Junior Medic",
                            type: "hero",
                            allowed: "0-1",
                            exp: 2,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Sawbones",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 468, 4, 1, 18, 19, 6, 20, 21, 23, 467, 469, 470],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Lookouts",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Shooting", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 14, 17, 468, 4, 1, 18, 19, 6, 20, 21, 23, 467, 469, 470],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Thugs",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 4, 18, 20, 21],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Halflings",
                data: {
                    "special_rules": "Pretty much human; Too Big; Halfling Items",
                    "Race": "Halfling",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Halfling Elder",
                            type: "hero",
                            allowed: "1 only",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [8, 145, 115, 10, 17, 15, 4, 19, 98, 62, 20, 21],
                            stats: { "M": 4, "WS": 3, "BS": 5, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 9 },
                            hire_fee: "60",
                            race: "Halfling"
                        },
                        {
                            name: "Halfling Cook",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Strength", "Speed", "Special"],
                            rules: "Master Chef",
                            starting_equipment: [8, 145, 115, 10, 17, 15, 4, 19, 98, 20, 21],
                            stats: { "M": 4, "WS": 4, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Halfling"
                        },
                        {
                            name: "Halfling Thief",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Shooting", "Combat", "Speed", "Special"],
                            rules: "Infiltrator; Pick Locks; Cutpurse",
                            starting_equipment: [8, 11, 12, 10, 155, 26, 248, 28, 4, 19, 31, 63],
                            stats: { "M": 4, "WS": 2, "BS": 4, "S": 2, "T": 2, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Halfling"
                        },
                        {
                            name: "Halfling Youths",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Shooting", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 145, 115, 10, 17, 15, 4, 19, 98, 20, 21],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 2, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "10",
                            race: "Halfling"
                        },
                        {
                            name: "Halfling Scouts",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 145, 115, 10, 4, 19, 20, 21],
                            stats: { "M": 4, "WS": 2, "BS": 4, "S": 2, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "20",
                            race: "Halfling"
                        },
                        {
                            name: "Halfling Warriors",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 145, 115, 10, 17, 15, 4, 19, 98, 20],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "25",
                            race: "Halfling"
                        },
                        {
                            name: "Piggies",
                            type: "henchman",
                            allowed: "0-4",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 5, "WS": 4, "BS": 0, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 4 },
                            hire_fee: "20",
                            race: "Pigs"
                        },
                        {
                            name: "Village Ogre",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Large Target; Slow Witted; Protective; Ogre Skills",
                            starting_equipment: [8, 11, 12, 10, 17, 22, 4, 6],
                            stats: { "M": 6, "WS": 3, "BS": 2, "S": 4, "T": 4, "W": 3, "I": 3, "A": 2, "Ld": 7 },
                            hire_fee: "140",
                            race: "Ogre"
                        }
                    ]
                }
            },
            {
                name: "Masters Of Horror",
                data: {
                    "special_rules": "**Hired Swords** (Same as Undead warband); **No Promotion** (Zombies/Flesh Constructs cannot become Heroes); Heroes have access to **unique Special Equipment** (e.g., Chainsaw Sword, Electric Trident, Repeater Pistol).",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Mad Scientist",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Academic", "Special", "Speed"],
                            rules: "Leader; Immune to Psychology",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 4, 18, 6, 21, 20, 471, 472, 473],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Thrall",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Fear; No Pain; Immune to Psychology; Immune to Poison",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 4, 18, 6, 21, 20, 471, 472, 473],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "70",
                            race: "Vampire"
                        },
                        {
                            name: "Wolfman",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 3, "S": 4, "T": 3, "W": 2, "I": 2, "A": 2, "Ld": 7 },
                            hire_fee: "65",
                            race: "Wolfman"
                        },
                        {
                            name: "Hunchback",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 4, 18, 6, 21, 20, 471, 472, 473],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Flesh Construct",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; Immune to Poison; No Pain; A Bit Unhinged; Its only a flesh wound; Cannot Run",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 3, "BS": 0, "S": 4, "T": 5, "W": 2, "I": 2, "A": 2, "Ld": 6 },
                            hire_fee: "80",
                            race: "Construct"
                        },
                        {
                            name: "Bitten",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Transform",
                            starting_equipment: [8, 11, 12, 10, 15, 18],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Zombies",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Do not gain experience; No Pain; May not Run; Immune to Psychology; Immune to Poison",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 2, "BS": 0, "S": 3, "T": 4, "W": 1, "I": 1, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Zombie(MH)"
                        }
                    ]
                }
            },
            {
                name: "Mazzalupo",
                data: {
                    "special_rules": null,
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Wandering knight",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Leader; Commands",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 14, 15, 128, 4, 5, 18, 19, 6, 670],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human",
                            starting_skill: [601]
                        },
                        {
                            name: "Fallen nobles",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Academic", "Strength", "Speed"],
                            rules: "Indolent; Ye give way",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 14, 15, 128, 4, 5, 18, 19, 6, 670],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human",
                            starting_skill: [601]
                        },
                        {
                            name: "Master of finances",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Shooting", "Academic"],
                            rules: "Corruption",
                            starting_equipment: [8, 11, 12, 10, 15, 4, 5, 18, 19, 6, 23, 21, 20, 30],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human",
                            starting_skill: [304]
                        },
                        {
                            name: "Squire",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "Petty thief",
                            starting_equipment: [8, 11, 12, 10, 15, 4, 5, 18, 19, 6, 23, 21, 20, 30],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Sheepherders",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 4, 18, 6, 23, 20, 30, 519],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Churls",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 4, 18, 6, 23, 20, 30, 519],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Black sheep",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Sheep Stupidity; Butcher’s meat; Mountain animals",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "10",
                            race: "Sheep"
                        }
                    ]
                }
            },
            {
                name: "Necrarchs, the Soul Stealers",
                data: {
                    "special_rules": "Death of the Leader",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Necrarch Vampire",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Academic", "Strength", "Speed", "Special"],
                            rules: "Leader; Necromancy; Fear; Immune to Psychology; Immune to Poison; No Pain",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 21, 20, 4, 18, 6, 474, 60, 475],
                            stats: { "M": 6, "WS": 3, "BS": 3, "S": 4, "T": 4, "W": 2, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "110",
                            race: "Necrarch Vampire"
                        },
                        {
                            name: "Thrall",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Strength", "Speed", "Special"],
                            rules: "Fear; Immune to Psychology; Immune to Poison; No Pain",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 21, 20, 4, 18, 6, 474, 60, 475],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "60",
                            race: "Vampire"
                        },
                        {
                            name: "Acolyte",
                            type: "hero",
                            allowed: "0-3",
                            exp: 0,
                            skills: ["Academic", "Speed"],
                            rules: "Vassal",
                            starting_equipment: [8, 11, 12, 10, 15, 21, 18],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Skeletal Warriors",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; Immune to Poison; No Pain; May not run; Do not gain experience",
                            starting_equipment: [8, 11, 12, 10, 15, 21, 18],
                            stats: { "M": 4, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 1, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Skeleton"
                        },
                        {
                            name: "Abominations",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; Immune to Poison; No Pain; May not run; Do not gain experience; Large Target; Powered; Spare Parts",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 1, "A": 1, "Ld": 5 },
                            hire_fee: "190",
                            race: "Construct"
                        },
                        {
                            name: "Waifs",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Fanatical",
                            starting_equipment: [8, 11, 12, 10, 15, 21, 18],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Zombies",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; Immune to Poison; No Pain; May not run; Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 4, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 1, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Zombie"
                        }
                    ]
                }
            },
            {
                name: "Nipponese Expedition",
                data: {
                    "special_rules": "Strategic Minded",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Hatamoto",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Stregth", "Speed", "Special"],
                            rules: "Leader",
                            starting_equipment: [521, 522, 523, 17, 524, 525, 526, 531, 527, 528, 23, 529, 26, 4, 1, 6, 530, 532, 7, 46, 45],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human",
                            starting_skill: [601]
                        },
                        {
                            name: "Vim-To Mage",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Tenants of the Order; Arcane Vim-Toist",
                            starting_equipment: [11, 521],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Shinobi",
                            type: "hero",
                            allowed: "0-1",
                            exp: 15,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Shinobi Infiltration; Shinobi Loner",
                            starting_equipment: [521, 522, 523, 524, 533, 120, 534, 28, 150, 527, 528, 23, 52, 56, 63, 31, 78],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Retainer",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [521, 522, 523, 17, 524, 525, 526, 531, 527, 528, 23, 529, 26, 4, 1, 6, 530, 532, 7, 46, 45],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human",
                            starting_skill: [601]
                        },
                        {
                            name: "Ashigaru",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Wall of Steel",
                            starting_equipment: [521, 522, 523, 17, 524, 525, 526, 527, 528, 23, 529, 4, 1, 6, 530],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Onnabushi",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Wardens of the Castle",
                            starting_equipment: [521, 522, 523, 17, 524, 525, 526, 527, 528, 23, 529, 4, 1, 6, 530],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Warrior Monk",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [521, 522, 523, 17, 524, 525, 526, 528, 530, 4],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Ogre Hunting Party",
                data: {
                    "special_rules": "Greenskins; Ideas Above Their Station; Ogre Hunting Party Distasteful Company",
                    "Race": "Mixed",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Ogre Hunter",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Leader; Fear; Large Target; Ignore All Alone Tests; Slow Witted; Don't Fight with Eating Knives; Lazy; Central Figure",
                            starting_equipment: [115, 133, 10, 15, 17, 154, 4, 6],
                            stats: { "M": 6, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 3, "I": 3, "A": 2, "Ld": 8 },
                            hire_fee: "145",
                            race: "Ogre Hunting Party"
                        },
                        {
                            name: "Trapper",
                            type: "hero",
                            allowed: "0-3",
                            exp: 8,
                            skills: ["Shooting", "Combat", "Speed", "Special"],
                            rules: "Veteran Tracker",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 476, 28, 4, 18, 6, 31, 477],
                            stats: { "M": 4, "WS": 2, "BS": 4, "S": 2, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "30",
                            race: "Gnoblar"
                        },
                        {
                            name: "Sabre-Baiter",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Speed", "Special"],
                            rules: "Bait",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 476, 28, 4, 18, 6, 31, 477],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 2, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Gnoblar"
                        },
                        {
                            name: "Gnoblar Fighters",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Bicker",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 476, 4, 18, 6, 31],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 2, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Gnoblar"
                        },
                        {
                            name: "Flingers",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "Bicker; Scrap Slinger",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 476, 30, 4, 18, 6, 31],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 2, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Gnoblar"
                        },
                        {
                            name: "Sabretusk",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Fear; Untamed; Sabretusk Charge; Tough Hide",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 4, "T": 4, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "50",
                            race: "Sabretusk"
                        }
                    ]
                }
            },
            {
                name: "Order Of The Mare",
                data: {
                    "special_rules": "Order of the Mare Hired swords; Horse and rider",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Paragon",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Strength", "Speed"],
                            rules: "Leader; Knight's Virtue; Vow of poverty",
                            starting_equipment: [8, 11, 12, 10, 17, 13, 16, 128, 18, 6, 4, 1, 96, 45],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Dame of the Mare",
                            type: "hero",
                            allowed: "1",
                            exp: 8,
                            skills: ["Combat", "Academic", "Strength", "Speed"],
                            rules: "Blessings of the Mare; Dame Armour",
                            starting_equipment: [8, 11, 10, 16],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "55",
                            race: "Human"
                        },
                        {
                            name: "Gallant",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Knight's Virtue",
                            starting_equipment: [8, 11, 12, 10, 17, 13, 16, 128, 18, 6, 4, 1, 96, 45],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Esquiresses",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting", "Speed"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 21, 22, 18, 6, 4, 46],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Human"
                        },
                        {
                            name: "Pilgrims",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Hatred; Peasants",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 17, 13, 16, 21, 18, 6, 4],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Bowmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 21, 22, 18, 6, 4],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Redeemed Knights",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Knight's Virtue.",
                            starting_equipment: [8, 11, 12, 10, 17, 13, 16, 128, 18, 6, 4, 1, 96, 45],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Companion Filly",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Filly Armour",
                            starting_equipment: ["None"],
                            stats: { "M": 8, "WS": 4, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 5 },
                            hire_fee: "50",
                            race: "Filly"
                        }
                    ]
                }
            },
            {
                name: "Outlaws of Stirwood Forest",
                data: {
                    "special_rules": "Outlaws Missile Restriction",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Bandit Leader",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed"],
                            rules: "Leader",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 17, 21, 20, 22, 4, 6, 18, 91, 62],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Champions",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 17, 21, 20, 22, 4, 6, 18, 91, 62],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Cleric",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Prayers of Sigmar; Hiring Restriction",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 17, 21, 20, 22, 4, 6, 18, 91, 62],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Petty Thieves",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Shooting"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 17, 21, 20, 22, 4, 6, 18, 91, 62],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Marksmen",
                            type: "henchman",
                            allowed: "0-7",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 17, 21, 20, 4, 6, 18],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Outlaws",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 11, 12, 10, 15, 17, 21, 20, 4, 6, 18],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Protectorate Of Sigmar",
                data: {
                    "special_rules": "Death of a Leader; Protectorate Of Sigmar Hired Swords",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Warrior Priest",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Strength", "Special"],
                            rules: "Leader; Prayers of Sigmar",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 123, 23, 26, 22, 4, 1, 18, 19, 6, 479, 177, 478, 60, 248],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "80",
                            race: "Human"
                        },
                        {
                            name: "Templars",
                            type: "hero",
                            allowed: "0-2",
                            exp: 12,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Zealous",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 123, 23, 26, 22, 4, 1, 18, 19, 6, 479, 177, 478, 60, 248],
                            stats: { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Acolytes",
                            type: "hero",
                            allowed: "0-2",
                            exp: 2,
                            skills: ["Combat", "Academic", "Strength", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 123, 23, 26, 22, 4, 1, 18, 19, 6, 479, 177, 478, 60, 248],
                            stats: { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Huntsman",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Special"],
                            rules: "Huntsman Hiring Restriction; Huntsman Beastmaster",
                            starting_equipment: [8, 10, 22, 478],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Archers",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 23, 26, 22, 4, 1, 18, 19, 6, 248],
                            stats: { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Crusaders",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 17, 23, 26, 22, 4, 1, 18, 19, 6, 248],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Hounds",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Devoted",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "15",
                            race: "Hound"
                        }
                    ]
                }
            },
            {
                name: "Skaven of Clan Moulder",
                data: {
                    "special_rules": "Goading",
                    "Race": "Skaven",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Packmaster",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader; Master Handler; Poke 'em in the squidgy bits; Goading",
                            starting_equipment: [8, 11, 10, 14, 13, 15, 480, 481, 30, 172, 13, 4, 1, 18, 19, 6],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "75",
                            race: "Skaven"
                        },
                        {
                            name: "Stormvermin",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 14, 13, 15, 30, 172, 13, 4, 1, 18, 19, 6],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "40",
                            race: "Skaven"
                        },
                        {
                            name: "Apprentice",
                            type: "hero",
                            allowed: "0-2",
                            exp: 4,
                            skills: ["Combat", "Academic", "Speed", "Special"],
                            rules: "Novice Handler; Heir to Power; Goading",
                            starting_equipment: [8, 11, 10, 14, 13, 15, 480, 481, 30, 172, 13, 4, 1, 18, 19, 6],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "25",
                            race: "Skaven"
                        },
                        {
                            name: "Clanrat",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 30, 4, 18, 6],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Skaven"
                        },
                        {
                            name: "Giant Rats",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Pack Size; Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 2, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "15",
                            race: "Giant Rat"
                        },
                        {
                            name: "Wolf Rats",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Poisoned Attack; Do not gain experience",
                            starting_equipment: ["None"],
                            stats: { "M": 9, "WS": 3, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "30",
                            race: "Wolf Rats"
                        },
                        {
                            name: "Rat Ogres",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Skaven Stupidity; Do not gain experience; Large Target; It's Alive!; Hard to handle",
                            starting_equipment: ["None"],
                            stats: { "M": 6, "WS": 3, "BS": 3, "S": 5, "T": 5, "W": 3, "I": 4, "A": 3, "Ld": 4 },
                            hire_fee: "200",
                            race: "Rat Ogre"
                        }
                    ]
                }
            },
            {
                name: "Snotlings",
                data: {
                    "special_rules": "Weakness in Numbers; Scavengers!; Too Unruly; That (Git)'s Got Talent!",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Bullied Goblin",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Special", "Speed"],
                            rules: "Leader; Not a Snotling; Mob Rule; The Rigors of Leadership",
                            starting_equipment: [8, 11, 12, 10, 17, 4, 18, 6, 20, 483, 484],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "35",
                            race: "Goblin"
                        },
                        {
                            name: "BigSnotz",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Speed", "Special"],
                            rules: "Mob Rule; The Rigors of Leadership; Dodgy; Small Target; Small Hands; Not So Tough",
                            starting_equipment: [8, 11, 12, 10, 17, 4, 18, 6, 20, 483, 484],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 2, "T": 2, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Snotling"
                        },
                        {
                            name: "Scouts",
                            type: "hero",
                            allowed: "0-2",
                            exp: 4,
                            skills: ["Shooting", "Speed", "Special"],
                            rules: "Mob Rule; The Rigors of Leadership; Snotling Scout; Dodgy; Small Target; Small Hands; Not So Tough; He’s No Threat!",
                            starting_equipment: [8, 11, 12, 10, 17, 18, 6, 483, 484],
                            stats: { "M": 5, "WS": 1, "BS": 2, "S": 1, "T": 1, "W": 1, "I": 5, "A": 1, "Ld": 4 },
                            hire_fee: "20",
                            race: "Snotling"
                        },
                        {
                            name: "Snotling Shaman",
                            type: "hero",
                            allowed: "0-1",
                            exp: 4,
                            skills: ["Speed", "Special"],
                            rules: "Mob Rule; The Rigors of Leadership; Snotling Waaagh!; Eadache!; Dodgy; Small Target; Small Hands; Not So Tough",
                            starting_equipment: [8, 11, 12, 10, 17, 18, 6, 483, 484],
                            stats: { "M": 4, "WS": 1, "BS": 1, "S": 1, "T": 1, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "30",
                            race: "Snotling"
                        },
                        {
                            name: "Shoota Teams",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Teamwork; Cumbersome; Recoil; Dodgy; Small Target; Small Hands; Not So Tough",
                            starting_equipment: [8, 11, 483, 484, 23, 25, 26],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 1, "T": 1, "W": 2, "I": 3, "A": 2, "Ld": 4 },
                            hire_fee: "25",
                            race: "Snotling"
                        },
                        {
                            name: "Snotling Mobs",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Teamwork; Not So Small, Surprisingly Tough; Mass Stupidity; Mob Mentality; Small Hands; Dodgy",
                            starting_equipment: [8, 11, 12, 17, 483, 484],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 2, "T": 2, "W": 3, "I": 3, "A": 3, "Ld": 5 },
                            hire_fee: "40",
                            race: "Snotling"
                        },
                        {
                            name: "Runts",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Teeny Hands; Smallest of the Small; Experience; Swarm Size; Dodgy; Small Target; Small Hands; Not So Tough",
                            starting_equipment: [8, 11, 12, 10, 17, 483, 484],
                            stats: { "M": 4, "WS": 1, "BS": 1, "S": 1, "T": 1, "W": 1, "I": 4, "A": 1, "Ld": 3 },
                            hire_fee: "5",
                            race: "Snotling"
                        },
                        {
                            name: "Wheelo",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Speed", "Strength"],
                            rules: "Wheelo Walking; Wheelo Running/Charging; Wheelo Impact Hits; Wheelo Combat; Wheelo Tough Machine; Wheelo Upgrades; Wheelo Weapons Training; Wheelo Sprint; Wheelo Mighty Blow; Wheelo Weapons Training Axe; Wheelo Weapons Training Club; Wheelo Weapons Training Spear; Wheelo Weapons Training Morning Star",
                            starting_equipment: [483],
                            stats: { "M": 0, "WS": 2, "BS": 2, "S": 4, "T": 3, "W": 2, "I": 5, "A": 2, "Ld": 6 },
                            hire_fee: "100",
                            race: "Wheelo"
                        }
                    ]
                }
            },
            {
                name: "Sorcerous Society",
                data: {
                    "special_rules": "Keep it secret, keep it safe!; The Vagaries of Magic",
                    "Race": "Human",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Magus",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Academic", "Speed"],
                            rules: "Leader; Lesser Magic; Elemental Lore of Water; Elemental Lore of Fire; Elemental Lore of Earth; Elemental Lore of Air",
                            starting_equipment: [487, 488, 489, 490, 8, 11, 12, 10, 486, 15, 14, 17, 4, 1, 18, 6, 21, 23, 26, 248, 24],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "70",
                            race: "Human"
                        },
                        {
                            name: "Companion",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength"],
                            rules: "Don't look at me!; Body Guard",
                            starting_equipment: [487, 488, 489, 490, 8, 11, 12, 10, 486, 15, 14, 17, 4, 1, 18, 6, 21, 23, 26, 248, 24],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Human"
                        },
                        {
                            name: "Mages",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Lesser Magic; Elemental Lore of Water; Elemental Lore of Fire; Elemental Lore of Earth; Elemental Lore of Air; Respect your betters",
                            starting_equipment: [487, 488, 489, 490, 8, 11, 12, 10, 486, 15, 14, 17, 4, 1, 18, 6, 21, 23, 26, 248, 24],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Untrained",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Here, hold this; Harnessed",
                            starting_equipment: [8, 11, 12, 10, 486, 15, 14, 17, 4, 1, 18, 6, 21, 23, 26, 248, 24],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Grunts",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Prove that Talent!",
                            starting_equipment: [8, 11, 12, 10, 486, 15, 14, 17, 4, 1, 18, 6, 21, 23, 26, 248, 24],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        }
                    ]
                }
            },
            {
                name: "Survivors Of Strigos",
                data: {
                    "special_rules": "Undead Leader; Survivors Of Strigos Hired Swords",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Strigoi Vampire",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Leader; Strigoi Kindred Hatred; Fear; Immune to Psychology; Immune to Poison; No Pain",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 6, "A": 2, "Ld": 8 },
                            hire_fee: "115",
                            race: "Vampire"
                        },
                        {
                            name: "Seer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Seeker; Charms & Hexes",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 491, 17, 28, 21, 20, 4, 1, 18, 6, 492, 493, 60, 494],
                            stats: { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Domnu",
                            type: "hero",
                            allowed: "0-3",
                            exp: 4,
                            skills: ["Combat", "Strength", "Special"],
                            rules: "Child of Darknes; Gypsy Ward.",
                            starting_equipment: [8, 11, 12, 10, 15, 14, 491, 17, 28, 21, 20, 4, 1, 18, 6, 492, 493, 60, 494],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "30",
                            race: "Human"
                        },
                        {
                            name: "Strigany",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15, 28, 4, 18],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Ghouls",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Fear",
                            starting_equipment: [],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 4, "W": 1, "I": 3, "A": 2, "Ld": 5 },
                            hire_fee: "40",
                            race: "Ghoul"
                        },
                        {
                            name: "Giant Bats",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Giant Bats Fly; Large Target; Sonic",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 3, "T": 3, "W": 2, "I": 3, "A": 1, "Ld": 6 },
                            hire_fee: "40",
                            race: "Giant Bat"
                        }
                    ]
                }
            },
            {
                name: "Vampire Hunters of Sylvania",
                data: {
                    "special_rules": "Vampire Hunters of Sylvania Hired Swords",
                    "Race": "Human",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Vampire Hunter",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader; Stake the Vampire!",
                            starting_equipment: [8, 11, 12, 10, 463, 495, 17, 23, 26, 248, 155, 4, 18, 6, 177, 478, 60, 496],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Priest of Morr",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Priest of Morr Loner; Funerary Rites",
                            starting_equipment: [8, 463],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Slayers",
                            type: "hero",
                            allowed: "0-3",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Strength", "Speed", "Special"],
                            rules: "Stake the Vampire!",
                            starting_equipment: [8, 11, 12, 10, 463, 495, 17, 23, 26, 248, 155, 4, 18, 6, 177, 478, 60, 496],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Villagers",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 15],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Pilgrims",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Fanatical; Blunt",
                            starting_equipment: [11, 495],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 10 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Wolfhounds",
                            type: "henchman",
                            allowed: "0-4",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Wolfhound"
                        }
                    ]
                }
            },
            {
                name: "Wood Elves of Athel Loren",
                data: {
                    "special_rules": "Hate Dark Elves; Excellent Sight; Unforgiving; Tolerant",
                    "Race": "Elf",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Hunt Master",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed", "Special"],
                            rules: "Leader; Ithilmar",
                            starting_equipment: [8, 10, 17, 15, 4, 18, 90, 41, 62, 21, 22, 153, 3],
                            stats: { "M": 5, "WS": 4, "BS": 5, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 9 },
                            hire_fee: "60",
                            race: "Elf"
                        },
                        {
                            name: "Waywatcher",
                            type: "hero",
                            allowed: "0-2",
                            exp: 12,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Sniper; Camouflage; Ithilmar",
                            starting_equipment: [8, 10, 17, 15, 4, 18, 90, 41, 62, 21, 22, 153, 3],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Elf"
                        },
                        {
                            name: "Forest Mage",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Shooting", "Academic", "Speed", "Special"],
                            rules: "Woodland Incantations; Ithilmar",
                            starting_equipment: [8, 10, 17, 15, 4, 18, 90, 41, 62, 21, 22, 153, 3],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "55",
                            race: "Elf"
                        },
                        {
                            name: "Deepwood Scouts",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Crossfire; Ithilmar",
                            starting_equipment: [8, 11, 12, 10, 21, 22, 153, 4, 3, 90, 41, 62],
                            stats: { "M": 5, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Elf"
                        },
                        {
                            name: "Glade Guard",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Ithilmar",
                            starting_equipment: [8, 11, 12, 10, 21, 22, 153, 4, 3, 90, 41, 62],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Elf"
                        }
                    ]
                }
            }

        ]
    },
    {
        grade: "Grade 2b",
        description: "Supplemental",
        warbands: [
            {
                name: "Lothern Sea Patrol",
                data: {
                    "special_rules": "Look Rich; Fine Craftwork; Honourable; Teetotalers; Swabbies",
                    "Race": "Mixed",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Commodore",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed", "Special", "Pirate"],
                            rules: "Leader; Ithilmar; Excellent Eyes; Honours",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 21, 22, 18, 19, 6, 4, 3, 553, 554, 555, 556, 557, 558, 559, 560],
                            stats: { "M": 5, "WS": 5, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 9 },
                            hire_fee: "70",
                            race: "Elf"
                        },
                        {
                            name: "Mist Mage",
                            type: "hero",
                            allowed: "0-1",
                            exp: 10,
                            skills: ["Academic", "Speed", "Special"],
                            rules: "Ithilmar; Excellent Eyes; Spells of The Lothen Sea",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 21, 22, 18, 19, 6, 4, 3],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "50",
                            race: "Elf"
                        },
                        {
                            name: "Bossuns",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed", "Special", "Pirate"],
                            rules: "Ithilmar; Excellent Eyes; Honours; Disciplined",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 21, 22, 18, 19, 6, 4, 3, 553, 554, 555, 556, 557, 558, 559, 561],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "50",
                            race: "Elf"
                        },
                        {
                            name: "Ships Company",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Ithilmar; Excellent Eyes",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 21, 22, 18, 19, 6, 4, 3],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Elf"
                        },
                        {
                            name: "Sea Guard",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Ithilmar; Excellent Eyes; Spear Master",
                            starting_equipment: [8, 12, 10, 15, 14, 17, 21, 22, 18, 19, 6, 4, 3],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Elf"
                        },
                        {
                            name: "Sea Rangers",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Ithilmar;Excellent Eyes; Hide in shadows; Hate dark elves",
                            starting_equipment: [8, 12, 10, 15, 21, 22, 153, 28, 18, 6, 4],
                            stats: { "M": 5, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Elf"
                        },
                        {
                            name: "Raw Recruits",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Excellent Eyes; Specially Hired; Lothern Rabble; Oh dear, they got away; Dont mind them, they arent true elves",
                            starting_equipment: [8, 12, 10, 15, 106, 17, 149, 21, 19, 6, 5],
                            stats: { "M": 5, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                            hire_fee: "0",
                            race: "Elf"
                        }
                    ]
                }
            }
        ]
    },
    {
        grade: "Grade 3",
        description: "Draft",
        warbands: [
            {
                name: "Asrai Wayfarer",
                data: {
                    "special_rules": "Forest Walk; Subtle Nature; Clandestine; Long Lived",
                    "Race": "Elf",
                    "alignment": "good",
                    "warriors": [
                        {
                            name: "Way Warden",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Academic", "Speed", "Special"],
                            rules: "Leader; Ithilmar; Excellent Sight",
                            starting_equipment: [8, 12, 537, 10, 15, 535, 21, 22, 153, 538, 4, 541, 6, 18, 497, 42, 536, 539, 540, 543, 542, 3],
                            stats: { "M": 5, "WS": 5, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 9 },
                            hire_fee: "75",
                            race: "Elf"
                        },
                        {
                            name: "Spellweaver",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Shooting", "Academic", "Speed", "Special"],
                            rules: "Ithilmar; Excellent Sight; Fey Magic",
                            starting_equipment: [8, 12, 537, 10, 15, 535, 21, 22, 153, 538, 4, 541, 6, 18, 497, 42, 536, 539, 540, 543, 542, 3],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Elf"
                        },
                        {
                            name: "Wild Hunter",
                            type: "hero",
                            allowed: "0-1",
                            exp: 12,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "Ithilmar; Excellent Sight; Beast Empathy",
                            starting_equipment: [8, 12, 537, 10, 15, 535, 21, 22, 153, 538, 4, 541, 6, 18, 497, 42, 536, 539, 540, 543, 542, 3],
                            stats: { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "45",
                            race: "Elf"
                        },
                        {
                            name: "Pathfinders",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Shooting", "Speed", "Special"],
                            rules: "Ithilmar; Excellent Sight; Natural Stealth",
                            starting_equipment: [8, 12, 537, 10, 15, 535, 21, 22, 153, 538, 4, 541, 6, 18, 497, 42, 536, 539, 540, 543, 542, 3],
                            stats: { "M": 5, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Elf"
                        },
                        {
                            name: "Glade Warriors",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Ithilmar; Excellent Sight",
                            starting_equipment: [8, 537, 10, 15, 17, 21, 22, 153, 4, 541, 18, 62],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                            hire_fee: "30",
                            race: "Elf"
                        },
                        {
                            name: "Wardancers",
                            type: "henchman",
                            allowed: "0-3",
                            exp: 0,
                            skills: [],
                            rules: "Ithilmar; Excellent Sight; Talismanic Tattoos; Nimble Fighters",
                            starting_equipment: [8, 537, 10, 15, 17, 21, 22, 153, 4, 541, 18, 62],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                            hire_fee: "40",
                            race: "Elf"
                        },
                        {
                            name: "Wolfhounds",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Beast Companion; Pack Sense",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Wolfhound"
                        },
                        {
                            name: "Hunting Cats",
                            type: "henchman",
                            allowed: "0-2",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Beast Companion; Pounce",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 4, "BS": 0, "S": 4, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 5 },
                            hire_fee: "25",
                            race: "Hunting Cats"
                        },
                        {
                            name: "Wood Spirit",
                            type: "henchman",
                            allowed: "0-1",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Barkskin; Immune to Poison; Vulnerable to Fire; Immune to Psychology; Elemental",
                            starting_equipment: [],
                            stats: { "M": 5, "WS": 4, "BS": 0, "S": 4, "T": 4, "W": 3, "I": 4, "A": 2, "Ld": 7 },
                            hire_fee: "190",
                            race: "Wood Spirit"
                        }
                    ]
                }
            },
            {
                name: "Lahmian",
                data: {
                    "special_rules": "Habituation",
                    "Race": "Mixed",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Lahmia Vampire",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Combat", "Academic", "Strength", "Speed", "Special"],
                            rules: "Leader; Fear; Immune to Psychology; Immune to Poison; No Pain; Local Knowledge",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 18, 6, 4, 1, 20, 22, 544],
                            stats: { "M": 6, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 5, "A": 2, "Ld": 8 },
                            hire_fee: "110",
                            race: "Vampire"
                        },
                        {
                            name: "Necromancer",
                            type: "hero",
                            allowed: "0-1",
                            exp: 8,
                            skills: ["Academic", "Speed"],
                            rules: "Habituation; Necromancy",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 18, 6, 4, 1, 20, 22],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "35",
                            race: "Human"
                        },
                        {
                            name: "Beloved",
                            type: "hero",
                            allowed: "0-1",
                            exp: 20,
                            skills: ["Combat", "Shooting", "Strength", "Speed"],
                            rules: "Habituation; Lahmian Devoted",
                            starting_equipment: [8, 11, 12, 10, 16, 17, 15, 14, 23, 26, 27, 21, 4, 1, 18, 19, 6],
                            starting_equipment_alt: [8, 11, 303, 463, 10, 15, 17, 20, 21, 24, 19, 18, 6, 4, 1],
                            stats: { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                            hire_fee: "60",
                            race: "Human"
                        },
                        {
                            name: "Blood Sisters",
                            type: "hero",
                            allowed: "0-1",
                            exp: 0,
                            skills: ["Combat", "Academic", "Strength", "Speed"],
                            rules: "Habituation; Hardened; Demi-Vampires",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 18, 6, 4, 1, 20, 22, 544],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "40",
                            race: "Human"
                        },
                        {
                            name: "Thralls",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Combat", "Strength", "Speed"],
                            rules: "Habituation; Lahmian Devoted; Lahmian Favoured",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 18, 6, 4, 1, 20, 22],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "20",
                            race: "Human"
                        },
                        {
                            name: "Skeletons",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; Immune to Poison; No Pain; Do not gain experience; May not run",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 18, 6, 4, 1, 20, 22],
                            stats: { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 5 },
                            hire_fee: "15",
                            race: "Skeleton"
                        },
                        {
                            name: "Blood Slaves",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 18, 6, 4, 1, 20, 22],
                            stats: { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                            hire_fee: "25",
                            race: "Human"
                        },
                        {
                            name: "Black Hounds",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Do not gain experience; Fear",
                            starting_equipment: [],
                            stats: { "M": 7, "WS": 3, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Black Hound"
                        },
                        {
                            name: "Wights",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Fear; Immune to Psychology; Immune to Poison; No Pain; Wight weapons",
                            starting_equipment: [8, 11, 12, 10, 17, 15, 18, 6, 4, 1, 20, 22],
                            stats: { "M": 4, "WS": 3, "BS": 0, "S": 3, "T": 4, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                            hire_fee: "35",
                            race: "Wights"
                        },
                        {
                            name: "Jackals",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Pack Attack",
                            starting_equipment: [],
                            stats: { "M": 6, "WS": 3, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 4 },
                            hire_fee: "25",
                            race: "Jackal"
                        }
                    ]
                }
            },
            {
                name: "Skaven Clan Skryre",
                data: {
                    "special_rules": "Skryre Special Equipment",
                    "Race": "Skaven",
                    "alignment": "evil",
                    "warriors": [
                        {
                            name: "Warlock Engineer",
                            type: "hero",
                            allowed: "1",
                            exp: 20,
                            skills: ["Shooting", "Academic", "Speed", "Special"],
                            rules: "Leader; Magic of the Horned Rat",
                            starting_equipment: [8, 10, 13, 15, 14, 172, 4, 6, 549, 506],
                            stats: { "M": 5, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                            hire_fee: "65",
                            race: "Skaven"
                        },
                        {
                            name: "Stormvermin",
                            type: "hero",
                            allowed: "0-2",
                            exp: 8,
                            skills: ["Combat", "Strength", "Speed", "Special"],
                            rules: "(None)",
                            starting_equipment: [8, 10, 13, 15, 14, 172, 4, 6, 549, 506],
                            stats: { "M": 5, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 6 },
                            hire_fee: "40",
                            race: "Skaven"
                        },
                        {
                            name: "Warlock Apprentice",
                            type: "hero",
                            allowed: "0-2",
                            exp: 0,
                            skills: ["Shooting", "Speed", "Special"],
                            rules: "Trainees; Inexperienced; Magic of the Horned Rat",
                            starting_equipment: [8, 10, 13, 15, 14, 172, 545, 547, 550, 4, 6, 549, 506],
                            stats: { "M": 5, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "30",
                            race: "Skaven"
                        },
                        {
                            name: "Initiates",
                            type: "henchman",
                            allowed: "0-5",
                            exp: 0,
                            skills: [],
                            rules: "Clan Skryre The Lads Got Talent",
                            starting_equipment: [8, 10, 13, 15, 14, 545, 547, 550, 4, 6, 549, 546, 548],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "30",
                            race: "Skaven"
                        },
                        {
                            name: "Clanrats",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "(None)",
                            starting_equipment: [8, 11, 10, 15, 30, 4, 18, 6],
                            stats: { "M": 5, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                            hire_fee: "20",
                            race: "Skaven"
                        },
                        {
                            name: "Slaves",
                            type: "henchman",
                            allowed: "Any number",
                            exp: 0,
                            skills: [],
                            rules: "Expected to Die; Doomed",
                            starting_equipment: [8, 11, 10, 15, 30, 18],
                            stats: { "M": 5, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 4 },
                            hire_fee: "10",
                            race: "Skaven"
                        }
                    ]
                }
            }
        ]
    }



];
