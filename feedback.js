import { userId, db } from './firebase.js';
import { doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { displayModal, hideModal, showMessage } from './utility.js';
import { trackEvent } from './analytics.js';

/** Feedback validation rules for different user types */
const FEEDBACK_VALIDATION = {
    anonymous: {
        maxLength: { name: 30, subject: 80, message: 1000 },
        patterns: {
            name: /^[a-zA-Z0-9\s\-_.]{1,30}$/,
            subject: /^[a-zA-Z0-9\s\-_.!?]{1,80}$/,
            message: /^[\s\S]{1,1000}$/
        },
        rateLimit: 2, // per hour
        requiredFields: ['type', 'subject', 'message']
    },
    registered: {
        maxLength: { name: 50, subject: 100, message: 2000 },
        patterns: {
            name: /^[a-zA-Z0-9\s\-_.]{1,50}$/,
            subject: /^[a-zA-Z0-9\s\-_.!?]{1,100}$/,
            message: /^[\s\S]{1,2000}$/
        },
        rateLimit: 5, // per hour
        requiredFields: ['type', 'subject', 'message']
    }
};

/** Forbidden patterns to prevent malicious input */
const FORBIDDEN_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi
];

/** Common profanity filter - can be expanded */
const PROFANITY_FILTER = [
    'damn', 'hell', 'shit', 'fuck', 'bitch', 'ass', 'bastard', 'crap'
];

/** Gets or creates anonymous user ID for tracking */
export const getAnonymousUserId = () => {
    let anonId = localStorage.getItem('anonymous_user_id');
    if (!anonId) {
        anonId = 'anon_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('anonymous_user_id', anonId);
    }
    return anonId;
};

/** Checks if user is anonymous */
export const isAnonymousUser = () => {
    return !userId || userId === 'anon' || userId.startsWith('anon_');
};

/** Gets rate limit key for storage */
export const getRateLimitKey = () => {
    const userKey = isAnonymousUser() ? getAnonymousUserId() : userId;
    return `feedback_rate_limit_${userKey}`;
};

/** Checks if user is rate limited */
export const isRateLimited = () => {
    const rateLimitKey = getRateLimitKey();
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    const rateData = localStorage.getItem(rateLimitKey);
    if (!rateData) {
        return false;
    }
    
    const { submissions, lastReset } = JSON.parse(rateData);
    
    // Reset if more than an hour has passed
    if (now - lastReset > oneHour) {
        localStorage.removeItem(rateLimitKey);
        return false;
    }
    
    const limit = isAnonymousUser() ? 
        FEEDBACK_VALIDATION.anonymous.rateLimit : 
        FEEDBACK_VALIDATION.registered.rateLimit;
    
    return submissions >= limit;
};

/** Records a submission for rate limiting */
export const recordSubmission = () => {
    const rateLimitKey = getRateLimitKey();
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    const rateData = localStorage.getItem(rateLimitKey);
    let submissions = 1;
    let lastReset = now;
    
    if (rateData) {
        const parsed = JSON.parse(rateData);
        // Reset if more than an hour has passed
        if (now - parsed.lastReset > oneHour) {
            submissions = 1;
            lastReset = now;
        } else {
            submissions = parsed.submissions + 1;
            lastReset = parsed.lastReset;
        }
    }
    
    localStorage.setItem(rateLimitKey, JSON.stringify({
        submissions,
        lastReset
    }));
};

/** Sanitizes input by removing forbidden patterns */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    
    let sanitized = input.trim();
    
    // Remove forbidden patterns
    FORBIDDEN_PATTERNS.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
    });
    
    // Filter profanity (simple replacement)
    PROFANITY_FILTER.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        sanitized = sanitized.replace(regex, '*'.repeat(word.length));
    });
    
    // Escape HTML entities
    sanitized = sanitized
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    
    return sanitized;
};

/** Validates feedback input */
export const validateFeedback = (formData) => {
    const isAnonymous = isAnonymousUser();
    const rules = isAnonymous ? FEEDBACK_VALIDATION.anonymous : FEEDBACK_VALIDATION.registered;
    const errors = [];
    
    // Check required fields
    rules.requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            const fieldName = field === 'subject' ? 'El asunto' : (field === 'message' ? 'El mensaje' : 'El campo');
            errors.push(`${fieldName} es obligatorio`);
        }
    });
    
    // Validate each field
    Object.keys(formData).forEach(field => {
        const value = formData[field];
        
        if (field === 'name' && value) {
            if (value.length > rules.maxLength.name) {
                errors.push(`El nombre debe tener ${rules.maxLength.name} caracteres o menos`);
            }
            if (!rules.patterns.name.test(value)) {
                errors.push('El nombre contiene caracteres no válidos');
            }
        }
        
        if (field === 'subject') {
            if (value.length > rules.maxLength.subject) {
                errors.push(`El asunto debe tener ${rules.maxLength.subject} caracteres o menos`);
            }
            if (!rules.patterns.subject.test(value)) {
                errors.push('El asunto contiene caracteres no válidos');
            }
        }
        
        if (field === 'message') {
            if (value.length < 10) {
                errors.push('El mensaje debe tener al menos 10 caracteres');
            }
            if (value.length > rules.maxLength.message) {
                errors.push(`El mensaje debe tener ${rules.maxLength.message} caracteres o menos`);
            }
            if (!rules.patterns.message.test(value)) {
                errors.push('El mensaje contiene caracteres no válidos');
            }
        }
        
        if (field === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors.push('Por favor, introduce una dirección de correo electrónico válida');
            }
        }
    });
    
    return errors;
};

