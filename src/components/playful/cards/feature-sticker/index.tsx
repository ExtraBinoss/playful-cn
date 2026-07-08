import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../../../lib/styling/cn'

export type FeatureStickerCardProps = Omit<
  HTMLMotionProps<'div'>,
  'children' | 'ref'
> & {
  children?: ReactNode
}

export function FeatureStickerCard({
  className,
  children,
  ...props
}: FeatureStickerCardProps) {
  return (
    <m.div
      className={cn('pc-card pc-card-feature-sticker', className)}
      whileHover={{ y: -4, rotate: -0.4 }}
      whileTap={{ y: 1, scale: 0.99 }}
      {...props}
    >
      {children}
    </m.div>
  )
}
