import {
    useLocalStorage,
    userId,
    currentWarband,
    warbands,
    setCurrentWarband,
    setWarbands,
    isLuckyItemsLimited,
    setIsLuckyItemsLimited,
    isUniversalHiringAccessActive,
    setIsUniversalHiringAccessActive,
    isIgnoreRacialMaximumsActive,
    setIsIgnoreRacialMaximumsActive
} from './state.js';
import {
    listenToWarbands as firebaseListenToWarbands,
    createNewWarband as firebaseCreateNewWarband,
    saveWarband as firebaseSaveWarband,
    auth,
    deleteWarband as firebaseDeleteWarband
} from './firebase.js';
import { calculateWarbandRating, showMessage, showConfirmationModal, getWarbandData, generateUUID, getOriginalName } from './utility.js';
import { HIRED_SWORDS, DRAMATIS_PERSONAE } from './data/index.js';
import { renderWarbandList, renderWarbandEditor, showListView } from './ui.js';
import { STATS_FIELDS } from './config.js';
import { initializeLedgerForWarband, recordManualIncome, recordManualExpense } from './Treasury/ledger.js';
import { trackWarbandAction, trackAnonymousWarbandAction, isCurrentUserAnonymous } from './analytics.js';

// Store the unsubscribe function for cleanup
let warbandsUnsubscribe = null;

/** Listens for real-time updates to the warbands collection */
export const listenToWarbands = () => {
    unsubscribeFromWarbands();

    if (useLocalStorage) {
        const localWarbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
        // Add storage location to local storage warbands
        const warbandsWithLocation = localWarbands.map(wb => ({
            ...wb,
            _storageLocation: 'Browser Cache'
        }));
        setWarbands(warbandsWithLocation);
        renderWarbandList(warbands);
        if (currentWarband) {
            const updatedWarband = warbands.find(w => w.id === currentWarband.id);
            if (updatedWarband) {
                setCurrentWarband(updatedWarband);
                renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
            } else {
                // Current warband was deleted
                setCurrentWarband(showListView(warbands));
            }
        }
        return;
    }

    // Listen for warband updates from Firebase
    warbandsUnsubscribe = firebaseListenToWarbands((updatedWarbands, error) => {
        if (error) {
            console.error("Error listening to warbands:", error);
            showMessage("Error al cargar las bandas.", 'error');
            showListView(warbands || []);
            return;
        }
        setWarbands(updatedWarbands || []);
        renderWarbandList(warbands);
        if (currentWarband && !warbands.find(w => w.id === currentWarband.id)) {
            if (recentlyCreatedWarbandIds.has(currentWarband.id)) {
                // Warband was just created and might not be in the initial snapshot yet; retain it
                warbands.push(currentWarband);
                renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
            } else {
                setCurrentWarband(showListView(warbands));
            }
        } else if (currentWarband) {
            setCurrentWarband(warbands.find(w => w.id === currentWarband.id) || currentWarband);
            renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
        } else {
            showListView(warbands);
        }
    });
};

/** Unsubscribes from warbands listeners (called on logout) */
export const unsubscribeFromWarbands = () => {
    if (warbandsUnsubscribe) {
        console.log("Unsubscribing from warbands listeners...");
        warbandsUnsubscribe();
        warbandsUnsubscribe = null;
    }
};

// Track recently created warbands to avoid duplicate access tracking
let recentlyCreatedWarbandIds = new Set();

