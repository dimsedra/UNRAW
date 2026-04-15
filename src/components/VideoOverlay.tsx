import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import type { YouTubeProps } from 'react-youtube';
import type { VisualNode } from '../data/visuals';

interface VideoOverlayProps {
    node: VisualNode;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onVideoStateChange: (state: string) => void;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ 
    node, 
    onClose, 
    onNext, 
    onPrev, 
    onVideoStateChange
}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [showHUD, setShowHUD] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-hide HUD logic
    useEffect(() => {
        let timeout: ReturnType<typeof setInterval>;
        const resetTimeout = () => {
            setShowHUD(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setShowHUD(false);
            }, 3000);
        };

        window.addEventListener('mousemove', resetTimeout);
        resetTimeout();

        return () => {
            window.removeEventListener('mousemove', resetTimeout);
            clearTimeout(timeout);
        };
    }, []);

    const playerOptions: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            enablejsapi: 1,
        },
    };

    return (
        <motion.div 
            className={`video-system-overlay ${isMobile ? 'takeover-mode' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent
        >
            <div className={`viewport-container ${isMobile ? 'full' : 'contained'}`}>
                {/* Modern Minimalist Header */}
                <motion.header 
                    className="overlay-header"
                    animate={{ opacity: showHUD ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="visual-title">{node.title}</span>
                </motion.header>

                <div className="video-viewport">
                    <YouTube 
                        videoId={node.id} 
                        opts={playerOptions} 
                        onStateChange={(e) => {
                            if (e.data === 0) onVideoStateChange('ended');
                        }}
                        className="youtube-embed"
                    />
                </div>
            </div>

            {/* Floating Obsidian Control Pill - Moved outside to anchor to screen bottom */}
            <motion.div 
                className="control-anchor"
                animate={{ opacity: showHUD ? 1 : 0, y: showHUD ? 0 : 20 }}
                transition={{ duration: 0.5 }}
            >
                <div className="obsidian-pill">
                    <button className="pill-btn nav" onClick={onPrev}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <div className="pill-divider" />
                    <button className="pill-btn close" onClick={onClose}>
                        <span>CLOSE</span>
                    </button>
                    <div className="pill-divider" />
                    <button className="pill-btn nav" onClick={onNext}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </motion.div>

            <style>{`
                .video-system-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(13, 12, 11, 0.98);
                    backdrop-filter: blur(24px);
                    z-index: 11000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .viewport-container {
                    position: relative;
                    width: 100%;
                    max-width: 1280px;
                    aspect-ratio: 16/9;
                    background: #000;
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 50px 120px rgba(0,0,0,0.8);
                }

                .viewport-container.full {
                    max-width: 100%;
                    height: 100%;
                    aspect-ratio: auto;
                    border: none;
                }

                .overlay-header {
                    position: absolute;
                    top: 1.5rem;
                    left: 0;
                    right: 0;
                    text-align: center;
                    z-index: 20;
                    pointer-events: none;
                }

                .visual-title {
                    font-family: var(--font-primary);
                    font-size: 0.75rem;
                    letter-spacing: 0.25em;
                    color: rgba(255,255,255,0.6);
                    text-transform: uppercase;
                }

                .video-viewport {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .youtube-embed {
                    width: 100%;
                    height: 100%;
                }

                .control-anchor {
                    position: absolute;
                    bottom: 3rem;
                    left: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    z-index: 50;
                }

                .obsidian-pill {
                    display: flex;
                    align-items: center;
                    background: rgba(20, 18, 17, 0.6);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 0.4rem 1rem;
                    border-radius: 100px;
                    gap: 0.5rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }

                .pill-btn {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.6);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                    font-family: var(--font-functional);
                    font-size: 0.65rem;
                    letter-spacing: 0.1em;
                    height: 32px;
                }

                .pill-btn:hover {
                    color: #fff;
                }

                .pill-btn.close {
                   padding: 0 1rem;
                }

                .pill-divider {
                    width: 1px;
                    height: 16px;
                    background: rgba(255,255,255,0.1);
                }

                @media (max-width: 1024px) {
                    .video-viewport {
                        display: flex;
                        align-items: center;
                    }
                    .youtube-embed {
                        height: 56.25vw;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default VideoOverlay;
