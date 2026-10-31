/**
 * Firebase Integration for Grimheim
 * Connects with Firebase Authentication and Cloud Firestore for real-time cloud sync.
 * Runs completely serverless (compatible with GitHub Pages) without needing a database server.
 */

import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    deleteDoc,
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

import { generateUUID } from './utility.js';

export const firebaseConfig = {
    apiKey: "AIzaSyCfJcrcw0cEfWhPFJewMkrQk5GN6LCO01I",
    authDomain: "grimheim-873b4.firebaseapp.com",
    projectId: "grimheim-873b4",
    storageBucket: "grimheim-873b4.firebasestorage.app",
    messagingSenderId: "231606045100",
    appId: "1:231606045100:web:c71fdff95b479ce000d209"
};

let app = null;
let auth = null;
let db = null;
let currentUser = null;
let userId = 'local';
let initialCardSettingsSynced = false;
let lastSavedCardSettingsSig = '';

const ensureFirebaseInstances = () => {
    try {
        if (!app) {
            app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        }
        if (!auth && app) {
            auth = getAuth(app);
        }
        if (!db && app) {
            db = getFirestore(app);
        }
    } catch (e) {
        console.warn("No se pudo asegurar instancia de Firebase:", e);
    }
    return { app, auth, db };
};

const getEffectiveUserId = () => {
    ensureFirebaseInstances();
    if (auth && auth.currentUser) {
        return auth.currentUser.uid;
    }
    return userId;
};

/**
 * Sanitizes object so Firestore doesn't reject undefined values
 */
const sanitizeForFirestore = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
        return value === undefined ? null : value;
    }));
};

/**
 * Initializes Firebase App, Auth and Firestore
 */
const initFirebase = (onAuthStateChangedCallback) => {
    return new Promise((resolve) => {
        try {
            ensureFirebaseInstances();

            let initialResolved = false;

            onAuthStateChanged(auth, (user) => {
                currentUser = user;
                if (user) {
                    userId = user.uid;
                    console.log("Firebase Auth: Usuario conectado:", user.email || user.uid);
                } else {
                    userId = 'local';
                    console.log("Firebase Auth: Sin usuario conectado");
                }
                if (typeof onAuthStateChangedCallback === 'function') {
                    onAuthStateChangedCallback(user);
                }
                if (!initialResolved) {
                    initialResolved = true;
                    resolve({ db, auth, user });
                }
            });
        } catch (err) {
            console.error("Error al inicializar Firebase SDK:", err);
            resolve({ db: null, auth: null, user: null });
        }
    });
};

/**
 * Saves card layouts and custom card deck to Firestore so PC and mobile stay in sync
 */
const saveCardSettingsToCloud = async (layoutsObj = null, customDeckObj = null) => {
    const uid = getEffectiveUserId();
    if (!db || !uid || uid === 'local') return;
    try {
        // Set flag synchronously BEFORE setDoc so local onSnapshot never re-triggers initial merge
        initialCardSettingsSynced = true;
        localStorage.setItem('grimheim_card_layouts_cloud_initialized', '1');

        const layouts = layoutsObj !== null
            ? layoutsObj
            : JSON.parse(localStorage.getItem('grimheim_fighter_card_layouts') || '{}');
        const customDeck = customDeckObj !== null
            ? customDeckObj
            : JSON.parse(localStorage.getItem('grimheim_builder_custom_cards') || '{"name":"Custom Card Deck","members":[]}');

        const sig = JSON.stringify({ l: layouts, d: customDeck });
        if (sig === lastSavedCardSettingsSig) {
            return;
        }
        lastSavedCardSettingsSig = sig;

        const payload = sanitizeForFirestore({
            id: '__card_settings__',
            _isCardSettings: true,
            card_layouts: layouts,
            custom_deck: customDeck,
            updatedAt: Date.now()
        });
        const docRef = doc(db, 'users', uid, 'warbands_v2', '__card_settings__');
        await setDoc(docRef, payload);
    } catch (e) {
        console.warn("Error al sincronizar ajustes de cartas en Firestore:", e);
    }
};

if (typeof window !== 'undefined') {
    window.addEventListener('grimheim:save-card-layouts-cloud', (e) => {
        saveCardSettingsToCloud(e.detail || null, null);
    });
    window.addEventListener('grimheim:card-deck-updated', (e) => {
        saveCardSettingsToCloud(null, e.detail || null);
    });
}