/** Creates a new warband document */
export const createNewWarband = async (name, type, hideModalCallback, loadWarbandCallback, options = {}) => {
    if (!name || !type) {
        showMessage("El nombre y el tipo de banda son obligatorios.", 'error');
        return;
    }

    const newWarbandData = {
        id: generateUUID(),
        name,
        type,
        rating: 0,
        gc_treasury: 500,
        treasure: 0,
        player_id: useLocalStorage ? 'local' : userId,
        members: [],
        stored_equipment: [],
        notes: `Campaña iniciada el ${new Date().toLocaleDateString()}`,
        pre_game: true,
        lucky_items_limited: false,
        ignore_racial_maximums: false,
        // Initialize ledger fields
        ledger_entries: [],
        total_income: 0,
        total_expenses: 0,
        games_played: 0
    };

    // Store Ostermark skill set selection if provided
    if (options.skillSet) {
        newWarbandData.skill_set = options.skillSet;
    }

    // Set default alignment from warband data and check for special starting gold rules
    const warbandData = getWarbandData(type);
    if (warbandData && warbandData.alignment) {
        newWarbandData.alignment = warbandData.alignment;
    }
    if (warbandData && warbandData.special_rules) {
        newWarbandData.special_rules = warbandData.special_rules;
    }
    if (warbandData && warbandData.special_rules) {
        // Check for Mercenaries special rules that grant 600 starting gold
        if (warbandData.special_rules.includes("Mercenaries (Marienburg)") || 
            warbandData.special_rules.includes("Mercenaries (Trantios)")) {
            newWarbandData.gc_treasury = 600;
        }
    }

    console.log("Creating warband - useLocalStorage:", useLocalStorage, "userId:", userId);
    console.log("Warband data being sent:", newWarbandData);

    if (useLocalStorage) {
        const id = generateUUID();
        newWarbandData.id = id;
        newWarbandData._isV2 = true; // Use V2 format for new localStorage warbands
        newWarbandData._storageLocation = 'Browser Cache';
        warbands.push(newWarbandData);
        localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
        showMessage(`¡Banda "${name}" creada con éxito!`);
        trackWarbandAction('created', name, type, true);
        hideModalCallback('new-warband-modal');
        loadWarbandCallback(id);
        return;
    }

    try {
        const warbandId = await firebaseCreateNewWarband(newWarbandData);
        console.log("Firebase V2 warband creation successful. Document ID:", warbandId);
        showMessage(`¡Banda "${name}" creada con éxito!`);

        // Track warband creation with type information
        const isAnonymous = isCurrentUserAnonymous();
        trackWarbandAction('created', name, type, isAnonymous);

        // Add to recently created set to prevent duplicate access tracking
        recentlyCreatedWarbandIds.add(warbandId);
        setTimeout(() => recentlyCreatedWarbandIds.delete(warbandId), 5000);

        newWarbandData.id = warbandId;
        newWarbandData._storageLocation = 'Cloud Firestore';
        newWarbandData._isV2 = true;

        // Immediately update in-memory warbands list so loadWarband can find it instantly
        const existingIdx = warbands.findIndex(w => w.id === warbandId);
        if (existingIdx !== -1) {
            warbands[existingIdx] = newWarbandData;
        } else {
            warbands.push(newWarbandData);
        }

        hideModalCallback('new-warband-modal');
        // Load the newly created warband
        loadWarbandCallback(warbandId);
    } catch (error) {
        console.error("Error creating warband:", error);
        console.error("Full error details:", error.stack);
        showMessage("Error al crear la banda.", 'error');
        // Check if we should fall back to local storage
        if (error.message.includes("Firebase") || error.message.includes("auth")) {
            console.warn("Firebase error detected, attempting local storage fallback...");
            // Fallback to local storage
            const fallbackId = generateUUID();
            warbands.push({...newWarbandData, id: fallbackId, _isV2: true, _storageLocation: 'Browser Cache'});
            localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
            showMessage(`Banda "${name}" creada en la memoria local como alternativa.`, 'warning');
            trackWarbandAction('created', name, type, true);
            loadWarbandCallback(fallbackId);
        }
    }
};

