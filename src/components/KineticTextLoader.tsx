const loaderStyles = `
  @keyframes ktl-dot-move {
    0%, 100% { transform: rotate(180deg) translate(-80px, -10px) rotate(-180deg); }
    50% { transform: rotate(0deg) translate(-81px, 10px) rotate(0deg); }
  }

  @keyframes ktl-letter-stretch {
    0%, 100% { transform: scale(1, .35); transform-origin: 100% 75%; }
    8%, 28% { transform: scale(1, 1.4); transform-origin: 100% 67%; }
    37% { transform: scale(1, .875); transform-origin: 100% 75%; }
    46% { transform: scale(1, 1.03); transform-origin: 100% 75%; }
    50%, 97% { transform: scale(1); transform-origin: 100% 75%; }
  }

  @keyframes ktl-l-bounce {
    0%, 45%, 70%, 100% { transform: scaleY(1.11); }
    49% { transform: scaleY(.31); }
    50% { transform: scaleY(.16); }
    53% { transform: scaleY(.63); }
    60% { transform: scaleY(1.275); }
    68% { transform: scaleY(1.04); }
  }
`

export function KineticTextLoader({ text = 'Loading', className = '' }) {
  return (
    <div className={`kinetic-loader ${className}`} role="status" aria-label={`${text} portfolio`}>
      <style>{loaderStyles}</style>
      <div className="kinetic-loader__word" aria-hidden="true">
        <span className="kinetic-loader__dot" />
        {Array.from(text).map((character, index) => {
          const isL = index === 0 && character.toUpperCase() === 'L'
          const isI = index === 4 && character.toLowerCase() === 'i'

          return (
            <span
              key={`${character}-${index}`}
              className={`kinetic-loader__letter${isL ? ' kinetic-loader__letter--l' : ''}${isI ? ' kinetic-loader__letter--i' : ''}`}
            >
              {isI ? 'ı' : character}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default KineticTextLoader
