const testimonials = [
  { author: 'Sarah Mitchell', title: 'CEO, TechVentures', content: 'Karun delivered our landing page 3 days ahead of schedule. Conversion rate jumped 40% in the first month. Exceptional work.', rating: 5 },
  { author: 'James Okonkwo', title: 'Founder, StyleHub', content: 'From brief to launch in 5 weeks for a full e-commerce platform. Karun managed everything — design, dev, and Stripe integration. Outstanding.', rating: 5 },
  { author: 'Priya Sharma', title: 'Marketing Director, ConsultPro', content: 'Professional, communicative, and the final result exceeded our expectations. Our new site generates 3x more inquiries.', rating: 5 },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F5F0E8]">
      <div className="section">
        <div className="mb-16 fade-up">
          <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Testimonials</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-light text-[#0D0D0D]">
            What Clients <span className="italic">Say</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card fade-up bg-white">
              <div className="flex gap-0.5 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-[#C9A84C] text-sm">&#9733;</span>
                ))}
              </div>
              <p className="font-sans text-base text-gray-700 leading-relaxed mb-8 italic">&ldquo;{t.content}&rdquo;</p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-sans font-semibold text-[#0D0D0D]">{t.author}</p>
                <p className="font-mono text-xs tracking-wide text-[#1B6B5A] mt-1">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
