import React, { memo, useMemo } from 'react';
import { Code2, Layers, Palette, Wrench, ArrowUpRight, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import handsImg from '../assets/hands-hd.png'; // transparent HD PNG (hands only)

const ICON_MAP = { Code2, Layers, Palette, Wrench };

/* Indigo (#6366f1) = same color as "Apps with React & Next.js" in Hero */

// Splits a text in half by words: first half white, second half indigo
function splitHeading(text) {
  const words = String(text).trim().split(/\s+/);
  if (words.length < 2) return { primary: '', accent: text };
  const mid = Math.ceil(words.length / 2);
  return { primary: words.slice(0, mid).join(' '), accent: words.slice(mid).join(' ') };
}

// Grid position on large screens:
// col 1: card 1 + card 4 | col 2: card 2 + card 3 | col 3: CTA card (2 rows)
const PLACEMENT = [
  'lg:col-start-1 lg:row-start-1',
  'lg:col-start-2 lg:row-start-1',
  'lg:col-start-2 lg:row-start-2',
  'lg:col-start-1 lg:row-start-2',
];

/* ------------------------------------------------------------------ */
/* Pill layout                                                         */
/*   left column  : 1 React (bottom), 2 Next (above)                   */
/*   right column : 3 CSS (bottom), 4 JavaScript (above)               */
/*   long pill    : 5 HTML above everything, with a gap                */
/* ------------------------------------------------------------------ */
const PILL_ORDER = ['react', 'next', 'css', 'javascript', 'html'];

function orderSkills(skills) {
  const rank = (name) => {
    const n = name.toLowerCase();
    const idx = PILL_ORDER.findIndex((key) => n.includes(key));
    return idx === -1 ? 999 : idx;
  };
  // stable sort: unknown names keep their original order at the end
  return skills
    .map((s, i) => ({ s, i, r: rank(s.name) }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .map((x) => x.s);
}

/* Static CSS: rendered ONCE in <Skills />, not per card */
const SECTION_CSS = `
.skill-pill {
  transform: rotate(var(--tilt, 0deg));
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms ease,
    border-color 300ms ease, color 300ms ease, box-shadow 300ms ease;
}
.skill-pill:hover {
  transform: translateY(-6px) scale(1.1) rotate(0deg);
  z-index: 10;
}
@keyframes handsFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.hands-float { animation: handsFloat 5s ease-in-out infinite; will-change: transform; }
@media (prefers-reduced-motion: reduce) {
  .skill-pill, .skill-pill:hover { transition: none; }
  .hands-float { animation: none; }
}
`;

const CARD_HOVER = 'hover:shadow-[0_30px_80px_-25px_rgba(99,102,241,0.45)]';

const Pill = memo(function Pill({ name, tilt = 0 }) {
  return (
    <span
      className="skill-pill relative cursor-default select-none whitespace-nowrap rounded-full border border-indigo-500/60 bg-white/[0.08] px-3.5 py-2 text-xs text-slate-100 shadow-lg shadow-black/20 backdrop-blur-sm hover:border-indigo-400 hover:bg-indigo-500 hover:text-white hover:shadow-[0_10px_25px_-8px_rgba(99,102,241,0.9)] sm:text-[13px]"
      style={{ '--tilt': `${tilt}deg` }}
    >
      {name}
    </span>
  );
});

function PillLayout({ skills, isFirstCard = false }) {
  const ordered = useMemo(() => orderSkills(skills), [skills]);
  const [s1, s2, s3, s4, s5] = ordered;
  const extra = ordered.slice(5); // additional skills go on top as long pills

  if (isFirstCard) {
    return (
      <div className="flex flex-col items-center gap-3">
        {(s5 || extra.length > 0) && (
          <div className="flex flex-col items-center gap-2">
            {s5 && <Pill name={s5.name} />}
            {extra.map((s) => (
              <Pill key={s.name} name={s.name} />
            ))}
          </div>
        )}

        <div className="flex items-start justify-center gap-3 w-full">
          <div className="flex flex-col items-start gap-2">
            {s2 && <Pill name={s2.name} />}
            {s1 && <Pill name={s1.name} />}
          </div>
          <div className="flex flex-col items-start gap-2">
            {s4 && <Pill name={s4.name} />}
            {s3 && <Pill name={s3.name} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {(s5 || extra.length > 0) && (
        <div className="flex flex-col items-start gap-2">
          {s5 && <Pill name={s5.name} />}
          {extra.map((s) => (
            <Pill key={s.name} name={s.name} />
          ))}
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col items-start gap-2">
          {s2 && <Pill name={s2.name} />}
          {s1 && <Pill name={s1.name} />}
        </div>
        <div className="flex flex-col items-start gap-2">
          {s4 && <Pill name={s4.name} />}
          {s3 && <Pill name={s3.name} />}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */
const CardTop = memo(function CardTop({ Icon }) {
  return (
    <div className="relative mb-6 flex items-center justify-between">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500 bg-indigo-500/10 text-indigo-500 transition-all duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white motion-reduce:transition-none motion-reduce:group-hover:transform-none">
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
});

const CardHeading = memo(function CardHeading({ text }) {
  const { primary, accent } = splitHeading(text);
  return (
    <h3 className="relative text-xl font-bold leading-snug">
      {primary && <span className="text-white">{primary}</span>}
      {primary && ' '}
      <span className="text-indigo-500">{accent}</span>
    </h3>
  );
});

/* Glass shine sweep (shared by Pill & List cards) */
const Shine = () => (
  <div className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />
);

/* ------------------------------------------------------------------ */
/* Cards 1 & 3: skills as pill buttons                                 */
/* ------------------------------------------------------------------ */
const PillCard = memo(function PillCard({ category, placement, isFirstCard = false }) {
  const Icon = ICON_MAP[category.icon] || Code2;

  return (
    <div
      className={`group relative flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/25 via-slate-900/80 to-slate-900/90 px-6 pt-5 pb-7 text-left shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${CARD_HOVER} ${placement}`}
    >
      <div className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/45" />
      <Shine />

      <CardTop Icon={Icon} />
      <CardHeading text={category.category} />

      <div className="relative mt-auto pt-6">
        <PillLayout skills={category.skills} isFirstCard={isFirstCard} />
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Cards 2 & 4: skills as a list (arrow on hover)                      */
/* ------------------------------------------------------------------ */
const ListCard = memo(function ListCard({ category, placement }) {
  const Icon = ICON_MAP[category.icon] || Code2;

  return (
    <div
      className={`group relative h-full min-h-[340px] w-full overflow-hidden rounded-3xl bg-slate-900/70 px-6 pt-5 pb-7 text-left shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.06] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${CARD_HOVER} ${placement}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <Shine />
      <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-indigo-500/0 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20" />

      <CardTop Icon={Icon} />
      <CardHeading text={category.category} />

      <ul className="relative mt-6 space-y-3">
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className="group/item flex cursor-default items-start gap-2.5 text-xs leading-snug text-slate-300 transition-all duration-300 ease-out hover:translate-x-1.5 hover:text-white sm:text-sm motion-reduce:transition-none motion-reduce:hover:translate-x-0"
          >
            {/* Dot turns into a diagonal arrow on hover */}
            <span className="relative mt-px flex h-4 w-4 shrink-0 items-center justify-center">
              <span className="absolute h-1.5 w-1.5 rounded-full bg-indigo-500 transition-all duration-300 group-hover/item:scale-0 group-hover/item:opacity-0" />
              <ArrowUpRight
                className="absolute h-4 w-4 scale-50 text-indigo-500 opacity-0 transition-all duration-300 group-hover/item:scale-100 group-hover/item:opacity-100"
                strokeWidth={2.5}
              />
            </span>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* 5th card: hands panel covers the top (small padding) + CTA text     */
/* ------------------------------------------------------------------ */
const ImpactCard = memo(function ImpactCard() {
  return (
    <div
      className={`group relative flex min-h-[420px] w-full flex-col overflow-hidden rounded-3xl bg-slate-900/70 p-3 text-left shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 ${CARD_HOVER}`}
    >
      {/* Top panel: fills all free space above the text, only 12px padding from card edge */}
      <div className="relative flex min-h-[260px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-500/45 via-indigo-500/15 to-indigo-500/5">
        {/* Glow behind the hands */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/40 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-indigo-400/55" />

        {/* Hands: slightly wider than the panel so the arms bleed off both edges */}
        <img
          src={handsImg}
          alt="Two hands reaching toward each other"
          width={1731}
          height={648}
          decoding="async"
          draggable="false"
          className="hands-float relative w-[118%] max-w-none select-none drop-shadow-[0_14px_30px_rgba(0,0,0,0.45)]"
        />
      </div>

      {/* Text section */}
      <div className="px-3 pt-5 pb-2">
        <span className="inline-block rounded-full border border-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-500">
          Active at Devstrix
        </span>

        <h3 className="mt-4 text-2xl font-bold leading-snug text-white">
          Let&apos;s Create <span className="text-indigo-500">Impact</span>
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
          Let&apos;s create meaningful and lasting digital impact.
        </p>

        <div className="mt-5 flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-indigo-500 bg-indigo-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-400"
          >
            Let&apos;s Talk
          </a>
          <a
            href="#contact"
            aria-label="Let's talk"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-indigo-500 bg-indigo-500/10 text-indigo-500 transition-all duration-300 group-hover:translate-x-1 hover:bg-indigo-500 hover:text-white"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Skills() {
  // 3rd card shows only its first 4 skills
  const categories = useMemo(
    () =>
      portfolioData.skillCategories.map((cat, i) =>
        i === 2 ? { ...cat, skills: cat.skills.slice(0, 4) } : cat
      ),
    []
  );

  return (
    <section id="skills" className="bg-slate-950/40 py-20">
      <style>{SECTION_CSS}</style>

      {/* Section Header: same sizes as Hero / About */}
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mt-8 mb-[13px] text-3xl font-extrabold leading-tight tracking-tight text-white sm:mt-10 sm:mb-[17px] sm:text-5xl lg:text-6xl">
          <span className="text-indigo-500">Frontend</span> Skills{' '}
          <span className="text-indigo-500">&amp; Capabilities</span>
        </h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
          Specialized purely in modern client-side architectures, reactive state management, and accessible UI systems.
        </p>
      </div>

      {/* Bento grid: 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-5 px-4 sm:mt-16 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => {
          const placement = PLACEMENT[i] || '';
          // 1st and 3rd = pill buttons, 2nd and 4th = list
          return i === 0 || i === 2 ? (
            <PillCard
              key={cat.category}
              category={cat}
              placement={placement}
              isFirstCard={i === 0}
            />
          ) : (
            <ListCard key={cat.category} category={cat} placement={placement} />
          );
        })}

        <ImpactCard />
      </div>
    </section>
  );
}
