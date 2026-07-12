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
  void interactive
  return (
    <m.div
      className={cn('pc-card pc-card-feature-sticker', className)}
      {...props}
    >
      {children}
    </m.div>
  )
}
