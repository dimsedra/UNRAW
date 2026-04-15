import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const slides = [
    {
        id: 'an-yujin',
        image: '/assets/hero/an-yujin-hero.png',
        alt: 'AN YUJIN - UNRAW'
    },
    {
        id: 'natty',
        image: '/assets/hero/natty-hero.png',
        alt: 'NATTY - UNRAW'
    },
    {
        id: 'new-arrival',
        image: '/assets/hero/new-arrival-hero.png',
        alt: 'NEW ARRIVAL - UNRAW'
    },
    {
        id: 'premium-basics',
        image: '/assets/hero/premium-basics-hero.png',
        alt: 'PREMIUM BASICS - UNRAW'
    },
    {
        id: 'coming-soon',
        image: '/assets/hero/coming-soon-hero.png',
        alt: 'COMING SOON - UNRAW'
    }
];

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        filter: 'blur(10px)'
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        filter: 'blur(10px)'
    })
};

const LandingHero: React.FC<{ scrollRef: React.RefObject<HTMLDivElement> }> = ({ scrollRef }) => {
    const [[page, direction], setPage] = useState([0, 0]);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "center start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const paginate = useCallback((newDirection: number) => {
        setPage(([prevPage]) => {
            const nextPage = (prevPage + newDirection + slides.length) % slides.length;
            return [nextPage, newDirection];
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1); // Default to sliding right
        }, 8000);
        return () => clearInterval(timer);
    }, [paginate]);

    const currentSlide = slides[page];

    return (
        <section className="landing-hero">
            <motion.div 
                className="hero-system-wrapper"
                style={{ scale, opacity: opacityTransform }}
            >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div 
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.6 },
                            filter: { duration: 0.6 }
                        }}
                        className="hero-slide"
                    >
                        <div className="hero-image-wrapper">
                            <img 
                                src={currentSlide.image} 
                                alt={currentSlide.alt} 
                                className="hero-bg-img"
                            />
                            <div className="hero-overlay"></div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="hero-nav">
                    <button className="nav-btn prev interactive" onClick={() => paginate(-1)}>
                        &lt;
                    </button>
                    <button className="nav-btn next interactive" onClick={() => paginate(1)}>
                        &gt;
                    </button>
                </div>
            </motion.div>

            <style>{`
                .landing-hero {
                    height: calc(100vh - 74px);
                    width: 100%;
                    position: relative;
                    background: var(--bg-void);
                    overflow: hidden;
                }

                .hero-system-wrapper {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .hero-slide {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-image-wrapper {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }

                .hero-bg-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    width: 100%;
                    padding: 0 10%;
                }

                .announcement-item h1 {
                    font-size: clamp(2.5rem, 8vw, 6.5rem);
                    line-height: 0.9;
                    margin: 0.5rem 0;
                    font-family: var(--font-display);
                    letter-spacing: -0.02em;
                }

                .announcement-item h2 {
                    font-size: clamp(1rem, 2vw, 1.5rem);
                    font-family: var(--font-structure);
                    letter-spacing: 0.3em;
                    opacity: 0.8;
                    margin-top: 1rem;
                }

                .color-accent {
                    color: var(--accent-tone);
                }

                .hero-nav {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 2rem;
                    z-index: 10;
                    pointer-events: none;
                }

                .nav-btn {
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                    color: white;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50%;
                    font-family: var(--font-structure);
                    font-size: 1.5rem;
                    cursor: pointer;
                    pointer-events: auto;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(4px);
                }

                .nav-btn:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: white;
                    transform: scale(1.1);
                }

                @media (max-width: 768px) {
                    .hero-nav {
                        padding: 0 1rem;
                    }
                    .nav-btn {
                        width: 44px;
                        height: 44px;
                        font-size: 1.2rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default LandingHero;
