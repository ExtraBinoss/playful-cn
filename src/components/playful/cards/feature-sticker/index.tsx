import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../../../lib/styling/cn'

export type FeatureStickerCardProps = Omit<
  HTMLMotionProps<'div'>,
  'children' | 'ref'
> & {
  interactive?: boolean
  children?: ReactNode
}

export function FeatureStickerCard({
  interactive = false,
  className,
  children,
  ...props
}: FeatureStickerCardProps) {
  return (
    <m.div
      className={cn('pc-card pc-card-feature-sticker', className)}
      whileHover={interactive ? { y: -2, rotate: -0.2 } : undefined}
      {...props}
    >
      {children}
    </m.div>
  )
}
