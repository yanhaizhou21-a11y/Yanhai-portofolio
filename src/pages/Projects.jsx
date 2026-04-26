import { motion } from 'framer-motion'
import ProjectsPage from '../components/Projects/ProjectsPage.jsx'
import { useCollectionData } from '../hooks/usePortfolioData.js'

function Projects() {
  const projects = useCollectionData('projects')

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ProjectsPage projects={projects} />
    </motion.main>
  )
}

export default Projects
