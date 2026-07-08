import { Sparkles } from 'lucide-react'
import { PlayfulButton } from './button'

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PlayfulButton leftIcon={<Sparkles size={18} />}>Sticker</PlayfulButton>
      <PlayfulButton variant="bubble" tone="blue">
        Bubble
      </PlayfulButton>
      <PlayfulButton variant="gradient" tone="purple" size="lg">
        Gradient
      </PlayfulButton>
      <PlayfulButton variant="soft" tone="mint" motionPreset="squish">
        Squish
      </PlayfulButton>
    </div>
  )
}
