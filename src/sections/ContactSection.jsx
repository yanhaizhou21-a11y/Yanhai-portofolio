import AnimatedSection from '../components/AnimatedSection.jsx'

function ContactSection({ contact }) {
  return (
    <AnimatedSection id="contact" className="px-4 py-24 md:px-8">
      <footer className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#141414] px-6 py-12 md:px-10">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gray-500">Contact</p>
        <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">{contact.cta}</h2>
        <a
          href={`mailto:${contact.email}`}
          className="mb-6 inline-block text-lg text-gray-300 underline decoration-gray-600 underline-offset-4 transition hover:text-white"
        >
          {contact.email}
        </a>
        <div className="flex flex-wrap gap-3">
          {contact.socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-400 transition hover:border-white hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
      </footer>
    </AnimatedSection>
  )
}

export default ContactSection
