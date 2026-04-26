import React, { useEffect, useRef, useCallback, useMemo } from 'react'

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)'
const KEYFRAMES_ID = 'pc-keyframes'

if (typeof document !== 'undefined' && !document.getElementById(KEYFRAMES_ID)) {
  const style = document.createElement('style')
  style.id = KEYFRAMES_ID
  style.textContent = `
    @keyframes pc-holo-bg {
      0% { background-position: 0 var(--background-y), 0 0, center; }
      100% { background-position: 0 var(--background-y), 90% 90%, center; }
    }
  `
  document.head.appendChild(style)
}

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max)
const round = (v, p = 3) => parseFloat(v.toFixed(p))
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin))

const ProfileCardComponent = ({
  avatarUrl = 'https://placehold.co/640x900',
  iconUrl = '',
  grainUrl = '',
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(125, 190, 255, 0.67)',
  behindGlowSize = '50%',
  className = '',
  enableTilt = true,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = 'Carlos Prado',
  title = 'Creative Developer',
  handle = 'carlosprado',
  status = 'Available',
  contactText = 'Contact',
  showUserInfo = true,
  onContactClick,
}) => {
  const wrapRef = useRef(null)
  const shellRef = useRef(null)

  const setVarsFromXY = useCallback((x, y) => {
    const shell = shellRef.current
    const wrap = wrapRef.current
    if (!shell || !wrap) return
    const width = shell.clientWidth || 1
    const height = shell.clientHeight || 1
    const percentX = clamp((100 / width) * x)
    const percentY = clamp((100 / height) * y)
    const centerX = percentX - 50
    const centerY = percentY - 50
    const properties = {
      '--pointer-x': `${percentX}%`,
      '--pointer-y': `${percentY}%`,
      '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
      '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
      '--rotate-x': `${round(-(centerX / 5))}deg`,
      '--rotate-y': `${round(centerY / 4)}deg`,
      '--card-opacity': '1',
    }
    Object.entries(properties).forEach(([k, v]) => wrap.style.setProperty(k, v))
  }, [])

  useEffect(() => {
    if (!enableTilt) return undefined
    const shell = shellRef.current
    if (!shell) return undefined
    const onMove = (event) => {
      const rect = shell.getBoundingClientRect()
      setVarsFromXY(event.clientX - rect.left, event.clientY - rect.top)
    }
    const onLeave = () => setVarsFromXY(shell.clientWidth / 2, shell.clientHeight / 2)
    shell.addEventListener('pointermove', onMove)
    shell.addEventListener('pointerleave', onLeave)
    onLeave()
    return () => {
      shell.removeEventListener('pointermove', onMove)
      shell.removeEventListener('pointerleave', onLeave)
    }
  }, [enableTilt, setVarsFromXY, mobileTiltSensitivity])

  const cardStyle = useMemo(
    () => ({
      '--icon': iconUrl ? `url(${iconUrl})` : 'none',
      '--grain': grainUrl ? `url(${grainUrl})` : 'none',
      '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      '--behind-glow-color': behindGlowColor,
      '--behind-glow-size': behindGlowSize,
      '--pointer-x': '50%',
      '--pointer-y': '50%',
      '--rotate-x': '0deg',
      '--rotate-y': '0deg',
      '--background-x': '50%',
      '--background-y': '50%',
      '--card-opacity': '0',
      '--card-radius': '30px',
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize],
  )

  return (
    <div ref={wrapRef} className={`relative touch-none ${className}`.trim()} style={{ perspective: '500px', ...cardStyle }}>
      {behindGlowEnabled && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
          style={{
            background: 'radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))',
            filter: 'blur(50px) saturate(1.1)',
            opacity: 'calc(0.8 * var(--card-opacity))',
          }}
        />
      )}
      <div ref={shellRef} className="group relative z-[1]">
        <section
          className="relative grid overflow-hidden"
          style={{
            height: '80svh',
            maxHeight: '540px',
            aspectRatio: '0.718',
            borderRadius: '30px',
            background: 'var(--card-bg)',
            transform: 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))',
            transition: 'transform 180ms ease-out',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'var(--inner-gradient)',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '30px',
            }}
          >
            <img
              className="absolute bottom-[-1px] left-1/2 w-full -translate-x-1/2"
              src={avatarUrl}
              alt={`${name} avatar`}
              loading="lazy"
              style={{ borderRadius: '30px' }}
            />
            {showUserInfo && (
              <div className="absolute bottom-5 left-5 right-5 z-[2] flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-[30px]">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10">
                    <img className="h-full w-full object-cover" src={miniAvatarUrl || avatarUrl} alt={`${name} mini avatar`} loading="lazy" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm font-medium text-white/90">@{handle}</div>
                    <div className="text-sm text-white/70">{status}</div>
                  </div>
                </div>
                <button className="rounded-lg border border-white/10 px-4 py-3 text-xs font-semibold text-white/90" onClick={() => onContactClick?.()} type="button">
                  {contactText}
                </button>
              </div>
            )}
            <div className="pointer-events-none absolute top-12 z-[5] w-full text-center">
              <h3 className="m-0 font-semibold text-white" style={{ fontSize: 'min(5svh, 3em)' }}>{name}</h3>
              <p className="mx-auto -translate-y-2 whitespace-nowrap font-semibold text-white/80">{title}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

const ProfileCard = React.memo(ProfileCardComponent)
export default ProfileCard
