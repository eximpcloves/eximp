'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function VerifySubscriptionPage({ searchParams }) {
  const params = use(searchParams);
  const token = params?.token;

  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Progressive profile form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    if (!token) {
      setVerifying(false);
      setError('Verification token is missing.');
      return;
    }

    async function doVerify() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_ERP_API_BASE || '';
        const res = await fetch(`${apiBase}/api/blog/public/newsletter/verify?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Verification failed');
        setVerified(true);
        setEmail(data.email || '');
      } catch (err) {
        setError(err.message || 'Invalid or expired verification link.');
      } finally {
        setVerifying(false);
      }
    }

    doVerify();
  }, [token]);

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileError('');
    try {
      const apiBase = process.env.NEXT_PUBLIC_ERP_API_BASE || '';
      const res = await fetch(`${apiBase}/api/blog/public/newsletter/complete-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          first_name: firstName,
          last_name: lastName,
          dob,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to save profile');
      setProfileSaved(true);
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile.');
    } finally {
      setProfileSaving(false);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        {verifying ? (
          <div style={styles.card}>
            <div style={styles.spinner}>⌛</div>
            <h2 style={styles.title}>Verifying your email...</h2>
            <p style={styles.subtitle}>Please wait while we confirm your subscription.</p>
          </div>
        ) : error ? (
          <div style={styles.card}>
            <div style={styles.errorIcon}>⚠️</div>
            <h2 style={styles.title}>Verification Failed</h2>
            <p style={styles.subtitle}>{error}</p>
            <Link href="/" style={styles.primaryBtn}>Return to Blog</Link>
          </div>
        ) : (
          <div style={styles.card}>
            <div style={styles.successIcon}>🎉</div>
            <h2 style={styles.title}>Subscription Verified!</h2>
            <p style={styles.subtitle}>
              Thank you for verifying <strong>{email}</strong>. You are now subscribed to Eximp &amp; Cloves Insights.
            </p>

            {/* Progressive Profile Form */}
            {!profileSaved ? (
              <div style={styles.profileSection}>
                <div style={styles.profileHeader}>
                  <div style={styles.profileBadge}>Optional Step</div>
                  <h3 style={styles.profileTitle}>Personalize Your Updates</h3>
                  <p style={styles.profileDesc}>
                    Want us to send you special birthday rewards and personalized updates? Share a few details below:
                  </p>
                </div>

                <form onSubmit={handleProfileSubmit} style={styles.form}>
                  <div style={styles.row}>
                    <div style={styles.fieldGroup}>
                      <label style={styles.label}>First Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Chukwuma"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.fieldGroup}>
                      <label style={styles.label}>Last Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Adebayo"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  </div>

                  <div style={styles.row}>
                    <div style={styles.fieldGroup}>
                      <label style={styles.label}>🎂 Date of Birth (for Birthday Wishes)</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.fieldGroup}>
                      <label style={styles.label}>Phone Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+234..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  </div>

                  {profileError && <div style={styles.errorText}>{profileError}</div>}

                  <div style={styles.btnRow}>
                    <button type="submit" disabled={profileSaving} style={styles.saveBtn}>
                      {profileSaving ? 'Saving Profile...' : 'Save Profile & Preferences'}
                    </button>
                    <Link href="/" style={styles.skipBtn}>Skip for Now</Link>
                  </div>
                </form>
              </div>
            ) : (
              <div style={styles.profileSavedBox}>
                <div style={styles.profileSavedTitle}>Profile Saved Successfully! ✨</div>
                <p style={styles.profileSavedMsg}>
                  Thank you! We have updated your preferences. Look out for your special birthday surprises!
                </p>
                <Link href="/" style={styles.primaryBtn}>Explore Blog Articles</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  main: {
    fontFamily: 'Inter, system-ui, sans-serif',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    background: '#FAFAFA',
  },
  container: {
    maxWidth: 600,
    width: '100%',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #E5E7EB',
    borderRadius: 16,
    padding: '40px 32px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
  },
  spinner: { fontSize: 40, marginBottom: 16 },
  successIcon: { fontSize: 48, marginBottom: 16 },
  errorIcon: { fontSize: 48, marginBottom: 16 },
  title: {
    fontFamily: 'Georgia, serif',
    fontSize: 28,
    color: '#111827',
    margin: '0 0 12px',
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 1.6,
    color: '#4B5563',
    margin: '0 0 24px',
  },
  primaryBtn: {
    display: 'inline-block',
    background: '#C47D0A',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: 14,
    padding: '12px 28px',
    borderRadius: 8,
    marginTop: 16,
  },
  profileSection: {
    marginTop: 32,
    paddingTop: 28,
    borderTop: '1px solid #E5E7EB',
    textAlign: 'left',
  },
  profileHeader: { marginBottom: 20 },
  profileBadge: {
    display: 'inline-block',
    background: '#F5EFE6',
    color: '#C47D0A',
    fontSize: 11,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    padding: '3px 10px',
    borderRadius: 4,
    marginBottom: 8,
  },
  profileTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 20,
    color: '#111827',
    margin: '0 0 6px',
    fontWeight: 700,
  },
  profileDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 1.5,
    margin: 0,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  row: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  fieldGroup: { flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151' },
  input: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #D1D5DB',
    fontSize: 14,
    outline: 'none',
  },
  btnRow: { display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, flexWrap: 'wrap' },
  saveBtn: {
    background: '#C47D0A',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '12px 24px',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
  },
  skipBtn: {
    color: '#6B7280',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
  },
  errorText: { color: '#EF4444', fontSize: 13 },
  profileSavedBox: {
    marginTop: 24,
    padding: 24,
    background: '#F5EFE6',
    borderRadius: 12,
    border: '1px solid rgba(196, 125, 10, 0.3)',
  },
  profileSavedTitle: { fontWeight: 700, fontSize: 18, color: '#C47D0A', marginBottom: 8 },
  profileSavedMsg: { fontSize: 14, color: '#4B5563', margin: '0 0 16px' },
};
