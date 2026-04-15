import React from 'react';
import { useOutletContext } from 'react-router-dom';
import LandingHero from '../components/LandingHero';
import ShopPreview from '../components/ShopPreview';
import RosterPreview from '../components/RosterPreview';
import NewsPreview from '../components/NewsPreview';

const LandingPage: React.FC = () => {
    // We get the scrollRef from AtmosHome's Outlet context
    const { scrollRef } = useOutletContext<{ scrollRef: React.RefObject<HTMLDivElement> }>();

    return (
        <div className="landing-page">
            <LandingHero scrollRef={scrollRef} />
            
            <div className="previews-container">
                <ShopPreview />
                <RosterPreview />
                <NewsPreview />
            </div>

            <style>{`
                .landing-page {
                    width: 100%;
                }
                .previews-container {
                    background: var(--bg-void);
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
