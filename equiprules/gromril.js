import { formatEquipmentRules } from '../equipment-management.js';
import { currentWarband } from '../state.js';
import { translateEquipment } from '../i18n.js';

/** Generates HTML for a Close Combat weapon with Gromril and Ithilmar expansion options */
export const renderGromrilWeaponOption = (item, displayedCost, originalCostText, textColor, rarityDisplay = '', variableCostDisplay = '') => {
    // Determine Gromril modifier for dwarf warbands
    const isDwarf = currentWarband && (currentWarband.type === 'Dwarf Treasure Hunters' || currentWarband.type === 'Dwarf Rangers' || currentWarband.type === 'Dwarf Slayer Cult');
    const isPreGame = currentWarband && currentWarband.pre_game !== false;
    const hasGromril = document.getElementById('f-special-rules')?.value.split('; ').includes('Gromril');
    const gromrilModifier = (isDwarf && hasGromril && isPreGame) ? 'X3' : 'X4';
    const hasIthilmar = document.getElementById('f-special-rules')?.value.split('; ').includes('Ithilmar');
    const ithilmarModifier = (hasIthilmar && isPreGame) ? 'X2' : 'X3';
    const displayName = translateEquipment(item.name) !== item.name
        ? `${translateEquipment(item.name)} <span class="text-slate-400 font-normal">(${item.name})</span>`
        : item.name;

    return `
        <div style="flex: 1; min-width: 0;">
            <div onclick="toggleExpansion(this)" class="cursor-pointer">
                <p class="font-semibold equip-name-toggle" data-rules-target="gromril-rules-${item.id}" style="cursor: pointer;">
                    <i class="fas fa-chevron-right text-xs text-slate-500 equip-chevron" style="transition: transform 0.2s; margin-right: 4px; font-size: 0.6rem;"></i>${displayName} <span class="text-${textColor} text-xs">(${displayedCost}${variableCostDisplay} CO${originalCostText})</span>${rarityDisplay}
                </p>
                <p id="gromril-rules-${item.id}" class="text-xs text-slate-500 italic equip-rules-content hidden" style="margin-top: 4px;">${formatEquipmentRules(item.rules, item.name)}</p>
            </div>
            <div class="expansion hidden ml-4 mt-2">
                <label class="flex items-center text-sm">
                    <input type="checkbox" onchange="updateWeaponModifier(this, '${item.id}', 'gromril')" class="mr-2">
                    Gromril (modificador ${gromrilModifier})
                </label>
                <br>
                <label class="flex items-center text-sm">
                    <input type="checkbox" onchange="updateWeaponModifier(this, '${item.id}', 'ithilmar')" class="mr-2">
                    Ithilmar (modificador ${ithilmarModifier})
                </label>
            </div>
        </div>
        <button class="text-green-400 hover:text-green-300 ml-2 flex-shrink-0" data-action="add-equipment-from-modal" data-item-id="${item.id}" data-original-cost="${displayedCost}" data-original-text="${originalCostText}" data-text-color="${textColor}">
            <i class="fas fa-plus-circle"></i> Añadir
        </button>
    `;
};
