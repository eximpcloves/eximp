import React, { useEffect } from 'react';
import Reveal from '../components/Reveal';
import '../styles/privacy.css';

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <section className="privacy-hero">
                <div className="container">
                    <Reveal>
                        <h1>Website Privacy Policy</h1>
                        <p className="subtitle">Last Updated: February 18, 2024</p>
                    </Reveal>
                </div>
            </section>

            <section className="privacy-content">
                <div className="container narrow-container">
                    <Reveal delay={0.2}>
                        <div className="legal-document">
                            <p className="intro">
                                This privacy policy discloses the privacy practices for the website operated by Eximp and Cloves Infrastructure Ltd and
                                applies solely to information collected by this website and to all users of the Company's website, including
                                visitors who browse the site, individuals who submit inquiries or contact forms, clients who engage the
                                Company's services, and any other persons whose Personal Data is processed through the website.
                            </p>

                            <p>
                                By accessing, browsing, or using the Company's website in any manner, users acknowledge that they have
                                read, understood, and agree to be bound by the terms of this Privacy Policy.
                            </p>

                            <div className="policy-section">
                                <p>This Policy governs the processing of Personal Data collected through:</p>
                                <ul>
                                    <li>(a) Direct interactions with the website, including contact forms, inquiry submissions, and service requests.</li>
                                    <li>(b) Automatic data collection through Cookies, web analytics, and similar tracking technologies.</li>
                                    <li>(c) Communications with the Company via email, telephone, or other channels initiated through the website.</li>
                                </ul>
                                <p>
                                    This Privacy Policy does not apply to third-party websites, services, or platforms that may be linked to or
                                    accessible through the Company's website, and users access such external sites at their own risk.
                                </p>
                                <p>
                                    The Company reserves the right to update this Privacy Policy periodically, and continued use of the website
                                    following any modifications constitutes acceptance of the revised policy terms.
                                </p>
                            </div>

                            <div className="policy-section">
                                <h3>2. Data Collection</h3>
                                <p>
                                    2.1. The Company collects personal data from website users only when users voluntarily provide such
                                    information by filling out a contact form or subscribing to the Company's newsletter. The website
                                    does not otherwise store user data, and all other data collection (such as cookies and analytics) is
                                    handled by the third-party platform hosting the website.
                                </p>
                                <p>2.2. Types of Personal Data Collected through contact forms and newsletter subscriptions:</p>
                                <ul>
                                    <li>(a) Contact information, including full names, email addresses, telephone numbers, and postal
                                        addresses provided through contact forms, inquiry submissions, or direct communications.</li>
                                    <li>(b) Professional information, such as company names, job titles, business addresses, and
                                        industry details when provided in connection with commercial inquiries or service requests.</li>
                                    <li>(c) Communication records include inquiry details, correspondence history, service
                                        preferences, and feedback provided through various communication channels.</li>
                                    <li>(d) Marketing preferences and consent records, including subscription preferences for
                                        newsletters, promotional materials, and communication frequency selections.</li>
                                </ul>
                                <p>2.3. Methods of Data Collection:</p>
                                <ul>
                                    <li>(a) Direct collection through the website's contact form and newsletter subscription form, where
                                        users voluntarily submit their information.</li>
                                    <li>(b) Automatic data collection through cookies, web beacons, and similar tracking technologies
                                        is handled by the third-party platform hosting the website and is subject to that platform's
                                        privacy practices.</li>
                                    <li>(c) Third-party analytics services, where applicable, are managed by the website hosting
                                        platform.</li>
                                    <li>(d) Email communications and phone conversations initiated by users or conducted in response
                                        to user inquiries, with records maintained for service delivery and quality assurance
                                        purposes.</li>
                                    <li>(e) Social media interactions when users engage with the Company's social media accounts or
                                        share website content through social media platforms.</li>
                                </ul>
                                <p>
                                    2.4. The Company does not collect sensitive personal data, including information relating to health,
                                    religion, political opinions, trade union membership, or biometric data.
                                </p>
                                <p>
                                    2.5. All data collection activities are conducted with appropriate notice to users, with clear information
                                    provided about the types of data being collected and the purposes for collection before any data is
                                    processed.
                                </p>
                            </div>

                            <div className="policy-section">
                                <h3>3. Purpose of Data Processing</h3>
                                <p>
                                    The Company processes personal data collected through its Website for the following primary
                                    purposes, which are necessary for the effective operation of its real estate business and the provision
                                    of services to clients and prospective clients.
                                </p>
                                <h4>3.1. Inquiry Response and Communication</h4>
                                <ul>
                                    <li>(a) To respond to inquiries submitted through contact forms, email, or other communication
                                        channels available on the Website.</li>
                                    <li>(b) To provide information about the Company's real estate services, properties, and investment
                                        opportunities.</li>
                                    <li>(c) To maintain ongoing communication with prospective and existing clients regarding their
                                        property interests and requirements.</li>
                                </ul>
                                <h4>3.2. Service Provision and Contract Performance</h4>
                                <ul>
                                    <li>(a) To provide real estate services, including property sales, purchases, leasing, property
                                        management, and investment advisory services.</li>
                                    <li>(b) To perform contractual obligations arising from agreements entered into with clients.</li>
                                    <li>(c) To conduct property valuations, market analysis, and due diligence activities as required for
                                        client transactions.</li>
                                </ul>
                                <h4>3.3. Marketing and Business Development</h4>
                                <ul>
                                    <li>(a) To send marketing communications about new properties, market updates, and promotional
                                        offers to individuals who have consented to receive such communications.</li>
                                    <li>(b) To conduct market research and analysis to improve service offerings and identify business
                                        opportunities.</li>
                                    <li>(c) To maintain client relationship management systems for business development purposes.</li>
                                </ul>
                                <h4>3.4. Website Functionality and User Experience</h4>
                                <ul>
                                    <li>(a) To operate, maintain, and improve the Website's functionality, security, and user experience.</li>
                                    <li>(b) To analyze Website usage patterns and user behavior to enhance content and navigation.</li>
                                    <li>(c) To implement security measures and prevent fraudulent activities or unauthorized access to
                                        the Website.</li>
                                </ul>
                                <h4>3.5. Legal and Regulatory Compliance</h4>
                                <ul>
                                    <li>(a) To comply with legal obligations under Nigerian law, including tax reporting, anti-money
                                        laundering requirements, and regulatory reporting to relevant authorities.</li>
                                    <li>(b) To respond to lawful requests from government authorities, courts, or regulatory bodies.</li>
                                    <li>(c) To establish, exercise, or defend legal claims and protect the Company's legitimate business
                                        interests.</li>
                                </ul>
                                <h4>3.6. Record Keeping and Administration</h4>
                                <ul>
                                    <li>(a) To maintain accurate business records and client files in accordance with professional and
                                        legal requirements.</li>
                                    <li>(b) To conduct internal audits, quality assurance, and compliance monitoring activities.</li>
                                    <li>(c) To facilitate business continuity and disaster recovery procedures.</li>
                                </ul>
                            </div>

                            <div className="policy-section">
                                <h3>4. Lawful Basis for Processing</h3>
                                <p>4.1. The Company processes personal data only where it has a lawful basis to do so under relevant Nigerian Data Protection laws and regulations.</p>
                                <h4>4.2. Consent</h4>
                                <ul>
                                    <li>(a) For this Policy, Consent means any indication of agreement by a Data Subject to the
                                        processing of their Personal Data, which may be given through a statement, affirmative
                                        action, or continued use of the Company's services or Website after being informed of this
                                        Policy.</li>
                                    <li>(b) The Company may process personal data where the data subject has given clear, specific,
                                        and informed consent to the processing of their personal data for one or more specified
                                        purposes.</li>
                                    <li>(c) Data subjects have the right to withdraw their consent at any time without affecting the
                                        lawfulness of processing based on consent before its withdrawal.</li>
                                </ul>
                                <h4>4.3. Contractual Necessity</h4>
                                <ul>
                                    <li>(a) The Company may process personal data where processing is necessary for the performance
                                        of a contract to which the data subject is party or in order to take steps at the request of the
                                        data subject prior to entering into a contract.</li>
                                    <li>(b) This includes processing necessary to provide real estate services, respond to service
                                        inquiries, and fulfill contractual obligations to clients.</li>
                                </ul>
                                <h4>4.4. Legal Obligation</h4>
                                <ul>
                                    <li>(a) The Company may process personal data where processing is necessary for compliance with
                                        a legal obligation to which the Company is subject under Nigerian law.</li>
                                    <li>(b) This includes compliance with tax obligations, anti-money laundering requirements,
                                        regulatory reporting, and other statutory obligations applicable to real estate businesses in
                                        Nigeria.</li>
                                </ul>
                                <h4>4.5. Court Order or Lawful Authorization</h4>
                                <ul>
                                    <li>(a) The Company may process personal data where required by a court order, warrant, or other
                                        lawful authorization from competent Nigerian authorities.</li>
                                    <li>(b) Such processing will be limited to the scope and purpose specified in the relevant court order
                                        or authorization.</li>
                                </ul>
                                <h4>4.6. Legitimate Interests</h4>
                                <ul>
                                    <li>(a) The Company may process personal data where processing is necessary for legitimate
                                        interests pursued by the Company, except where such interests are overridden by the
                                        interests or fundamental rights and freedoms of the data subject.</li>
                                    <li>(b) Legitimate interests include: operating and improving the Company's website and digital
                                        services; conducting business development and marketing activities; preventing fraud and
                                        ensuring network and information security; managing customer relationships and providing
                                        customer support; and internal administrative purposes and record-keeping.</li>
                                    <li>(c) The Company will conduct balancing tests to ensure that legitimate interests do not override
                                        the rights and freedoms of data subjects.</li>
                                </ul>
                                <h4>4.7. Vital Interests</h4>
                                <p>(a) The Company may process personal data where processing is necessary to protect the vital interests of the data subject or another person.</p>
                            </div>

                            <div className="policy-section">
                                <h3>5. Data Storage and Security</h3>
                                <p>5.1. The Company implements appropriate measures to ensure the security of Personal Data collected
                                    through contact forms and newsletter subscriptions. Data submitted through these forms is securely
                                    transmitted by Google to a designated spreadsheet for storage and processing.</p>
                                <h4>5.2. Technical Security Measures currently in place include:</h4>
                                <ul>
                                    <li>(a) Secure transmission of Personal Data via Google's infrastructure, which employs industry-
                                        standard encryption protocols for data in transit and at rest.</li>
                                    <li>(b) Secure server infrastructure provided by Google and the website hosting platform, including
                                        firewalls, intrusion detection systems, and regular security monitoring maintained by those
                                        third-party providers.</li>
                                    <li>(c) Access controls requiring unique user credentials, multi-factor authentication, and role-
                                        based access permissions are planned for future implementation as the Company's data
                                        processing activities expand.</li>
                                    <li>(d) Regular software updates, security patches, and vulnerability assessments are managed by
                                        Google and the website hosting platform as part of their service offerings.</li>
                                    <li>(e) Secure backup procedures with encrypted data storage are provided by Google's
                                        infrastructure for all data stored in the designated spreadsheet.</li>
                                </ul>
                                <h4>5.3. Organizational Security Measures include:</h4>
                                <ul>
                                    <li>(a) Staff training programs on data protection principles, security protocols, and confidentiality
                                        obligations.</li>
                                    <li>(b) Confidentiality agreements for all employees and contractors with access to Personal Data.</li>
                                    <li>(c) Clear data handling procedures and protocols for the collection, processing, storage, and
                                        disposal of Personal Data.</li>
                                    <li>(d) Incident response procedures for addressing security breaches or suspected unauthorized
                                        access.</li>
                                </ul>
                                <p>5.4. Access to Personal Data stored in Google spreadsheets is currently limited to authorized Company
                                    personnel. As the Company's operations grow, formal access controls with unique user credentials
                                    and role-based permissions will be implemented.</p>
                                <p>5.5. Google acts as a Data Processor for the Company in respect of data collected through contact forms
                                    and newsletter subscriptions. The website hosting platform also acts as a Data Processor for any data
                                    collected through cookies and analytics. Both processors are required to implement appropriate
                                    security measures under their respective terms of service and privacy policies.</p>
                            </div>

                            <div className="policy-section">
                                <h3>6. Data Retention</h3>
                                <p>6.1. The Company shall retain Personal Data only for as long as necessary to fulfil the purposes for which
                                    it was collected and processed, in accordance with Nigerian data protection laws and legitimate
                                    business requirements.</p>
                                <p>6.2. Client-Related Information, including property inquiries, transaction records, communication logs,
                                    and service delivery data, shall be retained for as long as is required or until consent is withdrawn.</p>
                                <p>6.3. Marketing and Communications Data, including newsletter subscriptions, promotional materials
                                    preferences, and general inquiries, may be retained for as long as necessary or until consent is
                                    withdrawn, whichever occurs earlier.</p>
                                <p>6.4. Legal and Compliance Records, including data processed for legal obligations, court orders, or
                                    regulatory requirements, shall be retained for the period as is necessary to comply with such
                                    regulations or to reach a conclusive resolution of a legal matter or dispute.</p>
                                <p>6.5. Personal Data may be retained beyond the specified periods where required by Nigerian law or court
                                    order; necessary for the establishment, exercise, or defence of legal claims; where the Data Subject
                                    has provided explicit consent for extended retention; or where it is required for archiving purposes in
                                    the public interest or scientific research, subject to appropriate safeguards.</p>
                                <p>6.6. Upon expiry of the applicable retention period, Personal Data shall be deleted, destroyed, or
                                    anonymized unless retention is required by any clause of this policy or as permitted by the data
                                    subject.</p>
                                <p>6.7. The Company shall maintain records of data retention schedules and disposal activities to
                                    demonstrate compliance with this Policy and Nigerian data protection regulations.</p>
                                <p>6.8. Data Subjects may request information about the retention period applicable to their Personal Data
                                    by contacting the Company using the details provided in this Policy.</p>
                            </div>

                            <div className="policy-section">
                                <h3>7. Third-Party Sharing</h3>
                                <p>7.1. The Company may share personal data with third parties only in accordance with this Policy and
                                    applicable Nigerian data protection laws, ensuring that appropriate safeguards and contractual
                                    arrangements are in place to protect data subjects' rights.</p>
                                <h4>7.2. Legal Authorities and Regulatory Bodies</h4>
                                <ul>
                                    <li>(a) Personal data may be disclosed to Nigerian courts, law enforcement agencies, regulatory
                                        authorities, and other governmental bodies when required by law, court order, or lawful
                                        authorization.</li>
                                    <li>(b) Such disclosures include compliance with judicial orders, regulatory investigations, tax and
                                        compliance obligations, and statutory reporting requirements under Nigerian law.</li>
                                </ul>
                                <h4>7.3. Service Providers and Business Partners</h4>
                                <ul>
                                    <li>(a) The Company engages Google as a third-party service provider for secure data transmission
                                        and storage of contact form and newsletter subscription data. The website hosting platform
                                        provides website hosting, analytics, and cookie management services.</li>
                                    <li>(b) Real estate transaction facilitators, including banks, mortgage providers, legal practitioners,
                                        surveyors, and property valuers, may receive personal data necessary to complete property
                                        transactions.</li>
                                    <li>(c) Marketing and communication service providers may process personal data for the purpose
                                        of delivering promotional materials and communications with appropriate consent.</li>
                                </ul>
                                <h4>7.4. Professional Advisors</h4>
                                <ul>
                                    <li>(a) Personal data may be shared with legal counsel, auditors, consultants, accountants, and other
                                        professional advisors for the purpose of obtaining professional services and ensuring
                                        regulatory compliance.</li>
                                    <li>(b) Such sharing is based on legitimate interests and professional confidentiality obligations.</li>
                                </ul>
                                <h4>7.5. Business Transfers</h4>
                                <ul>
                                    <li>(a) In the event of a merger, acquisition, reorganization, or sale of assets, personal data may be
                                        transferred to the acquiring entity or successor organization.</li>
                                    <li>(b) Data subjects will be notified of any such transfer and their rights regarding transferred data.</li>
                                    <li>(c) The Company shall ensure that appropriate data protection safeguards, including
                                        confidentiality agreements and security measures, are implemented throughout any business
                                        transfer process to protect Personal Data from unauthorized access, disclosure, or misuse
                                        during the transition period.</li>
                                </ul>
                                <h4>7.6. Data Processors</h4>
                                <ul>
                                    <li>(a) The Company may engage Data Processors to process personal data on its behalf, subject to
                                        written agreements that ensure compliance with Nigerian data protection requirements.</li>
                                    <li>(b) All Data Processors are contractually obligated to implement appropriate technical and
                                        organizational security measures and process data only in accordance with the Company's
                                        instructions.</li>
                                </ul>
                                <h4>7.7. Emergency Situations</h4>
                                <ul>
                                    <li>(a) Personal data may be disclosed without consent where necessary to protect the vital interests
                                        of data subjects or other individuals in emergencies.</li>
                                    <li>(b) Such disclosures will be limited to the minimum necessary and will be documented and
                                        reported as required by law.</li>
                                </ul>
                                <h4>7.8. Consent-Based Sharing</h4>
                                <ul>
                                    <li>(a) Personal data may be shared with other parties where explicit consent has been obtained
                                        from the data subject for specific purposes.</li>
                                    <li>(b) Consent may be withdrawn at any time, and such withdrawal will be processed in
                                        accordance with this policy.</li>
                                </ul>
                                <p>7.9. The Company ensures that all third parties receiving personal data are bound by appropriate
                                    confidentiality obligations and data protection requirements equivalent to those set out in this Policy.</p>
                                <p>7.10. Data subjects have the right to request information about specific third-party sharing arrangements
                                    and may object to such sharing where legally permissible under Nigerian law.</p>
                            </div>

                            <div className="policy-section">
                                <h3>8. Data Breach Notification</h3>
                                <p>8.1. The Company shall establish and maintain comprehensive procedures for detecting, investigating,
                                    and responding to personal data breaches in accordance with the Nigeria Data Protection Regulation
                                    2019 and applicable Nigerian law.</p>
                                <p>8.2. For this Policy, a data breach means any breach of security leading to the accidental or unlawful
                                    destruction, loss, alteration, unauthorized disclosure of, or access to personal data transmitted, stored,
                                    or otherwise processed by the Company.</p>
                                <h4>8.3. Upon becoming aware of a personal data breach, the Company shall:</h4>
                                <ul>
                                    <li>(a) Immediately conduct an initial assessment to determine the nature, scope, and potential
                                        impact of the breach within twenty-four (24) hours of discovery.</li>
                                    <li>(b) Implement immediate containment measures to prevent further unauthorized access,
                                        disclosure, or loss of personal data.</li>
                                    <li>(c) Document all relevant details of the breach, including the circumstances of occurrence,
                                        categories and approximate number of data subjects affected, categories and approximate
                                        number of personal data records affected, and measures taken or proposed to address the
                                        breach.</li>
                                </ul>
                                <p>8.4. Where the personal data breach is likely to result in a high risk to the rights and freedoms of data
                                    subjects, the Company shall notify the affected individuals without undue delay and, where feasible,
                                    within seventy-two (72) hours of becoming aware of the breach.</p>
                                <h4>8.5. The notification to affected data subjects shall be communicated in clear and plain language and shall include:</h4>
                                <ul>
                                    <li>(a) The nature of the personal data breach and categories of data affected.</li>
                                    <li>(b) The contact details of the Company's Data Protection Officer or designated contact point for
                                        further information.</li>
                                    <li>(c) The likely consequences of the personal data breach and measures taken or proposed to
                                        address the breach and mitigate its adverse effects.</li>
                                    <li>(d) Recommendations for actions that affected individuals can take to protect themselves from
                                        potential harm.</li>
                                </ul>
                                <p>8.6. The Company shall maintain a comprehensive record of all personal data breaches, which shall be made available to NITDA upon request.</p>
                                <p>8.7. Following a data breach, the Company shall conduct a thorough post-incident review to identify the
                                    root cause and implement additional security measures.</p>
                                <p>8.8. The Company may engage qualified third-party forensic specialists or legal counsel to assist in breach
                                    investigation and response.</p>
                                <p>8.9. All employees and contractors shall be required to immediately report any suspected or actual breaches.</p>
                            </div>

                            <div className="policy-section">
                                <h3>9. International Data Transfers</h3>
                                <p>9.1. The Company may transfer Personal Data outside Nigeria only in circumstances where such transfer
                                    is necessary for the provision of real estate services, compliance with legal obligations, or legitimate
                                    business operations.</p>
                                <p>9.2. Any international transfer of Personal Data shall be conducted in accordance with the NDPR and
                                    other applicable Nigerian data protection laws, ensuring adequate protection for the rights and
                                    freedoms of Data Subjects.</p>
                                <p>9.3. The Company shall ensure that international data transfers are made only to countries or territories
                                    that provide adequate levels of data protection as determined by NITDA or other competent Nigerian
                                    authorities.</p>
                                <p>9.4. Where transfers are made to countries without an adequacy decision, the Company shall implement
                                    appropriate safeguards, including standard contractual clauses approved by NITDA or other
                                    competent authorities; binding corporate rules where transfers occur within a corporate group; codes
                                    of conduct or certification mechanisms that provide appropriate guarantees; and specific
                                    authorization from NITDA, where required by law.</p>
                                <p>9.5. Data Subjects have the right to be informed of any international transfers of their Personal Data and
                                    may object to such transfers in accordance with their rights under Nigerian data protection law.</p>
                                <p>9.6. The Company maintains records of all international data transfers, including details of recipient
                                    countries, purposes of transfer, categories of Personal Data transferred, and safeguards implemented.</p>
                                <p>9.7. Where Personal Data is transferred to third-party processors outside Nigeria, the Company shall
                                    ensure such processors provide sufficient guarantees regarding data security measures.</p>
                                <p>9.8. The Company shall immediately notify NITDA of any international data transfers that may pose risks
                                    to the rights and freedoms of Nigerian Data Subjects, in accordance with applicable notification
                                    requirements.</p>
                            </div>

                            <div className="policy-section">
                                <h3>10. Complaints and Dispute Resolution</h3>
                                <p>10.1. Any individual who believes that the Company has processed their Personal Data in violation of this
                                    Privacy Policy or applicable Nigerian data protection laws may lodge a complaint through the
                                    procedures outlined in this section.</p>
                                <h4>10.2. Internal complaints should be submitted in writing to the Company's designated Data Protection Officer:</h4>
                                <ul>
                                    <li>(a) Complaints may be submitted via email, postal mail, or in person during business hours.</li>
                                    <li>(b) All complaints must include the complainant's name, contact information, details of the
                                        alleged violation, and any supporting documentation.</li>
                                    <li>(c) Anonymous complaints will be accepted, but may limit the Company's ability to investigate
                                        and respond effectively.</li>
                                </ul>
                                <p>10.3. The Company will acknowledge receipt of complaints within five (5) working days of receipt and
                                    provide an initial response within twenty-one (21) days.</p>
                                <p>10.4. The Company will conduct a thorough investigation of all complaints, which may include reviewing
                                    relevant records, interviewing personnel, and consulting with legal advisors as necessary.</p>
                                <p>10.5. Upon completion of the investigation, the Company will provide a written response to the
                                    complainant outlining the findings, any corrective actions taken, and available remedies.</p>
                                <p>10.6. The Company will maintain records of all complaints received, investigations conducted, and
                                    resolutions provided for a minimum period of seven (7) years in compliance with regulatory
                                    requirements.</p>
                                <p>10.7. No individual will face retaliation, discrimination, or adverse consequences for lodging a complaint
                                    in good faith regarding data protection concerns.</p>
                            </div>

                            <div className="policy-section">
                                <h3>11. Governing Law and Jurisdiction</h3>
                                <p>11.1. This Privacy Policy and all matters arising from or relating to the collection, processing, storage, and
                                    protection of personal data by the Company shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.</p>
                                <p>11.2. Any disputes, claims, or proceedings arising from or in connection with this Privacy Policy, the
                                    Company's data processing activities, or the exercise of data subject rights shall be subject to the
                                    exclusive jurisdiction of the courts of the Federal Republic of Nigeria.</p>
                                <p>11.3. Where international data transfers are involved, Nigerian law shall take precedence in determining
                                    the lawfulness and adequacy of such transfers and protective measures implemented by the Company.</p>
                                <p>11.4. This Privacy Policy shall be interpreted in accordance with Nigerian legal principles and practices.</p>
                            </div>

                            <div className="policy-section">
                                <h3>12. Updates</h3>
                                <p>12.1. Our Privacy Policy may change from time to time and all updates will be posted on this page. We
                                    reserve the right to modify this Privacy Policy at any time to reflect changes in business practices,
                                    legal requirements, or regulatory guidance under Nigerian data protection law.</p>
                                <p>12.2. The effective date of any amendment shall be clearly stated in the updated Privacy Policy.</p>
                            </div>

                            <div className="contact-legal">
                                <p>For any questions regarding this policy, please contact us at:</p>
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

export default Privacy;
