import Link from 'next/link';

const projects = [
  { id: '01', title: 'E-Commerce Platform', category: 'Web Development', tech: ['Next.js', 'Stripe', 'Supabase'] },
  { id: '02', title: 'Brand Identity System', category: 'Brand Design', tech: ['Figma', 'Illustrator'] },
  { id: '03', title: 'SaaS Dashboard', category: 'UI/UX Design', tech: ['React', 'TypeScript', 'Tailwind'] },
  { id: '04', title: 'Marketing Campaign', category: 'Digital Marketing', tech: ['Meta Ads', 'Google Ads', 'Analytics'] },
  { id: '05', title: 'Mobile App Design', category: 'App Design', tech: ['Figma', 'Prototyping'] },
  { id: '06', title: 'Corporate Website', category: 'Web Development', tech: ['Next.js', 'CMS', 'SEO'] },
];

const categoryColors: Record<string, string> = {
  'Web Development': '#C9A84C',
  'Brand Design': '#8B5CF6',
  'UI/UX Design': '#06B6D4',
  'Digital Marketing': '#10B981',
  'App Design': '#F59E0B',
  'Full Stack': '#EF4444',
};

export default function Portfolio() {
  return (
    <section className="py-24 px-6 bg-black" id="portfolio">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>PORTFOLIO</p>
            <h2 className="font-serif text-5xl font-normal text-white">
              Selected <span className="italic">Work</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-medium transition-colors hover:opacity-80 hidden md:flex items-center gap-2"
            style={{ color: '#C9A84C' }}
          >
            View All &rarr;
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-black p-8 hover:bg-[#0a0a0a] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-xs font-medium px-3 py-1"
                  style={{
                    backgroundColor: (categoryColors[project.category] || '#C9A84C') + '15',
                    color: categoryColors[project.category] || '#C9A84C',
                  }}
                >
                  {project.category}
                </span>
                <span className="text-4xl font-bold" style={{ color: 'rgba(255,255,255,0.06)' }}>
                  {project.id}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-white mb-4 group-hover:text-gray-100 transition-colors">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 text-gray-500 border border-white/8">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/portfolio"
                className="text-xs font-medium transition-colors hover:opacity-70"
                style={{ color: '#C9A84C' }}
              >
                View Category &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/portfolio"
            className="inline-block px-6 py-3 text-sm font-medium text-black rounded-sm"
            style={{ backgroundColor: '#C9A84C' }}
          >
            View All Projects &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
