import { useState, useEffect, useRef, useCallback } from 'react'

const CHARS = '!@#$%^&*()_+{}|:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  className = '',
  style = {},
  revealOnHover = true,
  animateOnMount = true,
  parentClassName = '',
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isRevealed, setIsRevealed] = useState(false)
  const intervalRef = useRef(null)
  const iterationRef = useRef(0)
  const hasAnimated = useRef(false)

  const startDecryption = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    iterationRef.current = 0

    intervalRef.current = setInterval(() => {
      const progress = iterationRef.current / maxIterations
      const revealed = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < Math.floor(progress * text.length)) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayText(revealed)
      iterationRef.current++

      if (iterationRef.current >= maxIterations) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setDisplayText(text)
        setIsRevealed(true)
      }
    }, speed)
  }, [text, speed, maxIterations])

  // Animate on mount
  useEffect(() => {
    if (animateOnMount && !hasAnimated.current) {
      hasAnimated.current = true
      startDecryption()
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [animateOnMount, startDecryption])

  // Animate on hover
  const handleMouseEnter = () => {
    if (!revealOnHover || isRevealed) return
    startDecryption()
  }

  return (
    <span
      className={parentClassName}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: revealOnHover ? 'pointer' : 'default', ...style }}
    >
      <span className={className}>{displayText}</span>
    </span>
  )
}

export default DecryptedText
