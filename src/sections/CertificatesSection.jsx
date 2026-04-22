import AnimatedSection from '../components/AnimatedSection.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

function CertificatesSection({ certificates }) {
  return (
    <AnimatedSection id="certificates" className="border-b border-white/10 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Certificates" title="Verified learning milestones." />
        <div className="grid gap-4 md:grid-cols-3">
          {certificates.map((certificate) => (
            <article key={certificate.id} className="rounded-xl border border-white/10 bg-[#141414] p-4 transition hover:border-white/20">
              <div className="mb-4 h-32 rounded-lg border border-white/5 bg-white/5" />
              <h3 className="text-lg font-semibold text-white">{certificate.name}</h3>
              <p className="text-sm text-gray-500">{certificate.issuer}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-600">
                {certificate.date}
              </p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default CertificatesSection
