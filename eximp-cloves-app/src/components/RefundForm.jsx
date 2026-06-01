import React, { useState } from 'react';
import './RefundForm.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];
// Read Vite env at module top-level (safe for bundlers)
let VITE_BACKEND_API_URL = '';
try {
  VITE_BACKEND_API_URL = import.meta?.env?.VITE_BACKEND_API_URL || '';
} catch (e) {
  VITE_BACKEND_API_URL = '';
}

export default function RefundForm({ apiBase = '' }) {
  const resolvedApiBase = apiBase || VITE_BACKEND_API_URL || '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [estate, setEstate] = useState('');
  const [invoice, setInvoice] = useState('');
  const [comment, setComment] = useState('');
  const [accept, setAccept] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [toast, setToast] = useState({ show: false, text: '' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function onFileChange(e) {
    const chosen = Array.from(e.target.files || []);
    const errs = [];
    for (const f of chosen) {
      if (!ALLOWED_TYPES.includes(f.type)) errs.push(`Invalid file type: ${f.name}`);
      if (f.size > MAX_FILE_SIZE) errs.push(`File too large: ${f.name}`);
    }
    if (errs.length) {
      setMessage({ type: 'error', text: errs.join('\n') });
      return;
    }
    setFiles(chosen);
    setMessage(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !phone || !estate) {
      setMessage({ type: 'error', text: 'Please complete all required fields.' });
      return;
    }
    if (!accept) {
      setMessage({ type: 'error', text: 'You must accept the refund policy.' });
      return;
    }
    if (!files || files.length === 0) {
      setMessage({ type: 'error', text: 'Please upload at least one receipt.' });
      return;
    }

    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('phone', phone);
    fd.append('estate_bought', estate);
    if (invoice) fd.append('invoice_number', invoice);
    if (comment) fd.append('comment', comment);
    fd.append('accept_policy', 'true');
    for (const f of files) fd.append('files', f, f.name);

    setLoading(true);
    try {
      const res = await fetch((resolvedApiBase || '') + '/api/refunds/public/submit', {
        method: 'POST',
        body: fd,
      });
        let j = null;
        let text = null;
        try {
          text = await res.text();
          j = JSON.parse(text);
        } catch (parseErr) {
          // response wasn't JSON
          console.warn('Response parse failed', parseErr, text);
        }

        if (!res.ok) {
          const errMsg = (j && (j.detail || j.message)) || text || 'Submission failed';
          throw new Error(errMsg);
        }

        const successText = j && j.id ? `Refund request submitted. ID: ${j.id}. A confirmation email has been sent to ${email}.` : `Refund request submitted. A confirmation email has been sent to ${email}.`;
      setMessage({ type: 'success', text: successText });
      // show branded modal that requires user to click to close
      setShowSuccessModal(true);
      // reset form
      setName(''); setEmail(''); setPhone(''); setEstate(''); setInvoice(''); setComment(''); setFiles([]); setAccept(false);
      e.target.reset();
    } catch (err) {
      console.error('Submit error:', err);
      setMessage({ type: 'error', text: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="refund-card">
      <form className="refund-form" onSubmit={handleSubmit}>
        <div className="refund-header">
          <h2>Request a Refund</h2>
          <p className="muted">If you're unsure, please review our <a href="/refund" target="_blank" rel="noreferrer">refund policy</a>.</p>
        </div>

        <div className="grid">
          <div className="field">
            <label>Full name <span className="req">*</span></label>
            <input placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="field">
            <label>Email <span className="req">*</span></label>
            <input type="email" placeholder="you@domain.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="field">
            <label>Phone number <span className="req">*</span></label>
            <input placeholder="+234 812 000 0000" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>

          <div className="field">
            <label>Estate bought <span className="req">*</span></label>
            <input placeholder="Estate name / phase" value={estate} onChange={e => setEstate(e.target.value)} required />
          </div>

          <div className="field">
            <label>Invoice number</label>
            <input placeholder="INV-12345" value={invoice} onChange={e => setInvoice(e.target.value)} />
          </div>

          <div className="field full">
            <label>Comment / Remark</label>
            <textarea placeholder="Optional details" value={comment} onChange={e => setComment(e.target.value)} />
          </div>

          <div className="field full">
            <label>Upload receipts (PDF or image, max 10MB each) <span className="req">*</span></label>
            <input className="file-input" type="file" multiple required accept=".pdf,image/png,image/jpeg" onChange={onFileChange} />
            {files && files.length > 0 && (
              <ul className="file-list">
                {files.map((f, i) => (
                  <li key={i}>{f.name} — {(f.size/1024|0).toLocaleString()} KB</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <label className="policy">
          <input type="checkbox" checked={accept} onChange={e => setAccept(e.target.checked)} />
          I have read and agree to the <a href="/refund" target="_blank" rel="noreferrer">refund policy</a>
        </label>

        <div className="actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Refund'}</button>
          <button type="button" className="btn ghost" onClick={() => { setFiles([]); setMessage(null); setName(''); setEmail(''); setPhone(''); setEstate(''); setInvoice(''); setComment(''); setAccept(false); }}>Reset</button>
        </div>

        {message && message.type !== 'success' && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
        {showSuccessModal && (
          <div className="refund-success-modal">
            <div className="modal-backdrop" onClick={() => {}} />
            <div className="modal-card">
              <div style={{textAlign:'center'}}>
                <img src="/logo.svg" alt="Eximp & Cloves" style={{height:48, marginBottom:8}} />
                <h3 style={{margin:0}}>Refund Request Submitted</h3>
              </div>
              <p style={{color:'#444', marginTop:12}}>{message?.text || 'Your refund request has been received.'}</p>
              <div style={{display:'flex', justifyContent:'center', marginTop:18}}>
                <button className="btn primary" onClick={() => setShowSuccessModal(false)}>OK</button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
