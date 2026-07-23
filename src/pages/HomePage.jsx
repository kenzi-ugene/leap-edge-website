import ImageSlot from '../ImageSlot';
import Reveal from '../components/ui/Reveal';
import { COLORS, body, btnPrimary, btnSecondary, card, eyebrow, h2, h3, imgBlock, link, section, small } from '../styles/theme';

/**
 * @param {object} props
 */
export default function HomePage({
    stats,
    featured,
    serviceTeasers,
    homeTypes,
    serviceAreas,
    goPortfolio,
    goProcess,
    goServices,
    goClients,
    goContact,
}) {
    return (
        <div data-screen-label="Home">
            {/* Hero — who we are and what we do, in one glance */}
            <Reveal as="section" style={{ ...section, padding: '64px 40px 72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(420px,100%),1fr))', gap: 'clamp(36px,5vw,64px)', alignItems: 'center' }}>
                <div>
                    <div style={eyebrow}>Bukit Mertajam · Penang Mainland · Over 10 Years&rsquo; Experience</div>
                    <h1 style={{ fontSize: 'clamp(38px,4.8vw,60px)', lineHeight: '1.12', fontWeight: '700', letterSpacing: '-.015em', margin: '0 0 22px', textWrap: 'balance', color: COLORS.ink }}>
                        We renovate landed homes — from extension to final finishing. <span style={{ color: 'var(--accent)' }}>One team. One point of contact.</span>
                    </h1>
                    <p style={{ ...body, maxWidth: '520px', margin: '0 0 18px' }}>
                        Based in Bukit Mertajam, Leap Edge Renovation provides reliable, practical, end-to-end renovation solutions for landed homes. We are your perfect main-con from masonry works, to plumbing, electrical, tiling, ceilings, awnings, kitchen extensions and carpentry coordination, we manage your project from site inspection to final handover.
                    </p>
                    <ul style={{ margin: '0 0 32px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {['Free, no-obligation consultation', 'Itemised open-book quotations — no hidden costs', 'Local project coordination from commencement to handover'].map((point) => (
                            <li key={point} style={{ ...small, display: 'flex', gap: '10px', alignItems: 'baseline', color: COLORS.ink }}>
                                <span style={{ color: 'var(--accent)', fontWeight: '700' }}>✓</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button type="button" onClick={goContact} style={btnPrimary}>Arrange a Site Consultation</button>
                        <button type="button" onClick={goPortfolio} style={btnSecondary}>See Our Projects</button>
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                    <ImageSlot id="hero-main" placeholder="Hero — signature project photo" shape="rounded" style={imgBlock('500px')} />
                    <div style={{ position: 'absolute', left: '20px', bottom: '20px', background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 8px 28px rgba(22,35,58,.14)', padding: '18px 22px', maxWidth: '260px' }}>
                        <div style={{ ...h3, fontSize: '17px' }}>Stillwater Residence</div>
                        <div style={{ fontSize: '13px', color: COLORS.muted, marginTop: '4px' }}>Bukit Mertajam · 3,400 sq ft</div>
                    </div>
                </div>
            </Reveal>

            {/* Stats band */}
            {/* <section style={{ borderTop: `1px solid ${COLORS.line}`, borderBottom: `1px solid ${COLORS.line}`, background: COLORS.band }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '28px' }}>
                    {stats.map((s, i) => (
                        <Reveal key={s.label} delay={i * 80} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '38px', fontWeight: '700', color: 'var(--accent)', letterSpacing: '-.01em' }}>{s.value}</div>
                            <div style={{ fontSize: '14px', color: COLORS.body, marginTop: '4px', fontWeight: '500' }}>{s.label}</div>
                        </Reveal>
                    ))}
                </div>
            </section> */}

            {/* Services — three clear cards */}
            <Reveal as="section" style={{ ...section, padding: '80px 40px 72px' }}>
                <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 44px' }}>
                    <div style={eyebrow}>What we do</div>
                    <h2 style={h2}>We plan, refurbish, restructure, rebuild and renovate.</h2>
                    <p style={{ ...body, margin: '14px 0 0' }}>
                        Whether you are refurbishing an existing space, rebuilding an ageing section or restructuring your home layout, Leap Edge Renovation manages the process from planning to completion.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px' }}>
                    {serviceTeasers.map((sv, i) => (
                        <Reveal key={sv.num} delay={i * 90}>
                            <div style={{ ...card, padding: '30px 28px', height: '100%' }}>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent)', marginBottom: '12px' }}>{sv.num}</div>
                                <div style={{ ...h3, marginBottom: '10px' }}>{sv.title}</div>
                                <p style={{ ...small, margin: 0 }}>{sv.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <span onClick={goServices} style={link}>Explore Our Services →</span>
                </div>
            </Reveal>

            {/* Homes we work on — like "Industries We Serve" */}
            <section style={{ background: COLORS.band, borderTop: `1px solid ${COLORS.line}`, borderBottom: `1px solid ${COLORS.line}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
                    <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 44px' }}>
                        <div style={eyebrow}>Homes we work on</div>
                        <h2 style={h2}>Every kind of landed home, every kind of budget</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '18px' }}>
                        {homeTypes.map((t, i) => (
                            <Reveal key={t.title} delay={i * 60}>
                                <div style={{ ...card, padding: '22px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start', height: '100%' }}>
                                    <span style={{ color: 'var(--accent)', fontSize: '18px', fontWeight: '700', lineHeight: '1.4' }}>■</span>
                                    <div>
                                        <div style={{ fontSize: '17px', fontWeight: '600', color: COLORS.ink, marginBottom: '4px' }}>{t.title}</div>
                                        <p style={{ ...small, margin: 0 }}>{t.desc}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured projects — clear info cards */}
            <Reveal as="section" style={{ ...section, padding: '80px 40px 72px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
                    <div>
                        <div style={eyebrow}>Recent projects</div>
                        <h2 style={h2}>Homes we've completed</h2>
                    </div>
                    <span onClick={goPortfolio} style={link}>All projects →</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '24px' }}>
                    {featured.map((p, i) => (
                        <Reveal key={p.slotId} delay={i * 90}>
                            <div onClick={goPortfolio} style={{ ...card, cursor: 'pointer', height: '100%' }}>
                                <ImageSlot id={p.slotId} placeholder={p.name} shape="rect" style={{ width: '100%', height: '220px', display: 'block' }} />
                                <div style={{ padding: '18px 20px 22px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '.1em', color: 'var(--accent)', marginBottom: '6px' }}>{p.type}</div>
                                    <div style={{ ...h3, fontSize: '18px', marginBottom: '6px' }}>{p.name}</div>
                                    <div style={{ fontSize: '13.5px', color: COLORS.muted }}>{p.meta}</div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Reveal>

            {/* Areas we serve */}
            <section style={{ background: COLORS.band, borderTop: `1px solid ${COLORS.line}`, borderBottom: `1px solid ${COLORS.line}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 40px', textAlign: 'center' }}>
                    <div style={eyebrow}>Where we work</div>
                    <h2 style={{ ...h2, marginBottom: '14px' }}>Renovation services across Penang Mainland</h2>
                    <p style={{ ...body, maxWidth: '560px', margin: '0 auto 28px' }}>
                        Based in Bukit Mertajam, showroom in Sungai Petani, visit us, or we'll come to your property for a site visit.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
                        {serviceAreas.map((area) => (
                            <span key={area} style={{ background: '#FFFFFF', border: `1px solid ${COLORS.line}`, borderRadius: '999px', padding: '9px 20px', fontSize: '14.5px', fontWeight: '500', color: COLORS.ink }}>
                                {area}
                            </span>
                        ))}
                    </div>
                    <button type="button" onClick={goContact} style={btnPrimary}>Arrange a Free Site Consultation</button>
                </div>
            </section>

            {/* How it works teaser + testimonial */}
            <Reveal as="section" style={{ ...section, padding: '80px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(380px,100%),1fr))', gap: 'clamp(36px,5vw,64px)', alignItems: 'center' }}>
                <div>
                    <div style={eyebrow}>How we work</div>
                    <h2 style={{ ...h2, marginBottom: '16px' }}>A clear process from day one</h2>
                    <p style={{ ...body, margin: '0 0 24px' }}>
                        We begin with a site consultation to understand your requirements, budget and property condition. From planning and quotation to construction and final inspection, our team coordinates each stage and keeps you updated on the project&rsquo;s progress.
                    </p>
                    <span onClick={goProcess} style={link}>See the full process →</span>
                </div>
                <div style={{ ...card, padding: '34px 32px', background: COLORS.band }}>
                    <div style={{ fontSize: '40px', color: 'var(--accent)', lineHeight: '1', marginBottom: '14px' }}>&ldquo;</div>
                    <p style={{ fontSize: '18.5px', lineHeight: '1.6', color: COLORS.ink, margin: '0 0 18px', fontWeight: '500' }}>
                        They treated our home with the same care we do. Every ringgit was accounted for — and they handed over two weeks early.
                    </p>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.ink }}>Mr Yong, Homeowner</div>
                    <div style={{ fontSize: '13px', color: COLORS.muted, marginBottom: '18px' }}>d&rsquo;Courtyards, Taman Serikaya, Bukit Mertajam</div>
                    <span onClick={goClients} style={{ ...link, fontSize: '14.5px' }}>Read more reviews →</span>
                </div>
            </Reveal>

            {/* Final CTA */}
            <Reveal as="section" style={{ background: COLORS.dark }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                    <div>
                        <h2 style={{ ...h2, color: '#FFFFFF', marginBottom: '12px' }}>Ready to talk about your home?</h2>
                        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.82)', margin: 0, maxWidth: '520px', lineHeight: '1.7' }}>
                            Based in Bukit Mertajam, CIDB Grade G3 registered contractor with dedicated project manager for each project.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <button type="button" onClick={goContact} style={{ ...btnPrimary, padding: '16px 34px' }}>Arrange a Site Consultation</button>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
