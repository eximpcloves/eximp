import Link from 'next/link';
import { getPublishedPosts } from '../lib/blogApi';
import { FeaturedShelf, TickerShelf, TopContentShelf } from './components/BlogShelves';

export const dynamic = 'force-dynamic';

function estimateReadTime(excerpt) {
  if (!excerpt) return null;
  const words = excerpt.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}

export default async function HomePage() {
  let posts = [];

  try {
    const data = await getPublishedPosts(1, 9);
    posts = Array.isArray(data) ? data : data?.items || data?.posts || [];
  } catch (error) {
    console.error('Failed to load blog posts:', error);
  }

  // First post is the featured hero if it has a cover image
  const [heroPost, ...restPosts] = posts;

  return (
    <main style={styles.main}>

      {/* ── Hero Banner ── */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Eximp & Cloves Insights</p>
        <h1 style={styles.heroTitle}>Stories, market updates, and investment perspectives</h1>
        <p style={styles.heroSub}>
          Browse the latest insights from Eximp & Cloves and stay informed on property, strategy, and growth.
        </p>
      </section>

      <TickerShelf />
      <FeaturedShelf />

      {/* ── Latest Posts ── */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Latest Posts</h2>
          {posts.length > 0 && (
            <span style={styles.count}>{posts.length} articles</span>
          )}
        </div>

        {posts.length === 0 ? (
          <div style={styles.emptyState}>
            No posts are published yet. Please check back soon.
          </div>
        ) : (
          <div style={styles.postGrid}>
            {posts.map((post) => {
              const initial = (post.author_name_snapshot || 'E')[0].toUpperCase();
              const date = post.published_at
                ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : null;

              return (
                <Link key={post.id || post.slug} href={`/${post.slug}`} style={styles.postCard}>
                  {/* Cover image */}
                  {post.cover_image_url ? (
                    <div style={styles.imgWrapper}>
                      <img src={post.cover_image_url} alt={post.title} style={styles.postImage} />
                      {post.category && (
                        <span style={styles.imgCategory}>{post.category}</span>
                      )}
                    </div>
                  ) : (
                    /* Placeholder when no image */
                    post.category && (
                      <div style={styles.noImgHeader}>
                        <span style={styles.noImgCategory}>{post.category}</span>
                      </div>
                    )
                  )}

                  <div style={styles.postContent}>
                    {/* Title */}
                    <h3 style={styles.postTitle}>{post.title}</h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p style={styles.postExcerpt}>
                        {post.excerpt.length > 110 ? post.excerpt.slice(0, 110) + '…' : post.excerpt}
                      </p>
                    )}

                    {/* Meta row */}
                    <div style={styles.postMetaRow}>
                      {/* Author avatar + name */}
                      <div style={styles.authorGroup}>
                        <div style={styles.avatarSmall}>{initial}</div>
                        <div style={styles.authorTexts}>
                          <span style={styles.authorName}>
                            {post.author_name_snapshot || 'Eximp & Cloves'}
                          </span>
                          {post.author_department_snapshot && (
                            <span style={styles.deptMeta}>{post.author_department_snapshot}</span>
                          )}
                        </div>
                      </div>
                      {/* Date */}
                      {date && <span style={styles.postDate}>{date}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <TopContentShelf />
    </main>
  );
}

const styles = {
  main: {
    fontFamily: 'Inter, sans-serif',
    maxWidth: 1140,
    margin: '0 auto',
    padding: '40px 20px 100px',
  },

  /* Hero section */
  hero: {
    padding: '40px 0 36px',
    borderBottom: '1px solid #eaeaea',
    marginBottom: 32,
    maxWidth: 740,
  },
  eyebrow: {
    margin: '0 0 10px',
    color: '#C47D0A',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
  },
  heroTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(26px, 5vw, 44px)',
    lineHeight: 1.2,
    margin: '0 0 14px',
    color: '#111',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  heroSub: {
    fontSize: 17,
    lineHeight: 1.7,
    color: '#666',
    margin: 0,
  },

  /* Section */
  section: { marginBottom: 48 },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 22,
    fontWeight: 700,
    margin: 0,
    color: '#111',
  },
  count: {
    background: '#f5efe6',
    color: '#C47D0A',
    padding: '5px 12px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  },
  emptyState: {
    padding: 28,
    border: '1px solid #eee',
    borderRadius: 12,
    color: '#888',
    background: '#fafafa',
    fontFamily: 'Georgia, serif',
    fontSize: 16,
  },

  /* Grid */
  postGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
  },

  /* Card */
  postCard: {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    color: 'inherit',
    border: '1px solid #eaeaea',
    borderRadius: 14,
    overflow: 'hidden',
    background: '#fff',
    transition: 'box-shadow 0.2s, transform 0.2s',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },

  imgWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s',
  },
  imgCategory: {
    position: 'absolute',
    top: 12,
    left: 12,
    background: 'rgba(196,125,10,0.9)',
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '3px 10px',
    borderRadius: 999,
    backdropFilter: 'blur(4px)',
  },
  noImgHeader: {
    background: '#f9f5ef',
    padding: '14px 16px 0',
  },
  noImgCategory: {
    display: 'inline-block',
    background: '#f5efe6',
    color: '#C47D0A',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '3px 10px',
    borderRadius: 999,
  },

  postContent: {
    padding: '18px 18px 16px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  postTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 19,
    fontWeight: 700,
    lineHeight: 1.35,
    margin: '0 0 10px',
    color: '#111',
    letterSpacing: '-0.01em',
  },

  postExcerpt: {
    fontSize: 14,
    lineHeight: 1.65,
    color: '#777',
    margin: '0 0 16px',
    flex: 1,
  },

  postMetaRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid #f3f3f3',
    paddingTop: 12,
    gap: 10,
  },

  authorGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },

  avatarSmall: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #C47D0A, #e09c2e)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },

  authorTexts: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },

  authorName: {
    fontSize: 12,
    fontWeight: 600,
    color: '#333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  deptMeta: {
    fontSize: 11,
    color: '#C47D0A',
    fontWeight: 600,
  },

  postDate: {
    fontSize: 11,
    color: '#aaa',
    flexShrink: 0,
  },
};