import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { allProjects, categoryColors } from '@/lib/projects';

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const color = categoryColors[project.category] || '#C9A84C';
  const related = allProjects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3);

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
          <span className="text-gray-700">/</span>
          <Link href="/portfolio" className="text-gray-500 hover:text-white transition-colors">Portfolio</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-300">{project.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Main Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-xs font-medium px-3 py-1"
                style={{ backgroundColor: color + '18', color }}
              >
                {project.category}
              </span>
              <span className="text-xs text-gray-600">{project.year}</span>
              <span className="text-xs text-gray-600">{project.duration}</span>
            </div>

            <h1 className="font-serif text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.fullDescription}
            </p>

            {/* Tech Stack */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Tech & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span key={t} className="px-4 py-2 border border-white/10 text-gray-300 text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Deliverables</h3>
              <ul className="space-y-3">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <div className="border border-white/8 p-6" style={{ backgroundColor: '#0a0a0a' }}>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-5">Project Info</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Client</div>
                  <div className="text-white text-sm">{project.client}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Category</div>
                  <div className="text-sm" style={{ color }}>{project.category}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Duration</div>
                  <div className="text-white text-sm">{project.duration}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Year</div>
                  <div className="text-white text-sm">{project.year}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Status</div>
                  <div className="text-green-400 text-sm">{project.status}</div>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="border p-6" style={{ backgroundColor: color + '08', borderColor: color + '30' }}>
              <h3 className="text-xs uppercase tracking-widest mb-5" style={{ color }}>Results Achieved</h3>
              <ul className="space-y-4">
                {project.results.map((r) => (
                  <li key={r} className="text-white text-sm leading-relaxed">
                    <span className="text-xl font-bold block" style={{ color }}>
                      {r.split(' ')[0]}
                    </span>
                    <span className="text-gray-400 text-xs">{r.split(' ').slice(1).join(' ')}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/booking"
              className="block w-full text-center py-4 font-medium text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              Start a Similar Project &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="px-6 max-w-7xl mx-auto pb-24">
          <div className="border-t border-white/8 pt-12">
            <h2 className="font-serif text-3xl font-normal text-white mb-8">
              More <span className="italic">{project.category}</span> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/portfolio/${r.slug}`}
                  className="group block border border-white/5 p-6 hover:border-white/15 transition-all"
                  style={{ backgroundColor: '#0a0a0a' }}
                >
                  <div className="text-3xl font-bold mb-4" style={{ color: 'rgba(255,255,255,0.06)' }}>{r.id}</div>
                  <h3 className="font-serif text-lg text-white mb-2 group-hover:text-gray-200 transition-colors">{r.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{r.description}</p>
                  <span className="text-xs font-medium" style={{ color }}>
                    View Project &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to portfolio */}
      <div className="px-6 max-w-7xl mx-auto pb-12">
        <Link href="/portfolio" className="text-sm text-gray-500 hover:text-white transition-colors">
          &larr; Back to All Projects
        </Link>
      </div>

      <Footer />
    </main>
  );
}
