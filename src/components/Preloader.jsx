import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function Preloader({ onComplete }) {
    const preloaderRef = useRef(null)
    const textRef = useRef(null)
    const lineRef = useRef(null)
    const [done, setDone] = useState(false)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReduced) {
            setDone(true)
            onComplete?.()
            return
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(preloaderRef.current, {
                        yPercent: -100,
                        duration: 0.6,
                        ease: 'power3.inOut',
                        onComplete: () => {
                            setDone(true)
                            onComplete?.()
                        },
                    })
                },
            })

            // Animate the line drawing
            tl.fromTo(
                lineRef.current,
                { scaleX: 0, transformOrigin: 'left center' },
                { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
            )

            // Reveal text
            tl.fromTo(
                textRef.current.querySelectorAll('.preloader-char'),
                { yPercent: 110, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power3.out',
                },
                '-=0.2',
            )

            // Hold briefly
            tl.to({}, { duration: 0.4 })
        }, preloaderRef)

        return () => ctx.revert()
    }, [onComplete])

    if (done) return null

    const name = 'PORTFOLIO'

    return (
        <div
            ref={preloaderRef}
            className="preloader"
            style={{ flexDirection: 'column', gap: '24px' }}
        >
            <div
                ref={textRef}
                style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    overflow: 'hidden',
                    display: 'flex',
                    gap: '2px',
                }}
            >
                {name.split('').map((char, i) => (
                    <span
                        key={i}
                        className="preloader-char"
                        style={{
                            display: 'inline-block',
                            willChange: 'transform',
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
            <div
                ref={lineRef}
                style={{
                    width: '80px',
                    height: '1px',
                    background: '#000',
                    transformOrigin: 'left center',
                }}
            />
        </div>
    )
}

export default Preloader
