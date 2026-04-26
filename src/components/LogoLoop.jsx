import { useState } from 'react'

function LogoLoop({
  logos,
  speed = 60,
  renderItem,
  fadeOutColor = '#0a0a0a',
  gap = 36,
  logoHeight = 40,
  hoverSpeed = 0,
}) {
  const doubled = [...logos, ...logos]
  const duration = Math.max(12, speed)
  const [paused, setPaused] = useState(false)
  const playState = paused && hoverSpeed === 0 ? 'paused' : 'running'

  return (
    <div className="relative overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        className="flex w-max items-center py-4"
        style={{ gap: `${gap}px`, animation: `logo-loop ${duration}s linear infinite`, animationPlayState: playState }}
      >
        {doubled.map((item, index) => (
          <div key={`${item.title}-${index}`} style={{ height: logoHeight }}>
            {renderItem ? renderItem(item) : item.node}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{ background: `linear-gradient(to right, ${fadeOutColor}, transparent)` }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{ background: `linear-gradient(to left, ${fadeOutColor}, transparent)` }} />
      <style>{`@keyframes logo-loop {from {transform: translateX(0)} to {transform: translateX(-50%)} }`}</style>
    </div>
  )
}

export default LogoLoop
