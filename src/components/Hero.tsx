import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <header className="hero container">
            <motion.span 
                className="eyebrow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            >
                UNRAW / Identity
            </motion.span>
            
            <h1 style={{ overflow: 'hidden' }}>
                <motion.span 
                    style={{ display: 'block' }}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                >
                    THE COST
                </motion.span>
            </h1>
            
            <h1 style={{ overflow: 'hidden' }}>
                <motion.span 
                    style={{ display: 'block' }}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
                >
                    OF ARRIVAL.
                </motion.span>
            </h1>
            
            <motion.div 
                className="hero-meta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
                <div>A four-member collective.</div>
                <div>The next level.</div>
                <div>Tangerang / Global</div>
            </motion.div>

            <style>{`
                .hero {
                    min-height: calc(100vh - 74px);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding-bottom: var(--spacing-lg);
                    position: relative;
                }

                .hero-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    font-family: var(--font-structure);
                    padding-top: 1rem;
                    margin-top: var(--spacing-md);
                }

                @media (max-width: 768px) {
                    .hero-meta {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </header>
    );
};

export default Hero;
