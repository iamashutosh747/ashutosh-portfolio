'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

const STATUS_OPTIONS = ['Idea', 'Planning', 'In Progress', 'Completed', 'Paused', 'Archived']

export default function NewProject() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    short_description: '',
    description: '',
    status: 'In Progress',
    start_date: '',
    completion_date: '',
    role: '',
    technologies: '',
    link_url: '',
    display_order: 1,
    featured: false,
    published: true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function update(field: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.from('projects').insert({
      ...form,
      completion_date: form.completion_date || null,
    })

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="font-display text-2xl mb-8">Add Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Project name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />

        <input
          placeholder="Short description (one line, shown in the list)"
          value={form.short_description}
          onChange={(e) => update('short_description', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />

        <textarea
          placeholder="Full description (optional, for later use)"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm min-h-20"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <div>
          <label className="text-xs opacity-60 block mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => update('status', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm bg-transparent"
            style={{ borderColor: 'var(--color-line)' }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs opacity-60 block mb-1">Start date</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => update('start_date', e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--color-line)' }}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs opacity-60 block mb-1">Completion date</label>
            <input
              type="date"
              value={form.completion_date}
              onChange={(e) => update('completion_date', e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--color-line)' }}
            />
          </div>
        </div>

        <input
          placeholder="Your role"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <input
          placeholder="Technologies (comma-separated)"
          value={form.technologies}
          onChange={(e) => update('technologies', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <input
          placeholder="Link URL (optional)"
          value={form.link_url}
          onChange={(e) => update('link_url', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <input
          type="number"
          placeholder="Display order"
          value={form.display_order}
          onChange={(e) => update('display_order', Number(e.target.value))}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update('featured', e.target.checked)}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update('published', e.target.checked)}
          />
          Published
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 rounded text-sm text-white disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          {saving ? 'Saving...' : 'Save project'}
        </button>
      </form>
    </main>
  )
}