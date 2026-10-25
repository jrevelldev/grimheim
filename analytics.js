// Analytics helper functions for specific tracking
import { useLocalStorage } from './state.js';

const MEASUREMENT_ID = 'G-GPF9PBV8JP';
const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Dynamic script loader to eliminate script duplication in HTML files
const initGoogleAnalytics = () => {
  if (typeof window.gtag !== 'undefined') return;

  // Insert main script tag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  
  // Set default configurations, disabling automatic page views if we track manually
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: true
  });
};

// Initialize GA
initGoogleAnalytics();

export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag !== 'undefined') {
    // Add default context parameters
    const defaultParams = {
      user_status: useLocalStorage ? 'anonymous' : 'authenticated',
      app_platform: 'web'
    };
    
    const combinedParams = { ...defaultParams, ...parameters };
    window.gtag('event', eventName, combinedParams);

    if (IS_DEV) {
      console.log(`[GA4 Event] ${eventName}`, combinedParams);
    }
  }
};

// Dynamic User ID binding
export const setAnalyticsUser = (firebaseUser) => {
  if (typeof window.gtag === 'undefined') return;

  if (firebaseUser && !firebaseUser.isAnonymous) {
    window.gtag('config', MEASUREMENT_ID, {
      'user_id': firebaseUser.uid
    });
    window.gtag('set', 'user_properties', {
      'user_type': 'authenticated'
    });
  } else {
    window.gtag('config', MEASUREMENT_ID, {
      'user_id': null
    });
    window.gtag('set', 'user_properties', {
      'user_type': 'anonymous'
    });
  }
};

// Track warband activity for all users
export const trackWarbandAction = (action, warbandName = null, warbandType = null, isAnonymous = null) => {
  trackEvent('warband_action', {
    action_type: action, // 'created', 'accessed', 'copied', 'renamed', 'deleted'
    warband_name: warbandName,
    warband_type: warbandType
  });
};

// Keep the original function for backward compatibility
export const trackAnonymousWarbandAction = (action, warbandName = null) => {
  trackWarbandAction(action, warbandName, null, true);
};

// Track Character menu access
export const trackCharacterMenuAccess = (menuType) => {
  trackEvent('character_menu_access', {
    menu_type: menuType // 'hired_sword' or 'dramatis_personae'
  });
};

// Track specific page access
export const trackPageAccess = (pageType) => {
  trackEvent('page_access', {
    page_type: pageType // 'blog', 'change_log', or 'feedback'
  });
};

// Track Special Rules access
export const trackSpecialRulesAccess = (accessType) => {
  trackEvent('special_rules_access', {
    access_type: accessType // 'desktop' or 'mobile'
  });
};

// Track Card Builder Studio opens
export const trackCardBuilderOpen = (source, accessType = null, extraParams = {}) => {
  trackEvent('card_builder_open', {
    source: source,          // 'menu' or 'warband'
    access_type: accessType, // 'desktop', 'mobile', or null
    ...extraParams
  });
};

// Track SPA Screen Views
export const trackScreenView = (screenName) => {
  trackEvent('screen_view', {
    screen_name: screenName
  });
};

// Helper to check if current user is anonymous
export const isCurrentUserAnonymous = () => {
  return useLocalStorage;
};

