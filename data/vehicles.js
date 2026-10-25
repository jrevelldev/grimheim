export const VEHICLES = [
    {
        grade: "Grade 1A",
        description: "Official/semi-official vehicles available to multiple warbands",
        vehicles: [
            {
                name: "Opulent Coach",
                data: {
                    "hire_fee": "250",
                    "rarity": "10",
                    "may_be_hired": null,
                    "stats": {
                        "COACH": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 8, "W": 6, "I": 0, "A": 0, "Ld": 0 },
                        "WHEEL": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 6, "W": 1, "I": 0, "A": 0, "Ld": 0 },
                        "HORSE": { "M": 8, "WS": 3, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 5 }
                    },
                    "starting_equipment": ["None"],
                    "skills": [],
                    "special_rules": "Opulent Coach; Wagon; Do not gain experience"
                }
            }
            
        ]
    },
    {
        grade: "Grade 1B",
        description: "Unofficial, but released through GW/Fanatic. Professional quality.",
        vehicles: [
            {
                name: "Rowboat",
                data: {
                    "hire_fee": "40",
                    "rarity": "7",
                    "may_be_hired": null,
                    "stats": {
                        "Rowboat": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 5, "W": 3, "I": 0, "A": 0, "Ld": 0 }
                    },
                    "starting_equipment": ["None"],
                    "skills": [],
                    "special_rules": "Do not gain experience; Boat Movement; Boat Terrain; Boat Transport; Boat Mounting Dismounting; Boat Shooting; Boat Propulsion Damage; Boat Hull Damage"
                }
            },
            {
                name: "River boat",
                data: {
                    "hire_fee": "100",
                    "rarity": "8",
                    "may_be_hired": null,
                    "stats": {
                        "Rowboat": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 8, "W": 4, "I": 0, "A": 0, "Ld": 0 }
                    },
                    "starting_equipment": ["None"],
                    "skills": [],
                    "special_rules": "Do not gain experience; Boat Movement; Boat Terrain; Boat Transport; Boat Mounting Dismounting; Boat Shooting; Boat Propulsion Damage; Boat Hull Damage"
                }
            },
            {
                name: "River Barge",
                data: {
                    "hire_fee": "200",
                    "rarity": "9",
                    "may_be_hired": null,
                    "stats": {
                        "Rowboat": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 8, "W": 8, "I": 0, "A": 0, "Ld": 0 }
                    },
                    "starting_equipment": ["None"],
                    "skills": [],
                    "special_rules": "Do not gain experience; Boat Movement; Boat Terrain; Boat Transport; Boat Mounting Dismounting; Boat Shooting; Boat Propulsion Damage; Boat Hull Damage"
                }
            },
            {
                name: "Skeleton Chariot",
                data: {
                    "hire_fee": "200 + 10d6",
                    "rarity": "Common",
                    "may_be_hired": "Tomb Guardians",
                    "stats": {
                        "Chariot": { "M": 0, "WS": 0, "BS": 0, "S": 4, "T": 4, "W": 3, "I": 0, "A": 0, "Ld": 0 },
                        "Steed": { "M": 8, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 5 }
                    },
                    "starting_equipment": ["None"],
                    "skills": [],
                    "special_rules": "Do not gain experience; Chariot Mounting; Chariot Movement; Chariot Difficult Ground; Chariot Steeds; Chariot Melee; Chariot Shooting; Chariot Skill Requirment"
                }
            },
            {
                name: "Wagon / Stagecoach",
                data: {
                    "hire_fee": "100",
                    "rarity": "7",
                    "may_be_hired": null,
                    "stats": {
                        "Wagon": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 8, "W": 4, "I": 0, "A": 0, "Ld": 0 },
                        "Wheel": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 6, "W": 1, "I": 0, "A": 0, "Ld": 0 }
                    },
                    "starting_equipment": [46, 227],
                    "skills": [],
                    "special_rules": "Do not gain experience; Wagon"
                }
            }
        ]
    },
    {
        grade: "Grade 1C",
        description: "Experimental, not released through GW/Fanatic. Approved by people who previously submitted grade 1a/1b material and vouch for it's quality.",
        vehicles: [
            {
                name: "Engine of Chaos",
                data: {
                    "hire_fee": "195",
                    "rarity": "10",
                    "may_be_hired": "Black Dwarfs; The Sons of Hashut",
                    "stats": {
                        "ENGINE": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 8, "W": 4, "I": 0, "A": 0, "Ld": 0 },
                        "WHEEL": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 6, "W": 1, "I": 0, "A": 0, "Ld": 0 },
                        "DAEMON": { "M": 6, "WS": 0, "BS": 0, "S": 0, "T": 6, "W": 3, "I": 0, "A": 0, "Ld": 0 }
                    },
                    "starting_equipment": ["None"],
                    "skills": [],
                    "special_rules": "Wagon; Daemon; Passengers; Pedal to the Metal; Prisoners; Hashut's Reward; Do not gain experience"
                }
            },
            {
                name: "Rickshaw",
                data: {
                    "hire_fee": "70",
                    "rarity": "8",
                    "may_be_hired": "Mercenaries (Reikland); Mercenaries (Middenheim); Mercenaries (Marienburg); Sisters of Sigmar; Witch Hunters; Averlanders; Kislevites; Ostlanders; Amazons (Lustria); Amazons (Mordheim); Arabian Tomb Raiders; Bretonnian Knights; Gunnery School of Nuln; Hochland Bandits; Horned Hunters; Imperial Outriders; Outlaws of Stirwood Forest; Pirates; Pit Fighters; Tileans (Miragleans); Tileans (Remasens); Tileans (Trantios); Battle Monks of Cathay; Bretonnian Chapel Guard; Lustrian Reavers; Merchant Caravans; Dreamwalkers, Cult Of Morr; Grave Robbers; Order Of The Mare; Protectorate Of Sigmar; Sorcerous Society; Vampire Hunters of Sylvania",
                    "stats": {
                        "Rickshaw": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 8, "W": 2, "I": 0, "A": 0, "Ld": 0 },
                        "WHEEL": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 6, "W": 1, "I": 0, "A": 0, "Ld": 0 }
                    },
                    "starting_equipment": ["None"],
                    "skills": [],
                    "special_rules": "Rickshaw; Rickshaw Shooting; Rickshaw Melee; Rickshaw Post Battle; Do not gain experience"
                }
            },
            {
                name: "Trade Wagon",
                data: {
                    "hire_fee": "100",
                    "rarity": "common",
                    "may_be_hired": "Merchant Caravans",
                    "stats": {
                        "Cart": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 8, "W": 4, "I": 0, "A": 0, "Ld": 0 },
                        "WHEEL": { "M": 0, "WS": 0, "BS": 0, "S": 0, "T": 6, "W": 1, "I": 0, "A": 0, "Ld": 0 },
                        "Draft Horse": { "M": 8, "WS": 1, "BS": 0, "S": 3, "T": 3, "W": 1, "I": 3, "A": 0, "Ld": 5 }
                    },
                    "starting_equipment": ["None"],
                    "skills": [],
                    "special_rules": "Do not gain experience; Wagon; Trade Wagon Storage; Trade Wagon Reputation; Trade Wagon Abandoned"
                }
            }
        ]
    }
];
