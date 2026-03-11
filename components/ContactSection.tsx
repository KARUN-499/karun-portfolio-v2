'use client';
import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" className="bg-white">
      <div className="section">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 fade-up">
            <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Contact</p>
            <h2 className="font-serif text-5xl lg:text-6xl font-light text-[#0D0D0D]">
              Get in <span className="italic">Touch</span>
            </h2>
          </div>
          {status === 'success' ? (
            <div className="bg-[#F5F0E8] border-l-4 border-[#1B6B5A] p-8 fade-up">
              <p className="font-serif text-2xl text-[#0D0D0D] mb-2">Message Sent!</p>
              <p className="font-sans text-gray-600">Thanks for reaching out. I&apos;ll reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Name *</label>
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#F5F0E8] border border-gray-200 text-[#0D0D0D] px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#F5F0E8] border border-gray-200 text-[#0D0D0D] px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Subject</label>
                <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                  className="w-full bg-[#F5F0E8] border border-gray-200 text-[#0D0D0D] px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Message *</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full bg-[#F5F0E8] border border-gray-200 text-[#0D0D0D] px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none resize-none" />
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="bg-[#1B6B5A] text-white px-10 py-4 font-sans tracking-wide hover:bg-[#154f43] transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'error' && <p className="text-red-500 font-sans text-sm">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
