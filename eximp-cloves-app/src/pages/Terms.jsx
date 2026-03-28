import React, { useEffect } from 'react';
import Reveal from '../components/Reveal';
import '../styles/privacy.css';

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <section className="privacy-hero">
                <div className="container">
                    <Reveal>
                        <h1>Terms of Service</h1>
                        <p className="subtitle">Last Updated: February 18, 2024</p>
                    </Reveal>
                </div>
            </section>

            <section className="privacy-content">
                <div className="container narrow-container">
                    <Reveal delay={0.2}>
                        <div className="legal-document">
                            <p className="intro">
                                The Company reserves the right to update and amend these Terms of Service at any time and
                                at its sole discretion, with reasonable notice. Users are responsible for regularly reviewing these
                                Terms, and continued use of the website constitutes acceptance of any modifications.
                            </p>

                            <p>
                                This Terms of Service (ToS) agreement establishes the rules, obligations, and limitations
                                between Eximp and Cloves Infrastructure Ltd and its clients, users of the company's website, including visitors
                                who browse the site, individuals who submit inquiries or contact forms, clients who engage the
                                Company's services, and any other persons who process transactions or information through
                                the Company's website.
                            </p>

                            <p>
                                By accessing, browsing, or using the Company's website in any manner, users acknowledge
                                that they have read, understood, and agree to be bound by the terms of these Terms of Service.
                            </p>

                            <p>
                                These Terms of Service do not apply to third-party websites, services, or platforms that may
                                be linked to or accessible through the Company's website, and users access such external sites
                                at their own risk.
                            </p>

                            <p>
                                The company reserves the right to update these terms periodically, and continued use of the
                                website following any modifications constitutes acceptance of the revised terms.
                            </p>

                            <p>
                                These Terms of Service is governed by and shall be construed in accordance with the laws of
                                Nigeria.
                            </p>

                            <p>
                                Please read these Terms of Service carefully before using our website. By accessing or using
                                the website operated by Eximp and Cloves Infrastructure Ltd, you agree to be bound by these Terms.
                            </p>

                            {/* Definitions */}
                            <div className="policy-section">
                                <h3>Definitions</h3>
                                <p>In these Terms of Service, the following terms shall have the meanings set out below:</p>
                                <p>
                                    <strong>"Company"</strong> or <strong>"Owner"</strong> means Eximp and Cloves Infrastructure Ltd, a company registered in Nigeria,
                                    including its directors, officers, employees, agents, and affiliates.
                                </p>
                                <p>
                                    <strong>"Website"</strong> means the website operated by the Company, including all pages, content, features,
                                    and services accessible through it.
                                </p>
                                <p>
                                    <strong>"User"</strong> or <strong>"You"</strong> means any individual who accesses, browses, or uses the Website in any
                                    manner, including visitors, clients, and persons submitting enquiries or processing transactions.
                                </p>
                                <p>
                                    <strong>"Services"</strong> means all services, features, and functionalities provided by the Company through
                                    the Website.
                                </p>
                                <p>
                                    <strong>"Content"</strong> means all text, graphics, logos, images, photographs, property listings, videos,
                                    software, and other materials displayed on the Website.
                                </p>
                                <p>
                                    <strong>"Terms"</strong> means these Terms of Service, as amended from time to time.
                                </p>
                            </div>

                            {/* 1.1 Acceptance of Terms */}
                            <div className="policy-section">
                                <h3>1.1. Acceptance of Terms</h3>
                                <ul>
                                    <li>
                                        (a) By accessing, browsing, or using the Company's website in any manner, you
                                        automatically and unconditionally acknowledge that you have read,
                                        understood, and agree to be bound by these Terms of Service in their entirety,
                                        as well as any policies incorporated herein by reference.
                                    </li>
                                    <li>
                                        (b) If you do not agree to these Terms of Service or any future modifications,
                                        your sole remedy is to immediately discontinue all use of the website and any
                                        services offered through it. The Company shall have no liability to you for
                                        any such discontinuation.
                                    </li>
                                    <li>
                                        (c) The Company reserves the right to modify, suspend, or discontinue any
                                        aspect of the website or these Terms of Service at any time with reasonable
                                        prior notice and without liability. Your continued use of the website
                                        following any modifications constitutes your binding acceptance of the
                                        revised terms.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.2 Intellectual Property */}
                            <div className="policy-section">
                                <h3>1.2. Intellectual Property</h3>
                                <ul>
                                    <li>
                                        (a) All content and materials on the website, including but not limited to text,
                                        graphics, logos, trademarks, service marks, images, photographs, property
                                        listings, videos, software, source code, design elements, and all associated
                                        goodwill, are the sole and exclusive property of Eximp and Cloves Infrastructure Ltd or its
                                        licensors and are protected by Nigerian and international intellectual property
                                        laws.
                                    </li>
                                    <li>
                                        (b) You may not reproduce, modify, distribute, display, transmit, sell, license, or
                                        create derivative works from any content or materials on the website without
                                        the prior written consent of the Company.
                                    </li>
                                    <li>
                                        (c) Any unauthorized use of the Company's intellectual property shall be deemed
                                        a material breach of these Terms and may result in immediate legal action,
                                        including but not limited to claims for injunctive relief, statutory and actual
                                        damages, disgorgement of profits, and recovery of legal costs and fees.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.3 Use of Website */}
                            <div className="policy-section">
                                <h3>1.3. Use of Website</h3>
                                <ul>
                                    <li>
                                        (a) You agree to use the website only for lawful purposes and in accordance with
                                        these Terms of Service.
                                    </li>
                                    <li>
                                        (b) You shall not use the website in any manner that could damage, disable,
                                        overburden, or impair the website or interfere with any other party's use of
                                        the website.
                                    </li>
                                    <li>
                                        (c) You shall not attempt to gain unauthorized access to any portion of the
                                        website, computer systems, or networks connected to the website.
                                    </li>
                                    <li>
                                        (d) You shall not use any automated means, including robots, spiders, scrapers,
                                        or data mining tools, to access the website or collect any information from
                                        the website. Any such unauthorized access shall entitle the Company to seek
                                        legal action and relief.
                                    </li>
                                    <li>
                                        (e) You shall not engage in any activity that disparages, defames, or harms the
                                        reputation of the Company, its services, or its personnel.
                                    </li>
                                    <li>
                                        (f) You shall not reverse engineer, decompile, or disassemble any software or
                                        technology used in connection with the website.
                                    </li>
                                    <li>
                                        (g) The Company reserves the right to investigate any suspected violations of
                                        these Terms and to take any action it deems appropriate, including reporting
                                        suspected illegal activity to law enforcement authorities.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.4 Property Listings and Information */}
                            <div className="policy-section">
                                <h3>1.4. Property Listings and Information</h3>
                                <ul>
                                    <li>
                                        (a) Property listings, prices, availability, and other information displayed on the
                                        website are provided for general informational purposes only and do not
                                        constitute an offer to sell, a solicitation of an offer to purchase, or any
                                        representation or warranty regarding any property. Users acknowledge that
                                        such information may be incomplete, inaccurate, or outdated.
                                    </li>
                                    <li>
                                        (b) The Company makes no representations, warranties, or guarantees
                                        whatsoever regarding the completeness, accuracy, reliability, suitability, or
                                        availability of any property listings, market data, valuations, or other content
                                        on the website. Users rely on such information entirely at their own risk.
                                    </li>
                                    <li>
                                        (c) All property transactions are subject to separate written agreements,
                                        independent legal advice, and verification of property details, title,
                                        encumbrances, and legal status. The Company shall bear no responsibility
                                        for the outcome of any property transaction.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.5 Cookies */}
                            <div className="policy-section">
                                <h3>1.5. Cookies</h3>
                                <ul>
                                    <li>
                                        (a) The website uses cookies and similar tracking technologies to enhance user
                                        experience and improve website functionality. Cookies are small files stored
                                        on your computer or mobile device that help us recognise you as a user.
                                    </li>
                                    <li>
                                        (b) By using the website, you irrevocably consent to the use of cookies and
                                        similar technologies. While you may disable cookies through your browser
                                        settings, doing so may significantly impair website functionality, and the
                                        Company accepts no responsibility for any diminished user experience
                                        resulting therefrom.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.6 Third-Party Links */}
                            <div className="policy-section">
                                <h3>1.6. Third-Party Links</h3>
                                <ul>
                                    <li>
                                        (a) The website may contain links to third-party websites or services that are not
                                        owned or controlled by the Company.
                                    </li>
                                    <li>
                                        (b) The Company has no control over and assumes absolutely no responsibility
                                        for the content, privacy policies, practices, availability, or security of any
                                        third-party websites or services. You access such third-party sites entirely at
                                        your own risk and release the Company from any and all liability arising
                                        therefrom.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.7 Limitation of Liability */}
                            <div className="policy-section">
                                <h3>1.7. Limitation of Liability</h3>
                                <ul>
                                    <li>
                                        (a) To the maximum extent permitted by applicable law, Eximp and Cloves Infrastructure Ltd,
                                        its parent companies, subsidiaries, affiliates, directors, officers, employees,
                                        agents, partners, and licensors shall not be liable under any circumstances for
                                        any direct, indirect, incidental, special, consequential, exemplary, or punitive
                                        damages arising out of or in any way connected with your access to, use of,
                                        or inability to use the website or any services.
                                    </li>
                                    <li>
                                        (b) This limitation of liability applies to, without limitation, damages for loss of
                                        profits, revenue, goodwill, data, business opportunities, anticipated savings,
                                        or other intangible or economic losses, regardless of whether the Company
                                        has been advised of the possibility of such damages and regardless of the
                                        legal theory upon which any claim is based.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.8 Indemnification */}
                            <div className="policy-section">
                                <h3>1.8. Indemnification</h3>
                                <ul>
                                    <li>
                                        (a) You agree to fully indemnify, defend, and hold harmless Eximp and Cloves Infrastructure
                                        Ltd and its parent companies, subsidiaries, affiliates, directors, officers,
                                        employees, agents, partners, licensors, and service providers from and
                                        against any and all claims, demands, actions, damages, losses, liabilities,
                                        judgments, settlements, costs, and expenses (including reasonable legal fees
                                        and investigation costs) arising out of or in connection with: (i) your access
                                        to or use of the website; (ii) your violation of these Terms of Service; (iii)
                                        your violation of any applicable law or regulation; (iv) your violation of any
                                        third-party rights, including intellectual property or privacy rights; (v) any
                                        content you submit, post, or transmit through the website; or (vi) any dispute
                                        between you and any third party.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.9 Disclaimer of Warranties */}
                            <div className="policy-section">
                                <h3>1.9. Disclaimer of Warranties</h3>
                                <ul>
                                    <li>
                                        (a) The website and all content, materials, information, and services provided
                                        through it are offered strictly on an "as is," "as available," and "with all faults"
                                        basis without any warranties or representations of any kind, whether express,
                                        implied, or statutory.
                                    </li>
                                    <li>
                                        (b) The Company expressly and categorically disclaims all warranties, including
                                        but not limited to implied warranties of merchantability, fitness for a
                                        particular purpose, title, non-infringement, accuracy, completeness,
                                        reliability, compatibility, and security, to the fullest extent permitted by law.
                                    </li>
                                    <li>
                                        (c) The Company does not warrant that the website will be available,
                                        uninterrupted, timely, error-free, secure, or free of viruses, malware, or other
                                        harmful components, and disclaims all liability for any harm resulting from
                                        your access to or use of the website.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.10 Termination */}
                            <div className="policy-section">
                                <h3>1.10. Termination</h3>
                                <ul>
                                    <li>
                                        (a) The Company reserves the absolute and unrestricted right to terminate,
                                        suspend, restrict, or deny your access to the website at any time, for any
                                        reason or no reason, with or without cause, and with or without prior notice,
                                        at its sole and unfettered discretion.
                                    </li>
                                    <li>
                                        (b) Upon termination, your right to use the website will immediately and
                                        automatically cease. The Company may, without liability, delete any content,
                                        information, or data associated with your use, and you shall have no claim
                                        against the Company for any such deletion or termination.
                                    </li>
                                    <li>
                                        (c) All provisions of these Terms of Service that by their nature should survive
                                        termination shall survive, including intellectual property provisions,
                                        disclaimers, limitations of liability, and indemnification obligations.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.11 Governing Law */}
                            <div className="policy-section">
                                <h3>1.11. Governing Law</h3>
                                <ul>
                                    <li>
                                        (a) These Terms of Service shall be governed by and construed in accordance
                                        with the laws of the Federal Republic of Nigeria, without regard to any
                                        principles of conflicts of law.
                                    </li>
                                    <li>
                                        (b) Any disputes arising from or relating to these Terms of Service shall be
                                        subject to the exclusive jurisdiction of the courts of the Federal Republic of
                                        Nigeria.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.12 Dispute Resolution */}
                            <div className="policy-section">
                                <h3>1.12. Dispute Resolution</h3>
                                <ul>
                                    <li>
                                        (a) Any dispute, controversy, or claim arising out of or relating to these Terms
                                        of Service or the breach, termination, or validity thereof shall first be subject
                                        to good faith negotiations between the parties for a period of thirty (30) days.
                                    </li>
                                    <li>
                                        (b) If the dispute cannot be resolved through negotiation, it shall be referred to
                                        and finally resolved by arbitration administered in Lagos, Nigeria, in
                                        accordance with the Arbitration and Mediation Act 2023.
                                    </li>
                                    <li>
                                        (c) The decision of the arbitrator shall be final and binding on both parties, and
                                        judgment upon the award may be entered in any court of competent
                                        jurisdiction. Each party shall bear its own costs, and the losing party shall
                                        bear the costs of arbitration.
                                    </li>
                                    <li>
                                        (d) You agree that any dispute resolution proceedings will be conducted only on
                                        an individual basis and not in a class, consolidated, or representative action.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.13 Severability */}
                            <div className="policy-section">
                                <h3>1.13. Severability</h3>
                                <ul>
                                    <li>
                                        (a) If any provision of these Terms of Service is found to be invalid, illegal, or
                                        unenforceable by a court of competent jurisdiction, such invalidity shall not
                                        affect the remaining provisions, which shall continue in full force and effect.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.14 Force Majeure */}
                            <div className="policy-section">
                                <h3>1.14. Force Majeure</h3>
                                <ul>
                                    <li>
                                        (a) The Company shall not be liable for any failure or delay in performing its
                                        obligations under these Terms of Service where such failure or delay results
                                        from circumstances beyond its reasonable control, including but not limited
                                        to acts of God, natural disasters, war, terrorism, civil unrest, government
                                        actions, epidemics, pandemics, power failures, telecommunications failures,
                                        cyberattacks, or any other force majeure event.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.15 Waiver */}
                            <div className="policy-section">
                                <h3>1.15. Waiver</h3>
                                <ul>
                                    <li>
                                        (a) No failure or delay by the Company in exercising any right, power, or remedy
                                        under these Terms of Service shall operate as a waiver thereof, nor shall any
                                        single or partial exercise of any right, power, or remedy preclude any other
                                        or further exercise thereof or the exercise of any other right, power, or
                                        remedy.
                                    </li>
                                    <li>
                                        (b) The Owner's failure to assert any right or provision under these Terms shall
                                        not constitute a waiver of any such right or provision. No waiver shall be
                                        considered a further or continuing waiver of such term or any other term.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.16 Assignment */}
                            <div className="policy-section">
                                <h3>1.16. Assignment</h3>
                                <ul>
                                    <li>
                                        (a) The Company may assign, transfer, or delegate any of its rights or obligations
                                        under these Terms of Service to any third party at any time without notice to
                                        you or your consent. You may not assign, transfer, or delegate any of your
                                        rights or obligations under these Terms of Service without the prior written
                                        consent of the Company.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.17 No Agency */}
                            <div className="policy-section">
                                <h3>1.17. No Agency</h3>
                                <ul>
                                    <li>
                                        (a) Nothing in these Terms of Service shall be construed to create any
                                        partnership, joint venture, agency, or employment relationship between you
                                        and the Company. You have no authority to bind the Company in any manner
                                        whatsoever.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.18 Electronic Communications */}
                            <div className="policy-section">
                                <h3>1.18. Electronic Communications</h3>
                                <ul>
                                    <li>
                                        (a) By using the website, you consent to receiving electronic communications
                                        from the Company. You agree that all agreements, notices, disclosures, and
                                        other communications provided electronically satisfy any legal requirement
                                        that such communications be in writing.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.19 Service Reselling */}
                            <div className="policy-section">
                                <h3>1.19. Service Reselling</h3>
                                <p>
                                    Users may not reproduce, duplicate, copy, sell, resell or exploit any portion of
                                    Eximp and Cloves Infrastructure Ltd and of its Service without the Owner's express prior written
                                    permission, granted either directly or through a legitimate reselling program.
                                </p>
                            </div>

                            {/* 1.20 Service Interruption */}
                            <div className="policy-section">
                                <h3>1.20. Service Interruption</h3>
                                <p>
                                    To ensure the best possible service level, the Owner reserves the right to interrupt the
                                    Service for maintenance, system updates or any other changes, informing the Users
                                    appropriately. Within the limits of law, the Owner may also decide to suspend or
                                    discontinue the Service altogether. If the Service is discontinued, the Owner will
                                    cooperate with Users to enable them to withdraw personal data or information and
                                    will respect Users' rights relating to continued product use and/or compensation, as
                                    provided for by applicable law. Additionally, the Service might not be available due
                                    to reasons outside the Owner's reasonable control, such as "force majeure" events
                                    (infrastructural breakdowns or blackouts etc.).
                                </p>
                            </div>

                            {/* 1.21 Assignment of Contract */}
                            <div className="policy-section">
                                <h3>1.21. Assignment of Contract</h3>
                                <p>
                                    The Owner reserves the right to transfer, assign, dispose of by novation, or subcontract
                                    any or all rights or obligations under these Terms, taking the User's legitimate
                                    interests into account. Provisions regarding changes of these Terms will apply
                                    accordingly.
                                </p>
                                <p>
                                    Users may not assign or transfer their rights or obligations under these Terms in any way,
                                    without the written permission of the Owner.
                                </p>
                            </div>

                            {/* 1.22 Entire Agreement */}
                            <div className="policy-section">
                                <h3>1.22. Entire Agreement</h3>
                                <ul>
                                    <li>
                                        (a) These Terms of Service, together with the Privacy Policy, constitute the
                                        entire agreement between you and Eximp and Cloves Infrastructure Ltd regarding your use
                                        of the website and supersede any prior agreements, understandings, or
                                        arrangements between you and the Company relating to such use.
                                    </li>
                                </ul>
                            </div>

                            {/* 1.23 Contact Information */}
                            <div className="policy-section">
                                <h3>1.23. Contact Information</h3>
                                <ul>
                                    <li>
                                        (a) If you have any questions or comments about these Terms of Service, please
                                        contact us at legal@eximps-cloves.com or through the contact form on our
                                        website. The Company is under no obligation to respond to enquiries within
                                        any specified timeframe.
                                    </li>
                                </ul>
                            </div>

                            <div className="contact-legal">
                                <p>For any questions regarding these terms, please contact us at:</p>
                                <p><strong>Email:</strong> legal@eximps-cloves.com</p>
                                <p><strong>Address:</strong> 57B, Isaac John street, Yaba, Lagos, Nigeria</p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default Terms;
