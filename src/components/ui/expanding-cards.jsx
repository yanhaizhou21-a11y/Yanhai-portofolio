'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export const ExpandingCards = React.forwardRef(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const media = window.matchMedia('(min-width: 768px)');
      const syncLayout = () => setIsDesktop(media.matches);
      syncLayout();
      media.addEventListener('change', syncLayout);
      return () => media.removeEventListener('change', syncLayout);
    }, []);

    const tracks = items
      .map((_, index) => (index === activeIndex ? '5fr' : '1fr'))
      .join(' ');

    return (
      <ul
        ref={ref}
        className={cn(
          'grid h-[620px] w-full gap-2 transition-[grid-template-columns,grid-template-rows] duration-500 ease-out md:h-[500px]',
          className,
        )}
        style={isDesktop
          ? { gridTemplateColumns: tracks, gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr', gridTemplateRows: tracks }}
        {...props}
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <li
              key={item.id || index}
              className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-xl border border-white/15 bg-neutral-900 text-white shadow-sm outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
              tabIndex={0}
              aria-expanded={isActive}
              data-active={isActive}
            >
              <img
                src={item.imgSrc}
                alt=""
                className="absolute inset-0 h-full w-full scale-110 object-cover grayscale transition-[filter,transform] duration-500 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

              <article className="absolute inset-0 z-10 flex flex-col justify-end p-4 md:p-5">
                <h3
                  aria-hidden={isActive}
                  className="absolute bottom-5 left-1/2 hidden origin-left -rotate-90 whitespace-nowrap text-sm font-light uppercase tracking-[0.08em] text-white/75 opacity-100 transition-opacity duration-200 md:block group-data-[active=true]:opacity-0"
                >
                  {item.title}
                </h3>

                <div className="translate-y-3 opacity-0 transition-[opacity,transform] duration-300 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
                  <div className="mb-3 text-white/90">{item.icon}</div>
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">{item.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{item.description}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    );
  },
);

ExpandingCards.displayName = 'ExpandingCards';
export default ExpandingCards;
