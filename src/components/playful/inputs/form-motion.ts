import type { HTMLMotionProps } from 'motion/react'

export type FormMotionVariant = 'sticker' | 'bubble' | 'sketch'
export const formMotionPresets: Record<FormMotionVariant, Pick<HTMLMotionProps<'div'>, 'whileHover' | 'whileTap'>> = {
  sticker: { whileHover: { y: -2, scale: 1.01 }, whileTap: { y: 1, scale: 0.98 } },
  bubble: { whileHover: { scaleX: 1.02, scaleY: 0.98 }, whileTap: { scaleX: 0.97, scaleY: 1.03 } },
  sketch: { whileHover: { y: -1, rotate: -0.5 }, whileTap: { y: 1, rotate: 0.5, scale: 0.98 } },
}
