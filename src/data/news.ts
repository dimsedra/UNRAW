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
        title: 'Collection A: Modern Utility Pack',
        excerpt: 'Introducing the new Collection A, where functional design meets modern minimalism.',
        content: 'The launch of Collection A marks a significant milestone for ATMOS. Each piece is designed with purpose, stripping away the unnecessary to focus on essential utility and performance. From the Tactical Street Cargos to the Racing Shield Windbreaker, the collection embodies our goal: purposeful design for the modern environment.',
        img: '/assets/members/danielle/Capsule-A-Danielle.jpg',
        isFeatured: true
    },
    {
        id: 'news-02',
        date: '2026.04.08',
        category: 'SYSTEM',
        title: 'New Release: Plateau Vol. 1',
        excerpt: 'UNRAW presents the first volume of Plateau, an exploration of cinematic soundscapes.',
        content: 'Plateau Vol. 1 is more than just music; it’s an immersive experience. Designed to create a consistent mood across any listening environment, this project serves as the foundational sound for the UNRAW creative series.',
        img: '/assets/members/natty/natty-unraw-profile-3.jpg'
    },
    {
        id: 'news-03',
        date: '2026.04.05',
        category: 'MANIFESTO',
        title: 'The Beauty of Simplicity',
        excerpt: 'Exploring our philosophy of removing the excess to focus on what truly matters.',
        content: 'In a world of constant noise, ATMOS advocates for the power of simplification. By removing the unnecessary, we create space for focus and the deliberate evolution of style.',
        img: '/assets/members/yujin/yujin-atmos-philosophy.jpg'
    }
];

export const events: EventItem[] = [
    {
        id: 'event-01',
        date: '2026.05.01',
        title: 'Collection A Pop-up Store',
        location: 'Seoul // Seongsu Base',
        type: 'PHYSICAL'
    },
    {
        id: 'event-02',
        date: '2026.05.15',
        title: 'Release Event: Phase 02',
        location: 'Global // Digital Stream',
        type: 'DIGITAL'
    }
];
