'use client';

import React, { forwardRef, useRef } from 'react';
import { motion as Motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { useTheme } from '../../hooks/useTheme.js';
import { LiquidMetalButton } from '../LiquidMetalButton.jsx';
import Carousel_001 from './carousel-001.jsx';
import StickyCard002 from './sticky-card-002.jsx';

const practiceItems = [
  {
    id: 'interactive-systems',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop',
    alt: 'Modern architecture surrounded by trees',
  },
  {
    id: 'creative-coding',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop',
    alt: 'Abstract violet glass forms',
  },
  {
    id: 'motion-direction',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&auto=format&fit=crop',
    alt: 'Minimal interior with graphic shadows',
  },
  {
    id: 'frontend-craft',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1600&auto=format&fit=crop',
    alt: 'Animated interface artwork',
  },
  {
    id: 'design-systems',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&auto=format&fit=crop',
    alt: 'Designer working with interface layouts',
  },
  {
    id: 'digital-products',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&auto=format&fit=crop',
    alt: 'Digital product interface on a screen',
  },
  {
    id: 'visual-experiments',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1600&auto=format&fit=crop',
    alt: 'Purple abstract paint texture',
  },
];

function HeroSection({ scrollYProgress, name, title }) {
  const navigate = useNavigate();
  const scale = useTransform(scrollYProgress, [0, 0.16], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.16], ['0%', '-4%']);

  return (
    <Motion.section style={{ scale, y }} className="portfolio-hero sticky top-0 rounded-b-[28px] border-b border-black/10 dark:border-white/10">
      <div className="portfolio-hero__backdrop" />
      <div className="portfolio-hero__grain" />
      <div className="portfolio-hero__art" aria-hidden="true">
        <img src="/images/reaching-hands.png" alt="" />
      </div>
      <div className="portfolio-hero__glow" />

      <div className="portfolio-hero__content">
        <div className="portfolio-hero__kicker rise-up" style={{ '--delay': '120ms' }}>
          <span /> Design &amp; Frontend Development <span />
        </div>
        <h1 className="rise-up" style={{ '--delay': '220ms' }}>
          <span>Ideas shaped with intent.</span>
          <strong>{name}</strong>
        </h1>
        <p className="rise-up" style={{ '--delay': '340ms' }}>{title}</p>
        <div className="rise-up" style={{ '--delay': '460ms' }}>
          <LiquidMetalButton size="lg" icon="→" onClick={() => navigate('/projects')}>
            View selected work
          </LiquidMetalButton>
        </div>
      </div>

      <span className="portfolio-hero__caption portfolio-hero__caption--left">Scroll to explore</span>
      <span className="portfolio-hero__caption portfolio-hero__caption--right">Portfolio · 2026</span>
    </Motion.section>
  );
}

function PracticeSection({ isDark }) {
  const navigate = useNavigate();

  return (
    <section
      className={`relative z-20 min-h-screen w-full flex flex-col items-center justify-center overflow-hidden rounded-t-[28px] border-t px-4 py-20 md:px-8 ${
        isDark ? 'border-white/10 bg-[#090909] text-white' : 'border-black/10 bg-[#eceae3] text-[#191b1e]'
      }`}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <span className={`text-[11px] font-medium uppercase tracking-[0.24em] ${isDark ? 'text-white/50' : 'text-black/50'}`}>
          Selected practice
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
          Design that moves. Code that holds.
        </h2>
        <p className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          Drag or use the arrows to browse selected visual experiments.
        </p>
      </div>

      <div className="mt-10 w-full flex items-center justify-center">
        <Carousel_001
          images={practiceItems.map((item) => ({ id: item.id, src: item.image, alt: item.alt }))}
          showPagination
          showNavigation
          loop
        />
      </div>

      <div className="mt-8 flex justify-center">
        <LiquidMetalButton size="md" icon="↗" onClick={() => navigate('/about')}>
          More about the practice
        </LiquidMetalButton>
      </div>
    </section>
  );
}

export const HeroScrollAnimation = forwardRef(function HeroScrollAnimation(_props, ref) {
  const { data } = usePortfolio();
  const { isDark = true } = useTheme();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  const rawName = data?.hero?.name;
  const name = rawName && !rawName.startsWith('[') ? rawName : 'SOLKINGS';
  const rawTitle = data?.hero?.title;
  const title = rawTitle && !rawTitle.startsWith('[')
    ? rawTitle
    : 'Independent designer and frontend developer creating expressive digital experiences.';

  return (
    <main
      ref={(node) => {
        container.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={`relative w-full ${isDark ? 'bg-black' : 'bg-[#f4f3ef]'}`}
    >
      <HeroSection scrollYProgress={scrollYProgress} name={name} title={title} />
      <StickyCard002
        cards={practiceItems.slice(0, 5)}
        className={isDark ? 'bg-[#090909]' : 'bg-[#eceae3]'}
        imageClassName="border border-black/10 dark:border-white/15"
      />
      <PracticeSection isDark={isDark} />
    </main>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
