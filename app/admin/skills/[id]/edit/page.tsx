'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export default function EditSkill() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('skills').select('*').eq('id', id).single()
      setForm(data)
      setLoading(false)
    }
    load()
  }, [id])

  function update(field: string, value: string | boolean | number) {
    setForm((prev: any) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createClient()
    const { id: formId, ...rest } = form

    const { error } = await supabase.from('skills').update(rest).eq('id', id)

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/admin/skills')
    router.refresh()
  }

  if (loading || !form) return <main className="max-w-xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="font-display text-2xl mb-8">Edit Skill</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Skill name"
          value={form.name || ''}
          onChange={(e) => update('name', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />

        <input
          placeholder="Category"
          value={form.category || ''}
          onChange={(e) => update('category', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <div>
          <label className="text-xs opacity-60 block mb-1">Level</label>
          <select
            value={form.level || 'Intermediate'}
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
          value={form.years_experience || 0}
          onChange={(e) => update('years_experience', Number(e.target.value))}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <textarea
          placeholder="Description"
          value={form.description || ''}
          onChange={(e) => update('description', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm min-h-20"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <input
          type="number"
          placeholder="Display order"
          value={form.display_order || 1}
          onChange={(e) => update('display_order', Number(e.target.value))}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured || false}
            onChange={(e) => update('featured', e.target.checked)}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published || false}
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
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </main>
  )
}