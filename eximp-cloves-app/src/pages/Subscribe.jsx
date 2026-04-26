import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, FileText, Home, CreditCard, PenTool,
    ChevronRight, ChevronLeft, CheckCircle2, AlertCircle,
    Upload, X, Users
} from 'lucide-react';
import '../styles/subscribe.css';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000';
const AUTOSAVE_KEY = 'ec_subscribe_draft';
const TOTAL_STEPS = 5;

// ─── Occupation list ──────────────────────────────────────────────────────────
const OCCUPATIONS = [
    'Accountant', 'Administrator', 'Architect', 'Artist', 'Banker', 'Businessman/Woman',
    'Chef', 'Civil Engineer', 'Civil Servant', 'Consultant', 'Data Analyst', 'Dentist',
    'Doctor', 'Driver', 'Economist', 'Electrician', 'Engineer', 'Entrepreneur', 'Farmer',
    'Fashion Designer', 'Geologist', 'Graphic Designer', 'Hairstylist', 'Hotelier',
    'Human Resources', 'Interior Decorator', 'IT Specialist', 'Journalist', 'Judge',
    'Lawyer', 'Lecturer', 'Manager', 'Marketing Manager', 'Mason', 'Mechanic', 'Merchant',
    'Military Personnel', 'Musician', 'Nurse', 'Pharmacist', 'Photographer', 'Pilot',
    'Plumber', 'Police Officer', 'Politician', 'Professor', 'Project Manager',
    'Public Servant', 'Quantity Surveyor', 'Real Estate Agent', 'Retiree', 'Sales Executive',
    'Scientist', 'Secretary', 'Security Personnel', 'Software Developer', 'Student',
    'Surgeon', 'Surveyor', 'Tailor', 'Teacher', 'Technician', 'Trader', 'Veterinary Doctor',
    'Writer',
];

const STEP_LABELS = [
    { label: 'Bio-data', icon: User },
    { label: 'Profile', icon: FileText },
    { label: 'KYC', icon: FileText },
    { label: 'Purchase', icon: Home },
    { label: 'Signature', icon: PenTool },
];

// ─── Initial form state ───────────────────────────────────────────────────────
const INITIAL = {
    // Step 1
    title: 'Mr', first_name: '', last_name: '', middle_name: '',
    gender: 'Male', phone: '', email: '', whatsapp_phone: '',
    residential_address: '', marital_status: 'Single', date_of_birth: '',
    nationality: 'Nigerian',
    // Step 2
    occupation: '', source_of_income: '',
    // Step 3
    nin_id_number: '',
    // Step 4
    property_name: '', property_name_other: '',
    plot_size: '500sqm', plot_size_other: '',
    ownership_type: 'sole',
    quantity: '', quantity_other: '',
    deposit_amount: '', payment_duration: 'Outright',
    payment_date: '',
    purchase_purpose: 'For yourself',
    referral_source: '',
    // Step 5 — Next of Kin
    nok_full_name: '', nok_phone: '', nok_email: '',
    nok_occupation: '', nok_relationship: '', nok_address: '',
    // Co-owner
    co_owner_name: '', co_owner_address: '', co_owner_occupation: '',
    co_owner_phone: '', co_owner_email: '',
};

