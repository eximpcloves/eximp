import CookieConsent from './components/CookieConsent';

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://eximps-cloves.com'),
  title: { default: 'Eximp & Cloves Blog', template: '%s | Eximp & Cloves Blog' },
  description: 'Insights, updates, and stories from Eximp & Cloves Infrastructure Ltd.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Georgia, serif', background: '#fff', color: '#1a1a1a' }}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}