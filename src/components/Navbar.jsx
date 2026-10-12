import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import aliKhanLogo from '../assets/ali-khan.svg';

const NAV_ITEMS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
];

const SECTIONS = ['experience', 'projects', 'skills', 'about'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollPos = window.scrollY;
        setScrolled(scrollPos > 20);

        // Fast offset check optimized for 120 FPS scrolling
        let found = false;
        for (const section of SECTIONS) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop - 220;
            const bottom = top + el.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
              setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
              found = true;
              break;
            }
          }
        }
        if (!found && scrollPos < 300) {
          setActiveSection('Home');
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none transition-all duration-300">
      {/* Floating Capsule Container */}
      <nav
        className={`pointer-events-auto w-full max-w-4xl px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl flex items-center justify-between gap-4 sm:gap-8 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0b0c12]/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/60'
            : 'bg-[#0b0c12]/75 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40'
        }`}
      >
        {/* Left: Logo */}
        <a href="#" className="flex items-center group shrink-0">
          <img
            src={aliKhanLogo}
            alt="Ali Khan"
            className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
          />
        </a>

        {/* Center / Right: Nav links + CTA */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 font-medium hover:text-white'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right CTA Button + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm bg-white text-slate-950 hover:bg-slate-100 transition-all duration-200 shadow-sm active:scale-95"
          >
            Get In Touch
            <ArrowRight
              className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 md:hidden border border-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5 text-teal-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="pointer-events-auto w-full max-w-4xl mt-2 rounded-2xl bg-[#0b0c12]/95 backdrop-blur-2xl border border-white/10 px-5 py-4 shadow-2xl space-y-2 animate-fadeIn md:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm transition-colors ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            );
          })}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="group inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-sm bg-white text-slate-950 hover:bg-slate-100 transition-all duration-200 shadow-sm active:scale-95"
            >
              Get In Touch
              <ArrowRight
                className="w-4 h-4 text-slate-950 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
