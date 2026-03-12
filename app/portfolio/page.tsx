import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const categories = ['All', 'Web Design', 'Web Development', 'Full Stack', 'UI/UX']

export const revalidate = 60

export default async function PortfolioPage() {
  const { data: projects } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">My Work</p>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">Portfolio <span className="text-[#1B6B5A]">Projects</span></h1>
          <p className="text-gray-400 font-sans mb-12 max-w-xl">A collection of projects I&apos;ve designed and built for clients across various industries.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 ? (
              projects.map((project: any) => (
                <Link href={`/portfolio/${project.id}`} key={project.id}
                  className="group block border border-white/10 hover:border-[#1B6B5A]/50 transition-all duration-300 bg-white/5">
                  <div className="aspect-video bg-gradient-to-br from-[#1B6B5A]/20 to-black/50 flex items-center justify-center overflow-hidden">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="font-mono text-xs text-gray-500">{project.category || 'Project'}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-xs text-[#1B6B5A] uppercase tracking-widest">{project.category}</span>
                    <h3 className="text-lg font-sans font-bold mt-2 mb-2 group-hover:text-[#1B6B5A] transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm font-sans line-clamp-2">{project.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-500">View Project</span>
                      <span className="text-[#1B6B5A] group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 text-gray-500">
                <p className="font-mono text-sm">No projects yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
