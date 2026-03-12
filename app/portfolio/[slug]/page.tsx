import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { allProjects, categoryColors } from '@/lib/projects';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return { title: 'Not Found' };
  return { title: `${project.title} | Karun Portfolio` };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
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
          <span style={{ color }}>{project.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-widest mb-4 block" style={{ color }}>
              {project.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-white mb-6">
              {project.title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.fullDescription}
            </p>

            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 border text-sm" style={{ borderColor: color + '40', color }}>
                  {t}
                </span>
              ))}
            </div>

            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Deliverables</h3>
            <ul className="space-y-2 mb-8">
              {project.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: color }}></span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Info Card */}
          <div className="lg:col-span-1">
            <div className="border border-white/8 p-6" style={{ backgroundColor: '#0a0a0a' }}>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6">Project Details</h3>
              {[
                { label: 'Client', value: project.client, style: { color: '#fff' } },
                { label: 'Category', value: project.category, style: { color } },
                { label: 'Year', value: project.year, style: { color: '#fff' } },
                { label: 'Duration', value: project.duration, style: { color: '#fff' } },
                { label: 'Status', value: project.status, style: { color: '#10B981' } },
              ].map(({ label, value, style }) => (
                <div key={label} className="flex justify-between py-3 border-b border-white/5 last:border-0">
                  <span className="text-gray-500 text-sm">{label}</span>
                  <span className="text-sm font-medium" style={style}>{value}</span>
                </div>
              ))}
              <div className="mt-6 space-y-3">
                <Link
                  href="/booking"
                  className="block w-full text-center py-3 text-sm font-medium text-black"
                  style={{ backgroundColor: color }}
                >
                  Book Similar Project
                </Link>
                <Link
                  href="/portfolio"
                  className="block w-full text-center py-3 text-sm border border-white/20 text-white hover:border-white/40 transition-colors"
                >
                  ← All Projects
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
            <div key={i} className="border border-white/8 p-6" style={{ backgroundColor: '#0a0a0a' }}>
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
            <h2 className="text-xs uppercase tracking-widest text-gray-500">
              More {project.category} Projects
            </h2>
            <Link href="/portfolio" className="text-xs hover:opacity-70" style={{ color }}>
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block p-6 border border-white/8 hover:border-white/20 transition-all"
                style={{ backgroundColor: '#0a0a0a' }}
              >
                <span className="text-xs font-medium mb-4 block" style={{ color }}>
                  {p.category}
                </span>
                <h3 className="font-serif text-xl font-normal text-white group-hover:opacity-80 mb-2">
                  {p.title}
                </h3>
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
            I deliver the same quality for every client. Let's talk today.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-3 font-medium text-black"
            style={{ backgroundColor: color }}
          >
            Book a Free Consultation &rarr;
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
