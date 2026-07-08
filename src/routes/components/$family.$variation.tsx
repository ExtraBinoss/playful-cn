import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { FeatureStickerCard } from '../../components/playful'
import { VariationPreview } from '../../components/docs/variation-preview'
import { getComponentFamily, getComponentVariation } from '../../lib/docs/registry'

export const Route = createFileRoute('/components/$family/$variation')({
  component: ComponentVariationPage,
})

function ComponentVariationPage() {
  const { family: familySlug, variation: variationSlug } = Route.useParams()
  const family = getComponentFamily(familySlug)
  const variation = getComponentVariation(familySlug, variationSlug)

  if (!family || !variation) {
    throw notFound()
  }

  return (
    <main className="pc-page pc-section">
      <div className="pc-row">
        <Link className="pc-nav-link inline-flex" to="/components">
          Components
        </Link>
        <Link
          className="pc-nav-link inline-flex"
          to="/components/$family"
          params={{ family: family.familySlug }}
        >
          {family.familyName}
        </Link>
      </div>

      <p className="pc-kicker mt-8">Variation</p>
      <h1 className="pc-display m-0 text-5xl">{variation.name}</h1>
      <p className="max-w-2xl text-lg text-[var(--pc-ink-soft)]">
        {variation.description}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <FeatureStickerCard>
          <div className="grid min-h-64 place-items-center rounded-[var(--pc-radius-xl)] bg-[var(--pc-surface-soft)] p-6">
            <VariationPreview componentName={variation.componentName} />
          </div>
        </FeatureStickerCard>

        <div className="grid gap-6">
          <FeatureStickerCard>
            <p className="pc-kicker m-0">Import</p>
            <pre className="mt-3 overflow-x-auto rounded-[var(--pc-radius-md)] bg-[var(--pc-ink)] p-4 text-sm font-bold text-white">
              <code>{`import { ${variation.componentName} } from '${variation.importPath}'`}</code>
            </pre>
          </FeatureStickerCard>

          <FeatureStickerCard>
            <p className="pc-kicker m-0">Tokens</p>
            <div className="pc-row mt-3">
              {variation.tokens.map((token) => (
                <code key={token}>{token}</code>
              ))}
            </div>
          </FeatureStickerCard>
        </div>
      </div>

      <FeatureStickerCard className="mt-6">
        <p className="pc-kicker m-0">Props</p>
        <div className="mt-4 overflow-x-auto">
          <table className="pc-doc-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {variation.props.map((prop) => (
                <tr key={prop.name}>
                  <td>{prop.name}</td>
                  <td>
                    <code>{prop.type}</code>
                  </td>
                  <td>{prop.defaultValue ?? '-'}</td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FeatureStickerCard>
    </main>
  )
}
