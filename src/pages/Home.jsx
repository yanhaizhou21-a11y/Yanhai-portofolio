import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useMaskReveal } from '../hooks/useGsap.js'

function Home() {
  const { data } = usePortfolio()
  const heroRef = useRef(null)
  const galleryRef = useRef(null)
  const [view, setView] = useState('gallery') // 'gallery' | 'list'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragDelta = useRef(0)

  useMaskReveal(heroRef)

  const projects = [
    ...(data.webProjects || []).map((p) => ({
      id: p.id,
      title: p.name,
      year: '2024',
      image: p.image,
      description: p.description,
      techStack: p.techStack,
      liveLink: p.liveLink,
      githubLink: p.githubLink,
    })),
    ...(data.graphicDesignProjects || []).map((p) => ({
      id: p.id,
      title: p.title,
      year: '2024',
      image: p.image,
    })),
  ]

  const totalProjects = projects.length || 1
  const currentProject = projects[currentIndex]

  // Navigate gallery with scroll wheel
  useEffect(() => {
    if (view !== 'gallery') return

    const handleWheel = (e) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < 30) return

      if (e.deltaY > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, totalProjects - 1))
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }
    }

    const el = galleryRef.current
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false })
      return () => el.removeEventListener('wheel', handleWheel)
    }
  }, [view, totalProjects])

  // Drag handlers
  const handleDragStart = useCallback(
    (clientX) => {
      if (view !== 'gallery') return
      setIsDragging(true)
      dragStartX.current = clientX
      dragDelta.current = 0
    },
    [view],
  )

  const handleDragMove = useCallback(
    (clientX) => {
      if (!isDragging) return
      dragDelta.current = clientX - dragStartX.current
    },
    [isDragging],
  )

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    if (dragDelta.current < -50) {
      setCurrentIndex((prev) => Math.min(prev + 1, totalProjects - 1))
    } else if (dragDelta.current > 50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
    dragDelta.current = 0
  }, [isDragging, totalProjects])

  // Animate gallery transitions
  useEffect(() => {
    if (view !== 'gallery' || !galleryRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const activeItem = galleryRef.current.querySelector('.gallery-item--active')
    if (activeItem) {
      gsap.fromTo(
        activeItem,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
      )
    }
  }, [currentIndex, view])

  const heroName = data.hero?.name || '[YOUR NAME]'
  const heroTitle = data.hero?.title || 'Creative Developer'

  return (
    <main style={{ paddingTop: '80px' }}>
      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        style={{
          padding: '80px 32px 40px',
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div className="container">
          <h1
            data-mask
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 48px)',
              fontWeight: 400,
              lineHeight: '1.1',
              maxWidth: '800px',
              color: '#000',
            }}
          >
            {heroTitle}
          </h1>
        </div>
      </section>

      {/* ── View Toggle ── */}
      <div
        style={{
          padding: '0 32px',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        <div className="container" style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setView('gallery')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: view === 'gallery' ? 700 : 400,
              color: view === 'gallery' ? '#000' : '#9ca3af',
              cursor: 'pointer',
              padding: '4px 0',
              borderBottom: view === 'gallery' ? '1px solid #000' : '1px solid transparent',
            }}
          >
            Gallery
          </button>
          <button
            onClick={() => setView('list')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: view === 'list' ? 700 : 400,
              color: view === 'list' ? '#000' : '#9ca3af',
              cursor: 'pointer',
              padding: '4px 0',
              borderBottom: view === 'list' ? '1px solid #000' : '1px solid transparent',
            }}
          >
            List
          </button>
        </div>
      </div>

      {/* ── Gallery View ── */}
      {view === 'gallery' && (
        <section
          ref={galleryRef}
          style={{
            position: 'relative',
            height: 'calc(100vh - 280px)',
            minHeight: '400px',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`gallery-item ${index === currentIndex ? 'gallery-item--active' : ''}`}
            >
              <div className="img-container" style={{ width: '100%', height: '100%' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          ))}

          {/* Scroll/Drag hint */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '32px',
              fontSize: '12px',
              color: '#9ca3af',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.05em',
              zIndex: 2,
            }}
          >
            Scroll / Drag
          </div>
        </section>
      )}

      {/* ── List View ── */}
      {view === 'list' && (
        <section style={{ padding: '40px 32px', minHeight: '60vh' }}>
          <div className="container">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-list-item"
                onClick={() => {
                  setCurrentIndex(index)
                  setView('gallery')
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    minWidth: '40px',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                    fontWeight: 500,
                    flex: 1,
                  }}
                >
                  {project.title}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                  }}
                >
                  {project.year}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Progress Bar ── */}
      {view === 'gallery' && (
        <div
          style={{
            padding: '16px 32px',
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              gap: '4px',
            }}
          >
            {projects.map((_, index) => (
              <div
                key={index}
                className={`progress-segment ${index <= currentIndex ? 'progress-segment--active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom Bar ── */}
      <footer
        style={{
          padding: '24px 32px',
          borderTop: '1px dashed rgba(0,0,0,0.3)',
          marginTop: '16px',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <p style={{ fontWeight: 700, fontSize: '16px' }}>{heroName}</p>
            <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 400 }}>{heroTitle}</p>
          </div>
          <p
            style={{
              fontWeight: 700,
              fontSize: '16px',
              fontStyle: 'italic',
            }}
          >
            {currentProject?.title}
          </p>
        </div>
      </footer>
    </main>
  )
}

export default Home
