import Link from 'next/link';

export default function Pagination({ page, pageSize, total, basePath = '/' }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const hrefFor = (p) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  return (
    <nav aria-label="Blog pagination" style={styles.nav}>
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" style={styles.link}>&larr; Newer posts</Link>
      ) : (
        <span style={styles.disabled}>&larr; Newer posts</span>
      )}

      <span style={styles.pageInfo}>Page {page} of {totalPages}</span>

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" style={styles.link}>Older posts &rarr;</Link>
      ) : (
        <span style={styles.disabled}>Older posts &rarr;</span>
      )}
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '48px 0', fontFamily: 'Inter, sans-serif', fontSize: 14 },
  link: { color: '#C47D0A', fontWeight: 600, textDecoration: 'none' },
  disabled: { color: '#c4c4c4', fontWeight: 600 },
  pageInfo: { color: '#888', fontSize: 13 },
};