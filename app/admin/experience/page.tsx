'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

export default function AdminExperienceList() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadExperiences() {
    const supabase = createClient()
    const { data } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true })
    setExperiences(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadExperiences()
  }, [])

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return
    const supabase = createClient()
    await supabase.from('experiences').delete().eq('id', id)
    loadExperiences()
  }

  if (loading) return <main className="max-w-2xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="text-sm px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          + Add Experience
        </Link>
      </div>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center justify-between border rounded px-4 py-3"
            style={{ borderColor: 'var(--color-line)' }}
          >
            <div>
              <p className="text-sm font-medium">{exp.job_title}</p>
              <p className="text-xs opacity-60">{exp.company} · {exp.published ? 'Published' : 'Draft'}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/experience/${exp.id}/edit`} style={{ color: 'var(--color-accent)' }}>
                Edit
              </Link>
              <button onClick={() => handleDelete(exp.id, exp.job_title)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
        {experiences.length === 0 && <p className="text-sm opacity-60">No experience entries yet.</p>}
      </div>
    </main>
  )
}