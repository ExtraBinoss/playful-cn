import { Link } from '@tanstack/react-router'
import { Moon, Sun } from 'lucide-react'
import * as React from 'react'

export default function Header() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const root = document.documentElement
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light'
    setTheme(currentTheme)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement

    root.classList.remove('light', 'dark')
    root.classList.add(nextTheme)
    root.dataset.theme = nextTheme
    root.style.colorScheme = nextTheme
    setTheme(nextTheme)
  }

  return (
    <header className="pc-site-header">
      <nav className="pc-page pc-site-nav">
        <Link to="/" className="pc-brand">
          <span className="pc-brand-mark" />
          Playful Components
        </Link>
        <div className="pc-nav-links">
          <Link
            to="/"
            className="pc-nav-link"
            activeProps={{ className: 'pc-nav-link is-active' }}
          >
            Home
          </Link>
          <Link
            to="/components"
            className="pc-nav-link"
            activeProps={{ className: 'pc-nav-link is-active' }}
          >
            Components
          </Link>
          <a className="pc-nav-link" href="https://github.com">
            GitHub
          </a>
          <button
            type="button"
            className="pc-theme-toggle"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
