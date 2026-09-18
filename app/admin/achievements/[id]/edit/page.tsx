'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function EditAchievement() {
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
      const { data } = await supabase.from('achievements').select('*').eq('id', id).single()
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

    const { error } = await supabase.from('achievements').update(rest).eq('id', id)

    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/admin/achievements')
    router.refresh()
  }

  if (loading || !form) return <main className="max-w-xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="font-display text-2xl mb-8">Edit Achievement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          value={form.title || ''}
          onChange={(e) => update('title', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />
        <input
          type="date"
          value={form.date || ''}
          onChange={(e) => update('date', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />
        <input
          placeholder="Organization"
          value={form.organization || ''}
          onChange={(e) => update('organization', e.target.value)}
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
          placeholder="Link URL"
          value={form.link_url || ''}
          onChange={(e) => update('link_url', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
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