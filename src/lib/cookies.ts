/**
 * Cookie consent management utilities
 */

const COOKIE_CONSENT_KEY = 'cookie-consent';

export type CookieConsentStatus = 'accepted' | 'declined' | null;

/**
 * Get the current cookie consent status from localStorage
 */
export function getCookieConsent(): CookieConsentStatus {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        return consent as CookieConsentStatus;
    } catch (error) {
        console.error('Error reading cookie consent:', error);
        return null;
    }
}

/**
 * Set the cookie consent status in localStorage
 */
export function setCookieConsent(status: 'accepted' | 'declined'): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem(COOKIE_CONSENT_KEY, status);
    } catch (error) {
        console.error('Error setting cookie consent:', error);
    }
}

/**
 * Check if user has given consent
 */
export function hasConsent(): boolean {
    return getCookieConsent() === 'accepted';
}
