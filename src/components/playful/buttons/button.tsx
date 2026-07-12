import * as m from 'motion/react-m'
import { getButtonClassName } from './button.styles'
import type { PlayfulButtonProps } from './button.types'

const motionPresets = {
  none: {},
  pop: {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { y: 1, scale: 0.97 },
  },
  squish: {
    whileHover: { scaleX: 1.04, scaleY: 0.96 },
    whileTap: { scaleX: 0.96, scaleY: 1.04 },
  },
  wiggle: {
    whileHover: { rotate: [-1, 1, -1, 0] },
    whileTap: { scale: 0.96 },
  },
}

export function PlayfulButton({
  variant = 'sticker',
  tone = 'pink',
  size = 'md',
  motionPreset = 'pop',
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: PlayfulButtonProps) {
  return (
    <m.button
      className={getButtonClassName({ variant, tone, size, className })}
      disabled={disabled || loading}
      {...motionPresets[motionPreset]}
      {...props}
    >
      {loading ? <span className="pc-button-loader" aria-hidden /> : leftIcon}
      <span>{children}</span>
      {rightIcon}
    </m.button>
  )
}
