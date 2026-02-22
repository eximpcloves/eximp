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

            {/* ── Leadership Section (Managing Director) ───────────── */}
            <section className="about-leadership section">
                <div className="container">
                    <div className="leadership-header">
                        <Reveal>
                            <span className="leadership-label">Leadership</span>
                            <h2 className="leadership-title">Our Managing Director</h2>
                        </Reveal>
                    </div>

                    <div className="md-profile">
                        <Reveal y={30}>
                            <div className="md-card">
                                <div className="md-image">
                                    <img src="/md_portrait.png" alt="Managing Director" />
                                </div>
                                <div className="md-info">
                                    <h3>Justin Torff</h3>
                                    <p className="md-role">Managing Director / CEO</p>
                                    <div className="md-bio">
                                        <p>
                                            With over a decade of experience in the Nigerian real estate and infrastructure sector,
                                            our Managing Director leads Eximp & Cloves with a singular vision: to bridge the gap
                                            between aspiration and ownership.
                                        </p>
                                        <p>
                                            His leadership is defined by a commitment to transparency, quality, and the strategic
                                            repositioning of prime land into high-value residential and commercial developments.
                                            Under his guidance, the company has successfully delivered numerous projects that
                                            stand as testaments to architectural excellence and investment security.
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
