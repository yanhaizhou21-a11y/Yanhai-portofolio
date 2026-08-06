'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import gsap from "gsap";

if (typeof window !== "undefined") {
  try {
    import("gsap/MorphSVGPlugin").then((plugin) => {
      if (plugin && plugin.MorphSVGPlugin) {
        gsap.registerPlugin(plugin.MorphSVGPlugin);
      }
    }).catch(() => {});
  } catch (_) {}
}

const MorphingIcon = ({ type, isActive, onClick, onMouseEnter }) => {
  const buttonRef = useRef(null);
  const pathRef = useRef(null);

  const safeMorph = (path, targetPath, options = {}) => {
    if (!path) return;
    try {
      gsap.to(path, {
        morphSVG: targetPath,
        ...options,
      });
    } catch (_) {
      // Fallback scale/rotate effect if MorphSVGPlugin is not loaded
      gsap.to(path, { scale: 1.1, transformOrigin: "center", duration: 0.2, yoyo: true, repeat: 1 });
    }
  };

  const animateHome = () => {
    if (!buttonRef.current || !pathRef.current) return;
    const button = buttonRef.current;
    const path = pathRef.current;

    gsap.to(button, {
      "--tab-bar-home-scale": 0.25,
      "--tab-bar-home-opacity": 0,
      duration: 0.1,
      onComplete: () => {
        safeMorph(path, "M21 18V10.5339C21 9.57062 20.5374 8.66591 19.7565 8.1019L13.7565 3.76856C12.7079 3.01128 11.2921 3.01128 10.2435 3.76856L4.24353 8.1019C3.46259 8.66591 3 9.57062 3 10.5339V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18Z", {
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            gsap.to(button, { "--tab-bar-home-scale": 0.7, duration: 0.5 });
            gsap.to(button, { "--tab-bar-home-opacity": 1, duration: 0.2 });
          },
        });
      },
    });
  };

  const animateBlog = () => {
    if (!buttonRef.current || !pathRef.current) return;
    const button = buttonRef.current;
    const path = pathRef.current;

    gsap.to(button, {
      "--tab-bar-blog-scale": 0.25,
      "--tab-bar-blog-opacity": 0,
      duration: 0.1,
      onComplete: () => {
        safeMorph(path, "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z", {
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            gsap.to(button, { "--tab-bar-blog-scale": 0.7, duration: 0.5 });
            gsap.to(button, { "--tab-bar-blog-opacity": 1, duration: 0.2 });
          }
        });
      }
    });
  };

  const animateMarker = () => {
    if (!buttonRef.current || !pathRef.current) return;
    const button = buttonRef.current;
    const path = pathRef.current;
    gsap.to(button, {
      "--tab-bar-marker-scale": 0.25, "--tab-bar-marker-opacity": 0, duration: 0.1, onComplete: () => {
        safeMorph(path, "M12 21C12 21 14.6062 18.8589 16.64 16C17.941 14.1711 19 12.0475 19 10C19 6.134 15.87 3 12 3C8.13 3 5 6.134 5 10C5 12.0475 6.05896 14.1711 7.36 16C9.39381 18.8589 12 21 12 21Z", {
          duration: 0.5, ease: "power2.out",
          onStart: () => {
            gsap.to(button, { "--tab-bar-marker-scale": 0.7, duration: 0.5 });
            gsap.to(button, { "--tab-bar-marker-opacity": 1, duration: 0.2 });
          }
        });
      }
    });
  };

  const animateEmail = () => {
    if (!buttonRef.current || !pathRef.current) return;
    const button = buttonRef.current;
    const path = pathRef.current;
    gsap.to(button, {
      "--tab-bar-email-scale": 0.25, "--tab-bar-email-opacity": 0, duration: 0.1, onComplete: () => {
        safeMorph(path, "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z", {
          duration: 0.5, ease: "power2.out",
          onStart: () => {
            gsap.to(button, { "--tab-bar-email-scale": 0.7, duration: 0.5 });
            gsap.to(button, { "--tab-bar-email-opacity": 1, duration: 0.2 });
          }
        });
      }
    });
  };

  const animateLinkedIn = () => {
    if (!buttonRef.current || !pathRef.current) return;
    const button = buttonRef.current;
    const path = pathRef.current;
    gsap.to(button, {
      "--tab-bar-linkedin-scale": 0.25, "--tab-bar-linkedin-opacity": 0, duration: 0.1, onComplete: () => {
        safeMorph(path, "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", {
          duration: 0.5, ease: "power2.out",
          onStart: () => {
            gsap.to(button, { "--tab-bar-linkedin-scale": 0.7, duration: 0.5 });
            gsap.to(button, { "--tab-bar-linkedin-opacity": 1, duration: 0.2 });
          }
        });
      }
    });
  };

  const animateX = () => {
    if (!buttonRef.current || !pathRef.current) return;
    const button = buttonRef.current;
    const path = pathRef.current;

    gsap.to(button, {
      "--tab-bar-x-scale": 0.25,
      "--tab-bar-x-opacity": 0,
      duration: 0.1,
      onComplete: () => {
        safeMorph(path, "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z", {
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            gsap.to(button, { "--tab-bar-x-scale": 0.7, duration: 0.5 });
            gsap.to(button, { "--tab-bar-x-opacity": 1, duration: 0.2 });
          }
        });
      }
    });
  };

  const animateGithub = () => {
    if (!buttonRef.current || !pathRef.current) return;
    const button = buttonRef.current;
    const path = pathRef.current;

    gsap.to(button, {
      "--tab-bar-github-scale": 0.25,
      "--tab-bar-github-opacity": 0,
      duration: 0.1,
      onComplete: () => {
        safeMorph(path, "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", {
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            gsap.to(button, { "--tab-bar-github-scale": 0.7, duration: 0.5 });
            gsap.to(button, { "--tab-bar-github-opacity": 1, duration: 0.2 });
          },
        });
      },
    });
  };

  const handleMouseEnter = () => {
    onMouseEnter && onMouseEnter();
    if (type === 'home') animateHome();
    else if (type === 'blog' || type === 'projects') animateBlog();
    else if (type === 'marker' || type === 'about') animateMarker();
    else if (type === 'email' || type === 'contact') animateEmail();
    else if (type === 'linkedin') animateLinkedIn();
    else if (type === 'x') animateX();
    else if (type === 'github') animateGithub();
  };

  const btnClass = cn(
    "flex items-center justify-center p-2 rounded-xl transition-all duration-200 w-9 h-9",
    isActive ? "text-white bg-white/20" : "text-neutral-400 hover:text-white hover:bg-white/10"
  );

  if (type === 'home') {
    return (
      <button ref={buttonRef} onClick={onClick} onMouseEnter={handleMouseEnter} className={btnClass} aria-label="Home">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path ref={pathRef} d="M3 18V10.5339C3 9.57062 3.46259 8.66591 4.24353 8.1019L10.2435 3.76856C11.2921 3.01128 12.7079 3.01128 13.7565 3.76856L19.7565 8.1019C20.5374 8.66591 21 9.57062 21 10.5339V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18Z" />
        </svg>
      </button>
    );
  }
  if (type === 'blog' || type === 'projects') {
    return (
      <button ref={buttonRef} onClick={onClick} onMouseEnter={handleMouseEnter} className={btnClass} aria-label="Projects">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path ref={pathRef} d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      </button>
    );
  }
  if (type === 'marker' || type === 'about') {
    return (
      <button ref={buttonRef} onClick={onClick} onMouseEnter={handleMouseEnter} className={btnClass} aria-label="About">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path ref={pathRef} d="M12 21C12 21 9.39536 18.8605 7.3637 16C6.06474 14.1711 5 12.0475 5 10C5 6.134 8.134 3 12 3C15.866 3 19 6.134 19 10C19 12.0475 17.9353 14.1711 16.6363 16C14.6046 18.8605 12 21 12 21Z" />
        </svg>
      </button>
    );
  }
  if (type === 'email' || type === 'contact') {
    return (
      <button ref={buttonRef} onClick={onClick} onMouseEnter={handleMouseEnter} className={btnClass} aria-label="Contact">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path ref={pathRef} d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </button>
    );
  }
  if (type === 'linkedin') {
    return (
      <button ref={buttonRef} onClick={onClick} onMouseEnter={handleMouseEnter} className={btnClass} aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path ref={pathRef} d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </button>
    );
  }
  if (type === 'x') {
    return (
      <button ref={buttonRef} onClick={onClick} onMouseEnter={handleMouseEnter} className={btnClass} aria-label="X">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path ref={pathRef} d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      </button>
    );
  }
  if (type === 'github') {
    return (
      <button ref={buttonRef} onClick={onClick} onMouseEnter={handleMouseEnter} className={btnClass} aria-label="GitHub">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path ref={pathRef} d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </button>
    );
  }
  return null;
};

