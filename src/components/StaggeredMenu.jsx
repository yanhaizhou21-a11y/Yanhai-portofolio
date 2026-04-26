import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#B497CF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  isFixed = false,
  accentColor = '#5227FF',
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const panelRef = useRef(null)
  const preLayersRef = useRef(null)
  const preLayerElsRef = useRef([])
  const plusHRef = useRef(null)
  const plusVRef = useRef(null)
  const iconRef = useRef(null)
  const textInnerRef = useRef(null)
  const [textLines, setTextLines] = useState(['Menu', 'Close'])
  const openTlRef = useRef(null)
  const closeTweenRef = useRef(null)
  const colorTweenRef = useRef(null)
  const toggleBtnRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const preContainer = preLayersRef.current
      const offscreen = position === 'left' ? -100 : 100
      const preLayers = preContainer ? Array.from(preContainer.querySelectorAll('.sm-prelayer')) : []
      preLayerElsRef.current = preLayers
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 })
      gsap.set([plusHRef.current], { rotate: 0 })
      gsap.set([plusVRef.current], { rotate: 90 })
      gsap.set([iconRef.current], { rotate: 0 })
      gsap.set([textInnerRef.current], { yPercent: 0 })
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor })
    })
    return () => ctx.revert()
  }, [menuButtonColor, position])

  const playOpen = useCallback(() => {
    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return
    const offscreen = position === 'left' ? -100 : 100
    openTlRef.current?.kill()
    closeTweenRef.current?.kill()
    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'))
    gsap.set(itemEls, { yPercent: 140, rotate: 10 })
    const tl = gsap.timeline()
    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07)
    })
    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, 0.14)
    tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' }, 0.3)
    openTlRef.current = tl
  }, [position])

  const playClose = useCallback(() => {
    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return
    const offscreen = position === 'left' ? -100 : 100
    openTlRef.current?.kill()
    closeTweenRef.current?.kill()
    closeTweenRef.current = gsap.to([...layers, panel], { xPercent: offscreen, duration: 0.32, ease: 'power3.in' })
  }, [position])

  const animateMeta = useCallback(
    (opening) => {
      gsap.to(plusHRef.current, { rotate: opening ? 45 : 0, duration: 0.35, ease: 'power3.out' })
      gsap.to(plusVRef.current, { rotate: opening ? -45 : 90, duration: 0.35, ease: 'power3.out' })
      if (changeMenuColorOnOpen && toggleBtnRef.current) {
        colorTweenRef.current?.kill()
        colorTweenRef.current = gsap.to(toggleBtnRef.current, {
          color: opening ? openMenuButtonColor : menuButtonColor,
          duration: 0.25,
          ease: 'power2.out',
        })
      }
      const seq = opening ? ['Menu', 'Close', 'Close'] : ['Close', 'Menu', 'Menu']
      setTextLines(seq)
      gsap.set(textInnerRef.current, { yPercent: 0 })
      gsap.to(textInnerRef.current, { yPercent: -66.66, duration: 0.45, ease: 'power4.out' })
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor],
  )

  const closeMenu = useCallback(() => {
    if (!openRef.current) return
    openRef.current = false
    setOpen(false)
    onMenuClose?.()
    playClose()
    animateMeta(false)
  }, [animateMeta, onMenuClose, playClose])

  const toggleMenu = () => {
    const target = !openRef.current
    openRef.current = target
    setOpen(target)
    if (target) {
      onMenuOpen?.()
      playOpen()
    } else {
      onMenuClose?.()
      playClose()
    }
    animateMeta(target)
  }

  const handleMenuItemClick = (event, item) => {
    if (item?.onClick) {
      event.preventDefault()
      item.onClick()
    }
    closeMenu()
  }

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return
    const onDocClick = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [closeOnClickAway, open, closeMenu])

  return (
    <div className={`sm-scope ${open ? 'pointer-events-auto' : 'pointer-events-none'} z-40 ${isFixed ? 'fixed top-0 left-0 h-screen w-screen overflow-hidden' : 'h-full w-full'}`}>
      <div
        className={`${className ? `${className} ` : ''}staggered-menu-wrapper ${open ? 'pointer-events-auto' : 'pointer-events-none'} relative h-full w-full`}
        style={accentColor ? { '--sm-accent': accentColor } : undefined}
        data-position={position}
      >
        <div ref={preLayersRef} className="sm-prelayers absolute top-0 bottom-0 right-0 pointer-events-none z-[5]" aria-hidden="true">
          {(colors?.length ? colors : ['#1e1e22', '#35353c']).slice(0, 3).map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: c }} />
          ))}
        </div>

        <header className="staggered-menu-header absolute top-0 left-0 z-20 flex w-full items-center justify-between bg-transparent p-[1.3rem] pointer-events-none">
          <div className="sm-logo pointer-events-auto select-none">
            <img src={logoUrl} alt="Logo" className="sm-logo-img block h-8 w-auto object-contain" draggable={false} />
          </div>
          <button
            ref={toggleBtnRef}
            className="sm-toggle pointer-events-auto relative inline-flex items-center gap-2 border-0 bg-transparent font-medium leading-none"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={toggleMenu}
            type="button"
          >
            <span className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap">
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                {textLines.map((line, i) => (
                  <span key={i} className="sm-toggle-line block h-[1em] leading-none">{line}</span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon relative inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center">
              <span ref={plusHRef} className="sm-icon-line absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-current" />
              <span ref={plusVRef} className="sm-icon-line absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-current" />
            </span>
          </button>
        </header>

        <aside ref={panelRef} className="staggered-menu-panel absolute top-0 right-0 z-10 flex h-full flex-col overflow-y-auto bg-white p-[6em_2em_2em_2em]">
          <ul className="sm-panel-list m-0 flex list-none flex-col gap-2 p-0" data-numbering={displayItemNumbering || undefined}>
            {items.map((it, idx) => (
              <li key={`${it.label}-${idx}`} className="sm-panel-itemWrap relative overflow-hidden leading-none">
                <a
                  className="sm-panel-item relative inline-block pr-[1.4em] text-[4rem] font-semibold uppercase leading-none tracking-[-2px] no-underline"
                  href={it.link}
                  aria-label={it.ariaLabel || it.label}
                  onClick={(event) => handleMenuItemClick(event, it)}
                >
                  <span className="sm-panel-itemLabel inline-block">{it.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials mt-auto flex flex-col gap-3 pt-8">
              <h3 className="sm-socials-title m-0 text-base font-medium">Socials</h3>
              <ul className="sm-socials-list m-0 flex list-none flex-wrap items-center gap-4 p-0">
                {socialItems.map((s, i) => (
                  <li key={`${s.label}-${i}`}>
                    <a href={s.link} target="_blank" rel="noreferrer" className="sm-socials-link inline-block text-[1.2rem] font-medium no-underline">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
      <style>{`
        .sm-scope .staggered-menu-panel { width: clamp(260px, 38vw, 420px); background: var(--bg-secondary); }
        .sm-scope .sm-prelayers { width: clamp(260px, 38vw, 420px); }
        .sm-scope .staggered-menu-header { pointer-events: none; }
        .sm-scope .staggered-menu-header > * { pointer-events: auto; }
        .sm-scope .sm-toggle { color: var(--text); }
        .sm-scope .sm-logo-img { filter: none; }
        .sm-scope .sm-panel-item { color: var(--text); transition: color 0.2s ease; }
        .sm-scope .sm-panel-item:hover { color: var(--sm-accent, #fff); }
        .sm-scope .sm-socials-title { color: var(--sm-accent, #fff); }
        .sm-scope .sm-socials-link { color: var(--text); opacity: 0.85; }
        .sm-scope .sm-socials-link:hover { opacity: 1; color: var(--sm-accent, #fff); }
        .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.16em;
          right: 3.2em;
          font-size: 16px;
          font-weight: 400;
          color: var(--sm-accent, #fff);
          opacity: 0.8;
        }
        @media (max-width: 1024px) {
          .sm-scope .staggered-menu-panel,
          .sm-scope .sm-prelayers { width: 100%; left: 0; right: 0; }
        }
      `}</style>
    </div>
  )
}

export default StaggeredMenu
