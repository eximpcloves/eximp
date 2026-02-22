import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import HomeFAQ from '../components/HomeFAQ';


const ServicesPage = () => {
    return (
        <div className="services-page">

            {/* ── Hero ────────────────────────────────────── */}
            <section className="services-hero" style={{ backgroundImage: "url('/first_services_hero_background.png')" }}>
                <div className="services-hero-overlay" />
                <div className="services-hero-body">
                    <Reveal>
                        <span className="services-hero-label">Our Services</span>
                        <h1 className="services-hero-heading">
                            Building Wealth Through<br />Strategic Real Estate
                        </h1>
                        <p className="services-hero-desc">
                            From land banking to property development and documentation support, we provide end-to-end solutions for your real estate investment journey in Nigeria.
                        </p>
                        <div className="services-hero-cta">
                            <a href="#services-detail" className="btn-services-primary">Explore Services</a>
                            <Link to="/contact" className="btn-services-outline">Book An Inspection</Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Our Core Services — 3-card overview ────── */}
            <section id="services-detail" className="core-services-section">
                <div className="container">
                    <Reveal>
                        <div className="core-services-header">
                            <h2 className="core-services-title">Our Core Services</h2>
                            <p className="core-services-subtitle">
                                Comprehensive real estate solutions tailored to help you build wealth<br />
                                through strategic investments in Nigeria.
                            </p>
                        </div>
                    </Reveal>

                    <div className="core-services-grid">
                        <Reveal delay={0.1}>
                            <div className="core-service-card">
                                <span className="core-service-num">01</span>
                                <h3>Land Banking</h3>
                                <p>Strategic acquisition of undeveloped land in high-growth corridors for future appreciation.</p>
                                <a href="#land-banking" className="core-service-link">Learn More &nbsp;→</a>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="core-service-card">
                                <span className="core-service-num">02</span>
                                <h3>Property Development</h3>
                                <p>Transform raw land into move-in-ready properties with quality construction.</p>
                                <a href="#property-dev" className="core-service-link">Learn More &nbsp;→</a>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="core-service-card">
                                <span className="core-service-num">03</span>
                                <h3>Documentation</h3>
                                <p>Complete legal support ensuring bulletproof property documentation.</p>
                                <a href="#documentation" className="core-service-link">Learn More &nbsp;→</a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── 01 · Premium Land Banking deep-dive ─────── */}
            <section id="land-banking" className="svc-detail-section">
                <div className="container">
                    <Reveal>
                        <div className="svc-detail-header">
                            <span className="svc-detail-num">01</span>
                            <div>
                                <span className="svc-detail-label">Investment Opportunities</span>
                                <h2 className="svc-detail-title">Premium Land Banking</h2>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="svc-detail-card">
                            <div className="svc-detail-image">
                                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80" alt="Premium Land Banking" />
                            </div>
                            <div className="svc-detail-content">
                                <p className="svc-detail-desc">
                                    At Eximp &amp; Cloves, investing with us means gaining access to Nigeria's most strategic affordable land for sale with installment payment opportunities. We help you bank on undeveloped lands so you can hold onto them for future appreciation purposes. Our land banking approach focuses on identifying high-growth corridors across Lagos, Abuja, and Ogun State before major infrastructure projects drive up property values.
                                </p>
                                <div className="svc-features-grid">
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Strategic Location Selection</h4>
                                            <p>We identify residential and commercial areas slated for future infrastructure development.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Flexible Payment Plans</h4>
                                            <p>Secure prime land with affordable installment payments starting from ₦500K.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Documentation Verification</h4>
                                            <p>Zero stress, authentic land titles and government approvals.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Future Value Realization</h4>
                                            <p>Hold landed property until urban expansion and development drive appreciation.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 02 · Property Development deep-dive ─────── */}
            <section id="property-dev" className="svc-detail-section">
                <div className="container">
                    <Reveal>
                        <div className="svc-detail-header svc-detail-header--right">
                            <div>
                                <span className="svc-detail-label">Premium Construction</span>
                                <h2 className="svc-detail-title">Exquisite Property Development</h2>
                            </div>
                            <span className="svc-detail-num">02</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="svc-detail-card">
                            <div className="svc-detail-image">
                                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80" alt="Property Development" />
                            </div>
                            <div className="svc-detail-content">
                                <p className="svc-detail-desc">
                                    We specialize in high-end residential and commercial developments that push the boundaries of design and functionality. From conceptualization to final finishing, our team ensures every detail reflects excellence and durability — transforming raw plots into premium living and working spaces.
                                </p>
                                <div className="svc-features-grid">
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Architectural Excellence</h4>
                                            <p>Modern designs crafted by experienced architects for maximum aesthetic and functional value.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Quality Materials</h4>
                                            <p>Only certified, durable materials sourced from trusted suppliers are used in all builds.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Timely Delivery</h4>
                                            <p>Project milestones are strictly monitored to ensure on-time completion.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Post-Construction Support</h4>
                                            <p>We remain available for maintenance and after-sale support after handover.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 03 · Documentation deep-dive ────────────── */}
            <section id="documentation" className="svc-detail-section">
                <div className="container">
                    <Reveal>
                        <div className="svc-detail-header">
                            <span className="svc-detail-num">03</span>
                            <div>
                                <span className="svc-detail-label">Legal & Compliance</span>
                                <h2 className="svc-detail-title">Documentation Support Services</h2>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="svc-detail-card">
                            <div className="svc-detail-image">
                                <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80" alt="Documentation Support" />
                            </div>
                            <div className="svc-detail-content">
                                <p className="svc-detail-desc">
                                    Navigating land titles and government approvals in Nigeria can be complex. We provide comprehensive documentation support, ensuring your investments are legally secure and fully compliant with state regulations — from survey plans to Deed of Assignment and C of O processing.
                                </p>
                                <div className="svc-features-grid">
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Title Verification</h4>
                                            <p>Thorough due diligence on every land title before purchase is finalized.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>C of O Processing</h4>
                                            <p>We handle Certificate of Occupancy applications and follow-ups on your behalf.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Survey & Allocation</h4>
                                            <p>Registered survey plans and formal allocation letters provided after payment.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Deed of Assignment</h4>
                                            <p>Professionally prepared and registered deeds protecting your ownership rights.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <HomeFAQ />
        </div>
    );
};

export default ServicesPage;
