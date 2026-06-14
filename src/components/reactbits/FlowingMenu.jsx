import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

function FlowingMenu({
    items = [],
    speed = 15,
    textColor = 'var(--text)',
    bgColor = 'var(--bg)',
    marqueeBgColor = 'var(--text)',
    marqueeTextColor = 'var(--bg)',
    borderColor = 'var(--border)',
    onItemClick,
}) {
    return (
        <div className="flowing-menu" style={{ width: '100%', height: '100%', overflow: 'hidden', backgroundColor: bgColor }}>
            <nav style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: 0, padding: 0 }}>
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        speed={speed}
                        textColor={textColor}
                        marqueeBgColor={marqueeBgColor}
                        marqueeTextColor={marqueeTextColor}
                        borderColor={borderColor}
                        isFirst={idx === 0}
                        onItemClick={onItemClick}
                    />
                ))}
            </nav>
        </div>
    )
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst, onItemClick }) {
    const itemRef = useRef(null)
    const marqueeRef = useRef(null)
    const marqueeInnerRef = useRef(null)
    const animationRef = useRef(null)
    const [repetitions, setRepetitions] = useState(4)

    const animationDefaults = { duration: 0.6, ease: 'expo' }

    const findClosestEdge = (mouseX, mouseY, width, height) => {
        const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2
        const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
    }

    useEffect(() => {
        const calculateRepetitions = () => {
            if (!marqueeInnerRef.current) return
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part')
            if (!marqueeContent) return
            const contentWidth = marqueeContent.offsetWidth
            const viewportWidth = window.innerWidth
            const needed = Math.ceil(viewportWidth / contentWidth) + 2
            setRepetitions(Math.max(4, needed))
        }

        calculateRepetitions()
        window.addEventListener('resize', calculateRepetitions)
        return () => window.removeEventListener('resize', calculateRepetitions)
    }, [text, image])

    useEffect(() => {
        const setupMarquee = () => {
            if (!marqueeInnerRef.current) return
            const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part')
            if (!marqueeContent) return
            const contentWidth = marqueeContent.offsetWidth
            if (contentWidth === 0) return

            if (animationRef.current) {
                animationRef.current.kill()
            }

            animationRef.current = gsap.to(marqueeInnerRef.current, {
                x: -contentWidth,
                duration: speed,
                ease: 'none',
                repeat: -1,
            })
        }

        const timer = setTimeout(setupMarquee, 50)
        return () => {
            clearTimeout(timer)
            if (animationRef.current) {
                animationRef.current.kill()
            }
        }
    }, [text, image, repetitions, speed])

    const handleMouseEnter = (ev) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
        const rect = itemRef.current.getBoundingClientRect()
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)

        gsap
            .timeline({ defaults: animationDefaults })
            .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
            .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
    }

    const handleMouseLeave = (ev) => {
        if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
        const rect = itemRef.current.getBoundingClientRect()
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)

        gsap
            .timeline({ defaults: animationDefaults })
            .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
            .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
    }

    return (
        <div
            style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
                borderTop: isFirst ? 'none' : `1px solid ${borderColor}`,
            }}
            ref={itemRef}
        >
            <a
                href={link || '#'}
                onClick={(e) => {
                    e.preventDefault()
                    onItemClick?.({ text, image, link })
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.2rem, 3vh, 2.5rem)',
                    color: textColor,
                    letterSpacing: '0.02em',
                }}
            >
                {text}
            </a>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    transform: 'translateY(101%)',
                    backgroundColor: marqueeBgColor,
                }}
                ref={marqueeRef}
            >
                <div style={{ height: '100%', width: 'fit-content', display: 'flex' }} ref={marqueeInnerRef}>
                    {[...Array(repetitions)].map((_, idx) => (
                        <div
                            className="marquee-part"
                            key={idx}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexShrink: 0,
                                color: marqueeTextColor,
                            }}
                        >
                            <span
                                style={{
                                    whiteSpace: 'nowrap',
                                    textTransform: 'uppercase',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 400,
                                    fontSize: 'clamp(1.2rem, 3vh, 2.5rem)',
                                    lineHeight: 1,
                                    padding: '0 1vw',
                                }}
                            >
                                {text}
                            </span>
                            {image && (
                                <div
                                    style={{
                                        width: '180px',
                                        height: '7vh',
                                        margin: '2em 2vw',
                                        padding: '1em 0',
                                        borderRadius: '0',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(${image})`,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FlowingMenu
