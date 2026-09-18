'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const pathname = usePathname()

  if (pathname === '/unlock') return null

  return (
    <nav className="max-w-2xl mx-auto px-6 pt-8 flex items-center justify-between text-sm flex-wrap gap-3">
      <Link href="/" className="font-display text-base">
        Ashutosh Sharma
      </Link>
      <div className="flex gap-5 flex-wrap items-center">
        <Link href="/" style={{ color: 'var(--color-accent)' }}>Home</Link>
        <Link href="/experience" style={{ color: 'var(--color-accent)' }}>Experience</Link>
        <Link href="/projects" style={{ color: 'var(--color-accent)' }}>Projects</Link>
        <Link href="/education" style={{ color: 'var(--color-accent)' }}>Education</Link>
        <Link href="/achievements" style={{ color: 'var(--color-accent)' }}>Achievements</Link>
        <Link href="/certifications" style={{ color: 'var(--color-accent)' }}>Certifications</Link>
        <a href="mailto:your-email@ashutosh-sharma.com" style={{ color: 'var(--color-accent)' }}>Contact</a>
        <ThemeToggle />
      </div>
    </nav>
  )
}