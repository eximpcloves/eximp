import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageSquare, Clock, ArrowRight, CheckCircle2, Phone, MapPin, Mail, ChevronDown, ChevronUp, Search } from 'lucide-react';
import Reveal from '../components/Reveal';

const Contact = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        reason: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState({ submitting: false, success: false, error: null });
    const [faqSearch, setFaqSearch] = useState('');
    const [expandAll, setExpandAll] = useState(false);

    // Google Web App URL (Connected via Environment Variables)
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            );
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setStatus({ ...status, submitting: true, error: null });

        if (!formData.name || !formData.phone || !formData.email) {
            setStatus({ submitting: false, success: false, error: "Please fill in all required fields." });
            return;
        }

        if (!validateEmail(formData.email)) {
            setStatus({ submitting: false, success: false, error: "Please enter a valid email address." });
            return;
        }

        if (!GOOGLE_SCRIPT_URL) {
            console.error("Missing Google Script URL configuration.");
            setStatus({ submitting: false, success: false, error: "Server configuration error. Please contact support." });
            return;
        }

        try {
            // Create form data for Google Scripts
            const data = new FormData();
            data.append('timestamp', new Date().toString());
            data.append('reason', formData.reason);
            data.append('date', formData.date);
            data.append('time', formData.time);
            data.append('name', formData.name);
            data.append('phone', formData.phone);
            data.append('email', formData.email);
            data.append('message', formData.message);

            // Fetch request (using no-cors as is standard for opaque Google Script responses)
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: data,
                mode: 'no-cors'
            });

            // Assuming success since no-cors doesn't return status
            setStatus({ submitting: false, success: true, error: null });
        } catch (error) {
            console.error("Form error:", error);
            setStatus({ submitting: false, success: false, error: "Something went wrong. Please try again." });
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const reasons = [
        { id: 'inquiry', title: 'General Inquiry', icon: <MessageSquare size={24} />, desc: 'For questions about our properties or services.' },
        { id: 'inspection', title: 'Schedule Inspection', icon: <MapPin size={24} />, desc: 'Visit one of our prime locations in person.' },
        { id: 'meeting', title: 'Professional Meeting', icon: <Calendar size={24} />, desc: 'Book a session with our investment consultants.' }
    ];

    return (
        <div className="contact-page-portal">
            {/* 1. Enhanced Hero Section */}
            <section className="contact-hero-modern" style={{ backgroundImage: "url('/about_hero_background.png')" }}>
                <div className="overlay-gradient"></div>
                <div className="container">
                    <Reveal>
                        <div className="hero-content-centered">
                            <span className="contact-hero-label">Contact Us</span>
                            <h1>Let's Start a Conversation</h1>
                            <p>Whether you're looking to invest, inspect, or inquire, our team is ready to guide you.</p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <div className="container contact-main-layout">
                {/* 2. Contact Info Grid */}
                <section className="contact-info-grid">
                    <Reveal delay={0.1}>
                        <div className="info-card">
                            <div className="icon-box"><MapPin size={24} /></div>
                            <h3>Head Office</h3>
                            <p>57B, Isaac John street, Yaba,<br />Lagos, Nigeria</p>
                            {/* <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}><strong>Abuja Branch:</strong> Prime Park Office, Garki Area.</p> */}
                        </div>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="info-card">
                            <div className="icon-box"><Phone size={24} /></div>
                            <h3>Support Line</h3>
                            <p>+234 912 686 4383</p>
                            <span className="status-badge">Available 9am - 6pm</span>
                        </div>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <div className="info-card">
                            <div className="icon-box"><Mail size={24} /></div>
                            <h3>Email Us</h3>
                            <p>admin@eximps-cloves.com</p>
                            {/* <p>support@eximpcloves.com</p> */}
                        </div>
                    </Reveal>
                </section>

                <div className="contact-content-split">
                    {/* Left: Booking Form */}
                    <div className="form-column">
                        <Reveal delay={0.4} x={-20}>
                            <div className="booking-card premium-shadow">
                                <div className="card-header">
                                    <h3>Send a Message</h3>
                                    <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                                </div>

                                <div className="step-indicator">
                                    <span className={step >= 1 ? 'active' : ''}>1</span>
                                    <div className="line"></div>
                                    <span className={step >= 2 ? 'active' : ''}>2</span>
                                    <div className="line"></div>
                                    <span className={step >= 3 ? 'active' : ''}>3</span>
                                </div>

                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="step-content"
                                        >
                                            <h4 className="step-title">How can we help you?</h4>
                                            <div className="reason-grid">
                                                {reasons.map(r => (
                                                    <div
                                                        key={r.id}
                                                        className={`reason-item ${formData.reason === r.id ? 'selected' : ''}`}
                                                        onClick={() => {
                                                            setFormData({ ...formData, reason: r.id });
                                                            nextStep();
                                                        }}
                                                    >
                                                        <div className="reason-icon">{r.icon}</div>
                                                        <h3>{r.title}</h3>
                                                        <p>{r.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="step-content"
                                        >
                                            <h4 className="step-title">Schedule your Session</h4>
                                            <div className="form-group-react">
                                                <label><Calendar size={18} /> Preferred Date</label>
                                                <input
                                                    type="date"
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-group-react">
                                                <label><Clock size={18} /> Preferred Time</label>
                                                <select onChange={(e) => setFormData({ ...formData, time: e.target.value })}>
                                                    <option value="">Select a slot</option>
                                                    <option value="morning">Morning (9am - 12pm)</option>
                                                    <option value="afternoon">Afternoon (1pm - 4pm)</option>
                                                    <option value="evening">Evening (4pm - 6pm)</option>
                                                </select>
                                            </div>
                                            <div className="step-actions">
                                                <button onClick={prevStep} className="btn-secondary">Back</button>
                                                <button onClick={nextStep} className="btn-primary">Continue <ArrowRight size={18} /></button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="step-content"
                                        >
                                            <h4 className="step-title">Your Information</h4>

                                            {status.success ? (
                                                <div className="success-message">
                                                    <CheckCircle2 size={48} color="#25D366" />
                                                    <h3>Request Sent!</h3>
                                                    <p>We'll be in touch with you shortly.</p>
                                                    <button onClick={() => {
                                                        setStep(1);
                                                        setStatus({ submitting: false, success: false, error: null });
                                                        setFormData({ ...formData, message: '' });
                                                    }} className="btn-secondary" style={{ marginTop: '1rem' }}>Send Another</button>
                                                </div>
                                            ) : (
                                                <form onSubmit={submitForm}>
                                                    <div className="form-grid-react">
                                                        <div className="form-group-react">
                                                            <label>Full Name <span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                type="text"
                                                                placeholder="John Doe"
                                                                required
                                                                value={formData.name}
                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="form-group-react">
                                                            <label>Phone Number <span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                type="tel"
                                                                placeholder="+234..."
                                                                required
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group-react">
                                                        <label>Email Address <span style={{ color: 'red' }}>*</span></label>
                                                        <input
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            required
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group-react">
                                                        <label>Project Details / Special Requests</label>
                                                        <textarea
                                                            rows="4"
                                                            placeholder="Tell us more about your interest..."
                                                            value={formData.message}
                                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        ></textarea>
                                                    </div>

                                                    {status.error && <p className="error-text" style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '1rem' }}>{status.error}</p>}

                                                    <div className="step-actions">
                                                        <button type="button" onClick={prevStep} className="btn-secondary" disabled={status.submitting}>Back</button>
                                                        <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={status.submitting}>
                                                            {status.submitting ? 'Sending...' : 'Submit Request'}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Map & Finance */}
                    <div className="sidebar-column">
                        {/* 3. Google Maps Integration */}
                        <Reveal delay={0.5} x={20}>
                            <div className="map-card premium-shadow">
                                <h3>Visit Our Office</h3>
                                <div className="map-frame">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9679087195773!2d3.3723568!3d6.5257369999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8dacc29f4ead%3A0xb46408f2372b476a!2s57b%20Isaac%20John%20St%2C%20Fadeyi%2C%20Lagos%20102216%2C%20Lagos!5e0!3m2!1sen!2sng!4v1772221769833!5m2!1sen!2sng"
                                        width="100%"
                                        height="200"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Eximp & Cloves Office Map"
                                    ></iframe>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal delay={0.6} x={20}>
                            <div className="finance-card">
                                <div className="finance-header">
                                    <div className="finance-status">
                                        <CheckCircle2 size={16} color="#25D366" />
                                        <span>Verified</span>
                                    </div>
                                    <h3>Official Finance Channel</h3>
                                </div>
                                <p className="finance-desc">
                                    Send payment slips or inquire about financial plans directly via our secure WhatsApp line.
                                </p>
                                <a href="https://wa.me/2349126864383" target="_blank" rel="noopener noreferrer" className="btn-finance">
                                    <MessageSquare size={18} /> Chat with Finance
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* 4. FAQ Section */}
                <section className="faq-section section-lg">
                    <Reveal>
                        <div className="section-header-small">
                            <h2>Frequently Asked Questions</h2>
                            <p>Find answers to common questions about our properties and services</p>
                        </div>
                    </Reveal>

                    {/* Search Bar */}
                    <div className="faq-search-container">
                        <input
                            type="text"
                            className="faq-search-input"
                            placeholder="Search FAQs..."
                            value={faqSearch}
                            onChange={(e) => setFaqSearch(e.target.value)}
                        />
                        <Search className="faq-search-icon" size={20} />
                    </div>

                    {/* FAQ Controls */}
                    <div className="faq-controls">
                        <span className="faq-count">
                            {(() => {
                                const faqs = [
                                    { q: "What type of properties do you sell?", a: "We offer residential plots, commercial lands, and investment properties in prime and developing locations." },
                                    { q: "Where are your properties located?", a: "Our properties are situated in fast-growing and strategic locations with high investment potential." },
                                    { q: "What is the title of your properties?", a: "Our properties come with verified titles such as C of O, Registered Survey, or Deed of Assignment, depending on the estate." },
                                    { q: "Are your lands free from government acquisition?", a: "Yes. All our properties are properly verified and free from encumbrances." },
                                    { q: "Can I make payment in installments?", a: "Yes, we offer flexible installment payment plans to suit our clients." },
                                    { q: "What documents will I receive after payment?", a: "You will receive a payment receipt, allocation letter, contract of sale, Deed of Assignment, provisional survey and Acknowledgement certificate." },
                                    { q: "How long does allocation take after payment?", a: "Allocation is done shortly after payment confirmation and documentation." },
                                    { q: "Can I inspect the property before purchase?", a: "Yes. We encourage site inspections, and we can schedule a convenient date for you." },
                                    { q: "Can I start building immediately after purchase?", a: "Yes, once payment is completed and allocation is done, you can commence development (subject to estate guidelines)." },
                                    { q: "Do you assist with documentation and processing of title?", a: "Yes. We guide our clients through all legal documentation and title processing." },
                                    { q: "Are there additional fees apart from the land cost?", a: "No, all payment inclusive." },
                                    { q: "How can I contact your company for inquiries?", a: "You can reach us via phone, email, or our social media platforms for prompt assistance." },
                                    { q: "Which account should payment be made into?", a: "Bank: Providus Bank | Account Number: 1308184591 | Account Name: Eximp & Cloves Infrastructure Limited" }
                                ];
                                const filteredCount = faqs.filter(faq =>
                                    faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
                                    faq.a.toLowerCase().includes(faqSearch.toLowerCase())
                                ).length;
                                return `${filteredCount} of ${faqs.length} questions`;
                            })()}
                        </span>
                        <button
                            className="expand-all-btn"
                            onClick={() => setExpandAll(!expandAll)}
                        >
                            {expandAll ? 'Collapse All' : 'Expand All'}
                        </button>
                    </div>

                    {/* FAQ List */}
                    <div className="faq-grid">
                        {[
                            { question: "What type of properties do you sell?", answer: "We offer residential plots, commercial lands, and investment properties in prime and developing locations." },
                            { question: "Where are your properties located?", answer: "Our properties are situated in fast-growing and strategic locations with high investment potential." },
                            { question: "What is the title of your properties?", answer: "Our properties come with verified titles such as C of O, Registered Survey, or Deed of Assignment, depending on the estate." },
                            { question: "Are your lands free from government acquisition?", answer: "Yes. All our properties are properly verified and free from encumbrances." },
                            { question: "Can I make payment in installments?", answer: "Yes, we offer flexible installment payment plans to suit our clients." },
                            { question: "What documents will I receive after payment?", answer: "You will receive a payment receipt, allocation letter, contract of sale, Deed of Assignment, provisional survey and Acknowledgement certificate." },
                            { question: "How long does allocation take after payment?", answer: "Allocation is done shortly after payment confirmation and documentation." },
                            { question: "Can I inspect the property before purchase?", answer: "Yes. We encourage site inspections, and we can schedule a convenient date for you." },
                            { question: "Can I start building immediately after purchase?", answer: "Yes, once payment is completed and allocation is done, you can commence development (subject to estate guidelines)." },
                            { question: "Do you assist with documentation and processing of title?", answer: "Yes. We guide our clients through all legal documentation and title processing." },
                            { question: "Are there additional fees apart from the land cost?", answer: "No, all payment inclusive." },
                            { question: "How can I contact your company for inquiries?", answer: "You can reach us via phone, email, or our social media platforms for prompt assistance." },
                            { question: "Which account should payment be made into?", answer: "Bank: Providus Bank | Account Number: 1308184591 | Account Name: Eximp & Cloves Infrastructure Limited" }
                        ]
                            .filter(faq =>
                                faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                                faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
                            )
                            .map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    forceOpen={expandAll}
                                />
                            ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer, forceOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const itemRef = useRef(null);

    // Auto-scroll when opened
    useEffect(() => {
        if (isOpen && itemRef.current) {
            const timer = setTimeout(() => {
                itemRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Sync with expand/collapse all
    useEffect(() => {
        if (forceOpen !== undefined) {
            setIsOpen(forceOpen);
        }
    }, [forceOpen]);

    // Helper to make URLs clickable
    const renderAnswer = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, i) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="faq-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part.replace(/^https?:\/\//, '')}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div
            ref={itemRef}
            className={`faq-item ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="faq-question">
                <h4>{question}</h4>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="faq-answer"
                    >
                        <p>{renderAnswer(answer)}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Contact;
