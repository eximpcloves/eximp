/** @type {import('next').NextConfig} */
const ERP_BACKEND = process.env.ERP_API_BASE || 'https://app.eximps-cloves.com';

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
  async rewrites() {
    return [
      // Next.js's basePath does NOT automatically prefix static /public files
      // (only routed pages), so llms.txt would otherwise only be reachable at
      // /llms.txt instead of /blog/llms.txt. This rewrite fixes that.
      { source: '/blog/llms.txt', destination: '/llms.txt' },

      // Proxy /api/blog/* to the ERP backend so client-side components
      // (CommentsSection, ReactionButton) work without hardcoding a domain
      // in the build. NEXT_PUBLIC_ERP_API_BASE defaults to '' which means
      // calls go to the Next.js host, which we then forward here.
      {
        source: '/api/blog/:path*',
        destination: `${ERP_BACKEND}/api/blog/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;