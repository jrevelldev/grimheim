import { analyzeExplorationDice, findAllExplorationResults, calculateDiceToRemoveForResult } from './data/exploration.js';
import { trackEvent } from './analytics.js';

/** Calculates treasure based on dice total */
const calculateTreasure = (diceTotal) => {
    if (diceTotal <= 5) return 1;
    if (diceTotal <= 11) return 2;
    if (diceTotal <= 17) return 3;
    if (diceTotal <= 24) return 4;
    if (diceTotal <= 30) return 5;
    if (diceTotal <= 35) return 6;
    return 7;
};

/** Handles treasure calculation */
const handleTreasureCalculation = () => {
    const mode = document.querySelector('input[name="dice-input-mode"]:checked').value;
    let total = 0;

    if (mode === 'individual') {
        const diceInputs = document.querySelectorAll('.dice-input');
        let sum = 0;
        diceInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            sum += value;
        });
        total = sum;
    } else if (mode === 'advanced') {
        const diceInputs = document.querySelectorAll('.advanced-dice-input');
        const lockedToggle = document.getElementById('advanced-locked-toggle');
        const isLocked = lockedToggle && lockedToggle.checked;
        
        let sum = 0;
        let filledCount = 0;
        diceInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            const state = input.dataset.state || 'neutral';
            
            if (isLocked) {
                // When locked, only count green dice
                if (state === 'green' && value > 0) {
                    sum += value;
                    filledCount++;
                }
            } else {
                // When unlocked, count all dice
                if (value > 0) {
                    sum += value;
                    filledCount++;
                }
            }
        });
        
        if (filledCount === 0) {
            alert('Por favor, introduce los valores de los dados.');
            return;
        }
        
        total = sum;
    }

    if (total <= 0) {
        alert('Por favor, introduce valores de dados válidos.');
        return;
    }

    const shards = calculateTreasure(total);

    // Show result
    document.getElementById('treasure-shards').textContent = shards;
    document.getElementById('treasure-result').classList.remove('hidden');

    trackEvent('exploration_calculate', {
        dice_mode: mode,
        shards_found: shards,
        total_dice_value: total
    });
};

/** Toggles dice input mode */
const toggleDiceInputMode = () => {
    const mode = document.querySelector('input[name="dice-input-mode"]:checked').value;

    trackEvent('exploration_toggle_mode', {
        mode: mode
    });

    // Reset treasure result when switching modes
    document.getElementById('treasure-result').classList.add('hidden');
    document.getElementById('treasure-shards').textContent = '0';

    if (mode === 'individual') {
        document.getElementById('individual-input-section').classList.remove('hidden');
        document.getElementById('advanced-input-section').classList.add('hidden');
        document.getElementById('advanced-locked-toggle').checked = false;
        document.getElementById('calculation-mode-label').textContent = 'todos los dados';
        // Trigger exploration results update when switching to individual mode
        const diceInputs = document.querySelectorAll('.dice-input');
        const diceValues = [];
        diceInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            if (value > 0 && value <= 6) {
                diceValues.push(value);
            }
        });
        updateExplorationResults(diceValues);
    } else if (mode === 'advanced') {
        document.getElementById('individual-input-section').classList.add('hidden');
        document.getElementById('advanced-input-section').classList.remove('hidden');
        // Generate dice inputs if there's a value
        const diceCountInput = document.getElementById('total-dice-count-input');
        if (diceCountInput.value) {
            generateAdvancedDiceInputs(parseInt(diceCountInput.value));
        }
    }
};

/** Generates dynamic dice inputs for advanced mode */
const generateAdvancedDiceInputs = (count) => {
    const container = document.getElementById('advanced-dice-inputs');
    container.innerHTML = '';

    if (count <= 0 || count > 10) {
        document.getElementById('advanced-dice-inputs-container').classList.add('hidden');
        return;
    }

    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'advanced-dice-input w-full px-2 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mordheim-gold text-center cursor-pointer';
        input.min = '1';
        input.max = '6';
        const isMobile = window.innerWidth <= 767;
        input.placeholder = isMobile ? `D ${i + 1}` : `Dado ${i + 1}`;
        input.dataset.state = 'neutral'; // Track selection state
        input.addEventListener('input', (e) => {
            let value = parseInt(e.target.value) || 0;
            // Enforce maximum of 6
            if (value > 6) {
                value = 6;
                e.target.value = 6;
            }
            updateAdvancedCalculatedTotal();
        });
        input.addEventListener('click', handleDiceSelection);
        container.appendChild(input);
    }

    document.getElementById('advanced-dice-inputs-container').classList.remove('hidden');
    updateAdvancedCalculatedTotal();
};

