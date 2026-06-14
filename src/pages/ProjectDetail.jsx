import { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = usePortfolio()

  const project = useMemo(() => {
    const web = (data.webProjects || []).find((p) => p.id === id)
    if (web) return { ...web, category: 'web' }
    const design = (data.graphicDesignProjects || []).find((p) => p.id === id)
    if (design) return { ...design, category: 'design' }
    return null
  }, [data, id])

  if (!project) {
    return (
      <main style={{ paddingTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '16px' }}>Project not found</p>
          <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Back to projects</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ paddingTop: '80px' }}>
      <section style={{ padding: '40px 32px' }}>
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              padding: '0',
              marginBottom: '24px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            &larr; Back
          </button>

          <div style={{ maxWidth: '800px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--text)',
                marginBottom: '16px',
              }}
            >
              {project.name || project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {project.image && (
        <section style={{ padding: '0 32px 40px' }}>
          <div className="container">
            <div style={{ borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-secondary)', aspectRatio: '16/9' }}>
              <img
                src={project.image}
                alt={project.name || project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Details */}
      <section style={{ padding: '0 32px 60px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', maxWidth: '800px' }}>
            {project.description && (
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  Description
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text)' }}>
                  {project.description}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {project.techStack && (
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                    Tech Stack
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.techStack.split(',').map((tech, i) => (
                      <span key={i} style={{
                        fontSize: '13px',
                        color: 'var(--tag-text)',
                        background: 'var(--tag-bg)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontWeight: 500,
                      }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(project.liveLink || project.githubLink) && (
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                    Links
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--color-primary)',
                          textDecoration: 'none',
                          fontSize: '15px',
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        Visit Live Site &rarr;
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--color-primary)',
                          textDecoration: 'none',
                          fontSize: '15px',
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        View Source &rarr;
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProjectDetail
