import React from 'react';

import { useOutletContext } from 'react-router-dom';
import { Hero, Manifesto, MemberPanel, ScrollProgress } from '../components';
import { members } from '../data/members';

const UnrawProfile: React.FC = () => {
    const { scrollRef } = useOutletContext<{ scrollRef: React.RefObject<HTMLDivElement> }>();

    return (
        <div className="unraw-profile-wrapper" style={{ position: 'relative' }}>
            <ScrollProgress containerRef={scrollRef} />

            <Hero />
            <Manifesto scrollRef={scrollRef} />
            <section className="members-container" style={{ position: 'relative', background: 'var(--obsidian)' }}>
                {members.map(member => (
                    <MemberPanel key={member.id} member={member} scrollRef={scrollRef} />
                ))}
            </section>
        </div>
    );
};

export default UnrawProfile;
