'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Carousel_001({
  images = [],
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = false,
  autoplayDelay = 3500,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dim, setDim] = useState({ width: 440, height: 400, step: 300 });
  const count = images.length;

  useEffect(() => {
    const updateDim = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDim({ width: Math.min(280, Math.floor(w * 0.76)), height: 270, step: 160 });
      } else if (w < 1024) {
        setDim({ width: 360, height: 330, step: 230 });
      } else {
        setDim({ width: 440, height: 400, step: 300 });
      }
    };
    updateDim();
    window.addEventListener('resize', updateDim);
    return () => window.removeEventListener('resize', updateDim);
  }, []);

  const next = useCallback(() => {
    if (count === 0) return;
    setCurrentIndex((prev) => (loop ? (prev + 1) % count : Math.min(prev + 1, count - 1)));
  }, [count, loop]);

  const prev = useCallback(() => {
    if (count === 0) return;
    setCurrentIndex((prev) => (loop ? (prev - 1 + count) % count : Math.max(prev - 1, 0)));
  }, [count, loop]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isHovered || count <= 1) return undefined;
    const timer = setInterval(next, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, isHovered, count, autoplayDelay, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  if (!count) return null;

  // Calculate numeric position & styles for each slide
  const getSlideStyle = (index) => {
    let offset = index - currentIndex;
    if (loop) {
      if (offset > count / 2) offset -= count;
      if (offset < -count / 2) offset += count;
    }

    const isCenter = offset === 0;
    const isVisible = Math.abs(offset) <= 2;

    let x = 0;
    let scale = 1;
    let rotateY = 0;
    let opacity = 0;
    let zIndex = 0;

    if (isCenter) {
      x = 0;
      scale = 1;
      rotateY = 0;
      opacity = 1;
      zIndex = 20;
    } else if (offset === 1) {
      x = dim.step;
      scale = 0.85;
      rotateY = -14;
      opacity = 0.75;
      zIndex = 10;
    } else if (offset === -1) {
      x = -dim.step;
      scale = 0.85;
      rotateY = 14;
      opacity = 0.75;
      zIndex = 10;
    } else if (offset === 2) {
      x = dim.step * 1.85;
      scale = 0.7;
      rotateY = -22;
      opacity = 0.4;
      zIndex = 5;
    } else if (offset === -2) {
      x = -dim.step * 1.85;
      scale = 0.7;
      rotateY = 22;
      opacity = 0.4;
      zIndex = 5;
    } else {
      x = offset > 0 ? dim.step * 2.5 : -dim.step * 2.5;
      scale = 0.5;
      rotateY = offset > 0 ? -30 : 30;
      opacity = 0;
      zIndex = 0;
    }

    return { x, scale, rotateY, opacity, zIndex, isCenter, isVisible };
  };

  return (
    <div
      className={cn('relative w-full flex flex-col items-center justify-center select-none', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Perspective Stage centered in viewport */}
      <div
        className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {images.map((image, index) => {
          const { x, scale, rotateY, opacity, zIndex, isCenter, isVisible } = getSlideStyle(index);

          return (
            <motion.div
              key={image.id || image.src || index}
              className="absolute overflow-hidden rounded-2xl md:rounded-3xl border border-black/10 dark:border-white/15 bg-neutral-900 shadow-2xl cursor-grab active:cursor-grabbing select-none"
              style={{
                width: dim.width,
                height: dim.height,
                left: '50%',
                top: '50%',
                marginLeft: -dim.width / 2,
                marginTop: -dim.height / 2,
                transformStyle: 'preserve-3d',
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              initial={false}
              animate={{
                x,
                scale,
                rotateY,
                opacity,
                zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, info) => {
                if (info.offset.x < -35 || info.velocity.x < -250) {
                  next();
                } else if (info.offset.x > 35 || info.velocity.x > 250) {
                  prev();
                }
              }}
              onClick={() => {
                if (!isCenter) setCurrentIndex(index);
              }}
            >
              <img
                src={image.src}
                alt={image.alt || `Slide ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
              />
              {!isCenter && (
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 pointer-events-none" />
              )}
            </motion.div>
          );
        })}

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 size-10 sm:size-12 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 grid place-items-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
            >
              <ChevronLeftIcon className="size-5 sm:size-6" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 size-10 sm:size-12 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 grid place-items-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
            >
              <ChevronRightIcon className="size-5 sm:size-6" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {showPagination && count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2 z-30">
          {images.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300 cursor-pointer',
                  isActive
                    ? 'w-6 bg-black dark:bg-white'
                    : 'w-2 bg-neutral-400/50 hover:bg-neutral-400'
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export const Carousel001 = Carousel_001;
export const Skiper47 = Carousel_001;
export default Carousel_001;
