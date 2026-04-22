import { motion } from 'framer-motion'

function AnimatedSection({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}

export default AnimatedSection
