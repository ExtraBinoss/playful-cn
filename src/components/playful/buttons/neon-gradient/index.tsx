import { ButtonBase } from '../button-base'
import type { PlayfulButtonBaseProps } from '../button.types'

export function NeonGradientButton(props: PlayfulButtonBaseProps) {
  return (
    <ButtonBase
      variationClassName="pc-button-glow pc-button-neon-gradient"
      {...props}
    />
  )
}

export const GlowButton = NeonGradientButton