/** Handles dice selection cycling (neutral -> green -> red -> neutral) */
const handleDiceSelection = (event) => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    if (!lockedToggle.checked) return;

    const input = event.target;
    const currentState = input.dataset.state || 'neutral';

    // Count current green dice
    const greenCount = document.querySelectorAll('.advanced-dice-input[data-state="green"]').length;

    // Remove all state classes
    input.classList.remove('bg-green-600', 'border-green-500', 'bg-red-600', 'border-red-500', 'bg-slate-600', 'border-slate-500');

    // Cycle through states
    if (currentState === 'neutral') {
        // Limit to 6 green dice
        if (greenCount >= 6) {
            // Don't allow more than 6 green dice, but allow turning red
            input.dataset.state = 'red';
            input.classList.add('bg-red-600', 'border-red-500');
        } else {
            input.dataset.state = 'green';
            input.classList.add('bg-green-600', 'border-green-500');
        }
    } else if (currentState === 'green') {
        input.dataset.state = 'red';
        input.classList.add('bg-red-600', 'border-red-500');
    } else if (currentState === 'red') {
        input.dataset.state = 'neutral';
        input.classList.add('bg-slate-600', 'border-slate-500');
    }

    // Recalculate total after state change
    updateAdvancedCalculatedTotal();
};

/** Toggles locked state for advanced dice inputs */
const toggleAdvancedLocked = () => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    const isLocked = lockedToggle.checked;
    const diceInputs = document.querySelectorAll('.advanced-dice-input');
    const calculationModeLabel = document.getElementById('calculation-mode-label');

    diceInputs.forEach(input => {
        if (isLocked) {
            input.readOnly = true;
            input.classList.add('cursor-pointer');
        } else {
            input.readOnly = false;
            input.classList.remove('cursor-pointer');
            // Reset to neutral state when unlocking
            input.dataset.state = 'neutral';
            input.classList.remove('bg-green-600', 'border-green-500', 'bg-red-600', 'border-red-500');
            input.classList.add('bg-slate-600', 'border-slate-500');
        }
    });

    // Update calculation mode label
    if (calculationModeLabel) {
        calculationModeLabel.textContent = isLocked ? 'dados verdes' : 'todos los dados';
    }

    // Recalculate total after toggling locked state
    updateAdvancedCalculatedTotal();
};

/** Maximizes total by selecting the 6 highest dice as green */
const maximizeTotalDice = () => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    const diceInputs = document.querySelectorAll('.advanced-dice-input');

    trackEvent('exploration_maximize', {
        total_dice_rolled: diceInputs.length
    });

    // Lock if not already locked
    if (!lockedToggle.checked) {
        lockedToggle.checked = true;
        toggleAdvancedLocked();
    }

    // Get all dice with values
    const diceWithValues = [];
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        if (value > 0 && value <= 6) {
            diceWithValues.push({ input, value });
        }
    });

    // Sort by value descending
    diceWithValues.sort((a, b) => b.value - a.value);

    // Reset all to neutral first
    diceInputs.forEach(input => {
        input.dataset.state = 'neutral';
        input.classList.remove('bg-green-600', 'border-green-500', 'bg-red-600', 'border-red-500');
        input.classList.add('bg-slate-600', 'border-slate-500');
    });

    // Mark top 6 as green
    const topSix = diceWithValues.slice(0, 6);
    topSix.forEach(dice => {
        dice.input.dataset.state = 'green';
        dice.input.classList.remove('bg-slate-600', 'border-slate-500');
        dice.input.classList.add('bg-green-600', 'border-green-500');
    });

    // Mark remaining as red
    const remaining = diceWithValues.slice(6);
    remaining.forEach(dice => {
        dice.input.dataset.state = 'red';
        dice.input.classList.remove('bg-slate-600', 'border-slate-500');
        dice.input.classList.add('bg-red-600', 'border-red-500');
    });

    // Recalculate total
    updateAdvancedCalculatedTotal();
    
    // Calculate treasure automatically after maximizing
    handleTreasureCalculation();
};

/** Updates calculated total from advanced dice inputs */
const updateAdvancedCalculatedTotal = () => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    const isLocked = lockedToggle && lockedToggle.checked;
    const diceInputs = document.querySelectorAll('.advanced-dice-input');
    let sum = 0;
    const diceValues = [];

    // Get all dice values for results calculation (always use all original values)
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        if (value > 0 && value <= 6) {
            diceValues.push(value);
        }
    });

    // Calculate sum based on state when locked
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        const state = input.dataset.state || 'neutral';

        if (isLocked) {
            // When locked, include only green dice
            if (state === 'green' && value > 0 && value <= 6) {
                sum += value;
            }
        } else {
            // When unlocked, include all dice
            if (value > 0 && value <= 6) {
                sum += value;
            }
        }
    });

    document.getElementById('advanced-calculated-total').textContent = sum;

    // Update exploration results when in advanced mode (always pass all original dice values)
    updateExplorationResults(diceValues);
};

