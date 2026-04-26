function AboutExperience({ config, experience }) {
  return (
    <section id="about" className="section-wrap">
      <div className="container grid gap-10 md:grid-cols-2">
        <div>
          <p className="label">// ABOUT</p>
          <h2 className="title">About & Experience</h2>
          <img src={config.aboutPhotoUrl || 'https://placehold.co/900x700'} alt="profile" className="mt-6 h-80 w-full rounded-xl object-cover" loading="lazy" />
          <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {config.bio || 'Creative developer focused on expressive interfaces and performant web products.'}
          </p>
          <p className="mt-4 text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            {(config.values || []).join(' · ')}
          </p>
        </div>
        <div>
          <div className="mt-12 border-l pl-6" style={{ borderColor: 'var(--border)' }}>
            {(experience || []).map((item) => (
              <article key={item.id || item.company} className="mb-8">
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.dateRange}</p>
                <h3 className="text-xl">{item.company}</h3>
                <p className="text-sm">{item.role}</p>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutExperience
