// Import rules for reference functionality
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

// Helper function to create special rule text with rule references
const createSpecialRuleText = (text, ruleReferences = []) => {
    let processedText = text;

    // Replace rule references in the text
    ruleReferences.forEach(ruleName => {
        const referenceHtml = createRuleReference(ruleName);
        // Use more precise regex to avoid replacing within other words
        processedText = processedText.replace(
            new RegExp(`(?<!\\w)${ruleName}(?!\\w)`),
            referenceHtml
        );
    });

    return processedText;
};

// Helper function to create expandable table rows
const createRuleTable = (description, headers, rows, ruleReferences = []) => {
    const headerHtml = headers.map(header =>
        `<th class="text-left py-2 px-3 text-slate-300">${header}</th>`
    ).join('');

    const rowHtml = rows.map(row => {
        const expandableContent = row.expandableContent ? `
            <div onclick="this.nextElementSibling.classList.toggle('hidden')" class="cursor-pointer font-semibold text-mordheim-gold hover:text-yellow-400 transition-colors">
                &#9660; ${row.title}
            </div>
            <div class="hidden mt-2 p-3 bg-slate-700 rounded border-l-4 border-mordheim-gold text-slate-300">
                ${row.expandableContent}
            </div>
        ` : row.content || '';

        const borderClass = row.border !== false ? 'border-b border-slate-700' : '';

        // Create all cells except the last one normally
        const normalCells = row.cells.slice(0, -1).map(cell =>
            `<td class="py-2 px-3 text-slate-300">${cell}</td>`
        ).join('');

        return `
            <tr class="${borderClass}">
                ${normalCells}
                <td class="py-2 px-3">
                    ${expandableContent}
                </td>
            </tr>
        `;
    }).join('');

    // Process description for rule references
    const processedDescription = createSpecialRuleText(description, ruleReferences);

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

export const SPECIAL_RULES_DETAILS = [
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


    //Leadership and Psychology
    { name: "Leader", rules: "Models within 6\" may use this model's Leadership value when taking Leadership tests.", timing: ["12"] },
    { name: "Leader Expanded", rules: "Models within 12\" may use this model's Leadership value when taking Leadership tests.", timing: ["12"] },
    { name: "Fanatical", rules: "Automatically passes all Leadership tests.", timing: ["2", "3", "9"] },
    //Stupidity Rules
    {
        name: "Skaven Stupidity",
        rules: createSpecialRuleText(
            "Subject to Stupidity unless a Skaven Hero is nearby.",
            ["Stupidity"]
        ),
        timing: ["2"]
    },
    {
        name: "Sheep Stupidity",
        rules: createSpecialRuleText(
            "Black sheep is subject to Stupidity unless a Sheepherder is within 6\" of it.",
            ["Stupidity"]
        ),
        timing: ["2"]
    },
    {
        name: "Stupidity",
        rules: createSpecialRuleText(
            "The model is subject to Stupidity.",
            ["Stupidity"]
        ),
        timing: ["2"]
    },
    {
        name: "Immune to Psychology",
        rules: createSpecialRuleText(
            "Automatically passes all tests related to psychology (Fear, Terror, All-Alone, Fleeing)",
            ["Fear", "All-Alone"]
        ),
        timing: ["2", "3", "9"]
    },
    { name: "Cannot become a Hero", rules: "Can not benefit from lads got talent", timing: ["12"] },
    { name: "Stubborn", rules: "May re-roll any failed Leadership test once", timing: ["2", "9"] },
    { name: "Chivalry", rules: "No Knight may ever use any missile weapon at all, with the exception of Holy Water. Likewise, they will never use any drug or poison, nor learn any spells (prayers are allowed)", timing: ["12"] },
    { name: "Drunk", rules: "Automatically pass all Leadership based tests", timing: ["2", "9"] },
    {
        name: "Unstable",
        rules: createSpecialRuleText(
            "Do not suffer from Animosity",
            ["Animosity"]
        ),
        timing: ["2"]
    },
    {
        name: "Self Assured",
        rules: createSpecialRuleText(
            "Dark Mages are immune to the effects of All-Alone tests and will never flee as a result.",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    {
        name: "Ignore All Alone Tests",
        rules: createSpecialRuleText(
            "Ignore All-Alone tests",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    { name: "Crazy", rules: "Always pass any Leadership-based Tests. May never learn Academic Skills should they become a Hero on an Advance Roll", timing: ["12"] },
    {
        name: "Savage",
        rules: createSpecialRuleText(
            "Must always run or charge their maximum distance towards the nearest opponent they can see. Friendly models do not block line of sight. Additionally they fight with an extra attack whilst in combat. This does not appear on their profile nor does it count towards the racial maximum. They can never use any form of armour or ranged weapons. Too unstable for other Boyz and can never have the Leader ability or use their Ld stat for Rout tests, except them being the only models left on the board.",
            ["Rout"]
        ),
        timing: ["4"]
    },
    { name: "Don't look at me!", rules: "Companion may never become the Leader of a warband and his Leadership may never be used for any Leadership tests except his own", timing: ["13"] },
    { name: "Respect your betters", rules: "A Mage may never have more spells than the Leader. If a Mage has more spells than the leader he will immediately be challenged to a Wizards Duel. Have another player take control of the Leader for this match. The loser of the duel must leave the warband.", timing: ["12"] },
    {
        name: "Immune to Fear",
        rules: createSpecialRuleText(
            "Immune to Fear",
            ["Fear"]
        ),
        timing: ["4", "9"]
    },
    {
        name: "Not Orcs",
        rules: createSpecialRuleText(
            "Orcs don’t expect much from non-Orcs, and are therefore not unsettled if Goblins or Cave Squigs break or get cut down in battle. In fact, they expect as much from these weaklings! Therefore, when testing to see if an Orc Warband needs to take a Rout test, each Goblin Warrior or Cave Squig taken out of action only counts as half a model. Therefore, a band of 5 Orcs and 10 Goblins (15 models) would only have to take a test if 4 models fell (4 Orcs or 8 Goblins, or some combination thereof ).",
            ["Rout"]
        ),
        timing: ["2"]
    },
    {
        name: "Animosity",
        rules: createSpecialRuleText(
            "At the start of the player's turn, roll a D6 for each warrior that has the Animosity rule. A roll of 1 means that the warrior has taken offense to something one of his mates has done or said. Do not roll for models that are engaged in hand-to-hand combat.",
            ["Animosity"]
        ),
        timing: ["2"]
    },
    {
        name: "Drunken", rules: createRuleTable(
            "Roll 1D6 at the start of each turn to determine the warrior's state:",
            ["D6 Roll", "Effect"],
            [
                {
                    cells: ["1", ""],
                    content: createSpecialRuleText("Must test for Stupidity this turn", ["Stupidity"]),
                    border: true
                },
                {
                    cells: ["2-5", ""],
                    content: "No effect",
                    border: true
                },
                {
                    cells: ["6", ""],
                    content: createSpecialRuleText("Becomes subject to Frenzy for this turn", ["Frenzy"]),
                    border: false
                }
            ]
        ),
        timing: ["1"]
    },
    {
        name: "Knight's Virtue",
        rules: createSpecialRuleText(
            "Knight will never panic and break from combat and so does not have to pass a Leadership test for being All-Alone",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    { name: "Deathwish", rules: "Troll Slayers seek an honourable death in combat. They are completely immune to all psychology and never need to test if fighting alone.", timing: ["2", "4", "9"] },
    {
        name: "Hardened",
        rules: createSpecialRuleText(
            "Immune to Fear, and never have to take All-Alone tests (they prefer to work alone anyway.)",
            ["Fear", "All-Alone"]
        ),
        timing: ["2", "4", "9"]
    },
    {
        name: "Cold Blooded",
        rules: createSpecialRuleText(
            "All Lizardmen are slow to react to psychology, they may roll 3D6 and select the lowest two dice when taking a psychology test or Rout test. A Lizardmen Warband may never use the Leadership of Saurus or Kroxigor when taking a rout test.",
            ["Rout"]
        ),
        timing: ["2", "4", "9"]
    },
    //Magic and Religion
    { name: "Magic User", rules: "Can cast spells", timing: ["12"] },
    { name: "Prayers", rules: "Can use prayers", timing: ["12"] },
    { name: "Cannot cast spells in armour", rules: "Cannot cast spells in armour", timing: ["7", "12"] },
    //Hate and Enmity
    {
        name: "Hate",
        rules: createSpecialRuleText(
            "Subject to Hatred against a type of enemy",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Burn the Witch!",
        rules: createSpecialRuleText(
            "Subject to Hatred against all models who can cast spells",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hate Chaos",
        rules: createSpecialRuleText(
            "Subject to Hatred against all chaotic warbands",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hate Undead",
        rules: createSpecialRuleText(
            "Subject to Hatred against all undead warbands",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hate Dark Elves",
        rules: createSpecialRuleText(
            "Subject to Hatred against all Dark Elf warbands",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hate Skaven",
        rules: createSpecialRuleText(
            "Subject to Hatred against all Skaven warbands",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hate Stunties",
        rules: createSpecialRuleText(
            "Subject to Hatred against all Dwarf warbands",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Enemy of the Night",
        rules: createSpecialRuleText(
            "Subject to Hatred against Undead and Vampires",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Mad Max Hatred",
        rules: createSpecialRuleText(
            "Subject to Hatred against Orcs and Goblins, Black Orcs, Forest Goblins, Horned Hunters, Sisters of Sigmar, Middenheimers, Skaven, Undead, Beastmen, Possessed, Carnival of Chaos.",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Zealous",
        rules: createSpecialRuleText(
            "Subject to Hatred against Undead/Chaotic warbands",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hang the Bandit!",
        rules: createSpecialRuleText(
            "Subject to Hatred against Bandits and Outlaws",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Kindred Hatred",
        rules: createSpecialRuleText(
            "Subject to Hatred against other types of Elves",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Despise Despoilers",
        rules: createSpecialRuleText(
            "Subject to Hatred against Necromancers, and anyone who casts spells from the Necromancy or the Dreaded Scrolls of Nagash.",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hates Dark Elves",
        rules: createSpecialRuleText(
            "Subject to Hatred against dark Elves",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Strigoi Kindred Hatred",
        rules: createSpecialRuleText(
            "Subject to Hatred against other types of Vampires",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hate Orcs and Goblins",
        rules: createSpecialRuleText(
            "Subject to Hatred against all Orc and Goblin warband. May re-roll missed attacks in first turn of combat against hated enemies. Bonus only applies in first turn of each combat.",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Wolf Priest Hatred",
        rules: createSpecialRuleText(
            "Wolf Priests see Witch Hunters (Templars of Sigmar), Warrior-Priests, Sigmarite Matriarchs and Sisters Superior as agents of an opposing cult, and thus they are subject to Hatred against these models. That Hatred does not extend to other models in those warbands, as the Wolf Priests see them simply as misguided followers of an errant cult.",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Hatred",
        rules: createSpecialRuleText(
            "Subject to Hatred against all Enemies",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    {
        name: "Gaolers Hatred",
        rules: createSpecialRuleText(
            "Subject to Hatred against all Skaven, Possessed, Beastsman, Carnival of Chaos and Undead war bands",
            ["Hatred"]
        ),
        timing: ["9"]
    },
    //Movement and Terrain
    { name: "May not run", rules: "Cannot declare a Run action", timing: ["4"] },
    { name: "Ride Horse", rules: "Model is trained in riding horses", timing: ["12"] },
    { name: "Ride", rules: "Model has the Ride skill", timing: ["12"] },
    { name: "Combat Riding", rules: "A warrior with this skill may make a single additional S4 attack when charging an unmounted opponent. In subsequent rounds of combat, or if charged by enemy warriors, the mounted warrior fights as normal.", timing: ["4", "10"] },
    { name: "Horse Handling", rules: "A warrior with this skill has a beneficial effect on the animals under his care. If a warrior has the Animal Handling skill for a particular animal, any such animals may use his Leadership provided he is within 6\". If the warband's leader is also nearby, a player may choose which of the warriors' Leadership to use unless the animal is stupid, in which case only the handler's Leadership may be used. In addition, stubborn animals with a handler in base contact, ignore the effects of stubbornness. ", timing: ["2", "12"] },
    { name: "One with the Jungle", rules: "No movement penalty in jungle terrain", timing: ["4"] },
    { name: "Aquatic", rules: "No penalty moving through water", timing: ["4"] },
    { name: "Infiltrator", rules: "A warrior with this skill is always placed on the battlefield after the opposing warband and can be placed anywhere on the table as long as it is out of sight of the opposing warband and more than 12\" away from any enemy model.", timing: ["1"] },
    { name: "Natural Stealth", rules: "If the fighter is Hiding, enemy models suffer -1 to their Initiative value for determining if they can detect him.", timing: ["5"] },
    { name: "Druchii Natural Stealth", rules: "If a Shade is Hidden, enemy models halve their Initiative value for determining if they can detect it or not.", timing: ["5"] },
    { name: "Stealthy", rules: "May deploy twice the distance onto the battlefield than other warriors and may start the battle Hiding", timing: ["1"] },
    { name: "Woodland Dwelling", rules: "They suffer no movement penalties for moving through wooded areas", timing: ["4"] },
    { name: "Armour", rules: "Dwarfs never suffer movement penalties for wearing armour.", timing: ["4"] },
    { name: "Minderz", rules: "Each Squig must always remain within 6\" of a Goblin Warrior, who keeps the creature in line. If a Cave Squig finds itself without a Goblin within 6\" at the start of its Movement phase, it will go wild. From that point on, move the Squig 2D6\" in a random direction during each of its Movement phases. If its movement takes it into contact with another model (friend or foe), it will engage the model in hand-to-hand combat as normal. The Cave Squig is out of the Orc & Goblin player’s control until the end of the game.", timing: ["4"] },
    { name: "Squig Movement", rules: "Squigs do not have a set Movement characteristic but move with an ungainly bouncing stride. To represent this, when moving Squigs, roll 2D6 for the distance they move. Squigs never run and never declare charges. Instead, they are allowed to contact enemy models with their normal 2D6\" movement. If this happens, they count as charging for the following round of close combat, just as if they had declared a charge.", timing: ["4"] },
    { name: "Great Squig Movement", rules: "Great Squigs do not have a set Movement characteristic but move with an ungainly bouncing stride. To represent this, when moving Squigs, roll 3D6 for the distance they move. Squigs never run and never declare charges. Instead, they are allowed to contact enemy models with their normal 3D6\" movement. If this happens, they count as charging for the following round of close combat, just as if they had declared a charge.", timing: ["4"] },
    { name: "Excellent Sight", rules: "Fighter can spot Hidden enemies from twice as far away as other warriors (i.e. twice their Initiative in inches).", timing: ["7"] },
    { name: "Concealment", rules: "If an enemy warrior wishes to charge the model that he cannot see (but was not declared as Hidden), he must subtract 1 from his Initiative before making his Initiative test. Note that a roll of ‘6’ always fails when rolling to charge a model that the warrior cannot see. Also, models halve their Initiative when checking the range to see if they can detect a model who has been declared as Hiding.", timing: ["5"] },
    //Combat and Damage
    {
        name: "Fear",
        rules: createSpecialRuleText(
            "Causes Fear",
            ["Fear"]
        ),
        timing: ["3", "9"]
    },
    {
        name: "Fear Elves",
        rules: createSpecialRuleText(
            "Night Goblins are subject to Fear from the Elven race. This only affects Night Goblins, not any other models in the warband. Fanatics are so out of their skull that they are not affected.",
            ["Fear"]
        ),
        timing: ["3", "9"]
    },
    { name: "Mutations", rules: "May start with one or more mutations", timing: ["12"] },
    { name: "Ungor Mutation", rules: "The Ungor may buy one mutation when they level up", timing: ["12"] },
    { name: "Expert Swordsmen", rules: "May re-roll failed hits when charging with a normal sword", timing: ["10"] },
    { name: "No Pain", rules: "Treats a 'Stunned' result on the Injury chart as Knocked Down", timing: ["9"] },
    { name: "Perfect Killer", rules: "Enemy armour saves suffer an extra -1 modifier", timing: ["7", "9"] },
    { name: "Charge", rules: "Fights with 2 Attacks on the turn they charge", timing: ["4", "10"] },
    { name: "Unnatural Strength", rules: "Starts with Strongman skill", timing: ["12"] },
    { name: "Cloud of Flies", rules: "Opponent suffers a -1 to hit modifier in close combat", timing: ["9"] },
    { name: "Stream of Corruption", rules: "Special S3 shooting attack", timing: ["7"] },
    { name: "Unarmed", rules: "Suffer no penalties for fighting unarmed, sometimes grants +1 Attack", timing: ["9"] },
    { name: "Art of Silent Death", rules: "In hand-to-hand combat, if fighting unarmed, they will cause a critical hit on a roll 'to wound' of 5-6 instead of a 6. If the Dragon Monk wields a quarter staff, only the unarmed attacks will cause a critical hit on 5+.", timing: ["9"] },
    { name: "Expert Trapper", rules: "Improved trap placement/trigger", timing: ["4"] },
    { name: "Black Orc", rules: "Natural 6+ Armour Save", timing: ["12"] },
    { name: "Oi Behave!", rules: "Can hit a henchman to modify their Animosity roll", timing: ["9"] },
    { name: "Melee Specialists", rules: "May not use missile weapons", timing: ["9", "12"] },
    { name: "Scaly Skin", rules: "Cold One Beasthounds have tough scaly skin, and are considered to have a 6+ armour save. This save cannot be modified beyond 6 due to strength modifiers but any result of ‘no save’ on the Critical Hit chart will negate the unmodified 6+ save.", timing: ["8", "9"] },
    { name: "Lizardmen Scaly Skin", rules: "All Lizardmen have a natural save thanks to their thick scales. Saurus have a 5+ save and Skinks have a 6+. This save cannot be modified beyond 6 due to Strength modifiers but any result of ‘no save’ on the injury chart will negate this 6+ save. Light Armour adds +1 to the save, as does the addition of a shield.", timing: ["8", "9"] },
    { name: "Expert Riggers", rules: "May re-roll failed Initiative tests Leaping over Gaps, Jumping Down, and performing a Diving Charge, as well as the normal test for Climbing Up or Down that a Rope allows.", timing: ["4"] },
    { name: "Evade", rules: "When an enemy charges a Pursuer he may choose to try and evade. On a successful Initiative test it is considered a failed charge and the normal rules apply", timing: ["9"] },
    { name: "Regeneration", rules: "Whenever an enemy successfully inflicts a wound roll a D6, on a result of 4 or more the wound is ignored. Fighter may not regenerate wounds caused by fire or fire-based magic. Trolls never roll for Injury after a battle.", timing: ["9"] },
    { name: "Holy Water", rules: "Re-roll failed SI test vs Vampires/Undead", timing: ["12"] },
    {
        name: "Grizzled",
        rules: createSpecialRuleText(
            "Ignore All-Alone tests",
            ["All-Alone"]
        ),
        timing: ["12"]
    },
    {
        name: "Frenzy",
        rules: createSpecialRuleText(
            "Subject to Frenzy",
            ["Frenzy"]
        ),
        timing: ["4", "10"]
    },
    {
        name: "Berserkers",
        rules: createSpecialRuleText(
            "Red Toof Boyz are affected by the rules for Frenzy. In addition, if they begin their turn within charge range of an enemy, they are immune to Animosity for that turn.",
            ["Frenzy", "Animosity"]
        ),
        timing: ["2", "4", "10"]
    },
    { name: "Gun-Rest", rules: "A Streltsi warrior armed with both halberd and handgun may use the halberd as a gun-rest. The warrior receives a +1 on his ‘to hit’ roll with the handgun, as long as he did not move that turn (this applies even if the warrior has a skill that allows him to move and shoot with his handgun – he must not move if he is to rest the gun).", timing: ["4", "7"] },
    { name: "Bloodlust", rules: "Must charge nearest model, friend or foe", timing: ["4"] },
    { name: "Vomit", rules: "Instead of his normal attacks, a Troll can regurgitate its highly corrosive digestive juices on an unfortunate hand-to-hand combat opponent. This is a single attack that automatically hits with a Strength of 5 and ignores armour saves.", timing: ["9"] },
    { name: "Large Target", rules: "You may always choose to shoot at a Large Target if you can see it, whether it is in cover or not and even if it is not the closest target. Shooting at a large target grants a +1 modifier to the hit roll", timing: ["8"] },
    { name: "Immune to Poison", rules: "Not affected by any poison", timing: ["9"] },
    { name: "Hard Head", rules: "Dwarfs ignore the special rules for maces, clubs, etc.", timing: ["9"] },
    { name: "Dwarf Expert Weaponsmith", rules: "A Weaponsmith can increase the distance the warband's missile weapons can shoot. Missile weapons bought from the warband's basic equipment lists have their range increased by 3\" for pistols and 6\" for crossbows and handguns. Range increases only apply in battles in which the weaponsmith takes part (though they do apply even if he is yet to enter the battlefield or has already been taken out of action in this battle). He has no effect on the equipment of Hired Swords.", timing: ["7"] },
    { name: "Nuln Expert Weaponsmith", rules: "A Weaponsmith can increase the distance the warband's missile weapons can shoot. Missile weapons bought from the warband's basic equipment lists have their range increased by 3\" for pistols and 6\" for black powder weapons. Range increases only apply in battles in which the weaponsmith takes part (though they do apply even if he is yet to enter the battlefield or has already been taken out of action in this battle). He has no effect on the equipment of Hired Swords.", timing: ["7"] },
    { name: "Trample", rules: "As well as their weapons, Centigors use their hooves and sheer size to crush their enemies. This counts as an additional attack, which does not benefit from weapon bonuses or penalties", timing: ["9"] },
    { name: "Bloodgreed", rules: "If a Minotaur puts all of its enemies out of action in hand-to-hand combat, it becomes frenzied on a D6 roll of 4+", timing: ["9"] },
    {
        name: "Hard to Kill",
        rules: createRuleTable(
            "Dwarfs are tough, resilient individuals who can only be taken out of action on a roll of 6 instead of 5-6 when rolling on the Injury chart.",
            ["D6", "Results"],
            [
                {
                    cells: ["1-2", ""],
                    content: "Knocked Down",
                    border: true
                },
                {
                    cells: ["3-5", ""],
                    content: "Stunned",
                    border: true
                },
                {
                    cells: ["6", ""],
                    content: "Out of Action",
                    border: false
                }
            ]
        ),
        timing: ["9"]
    },
    { name: "Daemonic Aura", rules: "Due to the magical, intangible nature of Daemons they have a special Armour save of 5+. This is modified by the Strength of the attack as normal and is completely negated by magic weapons and spells. This models attacks are considered as magical also.", timing: ["8", "9"] },
    { name: "Sluggas", rules: "In the shooting phase, the Sluggas may throw thrown weapons up to three times. This may not be combined with Quick Shot if they should be promoted to hero status.", timing: ["7"] },
    { name: "Poisonous", rules: "The Gigantic Spider’s maw drips with vile poisons. When it wounds an enemy and a roll is made on the injury table, 1: knocked down, 2-4: stunned, and 5-6: Out of Action.", timing: ["9"] },
    { name: "Hunter", rules: "May fire each turn with handgun or Hochland long rifle.", timing: ["7"] },
    { name: "Quick Reload", rules: "May fire each turn with handgun or Hochland long rifle.", timing: ["7"] },
    { name: "Crack Shot", rules: "Experts with pistols in close quarters; they have an uncanny ability to turn what should have missed its target into a success. When using pistols in close combat, they may re-roll any missed to-hit rolls with the pistol in the first round of combat.", timing: ["9"] },
    { name: "Swordmaster", rules: "The Swordmaster successfully parries an enemy blow on a roll equal to or over the roll to hit, not just over the roll as with normal parries. Obviously a Swordmaster must first be armed with a weapon or armour that allows him to Parry in order to use this rule.", timing: ["9"] },
    {
        name: "Convincing Manner",
        rules: createSpecialRuleText(
            "Hucksters specialize in convincing strangers of their benevolent intentions. When an enemy warrior attempts to charge a member of the huckster’s warband within 12” of the huckster, the enemy must first pass a successful Leadership test. If the warrior fails the test he may not charge and remains stationary for the turn (treat as a failed charge), exactly as if he had failed a test to charge a Fear-causing enemy. Note that individuals subject to stupidity and animals are immune to this effect (they are too stupid to understand what the huckster is saying).",
            ["Fear"]
        ),
        timing: ["5"]
    },
    { name: "Outrider Horse", rules: "Fighter comes with a Riding Horse. This may be upgraded to a Warhorse for an additional +40 gc.", timing: ["12"] },
    { name: "Bite Attack", rules: "Saurus have a powerful bite attack, this bite attack uses the Saurus’ own Strength to wound and receive no penalty for not using a weapon. The Bite attack always strikes last, regardless of who charged or which weapon is used. The Bite even attacks after Double-Handed Weapons.", timing: ["9"] },
    { name: "Flammable", rules: "The Tomb Lord is as dry as tinder and wrapped in bandages soaked in highly flammable resins and preservatives. A hit from a fire-based attack will cause double the normal number of wounds on it.", timing: ["7", "9"] },
    { name: "Scorpions sting", rules: "Scorpions attack using the poisonous sting in their tails. This attack is worked out exactly as if the scorpion was attacking with Black Lotus.", timing: ["9"] },
    //Experience/Recruitment
    { name: "Do not gain experience", rules: "Model cannot gain experience", timing: ["12"] },
    { name: "Halfling Promotion", rules: "Cannot choose Strength skills if promoted to hero", timing: ["13"] },
    { name: "Lowest of the Low", rules: "Must re-roll 'That lad's got talent'", timing: ["13"] },
    { name: "No Brain", rules: "Never gains experience", timing: ["12"] },
    { name: "Nurgle's Blessings", rules: "Must start with one or more Blessings", timing: ["12"] },
    { name: "Black Orc Blood", rules: "One Young'un may be upgraded to a Black Orc Warrior", timing: ["12"] },
    { name: "Life of Slavery", rules: "Killed if 'Lad's got talent' is rolled", timing: ["13"] },
    { name: "Runts", rules: "Killed if 'Lad's got talent' is rolled", timing: ["13"] },
    { name: "Scavenger", rules: "Automatically loots a fallen model after the game", timing: ["13"] },
    { name: "Looters", rules: "Automatically loots a fallen model after the game", timing: ["13"] },
    { name: "Uncommon Orc", rules: "Cannot outnumber Orc Boyz", timing: ["12"] },
    { name: "Low Caste", rules: "Re-roll 'Lad's Got Talent'", timing: ["13"] },
    { name: "Knighthood", rules: "When a Squire rolls “The Lad's Got Talent”, you may choose one of two options when promoting him to a hero: to have him remain a Squire, or to have him become a Knight Errant. (Note: in this manner, you may have more than three Knights Errant in your Warband). If you choose to keep him a Squire, he may choose two skill lists from following lists: Combat, Academic, Strength, or Speed. He retains his normal Squire equipment tables. If you choose to make him a Knight Errant, he immediately gains the following rules/bonuses instead of receiving an immediate advancement: ‘Knight’, ‘Vain’ and ‘Impetuous’. The new knight may learn Special Skills, in addition to two other skill sets, but must immediately switch his equipment to Knight Equipment list. The new knight may never use missile weapons.", timing: ["13"] },
    { name: "Not Hired", rules: "Follows special recruitment rules", timing: ["1"] },
    { name: "Mutant", rules: "May gain unique mutations", timing: ["12"] },
    { name: "No Talent", rules: "Must re-roll 'That lad's got talent'", timing: ["13"] },
    { name: "Peasants", rules: "Must re-roll 'That lad's got talent'", timing: ["13"] },
    { name: "Animal", rules: "A Minotaur is far more bestial than its Beastmen brethren and, although it may gain Experience, it may never become a Hero.", timing: ["13"] },
    //Miscellaneous
    { name: "Magic User", rules: "Model can cast spells", timing: ["12"] },
    { name: "Prayers", rules: "Model can use Prayers", timing: ["12"] },
    { name: "Inheritance", rules: "One starting item is half price. Losing an ancestral item is considered very disrespectful and if the item is ever lost (e.g. from a Robbed result on the Serious Injury chart), the Captain MUST replace it with a finely-made substitute as quickly as possible or risk being haunted by the angry spirits of his ancestors. To replace an ancestral item, the Captain must purchase the same item of equipment at 150% of its normal price. This higher cost represents the fine detail and valuable materials used in the item’s manufacture. Until the item is replaced, the Captain suffers a -1 penalty to all tests and rolls to hit.", timing: ["12"] },
    { name: "Desert Trader", rules: "+1 to find rare items, non-cumulative", timing: ["12"] },
    { name: "Cloak & Dagger", rules: "The Duellist counts as using a buckler in close combat.", timing: ["9"] },
    { name: "Swarm", rules: "No maximum number in a Henchman group", timing: ["12"] },
    { name: "May not wear armour", rules: "May not wear armour", timing: ["12"] },
    { name: "Unique Equipment", rules: "Has special wargear not available elsewhere", timing: ["12"] },
    { name: "Blessed Sight", rules: "An Augur can re-roll any failed characteristic tests (climbing, resisting spells or any other reason), and any rolls to hit in close combat or shooting. You must accept the second result. In addition, an Augur can use her Blessed Sight to help the Sisterhood when they are searching the city for wyrdstone. If the Augur is not put out of action in the battle, you may roll two dice for her in the exploration phase and pick either dice as the result.", timing: ["12"] },
    { name: "Pack Size", rules: "You can recruit as many Giant Rats as you wish.", timing: ["12"] },
    { name: "No Respect", rules: "Ruffians are objects of a strange mix of pity and abject fear for their fellows and may never become a warband leader.", timing: ["13"] },
    { name: "Always Hungry", rules: "A Troll requires an upkeep cost. This upkeep represents the copious amounts of food that must be fed to the Troll in order to keep him loyal to the warband. The warband must pay 15 gold crowns after every game in order to keep the Troll. If the warband lacks the gold to pay the upkeep, the Boss has the option of sacrificing two Goblin Warriors or Cave Squigs to the Troll in lieu of buying food (Trolls eat nearly anything). If this fee is not paid (either in gold or in warband members) the Troll gets hungry and wanders off in search of food..", timing: ["13"] },
    { name: "Bear Handler", rules: "A Kislevite Warband that includes a Bear Tamer is allowed to purchase a Bear as a henchman. This bear has been trained to follow the Tamer’s commands, and so will automatically pass its stupidity tests when within 6\" of the Bear Tamer (even if the Tamer has been Knocked Down or Stunned).", timing: ["2"] },
    { name: "Guardian", rules: "The Guardian comes as part of the Plague Cart. In fact, more often than not he is physically bonded to the cart in some twisted nightmare of flesh and wood. He may therefore never dismount from the cart or leave under any circumstances. In addition, as he is part of the Cart he cannot be injured unless the Cart is destroyed in which case so is he. The Guardian is considered a Daemonic creature and so never gains any Experience. Attacks from the Guardian cause Nurgle’s Rot", timing: ["12", "9"] },
    { name: "Plague Cart", rules: "The maximum number of warriors allowed in the warband is increased by +2. In addition, the Daemonic Instability of the Daemons within the warband is slightly offset. Plague Bearers and Nurglings may re-roll Leadership tests for Instability and may +1 to their Injury tests if taken out of action.", timing: ["12", "13"] },
    {
        name: "Daemonic Instability",
        rules: createSpecialRuleText(
            "If taken out of action the fighter is banished and effectively destroyed on a D6 roll of 1-3 (do not roll for injury). In addition, if the warband Rout then each fighter in the group must take an immediate Leadership test. If this test is failed, then the fighter counts as destroyed.",
            ["Rout"]
        ),
        timing: ["13"]
    },
    { name: "Set Traps", rules: "May set a trap if he spends a turn doing nothing else (he may not set traps if he’s just recovered from being Knocked Down). Place a marker in base contact with the Bergjager. When a model, friend or foe, moves within 2\" of the marker he risks setting off the trap – roll a D6. On a score of 3+ he has triggered the trap and suffers a S4 hit (note that the Bergjager won’t trigger his own traps). If the trap did not wound the model or it didn’t trigger, the ‘victim’ may finish his move otherwise he is placed knocked Down or Stunned 2\" from the marker. Regardless whether the trap was triggered or not, the marker is removed.", timing: ["3"] },
    { name: "Ruffian Weapon Limitation", rules: "Ruffians never use missile weapons, as their depth perception leaves a bit to be desired, even if they gain an Advance roll which would otherwise allow them to do so.", timing: ["12"] },
    { name: "Ogre Skills", rules: "An Ogre who becomes a Hero as a result of The Lad’s Got Talent may choose from the Combat and Strength skills.", timing: ["13"] },
    { name: "Slow Witted", rules: "Although Ogres are capable of earning experience and bettering themselves they are not the smartest of creatures. Ogres only gain advances at half the rate of everyone else (ie, they must accrue twice as much experience as normal to get an advance).", timing: ["13"] },
    { name: "Black Powder Weapons (Dark Elves)", rules: "Dark Elves may never use black powder weapons as they find them too crude, noisy and unreliable.", timing: ["12"] },
    { name: "May Ride", rules: "The Forest Goblin Chieftain, may ride the Gigantic Spider. He gains +1 armour save, and shall move at the Gigantic Spider’s rate of 6. Shooting attacks hit the Chieftain on a die roll of 1-2, and the Gigantic Spider on a 3-6. In close combat, the opponent may choose which to hit. The Gigantic Spider no longer has to check for stupidity if it is being ridden, as the Chieftain is directing its actions.", timing: ["12"] },
    { name: "Hired Swords", rules: "Bandits have no compunction about hiring mercenaries, and may hire any Hired Swords allowed to a Human Mercenary warband.", timing: ["13"] },
    { name: "Merchant Caravan Hired Swords", rules: "Merchant Caravans may hire every Hired Sword that is available to Mercenary warbands.", timing: ["13"] },
    { name: "Order of the Mare Hired swords", rules: "Order of the Mare warbands have access to the same hired swords as a mercenary warband would.", timing: ["13"] },
    { name: "Protectorate Of Sigmar Hired Swords", rules: "The Protectorates are selective when it comes to which Hired Swords may accompany them. As such, they may recruit Hired Swords as if they were Witch Hunters.", timing: ["13"] },
    { name: "Outriders Hired Swords", rules: "The Imperial Outriders may only be accompanied by mounted Hired Swords. This includes the Freelance Knight from the Mordheim Rulebook and the Roadwarden from the Empire In Flames supplement. The Highwayman keeps himself a safe distance from any official representatives of the Empire and so may not be hired.", timing: ["13"] },
    { name: "Powder's Expensive!", rules: "Bandits are often too poor to purchase or upkeep expensive equipment like gunpowder weapons. The exception to this is Bandit heroes, who often see such extravagances as pistols as symbols of their status and higher wealth. The higher costs for black powder weapons in the equipment chart, and the fact that henchmen can't purchase them at all, reflect the extreme rarity of these types of weapons for Bandit warbands.", timing: ["12"] },
    { name: "Foragers", rules: "Bandits are used to lean times, and know how to make their gold stretch. Because of this, they usually have fewer expenses between adventures. When determining Income for a Bandit warband, always use the next lower warband size category (a warband with 1-3 members still uses the first column however!). For example, a warband with 15 members finds 4 Treasures in the Exploration Phase. When they sell these Treasures, they use the 10-12 members column instead of the 13-15 members column, resulting in a gain of 5 gold pieces for the warband.", timing: ["13"] },
    { name: "Know Who To Sell To", rules: "Bandits are used to getting rid of stolen goods, and have built up contacts for doing so. When a Bandit warband sells equipment, they get half of any random element of the equipment cost, in addition to the normal half of the item's basic cost.", timing: ["13"] },
    { name: "Weapon Knowledge", rules: "A Duelist must be prepared to fight an opponent with any weapon at any time, so a working knowledge of even exotic weapons is critical for his survival. The weapons in the Bandit equipment chart merely represent the weapons a Duelist may start with. A Duelist may use any close combat or missile weapon that the warband members can get hold of.", timing: ["12"] },
    { name: "Slick Operator", rules: "In between games the player may choose to have the huckster run a con on the local inhabitants of the region. Roll a D6: On a result of 2-6, the con is successful and the warband gains 2D6 gold (the huckster keeps the rest). However, on a result of 1 the huckster’s con has backfired and he is on the run (he misses the next game and no gold is received by the warband).", timing: ["13"] },
    { name: "Looting the Dead", rules: "Normally when a warrior is killed or his wounds cause him to leave the warband and he is taken off the warband’s roster, all of his equipment is lost. However, some unscrupulous individuals will stoop to robbing a dead or incapacitated warrior, thereby gaining his equipment for themselves. When rolling for warriors who were taken Out of Action at the end of a battle, the Bandit player may roll a D6 for any warriors who are to be removed from their warband’s roster. On a roll of 4+ the looter has taken all of the warrior’s equipment — it is the Bandit player’s to keep. Failure indicates that the Looter either didn’t notice the warrior going down, or he didn’t get the opportunity to rob the body. Obviously any warrior can only be looted once, but multiple Looters allow the Bandit player multiple chances that his warband members got the equipment off of each downed warrior. Note also that warriors to be looted can be from any warband participating in the game, including the Bandit warband — Bandits are certainly not above looting their own dead!", timing: ["13"] },
    { name: "Trailblazers", rules: "Poachers are experts at finding new game or safe campsites for the warband. In the game this is represented by allowing the warband to reroll one D6 for each Poacher in the Exploration phase. Poachers are not as good as Elf Rangers for scouting, but they are often darned close!", timing: ["13"] },
    { name: "Lizardmen Light Armour", rules: "Armour is rare amongst the Lizardmen and the cost of light armour is always 50 gc, even if you are buying it from Equipment chart.", timing: ["13"] },
    { name: "Saurus Rarity", rules: "The Slann Mage-Priests would never include more Saurus braves in a Warband than Skink braves and thus you can never have more Saurus braves than Skink braves in the Warband.", timing: ["13"] },
    { name: "Wagon", rules: "Follows all rules for Wagons (see Empire in Flames Supplement, p. 30–33) unless specified otherwise here.", timing: ["12"] },
    { name: "Daemon", rules: "The Engine of Chaos is powered by the binding of a daemon. All references to draft animals pulling the Wagon should be treated as referring to its daemon. Daemon movement is unaffected by cargo.", timing: ["12"] },
    { name: "Passengers", rules: "A Chaos Dwarf must function as the driver. No other models but captives may passage the Engine of Chaos. No more than six captives may be imprisoned in the Engine at a time – large creatures (Ogres, Minotaurs, etc.) count as two models.", timing: ["12"] },
    { name: "Pedal to the Metal", rules: "The driver may apply the effects of the lash. If an Engine of Chaos goes out of control for then refer to the Out of Control table. In the event of rolling the result ‘Loss of Control', replace a result of 5 with The Daemon has released itself from the sorcery which bound it to the Engine of Chaos. The Engine moves 6\" straight ahead and then comes to a halt. The vehicle may no longer move for the remainder of this battle. ", timing: ["12"] },
    {
        name: "Prisoners",
        rules: createSpecialRuleText(
            "Models always become captives when fighting a battle against a Chaos Dwarf warband that has an Engine of Chaos by rolling the Captured result on the Serious Injuries table or by being taken out of action by a Man-catcher. Note that in both cases their equipment is lost to the Chaos Dwarf warband. Some results on the Mordheim Exploration chart let Chaos Dwarfs acquire captives: Straggler (one) and Prisoners (D3). From the Empire in Flames Exploration chart: Raving Lunatic (one), Lost Children (two), Mordheim Refugees (D3), The Hanging Tree (one), Small Farm and Large Farm (two). Models held as captives can be set free by destroying the Engine of Chaos or by using the prison keys. If a model puts one of the Chaos Dwarf warband's Gaolers out of action they take the keys. A model that takes the keys may free the captives by moving into base contact with the engine. If the Chaos Dwarfs Rout before this happens or if the model with the keys is taken out of action (losing the keys to a new keeper), the captives remain captured. Freed captives must always move towards the closest table edge. Captives not from participating warbands use the basic profile for human warriors (see Mercenary warband). Rescued captives return to their former warbands.",
            ["Rout"]
        ),
        timing: ["13"]
    },
    { name: "Hashut's Reward", rules: "The Chaos Dwarfs may choose to send captives back to the Dark Lands after a battle. If they do this, any number of captives must be sacrificed to Hashut. The Engine of Chaos plus one Hero must miss the next battle. Unless there is another engine, no models may be captured until they return. Captives must be removed from their warbands rosters permanently. (1-3: +1 Experience points for the leader.), (4-5: +D3 Experience points which can be distributed among the Heroes.), (6: +2D3 Experience points which can be distributed among the Heroes plus D6x5 gold crowns.)", timing: ["13"] },
    { name: "Transport", rules: "The coach is used to transport goods and passengers.", timing: ["12"] },
    { name: "Luxury", rules: "The coach provides luxurious accommodations for passengers.", timing: ["12"] },
    { name: "Opulent Coach", rules: "The opulent coach impresses even the most suspicious merchant and they will flock to offer their most exotic wares to the obviously rich warband leader. The warband leader gains +3 to any rolls to locate rare items", timing: ["12"] },
    { name: "Rickshaw", rules: "One non-animal warband member must be assigned as the runner in order to move the rickshaw. He cannot charge or run whilst pulling the cart. As long as he pulls the rickshaw it remains in base contact with the runner and both are moved together. The runner may stop pulling the rickshaw at any time and move normally the same turn (including declaring charges). There is one seat in the rickshaw for one passenger to sit down. Boarding and deboarding the cart works the same way as mounting and dismounting. As soon as one of the wheels is destroyed (i.e. loses its last wound) the rickshaw can be pulled no more.", timing: ["12"] },
    { name: "Rickshaw Shooting", rules: "Models shooting at a rickshaw get a +1 on their ‘to hit' rolls. For each hit, roll to determine which part of the rickshaw and crew is hit. Then apply ‘to wound' rolls accordingly. 1-2: Runner ,3-4: Rickshaw ,5: Wheel ,6: Passenger.", timing: ["8"] },
    { name: "Rickshaw Melee", rules: "In hand-to-hand combat attackers may choose whether they want to attack the runner, a wheel, the rickshaw itself or the passenger as long as they are in base contact with the respective part. The passenger is hit on 6+ only. Note that as soon as one of the wheels is destroyed (i.e. loses its last wound) the rickshaw can be pulled no more. Unless the rickshaw is destroyed completely it can be repaired after the battle.", timing: ["9"] },
    { name: "Rickshaw Post Battle", rules: "Unless the rickshaw is destroyed completely it can be repaired after the battle.", timing: ["13"] },
    { name: "Boat Movement", rules: "Boats move 6\" when moving with the current of a river (the direction of the river flow must be established before the start of the game). Boats may move 4\" when traveling against the current. Boats must move at least half of their movement allowance unless they have been anchored or tethered to the shore. Boats, regardless of size, may make a single turn of up to 45 degrees at the end of their movement.", timing: ["4"] },
    { name: "Boat Terrain", rules: "A boat can encounter natural terrain such as rocks or man-made obstacles such as logjams specifically placed to obstruct its movement. Both the aforementioned terrain types are impassable to boats, and they will suffer D3 Strength 7 hits should they move into them and also come to an immediate halt.", timing: ["4"] },
    { name: "Boat Transport", rules: "All the above rules for wagons apply. In addition, because boats are considerably bigger than wagons, they can therefore transport a lot more. A rowing boat can transport up to six human-sized warriors or smaller, or the equivalent in cargo. A river boat can transport up to eight human-sized warriors or smaller, or the equivalent in cargo. A barge can transport up to twelve human-sized warriors or smaller, or the equivalent in cargo.", timing: ["12"] },
    { name: "Boat Mounting Dismounting", rules: "A friendly warrior may board a stationary boat by simply moving into contact with it (boats are only considered stationary if they are tethered to shore). Place the model either on the boat or move it with the boat in base contact to simulate it being transported. Similarly, a warrior may dismount from a stationary boat by moving away from contact. Warriors may attempt to mount or dismount from a moving boat by passing an Initiative test. If they fail, they fall into the water. Warriors may attempt to board a moving boat from another moving boat with a modifier of -1 to their Initiative test — this counts as a charge.", timing: ["4"] },
    { name: "Boat Shooting", rules: "1: Roll to damage the boat using the stat line above — if damaged roll again on the Propulsion table, 2: Rudder — Roll to damage the rudder using the stat line above — if damaged the boat may only turn from now on after coming to a complete halt by using a combination of oars/boathooks., 3-4: Randomly select a crew member and roll to wound and injure as normal — see loss of driver above if applicable. Any crew member that is wounded must make an immediate Initiative test — if this is failed he has fallen from the boat., 5-6: Roll to damage the boat using the stat line.", timing: ["8"] },
    { name: "Boat Propulsion Damage", rules: "1-2: Sail damaged/oars splintered: The boat's speed is permanently reduced by -1\". 4-5: Rigging damaged/oars splintered: The boat's speed is permanently reduced by -2\". 6: Mast falls! — With the loss of the mast (or all of the oars in the case of an oared vessel) the boat may only drift 2\" in the direction of the current. All crew must immediately test on their Initiative to avoid the falling mast (this does not apply to oared vessels obviously). If a crewman fails this test he receives an immediate Strength 6 hit.", timing: ["12"] },
    { name: "Boat Hull Damage", rules: "When the boat loses its final point of damage/wound it is destroyed and sinks immediately. Each crew member falls into the water and must make the appropriate tests for swimming.", timing: ["8", "9"] },
    { name: "Chariot Mounting", rules: "A charioteer may mount and dismount a chariot in the same way as a ridden steed.", timing: ["4"] },
    { name: "Chariot Movement", rules: "A Skeleton Chariot normally moves at 8\" and may not run. However, it may double its normal move when charging.", timing: ["4"] },
    { name: "Chariot Difficult Ground", rules: "If a chariot moves over difficult ground it suffers D3 Strength 4 hits. If the chariot is charging over difficult ground, it suffers 2D3 Strength 6 hits.", timing: ["4"] },
    { name: "Chariot Steeds", rules: "If one steed dies, the chariot is reduced to half movement but may still charge (also at half normal charge distance). However impact hits will no longer be effective. If both steeds die, the chariot is immobile and the charioteer must fight on foot.", timing: ["12"] },
    { name: "Chariot Melee", rules: "A charioteer is allowed to charge any enemy warrior that he can see who is in the open, he is not forced to charge the closest warrior. If the chariot moves more than half its normal move, it may make impact bits. Anyone directly in the path of a charging chariot is permitted an Initiative test to dodge out of the way and avoid being hit. The charioteer must roll to hit as normal, a successful hit causing a single wound at Strength 4 with a -2 armour save. At the end of the charge move, the charioteer may fight any enemy models in base contact, as if he had charged normally. In combat, enemy warriors in contact may elect to strike the chariot or its driver. If hitting the chariot, the attacker must still make a to hit roll against the charioteer. If in base contact with only a Skeletal Steed, then only the steed can be hit.", timing: ["9"] },
    { name: "Chariot Shooting", rules: "A chariot is a large target and a warrior gains +1 to hit when shooting at a chariot. If the chariot is hit, roll a D6 to see where it is hit: 1-2 steed, 3-4 chariot, 5-6 charioteer.", timing: ["8"] },
    { name: "Chariot Skill Requirment", rules: "To use the Skeleton Chariot to it's full effect, Tomb Guardian have access to an additional skill: Drive Chariot (academic)", timing: null },
    { name: "Trade Wagon Storage", rules: "All the warband's stored equipment and treasures are stored inside the Trade Wagon. Note that this does not include the warband's gold crowns. If the Trade Wagon is destroyed, all the warband's stored equipment and treasures are lost. Until a new Trade Wagon (or Stage Coach, if the player wishes) is bought, equipment cannot be stored. Any treasures gained after a battle are lost if they are not sold before the next game.", timing: ["13"] },
    { name: "Trade Wagon Reputation", rules: "For every five different rare items stored inside the Trade Wagon, the Merchant gets +1 to his rolls for finding rare items.", timing: ["13"] },
    {
        name: "Trade Wagon Abandoned",
        rules: createSpecialRuleText(
            "If the warband fails its Rout test and no model is driving the Trade Wagon, then it is abandoned. The wagon falls into the winning warband's hands. They may choose to steal the contents, to keep the wagon for themselves if allowed to (treat as Wagon or Stage Coach), or agree to cut a deal (using the ransom rules in Captured from the Serious Injuries chart on page 119 of the Mordheim rulebook) with the Merchant. A warband capturing a Wagon from a Merchant Caravan may not search for rare items following the battle unless every model from the Merchant's warband was taken out of action, as word of it spreads and they are avoided by the fearful local traders.",
            ["Rout"]
        ),
        timing: ["13"]
    },
    { name: "Unforgiving", rules: "Warband may never forge an alliance with any Warband of a Chaotic nature (Possessed, Skaven, Beastmen, Dark Elves, etc.).", timing: ["1"] },
    { name: "Tolerant", rules: "Due to their outsider status with their own people, the Elves have learned to stifle their distaste for ‘lesser races’, and have even been known to work alongside them from time to time. The Warband may hire any Hired Sword that is not of a Chaotic or evil bent (so no Skaven, Possessed, Beastmen, Dark Elves, Undead, etc.). They also shun the company of anyone specialising in the use of poison (so no Assassins).", timing: ["1"] },
    { name: "Do not Drink", rules: "Undead models do not need food and water. However any living animals that accompany the Mummies follow the water rules as normal.", timing: ["12"] },
    { name: "Home Ground", rules: "The Tomb Guardians live in the Necropolises and have no trouble locating the hidden tombs in search of weapons and armour to help them defend their homes. A Tomb Guardian warband always roll one extra dice in the Exploration phase.", timing: ["13"] },

    //Warband Specific
    { name: "Incomparable Miners", rules: "Dwarfs spend much of their lives underground searching for precious minerals, and they are the best in the world at this kind of work. In the city of Mordheim they apply similar skills to the search for wyrdstone. When checking for wyrdstone at the end of a game, add +1 to the number of pieces found for a Dwarf warband.", timing: ["13"] },
    { name: "Grudgebearers", rules: "Dwarfs hold an ancient grudge against Elves from the days when the two races fought for supremacy in the Old World. A Dwarf warband may never include any kind of Elven Hired Sword or Dramatis Personae.", timing: ["13"] },
    { name: "Mercenaries (Marienburg)", rules: "Start with 600 Gold; +1 to find rare items", timing: ["13"] },
    { name: "Mercenaries (Trantios)", rules: "Start with 600 Gold", timing: ["13"] },
    { name: "Animals", rules: "May not hire Hired Swords unless specifically stated with the Hired Sword", timing: ["13"] },
    { name: "Dangerous to Know", rules: "A Carnival of Chaos may never hire any type of Hired Sword.", timing: ["13"] },
    { name: "Gromril", rules: "May purchase Gromril Armor and Weapons at reduced cost when adding a fighter.", timing: ["13"] },
    { name: "Ancient Enemies", rules: "May never ally with Chaos warbands.", timing: ["12"] },
    { name: "Lady's Blessing", rules: "Before playing a game of Mordheim make a Leadership test against the Leadership characteristic of the warbands leader. If the test is successful the Lady of the Lake has bestowed her blessing on the warband. The blessing takes the form of a powerful curse upon the enemies of chivalry, and in particular upon those that make use of the foul and dishonourable weapons of mass destruction. Any model in the opposing warband who wishes to fire a black powder weapon must roll a D6 and score 4+ to overcome the curse, otherwise they may not fire the weapon. The opposing player must test each time they wish to fire such a weapon. Models armed with other shooting weapons, such as bows and crossbows, do not have to test unless they dare raise their weapons against the gallant Knights of Bretonnia. If any enemy model wishes to shoot at a Bretonnian Knight (Questing Knights and Errants only), then they must first roll a 4+ on a D6 to overcome the curse.", timing: ["1"] },
    { name: "Tainted", rules: "The Carnival is a similarly unclean mass of mutation and Chaos to the Possessed and so counts as such for purposes of exploration and serious injuries.", timing: ["13"] },
    { name: "Trained", rules: "A bear doesn’t care about the warband’s mission or enmity for other warbands – it’s just following the orders of its trainer. Sometimes it gets bored waiting for orders; for this reason Trained Bears are subject to the rules for Stupidity. If given ‘special attention’ by its trainer, it will mind a bit better, so a bear is not required to take these Stupidity tests if the warband’s Bear Tamer is within 6\". In fact this is the only member of the warband the bear will listen to; a Trained Bear will never use the warband leader’s Leadership for any tests it is required to take. It may use the Bear Tamer’s leadership if within 6\" of him however. Note that the warband cannot control the bear without a Bear Tamer. The Trained Bear may not be used in any game in which the warband's Bear Tamer does not take part (and this means that if the warband does not include a Bear Tamer at all, the warband must keep the bear staked back at camp until they hire a new one!).", timing: ["12"] },
    { name: "Bear Hug", rules: "If the Bear hits the same enemy warrior with both of his attacks in the same round of combat, the player may choose to make a single ‘Bear Hug’ attack instead of resolving the attacks normally. If this option is chosen, each player must roll a D6 and add his model’s Strength to the roll. If the Bear’s total is higher or the totals are equal, the opposing warrior takes a single automatic wound with no armour save allowed. If the enemy warrior’s total is higher, the warrior has broken the Bear’s hold and suffers no damage from the attack.", timing: ["9"] },
    { name: "Fiercely Loyal", rules: "Such dedication is built into the relationship between Bear Tamer and bear that if his trainer is injured, a bear will often stand over the body to protect it, or even drag the trainer’s body to safety. As long as his bear is not taken Out of Action during a game, a Bear Tamer ignores the following results on the Serious Injuries table: ‘Sold to the Pits’, ‘Robbed’, and ‘Captured’ (and ignore equivalent results in settings such as Lustria that have their own special Serious Injury table). If any of these results are rolled for the Bear Tamer, treat the result as a ‘Full Recovery’ instead.", timing: ["13"] },
    { name: "Distasteful Company", rules: "Orcs may only hire the following Hired Swords: Pit Fighters, Ogre Bodyguards or Warlocks.", timing: ["13"] },
    { name: "Night Goblin Distasteful Company", rules: "May only hire the following Hired Swords: Pit Fighters, Ogre Bodyguards, Warlocks, Witches plus any Hired Sword that specifically states they work with Orcs or Goblins.", timing: ["13"] },
    { name: "Ogre Hunting Party Distasteful Company", rules: "Ogre Hunter warbands may only hire the following hired swords: Hobgoblin Scout, Gnoblar Botcher and Ninja Gnoblar. If your warband does not contain an Ogre Hunter for any reason, you may hire an Ogre Bodyguard and/or Ogre Slaver- however, if you rehire another Ogre Hunter, all other Ogres must leave the warband.", timing: ["13"] },
    { name: "Orc Limit", rules: "May not have more than two Goblins for each Orc in the warband (including Orc Heroes).", timing: ["13"] },
    { name: "Goblin Limit", rules: "May not have more Cave Squigs in your warband than you have Goblin Warriors.", timing: ["13"] },
    { name: "Not one of us", rules: "Due to the Amazons' isolationism and suspicions about other races they never side with anyone else. For this reason, the Amazons may not have any Hired Swords or Dramatis Personae unless they are Amazons themselves.", timing: ["13"] },
    {
        name: "Norse Enmity",
        rules: createSpecialRuleText(
            "When facing a Norse Warband an Amazon Warband will fight to the death. The Amazons can re-roll their first failed Rout against the Norse. Remember you can't re-roll a failed re-roll. In addition, Amazons can never choose to voluntarily rout when facing a Norse warband unless their Warband Leader has been taken Out of Action.",
            ["Rout"]
        ),
        timing: ["2"]
    },
    { name: "Sacrifice", rules: "The Amazons are quick to sacrifice any captive to their gods. The Amazons follow the rules for Possessed in the Rulebook when it comes to captives. lf an Amazon Warband captures a Lizardman, they may sacrifice him as normal, plus get a free Skins and Charms", timing: ["13"] },
    { name: "Isolationists", rules: "The Amazons are constantly battling against the predations of the Lizardmen and greedy treasure-seeking Norse. Amazon culture reflects their dislike and distrust of outsiders and in battle they are particularly savage. Amazons get to re-roll any attack rolls that miss in the first round of combat against Lizardmen and Norse", timing: ["9"] },
    { name: "Self-Sufficient", rules: "The men of Ostland have no desire to give their hard-earned gold to outsiders. As a result they can never hire any Mercenaries except for Ogres (who are not an uncommon sight in Ostland).", timing: ["13"] },
    { name: "Let the goons do the work", rules: "Black Orcs rely on themselves to do the killing and do not ride mounts of any kind. Only normal Orcs may ride a boar or other such mount.", timing: ["12"] },
    { name: "Da Boss is Dead!", rules: "If the Boss should be killed a Black Orc will always assume leadership of the warband before any other type, irrespective of relative experience. The replacement will automatically acquire the \"Oi Behave!\" skill.", timing: ["13"] },
    { name: "Cold One Beasthound", rules: "The Beastmaster may be accompanied by up to two Cold One Beasthounds, these are bought as henchmen and follow all rules for listed for them.", timing: ["12"] },
    { name: "Beastmaster", rules: "Cold One Beasthounds are nasty viscous brutes that are barely kept under control. If the Beastmaster dies the beasts will immediately escape from the warband and they are removed from the warband roster. If the Beastmaster is unable to participate in a battle, then neither will the beasts.", timing: ["12"] },
    { name: "Huntsman Beastmaster", rules: "A Huntsman is naturally attuned to the earth and beasts around him. Any animal in the warband may use the Huntsman Leadership characteristic if it is within 6\" of him. Any hostile beast must make a successful Ld Test to charge the Huntsman.", timing: ["12"] },
    { name: "Slavehound Beastmaster", rules: "Slavehounds are vicious creatures that are barely kept under control by their Beastmaster. As long as Beastmaster is not knocked down, stunned or out of action, Slavehounds may use his Leadership instead of their own for any Leadership test, provided that the Beastmaster is within 6\" of the Slavehound in question. But, since Beastmaster is the only authority they respect, they cannot use Leadership of warband Leader. Consequently, if the Beastmaster is unable to participate in a battle, then neither will the beasts. If the warband does not contain a Beastmaster, there is no one able to control Slavehounds, so they have to stay in warband's camp (and when feeding time comes, it has to be done from a safe distance).", timing: ["12"] },
    {
        name: "Don’t Trust ‘Em",
        rules: createSpecialRuleText(
            "While Ranger Warbands are free to ally with other Dwarf warbands in multi-player games, their point of view is so different that they do not trust them fully. Members of a Dwarf Rangers warband are never considered ‘friendly models’ to other dwarfs and vice versa. This means that members of one warband WILL stop members of the other from Marching, they won’t keep each other from taking All-Alone tests, etc. They don’t count as enemy models and may split any treasure found at the end of the game as normal, but the two bands are not friends, make no mistake!",
            ["All-Alone"]
        ),
        timing: ["12"]
    },
    { name: "Inscribe Runes", rules: "A Runesmith knows one minor rune (see list in book), determined randomly when the warband is first created. He may inscribe the rune on an item carried by one of the warriors of his warband, and the item will gain a bonus from the rune for that game. When a Runesmith advances and rolls a skill on the Hero Advance table, he may choose to learn a new rune instead of learning a skill (exactly like a spellcaster advancing and learning a new spell).", timing: ["1", "13"] },
    { name: "Extra Set of Hands", rules: "An Apprentice Runesmith helps his master fashion runic items, doing all the boring grunge-work that makes his master more efficient in his efforts. An Apprentice Runesmith in the warband allows a Master Runesmith to inscribe on two items before each game, instead of only one.", timing: ["1", "13"] },
    { name: "Ride Spiders", rules: "The Chieftain can ride Giant Spiders and the Gigantic Spider as detailed in the ‘Blazing Saddles’ article.", timing: ["12"] },
    { name: "Impeccable Care", rules: "They can ALWAYS use the reduced cost for black powder weapons listed in their starting Equipment List, and they gain an additional +2 on rare rolls to find any black powder weapons since people don’t mind selling broken guns!", timing: ["2"] },
    { name: "Properly Used", rules: "When using the optional Misfire rules, if a one is rolled, roll a second dice. On a 3+ the misfire is ignored (the shot still misses, but the weapon does NOT explode).", timing: ["7"] },
    { name: "Proud To A Fault!", rules: "The members of this warband NEVER use any non-black powder ranged weapons (this prohibition does NOT apply to hired swords or dramatis personae, as they are hired help and have not received proper Nuln training).", timing: ["12"] },
    { name: "Woodcraft", rules: "Followers of Taal make their homes in the wilderness and shall only frequent towns or cities when it is compulsory for them to do so. They are expert woodsmen and their knowledge of the wilds is unrivalled by all except perhaps the Wood Elves. Horned Hunter warbands move through any difficult terrain they encounter without suffering any movement penalties.", timing: ["4"] },
    { name: "Strictures", rules: "Dragon Monks and Warrior Monks never wear any kind of armour.", timing: ["1"] },
    { name: "Distaste for Poison", rules: "May never use any kind of poison or venom.", timing: ["1"] },
    { name: "Outsiders", rules: "The Battle Monks warband may never hire any sort of Hired Sword or Dramatis Personae unless specifically stated with the Hired sword/Dramatis Personae.", timing: ["1"] },
    { name: "Decree", rules: "When the Emissary dies, a new one must be hired as soon as possible. Until you have done so, no other warriors and/or equipment may be bought. The new Emissary will then reclaim Leadership of the warband.", timing: ["13"] },
    { name: "Cathayan Monk Unarmed", rules: "Monks suffer no penalties whatsoever for fighting unarmed and they receive +1 Attack when doing so", timing: ["9"] },
    { name: "Mob", rules: "A Peasant gets +1 Ld for each other allied Peasant model within 3\". Due to their rage, they do not benefit from the leader rule.", timing: ["2"] },
    {
        name: "Ignored",
        rules: createSpecialRuleText(
            "Does not count toward the number of out-of-action models for the purpose of Rout tests.",
            ["Rout"]
        ),
        timing: ["2"]
    },
    { name: "Downtrodden", rules: "When a Peasant is wounded, do not roll for injury. The model is immediately taken out of action.", timing: ["13"] },
    { name: "Black Dwarf Hired Sword", rules: "A Chaos Dwarf warband may hire the following Hired Swords: Ogre Bodyguard, Pit Fighter, Warlock, Imperial Assassin, and Hobgoblin Scout. They may hire any Hired Sword described as all may hire, or allowed by Orc warbands and Chaos warbands. They may never hire Elves of any sort!", timing: ["13"] },
    { name: "Skink Poisoned Weapons", rules: "Dark Venom and Black Lotus can only be used on missile weapons", timing: ["1"] },
    { name: "Weakness ", rules: "When rolling for a Halfling’s injury, treat a roll of a 2 as ‘stunned’.", timing: ["8", "9"] },
    { name: "Inspired Cooking ", rules: "Any Halfling models within 6\" of a Halfling Master Chef may re-roll any failed hits in combat (once per turn).", timing: ["7", "9"] },
    { name: "Sneaky ", rules: "Halfling Thieves can hide in the slightest shadow or piece of cover. Halfling thieves always have a -1 to hit modifier when being shot at, this adds to any other modifiers.", timing: ["8"] },
    { name: "Keen Eyesight ", rules: "Halfling Scouts can spot hidden enemies at twice their Initiative value in inches.", timing: ["7"] },
    { name: "Seafaring", rules: "All Norse warriors get +2 to Strength when they row a boat.", timing: ["12"] },
    { name: "Pack Leader", rules: "Wolves are feral animals that only respond to the strongest in their pack – the Wulfen. In the event that no Wulfen is included in the warband due to a death or an injury, the wolves cannot be used until the creature is replaced", timing: ["12"] },
    { name: "Bestial", rules: "Wulfen are ravenous beasts and therefore immune to psychology. Also despite being greatly revered by their barbarian kinsmen, Wulfen are too feral and uncontrolled to become the leader of the warband.", timing: ["2", "4", "9", "13"] },
    { name: "Missile Restriction", rules: "All warriors in an Outlaws warband may be equipped with only one missile weapon at any time. All warriors must carry a type of bow, but not crossbows, as part of their equipment. So, even if an Outlaw acquires skills that allow him to use additional ballistic weaponry, he cannot do so. The only exception to this is the Cleric who may choose to carry a bow, but is not compelled to do so.", timing: ["12"] },
    { name: "Outlaws of Stirwood Forest Hired Swords", rules: "The following Hired Swords are not available to the Outlaws: Bounty Hunter, Wolf-Priest of Ulric, Norse Shaman, Dark Elf Assassin.", timing: ["1"] },
    { name: "Swabbies-Kidnapped", rules: "Enemy human Heroes who after the game rolled up the Captured result (D66 roll of 61) can be ‘offered’ one opportunity to join the pirate crew. As an alternative to exchanging/ransoming the captured Hero back to their original Warband (or selling him to slavers), the Pirate Captain can instead add the captured enemy to the ship’s crew as follows. Both players roll 2D6, with the Pirate player adding the Captain’s Leadership and the enemy player adding the Leadership of the captured Hero. If either side won that game, it may add +1 to it’s score. If the Pirate player’s result is higher, the Hero renounces his old ways for the life of the high seas! She or he joins the Crew, either starting a new Crew group or joining an existing one if it has four models or less. There is no extra cost to add him to a group which has accumulated experience points, and any equipment or weapons he had are immediately sold off to buy him the proper weapons and armour to match his new unit in an even swap. His skills and characteristics are changed to those of a starting Crewman, or to match those of his new crewmates if joining an existing group. Otherwise, the Hero has resisted the siren’s song of the sea, and is forced to become a Swabbie (see Swabbies below). He is stripped of his equipment and weapons; these are handed out as the player desires. He does retain any skills and keeps his original characteristics, but can only be re-armed with the weapons listed in the Swabbie equipment list.", timing: ["13"] },
    { name: "Swabbies-Henchmen", rules: "Enemy human Henchmen taken Out of Action during the game and then lost from their original Warband for good (a 1-2 was rolled for them post-game) also have a chance of joining up too! Roll another D6 for each: on a roll of 4+, the Pirates manage to drag them away or otherwise make off with their wounded bodies, and patch them up on the ship. The Pirate player can then test to see if they will join exactly as above, by both players rolling 2D6 and adding it to the Captain’s and the Henchman’s Leadership. This test can only be done if the Pirates win the game, so the Pirate player will always get a +1 to his roll. Hired Swords and Special Characters are too skilled to be taken off in this manner, and can never be recruited – they have their own agendas to pursue, and will ensure the pirate life is not part of those plans.", timing: ["13"] },
    { name: "Swabbies-Stragglers", rules: "If a Straggler is found, the Captain can try to convince him to join the crew by making a successful Leadership test. If passed, the Straggler joins as a Swabbie", timing: ["13"] },
    { name: "Swabbies-Prisoner", rules: "If Prisoners are found, roll a D3 to determine how many are rescued. If the Captain passes a Leadership test (he must make a separate test for each one), the Prisoner eagerly joins his rescuers as a member of the Crew, either starting a new Crew group or joining an existing one if it has four models or less. If he is starting a new Crew group, he will start at the normal characteristics levels for a normal Crew member and at Zero Experience. There is no extra cost to add him to an existing group which has accumulated experience points, and his skills and characteristics match those of his new crewmates. The player must pay though to equip and arm the new Crewman as per his new unit. If the player cannot pay, the prisoner must join as a Swabbie. If the test is failed, the Prisoner isn’t quite so convinced of the worthiness of the sea dogs and is added as a Swabbie.", timing: ["13"] },
    { name: "Pirate Hired Swords", rules: "Unless noted otherwise, Pirate Warbands have the same access to Hired Swords & any other items as for a regular human Mercenary Warband, and follow all the normal rules for them as well. They must however pay an additional +20 gc in upkeep if they have both Dwarfs and Elves together in the same warband (the ship is only so big, and the confines make them more irritable than usual!).", timing: ["13"] },
    { name: "Succession", rules: "If the Captain is killed, one of the Mates will take over in the same manner as a Champion taking over for a Mercenary warband.", timing: ["13"] },
    { name: "One-Off Game", rules: "In one-off games, a Pirate Warband starts with two Swabbies for free.", timing: ["1"] },
    { name: "Swivel Guns is Dangerous, Matey", rules: "If a Pirate Warband includes a Swivel Gun, the Gunner wielding it will always be considered an individual and can never have anyone else with him. Since a Pirate Warband may only have one Swivel Gun, if a Gunner is equipped with one then he must either be a new Gunner, or split from an existing unit. If the latter, he retains all Experience and Skills he had previously.", timing: ["1"] },
    { name: "Rabble", rules: "Swabbies do not need to be armed all the same. Each may be given different equipment, but only items listed in the Swabbie equipment list. Swabbies can never use magic, or cast spells of any sort, no matter their original background or abilities.", timing: ["1"] },
    {
        name: "Blimey, they got away",
        rules: createSpecialRuleText(
            "If the Pirate Warband itself Rout, any Swabbies who have already left the table in previous turns are presumed to have made a successful escape, and are never seen from again. Remove them from your warband roster as if they had been killed.",
            ["Rout"]
        ),
        timing: ["13"]
    },
    {
        name: "Don’t mind them mates they ain’t true pirates",
        rules: createSpecialRuleText(
            "The rest of the crew barely notice if any Swabbies run away or go Out of Action – they know they’ll find them later on and give them 30 lashes if they’re lucky! Any Swabbies who are running away or have been taken out of action do not count towards the need to take a Rout test for the warband.",
            ["Rout"]
        ),
        timing: ["2"]
    },
    { name: "Pit Fighter Hired Swords", rules: "Pit Fighters may hire all Hired Swords available except for the Elf Ranger.", timing: ["1"] },
    { name: "Free the Slaves", rules: "Pit Fighters hate all slavers. The Pit Fighters will never sell their captured opponents to the slavers.", timing: ["13"] },
    { name: "In the Pit", rules: "Pit Fighters who capture an opponent may decide to let him fight in the infamous fighting pits of Cutthroat’s Haven. The Pit Fighter warband may decide to send in one or more of their own fighters to fight the captive. If the Pit Fighter wins, he gains +2 Experience, the warband gets all the captive’s armour and weapons +50gc. If the Pit Fighter loses, then roll to see whether he is dead or injured as normal (ignore all following results: Robbed, Captured, Hardened, Sold to the Pits, and Survives against the Odds). He will not lose his armour or weapons. The captive will get the 50gc and the +2 Experience when he wins. If the captive wins, the audience decides whether he gains his freedom. Roll a D6; on a 4+ the audience raises their thumbs and he is free. A 1-3 means he remains the Pit Fighters’ captive and may be fielded in the pits after future games.", timing: ["13"] },
    { name: "Miragleans Hired Sword", rules: "Miragleans warband cannot have Skaven Hired Swords.", timing: ["13"] },
    { name: "Miragleans Crossbow Expert", rules: "Miraglean Heroes have a +1 to hit when using crossbows only.", timing: ["7"] },
    { name: "Miragleans Marksmen", rules: "Miraglean Marksmen have a +1 to hit with any missile weapon.", timing: ["7"] },
    { name: "Reikland Marksmen", rules: "Reikland Marksmen have a +1 to hit with any missile weapon.", timing: ["7"] },
    {
        name: "Remasens Dark Elf Rout Test",
        rules: createSpecialRuleText(
            "Remasen player is allowed to re-roll any Rout test one time and must abide by the second roll. This only applies when fighting Dark Elves.",
            ["Rout"]
        ),
        timing: ["2"]
    },
    { name: "Remasens Hired Sword", rules: "Remasens warband cannot have Dark Elf Hired Swords.", timing: ["13"] },
    { name: "Steadfast Officers", rules: "The leadership value of a Remasen captain, champion and young blood are always one point higher regardless of whom they are fighting.", timing: ["2"] },
    {
        name: "Nasty Reputation",
        rules: createSpecialRuleText(
            "The dreaded sight of them and the very thought of being captured causes Fear in Humans.",
            ["Fear"]
        ),
        timing: ["3", "9"]
    },
    { name: "Drudgery", rules: "Re-roll all results of ‘The lad’s got talent’ for them.", timing: ["13"] },
    { name: "Lord’s Boon;", rules: "Each Knight may, upon purchase, start with ONE of the following items, which is bought at half cost: a Warhorse, Light Armour, OR Heavy Armour. This item may not be traded, given to another warrior, or sold. The warrior may set it aside and choose not to use it, but no Bretonnian warrior would dare use a boon item that belonged to another Knight, even after the warrior’s death. If the Knight dies, his “Lord’s Boon” item is removed from the warband, having been buried with him or returned to his benefactor.", timing: ["12"] },
    {
        name: "Virtue of Purity",
        rules: createSpecialRuleText(
            "Knights with the Virtue of Purity may never voluntarily break from combat, unless he is knocked down. He is immune to All-Alone and any other mundane effect that would cause him to leave combat. Magical spells and effects that would cause him to flee (ex. Dread of Aramar) affect him as normal.",
            ["All-Alone"]
        ),
        timing: ["2", "9"]
    },
    { name: "Vow of Poverty", rules: "May not take a Lance.", timing: ["1"] },
    { name: "Vain", rules: "The Knight may not wear a helmet", timing: ["1"] },
    {
        name: "Impetuous",
        rules: createSpecialRuleText(
            "During each Movement Phase, after declaring charges, a Knight Errant that is not in combat and did not charge this turn must charge an opposing standing warrior (not knocked down or stunned) that is within range if they are able. Likewise, a Knight Errant that declared a charge against a knocked down or stunned opponent will be compelled to charge a viable standing opponent instead. If you wish, you may choose to have the Knight take a leadership test (they may use their Leader's Leadership if they are within range); if the test is passed, they may move as normal or charge their original target. When making a compelled charge, the Knight Errant automatically passes all Fear tests or any other psychology tests that would prevent them from charging.",
            ["Fear"]
        ),
        timing: ["4"]
    },
    {
        name: "Holy Relics Effect",
        rules: createSpecialRuleText(
            "If a Battle Pilgrim owns a Holy Relic, he gains the ability Frenzy (Reminder: when frenzied, he is immune to Hatred.)",
            ["Frenzy", "Hatred"]
        ),
        timing: ["4", "10"]
    },
    { name: "Holy Relics Rules", rules: "Battle Pilgrims may be given a Holy Relic, regardless of the fact that henchman are not normally allowed to take Miscellaneous items. It is possible to give a Holy Relic to Battle Pilgrim that is a part of a larger henchman group. If you do not have enough Holy Relics for every member of the group, the Pilgrim with the relic will break off and form his own individual henchman group.", timing: ["13"] },
    { name: "Corruption of the Mind and Flesh", rules: "Whenever an enemy model, be it Hero or a Henchman of the opponents of the Warband or one of their own models dies, the Warband may opt to perform an obscene ritual to attach a part of the dying warrior into one of the Slaaneshi Beastmen, Cultist or the Slaaneshi Hounds: arm, leg, head or strips of muscle, for example. You can take one stat of the fallen warrior and replace it with the same stat of the Beastman, Cultist or Hound. We encourage players to convert the model to represent the corrupted creature with appropriate new body parts. This ritual costs 1 Wyrdstone, and 1 Hero cannot search for Rare items at the market while performing the ritual.", timing: ["13"] },
    { name: "Agony and Ecstasy", rules: "The Whipmaster who is armed with a Hedonist Whip may decide to use one of its attacks to scourge one friendly model within 3\". This attack automatically hits and has +1 on its rolls to wound. Roll for any injuries as standard. As a reward for such a pious act of devotion, Slaanesh rewards the Whipmaster with a surge of ecstasy that makes the Whipmaster all but invulnerable. The Whipmaster doubles its Toughness. Take a Leadership test at the start of each new turn of the Slaaneshi player. On a failure, this effect ends, though it can be re-activated.", timing: ["10"] },
    {
        name: "Pain and Pleasure",
        rules: createSpecialRuleText(
            "Whenever the Whipmaster suffers an unsaved wound, they will be subject to the rules of Frenzy until the end of their next turn — this frenzy is not negated by being Knocked Down or Stunned.",
            ["Frenzy"]
        ),
        timing: ["4", "10"]
    },
    { name: "Strange Allure", rules: "An enemy wishing to attack a Danseuse in melee combat or with a missile attack must pass a Leadership test to do so before making its attacks. On a failure, the model must re-roll any successful hits.", timing: ["8", "9"] },
    { name: "Pound of Flesh", rules: "Before the battle, you may decide to give one of the Wretches to the Flesh Merchant to carry as a “meat shield” as part of the Merchant’s Equipment. When the Flesh Merchant suffers a wound for any reason, you may elect to let the slave take the hit instead. In this case the Slave is taken Out of Action and removed from the game. The Wretch can make its normal Attacks in melee if used as a Meat Shield. The model does not have a base of its own, and cannot be targeted by enemy attacks. If the Merchant dies, the Wretch is lost with it.", timing: ["1", "8", "9"] },
    { name: "Cruel Fate", rules: "Any captives the warband gains through combat results or exploration can be turned into Wretches at no cost. This is achieved via lobotomy, torture and other acts of depravity.", timing: ["13"] },
    { name: "Flesh Reserve", rules: "Before the battle, you may decide to give one of the Wretches to the Priest to carry as a “sacrificial pawn” as part of the Priest’s Equipment. When the Priest fails to cast a spell, they can choose to sacrifice the Wretch to re-roll the spell roll. The Wretch can make its normal Attacks in melee until it’s alive. The model does not have a base of its own and cannot be targeted by enemy attacks. If the Priest dies, the Wretch is lost with it.", timing: ["1", "8", "9"] },
    { name: "Fluctuating Form", rules: "At the beginning of the battle, and every turn in the Recovery phase, if not engaged in close combat, you may choose whether the Devout manifests in male or female aspect. If you choose male, the Devout gains +1 WS, S, A, and T. If you choose female aspect, you gain +1 BS, +2 I, +2 Ld and +2 M.", timing: ["1", "2"] },
    {
        name: "Slaves to Darkness",
        rules: createSpecialRuleText(
            "Wretches are Immune to all psychology and All-Alone tests if within 6\" of a friendly Hero. Wretches can’t become Heroes. If you roll The Lad’s Got Talent result on the chart, and then roll it again, the model receives a Serious Injury as if it were a Hero (roll it immediately).",
            ["All-Alone"]
        ),
        timing: ["2", "4", "9", "13"]
    },
    { name: "Promotions", rules: "When you lose one of the Heroes for whatever reason, you cannot buy a new one. However, you retain all the equipment of the fallen Hero, and you may now promote one of the Prospects into the role of the lost hero, as if that Henchman just successfully rolled Lad’s Got Talent on the Henchmen Advancement Table: You may choose two skill lists available to Heroes in your warband. These are the skill types your new Hero can choose from when the model gains new skills. The new Hero can immediately make one roll on the Heroes Advance table. The new Hero then gains the armour, weapons and equipment of the fallen Hero and assumes their position the Warband. The Prospect’s own equipment may be added to the Warband stash. If you have no Prospect currently in your Warband, you can promote the next one you hire.", timing: ["13"] },
    { name: "Lustrian Reaver Hired Swords", rules: "May hire an Ogre Bodyguard, Dwarf Trollslayer, Tilean Marksman or a Big Game Hunter.", timing: ["1"] },
    { name: "Survivor Combat", rules: "Cannot be taken out of Action unless the model is already Knocked Down or Stunned. Treat Out of Action as Stunned if the Conqueror is standing when receiving the Wound.", timing: ["8", "9"] },
    { name: "Survivor Post", rules: "The first time a Conqueror suffers a Dead result on the Serious Injury Chart, treat it as Multiple Injuries instead. This ability can save the Conqueror only one time.", timing: ["13"] },
    { name: "Duellist", rules: "If the Saurus Slayer is engaged with only a single opponent in melee, they can re-roll missed hits on the first turn whether they charged the enemy or were charged.", timing: ["9"] },
    { name: "War Beasts", rules: "If your Warband includes a Beastmaster, you may include up to 2 War Beasts. These count towards the maximum size of the Warband. They must be bought when the Warband is created but can be replaced if killed. The War Beasts can use the Ld of the Beastmaster if they are within 6” of the Beastmaster.", timing: ["1"] },
    { name: "Silent Hunter", rules: "Jungle Shadow is always considered to be Hidden if the model is touching any piece of terrain of 1” high. Shooting does not reveal Jungle Shadow’s position, though spellcasting does.", timing: ["5", "7"] },
    { name: "Surprise attack", rules: "If the Shadow attacks an enemy that has its back turned to the Jungle Shadow (i.e. the shot is coming from 180 degree angle from behind its facing), the Shadow can re-roll missed to hit rolls.", timing: ["7", "9"] },
    { name: "Canopy Walker", rules: "Jungle Shadow automatically passes all climbing, jumping and falling off ledges tests.", timing: ["4"] },
    { name: "Deadeye", rules: "Trapmaster suffers no penalties for shooting at long range.", timing: ["7"] },
    { name: "Traps", rules: "The Trapmaster starts each game with 1 Trap and can buy up to 5 further of the following Traps before the start of the game at the cost of 5 GC each. Each trap is one use only. Traps are used in the Shooting Phase instead of shooting, 1 trap at a time, and cannot be used in Melee combat. When you use a trap, put 2 1” diameter Trap counters (one false, one real) anywhere within 3” of the Trapmaster, but at least 3” away from any other models. Any model that moves within 2” of the counter must flip it over. If it is a false one, nothing happens. If it is a real one, the model suffers D3 S5 Hits immediately. Traps do not cause Criticals. Remove the counters when the trap is sprung.", timing: ["1", "5", "7"] },
    { name: "Promotion Only", rules: "Re-roll any Lad’s Got Talent results on Henchmen Advancement table. When promoted, you can then hire a new Prospect as the model no longer counts as one of them.", timing: ["13"] },
    { name: "Gluttony", rules: "Each Ogre model counts as two models when selling wyrdstone or treasure. Any model which is captured due to Serious Injuries or Exploration can be devoured and his possessions retained, reducing the combined model count of your warband by one (or two if the captive ‘shared meal’ is a Large Target). Each Ogre always counts as at least one model towards the total, no matter how much he eats! An Ogre Hero devouring captured models is granted experience points equal to the number of models that were consumed. Any member or animal (including mounts) from your warband can be eaten in the same way! Remove any consumed comrades from the warband roster immediately.", timing: ["13"] },
    { name: "Difficult Customers", rules: "Ogre Heroes suffer -1 when rolling to find Rare items that are not exclusively available to Ogres.", timing: ["13"] },
    { name: "Chaos Difficult Customers", rules: "Kurgan warband suffers –1 when rolling to find Rare items except for Great Axes and Barbed Whips.", timing: ["13"] },
    { name: "Cannibals", rules: "Most Hired Swords refuse to work for Ogres, as they know for sure they’ll end up being a meal sooner or later. An Ogre warband may never hire any Hired Swords, except for Halflings (Scout, Thief, etc.) and the Ogre Bodyguard, or unless stated otherwise, in which case Ogres can choose to devour him when the contract ends (see Gluttony).", timing: ["13"] },
    { name: "Ranger", rules: "A Mountain Guide is a dedicated tracker. If he’s not put out of action in the battle, you may roll two dice for Exploration and pick one as the result. Note that this is not a re-roll.", timing: ["13"] },
    {
        name: "Loner",
        rules: createSpecialRuleText(
            "Mountain Guides are Ogre Hunters. They become used to the solitude of the highest peaks in the Mountains of Mourn. A Mountain Guide hunts the slopes alone and will never claim a Gnoblar or take one as a pet. They are immune to All-Alone tests and may never become the warband leader.",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    { name: "Bull Charge", rules: "When charging, Bulls may attempt a single attack with a +1 ‘to hit’ modifier rather than making their normal attacks. If successful the enemy model is automatically knocked down.", timing: ["4"] },
    { name: "Sabretusks Trained", rules: "Sabretusks may use the Leadership of the Mountain Guide if within 6” of him. In the event that no Mountain Guide is included in the warband due to a death or an injury, the Sabretusks cannot be used until the Mountain Guide is replaced. They must be caged and left at the camp until a new one is hired.", timing: ["2"] },
    { name: "Feral Instinct", rules: "At the beginning of the Ogres turn the Sabretusk must pass a Leadership test. If the test is failed, the opponent may move the Sabretusk this turn. An uncontrolled Sabretusk may charge models from his own warband!", timing: ["2"] },
    { name: "Eye of the Gods", rules: "An aspiring chaos follower is always Eye of the Gods: watched by the vigilant eyes of the dark gods, who reward the successful generously but punish failures harshly. Roll 2D6 after every battle. If you lost the preceding battle, add +1 to the roll for each of your Heroes that was taken out of action during the battle. On a total of 12 or more the warband’s leader turns into a Chaos spawn. His experience, skills, injuries and equipment are lost.If you won the battle, add +1 for every enemy model the leader took out of action. On a total of 12 or more you may choose a Mark of Chaos for the winning leader. As soon as the leader receives a Mark of Chaos through the Eye of the Gods special rule this test is no longer taken – until the leader leaves the warband in which case the new leader must prove himself to the Dark Gods the same way his predecessor did. If the warband already includes a Spawn of Chaos the doomed leader is simply erased from the roster. There may never be more than one Spawn of Chaos in a single warband. The Eye of the Dark Gods rule is not in effect if the warband leader did not take part in the previous battle.", timing: ["13"] },
    { name: "Marauders of Chaos Hired Swords", rules: "Marauders of Chaos may only hire the following Hired Swords: Pit Fighters, Ogres, Norse Shamans and Imperial Assassins plus any other Hired Swords which specify they may be hired by Marauders of Chaos. Witches and Warlocks may be hired except by warbands that include warriors with the Mark of Arkhar.", timing: ["13"] },
    { name: "Reavers", rules: "Gain a +1 to their rarity rolls when searching during the post-game sequence.", timing: ["13"] },
    { name: "Pantheon", rules: "The Norse worship a myriad of gods, spirits and ancestors. As a result of their wide pantheon the Eye of the Gods special rule's effect (of becoming a Chaos Spawn or receiving a Mark) happens on a result of 13+ instead of 12+.", timing: ["13"] },
    { name: "Mark of Chaos", rules: "The Seer gets a Mark of Chaos when hired to determine the kind of magic he uses. He can have the Mark of the Serpent, the Mark of the Crow, the Mark of the Eagle, the Mark of Arkhar or the Mark of Chaos Undivided.", timing: ["1"] },
    { name: "Inconsistency", rules: "The variable attributes WS, S, T and A are determined whenever needed, once every turn by rolling D6 for each.", timing: ["2"] },
    { name: "Belandysh Inconsistency", rules: "The variable attributes WS, S, T, I and A are determined whenever needed, once every turn by rolling D6 for each.", timing: ["2"] },
    { name: "Condemned Experience", rules: "Whenever the Condemned would increase one of his variable attributes the player rolls an appropriate die instead. If the player is satisfied with the result, he may set the attribute on that number (e.g. roll a D6 instead of increasing Strength, on a roll of 4 the player may choose to give the model S 4). Otherwise the attribute remains variable (and the advance is lost). The maximum attributes of the Marauders may be exceeded due to the special nature of the Condemned, and this carries through to when the player wishes to set an attribute instead of keeping it random.", timing: ["13"] },
    { name: "Condemned Fate", rules: "Once all variable attributes are set, the Condemned may use weapons, armour and miscellaneous equipment as usual. But, if he has 90 Experience and still variable attributes, his patron could not save him from his former god's wrath and his soul and body are lost. He turns into a terrifying Spawn of Chaos. If the warband already consists of a spawn, the doomed warrior wanders off into the wastes, never to be seen again.", timing: ["13"] },
    { name: "Spawn of Chaos Special Attacks", rules: "Roll 1D6+1 the beginning of each Close Combat phase to determine the spawn’s number of Attacks for that phase.", timing: ["9"] },
    { name: "Spawn of Chaos Special Movement", rules: "The Spawn moves 2D6\" straight ahead in each of its Movement phases. Before it does so it’s player may turn it to give the direction. It does not double its movement for charging, instead if its movement takes it into contact with a model it counts as charging and engages that model in close combat", timing: ["4"] },
    { name: "Hiring Limitation", rules: "Seer must have Mark of Chaos Undivided to for Warband to hire Gors", timing: ["13"] },
    { name: "Pedigree", rules: "Some Kurgan tribes delight in the spectacle of trained pit hounds fighting against bears, trolls and other creatures. A Kurgan warband may include any number of Warhounds of Chaos – not only up to five.", timing: ["13"] },
    { name: "Bone Bows", rules: "The Kurgans are renowned for making scary bows, using the bones of their fallen enemies. Heroes and Chaos Marauder Henchmen may use bows (cost: 10 gold crowns, availability: common).", timing: ["1"] },
    { name: "Disloyalty", rules: "The treachery of the Hung is infamous. As one horseman is no more trustworthy than the next, these nomads tribal allegiance is flimsy at best. The maximum number of warriors in the warband is 12 (instead of 15).", timing: ["13"] },
    { name: "Affinity with Horses", rules: "Warhorses always cost 40 gold crowns to the warband – not only to starting warbands. In addition, all Heroes (including Henchmen that advance to Heroes) automatically have the Ride Warhorse skill. Note that the number of mounts per warband is not restricted in the Border Town Burning setting.", timing: ["13"] },
    { name: "Merchant", rules: "The Merchant is the warband's leader (any Warrior within 6\" of him may use his Leadership when taking Ld tests) and the one who is in charge of the business. If the Merchant leaves the caravan (e.g. dies permanently through Serious Injuries), a new leader is determined as normal. The new leader gets the Merchant special rule, allowing him to choose new skills from the Merchant's special skills section. The model counts as a Merchant for all purposes just as the previous Merchant used to. If no model in the warband is allowed to become the leader, an Apprentice must be bought as soon as possible to become the leader.", timing: ["12"] },
    { name: "Trade", rules: "Instead of searching for rare items the Merchant may sell a rare item that has been stored in the Trade Cart during the preceding battle. This must be done before Heroes of either warband search for rare items. Roll a D6 to determine how many gold coins the Merchant would get for the item. Note that the Merchant may decide whether he wants to sell the item for that price or if he wants to try again after the next battle. This can be combined with the wholesale skill to sell up to D3+1 items each game. 1-2: Half the item's basic price, 3-4: The item's full basic price, 5-6: Full plus half the item's basic price", timing: ["13"] },
    { name: "Open for Business", rules: "All players may choose to send any of their Heroes to the Merchant instead of having them search for rare items. A Hero doing so may buy one item from the warband's stored equipment if the players can agree on a price (including exchange deals with items and Treasures). Instead of buying an item, a Hero may also go to the Merchant to sell any one item (rare, common, magical, treasure counters) to him. If players cannot agree on a price, no deal is closed and the visit is wasted.", timing: ["13"] },
    { name: "Rarity", rules: "Any rare item that is reduced to Rare 2 or Rarity: below by the Trade Wagon's Reputation rule, the Streetwise skill, etc., can be bought as Common items.", timing: ["13"] },
    { name: "Lightning Reflexes", rules: "If the Knights Vanguard is charged, he will ‘strike first’ against those that charged that turn. As the charger(s) will also normally ‘strike first’ (for charging), the order of attack between the charger(s) and the Knights Vanguard will be determined by comparing Initiative values.", timing: ["9"] },
    { name: "Hirelings", rules: "The Knights Vanguard is a hireling, paid by the Merchant and therefore can never become the warband's leader.", timing: ["13"] },
    { name: "Unreliable Hirelings", rules: "Blackguards are only hired by the Merchant to serve him by protecting his cargo. They are not much trusted or granted with any responsibilities. Therefore they may never become Heroes. Re-roll all results of ‘The lad’s got talent’ for them.", timing: ["13"] },
    { name: "Addict", rules: "The Fanatic is dependent on a regular supply of Madcap Mushrooms which must be bought each game. If he can't get any before a battle he will stay in his cave foaming at the mouth and not take part. If available he will eat his mushrooms before the battle.", timing: ["1"] },
    { name: "Frantic", rules: "The Fanatic is hyperactive and will strike first in combat ignoring penalties or bonuses for weapons or initiative order.", timing: ["9"] },
    { name: "Vomit Attack", rules: "Instead of his normal attacks, a Troll can regurgitate its highly corrosive digestive juices on an unfortunate hand-to-hand combat opponent. This is a single attack that automatically hits with a Strength of 5 and ignores armour saves.", timing: ["9"] },
    { name: "Snotlings Replacement Fee", rules: "Replacing a Snotling costs 10gc", timing: ["13"] },
    { name: "Snotling Mob", rules: "Snotlings are naturally gregarious creatures. They are initially bought in a mob of 5. You may replace mob members up to the maximum of 5. They will always move and fight as a mob. All members must stay within 1\" and all will join in the same combat if possible.", timing: ["4", "9"] },
    { name: "Weedy", rules: "Snotlings are not the most robust of creatures. If wounded they will be knocked down on a 1, stunned on a 2-3 and go out of action on a 4-6.", timing: ["8", "9"] },
    { name: "Dodgy", rules: "The little creatures are constantly ducking and diving in the most infuriating way. They get a 6+ dodge save against shooting.", timing: ["8"] },
    {
        name: "Insignificant",
        rules: createSpecialRuleText(
            "Nobody cares about the Snotlings. The whole mob counts as a single model for the purposes of Rout tests, maximum warband size and calculating income. An enemy hero will only gain experience for taking the last Snotling Out of Action.",
            ["All-Rout"]
        ),
        timing: ["2", "13"]
    },
    { name: "Capture!", rules: "If a Hero takes Out of Action an enemy human Henchmen model that is not a Large Target with a Misericordia, roll 1 dice: on a 5+ the model is captured and can be dragged down to the Throne of Worms. It is not possible to capture more than 2 enemy models in a single battle in this way. Enemy Heroes can only be Captured as a result of a roll of 61 (Captured!) on the Serious Injuries Table. If you have already captured 2 Henchmen models, roll again this result. The captured hero becomes a Thrall losing all his skills, stats and equipment. You can obtain up to a maximum of 5 Captured Thralls in this way, thus increasing the maximum number of models in the warband from 13 to 18. Captured Thralls have the same stats of standard Thralls, earn experience but cannot be promoted to Heroes. I you roll Lad’s Got Talent roll again. Captured Thralls can be equipped as standard Thralls. They do not count against the 0-5 limit for Thralls. Place all the Captured Thrall in a single group separate from the standard Thrall.", timing: ["13"] },
    { name: "The Throne of Worms", rules: "For each enemy captured, after the battle, roll 1d6: 1-2 The warrior is swallowed up forever by the Throne of Worms. Consider this result as Dead, 3-5 The warrior completely loses his mind and is submitted to the power of the Throne. You gain a Captured Thrall for your warband. 6 The warrior is sacrificed with a ritual to the Throne. The Hero who Captured the warrior gains 1 XP.Note: this replaces the Captured! standard rules on the Serious Injuries Table for Heroes.", timing: ["13"] },
    { name: "Chronicler ", rules: "A Chronicler has in-depth knowledge of the city of Mordheim and may reroll an extra dice during the Exploration phase and may decide which of the two dice to keep.", timing: ["13"] },
    { name: "Danse Macabre", rules: "During the shooting phase the Cursed Piper can direct the cursed melody of is flute against one enemy model he can see within 6” from the Piper. The enemy model must take a Ld test. If failed, the warrior is cursed by the Danse Macabre loses control of his body and forced to dance under the Piper’s will. The Piper can move the enemy model in any direction he wishes also out of close combat or force him to fall from height. At the beginning of the enemy’s turn, in the recovery phase the warrior will have to pass a Ld test or will continue to be under the Pipers’ control and cannot shoot, charge or cast spells. If engaged in close combat the model cannot attack (it is too busy dancing!). Only one enemy warrior at time can be controlled by the Danse Macabre. If the Piper targets another warrior the previous one is immediately free from the curse.", timing: ["7"] },
    { name: "Thralls", rules: "You can obtain up to a further 5 Thralls as Captured Thralls that do not count towards the 0–5 limit. Captured Thralls cannot be promoted to Heroes. Re-roll any LGT result for Captured Thralls. Captured Thralls cannot join existing groups and have to form 1 or more separate groups.", timing: ["12"] },
    { name: "Maddened With Pain", rules: "As soon as the Great Bear suffers a single wound it gains an additional attack.", timing: ["9"] },
    { name: "Wild Beast Charge", rules: "When charging their enemies the Wild Beasts gain +1 Attack on the first turn of close combat.", timing: ["4", "10"] },
    { name: "Agile", rules: "The Fighting Apes are fantastically agile and nimble, putting even the greatest acrobat or Skaven Assassin to shame. The Fighting Ape has the Scale Sheer Surfaces Skill, Acrobat Skill, and Dodge Skill. In addition, the Fighting Ape can make a diving charge from up to 10\" high.", timing: ["4"] },
    { name: "Two Cymbals", rules: "A Fighting Ape never uses weapons and armour and does not need them to fight effectively. At a cost of 10 gc a Fighting Ape can be equipped with two cymbals which it frenziedly beats together to the forbidding tune of Danse Macabre. Any enemy model within 6\" will be so disturbed by the sound that they suffer –1 BS penalty and –1 Ld penalty.", timing: ["1"] },
    { name: "Eternal", rules: "A Liche can choose to ignore any result on the hero's Serious Injury chart except Killed by taking a permanent -1 on their starting Wound profile. Obviously, a Liche with 1 Wound remaining on their starting profile does not have this option. A Liche that gets a Killed result instead takes a permanent –D3 Wounds on their starting profile. If this takes their starting Wound total to 0 or less, the Liche is Killed as normal.", timing: ["13"] },
    { name: "Feed Upon Magic", rules: "A Liche can perform spells that, with the consumption of D3 Treasures (aka Wyrdstone), can give the Liche a permanent +1 Wound on their starting profile. This can only be used in between battles and cannot be used if the Liche searches for rare items or was put out of action in the previous battle. If the warband does not have enough Treasures to complete the spell, then the Treasures are consumed anyway and the Liche does not gain the Wound.", timing: ["13"] },
    { name: "Warrior Wizard", rules: "May wear armour and cast spells.", timing: ["12"] },
    { name: "Liche Advancement", rules: "If a Liche gets an advance roll of +1 Wound, they may instead pick a new skill from their available lists.", timing: ["13"] },
    { name: "Apprentices", rules: "Necromancers may only ever know spells known by their Liche masters. Even if they did know spells the Liche didn’t, they wouldn’t dare use them for fear of their master’s response for their arrogance! If the Liche is ever killed, the Necromancer can continue to learn magic spells as a normal wizard, ignoring the Apprentice rule.", timing: ["13"] },
    { name: "Gofer", rules: "as an Apprentice, the Necromancer spends much of their time running errands for their Liche masters and over the years get exceptionally good at it. When a Necromancer searches for rare items, they roll 3D6 and pick the two highest.", timing: ["13"] },
    { name: "Wight Blades", rules: "Grave Guards carry weapons laden with evil magic. All close combat ‘to hit’ rolls of a 6 will automatically wound. You may roll ‘to wound’ as normal to determine if it is a ‘critical hit’, but even a failed ‘to wound’ roll will still cause a wound if a 6 was rolled first ‘to hit’.", timing: ["9"] },
    { name: "No deal", rules: "Grave Guards may not search for rare items.", timing: ["13"] },
    { name: "Wights Experience", rules: "Wights may gain experience, however Wights promoted to become Heroes by rolling The lad's got talent will be unable to search for rare items in the same way as Grave Guards. They must choose the Combat and Strength skill lists if promoted. Wights also gain Wight Blades if they become Heroes.", timing: ["13"] },
    { name: "No Substance", rules: "The scarecrow is incredibly difficult to take down with shooting as there are few vital parts to hit. The scarecrow counts as having a T6 against all shooting and magical missiles, likewise, a scarecrow is immune to critical hits caused by shooting. The exception to this rule is missile weapons or spells that are fire based which deal damage as normal.", timing: ["8"] },
    { name: "Scarecrows Flammable", rules: "The scarecrow is primarily ratty cloth, straw and preserved body parts so as a result they burn very easily. Scarecrows count as being flammable. In addition, a scarecrow will be 'caught fire' on the roll of a 3+ as opposed to the normal 4+.", timing: ["8", "9"] },
    { name: "Construct", rules: "The scarecrow is an undead construct and may re-roll any rolls on the injury table except for wounds caused by fire.", timing: ["8", "9"] },
    { name: "Animated Construct", rules: "The scarecrow is controlled by either the Liche or the Necromancer (note down on the warband roster which), but each may only control one at a time, so only a warband with both a Liche and a Necromancer may ever take two Scarecrows. If the Liche or the Necromancer is for some reason unable to participate in a battle, their Scarecrow will also be unable to participate. Whenever the scarecrow's controller loses a wound he must pass an unmodified Leadership test or the magical bond is broken and the scarecrow is immediately taken out of action.", timing: ["8", "9"] },
    { name: "Slavers", rules: "Chaos Dwarfs will never free any slave they capture. Pick one: Sacrifice them or put them to work. If you sacrifice them, the apprentice sorcerer will get +1 to Experience for each slave sacrificed. If put to work, you force them to help them in their quest for the witchstone; at the end of the game, gain an additional +1 wyrdstone for each working slave; then make a 1D6 roll: On a result of 2 to 6, the captive dies due to overwork, disease, the effects of long exposure to the sorcerer’s stone, or for any other similar reason, and the Chaos Dwarf band may keep the captive’s equipment. On a result of 1, the captive manages to escape, returns to his band with his equipment intact and, in addition, gains an experience bonus of 1D3 (if he is a henchman, simply add 1 to his total).", timing: ["13"] },
    { name: "Uncommon", rules: "Chaos Dwarfs are quite rare in Old World settlements. For this reason, when they make rolls for the acquisition of new recruits in their bands, they have to spend 1.5 times (rounding up) the amount of experience they normally spend for veterancy. Remember that this is not the case for Hobgoblins, a race far more common than that of Chaos Dwarfs. For example, a group of Chaos Dwarf recruits armed with blunderbusses with 4 experience points would require at least 6 experience points to acquire one recruit, 12 to recruit two and so on.", timing: ["13"] },
    { name: "Indentured Servants", rules: "A Chaos Dwarf warband must start with at least 4 Hobgoblins; if it drops below 4 Hobgoblins, you cannot recruit other members until the number of Hobgoblins is increased to four or more.", timing: ["13"] },
    { name: "Hashut Hired Swords", rules: "A Chaos Dwarf warband may hire the following Hired Swords: Ogre Bodyguard, Pit Fighter, Warlock, Imperial Assassin, and Hobgoblin Scout. They may hire any Hired Sword described as “all may hire,” or allowed by Orc warbands and Chaos warbands. They may never hire Elves of any sort!", timing: ["13"] },
    { name: "Skinny", rules: "Hobgoblins are naturally cowardly creatures that are forced to fight by their Chaos Dwarf masters. As a result, they take damage easily and at the slightest opportunity try to escape from their captors. When making serious injury rolls, a result of 1-3 indicates that they abandon the band.", timing: ["13"] },
    {
        name: "Nobody cares about them",
        rules: createSpecialRuleText(
            "Hobgoblins count as half the number of troops if the band has to make a Rout check. For example, in a band made of 12 miniatures, if 2 Hobgoblin miniatures and 1 Chaos Dwarf miniature are out of action, the total would be two miniatures out of action (1/2 + 1/2 +1 =2). Also, Hobgoblins cannot be heroes, just reroll the “Lad's got talent” roll.",
            ["Rout"]
        ),
        timing: ["2", "13"]
    },
    {
        name: "Morr's ultimate enemies",
        rules: createSpecialRuleText(
            "Do not feel any Fear when fighting both vampires and necromancers and their undead followers",
            ["Fear"]
        ),
        timing: ["4", "9"]
    },
    { name: "Choosen Of Morr", rules: "A Priest of Morr must ALWAYS certify that each dreamer is genuine, not a heretic...or worse! which means that he must prove through a ritual that the dreamer's dreams truly come from Morr and are not the product of necromantic magic or the corruption of chaos. When creating a band of dreamwalkers, the Priest of Morr must roll a D6. If you get a +4, you can hire the Dreamer; Otherwise, the Priest of Morr rejects him, through the necessary ritual he learns that the dreams of that dreamer do not come from Morr. Then the priest himself will take leadership of the warband to fulfill Morr's will. (in game effects the priest of Morr will be considered the Leader). They will be able to try to find (hire) a new genuine Morr Dreamer again after their next battle... paying their costs normally. If the priest finds a genuine dreamer, he will give him the leadership of the band. (For game purposes the Dreamer will be considered the leader, until he dies, in which case leadership will revert to the priest again. Once a band has a genuine Dreamer and he or she dies, they will not be able to hire another one again.)", timing: ["1"] },
    { name: "Dreamwalker Hired Swords", rules: "Dreamwalkers may hire any Hired Swords allowed to a Human Mercenary warband, Witch Hunters and Sisters of Sigmar. Of course they can´t hire any Hired Sword of a Necromantic or Chaotic nature.", timing: ["13"] },
    { name: "Dreamwalker Alliances", rules: "In multiplayer games, a Dreamwalkers warband may never forge an alliance with any Warband of a Necromantic or Chaotic nature (Undead, Possessed, Skaven, Beastmen, Dark Elves etc.)", timing: ["1"] },
    {
        name: "Guiding Dream",
        rules: createRuleTable(
            "At the beginning of each battle, the Dreamer must roll D6 and consult the table below to find out what type of action Morr sends him.",
            ["D6 Roll", "Effect"],
            [
                {
                    cells: ["1", ""],
                    title: "Disturbing Vision",
                    expandableContent: "The vision of the previous night is clear, but incomplete. That worries the dreamer too much and he feels very tired the next day. The dreamer suffers a -1\" Movement penalty.",
                    border: true
                },
                {
                    cells: ["2-3", ""],
                    title: "Vision of Truth",
                    expandableContent: "Morr shows the dreamer the combat tactics of his enemy and images of himself defeating his enemy with accurate blows to their weak points, which makes it easier for the dreamer to land his blows against them. Designate one of your opponent's heroes as a target. The dreamer gets a +1 to hit this model.",
                    border: true
                },
                {
                    cells: ["4-5", ""],
                    title: "Empowering Vision",
                    expandableContent: "Morr sends a vision to the dreamer in which he sees himself in the heat of battle fighting against his enemies without ever failing and emerging victorious despite his wounds, which imbues the dreamer with great strength. Designate one of your opponent's heroes as a target. The dreamer has +1 Strength when fighting this model.",
                    border: true
                },
                {
                    cells: ["6", ""],
                    title: "Infuriating Vision",
                    expandableContent: createSpecialRuleText("Morr shows the dreamer the face of his enemy, this gives the dreamer a clear vision of his goal and an inexhaustible determination to finish him off. Designate one of your opponent's heroes as a target. The dreamer will have Frenzy against this model.", ["Frenzy"]),
                    border: false
                }
            ]
        ),
        timing: ["1"]
    },
    {
        name: "Dreamwalker Loner",
        rules: createSpecialRuleText(
            "Dreamwalker does not suffer from the All-Alone rules.",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    {
        name: "Priest of Morr Loner",
        rules: createSpecialRuleText(
            "Priests of Morr do not suffer from the All-Alone rules.",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    {
        name: "Kislev Ranger Loner",
        rules: createSpecialRuleText(
            "Kislev Rangers do not suffer from the All-Alone rules.",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    {
        name: "Dark Jester Loner",
        rules: createSpecialRuleText(
            "Dark Jester does not suffer from the All-Alone rules.",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    {
        name: "Hobgoblin Scout Loner",
        rules: createSpecialRuleText(
            "The Scout has become so used to being alone on the Steppes that it has become accustomed to its own company. The Scout may never use the warband leaders Ld for any tests. In addition, the Scout never counts as All-Alone and may operate independently throughout the game.",
            ["All-Alone"]
        ),
        timing: ["2"]
    },
    { name: "Silent Guardian", rules: "If a Black Guard has been declared Hidden, enemies must take an Initiative test to spot them.", timing: ["5"] },
    { name: "Estalian Tecnique", rules: "The Andanti may parry using his rapier and Main Gauche if he can roll under his weapon skill as opposed to over his opponent's highest hit roll as per the normal rules.", timing: ["9"] },
    { name: "Andanti Knowledge", rules: "Their secret knowledge passed from member to member makes them skilled fighters against vampires. When fighting a vampire they get +1 to hit in close combat.", timing: ["9"] },
    { name: "Expert Halberdier", rules: "Death's Heads are so skilled with their weapons that they may combat carrying his halberd in one hand and shield at the other.", timing: ["9"] },
    { name: "Fey Acuity", rules: "During the Exploration phase when checking for artifacts or wyrdstone at the end of the game, add +1 to the number of pieces found by a Dark Elf warband, as long as at least one hero was searching.", timing: ["13"] },
    { name: "Druchii Slavers", rules: "Roll of 333 during Exploration phase, can sell the prisoners into slavery for 3D6 gc.", timing: ["13"] },
    { name: "Druchii Hired Sword", rules: "Druchii may only have the following hired swords, Pit Fighter, Ogre Bodyguard, Warlock, Imperial Assassin, Tilean Marksman, Highwayman, Duelist, Witch, Emissary of Chaos, Human Scout, Old Prospector, Dark Elf Assassin, Pathfinder, Nomad Scout, Thief, Shade Scout", timing: ["13"] },
    { name: "Slavehounds", rules: "The Beastmaster may be accompanied by up to three Slavehounds. These are bought as henchmen and follow all rules listed for them.", timing: ["1"] },
    { name: "Maibd Poison", rules: "A warband, containing Witch Elves, may purchase Black Lotus as Common item for reduced price of 5 gc per dose. However, Black Lotus, purchased in such a way, may only be used by Witch Elves. The poison must be used in the next battle and cannot be sold or traded to other warbands.", timing: ["1"] },
    { name: "Pack Work", rules: "Slavehounds are trained to detect hiding slaves and show them to their masters. If a Slavehound knows about enemy model (has a line of sight, has unhidden it etc.), the Beastmaster and all other slavehounds of the same warband can declare charge on this model even if they do not see it. No Initiative roll is necessary.", timing: ["4"] },
    { name: "Damnable Luck", rules: "While Slayers SEEK death, it often eerily avoids them. In the postgame, after rolling for all injuries, you may reroll one result of Death for a single slayer hero or henchman, accepting the second result.", timing: ["13"] },
    { name: "No Armour, No Toys!", rules: "Slayers may never use armour of any kind, nor cloaks that provide a constant save bonus (though they may use Lucky Charms). Also, they may not use any missiles that aren’t thrown, nor may they learn magic.", timing: ["12"] },
    { name: "Only in Victory", rules: "Slayer heroes do NOT gain exploration dice at the end of the battle if they were defeat or routed; they only gain them if they win the scenario, were allied with the winner, or tied. (Does not include the Rememberer)", timing: ["13"] },
    { name: "Record of Valor", rules: "If a Slayer hero is taken out of action while the Rememberer was present on the board, you receive +1 Exploration dice in the post-game phase; this represents their patrons in Karak Kadrin rewarding their courage with money and hirelings. This only applies if the Slayer was taken out of action directly or indirectly by an enemy or NPC attack (ex. Attacked by a warrior, falling off a cliff after a crossbow bolt, removed by a hostile random event, etc.) A Slayer that is taken out of action without any opposing influences (ex. deliberately walking off a cliff, failing a jump) does not grant you an exploration dice. If a Slayer is somehow brought back to the battlefield, this extra die is lost (as they are saved from the jaws of death).", timing: ["13"] },
    { name: "Back-up Records", rules: "If your warband includes a Bard Hired Sword, the bard gains the Rememberer ability, “Record of Valor”; however, two rememberers do not stack (i.e. 1 slayer taken OOA gives you a max of 1 exploration die, even if both the Rememberer and the Bard witness it). This rule merely provides a backup if the Rememberer somehow misses a game or is taken out of action.", timing: ["13"] },
    { name: "THE RITE OF TROLLSLAYING", rules: "If a slayer henchman takes an enemy out action, if it was Large and started the game with multiple wounds, then in the post-game phase, the henchman gains experience enough to bring it to the next advancement (or if maxed out, to 16 exp), and treat it as if that henchman rolls “That Lad’s Got Talent!” If you have 6 heroes already and do not wish to replace an existing hero, you may roll a henchman advance as normal. If promoted, be sure to gift it an appropriate title, like Ogreslayer.", timing: ["13"] },
    { name: "THE RITE OF DRAGONSLAYING", rules: "If a slayer that takes out a model with all the following conditions: 1.large or gigantic monster 2. scaled (including but not limited to: Hydra, Dragon, Wyvern, Sea Drake, Merwyrm, Turtigon, or any of their young versions) 3. It has Skull of Iron and/or 4+wounds 5. Is an NPC or it rolls a death injury. If all the above apply, then in the post-game, the slayer may tan the hide and gain a Sea Dragon Cloak for free, provided they don’t own one already. They may not sell or it give it to another warrior. This is the exception to the rule that a Slayer may not wear armour. If it’s lost or stolen, they may not buy a replacement, but only win another through Dragonslaying. If the slayer is a henchman, the Rite of Trollslaying also applies (see above); if they can’t be promoted, it may wear the Misc item, even if it remains a henchman.", timing: ["13"] },
    { name: "Rememberer", rules: "Once per game, any Slayer Hero fighting against a Large creature or a creature with Toughness 5 or greater, and is within 6\" of the Rememberer, may re-roll any failed To Hit rolls once only.", timing: ["9"] },
    { name: "Pick up the Slack", rules: "If he was not taken out of action, the Rememberer may make a rarity or Dramatis Personae roll for each Slayer hero that was taken out of action this game in addition to their normal rarity search.", timing: ["13"] },
    { name: "Strong Arm", rules: "When throwing weapons, the Axe Hurler may throw the missile extra inches equal to his Strength (ex. S3 = +3\").", timing: ["7"] },
    { name: "Born Marksmen", rules: "If an Axe Hurler rolls a “That Lad’s Got Talent” as an advancement, he may always choose Shooting skills as one of his two skill list choices. He may do this even if there are no heroes with Shooting Skills in the warband. Reminder: Even with Weapon Mastery, he may not use any missile weapons that aren’t thrown.", timing: ["13"] },
    { name: "Skittish", rules: "As newly crowned Slayers, Hurlers do not have the skill ‘Death Wish,’ and suffer psychology like normal. When a Hurler gains ‘That Lad’s Got Talent’, instead of making an immediate roll on the Hero Advance Table, he MUST learn the skill ‘Death Wish.’", timing: ["13"] },
    { name: "Grave Goods", rules: "Grave Robbers gain +1 Gold Crown for each enemy model taken Out of Action in the Exploration Phase (once per battle).", timing: ["13"] },
    { name: "Shady Reputation", rules: "Grave Robber warbands may not hire the following Hired Swords: Bounty Hunter, Roadwarden, Law-Enforcer, Holy Man, or any Follower of Morr.", timing: ["13"] },
    { name: "Sawbones", rules: "You can re-roll the Serious Injury result for one friendly Hero. The second result stands. You may not use this ability if the Junior Medic was taken Out of Action during the battle.", timing: ["13"] },
    { name: "Pretty much human", rules: "Halflings are pretty much human and therefore may hire any hired sword available to human mercenaries.", timing: ["13"] },
    { name: "Too Big", rules: "Halflings may never use Long bows, Elf Bows, Handguns, Long Rifles or Blunderbusses even if they gain an advance roll that would allow them to do so. Such big weapons aren't built for such tiny hands!", timing: ["1"] },
    { name: "Halfling Items", rules: "Halflings do not gain any bonuses from having Halfling items (such as the Halfling Cookbook) because they already know all the knowledge that can be obtained from such things.", timing: ["13"] },
    { name: "Master Chef", rules: "Halfling Cooks have a vast range of knowledge when and it comes to culinary matters, and their food is often more filling and favorable then that of hapless no-talent human chef! To represent his masterful cooking talent role one D6. On a 5+ the cook has managed to make a little food go a long way and when selling Treasure or Wyrdstone the warband is considered to be one size lower. Any role below a 5+ does not represent the chef's inability to conjure up some delicious food, it just means he ate all the excess food before his other companions got there!", timing: ["13"] },
    { name: "Pick Locks", rules: "When testing to open a locked door, a Halfling Thief needs only make a successful Initiative test.", timing: ["4"] },
    { name: "Cutpurse", rules: "If the Halfling Thief took part in a battle, and was not taken OOA, then the warband gains +1 Treasure on top of what they would normally find.", timing: ["13"] },
    { name: "Protective", rules: "The Ogre is content with his pay and more importantly, his meals. He will therefor scare off any other Ogre that may attempt to join the warband. Once a Village Ogre is purchased, Ogre Bodyguards will not join the warband, and should one have been hired prior to the Village Ogres arrival, he will move on.", timing: ["13"] },
    { name: "A Bit Unhinged", rules: "Flesh Constructs do not gain experience normally. They must make a successful Leadership test in order to gain the experience for surviving the game; dead brains can only be expected to learn so much, after all.", timing: ["13"] },
    { name: "Its only a flesh wound", rules: "When a Flesh Construct is taken OOA, roll on the Henchmen Injury table as normal. On a roll of 1-2, the player is able to repair the damage to the golem for D6x5gc (to represent the time and effort it takes to obtain new parts). If the warband is unable to pay for the extra part immediately, the Construct is not able to participate in the next battle. It will remain on the roster until abandoned or repaired.", timing: ["13"] },
    {
        name: "Transform",
        rules: createRuleTable(
            "Roll a D6 each turn and consult the following. Once transformed, the Bitten cast off all equipment (save for a dagger) and suffer no penalties for fighting unarmed.",
            ["D6 Roll", "Effect"],
            [
                {
                    cells: ["1", ""],
                    content: createSpecialRuleText("Madness: your Bitten suffers from Stupidity this turn. If Transformed, they revert to human form.", ["Stupidity"]),
                    border: true
                },
                {
                    cells: ["2-5", ""],
                    content: "Act as normal",
                    border: true
                },
                {
                    cells: ["6", ""],
                    content: createSpecialRuleText("Transformed: your Bitten gains Frenzy and Sprint. This lasts until a 1 is rolled. Transformed do not roll when in combat.", ["Frenzy"]),
                    border: false
                }
            ]
        ),
        timing: ["2"]
    },
    {
        name: "Death of the Leader",
        rules: createSpecialRuleText(
            "Should the Necrarch perish, the Thrall shall pick up the mantle of Leader and all conferred bonuses shall be transferred to him. He may immediately roll on the spell list for one spell. You cannot hire another Necrarch, but you may create another Thrall from your current list of Acolyte Heroes. They will retain their current stat-line, but shall gain the benefits of being undead: Immune to Poison & Psychology, causes Fear & suffers No Pain. Should both Necrarch and Thrall be destroyed at once, the evil magics that bind the warband together fade, and all turns to dust",
            ["Fear"]
        ),
        timing: ["13"]
    },
    { name: "Vassal", rules: "The Acolyte has given himself over to his dark lord. At a whim, the Necrarch can see what the Acolyte sees, hear what he hears, and even speak through his slave. As long as the Necrarch has line of sight to an Acolyte, and the Acolyte is not engaged in hand-to-hand combat, he may use it as a casting point for a spell. Upon a critical failure of a casting (rolling double 1's) regardless of skills such as Mind Focus or the like, the Acolyte must roll on the Injury table and add +1.", timing: ["7"] },
    { name: "Powered", rules: "A Necrarch has placed a shard of wyrdstone in the Abomination to bring it life. Should the Abomination be removed from combat, the model who took it down receives a shard of wyrdstone. A new shard is then needed to re-animate the Abomination.", timing: ["13"] },
    { name: "Spare Parts", rules: "Thanks to the dark magics of their lords and the manner of their construction, Abominations ignore rolls of 1&2 on the post battle Injury Table; they cannot be destroyed.", timing: ["13"] },
    { name: "Greenskins", rules: "Unlike Goblins, Gnoblars do not tend to work closely with Orcs. However, for all intents and purposes, they count as 'Greenskins'", timing: ["12"] },
    { name: "Ideas Above Their Station", rules: "If the Ogre Hunter is killed, the Gnoblar with the highest leadership takes over as leader (or, if tied, the Gnoblar with the highest experience takes over). A replacement Ogre Hunter may be purchased, in which case he becomes the new leader.", timing: ["13"] },
    { name: "Don't Fight with Eating Knives", rules: "Ogres don't use daggers for fighting, just for eating. They don't carry them on the battlefield. If forced to, by losing a weapon or not carrying any weapon, they will fight unarmed. But since their physical strength the -1S penalty does not apply, but the +1 enemy armour save still does. They may make more than one unarmed attack, depending on their Attacks value. Note that you cannot combine this unarmed attack with another weapon, so it doesn't count as an additional attack like the dagger would. It can only be made if the ogre doesn't have any other weapons at his disposal.", timing: ["9"] },
    { name: "Lazy", rules: "An Ogre Hunter is far too preoccupied with Hunting to worry about pretty stones—that’s a Gnoblar’s job! If any of your Gnoblar heroes are able to search for wyrdstone or Rare Items, the Ogre Hunter does not add an exploration dice or search; they may only explore and search if all other gnoblar heroes are unable to (ex. Taken out of action).", timing: ["13"] },
    {
        name: "Central Figure",
        rules: createSpecialRuleText(
            "The gnoblars flock around the Ogre Hunter, and take strength from his presence. If he is taken out of action during a game, the warband is automatically at Rout level, regardless of the number of casualties.",
            ["Rout"]
        ),
        timing: ["2"]
    },
    { name: "Veteran Tracker", rules: "A trapper starts with ONE of the following Special Skills: Infiltration (max 1), Set Traps, Netter, or Scent Hound. You must choose this skill upon the hero’s purchase. See the Special Skills rules for details.", timing: ["12"] },
    { name: "Bait", rules: "Whenever a model declares a charge against a Sabre-baiter, he may immediately move 1D6” in the opposite direction of the charger. This may cause him to move outside of the charger’s charge range, in which case, the charge failed. You may only use this ability once per turn, and only if the Baiter isn’t knocked down, stunned, or in hand-to-hand combat. If the charging model is a Sabretusk, you may move the baiter 2D6” instead, and may maneuver around any models in your path (potentially causing the Sabretusk to charge someone else!).", timing: ["5"] },
    { name: "Bicker", rules: "At the start of your turn, at the end of the Recovery phase, roll 1D6 for each Gnoblar henchmen that is not in combat: on a roll of 1, it does nothing but issue insults at the nearest Gnoblar. It may not move, shoot, or cast magic this turn. Once a Gnoblar henchmen gains \"That Lad's Got Talent\", he loses the rule for Bicker, having put such childish games behind him.", timing: ["2"] },
    { name: "Scrap Slinger", rules: "A Flinger may throw 3 pieces of Sharp Stuff every turn, instead of the normal 1. (This does not combo with Knife Thrower, nor apply to throwing knives).", timing: ["7"] },
    { name: "Untamed", rules: "Sabretusks don’t bicker. However, at the start of each turn, roll 1D6 for each Sabretusk not in combat. On a 1, it does not move normally this turn. Instead, it moves 3D6” to the nearest non-sabretusk model; this counts as a charge. If it charges another member of your warband this way, after combat, move it 1” away.", timing: ["2"] },
    { name: "Sabretusk Charge", rules: "Sabretusks fight with 2 attacks instead of 1 during the turn they charge.", timing: ["4", "9"] },
    { name: "Tough Hide", rules: "Sabretusks have a natural 5+ armour save.", timing: ["8", "9"] },
    { name: "Horse and rider", rules: "Because the knights of Bretonnia are typically mounted on horseback, the Paragon and the Gallant may buy a single horse or warhorse each at half the normal price upon recruitment.", timing: ["12"] },
    { name: "Dame Armour", rules: "The Dame of the Mare comes equipped with an ancient armour that may never be removed, traded or stolen. It does not prevent spell casting, and provides a 5+ save that cannot be modified, but doesn’t work against magical attacks", timing: ["8", "9"] },
    { name: "Filly Armour", rules: "Covering provides the beast with a 5+ save that cannot be modified, but doesn’t work against magical attacks.", timing: ["8", "9"] },
    { name: "Outlaws Missile Restriction", rules: "All warriors in an Outlaws warband may be equipped with only one missile weapon at any time. All warriors must carry a type of bow, but not crossbows, as part of their equipment. So, even if an Outlaw acquires skills that allow him to use additional ballistic weaponry, he cannot do so. The only exception to this is the Cleric who may choose to carry a bow, but is not compelled to do so.", timing: ["12"] },
    { name: "Hiring Restriction", rules: "Your Warband may include one Cleric, but he can only be taken instead of either a Champion or Petty Thief.", timing: ["12"] },
    { name: "Death of a Leader", rules: "Should the Warrior Priest fall, the Acolyte with the most experience takes up the Mantle of Leader. Transfer all benefits of the Warrior Priest class to the Acolyte, and change his title accordingly. He does not immediately gain a Prayer, as that requires study and experience. With his next advance, he may choose to either take a prayer from the list, or roll for an advancement. All subsequent advancements are done as per the regular rules. Once promoted, the Acolyte becomes a Warrior Priest, thus freeing the Warband to hire another Acolyte.", timing: ["13"] },
    { name: "Huntsman Hiring Restriction", rules: "You may choose to replace one Templar with a Huntsman.", timing: ["12"] },
    { name: "Devoted", rules: "Trained since pups, these Hounds are devoted beyond what a typical master could expect. A Hound may re-roll a failed Leadership check if within 12” of the Warrior Priest.", timing: ["2"] },
    { name: "Master Handler", rules: "Packmasters are experts at handling all manner of twisted creatures. They have access to the Goading system, plus begin any one-off game or campaign with the Ride Wolf Rat skill and one additional Beast Handling skill (choose either Giant Rats or Wolf Rats).", timing: ["12"] },
    { name: "Poke 'em in the squidgy bits", rules: "Packmasters are trained to take full advantage of the tools of Clan Moulder's trade. If so equipped, they can gain the beneficial effects of both the Beastwhip and the Thingcatcher during a Goading attempt.", timing: ["2"] },
    { name: "Novice Handler", rules: "An Apprentice has access to the Goading system, but can only use the beneficial effect of either a Beastwhip or a Thingcatcher during a Goad, not both.", timing: ["2"] },
    { name: "Heir to Power", rules: "If the Packmaster is slain, one of the Apprentices must be chosen to succeed him as Leader. They are treated as a Packmaster in all respects from that moment on, and a new Apprentice may be hired to take their place. If the Packmaster and all Apprentices die at once, or if there are no Apprentices in the warband when the Packmaster dies, the warband disbands as none of the remaining Heroes has the skill to keep the beasts in line.", timing: ["13"] },
    { name: "Poisoned Attack", rules: "Attacks are considered to be Strength 4 but do not modify armour saves.", timing: ["9"] },
    { name: "It's Alive!", rules: "Rat Ogres are twisted creatures ever subject to the cruel curiosity of their masters. When hired each Rat Ogre must purchase a single Mutation from the list in the Mordheim Rulebook at the listed price (see Possessed Warband section).", timing: ["12"] },
    { name: "Hard to handle", rules: "Rat Ogres can only be bought individually, they never form a Henchmen Group even if you hire more than one.", timing: ["1"] },
    {
        name: "Goading",
        rules: createSpecialRuleText(
            "Has access to the Goading system",
            ["Goading"]
        ),
        timing: ["2"]
    },
    { name: "Weakness in Numbers", rules: "Snotling warband ratings count as being half of its' current value. (For example: you have 15 members, with a total of 42 experience. This would normally give them a rating of 117… but this number is now halved, so their actual rating is 59.) Likewise, for the purposes of Income and trading, Snotlings count as only half their actual warband size rounding up, producing a number between 3 and 15 as conventional warbands have for this purpose).", timing: ["1", "13"] },
    { name: "Scavengers!", rules: "Snotlings always roll an additional One exploration dice when exploring. They even get this extra dice when all the Heroes in the warband are knocked out of action.", timing: ["13"] },
    { name: "Too Unruly", rules: "Snotlings may never use any Hired Swords or Dramatis Personae, with the exception of Snotling Hired Swords and DPs, or HS/DP that mention the warband by name.", timing: ["13"] },
    { name: "Small Target", rules: "All Snotlings are at minus one (-1) to be hit from ranged attacks because they are so diminutive and hard to hit from a distance.", timing: ["8"] },
    { name: "Small Hands", rules: "Snotlings and the Bullied Goblin may never use Long bows, Elf Bows, Handguns, Long Rifles or Blunderbusses even if they gain an advance roll that would allow them to do so. Such big weapons aren’t built for such tiny hands! The exception is Shoota Teams, which use teamwork to make up for the difference!", timing: ["1"] },
    { name: "Not-So-Tough", rules: "When you roll on the injury table for Snotlings, a roll of a 1 is knocked down 2-3 means stunned and 4-6 means OoA. Henchmen who go OOA during a game will die on the roll of a 1-3 rather than just 1-2, and Snotling Heroes (not the Gobbo leader) must roll twice on the Heroes serious injury table.", timing: ["8", "9", "13"] },
    { name: "That (Git)’s Got Talent!", rules: "When a Snotling henchman gets the ‘That Lad’s Got Talent!’ advance, they automatically learn the skills Mob Rule and The Rigors of Leadership. See Warband list for details of these skills.", timing: ["13"] },
    { name: "Not A Snotling", rules: "The Bullied Goblin is NOT a Snotling, and does not use the rules for “Dodgy”, “Small”, and “Not so Tough Git”. His rating is still halved (in regards to the rule “Weakness in Numbers”), and may still use a Pebble.", timing: ["12"] },
    { name: "Mob Rule", rules: "The Hero is easily goaded on by his fellow Snotlings, and swells with courage in large groups. For every 2 Snotlings within 6\" of the Hero, the Hero gains +1 Leadership, to a maximum of 10. (Note: These bonuses will stack onto the Leader’s base Leadership for the purposes of the Leader skill).", timing: ["2"] },
    { name: "The Rigors of Leadership", rules: "Hero gains +2 experience for surviving a battle.", timing: ["13"] },
    { name: "Snotling Scout", rules: "Each Snotling Scout has this modified Infiltration skill representing their diminutive size and ability to infiltrate combining together to represent a superior talent. The Snotling Scout is always placed on the battlefield after the opposing warband and can be placed anywhere on the table as long as it is out of sight of the opposing warband and more than 8\" away from any enemy model. If both players have models which infiltrate, roll a D6 for each, and the lowest roll sets up first.", timing: ["1"] },
    { name: "He’s No Threat!", rules: "Single Snotlings, especially small ones like Scouts, are not given much respect for their threat potential. To represent this, Scouts (and ONLY Scouts) may always run, even if there are enemy within 8” at the beginning of the turn.", timing: ["4"] },
    { name: "Eadache!", rules: "After each time that a Shaman attempts to cast a spell, successful or not, roll 1D6: on a roll of 1 or 2, the Shaman and every model in base contact with him suffer a S5 magical hit. If the Shaman owns a familiar that has not been used this turn, he may reroll to see if he suffers an ‘Eadache’, accepting the second result. A Shaman does not have to test for ‘Eadache’ if he is merely rolling to maintain a spell.", timing: ["7"] },
    { name: "Teamwork", rules: "While a Shoota Team technically consists of 2 or more snotlings, for all intents and purposes, they count as one model.", timing: ["1"] },
    { name: "Cumbersome", rules: "Any Shoota Team possessing a Missile weapon (other than Pebble or a Slingshot) can never run (only charge).", timing: ["4"] },
    { name: "Recoil", rules: "When they fire a missile weapon other than a Pebble or Slingshot, Shoota Teams are immediately knocked backwards 1D6 inches. If this causes the team to collide with a solid terrain piece, it suffers a S2 hit. Likewise, if this causes them to collide with another model, then both the team and the model’s struck suffer a S2 hit. If the Shoota team fires a pistol in combat, then they automatically move the D6” directly away from the model they were in combat with, leaving combat (the opponent does not get a free attack. (Note: If you are knocked back off a buildings’ top, test for falling as normal).", timing: ["7"] },
    { name: "Not So Small, Surprisingly Tough", rules: "A Snotling Mob does NOT get the normal Snotling rule of “Small” –therefore, any missile shots at them do not suffer -1 to hit. Thankfully, they do not suffer the rule “Not So Tough Gits”, meaning they roll for Injury on the normal table and are only killed on a 1D6 Injury roll of 1–2. They have the “Dodgy” bonus as normal, to reflect their ability to jump over individual attacks.", timing: ["12"] },
    { name: "Mass Stupidity", rules: "A Mob can never gain 'That Lad's Got Talent'. If TLGT is rolled, Re-roll the dice until they gain a different advancement.", timing: ["13"] },
    { name: "Mob Mentality", rules: "Snotlings are infamous for becoming totally immune to being afraid of everything when they gang up into one big mass. When Snotling Mobs starts a turn within 2” of another Snotling Mob, they both become Immune to Psychology for the rest of the turn (this applies to an opponent’s turn as well.)", timing: ["2", "4", "9"] },
    { name: "Teeny Hand", rules: "Runts can use Missile Weapons as normal. However, Runt Henchmen can only use a single One-Handed Weapon at a time (ex. if a Snotling with a Pointed Stick buys a Club, he must ‘holster’ his Pointy Stick—he may not use them both to gain a second-hand attack!) Likewise, Runt henchmen are not allowed to take any types of armour. A Runt that rolls “That Lad’s Got Talent” loses the “Teeny Hands” rule and may take weapons and armour as normal.", timing: ["9"] },
    { name: "Smallest of the Small", rules: "Due to their incredibly small size, opponents are at an additional -1 to hit them at range with missile weapon attacks (for a total of -2 to hit). They are hit as normal in combat. Also, when taken out of action, after a game, Runt henchmen die on an injury roll of 1–4 instead of 1–3.", timing: ["8", "13"] },
    { name: "Experience", rules: "Runts can earn experience as normal. However, Each Enemy Hero or Henchmen Group that knocks a Runt out of action must, after the battle roll a D6, on a result of a 5+ the warrior who killed the Runt gains one experience point as per the normal rules for gaining experience. On a roll of 1–4, the warrior gains nothing.", timing: ["13"] },
    { name: "Swarm Size", rules: "Runts are brought in henchmen groups of 1+. There is no limit to how many Runts can be included in a single Henchman group.", timing: ["1"] },
    { name: "Wheelo Walking", rules: "When walking, a Wheelo has a move of 1D6 inches – roll each turn that he walks. Furthermore, a Wheelo may only ever move in a straight line forwards or backwards, but it may pivot up to 90 degrees on the spot before moving. This pivot move can only take place at the beginning of the turn before you roll to see how far the Wheelo moves. Also, if the Wheelo collides into any form of terrain other than open terrain for any reason, or when it comes into base-to-base contact with a buildings’ wall, the machine immediately stops and moves no further this turn. (Note: this enables climbing to take place – though it’s still random climbing so if you get halfway up the wall only, you fall as normal). If the 1D6” move brings the Wheelo into another model, it deals Impact Hits to it (see below) – if the model was an enemy, it counts as a charge.", timing: ["4"] },
    { name: "Wheelo Running/Charging", rules: "Instead of only moving 1D6”, a Wheelo may instead run or charge 2D6”. If this brings it into contact with an enemy, it counts as a charge – if the Wheelo’s move falls short, the Wheelo’s move is NOT halved, like normal failed charges. If the Wheelo moves into another model, it deals Impact Hits (see below). However, a running/charging Wheelo has one major drawback. They are prone to smashing off vital pieces of the engine, track or weapons attachments – some of which could cause considerable damage to the machine if removed. To represent this, every time a running/charging Wheelo moves over/through a different piece of terrain (Open terrain such as streets etc. has no penalties, but moving over difficult terrain such as rubble, barricades, and into houses etc. would incur the Damage rolls), the Wheelo takes an automatic Strength 5 hit. This hit and any subsequent injury rolls that may occur are worked out immediately when the Wheelo contacts the piece of terrain. If it survives, it may complete any remaining movement, but will take further damage if this movement takes it through a new piece of terrain.", timing: ["4"] },
    { name: "Wheelo Impact Hits", rules: "Whenever a Wheelo moves into a model, that model automatically suffers 1D3 Strength 4 hits, which are worked out before any blows are struck, in the same way as a crossbow pistol. These represent the Impact Hits of the Wheelo as it comes to a sudden stop against an unsolid object. These are only dealt in the first round of combat, and only if the Wheelo “charged” this turn. Models that charge a Wheelo during his or her turn do NOT suffer Impact Hits. If a Wheelo rolls into a friendly model, that model still suffers Impact Hits as normal. An Impact Hit does not reflect the strength of the Wheelo crew, and thus the attack will remain S4, even if the crew gains a Strength Upgrade. If the Wheelo charged two models simultaneously, they each suffer 1D3-1 Impact Hits, to a minimum of 1 hit each (roll the dice once; both models receive that same number of hits). If a Wheelo charged 3 or more models, they each suffer 1 Impact Hit.", timing: ["9"] },
    {
        name: "Wheelo Combat",
        rules: createSpecialRuleText(
            "The statline represents the stats of the Wheelo’s Crew members, who pull out built-in weapons and hide behind wooden armour. If the Wheelo rolls into an opponent, it counts as a charge, and the crew will fight in each hand-to-hand combat phase as normal. If the Wheelo is charged by an opponent, they will likewise fight, although without the Impact Hit bonus. If the Wheelo accidentally rolls into a friendly model, that model suffers Impact Hits (see above), but the crew will not attack the model. If the Wheelo rolls into a Fear causing opponent, it still counts as a charge (and the model still suffers Impact Hits), but the crew must pass a Leadership Test, otherwise they will not hit on anything but 6s.",
            ["Fear"]
        ),
        timing: ["9"]
    },
    { name: "Wheelo Tough Machine", rules: "The Snotling Special Rules of “Not So Tough Gits”, “Small”, and “Dodgy” do not apply to Wheelos. Also, if the Wheelo is out of action, do not roll on the normal Injury Chart to see if it dies. Instead, roll 1D6 on the following chart: 1 - The Wheelo is permanently Destroyed, remove it from the roster. 2 - The Wheelo must miss the next 1D3 games as it is taken back to the warband’s encampment and fixed/repaired. 3–6 - The Wheelo has survived the game relatively unscathed and can participate in the next battle as normal.", timing: ["13"] },
    { name: "Wheelo Upgrades", rules: "Wheelos count as henchmen, but whenever they earn an advancement, they instead roll on the Hero’s Advancement Table (in that regard, they’re very much like Hired Swords). However, they may never learn “That Lad’s Got Talent”, and like normal henchmen, may not have any stat increased more than once. The Wheelo ignores the normal max stats for Snotlings, as the stat line reflects the power of the weapons on board and the toughness of the armour. If a Wheelo rolls “Skill” as an advance, they may learn Combat, Strength, and Speed Skills. These ‘Skills’ do not represent actual knowledge (as mechanized barrels don’t learn much), but take into account any upgrade we can think of, be it a rocket motor (Sprint or Leap), blades and saws (Strike to Injure and Web of Steel), or even such things as a Parachute (Acrobat) or Wallo Gripping Tyres and Grapnels (Scale Sheer Surfaces)!", timing: ["13"] },
    { name: "Wheelo Weapons Training", rules: "As Wheelos do not carry weapons as such (any blades etc. on the Wheelo itself count as the instruments for the actual Impact Hits themselves). However, a Wheelo who gains 'Weapons Training' may have one of the following weapons fitted to its body", timing: ["13"] },
    { name: "Wheelo Weapons Training Axe", rules: "Impact Hits deal -1 Armour save.", timing: ["9"] },
    { name: "Wheelo Weapons Training Club", rules: "Impact Hits deal Concussion.", timing: ["9"] },
    { name: "Wheelo Weapons Training Spear", rules: "If charged, the Wheelo still deals a single Impact Hit to the charger before attacks are made.", timing: ["9"] },
    { name: "Wheelo Weapons Training Morning Star", rules: "The first round of Impact Hits dealt each game are at S5 instead of S4. All Impact Hits after are at normal Strength.", timing: ["9"] },
    { name: "Wheelo Sprint", rules: "Instead of rolling 2D6” to run/charge, the Snotling player may choose to move the Wheelo 3D6” instead.", timing: ["4"] },
    { name: "Wheelo Mighty Blow", rules: "The crew gains +1 to wound in combat. Has no effect on Impact Hits.", timing: ["9"] },
    { name: "Keep it secret, keep it safe!", rules: "A Sorcerous Society warband may never have a Hired Sword or Dramatis Personae with the Wizard ability save for the High Elf Mage. Otherwise they may use any other Hired Sword as a Human Mercenary Warband.", timing: ["13"] },
    { name: "The Vagaries of Magic", rules: "Members of the Sorcerous Society are using powerful and sometimes little known spells. As a result they are susceptible to the chaotic lure of magic. If a Wizard in the Sorcerous Society Warband rolls a natural 2 (two 1’s) when rolling for a spell than they must roll on the Magical Failure Table. 2: Aaarrgh! The powers of Chaos take over the helpless wizard as he horribly mutates to a Spawn of Chaos. Remove the wizard from your roster. 3: Gglbddlh: The wizard is now stupid. Roll a D6 after the battle: on a score of 2+ the effect ends. 4: Magical Shutdown: The wizard cannot cast any spells for the duration of this battle. 5-6: Uh-oh! The spell has been cast successfully – upon the wizard himself! Any additional decisions are made by the wizard’s left player. 7: Pooh, nothing at all! Except for the spell’s failure there are no further consequences. 8-9: Magical Explosion: The wizard is thrown D6\" in a random direction and then lands knocked down. 10-11: Magical jam: The wizard cannot cast a spell in his next shooting phase. Missile weapons may be used as normal, of course. 12: Wait, what's that? The uncontrollable powers of Chaos cause the wizard to mutate. After a moment of horror the transmutation ends. You may choose a free Mutation for the wizard chosen from the Possessed's Mutations chart (Mordheim Rulebook page 76).", timing: ["7"] },
    { name: "Body Guard", rules: "If the Companion is within 2 inches of a Wizard and not involved in Hand to Hand combat, he will take all missile fire and intercept any charges directed at the Wizard. If this requires that the model be moved, it is done so immediately, even if out of sequence or if it forces the model to move further than usually allowed in one turn. Note that the Companion must have a logical path to accomplish this goal; if he is within 2” of a Wizard but on a lower floor in a building, he will be unable to protect him in this manner.", timing: ["5", "8"] },
    { name: "Here, hold this", rules: "Untrained may be equipped with special items (like holy relics or lucky charms).", timing: ["1"] },
    { name: "Harnessed", rules: "Should an Untrained roll a “Lads Got Talent” roll, they immediately gain the “Wizard” skill. They may choose to either forgo their additional advancement and randomly generate a spell, or may roll as the Hero advancement dictates.", timing: ["13"] },
    { name: "Prove that Talent!", rules: "If “Lads Got Talent” is rolled the individual Grunt can either become a mundane Hero or may choose to become a “Grunt Untrained” instead. Therefore, a Grunt who rolls two “Lads got Talent” may become a wizard.", timing: ["13"] },
    { name: "Undead Leader", rules: "The Strigoi Vampire is the only Undead model in the warband. The warband does not disband if the Strigoi is killed, though it may not hire a new one.", timing: ["13"] },
    { name: "Survivors Of Strigos Hired Swords", rules: "The warband may hire Hired Swords available to Undead warbands.", timing: ["12"] },
    { name: "Seeker", rules: "Due to their premonitions, Seers who partake in a battle, and are not taken Out of Action may modify a single exploration dice by +/- 1.", timing: ["13"] },
    { name: "Child of Darknes", rules: "Borne of the night, Domnu are steadfast and loyal servants of the Strigoi. They are immune to the Spooky special rule for Sylvania.", timing: ["12"] },
    { name: "Gypsy Ward", rules: "Possessing an innate resistance to magic, the Domnu has a special save of 5+ versus magical attacks.", timing: ["8"] },
    { name: "Giant Bats Fly", rules: "Giant Bats fly through the night air, and thus do not need to climb or leap over gaps, even if their movement phase ends with them over open air.", timing: ["4"] },
    { name: "Sonic", rules: "Giant Bats use sonic vibrations to navigate the dark of night. No Line of Sight is needed for a charge.", timing: ["4"] },
    { name: "Vampire Hunters of Sylvania Hired Swords", rules: "Vampire Hunters accept nearly all aid that is available. As such, they may recruit Hired Swords as if they were Human Mercenaries.", timing: ["13"] },
    { name: "Stake the Vampire!", rules: "A Vampire Hunter Hates Vampires. They must always move towards a Vampire on the field (if he can see them) unless he can shoot (in which case he may choose).", timing: ["4"] },
    { name: "Blunt", rules: "Due to bludgeoning weapons having a much more profound effect upon the undead, Pilgrims ignore all bladed and ranged weapons in favor of maces, hammers and staffs. The only exception to this is the silver-tip stake, for it's incredible destructive powers against Vampires.", timing: ["1"] },
    { name: "Sniper", rules: "Due to their years of training Waywatchers can shoot while keeping almost invisible. This allows the character to shoot while hiding. After the shot roll a D6, on a 5+ no one noticed where the arrow came from.", timing: ["7"] },
    { name: "Camouflage", rules: "Waywatchers are experts at camouflage. They wear cloaks of green, brown or grey which are made from leaves sewn together. By painting their faces and bodies with green and brown paint they are almost invisible when hiding. When a Waywatcher is hidden, each enemy model has to make an additional I test to spot them.", timing: ["5", "8"] },
    { name: "Crossfire", rules: "If more than one scout henchman shoots at the same target, they get +1 on the injury roll.", timing: ["7"] },
    { name: "Pawnbroker", rules: "The Merchant is skilled in finding the best price for sold items and as such gains an extra 2D6 gold per item that the warband sells (up to its full value) if he was not taken out of action in the battle.", timing: ["13"] },
    { name: "Marketeer", rules: "The Merchant has many useful contacts in the black market underworld and foreign traders to locate many special items. After each battle (if he wasn’t taken out of action) the Merchant can visit one of three markets: the Black Market, Foreign Wares and the Fencer, in search of items for the warband. Roll a D6 on the relevant table to see what items are on offer. All the items purchased through the Merchant’s market contacts are at their base price (i.e., do not add the random gold modifier for items). All items bought from the Fencer are also at half price but after the item is used once roll a D6. On a roll of 1, the item breaks and is useless – an elaborate fake!", timing: ["13"] },
    { name: "Black Market", rules: "1: Nothing available. 2: Dark Venom or Black Lotus (D3 doses). 3: Crimson Shade (D3 doses). 4: Mandrake Root or Madcap Mushrooms (D3 doses). 5: Stiletto Blade (need Weapons Training to use) +1 attack per turn at -1 strength.. 6: Blowpipe (need Weapons Training to use).", timing: ["13"] },
    { name: "Cathayan Black Market", rules: "1: Nothing available. 2: Spider spittle (D3 doses) 3: Fire bomb. 4: Mandrake Root or Madcap Mushrooms (D3 doses). 5: Stiletto Blade (need Weapons Training to use) +1 attack per turn at -1 strength. 6: Blowpipe (need Weapons Training to use).", timing: ["13"] },
    { name: "Cathayan Exotic Wares", rules: "1: Nothing available. 2: Gromril armour. 3: Elf bow. 4: Ithilmar armour. 5: Tome of magic. 6: Elven Cloak.", timing: ["13"] },
    { name: "Foreign Wares", rules: "1: Nothing available. 2: Venom Ring. 3: Lamp of the Djinn or Monkey’s Paw. 4: Fighting claws. 5: Cathayan longsword. 6: Lesser artefact: For 75 + D6 x 10 gold crowns the warband may purchase an artefact, determined at random from the Lesser Artefacts table.", timing: ["13"] },
    { name: "Fencer", rules: "1: Halfling Cook Book. 2: Ithilmar Weapon. 3: Gromril Weapon. 4: Tome of Magic. 5: Hunting Rifle or Elven Bow. 6: Brace of Duelling Pistols.", timing: ["13"] },
    { name: "Intercept", rules: "The bodyguard will intercept any model shooting at or charging the Merchant. Any attacks will be directed at him and if charged place the bodyguard in front of the Merchant to protect him. The bodyguard will not charge unless the Merchant also charges and cannot intercept an attack if already engaged in combat.", timing: ["5", "8", "9"] },
    { name: "Arabian Merchant Guardian", rules: "This fighter should only be added if the Arabian Merchant takes the Guardian Skill", timing: ["12"] },
    { name: "Beastmen Vengeance", rules: "The Beast Hunter hates all Beastmen (this includes Gors, Ungors, Centigors and Minotaurs) and will fight for no upkeep cost in battles against Beastmen.", timing: ["13"] },
    {
        name: "Skull Rack",
        rules: createSpecialRuleText(
            "The Beast Hunter wears a grisly skull rack bedecked with bestial skulls. He causes Fear in all Beastmen.",
            ["Fear"]
        ),
        timing: ["5", "9"]
    },
    { name: "Predator", rules: "The Beast Hunter is a predator of all fell creatures but most especially Beastmen. In any battle that is set in the wilderness (ie. not within Mordheim) that involves Beastmen, the Beast Hunter may be set up after both warbands have deployed. He may be set up anywhere on the board that is hidden and outside of the enemy deployment zone.", timing: ["1"] },
    { name: "Cook", rules: "Halflings are renowned for their cooking skills. A warband with a Halfling Scout may increase its maximum size by +1, as warriors from all around are attracted by the smell of great food! Note that this does not increase the maximum number of Heroes you may have.", timing: ["12"] },
    { name: "Expert Rider", rules: "Counts as being stationary for the purposes of shooting (i.e.. no -1 modifier to hit) and he also benefits from the skill as he can reload quickly whilst on horseback.", timing: ["7"] },
    { name: "Unscrupulous", rules: "A Highwayman, despite all his skill and bravado, is not to be trusted. At the end of each battle roll a D6, on a roll of a 1 the warband receives 1 less piece of Treasure than they would normally as the Highwayman has stolen it for himself (this Treasure is not spent on the Highwayman, it is lost!). Obviously, if this keeps happening it will be up to warband leader to keep the Highwayman in his employ or not.", timing: ["13"] },
    { name: "Poisoner", rules: "The Assassin starts each game with his weapons poisoned with either Black Lotus or Dark Venom. The controlling player decides which poison the Assassin is armed with before the game starts, and this poison does not need to be traded for.", timing: ["2", "9"] },
    { name: "Weapons Master", rules: "The Assassin is a master of weapons and may use any weapon he finds. You may purchase weapons for the Assassin just as you would for any other member of your warband. However, unlike other members of your warband, any weapon you give an Assassin is his to keep – he will not give it to another warband member later. In addition, although he knows how to use them, an Assassin will never use a blackpowder weapon as such devices are far too conspicuous in their use for someone in his profession.", timing: ["13"] },
    {
        name: "Stern",
        rules: createSpecialRuleText(
            "May re-roll any failed Leadership test for Fear, and is immune to the rules for being All-Alone.",
            ["Fear", "All-Alone"]
        ),
        timing: ["2", "5", "9"]
    },
    { name: "Steady Hands", rules: "The Tilean Marksman's aim never wavers. He ignores 'to hit' modifiers for long range when shooting the crossbow.", timing: ["7"] },
    { name: "Dead Eye Shot", rules: "The Marksman has the eyes of an eagle and can hit the smallest target. He ignores 'to hit' modifiers for cover when shooting his crossbow.", timing: ["7"] },
    {
        name: "Songster",
        rules: createSpecialRuleText(
            "Any friendly model within 6\" of a Bard may re-roll any failed Leadership test with a +1 to Leadership. This includes Rout tests.",
            ["Rout"]
        ),
        timing: ["2", "3", "9"]
    },
    { name: "Hunter Set Traps", rules: "The Hunter may place up to six counters to represent these traps on the board immediately after the Hunter model is placed. They must be placed at ground level with at least 6\" between them. Any model (except the Hunter) that moves within 3\" of a trap counter must roll a D6. On a 1-3, nothing happens. On a 4-6, the model takes a single hit automatically at the strength shown on the dice. The trap counter is then removed. A single model can only set off one trap at a time. If an animal of any sort is put Out of Action by a trap, it is automatically captured after the game to be sent to the Old World.", timing: ["1"] },
    { name: "I said shut it", rules: "Whilst the Boss has this ferocious warrior in the warband the greenskins are reluctant to make trouble. Any orcs or goblins within 6\" of the Black Orc do not suffer from the effects of Animosity. The rest of the warband tests as normal.", timing: ["2"] },
    { name: "Who'se Da Man", rules: "If any Goblin leader is taken Out of Action during the battle, the Black Orc Hired Sword steps up to replace him. For the duration of the battle he gains the \"Leader\" ability. If the Goblin leader gets the \"Killed\" result after the battle, then the Black Orc decides to fill the new vacant position permanently. The Black Orc becomes the new warband leader, but he keeps his upkeep cost (hey, a Black Orc can't live on mushrooms and fungus alone). The Black Orc does not count towards the warband size when selling treasure.", timing: ["13"] },
    { name: "Capture", rules: "The Bounty Hunter will always be on the lookout for the outlaw he is pursuing. Such contracts are numerous, especially in Mordheim so at the start of each battle nominate one of your opponent's heroes as the Bounty Hunter’s mark. The Bounty Hunter gets a +1 to hit this model and must always move towards them (if he can see them), unless he can shoot (in which case choose). If the Bounty Hunter successfully takes the hero out of action' he gains the hero's gold value as payment (of which he gives the warband half) +D3 experience if he survives the game and the Bounty Hunter's side wins. After the battle do not roll on the serious injury table for the hero, he simply counts as captured.", timing: ["1", "13"] },
    { name: "Chameleon Skin", rules: "Because of the Chameleon Skink's unique camouflage he is very difficult to detect, therefore foes halve their Initiative when trying to detect him when Hidden. In addition Chameleon Skinks are at -2 to hit with missile fire", timing: ["5", "8"] },
    { name: "Wyrdstone Powered", rules: "The Clan Skryre Rat Ogre is a mindless automaton and does not require any pay - it does - however, require Wyrdstone shards to power it. It requires a single piece of Wyrdstone before each game to be ‘powered-up’.", timing: ["13"] },
    { name: "Darting Steel", rules: "May parry using his sword and buckler if he can roll under his weapon skill and not more than his opponent's highest hit roll as per the normal rules.", timing: ["9"] },
    { name: "Explorer", rules: "Dwarf Pathfinders are experts at foraging and living off whatever they can find in the wild. A warband with a Dwarf Pathfinder may roll one more dice than normal in the Exploration Phase, and discard one die of the player’s choice.", timing: ["13"] },
    { name: "Elf Grudge", rules: "Any warband wishing to hire a Dwarf that also contains an Elf must pay an additional 5 gold crowns upkeep. Dwarfs won’t put up with weak pointy-eared folk unless they have to, or are adequately compensated for their sufferance.", timing: ["13"] },
    { name: "No Magic", rules: "Note that Dwarfs may never take the Arcane Lore skill. It is not possible for a dwarf to learn how to cast spells.", timing: ["12"] },
    { name: "Lantern Rig", rules: "The lantern rig allows the Treasure Hunter to use the lantern and still keep both hands free for weapons. Otherwise it follows the normal rules for lanterns.", timing: ["9"] },
    { name: "Treasure Maps", rules: "Roll a D6 at the end of each battle which the Dwarf Treasure Hunter survives without going out of action. 1:Ambush!: The Dwarf Treasure Hunter is ambushed by D3 brigands who planted the fake map to lure the unwary to their doom. Immediately fight a close combat between the brigands and the Treasure Hunter with the brigands going first and counting as charging. The Brigands have the stats of a Human Mercenary Warrior and are armed with a club and dagger. 2: Poor Fake: It quickly becomes obvious that this is a feeble forgery and is utterly worthless. The Treasure Hunter uses it to light his pipe. 3: Looted Hoard: It was a good map, but someone beat you to it! Mind you, there's enough left to add +1 to the number of shards collected by your warband this game. 4: Cellar: When Dwarfs say “treasure”, they don't always mean gold. This map leads to a forgotten cellar of a ruined pub and contains a small barrel of Bugman's finest ale – treasure indeed! This works like the one in the rules, but there's only enough to give to D6 warriors. Decide when you want them to drink it and roll to see how many it'll go round. The first warrior to drink from the barrel must be the Dwarf Treasure Hunter himself. The barrel cannot be sold, and if the Treasure Hunter is not retained he'll manage to take this with him when he goes. 5: Real Treasure Map: Roll one extra Exploration dice. 6: Jackpot!: You get one extra Exploration dice. However, do not roll this along with the rest of them. Instead, roll the Exploration dice you'd normally be entitled to first. Then choose the result of the extra dice instead of rolling it (potentially making doubles into triples, etc). Once you've done this, resolve the results of the exploration as normal. Note that these results are not cumulative. The Treasure Hunter consults a different map each battle, and so the results only apply to that battle (or, more accurately, to the actions between that battle and the next).", timing: ["13"] },
    { name: "Fey", rules: "Hostile magic spells will not affect the Elf on a D6 roll of a 4+.", timing: ["8"] },
    { name: "Wanderer", rules: "Will only stay with a warband for the duration of a single battle. A warband who used this fighter in their last battle may not seek out another until they have fought at least one battle without one.", timing: ["13"] },
    { name: "Torturer’s grapple", rules: "Instead of using his normal attacks the Gaoler can make one grapple attack that deals no direct damage in melee. Instead, if the attack hits, the target must roll under his or her strength (with -1 penalty) or become immobile and writhing in indescribable agony, unable to do anything at all (fight in melee, use items, cast spells or shoot) until in the beginning of the next melee phase provided he rolls under his strength with -1 penalty again to see if escape is possible. If successful, the model can act as normal (though it still counts as being in melee with the Gaoler). Other models in Gaoler’s warband can attack the grappled enemy as normal, but the Gaoler cannot do anything else except hold the target. Enemies not alive and/or immune to pain (such as Undead or Daemons) are not affected by this attack, and neither are any Large models who are too big to grapple.", timing: ["9"] },
    { name: "Devout", rules: "As long as there is a Sigmarite Priest in a warband, the Gaoler will not leave it even if he is not paid his upkeep cost, though he will not fight in the next battle until he is paid, as he has to pass on a tithe to the Church of Sigmar.", timing: ["13"] },
    { name: "Inured to pain", rules: "The infernal heat of the torture chamber, devout self-mutilation and the massive bulk of the Gaolers give them a degree of resistance to pain. All Injury rolls against the Gaoler suffer -1 penalty. Ignore Injury results of 0 as if no damage was done at all.", timing: ["8", "9"] },
    { name: "Uneasy Ally", rules: "At the end of each game (whether or not the Halfling Thief actually took part), roll a D6. 1: Stop Thief!: Obviously unimpressed with his employment, the Halfling Thief has absconded with all the warband’s valuables! Remove the Halfling Thief from your roster, along with all Treasures and valuables remaining in your stash from previous games. Do not add any additional Treasures for having the Thief in your warband this game. 2-5: Tax Time: The Halfling Thief seems satisfied with his time with the warband thus far, and just charges “his normal fee” of a 15gc upkeep. 6: Ignorance is Bliss: The Halfling Thief seems very satisfied with the take so far (in fact maybe TOO satisfied, as he keeps rubbing his hands together and muttering to himself... ), and forgoes any upkeep charges on your warband this time. On the bright side, whatever it is he's filched you never knew you had.", timing: ["13"] },
    { name: "Not a Fighter", rules: "If a Human Scout is taken Out of Action during a game, he decides to leave on a 1-3, instead of the normal 1-2 when rolling for injury at the end of the game.", timing: ["13"] },
    { name: "Heart Strike", rules: "When shooting at a large monster (this includes large animals such as bears too), if the Kislev Ranger rolls a 6 to hit, followed by a wound roll of 5+, the beast is shot in some vital spot and is killed instantly, regardless of wounds, with no save whatsoever.", timing: ["7"] },
    { name: "Son of the Desert", rules: "The Nomad Guide is adept at finding sources of water. The warband can modify the result on the Supply Source table by + /-1.", timing: ["13"] },
    { name: "Rune Advancement", rules: "In lieu of a skill, may roll for an additional Rune, rolling a duplicate lowers the difficulty as normal for magic spells.", timing: ["13"] },
    { name: "Finders Keepers", rules: "In any scenario where extra Treasures/Wyrdstone are involved, the Prospector will keep any that he somehow gets his hands on. This will not count as his upkeep, as he will deny that he found any. For the purpose of Chance Encounter he will keep the Wyrdstone of any enemy heroes that he takes out action - neither warband will gain that shard. He has no effect on Defend the Find as the claim has already been staked.", timing: ["1", "13"] },
    { name: "Old Coot", rules: "Prospectors are prone to wander off, either because they've heard of a better strike or because they have fallen out with their fellows. At the end of each game roll a D6. On a result of \"1\" the Prospector has pulled up his pegs and left the warband.", timing: ["13"] },
    { name: "Lay of the Land", rules: "Even the densely packed growth of the primordial Lustrian jungles cannot bar the Pathfinder from his goal. The Pathfinder is unaffected by terrain modifiers and is able to circumvent even impassable obstacles.", timing: ["4"] },
    { name: "Knowledge of Myths and Legends", rules: "Pathfinder has spent most of their lives tracking down numerous rumours and cryptic clues in search of the ultimate prize. During the exploration phase, if the Pathfinder was not taken out-of-action, you may re-roll one die, keeping the second result even if it is worse.", timing: ["13"] },
    { name: "Priest of Morr", rules: "Priest of Morr is a Hired Sword but is treated as a Hero. Grade 1b", timing: ["12"] },
    { name: "Runesmith", rules: "Runes may be inscribed on axes, hammers, swords, two handed weapons, helmets, shields, light and heavy armour.", timing: ["1"] },
    { name: "Armourer", rules: "A Runesmith can repair and make weapons and armour. The warband may purchase one item per post game trading session from the following: axes, hammers, swords, two handed weapons, helmets, shields, light and heavy armour at a 2d6 gc discount to a minimum price of 1 gc. This applies only if the Runesmith did not go OOA.", timing: ["13"] },
    { name: "Bitter Enemies", rules: "If the last fight was against Dark Elves or a warband containing a Dark Elf Hired Sword, the upkeep cost is waived for that game.", timing: ["13"] },
    { name: "Infiltration", rules: "A Shadow Warrior can infiltrate.", timing: ["1"] },
    { name: "Shinobi Infiltration", rules: "A Shinobi with this skill is always placed on the battlefield after the opposing warband and can be placed anywhere on the table as long as it is out of sight of the opposing warband and more than 12\" away from any enemy model. If both players have models that infiltrate, roll a D6 for each, and the lowest roll sets up first.", timing: ["1"] },
    { name: "Snake Charmer", rules: "The Snake Charmer can control up to five snakes provided that they remain within 6\" of him. If a snake is not within 6\" of the Snake Charmer in the Movement phase, they will move 1D6\" in a random direction. If that takes them into contact with a model, either friend or foe, it will attack as if charging.", timing: ["4", "12"] },
    { name: "Venomous", rules: "The snakes are venomous and count as attacking using Black Lotus.", timing: ["9"] },
    { name: "Snake hunter", rules: "After each game the Snake Charmer may attempt to catch another snake, provided that he did not go out of action. The Snake Charmer makes this roll in the Recruitment and Trading phase and must roll under his initiative to successfully catch a snake. The Snake Charmer may only attempt to catch one snake after each game. If he fails to catch the snake there is a chance that he is attacked. Roll a D6. On a roll of 1 the Snake Charmer suffers a S3 hit.", timing: ["13"] },
    { name: "Tea-Leaf!", rules: "aturally thieves are most adept at stealing items! A Thief may attempt to steal one item during the Trading phase. Choose any item, if it is a common item the Thief successfully steals it on a 2+ on a D6. A Rare item is successfully stolen by rolling higher than the availability number on 2D6. Any items stolen may be used exactly the same way as one that was bought. If the Thief fails to steal the item roll a D6. On a score of 1-5 the thief is chased out of the trading post and escapes. On a score of a 6 the Thief is captured by whatever authorities there may be and is hung (remove him from the warband roster).", timing: ["13"] },
    { name: "Tomb Robber Explorer", rules: "The Tomb Robber allows your warband to modify a single dice roll on the Exploration chart by -1/+ 1.", timing: ["13"] },
    { name: "Excellent Reflexes", rules: "The Tomb Robber has a special save of 5+ against any attack made against him, be it shooting, close combat, traps or spells. If the Tomb Robber gains the Dodge skill this save increases to a 4+ special save.", timing: ["4", "8", "9"] },
    { name: "Recluse", rules: "Witches are very reclusive individuals and therefore difficult to employ Even when they are found they may be reluctant to aid the warband no matter how much gold they offer. When attempting to hire a Witch the warband leader must roll a D6. If he or she can score a 4+ the Witch can be hired, otherwise the Witch shuns them and they will have to try again after their next battle.", timing: ["13"] },
    { name: "Potions", rules: "The Witch is an expert as brewing all manner of curious concoctions. A single hero in the warband who have hired the Witch may partake of such a potion before the battle. Roll a D6 to discover the draught’s effect. 1:Debilitating: The potion is simply too potent for the hero and weakens them. They are at -1 Toughness for the whole of the next battle until they can roll a 6 on a D6 in the recovery phase to shrug off the ill effects. 2-3: Strength: The hero is infused with strength as he quaffs the potion. He is at +1 Strength until he rolls a 1 on a D6 in the recovery phase. 4-5: Resilience: An inner resilience passes through the hero. He is at +1 to Toughness until he rolls a 1 on a D6 in the recovery phase. 6: Fortitude: The hero's constitution is increased and he feels ready to take anyone on. He gains an extra wound for the whole battle. However, once lost the wound cannot be restored.", timing: ["1"] },
    { name: "Reluctant", rules: "Whilst she is happy to use her magic to aid the warband, the Witch is reluctant to enter the fray herself. As such the Witch will never charge (although if charged she will defend herself) and will always try to stay at least 8\" away from enemy models and must move away if she finds herself within this distance.", timing: ["4"] },
    {
        name: "In Sigmar’s name",
        rules: createSpecialRuleText(
            "The Witch hunter can call on his faith in Sigmar, he is allowed to reroll all failed Fear tests.",
            ["Fear"]
        ),
        timing: ["3", "9"]
    },
    { name: "Sigmar’s reward", rules: "Doing Sigmar’s work is reward enough at times. If the band take the leader of a chaos or undead band out of action the Witch Hunter waives part of his fee, at the end of the battle he only charges 5gc upkeep. Chaotic bands only includes bands truly chaotic, not merely nonhuman, eg not skaven, dark elves etc.", timing: ["13"] },
    { name: "Wolf Companion", rules: "Warbands may only purchase a wolf companion if they have a Wolf Priest of Ulric in their midst.", timing: ["13"] },
    { name: "Thick Fur", rules: "Their thick coat of fur counts as a wolf cloak for protection: 6+ save.", timing: ["8", "9"] },
    { name: "Undead Construct", rules: "Bone Goliaths ignore any injury rolled on the Injury chart on the roll of a 4+ and continue fighting, so a Bone Goliath has the possibility of taking much more damage than their 3 wounds suggest. This is not an armour save and so it is not modified by the Strength of the attack. This rule is ignored for wounds caused by magic or magic weapons.", timing: ["8", "9"] },
    { name: "Assembly", rules: "Bone Goliaths are not hired or found, they are instead constructed at great expense to their masters. Constructing a Bone Goliath will cause the Liche to reduce their starting Wound total by D3 wounds to a minimum of 1, in addition to the cost in gold crowns. A warband constructing a Bone Giant may not look for any rare items. A warband that has no Liche to lead it may not construct a Bone Goliath, but if the Liche dies after its construction, the Bone Goliath is unaffected. Warbands starting with a Bone Goliath can ignore this rule, unless of course they make one to replace a fallen Goliath.", timing: ["13"] },
    { name: "No Pain", rules: "Bone Goliaths treat stunned results on the injury chart as knocked down.", timing: ["8", "9"] },
    { name: "Haggle", rules: "The Merchant knows all the tricks of bargaining and haggling. He may deduct 2D6 gold crowns from the price of any single item (to a minimum cost of 1gc) once per post battle sequence.", timing: ["13"] },
    { name: "Cathayan Merchant Guardian", rules: "Can only be acquired if Cathayan Merchant has the Guardian skill.", timing: ["12"] },
    { name: "Chaos Centaur Mutations", rules: "When gaining new skill may buy one new mutation.", timing: ["13"] },
    { name: "Driver", rules: "A wagon driven by the Coachman may re-roll results on the Out of Control chart once. Note that the second result must be accepted even if it is worse.", timing: ["4", "8", "9"] },
    { name: "Handyman", rules: "The Coachman is skilled in fixing minor damage on the wagon. If the wagon is stationary (ie, it has not moved the last turn) and the driver is in contact with the wagon, he may repair one previously damaged wheel. The driver may do nothing else that turn and the wagon may not be moved. He can even set in a new wheel if it flew off. Note that if there are any enemy models in contact with the wagon, it cannot be repaired that turn as the situation is way too dangerous to focus on the cart.", timing: ["2"] },
    { name: "Hatred towards Grave Robber", rules: "All goodly men despise a Grave Robber, but any model that can use Prayers of Sigmar will hate the Grave Robber.", timing: ["9"] },
    { name: "Grave Robbing", rules: "During the exploration phase, a Grave Robber can loot a local cemetery if he wasn’t taken out of action. Roll 2D6. 2: Discovered! The Grave Robber is discovered and is driven from the cemetery by angry villagers or ghouls or any number of nasty things. Remove the Grave Robber from your warband roster. 3-4: Nothing: Pauper's graves. No significant finds. 5-7: Trinket: A corpse is found wearing a trinket of moderate value. You get D6+3 gold crowns. 8-9: Treasure: A corpse has a copious amount of treasure within its grave. You get D6+8 gold crowns. 10-11: Corpse: No treasure, but you may add a Zombie to your roster provided you have room in your warband. This Zombie is free. The corpse can be sold for D6+2 gold crowns if the player does not wish to keep it as a Zombie.12: Artefact: A Hero’s tomb. Contains a magical artefact, immediately roll on the Lesser artefact chart.", timing: ["13"] },
    { name: "Traitor", rules: "Due to the treacherous treatment the Hobgoblins have shown towards their greenskin cousins, the Hobgoblin is subject to the hatred of all greenskin races (Orcs & Goblins and Black Orcs) and a warband that hires the Scout may never take any other greenskin Hired Swords.", timing: ["9"] },
    { name: "Strictly Business", rules: "The Ninja is hired for one specific job only. Therefore the Ninja has no upkeep cost and automatically leaves the warband after the battle for which he was hired. This means that he cannot gain Experience either, of course.", timing: ["13"] },
    {
        name: "Secrecy",
        rules: createSpecialRuleText(
            "The Ninja is a maverick and does not accompany the warband into battle side by side. He does not count as part of the warband for purposes of Rout tests.",
            ["Rout"]
        ),
        timing: ["2"]
    },
    { name: "Crazed Firestarter", rules: "The Pyromaniac loves nothing more than the lights and sparks of his fireworks. Each turn he either starts one of his rockets or throws some of his firecrackers at hostile animals. Therefore he will move but never run or charge. If he is attacked he will fight back normally.", timing: ["4"] },
    { name: "Rockets", rules: "In every shooting phase the Pyromaniac starts one rocket. Use the artillery dice to determine how far the rocket flies. The initial direction can be controlled by the Pyromaniac. Unless an object is hit on the way, place a marker there. From then on, in every shooting phase each rocket will keep on flying a distance determined with the artillery dice and in a direction randomly determined with the scatter dice until it hits an object. Anything hit by a rocket suffers an automatic Strength 4 hit. In addition, objects hit by a rocket are set on fire on a roll of 4+. Whenever the artillery die scores a misfire, the rocket detonates immediately. Roll d6 to determine the effect of the fireworks. 1: Nothing. The rocket falls to the ground without any further effect. 2-3: Zishh! Re-roll the artillery dice and move the rocket with twice the scored number. 4-5: Spectacle: The rocket explodes with colourful lights. All models within 2D6\" must pass a Ld test or are distracted for the turn. Distracted models are automatically hit in close combat and cannot attack back. 6: Explosion: The rocket explodes causing an automatic S4 hit to all models within D6\".", timing: ["7"] },
    { name: "Master Craftsman", rules: "When Heroes from your warband search for Cathayan longswords and Dragon Swords the rarity of these items is decreased by –1 for every two Experience points the Swordsmith has.", timing: ["13"] },
    { name: "Scrounge", rules: "Such is the Beggar's skill at scrounging through the ruins of Mordheim, at the end of each battle that the Beggar was not put out of action, he adds an extra die of exploration to your pool.", timing: ["13"] },
    { name: "Not a Threat", rules: "Warbands may ignore Beggar for purposes of shooting at the nearest target and charging another enemy within 2\" of the Beggar.", timing: ["8"] },
    { name: "Daemonic Flesh", rules: "Due to their intangible nature, Daemons have a base armour save of 5+. This save is never modified but is completely negated by blessed or magic weapons and spells. The Daemon's attacks also count as magical.", timing: ["8", "9"] },
    { name: "Daemonic Instability", rules: "Daemons are bound to the world by dark sorcery that is highly volatile and unstable. If taken out of action, a Chaos Fury is banished and effectively destroyed on a D6 roll of 1-3 (do not roll for injury). If the spell-caster that summoned the Daemon is killed or leaves the warband, the Daemon is banished from whence it came.", timing: ["13"] },
    { name: "Fly", rules: "Instead of moving normally (unless knocked down or stunned), a Fighter may choose to: 1: Move anywhere within 12\" including into base contact with an enemy (in which case it counts as charging). 2: Move vertically without needing to climb. 3: Jump from any height without falling.", timing: ["4"] },
    { name: "Malicious", rules: "If a Chaos Fury takes an enemy model out of action, the Daemon spends its next movement phase stationary while it continues to torture and torment its victim. This effect immediately ends if an enemy model is within 8\", or if the Chaos Fury is the target of missile weapons and/or enemy spells.", timing: ["4", "9"] },
    { name: "Hunter", rules: "The Cursed Hillman has had to learn to survive in the bleak wilderness of the Empire. As such, he is incredibly skilled with his bow. He may move at half-rate, and still fire his bow without penalty.", timing: ["4", "7"] },
    { name: "Thin Flesh", rules: "Due to his constant changing into lupine form and back, his flesh has weakened to ease the transformation. As such, he counts as having -1T in hand to hand combat.", timing: ["9"] },
    { name: "Lycanthrope", rules: "The Cursed Hillman is a werewolf. Any time he loses a wound, he must roll a D6. On a roll of 4+, the beast within escapes and he transforms into a werewolf. Ignore any injury table rolls. Should he not transform, roll on the injury table at -1 (thus knocked down is 2-3, stunned is 4-5, and OOA is on a 6 only). While in wolf-form, he has a bonus Bite attack. This is resolved at -1S.", timing: ["12"] },
    { name: "Festooned with Pistols", rules: "Dwarf Slayer Pirates carry so many pistols into battle that they never have to reload, they always have a new pistol primed and ready to fire. The only exception is hand-to-hand combat. The Slayer Pirate will not have time to draw a new pistol every round of hand-to-hand combat, he may only use pistols in the first round. In subsequent rounds of hand-to-hand combat the pistol should be counted as a club. He may draw another pistol once he is out of combat or all of his opponents are knocked down or stunned.", timing: ["7", "9"] },
    { name: "Raging Drunk", rules: "The combination of being a Dwarf and spending the better part of life on the sea means Slayer Pirates usually know where to acquire some fine Dwarven Ale. A warband including a Slayer Pirate treats Bugman's Ale as Rare 6, but must pay an extra 2d6 gold crowns to compensate for the copious amounts of ale that the Slayer Pirate will consume.", timing: ["13"] },
    { name: "Emissary of Chaos Poison", rules: "All attacks are poisoned (as black lotus)", timing: ["7", "9"] },
    { name: "Slaanesh Fear", rules: "All enemies must pass a Leadership test to charge Emissary. Those that do engage the Emissary in close combat suffer a -1 to their to hit rolls.", timing: ["5", "9"] },
    { name: "Ashamed and Afraid", rules: "A Fallen Sister has risked much in her attempts to escape the Abbey and the notice of her former sisters. She must make a Leadership test in order to charge any member of a Sisters of Sigmar warband, or a Warrior-Priest from a Witch Hunters warband.", timing: ["4"] },
    { name: "Smart", rules: "The Goblin Lantern Bearer has survived partially on his brains. Being one of the smarter from the litter, he does not suffer from animosity as most goblins do.", timing: ["2"] },
    { name: "Very Lucky", rules: "The Goblin Lantern Bearer has survived for some time by his luck. If the goblin is taken out of action during the game, roll for his injuries with the following results: 1 – Lost 2-6 – Survives.", timing: ["13"] },
    { name: "Small Size", rules: "Due to their small size, Goblin Lantern Bearers can fit into very small spaces. If the goblin is not taken out of action during the fight, then they can help in the search for wyrdstone. When rolling for wyrdstone, roll dice as normal for the warband. The Goblin Lantern Bearer adds +3 to the total dice roll when determining the number of shards found (i.e. if the dice total is 15, then add +3 for a total of 18, and thus 4 shards found instead of 3).", timing: ["13"] },
    { name: "He’s o’er dere", rules: "A Gravesman knows what’s worth saving. Should a Hero die (rolls 11-15 on the Serious Injuries Chart post-game) you may retain his equipment on a D6 roll of 4+ thanks to the Gravesman’s instinctive greed. This occurs only if you pay the Gravesman’s upkeep; if you do not, he keeps what he has found.", timing: ["13"] },
    { name: "Slay Large Creature", rules: "A Halfling Knight, when charging a Large sized creature, gains +1S (this is in addition to the +1S he gains simply for charging with a cavalry spear).", timing: ["4", "9"] },
    { name: "Expert Tactician", rules: "At the start of the game, after all warbands have been deployed, the Imperial Tactician may then recommend up to D3+1 changes to your deployment (IE, you may change the starting position of up to D3+1 of your warriors).", timing: ["1"] },
    {
        name: "Read the Battle",
        rules: createSpecialRuleText(
            "As the Imperial Tactician has an eye for reading how any battle is going, he knows when a cause is lost or not. As long as the Imperial Tactician is not out of action, the hiring warband automatically passes the first Rout test they are required to make.",
            ["Rout"]
        ),
        timing: ["2"]
    },
    {
        name: "Pride of Ar-Ulric",
        rules: createSpecialRuleText(
            "Infamous throughout the Empire, the White Wolves’ courage and martial prowess is nothing short of inspiring to your average warrior. Knights of the White Wolf may act as a Leader to their comrades, allowing them to use his Leadership characteristic as their own when taking Leadership tests. However, his Leadership value cannot be used for the purposes of Rout tests.",
            ["Rout"]
        ),
        timing: ["4", "9"]
    },
    { name: "Cavalryman", rules: "The knight has left his mount behind before venturing into the city of the damned, but will use another if the warband wishes. Knights of the White Wolf may be given a Warhorse to ride (and no lesser steed) if the warband possesses one. This will grant him the usual Warhorse bonuses and increase the warband’s rating +5 per the normal Warhorse rules.", timing: ["12"] },
    { name: "Among Wolves", rules: "The Knight’s upkeep cost is halved if he is hired by a Middenheim warband, as he is obliged to work with his kin.", timing: ["13"] },
    { name: "Stealthy Gnoblar", rules: "The Ninja Gnoblar can throw his shurikens while hidden without revealing his position to the enemy. The target model can take an Initiative test in order to try to spot the throwing Ninja. If the test is successful, the Gnoblar no longer counts as hidden.", timing: ["7"] },
    { name: "Slave Master", rules: "Slave Master works much the same as the Bounty Hunter, except that the \"mark\" becomes owned by the Slave Master at the end of a battle. (No reward money is earnt, as you would from the Bounty Hunter Skill, you just now own the \"mark\"), but gets the D3 experience if he survives and the warband has won as normal. Thus the \"mark\" now works for the Slave Master's warband and will always be within 8\" of him (thanks to a mighty big chain shackled to the \"mark\" and held by the Slave Master). If the Slave Master is holding the shackles he can only use one weapon. The \"mark's\" weapons can be kept or sold depending on what the Slave Master warband player wants to do. If the Slave Master is taken OOA in a battle and none of the Slave Master's warband members are within 8\" of the \"mark\", then the \"mark\" will automatically run for the nearest safe area (whether that's off the board, in which case it disappears forever, or towards its original warband). If the mark ever comes within 8\" of its original warband, then it automatically is controlled by the original owner of the \"mark\". If the Slave Master is taken OOA in a battle and the mark is within 8\" of another figure from the Slave Master's warband, the \"mark\" will charge this closest model of that warband automatically in rage (treat as having hatred).", timing: ["9", "13"] },
    { name: "Slaver", rules: "Any hero or henchman put out of action by the Slaver will automatically be Captured (as per roll 61 of the Heroes Serious Injuries Chart in the Mordheim Rulebook). Note that any hero or henchman captured must be sold. Heroes sell for D6 x10 gold crowns and Henchmen sell for D6 x3 gold crowns. If a warband cannot pay this price, then that particular hero or henchman is sold into slavery and removed from the roster.", timing: ["13"] },
    { name: "Acrobatic", rules: "As a Swashbuckler relies on their dexterity, they have extremely good balance. As such, a Swashbuckler need not make an Initiative test when he is wounded and within 1” of a building edge.", timing: ["8", "9"] },
    { name: "Nimble", rules: "A Swashbuckler is used to climbing in and out of windows, as well as running along rooftops. To reflect this, a Swashbuckler may run or charge while climbing.", timing: ["4"] },
    { name: "Charismatic", rules: "Because of the Swashbuckler's sheer attractiveness, any opponent from the opposite sex (Sisters of Sigmar, Amazons), must make a Leadership test if they wish to charge him.", timing: ["5"] },
    { name: "Hunter’s Eye", rules: "The Ungor Trapper’s keen eyesight and mastery of the bow allow him to pinpoint weak points on an opponent’s body when shooting, conferring a +1 on injury rolls after a successful wound caused by shooting.", timing: ["7"] },
    { name: "Just a Twit", rules: "While the Ungor’s not as fearless as his bigger conspecifics, an Ungor Trapper who has been taken Out of Action will leave the warband on a 1-3 and take 10gc upkeep with him. You may discard this rule with the Fearless skill.", timing: ["13"] },
    { name: "Maintenance", rules: "Every now and then, the Weaponsmith manages to get his hands on tools and spare parts with which he can make improvements to certain types of equipment, as long as they are equipped by members of your warband or are stored in your warband’s treasure. Before each game, roll 1D6 and apply the result to the equipment of your Heroes and the Weaponsmith, accepting the first result even if no model is equipped with the relevant equipment: 1: The Weaponsmith hammers a few nails, polishes a few blades, but nothing more. 2: Heavy armours provide a saving throw of 4+, light armours of 5+. 3: Helmets give a saving throw of +1 in addition to their normal effect. 4: Bucklers give a saving throw of +1 in addition to their normal effect. 5: Shields allow parrying like bucklers in addition to their normal effect. 6: Short bows, bows, crossbows, and handguns have their range increased by 6\", pistols and duelling pistols by 3\". This increase does not stack with other bonuses from additional skills or special rules (the highest bonus applies).", timing: ["1"] },
    { name: "Stalk", rules: "Such is the skill with which a Wood Elf Hunter shoots that he may remain hidden after shooting his bow on a roll of 4+.", timing: ["7"] },
    { name: "Hunted", rules: "At the start of each game, the Wood Elf Hunter may choose 1 enemy to be his prey. All attacks against that enemy, be it missile or close combat, are made at +1 on the “To Hit” roll.", timing: ["1"] },
    { name: "Keen Eyed", rules: "An elf can see far better than the common man. As such he can spot hidden enemies at twice his Initiative value.", timing: ["4", "7"] },
    { name: "Invincible Swordsman", rules: "Aenur always hits his opponents on a roll of 2+ in hand-to-hand combat.", timing: ["9"] },
    { name: "Ienh-Khain", rules: "Ienh-Khain is an incredibly long single-edged sword, which Aenur uses with consummate skill. This sword allows Aenur to parry, adds +1 to his Strength and causes a critical hit on a roll of 5-6 when rolling to wound.", timing: ["9"] },
    { name: "Bertha Bestraufrung Hire Fee", rules: "Bertha will come to the aid of any Sisters of Sigmar warband if they send one or more of their Heroines to look for her in the normal manner, rolling under their Initiative (representing their efforts to gain audience with the High Matriarch). If she does grant an audience, she might decide that her personal help is needed in the forthcoming battle. She will only come to the aid of a Sisters of Sigmar warband if their enemy has a higher warband rating. Roll a D6 to see whether Bertha will aid the warband. A request for Bertha to aid the warband must be made for each battle you wish her to help the warband. Difference in Warband Rating vs Roll Required: 0-49:None, 50-99:6+, 100-149:5+, 150-199:4+, 200+:3+", timing: ["1"] },
    { name: "Bertha Bestraufrung Prayers of Sigmar", rules: "Bertha knows all six Prayers of Sigmar", timing: ["12"] },
    { name: "High Matriarch", rules: "As the High Matriarch of the Sisters of Sigmar’s Mercy, Bertha will automatically be the leader of any warband she joins.", timing: ["12"] },
    { name: "Sigmar’s Handmaiden", rules: "Bertha is favoured above all other Sisters in the eyes of Sigmar. She gains +2 to all her rolls to see whether her Prayers of Sigmar are granted.", timing: ["7"] },
    { name: "You can never escape your past", rules: "On the last turn of the game in which Marianna is still standing or as soon as a warband routs, ending the game, roll a D6. 1-3: Marianna has discovered that Serutat is getting close and will leave the warband’s service after the game. 4-5: Marianna has discovered a useful lead that she must pursue in this area and will stay for another game if the warband can afford her upkeep. 6: A group of Serutat’s minions have caught up with her! Fight D3 more turns as if the losing warband hadn’t routed (in the confusion the balance is reset). A randomly determined group of minions ‘appear’ within 2D6\" of Marianna, the opposing player chooses where. Marianna takes the first turn and then the minions, after which the turn sequence returns to normal with the minions counted as a an extra player. The minions only attack Marianna and must move towards her as fast as possible but will attack anyone else in their way. If her warband fight to help her (by taking at least one minion out of action) and she survives, Marianna will fight the next battle for free, otherwise she will leave. Minions 1-2: D3+1 Zombies 3-4: D3+1 Ghouls 5-6: Vampire (Sword & light armour) +2 Ghouls", timing: ["2", "13"] },
    { name: "Fighting Undead", rules: "Due to her vocation as a Vampire Assassin turned Vampire Hunter, all Vampires hate Marianna.", timing: ["9"] },
    { name: "The Noctu", rules: "The gemstone stolen from Serutat’s lair has powerful cloaking properties. The veil of shadow it creates reduces all shooting to hit rolls against Marianna by -1.", timing: ["8"] },
    { name: "Marianna Poisoned Weapons", rules: "Crossbow bolts and rapier are coated in essence of garlic, which acts as Black Lotus when used against Vampires.", timing: ["7", "9"] },
    { name: "Crimson Shade Addiction", rules: "Johann is addicted to Crimson Shade, so you may hire him for one portion of Crimson Shade if you wish.", timing: ["13"] },
    { name: "Crimson Shade Use", rules: "Johann can take Crimson Shade before battle if you want him to.", timing: ["1"] },
    { name: "Knife Fighter Extraordinaire", rules: "Johann has a deserved reputation for being the greatest knifefighter in whole of the Empire. Unlike normal warriors, he can combine the Knife Fighter and Quick Shot skills (yes, he can throw six throwing knives in one turn if he does not move!).", timing: ["7", "9"] },
    { name: "Nicodemus Spell List", rules: "Nicodemus knows all six Lesser Magic spells.", timing: ["7"] },
    { name: "Cursed", rules: "Nicodemus is not interested in money, he desperately needs fragments of wyrdstone to delay his abnormal growth. When he joins the warband and after each battle he fights, including the first, you must pay him with a wyrdstone shard. If you don’t have a shard or if you don’t want to give it to Nicodemus and prefer to sell it. the cursed pilgrim will leave the warband, never to return.", timing: ["13"] },
    { name: "Wizard's Staff", rules: "Nicodemus can use his staff in close combat in two different ways: he can use the staff with both hands, in which case the staff counts as a Club, but also allows Nicodemus to parry as if he was armed with a buckler; alternatively Nicodemus can use the staff in his left hand as a normal club while he's wielding the Sword of Rezhebel (see Lesser Magic spells) in his right hand.", timing: ["9"] },
    { name: "A Fistful of Crowns", rules: "These guys will do literally anything for money / Wyrdstone and have been known to change sides and stab their former employers in the back for just a few crowns. To represent this, opposing player(s) may attempt to bribe the pair into betraying their employers and changing sides. At the start of the game, any player(s) wishing to do this must secretly write down how much he is willing to bribe them by (this must of course be more than the pair’s starting hire fee!). The controlling/employing player is advised to secretly write down a counter bid at the start of the game also. The bribing player may then choose at the start of any of his turns to attempt to bribe them (even if they are in close combat!). If he does so he must reveal the amount he has written down and if this is more than the hire fee plus the amount the controlling player has for his counter-bid, then he gains control of the pair until the end of the game. Only the player who has control of the pair is forced to pay the additional amount so that if the original controlling player loses control of them through a bribe he doesn’t have to pay the counter-bid. This bribing business can of course get quite interesting in multi-player games with different players attempting to bribe at different times. Whichever player succeeds in bribing, or if the controlling player maintains control, they must pay this extra amount.", timing: ["12"] },
    { name: "Where’s the Money", rules: "These guys are not likely to accept any poor excuses if a warband cannot afford their extra pay. In the event that a player cannot pay the extra either in crowns or Wyrdstone (The warband should sell any Wyrdstone necessary in order to pay the hire or bribe) the pair will deprive the warband of an equal amount in equipment (based on market price). Failing this, they will take out their anger on the warband leader – immediately play a close combat with the pair versus the warband leader on his own and to the death!", timing: ["12"] },
    { name: "Inseparable", rules: "Ulli & Marquand are like brothers and are totally inseparable. They must be hired as a pair and must remain within 4\" of each other. In the event that one is taken Out of Action, the other will attempt to drag him off of the battlefield and to safety.", timing: ["12"] },
    { name: "Unblinking Eye", rules: "Thanks to the sorcerous devices built by the Warlock Engineers of Clan Skryre, Veskit can spot hidden enemies within twice his Initiative value in inches.", timing: ["4", "7"] },
    { name: "The Eye Pendant", rules: "The Eye Pendant is an ancient artefact stolen by Abdul from the Caliph of Sanai. Only after much painstaking research did Abdul discover its secrets and he has used its arcane powers to protect himself from the wrath of the Tomb Kings and their servants. Any Undead warrior wishing to attack Abdul must first pass a Ld test. In addition, the pendant gives Abdul a 4+ Ward save against all damage.", timing: ["8", "9"] },
    { name: "Djinn Master", rules: "Abdul Afhazred has spoken to many of the mystical Djinn in his time and despite his unsteady state of mind knows how to see through their lies and bend them to his will. If the warband he is with acquires a Lamp of the Djinn he may assist a Hero using it with a +1/-1 modifier on the Light and Dark tables respectively.", timing: ["13"] },
    { name: "Master Wizard", rules: "Knows all the spells in the Elemental and Necromancy lists", timing: ["12"] },
    { name: "Mad Wizard", rules: "Must roll at the beginning of each Shooting phase to see which spell he remembers. Roll a D6: 1-3 Elemental, 4-6 Necromancy Then roll a D6 to see which spell be remembers.", timing: ["7"] },
    { name: "The Crow Master Necromancer", rules: "Simius knows all of the Necromancy spells", timing: ["7"] },
    { name: "Mantle of Crows", rules: "The mantle in appearance is a simple shabby cloak but has a hidden malign power. It attracts a murder of crows that circle around Simius distracting his adversaries. Any enemy model in base-to-base contact with Simius at the start of the Hand-to-hand Combat phase suffers a single automatic Strength 2 bit before any blows are struck.", timing: ["9"] },
    { name: "Needle and Thread", rules: "A throwback to his surgeon's days, Simius carries a needle and thread. If Simius stuns an opponent in Hand-to-Hand combat and he has no other enemies standing in base-to-base contact, he sews up the mouth of his enemy. Leaders cannot then use their 'leader' ability and spell casters are unable to cast spells for the remainder of the battle.", timing: ["9"] },
    { name: "Payment in blood", rules: "Simius is a zealous scientist and his propensity to experiment is seldom slaked. If the warband who hires him loses the battle he may decide to 'abduct' a hapless warrior co experiment on. Roll a D6. lf you roll a 1, Simius abducts the Hero or Henchman with the lowest experience (not hired swords) and that warrior must be struck off the warband roster and for all intents and purposes is slain. Simius disappears without trace after he has collected his fee of course.", timing: ["13"] },
    { name: "Staff of Darkness", rules: "+ 1 to his casting roll.", timing: ["7"] },
    { name: "The Spiral", rules: "A symbol of the Dark Master. It is a potent icon that protects the wearer from harm. It grants the Dark Emissary a 5+ save that cannot be reduced by anything.", timing: ["8", "9"] },
    { name: "Dark Emissary Spells", rules: "The Dark Emissary is a powerful spell caster and knows four randomly determined spells of the Lore of Darkness", timing: ["1"] },
    { name: "Shadows Embrace", rules: "The Dark Elf has mastered the art of making the best use of shadows to hide, this is the legendary ability of the Dark Elf Scouts and the Assassins. If the Dark Elf is in cover and a model attempts to charge him, he can only charge the Elf using a charge move equal to his initiative in inches. In addition, missile weapons suffer an additional -1 penalty to hit on top of the penalty for cover.", timing: ["5", "8"] },
    { name: "Renegade", rules: "Dijin is a kinslayer and therefore a renegade in Druchii eyes. Any Dark Elves that Dijin is fighting against will suffer Hatred towards him.", timing: ["9"] },
    { name: "Berserker", rules: "If Drenok is reduced to zero wounds roll 1D6. On a score of 4+ he stands fighting until the end of the tum. You must roll every turn or he will be Out of Action.", timing: ["2", "8", "9"] },
    {
        name: "Oh no, not Snakes",
        rules: createSpecialRuleText(
            "'Altdorf' is subject to Fear for all snakes and serpents.",
            ["Fear"]
        ),
        timing: ["4", "9"]
    },
    { name: "Whip Swing", rules: "'Altdorf' Schmidt has developed a technique to use his whip as a rope to swing over gaps. To represent this, 'Altdorf' Schmidt can jump a gap (up to a maximum of 4'), without deducting the distance jumped from his normal Movement allowance. You must, however, still make an Initiative test not fall down. In addition, he may use his whip to jump to a lower level, even through windows. However, there must always be something on a higher level to attach the whip to in order of swing with it (just use common sense here - sewers, dungeons, tunnels, etc, always count as having something to attach the whip to). If 'Altdorf' Schmidt falls into a pit trap, he may try to use his whip to save himself from falling down by passing an Initiative test.", timing: ["4"] },
    { name: "No time for you", rules: "'Altorf' Schmidt is notorious for bejng a man in a hurry. If his charge path toward a hero, treasure or some other important target is obstructed by an enemy henchman who would prevent his charge, 'Altdorf' Schmidt may attempt a single shot with his Duelling Pistol before charging (assuming he didn't fire it last round of course). If this shot knocks down, stuns or takes the henchman out of action, 'Altdorf' Schmidt may charge as if the henchman wasn't there. If the enchman is unharmed, it counts as a failed charge as normal.", timing: ["4"] },
    { name: "I'll Take That", rules: "Rather than being paid in gold, 'Altorf' collects relics and artifacts from the places he visits. His upkeep cost is taken as a piece of treasure.", timing: ["13"] },
    { name: "Ethereal", rules: "Khar-mel has only a semi-solid form and has a 5+ save that is never be modified due to high Strength or anything else. The save is not effective against magical weapons.", timing: ["8", "9"] },
    { name: "Khar-mel The Djinn Spells", rules: "Khar-mel knows D3 spells chosen from the Elemental Magic list. Roll randomly on the Elemental magic list to determine the spells she may use.", timing: ["1"] },
    { name: "Khar-mel The Djinn Skills", rules: "All Djinn have magical powers due to their spiritual and elemental nature. Khar-mel has mastered each of these in her time but she may only use one at a time. During her Recovery phase she may declare that she is using one of her powers. It will last until her next Recovery phase. She may not use the same power for two consecutive turns. (Whirlwind, Djinn's Curse, Djinn's Luck)", timing: ["2"] },
    { name: "Whirlwind", rules: "Khar-mel has the power to turn into a whirlwind. This can take many forms: a sandstorm, a pillar of fire or a hazy shimmer in the air. She can run at triple her movement but may not charge or be charged. She cannot make any attacks or cast spells while using this power, but is at -1 to hit with missile weapons.", timing: ["4", "8"] },
    { name: "Djinn's Curse", rules: "Djinn are incredibly ancient creatures, prophets of fate and doom to many. This interferes with all of the Djinn's enemies within 4\", incurring a -1 penalty to their to-hit rolls (both with missiles and with close combat weapons) and all saves.", timing: ["8", "9"] },
    { name: "Djinn's Luck", rules: "Djinn have been around for centuries and due to their prophetic powers are very good at avoiding trouble. This power confers a 4+ Ward save. If no save normally applies (eg, against magic weapons) then she gains a 6+ save.", timing: ["8", "9"] },
    { name: "Penthesilea Hire", rules: "Penthesilea will come to the aid of any Amazon warband if they send one or more of their Heroines to look for her in the normal manner, rolling under their Initiative. If she does grant an audience, she might decide that her personal help is needed in the forthcoming battle. She will only come to the aid of a Amazon warband if their enemy has a higher warband rating. Roll a D6 to see whether Penthesilea will aid the warband. A request for Penthesilea to aid the warband must be made for each battle you wish her to help the warband. Difference in Warband Rating vs Dice Roll Required: 0-49 - None, 50-99 - 6+, 100-149 - 5+, 150-199 - 4+, 200+ - 3+", timing: ["1"] },
    { name: "Mark of the Serpent", rules: "The mark of the serpent. This magical tattoo is only given co the worthiest of Amazons warriors. Penthesilea gains +1 to her movement and Initiative", timing: ["12"] },
    { name: "Man-Hater", rules: "Penthesilea is subject to Hatred of all human males", timing: ["4", "9"] },
    { name: "Staff of Light", rules: "The staff can dispel a single enemy spell spell per turn on a roll of 4+.", timing: ["8"] },
    { name: "The Triskele", rules: "The symbol of the Truthsayer's office, this icon protects them from harm with its benevolent energies granting the Truthsayer a 4+ save, which cannot be reduced by anything.", timing: ["8", "9"] },
    { name: "Truthsayer Spells", rules: "The Truthsayer is a powerful spell caster and knows three randomly determined spells of the Lore of Light", timing: ["1"] },
    { name: "Belandysh Special Upkeep", rules: "In addition to the gold cost there is also a +1 campaign point upkeep cost", timing: ["13"] },
    { name: "Tol'Agath", rules: "Tol'Agath acts as a Warhorse (including the Battle Schooled rule). In addition, it is subject to the Inconsistency special rule.", timing: ["12"] },
    { name: "Wrath of Tchar", rules: "If a battle ends with Belandysh being out of action and someone having picked up the Broadsword of Damnation, Belandysh is pulled into the Realm of Chaos and never seen again. He then cannot be hired again for the remainder of the campaign.", timing: ["13"] },
    { name: "Ippan Shu Hire and Upkeep", rules: "In addition to hire cose +3 campaign points to hire and +2 campaign points upkeep cost", timing: ["13"] },
    { name: "Bare-handed Fighting", rules: "Ippan Shu can fight without weapons and suffers no penalties when doing so. In fact, he then counts as having a second close combat weapon and gets +1 attack.", timing: ["9"] },
    { name: "With the Elegance of a Feather", rules: "Ippan Shu’s moves appear supernatural to his enemies, as if he was flying. When running or charging he may move up to half his total movement rate (ie, 6” – see Lightning Speed skill) in any direction, not only on the ground. This can be combined with the leap skill, thus allowing Ippan Shu to move up to 6+D6” in any direction. Note that he still must always finish his Movement on solid ground.", timing: ["4"] },
    { name: "Way of the Dragon", rules: "Being one of the most perfectly trained mystic Dragon Monks, Ippan Shu spits fire upon his enemies in the shooting phase. Use the flame template to determine which models suffer an automatic Strength 4 hit. In addition, hit models are set on fire on a roll of 4+ (see “Fire Rules” section). Note that Ippan Shu can use his breath attack even when he is engaged in close combat.", timing: ["7"] },
    { name: "Innominatus Special Upkeep", rules: "20gc if Innominatus manages to fight a challenge", timing: ["13"] },
    { name: "Pit Master", rules: "To survive in the pit you need to think fast and act even faster! Innominatus to survive so many fights as gained an incredible ability and speed to avoid enemy strikes and shots: He can avoid any hit from close combat and missile weapons on a D6 roll of 4+. Note that this roll is taken as soon as a hit is scored (shooting and close combat) to see whether the Innominatus dodges it or not, before rolling to wound, and before any effects from other skills or equipment (such as lucky charms).", timing: ["8", "9"] },
    { name: "Who is the hero", rules: "Once per battle Innominatus can challenge any opponent hero, hired sword or Dramatis Personae on the battlefield to engage in a mortal duel (yes, including the leader and even if not in sight or hidden! Innominatus starts roaming across the streets shouting out the hero’s name with all sorts of wares!). If the opponent player refuses the duel the challenged hero, hired sword or Dramatis Personae is removed immediately from the battlefield. The challenged character is so scared to fight against Innominatus he prefers to run away and to hide so far away he will also miss the next game. If he accepts the challenge resolve the fight immediately. Roll to see which side charges and fight the battle as normal. Innominatus will benefit from the Pit Fighter skill. If Innominatus wins, see Thumbs Up/Thumbs Down rule. If the opponent wins remove Innominatus immediately from the battlefield, roll for injuries as usual and place the winning hero in his previous position. The hero or hired sword gains also 3XP for winning against a such great opponent.", timing: ["1"] },
    { name: "Thumbs Up", rules: "Thumbs Up: The life of the looser is saved but Innominatus will take as a trophy all the hero’s equipment, leaving him naked and shaking in the middle of the arena. Place the looser in his previous position but he is so shocked he will be subject to stupidity for the rest of the game (unless it is immune to psychology).", timing: ["12"] },
    { name: "Thumbs Down", rules: "Mercy is rare in the arena, Innominatus takes his blood tribute and the looser is slain. Remove the looser immediately from the battlefield and from the warband roster. All the heroes of the looser’s warband gain 1XP (having seen Innominatus in action has been a great lesson!) and the loosing player retains all the equipment of the dead model.", timing: ["12"] },
    { name: "Evil Eye", rules: "Luthor is immune to any and all Eye Injuries. Ignore the result 31 on the Permanent Injury roll table when rolling for Luthor.", timing: ["13"] },
    { name: "I am Everywhere", rules: "Luthor can be used by both warbands.", timing: ["1"] },
    { name: "The Crimson Blade", rules: "Luthor is an expert at backstabbing enemies already engaged in combat. When attacking enemies engaged in melee against another opponent, Luthor gains +1 to hit, +1 to wound and +1 to Injury rolls.", timing: ["9"] },
    { name: "Disengage", rules: "Luthor knows that discretion is the better part of valour, and thus he is an expert at disengaging from combat. During his own movement phase, he can move away from any melee without his enemy having a chance of making any attacks. He can even charge another enemy this way.", timing: ["4"] },
    { name: "Fireballs", rules: "Luthor can throw his clay orbs of Tilean Fire in the missile phase, even when engaged in melee combat (in melee choose any enemy in base contact). They have a range of 8”, and suffer no hit penalties for long range. If the orb hits, the target suffers 1 S2 hit from the bursting flames, and in addition the model needs to roll under the Initiative at the start of its next turn in order to see through the smoke. If the model fails, it cannot charge or shoot until the beginning of its next turn, though can otherwise move or act normally, and fight in hand-to-hand combat. Only one check is needed even if the target is hit by multiple Orbs due the Quick Shot skill.", timing: ["7"] },
    { name: "Fish-slapping Dance", rules: "The fish nailed to Luthor’s staff was actually cursed by the Witch living in the ruins of Sylvania. When used in close combat, on a roll to hit of 6, resolve the hit by the staff at double Strength (i.e. 8 instead of 4). Many a warrior has been felled by the fearsome slap of the fish!", timing: ["9"] },
    {
        name: "Boast",
        rules: createSpecialRuleText(
            "Before taking one of his shots in the Shooting Phase, Luthor may boast how he knows he is going to hit the target. If he hits the target with his missile attack, roll a D6: the result is a bonus that can be used as a bonus for any single to hit roll with a melee or missile attack or Leadership test (including Rout rolls). You can use the bonus AFTER making the roll. The bonus must be used before the beginning of Luthor’s next Shooting phase or the bonus is lost. If he misses, the entire Warband on Luthor’s side suffers -1 Ld cumulative penalty until Luthor hits another target. So if Luthor Boasts twice and misses twice, the whole Warband operates at -2 Ld.",
            ["Rout"]
        ),
        timing: ["7"]
    },
    { name: "Do you feel lucky lad", rules: "Luthor flamboyantly aims at one of his opponents and swears he will shoot him dead with a single arrow. The warrior is understandably unnerved and suffer -1 penalty to his WS and BS as he constantly has to check whether Luthor is going to shoot him. Pick a target for Luthor’s threats in the beginning of each of Luthor’s Missile phases - this can be any model in the opposing Warband, not just the nearest one. Luthor can only do this if he is not engaged in melee combat and not Stunned/Knocked down. Undead models, Daemons, animals and warriors immune to psychology such as Flagellants are immune to this ability.", timing: ["7"] },
    { name: "Luthor Post Game", rules: "After each battle roll a D6. On a roll of 1, Luthor has “misplaced” one of your Wyrdstone pieces if your Warband has any.", timing: ["13"] },
    { name: "I Ain't Got Time For You", rules: "Luthor always succeeds when checking if he can escape from combat.", timing: ["4"] },
    { name: "Looter", rules: "Whenever Luthor enters a new building (as long as he is not Down or engaged in combat), he finds D6 Gold Crowns worth of loot -this can be done only once per building. Add this to a running tally. If at the end of the battle, the leader of the Warband has to take a Leadership check. If successful, the warband gains half of the gold Luthor found. If the check fails, Luthor keeps all the looted gold!", timing: ["4", "13"] }, { name: "", rules: "", timing: [""] },
    { name: "Mordheim Guide", rules: "Luthor knows Mordheim better than almost any man alive. When rolling on Exploration chart, you may consult Luthor. If you do so, you may add +1 Dice to the total of Exploration dice rolled, and once you have rolled all the dice, you can change one dice to match any other result rolled. If you use this ability ( +1 Dice and the adjustment), the leader of your warband has to take a Leadership check. If you fail, then ignore the result on the Exploration Chart as Luthor finds the location alone and takes everything for himself! You still gain standard income and Wyrdstone as normal.", timing: ["13"] },
    { name: "Maglah's Boyz", rules: "Maglah is always accompanied by some of his loyal Hobgoblin Wolfboyz. Therefore a warband cannot hire Maglah alone but must hire some of his retinue as well. A warband with Maglah Khan must hire multiple Hobgoblin Scout Hired Swords as long as he stays in the warband. The minimum is always two and up to a maximum of five Hobgoblin Scouts may be taken. When Maglah leaves the warband all Hobgoblin Scouts except for one will also leave.", timing: ["12"] },
    { name: "Hobgoblin leader", rules: "Maglah Khan is the leader of all Hobgoblin Scouts in the warband. Any Hobgoblin Scout within 6“ of him may use his Leadership when taking Ld tests. They may not use the warband’s leader Leadership.", timing: ["2", "9"] },
    { name: "Aksho'akhash Summoning Cost", rules: "The hiring fee represents the ingredients for performing the summoning ritual and are consumed regardless of the success of the ritual.", timing: ["13"] },
    { name: "Aksho'akhash Summoning", rules: "The spell-caster must possess the Macabre Tome from the ‘Flurry of Furies’ scenario (see the previous page), pay the hiring fee*, and pass a Leadership test. If the ritual is successful, the Macabre Tome is destroyed and the Daemon is summoned.", timing: ["13"] },
    {
        name: "Coward King",
        rules: createSpecialRuleText(
            "One does not grow to become ruler of a rubbish heap without a healthy respect for the integrity of one’s corporeal form. Unlike other Daemons of its ilk, Aksho'akhash is not immune to any psychology. Additionally, unlike other warriors that cause Fear, Aksho'akhash itself is not immune to fear tests caused by other warriors.",
            ["Fear"]
        ),
        timing: ["4", "9"]
    },
    { name: "Aethereal Hoarder", rules: "After each game, so long as Aksho'akhash was not taken out of action, it may perform one of the following tasks: 1. Reroll one exploration dice. 2. Search for a rare item as if it was a Hero; add 1 to the roll. 3. Find trinkets amongst the ruins worth 2D6 gold crowns.", timing: ["13"] },
    { name: "Massively Built", rules: "As any visitor can tell you, Gwen is a massive woman. During the shooting phase, if she is not in close combat, and hasn't run, she may “show her stuff” to any visible male target within 12\". The target model must make a Ld check or lose his entire next turn as he stands dumbfounded by her impressive bulk.Naturally, females, skaven, orcs, and other non-human races are immune to this. While most undead are immune, Vampires, and Necromancers are not. Elves and Dwarves are affected, though not necessarily gaping in awe as much as disgust. (Optional) Any Slaaneshi cult members who fail their leadership check must take a further -1 Ld penalty for the remainder of the game.", timing: ["7"] },
    { name: "Gwen single game", rules: "In a one-off game, treat Gwen as a normal Dramatis Personae with a cost of 85gc whom adds +65 to the warband's overall rating.", timing: ["13"] },
    { name: "Not Hired Muscle", rules: "A gang must send someone to look for Gwen as per normal rules. However once sent she is always found automatically. (No need to roll under initiative) This will set up the initial bargain. The warband will then need to fight the special scenario using Gwen as a Hired Sword. The game may be played with an Arbitrator, or a second gang may opt to fight in the Arbitrator’s place. In a campaign this game still counts against the maximum games playable. If the warband wins, they may choose any single, usable Personae Dramatis or Hired Sword and will gain their services free of charge for their next game only. If they lose, they must pay Gwen 2D6×5gc to pay for repairs to the Stoat. Either way, the warband may still look for treasure and wyrdstone following all the normal restrictions.", timing: ["1"] },
    { name: "Confound and Confuse", rules: "In combat the Dark Jester uses a series of distraction and confounding ‘tricks’ to gain the upper hand on his hapless adversaries. At the start of each combat turn (his and his opponents) he may select one of the ‘tricks’ below to use in that round. 1. Sidestepper: The Dark Jester weaves and bobs in combat as if he were a puppet hung from preternatural, prescient strings. In hand-to-hand combat the Dark Jester has a special dodge save of 4+ that cannot be modified by the strength of the attack. 2. Babbling Banter: The Dark Jester babbles inanely and taunts his opponents, distracting them and opening up their defences as they recklessly try to silence him. All enemy models in base-to-base contact with the Dark Jester are at -1 to hit in hand-to-hand combat and their opponents are at +1 to hit those affected. 3. Trip: The Dark Jester lures his opponent toward him with a few cutting taunts and then deftly steps aside their fatal swipe to upend them into the dirt. The Dark Jester may forgo rolling to ‘wound’ after a single attack and may instead elect to ‘trip’ his opponent. The Dark Jester rolls a D6. On a roll of 2+ his opponent is tripped and counts as ‘knocked down’.", timing: ["9"] },
    { name: "Faithful Steed", rules: "The same dark magics that animate the Headless Horseman also keep his loyal steed at his side. As a result, he may never dismount.", timing: ["4"] },
    { name: "Undead", rules: "Both the Headless Horseman and his steed count as undead for the purposes of Blessed Water, etc.", timing: ["12"] },
    { name: "Rapid Reload", rules: "The Headless Horseman’s speed at reloading is legendary and he can reload both of his pistols in the blink of an eye! Because of this he can fire with both (the skill Pistolier) of his dueling pistols every Shooting Phase.", timing: ["7"] },
    { name: "Head Hewer", rules: "Ever since the loss of his own head, the Headless Horseman has started his own morbid collection with the very same axe which caused his own grizzly demise. When the Headless Horseman charges, all attacks with his double handed axe cause +1 to all injury rolls and he causes a critical hit on a roll of 5-6. Note this only counts for the turn in which the Headless Horseman has charged, and not subsequent turns in which he is still engaged in hand-to-hand combat.", timing: ["4"] },
    { name: "Poison Ring", rules: "Schleige wears a ring of his own devising that hides within it a poison he calls Giggle Juice. The poison causes the victim's muscles to cramp and contract severely, often strongly enough to cause the chest muscles to splinter the victim's ribs and crush his lung. Facial muscles twist and distort the victim's expression into a ghastly, grinning rictus. Once per battle, Schleige may, instead of making a normal attack, choose to spray a single opponent in hand-to-hand combat with a high power spray of Giggle Juice. This is an automatic STR 2 hit, and the poison adds a +1 to Injury Rolls. If taken out of action by the poison, during the post battle sequence if the warrior rolls any result except for Dead or Full Recovery, he gains the serious injury Nervous Condition (in addition to the regularly rolled result).", timing: ["9", "13"] },
    { name: "Sadist", rules: "Schleige takes supreme pleasure in the slow and inventive suffering of others. If an opposing warband member is Captured, Schleige will step up and demand he be given the warrior for his 'tastes'. The warrior is considered dead, and his weaponry, etc, may be kept by the capturing warband.", timing: ["13"] },
    { name: "Master Craftsman Schleige", rules: "A wondrous toymaker in his former life, Schleige retains his skills with devices and invention, though now his warped mind turns this talent to the darker arts. After the battle, a single warrior from the hiring warband may approach the Foole and ask him to improve a single weapon. Schleige, however, is not known for being a rational creature; roll a d6. 1:  Schleige merely stares at the warrior, giggling and babbling inanities. 2-5: Schleige takes the offered weapon and shuffles off, bent low over it and muttering. The next morning, the weapon will be found outside the warrior's tent, more often than not garishly painted or adorned with bits of children's toys (or less savory trophies). To determine how the weapon has been modified, roll an additional D6: (1-2 — The weapon now has +1 STR. 3-4 — The weapon now adds +1 to the wielder's Initiative. 5-6 — Next to the weapon sits a vial of Giggle Juice, which may be used to coat the weapon. Giggle Juice adds a +1 STR to the weapon as well as a +1 to the Injury roll. There is enough poison in the vial for two battles.) 6: Schleige takes the offered weapon, laughs wickedly, then attacks! Treat the encounter as a single combat. The defending warrior must fight without the weapon he has just foolishly handed to a madman; Schleige may use either his own sword or the weapon he has just been given. After combat, Schleige will discard the new weapon and scamper off into the ruins, giggling madly.", timing: ["13"] },
    { name: "Sigmund Spindle Alt Hire Cost", rules: "Sigmund Sprandle may also be hired in the payment of one body part. If you wish to do this then a chosen Hero suffers one Severe Arm Wound and may only use one single handed weapon from now on.", timing: ["13"] },
    {
        name: "Pages of Couragio",
        rules: createSpecialRuleText("During any match in which you are NOT the highest ranking warband, you may use William’s ‘Pages of Couragio’ ability. Keep track of any Hero or Henchmen group member in your warband who performs one of the following acts. That warrior is rewarded a Couragio Point (with Henchmen, the group gets the point. Intercepts a charge. Takes an enemy warrior Out of Action who was NOT Knocked Down or Stunned. Successfully passes a Fear test to charge an opponent. Successfully makes a Diving Charge. Survives a Combat Phase, during which he is outnumbered at least two to one. At the end of the game, randomly choose a Hero or Henchmen group that earned at least one Couragio point. If the chosen person was a Hero, that Hero gains an extra D3 experience this game. If instead you choose a Henchmen group, the entire group earns 1 extra experience for the game. Couragio Points do not carry over from one game to the next. Non-experience-gaining warriors cannot gain Couragio points.",
            ["Fear"]
        ),
        timing: ["13"]
    },
    { name: "Commands", rules: "During the recovery phase, if the Wandering knight is not knocked down, stunned, or out of action, he may shout a Command instead of running.<br><br>Commands affect friendly models within 6\" that can hear him (not stunned or knocked down). Models may only benefit from one Command per turn.<br><br>If the Wandering knight dies, the new warband Captain gains the Commands ability starting with a random Command.", timing: ["2"] },
    { name: "Corruption", rules: "When hit in close combat but before rolling to wound, the player controlling the Mazzalupo warband can give 5 gold crowns to the opponent for each model that hit the Master of finances.<br><br>If it does, the corrupted model must reroll a successful attack roll. Each model cannot reroll more than one attack in this way, but multiple models can be bribed with 5 gold crowns each.<br><br>Models immune to Psychology cannot be corrupted.", timing: ["9"] },
    { name: "Indolent", rules: " Fallen nobles can never be the target of a Wandering knight's Commands.", timing: ["2"] },
    { name: "Ye give way", rules: "When the Fallen noble declares a charge against a Hero, they may challenge the target to yield the way.<br><br>If the opponent refuses the challenge, the Fallen Noble cannot charge that model but may continue their turn normally, even declaring a new challenge; the warrior who refused the challenge suffers a -1 to hit in hand-to-hand combat, non-cumulative, until the end of the game.<br><br>If the opponent accepts, the combat proceeds normally, but no other warrior may join the fight, although both models can still suffer area effects and be the target of spells. If the Fallen Noble manages to put the challenged opponent out of action, they gain a +1 to hit in hand-to-hand and a +1 S, non-cumulative, until the end of the game.", timing: ["4", "9"] },
    { name: "Petty thief", rules: "If, at the end of the game, the Squire was not taken out of action, roll 1d6. On a result of 5+, subtract one Wyrdstone shard from a randomly determined opposing warband and add it to your reserve.", timing: ["13"] },
    { name: "Butcher’s meat", rules: "Black sheep can be ignored by the opponent when determining the closest target in the Shooting phase.<br><br>At the same time, the Mazzalupo warriors can shoot at enemy models if they are engaged in hand-to-hand combat exclusively against Black sheep, randomly determining which of all models engaged in combat is hit.", timing: ["7", "8"] },
    { name: "Mountain animals", rules: "Black sheep can climb up and down following normal rules despite being animals.", timing: ["4"] },

    //Bloodline Powers    
    { name: "Martial Prowess", rules: "Blood Dragon Vampires start with +2 Weapon Skill.", timing: ["9"] },
    { name: "Eternally Brave", rules: "Blood Dragon Vampires may re-roll the first failed Rout test (if the Vampire is not out of action).", timing: ["2"] },
    { name: "Honour", rules: "Blood Dragon Vampires may not attempt to break away from combat or Voluntarily Rout (if the Vampire is not out of action).", timing: ["2", "9"] },
    { name: "Warrior Code", rules: "Blood Dragon Vampires cannot use Magic (even with the Book of the Dead from TC #11).", timing: ["12"] },
    { name: "Men-at-arms", rules: "Dregs start with +1 Weapon Skill.", timing: ["9"] },
    { name: "Necrarchs Poor warrior", rules: "Necrarch Vampires start with -2 Weapon Skill, may only be armed with a single-handed dagger, sword, axe or mace and cannot take Strength Skills.", timing: ["1", "9"] },
    { name: "Necromantic Lore", rules: "The Necrarch starts the game as a Wizard in exactly the same way as the Necromancer.", timing: ["12"] },
    { name: "Loathes the Living", rules: "May not hire any Hired Swords.", timing: ["12"] },
    { name: "Lahmia Poor warrior", rules: "Lahmian Vampires start with -1 Weapon Skill and cannot wear Heavy armour, and may only be armed with a single-handed dagger, sword, axe or mace.", timing: ["1", "9"] },
    { name: "Enchanting Beauty", rules: "-1 to any living opponent’s Leadership while in base contact with Vampire (note: this has no effect against the Undead or Daemons).", timing: ["9"] },
    { name: "Unnatural Speed", rules: "Lahmian Vampires start with +2 to Initiative.", timing: ["4", "9"] },
    { name: "Strigoi Bestial", rules: "Strigoi Vampires start with +1 Attack but cannot use any Items or Equipment.", timing: ["9"] },
    { name: "Strigoi Hatred", rules: "Strigoi Vampires suffer Hatred of all living things.", timing: ["9"] },
    { name: "Reviled", rules: "Strigoi Vampires hire Necromancers and Dregs at +10 gc to hire.", timing: ["12"] },
    { name: "Feared", rules: "Strigoi Vampires may not hire any Hired Swords.", timing: ["12"] },
    { name: "Ghoul King", rules: "Strigoi Vampires may hire up to one Ghast at 50 gc (counts as a Ghoul hero that starts with 0 exp.). Ghoul Henchmen cost 5 gc less to hire.", timing: ["12"] },
    {
        name: "Mad Cap Master",
        rules: createSpecialRuleText("Night Goblins consume so much dangerous fungi they can ignore some of the permanent side effects of Mad Cap Mushrooms, provided they have a constant supply. Night Goblins affected by Mad Cap overuse may ignore the resulting Stupidity, but only while under the effect of more Mad Caps. Once the model loses Frenzy, due to being Knocked Down or Stunned, it will be affected by stupidity as normal.",
            ["Stupidity", "Frenzy", "Stunned", "Knocked Down"],
        ),
        timing: ["12"]
    },
    { name: "Da Biggest Boss", rules: "The Boss is so big, compared to other Night Goblins that is, that they may choose Strength skills. If the Boss dies, the promoted leader will gain this rule. No other member of the warband except the current leader may ever use Strength skills", timing: ["12"] },
    {
        name: "Handle Animal - Squig",
        rules: createSpecialRuleText("Any Cave Squig within 6\” (12\” with a Squig Prodder) of the herder can use their Leadership value when taking Leadership tests.",
            ["Leadership"],
        ),
        timing: ["2", "9"]
    },
    {
        name: "Master Herder",
        rules: createSpecialRuleText("During the recovery phase, any out of control Cave Squigs or Great Squigs in the herder's control range (6\”, or 12\” with a Squig Prodder) will stop running amok, and may be controlled normally, if the Herder can pass a Leadership test.",
            ["Leadership"],
        ),
        timing: ["2"]
    },
    { name: "Squig Herder Trained", rules: "12", timing: ["Squig Herder must have Trainin Skill to able to purchase this squig."] },
    {
        name: "Fungus Brew", rules: createRuleTable(
            "Before a battle, the Shaman may brew a special batch of Fungus Brew using 1 to 3 Mad Cap Mushrooms, and various other fungi they have collected. The brew must be consumed immediately, and affects a single Night Goblin Warrior henchmen group until the end of the battle. Roll on the Fungus Brew Table once for each Mad Cap Mushroom used in the brewing process. If any of the dice come up with the same result, the batch is ruined and provides no effect other than a nasty headache!",
            ["D6", "Result"],
            [
                {
                    cells: ["1", ""],
                    content: createSpecialRuleText("Rowdy: Affected by Animosity on a 1 or 2.", ["Animosity"]),
                    border: true
                },
                {
                    cells: ["2", ""],
                    content: createSpecialRuleText("Dizzy: -1 Initiative Test.", ["Initiative Test"]),
                    border: true
                },
                {
                    cells: ["3", ""],
                    content: createSpecialRuleText("Fearless: Immune to Fear and All-Alone tests.", ["Fear", "All-Alone"]),
                    border: true
                },
                {
                    cells: ["4", ""],
                    content: "Numbed: +1 Save which may not be reduced below 6+.",
                    border: true
                },
                {
                    cells: ["5", ""],
                    content: createSpecialRuleText("Belligerent: Hatred against the opposing warband(s).", ["Hatred"]),
                    border: true
                },
                {
                    cells: ["6", ""],
                    content: createSpecialRuleText("Loony: Frenzy, followed by Stupidity if it wears off by a Goblin being Knocked Down or Stunned.", ["Frenzy", "Stupidity", "Knocked Down", "Stunned"]),
                    border: false
                }
            ]
        ),
        timing: ["1"]
    },
    { name: "Loony", rules: "Fanatics are so far gone from reality that they are not subject to the rules for Animosity. Fanatics must re-roll results of Lad's Got Talent.", timing: ["13"] },
    { name: "Just Squigs", rules: "Squigs only count as a half a model for Rout test purposes.", timing: ["2"] },
    { name: "Night Goblin Web Snotling Mob", rules: "All Snotlings in a warband count as one model for warband size.", timing: ["2"] },
    { name: "Night Goblin Web Dodgy", rules: "All hits from shooting or hand-to-hand suffer -1 to hit against Snotlings.", timing: ["8", "9"] },
    { name: "Night Goblin Web Insignificant", rules: "Nobody cares about the Snotlings. All Snotlings in the warband count as 1 model for rout tests purposes and warband maintenance costs. Each Snotling is worth half an experience point, rounded down at the end of the battle. Snotlings may be ignored for shooting priority purposes. Snotlings never gain experience, they usually don't last long enough, and if they do they're too stupid to learn anything of value!", timing: ["2", "13"] },
    { name: "Wild", rules: "A Great Squig will need a Goblin to keep it in line, just like a Cave Squig. In addition, due to the ferocity of these beasts, if the scatter die results in a \“hit\” for a wild Great Squig it moves towards the closest model (friend or foe) it can see. If this movement takes it into contact with another model it will engage it in close combat and count as charging, even with a member of the Night Goblin warband.", timing: ["4"] },
    {
        name: "Strategic Minded",
        rules: createSpecialRuleText("A Nipponese warband must rely on its battlefield experience so far from home. They may choose to Rout after suffering 1 fewer casualty than normal",
            ["Rout"],
        ),
        timing: ["2"]
    },
    { name: "Tenants of the Order", rules: "The Order of the Vim-To strictly enforces a vow of Poverty, meaning with the exception of a walking staff (club) and a dagger the Vim-To Mage may never have any equipment.", timing: ["12"] },
    { name: "Shinobi Loner", rules: "Shinobi may never become the leader of the warband.", timing: ["13"] },
    { name: "Wall of Steel", rules: "Even the most lowly of Ashigaru is a veteran of hours of drill, and because of this If wielding a spear you may choose to wield it two-handed, in which case the spear gains the parry special rule.", timing: ["9"] },
    { name: "Wardens of the Castle", rules: "Traditionally responsible for the defense of the homeland while the men are at war, the onnabushi have gained a gruesome reputation for urban warfare, while inside buildings or ruins., then gain the fear ability. It's a good idea to define which bits of your terrain collection count as 'buildings or ruins' at the start of a battle to avoid confusion later.", timing: ["5", "9"] },
    { name: "Forest Walk", rules: "Wood elves move through forest and woods terrain without penalty.", timing: ["4"] },
    { name: "Subtle Nature", rules: "Wood elves specialize in being cunning and elusive. They dislike the loud and smelly elements of black powder weapons; therefore, they will never use them. Also, wood elves will never wear heavy armor of any type except Ithilmar", timing: ["12"] },
    { name: "Clandestine", rules: "Wood elves are unusually secretive about their activities; therefore, they will never hire any Hired Swords, or Dramatis Personae that are not elven.", timing: ["13"] },
    { name: "Long Lived", rules: "The first time any Wood Elf henchman rolls \"The Lad\'s Got Talent\", you must re-roll the dice. The second roll stands (even if you roll \"The Lad\'s Got Talent\" again). This represents the fact that elves must do much more than a member of the \"lesser\" races to gain the respect of their commander and comrades. Any later results of \"The Lad\'s Got Talent\" count as normal; only the first result rolled for each henchmen group must be re-rolled", timing: ["13"] },
    {
        name: "Beast Empathy",
        rules: createSpecialRuleText("If your warband includes a wild hunter, you may purchase up 0-3 of allowed beast companions in the henchmen/Equipment list. Any beast purchased from this list may use the wild hunter’s Leadership value for tests if within 6\"",
            ["Leadership"],
        ),
        timing: ["12"]
    },
    { name: "Talismanic Tattoos", rules: "Wardancers have a 6+ armor save that can never be modified. They also ignore spells that target/affect them on a D6 roll of 6+", timing: ["8", "9"] },
    {
        name: "Nimble Fighters",
        rules: createSpecialRuleText("Wardancers may always attempt to Parry regardless of the weapon type they use. If they are using a sword as a weapon, then they may re-roll failed parries as if armed with a buckler and sword. No further benefit when using two swords.",
            ["Parry"],
        ),
        timing: ["9"]
    },
    { name: "Beast Companion", rules: "May only be included if your warband has a Wild Hunter.", timing: ["12"] },
    { name: "Pack Sense", rules: "If one or more wolves are in base contact with the same opponent as the Wild Hunter, then the Wolfhound gets a +1 to his \“To hit\” rolls against that opponent. This bonus is not cumulative if more than one wolf is in base contact", timing: ["9"] },
    {
        name: "Pounce",
        rules: createSpecialRuleText("If a hunting cat performs a Charge against an opponent and hits with both attacks, regardless if any wounds were inflicted, the target must pass a strength test or be \“Knocked Down\”. This ability has no effect on large targets",
            ["Charge"],
        ),
        timing: ["4", "9"]
    },
    { name: "Barkskin", rules: "A Wood Spirit has a 4+ armor save.", timing: ["8", "9"] },
    { name: "Vulnerable to Fire", rules: "A Wood Spirit receives double wounds from fire attacks", timing: ["8", "9"] },
    { name: "Elemental", rules: "The Wood Spirit is an elemental force summoned to serve and protect the Asrai. It has a primal mentality and purpose, therefore it gains experience at half rate and is incapable of ever becoming a hero.", timing: ["13"] },
    {
        name: "Habituation", rules: createSpecialRuleText("Human members of a Lahmia warband are immune to Fear caused by types of undead in their own warband, i.e: skeletons, wights and vampires. Other types of undead cause fear as normal.",
            ["Fear"],
        ),
        timing: ["4", "9"]
    },
    {
        name: "Lahmian Devoted", rules: createSpecialRuleText("The beloved is completely enraptured by the Lahmia. If she is knocked down in close combat (i.e: rolls a stunned or knocked down result on the injuries chart) the Beloved will become Frenzy and immediately take the most direct route to her aid, attacking any model within 2\" either side of a direct line to the Lahmia. If the vampire is taken out of action, the Beloved will immediately have Hatred towards the model who did the damage and attempt to kill them at the earliest opportunity. The beloved will remain frenzied until the hated enemy is slain.",
            ["Frenzy", "Hatred"],
        ),
        timing: ["4", "9"]
    },
    { name: "Demi-Vampires", rules: "If the warband's Lahmia is killed, the Blood Sister may take her place. At her next advance she will become a vampire on a roll of 4+ on a d6. This counts instead of the advance. The blood Sister retains her existing skills and experience but the usual rules for undead apply immediately and her maximum stats become those of a vampire. If the Blood Sister fails to transform, roll again at her next and all subsequent advances. Once a Blood Sister has become a vampire a new Blood Sister may be recruited into the warband after the next game.", timing: ["13"] },
    { name: "Wight weapons", rules: "Wights maintain their own existence by draining the energy of the living, and their weapons are enchanted to achieve this. When rolling to wound a wight will cause a critical hit on 5+.", timing: ["9"] },
    { name: "Pack Attack", rules: "A lone Jackal is not particularly dangerous, but a pack can be deadly. If two or more jackals attack the same model then all jackals attacking that model gain an extra attack.", timing: ["9"] },
    { name: "Local Knowledge", rules: "A Khemrian Lahmia warband which contains a vampire may reroll one dice in the exploration phase.", timing: ["13"] },
    { name: "Lahmian Favoured", rules: "If the Lahmia's Beloved is killed, she may choose one of her Thralls to replace him by granting him the Blood Kiss at his next advance. If this option is taken the Thralls' leadership is increased to 8 if not already so and he takes the place of the Beloved in the warband's roster. The Thrall's elevation to Beloved counts instead of any advance he may be entitled to. A new Thrall may be recruited after the warband's next battle.", timing: ["13"] },
    { name: "Mercenaries (Ostermark)", rules: "Ostermarkers (Heroes and Henchmen) may re-roll a failed Leadership Test for being All-Alone and Routing. A warrior or warband must accept the second roll, however, regardless of the result.", timing: ["2"] },
    { name: "Ostermarker Wardog", rules: "Any captain of an Ostermarker warband may have a wardog as part of his starting equipment", timing: ["12"] },
    { name: "Skryre Special Equipment", rules: "The Warlocks of Clan Skryre often produce peculiar and powerful weapons for the use of their armies and warbands. Unfortunately for the Skaven, this equipment requires a great deal of maintenance in order to remain operational.<br><br>Consequently, a Clan Skryre warband must have Apprentices in order to use any of this equipment (jezzails, warpfire throwers, warplock pistols and poison wind globes).<br><br>If the warband does not have any Apprentices, then none of this equipment may be included in it. The exception is the Warlock Engineer - he may always purchase equipment for his use only, even if the warband contains no Apprentices.", timing: ["12"] },
    { name: "Trainees", rules: "Warlock Apprentices are (funnily enough) the apprentices of the Warlock Engineer, and are being trained in the ways of Clan Skryre. As such, they do not begin with any spells, but when they roll a new skill as an experience advance, they may choose to take a randomly determined spell rather than a normal skill.", timing: ["12"] },
    { name: "Inexperienced", rules: "All spells cast by a Warlock Apprentice count as +1 difficulty.", timing: ["7"] },
    { name: "Clan Skryre The Lads Got Talent", rules: "If an Initiate group rolls ‘the lad’s got talent’ as an experience advance, he has been singled out by the Warlock Engineer as capable of learning the arts of magic. He must chose spells as one of his two skill lists, and from this point forward all rules for Apprentices will apply to the newly promoted Initiate.", timing: ["13"] },
    { name: "Expected to Die", rules: "When testing to see if a Skaven warband needs to take a Rout test, each Slave taken out of action counts as half a model.<br><br>Therefore, a band of 10 slaves and 6 other skaven (16 models) would only have to take a test if 4 models fell (8 slaves or 4 other skaven, or some combination thereof).", timing: ["2"] },
    { name: "Doomed", rules: "Slaves have only two things to look forward to: a hard life with long working days, and constant abuse. If the slave becomes ever becomes a hero, (i.e. he rolls the \"the lad's got talent\" advance) he is quickly executed by the warband’s leader, who fears an uprising. This happens regardless of whether or not you have a full quota of heroes. Remove the unfortunate Slave from your roster and roll for an advance again if the Slave had other members in his henchmen group.", timing: ["13"] },
    { name: "Excellent Eyes", rules: createSpecialRuleText("When spotting Hiding enemy units, add +2 to the distance they can spot them.", ["Hiding"],), timing: ["4", "7"] },
    { name: "Look Rich", rules: "High elves pay double upkeep for any hired swords that are not Elven, because humans tend to think that elves are rich. They may not hire any hired swords that are not elven or human, and they may not hire any Dark Elves. Neither may they hire a witch.", timing: ["12"] },
    { name: "Fine Craftwork", rules: "High elves may not use any heavy armours except for Ithilmar armour. However, should they get their hands on a magical armour, they may use it nevertheless as the craftwork is so great.", timing: ["12"] },
    { name: "Honours", rules: "Each High Elf Hero may have one honour upon purchase. They may only be given one honour and cannot attain new ones during the campaign<br><br>Honors can be found in the equipment select section.", timing: ["12"] },
    { name: "Honourable", rules: "Lothern Sea Patrol members may never use poisons or drugs, nor hire any Hired Swords who use them.", timing: ["12"] },
    { name: "Teetotalers", rules: "Lothern Sea Patrol members may never drink any alcohol, with the exception of Elf Wine", timing: ["12"] },
    { name: "Swabbies", rules: " Lothern Sea Patrol may capture Swabbies. Willing members join the Ship’s Company, unwilling members join the Raw Recruits.", timing: ["12"] },
    { name: "Disciplined", rules: "Any warrior within 3\" of a Bossun may use his/her leadership instead of their own.", timing: ["2", "9"] },
    { name: "Spear Master", rules: "In the first round of combat, when using a spear, a Seaguard adds +1 to his strength and may reroll one failed roll to hit.", timing: ["9"] },
    { name: "Hide in shadows", rules: createSpecialRuleText("When trying to spot a Hiding Sea Ranger an opponent must halve his initative.", ["Hiding"],), timing: ["5", "8"] },
    { name: "Specially Hired", rules: "You may hire Raw Recruits like normal, but you may also acquire them in the same manner as Swabbies", timing: ["13"] },
    { name: "Lothern Rabble", rules: "Raw Recruits do not need to be armed all the same. Each may be given different equipment, but only items listed in the Raw Recruits equipment list. Raw Recruits can never use magic, or cast spells of any sort, no matter their original background or abilities.", timing: ["1"] },
    {
        name: "Oh dear, they got away",
        rules: createSpecialRuleText(
            "If the Sea Guard Warband itself Rout, any Raw Recruits who have already left the table in previous turns are presumed to have made a successful escape, and are never seen from again. Remove them from your warband roster as if they had been killed.",
            ["Rout"]
        ),
        timing: ["13"]
    },
    {
        name: "Dont mind them, they arent true elves",
        rules: createSpecialRuleText(
            "The rest of the crew barely notice if any Raw Recruits run away or go Out of Action – they know they’ll find them later on and give them 30 lashes if they’re lucky! Any Raw Recruits who are running away or have been taken out of action do not count towards the need to take a Rout test for the warband.",
            ["Rout"]
        ),
        timing: ["2"]
    },
    { name: "", rules: "", timing: [""] },
    { name: "", rules: "", timing: [""] }












];


