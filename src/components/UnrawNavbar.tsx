import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UnrawNavbar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Observer to hide navbar when footer is visible
        const footer = document.querySelector('.page-footer');
        
        if (footer) {
            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    // entry.isIntersecting is true if any part of the footer is in view
                    setIsVisible(!entry.isIntersecting);
                },
                { threshold: 0.05 } // Trigger as soon as 5% of footer is visible
            );
            observerRef.current.observe(footer);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    // Also force visible on route change just in case
    useEffect(() => {
        setIsVisible(true);
    }, [location.pathname]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="unraw-nav-wrapper">
                    <motion.nav 
                        className="unraw-floating-nav"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <NavLink 
                            to="/unraw" 
                            end
                            className={({ isActive }) => `unraw-nav-item ${isActive ? 'active' : ''}`}
                        >
                            Profile
                        </NavLink>
                        <NavLink 
                            to="/unraw/discography" 
                            className={({ isActive }) => `unraw-nav-item ${isActive ? 'active' : ''}`}
                        >
                            Discography
                        </NavLink>
                        <NavLink 
                            to="/unraw/news" 
                            className={({ isActive }) => `unraw-nav-item ${isActive ? 'active' : ''}`}
                        >
                            Intelligence
                        </NavLink>
                    </motion.nav>

                    <style>{`
                        .unraw-nav-wrapper {
                            position: fixed;
                            bottom: 2rem;
                            left: var(--sidebar-width);
                            right: 0;
                            display: flex;
                            justify-content: center;
                            pointer-events: none;
                            z-index: 1000;
                            transition: left 0.4s var(--ease-heavy);
                        }

                        .unraw-floating-nav {
                            background: rgba(13, 12, 11, 0.7);
                            backdrop-filter: blur(24px) saturate(180%);
                            border: 1px solid rgba(223, 219, 210, 0.08);
                            border-radius: 100px;
                            padding: 0.4rem 0.4rem;
                            display: flex;
                            gap: 0.25rem;
                            box-shadow: 
                                0 4px 24px rgba(0,0,0,0.4),
                                inset 0 1px 1px rgba(255,255,255,0.05);
                            pointer-events: auto;
                        }

                        @media (max-width: 1024px) {
                            .unraw-nav-wrapper {
                                left: 0; /* Sidebar is collapsed or overlay on mobile */
                            }
                        }

                        .unraw-nav-item {
                            color: var(--text-tertiary);
                            font-family: var(--font-functional);
                            font-size: 0.7rem;
                            text-transform: uppercase;
                            letter-spacing: 0.12em;
                            padding: 0.65rem 1.25rem;
                            text-decoration: none;
                            transition: all 0.4s var(--ease-fluid);
                            border-radius: 100px;
                            position: relative;
                        }

                        .unraw-nav-item:hover {
                            color: var(--text-primary);
                            background: rgba(223, 219, 210, 0.05);
                        }

                        .unraw-nav-item.active {
                            color: var(--obsidian);
                            background: var(--text-primary);
                        }

                        @media (max-width: 480px) {
                            .unraw-nav-wrapper {
                                bottom: 1.5rem;
                                padding: 0 1rem;
                            }
                            .unraw-floating-nav {
                                width: 100%;
                                justify-content: space-between;
                                padding: 0.35rem;
                            }
                            .unraw-nav-item {
                                font-size: 0.6rem;
                                padding: 0.5rem 0.75rem;
                                flex: 1;
                                text-align: center;
                            }
                        }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UnrawNavbar;
