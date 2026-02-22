import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import Reveal from '../components/Reveal';
import { propertiesArray } from '../data/propertiesData';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import HomeFAQ from '../components/HomeFAQ';

const Home = () => {
    const [activeFilter, setActiveFilter] = useState('Lagos');

    // Filter properties based on state
    const filteredProperties = propertiesArray.filter(p => p.state === activeFilter);

    const locations = ['Lagos', 'Ogun', 'Abuja'];

    return (
        <div className="home-page">
            <section className="hero" style={{ backgroundImage: "url('/home_background.png')" }}>
                <div className="container">
                    <div className="hero-grid">
                        <Reveal className="hero-text-reveal">
                            <div className="hero-text-content">
                                <h1>Jump on Premium Land Investments in Nigeria with Zero Stress</h1>
                                <p>Invest in Nigeria's fastest-growing locations with flexible payment plans. Join thousands of smart investors building generational wealth through verified land banking.</p>
                            </div>
                        </Reveal>

                        <div className="hero-feature-cards">
                            <div className="feature-cards-top">
                                <Reveal delay={0.1} y={30} className="feature-card-reveal">
                                    <div className="feature-card beige-card">
                                        <div className="card-icon-round">
                                            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        </div>
                                        <div className="card-info">
                                            <p>Verified</p>
                                            <p>Documentation</p>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal delay={0.2} y={30} className="feature-card-reveal">
                                    <div className="feature-card black-card">
                                        <div className="card-icon-round">
                                            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line><circle cx="12" cy="12" r="3" strokeWidth="1"></circle></svg>
                                        </div>
                                        <div className="card-info">
                                            <p>Secure</p>
                                            <p>Transactions</p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>

                            <Reveal delay={0.3} y={30} className="feature-card-reveal large-card-reveal">
                                <div className="feature-card white-card-large">
                                    <div className="white-card-left">
                                        <div className="checkmark-icon">
                                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                        </div>
                                        <p className="approved-text">Government Approved</p>
                                    </div>
                                    <div className="white-card-right">
                                        <div className="handshake-image-wrapper">
                                            <img src="/handshake_image.png" alt="Handshake" />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={0.4} y={30} className="feature-card-reveal large-card-reveal">
                                <div className="feature-card orange-card-large">
                                    <div className="orange-card-header">
                                        <span className="exp-number">5+</span>
                                        <div className="layers-icon">
                                            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                        </div>
                                    </div>
                                    <p className="exp-text">Years Experience</p>
                                </div>
                            </Reveal>
                        </div>

                        <Reveal className="hero-cta-reveal" delay={0.5}>
                            <div className="hero-cta-group">
                                <Link to="/properties" className="btn-hero-primary">Check Out Properties</Link>
                                <Link to="/contact" className="btn-hero-secondary">Book An Inspection</Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="featured-section section-lg">
                <div className="container">
                    {/* The following lines are markdown checklist items and would typically be in a .md file.
                        Inserting them directly into JSX will cause a syntax error.
                        As per instructions to make the file syntactically correct, these lines are commented out.
                        - [x] Phase 3: Homepage Refinement
                        - [x] Remove "Six Pillars of Ownership" section (`TrustGrid.jsx`)
                        - [x] Implement Lagos/Ogun/Abuja filtering in `Home.jsx`
                        - [x] Style filter buttons and header to match Figma (Typography, Colors, Layout)
                        - [x] Verify pixel-perfect alignment for "Featured Land Properties" section
                    */}
                    <Reveal>
                        <div className="section-header featured-header">
                            <div className="header-text">
                                <h2>Featured Land Properties in Nigeria</h2>
                                <p>Check out our best service you can possibly orders in building your company and don't forget to ask via our email or our customer service if you are interested in using our services</p>
                            </div>
                            <div className="filter-group">
                                {locations.map(loc => (
                                    <button
                                        key={loc}
                                        className={`filter-btn ${activeFilter === loc ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(loc)}
                                    >
                                        {loc}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <div className="properties-carousel-wrapper">
                        <div className="properties-grid">
                            {filteredProperties.map((p, idx) => (
                                <Reveal key={p.id || idx} delay={idx * 0.1}>
                                    <PropertyCard {...p} />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Services />
            <Testimonials />
            <HomeFAQ />
        </div>
    );
};

export default Home;
