import { InputBase } from '../input-base'
import type { PlayfulInputBaseProps } from '../input.types'

export function SketchFieldInput(props: PlayfulInputBaseProps) {
  return (
    <InputBase
      motionPreset="lift"
      variationClassName="pc-input-sketch pc-input-sketch-field"
      {...props}
    />
  )
}
