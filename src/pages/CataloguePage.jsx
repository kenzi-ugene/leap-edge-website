import ImageSlot from '../ImageSlot';
import Reveal from '../components/ui/Reveal';
import { COLORS, body, card, eyebrow, h1, h3, section, small } from '../styles/theme';

/** @param {{ catalogueFilters: Array, filteredSpaces: Array, showPricing: boolean }} props */
export default function CataloguePage({ catalogueFilters, filteredSpaces, showPricing }) {
    return (
        <div data-screen-label="Catalogue">
            <Reveal as="section" style={{ ...section, paddingBottom: '40px' }}>
                <div style={eyebrow}>Spaces &amp; pricing</div>
                <h1 style={{ ...h1, maxWidth: '820px' }}>What each space costs, upfront</h1>
                <p style={{ ...body, maxWidth: '640px', margin: '0 0 32px' }}>
                    Real examples from completed homes — each with its dimensions, what's included, and an honest starting price. Use them to plan your own budget.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {catalogueFilters.map((f) => (
                        <button
                            key={f.label}
                            type="button"
                            onClick={f.go}
                            style={{
                                cursor: 'pointer',
                                fontFamily: "'Jost',sans-serif",
                                fontSize: '14.5px',
                                fontWeight: '600',
                                padding: '10px 22px',
                                borderRadius: '999px',
                                border: `1.5px solid ${f.border}`,
                                background: f.bg,
                                color: f.color,
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </Reveal>

            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 88px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
                {filteredSpaces.map((sp, i) => (
                    <Reveal key={sp.slotId} delay={i * 60}>
                        <div style={{ ...card, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <ImageSlot id={sp.slotId} placeholder={sp.name} shape="rect" style={{ width: '100%', height: '210px', display: 'block' }} />
                            <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '.1em', color: 'var(--accent)', marginBottom: '8px' }}>{sp.cat}</div>
                                <div style={{ ...h3, marginBottom: '4px' }}>{sp.name}</div>
                                <div style={{ fontSize: '13.5px', color: COLORS.muted, marginBottom: '16px' }}>{sp.dims}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                                    {sp.includes.map((inc) => (
                                        <div key={inc} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                                            <span style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '13px' }}>✓</span>
                                            <span style={{ ...small, fontSize: '14px' }}>{inc}</span>
                                        </div>
                                    ))}
                                </div>
                                {showPricing && (
                                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${COLORS.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <span style={{ fontSize: '13px', color: COLORS.muted, fontWeight: '500' }}>From</span>
                                        <span style={{ fontSize: '21px', fontWeight: '700', color: COLORS.ink }}>{sp.price}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </section>
        </div>
    );
}
