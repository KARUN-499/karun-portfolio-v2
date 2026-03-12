'use client'

import { useEffect, useState } from 'react'

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  service: string
  budget: string
  timeline: string
  description: string
  status: string
  created_at: string
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Booking | null>(null)

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then(r => r.json())
      .then(d => { setBookings(d.bookings || []); setLoading(false) })
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return
    await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' })
    setBookings(prev => prev.filter(b => b.id !== id))
    setSelected(null)
  }

  if (loading) return <div className="p-8 text-gray-400 font-mono text-sm">Loading...</div>

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-white">Bookings</h1>
        <p className="text-gray-400 font-sans text-sm mt-1">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className="flex-1 border border-white/10 overflow-hidden">
          {bookings.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="font-mono text-sm">No bookings yet</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-4 py-3 font-mono text-xs text-gray-400 uppercase">Name</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-gray-400 uppercase">Service</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-gray-400 uppercase">Status</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-gray-400 uppercase">Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}
                    onClick={() => setSelected(booking)}
                    className={`border-b border-white/5 cursor-pointer transition-colors ${
                      selected?.id === booking.id ? 'bg-[#1B6B5A]/10' : 'hover:bg-white/5'
                    }`}>
                    <td className="px-4 py-3 font-sans text-sm text-white">{booking.name}</td>
                    <td className="px-4 py-3 font-sans text-xs text-gray-400">{booking.service}</td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.status || 'pending'}
                        onChange={e => { e.stopPropagation(); updateStatus(booking.id, e.target.value) }}
                        onClick={e => e.stopPropagation()}
                        className="bg-transparent font-mono text-xs border border-white/20 px-2 py-1 text-white">
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="in_progress">in_progress</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={e => { e.stopPropagation(); deleteBooking(booking.id) }}
                        className="text-red-400 hover:text-red-300 font-mono text-xs transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 border border-white/10 p-6 shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sans font-bold text-white">Booking Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white">×</button>
            </div>
            <div className="space-y-4">
              {[
                ['Name', selected.name],
                ['Email', selected.email],
                ['Phone', selected.phone || '—'],
                ['Service', selected.service],
                ['Budget', selected.budget || '—'],
                ['Timeline', selected.timeline || '—'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                  <p className="font-sans text-sm text-white">{value}</p>
                </div>
              ))}
              {selected.description && (
                <div>
                  <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Description</p>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">{selected.description}</p>
                </div>
              )}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex gap-2">
              <a href={`mailto:${selected.email}`}
                className="flex-1 bg-[#1B6B5A] text-white py-2 font-mono text-xs text-center hover:bg-[#154f43] transition-colors">
                Reply
              </a>
              <button onClick={() => deleteBooking(selected.id)}
                className="flex-1 border border-red-500/50 text-red-400 py-2 font-mono text-xs hover:bg-red-500/10 transition-colors">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
