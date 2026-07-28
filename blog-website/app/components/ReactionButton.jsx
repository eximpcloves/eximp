'use client';

import { useEffect, useState } from 'react';
import { ensureReaderIdentifier } from '../../lib/cookieConsent';

export default function ReactionButton({ postId, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Local-only "have I liked this" hint for this browser session; the
    // server enforces the real one-like-per-reader constraint.
    const key = `ec_blog_liked_${postId}`;
    if (typeof window !== 'undefined' && window.localStorage.getItem(key)) {
      setLiked(true);
    }
  }, [postId]);

  async function handleClick() {
    if (busy || liked) return;
    setBusy(true);
    try {
      const readerIdentifier = ensureReaderIdentifier();
      const res = await fetch(`${process.env.NEXT_PUBLIC_ERP_API_BASE || ''}/api/blog/public/posts/${postId}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reader_identifier: readerIdentifier, reaction_type: 'like' }),
      });
      const data = await res.json();
      setCount(data.total_reactions ?? count + 1);
      setLiked(true);
      window.localStorage.setItem(`ec_blog_liked_${postId}`, '1');
    } catch (e) {
      // fail silently, non-critical UX
    } finally {
      setBusy(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={busy || liked} style={{ ...styles.btn, ...(liked ? styles.liked : {}) }}>
      <span style={{ marginRight: 8 }}>{liked ? '👍' : '🤍'}</span>
      {count} {count === 1 ? 'like' : 'likes'}
    </button>
  );
}

const styles = {
  btn: {
    display: 'inline-flex', alignItems: 'center', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600,
    padding: '10px 18px', borderRadius: 24, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', cursor: 'pointer',
  },
  liked: { borderColor: '#C47D0A', color: '#C47D0A', background: '#fff8ee', cursor: 'default' },
};