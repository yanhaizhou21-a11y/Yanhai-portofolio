import React from 'react'
import Footer from '../components/Footer'
import HeroScrollAnimation from '../components/ui/hero-scroll-animation'
import { useTheme } from '../hooks/useTheme'
import ReactLenis from 'lenis/react'

function Home() {
  const { isDark } = useTheme()

  return (
    <ReactLenis root>
      <div className={`home-page min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-[#f4f3ef] text-[#191b1e]'}`}>
        <HeroScrollAnimation />
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default Home