/**
 * Listens to warbands for the current user in Firestore
 */
const listenToWarbands = (callback) => {
    const uid = getEffectiveUserId();
    if (db && uid && uid !== 'local') {
        try {
            const colRef = collection(db, 'users', uid, 'warbands_v2');
            return onSnapshot(colRef, (snapshot) => {
                const warbands = [];
                let cloudCardSettings = null;

                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    if (docSnap.id === '__card_settings__' || data?._isCardSettings) {
                        cloudCardSettings = data;
                        return;
                    }
                    warbands.push({
                        ...data,
                        id: docSnap.id,
                        _storageLocation: 'Cloud Firestore',
                        _isV2: true
                    });
                });

                // Sync card layouts and custom card deck across devices without triggering write loops
                try {
                    const currentLayoutsRaw = localStorage.getItem('grimheim_fighter_card_layouts') || '{}';
                    const currentDeckRaw = localStorage.getItem('grimheim_builder_custom_cards') || '{"name":"Custom Card Deck","members":[]}';
                    const localLayouts = JSON.parse(currentLayoutsRaw);
                    const localDeck = JSON.parse(currentDeckRaw);
                    const hasLocalLayouts = Object.keys(localLayouts).length > 0;
                    const hasLocalDeck = Array.isArray(localDeck?.members) && localDeck.members.length > 0;

                    if (!cloudCardSettings) {
                        if (!initialCardSettingsSynced && (hasLocalLayouts || hasLocalDeck)) {
                            initialCardSettingsSynced = true;
                            localStorage.setItem('grimheim_card_layouts_cloud_initialized', '1');
                            saveCardSettingsToCloud(localLayouts, localDeck);
                        }
                    } else {
                        const cloudLayouts = cloudCardSettings.card_layouts || {};
                        const cloudDeck = cloudCardSettings.custom_deck || { name: 'Custom Card Deck', members: [] };
                        const wasInitialized = localStorage.getItem('grimheim_card_layouts_cloud_initialized') === '1' || initialCardSettingsSynced;

                        initialCardSettingsSynced = true;
                        localStorage.setItem('grimheim_card_layouts_cloud_initialized', '1');

                        if (!wasInitialized && (hasLocalLayouts || hasLocalDeck)) {
                            const mergedLayouts = { ...cloudLayouts, ...localLayouts };
                            const mergedDeck = (hasLocalDeck && (!cloudDeck.members || cloudDeck.members.length === 0))
                                ? localDeck
                                : cloudDeck;
                            const layoutsStr = JSON.stringify(mergedLayouts);
                            const deckStr = JSON.stringify(mergedDeck);
                            localStorage.setItem('grimheim_fighter_card_layouts', layoutsStr);
                            localStorage.setItem('rosterheim_fighter_card_layouts', layoutsStr);
                            localStorage.setItem('grimheim_builder_custom_cards', deckStr);
                            localStorage.setItem('rosterheim_builder_custom_cards', deckStr);

                            if (layoutsStr !== JSON.stringify(cloudLayouts) || deckStr !== JSON.stringify(cloudDeck)) {
                                saveCardSettingsToCloud(mergedLayouts, mergedDeck);
                            } else {
                                lastSavedCardSettingsSig = JSON.stringify({ l: mergedLayouts, d: mergedDeck });
                            }
                            window.dispatchEvent(new CustomEvent('grimheim:card-settings-synced'));
                        } else {
                            const layoutsStr = JSON.stringify(cloudLayouts);
                            const deckStr = JSON.stringify(cloudDeck);
                            lastSavedCardSettingsSig = JSON.stringify({ l: cloudLayouts, d: cloudDeck });
                            if (layoutsStr !== currentLayoutsRaw || deckStr !== currentDeckRaw) {
                                localStorage.setItem('grimheim_fighter_card_layouts', layoutsStr);
                                localStorage.setItem('rosterheim_fighter_card_layouts', layoutsStr);
                                localStorage.setItem('grimheim_builder_custom_cards', deckStr);
                                localStorage.setItem('rosterheim_builder_custom_cards', deckStr);
                                window.dispatchEvent(new CustomEvent('grimheim:card-settings-synced'));
                            }
                        }
                    }
                } catch (syncErr) {
                    console.warn("Error procesando sincronización de cartas:", syncErr);
                }

                // Update local storage backup
                localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
                callback(warbands, null);
            }, (error) => {
                console.warn("Firestore onSnapshot error, usando caché local:", error);
                const local = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
                callback(local, error);
            });
        } catch (e) {
            console.warn("Error al suscribirse a Firestore:", e);
        }
    }

    // LocalStorage fallback
    const local = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
    callback(local.map(wb => ({ ...wb, _storageLocation: 'Browser Cache', _isV2: true })), null);
    return () => {};
};

