import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spotlight } from './ui/Spotlight';

export default function HeroSpotlight() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-40 sm:pt-48 pb-20 sm:pb-28 overflow-hidden">
      
      {/* Official Aceternity UI Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-40"
        fill="#2dd4bf"
      />

      {/* Radial Dot Grid Background Pattern */}
      <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none opacity-40" />

      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Split 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Headline, Bio & Animated CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Main Headline (Framer Motion Entrance) */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
            >
              Crafting Scalable Web Apps with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200">
                React & Next.js
              </span>
            </motion.h1>

            {/* Bio Description (Framer Motion Entrance) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Hi, I'm <strong className="text-white">Ali Shah</strong>. I transform complex business logic into high-conversion user interfaces, from multi-step hotel reservation wizards (BookNow.co) to modern enterprise operations CRMs.
            </motion.p>

            {/* Single CTA: Slides in from left and settles smoothly */}
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
              className="pt-2"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

          </div>

          {/* Right Column: Sleek IDE Code Terminal Card (Framer Motion Elevation) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-teal-500/40 transition-all duration-300">
              
              {/* Ambient glow inside card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Card Window Top Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span>DeveloperProfile.jsx</span>
                </div>
              </div>

              {/* Syntax-Highlighted Code Editor */}
              <div className="space-y-1.5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10 text-left">
                <div>
                  <span className="text-purple-400">const</span> <span className="text-teal-300 font-bold">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  name: <span className="text-amber-300">'Ali Shah'</span>,
                </div>
                <div className="pl-4">
                  title: <span className="text-amber-300">'Frontend Developer'</span>,
                </div>
                <div className="pl-4">
                  company: <span className="text-amber-300">'Devstrix'</span>,
                </div>
                <div className="pl-4">
                  coreStack: [
                </div>
                <div className="pl-8 text-cyan-300">
                  'React.js', 'Next.js',
                </div>
                <div className="pl-8 text-cyan-300">
                  'Tailwind CSS', 'Redux'
                </div>
                <div className="pl-4">
                  ],
                </div>
                <div className="pl-4">
                  status: <span className="text-emerald-400 font-semibold">'🟢 Active @ Devstrix'</span>,
                </div>
                <div className="pl-4">
                  focus: <span className="text-amber-300">'High-Conversion UI/UX'</span>
                </div>
                <div>&#125;;</div>
              </div>

              {/* Card Bottom Stats */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs relative z-10">
                <span className="text-slate-400 font-mono">Location: Pakistan</span>
                <span className="px-2.5 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 font-bold font-mono text-[11px]">
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
