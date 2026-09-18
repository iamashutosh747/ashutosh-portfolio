'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

export default function AdminSkillsList() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadSkills() {
    const supabase = createClient()
    const { data } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true })
    setSkills(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadSkills()
  }, [])

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return
    const supabase = createClient()
    await supabase.from('skills').delete().eq('id', id)
    loadSkills()
  }

  if (loading) return <main className="max-w-2xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="text-sm px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          + Add Skill
        </Link>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between border rounded px-4 py-3"
            style={{ borderColor: 'var(--color-line)' }}
          >
            <div>
              <p className="text-sm font-medium">{skill.name}</p>
              <p className="text-xs opacity-60">{skill.category} · {skill.published ? 'Published' : 'Draft'}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/skills/${skill.id}/edit`} style={{ color: 'var(--color-accent)' }}>
                Edit
              </Link>
              <button onClick={() => handleDelete(skill.id, skill.name)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
        {skills.length === 0 && <p className="text-sm opacity-60">No skills yet.</p>}
      </div>
    </main>
  )
}