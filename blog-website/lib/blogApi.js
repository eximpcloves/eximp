// Central place to call the ERP backend's public blog endpoints.
// ERP_API_BASE should point at your FastAPI backend:
//   https://app.eximps-cloves.com   (production — your ERP's actual domain)
//   http://localhost:8000           (local dev, matching your uvicorn port)
const ERP_API_BASE = process.env.ERP_API_BASE || 'https://app.eximps-cloves.com';

async function fetchJson(path, options = {}) {
  try {
    const res = await fetch(`${ERP_API_BASE}/api/blog${path}`, {
      ...options,
      // Revalidate frequently so newly-published/edited posts show up without
      // needing a full redeploy — ISR, not static-forever.
      next: { revalidate: options.revalidate ?? 60 },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Blog API error ${res.status} on ${path}`);
    }

    return res.json();
  } catch (error) {
    console.error('Blog API request failed:', path, error);
    return null;
  }
}

export async function getPublishedPosts(page = 1, pageSize = 10, category) {
  const params = new URLSearchParams({ page: String(page), page_size: String(pageSize) });
  if (category) params.set('category', category);
  return fetchJson(`/public/posts?${params.toString()}`);
}

export async function getPostBySlug(slug) {
  return fetchJson(`/public/posts/${encodeURIComponent(slug)}`);
}

export async function getPreviewBySlug(slug, token) {
  return fetchJson(`/public/preview/${encodeURIComponent(slug)}?token=${encodeURIComponent(token)}`, { revalidate: 0 });
}

export async function getPlacements(type) {
  return fetchJson(`/public/placements/${type}`, { revalidate: 30 });
}

export async function getComments(postId) {
  return fetchJson(`/public/posts/${postId}/comments`, { revalidate: 15 });
}

export async function postComment(postId, data) {
  const res = await fetch(`${ERP_API_BASE}/api/blog/public/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to post comment');
  return res.json();
}

export async function getReactionCount(postId) {
  return fetchJson(`/public/posts/${postId}/reactions`, { revalidate: 15 });
}

export async function react(postId, readerIdentifier) {
  const res = await fetch(`${ERP_API_BASE}/api/blog/public/posts/${postId}/react`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reader_identifier: readerIdentifier, reaction_type: 'like' }),
  });
  if (!res.ok) throw new Error('Failed to react');
  return res.json();
}

export { ERP_API_BASE };