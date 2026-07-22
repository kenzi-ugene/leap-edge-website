import { useEffect, useRef, useState } from 'react';
import { FALLBACK_POOL, getInteriorImage } from './data/interiorImages';

/**
 * Interior image with hover interaction and scroll reveal.
 *
 * @param {object} props
 * @param {string} [props.id]
 * @param {string} [props.placeholder]
 * @param {string} [props.shape]
 * @param {Record<string, string>} [props.style]
 * @returns {JSX.Element}
 */
export default function ImageSlot({ id, placeholder, shape = 'rect', style = {} }) {
    const containerRef = useRef(null);
    const { src: initialSrc, alt } = getInteriorImage(id, placeholder);
    const [src, setSrc] = useState(initialSrc);
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const triedRef = useRef(new Set([initialSrc]));

    const markVisible = () => {
        containerRef.current?.classList.add('is-visible');
    };

    useEffect(() => {
        setSrc(initialSrc);
        setLoaded(false);
        setFailed(false);
        triedRef.current = new Set([initialSrc]);
    }, [initialSrc]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) {
            return undefined;
        }

        const reveal = () => markVisible();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        reveal();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.05, rootMargin: '80px 0px' },
        );

        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
            reveal();
        } else {
            observer.observe(node);
        }

        return () => observer.disconnect();
    }, [id, src]);

    const handleLoad = () => {
        setLoaded(true);
        setFailed(false);
        markVisible();
    };

    const handleError = () => {
        const next = FALLBACK_POOL.find((url) => !triedRef.current.has(url));
        if (next) {
            triedRef.current.add(next);
            setLoaded(false);
            setSrc(next);
            return;
        }

        setFailed(true);
        setLoaded(true);
        markVisible();
    };

    const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '0';
    const isHero = id === 'hero-main';

    return (
        <div
            ref={containerRef}
            id={id}
            className={`image-slot${loaded ? ' image-slot--loaded' : ''}${failed ? ' image-slot--failed' : ''}`}
            style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#E8E2D8',
                borderRadius,
                minHeight: style.height || '200px',
                ...style,
            }}
        >
            <div className="image-slot__shimmer" aria-hidden="true" />
            {!failed && (
                <img
                    className="image-slot__img"
                    src={src}
                    alt={alt}
                    loading={isHero ? 'eager' : 'lazy'}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
            {failed && (
                <div className="image-slot__fallback" aria-hidden="true">
                    {placeholder || alt}
                </div>
            )}
            <div className="image-slot__overlay">
                <span className="image-slot__caption">{placeholder || alt}</span>
            </div>
        </div>
    );
}
