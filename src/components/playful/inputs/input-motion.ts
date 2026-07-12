import type { HTMLMotionProps } from 'motion/react'
import type { PlayfulInputMotion } from './input.types'

type InputMotionConfig = Pick<
  HTMLMotionProps<'input'>,
  'whileFocus' | 'whileHover'
>

export const inputMotionPresets = {
  none: {},
  lift: {
    whileHover: { y: -1 },
    whileFocus: { y: -2, scale: 1.01 },
  },
  squish: {
    whileHover: { scaleX: 1.01, scaleY: 0.99 },
    whileFocus: { scaleX: 1.015, scaleY: 0.985 },
  },
} satisfies Record<PlayfulInputMotion, InputMotionConfig>
