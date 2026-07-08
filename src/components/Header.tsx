import { Link } from '@tanstack/react-router'

export default function Header() {
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
        </div>
      </nav>
    </header>
  )
}
