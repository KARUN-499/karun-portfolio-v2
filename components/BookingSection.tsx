'use client';
import { useState } from 'react';

export default function BookingSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', description: '', budget: '', timeline: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section id="booking" className="bg-[#0D0D0D]">
      <div className="section">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 fade-up">
            <p className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase mb-4">Book a Project</p>
            <h2 className="font-serif text-5xl lg:text-6xl font-light text-white">
              Let&apos;s Work <span className="italic">Together</span>
            </h2>
          </div>
          {status === 'success' ? (
            <div className="bg-[#1B6B5A] p-8 text-center fade-up">
              <p className="font-serif text-3xl text-white mb-2">Request Received!</p>
              <p className="font-sans text-gray-200">I&apos;ll be in touch within 24 hours to discuss your project.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Your Name *</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Service</label>
                  <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none">
                    <option value="">Select a service</option>
                    <option>Landing Page</option>
                    <option>Business Website</option>
                    <option>E-Commerce Store</option>
                    <option>Brand Identity</option>
                    <option>SEO & Marketing</option>
                    <option>Monthly Retainer</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Budget Range</label>
                  <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none">
                    <option value="">Select budget</option>
                    <option>$500 - $1,500</option>
                    <option>$1,500 - $5,000</option>
                    <option>$5,000 - $15,000</option>
                    <option>$15,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Project Description *</label>
                <textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none resize-none" />
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-[#1B6B5A] text-white py-4 font-sans tracking-wide hover:bg-[#154f43] transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Submit Booking Request'}
              </button>
              {status === 'error' && <p className="text-red-400 font-sans text-sm text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
