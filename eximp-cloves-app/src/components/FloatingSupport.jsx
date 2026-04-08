import React, { useState } from 'react';

const FloatingSupport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        description: '',
        category: 'general'
    });

    const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const response = await fetch(`${BACKEND_URL}/api/support/tickets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contact_name: formData.name,
                    contact_email: formData.email,
                    subject: formData.subject,
                    description: formData.description,
                    category: formData.category,
                    priority: 'medium'
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', description: '', category: 'general' });
                setTimeout(() => {
                    setIsOpen(false);
                    setStatus('idle');
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Support Error:', err);
            setStatus('error');
        }
    };

    const containerStyle = {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        fontFamily: 'Inter, system-ui, sans-serif'
    };

    const buttonStyle = {
        width: '56px',
        height: '56px',
        backgroundColor: '#C47D0A',
        color: 'white',
        borderRadius: '50%',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        transition: 'transform 0.2s ease',
        transform: isOpen ? 'rotate(90deg)' : 'none'
    };

    const windowStyle = {
        position: 'absolute',
        bottom: '80px',
        right: '0',
        width: '360px',
        maxHeight: 'min(600px, 85vh)',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
        border: '1px solid #f0f0f0',
        overflowY: 'auto',
        display: isOpen ? 'block' : 'none',
        animation: 'fadeInUp 0.3s ease'
    };

    const headerStyle = {
        backgroundColor: '#C47D0A',
        padding: '16px 20px',
        color: 'white'
    };

    const bodyStyle = {
        padding: '20px'
    };

    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        marginBottom: '12px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '11px',
        fontWeight: '700',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '4px'
    };

    const submitButtonStyle = {
        width: '100%',
        padding: '14px',
        backgroundColor: '#C47D0A',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '14px'
    };

    return (
        <div style={containerStyle}>
            <button style={buttonStyle} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '💬'}
            </button>

            <div style={windowStyle}>
                <div style={headerStyle}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>Support Hub</h3>
                    <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '13px' }}>How can we help you today?</p>
                </div>

                <div style={bodyStyle}>
                    {status === 'success' ? (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ fontSize: '32px', marginBottom: '10px' }}>✅</div>
                            <h4 style={{ margin: 0 }}>Message Received</h4>
                            <p style={{ fontSize: '13px', color: '#666' }}>We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <label style={labelStyle}>Your Name</label>
                            <input 
                                style={inputStyle} type="text" required
                                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />

                            <label style={labelStyle}>Email Address</label>
                            <input 
                                style={inputStyle} type="email" required
                                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />

                            <label style={labelStyle}>Category</label>
                            <select 
                                style={inputStyle}
                                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="general">General Inquiry</option>
                                <option value="sales">Sales & Pricing</option>
                                <option value="billing">Invoices & Payments</option>
                                <option value="technical">Technical Issue</option>
                            </select>

                            <label style={labelStyle}>Subject</label>
                            <input 
                                style={inputStyle} type="text" required
                                value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            />

                            <label style={labelStyle}>Details</label>
                            <textarea 
                                style={{ ...inputStyle, minHeight: '80px', resize: 'none' }} required
                                value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                            ></textarea>

                            <button style={submitButtonStyle} type="submit" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                            
                            {status === 'error' && (
                                <p style={{ color: '#e74c3c', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
                                    Failed to send. Please try again.
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FloatingSupport;
