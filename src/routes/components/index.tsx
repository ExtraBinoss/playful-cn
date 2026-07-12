import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'
import { SideScroll } from '../../components/SideScroll'
import { CorePairPreview, VariationPreview } from '../../components/docs/variation-preview'
import {
  FeatureStickerCard,
  PlayfulSearchInput,
  playfulVisualVariants,
  StickerBreadcrumb,
} from '../../components/playful'
import { componentRegistry } from '../../lib/docs/registry'

export const Route = createFileRoute('/components/')({
  validateSearch: (search) => ({
    collection: typeof search.collection === 'string' ? search.collection : undefined,
  }),
  component: ComponentsPage,
})

function ComponentsPage() {
  const [query, setQuery] = React.useState('')
  const { collection: selectedCollection } = Route.useSearch()
  const deferredQuery = React.useDeferredValue(query.toLowerCase())
  const collections = playfulVisualVariants.map((collection) => ({
    ...collection,
    components: componentRegistry
      .flatMap((family) =>
        family.variations.map((variation) => ({ family, variation })),
      )
      .filter(({ variation }) => variation.coreVariant === collection.slug),
  }))
  const visibleFamilies = componentRegistry.filter((family) => {
    if (selectedCollection && !family.variations.some((variation) => variation.coreVariant === selectedCollection)) return false
    if (!deferredQuery) return true
    const haystack = [
      family.familyName,
      family.description,
      ...family.tags,
      ...family.variations.flatMap((variation) => [
        variation.name,
        variation.description,
        ...variation.tags,
      ]),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(deferredQuery)
  })
  const activeCollection = collections.find((collection) => collection.slug === selectedCollection)
  const collectionComponents = activeCollection?.components.filter(({ family, variation }) => {
    if (!deferredQuery) return true
    return [family.familyName, variation.name, variation.description, ...variation.tags].join(' ').toLowerCase().includes(deferredQuery)
  }) ?? []
  const basePath = import.meta.env.BASE_URL
  const breadcrumbItems = activeCollection
    ? [
        { label: 'Home', href: basePath },
        { label: 'Components', href: `${basePath}components/` },
        { label: activeCollection.label },
      ]
    : [{ label: 'Home', href: basePath }, { label: 'Components' }]

  return (
    <main className="pc-page pc-section">
      <div className="mb-8">
        <StickerBreadcrumb items={breadcrumbItems} />
      </div>
      <p className="pc-kicker">Documentation</p>
      <h1 className="pc-display m-0 text-5xl">Components</h1>
      <p className="max-w-2xl text-lg text-[var(--pc-ink-soft)]">
        Browse visual collections first, then component families. Open a family
        to see its available variations, docs, props, tokens, and usage snippets.
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
              <a
                className="pc-variation-doc-link mt-3 w-fit"
                href={`${import.meta.env.BASE_URL}components/?collection=${encodeURIComponent(collection.slug)}`}
              >
                Open full collection
              </a>
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

      {activeCollection ? (
        <section className="mt-10">
          <p className="pc-kicker m-0">{activeCollection.label} previews</p>
          <p className="pc-variation-description mt-2">Every component available in this visual collection.</p>
          <div className="pc-grid mt-4">
            {collectionComponents.map(({ family, variation }) => (
              <FeatureStickerCard className="pc-variation-card" key={`${family.familySlug}-${variation.slug}`}>
                <div className="pc-variation-preview">
                  <VariationPreview componentName={variation.componentName} />
                </div>
                <div>
                  <p className="pc-kicker m-0">{family.familyName}</p>
                  <h2 className="m-0 text-xl font-black">{variation.name}</h2>
                  <p className="pc-variation-description">{variation.description}</p>
                </div>
                <Link className="pc-variation-doc-link mt-3 w-fit" to="/components/$family/$variation" params={{ family: family.familySlug, variation: variation.slug }}>
                  View docs
                </Link>
              </FeatureStickerCard>
            ))}
          </div>
        </section>
      ) : null}

      {!activeCollection ? (
      <section className="mt-10">
        <p className="pc-kicker m-0">Component families</p>
        <div className="pc-grid mt-4">
          {visibleFamilies.map((family) => {
            const previewVariation =
              family.variations.find((variation) => variation.category === 'core') ??
              family.variations[0]
            return (
              <Link
                className="no-underline"
                key={family.familySlug}
                to="/components/$family"
                params={{ family: family.familySlug }}
              >
                <FeatureStickerCard className="h-full">
                  <div className="pointer-events-none mb-5 grid min-h-32 place-items-center rounded-[var(--pc-radius-lg)] bg-[var(--pc-surface-soft)] p-4">
                    {previewVariation ? (
                      <CorePairPreview componentName={previewVariation.componentName} />
                    ) : null}
                  </div>
                  <h2 className="m-0 text-xl font-black">{family.familyName}</h2>
                  <p className="text-[var(--pc-ink-soft)]">
                    {family.description}
                  </p>
                  <SideScroll
                    className="mt-4"
                    viewportClassName="pc-tag-scroll"
                    aria-label={`${family.familyName} variations`}
                  >
                    {family.variations.map((variation) => (
                      <span className="pc-badge pc-badge-outline pc-badge-tag" key={variation.slug}>
                        {variation.name}
                      </span>
                    ))}
                  </SideScroll>
                </FeatureStickerCard>
              </Link>
            )
          })}
        </div>
      </section>
      ) : null}
    </main>
  )
}
