import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import { PlayfulLoaderIcon } from '../icons'
import { cn } from '../../../lib/styling/cn'
export type PlayfulSpinnerProps = Omit<HTMLMotionProps<'span'>, 'ref'> & { label?: string; size?: 'sm' | 'md' | 'lg'; icon?: React.ReactNode }
export function SpinnerBase({ variation, label = 'Loading', size = 'md', icon = <PlayfulLoaderIcon />, className, ...props }: PlayfulSpinnerProps & { variation: 'sticker' | 'bubble' | 'sketch' }) { return <m.span className={cn('pc-spinner', `pc-spinner-${variation}`, `pc-spinner-${size}`, className)} role="status" aria-label={label} {...props} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>{icon}</m.span> }
