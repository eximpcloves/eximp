import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

export default function Feedback() {
  return (
    <div style={{padding: '40px 20px'}}>
      <FeedbackForm apiBase={import.meta.env.VITE_BACKEND_API_URL || ''} />
    </div>
  );
}
