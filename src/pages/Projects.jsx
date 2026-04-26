import { motion } from 'framer-motion'
import ProjectsPage from '../components/Projects/ProjectsPage.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function Projects() {
  const { data } = usePortfolio()
  const allProjects = [
    ...(data.webProjects || []).map(p => ({ ...p, category: 'web', title: p.name, imageUrl: p.image, link: p.liveLink, githubLink: p.githubLink, tags: p.techStack ? p.techStack.split(',').map(s => s.trim()) : [] })),
    ...(data.graphicDesignProjects || []).map(p => ({ ...p, category: 'graphic', title: p.title, imageUrl: p.image }))
  ]

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ProjectsPage projects={allProjects} />
    </motion.main>
  )
}

export default Projects
