import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulCheckIcon } from '../icons'
export type PlayfulBadgeProps = Omit<HTMLMotionProps<'span'>, 'children' | 'ref'> & { children?: ReactNode; icon?: ReactNode }
export function BadgeBase({ variation, icon = <PlayfulCheckIcon />, className, children, ...props }: PlayfulBadgeProps & { variation: 'sticker' | 'bubble' | 'sketch' }) { return <m.span className={cn('pc-badge pc-badge-collection', `pc-badge-${variation}`, className)} whileHover={{ y: -2, rotate: variation === 'sketch' ? -1 : 0 }} {...props}>{icon ? <span className="pc-badge-icon" aria-hidden>{icon}</span> : null}{children}</m.span> }
