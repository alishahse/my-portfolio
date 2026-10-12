import React from 'react';
import CustomCursor from './components/ui/CustomCursor';
import Particles from './components/ui/Particles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white relative">
      <CustomCursor />

      {/* Whole Site Background Particles (Fixed High-Performance WebGL Canvas) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <Particles
          particleColors={["#a9a6a6"]}
          particleCount={5000}
          particleSpread={22}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
        {/* Subtle dark vignette overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/70 pointer-events-none" />
      </div>

      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
