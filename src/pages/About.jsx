import { useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import { useMaskReveal, useParallax, useScrollReveal, useStaggerReveal } from '../hooks/useGsap.js'

const defaultServices = [
    {
        title: 'Web development',
        description:
            'Crafting custom websites using HTML, CSS, and JavaScript, whether from scratch or by enhancing existing platforms, to meet unique client needs and increase online presence effectively.',
    },
    {
        title: 'Mobile App development',
        description:
            'Creating custom mobile apps, leveraging various platforms and programming languages, to meet specific client requirements and deliver seamless user experiences on smartphones and tablets.',
    },
    {
        title: 'Performance & optimization',
        description:
            'Improving website speed with code optimization, image compression, and hosting services for faster loading times, ensuring smoother user experiences and better engagement for visitors.',
    },
    {
        title: 'UX/UI design & prototype',
        description:
            'Offering comprehensive web design services, creating visually captivating and user-friendly websites tailored to clients\u2019 needs, utilizing modern design trends and responsive layouts to boost customer interaction and satisfaction.',
    },
    {
        title: 'Maintenance & support',
        description:
            'Offering continuous maintenance and support to ensure websites remain current and function seamlessly, ensuring uninterrupted operation and addressing any issues promptly.',
    },
]

function About() {
    const { data } = usePortfolio()
    const heroRef = useRef(null)
    const bioImageRef = useRef(null)
    const bioRef = useRef(null)
    const servicesRef = useRef(null)
    const awardsRef = useRef(null)
    const ctaRef = useRef(null)

    useMaskReveal(heroRef)
    useParallax(bioImageRef, 0.1)
    useScrollReveal(bioRef, 0.2)
    useStaggerReveal(servicesRef, '.service-row', 0.1)
    useStaggerReveal(awardsRef, '.award-row', 0.08)
    useScrollReveal(ctaRef)

    const heroName = data.hero?.name || '[YOUR NAME]'
    const heroTitle = data.hero?.title || 'Creative Developer'
    const bio = data.about?.bio || ''
    const aboutPhoto = data.about?.aboutPhotoUrl || ''
    const certificates = data.certificates || []

    return (
        <main style={{ paddingTop: '80px' }}>
            {/* ── Hero Headline ── */}
            <section
                ref={heroRef}
                style={{
                    padding: '80px 32px 60px',
                }}
            >
                <div className="container">
                    <h1
                        data-mask
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(1.8rem, 4vw, 40px)',
                            fontWeight: 700,
                            lineHeight: '1.15',
                            maxWidth: '700px',
                            color: '#000',
                        }}
                    >
                        Creative developer helping brands achieve their goals in the digital world
                    </h1>
                </div>
            </section>

            {/* ── Bio Section ── */}
            <section
                style={{
                    padding: '40px 32px 80px',
                }}
            >
                <div
                    className="container"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '56px',
                        alignItems: 'start',
                    }}
                >
                    {/* Parallax Image */}
                    <div
                        style={{
                            overflow: 'hidden',
                            position: 'relative',
                            aspectRatio: '3/4',
                            background: '#fafafa',
                        }}
                    >
                        {aboutPhoto ? (
                            <img
                                ref={bioImageRef}
                                src={aboutPhoto}
                                alt={heroName}
                                style={{
                                    width: '100%',
                                    height: '120%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    willChange: 'transform',
                                }}
                            />
                        ) : (
                            <div
                                ref={bioImageRef}
                                style={{
                                    width: '100%',
                                    height: '120%',
                                    background: 'linear-gradient(135deg, #e5e5e5, #d4d4d4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#9ca3af',
                                    fontSize: '14px',
                                }}
                            >
                                Photo
                            </div>
                        )}
                    </div>

                    {/* Bio Text */}
                    <div ref={bioRef} style={{ paddingTop: '24px' }}>
                        <p
                            style={{
                                fontSize: '16px',
                                lineHeight: '1.7',
                                color: '#000',
                                marginBottom: '24px',
                            }}
                        >
                            {bio ||
                                `I'm ${heroName}, a creative developer with experience in web and mobile development. My background across design agencies, advertising agencies, and multinational companies has shaped the way I build digital experiences: with creativity, clarity, and attention to detail.`}
                        </p>
                        <p
                            style={{
                                fontSize: '16px',
                                lineHeight: '1.7',
                                color: '#6b7280',
                            }}
                        >
                            I'm a proactive person who enjoys creating through both design and development,
                            always driven by curiosity, improvement, and new ideas. That same mindset shapes the
                            way I approach life, with a deep appreciation for nature, meaningful experiences, and
                            the people I care about most.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Services Section ── */}
            <section
                ref={servicesRef}
                style={{
                    padding: '80px 32px',
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                }}
            >
                <div className="container">
                    <h2
                        style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            marginBottom: '40px',
                            color: '#000',
                        }}
                    >
                        Services
                    </h2>

                    <p
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.2rem, 2.5vw, 24px)',
                            fontWeight: 400,
                            lineHeight: '1.4',
                            maxWidth: '700px',
                            margin: '0 auto 56px',
                            textAlign: 'center',
                            color: '#000',
                        }}
                    >
                        I bridge design and development, turning ideas into polished digital experiences. From
                        concept to code, every interaction is considered, every detail intentional.
                    </p>

                    {defaultServices.map((service, index) => (
                        <div
                            key={index}
                            className="service-row"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 2fr',
                                gap: '40px',
                                padding: '32px 0',
                                borderTop: index > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                                alignItems: 'start',
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    color: '#000',
                                }}
                            >
                                {service.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '1.6',
                                    color: '#6b7280',
                                    maxWidth: '560px',
                                    justifySelf: 'end',
                                    textAlign: 'right',
                                }}
                            >
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Awards / Certificates Section ── */}
            {certificates.length > 0 && (
                <section
                    ref={awardsRef}
                    style={{
                        padding: '80px 32px',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                    }}
                >
                    <div className="container">
                        <h2
                            style={{
                                fontSize: '16px',
                                fontWeight: 700,
                                marginBottom: '40px',
                                color: '#000',
                            }}
                        >
                            Awards
                        </h2>

                        {certificates.map((cert, index) => (
                            <div
                                key={cert.id}
                                className="award-row"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '80px 1fr 1fr',
                                    gap: '24px',
                                    padding: '24px 0',
                                    borderTop: index > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                                    alignItems: 'baseline',
                                }}
                            >
                                <span style={{ fontSize: '14px', color: '#9ca3af' }}>
                                    {cert.date?.split(' ').pop() || '2024'}
                                </span>
                                <span style={{ fontSize: '16px', fontWeight: 500 }}>
                                    {cert.name}
                                </span>
                                <span
                                    style={{
                                        fontSize: '14px',
                                        color: '#6b7280',
                                        textAlign: 'right',
                                    }}
                                >
                                    {cert.issuer}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── CTA Section ── */}
            <section
                ref={ctaRef}
                style={{
                    padding: '80px 32px',
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                }}
            >
                <div className="container" style={{ maxWidth: '700px' }}>
                    <p
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.2rem, 2.5vw, 24px)',
                            fontWeight: 400,
                            lineHeight: '1.4',
                            color: '#000',
                            marginBottom: '32px',
                        }}
                    >
                        I partner with brands and studios that care about clarity, craft and a point of view.
                    </p>
                    <p style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                        Let's talk
                    </p>
                    <a
                        href={`mailto:${data.contact?.email || 'hello@yourdomain.com'}`}
                        style={{
                            fontSize: '16px',
                            color: '#000',
                            textDecoration: 'underline',
                            textUnderlineOffset: '4px',
                        }}
                    >
                        {data.contact?.email || 'hello@yourdomain.com'}
                    </a>
                </div>
            </section>

            {/* ── Responsive: Stack bio on mobile ── */}
            <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          .service-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .service-row p {
            text-align: left !important;
            justify-self: start !important;
          }
          .award-row {
            grid-template-columns: 60px 1fr !important;
          }
          .award-row > span:last-child {
            grid-column: 2;
            text-align: left !important;
          }
        }
      `}</style>
        </main>
    )
}

export default About
