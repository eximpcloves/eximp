import './globals.css';
import CookieConsent from './components/CookieConsent';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://eximps-cloves.com'),
  title: { default: 'Eximp & Cloves Blog', template: '%s | Eximp & Cloves Blog' },
  description: 'Insights, market updates, and investment perspectives from Eximp & Cloves Infrastructure Ltd.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff', color: '#1a1a1a' }}>
        <Header />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}