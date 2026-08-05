import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function Projects() {
  const { data } = usePortfolio()
  const [view, setView] = useState('list')

  const projects = useMemo(
    () => [
      ...(data.webProjects || []).map((project) => ({
        id: project.id,
        title: project.name,
        image: project.image,
        description: project.description,
        category: 'Development',
        year: '2024',
      })),
      ...(data.graphicDesignProjects || []).map((project) => ({
        id: project.id,
        title: project.title,
        image: project.image,
        category: 'Design',
        year: '2024',
      })),
    ],
    [data],
  )

  return (
    <main className="projects-page">
      <header className="projects-page__header">
        <div>
          <span className="eyebrow">Selected work / {String(projects.length).padStart(2, '0')}</span>
          <h1>Projects</h1>
        </div>
        <p>A focused archive of interfaces, identities, and digital experiences built with equal attention to systems and feeling.</p>
      </header>

      <div className="projects-page__toolbar">
        <span>Archive / 2021—Present</span>
        <div role="group" aria-label="Project layout">
          {['list', 'grid'].map((option) => (
            <button
              key={option}
              type="button"
              className={view === option ? 'is-active' : ''}
              onClick={() => setView(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {projects.length > 0 ? (
        <section className={`project-archive project-archive--${view}`}>
          {projects.map((project, index) => (
            <Link className="project-card" key={project.id} to={`/projects/${project.id}`}>
              <span className="project-card__number">{String(index + 1).padStart(2, '0')}</span>
              <div className="project-card__image">
                {project.image ? <img src={project.image} alt="" /> : <span>No preview</span>}
              </div>
              <div className="project-card__copy">
                <h2>{project.title}</h2>
                <p>{project.description || 'Visual direction and digital craft.'}</p>
              </div>
              <div className="project-card__meta">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <span className="project-card__arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </section>
      ) : (
        <p className="projects-page__empty">No projects yet. Add work from the admin panel.</p>
      )}

      <Footer />
    </main>
  )
}

export default Projects
