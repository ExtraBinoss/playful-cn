import { Sparkles } from 'lucide-react'
import {
  BubbleGumButton,
  CandyFieldInput,
  FeatureStickerBadge,
  FeatureStickerCard,
  MintToggleSwitch,
  NeonGradientButton,
  PopToast,
  PopoverTipTooltip,
  QuietGhostButton,
  SketchOutlineButton,
  SoftCandyButton,
  StarCheckCheckbox,
  StickerPopButton,
  StickerTabs,
  SwatchPartyColorPicker,
} from '../playful'

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
        <FeatureStickerCard className="max-w-sm">
          <FeatureStickerBadge>Preview</FeatureStickerBadge>
          <h3 className="pc-display mt-4 mb-2 text-3xl">Sticker surface</h3>
          <p className="m-0 text-[var(--pc-ink-soft)]">
            A framed card for component demos and feature callouts.
          </p>
        </FeatureStickerCard>
      )
    case 'CandyFieldInput':
      return <CandyFieldInput placeholder="Search components..." />
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
