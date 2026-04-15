import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShopSearchProps {
    query: string;
    onQueryChange: (query: string) => void;
    resultsCount: number;
    isFloating: boolean;
}

const ShopSearch: React.FC<ShopSearchProps> = ({ query, onQueryChange, resultsCount, isFloating }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const effectivelyExpanded = isExpanded || (query.length > 0 && isFloating);

    return (
        <div className={`search-island-container ${isFloating ? 'detached' : 'inline'}`}>
            <motion.div 
                className={`search-island ${isFloating ? 'floating' : ''} ${(!effectivelyExpanded && isFloating) ? 'pill' : 'expanded'}`}
                layout
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                onClick={() => isFloating && setIsExpanded(true)}
            >
                <div className="search-glyph">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                    </svg>
                </div>
                
                <AnimatePresence mode="wait">
                    {(!effectivelyExpanded && isFloating) ? (
                        <motion.div 
                            key="status"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="results-indicator"
                        >
                            {query ? `"${query}"` : `SEARCH...`}
                        </motion.div>
                    ) : (
                        <motion.input
                            key="input"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            type="text"
                            className="search-input"
                            placeholder="Search Product..."
                            value={query}
                            onChange={(e) => onQueryChange(e.target.value)}
                            onBlur={() => {
                                if (query.length === 0) setIsExpanded(false);
                            }}
                            autoFocus={effectivelyExpanded && isFloating}
                        />
                    )}
                </AnimatePresence>

                {effectivelyExpanded && (
                    <motion.div 
                        className="results-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {resultsCount}
                    </motion.div>
                )}
            </motion.div>

            {/* Backdrop for expanded floating state to allow closing */}
            {effectivelyExpanded && isFloating && (
                <div 
                    className="search-backdrop" 
                    style={{ position: 'fixed', inset: 0, zIndex: 899 }} 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                    }}
                />
            )}
        </div>
    );
};

export default ShopSearch;
