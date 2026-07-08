export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="pc-site-footer">
      <div className="pc-page flex flex-col justify-between gap-3 sm:flex-row">
        <p className="m-0 text-sm font-bold text-[var(--pc-ink-soft)]">
          &copy; {year} Playful Components.
        </p>
        <p className="pc-kicker m-0">Fun, accessible React primitives</p>
      </div>
    </footer>
  )
}
