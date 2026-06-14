import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [done, setDone] = useState(false)
  const containerRef = useRef(null)
  const logoPathRef = useRef(null)
  const logoCircleRef = useRef(null)
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

    // --- Counter using setInterval (bulletproof) ---
    let current = 0
    const totalSteps = 60 // ~60 frames over 1.5s at 25ms interval
    const interval = setInterval(() => {
      current++
      const pct = Math.min(Math.round((current / totalSteps) * 100), 100)
      setCount(pct)

      if (current >= totalSteps) {
        clearInterval(interval)
        // Start exit
        setExiting(true)
        setTimeout(() => {
          setDone(true)
          onComplete?.()
        }, 700)
      }
    }, 25) // 25ms per step = ~1.5s total

    // --- GSAP entrance animations ---
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // SVG path draw
      if (logoPathRef.current) {
        const path = logoPathRef.current
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        tl.to(path, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0)
      }

      if (logoCircleRef.current) {
        const circle = logoCircleRef.current
        const len = circle.getTotalLength()
        gsap.set(circle, { strokeDasharray: len, strokeDashoffset: len })
        tl.to(circle, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.4)
      }

      // Line fill
      if (lineRef.current) {
        tl.fromTo(lineRef.current, { scaleX: 0 }, {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          transformOrigin: 'left center',
        }, 0)
      }

      // Bottom text fade in
      if (bottomRef.current) {
        tl.fromTo(bottomRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          0.6
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
      {/* Top: Logo + Counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
        <svg
          width="60"
          height="60"
          viewBox="0 0 80 80"
          fill="none"
          style={{ overflow: 'visible' }}
        >
          <path
            ref={logoPathRef}
            d="M10 70V10h20c11 0 20 5 20 16s-9 16-20 16H10"
            stroke="var(--text, #000)"
            strokeWidth="2.5"
            strokeLinecap="square"
            fill="none"
          />
          <circle
            ref={logoCircleRef}
            cx="60"
            cy="60"
            r="8"
            stroke="var(--text, #000)"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>

        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--text-disabled, #9ca3af)',
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
          background: 'var(--text, #000)',
          transformOrigin: 'left center',
          alignSelf: 'center',
          opacity: 0.4,
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
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-muted, #6b7280)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          Portfolio
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--text-disabled, #9ca3af)',
          letterSpacing: '0.05em',
        }}>
          Loading...
        </span>
      </div>
    </div>
  )
}

export default Preloader
