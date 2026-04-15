import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles, events } from '../data/news';

const NewsPreview: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        revealRefs.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    const featured = newsArticles.find(a => a.isFeatured) || newsArticles[0];
    const latestEvents = events.slice(0, 2);

    return (
        <section className="news-preview-module" ref={sectionRef}>
            <div className="editorial-grid">
                {/* Left/Hero Zone: Featured Narrative */}
                <div className="headline-zone reveal-up" ref={addToRefs}>
                    <div className="label-micro text-secondary">Documentation // Latest</div>
                    <Link to="/news" className="featured-card interactive">
                        <div className="card-visual">
                            <img src={featured.img} alt={featured.title} />
                            <div className="aspect-tag">{featured.category}</div>
                        </div>
                        <div className="card-content">
                            <span className="card-date">{featured.date}</span>
                            <h3>{featured.title}</h3>
                            <p>{featured.excerpt}</p>
                        </div>
                    </Link>
                </div>

                {/* Right/System Zone: Events & Navigation */}
                <div className="system-zone">
                    <div className="events-dossier reveal-up" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
                        <div className="label-micro dossier-label">Scheduled Encounters</div>
                        <div className="mini-events-list">
                            {latestEvents.map((event) => (
                                <div key={event.id} className="mini-event-item">
                                    <div className="event-meta">
                                        <span className="dot" />
                                        <span className="event-date">{event.date}</span>
                                    </div>
                                    <h4>{event.title}</h4>
                                    <span className="event-loc label-micro">{event.location}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="navigation-sector reveal-up" ref={addToRefs} style={{ transitionDelay: '0.4s' }}>
                        <p className="sector-desc">Continuous integration of internal reports, creative cycles, and operational updates.</p>
                        <Link to="/news" className="sector-link interactive">
                            Access Full Documentation [→]
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                .news-preview-module {
                    padding: 8rem 5%;
                    background: var(--bg-void);
                    border-top: 1px solid var(--border-color);
                }

                .editorial-grid {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 6rem;
                    align-items: start;
                }

                .featured-card {
                    text-decoration: none;
                    display: block;
                    margin-top: 2.5rem;
                }

                .card-visual {
                    position: relative;
                    aspect-ratio: 16/10;
                    overflow: hidden;
                    background: var(--bg-surface);
                    border: 1px solid var(--border-color);
                }

                .card-visual img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: brightness(0.85);
                    transition: transform 1.5s var(--ease-heavy), filter 0.5s ease;
                }

                .featured-card:hover img {
                    transform: scale(1.05);
                    filter: brightness(1);
                }

                .aspect-tag {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    padding: 0.4rem 0.8rem;
                    background: rgba(0,0,0,0.8);
                    backdrop-filter: blur(4px);
                    border: 1px solid var(--border-color);
                    font-size: 0.6rem;
                    letter-spacing: 0.1em;
                    color: var(--text-primary);
                }

                .card-content {
                    margin-top: 2rem;
                }

                .card-date {
                    font-size: 0.8rem;
                    color: var(--accent-tone);
                    font-family: var(--font-functional);
                }

                .card-content h3 {
                    font-size: clamp(1.5rem, 3vw, 2.5rem);
                    margin: 1rem 0;
                    line-height: 1.1;
                }

                .card-content p {
                    color: var(--text-secondary);
                    font-size: 1rem;
                    max-width: 45ch;
                }

                /* System Zone */
                .system-zone {
                    display: flex;
                    flex-direction: column;
                    gap: 6rem;
                    padding-top: 2.5rem;
                }

                .mini-events-list {
                    margin-top: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .mini-event-item {
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                    padding-bottom: 1.5rem;
                }

                .event-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 0.5rem;
                }

                .dot {
                    width: 4px;
                    height: 4px;
                    background: var(--accent-tone);
                    border-radius: 50%;
                }

                .event-date {
                    font-size: 0.7rem;
                    color: var(--text-secondary);
                }

                .mini-event-item h4 {
                    font-size: 1.25rem;
                    margin-bottom: 0.5rem;
                    font-family: var(--font-display);
                }

                .navigation-sector {
                    padding: 3rem;
                    border: 1px solid var(--border-color);
                    background: rgba(255,255,255,0.02);
                }

                .sector-desc {
                    font-size: 0.9rem;
                    color: var(--text-tertiary);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .sector-link {
                    display: inline-block;
                    color: var(--text-primary);
                    text-decoration: none;
                    font-size: 0.8rem;
                    letter-spacing: 0.1em;
                    font-weight: 600;
                    transition: color 0.3s;
                }

                .sector-link:hover {
                    color: var(--accent-tone);
                }

                @media (max-width: 1024px) {
                    .editorial-grid {
                        grid-template-columns: 1fr;
                        gap: 4rem;
                    }
                    .system-zone {
                        gap: 4rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default NewsPreview;
