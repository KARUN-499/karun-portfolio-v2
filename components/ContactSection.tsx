'use client';
import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="bg-[#0A0A0A] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="font-sans text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Contact</p>
            <h2 className="font-sans text-5xl font-bold text-white mb-8">Let&apos;s Work <em className="italic font-light">Together</em></h2>
            <p className="font-sans text-gray-400 mb-10">Ready to start your next project? Get in touch and let&apos;s discuss how I can help you achieve your goals.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[#1B6B5A]">&#9993;</span>
                <a href="mailto:karun@example.com" className="font-sans text-gray-300 hover:text-white transition-colors">karun@example.com</a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#1B6B5A]">&#128205;</span>
                <span className="font-sans text-gray-300">Samalkha, Panipat. Haryana, India</span>
              </div>
            </div>
          </div>
          <div>
            {sent ? (
              <div className="border border-[#1B6B5A] bg-[#1B6B5A]/10 p-8 text-center">
                <p className="font-sans text-2xl font-bold text-white mb-2">Message Sent!</p>
                <p className="font-sans text-gray-400">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-2">Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-[#111111] border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-[#1B6B5A] focus:outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-2">Email</label>
                  <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-[#111111] border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-[#1B6B5A] focus:outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-500 uppercase block mb-2">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-[#111111] border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-[#1B6B5A] focus:outline-none resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#1B6B5A] text-white py-4 font-sans tracking-wide text-sm hover:bg-[#154f43] transition-colors">
                  Send Message &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
