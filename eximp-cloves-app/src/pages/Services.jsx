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
                            From strategic land banking to premium building construction and asset management, we provide end-to-end solutions for your real estate journey in Nigeria.
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
                                <h3>Land Purchase & Banking</h3>
                                <p>Secure your future with prime real estate. Strategic acquisition in high-growth corridors for verified titles and high appreciation.</p>
                                <a href="#land-banking" className="core-service-link">Learn More &nbsp;→</a>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="core-service-card">
                                <span className="core-service-num">02</span>
                                <h3>Building & Construction</h3>
                                <p>Transforming architectural visions into reality. High-quality residential and commercial builds focused on modern aesthetics.</p>
                                <a href="#building-construction" className="core-service-link">Learn More &nbsp;→</a>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="core-service-card">
                                <span className="core-service-num">03</span>
                                <h3>Project & Property Management</h3>
                                <p>Maximizing asset value with expert oversight. coordination and facility management for sustainable returns.</p>
                                <a href="#property-management" className="core-service-link">Learn More &nbsp;→</a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── 01 · Land Purchase & Banking Deep-Dive ─────── */}
            <section id="land-banking" className="svc-detail-section">
                <div className="container">
                    <Reveal>
                        <div className="svc-detail-header">
                            <span className="svc-detail-num">01</span>
                            <div>
                                <span className="svc-detail-label">Investment Opportunities</span>
                                <h2 className="svc-detail-title">Land Purchase & Banking</h2>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="svc-detail-card">
                            <div className="svc-detail-image">
                                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" alt="Land Purchase & Banking" />
                            </div>
                            <div className="svc-detail-content">
                                <p className="svc-detail-desc">
                                    At Eximp & Cloves, investing with us means gaining access to Nigeria's most strategic affordable land for sale. We help you bank on undeveloped lands so you can hold onto them for future appreciation. Our approach focuses on identifying high-growth corridors before major infrastructure projects drive up property values, ensuring high ROI for our clients.
                                </p>
                                <div className="svc-features-grid">
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Strategic Acquisition</h4>
                                            <p>We identify high-growth residential and commercial areas slated for future infrastructure development.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Verified Ownership</h4>
                                            <p>All our lands come with verified titles and government approvals for absolute peace of mind.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Installment Flexibility</h4>
                                            <p>Secure prime real estate with manageable payment plans designed for your financial growth.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Appreciation Potential</h4>
                                            <p>Leverage the massive appreciation that comes with Nigeria's rapidly expanding urban centers.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 02 · Building & Construction Deep-Dive ─────── */}
            <section id="building-construction" className="svc-detail-section">
                <div className="container">
                    <Reveal>
                        <div className="svc-detail-header svc-detail-header--right">
                            <div>
                                <span className="svc-detail-label">Premium Construction</span>
                                <h2 className="svc-detail-title">Building & Construction</h2>
                            </div>
                            <span className="svc-detail-num">02</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="svc-detail-card">
                            <div className="svc-detail-image">
                                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600" alt="Building & Construction" />
                            </div>
                            <div className="svc-detail-content">
                                <p className="svc-detail-desc">
                                    We deliver high-end residential and commercial developments that redefine standard living. From conceptualization to final finishing, our specialized construction team ensures every structure reflects durability, modern aesthetics, and architectural excellence — transforming your property into a solid asset.
                                </p>
                                <div className="svc-features-grid">
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Architectural Excellence</h4>
                                            <p>Modern designs crafted by experienced architects for maximum functional and aesthetic value.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Structural Integrity</h4>
                                            <p>Uncompromising construction quality using certified materials and industry best practices.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Timely Delivery</h4>
                                            <p>Strict adherence to project timelines, ensuring your investment is ready when promised.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Modern Finishing</h4>
                                            <p>State-of-the-art interior and exterior finishing that delivers a premium, move-in-ready experience.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 03 · Project & Property Management Deep-Dive ────── */}
            <section id="property-management" className="svc-detail-section">
                <div className="container">
                    <Reveal>
                        <div className="svc-detail-header">
                            <span className="svc-detail-num">03</span>
                            <div>
                                <span className="svc-detail-label">Asset Mastery & Oversight</span>
                                <h2 className="svc-detail-title">Project & Property Management</h2>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="svc-detail-card">
                            <div className="svc-detail-image">
                                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200" alt="Project & Property Management" />
                            </div>
                            <div className="svc-detail-content">
                                <p className="svc-detail-desc">
                                    A great property is only as good as its management. We take the stress out of ownership by providing comprehensive project coordination and property management services. We ensure your assets remain in peak condition, yielding optimum rental returns and maintaining steady appreciation over the long term.
                                </p>
                                <div className="svc-features-grid">
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Project Coordination</h4>
                                            <p>Expert oversight of large-scale developments, ensuring all vendors and milestones align with your goals.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Facility Management</h4>
                                            <p>Maintaining the structural and functional health of your properties to preserve market value.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Rent & Value Optimization</h4>
                                            <p>Strategic management focused on maximizing your passive income and asset ROI.</p>
                                        </div>
                                    </div>
                                    <div className="svc-feature">
                                        <span className="svc-feature-dot" />
                                        <div>
                                            <h4>Title & Document Oversight</h4>
                                            <p>Ongoing support for land title documentation, renewals, and legal compliance.</p>
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