/** Updates the current warband document */
export const saveWarband = async function() {
    if (!currentWarband) return;

    // Update lucky items limit from state
    currentWarband.lucky_items_limited = isLuckyItemsLimited;

    // Update universal hiring access from state
    currentWarband.universal_hiring_access = isUniversalHiringAccessActive;

    // Update ignore racial maximums from state
    currentWarband.ignore_racial_maximums = isIgnoreRacialMaximumsActive;

    // Re-calculate rating and update notes from UI
    currentWarband.rating = calculateWarbandRating(currentWarband.members);
    currentWarband.notes = document.getElementById('warband-notes')?.value || currentWarband.notes;
    currentWarband.stored_equipment = currentWarband.stored_equipment || [];
    // Ensure pre_game field is maintained
    currentWarband.pre_game = currentWarband.pre_game !== false; // Default to true if not set

    // Always keep in-memory warbands list in sync
    const index = warbands.findIndex(w => w.id === currentWarband.id);
    if (index !== -1) {
        warbands[index] = currentWarband;
    } else {
        warbands.push(currentWarband);
    }
    try {
        localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
    } catch (e) {
        console.warn("Error updating localStorage backup:", e);
    }

    // Always immediately update the UI so new fighters, equipment, or edits appear instantly
    renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);

    if (useLocalStorage) {
        return;
    }

    try {
        await firebaseSaveWarband(currentWarband);
    } catch (error) {
        console.error("Error saving warband:", error);
        showMessage("Error al guardar los datos de la banda.", 'error');
    }
}

/** Loads a warband into the editor view */
export const loadWarband = (warbandId) => {
    let warbandToLoad = warbands.find(w => w.id === warbandId);
    if (!warbandToLoad) {
        // Fallback: check localStorage
        try {
            const local = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
            warbandToLoad = local.find(w => w.id === warbandId);
            if (warbandToLoad) {
                warbands.push(warbandToLoad);
            }
        } catch (e) {}
    }
    if (warbandToLoad) {
        setCurrentWarband(warbandToLoad);

        // Track warband access with type information (skip if recently created)
        const isAnonymous = isCurrentUserAnonymous();
        if (!recentlyCreatedWarbandIds.has(warbandToLoad.id)) {
            trackWarbandAction('accessed', warbandToLoad.name, warbandToLoad.type, isAnonymous);
        }
        // Ensure stored_equipment is an array for old/new warbands
        if (!currentWarband.stored_equipment) {
            currentWarband.stored_equipment = [];
        }
        // Ensure treasure field exists for old warbands
        if (currentWarband.treasure === undefined) {
            currentWarband.treasure = 0;
        }
        // Set lucky items limit state from warband data, default to false for old warbands
        setIsLuckyItemsLimited(currentWarband.lucky_items_limited || false);
        // Ensure the field exists for old warbands
        if (currentWarband.lucky_items_limited === undefined) {
            currentWarband.lucky_items_limited = false;
        }

        // Set universal hiring access state from warband data, default to false for old warbands
        setIsUniversalHiringAccessActive(currentWarband.universal_hiring_access || false);
        // Ensure the field exists for old warbands
        if (currentWarband.universal_hiring_access === undefined) {
            currentWarband.universal_hiring_access = false;
        }

        // Set ignore racial maximums state from warband data, default to false for old warbands
        setIsIgnoreRacialMaximumsActive(currentWarband.ignore_racial_maximums || false);
        // Ensure the field exists for old warbands
        if (currentWarband.ignore_racial_maximums === undefined) {
            currentWarband.ignore_racial_maximums = false;
        }

        // Ensure _isV2 flag exists for localStorage warbands (default to false for old warbands)
        if (currentWarband._isV2 === undefined) {
            currentWarband._isV2 = false;
        }

        // Initialize ledger for existing warbands (migration)
        initializeLedgerForWarband(currentWarband);

        // Ensure games_played field exists for old warbands
        if (currentWarband.games_played === undefined) {
            currentWarband.games_played = 0;
        }

        // Migration: Ensure starting_xp field exists for all fighters
        if (currentWarband.members) {
            currentWarband.members.forEach(member => {
                if (member.starting_xp === undefined) {
                    member.starting_xp = member.xp || 0; // Default to current XP for existing fighters
                }
                // Migration: Set promotion_advancements for existing TLGT heroes.
                // The TLGT promotion grants free advancements (hero pick + optional spell) that
                // should not count against threshold-earned advancement slots.
                if (member.type === 'Hero' && 
                    Array.isArray(member.skills) && 
                    member.skills.includes('Lads got talent') && 
                    member.promotion_advancements === undefined) {
                    
                    const rules = typeof member.special_rules === 'string' 
                        ? member.special_rules.split(';').map(r => r.trim()) 
                        : [];
                    const hasSkryreSpell = rules.includes('Magic of the Horned Rat');
                    const hasHarnessedSpell = rules.some(r => [
                        'Lesser Magic', 'Elemental Lore of Water', 'Elemental Lore of Fire', 
                        'Elemental Lore of Earth', 'Elemental Lore of Air'
                    ].includes(r));
                    
                    member.promotion_advancements = (hasSkryreSpell || hasHarnessedSpell) ? 2 : 1;
                }
                // Migration: Heal missing originalName for Hired Swords and Dramatis Personae (e.g. after a rename)
                if ((member.type === 'Hired Sword' || member.type === 'Dramatis Personae') && !member.originalName) {
                    const dataArray = member.type === 'Hired Sword' ? HIRED_SWORDS : DRAMATIS_PERSONAE;
                    member.originalName = getOriginalName(member, dataArray);
                }
                // Migration: Ensure special_rules is a semicolon-separated string (never an array)
                if (member.special_rules && Array.isArray(member.special_rules)) {
                    member.special_rules = member.special_rules.join('; ');
                }
            });
        }

        // Recalculate rating on load to ensure it reflects the current formula
        currentWarband.rating = calculateWarbandRating(currentWarband.members);

        renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
    }
};

