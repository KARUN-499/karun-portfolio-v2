import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { allProjects, categoryColors } from '@/lib/projects';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Not Found' };
  return { title: `${project.title} | Karun Portfolio` };
}

export default function ProjectPage({ params }: Props) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const color = (categoryColors as Record<string, string>)[project.category] ?? '#C9A84C';
  const related = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
          <span className="text-gray-700">/</span>
          <Link href="/portfolio" className="text-gray-500 hover:text-white transition-colors">Portfolio</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-300">{project.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left */}
          <div className="flex-1">
            <span className="inline-block text-xs font-medium px-3 py-1 mb-6"
              style={{ backgroundColor: color + '18', color }}>
              {project.category}
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl font-normal text-white leading-tight mb-6">
              {project.title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">{project.fullDescription}</p>

            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((t) => (
                  <span key={t} className="px-4 py-2 border border-white/10 text-gray-300 text-sm">{t}</span>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Deliverables</h3>
              <ul className="space-y-2">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Info Card */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="border border-white/8 p-6 sticky top-32" style={{ backgroundColor: '#0a0a0a' }}>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Project Details</h3>
              <div className="space-y-5">
                {[
                  { label: 'Client', value: project.client, style: { color: '#fff' } },
                  { label: 'Category', value: project.category, style: { color } },
                  { label: 'Year', value: project.year, style: { color: '#fff' } },
                  { label: 'Duration', value: project.duration, style: { color: '#fff' } },
                  { label: 'Status', value: project.status, style: { color: '#10B981' } },
                ].map(({ label, value, style }) => (
                  <div key={label}>
                    <div className="text-xs text-gray-600 mb-1">{label}</div>
                    <div className="text-sm font-medium" style={style}>{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/8 space-y-3">
                <Link href="/booking"
                  className="w-full block text-center py-3 text-sm font-medium text-black"
                  style={{ backgroundColor: color }}>
                  Book Similar Project
                </Link>
                <Link href="/portfolio"
                  className="w-full block text-center py-3 text-sm text-gray-400 hover:text-white transition-colors">
                  &larr; All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 max-w-7xl mx-auto py-16 border-t border-white/5">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8">Results Achieved</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.results.map((result, i) => (
            <div key={i} className="p-6 border border-white/8" style={{ backgroundColor: '#0a0a0a' }}>
              <div className="w-2 h-2 rounded-full mb-4" style={{ backgroundColor: color }} />
              <p className="text-white font-medium text-sm leading-relaxed">{result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-6 max-w-7xl mx-auto py-16 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs uppercase tracking-widest text-gray-500">More {project.category} Projects</h2>
            <Link href="/portfolio" className="text-xs hover:opacity-70 transition-opacity" style={{ color }}>
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`}
                className="group block p-6 border border-white/8 hover:border-white/20 transition-all"
                style={{ backgroundColor: '#0a0a0a' }}>
                <span className="text-xs font-medium mb-4 block" style={{ color }}>{p.category}</span>
                <h3 className="font-serif text-xl font-normal text-white group-hover:opacity-80 transition-opacity mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 max-w-7xl mx-auto py-16 pb-24">
        <div className="border border-white/8 p-12 text-center" style={{ backgroundColor: '#0a0a0a' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color }}>START YOUR PROJECT</p>
          <h2 className="font-serif text-4xl font-normal text-white mb-4">Have a similar project?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm">
            I deliver the same quality for every client. Let&apos;s talk today.
          </p>
          <Link href="/booking"
            className="inline-block px-8 py-3 font-medium text-black"
            style={{ backgroundColor: color }}>
            Book a Free Consultation &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