export const GlassDock = React.forwardRef(
  (
    {
      items,
      className,
      dockClassName,
      tooltipPosition = "bottom", // "bottom" for top navbar placement, "top" for bottom dock placement
      ...props
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [direction, setDirection] = useState(0);

    const handleMouseEnter = (index) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);
    };

    const getTooltipX = (index) => {
      // Calculate smooth X displacement based on item index (each item ~44px + 12px gap)
      return index * 52 + 16;
    };

    const isTopPlacement = tooltipPosition === "bottom";

    return (
      <div
        ref={ref}
        className={cn('w-max relative', className)}
        {...props}
      >
        <div
          className={cn(
            "glass-dock relative flex gap-3 items-center px-4 py-2.5 rounded-full",
            "bg-black/70 text-white border border-white/15",
            "backdrop-blur-xl shadow-2xl justify-center",
            dockClassName
          )}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          <AnimatePresence>
            {hoveredIndex !== null && items[hoveredIndex] && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: isTopPlacement ? -10 : 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: isTopPlacement ? 48 : -52,
                  x: getTooltipX(hoveredIndex),
                }}
                exit={{ opacity: 0, scale: 0.9, y: isTopPlacement ? -10 : 10 }}
                transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                className="absolute top-0 left-0 pointer-events-none z-30"
              >
                <div
                  className={cn(
                    'px-3.5 py-1.5 rounded-full',
                    'bg-white text-black dark:bg-white dark:text-black',
                    'shadow-lg flex items-center justify-center border border-white/20',
                    'min-w-[70px]'
                  )}
                >
                  <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.span
                        key={items[hoveredIndex].title}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? 30 : -30,
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          x: direction > 0 ? -30 : 30,
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        transition={{
                          duration: 0.25,
                          ease: 'easeOut',
                        }}
                        className="text-[12px] font-semibold tracking-wide whitespace-nowrap uppercase"
                      >
                        {items[hoveredIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {items.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;
            const isActive = isHovered;

            const handleClick = () => {
              if (el.onClick) {
                el.onClick();
              } else if (el.href) {
                window.location.href = el.href;
              }
            };

            const type = el.title.toLowerCase();
            const isAnimated = ['home', 'blog', 'projects', 'marker', 'about', 'email', 'contact', 'linkedin', 'x', 'github'].includes(type);

            return (
              <div
                key={el.title}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={handleClick}
                className="relative flex items-center justify-center cursor-pointer select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                  }
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                    y: isHovered ? (isTopPlacement ? 2 : -2) : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                >
                  {isAnimated ? (
                    <MorphingIcon
                      type={type}
                      isActive={isActive}
                      onClick={handleClick}
                      onMouseEnter={() => {}}
                    />
                  ) : typeof Icon === 'string' ? (
                    <span className="text-sm font-semibold">{Icon}</span>
                  ) : Icon ? (
                    <Icon
                      className={cn(
                        'h-5 w-5 transition-colors duration-200',
                        isHovered ? 'text-white' : 'text-neutral-400'
                      )}
                    />
                  ) : (
                    <span className="text-sm font-medium">{el.title}</span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassDock.displayName = 'GlassDock';
export default GlassDock;
