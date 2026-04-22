function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gray-500">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
    </div>
  )
}

export default SectionTitle
