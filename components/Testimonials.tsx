const testimonials = [
  { name: 'Rahul Sharma', role: 'Startup Founder', text: 'Karun delivered our website in record time with outstanding quality. His attention to detail and communication were exceptional.' },
  { name: 'Priya Patel', role: 'Marketing Director', text: 'The brand identity Karun created perfectly captures our company vision. Highly recommend his creative expertise.' },
  { name: 'Amit Kumar', role: 'E-commerce Owner', text: 'Our conversion rate doubled after Karun redesigned our store. ROI was immediate and significant.' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#111111] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-sans text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Testimonials</p>
          <h2 className="font-sans text-5xl lg:text-6xl font-bold text-white">Client <em className="italic font-light">Stories</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="border border-white/10 bg-[#0A0A0A] p-8 hover:border-[#1B6B5A]/50 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#C9A84C]">&#9733;</span>
                ))}
              </div>
              <p className="font-sans text-gray-300 leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-white/10 pt-6">
                <p className="font-sans font-bold text-white">{t.name}</p>
                <p className="font-sans text-xs text-gray-500 tracking-widest uppercase mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
