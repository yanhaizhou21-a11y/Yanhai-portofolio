import { usePortfolio } from '../context/PortfolioContext.jsx'
import Footer from '../components/Footer.jsx'

function Contact() {
  const { data } = usePortfolio()
  const heroName = data.hero?.name || '[YOUR NAME]'
  const heroTitle = data.hero?.title || 'Creative Developer'
  const email = data.contact?.email || 'hello@yourdomain.com'
  const socials = data.contact?.socials || [
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' },
  ]

  return (
    <main style={{ paddingTop: '80px' }}>
      <section style={{ padding: '120px 32px 80px', minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.5rem, 3.5vw, 36px)',
              fontWeight: 300,
              lineHeight: '1.3',
              maxWidth: '800px',
              color: 'var(--text)',
            }}
          >
            I partner with brands and studios that care about clarity, craft and a point of view.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 32px 80px' }}>
        <div className="container">
          <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--text)' }}>
            Let&rsquo;s talk
          </p>
          <a
            href={`mailto:${email}`}
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-primary)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {email}
          </a>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)'
                  e.target.style.color = 'var(--color-primary)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.color = 'var(--text-muted)'
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 32px 40px', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 700,
              lineHeight: '0.9',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: 'var(--text)',
            }}
          >
            {heroName}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(2rem, 7vw, 5rem)',
              fontWeight: 300,
              lineHeight: '0.9',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: 'var(--text-muted)',
              marginTop: '8px',
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
