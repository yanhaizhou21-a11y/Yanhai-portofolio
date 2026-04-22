import AnimatedSection from '../components/AnimatedSection.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

function AboutSection({ about }) {
  return (
    <AnimatedSection id="about" className="border-b border-white/10 px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <SectionTitle eyebrow="About Me" title="Design-minded and detail-focused." />
          <p className="mb-6 text-gray-400">{about.bio}</p>
          <div className="flex flex-wrap gap-2">
            {about.values.map((value) => (
              <span
                key={value}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="h-80 w-full rounded-2xl border border-white/10 bg-white/5" />
        </div>
      </div>
    </AnimatedSection>
  )
}

export default AboutSection
