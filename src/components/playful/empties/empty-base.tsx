import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulSparkIcon } from '../icons'
export type PlayfulEmptyProps = Omit<HTMLMotionProps<'div'>, 'children' | 'ref'> & { title?: ReactNode; description?: ReactNode; icon?: ReactNode; action?: ReactNode; children?: ReactNode }
export function EmptyBase({ variation, title = 'Nothing here yet', description, icon = <PlayfulSparkIcon />, action, className, children, ...props }: PlayfulEmptyProps & { variation: 'sticker' | 'bubble' | 'sketch' }) { return <m.div className={cn('pc-empty', `pc-empty-${variation}`, className)} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} {...props}><span className="pc-empty-icon" aria-hidden>{icon}</span><h3>{title}</h3>{description ? <p>{description}</p> : null}{action ? <div className="pc-empty-action">{action}</div> : null}{children}</m.div> }
