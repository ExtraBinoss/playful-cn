import { ButtonBase } from '../button-base'
import type { PlayfulButtonBaseProps } from '../button.types'

export function BubbleGumButton(props: PlayfulButtonBaseProps) {
  return (
    <ButtonBase
      motionPreset="squish"
      variationClassName="pc-button-bubble pc-button-bubble-gum"
      {...props}
    />
  )
}
