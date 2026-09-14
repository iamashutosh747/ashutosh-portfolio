'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

export default function SettingsPage() {
  const [form, setForm] = useState({
    id: null as number | null,
    full_name: '',
    professional_title: '',
    short_bio: '',
    email: '',
    linkedin_url: '',
    github_url: '',
    location: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('site_settings').select('*').single()
      if (data) setForm({ ...form, ...data })
      setLoading(false)
    }
    load()
  }, [])

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    const { id, ...rest } = form
    await supabase.from('site_settings').update(rest).eq('id', id)
    setSaving(false)
    setSaved(true)
  }

  if (loading) return <main className="max-w-xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="font-display text-2xl mb-8">Site Settings</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="text-xs opacity-60 block mb-1">Full name</label>
          <input
            value={form.full_name}
            onChange={(e) => update('full_name', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ borderColor: 'var(--color-line)' }}
          />
        </div>
        <div>
          <label className="text-xs opacity-60 block mb-1">Professional title</label>
          <input
            value={form.professional_title}
            onChange={(e) => update('professional_title', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ borderColor: 'var(--color-line)' }}
          />
        </div>
        <div>
          <label className="text-xs opacity-60 block mb-1">Short bio</label>
          <textarea
            value={form.short_bio}
            onChange={(e) => update('short_bio', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm min-h-24"
            style={{ borderColor: 'var(--color-line)' }}
          />
        </div>
        <div>
          <label className="text-xs opacity-60 block mb-1">Location</label>
          <input
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ borderColor: 'var(--color-line)' }}
          />
        </div>
        <div>
          <label className="text-xs opacity-60 block mb-1">Email</label>
          <input
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ borderColor: 'var(--color-line)' }}
          />
        </div>
        <div>
          <label className="text-xs opacity-60 block mb-1">LinkedIn URL</label>
          <input
            value={form.linkedin_url}
            onChange={(e) => update('linkedin_url', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ borderColor: 'var(--color-line)' }}
          />
        </div>
        <div>
          <label className="text-xs opacity-60 block mb-1">GitHub URL (optional)</label>
          <input
            value={form.github_url}
            onChange={(e) => update('github_url', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm"
            style={{ borderColor: 'var(--color-line)' }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 rounded text-sm text-white disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save settings'}
        </button>
      </form>
    </main>
  )
}