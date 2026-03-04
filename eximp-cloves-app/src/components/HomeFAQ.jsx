import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const faqData = [
    { q: 'How can I use Eximp', a: 'Our platform lets you browse verified land listings, book site inspections, and complete your purchase with full documentation support — all in one place.' },
    { q: 'What type of properties do you sell?', a: 'We offer residential plots, commercial lands, and investment properties in prime and developing locations.' },
    { q: 'Where are your properties located?', a: 'Our properties are situated in fast-growing and strategic locations across Lagos, Ogun, and Abuja with high investment potential.' },
    { q: 'What is the title of your properties?', a: 'Our properties come with verified titles such as C of O, Registered Survey, or Deed of Assignment, depending on the estate.' },
    { q: 'Are your lands free from government acquisition?', a: 'Yes. All our properties are properly verified and free from encumbrances.' },
    { q: 'Can I make payment in installments?', a: 'Yes, we offer flexible installment payment plans to suit our clients.' },
    { q: 'What documents will I receive after payment?', a: 'You will receive a payment receipt, allocation letter, contract of sale, Deed of Assignment, provisional survey and Acknowledgement certificate.' },
    { q: 'How long does allocation take after payment?', a: 'Allocation is done shortly after payment confirmation and documentation.' },
    { q: 'Can I inspect the property before purchase?', a: 'Yes. We encourage site inspections, and we can schedule a convenient date for you.' },
    { q: 'Can I start building immediately after purchase?', a: 'Yes, once payment is completed and allocation is done, you can commence development (subject to estate guidelines).' },
    { q: 'Do you assist with documentation and processing of title?', a: 'Yes. We guide our clients through all legal documentation and title processing.' },
    { q: 'Are there additional fees apart from the land cost?', a: 'No, all payment inclusive.' },
    { q: 'Which account should payment be made into?', a: 'Bank: Providus Bank | Account Number: 1308184591 | Account Name: Eximp & Cloves Infrastructure Limited' },
];

const FAQItem = ({ question, answer, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const itemRef = useRef(null);

    useEffect(() => {
        if (isOpen && itemRef.current) {
            // Wait slightly for the animation to start so we have accurate dimensions
            const timer = setTimeout(() => {
                itemRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <div
            ref={itemRef}
            className={`home-faq-item ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(o => !o)}
        >
            <div className="home-faq-question">
                <h4>{question}</h4>
                <span className="home-faq-icon">{isOpen ? '−' : '+'}</span>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="home-faq-answer"
                    >
                        <p>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const HomeFAQ = () => {
    return (
        <section className="home-faq-section">
            <div className="container">
                <div className="home-faq-container">

                    {/* LEFT: sticky title */}
                    <div className="home-faq-left">
                        <h2 className="home-faq-title">Frequently Asked<br />Questons</h2>
                    </div>

                    {/* RIGHT: scrollable accordion — 5 items visible, rest on scroll */}
                    <div className="home-faq-right">
                        <div className="home-faq-scroll-area">
                            {faqData.map((item, idx) => (
                                <FAQItem
                                    key={idx}
                                    question={item.q}
                                    answer={item.a}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeFAQ;
