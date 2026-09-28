import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Mask reveal: wraps text in overflow-hidden containers
 * and animates translateY from 110% to 0%
 */
export function useMaskReveal(scopeRef) {
    useEffect(() => {
        if (!scopeRef.current || prefersReducedMotion()) return

        const elements = scopeRef.current.querySelectorAll('[data-mask]')
        if (!elements.length) return

        const ctx = gsap.context(() => {
            elements.forEach((el) => {
                const text = el.textContent
                const words = text.split(' ')

                el.innerHTML = words
                    .map(
                        (word) =>
                            `<span class="mask"><span>${word}</span></span>`,
                    )
                    .join(' ')

                const masks = el.querySelectorAll('.mask > span')

                gsap.fromTo(
                    masks,
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        stagger: 0.04,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            once: true,
                        },
                    },
                )
            })
        }, scopeRef)

        return () => ctx.revert()
    }, [scopeRef])
}

/**
 * Parallax effect on an image element
 */
export function useParallax(ref, speed = 0.15) {
    useEffect(() => {
        if (!ref.current || prefersReducedMotion()) return

        const ctx = gsap.context(() => {
            gsap.to(ref.current, {
                yPercent: -speed * 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: ref.current.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }, ref)

        return () => ctx.revert()
    }, [ref, speed])
}

/**
 * Fade-up reveal on scroll
 */
export function useScrollReveal(ref, delay = 0) {
    useEffect(() => {
        if (!ref.current || prefersReducedMotion()) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ref.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 85%',
                        once: true,
                    },
                },
            )
        }, ref)

        return () => ctx.revert()
    }, [ref, delay])
}

/**
 * Staggered reveal for list items
 */
export function useStaggerReveal(scopeRef, childSelector, stagger = 0.08) {
    useEffect(() => {
        if (!scopeRef.current || prefersReducedMotion()) return

        const ctx = gsap.context(() => {
            const children = scopeRef.current.querySelectorAll(childSelector)

            gsap.fromTo(
                children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger,
                    scrollTrigger: {
                        trigger: scopeRef.current,
                        start: 'top 80%',
                        once: true,
                    },
                },
            )
        }, scopeRef)

        return () => ctx.revert()
    }, [scopeRef, childSelector, stagger])
}

/**
 * Section title reveal with line animation
 */
export function useLineReveal(ref) {
    useEffect(() => {
        if (!ref.current || prefersReducedMotion()) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ref.current,
                { scaleX: 0, transformOrigin: 'left center' },
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 90%',
                        once: true,
                    },
                },
            )
        }, ref)

        return () => ctx.revert()
    }, [ref])
}

/**
 * Image scale reveal on scroll
 */
export function useImageReveal(ref) {
    useEffect(() => {
        if (!ref.current || prefersReducedMotion()) return

        const ctx = gsap.context(() => {
            gsap.fromTo(
                ref.current,
                { scale: 1.2, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 80%',
                        once: true,
                    },
                },
            )
        }, ref)

        return () => ctx.revert()
    }, [ref])
}

/**
 * Returns a GSAP timeline for page transitions
 */
export function usePageTransition() {
    const overlayRef = useRef(null)

    const animateIn = useCallback(() => {
        if (!overlayRef.current || prefersReducedMotion()) return Promise.resolve()
        return gsap
            .timeline()
            .fromTo(
                overlayRef.current,
                { yPercent: 100 },
                { yPercent: 0, duration: 0.5, ease: 'power3.inOut' },
            )
            .to(overlayRef.current, {
                yPercent: -100,
                duration: 0.5,
                ease: 'power3.inOut',
                delay: 0.1,
            })
            .then()
    }, [])

    const animateOut = useCallback(() => {
        if (!overlayRef.current || prefersReducedMotion()) return Promise.resolve()
        return gsap
            .timeline()
            .fromTo(
                overlayRef.current,
                { yPercent: -100 },
                { yPercent: 0, duration: 0.4, ease: 'power3.inOut' },
            )
            .then()
    }, [])

    return { overlayRef, animateIn, animateOut }
}
