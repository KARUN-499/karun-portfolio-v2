'use client';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen bg-black flex items-center relative overflow-hidden" id="home">
      <div className="max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="font-serif text-6xl lg:text-7xl font-normal text-white leading-tight mb-6">
              Where Ideas<br />
              <span className="italic">Become</span> Results
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-lg">
              Multi-sector freelancer and project manager delivering high-impact outcomes.
            </p>
            <div className="flex flex-row gap-4">
              <Link
                href="/booking"
                className="px-7 py-3 font-medium text-black rounded-sm transition-all"
                style={{ backgroundColor: '#C9A84C' }}
              >
                Book a Project &rarr;
              </Link>
              <Link
                href="#portfolio"
                className="px-7 py-3 font-medium text-white border border-white rounded-sm hover:bg-white hover:text-black transition-all"
              >
                View My Work
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-12 mt-16">
              <div>
                <div className="text-4xl font-bold text-white">30+</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">3yr</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">98%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
          {/* Right Card */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="rounded-2xl p-10 text-center" style={{ backgroundColor: '#111111', minWidth: '220px' }}>
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-4 leading-relaxed">
                FREELANCER &amp;<br />PROJECT MANAGER /
              </div>
              <div className="font-serif text-6xl font-normal text-white mb-4">Karun</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">3+ YEARS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
