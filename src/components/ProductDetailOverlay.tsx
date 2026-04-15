import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';

interface ProductDetailOverlayProps {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: { id: string; name: string; price: string; img: string }) => void;
}

const ProductDetailOverlay: React.FC<ProductDetailOverlayProps> = ({ product, onClose, onAddToCart }) => {
    const [activeImage, setActiveImage] = useState(product.img);


    return (
        <motion.div 
            className="product-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div 
                className="detail-container"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-detail-btn interactive" onClick={onClose}>
                    Close [X]
                </button>

                <div className="detail-grid">
                    {/* Visual Section */}
                    <div className="detail-visuals">
                        <div className="main-detail-img">
                            <img src={activeImage} alt={product.name} />
                        </div>
                        {product.gallery && product.gallery.length > 1 && (
                            <div className="detail-gallery">
                                {product.gallery.map((img, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`gallery-thumb interactive ${activeImage === img ? 'active' : ''}`}
                                        onClick={() => setActiveImage(img)}
                                    >
                                        <img src={img} alt={`${product.name} view ${idx}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="detail-info" data-lenis-prevent>
                        <header className="detail-header">
                            <div className="label-micro series-tag">{product.series}</div>
                            <h2 className="detail-title">{product.name}</h2>
                            <div className="detail-price">{product.price}</div>
                        </header>

                        <div className="detail-description">
                            <p>{product.description}</p>
                        </div>

                        <div className="tech-specs">
                            <div className="label-micro">Technical Dossier</div>
                            <ul>
                                {product.specs.map((spec, idx) => (
                                    <li key={idx}>[ {spec} ]</li>
                                ))}
                            </ul>
                        </div>

                        <div className="material-details">
                            <div className="detail-item">
                                <span className="label-micro">Fabrication</span>
                                <p>{product.details.material}</p>
                            </div>
                            <div className="detail-item">
                                <span className="label-micro">Fit Profile</span>
                                <p>{product.details.fit}</p>
                            </div>
                            <div className="detail-item">
                                <span className="label-micro">System Care</span>
                                <p>{product.details.care}</p>
                            </div>
                        </div>

                        <footer className="detail-footer">
                            <button 
                                className="align-btn interactive"
                                onClick={() => {
                                    onAddToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        img: product.img
                                    });
                                }}
                            >
                                Initiate Alignment [Add to Cart]
                            </button>
                        </footer>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductDetailOverlay;
