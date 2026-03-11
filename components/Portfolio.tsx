'use client';
import { useState } from 'react';

const projects = [
  { title: 'TechVentures Landing Page', category: 'Websites', tags: ['Next.js', 'Tailwind', 'Stripe'], description: 'High-converting SaaS landing page with animated hero.' },
  { title: 'Artisan Coffee Brand', category: 'Branding', tags: ['Logo Design', 'Shopify', 'Brand Identity'], description: 'Complete brand identity for specialty coffee company.' },
  { title: 'StyleHub Fashion Store', category: 'E-Commerce', tags: ['Next.js', 'Supabase', 'Stripe'], description: 'Full-featured fashion e-commerce with 500+ products.' },
  { title: 'ConsultPro Agency Site', category: 'Websites', tags: ['React', 'Node.js', 'PostgreSQL'], description: 'Professional consulting agency with booking system.' },
  { title: 'FreshMart Grocery App', category: 'E-Commerce', tags: ['React Native', 'Supabase', 'Maps API'], description: 'Online grocery store with real-time inventory.' },
  { title: 'NovaBrand Identity', category: 'Branding', tags: ['Figma', 'After Effects', 'Brand System'], description: 'Minimalist brand system for tech startup.' },
];

const categories = ['All', 'Websites', 'Branding', 'E-Commerce'];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);
  return (
    <section id="portfolio" className="bg-white">
      <div className="section">
        <div className="mb-12 fade-up">
          <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Portfolio</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-light text-[#0D0D0D] mb-8">
            Selected <span className="italic">Work</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`font-mono text-xs tracking-widest px-4 py-2 uppercase transition-colors ${
                  active === cat ? 'bg-[#1B6B5A] text-white' : 'bg-[#F5F0E8] text-gray-600 hover:bg-gray-100'
                }`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={i} className="group cursor-pointer fade-up">
              <div className="bg-[#F5F0E8] h-48 relative overflow-hidden flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-[#1B6B5A] opacity-20 rounded-full" />
                <div className="absolute inset-0 bg-[#0D0D0D] opacity-0 group-hover:opacity-80 transition-opacity flex items-center justify-center">
                  <span className="font-sans text-white text-sm tracking-wide">View Project</span>
                </div>
              </div>
              <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-1">{p.category}</p>
              <h3 className="font-serif text-xl text-[#0D0D0D] mb-2">{p.title}</h3>
              <p className="font-sans text-sm text-gray-500 mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1">
                {p.tags.map(tag => (
                  <span key={tag} className="font-mono text-xs bg-[#F5F0E8] text-gray-500 px-2 py-0.5">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
