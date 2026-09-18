'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'

export default function AdminAchievementsList() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadAchievements() {
    const supabase = createClient()
    const { data } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order', { ascending: true })
    setAchievements(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadAchievements()
  }, [])

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return
    const supabase = createClient()
    await supabase.from('achievements').delete().eq('id', id)
    loadAchievements()
  }

  if (loading) return <main className="max-w-2xl mx-auto px-6 py-16">Loading...</main>

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl">Achievements</h1>
        <Link
          href="/admin/achievements/new"
          className="text-sm px-4 py-2 rounded text-white"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          + Add Achievement
        </Link>
      </div>
      <div className="space-y-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="flex items-center justify-between border rounded px-4 py-3"
            style={{ borderColor: 'var(--color-line)' }}
          >
            <div>
              <p className="text-sm font-medium">{ach.title}</p>
              <p className="text-xs opacity-60">{ach.organization} · {ach.published ? 'Published' : 'Draft'}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/achievements/${ach.id}/edit`} style={{ color: 'var(--color-accent)' }}>
                Edit
              </Link>
              <button onClick={() => handleDelete(ach.id, ach.title)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
        {achievements.length === 0 && <p className="text-sm opacity-60">No achievements yet.</p>}
      </div>
    </main>
  )
}