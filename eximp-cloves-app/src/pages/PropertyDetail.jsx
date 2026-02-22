import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, Calendar, Shield, Users, FileText, CheckCircle2, ChevronDown, ChevronUp, Search, Wifi, GraduationCap, Library, Box, ShoppingBag, Trophy, Circle, Database, MessageSquare, MessageCircle } from 'lucide-react';
import { propertiesData } from '../data/propertiesData';
import Reveal from '../components/Reveal';
import '../styles/property-detail.css';

const iconMap = {
    Wifi: Wifi,
    GraduationCap: GraduationCap,
    Library: Library,
    Box: Box,
    ShoppingBag: ShoppingBag,
    Trophy: Trophy,
    Circle: Circle,
    Database: Database
};

const PropertyDetail = () => {
    const { slug } = useParams();
    const property = propertiesData[slug];
    const [faqSearch, setFaqSearch] = useState('');
    const [expandAll, setExpandAll] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!property) {
        return (
            <div className="property-detail-page">
                <div className="not-found-container">
                    <div className="not-found-content">
                        <h1>Property Not Found</h1>
                        <p>The estate you are looking for might have been moved or renamed.</p>
                        <Link to="/properties" className="back-link">
                            <ChevronLeft size={20} /> Back to Properties
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="property-detail-page">
            {/* Sticky Back Button */}
            <div className="detail-nav">
                <Link to="/properties" className="back-link">
                    <ChevronLeft size={20} /> Back
                </Link>
            </div>

            {/* Hero Section */}
            <section className="detail-hero">
                <div className="hero-bg">
                    <img src={property.image} alt={property.title} />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <Reveal>
                        <h1>{property.title}</h1>
                        <div className="hero-location">
                            <MapPin size={20} color="#EEA157" />
                            <span>{property.location}</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            <div className="container">
                {/* Main Content */}
                <section className="detail-section">
                    <Reveal>
                        <div className="overview-card">
                            <div className="overview-header-row">
                                <h2>Estate Overview</h2>
                                <div className="verified-badge-inline">
                                    <Shield size={16} /> {property.status}
                                </div>
                            </div>
                            <p>{property.description}</p>

                            {/* Key Features Highlight Box (New) */}
                            {property.keyFeatures && (
                                <div className="key-features-box">
                                    <h3>Key Features</h3>
                                    <p>{property.keyFeatures}</p>
                                </div>
                            )}

                            <div className="features-grid">
                                {property.tags && property.tags.map((tag, idx) => (
                                    <div key={idx} className="feature-tag">
                                        <CheckCircle2 size={18} />
                                        <span>{tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Landmarks Section (Now Full Width or Grid) */}
                    {property.landmarks && property.landmarks.length > 0 && (
                        <Reveal delay={0.2}>
                            <div className="landmark-card-modern">
                                <h3>Nearby Landmarks</h3>
                                <div className="landmark-grid-modern">
                                    {property.landmarks.map((landmark, idx) => (
                                        <div key={idx} className="landmark-item-modern">
                                            <MapPin size={16} color="#EEA157" />
                                            <span>{landmark}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    )}
                </section>

                {/* Estate Amenities Grid (Full Width) */}
                {property.amenities && (
                    <Reveal delay={0.2}>
                        <div className="amenities-section">
                            <h2>Estate Amenities</h2>
                            <div className="amenities-grid">
                                {property.amenities.map((item, idx) => {
                                    const IconComponent = iconMap[item.icon] || Shield;
                                    return (
                                        <div key={idx} className="amenity-card">
                                            <IconComponent size={22} color="#EEA157" />
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </div>
                                    );
                                })}
                                {property.visionCard && (
                                    <div className="amenity-card vision-card">
                                        <p>{property.visionCard}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* New Specialized Payment Plan Section */}
                {property.sizePaymentPlans && (
                    <section className="payment-plans-modern">
                        <Reveal>
                            <div className="payment-header-modern">
                                <h2>Payment Plan</h2>
                                {property.paymentPlanHeader && (
                                    <div className="payment-sub-info">
                                        <p>Initial Deposit: <strong>{property.paymentPlanHeader.deposit}</strong></p>
                                        <p>{property.paymentPlanHeader.promo}</p>
                                    </div>
                                )}
                            </div>

                            <div className="size-cards-grid">
                                {property.sizePaymentPlans.map((plan, idx) => (
                                    <div key={idx} className="size-card">
                                        <div className="size-header">
                                            <h3>{plan.size}</h3>
                                            <span>{plan.sqm}</span>
                                        </div>
                                        <div className="size-pricing">
                                            <div className="old-price">{plan.oldPrice}</div>
                                            <div className="new-price">{plan.newPrice}</div>
                                        </div>
                                        <div className="size-stats">
                                            <div className="stat-item">
                                                <span>Discount</span>
                                                <strong>{plan.discount}</strong>
                                            </div>
                                            <div className="stat-item">
                                                <span>Balance</span>
                                                <strong>{plan.balance}</strong>
                                            </div>
                                            <div className="stat-item">
                                                <span>4 Mo. Plan</span>
                                                <strong>{plan.monthly4}</strong>
                                            </div>
                                            <div className="stat-item">
                                                <span>6 Mo. Plan</span>
                                                <strong>{plan.monthly6}</strong>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </section>
                )}

                {/* Legacy Payment Plans Section */}
                {property.paymentPlans && property.paymentPlans.length > 0 && !property.sizePaymentPlans && (
                    <section className="payment-section">
                        <Reveal>
                            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Flexible Payment Plans</h2>
                            <div className="payment-table-wrapper">
                                <table className="payment-table">
                                    <thead>
                                        <tr>
                                            <th>Plan Name</th>
                                            <th>Initial Deposit</th>
                                            <th>Monthly Payment</th>
                                            <th>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {property.paymentPlans.map((plan, idx) => (
                                            <tr key={idx}>
                                                <td style={{ fontWeight: '600' }}>{plan.name}</td>
                                                <td>{plan.deposit}</td>
                                                <td>{plan.monthly}</td>
                                                <td style={{ color: 'var(--primary-color)', fontWeight: '700' }}>{plan.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Reveal>
                    </section>
                )}

                {/* Professional Video Section */}
                {(property.videoUrl || property.droneVideoUrl) && (
                    <section className="detail-video-section">
                        <div className="container">
                            <Reveal>
                                <h2>Experience the Estate</h2>
                                <p className="video-subtitle">Take a virtual walk through {property.title} from the comfort of your home.</p>
                                <VideoGallery property={property} />
                            </Reveal>
                        </div>
                    </section>
                )}

                {/* FAQ Section */}
                {property.faq && property.faq.length > 0 && (
                    <section className="detail-section detail-faq">
                        <Reveal>
                            <div className="section-header-small">
                                <h2>Frequently Asked Questions</h2>
                                <p>Essential details about {property.title}</p>
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
                                    const filteredCount = property.faq.filter(f =>
                                        f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                                        f.answer.toLowerCase().includes(faqSearch.toLowerCase())
                                    ).length;
                                    return `${filteredCount} of ${property.faq.length} questions`;
                                })()}
                            </span>
                            <button
                                className="expand-all-btn"
                                onClick={() => setExpandAll(!expandAll)}
                            >
                                {expandAll ? 'Collapse All' : 'Expand All'}
                            </button>
                        </div>

                        <div className="faq-grid">
                            {property.faq
                                .filter(f =>
                                    f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                                    f.answer.toLowerCase().includes(faqSearch.toLowerCase())
                                )
                                .map((item, index) => (
                                    <DetailFAQItem
                                        key={index}
                                        question={item.question}
                                        answer={item.answer}
                                        forceOpen={expandAll}
                                    />
                                ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Bottom CTA */}
            <section className="property-cta-section">
                <div className="cta-glow"></div>
                <div className="container">
                    <Reveal>
                        <div className="cta-card-modern">
                            <h2>Ready to Invest?</h2>
                            <p>
                                Secure your future today with <strong>{property.title}</strong>. Speak with our property consultants to start your journey.
                            </p>
                            <div className="cta-buttons-modern">
                                <button className="cta-primary-btn" onClick={() => window.location.href = '/contact'}>
                                    <MessageSquare size={18} /> Contact Us
                                </button>
                                <a href="https://wa.me/2349126864383" target="_blank" rel="noopener noreferrer" className="cta-secondary-btn">
                                    <MessageCircle size={18} /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

const VideoGallery = ({ property }) => {
    const [activeVideo, setActiveVideo] = useState(property.videoUrl ? 'tour' : 'drone');
    const [isBuffering, setIsBuffering] = useState(false);

    if (!property.videoUrl && !property.droneVideoUrl) return null;

    return (
        <div className="video-gallery">
            <div className="video-type-tabs">
                {property.videoUrl && (
                    <button
                        className={`video-tab ${activeVideo === 'tour' ? 'active' : ''}`}
                        onClick={() => setActiveVideo('tour')}
                    >
                        Site Walkthrough
                    </button>
                )}
                {property.droneVideoUrl && (
                    <button
                        className={`video-tab ${activeVideo === 'drone' ? 'active' : ''}`}
                        onClick={() => setActiveVideo('drone')}
                    >
                        Drone Aerial View
                    </button>
                )}
            </div>

            <div className={`video-player-container ${activeVideo}-active`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeVideo}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                    >
                        <video
                            src={activeVideo === 'tour' ? property.videoUrl : property.droneVideoUrl}
                            controls
                            muted
                            playsInline
                            className="detail-main-video"
                            onLoadStart={() => setIsBuffering(true)}
                            onWaiting={() => setIsBuffering(true)}
                            onCanPlay={() => setIsBuffering(false)}
                            onPlaying={() => setIsBuffering(false)}
                            onVolumeChange={(e) => {
                                if (!e.target.muted) {
                                    e.target.muted = true;
                                }
                            }}
                        />

                        {isBuffering && (
                            <div className="video-loader detail-loader">
                                <img
                                    src="/assets/loading_animation_branded.gif"
                                    alt="Loading..."
                                    className="branded-spinner detail-spinner"
                                />
                                <p>Loading Tour...</p>
                            </div>
                        )}
                        <div className="video-info-overlay">
                            <h3>{activeVideo === 'tour' ? 'Site Walkthrough' : 'Drone Aerial View'}</h3>
                            <p>{property.title} • {property.location}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

const DetailFAQItem = ({ question, answer, forceOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

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
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="faq-question">
                <h4>{question}</h4>
                {isOpen ? <ChevronUp size={20} color="var(--primary-color)" /> : <ChevronDown size={20} color="#64748b" />}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="faq-answer"
                    >
                        <p>{renderAnswer(answer)}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PropertyDetail;
