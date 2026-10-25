import { initFirebase } from './firebase.js';

// This function will be called from app.js to initialize Firebase
// and set up the authentication state listener.
async function initializeFirebase(onUserAuthenticated, onAuthenticationFailed) {
    try {
        await initFirebase((user) => {
            if (user) {
                onUserAuthenticated(user);
            } else {
                onAuthenticationFailed();
            }
        });
    } catch (error) {
        console.warn("Firebase initialization failed, falling back to Local Storage.", error);
        onAuthenticationFailed(error);
    }
}

export { initializeFirebase };
