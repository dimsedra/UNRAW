import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import type { Product } from '../data/products';
import { ProductDetailOverlay, ShopNavbar } from '../components';
import { useLenis } from '../context/LenisContext';
import type { CartItem } from './AtmosHome';
import '../styles/atmos.css';

const Shop: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { lenis } = useLenis();
    
    const [searchQuery, setSearchQuery] = useState('');
    
    // Acquire the layout context function and data
    const { 
        handleAddToCart, 
        cartItems, 
        isCartOpen, 
        setIsCartOpen,
        removeFromCart,
        updateQuantity
    } = useOutletContext<{ 
        handleAddToCart: (product: Omit<CartItem, 'quantity'>) => void,
        cartItems: CartItem[],
        isCartOpen: boolean,
        setIsCartOpen: (open: boolean) => void,
        removeFromCart: (id: string) => void,
        updateQuantity: (id: string, delta: number) => void
    }>();

    // Deep Linking: Derive selected product from URL
    const productId = searchParams.get('id');
    const selectedProduct = productId ? (products.find(p => p.id === productId) || null) : null;
    
    // Scroll reset for deep link entry
    useEffect(() => {
        if (selectedProduct && lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [productId, lenis, selectedProduct]); // Only trigger on initial load/change of the ID


    // Instant Filtering Logic
    const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.series.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.specs.some(spec => spec.toLowerCase().includes(query))
        );
    });

    // Background Scroll Lock (Architectural Control)
    useEffect(() => {
        if (lenis) {
            if (selectedProduct) {
                lenis.stop();
            } else {
                lenis.start();
            }
        }
        return () => {
            if (lenis) lenis.start();
        };
    }, [selectedProduct, lenis]);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => {
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
        return acc + (priceNum * item.quantity);
    }, 0);
    
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

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

    const handleProductSelect = (product: Product) => {
        setSearchParams({ id: product.id });
    };

    const handleCloseOverlay = () => {
        setSearchParams({});
    };

    return (
        <section className="commerce-panel" style={{ minHeight: 'calc(100vh - 74px)', overflowX: 'hidden', position: 'relative' }}>
            <div className="panel-header grid-3 reveal-up" ref={addToRefs} style={{ transitionDelay: '0.1s' }}>
                <div className="label-micro">Apparel</div>
                <div className="label-micro" style={{ textAlign: 'center', opacity: 0.5 }}>ATMOS // COLLECTION</div>
                <div className="label-micro">Technical Essentials</div>
            </div>

            <div className="product-grid">
                {filteredProducts.map((product, idx) => (
                    <article 
                        key={product.id}
                        id={`product-${product.id}`}
                        className="product-card reveal-up active" 
                        ref={addToRefs} 
                        style={{ transitionDelay: `${(idx * 0.05)}s` }}
                    >
                        <div className="img-container interactive" onClick={() => handleProductSelect(product)}>
                            <img src={product.img} alt={product.name} className="product-img" />
                            <div className="view-specs-hotspot">
                                <span className="label-micro">View Details [→]</span>
                            </div>
                        </div>
                        <div className="product-meta">
                            <div className="product-header">
                                <h3 className="product-title interactive" onClick={() => handleProductSelect(product)}>{product.name}</h3>
                                <span className="product-price">{product.price}</span>
                            </div>
                            <p className="product-desc">{product.description}</p>
                            <div className="product-card-actions">
                                <button 
                                    className="add-to-cart-btn interactive" 
                                    onClick={() => handleAddToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        img: product.img
                                    })}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Product Detail Overlay */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductDetailOverlay 
                        product={selectedProduct} 
                        onClose={handleCloseOverlay}
                        onAddToCart={handleAddToCart}
                    />
                )}
            </AnimatePresence>

            {/* Unified Shop Navigation */}
            <ShopNavbar 
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onCartClick={() => setIsCartOpen(true)}
                cartCount={cartCount}
            />

            {/* Shop-Specific Cart Drawer Overlay */}
            <AnimatePresence>
                {isCartOpen && (
                    <motion.div 
                        className="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                    >
                        <motion.aside 
                            className="cart-drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="drawer-header">
                                <h2 className="label-micro">Your Cart</h2>
                                <button className="interactive" onClick={() => setIsCartOpen(false)}>Close [X]</button>
                            </div>

                            <div className="drawer-content">
                                {cartItems.length === 0 ? (
                                    <div className="empty-cart-msg">Your cart is currently empty.</div>
                                ) : (
                                    cartItems.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="cart-item-info">
                                                <h4>{item.name}</h4>
                                                <div className="cart-item-price">{item.price}</div>
                                                <div className="quantity-controls">
                                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                                </div>
                                            </div>
                                            <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cartItems.length > 0 && (
                                <div className="drawer-footer">
                                    <div className="subtotal-row">
                                        <span>Subtotal</span>
                                        <span>₩{subtotal.toLocaleString()}</span>
                                    </div>
                                    <button className="checkout-btn interactive">Checkout</button>
                                </div>
                            )}
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`

                .cart-overlay {
                    position: fixed;
                    top: 74px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.6);
                    backdrop-filter: blur(8px);
                    z-index: 10000;
                    display: flex;
                    justify-content: flex-end;
                }

                .cart-drawer {
                    width: 100%;
                    max-width: 500px; /* Slightly wider for better balance */
                    background: var(--bg-surface);
                    border-left: 1px solid var(--border-color);
                    display: flex;
                    flex-direction: column;
                    box-shadow: -20px 0 60px rgba(0,0,0,0.7);
                }

                @media (max-width: 768px) {
                    .cart-drawer {
                        max-width: 100%; /* Take over full screen on mobile */
                    }
                }

                .drawer-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .drawer-content {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 1.5rem;
                }

                .empty-cart-msg {
                    text-align: center;
                    margin-top: 4rem;
                    color: var(--text-tertiary);
                    font-size: 0.9rem;
                    font-family: var(--font-display);
                }

                .cart-item {
                    display: grid;
                    grid-template-columns: 80px 1fr auto;
                    gap: 1.25rem;
                    margin-bottom: 2rem;
                    align-items: center;
                    border-bottom: 1px solid rgba(223, 219, 210, 0.05);
                    padding-bottom: 1.5rem;
                }

                .cart-item-img {
                    aspect-ratio: 1/1;
                    width: 80px;
                    background: var(--bg-panel);
                    border: 1px solid var(--border-color);
                    overflow: hidden;
                }

                .cart-item-img img { width: 100%; height: 100%; object-fit: cover; }

                .cart-item-info h4 { 
                    font-size: 0.9rem; 
                    margin-bottom: 0.25rem; 
                    font-family: var(--font-display);
                }
                .cart-item-price { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem; }

                .quantity-controls {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .quantity-controls button {
                    width: 24px;
                    height: 24px;
                    border: 1px solid var(--border-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    color: var(--text-secondary);
                    background: none;
                    cursor: pointer;
                }

                .remove-item {
                    font-size: 1.5rem;
                    color: var(--text-tertiary);
                    transition: color 0.3s;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
                .remove-item:hover { color: var(--text-primary); }

                .drawer-footer {
                    padding: 2rem;
                    border-top: 1px solid var(--border-color);
                    background: var(--bg-void);
                }

                .subtotal-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 2rem;
                    font-size: 1.2rem;
                    font-family: var(--font-display);
                }

                .checkout-btn {
                    width: 100%;
                    padding: 1.5rem;
                    background: var(--text-primary);
                    color: var(--bg-void);
                    font-family: var(--font-functional);
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    border: none;
                    transition: opacity 0.3s;
                }
                .checkout-btn:hover { opacity: 0.9; }
            `}</style>
        </section>
    );
};

export default Shop;
