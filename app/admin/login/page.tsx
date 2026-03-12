'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Simple password check - store in env var ADMIN_PASSWORD
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123')) {
      localStorage.setItem('admin_auth', 'true')
      router.push('/admin')
    } else {
      setError('Invalid password. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <p className="font-mono text-xs tracking-widest text-[#1B6B5A] uppercase mb-4">Admin Access</p>
          <h1 className="text-3xl font-sans font-bold text-white">Portfolio <span className="text-[#1B6B5A]">Admin</span></h1>
          <p className="text-gray-400 font-sans mt-2 text-sm">Enter your password to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="font-mono text-xs tracking-widest text-gray-400 uppercase block mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-white/20 bg-white/5 px-4 py-3 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none rounded"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-sans text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1B6B5A] text-white py-4 font-sans tracking-wide text-sm hover:bg-[#154f43] transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p className="text-center mt-8">
          <a href="/" className="font-mono text-xs text-gray-500 hover:text-[#1B6B5A] transition-colors">← Back to Portfolio</a>
        </p>
      </div>
    </div>
  )
}