// ─── Helper: file → base64 ────────────────────────────────────────────────────
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────
function StepBar({ current }) {
    return (
        <div className="sub-step-bar">
            {STEP_LABELS.map((s, i) => {
                const n = i + 1;
                const Icon = s.icon;
                const state = n < current ? 'done' : n === current ? 'active' : 'pending';
                return (
                    <React.Fragment key={n}>
                        <div className={`sub-step-item sub-step-${state}`}>
                            <div className="sub-step-circle">
                                {state === 'done' ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                            </div>
                            <span className="sub-step-label">{s.label}</span>
                        </div>
                        {i < STEP_LABELS.length - 1 && (
                            <div className={`sub-step-line ${n < current ? 'done' : ''}`} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

// ─── Error Banner ─────────────────────────────────────────────────────────────
function ErrorBanner({ errors }) {
    if (!errors || errors.length === 0) return null;
    return (
        <div className="sub-error-banner">
            <AlertCircle size={18} />
            <div>
                <p className="sub-error-title">Please complete the following required fields:</p>
                <ul>
                    {errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
            </div>
        </div>
    );
}

// ─── Co-Owner Modal ───────────────────────────────────────────────────────────
function CoOwnerModal({ data, onChange, onSave, onClose }) {
    const [errors, setErrors] = useState([]);

    const handleSave = () => {
        const missing = [];
        if (!data.co_owner_name.trim()) missing.push('Full Name');
        if (!data.co_owner_address.trim()) missing.push('Residential Address');
        if (!data.co_owner_phone.trim()) missing.push('Phone Number');
        if (missing.length > 0) { setErrors(missing); return; }
        setErrors([]);
        onSave();
    };

    return (
        <div className="sub-modal-overlay" onClick={onClose}>
            <motion.div
                className="sub-modal-box"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
            >
                <button className="sub-modal-close" onClick={onClose}><X size={18} /></button>
                <div className="sub-modal-header">
                    <div className="sub-modal-icon"><Users size={20} /></div>
                    <div>
                        <h3>Co-Owner Details</h3>
                        <p>Required for Joint Ownership</p>
                    </div>
                </div>

                {errors.length > 0 && (
                    <div className="sub-error-banner" style={{ marginBottom: '1rem' }}>
                        <AlertCircle size={16} />
                        <div>
                            <p className="sub-error-title">Please fill in the following fields:</p>
                            <ul>{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
                        </div>
                    </div>
                )}

                <div className="sub-form-grid">
                    <div className="sub-field full">
                        <label>Full Name <span className="req">*</span></label>
                        <input type="text" value={data.co_owner_name} onChange={e => onChange('co_owner_name', e.target.value)} placeholder="Co-owner's full name" />
                    </div>
                    <div className="sub-field full">
                        <label>Residential Address <span className="req">*</span></label>
                        <input type="text" value={data.co_owner_address} onChange={e => onChange('co_owner_address', e.target.value)} placeholder="Full home address" />
                    </div>
                    <div className="sub-field full">
                        <label>Occupation</label>
                        <input type="text" value={data.co_owner_occupation} onChange={e => onChange('co_owner_occupation', e.target.value)} placeholder="e.g. Engineer" />
                    </div>
                    <div className="sub-field">
                        <label>Phone Number <span className="req">*</span></label>
                        <input type="tel" value={data.co_owner_phone} onChange={e => onChange('co_owner_phone', e.target.value)} placeholder="+234..." />
                    </div>
                    <div className="sub-field">
                        <label>Email Address</label>
                        <input type="email" value={data.co_owner_email} onChange={e => onChange('co_owner_email', e.target.value)} placeholder="email@example.com" />
                    </div>
                </div>

                <button className="sub-btn-primary full-width" onClick={handleSave}>
                    Save Co-Owner Details
                </button>
            </motion.div>
        </div>
    );
}

// ─── Main Subscribe Page ──────────────────────────────────────────────────────
export default function Subscribe() {
    const [searchParams] = useSearchParams();
    const repId = searchParams.get('rep');

    const [step, setStep] = useState(1);
    const [rep, setRep] = useState(null);
    const [repError, setRepError] = useState(false);
    const [properties, setProperties] = useState([]);
    const [form, setForm] = useState(() => {
        try {
            const saved = localStorage.getItem(AUTOSAVE_KEY);
            return saved ? { ...INITIAL, ...JSON.parse(saved) } : { ...INITIAL };
        } catch {
            return { ...INITIAL };
        }
    });
    const [files, setFiles] = useState({ passport_photo: null, nin_document: null, payment_receipt: null });
    const [passportPreview, setPassportPreview] = useState(null);
    const [errors, setErrors] = useState([]);
    const [showCoOwnerModal, setShowCoOwnerModal] = useState(false);
    const [coOwnerSaved, setCoOwnerSaved] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [occupationSuggestions, setOccupationSuggestions] = useState([]);

    const canvasRef = useRef(null);
    const signaturePadRef = useRef(null);
    const isDrawing = useRef(false);

    // ── Fetch rep info ──────────────────────────────────────────────────────
    useEffect(() => {
        if (!repId) return;
        fetch(`${API_URL}/api/sales-reps/public/${repId}`)
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(data => setRep(data))
            .catch(() => setRepError(true));
    }, [repId]);

    // ── Fetch properties ────────────────────────────────────────────────────
    useEffect(() => {
        fetch(`${API_URL}/api/properties`)
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                const names = [...new Set(data.map(p => p.name).filter(Boolean))].sort();
                setProperties(names);
            })
            .catch(() => setProperties([]));
    }, []);

    // ── Auto-save to localStorage ───────────────────────────────────────────
    useEffect(() => {
        try {
            // Don't persist file objects — only text fields
            localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(form));
        } catch { /* storage full */ }
    }, [form]);

    // ── Signature pad init ──────────────────────────────────────────────────
    useEffect(() => {
        if (step !== 5 || !canvasRef.current) return;
        const canvas = canvasRef.current;

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const source = e.touches ? e.touches[0] : e;
            return { x: source.clientX - rect.left, y: source.clientY - rect.top };
        };

        const startDraw = (e) => {
            isDrawing.current = true;
            const { x, y } = getPos(e);
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x, y);
        };

        const draw = (e) => {
            if (!isDrawing.current) return;
            e.preventDefault();
            const { x, y } = getPos(e);
            const ctx = canvas.getContext('2d');
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#1a1a2e';
            ctx.lineTo(x, y);
            ctx.stroke();
        };

        const endDraw = () => { isDrawing.current = false; };

        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mouseleave', endDraw);
        canvas.addEventListener('touchstart', startDraw, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', endDraw);

        return () => {
            canvas.removeEventListener('mousedown', startDraw);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDraw);
            canvas.removeEventListener('mouseleave', endDraw);
            canvas.removeEventListener('touchstart', startDraw);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', endDraw);
        };
    }, [step]);

    // ── Helpers ─────────────────────────────────────────────────────────────
    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const clearSignature = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const uploadSignatureImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.min(hRatio, vRatio);
                const cx = (canvas.width - img.width * ratio) / 2;
                const cy = (canvas.height - img.height * ratio) / 2;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const isSignatureEmpty = () => {
        const canvas = canvasRef.current;
        if (!canvas) return true;
        const ctx = canvas.getContext('2d');
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        return !data.some(channel => channel !== 0);
    };

    const handleFileChange = (key, file) => {
        setFiles(f => ({ ...f, [key]: file }));
        if (key === 'passport_photo' && file) {
            const reader = new FileReader();
            reader.onload = (e) => setPassportPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleOccupationInput = (val) => {
        set('occupation', val);
        if (val.length < 2) { setOccupationSuggestions([]); return; }
        const matches = OCCUPATIONS.filter(o => o.toLowerCase().includes(val.toLowerCase()));
        setOccupationSuggestions(matches.slice(0, 6));
    };

    // ── Validation per step ─────────────────────────────────────────────────
    const validate = (s) => {
        const missing = [];
        if (s === 1) {
            if (!form.first_name.trim()) missing.push('First Name');
            if (!form.last_name.trim()) missing.push('Last Name');
            if (!form.phone.trim()) missing.push('Phone Number');
            if (!form.email.trim()) missing.push('Email Address');
            if (!form.residential_address.trim()) missing.push('Residential Address');
            if (!form.date_of_birth) missing.push('Date of Birth');
        }
        if (s === 2) {
            if (!form.occupation.trim()) missing.push('Occupation');
        }
        if (s === 3) {
            if (!form.nin_id_number.trim()) missing.push('NIN / ID Number');
            if (!files.nin_document) missing.push('ID Document Upload');
            if (!files.passport_photo) missing.push('Passport Photograph');
        }
        if (s === 4) {
            const propName = form.property_name === 'Other' ? form.property_name_other : form.property_name;
            if (!propName.trim()) missing.push('Estate / Property');
            if (!form.quantity) missing.push('Quantity');
            if (!form.deposit_amount) missing.push('Deposit Amount');
            if (form.ownership_type === 'joint' && !coOwnerSaved) missing.push('Co-Owner Details');
        }
        if (s === 5) {
            if (!form.nok_full_name.trim()) missing.push('Next of Kin Full Name');
            if (!form.nok_phone.trim()) missing.push('Next of Kin Phone');
            if (!form.nok_relationship.trim()) missing.push('Next of Kin Relationship');
            if (isSignatureEmpty()) missing.push('Client Signature');
        }
        return missing;
    };

    const nextStep = () => {
        const errs = validate(step);
        if (errs.length > 0) { setErrors(errs); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        setErrors([]);
        setStep(s => Math.min(s + 1, TOTAL_STEPS));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setErrors([]);
        setStep(s => Math.max(s - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async () => {
        const errs = validate(5);
        if (errs.length > 0) { setErrors(errs); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const payload = { ...form };

            // Resolve "Other" fields
            if (form.property_name === 'Other') payload.property_name = form.property_name_other;
            if (form.plot_size === 'Other') payload.plot_size = form.plot_size_other;
            if (form.quantity === 'Other') payload.quantity = form.quantity_other;

            // Attach rep id
            if (repId) payload.sales_rep_id = repId;

            // Convert files to base64
            if (files.passport_photo) payload.passport_photo_b64 = await fileToBase64(files.passport_photo);
            if (files.nin_document) payload.nin_document_b64 = await fileToBase64(files.nin_document);
            if (files.payment_receipt) payload.payment_receipt_b64 = await fileToBase64(files.payment_receipt);

            // Signature
            const canvas = canvasRef.current;
            if (canvas) payload.signature_data = canvas.toDataURL('image/png');

            payload.consent_given = true;

            const res = await fetch(`${API_URL}/api/subscriptions/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (result.status === 'success') {
                localStorage.removeItem(AUTOSAVE_KEY);
                setSubmitted(true);
            } else {
                setSubmitError(result.message || 'Submission failed. Please try again.');
            }
        } catch (err) {
            setSubmitError('Network error. Please check your connection and try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleOwnershipChange = (val) => {
        set('ownership_type', val);
        if (val === 'joint') setShowCoOwnerModal(true);
        else { setCoOwnerSaved(false); }
    };

    // ── Success Screen ────────────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="sub-page">
                <div className="sub-success-screen">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                        <CheckCircle2 size={72} color="#25D366" />
                    </motion.div>
                    <h1>Form Submitted!</h1>
                    <p>Your property subscription has been received. An advisor will contact you shortly.</p>
                    <button className="sub-btn-primary" onClick={() => window.location.href = '/'}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // ── Render ──────────────────────────────────────────────────────────────
    return (
        <div className="sub-page">
            {/* Header */}
            <div className="sub-header">
                <img src="/logo.png" alt="Eximp & Cloves" className="sub-logo" onError={e => { e.target.style.display = 'none'; }} />
                <div className="sub-header-text">
                    <h2>Property Subscription Form</h2>
                    {rep && <p className="sub-rep-badge">Your Consultant: <strong>{rep.name}</strong></p>}
                    {repError && (
                        <p className="sub-rep-error">
                            Consultant link not recognized. You may still proceed and mention your consultant's name in the form.
                        </p>
                    )}
                </div>
            </div>

            <div className="sub-container">
                <StepBar current={step} />

                <div className="sub-card">
                    <ErrorBanner errors={errors} />

                    <AnimatePresence mode="wait">
                        {/* ── STEP 1: Bio-data ──────────────────────────── */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                                <h2 className="sub-step-title">Subscriber Bio-data</h2>
                                <p className="sub-step-sub">Tell us about yourself to begin your property purchase.</p>

                                <div className="sub-form-grid">
                                    <div className="sub-field">
                                        <label>Title</label>
                                        <select value={form.title} onChange={e => set('title', e.target.value)}>
                                            {['Mr', 'Mrs', 'Miss', 'Dr', 'Prof', 'Chief', 'Engr.'].map(t => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="sub-field">
                                        <label>First Name <span className="req">*</span></label>
                                        <input type="text" value={form.first_name} onChange={e => set('first_name', e.target.value)} placeholder="Enter first name" />
                                    </div>
                                    <div className="sub-field">
                                        <label>Last Name <span className="req">*</span></label>
                                        <input type="text" value={form.last_name} onChange={e => set('last_name', e.target.value)} placeholder="Enter last name" />
                                    </div>
                                    <div className="sub-field">
                                        <label>Middle Name</label>
                                        <input type="text" value={form.middle_name} onChange={e => set('middle_name', e.target.value)} placeholder="Optional" />
                                    </div>
                                    <div className="sub-field">
                                        <label>Gender</label>
                                        <select value={form.gender} onChange={e => set('gender', e.target.value)}>
                                            {['Male', 'Female', 'Prefer not to say'].map(g => <option key={g}>{g}</option>)}
                                        </select>
                                    </div>
                                    <div className="sub-field">
                                        <label>Date of Birth <span className="req">*</span></label>
                                        <input type="date" value={form.date_of_birth} onChange={e => set('date_of_birth', e.target.value)} />
                                    </div>
                                    <div className="sub-field">
                                        <label>Marital Status</label>
                                        <select value={form.marital_status} onChange={e => set('marital_status', e.target.value)}>
                                            {['Single', 'Married', 'Divorced', 'Widowed'].map(m => <option key={m}>{m}</option>)}
                                        </select>
                                    </div>
                                    <div className="sub-field">
                                        <label>Nationality</label>
                                        <input type="text" value={form.nationality} onChange={e => set('nationality', e.target.value)} />
                                    </div>
                                    <div className="sub-field">
                                        <label>Phone Number <span className="req">*</span></label>
                                        <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+234..." />
                                    </div>
                                    <div className="sub-field">
                                        <label>WhatsApp Number</label>
                                        <input type="tel" value={form.whatsapp_phone} onChange={e => set('whatsapp_phone', e.target.value)} placeholder="+234..." />
                                    </div>
                                    <div className="sub-field full">
                                        <label>Email Address <span className="req">*</span></label>
                                        <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
                                    </div>
                                    <div className="sub-field full">
                                        <label>Residential Address <span className="req">*</span></label>
                                        <input type="text" value={form.residential_address} onChange={e => set('residential_address', e.target.value)} placeholder="Full home address" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 2: Professional Profile ─────────────── */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                                <h2 className="sub-step-title">Professional Profile</h2>
                                <p className="sub-step-sub">This helps us customize your experience and future offers.</p>

                                <div className="sub-form-grid">
                                    <div className="sub-field full sub-occupation-wrap">
                                        <label>Occupation / Job <span className="req">*</span></label>
                                        <input
                                            type="text"
                                            value={form.occupation}
                                            onChange={e => handleOccupationInput(e.target.value)}
                                            placeholder="Search or type occupation..."
                                            autoComplete="off"
                                        />
                                        {occupationSuggestions.length > 0 && (
                                            <div className="sub-autocomplete">
                                                {occupationSuggestions.map(o => (
                                                    <div key={o} className="sub-autocomplete-item" onClick={() => { set('occupation', o); setOccupationSuggestions([]); }}>
                                                        {o}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="sub-field full">
                                        <label>Source of Income</label>
                                        <input type="text" value={form.source_of_income} onChange={e => set('source_of_income', e.target.value)} placeholder="e.g. Business, Salary, Investments" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 3: KYC & Documents ───────────────────── */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                                <h2 className="sub-step-title">KYC Verification</h2>
                                <p className="sub-step-sub">Secure identity verification is required for property authentication.</p>

                                <div className="sub-kyc-grid">
                                    {/* Passport Photo */}
                                    <div className="sub-passport-upload">
                                        <label>Passport Photograph <span className="req">*</span></label>
                                        <div className="sub-passport-box" onClick={() => document.getElementById('passportInput').click()}>
                                            {passportPreview
                                                ? <img src={passportPreview} alt="Passport preview" />
                                                : <><User size={36} className="sub-passport-placeholder" /><span>Click to upload</span></>
                                            }
                                        </div>
                                        <input id="passportInput" type="file" accept="image/*" className="sub-hidden-input" onChange={e => handleFileChange('passport_photo', e.target.files[0])} />
                                    </div>

                                    {/* ID Details */}
                                    <div className="sub-form-grid sub-id-fields">
                                        <div className="sub-field full">
                                            <label>NIN / ID Number <span className="req">*</span></label>
                                            <input type="text" value={form.nin_id_number} onChange={e => set('nin_id_number', e.target.value)} placeholder="Enter NIN or ID number" />
                                        </div>
                                        <div className="sub-field full">
                                            <label>Upload ID Document (NIN/Passport/Driver's License) <span className="req">*</span></label>
                                            <label className="sub-file-label" htmlFor="ninInput">
                                                <Upload size={16} />
                                                {files.nin_document ? files.nin_document.name : 'Choose file (JPG, PNG or PDF)'}
                                            </label>
                                            <input id="ninInput" type="file" accept="image/*,application/pdf" className="sub-hidden-input" onChange={e => handleFileChange('nin_document', e.target.files[0])} />
                                        </div>
                                    </div>
                                </div>

                                <div className="sub-security-note">
                                    <AlertCircle size={16} />
                                    <p>All documents are stored in encrypted environments and used only for legal property registration.</p>
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 4: Purchase Details ──────────────────── */}
                        {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                                <h2 className="sub-step-title">Purchase Details</h2>
                                <p className="sub-step-sub">Select the property and ownership structure.</p>

                                <div className="sub-form-grid">
                                    {/* Property */}
                                    <div className="sub-field full">
                                        <label>Select Estate / Property <span className="req">*</span></label>
                                        <select value={form.property_name} onChange={e => set('property_name', e.target.value)}>
                                            <option value="">-- Select a Property --</option>
                                            {properties.map(p => <option key={p} value={p}>{p}</option>)}
                                            <option value="Other">Other (Manual Entry)</option>
                                        </select>
                                        {form.property_name === 'Other' && (
                                            <input className="sub-other-input" type="text" value={form.property_name_other} onChange={e => set('property_name_other', e.target.value)} placeholder="Type property name here" />
                                        )}
                                    </div>

                                    {/* Plot Size */}
                                    <div className="sub-field">
                                        <label>Plot Size</label>
                                        <select value={form.plot_size} onChange={e => set('plot_size', e.target.value)}>
                                            {['300sqm', '450sqm', '500sqm', '600sqm', '1 Acre', 'Other'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                        {form.plot_size === 'Other' && (
                                            <input className="sub-other-input" type="text" value={form.plot_size_other} onChange={e => set('plot_size_other', e.target.value)} placeholder="Enter custom size" />
                                        )}
                                    </div>

                                    {/* Ownership */}
                                    <div className="sub-field">
                                        <label>Ownership Type</label>
                                        <select value={form.ownership_type} onChange={e => handleOwnershipChange(e.target.value)}>
                                            <option value="sole">Sole Ownership</option>
                                            <option value="joint">Joint Ownership</option>
                                        </select>
                                        {form.ownership_type === 'joint' && (
                                            <button type="button" className="sub-coowner-btn" onClick={() => setShowCoOwnerModal(true)}>
                                                <Users size={14} /> {coOwnerSaved ? `Co-Owner: ${form.co_owner_name}` : 'Enter Co-Owner Details'}
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Purpose of Purchase */}
                                    <div className="sub-field full">
                                        <label>Is this property being purchased: <span className="req">*</span></label>
                                        <div className="sub-qty-options" style={{ marginTop: '8px' }}>
                                            <label className={`sub-qty-option ${form.purchase_purpose === 'For yourself' ? 'selected' : ''}`}>
                                                <input type="radio" name="purchase_purpose" value="For yourself" checked={form.purchase_purpose === 'For yourself'} onChange={() => set('purchase_purpose', 'For yourself')} />
                                                For yourself
                                            </label>
                                            <label className={`sub-qty-option ${form.purchase_purpose === 'For someone else' ? 'selected' : ''}`}>
                                                <input type="radio" name="purchase_purpose" value="For someone else" checked={form.purchase_purpose === 'For someone else'} onChange={() => set('purchase_purpose', 'For someone else')} />
                                                For someone else
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="sub-quantity-box">
                                    <label className="sub-qty-title">Quantity <span className="req">*</span></label>
                                    <p className="sub-qty-sub">Number of units or plots you wish to purchase.</p>
                                    <div className="sub-qty-options">
                                        {['1', '2', '3', '4'].map(q => (
                                            <label key={q} className={`sub-qty-option ${form.quantity === q ? 'selected' : ''}`}>
                                                <input type="radio" name="quantity" value={q} checked={form.quantity === q} onChange={() => set('quantity', q)} />
                                                {q}
                                            </label>
                                        ))}
                                        <label className={`sub-qty-option ${form.quantity === 'Other' ? 'selected' : ''}`}>
                                            <input type="radio" name="quantity" value="Other" checked={form.quantity === 'Other'} onChange={() => set('quantity', 'Other')} />
                                            Other:
                                            <input
                                                type="number"
                                                className="sub-qty-other-input"
                                                value={form.quantity_other}
                                                onChange={e => set('quantity_other', e.target.value)}
                                                disabled={form.quantity !== 'Other'}
                                                placeholder="..."
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="sub-payment-box">
                                    <div className="sub-field">
                                        <label>Deposit Amount (₦) <span className="req">*</span></label>
                                        <input type="number" value={form.deposit_amount} onChange={e => set('deposit_amount', e.target.value)} placeholder="0.00" min="0" />
                                    </div>
                                    <div className="sub-field">
                                        <label>Payment Duration</label>
                                        <select value={form.payment_duration} onChange={e => set('payment_duration', e.target.value)}>
                                            <option value="Outright">Outright Payment</option>
                                            <option value="3 Months">3 Months Installment</option>
                                            <option value="6 Months">6 Months Installment</option>
                                            <option value="12 Months">12 Months Installment</option>
                                        </select>
                                    </div>
                                    <div className="sub-field">
                                        <label>Payment Date</label>
                                        <input type="date" value={form.payment_date} onChange={e => set('payment_date', e.target.value)} />
                                    </div>
                                    <div className="sub-field">
                                        <label>Upload Payment Receipt</label>
                                        <label className="sub-file-label" htmlFor="receiptInput">
                                            <Upload size={16} />
                                            {files.payment_receipt ? files.payment_receipt.name : 'Choose file'}
                                        </label>
                                        <input id="receiptInput" type="file" accept="image/*,application/pdf" className="sub-hidden-input" onChange={e => handleFileChange('payment_receipt', e.target.files[0])} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ── STEP 5: Next of Kin & Signature ──────────── */}
                        {step === 5 && (
                            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                                <h2 className="sub-step-title">Next of Kin & Signature</h2>
                                <p className="sub-step-sub">Emergency contact details and your consent signature.</p>

                                <div className="sub-form-grid">
                                    <div className="sub-field full">
                                        <label>Full Name <span className="req">*</span></label>
                                        <input type="text" value={form.nok_full_name} onChange={e => set('nok_full_name', e.target.value)} placeholder="Next of kin full name" />
                                    </div>
                                    <div className="sub-field">
                                        <label>Phone Number <span className="req">*</span></label>
                                        <input type="tel" value={form.nok_phone} onChange={e => set('nok_phone', e.target.value)} placeholder="+234..." />
                                    </div>
                                    <div className="sub-field">
                                        <label>Email Address</label>
                                        <input type="email" value={form.nok_email} onChange={e => set('nok_email', e.target.value)} placeholder="email@example.com" />
                                    </div>
                                    <div className="sub-field">
                                        <label>Relationship <span className="req">*</span></label>
                                        <select value={form.nok_relationship} onChange={e => set('nok_relationship', e.target.value)}>
                                            <option value="">-- Select --</option>
                                            {['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other'].map(r => <option key={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div className="sub-field">
                                        <label>Occupation</label>
                                        <input type="text" value={form.nok_occupation} onChange={e => set('nok_occupation', e.target.value)} placeholder="e.g. Teacher" />
                                    </div>
                                    <div className="sub-field full">
                                        <label>Address</label>
                                        <input type="text" value={form.nok_address} onChange={e => set('nok_address', e.target.value)} placeholder="Next of kin address" />
                                    </div>
                                    <div className="sub-field full">
                                        <label>How did you hear about us?</label>
                                        <select value={form.referral_source} onChange={e => set('referral_source', e.target.value)}>
                                            <option value="">-- Select --</option>
                                            {['Social Media', 'Friend/Family', 'Sales Representative', 'WhatsApp', 'Google', 'Billboard', 'Other'].map(r => <option key={r}>{r}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Signature Pad */}
                                <div className="sub-sig-section">
                                    <div className="sub-sig-header">
                                        <label>Client Signature <span className="req">*</span></label>
                                        <div className="sub-sig-actions">
                                            <label className="sub-sig-upload-btn">
                                                <Upload size={14} /> Upload Image
                                                <input type="file" accept="image/*" className="sub-hidden-input" onChange={uploadSignatureImage} />
                                            </label>
                                            <span className="sub-sig-divider">|</span>
                                            <button type="button" className="sub-sig-clear-btn" onClick={clearSignature}>Clear</button>
                                        </div>
                                    </div>
                                    <canvas ref={canvasRef} className="sub-sig-canvas" width={700} height={180} />
                                    <p className="sub-sig-hint">Sign or upload inside the box above</p>
                                </div>

                                {/* Consent */}
                                <div className="sub-consent">
                                    <p>By submitting this form, you confirm that all information provided is accurate and you agree to the{' '}
                                        <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>,{' '}
                                        <a href="/terms" target="_blank" rel="noopener noreferrer">Payment Protection Promise</a> and{' '}
                                        <a href="/refund" target="_blank" rel="noopener noreferrer">Refund Policies</a>.
                                    </p>
                                </div>

                                {submitError && (
                                    <div className="sub-error-banner">
                                        <AlertCircle size={16} />
                                        <p>{submitError}</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="sub-nav-actions">
                        {step > 1 && (
                            <button className="sub-btn-secondary" onClick={prevStep} disabled={submitting}>
                                <ChevronLeft size={18} /> Back
                            </button>
                        )}
                        {step < TOTAL_STEPS ? (
                            <button className="sub-btn-primary" onClick={nextStep}>
                                Continue <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button className="sub-btn-primary" onClick={handleSubmit} disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Complete Subscription'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Co-Owner Modal */}
            <AnimatePresence>
                {showCoOwnerModal && (
                    <CoOwnerModal
                        data={form}
                        onChange={set}
                        onSave={() => { setCoOwnerSaved(true); setShowCoOwnerModal(false); }}
                        onClose={() => {
                            setShowCoOwnerModal(false);
                            if (!coOwnerSaved) set('ownership_type', 'sole');
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
