export const DRAMATIS_PERSONAE = [
    {
        grade: "Grade 1A",
        characters: [
            {
                name: "Aenur, the Sword of Twilight",
                data: {
                    "hire_fee": "150 gold crowns",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Survivors Of Strigos", "Cult of the Possessed"],
                    "rating": "100",
                    "stats": { "M": 5, "WS": 8, "BS": 4, "S": 4, "T": 3, "W": 2, "I": 7, "A": 3, "Ld": 8 },
                    "initial_equipment": [3, 497, 10],
                    "starting_skills": ["Strike to Injure", "Expert Swordsman", "Step Aside", "Sprint", "Lightning Reflexes", "Dodge", "Mighty Blow"],
                    "special_rules": "Do not gain experience; Invincible Swordsman; Wanderer; Ienh-Khain"
                }
            },
            {
                name: "Bertha Bestraufrung, high matriarch of the sisterhood",
                data: {
                    "hire_fee": "0",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Sisters of Sigmar"],
                    "may_not_hire": [],
                    "rating": "105",
                    "stats": { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 2, "I": 4, "A": 3, "Ld": 10 },
                    "initial_equipment": [11, 11, 2, 34, 60],
                    "starting_skills": ["Mighty Blow", "Unstoppable Charge", "Righteous Fury"],
                    "special_rules": "Do not gain experience; Bertha Bestraufrung Hire Fee; Prayers of Sigmar; Bertha Bestraufrung Prayers of Sigmar; High Matriarch; Sigmar’s Handmaiden"
                }
            },
            {
                name: "Countess Marianna Chevaux", 
                data: {
                    "hire_fee": "150",
                    "upkeep_fee": "75",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Sisters of Sigmar", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Dark Elves", "Shadow Warriors", "Druchii", "Wood Elves of Athel Loren"],
                    "rating": "90",
                    "stats": { "M": 6, "WS": 6, "BS": 6, "S": 4, "T": 4, "W": 2, "I": 9, "A": 3, "Ld": 9 },
                    "initial_equipment": [8, 136, 155, 28 ],
                    "starting_skills": ["Combat Master", "Step Aside", "Leap", "Acrobat", "Lightning Reflexes", "Dodge", "Jump Up", "Scale Sheer Surfaces"],
                    "special_rules": "Do not gain experience; Immune to Psychology; Immune to Poison; No Pain; Fear; You can never escape your past; Fighting Undead; The Noctu; Marianna Poisoned Weapons"
                }
            },
            {
                name: "Johann the Knife",
                data: {
                    "hire_fee": "70",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Survivors Of Strigos", "Cult of the Possessed"],
                    "rating": "60",
                    "stats": { "M": 4, "WS": 3, "BS": 6, "S": 4, "T": 3, "W": 2, "I": 6, "A": 1, "Ld": 7 },
                    "initial_equipment": [28, 10, 10, 37],
                    "starting_skills": ["Dodge", "Scale Sheer Surfaces", "Quick Shot", "Eagle Eyes", "Knife Fighter"],
                    "special_rules": "Do not gain experience; Crimson Shade Addiction; Crimson Shade Use; Knife Fighter Extraordinaire"
                }
            },
            {
                name: "Nicodemus",
                data: {
                    "hire_fee": "0",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Undead", "Tomb Guardians", "The Restless Dead", "Necrarchs, the Soul Stealers", "Survivors Of Strigos", "Cult of the Possessed"],
                    "rating": "85",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 4, "T": 4, "W": 2, "I": 3, "A": 1, "Ld": 8 },
                    "initial_equipment": [11],
                    "starting_skills": ["Sorcery", "Fearsome"],
                    "special_rules": "Do not gain experience; Lesser Magic; Nicodemus Spell List; Cursed; Wizard's Staff"
                }
            },
            {
                name: "Ulli",
                data: {
                    "hire_fee": "15",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Sisters of Sigmar"],
                    "rating": "30",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 3, "W": 2, "I": 4, "A": 2, "Ld": 7 },
                    "initial_equipment":[17, 4],
                    "starting_skills": ["Strongman", "Unstoppable charge", "Combat master"],
                    "special_rules": "Do not gain experience; Wanderer; A Fistful of Crowns; Where’s the Money; Inseparable."
                }
            },
            {
                name: "Marquand",
                data: {
                    "hire_fee": "15",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Sisters of Sigmar"],
                    "rating": "30",
                    "stats": { "M": 4, "WS": 5, "BS": 4, "S": 3, "T": 3, "W": 2, "I": 5, "A": 2, "Ld": 8 },
                    "initial_equipment": [10, 4, 28],
                    "starting_skills": ["Step aside", "Knife Fighter", "Lightning Reflexes"],
                    "special_rules": "Do not gain experience; Wanderer; A Fistful of Crowns; Where’s the Money; Inseparable."
                }
            },
            {
                name: "Veskit, high executioner of clan eshin",
                data: {
                    "hire_fee": "80",
                    "upkeep_fee": "35",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder"],
                    "may_not_hire": [],
                    "rating": "70",
                    "stats": { "M": 5, "WS": 5, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 5, "A": 4, "Ld": 8 },
                    "initial_equipment": [506, 120, 507],
                    "starting_skills": [],
                    "special_rules": "Do not gain experience; Immune to Psychology; No Pain; Unblinking Eye; Metallic Body"
                }
            }
        ]
    },
    {
        grade: "Grade 1B",
        characters: [
            {
                name: "Abdul Alhazred, the Mad Sorcerer",
                data: {
                    "hire_fee": "70",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Sisters of Sigmar"],
                    "rating": "30",
                    "stats": { "M": 4, "WS": 3, "BS": 2, "S": 3, "T": 3, "W": 2, "I": 4, "A": 1, "Ld": 8 },
                    "initial_equipment": [93, 8],
                    "starting_skills": ["Sorcery"],
                    "special_rules": "Do not gain experience; The Eye Pendant; Immune to Psychology; Djinn Master; Master Wizard; Mad Wizard; Arabian Elemental Magic; Necromancy"
                }
            },
            {
                name: "The Crow Master",
                data: {
                    "hire_fee": "65",
                    "upkeep_fee": "15",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Dwarf Treasure Hunters", "Dwarf Rangers", "Black Dwarfs", "The Sons of Hashut", "Dwarf Slayer Cult", "Dark Elves", "Shadow Warriors", "Druchii", "Wood Elves of Athel Loren", "Sisters of Sigmar", "Witch Hunters"],
                    "rating": "85",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 4, "W": 3, "I": 5, "A": 2, "Ld": 8 },
                    "initial_equipment": [11],
                    "starting_skills": ["Sorcery", "Dodge"],
                    "special_rules": "Do not gain experience; The Crow Master Necromancer; The Crow Master Spell; Necromancy; Mantle of Crows; Needle and Thread; Payment in blood"
                }
            },
            {
                name: "Dark Emissary",
                data: {
                    "hire_fee": "0",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "evil",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "0",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 2, "I": 3, "A": 1, "Ld": 8 },
                    "initial_equipment": [],
                    "starting_skills": [],
                    "special_rules": "Do not gain experience; Staff of Darkness; The Spiral; Lore of Darkness; Dark Emissary Spells"
                }
            },
            {
                name: "Dijin Katal, The Renegade Assassin",
                data: {
                    "hire_fee": "85",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Amazons (Lustria)", "Amazons (Mordheim)", "Shadow Warriors", "Dark Elves", "Druchii"],
                    "rating": "70",
                    "stats": { "M": 5, "WS": 7, "BS": 5, "S": 4, "T": 3, "W": 2, "I": 7, "A": 2, "Ld": 8 },
                    "initial_equipment": [497, 10, 10, 38, 156],
                    "starting_skills": ["Strike to Injure", "Quick Shot", "Dodge", "Lightning Reflexes", "Trick Shooter"],
                    "special_rules": "Do not gain experience; Kindred Hatred; Excellent Sight; Shadows Embrace; Perfect Killer; Renegade, Wanderer"
                }
            },
            {
                name: "Drenok Johansen, Wielder Of The Great Axe",
                data: {
                    "hire_fee": "70",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Norse Explorers", "Marauders of Chaos (The Norse)", "Cult of the Possessed", "Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Carnival of Chaos", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Horned Hunters", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania"],
                    "may_not_hire": [],
                    "rating": "70",
                    "stats": { "M": 4, "WS": 6, "BS": 3, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 8 },
                    "initial_equipment": [508, 509],
                    "starting_skills": ["Fearsome", "Strongman", "Combat master", "Step aside"],
                    "special_rules": "Do not gain experience; Berserker"
                }
            },
            {
                name: "Heinrich 'Altdorf' Schmidt", 
                data: {
                    "hire_fee": "75",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Norse Explorers", "Marauders of Chaos (The Norse)", "Cult of the Possessed", "Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Carnival of Chaos", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Horned Hunters", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania"],
                    "may_not_hire": [],
                    "rating": "75",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 3, "T": 3, "W": 2, "I": 6, "A": 2, "Ld": 8 },
                    "initial_equipment": [456, 10, 27, 4, 33, 31],
                    "starting_skills": ["Tomb Explorer", "Lightning Reflexes", "Whip Master", "Step Aside", "Streetwise", "Dodge", "Luck"],
                    "special_rules": "Do not gain experience; Oh no, not Snakes; Whip Swing; No time for you; I'll Take That"
                }
            },
            {
                name: "Khar-mel The Djinn", 
                data: {
                    "hire_fee": "80",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "45",
                    "stats": { "M": 6, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 3, "A": 2, "Ld": 8 },
                    "initial_equipment": [10],
                    "starting_skills": [],
                    "special_rules": "Do not gain experience; Fear; Ethereal; Arabian Elemental Magic; Khar-mel The Djinn Spells; Khar-mel The Djinn Skills; Whirlwind; Djinn's Curse; Djinn's Luck"
                }
            },
            {
                name: "Maximilian The Mad", 
                data: {
                    "hire_fee": "80",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Dwarf Treasure Hunters", "Dwarf Rangers", "Black Dwarfs", "The Sons of Hashut", "Dwarf Slayer Cult", "Mercenaries (Marienburg)", "Mercenaries (Reikland)", "Witch Hunters", "Averlanders", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Vampire Hunters of Sylvania"],
                    "may_not_hire": [],
                    "rating": "25",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 3, "T": 4, "W": 2, "I": 3, "A": 2, "Ld": 10 },
                    "initial_equipment": [510],
                    "starting_skills": ["Strongman"],
                    "special_rules": "Do not gain experience; Fanatical; Mad Max Hatred; Frenzy; Fear"
                }
            },
            {
                name: "Penthesilea, Mark Of The Serpent", 
                data: {
                    "hire_fee": "0",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Amazons (Lustria)", "Amazons (Mordheim)"],
                    "may_not_hire": [],
                    "rating": "70",
                    "stats": { "M": 5, "WS": 5, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 5, "A": 2, "Ld": 8 },
                    "initial_equipment": [10, 9, 49],
                    "starting_skills": ["Mesmerising dance", "Savage Fury", "Elixir of life", "Weapon Master", "Concealment"],
                    "special_rules": "Do not gain experience; Penthesilea Hire; Isolationists; Sacrifice; Norse Enmity; Not one of us; Mark of the Serpent; Man-Hater"
                }
            },
            {
                name: "Truthsayer", 
                data: {
                    "hire_fee": "0",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "good",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "0 points",
                    "stats": { "M": 4, "WS": 4, "BS": 3, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 9 },
                    "initial_equipment": [14],
                    "starting_skills": [],
                    "special_rules": "Do not gain experience; Staff of Light; The Triskele; Lore of Light; Truthsayer Spells"
                }
            }
        ]
    },
        {
        grade: "Grade 1C", 
        characters: [
            {
                name: "Belandysh, Condemned Champion Of Chen", 
                data: {
                    "hire_fee": "90",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Beastmen Raiders", "Norse Explorers", "Cult of the Possessed"],
                    "may_not_hire": [],
                    "rating": "130",
                    "stats": { "M": 4, "WS": 0, "BS": 0, "S": 0, "T": 0, "W": 3, "I": 0, "A": 0, "Ld": 10 },
                    "initial_equipment": [511, 512, 6, 97],
                    "starting_skills": ["Fearsome", "Strongman", "Ride"],
                    "special_rules": "Do not gain experience; Belandysh Special Upkeep; Immune to psychology; Belandysh Inconsistency; Regeneration; Tol’Agath; Wrath of Tchar"
                }
            },
            {
                name: "Grand Master Ippan Shu", 
                data: {
                    "hire_fee": "75",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Cult of the Possessed", "Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Carnival of Chaos", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Horned Hunters", "Imperial Outriders", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania", "Shadow Warriors", "Wood Elves of Athel Loren"],
                    "may_not_hire": [],
                    "rating": "110",
                    "stats": { "M": 4, "WS": 7, "BS": 7, "S": 4, "T": 4, "W": 2, "I": 6, "A": 4, "Ld": 10 },
                    "initial_equipment": [513],
                    "starting_skills": ["Art of Silent Death", "Strike to Injure", "Step Aside", "Mighty Blow", "Dodge", "Leap", "Sprint", "Acrobat", "Lightning Reflexes", "Jump Up", "Scale Sheer Surfaces", "Energy Focus", "Lightning Speed", "Leap of Faith", "Human Shield"],
                    "special_rules": "Do not gain experience; Ippan Shu Hire and Upkeep; Bare-handed Fighting; Immune to Psychology; With the Elegance of a Feather; Way of the Dragon"
                }
            },
            {
                name: "Innominatus, the Tilean Gladiator", 
                data: {
                    "hire_fee": "120",
                    "upkeep_fee": "40",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder", "Dark Elves", "Druchii"],
                    "rating": "90",
                    "stats": { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 8 },
                    "initial_equipment": [25, 158, 103, 6, 4, 18],
                    "starting_skills": ["Pit Fighter"],
                    "special_rules": "Do not gain experience; Innominatus Special Upkeep; Immune to psychology; Fear; Pit Master; Who is the hero; Thumbs Up; Thumbs Down"
                }
            },
            {
                name: "Luthor, the Crimson Blade of Reikland", 
                data: {
                    "hire_fee": "60",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Mercenaries (Marienburg)", "Mercenaries (Reikland)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Horned Hunters", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania"],
                    "may_not_hire": [],
                    "rating": "35",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 8 },
                    "initial_equipment": [10, 8, 1, 6],
                    "starting_skills": ["Step Aside", "Dodge", "Expert Swordsman", "Sprint", "Quick Shot"],
                    "special_rules": "Do not gain experience; Evil Eye; I am Everywhere; The Crimson Blade; Disengage; Luthor Post Game"
                }
            },
            {
                name: "Luthor, the Dark Wizard Extraordinaire", 
                data: {
                    "hire_fee": "60",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": ["Witch Hunters", "Mercenaries (Reikland)", "Sisters of Sigmar"],
                    "rating": "35",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 8 },
                    "initial_equipment": [11, 1, 32, 57, 39],
                    "starting_skills": ["Step Aside", "Dodge", "Expert Swordsman", "Sprint", "Quick Shot"],
                    "special_rules": "Do not gain experience; Evil Eye; I am Everywhere; Fireballs; Fish-slapping Dance; Luthor Post Game"
                }
            },
            {
                name: "Luthor, the Master Archer of Drakwald", 
                data: {
                    "hire_fee": "60",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Sisters of Sigmar", "Witch Hunters", "Averlanders", "Kislevites", "Ostlanders", "Amazons (Lustria)", "Amazons (Mordheim)", "Arabian Tomb Raiders", "Bretonnian Knights", "Gunnery School of Nuln", "Hochland Bandits", "Horned Hunters", "Imperial Outriders", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Battle Monks of Cathay", "Bretonnian Chapel Guard", "Lustrian Reavers", "Merchant Caravans", "Dreamwalkers, Cult Of Morr", "Grave Robbers", "Order Of The Mare", "Protectorate Of Sigmar", "Sorcerous Society", "Vampire Hunters of Sylvania", "Shadow Warriors", "Wood Elves of Athel Loren", "Dwarf Treasure Hunters", "Dwarf Rangers", "Black Dwarfs", "The Sons of Hashut", "Dwarf Slayer Cult"],
                    "may_not_hire": [],
                    "rating": "35",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 8 },
                    "initial_equipment": [22, 8, 62, 1, 38],
                    "starting_skills": ["Step Aside", "Dodge", "Expert Swordsman", "Sprint", "Quick Shot"],
                    "special_rules": "Do not gain experience; Evil Eye; I am Everywhere; Boast; Do you feel lucky lad; Luthor Post Game"
                }
            },
            {
                name: "Luthor Wolfenbaum, Treasure Hunter Par Excellence", 
                data: {
                    "hire_fee": "60",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "35",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 4, "W": 2, "I": 4, "A": 2, "Ld": 8 },
                    "initial_equipment": [10, 1, 26],
                    "starting_skills": ["Step Aside", "Dodge", "Expert Swordsman", "Sprint", "Pistolier", "Jump Up"],
                    "special_rules": "Do not gain experience; Luthor Post Game; I Ain't Got Time For You; Looter; Mordheim Guide"
                }
            },
            {
                name: "Maglah Khan's Horde", 
                data: {
                    "hire_fee": "80",
                    "upkeep_fee": "25",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Orc Mob", "Black Orcs", "Forest Goblins", "Night Goblins", "Snotlings", "Maneaters", "Ogre Hunting Party", "Black Dwarfs", "The Sons of Hashut", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Norse Explorers", "Beastmen Raiders", "Cult of the Possessed", "Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)"],
                    "may_not_hire": [],
                    "rating": "60",
                    "stats": { "M": 4, "WS": 5, "BS": 5, "S": 3, "T": 3, "W": 2, "I": 4, "A": 2, "Ld": 7 },
                    "initial_equipment": [15, 10, 21, 18, 1, 6, 514],
                    "starting_skills": ["Quick Shot", "Eagle Eyes", "Trick Shooter", "Ride", "Horse Archer"],
                    "special_rules": "Do not gain experience; Maglah's Boyz; Hobgoblin leader"
                }
            }
        ]
    },
    {
        grade: "Grade 2A",
        characters: [
            {
                name: "Aksho'akhash the Vile Dreadwing, Lord of the Carrion Throne", 
                data: {
                    "hire_fee": "30",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Carnival of Chaos", "Marauders of Chaos (The Norse)", "Marauders of Chaos (The Kurgan)", "Marauders of Chaos (The Hung)", "Cult of the Possessed", "Beastmen Raiders"],
                    "may_not_hire": [],
                    "rating": "35",
                    "stats": { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 3, "W": 3, "I": 5, "A": 2, "Ld": 10 },
                    "initial_equipment": [],
                    "starting_skills": [],
                    "special_rules": "Do not gain experience; Aksho'akhash Summoning; Aksho'akhash Summoning Cost; Fear; Daemonic Flesh; Daemonic Instability; Coward King; Fly; Aethereal Hoarder"
                }
            },
            {
                name: "Busty Gwen", 
                data: {
                    "hire_fee": "0",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "any",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "40",
                    "stats": { "M": 4, "WS": 4, "BS": 1, "S": 4, "T": 4, "W": 2, "I": 3, "A": 2, "Ld": 8 },
                    "initial_equipment": [8, 515],
                    "starting_skills": ["Step Aside", "Mighty Blow", "Strike to Injure"],
                    "special_rules": "Do not gain experience; Massively Built; Not Hired Muscle; Gwen single game"
                }
            },
            {
                name: "The Dark Jester in Mordheim", 
                data: {
                    "hire_fee": "75",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "",
                    "may_hire": ["Carnival of Chaos", "Cult of the Possessed"],
                    "may_not_hire": [],
                    "rating": "55",
                    "stats": { "M": 4, "WS": 3, "BS": 3, "S": 3, "T": 3, "W": 2, "I": 6, "A": 2, "Ld": 7 },
                    "initial_equipment": [11, 16],
                    "starting_skills": ["Leap", "Acrobat", "Lightning Reflexes", "Jump Up", "Dodge"],
                    "special_rules": "Do not gain experience; Dark Jester Loner; Confound and Confuse"
                }
            },
            {
                name: "The Headless Horseman", 
                data: {
                    "hire_fee": "100",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "evil",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "80",
                    "stats": { "M": 0, "WS": 4, "BS": 5, "S": 4, "T": 4, "W": 2, "I": 6, "A": 2, "Ld": 8 },
                    "initial_equipment": [102, 104, 8, 4, 516],
                    "starting_skills": ["Horse Archer", "Pistolier", "Eagle Eyes", "Trick Shooter", "Strongman"],
                    "special_rules": "Do not gain experience; Fear; Immune to Psychology; Immune to Poison; Faithful Steed; Undead; Expert Rider; Rapid Reload; Head Hewer; Wanderer"
                }
            },
            {
                name: "The Foole", 
                data: {
                    "hire_fee": "40",
                    "upkeep_fee": "0",
                    "may_be_hired_alignment": "evil",
                    "may_hire": ["Mercenaries (Marienburg)", "Mercenaries (Middenheim)", "Mercenaries (Reikland)", "Hochland Bandits", "Outlaws of Stirwood Forest", "Pirates", "Tileans (Miragleans)", "Tileans (Remasens)", "Tileans (Trantios)", "Lustrian Reavers"],
                    "may_not_hire": [],
                    "rating": "30",
                    "stats": { "M": 4, "WS": 4, "BS": 4, "S": 4, "T": 3, "W": 1, "I": 4, "A": 1, "Ld": 7 },
                    "initial_equipment": [10, 8],
                    "starting_skills": ["Acrobat", "Lightning Reflexes"],
                    "special_rules": "Do not gain experience; Immune to Psychology; Wanderer; Poison Ring; Sadist; Master Craftsman Schleige"
                }
            },
            {
                name: "Sigmund Spindle, the Harvester of Flesh", 
                data: {
                    "hire_fee": "70",
                    "upkeep_fee": "35",
                    "may_be_hired_alignment": "evil",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "65",
                    "stats": { "M": 6, "WS": 5, "BS": 2, "S": 5, "T": 4, "W": 2, "I": 7, "A": 3, "Ld": 7 },
                    "initial_equipment": [463],
                    "starting_skills": ["Sprint", "Scale Sheer Surfaces", "Dodge", "Lightning Reflexes", "Step Aside", "Unstoppable Charge"],
                    "special_rules": "Do not gain experience; Sigmund Spindle Alt Hire Cost; Frenzy; Fear; Immune To Poison; No Pain"
                }
            },
            {
                name: "William Schäke­stange, Master Bard", 
                data: {
                    "hire_fee": "70",
                    "upkeep_fee": "30",
                    "may_be_hired_alignment": "good",
                    "may_hire": "",
                    "may_not_hire": [],
                    "rating": "66",
                    "stats": { "M": 4, "WS": 5, "BS": 3, "S": 4, "T": 3, "W": 2, "I": 5, "A": 2, "Ld": 8 },
                    "initial_equipment": [10, 8, 4, 69, 517],
                    "starting_skills": ["Jump Up", "Dodge", "Lightning Reflexes", "Ride", "Swashbuckler"],
                    "special_rules": "Songster; Pantomime Horse; Pages of Couragio"
                }
            }
        ]
    }
];
