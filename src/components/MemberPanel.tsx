import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import type { Member } from '../data/members';

interface MemberPanelProps {
    member: Member;
    scrollRef: React.RefObject<HTMLDivElement>;
}

const MemberPanel: React.FC<MemberPanelProps> = ({ member, scrollRef }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollRef,
        offset: ["start end", "end start"]
    });

    // Smooth scroll progress for "Heavy" feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // 1. APERTURE DRIFT: Subtle scale and horizontal offset
    // The panel "seats" itself as it reaches the center
    const apertureScale = useTransform(smoothProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
    const apertureX = useTransform(smoothProgress, [0, 0.5, 1], [20, 0, -20]);
    const apertureY = useTransform(smoothProgress, [0, 0.5, 1], [40, 0, -40]);

    // 2. OPTICAL FOCUS: Progressive blur and contrast
    // Extreme focus window for ultra-lean screens (5% to 95% active plateau)
    const blurValue = useTransform(smoothProgress, [0, 0.05, 0.5, 0.95, 1], ["8px", "0px", "0px", "0px", "8px"]);
    const contrastValue = useTransform(smoothProgress, [0, 0.5, 1], ["0.8", "1.1", "0.8"]);
    const opacityValue = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

    // 3. INTERNAL PARALLAX: Syncing with smooth progress
    const detailY = useTransform(smoothProgress, [0, 1], [150, -150]);
    const atmosX = useTransform(smoothProgress, [0, 1], [-80, 80]);

    const isLight = member.textColor === 'var(--obsidian)';

    return (
        <article 
            ref={containerRef}
            className="member-panel" 
            id={member.id}
            style={{ 
                backgroundColor: member.backgroundColor, 
                color: member.textColor,
            }}
        >
            {/* Background Structural Text - Far Background */}
            <motion.div 
                className="structural-bg-text"
                style={{ opacity: 0.04, color: member.textColor, x: atmosX, filter: `blur(${blurValue})` }}
            >
                {member.name}
            </motion.div>

            <motion.div 
                className="member-content"
                style={{ 
                    scale: apertureScale, 
                    x: apertureX, 
                    y: apertureY,
                    opacity: opacityValue,
                    filter: `blur(${blurValue}) contrast(${contrastValue})`
                }}
            >
                {/* STAGE ZONE (LEFT) - Contains Portrait, Detail Fragments, and Atmos reveals */}
                <div className="stage-zone">
                    <motion.div 
                        className="atmos-container"
                        style={{ x: atmosX }}
                    >
                        <img src={member.gallery.atmos} alt="" aria-hidden="true" />
                    </motion.div>

                    <div className="member-image-core">
                        <img 
                            src={member.gallery.core} 
                            alt={member.name} 
                            style={{ filter: isLight ? 'none' : 'brightness(0.9)' }} 
                        />
                    </div>

                    <motion.div 
                        className="detail-fragment"
                        style={{ y: detailY }}
                    >
                        <img src={member.gallery.detail} alt="" aria-hidden="true" />
                        <div className="detail-caption">0{member.index} / APERTURE</div>
                    </motion.div>
                </div>

                {/* NARRATIVE ZONE (RIGHT) - Reserved exclusively for text */}
                <div className="narrative-zone">
                    <div className="narrative-container">
                        <span className="eyebrow" style={{ color: isLight ? 'var(--obsidian)' : 'var(--slate)' }}>
                            {member.role}
                        </span>
                        <h2>{member.name}</h2>
                        
                        <div className="narrative-body">
                            {member.description.map((p, i) => (
                                <p key={i} style={{ color: isLight ? 'var(--obsidian-light)' : 'var(--sand-dark)' }}>
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <style>{`
                .member-panel {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .structural-bg-text {
                    position: absolute;
                    top: 50%;
                    left: 20%;
                    transform: translateY(-50%);
                    font-family: var(--font-structure);
                    font-size: 40vw;
                    line-height: 1;
                    pointer-events: none;
                    z-index: 0;
                    white-space: nowrap;
                    font-weight: 800;
                    transition: filter 0.8s ease-out;
                }

                .member-content {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: var(--spacing-md);
                    width: 100%;
                    padding: 0 5vw;
                    position: relative;
                    z-index: 10;
                    align-items: center;
                    will-change: transform, filter, opacity;
                }

                .stage-zone {
                    position: relative;
                    height: 80vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .atmos-container {
                    position: absolute;
                    left: -5vw;
                    top: 5vh;
                    width: 25vw;
                    height: 45vh;
                    overflow: hidden;
                    z-index: 1;
                }

                .atmos-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) contrast(1.2) brightness(0.7);
                }

                .member-image-core {
                    width: 100%;
                    max-width: 480px;
                    aspect-ratio: 4/5;
                    overflow: hidden;
                    background: var(--obsidian);
                    box-shadow: 0 40px 100px rgba(0,0,0,0.6);
                    position: relative;
                    z-index: 2;
                }

                .member-image-core img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .detail-fragment {
                    position: absolute;
                    bottom: 0px;
                    right: 0px;
                    width: 200px;
                    z-index: 3;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                .detail-fragment img {
                    width: 100%;
                    display: block;
                    filter: grayscale(100%);
                    border: 1px solid var(--slate);
                }

                .detail-caption {
                    font-family: var(--font-structure);
                    font-size: 0.65rem;
                    padding: 0.5rem 0;
                    letter-spacing: 0.15em;
                    color: inherit;
                    opacity: 0.8;
                }

                .narrative-zone {
                    position: relative;
                    z-index: 20;
                    padding-left: 4vw;
                }

                .member-panel h2 {
                    margin: 0.2rem 0 2rem;
                    font-size: clamp(3rem, 7vw, 7.5rem);
                }

                .narrative-body p {
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                    font-size: clamp(1rem, 1.2vw, 1.25rem);
                }

                @media (max-width: 1024px) {
                    .member-panel { 
                        height: 250vh; /* Massive scroll buffer for high-density reading */
                        display: block;
                    }
                    .member-content { 
                        grid-template-columns: 1fr;
                        min-height: 100vh;
                        height: auto;
                        padding: 10vh 5vw; 
                        position: sticky;
                        top: 0;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    .stage-zone { height: auto; margin-bottom: 2rem; flex-shrink: 0; }
                    .atmos-container, .detail-fragment, .structural-bg-text { display: none; }
                    .member-image-core { max-width: 260px; margin: 0 auto 1.5rem; }
                    .narrative-zone { padding-left: 0; text-align: center; }
                    .member-panel h2 { font-size: 2.2rem; margin-bottom: 1rem; }
                    .narrative-body p { font-size: 0.95rem; margin-bottom: 1.25rem; line-height: 1.5; }
                }

                @media (max-width: 600px) {
                    .member-panel { height: 300vh; } /* Extreme buffer for ultra-lean phones */
                    .member-image-core { max-width: 200px; }
                    .member-panel h2 { font-size: 1.8rem; }
                    .narrative-body p { font-size: 0.85rem; }
                    .member-content { padding-top: 5vh; }
                }
            `}</style>
        </article>
    );
};

export default MemberPanel;
