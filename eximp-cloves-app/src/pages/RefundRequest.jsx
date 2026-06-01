import React from 'react';
import RefundForm from '../components/RefundForm';

export default function RefundRequest() {
  return (
    <div style={{padding: '40px 20px'}}>
      <RefundForm apiBase={import.meta.env.VITE_BACKEND_API_URL || ''} />
    </div>
  );
}
