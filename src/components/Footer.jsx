import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePortfolio } from '../context/PortfolioContext.jsx'

const ASCII = '........:::=+xX#0369'
const SOURCE_IMAGE = '/images/reaching-hands.png'

function buildCells(image, columns, side) {
  const sourceWidth = image.naturalWidth / 2
  const rows = Math.max(1, Math.round(columns / (sourceWidth / image.naturalHeight)))
  const sampler = document.createElement('canvas')
  sampler.width = columns
  sampler.height = rows
  const context = sampler.getContext('2d', { willReadFrequently: true })
  const cells = []
  if (!context) return { rows, cells }

  context.drawImage(
    image,
    side === 'left' ? 0 : sourceWidth,
    0,
    sourceWidth,
    image.naturalHeight,
    0,
    0,
    columns,
    rows,
  )

  const pixels = context.getImageData(0, 0, columns, rows).data
  const backgroundLimit = ASCII.lastIndexOf('.')

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const offset = (row * columns + column) * 4
      const brightness = (pixels[offset] * .299 + pixels[offset + 1] * .587 + pixels[offset + 2] * .114) / 255
      const index = Math.min(ASCII.length - 1, Math.floor((1 - brightness) * ASCII.length))
      if (index > backgroundLimit) cells.push({ column, row, char: ASCII[index], litUntil: 0 })
    }
  }

  return { rows, cells }
}

function FooterCanvas({ side }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const image = new Image()
    let frameId = 0
    let cells = []
    let rows = 0
    const columns = 54
    const cellSize = 16
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const render = () => {
      const context = canvas.getContext('2d')
      if (!context) return
      const now = performance.now()
      context.clearRect(0, 0, columns * cellSize, rows * cellSize)
      context.font = `14px ${getComputedStyle(document.documentElement).getPropertyValue('--font-mono')}`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      for (const cell of cells) {
        const active = cell.litUntil > now
        if (active) {
          context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--footer-hover')
          context.fillRect(cell.column * cellSize, cell.row * cellSize, cellSize, cellSize)
        }
        context.fillStyle = active
          ? getComputedStyle(document.documentElement).getPropertyValue('--footer-hover-text')
          : getComputedStyle(document.documentElement).getPropertyValue('--footer-ascii')
        context.fillText(cell.char, cell.column * cellSize + cellSize / 2, cell.row * cellSize + cellSize / 2)
      }

      if (!reduceMotion) frameId = requestAnimationFrame(render)
    }

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect()
      const column = ((event.clientX - bounds.left) / bounds.width) * columns
      const row = ((event.clientY - bounds.top) / bounds.height) * rows
      let nearest = null
      let distance = Infinity

      for (const cell of cells) {
        const nextDistance = Math.hypot(column - cell.column, row - cell.row)
        if (nextDistance < distance) {
          nearest = cell
          distance = nextDistance
        }
      }

      if (nearest && distance < 7) {
        const now = performance.now()
        for (const cell of cells) {
          if (Math.hypot(nearest.column - cell.column, nearest.row - cell.row) < 2.6) cell.litUntil = now + 320
        }
      }
    }

    image.onload = () => {
      const built = buildCells(image, columns, side)
      cells = built.cells
      rows = built.rows
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = columns * cellSize * dpr
      canvas.height = rows * cellSize * dpr
      canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
      render()
      if (!reduceMotion) canvas.addEventListener('pointermove', handlePointerMove)
    }
    image.src = SOURCE_IMAGE

    return () => {
      cancelAnimationFrame(frameId)
      canvas.removeEventListener('pointermove', handlePointerMove)
      image.onload = null
    }
  }, [side])

  return <canvas ref={canvasRef} className="animated-footer__canvas" aria-hidden="true" />
}

function Footer() {
  const { data } = usePortfolio()
  const rootRef = useRef(null)
  const rawName = data.hero?.name
  const name = rawName && !rawName.startsWith('[') ? rawName : 'SOLKINGS'
  const email = data.contact?.email || 'hello@yourdomain.com'
  const socials = data.contact?.socials || []

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const context = gsap.context(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        gsap.to('[data-footer-char]', {
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: { each: .035, from: 'center' },
        })
        observer.disconnect()
      }, { threshold: .35 })

      gsap.set('[data-footer-char]', { yPercent: 120 })
      observer.observe(root)
      return () => observer.disconnect()
    }, root)

    return () => context.revert()
  }, [])

  return (
    <footer ref={rootRef} className="animated-footer">
      <div className="animated-footer__meta">
        <a href={`mailto:${email}`}>{email}</a>
        <div>
          {socials.map((social) => (
            <a key={social.id || social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}</a>
          ))}
        </div>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
      </div>

      <div className="animated-footer__art animated-footer__art--left"><FooterCanvas side="left" /></div>
      <div className="animated-footer__art animated-footer__art--right"><FooterCanvas side="right" /></div>

      <h2 aria-label={name}>
        {Array.from(name).map((character, index) => (
          <span className="animated-footer__mask" key={`${character}-${index}`}>
            <span data-footer-char aria-hidden="true">{character === ' ' ? '\u00a0' : character}</span>
          </span>
        ))}
      </h2>
    </footer>
  )
}

export default Footer
