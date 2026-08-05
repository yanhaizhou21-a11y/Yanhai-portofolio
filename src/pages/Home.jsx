import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { usePortfolio } from '../context/PortfolioContext.jsx'

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function Home() {
  const { data } = usePortfolio()
  const rawName = data.hero?.name
  const heroName = rawName && !rawName.startsWith('[') ? rawName : 'SOLKINGS'
  const rawTitle = data.hero?.title
  const heroTitle = rawTitle && !rawTitle.startsWith('[')
    ? rawTitle
    : 'Independent designer and frontend developer creating expressive digital experiences.'

  return (
    <main className="home-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero__backdrop" />
        <div className="portfolio-hero__grain" />

        <div className="portfolio-hero__art" aria-hidden="true">
          <img src="/images/reaching-hands.png" alt="" />
        </div>
        <div className="portfolio-hero__glow" />

        <div className="portfolio-hero__content">
          <div className="portfolio-hero__kicker rise-up" style={{ '--delay': '.32s' }}>
            <span />
            Design &amp; development
            <span />
          </div>

          <h1 className="rise-up" style={{ '--delay': '.44s' }}>
            <span>Ideas shaped with intent.</span>
            <strong>{heroName}</strong>
          </h1>

          <p className="rise-up" style={{ '--delay': '.58s' }}>{heroTitle}</p>

          <Link className="hero-cta rise-up" style={{ '--delay': '.7s' }} to="/projects">
            View selected work
            <ArrowRight />
          </Link>
        </div>

        <span className="portfolio-hero__caption portfolio-hero__caption--left rise-up" style={{ '--delay': '.82s' }}>
          Available for thoughtful work
        </span>
        <span className="portfolio-hero__caption portfolio-hero__caption--right rise-up" style={{ '--delay': '.82s' }}>
          Jakarta / Indonesia
        </span>
      </section>

      <section className="home-intro" aria-label="Introduction">
        <span className="eyebrow">Selected practice</span>
        <p>I bring visual identity and frontend engineering into one process—so the idea, interaction, and final build feel like the same piece of work.</p>
        <Link to="/about">More about the practice <span aria-hidden="true">↗</span></Link>
      </section>

      <Footer />
    </main>
  )
}

export default Home
