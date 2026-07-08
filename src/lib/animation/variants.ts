import type { HTMLMotionProps } from 'motion/react'

type MotionPresetConfig = Pick<
  HTMLMotionProps<'div'>,
  'whileHover' | 'whileTap'
>

export const playfulMotionPresets = {
  none: {},
  pop: {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { y: 1, scale: 0.97 },
  },
  squish: {
    whileHover: { scaleX: 1.04, scaleY: 0.96 },
    whileTap: { scaleX: 0.96, scaleY: 1.04 },
  },
  float: {
    whileHover: { y: -4 },
    whileTap: { y: 1, scale: 0.98 },
  },
  wiggle: {
    whileHover: { rotate: [-1, 1, -1, 0] },
    whileTap: { scale: 0.96 },
  },
} satisfies Record<string, MotionPresetConfig>

export type PlayfulMotionPreset = keyof typeof playfulMotionPresets
