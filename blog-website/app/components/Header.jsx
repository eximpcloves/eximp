import Link from 'next/link';

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link href="/" style={styles.logoLink}>
          <img
            src="/blog/logo.png"
            alt="Eximp & Cloves Infrastructure Ltd"
            style={styles.logoImg}
            onError={(e) => {
              if (!e.currentTarget.dataset.retried) {
                e.currentTarget.dataset.retried = 'true';
                e.currentTarget.src = '/logo.png';
              }
            }}
          />
          <span style={styles.badge}>Blog</span>
        </Link>

        <nav style={styles.nav}>
          <a href="https://eximps-cloves.com" style={styles.navLink}>Main Website</a>
          <a href="https://app.eximps-cloves.com" style={styles.navLink}>Staff Portal</a>
          <Link href="/" style={styles.primaryBtn}>All Posts</Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: '#ffffff',
    borderBottom: '1px solid #eaeaea',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
  },
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    textDecoration: 'none',
  },
  logoImg: {
    height: 38,
    width: 'auto',
    display: 'block',
  },
  badge: {
    background: '#f5efe6',
    color: '#C47D0A',
    fontSize: 11,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    padding: '3px 8px',
    borderRadius: 4,
    border: '1px solid rgba(196, 125, 10, 0.2)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  navLink: {
    color: '#444',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
  },
  primaryBtn: {
    background: '#C47D0A',
    color: '#fff',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 700,
    padding: '8px 16px',
    borderRadius: 6,
  },
};
