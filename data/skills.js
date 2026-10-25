import { RULES } from './rules.js';

// Helper function to create rule reference links
const createRuleReference = (ruleName) => {
    const clean = (ruleName || '').toLowerCase().trim();
    const rule = RULES.find(r => 
        r.name.toLowerCase().trim() === clean ||
        (r.englishName && r.englishName.toLowerCase().trim() === clean) ||
        (r.aliases && r.aliases.some(a => a.toLowerCase().trim() === clean))
    );
    if (!rule) {
        return `<span class="text-red-400">Regla "${ruleName}" no encontrada</span>`;
    }

    return `
        <span class="text-mordheim-gold hover:text-yellow-400 cursor-pointer inline-block" 
              onclick="window.showRuleModal('${rule.name}')"
              title="Ver reglas de ${rule.name}"
              style="text-decoration: underline; text-underline-offset: 2px;">
            ${ruleName}
        </span>
    `;
};

// Helper function to create skill rule text with rule references
const createSkillRuleText = (text, ruleReferences = []) => {
    let processedText = text;

    // Replace rule references in the text
    ruleReferences.forEach(ruleName => {
        const referenceHtml = createRuleReference(ruleName);
        const isHyphenated = ruleName.includes('-');

        if (isHyphenated) {
            const nonHyphenated = ruleName.replace('-', ' ');
            // Replace both versions, case-insensitive
            processedText = processedText.replace(
                new RegExp(`(?<![a-zA-Z])(${ruleName}|${nonHyphenated})(?![a-zA-Z])`, 'i'),
                referenceHtml
            );
        } else {
            processedText = processedText.replace(
                new RegExp(`(?<![a-zA-Z])${ruleName}(?![a-zA-Z])`, 'i'),
                referenceHtml
            );
        }
    });

    return processedText;
};

// Helper function to create expandable table rows for skills (supports any number of columns)
const createSkillTable = (description, headers, rows, ruleReferences = []) => {
    const headerHtml = headers.map(header =>
        `<th class="text-left py-2 px-3 text-slate-300">${header}</th>`
    ).join('');

    const rowHtml = rows.map(row => {
        const borderClass = row.border !== false ? 'border-b border-slate-700' : '';
        const hasCustomContent = row.expandableContent || row.content !== undefined;

        if (hasCustomContent) {
            const expandableContent = row.expandableContent ? `
                <div onclick="this.nextElementSibling.classList.toggle('hidden')" class="cursor-pointer font-semibold text-mordheim-gold hover:text-yellow-400 transition-colors">
                    &#9660; ${row.title || 'Details'}
                </div>
                <div class="hidden mt-2 p-3 bg-slate-700 rounded border-l-4 border-mordheim-gold text-slate-300">
                    ${row.expandableContent}
                </div>
            ` : row.content;

            const normalCells = row.cells.slice(0, -1).map(cell =>
                `<td class="py-2 px-3 text-slate-300">${cell}</td>`
            ).join('');

            return `
                <tr class="${borderClass}">
                    ${normalCells}
                    <td class="py-2 px-3 text-slate-300">
                        ${expandableContent}
                    </td>
                </tr>
            `;
        } else {
            // Render all cells directly for multi-column tables (e.g. 3, 4, 5+ columns)
            const allCells = row.cells.map(cell =>
                `<td class="py-2 px-3 text-slate-300">${cell}</td>`
            ).join('');

            return `
                <tr class="${borderClass}">
                    ${allCells}
                </tr>
            `;
        }
    }).join('');

    const processedDescription = createSkillRuleText(description, ruleReferences);

    return `
        <div class="text-slate-300 mb-3">${processedDescription}</div>
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="border-b border-slate-600">
                        ${headerHtml}
                    </tr>
                </thead>
                <tbody>
                    ${rowHtml}
                </tbody>
            </table>
        </div>
    `;
};

// Alias for compatibility with special_rules.js format
const createRuleTable = createSkillTable;


