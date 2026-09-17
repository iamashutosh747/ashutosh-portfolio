'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UnlockPage() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('Incorrect username')
    }
  }

  return (
    <main className="max-w-sm mx-auto px-6 py-32">
      <h1 className="font-display text-2xl mb-8">Enter username</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          autoFocus
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 rounded text-sm text-white"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          Continue
        </button>
      </form>
    </main>
  )
}