import React from 'react'
import { AnimatedFooter } from './ui/animated-footer'
import { usePortfolio } from '../context/PortfolioContext'
import { LiquidMetalButton } from './LiquidMetalButton'

function Footer() {
  const { data } = usePortfolio()
  const rawName = data.hero?.name
  const name = rawName && !rawName.startsWith('[') ? rawName : 'SOLKINGS'

  return (
    <AnimatedFooter
      headingLines={[name]}
      leftImage="/images/reaching-hands.png"
      rightImage="/images/reaching-hands.png"
    >
      <div className="flex justify-end w-full">
        <LiquidMetalButton
          size="sm"
          icon="↑"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </LiquidMetalButton>
      </div>
    </AnimatedFooter>
  )
}

export default Footer
