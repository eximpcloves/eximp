import Link from 'next/link';
import { getPublishedPosts } from '../lib/blogApi';
import { FeaturedShelf, TickerShelf, TopContentShelf } from './components/BlogShelves';

// Force dynamic rendering so newly-published posts appear immediately
// without needing a re-deploy. ISR (revalidate: 60) can miss the first
// publish because the page was pre-built with zero posts at deploy time.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let posts = [];

  try {
    const data = await getPublishedPosts(1, 8);
    posts = Array.isArray(data) ? data : data?.items || data?.posts || [];
  } catch (error) {
    console.error('Failed to load blog posts:', error);
  }

  return (
    <main style={styles.main}>
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Eximp & Cloves Insights</p>
        <h1 style={styles.title}>Stories, market updates, and investment perspectives</h1>
        <p style={styles.subtitle}>
          Browse the latest blog posts from Eximp & Cloves and stay informed on property, strategy, and growth.
        </p>
      </section>

      <TickerShelf />
      <FeaturedShelf />

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Latest Posts</h2>
          {posts.length > 0 && <span style={styles.count}>{posts.length}</span>}
        </div>

        {posts.length === 0 ? (
          <div style={styles.emptyState}>
            No posts are published yet. Please check back soon.
          </div>
        ) : (
          <div style={styles.postGrid}>
            {posts.map((post) => (
              <Link key={post.id || post.slug} href={`/${post.slug}`} style={styles.postCard}>
                {post.cover_image_url && (
                  <img src={post.cover_image_url} alt={post.title} style={styles.postImage} />
                )}
                <div style={styles.postContent}>
                  {post.category && <span style={styles.cardCategory}>{post.category}</span>}
                  <h3 style={styles.postTitle}>{post.title}</h3>
                  {post.excerpt && <p style={styles.postExcerpt}>{post.excerpt}</p>}
                  <div style={styles.postMetaRow}>
                    <span style={styles.authorMeta}>
                      👤 <strong>{post.author_name_snapshot || 'Eximp & Cloves'}</strong>
                      {post.author_department_snapshot && (
                        <span style={styles.deptMeta}> · {post.author_department_snapshot}</span>
                      )}
                    </span>
                    {post.published_at && (
                      <span style={styles.postMeta}>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <TopContentShelf />
    </main>
  );
}

const styles = {
  main: { fontFamily: 'Inter, sans-serif', maxWidth: 1100, margin: '0 auto', padding: '40px 20px 80px' },
  hero: { padding: '32px 0 24px', borderBottom: '1px solid #eee', marginBottom: 28 },
  eyebrow: { margin: 0, color: '#C47D0A', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em' },
  title: { fontFamily: 'Georgia, serif', fontSize: 40, lineHeight: 1.2, margin: '8px 0 10px', color: '#111' },
  subtitle: { fontSize: 17, lineHeight: 1.7, color: '#555', margin: 0, maxWidth: 760 },
  section: { marginBottom: 36 },
  sectionHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 },
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 24, margin: 0 },
  count: { background: '#f5efe6', color: '#C47D0A', padding: '6px 10px', borderRadius: 999, fontSize: 13, fontWeight: 700 },
  emptyState: { padding: '24px', border: '1px solid #eee', borderRadius: 10, color: '#666', background: '#fafafa' },
  postGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 },
  postCard: { display: 'block', textDecoration: 'none', color: 'inherit', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', background: '#fff' },
  postImage: { width: '100%', height: 180, objectFit: 'cover', display: 'block' },
  postContent: { padding: '16px' },
  cardCategory: { display: 'inline-block', background: '#f5efe6', color: '#C47D0A', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 },
  postTitle: { fontFamily: 'Georgia, serif', fontSize: 20, margin: '0 0 8px', color: '#111' },
  postExcerpt: { fontSize: 14, lineHeight: 1.6, color: '#666', margin: '0 0 12px' },
  postMetaRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f5f5f5', paddingTop: 10, fontSize: 12 },
  authorMeta: { color: '#444' },
  deptMeta: { color: '#C47D0A', fontWeight: 600 },
  postMeta: { fontSize: 12, color: '#888', margin: 0 },
};