/** Confirms and deletes a warband from the list view */
export const confirmDeleteWarbandFromList = (warbandId, warbandName) => {
    showConfirmationModal(`¿Estás seguro de que deseas eliminar permanentemente la banda "${warbandName}"? Esta acción no se puede deshacer.`, async () => {
        const warbandToDelete = warbands.find(w => w.id === warbandId);
        const type = warbandToDelete ? warbandToDelete.type : '';

        if (useLocalStorage) {
            trackWarbandAction('deleted', warbandName, type, true);
            const updatedWarbands = warbands.filter(w => w.id !== warbandId);
            setWarbands(updatedWarbands);
            localStorage.setItem('mordheim_warbands', JSON.stringify(updatedWarbands));
            showMessage(`Banda "${warbandName}" eliminada con éxito.`);
            if (currentWarband && currentWarband.id === warbandId) {
                setCurrentWarband(showListView(updatedWarbands));
            } else {
                renderWarbandList(updatedWarbands);
            }
            return;
        }

        try {
            trackWarbandAction('deleted', warbandName, type, false);
            await firebaseDeleteWarband(warbandId);
            
            // Immediate state & UI update for cloud/authenticated users
            const updatedWarbands = warbands.filter(w => w.id !== warbandId);
            setWarbands(updatedWarbands);
            localStorage.setItem('mordheim_warbands', JSON.stringify(updatedWarbands));
            
            showMessage(`Banda "${warbandName}" eliminada con éxito.`);
            if (currentWarband && currentWarband.id === warbandId) {
                setCurrentWarband(showListView(updatedWarbands));
            } else {
                renderWarbandList(updatedWarbands);
            }
        } catch (error) {
            console.error("Error deleting warband:", error);
            showMessage(`Error al eliminar la banda: ${error.message}`, 'error');
        }
    });
};

/** Moves a fighter up in the roster order */
export const moveFighterUp = async (fighterId) => {
    if (!currentWarband || !currentWarband.members) return;

    const currentIndex = currentWarband.members.findIndex(f => f.id === fighterId);
    if (currentIndex <= 0) return; // Already at the top

    // Swap with the previous fighter
    [currentWarband.members[currentIndex], currentWarband.members[currentIndex - 1]] =
    [currentWarband.members[currentIndex - 1], currentWarband.members[currentIndex]];

    // Re-render the roster
    const { renderWarbandEditor } = await import('./ui.js');
    const { getWarbandData } = await import('./utility.js');
    const { STATS_FIELDS } = await import('./config.js');
    renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);

    // Auto-save the changes
    await saveWarband();
};

