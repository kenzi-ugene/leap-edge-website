import Reveal from '../components/ui/Reveal';
import { COLORS, body, btnPrimary, card, eyebrow, h1, h3, small } from '../styles/theme';

/** @param {{ steps: Array, goContact: Function }} props */
export default function ProcessPage({ steps, goContact }) {
    return (
        <div data-screen-label="Process">
            <Reveal as="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 40px 56px' }}>
                <div style={eyebrow}>How we work</div>
                <h1 style={{ ...h1, maxWidth: '760px' }}>Six clear steps, no surprises</h1>
                <p style={{ ...body, maxWidth: '620px', margin: 0 }}>
                    A typical renovation takes six weeks to twelve months, depending on scope. At every step you know exactly where the project stands, what it costs, and what comes next.
                </p>
            </Reveal>

            <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px 88px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {steps.map((st, i) => (
                    <Reveal key={st.num} delay={i * 70}>
                        <div style={{ ...card, padding: '28px 30px', display: 'grid', gridTemplateColumns: '110px 1fr', gap: '28px', alignItems: 'start' }}>
                            <div>
                                <div style={{ fontSize: '30px', fontWeight: '700', color: 'var(--accent)', lineHeight: '1' }}>{st.num}</div>
                                <div style={{ fontSize: '13px', color: COLORS.muted, marginTop: '8px', fontWeight: '500' }}>{st.duration}</div>
                            </div>
                            <div>
                                <h2 style={{ ...h3, fontSize: '21px', marginBottom: '8px' }}>{st.title}</h2>
                                <p style={{ ...small, fontSize: '15px', margin: 0 }}>{st.desc}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
                <div style={{ paddingTop: '28px', textAlign: 'center' }}>
                    <button type="button" onClick={goContact} style={btnPrimary}>Start with a Free Consultation</button>
                </div>
            </section>
        </div>
    );
}
