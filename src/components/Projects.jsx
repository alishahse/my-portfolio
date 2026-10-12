import React, { useRef, useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

// Images from src/assets (named "2" and "3") - change extension if needed
import project2Img from '../assets/2.png';
import project3Img from '../assets/3.png';

const CRM_REPO = 'https://github.com/alishahse/CRM';

/* ------------------------------------------------------------------ */
/* Project previews                                                    */
/* 1st project (CRM) = hand-built dashboard (SVG)                      */
/* 2nd project = assets/2 | 3rd project = assets/3 (fully covered)     */
/* ------------------------------------------------------------------ */
const PROJECT_IMAGES = [
  null, // 1st project -> CRM dashboard (SVG)
  { src: project2Img, alt: 'BookNow.co hotel booking homepage' },
  { src: project3Img, alt: 'Travelnext travel booking homepage' },
];

// Same helper as Skills: first half white, second half indigo
function splitHeading(text) {
  const words = String(text).trim().split(/\s+/);
  if (words.length < 2) return { primary: '', accent: text };
  const mid = Math.ceil(words.length / 2);
  return { primary: words.slice(0, mid).join(' '), accent: words.slice(mid).join(' ') };
}

function CrmDashboard() {
  const kpis = [
    { label: 'Present', value: '24/28', color: '#2dd4bf' },
    { label: 'Open Tasks', value: '18', color: '#60a5fa' },
    { label: 'Hours Logged', value: '142h', color: '#a78bfa' },
    { label: 'Unread Mail', value: '7', color: '#fbbf24' },
  ];
  const bars = [38, 46, 34, 52, 44, 26, 18];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <svg
      viewBox="0 0 400 200"
      className="block h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
      role="img"
      aria-label="Enterprise Operations CRM dashboard preview"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
    >
      <defs>
        <linearGradient id="crmBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#0891b2" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <rect width="400" height="200" fill="#0b1220" />

      {/* Top bar */}
      <text x="16" y="19" fontSize="10" fontWeight="700" fill="#ffffff">Dashboard</text>
      <rect x="283" y="8" width="64" height="14" rx="7" fill="#111c30" stroke="#1e293b" />
      <text x="291" y="17.5" fontSize="6" fill="#64748b">Search...</text>
      <circle cx="370" cy="15" r="8" fill="#134e4a" />
      <text x="370" y="17.5" fontSize="6.5" fontWeight="700" fill="#5eead4" textAnchor="middle">DX</text>

      {/* KPI tiles */}
      {kpis.map((k, i) => (
        <g key={k.label}>
          <rect x={16 + i * 94} y="34" width="88" height="40" rx="6" fill="#111c30" stroke="#1e293b" />
          <text x={24 + i * 94} y="47" fontSize="6.5" fill="#94a3b8">{k.label}</text>
          <text x={24 + i * 94} y="65" fontSize="13" fontWeight="700" fill="#ffffff">{k.value}</text>
          <circle cx={80 + i * 94} cy="46" r="4" fill={k.color} opacity="0.85" />
        </g>
      ))}

      {/* Weekly attendance chart */}
      <rect x="16" y="82" width="244" height="106" rx="6" fill="#111c30" stroke="#1e293b" />
      <text x="26" y="96" fontSize="7.5" fontWeight="700" fill="#ffffff">Weekly Attendance</text>
      <text x="250" y="96" fontSize="6" fill="#64748b" textAnchor="end">This week</text>
      {bars.map((h, i) => (
        <g key={i}>
          <rect
            x={32 + i * 31}
            y={176 - h * 1.3}
            width="20"
            height={h * 1.3}
            rx="3"
            fill="url(#crmBar)"
            opacity={i === 3 ? 1 : 0.7}
          />
          <text x={42 + i * 31} y="185" fontSize="6" fill="#64748b" textAnchor="middle">{days[i]}</text>
        </g>
      ))}

      {/* Active task panel */}
      <rect x="270" y="82" width="114" height="106" rx="6" fill="#111c30" stroke="#1e293b" />
      <text x="281" y="96" fontSize="6.5" fill="#94a3b8">Active Task</text>
      <text x="281" y="116" fontSize="13" fontWeight="700" fill="#5eead4" fontFamily="ui-monospace, monospace">02:45:18</text>
      <rect x="281" y="123" width="46" height="13" rx="6.5" fill="rgba(20,184,166,0.15)" stroke="rgba(45,212,191,0.35)" />
      <circle cx="289" cy="129.5" r="2.5" fill="#2dd4bf">
        <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text x="295" y="132" fontSize="6.5" fontWeight="600" fill="#99f6e4">Running</text>
      <rect x="281" y="146" width="92" height="4" rx="2" fill="#1e293b" />
      <rect x="281" y="146" width="58" height="4" rx="2" fill="#2dd4bf" />
      <circle cx="286" cy="163" r="5" fill="rgba(20,184,166,0.2)" />
      <path d="M283.5 163 l2 2 l3.5 -3.5" fill="none" stroke="#2dd4bf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="295" y="165" fontSize="6.5" fill="#cbd5e1">Webcam verified</text>
      <text x="281" y="180" fontSize="6" fill="#64748b">Punch-in 09:00 AM</text>
    </svg>
  );
}

