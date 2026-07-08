import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ButtonStatesPreview,
  VariationPreview,
} from '../../components/docs/variation-preview'
import { FeatureStickerCard } from '../../components/playful'
import { getComponentFamily } from '../../lib/docs/registry'

export const Route = createFileRoute('/components/$family')({
  component: ComponentFamilyPage,
})

function ComponentFamilyPage() {
  const { family: familySlug } = Route.useParams()
  const family = getComponentFamily(familySlug)

  if (!family) {
    throw notFound()
  }

  return (
    <main className="pc-page pc-section">
      <Link className="pc-nav-link inline-flex" to="/components">
        Components
      </Link>
      <p className="pc-kicker mt-8">Family</p>
      <h1 className="pc-display m-0 text-5xl">{family.familyName}</h1>
      <p className="max-w-2xl text-lg text-[var(--pc-ink-soft)]">
        {family.description}
      </p>

      <div className="pc-variation-grid mt-8">
        {family.variations.map((variation) => (
          <Link
            className="no-underline"
            key={variation.slug}
            to="/components/$family/$variation"
            params={{ family: family.familySlug, variation: variation.slug }}
          >
            <FeatureStickerCard className="pc-variation-card">
              <div className="pc-variation-preview">
                <VariationPreview componentName={variation.componentName} />
              </div>
              <div>
                <h2 className="m-0 text-xl font-black">{variation.name}</h2>
                <p className="pc-variation-description">
                  {variation.description}
                </p>
              </div>
              {family.familySlug === 'buttons' ? (
                <div className="pc-variation-states">
                  <ButtonStatesPreview componentName={variation.componentName} />
                </div>
              ) : (
                <div />
              )}
              <div
                className="pc-horizontal-scroll pc-tag-scroll"
                aria-label={`${variation.name} tags`}
              >
                {variation.tags.map((tag) => (
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
