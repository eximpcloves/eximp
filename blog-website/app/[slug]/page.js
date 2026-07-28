import { notFound } from 'next/navigation';
import { getPostBySlug, getReactionCount } from '../../lib/blogApi';
import CommentsSection from '../components/CommentsSection';
import ReactionButton from '../components/ReactionButton';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || '';

  return {
    title,
    description,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name_snapshot].filter(Boolean),
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = (post.content && post.content.html) || '';
  const css = (post.content && post.content.css) || '';
  const reactionData = await getReactionCount(post.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo_description || post.excerpt,
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Person',
      name: post.author_name_snapshot || 'Eximp & Cloves',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Eximp & Cloves Infrastructure Ltd',
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${process.env.SITE_URL || 'https://eximps-cloves.com'}/blog/${post.slug}` },
  };

  return (
    <main style={styles.main}>
      {/* JSON-LD structured data for search engines and LLM crawlers */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article style={styles.article}>
        <header style={styles.header}>
          {post.category && <span style={styles.categoryBadge}>{post.category}</span>}
          <h1 style={styles.title}>{post.title}</h1>
          <div style={styles.authorBar}>
            <div style={styles.authorAvatar}>
              {(post.author_name_snapshot || 'E')[0].toUpperCase()}
            </div>
            <div>
              <div style={styles.authorName}>
                {post.author_name_snapshot || 'Eximp & Cloves Team'}
              </div>
              <div style={styles.authorMeta}>
                {post.author_department_snapshot && <span style={styles.department}>{post.author_department_snapshot}</span>}
                {post.author_department_snapshot && post.published_at && ' · '}
                {post.published_at && (
                  <time dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                )}
              </div>
            </div>
          </div>
          {post.cover_image_url && (
            <img src={post.cover_image_url} alt={post.title} style={styles.cover} />
          )}
        </header>

        {/* Scoped styles from the GrapesJS editor, then the actual post HTML */}
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <div className="article-body" style={styles.body} dangerouslySetInnerHTML={{ __html: html }} />

        <div style={styles.reactionRow}>
          <ReactionButton postId={post.id} initialCount={reactionData?.total_reactions || 0} />
        </div>
      </article>

      <CommentsSection postId={post.id} />
    </main>
  );
}

const styles = {
  main: { fontFamily: 'Georgia, serif', maxWidth: 780, margin: '0 auto', padding: '32px 16px 60px' },
  article: { marginBottom: 40 },
  header: { marginBottom: 32 },
  categoryBadge: { display: 'inline-block', background: '#f5efe6', color: '#C47D0A', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 },
  title: { fontSize: 'clamp(26px, 5.5vw, 42px)', lineHeight: 1.25, margin: '0 0 20px', color: '#111', fontWeight: 700 },
  authorBar: { display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'Inter, sans-serif', margin: '0 0 24px', padding: '12px 16px', background: '#f9f9f9', borderRadius: 10, border: '1px solid #eee' },
  authorAvatar: { width: 42, height: 42, borderRadius: '50%', background: '#C47D0A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, flexShrink: 0 },
  authorName: { fontWeight: 700, fontSize: 15, color: '#111' },
  authorMeta: { fontSize: 13, color: '#666', marginTop: 2 },
  department: { color: '#C47D0A', fontWeight: 600 },
  cover: { width: '100%', maxHeight: 440, objectFit: 'cover', borderRadius: 10 },
  body: { fontSize: 18, lineHeight: 1.75, color: '#1a1a1a' },
  reactionRow: { marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' },
};