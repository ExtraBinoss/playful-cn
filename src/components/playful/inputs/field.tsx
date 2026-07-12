import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulLabel } from './label'

export type PlayfulFieldProps = {
  label?: ReactNode
  description?: ReactNode
  error?: ReactNode
  required?: boolean
  optional?: ReactNode
  invalid?: boolean
  controlId?: string
  children: ReactNode
  className?: string
}

export function PlayfulField({ label, description, error, required, optional, invalid = false, controlId, children, className }: PlayfulFieldProps) {
  return <div className={cn('pc-field', invalid && 'is-invalid', className)}>{label ? <PlayfulLabel htmlFor={controlId} required={required} optional={optional}>{label}</PlayfulLabel> : null}{children}{error || description ? <p className="pc-field-message" data-tone={invalid ? 'error' : 'default'}>{invalid ? error : description}</p> : null}</div>
}
