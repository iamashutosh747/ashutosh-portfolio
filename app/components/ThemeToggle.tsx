'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isDarkMode = stored === 'dark'
    setIsDark(isDarkMode)
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      style={{
        width: '36px',
        height: '20px',
        borderRadius: '10px',
        border: '1px solid var(--color-line)',
        backgroundColor: isDark ? 'var(--color-accent)' : 'transparent',
        position: 'relative',
        cursor: 'pointer',
        padding: 0,
        transition: 'background-color 0.15s ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: isDark ? '18px' : '2px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: isDark ? '#EDE8DE' : 'var(--color-text)',
          transition: 'left 0.15s ease',
        }}
      />
    </button>
  )
}