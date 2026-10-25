export const HIRED_SWORDS = [
    {
        grade: "Grade 1A",
        characters: [
            {
                name: "Arabian Merchant",
                data: {
                    "hire_fee": "20",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "good",
                    "may_hire": "",
                    "may_not_hire": "",
                    "rating": "10",
                    "stats": { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [10],
                    "skills": ["Academic", "Special"],
                    "starting_skills": ["Haggle"],
                    "rules": "Pawnbroker; Marketeer; Black Market; Foreign Wares; Fencer"
                }
            },
            {
                name: "Arabian Merchant Guard",
                data: {
                    "hire_fee": "0",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "good",
                    "may_hire": "",
                    "may_not_hire": "",
                    "rating": "0",
                    "stats": { "M": 4, "WS": 4, "BS": 2, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                    "initial_equipment": [10, 4, 18, 6],
                    "skills": [],
                    "rules": "Intercept; Do not gain experience; Arabian Merchant Guardian"
                }
            },
            {
                name: "Beast Hunter",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Beastmen Raiders", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Orc Mob", "Black Orcs", "Cult of the Possessed", "Court of the Profane Pleasures", "The Cursed Cavalcade"],
                    "rating": "18",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 4, "W": 1, "I": 4, "A": 2, "Ld": 7 },
                    "initial_equipment": [12, 12, 132, 4],
                    "skills": ["Combat", "Strength"],
                    "rules": "Beastmen Vengeance; Skull Rack; Predator"
                }
            },
            {
                name: "Dwarf Troll Slayer",
                data: {
                    "hire_fee": "25",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": "",
                    "special_cost": "20",
                    "special_cost_race_condition": "elf",
                    "rating": "12",
                    "stats": { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                    "equipment_options": [{
                        "name": "Primary Weapon",
                        "options": [
                            { "description": "Two Axes", "items": [12, 12] },
                            { "description": "Double-Handed Axe", "items": [17] }
                        ]
                    }],
                    "skills": ["Combat", "Strength", "Special"],
                    "rules": "Deathwish; Hard to Kill; Hard Head"
                }
            },
            {
                name: "Elf Ranger",
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": "",
                    "special_cost": "40",
                    "special_cost_race_condition": "dwarf",
                    "rating": "12",
                    "stats": { "M": 5, "WS": 4, "BS": 5, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                    "initial_equipment": [153, 10, 497],
                    "skills": ["Shooting", "Speed", "Special"],
                    "rules": "Seeker; Excellent Sight",
                    "race": "Elf"
                }
            },
            {
                name: "Freelancer",
                data: {
                    "hire_fee": "50",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": "",
                    "rating": "21 ",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [1, 18, 128, 10, 45],
                    "skills": ["Combat", "Strength"],
                    "starting_skills": ["Ride"],
                    "rules": "(None)"
                }
            },
            {
                name: "Halfling Scout",
                data: {
                    "hire_fee": "15",
                    "upkeep_fee": "5",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Cult of the Possessed"],
                    "rating": "5 ",
                    "stats": { "M": 4, "WS": 2, "BS": 4, "S": 2, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [21, 8, 6],
                    "skills": ["Speed", "Shooting"],
                    "rules": "Cook"
                }
            },
            {
                name: "Highwayman",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Sisters of Sigmar", "Witch Hunters", "Shadow Warriors", "Wood Elves of Athel Loren"],
                    "rating": "20 ",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                    "initial_equipment": [8, 248, 136, 19, 46],
                    "skills": ["Combat", "Shooting ", "Speed", "Cavalry"],
                    "starting_skills": ["Pistolier", "Trick Shooter"],
                    "rules": "Expert Rider; Unscrupulous"
                }
            },
            {
                name: "Imperial Assassin",
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Sisters of Sigmar", "Orc Mob", "Black Orcs", "Forest Goblins", "Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder"],
                    "rating": "22 ",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 2, "Ld": 8 },
                    "initial_equipment": [10, 8, 28, 155],
                    "skills": ["Combat", "Shooting", "Speed", "Special", "Unstoppable Charge", "Backstabber", "Hide in Shadows"],
                    "rules": "Poisoner; Weapons Master"
                }
            },
            {
                name: "Ogre Bodyguard",
                data: {
                    "hire_fee": "80",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder"],
                    "rating": "25 ",
                    "stats": { "M": 6, "WS": 3, "BS": 2, "S": 4, "T": 4, "W": 3, "I": 3, "A": 2, "Ld": 7 },
                    "initial_equipment": [4],
                    "equipment_options": [{
                        "name": "Primary Weapon",
                        "options": [
                            { "description": "Two Swords", "items": [10, 10] },
                            { "description": "Two Axes", "items": [12, 12] },
                            { "description": "Two Clubs", "items": [11, 11] },
                            { "description": "Sword and Club", "items": [10, 11] },
                            { "description": "Sword and Axe", "items": [10, 12] },
                            { "description": "Club and Axe", "items": [11, 12] },
                            { "description": "Double-Handed Weapon", "items": [17] }
                        ]
                    }],
                    "skills": ["Combat", "Strength"],
                    "rules": "Fear; Large Target"
                }
            },
            {
                name: "Pit Fighter",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder"],
                    "rating": "22 ",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 2, "Ld": 7 },
                    "initial_equipment": [16, 8, 36, 6],
                    "skills": ["Combat", "Speed", "Strength"],
                    "rules": "(None)"
                }
            },
            {
                name: "Roadwarden",
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "good",
                    "may_hire": [],
                    "may_not_hire": "",
                    "rating": "22 ",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                    "initial_equipment": [23, 122, 8, 1, 77, 77, 77, 46],
                    "skills": ["Combat", "Shooting", "Strength", "Cavalry"],
                    "starting_skills": ["Eagle Eyes", "Trick Shooter"],
                    "rules": "Expert Rider; Stern"
                }
            },
            {
                name: "Tilean Marksman",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Orc Mob", "Black Orcs", "Forest Goblins", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers"],
                    "rating": "16 ",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                    "initial_equipment": [4, 10, 8, 23],
                    "skills": ["Shooting"],
                    "rules": "Steady Hands; Dead Eye Shot"
                }
            },
            {
                name: "Warlock",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Sisters of Sigmar"],
                    "rating": "16 ",
                    "stats": { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [11],
                    "skills": ["Academic"],
                    "rules": "Lesser Magic"
                }
            }
        ]
    },
    {
        grade: "Grade 1B",
        characters: [
            {
                name: "Bard",
                data: {
                    "hire_fee": "20",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)", "Sisters of Sigmar", "Witch Hunters"],
                    "may_not_hire": "",
                    "rating": "8 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                    "initial_equipment": [10, 8, 4],
                    "skills": ["Academic", "Speed"],
                    "rules": "Songster"
                }
            },
            {
                name: "Big Game Hunter",
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "18",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Horned Hunters", "Imperial Outriders", "Mootlanders", "Norse Explorers", "Pirates", "Pit Fighters"],
                    "may_not_hire": "",
                    "rating": "16 ",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [10, 8, 35, 4, 173],
                    "skills": ["Shooting", "Academic"],
                    "rules": "Hunter Set Traps"
                }
            },
            {
                name: "Black Orc Overseer",
                data: {
                    "hire_fee": "60",
                    "upkeep_fee": "40",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Orc Mob", "Black Orcs", "Forest Goblins", "Night Goblins", "Snotlings"],
                    "may_not_hire": "",
                    "rating": "15 ",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 7 },
                    "initial_equipment": [1, 6],
                    "equipment_options": [{
                        "name": "Primary Weapon",
                        "options": [
                            { "description": "Two Axes", "items": [12, 12] },
                            { "description": "Double-Handed Weapon", "items": [17] }
                        ]
                    }],
                    "skills": ["Combat", "Shooting", "Strength", "Speed"],
                    "rules": "I said shut it; Who'se Da Man"
                }
            },
            {
                name: "Bounty Hunter",
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Cult of the Possessed", "Court of the Profane Pleasures", "The Cursed Cavalcade", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Orc Mob", "Black Orcs", "Forest Goblins"],
                    "rating": "20 ",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [10, 8, 26, 23, 1, 6, 31, 33],
                    "skills": ["Combat", "Shooting", "Strength", "Speed"],
                    "rules": "Capture"
                }
            },
            {
                name: "Chameleon Skink",
                data: {
                    "hire_fee": "70",
                    "upkeep_fee": "12",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Lizardmen"],
                    "may_not_hire": "",
                    "rating": "16 ",
                    "stats": { "M": 6, "WS": 4, "BS": 4, "S": 4, "T": 2, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                    "initial_equipment": [8, 19, 150],
                    "skills": ["Shooting", "Speed", "Special"],
                    "starting_skills": ["Infiltration"],
                    "rules": "Scaly Skin; Cold Blooded; Aquatic; Jungle Born; Chameleon Skin"
                }
            },
            {
                name: "Clan Skryre Rat Ogre",
                data: {
                    "hire_fee": "100",
                    "upkeep_fee": null,
                    "special_upkeep_treasure": "1",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder"],
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 5, "T": 5, "W": 3, "I": 1, "A": 3, "Ld": 10 },
                    "initial_equipment": [498],
                    "skills": [],
                    "rules": "Large Target; Fear; Immune to Psychology; Wyrdstone Powered; May not run; Immune to Poison; Do not gain experience"
                }
            },
            {
                name: "Dark Elf Assassin",
                data: {
                    "hire_fee": "70",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "evil",
                    "may_hire": [],
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 5, "WS": 5, "BS": 5, "S": 4, "T": 4, "W": 1, "I": 7, "A": 1, "Ld": 8 },
                    "initial_equipment": [34, 8, 156, 38, 4, 497],
                    "skills": ["Combat", "Shooting", "Speed", "Special"],
                    "rules": "Perfect Killer; Kindred Hatred"
                }
            },
            {
                name: "Duellist",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers"],
                    "rating": "18",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 7 },
                    "initial_equipment": [27, 10, 8, 19],
                    "skills": ["Combat", "Shooting"],
                    "rules": "Darting Steel"
                }
            },
            {
                name: "Dwarf Pathfinder",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Dwarf Treasure Hunters", "Dwarf Rangers", "Dwarf Slayer Cult", "The Sons of Hashut", "Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": "",
                    "rating": "12",
                    "stats": { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                    "initial_equipment": [12, 8, 23, 4],
                    "skills": ["Combat", "Shooting", "Special"],
                    "rules": "Explorer; Hard to Kill; Hard Head; Hate Orcs and Goblins; Elf Grudge; No Magic"
                }
            },
            {
                name: "Dwarf Treasure Hunter",
                data: {
                    "hire_fee": "55",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": ["Dwarf Treasure Hunters"],
                    "special_cost": "30",
                    "special_cost_race_condition": "elf",
                    "rating": "24 ",
                    "stats": { "M": 3, "WS": 5, "BS": 4, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                    "initial_equipment": [2, 6, 104, 8, 11, 33],
                    "skills": ["Combat", "Strength"],
                    "rules": "Hard to Kill; Hard Head; Hates Orcs & Goblins; Lantern Rig; Treasure Maps"
                }
            },
            {
                name: "Elf Mage",
                data: {
                    "hire_fee": "45",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": "",
                    "rating": "23 ",
                    "stats": { "M": 5, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 2, "I": 6, "A": 1, "Ld": 8 },
                    "initial_equipment": [486, 497],
                    "skills": [],
                    "starting_skills": ["Sorcery"],
                    "rules": "Fey; Wanderer; Do not gain experience; Spells of the Djed’hi"
                }
            },
            {
                name: "Gaoler",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Witch Hunters"],
                    "may_not_hire": "",
                    "rating": "18",
                    "stats": { "M": 4, "WS": 3, "BS": 2, "S": 4, "T": 4, "W": 2, "I": 3, "A": 1, "Ld": 7 },
                    "equipment_options": [{
                        "name": "Primary Weapon",
                        "options": [
                            { "description": "Flail", "items": [13] },
                            { "description": "Two Hammers/Clubs", "items": [11, 11] }
                        ]
                    }],
                    "skills": ["Combat", "Strength"],
                    "rules": "Torturer’s grapple; Devout; Inured to pain; Gaolers Hatred"
                }
            },
            {
                name: "Halfling Thief",
                data: {
                    "hire_fee": "25",
                    "upkeep_fee": null,
                    "may_be_hired_alignment": "",
                    "may_hire": ["Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)", "Shadow Warriors", "Dwarf Treasure Hunters", "Dwarf Rangers"],
                    "may_not_hire": "",
                    "rating": "14 ",
                    "stats": { "M": 4, "WS": 2, "BS": 4, "S": 2, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [10, 8, 28, 31],
                    "skills": ["Speed", "Shooting", "Special"],
                    "rules": "Infiltrator; Pick Locks; Cutpurse; Uneasy Ally"
                }
            },
            {
                name: "Human Scout",
                data: {
                    "hire_fee": "10",
                    "upkeep_fee": "5",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Orc Mob", "Black Orcs", "Forest Goblins", "Beastmen Raiders", "Cult of the Possessed"],
                    "rating": "9 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                    "initial_equipment": [21, 10, 8],
                    "skills": ["Combat", "Speed", "Quick Shot", "Special"],
                    "rules": "Not a Fighter"
                }
            },
            {
                name: "Kislev Ranger",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)", "Witch Hunters", "Dwarf Treasure Hunters", "Dwarf Rangers"],
                    "may_not_hire": "",
                    "rating": "15 ",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [21, 10, 455],
                    "skills": ["Combat", "Shooting", "Academic", "Strength", "Speed", "Special"],
                    "rules": "Heart Strike; Kislev Ranger Loner; Seeker"
                }
            },
            {
                name: "Mule Skinner",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Cult of the Possessed", "Court of the Profane Pleasures", "The Cursed Cavalcade", "Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers"],
                    "rating": "20 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                    "initial_equipment": [456, 8],
                    "skills": ["Combat", "Strength", "Special"],
                    "starting_skills": ["Animal Handling", "Whip Master"],
                    "rules": "(None)"
                }
            },
            {
                name: "Nomad Scout",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": "",
                    "rating": "12",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [10, 21],
                    "skills": ["Shooting", "Speed"],
                    "rules": "Son of the Desert"
                }
            },
            {
                name: "Norse Shaman",
                data: {
                    "hire_fee": "45",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)", "Norse Explorers", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)"],
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [11],
                    "equipment_options": [{
                        "name": "Primary Weapon",
                        "options": [
                            { "description": "Sword", "items": [10] },
                            { "description": "Axe", "items": [12] }
                        ]
                    }],
                    "skills": ["Combat", "Academic"],
                    "rules": "Norse Runes; Rune Advancement"
                }
            },
            {
                name: "Old Prospector",
                data: {
                    "hire_fee": "0",
                    "special_hire_treasure": "2",
                    "upkeep_fee": null,
                    "special_upkeep_treasure": "1",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Dwarf Treasure Hunters", "Dwarf Rangers"],
                    "rating": "15 ",
                    "stats": { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 9 },
                    "initial_equipment": [25, 17],
                    "skills": ["Strength", "Speed"],
                    "starting_skills": ["Wyrdstone Hunter", "Resilient"],
                    "rules": "Immune to Fear; Finders Keepers; Old Coot"
                }
            },
            {
                name: "Pathfinder",
                data: {
                    "hire_fee": "60",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [10, 8, 22, 31, 42],
                    "skills": ["Combat", "Shooting", "Speed", "Special"],
                    "rules": "Lay of the Land; Knowledge of Myths and Legends"
                }
            },
            {
                name: "Runesmith Journeyman",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)", "Witch Hunters"],
                    "may_not_hire": "",
                    "special_cost": "30",
                    "special_cost_race_condition": "elf",
                    "rating": "15 ",
                    "stats": { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                    "initial_equipment": [11, 1],
                    "skills": ["Combat", "Strength"],
                    "rules": "Runesmith; Armourer; Armour; Hate Orcs and Goblins; Hard to Kill; Hard Head; Use Runes"
                }
            },
            {
                name: "Shadow Warrior",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Shadow Warriors", "Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": [],
                    "rating": "12",
                    "stats": { "M": 5, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                    "initial_equipment": [10, 22, 8, 18, 4],
                    "skills": ["Combat", "Shooting", "Special"],
                    "rules": "Hates Dark Elves; Excellent Sight; Bitter Enemies; Infiltration"
                }
            },
            {
                name: "Snake Charmer",
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "good",
                    "may_hire": [],
                    "may_not_hire": "",
                    "rating": "5 ",
                    "stats": { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [8, 10],
                    "skills": ["Academic", "Speed"],
                    "rules": "Snake Charmer; Immune to poison; Venomous; Snake hunter"
                }
            },
            {
                name: "Thief",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers"],
                    "rating": "22 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [8, 8, 499],
                    "skills": ["Combat", "Speed"],
                    "rules": "Tea-Leaf!"
                }
            },
            {
                name: "Tomb Robber",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "good",
                    "may_hire": [],
                    "may_not_hire": "",
                    "rating": "20 ",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 7 },
                    "initial_equipment": [10, 26, 31],
                    "skills": ["Combat", "Shooting", "Speed"],
                    "starting_skills": ["Trap Expert"],
                    "rules": "Tomb Robber Explorer; Excellent Reflexes"
                }
            },
            {
                name: "Warrior Priest Of Sigmar",
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "good",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Mercenaries (Middenheim)", "Cult of the Possessed", "Court of the Profane Pleasures", "The Cursed Cavalcade", "Orc Mob", "Black Orcs", "Forest Goblins", "Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder"],
                    "rating": "16 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [123, 4, 18],
                    "skills": ["Academic"],
                    "rules": "Prayers of Sigmar"
                }
            },
            {
                name: "Witch",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Sisters of Sigmar"],
                    "rating": "14 ",
                    "stats": { "M": 4, "WS": 2, "BS": 2, "S": 2, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [11],
                    "skills": ["Academic skills"],
                    "rules": "Charms & Hexes; Recluse; Potions; Reluctant"
                }
            },
            {
                name: "Witch Hunter",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "good",
                    "may_hire": ["Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Horned Hunters", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania"],
                    "may_not_hire": ["Cult of the Possessed", "Carnival of Chaos", "Norse Explorers", "Black Dwarfs", "Court of the Profane Pleasures", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "The Cursed Cavalcade", "The Sons of Hashut"],
                    "rating": "15 ",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [10, 8, 177, 57],
                    "equipment_options": [{
                        "name": "Pistol Choice",
                        "options": [
                            { "description": "Dueling Pistol", "items": [27] },
                            { "description": "Crossbow Pistol", "items": [26] }
                        ]
                    }],
                    "skills": ["Combat", "Speed", "Shooting", "Academic", "Strength"],
                    "rules": "Burn the Witch; In Sigmar’s name; Sigmar’s reward"
                }
            },
        ]
    },
    {
        grade: "Grade 1C",
        characters: [
            {
                name: "Bone Goliath",
                data: {
                    "hire_fee": "225",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "",
                    "may_hire": ["The Restless Dead"],
                    "may_not_hire": "",
                    "rating": "50 ",
                    "stats": { "M": 5, "WS": 3, "BS": 0, "S": 5, "T": 5, "W": 3, "I": 2, "A": 3, "Ld": 6 },
                    "initial_equipment": [],
                    "skills": [],
                    "rules": "Fear; May not run; Immune to Psychology; Immune to Poison; Undead Construct; Assembly; Large Target; No Pain; Do not gain experience"
                }
            },
            {
                name: "Cathayan Merchant",
                data: {
                    "hire_fee": "20",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "any",
                    "may_hire": ["Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Horned Hunters", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania", "Dwarf Treasure Hunters", "Dwarf Rangers", "Dwarf Slayer Cult"],
                    "may_not_hire": "",
                    "rating": "10",
                    "stats": { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [10],
                    "skills": ["Academic", "Special"],
                    "rules": "Haggle; Pawnbroker; Marketeer; Cathayan Black Market; Cathayan Exotic Wares"
                }
            },
            {
                name: "Cathayan Merchant Guardian",
                data: {
                    "hire_fee": "0",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Horned Hunters", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania", "Dwarf Treasure Hunters", "Dwarf Rangers", "Dwarf Slayer Cult"],
                    "may_not_hire": "",
                    "rating": "0 points plus 0 point for each Experience point",
                    "stats": { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [10, 4, 18, 6],
                    "skills": [],
                    "rules": "Do not gain experience; Intercept; Cathayan Merchant Guardian"
                }
            },
            {
                name: "Chaos Centaur",
                data: {
                    "hire_fee": "65",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Beastmen Raiders", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Maneaters"],
                    "may_not_hire": "",
                    "rating": "20 ",
                    "stats": { "M": 8, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                    "initial_equipment": [28, 18],
                    "equipment_options": [{
                        "name": "Primary Weapon",
                        "options": [
                            { "description": "Sword", "items": [10] },
                            { "description": "Spear", "items": [15] }
                        ]
                    }],
                    "skills": ["Combat", "Strength"],
                    "rules": "Drunken; Woodland Dwelling; Trample; Chaos Centaur Mutations"
                }
            },
            {
                name: "Coachman",
                data: {
                    "hire_fee": "20",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Beastmen Raiders", "Orc Mob", "Black Orcs", "Forest Goblins"],
                    "rating": "8 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [89, 10, 4],
                    "skills": ["Speed"],
                    "rules": "Driver; Handyman"
                }
            },
            {
                name: "Grave Robber",
                data: {
                    "hire_fee": "45",
                    "upkeep_fee": "18",
                    "may_be_hired_alignment": "any",
                    "may_hire": ["Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers"],
                    "may_not_hire": "",
                    "rating": "15 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                    "initial_equipment": [12, 8, 33, 5],
                    "skills": ["Combat", "Speed"],
                    "rules": "Hatred towards Grave Robber; Grave Robbing."
                }
            },
            {
                name: "Hobgoblin Scout",
                data: {
                    "hire_fee": "45",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Black Dwarfs", "The Sons of Hashut", "Maneaters"],
                    "may_not_hire": "",
                    "rating": "19 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 2, "A": 1, "Ld": 6 },
                    "initial_equipment": [8, 20, 18, 502],
                    "skills": ["Shooting", "Riding", "Special"],
                    "starting_skills": ["Ride"],
                    "rules": "Hobgoblin Scout Loner; Traitor"
                }
            },
            {
                name: "Ninja",
                data: {
                    "hire_fee": "70",
                    "variableCost": "3D6",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "any",
                    "may_hire": [],
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Orc Mob", "Black Orcs", "Forest Goblins", "Beastmen Raiders", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Black Dwarfs", "The Sons of Hashut"],
                    "rating": "45 ",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 5, "A": 2, "Ld": 8 },
                    "initial_equipment": [10, 10, 28, 31],
                    "skills": ["Expert Swordsman", "Knife-Fighter", "Scale Sheer Surfaces", "Art of Silent Death", "Lightning Speed", "Leap of Faith"],
                    "starting_skills": ["Expert Swordsman", "Knife-Fighter", "Scale Sheer Surfaces", "Art of Silent Death", "Lightning Speed", "Leap of Faith"],
                    "rules": "Strictly Business; Secrecy; Do not gain experience"
                }
            },
            {
                name: "Pyromaniac",
                data: {
                    "hire_fee": "25",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Merchant Caravans", "Battle Monks of Cathay", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": "",
                    "rating": "9 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                    "initial_equipment": [185],
                    "skills": ["Special"],
                    "rules": "Crazed Firestarter, Rockets."
                }
            },
            {
                name: "Swordsmith",
                data: {
                    "hire_fee": "60",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Merchant Caravans", "Battle Monks of Cathay", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": "",
                    "rating": "10",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [11, 5],
                    "skills": ["Academic", "Strength", "Special"],
                    "rules": "Master Craftsman"
                }
            }
        ]
    },
    {
        grade: "Grade 2A",
        characters: [
            {
                name: "Beggar",
                data: {
                    "hire_fee": "10",
                    "upkeep_fee": "5",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": "",
                    "special_cost": "15",
                    "special_cost_race_condition": "",
                    "special_cost_alignment_condition": "evil",
                    "rating": "8 ",
                    "stats": { "M": 4, "WS": 1, "BS": 1, "S": 2, "T": 2, "W": 1, "I": 3, "A": 1, "Ld": 5 },
                    "initial_equipment": [11],
                    "skills": ["Speed"],
                    "rules": "Scrounge; Not a Threat"
                }
            },
            {
                name: "Chaos Fury",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Cult of the Possessed", "Carnival of Chaos", "Norse Explorers", "Black Dwarfs", "Court of the Profane Pleasures", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "The Cursed Cavalcade", "The Sons of Hashut"],
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 4, "A": 2, "Ld": 10 },
                    "initial_equipment": [],
                    "skills": [],
                    "rules": "Fear; Daemonic Flesh; Immune to Psychology; Do not gain experience; Daemonic Instability; Fly; Malicious"
                }
            },
            {
                name: "Cursed Hillman",
                data: {
                    "hire_fee": "60",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Beastmen Raiders", "Cult of the Possessed"],
                    "may_not_hire": "",
                    "rating": "20 ",
                    "stats": {
                        "Man": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                        "Wolf": { "M": 7, "WS": 4, "BS": 0, "S": 4, "T": 4, "W": 2, "I": 5, "A": 2, "Ld": 6 }
                    },
                    "initial_equipment": [12, 8, 22, 503],
                    "skills": ["Shooting", "Speed", "Special"],
                    "rules": "Hunter; Thin Flesh; Lycanthrope"
                }
            },
            {
                name: "Dark Mage",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "good",
                    "may_hire": [],
                    "may_not_hire": ["Witch Hunters", "Sisters of Sigmar", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers"],
                    "rating": "18",
                    "stats": { "M": 4, "WS": 2, "BS": 2, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                    "initial_equipment": [11],
                    "skills": ["Academic"],
                    "rules": "Dark Magic; Lesser Magic; Despise Despoilers; Self Assured"
                }
            },
            {
                name: "Dwarf Slayer Pirate",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)", "Averlanders", "Ostlanders", "Kislevites", "Witch Hunters", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Dwarf Treasure Hunters", "Bandits", "Pirates"],
                    "may_not_hire": "",
                    "special_cost": "20",
                    "special_cost_race_condition": "elf",
                    "rating": "14 ",
                    "stats": { "M": 3, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 1, "I": 2, "A": 1, "Ld": 9 },
                    "initial_equipment": [10, 73, 26],
                    "skills": ["Combat", "Shooting"],
                    "rules": "Deathwish; Hard to Kill; Hard Head; Festooned with Pistols; Raging Drunk"
                }
            },
            {
                name: "Emissary of Chaos - Khorne",
                data: {
                    "hire_fee": "50",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Dark Elves", "Druchii", "Cult of the Possessed", "Carnival of Chaos", "Norse Explorers", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Beastmen Raiders"],
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 2, "Ld": 9 },
                    "initial_equipment": [97, 6, 18, 10],
                    "skills": ["Combat", "Strength"],
                    "rules": "Frenzy"
                }
            },
            {
                name: "Emissary of Chaos - Tzeentch",
                data: {
                    "hire_fee": "50",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Dark Elves", "Druchii", "Cult of the Possessed", "Carnival of Chaos", "Norse Explorers", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Beastmen Raiders"],
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                    "initial_equipment": [97, 6, 18, 10],
                    "skills": ["Combat", "Strength", "Academic"],
                    "rules": "Chaos Rituals"
                }
            },
            {
                name: "Emissary of Chaos - Nurgle",
                data: {
                    "hire_fee": "50",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Dark Elves", "Druchii", "Cult of the Possessed", "Carnival of Chaos", "Norse Explorers", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Beastmen Raiders"],
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                    "initial_equipment": [97, 6, 18, 10],
                    "skills": ["Combat", "Strength"],
                    "rules": "Fear; Emissary of Chaos Poison"
                }
            },
            {
                name: "Emissary of Chaos - Slaanesh",
                data: {
                    "hire_fee": "50",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Dark Elves", "Druchii", "Cult of the Possessed", "Carnival of Chaos", "Norse Explorers", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Beastmen Raiders"],
                    "may_not_hire": "",
                    "rating": "25 ",
                    "stats": { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                    "initial_equipment": [97, 6, 18, 10],
                    "skills": ["Combat", "Strength"],
                    "rules": "Slaanesh Fear"
                }
            },
            {
                name: "Estalian Diestro",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": [],
                    "may_not_hire": ["Cult of the Possessed", "Court of the Profane Pleasures", "The Cursed Cavalcade", "Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Orc Mob", "Black Orcs", "Forest Goblins", "Beastmen Raiders", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Dark Elves", "Druchii", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Ostlanders"],
                    "rating": "18",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [136, 129, 4],
                    "skills": ["Combat", "Speed"],
                    "rules": "(None)"
                }
            },
            {
                name: "The Fallen Sister",
                data: {
                    "hire_fee": "55",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Witch Hunters", "Sisters of Sigmar"],
                    "rating": "22 ",
                    "stats": { "M": 4, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [141, 123, 8, 30, 4],
                    "skills": ["Combat", "Strength", "Speed"],
                    "rules": "Lesser Magic; Warrior Wizard; Ashamed and Afraid"
                }
            },
            {
                name: "Goblin Lantern Bearer",
                data: {
                    "hire_fee": "15",
                    "upkeep_fee": "5",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": "",
                    "rating": "5 ",
                    "stats": { "M": 4, "WS": 2, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 5 },
                    "initial_equipment": [33, 8],
                    "skills": ["Speed"],
                    "rules": "Smart; Very Lucky; Small Size."
                }
            },
            {
                name: "Gravesman",
                data: {
                    "hire_fee": "25",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Carnival of Chaos"],
                    "rating": "15 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 8 },
                    "initial_equipment": [14, 468, 8],
                    "skills": ["Combat", "Strength"],
                    "rules": "He’s o’er dere."
                }
            },
            {
                name: "Halfling Knight",
                data: {
                    "hire_fee": "20",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "good",
                    "may_hire": [],
                    "may_not_hire": "",
                    "rating": "12",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 2, "T": 2, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                    "initial_equipment": [15, 10, 1, 6, 18, 7, 504],
                    "skills": ["Combat", "Speed"],
                    "rules": "Slay Large Creature"
                }
            },
            {
                name: "Imperial Tactician",
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "20 ",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Horned Hunters", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania"],
                    "may_not_hire": "",
                    "rating": "16 ",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 9 },
                    "initial_equipment": [17, 1, 6, 8],
                    "skills": ["Combat", "Strength", "Special"],
                    "rules": "Expert Tactician; Read the Battle"
                }
            },
            {
                name: "Knight of the White Wolf",
                data: {
                    "hire_fee": "55",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Averlanders", "Hochland Bandits", "Kislevites", "Gunnery School of Nuln", "Ostlanders", "Outlaws of Stirwood Forest", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Mercenaries (Reikland)", "Mercenaries (Middenheim)", "Mercenaries (Marienburg)"],
                    "may_not_hire": ["Witch Hunters"],
                    "special_cost": "20",
                    "special_cost_race_condition": "warrior_priest",
                    "rating": "18",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 1, "I": 4, "A": 1, "Ld": 9 },
                    "initial_equipment": [1, 92, 122],
                    "skills": ["Combat", "Strength", "Cavalry"],
                    "starting_skills": ["Unstoppable Charge", "Ride"],
                    "rules": "Pride of Ar-Ulric; Cavalryman; Among Wolves"
                }
            },
            {
                name: "Ninja Gnoblar",
                data: {
                    "hire_fee": "35",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": "",
                    "rating": "8 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 6 },
                    "initial_equipment": [5, 28, 505],
                    "skills": ["Shooting", "Speed", "Special"],
                    "rules": "Stealthy Gnoblar"
                }
            },
            {
                name: "Ogre Slave Master",
                data: {
                    "hire_fee": "90",
                    "upkeep_fee": "35",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Cult of the Possessed", "Carnival of Chaos", "Beastmen Raiders"],
                    "may_not_hire": "",
                    "rating": "40",
                    "stats": { "M": 6, "WS": 3, "BS": 2, "S": 4, "T": 4, "W": 3, "I": 4, "A": 2, "Ld": 7 },
                    "initial_equipment": [12, 11, 4],
                    "skills": ["Combat", "Strength"],
                    "rules": "Slave Master; Fear; Large Target"
                }
            },
            {
                name: "Slaver",
                data: {
                    "hire_fee": "20",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "evil",
                    "may_hire": "",
                    "may_not_hire": "",
                    "rating": "12",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [15, 35, 4, 6, 8],
                    "skills": ["Combat", "Strength"],
                    "rules": "Slaver"
                }
            },
            {
                name: "Swashbuckler",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "good",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "16 ",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 3, "W": 1, "I": 5, "A": 1, "Ld": 8 },
                    "initial_equipment": [136, 8, 4, 27],
                    "skills": ["Speed", "Shooting", "Combat"],
                    "rules": "Acrobatic; Nimble; Charismatic"
                }
            },
            {
                name: "Ungor Trapper",
                data: {
                    "hire_fee": "20",
                    "upkeep_fee": "10",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Beastmen Raiders", "Cult of the Possessed", "Norse Explorers", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)"],
                    "may_not_hire": "",
                    "rating": "12",
                    "stats": { "M": 5, "WS": 3, "BS": 4, "S": 3, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 6 },
                    "initial_equipment": [21, 9, 11, 31],
                    "skills": ["Speed", "Shooting", "Special"],
                    "rules": "Set Traps; Hunter’s Eye; Excellent Sight; Just a Twit; Ungor Mutation"
                }
            },
            {
                name: "Weaponsmith",
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "good",
                    "may_hire": [],
                    "may_not_hire": ["Cult of the Possessed", "Court of the Profane Pleasures", "The Cursed Cavalcade", "Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Orc Mob", "Black Orcs", "Forest Goblins", "Beastmen Raiders", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Dark Elves", "Druchii"],
                    "rating": "16 ",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 3, "W": 1, "I": 3, "A": 1, "Ld": 7 },
                    "initial_equipment": [11, 23, 19, 4, 6],
                    "skills": ["Strength", "Speed"],
                    "rules": "Maintenance"
                }
            },
            {
                name: "Wood Elf Hunter",
                data: {
                    "hire_fee": "50",
                    "upkeep_fee": "20",
                    "may_be_hired_alignment": "good",
                    "may_hire": [],
                    "may_not_hire": "",
                    "rating": "22 ",
                    "stats": { "M": 5, "WS": 4, "BS": 5, "S": 3, "T": 3, "W": 1, "I": 6, "A": 1, "Ld": 8 },
                    "initial_equipment": [153, 10, 4, 62],
                    "skills": ["Speed", "Shooting"],
                    "rules": "Stalk; Hunted; Keen Eyed"
                }
            }
        ]
    }
];
