import React from 'react';
import { motion } from 'framer-motion';
import { unrawDiscography } from '../data/discography';

const UnrawDiscography: React.FC = () => {
    return (
        <section className="unraw-section archive-log" style={{ paddingTop: '15vh', minHeight: '120vh', paddingBottom: '30vh' }}>
            <div className="system-container">
                <div className="archive-header reveal-up">
                    <div className="header-meta">
                        <span className="label-micro">The Archive</span>
                        <span className="label-micro" style={{ opacity: 0.4 }}>INDEX: AU-LOG-01</span>
                    </div>
                    <h2 className="display-title">Discography</h2>
                    <p className="header-summary">
                        A complete record of our musical releases. 
                        Exploring the evolution of the UNRAW sound.
                    </p>
                </div>

                <div className="archive-staggered-list">
                    {unrawDiscography.map((release, index) => (
                        <motion.div 
                            key={release.id}
                            className="archive-item reveal-up"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="item-visual">
                                <div className="visual-frame">
                                    <img src={release.coverImg} alt={release.title} className="archive-img" />
                                    <div className="visual-overlay"></div>
                                    <div className="precision-mark top-left"></div>
                                    <div className="precision-mark top-right"></div>
                                    <div className="precision-mark bottom-left"></div>
                                    <div className="precision-mark bottom-right"></div>
                                </div>
                            </div>

                            <div className="item-details">
                                <div className="details-header">
                                    <span className="release-code">{release.indexCode}</span>
                                    <span className="release-type">{release.type}</span>
                                </div>
                                
                                <h3 className="release-title">{release.title}</h3>
                                
                                <div className="technical-specs">
                                    <div className="spec-item">
                                        <span className="spec-label">Duration</span>
                                        <span className="spec-value">{release.duration}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">BPM</span>
                                        <span className="spec-value">{release.bpm}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">BITRATE</span>
                                        <span className="spec-value">{release.bitrate}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Version</span>
                                        <span className="spec-value">{release.version}</span>
                                    </div>
                                </div>

                                <p className="release-description">{release.description}</p>

                                <div className="track-index">
                                    <div className="label-micro" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(223, 219, 210, 0.1)', paddingBottom: '0.5rem' }}>Tracklist</div>
                                    {release.tracks.map((track, i) => (
                                        <div key={i} className="track-row">
                                            <span className="track-no">{(i + 1).toString().padStart(2, '0')}</span>
                                            <span className="track-name">{track}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .archive-log {
                    background: var(--bg-void);
                    color: var(--text-primary);
                }

                .archive-header {
                    max-width: 600px;
                    margin-bottom: 8rem;
                }

                .header-meta {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                }

                .display-title {
                    font-family: var(--font-display);
                    font-size: clamp(3rem, 6vw, 5rem);
                    line-height: 0.9;
                    letter-spacing: -0.02em;
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                }

                .header-summary {
                    font-size: 0.9rem;
                    line-height: 1.6;
                    color: var(--text-secondary);
                    max-width: 450px;
                }

                .archive-staggered-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12rem;
                }

                .archive-item {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                }

                .archive-item:nth-child(even) {
                    direction: rtl;
                }

                .archive-item:nth-child(even) .item-details {
                    direction: ltr;
                }

                .item-visual {
                    position: relative;
                }

                .visual-frame {
                    position: relative;
                    aspect-ratio: 1;
                    padding: 2rem;
                    border: 1px solid rgba(223, 219, 210, 0.05);
                    background: rgba(223, 219, 210, 0.02);
                }

                .archive-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(1) contrast(1.1);
                    mix-blend-mode: luminosity;
                    transition: all 0.6s var(--ease-fluid);
                }

                .archive-item:hover .archive-img {
                    filter: grayscale(0.2) contrast(1);
                    mix-blend-mode: normal;
                }

                .precision-mark {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    border: 1px solid rgba(223, 219, 210, 0.3);
                }

                .precision-mark.top-left { top: 0; left: 0; border-right: none; border-bottom: none; }
                .precision-mark.top-right { top: 0; right: 0; border-left: none; border-bottom: none; }
                .precision-mark.bottom-left { bottom: 0; left: 0; border-right: none; border-top: none; }
                .precision-mark.bottom-right { bottom: 0; right: 0; border-left: none; border-top: none; }

                .item-details {
                    display: flex;
                    flex-direction: column;
                }

                .details-header {
                    display: flex;
                    gap: 2rem;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .release-code {
                    font-family: var(--font-functional);
                    font-size: 0.7rem;
                    padding: 0.2rem 0.5rem;
                    background: var(--accent-tone);
                    color: var(--obsidian);
                }

                .release-type {
                    font-family: var(--font-functional);
                    font-size: 0.65rem;
                    color: var(--text-tertiary);
                    letter-spacing: 0.1em;
                }

                .release-title {
                    font-family: var(--font-display);
                    font-size: 2.5rem;
                    margin-bottom: 2rem;
                    letter-spacing: 0.05em;
                }

                .technical-specs {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                    max-width: 300px;
                }

                .spec-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .spec-label {
                    font-family: var(--font-functional);
                    font-size: 0.6rem;
                    color: var(--text-tertiary);
                }

                .spec-value {
                    font-family: var(--font-functional);
                    font-size: 0.8rem;
                    color: var(--text-primary);
                }

                .release-description {
                    font-size: 0.85rem;
                    line-height: 1.6;
                    color: var(--text-secondary);
                    margin-bottom: 3rem;
                    max-width: 400px;
                }

                .track-index {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .track-row {
                    display: flex;
                    gap: 1rem;
                    font-family: var(--font-functional);
                    font-size: 0.7rem;
                    color: var(--text-tertiary);
                }

                .track-no { opacity: 0.3; }

                @media (max-width: 1024px) {
                    .archive-item {
                        grid-template-columns: 1fr;
                        gap: 4rem;
                        direction: ltr !important;
                    }
                    .archive-staggered-list {
                        gap: 8rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default UnrawDiscography;
