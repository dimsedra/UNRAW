import React from 'react';
import Lenis from 'lenis';

export const LenisContext = React.createContext<{ lenis: Lenis | null }>({ lenis: null });

export const useLenis = () => React.useContext(LenisContext);
