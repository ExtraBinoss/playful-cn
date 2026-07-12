import type { LabelHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'

export type PlayfulLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
  optional?: ReactNode
}

export function PlayfulLabel({ required, optional, className, children, ...props }: PlayfulLabelProps) {
  return <label className={cn('pc-form-label', className)} {...props}>{children}{required ? <span className="pc-form-required" aria-hidden>*</span> : null}{optional ? <span className="pc-form-optional">{optional}</span> : null}</label>
}
