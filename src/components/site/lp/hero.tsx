import { ArrowRight, Sparkles } from 'lucide-react'
import {
  BubbleGumButton,
  CandyFieldInput,
  FeatureStickerBadge,
  FeatureStickerCard,
  MintToggleSwitch,
  NeonGradientButton,
  PopToast,
  StickerPopButton,
  SwatchPartyColorPicker,
} from '../../playful'

export function Hero() {
  return (
    <section className="pc-page pc-hero">
      <div>
        <p className="pc-kicker">React library V1</p>
        <h1 className="pc-display pc-hero-title">Playful Components</h1>
        <p className="pc-hero-copy">
          A component library for expressive React interfaces: candy colors,
          sticker shadows, bouncy Motion interactions, and accessible APIs that
          stay production-ready.
        </p>
        <div className="pc-hero-actions">
          <StickerPopButton rightIcon={<ArrowRight size={18} />}>
            Browse components
          </StickerPopButton>
          <NeonGradientButton>
            View tokens
          </NeonGradientButton>
        </div>
      </div>

      <div className="pc-showcase" aria-label="Playful component preview">
        <FeatureStickerCard>
          <div className="mb-4 flex items-center justify-between gap-3">
            <FeatureStickerBadge>
              New
            </FeatureStickerBadge>
            <MintToggleSwitch defaultChecked aria-label="Preview switch" />
          </div>
          <h2 className="pc-display m-0 text-4xl">Squishy but serious.</h2>
          <p className="text-[var(--pc-ink-soft)]">
            Components ship with className escape hatches, CSS variables and
            reduced-motion support.
          </p>
          <CandyFieldInput placeholder="Search buttons, cards, tabs..." />
        </FeatureStickerCard>

        <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
          <SwatchPartyColorPicker showHexInput={false} size="sm" />
          <PopToast
            title="Motion ready"
            description="LazyMotion is wired from the root."
          />
        </div>

        <div className="pc-row">
          <BubbleGumButton
            leftIcon={<Sparkles size={18} />}
          >
            Bubble CTA
          </BubbleGumButton>
          <NeonGradientButton>
            Gradient
          </NeonGradientButton>
        </div>
      </div>
    </section>
  )
}
