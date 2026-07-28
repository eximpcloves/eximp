import { getPublishedPosts } from '../lib/blogApi';

const SITE_URL = process.env.SITE_URL || 'https://eximps-cloves.com';

export default async function sitemap() {
  const entries = [
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
  ];

  // Pull every published post across all pages, not just page 1.
  let page = 1;
  const pageSize = 100;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const data = await getPublishedPosts(page, pageSize);
    const posts = data?.posts || [];
    if (posts.length === 0) break;

    for (const p of posts) {
      entries.push({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: p.published_at,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    if (posts.length < pageSize || (data?.total && page * pageSize >= data.total)) break;
    page += 1;
  }

  return entries;
}