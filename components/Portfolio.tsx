import Link from 'next/link';

const projects = [
  { id: '01', title: 'E-Commerce Platform', category: 'Web Development', tech: ['Next.js', 'Stripe', 'Supabase'] },
  { id: '02', title: 'Brand Identity System', category: 'Brand Design', tech: ['Figma', 'Illustrator'] },
  { id: '03', title: 'SaaS Dashboard', category: 'UI/UX Design', tech: ['React', 'TypeScript', 'Tailwind'] },
  { id: '04', title: 'Marketing Campaign', category: 'Digital Marketing', tech: ['Meta Ads', 'Google Ads', 'Analytics'] },
  { id: '05', title: 'Mobile App Design', category: 'App Design', tech: ['Figma', 'Prototyping'] },
  { id: '06', title: 'Corporate Website', category: 'Web Development', tech: ['Next.js', 'CMS', 'SEO'] },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-[#0A0A0A] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-sans text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Portfolio</p>
            <h2 className="font-sans text-5xl lg:text-6xl font-bold text-white">Selected <em className="italic font-light">Work</em></h2>
          </div>
          <Link href="/portfolio" className="hidden md:block font-sans text-sm text-gray-400 hover:text-white transition-colors">View All →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {projects.map(p => (
            <div key={p.id} className="bg-[#0A0A0A] p-8 hover:bg-[#111111] transition-colors group cursor-pointer">
              <p className="font-mono text-xs text-gray-600 mb-4">{p.id}</p>
              <h3 className="font-sans text-xl font-bold text-white mb-2 group-hover:text-[#1B6B5A] transition-colors">{p.title}</h3>
              <p className="font-sans text-sm text-gray-500 mb-6">{p.category}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="text-xs font-sans text-gray-500 border border-white/10 px-2 py-1">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
