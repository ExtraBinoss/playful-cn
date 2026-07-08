import { InputBase } from '../input-base'
import type { PlayfulInputBaseProps } from '../input.types'

export function GlowFieldInput(props: PlayfulInputBaseProps) {
  return (
    <InputBase
      motionPreset="glow"
      variationClassName="pc-input-glow-field"
      {...props}
    />
  )
}
