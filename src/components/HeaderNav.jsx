import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' }
];

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['experience', 'projects', 'skills', 'about'];
      let found = false;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
            found = true;
            break;
          }
        }
      }
      if (!found && window.scrollY < 300) {
        setActiveSection('Home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-xl shadow-black/30 py-3 sm:py-4'
          : 'bg-slate-950/40 backdrop-blur-md border-b border-slate-800/40 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Left: Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <img
            src="/devstrix-logo.webp"
            alt="Devstrix"
            className="animate-logo-float h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </a>

        {/* Center: Clean Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-slate-400 font-medium hover:text-white'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right: Get In Touch Capsule + Directly Connected Touching Arrow (No shadow, no glass, no dot) */}
        <div className="flex items-center">
          <a
            href="#contact"
            className="inline-flex items-center group cursor-pointer"
            style={{ clipPath: 'none', animation: 'none' }}
          >
            {/* Pill Button (Completely clean, zero shadow, zero dark glass) */}
            <span
              className="px-5 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm transition-all transform group-hover:-translate-y-0.5"
              style={{ boxShadow: 'none', filter: 'none' }}
            >
              Get In Touch
            </span>

            {/* Circular Connected Arrow Button (Touching directly against the button, zero dot) */}
            <span
              className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 flex items-center justify-center font-bold transition-all transform group-hover:scale-105 shrink-0 -ml-1 sm:-ml-1.5"
              style={{ boxShadow: 'none', filter: 'none' }}
            >
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 md:hidden ml-2 border border-slate-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5 text-teal-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800/80 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-fade-in shadow-2xl">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-medium text-slate-300 hover:text-teal-400 hover:pl-2 transition-all rounded-lg"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-center flex items-center justify-center gap-2 shadow-none"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
