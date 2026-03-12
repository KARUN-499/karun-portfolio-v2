'use client'

import { useEffect, useState } from 'react'

interface PortfolioItem {
  id: string
  title: string
  category: string
  description: string
  image_url: string
  project_url: string
  client: string
  year: string
  long_description: string
  featured: boolean
  created_at: string
}

const emptyForm = {
  title: '', category: '', description: '', image_url: '', project_url: '',
  client: '', year: '', long_description: '', featured: false,
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<any>(emptyForm)
  const [editing, setEditing] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/portfolio')
      .then(r => r.json())
      .then(d => { setItems(d.items || []); setLoading(false) })
  }, [])

  const set = (field: string, value: any) => setForm((p: any) => ({ ...p, [field]: value }))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/admin/portfolio/${editing}` : '/api/admin/portfolio'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
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
      title: item.title, category: item.category, description: item.description,
      image_url: item.image_url || '', project_url: item.project_url || '',
      client: item.client || '', year: item.year || '',
      long_description: item.long_description || '', featured: item.featured || false,
    })
    setEditing(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this portfolio item?')) return
    await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
    setItems(prev => prev.filter(i => i.id !== id))
  }

  if (loading) return <div className="p-8 text-gray-400 font-mono text-sm">Loading...</div>

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sans font-bold text-white">Portfolio</h1>
          <p className="text-gray-400 font-sans text-sm mt-1">{items.length} project{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true) }}
          className="bg-[#1B6B5A] text-white px-6 py-2 font-mono text-xs hover:bg-[#154f43] transition-colors">
          + Add Project
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border border-[#1B6B5A]/30 bg-white/5 p-6 mb-8">
          <h2 className="font-sans font-bold text-white mb-6">{editing ? 'Edit Project' : 'New Project'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Title *</label>
                <input required value={form.title} onChange={e => set('title', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Category</label>
                <input value={form.category} onChange={e => set('category', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Client</label>
                <input value={form.client} onChange={e => set('client', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Year</label>
                <input value={form.year} onChange={e => set('year', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Image URL</label>
                <input value={form.image_url} onChange={e => set('image_url', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
              </div>
              <div>
                <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Project URL</label>
                <input value={form.project_url} onChange={e => set('project_url', e.target.value)}
                  className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Short Description</label>
              <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)}
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-400 uppercase block mb-1">Long Description</label>
              <textarea rows={4} value={form.long_description} onChange={e => set('long_description', e.target.value)}
                className="w-full border border-white/20 bg-white/5 px-3 py-2 font-sans text-sm text-white focus:border-[#1B6B5A] focus:outline-none" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} id="featured" />
              <label htmlFor="featured" className="font-mono text-xs text-gray-400 uppercase">Featured Project</label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="bg-[#1B6B5A] text-white px-6 py-2 font-mono text-xs hover:bg-[#154f43] transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : (editing ? 'Update' : 'Create')} Project
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); setForm(emptyForm) }}
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
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-mono text-xs text-gray-500">{item.category || 'No image'}</span>
              )}
            </div>
            <div className="p-4">
              <span className="font-mono text-xs text-[#1B6B5A]">{item.category}</span>
              <h3 className="font-sans font-bold text-white mt-1 mb-2">{item.title}</h3>
              <p className="text-gray-400 text-xs font-sans line-clamp-2">{item.description}</p>
              <div className="flex gap-2 mt-4">
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
          <p className="font-mono text-sm">No portfolio items yet. Add your first project!</p>
        </div>
      )}
    </div>
  )
}
