import { Search, Sparkles } from 'lucide-react'
import { SideScroll } from '../SideScroll'
import {
  BubbleFieldInput,
  BubbleInputGroup,
  BubbleInputOTP,
  BubbleTextarea,
  BubbleGumButton,
  BubbleCheckbox,
  BubbleRadioGroup,
  BubbleSwitch,
  CandyFieldInput,
  FeatureStickerBadge,
  FeatureStickerCard,
  PlayfulField,
  PlayfulLabel,
  MintToggleSwitch,
  PopToast,
  PopoverTipTooltip,
  QuietGhostButton,
  SketchOutlineButton,
  SketchFieldInput,
  SketchInputGroup,
  SketchInputOTP,
  SketchTextarea,
  SketchCheckbox,
  SketchRadioGroup,
  SketchSwitch,
  SoftCandyButton,
  StickerFieldInput,
  StickerInputGroup,
  StickerInputOTP,
  StickerTextarea,
  StickerCheckbox,
  StickerRadioGroup,
  StickerSwitch,
  StarCheckCheckbox,
  StickerPopButton,
  StickerTabs,
  SwatchPartyColorPicker,
  StickerCard, BubbleCard, SketchCard, StickerBadge, BubbleBadge, SketchBadge,
  StickerAlert, BubbleAlert, SketchAlert, StickerEmpty, BubbleEmpty, SketchEmpty,
  StickerSkeleton, BubbleSkeleton, SketchSkeleton, StickerSpinner, BubbleSpinner, SketchSpinner,
  StickerProgress, BubbleProgress, SketchProgress,
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
    case 'StickerCard': return <StickerCard className="max-w-sm" interactive><strong>Sticker card</strong><p>Chunky surface, ready to compose.</p></StickerCard>
    case 'BubbleCard': return <BubbleCard className="max-w-sm" interactive><strong>Bubble card</strong><p>Soft, glossy and responsive.</p></BubbleCard>
    case 'SketchCard': return <SketchCard className="max-w-sm" interactive><strong>Sketch card</strong><p>Hand-drawn framed surface.</p></SketchCard>
    case 'StickerBadge': return <StickerBadge>New</StickerBadge>
    case 'BubbleBadge': return <BubbleBadge>Online</BubbleBadge>
    case 'SketchBadge': return <SketchBadge>Draft</SketchBadge>
    case 'StickerAlert': return <StickerAlert title="Heads up">A playful alert with context.</StickerAlert>
    case 'BubbleAlert': return <BubbleAlert title="All good">Everything is up to date.</BubbleAlert>
    case 'SketchAlert': return <SketchAlert title="Note">Review this detail before continuing.</SketchAlert>
    case 'StickerEmpty': return <StickerEmpty title="No projects yet" description="Create one to get started." />
    case 'BubbleEmpty': return <BubbleEmpty title="No results" description="Try another search." />
    case 'SketchEmpty': return <SketchEmpty title="Nothing here" description="This space is ready for your content." />
    case 'StickerSkeleton': return <StickerSkeleton lines={3} />
    case 'BubbleSkeleton': return <BubbleSkeleton lines={3} />
    case 'SketchSkeleton': return <SketchSkeleton lines={3} />
    case 'StickerSpinner': return <StickerSpinner label="Loading sticker" />
    case 'BubbleSpinner': return <BubbleSpinner label="Loading bubble" />
    case 'SketchSpinner': return <SketchSpinner label="Loading sketch" />
    case 'StickerProgress': return <StickerProgress value={68} label="Uploading" showValue />
    case 'BubbleProgress': return <BubbleProgress value={42} label="Syncing" showValue />
    case 'SketchProgress': return <SketchProgress value={84} label="Finishing" showValue />
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
    case 'PlayfulLabel':
      return <PlayfulLabel required>Email address</PlayfulLabel>
    case 'PlayfulField':
      return <PlayfulField label="Username" description="Pick a public name."><StickerFieldInput placeholder="playful-dev" /></PlayfulField>
    case 'StickerTextarea':
      return <StickerTextarea label="Message" maxLength={120} defaultValue="A little note" />
    case 'BubbleTextarea':
      return <BubbleTextarea label="Message" maxLength={120} placeholder="Write something..." />
    case 'SketchTextarea':
      return <SketchTextarea label="Message" maxLength={120} placeholder="Write something..." />
    case 'StickerInputGroup':
      return <StickerInputGroup start="https://" end=".com"><StickerFieldInput placeholder="playful" /></StickerInputGroup>
    case 'BubbleInputGroup':
      return <BubbleInputGroup start="€"><BubbleFieldInput placeholder="0.00" /></BubbleInputGroup>
    case 'SketchInputGroup':
      return <SketchInputGroup end="kg"><SketchFieldInput placeholder="Weight" /></SketchInputGroup>
    case 'StickerInputOTP':
      return <StickerInputOTP defaultValue="248" length={6} separator={<span>·</span>} />
    case 'BubbleInputOTP':
      return <BubbleInputOTP defaultValue="248" length={6} separator={<span>·</span>} />
    case 'SketchInputOTP':
      return <SketchInputOTP defaultValue="248" length={6} separator={<span>·</span>} />
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
