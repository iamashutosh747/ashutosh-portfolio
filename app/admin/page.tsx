import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="font-display text-3xl mb-8">Dashboard</h1>
      <Link
        href="/admin/experience/new"
        className="inline-block px-4 py-2 rounded text-sm text-white"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        + Add Experience
      </Link>
    </main>
  )
}