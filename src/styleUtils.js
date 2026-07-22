/**
 * Convert a CSS declaration string into a React style object.
 *
 * @param {string} css
 * @returns {Record<string, string>}
 */
export function toStyle(css) {
    const style = {};

    for (const part of css.split(';')) {
        const trimmed = part.trim();
        if (!trimmed) {
            continue;
        }

        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) {
            continue;
        }

        const key = trimmed.slice(0, colonIndex).trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());
        style[key] = trimmed.slice(colonIndex + 1).trim();
    }

    return style;
}
