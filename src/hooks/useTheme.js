import { useState, useEffect, useCallback } from 'react'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('portfolio-theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    // Initial DOM setup
    const currentTheme = getInitialTheme()
    document.documentElement.setAttribute('data-theme', currentTheme)
    if (document.documentElement.classList.contains('dark') !== (currentTheme === 'dark')) {
      document.documentElement.classList.toggle('dark', currentTheme === 'dark')
    }

    const handleThemeChange = (e) => {
      const nextTheme = e.detail || getInitialTheme()
      setThemeState(nextTheme)
      document.documentElement.setAttribute('data-theme', nextTheme)
      document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    }

    window.addEventListener('portfolio-theme-change', handleThemeChange)
    return () => window.removeEventListener('portfolio-theme-change', handleThemeChange)
  }, [])

  const setTheme = useCallback((newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('portfolio-theme', newTheme)
    setThemeState(newTheme)
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: newTheme }))
  }, [])

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme') || theme
    const next = current === 'light' ? 'dark' : 'light'
    setTheme(next)
  }, [theme, setTheme])

  return { theme, toggleTheme, setTheme, isDark: theme === 'dark' }
}
