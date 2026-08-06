'use client';

import React, { useRef, forwardRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext.jsx';
import { useTheme } from '../../hooks/useTheme.js';
import { LiquidMetalButton } from '../LiquidMetalButton.jsx';
import CyberpunkCard from './cyberpunk-card.jsx';

const Section1 = ({ scrollYProgress, name, title, isDark }) => {
  const navigate = useNavigate();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className={`sticky top-0 h-screen w-full flex flex-col items-center justify-center p-8 overflow-hidden rounded-b-3xl transition-colors duration-300 ${
        isDark ? "bg-black text-white border-b border-white/10" : "bg-[#f4f3ef] text-[#191b1e] border-b border-black/10"
      }`}
    >
      <div
        className={`absolute inset-0 bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none ${
          isDark
            ? "bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)]"
        }`}
      />

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center gap-6">
        <div
          className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs uppercase tracking-widest ${
            isDark ? "border-white/20 bg-white/5 text-neutral-300" : "border-black/15 bg-black/5 text-neutral-700"
          }`}
        >
          <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? "bg-white" : "bg-black"}`} />
          Design &amp; Frontend Development
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1]">
          Ideas shaped with intent. <br />
          <span
            className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${
              isDark ? "from-white via-neutral-300 to-neutral-500" : "from-black via-neutral-800 to-neutral-600"
            }`}
          >
            {name}
          </span>
        </h1>

        <p className={`max-w-xl text-lg md:text-xl font-light leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
          {title}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <LiquidMetalButton
            size="lg"
            icon="→"
            onClick={() => navigate('/projects')}
          >
            View selected work
          </LiquidMetalButton>
        </div>
      </div>

      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-widest ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
        <span>Scroll to explore</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </motion.section>
  );
};

const Section2 = ({ scrollYProgress, isDark }) => {
  const navigate = useNavigate();
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [4, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className={`relative min-h-screen p-6 md:p-12 lg:p-20 flex flex-col justify-center rounded-t-3xl z-20 transition-colors duration-300 ${
        isDark ? "bg-neutral-950 text-white border-t border-white/15" : "bg-[#eceae3] text-[#191b1e] border-t border-black/15"
      }`}
    >
      <div
        className={`absolute inset-0 bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none ${
          isDark
            ? "bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]"
            : "bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)]"
        }`}
      />

      <article className="max-w-7xl mx-auto w-full relative z-10">
        <span className={`text-xs uppercase tracking-widest font-mono ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
          Selected Practice
        </span>
        <h2 className="text-4xl md:text-6xl leading-tight font-semibold tracking-tight py-6 max-w-3xl">
          Visual Identity &amp; High-Performance Engineering
        </h2>
        <p className={`text-lg max-w-2xl mb-12 leading-relaxed font-light ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
          Bringing visual identity and frontend engineering into one process—so every interaction, motion detail, and component feels unified.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <CyberpunkCard
            theme="monochrome"
            isDark={isDark}
            borderStyle="corners"
            backgroundEffect="circuit"
            rounded="lg"
            glow={true}
            className="group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="overflow-hidden rounded-xl bg-neutral-900/40">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop"
                alt="Design System"
                className="object-cover w-full h-44 rounded-xl grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <h3 className={`font-semibold text-base md:text-lg tracking-tight ${isDark ? "text-white" : "text-black"}`}>
                Interactive Systems
              </h3>
              <p className={`text-xs leading-relaxed font-normal ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                Design token architectures &amp; animations
              </p>
            </div>
          </CyberpunkCard>

          <CyberpunkCard
            theme="monochrome"
            isDark={isDark}
            borderStyle="corners"
            backgroundEffect="matrix"
            rounded="lg"
            glow={true}
            className="group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="overflow-hidden rounded-xl bg-neutral-900/40">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop"
                alt="Creative Coding"
                className="object-cover w-full h-44 rounded-xl grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <h3 className={`font-semibold text-base md:text-lg tracking-tight ${isDark ? "text-white" : "text-black"}`}>
                Creative Coding
              </h3>
              <p className={`text-xs leading-relaxed font-normal ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                WebGL, Canvas ASCII &amp; Shader effects
              </p>
            </div>
          </CyberpunkCard>

          <CyberpunkCard
            theme="monochrome"
            isDark={isDark}
            borderStyle="corners"
            backgroundEffect="circuit"
            rounded="lg"
            glow={true}
            className="group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="overflow-hidden rounded-xl bg-neutral-900/40">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop"
                alt="Motion Graphics"
                className="object-cover w-full h-44 rounded-xl grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <h3 className={`font-semibold text-base md:text-lg tracking-tight ${isDark ? "text-white" : "text-black"}`}>
                Kinetic Micro-Interactions
              </h3>
              <p className={`text-xs leading-relaxed font-normal ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                GSAP timelines &amp; Framer Motion physics
              </p>
            </div>
          </CyberpunkCard>

          <CyberpunkCard
            theme="monochrome"
            isDark={isDark}
            borderStyle="corners"
            backgroundEffect="scanlines"
            rounded="lg"
            glow={true}
            className="group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="overflow-hidden rounded-xl bg-neutral-900/40">
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop"
                alt="Full Stack Applications"
                className="object-cover w-full h-44 rounded-xl grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <h3 className={`font-semibold text-base md:text-lg tracking-tight ${isDark ? "text-white" : "text-black"}`}>
                Full-Stack Craft
              </h3>
              <p className={`text-xs leading-relaxed font-normal ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                React, Next, Firebase &amp; Tailwind
              </p>
            </div>
          </CyberpunkCard>
        </div>

        <div className="mt-14">
          <LiquidMetalButton
            size="md"
            icon="↗"
            onClick={() => navigate('/about')}
          >
            More about the practice
          </LiquidMetalButton>
        </div>
      </article>
    </motion.section>
  );
};

export const HeroScrollAnimation = forwardRef((props, ref) => {
  const { data } = usePortfolio();
  const themeState = useTheme();
  const isDark = themeState?.isDark ?? true;

  const rawName = data?.hero?.name;
  const name = rawName && !rawName.startsWith('[') ? rawName : 'SOLKINGS';
  const rawTitle = data?.hero?.title;
  const title = rawTitle && !rawTitle.startsWith('[')
    ? rawTitle
    : 'Independent designer and frontend developer creating expressive digital experiences.';

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container} style={{ position: 'relative' }} className={`relative h-[200vh] transition-colors duration-300 ${isDark ? "bg-black" : "bg-[#f4f3ef]"}`}>
      <Section1 scrollYProgress={scrollYProgress} name={name} title={title} isDark={isDark} />
      <Section2 scrollYProgress={scrollYProgress} isDark={isDark} />
    </main>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
