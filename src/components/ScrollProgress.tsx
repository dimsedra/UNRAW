import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC<{ containerRef: React.RefObject<HTMLDivElement> }> = ({ containerRef }) => {
    const { scrollYProgress } = useScroll({ container: containerRef });
    
    // Smooth the progress indicator for a "Heavy/Smooth" feel
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="scroll-progress-container">
            <motion.div 
                className="scroll-progress-bar"
                style={{ scaleY }}
            />
            <style>{`
                .scroll-progress-container {
                    position: fixed;
                    right: 2vw;
                    top: 10vh;
                    height: 80vh;
                    width: 1px;
                    background: rgba(82, 87, 90, 0.1);
                    z-index: 100;
                }

                .scroll-progress-bar {
                    width: 100%;
                    height: 100%;
                    background: var(--slate);
                    transform-origin: top;
                }

                @media (max-width: 768px) {
                    .scroll-progress-container {
                        right: 1vw;
                    }
                }
            `}</style>
        </div>
    );
};

// Removed default export in favor of named export
