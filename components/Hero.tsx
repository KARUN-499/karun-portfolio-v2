'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#F5F0E8] flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <p className="font-mono text-sm tracking-[0.2em] text-[#1B6B5A] mb-6 uppercase">
            Available for new projects &middot; 2026
          </p>
          <h1 className="font-serif text-[72px] lg:text-[96px] leading-none font-light text-[#0D0D0D] mb-8">
            Where Ideas
            <br />
            <span className="italic">Become</span>
            <br />
            Results
          </h1>
          <p className="font-sans text-lg text-gray-600 max-w-md mb-10 leading-relaxed">
            Multi-sector freelancer and project manager delivering high-impact outcomes across web, brand, operations, and digital strategy. I don&apos;t just execute &mdash; I lead.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="#booking" className="btn-primary">
              Book a Project &rarr;
            </Link>
            <Link href="#portfolio" className="btn-outline">
              View My Work
            </Link>
          </div>
          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <p className="font-serif text-5xl font-light text-[#0D0D0D]">120+</p>
              <p className="font-mono text-xs tracking-widest text-gray-500 uppercase mt-1">Projects Delivered</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-light text-[#0D0D0D]">8yr</p>
              <p className="font-mono text-xs tracking-widest text-gray-500 uppercase mt-1">Experience</p>
            </div>
            <div>
              <p className="font-serif text-5xl font-light text-[#0D0D0D]">98%</p>
              <p className="font-mono text-xs tracking-widest text-gray-500 uppercase mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
        {/* Right card */}
        <div className="hidden lg:flex justify-end">
          <div className="w-80 h-[480px] bg-[#0D0D0D] rounded-none p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#1B6B5A] opacity-20 rounded-full translate-x-20 -translate-y-20" />
            <div>
              <p className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase mb-4">Freelancer & Project Manager</p>
              <p className="font-serif text-4xl text-white font-light">Karun</p>
            </div>
            <div className="border-l-2 border-[#1B6B5A] pl-4">
              <p className="font-mono text-xs text-gray-400 tracking-wide">8+ YEARS</p>
              <p className="font-sans text-sm text-white mt-1">Multi-sector expertise across web, brand & operations</p>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="font-mono text-xs tracking-widest text-gray-400 uppercase">Scroll</p>
        <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>
    </section>
  );
}
