import type { HTMLMotionProps } from 'motion/react'
import type { PlayfulButtonMotion } from './button.types'

type ButtonMotionConfig = Pick<
  HTMLMotionProps<'button'>,
  'whileHover' | 'whileTap'
>

export const buttonMotionPresets = {
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
} satisfies Record<PlayfulButtonMotion, ButtonMotionConfig>
