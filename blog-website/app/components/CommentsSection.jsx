'use client';

import { useEffect, useState } from 'react';

export default function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ author_name: '', author_email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // honeypot field - bots fill every input, real visitors never see/fill this
  const [honeypot, setHoneypot] = useState('');

  const apiBase = process.env.NEXT_PUBLIC_ERP_API_BASE || '';

  useEffect(() => {
    fetch(`${apiBase}/api/blog/public/posts/${postId}/comments`)
      .then((r) => r.json())
      .then(setComments)
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [postId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypot) return; // silently drop bot submissions
    if (!form.author_name.trim() || !form.author_email.trim() || !form.content.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/api/blog/public/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setForm({ author_name: '', author_email: '', content: '' });
      setSubmitted(true);
      // New comments await moderation, so don't show it in the list yet —
      // just confirm receipt.
    } catch (e) {
      alert('Could not post your comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Comments {comments.length > 0 ? `(${comments.length})` : ''}</h2>

      {loading ? (
        <p style={styles.muted}>Loading comments…</p>
      ) : comments.length === 0 ? (
        <p style={styles.muted}>Be the first to comment.</p>
      ) : (
        <ul style={styles.list}>
          {comments.map((c) => (
            <li key={c.id} style={styles.comment}>
              <div style={styles.avatar}>{(c.author_name || '?').charAt(0).toUpperCase()}</div>
              <div>
                <div style={styles.commentHeader}>
                  <strong>{c.author_name}</strong>
                  <span style={styles.date}>{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
                <p style={styles.commentBody}>{c.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.formHeading}>Leave a comment</h3>
        {submitted && <p style={styles.success}>Thanks — your comment is awaiting a quick review before it appears.</p>}

        {/* Honeypot - hidden from real visitors via CSS, bots fill it anyway */}
        <input
          type="text" tabIndex={-1} autoComplete="off" value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }} aria-hidden="true"
        />

        <input
          type="text" placeholder="Your name" value={form.author_name}
          onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
          style={styles.input} required
        />
        <div>
          <input
            type="email" placeholder="Email" value={form.author_email}
            onChange={(e) => setForm((f) => ({ ...f, author_email: e.target.value }))}
            style={styles.input} required
          />
          <p style={styles.hint}>Won't be published — used only to prevent spam.</p>
        </div>
        <textarea
          placeholder="Write your comment…" value={form.content} rows={4}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          style={{ ...styles.input, resize: 'vertical' }} required
        />
        <button type="submit" disabled={submitting} style={styles.submitBtn}>
          {submitting ? 'Posting…' : 'Post Comment'}
        </button>
      </form>
    </section>
  );
}

const styles = {
  section: { marginTop: 64, fontFamily: 'Inter, sans-serif', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' },
  heading: { fontFamily: 'Georgia, serif', fontSize: 24, marginBottom: 20 },
  muted: { color: '#888', fontSize: 14 },
  list: { listStyle: 'none', padding: 0, margin: '0 0 40px' },
  comment: { display: 'flex', gap: 12, marginBottom: 24 },
  avatar: { width: 36, height: 36, borderRadius: '50%', background: '#C47D0A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 },
  commentHeader: { display: 'flex', gap: 10, alignItems: 'baseline' },
  date: { fontSize: 12, color: '#999' },
  commentBody: { margin: '4px 0 0', fontSize: 15, lineHeight: 1.6, color: '#333' },
  form: { borderTop: '1px solid #eee', paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 12 },
  formHeading: { fontSize: 16, fontWeight: 700, margin: 0 },
  input: { width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' },
  hint: { fontSize: 11.5, color: '#999', margin: '4px 0 0' },
  success: { background: '#f0fdf4', color: '#166534', padding: '10px 14px', borderRadius: 6, fontSize: 13.5 },
  submitBtn: { alignSelf: 'flex-start', background: '#C47D0A', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: 'pointer' },
};