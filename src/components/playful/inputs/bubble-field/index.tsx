import { InputBase } from '../input-base'
import type { PlayfulInputBaseProps } from '../input.types'

export function BubbleFieldInput(props: PlayfulInputBaseProps) {
  return (
    <InputBase
      motionPreset="squish"
      variationClassName="pc-input-bubble-field"
      {...props}
    />
  )
}
