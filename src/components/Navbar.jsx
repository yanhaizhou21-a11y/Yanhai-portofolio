import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import DecryptedText from './reactbits/DecryptedText.jsx'
import { useTheme } from '../hooks/useTheme.js'

function Navbar({ preloaderDone }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef(null)
  const navItemsRef = useRef(null)
  const tlRef = useRef(null)
  const headerRef = useRef(null)
  const linksRef = useRef(null)
  const { isDark, toggleTheme } = useTheme()

  const currentPath = location.pathname

  const links = [
    { label: 'Projects', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  // Animate nav items in with stagger after preloader
  useEffect(() => {
    if (!preloaderDone || !linksRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      linksRef.current.querySelectorAll('.nav-link-mask').forEach((el) => el.classList.add('revealed'))
      return
    }

    const maskLinks = linksRef.current.querySelectorAll('.nav-link-mask')
    gsap.to(maskLinks, {
      onStart: () => {
        maskLinks.forEach((el) => el.classList.add('revealed'))
      },
    })
  }, [preloaderDone])

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
      if (tlRef.current) tlRef.current.kill()

      if (overlayRef.current && overlayRef.current.style.display === 'flex') {
        gsap.to(overlayRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.4,
          ease: 'power3.inOut',
          onComplete: () => {
            if (overlayRef.current) overlayRef.current.style.display = 'none'
          },
        })
      }
    }
  }, [menuOpen])

  return (
    <>
      {/* ── Fixed Header ── */}
      <header
        ref={headerRef}
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
          background: 'var(--bg-nav)',
          backdropFilter: 'blur(12px)',
          borderBottom: menuOpen ? 'none' : '1px solid var(--border)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            transition: 'color 0.3s ease',
          }}
        >
          P
        </Link>

        {/* Desktop Nav */}
        <nav
          ref={linksRef}
          style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
          className="hidden md:flex"
        >
          {links.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-mask ${currentPath === link.path ? 'active' : ''}`}
              style={{
                color: currentPath === link.path ? 'var(--text)' : 'var(--text-disabled)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 400,
                position: 'relative',
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              <span
                className="nav-label"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <DecryptedText
                  text={link.label}
                  speed={40}
                  maxIterations={8}
                  animateOnMount={false}
                  revealOnHover={true}
                />
              </span>
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? '☀' : '☾'}
          </button>
        </nav>

        {/* Right side: Theme toggle (mobile) + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle md:hidden"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ width: '32px', height: '32px', fontSize: '14px' }}
          >
            {isDark ? '☀' : '☾'}
          </button>

          {/* Hamburger */}
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
                background: 'var(--text)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                transform: menuOpen ? 'translateY(7.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: 'var(--text)',
                transition: 'transform 0.3s ease, background 0.3s ease',
                transform: menuOpen ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
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
                color: 'var(--text)',
                textDecoration: 'none',
                overflow: 'hidden',
              }}
            >
              <span style={{ display: 'inline-block' }}>
                <DecryptedText
                  text={link.label}
                  speed={50}
                  maxIterations={12}
                  animateOnMount={false}
                  revealOnHover={true}
                />
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar
