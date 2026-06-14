import { useMemo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import gsap from 'gsap'

function Home() {
  const { data } = usePortfolio()
  const [view, setView] = useState('list')
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  const projects = useMemo(
    () => [
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
    ],
    [data]
  )

  const heroName = data.hero?.name || 'SOLKINGS'
  const heroTitle = data.hero?.title || 'Creative Developer'

  const socials = data.contact?.socials || [
    { label: 'LinkedIn', url: '#' },
    { label: 'GitHub', url: '#' },
  ]

  // Hero mask reveal animation
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
      tl.fromTo(
        '.hero-mask-line',
        { y: '102%' },
        { y: '0%', duration: 0.8, ease: 'power3.out', stagger: 0.08 },
        '-=0.2'
      )
      tl.fromTo(
        '.hero-sub',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Track mouse for hover preview
  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <main style={{ paddingTop: '0' }}>
      {/* Hero */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 var(--grid-padding) var(--pt-medium)',
        }}
      >
        <div className="container">
          <span
            className="hero-eyebrow"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              fontWeight: 400,
              marginBottom: '24px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0,
            }}
          >
            Available for work — 2026
          </span>

          <div>
            <div style={{ overflow: 'hidden' }}>
              <h1
                className="hero-mask-line"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                  fontWeight: 800,
                  lineHeight: '0.95',
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                  textTransform: 'uppercase',
                }}
              >
                {heroName}
              </h1>
            </div>
            <div style={{ overflow: 'hidden', marginTop: '8px' }}>
              <p
                className="hero-mask-line"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                  letterSpacing: '-0.01em',
                }}
              >
                {heroTitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <div
        style={{
          padding: 'var(--pt-xsmall) var(--grid-padding)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
            }}
          >
            Selected Work ({projects.length})
          </span>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['list', 'grid'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: view === v ? 500 : 400,
                  color: view === v ? 'var(--text)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                  padding: '4px 0',
                  borderBottom: view === v ? '1px solid var(--text)' : '1px solid transparent',
                  transition: 'all 0.25s ease',
                }}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List View */}
      {view === 'list' && (
        <section
          style={{ padding: '0 var(--grid-padding) var(--pt-medium)' }}
          onMouseMove={handleMouseMove}
        >
          <div className="container">
            <div style={{ borderTop: '1px solid var(--border)' }}>
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
                      transition: 'opacity 0.3s ease',
                      opacity: hoveredIndex === -1 || hoveredIndex === index ? 1 : 0.35,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--text-disabled)',
                          fontVariantNumeric: 'tabular-nums',
                          minWidth: '28px',
                          fontWeight: 400,
                        }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                          fontWeight: 400,
                          color: 'var(--text)',
                          margin: 0,
                          transition: 'transform 0.4s var(--ease-out)',
                          transform: hoveredIndex === index ? 'translateX(8px)' : 'translateX(0)',
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {project.category && (
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                        >
                          {project.category}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--text-disabled)',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Floating hover preview */}
          {hoveredIndex >= 0 && projects[hoveredIndex]?.image && (
            <div
              style={{
                position: 'fixed',
                top: mousePos.y - 200,
                left: mousePos.x + 32,
                width: '300px',
                height: '380px',
                pointerEvents: 'none',
                zIndex: 80,
                overflow: 'hidden',
                borderRadius: '0',
                boxShadow: 'none',
              }}
            >
              <img
                src={projects[hoveredIndex].image}
                alt={projects[hoveredIndex].title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </section>
      )}

      {/* Projects Grid View */}
      {view === 'grid' && (
        <section style={{ padding: 'var(--pt-xsmall) var(--grid-padding) var(--pt-medium)' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2px',
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
                      position: 'relative',
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
                          transition: 'transform 0.6s var(--ease-out), filter 0.6s ease',
                          transform: hoveredIndex === index ? 'scale(1.04)' : 'scale(1)',
                          filter: hoveredIndex === index ? 'none' : 'grayscale(30%)',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-disabled)',
                          fontSize: '13px',
                        }}
                      >
                        {project.title}
                      </div>
                    )}
                    {/* Card title overlay with mix-blend */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '16px',
                        mixBlendMode: 'exclusion',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          fontWeight: 400,
                          color: '#ffffff',
                          margin: 0,
                        }}
                      >
                        {project.title}
                      </h3>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <section style={{ padding: 'var(--pt-medium) var(--grid-padding)' }}>
          <div className="container">
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', textAlign: 'center' }}>
              No projects yet. Add some in the admin panel.
            </p>
          </div>
        </section>
      )}

      {/* Social links bar */}
      <section
        style={{
          padding: 'var(--pt-xsmall) var(--grid-padding)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontWeight: 400,
                transition: 'opacity 0.25s ease',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              {s.label}
            </a>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}

export default Home
