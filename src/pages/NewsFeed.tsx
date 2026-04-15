import React, { useEffect, useRef } from 'react';
import { newsArticles, events } from '../data/news';
import { NewsCard } from '../components';
import { useLenis } from '../context/LenisContext';
import '../styles/atmos.css';

const NewsFeed: React.FC = () => {
    const { lenis } = useLenis();
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

    // Force scroll to top on mount
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [lenis]);

    useEffect(() => {
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

    const featuredArticle = newsArticles.find(a => a.isFeatured);
    const standardArticles = newsArticles.filter(a => !a.isFeatured);

    return (
        <section className="news-panel">
            <header className="news-header reveal-up" ref={addToRefs}>
                <div className="label-micro text-secondary">Press / Documentation</div>
                <h1 className="news-main-title">System Updates & Narratives</h1>
            </header>

            <div className="editorial-container">
                {/* Featured Section */}
                {featuredArticle && (
                    <div className="featured-news-zone reveal-up" ref={addToRefs} style={{ transitionDelay: '0.2s' }}>
                        <NewsCard article={featuredArticle} isFeatured={true} />
                    </div>
                )}

                <div className="news-events-split">
                    {/* News Feed */}
                    <div className="news-feed">
                        <div className="section-label label-micro reveal-up" ref={addToRefs}>Latest Reports</div>
                        <div className="standard-grid">
                            {standardArticles.map((article, idx) => (
                                <div key={article.id} className="reveal-up" ref={addToRefs} style={{ transitionDelay: `${0.3 + (idx * 0.1)}s` }}>
                                    <NewsCard article={article} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Events Sidebar */}
                    <aside className="events-column">
                        <div className="section-label label-micro reveal-up" ref={addToRefs}>Scheduled Encounters</div>
                        <div className="events-list">
                            {events.map((event, idx) => (
                                <div key={event.id} className="event-item reveal-up" ref={addToRefs} style={{ transitionDelay: `${0.4 + (idx * 0.1)}s` }}>
                                    <div className="event-date label-micro">{event.date}</div>
                                    <h4 className="event-title">{event.title}</h4>
                                    <div className="event-info">
                                        <span className="event-location">{event.location}</span>
                                        <span className="event-type-tag">{event.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="status-box reveal-up" ref={addToRefs} style={{ transitionDelay: '0.6s' }}>
                            <div className="label-micro">System Connectivity</div>
                            <p>All nodes operating within expected parameters. Continuous integration active.</p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default NewsFeed;
