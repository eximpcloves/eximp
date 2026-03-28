import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Reveal from '../components/Reveal';
import { propertiesArray } from '../data/propertiesData';

const Properties = () => {
    return (
        <div className="properties-page">
            {/* ── Properties Hero ────────────────────────── */}
            <section className="property-hero-dark" style={{ backgroundImage: "url('/home_background.png')" }}>
                <div className="container">
                    <Reveal>
                        <div className="prop-hero-content">
                            <h1 className="prop-hero-title">Premium Land Properties<br />with Flexible Payment<br />Plans</h1>
                            <p className="prop-hero-subtitle">
                                Secure your future with affordable landed properties in<br />
                                Nigeria's fastest-growing regions. Enjoy up to 63% discount<br />
                                with our pre-launch promo prices and flexible installment
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── All Listings Section ────────────────── */}
            <section className="property-listings-section section">
                <div className="container">
                    <Reveal>
                        <div className="dynamic-section-header">
                            <h2 className="dynamic-title">Our Landed Properties</h2>
                            <p className="dynamic-desc">Explore prime land investments across Nigeria's most strategic states. All our estates are verified with secured titles and modern infrastructure ready for development.</p>
                        </div>
                    </Reveal>

                    <div className="properties-grid">
                        {propertiesArray.length > 0 ? (
                            propertiesArray.map((p, idx) => (
                                <Reveal key={p.id || idx} delay={idx * 0.1}>
                                    <PropertyCard {...p} />
                                </Reveal>
                            ))
                        ) : (
                            <div className="no-properties">
                                <p>No properties found yet. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Properties;
