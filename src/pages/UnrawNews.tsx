import React from 'react';
import { motion } from 'framer-motion';
import { newsArticles } from '../data/news';

const UnrawNews: React.FC = () => {
    // Filter news articles related to UNRAW
    const unrawNews = newsArticles.filter(article => 
        article.title.toUpperCase().includes('UNRAW') || 
        article.content.toUpperCase().includes('UNRAW') ||
        article.title.toUpperCase().includes('PLATEAU') ||
        article.title.toUpperCase().includes('SYSTEM STATE')
    );

    return (
        <section className="unraw-section intelligence-feed" style={{ paddingTop: '15vh', minHeight: '120vh', paddingBottom: '30vh' }}>
            <div className="system-container">
                <div className="feed-header reveal-up">
                    <div className="header-status">
                        <div className="status-indicator">
                            <div className="pulse-dot"></div>
                            <span className="label-micro">LIVE INTEL STREAM</span>
                        </div>
                        <span className="label-micro" style={{ opacity: 0.4 }}>ENCRYPTION: AES-256</span>
                    </div>
                    <h2 className="display-title">INTELLIGENCE LOG</h2>
                    <div className="feed-meta">
                        <div className="meta-item">
                            <span className="meta-label">SOURCE</span>
                            <span className="meta-val">INTERNAL_SYSTEM_01</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">OPERATOR</span>
                            <span className="meta-val">UNRAW // ATMOS</span>
                        </div>
                    </div>
                </div>

                <div className="log-stream">
                    {unrawNews.length > 0 ? (
                        unrawNews.map((article, index) => (
                            <motion.article 
                                key={article.id}
                                className="log-entry reveal-up"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <div className="entry-sidebar">
                                    <span className="entry-index">DATA_0{index + 1}</span>
                                    <span className="entry-timestamp">{article.date}</span>
                                </div>
                                
                                <div className="entry-content">
                                    <div className="entry-header">
                                        <span className="entry-category">[{article.category}]</span>
                                        <h3 className="entry-title">{article.title}</h3>
                                    </div>
                                    
                                    <div className="entry-body">
                                        <p className="entry-excerpt">{article.excerpt}</p>
                                        <div className="entry-full-content">
                                            {article.content}
                                        </div>
                                    </div>

                                    {article.img && (
                                        <div className="entry-visual">
                                            <img src={article.img} alt={article.title} className="entry-img" />
                                            <div className="img-corner-decor"></div>
                                        </div>
                                    )}

                                    <div className="entry-footer">
                                        <span className="label-micro">END_OF_MESSAGE</span>
                                        <div className="entry-divider"></div>
                                    </div>
                                </div>
                            </motion.article>
                        ))
                    ) : (
                        <div className="empty-log reveal-up">
                            <div className="label-micro">NO ACTIVE INTELLIGENCE DETECTED IN CURRENT STATE.</div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .intelligence-feed {
                    background: var(--bg-void);
                }

                .feed-header {
                    margin-bottom: 8rem;
                }

                .header-status {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .pulse-dot {
                    width: 6px;
                    height: 6px;
                    background: var(--accent-tone);
                    border-radius: 50%;
                    box-shadow: 0 0 10px var(--accent-tone);
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }

                .display-title {
                    font-family: var(--font-display);
                    font-size: clamp(3rem, 6vw, 5rem);
                    line-height: 0.9;
                    letter-spacing: -0.01em;
                    margin-bottom: 3rem;
                    text-transform: uppercase;
                }

                .feed-meta {
                    display: flex;
                    gap: 4rem;
                    border-left: 1px solid rgba(223, 219, 210, 0.1);
                    padding-left: 2rem;
                }

                .meta-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .meta-label {
                    font-family: var(--font-functional);
                    font-size: 0.6rem;
                    color: var(--text-tertiary);
                }

                .meta-val {
                    font-family: var(--font-functional);
                    font-size: 0.75rem;
                    color: var(--text-primary);
                }

                .log-stream {
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                }

                .log-entry {
                    display: grid;
                    grid-template-columns: 180px 1fr;
                    gap: 4rem;
                    padding-bottom: 4rem;
                }

                .entry-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    border-right: 1px solid rgba(223, 219, 210, 0.05);
                }

                .entry-index {
                    font-family: var(--font-functional);
                    font-size: 0.7rem;
                    color: var(--accent-tone);
                }

                .entry-timestamp {
                    font-family: var(--font-functional);
                    font-size: 0.65rem;
                    color: var(--text-tertiary);
                }

                .entry-header {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .entry-category {
                    font-family: var(--font-functional);
                    font-size: 0.65rem;
                    color: var(--text-tertiary);
                    letter-spacing: 0.1em;
                }

                .entry-title {
                    font-family: var(--font-display);
                    font-size: 2rem;
                    letter-spacing: 0.02em;
                    color: var(--text-primary);
                    text-transform: uppercase;
                }

                .entry-body {
                    margin-bottom: 3rem;
                }

                .entry-excerpt {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: var(--text-primary);
                    margin-bottom: 1.5rem;
                    font-weight: 500;
                }

                .entry-full-content {
                    font-size: 0.9rem;
                    line-height: 1.7;
                    color: var(--text-secondary);
                    max-width: 600px;
                }

                .entry-visual {
                    position: relative;
                    margin-bottom: 3rem;
                    max-width: 800px;
                    border: 1px solid rgba(223, 219, 210, 0.1);
                    padding: 1rem;
                }

                .entry-img {
                    width: 100%;
                    height: auto;
                    filter: grayscale(1) brightness(0.8);
                    transition: all 0.5s ease;
                }

                .log-entry:hover .entry-img {
                    filter: grayscale(0.5) brightness(1);
                }

                .entry-footer {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .entry-divider {
                    flex-grow: 1;
                    height: 1px;
                    background: linear-gradient(to right, rgba(223, 219, 210, 0.2), transparent);
                }

                .empty-log {
                    text-align: center;
                    padding: 8rem 0;
                    border: 1px dashed rgba(223, 219, 210, 0.1);
                }

                @media (max-width: 768px) {
                    .log-entry {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    .entry-sidebar {
                        border-right: none;
                        border-bottom: 1px solid rgba(223, 219, 210, 0.05);
                        padding-bottom: 1rem;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }
            `}</style>
        </section>
    );
};

export default UnrawNews;
