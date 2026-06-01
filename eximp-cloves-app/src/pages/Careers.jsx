import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ArrowRight, Upload, FileText, Search, X, MapPin, Clock, Check, ChevronDown, ChevronUp, Send, HelpCircle, Info, CheckCircle2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import '../styles/careers.css';

const Careers = () => {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState({ submitting: false, success: false, error: null });
    const [expandedRoleId, setExpandedRoleId] = useState(null);
    const fileInputRef = useRef(null);
    const formContainerRef = useRef(null);

    const [formData, setFormData] = useState({
        role: '',
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        message: '',
        fileName: '',
        mimeType: '',
        fileData: '' // base64 string
    });

    // We'll submit to our backend API
    const API_BASE = 'https://app.eximps-cloves.com/api/hr/recruitment';

    /*
    ### Detailed Job Descriptions

| Role | About the Role | Requirements |
| :--- | :--- | :--- |
| **Real Estate Consultant** | Guide clients through the complexities of property investment. You will be responsible for identifying high-yield opportunities and building long-term wealth strategies for our investors. | 3+ years in real estate sales, strong understanding of the Nigerian property market, excellent negotiation skills. |
| **Digital Marketing Specialist** | Drive our digital presence and lead generation. You will manage multi-channel campaigns, optimize SEO, and leverage analytics to grow our brand visibility. | Proven track record in performance marketing, proficiency in Google Ads/Meta Ads, experience with CRM tools. |
| **Desk Officer** | The professional face of Eximp & Cloves. You will manage office logistics, handle visitor inquiries, and ensure seamless administrative operations. | Excellent communication skills, proficiency in Microsoft Office, 2+ years in corporate administration. |
| **Sales Manager** | Lead and mentor our sales team to achieve aggressive targets. You will develop sales strategies, build institutional partnerships, and close high-value deals. | 5+ years in leadership roles, proven sales track record, strategic thinking, and team management expertise. |
| **Sales Associate** | The engine of our sales growth. You will conduct property tours, follow up on leads, and provide exceptional on-the-ground support to potential buyers. | Highly motivated, excellent interpersonal skills, ability to work in a fast-paced environment. |
| **Business Manager** | Overlook strategic business units and drive organizational efficiency. You will identify expansion opportunities and ensure sustainable business growth. | Degree in Business Admin or related field, 5+ years in management, strong financial literacy. |
| **Customer Support** | Ensure our clients feel valued and supported at every stage. You will manage post-sales queries, client onboarding, and relationship maintenance. | Empathy-driven, strong problem-solving skills, experience in customer success or CRM. |
| **Content Creator** | Build the Eximp & Cloves brand through visual storytelling. You will produce high-quality videos, graphics, and articles that resonate with our audience. | Portfolio of creative work (video/graphic/copy), proficiency in Adobe Suite/Canva, social media savvy. |
| **HR Generalist** | Nurture our greatest asset—our people. You will manage the full talent lifecycle, from recruitment and onboarding to payroll and employee relations. | 3+ years in HR, knowledge of Nigerian Labor Law, strong organizational skills. |

### 1. Careers Page Overhaul
- **6 Detailed Roles**: Added professional descriptions, requirements, and exact salary ranges from the MD's screenshot for active roles:
    - Sales Manager (Price adjusted relative to Associate/Manager)
    - Sales Associate (₦100k - ₦250k + Comm.)
    - Business Manager (₦300k - ₦600k)
    - Customer Support (₦80k - ₦150k)
    - Content Creator (₦120k - ₦250k)
    - HR Generalist (₦150k - ₦300k)
- **Expandable UI**: Implemented an "Expand Details" interaction that reveals role specifics without leaving the page.
- **Salary Badges**: Added premium-styled salary badges with exact figures.
- **Selection Logic**: Users can now select their preferred role directly from the details view, which then pre-fills the application form.

### 2. Office Address & Map Update
- **Address Update**: Updated the address to `57B, Isaac John street, Yaba, Lagos` in:
    - [x] `Footer.jsx`
    - [x] `Contact.jsx`
    - [x] `Terms.jsx`
    - [x] `Privacy.jsx`
- **Google Map**: Re-embedded the Google Map in the Contact page, now accurately pinned to the new Yaba location.

## Verification Results

### Careers Page
- [x] All 6 active roles display correctly with precise salary data.
- [x] Expanding a role reveals About, Tasks, Requirements, and Salary sections.
- [x] "Select this Role" button works and provides visual feedback.
- [x] Responsive design verified on mobile and desktop.

### Address & Map
- [x] Contact page reflects the new address.
- [x] Google Map iframe loads and pins the new office.
- [x] Disclaimer/Legal pages (Terms & Privacy) have the correct contact address.

---
![Careers Page Details](/images/careers-page-details.png)
*Example of the expanded role details UI.*
*/
    const [openPositions, setOpenPositions] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);

    React.useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${API_BASE}/jobs?is_internal=false`);
                if (res.ok) {
                    const data = await res.json();
                    const formatted = data.filter(j => j.status === 'Open' || j.status === 'Approved').map(j => ({
                        id: j.id,
                        title: j.title,
                        type: j.employment_type || 'Full-time',
                        location: j.location || 'Lagos, Nigeria',
                        salary: j.salary_range || 'Competitive',
                        about: j.description || 'Join our dynamic team and make an impact.',
                        tasks: j.responsibilities ? j.responsibilities.split('\n').filter(t => t.trim() !== '') : (j.description ? j.description.split('\n').filter(t => t.trim() !== '') : ['Execute daily tasks related to the role.', 'Collaborate with cross-functional teams.']),
                        requirements: j.requirements ? j.requirements.split('\n').filter(t => t.trim() !== '') : ['Relevant experience.', 'Strong communication skills.']
                    }));
                    setOpenPositions(formatted);
                }
            } catch (e) {
                console.error("Failed to fetch jobs:", e);
            } finally {
                setLoadingJobs(false);
            }
        };
        fetchJobs();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to 5MB for base64 upload to Apps Script safely)
            if (file.size > 5 * 1024 * 1024) {
                setStatus({ ...status, error: "File size must be under 5MB." });
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                // event.target.result looks like: "data:application/pdf;base64,JVBERi0xLjQK..."
                const base64Data = event.target.result.split(',')[1];
                setFormData({
                    ...formData,
                    fileName: file.name,
                    mimeType: file.type || 'application/octet-stream',
                    fileData: base64Data
                });
                setStatus({ ...status, error: null });
            };
            reader.onerror = () => {
                setStatus({ ...status, error: "Error reading file." });
            };
            // Read as Data URL to get base64 string
            reader.readAsDataURL(file);
        }
    };

    const clearFile = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
        setFormData({ ...formData, fileName: '', mimeType: '', fileData: '' });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setStatus({ ...status, submitting: true, error: null });

        if (!formData.name || !formData.email || !formData.role) {
            setStatus({ submitting: false, success: false, error: "Please fill in all required fields." });
            return;
        }

        if (!formData.fileData) {
            setStatus({ submitting: false, success: false, error: "Please upload your CV." });
            return;
        }

        try {
            const jobMatch = openPositions.find(p => p.title === formData.role);
            const payload = {
                job_id: jobMatch ? jobMatch.id : null,
                candidate_name: formData.name,
                candidate_email: formData.email,
                candidate_phone: formData.phone,
                resume_url: formData.fileData ? `data:${formData.mimeType};base64,${formData.fileData}` : (formData.portfolio || ''),
                cover_letter: formData.message,
                status: 'Applied'
            };

            const res = await fetch(`${API_BASE}/applications`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus({ submitting: false, success: true, error: null });
            } else {
                throw new Error("Failed response");
            }
        } catch (error) {
            console.error("Form error:", error);
            setStatus({ submitting: false, success: false, error: "Something went wrong sending your application. Please try again." });
        }
    };

    const scrollToFormTop = () => {
        if (formContainerRef.current) {
            // Slight delay to allow animation to start before calculating position
            setTimeout(() => {
                formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const nextStep = () => {
        if (step === 1 && !formData.role) {
            setStatus({ ...status, error: "Please select a position to apply for." });
            return;
        }
        setStatus({ ...status, error: null });
        setStep(s => s + 1);
        scrollToFormTop();
    };

    const prevStep = () => {
        setStatus({ ...status, error: null });
        setStep(s => s - 1);
        scrollToFormTop();
    };

    return (
        <div className="careers-page-portal">
            {/* 1. Hero Section */}
            <section className="careers-hero" style={{ backgroundImage: "url('/about_hero_background.png')" }}>
                <div className="overlay-gradient"></div>
                <div className="container">
                    <Reveal>
                        <div className="hero-content-centered">
                            <span className="hero-label">Careers at Eximp & Cloves</span>
                            <h1>Build Your Career in Real Estate</h1>
                            <p>Join a dynamic team committed to shaping the future of real estate investment and generational wealth in Nigeria.</p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <div className="container careers-main-layout">
                {/* 2. Culture & Perks Section */}
                <section className="culture-section section-lg">
                    <Reveal>
                        <div className="section-header-small">
                            <h2>Why Join Us?</h2>
                            <p>We believe in nurturing talent, providing growth opportunities, and rewarding hard work.</p>
                        </div>
                    </Reveal>
                    <div className="perks-grid">
                        <Reveal delay={0.1}>
                            <div className="perk-card">
                                <div className="perk-icon">🚀</div>
                                <h3>Career Growth</h3>
                                <p>Continuous training and clear paths for advancement in a fast-growing industry.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="perk-card">
                                <div className="perk-icon">💰</div>
                                <h3>Competitive Compensation</h3>
                                <p>Attractive base pay combined with one of the best commission structures in the market.</p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="perk-card">
                                <div className="perk-icon">🤝</div>
                                <h3>Collaborative Culture</h3>
                                <p>Work alongside experienced professionals in a supportive, team-oriented environment.</p>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <div className="careers-content-split">
                    {/* Left: Application Form */}
                    <div className="form-column">
                        <Reveal delay={0.4} x={-20}>
                            <div className="application-card premium-shadow" id="apply" ref={formContainerRef} style={{ scrollMarginTop: '80px' }}>
                                <div className="card-header">
                                    <h3>Submit Your Application</h3>
                                    <p>Take the next step in your career journey.</p>
                                </div>

                                <div className="step-indicator">
                                    <span className={step >= 1 ? 'active' : ''}>1</span>
                                    <div className="line"></div>
                                    <span className={step >= 2 ? 'active' : ''}>2</span>
                                    <div className="line"></div>
                                    <span className={step >= 3 ? 'active' : ''}>3</span>
                                </div>

                                <AnimatePresence mode="wait">
                                    {/* STEP 1: Select Role */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="step-content"
                                        >
                                            <h4 className="step-title">Select Position</h4>
                                            {status.error && <p className="error-text" style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '1rem' }}>{status.error}</p>}

                                            <div className="role-grid">
                                                {loadingJobs ? (
                                                    <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                                                        Loading active job openings...
                                                    </div>
                                                ) : openPositions.length === 0 ? (
                                                    <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
                                                        <Briefcase size={32} style={{ marginBottom: "12px", opacity: 0.5 }} />
                                                        <p>No open positions right now.</p>
                                                    </div>
                                                ) : openPositions.map(pos => (
                                                    <div
                                                        key={pos.id}
                                                        className={`role-item ${formData.role === pos.title ? 'active-selection' : ''} ${expandedRoleId === pos.id ? 'is-expanded' : ''}`}
                                                    >
                                                        <div className="role-main-info" onClick={() => setExpandedRoleId(expandedRoleId === pos.id ? null : pos.id)}>
                                                            <div className="role-header">
                                                                <h4>{pos.title}</h4>
                                                                <Briefcase size={20} className="role-icon" />
                                                            </div>
                                                            <div className="role-meta">
                                                                <span className="badge-type">{pos.type}</span>
                                                                <span className="badge-loc">{pos.location}</span>
                                                                <span className="badge-salary">{pos.salary}</span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="view-details-btn"
                                                            >
                                                                {expandedRoleId === pos.id ? 'Close Details' : 'View Details'}
                                                            </button>
                                                        </div>

                                                        <AnimatePresence>
                                                            {expandedRoleId === pos.id && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="role-details-expanded"
                                                                >
                                                                    <div className="details-content">
                                                                        <div className="details-section">
                                                                            <h5>About the Role</h5>
                                                                            <p>{pos.about}</p>
                                                                        </div>

                                                                        <div className="details-grid">
                                                                            <div className="details-section">
                                                                                <h5>What You'll Do</h5>
                                                                                <ul>
                                                                                    {pos.tasks.map((task, idx) => <li key={idx}>{task}</li>)}
                                                                                </ul>
                                                                            </div>
                                                                            <div className="details-section">
                                                                                <h5>What We Look For</h5>
                                                                                <ul>
                                                                                    {pos.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
                                                                                </ul>
                                                                            </div>
                                                                        </div>

                                                                        <div className="details-actions">
                                                                            <button
                                                                                type="button"
                                                                                className={`btn-apply-selection ${formData.role === pos.title ? 'selected' : ''}`}
                                                                                onClick={() => {
                                                                                    setFormData({ ...formData, role: pos.title });
                                                                                }}
                                                                                style={{
                                                                                    backgroundColor: 'var(--primary-color)',
                                                                                    color: '#000000',
                                                                                    padding: '12px 32px',
                                                                                    borderRadius: '50px',
                                                                                    border: formData.role === pos.title ? '2px solid #ffffff' : 'none',
                                                                                    fontWeight: '700',
                                                                                    cursor: 'pointer',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: '8px',
                                                                                    transition: 'all 0.3s ease',
                                                                                    boxShadow: formData.role === pos.title ? '0 0 25px rgba(255, 157, 66, 0.4)' : 'none',
                                                                                    transform: formData.role === pos.title ? 'scale(1.05)' : 'scale(1)'
                                                                                }}
                                                                            >
                                                                                {formData.role === pos.title ? (
                                                                                    <><Check size={18} /> Selected</>
                                                                                ) : (
                                                                                    'Select this Role'
                                                                                )}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ))}
                                                <div
                                                    className={`role-item open-app-item ${formData.role === 'Open Application' ? 'active-selection' : ''}`}
                                                    onClick={() => setFormData({ ...formData, role: 'Open Application' })}
                                                >
                                                    <div className="role-header">
                                                        <h4>Open Application</h4>
                                                        <Search size={20} className="role-icon" />
                                                    </div>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Don't see a fit? Send us your CV anyway.</p>
                                                    {formData.role === 'Open Application' && <div className="selected-indicator"><CheckCircle2 size={16} /> Selected</div>}
                                                </div>
                                            </div>

                                            <div className="step-actions" style={{ justifyContent: 'flex-end' }}>
                                                <button
                                                    onClick={nextStep}
                                                    className="btn-primary"
                                                    style={{
                                                        backgroundColor: 'var(--primary-color)',
                                                        color: '#000000',
                                                        border: 'none',
                                                        borderRadius: '50px',
                                                        fontWeight: '700',
                                                        padding: '12px 24px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    Continue <ArrowRight size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 2: Upload CV */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="step-content"
                                        >
                                            <h4 className="step-title">Upload your CV</h4>
                                            <p className="step-desc">Required. We accept PDF or Word docs (max 5MB).</p>

                                            <div className={`file-upload-zone ${formData.fileName ? 'has-file' : ''}`}>
                                                {!formData.fileName ? (
                                                    <>
                                                        <Upload size={36} className="upload-icon" />
                                                        <p>Click to attach your resume</p>
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            onChange={handleFileChange}
                                                            accept=".pdf,.doc,.docx"
                                                            className="hidden-file-input"
                                                        />
                                                    </>
                                                ) : (
                                                    <div className="file-preview">
                                                        <FileText size={24} className="file-icon" />
                                                        <span className="filename">{formData.fileName}</span>
                                                        <button type="button" onClick={clearFile} className="clear-file-btn">
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            {status.error && <p className="error-text" style={{ color: '#ff4d4d', fontSize: '0.9rem', marginTop: '0.5rem' }}>{status.error}</p>}

                                            <div className="form-group-react" style={{ marginTop: '1.5rem' }}>
                                                <label>Portfolio or LinkedIn Profile (Optional)</label>
                                                <input
                                                    type="url"
                                                    placeholder="https://linkedin.com/in/..."
                                                    value={formData.portfolio}
                                                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                                />
                                            </div>

                                            <div className="step-actions">
                                                <button onClick={prevStep} className="btn-secondary">Back</button>
                                                <button
                                                    onClick={() => {
                                                        if (formData.fileName) nextStep()
                                                        else setStatus({ ...status, error: 'Please select a file to continue.' })
                                                    }}
                                                    className="btn-primary"
                                                    style={{
                                                        backgroundColor: 'var(--primary-color)',
                                                        color: '#000000',
                                                        border: 'none',
                                                        borderRadius: '50px',
                                                        fontWeight: '700',
                                                        padding: '12px 24px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}
                                                >
                                                    Continue <ArrowRight size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 3: Personal Details */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="step-content"
                                        >
                                            <h4 className="step-title">Your Details</h4>

                                            {status.success ? (
                                                <div className="success-message">
                                                    <CheckCircle2 size={48} color="#25D366" />
                                                    <h3>Application Sent!</h3>
                                                    <p>Thank you for applying to Eximp & Cloves. We have received your CV and will review it shortly. Keep an eye on your email for updates.</p>
                                                    <button
                                                        onClick={() => {
                                                            setStep(1);
                                                            setStatus({ submitting: false, success: false, error: null });
                                                            clearFile();
                                                            setFormData({ role: '', name: '', email: '', phone: '', portfolio: '', message: '', fileName: '', mimeType: '', fileData: '' });
                                                        }}
                                                        className="btn-primary"
                                                        style={{
                                                            marginTop: '1.5rem',
                                                            backgroundColor: 'var(--primary-color)',
                                                            color: '#000000',
                                                            border: 'none',
                                                            borderRadius: '50px',
                                                            fontWeight: '700',
                                                            padding: '12px 32px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            ) : (
                                                <form onSubmit={submitForm}>
                                                    <div className="form-grid-react">
                                                        <div className="form-group-react">
                                                            <label>Full Name <span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                type="text"
                                                                placeholder="John Doe"
                                                                required
                                                                value={formData.name}
                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="form-group-react">
                                                            <label>Phone Number <span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                type="tel"
                                                                placeholder="+234..."
                                                                required
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group-react">
                                                        <label>Email Address <span style={{ color: 'red' }}>*</span></label>
                                                        <input
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            required
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="form-group-react">
                                                        <label>Cover Letter / Additional Note (Optional)</label>
                                                        <textarea
                                                            rows="4"
                                                            placeholder="Let us know why you're a great fit..."
                                                            value={formData.message}
                                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        ></textarea>
                                                    </div>

                                                    {status.error && <p className="error-text" style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '1rem' }}>{status.error}</p>}

                                                    <div className="step-actions">
                                                        <button type="button" onClick={prevStep} className="btn-secondary" disabled={status.submitting}>Back</button>
                                                        <button
                                                            type="submit"
                                                            className="btn-primary"
                                                            style={{
                                                                flex: 1,
                                                                backgroundColor: 'var(--primary-color)',
                                                                color: '#000000',
                                                                border: 'none',
                                                                borderRadius: '50px',
                                                                fontWeight: '700',
                                                                padding: '12px 24px',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            disabled={status.submitting}
                                                        >
                                                            {status.submitting ? 'Submitting Application...' : 'Submit Application'}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Info Graphic/Content */}
                    <div className="sidebar-column">
                        <Reveal delay={0.5} x={20}>
                            <div className="hire-card premium-shadow">
                                <div className="card-image-wrapper">
                                    <img src="/our_vision_image.png" alt="Eximp Team" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
                                </div>
                                <h3>The Hiring Process</h3>
                                <ul className="process-list">
                                    <li>
                                        <div className="step-num">1</div>
                                        <p><strong>Application Review:</strong> We thoroughly review every CV submitted.</p>
                                    </li>
                                    <li>
                                        <div className="step-num">2</div>
                                        <p><strong>Initial Interview:</strong> A brief chat to discuss your background and culture fit.</p>
                                    </li>
                                    <li>
                                        <div className="step-num">3</div>
                                        <p><strong>Final Assessment:</strong> Meeting with the team to dive deeper into your skills.</p>
                                    </li>
                                    <li>
                                        <div className="step-num">4</div>
                                        <p><strong>Offer:</strong> Welcome to the Eximp & Cloves family!</p>
                                    </li>
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
