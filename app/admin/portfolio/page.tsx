'use client'

import { useEffect, useState } from 'react'

interface PortfolioItem {
  id: string
  title: string
  slug: string
  category: string
  description: string
  tags: string[]
  imageUrl: string | null
  liveUrl: string | null
  githubUrl: string | null
  featured: boolean
  order: number
  createdAt: string
}

const emptyForm = {
  title: '',
  slug: '',
  category: '',
  description: '',
  tags: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
  order: 0,
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<any>(emptyForm)
  const [editing, setEditing] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/portfolio')
      .then(r => r.json())
      .then(d => { setItems(d.items || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const set = (field: string, value: any) => setForm((p: any) => ({ ...p, [field]: value }))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/admin/portfolio/${editing}` : '/api/admin/portfolio'
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      order: Number(form.order) || 0,
    }
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Failed to save')
      setSaving(false)
      return
    }
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing ? data.item : i))
    } else {
      setItems(prev => [data.item, ...prev])
    }
    setForm(emptyForm)
    setEditing(null)
    setShowForm(false)
    setSaving(false)
  }

  const handleEdit = (item: PortfolioItem) => {
    setForm({
      title: item.title,
      slug: item.slug,
      category: item.category,
      description: item.description,
      tags: item.tags?.join(', ') || '',
      imageUrl: item.imageUrl || '',
      liveUrl: item.liveUrl || '',
      githubUrl: item.githubUrl || '',
      featured: item.featured || false,
      order: item.order || 0,
    })
    setEditing(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return
    const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id))
  }

  if (loading) return <div className="p-8 text-gray-400 font-mono">Loading...</div>

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-sans text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-500 font-mono text-xs mt-1">{items.length} project{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); setError('') }}
          className="bg-[#1B6B5A] text-white px-6 py-2 font-mono text-xs hover:bg-[#154f43] transition-colors"
        >
          + Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border border-white/10 p-6 mb-8 bg-white/2">
          <h2 className="font-mono text-sm text-white mb-6 uppercase tracking-widest">
            {editing ? 'Edit Project' : 'New Project'}
          </h2>
          {error && <p className="text-red-400 font-mono text-xs mb-4">{error}</p>}
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Title *</label>
              <input required value={form.title} onChange={e => set('title', e.target.value)}
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Category</label>
              <input value={form.category} onChange={e => set('category', e.target.value)}
                placeholder="Web Development, Brand Design, etc."
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Slug (auto if empty)</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)}
                placeholder="my-project-name"
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Tags (comma separated)</label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)}
                placeholder="React, Node.js, Tailwind"
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Image URL</label>
              <input value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)}
                placeholder="https://..."
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Live URL</label>
              <input value={form.liveUrl} onChange={e => set('liveUrl', e.target.value)}
                placeholder="https://..."
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">GitHub URL</label>
              <input value={form.githubUrl} onChange={e => set('githubUrl', e.target.value)}
                placeholder="https://github.com/..."
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Order (display position)</label>
              <input type="number" value={form.order} onChange={e => set('order', e.target.value)}
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Description *</label>
              <textarea required rows={3} value={form.description} onChange={e => set('description', e.target.value)}
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} id="featured" />
              <label htmlFor="featured" className="font-mono text-xs text-gray-400 uppercase">Featured Project (shows on homepage)</label>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saving}
                className="bg-[#1B6B5A] text-white px-6 py-2 font-mono text-xs hover:bg-[#154f43] transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : (editing ? 'Update' : 'Publish')} Project
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm); setError('') }}
                className="border border-white/20 text-gray-400 px-6 py-2 font-mono text-xs hover:border-white/40 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="border border-white/10 hover:border-white/20 transition-all">
            <div className="aspect-video bg-[#1B6B5A]/10 flex items-center justify-center overflow-hidden">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-mono text-xs text-gray-500">{item.category || 'No image'}</span>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs text-[#1B6B5A]">{item.category}</span>
                {item.featured && <span className="font-mono text-xs text-yellow-500">★ Featured</span>}
              </div>
              <h3 className="font-sans font-bold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs font-sans line-clamp-2 mb-2">{item.description}</p>
              {item.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((t: string) => (
                    <span key={t} className="text-xs font-mono text-gray-500 border border-white/10 px-1.5 py-0.5">{t}</span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(item)}
                  className="flex-1 border border-white/20 text-gray-300 py-1.5 font-mono text-xs hover:border-[#1B6B5A] hover:text-white transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="flex-1 border border-red-500/30 text-red-400 py-1.5 font-mono text-xs hover:bg-red-500/10 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && !showForm && (
        <div className="text-center py-20 text-gray-500">
          <p className="font-mono text-sm">No portfolio items yet. Click "+ Add Project" to publish your first project!</p>
        </div>
      )}
    </div>
  )
}
