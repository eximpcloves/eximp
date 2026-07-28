import { notFound } from 'next/navigation';
import { getPreviewBySlug } from '../../../lib/blogApi';

export const dynamic = 'force-dynamic'; // never cache a preview

export async function generateMetadata() {
  return {
    // Belt-and-suspenders: noindex both via meta and via the header set in
    // middleware.js, since some crawlers only honor one or the other.
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function PreviewPage({ params, searchParams }) {
  const { slug } = await params;
  const { token } = await searchParams;
  if (!token) notFound();

  const post = await getPreviewBySlug(slug, token);
  if (!post) notFound();

  const html = (post.content && post.content.html) || '';
  const css = (post.content && post.content.css) || '';

  return (
    <main style={styles.main}>
      <div style={styles.previewBanner}>
        Preview mode — this post is <strong>{post.status.replace('_', ' ')}</strong> and not
        publicly visible or indexed. Only people with this exact link can see it.
      </div>

      <article style={styles.article}>
        <h1 style={styles.title}>{post.title}</h1>
        <p style={styles.byline}>
          By <strong>{post.author_name_snapshot}</strong>
          {post.author_department_snapshot ? ` · ${post.author_department_snapshot}` : ''}
        </p>
        {post.cover_image_url && <img src={post.cover_image_url} alt={post.title} style={styles.cover} />}
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <div className="article-body" style={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}

const styles = {
  main: { fontFamily: 'Georgia, serif', maxWidth: 780, margin: '0 auto', padding: '40px 20px' },
  previewBanner: { background: '#fff7e6', border: '1px solid #f0c36d', color: '#7a5b00', padding: '14px 18px', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13.5, marginBottom: 32 },
  article: {},
  title: { fontSize: 40, lineHeight: 1.2, margin: '0 0 14px' },
  byline: { fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#777', margin: '0 0 20px' },
  cover: { width: '100%', maxHeight: 440, objectFit: 'cover', borderRadius: 10, marginBottom: 24 },
  body: { fontSize: 19, lineHeight: 1.75, color: '#1a1a1a' },
};