/** Updates calculated total from individual dice */
const updateCalculatedTotal = () => {
    const diceInputs = document.querySelectorAll('.dice-input');
    let sum = 0;
    const diceValues = [];
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        sum += value;
        if (value > 0 && value <= 6) {
            diceValues.push(value);
        }
    });
    document.getElementById('calculated-total').textContent = sum;

    // Update exploration results when in individual mode
    updateExplorationResults(diceValues);
};

/** Updates exploration results display based on dice values */
const updateExplorationResults = (diceValues) => {
    const mode = document.querySelector('input[name="dice-input-mode"]:checked').value;

    // Update in both individual and advanced modes
    if (mode !== 'individual' && mode !== 'advanced') {
        return;
    }

    // Clear previous results
    const resultsList = document.getElementById('exploration-results-list');
    resultsList.innerHTML = '';

    if (mode === 'individual') {
        // Individual mode: show only the winner per Mordheim rules
        const result = analyzeExplorationDice(diceValues);

        const resultCard = document.createElement('div');
        resultCard.className = 'bg-slate-700 p-3 rounded-lg border border-slate-600';
        resultCard.innerHTML = `
            <div class="mb-2">
                <div class="text-sm text-slate-400 mb-1">Resultado:</div>
                <div class="text-lg font-bold text-white">${result.result}</div>
            </div>
            <div class="mb-2">
                <div class="text-sm text-slate-400 mb-1">Descripción:</div>
                <div class="text-slate-300 text-sm">${result.description}</div>
            </div>
            <div>
                <div class="text-sm text-slate-400 mb-1">Detalles:</div>
                <div class="text-slate-300 text-sm whitespace-pre-line">${result.details}</div>
            </div>
        `;
        resultsList.appendChild(resultCard);
    } else if (mode === 'advanced') {
        // Advanced mode: show all potential results with removal instructions
        const results = findAllExplorationResults(diceValues);

        // Determine if we're in locked mode
        const lockedToggle = document.getElementById('advanced-locked-toggle');
        const isLocked = lockedToggle && lockedToggle.checked;

        // Find the winner based on current dice values
        // When locked, use only green dice; when unlocked, use all dice
        let winnerDiceValues = diceValues;
        if (isLocked) {
            const diceInputs = document.querySelectorAll('.advanced-dice-input');
            winnerDiceValues = [];
            diceInputs.forEach(input => {
                const value = parseInt(input.value) || 0;
                const state = input.dataset.state || 'neutral';
                if (state === 'green' && value > 0 && value <= 6) {
                    winnerDiceValues.push(value);
                }
            });
        }
        const winner = analyzeExplorationDice(winnerDiceValues);

        // Generate HTML for each result
        results.forEach((result, index) => {
            const resultCard = document.createElement('div');
            let cardClass = 'bg-slate-700 p-3 rounded-lg border border-slate-600';

            // Highlight winner with green border when locked
            if (isLocked && result === winner) {
                cardClass = 'bg-slate-700 p-3 rounded-lg border-2 border-green-500';
            }

            resultCard.className = cardClass;

            // Add winner badge when locked
            let winnerBadge = '';
            if (isLocked && result === winner) {
                winnerBadge = `
                    <div class="inline-block px-2 py-1 bg-green-600 rounded text-white text-xs font-bold mb-2">
                        GANADOR
                    </div>
                `;
            }

            // Add Select/Reroll button (only for exact type results, not default)
            let selectButton = '';
            if (result.dice_requirement.type === 'exact') {
                // Check if result is achievable with current dice
                const requiredValue = result.dice_requirement.value;
                const requiredCount = result.dice_requirement.count;

                // Get original dice values from inputs (not filtered by state)
                const diceInputs = document.querySelectorAll('.advanced-dice-input');
                const allDiceValues = [];
                diceInputs.forEach(input => {
                    const value = parseInt(input.value) || 0;
                    if (value > 0 && value <= 6) {
                        allDiceValues.push(value);
                    }
                });

                // Simulate the selection: required dice + highest other dice that don't create a competing result
                const matchingDice = allDiceValues.filter(v => v === requiredValue);
                const otherDice = allDiceValues.filter(v => v !== requiredValue).sort((a, b) => b - a);
                const requiredDiceToKeep = matchingDice.slice(0, requiredCount);
                
                // Try to add other dice from highest to lowest, but skip if they would create a competing result
                const otherDiceToKeep = [];
                for (const die of otherDice) {
                    if (otherDiceToKeep.length >= 6 - requiredCount) break;
                    
                    const testSelection = [...requiredDiceToKeep, ...otherDiceToKeep, die];
                    const testResult = analyzeExplorationDice(testSelection);
                    
                    // Only add this die if it doesn't create a competing result
                    if (testResult.dice_requirement.type === 'exact' &&
                        testResult.dice_requirement.value === requiredValue &&
                        testResult.dice_requirement.count === requiredCount) {
                        otherDiceToKeep.push(die);
                    }
                    // If this die creates a competing result, skip it and try the next one
                }
                
                const simulatedSelection = [...requiredDiceToKeep, ...otherDiceToKeep];

                // Check what result would actually occur with this selection
                const actualResult = analyzeExplorationDice(simulatedSelection);
                const isAchievable = matchingDice.length >= requiredCount &&
                                   actualResult.dice_requirement.type === 'exact' &&
                                   actualResult.dice_requirement.value === requiredValue &&
                                   actualResult.dice_requirement.count === requiredCount;

                // Store result data as JSON in data attribute
                const resultData = JSON.stringify({
                    dice_requirement: result.dice_requirement
                });

                if (isAchievable) {
                    // Calculate what needs to be removed
                    const removalInstructions = calculateDiceToRemoveForResult(result, results, allDiceValues);
                    selectButton = `
                        <button class="select-result-btn w-full mt-3 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition" data-result-data='${resultData}'>
                            Seleccionar
                        </button>
                    `;
                } else {
                    selectButton = `
                        <button class="select-result-btn w-full mt-3 py-2 px-4 bg-gray-400 text-white font-bold rounded-lg cursor-not-allowed" disabled data-result-data='${resultData}'>
                            Seleccionar
                        </button>
                    `;
                }
            }

            resultCard.innerHTML = `
                ${winnerBadge}
                <div class="mb-2">
                    <div class="text-sm text-slate-400 mb-1">Resultado:</div>
                    <div class="text-lg font-bold text-white">${result.result}</div>
                </div>
                <div class="mb-2">
                    <div class="text-sm text-slate-400 mb-1">Descripción:</div>
                    <div class="text-slate-300 text-sm">${result.description}</div>
                </div>
                <div class="mb-2">
                    <div class="text-sm text-slate-400 mb-1">Detalles:</div>
                    <div class="text-slate-300 text-sm whitespace-pre-line">${result.details}</div>
                </div>
                ${selectButton}
            `;
            resultsList.appendChild(resultCard);
        });

        // Add event listeners to select buttons
        document.querySelectorAll('.select-result-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const resultData = JSON.parse(e.target.dataset.resultData);
                if (resultData) {
                    selectDiceForResult(resultData);
                }
            });
        });
    }

    // Show the results section
    document.getElementById('exploration-result').classList.remove('hidden');
};

