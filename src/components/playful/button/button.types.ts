import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

export type PlayfulButtonVariant =
  | 'solid'
  | 'sticker'
  | 'bubble'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'gradient'

export type PlayfulButtonTone =
  | 'pink'
  | 'purple'
  | 'blue'
  | 'mint'
  | 'yellow'
  | 'orange'
  | 'neutral'

export type PlayfulButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type PlayfulButtonMotion = 'none' | 'pop' | 'squish' | 'wiggle'

export type PlayfulButtonProps = Omit<
  HTMLMotionProps<'button'>,
  'ref' | 'children'
> & {
  variant?: PlayfulButtonVariant
  tone?: PlayfulButtonTone
  size?: PlayfulButtonSize
  motionPreset?: PlayfulButtonMotion
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}
