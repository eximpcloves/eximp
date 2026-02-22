import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';

const servicesData = [
    {
        id: 'land-banking',
        title: 'Land Banking Investment',
        description: 'Taking you from empty plot to move-in-ready property, at Eximp & Cloves, we transform raw land into affordable homes for sale in Nigeria with flexible payment options. Our residential communities are designed with care to bring you the perfect balance of comfort, ease, and modern living.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: 'property-dev',
        title: 'Exquisite Property Development',
        description: 'We specialize in high-end residential and commercial developments that push the boundaries of design and functionality. From conceptualization to final finishing, our team ensures every detail reflects excellence and durability.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: 'doc-support',
        title: 'Documentation Support Services',
        description: 'Navigating land titles and government approvals in Nigeria can be complex. We provide comprehensive documentation support, ensuring your investments are legally secure and fully compliant with state regulations.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
];

const Services = () => {
    const [activeIndex, setActiveIndex] = useState(1); // Default to the second item
    const activeService = servicesData[activeIndex];
    const scrollContainerRef = useRef(null);

    // Ensure the default item is centered on mount without jumping the whole page
    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const activeItem = container.children[activeIndex];
                if (activeItem) {
                    const scrollLeft = activeItem.offsetLeft - (container.offsetWidth / 2) + (activeItem.offsetWidth / 2);
                    container.scroll({
                        left: scrollLeft,
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="services-section">
            <div className="container">
                <div className="services-container">

                    {/* LEFT COLUMN: title at top, service list at bottom */}
                    <div className="services-left">
                        <h2 className="services-main-title">Eximp &amp; Cloves Services</h2>

                        <div className="services-list" ref={scrollContainerRef}>
                            {servicesData.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`service-item ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <span className="service-item-title">{service.title}</span>
                                    <div className="service-icon-circle">
                                        {activeIndex === index ? (
                                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: image fills space, description anchored to bottom */}
                    <div className="services-right">
                        {/* Image wrapper — grows to fill all space above the description */}
                        <div className="service-image-wrapper">
                            <img src={activeService.image} alt={activeService.title} />
                        </div>

                        {/* Description — fixed at bottom, doesn't grow */}
                        <div className="service-details">
                            <h3 className="service-type-title">{activeService.title}</h3>
                            <p className="service-description">{activeService.description}</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;
