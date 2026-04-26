import { Link } from 'react-router-dom'

function ProjectsPreview({ projects }) {
  const featured = projects.filter((p) => p.featured).length > 0 ? projects.filter((p) => p.featured).slice(0, 3) : projects.slice(0, 3)

  return (
    <section id="projects" className="section-wrap">
      <div className="container">
        <p className="label">// WORK</p>
        <h2 className="title">Featured Projects</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <article key={project.id} className="rounded-xl border p-3" style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
              <img src={project.imageUrl || 'https://placehold.co/800x600'} alt={project.title} className="h-48 w-full rounded-lg object-cover" loading="lazy" />
              <p className="mt-3 text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {project.category}
              </p>
              <h3 className="mt-1 text-lg">{project.title}</h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
            </article>
          ))}
        </div>
        <Link to="/projects" className="mt-6 inline-block text-sm">
          View All Projects →
        </Link>
      </div>
    </section>
  )
}

export default ProjectsPreview
