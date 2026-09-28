import { useRef, useState, useCallback, useEffect } from 'react'
import gsap from 'gsap'

/**
 * FlipbookImage — carlosprado.dev style image sequence on hover/drag.
 * Since we have limited images, we create multiple "frames" using
 * CSS filter variations of the source image, cycling through on hover.
 */

const FILTER_PRESETS = [
    'none',                                          // 1: original
    'brightness(1.15) contrast(1.2)',                // 2: bright contrast
    'grayscale(0.4) contrast(1.1)',                  // 3: partial desaturation
    'sepia(0.25) saturate(1.2)',                     // 4: warm tone
    'hue-rotate(15deg) saturate(1.3)',               // 5: slight hue shift
    'brightness(0.9) contrast(1.4) saturate(1.1)',   // 6: dark moody
    'hue-rotate(-10deg) brightness(1.1)',             // 7: cool shift
    'contrast(1.5) brightness(1.05)',                 // 8: high contrast
    'saturate(2) brightness(1.05)',                   // 9: vivid
    'grayscale(0.7) brightness(1.1)',                 // 10: near-bw
]

const FRAME_COUNT = FILTER_PRESETS.length

function FlipbookImage({
    src,
    alt = '',
    fallbackGradient = 'linear-gradient(135deg, #e5e5e5, #d4d4d4)',
    className = '',
    style = {},
}) {
    const containerRef = useRef(null)
    const [activeFrame, setActiveFrame] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const intervalRef = useRef(null)
    const dragRef = useRef({ isDragging: false, startX: 0 })

    // Cycle through frames on hover
    useEffect(() => {
        if (isHovering) {
            intervalRef.current = setInterval(() => {
                setActiveFrame((prev) => (prev + 1) % FRAME_COUNT)
            }, 100)
        } else {
            clearInterval(intervalRef.current)
            // Animate back to frame 0
            const tween = { val: activeFrame }
            gsap.to(tween, {
                val: 0,
                duration: 0.5,
                ease: 'power2.out',
                onUpdate: () => setActiveFrame(Math.round(tween.val)),
            })
        }
        return () => clearInterval(intervalRef.current)
    }, [isHovering])

    // Drag to scrub through frames (ew-resize cursor)
    const handleMouseDown = useCallback((e) => {
        dragRef.current = { isDragging: true, startX: e.clientX }
    }, [])

    const handleMouseMove = useCallback((e) => {
        if (!dragRef.current.isDragging) return
        const delta = e.clientX - dragRef.current.startX
        const steps = Math.floor(delta / 15)
        const totalWidth = containerRef.current?.offsetWidth || 400
        const frameIndex = Math.abs(steps) % FRAME_COUNT
        setActiveFrame(steps >= 0 ? frameIndex : (FRAME_COUNT - frameIndex) % FRAME_COUNT)
    }, [])

    const handleMouseUp = useCallback(() => {
        dragRef.current.isDragging = false
    }, [])

    return (
        <div
            ref={containerRef}
            className={`flipbook-container ${className}`}
            style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'ew-resize',
                ...style,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                handleMouseUp()
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {src ? (
                <>
                    {/* Render all frames, only show active */}
                    {FILTER_PRESETS.map((filter, index) => (
                        <div
                            key={index}
                            className="flipbook-frame"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                clipPath: index === activeFrame ? 'inset(0%)' : 'inset(0% 0% 100% 0)',
                                zIndex: index === activeFrame ? 1 : 0,
                                transition: 'clip-path 0.08s ease',
                            }}
                        >
                            <img
                                src={src}
                                alt={alt}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    filter: filter,
                                }}
                                draggable={false}
                            />
                        </div>
                    ))}
                    {/* Frame counter indicator */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            color: '#fff',
                            background: 'rgba(0,0,0,0.5)',
                            padding: '2px 8px',
                            zIndex: 2,
                            fontVariantNumeric: 'tabular-nums',
                            letterSpacing: '0.05em',
                            opacity: isHovering ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        {String(activeFrame + 1).padStart(2, '0')}/{FRAME_COUNT}
                    </div>
                </>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: fallbackGradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-disabled)',
                        fontSize: '14px',
                    }}
                >
                    Photo
                </div>
            )}
        </div>
    )
}

export default FlipbookImage
