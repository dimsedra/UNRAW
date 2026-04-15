import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const ShopPreview: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section className="shop-preview">
            <div className="preview-header">
                <div className="cta-content">
                    <span className="label-micro">Apparel Discovery</span>
                    <h2>EQUIP THE SYSTEM.</h2>
                    <p className="text-body">Explore the functional silhouettes designed for architectural daily routine.</p>
                    <Link to="/shop" className="view-more-btn interactive">
                        &gt;&gt; View Inventory
                    </Link>
                </div>
                
                <div className="nav-controls">
                    <button className="nav-btn interactive" onClick={() => scroll('left')}>&lt;</button>
                    <button className="nav-btn interactive" onClick={() => scroll('right')}>&gt;</button>
                </div>
            </div>

            <div className="products-wheel" ref={scrollRef}>
                {products.map((product) => (
                    <Link 
                        key={product.id} 
                        to={`/shop?id=${product.id}`}
                        className="wheel-item interactive"
                    >
                        <div className="wheel-img-container">
                            <img src={product.img} alt={product.name} />
                        </div>
                        <div className="wheel-meta">
                            <span className="product-id">[{product.id}]</span>
                            <h4>{product.name}</h4>
                        </div>
                    </Link>
                ))}
            </div>

            <style>{`
                .shop-preview {
                    padding: 6rem 5%;
                    background: var(--bg-void);
                }

                .preview-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 4rem;
                }

                .cta-content h2 {
                    font-size: clamp(2rem, 5vw, 4rem);
                    font-family: var(--font-display);
                    line-height: 0.9;
                    margin: 1rem 0;
                }

                .nav-controls {
                    display: flex;
                    gap: 1rem;
                }

                .nav-btn {
                    width: 50px;
                    height: 50px;
                    border: 1px solid var(--border-color);
                    background: transparent;
                    color: white;
                    border-radius: 50%;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s var(--ease-fluid);
                }

                .nav-btn:hover {
                    background: white;
                    color: black;
                }

                .products-wheel {
                    display: flex;
                    gap: 2rem;
                    overflow-x: auto;
                    padding-bottom: 2rem;
                    scrollbar-width: none;
                    scroll-snap-type: x mandatory;
                }

                .products-wheel::-webkit-scrollbar {
                    display: none;
                }

                .wheel-item {
                    flex: 0 0 350px;
                    scroll-snap-align: start;
                    text-decoration: none;
                }

                .wheel-img-container {
                    aspect-ratio: 1/1;
                    background: var(--bg-surface);
                    overflow: hidden;
                    border: 1px solid var(--border-color);
                }

                .wheel-img-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: brightness(0.9);
                    transition: transform 1.5s var(--ease-heavy), filter 0.5s ease;
                }

                .wheel-item:hover img {
                    transform: scale(1.05);
                    filter: brightness(1);
                }

                .wheel-meta {
                    margin-top: 1.5rem;
                }

                .product-id {
                    font-family: var(--font-structure);
                    font-size: 0.7rem;
                    color: var(--accent-tone);
                }

                .wheel-meta h4 {
                    font-family: var(--font-display);
                    font-size: 1.25rem;
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .wheel-item {
                        flex: 0 0 280px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ShopPreview;
