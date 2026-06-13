import { useRef, useEffect } from 'react'
import gsap from 'gsap'

function SplitText({
    text,
    className = '',
    style = {},
    delay = 0,
    duration = 0.6,
    stagger = 0.04,
    ease = 'power3.out',
    animateOnScroll = true,
    rootElement = 'p',
}) {
    const ref = useRef(null)

    useEffect(() => {
        if (!ref.current) return

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const chars = ref.current.querySelectorAll('.split-char')
        const words = ref.current.querySelectorAll('.split-word')

        if (prefersReduced) {
            chars.forEach((c) => {
                c.style.opacity = '1'
                c.style.transform = 'translateY(0)'
            })
            return
        }

        // Set initial state
        chars.forEach((c) => {
            c.style.opacity = '0'
            c.style.transform = 'translateY(110%)'
        })

        const runAnimation = () => {
            gsap.to(chars, {
                y: '0%',
                opacity: 1,
                duration,
                stagger,
                ease,
                delay,
            })
        }

        if (animateOnScroll) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            runAnimation()
                            observer.disconnect()
                        }
                    })
                },
                { threshold: 0.2 }
            )
            observer.observe(ref.current)
            return () => observer.disconnect()
        } else {
            runAnimation()
        }
    }, [text, delay, duration, stagger, ease, animateOnScroll])

    const words = text.split(' ')
    const Tag = rootElement

    return (
        <Tag ref={ref} className={className} style={style}>
            {words.map((word, wi) => (
                <span
                    key={wi}
                    className="split-word"
                    style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}
                >
                    {word.split('').map((char, ci) => (
                        <span
                            key={ci}
                            className="split-char"
                            style={{
                                display: 'inline-block',
                                willChange: 'transform, opacity',
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </Tag>
    )
}

export default SplitText
