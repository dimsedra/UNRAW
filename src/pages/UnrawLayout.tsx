import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { UnrawNavbar } from '../components';

const UnrawLayout: React.FC = () => {
    // Outlet context from AtmosHome (AtmosHome provides these)
    const context = useOutletContext();

    return (
        <div className="unraw-ecosystem-layout" style={{ position: 'relative' }}>
            {/* The individual pages will be rendered here */}
            <Outlet context={context} />
            
            {/* The persistent floating navigation for UNRAW */}
            <UnrawNavbar />
        </div>
    );
};

export default UnrawLayout;
