import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { members } from '../data/members';

const RosterPreview: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % members.length);
        }, 8000); // Extended display time to 8s
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="roster-preview">
            <div className="roster-layout">
                <div className="visual-area">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={members[currentIndex].id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="member-fade-frame"
                        >
                            <img 
                                src={members[currentIndex].gallery.core} 
                                alt={members[currentIndex].name} 
                                className="member-img"
                            />
                            {/* The Gradient Fade Mask */}
                            <div className="mask-fade"></div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="cta-area">
                    <div className="cta-content">
                        <span className="label-micro">Roster Division</span>
                        <h2>COLLECTIVE IDENTITY.</h2>
                        <p className="text-body">
                            The architectural foundation of UNRAW. Meet the four anchors defining the next level of narrative rhythm.
                        </p>
                        
                        <div className="member-indicator">
                            {members.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`dot ${idx === currentIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>

                        <Link to="/unraw" className="view-more-btn interactive">
                            &gt;&gt; Meet the Roster
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                .roster-preview {
                    height: 600px; /* Fixed height for module consistency */
                    background: #080808; /* Subtle tonal shift for section hierarchy */
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                }

                .roster-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    z-index: 2;
                }

                .visual-area {
                    position: absolute;
                    inset: 0;
                    width: 60%; /* Occupy larger left portion */
                    height: 100%;
                    z-index: 1;
                }

                .member-fade-frame {
                    position: absolute;
                    inset: 0;
                    height: 100%;
                }

                .member-img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    object-position: left center;
                    filter: brightness(0.9);
                    /* Apply mask directly to the image for actual transparency dissolve */
                    -webkit-mask-image: linear-gradient(to right, black 20%, transparent 80%);
                    mask-image: linear-gradient(to right, black 20%, transparent 80%);
                }

                .mask-fade {
                    position: absolute;
                    inset: 0;
                    /* Strong secondary overlay to ensure zero hard edges near the text */
                    background: linear-gradient(to right, transparent 20%, #080808 90%);
                    pointer-events: none;
                }

                .cta-area {
                    grid-column: 2;
                    padding: 0 10% 0 5%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    z-index: 3;
                }

                .cta-content h2 {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-family: var(--font-display);
                    line-height: 0.9;
                    margin: 1rem 0;
                }

                .member-indicator {
                    display: flex;
                    gap: 1rem;
                    margin: 2rem 0;
                }

                .dot {
                    width: 30px;
                    height: 2px;
                    background: rgba(255,255,255,0.1);
                    transition: all 0.5s ease;
                }

                .dot.active {
                    background: var(--accent-tone);
                    width: 60px;
                }

                @media (max-width: 1024px) {
                    .roster-preview {
                        height: auto;
                        min-height: 800px;
                        background: #0a0a0a;
                    }
                    .roster-layout {
                        grid-template-columns: 1fr;
                        display: flex;
                        flex-direction: column;
                    }
                    .visual-area {
                        position: relative;
                        width: 100%;
                        height: 500px; /* Stronger vertical presence */
                        margin-bottom: -150px; /* Deeper overlap for atmospheric layering */
                    }
                    .member-img {
                        object-position: center 20%;
                        filter: brightness(0.65);
                        /* Dual-ended vertical dissolve for seamless blending top and bottom */
                        -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 50%, transparent 95%);
                        mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 50%, transparent 95%);
                    }
                    .mask-fade {
                        /* Match the mask transition for atmospheric consistency */
                        background: linear-gradient(to bottom, #080808 0%, transparent 15%, transparent 30%, #080808 95%);
                    }
                    .cta-area {
                        padding: 2rem 5% 5rem;
                        background: transparent;
                        position: relative;
                        z-index: 5;
                    }
                }

                @media (max-width: 640px) {
                    .visual-area {
                        height: 400px;
                        margin-bottom: -120px;
                    }
                    .member-img {
                        filter: brightness(0.5);
                    }
                }
            `}</style>
        </section>
    );
};

export default RosterPreview;
