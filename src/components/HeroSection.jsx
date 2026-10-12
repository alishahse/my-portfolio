import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spotlight } from './ui/Spotlight';

const ANIMATED_WORDS = [
  { text: 'Apps', isGradient: false },
  { text: 'with', isGradient: false },
  { text: 'React', isGradient: true },
  { text: '&', isGradient: true },
  { text: 'Next.js', isGradient: true },
];

const CARD_BORDER =
  'hover:shadow-[0_30px_80px_-25px_rgba(99,102,241,0.45)]';

export default function HeroSection() {
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

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-28">
      {/* Official Aceternity UI Spotlight Effect (indigo) */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-40"
        fill="#6366f1"
      />

      {/* Radial Dot Grid Background Pattern */}
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Background Decorative Ambient Glows (indigo) */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[350px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[300px] w-[400px] rounded-full bg-indigo-600/10 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Split 2-Column Layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Headline, Bio & CTA */}
          <div className="space-y-8 text-left sm:space-y-10 lg:col-span-7">
            {/* Main Headline with Static First Line & Infinite Word-by-Word Sequence */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-[130px] text-3xl font-black leading-tight tracking-tight text-white sm:min-h-[160px] sm:text-5xl lg:min-h-[180px] lg:text-6xl"
            >
              {/* Static Line 1: Always standing */}
              <span className="block text-white">
                Crafting <span className="inline-block text-indigo-500">Scalable Web</span>
              </span>

              {/* Animated Line 2: Words appear one-by-one in an infinite loop */}
              <span
                className={`mt-2 inline-flex flex-wrap items-center transition-opacity duration-300 sm:mt-3 ${
                  isFadingOut ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {ANIMATED_WORDS.slice(0, visibleCount).map((item, idx) => (
                  <motion.span
                    key={`${cycle}-${idx}`}
                    initial={{ opacity: 0, y: 14, filter: 'blur(5px)', scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    className={
                      item.isGradient
                        ? 'mr-2 inline-block text-indigo-500 sm:mr-3'
                        : 'mr-2 inline-block text-white sm:mr-3'
                    }
                  >
                    {item.text}
                  </motion.span>
                ))}

                {/* Indigo cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                  className="ml-1 inline-block h-[0.85em] w-[3px] rounded-sm bg-indigo-500 align-baseline shadow-[0_0_10px_rgba(99,102,241,0.9)] sm:w-[4px]"
                />
              </span>
            </motion.h1>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg"
            >
              Hi, I&apos;m <strong className="text-white">Ali Shah</strong>. I transform complex business logic into high-conversion user interfaces, from multi-step hotel reservation wizards (BookNow.co) to modern enterprise operations CRMs.
            </motion.p>

            {/* Single CTA: slides in from left (same button style as Skills) */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 85,
                damping: 18,
                mass: 1,
                delay: 0.35,
              }}
              className="pt-2 sm:pt-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full border border-indigo-500 bg-indigo-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-400"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: IDE Code Terminal Card (Skills card style) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/25 via-slate-900/80 to-slate-900/90 p-6 shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${CARD_BORDER}`}
            >
              {/* Soft indigo glow */}
              <div className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/45" />

              {/* Glass shine sweep on hover */}
              <div className="pointer-events-none absolute -inset-y-10 -left-1/2 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />

              {/* Card Window Top Title Bar */}
              <div className="relative z-10 flex items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-rose-500/80"></span>
                  <span className="inline-block h-3 w-3 rounded-full bg-amber-500/80"></span>
                  <span className="inline-block h-3 w-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300">
                  <Terminal className="h-3.5 w-3.5 text-indigo-500" />
                  <span>DeveloperProfile.jsx</span>
                </div>
              </div>

              {/* Divider (same as Skills CTA card) */}
              <div className="relative z-10 mb-4 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

              {/* Syntax-Highlighted Code Editor */}
              <div className="relative z-10 space-y-1.5 text-left font-mono text-xs leading-relaxed text-slate-300 sm:text-sm">
                <div>
                  <span className="text-indigo-500">const</span>{' '}
                  <span className="font-bold text-white">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  name: <span className="text-slate-100">&apos;Ali Shah&apos;</span>,
                </div>
                <div className="pl-4">
                  title: <span className="text-slate-100">&apos;Frontend Developer&apos;</span>,
                </div>
                <div className="pl-4">
                  company: <span className="text-slate-100">&apos;Devstrix&apos;</span>,
                </div>
                <div className="pl-4">coreStack: [</div>
                <div className="pl-8 text-indigo-500">&apos;React.js&apos;, &apos;Next.js&apos;,</div>
                <div className="pl-8 text-indigo-500">&apos;Tailwind CSS&apos;, &apos;Redux&apos;</div>
                <div className="pl-4">],</div>
                <div className="pl-4">
                  status:{' '}
                  <span className="font-semibold text-indigo-500">&apos;🟢 Active @ Devstrix&apos;</span>,
                </div>
                <div className="pl-4">
                  focus: <span className="text-slate-100">&apos;High-Conversion UI/UX&apos;</span>
                </div>
                <div>&#125;;</div>
              </div>

              {/* Divider */}
              <div className="relative z-10 mt-6 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

              {/* Card Bottom Stats */}
              <div className="relative z-10 flex items-center justify-between pt-4 text-xs">
                <span className="font-mono text-slate-300">Location: Pakistan</span>
                <span className="rounded-full border border-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 font-mono text-[11px] font-medium text-indigo-500">
                  3+ Production Systems
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}