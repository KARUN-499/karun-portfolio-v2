import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [{ count: bookingsCount }, { count: portfolioCount }, { data: recentBookings }] = await Promise.all([
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('portfolio_items').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Total Bookings', value: bookingsCount ?? 0, icon: '📅', href: '/admin/bookings' },
    { label: 'Portfolio Items', value: portfolioCount ?? 0, icon: '🎨', href: '/admin/portfolio' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-sans font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 font-sans text-sm mt-1">Welcome back to your portfolio admin panel.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {stats.map(stat => (
          <Link href={stat.href} key={stat.label}
            className="border border-white/10 bg-white/5 p-6 hover:border-[#1B6B5A]/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-4xl font-sans font-bold text-white">{stat.value}</p>
              </div>
              <span className="text-4xl opacity-50">{stat.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-sans font-bold text-white">Recent Bookings</h2>
          <Link href="/admin/bookings" className="font-mono text-xs text-[#1B6B5A] hover:underline">View all →</Link>
        </div>
        <div className="border border-white/10 overflow-hidden">
          {recentBookings && recentBookings.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-4 py-3 font-mono text-xs text-gray-400 uppercase">Name</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-gray-400 uppercase">Service</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-gray-400 uppercase">Status</th>
                  <th className="text-left px-4 py-3 font-mono text-xs text-gray-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking: any) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-sans text-sm text-white">{booking.name}</td>
                    <td className="px-4 py-3 font-sans text-sm text-gray-400">{booking.service}</td>
                    <td className="px-4 py-3">
                      <span className={`font-mono text-xs px-2 py-1 ${
                        booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>{booking.status || 'pending'}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="font-mono text-sm">No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
