import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="page-footer">
            <div className="footer-brand">
                ATMOS / SYSTEM
            </div>
            
            <div className="system-credits">
                <div className="label-micro">Project Status</div>
                <span>Phase 01-A // Continuous Integration</span>
                <div style={{ marginTop: '0.5rem', opacity: 0.5 }}>© {currentYear} Atmos. All rights reserved.</div>
            </div>

            <div className="footer-links">
                <a href="#" className="action-link interactive">Instagram</a>
                <a href="#" className="action-link interactive">Twitter / X</a>
                <a href="#" className="action-link interactive">Terms</a>
            </div>
        </footer>
    );
};

export default Footer;
