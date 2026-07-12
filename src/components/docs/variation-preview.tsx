import { Search, Sparkles } from 'lucide-react'
import { SideScroll } from '../SideScroll'
import {
  BubbleFieldInput,
  BubbleGumButton,
  BubbleCheckbox,
  BubbleRadioGroup,
  BubbleSwitch,
  CandyFieldInput,
  FeatureStickerBadge,
  FeatureStickerCard,
  MintToggleSwitch,
  PopToast,
  PopoverTipTooltip,
  QuietGhostButton,
  SketchOutlineButton,
  SketchFieldInput,
  SketchCheckbox,
  SketchRadioGroup,
  SketchSwitch,
  SoftCandyButton,
  StickerFieldInput,
  StickerCheckbox,
  StickerRadioGroup,
  StickerSwitch,
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
      return (
        <StickerPopButton leftIcon={<Sparkles size={18} />}>
          Launch it
        </StickerPopButton>
      )
    case 'BubbleGumButton':
      return <BubbleGumButton>Bubble action</BubbleGumButton>
    case 'SoftCandyButton':
      return <SoftCandyButton>Save draft</SoftCandyButton>
    case 'SketchOutlineButton':
      return <SketchOutlineButton>Open docs</SketchOutlineButton>
    case 'QuietGhostButton':
      return <QuietGhostButton>Cancel</QuietGhostButton>
    case 'PopoverTipTooltip':
      return (
        <PopoverTipTooltip content="Tooltip content can explain props or tokens.">
          <button type="button" className="pc-doc-demo-trigger">
            Hover me
          </button>
        </PopoverTipTooltip>
      )
    case 'FeatureStickerBadge':
      return <FeatureStickerBadge>Beta</FeatureStickerBadge>
    case 'FeatureStickerCard':
      return (
        <FeatureStickerCard className="max-w-sm" interactive>
          <span className="pc-doc-demo-label">Preview</span>
          <h3 className="pc-display mt-4 mb-2 text-3xl">Sticker surface</h3>
          <p className="m-0 text-[var(--pc-ink-soft)]">
            A framed card for component demos and feature callouts.
          </p>
        </FeatureStickerCard>
      )
    case 'StickerFieldInput':
      return (
        <StickerFieldInput
          icon={<Search />}
          placeholder="Search components..."
        />
      )
    case 'CandyFieldInput':
      return <CandyFieldInput icon={<Search />} placeholder="Search components..." />
    case 'BubbleFieldInput':
      return <BubbleFieldInput icon={<Search />} placeholder="Search people..." />
    case 'SketchFieldInput':
      return <SketchFieldInput icon={<Search />} placeholder="Search projects..." />
    case 'MintToggleSwitch':
      return <MintToggleSwitch defaultChecked aria-label="Preview switch" />
    case 'StarCheckCheckbox':
      return <StarCheckCheckbox defaultChecked label="Playful and native" />
    case 'StickerCheckbox':
      return <StickerCheckbox defaultChecked label="Sticker choice" icon={<span>✦</span>} />
    case 'BubbleCheckbox':
      return <BubbleCheckbox defaultChecked label="Bubble choice" />
    case 'SketchCheckbox':
      return <SketchCheckbox defaultChecked label="Sketch choice" />
    case 'StickerSwitch':
      return <StickerSwitch defaultChecked aria-label="Sticker switch" />
    case 'BubbleSwitch':
      return <BubbleSwitch defaultChecked aria-label="Bubble switch" />
    case 'SketchSwitch':
      return <SketchSwitch defaultChecked aria-label="Sketch switch" />
    case 'StickerRadioGroup':
      return <StickerRadioGroup defaultValue="sticker" options={radioOptions} />
    case 'BubbleRadioGroup':
      return <BubbleRadioGroup defaultValue="bubble" options={radioOptions} />
    case 'SketchRadioGroup':
      return <SketchRadioGroup defaultValue="sketch" options={radioOptions} />
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
      return (
        <PopToast title="Saved" description="The component is ready to reuse." />
      )
    default:
      return null
  }
}

const radioOptions = [
  { value: 'sticker', label: 'Playful', description: 'A colorful choice' },
  { value: 'bubble', label: 'Focused', description: 'A calm choice' },
]

export function CorePairPreview({ componentName }: { componentName: string }) {
  const pair = getCorePair(componentName)

  if (!pair) {
    return <VariationPreview componentName={componentName} />
  }

  const ButtonComponent = pair.button
  const InputComponent = pair.input

  return (
    <div className="grid w-full max-w-md gap-3">
      <ButtonComponent size="sm" icon={<Sparkles size={16} />}>
        {pair.label}
      </ButtonComponent>
      <InputComponent
        inputSize="sm"
        icon={<Search />}
        placeholder={pair.placeholder}
      />
    </div>
  )
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
    <SideScroll viewportClassName="pc-button-state-scroll">
      {buttonExamples.map((example) => (
        <ButtonComponent key={example.label} size="sm" {...example.props}>
          {example.label}
        </ButtonComponent>
      ))}
    </SideScroll>
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
    case 'CandyFieldInput':
      return CandyFieldInput
    case 'BubbleFieldInput':
      return BubbleFieldInput
    case 'SketchFieldInput':
      return SketchFieldInput
    default:
      return null
  }
}

function getCorePair(componentName: string) {
  switch (componentName) {
    case 'StickerPopButton':
    case 'StickerFieldInput':
    case 'CandyFieldInput':
      return {
        button: StickerPopButton,
        input: StickerFieldInput,
        label: 'Sticker action',
        placeholder: 'Sticker field',
      }
    case 'BubbleGumButton':
    case 'BubbleFieldInput':
      return {
        button: BubbleGumButton,
        input: BubbleFieldInput,
        label: 'Bubble action',
        placeholder: 'Bubble field',
      }
    case 'SketchOutlineButton':
    case 'SketchFieldInput':
      return {
        button: SketchOutlineButton,
        input: SketchFieldInput,
        label: 'Sketch action',
        placeholder: 'Sketch field',
      }
    default:
      return null
  }
}
