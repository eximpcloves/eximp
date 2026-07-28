import { notFound } from 'next/navigation';
import { getPostBySlug, getReactionCount } from '../../lib/blogApi';
import CommentsSection from '../components/CommentsSection';
import ReactionButton from '../components/ReactionButton';
import ReadingProgress from '../components/ReadingProgress';

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

function estimateReadTime(html) {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = (post.content && post.content.html) || '';
  const css  = (post.content && post.content.css)  || '';
  const reactionData = await getReactionCount(post.id);
  const readMinutes = estimateReadTime(html);

  const authorInitial = (post.author_name_snapshot || 'E')[0].toUpperCase();

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.SITE_URL || 'https://eximps-cloves.com'}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main style={styles.main}>
        <article>
          {/* ── Article Header ── */}
          <header style={styles.header}>

            {/* Category pill */}
            {post.category && (
              <span style={styles.categoryBadge}>{post.category}</span>
            )}

            {/* Title */}
            <h1 style={styles.title}>{post.title}</h1>

            {/* Excerpt / lead paragraph */}
            {post.excerpt && (
              <p style={styles.excerpt}>{post.excerpt}</p>
            )}

            {/* Author bar */}
            <div style={styles.authorBar}>
              <div style={styles.authorAvatar}>{authorInitial}</div>
              <div style={styles.authorInfo}>
                <div style={styles.authorName}>
                  {post.author_name_snapshot || 'Eximp & Cloves Team'}
                </div>
                <div style={styles.authorMeta}>
                  {post.author_department_snapshot && (
                    <span style={styles.dept}>{post.author_department_snapshot}</span>
                  )}
                  {post.author_department_snapshot && <span style={styles.dot}>·</span>}
                  {formattedDate && (
                    <time dateTime={post.published_at}>{formattedDate}</time>
                  )}
                  {formattedDate && <span style={styles.dot}>·</span>}
                  <span>{readMinutes} min read</span>
                </div>
              </div>

              {/* Inline reaction count pill */}
              <div style={styles.reactionPill}>
                <span>❤️</span>
                <span>{reactionData?.total_reactions || 0}</span>
              </div>
            </div>

            {/* Divider */}
            <div style={styles.divider} />
          </header>

          {/* ── Cover Image — full-width, cinematic ── */}
          {post.cover_image_url && (
            <figure style={styles.coverFigure}>
              <img
                src={post.cover_image_url}
                alt={post.title}
                style={styles.coverImg}
              />
            </figure>
          )}

          {/* ── Article Body ── */}
          {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
          <div className="article-body" style={styles.body} dangerouslySetInnerHTML={{ __html: html }} />

          {/* ── Tags ── */}
          {post.tags && post.tags.length > 0 && (
            <div style={styles.tagsRow}>
              {post.tags.map((tag) => (
                <span key={tag} style={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          {/* ── Reaction & Share Bar ── */}
          <div style={styles.actionBar}>
            <ReactionButton postId={post.id} initialCount={reactionData?.total_reactions || 0} />

            <div style={styles.shareGroup}>
              <span style={styles.shareLabel}>Share</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://eximps-cloves.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.shareBtn}
                aria-label="Share on X / Twitter"
              >
                𝕏
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://eximps-cloves.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.shareBtn}
                aria-label="Share on LinkedIn"
              >
                in
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + ' — https://eximps-cloves.com/blog/' + post.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.shareBtn}
                aria-label="Share on WhatsApp"
              >
                💬
              </a>
            </div>
          </div>

          {/* ── Author Card ── */}
          <div style={styles.authorCard}>
            <div style={styles.authorCardAvatar}>{authorInitial}</div>
            <div style={styles.authorCardBody}>
              <div style={styles.authorCardName}>
                {post.author_name_snapshot || 'Eximp & Cloves Team'}
              </div>
              {post.author_department_snapshot && (
                <div style={styles.authorCardDept}>
                  {post.author_department_snapshot} · Eximp & Cloves Infrastructure Ltd
                </div>
              )}
              <div style={styles.authorCardBio}>
                Published on {formattedDate} · {readMinutes} min read
              </div>
            </div>
          </div>
        </article>

        {/* ── Comments ── */}
        <div style={styles.commentsWrapper}>
          <CommentsSection postId={post.id} />
        </div>
      </main>
    </>
  );
}

const styles = {
  /* Page wrapper — no max-width so the cover can go full-bleed */
  main: {
    fontFamily: 'Georgia, serif',
    background: '#fff',
    color: '#1a1a1a',
    paddingBottom: 80,
  },

  /* Header: constrained column */
  header: {
    maxWidth: 740,
    margin: '0 auto',
    padding: '48px 20px 0',
  },

  categoryBadge: {
    display: 'inline-block',
    background: '#f5efe6',
    color: '#C47D0A',
    padding: '4px 14px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 20,
  },

  title: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(28px, 5.5vw, 46px)',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#111',
    margin: '0 0 20px',
    letterSpacing: '-0.02em',
  },

  excerpt: {
    fontFamily: 'Georgia, serif',
    fontSize: 22,
    lineHeight: 1.6,
    color: '#555',
    margin: '0 0 28px',
    fontStyle: 'italic',
  },

  authorBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    fontFamily: 'Inter, sans-serif',
    marginBottom: 24,
  },

  authorAvatar: {
    width: 46,
    height: 46,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #C47D0A, #e09c2e)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 18,
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(196,125,10,0.25)',
  },

  authorInfo: { flex: 1 },

  authorName: {
    fontWeight: 700,
    fontSize: 15,
    color: '#111',
    marginBottom: 3,
  },

  authorMeta: {
    fontSize: 13,
    color: '#777',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },

  dept: {
    color: '#C47D0A',
    fontWeight: 600,
  },

  dot: {
    color: '#bbb',
  },

  reactionPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: '#f9f9f9',
    border: '1px solid #eee',
    borderRadius: 999,
    padding: '5px 14px',
    fontSize: 13,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    color: '#555',
  },

  divider: {
    height: 1,
    background: '#eaeaea',
    margin: '0 0 0',
  },

  /* Cover image: full-bleed with max-height */
  coverFigure: {
    margin: '0 0 0',
    padding: 0,
    background: '#f3f4f6',
    maxHeight: 520,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  coverImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    maxHeight: 520,
  },

  /* Body: constrained column, large comfortable reading text */
  body: {
    maxWidth: 740,
    margin: '48px auto 0',
    padding: '0 20px',
    fontSize: 19,
    lineHeight: 1.85,
    color: '#1a1a1a',
    fontFamily: 'Georgia, serif',
  },

  tagsRow: {
    maxWidth: 740,
    margin: '40px auto 0',
    padding: '0 20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },

  tag: {
    display: 'inline-block',
    background: '#f5f5f5',
    color: '#555',
    border: '1px solid #e5e7eb',
    borderRadius: 999,
    padding: '5px 14px',
    fontSize: 13,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
  },

  /* Reaction + share bar */
  actionBar: {
    maxWidth: 740,
    margin: '40px auto 0',
    padding: '20px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid #eaeaea',
    borderBottom: '1px solid #eaeaea',
    gap: 16,
    flexWrap: 'wrap',
  },

  shareGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'Inter, sans-serif',
  },

  shareLabel: {
    fontSize: 13,
    color: '#999',
    fontWeight: 500,
    marginRight: 4,
  },

  shareBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '1px solid #e5e7eb',
    background: '#fff',
    color: '#444',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 700,
    transition: 'border-color 0.15s, background 0.15s',
  },

  /* Author card at the bottom */
  authorCard: {
    maxWidth: 740,
    margin: '48px auto 0',
    padding: '28px 24px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 18,
    background: '#fafafa',
    border: '1px solid #eaeaea',
    borderRadius: 14,
    fontFamily: 'Inter, sans-serif',
    /* ensure column padding */
    maxWidth: 'min(740px, calc(100% - 40px))',
  },

  authorCardAvatar: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #C47D0A, #e09c2e)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 22,
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(196,125,10,0.2)',
  },

  authorCardBody: { flex: 1 },

  authorCardName: {
    fontWeight: 700,
    fontSize: 16,
    color: '#111',
    marginBottom: 4,
  },

  authorCardDept: {
    fontSize: 13,
    color: '#C47D0A',
    fontWeight: 600,
    marginBottom: 6,
  },

  authorCardBio: {
    fontSize: 13,
    color: '#888',
    lineHeight: 1.5,
  },

  commentsWrapper: {
    maxWidth: 740,
    margin: '64px auto 0',
    padding: '0 20px',
  },
};