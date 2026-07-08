import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { playfulMotionPresets, type PlayfulMotionPreset } from '../../../lib/animation/variants'
import { cn } from '../../../lib/styling/cn'

export type PlayfulCardProps = Omit<HTMLMotionProps<'div'>, 'ref' | 'children'> & {
  variant?: 'plain' | 'sticker' | 'glass' | 'gradient' | 'dashed'
  interactive?: boolean
  motionPreset?: Extract<PlayfulMotionPreset, 'none' | 'pop' | 'float'>
  children?: ReactNode
}

export function PlayfulCard({
  variant = 'plain',
  interactive = false,
  motionPreset = interactive ? 'float' : 'none',
  className,
  children,
  ...props
}: PlayfulCardProps) {
  return (
    <m.div
      className={cn(
        'pc-card',
        `pc-card-${variant}`,
        interactive && 'pc-card-interactive',
        className,
      )}
      {...playfulMotionPresets[motionPreset]}
      {...props}
    >
      {children}
    </m.div>
  )
}
