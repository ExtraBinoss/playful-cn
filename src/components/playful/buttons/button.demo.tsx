import { PlayfulButton } from './button'

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PlayfulButton leftIcon={<SparkleIcon />}>Sticker</PlayfulButton>
      <PlayfulButton variant="bubble" tone="blue">Bubble</PlayfulButton>
      <PlayfulButton variant="gradient" tone="purple" size="lg">Gradient</PlayfulButton>
      <PlayfulButton variant="soft" tone="mint" motionPreset="squish">Squish</PlayfulButton>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M9 1.5 10.7 6.3 15.5 8 10.7 9.7 9 14.5 7.3 9.7 2.5 8 7.3 6.3 9 1.5Z" />
      <path d="M14 12.5v3M12.5 14h3" />
    </svg>
  )
}
