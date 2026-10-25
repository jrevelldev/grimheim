export function getOriginalName(member, dataArray) {
    if (member.originalName) {
        return member.originalName;
    }

    const characters = dataArray.flatMap(group => group.characters);
    const catalogueNames = new Set(characters.map(character => character.name));

    if (member.name && catalogueNames.has(member.name)) {
        return member.name;
    }

    // Heuristic fallback for renamed fighters without originalName
    const memberStats = member.base_stats || member.stats;
    const memberCost = parseInt(member.cost) || 0;

    if (memberStats) {
        const matches = characters.filter(char => {
            const charStats = char.data?.stats;
            if (!charStats) return false;
            
            // Compare all stat fields
            const statsMatch = Object.keys(charStats).every(stat => 
                memberStats[stat] !== undefined && parseInt(charStats[stat]) === parseInt(memberStats[stat])
            );
            if (!statsMatch) return false;

            // Compare cost
            const charCost = parseInt(char.data?.hire_fee) || parseInt(char.data?.special_hire_treasure) || 0;
            return charCost === memberCost;
        });

        if (matches.length === 1) {
            return matches[0].name;
        }
        if (matches.length > 1) {
            // If multiple matches, also match by race if possible
            const raceMatch = matches.find(char => 
                (char.data?.race || '').toLowerCase() === (member.race || '').toLowerCase()
            );
            if (raceMatch) return raceMatch.name;
            return matches[0].name;
        }
    }

    return member.name;
}

