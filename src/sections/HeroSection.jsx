import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection.jsx'

function HeroSection({ hero }) {
  return (
    <AnimatedSection
      id="hero"
      className="relative flex min-h-screen items-center border-b border-white/10 px-4 py-24 md:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-gray-500">Portfolio</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-7xl">
          {hero.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-400 md:text-2xl">{hero.title}</p>
        <motion.a
          href="#about"
          className="mt-16 inline-flex items-center gap-3 text-sm text-white"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        >
          <span className="h-8 w-[1px] bg-white" />
          {hero.cta}
        </motion.a>
      </div>
    </AnimatedSection>
  )
}

export default HeroSection
