import { useRef, useState, useEffect, useCallback } from 'react'

function Magnet({
    children,
    strength = 0.3,
    padding = 100,
    className = '',
    style = {},
}) {
    const ref = useRef(null)
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback(
        (e) => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const dx = e.clientX - centerX
            const dy = e.clientY - centerY

            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < rect.width / 2 + padding) {
                setOffset({
                    x: dx * strength,
                    y: dy * strength,
                })
            } else {
                setOffset({ x: 0, y: 0 })
            }
        },
        [strength, padding]
    )

    const handleMouseLeave = useCallback(() => {
        setOffset({ x: 0, y: 0 })
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const parent = el.parentElement || document.body
        parent.addEventListener('mousemove', handleMouseMove)
        el.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            parent.removeEventListener('mousemove', handleMouseMove)
            el.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [handleMouseMove, handleMouseLeave])

    return (
        <div
            ref={ref}
            className={className}
            style={{
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                ...style,
            }}
        >
            {children}
        </div>
    )
}

export default Magnet
