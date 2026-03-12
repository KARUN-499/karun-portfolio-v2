'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/admin/login') {
      const isAuth = localStorage.getItem('admin_auth')
      if (!isAuth) router.push('/admin/login')
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <p className="font-mono text-xs text-[#1B6B5A] uppercase tracking-widest">Admin Panel</p>
          <h2 className="text-white font-sans font-bold text-lg mt-1">Karun Portfolio</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin"
            className={`flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors ${
              pathname === '/admin' ? 'bg-[#1B6B5A] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <span>📊</span> Dashboard
          </Link>
          <Link href="/admin/bookings"
            className={`flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors ${
              pathname === '/admin/bookings' ? 'bg-[#1B6B5A] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <span>📅</span> Bookings
          </Link>
          <Link href="/admin/portfolio"
            className={`flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors ${
              pathname === '/admin/portfolio' ? 'bg-[#1B6B5A] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <span>🎨</span> Portfolio
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout}
            className="w-full px-4 py-2 font-mono text-xs text-gray-400 hover:text-red-400 transition-colors text-left">
            → Logout
          </button>
          <Link href="/" className="block px-4 py-2 font-mono text-xs text-gray-500 hover:text-[#1B6B5A] transition-colors">
            → View Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
