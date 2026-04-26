function Footer() {
  return (
    <footer id="contact" className="section-wrap">
      <div
        className="container rounded-2xl border p-8"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
      >
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: 'var(--accent)' }} />
              <p className="font-medium" style={{ color: 'var(--text)' }}>
                SOLKINGS
              </p>
            </div>
            <p className="mb-4 max-w-md text-sm" style={{ color: 'var(--text-muted)' }}>
              Creative developer portfolio showcasing immersive web, design systems, motion,
              and brand-focused digital products.
            </p>
            <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              <a href="#home">Overview</a>
              <a href="#projects">Features</a>
              <a href="#skills">Pricing</a>
              <a href="#about">Help</a>
              <a href="#contact">Privacy</a>
            </div>
          </div>
          <div>
            <p className="text-sm" style={{ color: 'var(--text)' }}>
              Stay up to date
            </p>
            <div className="mt-3 flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border px-3 py-2 text-sm placeholder:text-white/40"
                style={{
                  color: 'var(--text)',
                  borderColor: 'var(--border)',
                  background: 'transparent',
                }}
              />
              <button
                className="rounded-lg px-4 py-2 text-sm font-medium"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <hr className="my-8 border-0 border-t" style={{ borderColor: 'var(--border)' }} />
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          <p>© {new Date().getFullYear()} SOLKINGS. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
