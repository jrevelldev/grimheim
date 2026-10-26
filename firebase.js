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

const getEffectiveUserId = () => {
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
            if (!getApps().length) {
                app = initializeApp(firebaseConfig);
            } else {
                app = getApps()[0];
            }
            auth = getAuth(app);
            db = getFirestore(app);

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
            });

            resolve({ db, auth });
        } catch (err) {
            console.error("Error al inicializar Firebase SDK:", err);
            resolve({ db: null, auth: null });
        }
    });
};

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
                snapshot.forEach((docSnap) => {
                    const data = docSnap.data();
                    warbands.push({
                        ...data,
                        id: docSnap.id,
                        _storageLocation: 'Cloud Firestore',
                        _isV2: true
                    });
                });
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
    if (!auth) throw new Error("Firebase no está inicializado.");
    return await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailPassword = async (email, password) => {
    if (!auth) throw new Error("Firebase no está inicializado.");
    return await createUserWithEmailAndPassword(auth, email, password);
};

const loginWithGoogle = async () => {
    if (!auth) throw new Error("Firebase no está inicializado.");
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
};

const logout = async () => {
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
    if (!auth) throw new Error("Firebase no está inicializado.");
    return await sendPasswordResetEmail(auth, email);
};

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
    userId,
    getEffectiveUserId
};
