'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function NewCertification() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    issuing_organization: '',
    issue_date: '',
    expiry_date: '',
    credential_id: '',
    credential_url: '',
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
    const { error } = await supabase.from('certifications').insert({
      ...form,
      expiry_date: form.expiry_date || null,
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
      <h1 className="font-display text-2xl mb-8">Add Certification</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Certification name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />
        <input
          placeholder="Issuing organization"
          value={form.issuing_organization}
          onChange={(e) => update('issuing_organization', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs opacity-60 block mb-1">Issue date</label>
            <input
              type="date"
              value={form.issue_date}
              onChange={(e) => update('issue_date', e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--color-line)' }}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs opacity-60 block mb-1">Expiry date (optional)</label>
            <input
              type="date"
              value={form.expiry_date}
              onChange={(e) => update('expiry_date', e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--color-line)' }}
            />
          </div>
        </div>
        <input
          placeholder="Credential ID (optional)"
          value={form.credential_id}
          onChange={(e) => update('credential_id', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />
        <input
          placeholder="Credential URL (optional)"
          value={form.credential_url}
          onChange={(e) => update('credential_url', e.target.value)}
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
          {saving ? 'Saving...' : 'Save certification'}
        </button>
      </form>
    </main>
  )
}