/** Moves a fighter down in the roster order */
export const moveFighterDown = async (fighterId) => {
    if (!currentWarband || !currentWarband.members) return;

    const currentIndex = currentWarband.members.findIndex(f => f.id === fighterId);
    if (currentIndex === -1 || currentIndex >= currentWarband.members.length - 1) return; // Already at the bottom

    // Swap with the next fighter
    [currentWarband.members[currentIndex], currentWarband.members[currentIndex + 1]] =
    [currentWarband.members[currentIndex + 1], currentWarband.members[currentIndex]];

    // Re-render the roster
    const { renderWarbandEditor } = await import('./ui.js');
    const { getWarbandData } = await import('./utility.js');
    const { STATS_FIELDS } = await import('./config.js');
    renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);

    // Auto-save the changes
    await saveWarband();
};

/** Manages adding/subtracting gold crowns from the treasury */
export const updateTreasury = async (action) => {
    if (!currentWarband) return showMessage("Por favor, carga una banda primero.", 'error');
    const input = document.getElementById('gc-input');
    const amount = parseInt(input.value) || 0;

    if (amount <= 0) return showMessage("Por favor, introduce una cantidad positiva de Coronas de Oro.", 'error');

    if (action === 'add') {
        currentWarband.gc_treasury += amount;
        // Record manual income transaction
        await recordManualIncome(amount, 'Ingreso manual en la tesorería');
        showMessage(`Añadidas ${amount} CO a la tesorería.`);
    } else if (action === 'subtract') {
        if (currentWarband.gc_treasury < amount) {
            return showMessage(`Coronas de Oro insuficientes. La tesorería solo tiene ${currentWarband.gc_treasury} CO.`, 'error');
        }
        currentWarband.gc_treasury -= amount;
        // Record manual expense transaction
        await recordManualExpense(amount, 'Retirada manual de la tesorería');
        showMessage(`Gastadas ${amount} CO de la tesorería.`);
    }

    input.value = ''; // Clear input
    await saveWarband(); // Save the updated treasury
};

/** Manages adding/subtracting treasure from the treasury */
export const updateTreasure = async (action) => {
    if (!currentWarband) return showMessage("Por favor, carga una banda primero.", 'error');
    const input = document.getElementById('treasure-input');
    const amount = parseInt(input.value) || 0;

    if (amount <= 0) return showMessage("Por favor, introduce una cantidad positiva de Tesoro.", 'error');

    if (action === 'add') {
        currentWarband.treasure += amount;
        showMessage(`Añadido ${amount} de Tesoro a la tesorería.`);
    } else if (action === 'subtract') {
        if (currentWarband.treasure < amount) {
            return showMessage(`Tesoro insuficiente. La tesorería solo tiene ${currentWarband.treasure} de Tesoro.`, 'error');
        }
        currentWarband.treasure -= amount;
        showMessage(`Gastado ${amount} de Tesoro de la tesorería.`);
    }

    input.value = ''; // Clear input
    await saveWarband(); // Save the updated treasury
};

/** Removes treasure from the treasury with ledger integration */
export const removeTreasure = async () => {
    if (!currentWarband) return showMessage("Por favor, carga una banda primero.", 'error');
    const input = document.getElementById('treasure-input');
    const amount = parseInt(input.value) || 0;

    if (amount <= 0) return showMessage("Por favor, introduce una cantidad positiva de Tesoro.", 'error');

    if (currentWarband.treasure < amount) {
        return showMessage(`Tesoro insuficiente. La tesorería solo tiene ${currentWarband.treasure} de Tesoro.`, 'error');
    }

    currentWarband.treasure -= amount;

    // Record the treasure removal transaction in the ledger
    const { createTransaction, addTransaction, TRANSACTION_TYPES, TRANSACTION_CATEGORIES } = await import('./Treasury/ledger.js');
    const transaction = createTransaction(
        TRANSACTION_TYPES.EXPENSE,
        TRANSACTION_CATEGORIES.OTHER_EXPENSE,
        amount,
        `Retirado(s) ${amount} fragmento(s) de piedra bruja`,
        {
            treasure_removed: amount
        }
    );
    addTransaction(transaction);

    input.value = ''; // Clear input
    await saveWarband(); // Save the updated treasury
    showMessage(`Se ha(n) retirado ${amount} de Tesoro de la tesorería.`, 'success');
};

