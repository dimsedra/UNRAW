import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import AtmosHome from './pages/AtmosHome';
import UnrawHome from './pages/UnrawHome';
import Shop from './pages/Shop';
import LandingPage from './pages/LandingPage';
import NewsFeed from './pages/NewsFeed';
import './styles/global.css';

import { LenisContext } from './context/LenisContext';

const AppLayout: React.FC = () => {
    const location = useLocation();
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useLayoutEffect(() => {
        const wrapper = document.getElementById('cosmos-scroll-wrapper');
        const content = document.getElementById('cosmos-scroll-content');

        let lenisInstance: Lenis | null = null;

        if (wrapper && content) {
            lenisInstance = new Lenis({
                wrapper: wrapper,
                content: content,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                lerp: 0.1,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1.2,
                touchMultiplier: 2,
                infinite: false,
            });

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLenis(lenisInstance);

            function raf(time: number) {
                lenisInstance?.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
        }

        // Global scroll reset on route change
        if (lenisInstance) {
            lenisInstance.scrollTo(0, { immediate: true });
        }

        return () => {
            if (lenisInstance) {
                lenisInstance.destroy();
                setLenis(null);
            }
        };
    }, [location.pathname]);

    return (
        <LenisContext.Provider value={{ lenis }}>
            <div className="app-root">
                <Routes>
                    <Route path="/" element={<AtmosHome />}>
                        <Route index element={<LandingPage />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="unraw" element={<UnrawHome />} />
                        <Route path="news" element={<NewsFeed />} />
                        <Route path="members/:id" element={<UnrawHome />} />
                    </Route>
                </Routes>
            </div>
        </LenisContext.Provider>
    );
};
const App: React.FC = () => {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
};

export default App;