/** Selects dice to achieve a specific exploration result while maximizing total */
const selectDiceForResult = (resultData) => {
    const lockedToggle = document.getElementById('advanced-locked-toggle');
    const diceInputs = document.querySelectorAll('.advanced-dice-input');

    // Lock if not already locked
    if (!lockedToggle.checked) {
        lockedToggle.checked = true;
        toggleAdvancedLocked();
    }

    const requiredValue = resultData.dice_requirement.value;
    const requiredCount = resultData.dice_requirement.count;

    // Get all dice with values
    const diceWithValues = [];
    diceInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        if (value > 0 && value <= 6) {
            diceWithValues.push({ input, value });
        }
    });

    // Separate matching and non-matching dice
    const matchingDice = diceWithValues.filter(d => d.value === requiredValue);
    const otherDice = diceWithValues.filter(d => d.value !== requiredValue).sort((a, b) => b.value - a.value);

    // Reset all to neutral first
    diceInputs.forEach(input => {
        input.dataset.state = 'neutral';
        input.classList.remove('bg-green-600', 'border-green-500', 'bg-red-600', 'border-red-500');
        input.classList.add('bg-slate-600', 'border-slate-500');
    });

    // Mark required matching dice as green
    const requiredMatching = matchingDice.slice(0, requiredCount);
    requiredMatching.forEach(dice => {
        dice.input.dataset.state = 'green';
        dice.input.classList.remove('bg-slate-600', 'border-slate-500');
        dice.input.classList.add('bg-green-600', 'border-green-500');
    });

    // Mark highest other dice as green that don't create competing results (up to 6 total green)
    const remainingSlots = 6 - requiredMatching.length;
    const otherDiceToKeep = [];
    for (const dice of otherDice) {
        if (otherDiceToKeep.length >= remainingSlots) break;
        
        // Test if adding this die would create a competing result
        const currentGreenDice = [...requiredMatching.map(d => d.value), ...otherDiceToKeep.map(d => d.value)];
        const testSelection = [...currentGreenDice, dice.value];
        const testResult = analyzeExplorationDice(testSelection);
        
        // Only add if it doesn't create a competing result
        if (testResult.dice_requirement.type === 'exact' &&
            testResult.dice_requirement.value === requiredValue &&
            testResult.dice_requirement.count === requiredCount) {
            otherDiceToKeep.push(dice);
            // Mark as green immediately
            dice.input.dataset.state = 'green';
            dice.input.classList.remove('bg-slate-600', 'border-slate-500');
            dice.input.classList.add('bg-green-600', 'border-green-500');
        }
        // If this die creates a competing result, skip it and try the next one
    }

    // Mark remaining matching dice as red (if any)
    const remainingMatching = matchingDice.slice(requiredCount);
    remainingMatching.forEach(dice => {
        dice.input.dataset.state = 'red';
        dice.input.classList.remove('bg-slate-600', 'border-slate-500');
        dice.input.classList.add('bg-red-600', 'border-red-500');
    });

    // Mark remaining other dice as red (only those not in otherDiceToKeep)
    const keptDiceSet = new Set(otherDiceToKeep);
    otherDice.forEach(dice => {
        if (!keptDiceSet.has(dice)) {
            dice.input.dataset.state = 'red';
            dice.input.classList.remove('bg-slate-600', 'border-slate-500', 'bg-green-600', 'border-green-500');
            dice.input.classList.add('bg-red-600', 'border-red-500');
        }
    });

    // Recalculate total
    updateAdvancedCalculatedTotal();
    
    // Calculate treasure automatically after selecting a result
    handleTreasureCalculation();
};

