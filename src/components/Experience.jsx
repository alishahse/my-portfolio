import React from 'react';
import { portfolioData } from '../data/portfolioData';
import profImg from '../assets/prof.JPG'; // <- change extension if your file is .jpg / .webp

// "PHPTravels" ko "Devstrix" se replace karta hai (case-insensitive, spaces ke saath bhi: "PHP Travels")
const rebrand = (text) =>
  typeof text === 'string' ? text.replace(/php\s*travels/gi, 'Devstrix') : text;

// Same helper as Skills: first half white, second half indigo
function splitHeading(text) {
  const words = String(text).trim().split(/\s+/);
  if (words.length < 2) return { primary: '', accent: text };
  const mid = Math.ceil(words.length / 2);
  return { primary: words.slice(0, mid).join(' '), accent: words.slice(mid).join(' ') };
}

// The 3 points shown in every experience card
const PROJECT_POINTS = ['Operations CRM', 'Travelnext', 'Booknow.co'];

/* Same border / hover glow as the Skills cards */
const CARD_BORDER =
  'hover:shadow-[0_30px_80px_-25px_rgba(99,102,241,0.45)]';

/* ------------------------------------------------------------------ */
/* Experience card (Figma style): title + number on top, text bottom   */
/* left, image on the right                                            */
/* ------------------------------------------------------------------ */
function ExperienceCard({ exp, number }) {
  const { primary, accent } = splitHeading(rebrand(exp.role));

  return (
    <article
      className={`group relative grid grid-cols-1 gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/25 via-slate-900/80 to-slate-900/90 p-6 text-left shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 lg:grid-cols-[1.25fr_1fr] ${CARD_BORDER}`}
    >
      {/* Soft indigo glow */}
      <div className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/45" />

      {/* Glass shine sweep on hover */}
      <div className="pointer-events-none absolute -inset-y-10 -left-1/2 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />

      {/* Left side: title on top, text at the bottom */}
      <div className="relative z-10 flex flex-col justify-between gap-10">
        <div>
          <h3 className="text-2xl font-bold leading-snug">
            {primary && <span className="text-white">{primary}</span>}
            {primary && ' '}
            <span className="text-indigo-500">{accent}</span>
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-base font-bold text-indigo-500">{rebrand(exp.company)}</span>
            <span className="text-slate-500">•</span>
            <span className="text-xs text-slate-300 sm:text-sm">{rebrand(exp.type)}</span>
          </div>
        </div>

        <div>
          <p className="max-w-md text-xs leading-relaxed text-slate-300 sm:text-sm">
            {rebrand(exp.summary)}
          </p>

          <h4 className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">
            Key Frontend Contributions
          </h4>

          <ol className="mt-3 space-y-2">
            {PROJECT_POINTS.map((point, i) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-xs leading-snug text-slate-300 sm:text-sm"
              >
                <span className="font-semibold text-indigo-500">{i + 1}-</span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Right side: number on top, image below */}
      <div className="relative z-10 flex flex-col gap-3">
        <span className="self-end pr-2 text-5xl font-extrabold leading-none text-indigo-500">
          {number}
        </span>
        <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <img
            src={profImg}
            alt="Profile"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Experience() {
  return (
    <section id="experience" className="relative bg-slate-950/40 py-20">
      {/* Section Header: same sizes as Skills / Projects */}
      <div className="mx-auto max-w-4xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
          Career Journey
        </span>
        <h2 className="mt-8 mb-[13px] text-3xl font-extrabold leading-tight tracking-tight text-white sm:mt-10 sm:mb-[17px] sm:text-5xl lg:text-6xl">
          <span className="text-indigo-500">Professional</span> Experience
        </h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
          Demonstrated track record of delivering production-grade travel applications and internal tooling.
        </p>
      </div>

      {/* Experience cards */}
      <div className="mx-auto mt-14 max-w-4xl space-y-6 px-4 sm:mt-16 sm:px-6">
        {portfolioData.experience.map((exp, idx) => (
          <ExperienceCard key={idx} exp={exp} number={String(idx + 1).padStart(2, '0')} />
        ))}
      </div>
    </section>
  );
}