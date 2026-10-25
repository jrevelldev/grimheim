export const EXPLORATION_CHARTS = {
    "exploration_chart": {
        name: "Exploration Chart",
        description: "Results from exploring the ruins of Mordheim",
        dice_requirements: [
            // DOUBLES
            {
                result: "Well",
                dice_requirement: { type: "exact", value: 1, count: 2 },
                description: "Two dice show 1",
                details: "Choose one of your Heroes and roll a D6. If the result is equal to or lower than his Toughness, he finds one shard of wyrdstone at the bottom of the well. If he fails, the Hero swallows tainted water and must miss the next game through sickness."
            },
            {
                result: "Shop",
                dice_requirement: { type: "exact", value: 2, count: 2 },
                description: "Two dice show 2",
                details: "After a thorough search you find loot worth D6 gc. If you roll a 1 you will also find a Lucky Charm."
            },
            {
                result: "Corpse",
                dice_requirement: { type: "exact", value: 3, count: 2 },
                description: "Two dice show 3",
                details: "You find a still-warm corpse.\n\nTo see what you find when you search the corpse, roll a D6:\n\nD6   | Result\n1-2  | D6 gc\n3    | Dagger\n4    | Axe\n5    | Sword\n6    | Suit of light armour"
            },
            {
                result: "Straggler",
                dice_requirement: { type: "exact", value: 4, count: 2 },
                description: "Two dice show 4",
                details: "Your warband encounters one of the survivors of Mordheim.\n\nSkaven warbands can sell the straggler to agents of Clan Eshin (who will use the man for food or slavery) and gain 2D6 gc.\n\nPossessed warbands can sacrifice the unfortunate individual for the glory of the Chaos gods. The leader of the warband will gain +1 Experience.\n\nUndead warbands can kill the man and gain a Zombie for no cost.\n\nAny other warband can interrogate the man and gain insight into the city. Next time you roll on the Exploration chart, roll one dice more than is usually allowed, and discard any one dice. (For example, if you have three Heroes, roll four dice and pick any three)."
            },
            {
                result: "Overturned Cart",
                dice_requirement: { type: "exact", value: 5, count: 2 },
                description: "Two dice show 5",
                details: "Roll a D6 to see what you find:\n\nD6   | Result\n1-2  | Mordheim Map (see Equipment)\n3-4  | A purse with 2D6 gc\n5-6  | Jewelled sword and dagger. These can be kept or sold at twice the value of a normal sword and dagger, but note that the normal selling price is half the actual cost (see the Trading section for rules on selling items), so the jewelled sword will sell for 10gc, for instance."
            },
            {
                result: "Ruined Hovels",
                dice_requirement: { type: "exact", value: 6, count: 2 },
                description: "Two dice show 6",
                details: "You find loot worth D6 gc amidst the ruins."
            },
            // TRIPLES
            {
                result: "Tavern",
                dice_requirement: { type: "exact", value: 1, count: 3 },
                description: "Three dice show 1",
                details: "You could easily sell the barrels for a good price. Unfortunately your men are also interested in the contents! The warband's leader must take a Leadership test. If he passes, the warband gains 4D6 gc worth of wines and ales which can be sold immediately.\n\nIf he fails, the men drink most of the alcohol despite their leader's threats and curses. You have D6 gc worth of alcohol left when the warband reaches their encampment.\n\nUndead, Witch Hunter and Sisters of Sigmar warbands automatically pass this test, as they are not tempted by such worldly things as alcohol."
            },
            {
                result: "Smithy",
                dice_requirement: { type: "exact", value: 2, count: 3 },
                description: "Three dice show 2",
                details: "Roll a D6 to determine what you find inside:\n\nD6   | Result\n1    | Sword\n2    | Double-handed weapon\n3    | Flail\n4    | D3 Halberds\n5    | Lance\n6    | 2D6 gc worth of metal (add the value to your treasury)."
            },
            {
                result: "Prisoners",
                dice_requirement: { type: "exact", value: 3, count: 3 },
                description: "Three dice show 3",
                details: "Possessed warbands can sacrifice the victims (undoubtedly finishing the job of the captors). They gain D3 Experience which is distributed amongst the Heroes of the warband.\n\nUndead warbands can callously kill the prisoners and gain D3 Zombies at no cost.\n\nSkaven can sell the prisoners into slavery for 3D6 gc.\n\nOther warbands can escort the prisoners out of the city. For their trouble, they are rewarded with 2D6 gc. In addition, one of the prisoners decides he wishes to join the warband. If you can afford to equip the new recruit with weapons and armour, you may add a new Henchman to any of your human Henchman groups (with the same stats as the rest of the group, even if they have already accumulated experience)."
            },
            {
                result: "Fletcher",
                dice_requirement: { type: "exact", value: 4, count: 3 },
                description: "Three dice show 4",
                details: "Roll a D6 to see what you find:\n\nD6   | Result\n1-2  | D3 Short Bows\n3    | D3 Bows\n4    | D3 Long Bows\n5    | Quiver of Hunting Arrows\n6    | D3 Crossbows"
            },
            {
                result: "Market Hall",
                dice_requirement: { type: "exact", value: 5, count: 3 },
                description: "Three dice show 5",
                details: "You find several items worth 2D6 gc in total."
            },
            {
                result: "Returning a Favour",
                dice_requirement: { type: "exact", value: 6, count: 3 },
                description: "Three dice show 6",
                details: "You gain the services of any one Hired Sword (choose from those available to your warband) for the duration of the next battle, free of charge. After the battle he will depart, or you may continue to pay for his upkeep as normal. See the Hired Swords section."
            },
            // FOUR OF A KIND
            {
                result: "Gunsmith",
                dice_requirement: { type: "exact", value: 1, count: 4 },
                description: "Four dice show 1",
                details: "Roll a D6 to see what you find:\n\nD6   | Result\n1    | Blunderbuss\n2    | Brace of Pistols\n3    | Brace of Duelling Pistols\n4    | D3 Handguns\n5    | D3 Flasks of Superior Blackpowder\n6    | Hochland Long Rifle"
            },
            {
                result: "Shrine",
                dice_requirement: { type: "exact", value: 2, count: 4 },
                description: "Four dice show 2",
                details: "Your warband may strip the shrine and gain 3D6 gc worth of loot.\n\nSisters of Sigmar or Witch Hunter warbands may save some of the shrine's holy relics. They will gain 3D6 gc from their patrons, and a blessing from the gods. One of their weapons (chosen by the player) will now be blessed and will always wound any Undead or Possessed model on a to wound roll of 2+."
            },
            {
                result: "Townhouse",
                dice_requirement: { type: "exact", value: 3, count: 4 },
                description: "Four dice show 3",
                details: "Your warband finds 3D6 gc worth of loot."
            },
            {
                result: "Armourer",
                dice_requirement: { type: "exact", value: 4, count: 4 },
                description: "Four dice show 4",
                details: "Roll a D6 to see what you find:\n\nD6   | Result\n1-2  | D3 Shields or Bucklers (choose which)\n3    | D3 Helmets\n4    | D3 Suits of Light Armour\n5    | D3 Suits of Heavy Armour\n6    | Suit of Ithilmar Armour"
            },
            {
                result: "Graveyard",
                dice_requirement: { type: "exact", value: 5, count: 4 },
                description: "Four dice show 5",
                details: "Any warband apart from Witch Hunters and Sisters of Sigmar may loot the crypts and graves and gains D6x10 gc worth of loot.\n\nIf you loot the graveyard, the next time you play against Sisters of Sigmar or Witch Hunters, the entire enemy warband will hate all the models in your warband. Make a note of this on your warband roster sheet.\n\nWitch Hunters and Sisters of Sigmar may seal the graves. They will be rewarded for their piety by D6 Experience points distributed amongst the Heroes of the warband."
            },
            {
                result: "Catacombs",
                dice_requirement: { type: "exact", value: 6, count: 4 },
                description: "Four dice show 6",
                details: "You can use the new tunnels you found in the next battle you play. Position up to three fighters (not Rat Ogres or the Possessed) anywhere on the battlefield at ground level. They are set up at the end of the player's first turn and cannot be placed within 8\" of any enemy models.\n\nThis represents the warriors making their way through the tunnels, infiltrating enemy lines and emerging suddenly from below ground."
            },
            // FIVE OF A KIND
            {
                result: "Moneylender's House",
                dice_requirement: { type: "exact", value: 1, count: 5 },
                description: "Five dice show 1",
                details: "Inside, hidden amongst the debris, you find D6x10 gc to add to your treasury."
            },
            {
                result: "Alchemist's Laboratory",
                dice_requirement: { type: "exact", value: 2, count: 5 },
                description: "Five dice show 2",
                details: "In the ruins you find loot worth 3D6 gc and a battered old notebook. One of your Heroes may study the Alchemist’s notebook, and the extra wisdom he gains will enable him to choose from Academic skills whenever he gains a new skill in addition to those skills normally available to him."
            },
            {
                result: "Jewelsmith",
                dice_requirement: { type: "exact", value: 3, count: 5 },
                description: "Five dice show 3",
                details: "Roll a D6 to see what you find:\n\nD6   | Result\n1-2  | Quartz stones worth D6x5 gc\n3-4  | Amethyst worth 20 gc\n5    | Necklace worth 50 gc\n6    | A ruby worth D6x15 gc\n\nIf your warband does not sell the gems, one of your Heroes may keep them and displays them proudly. He will gain +1 to the rolls for locating rare items as merchants flock to such an obviously wealthy warrior."
            },
            {
                result: "Merchant's House",
                dice_requirement: { type: "exact", value: 4, count: 5 },
                description: "Five dice show 4",
                details: "Inside you find several valuable objects which can be sold for 2D6x5 gc. If you roll a double, instead of finding money you find the symbol of the Order of Freetraders. A Hero in possession of this gains the Haggle skill."
            },
            {
                result: "Shattered Building",
                dice_requirement: { type: "exact", value: 5, count: 5 },
                description: "Five dice show 5",
                details: "You find D3 shards of wyrdstone amongst the ruins. In addition take a Leadership test against the warband leader's Leadership value. If passed a wardog that was guarding the building joins the warband."
            },
            {
                result: "Entrance to the Catacombs",
                dice_requirement: { type: "exact", value: 6, count: 5 },
                description: "Five dice show 6",
                details: "You can use these tunnels to explore Mordheim more efficiently. From now on, you may re-roll one dice when you roll on the Exploration chart. Make a note of this in your warband's roster sheet. Second and subsequent catacomb entrances you find do not grant you any additional re-rolls, although you may find further re-rolls from other sources."
            },
            // SIX OF A KIND
            {
                result: "The Pit",
                dice_requirement: { type: "exact", value: 1, count: 6 },
                description: "Six dice show 1",
                details: "If you wish, you can send one of your Heroes to search for any wyrdstone hidden here. Roll a D6. On a roll of 1 Hero is devoured by guardians of Pit and never seen again. On a roll of 2 or more he returns with D6+1 shards of wyrdstone."
            },
            {
                result: "Hidden Treasure",
                dice_requirement: { type: "exact", value: 2, count: 6 },
                description: "Six dice show 2",
                details: "When you open the chest you find the following items. Roll for every item on the list separately (apart from gold crowns) to see whether you have found it. For example, on a roll of a 4+ you find wyrdstone.\n\nItems | D6 Result Needed\nD3 Pieces of wyrdstone | 4+\n5D6x5 gc | Auto\nHoly Relic | 5+\nSuit of Heavy Armour | 5+\nD3 Gems worth 10 gc each | 4+\nElven Cloak | 5+\nHoly Tome | 5+\nMagical Artefact | 5+"
            },
            {
                result: "Dwarf Smithy",
                dice_requirement: { type: "exact", value: 3, count: 6 },
                description: "Six dice show 3",
                details: "Roll a D6 to see what you find:\n\nD6   | Result\n1    | D3 Double-handed axes\n2    | D3 Suits of Heavy Armour\n3    | Gromril Axe\n4    | Gromril Hammer\n5    | Double-handed Gromril Axe\n6    | Gromril Armour"
            },
            {
                result: "Slaughtered Warband",
                dice_requirement: { type: "exact", value: 4, count: 6 },
                description: "Six dice show 4",
                details: "After giving the dead their final rites (Sisters of Sigmar or Witch Hunters), eating them (Skaven or Undead) or looting them (anyone else!) you find the following items. Roll for every item separately (apart from gold coins and daggers) to see if you find it. For example, on a roll of 4+ you will find suits of light armour.\n\nItem | D6 Result Needed\n3D6x5 gc | Auto\nD3 Suits of Light Armour | 4+\nSuit of Heavy Armour | 5+\nD6 Daggers | Auto\nMordheim Map | 4+\nD3 Halberds | 5+\nD3 Swords | 3+\nD3 Shields | 2+\nD3 Bows | 4+\nD3 Helmets | 2+"
            },
            {
                result: "Fighting Arena",
                dice_requirement: { type: "exact", value: 5, count: 6 },
                description: "Six dice show 5",
                details: "You find a training manual, which you can either sell for 100 gc or let one of your Heroes read. The extra knowledge your Hero gleans from reading the manual entitles him to choose from Combat skills whenever he gains a new skill, and his WS may now be increased by an extra point above his normal racial maximum (for example, a Human who has the book would now have a maximum Weapon Skill of 7)."
            },
            {
                result: "Noble's Villa",
                dice_requirement: { type: "exact", value: 6, count: 6 },
                description: "Six dice show 6",
                details: "Roll a D6. If you roll 1-2, you find D6x10 gc worth of items and money to add to your treasury. On a roll of 3-4, you find D6 vials of Crimson Shade. On a roll of 5-6 you find a hidden magical artefact carefully concealed in a hidden cellar or behind a secret door. Roll on Magical Artefacts table."
            },
            // DEFAULT
            {
                result: "Nothing of Interest",
                dice_requirement: { type: "default" },
                description: "No special combination",
                details: "Your warband finds nothing of interest during their exploration. No additional income or benefits are gained."
            }
        ]
    }
};

