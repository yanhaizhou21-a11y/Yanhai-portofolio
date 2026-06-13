import { useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useMaskReveal, useScrollReveal } from '../hooks/useGsap.js'
import Footer from '../components/Footer.jsx'

function Contact() {
    const { data } = usePortfolio()
    const statementRef = useRef(null)
    const ctaRef = useRef(null)

    useMaskReveal(statementRef)
    useScrollReveal(ctaRef, 0.2)

    const heroName = data.hero?.name || '[YOUR NAME]'
    const heroTitle = data.hero?.title || 'Creative Developer'
    const email = data.contact?.email || 'hello@yourdomain.com'
    const cta = data.contact?.cta || "Let's build something minimal and memorable."

    return (
        <main style={{ paddingTop: '80px' }}>
            {/* ── Statement ── */}
            <section
                ref={statementRef}
                style={{
                    padding: '120px 32px 80px',
                    minHeight: '50vh',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="container">
                    <p
                        data-mask
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.5rem, 3.5vw, 36px)',
                            fontWeight: 400,
                            lineHeight: '1.3',
                            maxWidth: '800px',
                            color: '#000',
                        }}
                    >
                        I partner with brands and studios that care about clarity, craft and a point of view.
                    </p>
                </div>
            </section>

            {/* ── CTA ── */}
            <section
                ref={ctaRef}
                style={{
                    padding: '40px 32px 80px',
                }}
            >
                <div className="container">
                    <p
                        style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            marginBottom: '8px',
                            color: '#000',
                        }}
                    >
                        Let&rsquo;s talk
                    </p>
                    <a
                        href={`mailto:${email}`}
                        style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#000',
                            textDecoration: 'underline',
                            textUnderlineOffset: '4px',
                            textDecorationThickness: '1px',
                        }}
                    >
                        {email}
                    </a>
                </div>
            </section>

            {/* ── Giant Name ── */}
            <section
                style={{
                    padding: '80px 32px 40px',
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                }}
            >
                <div className="container">
                    <p className="giant-text" style={{ whiteSpace: 'nowrap' }}>
                        {heroName}
                    </p>
                    <p
                        className="giant-text"
                        style={{
                            whiteSpace: 'nowrap',
                            fontWeight: 400,
                            color: '#6b7280',
                        }}
                    >
                        {heroTitle}
                    </p>
                </div>
            </section>

            {/* ── Footer ── */}
            <Footer />
        </main>
    )
}

export default Contact
