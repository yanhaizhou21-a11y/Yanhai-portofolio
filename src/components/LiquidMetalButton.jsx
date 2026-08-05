import { memo, forwardRef } from "react"
import { motion } from "framer-motion"

/**
 * LiquidMetalButton — CSS-only liquid metal shimmer.
 * ponytail: no WebGL dependency, conic gradient replaces @paper-design/shaders-react
 */
export const LiquidMetal = memo(function LiquidMetal({
  colorBack = "var(--ascend-bg-top)",
  colorTint = "var(--ascend-accent)",
  speed = 4,
  className,
  style,
}) {
  return (
    <div
      className={["absolute inset-0 z-0 overflow-hidden rounded-full", className].filter(Boolean).join(" ")}
      style={{ ...style, background: colorBack }}
    >
      <motion.div
        className="absolute inset-[-100%] rounded-full opacity-60 mix-blend-overlay"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorTint} 90deg, transparent 180deg, ${colorTint} 270deg, transparent 360deg)`
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      />
    </div>
  )
})

LiquidMetal.displayName = "LiquidMetal"

export const LiquidMetalButton = forwardRef(
  ({ children, icon, borderWidth = 3, metalConfig, size = "md", className, disabled, ...props }, ref) => {

    const sizeStyles = {
      sm: { py: '8px', pl: '8px', pr: '24px', gap: '12px', fontSize: '14px', iconSize: '32px' },
      md: { py: '12px', pl: '12px', pr: '32px', gap: '16px', fontSize: '15.5px', iconSize: '40px' },
      lg: { py: '16px', pl: '16px', pr: '40px', gap: '24px', fontSize: '17px', iconSize: '48px' },
    }

    const s = sizeStyles[size] || sizeStyles.md

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={["relative group cursor-pointer border-none bg-transparent p-0 outline-none", className].filter(Boolean).join(" ")}
        style={{
          transition: 'transform 0.15s ease',
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        {...props}
      >
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            padding: borderWidth,
            boxShadow: '0 14px 34px -12px rgba(25, 27, 30, 0.45)',
          }}
        >
          <LiquidMetal
            colorBack={metalConfig?.colorBack}
            colorTint={metalConfig?.colorTint}
            speed={metalConfig?.speed}
            className="absolute inset-0 z-0"
          />

          <div
            className="relative z-10 rounded-full flex items-center"
            style={{
              backgroundColor: 'var(--ascend-button-bg)',
              padding: `${s.py} ${s.pr} ${s.py} ${s.pl}`,
              gap: s.gap,
              transition: 'background-color 0.2s ease, transform 0.25s ease',
            }}
          >
            {icon && (
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  width: s.iconSize,
                  height: s.iconSize,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--ascend-button-text)',
                }}
              >
                <span>{icon}</span>
              </div>
            )}
            <span
              style={{
                color: 'var(--ascend-button-text)',
                fontFamily: "var(--font-body)",
                fontSize: s.fontSize,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              {children}
            </span>
          </div>
        </div>
      </button>
    )
  }
)

LiquidMetalButton.displayName = "LiquidMetalButton"
