'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

export default function AdminEducationList() {
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadEducation() {
    const supabase = createClient()
    const { data } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true })
    setEducation(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadEducation()
  }, [])

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return
    const supabase = createClient()
    await supabase.from('education').delete().eq('id', id)
    loadEducation()
  }

  if (loading) return <main className="max-w-2xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl">Education</h1>
        <Link
          href="/admin/education/new"
          className="text-sm px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          + Add Education
        </Link>
      </div>
      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="flex items-center justify-between border rounded px-4 py-3"
            style={{ borderColor: 'var(--color-line)' }}
          >
            <div>
              <p className="text-sm font-medium">{edu.degree}</p>
              <p className="text-xs opacity-60">{edu.institution} · {edu.published ? 'Published' : 'Draft'}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/education/${edu.id}/edit`} style={{ color: 'var(--color-accent)' }}>
                Edit
              </Link>
              <button onClick={() => handleDelete(edu.id, edu.degree)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
        {education.length === 0 && <p className="text-sm opacity-60">No education entries yet.</p>}
      </div>
    </main>
  )
}