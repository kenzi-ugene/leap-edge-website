/** Curated Unsplash interior design samples mapped to image slots. */
export const INTERIOR_IMAGES = {
    'hero-main': {
        src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=85',
        alt: 'Luxury living room with floor-to-ceiling windows',
    },
    'studio-wide': {
        src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
        alt: 'Design studio interior',
    },
    'studio-detail': {
        src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=85',
        alt: 'Material samples and textures',
    },
    'studio-founders': {
        src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1000&q=85',
        alt: 'Architectural interior detail',
    },
    'proj-stillwater': {
        src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1000&q=85',
        alt: 'Stillwater Residence — lakeside living',
    },
    'proj-vireo': {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85',
        alt: 'Casa Vireo — tropical modern living',
    },
    'proj-amber': {
        src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=85',
        alt: 'Amber Ridge — warm contemporary lounge',
    },
    'proj-ledger': {
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=85',
        alt: 'The Ledger House — gallery-like interior',
    },
    'proj-atrium': {
        src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=85',
        alt: 'The Atrium Home — skylit hall',
    },
    'proj-serene': {
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85',
        alt: 'Serene Court — quiet luxury living',
    },
    'proj-garden': {
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=85',
        alt: 'The Garden Wing — indoor-outdoor flow',
    },
    'proj-halcyon': {
        src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000&q=85',
        alt: 'Halcyon House — refined terrace home',
    },
    'sp-living': {
        src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85',
        alt: 'Formal living room',
    },
    'sp-family': {
        src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',
        alt: 'Family hall',
    },
    'sp-dry': {
        src: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=85',
        alt: 'Dry kitchen with island',
    },
    'sp-wet': {
        src: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=85',
        alt: 'Wet kitchen',
    },
    'sp-master': {
        src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85',
        alt: 'Master suite bedroom',
    },
    'sp-wardrobe': {
        src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85',
        alt: 'Walk-in wardrobe',
    },
    'sp-bath': {
        src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=85',
        alt: 'Master bathroom',
    },
    'sp-office': {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85',
        alt: 'Home office',
    },
    'sp-lanai': {
        src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=85',
        alt: 'Outdoor lanai',
    },
};

/** Verified fallback pool — Picsum seeds always resolve (no 404s). */
export const FALLBACK_POOL = [
    'https://picsum.photos/seed/leap-edge-living/1200/800',
    'https://picsum.photos/seed/leap-edge-kitchen/1200/800',
    'https://picsum.photos/seed/leap-edge-bedroom/1200/800',
    'https://picsum.photos/seed/leap-edge-bath/1200/800',
    'https://picsum.photos/seed/leap-edge-office/1200/800',
];

/**
 * @param {string} [slotId]
 * @param {string} [placeholder]
 * @returns {{ src: string, alt: string }}
 */
export function getInteriorImage(slotId, placeholder = '') {
    if (slotId && INTERIOR_IMAGES[slotId]) {
        return INTERIOR_IMAGES[slotId];
    }

    const hash = (slotId || placeholder).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const src = FALLBACK_POOL[hash % FALLBACK_POOL.length];

    return { src, alt: placeholder || 'Interior design sample' };
}
