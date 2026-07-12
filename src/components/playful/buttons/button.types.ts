import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

export type PlayfulButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type PlayfulButtonMotion = 'none' | 'pop' | 'squish' | 'wiggle'
export type PlayfulButtonBaseTone =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'neutral'

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

export type PlayfulButtonBaseProps = Omit<
  HTMLMotionProps<'button'>,
  'children' | 'ref'
> & {
  size?: PlayfulButtonSize
  tone?: PlayfulButtonBaseTone
  motionPreset?: PlayfulButtonMotion
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}

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
