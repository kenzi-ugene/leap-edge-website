import { COLORS } from '../../styles/theme';

/**
 * @param {{ navItems: Array }} props
 */
export default function Footer({ navItems }) {
    return (
        <footer style={{ background: COLORS.dark, color: '#FFFFFF' }}>
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '56px 40px 44px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
                    gap: '44px',
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '22px', fontWeight: '700' }}>Leap Edge</span>
                        <span style={{ fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7FB2F0', fontWeight: '600' }}>
                            Interiors
                        </span>
                    </div>
                    <p style={{ fontSize: '14.5px', lineHeight: '1.75', color: 'rgba(255,255,255,.75)', maxWidth: '340px', margin: 0 }}>
                        Design &amp; build for landed homes across the Klang Valley since 2012.
                        CIDB Grade G7 registered contractor with in-house designers and builders.
                    </p>
                </div>
                <div>
                    <div style={{ fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', fontWeight: '600', marginBottom: '16px' }}>Explore</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                        {navItems.map((n) => (
                            <span
                                key={n.label}
                                onClick={n.go}
                                style={{ cursor: 'pointer', fontSize: '14.5px', color: 'rgba(255,255,255,.85)' }}
                            >
                                {n.labelCase}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', fontWeight: '600', marginBottom: '16px' }}>Contact</div>
                    <div style={{ fontSize: '14.5px', lineHeight: '2', color: 'rgba(255,255,255,.85)' }}>
                        23, Jalan Profesor Diraja Ungku Aziz<br />
                        Seksyen 13, 46200 Petaling Jaya<br />
                        +60 3 7931 2288<br />
                        hello@leapedge.my<br />
                        Mon–Sat, 10:00am – 7:00pm
                    </div>
                </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.14)' }}>
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '18px 40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,.6)',
                    }}
                >
                    <span>© 2026 Leap Edge Sdn Bhd (1234567-X)</span>
                    <span>Kuala Lumpur · Selangor</span>
                </div>
            </div>
        </footer>
    );
}
