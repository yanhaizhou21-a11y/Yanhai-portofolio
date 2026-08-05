import { useState } from 'react'
import { AnimatePresence, motion as Motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useTheme } from '../hooks/useTheme.js'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

function ThemeIcon({ isDark }) {
  return isDark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.5A8.5 8.5 0 0 1 8.5 3.8 8.5 8.5 0 1 0 20.2 15.5Z" /></svg>
  )
}

export function AnimatedNavFramer() {
  const location = useLocation()
  const { data } = usePortfolio()
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const brand = data.hero?.name && !data.hero.name.startsWith('[') ? data.hero.name : 'SOLKINGS'

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 24))

  const isActive = (path) => (
    path === '/projects'
      ? location.pathname.startsWith('/projects')
      : location.pathname === path
  )

  return (
    <>
      <Motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}
      >
        <Link className="site-nav__brand" to="/" aria-label={`${brand} home`}>
          <svg className="site-nav__mark" viewBox="0 0 20 20" aria-hidden="true">
            <path d="m3 13 7-7 7 7M5 17l5-5 5 5" />
          </svg>
          <span>{brand}</span>
        </Link>

        <nav className="site-nav__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={isActive(link.path) ? 'is-active' : ''}
              to={link.path}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-nav__actions">
          <button
            className="site-nav__theme"
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <ThemeIcon isDark={isDark} />
          </button>
          <Link className="site-nav__cta" to="/contact">Let&apos;s talk</Link>
          <button
            className="site-nav__menu"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </Motion.header>

      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            className="mobile-nav"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <Motion.div
                  key={link.path}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + index * 0.06 }}
                >
                  <Link to={link.path} onClick={() => setMenuOpen(false)}>{link.label}</Link>
                </Motion.div>
              ))}
            </nav>
            <p>Independent designer &amp; developer</p>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AnimatedNavFramer