/** Updates dice input placeholders for mobile devices */
const updateMobilePlaceholders = () => {
    const isMobile = window.innerWidth <= 767; // Mobile breakpoint
    
    // Update individual dice inputs
    document.querySelectorAll('.dice-input').forEach((input) => {
        const diceIndex = input.dataset.diceIndex || (Array.from(document.querySelectorAll('.dice-input')).indexOf(input) + 1);
        input.placeholder = isMobile ? `D ${diceIndex}` : `Dado ${diceIndex}`;
    });
    
    // Update advanced dice inputs
    document.querySelectorAll('.advanced-dice-input').forEach((input, index) => {
        input.placeholder = isMobile ? `D ${index + 1}` : `Dado ${index + 1}`;
    });
};

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Update placeholders for mobile on load
    updateMobilePlaceholders();
    
    // Update placeholders on resize
    window.addEventListener('resize', updateMobilePlaceholders);
    
    // Calculate treasure button
    document.getElementById('calculate-treasure-btn').addEventListener('click', handleTreasureCalculation);

    // Dice input mode toggle
    document.querySelectorAll('input[name="dice-input-mode"]').forEach(radio => {
        radio.addEventListener('change', toggleDiceInputMode);
    });

    // Individual dice inputs
    document.querySelectorAll('.dice-input').forEach(input => {
        input.addEventListener('input', (e) => {
            let value = parseInt(e.target.value) || 0;
            // Enforce maximum of 6
            if (value > 6) {
                value = 6;
                e.target.value = 6;
            }
            updateCalculatedTotal();
        });
        input.addEventListener('focus', () => input.select());
    });

    const diceCountInput = document.getElementById('total-dice-count-input');
    diceCountInput.addEventListener('input', (e) => {
        let count = parseInt(e.target.value) || 0;
        // Enforce maximum of 10
        if (count > 10) {
            count = 10;
            e.target.value = 10;
        }
        if (count > 0 && count <= 10) {
            generateAdvancedDiceInputs(count);
        } else {
            document.getElementById('advanced-dice-inputs-container').classList.add('hidden');
            document.getElementById('advanced-dice-inputs').innerHTML = '';
        }
    });
    diceCountInput.addEventListener('focus', () => diceCountInput.select());

    // Advanced locked toggle
    document.getElementById('advanced-locked-toggle').addEventListener('change', toggleAdvancedLocked);

    // Maximize total button
    document.getElementById('maximize-total-btn').addEventListener('click', maximizeTotalDice);
});
