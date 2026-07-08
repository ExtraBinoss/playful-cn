import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

export type PlayfulButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type PlayfulButtonMotion = 'none' | 'pop' | 'squish' | 'wiggle'

export type PlayfulButtonBaseProps = Omit<
  HTMLMotionProps<'button'>,
  'children' | 'ref'
> & {
  size?: PlayfulButtonSize
  motionPreset?: PlayfulButtonMotion
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}
