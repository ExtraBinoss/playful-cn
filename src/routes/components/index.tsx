import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { PlayfulCard, PlayfulSearchInput } from '../../components/playful'
import searchIndex from '../../generated/components.search.json'

export const Route = createFileRoute('/components/')({
  component: ComponentsPage,
})

function ComponentsPage() {
  const [query, setQuery] = React.useState('')
  const deferredQuery = React.useDeferredValue(query.toLowerCase())
  const components = searchIndex.filter((component) => {
    const haystack = [
      component.name,
      component.description,
      ...component.tags,
    ].join(' ').toLowerCase()

    return haystack.includes(deferredQuery)
  })

  return (
    <main className="pc-page pc-section">
      <p className="pc-kicker">Documentation</p>
      <h1 className="pc-display m-0 text-5xl">Components</h1>
      <div className="mt-8 max-w-xl">
        <PlayfulSearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search buttons, color picker, tabs..."
        />
      </div>
      <div className="pc-grid mt-8">
        {components.map((component) => (
          <PlayfulCard key={component.slug} variant="sticker" interactive>
            <h2 className="m-0 text-xl font-black">{component.name}</h2>
            <p className="text-[var(--pc-ink-soft)]">{component.description}</p>
            <div className="pc-row">
              {component.tags.map((tag) => (
                <span className="pc-badge pc-badge-outline" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </PlayfulCard>
        ))}
      </div>
    </main>
  )
}
