import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AnnouncementBar = () => {
    return (
        <div className="announcement-bar">
            <div className="container announcement-content">
                <motion.div
                    className="announcement-inner"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ShieldAlert size={16} className="announcement-icon" />
                    <p>
                        <strong>OFFICIAL NOTICE:</strong> All payments for Eximp & Cloves Infrastructure Limited should be made
                        <span> ONLY</span> to our official company bank account. We do not accept payments to personal accounts.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
