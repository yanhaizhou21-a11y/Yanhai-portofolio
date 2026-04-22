import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

function GraphicGallery({ items }) {
  const loopItems = useMemo(() => [...items, ...items], [items])
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-gray-50 p-3">
      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        drag="x"
        dragConstraints={{ left: -300, right: 0 }}
      >
        {loopItems.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            className="w-56 shrink-0 rounded-xl border border-gray-300 bg-white p-3"
          >
            <div className="mb-3 h-32 rounded-lg border border-gray-300 bg-gray-200" />
            <p className="text-sm font-medium text-black">{item.title}</p>
          </article>
        ))}
      </motion.div>
    </div>
  )
}

function WebCardStack({ projects }) {
  const [active, setActive] = useState(0)
  const rotate = (direction) => {
    setActive((prev) => (prev + direction + projects.length) % projects.length)
  }

  return (
    <div className="relative min-h-[24rem] rounded-xl border border-gray-300 bg-gray-50 p-5">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          className="rounded-md border border-gray-300 px-3 py-2 text-xs transition hover:bg-gray-100"
          onClick={() => rotate(-1)}
        >
          Prev
        </button>
        <button
          type="button"
          className="rounded-md border border-gray-300 px-3 py-2 text-xs transition hover:bg-gray-100"
          onClick={() => rotate(1)}
        >
          Next
        </button>
      </div>

      <div className="relative h-[20rem]">
        <AnimatePresence>
          {projects.map((project, index) => {
            const offset = (index - active + projects.length) % projects.length
            if (offset > 2 && offset !== 0) return null

            return (
              <motion.article
                key={project.id}
                className="absolute inset-0 cursor-grab rounded-xl border border-gray-300 bg-white p-5 shadow-sm active:cursor-grabbing"
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{
                  opacity: offset === 0 ? 1 : 0.45,
                  scale: offset === 0 ? 1 : 0.94 - offset * 0.04,
                  y: offset * 12,
                  zIndex: offset === 0 ? 3 : 2 - offset,
                }}
                exit={{ opacity: 0, x: -80 }}
                drag={offset === 0 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) rotate(1)
                  if (info.offset.x > 80) rotate(-1)
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              >
                <div className="mb-4 h-32 rounded-lg border border-gray-300 bg-gray-200" />
                <h3 className="text-lg font-semibold text-black">{project.name}</h3>
                <p className="my-2 text-sm text-gray-700">{project.description}</p>
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-500">
                  {project.techStack}
                </p>
                <div className="flex gap-3 text-sm">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-gray-300 px-3 py-1 transition hover:bg-gray-100"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md bg-black px-3 py-1 text-white transition hover:bg-gray-800"
                  >
                    Live Site
                  </a>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ProjectsSection({ graphicDesignProjects, webProjects }) {
  return (
    <AnimatedSection id="projects" className="border-b border-gray-200 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Projects" title="Design and development showcase." />
        <div className="space-y-14">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Graphic Design</h3>
            <GraphicGallery items={graphicDesignProjects} />
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold">Web Projects</h3>
            <WebCardStack projects={webProjects} />
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default ProjectsSection
