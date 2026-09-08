'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export default function NewSkill() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    category: '',
    level: 'Intermediate',
    years_experience: 1,
    description: '',
    featured: false,
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
    const { error } = await supabase.from('skills').insert(form)

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
      <h1 className="font-display text-2xl mb-8">Add Skill</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Skill name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />

        <input
          placeholder="Category (e.g. Finance, Technology, Operations)"
          value={form.category}
          onChange={(e) => update('category', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <div>
          <label className="text-xs opacity-60 block mb-1">Level</label>
          <select
            value={form.level}
            onChange={(e) => update('level', e.target.value)}
            className="w-full px-3 py-2 rounded border text-sm bg-transparent"
            style={{ borderColor: 'var(--color-line)' }}
          >
            {LEVEL_OPTIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <input
          type="number"
          step="0.5"
          placeholder="Years of experience"
          value={form.years_experience}
          onChange={(e) => update('years_experience', Number(e.target.value))}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm min-h-20"
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
          {saving ? 'Saving...' : 'Save skill'}
        </button>
      </form>
    </main>
  )
}