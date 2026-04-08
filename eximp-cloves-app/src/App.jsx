import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './context/VideoContext';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import VersionCheck from './components/VersionCheck';
import FloatingSupport from './components/FloatingSupport';
import './styles/updates.css';

function App() {
    console.log('App Component Rendering');
    return (
        <ThemeProvider>
            <VideoProvider>
                <VersionCheck />
                <Router>
                    <FloatingSupport />
                    <ScrollToTop />
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/properties" element={<Properties />} />
                            <Route path="/properties/:slug" element={<PropertyDetail />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/refund" element={<Refund />} />
                        </Routes>
                    </Layout>
                </Router>
            </VideoProvider>
        </ThemeProvider>
    );
}

export default App;