/**
 * Creates a new warband document in Firestore
 */
const createNewWarband = async (newWarbandData) => {
    const warbandId = newWarbandData.id || generateUUID();
    newWarbandData.id = warbandId;
    newWarbandData._isV2 = true;

    const uid = getEffectiveUserId();
    if (db && uid && uid !== 'local') {
        newWarbandData._storageLocation = 'Cloud Firestore';
        const docRef = doc(db, 'users', uid, 'warbands_v2', warbandId);
        await setDoc(docRef, sanitizeForFirestore(newWarbandData));
    } else {
        newWarbandData._storageLocation = 'Browser Cache';
        const warbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
        warbands.push(newWarbandData);
        localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
    }

    return warbandId;
};

/**
 * Saves/updates a warband document in Firestore
 */
const saveWarband = async (warband) => {
    if (!warband || !warband.id) return;

    const uid = getEffectiveUserId();
    if (db && uid && uid !== 'local') {
        const cleanData = sanitizeForFirestore({ ...warband, _isV2: true, _storageLocation: 'Cloud Firestore' });
        const docRef = doc(db, 'users', uid, 'warbands_v2', warband.id);
        await setDoc(docRef, cleanData, { merge: true });
    } else {
        const warbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
        const index = warbands.findIndex(w => w.id === warband.id);
        if (index !== -1) {
            warbands[index] = { ...warband, _isV2: true, _storageLocation: 'Browser Cache' };
        } else {
            warbands.push({ ...warband, _isV2: true, _storageLocation: 'Browser Cache' });
        }
        localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
    }
};

/**
 * Deletes a warband document in Firestore
 */
const deleteWarband = async (warbandId) => {
    const uid = getEffectiveUserId();
    if (db && uid && uid !== 'local') {
        const docRef = doc(db, 'users', uid, 'warbands_v2', warbandId);
        await deleteDoc(docRef);
    } else {
        let warbands = JSON.parse(localStorage.getItem('mordheim_warbands')) || [];
        warbands = warbands.filter(w => w.id !== warbandId);
        localStorage.setItem('mordheim_warbands', JSON.stringify(warbands));
    }
};

/**
 * Auth Methods
 */
const loginWithEmailPassword = async (email, password) => {
    ensureFirebaseInstances();
    if (!auth) throw new Error("Firebase no está inicializado.");
    return await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailPassword = async (email, password) => {
    ensureFirebaseInstances();
    if (!auth) throw new Error("Firebase no está inicializado.");
    return await createUserWithEmailAndPassword(auth, email, password);
};

const loginWithGoogle = async () => {
    ensureFirebaseInstances();
    if (!auth) throw new Error("Firebase no está inicializado.");
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
};

const logout = async () => {
    ensureFirebaseInstances();
    if (auth) {
        await signOut(auth);
    }
    userId = 'local';
    currentUser = null;
    localStorage.removeItem('grimheim_firebase_user');
    localStorage.removeItem('grimheim_guest_mode');
    localStorage.removeItem('grimheim_auth_token');
    localStorage.removeItem('rosterheim_auth_token');
    localStorage.removeItem('grimheim_auth_user');
    localStorage.removeItem('rosterheim_auth_user');
};

const resetPassword = async (email) => {
    ensureFirebaseInstances();
    if (!auth) throw new Error("Firebase no está inicializado.");
    return await sendPasswordResetEmail(auth, email);
};

export {
    initFirebase,
    listenToWarbands,
    createNewWarband,
    saveWarband,
    deleteWarband,
    saveCardSettingsToCloud,
    loginWithEmailPassword,
    registerWithEmailPassword,
    loginWithGoogle,
    logout,
    resetPassword,
    db,
    auth,
    userId,
    getEffectiveUserId
};
