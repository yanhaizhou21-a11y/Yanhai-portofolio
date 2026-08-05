import { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { motion } from 'framer-motion'
import Footer from '../components/Footer.jsx'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = usePortfolio()

  const project = useMemo(() => {
    const web = (data.webProjects || []).find((p) => p.id === id)
    if (web) return { ...web, category: 'Web Project' }
    const design = (data.graphicDesignProjects || []).find((p) => p.id === id)
    if (design) return { ...design, category: 'Design Project' }
    return null
  }, [data, id])

  if (!project) {
    return (
      <main
        style={{
          paddingTop: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '16px',
              marginBottom: '16px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Project not found
          </p>
          <Link
            to="/"
            style={{
              color: 'var(--text)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--border)',
              transition: 'opacity 0.25s ease',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            Back to projects
          </Link>
        </div>
      </main>
    )
  }

  const projectName = project.name || project.title
  const techList = project.techStack
    ? project.techStack.split(',').map((t) => t.trim())
    : []

  return (
    <main style={{ paddingTop: '0' }}>
      {/* Back button */}
      <div style={{ padding: '100px var(--grid-padding) 0' }}>
        <div className="container">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'var(--font-body)',
              padding: '0',
              marginBottom: '40px',
              transition: 'opacity 0.25s ease',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            &larr; Back
          </motion.button>
        </div>
      </div>

      {/* Hero: Project Title */}
      <section style={{ padding: '0 var(--grid-padding) var(--pt-medium)' }}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: '1.0',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              maxWidth: '900px',
            }}
          >
            {projectName}
          </motion.h1>
        </div>
      </section>

      {/* Project metadata grid */}
      <section
        style={{
          padding: 'var(--pt-small) var(--grid-padding)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '32px',
            }}
          >
            {/* Category */}
            <div>
              <p
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-disabled)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Category
              </p>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {project.category}
              </p>
            </div>

            {/* Year */}
            <div>
              <p
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-disabled)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Year
              </p>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                2024
              </p>
            </div>

            {/* Tech Stack */}
            {techList.length > 0 && (
              <div>
                <p
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-disabled)',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Tech Stack
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {techList.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '13px',
                        color: 'var(--tag-text)',
                        background: 'var(--tag-bg)',
                        padding: '3px 10px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(project.liveLink || project.githubLink) && (
              <div>
                <p
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-disabled)',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Links
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--text)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '2px',
                        transition: 'opacity 0.25s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
                      onMouseLeave={(e) => (e.target.style.opacity = '1')}
                    >
                      Live Site &rarr;
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--text)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        borderBottom: '1px solid var(--border)',
                        paddingBottom: '2px',
                        transition: 'opacity 0.25s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
                      onMouseLeave={(e) => (e.target.style.opacity = '1')}
                    >
                      Source &rarr;
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Full-bleed hero image */}
      {project.image && (
        <section style={{ padding: 'var(--pt-small) 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              overflow: 'hidden',
              background: 'var(--bg-secondary)',
            }}
          >
            <img
              src={project.image}
              alt={projectName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.div>
        </section>
      )}

      {/* Description */}
      {project.description && (
        <section
          style={{
            padding: 'var(--pt-medium) var(--grid-padding)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: 'var(--pt-small)',
                alignItems: 'start',
              }}
            >
              <p
                style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-disabled)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                About
              </p>
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.7',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  maxWidth: '640px',
                }}
              >
                {project.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Live site iframe */}
      {project.liveLink && (
        <section
          style={{
            padding: 'var(--pt-small) var(--grid-padding) var(--pt-medium)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="container">
            <p
              style={{
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-disabled)',
                fontFamily: 'var(--font-body)',
                marginBottom: '24px',
              }}
            >
              Preview
            </p>
            <div
              style={{
                width: '100%',
                aspectRatio: '16/10',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                position: 'relative',
              }}
            >
              <iframe
                src={project.liveLink}
                title={`${projectName} preview`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                marginTop: '12px',
              }}
            >
              Some sites may not load in iframes due to security policies.{' '}
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '1px',
                  transition: 'opacity 0.25s ease',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Open in new tab &rarr;
              </a>
            </p>
          </div>
        </section>
      )}

      {/* Next project navigation */}
      <NextProject currentId={id} data={data} />

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
          .container > div[style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}

function NextProject({ currentId, data }) {
  const allProjects = [
    ...(data.webProjects || []),
    ...(data.graphicDesignProjects || []),
  ]
  const currentIndex = allProjects.findIndex((p) => p.id === currentId)
  const next =
    currentIndex >= 0
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null

  if (!next) return null

  const nextName = next.name || next.title

  return (
    <section
      style={{
        padding: 'var(--pt-medium) var(--grid-padding)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <p
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-disabled)',
            fontFamily: 'var(--font-body)',
            marginBottom: '16px',
          }}
        >
          Next Project
        </p>
        <Link
          to={`/projects/${next.id}`}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            transition: 'opacity 0.25s ease',
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
          onMouseLeave={(e) => (e.target.style.opacity = '1')}
        >
          {nextName}
        </Link>
      </div>
    </section>
  )
}

export default ProjectDetail
