const skills = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Figma', 'SEO', 'Brand Strategy', 'Project Management'];

export default function About() {
  return (
    <section id="about" className="bg-[#111111] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-sans text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">About</p>
            <h2 className="font-sans text-5xl font-bold text-white mb-8">Building Digital <em className="italic font-light">Excellence</em></h2>
            <p className="font-sans text-gray-400 leading-relaxed mb-6">
              I&apos;m Karun, a multi-sector freelancer and project manager with 8+ years of experience. I specialize in creating digital experiences that drive real business results.
            </p>
            <p className="font-sans text-gray-400 leading-relaxed mb-10">
              From stunning websites to powerful marketing campaigns, I combine technical expertise with strategic thinking to deliver outcomes that exceed expectations.
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="border border-white/10 text-gray-300 text-xs font-sans px-4 py-2 hover:border-[#1B6B5A]/50 transition-colors">{skill}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Projects Completed', value: '120+' },
              { label: 'Happy Clients', value: '85+' },
              { label: 'Years Experience', value: '8+' },
              { label: 'Client Satisfaction', value: '98%' },
            ].map(stat => (
              <div key={stat.label} className="border border-white/10 bg-[#0A0A0A] p-8 text-center hover:border-[#1B6B5A]/50 transition-colors">
                <p className="font-sans text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="font-sans text-xs text-gray-500 tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
