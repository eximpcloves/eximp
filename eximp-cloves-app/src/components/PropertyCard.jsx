import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useVideo } from '../context/VideoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, Play, X, FileText, Maximize, ChevronDown, Loader2, ArrowUpRight } from 'lucide-react';

const PropertyCard = ({ id, slug, title, location, price, image, tags, status, videoUrl, droneVideoUrl, landmarks, paymentPlans }) => {
    const navigate = useNavigate();
    const { setIsVideoPlaying } = useVideo();
    const [showVideo, setShowVideo] = useState(false);
    const [activeVideo, setActiveVideo] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isBuffering, setIsBuffering] = useState(false);
    const videoRef = useRef(null);

    const tabs = [
        { id: 'overview', label: 'Overview' },
        landmarks ? { id: 'landmarks', label: 'Landmarks' } : null,
        { id: 'docs', label: 'Documents' },
        paymentPlans ? { id: 'payment', label: 'Payment' } : null
    ].filter(Boolean);

    const activeTabLabel = tabs.find(t => t.id === activeTab)?.label || 'Overview';

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const duration = videoRef.current.duration;
            const currentTime = videoRef.current.currentTime;
            setProgress((currentTime / duration) * 100);
        }
    };

    const handleScrub = (e) => {
        if (videoRef.current) {
            const scrubTime = (e.target.value / 100) * videoRef.current.duration;
            videoRef.current.currentTime = scrubTime;
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) {
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.webkitRequestFullscreen) {
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) {
                videoRef.current.msRequestFullscreen();
            }
        }
    };

    const standardDocuments = [
        "Deed of Assignment",
        "Contract of Sales",
        "Provisional Survey",
        "Payment Receipt",
        "Acknowledgement Certificate",
        "Allocation Letter"
    ];

    return (
        <>
            <motion.div
                whileHover={{ y: -12 }}
                className="property-card"
                onClick={() => navigate(`/properties/${slug}`)}
                style={{ cursor: 'pointer' }}
            >
                <div className="property-image">
                    {status && (
                        <div className="verified-badge">
                            <CheckCircle size={14} className="badge-icon" />
                            {status}
                        </div>
                    )}
                    <img src={image} alt={title} loading="lazy" />

                    <div className="view-details-overlay">
                        <span className="view-details-btn">
                            View Details <ArrowUpRight size={16} />
                        </span>
                    </div>

                    <div className="property-video-actions">
                        {videoUrl && (
                            <button
                                className="watch-tour-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVideo(videoUrl);
                                    setShowVideo(true);
                                    setIsVideoPlaying(true);
                                }}
                            >
                                <Play size={14} fill="currentColor" /> Watch Tour
                            </button>
                        )}
                        {droneVideoUrl && (
                            <button
                                className="watch-tour-btn drone-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVideo(droneVideoUrl);
                                    setShowVideo(true);
                                    setIsVideoPlaying(true);
                                }}
                            >
                                <Play size={14} fill="currentColor" /> Drone Aerial View
                            </button>
                        )}
                    </div>
                </div>

                <div className="property-tabs-header">
                    <div className="property-tab-dropdown">
                        <button
                            className="dropdown-trigger"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsDropdownOpen(!isDropdownOpen);
                            }}
                        >
                            <span>{activeTabLabel}</span>
                            <ChevronDown size={14} className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    className="dropdown-menu"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            className={`dropdown-item ${activeTab === tab.id ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveTab(tab.id);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="property-details">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3>{title}</h3>
                                    <ArrowUpRight size={20} color="var(--primary-color)" />
                                </div>
                                <div className="property-meta">
                                    <span className="property-location">
                                        <MapPin size={14} /> {location}
                                    </span>
                                    <span className="property-price">{price}</span>
                                </div>
                                <div className="property-tags">
                                    {tags && tags.map(tag => (
                                        <span key={tag} className="tag-light">{tag}</span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'landmarks' && landmarks && (
                            <motion.div
                                key="landmarks"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="property-landmarks"
                            >
                                <h4 style={{ color: 'var(--primary-color)', fontSize: '0.8rem', marginBottom: '1rem' }}>Proximity & Landmarks</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {landmarks.map((landmark, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontSize: '0.85rem', marginBottom: '8px' }}>
                                            <CheckCircle size={14} color="var(--primary-color)" /> {landmark}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                        {activeTab === 'docs' && (
                            <motion.div
                                key="docs"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="property-docs"
                            >
                                <h4 style={{ color: 'var(--primary-color)', fontSize: '0.8rem', marginBottom: '1rem' }}>Legal Documentation</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {standardDocuments.map((doc, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)', fontSize: '0.85rem', marginBottom: '10px' }}>
                                            <FileText size={14} color="var(--primary-color)" /> {doc}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                        {activeTab === 'payment' && paymentPlans && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="property-payment"
                            >
                                <h4 style={{ color: 'var(--primary-color)', fontSize: '0.8rem', marginBottom: '1rem' }}>Flexible Installment Plans</h4>
                                <div className="payment-plans-grid">
                                    {paymentPlans.map((plan, idx) => (
                                        <div key={idx} className="payment-plan-card">
                                            <div className="plan-name">{plan.name}</div>
                                            <div className="plan-total">{plan.total}</div>
                                            <div className="plan-details">
                                                <span>Deposit: {plan.deposit}</span>
                                                <span>Monthly: {plan.monthly}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {createPortal(
                <AnimatePresence>
                    {showVideo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="video-modal-overlay"
                            onClick={() => {
                                setShowVideo(false);
                                setIsVideoPlaying(false);
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="video-modal-content"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="modal-actions">
                                    <button type="button" className="action-btn fullscreen-btn" onClick={toggleFullscreen}>
                                        <Maximize size={20} />
                                    </button>
                                    <button type="button" className="big-close-btn" onClick={() => {
                                        setShowVideo(false);
                                        setIsVideoPlaying(false);
                                    }}>
                                        <X size={28} />
                                    </button>
                                </div>
                                <video
                                    ref={videoRef}
                                    src={activeVideo}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="modal-video"
                                    onLoadStart={() => setIsBuffering(true)}
                                    onWaiting={() => setIsBuffering(true)}
                                    onCanPlay={() => setIsBuffering(false)}
                                    onPlaying={() => setIsBuffering(false)}
                                    onTimeUpdate={handleTimeUpdate}
                                    onClick={handlePlayPause}
                                    onContextMenu={(e) => e.preventDefault()}
                                    onVolumeChange={(e) => {
                                        if (!e.target.muted) {
                                            e.target.muted = true;
                                        }
                                    }}
                                />

                                {isBuffering && (
                                    <div className="video-loader">
                                        <img src="/assets/loading_animation_branded.gif" alt="Loading..." className="branded-spinner" />
                                        <p>Loading Video...</p>
                                    </div>
                                )}

                                <div className="custom-video-controls" onClick={e => e.stopPropagation()}>
                                    <button type="button" className="play-pause-btn" onClick={handlePlayPause}>
                                        {isPlaying ? <X size={20} style={{ transform: 'rotate(45deg)' }} /> : <Play size={20} fill="currentColor" />}
                                    </button>
                                    <div className="video-progress-container">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={progress}
                                            onChange={handleScrub}
                                            className="video-progress-slider"
                                        />
                                        <div className="video-progress-bar" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default PropertyCard;
