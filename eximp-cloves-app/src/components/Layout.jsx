import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <div className="top-security-marquee">
                <div className="security-marquee-content">
                    <span><ShieldAlert size={14} inline="true" /> <strong>PAYMENT SECURITY NOTICE:</strong> To protect our valued clients from fraud, all payments for <strong>Eximp & Cloves Infrastructure Limited</strong> should be made <strong>ONLY</strong> to our official company bank account. We do not authorize payments to any personal accounts. — </span>
                    <span><ShieldAlert size={14} inline="true" /> <strong>PAYMENT SECURITY NOTICE:</strong> To protect our valued clients from fraud, all payments for <strong>Eximp & Cloves Infrastructure Limited</strong> should be made <strong>ONLY</strong> to our official company bank account. We do not authorize payments to any personal accounts.</span>
                </div>
            </div>
            <Navbar />
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.main>
            <Footer />
        </div>
    );
};

export default Layout;
