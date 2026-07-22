import Reveal from '../components/ui/Reveal';
import { COLORS, body, card, eyebrow, h1 } from '../styles/theme';

/** @param {{ testimonials: Array }} props */
export default function ClientsPage({ testimonials }) {
    return (
        <div data-screen-label="Clients">
            <Reveal as="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 40px 48px' }}>
                <div style={eyebrow}>Reviews</div>
                <h1 style={{ ...h1, maxWidth: '760px', marginBottom: '14px' }}>What our clients say</h1>
                <p style={{ ...body, maxWidth: '600px', margin: 0 }}>
                    92% of our projects come from referrals and repeat clients. Here's why.
                </p>
            </Reveal>

            <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 40px 88px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(420px,100%),1fr))', gap: '24px' }}>
                {testimonials.map((t, i) => (
                    <Reveal key={t.name} delay={i * 80}>
                        <div style={{ ...card, padding: '32px 30px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '36px', color: 'var(--accent)', lineHeight: '1', marginBottom: '14px' }}>&ldquo;</div>
                            <p style={{ fontSize: '17px', lineHeight: '1.7', color: COLORS.ink, margin: '0 0 20px', flex: 1 }}>
                                {t.quote}
                            </p>
                            <div style={{ fontSize: '15px', fontWeight: '600', color: COLORS.ink }}>{t.name}</div>
                            <div style={{ fontSize: '13.5px', color: COLORS.muted, marginTop: '2px' }}>{t.project}</div>
                        </div>
                    </Reveal>
                ))}
            </section>
        </div>
    );
}
