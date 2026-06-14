import { useEffect, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import gsap from 'gsap'
import Footer from '../components/Footer.jsx'
import ScrollFloat from '../components/reactbits/ScrollFloat.jsx'

function Contact() {
  const { data } = usePortfolio()
  const heroName = data.hero?.name || 'SOLKINGS'
  const heroTitle = data.hero?.title || 'Creative Developer'
  const email = data.contact?.email || 'hello@yourdomain.com'
  const socials = data.contact?.socials || [
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' },
  ]
  const pageRef = useRef(null)

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-statement',
        { y: '102%' },
        { y: '0%', duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.1 }
      )
      gsap.fromTo(
        '.contact-detail',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06, delay: 0.4 }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} style={{ paddingTop: '100px' }}>
      {/* Statement */}
      <section
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          padding: 'var(--pt-large) var(--grid-padding)',
        }}
      >
        <div className="container">
          <div style={{ width: '75%' }}>
            <ScrollFloat
              containerClassName="contact-statement"
              stagger={0.04}
              tag="p"
            >
              I partner with brands and studios that care about clarity, craft and a point of view.
            </ScrollFloat>
          </div>
        </div>
      </section>

      {/* Contact details */}
      <section style={{ padding: 'var(--pt-small) var(--grid-padding) var(--pt-medium)' }}>
        <div className="container">
          <div className="contact-detail">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 400,
                marginBottom: '12px',
                color: 'var(--text)',
              }}
            >
              Let&rsquo;s talk
            </p>
          </div>
          <div className="contact-detail">
            <a
              href={`mailto:${email}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                fontWeight: 400,
                color: 'var(--text)',
                textDecoration: 'none',
                display: 'inline-block',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '4px',
                transition: 'opacity 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.5'
                e.target.style.borderColor = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1'
                e.target.style.borderColor = 'var(--border)'
              }}
            >
              {email}
            </a>
          </div>

          <div
            className="contact-detail"
            style={{ display: 'flex', gap: '24px', marginTop: '40px', flexWrap: 'wrap' }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--text)'
                  e.target.style.borderColor = 'var(--text)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--text-muted)'
                  e.target.style.borderColor = 'var(--border)'
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Giant name section */}
      <section
        style={{
          padding: 'var(--pt-medium) var(--grid-padding) var(--pt-small)',
          borderTop: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 12vw, 10rem)',
              fontWeight: 800,
              lineHeight: '0.88',
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
            }}
          >
            {heroName}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.5rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: '0.9',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: 'var(--text-muted)',
              marginTop: '12px',
            }}
          >
            {heroTitle}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Contact
