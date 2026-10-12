import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';

/**
 * Shared base classes for carousel cards.
 * Position / rotation is controlled inline by the carousel (see getCardStyle),
 * so no translate-based hover is used here.
 * Width: 200px mobile / 300px desktop.
 * Border color = indigo-500 (same as "Apps with React & Next.js" in Hero).
 */
const CARD_BASE =
  'absolute top-0 left-1/2 h-full w-[200px] sm:w-[300px] ' +
  'bg-slate-900/90 rounded-3xl px-6 pt-5 pb-6 text-left shadow-xl ' +
  'flex flex-col justify-start ' +
  'hover:shadow-2xl hover:shadow-indigo-500/20 ' +
  'overflow-hidden group will-change-transform ' +
  'transition-[transform,opacity,filter,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]';

const AUTO_PLAY_MS = 3500;

// Elegant italic serif numerals, solid indigo (same as Hero "React & Next.js" color)
const NUMBER_STYLE = {
  color: '#6366f1',
  fontFamily: "'Playfair Display', 'Bodoni Moda', Didot, 'Bodoni MT', Georgia, serif",
  fontStyle: 'italic',
  fontWeight: 500,
};

/**
 * Returns the inline 3D style for a card based on its position
 * relative to the active card (0 = center, -1 = left, 1 = right, 2 = hidden behind).
 */
function getCardStyle(offset) {
  if (offset === 0) {
    return {
      transform: 'translateX(-50%) translateX(0) translateZ(0) rotateY(0deg) scale(1)',
      opacity: 1,
      zIndex: 30,
      filter: 'none',
    };
  }
  if (offset === -1 || offset === 1) {
    const dir = offset;
    return {
      transform: `translateX(-50%) translateX(${dir * 64}%) translateZ(-160px) rotateY(${-dir * 30}deg) scale(0.86)`,
      opacity: 0.5,
      zIndex: 20,
      filter: 'brightness(0.7)',
    };
  }
  // Card sitting behind the center one
  return {
    transform: 'translateX(-50%) translateX(0) translateZ(-300px) rotateY(0deg) scale(0.7)',
    opacity: 0,
    zIndex: 10,
    filter: 'brightness(0.5)',
  };
}

// Splits a text in half by words: first half white, second half indigo
function splitHeading(text) {
  const words = String(text).trim().split(/\s+/);
  if (words.length < 2) return { primary: '', accent: text };
  const mid = Math.ceil(words.length / 2);
  return { primary: words.slice(0, mid).join(' '), accent: words.slice(mid).join(' ') };
}

/* ------------------------------------------------------------------ */
/* One card's content (same layout for every card)                     */
/* ------------------------------------------------------------------ */
function CardContent({ number, primary, accent, label, points }) {
  return (
    <>
      {/* Ambient hover glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/0 group-hover:bg-indigo-500/10 rounded-full blur-2xl transition-all duration-300 pointer-events-none" />

      {/* Top row: number (where the icon used to be) */}
      <div className="relative flex items-center justify-start mb-6">
        <span className="text-5xl leading-none pr-2" style={NUMBER_STYLE}>
          {number}
        </span>
      </div>

      {/* Heading: first part white, second part indigo */}
      <h3 className="relative text-xl font-bold leading-snug">
        {primary && <span className="text-white">{primary}</span>}
        {primary && ' '}
        <span className="text-indigo-500">{accent}</span>
      </h3>

      {/* Label sits below the heading */}
      <span className="relative mt-3 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-500">
        {label}
      </span>

      {/* Short points */}
      <ul className="relative mt-5 space-y-3.5">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-snug">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function About() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  const degree = splitHeading(portfolioData.education.degree);

  const cards = [
    {
      key: 'experience',
      primary: 'Frontend',
      accent: 'Experience',
      label: 'Production Engineering',
      points: [
        '1+ Year at Devstrix',
        'Built 3 high-impact platforms',
        'React, Next.js & Tailwind CSS',
      ],
    },
    {
      key: 'architecture',
      primary: 'Platform',
      accent: 'Architecture',
      label: 'Core Focus',
      points: [
        'BookNow.co (Hotel Booking UI)',
        'Travelnext (Modular Ops Suite)',
        'Operations CRM (Webcam & Timers)',
      ],
    },
    {
      key: 'academic',
      primary: degree.primary,
      accent: degree.accent,
      label: 'Academic Foundation',
      points: [portfolioData.education.institution, portfolioData.education.gpa],
    },
    {
      key: 'philosophy',
      primary: 'Pixel-Perfect •',
      accent: '120 FPS Fluidity',
      label: 'Engineering Philosophy',
      points: [
        'Predictable state flows with Redux & Context API, zero CSS bloat',
        '100% Client-Side',
      ],
    },
  ];

  const total = cards.length;

  // Infinite auto-rotation: only runs when section is visible in viewport
  useEffect(() => {
    const el = sectionRef.current;
    let timerId = null;

    const startTimer = () => {
      if (!timerId) {
        timerId = setInterval(() => {
          setActive((prev) => (prev + 1) % total);
        }, AUTO_PLAY_MS);
      }
    };

    const stopTimer = () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };

    if (!el || !('IntersectionObserver' in window)) {
      startTimer();
      return () => stopTimer();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTimer();
        } else {
          stopTimer();
        }
      },
      { threshold: 0.1 }
    );

    io.observe(el);

    return () => {
      stopTimer();
      io.disconnect();
    };
  }, [total]);

  // Position of card i relative to the active card: -1, 0, 1 or 2
  const getOffset = (i) => {
    let offset = (((i - active) % total) + total) % total;
    if (offset > total / 2) offset -= total;
    return offset;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 relative bg-slate-950/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500 inline-block">
            About Me
          </span>

          {/* Same size as the Hero heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mt-8 sm:mt-10 mb-[13px] sm:mb-[17px]">
            Passionate About Crafting
            <span className="text-indigo-500"> Seamless Web Experiences</span>
          </h2>

          {/* Same size as the Hero paragraph */}
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Transforming complex business logic into intuitive, accessible, and high-performance client interfaces.
          </p>
        </div>

        {/* 3D Rotating Card Carousel */}
        <div className="relative mx-auto max-w-5xl">
          <div
            className="relative h-[420px] sm:h-[350px]"
            style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
          >
            {cards.map((card, i) => {
              const offset = getOffset(i);
              const isActive = offset === 0;
              return (
                <div
                  key={card.key}
                  className={CARD_BASE}
                  style={getCardStyle(offset)}
                  aria-hidden={!isActive}
                >
                  <CardContent
                    number={String(i + 1).padStart(2, '0')}
                    primary={card.primary}
                    accent={card.accent}
                    label={card.label}
                    points={card.points}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}