import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import AtmosHome from './pages/AtmosHome';
import UnrawLayout from './pages/UnrawLayout';
import UnrawProfile from './pages/UnrawProfile';
import UnrawDiscography from './pages/UnrawDiscography';
import UnrawNews from './pages/UnrawNews';
import Shop from './pages/Shop';
import LandingPage from './pages/LandingPage';
import NewsFeed from './pages/NewsFeed';
import './styles/global.css';

import { LenisContext } from './context/LenisContext';

const AppLayout: React.FC = () => {
    const location = useLocation();
    const [lenis, setLenis] = useState<Lenis | null>(null);

    // Initialize Lenis once
    useLayoutEffect(() => {
        const wrapper = document.getElementById('cosmos-scroll-wrapper');
        const content = document.getElementById('cosmos-scroll-content');

        if (wrapper && content) {
            const instance = new Lenis({
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

            setLenis(instance);

            function raf(time: number) {
                instance.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            return () => {
                instance.destroy();
                setLenis(null);
            };
        }
    }, []);

    // Global scroll reset on route change
    useLayoutEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [location.pathname, lenis]);

    return (
        <LenisContext.Provider value={{ lenis }}>
            <div className="app-root">
                <Routes>
                    <Route path="/" element={<AtmosHome />}>
                        <Route index element={<LandingPage />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="unraw" element={<UnrawLayout />}>
                            <Route index element={<UnrawProfile />} />
                            <Route path="profile" element={<UnrawProfile />} />
                            <Route path="discography" element={<UnrawDiscography />} />
                            <Route path="news" element={<UnrawNews />} />
                        </Route>
                        <Route path="news" element={<NewsFeed />} />
                        <Route path="members/:id" element={<UnrawProfile />} />
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
