import Link from 'next/link'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Bookings', value: '—', icon: '📋', href: '/admin/bookings' },
    { label: 'Portfolio Items', value: '—', icon: '🎨', href: '/admin/portfolio' },
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
            className="border border-white/10 bg-[#111] p-6 hover:border-[#1B6B5A]/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
                <p className="font-sans text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <span className="text-3xl opacity-60">{stat.icon}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-sans text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/portfolio" className="bg-[#1B6B5A] text-white px-6 py-3 font-sans text-sm hover:bg-[#154f43] transition-colors">
            + Add Portfolio Item
          </Link>
          <Link href="/admin/bookings" className="border border-white/20 text-gray-300 px-6 py-3 font-sans text-sm hover:border-white/40 transition-colors">
            View Bookings
          </Link>
          <Link href="/" className="border border-white/20 text-gray-300 px-6 py-3 font-sans text-sm hover:border-white/40 transition-colors">
            &larr; View Live Site
          </Link>
        </div>
      </div>
    </div>
  )
}
