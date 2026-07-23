import { useState } from 'react';
import { COLORS, btnPrimary } from '../../styles/theme';
import logo from '../../assets/logo.png';

/**
 * @param {{ navItems: Array, goHome: Function, goContact: Function }} props
 */
export default function Header({ navItems, goHome, goContact }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

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
                    <span>Based in Bukit Mertajam, serving across Penang Mainland, Island, Kedah &amp; Perak</span>
                    <span>
                        Contact us: WhatsApp +60 17-438 9294 · Mon–Sat, 10am–7pm
                    </span>
                </div>
            </div>
            <div
                className="header-bar"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '14px clamp(20px,3.5vw,40px)',
                    minHeight: '76px',
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px clamp(16px,2vw,28px)',
                }}
            >
                <div
                    onClick={goHome}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px', whiteSpace: 'nowrap' }}
                >
                    <img src={logo} alt="Leap Edge" style={{ height: '44px', width: 'auto', display: 'block' }} />
                    <span style={{ fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '600' }}>
                        Renovation
                    </span>
                </div>
                <div
                    className="header-nav-row"
                    style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        alignItems: 'center',
                        gap: 'clamp(16px,2vw,28px)',
                        minWidth: 0,
                    }}
                >
                    <nav
                        className="header-nav"
                        style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                            gap: '8px clamp(12px,1.6vw,24px)',
                            minWidth: 0,
                        }}
                    >
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
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {n.label}
                            </span>
                        ))}
                    </nav>
                    <button
                        type="button"
                        onClick={goContact}
                        className="header-cta-desktop"
                        style={{ ...btnPrimary, padding: '12px 22px', whiteSpace: 'nowrap', flexShrink: 0 }}
                    >
                        Arrange a Site Consultation
                    </button>
                </div>
                <button
                    type="button"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                    className={`header-toggle${menuOpen ? ' is-open' : ''}`}
                >
                    <span className="header-toggle-bar" />
                    <span className="header-toggle-bar" />
                    <span className="header-toggle-bar" />
                </button>
            </div>
            <div className={`header-mobile-wrap${menuOpen ? ' is-open' : ''}`}>
                <nav className="header-mobile-panel">
                    {navItems.map((n, i) => (
                        <span
                            key={n.label}
                            onClick={() => {
                                n.go();
                                closeMenu();
                            }}
                            style={{
                                cursor: 'pointer',
                                fontWeight: n.weight,
                                color: n.color,
                                borderBottom: `2px solid ${n.underline}`,
                                transitionDelay: menuOpen ? `${i * 35}ms` : '0ms',
                            }}
                        >
                            {n.label}
                        </span>
                    ))}
                    <button
                        type="button"
                        onClick={() => {
                            goContact();
                            closeMenu();
                        }}
                        style={{
                            ...btnPrimary,
                            padding: '12px 22px',
                            transitionDelay: menuOpen ? `${navItems.length * 35}ms` : '0ms',
                        }}
                    >
                        Arrange a Site Consultation
                    </button>
                </nav>
            </div>
        </header>
    );
}
