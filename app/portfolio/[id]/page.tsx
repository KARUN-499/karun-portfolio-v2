import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const revalidate = 60

export default async function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const { data: project } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!project) notFound()

  const { data: related } = await supabase
    .from('portfolio_items')
    .select('*')
    .neq('id', params.id)
    .limit(3)

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/portfolio" className="font-mono text-xs text-gray-500 hover:text-[#1B6B5A] transition-colors mb-8 inline-block">
            ← Back to Portfolio
          </Link>

          <span className="font-mono text-xs text-[#1B6B5A] uppercase tracking-widest block mb-4">{project.category}</span>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-6">{project.title}</h1>
          <p className="text-gray-400 font-sans mb-12 text-lg leading-relaxed">{project.description}</p>

          {project.image_url && (
            <div className="w-full aspect-video bg-black/50 mb-12 overflow-hidden">
              <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {project.client && (
              <div className="border border-white/10 p-6">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">Client</p>
                <p className="font-sans text-white">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div className="border border-white/10 p-6">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">Year</p>
                <p className="font-sans text-white">{project.year}</p>
              </div>
            )}
            {project.project_url && (
              <div className="border border-white/10 p-6">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">Live URL</p>
                <a href={project.project_url} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-[#1B6B5A] hover:underline truncate block">{project.project_url}</a>
              </div>
            )}
          </div>

          {project.long_description && (
            <div className="prose prose-invert max-w-none mb-16">
              <h2 className="text-2xl font-sans font-bold mb-4">About This Project</h2>
              <p className="text-gray-400 font-sans leading-relaxed whitespace-pre-line">{project.long_description}</p>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-sans font-bold mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="border border-[#1B6B5A]/30 text-[#1B6B5A] font-mono text-xs px-3 py-2 uppercase tracking-wider">{tech}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {project.project_url && (
              <a href={project.project_url} target="_blank" rel="noopener noreferrer"
                className="bg-[#1B6B5A] text-white px-8 py-3 font-sans text-sm hover:bg-[#154f43] transition-colors">
                View Live Project →
              </a>
            )}
            <Link href="/booking"
              className="border border-white/20 text-white px-8 py-3 font-sans text-sm hover:border-[#1B6B5A] transition-colors">
              Start a Similar Project
            </Link>
          </div>
        </div>

        {related && related.length > 0 && (
          <div className="max-w-6xl mx-auto mt-20">
            <h2 className="text-2xl font-sans font-bold mb-8">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p: any) => (
                <Link href={`/portfolio/${p.id}`} key={p.id}
                  className="group block border border-white/10 hover:border-[#1B6B5A]/50 transition-all">
                  <div className="aspect-video bg-[#1B6B5A]/10 flex items-center justify-center overflow-hidden">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <span className="font-mono text-xs text-gray-500">{p.category}</span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="font-mono text-xs text-[#1B6B5A]">{p.category}</span>
                    <h3 className="font-sans font-bold mt-1 group-hover:text-[#1B6B5A] transition-colors">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
