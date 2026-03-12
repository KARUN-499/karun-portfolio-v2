'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { allProjects, categories, categoryColors } from '@/lib/projects';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">Home</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300 text-sm">Portfolio</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>MY WORK</p>
            <h1 className="font-serif text-5xl lg:text-6xl font-normal text-white">
              All <span className="italic">Projects</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-xl">
              Browse {allProjects.length}+ projects. Click any project to see full details.
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white">{filtered.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              {activeCategory === 'All' ? 'Total Projects' : activeCategory}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? 'text-black border-transparent'
                  : 'text-gray-400 border-white/10 hover:border-white/30 hover:text-white bg-transparent'
              }`}
              style={activeCategory === cat ? { backgroundColor: '#C9A84C', borderColor: '#C9A84C' } : {}}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-2 text-xs opacity-60">
                  ({allProjects.filter(p => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-500">No projects in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => {
              const color = categoryColors[project.category] || '#C9A84C';
              return (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="group block rounded-sm border border-white/5 p-6 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: '#0a0a0a' }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-xs font-medium px-3 py-1"
                      style={{ backgroundColor: color + '15', color }}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-600">{project.year}</span>
                  </div>

                  {/* Number */}
                  <div className="text-5xl font-bold mb-3" style={{ color: 'rgba(255,255,255,0.04)' }}>
                    {project.id}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-normal text-white mb-3 group-hover:text-gray-100 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs px-2 py-1 border border-white/8 text-gray-400">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs px-2 py-1 text-gray-600">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-600 uppercase tracking-wide">{project.duration}</span>
                    <span className="text-xs font-medium group-hover:opacity-80 transition-opacity" style={{ color }}>
                      View Details &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-6 max-w-7xl mx-auto pb-24 text-center">
        <div className="border border-white/8 p-12" style={{ backgroundColor: '#0a0a0a' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>START A PROJECT</p>
          <h2 className="font-serif text-4xl font-normal text-white mb-4">Have a similar project in mind?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Let&apos;s work together to deliver high-quality results on time.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-3 font-medium text-black"
            style={{ backgroundColor: '#C9A84C' }}
          >
            Book a Free Consultation &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
