import { useEffect, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Footer() {
  const { data } = usePortfolio()
  const footerRef = useRef(null)

  const socials = data.contact?.socials || [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
  ]

  const email = data.contact?.email || 'hello@yourdomain.com'
  const heroName = data.hero?.name || 'SOLKINGS'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Letter mask reveal animation
  useEffect(() => {
    if (!footerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-letter',
        { y: '102%' },
        {
          y: '0%',
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.03,
          scrollTrigger: {
            trigger: '.footer-name-section',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.footer-cols',
            start: 'top 85%',
          },
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  // Split name into letters for animation
  const nameLetters = heroName.split('').map((char, i) => (
    <span
      key={i}
      className="footer-letter"
      style={{
        display: 'inline-block',
        transform: 'translateY(102%)',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <footer ref={footerRef}>
      {/* Giant name with letter-by-letter reveal */}
      <div
        className="footer-name-section"
        style={{
          padding: 'var(--pt-medium) var(--grid-padding) 0',
          overflow: 'hidden',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 9vw, 8rem)',
              fontWeight: 800,
              lineHeight: '0.9',
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              overflow: 'hidden',
            }}
          >
            {nameLetters}
          </p>
        </div>
      </div>

      {/* Footer columns */}
      <div
        className="footer-cols"
        style={{
          padding: 'var(--pt-medium) var(--grid-padding) var(--pt-small)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              marginBottom: 'var(--pt-medium)',
            }}
          >
            <div className="footer-col">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-disabled)',
                  marginBottom: '16px',
                  fontWeight: 400,
                }}
              >
                Social
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                      transition: 'opacity 0.25s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
                    onMouseLeave={(e) => (e.target.style.opacity = '1')}
                  >
                    {s.label}
                  </a>
                ))}
                <a
                  href={`mailto:${email}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'opacity 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  Mail
                </a>
              </div>
            </div>

            <div className="footer-col">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-disabled)',
                  marginBottom: '16px',
                  fontWeight: 400,
                }}
              >
                Pages
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Projects', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'opacity 0.25s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
                    onMouseLeave={(e) => (e.target.style.opacity = '1')}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-col">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-disabled)',
                  marginBottom: '16px',
                  fontWeight: 400,
                }}
              >
                Contact
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={`mailto:${email}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'opacity 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-disabled)',
              }}
            >
              &copy; {new Date().getFullYear()} {heroName}. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'opacity 0.25s ease',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-cols .container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
