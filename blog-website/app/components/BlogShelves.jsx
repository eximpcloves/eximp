import Link from 'next/link';
import { getPlacements } from '../../lib/blogApi';

export async function FeaturedShelf() {
  const items = (await getPlacements('featured')) || [];
  if (items.length === 0) return null;
  return (
    <section style={{ margin: '40px 0' }}>
      <h2 style={styles.shelfTitle}>Featured</h2>
      <div style={styles.featuredGrid}>
        {items.map((item) => {
          const p = item.blog_posts;
          if (!p) return null;
          return (
            <Link key={p.id} href={`/${p.slug}`} style={styles.featuredCard}>
              {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} style={styles.featuredImg} />}
              <span style={styles.featuredCardTitle}>{p.title}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export async function TickerShelf() {
  const items = (await getPlacements('ticker')) || [];
  if (items.length === 0) return null;
  return (
    <div style={styles.tickerWrap}>
      <div style={styles.tickerTrack}>
        {items.concat(items).map((item, idx) => {
          const p = item.blog_posts;
          if (!p) return null;
          return (
            <Link key={`${p.id}-${idx}`} href={`/${p.slug}`} style={styles.tickerItem}>
              {p.title}
            </Link>
          );
        })}
      </div>
      <style>{`
        @keyframes ec-blog-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

export async function TopContentShelf() {
  const items = (await getPlacements('top_content')) || [];
  if (items.length === 0) return null;
  return (
    <section style={{ margin: '40px 0' }}>
      <h2 style={styles.shelfTitle}>Top Content</h2>
      <ol style={styles.topList}>
        {items.map((item, idx) => {
          const p = item.blog_posts;
          if (!p) return null;
          return (
            <li key={p.id} style={styles.topItem}>
              <span style={styles.topRank}>{idx + 1}</span>
              <Link href={`/${p.slug}`} style={styles.topLink}>{p.title}</Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

const styles = {
  shelfTitle: { fontFamily: 'Georgia, serif', fontSize: 22, borderBottom: '2px solid #C47D0A', display: 'inline-block', paddingBottom: 4, marginBottom: 20 },
  featuredGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 },
  featuredCard: { textDecoration: 'none', color: '#1a1a1a', display: 'block' },
  featuredImg: { width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 },
  featuredCardTitle: { fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.4 },
  tickerWrap: { overflow: 'hidden', background: '#111', padding: '10px 0', whiteSpace: 'nowrap' },
  tickerTrack: { display: 'inline-flex', gap: 40, animation: 'ec-blog-ticker 30s linear infinite' },
  tickerItem: { color: '#C47D0A', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' },
  topList: { listStyle: 'none', padding: 0, margin: 0 },
  topItem: { display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid #f0f0f0' },
  topRank: { fontFamily: 'Georgia, serif', fontSize: 20, color: '#C47D0A', width: 28, flexShrink: 0 },
  topLink: { fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#1a1a1a', textDecoration: 'none', fontWeight: 600 },
};