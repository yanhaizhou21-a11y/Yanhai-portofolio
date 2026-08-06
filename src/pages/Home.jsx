import React from 'react'
import Footer from '../components/Footer.jsx'
import HeroScrollAnimation from '../components/ui/hero-scroll-animation.jsx'
import { useTheme } from '../hooks/useTheme.js'

function Home() {
  const { isDark } = useTheme()

  return (
    <div className={`home-page min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-[#f4f3ef] text-[#191b1e]'}`}>
      <HeroScrollAnimation />
      <Footer />
    </div>
  )
}

export default Home
