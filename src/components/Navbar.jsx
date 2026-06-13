import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'

function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef(null)
  const navItemsRef = useRef(null)
  const tlRef = useRef(null)

  const currentPath = location.pathname

  const links = [
    { label: 'Projects', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) setMenuOpen(false)
  }, [location.pathname])

  // Animate menu overlay
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      if (overlayRef.current) {
        overlayRef.current.style.display = menuOpen ? 'flex' : 'none'
      }
      return
    }

    if (menuOpen) {
      // Open animation
      if (overlayRef.current) {
        overlayRef.current.style.display = 'flex'
      }

      tlRef.current = gsap.timeline()

      tlRef.current.fromTo(
        overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power3.inOut' },
      )

      if (navItemsRef.current) {
        const items = navItemsRef.current.querySelectorAll('.menu-item')
        tlRef.current.fromTo(
          items,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power3.out',
          },
          '-=0.2',
        )
      }
    } else {
      // Close animation
      if (tlRef.current) {
        tlRef.current.kill()
      }

      if (overlayRef.current && overlayRef.current.style.display === 'flex') {
        gsap.to(overlayRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.4,
          ease: 'power3.inOut',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none'
            }
          },
        })
      }
    }
  }, [menuOpen])

  return (
    <>
      {/* ── Fixed Header ── */}
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
          padding: '24px 32px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: menuOpen ? 'none' : '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '24px',
            fontWeight: 700,
            color: '#000',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          P
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="hidden md:flex"
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${currentPath === link.path ? 'nav-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            zIndex: 70,
          }}
          className="md:hidden"
        >
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              background: menuOpen ? '#000' : '#000',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              background: menuOpen ? '#000' : '#000',
              transition: 'transform 0.3s ease',
              transform: menuOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        ref={overlayRef}
        className="menu-overlay"
        style={{
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          clipPath: 'inset(0 0 100% 0)',
        }}
      >
        <nav
          ref={navItemsRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="menu-item"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '32px',
                fontWeight: currentPath === link.path ? 700 : 400,
                color: '#000',
                textDecoration: 'none',
                overflow: 'hidden',
              }}
            >
              <span style={{ display: 'inline-block' }}>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar
