import { COLORS, btnPrimary } from '../../styles/theme';

/**
 * @param {{ navItems: Array, goHome: Function, goContact: Function }} props
 */
export default function Header({ navItems, goHome, goContact }) {
    return (
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: 'rgba(255,255,255,.96)',
                backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${COLORS.line}`,
            }}
        >
            <div
                style={{
                    background: COLORS.dark,
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '500',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '8px clamp(20px,3.5vw,40px)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: '8px 24px',
                    }}
                >
                    <span>Design &amp; build for landed homes across the Klang Valley</span>
                    <span>
                        Call us: +60 3 7931 2288 · Mon–Sat, 10am–7pm
                    </span>
                </div>
            </div>
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '14px clamp(20px,3.5vw,40px)',
                    minHeight: '76px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px clamp(16px,2vw,28px)',
                }}
            >
                <div
                    onClick={goHome}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: '9px', whiteSpace: 'nowrap' }}
                >
                    <span style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-.01em', color: COLORS.ink }}>
                        Leap Edge
                    </span>
                    <span style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '600' }}>
                        Interiors
                    </span>
                </div>
                <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px clamp(14px,1.8vw,26px)' }}>
                    {navItems.map((n) => (
                        <span
                            key={n.label}
                            onClick={n.go}
                            style={{
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: n.weight,
                                color: n.color,
                                padding: '6px 0',
                                borderBottom: `2px solid ${n.underline}`,
                            }}
                        >
                            {n.label}
                        </span>
                    ))}
                </nav>
                <button
                    type="button"
                    onClick={goContact}
                    style={{ ...btnPrimary, padding: '12px 22px', whiteSpace: 'nowrap' }}
                >
                    Get a Free Quote
                </button>
            </div>
        </header>
    );
}
