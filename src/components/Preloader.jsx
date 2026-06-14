import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [done, setDone] = useState(false)
  const containerRef = useRef(null)
  const lineRef = useRef(null)
  const bottomRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setCount(100)
      setDone(true)
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
        setExiting(true)
        setTimeout(() => {
          setDone(true)
          onComplete?.()
        }, 700)
      }
    }, 25)

    // GSAP entrance animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Line fill
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
          },
          0
        )
      }

      // Bottom text fade in
      if (bottomRef.current) {
        tl.fromTo(
          bottomRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          0.4
        )
      }
    }, containerRef)

    return () => {
      clearInterval(interval)
      ctx.revert()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--preloader-bg, var(--bg, #fff))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: exiting ? 'transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
      }}
    >
      {/* Top: Brand + Counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
        <span
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
        </span>

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
      <div
        ref={lineRef}
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
      <div
        ref={bottomRef}
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
      </div>
    </div>
  )
}

export default Preloader
