import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function Home() {
  const { data } = usePortfolio()
  const [view, setView] = useState('grid')
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const projects = useMemo(() => [
    ...(data.webProjects || []).map((p) => ({
      id: p.id,
      title: p.name,
      year: '2024',
      image: p.image,
      description: p.description,
      techStack: p.techStack,
      liveLink: p.liveLink,
      githubLink: p.githubLink,
      category: 'web',
    })),
    ...(data.graphicDesignProjects || []).map((p) => ({
      id: p.id,
      title: p.title,
      year: '2024',
      image: p.image,
      category: 'design',
    })),
  ], [data])

  const heroName = data.hero?.name || 'Carlos Prado'
  const heroTitle = data.hero?.title || 'Creative Developer'

  const socials = data.contact?.socials || [
    { label: 'LinkedIn', url: '#' },
    { label: 'Instagram', url: '#' },
    { label: 'GitHub', url: '#' },
    { label: 'Mail', url: '#' },
  ]

  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: '60px 32px 0' }}>
        <div className="container">
          <span
            style={{
              display: 'inline-block',
              fontSize: '13px',
              color: 'var(--color-primary)',
              fontWeight: 500,
              marginBottom: '16px',
              border: '1px solid var(--color-primary)',
              padding: '4px 12px',
              borderRadius: '100px',
            }}
          >
            Available July 2026
          </span>

          <div style={{ marginTop: '24px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 700,
                lineHeight: '1.05',
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: '8px',
              }}
            >
              {heroName}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: 300,
                color: 'var(--text-muted)',
                letterSpacing: '-0.02em',
              }}
            >
              {heroTitle}
            </p>
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <div style={{ padding: '40px 32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '4px', border: '1px solid var(--border)', borderRadius: '8px', padding: '3px' }}>
            {['grid', 'list'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  background: view === v ? 'var(--text)' : 'transparent',
                  color: view === v ? 'var(--bg)' : 'var(--text-muted)',
                  border: 'none',
                  padding: '6px 14px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {view === 'grid' && (
        <section style={{ padding: '24px 32px 40px' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <article
                    style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      transform: hoveredIndex === index ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredIndex === index ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: '16/10',
                        background: 'var(--bg-secondary)',
                        overflow: 'hidden',
                      }}
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-disabled)',
                          fontSize: '14px',
                        }}>
                          {project.title}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: 'var(--text)',
                          margin: 0,
                        }}>
                          {project.title}
                        </h3>
                        <span style={{
                          fontSize: '13px',
                          color: 'var(--text-muted)',
                        }}>
                          {project.year}
                        </span>
                      </div>
                      {project.description && (
                        <p style={{
                          fontSize: '14px',
                          color: 'var(--text-muted)',
                          marginTop: '8px',
                          lineHeight: '1.5',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {project.description}
                        </p>
                      )}
                      {project.techStack && (
                        <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                          {project.techStack.split(',').map((tech, i) => (
                            <span key={i} style={{
                              fontSize: '12px',
                              color: 'var(--tag-text)',
                              background: 'var(--tag-bg)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                            }}>
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects List */}
      {view === 'list' && (
        <section style={{ padding: '16px 32px 40px' }}>
          <div className="container">
            <div
              style={{
                borderTop: '1px solid var(--border)',
              }}
            >
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 0',
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: hoveredIndex === index ? 'var(--hover-bg)' : 'transparent',
                      margin: '0 -12px',
                      padding: '20px 12px',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <span
                        style={{
                          fontSize: '14px',
                          color: 'var(--text-muted)',
                          fontVariantNumeric: 'tabular-nums',
                          minWidth: '32px',
                          fontWeight: 500,
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3
                        style={{
                          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                          fontWeight: 500,
                          color: 'var(--text)',
                          margin: 0,
                          transition: 'transform 0.3s ease',
                          transform: hoveredIndex === index ? 'translateX(8px)' : 'translateX(0)',
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                      {project.year}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <section style={{ padding: '60px 32px' }}>
          <div className="container">
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', textAlign: 'center' }}>
              No projects yet. Add some in the admin panel.
            </p>
          </div>
        </section>
      )}

      {/* Social links */}
      <section style={{ padding: '40px 32px', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
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
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}

export default Home
