import { ButtonBase } from '../button-base'
import type { PlayfulButtonBaseProps } from '../button.types'

export function QuietGhostButton(props: PlayfulButtonBaseProps) {
  return <ButtonBase variationClassName="pc-button-quiet-ghost" {...props} />
}
