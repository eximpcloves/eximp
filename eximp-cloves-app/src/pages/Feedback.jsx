import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

export default function Feedback() {
  return (
    <div className="feedback-page-wrapper">
      <FeedbackForm apiBase={import.meta.env.VITE_BACKEND_API_URL || ''} />
    </div>
  );
}

