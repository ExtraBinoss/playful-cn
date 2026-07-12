import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulInfoIcon } from '../icons'
export type PlayfulAlertProps = Omit<HTMLMotionProps<'div'>, 'children' | 'ref'> & { title?: ReactNode; icon?: ReactNode; children?: ReactNode; dismissible?: boolean; onDismiss?: () => void }
export function AlertBase({ variation, title, icon = <PlayfulInfoIcon />, dismissible, onDismiss, className, children, ...props }: PlayfulAlertProps & { variation: 'sticker' | 'bubble' | 'sketch' }) { return <m.div role="alert" className={cn('pc-alert', `pc-alert-${variation}`, className)} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} {...props}><span className="pc-alert-icon" aria-hidden>{icon}</span><div className="pc-alert-content">{title ? <strong>{title}</strong> : null}<div>{children}</div></div>{dismissible ? <button className="pc-alert-dismiss" type="button" aria-label="Dismiss alert" onClick={onDismiss}>×</button> : null}</m.div> }
