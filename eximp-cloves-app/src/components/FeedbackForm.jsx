import React, { useState, useEffect } from 'react';
import { propertiesArray } from '../data/propertiesData';
import './FeedbackForm.css';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_TYPES = [
  'application/pdf', 
  'image/png', 
  'image/jpeg', 
  'video/mp4', 
  'video/quicktime', 
  'video/webm',
  'video/x-msvideo',
  'video/mpeg'
];

let VITE_BACKEND_API_URL = '';
try {
  VITE_BACKEND_API_URL = import.meta?.env?.VITE_BACKEND_API_URL || '';
} catch (e) {
  VITE_BACKEND_API_URL = '';
}

export default function FeedbackForm({ apiBase = '' }) {
  const resolvedApiBase = apiBase || VITE_BACKEND_API_URL || '';
  
  // State variables
  const [userType, setUserType] = useState('client');
  const [feedbackType, setFeedbackType] = useState('general');
  const [experienceRating, setExperienceRating] = useState(5);
  const [npsScore, setNpsScore] = useState(10);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [comments, setComments] = useState('');
  const [propertyInterest, setPropertyInterest] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [files, setFiles] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  // Hover states for stars
  const [expHover, setExpHover] = useState(0);
  const [commHover, setCommHover] = useState(0);

  // Auto-fill fields if consent is toggled off
  useEffect(() => {
    if (!contactConsent) {
      // Keep name/email if already typed, but they are no longer compulsory
    }
  }, [contactConsent]);

  function onFileChange(e) {
    const chosen = Array.from(e.target.files || []);
    const errs = [];
    for (const f of chosen) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        errs.push(`Unsupported file type: "${f.name}". Only PDFs, images, and videos are allowed.`);
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        if (f.type.startsWith('video/')) {
          errs.push(`Video too large: "${f.name}" exceeds the 50MB limit. For large videos, please upload to Google Drive, Dropbox, or OneDrive and paste the shared link in the comments/remarks box above.`);
        } else {
          errs.push(`File too large: "${f.name}" exceeds the 50MB limit.`);
        }
        continue;
      }
    }
    if (errs.length) {
      setMessage({ type: 'error', text: errs.join('\n') });
      return;
    }
    setFiles(prev => [...prev, ...chosen]);
    setMessage(null);
  }

  function removeFile(index) {
    setFiles(prev => prev.filter((_, idx) => idx !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!comments.trim()) {
      setMessage({ type: 'error', text: 'Comments/remarks are required.' });
      return;
    }

    if (contactConsent) {
      if (!name.trim() || !email.trim()) {
        setMessage({ type: 'error', text: 'Please fill in your name and email so we can contact you.' });
        return;
      }
    }

    const fd = new FormData();
    fd.append('user_type', userType);
    fd.append('feedback_type', feedbackType);
    fd.append('experience_rating', experienceRating);
    fd.append('nps_score', npsScore);
    fd.append('communication_rating', communicationRating);
    fd.append('comments', comments);
    fd.append('contact_consent', contactConsent ? 'true' : 'false');
    
    if (name) fd.append('name', name);
    if (email) fd.append('email', email);
    if (phone) fd.append('phone', phone);
    if (propertyInterest) fd.append('property_interest_id', propertyInterest); // resolves to UUID on backend
    
    for (const f of files) {
      fd.append('files', f, f.name);
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${resolvedApiBase}/api/feedback/submit`, {
        method: 'POST',
        body: fd,
      });

      let jsonRes = null;
      let textRes = null;
      try {
        textRes = await res.text();
        jsonRes = JSON.parse(textRes);
      } catch (parseErr) {
        console.warn('Failed parsing response:', parseErr);
      }

      if (!res.ok) {
        const errDetail = (jsonRes && (jsonRes.detail || jsonRes.message)) || textRes || 'Feedback submission failed.';
        throw new Error(errDetail);
      }

      setSubmissionId((jsonRes && jsonRes.id) || '');
      setShowSuccessModal(true);
      
      // Reset Form State
      setUserType('client');
      setFeedbackType('general');
      setExperienceRating(5);
      setNpsScore(10);
      setCommunicationRating(5);
      setComments('');
      setPropertyInterest('');
      setContactConsent(false);
      setName('');
      setEmail('');
      setPhone('');
      setFiles([]);
      e.target.reset();
      
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setMessage({ type: 'error', text: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="feedback-card">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="feedback-header">
          <h2>Share Your Experience</h2>
          <p className="muted">Your feedback helps us refine our processes and improve our services.</p>
        </div>

        {/* Identity Category Selector */}
        <div className="form-group mb-6">
          <label className="block-label">I am a... <span className="req">*</span></label>
          <div className="segmented-selector">
            <button
              type="button"
              className={userType === 'client' ? 'active' : ''}
              onClick={() => setUserType('client')}
            >
              Eximp Client / Buyer
            </button>
            <button
              type="button"
              className={userType === 'lead' ? 'active' : ''}
              onClick={() => setUserType('lead')}
            >
              Interested Lead / Prospect
            </button>
            <button
              type="button"
              className={userType === 'other' ? 'active' : ''}
              onClick={() => setUserType('other')}
            >
              Partner / Other
            </button>
          </div>
        </div>

        <div className="grid">
          {/* Feedback Category */}
          <div className="field">
            <label>Feedback Category <span className="req">*</span></label>
            <select
              value={feedbackType}
              onChange={e => setFeedbackType(e.target.value)}
              className="styled-select"
            >
              <option value="general">General Inquiry / Overall</option>
              <option value="satisfaction">Client Satisfaction</option>
              <option value="complaint">Complaint / Issue Report</option>
              <option value="suggestion">Service Improvement Idea</option>
              <option value="inquiry">Sales / Property Discussion</option>
              <option value="inspection">Site Inspection Experience</option>
              <option value="allocation">Land Allocation Experience</option>
            </select>
          </div>

          {/* Associated Property (Dropdown loads names from static dataset) */}
          <div className="field">
            <label>Property of Interest</label>
            <select
              value={propertyInterest}
              onChange={e => setPropertyInterest(e.target.value)}
              className="styled-select"
            >
              <option value="">None / Not Applicable</option>
              {propertiesArray.map(p => (
                <option key={p.slug} value={p.title}>
                  {p.title} ({p.location})
                </option>
              ))}
            </select>
          </div>

          {/* Experience Rating */}
          <div className="field full border-box-rating">
            <label>Overall Experience Rating <span className="req">*</span></label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={(expHover || experienceRating) >= star ? 'star-btn active' : 'star-btn'}
                  onClick={() => setExperienceRating(star)}
                  onMouseEnter={() => setExpHover(star)}
                  onMouseLeave={() => setExpHover(0)}
                >
                  ★
                </button>
              ))}
              <span className="rating-explanation">
                {experienceRating === 5 && 'Excellent'}
                {experienceRating === 4 && 'Good'}
                {experienceRating === 3 && 'Average'}
                {experienceRating === 2 && 'Needs Improvement'}
                {experienceRating === 1 && 'Unsatisfactory'}
              </span>
            </div>
          </div>

          {/* NPS Score Selection */}
          <div className="field full border-box-rating">
            <label>
              How likely are you to recommend Eximp & Cloves to a friend or colleague? <span className="req">*</span>
            </label>
            <div className="nps-scale">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                <button
                  key={score}
                  type="button"
                  className={npsScore === score ? 'nps-btn active' : 'nps-btn'}
                  onClick={() => setNpsScore(score)}
                >
                  {score}
                </button>
              ))}
            </div>
            <div className="nps-labels">
              <span>0 (Not Likely)</span>
              <span>10 (Extremely Likely)</span>
            </div>
          </div>

          {/* Communication Quality */}
          <div className="field full border-box-rating">
            <label>Communication and Responsiveness Rating <span className="req">*</span></label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={(commHover || communicationRating) >= star ? 'star-btn active' : 'star-btn'}
                  onClick={() => setCommunicationRating(star)}
                  onMouseEnter={() => setCommHover(star)}
                  onMouseLeave={() => setCommHover(0)}
                >
                  ★
                </button>
              ))}
              <span className="rating-explanation">
                {communicationRating === 5 && 'Outstanding'}
                {communicationRating === 4 && 'Prompt'}
                {communicationRating === 3 && 'Acceptable'}
                {communicationRating === 2 && 'Delayed'}
                {communicationRating === 1 && 'Poor'}
              </span>
            </div>
          </div>

          {/* Comments */}
          <div className="field full">
            <label>Your Review / Remarks <span className="req">*</span></label>
            <textarea
              placeholder="Tell us what you liked, what went wrong, or what we can do better..."
              value={comments}
              onChange={e => setComments(e.target.value)}
              required
            />
          </div>

          {/* File Upload zone */}
          <div className="field full">
            <label>Attach Screenshot / Document / Video (Optional — PDF, Images, Videos. Max 50MB each)</label>
            <div className="upload-dropzone">
              <input
                className="file-input-hidden"
                id="feedback-files"
                type="file"
                multiple
                accept=".pdf,image/png,image/jpeg,video/mp4,video/quicktime,video/webm,video/x-msvideo,video/mpeg"
                onChange={onFileChange}
              />
              <label htmlFor="feedback-files" className="dropzone-label">
                <i className="upload-icon">📎</i>
                <span>Click here or drag files to upload</span>
              </label>
            </div>
            {files.length > 0 && (
              <ul className="file-list-preview">
                {files.map((f, i) => (
                  <li key={i} className="file-preview-item">
                    <span>{f.name} ({(f.size/1024|0).toLocaleString()} KB)</span>
                    <button type="button" className="remove-file-btn" onClick={() => removeFile(i)}>
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="consent-box mt-6">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={contactConsent}
              onChange={e => setContactConsent(e.target.checked)}
            />
            I consent to be contacted by Eximp & Cloves regarding this feedback.
          </label>
        </div>

        {/* Contact Info (Only mandatory if consent checked) */}
        {contactConsent && (
          <div className="contact-info-block fade-in">
            <p className="contact-info-header">Please provide your contact information:</p>
            <div className="grid">
              <div className="field">
                <label>Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required={contactConsent}
                />
              </div>
              <div className="field">
                <label>Email Address <span className="req">*</span></label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required={contactConsent}
                />
              </div>
              <div className="field full">
                <label>Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {message && (
          <div className={`message-banner ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="actions mt-8">
          <button
            className="btn primary py-3 px-6"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting Feedback...' : 'Submit Feedback'}
          </button>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="success-modal-overlay">
            <div className="success-modal-backdrop" onClick={() => setShowSuccessModal(false)} />
            <div className="success-modal-card">
              <div className="modal-icon-success">✓</div>
              <h3>Thank You!</h3>
              <p>Your feedback has been successfully registered.</p>
              {submissionId && (
                <div className="reference-box">
                  <span className="ref-title">Reference ID</span>
                  <span className="ref-val">{submissionId}</span>
                </div>
              )}
              <button
                type="button"
                className="btn primary mt-6"
                onClick={() => setShowSuccessModal(false)}
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
