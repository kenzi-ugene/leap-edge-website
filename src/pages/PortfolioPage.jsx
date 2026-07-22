import ImageSlot from '../ImageSlot';
import Reveal from '../components/ui/Reveal';
import { COLORS, body, card, eyebrow, h1, h3, section, small } from '../styles/theme';

/** @param {{ portfolioFilters: Array, filteredProjects: Array }} props */
export default function PortfolioPage({ portfolioFilters, filteredProjects }) {
    return (
        <div data-screen-label="Portfolio">
            <Reveal as="section" style={{ ...section, paddingBottom: '40px' }}>
                <div style={eyebrow}>Our work</div>
                <h1 style={{ ...h1, marginBottom: '14px' }}>Completed homes</h1>
                <p style={{ ...body, maxWidth: '600px', margin: '0 0 32px' }}>
                    A selection of homes we have designed and built. Filter by property type to see projects like yours.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {portfolioFilters.map((f) => (
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

            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 88px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(360px,100%),1fr))', gap: '28px' }}>
                {filteredProjects.map((p, i) => (
                    <Reveal key={p.slotId} delay={i * 60}>
                        <div style={{ ...card, height: '100%' }}>
                            <ImageSlot id={p.slotId} placeholder={p.name} shape="rect" style={{ width: '100%', height: '300px', display: 'block' }} />
                            <div style={{ padding: '22px 24px 26px' }}>
                                <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '.1em', color: 'var(--accent)', marginBottom: '8px' }}>{p.type}</div>
                                <div style={{ ...h3, marginBottom: '6px' }}>{p.name}</div>
                                <div style={{ fontSize: '13.5px', color: COLORS.muted, marginBottom: '12px' }}>{p.meta}</div>
                                <p style={{ ...small, margin: 0 }}>{p.blurb}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </section>
        </div>
    );
}
