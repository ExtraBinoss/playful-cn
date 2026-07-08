import { InputBase } from '../input-base'
import type { PlayfulInputBaseProps } from '../input.types'

export function StickerFieldInput(props: PlayfulInputBaseProps) {
  return (
    <InputBase
      motionPreset="lift"
      variationClassName="pc-input-sticker pc-input-candy-field"
      {...props}
    />
  )
}

