import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function lerp(a, b, n) {
    return (1 - n) * a + n * b
}

function getLocalPointerPos(e, rect) {
    let clientX = 0, clientY = 0
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
    } else {
        clientX = e.clientX
        clientY = e.clientY
    }
    return { x: clientX - rect.left, y: clientY - rect.top }
}

function getMouseDistance(p1, p2) {
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    return Math.hypot(dx, dy)
}

function ImageTrail({ items = [], variant = 1, imageWidth = 200, imageHeight = 160 }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || items.length === 0) return

        const container = containerRef.current
        const images = [...container.querySelectorAll('.trail-img')]
        const imagesTotal = images.length
        let imgPosition = 0
        let zIndexVal = 1
        let activeImagesCount = 0
        let isIdle = true
        const threshold = 100

        let mousePos = { x: 0, y: 0 }
        let lastMousePos = { x: 0, y: 0 }
        let cacheMousePos = { x: 0, y: 0 }

        const handlePointerMove = (ev) => {
            const rect = container.getBoundingClientRect()
            mousePos = getLocalPointerPos(ev, rect)
        }

        const showNextImage = () => {
            ++zIndexVal
            imgPosition = imgPosition < imagesTotal - 1 ? imgPosition + 1 : 0
            const img = images[imgPosition]

            gsap.killTweensOf(img)
            gsap
                .timeline({
                    onStart: () => { activeImagesCount++; isIdle = false },
                    onComplete: () => {
                        activeImagesCount--
                        if (activeImagesCount === 0) isIdle = true
                    },
                })
                .fromTo(
                    img,
                    {
                        opacity: 1,
                        scale: 1,
                        zIndex: zIndexVal,
                        x: cacheMousePos.x - imageWidth / 2,
                        y: cacheMousePos.y - imageHeight / 2,
                    },
                    {
                        duration: 0.4,
                        ease: 'power1',
                        x: mousePos.x - imageWidth / 2,
                        y: mousePos.y - imageHeight / 2,
                    },
                    0
                )
                .to(
                    img,
                    {
                        duration: 0.4,
                        ease: 'power3',
                        opacity: 0,
                        scale: 0.2,
                    },
                    0.4
                )
        }

        let rafId
        const render = () => {
            const distance = getMouseDistance(mousePos, lastMousePos)
            cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.15)
            cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.15)

            if (distance > threshold) {
                showNextImage()
                lastMousePos = { ...mousePos }
            }
            if (isIdle && zIndexVal !== 1) zIndexVal = 1
            rafId = requestAnimationFrame(render)
        }

        const initRender = (ev) => {
            const rect = container.getBoundingClientRect()
            mousePos = getLocalPointerPos(ev, rect)
            cacheMousePos = { ...mousePos }
            rafId = requestAnimationFrame(render)
            container.removeEventListener('mousemove', initRender)
        }

        container.addEventListener('mousemove', handlePointerMove)
        container.addEventListener('mousemove', initRender)

        return () => {
            container.removeEventListener('mousemove', handlePointerMove)
            container.removeEventListener('mousemove', initRender)
            cancelAnimationFrame(rafId)
            images.forEach((img) => gsap.killTweensOf(img))
        }
    }, [items, variant, imageWidth, imageHeight])

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                zIndex: 1,
                overflow: 'visible',
                minHeight: '200px',
            }}
        >
            {items.map((url, i) => (
                <div
                    className="trail-img"
                    key={i}
                    style={{
                        width: `${imageWidth}px`,
                        height: `${imageHeight}px`,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: 0,
                        overflow: 'hidden',
                        willChange: 'transform, filter',
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}
        </div>
    )
}

export default ImageTrail
