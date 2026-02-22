import React from 'react';
import Reveal from './Reveal';

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="testimonials-container">

                    {/* LEFT: label, description */}
                    <div className="testimonials-left">
                        <Reveal>
                            <span className="testimonials-label">Client Stories</span>
                            <h2 className="testimonials-main-title">Real People, Real Results</h2>
                            <p className="testimonials-subtitle">
                                Don't just take our word for it. Hear directly from our clients about their journey with Eximp & Cloves Infrastructure.
                            </p>
                        </Reveal>
                    </div>

                    {/* RIGHT: Featured Video Testimonial */}
                    <div className="testimonials-right">
                        <Reveal delay={0.2}>
                            <div className="testimonial-video-wrapper">
                                <video
                                    className="testimonial-video"
                                    controls
                                    playsInline
                                    preload="metadata"
                                >
                                    <source src="/assets/testimonial vid 1.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="video-overlay-glow"></div>
                            </div>
                        </Reveal>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
