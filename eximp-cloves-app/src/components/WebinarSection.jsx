import React, { useState } from 'react';
import Reveal from './Reveal';
import '../styles/global.css';

const WebinarSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', consent: '' });
    const [status, setStatus] = useState('');

    React.useEffect(() => {
        if (window.location.hash === '#webinar') {
            const element = document.getElementById('webinar');
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 500); // Small delay to ensure page is ready
            }
        }
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        document.body.classList.add('modal-open');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove('modal-open');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Use environment variable for the script URL
            const SCRIPT_URL = import.meta.env.VITE_WEBINAR_SCRIPT_URL;

            if (!SCRIPT_URL || SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                console.error('Webinar Script URL is not configured in .env');
                setStatus('error');
                return;
            }

            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', consent: '' });
            setTimeout(() => {
                setStatus('');
                handleCloseModal();
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <section className="webinar-section-pro" id="webinar">
            <div className="container">
                <div className="webinar-grid">
                    <Reveal className="webinar-left">
                        <div className="webinar-tag">Monthly Webinar Series</div>
                        <h2>Future <span className="highlight-text">READY</span></h2>
                        <p className="webinar-subtitle">EQUIPPING PROFESSIONALS, ENTREPRENEURS & LEADERS FOR TOMORROW</p>
                    </Reveal>

                    <div className="webinar-right">
                        <Reveal delay={0.1}>
                            <p className="webinar-desc">
                                Future Ready is an informative webinar aimed at equipping professionals, entrepreneurs, business owners, and aspiring leaders with practical insights to succeed in today’s rapidly evolving environment.
                            </p>
                            <p className="webinar-desc-paragraph" style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                                Led by industry experts, participants will acquire actionable strategies, new viewpoints, and real-world knowledge applicable to career advancement, business growth, leadership, and personal effectiveness.
                            </p>
                            <p className="webinar-desc-paragraph" style={{ marginTop: '1rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                                Whether aiming to enhance your professional skills, foster meaningful workplace relationships, or prepare for future opportunities, Future Ready offers a platform to learn, connect, and develop.
                            </p>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="webinar-benefits">
                                <div className="benefit-item">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Actionable Strategies for Career Advancement &amp; Business Growth</span>
                                </div>
                                <div className="benefit-item">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Real-World Knowledge in Leadership &amp; Personal Effectiveness</span>
                                </div>
                                <div className="benefit-item">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span>Monthly Platform to Learn, Connect, and Prepare for Future Opportunities</span>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <button className="webinar-cta-btn" onClick={handleOpenModal}>
                                Register for Future Ready
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                            <p className="webinar-access-note">Join us as we gear up for the future with knowledge that empowers, motivates, and creates a lasting impact.</p>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* Registration Modal */}
            {isModalOpen && (
                <div className="webinar-modal-overlay" onClick={status !== 'success' ? handleCloseModal : undefined}>
                    <div className="webinar-modal-content" onClick={(e) => e.stopPropagation()}>

                        {status === 'success' ? (
                            /* ── SUCCESS SCREEN ── */
                            <div className="webinar-success-screen">
                                <div className="success-icon-ring">
                                    <svg viewBox="0 0 24 24" width="40" height="40" stroke="#FF9D42" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <h3 className="success-title">You're In! 🎉</h3>
                                <p className="success-subtitle">Your spot has been saved for the next <strong>Future READY</strong> monthly session.</p>
                                <div className="success-detail-box">
                                    <p>📧 A confirmation email has been sent to your inbox.</p>
                                    <p>🔗 The meeting link will arrive 24 hours before we go live.</p>
                                </div>
                                <p className="success-closing">See you on the inside, {formData.name || 'friend'}!</p>
                                <button className="success-close-btn" onClick={handleCloseModal}>Done</button>
                            </div>
                        ) : (
                            /* ── FORM ── */
                            <>
                                <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                                <div className="modal-header">
                                    <h3>Join Us Live for Future Ready</h3>
                                    <p>Register to save your spot for our upcoming monthly sessions.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="webinar-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. John Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. john@business.com" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number (Optional)</label>
                                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
                                    </div>

                                    <div className="form-group consent-group">
                                        <label className="consent-label">
                                            Do you consent to Eximp &amp; Cloves reaching out to you regarding future training, business opportunities, and leadership growth strategies? *
                                        </label>
                                        <div className="radio-group">
                                            <label className="radio-item">
                                                <input type="radio" name="consent" value="Yes" checked={formData.consent === 'Yes'} onChange={handleChange} required />
                                                <span>Yes, please keep me updated.</span>
                                            </label>
                                            <label className="radio-item">
                                                <input type="radio" name="consent" value="No" checked={formData.consent === 'No'} onChange={handleChange} required />
                                                <span>No, I only want resources from this specific session.</span>
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                                        {status === 'submitting' ? 'Registering...' : 'Complete Registration'}
                                    </button>

                                    {status === 'error' && <p className="status-msg error">Something went wrong. Please try again.</p>}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default WebinarSection;

