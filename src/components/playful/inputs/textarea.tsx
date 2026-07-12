import * as m from 'motion/react-m'
import type { HTMLMotionProps } from 'motion/react'
import * as React from 'react'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulField } from './field'
import { formMotionPresets } from './form-motion'

export type PlayfulTextareaProps = Omit<HTMLMotionProps<'textarea'>, 'size' | 'children'> & {
  variant?: 'sticker' | 'bubble' | 'sketch'
  textareaSize?: 'sm' | 'md' | 'lg'
  tone?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'neutral'
  invalid?: boolean
  loading?: boolean
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  showCount?: boolean
}

export function TextareaBase({ variant, textareaSize = 'md', tone = 'default', invalid = false, loading = false, label, hint, error, showCount = true, id, className, disabled, maxLength, value, defaultValue, onChange, ...props }: PlayfulTextareaProps & { variant: 'sticker' | 'bubble' | 'sketch' }) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(String(defaultValue ?? ''))
  const currentValue = value !== undefined ? String(value) : uncontrolledValue
  const message = invalid ? error : hint
  const messageId = id && message ? `${id}-message` : undefined
  return <PlayfulField label={label} invalid={invalid} description={hint} error={error}><m.textarea id={id} disabled={disabled || loading} aria-busy={loading || undefined} aria-invalid={invalid || undefined} aria-describedby={messageId} data-tone={invalid ? 'error' : tone} className={cn('pc-textarea', `pc-textarea-${variant}`, `pc-textarea-${textareaSize}`, className)} maxLength={maxLength} value={value} defaultValue={defaultValue} onChange={(event) => { setUncontrolledValue(event.currentTarget.value); onChange?.(event) }} {...formMotionPresets[variant]} transition={{ type: 'spring', stiffness: 420, damping: 30 }} {...props} />{showCount && maxLength !== undefined ? <span className="pc-input-counter pc-textarea-counter">{currentValue.length}/{maxLength}</span> : null}</PlayfulField>
}
