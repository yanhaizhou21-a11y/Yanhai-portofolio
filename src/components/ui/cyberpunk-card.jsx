"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const MatrixRain = ({ isDark = true }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const matrixChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const createColumn = (x) => ({
      id: Math.random(),
      x,
      speed: Math.random() * 2.5 + 1,
      height: Math.floor(Math.random() * 12) + 4,
      characters: Array.from(
        { length: Math.floor(Math.random() * 12) + 4 },
        (_, i) => ({
          char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
          opacity: Math.max(0, 1 - i * 0.15),
          isLeading: i === 0,
        })
      ),
    });

    const initialColumns = Array.from({ length: 12 }, (_, i) =>
      createColumn(i * 8.33 + Math.random() * 2)
    );
    setColumns(initialColumns);

    const interval = setInterval(() => {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          const updatedCharacters = column.characters.map((char, i) => ({
            ...char,
            char:
              Math.random() < 0.1
                ? matrixChars[Math.floor(Math.random() * matrixChars.length)]
                : char.char,
            opacity: Math.max(0, 1 - i * 0.14),
          }));

          return {
            ...column,
            characters: updatedCharacters,
            speed: column.speed + 0.08,
          };
        })
      );
    }, 100);

    const resetInterval = setInterval(() => {
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.speed > 45 ? createColumn(column.x) : column
        )
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(resetInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 font-mono text-xs pointer-events-none overflow-hidden opacity-20">
      {columns.map((column) => (
        <div
          key={column.id}
          className="absolute top-0 flex flex-col"
          style={{
            left: `${column.x}%`,
            transform: `translateY(${((column.speed * 2) % 120) - 20}%)`,
          }}
        >
          {column.characters.map((char, charIndex) => (
            <div
              key={charIndex}
              className={cn(
                "leading-tight transition-all duration-100",
                char.isLeading
                  ? isDark ? "text-white font-bold" : "text-black font-bold"
                  : isDark ? "text-neutral-400" : "text-neutral-600"
              )}
              style={{
                opacity: char.opacity,
                fontSize: char.isLeading ? "0.85rem" : "0.72rem",
              }}
            >
              {char.char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const CyberpunkCard = ({
  theme = "monochrome",
  customColors,
  borderStyle = "solid",
  colorShift = false,
  lightTrail = true,
  rounded = "lg",
  glow = true,
  glowIntensity = 3,
  backgroundEffect = "none",
  pulseAnimation = false,
  glitchEffect = false,
  hologramFlicker = false,
  dataStream = false,
  loading = false,
  animationSpeed = "normal",
  isDark = true,
  className,
  children,
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [colorPhase, setColorPhase] = useState(0);
  const [glitchPhase, setGlitchPhase] = useState(0);
  const [particles, setParticles] = useState([]);

  const speedMultiplier = {
    slow: 0.5,
    normal: 1,
    fast: 2,
  }[animationSpeed];

  useEffect(() => {
    if (!colorShift && !glitchEffect) return;

    const interval = setInterval(() => {
      if (colorShift) {
        setColorPhase((prev) => (prev + 1 * speedMultiplier) % 100);
      }
      if (glitchEffect && isHovered) {
        setGlitchPhase((prev) => (prev + 1) % 10);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [colorShift, glitchEffect, isHovered, speedMultiplier]);

  useEffect(() => {
    if (backgroundEffect === "particles" && isHovered) {
      const interval = setInterval(() => {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: 1,
        };
        setParticles((prev) => [...prev.slice(-20), newParticle]);

        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 2000);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [backgroundEffect, isHovered]);

  const handleMouseMove = (e) => {
    if (!lightTrail) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setParticles([]);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  const themeColors = {
    monochrome: isDark
      ? {
          primary: "from-neutral-900 via-neutral-950 to-black",
          secondary: "from-neutral-800 via-neutral-900 to-neutral-950",
          accent: "bg-white",
          text: "text-white",
          glow: "shadow-black/80",
          border: "border-neutral-700/80 hover:border-neutral-400",
          cornerAccent: "bg-neutral-800",
        }
      : {
          primary: "from-white via-neutral-50 to-neutral-100",
          secondary: "from-neutral-100 via-neutral-200 to-neutral-300",
          accent: "bg-black",
          text: "text-black",
          glow: "shadow-neutral-400/20",
          border: "border-neutral-300 hover:border-neutral-600",
          cornerAccent: "bg-neutral-300",
        },
    custom: {
      primary: "",
      secondary: "",
      accent: "",
      text: isDark ? "text-white" : "text-black",
      glow: "",
      border: "",
      cornerAccent: "bg-neutral-500",
    },
  };

  const currentTheme = themeColors[theme] || themeColors.monochrome;

  const customStyles =
    theme === "custom" && customColors
      ? {
          background: `linear-gradient(to bottom right, ${customColors.primary}, ${customColors.secondary})`,
          borderColor: customColors.accent,
          boxShadow: glow
            ? `0 20px 25px -5px ${customColors.primary}50, 0 10px 10px -5px ${customColors.primary}40`
            : undefined,
        }
      : {};

  const borderStyles = {
    solid: "border-2",
    dashed: "border-2 border-dashed",
    glitch: `border-2 ${glitchPhase % 3 === 0 ? "border-dashed" : glitchPhase % 3 === 1 ? "border-dotted" : "border-solid"}`,
    corners:
      "border-0 before:content-[''] before:absolute before:w-8 before:h-8 before:border-t-2 before:border-l-2 before:top-0 before:left-0 after:content-[''] after:absolute after:w-8 after:h-8 after:border-b-2 after:border-r-2 after:bottom-0 after:right-0",
    animated:
      "border-2 before:content-[''] before:absolute before:inset-0 before:border-2 before:border-current before:animate-pulse before:rounded-[inherit] before:pointer-events-none",
    circuit:
      "border-2 border-dashed before:content-[''] before:absolute before:inset-0 before:border-2 before:border-dotted before:border-current before:animate-ping before:rounded-[inherit] before:pointer-events-none before:opacity-75",
  };

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-2xl",
  };

  const glowIntensityStyles = {
    1: "shadow-md",
    2: "shadow-lg",
    3: "shadow-xl",
    4: "shadow-2xl",
    5: "shadow-2xl drop-shadow-2xl",
  };

  const getBackgroundPattern = () => {
    const patternColor =
      theme === "custom" && customColors
        ? customColors.accent
        : isDark ? "#ffffff" : "#000000";

    switch (backgroundEffect) {
      case "circuit":
        return (
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern
                  id="circuit"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10,0 L 10,10 L 0,10"
                    stroke={patternColor}
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <circle cx="10" cy="10" r="1" fill={patternColor} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>
        );
      case "matrix":
        return <MatrixRain isDark={isDark} />;
      case "scanlines":
        return (
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div
              className="w-full h-full bg-gradient-to-b from-transparent via-current to-transparent bg-[length:100%_4px] animate-pulse"
              style={{ color: patternColor }}
            />
          </div>
        );
      case "waves":
        return (
          <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent animate-pulse transform -skew-x-12"
              style={{ color: patternColor }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "relative p-6 border transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-md flex flex-col justify-between h-full",
        theme !== "custom" && `bg-gradient-to-br ${currentTheme.primary}`,
        borderStyles[borderStyle],
        roundedStyles[rounded],
        theme !== "custom" && currentTheme.border,
        theme !== "custom" && glow && glowIntensityStyles[glowIntensity],
        theme !== "custom" && glow && currentTheme.glow,
        currentTheme.text,
        pulseAnimation && "before:animate-pulse",
        hologramFlicker && isHovered && "animate-pulse",
        isClicked && "scale-95",
        glitchEffect &&
          isHovered &&
          glitchPhase % 5 === 0 &&
          "transform skew-x-1",
        "transform-gpu",
        className
      )}
      style={{
        ...customStyles,
        borderColor:
          colorShift && isHovered
            ? isDark ? "#ffffff" : "#000000"
            : theme === "custom" && customColors
              ? customColors.accent
              : undefined,
        filter:
          hologramFlicker && isHovered
            ? `hue-rotate(${colorPhase * 3.6}deg)`
            : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {getBackgroundPattern()}

      {/* Particles Effect */}
      {backgroundEffect === "particles" &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full animate-ping pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              backgroundColor:
                theme === "custom" && customColors
                  ? customColors.accent
                  : isDark ? "#ffffff" : "#000000",
            }}
          />
        ))}

      {/* Light Trail */}
      {lightTrail && isHovered && (
        <div
          className="absolute w-36 h-36 rounded-full blur-xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 72,
            top: mousePosition.y - 72,
            opacity: isDark ? 0.3 : 0.15,
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 70%)",
          }}
        />
      )}

      {dataStream && (
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent animate-pulse pointer-events-none"
          style={{
            color:
              theme === "custom" && customColors
                ? customColors.accent
                : isDark ? "#ffffff" : "#000000",
          }}
        />
      )}

      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-bounce"
                style={{
                  backgroundColor:
                    theme === "custom" && customColors
                      ? customColors.accent
                      : "currentColor",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={cn(
          "relative z-10 flex flex-col justify-between h-full transition-all duration-300",
          glitchEffect &&
            isHovered &&
            glitchPhase % 7 === 0 &&
            "transform translate-x-1"
        )}
      >
        {children}
      </div>

      {/* NyxUI Cyberpunk Corner Cut Accent (Low opacity, non-blocking) */}
      <div
        className={cn(
          "absolute -bottom-3 -right-3 w-10 h-10 transform rotate-45 opacity-30 transition-all duration-300 pointer-events-none z-0",
          theme !== "custom" && currentTheme.cornerAccent
        )}
        style={{
          backgroundColor:
            theme === "custom" && customColors
              ? customColors.accent
              : undefined,
        }}
      />

      {/* NyxUI Corner Bracket Accents */}
      <div
        className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 opacity-50 pointer-events-none"
        style={{
          borderColor:
            theme === "custom" && customColors
              ? customColors.accent
              : "currentColor",
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 opacity-50 pointer-events-none"
        style={{
          borderColor:
            theme === "custom" && customColors
              ? customColors.accent
              : "currentColor",
        }}
      />

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default CyberpunkCard;
