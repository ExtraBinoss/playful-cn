import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import * as React from 'react'
import { SideScroll } from '../../components/SideScroll'
import {
  CorePairPreview,
  VariationPreview,
} from '../../components/docs/variation-preview'
import {
  FeatureStickerCard,
  PlayfulSearchInput,
  playfulVisualVariants,
} from '../../components/playful'
import { componentRegistry } from '../../lib/docs/registry'

export const Route = createFileRoute('/components/')({
  component: ComponentsPage,
})

function ComponentsPage() {
  const [query, setQuery] = React.useState('')
  const deferredQuery = React.useDeferredValue(query.toLowerCase())
  const allComponents = componentRegistry.flatMap((family) =>
    family.variations.map((variation) => ({ family, variation })),
  )
  const collections = playfulVisualVariants.map((collection) => ({
    ...collection,
    components: allComponents.filter(
      ({ variation }) => variation.coreVariant === collection.slug,
    ),
  }))

  return (
    <main className="pc-page pc-section">
      <Link className="pc-back-link" to="/">
        <ArrowLeft size={18} />
        Home
      </Link>
      <p className="pc-kicker">Documentation</p>
      <h1 className="pc-display m-0 text-5xl">Components</h1>
      <p className="max-w-2xl text-lg text-[var(--pc-ink-soft)]">
        Browse visual collections first, then every individual component with
        its own docs, props, tokens, and usage snippet.
      </p>
      <div className="mt-8 max-w-xl">
        <PlayfulSearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search highlights buttons, tooltip, color picker..."
        />
      </div>
      <section className="mt-8">
        <p className="pc-kicker m-0">Collections</p>
        <div className="pc-grid mt-4">
          {collections.map((collection) => (
            <FeatureStickerCard
              className="pc-variation-card"
              key={collection.slug}
            >
              <div className="pc-variation-preview">
                <CorePairPreview componentName={collection.buttonComponent} />
              </div>
              <h2 className="m-0 text-xl font-black">{collection.label}</h2>
              <p className="pc-variation-description">
                {collection.description}
              </p>
              <SideScroll
                className="mt-4"
                viewportClassName="pc-tag-scroll"
                aria-label={`${collection.label} collection components`}
              >
                {collection.components.map(({ family, variation }) => (
                  <Link
                    className="pc-badge pc-badge-outline pc-badge-tag no-underline"
                    key={`${family.familySlug}-${variation.slug}`}
                    to="/components/$family/$variation"
                    params={{
                      family: family.familySlug,
                      variation: variation.slug,
                    }}
                  >
                    {variation.name}
                  </Link>
                ))}
              </SideScroll>
            </FeatureStickerCard>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="pc-kicker m-0">All components</p>
        <div className="pc-grid mt-4">
          {allComponents.map(({ family, variation }) => {
            const haystack = [
              family.familyName,
              family.description,
              ...family.tags,
              variation.name,
              variation.description,
              ...variation.tags,
            ]
              .join(' ')
              .toLowerCase()
            const isDimmed =
              deferredQuery.length > 0 && !haystack.includes(deferredQuery)

            return (
              <Link
                className="no-underline"
                key={`${family.familySlug}-${variation.slug}`}
                to="/components/$family/$variation"
                params={{
                  family: family.familySlug,
                  variation: variation.slug,
                }}
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
                    <VariationPreview componentName={variation.componentName} />
                  </div>
                  <h2 className="m-0 text-xl font-black">{variation.name}</h2>
                  <p className="text-[var(--pc-ink-soft)]">
                    {variation.description}
                  </p>
                  <SideScroll
                    className="mt-4"
                    viewportClassName="pc-tag-scroll"
                    aria-label={`${variation.name} tags`}
                  >
                    <span className="pc-badge pc-badge-outline pc-badge-tag">
                      {family.familyName}
                    </span>
                    {getVisibleTags(family.familyName, variation.tags).map(
                      (tag) => (
                        <span
                          className="pc-badge pc-badge-outline pc-badge-tag"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </SideScroll>
                </FeatureStickerCard>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function getVisibleTags(familyName: string, tags: Array<string>) {
  const normalizedFamily = familyName.toLowerCase().replace(/s$/, '')

  return tags.filter((tag) => {
    const normalizedTag = tag.toLowerCase().replace(/s$/, '')
    return normalizedTag !== normalizedFamily
  })
}
