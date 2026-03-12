const items = ['Web Development', 'Brand Design', 'Digital Strategy', 'Project Management', 'UI/UX Design', 'SEO Optimization', 'E-commerce', 'Marketing'];

export default function MarqueeBanner() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#1B6B5A] py-4 overflow-hidden">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="font-sans text-sm font-medium text-white tracking-widest uppercase px-8 whitespace-nowrap">
            {item} <span className="text-white/40 mx-4">&#8212;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
