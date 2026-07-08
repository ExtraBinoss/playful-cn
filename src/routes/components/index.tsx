import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import * as React from 'react'
import { VariationPreview } from '../../components/docs/variation-preview'
import { FeatureStickerCard, PlayfulSearchInput } from '../../components/playful'
import { componentRegistry } from '../../lib/docs/registry'

export const Route = createFileRoute('/components/')({
  component: ComponentsPage,
})

function ComponentsPage() {
  const [query, setQuery] = React.useState('')
  const deferredQuery = React.useDeferredValue(query.toLowerCase())

  return (
    <main className="pc-page pc-section">
      <p className="pc-kicker">Documentation</p>
      <h1 className="pc-display m-0 text-5xl">Components</h1>
      <p className="max-w-2xl text-lg text-[var(--pc-ink-soft)]">
        Browse every component family. Click a family to open its docs,
        installation snippet, AI prompt, props, tokens, and variations.
      </p>
      <div className="mt-8 max-w-xl">
        <PlayfulSearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search highlights buttons, tooltip, color picker..."
        />
      </div>
      <div className="pc-grid mt-8">
        {componentRegistry.map((component) => {
          const haystack = [
            component.familyName,
            component.description,
            ...component.tags,
            ...component.variations.flatMap((variation) => [
              variation.name,
              variation.description,
              ...variation.tags,
            ]),
          ]
            .join(' ')
            .toLowerCase()
          const isDimmed =
            deferredQuery.length > 0 && !haystack.includes(deferredQuery)

          return (
          <Link
            className="no-underline"
            key={component.familySlug}
            to="/components/$family"
            params={{ family: component.familySlug }}
          >
            <FeatureStickerCard
              className={[
                'h-full transition-opacity',
                isDimmed ? 'opacity-35' : undefined,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="pointer-events-none mb-5 grid min-h-32 place-items-center rounded-[var(--pc-radius-lg)] bg-[var(--pc-surface-soft)] p-4">
                <div className="pc-row justify-center">
                  {component.variations.slice(0, 3).map((variation) => (
                    <VariationPreview
                      componentName={variation.componentName}
                      key={variation.slug}
                    />
                  ))}
                </div>
              </div>
              <h2 className="m-0 text-xl font-black">{component.familyName}</h2>
              <p className="text-[var(--pc-ink-soft)]">
                {component.description}
              </p>
              <p className="m-0 text-sm font-black text-[var(--pc-purple)]">
                {component.variations.length} variation
                {component.variations.length > 1 ? 's' : ''}
              </p>
              <div className="pc-row mt-4">
                {component.tags.map((tag) => (
                  <span className="pc-badge pc-badge-outline" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </FeatureStickerCard>
          </Link>
          )
        })}
      </div>
    </main>
  )
}
