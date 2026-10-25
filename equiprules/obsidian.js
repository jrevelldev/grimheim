import { formatEquipmentRules } from '../equipment-management.js';
import { currentWarband } from '../state.js';
import { translateEquipment } from '../i18n.js';

/** Generates HTML for a Close Combat weapon with Obsidian expansion option */
export const renderObsidianWeaponOption = (item, displayedCost, originalCostText, textColor, rarityDisplay = '', variableCostDisplay = '') => {
    const allowedWarbands = ["Marauders of Chaos", "The Sons of Hashut", "Black Dwarfs"];
    const isObsidianAllowed = currentWarband && allowedWarbands.includes(currentWarband.type);
    const obsidianWeaponIds = [452, 453, 454]; // Pre-made obsidian weapons that shouldn't have the modifier option
    const isPremadeObsidianWeapon = obsidianWeaponIds.includes(item.id);

    let obsidianCheckbox = '';
    if (isObsidianAllowed && !isPremadeObsidianWeapon) {
        obsidianCheckbox = `
                <br>
                <label class="flex items-center text-sm">
                    <input type="checkbox" onchange="updateWeaponModifier(this, '${item.id}', 'obsidian')" class="mr-2">
                    Obsidiana (modificador X4)
                </label>`;
    }

    const displayName = translateEquipment(item.name) !== item.name
        ? `${translateEquipment(item.name)} <span class="text-slate-400 font-normal">(${item.name})</span>`
        : item.name;

    return `
        <div style="flex: 1; min-width: 0;">
            <div onclick="toggleExpansion(this)" class="cursor-pointer">
                <p class="font-semibold equip-name-toggle" data-rules-target="obsidian-rules-${item.id}" style="cursor: pointer;">
                    <i class="fas fa-chevron-right text-xs text-slate-500 equip-chevron" style="transition: transform 0.2s; margin-right: 4px; font-size: 0.6rem;"></i>${displayName} <span class="text-${textColor} text-xs">(${displayedCost}${variableCostDisplay} CO${originalCostText})</span>${rarityDisplay}
                </p>
                <p id="obsidian-rules-${item.id}" class="text-xs text-slate-500 italic equip-rules-content hidden" style="margin-top: 4px;">${formatEquipmentRules(item.rules)}</p>
            </div>
            <div class="expansion hidden ml-4 mt-2">
                ${obsidianCheckbox}
            </div>
        </div>
        <button class="text-green-400 hover:text-green-300 ml-2 flex-shrink-0" data-action="add-equipment-from-modal" data-item-id="${item.id}" data-original-cost="${displayedCost}" data-original-text="${originalCostText}" data-text-color="${textColor}">
            <i class="fas fa-plus-circle"></i> Añadir
        </button>
    `;
};

/** Check if obsidian modifier is available for current warband */
export const isObsidianAvailable = () => {
    const allowedWarbands = ["Marauders of Chaos", "The Sons of Hashut", "Black Dwarfs"];
    return currentWarband && allowedWarbands.includes(currentWarband.type);
};

/** Get obsidian modifier rules and cost */
export const getObsidianModifier = () => {
    return {
        costMultiplier: 4,
        rules: "Strength +1\n\nBlemished: Obsidian weapons may never be used by Dwarfs, Elves, Sisters of Sigmar, Witch Hunters or Priests.\n\nHeavy: Obsidian weapons are so heavy that the warrior using them always strikes last, even when charging.",
        name: "Obsidian"
    };
};
