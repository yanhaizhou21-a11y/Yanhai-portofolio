import AnimatedSection from '../components/AnimatedSection.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

function SkillsSection({ skills }) {
  return (
    <AnimatedSection id="skills" className="border-b border-white/10 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Skills" title="Tools I use to craft experiences." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="group flex flex-col items-center justify-center gap-4 rounded-xl border border-white/5 bg-[#141414] p-6 transition-all duration-300 hover:border-white/15 hover:bg-[#1a1a1a]"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 text-xl font-bold text-white">
                    {skill.logo || skill.name.charAt(0)}
                  </span>
                )}
              </div>
              <p className="text-center text-xs font-medium uppercase tracking-wider text-gray-400 transition-colors group-hover:text-white">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default SkillsSection
