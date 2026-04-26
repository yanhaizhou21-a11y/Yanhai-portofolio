import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme.js'
import StaggeredMenu from './StaggeredMenu.jsx'

function Navbar() {
  const { theme, toggle } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const goToSection = (sectionId) => {
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    navigate(`/#${sectionId}`)
  }
  const logoSvgUrl = useMemo(() => {
    const fill = theme === 'dark' ? '%23f0ede8' : '%230a0a0a'
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='48'><text x='0' y='34' fill='${fill}' font-family='Arial' font-size='28' font-weight='700' letter-spacing='5'>SOLKINGS</text></svg>`
  }, [theme])

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go home', link: '/#home', onClick: () => goToSection('home') },
    { label: 'Projects', ariaLabel: 'Open projects', link: '/projects', onClick: () => navigate('/projects') },
    { label: 'Skills', ariaLabel: 'Go to skills', link: '/#skills', onClick: () => goToSection('skills') },
    { label: 'About', ariaLabel: 'Go to about', link: '/#about', onClick: () => goToSection('about') },
    { label: 'Contact', ariaLabel: 'Go to contact', link: '/#contact', onClick: () => goToSection('contact') },
  ]

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
    { label: 'Dribbble', link: 'https://dribbble.com' },
  ]

  return (
    <header className="relative z-50">
      <button
        onClick={toggle}
        aria-label="toggle theme"
        className="fixed right-[5.7rem] top-[1.1rem] z-[70] rounded-full border p-2"
        style={{ borderColor: 'var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>
      <StaggeredMenu
        position="right"
        isFixed
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor={theme === 'dark' ? '#f0ede8' : '#0a0a0a'}
        openMenuButtonColor={theme === 'dark' ? '#f0ede8' : '#0a0a0a'}
        changeMenuColorOnOpen
        colors={theme === 'dark' ? ['#1a1a1a', '#0a0a0a'] : ['#e6e2db', '#f5f2ed']}
        logoUrl={logoSvgUrl}
        accentColor={theme === 'dark' ? '#ffffff' : '#0a0a0a'}
      />
    </header>
  )
}

export default Navbar
