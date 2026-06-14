import { usePortfolio } from '../context/PortfolioContext.jsx'

function Footer() {
  const { data } = usePortfolio()

  const socials = data.contact?.socials || [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
  ]

  const email = data.contact?.email || 'hello@yourdomain.com'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        padding: '56px 32px 32px',
        borderTop: '1px solid var(--border)',
        transition: 'border-color 0.4s ease',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            marginBottom: '80px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--text-disabled)',
                marginBottom: '16px',
                fontWeight: 600,
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
                    fontSize: '15px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  {s.label}
                </a>
              ))}
              <a
                href={`mailto:${email}`}
                style={{
                  fontSize: '15px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                Mail
              </a>
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--text-disabled)',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Pages
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="/" style={{ fontSize: '15px', color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >Projects</a>
              <a href="/about" style={{ fontSize: '15px', color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >About</a>
              <a href="/contact" style={{ fontSize: '15px', color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >Contact</a>
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--text-disabled)',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              Contact
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={`mailto:${email}`}
                style={{
                  fontSize: '15px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            flexWrap: 'wrap',
            gap: '16px',
            transition: 'border-color 0.4s ease',
          }}
        >
          <p style={{ fontSize: '13px', color: 'var(--text-disabled)' }}>
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '13px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            Back to top &uarr;
          </button>
        </div>
      </div>

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
