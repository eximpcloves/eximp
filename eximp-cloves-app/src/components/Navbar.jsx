import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useVideo } from '../context/VideoContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isVideoPlaying } = useVideo();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide navbar when video is playing
    if (isVideoPlaying) return null;

    const navLinks = [
        { name: 'Home', path: '/' },
        // { name: 'Estates', path: '/properties' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <img src="/logo.svg" alt="Eximp & Cloves Logo" />
                </Link>

                <ul className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}></div>
                </button>

                <Link
                    to="/contact"
                    className="btn-nav-highlight desktop-only-btn"
                    style={{
                        visibility: location.pathname === '/contact' ? 'hidden' : 'visible',
                        pointerEvents: location.pathname === '/contact' ? 'none' : 'auto'
                    }}
                >
                    Book An Inspection
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