/** Prepares feedback data for submission */
export const prepareFeedbackData = (formData) => {
    const isAnonymous = isAnonymousUser();
    
    return {
        timestamp: new Date().toISOString(),
        userId: userId || 'anonymous',
        userType: isAnonymous ? 'anonymous' : 'registered',
        anonymousId: isAnonymous ? getAnonymousUserId() : null,
        type: formData.type,
        category: formData.category || 'other',
        priority: formData.priority || 'medium',
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
        name: formData.name ? sanitizeInput(formData.name) : (isAnonymous ? 'Anonymous User' : 'Registered User'),
        email: formData.email ? sanitizeInput(formData.email) : null,
        userAgent: navigator.userAgent,
        url: window.location.href,
        sessionId: getSessionId(),
        warbandData: getWarbandContext() // Optional context
    };
};

/** Gets or creates session ID */
const getSessionId = () => {
    let sessionId = sessionStorage.getItem('feedback_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('feedback_session_id', sessionId);
    }
    return sessionId;
};

/** Gets current warband context for debugging */
const getWarbandContext = () => {
    try {
        const warbandData = localStorage.getItem('currentWarband');
        if (warbandData) {
            const warband = JSON.parse(warbandData);
            return {
                warbandName: warband.name || 'Unknown',
                warbandType: warband.type || 'Unknown',
                fighterCount: warband.fighters ? warband.fighters.length : 0
            };
        }
    } catch (error) {
        console.warn('Could not get warband context:', error);
    }
    return null;
};

/** Shows feedback modal */
export const showFeedbackModal = () => {
    displayModal('feedback-modal');
};

/** Hides feedback modal */
export const hideFeedbackModal = () => {
    hideModal('feedback-modal');
    clearFeedbackForm();
};

/** Clears feedback form */
export const clearFeedbackForm = () => {
    const form = document.getElementById('feedback-form');
    if (form) {
        form.reset();
    }
    
    // Clear any error messages
    const errorContainer = document.getElementById('feedback-errors');
    if (errorContainer) {
        errorContainer.innerHTML = '';
        errorContainer.style.display = 'none';
    }
};

/** Displays feedback form errors */
export const showFeedbackErrors = (errors) => {
    const errorContainer = document.getElementById('feedback-errors');
    if (errorContainer) {
        errorContainer.innerHTML = `
            <div class="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
                <div class="font-bold mb-2">Por favor, corrige los siguientes errores:</div>
                <ul class="list-disc list-inside text-sm">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        errorContainer.style.display = 'block';
    }
};

/** Handles feedback form submission */
export const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    // Check rate limiting first
    if (isRateLimited()) {
        showMessage('Has alcanzado el límite de envíos. Por favor, inténtalo más tarde.', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Validate input
    const errors = validateFeedback(data);
    if (errors.length > 0) {
        showFeedbackErrors(errors);
        return;
    }
    
    try {
        // Prepare data for submission
        const feedbackData = prepareFeedbackData(data);
        
        // Submit to Firebase (this will be implemented in the next step)
        await submitFeedbackToFirebase(feedbackData);
        
        // Track feedback submission event
        trackEvent('feedback_submitted', {
            type: feedbackData.type,
            category: feedbackData.category
        });

        // Record submission for rate limiting
        recordSubmission();
        
        // Show success message
        showMessage('¡Gracias por tus comentarios! Agradecemos tu aportación.', 'success');
        
        // Close modal and clear form
        hideFeedbackModal();
        
    } catch (error) {
        console.error('Error submitting feedback:', error);
        showMessage('Se ha producido un error al enviar tus comentarios. Por favor, inténtalo de nuevo.', 'error');
    }
};

/** Submits feedback to Firebase */
const submitFeedbackToFirebase = async (feedbackData) => {
    if (!db) {
        throw new Error('Firebase database not initialized');
    }
    
    try {
        // Create a unique document ID
        const docId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const feedbackRef = doc(db, 'feedback', docId);
        
        // Prepare the data with Firebase server timestamp
        const firebaseData = {
            ...feedbackData,
            timestamp: serverTimestamp(),
            processed: false,
            status: 'new'
        };
        
        // Submit to Firebase
        await setDoc(feedbackRef, firebaseData);
        
        console.log('Feedback submitted successfully with ID:', docId);
        return docId;
        
    } catch (error) {
        console.error('Firebase submission error:', error);
        throw new Error('Failed to submit feedback to database');
    }
};
