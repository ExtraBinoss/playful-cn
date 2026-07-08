import { Search, Sparkles } from 'lucide-react'
import {
  BubbleFieldInput,
  BubbleGumButton,
  CandyFieldInput,
  FeatureStickerBadge,
  FeatureStickerCard,
  GlowFieldInput,
  MintToggleSwitch,
  NeonGradientButton,
  PopToast,
  PopoverTipTooltip,
  QuietGhostButton,
  SketchOutlineButton,
  SketchFieldInput,
  SoftCandyButton,
  StarCheckCheckbox,
  StickerPopButton,
  StickerTabs,
  SwatchPartyColorPicker,
} from '../playful'

const buttonExamples = [
  { label: 'Default', props: {} },
  { label: 'Success', props: { tone: 'success' as const } },
  { label: 'Error', props: { tone: 'error' as const } },
  { label: 'Loading', props: { loading: true } },
]

export function VariationPreview({ componentName }: { componentName: string }) {
  switch (componentName) {
    case 'StickerPopButton':
      return <StickerPopButton leftIcon={<Sparkles size={18} />}>Launch it</StickerPopButton>
    case 'BubbleGumButton':
      return <BubbleGumButton>Bubble action</BubbleGumButton>
    case 'NeonGradientButton':
      return <NeonGradientButton size="lg">Upgrade now</NeonGradientButton>
    case 'SoftCandyButton':
      return <SoftCandyButton>Save draft</SoftCandyButton>
    case 'SketchOutlineButton':
      return <SketchOutlineButton>Open docs</SketchOutlineButton>
    case 'QuietGhostButton':
      return <QuietGhostButton>Cancel</QuietGhostButton>
    case 'PopoverTipTooltip':
      return (
        <PopoverTipTooltip content="Tooltip content can explain props or tokens.">
          <StickerPopButton size="sm">Hover me</StickerPopButton>
        </PopoverTipTooltip>
      )
    case 'FeatureStickerBadge':
      return <FeatureStickerBadge>Beta</FeatureStickerBadge>
    case 'FeatureStickerCard':
      return (
        <FeatureStickerCard className="max-w-sm" interactive>
          <FeatureStickerBadge>Preview</FeatureStickerBadge>
          <h3 className="pc-display mt-4 mb-2 text-3xl">Sticker surface</h3>
          <p className="m-0 text-[var(--pc-ink-soft)]">
            A framed card for component demos and feature callouts.
          </p>
        </FeatureStickerCard>
      )
    case 'CandyFieldInput':
      return <CandyFieldInput icon={<Search />} placeholder="Search components..." />
    case 'BubbleFieldInput':
      return <BubbleFieldInput icon={<Search />} placeholder="Search people..." />
    case 'GlowFieldInput':
      return <GlowFieldInput icon={<Search />} placeholder="Search the galaxy..." />
    case 'SketchFieldInput':
      return <SketchFieldInput icon={<Search />} placeholder="Search projects..." />
    case 'MintToggleSwitch':
      return <MintToggleSwitch defaultChecked aria-label="Preview switch" />
    case 'StarCheckCheckbox':
      return <StarCheckCheckbox defaultChecked label="Playful and native" />
    case 'StickerTabs':
      return (
        <StickerTabs
          items={[
            { value: 'preview', label: 'Preview', content: 'Live demo' },
            { value: 'props', label: 'Props', content: 'Typed API' },
          ]}
        />
      )
    case 'SwatchPartyColorPicker':
      return <SwatchPartyColorPicker showHexInput={false} />
    case 'PopToast':
      return <PopToast title="Saved" description="The component is ready to reuse." />
    default:
      return null
  }
}

export function InputStatesPreview({ componentName }: { componentName: string }) {
  const InputComponent = getInputComponent(componentName)

  if (!InputComponent) {
    return null
  }

  return (
    <div className="pc-input-state-grid">
      <InputComponent inputSize="sm" icon={<Search />} placeholder="Default" />
      <InputComponent
        inputSize="sm"
        icon={<Search />}
        tone="success"
        defaultValue="Accepted"
      />
      <InputComponent
        inputSize="sm"
        icon={<Search />}
        invalid
        defaultValue="Invalid"
      />
      <InputComponent
        inputSize="sm"
        icon={<Search />}
        tone="warning"
        placeholder="Warning"
      />
    </div>
  )
}

export function ButtonStatesPreview({
  componentName,
}: {
  componentName: string
}) {
  const ButtonComponent = getButtonComponent(componentName)

  if (!ButtonComponent) {
    return null
  }

  return (
    <div className="pc-horizontal-scroll pc-button-state-scroll">
      {buttonExamples.map((example) => (
        <ButtonComponent key={example.label} size="sm" {...example.props}>
          {example.label}
        </ButtonComponent>
      ))}
      <QuietGhostButton size="sm">Ghost</QuietGhostButton>
    </div>
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

function getInputComponent(componentName: string) {
  switch (componentName) {
    case 'CandyFieldInput':
      return CandyFieldInput
    case 'BubbleFieldInput':
      return BubbleFieldInput
    case 'GlowFieldInput':
      return GlowFieldInput
    case 'SketchFieldInput':
      return SketchFieldInput
    default:
      return null
  }
}
