import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

function PageTransition({ children }) {
    const location = useLocation()
    const containerRef = useRef(null)
    const overlayRef = useRef(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReduced || !overlayRef.current) return

        // Scroll to top on route change
        window.scrollTo(0, 0)

        const tl = gsap.timeline()

        // Overlay slides in from bottom
        tl.fromTo(
            overlayRef.current,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.4, ease: 'power3.inOut' },
        )

        // Overlay slides out to top
        tl.to(overlayRef.current, {
            yPercent: -100,
            duration: 0.4,
            ease: 'power3.inOut',
            delay: 0.05,
        })
    }, [location.pathname])

    return (
        <>
            <div
                ref={overlayRef}
                className="page-transition"
                style={{
                    transform: 'translateY(-100%)',
                }}
            />
            <div ref={containerRef}>{children}</div>
        </>
    )
}

export default PageTransition
