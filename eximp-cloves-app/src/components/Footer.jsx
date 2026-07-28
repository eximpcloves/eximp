import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Send, Music2, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ERP_API_BASE = import.meta.env.VITE_ERP_API_BASE || 'https://app.eximps-cloves.com';

const Footer = () => {
    const { isDark } = useTheme();

    return (
        <footer className="footer">
            <div className="container">
                {/* Footer Top: Newsletter Section */}
                <div className="footer-top">
                    <div className="footer-newsletter-header">
                        <h2>Be the first to hear our news letters!</h2>
                    </div>
                        <div className="footer-newsletter-content">
                            <div className="footer-newsletter-embed">
                                <NewsletterSubscribeForm isDark={isDark} />
                            </div>
                        </div>
                </div>

                {/* Footer Main: Brand and Navigation Links */}
                <div className="footer-main">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link to="/" className="logo">
                                <img
                                    src={isDark ? "/logo.svg" : "/light%20theme%20logo.png"}
                                    alt="Eximp & Cloves Logo"
                                />
                            </Link>
                            <p className="brand-desc">
                                Invest in Nigeria's fastest-growing locations with flexible payment plans.
                                Join thousands of smart investors building generational wealth through verified land banking.
                            </p>
                            <div className="social-links-footer">
                                <a href="https://facebook.com/eximp.cloves" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                                <a href="https://instagram.com/eximp.cloves" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                                <a href="https://tiktok.com/@eximp.cloves" target="_blank" rel="noopener noreferrer"><Music2 size={20} /></a>
                                <a href="https://x.com/eximp_cloves" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
                                <a href="https://www.linkedin.com/company/eximp-cloves" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                            </div>
                        </div>

                        <div className="footer-links">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/properties">Pricing</Link></li>
                                <li><Link to="/careers">Careers</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>Locations</h4>
                            <ul>
                                <li><span>Lagos</span></li>
                                <li><span>Ogun</span></li>
                                <li><span>Abuja</span></li>
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>Help</h4>
                            <ul>
                                <li><a href="/blog" target="_blank" rel="noopener noreferrer">Blog</a></li>
                                <li><a href="https://app.eximps-cloves.com/subscribe" target="_blank" rel="noopener noreferrer">Sales Subscription</a></li>
                                <li><Link to="/contact">FAQ</Link></li>
                                <li><Link to="/contact">Help Center</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>More</h4>
                            <ul>
                                <li><Link to="/services">Services</Link></li>
                                    <li><Link to="/terms">License</Link></li>
                                    <li><Link to="/refund">Refund Policy</Link></li>
                                    <li><Link to="/refund-request">Request a Refund</Link></li>
                                    <li><Link to="/feedback">Submit Feedback</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom: Legal */}
                <div className="footer-bottom">
                    <p className="copyright">2026 Eximp &copy; All rights reserved</p>
                    <div className="footer-legal">
                        <Link to="/privacy">Cookies Policy</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/refund">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

function NewsletterSubscribeForm({ isDark }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // null | 'pending_verification' | 'already_subscribed' | 'error'
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email || !email.includes('@')) return;
        setLoading(true);
        setStatus(null);
        setMessage('');
        try {
            const res = await fetch(`${ERP_API_BASE}/api/blog/public/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || 'Failed to subscribe');
            setStatus(data.status || 'pending_verification');
            setMessage(data.message || '');
            if (data.status !== 'already_subscribed') setEmail('');
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const cardBg = isDark ? '#0b1220' : '#f8fafc';
    const inputBg = isDark ? '#111827' : '#ffffff';
    const inputBorder = isDark ? '#1e2a3a' : '#d1d5db';
    const textColor = isDark ? '#e2e8f0' : '#1f2937';
    const subTextColor = isDark ? '#94a3b8' : '#6b7280';

    if (status === 'pending_verification' || status === 'already_subscribed') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px', background: 'rgba(196,125,10,0.1)', border: '1px solid rgba(196,125,10,0.35)', borderRadius: 10 }}>
                <span style={{ fontSize: 28 }}>{status === 'already_subscribed' ? '✨' : '📩'}</span>
                <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#C47D0A' }}>
                        {status === 'already_subscribed' ? 'Already Subscribed!' : 'Check your inbox!'}
                    </div>
                    <div style={{ fontSize: 13, color: subTextColor, marginTop: 2 }}>{message}</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: cardBg, borderRadius: 10, padding: '18px 16px' }}>
            <p style={{ fontSize: 14, color: subTextColor, margin: '0 0 14px' }}>
                Get market updates, property developments, and strategic investment insights delivered straight to your inbox. No spam — unsubscribe anytime.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    style={{
                        flex: '1 1 200px',
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: `1px solid ${inputBorder}`,
                        background: inputBg,
                        color: textColor,
                        fontSize: 14,
                        outline: 'none',
                    }}
                />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: '#C47D0A',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '10px 22px',
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap',
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? 'Sending…' : 'Subscribe'}
                </button>
            </form>
            {status === 'error' && (
                <div style={{ color: '#ef4444', fontSize: 13, marginTop: 10 }}>{message}</div>
            )}
        </div>
    );
}



