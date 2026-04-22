import AnimatedSection from '../components/AnimatedSection.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

function ExperienceSection({ experience }) {
  return (
    <AnimatedSection id="experience" className="border-b border-white/10 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Experience" title="A timeline of my recent work." />
        <div className="relative ml-3 border-l border-white/15 pl-8">
          {experience.map((item) => (
            <article key={item.id} className="relative mb-10">
              <span className="absolute -left-[2.13rem] top-2 h-3 w-3 rounded-full bg-white" />
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{item.dateRange}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{item.role}</h3>
              <p className="mb-2 text-sm text-gray-500">{item.company}</p>
              <p className="text-gray-400">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default ExperienceSection
