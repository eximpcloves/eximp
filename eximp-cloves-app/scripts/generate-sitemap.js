import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { propertiesData } from '../src/data/propertiesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://eximps-cloves.com';

const staticRoutes = [
    '',
    '/about',
    '/services',
    '/properties',
    '/contact',
    '/careers',
    '/privacy',
    '/terms'
];

const propertySlugs = Object.keys(propertiesData);

const generateSitemap = () => {
    const today = new Date().toISOString().split('T')[0];

    const staticUrls = staticRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

    const propertyUrls = propertySlugs.map(slug => `
  <url>
    <loc>${BASE_URL}/properties/${slug}</loc>
    <lastmod>${today}</lastmod>
    <priority>0.7</priority>
  </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${propertyUrls}
</urlset>`;

    const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap.trim());
    console.log(`✅ Sitemap successfully generated at: ${outputPath}`);
};

generateSitemap();
