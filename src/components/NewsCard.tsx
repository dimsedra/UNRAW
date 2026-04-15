import React from 'react';
import type { NewsArticle } from '../data/news';

interface NewsCardProps {
    article: NewsArticle;
    isFeatured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, isFeatured }) => {
    return (
        <article className={`news-card ${isFeatured ? 'featured' : ''}`}>
            <div className="news-img-wrapper">
                <img src={article.img} alt={article.title} className="news-img" />
                <div className="news-category">{article.category}</div>
            </div>
            
            <div className="news-content">
                <div className="news-meta">
                    <span className="news-date">{article.date}</span>
                </div>
                <h3 className="news-title">{article.title}</h3>
                <p className="news-excerpt">{article.excerpt}</p>
                
                <button className="read-more interactive">
                    Read Report [→]
                </button>
            </div>
        </article>
    );
};

export default NewsCard;