export const SKILLS = [
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

    // Combat Skills
    {
        id: 101,
        category: "Combat",
        name: "Strike to Injure",
        type: "General",
        timing: ["9"],
        rules: "The warrior can land his blows with uncanny accuracy. Add +1 to all injury rolls caused by the model in hand-to-hand combat."
    },
    {
        id: 102,
        category: "Combat",
        name: "Combat Master",
        type: "General",
        timing: ["9"],
        rules: createSkillRuleText("The warrior is able to take on several opponents at once. If he fights against more than one enemy at a time, he gains an extra Attack in each hand-to-hand combat phase as long as he is fighting two or more enemy models. In addition, the warrior is immune to 'All Alone' tests.",
            ["All-Alone"]
        )
    },
    {
        id: 103,
        category: "Combat",
        name: "Weapons Training",
        type: "General",
        timing: ["12"],
        rules: "A warrior with this skill is adept at using many different weapons. He may use any hand-to-hand combat weapon he comes across, not just those in his equipment options."
    },
    {
        id: 104,
        category: "Combat",
        name: "Web of Steel",
        type: "General",
        timing: ["9"],
        rules: "Few can match the ability of this warrior. He fights with great skill, weaving a web of steel around him. The model gains +1 to all his rolls on Critical Hit tables in hand-to-hand combat."
    },
    {
        id: 105,
        category: "Combat",
        name: "Expert Swordsman",
        type: "General",
        timing: ["10"],
        rules: "This warrior has been expertly taught in the art of swordsmanship. He may re-roll all missed attacks if he is using a sword in the hand-to-hand phase of the turn that he charges. Note that this only applies when they are armed with normal swords or weeping blades, and not with doublehanded swords or any other weapons."
    },
    {
        id: 106,
        category: "Combat",
        name: "Step Aside",
        type: "General",
        timing: ["9"],
        rules: "The warrior has a natural ability to avoid injury in combat. Each time he suffers a wound in close combat he may make an additional saving throw of 5+. This save is never modified and is taken after all other armour saves."
    },
    // Shooting Skills
    {
        id: 201,
        category: "Shooting",
        name: "Quick Shot",
        type: "General",
        timing: ["7"],
        rules: "The warrior may shoot twice per turn with a bow or crossbow (but not a crossbow pistol)."
    },
    {
        id: 202,
        category: "Shooting",
        name: "Pistolier",
        type: "General",
        timing: ["7"],
        rules: "The warrior is an expert at using all kinds of pistols. If he is equipped with a brace of pistols of any type (including crossbow pistols), he may fire twice in the Shooting phase (though note that normal reloading rules apply). If he has a single pistol then he may fire it in the same turn it was reloaded."
    },
    {
        id: 203,
        category: "Shooting",
        name: "Eagle Eyes",
        type: "General",
        timing: ["7"],
        rules: "The warrior's sight is exceptionally keen. He adds +6\" to the range of any missile weapon he is using."
    },
    {
        id: 204,
        category: "Shooting",
        name: "Weapons Expert",
        type: "General",
        timing: ["12"],
        rules: "The warrior has been trained to use some of the more unusual weapons of the known world. He may use any missile weapon he comes across, not just the weapons available from his warband's list."
    },
    {
        id: 205,
        category: "Shooting",
        name: "Nimble",
        type: "General",
        timing: ["7"],
        rules: "The warrior may move and fire with weapons that are normally only used if the firer has not moved. Note that this skill cannot be combined with the Quick Shot skill."
    },
    {
        id: 206,
        category: "Shooting",
        name: "Hunter",
        type: "General",
        timing: ["7"],
        rules: "The warrior is an expert at getting his weapon loaded and ready. He may fire each turn with a handgun or Hochland long rifle."
    },
    {
        id: 207,
        category: "Shooting",
        name: "Knife Fighter",
        type: "General",
        timing: ["7"],
        rules: "The warrior is an unrivalled expert at using throwing knives and throwing stars. He can throw a maximum of three of these missiles in his shooting phase and may divide his shots between any targets within range as he wishes. Note that this skill cannot be combined with the Quick Shot skill."
    },
    {
        id: 208,
        category: "Shooting",
        name: "Trick Shooter",
        type: "General",
        timing: ["7"],
        rules: createSkillRuleText("The warrior can shoot through the tiniest gap without it affecting his aim. He ignores all modifiers for Cover when using missile weapons.", ["Cover"])
    },
    {
        id: 209,
        category: "Shooting",
        name: "Axe thrower",
        type: "General",
        timing: ["7"],
        rules: "Can only be learened if warrior has access to Throwing Axes. The warrior can throw a maximum of two axes in his shooting phase, both of which gain +1 Strength, and may divide his shots between any targets within range as he wishes. Note that this skill cannot be combined with the Quick Shot skill or the Knife Fighter skill. The skill Knife Thrower does not allow the user to throw multiple Throwing Axes."
    },


    //Academic Skills
    {
        id: 301,
        category: "Academic",
        name: "Battle Tongue",
        type: "General",
        timing: ["12"],
        rules: createSkillRuleText("This skill may only be chosen by a Leader. The warrior has drilled his warband to follow short barked commands. This increases the range of his Leadership ability by 6\". Note that Undead leaders may not use this skill.",
            ["Leader"]
        )
    },
    {
        id: 302,
        category: "Academic",
        name: "Sorcery",
        type: "General",
        timing: ["7"],
        rules: createSkillRuleText("This skill may only be taken by Heroes capable of Casting Spells. A warrior with this skill gains +1 to his rolls to see whether he can cast spells successfully or not. Note that Sisters of Sigmar and Warrior-Priests may not use this skill.",
            ["Casting Spells"]
        )
    },
    {
        id: 303,
        category: "Academic",
        name: "Streetwise",
        type: "General",
        timing: ["13"],
        rules: "A warrior with this skill has good contacts and knows where to purchase rare items. He may add +2 to the roll that determines his chances of finding such items"
    },
    {
        id: 304,
        category: "Academic",
        name: "Haggle",
        type: "General",
        timing: ["13"],
        rules: "The warrior knows all the tricks of bargaining and haggling. He may deduct 2D6 gold crowns from the price of any single item (to a minimum cost of 1gc) once per post battle sequence."
    },
    {
        id: 305,
        category: "Academic",
        name: "Arcane Lore",
        type: "General",
        timing: ["12"],
        rules: "Witch Hunters, Sisters of Sigmar and Warrior-Priests may not have this skill. Any warrior with this skill may learn Lesser Magic if he owns a Tome of Magic."
    },
    {
        id: 306,
        category: "Academic",
        name: "Wyrdstone Hunter",
        type: "General",
        timing: ["13"],
        rules: "The warrior has an uncanny ability to find hidden shards of wyrdstone. If a Hero with this skill is searching the ruins in the exploration phase you may re-roll one dice when rolling on the Exploration chart. The second result stands."
    },
    {
        id: 307,
        category: "Academic",
        name: "Warrior Wizard",
        type: "General",
        timing: ["12"],
        rules: createSkillRuleText("This skill may only be taken by fighters capable of Casting Spells. The mental powers of the wizard allow him to wear armour and cast spells.",
            ["Casting Spells"]
        )
    },
    {
        id: 308,
        category: "Academic",
        name: "Scribe",
        type: "General",
        timing: ["1", "7"],
        rules: createSkillRuleText("The warrior is a natural adept at writing and making scrolls. Any warrior capable of Casting Spells or using prayers may take this skill. It allows them to make a scroll before the battle and inscribe a single spell or prayer upon it that they are versed in. The scroll may be used just before they are about to cast the spell or prayer and allows the caster +2 to his difficulty roll. Once used the scroll will crumble to dust and is useless. Scrolls may not be saved up from battle to battle if they are not used.",
            ["Casting Spells"]
        )
    },
    {
        id: 309,
        category: "Academic",
        name: "Mind Focus",
        type: "General",
        timing: ["7"],
        rules: createSkillRuleText("The warrior possesses a great strength of mind which allows him to concentrate beyond the levels of most normal men. This skill may only be taken by a warrior capable of using prayers or Casting Spells. When using a spell or prayer the warrior with this skill may reroll one dice roll used in the difficulty roll.",
            ["Casting Spells"]
        )
    },
    {
        id: 310,
        category: "Academic",
        name: "Tactician",
        type: "General",
        timing: ["1"],
        rules: createSkillRuleText("This skill may only be taken by a warband Leader. The warrior has a great tactical mind and can often find the best positions for his warriors to meet the oncoming attack. In any scenario the warband may reposition warriors after his opponent has set up and may even advance them up to 12 inch onto the board instead of 8 inch.",
            ["Leader"]
        )
    },
    {
        id: 311,
        category: "Academic",
        name: "Hunch",
        type: "General",
        timing: ["1"],
        rules: createSkillRuleText("This skill may only be taken by the warband Leader. The warrior has an uncanny knack of placing his men in the right place at the right time, as if he senses danger through instinct alone. In any scenario the warband may position up to 3 of men capable of earning experience in any ruined building on the board that is at least 12 inch away from an enemy model and not in the enemy deployment zone.",
            ["Leader"]
        )
    },
    {
        id: 312,
        category: "Academic",
        name: "Magical Aptitude",
        type: "General",
        timing: ["7"],
        rules: createSkillRuleText("This skill may only be taken by a warrior capable of Casting Spells. It may not be used by Sisters of Sigmar or Warrior Priests. The warrior has a keep aptitude for magic and can push himself beyond normal limits to produce a storm of spells. The warrior may attempt to cast two spells each turn as long as he is not in hand-to-hand combat. After attempting the first spell, he must take a toughness test. If he passes he may attempt a second spell that turn or even cast the same spell twice. If he fails he must roll on the injury table immediately with no saves treating out of action results as stunned instead.",
            ["Casting Spells"]
        )
    },
    {
        id: 313,
        category: "Academic",
        name: "Animal Handling",
        type: "General",
        timing: ["12"],
        rules: "This skill is highly beneficial if non-ridden animals are to be included in a warband. This skill must be taken for specific animals and may be taken multiple times for different animals. It represents knowledge of the general care and well being of the animal as well as training techniques. A warrior with this skill has a beneficial effect on the animals under his care. If a warrior has the Animal Handling skill for a particular animal, any such animals may use his Leadership provided he is within 6\". If the warband's leader is also nearby, a player may choose which of the warriors' Leadership to use unless the animal is stupid, in which case only the handler\'s Leadership may be used. In addition, stubborn animals with a handler in base contact, ignore the effects of stubbornness."
    },
    {
        id: 314,
        category: "Academic",
        name: "Tomb Raider",
        type: "General",
        timing: ["13"],
        rules: "The hero is experienced in traversing the underground tunnels to locate the hidden chambers. If the hero was not taken out of action and is free to explore in the Exploration phase, you may re-roll one dice on the Exploration chart. Note that this skill replaces the Wyrdstone Hunter skill in the Mordheim Rulebook."
    },
    {
        id: 315,
        category: "Academic",
        name: "Trap Expert",
        type: "General",
        timing: ["4"],
        rules: "This Hero is able to detect traps in the tombs with relative ease. A character who possesses this skill will never set off traps himself (but may be subject to their effects if he is too close to one if it goes off). He can attempt to disarm any traps he comes across. He must stop at the trap during his Movement phase, and may do nothing else that turn. To disarm a Simple trap, he must roll 6+ on 2D6. To disarm a Complex trap, he must roll 8+ on 2D6. If unsuccessful, he must test against his Initiative. A failed test means he has inadvertently set off the trap himself! He is also able to restore dud traps or previously de-activated traps back into active traps. To determine what a dud trap becomes, roll a D6: 1-4: Simple, 5-6: Complex. Obviously a previously disarmed trap will revert back to what it was. If restoring a Simple trap, he must roll a 6+ on 2D6. If restoring a Complex trap, he must roll an 8+. Failure will mean that the trap bas failed to activate."
    },
    {
        id: 316,
        category: "Academic",
        name: "Driver",
        type: "General",
        timing: ["8", "11"],
        rules: createSkillRuleText("A wagon driven by a Hero with this skill may re-roll results on the Out of Control chart. The second result must be accepted even if it is worse.",
            ["Out of Control"]
        )
    },
    {
        id: 317,
        category: "Academic",
        name: "Strategist",
        type: "General",
        timing: ["1"],
        rules: "The Hero has great strategic skills. Before each battle a Hero with this skill may decide to develop plans that further the tactical ambitions of the warband. Choosing to have this model voluntarily miss the next battle due to the Hero's pondering means the warband gains +1 campaign point after the battle. The Hero does count for calculating warband rating as normal and determining the prices for selling wyrdstone/treasure. However, he does not count as part of the warband when taking Rout tests. Initial warband size is considered to be one model less during the battle. The Hero does not gain +1 Experience for surviving a battle since he did not take part in the fight."
    },
    {
        id: 318,
        category: "Academic",
        name: "Scholar",
        type: "General",
        timing: ["12"],
        rules: createSkillRuleText("Only warriors capable of Casting Spells or using Prayers may pick this skill. Whenever the warrior may learn a new spell or prayer through an advance, he may choose which one he learns instead of determining at random, or he may decrease the difficulty of any one spell or prayer he already knows by –1 permanently.",
            ["Casting Spells"]
        )
    },

    // Strength Skills
    {
        id: 401,
        category: "Strength",
        name: "Mighty Blow",
        type: "General",
        timing: ["9"],
        rules: "The warrior knows how to use his strength to maximum effect and has a +1 Strength bonus in close combat (excluding pistols). As his Strength is used for close combat weapons, the bonus applies to all such weapons."
    },
    {
        id: 402,
        category: "Strength",
        name: "Pit Fighter",
        type: "General",
        timing: ["9"],
        rules: "The warrior has learned how to fight in enclosed spaces from his time in the dangerous fighting pits of the Empire. He is an expert at fighting in confined areas and adds +1 to his WS and +1 to his Attacks if he is fighting inside buildings or ruins. It's a good idea to define which bits of your terrain collection count as 'buildings or ruins' at the start of a battle to avoid confusion later"
    },
    {
        id: 403,
        category: "Strength",
        name: "Resilient",
        type: "General",
        timing: ["9"],
        rules: createSkillRuleText("The warrior is covered in battle scars. Deduct -1 Strength from all hits against him in close combat. This does not affect Armour Save Modifiers.",
            ["Armour Save Modifiers"]
        )
    },
    {
        id: 404,
        category: "Strength",
        name: "Fearsome",
        type: "General",
        timing: ["4", "5", "9"],
        rules: createSkillRuleText("Such is the reputation and physique of the model that he causes Fear in opposing models.",
            ["Fear"]
        )
    },
    {
        id: 405,
        category: "Strength",
        name: "Strongman",
        type: "General",
        timing: ["9"],
        rules: "The warrior is capable of great feats of strength. He may use a double-handed weapon without the usual penalty of always striking last. Work out order of battle as you would with other weapons."
    },
    {
        id: 406,
        category: "Strength",
        name: "Unstoppable Charge",
        type: "General",
        timing: ["10"],
        rules: "When he charges, the warrior is almost impossible to halt. He adds +1 to his Weapon Skill when charging."
    },
    {
        id: 407,
        category: "Strength",
        name: "Handy Man",
        type: "General",
        timing: ["2", "4"],
        rules: "The warrior is skilled in fixing minor damage on the wagon. If the wagon is stationary and has not moved during the last turn then if the warrior is in contact with the wagon, he may repair one previously damaged wheel. The Hero may do nothing else that turn and the wagon may not be moved. He can even set in a new wheel if it flew off. A wagon cannot be repaired if an enemy model is in contact with the handyman or the wagon, as the situation is far too dangerous to focus on the cart."
    },
    {
        id: 408,
        category: "Strength",
        name: "Beast Master",
        type: "General",
        timing: ["2", "9"],
        rules: createSkillRuleText("The Hero is able to communicate on a primal level with any beast he encounters. If the model confronts an animal (not mount!) in hand-to-hand combat, then before combat is fought he may take a Leadership test. If the test is failed combat proceeds as normal. If the test is successful the animal falls under his command. Place the models 1\" apart from each other. The player may now control the animal model. However, the beastmaster must pass a leadership test at the beginning of his turn otherwise control over the animal is lost. The animal must always remain within 6\" of the Hero or control is lost immediately. No more than one animal can be controlled this way.",
            ["Leadership"]
        )
    },
    //Speed Skills
    {
        id: 501,
        category: "Speed",
        name: "Leap",
        type: "General",
        timing: ["4"],
        rules: createSkillRuleText("The warrior may leap D6\" in the movement phase in addition to his normal movement. He may move and leap, run and leap, or charge and leap, but he can only leap once per turn. A leaping warrior may jump over opposing man-sized models, including enemies, and obstacles 1\" high, without penalty. The leap may also be used to leap over gaps, but in this case you must commit the warrior to making the leap before rolling the dice to see how far he jumps. If he fails to make it all the way across, he falls through the gap (see Falling).",
            ["Falling"]
        )
    },
    {
        id: 502,
        category: "Speed",
        name: "Sprint",
        type: "General",
        timing: ["4"],
        rules: "The warrior may triple his Movement rate when he runs or charges, rather than doubling it as normal."
    },
    {
        id: 503,
        category: "Speed",
        name: "Acrobat",
        type: "General",
        timing: ["4", "9"],
        rules: createSkillRuleText("The warrior is incredibly supple and agile. He may fall or jump from a height of up to 12\" without taking any damage if he passes a single Initiative test, and can re-roll failed Diving Charge rolls. He can still only do a diving charge from a height of up to 6\".",
            ["Diving Charge"]
        )
    },
    {
        id: 504,
        category: "Speed",
        name: "Lightning Reflexes",
        type: "General",
        timing: ["11"],
        rules: createSkillRuleText("If the warrior is charged he will 'Strike First' against those that charged that turn. As the charger(s) will also normally 'Strike First' (for charging), the order of attack between the charger(s) and the warrior with this skill will be determined by comparing Initiative values.",
            ["Strike First"]
        )
    },
    {
        id: 505,
        category: "Speed",
        name: "Jump Up",
        type: "General",
        timing: ["9"],
        rules: createSkillRuleText("The warrior can regain his footing in an instant, springing to his feet immediately if he is Knocked Down. The warrior may ignore Knocked Down results when rolling for injuries, unless he is knocked down because of a successful save from wearing a helmet or because he has the No Pain special rule.",
            ["Knocked Down"]
        )
    },
    {
        id: 506,
        category: "Speed",
        name: "Dodge",
        type: "General",
        timing: ["8"],
        rules: "A warrior with this skill is nimble and as fast as quicksilver. He can avoid any hits from a missile weapon on a D6 roll of 5+. Note that this roll is taken against missiles as soon as a hit is scored to see whether the warrior dodges it or not, before rolling to wound, and before any effects from other skills or equipment (such as lucky charms)."
    },
    {
        id: 507,
        category: "Speed",
        name: "Scale Sheer Surface",
        type: "General",
        timing: ["4"],
        rules: createSkillRuleText("A warrior with this skill can scale even the highest wall or fence with ease. He can climb up or down a height equal to twice his normal Movement, and does not need to make an Initiative Test when doing so.",
            ["Initiative Test"]
        )
    },
    //Cavalry
    {
        id: 601,
        category: "Cavalry",
        name: "Ride",
        type: "General",
        timing: ["12"],
        rules: "This skill is vital if a rider wishes to ride an animal into combat. The skill is specific to a particular type of animal and must be gained again if the warrior wishes to be able to ride a different kind of animal. For instance, a warrior with Ride Horse would need to gain the skill Ride Warhorse if he wanted to be able to ride such a spirited mount."
    },
    {
        id: 602,
        category: "Cavalry",
        name: "Cavalry Commander",
        type: "General",
        timing: ["12"],
        rules: createSkillRuleText("Mounted heroes are an impressive sight. With a good vantage point, they can see (and be seen) far more readily than if they were on foot. If the warband's leader has this skill and is mounted, he may add an extra 6\" to the distance within which other warriors in the warband may use his Leadership. This is in addition to any other bonuses that increase the range of the leader's influence.",
            ["Leadership"]
        )
    },
    {
        id: 603,
        category: "Cavalry",
        name: "Trick Riding",
        type: "General",
        timing: ["4", "8"],
        rules: createSkillRuleText("By athletically hanging off the side of his mount, a rider makes himself harder to hit. While a rider is trick riding all missile attacks against him suffer -1 to hit in addition to other modifiers. The rider must declare that he is trick riding before moving. He must then make an Initiative Test and, if successful, may move full distance. If he fails he loses control of his mount and must roll immediately on the Whoa Boy table. This skill may not be used with heavy armour because of the agility required. In addition, trick riding requires both hands, so the model may not use a shield or missile weapons whilst using the skill. Warriors without Ride may not use this skill.",
            ["Initiative Test", "Whoa Boy"]
        )
    },
    {
        id: 604,
        category: "Cavalry",
        name: "Combat Riding",
        type: "General",
        timing: ["4", "10"],
        rules: "The rider has trained his mount to use its bulk to trample any unmounted enemy before him. A warrior with this skill may make a single additional S4 attack when charging an unmounted opponent. In subsequent rounds of combat, or if charged by enemy warriors, the mounted warrior fights as normal."
    },
    {
        id: 605,
        category: "Cavalry",
        name: "Evade",
        type: "General",
        timing: ["9"],
        rules: "The rider has trained his mount to swerve from side to side in combat, wrong-footing his opponent. A rider with this skill always strikes first in close combat against dismounted opponents. When charged by an opponent, or otherwise fighting an enemy also entitled to strike first, attacks are carried out in order of Initiative. If Initiative is equal, the model with greater experience strikes first. Warriors without Ride may not use this skill."
    },
    {
        id: 606,
        category: "Cavalry",
        name: "Running Dismount",
        type: "General",
        timing: ["4"],
        rules: createSkillRuleText("The rider is able to dismount from his mount at speed. The rider may ride up to the mount's normal move distance and then dismount immediately. No further movement or shooting is possible. This skill may be used to move into contact with the enemy, counting as a Diving Charge from a height of 2\" - all the usual rules for diving charges apply. Note that the rider then counts as dismounted, gaining no further assistance from his mount.",
            ["Diving Charge"]
        )
    },
    {
        id: 607,
        category: "Cavalry",
        name: "Athletic Dismount",
        type: "General",
        timing: ["4"],
        rules: "Without breaking stride, the warrior is able to leap onto the back of his mount and immediately spur it into a full gallop. Once the warrior is on board, the mount may make a run or charge move as normal. The warrior must be within half his full move distance of his steed to use this skill."
    },
    {
        id: 608,
        category: "Cavalry",
        name: "Horse Archer",
        type: "General",
        timing: ["7"],
        rules: "The rider has learned the skills of the steppe nomads and can shoot from a running mount. The rider may shoot in a 360 degree arc whilst mounted, and may shoot while his mount is running; however the shot suffers a -1 to hit penalty in addition to all other normal modifiers. Warriors without Ride may not use this skill."
    },
    {
        id: 609,
        category: "Cavalry",
        name: "Mounted Combat Master",
        type: "General",
        timing: ["9"],
        rules: createSkillRuleText("The rider is especially skilled at combat against a mounted opponent. If the model is fighting mounted against a mounted opponent and successfully wounds the enemy, the wounded model must add +1 to his roll on the Whoa Boy table. Warriors without Ride may not use this skill.",
            ["Whoa Boy"]
        )
    },
    //Beastmen Special Skills and Maneaters and Ogre Hunting Party
    {
        id: 701,
        category: "Beastmen",
        name: "Shaggy Hide",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The model gains a 6+ Armour Save that can be combined with other armour as normal.",
        modifierGeneral: -1
    },
    {
        id: 702,
        category: "Beastmen",
        name: "Mutant",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Beastman may buy one mutation."
    },
    {
        id: 703,
        category: "Beastmen",
        name: "Fearless",
        type: "Warband Specific",
        timing: ["1", "9"],
        rules: createSkillRuleText("Immune to Fear and All-Alone tests.", ["Fear", "AllAlone"])
    },
    {
        id: 704,
        category: "Beastmen",
        name: "Horned One",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: "The Beastman has mighty horns, and can make an additional Attack with its basic Strength on a turn it charges."
    },
    {
        id: 705,
        category: ["Beastmen", "Maneaters", "Ogre Hunting Party"],
        name: "Bellowing Roar",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Only the leader may have this skill. He may re-roll any failed Rout tests.", ["Rout"])
    },
    {
        id: 706,
        category: "Beastmen",
        name: "Manhater",
        type: "Warband Specific",
        timing: ["12"],
        rules: createSkillRuleText("Will be affected by the rules of hatred when fighting any Human warbands.", ["Hatred"])
    },
    //Dwarf Treasure Hunters and Dwarf Rangers and Black Dwarfs, The Sons of Hashut, Dwarf Slayer Cult
    {
        id: 801,
        category: "Dwarf Treasure Hunters",
        name: "Master of Blades",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("When using a weapon that has a Parry special rule, this hero parries successfully if he beats or matches his opponents highest ‘to hit’ roll, not just if he beats the roll.<br><br>In addition, if this warrior is using two weapons that have the Parry special rule, he is allowed to parry two attacks (if his two dice match or beat the two highest Attack dice against him) instead of the normal maximum of one.<br><br>Note that if this Dwarf has two Dwarf axes (as detailed above) he can reroll any failed parries.", ["Parry"])
    },
    {
        id: 802,
        category: ["Dwarf Treasure Hunters", "Dwarf Rangers", "Black Dwarfs", "The Sons of Hashut"],
        name: "Extra Tough",
        type: "Warband Specific",
        timing: ["13"],
        rules: "When rolling on the Heroes Serious Injury chart for this Hero after a game in which he has been taken out of action, the dice may be re-rolled once. The result of this second dice roll must be accepted, even if it is a worse result."
    },
    {
        id: 803,
        category: ["Dwarf Treasure Hunters", "Dwarf Rangers", "Black Dwarfs"],
        name: "Resource Hunter",
        type: "Warband Specific",
        timing: ["13"],
        rules: "When rolling on the Exploration chart at the end of a game, the Hero may modify one dice roll by +1/-1."
    },
    {
        id: 804,
        category: ["Dwarf Treasure Hunters", "Dwarf Rangers", "Black Dwarfs", "The Sons of Hashut", "Dwarf Slayer Cult"],
        name: "True Grit",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("When rolling on the Injury table for this Hero, a roll of 1-3 is treated as Knocked Down, 4-5 as Stunned and 6 as out of action.", ["Knocked Down", "Stunned"])
    },
    {
        id: 805,
        category: ["Dwarf Treasure Hunters", "Dwarf Rangers", "Black Dwarfs", "The Sons of Hashut", "Dwarf Slayer Cult"],
        name: "Thick Skull",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("The Hero has a 3+ save on a D6 to avoid being Stunned. If the save is made, treat a Stunned result as Knocked Down instead. If the Dwarf also wears a helmet, this save is 2+ instead of 3+ (this takes the place of the normal Helmet special rule).", ["Stunned", "Knocked Down"])
    },
    {
        id: 806,
        category: "Dwarf Rangers",
        name: "Dwarf Ranger Combat Master",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("When using a weapon that has a Parry special rule, this hero parries successfully if he beats OR MATCHES his opponent’s highest ‘to hit’ roll, not just if he beats the roll.<br><br>In addition, if this warrior is using two weapons that have the Parry special rule, he is allowed to parry two attacks (if his two dice match or beat the highest two attack dice against him) instead of the normal maximum of one.", ["Parry"])
    },
    {
        id: 807,
        category: "Black Dwarfs",
        name: "Chaos Engineer",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Whenever a Hero with this skill searches for Chaos armour (including Mechanical Suits) or Obsidian Weapons, he gets +3 on the roll. This represents the Engineer’s ability to craft these items himself. The Hero ignores the Rarity and Gift of Chaos special rules and may never wear the Chaos Armours."
    },
    {
        id: 808,
        category: "Black Dwarfs",
        name: "Tyrant",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("This skill is for the Chaos Dwarf leader only. When making a Rout test, and if led by a leader with this skill, the leader may inspire his warband to stick around. This skill allows the leader to re-roll any failed Rout test, as long as the leader is not knocked down or stunned. If re-rolled, the new result will apply even if the new result is worse. If the leader is taken out of action the warband must make an immediate Rout test.", ["Rout", "Knocked Down", "Stunned"])
    },
    {
        id: 809,
        category: "The Sons of Hashut",
        name: "Unlimited Hatred",
        type: "Warband Specific",
        timing: ["12"],
        rules: createSkillRuleText("The warrior suffers hatred against everyone.", ["Hatred"])
    },
    {
        id: 810,
        category: "Dwarf Slayer Cult",
        name: "Deathwish",
        type: "Warband Specific",
        timing: ["2", "9", "4"],
        rules: createSkillRuleText("The hero is completely immune to all psychology and never need to test if fighting All-Alone.<br><br>Slayers Only", ["All-Alone"])
    },
    {
        id: 811,
        category: "Dwarf Slayer Cult",
        name: "Ferocious Charge",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("The Slayer may double his attacks on the turn in which he performs a Charge. He will suffer a -1 ‘to hit’ penalty on that turn.<br><br>Slayers Only", ["Charge"])
    },
    {
        id: 812,
        category: "Dwarf Slayer Cult",
        name: "Monster Slayer",
        type: "Warband Specific",
        timing: ["9"],
        rules: "In close combat, the Slayer always wounds any opponent on a roll of 4+, regardless of Toughness, unless his own Strength (after all modifiers due to weapon bonuses, etc) would mean that a lower roll than this is needed.<br><br>Slayers Only."
    },
    {
        id: 813,
        category: "Dwarf Slayer Cult",
        name: "Berserker",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: createSkillRuleText("The Slayer may add +1 to his close combat ‘to hit’ rolls during the turn in which he makes a charge.<br><br>Slayers Only.", ["Charge"])
    },
    {
        id: 814,
        category: "Dwarf Slayer Cult",
        name: "Deathblow",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("If the Hero is taken out of action in hand-to-hand, he may immediately make the remainder of his attacks before being removed, if he hasn’t made all of his attacks already this turn. He may use this skill if he is Knocked Down or Stunned.<br><br>Slayers Only.", ["Knocked Down", "Stunned"])
    },
    {
        id: 815,
        category: "Dwarf Slayer Cult",
        name: "Relentless",
        type: "Warband Specific",
        timing: ["4"],
        rules: "If the Hero charges a model but the charge fails, the Hero may still move the full distance of his move. This skill may only be used against enemies within sight or that the Slayer can detect. Slayers Only."
    },
    {
        id: 816,
        category: "Dwarf Slayer Cult",
        name: "Axe Mastery",
        type: "Warband Specific",
        timing: ["4", "10"],
        rules: createSkillRuleText("The Hero may reroll all missed attacks if he was using an axe or a dwarven axe in the hand-to-hand phase of the turn that he performed a Charge. May not be used with Whirling Blades", ["Charge"])
    },
    {
        id: 817,
        category: "Dwarf Slayer Cult",
        name: "Songster",
        type: "Warband Specific",
        timing: ["2", "9"],
        rules: createSkillRuleText("Any friendly model within 6\" of a Bard may re-roll any failed Leadership test with a +1 to Leadership, to a max of 10. This includes Rout tests.<br><br>Rememberer only.", ["Rout", "Leadership"])
    },
    {
        id: 818,
        category: "Dwarf Slayer Cult",
        name: "Song of Honor",
        type: "Warband Specific",
        timing: ["13"],
        rules: "In the postgame, if one or more Slayers in your warband died, all heroes and henchmen gain +1 Experience.<br><br>Rememberer only."
    },
    //Orc Mob and Black Orcs
    {
        id: 901,
        category: ["Orc Mob", "Black Orcs"],
        name: "Ard End",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("The warrior has a special 3+ save on a D6 to avoid being Stunned. If the save is made, treat a stunned result as Knocked Down instead. If the Orc also wears a helmet, this save is 2+ instead of 3+ (this takes the place of the normal helmet special rule).", ["Stunned", "Knocked Down"])
    },
    {
        id: 902,
        category: ["Orc Mob", "Black Orcs"],
        name: "WAAAGH",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("Orcs are aggressive creatures and some are experts at bulldozing charges. The warrior may add +D3\" to his Charge range.", ["Charge"])
    },
    {
        id: 903,
        category: ["Orc Mob", "Black Orcs"],
        name: "Ere We Go",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("The model may ignore Fear tests when they Charge.", ["Fear", "Charge"])
    },
    {
        id: 904,
        category: "Orc Mob",
        name: "Da Cunnin Plan",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Only the Boss may have this skill.<br><br>The warband may re-roll any failed Rout tests as long as the Boss is not out of action.", ["Rout"])
    },
    {
        id: 905,
        category: "Orc Mob",
        name: "Well Ard",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The Orc has a thick, dark-green skin, possibly indicating Black Orc blood. Such is the toughness of the Orc that he may add +1 to any armour saves.",
        modifierGeneral: -1
    },
    {
        id: 906,
        category: ["Orc Mob", "Black Orcs"],
        name: "Eadbasher",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("Any Knocked Down results which the Orc causes in hand-to-hand count as Stunned results instead.", ["Knocked Down", "Stunned"])
    },
    {
        id: 907,
        category: "Black Orcs",
        name: "Proven Warrior",
        type: "Warband Specific",
        timing: ["12"],
        rules: "This skill may only be taken by a Young’un with the Black Orc blood ability and 25 experience.<br><br>Once he gains this skill, the model is now considered a full Black Orc Warrior (yet still retains the title of Young’un). He follows all the rules for Black Orcs and uses their equipment list and has access to the same skill lists as a Black Orc."
    },
    //Ostlander Mercenaries and Horned Hunters
    {
        id: 110,
        category: "Ostlanders",
        name: "Bull Rush",
        type: "Warband Specific",
        timing: ["4", "10"],
        rules: createSkillRuleText("When this Hero makes a Charge, he may attempt to knock down his opponent rather than making his normal attacks. Roll to hit once with a +1 to hit modifier, though no ‘to wound’ roll is necessary. Instead, if the warrior hits with this attack, the opposing model is Knocked Down", ["Charge", "Knocked Down"])
    },
    {
        id: 111,
        category: ["Ostlanders", "Horned Hunters"],
        name: "Foul Odour",
        type: "Warband Specific",
        timing: ["9", "12"],
        rules: "All living enemies (not Undead or Possessed) are at -1 to hit him in hand-to-hand combat. In addition, the warrior cannot carry any open flames (torch, lantern, etc) and fire attacks made against him are resolved at +1 Strength as his booze soaked clothing burns readily."
    },
    {
        id: 112,
        category: "Ostlanders",
        name: "Taunt",
        type: "Warband Specific",
        timing: ["7"],
        rules: createSkillRuleText("During the Shooting phase, the warrior may choose to taunt one enemy instead of shooting with a missile weapon or casting a spell. The warrior must be able to see the enemy and taunting follows all the LOS rules for shooting (you must taunt the nearest opponent, etc). The enemy then takes a Leadership test. If he passes, nothing happens, but if he fails he must spend his next Movement phase trying to get into close combat with the warrior who taunted him.", ["Leadership"])
    },
    {
        id: 113,
        category: ["Ostlanders", "Horned Hunters"],
        name: "Animal Freindship",
        type: "Warband Specific",
        timing: ["9", "12"],
        rules: "Animals will never attack this warrior and up to two wardogs (see Mordheim book, page 54) that the warrior owns do not count against the maximum number of models in the warband."
    },
    {
        id: 114,
        category: "Ostlanders",
        name: "Blood Oath",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Only a warband’s leader may have this skill<br><br>This skill allows him to reroll a single Rout test once per game.", ["Rout"])
    },
    {
        id: 115,
        category: "Horned Hunters",
        name: "Master Trapper",
        type: "Warband Specific",
        timing: ["12"],
        rules: "Trip wire range has been extended by this warrior to reach 4\". Traps set by a master trapper are triggered by a score of 2+."
    },
    {
        id: 116,
        category: "Horned Hunters",
        name: "Pathfinder",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Roll one additional D6 during the exploration phase.<br><br>A warband may only contain one pathfinder."
    },
    //Sisters of Sigmar
    {
        id: 120,
        category: "Sisters of Sigmar",
        name: "Sign of Sigmar",
        type: "Warband Specific",
        timing: ["9"],
        rules: "Possessed or Undead opponents lose their first attack against the Priestess in the first round of hand-to-hand combat (down to a minimum of 1)."
    },
    {
        id: 121,
        category: "Sisters of Sigmar",
        name: "Protection of Sigmar",
        type: "Warband Specific",
        timing: ["8"],
        rules: "Any spell which would affect a Sister of Sigmar is nullified on a D6 roll of 4+. Note that if the spell is nullified it will not affect any other models either."
    },
    {
        id: 122,
        category: "Sisters of Sigmar",
        name: "Utter Determination",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Only the Matriarch may have this skill<br><br>This skill allows her to re-roll any failed Rout tests.", ["Rout"])
    },
    {
        id: 123,
        category: "Sisters of Sigmar",
        name: "Righteous Fury",
        type: "Warband Specific",
        timing: ["1", "12"],
        rules: createSkillRuleText("The model had Hatred towards all Skaven, Undead, Possessed, Beastmen, Dark Elves and any other 'evil' warband and all models in them. Non-Chaos humans who just like to kill, loot, etc, are not included.", ["Hatred"])
    },
    {
        id: 124,
        category: "Sisters of Sigmar",
        name: "Absolute Faith",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: createSkillRuleText("The Sister may re-roll any Fear tests and does not have to test if she is fighting All-Alone against several opponents.", ["Fear", "All-Alone"])
    },
    //Skaven of Clan Eshin and Dark Elves and Horned Hunters and Lizardmen and Shadow Warriors and Skaven of Clan Pestilens and Night Goblin and Druchii and Ogre Hunting Party and Skaven of Clan Moulder and Wood Elves of Athel Loren
    {
        id: 130,
        category: ["Skaven", "Skaven of Clan Pestilens", "Skaven of Clan Moulder"],
        name: "Black Hunger",
        type: "Warband Specific",
        timing: ["2", "10"],
        rules: "The Skaven Hero may declare at the beginning of his turn that he is using this skill. The Hero may add +1 attack and +D3\" to the total move to his profile for the duration of his own turn but will suffer D3 S3 hits with no armour save possible at the end of the turn."
    },
    {
        id: 131,
        category: ["Skaven", "Skaven Clan Skryre"],
        name: "Tail Fighting",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Skaven may wield a shield, knife or a sword with its tail. The model gains an extra attack with the appropriate weapon or a +1 bonus to its armour save."
    },
    {
        id: 132,
        category: ["Skaven", "Skaven Clan Skryre"],
        name: "Wall Runner",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("The Skaven does not need to take an Initiative Test when climbing up walls and other sheer surfaces.", ["Initiative Test"])
    },
    {
        id: 133,
        category: ["Skaven", "Dark Elves", "Horned Hunters", "Lizardmen", "Shadow Warriors", "Night Goblin", "Night Goblins Web", "Druchii", "Ogre Hunting Party", "Wood Elves of Athel Loren", "Skaven Clan Skryre"],
        name: "Infiltration",
        type: "Warband Specific",
        timing: ["1"],
        rules: "A Model with this skill is always placed on the battlefield after the opposing warband and can be placed anywhere on the table as long as it is out of sight of the opposing warband and more than 12\" away from any enemy model. If both players have models which infiltrate, roll a D6 for each, and the lowest roll sets up first."
    },
    {
        id: 134,
        category: "Skaven",
        name: "Art of Silent Death",
        type: "Warband Specific",
        timing: ["9", "12"],
        rules: "In hand-to-hand combat, the Skaven can fight with his bare paws without any penalties and counts as having two weapons (ie, +1 attack). In addition, a Skaven Hero with this skill will cause a critical hit on a To Wound roll of 5-6 instead of just 6. This skill may be used in conjunction with the Eshin Fighting Claws (+2 Attacks instead of +1)."
    },
    {
        id: 135,
        category: "Lizardmen",
        name: "Great Hunter",
        type: "Warband Specific",
        timing: ["8"],
        rules: createSkillRuleText("The Skink Great Crest is adept at making the most of the Cover available and imposes an additional -1 to hit the Skink if he is in cover, IE a -2 to hit penalty.", ["Cover"])
    },
    {
        id: 136,
        category: "Shadow Warriors",
        name: "See in Shadows",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("As long as the warrior has movement to reach them, the warrior may always roll to Charge opponents he cannot see (instead of the normal 4\")", ["Charge"])
    },
    {
        id: 137,
        category: "Lizardmen",
        name: "Bellowing Battle Roar",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The Saurus’ roar is so deafening that enemy models in base contact suffer -1 to hit in the first round of combat against them"
    },
    {
        id: 138,
        category: "Lizardmen",
        name: "Toughened Hide",
        type: "Warband Specific",
        timing: ["9"],
        rules: "Through years of battle the Saurus’ hide has become hardened and the Saurus will only be taken out of action on a 6+."
    },
    //Amazon Lustria
    {
        id: 140,
        category: "Amazons (Lustria)",
        name: "Skink Hunter",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("An Amazon with this skill will always Strike First in the first round of combat against Skink models no matter who charged.", ["Strike First"])
    },
    {
        id: 141,
        category: "Amazons (Lustria)",
        name: "Elixir of Life",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Any Amazon with this Elixir can re­roll an Out of Action roll once after the battle accepting the result of the second roll."
    },
    {
        id: 142,
        category: "Amazons (Lustria)",
        name: "Mesmerising Dance",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("Any model fighting in base contact with the Amazon must take a Leadership test at the start of each turn. If they fail they cannot attack that turn but may defend themselves. The dance however is useless against Lizardmen and undead who are immune to their charms.", ["Leadership"])
    },
    {
        id: 143,
        category: "Amazons (Lustria)",
        name: "Savage Fury",
        type: "Warband Specific",
        timing: ["4", "9", "12"],
        rules: createSkillRuleText("Any Amazon model with this skill receives + 1A when performing a Charge and is immune to charm effects and Fear.", ["Charge", "Fear"])
    },
    {
        id: 144,
        category: "Amazons (Lustria)",
        name: "Concealment",
        type: "Warband Specific",
        timing: ["5", "8", "11"],
        rules: createSkillRuleText("When Hiding in jungle terrain all enemy models must halve the range at which they can spot them.", ["Hiding"])
    },
    //Arabian Tomb Raiders
    {
        id: 150,
        category: "Arabian Tomb Raiders",
        name: "Sand Worm",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("The warrior can bury himself in sand and become almost undetectable. The model can perform the Hiding action in open ground. Cannot be used inside buildings.", ["Hiding"])
    },
    {
        id: 151,
        category: "Arabian Tomb Raiders",
        name: "Hit and Run",
        type: "Warband Specific",
        timing: ["4", "7"],
        rules: "The warrior can run and shoot but suffer -2 to hit instead of the -1 to hit for moving."
    },
    {
        id: 152,
        category: "Arabian Tomb Raiders",
        name: "Weather Tolerant",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The warrior has grown so used to the weather it doesn't even affect him anymore. Weather conditions such as heat and such no longer affect this model."
    },
    //Bretonnians
    {
        id: 160,
        category: "Bretonnian Knights",
        name: "Virtue of Purity",
        type: "Warband Specific",
        timing: ["8"],
        rules: "Any spell cast against the knight will be dispelled on the D6 roll of a 4+. This is a natural dispel on account of the knights extreme piety."
    },
    {
        id: 161,
        category: "Bretonnian Knights",
        name: "Virtue of Valor",
        type: "Warband Specific",
        timing: ["9"],
        rules: "If fighting a model with a higher Strength characteristic than himself, the Knight may reroll any failed to hit rolls in hand-to-hand combat."
    },
    {
        id: 162,
        category: "Bretonnian Knights",
        name: "Virtue of Discipline",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Once per game, if the knight is not out of action, Stunned or Knocked Down, you may re-roll a failed Rout test.", ["Rout", "Stunned", "Knocked Down"])
    },
    {
        id: 163,
        category: "Bretonnian Knights",
        name: "Virtue of Noble Disdain",
        type: "Warband Specific",
        timing: ["12"],
        rules: createSkillRuleText("The Knight is subject to Hatred of all enemies armed with shooting weapons.", ["Hatred"])
    },
    {
        id: 164,
        category: "Bretonnian Knights",
        name: "Virue of Impetuous",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("The Knight may add +D3\" to his move when charging. Roll the dice each time you wish to charge and before moving the model.", ["Charge"])
    },
    //Dark Elves and Shadow Warriors and Druchii
    {
        id: 170,
        category: "Dark Elves",
        name: "Fury of Khaine",
        type: "Warband Specific",
        timing: ["10"],
        rules: createSkillRuleText("The Dark Elf may make a 4\" follow up move if he takes all of his opponents Out Of Action. If he comes into contact with another enemy this starts a new combat. This new combat takes place in the following turn and the model counts as have made a Charge. May not follow up in the opponent’s turn.", ["Charge"])
    },
    {
        id: 171,
        category: ["Dark Elves", "Shadow Warriors"],
        name: "Powerful Build",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The warrior is strongly built for an Elf and is capable of feats of strength. A warrior with this skill may choose skills from the Strength table.<br><br>The Sorceress may never take this skill and no more than two warriors in the warband may take this skill at any one time."
    },
    {
        id: 172,
        category: ["Dark Elves", "Druchii", "Lothern Sea Patrol"],
        name: "Fey Quickness",
        type: "Warband Specific",
        timing: ["8", "9"],
        rules: "An Elf with Fey Quickness can avoid melee or missile attacks on a roll of 6. If the Elf also has Step Aside or Dodge this will increase to a 4+ in the relevant area.<br><br>For example, an Elf with Fey Quickness and Step Aside avoids melee attacks on a 4+ and missile attacks on a 6."
    },
    {
        id: 173,
        category: ["Dark Elves", "Druchii"],
        name: "Master of Poisons",
        type: "Warband Specific",
        timing: ["13"],
        rules: "The Dark Elf is proficient in concocting different poisons. If the Hero doesn’t search for rare items, he may make D3-1 doses of Dark Venom instead. There is a chance of getting none, as the hero doesn’t have access to a stable workplace. The poison must be used in the next battle and cannot be sold or traded to other warbands as the Dark Elves guard their secrets very carefully."
    },
    {
        id: 174,
        category: "Shadow Warriors",
        name: "Master of Runes",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Shadow Weaver has learned to harness the power of the High Elven runes of power (see Elven Runestones, below) to a degree few mages attain. When using Elven Runestones, the mage is +1 to his dispel roll. In addition, the mage can inscribe the weapons and armour of one of his fellow warriors with Elven runes. One member of the Warband may reroll a single failed armour save or Parry roll once per battle. After a single battle, the runes lose their glamour and must be redone. This skill may only be taken by Shadow Weavers."
    },
    {
        id: 175,
        category: "Druchii",
        name: "Frenzied Charge",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("The Druchii may make a 4\" follow up move if they take all of their opponents out of action. If the elf comes into contact with another enemy, this starts a new combat. This new combat takes place in the following turn and the model counts as if having made a Charge.", ["Charge"])
    },
    {
        id: 176,
        category: "Druchii",
        name: "Marksman of Naggaroth",
        type: "Warband Specific",
        timing: ["7"],
        rules: "Eyes of this hero are so keen and hands so steady that he can completely omit the penalty for long range if using a crossbow type weapon. Further, if he did not move this turn, he can shoot from repeater crossbow twice per turn without penalty or three times per turn with -1 penalty to hit."
    },
    {
        id: 177,
        category: "Druchii",
        name: "Will to Survive",
        type: "Warband Specific",
        timing: ["13"],
        rules: createSkillRuleText("If the model gets out of action and result of the Serious Injuries roll is death, make a Leadership test against unmodified Ld of the model (no holy relics etc.). If you succeed, the model will survive but will miss D3 battles instead.", ["Leadership"])
    },
    {
        id: 178,
        category: "Druchii",
        name: "Keen Sight",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("This elf can spot enemies Hiding from twice as far away than normal warriors (i.e. twice his Initiative value in inches).", ["Hiding"])
    },
    //Hochland Bandits and Horned Hunters and Shadow Warriors
    {
        id: 180,
        category: "Hochland Bandits",
        name: "Banditry",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Instead of searching for Rare equipment, the hero may engage in banditry - roll a D6, on a result of 2-6, the banditry is successful and the hero adds D6+1 gold to the warband's stash. However, on a result of 1, the attempted robbery has somehow gone wrong - roll on the Serious Injury table for the bandit, as if he had been taken Out of Action in the last game. If several heroes have this skill, it is quite possible that some are successful and some not in their Banditry attempt between games. This skill may not be combined with the Huckster's Slick Operator special ability."
    },
    {
        id: 181,
        category: ["Hochland Bandits", "Horned Hunters", "Shadow Warriors"],
        name: "Hide in Shadows",
        type: "Warband Specific",
        timing: ["5", "8"],
        rules: createSkillRuleText("An enemy warrior attempting to detect this warrior when he is Hiding must halve his Initiative (round up) before measuring the distance.", ["Hiding"])
    },
    {
        id: 182,
        category: "Hochland Bandits",
        name: "Jump Back",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("This warrior is an expert at getting himself out of sticky situations. If the warrior is in close combat with an enemy warrior (and not Knocked Down or Stunned) at the start of his Movement Phase, he may attempt to jump out of combat.<br><br>To attempt to do so, the warrior must make an Initiative Test. If he fails the test, the warrior will automatically strike last in that round of combat. However, if he passes, immediately move him 1\" away from the enemy warrior (this does not count against his movement for that Movement Phase); he may then move and otherwise act normally for the test of that that turn (even make a Charge back into combat if he chooses!).", ["Knocked Down", "Stunned", "Initiative Test", "Charge"])
    },
    {
        id: 183,
        category: ["Hochland Bandits", "Shadow Warriors"],
        name: "Sniper",
        type: "Warband Specific",
        timing: ["7"],
        rules: createSkillRuleText("When Hiding, the warrior may cast spells or shoot and still remain Hidden. Note that the bandit may not use this skill if he is shooting a Blackpowder weapon!", ["Hiding"])
    },
    {
        id: 184,
        category: "Hochland Bandits",
        name: "Throw Voice",
        type: "Warband Specific",
        timing: ["5", "8"],
        rules: createSkillRuleText("This rogue has mastered the art of misdirecting enemies who get too close by making them hear noises or voices some distance from his location. If an enemy warrior is attempting to detect the bandit while he is Hiding, roll a D6 - on a result of 4 or better, the bandit is undetected and remains Hidden.", ["Hiding"])
    },
    //Norse Explorer
    {
        id: 190,
        category: "Norse Explorer",
        name: "Barbarian Rage",
        type: "Warband Specific",
        timing: ["2", "9"],
        rules: createSkillRuleText("This hero never needs to take All-Alone tests and may re-roll failed Fear tests.", ["All-Alone", "Fear"])
    },
    {
        id: 191,
        category: "Norse Explorer",
        name: "Battle Tongue",
        type: "Warband Specific",
        timing: ["12"],
        rules: "Only a hero with the leader skill may gain this skill. It allows models within 12\" of him to use his leadership, rather than the normal 6\"."
    },
    {
        id: 192,
        category: "Norse Explorer",
        name: "Berserk Charge",
        type: "Warband Specific",
        timing: ["10"],
        rules: createSkillRuleText("The Norse are very skilled with weapons that many other races see as primitive and savage. When this hero is armed with an axe or double handed weapon, he may re-roll all failed to hit rolls when he performs a Charge.", ["Charge"])
    },
    {
        id: 193,
        category: "Norse Explorer",
        name: "Crushing Blow",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("No enemy may Parry an attack made by this hero because it strikes with such great power that it pushes right through a buckler or sword.", ["Parry"])
    },
    {
        id: 194,
        category: "Norse Explorer",
        name: "Shield Master",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("When this hero is armed with a shield he may Parry with it in addition to getting a 6+ save.", ["Parry"])
    },
    //Pirates
    {
        id: 200,
        category: "Pirate",
        name: "Sea Shanty Singer",
        type: "Warband Specific",
        timing: ["10"],
        rules: createSkillRuleText("At the start of his Close Combat phase he can suddenly burst out in song, distracting one opponent in base contact of his choosing. That enemy must pass a Leadership test, or loose 1 Attack that turn. This does not effect Undead or other non-living creatures, such as Possessed.", ["Leadership"])
    },
    {
        id: 201,
        category: "Pirate",
        name: "Sea Legs",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: createSkillRuleText("If he Falls during a battle, he may ignore the effects of the D3 hits on a roll of 4+ (make a single roll to see if the any of the hits take effect or not). In addition, if he is Knocked Down or Stunned within 1\" of a precipice he may re-roll his Initiative Test to see if he falls down or not (Falling).", ["Initiative Test", "Knocked Down", "Stunned", "Falling"])
    },
    {
        id: 202,
        category: "Pirate",
        name: "Cutlass Master",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("If the pirate is equipped with a Sword, this skill will give him the additional benefit of also being able to Parry successfully if the player rolls equal to number rolled to hit, not just higher as normal. This extra ability only apply if the Pirate is not in the open; ie., only when in cover or in a building, within 2\" of a terrain feature like a wall or tree, etc.", ["Parry"])
    },
    {
        id: 203,
        category: "Pirate",
        name: "Booming Voice",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Captain only<br><br>Once per turn, the captain may shout encouraging words (or threats) at any one pirate within 8\" who just failed his Leadership Test to see if he runs away from combat, or to stop running away if he was already fleeing. That pirate may then re-roll the test. This can only be done if the Captain is on his feet, but not if the Captain is in close combat himself.", ["Leadership"])
    },
    {
        id: 204,
        category: "Pirate",
        name: "Hardy Constitution",
        type: "Warband Specific",
        timing: ["9"],
        rules: "During the battle, the pirate may ignore any Critical Hits on a roll of 5+ (the wound is treated as normal if the roll is successful). If the roll is failed, the Critical Hit is worked out as normal."
    },
    {
        id: 205,
        category: "Pirate",
        name: "Swashbuckler",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("The pirate may make a Leadership Test at the end of any Hand-to-Hand phase (pirate’s or enemy’s turn) if he is still in base contact with any enemy models. If he passes he may make a normal movement away from the enemy (he may not run or charge), without the enemy striking any blows on him. If he fails the test he remains in combat and must fight as normal in the following turn.", ["Leadership"])
    },
    //Pit Fighters
    {
        id: 210,
        category: "Pit Fighters",
        name: "Bulging Biceps",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The Pit Fighter may ignore the entire ‘heavy’ weapons special rule penalty. The Strength bonus will now apply to all rounds in Close-Combat. So a Morning Star will give +1 Strength in all turns not only the first one."
    },
    {
        id: 211,
        category: "Pit Fighters",
        name: "Force of Will",
        type: "Warband Specific",
        timing: ["9"],
        rules: "When the Pit Fighter loses his last wound and is taken Out-of-Action, he must roll a D6 equal to or under his Toughness. Each following round he has to roll again on his toughness but then with a -1 modifier for each subsequent round. If he succeeds he gets up and may continue to fight. When he gets taken Out-of-Action a second time he’ll be removed as normal."
    },
    {
        id: 212,
        category: "Pit Fighters",
        name: "Arms Master",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Pit Fighter may now ignore all ‘difficult to use’ rules for all weapons. This enables him to combine certain types of weapons. He can combine a Morning Star with a buckler, or even a Morning Star with a Morning Star."
    },
    {
        id: 213,
        category: "Pit Fighters",
        name: "Body Slam",
        type: "Warband Specific",
        timing: ["4", "10"],
        rules: createSkillRuleText("Instead of making a normal Charge, the Pit Fighter may attempt to slam his opponent to the ground. Instead of making his normal attacks the Pit Fighter may make a single attack resolved as following: +1 Str, +1 to Hit, no weapon bonuses or abilities. Critical hit on a 5+.", ["Charge"])
    },
    {
        id: 214,
        category: "Pit Fighters",
        name: "Grizzled Vetran",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Pit Fighter is immune to all psychology."
    },
    //Skaven of Clan Pestilens
    {
        id: 220,
        category: "Skaven of Clan Pestilens",
        name: "Censer Bearer",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: createSkillRuleText("Only a Clan Pestilens member with the Black Hunger special skill may choose the Censer Bearer special skill.<br><br>A Clan Pestilens member with this skill is called Censer Bearer. He gains the special rule Frenzy and the only weapon he may use in close combat is a censer.", ["Frenzy"])
    },
    {
        id: 221,
        category: "Skaven of Clan Pestilens",
        name: "Rotten Body",
        type: "Warband Specific",
        timing: ["12", "13"],
        rules: "A Clan Pestilens member is now immune to poison and diseases and, if taken out of action because of a failed test by wielding a censer, he will not have to roll for injuries at the end of the battle, recovering automatically."
    },
    {
        id: 222,
        category: "Skaven of Clan Pestilens",
        name: "Contagious",
        type: "Warband Specific",
        timing: ["9"],
        rules: "Only a Clan Pestilens member with the Rotten Body special skill may choose the Contagious special skill.<br><br>A model who inflicts an injury in close combat that send the contagious member of the Clan Pestilens out of acion must take a Toughness test. Roll a D6. If the result is higher than the Toughness of the model taking the test, he will suffer an automatic wound. A result of 6 always inflicts a wound. Models of undead and possessed never take this test."
    },
    {
        id: 223,
        category: "Skaven of Clan Pestilens",
        name: "Ignore Pain",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("Only a Clan Pestilens member with the Resilient strength skill may choose the Ignore Pain special skill.<br><br>A Clan Pestilens member with this skill treats Stunned injuries as Knocked Down.", ["Stunned", "Knocked Down"])
    },
    //Battle Monks of Cathay
    {
        id: 230,
        category: "Battle Monks of Cathay",
        name: "Energy Focus",
        type: "Warband Specific",
        timing: ["9"],
        rules: "If fighting unarmed, the Hero may choose to reduce his Attacks by –1 and thus gain +1 Strength in close combat.<br>The monk may sacrifice any number of attacks this way."
    },
    {
        id: 231,
        category: "Battle Monks of Cathay",
        name: "Lightning Speed",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("The monk may triple his Movement whilst running or making a Charge and may run even when there are enemy models within 8”.", ["Charge"])
    },
    {
        id: 232,
        category: "Battle Monks of Cathay",
        name: "Leap of Faith",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("The Hero cannot be intercepted whilst performing a Charge.<br>He may escape from combat (as described on p. 161 in the Mordheim rulebook) by leaping away without having to pass a Leadership Test and may declare a leaping charge at the same time in the same turn.", ["Charge", "Leadership"])
    },
    {
        id: 233,
        category: "Battle Monks of Cathay",
        name: "Human Shield",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("If two or more models are engaged in close combat with the monk, he may choose to grab one to use it as a shield instead of his normal attacks. To do this, he must pass an Initiative Test after the first model has attacked, but before the second model attacks. On a successful roll, the monk grabs the first model – the second model directs its full attacks on the friendly model. After the combat phase, the model breaks free and the battle goes on as usual. On a failed roll, the monk and the second model use their normal attacks.", ["Initiative Test"])
    },
    {
        id: 234,
        category: "Battle Monks of Cathay",
        name: "Warmonger",
        type: "Warband Specific",
        timing: ["1"],
        rules: createSkillRuleText("The Emissary may make a Leadership Test before the battle. If the test is successful, D3+1 Raging Peasants join the warband for the next game (this may exceed the maximum number of warriors). Each Raging Peasant in the warband is subject to Hatred for the duration of the battle.", ["Leadership", "Hatred"])
    },
    //Bretonnian Chapel Guard
    {
        id: 240,
        category: "Bretonnian Chapel Guard",
        name: "Renowned virtue",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Knight may learn one Virtue from the original Bretonnian Warband list, written by Tom Merrigan. The “Renowned Virtue” skill may only be taken once.<br><br>Select one of the Virtue skills from the list instead of this skill."
    },
    {
        id: 241,
        category: "Bretonnian Chapel Guard",
        name: "Questing Vow",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: createSkillRuleText("Questing Knight only. If the knight is performing a Charge at, charged by, or in combat with a fear-causing enemy, they may reroll any Leadership Test they take once, accepting the second result. This includes Rout tests.", ["Leadership", "Rout", "Fear", "Charge"])
    },
    {
        id: 242,
        category: "Bretonnian Chapel Guard",
        name: "Shield Bash",
        type: "Warband Specific",
        timing: ["9"],
        rules: "Each turn, the Knight may make an additional attack with a shield or kite shield, which is made at -1 Strength. Treat the shield attack as a club."
    },
    {
        id: 243,
        category: "Bretonnian Chapel Guard",
        name: "Bulging Muscles",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The Knight retains the +1/+2 Strength bonus from Flails and Morning Stars after the first round of combat."
    },
    {
        id: 244,
        category: "Bretonnian Chapel Guard",
        name: "Untiring",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: "The Knight ignores movement penalties for wearing armour while on foot. In addition, strength, axes, critical hits, and similar modifiers cannot reduce the saving throw lower than 5+, nor will it be ignored by any non-magical means."
    },
    {
        id: 1715,
        category: "Bretonnian Chapel Guard",
        name: "Virtue of Purity",
        type: "Warband Specific",
        timing: ["8"],
        rules: "Select this instead of Renowned Virtue.<br><br>Any spell cast against the knight will be dispelled on the D6 roll of a 4+. This is a natural dispel on account of the knights extreme piety."
    },
    {
        id: 1716,
        category: "Bretonnian Chapel Guard",
        name: "Virtue of Valor",
        type: "Warband Specific",
        timing: ["9"],
        rules: "Select this instead of Renowned Virtue.<br><br>If fighting a model with a higher Strength characteristic than himself, the Knight may reroll any failed to hit rolls in hand-to-hand combat."
    },
    {
        id: 1717,
        category: "Bretonnian Chapel Guard",
        name: "Virtue of Discipline",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Select this instead of Renowned Virtue.<br><br>Once per game, if the knight is not out of action, Stunned or Knocked Down, you may re-roll a failed Rout test.", ["Rout", "Stunned", "Knocked Down"])
    },
    {
        id: 1718,
        category: "Bretonnian Chapel Guard",
        name: "Virtue of Noble Disdain",
        type: "Warband Specific",
        timing: ["12"],
        rules: createSkillRuleText("Select this instead of Renowned Virtue.<br><br>The Knight is subject to Hatred of all enemies armed with shooting weapons.", ["Hatred"])
    },
    {
        id: 1719,
        category: "Bretonnian Chapel Guard",
        name: "Virue of Impetuous",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("Select this instead of Renowned Virtue.<br><br>The Knight may add +D3\" to his move when charging. Roll the dice each time you wish to charge and before moving the model.", ["Charge"])
    },

    //The Cursed Cavalcade
    {
        id: 250,
        category: "The Cursed Cavalcade",
        name: "Noblesse Obliges",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: createSkillRuleText("The Warrior does not Fear any fear-causing creatures and can stomp opponents who are knocked down with is ironshod boots. This gives them additional attack against Knocked Down opponents at their own Strength.", ["Fear", "Knocked Down"])
    },
    {
        id: 251,
        category: "The Cursed Cavalcade",
        name: "Torturer",
        type: "Warband Specific",
        timing: ["9"],
        rules: "As soon as the model rolls to wound any enemy successfully in melee combat (even of the subsequent armour save is successful though parries can negate this effect) the opponent loses 1 point of Strength permanently for the duration of the battle as the pain from the wound causes agony. The effect is accumulative and can reduce the Strength of the target to a minimum of 1.<br><br>The Undead are immune to this effect."
    },
    {
        id: 252,
        category: "The Cursed Cavalcade",
        name: "Duelist",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("At the end of each Close Combat phase, the Duelist can force any non-large opponent he is fighting one-on-one 2\" at the direction of his choosing if the target fails to roll under its strength value. If this brings the target in contact with another model, both suffer an automatic Strength 2 hit. If this pushes the opponent off from a high place, then he falls and takes Falling damage as normal. The duelist stays on the elevated area.", ["Falling"])
    },
    //Maneaters and Ogre Hunting Party
    {
        id: 260,
        category: "Maneaters",
        name: "Master of Arms",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Ogre may now wield a Difficult to Use weapon and a hand weapon at the same time, but not two Difficult to Use weapons."
    },
    {
        id: 261,
        category: ["Maneaters", "Hunting Party"],
        name: "Crude Belch",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("A Hero with this 'condition' may unleash his thunderous fumes on all enemies engaged in close combat. Those that do not pass a Leadership Test suffer a –1 ‘to hit’ modifier for the turn. The Ogre must wait until a new enemy engages him in combat before he relieves himself again.", ["Leadership"])
    },
    {
        id: 262,
        category: ["Maneaters", "Hunting Party"],
        name: "Bull Charge",
        type: "Warband Specific",
        timing: ["4", "10"],
        rules: createSkillRuleText("When performing a Charge, an Ogre with this skill may attempt a single attack with a +1 ‘to hit’ modifier rather than making his normal attacks. If successful the enemy model is automatically Knocked Down.", ["Knocked Down", "Charge"])
    },
    {
        id: 263,
        category: "Maneaters",
        name: "Dog of War",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The band can now hire those Hired Swords available for Mercenaries.<br><br>This skill may only be taken by the leader and if he dies all Hired Swords are removed from the warband."
    },
    {
        id: 264,
        category: ["Maneaters", "Hunting Party"],
        name: "Maneater",
        type: "Warband Specific",
        timing: ["12"],
        rules: "This Ogre may immediately learn one skill from the Shooting or Academic skill lists. This skill may be taken only once and may not be taken by the Guide."
    },
    {
        id: 265,
        category: "Ogre Hunting Party",
        name: "Scent Hound",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("The hero spots enemies Hiding from two times as far away as other warriors (ie, twice his Initiative value in inches).", ["Hiding"])
    },
    {
        id: 266,
        category: "Ogre Hunting Party",
        name: "Sabre Trainer",
        type: "Warband Specific",
        timing: ["4"],
        rules: "Whenever a Sabretusk cub rolls a 1 for Untamed, if it started the turn within 6\" of this hero, you may move the cub 3D6” towards any model within 12” of it that it can see (instead of towards the nearest model"
    },
    {
        id: 267,
        category: "Ogre Hunting Party",
        name: "Set Traps",
        type: "Warband Specific",
        timing: ["12"],
        rules: createSkillRuleText("A Trapper may set a trap if he spends a turn doing nothing else (he may not set traps if he's just recovered from being Knocked Down).<br>Place a marker in base contact with the Trapper.<br>When another model, friend or foe, moves within 2\" of the marker he risks setting off the trap: roll a D6. On a score of 3+ he has triggered the trap and suffers a S4 hit (note that the Trapper won't trigger his own traps).<br>If the trap did not wound the model, the injured model has multiple wounds, or it didn't trigger, the 'victim' may finish his move- However, if the model was knocked Down or Stunned, place him 2\" from the marker. Regardless whether the trap was triggered or not, the marker is removed.<br><br>Gnoblar only.", ["Knocked Down", "Stunned"])
    },
    {
        id: 268,
        category: "Ogre Hunting Party",
        name: "Netter",
        type: "Warband Specific",
        timing: ["1"],
        rules: "Each game, the hero starts with 3 Nets. These may not be sold, traded, or given to another warrior. If not used during the game, they assumed to be stashed away or fallen apart. The next game, the hero will start with 3 nets, without penalty or cost.<br><br>Gnoblar only"
    },
    //Marauders of Chaos
    {
        id: 270,
        category: "Marauders of Chaos",
        name: "Chosen of Chaos",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Hero uses the maximum profile for Warriors of Chaos and the Hero equipment list (if he does not already)."
    },
    {
        id: 271,
        category: "Marauders of Chaos",
        name: "Tattooed Body",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Only the warband's leader may have this skill.<br><br>The Hero's body is covered with unholy Chaos signs to attract his patron's attention. The Eye of the Gods special rule's effect (of becoming a Chaos Spawn or receiving a Mark) happens on a result of 10+ instead of 12+ only. Note that for the less favoured Norse leaders this is 11+."
    },
    {
        id: 272,
        category: "Marauders of Chaos",
        name: "Sweeping Blow",
        type: "Warband Specific",
        timing: ["9"],
        rules: "Whenever the Hero takes an enemy model out of action using a double-handed weapon he may immediately make an additional attack against another model in base contact.<br><br>Requires the Strongman skill."
    },
    {
        id: 273,
        category: "Marauders of Chaos",
        name: "Mutant",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Hero may buy one mutation.See the Mutations section of the Possessed on special rules.<br><br>Heroes with the Mark of Onogal may choose a Blessing of Nurgle instead except the Mark of Nurgle. Note that unlike other skills Marauder Heroes may take this skill more than once."
    },
    {
        id: 274,
        category: "Marauders of Chaos",
        name: "Heart of the Warrior",
        type: "Warband Specific",
        timing: ["2", "9"],
        rules: createSkillRuleText("Only the warband’s leader may have this skill.<br><br>He may re-roll any failed Rout Test and is immune to Fear and All Alone tests.", ["Rout", "Fear", "All-Alone"])
    },
    //Merchant Caravans  
    {
        id: 280,
        category: "Merchant Caravans",
        name: "Bribery",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Whenever the warband has to take a Rout Test, the Merchant may talk his hirelings into staying a little longer and face the danger. He may immediately pay 5 gc per non-Hero warband member (including Hired Swords!) still in the game. If he does, one member taken out of action already does not count for Rout Tests. If after that, a Rout Test is still required, test as normal. This skill may be used as many times as required so long as the coffers aren’t empty!", ["Rout"])
    },
    {
        id: 281,
        category: "Merchant Caravans",
        name: "Dubious Income",
        type: "Warband Specific",
        timing: ["13"],
        rules: createSkillRuleText("The Merchant has set up an underground business that proves to be quite profitable.<br>After every battle in which the Merchant was not taken out of action, he may choose to use this skill before the trading phase (i.e. before any gold is spent). If he does, he must pass a Leadership Test.<br>If the test is successful, the warband receives one gold coin per Experience point the Merchant has.<br>If the test is failed, the warband loses up to the same amount of gold coins.", ["Leadership"])
    },
    {
        id: 282,
        category: "Merchant Caravans",
        name: "Wholesale",
        type: "Warband Specific",
        timing: ["13"],
        rules: "The Merchant is known for buying items in greater numbers and so is especially welcome at the other merchants. He may search for D3+1 rare items after each battle instead of one item only (if he was not taken out of action, of course!)."
    },
    {
        id: 283,
        category: "Merchant Caravans",
        name: "Deal Breaker",
        type: "Warband Specific",
        timing: ["13"],
        rules: "When trying to sell items through the Trade special rule, the Merchant gets a +1 bonus on the roll to see what the item would fetch."
    },
    {
        id: 284,
        category: "Merchant Caravans",
        name: "Connected",
        type: "Warband Specific",
        timing: ["13"],
        rules: createSkillTable(
            "The Merchant knows many retailers and ways of getting hold of rare items. Instead of searching for rare items as normal, he may visit the local black market and its fencers. If he does, he may search for items from the following table, applying the normal rules.",
            ["Item", "GC Cost", "Availability", "Source"],
            [
                { cells: ["Dispel Scroll", "50+4D", "Rare 12", "Mordheim Annual 2002, p. 31"] },
                { cells: ["Lesser Artifact", "200+D6x15", "Rare 16", "roll on the Lesser Artefacts table"] },
                { cells: ["Magical Artifact", "350+D6x25", "Rare 18", "roll on the Magical Artefact Table from the Mordheim rulebook"] },
                { cells: ["Magical Scroll", "100", "Rare 14", "roll on the Magical Scroll Artefact table"] }
            ]
        )

    },
    //Night Goblins
    {
        id: 290,
        category: "Night Goblins",
        name: "Ded Shooty",
        type: "Warband Specific",
        timing: ["7"],
        rules: "The clever little git adds +6\" to the range of any missile weapons he uses (not including nets)"
    },
    {
        id: 291,
        category: "Night Goblins",
        name: "Sneaky Git",
        type: "Warband Specific",
        timing: ["2"],
        rules: "The greenskin is so sneaky that he can move D3 of his warband members after all other deployment is complete. Night Goblin Big Boss only."
    },
    {
        id: 292,
        category: "Night Goblins",
        name: "Netter",
        type: "Warband Specific",
        timing: ["4", "10"],
        rules: createSkillRuleText("The goblin may declare that he is making a net Charge. He throws the net at a target in the same way as described in the Mordheim rulebook.<br>If he hits and the target fails to escape the net then target counts as Knocked Down and the goblin completes his charge.<br>If he misses or the target escapes then the goblin makes a failed charge.<br>If the failed charge would take him into base contact then stop him 1\" away.<br>A warrior who is caught in a net will be automatically hit in combat.<br>The goblin must still roll to wound just as with a knocked down enemy.<br>In the warrior's next recovery phase, unless he is Stunned or Out of Action he will cut himself out of the net but cannot do anything else and will go last in combat just as if he had stood up from being knocked down.", ["Charge", "Knocked Down", "Stunned"])
    },

    //The Restless Dead
    {
        id: 410,
        category: "The Restless Dead",
        name: "Corpse Bomb",
        type: "Warband Specific",
        timing: ["2", "9"],
        rules: "Special magics and rituals can cause a Zombie to explode when they are near the enemy. Secretly nominate one Zombie at the beginning of the battle to be a Corpse Bomb. If the enemy charges or is charged by the Zombie, it immediately detonates. All models within D6 inches take D3 Strength 4 hits. The detonated Zombie may never be used again as it is splattered in a million pieces! Corpse bombs killed by shooting do not detonate.<br><br>Only one Zombie at a time can be a corpse bomb although the skill can be taken by both the Necromancer and the Liche."
    },
    {
        id: 411,
        category: "The Restless Dead",
        name: "Deathspeaker",
        type: "Warband Specific",
        timing: ["1"],
        rules: "At the start of the battle, the undead player may deploy D3 Zombies for free. These zombies do not count towards the maximum number of models in the warband, but increase the warband’s rating as normal. Zombies created in this way may not be used as Corpse Bombs. These Zombies only last for the duration of the battle."
    },
    {
        id: 412,
        category: "The Restless Dead",
        name: "Wraith Touch",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The hero may make a Wraith Touch attack instead of their normal attacks in close combat. The hero making a Wraith Touch makes a single unarmed attack, if it hits, it wounds automatically, all rules that apply to unarmed attacks apply to the Wraith Touch. If a Liche uses this skill and wounds, then he may regain one lost wound. This may not take the hero beyond his starting total.<br><br>Necromancers do not regain wounds with this skill.<br><br>This skill has no effect on the Possessed or Undead."
    },
    {
        id: 413,
        category: "The Restless Dead",
        name: "Forbidden Rite",
        type: "Warband Specific",
        timing: ["1", "13"],
        rules: "If the hero with this skill did not search for rare items during their last exploration phase, then they start the next battle with a pool of D3+1 (+1) modifiers they can use to increase their casting rolls. They may use as many of these modifiers at a time as they desire."
    },
    {
        id: 414,
        category: "The Restless Dead",
        name: "Summoner",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The maximum warband size is increased by 1."
    },
    //Cult of Morr Dreamwalkers
    {
        id: 510,
        category: "Dreamwalkers, Cult Of Morr",
        name: "Insipring Presence",
        type: "Warband Specific",
        timing: ["2"],
        rules: "Morr Worshwishpers can use the dreamer's lead if they are 12\" away instead of the usual 6\".<br><br>(Only for Dreamer)."
    },
    {
        id: 511,
        category: "Dreamwalkers, Cult Of Morr",
        name: "Fanatical",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Once per game, if the Dreamer is not out of action, Stunned or Knocked Down, you may re-roll a failed Rout test.<br><br>(Only for Dreamer).", ["Stunned", "Knocked Down", "Rout"])
    },
    {
        id: 512,
        category: "Dreamwalkers, Cult Of Morr",
        name: "Inured to Horror",
        type: "Warband Specific",
        timing: ["4", "9"],
        rules: createSkillRuleText("The model is immune to Fear, and need never take All-Alone tests.", ["Fear", "All-Alone"])
    },
    {
        id: 513,
        category: "Dreamwalkers, Cult Of Morr",
        name: "Blessed by Morr",
        type: "Warband Specific",
        timing: ["8"],
        rules: "Any spell that could affect the model is nullified with a D6 roll of +4 when fighting the undead. Note that if the spell is nullified, it does not affect this model, but it does affect any other model as it normally would."
    },
    //Grave Robbers
    {
        id: 610,
        category: "Grave Robbers",
        name: "Darkstalker",
        type: "Warband Specific",
        timing: ["2", "4"],
        rules: createSkillRuleText("The warrior is accustomed to darkness and has almost cat-like sight. Ignores All-Alone tests and may double his Initiative when looking for Hiding models.", ["All-Alone", "Hiding"])
    },
    {
        id: 611,
        category: "Grave Robbers",
        name: "Instinctual Violence",
        type: "Warband Specific",
        timing: ["5", "11"],
        rules: createSkillRuleText("When charged by any Undead models, he does not have to take a Fear test. Additionally, he may nominate one of his attacks to Strike First.", ["Fear", "Strike First"])
    },
    {
        id: 612,
        category: "Grave Robbers",
        name: "DeAnimator",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("The warrior is adept at fighting animated corpses. He ignores the No Pain rule for Undead and may stun (Stunned) them as normal.", ["Stunned"])
    },
    {
        id: 613,
        category: "Grave Robbers",
        name: "Hardy Constitution",
        type: "Warband Specific",
        timing: ["12"],
        rules: "Veteran of many grave-robbing escapades, the warrior is completely immune to all diseases and poisons."
    },
    {
        id: 614,
        category: "Grave Robbers",
        name: "Body Dealer",
        type: "Warband Specific",
        timing: ["13"],
        rules: "This warrior is skilled at salvaging the bodies of the dead for profit. On a 4+, you may recover the body (and gear) of a friendly model slain in the Serious Injury phase. You may also attempt to do the same for enemy models by comparing Initiative rolls between the Body Dealer and enemy leader (or their most experienced model). On a tie, nothing is recovered; if the enemy wins, your Body Dealer is captured."
    },
    //Halflings
    {
        id: 710,
        category: "Halflings",
        name: "Quiet as a Mouse",
        type: "Warband Specific",
        timing: ["5"],
        rules: createSkillRuleText("Enemy warriors must use half their initiative value in inches (rounded down) when trying to detect this Hiding halfling.", ["Hiding"])
    },
    {
        id: 711,
        category: "Halflings",
        name: "Crude Belch",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("During the first round of hand to hand combat the halfling can release his noxious fumes upon all enemies within base contact. All enemies effected must take a Leadership Test. If the leadership test is failed then the putrid odor has severely affected the warrior's fighting ability and he must miss his first attack (regardless of whether he has only one attack or not).", ["Leadership"])
    },
    {
        id: 712,
        category: "Halflings",
        name: "Wizened Halfling",
        type: "Warband Specific",
        timing: ["2", "9", "12"],
        rules: createSkillRuleText("Leader Only. All halflings may also re-roll any failed Leadership test when within 6\" of the leader as well as using his leadership for both tests.", ["Leadership"])
    },
    {
        id: 713,
        category: "Halflings",
        name: "Stealthy Hafling",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("Thieves Only.<br><br>The Halfling Thief can hide (Hiding) even after running, and can run while within 8\" of enemy models if he starts and ends his move hidden.", ["Hiding"])
    },
    {
        id: 714,
        category: "Halflings",
        name: "Skilled Huntsman",
        type: "Warband Specific",
        timing: ["7"],
        rules: createSkillRuleText("When shooting from Hiding roll D6. On a 3+ the Halfling has managed to keep his actions inconspicuous to the eye of the enemy and may remain hidden that turn.<br><br>Note this skill may not be combined with black powder weapons, they are just too noisy!", ["Hiding"])
    },
    {
        id: 715,
        category: "Halflings",
        name: "Layers of Fat",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The Halfling always has a basic saving throw of 6 regardless of the enemy warrior's strength and on top of any armour he already wears."
    },
    {
        id: 716,
        category: "Halflings",
        name: "Shifty",
        type: "Warband Specific",
        timing: ["5", "11"],
        rules: createSkillRuleText("The halfling gains a bonus attack when charged that Strike First.", ["Strike First"])
    },
    //Masters of Horror
    {
        id: 910,
        category: "Masters Of Horror",
        name: "Surgeon",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Reroll one dice of a single injury roll. You must accept the second roll."
    },
    {
        id: 911,
        category: "Masters Of Horror",
        name: "Alchemist",
        type: "Warband Specific",
        timing: ["1"],
        rules: createRuleTable(
            "Roll a D6 at game-start and consult table.",
            ["D6", "Potion", "Effect"],
            [
                { cells: ["1", "Potion of Resilience", "Add +1 to Toughness for duration of game."] },
                { cells: ["2", "Brew of Strength", "Add +1 to Strength for duration of game."] },
                { cells: ["3-4", "Quicksilver", "Add +1 to Movement for duration of game."] },
                { cells: ["5", "Backley’s Brew", "Remove -1 from both Strength and Initiative until a Toughness test is passed"] },
                { cells: ["6", "Aberrantius Vigortia", "Adds +1 to both Strength and Toughness. Highly addictive. Roll D6 after battle. On 5+, Scientist becomes addicted and will not engage in any other activity during a game until he has had his Aberrantius Vigortia potion. He will stand and brew potions until a 6 is rolled"] }
            ]
        )
    },
    {
        id: 912,
        category: "Masters Of Horror",
        name: "Apt Revitalist",
        type: "Warband Specific",
        timing: ["12"],
        rules: "Any zombies within the warband now gain exp as normal human henchmen."
    },
    {
        id: 913,
        category: "Masters Of Horror",
        name: "Lunatic",
        type: "Warband Specific",
        timing: ["2", "5", "9"],
        rules: createSkillRuleText("The model causes Fear and may reroll any Leadership Test.", ["Fear", "Leadership"])
    },
    //The Soul Stealers Necrarchs
    {
        id: 1001,
        category: "Necrarchs, the Soul Stealers",
        name: "Pupil of Nagash",
        type: "Warband Specific",
        timing: ["12"],
        rules: "The Necrarch Vampire may roll immediately on the Scrolls of Nagash for a spell, and choose to do so again instead of a future Skill."
    },
    {
        id: 1002,
        category: "Necrarchs, the Soul Stealers",
        name: "Master of the Black Arts",
        type: "Warband Specific",
        timing: ["7"],
        rules: "Such is the power of the Necrarch that the range of all his magical workings is extended by half-again."
    },
    {
        id: 1003,
        category: "Necrarchs, the Soul Stealers",
        name: "Pull of Undeath",
        type: "Warband Specific",
        timing: ["9"],
        rules: "As long as the Necrarch is within 4 inches of an undead henchman, they may only be taken Out of Action on a roll of a natural 6.<br><br>Available only to the Leader."
    },
    //Protectorate of Sigmar
    {
        id: 1100,
        category: "Protectorate Of Sigmar",
        name: "Protection of Sigmar",
        type: "Warband Specific",
        timing: ["8"],
        rules: "Any spell which would affect him is nullified on a D6 roll of 4+.<br><br>Note that if the spell is nullified it will not affect any other models either."
    },
    {
        id: 1101,
        category: "Protectorate Of Sigmar",
        name: "Unshakeable Faith",
        type: "Warband Specific",
        timing: ["3", "9"],
        rules: createSkillRuleText("When the opportunity arises to smite evil, one must be able to strike! As such, the warrior is hardened and immune to Fear.", ["Fear"])
    },
    {
        id: 1102,
        category: "Protectorate Of Sigmar",
        name: "Utter Determination",
        type: "Warband Specific",
        timing: ["2"],
        rules: createSkillRuleText("Only the Warrior Priest may have this skill, which allows him to re-roll any failed Rout tests.", ["Rout"])
    },
    {
        id: 1103,
        category: "Protectorate Of Sigmar",
        name: "Rousing Sermon",
        type: "Warband Specific",
        timing: ["2"],
        rules: "A Rousing Sermon must be declared at the beginning of a player’s turn. The Warrior Priest and all friendly models within 6\" gain +1 attack during that Hand to Hand combat phase.<br><br>There may only be one Rousing Sermon per game."
    },
    {
        id: 1104,
        category: "Protectorate Of Sigmar",
        name: "Sigmars Guidance",
        type: "Warband Specific",
        timing: ["7"],
        rules: "He may freely choose his target, and not only the closest enemy when declaring ranged attacks."
    },
    //Skaven of Clan Moulder
    {
        id: 1200,
        category: "Skaven of Clan Moulder",
        name: "Beastkin",
        type: "Warband Specific",
        timing: ["12"],
        rules: "*A Clan Moulder hero with this skill has developed such an affinity for the horrific creatures under their dominion that the range at which any Beast/Animal Handling skills operate is doubled to 12\". This applies to any and all such skills the character has and any they take in future."
    },
    {
        id: 1201,
        category: "Skaven of Clan Moulder",
        name: "Hypnotic Musk",
        type: "Warband Specific",
        timing: ["5"],
        rules: createSkillRuleText("Any animal or beast from an opposing warband wishing to Charge him must pass a Leadership test to do so unless said charge is the result of Goading. Mounts are assumed to be sufficiently under the control of their riders as to make them immune to the effect.", ["Leadership", "Charge"])
    },
    {
        id: 1202,
        category: "Skaven of Clan Moulder",
        name: "Subjugator of Mankind",
        type: "Warband Specific",
        timing: ["13"],
        rules: "If a Hero with this skill and equipped with a Thingcatcher takes an opposing model out of action, do not roll for injuries post-battle, instead treat the enemy as if they'd rolled Captured on the Serious Injuries chart. Large creatures such as Ogres cannot be caught in this way, but animals can."
    },
    {
        id: 1203,
        category: "Skaven of Clan Moulder",
        name: "Twistkin",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Upon taking this skill the Hero must buy a Mutation from the list in the Mordheim Rulebook (see Possessed Warband) at half the listed cost."
    },
    //Snotling Warband
    {
        id: 1301,
        category: "Snotlings",
        name: "Stampede",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("When the hero with Stampede makes a charge on an opposing warrior, keep track of any other Snotlings that charged that same warrior this turn.<br>You may have one of those charging Snotlings forfeit his attack in order to give the Stampeding Hero +1 Strength for each Base Attack forfeited<br><br>(Example: a Snotling BigSnot with S2 and Stampede charges an opponent he has a Snotling Mob charge with him. The Mob forfeits it’s attack, granting the BigSnot +3 Strength; +1 S for each of the Mob’s Base attacks (do not count additional hand attacks)).<br><br>This bonus lasts until the end of the turn, and may be used multiple times<br><br>(i.e. you may have multiple snotlings each forfeit their attack, each adding +1 S for each attack).<br><br>However, each snotling may only forfeit his attack once per turn (thus, if you have two Stampeding heroes, you cannot have 1 snotling runt forfeit his attack TWICE, giving the bonus to two different warriors).<br><br>A Snotling that forfeits his attacks forfeits them ALL—he may not choose to give up “half” his attacks or any other fraction. A Hero’s Strength may not be increased beyond Strength 10.", ["Charge"])
    },
    {
        id: 1302,
        category: "Snotlings",
        name: "Achilles Heel",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("Your Snotling always causes Critical Hits on rolls of 6 (when wounding) regardless of opponent's toughness. In addition, when combined with the Stampede Charge attack, on any successful rolls to wound of 5+, the opponent gains no armour save", ["Charge"])
    },
    {
        id: 1303,
        category: "Snotlings",
        name: "Worm ",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("Scout and Promoted Runts Only<br><br>During the movement phase, you can declare that the Snotling is moving through a wall (even performing a Charge, if you can see/detect the target.)<br>Roll a D6, on anything but a 1, your Snotling squeezes through and can attack as normal.<br>On a 1, he has charged the wall blindly and not found a crevice, concussing himself in a cartoony manner. He cannot move again this turn and counts as Knocked Down if attacked in close combat.<br><br>This Skill cannot be combined with the “Stampede” skill.", ["Charge", "Knocked Down"])
    },
    {
        id: 1304,
        category: "Snotlings",
        name: "Big Bully",
        type: "Warband Specific",
        timing: ["13"],
        rules: "BigSnotz only<br><br>The BigSnot is immensely Big and strong, especially by Snotling standards. The BigSnot immediately learn ONE Strength Skill. A BigSnot may only take this skill once each. Cannot be combined with the skill “Frustratingly Tiny"
    },
    {
        id: 1305,
        category: "Snotlings",
        name: "Frustratingly Tiny",
        type: "Warband Specific",
        timing: ["5", "9"],
        rules: createSkillRuleText("Snotlings Only<br><br>Your Snotling is a master of using his tiny size to his advantage. In Hand-to-hand combat, enemies attacking your hero are at -1 to hit. Also, all opponents halve their Initiative when trying to detect a Hiding “Tiny” hero.<br><br>This skill cannot be combined with the “Big Bully” skill above.", ["Hiding"])
    },
    {
        id: 1306,
        category: "Snotlings",
        name: "Mob Master",
        type: "Warband Specific",
        timing: ["2", "3", "9"],
        rules: "So long as your Hero is within 2” of a Snotling Mob, both he and the Snotling Mob become Immune to Pscychology exactly as if the Hero counted as a second Snotling Mob.<br>When this skill is combined with the “Stampede” skill above, the Hero automatically gains +1 to hit for each forfeited attack, in addition to +1 Strength. A natural roll of 1 will always fail to hit."
    },
    //Survivors of Strigos
    {
        id: 1400,
        category: "Survivors Of Strigos",
        name: "Iron Sinews",
        type: "Warband Specific",
        timing: ["12"],
        characteristicModifiers: { S: 1 },
        rules: "Strigoi Vampire Only<br><br>The Strigoi becomes a beast of pure muscular power. Add +1S to the Vampire’s profile."
    },
    {
        id: 1401,
        category: "Survivors Of Strigos",
        name: "Great Thirster",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("Strigoi Vampire Only<br><br>Once the Vampire takes a model Out of Action, treat him as having Frenzy until he is Knocked Down, Stunned, or taken Out of Action.", ["Frenzy", "Knocked Down", "Stunned"])
    },
    {
        id: 1402,
        category: "Survivors Of Strigos",
        name: "Curse of the Revenant",
        type: "Warband Specific",
        timing: ["2"],
        rules: "Strigoi Vampire Only<br><br>Once a Vampire has taken the Great Thirster special skill, he may choose the Curse of the Revenant. This skill allows the Vampire to regenerate lost wounds on a D6 roll of 5+. Only one wound may be recovered in this fashion per turn."
    },
    {
        id: 1403,
        category: "Survivors Of Strigos",
        name: "Dark Arts",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Strigoi Vampire Only<br><br>The Strigoi may choose Arcane Lore as an advance, and immediately roll for a spell on the Dark Arts table. Subsequent spells may be chosen instead of skills."
    },
    {
        id: 1404,
        category: "Survivors Of Strigos",
        name: "Light Fingers",
        type: "Warband Specific",
        timing: ["13"],
        rules: "Strigany Heroes Only<br><br>Should a Hero with this skill take an enemy model Out of Action, they will find an extra piece of Wyrdstone. Only one piece of treasure may be found in this manner per game."
    },
    {
        id: 1405,
        category: "Survivors Of Strigos",
        name: "Practiced Arm",
        type: "Warband Specific",
        timing: ["7"],
        rules: "Strigany Heroes Only<br><br>Such is the skill with which the Gypsy can launch throwing knives that he can throw two of them per turn. These missiles must be at the same target and gain +1 to their injury rolls to represent the skill with which they were aimed."
    },
    //Vampire Hunters of Sylvania
    {
        id: 1500,
        category: "Vampire Hunters of Sylvania",
        name: "Iron Will",
        type: "Warband Specific",
        timing: ["3", "9"],
        rules: createSkillRuleText("Vampire Hunter and Slayer Only<br><br>The warrior is hardened and immune to Fear", ["Fear"])
    },
    {
        id: 1501,
        category: "Vampire Hunters of Sylvania",
        name: "Righteous Aura",
        type: "Warband Specific",
        timing: ["9"],
        rules: "Vampire Hunter and Slayer Only<br><br>Possessed or Undead opponents lose their first attack against the warrior in the first round of hand-to-hand combat (down to a minimum of 1)."
    },
    {
        id: 1502,
        category: "Vampire Hunters of Sylvania",
        name: "Thirst for Vengeance",
        type: "Warband Specific",
        timing: ["4", "10"],
        rules: createSkillRuleText("The warrior hates (Hatred) all undead. In his quest for revenge, he gains +1 attack in a turn where he performs a charge.", ["Hatred", "Charge"])
    },
    {
        id: 1503,
        category: "Vampire Hunters of Sylvania",
        name: "Blessing of Morr",
        type: "Warband Specific",
        timing: ["9"],
        rules: "Add +1 to all injury rolls against the undead."
    },
    {
        id: 1504,
        category: "Vampire Hunters of Sylvania",
        name: "Touch of Darkness",
        type: "Warband Specific",
        timing: ["12"],
        rules: "Vampire Hunter and Slayer Only<br><br>Due to his heightened intuition, he ignores darkness penalties."
    },
    //Wood Elves of Athel Loren
    {
        id: 1600,
        category: "Wood Elves of Athel Loren",
        name: "Fey",
        type: "Warband Specific",
        timing: ["8"],
        rules: "The Wood Elf gets a saving throw of 4+ against hostile magic."
    },
    {
        id: 1601,
        category: "Wood Elves of Athel Loren",
        name: "Elven Luck",
        type: "Warband Specific",
        timing: ["4", "12"],
        rules: "Once per game, he may reroll any failed roll."
    },
    {
        id: 1722,
        category: "Wood Elves of Athel Loren",
        name: "Excellent Sight",
        type: "Warband Specific",
        timing: ["4", "7"],
        rules: createSkillRuleText("The Wood Elf can spot Hiding enemy models up to 2 x I inch away.", ["Hiding"])
    },
    {
        id: 1602,
        category: "Wood Elves of Athel Loren",
        name: "Seeker",
        type: "Warband Specific",
        timing: ["13"],
        rules: "The Wood Elf may modify the result of one exploration die by +/- 1<br><br>Only one Elven Hero may possess this skill!"
    },
    //Tomb Guardians
    {
        id: 1603,
        category: "Tomb Guardians",
        name: "Drive Chariot",
        type: "Warband Specific",
        timing: ["12"],
        rules: createSkillRuleText("Chariots are very difficult to control and a warrior must have this skill to drive a chariot effectively in combat. A charioteer without this skill cannot Charge.", ["Charge"])
    },

    //Arabian Merchant
    {
        id: 1604,
        category: "Arabian Merchant",
        name: "Stone Cutter",
        type: "Hired Sword",
        timing: ["13"],
        rules: createSkillTable(
            "The Merchant has the skill to refine wyrdstone shards to increase their value. Whenever a warband sells its wyrdstone the Merchant may try to refine the source. Roll a D6 to discover how much additional gold the wyrdstone is worth.",
            ["D6", "Gold"],
            [
                { cells: ["1-2", "Lose 2D6 gold crowns"] },
                { cells: ["3-5", "Gain 2D6 gold crowns"] },
                { cells: ["6", "Gain 3D6 gold crowns"] }
            ]
        )
    },
    {
        id: 1605,
        category: "Arabian Merchant",
        name: "Guardian",
        type: "Hired Sword",
        timing: ["13"],
        rules: "The Merchant has acquired a bodyguard to protecting from harm in the coming battles. The bodyguard will only protect the Merchant and cannot fulfil warband objectives or search, loot or any function other than protecting the Merchant and as such will remain within 1\" of the Merchant at all times. The bodyguard doesn’t gain experience and isn’t paid (it is assumed he has been ‘gifted’ to the Merchant as a favour from one of his contacts)."
    },

    //Troll Slayer
    {
        id: 1606,
        category: "Dwarf Troll Slayer",
        name: "Ferocious Charge",
        type: "Hired Sword",
        timing: ["4"],
        rules: createSkillRuleText("The Dwarf may double his attacks on the turn in which he performs a Charge. He will suffer a -1 to hit penalty on that turn.", ["Charge"])
    },
    {
        id: 1607,
        category: "Dwarf Troll Slayer",
        name: "Monster Slayer",
        type: "Hired Sword",
        timing: ["9"],
        rules: "The Troll Slayer always wounds any opponent on a D6 roll of 4+, regardless of Toughness, unless his own Strength (with weapon modifiers) would mean that a lower result than this is needed."
    },
    {
        id: 1608,
        category: "Dwarf Troll Slayer",
        name: "Berserker",
        type: "Hired Sword",
        timing: ["4", "9"],
        rules: createSkillRuleText("The Dwarf may add +1 to his to hit rolls during the turn in which he does a Charge.", ["Charge"])
    },

    //Elf Ranger
    {
        id: 1609,
        category: "Elf Ranger",
        name: "Fey",
        type: "Hired Sword",
        timing: ["8"],
        rules: "Hostile magic spells will not affect the Elf on a D6 roll of 4+."
    },
    {
        id: 1610,
        category: "Elf Ranger",
        name: "Luck",
        type: "Hired Sword",
        timing: ["12"],
        rules: "Once per game he may re-roll any dice roll he makes (but not one made by other members of the warband)."
    },



    //Imperial Assassin
    {
        id: 1611,
        category: "Imperial Assassin",
        name: "Unstoppable Charge",
        type: "Hired Sword",
        timing: ["4", "10"],
        rules: createSkillRuleText("+1 to Weapon Skill when performing a Charge", ["Charge"])
    },
    {
        id: 1612,
        category: "Imperial Assassin",
        name: "Backstabber",
        type: "Hired Sword",
        timing: ["4", "10"],
        rules: createSkillRuleText("The Assassin may Charge an opponent he cannot see as long as the target model is within his charge reach. If he does this, he surprises his opponent and receives a +1 to hit him with all attacks and any rolls on the Serious Injuries chart are at +1.<br>This bonus lasts for the first round of combat only.", ["Charge"])
    },
    {
        id: 1613,
        category: "Imperial Assassin",
        name: "Hide in Shadows",
        type: "Hired Sword",
        timing: ["5", "8"],
        rules: createSkillRuleText("The Assassin can blend into the shadows so that his opponents will not see him. As long as he is within 1\" of a wall or other linear obstacle (hedge, fence, well, etc), opposing models must pass an Initiative Test in order to charge or shoot at him.", ["Initiative Test"])
    },

    //Chameleon Skink
    {
        id: 1614,
        category: "Chameleon Skink",
        name: "Infiltration",
        type: "Hired Sword",
        timing: ["1"],
        rules: createSkillRuleText("The Hero may set up anywhere on the table but no closer than 12\" to an enemy and he must start the game in Hiding.", ["Hiding"])
    },
    {
        id: 1615,
        category: "Chameleon Skink",
        name: "Great Hunter",
        type: "Hired Sword",
        timing: ["8"],
        rules: createSkillRuleText("The Skink Great Crest is adept at making the most of the Cover available and imposes an additional -1 to hit the Skink if he is in cover, IE a -2 to hit penalty.", ["Cover"])
    },

    //Dark Elf Assassin
    {
        id: 1616,
        category: "Dark Elf Assassin",
        name: "Fury of Khaine",
        type: "Hired Sword",
        timing: ["10"],
        rules: createSkillRuleText("The Dark Elf may make a 4\" follow up move if he takes all of his opponents Out Of Action. If he comes into contact with another enemy this starts a new combat. This new combat takes place in the following turn and the model counts as having performed a Charge.<br>May not follow up in the opponent’s turn.", ["Charge"])
    },
    {
        id: 1617,
        category: "Dark Elf Assassin",
        name: "Powerful Build",
        type: "Hired Sword",
        timing: ["12"],
        rules: "A warrior with this skill may choose skills from the Strength table. The Sorceress may never take this skill and no more than two warriors in the warband may take this skill at any one time."
    },
    {
        id: 1618,
        category: "Dark Elf Assassin",
        name: "Fey Quickness",
        type: "Hired Sword",
        timing: ["8", "9"],
        rules: "An Elf with Fey Quickness can avoid melee or missile attacks on a roll of 6. If the Elf also has Step Aside or Dodge this will increase to a 4+ in the relevant area.<br><br>For example, an Elf with Fey Quickness and Step Aside avoids melee attacks on a 4+ and missile attacks on a 6."
    },
    {
        id: 1619,
        category: "Dark Elf Assassin",
        name: "Master of Poisons",
        type: "Hired Sword",
        timing: ["13"],
        rules: "The Dark Elf is proficient in concocting different poisons. If the Hero doesn’t search for rare items, he may make D3-1 doses of Dark Venom instead. There is a chance of getting none, as the hero doesn’t have access to a stable workplace. The poison must be used in the next battle and cannot be sold or traded to other warbands as the Dark Elves guard their secrets very carefully."
    },

    //Dwarf Pathfinder
    {
        id: 1620,
        category: "Dwarf Pathfinder",
        name: "Pathfinder",
        type: "Hired Sword",
        timing: ["1"],
        rules: "A Dwarf Pathfinder is able to Infiltrate<br><br>A Model with this skill is always placed on the battlefield after the opposing warband and can be placed anywhere on the table as long as it is out of sight of the opposing warband and more than 12\" away from any enemy model. If both players have models which infiltrate, roll a D6 for each, and the lowest roll sets up first."
    },
    {
        id: 1621,
        category: "Dwarf Pathfinder",
        name: "Combat Master",
        type: "Hired Sword",
        timing: ["9"],
        rules: createSkillRuleText("When using a weapon that has a Parry special rule, this hero parries successfully if he beats OR MATCHES his opponent’s highest ‘to hit’ roll, not just if he beats the roll.<br>In addition, if this warrior is using two weapons that have the Parry special rule, he is allowed to parry two attacks (if his two dice match or beat the highest two attack dice against him) instead of the normal maximum of one.", ["Parry"])
    },
    {
        id: 1622,
        category: "Dwarf Pathfinder",
        name: "Extra Tough",
        type: "Hired Sword",
        timing: ["13"],
        rules: "When rolling on the Heroes Serious Injury chart for this Hero after a game in which he has been taken out of action, the dice may be re-rolled once. The result of this second dice roll must be accepted, even if it is a worse result."
    },
    {
        id: 1623,
        category: "Dwarf Pathfinder",
        name: "Resource Hunter",
        type: "Hired Sword",
        timing: ["13"],
        rules: "When rolling on the Exploration chart at the end of a game, the Hero may modify one dice roll by +1/-1."
    },
    {
        id: 1624,
        category: "Dwarf Pathfinder",
        name: "True Grit",
        type: "Hired Sword",
        timing: ["9"],
        rules: createSkillRuleText("When rolling on the Injury table for this Hero, a roll of:<br>1-3 is treated as Knocked Down<br>4-5 as Stunned<br>6 as out of action.", ["Knocked Down", "Stunned"])
    },
    {
        id: 1625,
        category: "Dwarf Pathfinder",
        name: "Thick Skull",
        type: "Hired Sword",
        timing: ["9"],
        rules: createSkillRuleText("The Hero has a 3+ save on a D6 to avoid being Stunned. If the save is made, treat a stunned result as Knocked Down instead. If the Dwarf also wears a helmet, this save is 2+ instead of 3+ (this takes the place of the normal Helmet special rule).", ["Stunned", "Knocked Down"])
    },

    //Halfling Thief
    {
        id: 1626,
        category: "Halfling Thief",
        name: "wily thief",
        type: "Hired Sword",
        timing: ["13"],
        rules: "If the Thief takes out any members of the enemy warband during a game (and he was not taken Out of Action himself), the Halfling Thief’s warband receives one additional Treasure (this does not affect the opposing warband’s number of Treasures... just assume this is one they WOULD have found and leave it at that). This is, of course, in addition to the normal +1 Treasure he already adds through his Cutpurse special rule."
    },
    {
        id: 1627,
        category: "Halfling Thief",
        name: "stealthy",
        type: "Hired Sword",
        timing: ["4"],
        rules: createSkillRuleText("The Halfling Thief can hide even after running, and can run while within 8\" of enemy models if he starts and ends his move Hiding.", ["Hiding"])
    },

    //Human Scout
    {
        id: 1628,
        category: "Human Scout",
        name: "Quick Shot",
        type: "Hired Sword",
        timing: ["7"],
        rules: "The warrior may shoot twice per turn with a bow or crossbow (but not a crossbow pistol)."
    },
    {
        id: 1629,
        category: "Human Scout",
        name: "Eagle Eyes",
        type: "Hired Sword",
        timing: ["7"],
        rules: "The warrior's sight is exceptionally keen. He adds +6\" to the range of any missile weapon he is using."
    },
    {
        id: 1630,
        category: "Human Scout",
        name: "Trick Shooter",
        type: "Hired Sword",
        timing: ["7"],
        rules: createSkillRuleText("The warrior can shoot through the tiniest gap without it affecting his aim. He ignores all modifiers for Cover when using missile weapons.", ["Cover"])
    },
    {
        id: 1631,
        category: "Human Scout",
        name: "Expert Hunter",
        type: "Hired Sword",
        timing: ["5", "6"],
        rules: createSkillRuleText("A Human Scout that has been declared as Hiding may only be detected by models within half their Initiative value in inches, not their Initiative value as normal. In addition, a Human Scout may fire his Bow without giving away his position (he may fire and remain Hiding).", ["Hiding"])
    },
    {
        id: 1632,
        category: "Human Scout",
        name: "Sit in Wait",
        type: "Hired Sword",
        timing: ["1"],
        rules: "Placed last anywhere on the table, more than 12\" from the enemy, out of line of sight. If both players have infiltrating models, roll off for each model, lowest sets up first"
    },

    //Kislev Ranger
    {
        id: 1633,
        category: "Kislev Ranger",
        name: "Animal Call",
        type: "Hired Sword",
        timing: ["5"],
        rules: createSkillRuleText("If Hiding, the Ranger may use animal calls to confound the enemies. Any enemy model that is within 18\" of the Ranger and does not declare a charge in its movement phase must take a Leadership Test (determine which models these are after charges are declared but before they are moved). Those that fail the Ranger may move in any direction she wishes instead of their normal move.", ["Hiding", "Leadership"])
    },
    {
        id: 1634,
        category: "Kislev Ranger",
        name: "Herb Lore",
        type: "Hired Sword",
        timing: ["2"],
        rules: "Any friendly model in base-to-base contact with her may have 1 wound restored on a roll of 4+ in the recovery phase. The ranger may also heal herself. If any healing is successful, the ranger may not move this turn, but may shoot as normal. The ranger may not heal if she is in close combat."
    },

    //Mule Skinner
    {
        id: 1635,
        category: "Mule Skinner",
        name: "Haggle",
        type: "Hired Sword",
        timing: ["13"],
        rules: "The warrior may deduct 2D6 gold crowns from the price of any single item (to a minimum cost of 1gc) once per post battle sequence."
    },
    {
        id: 1636,
        category: "Mule Skinner",
        name: "Streetwise",
        type: "Hired Sword",
        timing: ["13"],
        rules: "The warrior may add +2 to the roll that determines his chances of finding rare items"
    },
    {
        id: 1637,
        category: "Mule Skinner",
        name: "Whip Master",
        type: "Hired Sword",
        timing: ["9"],
        rules: "The hero is so skilled with his whip that he may re-coll all to-hit rolls when using the whip. Only one re-roll is allowed per attempt and you must accept the second roll, even if it is worse."
    },

    //Pathfinder
    {
        id: 1638,
        category: "Pathfinder",
        name: "Lookout!",
        type: "Hired Sword",
        timing: ["4"],
        rules: "Once per game a Pathfinder may cancel the effects of one trap or hazard on a roll of 4+."
    },
    {
        id: 1639,
        category: "Pathfinder",
        name: "This Way!",
        type: "Hired Sword",
        timing: ["4"],
        rules: "Any model in base contact with the Pathfinder at the start of his turn may traverse impassable terrain just as if possessing the same skill. If, however, contact is lost before reaching safety, the other model is considered out-of-action for the remainder of the game."
    },

    //Shadow Warrior
    {
        id: 1640,
        category: "Shadow Warrior",
        name: "Infiltration",
        type: "Hired Sword",
        timing: ["1"],
        rules: "A Model with this skill is always placed on the battlefield after the opposing warband and can be placed anywhere on the table as long as it is out of sight of the opposing warband and more than 12\" away from any enemy model. If both players have models which infiltrate, roll a D6 for each, and the lowest roll sets up first."
    },
    {
        id: 1641,
        category: "Shadow Warrior",
        name: "See in Shadows",
        type: "Hired Sword",
        timing: ["4"],
        rules: createSkillRuleText("As long as the warrior has movement to reach them, the warrior may always roll to Charge opponents he cannot see (instead of the normal 4\")", ["Charge"])
    },
    {
        id: 1642,
        category: "Shadow Warrior",
        name: "Hide in Shadows",
        type: "Hired Sword",
        timing: ["5", "8"],
        rules: createSkillRuleText("An enemy warrior attempting to detect this warrior when he is Hiding must halve his Initiative (round up) before measuring the distance.", ["Hiding"])
    },
    {
        id: 1643,
        category: "Shadow Warrior",
        name: "Sniper",
        type: "Hired Sword",
        timing: ["7"],
        rules: createSkillRuleText("When Hiding, the warrior may cast spells or shoot and still remain Hidden. Note that the warrior may not use this skill if he is shooting a Blackpowder weapon!", ["Hiding"])
    },
    {
        id: 1644,
        category: "Shadow Warrior",
        name: "Powerful Build",
        type: "Hired Sword",
        timing: ["12"],
        rules: "A warrior with this skill may choose skills from the Strength table. The Sorceress may never take this skill and no more than two warriors in the warband may take this skill at any one time."
    },

    //Cathayan Merchant
    {
        id: 1646,
        category: "Cathayan Merchant",
        name: "Stone Cutter",
        type: "Hired Sword",
        timing: ["13"],
        rules: createRuleTable(
            "The Merchant has the skill to refine wyrdstone shards to increase their value. Whenever a warband sells its wyrdstone the Merchant may try to refine the source. Roll a D6 to discover how much additional gold the wyrdstone is worth.",
            ["D6", "Result"],
            [
                { cells: ["1-2", "Lose 2D6 gold crowns."] },
                { cells: ["3-5", "Gain 2D6 gold crowns"] },
                { cells: ["6", "Gain 3D6 gold crowns"] },
            ]
        )
    },
    {
        id: 1647,
        category: "Cathayan Merchant",
        name: "Guardian",
        type: "Hired Sword",
        timing: ["12"],
        rules: "The Merchant has ‘acquired’ a bodyguard to protecting from harm in the coming battles.<br>The bodyguard will only protect the Merchant and cannot fulfil warband objectives or search, loot or any function other than protecting the Merchant and as such will remain within 1\" of the Merchant at all times.<br>The bodyguard doesn’t gain experience and isn’t paid (it is assumed he has been ‘gifted’ to the Merchant as a favour from one of his contacts)."
    },

    //Hobgoblin Scout
    {
        id: 1648,
        category: "Hobgoblin Scout",
        name: "Spy",
        type: "Hired Sword",
        timing: ["1"],
        rules: "Before the battle commences but after deployment, the player controlling the Hobgoblin Scout may re-deploy D3 models (not including the Scout), using the normal deployment rules. If the player chooses not to do this, then the Scout may be set up anywhere on the board that is not within 18\" of any enemy model."
    },
    {
        id: 1649,
        category: "Hobgoblin Scout",
        name: "Potshot",
        type: "Hired Sword",
        timing: ["7"],
        rules: "The Scout may fire a bow when running with a -2 to hit modifier."
    },

    //Pyromaniac
    {
        id: 1650,
        category: "Pyromaniac",
        name: "Rocket Science",
        type: "Hired Sword",
        timing: ["7"],
        rules: "The Pyromaniac has brought the detonation of fireworks to perfection and may modify the roll on the fireworks table by +1/–1."
    },
    {
        id: 1651,
        category: "Pyromaniac",
        name: "Display Artist",
        type: "Hired Sword",
        timing: ["7"],
        rules: createSkillRuleText("Instead of rolling the artillery die the Pyromaniac may make an Initiative Test to have the rocket detonate immediately. Otherwise roll the artillery die as usual.", ["Initiative Test"])
    },

    //Swordsmith
    {
        id: 1652,
        category: "Swordsmith",
        name: "Honing",
        type: "Hired Sword",
        timing: ["13"],
        rules: "If the Swordsmith wasn’t taken out of action during a battle he may hone the blades of up to three swords, including similar bladed weapons such as Dragon Swords, giving them the Cutting Edge special rule for the next battle."
    },
    {
        id: 1653,
        category: "Swordsmith",
        name: "Farrier",
        type: "Hired Sword",
        timing: ["13"],
        rules: "Between each battle the Swordsmith freshly shoes all equine beasts in the warband. Newly shod equines are much less likely to suffer a fatal fall during battle! Whenever a Horse, Mule, Warhorse, Elven Steed or a Chaos Centaur is taken out of action, remove the creature from the warband roster on a 1 instead of a 1 or 2."
    },

    //Cursed Hillman
    {
        id: 1654,
        category: "Cursed Hillman",
        name: "Control",
        type: "Hired Sword",
        timing: ["7"],
        rules: createSkillRuleText("The Hillman can transform into the Werewolf during the shooting phase on a D6 roll of 2+. Should this roll fail, the Hillman must remain static as the excruciating transformation takes longer than anticipated. He counts as being Knocked Down, and will be completely transformed by the beginning of his controller’s next turn.", ["Knocked Down"])
    },
    {
        id: 1655,
        category: "Cursed Hillman",
        name: "Rage",
        type: "Hired Sword",
        timing: ["12"],
        characteristicModifiers: { WS: 1, S: 1, I: 1, A: 1 },
        rules: "The Hillman gains +1WS, +1S, +1I and an extra attack as his off-hand has transformed into a claw. This skill can only be taken if the Control skill is already chosen."
    },

    //Imperial Tactician
    {
        id: 1656,
        category: "Imperial Tactician",
        name: "Organized Search Party",
        type: "Hired Sword",
        timing: ["13"],
        rules: "The warband may re-roll one exploration die."
    },
    {
        id: 1657,
        category: "Imperial Tactician",
        name: "Send False Signals",
        type: "Hired Sword",
        timing: ["1"],
        rules: "By misleading the opposing warband(s), an Imperial Tactician can make them deploy their forces in a way beneficial to his own warband. Thus, after all warbands have deployed (but before the hiring player has used the Expert Tactician ability), the player controlling the Imperial Tactician may move 1 member from each opposing warband D6” in any direction. This move may not move a warband member off the board, nor may it place a member of the warband in direct harm (you can't force a warrior to jump off a building!)."
    },

    //Ninja Gnoblar
    {
        id: 1658,
        category: "Ninja Gnoblar",
        name: "Rooftop to Rooftop",
        type: "Hired Sword",
        timing: ["4"],
        rules: createSkillRuleText("The Ninja Gnoblar is skilled in jumping over streets and gaps(Jump Over Gaps). He doesn't deduct the distance jumped from his movement. This means he can run 8\" and still jump the 3\".", ["Jump Over Gaps"])
    },
    {
        id: 1659,
        category: "Ninja Gnoblar",
        name: "Expert Rooftop Jumper",
        type: "Hired Sword",
        timing: ["4"],
        rules: createSkillRuleText("The Ninja is even more skilled in jumping on the roofs. He may jump up to 4\" and may re-roll a failed Initiative Test when jumping or making a Diving Charge.", ["Initiative Test", "Diving Charge"])
    },

    //Ungor Trapper
    {
        id: 1660,
        category: "Ungor Trapper",
        name: "Fearless",
        type: "Hired Sword",
        timing: ["4", "9", "2"],
        rules: createSkillRuleText("Immune to Fear and All-Alone tests.", ["Fear", "All-Alone"])
    },
    {
        id: 1661,
        category: "Ungor Trapper",
        name: "Manhater",
        type: "Hired Sword",
        timing: ["4", "10"],
        rules: createSkillRuleText("Will be affected by the rules of Hatred when fighting any Human warbands.", ["Hatred"])
    },

    //Vampire Special Skills
    {
        id: 1662,
        category: "Undead",
        name: "Transfixing glare",
        type: "Warband Specific",
        timing: ["7"],
        grade: "1b",
        rules: createSkillRuleText("The Glare may be used on any living model in base contact that is not Immune to Psychology.<br><br>The victim must pass a Leadership Test on 2D6 or be transfixed. A transfixed model may not attack in close combat and is treated as being Knocked Down for purpose of being attacked. Roll for the Glare at the start of the combat phase.", ["Leadership", "Knocked Down"])
    },
    {
        id: 1663,
        category: "Undead",
        name: "Mist form",
        type: "Warband Specific",
        timing: ["3", "7", "8", "9"],
        grade: "1b",
        rules: createSkillRuleText("While in this state the Vampire has a move of 2D6\" per turn. He may not attack in close combat, shoot with a missile weapon or cast spells and he gains no protection from armour. All to hit rolls against the Vampire need a natural '6' to hit and all to wound rolls need a natural '6'. Note that this may not be modified by any bonuses as it represents the protection of a on-physical form. The Vampire may reduce the injury roll by -2. If the Vampire is Knocked Down he immediately reverts to his physical form. The Vampire may change back to Vampire form in any subsequent recovery phase by choice.", ["Knocked Down"])
    },
    {
        id: 1664,
        category: "Undead",
        name: "Ratswarm form",
        type: "Warband Specific",
        timing: ["7"],
        grade: "1b",
        rules: createSkillRuleText("A Vampire can change form in the recovery phase regardless of whether the Vampire is Knocked Down or Stunned but he suffers all penalties for standing up for example. The Vampire may change back to Vampire form at the start of any subsequent recovery phase.<br><br><div class='overflow-x-auto my-3'><table class='w-full text-center border border-slate-600 text-sm'><thead><tr class='bg-slate-800 border-b border-slate-600'><th class='py-1 px-2 font-bold text-mordheim-gold'>M</th><th class='py-1 px-2 font-bold text-mordheim-gold'>WS</th><th class='py-1 px-2 font-bold text-mordheim-gold'>BS</th><th class='py-1 px-2 font-bold text-mordheim-gold'>S</th><th class='py-1 px-2 font-bold text-mordheim-gold'>T</th><th class='py-1 px-2 font-bold text-mordheim-gold'>W</th><th class='py-1 px-2 font-bold text-mordheim-gold'>I</th><th class='py-1 px-2 font-bold text-mordheim-gold'>A</th><th class='py-1 px-2 font-bold text-mordheim-gold'>Ld</th></tr></thead><tbody><tr class='bg-slate-700/50'><td class='py-1 px-2 text-slate-200'>6</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>0</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>*</td><td class='py-1 px-2 text-slate-200'>*</td><td class='py-1 px-2 text-slate-200'>4</td><td class='py-1 px-2 text-slate-200'>*</td></tr></tbody></table></div><br>*Use the same characteristics as the Vampire<br><br>While in Ratswarm form the Vampire may not use weapons and does not receive any protection from armour. He cannot shoot with a missile weapon or cast spells but can attack in close combat without a penalty for fighting without a weapon. The Vampire should be represented by a Ratswarm base but treat the Vampire as being the size of a single rat for moving through alleys or similar small spaces. The Vampire may move through small holes and gaps that would allow a single rat-sized creature to pass through and can thus move through walls as most have a small holes in them.", ["Knocked Down", "Stunned"])
    },
    {
        id: 1665,
        category: "Undead",
        name: "Bat form",
        type: "Warband Specific",
        timing: ["7"],
        grade: "1b",
        rules: createSkillRuleText("A Vampire can change form in the recovery phase regardless of whether the Vampire is Knocked Down or Stunned but he suffers all penalties for standing up for example. The Vampire may change back to Vampire form at the start of any subsequent recovery phase.<br><br><div class='overflow-x-auto my-3'><table class='w-full text-center border border-slate-600 text-sm'><thead><tr class='bg-slate-800 border-b border-slate-600'><th class='py-1 px-2 font-bold text-mordheim-gold'>M</th><th class='py-1 px-2 font-bold text-mordheim-gold'>WS</th><th class='py-1 px-2 font-bold text-mordheim-gold'>BS</th><th class='py-1 px-2 font-bold text-mordheim-gold'>S</th><th class='py-1 px-2 font-bold text-mordheim-gold'>T</th><th class='py-1 px-2 font-bold text-mordheim-gold'>W</th><th class='py-1 px-2 font-bold text-mordheim-gold'>I</th><th class='py-1 px-2 font-bold text-mordheim-gold'>A</th><th class='py-1 px-2 font-bold text-mordheim-gold'>Ld</th></tr></thead><tbody><tr class='bg-slate-700/50'><td class='py-1 px-2 text-slate-200'>8</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>0</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>2</td><td class='py-1 px-2 text-slate-200'>*</td><td class='py-1 px-2 text-slate-200'>*</td><td class='py-1 px-2 text-slate-200'>1</td><td class='py-1 px-2 text-slate-200'>*</td></tr></tbody></table></div><br>*Use the same characteristics as the Vampire<br><br>Whilst in Bat form the Vampire may fly and ignores movement penalties, he cannot run as such but may move double distance and a charge move is also doubled. The Vampire may not use weapons and does not receive any protection from armour. He cannot shoot with a missile weapon or cast spells but can attack in close combat without a penalty for fighting without a weapon.", ["Knocked Down", "Stunned"])
    },
    {
        id: 1667,
        category: "Undead",
        name: "Giant wolf form",
        type: "Warband Specific",
        timing: ["7"],
        grade: "1b",
        rules: createSkillRuleText("A Vampire can change form in the recovery phase regardless of whether the Vampire is Knocked Down or Stunned but he suffers all penalties for standing up for example. The Vampire may change back to Vampire form at the start of any subsequent recovery phase.<br><br><div class='overflow-x-auto my-3'><table class='w-full text-center border border-slate-600 text-sm'><thead><tr class='bg-slate-800 border-b border-slate-600'><th class='py-1 px-2 font-bold text-mordheim-gold'>M</th><th class='py-1 px-2 font-bold text-mordheim-gold'>WS</th><th class='py-1 px-2 font-bold text-mordheim-gold'>BS</th><th class='py-1 px-2 font-bold text-mordheim-gold'>S</th><th class='py-1 px-2 font-bold text-mordheim-gold'>T</th><th class='py-1 px-2 font-bold text-mordheim-gold'>W</th><th class='py-1 px-2 font-bold text-mordheim-gold'>I</th><th class='py-1 px-2 font-bold text-mordheim-gold'>A</th><th class='py-1 px-2 font-bold text-mordheim-gold'>Ld</th></tr></thead><tbody><tr class='bg-slate-700/50'><td class='py-1 px-2 text-slate-200'>9</td><td class='py-1 px-2 text-slate-200'>4</td><td class='py-1 px-2 text-slate-200'>0</td><td class='py-1 px-2 text-slate-200'>4</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>*</td><td class='py-1 px-2 text-slate-200'>*</td><td class='py-1 px-2 text-slate-200'>2</td><td class='py-1 px-2 text-slate-200'>*</td></tr></tbody></table></div><br>*Use the same characteristics as the Vampire<br><br> Whilst in Wolf form the Vampire may not use weapons and does not receive any protection from armour. He cannot shoot with a missile weapon or cast spells but can attack in close combat without a penalty for fighting without a weapon.", ["Knocked Down", "Stunned"])
    },
    //Von Carstein Bloodline Powers
    {
        id: 1668,
        category: "Undead",
        name: "Transfix",
        type: "Von Carstein Bloodline Powers",
        timing: ["2"],
        rules: createSkillRuleText("Once each turn one enemy in base contact must make a Leadership test against his base leadership (cannot use the Leaders). If he fails he cannot attack and all attacks directed against him automatically hit this turn. Does not affect those immune to psychology, the Undead or Daemons.", ["Leadership"])
    },
    {
        id: 1669,
        category: "Undead",
        name: "Aura of Majesty",
        type: "Von Carstein Bloodline Powers",
        timing: ["2", "4", "9"],
        rules: createSkillRuleText("The Vampire increases the range to use his Leadership by 6\” and may re-roll the first failed Rout Test (if he has not been taken out of action).", ["Leadership", "Rout"])
    },
    {
        id: 1670,
        category: "Undead",
        name: "Call Winds",
        type: "Von Carstein Bloodline Powers",
        timing: ["7"],
        rules: createRuleTable(
            "Once per game at the beginning of his Shooting Phase, if he is not in close combat, the Vampire may attempt to summon a storm. Treat this like a spell, thus the Vampire may not shoot during this phase. Roll 1D6:",
            ["D6", "Result"],
            [
                { cells: ["1", "Nothing happens"] },
                { cells: ["2-6", createSkillRuleText("Successfully summons a powerful storm that lasts until the beginning of his next turn. All shooting is at -1 to hit and no model may fly (they must use their ground movement). The Storm immediately ends if the Vampire takes a Wound, is Knocked Down or taken Out of Action or if he is engaged in close combat.", ["Knocked Down"])] },
            ]
        )
    },
    {
        id: 1671,
        category: "Undead",
        name: "Summon Bats",
        type: "Von Carstein Bloodline Powers",
        timing: ["7"],
        rules: "Once per game the Vampire can summon 1D3 Fell Bats, which are deployed with 6\” of the Vampire. Treat this power like a spell with a casting difficulty of Auto. Follow the special rules for Fell Bats below.<br><br>\
        <div class='overflow-x-auto my-3'><table class='w-full text-center border border-slate-600 text-sm'><thead><tr class='bg-slate-800 border-b border-slate-600'><th class='py-1 px-2 font-bold text-mordheim-gold'>M</th><th class='py-1 px-2 font-bold text-mordheim-gold'>WS</th><th class='py-1 px-2 font-bold text-mordheim-gold'>BS</th><th class='py-1 px-2 font-bold text-mordheim-gold'>S</th><th class='py-1 px-2 font-bold text-mordheim-gold'>T</th><th class='py-1 px-2 font-bold text-mordheim-gold'>W</th><th class='py-1 px-2 font-bold text-mordheim-gold'>I</th><th class='py-1 px-2 font-bold text-mordheim-gold'>A</th><th class='py-1 px-2 font-bold text-mordheim-gold'>Ld</th></tr></thead><tbody><tr class='bg-slate-700/50'><td class='py-1 px-2 text-slate-200'>2</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>0</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>2</td><td class='py-1 px-2 text-slate-200'>3</td><td class='py-1 px-2 text-slate-200'>2</td><td class='py-1 px-2 text-slate-200'>5</td></tr></tbody></table></div><br>*Use the same characteristics as the Vampire<br><br>Fell Bats are Undead so all rules that apply to the Undead apply to Fell Bats.<br><br>Cause Fear, Immune to Psychology, May not Run, Immune to Poison.<br><br>Animal: Fell Bats are treated as animals and therefore cannot use, hold, or pick up any Items, Equipment, Wyrdstone Counters etc.<br><br>Fly: Fell Bats fly, which means that they may move 20” in any direction ignoring terrain. They can fly into or out of buildings and may only charge models they can see, however Fell Bats do not have to check for Initiative when moving up or down Buildings (however they cannot make a diving charge). Furthermore if the Fell Bats lose their last wound it plummets to the ground and is easily finished off. Do not roll for injury, they are automatically taken out of action, when they lose their last wound.<br><br>Bound Creature: Fell Bats are bound to the Vampire that called them.This means that if the Fell Bats end any turn more than 6\” away from the Vampire, and are not in close combat, they will leave play (this range is extended to 12\” if the Vampire has the Aura of Majesty Bloodline Power). This also means that if close combat ends and the Fell Bats are outside this range they immediately leave. Furthermore if the Vampire is taken out of action then the Fell Bats also leave play."
    },

    //Blood Dragon
    {
        id: 1672,
        category: "Undead",
        name: "Red Fury",
        type: "Blood Dragon Bloodline Powers",
        timing: ["7", "9"],
        characteristicModifiers: { A: 1 },
        rules: "The Vampire has +1 Attack (this does not count toward his Maximum)."
    },
    {
        id: 1673,
        category: "Undead",
        name: "Blade Master",
        type: "Blood Dragon Bloodline Powers",
        timing: ["9"],
        rules: createSkillRuleText("The Vampire needs only to tie the roll ‘to hit’ in order to Parry (this means he can parry a roll of 6). He can also re-roll a failed parry (but cannot re-roll a re-roll, nor can he parry more than one attack).", ["Parry"])
    },
    {
        id: 1674,
        category: "Undead",
        name: "Heart Piercing",
        type: "Blood Dragon Bloodline Powers",
        timing: ["4", "10"],
        rules: createSkillRuleText("The Vampire may re-roll missed attacks when performing a Charge.", ["Charge"])
    },
    {
        id: 1675,
        category: "Undead",
        name: "Strength of Steel",
        type: "Blood Dragon Bloodline Powers",
        timing: ["4", "10"],
        rules: createSkillRuleText("The Vampire has +1 Strength (this does not count toward his maximum) in the turn he performs a Charge.", ["Charge"])
    },

    //Necrarch Bloodline Powers
    {
        id: 1676,
        category: "Undead",
        name: "Nehekhara’s Noble Blood",
        type: "Necrarchs Bloodline Powers",
        timing: ["7"],
        rules: "The Vampire is a powerful Wizard and may choose an additional spell, and all his spells are at a +1 to cast (which does add with the Sorcery skill)."
    },
    {
        id: 1677,
        category: "Undead",
        name: "Unholy Cynosure",
        type: "Necrarchs Bloodline Powers",
        timing: ["7"],
        rules: "Once per game the Vampire may re-roll one failed spell."
    },
    {
        id: 1678,
        category: "Undead",
        name: "The Awakening",
        type: "Necrarchs Bloodline Powers",
        timing: ["7"],
        rules: "The Vampire may cast the spell Re-Animation once per turn in addition to any other spell he uses, also once per game (instead of casting any spells) he may summon D3 Zombies that appear within 6” of him just as if he cast Re-Animation. The Zombies are lost after the game and do not count toward the maximum number on the warband."
    },
    {
        id: 1679,
        category: "Undead",
        name: "Master of the Black Arts",
        type: "Necrarchs Bloodline Powers",
        timing: ["7"],
        rules: "The Vampire adds 6” to the range of spells that he casts. This Power only works on spells that have range."
    },

    //Lahmia Bloodline Powers
    {
        id: 1680,
        category: "Undead",
        name: "Beguile",
        type: "Lahmia Bloodline Powers",
        timing: ["2"],
        rules: createSkillRuleText("Once each turn one enemy in base contact must make a Leadership test against his base Leadership (cannot use the Leaders). If he fails he cannot attack the Vampire (but anyone else is fair game). Does not affect those immune to psychology, the Undead or Daemons.", ["Leadership"])
    },
    {
        id: 1681,
        category: "Undead",
        name: "Transfix",
        type: "Lahmia Bloodline Powers",
        timing: ["2"],
        rules: createSkillRuleText("Once each turn one enemy in base contact must make a Leadership test against his base Leadership (cannot use the Leaders). If he fails he cannot attack and all attacks directed against him automatically hit this turn. Does not affect those immune to psychology, the Undead or Daemons.", ["Leadership"])
    },
    {
        id: 1682,
        category: "Undead",
        name: "Seduction",
        type: "Lahmia Bloodline Powers",
        timing: ["2"],
        rules: createSkillRuleText("On each of the Vampire’s turns one male enemy in base contact must make a Leadership test against his base Leadership (cannot use the Leaders). If he fails, he immediately becomes controlled by the Vampire (may move and attack etc.). Any attacks by the Vampire’s warband hit automatically but control immediately returns to the original player. Make a Leadership test at the beginning of each turn to see if the warrior regains control. The Vampire can only control one warrior at a time. Does not affect those immune to psychology, the Undead, Daemons or warriors suffering from Stupidity.", ["Leadership", "Stupidity"])
    },
    {
        id: 1683,
        category: "Undead",
        name: "Innocence Lost",
        type: "Lahmia Bloodline Powers",
        timing: ["9"],
        rules: "The Vampire always attacks first in close combat (even if standing up from a knocked down result or attacking enemy armed with spears)."
    },

    //Strigoi Bloodline Powers
    {
        id: 1684,
        category: "Undead",
        name: "Curse of the Revenant",
        type: "Strigoi Bloodline Powers",
        timing: ["8", "9"],
        rules: "For any wound that is not saved the Vampire rolls 1D6, on a 4+ the wound is regenerated (negated).<br>This power is ignored if the attack was caused by fire damage or Blessed Water (or anything else applicable)."
    },
    {
        id: 1685,
        category: "Undead",
        name: "Massive Monstrosity",
        type: "Strigoi Bloodline Powers",
        timing: ["9", "12"],
        characteristicModifiers: { W: 1 },
        rules: "The Vampire has +1 Wound (this does not count toward his maximum)."
    },
    {
        id: 1686,
        category: "Undead",
        name: "Iron Sinews",
        type: "Strigoi Bloodline Powers",
        timing: ["9", "12"],
        characteristicModifiers: { S: 1 },
        rules: "The Vampire has +1 Strength (this does not count toward his maximum)."
    },
    {
        id: 1687,
        category: "Undead",
        name: "Infinite Hatred",
        type: "Strigoi Bloodline Powers",
        timing: ["7", "9"],
        rules: "The Vampire re-rolls all missed attacks (remember that you cannot re-roll a re-roll)."
    },

    //Night Goblins Web
    {
        id: 1688,
        category: "Night Goblins Web",
        name: "Fungus Farmer",
        type: "Warband Specific",
        timing: ["13"],
        rules: "If the Hero doesn’t search for rare items, it may pick D3-1 Mad Cap Mushrooms instead. There is a chance of getting none, as there is no guarantee they will be ready for harvest. Each Mad Cap Mushroom must be used in the next battle, and they cannot be sold or traded to other warbands These are a special high yield/low shelf life crop."
    },
    {
        id: 1689,
        category: "Night Goblins Web",
        name: "Hide in Shadows",
        type: "Warband Specific",
        timing: ["5"],
        rules: createSkillRuleText("An enemy warrior attempting to detect this warrior when it is Hiding must halve their Initiative (round up) before measuring the distance.", ["Hiding"])
    },
    {
        id: 1691,
        category: "Night Goblins Web",
        name: "Netter",
        type: "Warband Specific",
        timing: ["5"],
        rules: createSkillRuleText("Instead of their normal use, the Goblin may throw a Net they are equipped with at an enemy who is charging them.<br>This will reduce the Charge range of the attacker by D6 inches as the charger either slows down to avoid the net, or gets tangled up in it. If this means that the attacker cannot reach the Goblin then it is a failed charge.<br>Regardless of the outcome the Net is lost when this skill is used.", ["Charge"])
    },
    {
        id: 1692,
        category: "Night Goblins Web",
        name: "Ride Squig",
        type: "Warband Specific",
        timing: ["4", "8", "9"],
        rules: createSkillRuleText("This Goblin can ride one of the warband's Cave Squigs, or even a Great Squig! The pair deploy as a single model. Standard mount rules are not used, although the rider counts as being mounted for the Cavelry Bonus rule (see spears and lances). While the Squig is being ridden, it and the rider move as a single model using the Squig's movement rules, but attack separately in Close Combat. In this skill's text, the use of \“Squig\” refers to both Cave Squigs and Great Squigs.<br><br>Any shooting or close combat attacks will hit the rider on a D6 roll of 1-2, and the Squig on a 3-6.<br><br>If the Squig is Stunned or taken out of action, the rider takes a Strength 2 hit with no Armour save as they crash to the ground. If the Rider is stunned or taken out of action, the Squig reverts to normal Squig behavior. In either case the rider is now dismounted for the rest of the battle.<br><br>Squigs don't like being ridden. If the movement roll results in a double or triple, the rider must roll a D6 before the Squig moves. If the result is over the rider's Strength, they are thrown off before the Squig moves away, and take a Strength 2 hit with no Armour save as they crash to the ground. The rider is now dismounted for the rest of the battle. If the roll is equal to or below their Strength, the rider keeps their grip and remains atop the Squig.", ["Stunned"])
    },
    {
        id: 1693,
        category: "Night Goblins Web",
        name: "Sneaky Git",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("Fighter may Charge an opponent from Hiding, even if they cannot see the target. There is no need for an initiative test, and the target may be over the normal 4” limit for charging unseen targets.<br>If the charge is successful, the Goblin surprises their opponent who will attack at half Weapon Skill and half Initiative, rounded up. This penalty lasts for the first round of combat only, as the opponent will swiftly recover their wits if the initial assault is survived.", ["Hiding", "Charge"])
    },
    {
        id: 1694,
        category: "Night Goblins Web",
        name: "Gassy Squigs",
        type: "Squig Herder Skills",
        timing: ["8", "9"],
        rules: "When any untrained Cave Squig goes out of action, instead of rolling a D6 recovery roll after the battle, roll immediately. On a 1-2 it explodes, hitting all models in D6\” with a strength 3 hit. That Squig is now DEAD!"
    },
    {
        id: 1695,
        category: "Night Goblins Web",
        name: "Threaten",
        type: "Squig Herder Skills",
        timing: ["4"],
        rules: "During the Movement Phase, all Cave Squigs and Great Squigs in 6\” (12\” with a Squig Prodder) of the Squig Herder may re-roll their movement dice."
    },
    {
        id: 1696,
        category: "Night Goblins Web",
        name: "Trainin",
        type: "Squig Herder Skills",
        timing: ["12"],
        rules: "The Squig Herder may train one particularly intelligent and vicious Squig to be their personal guard.<br>The next single Cave Squig purchased will gain experience like normal, rolling on the Henchmen Advance Table while rerolling \"Lad's Got Talent\".<br>If the Squig Herder dies the Trained Squig is removed from the warband.<br>If the Trained Squig dies a new one can be purchased. There will only ever be one Trained Cave Squig in a warband, and it still counts towards the maximum number of Cave Squigs.<br><br>Because of the special attention (kicks, prods) the herder gives the Trained Squig, it will only ever die on a roll of a 1 after going out of action. In return for this lavished attention, the Trained Squig will defend its fallen master fiercely. If the Squig Herder is taken out of action, and the Trained Squig has not gone wild, it will guard the Herder; remove the Trained Squig from the table but treat all \“Sold to the Pits\”, \“Captured\”, and \“Robbed\” results on the Serious Injuries Chart for the Squig Herder as a \“Full Recovery.\”"
    },

    //Nipponese Expedition
    {
        id: 1697,
        category: "Nipponese Expedition",
        name: "Death before Dishonor",
        type: "Warband Specific",
        timing: ["9"],
        rules: "If this model would be removed from the battlefield as the result of a close combat attack, before removing it make a single close combat attack with them as normal."
    },
    {
        id: 1698,
        category: "Nipponese Expedition",
        name: "Night Fighter",
        type: "Warband Specific",
        timing: ["4"],
        rules: createSkillRuleText("This Skill may only be taken by the Shinobi.<br><br>This model is able to run while remaining hidden, as per Hiding rules", ["Hiding"])
    },
    {
        id: 1699,
        category: "Nipponese Expedition",
        name: "Iaijutsu",
        type: "Warband Specific",
        timing: ["5", "9"],
        rules: "When this model is charged they gain +1A that they may only use against the charger. This additional attack will 'strike first'.<br><br>If the wielder is simultaneously charged by two or more opponents they will still only receive a total of +1A.<br><br>These attacks are resolved at the Strength value of the model, with no further modifiers."
    },
    {
        id: 1700,
        category: "Nipponese Expedition",
        name: "Last Stand",
        type: "Warband Specific",
        timing: ["2", "7", "9"],
        rules: createSkillRuleText("If this model would normally take an All-Alone test, it may be re-rolled, in addition, at the start of this models turn, if it is 6\" away from friendly models, it can choose to have +1 to WS or BS until the start of its next turn.", ["All-Alone"])
    },
    {
        id: 1701,
        category: "Nipponese Expedition",
        name: "Tea Ceremony",
        type: "Warband Specific",
        timing: ["13"],
        rules: "After a battle, if this hero survives and did not go out of action, they can forgo searching for rare items and spends 10 gold crowns representing the cost of preparations for the tea ceremony. Then, Choose any other hero, and roll a D6. on a 3+, the chosen hero gains an Experience point from the introspective nature of the ceremony."
    },
    {
        id: 1702,
        category: "Nipponese Expedition",
        name: "Blessed by the Kami",
        type: "Warband Specific",
        timing: ["13"],
        rules: "When rolling on the Heroes Serious Injury chart for this Hero after a game in which he has been taken out of action, the dice may be re-rolled once. The result of this second dice roll must be accepted, even if it is a worse result."
    },

    //Asrai Wayfarer
    {
        id: 1703,
        category: "Asrai Wayfarer",
        name: "Aspect of the Hawk",
        type: "Warband Specific",
        timing: ["7"],
        rules: "Only a model with Quickshot may choose this skill.<br><br>This model may shoot twice per turn with a bow,long-bow, elven bow, or glade-wood bow and ignore the \'To-hit\' penalty for moving (normal restrictions for moving more than its base move apply). This skill, however, may not be combined with the Quickshot skill to allow more than two shots per turn to be made by this model"
    },
    {
        id: 1704,
        category: "Asrai Wayfarer",
        name: "Aspect of the Serpent",
        type: "Warband Specific",
        timing: ["7"],
        rules: "If this model doesn’t move, it may score a critical hit with missile weapons at targets within short range on a roll of 5 or 6"
    },
    {
        id: 1705,
        category: "Asrai Wayfarer",
        name: "Aspect of the Stag",
        type: "Warband Specific",
        timing: ["12"],
        rules: "A model with this skill may now choose skills from the strength list.<br><br>Spellwalkers may not choose this skill."
    },
    {
        id: 1706,
        category: "Asrai Wayfarer",
        name: "Aspect of the Panther",
        type: "Warband Specific",
        timing: ["7"],
        rules: createSkillRuleText("If hidden, a warrior with this skill may shoot missile weapons and remain hidden. If the target of the attack is not stunned or put out of action as a result of the attack, it can make an Initiative Test; if the test is successful, the target sees the attacker who is no longer considered Hiding.", ["Hiding", "Initiative Test"])
    },
    {
        id: 1707,
        category: "Asrai Wayfarer",
        name: "Aspect of the Fox",
        type: "Warband Specific",
        timing: ["1"],
        rules: "A wood elf with this skill is always placed on the battlefield afer the opposing warband and can be placed anywhere on the table as long as it is out of sight of the opposing warband and more than 12\” away from any enemy model. If both players have models with this skill or Infiltrate, roll a D6 for each, and the lowest roll sets up first."
    },
    {
        id: 1708,
        category: "Asrai Wayfarer",
        name: "Aspect of the Rabbit",
        type: "Warband Specific",
        timing: ["8", "9"],
        rules: "A model with this skill can avoid melee or missile attacks on a roll of 6. If the model also has the Step Aside or Dodge skill, this will increase to a 4+ in the relevant area."
    },

    //Lahmian
    {
        id: 1709,
        category: "Lahmian",
        name: "Swift",
        type: "Warband Specific",
        timing: ["4"],
        rules: "When moving the vampire may run but counts as having moved normally for all purposes"
    },
    {
        id: 1710,
        category: "Lahmian",
        name: "Transfix",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("At the start of the combat phase, one enemy model in base contact must test against Leadership. If the test is failed, the model may not attack that turn and all attacks against it gain an additional +1 to hit.<br><br>Ineffective against models immune to psychology.", ["Leadership"])
    },
    {
        id: 1711,
        category: "Lahmian",
        name: "Quickblood",
        type: "Warband Specific",
        timing: ["8", "9"],
        rules: "The vampire's lightning reflexes give it an unmodifiable 6+ save against all wounds. This save is in addition to and taken before normal armour saves. Note that in the case of critical hits this save is taken before rolling to see if multiple wounds are taken. If the vampire acquires Dodge or Step Aside, those skills supercede this one and cannot be combined to produce a 4+ save. Hence, a vampire with Quickblood and Dodge has a 5+ save against missiles and 6+ against close combat."
    },
    {
        id: 1712,
        category: "Lahmian",
        name: "Innocence Lost",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The vampire's ability to appear virginal and innocent temporarily disarms her opponent. The vampire always attacks first in close combat. If an enemy model also has the ability to attack first, then decide in order of initiative. In case of equal initiative, the highest score on 1d6 goes first.<br><br>This skill is ineffective against models immune to psychology."
    },
    {
        id: 1713,
        category: "Lahmian",
        name: "Seduction",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("The vampire must test against Leadership at the start of the combat phase. If successful, one enemy model in base contact must also save against Leadership. If failed, the model is controlled by the vampire player. The model's original owner may attempt to regain control in each subsequent turn by testing again in his recovery phase. If the vampire chooses to attack the controlled model, control is lost immediately. If the model ends the game under vampire control, they count as out of action. A maximum of one model may be so controlled.<br><br>Ineffective against models immune to psychology.", ["Leadership"])
    },
    {
        id: 1714,
        category: "Lahmian",
        name: "Night Creature",
        type: "Warband Specific",
        timing: ["8"],
        rules: createSkillRuleText("The vampire blends effortlessly into the background. Models wishing to Charge, shoot or cast spells at the vampire must roll 4+ to do so, or choose another target. This skill is only effective if the vampire did not move in its previous movement phase.", ["Charge"])
    },
    //Skaven Clan Skryre
    {
        id: 1720,
        category: "Skaven Clan Skryre",
        name: "Skavenbrew Master",
        type: "Warband Specific",
        timing: ["1"],
        rules: "This skill may only be taken by Warlock Engineers or Apprentices.<br><br>The Skaven has perfected his recipe for skavenbrew. One batch purchased per game may modify the die result for affect by +1 or -1 as if a slave had been sacrificed.<br><br>Note that this is not cumulative with sacrificing a slave (you can do either but not both)."
    },
    {
        id: 1721,
        category: "Skaven Clan Skryre",
        name: "Warpstone Resistance",
        type: "Warband Specific",
        timing: ["1", "7", "9"],
        rules: createSkillRuleText("This Skaven has developed a level of resistance to the effects of warpstone by years of exposure. If swallowing warpstone chunks, the model is only Stunned if a 5-6 is rolled. If hit by a poison wind globe for any reason, the warpstone resistant Skaven only takes a S2 hit. Conversely, skavenbrew no longer has any affect on the warrior.", ["Stunned"])
    },

    //Lothern Sea Patrol
    {
        id: 1723,
        category: "Lothern Sea Patrol",
        name: "Graceful Strength",
        type: "Warband Specific",
        timing: ["9"],
        rules: "The Elf may use Double-Handed weapons without the usual penalty of striking last. Work out order of battle as you would other weapon"
    },
    {
        id: 1725,
        category: "Lothern Sea Patrol",
        name: "Swordmasters Protege",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("Only available to Swordmasters<br><br>When armed with a double-handed weapon, the Swordmaster may Parry as if armed with a sword and a buckler", ["Parry"])
    },
    {
        id: 1726,
        category: "Lothern Sea Patrol",
        name: "Swift Fighter",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("The elf may make a Leadership test at the end of any hand-to-hand combat phase (elf players or enemys turn) if he is still in base contact with any enemy models.<br>If he passes he may make a normal movement away from the enemy (he may not run or charge), without the enemy striking any blows at him.<br>If he fails he remains in combat and must fight as normal in the following turn. If the Elf knows this skill AND the Pirate Skill Swashbuckler, he may make one attempt to escape combat, rerolling once if he fails.", ["Leadership"])
    },
    {
        id: 1727,
        category: "Lothern Sea Patrol",
        name: "Defending Guard",
        type: "Warband Specific",
        timing: ["9"],
        rules: createSkillRuleText("This warrior may Parry blows made against any warrior within 1\" of him, however he may only Parry once per turn as normal. May not be used if he is Stunned or Knocked Down.", ["Parry", "Stunned", "Knocked Down"])
    },
    {
        id: 1728,
        category: "Lothern Sea Patrol",
        name: "Infiltration",
        type: "Warband Specific",
        timing: ["1"],
        rules: "May only be taken by Heroes with the Ranger Honour and promoted Sea Rangers<br><br>A Model with this skill is always placed on the battlefield after the opposing warband and can be placed anywhere on the table as long as it is out of sight of the opposing warband and more than 12\" away from any enemy model. If both players have models which infiltrate, roll a D6 for each, and the lowest roll sets up first."
    },
    {
        id: 1729,
        category: "Pirate",
        name: "Sea Shanty Singer",
        type: "General",
        timing: ["10"],
        rules: createSkillRuleText("At the start of his Close Combat phase he can suddenly burst out in song, distracting one opponent in base contact of his choosing. That enemy must pass a Leadership test, or loose 1 Attack that turn. This does not effect Undead or other non-living creatures, such as Possessed.", ["Leadership"])
    },
    {
        id: 1730,
        category: "Pirate",
        name: "Sea Legs",
        type: "General",
        timing: ["4", "9"],
        rules: createSkillRuleText("If he Falls during a battle, he may ignore the effects of the D3 hits on a roll of 4+ (make a single roll to see if the any of the hits take effect or not). In addition, if he is Knocked Down or Stunned within 1\" of a precipice he may re-roll his Initiative Test to see if he falls down or not (Falling).", ["Initiative Test", "Knocked Down", "Stunned", "Falling"])
    },
    {
        id: 1731,
        category: "Pirate",
        name: "Cutlass Master",
        type: "General",
        timing: ["9"],
        rules: createSkillRuleText("If the pirate is equipped with a Sword, this skill will give him the additional benefit of also being able to Parry successfully if the player rolls equal to number rolled to hit, not just higher as normal. This extra ability only apply if the Pirate is not in the open; ie., only when in cover or in a building, within 2\" of a terrain feature like a wall or tree, etc.", ["Parry"])
    },
    {
        id: 1732,
        category: "Pirate",
        name: "Booming Voice",
        type: "General",
        timing: ["2"],
        rules: createSkillRuleText("Captain only<br><br>Once per turn, the captain may shout encouraging words (or threats) at any one pirate within 8\" who just failed his Leadership Test to see if he runs away from combat, or to stop running away if he was already fleeing. That pirate may then re-roll the test. This can only be done if the Captain is on his feet, but not if the Captain is in close combat himself.", ["Leadership"])
    },
    {
        id: 1733,
        category: "Pirate",
        name: "Hardy Constitution",
        type: "General",
        timing: ["9"],
        rules: "During the battle, the pirate may ignore any Critical Hits on a roll of 5+ (the wound is treated as normal if the roll is successful). If the roll is failed, the Critical Hit is worked out as normal."
    },
    {
        id: 1734,
        category: "Pirate",
        name: "Swashbuckler",
        type: "General",
        timing: ["9"],
        rules: createSkillRuleText("The pirate may make a Leadership Test at the end of any Hand-to-Hand phase (pirate’s or enemy’s turn) if he is still in base contact with any enemy models. If he passes he may make a normal movement away from the enemy (he may not run or charge), without the enemy striking any blows on him. If he fails the test he remains in combat and must fight as normal in the following turn.", ["Leadership"])
    }



];
