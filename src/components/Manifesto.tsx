import React from 'react';
import { motion } from 'framer-motion';

const Manifesto: React.FC<{ scrollRef: React.RefObject<HTMLDivElement> }> = ({ scrollRef }) => {
    return (
        <section className="unraw-manifesto container">
            <div className="grid-split">
                <motion.div 
                    className="viewport-tracker"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ root: scrollRef, once: true, margin: "-15%" }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                >
                    <span className="eyebrow">The Vision</span>
                    <h2 className="structural-text">WE STOPPED WAITING TO BECOME READY.</h2>
                </motion.div>
                
                <motion.div 
                    className="text-offset viewport-tracker"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ root: scrollRef, once: true, margin: "-15%" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                >
                    <p>This is not a story about fighting the industry or proving something to anyone. It is quieter than that, and more permanent. At different points, through different circumstances, each of the four members reached the same internal threshold — the moment when the rehearsal ends and the living begins.</p>
                    <div className="narrative-quote">
                        The plateau isn't a destination they're moving toward. It's what was always there.
                    </div>
                    <p>UNRAW is what happened when four people, separately and then together, finally stopped getting in their own way. They recognized something in each other immediately — the specific stillness of someone who has already let go.</p>
                </motion.div>
            </div>

            <style>{`
                .unraw-manifesto {
                    padding: var(--spacing-xl) 0;
                    background-color: var(--sand);
                    color: var(--obsidian);
                    position: relative;
                    z-index: 2;
                }

                .unraw-manifesto p {
                    color: var(--obsidian-light);
                }

                .unraw-manifesto .narrative-quote {
                    color: var(--obsidian);
                    border-left-color: var(--obsidian);
                }

                .grid-split {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-md);
                    align-items: start;
                }

                .text-offset {
                    margin-top: var(--spacing-lg);
                }

                @media (max-width: 768px) {
                    .grid-split { grid-template-columns: 1fr; }
                    .text-offset { margin-top: 2rem; }
                }
            `}</style>
        </section>
    );
};

export default Manifesto;
