// Site-wide cookie consent helper. Used by CookieConsentBanner.jsx (main
// site) and shares the exact same cookie names as the /blog subapp's
// lib/cookieConsent.js, so a choice made on either the main site or a blog
// page is honored everywhere on the domain (cookies are path=/, so they're
// visible across both apps regardless of which one set them).

const CONSENT_COOKIE = 'ec_cookie_consent';
const PREFS_COOKIE = 'ec_cookie_prefs'; // JSON: { analytics: bool, preferences: bool }
const READER_ID_COOKIE = 'ec_blog_reader_id';

function setCookie(name, value, days = 365) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; path=/; max-age=0`;
}

export function getConsentState() {
    return getCookie(CONSENT_COOKIE); // null until the visitor decides
}

export function getPreferences() {
    const raw = getCookie(PREFS_COOKIE);
    if (!raw) return { analytics: false, preferences: false };
    try { return JSON.parse(raw); } catch { return { analytics: false, preferences: false }; }
}

export function acceptAllCookies() {
    setCookie(CONSENT_COOKIE, 'accepted');
    setCookie(PREFS_COOKIE, JSON.stringify({ analytics: true, preferences: true }));
}

export function rejectNonEssentialCookies() {
    setCookie(CONSENT_COOKIE, 'rejected');
    setCookie(PREFS_COOKIE, JSON.stringify({ analytics: false, preferences: false }));
    // Blog "already liked" memory counts as Preferences — clear it if declined.
    deleteCookie(READER_ID_COOKIE);
}

export function saveCustomPreferences(prefs) {
    setCookie(CONSENT_COOKIE, 'custom');
    setCookie(PREFS_COOKIE, JSON.stringify(prefs));
    if (!prefs.preferences) deleteCookie(READER_ID_COOKIE);
}