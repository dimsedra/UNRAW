import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface TeaserProps {
    title: string;
    description: string;
    image: string;
    link: string;
    index: number;
}

const ModuleTeaser: React.FC<TeaserProps> = ({ title, description, image, link, index }) => {
    return (
        <motion.div 
            className="module-teaser"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
        >
            <div className="teaser-image-container">
                <img src={image} alt={title} className="teaser-img" />
                <div className="teaser-overlay"></div>
            </div>
            
            <div className="teaser-content">
                <span className="label-micro">MODULE / 0{index + 1}</span>
                <h3>{title}</h3>
                <p className="text-body">{description}</p>
                
                <Link to={link} className="view-more-btn interactive">
                    &gt;&gt; View More
                </Link>
            </div>

            <style>{`
                .module-teaser {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 3rem;
                    padding: 4rem 5%;
                    border-bottom: 1px solid var(--border-color);
                    align-items: center;
                }

                .teaser-image-container {
                    aspect-ratio: 16/9;
                    position: relative;
                    overflow: hidden;
                    background: var(--bg-surface);
                    border: 1px solid var(--border-color);
                }

                .teaser-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) brightness(0.8);
                    transition: transform 1s var(--ease-heavy), filter 0.5s ease;
                }

                .module-teaser:hover .teaser-img {
                    transform: scale(1.05);
                    filter: grayscale(20%) brightness(1);
                }

                .view-more-btn {
                    margin-top: 1.5rem;
                    display: inline-block;
                    font-family: var(--font-structure);
                    font-size: 0.85rem;
                    letter-spacing: 0.1em;
                    color: var(--accent-tone);
                    text-decoration: none;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid transparent;
                    transition: border-bottom 0.3s ease;
                }

                .view-more-btn:hover {
                    border-bottom: 1px solid var(--accent-tone);
                }

                @media (max-width: 1024px) {
                    .module-teaser {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                        padding: 3rem 5%;
                    }
                    .teaser-content { order: 2; }
                    .teaser-image-container { order: 1; }
                }
            `}</style>
        </motion.div>
    );
};

export default ModuleTeaser;
