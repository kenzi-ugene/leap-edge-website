import ImageSlot from '../ImageSlot';
import Reveal from '../components/ui/Reveal';
import { COLORS, body, card, eyebrow, h1, h2, h3, imgBlock, section, small } from '../styles/theme';

/** @param {{ values: Array, credentials: string[] }} props */
export default function StudioPage({ values, credentials }) {
    return (
        <div data-screen-label="Studio">
            <Reveal as="section" style={{ ...section, paddingBottom: '56px' }}>
                <div style={eyebrow}>About us</div>
                <h1 style={{ ...h1, maxWidth: '820px' }}>A design and build team that treats your home like its own</h1>
                <p style={{ ...body, maxWidth: '640px', margin: 0 }}>
                    Since 2012, Leap Edge has completed over 180 landed homes across the Klang Valley. We are a team of 32 — designers, quantity surveyors, and site managers under one roof — so you deal with one company from start to finish.
                </p>
            </Reveal>

            <Reveal as="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px 72px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <ImageSlot id="studio-wide" placeholder="Studio / office photo" shape="rounded" style={imgBlock('420px')} />
                <ImageSlot id="studio-detail" placeholder="Material library detail" shape="rounded" style={imgBlock('420px')} />
            </Reveal>

            <section style={{ background: COLORS.band, borderTop: `1px solid ${COLORS.line}`, borderBottom: `1px solid ${COLORS.line}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '24px' }}>
                    {values.map((v, i) => (
                        <Reveal key={v.num} delay={i * 80}>
                            <div style={{ ...card, padding: '28px 26px', height: '100%' }}>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent)', marginBottom: '12px' }}>{v.num}</div>
                                <div style={{ ...h3, marginBottom: '10px' }}>{v.title}</div>
                                <p style={{ ...small, margin: 0 }}>{v.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <Reveal as="section" style={{ ...section, padding: '80px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(380px,100%),1fr))', gap: 'clamp(36px,5vw,64px)', alignItems: 'center' }}>
                <ImageSlot id="studio-founders" placeholder="Founders / principals portrait" shape="rounded" style={imgBlock('440px')} />
                <div>
                    <div style={eyebrow}>Leadership</div>
                    <h2 style={{ ...h2, marginBottom: '16px' }}>The founders stay on every project</h2>
                    <p style={{ ...body, margin: '0 0 24px' }}>
                        Every Leap Edge home is personally directed by a founding principal. You will never be handed down to a junior team after signing — the people you meet at consultation are the people on your site.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {credentials.map((c) => (
                            <div key={c} style={{ display: 'flex', gap: '12px', alignItems: 'baseline', borderTop: `1px solid ${COLORS.line}`, paddingTop: '12px' }}>
                                <span style={{ color: 'var(--accent)', fontWeight: '700' }}>✓</span>
                                <span style={{ ...small, color: COLORS.ink }}>{c}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