// Helper function to check dice rolls against exploration results
export function checkExplorationResult(diceRolls) {
    const diceCount = {};
    
    // Count each dice result
    diceRolls.forEach(die => {
        diceCount[die] = (diceCount[die] || 0) + 1;
    });
    
    // Check for special combinations first (prioritize 3-of-a-kind over 2-of-a-kind)
    for (const result of EXPLORATION_CHARTS.exploration_chart.dice_requirements) {
        const requirement = result.dice_requirement;
        
        if (requirement.type === "exact") {
            if (diceCount[requirement.value] >= requirement.count) {
                return result;
            }
        } else if (requirement.type === "default") {
            // Only return default if no other matches found
            continue;
        }
    }
    
    // Return default result if no special combination
    return EXPLORATION_CHARTS.exploration_chart.dice_requirements.find(
        result => result.dice_requirement.type === "default"
    );
}

// Helper function to get all possible exploration results
export function getAllExplorationResults() {
    return EXPLORATION_CHARTS.exploration_chart.dice_requirements;
}

// Helper function to get exploration result by name
export function getExplorationResultByName(resultName) {
    return EXPLORATION_CHARTS.exploration_chart.dice_requirements.find(
        result => result.result === resultName
    );
}

// Helper function to analyze dice values and find the best exploration result
// Follows Mordheim rules: most numerous multiples wins, highest value wins ties
export function analyzeExplorationDice(diceValues) {
    // Filter out invalid values (empty, 0, >6, non-numbers)
    const validDice = diceValues.filter(val =>
        val !== null && val !== undefined && val !== '' &&
        !isNaN(val) && val >= 1 && val <= 6
    ).map(Number);

    // If no valid dice, return default
    if (validDice.length === 0) {
        return EXPLORATION_CHARTS.exploration_chart.dice_requirements.find(
            result => result.dice_requirement.type === "default"
        );
    }

    // Count occurrences of each dice value
    const diceCount = {};
    validDice.forEach(die => {
        diceCount[die] = (diceCount[die] || 0) + 1;
    });

    // Find the best match according to Mordheim rules
    let bestMatch = null;
    let bestCount = 0;
    let bestValue = 0;

    // Check each dice value that has multiples
    for (const value in diceCount) {
        const count = diceCount[value];
        if (count >= 2) { // Only consider multiples (doubles or better)
            // Prioritize: higher count wins, if tied, higher value wins
            if (count > bestCount || (count === bestCount && parseInt(value) > bestValue)) {
                bestCount = count;
                bestValue = parseInt(value);
            }
        }
    }

    // If we found a multiple, look it up in the chart
    if (bestMatch !== null || bestCount > 0) {
        const matchingResult = EXPLORATION_CHARTS.exploration_chart.dice_requirements.find(
            result => result.dice_requirement.type === "exact" &&
                     result.dice_requirement.value === bestValue &&
                     result.dice_requirement.count === bestCount
        );
        if (matchingResult) {
            return matchingResult;
        }
    }

    // Return default if no multiples found
    return EXPLORATION_CHARTS.exploration_chart.dice_requirements.find(
        result => result.dice_requirement.type === "default"
    );
}

