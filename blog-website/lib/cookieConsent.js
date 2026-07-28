'use client';

// ── Consent state ──────────────────────────────────────────────
// IMPORTANT: these cookie names are shared with the main site's
// src/utils/cookieConsent.js. The consent banner itself is only rendered on
// the main Vite site (site-wide), NOT here — this file only reads that
// decision (both apps sit on the same domain, so path=/ cookies are visible
// to both regardless of which one set them) and manages the blog-specific
// reader-identifier cookie.
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
  return getCookie(CONSENT_COOKIE); // null until the visitor decides (on either app)
}

export function getPreferences() {
  const raw = getCookie(PREFS_COOKIE);
  if (!raw) return { analytics: false, preferences: false };
  try { return JSON.parse(raw); } catch { return { analytics: false, preferences: false }; }
}

// ── Reader identifier (anonymous, cookie/fingerprint-based) ─────
// Only persisted if the visitor has allowed "Preferences" cookies. If not,
// we generate a throwaway in-memory id for this pageview only, so the like
// button still works but won't remember the visitor next time.
let sessionOnlyId = null;

export function ensureReaderIdentifier() {
  const prefs = getPreferences();
  const existing = getCookie(READER_ID_COOKIE);
  if (existing) return existing;

  const newId = (crypto.randomUUID && crypto.randomUUID()) || `r_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  if (prefs.preferences) {
    setCookie(READER_ID_COOKIE, newId, 365);
    return newId;
  }
  sessionOnlyId = sessionOnlyId || newId;
  return sessionOnlyId;
}