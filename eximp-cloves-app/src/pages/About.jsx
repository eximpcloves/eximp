import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import HomeFAQ from '../components/HomeFAQ';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero" style={{ backgroundImage: "url('/about_hero_background.png')" }}>
                <div className="container">
                    <Reveal>
                        <div className="about-hero-content">
                            <span className="about-hero-label">About Eximp & Cloves</span>
                            <h1 className="about-hero-heading">
                                Transforming Prime Locations<br />Into Valuable Developments
                            </h1>
                            <p className="about-hero-desc">
                                At Eximp & Cloves Infrastructure Limited, vision drives everything we build.
                                We're dedicated to creating well-structured residential and commercial properties
                                that anticipate tomorrow's growth.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Our Foundation (Vision & Mission) ──────────────── */}
            <section className="about-foundation section">
                <div className="container">
                    <div className="foundation-grid">
                        <div className="foundation-left">
                            <div className="foundation-header">
                                <Reveal>
                                    <span className="foundation-label">Our Foundation</span>
                                    <h2 className="foundation-title">Our Vision & Mission</h2>
                                    <p className="foundation-subtitle">
                                        Comprehensive real estate solutions tailored to help you build wealth<br />
                                        through strategic investments in Nigeria.
                                    </p>
                                </Reveal>
                            </div>
                            <Reveal x={-30} delay={0.2}>
                                <div className="foundation-image">
                                    <img src="/our_vision_image.png" alt="Eximp & Cloves Modern Development" />
                                </div>
                            </Reveal>
                        </div>

                        <div className="foundation-cards">
                            <Reveal x={30} delay={0.1}>
                                <div className="foundation-card">
                                    <div className="foundation-card-icon">
                                        <div className="star-icon">★</div>
                                    </div>
                                    <h3>Our Vision</h3>
                                    <p>
                                        Vision drives everything we build. We are committed to transforming prime
                                        locations into valuable, well-structured residential and commercial properties
                                        that meet today's needs while anticipating tomorrow's growth.
                                    </p>
                                </div>
                            </Reveal>

                            <Reveal x={30} delay={0.2}>
                                <div className="foundation-card">
                                    <div className="foundation-card-icon">
                                        <div className="star-icon">★</div>
                                    </div>
                                    <h3>Our Approach</h3>
                                    <p>
                                        Every project is carefully planned to deliver exceptional value.
                                        We combine innovative concepts, quality construction, and sustainable
                                        development practices to create estates that endure and build lasting legacies.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Large Quote Section ───────────────────────────── */}
            <section className="about-quote-section">
                <div className="container">
                    <Reveal y={30}>
                        <div className="about-quote-content">
                            <p>
                                Our projects are carefully planned to meet the needs of today’s buyers
                                while anticipating tomorrow’s growth. With operations spanning Lagos,
                                Ogun, and Abuja, we combine innovative concepts, quality construction,
                                and sustainable development practices to deliver estates that endure.
                            </p>
                            <p>
                                Every Eximp & Cloves project represents clarity, credibility, and commitment,
                                delivering properties that create value beyond ownership.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Leadership & Governance Section ───────────── */}
            <section className="about-leadership section">
                <div className="container">
                    <div className="leadership-header">
                        <Reveal>
                            <span className="leadership-label">Leadership & Governance</span>
                            <h2 className="leadership-title">Our Leadership Team</h2>
                            <p className="leadership-subtitle">
                                Guided by visionary leadership and protected by world-class legal oversight.
                            </p>
                        </Reveal>
                    </div>

                    {/* MD / CEO PROFILE */}
                    <div className="md-profile">
                        <Reveal y={30}>
                            <div className="md-card">
                                <div className="md-image">
                                    <img src="/assets/MD_CEO.jpg" alt="Adebayo O. Steven (Jasper Stevens)" />
                                </div>
                                <div className="md-info">
                                    <h3>Jasper Stevens<br /><small>(Adebayo O. Steven)</small></h3>
                                    <p className="md-role">Managing Director / CEO</p>
                                    <div className="md-bio">
                                        <p>
                                            A native of Epe, Lagos, Nigeria, is a dynamic MD/CEO with over a decade of experience across technology, blockchain, venture capital, medical research, and real estate development.
                                        </p>
                                        <p>
                                            With a strong background in the medical field as a research analyst, he has contributed to healthcare innovation since launching his career in Lagos. He pioneered blockchain-AI platforms for transparent finance and supply chains, then advanced into venture capital, investing in 50+ early-stage African startups with multiple successful exits.
                                        </p>
                                        <p>
                                            In medical research, he has driven telemedicine and secure blockchain-based health-data systems to enhance care access in underserved communities. In real estate, he leads sustainable smart-city projects in Lagos and beyond, focusing on affordable housing and community integration.
                                        </p>
                                        <p>
                                            A passionate advocate for education, Jasper addresses the out-of-school children crisis by providing scholarships, digital tools, and STEM/vocational training. His initiatives have reintegrated over 5,000 youths from marginalized communities into educational pathways.
                                        </p>
                                        <p>
                                            As a TEDx speaker (TEDxUNIZIK), Jasper shares insights on innovation, decentralized systems, and data sovereignty. He holds degrees from multiple Business Schools across the world and lives by his principle: <strong>“Innovation for All.”</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* LEGAL & COMPLIANCE GRID */}
                    <div className="governance-grid">
                        <Reveal y={30} delay={0.2}>
                            <div className="governance-card">
                                <div className="gov-image">
                                    <img src="/assets/legal compliance associate.jpg" alt="Godslove S. Nnaji Esq." />
                                </div>
                                <div className="gov-info">
                                    <span className="gov-tag">Internal Compliance</span>
                                    <h3>Godslove S. Nnaji Esq.</h3>
                                    <p className="gov-role">Legal Officer & Compliance Associate</p>
                                    <div className="gov-bio">
                                        <p>
                                            Godslove S. Nnaji Esq. is an associate at Delaw LP and an Associate Member of the Institute of Chartered Mediators and Conciliators. A prolific Intellectual and Emerging Technology Law Practitioner; he has advised companies and government parastatals including but not limited to FXTM, Samsung, AMCON, Phillips Outsourcing, etc on multi-million deals.
                                        </p><br></br>
                                        <p>
                                            He works with Eximp and Cloves as its Legal and Compliance Associate.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal y={30} delay={0.3}>
                            <div className="governance-card">
                                <div className="gov-image">
                                    <img src="/assets/Legal partner.jpg" alt="Lightfield Legal Practitioners" />
                                </div>
                                <div className="gov-info">
                                    <span className="gov-tag">External Legal Partner</span>
                                    <h3>Lightfield Legal Practitioners</h3>
                                    <p className="gov-role">Institutional Legal Advisory</p>
                                    <div className="gov-bio">
                                        <p>
                                            Lightfield Legal Practitioners (Lightfield LP) is a forward-thinking firm pioneering legal excellence in Africa&apos;s digital economy. Founded by Managing Partner Balogun Sofiyullahi, a seasoned expert in technology law and real estate, the firm brings together a multidisciplinary team of distinguished professionals to deliver innovative legal solutions across the continent.
                                        </p><br></br>
                                        <p>
                                            The team includes Prof. Salim Bashir Magashi (Dean of Law at ABU), Yahaya Danasabe Dangana (SAN), Dr. Hassan Bala, Gidado Taofeek Esq., and Shehu Abdulwaheed Adisa. Together, they offer advisory and litigation services spanning artificial intelligence law, property law, and regulatory compliance.
                                        </p><br></br>
                                        <p>
                                            At Eximp and Cloves, we are proud to have Lightfield LP as our trusted legal partner. Their client-centric approach equips us with the legal clarity needed to navigate property regulations, protect our business interests, and continue delivering quality projects with confidence and integrity.
                                        </p><br></br>
                                        <p>
                                            Lightfield LP&apos;s notable achievements include speaking at the TechNova Summit 2026 and maintaining partnerships with global entities like TechCorp Global and AI Systems Inc. Their guiding principle: <strong>“Empowering every transaction with clarity, excellence, and unwavering integrity.”</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Consultation CTA Section ───────────────────── */}
            <section className="about-cta section">
                <div className="container">
                    <Reveal>
                        <div className="cta-content">
                            <h2 className="cta-heading">Schedule a free<br />consultation</h2>
                            <p className="cta-text">
                                We craft inspiring spaces that blend cutting-edge<br />
                                design with enduring functionality, turning your<br />
                                vision into reality.
                            </p>
                            <Link to="/properties" className="cta-btn">Check Out Properties</Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <HomeFAQ />
        </div>
    );
};

export default About;