// Image panel: fills the full height of its half of the card (Figma style)
function Preview({ id, index, className = '' }) {
  const isCrm = id === 'crm-platform';
  const image = isCrm
    ? null
    : PROJECT_IMAGES[index] || PROJECT_IMAGES[PROJECT_IMAGES.length - 1];

  return (
    <div
      className={`relative min-h-[240px] overflow-hidden bg-[#0b1220] lg:min-h-[300px] ${className}`}
    >
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0">
          <CrmDashboard />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll (per card)                                         */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

/* Same border / hover glow as the Skills cards */
const CARD_BORDER =
  'hover:shadow-[0_30px_80px_-25px_rgba(99,102,241,0.45)]';

/* ------------------------------------------------------------------ */
/* Project row: text one side, image other side (alternating)          */
/* 1st: text left | 2nd: image left | 3rd: text left (same as 1st)     */
/* ------------------------------------------------------------------ */
function ProjectCard({ proj, index }) {
  const [ref, visible] = useReveal();
  const isCrm = proj.id === 'crm-platform';
  const textFirst = index % 2 === 0;
  const { primary, accent } = splitHeading(proj.title);

  return (
    // Outer wrapper: entrance animation
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <article
        className={`group relative grid grid-cols-1 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/25 via-slate-900/80 to-slate-900/90 text-left shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
          textFirst ? 'lg:grid-cols-[1fr_1.15fr]' : 'lg:grid-cols-[1.15fr_1fr]'
        } ${CARD_BORDER}`}
      >
        {/* Soft indigo glow */}
        <div
          className={`pointer-events-none absolute -top-16 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/45 ${
            textFirst ? '-left-10' : '-right-10'
          }`}
        />

        {/* Glass shine sweep on hover */}
        <div className="pointer-events-none absolute -inset-y-10 -left-1/2 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />

        {/* Text side */}
        <div
          className={`relative z-10 order-2 flex flex-col justify-center p-6 sm:p-8 ${
            textFirst ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <h3 className="text-2xl font-bold leading-snug">
            {primary && <span className="text-white">{primary}</span>}
            {primary && ' '}
            <span className="text-indigo-500">{accent}</span>
          </h3>

          <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-300 sm:text-sm">
            {proj.description}
          </p>

          {/* Button + circle icon (same style as Skills CTA) */}
          <div className="mt-6 flex items-center gap-2">
            {isCrm ? (
              <a
                href={CRM_REPO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-indigo-500 bg-indigo-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-400"
              >
                View Project
              </a>
            ) : (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center rounded-full border border-indigo-500 bg-indigo-500 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-400"
              >
                View Project
              </button>
            )}

            {isCrm ? (
              <a
                href={CRM_REPO}
                target="_blank"
                rel="noreferrer"
                aria-label={`${proj.title} on GitHub`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-indigo-500 bg-indigo-500/10 text-indigo-500 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
            ) : (
              <span
                title="Private repository"
                aria-label={`${proj.title} is a private repository`}
                className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-indigo-500 bg-indigo-500/10 text-indigo-500"
              >
                <Lock className="h-5 w-5" />
              </span>
            )}
          </div>
        </div>

        {/* Image side (flush to the card edge) */}
        <Preview
          id={proj.id}
          index={index}
          className={`order-1 ${textFirst ? 'lg:order-2' : 'lg:order-1'}`}
        />
      </article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function Projects() {
  const projects = portfolioData.projects;

  return (
    <section
      id="projects"
      className="bg-slate-950/40 py-20"
    >
      {/* Section Header: same sizes as Skills / Hero / About */}
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mt-8 mb-[13px] text-3xl font-extrabold leading-tight tracking-tight text-white sm:mt-10 sm:mb-[17px] sm:text-5xl lg:text-6xl">
          <span className="text-indigo-500">Featured Frontend</span> Projects
        </h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
          High-performance client-side web platforms engineered with React, Next.js, and modern browser APIs.
        </p>
      </div>

      {/* Project rows (narrower: max-w-4xl) */}
      <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-8 px-4 sm:mt-16 sm:px-6">
        {projects.map((proj, idx) => (
          <ProjectCard key={proj.id} proj={proj} index={idx} />
        ))}
      </div>
    </section>
  );
}