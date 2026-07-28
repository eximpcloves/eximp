const SITE_URL = process.env.SITE_URL || 'https://eximps-cloves.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/preview/'],
      },
    ],
    sitemap: `${SITE_URL}/blog/sitemap.xml`,
  };
}