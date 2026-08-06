'use client';

import React, { forwardRef, useRef } from 'react';
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  Boxes,
  Braces,
  CodeXml,
  Component,
  MousePointer2,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { useTheme } from '../../hooks/useTheme.js';
import { LiquidMetalButton } from '../LiquidMetalButton.jsx';
import ExpandingCards from './expanding-cards.jsx';

const practiceItems = [
  {
    id: 'interactive-systems',
    title: 'Interactive Systems',
    description: 'Interfaces shaped around clear states, useful feedback, and natural interaction.',
    imgSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop',
    icon: <MousePointer2 size={24} strokeWidth={1.7} />,
  },
  {
    id: 'creative-coding',
    title: 'Creative Coding',
    description: 'Canvas, WebGL, and browser experiments turned into expressive visual systems.',
    imgSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop',
    icon: <Braces size={24} strokeWidth={1.7} />,
  },
  {
    id: 'motion-direction',
    title: 'Motion Direction',
    description: 'Purposeful motion that guides attention without competing with the work.',
    imgSrc: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop',
    icon: <WandSparkles size={24} strokeWidth={1.7} />,
  },
  {
    id: 'frontend-craft',
    title: 'Frontend Craft',
    description: 'Responsive React experiences built with performance and maintainability in mind.',
    imgSrc: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop',
    icon: <CodeXml size={24} strokeWidth={1.7} />,
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    description: 'Reusable foundations that keep products coherent as teams and features grow.',
    imgSrc: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&auto=format&fit=crop',
    icon: <Component size={24} strokeWidth={1.7} />,
  },
  {
    id: 'digital-products',
    title: 'Digital Products',
    description: 'Product thinking translated into focused screens, flows, and working software.',
    imgSrc: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&auto=format&fit=crop',
    icon: <Boxes size={24} strokeWidth={1.7} />,
  },
  {
    id: 'visual-experiments',
    title: 'Visual Experiments',
    description: 'Small studies in typography, image, and motion that lead to new visual language.',
    imgSrc: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&auto=format&fit=crop',
    icon: <Sparkles size={24} strokeWidth={1.7} />,
  },
];

function HeroSection({ scrollYProgress, name, title }) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-4%']);

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

function PracticeSection({ scrollYProgress, isDark }) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [reduceMotion ? '0%' : '4%', '0%']);

  return (
    <Motion.section
      style={{ scale, y }}
      className={`relative z-20 min-h-screen rounded-t-[28px] border-t px-4 py-20 md:px-8 ${
        isDark ? 'border-white/10 bg-[#090909] text-white' : 'border-black/10 bg-[#eceae3] text-[#191b1e]'
      }`}
    >
      <article className="relative z-10 mx-auto flex w-full max-w-[1152px] flex-col items-center justify-center text-center">
        <span className={`text-[11px] font-medium uppercase tracking-[0.24em] ${isDark ? 'text-white/50' : 'text-black/50'}`}>
          Selected practice
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
          Design that moves. Code that holds.
        </h2>
        <p className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          Hover, focus, or tap a card to see how visual identity and frontend engineering meet in the work.
        </p>

        <ExpandingCards items={practiceItems} defaultActiveIndex={0} className="mt-9" />

        <div className="mt-9">
          <LiquidMetalButton size="md" icon="↗" onClick={() => navigate('/about')}>
            More about the practice
          </LiquidMetalButton>
        </div>
      </article>
    </Motion.section>
  );
}

export const HeroScrollAnimation = forwardRef(function HeroScrollAnimation(_props, ref) {
  const { data } = usePortfolio();
  const { isDark = true } = useTheme();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

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
      className={`relative h-[200vh] ${isDark ? 'bg-black' : 'bg-[#f4f3ef]'}`}
    >
      <HeroSection scrollYProgress={scrollYProgress} name={name} title={title} />
      <PracticeSection scrollYProgress={scrollYProgress} isDark={isDark} />
    </main>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
