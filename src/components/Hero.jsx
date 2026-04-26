import ProfileCard from './ProfileCard.jsx'

function Hero({ config }) {
  return (
    <section id="home" className="section-wrap border-t-0">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div>
          <h1 className="text-6xl leading-[0.95]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            {config.name}
          </h1>
          <p className="mt-2 text-2xl font-light">{config.role}</p>
          <hr className="my-6 border-0 border-t" style={{ borderColor: 'var(--border)' }} />
          <p style={{ color: 'var(--text-muted)' }}>{config.heroTagline}</p>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <ProfileCard
            name={config.name}
            title={config.role}
            handle="carlosprado"
            status="Available for work"
            contactText="Say Hello"
            avatarUrl={config.avatarUrl}
            iconUrl={config.iconUrl}
            showUserInfo
            enableTilt
            enableMobileTilt={false}
            behindGlowEnabled
            behindGlowColor="rgba(255, 255, 255, 0.08)"
            innerGradient="linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)"
            onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </div>
      <div className="marquee-wrap mt-16">
        <div className="marquee">CREATIVE DEVELOPER · FRONTEND · MOTION · UI/UX DESIGN · BRANDING · WEB3 · CREATIVE DEVELOPER · FRONTEND · MOTION · UI/UX DESIGN · BRANDING · WEB3 ·</div>
      </div>
    </section>
  )
}

export default Hero
