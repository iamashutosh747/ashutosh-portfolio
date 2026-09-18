'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

const STATUS_OPTIONS = ['Idea', 'Planning', 'In Progress', 'Completed', 'Paused', 'Archived']

export default function EditProject() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [form, setForm] = useState<any>(null)
  const [technologies, setTechnologies] = useState<{ id: number; name: string }[]>([])
  const [selectedTechIds, setSelectedTechIds] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const supabase = createClient()

      const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      const { data: allTech } = await supabase
        .from('technologies')
        .select('id, name')
        .order('name')

      const { data: links } = await supabase
        .from('project_technologies')
        .select('technology_id')
        .eq('project_id', id)

      setForm(project)
      setTechnologies(allTech || [])
      setSelectedTechIds((links || []).map((l: any) => l.technology_id))
      setLoading(false)
    }
    load()
  }, [id])

  function update(field: string, value: string | boolean | number) {
    setForm((prev: any) => ({ ...prev, [field]: value }))
  }

  function toggleTech(techId: number) {
    setSelectedTechIds((prev) =>
      prev.includes(techId) ? prev.filter((t) => t !== techId) : [...prev, techId]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const supabase = createClient()
    const { id: formId, ...rest } = form

    const { error } = await supabase
      .from('projects')
      .update({
        ...rest,
        completion_date: form.completion_date || null,
      })
      .eq('id', id)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    await supabase.from('project_technologies').delete().eq('project_id', id)
    if (selectedTechIds.length > 0) {
      const links = selectedTechIds.map((technology_id) => ({
        project_id: Number(id),
        technology_id,
      }))
      await supabase.from('project_technologies').insert(links)
    }

    setSaving(false)
    router.push('/admin/projects')
    router.refresh()
  }

  if (loading || !form) return <main className="max-w-xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="font-display text-2xl mb-8">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Project name"
          value={form.name || ''}
          onChange={(e) => update('name', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />

        <input
          placeholder="Short description"
          value={form.short_description || ''}
          onChange={(e) => update('short_description', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />

        <textarea
          placeholder="Full description"
          value={form.description || ''}
          onChange={(e) => update('description', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm min-h-20"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <div>
          <label className="text-xs opacity-60 block mb-1">Status</label>
          <select
            value={form.status || 'In Progress'}
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
              value={form.start_date || ''}
              onChange={(e) => update('start_date', e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--color-line)' }}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs opacity-60 block mb-1">Completion date</label>
            <input
              type="date"
              value={form.completion_date || ''}
              onChange={(e) => update('completion_date', e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--color-line)' }}
            />
          </div>
        </div>

        <input
          placeholder="Your role"
          value={form.role || ''}
          onChange={(e) => update('role', e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
        />

        <div>
          <label className="text-xs opacity-60 block mb-2">Technologies</label>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <label
                key={tech.id}
                className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border cursor-pointer"
                style={{
                  borderColor: selectedTechIds.includes(tech.id) ? 'var(--color-accent)' : 'var(--color-line)',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedTechIds.includes(tech.id)}
                  onChange={() => toggleTech(tech.id)}
                  className="hidden"
                />
                {tech.name}
              </label>
            ))}
          </div>
        </div>

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