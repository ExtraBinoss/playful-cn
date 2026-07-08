import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import * as React from 'react'
import {
  ButtonStatesPreview,
  VariationPreview,
} from '../../components/docs/variation-preview'
import {
  BubbleGumButton,
  CandyFieldInput,
  FeatureStickerCard,
  NeonGradientButton,
  QuietGhostButton,
  SketchOutlineButton,
  SoftCandyButton,
  StickerPopButton,
} from '../../components/playful'
import type {
  PlayfulButtonSize,
  PlayfulButtonTone,
} from '../../components/playful/buttons'
import { getComponentFamily, getComponentVariation } from '../../lib/docs/registry'

type InstallTab = 'npm' | 'ai'

export const Route = createFileRoute('/components/$family_/$variation')({
  component: ComponentVariationPage,
})

function ComponentVariationPage() {
  const { family: familySlug, variation: variationSlug } = Route.useParams()
  const family = getComponentFamily(familySlug)
  const variation = getComponentVariation(familySlug, variationSlug)
  const [installTab, setInstallTab] = React.useState<InstallTab>('npm')

  if (!family || !variation) {
    throw notFound()
  }

  const usageSnippet = getUsageSnippet(variation.componentName)
  const scopedCliCommand = `npx playful-ui add ${family.familySlug}/${variation.slug}`
  const aiInstallPrompt = `Add ${variation.name} to this React project. Use the ${variation.componentName} component from Playful Components. Preserve accessibility, Motion reduced-motion behavior, and CSS variable overrides. Import from '${variation.importPath}'. ${family.aiPrompt}`

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

      <div className="pc-doc-layout mt-8">
        <div className="grid gap-6">
          <FeatureStickerCard>
            <div className="grid min-h-64 place-items-center rounded-[var(--pc-radius-xl)] bg-[var(--pc-surface-soft)] p-6">
              <VariationPreview componentName={variation.componentName} />
            </div>
          </FeatureStickerCard>

          {family.familySlug === 'buttons' ? (
            <>
              <ButtonPlayground componentName={variation.componentName} />
              <FeatureStickerCard>
                <p className="pc-kicker m-0">States</p>
                <div className="mt-4">
                  <ButtonStatesPreview componentName={variation.componentName} />
                </div>
              </FeatureStickerCard>
            </>
          ) : null}

          <FeatureStickerCard>
            <p className="pc-kicker m-0">Usage</p>
            <pre className="pc-code-shell mt-3">
              <code>{usageSnippet}</code>
            </pre>
          </FeatureStickerCard>

          <FeatureStickerCard>
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
        </div>

        <aside className="pc-doc-sidebar">
          <FeatureStickerCard>
            <p className="pc-kicker m-0">Install</p>
            <div className="pc-install-tabs mt-3">
              <button
                type="button"
                data-active={installTab === 'npm' ? 'true' : undefined}
                onClick={() => setInstallTab('npm')}
              >
                NPM
              </button>
              <button
                type="button"
                data-active={installTab === 'ai' ? 'true' : undefined}
                onClick={() => setInstallTab('ai')}
              >
                AI
              </button>
            </div>
            <pre className="pc-code-shell mt-3 whitespace-pre-wrap">
              <code>
                {installTab === 'npm'
                  ? `npm install motion\n# future CLI\n${scopedCliCommand}\n\nimport { ${variation.componentName} } from '${variation.importPath}'`
                  : aiInstallPrompt}
              </code>
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
        </aside>
      </div>
    </main>
  )
}

function ButtonPlayground({ componentName }: { componentName: string }) {
  const [label, setLabel] = React.useState('Button')
  const [tone, setTone] = React.useState<PlayfulButtonTone>('default')
  const [size, setSize] = React.useState<PlayfulButtonSize>('md')
  const [loading, setLoading] = React.useState(false)
  const ButtonComponent = getButtonComponent(componentName)

  if (!ButtonComponent) {
    return null
  }

  return (
    <FeatureStickerCard>
      <p className="pc-kicker m-0">Editable props</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm font-black">
            Label
            <CandyFieldInput
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-black">
            Tone
            <select
              className="pc-doc-select"
              value={tone}
              onChange={(event) =>
                setTone(event.target.value as PlayfulButtonTone)
              }
            >
              <option value="default">default</option>
              <option value="success">success</option>
              <option value="error">error</option>
              <option value="warning">warning</option>
              <option value="info">info</option>
              <option value="neutral">neutral</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-black">
            Size
            <select
              className="pc-doc-select"
              value={size}
              onChange={(event) =>
                setSize(event.target.value as PlayfulButtonSize)
              }
            >
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
              <option value="xl">xl</option>
            </select>
          </label>
          <label className="pc-checkbox pc-checkbox-star-check">
            <input
              checked={loading}
              onChange={(event) => setLoading(event.target.checked)}
              type="checkbox"
            />
            <span className="pc-checkbox-box" aria-hidden />
            <span className="pc-checkbox-label">loading</span>
          </label>
        </div>
        <div className="grid min-h-48 place-items-center rounded-[var(--pc-radius-xl)] bg-[var(--pc-surface-soft)] p-6">
          <ButtonComponent loading={loading} size={size} tone={tone}>
            {label || 'Button'}
          </ButtonComponent>
        </div>
      </div>
    </FeatureStickerCard>
  )
}

function getButtonComponent(componentName: string) {
  switch (componentName) {
    case 'StickerPopButton':
      return StickerPopButton
    case 'BubbleGumButton':
      return BubbleGumButton
    case 'NeonGradientButton':
      return NeonGradientButton
    case 'SoftCandyButton':
      return SoftCandyButton
    case 'SketchOutlineButton':
      return SketchOutlineButton
    case 'QuietGhostButton':
      return QuietGhostButton
    default:
      return null
  }
}

function getUsageSnippet(componentName: string) {
  if (componentName.endsWith('Button')) {
    return `import { ${componentName} } from '@/components/playful'\n\nexport function Example() {\n  return (\n    <div className="flex flex-wrap gap-3">\n      <${componentName}>Default</${componentName}>\n      <${componentName} tone="success">Success</${componentName}>\n      <${componentName} tone="error">Delete</${componentName}>\n      <${componentName} loading>Saving</${componentName}>\n    </div>\n  )\n}`
  }

  return `import { ${componentName} } from '@/components/playful'\n\nexport function Example() {\n  return <${componentName} />\n}`
}
