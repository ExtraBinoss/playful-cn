import { ButtonBase } from '../button-base'
import type { PlayfulButtonBaseProps } from '../button.types'

export function StickerPopButton(props: PlayfulButtonBaseProps) {
  return (
    <ButtonBase
      variationClassName="pc-button-sticker pc-button-sticker-pop"
      {...props}
    />
  )
}
