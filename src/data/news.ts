export interface NewsArticle {
    id: string;
    date: string;
    category: 'RELEASE' | 'SYSTEM' | 'MANIFESTO' | 'CULTURE';
    title: string;
    excerpt: string;
    content: string;
    img: string;
    isFeatured?: boolean;
}

export interface EventItem {
    id: string;
    date: string;
    title: string;
    location: string;
    type: 'PHYSICAL' | 'DIGITAL';
}

export const newsArticles: NewsArticle[] = [
    {
        id: 'news-01',
        date: '2026.04.12',
        category: 'RELEASE',
        title: 'Capsule A: Tactical Utility Deployment',
        excerpt: 'Exploring the architectural boundaries of the new Capsule A collection, where performance meets brutalist minimalism.',
        content: 'The launch of Capsule A marks a significant milestone in the ATMOS ecosystem. Each piece is designed with deliberate intent, stripping away the decorative to reveal raw technical function. From the Tactical Street Cargos to the Racing Shield Windbreaker, the collection embodies our operating principle of being "Deliberate, Not Decorative."',
        img: '/assets/members/danielle/Capsule-A-Danielle.jpg',
        isFeatured: true
    },
    {
        id: 'news-02',
        date: '2026.04.08',
        category: 'SYSTEM',
        title: 'Plateau Vol. 1: Atmospheric Integration',
        excerpt: 'UNRAW initiates the first phase of digital audio state integration with the release of Plateau Vol. 1.',
        content: 'Plateau Vol. 1 is more than an album; it is a sustained state of being. Developed to maintain a consistent atmosphere across high-fidelity environments, the project serves as the sonic foundation for the UNRAW creative cycle.',
        img: '/assets/members/natty/natty-unraw-profile-3.jpg'
    },
    {
        id: 'news-03',
        date: '2026.04.05',
        category: 'MANIFESTO',
        title: 'On the Necessity of Absence',
        excerpt: 'A deep dive into the philosophy of stripping excess until only the core function remains.',
        content: 'In an era of digital noise, ATMOS advocates for the necessity of absence. By removing the unnecessary, we create space for focus, for presence, and for the deliberate evolution of identity.',
        img: '/assets/members/yujin/yujin-atmos-philosophy.jpg'
    }
];

export const events: EventItem[] = [
    {
        id: 'event-01',
        date: '2026.05.01',
        title: 'Capsule A Pop-up Residency',
        location: 'Seoul // Seongsu Base',
        type: 'PHYSICAL'
    },
    {
        id: 'event-02',
        date: '2026.05.15',
        title: 'System State 02: Launch Event',
        location: 'Global // Digital Stream',
        type: 'DIGITAL'
    }
];
