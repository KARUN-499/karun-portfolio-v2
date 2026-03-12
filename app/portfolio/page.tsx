'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const allProjects = [
  {
    id: '01',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and real-time analytics dashboard.',
    tech: ['Next.js', 'Stripe', 'Supabase'],
    year: '2025',
    status: 'Completed',
  },
  {
    id: '02',
    title: 'Brand Identity System',
    category: 'Brand Design',
    description: 'Complete brand identity including logo, typography, color palette, and comprehensive brand guidelines.',
    tech: ['Figma', 'Illustrator'],
    year: '2025',
    status: 'Completed',
  },
  {
    id: '03',
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Complex data visualization dashboard with real-time updates, custom charts, and role-based access control.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    year: '2024',
    status: 'Completed',
  },
  {
    id: '04',
    title: 'Marketing Campaign',
    category: 'Digital Marketing',
    description: 'Multi-channel digital marketing campaign with Meta Ads, Google Ads, and performance analytics.',
    tech: ['Meta Ads', 'Google Ads', 'Analytics'],
    year: '2024',
    status: 'Completed',
  },
  {
    id: '05',
    title: 'Mobile App Design',
    category: 'App Design',
    description: 'End-to-end mobile app UI/UX design with user research, wireframes, prototypes, and developer handoff.',
    tech: ['Figma', 'Prototyping'],
    year: '2025',
    status: 'Completed',
  },
  {
    id: '06',
    title: 'Corporate Website',
    category: 'Web Development',
    description: 'Professional corporate website with CMS integration, SEO optimization, and multi-language support.',
    tech: ['Next.js', 'CMS', 'SEO'],
    year: '2024',
    status: 'Completed',
  },
  {
    id: '07',
    title: 'Social Media Strategy',
    category: 'Digital Marketing',
    description: 'Comprehensive social media strategy with content calendars, growth tactics, and monthly reporting.',
    tech: ['Instagram', 'LinkedIn', 'Analytics'],
    year: '2025',
    status: 'Completed',
  },
  {
    id: '08',
    title: 'Product Landing Page',
    category: 'Web Development',
    description: 'High-converting product landing page with A/B testing, animations, and performance optimization.',
    tech: ['Next.js', 'Framer Motion', 'Vercel'],
    year: '2025',
    status: 'Completed',
  },
  {
    id: '09',
    title: 'Logo & Visual Identity',
    category: 'Brand Design',
    description: 'Modern logo design with full visual identity system for a tech startup.',
    tech: ['Illustrator', 'Figma'],
    year: '2024',
    status: 'Completed',
  },
  {
    id: '10',
    title: 'Project Management System',
    category: 'Full Stack',
    description: 'Custom project management tool with task tracking, team collaboration, and timeline visualization.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    year: '2025',
    status: 'Completed',
  },
  {
    id: '11',
    title: 'Restaurant App',
    category: 'App Design',
    description: 'Food ordering app with menu management, table reservations, and delivery tracking.',
    tech: ['Figma', 'React Native'],
    year: '2024',
    status: 'Completed',
  },
  {
    id: '12',
    title: 'SEO & Content Strategy',
    category: 'Digital Marketing',
    description: 'Technical SEO audit, keyword strategy, and content marketing plan that tripled organic traffic.',
    tech: ['SEO', 'Content', 'Analytics'],
    year: '2025',
    status: 'Completed',
  },
];

const categories = ['All', 'Web Development', 'Brand Design', 'UI/UX Design', 'Digital Marketing', 'App Design', 'Full Stack'];

const categoryColors: Record<string, string> = {
  'Web Development': '#C9A84C',
  'Brand Design': '#8B5CF6',
  'UI/UX Design': '#06B6D4',
  'Digital Marketing': '#10B981',
  'App Design': '#F59E0B',
  'Full Stack': '#EF4444',
};

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
          <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
            Home
          </Link>
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
              Browse {allProjects.length}+ projects across web development, design, marketing, and more.
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

      {/* Category Filter */}
      <section className="px-6 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-sm border transition-all ${
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
          <div className="text-center py-24 text-gray-500">
            No projects in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="group rounded-sm border border-white/5 p-6 hover:border-white/15 transition-all duration-300"
                style={{ backgroundColor: '#0a0a0a' }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-sm"
                    style={{
                      backgroundColor: (categoryColors[project.category] || '#C9A84C') + '15',
                      color: categoryColors[project.category] || '#C9A84C',
                    }}
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
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 border border-white/8 text-gray-400 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-600 uppercase tracking-wide">{project.status}</span>
                  <Link
                    href="/booking"
                    className="text-xs font-medium transition-colors hover:opacity-80"
                    style={{ color: '#C9A84C' }}
                  >
                    Similar Project &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-6 max-w-7xl mx-auto pb-24 text-center">
        <div className="border border-white/8 rounded-sm p-12" style={{ backgroundColor: '#0a0a0a' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>START A PROJECT</p>
          <h2 className="font-serif text-4xl font-normal text-white mb-4">
            Have a similar project in mind?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Let\'s work together to bring your vision to life. I deliver high-quality results on time.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-3 font-medium text-black rounded-sm"
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
