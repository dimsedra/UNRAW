import React from 'react';

const NoiseOverlay: React.FC = () => {
    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
                opacity: 0.05,
                background: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>')`
            }}
        />
    );
};

export default NoiseOverlay;
