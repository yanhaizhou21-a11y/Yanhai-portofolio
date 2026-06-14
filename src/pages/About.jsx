import { usePortfolio } from '../context/PortfolioContext.jsx'

const defaultServices = [
  {
    title: 'Web development',
    description: 'Crafting custom websites using HTML, CSS, and JavaScript, whether from scratch or by enhancing existing platforms, to meet unique client needs and increase online presence effectively.',
  },
  {
    title: 'Mobile App development',
    description: 'Creating custom mobile apps, leveraging various platforms and programming languages, to meet specific client requirements and deliver seamless user experiences on smartphones and tablets.',
  },
  {
    title: 'Performance & optimization',
    description: 'Improving website speed with code optimization, image compression, and hosting services for faster loading times, ensuring smoother user experiences and better engagement for visitors.',
  },
  {
    title: 'UX/UI design & prototype',
    description: 'Offering comprehensive web design services, creating visually captivating and user-friendly websites tailored to clients\u2019 needs, utilizing modern design trends and responsive layouts to boost customer interaction and satisfaction.',
  },
  {
    title: 'Maintenance & support',
    description: 'Offering continuous maintenance and support to ensure websites remain current and function seamlessly, ensuring uninterrupted operation and addressing any issues promptly.',
  },
]

function About() {
  const { data } = usePortfolio()
  const heroName = data.hero?.name || '[YOUR NAME]'
  const bio = data.about?.bio || ''
  const aboutPhoto = data.about?.aboutPhotoUrl || ''
  const certificates = data.certificates || []

  return (
    <main style={{ paddingTop: '80px' }}>
      <section style={{ padding: '80px 32px 60px' }}>
        <div className="container">
          <h1
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.8rem, 4vw, 40px)',
              fontWeight: 700,
              lineHeight: '1.15',
              maxWidth: '700px',
              color: 'var(--text)',
            }}
          >
            Creative developer helping brands achieve their goals in the digital world
          </h1>
        </div>
      </section>

      <section style={{ padding: '40px 32px 80px' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '56px',
            alignItems: 'start',
          }}
        >
          <div style={{ aspectRatio: '3/4', background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
            {aboutPhoto ? (
              <img src={aboutPhoto} alt={heroName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-disabled)', fontSize: '14px' }}>
                Photo
              </div>
            )}
          </div>

          <div style={{ paddingTop: '24px' }}>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'var(--text)',
                marginBottom: '24px',
              }}
            >
              {bio || `I'm ${heroName}, a creative developer with experience in web and mobile development.`}
            </p>
            <p
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'var(--text-muted)',
              }}
            >
              I'm a proactive person who enjoys creating through both design and development, always driven by curiosity, improvement, and new ideas.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 32px', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '40px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Services
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.2rem, 2.5vw, 24px)',
              fontWeight: 300,
              lineHeight: '1.4',
              maxWidth: '700px',
              margin: '0 auto 56px',
              textAlign: 'center',
              color: 'var(--text)',
            }}
          >
            I bridge design and development, turning ideas into polished digital experiences.
          </p>

          {defaultServices.map((service, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '40px',
                padding: '32px 0',
                borderTop: index > 0 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)' }}>
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: 'var(--text-muted)',
                  maxWidth: '560px',
                  justifySelf: 'end',
                  textAlign: 'right',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {certificates.length > 0 && (
        <section style={{ padding: '80px 32px', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '40px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Awards
            </h2>

            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1fr',
                  gap: '24px',
                  padding: '24px 0',
                  borderTop: index > 0 ? '1px solid var(--border)' : 'none',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontSize: '14px', color: 'var(--text-disabled)' }}>
                  {cert.date?.split(' ').pop() || '2024'}
                </span>
                <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text)' }}>
                  {cert.name}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'right' }}>
                  {cert.issuer}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ padding: '80px 32px', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.2rem, 2.5vw, 24px)',
              fontWeight: 300,
              lineHeight: '1.4',
              color: 'var(--text)',
              marginBottom: '32px',
            }}
          >
            I partner with brands and studios that care about clarity, craft and a point of view.
          </p>
          <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--text)' }}>
            Let&rsquo;s talk
          </p>
          <a
            href={`mailto:${data.contact?.email || 'hello@yourdomain.com'}`}
            style={{
              fontSize: '16px',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            {data.contact?.email || 'hello@yourdomain.com'}
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          .container > div[style*="grid-template-columns: 80px 1fr 1fr"] {
            grid-template-columns: 60px 1fr !important;
          }
          .container > div[style*="grid-template-columns: 80px 1fr 1fr"] > span:last-child {
            grid-column: 2;
            text-align: left !important;
          }
        }
      `}</style>
    </main>
  )
}

export default About
