export default function About() {
  const skills = ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Supabase', 'Stripe', 'SEO', 'Project Management', 'Brand Strategy', 'E-Commerce', 'Operations', 'Leadership'];
  return (
    <section id="about" className="bg-white">
      <div className="section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="fade-up">
          <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">About</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-light text-[#0D0D0D] mb-6">
            A Leader Who<br /><span className="italic">Delivers</span>
          </h2>
          <p className="font-sans text-base text-gray-600 leading-relaxed mb-6">
            With 8+ years spanning web development, brand strategy, operations, and client management, I bring both technical depth and strategic clarity to every engagement. I don&apos;t just complete tasks — I own outcomes.
          </p>
          <p className="font-sans text-base text-gray-600 leading-relaxed mb-8">
            From solo consulting to leading multi-discipline teams, my approach is always the same: understand deeply, execute precisely, deliver consistently.
          </p>
          <div className="flex items-center gap-4 p-4 bg-[#F5F0E8] border-l-4 border-[#1B6B5A]">
            <div>
              <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">Experience</p>
              <p className="font-serif text-2xl text-[#0D0D0D]">8+ Years</p>
            </div>
          </div>
        </div>
        <div className="fade-up">
          <p className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-6">Skills & Expertise</p>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="font-mono text-xs tracking-wide bg-[#F5F0E8] text-[#1B6B5A] px-3 py-1.5 border border-[#1B6B5A]/20">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
