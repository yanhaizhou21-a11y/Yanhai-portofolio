import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | exiting | done
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (started) return
    setStarted(true)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setCount(100)
      setPhase('done')
      onComplete?.()
      return
    }

    // Counter using setInterval
    let current = 0
    const totalSteps = 60
    const interval = setInterval(() => {
      current++
      const pct = Math.min(Math.round((current / totalSteps) * 100), 100)
      setCount(pct)

      if (current >= totalSteps) {
        clearInterval(interval)
        setPhase('exiting')
        setTimeout(() => {
          setPhase('done')
          onComplete?.()
        }, 800)
      }
    }, 25)

    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'var(--preloader-bg, var(--bg, #fff))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '40px',
          }}
        >
          {/* Top: Brand + Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 400,
                color: 'var(--text)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              SOLKINGS
            </motion.span>

            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--text-disabled)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.05em',
              }}
            >
              {String(count).padStart(3, '0')}%
            </span>
          </div>

          {/* Center: Progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: '200px',
              height: '1px',
              background: 'var(--text)',
              transformOrigin: 'left center',
              alignSelf: 'center',
              opacity: 0.3,
            }}
          />

          {/* Bottom: text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'flex-end',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Portfolio
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--text-disabled)',
                letterSpacing: '0.05em',
              }}
            >
              Loading...
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
