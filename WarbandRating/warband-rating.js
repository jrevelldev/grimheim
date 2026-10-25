import { HIRED_SWORDS, DRAMATIS_PERSONAE } from '../data/index.js';
import { isExcludeStartingXpFromRatingActive } from '../state.js';
import { getOriginalName } from '../get-original-name.js';
import { normalizeEquipment } from '../utility.js';

/** Parses the rating string for hired swords and dramatis personae */
export const parseRatingString = (ratingString, xp) => {
    if (!ratingString) return 0;

    // Handle simple cases like "+100 points"
    const simpleMatch = ratingString.match(/\+(\d+)\s*points?/i);
    if (simpleMatch) {
        return parseInt(simpleMatch[1]);
    }

    // Handle cases like "18 points plus 1 point for each Experience point he has"
    const complexMatch = ratingString.match(/(\d+)\s*points?\s*plus\s*(\d+)\s*point(?:s)?\s*for\s*each\s*Experience\s*point/i);
    if (complexMatch) {
        const base = parseInt(complexMatch[1]);
        const perXp = parseInt(complexMatch[2]);
        return base + (perXp * (xp || 0));
    }

    // Handle cases like "A Beast Hunter increases the warband's rating by 18 points plus 1 point for each Experience point he has."
    const descriptiveMatch = ratingString.match(/increases?\s*the\s*warband(?:'s|s)?\s*rating\s*by\s*(\d+)\s*points?\s*plus\s*(\d+)\s*point(?:s)?\s*for\s*each\s*Experience\s*point/i);
    if (descriptiveMatch) {
        const base = parseInt(descriptiveMatch[1]);
        const perXp = parseInt(descriptiveMatch[2]);
        return base + (perXp * (xp || 0));
    }

    // Fallback: try to extract any number
    const numberMatch = ratingString.match(/(\d+)/);
    if (numberMatch) {
        return parseInt(numberMatch[1]);
    }

    return 0;
};

/** Calculates the warband rating */
export function calculateWarbandRating(members) {
    let totalFighterBaseRating = 0;
    let totalXp = 0;
    let totalXpBeyondStarting = 0;
    let additionalRating = 0;

    members.forEach(member => {
        const type = member.type;
        const xp = member.xp || 0;
        const starting_xp = member.starting_xp || 0;
        const groupSize = member.group_size || 1;

        // Calculate equipment warbandRating contribution
        let memberEquipmentRating = 0;
        if (type !== 'Vehicle' && member.equipment) {
            member.equipment.forEach(item => {
                const normalized = normalizeEquipment(item);
                if (normalized && normalized.warbandRating) {
                    memberEquipmentRating += normalized.warbandRating;
                }
            });
        }
        additionalRating += memberEquipmentRating * groupSize;

        if (type === 'Hired Sword') {
            // Find the base rating data (just the number)
            let baseRating = 0;
            const lookupName = getOriginalName(member, HIRED_SWORDS);
            const ratingData = HIRED_SWORDS.flatMap(g => g.characters).find(c => c.name === lookupName)?.data?.rating;
            
            if (ratingData) {
                // Convert the rating string directly to a number
                baseRating = parseInt(ratingData) || 0;
            }
            
            // Add base rating + experience contribution based on house rule
            if (isExcludeStartingXpFromRatingActive) {
                // House rule ON: Exclude starting XP (only count XP beyond starting)
                additionalRating += baseRating + Math.max(0, xp - starting_xp);
            } else {
                // House rule OFF: Include all XP (starting + gained)
                additionalRating += baseRating + xp;
            }
        } else if (type === 'Dramatis Personae') {
            // Dramatis Personae still use the full string parsing for flexibility
            const lookupName = getOriginalName(member, DRAMATIS_PERSONAE);
            let ratingData = DRAMATIS_PERSONAE.flatMap(g => g.characters).find(c => c.name === lookupName)?.data?.rating;
            
            if (ratingData) {
                if (isExcludeStartingXpFromRatingActive) {
                    // House rule ON: Only count XP beyond starting for Dramatis Personae
                    // Parse rating string with adjusted XP (only beyond starting)
                    additionalRating += parseRatingString(ratingData, Math.max(0, xp - starting_xp));
                } else {
                    // House rule OFF: Include all XP for Dramatis Personae
                    additionalRating += parseRatingString(ratingData, xp);
                }
            }
        } else if (type === 'Hero' || type === 'Henchman') {
            // Regular fighter (Hero or Henchman) - Vehicles are excluded
            // Large Target fighters count as 20 points instead of the standard 5
            const isLargeTarget = member.special_rules && member.special_rules.split(';').map(r => r.trim()).some(r => r === 'Large Target');
            const fighterBaseValue = isLargeTarget ? 20 : 5;
            totalFighterBaseRating += fighterBaseValue * groupSize;
            
            if (isExcludeStartingXpFromRatingActive) {
                // House rule ON: Only count XP beyond starting
                totalXpBeyondStarting += Math.max(0, xp - starting_xp) * groupSize;
            } else {
                // House rule OFF: Include all XP
                totalXp += xp * groupSize;
            }
        }
        // Vehicles fall through and contribute 0 points to rating
    });

    if (isExcludeStartingXpFromRatingActive) {
        // House rule ON: Use XP beyond starting calculation
        return totalFighterBaseRating + totalXpBeyondStarting + additionalRating;
    } else {
        // House rule OFF: Use all XP calculation
        return totalFighterBaseRating + totalXp + additionalRating;
    }
}

/**
 * Calculates a detailed breakdown of the warband rating with per-fighter contributions.
 * Mirrors the exact logic of calculateWarbandRating but captures per-member details.
 * @param {Array} members - The warband members array
 * @returns {Object} Detailed breakdown object
 */
export function calculateWarbandRatingBreakdown(members) {
    let totalFighterBaseRating = 0;
    let totalXp = 0;
    let totalXpBeyondStarting = 0;
    let additionalRating = 0;

    const memberBreakdowns = [];

    members.forEach(member => {
        const type = member.type;
        const xp = member.xp || 0;
        const starting_xp = member.starting_xp || 0;
        const groupSize = member.group_size || 1;

        const entry = {
            name: member.name,
            type: type,
            groupSize: groupSize,
            baseContribution: 0,
            xpContribution: 0,
            equipmentContribution: 0,
            totalContribution: 0,
            breakdownParts: []
        };

        // Calculate equipment warbandRating contribution
        let memberEquipmentRating = 0;
        const equipmentDetails = [];
        if (type !== 'Vehicle' && member.equipment) {
            member.equipment.forEach(item => {
                const normalized = normalizeEquipment(item);
                if (normalized && normalized.warbandRating) {
                    memberEquipmentRating += normalized.warbandRating;
                    equipmentDetails.push({ name: normalized.name, rating: normalized.warbandRating });
                }
            });
        }
        entry.equipmentContribution = memberEquipmentRating * groupSize;
        entry.equipmentDetails = equipmentDetails;
        if (entry.equipmentContribution > 0) {
            const eqNames = equipmentDetails.map(e => `${e.name}: +${e.rating}`).join(', ');
            if (groupSize > 1) {
                entry.breakdownParts.push(`Equipment (${eqNames}) × ${groupSize} = ${entry.equipmentContribution}`);
            } else {
                entry.breakdownParts.push(`Equipment (${eqNames}) = ${entry.equipmentContribution}`);
            }
        }
        additionalRating += entry.equipmentContribution;

        if (type === 'Hired Sword') {
            let baseRating = 0;
            const lookupName = getOriginalName(member, HIRED_SWORDS);
            const ratingData = HIRED_SWORDS.flatMap(g => g.characters).find(c => c.name === lookupName)?.data?.rating;
            
            if (ratingData) {
                baseRating = parseInt(ratingData) || 0;
            }

            entry.baseContribution = baseRating;
            
            if (isExcludeStartingXpFromRatingActive) {
                const xpBeyondStarting = Math.max(0, xp - starting_xp);
                entry.xpContribution = xpBeyondStarting;
                additionalRating += baseRating + xpBeyondStarting;
                entry.breakdownParts.push(`Base: ${baseRating}`);
                if (xpBeyondStarting > 0) {
                    entry.breakdownParts.push(`XP (beyond starting): ${xpBeyondStarting}`);
                }
            } else {
                entry.xpContribution = xp;
                additionalRating += baseRating + xp;
                entry.breakdownParts.push(`Base: ${baseRating}`);
                if (xp > 0) {
                    entry.breakdownParts.push(`XP: ${xp}`);
                }
            }
        } else if (type === 'Dramatis Personae') {
            const lookupName = getOriginalName(member, DRAMATIS_PERSONAE);
            let ratingData = DRAMATIS_PERSONAE.flatMap(g => g.characters).find(c => c.name === lookupName)?.data?.rating;
            
            if (ratingData) {
                let dpRating;
                if (isExcludeStartingXpFromRatingActive) {
                    const xpBeyondStarting = Math.max(0, xp - starting_xp);
                    dpRating = parseRatingString(ratingData, xpBeyondStarting);
                    entry.xpContribution = xpBeyondStarting;
                } else {
                    dpRating = parseRatingString(ratingData, xp);
                    entry.xpContribution = xp;
                }
                entry.baseContribution = dpRating;
                additionalRating += dpRating;
                entry.breakdownParts.push(`Rating: ${dpRating} (from "${ratingData.trim()}")`);
            }
        } else if (type === 'Hero' || type === 'Henchman') {
            // Regular fighter - Large Target counts as 20 per fighter, others count as 5
            const isLargeTarget = member.special_rules && member.special_rules.split(';').map(r => r.trim()).some(r => r === 'Large Target');
            const fighterBaseValue = isLargeTarget ? 20 : 5;
            entry.baseContribution = fighterBaseValue * groupSize;
            totalFighterBaseRating += fighterBaseValue * groupSize;

            if (isExcludeStartingXpFromRatingActive) {
                const xpBeyondStarting = Math.max(0, xp - starting_xp) * groupSize;
                entry.xpContribution = xpBeyondStarting;
                totalXpBeyondStarting += xpBeyondStarting;
                if (groupSize > 1) {
                    entry.breakdownParts.push(`Fighters: ${fighterBaseValue}${isLargeTarget ? ' (Large Target)' : ''} × ${groupSize} = ${entry.baseContribution}`);
                } else {
                    entry.breakdownParts.push(`Fighter: ${fighterBaseValue}${isLargeTarget ? ' (Large Target)' : ''}`);
                }
                if (xpBeyondStarting > 0) {
                    if (groupSize > 1) {
                        entry.breakdownParts.push(`XP (beyond starting): ${Math.max(0, xp - starting_xp)} × ${groupSize} = ${xpBeyondStarting}`);
                    } else {
                        entry.breakdownParts.push(`XP (beyond starting): ${xpBeyondStarting}`);
                    }
                }
            } else {
                const xpTotal = xp * groupSize;
                entry.xpContribution = xpTotal;
                totalXp += xpTotal;
                if (groupSize > 1) {
                    entry.breakdownParts.push(`Fighters: ${fighterBaseValue}${isLargeTarget ? ' (Large Target)' : ''} × ${groupSize} = ${entry.baseContribution}`);
                } else {
                    entry.breakdownParts.push(`Fighter: ${fighterBaseValue}${isLargeTarget ? ' (Large Target)' : ''}`);
                }
                if (xpTotal > 0) {
                    if (groupSize > 1) {
                        entry.breakdownParts.push(`XP: ${xp} × ${groupSize} = ${xpTotal}`);
                    } else {
                        entry.breakdownParts.push(`XP: ${xpTotal}`);
                    }
                }
            }
        } else {
            // Vehicle or other — contributes nothing except equipment
            entry.breakdownParts.push('No rating contribution');
        }

        entry.totalContribution = entry.baseContribution + entry.xpContribution + entry.equipmentContribution;
        memberBreakdowns.push(entry);
    });

    const xpRating = isExcludeStartingXpFromRatingActive ? totalXpBeyondStarting : totalXp;
    const total = totalFighterBaseRating + xpRating + additionalRating;

    return {
        total,
        fighterBaseRating: totalFighterBaseRating,
        xpRating,
        additionalRating,
        isExcludeStartingXpActive: isExcludeStartingXpFromRatingActive,
        members: memberBreakdowns
    };
}
