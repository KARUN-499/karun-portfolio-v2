import Link from 'next/link';

const services = [
  {
    id: '01',
    title: 'Landing Page',
    duration: '5-7 Days',
    price: '500',
    features: ['Custom design', 'Mobile responsive', 'SEO optimized', 'Contact form'],
    description: 'High-converting single page for your business or launch.',
  },
  {
    id: '02',
    title: 'Business Website',
    duration: '2-3 Weeks',
    price: '1,500',
    features: ['Up to 8 pages', 'CMS integration', 'SEO', 'Admin dashboard'],
    description: 'Professional multi-page website with CMS.',
    popular: true,
  },
  {
    id: '03',
    title: 'Brand Identity',
    duration: '1-2 Weeks',
    price: '800',
    features: ['Logo design', 'Brand guidelines', 'Color palette', 'Typography'],
    description: 'Complete visual identity for your brand.',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0A0A0A] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-sans text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Services</p>
          <h2 className="font-sans text-5xl lg:text-6xl font-bold text-white">What I <em className="italic font-light">Offer</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(s => (
            <div key={s.id} className={`relative border p-8 transition-all duration-300 hover:border-[#1B6B5A]/60 ${
              s.popular ? 'border-[#1B6B5A] bg-[#1B6B5A]/5' : 'border-white/10 bg-[#111111]'
            }`}>
              {s.popular && (
                <span className="absolute top-4 right-4 bg-[#1B6B5A] text-white text-xs font-sans tracking-widest uppercase px-3 py-1">Popular</span>
              )}
              <p className="font-mono text-xs tracking-widest text-gray-500 uppercase mb-2">{s.duration}</p>
              <h3 className="font-sans text-2xl font-bold text-white mb-3">{s.title}</h3>
              <p className="font-sans text-sm text-gray-400 mb-6">{s.description}</p>
              <ul className="space-y-2 mb-8">
                {s.features.map(f => (
                  <li key={f} className="font-sans text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-[#1B6B5A]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                <div>
                  <p className="font-sans text-xs text-gray-500 uppercase tracking-widest">From</p>
                  <p className="font-sans text-2xl font-bold text-white">₹{s.price}</p>
                </div>
                <Link href="#booking" className="bg-[#1B6B5A] text-white px-5 py-2 font-sans text-sm hover:bg-[#154f43] transition-colors">Book Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
