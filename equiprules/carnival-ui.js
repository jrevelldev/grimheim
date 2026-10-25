// Carnival of Chaos specific UI logic
// This module handles special cases for Carnival of Chaos warbands

/** Applies Carnival of Chaos specific UI adjustments to the given wrapper */
export const applyCarnivalOfChaosUILogic = (role, fighterName, wrapper) => {
    // Special case for Plague Cart: always hides group size input (fixed individual unit)
    if (role === 'Henchman') {
        if (fighterName === 'Plague Cart') {
            wrapper.classList.add('hidden'); // Hide group size for Plague Cart
        }
    }
};

/** Returns true if the current warband is Carnival of Chaos */
export const isCarnivalOfChaosWarband = (currentWarband) => {
    return currentWarband && currentWarband.type === 'Carnival of Chaos';
};

/** Checks if a warrior typically has no experience progression */
//export const hasNoExperienceProgression = (specialRulesString) => {
  //  return specialRulesString && specialRulesString.includes('Do not gain experience');
//};

/** Applies Carnival of Chaos specific race visibility adjustments */
export const applyCarnivalRaceVisibility = (fighterName) => {
    const raceLabel = document.querySelector('label[for="f-race"]');
    const raceSelect = document.getElementById('f-race');

    if (fighterName === 'Plague Cart') {
        if (raceLabel) raceLabel.classList.add('hidden');
        if (raceSelect) raceSelect.classList.add('hidden');
    } else {
        if (raceLabel) raceLabel.classList.remove('hidden');
        if (raceSelect) raceSelect.classList.remove('hidden');
    }
};
