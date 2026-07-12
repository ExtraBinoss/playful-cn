import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Search } from 'lucide-react'
import * as React from 'react'
import {
  ButtonStatesPreview,
  InputStatesPreview,
  VariationPreview,
} from '../../components/docs/variation-preview'
import {
  BubbleFieldInput,
  BubbleGumButton,
  FeatureStickerCard,
  QuietGhostButton,
  SketchOutlineButton,
  SketchFieldInput,
  SoftCandyButton,
  StickerFieldInput,
  StickerPopButton,
} from '../../components/playful'
import type {
  PlayfulButtonSize,
  PlayfulButtonTone,
} from '../../components/playful/buttons'
import type {
  PlayfulInputSize,
  PlayfulInputTone,
} from '../../components/playful/inputs'
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
  const scopedCliCommand = `npx playful-cn add ${family.familySlug}/${variation.slug}`
  const aiInstallPrompt = `Add ${variation.name} to this React project. Use the ${variation.componentName} component from Playful Components. Preserve accessibility, Motion reduced-motion behavior, and CSS variable overrides. Import from '${variation.importPath}'. ${family.aiPrompt}`
  const installDependencies = getInstallDependencies(family.familySlug)

  return (
    <main className="pc-page pc-section">
      <div className="pc-row">
        <Link
          className="pc-back-link"
          to="/components/$family"
          params={{ family: family.familySlug }}
          aria-label={`Back to ${family.familyName}`}
        >
          <ArrowLeft size={18} />
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

          {family.familySlug === 'inputs' ? (
            <>
              <InputPlayground componentName={variation.componentName} />
              <FeatureStickerCard>
                <p className="pc-kicker m-0">States</p>
                <div className="mt-4">
                  <InputStatesPreview componentName={variation.componentName} />
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

          <FeatureStickerCard>
            <p className="pc-kicker m-0">Dependencies</p>
            <div className="pc-row mt-3">
              {installDependencies.map((dependency) => (
                <code key={dependency}>{dependency}</code>
              ))}
            </div>
          </FeatureStickerCard>
        </aside>
      </div>
    </main>
  )
}

function getInstallDependencies(familySlug: string) {
  const dependenciesByFamily: Record<string, Array<string>> = {
    badges: ['react'],
    buttons: ['react', 'motion'],
    cards: ['react', 'motion'],
    checkboxes: ['react'],
    'radio-groups': ['react', 'motion'],
    'color-pickers': ['react', 'motion'],
    inputs: ['react', 'motion'],
    textareas: ['react', 'motion'],
    'input-groups': ['react'],
    'input-otp': ['react', 'motion'],
    labels: ['react'],
    fields: ['react'],
    switches: ['react', 'motion'],
    tabs: ['react', 'motion'],
    tooltips: ['react', 'motion'],
    toasts: ['react', 'motion'],
    dialogs: ['react', 'motion'],
    'alert-dialogs': ['react', 'motion'],
    drawers: ['react', 'motion'],
    sheets: ['react', 'motion'],
    popovers: ['react', 'motion'],
    'hover-cards': ['react', 'motion'],
    menus: ['react', 'motion'],
    accordions: ['react', 'motion'],
    collapsibles: ['react', 'motion'],
    carousels: ['react', 'motion'],
    calendars: ['react'],
    'date-pickers': ['react', 'motion'],
    breadcrumbs: ['react'],
    paginations: ['react'],
    tables: ['react'],
    'navigation-menus': ['react'],
    'data-tables': ['react'],
  }

  return dependenciesByFamily[familySlug] ?? ['react']
}

function InputPlayground({ componentName }: { componentName: string }) {
  const [value, setValue] = React.useState('hello@playful.dev')
  const [tone, setTone] = React.useState<PlayfulInputTone>('default')
  const [size, setSize] = React.useState<PlayfulInputSize>('md')
  const [invalid, setInvalid] = React.useState(false)
  const InputComponent = getInputComponent(componentName)

  if (!InputComponent) {
    return null
  }

  return (
    <FeatureStickerCard>
      <p className="pc-kicker m-0">Editable props</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm font-black">
            Value
            <input
              className="pc-doc-input"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </label>
          <label className="grid gap-1 text-sm font-black">
            Tone
            <select
              className="pc-doc-select"
              value={tone}
              onChange={(event) =>
                setTone(event.target.value as PlayfulInputTone)
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
                setSize(event.target.value as PlayfulInputSize)
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
              checked={invalid}
              onChange={(event) => setInvalid(event.target.checked)}
              type="checkbox"
            />
            <span className="pc-checkbox-box" aria-hidden />
            <span className="pc-checkbox-label">invalid</span>
          </label>
        </div>
        <div className="grid min-h-56 place-items-center rounded-[var(--pc-radius-xl)] bg-[var(--pc-surface-soft)] p-6">
          <div className="w-full max-w-md">
            <InputComponent
              error="Use a valid email address."
              hint="This field accepts native input props."
              icon={<Search />}
              inputSize={size}
              invalid={invalid}
              label="Search"
              onChange={(event) => setValue(event.target.value)}
              placeholder="Search components..."
              tone={tone}
              value={value}
            />
          </div>
        </div>
      </div>
    </FeatureStickerCard>
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
            <input
              className="pc-doc-input"
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

function getInputComponent(componentName: string) {
  switch (componentName) {
    case 'StickerFieldInput':
      return StickerFieldInput
    case 'BubbleFieldInput':
      return BubbleFieldInput
    case 'SketchFieldInput':
      return SketchFieldInput
    default:
      return null
  }
}

function getUsageSnippet(componentName: string) {
  if (componentName.endsWith('Button')) {
    return `import { ${componentName} } from '@/components/playful'\n\nexport function Example() {\n  return (\n    <div className="flex flex-wrap gap-3">\n      <${componentName}>Default</${componentName}>\n      <${componentName} tone="success">Success</${componentName}>\n      <${componentName} tone="error">Delete</${componentName}>\n      <${componentName} loading>Saving</${componentName}>\n    </div>\n  )\n}`
  }

  if (componentName.endsWith('Input')) {
    return `import { ${componentName} } from '@/components/playful'\n\nfunction SearchIcon() {\n  return <span aria-hidden>Search</span>\n}\n\nexport function Example() {\n  return (\n    <${componentName}\n      icon={<SearchIcon />}\n      label="Search"\n      placeholder="Search components..."\n      hint="Icons are ReactNode slots, so any icon library works."\n    />\n  )\n}`
  }

  return `import { ${componentName} } from '@/components/playful'\n\nexport function Example() {\n  return <${componentName} />\n}`
}
