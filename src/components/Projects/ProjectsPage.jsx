import { useMemo, useState } from 'react'
import CircularGallery from '../CircularGallery.jsx'

function ProjectsPage({ projects }) {
  const [tab, setTab] = useState('graphic')
  const webProjects = useMemo(() => projects.filter((p) => p.category === 'web'), [projects])
  const graphicItems = useMemo(() => 
    projects
      .filter(p => p.category === 'graphic')
      .map(p => ({ image: p.imageUrl, text: p.title })),
  [projects])

  return (
    <section className="section-wrap border-t-0">
      <div className="container">
        <div className="mb-10 flex gap-4 justify-center">
          <button 
            className="rounded-full border px-6 py-2.5 text-sm font-medium transition" 
            style={{ 
              borderColor: 'var(--border)', 
              background: tab === 'graphic' ? 'var(--accent)' : 'transparent',
              color: tab === 'graphic' ? 'var(--bg)' : 'var(--text)'
            }} 
            onClick={() => setTab('graphic')}
          >
            Graphic Design
          </button>
          <button 
            className="rounded-full border px-6 py-2.5 text-sm font-medium transition" 
            style={{ 
              borderColor: 'var(--border)', 
              background: tab === 'web' ? 'var(--accent)' : 'transparent',
              color: tab === 'web' ? 'var(--bg)' : 'var(--text)'
            }} 
            onClick={() => setTab('web')}
          >
            Web Projects
          </button>
        </div>

        {tab === 'graphic' && (
          <div className="w-full relative rounded-3xl overflow-hidden border" style={{ height: '70vh', minHeight: '600px', borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
            {graphicItems.length > 0 ? (
              <CircularGallery 
                items={graphicItems} 
                bend={3} 
                textColor="#ffffff" 
                borderRadius={0.05} 
                scrollSpeed={2} 
                scrollEase={0.05} 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                No graphic design projects yet.
              </div>
            )}
          </div>
        )}

        {tab === 'web' && (
          <div className="grid gap-12">
            {webProjects.length > 0 ? webProjects.map((project) => (
              <article key={project.id || project.title} className="rounded-3xl border p-6 md:p-10 shadow-lg" style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                  <div className="order-2 lg:order-1 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="mb-6 leading-relaxed text-lg" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
                    
                    <div className="mb-10 flex flex-wrap gap-2">
                      {(project.tags || []).map((tag) => (
                        <span key={tag} className="rounded-full border px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider" style={{ borderColor: 'var(--border)' }}>{tag}</span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-auto">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="rounded-xl border px-6 py-3 text-sm font-semibold transition hover:bg-white/5" style={{ borderColor: 'var(--border)' }}>
                          View GitHub
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="rounded-xl px-6 py-3 text-sm font-semibold transition hover:opacity-90" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
                          Live Web
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <img src={project.imageUrl || 'https://placehold.co/800x600'} alt={project.title} className="w-full h-full min-h-[300px] rounded-2xl object-cover" loading="lazy" />
                  </div>
                </div>
              </article>
            )) : (
              <div className="text-center py-20 text-sm text-gray-500">
                No web projects yet.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsPage
