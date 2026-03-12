'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (pathname === '/admin/login') {
      setChecking(false)
      return
    }
    // Check auth via API (cookie-based)
    fetch('/api/admin/auth/check')
      .then(r => {
        if (!r.ok) router.push('/admin/login')
        else setChecking(false)
      })
      .catch(() => router.push('/admin/login'))
  }, [pathname, router])

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>
  if (checking) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <p className="font-mono text-sm text-gray-500">Loading...</p>
    </div>
  )

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
            Dashboard
          </Link>
          <Link href="/admin/bookings"
            className={`flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors ${
              pathname === '/admin/bookings' ? 'bg-[#1B6B5A] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            Bookings
          </Link>
          <Link href="/admin/portfolio"
            className={`flex items-center gap-3 px-4 py-3 font-sans text-sm transition-colors ${
              pathname === '/admin/portfolio' ? 'bg-[#1B6B5A] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            Portfolio
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 font-sans text-sm text-gray-400 hover:text-white transition-colors">
            &larr; View Site
          </Link>
          <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-3 font-sans text-sm text-red-400 hover:text-red-300 transition-colors">
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
