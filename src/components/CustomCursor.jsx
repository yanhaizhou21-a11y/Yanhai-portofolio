import { useEffect, useState } from 'react'

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
      const target = event.target
      setIsPointer(
        target instanceof Element &&
          !!target.closest('a, button, input, textarea, select, [role="button"]'),
      )
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-[80] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isPointer ? '2.8rem' : '1.5rem',
        height: isPointer ? '2.8rem' : '1.5rem',
        transition: 'width 180ms ease,height 180ms ease',
      }}
    />
  )
}

export default CustomCursor