// Helper function to find all potentially matching exploration results
export function findAllExplorationResults(diceValues) {
    // Filter out invalid values (empty, 0, >6, non-numbers)
    const validDice = diceValues.filter(val =>
        val !== null && val !== undefined && val !== '' &&
        !isNaN(val) && val >= 1 && val <= 6
    ).map(Number);

    // If no valid dice, return default
    if (validDice.length === 0) {
        return [EXPLORATION_CHARTS.exploration_chart.dice_requirements.find(
            result => result.dice_requirement.type === "default"
        )];
    }

    // Count occurrences of each dice value
    const diceCount = {};
    validDice.forEach(die => {
        diceCount[die] = (diceCount[die] || 0) + 1;
    });

    const matchingResults = [];

    // Check each dice value that has multiples
    for (const value in diceCount) {
        const count = diceCount[value];
        if (count >= 2) { // Only consider multiples (doubles or better)
            // Find all results that match this dice value with counts <= the actual count
            // For example, if you have 4 threes, you should see results for 2, 3, and 4 threes
            const possibleCounts = [2, 3, 4, 5, 6]; // Valid counts in Mordheim
            possibleCounts.forEach(possibleCount => {
                if (count >= possibleCount) {
                    const matchingResult = EXPLORATION_CHARTS.exploration_chart.dice_requirements.find(
                        result => result.dice_requirement.type === "exact" &&
                                 result.dice_requirement.value === parseInt(value) &&
                                 result.dice_requirement.count === possibleCount
                    );
                    if (matchingResult && !matchingResults.includes(matchingResult)) {
                        matchingResults.push(matchingResult);
                    }
                }
            });
        }
    }

    // If no multiples found, return default
    if (matchingResults.length === 0) {
        return [EXPLORATION_CHARTS.exploration_chart.dice_requirements.find(
            result => result.dice_requirement.type === "default"
        )];
    }

    return matchingResults;
}

