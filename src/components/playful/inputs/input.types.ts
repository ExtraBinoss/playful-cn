import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

export type PlayfulInputSize = 'sm' | 'md' | 'lg' | 'xl'
export type PlayfulInputTone =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'neutral'
export type PlayfulInputMotion = 'none' | 'lift' | 'squish' | 'glow'

export type PlayfulInputBaseProps = Omit<
  HTMLMotionProps<'input'>,
  'children' | 'ref' | 'size'
> & {
  inputSize?: PlayfulInputSize
  tone?: PlayfulInputTone
  motionPreset?: PlayfulInputMotion
  invalid?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
}
