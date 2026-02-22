import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Reveal from '../components/Reveal';
import { propertiesArray } from '../data/propertiesData';

const Properties = () => {
    const [filter, setFilter] = useState('abuja');

    const filteredProperties = filter === 'all'
        ? propertiesArray
        : propertiesArray.filter(p =>
            (p.state && p.state.toLowerCase() === filter) ||
            (p.location && p.location.toLowerCase().includes(filter))
        );

    const locations = [
        { id: 'abuja', label: 'Abuja Properties' },
        { id: 'lagos', label: 'Lagos Properties' },
        { id: 'ogun', label: 'Ogun Properties' }
    ];

    const getDynamicHeader = () => {
        const found = locations.find(loc => loc.id === filter);
        return found ? found.label.replace(' Properties', ' Landed Properties') : 'Our Landed Properties';
    };

    const getDynamicDescription = () => {
        if (filter === 'abuja') return "Invest in Nigeria's capital city. Prime locations with smart infrastructure and modern amenities for next-generation living.";
        if (filter === 'lagos') return "Secure premium plots in Nigeria's commercial nerve center. High-growth areas with verified titles and immense appreciation potential.";
        if (filter === 'ogun') return "Discover strategic opportunities in the gateway state. Perfect for industrial, commercial, and residential developments near Lagos.";
        return "Explore prime land investments across Nigeria's most strategic states.";
    };

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

                    {/* Location Switcher */}
                    <Reveal delay={0.3}>
                        <div className="location-switcher-wrapper">
                            <div className="location-switcher">
                                {locations.map(loc => (
                                    <button
                                        key={loc.id}
                                        className={`location-btn ${filter === loc.id ? 'active' : ''}`}
                                        onClick={() => setFilter(loc.id)}
                                    >
                                        {loc.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── Dynamic Section Header ────────────────── */}
            <section className="property-listings-section section">
                <div className="container">
                    <Reveal>
                        <div className="dynamic-section-header">
                            <h2 className="dynamic-title">{getDynamicHeader()}</h2>
                            <p className="dynamic-desc">{getDynamicDescription()}</p>
                        </div>
                    </Reveal>

                    <div className="properties-grid">
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((p, idx) => (
                                <Reveal key={p.id || idx} delay={idx * 0.1}>
                                    <PropertyCard {...p} />
                                </Reveal>
                            ))
                        ) : (
                            <div className="no-properties">
                                <p>No properties found in this location yet. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Properties;
