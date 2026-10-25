// Helper function to create rule reference links
const createRuleReference = (ruleName) => {
    return `
        <span class="text-mordheim-gold hover:text-yellow-400 cursor-pointer inline-block" 
              onclick="window.showRuleModal('${ruleName}')"
              title="Click to view ${ruleName} rules"
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
            `<td class="py-2 px-4 text-slate-300 min-w-[60px]">${cell}</td>`
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

export const RULES = [
    {
        name: "Stupidity",
        rules: createRuleTable(
            "Models that are stupid test at the start of their turn to see if they overcome their stupidity. Make a test for each model affected by stupidity. If you pass the test by rolling their Leadership value or less on 2D6 then all is well – the creatures behave reasonably intelligently and the player may move and fight with them as normal.<br><br>If the test is failed all is not well. Until the start of his next turn (when it takes a new Stupidity test) the model will not cast spells or fight in hand-to-hand combat (though his opponent will still have to roll to hit him as normal)<br><br>If a model who fails a Stupidity test is not in hand-to-hand combat, roll a D6.",
            ["D6", "Results"],
            [
                {
                    cells: ["1-3", ""],
                    content: ["The warrior moves directly forward at half speed in a shambling manner. He will not charge an enemy (stop his movement 1\" away from any enemy he would have come into contact with). He can fall down from the edge of a sheer drop (see the Falling rules) or hit an obstacle, in which case he stops. The model will not shoot this turn."],
                    border: true
                },
                {
                    cells: ["4-6", ""],
                    content: ["The warrior stands inactive and drools a bit during this turn. He may do nothing else, as drooling is so demanding."],
                    border: false
                }
            ]
        )
    },
    {
        name: "Animosity",
        rules: createRuleTable(
            "Orcs and Goblins enjoy nothing more than a good scrap, unfortunately they’re not always very discerning about who they scrap with! To represent this, at the start of the Orc player’s turn, roll a D6 for each Henchman who is either an Orc or a Goblin. A roll of 1 means that the warrior has taken offense to something one of his mates has done or said. Do not roll for models that are engaged in hand-to-hand combat (they’re already scrappin’!). To find out just how offended the model is, roll another D6 and consult the following chart to see what happens:",
            ["D6", "Results"],
            [
                {
                    cells: ["1", ""],
                    title: "I 'Erd Dat!",
                    expandableContent: createSpecialRuleText("If there is a friendly Orc or Goblin Henchman or Hired Sword within Charge reach (if there are multiple targets within reach, choose the one nearest to the mad model), the offended warrior will immediately charge and fight a round of hand-to-hand combat against the source of his ire. At the end of this round of combat, the models will immediately move 1\" apart and no longer count as being in close combat (unless one of them fails another Animosity test and rolls this result again).<br><br>If there are no friendly Orc or Goblin Henchmen or Hired Swords within charge reach, and the warrior is armed with a missile weapon, he immediately takes a shot at the nearest friendly Orc or Goblin Henchman or Hired Sword. If none of the above applies, or if the nearest friendly model is an Orc Hero, the warrior behaves as if a 2-5 had been rolled on this chart. In any case, the warrior in question may take no other action this turn, though he may defend himself if attacked in hand-to-hand combat.", ["Charge"]),
                    border: true
                },
                {
                    cells: ["2-5", ""],
                    title: "Wud Yoo Say?",
                    expandableContent: "He may do nothing else this turn, though he may defend himself if attacked in hand-to-hand combat.",
                    border: true
                },
                {
                    cells: ["6", ""],
                    title: "I'll Show Yer!",
                    expandableContent: createSpecialRuleText("This model must move as quickly as possible towards the nearest enemy model, charging into combat if possible. If there are no enemy models within sight, the Orc or Goblin warrior may make a normal move immediately. This move is in addition to his regular move in the Movement phase, so he may therefore move twice in a single turn if you wish.<br><br>If the extra move takes the Orc or Goblin warrior within Charge reach of an enemy model, the warrior must charge into close combat during his regular movement.", ["Charge"]),
                    border: false
                }
            ]
        )
    },
    {
        name: "Hatred",
        rules: createRuleTable(
            "Warriors who fight enemies they hate in hand-to-hand combat may re-roll any misses when they attack in the first turn of each hand-to-hand combat.<br><br>This bonus applies only in the first turn of each combat and represents the warrior venting his pent-up hatred on his foe.<br><br>After the initial round of hand-to-hand combat he loses some impetus and subsequently fights as normal for the rest of the combat.",
            [],
            []
        )
    },
    {
        name: "Cover",
        rules: createRuleTable(
            "The many walls, ruined buildings and other masonry in Mordheim offer plenty of cover. If any portion of the target is hidden by a piece of scenery or another model, the shooting model will suffer a penalty as explained below.<br><br>Sometimes it will be obvious whether a target can be seen; at other times it will be more difficult, as buildings and other scenery are in the way. If the shooter can see only part of the target’s body, the target is in cover and the shooter suffers a -1 penalty on his To Hit roll.<br><br>If a shot misses its target by 1, and that target claimed the -1 modifier for cover, then the shot strikes the cover instead. Normally this doesn’t matter, but in the case where a model is concealed behind another warrior, or when the cover is a powder keg, it might be extremely important!",
            [],
            []
        )
    },
    {
        name: "Frenzy",
        rules: createRuleTable(
            createSpecialRuleText("Frenzied models must always Charge if there are any enemy models within charge range (check after charges have been declared). The player has no choice in this matter – the warrior will automatically declare a charge.<br><br>Frenzied warriors fight with double their Attacks characteristic in hand-to-hand combat. Warriors with 1 Attack therefore have 2 Attacks, warriors with 2 Attacks have 4, etc. If a warrior is carrying a weapon in each hand, he receives +1 Attack for this as normal. This extra Attack is not doubled.<br><br>Once they are within charge range, frenzied warriors are immune to all other psychology, such as fear and don’t have to take these tests as long as they remain within charge range.<br><br>If a frenzied model is knocked down or stunned, he is no longer frenzied. He continues to fight as normal for the rest of the battle.",
                ["Fear", "Knocked Down", "Stunned", "Charge"]
            ),
            [],
            []
        )
    },
    {
        name: "Goading",
        rules: createRuleTable(
            "Goading shares some similarities with Spellcasting, but does not function in quite the same way. Goading attempts are made at the very beginning of the Moulder turn, before any movement takes place. The Packmaster and his Apprentices can each attempt to Goad any single model or henchman group of beasts — those being Giant Rats, Wolf Rats, or Rat Ogres — from their own Warband who are within 6\" of them when the turn begins. Note that in order to Goad a henchman group, at least half of its members must be within 6\".<br><br>To do so, they must pass a difficulty check in the same manner as if they were attempting to cast a spell or prayer, i.e., they must roll equal to or greater than the Difficulty rating on 2D6 to succeed, the difference being that the level of difficulty is determined by what type of creature they are attempting to Goad:<br>Giant Rat – Difficulty 6<br>Wolf Rat – Difficulty 8<br>Rat Ogre – Difficulty 10<br><br>If the test is successful, roll a D6 and consult the table below — note that in the event the test is passed with a roll of double 6s, you may instead select which effect is applied rather than rolling. If the Difficulty check is failed however, the beast or group which was the target of the Goading attempt has become confused and must immediately take a Stupidity test as described in the Mordheim Rulebook — in the event that the test is failed with a roll of double 1s, the beast or group instead become enraged and turn on their erstwhile master, immediately move them into base contact with the character who attempted to Goad and resolve a single attack against him from each of however many beasts he was targeting — the beast or group returns to the Moulder player's control at the beginning of his next turn.",
            ["D6", "Results"],
            [
                {
                    cells: ["1-2", ""],
                    title: "Yelp",
                    expandableContent: "The beast or group must run during the Movement phase, may do so at up to triple normal movement rather than double, and will do so even if there are enemy models within 8\" when they begin the move.",
                    border: true
                },
                {
                    cells: ["3-4", ""],
                    title: "Growl",
                    expandableContent: createSpecialRuleText("If an enemy is within Line of Sight of the beast or group, they must attempt to Charge it (if there are multiple enemies in LoS, the Moulder player may choose which is the target/s), and will do so at triple their normal movement rather than double. All the normal rules for charges apply, save that the beast/s are moving so rapidly they cannot be Intercepted.", ["Charge"]),
                    border: true
                },
                {
                    cells: ["5-6", ""],
                    title: "Roar!",
                    expandableContent: createSpecialRuleText("The beast or group are considered subject to Frenzy and Hatred (of all models in the opposing warband) until the beginning of the next Moulder turn.", ["Frenzy", "Hatred"]),
                    border: false
                }
            ]
        )
    },
    {
        name: "Fear",
        rules: createRuleTable(
            createSpecialRuleText("A model must take a fear test (ie, test against his Leadership) in the following situations. Note that creatures that cause fear can ignore these tests.<br><br><b>If the model is charged by a warrior or a creature which causes fear.</b><br><br>If a warrior is charged by an enemy that he fears then he must take a test to overcome that fear. Test when the Charge is declared and is determined to be within range. If the test is passed the model may fight as normal. If it is failed, the model must roll 6s to score hits in that round of combat.<br><br><b>If the model wishes to charge a fear-causing enemy.</b><br><br>If a warrior wishes to charge an enemy that it fears then it must take a test to overcome this. If it fails the model may not charge and must remain stationary for the turn. Treat this as a failed charge.",
                ["Charge", "Leadership"]),
            [],
            []
        )
    },
    {
        name: "All-Alone",
        rules: createRuleTable(
            createSpecialRuleText("If your warrior is fighting alone against two or more opponents, and there are no friendly models within 6\" (Knocked Down, Stunned or fleeing friends do not count), he must make a test at the end of his combat phase. The test is taken against the model’s Leadership on 2D6. If the warrior scores equal to or under his Leadership his nerve holds. If the score is greater than his Leadership, the warrior breaks from combat and runs. Each one of his opponents may make one automatic hit against him as he turns to run. If the model survives, he runs 2D6\" directly away from his enemies.<br><br>At the start of each of his turns, the warrior must take another Leadership test. If he passes, he stops but can do nothing else during his own turn except cast spells. If he fails or has someone Charge him, he runs 2D6\" towards the nearest table edge, avoiding any enemy models. If he reaches the table edge before he has managed to recover his nerves, he is removed from combat.<br><br>If a warrior is charged while he is fleeing, the charger is moved into base contact as normal, but the fleeing warrior will then run a further 2D6\" towards the table edge, before any blows can be struck.",
                ["Knocked Down", "Stunned", "Charge", "Leadership"]
            ),
            [],
            []
        )
    },
    {
        name: "Rout",
        rules: createRuleTable(
            "A player must make a Rout test at the start of his turn if a quarter (25%) or more of his warband is out of action. For example, in a warband that has twelve warriors a test is needed if three or more are out of action. Even warbands who are normally immune to psychology (such as Undead) must make Rout tests.<br><br>If the Rout test is failed, the warband automatically loses the fight. The game ends immediately and surviving warriors retreat from the area. A failed Rout test is the most common way in which a fight ends.<br><br>To take a Rout test roll 2D6. If the score is equal to or less than the warband leader’s Leadership, the player has passed the test and may continue to fight.<br><br>If the warband’s leader is out of action or stunned, then the player may not use his Leadership to take the test. Instead, use the highest Leadership characteristic amongst any remaining fighters who are not stunned or out of action.<br><br><b>voluntary rout</b><br><br>A player may choose to voluntarily Rout at the start of any of his own turns if he wishes, but only if he was already required to take a Rout test or if a quarter (25%) or more of his warband are out of action.",
            [],
            []
        )
    },
    {
        name: "Casting Spells",
        rules: createRuleTable(
            "Spells are cast in the shooting phase, and can be used even if the caster is in hand-to-hand combat. To use a spell, the wizard must roll equal to or greater than the spell’s Difficulty score on 2D6. If he fails, he may not cast a spell that turn. If the test is passed the spell may be used as described overleaf. A wizard may cast one spell per turn and may not use missile weapons if he wants to cast a spell. He can however run!<br><br>A wizard may not use magic if he is wearing armour or has a shield or buckler. The only exception is the Prayers of Sigmar. Sisters of Sigmar and Warrior Priests may wear armour and use their prayers.",
            [],
            []
        )
    },
    {
        name: "Leader",
        rules: createRuleTable(
            "A warrior within 6\" of his leader may use his leader’s Leadership value when taking Leadership tests. This represents the leader’s ability to encourage his warriors and push them beyond normal limits.<br><br>A leader cannot confer this bonus if he is knocked down, stunned or fleeing himself. The sight of your leader running for cover is obviously far from encouraging!",
            [],
            []
        )
    },
    {
        name: "Leadership",
        rules: createRuleTable(
            "Tests against the Leadership characteristic are done in a slightly different way. In the case of a Leadership test, you should roll two dice and add the two scores together. If the result is equal to or less than the model’s Leadership characteristic, the test has been passed.",
            [],
            []
        )
    },
    {
        name: "Falling",
        rules: createRuleTable(
            "A model that falls takes D3 hits at a Strength equal to the height in inches that it fell (eg, if the model fell 4\", it would take D3 hits at Strength 4). No armour saves apply. Falling will not cause critical hits. A model that falls may not move any further or hide during that turn, even if it is not hurt.",
            [],
            []
        )
    },
    {
        name: "Diving Charge",
        rules: createRuleTable(
            createSpecialRuleText("You may Charge any enemy troops that are below a balcony or overhang, etc, that your model is on. If an enemy model is within 2\" of the place where your warrior lands, he may make a diving charge against it. Take an Initiative Test for each full 2\" of height your model jumped down from, up to a maximum of 6\", like a normal jump. If he fails any of them, your model has fallen and suffers Falling damage, may not move any more during the movement phase and cannot charge the enemy. If he succeeds, the model gains a +1 Strength bonus and +1 to hit bonus but only during the following hand-to-hand combat phase.", ["Falling", "Initiative Test", "Charge"]),
            [],
            []
        )
    },
    {
        name: "Jump Over Gaps",
        rules: createRuleTable(
            createSpecialRuleText("Models may jump over gaps (up to a maximum of 3\") and streets, (eg, from the roof of a building to another). Deduct the distance jumped from the model’s movement but remember that you cannot measure the distance before jumping. If your model does not have enough movement to jump the distance, he automatically falls. If your model is able to cover the distance, he must pass an Initiative test or fall. A model may jump over a gap and still fire a missile weapon if it is not running. It may also jump as part of its charge or running move.", ["Falling", "Initiative Test", "Charge"]),
            [],
            []
        )
    },
    {
        name: "Charge",
        rules: createRuleTable(
            createSpecialRuleText("If you want a model to engage the enemy in hand-to-hand combat then you must make a special move called a charge. Without measuring the distance, declare that your model is charging and indicate which enemy model he is going to attack.<br><br>You can charge any opposing model if you can draw an unobstructed line from your model to the target. If your warrior wants to charge an enemy model within 4\" that he can’t see (eg, because it is behind a corner) but has not been declared as hidden, he must pass an Initiative test to detect it. If he fails the roll, your model may not charge this turn, but may move his normal distance, shoot and cast spells.<br><br>A charge is like a running move, performed at double the Movement rate, but ends with the attacker moving by the most direct route into base-to-base contact with the enemy model. Once their bases are touching they are engaged in hand-to-hand combat. Models are also considered to be in hand-to-hand combat even when separated by a low wall or obstacle, where it is impossible for the bases to touch physically because the obstacle is in the way.<br><br>If an unengaged (ie, not in hand-to-hand combat) enemy model lies within 2\" of the charge route, that model may choose to Intercept the charger if he wishes. <br><br>Sometimes a charging warrior may not reach the enemy because you have miscalculated the distance. If this happens move your warrior his normal move distance towards the enemy. This is called a failed charge. The model cannot shoot in the same turn in which he failed a charge, but he can cast spells as normal.<br><br>Models cannot be moved into hand-to-hand combat except by charging – any move that brings a warrior into hand-to-hand combat is a charge by definition. A model that charges will ‘strike first’ in the first round of the ensuing combat.", ["Intercept"]),
            [],
            []
        )
    },
    {
        name: "Intercept",
        rules: createRuleTable(
            createSpecialRuleText("Only one enemy model may attempt to intercept each charger.<br><br>If the intercepting warrior would normally require a fear test to engage the charger then he must pass one in order to be allowed to intercept. Failure means he will not move. If the intercepting warrior causes fear then move the models into contact and then take a Fear test for the original charger (assuming he would normally do so) as if he was the one being charged. Regardless of the results of this test it is still the original charger who counts as charging in the subsequent round of combat, not the intercepting warrior.", ["Fear"]),
            [],
            []
        )
    },
    {
        name: "Initiative Test",
        rules: createRuleTable(
            "Often in the game a model will be required to take a test on one of his own characteristics. In order to pass this test, the model has to roll a D6 and obtain a result equal to or lower than the value of the characteristic involved. Note that if you roll a 6, you automatically fail the test regardless of the model’s characteristic value.",
            [],
            []
        )
    },
    {
        name: "Hiding",
        rules: createRuleTable(
            createSpecialRuleText("The Hiding rule represents warriors concealing themselves in a way that our unmoving and dramatically posed models cannot. A hiding warrior keeps as still as possible, just peeking out of cover.<br><br>A model can hide if he ends his move behind a low wall, a column or in a similar position where he could reasonably conceal himself. The player must declare that the warrior is hiding and place a Hidden counter beside the model for it to count as being hidden.<br><br>A model that runs, flees, is Stunned or performs a Charge cannot hide that turn. His sudden burst of speed does not give him time to hide.<br><br>A model may stay hidden over several turns, so long as he stays behind a wall or similar feature. He may even move around so long as he stays hidden while doing so. If an enemy moves so that he can see the hidden warrior, the model is no longer hidden and the counter is removed.<br><br>When hidden, a warrior cannot be seen, shot at or charged.<br><br>While hiding, a model cannot shoot or cast spells without giving away its position. If a hidden model shoots, or moves so that he can be seen, he is no longer hidden and can be shot at as normal.<br><br>A model may not hide if he is too close to an enemy model – he will be seen or heard no matter how well concealed. Enemy warriors will always see, hear or otherwise detect hidden foes within their Initiative value in inches. So a warrior whose Initiative value is 3 will automatically spot all hidden enemies within 3\".",
                ["Stunned", "Charge"],
            ),
            [],
            []
        )
    },
    {
        name: "Strike First",
        rules: createRuleTable(
            createSpecialRuleText("Sometimes a model will be allowed to ‘strike first’ for some reason. Most commonly this is because they did a Charge in that turn, but some equipment, skills and spells produce the same effect. If only one model ‘strikes first’ then it does so and the remainder of the combatants strike in Initiative order as described above.<br><br>If there are several models who are each entitled to ‘strike first’, then they determine the order of combat between themselves by Initiative. Once all those that were eligible to ‘strike first’ have fought, any other combatants fight in Initiative order.", ["Charge"]),
            [],
            []
        )
    },
    {
        name: "Parry",
        rules: createRuleTable(
            "Bucklers are small shields which offer no increase to the armour saving throw, but allow you to parry attacks. Swords are also used to parry enemy attacks.<br><br>When an opponent scores a hit, warriors equipped with bucklers or swords may try to parry the blow.<br><br>Roll a D6. If the score is higher than the number your opponent rolled to hit, the buckler or sword has parried the strike. Note that it is therefore impossible to parry a blow which scored a 6 on the roll to hit.<br><br>A buckler or sword may only parry one blow per hand-to-hand combat phase. A parried blow is ignored and has no effect. If your opponent scored several hits, you will have to try to beat the highest score (if the highest score is a 6, you automatically lose the chance of parrying that opponent’s attacks). If a model is fighting against several opponents, it may only parry the strike from the enemy who makes the first hit(s) (ie, the attacking model with the highest Initiative). In the case of equal Initiative characteristics roll a dice to decide who strikes first.<br><br>If your model is armed with a buckler and a sword, you may re-roll any failed parries once. A model armed with two swords can still only roll once.<br><br>A model may not parry attacks made with twice (or more) his own basic Strength – they are simply too powerful to be stopped.",
            [],
            []
        )
    },
    {
        name: "Knocked Down",
        rules: createRuleTable(
            "Knocked down models may crawl 2\" during the movement phase, but may not fight in hand-to-hand combat, shoot or cast spells. If he is in base-to-base contact with an enemy, a knocked down model can crawl 2\" away only if the enemy is engaged in hand-to-hand combat with another opponent, otherwise he has to stay where he is. In combat he cannot strike back and the enemy will have a good chance of putting him out of action.<br><br>A warrior who has been knocked down may stand up at the start of his next turn. In that turn he may move at half rate, shoot and cast spells, he cannot Charge or run. If he is engaged in hand-to-hand combat, he may not move away and will automatically strike last, irrespective of weapons or Initiative.<br><br>If an enemy is fighting a warrior who is knocked down, he may attack him to put him out of his misery. All attacks against a warrior who is knocked down hit automatically. If any of the attacks wound the knocked down model and he fails his armour save, he is automatically taken out of action as explained previously. A knocked down model may not parry.",
            [],
            []
        )
    },
    {
        name: "Stunned",
        rules: createRuleTable(
            createSpecialRuleText("A fighter who is stunned may do nothing at all. A player may turn the model face up in the next recovery phase, and the warrior is then treated as Knocked Down.<br><br>A stunned warrior is at the mercy of his enemies. A stunned model is automatically taken out of action if an enemy can attack him in hand-to-hand combat.",
                ["Knocked Down"]
            ),
            [],
            []
        )
    },
    {
        name: "Out of Control",
        rules: createRuleTable(
            "For Wagons that need to roll Out of Control",
            ["D6", "Results"],
            [
                {
                    cells: ["1-3", ""],
                    title: "Swerve",
                    expandableContent: "The driver temporarily loses control and the wagon veers wildly off course. Roll a D6:<br><br>1-3 - Swerves 45 degrees to the left.<br>4-6 - Swerves 45 degrees to the right.<br><br>The wagon then moves another 6\" in the predetermined direction.",
                    border: true
                },
                {
                    cells: ["4-5", ""],
                    title: "Runaway",
                    expandableContent: createSpecialRuleText("The steeds bolt and the driver loses control of them. Each turn randomly determine the direction that the wagon goes in. Roll a D6:<br><br>1-2 - Swerves 45 degrees to the left.<br>3-4 - Swerves 45 degrees to the right.<br>5-6 - Moves straight forward.<br><br>The wagon will always move at full speed and roll for applying the lash discounting the effects of a 1 all the time it is a runaway. Each turn the driver may attempt to take control of the steeds. The driver must pass a Leadership test to regain control of the beasts. The crew may not fire missile weapons all the time the wagon is a runaway as they are trying to hold on for dear life.", ["Leadership"]),
                    border: true
                },
                {
                    cells: ["6", ""],
                    title: "Loss of Control",
                    expandableContent: "The wagon goes wildly out of control. Roll a D6:<br><br> 1 - The wagon swerves to the right 45 degrees.<br><br>2 - The wagon swerves to the left 45 degrees.<br><br>3-4 - The wagon comes to an immediate halt.<br><br>5 - The wagon’s yoke pole snaps and the draft animals gallop off. The vehicle moves 6\" straight ahead and then comes to a halt. The vehicle may no longer move.<br><br>6 - The wagon either jack-knifes or hits a rock or a depression in the road and goes into a roll! The wagon moves D6\" in a random direction determined by the Artillery Scatter dice. Any warriors/beasts it collides with take the usual collision damage. All the crew and draft animals take D3 Strength 4 hits. The wagon is now wrecked.",
                    border: false
                }
            ]
        )
    },
    {
        name: "Whoa Boy",
        rules: createRuleTable(
            "If a mounted warrior has lost his last wound, then the player must roll on the Whoa Boy! table. This replaces the normal Injuries chart. If critical hits are suffered, then roll as many times as is required, taking the most serious result.",
            ["D6", "Results"],
            [
                {
                    cells: ["1-2", ""],
                    content: "The rider is temporarily disorientated and his mount rears up. The rider keeps his seat but must spend his next turn stationary regaining control, unable to move or shoot. If attacked, treat the rider as fallen down.",
                    border: true
                },
                {
                    cells: ["3-4", ""],
                    content: "The rider falls off his mount and is stunned, taking an additional S2 hit in the process with no Armour save. In addition, roll a D6: on a roll of 1-3, the mount immediately bolts 3D6\" in a random direction and continues until it has left the table – the mount may be recovered after the battle; on a roll of 4-6, the mount remains stationary and the warrior may remount once recovered. Note: the mount does not count as unridden or un-led in this instance.",
                    border: true
                },
                {
                    cells: ["5-6", ""],
                    content: "The rider and his mount crash to the ground together. Both the rider and the mount are automatically out of action. In addition, roll a D6: on a roll of 1-2, the mount lands on top of its rider, crushing him. the warrior must roll twice on the Serious Injuries chart after the battle. In addition, after the battle roll a D6: on a roll of 1-2 the mount was crippled or killed by the fall and is removed from the warband roster.",
                    border: false
                }
            ]
        )
    },
    {
        name: "Armour Save Modifiers",
        rules: createRuleTable(
            "Some models are so powerful that armour provides less protection against them.<br><br>The higher a creature’s Strength the more easily it can pierce armour. The following chart shows the reduction in the enemy’s armour saving throw caused by the attacker’s Strength.",
            ["Strength", "Save Modifier"],
            [
                {
                    cells: ["1-3", ""],
                    content: ["None"],
                    border: true
                },
                {
                    cells: ["4", ""],
                    content: ["-1"],
                    border: true
                },
                {
                    cells: ["5", ""],
                    content: ["-2"],
                    border: true
                },
                {
                    cells: ["6", ""],
                    content: ["-3"],
                    border: true
                },
                {
                    cells: ["7", ""],
                    content: ["-4"],
                    border: true
                },
                {
                    cells: ["8", ""],
                    content: ["-5"],
                    border: true
                },
                {
                    cells: ["9+", ""],
                    content: ["-6"],
                    border: false
                }
            ]
        )
    },
]