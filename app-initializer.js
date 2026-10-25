import { initializeFirebase } from './firebase-logic.js';
import { setUserId, setUseLocalStorage, setIsShieldMeleeIgnored, setIsBlackpowderPreGameDiscountActive, setIsBlackpowder20PercentDiscountActive, setIsArmourShieldHalfCostActive, setIsExcludeStartingXpFromRatingActive, setIsFullyPaintedActive, userId } from './state.js';
import { listenToWarbands, unsubscribeFromWarbands } from './warband-service.js';
import { setAnalyticsUser, trackEvent } from './analytics.js';

export const initializeAppAndData = async () => {
    // Check if we're returning from exploration page
    let returningFromExploration = sessionStorage.getItem('returningFromExploration');
    const explorationAuthState = sessionStorage.getItem('explorationAuthState');
    
    if (returningFromExploration === 'true') {
        // Clear the flags so they don't persist
        sessionStorage.removeItem('returningFromExploration');
        sessionStorage.removeItem('explorationAuthState');
        console.log("Returning from exploration page - authentication should be automatically restored by Firebase persistence");
        console.log("Exploration page reported auth state as:", explorationAuthState);
    } else {
        returningFromExploration = null; // Ensure it's falsy if not set
    }
    
    setUserId('local');
    setUseLocalStorage(true);
    initLocalStorage();

    // This part runs regardless of backend
    // Initialize House Rule state from local storage or default (for persistent state across page refreshes)
    const storedRule = localStorage.getItem('isShieldMeleeIgnored');
    const toggle = document.getElementById('house-rule-toggle');
    
    // Defensive check to avoid crash if toggle isn't immediately ready
    if (toggle) {
        if (storedRule === 'true') {
            setIsShieldMeleeIgnored(true);
            toggle.checked = true;
        } else {
            setIsShieldMeleeIgnored(false);
            toggle.checked = false;
        }
    }

    // Initialize Blackpowder Pre-Game Discount House Rule state
    const storedBlackpowderRule = localStorage.getItem('isBlackpowderPreGameDiscountActive');
    if (storedBlackpowderRule === 'true') {
        setIsBlackpowderPreGameDiscountActive(true);
    } else {
        setIsBlackpowderPreGameDiscountActive(false);
    }

    // Initialize Blackpowder 20% Discount House Rule state
    const storedBlackpowder20PctRule = localStorage.getItem('isBlackpowder20PercentDiscountActive');
    if (storedBlackpowder20PctRule === 'true') {
        setIsBlackpowder20PercentDiscountActive(true);
    } else {
        setIsBlackpowder20PercentDiscountActive(false);
    }

    // Initialize Armour & Shield 50% Cost Reduction House Rule state
    const storedArmourShieldRule = localStorage.getItem('isArmourShieldHalfCostActive');
    if (storedArmourShieldRule === 'true') {
        setIsArmourShieldHalfCostActive(true);
    } else {
        setIsArmourShieldHalfCostActive(false);
    }

    // Initialize Exclude Starting XP from Rating House Rule state
    const storedExcludeStartingXpRule = localStorage.getItem('isExcludeStartingXpFromRatingActive');
    if (storedExcludeStartingXpRule === 'true') {
        setIsExcludeStartingXpFromRatingActive(true);
    } else {
        setIsExcludeStartingXpFromRatingActive(false);
    }

    // Initialize Fully Painted House Rule state
    const storedFullyPaintedRule = localStorage.getItem('isFullyPaintedActive');
    if (storedFullyPaintedRule === 'true') {
        setIsFullyPaintedActive(true);
    } else {
        setIsFullyPaintedActive(false);
    }
};

export const initLocalStorage = () => {
    const userInfo = document.getElementById('user-info');
    if (userInfo) {
        userInfo.textContent = 'Modo Local (Datos guardados en tu navegador)';
    }
    listenToWarbands();
};
