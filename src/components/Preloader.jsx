import { useEffect, useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import KineticTextLoader from './KineticTextLoader.jsx'

function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, prefersReduced ? 80 : 1800)

    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <Motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="preloader__brand">SOLKINGS / PORTFOLIO</span>
          <KineticTextLoader />
          <span className="preloader__note">Preparing the work</span>
        </Motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
