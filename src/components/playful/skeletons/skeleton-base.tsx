import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import { cn } from '../../../lib/styling/cn'
export type PlayfulSkeletonProps = Omit<HTMLMotionProps<'div'>, 'ref'> & { lines?: number }
export function SkeletonBase({ variation, lines = 1, className, ...props }: PlayfulSkeletonProps & { variation: 'sticker' | 'bubble' | 'sketch' }) { return <m.div className={cn('pc-skeleton', `pc-skeleton-${variation}`, className)} aria-hidden="true" {...props}>{Array.from({ length: lines }, (_, index) => <span key={index} style={{ width: index === lines - 1 && lines > 1 ? '72%' : undefined }} />)}</m.div> }
