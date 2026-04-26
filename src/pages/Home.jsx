import { motion } from 'framer-motion'
import Hero from '../components/Hero.jsx'
import Skills from '../components/Skills.jsx'
import ProjectsPreview from '../components/Projects/ProjectsPreview.jsx'
import AboutExperience from '../components/AboutExperience.jsx'
import Certificates from '../components/Certificates.jsx'
import Footer from '../components/Footer.jsx'
import { useCollectionData, useConfig } from '../hooks/usePortfolioData.js'

function Home() {
  const config = useConfig()
  const projects = useCollectionData('projects')
  const skills = useCollectionData('skills')
  const experience = useCollectionData('experience')
  const certificates = useCollectionData('certificates')

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero config={config} />
      <Skills skills={skills} />
      <ProjectsPreview projects={projects} />
      <AboutExperience config={config} experience={experience} />
      <Certificates certificates={certificates} />
      <Footer />
    </motion.main>
  )
}

export default Home
