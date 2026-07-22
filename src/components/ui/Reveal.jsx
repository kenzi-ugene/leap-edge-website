import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered motion wrapper. Text stays visible — only subtle slide-in.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {number} [props.delay] ms
 * @param {string} [props.as] HTML tag
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', style }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return undefined;
        }

        const show = () => setVisible(true);
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    show();
                    observer.disconnect();
                }
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
        );

        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
            show();
        } else {
            observer.observe(node);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
            style={{ ...style, transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    );
}
