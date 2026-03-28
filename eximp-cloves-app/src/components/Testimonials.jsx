import React from 'react';
import Reveal from './Reveal';

const testimonialsData = [
    { id: 1, name: "Chidi O.", location: "Lagos Buyer", text: "Coinfield Estate is a gem in Epe. Secured my 500sqm easily and the documentation process was surprisingly seamless. Highly reliable!", image: "/assets/testimonial_user_1.png", initials: "CO" },
    { id: 2, name: "Amina K.", location: "Abuja Investor", text: "Northstar Residence has the best urban planning I've seen in Gwagwalada. Truly impressed with the infrastructure and security vision.", image: "/assets/testimonial_user_2.png", initials: "AK" },
    { id: 3, name: "Segun & Mary", location: "Ogun Homeowners", text: "Baclay Estate is the perfect spot for our family home. The Ikorodu corridor is growing fast, and we are glad we invested early.", image: "/assets/testimonial_user_3.png", initials: "SM" },
    { id: 4, name: "Uche J.", location: "Lagos Professional", text: "The verified titles gave me peace of mind. In a market full of uncertainty, Eximp & Cloves stands out as a beacon of integrity.", image: "/assets/testimonial_user_4.png", initials: "UJ" },
    { id: 5, name: "Dr. Adegbesan", location: "CEO, Capital Group", text: "Conrad Residence is where luxury meets utility. Every detail of the estate layout shows a commitment to excellence. Highly recommended.", image: null, initials: "DA" },
    { id: 6, name: "Barrister Ibrahim", location: "Legal Consultant", text: "Caught the festive special and I'm so glad I did. Fast allocation and the team was professional throughout the entire process.", image: null, initials: "BI" },
    { id: 7, name: "Yinka D.", location: "Lagos Entrepreneur", text: "The customer service team is top-notch. They guided me through every step of my first land purchase. I now own two plots!", image: null, initials: "YD" },
    { id: 8, name: "Ngozi L.", location: "Abuja Buyer", text: "A very smart investment. The appreciation potential here is massive, and I've already seen growth in the surrounding area features.", image: null, initials: "NL" },
    { id: 9, name: "Justin T.", location: "Ogun Landowner", text: "Verified titles are hard to find, but Eximp delivered exactly as promised. Transparent, honest, and high-quality infrastructure.", image: null, initials: "JT" },
    { id: 10, name: "Grace E.", location: "Abuja Property Owner", text: "Building my dream home at Prime Circle was a breeze. The management team is responsive and the site environment is very secure.", image: null, initials: "GE" }
];

const Testimonials = () => {
    // Split into 2 rows of 5 for the wall effect
    const row1 = testimonialsData.slice(0, 5);
    const row2 = testimonialsData.slice(5, 10);

    const renderMarqueeItems = (items) => (
        // Duplicate items for seamless infinite scroll
        [...items, ...items].map((t, idx) => (
            <div className="testimonial-card" key={`${t.id}-${idx}`}>
                <div className="testimonial-card-header">
                    <div className="testimonial-avatar">
                        {t.image ? (
                            <img src={t.image} alt={t.name} />
                        ) : (
                            <div className="avatar-initials">{t.initials}</div>
                        )}
                    </div>
                    <div className="testimonial-info">
                        <h4 className="testimonial-name">{t.name}</h4>
                        <span className="testimonial-location">{t.location}</span>
                    </div>
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">★</span>
                    ))}
                </div>
            </div>
        ))
    );

    return (
        <section className="testimonials-section">
            <div className="container">
                <Reveal>
                    <div className="testimonials-header">
                        <span className="testimonials-label">Wall of Love</span>
                        <h2 className="testimonials-main-title">Trusted by Thousands across Nigeria</h2>
                        <p className="testimonials-subtitle">
                            Hear directly from the people building their futures with Eximp & Cloves Infrastructure.
                        </p>
                    </div>
                </Reveal>

                <div className="marquee-wrapper">
                    {/* Row 1: Right to Left */}
                    <div className="marquee-container row-1">
                        <div className="marquee-content rtl">
                            {renderMarqueeItems(row1)}
                        </div>
                    </div>

                    {/* Row 2: Left to Right */}
                    <div className="marquee-container row-2">
                        <div className="marquee-content ltr">
                            {renderMarqueeItems(row2)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
