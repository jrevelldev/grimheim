// Treasure Selling Values Table
// Based on Number of Shards Sold and Number of Warriors in Warband
const SELLING_TREASURE_VALUES = {
    // Structure: [shardsSold][warbandSize] = value
    // warbandSize indices: 0: "1-3", 1: "4-6", 2: "7-9", 3: "10-12", 4: "13-15", 5: "16+"
    values: [
        // 1 shard sold
        [45, 40, 35, 30, 30, 25],
        // 2 shards sold
        [60, 55, 50, 45, 40, 35],
        // 3 shards sold
        [75, 70, 65, 60, 55, 50],
        // 4 shards sold
        [90, 80, 70, 65, 60, 55],
        // 5 shards sold
        [110, 100, 90, 80, 70, 65],
        // 6 shards sold
        [120, 110, 100, 90, 80, 70],
        // 7 shards sold
        [145, 130, 120, 110, 100, 90],
        // 8+ shards sold
        [155, 140, 130, 120, 110, 100]
    ],
    
    // Labels for reference
    shardRanges: ["1", "2", "3", "4", "5", "6", "7", "8+"],
    warbandSizes: ["1-3", "4-6", "7-9", "10-12", "13-15", "16+"]
};

// Helper function to get treasure selling value
function getTreasureSellingValue(shardsSold, warriorsInWarband) {
    // If 0 shards sold, return 0
    if (shardsSold === 0) {
        return 0;
    }

    // Determine shard index
    let shardIndex;
    if (shardsSold >= 8) {
        shardIndex = 7; // 8+ row
    } else {
        shardIndex = shardsSold - 1; // 1-based to 0-based index
    }

    // Determine warband size index
    let warbandIndex;
    if (warriorsInWarband >= 16) {
        warbandIndex = 5; // 16+ column
    } else if (warriorsInWarband >= 13) {
        warbandIndex = 4; // 13-15 column
    } else if (warriorsInWarband >= 10) {
        warbandIndex = 3; // 10-12 column
    } else if (warriorsInWarband >= 7) {
        warbandIndex = 2; // 7-9 column
    } else if (warriorsInWarband >= 4) {
        warbandIndex = 1; // 4-6 column
    } else {
        warbandIndex = 0; // 1-3 column
    }

    return SELLING_TREASURE_VALUES.values[shardIndex][warbandIndex];
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SELLING_TREASURE_VALUES, getTreasureSellingValue };
}

// ES Module exports for browser
export { SELLING_TREASURE_VALUES, getTreasureSellingValue };
