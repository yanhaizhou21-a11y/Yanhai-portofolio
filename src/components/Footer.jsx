import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useStaggerReveal } from '../hooks/useGsap.js'

function Footer() {
  const { data } = usePortfolio()
  const footerRef = useRef(null)

  useStaggerReveal(footerRef, '.footer-col', 0.1)

  const socials = data.contact?.socials || [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
  ]

  const email = data.contact?.email || 'hello@yourdomain.com'

  const pages = [
    { label: 'Projects', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      style={{
        padding: '56px 32px 32px',
        borderTop: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <div className="container">
        {/* ── Three Columns ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            marginBottom: '80px',
          }}
        >
          {/* Social */}
          <div className="footer-col">
            <p
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#9ca3af',
                marginBottom: '16px',
              }}
            >
              Social
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '16px',
                    color: '#000',
                    textDecoration: 'none',
                  }}
                >
                  {s.label}
                </a>
              ))}
              <a
                href={`mailto:${email}`}
                style={{
                  fontSize: '16px',
                  color: '#000',
                  textDecoration: 'none',
                }}
              >
                Mail
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="footer-col">
            <p
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#9ca3af',
                marginBottom: '16px',
              }}
            >
              Pages
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pages.map((p) => (
                <Link
                  key={p.path}
                  to={p.path}
                  style={{
                    fontSize: '16px',
                    color: '#000',
                    textDecoration: 'none',
                  }}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <p
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#9ca3af',
                marginBottom: '16px',
              }}
            >
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={`mailto:${email}`}
                style={{
                  fontSize: '16px',
                  color: '#000',
                  textDecoration: 'none',
                }}
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: '#000',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Back to top
          </button>
        </div>
      </div>

      {/* ── Responsive: Stack on mobile ── */}
      <style>{`
        @media (max-width: 768px) {
          footer > .container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
