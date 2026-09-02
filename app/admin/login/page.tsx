'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="max-w-sm mx-auto px-6 py-32">
      <h1 className="font-display text-2xl mb-8">Admin login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded border text-sm"
          style={{ borderColor: 'var(--color-line)' }}
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 rounded text-sm text-white"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          Log in
        </button>
      </form>
    </main>
  )
}