/** Renames an existing warband */
export const renameWarband = async (warbandId, newName) => {
    if (!newName || newName.trim() === '') {
        showMessage("El nombre de la banda no puede estar vacío.", 'error');
        return;
    }

    const warbandToRename = warbands.find(w => w.id === warbandId);
    if (!warbandToRename) {
        showMessage("Banda no encontrada.", 'error');
        return;
    }

    const trimmedName = newName.trim();
    
    // Check if another warband already has this name
    const existingWarband = warbands.find(w => w.id !== warbandId && w.name === trimmedName);
    if (existingWarband) {
        showMessage("Ya existe otra banda con este nombre.", 'error');
        return;
    }

    try {
        if (useLocalStorage) {
            // Update local storage
            const localWarbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
            const updatedWarbands = localWarbands.map(w => 
                w.id === warbandId ? { ...w, name: trimmedName } : w
            );
            localStorage.setItem('mordheim_warbands', JSON.stringify(updatedWarbands));
            
            // Update state
            const updatedWarbandsWithLocation = updatedWarbands.map(wb => ({
                ...wb,
                _storageLocation: 'Browser Cache'
            }));
            setWarbands(updatedWarbandsWithLocation);
            
            // Update current warband if it's the one being renamed
            if (currentWarband && currentWarband.id === warbandId) {
                setCurrentWarband({ ...currentWarband, name: trimmedName });
                renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
            }
        } else {
            // Update Firebase
            warbandToRename.name = trimmedName;
            await firebaseSaveWarband(warbandToRename);
            
            // Update current warband if it's the one being renamed
            if (currentWarband && currentWarband.id === warbandId) {
                setCurrentWarband({ ...currentWarband, name: trimmedName });
                renderWarbandEditor(currentWarband, getWarbandData, STATS_FIELDS);
            }
        }
        
        renderWarbandList(warbands);
        showMessage("Banda renombrada con éxito.", 'success');
        
        // Track analytics
        trackWarbandAction('renamed', trimmedName, warbandToRename.type, isCurrentUserAnonymous());
    } catch (error) {
        console.error('Error renaming warband:', error);
        showMessage("Error al renombrar la banda.", 'error');
    }
};

