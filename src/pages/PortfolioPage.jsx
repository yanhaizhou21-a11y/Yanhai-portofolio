import Navbar from '../components/Navbar.jsx'
import CustomCursor from '../components/CustomCursor.jsx'
import HeroSection from '../sections/HeroSection.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import SkillsSection from '../sections/SkillsSection.jsx'
import ExperienceSection from '../sections/ExperienceSection.jsx'
import ProjectsSection from '../sections/ProjectsSection.jsx'
import CertificatesSection from '../sections/CertificatesSection.jsx'
import ContactSection from '../sections/ContactSection.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function PortfolioPage() {
  const { data } = usePortfolio()
  return (
    <div className="bg-[#0a0a0a] text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection hero={data.hero} />
        <AboutSection about={data.about} />
        <SkillsSection skills={data.skills} />
        <ExperienceSection experience={data.experience} />
        <ProjectsSection
          graphicDesignProjects={data.graphicDesignProjects}
          webProjects={data.webProjects}
        />
        <CertificatesSection certificates={data.certificates} />
        <ContactSection contact={data.contact} />
      </main>
    </div>
  )
}

export default PortfolioPage
