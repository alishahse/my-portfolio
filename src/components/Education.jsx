import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Same helper as Skills: first half white, second half indigo
function splitHeading(text) {
  const words = String(text).trim().split(/\s+/);
  if (words.length < 2) return { primary: '', accent: text };
  const mid = Math.ceil(words.length / 2);
  return { primary: words.slice(0, mid).join(' '), accent: words.slice(mid).join(' ') };
}

/* Same border / hover glow as the Skills cards */
const CARD_BORDER =
  'hover:shadow-[0_30px_80px_-25px_rgba(99,102,241,0.45)]';

/* ------------------------------------------------------------------ */
/* Education card (Skills card style)                                  */
/* ------------------------------------------------------------------ */
function EducationCard({ education }) {
  const { primary, accent } = splitHeading(education.degree);

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/25 via-slate-900/80 to-slate-900/90 text-left shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${CARD_BORDER}`}
    >
      {/* Soft indigo glow */}
      <div className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/45" />

      {/* Glass shine sweep on hover */}
      <div className="pointer-events-none absolute -inset-y-10 -left-1/2 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="flex items-start gap-4">
          {/* Icon (same as Skills card icon) */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500 bg-indigo-500/10 text-indigo-500 transition-all duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white motion-reduce:transition-none motion-reduce:group-hover:transform-none">
            <GraduationCap className="h-6 w-6" />
          </div>

          <div>
            <span className="mb-3 inline-block rounded-full border border-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-500">
              Graduated Degree
            </span>
            <h3 className="text-2xl font-bold leading-snug">
              {primary && <span className="text-white">{primary}</span>}
              {primary && ' '}
              <span className="text-indigo-500">{accent}</span>
            </h3>
            <p className="mt-1 text-base font-bold text-indigo-500">{education.institution}</p>
            <p className="mt-3 max-w-lg text-xs leading-relaxed text-slate-300 sm:text-sm">
              {education.details}
            </p>
          </div>
        </div>

        <div className="flex w-full shrink-0 items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 text-sm font-bold text-indigo-500">
            <Award className="h-4 w-4" />
            <span>GPA: {education.gpa}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 sm:text-sm">
            <Calendar className="h-3.5 w-3.5" />
            <span>{education.period}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="relative bg-slate-950/40 py-20">
      {/* Section Header: same sizes as Skills / Projects / Experience */}
      <div className="mx-auto max-w-4xl px-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
          Academic Background
        </span>
        <h2 className="mt-8 mb-8 text-3xl font-extrabold leading-tight tracking-tight text-white sm:mt-10 sm:mb-10 sm:text-5xl lg:text-6xl">
          <span className="text-indigo-500">Education</span> Qualifications
        </h2>
      </div>

      <div className="mx-auto mt-14 max-w-4xl px-4 sm:mt-16 sm:px-6">
        <EducationCard education={education} />
      </div>
    </section>
  );
}