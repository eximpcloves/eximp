import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Twitter, Linkedin, Send } from 'lucide-react';

const Footer = () => {
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
                            <iframe
                                src="https://eximpcloves.substack.com/embed"
                                width="100%"
                                height="180"
                                style={{ border: 'none', background: 'transparent' }}
                                frameBorder="0"
                                scrolling="no"
                                title="Newsletter Subscribe"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Footer Main: Brand and Navigation Links */}
                <div className="footer-main">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link to="/" className="logo">
                                <img src="/logo.svg" alt="Eximp & Cloves Logo" />
                            </Link>
                            <p className="brand-desc">
                                Invest in Nigeria's fastest-growing locations with flexible payment plans.
                                Join thousands of smart investors building generational wealth through verified land banking.
                            </p>
                            <div className="social-links-footer">
                                <a href="https://facebook.com/eximp.cloves" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                                <a href="https://instagram.com/eximp.cloves" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                                <a href="https://x.com/eximp_cloves" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
                                <a href="https://www.linkedin.com/company/eximp-cloves" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                            </div>
                        </div>

                        <div className="footer-links">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/properties">Pricing</Link></li>
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
                                <li><a href="https://eximpcloves.substack.com" target="_blank" rel="noopener noreferrer">Blog</a></li>
                                <li><Link to="/contact">FAQ</Link></li>
                                <li><Link to="/contact">Help Center</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links">
                            <h4>More</h4>
                            <ul>
                                <li><Link to="/services">Services</Link></li>
                                <li><Link to="/terms">License</Link></li>
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
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
