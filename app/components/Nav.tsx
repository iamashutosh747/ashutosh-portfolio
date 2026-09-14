import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="max-w-2xl mx-auto px-6 pt-8 flex items-center justify-between text-sm">
      <Link href="/" className="font-display text-base">
        Ashutosh Sharma
      </Link>
      <div className="flex gap-6">
        <Link href="/" style={{ color: 'var(--color-accent)' }}>Home</Link>
        <Link href="/projects" style={{ color: 'var(--color-accent)' }}>Projects</Link>
      </div>
    </nav>
  )
}