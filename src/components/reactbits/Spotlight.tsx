import { useRef, useEffect, useState } from 'react'

function Spotlight({
    children,
    className = '',
    gradientSize = 400,
    gradientColor = 'rgba(0, 0, 0, 0.06)',
    style = {},
}) {
    const containerRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const handleMove = (e) => {
            const rect = el.getBoundingClientRect()
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }

        const handleEnter = () => setIsHovering(true)
        const handleLeave = () => setIsHovering(false)

        el.addEventListener('mousemove', handleMove)
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)

        return () => {
            el.removeEventListener('mousemove', handleMove)
            el.removeEventListener('mouseenter', handleEnter)
            el.removeEventListener('mouseleave', handleLeave)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                ...style,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientColor}, transparent 60%)`,
                    opacity: isHovering ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1,
                }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
        </div>
    )
}

export default Spotlight
