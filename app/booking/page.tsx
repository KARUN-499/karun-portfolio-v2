'use client'

import { useState } from 'react'
import Link from 'next/link'

const services = [
  'Web Design',
  'Web Development',
  'Full Stack App',
  'UI/UX Design',
  'SEO Optimization',
  'Maintenance & Support',
]

export default function BookingPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', budget: '', timeline: '', description: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', budget: '', timeline: '', description: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full border border-white/10 bg-[#111111] px-4 py-3 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none'
  const labelClass = 'font-mono text-xs tracking-widest text-gray-500 uppercase block mb-2'

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Navbar */}
      <header className="border-b border-white/10 bg-[#0A0A0A]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-sans text-xl font-bold text-white">Karun</Link>
          <Link href="/" className="font-sans text-sm text-gray-400 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
        </nav>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="font-sans text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Start a Project</p>
          <h1 className="font-sans text-5xl font-bold text-white">
            Book a <em className="italic font-light">Session</em>
          </h1>
          <p className="font-sans text-gray-400 mt-4">
            Ready to bring your vision to life? Fill out the form and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {status === 'success' ? (
          <div className="border border-[#1B6B5A] bg-[#1B6B5A]/10 p-12 text-center">
            <p className="text-4xl mb-4">&#10003;</p>
            <h2 className="font-sans text-2xl font-bold text-white mb-2">Request Submitted!</h2>
            <p className="font-sans text-gray-400 mb-6">Thanks! I&apos;ll review your project and get back to you within 24 hours.</p>
            <Link href="/" className="bg-[#1B6B5A] text-white px-8 py-3 font-sans text-sm hover:bg-[#154f43] transition-colors">
              &larr; Back to Portfolio
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input required value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="John Doe" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="john@example.com" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)}
                placeholder="+91 98765 43210" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Service *</label>
              <select required value={form.service} onChange={e => set('service', e.target.value)}
                className={inputClass + ' cursor-pointer'}>
                <option value="" className="bg-[#111]">Select a service</option>
                {services.map(s => <option key={s} value={s} className="bg-[#111]">{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Budget Range</label>
                <select value={form.budget} onChange={e => set('budget', e.target.value)}
                  className={inputClass + ' cursor-pointer'}>
                  <option value="" className="bg-[#111]">Select budget</option>
                  <option className="bg-[#111]">Under ₹10,000</option>
                  <option className="bg-[#111]">₹10,000 – ₹25,000</option>
                  <option className="bg-[#111]">₹25,000 – ₹50,000</option>
                  <option className="bg-[#111]">₹50,000 – ₹1,00,000</option>
                  <option className="bg-[#111]">Above ₹1,00,000</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Timeline</label>
                <select value={form.timeline} onChange={e => set('timeline', e.target.value)}
                  className={inputClass + ' cursor-pointer'}>
                  <option value="" className="bg-[#111]">Select timeline</option>
                  <option className="bg-[#111]">Less than 1 week</option>
                  <option className="bg-[#111]">1–2 weeks</option>
                  <option className="bg-[#111]">2–4 weeks</option>
                  <option className="bg-[#111]">1–3 months</option>
                  <option className="bg-[#111]">3+ months</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Project Description *</label>
              <textarea required rows={5} value={form.description} onChange={e => set('description', e.target.value)}
                placeholder="Tell me about your project, goals, and any specific requirements..."
                className={inputClass + ' resize-none'} />
            </div>
            <button type="submit" disabled={status === 'loading'}
              className="w-full bg-[#1B6B5A] text-white py-4 font-sans tracking-wide text-sm hover:bg-[#154f43] transition-colors disabled:opacity-60">
              {status === 'loading' ? 'Submitting...' : 'Submit Booking Request →'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-sm text-center font-sans">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </section>
    </main>
  )
}
