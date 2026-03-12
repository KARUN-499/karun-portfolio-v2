'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#0A0A0A] flex items-center relative overflow-hidden" id="home">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B6B5A]/10 via-transparent to-transparent pointer-events-none"/>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#1B6B5A]/5 rounded-full blur-3xl pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-[#1B6B5A] rounded-full animate-pulse"/>
            <p className="font-sans text-xs tracking-widest text-gray-400 uppercase">Available for new projects &middot; 2026</p>
          </div>
          <h1 className="font-sans text-[64px] lg:text-[80px] leading-none font-bold text-white mb-8">
            Where Ideas<br />
            <span className="text-[#1B6B5A]">Become</span><br />
            Results
          </h1>
          <p className="font-sans text-lg text-gray-400 max-w-md mb-10 leading-relaxed">
            Multi-sector freelancer and project manager delivering high-impact outcomes across web, brand, operations, and digital strategy. I don&apos;t just execute &mdash; I lead.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#booking" className="btn-primary">Book a Project &rarr;</Link>
            <Link href="#portfolio" className="btn-outline">View My Work</Link>
          </div>
          {/* Stats */}
          <div className="flex gap-12 mt-16">
            <div>
              <p className="font-sans text-4xl font-bold text-white">120+</p>
              <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mt-1">Projects Delivered</p>
            </div>
            <div>
              <p className="font-sans text-4xl font-bold text-white">8yr</p>
              <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mt-1">Experience</p>
            </div>
            <div>
              <p className="font-sans text-4xl font-bold text-white">98%</p>
              <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
        {/* Right card */}
        <div className="hidden lg:flex justify-center">
          <div className="border border-white/10 bg-[#111111] p-10 w-80">
            <p className="font-sans text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Freelancer &amp; Project Manager</p>
            <p className="font-sans text-5xl font-bold text-white mb-6">Karun</p>
            <div className="border-t border-white/10 pt-6">
              <p className="font-sans text-2xl font-bold text-white">8+ YEARS</p>
              <p className="font-sans text-sm text-gray-400 mt-2">Multi-sector expertise across web, brand &amp; operations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
