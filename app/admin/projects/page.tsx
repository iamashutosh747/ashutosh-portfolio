'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

export default function AdminProjectsList() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadProjects() {
    const supabase = createClient()
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
    setProjects(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return
    const supabase = createClient()
    await supabase.from('projects').delete().eq('id', id)
    loadProjects()
  }

  if (loading) return <main className="max-w-2xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="text-sm px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          + Add Project
        </Link>
      </div>
      <div className="space-y-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="flex items-center justify-between border rounded px-4 py-3"
            style={{ borderColor: 'var(--color-line)' }}
          >
            <div>
              <p className="text-sm font-medium">{proj.name}</p>
              <p className="text-xs opacity-60">{proj.status} · {proj.published ? 'Published' : 'Draft'}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/projects/${proj.id}/edit`} style={{ color: 'var(--color-accent)' }}>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(proj.id, proj.name)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-sm opacity-60">No projects yet.</p>
        )}
      </div>
    </main>
  )
}