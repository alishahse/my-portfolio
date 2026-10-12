import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ANIMATED_WORDS = [
  { text: 'Apps' },
  { text: 'with' },
  { text: 'React' },
  { text: '&' },
  { text: 'Next.js' },
];

/* ------------------------------------------------------------------ */
/* Developer card: scroll animation + glass hover                      */
/* ------------------------------------------------------------------ */
function DeveloperCard() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mouse position -> CSS variables
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    // Outer wrapper: perspective + observer only (does not animate itself, to avoid flicker)
    <div ref={wrapRef} className="mx-auto w-full max-w-xl" style={{ perspective: '1200px' }}>
      {/* Animated layer */}
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView
            ? 'translate3d(0, 0, 0) rotateX(0deg) scale(1)'
            : 'translate3d(0, 50px, -450px) rotateX(22deg) scale(0.88)',
          transformOrigin: 'center bottom',
          // filter only while out of view, otherwise it breaks the glass (backdrop-blur)
          filter: inView ? 'none' : 'blur(8px)',
          transition:
            'opacity 800ms ease, transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), filter 800ms ease',
          willChange: 'transform',
        }}
      >
        {/* Inner card: glass */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="group relative overflow-hidden rounded-3xl bg-slate-950/35 text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_30px_80px_-25px_rgba(45,212,191,0.35)] hover:backdrop-blur-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {/* Mouse-following glass light */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), rgba(45,212,191,0.08) 40%, transparent 70%)',
            }}
          />

          {/* Glass top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Diagonal shine sweep on hover */}
          <div className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />

          <div className="relative z-10 p-6 sm:p-7">
            {/* Window header */}
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono text-xs text-slate-300">
                <span className="text-teal-400">&gt;_</span> DeveloperProfile.jsx
              </span>
            </div>

            {/* Code */}
            <pre className="overflow-x-auto font-mono text-[13px] leading-7 text-slate-200">
              <code>
                <span className="text-purple-400">const</span>{' '}
                <span className="font-bold text-teal-300">developer</span> = {'{'}
                {'\n'}
                {'  '}name: <span className="text-amber-300">'Ali Shah'</span>,{'\n'}
                {'  '}title: <span className="text-amber-300">'Frontend Developer'</span>,{'\n'}
                {'  '}company: <span className="text-amber-300">'Devstrix'</span>,{'\n'}
                {'  '}coreStack: [{'\n'}
                {'    '}
                <span className="text-cyan-300">'React.js'</span>,{' '}
                <span className="text-cyan-300">'Next.js'</span>,{'\n'}
                {'    '}
                <span className="text-cyan-300">'Tailwind CSS'</span>,{' '}
                <span className="text-cyan-300">'Redux'</span>
                {'\n'}
                {'  '}],{'\n'}
                {'  '}status: <span className="text-amber-300">'</span>
                <span className="inline-block h-3 w-3 translate-y-[1px] rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />{' '}
                <span className="text-teal-300">Active @ Devstrix</span>
                <span className="text-amber-300">'</span>,{'\n'}
                {'  '}focus: <span className="text-amber-300">'High-Conversion UI/UX'</span>
                {'\n'}
                {'}'};
              </code>
            </pre>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="font-mono text-xs text-slate-400">Location: Pakistan</span>
              <span className="rounded-full border border-teal-400/30 bg-teal-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-teal-300">
                3+ Production Systems
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let timer1;
    let timer2;

    if (visibleCount < ANIMATED_WORDS.length) {
      // Reveal next word every 400ms with spring physics
      timer1 = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 400);
    } else {
      // Sentence is complete: hold for 2.8s so user reads it, then fade out and loop
      timer1 = setTimeout(() => {
        setIsFadingOut(true);
        timer2 = setTimeout(() => {
          setVisibleCount(0);
          setIsFadingOut(false);
          setCycle((c) => c + 1);
        }, 350);
      }, 2800);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [visibleCount]);

  const visibleWords = ANIMATED_WORDS.slice(0, visibleCount);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-40 sm:pt-48 pb-20 sm:pb-28 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Centered content */}
        <div className="flex flex-col items-center text-center">

          {/* Content block: headline, bio, CTA */}
          <div className="w-full max-w-3xl flex flex-col items-center">

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight min-h-[85px] sm:min-h-[115px] lg:min-h-[135px]"
            >
              {/* Line 1: all white */}
              <span className="block text-white">Crafting Scalable Web</span>

              {/* Line 2: indigo */}
              <span
                className={`inline-flex flex-wrap items-center justify-center mt-2 sm:mt-2.5 transition-opacity duration-300 ${
                  isFadingOut ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {visibleWords.map((item, idx) => (
                  <motion.span
                    key={`${cycle}-${idx}`}
                    initial={{ opacity: 0, y: 14, filter: 'blur(5px)', scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    className="inline-block text-indigo-500 mr-2 sm:mr-3"
                  >
                    {item.text}
                  </motion.span>
                ))}

                {/* Cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                  className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-indigo-500 align-baseline rounded-sm shadow-[0_0_10px_rgba(99,102,241,0.9)] ml-1"
                />
              </span>
            </motion.h1>

            {/* Bio paragraph: displayed directly below heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 sm:mt-6 text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            >
              Hi, I'm <strong className="font-bold text-indigo-400">Ali Khan</strong>. I transform complex business logic into high-conversion user interfaces, from multi-step hotel reservation wizards (BookNow.co) to modern enterprise operations CRMs.
            </motion.p>

            {/* CTA Button: 'Explore Projects' */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6 sm:mt-8 flex items-center justify-center"
            >
              {/* Primary white button */}
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base bg-white text-slate-950 hover:bg-slate-100 transition-all duration-200 shadow-md active:scale-95"
              >
                Explore Projects
                <ArrowRight
                  className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </a>
            </motion.div>
          </div>

          {/* Card below the content, with extra spacing */}
          <div className="w-full mt-20 sm:mt-28 lg:mt-32">
            <DeveloperCard />
          </div>

        </div>

      </div>
    </section>
  );
}
