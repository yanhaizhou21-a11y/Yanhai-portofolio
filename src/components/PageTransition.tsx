import { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const location = useLocation()
  const [transitioning, setTransitioning] = useState(false)
  const prevPath = useRef(location.pathname)
  const containerRef = useRef(null)

  useEffect(() => {
    if (prevPath.current === location.pathname) return
    prevPath.current = location.pathname
    setTransitioning(true)
    const timer = setTimeout(() => setTransitioning(false), 400)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          background: 'var(--bg)',
          pointerEvents: 'none',
          transform: transitioning ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <div
        ref={containerRef}
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(10px)' : 'translateY(0)',
          transition: 'opacity 0.3s ease 0.35s, transform 0.3s ease 0.35s',
        }}
      >
        {children}
      </div>
    </>
  )
}

export default PageTransition
