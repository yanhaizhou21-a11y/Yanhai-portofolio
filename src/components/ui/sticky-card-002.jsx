'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function StickyCard002({ cards, className, containerClassName, imageClassName }) {
  const container = useRef(null);
  const imageRefs = useRef([]);

  useLayoutEffect(() => {
    const images = imageRefs.current.filter(Boolean);
    if (!container.current || !images.length) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      gsap.set(images, { yPercent: 100, scale: 1, rotation: 0 });
      gsap.set(images[0], { yPercent: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * (images.length - 1)}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      images.slice(0, -1).forEach((image, index) => {
        timeline
          .to(image, {
            scale: reduceMotion ? 0.94 : 0.72,
            rotation: reduceMotion ? 0 : index % 2 ? -4 : 4,
            duration: 1,
            ease: 'none',
          }, index)
          .to(images[index + 1], { yPercent: 0, duration: 1, ease: 'none' }, index);
      });
    }, container);

    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(container.current);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, [cards.length]);

  return (
    <section ref={container} className={cn('relative h-svh w-full', className)} aria-label="Selected visual work">
      <div className="flex h-svh w-full items-center justify-center overflow-hidden p-4 md:p-8">
        <div className={cn('relative h-[76svh] w-full max-w-5xl overflow-hidden rounded-[28px]', containerClassName)}>
          {cards.map((card, index) => (
            <img
              key={card.id}
              ref={(element) => { imageRefs.current[index] = element; }}
              src={card.image}
              alt={card.alt || ''}
              className={cn('absolute inset-0 h-full w-full will-change-transform rounded-[28px] object-cover', imageClassName)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StickyCard002;
