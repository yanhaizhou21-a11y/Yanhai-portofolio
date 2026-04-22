import AnimatedSection from '../components/AnimatedSection.jsx'
import SectionTitle from '../components/SectionTitle.jsx'

function CertificatesSection({ certificates }) {
  return (
    <AnimatedSection id="certificates" className="border-b border-gray-200 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Certificates" title="Verified learning milestones." />
        <div className="grid gap-4 md:grid-cols-3">
          {certificates.map((certificate) => (
            <article key={certificate.id} className="rounded-xl border border-gray-300 bg-white p-4">
              <div className="mb-4 h-32 rounded-lg border border-gray-300 bg-gray-200" />
              <h3 className="text-lg font-semibold text-black">{certificate.name}</h3>
              <p className="text-sm text-gray-600">{certificate.issuer}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-500">
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
