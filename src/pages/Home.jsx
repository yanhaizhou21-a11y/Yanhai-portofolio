import { motion } from 'framer-motion'
import Hero from '../components/Hero.jsx'
import Skills from '../components/Skills.jsx'
import ProjectsPreview from '../components/Projects/ProjectsPreview.jsx'
import AboutExperience from '../components/AboutExperience.jsx'
import Certificates from '../components/Certificates.jsx'
import Footer from '../components/Footer.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function Home() {
  const { data } = usePortfolio()
  
  const allProjects = [
    ...(data.webProjects || []).map(p => ({ ...p, category: 'web', title: p.name, imageUrl: p.image, link: p.liveLink, githubLink: p.githubLink, tags: p.techStack ? p.techStack.split(',').map(s => s.trim()) : [] })),
    ...(data.graphicDesignProjects || []).map(p => ({ ...p, category: 'graphic', title: p.title, imageUrl: p.image }))
  ]

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero config={data.hero} />
      <Skills skills={data.skills} />
      <ProjectsPreview projects={allProjects} />
      <AboutExperience config={data.about} experience={data.experience} />
      <Certificates certificates={data.certificates} />
      <Footer />
    </motion.main>
  )
}

export default Home
