import {
  CandyFieldInput,
  FeatureStickerBadge,
  FeatureStickerCard,
  PopoverTipTooltip,
  SoftCandyButton,
  StarCheckCheckbox,
  StickerPopButton,
  StickerTabs,
  SwatchPartyColorPicker,
} from '../../playful'

export function ComponentWall() {
  return (
    <section className="pc-page pc-section">
      <div className="mb-6">
        <p className="pc-kicker">First primitives</p>
        <h2 className="pc-display m-0 text-4xl sm:text-5xl">
          The V1 surface area
        </h2>
      </div>
      <div className="pc-grid">
        <FeatureStickerCard>
          <FeatureStickerBadge>Buttons</FeatureStickerBadge>
          <div className="mt-4 pc-row">
            <StickerPopButton size="sm">Small</StickerPopButton>
            <SoftCandyButton>
              Soft
            </SoftCandyButton>
          </div>
        </FeatureStickerCard>
        <FeatureStickerCard>
          <FeatureStickerBadge>Forms</FeatureStickerBadge>
          <div className="mt-4 grid gap-3">
            <CandyFieldInput placeholder="Candy input" />
            <StarCheckCheckbox defaultChecked label="Accessible by default" />
          </div>
        </FeatureStickerCard>
        <FeatureStickerCard>
          <FeatureStickerBadge>Color</FeatureStickerBadge>
          <div className="mt-4">
            <SwatchPartyColorPicker showPreview={false} showHexInput={false} />
          </div>
        </FeatureStickerCard>
        <FeatureStickerCard>
          <FeatureStickerBadge>Docs</FeatureStickerBadge>
          <div className="mt-4">
            <StickerTabs
              items={[
                { value: 'preview', label: 'Preview', content: 'Live examples' },
                { value: 'props', label: 'Props', content: 'Typed APIs' },
              ]}
            />
          </div>
          <p className="mt-4 text-sm font-bold text-[var(--pc-ink-soft)]">
            <PopoverTipTooltip content="Generated docs are scaffolded for V1.">
              <button className="underline decoration-2 underline-offset-4" type="button">
                Hover docs hint
              </button>
            </PopoverTipTooltip>
          </p>
        </FeatureStickerCard>
      </div>
    </section>
  )
}
