'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PortfolioItem {
  id: string
  title: string
  slug: string
  category: string
  description: string
  tags: string[]
  imageUrl: string | null
  liveUrl: string | null
  githubUrl: string | null
  featured: boolean
  order: number
}

const categoryColors: Record<string, string> = {
  'Web Development': '#C9A84C',
  'Brand Design': '#BB5CF6',
  'UI/UX Design': '#06B6D4',
  'Digital Marketing': '#10B981',
  'App Design': '#F59E0B',
  'Full Stack': '#EF4444',
  'General': '#C9A84C',
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [categories, setCategories] = useState<string[]>(['All'])

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(d => {
        const items: PortfolioItem[] = d.items || []
        setProjects(items)
        const cats = ['All', ...Array.from(new Set(items.map(p => p.category).filter(Boolean)))]
        setCategories(cats as string[])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

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
              {loading ? 'Loading projects...' : `Browse ${projects.length} project${projects.length !== 1 ? 's' : ''}. Click any project to see full details.`}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white">{filtered.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
              {activeCategory === 'All' ? 'Total Projects' : activeCategory}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-10">
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
              {cat}{cat !== 'All' && (
                <span className="ml-1 opacity-60">({projects.filter(p => p.category === cat).length})</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 max-w-7xl mx-auto pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="border border-white/10 animate-pulse">
                <div className="aspect-video bg-white/5" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                  <div className="h-5 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 font-mono text-sm mb-2">No projects found.</p>
            {projects.length === 0 && (
              <p className="text-gray-600 text-xs font-mono">Add projects from the admin panel to display them here.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => {
              const color = categoryColors[project.category] || '#C9A84C'
              return (
                <Link
                  key={project.id}
                  href={project.liveUrl || `/portfolio/${project.slug}`}
                  target={project.liveUrl ? '_blank' : undefined}
                  className="group border border-white/10 hover:border-white/30 transition-all duration-300 block"
                >
                  {/* Image */}
                  <div className="aspect-video bg-white/5 overflow-hidden relative">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-mono text-xs" style={{ color }}>{project.category}</span>
                      </div>
                    )}
                    {project.featured && (
                      <span className="absolute top-3 right-3 text-xs font-mono px-2 py-1 bg-black/70 text-yellow-400 border border-yellow-400/30">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs uppercase tracking-wider" style={{ color }}>
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-gray-600">#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-sans font-bold text-white text-lg mb-2 group-hover:text-[#C9A84C] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-sans line-clamp-2 mb-4">{project.description}</p>

                    {/* Tags */}
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 4).map((tag: string) => (
                          <span key={tag} className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-xs font-mono text-gray-600">+{project.tags.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      {project.liveUrl && (
                        <span className="text-xs font-mono text-[#C9A84C] group-hover:underline">
                          View Live →
                        </span>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-xs font-mono text-gray-500 hover:text-white transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="text-xs font-mono text-gray-600">View Details →</span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      {!loading && (
        <section className="px-6 max-w-7xl mx-auto pb-20">
          <div className="border border-white/10 p-10 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">START A PROJECT</p>
            <h2 className="font-serif text-3xl font-normal text-white mb-4">
              Have a similar project in mind?
            </h2>
            <p className="text-gray-400 mb-8">Let&apos;s work together to deliver high-quality results on time.</p>
            <Link
              href="/booking"
              className="inline-block bg-[#C9A84C] text-black px-8 py-3 font-mono text-sm hover:bg-[#b8962e] transition-colors"
            >
              Book a Free Consultation →
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
