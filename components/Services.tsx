'use client';
import { useEffect, useState } from 'react';

const staticServices = [
  { name: 'Landing Page', description: 'High-converting single page for your business or launch.', price_from: 500, price_to: 1200, duration: '5-7 days', is_featured: false, features: ['Custom design', 'Mobile responsive', 'SEO optimized', 'Contact form'] },
  { name: 'Business Website', description: 'Professional multi-page website with CMS.', price_from: 1500, price_to: 3500, duration: '2-3 weeks', is_featured: true, features: ['Up to 8 pages', 'CMS integration', 'SEO', 'Admin dashboard'] },
  { name: 'E-Commerce Store', description: 'Full-featured online store with payments.', price_from: 3000, price_to: 8000, duration: '4-6 weeks', is_featured: false, features: ['Product catalog', 'Shopping cart', 'Stripe payments', 'Order tracking'] },
  { name: 'Brand Identity', description: 'Complete brand identity: logo, colors, guidelines.', price_from: 800, price_to: 2000, duration: '1-2 weeks', is_featured: false, features: ['Logo design (3 concepts)', 'Color palette', 'Typography', 'Brand guidelines'] },
  { name: 'SEO & Marketing', description: 'Full SEO audit and digital marketing strategy.', price_from: 600, price_to: 1500, duration: 'Monthly', is_featured: false, features: ['Technical SEO audit', 'Keyword research', 'Content strategy', 'Monthly reports'] },
  { name: 'Monthly Retainer', description: 'Ongoing maintenance and priority support.', price_from: 400, price_to: 1200, duration: 'Monthly', is_featured: false, features: ['Unlimited updates', 'Priority support', 'Monthly backup', 'Security updates'] },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#F5F0E8]">
      <div className="section">
        <div className="mb-16 fade-up">
          <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Services</p>
          <h2 className="font-serif text-5xl lg:text-6xl font-light text-[#0D0D0D]">
            What I <span className="italic">Offer</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticServices.map((service) => (
            <div key={service.name} className={`card fade-up relative ${
              service.is_featured ? 'border-2 border-[#1B6B5A] bg-[#1B6B5A] text-white' : ''
            }`}>
              {service.is_featured && (
                <span className="absolute top-4 right-4 font-mono text-xs tracking-widest bg-[#C9A84C] text-[#0D0D0D] px-2 py-1 uppercase">Popular</span>
              )}
              <p className={`font-mono text-xs tracking-widest uppercase mb-2 ${
                service.is_featured ? 'text-[#C9A84C]' : 'text-[#1B6B5A]'
              }`}>{service.duration}</p>
              <h3 className={`font-serif text-2xl mb-3 ${
                service.is_featured ? 'text-white' : 'text-[#0D0D0D]'
              }`}>{service.name}</h3>
              <p className={`font-sans text-sm leading-relaxed mb-6 ${
                service.is_featured ? 'text-gray-200' : 'text-gray-500'
              }`}>{service.description}</p>
              <ul className="space-y-2 mb-8">
                {service.features.map(f => (
                  <li key={f} className={`font-sans text-sm flex items-center gap-2 ${
                    service.is_featured ? 'text-gray-100' : 'text-gray-600'
                  }`}>
                    <span className={`text-xs ${
                      service.is_featured ? 'text-[#C9A84C]' : 'text-[#1B6B5A]'
                    }`}>&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-end">
                <div>
                  <p className={`font-mono text-xs tracking-widest uppercase ${
                    service.is_featured ? 'text-gray-300' : 'text-gray-400'
                  }`}>From</p>
                  <p className={`font-serif text-3xl ${
                    service.is_featured ? 'text-white' : 'text-[#0D0D0D]'
                  }`}>${service.price_from}</p>
                </div>
                <a href="#booking" className={`font-sans text-sm px-5 py-2 transition-colors ${
                  service.is_featured
                    ? 'bg-[#C9A84C] text-[#0D0D0D] hover:bg-yellow-400'
                    : 'bg-[#1B6B5A] text-white hover:bg-[#154f43]'
                }`}>Book Now</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
