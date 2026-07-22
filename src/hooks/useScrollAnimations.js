import { useEffect } from 'react';

/**
 * Header scroll shadow only. Page motion is handled by the Reveal component.
 *
 * @param {string} pageKey Re-run when the active page changes.
 */
export function useScrollAnimations(pageKey = 'home') {
    useEffect(() => {
        const header = document.querySelector('header');
        if (!header) {
            return undefined;
        }

        const onScroll = () => {
            header.classList.toggle('header-scrolled', window.scrollY > 24);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            header.classList.remove('header-scrolled');
        };
    }, [pageKey]);
}
