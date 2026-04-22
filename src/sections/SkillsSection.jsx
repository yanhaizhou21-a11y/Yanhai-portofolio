import AnimatedSection from '../components/AnimatedSection.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

function SkillsSection({ skills }) {
  const grouped = Object.entries(
    skills.reduce((acc, skill) => {
      acc[skill.category] = acc[skill.category] ? [...acc[skill.category], skill] : [skill]
      return acc
    }, {}),
  )

  return (
    <AnimatedSection id="skills" className="border-b border-gray-200 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Skills" title="Tools I use to craft experiences." />
        <div className="space-y-10">
          {grouped.map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-4 text-lg font-semibold text-black">{category}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((skill) => (
                  <div key={skill.id} className="rounded-xl border border-gray-300 bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-400 text-xs font-semibold">
                          {skill.logo}
                        </span>
                        <p className="font-medium text-black">{skill.name}</p>
                      </div>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default SkillsSection
