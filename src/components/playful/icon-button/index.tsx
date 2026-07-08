import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { playfulMotionPresets, type PlayfulMotionPreset } from '../../../lib/animation/variants'
import { cn } from '../../../lib/styling/cn'
import type { PlayfulButtonTone } from '../button'

export type PlayfulIconButtonProps = Omit<
  HTMLMotionProps<'button'>,
  'ref' | 'children'
> & {
  variant?: 'round' | 'square' | 'sticker' | 'ghost' | 'soft'
  tone?: PlayfulButtonTone
  size?: 'sm' | 'md' | 'lg'
  label: string
  motionPreset?: PlayfulMotionPreset
  children?: ReactNode
}

const sizes = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-13 w-13',
}

export function PlayfulIconButton({
  variant = 'sticker',
  tone = 'pink',
  size = 'md',
  label,
  motionPreset = 'pop',
  className,
  children,
  ...props
}: PlayfulIconButtonProps) {
  return (
    <m.button
      aria-label={label}
      className={cn(
        'pc-icon-button pc-button grid place-items-center border-2 border-zinc-900 font-bold outline-none disabled:pointer-events-none disabled:opacity-50',
        sizes[size],
        `pc-tone-${tone}`,
        `pc-icon-button-${variant}`,
        className,
      )}
      {...playfulMotionPresets[motionPreset]}
      {...props}
    >
      {children}
    </m.button>
  )
}
