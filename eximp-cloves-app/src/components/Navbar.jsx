import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isVideoPlaying } = useVideo();
    const { isDark, toggleTheme } = useTheme();
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

    const isPropertyDetail = location.pathname.startsWith('/properties/');

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isPropertyDetail ? 'is-property-detail' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="logo">
                    <img
                        src={isDark ? "/logo.svg" : "/light%20theme%20logo.png"}
                        alt="Eximp & Cloves Logo"
                    />
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

                <div className="nav-right-group">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? <Moon size={18} /> : <Sun size={18} />}
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

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}></div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
