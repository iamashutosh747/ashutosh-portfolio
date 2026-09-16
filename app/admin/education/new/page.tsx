'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function NewEducation() {
  const router = useRouter()
  const [form, setForm] = useState({
    institution: '',
    degree: '',
    field: '',
    start_date: '',
    end_date: '',
    description: '',
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
    const { error } = await supabase.from('education').insert({
      ...form,
      end_date: form.end_date || null,
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
      <h1 className="font-display text-2xl mb-8">Add Education</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Institution"
          value={form.institution}
          onChange={(e) => update('institution', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />
        <input
          placeholder="Degree (e.g. B.Com)"
          value={form.degree}
          onChange={(e) => update('degree', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />
        <input
          placeholder="Field (e.g. Accounting)"
          value={form.field}
          onChange={(e) => update('field', e.target.value)}
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
            />
          </div>
          <div className="flex-1">
            <label className="text-xs opacity-60 block mb-1">End date</label>
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => update('end_date', e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--color-line)' }}
            />
          </div>
        </div>
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
          {saving ? 'Saving...' : 'Save education'}
        </button>
      </form>
    </main>
  )
}