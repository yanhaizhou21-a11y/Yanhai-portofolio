import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme.js'
import gsap from 'gsap'

function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const menuRef = useRef(null)

  const links = [
    { label: 'Projects', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    if (!menuRef.current) return
    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.to(menuRef.current, {
          x: 0,
          duration: 0.64,
          ease: 'power4.out',
        })
        gsap.to('.menu-link', {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.2,
        })
      } else {
        gsap.set(menuRef.current, { x: '100%' })
        gsap.set('.menu-link', { y: '102%', opacity: 0 })
      }
    }, menuRef)
    return () => ctx.revert()
  }, [menuOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          mixBlendMode: 'exclusion',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px var(--grid-padding)',
          background: 'transparent',
          pointerEvents: 'auto',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '22px',
            fontWeight: 400,
            color: '#ffffff',
            textDecoration: 'none',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          SOLKINGS
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div className="desktop-nav" style={{ display: 'flex', gap: '24px' }}>
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#ffffff',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  opacity: isActive(link.path) ? 1 : 0.6,
                  transition: 'opacity 0.25s ease',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '1')}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) e.target.style.opacity = '0.6'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '14px',
              borderRadius: '0',
              transition: 'border-color 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
          >
            {isDark ? '☀' : '☾'}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="hamburger-btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 120,
              position: 'relative',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: menuOpen ? '#000' : '#ffffff',
                transition: 'transform 0.4s var(--ease-out), background 0.3s ease',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: menuOpen ? '#000' : '#ffffff',
                transition: 'transform 0.4s var(--ease-out), background 0.3s ease',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu - slides from right */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 110,
          background: 'var(--bg)',
          transform: 'translateX(100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 var(--grid-padding)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          {links.map((link) => (
            <div key={link.path} style={{ overflow: 'hidden', marginBottom: '24px' }}>
              <Link
                className="menu-link"
                to={link.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 6vw, 56px)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                  transform: 'translateY(102%)',
                  opacity: 0,
                }}
              >
                {link.label}
              </Link>
            </div>
          ))}

          <div style={{ marginTop: '56px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-disabled)',
              marginBottom: '16px',
            }}>
              Social
            </p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {['GitHub', 'LinkedIn', 'Behance'].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'opacity 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .hamburger-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
