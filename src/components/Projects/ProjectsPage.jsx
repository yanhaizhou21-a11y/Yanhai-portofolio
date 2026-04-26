import { useMemo, useState } from 'react'

function ProjectsPage({ projects }) {
  const [tab, setTab] = useState('graphic')
  const list = useMemo(() => projects.filter((p) => p.category === tab), [projects, tab])
  const [active, setActive] = useState(null)
  const current = list.find((p) => p.id === active) || list[0]

  return (
    <section className="section-wrap border-t-0">
      <div className="container">
        <div className="mb-6 flex gap-2">
          <button className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: 'var(--border)' }} onClick={() => setTab('graphic')}>Graphic Design</button>
          <button className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: 'var(--border)' }} onClick={() => setTab('web')}>Web Projects</button>
        </div>
        <div className="grid gap-6 md:grid-cols-[60%_40%]">
          <article className="rounded-xl border p-3" style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
            <img src={current?.imageUrl || 'https://placehold.co/1200x900'} alt={current?.title} className="h-[420px] w-full rounded-lg object-cover" loading="lazy" />
            <div className="mt-3 flex items-center justify-between">
              <h2 className="text-xl">{current?.title || 'No project yet'}</h2>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{current?.category}</span>
            </div>
          </article>
          <aside className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
            <h3 className="text-lg">{current?.title}</h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{current?.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(current?.tags || []).map((tag) => <span key={tag} className="rounded-full border px-2 py-1 text-xs" style={{ borderColor: 'var(--border)' }}>{tag}</span>)}
            </div>
            {current?.link && <a className="mt-5 inline-block text-sm underline" href={current.link} target="_blank" rel="noreferrer">Open project</a>}
          </aside>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {list.map((item) => (
            <button key={item.id} onClick={() => setActive(item.id)} className="overflow-hidden rounded-lg border text-left transition hover:-translate-y-1" style={{ borderColor: 'var(--border)' }}>
              <img src={item.imageUrl || 'https://placehold.co/600x450'} alt={item.title} className="h-28 w-full object-cover" loading="lazy" />
              <div className="p-2 text-sm">{item.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsPage
