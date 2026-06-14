import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme.js'

function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const links = [
    { label: 'Projects', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 32px',
          background: 'var(--bg-nav)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          P
        </Link>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div className="desktop-nav">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: isActive(link.path) ? 600 : 400,
                  color: isActive(link.path) ? 'var(--text)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  background: isActive(link.path) ? 'var(--hover-bg)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path)) e.target.style.background = 'var(--hover-bg)'
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) e.target.style.background = 'transparent'
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
              border: '1px solid var(--border)',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text)',
              fontSize: '16px',
              borderRadius: '6px',
              marginLeft: '8px',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.borderColor = 'var(--text)'}
            onMouseLeave={(e) => e.target.style.borderColor = 'var(--border)'}
          >
            {isDark ? '☀' : '☾'}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="hamburger-btn"
            style={{
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              marginLeft: '4px',
            }}
          >
            <span style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              background: 'var(--text)',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              background: 'var(--text)',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '32px',
                fontWeight: isActive(link.path) ? 700 : 400,
                color: 'var(--text)',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .hamburger-btn {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
