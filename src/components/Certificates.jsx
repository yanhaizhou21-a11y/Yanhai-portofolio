import { useState } from 'react'

function Certificates({ certificates }) {
  const [active, setActive] = useState(null)

  return (
    <section className="section-wrap" id="certificates">
      <div className="container">
        <p className="label">// CERTIFICATES</p>
        <h2 className="title">Licenses & Certifications</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {certificates.map((item) => (
            <button key={item.id} onClick={() => setActive(item)} className="rounded-xl border p-3 text-left" style={{ borderColor: 'var(--border)', background: 'var(--card-bg)' }}>
              <img src={item.imageUrl || 'https://placehold.co/800x600'} alt={item.title} className="h-40 w-full rounded-lg object-cover" loading="lazy" />
              <h3 className="mt-3">{item.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.issuer} · {item.date}</p>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setActive(null)}>
          <article className="w-full max-w-3xl rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }} onClick={(e) => e.stopPropagation()}>
            <img src={active.imageUrl || 'https://placehold.co/1400x900'} alt={active.title} className="h-[28rem] w-full rounded-lg object-contain" />
            <h3 className="mt-4 text-xl">{active.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{active.issuer} · {active.date}</p>
            {active.link && <a href={active.link} className="mt-3 inline-block underline" target="_blank" rel="noreferrer">View Certificate</a>}
          </article>
        </div>
      )}
    </section>
  )
}

export default Certificates
