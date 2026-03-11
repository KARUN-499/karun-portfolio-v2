export default function MarqueeBanner() {
  const skills = ['Web Design', 'Project Management', 'Branding', 'E-Commerce', 'SEO', 'Strategy', 'Leadership', 'Operations'];
  const doubled = [...skills, ...skills];
  return (
    <div className="bg-[#1B6B5A] py-4 overflow-hidden">
      <div className="marquee-track">
        {doubled.map((s, i) => (
          <span key={i} className="font-mono text-xs tracking-widest text-[#F5F0E8] uppercase mx-8 whitespace-nowrap">
            {s} <span className="text-[#C9A84C] mx-4">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
