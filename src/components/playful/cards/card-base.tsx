import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'

export type PlayfulCardProps = Omit<HTMLMotionProps<'article'>, 'children' | 'ref'> & { interactive?: boolean; children?: ReactNode }

export function CardBase({ variation, interactive = false, className, children, ...props }: PlayfulCardProps & { variation: 'sticker' | 'bubble' | 'sketch' }) {
  return <m.article className={cn('pc-card pc-card-collection', `pc-card-${variation}`, interactive && 'pc-card-interactive', className)} whileHover={interactive ? { y: -4, rotate: variation === 'sketch' ? -0.4 : 0 } : undefined} whileTap={interactive ? { y: 1, scale: 0.99 } : undefined} {...props}>{children}</m.article>
}
