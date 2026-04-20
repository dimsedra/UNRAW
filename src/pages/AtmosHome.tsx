import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer, VideoOverlay } from '../components';
import { visualNodes } from '../data/visuals';
import { useLenis } from '../context/LenisContext';
import '../styles/atmos.css';

export interface CartItem {
    id: string;
    name: string;
    price: string;
    img: string;
    quantity: number;
}

const AtmosHome: React.FC = () => {
    const { lenis } = useLenis();

    // Initialize cart from localStorage
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('atmos-cart');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    
    // Audio/Visual State
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [isVideoOverlayOpen, setIsVideoOverlayOpen] = useState(false);
    const [currentVisualIndex, setCurrentVisualIndex] = useState(0);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

    // Sync cart to localStorage
    useEffect(() => {
        localStorage.setItem('atmos-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarExpanded(false);
        };

        window.addEventListener('resize', handleResize);
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Auto-observe all reveal-up elements in the document
        const revealElements = document.querySelectorAll('.reveal-up');
        revealElements.forEach(el => observer.observe(el));

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [location.pathname]);

    // Scroll Lock when Overlay is Active
    useEffect(() => {
        if (!lenis) return;
        if (isVideoOverlayOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [isVideoOverlayOpen, lenis]);

    // Audio/Visual Progress Simulation (Stable Structural State)
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying && !isVideoOverlayOpen) {
            interval = setInterval(() => {
                setAudioProgress(prev => (prev >= 100 ? 0 : prev + 1));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isVideoOverlayOpen]);

    const handleAddToCart = (product: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        
        setToastMessage(`[ ${product.name} ] added to your collection.`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const toggleVisuals = () => {
        const nextState = !isPlaying;
        setIsPlaying(nextState);
        if (nextState) setIsVideoOverlayOpen(true);
    };

    const navigateVisuals = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setCurrentVisualIndex((prev) => (prev + 1) % visualNodes.length);
        } else {
            setCurrentVisualIndex((prev) => (prev - 1 + visualNodes.length) % visualNodes.length);
        }
    };

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    const currentVisual = visualNodes[currentVisualIndex];

    return (
        <div className="atmos-root">
            <div className="noise-layer"></div>
            <div className="ambient-glow"></div>

            <div className="system-container">
                <nav className="top-bar">
                    <Link to="/" className="brand interactive">ATMOS</Link>
                    <div className="state-indicator">
                        <div className="status-dot"></div>
                        <span className="label-micro">State 01 : Plateau</span>
                    </div>
                    <div className="actions">
                        <Link to="/news" className="action-link interactive" onClick={() => isMobile && setIsSidebarExpanded(false)}>News</Link>
                        <Link to="/unraw" className="action-link interactive" onClick={() => isMobile && setIsSidebarExpanded(false)}>UNRAW</Link>
                        <Link to="/shop" className="action-link interactive" onClick={() => isMobile && setIsSidebarExpanded(false)}>Shop</Link>
                    </div>
                </nav>

                <main className={`core-grid ${isMobile ? 'mobile-mode' : ''} ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
                    <aside 
                        className={`context-panel ${isSidebarExpanded ? 'expanded' : ''}`}
                    >
                        {isMobile && (
                            <button 
                                className="sidebar-trigger" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsSidebarExpanded(!isSidebarExpanded);
                                }}
                            >
                                {isSidebarExpanded ? '>' : '<'}
                            </button>
                        )}
                        <div className="sidebar-content-wrapper" style={{ opacity: (!isMobile || isSidebarExpanded) ? 1 : 0, transition: 'opacity 0.3s' }}>
                            <div className="manifesto reveal-up" ref={addToRefs} style={{ transitionDelay: '0.1s' }}>
                                <div className="label-micro" style={{ marginBottom: '1rem' }}>Operating Principle</div>
                                <h1>Deliberate, Not Decorative.</h1>
                                <p className="text-body">
                                    Rejecting traditional consumption cycles. Developing environments to sustain a singular, prolonged feeling. The identity evolves naturally—stripping excess until only function remains.
                                </p>
                            </div>

                            <div className="audio-module reveal-up" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
                                <div className="audio-header">
                                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <div className="label-micro">Music Division // VISUALS</div>
                                            <button className={`play-btn-minimal interactive ${isPlaying ? 'active' : ''}`} onClick={toggleVisuals}>
                                                {isPlaying ? (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                                                ) : (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                                                )}
                                            </button>
                                        </div>
                                        <div className="sidebar-nav-cluster">
                                            <button 
                                                className="sidebar-nav-btn" 
                                                onClick={(e) => { e.stopPropagation(); navigateVisuals('prev'); }}
                                            >
                                                {'<'}
                                            </button>
                                            
                                            <div className="marquee-viewport">
                                                <motion.div 
                                                    className="audio-title marquee-content"
                                                    initial={{ x: 0 }}
                                                    whileHover={currentVisual.title.length > 15 ? { x: [0, -100], transition: { duration: 5, repeat: Infinity, ease: "linear" } } : {}}
                                                >
                                                    {currentVisual.title}
                                                    {currentVisual.title.length > 15 && (
                                                        <span className="marquee-spacer">{currentVisual.title}</span>
                                                    )}
                                                </motion.div>
                                            </div>

                                            <button 
                                                className="sidebar-nav-btn" 
                                                onClick={(e) => { e.stopPropagation(); navigateVisuals('next'); }}
                                            >
                                                {'>'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-body" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                    {currentVisual.description}
                                </div>
                                <div className="progress-container">
                                    <div className="progress-bar" style={{ width: `${audioProgress}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div id="cosmos-scroll-wrapper" ref={scrollRef} style={{ flexGrow: 1, backgroundColor: 'var(--bg-void)', height: 'calc(100vh - var(--topbar-height))', overflowY: 'auto', overflowX: 'hidden' }}>
                        <div id="cosmos-scroll-content">
                            <Outlet context={{ 
                                handleAddToCart, 
                                scrollRef, 
                                cartItems, 
                                isCartOpen, 
                                setIsCartOpen,
                                removeFromCart,
                                updateQuantity
                            }} />
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>

            <AnimatePresence>
                {isVideoOverlayOpen && (
                    <VideoOverlay 
                        node={currentVisual}
                        onClose={() => {
                            setIsVideoOverlayOpen(false);
                            setIsPlaying(false);
                        }}
                        onNext={() => navigateVisuals('next')}
                        onPrev={() => navigateVisuals('prev')}
                        onVideoStateChange={(state) => {
                            if (state === 'ended') setIsPlaying(false);
                        }}
                    />
                )}
            </AnimatePresence>

            <div className={`toast ${showToast ? 'show' : ''}`}>{toastMessage}</div>
        </div>
    );
};

export default AtmosHome;
