import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import aliKhanLogo from '../assets/ali-khan.svg';

const currentYear = new Date().getFullYear();

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950/80 backdrop-blur-md py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-800/60 pb-8 sm:flex-row">
          {/* Brand */}
          <a href="#" className="flex items-center group shrink-0">
            <img
              src={aliKhanLogo}
              alt={portfolioData.personalInfo.name}
              className="h-10 sm:h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            />
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-300 sm:text-sm">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-300 hover:text-indigo-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            title="Back to top"
            aria-label="Back to top"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-indigo-500 bg-indigo-500/10 text-indigo-500 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:text-white"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>
            © {currentYear} {portfolioData.personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}