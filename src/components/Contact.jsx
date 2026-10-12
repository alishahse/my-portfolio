import React, { useState } from 'react';
import { Mail, Phone, MapPin, Check, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/* Same border / hover glow as the Skills cards */
const CARD_BORDER =
  'hover:shadow-[0_30px_80px_-25px_rgba(99,102,241,0.45)]';

// Icon box (same as Skills card icon)
const ICON_WRAP =
  'relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-500 bg-indigo-500/10 text-indigo-500 transition-all duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white motion-reduce:transition-none motion-reduce:group-hover:transform-none';

const ITEM_TEXT =
  'text-sm font-medium text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:text-base';

const INPUT_CLASS =
  'w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500';

export default function Contact() {
  const { personalInfo } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-slate-950/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column */}
          <div className="space-y-8 text-left lg:col-span-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-500">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
                Get In Touch
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                We&apos;d Love to Hear <br />
                <span className="text-indigo-500">From You</span>
              </h2>
              <p className="mt-[13px] sm:mt-[17px] max-w-md text-base leading-relaxed text-slate-200 sm:text-lg">
                Whether you have an upcoming web project, a frontend engineering opportunity, or just want to say hello — we&apos;re here.
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-4 pt-2">
              {/* Email */}
              <div className="group flex items-center gap-4">
                <div className={ICON_WRAP}>
                  <Mail className="h-5 w-5" />
                </div>
                <a href={`mailto:${personalInfo.email}`} className={ITEM_TEXT}>
                  {personalInfo.email}
                </a>
              </div>

              {/* Phone */}
              <div className="group flex items-center gap-4">
                <div className={ICON_WRAP}>
                  <Phone className="h-5 w-5" />
                </div>
                <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className={ITEM_TEXT}>
                  {personalInfo.phone}
                </a>
              </div>

              {/* Location */}
              <div className="group flex items-center gap-4">
                <div className={ICON_WRAP}>
                  <MapPin className="h-5 w-5" />
                </div>
                <span className={ITEM_TEXT}>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Right column: form card (Skills card style) */}
          <div
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/25 via-slate-900/80 to-slate-900/90 p-7 text-left shadow-xl backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-9 lg:col-span-6 ${CARD_BORDER}`}
          >
            {/* Soft indigo glow */}
            <div className="pointer-events-none absolute -top-16 -left-10 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/45" />

            {/* Glass shine sweep on hover */}
            <div className="pointer-events-none absolute -inset-y-10 -left-1/2 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[130%] group-hover:opacity-100" />

            <div className="relative z-10">
              {submitted ? (
                <div className="space-y-4 py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500 bg-indigo-500 text-white">
                    <Check className="h-7 w-7 stroke-[3]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message <span className="text-indigo-500">Sent!</span>
                  </h3>
                  <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-300 sm:text-sm">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been received. I&apos;ll get back to you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 inline-flex cursor-pointer items-center rounded-full border border-indigo-500 bg-indigo-500/10 px-6 py-3 text-sm font-bold tracking-wide text-indigo-500 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-300">Message</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${INPUT_CLASS} resize-none`}
                    />
                  </div>

                  {/* CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-indigo-500 bg-indigo-500 px-6 py-3.5 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-400"
                    >
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}