/** Creates a copy of an existing warband */
export const copyWarband = async (warbandId) => {
    const originalWarband = warbands.find(w => w.id === warbandId);
    if (!originalWarband) {
        showMessage("Banda no encontrada.", 'error');
        return;
    }

    try {
        // Create a deep copy of the original warband
        let copiedWarband = JSON.parse(JSON.stringify(originalWarband));
        
        // Generate new ID and modify name
        copiedWarband.id = generateUUID();
        copiedWarband.name = `${originalWarband.name} (Copia)`;
        
        // Ensure V2 flag is set
        copiedWarband._isV2 = true;
        
        // Update player_id for current user - ensure we get the current authenticated user ID
        const currentUserId = useLocalStorage ? 'local' : (auth.currentUser ? auth.currentUser.uid : userId);
        copiedWarband.player_id = currentUserId;
        
        // Reset campaign-specific fields
        copiedWarband.notes = `Campaña iniciada el ${new Date().toLocaleDateString()} (Copia de "${originalWarband.name}")`;
        copiedWarband.pre_game = true;
        
        if (useLocalStorage) {
            // Save to localStorage
            copiedWarband._storageLocation = 'Browser Cache';
            warbands.push(copiedWarband);
            localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
            showMessage(`¡Banda "${copiedWarband.name}" copiada con éxito!`);
            
            // Track warband copy for local storage
            trackWarbandAction('copied', copiedWarband.name, copiedWarband.type, true);

            // Refresh the warband list to show the new copy
            renderWarbandList(warbands);
            
            // Load the copied warband
            loadWarband(copiedWarband.id);
        } else {
            // Save to Firebase using V2 function
            console.log("About to create copied warband with data:", copiedWarband);
            console.log("Current userId from firebase:", userId);
            console.log("Current auth.currentUser.uid:", auth.currentUser?.uid);
            console.log("Warband player_id:", copiedWarband.player_id);
            await firebaseCreateNewWarband(copiedWarband);
            showMessage(`¡Banda "${copiedWarband.name}" copiada con éxito!`);
            
            // Track warband copy with type information
            const isAnonymous = isCurrentUserAnonymous();
            trackWarbandAction('copied', copiedWarband.name, copiedWarband.type, isAnonymous);
            
            // Add to recently created set to prevent duplicate access tracking
            recentlyCreatedWarbandIds.add(copiedWarband.id);
            setTimeout(() => recentlyCreatedWarbandIds.delete(copiedWarband.id), 5000);
            
            copiedWarband._storageLocation = 'Cloud Firestore';
            copiedWarband._isV2 = true;
            const existingIdx = warbands.findIndex(w => w.id === copiedWarband.id);
            if (existingIdx !== -1) {
                warbands[existingIdx] = copiedWarband;
            } else {
                warbands.push(copiedWarband);
            }

            // Refresh the warband list to show the new copy
            renderWarbandList(warbands);

            // Load the copied warband
            loadWarband(copiedWarband.id);
        }
        
    } catch (error) {
        console.error("Error copying warband:", error);
        showMessage("Error al copiar la banda.", 'error');
    }
};

/** Export a single warband as a downloadable JSON file */
export const exportWarbandJSON = (warbandId) => {
    const warband = warbands.find(w => w.id === warbandId);
    if (!warband) {
        showMessage("No se ha encontrado la banda para exportar.", 'error');
        return;
    }
    const cleanName = warband.name.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]/g, '_');
    const blob = new Blob([JSON.stringify(warband, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Banda_${cleanName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage(`Banda "${warband.name}" exportada a JSON con éxito.`);
};

/** Export all warbands as a single backup JSON file */
export const exportAllWarbandsJSON = () => {
    if (!warbands || warbands.length === 0) {
        showMessage("No hay bandas para exportar.", 'error');
        return;
    }
    const blob = new Blob([JSON.stringify(warbands, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mordheim_Todas_Las_Bandas_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMessage(`Todas las bandas (${warbands.length}) exportadas con éxito.`);
};

/** Import one or multiple warbands from a JSON file */
export const importWarbandJSON = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = JSON.parse(e.target.result);
            const toImport = Array.isArray(data) ? data : [data];
            const currentUserId = useLocalStorage ? 'local' : (auth.currentUser ? auth.currentUser.uid : userId);
            let count = 0;

            for (const wb of toImport) {
                if (wb && wb.name && wb.type) {
                    wb.id = generateUUID();
                    wb._isV2 = true;
                    wb.player_id = currentUserId;

                    if (useLocalStorage) {
                        wb._storageLocation = 'Browser Cache';
                        warbands.push(wb);
                    } else {
                        await firebaseCreateNewWarband(wb);
                        wb._storageLocation = 'Cloud Firestore';
                        const existingIdx = warbands.findIndex(w => w.id === wb.id);
                        if (existingIdx !== -1) {
                            warbands[existingIdx] = wb;
                        } else {
                            warbands.push(wb);
                        }
                    }
                    count++;
                }
            }

            if (count > 0) {
                if (useLocalStorage) {
                    localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
                }
                renderWarbandList(warbands);
                showMessage(`¡Se han importado ${count} banda(s) con éxito!`);
            } else {
                showMessage("El archivo no contenía ninguna banda válida.", 'error');
            }
        } catch (err) {
            console.error("Error al importar JSON:", err);
            showMessage("Error al procesar el archivo JSON: " + err.message, 'error');
        }
    };
    reader.readAsText(file);
};

