import React, { useState, useEffect } from 'react';
import { Home, User, Code2, FolderGit2, Briefcase } from 'lucide-react';

const DOCK_ITEMS = [
  { name: 'Home', href: '#', icon: Home, sectionId: 'home' },
  { name: 'About', href: '#about', icon: User, sectionId: 'about' },
  { name: 'Skills', href: '#skills', icon: Code2, sectionId: 'skills' },
  { name: 'Projects', href: '#projects', icon: FolderGit2, sectionId: 'projects' },
  { name: 'Experience', href: '#experience', icon: Briefcase, sectionId: 'experience' },
];

const SECTIONS = ['experience', 'projects', 'skills', 'about'];

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      for (const section of SECTIONS) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
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

  const handleClick = (e, href) => {
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Floating Navigation"
      className="fixed bottom-4 sm:bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-3"
    >
      <nav className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8)] hover:border-indigo-500/40 transition-all duration-300">
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.name;

          return (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              aria-label={item.name}
              className={`group relative flex items-center justify-center w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_8px_rgba(99,102,241,0.15)] scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:scale-110" />

              {/* Micro-tooltip on hover */}
              <span className="pointer-events-none absolute -top-9 px-2.5 py-1 rounded-md bg-slate-900/95 border border-slate-700/80 text-[11px] font-semibold text-slate-200 shadow-xl opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
                {item.name}
              </span>

              {/* Active glow dot with subtle visibility */}
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-indigo-400/70 shadow-[0_0_4px_rgba(99,102,241,0.35)]" />
              )}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

