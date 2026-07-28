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
          <h1 style={styles.title}>{post.title}</h1>
          <p style={styles.byline}>
            By <strong>{post.author_name_snapshot}</strong>
            {post.author_department_snapshot ? ` · ${post.author_department_snapshot}` : ''}
            {' · '}
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </p>
          {post.cover_image_url && (
            <img src={post.cover_image_url} alt={post.title} style={styles.cover} />
          )}
        </header>

        {/* Scoped styles from the GrapesJS editor, then the actual post HTML */}
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <div style={styles.body} dangerouslySetInnerHTML={{ __html: html }} />

        <div style={styles.reactionRow}>
          <ReactionButton postId={post.id} initialCount={reactionData?.total_reactions || 0} />
        </div>
      </article>

      <CommentsSection postId={post.id} />
    </main>
  );
}

const styles = {
  main: { fontFamily: 'Georgia, serif', maxWidth: 780, margin: '0 auto', padding: '40px 20px' },
  article: { marginBottom: 40 },
  header: { marginBottom: 32 },
  title: { fontSize: 44, lineHeight: 1.2, margin: '0 0 14px' },
  byline: { fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#777', margin: '0 0 20px' },
  cover: { width: '100%', maxHeight: 440, objectFit: 'cover', borderRadius: 10 },
  body: { fontSize: 19, lineHeight: 1.75, color: '#1a1a1a' },
  reactionRow: { marginTop: 40, paddingTop: 24, borderTop: '1px solid #eee' },
};