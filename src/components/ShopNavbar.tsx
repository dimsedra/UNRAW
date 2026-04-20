import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopNavbarProps {
    query: string;
    onQueryChange: (query: string) => void;
    onCartClick: () => void;
    cartCount: number;
}

const ShopNavbar: React.FC<ShopNavbarProps> = ({ query, onQueryChange, onCartClick, cartCount }) => {
    const [isVisible, setIsVisible] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Observer to hide navbar when footer is visible
        const footer = document.querySelector('.page-footer');
        
        if (footer) {
            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    setIsVisible(!entry.isIntersecting);
                },
                { threshold: 0.05 }
            );
            observerRef.current.observe(footer);
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="shop-nav-wrapper">
                    <motion.div 
                        className="shop-floating-nav"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Filter Segment (Visual) */}
                        <button className="shop-nav-action filter">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/>
                            </svg>
                        </button>

                        <div className="nav-divider" />

                        {/* Search Segment */}
                        <div className="shop-nav-search">
                            <div className="search-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search Products..." 
                                value={query}
                                onChange={(e) => onQueryChange(e.target.value)}
                                className="nav-search-input"
                            />
                        </div>

                        <div className="nav-divider" />

                        {/* Cart Segment */}
                        <button className="shop-nav-action cart" onClick={onCartClick}>
                            <div className="cart-icon-container">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                                </svg>
                                {cartCount > 0 && (
                                    <span className="nav-cart-badge">{cartCount}</span>
                                )}
                            </div>
                        </button>
                    </motion.div>

                    <style>{`
                        .shop-nav-wrapper {
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

                        .shop-floating-nav {
                            background: rgba(13, 12, 11, 0.7);
                            backdrop-filter: blur(24px) saturate(180%);
                            border: 1px solid rgba(223, 219, 210, 0.08);
                            border-radius: 100px;
                            padding: 0.4rem 0.6rem;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            box-shadow: 
                                0 4px 24px rgba(0,0,0,0.4),
                                inset 0 1px 1px rgba(255,255,255,0.05);
                            pointer-events: auto;
                            min-width: 320px;
                        }

                        @media (max-width: 1024px) {
                            .shop-nav-wrapper {
                                left: 0;
                            }
                        }

                        .nav-divider {
                            width: 1px;
                            height: 20px;
                            background: rgba(223, 219, 210, 0.1);
                        }

                        .shop-nav-action {
                            background: none;
                            border: none;
                            color: var(--text-tertiary);
                            padding: 0.6rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            transition: all 0.3s var(--ease-fluid);
                            border-radius: 50%;
                        }

                        .shop-nav-action:hover {
                            color: var(--text-primary);
                            background: rgba(223, 219, 210, 0.05);
                        }

                        .shop-nav-search {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            padding: 0 0.5rem;
                        }

                        .search-icon {
                            color: var(--text-tertiary);
                            opacity: 0.5;
                        }

                        .nav-search-input {
                            background: none;
                            border: none;
                            color: var(--text-primary);
                            font-family: var(--font-functional);
                            font-size: 0.8rem;
                            width: 100%;
                            outline: none;
                        }

                        .nav-search-input::placeholder {
                            color: var(--text-tertiary);
                            opacity: 0.3;
                            text-transform: uppercase;
                            letter-spacing: 0.05em;
                        }

                        .cart-icon-container {
                            position: relative;
                        }

                        .nav-cart-badge {
                            position: absolute;
                            top: -8px;
                            right: -8px;
                            background: var(--text-primary);
                            color: var(--bg-void);
                            font-size: 0.6rem;
                            font-weight: 800;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: var(--font-functional);
                        }

                        @media (max-width: 480px) {
                            .shop-floating-nav {
                                min-width: 0;
                                width: 90vw;
                            }
                            .nav-search-input {
                                font-size: 0.75rem;
                            }
                        }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ShopNavbar;
