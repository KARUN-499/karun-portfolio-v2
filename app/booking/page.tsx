'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    description: '',
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

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Start a Project</p>
          <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">Book a <span className="text-[#1B6B5A]">Session</span></h1>
          <p className="text-gray-400 font-sans mb-12">Ready to bring your vision to life? Fill out the form and I&apos;ll get back to you within 24 hours.</p>

          {status === 'success' ? (
            <div className="border border-[#1B6B5A] bg-[#1B6B5A]/10 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-2xl font-sans font-bold mb-2">Request Submitted!</h2>
              <p className="text-gray-400 font-sans">Thanks {form.name || 'there'}! I&apos;ll review your project and get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Full Name *</label>
                  <input required value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-gray-200 bg-[#F5F0E8]/50 px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none text-black rounded" />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Email *</label>
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="john@example.com"
                    className="w-full border border-gray-200 bg-[#F5F0E8]/50 px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none text-black rounded" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Phone</label>
                  <input value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-200 bg-[#F5F0E8]/50 px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none text-black rounded" />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Service *</label>
                  <select required value={form.service} onChange={e => set('service', e.target.value)}
                    className="w-full border border-gray-200 bg-[#F5F0E8]/50 px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none text-black rounded">
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Budget Range</label>
                  <select value={form.budget} onChange={e => set('budget', e.target.value)}
                    className="w-full border border-gray-200 bg-[#F5F0E8]/50 px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none text-black rounded">
                    <option value="">Select budget</option>
                    <option>Under ₹10,000</option>
                    <option>₹10,000 – ₹25,000</option>
                    <option>₹25,000 – ₹50,000</option>
                    <option>₹50,000 – ₹1,00,000</option>
                    <option>Above ₹1,00,000</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Timeline</label>
                  <select value={form.timeline} onChange={e => set('timeline', e.target.value)}
                    className="w-full border border-gray-200 bg-[#F5F0E8]/50 px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none text-black rounded">
                    <option value="">Select timeline</option>
                    <option>Less than 1 week</option>
                    <option>1–2 weeks</option>
                    <option>2–4 weeks</option>
                    <option>1–3 months</option>
                    <option>3+ months</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Project Description</label>
                <textarea required rows={5} value={form.description} onChange={e => set('description', e.target.value)}
                  placeholder="Tell me about your project, goals, and any specific requirements..."
                  className="w-full border border-gray-200 bg-[#F5F0E8]/50 px-4 py-3 font-sans text-sm focus:border-[#1B6B5A] focus:outline-none text-black rounded" />
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-[#1B6B5A] text-white py-4 font-sans tracking-wide text-sm hover:bg-[#154f43] transition-colors disabled:opacity-60">
                {status === 'loading' ? 'Submitting...' : 'Submit Booking Request →'}
              </button>
              {status === 'error' && <p className="text-red-500 text-sm text-center font-sans">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
