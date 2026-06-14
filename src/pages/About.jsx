import { useEffect, useRef, useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext.jsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlowingMenu from '../components/reactbits/FlowingMenu.jsx'
import ScrollFloat from '../components/reactbits/ScrollFloat.jsx'

gsap.registerPlugin(ScrollTrigger)

const defaultServices = [
  {
    title: 'Web Development',
    description:
      'Crafting custom websites using modern frameworks and technologies, whether from scratch or by enhancing existing platforms, to meet unique client needs and increase online presence.',
  },
  {
    title: 'Mobile App Development',
    description:
      'Creating custom mobile apps leveraging various platforms and programming languages to meet specific client requirements and deliver seamless user experiences.',
  },
  {
    title: 'Performance & Optimization',
    description:
      'Improving website speed with code optimization, image compression, and hosting services for faster loading times and smoother user experiences.',
  },
  {
    title: 'UX/UI Design & Prototype',
    description:
      'Creating visually captivating and user-friendly websites tailored to client needs, utilizing modern design trends and responsive layouts.',
  },
  {
    title: 'Maintenance & Support',
    description:
      'Offering continuous maintenance and support to ensure websites remain current and function seamlessly, addressing any issues promptly.',
  },
]

function About() {
  const { data } = usePortfolio()
  const heroName = data.hero?.name || 'SOLKINGS'
  const bio = data.about?.bio || ''
  const aboutPhoto = data.about?.aboutPhotoUrl || ''
  const certificates = data.certificates || []
  const pageRef = useRef(null)
  const [certPreview, setCertPreview] = useState(null)

  useEffect(() => {
    if (!pageRef.current) return
    const ctx = gsap.context(() => {
      // Hero mask reveal
      gsap.fromTo(
        '.about-hero-text',
        { y: '102%' },
        {
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        }
      )

      // Service items border reveal on scroll
      gsap.utils.toArray('.service-item').forEach((item) => {
        gsap.fromTo(
          item.querySelector('.service-line'),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Awards items
      gsap.utils.toArray('.award-item').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // CTA section
      gsap.fromTo(
        '.cta-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
          },
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef} style={{ paddingTop: '100px' }}>
      {/* Hero heading - 10/16 columns */}
      <section style={{ padding: 'var(--pt-medium) var(--grid-padding) var(--pt-medium-large)' }}>
        <div className="container">
          <div style={{ width: '62.5%' }}>
            <div style={{ overflow: 'hidden' }}>
              <h1
                className="about-hero-text"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  lineHeight: '1.1',
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                }}
              >
                Creative developer helping brands achieve their goals in the digital world
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Image + Bio */}
      <section style={{ padding: '0 var(--grid-padding) var(--pt-medium-large)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--pt-small)',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                aspectRatio: '3/4',
                background: 'var(--bg-secondary)',
                overflow: 'hidden',
              }}
            >
              {aboutPhoto ? (
                <img
                  src={aboutPhoto}
                  alt={heroName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-disabled)',
                    fontSize: '13px',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Photo
                </div>
              )}
            </div>

            <div style={{ paddingTop: 'var(--pt-small)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  lineHeight: '1.7',
                  color: 'var(--text)',
                  marginBottom: '24px',
                }}
              >
                {bio || `I'm ${heroName}, a creative developer with experience in web and mobile development.`}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  lineHeight: '1.7',
                  color: 'var(--text-muted)',
                }}
              >
                I'm a proactive person who enjoys creating through both design and development, always
                driven by curiosity, improvement, and new ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section
        style={{
          padding: 'var(--pt-medium) var(--grid-padding)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 400,
              marginBottom: 'var(--pt-small)',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            Services
          </p>

          {defaultServices.map((service, index) => (
            <div
              key={index}
              className="service-item"
              style={{
                display: 'grid',
                gridTemplateColumns: '10fr 6fr',
                gap: 'var(--pt-small)',
                padding: '28px 0',
                position: 'relative',
              }}
            >
              {/* Animated border line */}
              <div
                className="service-line"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'var(--border)',
                  transformOrigin: 'left center',
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  fontWeight: 400,
                  color: 'var(--text)',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: 'var(--text-muted)',
                  textAlign: 'right',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}

          {/* Bottom border */}
          <div style={{ height: '1px', background: 'var(--border)' }} />
        </div>
      </section>

      {/* Awards / Certificates with FlowingMenu */}
      {certificates.length > 0 && (
        <section
          style={{
            padding: 'var(--pt-medium) var(--grid-padding)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="container">
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 400,
                marginBottom: 'var(--pt-small)',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              Awards & Certificates
            </p>

            {/* Certificate preview on click */}
            {certPreview && (
              <div
                style={{
                  position: 'relative',
                  marginBottom: '24px',
                  background: 'var(--bg-secondary)',
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  maxWidth: '600px',
                }}
              >
                <img
                  src={certPreview.image}
                  alt={certPreview.text}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <button
                  onClick={() => setCertPreview(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    borderRadius: '0',
                  }}
                >
                  Close
                </button>
                <p style={{
                  padding: '12px 16px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text)',
                }}>
                  {certPreview.text} {certPreview.issuer && `— ${certPreview.issuer}`}
                </p>
              </div>
            )}

            <div style={{ height: `${Math.max(certificates.length * 72, 200)}px`, minHeight: '200px' }}>
              <FlowingMenu
                items={certificates.map((cert) => ({
                  text: cert.name,
                  image: cert.image || '',
                  link: '#',
                  issuer: cert.issuer,
                }))}
                onItemClick={(item) => {
                  if (item.image) {
                    setCertPreview(item)
                  }
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="cta-section"
        style={{
          padding: 'var(--pt-large) var(--grid-padding)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <ScrollFloat
            containerClassName="cta-text"
            textClassName=""
            stagger={0.04}
            tag="p"
          >
            I partner with brands and studios that care about clarity, craft and a point of view.
          </ScrollFloat>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 400,
                marginBottom: '8px',
                color: 'var(--text)',
              }}
            >
              Let&rsquo;s talk
            </p>
            <a
              href={`mailto:${data.contact?.email || 'hello@yourdomain.com'}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--text)',
                textDecoration: 'none',
                fontWeight: 400,
                borderBottom: '1px solid var(--text)',
                paddingBottom: '2px',
                transition: 'opacity 0.25s ease',
              }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.5')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              {data.contact?.email || 'hello@yourdomain.com'}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          .container > div[style*="grid-template-columns: 80px 1fr 1fr"] {
            grid-template-columns: 60px 1fr !important;
          }
          .container > div[style*="grid-template-columns: 80px 1fr 1fr"] > span:last-child {
            grid-column: 2;
            text-align: left !important;
          }
          section > .container > div[style*="width: 62.5%"] {
            width: 100% !important;
          }
        }
      `}</style>
    </main>
  )
}

export default About
