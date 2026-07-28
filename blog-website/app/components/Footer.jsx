'use client';
import NewsletterSubscribe from './NewsletterSubscribe';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brandCol}>
          <img
            src="/blog/logo_dark.svg"
            alt="Eximp & Cloves Infrastructure Ltd"
            style={styles.logoImg}
            onError={(e) => {
              if (!e.currentTarget.dataset.retried) {
                e.currentTarget.dataset.retried = 'true';
                e.currentTarget.src = '/logo.png';
              }
            }}
          />
          <p style={styles.brandDesc}>
            Eximp & Cloves Infrastructure Ltd — Driving excellence in real estate, property developments, and capital growth.
          </p>
        </div>

        <NewsletterSubscribe />

        <div style={styles.copyCol}>
          <p style={styles.copyText}>
            © {new Date().getFullYear()} Eximp & Cloves Infrastructure Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


const styles = {
  footer: {
    background: '#0F1115',
    color: '#e5e7eb',
    padding: '48px 20px 32px',
    borderTop: '3px solid #C47D0A',
    marginTop: 60,
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  brandCol: {
    maxWidth: 540,
  },
  logoImg: {
    height: 36,
    width: 'auto',
    marginBottom: 16,
  },
  brandDesc: {
    color: '#9ca3af',
    fontSize: 14,
    lineHeight: 1.6,
    margin: 0,
  },
  copyCol: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: 20,
  },
  copyText: {
    color: '#6b7280',
    fontSize: 13,
    margin: 0,
  },
};
