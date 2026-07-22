import Reveal from '../components/ui/Reveal';
import { COLORS, body, btnPrimary, btnSecondary, card, eyebrow, h1, h3 } from '../styles/theme';

/**
 * @param {object} props
 */
export default function ContactPage({
    formName,
    formPhone,
    formEmail,
    formProperty,
    formBudget,
    formMessage,
    hasError,
    errorMsg,
    formDone,
    formNotDone,
    onField,
    submitForm,
    resetForm,
}) {
    const inputStyle = {
        width: '100%',
        border: `1.5px solid ${COLORS.line}`,
        borderRadius: '8px',
        background: '#FFFFFF',
        padding: '12px 14px',
        fontSize: '15px',
        outline: 'none',
        color: COLORS.ink,
    };

    const labelStyle = {
        display: 'block',
        fontSize: '13.5px',
        fontWeight: '600',
        color: COLORS.ink,
        marginBottom: '7px',
    };

    return (
        <div data-screen-label="Contact">
            <Reveal as="section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 40px 88px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(400px,100%),1fr))', gap: 'clamp(40px,6vw,80px)' }}>
                <div>
                    <div style={eyebrow}>Contact us</div>
                    <h1 style={{ ...h1, fontSize: 'clamp(32px,4vw,44px)', marginBottom: '18px' }}>Get a free quote</h1>
                    <p style={{ ...body, margin: '0 0 40px' }}>
                        Tell us a little about your property and we'll get back to you within one working day — with honest advice and a clear idea of cost.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                        <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: '18px' }}>
                            <div style={{ ...h3, fontSize: '16px', marginBottom: '6px' }}>Visit our office</div>
                            <div style={{ fontSize: '15px', lineHeight: '1.7', color: COLORS.body }}>
                                23, Jalan Profesor Diraja Ungku Aziz,<br />
                                Seksyen 13, 46200 Petaling Jaya, Selangor
                            </div>
                        </div>
                        <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: '18px' }}>
                            <div style={{ ...h3, fontSize: '16px', marginBottom: '6px' }}>Call or email</div>
                            <div style={{ fontSize: '15px', lineHeight: '1.7', color: COLORS.body }}>
                                +60 3 7931 2288<br />
                                hello@leapedge.my
                            </div>
                        </div>
                        <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: '18px' }}>
                            <div style={{ ...h3, fontSize: '16px', marginBottom: '6px' }}>Opening hours</div>
                            <div style={{ fontSize: '15px', lineHeight: '1.7', color: COLORS.body }}>
                                Monday – Saturday, 10:00am – 7:00pm<br />
                                Site visits by appointment
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {formDone && (
                        <div style={{ ...card, padding: '64px 48px', textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', color: 'var(--accent)', lineHeight: '1' }}>✓</div>
                            <h2 style={{ ...h3, fontSize: '26px', margin: '22px 0 12px' }}>Thank you, {formName}</h2>
                            <p style={{ ...body, fontSize: '15.5px', margin: '0 0 30px' }}>
                                Your request has been received. We'll be in touch within one working day to arrange your free consultation.
                            </p>
                            <button type="button" onClick={resetForm} style={btnSecondary}>
                                Send Another Enquiry
                            </button>
                        </div>
                    )}

                    {formNotDone && (
                        <div style={{ ...card, padding: '40px 38px', background: COLORS.band }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                                <div>
                                    <label style={labelStyle}>Full name *</label>
                                    <input name="name" value={formName} onChange={onField} placeholder="Your name" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Phone *</label>
                                    <input name="phone" value={formPhone} onChange={onField} placeholder="+60 12 345 6789" style={inputStyle} />
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label style={labelStyle}>Email</label>
                                <input name="email" value={formEmail} onChange={onField} placeholder="you@example.com" style={inputStyle} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginTop: '20px' }}>
                                <div>
                                    <label style={labelStyle}>Property type</label>
                                    <select name="property" value={formProperty} onChange={onField} style={inputStyle}>
                                        <option>Bungalow</option>
                                        <option>Semi-detached</option>
                                        <option>Superlink / Terrace</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Rough budget</label>
                                    <select name="budget" value={formBudget} onChange={onField} style={inputStyle}>
                                        <option>RM 500K – 1M</option>
                                        <option>RM 1M – 2M</option>
                                        <option>RM 2M – 4M</option>
                                        <option>Above RM 4M</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label style={labelStyle}>About your project</label>
                                <textarea name="message" value={formMessage} onChange={onField} rows={4} placeholder="Location, timeline, and what you'd like to do…" style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} />
                            </div>
                            {hasError && (
                                <div style={{ marginTop: '18px', fontSize: '14px', color: '#C0392B', fontWeight: '500' }}>{errorMsg}</div>
                            )}
                            <button type="button" onClick={submitForm} style={{ ...btnPrimary, marginTop: '28px', width: '100%', padding: '16px' }}>
                                Send My Enquiry
                            </button>
                            <div style={{ marginTop: '14px', fontSize: '13px', color: COLORS.muted, textAlign: 'center' }}>
                                Your details stay with us. No marketing lists, ever.
                            </div>
                        </div>
                    )}
                </div>
            </Reveal>
        </div>
    );
}
