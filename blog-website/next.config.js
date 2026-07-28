/** @type {import('next').NextConfig} */
const nextConfig = {
  // This app is deployed standalone and reverse-proxied at /blog/* by your
  // existing web server (nginx/Caddy/whatever fronts the Vite SPA). It does
  // NOT touch the main site's build — see DEPLOY.md for the proxy rule.
  basePath: '/blog',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  // Next.js's basePath does NOT automatically prefix static /public files
  // (only routed pages), so llms.txt would otherwise only be reachable at
  // /llms.txt instead of /blog/llms.txt. This rewrite fixes that.
  async rewrites() {
    return [
      { source: '/blog/llms.txt', destination: '/llms.txt' },
    ];
  },
};

module.exports = nextConfig;