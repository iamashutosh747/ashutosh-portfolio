'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function NewExperience() {
  const router = useRouter()
  const [form, setForm] = useState({
    job_title: '',
    company: '',
    location: '',
    employment_type: 'Full-time',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    technologies: '',
    display_order: 1,
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
    const { error } = await supabase.from('experiences').insert({
      ...form,
      end_date: form.is_current ? null : form.end_date || null,
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
      <h1 className="font-display text-2xl mb-8">Add Experience</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Job title"
          value={form.job_title}
          onChange={(e) => update('job_title', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />
        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => update('location', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />
        <input
          placeholder="Employment type"
          value={form.employment_type}
          onChange={(e) => update('employment_type', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs opacity-60 block mb-1">Start date</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => update('start_date', e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--color-line)' }}
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-xs opacity-60 block mb-1">End date</label>
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => update('end_date', e.target.value)}
              disabled={form.is_current}
              className="w-full px-3 py-2 rounded border text-sm disabled:opacity-40"
              style={{ borderColor: 'var(--color-line)' }}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_current}
            onChange={(e) => update('is_current', e.target.checked)}
          />
          Currently working here
        </label>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm min-h-24"
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
          {saving ? 'Saving...' : 'Save experience'}
        </button>
      </form>
    </main>
  )
}