// Helper function to calculate what dice need to be removed for a specific result to win
export function calculateDiceToRemoveForResult(targetResult, allMatchingResults, diceValues) {
    // If this is the only result or default, nothing to remove
    if (allMatchingResults.length <= 1 || targetResult.dice_requirement.type === 'default') {
        return null;
    }

    // Find the best result according to Mordheim rules
    const bestResult = allMatchingResults.reduce((best, current) => {
        if (current.dice_requirement.type === 'default') return best;
        if (best.dice_requirement.type === 'default') return current;

        const bestCount = best.dice_requirement.count;
        const currentCount = current.dice_requirement.count;
        const bestValue = best.dice_requirement.value;
        const currentValue = current.dice_requirement.value;

        if (currentCount > bestCount) return current;
        if (currentCount < bestCount) return best;
        if (currentValue > bestValue) return current;
        return best;
    });

    // If this result is already the best, nothing to remove
    if (targetResult === bestResult) {
        return null;
    }

    // Calculate which dice to remove from competing results
    const diceCount = {};
    diceValues.forEach(die => {
        diceCount[die] = (diceCount[die] || 0) + 1;
    });

    const diceToRemove = [];

    // For each competing result that beats this one, calculate what to remove
    allMatchingResults.forEach(competingResult => {
        if (competingResult === targetResult) return;
        if (competingResult.dice_requirement.type === 'default') return;

        const competingCount = competingResult.dice_requirement.count;
        const competingValue = competingResult.dice_requirement.value;
        const targetCount = targetResult.dice_requirement.count;
        const targetValue = targetResult.dice_requirement.value;

        // Check if this competing result beats the target
        let competingBeatsTarget = false;
        if (competingCount > targetCount) {
            competingBeatsTarget = true;
        } else if (competingCount === targetCount && competingValue > targetValue) {
            competingBeatsTarget = true;
        }

        if (competingBeatsTarget) {
            // Need to remove enough dice from the competing result to make target win
            // Remove dice of the competing value
            const countToRemove = competingCount - targetCount + 1;
            for (let i = 0; i < countToRemove; i++) {
                diceToRemove.push(competingValue);
            }
        }
    });

    // Also need to handle ties where same count but different values
    if (diceToRemove.length === 0) {
        // Check if there are ties with same count but different values
        const targetCount = targetResult.dice_requirement.count;
        const targetValue = targetResult.dice_requirement.value;

        allMatchingResults.forEach(competingResult => {
            if (competingResult === targetResult) return;
            if (competingResult.dice_requirement.type === 'default') return;

            if (competingResult.dice_requirement.count === targetCount &&
                competingResult.dice_requirement.value > targetValue) {
                // Need to remove all dice of the higher value
                const countToRemove = competingResult.dice_requirement.count;
                for (let i = 0; i < countToRemove; i++) {
                    diceToRemove.push(competingResult.dice_requirement.value);
                }
            }
        });
    }

    if (diceToRemove.length === 0) {
        return null;
    }

    // Count how many of each value to remove
    const removeCount = {};
    diceToRemove.forEach(value => {
        removeCount[value] = (removeCount[value] || 0) + 1;
    });

    // Format the removal instructions
    const removalInstructions = [];
    for (const value in removeCount) {
        const count = removeCount[value];
        removalInstructions.push(`${count} × ${value}`);
    }

    return removalInstructions.join(', ');
}
