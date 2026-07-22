/** Shared layout, colour, and typography styles for Leap Edge pages. */

/** Core palette — friendly, high-contrast, information-first. */
export const COLORS = {
    ink: '#16233A',
    body: '#47546B',
    muted: '#7A8699',
    line: '#E4E8EF',
    bg: '#FFFFFF',
    band: '#F5F7FA',
    dark: '#16233A',
};

export const page = {
    fontFamily: "'Jost',sans-serif",
    color: COLORS.ink,
    background: COLORS.bg,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
};

export const section = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '72px 40px',
};

export const eyebrow = {
    fontSize: '13px',
    letterSpacing: '.12em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    fontWeight: '600',
    marginBottom: '14px',
};

export const h1 = {
    fontFamily: "'Jost',sans-serif",
    fontSize: 'clamp(34px,4.2vw,52px)',
    fontWeight: '700',
    margin: '0 0 20px',
    lineHeight: '1.15',
    letterSpacing: '-.01em',
    color: COLORS.ink,
};

export const h2 = {
    fontFamily: "'Jost',sans-serif",
    fontSize: 'clamp(28px,3.2vw,38px)',
    fontWeight: '700',
    margin: '0',
    lineHeight: '1.2',
    letterSpacing: '-.01em',
    color: COLORS.ink,
};

export const h3 = {
    fontFamily: "'Jost',sans-serif",
    fontSize: '20px',
    fontWeight: '600',
    margin: '0',
    lineHeight: '1.3',
    color: COLORS.ink,
};

export const body = {
    fontSize: '17px',
    lineHeight: '1.7',
    color: COLORS.body,
    fontWeight: '400',
};

export const small = {
    fontSize: '14.5px',
    lineHeight: '1.65',
    color: COLORS.body,
};

export const link = {
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    color: 'var(--accent)',
};

export const btnPrimary = {
    cursor: 'pointer',
    background: 'var(--accent)',
    color: '#FFFFFF',
    border: '1px solid var(--accent)',
    borderRadius: '8px',
    fontFamily: "'Jost',sans-serif",
    fontSize: '15.5px',
    fontWeight: '600',
    padding: '15px 30px',
};

export const btnSecondary = {
    cursor: 'pointer',
    background: '#FFFFFF',
    color: COLORS.ink,
    border: `1.5px solid ${COLORS.line}`,
    borderRadius: '8px',
    fontFamily: "'Jost',sans-serif",
    fontSize: '15.5px',
    fontWeight: '600',
    padding: '15px 30px',
};

export const card = {
    background: '#FFFFFF',
    border: `1px solid ${COLORS.line}`,
    borderRadius: '14px',
    overflow: 'hidden',
};

export const imgBlock = (height) => ({
    width: '100%',
    height,
    display: 'block',
    borderRadius: '14px',
});
