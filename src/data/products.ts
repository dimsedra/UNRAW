export interface Product {
    id: string;
    name: string;
    price: string;
    series: string;
    img: string;
    gallery?: string[];
    description: string;
    specs: string[];
    details: {
        material: string;
        fit: string;
        care: string;
    };
}

export const products: Product[] = [
    {
        id: 'a-01',
        name: 'Tactical Urban Cargos',
        series: 'Collection A // Season 01',
        price: '₩320,000',
        img: '/assets/members/danielle/Capsule-A-Danielle.jpg',
        gallery: [
            '/assets/members/danielle/Capsule-A-Danielle.jpg',
            '/assets/members/danielle/danielle-shop-photos_-_white-tank-top.jpg'
        ],
        description: 'High-waisted utility pants featuring a classic woodland camouflage print. Designed with oversized pockets for a rugged aesthetic and a structured silhouette that captures modern streetwear trends.',
        specs: [
            'Oversized Utility Pockets',
            'Reinforced Knee Articulation',
            'Adjustable Hem Toggles',
            'Y2K Architectural Fit'
        ],
        details: {
            material: '100% Cotton Ripstop // Heavyweight',
            fit: 'Extra Baggy // High Rise',
            care: 'Machine Wash Cold // Tumble Dry Low'
        }
    },
    {
        id: 'a-02',
        name: 'Racing Jacket',
        series: 'Collection A // Season 01',
        price: '₩450,000',
        img: '/assets/members/minji/Capsule_A-Minji-2.jpg',
        gallery: [
            '/assets/members/minji/Capsule_A-Minji-2.jpg',
            '/assets/members/minji/minji-photoshoot_-_corduroy jacket.jpg'
        ],
        description: 'A vibrant technical jacket with bold color-blocking and reflective details. Its oversized, comfortable fit offers a retro-sporty look that prioritizes both warmth and style.',
        specs: [
            'Reflective Piping Details',
            'Water-Resistant Technical Shell',
            'Internal Mesh Lining',
            'Dual-Way Front Zipper'
        ],
        details: {
            material: '100% Recycled Nylon Shell',
            fit: 'Voluminous // Dropped Shoulder',
            care: 'Professional Dry Clean Only'
        }
    },
    {
        id: 'a-03',
        name: 'Indigo Denim Jacket',
        series: 'Collection A // Season 01',
        price: '₩280,000',
        img: '/assets/members/minji/Capsule_A-Minji.jpg',
        gallery: [
            '/assets/members/minji/Capsule_A-Minji.jpg'
        ],
        description: 'A timeless denim jacket featuring a clean, medium-wash finish. This versatile staple piece is built with durable materials and structured tailoring for lasting wear.',
        specs: [
            'Authentic Metal Hardware',
            'Contrast Topstitching',
            'Reinforced Chest Pockets',
            'Adjustable Waist Tabs'
        ],
        details: {
            material: '14oz Japanese Selvedge Denim',
            fit: 'Boxy // True to Size',
            care: 'Wash Inside Out // Cold Water'
        }
    },
    {
        id: 'a-04',
        name: 'Raw-Edge Denim Jacket',
        series: 'Collection A // Season 02',
        price: '₩1,850,000',
        img: '/assets/members/yujin/Capsule-A-Yujin.jpg',
        gallery: [
            '/assets/members/yujin/Capsule-A-Yujin.jpg',
            '/assets/members/yujin/yujin-apparel-shot_-_white-art-printed-tshirt.jpg'
        ],
        description: 'An avant-garde piece combining a structured waist with a unique ruffled hem. Blends the utility of denim with a sophisticated, form-fitting silhouette.',
        specs: [
            'Structural Cinched Waist',
            'Raw-Edge Ruffled Hem',
            'Corset-Style Tooling',
            'Hand-Finished Distressing'
        ],
        details: {
            material: 'Mixed Material // Distressed Denim',
            fit: 'Avant-Garde // Form Fitting',
            care: 'Hand Wash Only // Dry Flat'
        }
    }
];
