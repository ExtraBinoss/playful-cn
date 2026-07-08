import {
  PlayfulBadge,
  PlayfulButton,
  PlayfulCard,
  PlayfulCheckbox,
  PlayfulColorPicker,
  PlayfulInput,
  PlayfulTabs,
  PlayfulTooltip,
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
        <PlayfulCard variant="sticker" interactive>
          <PlayfulBadge tone="pink">Buttons</PlayfulBadge>
          <div className="mt-4 pc-row">
            <PlayfulButton size="sm">Small</PlayfulButton>
            <PlayfulButton variant="soft" tone="mint">
              Soft
            </PlayfulButton>
          </div>
        </PlayfulCard>
        <PlayfulCard variant="gradient" interactive>
          <PlayfulBadge tone="blue">Forms</PlayfulBadge>
          <div className="mt-4 grid gap-3">
            <PlayfulInput placeholder="Candy input" />
            <PlayfulCheckbox defaultChecked label="Accessible by default" />
          </div>
        </PlayfulCard>
        <PlayfulCard variant="sticker" interactive>
          <PlayfulBadge tone="yellow">Color</PlayfulBadge>
          <div className="mt-4">
            <PlayfulColorPicker showPreview={false} showHexInput={false} />
          </div>
        </PlayfulCard>
        <PlayfulCard variant="glass" interactive>
          <PlayfulBadge tone="purple">Docs</PlayfulBadge>
          <div className="mt-4">
            <PlayfulTabs
              items={[
                { value: 'preview', label: 'Preview', content: 'Live examples' },
                { value: 'props', label: 'Props', content: 'Typed APIs' },
              ]}
            />
          </div>
          <p className="mt-4 text-sm font-bold text-[var(--pc-ink-soft)]">
            <PlayfulTooltip content="Generated docs are scaffolded for V1.">
              <button className="underline decoration-2 underline-offset-4" type="button">
                Hover docs hint
              </button>
            </PlayfulTooltip>
          </p>
        </PlayfulCard>
      </div>
    </section>
  )
}
