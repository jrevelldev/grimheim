export const MAGIC = {
  //Timing Options
  //1. Pre Game - For any skills that are used before a game starts
  //2. Recovery - For any skills that are used during the recovery phase
  //3. Movement - For any skills that are used during both player and opponent movement phase
  //4. My Movmement - For any skills used during players movment phase
  //5. Opponent Movement - For any skills used during opponents movement phase
  //6. Shooting - For any skill used during both players shooting phases
  //7. My Shooting - For any skills used during players shooting phase
  //8. Opponent Shooting - For any skills used during opponents shooting phase
  //9. Melee - For any skill used during both players melee phase
  //10. My Melee - For any skills used during players melee phase
  //11. Opponent Melee - For any skills used during opponents melee phase
  //12. Misc - For any skill that isnt used during a phase
  //13. Post Game - For any skill that is used post game


  "Amazon Rituals": [
    {
      name: "Singing Wind",
      description: "The goddess appears in the form of singing motes and dancing lights that will entrance and 'hold' any model within 10\" until the start of the Amazon player's next turn. The model cannot move, shoot, or cast spells, but may defend itself in hand-to-hand combat. Models affected by this ritual automatically go last in combat.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Serpent’s Strength",
      description: "All friendly models close to the Priestess will be charged with a frantic energy until the end of their next turn. During this time any model within 8\" of the Priestess (including herself) will add +1 to their Strength. The ritual cannot be cast if the Priestess is in close combat during her Shooting phase. The effects will continue after the ritual is cast if the Priestess enters combat.",
      difficulty: 9,
      timing: ["7", "9"]
    },
    {
      name: "Wendala’s Maelstrom",
      description: "The storm extends out from the Priestess 18\". All attempts to shoot missile weapons by the enemy will be at -1 to hit. The ritual lasts up until the start of the Amazon player’s next turn.",
      difficulty: 7,
      timing: ["7", "8"]
    },
    {
      name: "Shield of Thorns",
      description: "The ritual produces a cocoon of thorns all about the Priestess, making her immune to ranged or magical attacks. Any models wishing to charge the Priestess can do so but the thorns negate any strikes by the Priestess and her enemies in the first round of combat. The Priestess cannot cast this ritual while in hand-to-hand combat.",
      difficulty: 7,
      timing: ["7", "8", "9"]
    },
    {
      name: "The Living Jungle",
      description: "Pick one model within 12\". The model is suddenly swarmed by a savage mix of snakes, spiders and insects, most of them poisonous. The afflicted model takes 1D6 Strength 2 hits with no armour saves allowed apart from Ward saves. You cannot use a dodge save against a swarm.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Siren’s Dreams",
      description: "The song is so beautiful and mesmerising that it momentarily distracts the Amazon’s enemies within 12\" such that all Ld tests for the opposing warband are made at -1 until the end of the opposing player’s next turn. Lizardmen and Undead are immune to the effects of this ritual.",
      difficulty: 7,
      timing: ["7", "12"]
    }
  ],

  "Arabian Elemental Magic": [
    {
      name: "Riding the Wind",
      description: "Invoking the Element of the Air, the caster rises up on a warm breeze, only to set down again on another part of the battlefield. This spell is cast at the beginning of the caster’s Movement phase. The caster may move up to 12+D6\" anywhere on the battlefield, ignoring any intervening terrain; this counts as the caster’s movement for that turn. This spell may not be used to move the caster into base contact with an enemy warrior, but the caster may shoot as normal (with a -1 penalty for having moved).",
      difficulty: 6,
      timing: ["4"]
    },
    {
      name: "Skin of Stone",
      description: "Calling upon the Element of the Earth, the caster is able to make a warrior’s skin become as hard as stone. This spell may be cast on any friendly warrior within 6\". The target gains +2 to his armour save but suffers a -1 penalty to Initiative. The spell may be maintained each turn, providing the affected warrior remains within 6\" of the caster and the caster can pass a Difficulty test. If the caster is more than 6\" away from the affected warrior in the Recovery phase, the spell cannot be maintained and wears off. Only one warrior may be affected by a Stone Skin spell at any one time, although the caster is free to cast other spells while maintaining the Stone Skin.",
      difficulty: 7,
      timing: ["1", "7", "9"]
    },
    {
      name: "Burning Hand",
      description: "By invoking the Element of Fire, one of the caster’s hands becomes a burning bolt which he can use to smite his enemies. This spell is cast at the beginning of the Combat phase. The caster may sacrifice all of his normal attacks to make one hand-to-hand attack at Strength 5, causing 2 wounds. If the enemy warrior is successfully hit, he is set on fire on a roll of 4+. This spell lasts for one round only.",
      difficulty: 8,
      timing: ["9"]
    },
    {
      name: "Quicksand",
      description: "By invoking the Element of Water, water rises from the very rocks and sand and turns the ground to quicksand. This spell is cast at any warrior within 6\". The water floods the area for 3\" around the targeted warrior. The effect lasts until the beginning of the caster’s next Recovery phase. All warriors within the quicksand must pass a Strength test or be unable to move. Warriors in combat cannot attack but may defend themselves.",
      difficulty: 6,
      timing: ["1", "3", "7"]
    },
    {
      name: "Storm of Magic",
      description: "By breaching the very fabric of reality, the caster is able to summon a bolt of pure magical energy. The caster may target any warrior within 12\". If the spell is successfully cast, the target is struck by a bolt of energy and takes one S5 hit. Armour saves may be taken as normal.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Blessing of the Elements",
      description: "The caster calls on the elements of the desert and draws upon the fortune they can bestow. In the post-battle sequence, the player may re-roll any one dice or modify one dice by +1/-1. If the caster was taken out of action, this spell may not be cast.",
      difficulty: 6,
      timing: ["13"]
    }
  ],

  "Chaos Dwarfs Magic": [
    {
      name: "Spectre of Hashut",
      description: "A spectral apparition of the god Hashut hits the miniature closest to the sorcerer. Designate the enemy miniature closest to the wizard’s miniature within 10\". That miniature is automatically stunned.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Stone Statue",
      description: "By using illusory magic, the sorcerer turns his closest enemy into a stone statue. Choose an enemy miniature that is within 12\" of you and is in your line of sight. For the rest of the turn and the following turn, the miniature will not be able to do anything. If attacked in melee, the miniature will suffer an automatic hit. If it is shot, the miniature that shoots at it will get a +1 bonus on hit.",
      difficulty: 9,
      timing: ["7", "9"]
    },
    {
      name: "Fireball",
      description: "The wizard summons a ball of flames that he casts on his enemies. This spell has a range of 16\" and requires line of sight. The target receives an automatic hit of strength 4.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Vanish",
      description: "The sorcerer vanishes in front of the enemy’s eyes only to reappear elsewhere on the battlefield. The wizard may immediately make a move of up to 6\" in any direction and may enter or leave combat without penalty. If he enters combat, he is considered to be making a charge move.",
      difficulty: 7,
      timing: ["4"]
    },
    {
      name: "Eruption",
      description: "After emitting a scream, the sorcerer turns into a red incandescent ball while a torrent of lava and stones gushes from his mouth and skin. All miniatures within a distance of up to 4\" (friend or foe) suffer an automatic hit of Strength 4. After resolving the effects of this hit, the sorcerer will not be able to cast any more spells until the next turn and will suffer a -1 to his Toughness attribute.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Eye of Hashut",
      description: "The wizard opens his arms while summoning the mighty Hashut to help his children and give them strength. Choose a friendly miniature within 12\" and roll 1D6. Hobgoblins always subtract 1 from the result. You may use the Eye of Hashut successfully only once per battle. 1: Hashut does not trust you. The miniature is immediately out of action, although it will not roll on the serious injury table during the post-battle sequence. 2-5: Hashut trusts you. The miniature adds +1 to one of its attributes for the rest of the game. 6: Hashut favors you. The miniature adds +1 to all attributes for the rest of the game.",
      difficulty: 6,
      timing: ["7"]
    }
  ],

  "Chaos Rituals": [
    {
      name: "Vision of Torment",
      description: "The Chaos Mage summons horrible visions of the realm of Chaos, causing his enemy to recoil in utter horror. This spell has a range of 6\" and must be cast on the closest enemy model. If the Chaos Mage is in hand-to-hand combat, he must choose his target from those in base contact with him. The affected model is immediately stunned. If the model cannot be stunned it is knocked down instead.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Eye of God",
      description: "The Chaos Mage implores the Dark gods to grant a boon to their servant. You may use the Eye of God successfully only once per battle. Choose any single model within 6\", friend or foe. Roll a D6 to see what happens to the affected model. 1: The wrath of the gods descends upon the target. The model is taken out of action immediately. He does not have to roll on the Serious Injury chart after the battle though. 2-5: The model gains +1 to any one of his characteristics during this battle (chosen by the player who cast the spell). 6: The model gains +1 to all of its characteristics for the duration of the battle.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Dark Blood",
      description: "The Chaos Mage cuts his palm and his blood spurts out, burning flesh and armour. This attack has a range of 8\" and causes D3 S5 hits. It hits the first model in its path. After using this spell the Chaos Mage must roll on the Injury table for himself to see how dangerous the wound is, though treat the out of action result as stunned instead.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Lure of Chaos",
      description: "The Chaos Mage calls upon the taint of chaos which exists in the inner soul of all living beings. The spell has a range of 12\" and must be cast on the closest enemy model. Roll a D6 and add the Chaos Mage’s Leadership to the score. Then roll a D6 and add the target’s Leadership to the score. If the Chaos Mage beats his opponent’s score he gains control of the model until the model passes a Leadership test in his own recovery phase. The model may not commit suicide, but can attack models on his own side, and will not fight warriors from the Chaos Mage’s warband. If he was engaged in hand-to-hand combat with any warriors of the Chaos Mage’s warband, they will immediately move 1\" apart.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Wings of Darkness",
      description: "The Chaos Mage is lifted from the ground by two shadowy Daemons and carried wherever he wants to go. The Chaos Mage may immediately move anywhere within 12\", including into base contact with an enemy, in which case he counts as charging. If he engages a fleeing enemy, in the close combat phase he will score one automatic hit and then his opponent will flee again (if he survives).",
      difficulty: 7,
      timing: ["4"]
    },
    {
      name: "Word of Pain",
      description: "Speaking the forbidden name of his dark god, the Chaos Mage causes indescribable pain to all who hear it. All models within 3\" of the Chaos Mage, friend or foe, suffer one S3 hit. No armour saves are allowed.",
      difficulty: 7,
      timing: ["7"]
    }
  ],

  "Charms & Hexes": [
    {
      name: "Scry",
      description: "The Witch uses ancient diving crystals to foretell the future and influence the actions of her comrades. For the duration of the turn one hero or henchman may re-roll D3 dice rolls and add +1 or -1 to the result.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Curse",
      description: "The Witch bestows a powerful curse on one of her enemies that saps their confidence and resolve. One enemy model within 12\" of the Witch must re-roll all successful dice rolls for the duration of this and their next turn.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Dust of the Blind",
      description: "Casting a handful of dust into the air, the Witch blows it around her, blinding her enemies. One enemy model within 16\" of the Witch is struck instantly blind. They may not shoot, charge or run, are at half Weapon Skill and will move in a random direction at the start of their turn. The Blindness lasts until the Witch casts another spell or moves.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Age of Stone",
      description: "Whispering words of ancient power, the Witch causes an enemy to age rapidly before their very eyes, making them weak and feeble! One enemy model within 12\" of the Witch will be severely debilitated and all of their characteristics are reduced by -1 for the duration of this and their next turn.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Warrior's Bane",
      description: "Muttering a dark and malicious incantation, the Witch causes a warrior's grip to loosen, making it almost impossible for them to attack. One enemy model within 18\" of the Witch will be unable to use any of their weapons as they perpetually slip from their grasp. They will be unable to shoot and count as fighting with fists in Hand-to-Hand combat. The enchantment lasts for the duration of this and their next turn.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Cure",
      description: "A faint aura extends from the Witch's body. All who are touched by it feel warmth and vitality flowing through their veins. All friendly models within 6\" of the Witch have a single wound healed. In addition any stunned or knocked down models may immediately stand up.",
      difficulty: 6,
      timing: ["7"]
    }
  ],

  "Dark Elf Magic": [
    {
      name: "Doombolt",
      description: "Whispering an ancient incantation the Sorceress conjures a bolt of pure dark energy and unleashes it from her outstretched hand. The bolt of doom may be targeted at any enemy model in line of sight. The Doombolt has an 18\" range and causes a Strength 5 hit. If the target model is wounded, then the next closest model within 6\" is also hit on a 4+, at -1 Strength than the previous hit. The bolt will keep leaping until there are no more targets within range or until its Strength drops to a one. Each model can only be hit by a bolt once per turn. Take armour saves as normal.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Word of Pain",
      description: "The Sorceress calls the curse of the Witch King down on his enemy reducing their willingness to fight. The spell may be cast at an enemy model within 12\". The victim must re-roll all successful hand to hand or missile attacks and all to wound rolls. If the victim wishes to charge, he must pass a successful Leadership test first. Lasts until the beginning of the next Dark Elf turn.",
      difficulty: 8,
      timing: ["7", "8", "9"]
    },
    {
      name: "Soul Stealer",
      description: "At the Sorceress’s touch, the essence of life is drained from her enemy and absorbed into her body giving him renewed strength and vigour. Once successfully cast, the Sorceress has to make a to hit roll against a model in base contact. If the attack is successful and her opponent is struck, he suffers a wound with no armour save possible. The Sorceress feeds on this life-force and adds one wound to her profile. Note: the Sorceress can never have more then one extra wound from the use of this spell and the extra wound is lost at the end of the battle.",
      difficulty: 9,
      timing: ["9"]
    },
    {
      name: "Flamesword",
      description: "Summoning Dark Magic the Sorceress engulfs a weapon in twisted black flames. The Sorceress may choose the hand-to-hand combat weapon of a member of her warband within 6\" to be engulfed in flames. A weapon with these flames acts as a normal weapon of its type, but also adds a +2 bonus to the users Strength. Hits inflicted from the weapon ignore armour saves. Lasts until the Sorceress’ next shooting phase.",
      difficulty: 8,
      timing: ["7", "9"]
    },
    {
      name: "Deathspasm",
      description: "The Sorceress channels Dark Magic into her enemy, causing him to writhe in excruciating pain. The Deathspasm has a range of 6\" and must be cast on the closest enemy model. The affected model must roll on the injury chart. If successfully cast, the casting Sorceress is immediately knocked down.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Witch Flight",
      description: "The Sorceress bends the winds of magic to her will and flies through the air. The Sorceress may immediately move anywhere within 12\", and may count as charging. If she engages a fleeing enemy in the close combat phase she will score 1 automatic hit and then the opponent will flee again.",
      difficulty: 7,
      timing: ["4"]
    }
  ],

  "Forest Goblin Magic": [
    {
      name: "Wind of Gork",
      description: "A blast of foul flatulence signals Gork’s wrath. Range: 12\". The first model in its path must roll under its Toughness or take a S2 hit and be knocked down automatically.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Gaze of Mork",
      description: "The Shaman invokes the presence of the God Mork to smite his foes with lightning. Range 12\". D3 S3 hits strike the first model in their path.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "‘Eadbanger",
      description: "The Shaman channels pure Waaagh! energy through his body and vomits it toward the enemy. Range 6\". Fire bolts equal to the number of the Shaman’s Attacks. Resolve with Strength equal to the Shaman’s Toughness at the first model in their path. After the bolts effects are resolved, roll a die. On a 1 the Shaman has drawn upon too much power. The Shaman collapses and goes out of action.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Leap of Waaagh!",
      description: "The Shaman summons a giant green hand to lift any Goblin and carry him into the fray. The Shaman or any other Goblin within 3\" may be moved up to 12\". If this move brings them into close combat, they count as charging in the close combat phase.",
      difficulty: 7,
      timing: ["4"]
    },
    {
      name: "Idol of Gork",
      description: "Swirling energy crackles around the Shaman, giving him the appearance of a huge orc hero. The Shaman gains +1 WS, +1 S, and +1 A. This enhancement lasts until the Shaman takes a wound.",
      difficulty: 8,
      timing: ["7", "12"]
    },
    {
      name: "‘Ere we go",
      description: "The Shaman and nearby Goblins become filled with the essence of the Waaagh! All friendly models within 6\" of the Shaman treat stunned results on the injury table as knocked down instead. The effects last until the Shaman takes a wound.",
      difficulty: 8,
      timing: ["7", "9"]
    }
  ],

  "Funerary Rites": [
    {
      name: "Morr’s Protection",
      description: "The Priest of Morr calls out to his god when confronted by an abomination and asks that he be shielded from the corrupted magic of the tainted. Any Magical attacks made by a Necromancer, a Magister or Daemons, which would be considered a direct attack on the priest, will be negated if this rite is successful.",
      difficulty: 6,
      timing: ["7", "8"]
    },
    {
      name: "Death Holds No Fear",
      description: "Priests of Morr must be steadfast in their resolution and as such must, above all else, have no fear of death. The priest of Morr is now Fearless for the remainder of the game.",
      difficulty: "Auto",
      timing: ["1", "4", "9"]
    },
    {
      name: "Sanctity of the Fallen",
      description: "Those who fall shall be sanctified and their soul freed, in the name of Morr, god of death. The priest of Morr may attempt to perform the Rite of Sanctity on a model (friend or foe) who has been taken Out of Action. The priest of Morr must be within 6\" of the model in question. If successful, the model may not be raised up by a Necromancer.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Hand of Morr",
      description: "'By his the hand of Morr, the Undead shall become as dust and ashes'. The priest of Morr must be in base-to-base contact with an Undead model. Before Hand-to-Hand combat occurs, the priest of Morr may attempt to use the Hand of Morr rite. If successful the foe immediately goes out of action (this affects Zombies, Dire Wolves and Vampires). Ghouls and Possessed affected by this rite will immediately flee their full Move away from the priest of Morr.",
      difficulty: 9,
      timing: ["9"]
    },
    {
      name: "Do you know who I am?",
      description: "'Gaze upon me, abomination, for I am a priest of Morr'. This rite has a range of 6\" and must be directed at the closest Undead model first, or if no Undead are within range, at the next closest human servant of the Undead (Dregs, Ghouls, Necromancers), or finally at any model. If successful, that model is immediately Stunned. If the model cannot be Stunned, then it is Knocked Down instead.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "I am death!",
      description: "'I am a priest of Morr, god of death!' It is a well-known fact that the priests of Morr are not martially inclined. Their divine duties involved the dead, not the taking of life. However, there are times when a priest of Morr will he called to engage in combat and who would be more feared than a representative of the god of Death? This spell gives the priest of Morr a 6+ armour save and increases their WS by either +1 or makes it 4, whichever is greater.",
      difficulty: 8,
      timing: ["7", "8", "9"]
    }
  ],

  "Goblin Magic": [
    {
      name: "Wind of Gork",
      description: "A blast of foul flatulence signals G’rrk’s Wrath. Range: 12\". The first model in its path must roll under its Toughness or take a Strength 2 hit and be knocked down automatically.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Gaze of Mork",
      description: "The Shaman invokes the presence of the God Mork to smite their foes with lightning. Range: 12\". D3 Strength 3 hits strike the first model in their path.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "‘Eadbanger",
      description: "The Shaman channels pure Waaagh! energy through their body and vomits it toward the enemy. Range: 6\". Fire bolts equal to the number of the Shaman’s Base Attacks. Resolve with Strength equal to the Shaman’s Toughness at the first model in their path. After the bolts effects are resolved, roll a die. On a 1 the Shaman has drawn upon too much power, they collapse and goes Out of Action.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Leap of Waaagh!",
      description: "The Shaman summons a giant green hand to lift any Goblin and carry them into the fray. The Shaman or any other Goblin within 3\" may be moved up to 12\", ignoring terrain. If this move brings them into close combat, they count as charging in the close combat phase.",
      difficulty: 7,
      timing: ["4"]
    },
    {
      name: "Idol of Gork",
      description: "Swirling energy crackles around the Shaman, giving them the appearance of a huge Orc hero. The Shaman gains +1 WS, +1 S, and +1 A. This enhancement lasts until the Shaman takes a wound.",
      difficulty: 8,
      timing: ["7", "12"]
    },
    {
      name: "‘Ere we go!",
      description: "The Shaman and nearby allies become filled with the essence of the Waaagh! All friendly models within 6\" of the Shaman treat stunned results on the Injury Table as knocked down instead. The effects last until the Shaman takes a wound.",
      difficulty: 8,
      timing: ["7", "9"]
    }
  ],

  "Lady’s Prayers": [
    {
      name: "Lady’s Favors",
      description: "All your heroes count as having Lucky Charms for this battle and ignore the first hit against them on a D6 roll of 4+. If they already own Lucky Charms, they may reroll a failed Lucky Charm save, accepting the second result.",
      difficulty: "Auto",
      timing: ["1", "9"]
    },
    {
      name: "Blessed Protection",
      description: "The Damsel and any Bretonnians within 6\" of her gain an unmodified ward save of 4+ against the effects of spells or prayers. Test each shooting phase: on a roll of 1 or 2, the spell dissipates.",
      difficulty: 8,
      timing: ["6", "7"]
    },
    {
      name: "Swiftstride",
      description: "The damsel may pick a friendly hero or henchman (including herself) within 12\" that charged or failed a charge this turn. That warrior gains +1 to hit on all attacks they make until the end of the turn. In addition, if they are not in combat, they may make an additional move of 1D6\" towards an enemy (if they move into base contact with an enemy, this counts as a charge).",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Lady’s Scorn",
      description: "Anyone attempting to shoot at the Damsel must first pass a Leadership test, or else they are unable to fire this turn. This includes Silver Arrows, Crossbow Pistols, Hand-to-Hand Pistols, and Template shot weapons that she is within the path of (like Blunderbusses.) This spell lasts until the end of the game.",
      difficulty: 5,
      timing: ["7", "8"]
    },
    {
      name: "Elixir of Life",
      description: "Any one model within 4\" of the Damsel (including herself) may be healed. The warrior is restored to his full quota of Wounds. In addition, if any friendly models within 4\" are stunned or knocked down, they immediately come to their senses, stand up, and continue fighting as normal.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Guiding Vision",
      description: "The Damsel picks a friendly hero or henchman within 8\". Until the start of your next shooting phase, that warrior may re-roll one die roll they make and add +1 or -1 to the result.",
      difficulty: 6,
      timing: ["7"]
    }
  ],

  "Lesser Magic": [
    {
      name: "Fires of U’Zhul",
      description: "The wizard summons a fiery ball of flames and hurls it upon his enemies. The fireball has a range of 18\" and causes one Strength 4 hit. It strikes the first model in its path. Armour saves are taken as normal (ie, with -1 modifier).",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Flight of Zimmeran",
      description: "Calling upon the power of the winds of magic, the wizard walks on air. The wizard may immediately move anywhere within 12\", including into base contact with an enemy, in which case he counts as charging. If he engages a fleeing enemy in the close combat phase he will score 1 automatic hit and then his opponent will flee again (if he survives).",
      difficulty: 7,
      timing: ["4"]
    },
    {
      name: "Dread of Aramar",
      description: "The wizard places a sense of mind-numbing fear into the minds of his opponents. A single model within 12\" of the wizard must pass a Leadership test or flee 2D6\" directly away from him. If he flees, he must test at the start of each of his own movement phases and will continue to flee until he passes a test. Note that this spell does not affect Undead or any model immune to fear.",
      difficulty: 7,
      timing: ["5", "7"]
    },
    {
      name: "Silver Arrows of Arha",
      description: "Silvery arrows appear from thin air and circle around the wizard, shooting out to strike his foes. Unlike other spells, this cannot be cast whilst in hand-to-hand combat. The spell summons D6+2 arrows which the wizard can use to shoot against one enemy model. The arrows have a range of 24\". Use the wizard’s own Ballistic Skill to determine whether he hits or not, but ignore movement, range and cover penalties. The arrows cause one S3 hit each.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Luck of Shemtek",
      description: "The wizard summons the fickle power of magic to manipulate chance. The wizard may re-roll all his failed dice rolls, though the second results stand. The effect lasts until the beginning of his own next turn.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Sword of Rezhebel",
      description: "A flaming sword appears in the hand of the wizard, promising red ruin to all who stand in his way. The sword gives the wizard +1 Attack, +2 Strength and +2 Weapon Skill. Take a Leadership test at the beginning of each of the wizard’s own turns. If the test fails, the sword disappears.",
      difficulty: 8,
      timing: ["1", "7", "9"]
    }
  ],

  "Lizardman Magic": [
    {
      name: "Chotec’s Wrath",
      description: "A lightning bolt shoots from the sky above and strikes the closest enemy model within 10\" of the Skink Priest, causing a single Strength 5 hit. However add +1 to the Strength and +1 to the roll on the injury table if the model is wearing armour like light armour, heavy armour, Ithilmar armour or Gromril armour.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Sotec’s Blessing",
      description: "This spell may be cast on a single model within 6\" of the Skink Priest or on himself. Roll a D6 to determine the blessing. The effects remain in play until the Priest or the model is Stunned or taken Out of Action. Only a single model may be affected by the blessing at any given time. 1-2: +1 BS or +1 to hit in close combat. 3-4: Toughness +1. 5-6: Movement and Initiative +1.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Huanchi’s Stealth",
      description: "The spell affects all Skinks within 6\" of the Skink Priest, including himself, and allows any model that is in cover to immediately to go into hiding. A model may go into hiding even if they ran in the movement phase or has already shot with a missile weapon.",
      difficulty: 7,
      timing: ["5", "7"]
    },
    {
      name: "The Old Ones’ Protection",
      description: "The Skink Priest and any Lizardmen within 4\" of him gain a save of 4+ against the effects of spells or prayers. This spell remains in play until the Skink Priest is taken Out of Action.",
      difficulty: 6,
      timing: ["7", "8"]
    },
    {
      name: "Tinci’s Rage",
      description: "A single Lizardman within 6\" of the Skink Priest or himself, is overtaken by rage and follows the rules for Frenzy, in addition he gains +1 Strength. This spell remains in play until the Skink Priest or the model is Stunned or is taken Out of Action. At the beginning of the turn the Skink priest must pass a Leadership roll in order to keep the spell going. Only a single model may be affected by the blessing at any given time, but the Skink Priest can choose to release the spell at the beginning of his turn if he wish to attempt to recast it on another model later in the shooting phase.",
      difficulty: 8,
      timing: ["3", "7", "10"]
    },
    {
      name: "Itzl’s Speed",
      description: "A single Lizardman model within 6\" of the Skink Priest or himself, may make an additional sprint of movement and move up to 4\". This counts, as running and a model may not move if he has already fired with a missile weapon. He may not charge with this extra move.",
      difficulty: 7,
      timing: ["4", "7"]
    }
  ],

  "Lore of Darkness": [
    {
      name: "Bolt of Dark Light",
      description: "The Dark Emissary conjures a bolt of malign power to smite his enemies. The bolt has a range of 12\" and causes a single Strength 5 hit against the first model in its path.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Betrayal in Death",
      description: "Summoning all the curses of the Dark Master, the Emissary instils the vigour of the undead into a slain enemy forcing them to attack their comrades. This spell will affect all enemy models slain in the shooting phase or close combat and lasts until the start of the caster's next turn. The enemies will reanimate as they are killed and attack their comrades. If not in combat the model will shoot if able, or charge if it has no missile weapons. If in combat the enemy will only make a single attack. After attacking the enemy will fall once more, dead.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Nightmare",
      description: "A vision of a warrior's worst nightmares manifests before him instilling inner feelings of dread. This spell may be cast upon an enemy model within 18\" of the caster. The model must take an immediate fear test as if charged by a fear-causing enemy. If failed the model flees 2D6\" away from the Dark Emissary.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Curse of the Dark Master",
      description: "The Dark Emissary bas the power to enfeeble his enemies, loosening their grip on their swords and debilitating their will through the cold touch of fear. This spell can be cast upon a single model within 24\" of the caster. All that model's rolls to hit for both shooting and combat are reduced by -1 until the start of the caster' next turn.",
      difficulty: 8,
      timing: ["7", "8", "9"]
    },
    {
      name: "Fog of Death",
      description: "A deep and impenetrable fog cloaks the entire battlefield, filled with the vicious embodiments of nightmares. Chaos and fear ensue. This spell affects every model on the board except the Dark Emissary. Enemy models are affected on a roll of 4+, while friendly models are only affected on a 6+. All models attacked by the nightmare creatures suffer a strength 2 hit. The fog lasts until the start of the caster's next turn and reduces line of sigh to 3D6\" for all warriors present which will affect shooting, charging etc.",
      difficulty: 10,
      timing: ["3", "6", "7"]
    },
    {
      name: "Coils of the Serpent",
      description: "The Emissary conjures a dark serpent of pure malign energy to ensnare and crush an unwitting adversary in its coils. This spell may be cast upon a single enemy model within 6\" of the caster. The model must take an immediate toughness test to fight off the deadly serpent. If failed the model is crushed to death and out of action. No saves of any kind will protect against this magic.",
      difficulty: 10,
      timing: ["7"]
    }
  ],

  "Lore of Light": [
    {
      name: "Wings of Fate",
      description: "Using the powers of life itself, the Truthsayer conjures a flock of birds to sweep down and attack his enemies. The flock has a range of 18\" and may attack any model within this range of the Truthsayer. The enemy model suffers D3 Strength 2 hits.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Light of Battle",
      description: "The power of light infuses one of the Truthsayer's allies, encasing them in a protective barrier of pure light. This spell may be cast upon a friendly model within 12\" of the caster. That model has an additional save of 5+ that can be reduced in any way against all attacks until the start of the Truthsayer's next turn.",
      difficulty: 6,
      timing: ["7", "8", "9"]
    },
    {
      name: "Gift of Life",
      description: "Life is at the essence of the Truthsayer's magic. Harnessing all of his power the Truthsayer restores a fallen comrade miraculously back to life! This spell may be cast upon a friendly model slain in the previous enemy turn. The model is immediately restored back to 1 wound remaining and should be placed as accurately as possible where they fell.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Blessing of Valour",
      description: "The Truthsayer evokes a powerful blessing, which instils an ally with the courage and strength of the immortal hunter gods. This spell may be cast upon a single friendly model within 24\". The model is infused with strength and courage, gaining +1 to all hit rolls in close combat for the duration of the turn.",
      difficulty: 8,
      timing: ["7", "9"]
    },
    {
      name: "Boon of Courage",
      description: "A corona of reassuring energy surrounds the Truthsayer and envelops an ally with its power, instilling resolve and unshakable determination. This spell affects all friendly models within 12\". The models are completely immune to the effects of psychology and all alone tests until the end of the Truthsayer's next turn.",
      difficulty: 8,
      timing: ["1", "7"]
    },
    {
      name: "Voice of Command",
      description: "The booming resonance of the voice of the Truthsayer echoes across the fens and enemies quake with indecision and doubt. This spell affects one model within 24\" of the Truthsayer. That model may do nothing in its next turn other than defend itself in combat. It may not move, shoot, attack or perform any other action.",
      difficulty: 9,
      timing: ["5", "7", "8", "9"]
    }
  ],

  "Magic of the Horned Rat": [
    {
      name: "Warpfire",
      description: "A green flame leaps from the outstretched paw of the Sorcerer and burns its victims with indescribable agony. The spell has a range of 8\", hitting the first model in its path. The spell causes D3 Strength 4 hits on its target, and one Strength 3 hit on each model within 2\" of the target.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Children of the Horned Rat",
      description: "The Sorcerer raises his paws and calls upon the Father of the Skaven to send forth his servants. This spell must be used before the game, and may only be used once. When cast, the spell summons D3 Giant Rats, which are placed within 6\" of the Sorcerer. The Sorcerer may cast this spell successfully only once per battle, and the rats disappear after the battle. They do not count towards the maximum size of the Skaven warband.",
      difficulty: "Auto",
      timing: ["1"]
    },
    {
      name: "Gnawdoom",
      description: "The target is attacked by rats and soon is covered from head to foot in small, bleeding wounds. The Gnawdoom causes 2D6 Strength 1 hits on a single model within 8\" of the caster.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Black Fury",
      description: "With a chittering incantation the Sorcerer turns into a monstrous rat-like creature, which attacks with an insane fury. The Sorcerer may immediately charge any enemy model within 12\" (ignoring any terrain and interposing models) and gains 2 extra Attacks and +1 Strength during this turn’s hand-to-hand combat phase only.",
      difficulty: 8,
      timing: ["4", "7"]
    },
    {
      name: "Eye of the Warp",
      description: "Gaze into the eye of the warp and despair! All standing models in base contact with the Sorcerer must take an immediate Leadership test. If they fail, they each suffer a Strength 3 hit and must run 2D6\" directly away from the Sorcerer, exactly as if they had lost their nerve when fighting against more than one opponent.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Sorcerer’s Curse",
      description: "The Sorcerer points a claw towards one of his enemies and curses him in the name of the Horned One. The spell has a range of 12\" and affects a single model within range. The target must re-roll any successful armour saves and to hit rolls during the Skaven hand-to-hand phase and his own next shooting and hand-to-hand combat phases.",
      difficulty: 6,
      timing: ["7", "8", "9"]
    }
  ],

  "Mortuary Cult Scrolls": [
    {
      name: "Menkare’s scroll of Urgency",
      description: "The Liche Priest reaches out to urge an Undead warrior forward. A single Skeleton Soldier within 6\" may immediately move again up to its maximum Movement distance, ie, 4\". If this takes the model into base contact with an enemy model, it counts as charging.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Horrebe’s Curse of the Mummy",
      description: "The Liche Priest amplifies the curse that all mummies bear, and focuses it against a single enemy model. The target must be in base-to-base contact with a Mummy and within 18\" of the Liche Priest. if the spell is cast successfully, the enemy model has a -1 penalty on all to hit and to wound rolls, and on all armour saves. This lasts until the stare of the next Tomb Guardian Shooting phase.",
      difficulty: 8,
      timing: ["7", "8", "9"]
    },
    {
      name: "Tawosret’s Scroll of Tomb Dust",
      description: "The Liche Priest can command the sand around him to assault a single warrior within 12\". The warrior is automatically knocked down as he chokes on the sand. This spell only affects a living model.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Neferre’s Scroll of Quaking Horror",
      description: "The Liche Priest selects a warrior within 12\" who is beset by terrible, haunting visions of his own death. The model must pass a Leadership test or flee 2D6\" directly away from the Liche Priest. The warrior will continue to flee in each Movement phase until he makes a successful Rally test in the Recovery phase. This spell has no effect on Undead models or models that are immune to psychology.",
      difficulty: 7,
      timing: ["5", "7"]
    },
    {
      name: "Merneptah’s Scroll of the Scarab Song",
      description: "With a short, rasping chant, the Liche Priest summons a swarm of scarabs, which burrow up through the ground, and all over an enemy warrior. A single model within 8\" of the Liche Priest suffers 2D6 Strength 1 hits. In addition, that model may not be shot at for the rest of the Tomb Guards Shooting phase, nor may he fight or be fought in hand-to-hand combat. If the model is already in hand-to-hand combat, move him 1\" away from the combat as he staggers about in agony. Unless he suffers an actual injury the warrior counts as having just stood up in the next turn.",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Djedre’s summonation of the Vengeful Dead",
      description: "The Liche Priest may re-animate a Skeleton Soldier that went out of action during the last turn. Place the model anywhere within 6\" of the Liche Priest, but not straight into hand-to-hand combat with an enemy model.",
      difficulty: 5,
      timing: ["7"]
    }
  ],

  "Necromancy (The Restless Dead)": [
    {
      name: "Spell of Awakening",
      description: "The Sorcerer summons calls the soul of a slain Hero back to his body and enslaves him with corrupt magic. If an enemy Hero is killed (i.e. your opponent rolls 11-15 on the serious injury chart after the battle), then the sorcerer may raise him to fight as a Zombie in his servitude. The dead Hero retains his characteristics and all his weapons and armour but may not use any equipment or skills. He may no longer run, counts as a Henchmen group on his own and does not gain additional experience.",
      difficulty: "Auto",
      timing: ["13"]
    },
    {
      name: "Lifestealer",
      description: "The Sorcerer sucks out the very essence of life from his victim, stealing its vigour for himself. Choose a single model within 6”. The target suffers a wound, (no saves allowed) and the sorcerer gains an extra wound for the duration of the battle. This may take the Wounds of a Necromancer above their original maximum value, but a Liche may only restore lost wounds. This spell will not affect the Possessed or any Undead models.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Reanimation",
      description: "At the spoken command of the Sorcerer, the dead rise to fight again. One Zombie that went out of action during the last hand to hand combat phase immediately returns to battle. Place the model within 6” of the sorcerer. The model cannot be placed straight into hand to hand combat with an enemy model. This spell can be used on Grave Guards and Wights to restore 1 lost wound (should they have more than one). This cannot be used to bring Scarecrows, Grave Guards, Wights and Skeletons back to life if they are taken out of action the way Zombies can.",
      difficulty: 5,
      timing: ["7"]
    },
    {
      name: "Spell of Doom",
      description: "The Sorcerer whispers to the sleeping dead to rise up from the ground and seize his enemies. Chose one enemy model within 12”. The model must immediately roll equal to or less than his Strength on a D6 or the dead emerging from the earth will rend him with supernatural power. If he fails, you may roll on the Injury table to see what happens to the unfortunate warrior.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Call of Vanhel",
      description: "The Sorcerer summons the world of the dead to invigorate his Undead servants. A single Zombie, Skeleton, Wight or Grave Guard within 6” of the caster may immediately move again up to its maximum movement distance. If this moves them into base contact with an enemy model then it counts as charging. The targeted Zombie, Skeleton, Wight or Grave Guard will automatically pass Initiative tests needed to be made during this extra movement.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Deathly Visage",
      description: "The Sorcerer calls upon the power of Necromancy to reveal the moment of his enemies’ death. The Necromancer causes fear in his enemies for the duration of the battle and is likewise immune to fear. This spell is the one exception to the Apprentice rule that Necromancers must usually follow when in a Liche warband. A Necromancer may choose this spell if the Liche has the spell Horror.",
      difficulty: 6,
      timing: ["5", "7", "9"]
    },
    {
      name: "Living Horror",
      description: "The ghostlights around the Liche intensify as he torments the mind of his enemy forcing him to experience the sensation during the very moment of his death over and over. You may choose one model within 8” of the Liche and roll D6+3. If this score is equal to or greater than the Leadership of the target model, then that model suffers a Wound, no armour saves allowed. If this wounds the target and they still have Wounds remaining, then that target may not move, shoot or cast spells during their next turn unless they pass a Leadership test. This spell will not affect the Possessed, Undead, or any model that is immune to fear.",
      difficulty: 8,
      timing: ["5", "7", "8"]
    }
  ],

  "Necromancy": [
    {
      name: "Lifestealer",
      description: "The Necromancer sucks out the very essence of life from his victim, stealing its vigour for himself. You may choose a single model within 6\". The target suffers a wound (no save allowed) and the Necromancer gains an extra wound for the duration of the battle. This may take the Necromancer’s Wounds above his original maximum value. This spell will not affect the Possessed or any Undead models.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Re-Animation",
      description: "At the spoken command of the Necromancer, the dead rise to fight again. One Zombie that went out of action during the last hand-to-hand combat or Shooting phase immediately returns to the battle. Place the model within 6\" of the Necromancer. The model cannot be placed straight into hand-to-hand combat with an enemy model.",
      difficulty: 5,
      timing: ["7"]
    },
    {
      name: "Death vision",
      description: "The Necromancer calls on the power of Necromancy to reveal the moment of his enemies’ death. The Necromancer causes fear in his enemies for the duration of the battle.",
      difficulty: 6,
      timing: ["5", "7", "9"]
    },
    {
      name: "Spell of Doom",
      description: "The Necromancer whispers to the sleeping dead to rise up from the ground and seize his enemies. Choose one enemy model within 12\". The model must immediately roll equal to or less than his Strength on a D6 or the dead emerging from the earth will rend him with supernatural power. If he fails, you may roll on the Injury table to see what happens to the unfortunate warrior.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Call of Vanhel",
      description: "The Necromancer summons the world of the dead to invigorate his Undead servants. A single Zombie or Dire Wolf within 6\" of the Necromancer may immediately move again up to its maximum Movement distance (ie, 9\" in the case of Dire Wolves). If this moves them into base contact with an enemy model, they count as charging.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Spell of Awakening",
      description: "The Necromancer calls the soul of a slain Hero back to his body and enslaves him with corrupt magic. If an enemy Hero is killed (ie, your opponent rolls 11-15 on the Serious Injury chart after the battle) then the Necromancer may raise him to fight as a Zombie in his servitude. The dead Hero retains his characteristics and all his weapons and armour but may not use any other equipment or skills. He may no longer run, counts as a Henchman group on his own, and may not gain additional experience. This spell always succeeds (rules for Henchmen and experience are described later). The new Zombie follows all the normal Zombie rules (immune to poison, causes fear) except for retaining his profile, weapons and armour.",
      difficulty: "Auto",
      timing: ["13"]
    }
  ],

  "Norse Runes": [
    {
      name: "Howl of the North",
      description: "Icy winds sweep before the Shaman knocking missiles from their path. The Shaman is immune to all missile fire. Roll a dice during the Shaman’s recovery phase. On a roll of 1 or 2 the winds dissipate.",
      difficulty: 9,
      timing: ["1", "7", "8"]
    },
    {
      name: "Angvar’s Fury",
      description: "The Shaman’s howls rouses the anger of the warriors around him to a fever pitch. All warriors within 8\" of the Shaman gain a +1 to hit in hand-to-hand combat against the opposing warband. The spell lasts till the start of the Norse players next turn.",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Elvek’s Cold Spear",
      description: "A razor sharp icicle flies at the Shaman’s foe. The icicle has a range of 18\" and causes one S4 hit. It strikes the first model in its path. Normal armour saves apply.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Gift of the Fates",
      description: "The Shaman calls on the three Wyrd Sisters of Norse legend for a glimpse of the future. The Shaman may adjust one die roll by +1/–1 between a successful casting of this rune and his next recovery phase. A ‘to wound’ roll adjusted to or from 6 will not cause a critical.",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Kiss of Frost",
      description: "The Shaman covers ground of his choosing with slick ice. A single model within 12\" of the Shaman must pass an Initiative test or be knocked down.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Bear’s Might",
      description: "The Shaman calls upon the spirits of the great Ice Bears of the North to aid him. The Shaman gains +1 Attack, +2 Strength, +2 Toughness and loses -2 Initiative (to a minimum of 1). Take a Leadership test at the beginning of each turn (both yours and your opponent’s). If the test fails, Bear’s Might drains away. Bear’s Might can only be cast successfully once per game.",
      difficulty: 9,
      timing: ["1", "7", "9"]
    }
  ],

  "Nurgle Rituals": [
    {
      name: "Daemonic Vigour",
      description: "The Master imbues his Daemonic minions with supernatural power. Any Plague Bearers or Nurglings within 8\" of the Master increase their Daemonic Aura save from 5+ to 4+ until the beginning of their next turn.",
      difficulty: 8,
      timing: ["7", "8", "9"]
    },
    {
      name: "Buboes",
      description: "The Master bestows the gift of pus-filled buboes upon his enemies. This spell has a range of 8\" and affects a single enemy warrior. The warrior must pass a Toughness test or lose a Wound. No Armour saves are allowed.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Stench of Nurgle",
      description: "The Master spews forth a foul, stinking mist that chokes his foes. This spell has a range of 6\" and affects all living creatures – friend or foe. Each enemy warrior in range must pass a Toughness test or lose an Attack until their next turn.",
      difficulty: 8,
      timing: ["7", "9"]
    },
    {
      name: "Pestilence",
      description: "The Master inflicts horrible diseases upon the unbelievers. All enemy models within 12\" of the Master suffer a Strength 3 hit. No Armour saves are allowed.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Scabrous Hide",
      description: "The Master’s skin becomes tough and leathery like that of his patron god. The Master has an armour save of 2+ which replaces any normal Armour save. The Scabrous Hide lasts until the beginning of his next Shooting phase.",
      difficulty: 8,
      timing: ["7", "8", "9"]
    },
    {
      name: "Nurgle’s Rot",
      description: "The Master bestows the blessing of the Plague God upon his foe. All enemy models in base contact with the Master must immediately test against their Toughness or contract Nurgle’s Rot.",
      difficulty: 9,
      timing: ["7"]
    }
  ],

  "Onogal Rituals": [
    {
      name: "Touch of Onogal",
      description: "The Seer’s body is covered with smallpox and blisters. His touch can transmit devastating diseases. This spell can be used against one of the Seer’s close combat opponents. If he takes the model out of action in the following hand-to-hand combat phase, that player rolls for Serious Injuries immediately. If the model dies permanently, replace it with a Nurgle Plague Bearer (see Bestiary for rules) for the rest of the game under the Seer’s control. If the Seer is stunned or taken out of action the Plague Bearer disappears into the Realm of Chaos. Note that only one Plague Bearer can be created at a time.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Buboes",
      description: "The Master bestows the gift of pus-filled buboes upon his enemies. This spell has a range of 8\" and affects a single enemy warrior. The warrior must pass a Toughness test or lose a Wound. No Armour saves are allowed.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Stench of Nurgle",
      description: "The Master spews forth a foul, stinking mist that chokes his foes. This spell has a range of 6\" and affects all living creatures – friend or foe. Each enemy warrior in range must pass a Toughness test or lose an Attack until their next turn.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Pestilence",
      description: "The Master inflicts horrible diseases upon the unbelievers. All enemy models within 12\" of the Master suffer a Strength 3 hit. No Armour saves are allowed.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Scabrous Hide",
      description: "The Master’s skin becomes tough and leathery like that of his patron god. The Master has an armour save of 2+ which replaces any normal Armour save. The Scabrous Hide lasts until the beginning of his next Shooting phase.",
      difficulty: 8,
      timing: ["7", "8", "9"]
    },
    {
      name: "Nurgle’s Rot",
      description: "The Master bestows the blessing of the Plague God upon his foe. All enemy models in base contact with the Master must immediately test against their Toughness or contract Nurgle’s Rot (see Nurgle’s Rot).",
      difficulty: 9,
      timing: ["7"]
    }
  ],

  "Prayers of Sigmar": [
    {
      name: "The Hammer of Sigmar",
      description: "This weapon of the faithful glows with a golden light, imbued as it is with the righteous power of Sigmar. The wielder gains +2 Strength in hand-to-hand combat and all hits he inflicts cause double damage (eg, 2 wounds instead of 1). The Priest must test each shooting phase he wants to use the Hammer.",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Hearts of Steel",
      description: "As the three words of power are spoken, waves of glory surround the servant of Sigmar. The faithful are heartened by the warrior god’s presence. Any allied warriors within 8\" of the warrior become immune to fear and all alone tests. In addition, the whole warband gains +1 to any Rout tests they have to make. The effects of this spell last until the caster is knocked down, stunned or put out of action. If cast again the effects are not cumulative, ie, the maximum bonus to Rout tests remains +1.",
      difficulty: 8,
      timing: ["2", "4", "7", "9"]
    },
    {
      name: "Soulfire",
      description: "The wrath of Sigmar comes to earth. Purifying flames surround the Priest and wipe out those who resist the righteous fury of the God-Emperor! All enemy models within 4\" of the servant of Sigmar suffer a Strength 3 hit. No armour saves are allowed. The servants of darkness and Chaos are especially susceptible to Sigmar’s holy power. Undead and Possessed models in range suffer a Strength 5 hit instead.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Shield of Faith",
      description: "A shield of pure white light appears in front of the Priest. As long as his faith remains strong the shield will protect him. The Priest is immune to all spells. Roll at the beginning of each turn in the recovery phase. On a roll of 1 or 2 the shield disappears.",
      difficulty: 6,
      timing: ["7", "8"]
    },
    {
      name: "Healing Hand",
      description: "Laying hands upon a wounded comrade, the servant of Sigmar calls upon his Lord to heal the warrior’s wounds. Any one model within 2\" of the Priest (including himself) may be healed. The warrior is restored to his full quota of Wounds. In addition, if any friendly models within 2\" are stunned or knocked down, they immediately come to their senses, stand up, and continue fighting as normal.",
      difficulty: 5,
      timing: ["7"]
    },
    {
      name: "Armour of Righteousness",
      description: "Impenetrable armour covers the Priest and the fiery image of a twin-tailed comet burns above his head. The Priest has an armour save of 2+ which replaces his normal armour save. In addition, he causes fear in his enemies and is therefore immune to fear himself. The power of the Armour of Righteousness lasts until the beginning of the Priest’s next Shooting phase.",
      difficulty: 9,
      timing: ["7", "3", "9"]
    }
  ],

  "Prayers of Taal": [
    {
      name: "Stag’s Leap",
      description: "The Priest of Taal may immediately move anywhere within 9\" including into base contact with the enemy, in which case he counts as charging and gains a +1 Strength to his first round of attacks. If he engages a fleeing enemy, in the close combat phase he will score one automatic hit at +1 Strength and then his opponent will flee again (if he survives).",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Blessed Ale",
      description: "Drinking a flask of Taal-blessed ale (the priest is assumed to carry as many flasks as are needed) may heal any one model within 2\" of the Priest (including himself). The warrior is restored to his full quota of Wounds. In addition, any living enemy models (not Undead or Possessed) within 2\" of the Priest will lose 1 Attack during the next round of combat due to the potent fumes of the ale.",
      difficulty: 5,
      timing: ["7"]
    },
    {
      name: "Bear’s Paw",
      description: "The Priest invokes the blessing of Taal on himself or a single friendly model within 6\". The target receives a bonus of +2 to his Strength until the Priest’s next turn.",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Earthshudder",
      description: "The spell is cast on a single building within 4\". Any enemy models touching the building will suffer a single S3 hit. In addition the building will collapse and any models on it will count as having fallen to the ground (for example a model falling 5\" to the tabletop must pass two Initiative tests to avoid taking D3 S5 hits.) Remove the terrain feature from the board for the rest of the game.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Tanglefoot",
      description: "Plants, vines and even small trees burst forth from the earth, hindering all those who attempt to move through them. All models (friend as well as foe) with the exception of Ostlander Jaeger, and friendly Horned Hunter Zealots within 12\" of the Priest can only move at 1/2 speed until the next shooting phase.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Summon Squirrels",
      description: "With this spell the Priest invokes the wrath of the Lord of Beasts, summoning forth dozens upon dozens of enraged squirrels. The furious rodents assault one enemy within 12\" of the Priest, crawling inside the warrior’s clothing and armour, pelting him with nuts and causing numerous tiny bites and welts. The target suffers 2D6 Strength 1 hits. No armour saves allowed.",
      difficulty: 7,
      timing: ["7"]
    }
  ],

  "Prayers of Ulric": [
    {
      name: "Snow Squall",
      description: "Ulric extends his protection to the Wolf Priest in the form of a localised snow squall that engulfs the model. All enemy models in Hand-to-Hand combat with the priest are at -1 to hit due to the swirling snow and winds. The spell lasts for the duration of the Hand-to-Hand combat.",
      difficulty: 6,
      timing: ["7", "9"]
    },
    {
      name: "Hammerschlag",
      description: "The Wolf Priest calls down a hammer blow from Ulric on any model within 6\". That model suffers a S4 attack from an enormous ethereal hammer, including the concussion special rule.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Bloodlust",
      description: "The Wolf Priest is infused with a lust for battle and attacks wildly. All attacks are at S + 2, and he scores a critical hit on a 5-6. The Wolf Priest must test, by rolling the prayer's difficulty or greater on 2d6, each turn to see if the prayer remains in effect.",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Wolf’s Hunger",
      description: "One member of the warband (priest's choice) is thrown into a Frenzy.",
      difficulty: 7,
      timing: ["4", "7", "9"]
    },
    {
      name: "Ulric’s Howl",
      description: "The Wolf Priest's prayer is answered as an ear-shattering inhuman howl roars from his throat. For the duration of the battle, all memebers of the priest's warband are immune to Fear and all alone tests as they feel the presence of their god. Additionally, all Rout tests are at +1.",
      difficulty: 10,
      timing: ["1", "3", "7", "9"]
    },
    {
      name: "Call of Ulric",
      description: "The Wolf Priest lets out a cry of agony as his body re-shapes itself into that of a huge, slavering wolf with the following profile (reference book) . During the time that the priest is in the form of a wolf, he may do nothing but attack as a wolf: no spell-casting or weapons use. He still hates Sigmar's minions, however. In each shooting phase, the priest may choose to make a Leadership test (using the Wolfs Ld 6) to regain his human form. If he is still in wolf form at the end of the battle, he gets one last chance to return to human form. If he does not, then he remains a wolf forever! He is still a hero, and thus entitled to XP gains and attribute increases. He may only choose skills from the Speed Table, with the exception of Scale Sheer Surfaces.",
      difficulty: 10,
      timing: ["7"]
    }
  ],

  "Rituals of Hashut": [
    {
      name: "Sacrificial Ritual",
      description: "The Chaos Dwarf Sorcerer must be in contact with an Engine of Chaos in order to successfully cast this spell. As the ritual requires the sacrifice of a mortal, remove one captive model from the Engine of Chaos and its starting warband’s roster. The Sorcerer may sacrifice additional captives to lower the spell's difficulty by –1 per sacrifice. These models must be sacrificed before rolling for Difficulty. The Chaos Dwarf Sorcerer gains +D3 Experience.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Spirit of Hashut",
      description: "The player draws a line 18” from the Sorcerer. All models crossed by the line, suffer one S4 hit.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Bellow of Doom",
      description: "All models engaged in base contact with the sorcerer must make an immediate Ld test or break from combat and run.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Fumes of Azgorh",
      description: "The spell has a range of 8’’, hitting all models in its path on a D6 score of 4+. Any model hit suffers a S4 hit, roll to wound as normal. No armour saves allowed.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Flickering Hide",
      description: "The Sorcerer may cast this spell upon himself or any one model within 6”. The flaming hide will negate any one wound suffered on a D6 roll of 4+. In hand-to-hand combat, any model which hits the flaming hide will suffer one S3 hit for each hit scored. The Flaming Hide lasts until the beginning of the Sorcerer’s next shooting phase.",
      difficulty: 10,
      timing: ["7", "9"]
    },
    {
      name: "Lava Flow",
      description: "The Sorcerer may move 12” in any direction, even into combat, counting as a charge. However, due to the nature of this spell the Sorcerer may only reappear on or below the ground.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Earthquake",
      description: "All models within 3” of the Sorcerer, friend or foe alike, must roll equal to or under their Initiative or suffer D3 S4 hits.",
      difficulty: 9,
      timing: ["7"]
    }
  ],

  "Shadow Warrior Magic": [
    {
      name: "Pool of Shadow",
      description: "This spell allows the mage and all within 6\" to Hide, exactly as if there were a wall or other obstruction between them and their enemies. They may Hide even after marching. This Hiding is disrupted if any enemy enters the area of affect. In addition, all affected count as being in cover against enemy shooting. This spell lasts until the start of the Shadow Weaver’s next turn.",
      difficulty: 7,
      timing: ["5", "7"]
    },
    {
      name: "The Living Shadows",
      description: "The Shadow Weaver may cast this spell at any enemy model within 12\" of him and within 2\" of a wall. The target suffers a single Strength 4 hit with no armour saves.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Wings of Night",
      description: "This spell may only be cast if the Shadow Weaver is within 2\" of a wall. He is instantly moved up to 12\" to a place that is also within 2\" of a wall. If moved into contact with an enemy model, the Shadow Weaver counts as charging in the first round.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Cloak of Darkness",
      description: "The Shadow Weaver is effectively concealed from enemy sight. As long as he does not attack (cast spells, shoot, or engage in close combat) any enemy models, he may not be attacked. He may intercept as normal if the player controlling him wishes, but he does not have to do so (and if he does not, enemy warriors may charge past him of course). The spell lasts until the Shadow Weaver attacks an enemy model. Note that a model engaged in close combat with an enemy warrior may never choose to not attack.",
      difficulty: 7,
      timing: ["5", "7"]
    },
    {
      name: "Shadowbind",
      description: "The Shadow Weaver may cast this spell at any enemy model within 24\" of him and 2\" of a wall. The target may not move unless it first passes a Strength test on 2D6 at the start of his turn (before the Recovery Phase). This spell lasts until the Shadow Weaver suffers a Wound or attempts to cast another spell. If attacked while affected by this spell, treat the target exactly as if he were Stunned.",
      difficulty: 9,
      timing: ["2", "7"]
    },
    {
      name: "Shield of Shadow",
      description: "The Shadow Weaver may cast this spell on himself or a member of his warband within 12\". The target receives an armour save of 5+ that is not modified by the attacker’s Strength. The spell lasts until the start of the Shadow Weaver’s next turn.",
      difficulty: 7,
      timing: ["7", "8", "9"]
    }
  ],

  "Shornaal Rituals": [
    {
      name: "Delicious Suffering",
      description: "All models (friend and foe, except for the Seer) within 3” must pass a Ld test or are knocked down.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Dance of the Serpent",
      description: "All enemy models that are not immune to psychology suffer a –1 ‘to hit’ against him in close combat. The Dance lasts until the beginning of the Seer’s next shooting phase.",
      difficulty: 8,
      timing: ["7", "9"]
    },
    {
      name: "Endless Torment",
      description: "Choose one enemy model within 8”. From now on the model must roll for injury –1 after it’s Recovery phase. For the duration of the Torment the Seer can do nothing else but end the spell at the beginning of his turn and if attacked in close combat, he is hit automatically and the spell breaks.",
      difficulty: 9,
      timing: ["1", "7"]
    },
    {
      name: "Mystify",
      description: "Target enemy model within 8\" will have their Initiative value reduced to 1 and will always strike last in close combat, even if they charge an opponent or are armed with a spear or pike and are charged themselves. This spell lasts until the target passes a Ld test during the recovery phase.",
      difficulty: 8,
      timing: ["7", "9"]
    },
    {
      name: "A Thousand Voices",
      description: "Choose one enemy model within 12”. For the duration of the spell the model reduces it’s Ld by D3 +1 (to a minimum of 2) if it is not immune to psychology. The model must pass a Ld test at the beginning of it’s turn to end the spell. The spell breaks also when the Seer loses a wound. A thousand Voices can only enchant one model at a time.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Shornaal’s Temptation",
      description: "Choose one enemy model within 8” that is not immune to psychology. The model must pass a Ld test. If the model fails, then the Seer gains control over the model. The player may attempt to regain control at the beginning of his turn by passing a Ld test. Shornaal's Temptation can only enchant one model at a time. If the Seer is hit whether by a missile or in close combat he must pass a Ld test or the spell ends.",
      difficulty: 7,
      timing: ["7"]
    }
  ],

  "Spells of the Djed’hi": [
    {
      name: "Divination of Shirath",
      description: "The Mage may re-roll all his failed dice rolls, though the second result stands. The effect lasts until the beginning of the Mage’s next turn.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Shimmering Shield",
      description: "This spell acts as a shield to protect the Mage. It gives him an additional unmodified 5+ save against all attacks. The effect lasts until the beginning of the Mage’s next turn.",
      difficulty: 7,
      timing: ["7", "8", "9"]
    },
    {
      name: "Statue of Light",
      description: "The Mage chooses a single enemy model he can see. That model may not move as long as the Mage remains both static and alive. The Mage and the target may cast spells normally, but fight in close combat at -2 WS (minimum of 1).",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Fleeting Shadows",
      description: "The first time the Mage is hit in close combat or shooting, the spell protects him and the hit is ignored. Move the Mage 2\" from his current position in a random direction (but not off a cliff, etc). This is where he really was all along. The spell remains in play until it saves the Mage from a hit, whereupon it is dispelled. It may not be cast again whilst it is in play.",
      difficulty: 8,
      timing: ["7", "8", "9"]
    },
    {
      name: "Hunter’s Fury",
      description: "The spell summons D3+1 arrows which the Mage can use to shoot against one enemy model following the rules for normal shooting. The arrows have a range of 36\". Use the Mage’s own Ballistic Skill to determine whether he hits or not, but ignore movement, range and cover penalties. Each arrow causes one S3 hit.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Silent Guardian",
      description: "This spell acts as an invisible guardian that will defend the Mage. If the Mage is attacked in close combat then the guardian will fight first with WS5, S3. The guardian will make 1 attack per turn against each enemy that attacks the Mage. The guardian will not leave the Mage’s side, and will only fight if the Mage himself is being attacked. The Guardian cannot be attacked in return and will only be dispelled if the Mage casts another spell or dies.",
      difficulty: 9,
      timing: ["7", "9"]
    }
  ],

  "Tchar Rituals": [
    {
      name: "Tchar’s Blessing",
      description: "This spell must be used before the game and may only be used once. The Seer may not cast spells in the following battle. After the game he gains D3 Experience points if he wasn’t taken out of action.",
      difficulty: "Auto",
      timing: ["1"]
    },
    {
      name: "Dispel Magic",
      description: "The Seer ends all effects of currently active spells.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Foresight",
      description: "This spell must be used before the game and may only be used once. Choose a warband. One randomly determined Hero of that warband must miss the following game. Models that are capable of casting spells or prayers are immune to this effect.",
      difficulty: 10,
      timing: ["1"]
    },
    {
      name: "Wrath of the Great Eagle",
      description: "Choose one enemy model within 12”. The model is hit with a Strength equal to the difference of the Seer’s Experience points and the model’s Experience (to a maximum of 10). Armour saves are taken as normal. If the victim has more Experience points than the Seer, the latter is hit instead.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Tchar’s Reward",
      description: "The Seer gets +1 on any one stat per 10 Experience points he has. Each stat may be increased only once through this spell. The power of Tchar’s Reward lasts until the end of the Seer’s next shooting phase and can be re-cast in that phase.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Slave to Chaos",
      description: "This spell has a range of 12” and causes one Strength 2 hit with no armour save. If the model is taken out of action roll for Serious Injuries immediately. If they die replace the killed warrior with a Horror of Tzeentch (see Bestiary for rules) until the end of the game. If the Seer is stunned or taken out of action the Horror disappears into the Realm of Chaos.",
      difficulty: 9,
      timing: ["7"]
    }
  ],

  "Waaaagh! Magic": [
    {
      name: "Led’z go",
      description: "Any Orc or Goblin within 4\" of the Shaman will automatically strike first in hand-to-hand combat regardless of other circumstances. The spell only lasts until the caster is knocked down, stunned or taken out of action.",
      difficulty: 9,
      timing: ["7", "9"]
    },
    {
      name: "Oi! Gerroff!",
      description: "Range 8\". Moves any enemy model within range D6\" directly away from the Shaman. If the target collides with another model or a building, both suffer 1 S3 hit. Note: Very handy for dropping people from high buildings with. May not be cast on models in hand-to-hand combat.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Zzap!",
      description: "Range 12\". Causes D3 S4 hits on the closest enemy target, with no armour saves allowed.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Fooled Ya!",
      description: "No enemy may charge the Shaman during their next turn. If the Shaman is engaged in hand-to-hand combat he may immediately move 4\" away.",
      difficulty: 6,
      timing: ["5", "7"]
    },
    {
      name: "Clubba",
      description: "The ectoplasmic club counts as a normal club with +2 Strength bonus and gives the Shaman +1 attack as well. This spell lasts until the Shaman suffers a wound.",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Fire of Gork",
      description: "Range 12\". Each of the two bolts causes D3 S3 hits; the bolts can either be fired both at the closest enemy target or split between the two closest enemy targets.",
      difficulty: 8,
      timing: ["7"]
    }
  ],
  "Blessings of the Mare": [
    {
      name: "Unnerving gaze",
      description: "The Dame of the Mare, with her daunting gaze, petrifies her adversaries and renders them hesitant to act against her. All attacks targeting the Dame in hand-to-hand combat are at -1 to hit. Furthermore, all enemy models that are in base contact with the Dame must strike last, no matter their target. The effects of the spell lasts until the beginning of the Order of the Mare player’s next Shooting phase.",
      difficulty: 7,
      timing: ["9"]
    },
    {
      name: "Phantom hoof",
      description: "The Dame channels a spectral force to deliver a distant and impactful strike, akin to a horse's kick. Target any enemy warrior within 6” of the Dame, that model suffers a Strength 5 hit with the concussion special rule.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Dame’s inspiration",
      description: "Infused with equine fervour, the Dame enhances her striking power and agility, allowing a relentless onslaught in the heat of battle. The Dame’s attacks in combat gain +1 to hit and +1 to their Strength. The Dame must test, by rolling the prayer’s difficulty or greater on 2D6, at the start of each of her turns to see if the effect remains in play.",
      difficulty: 7,
      timing: ["9"]
    },
    {
      name: "Thirst for valour",
      description: "The Dame ignites one of her allies (it can’t be herself) within 12” with inspiration and an insatiable thirst for glory and honour in the name of the Prophetess of the Mare. The target warrior is now frenzied. Only one warrior can be affected by this spell at a time, if the Dame chooses a new warrior the former target loses their frenzy.",
      difficulty: 8,
      timing: ["4", "9"]
    },
    {
      name: "Aura of dauntlessness",
      description: "The Dame says a prayer to bestow unwavering courage upon her entire retinue, empowering them to face adversity with resolute bravery and unyielding determination on the battlefield. For the duration of the battle, the save provided by Dame’s and friendly Companion fillies’ special armour save is increased by 1. The rest of the warband gains a special unmodifiable 6+ save against all non-magical attacks, this save is in addition to (and taken after) any other saves they may have.",
      difficulty: 10,
      timing: ["8", "9"]
    },
    {
      name: "The Dame’s charger",
      description: "Eerie lights engulf the Dame who suddenly sits upon a spectral steed from ancient history: this counts as her becoming mounted on a warhorse with a modified statline. It will remain in play until the end of the game or until the Dame is dismounted. The Spectral charger offers no armour save like other mounts, but increases the special save from the Dame’s own armour by 1. In addition, the Spectral charger is such a ghastly apparition that it and its rider cause fear. M:8 WS:4 BS:0 S:4 T:4 W:1 I:4 A:2 LD:7",
      difficulty: 8,
      timing: ["3", "9"]
    },

  ],
  "Snotling Waaagh!": [
    {
      name: "Morks’ Blessing",
      description: "The warrior targeted by this spell has become Blessed by the Greenskin God Mork, who gets quite irate when anyone inflicts harm on the Little Fellow. Morks' Blessing can be used to target any friendly greenskin hero on the board regardless of line of sight to the caster or not. In any game that the Hero is put Out of Action, roll a D6. On a roll of 4+, the inflictor of the damage suffers an automatic wound with no saving throw allowed. Once cast, the blessing remains active till the end of the game or the blessed hero is put out of action. It may be recast, but once successfully recast, the original blessing fades (if the original Blessed model is still on the board). It may be cast on the shaman himself.",
      difficulty: 6,
      timing: ["9"]
    },
    {
      name: "We Can Fly!",
      description: "The Shaman draws upon the might of the Waaagh! energy in the air to propel himself and a group of Snotlings nearby, towards the enemy. The Shaman and the closest 1D6 Friendly models within 6 inches are immediately moved 12 inches towards the closest enemy model. If they contact the enemy, they count as Charging in the close combat phase.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Foot of Gork!",
      description: "The great Greenskin God Gork sees that the Snotlings are engaging a far superior force then themselves and decides that he’ll give them a little bit of help as a reward for being so audacious. Randomly select an enemy model on the board. That model, and any other model (friend or foe) within 3 inches are automatically crushed under a giant green foot that descends from the heavens. Each model in range suffers D3 hits wounding enemies on a 3+ and snotling warband members on a 5+. All hits are at a -3 save modifier.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Pebbles of Doom",
      description: "Any friendly Hero within 6\" gains D6 magical pebbles blessed by Gork. These may be thrown or shot from a slingshot, and count as having +1 to hit and +1 Strength from the respective weapon. These pebbles last until they are each used up, until the hero is taken out of action, until the end of the game, or until the spell is successfully recast. If the spell is successfully recast, any existing Pebbles of Doom created by your shaman that are already on the board dissipate.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Pointy Stick of Death",
      description: "The Shaman is blessed with the Pointy Stick of Death. It grants the Shaman +2 WS, +1 Strength, and the Shaman strikes first in every round of combat (even when charged). The Shaman must make a Difficulty test at the start of each Recovery Phase if he wants to maintain the Pointy Stick of Death.",
      difficulty: 7,
      timing: ["2", "9"]
    },
    {
      name: "Blessing of the Shrimp",
      description: "Target Hero within 6” gains +1WS, +1T and +1 Leadership. If used on your Leader, all models within 12” may test off his Leadership. If not used on your Leader, all models within 6” may test off its Leadership as if he was an additional Leader. The Blessing will fade after 1D3 Rounds (thus, a blessing that lasts 1 Round would wear off at the beginning of your next Recovery Phase.) Only one friendly model may have the Blessing of the Shrimp at any given time, and if recast before it fades, the new model gains the bonus while the old one loses it.",
      difficulty: 6,
      timing: ["2", "9"]
    },

  ],

  "Elemental Lore of Water": [
    {
      name: "Geyser",
      description: "The spell has a range of 10 inches and cannot target elevated targets. The unit suffers a S4 hit and is blown 2 inches in a random direction. Should the model collide with something, both will suffer an additional S2 hit.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Portent of Amul",
      description: "This spell affects all of the wizard’s friendly units. During this and their opponents’ Close Combat phase, any 1’s that are cast may be re-rolled. Re-rolled scores of 1 must stand, as you may never re-roll a re-roll.",
      difficulty: 6,
      timing: ["9"]
    },
    {
      name: "Premonition",
      description: "As long as the wizard stands, the warband will gain +1 to its Leadership and the ability to re-roll any failed Rout Tests. The wizard has foretold of their victory, and they are not easily swayed from his Premonition.",
      difficulty: 8,
      timing: ["2"]
    },
    {
      name: "Frostbolts",
      description: "Frostbolts is a magic missile with a range of 16 inches. If successfully cast, a squall of frozen missiles hit the target and causes D3 S3 hits.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Blindness of the Depths",
      description: "This spell has a range of 12 inches. The target may make an immediate Initiative test. If passed, the spell has no effect. If the test is failed, the model is Blind and may not fight or shoot any missile weapons, nor cast any spells. Furthermore, the model may not be charged or targeted for ranged fire or spells, as it is completely engulfed in shadow. The model may make an Initiative test during each of its own Recovery Phases. Once passed, the spell fades.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Lifespring",
      description: "Any one friendly model within 4 inches of the wizard instantly regains a wound, and recovers from being Knocked Down or Stunned and may act as normal this turn.",
      difficulty: 8,
      timing: ["7"]
    }
  ],

  "Elemental Lore of Fire": [
    {
      name: "Jorun’s Blast of Brimstone",
      description: "The results are, to say the least, explosive. Range of the spell equals the caster’s Strength plus 1D6 inches. The caster then throws the small sulfurous rock at any model he has Line of Sight to within that range, and it explodes upon impact. The rock does a S3 hit to that model, and any others within 1.5 inches from it.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Tazoul’s Burning Skull",
      description: "The Wizard known as Tazoul never heeded such warnings. The flaming skull has a range of 8 inches and causes one S5 hit. On a roll of 5+ it will hit the nearest enemy model with a S3 hit. On a further roll of 4+ it will hit the next nearest enemy model with a S2 hit. The spell may not target the same model during one casting.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Hades Heat",
      description: "Place a small Blast Template (3 inches) anywhere within 8 inches of the caster. Models that are under or partially under the template suffer -1WS and -1S due to the exhaustion the intense heat causes until the caster’s next turn.",
      difficulty: 6,
      timing: ["9"]
    },
    {
      name: "Shield of Flame",
      description: "The Shield of Flame hovers between the wizard and his foes. He is free to use his weapons normally as the Shield of Flame moves in conjunction with the Wizard’s attacks. The shield grants the Wizard an Armour Save of 4+ in Close Combat and 5+ to ranged attacks. These do not stack and are unmodifiable.",
      difficulty: 8,
      timing: ["8", "9"]
    },
    {
      name: "U’Zhuls Inferno",
      description: "The pillar of flame has a range of 12 inches and is 1 inch wide. It hits all models in its path with a S2 hit. The target of the spell suffers the brunt of the attack, receiving a S4 hit. All hits have a -1 AS modifier.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Flesh of the Forge",
      description: "The Wizard’s skin becomes hot, smoldering with the heat of a thousand coals. All hits against the wizard in Close Combat are at -1 to hit. Roll a D6 during the Wizard’s Recovery phase. On a roll of 1–2, his flesh reverts to its natural form.",
      difficulty: 6,
      timing: ["9"]
    }
  ],

  "Elemental Lore of Earth": [
    {
      name: "Flesh of Clay",
      description: "The wizard doubles his Toughness, but halves his Movement and Initiative. The spell remains in effect until the caster is Knocked Down, Stunned or taken Out of Action.",
      difficulty: 8,
      timing: ["4", "8", "9"]
    },
    {
      name: "Healing Might",
      description: "All models within 4 inches of the wizard rise from the ground, shrugging off the effects of being Knocked Down or Stunned. Furthermore, any units within 2 inches of the wizard have all of their wounds restored.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Curse of Thorns",
      description: "The target of the spell must be within 18 inches. The model must pass a Toughness test or be wracked with unimaginable pain. The model will remain immobile and will only defend himself if attacked. A Toughness test must be passed before the spell will fade.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Jozun’s Decay",
      description: "This spell has a range of 12 inches. Upon a successful casting, the target must pass a Leadership Test or suffer a one point reduction to its Toughness attribute. Each Recovery phase the model must attempt to pass a Leadership test, reducing its Toughness a further point for each failure. Should a model be reduced to 0 Toughness, it is removed from the game irrespective of how many wounds it has left. Should a Leadership test be passed, the model must play the remainder of the game at its modified Toughness score. A model may not be targeted by Eternal Rot more than once per game.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "The Hunter’s Spear",
      description: "The wizard’s weapon takes on an amber-hue and transmutes into a hunting spear. It grants the caster an additional two points to his Strength, and grants him an additional attack. The caster must make a Leadership test during his Recovery phases. The spear fades away if the test is failed.",
      difficulty: 8,
      timing: ["9"]
    },
    {
      name: "Shifting Sands",
      description: "This spell may be cast on any enemy model within sight of the wizard. The model in question must make a successful Initiative test or be treated as Knocked Down until its next Recovery phase, where it has another chance to pass an Initiative test. Any friendly models within 1 inch of the trapped model reduce the difficulty of the Initiative test by 1, to a minimum of 1.",
      difficulty: 8,
      timing: ["2"]
    }
  ],

  "Elemental Lore of Air": [
    {
      name: "Winter’s Gale",
      description: "Place the large blast template (5 inches) over a location within 12 inches of the caster. Any model covered or partially covered will suffer a S4 hit. Undead and Possessed models do not suffer as mortals do from the cold, and thus only suffer a S2 hit instead.",
      difficulty: 10,
      timing: ["7"]
    },
    {
      name: "Crow’s Feast",
      description: "Crow’s Feast is a magic missile spell, with a range of 24 inches. If successfully cast, the spell causes D6 S3 hits.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Dust Dervish",
      description: "The spell summons D3 Dust Dervishes, who attack a model each who are within 12 inches of the caster. No other targeting restrictions apply, so even a model that is hidden may be sought out by the air elementals. Each Dust Dervish delivers a rapid succession of attacks, delivering D6 S1 hits to its target prior to vanishing back from whence it came.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Howler Wind",
      description: "This spell is cast upon the wizard himself. Both he and any models within 8 inches of him gain the protection of the Howler Wind. Anyone targeting these models with mundane ranged weapons suffer a -2 penalty to their Ballistic Skill, however shooting past these models does not affect the missile in any way.",
      difficulty: 8,
      timing: ["8"]
    },
    {
      name: "Celestial Shield",
      description: "This spell can be cast upon any friendly model within 6 inches of the caster, or the caster himself. The Celestial Shield provides a 4+ save versus all ranged attacks, and a 5+ save versus all hostile spells. Should the recipient of the Shield be the primary target of an area-effect spell and the save be made, no models shall suffer any of the spell’s effects.",
      difficulty: 8,
      timing: ["8"]
    },
    {
      name: "Shade Mount",
      description: "This spell may be cast upon the wizard himself, or a hero within 8 inches of him. Upon a successful casting, the model may immediately fly up to 12 inches. Should this movement bring the model into Base to Base contact with an enemy model, consider it a charge.",
      difficulty: 8,
      timing: ["7"]
    }
  ],
  "Woodland Incantations": [
    {
      name: "Song of Thorns",
      description: "Victim suffers 2D6 S1 hits, range 8\".",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Murmuring of the Wind",
      description: "Caster may move anywhere within 12\", if he gets into HtH it counts as a charge.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "The Rain Song",
      description: "Everything, except Woodelves, within 6\" of the caster suffers -1 to hit and suffers -1 Initiative. This lasts until the beginning of the caster’s next magic phase.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Lyrics of Feral Infatuation",
      description: "Any animal or monster has to pass a Ld-test, on his own Ld, in order to attack an opponent. If it fails it will do nothing else that turn, not even fighting back if attacked.",
      difficulty: 8,
      timing: ["9"]
    },
    {
      name: "Song of the Sun",
      description: "The target must be within 18\" and is -1M until the caster's next magic phase, he also must make a test, if he fails, he suffers a S4 hit.",
      difficulty: 6,
      timing: ["5", "7"]
    },
    {
      name: "Eagle's Cry",
      description: "All Wood elves within 6\" gain +1 to hit and +1 on the critical hit table. This lasts until the beginning of the caster’s next magic phase.",
      difficulty: 8,
      timing: ["8", "9"]
    }
  ],
  "Use Runes": [
    {
      name: "Iron",
      description: "6+ ward",
      difficulty: 6,
      timing: ["1", "8", "9"]
    },
    {
      name: "Stone",
      description: "+1 armour save",
      difficulty: 6,
      timing: ["1", "8", "9"]
    },
    {
      name: "Fury",
      description: "+1 A",
      difficulty: 7,
      timing: ["1", "6", "9"]
    },
    {
      name: "Striking",
      description: "+1 WS",
      difficulty: 6,
      timing: ["1", "9"]
    },
    {
      name: "Speed",
      description: "+1 I",
      difficulty: 5,
      timing: ["1", "9"]
    },
    {
      name: "Cleaving",
      description: "+1 S",
      difficulty: 8,
      timing: ["1", "9"]
    }
  ],
  "Dark Magic": [
    {
      name: "Banishment",
      description: "All Undead within 4” of the Dark Mage must take an unmodified Leadership Test or suffer a S4 hit.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Soul Render",
      description: "Soul Render is a magic missile spell, with a range of 18 inches. If successfully cast, the spell causes D3 S3 hits.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Shade Mount",
      description: "This spell may be cast on the wizard himself, or a hero within 8 inches of him. Upon a successful casting, the model may immediately fly up to 12 inches. Should this movement bring the model into Base to Base contact with an enemy model, consider it a charge.",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: " Jozun’s Decay",
      description: "This spell has a range of 12 inches. Upon a successful casting, the target must pass a Leadership Test, or suffer a one point reduction to its Toughness attribute. Each recovery phase the model must attempt to pass a Leadership Test, reducing its Toughness a further point for each failure. Should a model be reduced to 0 Toughness, it is removed from the game irrespective of how many wounds it has left. Should a Leadership Test be passed, the model must play the remainder of the game at its modified Toughness score. A model may not be targeted more than once per game.",
      difficulty: 9,
      timing: ["7", "2"]
    },
    {
      name: "Cowel of Pain",
      description: "The mage cannot be Stunned until his next magic phase. Treat 3-4 results as Knocked Down instead.",
      difficulty: 6,
      timing: ["9"]
    },
    {
      name: "Doom & Dark",
      description: "Any model within 2” of the Dark Mage must take an immediate All Alone Test, even if in close combat. Should a model flee from Close Combat, free strikes occur as normal, assuming that there are combatants who have not failed their test.",
      difficulty: 7,
      timing: ["7"]
    }
  ],

  "The Crow Master Spell": [
    {
      name: "Decay of Ages",
      description: "This spell affects a single warrior within 6\" of Simius Gantt. The warrior must pass an immediate toughness test on a D6 or they will lose -1 from all of their characteristics with the exception of Attacks and Wounds. In each subsequent Recovery phase they must pass a Toughness test or will lose a further -1. As soon as they pass the test all characteristics are returned to normal. If any characteristic reaches O the model is taken out of action. Simius cannot cast this spell on more than one model at a time. If he decides to cast it again the effects on the previous victim are undone.",
      difficulty: 9,
      timing: ["2", "7"]
    }
  ],
  "Commands": [
    {
      name: "Raise our insignia!",
      description: "This Command can only be issued to the Squire if it is within 12\" and is not fleeing, knocked down, stunned, or taken out of action. Until the beginning of the next Shooting phase, every model of the Mazzalupo warband, including the Wandering knight, who has line of sight to the Squire can reroll failed Leadership tests, including the warband's Rout test.",
      difficulty: 6,
      timing: ["2", "4", "9"]
    },
    {
      name: "Move, ye miscreant!",
      description: "A single Mazzalupo warrior within 6\” of the Wandering knight may immediately move again up to its maximum Movement distance. If this moves them into base contact with an enemy model, they count as charging.",
      difficulty: 6,
      timing: ["2"]
    },
    {
      name: "Follow me, mine pugnacious ones!",
      description: "Members of the Mazzalupo warband within 4\" of the Wandering knight gain a +1 bonus to hit in hand-to-hand combat until the end of the turn.",
      difficulty: 8,
      timing: ["2", "9"]
    },
    {
      name: "Be on guard, my brave ones!",
      description: "Choose a member of the Mazzalupo warband within 12\" that is engaged in hand-to-hand combat. That model can immediately move away from the combat up to the maximum distance allowed by their Movement value but cannot come into contact with other enemy models.",
      difficulty: 7,
      timing: ["2"]
    },
    {
      name: "Pay them no heed!",
      description: "Choose a Mazzalupo model within 12\”. Until the next Shooting phase, the model can target any enemy warrior even if they are not the closest.",
      difficulty: 6,
      timing: ["2", "7"]
    },
    {
      name: "Art thou ready to die fighting?",
      description: "Every Mazzalupo model within 4\”, including the Wandering knight, can only be taken out of action on a roll of 6 until the next Mazzalupo turn.",
      difficulty: 8,
      timing: ["2", "8", "9"]
    }
  ],
  "Arcane Vim-Toist": [
    {
      name: "Riding the Wind",
      description: "Invoking the Element of the Air, the caster rises up on a warm breeze, only to set down again on another part of the battlefield. This spell is cast at the beginning of the caster’s Movement phase. The caster may move up to 12+D6\" anywhere on the battlefield, ignoring any intervening terrain; this counts as the caster’s movement for that turn. This spell may not be used to move the caster into base contact with an enemy warrior, but the caster may shoot as normal (with a -1 penalty for having moved).",
      difficulty: 6,
      timing: ["4"]
    },
    {
      name: "Skin of Stone",
      description: "Calling upon the Element of the Earth, the caster is able to make a warrior’s skin become as hard as stone. This spell may be cast on any friendly warrior within 6\". The target gains +2 to his armour save but suffers a -1 penalty to Initiative. The spell may be maintained each turn, providing the affected warrior remains within 6\" of the caster and the caster can pass a Difficulty test. If the caster is more than 6\" away from the affected warrior in the Recovery phase, the spell cannot be maintained and wears off. Only one warrior may be affected by a Stone Skin spell at any one time, although the caster is free to cast other spells while maintaining the Stone Skin.",
      difficulty: 7,
      timing: ["1", "7", "9"]
    },
    {
      name: "Burning Hand",
      description: "By invoking the Element of Fire, one of the caster’s hands becomes a burning bolt which he can use to smite his enemies. This spell is cast at the beginning of the Combat phase. The caster may sacrifice all of his normal attacks to make one hand-to-hand attack at Strength 5, causing 2 wounds. If the enemy warrior is successfully hit, he is set on fire on a roll of 4+. This spell lasts for one round only.",
      difficulty: 8,
      timing: ["9"]
    },
    {
      name: "Quicksand",
      description: "By invoking the Element of Water, water rises from the very rocks and sand and turns the ground to quicksand. This spell is cast at any warrior within 6\". The water floods the area for 3\" around the targeted warrior. The effect lasts until the beginning of the caster’s next Recovery phase. All warriors within the quicksand must pass a Strength test or be unable to move. Warriors in combat cannot attack but may defend themselves.",
      difficulty: 6,
      timing: ["1", "3", "7"]
    },
    {
      name: "Storm of Magic",
      description: "By breaching the very fabric of reality, the caster is able to summon a bolt of pure magical energy. The caster may target any warrior within 12\". If the spell is successfully cast, the target is struck by a bolt of energy and takes one S5 hit. Armour saves may be taken as normal.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Blessing of the Elements",
      description: "The caster calls on the elements of the desert and draws upon the fortune they can bestow. In the post-battle sequence, the player may re-roll any one dice or modify one dice by +1/-1. If the caster was taken out of action, this spell may not be cast.",
      difficulty: 6,
      timing: ["13"]
    }
  ],
  "Fey Magic": [
    {
      name: "Angering Spites",
      description: "This spell has a range of 18\” and causes one strength 4 hit. It strikes the first model in its path. Armor saves are allowed as normal",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Oakskin",
      description: "This spell gives the wizard a 2+ armor save which replaces any other armor save.",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Terrifying Spites",
      description: "Choose a friendly model with 8\” (including the wizard himself). That model causes Fear for the rest of the battle. This spell may only be successfully cast once per battl",
      difficulty: 8,
      timing: ["3", "7"]
    },
    {
      name: "Fury of the Wild",
      description: "The wizard gets +1 movement, +1 attack, +2 strength, and +1 weapon skill. The wizard  must take a leadership test at the beginning of each of the wizard’s own turns to maintain; if the test fails, the spell ends.",
      difficulty: 8,
      timing: ["2", "7"]
    },
    {
      name: "Ever-Living Resplendence",
      description: "Any one model within 4\” of the wizard (including himself) may be healed. The warrior is restored to his full quota of wounds. This spell may also be used if any friendly model within 4\” is stunned or knocked down, they immediately come to their senses, stand up, and continue fighting as normal.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Call of the Hunt",
      description: "One friendly model within 8\” of the caster gains +1 to hit and +1 to injury rolls in its next turn of shooting or close combat",
      difficulty: 9,
      timing: ["7", "9"]
    }
  ],
  "Dreaded Scrolls of Nagash": [
    {
      name: "Soulcage",
      description: "You may choose a single model within 6''. All wounds are transferred to this model at +1 to the Injury Roll. Should a natural 6 be rolled on the Injury chart, not only is the Soulcaged model removed from action, but the caster is treated as Stunned. Only one Soulcage spell may be in effect at a time.",
      difficulty: 9,
      timing: ["8", "9"]
    },
    {
      name: "Black Breath",
      description: "The spell has a range of 8\", and hits the first model within its path. It causes 2 S4 hits on its target, and one S3 hit on all models within 2\".",
      difficulty: 8,
      timing: ["7"]
    },
    {
      name: "Servants Eternal",
      description: "This spell must be used before the game, and may only be used once. When cast, the spell summons D3 Zombies to the caster’s side. The evil that sustains the abominations will fade after the battle, turning their damned flesh to dust. As such, these zombies do not count towards the warband’s maximum size.",
      difficulty: 0,
      timing: ["1"]
    },
    {
      name: "Fear of the Ages",
      description: "All enemy models within 4\" of the caster suffer a S3 hit. No armour saves are allowed. The servants of Morr, Sigmar and Ulric are especially susceptible to this evil, and suffer a S4 hit instead.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Wall of Despair",
      description: "The caster is immune to all spells and prayers. Roll at the beginning of each turn during the Recovery Phase. On a roll of 1 or 2, the Wall of Despair disappears.",
      difficulty: 6,
      timing: ["2", "8"]
    },
    {
      name: "Claws of Nagash",
      description: "The Claws of Nagash grant the caster +1 Weapon Skill, and the caster becomes Frenzied. Test at the beginning of each turn during the Recovery Phase. On a roll of 2 or less, the Claws of Nagash vanish.",
      difficulty: 10,
      timing: ["2", "9"]
    }
  ],
  "Dark Arts": [
    {
      name: "Fires of Strigos",
      description: "The fireball has a range of 18\" and causes one Strength 4 hit. It strikes the first model in its path. Armour saves are taken as normal (i.e. at -1 AS).",
      difficulty: 7,
      timing: ["7"]
    },
    {
      name: "Winged Flight",
      description: "The Vampire may immediately move anywhere within 18\", including into base contact with an enemy, in which case he counts as charging. If he engages a fleeing enemy in the close combat phase, he will score 1 automatic hit and then his opponent will flee again.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Lifestealer",
      description: "You may choose a single model within 6\". The target suffers a wound (no save allowed), and the Vampire gains an extra Wound for the duration of the battle. This may take the Vampire's Wounds above his original maximum value. This spell will not affect the Possessed. Should the Vampire attempt to cast this spell upon another Vampire, increase the difficulty by 1.",
      difficulty: 10,
      timing: ["7"]
    }
  ],
  "Spells of The Lothen Sea": [
    {
      name: "Divination of Shirath",
      description: "The Mage may re-roll all his failed dice rolls, though the second result stands. The effect lasts until the beginning of the Mage’s next turn.",
      difficulty: 6,
      timing: ["7"]
    },
    {
      name: "Shimmering Shield",
      description: "This spell acts as a shield to protect the Mage. It gives him an additional unmodified 5+ save against all attacks. The effect lasts until the beginning of the Mage’s next turn",
      difficulty: 7,
      timing: ["7", "8", "9"]
    },
    {
      name: "Statue of Light",
      description: "The Mage chooses a single enemy model he can see. That model may not move as long as the Mage remains both static and alive. The Mage and the target may cast spells normally, but fight in close combat at -2 WS (minimum of 1).",
      difficulty: 7,
      timing: ["7", "9"]
    },
    {
      name: "Mistress of the Deep",
      description: "Place a man-sized Oceanid model within 6” of the Mist Mage. This model may not move or make any actions (it is, for all intents and purposes, scenary rather than a living model.) Any time an enemy model wants to shoot or declare a charge on your Mist Mage, it must first measure the distance between itself and the Oceanid. If the Oceanid is closer than the mage, the attacker must first take a Leadership test or be distracted by the Oceanid’s singing. If the test is failed, the attacker cannot shoot/charge this turn. Once a model has passed a test, it does not have to test again for the rest of the game. The spell has no effect against models Immune to Psychology. The spell ends when the Mist Mage wants it to, the Mage attempts to recast the spell, or the Mage casts another spell. If successfully recast, the Oceanid model is moved to any new location within 6” of the Mage.",
      difficulty: 8,
      timing: ["5", "8"]
    },
    {
      name: "Hunters Fury",
      description: "The spell summons D3+1 arrows which the Mage can use to shoot against one enemy model following the rules for normal shooting. The arrows have a range of 36\". Use the Mage’s own Ballistic Skill to determine whether he hits or not, but ignore movement, range and cover penalties. Each arrow causes one S3 hit.",
      difficulty: 9,
      timing: ["7"]
    },
    {
      name: "Silent Guardian",
      description: "This spell acts as an invisible guardian that will defend the Mage. If the Mage is attacked in close combat then the guardian will fight first with WS5, S3. The guardian will make 1 attack per turn against each enemy that attacks the Mage. The guardian will not leave the Mage’s side, and will only fight if the Mage himself is being attacked. The Guardian cannot be attacked in return and will only be dispelled if the Mage casts another spell or dies. (Unofficial Ruling: All enemies in contact with the Mage declare their targets before attacking. Any enemies declaring an attack against the Mage immediately receives an attack from the Guardian, before rolling to hit.)",
      difficulty: 9,
      timing: ["7", "9"]
    }
  ]
};
