import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function Preloader({ onComplete }) {
    const preloaderRef = useRef(null)
    const counterRef = useRef(null)
    const logoRef = useRef(null)
    const linesRef = useRef(null)
    const bottomRef = useRef(null)
    const [done, setDone] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReduced) {
            setCount(100)
            setDone(true)
            onComplete?.()
            return
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            // 1. SVG stroke draw animation for the logo letters
            if (logoRef.current) {
                const paths = logoRef.current.querySelectorAll('path, line, polyline, rect, circle')
                paths.forEach((path) => {
                    const length = path.getTotalLength ? path.getTotalLength() : 200
                    path.style.strokeDasharray = length
                    path.style.strokeDashoffset = length
                })

                tl.to(paths, {
                    strokeDashoffset: 0,
                    duration: 1.2,
                    ease: 'power2.inOut',
                    stagger: 0.1,
                })
            }

            // 2. Counter animation (0 → 100) synced with logo draw
            const counter = { val: 0 }
            tl.to(counter, {
                val: 100,
                duration: 1.2,
                ease: 'power2.inOut',
                onUpdate: () => setCount(Math.floor(counter.val)),
            }, 0) // start at same time as SVG draw

            // 3. Horizontal lines reveal
            if (linesRef.current) {
                const lines = linesRef.current.children
                tl.fromTo(lines, { scaleX: 0 }, {
                    scaleX: 1,
                    duration: 0.5,
                    ease: 'power3.inOut',
                    stagger: 0.08,
                }, 0.8)
            }

            // 4. Bottom text reveal
            if (bottomRef.current) {
                tl.fromTo(bottomRef.current, { yPercent: 100, opacity: 0 }, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                }, 1.2)
            }

            // 5. Hold
            tl.to({}, { duration: 0.3 })

            // 6. Exit — slide up with clip
            tl.to(preloaderRef.current, {
                yPercent: -100,
                duration: 0.7,
                ease: 'power3.inOut',
                onComplete: () => {
                    setDone(true)
                    onComplete?.()
                },
            })
        }, preloaderRef)

        return () => ctx.revert()
    }, [onComplete])

    if (done) return null

    return (
        <div
            ref={preloaderRef}
            className="preloader"
            style={{ flexDirection: 'column', justifyContent: 'space-between', padding: '40px' }}
        >
            {/* Top section: logo + counter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
                {/* SVG Logo */}
                <svg
                    ref={logoRef}
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    style={{ overflow: 'visible' }}
                >
                    {/* P */}
                    <path
                        d="M10 70V10h20c11 0 20 5 20 16s-9 16-20 16H10"
                        stroke="var(--text)"
                        strokeWidth="2.5"
                        strokeLinecap="square"
                        fill="none"
                    />
                    {/* Decorative dot */}
                    <circle cx="60" cy="60" r="8" stroke="var(--text)" strokeWidth="2.5" fill="none" />
                </svg>

                {/* Counter */}
                <div
                    ref={counterRef}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(1rem, 2vw, 14px)',
                        fontWeight: 400,
                        color: 'var(--text-disabled)',
                        fontVariantNumeric: 'tabular-nums',
                        letterSpacing: '0.05em',
                    }}
                >
                    {String(count).padStart(3, '0')}%
                </div>
            </div>

            {/* Center section: animated lines */}
            <div
                ref={linesRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    width: '100%',
                    maxWidth: '200px',
                    alignSelf: 'center',
                }}
            >
                <div style={{ width: '100%', height: '1px', background: 'var(--text)', transformOrigin: 'left' }} />
                <div style={{ width: '60%', height: '1px', background: 'var(--text)', transformOrigin: 'left', opacity: 0.5 }} />
                <div style={{ width: '80%', height: '1px', background: 'var(--text)', transformOrigin: 'left', opacity: 0.3 }} />
            </div>

            {/* Bottom section: text */}
            <div
                ref={bottomRef}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'flex-end',
                    overflow: 'hidden',
                }}
            >
                <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                }}>
                    Portfolio
                </span>
                <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--text-disabled)',
                    letterSpacing: '0.05em',
                }}>
                    Loading...
                </span>
            </div>
        </div>
    )
}

export default Preloader
