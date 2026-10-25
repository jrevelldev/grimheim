/**
 * Firebase Offline / Local Storage Adapter for Rosterheim Local
 * Allows Rosterheim to run completely offline without needing remote Firebase servers.
 */

import { WARBANDS_V2_COLLECTION_PATH } from './config.js';
import { generateUUID } from './utility.js';

let db = null;
let auth = null;
let userId = 'local';

const initFirebase = (onAuthStateChangedCallback) => {
    return new Promise((resolve) => {
        console.log("Rosterheim Local - Modo sin conexión inicializado.");
        const localUser = {
            uid: 'local',
            isAnonymous: true,
            email: 'local@rosterheim.local'
        };
        if (typeof onAuthStateChangedCallback === 'function') {
            onAuthStateChangedCallback(localUser);
        }
        resolve({ db: null, auth: null });
    });
};

const createNewWarband = async (newWarbandData) => {
    const warbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
    const warbandId = newWarbandData.id || generateUUID();
    newWarbandData.id = warbandId;
    newWarbandData._isV2 = true;
    newWarbandData._storageLocation = 'Browser Cache';
    warbands.push(newWarbandData);
    localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
    return warbandId;
};

const saveWarband = async (warband) => {
    const warbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
    const index = warbands.findIndex(w => w.id === warband.id);
    if (index !== -1) {
        warbands[index] = { ...warband, _isV2: true, _storageLocation: 'Browser Cache' };
    } else {
        warbands.push({ ...warband, _isV2: true, _storageLocation: 'Browser Cache' });
    }
    localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
};

const listenToWarbands = (callback) => {
    const warbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
    callback(warbands.map(wb => ({ ...wb, _storageLocation: 'Browser Cache', _isV2: true })));
    return () => {};
};

const deleteWarband = async (warbandId) => {
    let warbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
    warbands = warbands.filter(w => w.id !== warbandId);
    localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
};

const loginWithEmailPassword = async () => ({ user: { uid: 'local' } });
const registerWithEmailPassword = async () => ({ user: { uid: 'local' } });
const loginWithGoogle = async () => ({ user: { uid: 'local' } });
const logout = async () => {};
const resetPassword = async () => {};

export {
    initFirebase,
    listenToWarbands,
    createNewWarband,
    saveWarband,
    deleteWarband,
    loginWithEmailPassword,
    registerWithEmailPassword,
    loginWithGoogle,
    logout,
    resetPassword,
    db,
    auth,
    userId
};
