import Reveal from '../components/ui/Reveal';
import { COLORS, body, card, eyebrow, h1, h2, h3, section, small } from '../styles/theme';

/** @param {{ services: Array, advantages: Array }} props */
export default function ServicesPage({ services, advantages }) {
    return (
        <div data-screen-label="Services">
            <Reveal as="section" style={{ ...section, paddingBottom: '56px' }}>
                <div style={eyebrow}>Services</div>
                <h1 style={{ ...h1, maxWidth: '760px' }}>Renovation, under one roof</h1>
                <p style={{ ...body, maxWidth: '620px', margin: 0 }}>
                    Three ways of working with us. Each one comes with the same standard: dedicated project management, transparent pricing, and our own tradesmen on site.
                </p>
            </Reveal>

            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 72px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {services.map((sv, i) => (
                    <Reveal key={sv.num} delay={i * 80}>
                        <div style={{ ...card, padding: '36px 34px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(340px,100%),1fr))', gap: '32px' }}>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent)', marginBottom: '10px' }}>{sv.num}</div>
                                <h2 style={{ ...h2, fontSize: '26px', marginBottom: '12px' }}>{sv.title}</h2>
                                <p style={{ ...small, fontSize: '15.5px', margin: 0 }}>{sv.longDesc}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '6px' }}>
                                <div style={{ fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase', color: COLORS.muted, fontWeight: '600' }}>What's included</div>
                                {sv.scope.map((item) => (
                                    <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                                        <span style={{ color: 'var(--accent)', fontWeight: '700' }}>✓</span>
                                        <span style={{ ...small, color: COLORS.ink }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </section>

            <Reveal as="section" style={{ background: COLORS.band, borderTop: `1px solid ${COLORS.line}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 40px' }}>
                    <h2 style={{ ...h2, margin: '0 0 40px', textAlign: 'center' }}>Why one team beats two contracts</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '24px' }}>
                        {advantages.map((a, i) => (
                            <Reveal key={a.title} delay={i * 80}>
                                <div style={{ ...card, padding: '30px 28px', height: '100%' }}>
                                    <div style={{ ...h3, marginBottom: '10px' }}>{a.title}</div>
                                    <p style={{ ...small, margin: 0 }}>{a.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
