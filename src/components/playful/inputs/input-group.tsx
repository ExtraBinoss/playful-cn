import * as m from 'motion/react-m'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'
import { formMotionPresets } from './form-motion'

export type PlayfulInputGroupProps = HTMLAttributes<HTMLDivElement> & {
  start?: ReactNode
  end?: ReactNode
  label?: ReactNode
  hint?: ReactNode
  invalid?: boolean
}

export function InputGroupBase({ variant, start, end, label, hint, invalid = false, className, children, ...props }: PlayfulInputGroupProps & { variant: 'sticker' | 'bubble' | 'sketch' }) {
  return <div className={cn('pc-input-group-field', className)}><m.div className={cn('pc-input-group', `pc-input-group-${variant}`, invalid && 'is-invalid')} data-invalid={invalid || undefined} {...formMotionPresets[variant]} transition={{ type: 'spring', stiffness: 460, damping: 28 }} {...props}>{start ? <span className="pc-input-group-addon pc-input-group-start">{start}</span> : null}<span className="pc-input-group-control">{children}</span>{end ? <span className="pc-input-group-addon pc-input-group-end">{end}</span> : null}</m.div>{label ? <span className="pc-input-label">{label}</span> : null}{hint ? <span className="pc-input-message" data-tone={invalid ? 'error' : 'default'}>{hint}</span> : null}</div>
}
