import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import * as React from 'react'
import { FeatureStickerCard, PlayfulSearchInput } from '../../components/playful'
import { componentRegistry } from '../../lib/docs/registry'

export const Route = createFileRoute('/components/')({
  component: ComponentsPage,
})

function ComponentsPage() {
  const [query, setQuery] = React.useState('')
  const deferredQuery = React.useDeferredValue(query.toLowerCase())
  const components = componentRegistry.filter((component) => {
    const haystack = [
      component.familyName,
      component.description,
      ...component.tags,
      ...component.variations.flatMap((variation) => [
        variation.name,
        variation.description,
        ...variation.tags,
      ]),
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
          placeholder="Search buttons, tooltip, color picker..."
        />
      </div>
      <div className="pc-grid mt-8">
        {components.map((component) => (
          <Link
            className="no-underline"
            key={component.familySlug}
            to="/components/$family"
            params={{ family: component.familySlug }}
          >
            <FeatureStickerCard className="h-full">
              <h2 className="m-0 text-xl font-black">{component.familyName}</h2>
            <p className="text-[var(--pc-ink-soft)]">{component.description}</p>
              <p className="m-0 text-sm font-black text-[var(--pc-purple)]">
                {component.variations.length} variation
                {component.variations.length > 1 ? 's' : ''}
              </p>
            <div className="pc-row">
              {component.tags.map((tag) => (
                <span className="pc-badge pc-badge-outline" key={tag}>
                  {tag}
                </span>
              ))}
              </div>
            </FeatureStickerCard>
          </Link>
        ))}
      </div>
    </main>
  )
}
