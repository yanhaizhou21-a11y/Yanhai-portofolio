import { useEffect, useMemo, useRef, useState } from 'react'
import AnimatedSection from '../components/AnimatedSection.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import CardSwap, { Card } from '../components/CardSwap.jsx'

function WebProjectCard({ project }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-500 group-hover/card:border-white/40 group-hover/card:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),0_0_28px_rgba(255,255,255,0.15)]" />
      <div className="flex h-full w-full flex-col p-6 transition-transform duration-500 ease-out group-hover/card:-translate-x-2">
      <div className="mb-4 h-36 rounded-lg border border-white/5 bg-white/5 overflow-hidden">
        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
          />
        )}
      </div>
      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
      <p className="my-2 text-sm text-gray-400 line-clamp-2">{project.description}</p>
      <p className="mb-4 text-xs uppercase tracking-[0.15em] text-gray-600">
        {project.techStack}
      </p>
      <div className="mt-auto flex gap-3 text-sm">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-white/15 px-3 py-1.5 text-gray-300 transition duration-300 hover:border-white hover:text-white hover:shadow-[0_0_14px_rgba(255,255,255,0.18)]"
        >
          GitHub
        </a>
        <a
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-white px-3 py-1.5 text-black transition duration-300 hover:bg-gray-200 hover:shadow-[0_0_14px_rgba(255,255,255,0.2)]"
        >
          Live Site
        </a>
      </div>
      </div>
    </div>
  )
}

function ProjectsSection({ graphicDesignProjects, webProjects }) {
  const cardSwapRef = useRef(null)
  const [activeDesignIndex, setActiveDesignIndex] = useState(1)
  const [isAnimatingDesign, setIsAnimatingDesign] = useState(true)
  const [isDesignHovered, setIsDesignHovered] = useState(false)

  const designSlides = useMemo(
    () => graphicDesignProjects.filter((project) => project.image),
    [graphicDesignProjects],
  )
  const loopedDesignSlides = useMemo(() => {
    if (designSlides.length <= 1) return designSlides
    return [designSlides[designSlides.length - 1], ...designSlides, designSlides[0]]
  }, [designSlides])
  const visibleDesignIndex = useMemo(() => {
    if (designSlides.length === 0) return 0
    if (designSlides.length === 1) return 0
    return (activeDesignIndex - 1 + designSlides.length) % designSlides.length
  }, [activeDesignIndex, designSlides])

  useEffect(() => {
    if (designSlides.length <= 1 || isDesignHovered) return undefined
    const timer = window.setInterval(() => {
      setIsAnimatingDesign(true)
      setActiveDesignIndex((prev) => prev + 1)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [designSlides.length, isDesignHovered])

  useEffect(() => {
    if (designSlides.length <= 1) {
      setActiveDesignIndex(0)
      return
    }
    setActiveDesignIndex(1)
    setIsAnimatingDesign(true)
  }, [designSlides.length])

  const showNextDesign = () => {
    if (designSlides.length <= 1) return
    setIsAnimatingDesign(true)
    setActiveDesignIndex((prev) => prev + 1)
  }

  const showPrevDesign = () => {
    if (designSlides.length <= 1) return
    setIsAnimatingDesign(true)
    setActiveDesignIndex((prev) => prev - 1)
  }

  const handleDesignTransitionEnd = () => {
    if (designSlides.length <= 1) return
    if (activeDesignIndex === 0) {
      setIsAnimatingDesign(false)
      setActiveDesignIndex(designSlides.length)
      return
    }
    if (activeDesignIndex === designSlides.length + 1) {
      setIsAnimatingDesign(false)
      setActiveDesignIndex(1)
    }
  }

  useEffect(() => {
    if (isAnimatingDesign) return
    const raf = window.requestAnimationFrame(() => {
      setIsAnimatingDesign(true)
    })
    return () => window.cancelAnimationFrame(raf)
  }
  , [isAnimatingDesign])

  return (
    <AnimatedSection id="projects" className="border-b border-white/10 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Projects" title="Design and development showcase." />
        <div className="space-y-20">
          {/* ── Graphic Design: CircularGallery ── */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-white">Graphic Design</h3>
            <div
              className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]"
              style={{ height: '50vh', minHeight: '360px' }}
              onMouseEnter={() => setIsDesignHovered(true)}
              onMouseLeave={() => setIsDesignHovered(false)}
            >
              {designSlides.length > 0 ? (
                <>
                  <div
                    className="flex h-full"
                    style={{
                      transform: `translateX(-${activeDesignIndex * 100}%)`,
                      transition: isAnimatingDesign ? 'transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
                    }}
                    onTransitionEnd={handleDesignTransitionEnd}
                  >
                    {loopedDesignSlides.map((slide, index) => (
                      <img
                        key={`${slide.id}-${index}`}
                        src={slide.image}
                        alt={slide.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full shrink-0 object-cover"
                      />
                    ))}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    <p className="text-lg font-medium text-white">
                      {designSlides[visibleDesignIndex]?.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/35 px-3 py-2 text-sm text-white transition hover:bg-black/60"
                    onClick={showPrevDesign}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/35 px-3 py-2 text-sm text-white transition hover:bg-black/60"
                    onClick={showNextDesign}
                  >
                    →
                  </button>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  Add at least one graphic design image.
                </div>
              )}
            </div>
          </div>

          {/* ── Web Projects: CardSwap ── */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Web Projects</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-gray-400 transition hover:border-white hover:text-white"
                  onClick={() => cardSwapRef.current?.swapPrev()}
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-gray-400 transition hover:border-white hover:text-white"
                  onClick={() => cardSwapRef.current?.swapNext()}
                >
                  Next →
                </button>
              </div>
            </div>
            <div className="relative" style={{ height: '520px' }}>
              <CardSwap
                ref={cardSwapRef}
                width={420}
                height={440}
                cardDistance={50}
                verticalDistance={60}
                delay={6000}
                pauseOnHover={true}
                skewAmount={4}
                easing="elastic"
              >
                {webProjects.map((project) => (
                  <Card key={project.id}>
                    <WebProjectCard project={project} />
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default ProjectsSection
