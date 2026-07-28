import React, { useEffect, useState } from 'react';
import {
    getConsentState,
    getPreferences,
    acceptAllCookies,
    rejectNonEssentialCookies,
    saveCustomPreferences,
} from '../utils/cookieConsent';

export default function CookieConsentBanner() {
    const [visible, setVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [prefs, setPrefs] = useState({ analytics: false, preferences: false });

    useEffect(() => {
        if (!getConsentState()) setVisible(true);
        setPrefs(getPreferences());
    }, []);

    if (!visible) return null;

    const handleAccept = () => { acceptAllCookies(); setVisible(false); };
    const handleReject = () => { rejectNonEssentialCookies(); setVisible(false); };
    const handleSaveCustom = () => { saveCustomPreferences(prefs); setVisible(false); setShowSettings(false); };

    return (
        <div style={styles.overlay}>
            <div style={styles.banner}>
                {!showSettings ? (
                    <>
                        <p style={styles.text}>
                            We use cookies to make this site work and to remember your preferences
                            across pages — including on our blog. You can accept all cookies, reject
                            non-essential ones, or choose exactly what you're comfortable with.
                        </p>
                        <div style={styles.actions}>
                            <a href="/privacy" style={styles.linkBtn}>Privacy Policy</a>
                            <button onClick={() => setShowSettings(true)} style={styles.linkBtn}>Manage Preferences</button>
                            <button onClick={handleReject} style={styles.outlineBtn}>Reject Non-Essential</button>
                            <button onClick={handleAccept} style={styles.primaryBtn}>Accept All</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 style={styles.settingsTitle}>Cookie Preferences</h3>
                        <div style={styles.settingRow}>
                            <div>
                                <div style={styles.settingLabel}>Essential</div>
                                <div style={styles.settingDesc}>Required for the site to function (session, security). Always on.</div>
                            </div>
                            <input type="checkbox" checked disabled style={styles.checkbox} />
                        </div>
                        <div style={styles.settingRow}>
                            <div>
                                <div style={styles.settingLabel}>Preferences</div>
                                <div style={styles.settingDesc}>Remembers things like which blog posts you've already liked, across visits.</div>
                            </div>
                            <input
                                type="checkbox"
                                checked={prefs.preferences}
                                onChange={(e) => setPrefs((p) => ({ ...p, preferences: e.target.checked }))}
                                style={styles.checkbox}
                            />
                        </div>
                        <div style={styles.settingRow}>
                            <div>
                                <div style={styles.settingLabel}>Analytics</div>
                                <div style={styles.settingDesc}>Helps us understand which pages are useful (if/when enabled).</div>
                            </div>
                            <input
                                type="checkbox"
                                checked={prefs.analytics}
                                onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                                style={styles.checkbox}
                            />
                        </div>
                        <div style={styles.actions}>
                            <button onClick={() => setShowSettings(false)} style={styles.linkBtn}>Back</button>
                            <button onClick={handleSaveCustom} style={styles.primaryBtn}>Save Preferences</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    overlay: { position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', padding: '16px' },
    banner: { background: '#16181D', color: '#E5E7EB', border: '1px solid rgba(196,125,10,0.4)', borderRadius: 12, padding: '20px 24px', maxWidth: 720, width: '100%', boxShadow: '0 -8px 30px rgba(0,0,0,0.35)', fontFamily: 'Inter, sans-serif' },
    text: { fontSize: 13.5, lineHeight: 1.6, margin: '0 0 14px', color: '#cbd5e1' },
    actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' },
    primaryBtn: { background: '#C47D0A', color: '#0F1115', border: 'none', padding: '8px 18px', borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: 'pointer' },
    outlineBtn: { background: 'transparent', color: '#E5E7EB', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 18px', borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: 'pointer' },
    linkBtn: { background: 'transparent', color: '#94a3b8', border: 'none', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', padding: '8px 4px' },
    settingsTitle: { fontFamily: 'Georgia, serif', fontSize: 18, margin: '0 0 14px', color: '#C47D0A' },
    settingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    settingLabel: { fontSize: 13.5, fontWeight: 600, marginBottom: 2 },
    settingDesc: { fontSize: 12, color: '#94a3b8' },
    checkbox: { width: 18, height: 18, accentColor: '#C47D0A' },
};