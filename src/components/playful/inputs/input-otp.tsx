import * as React from 'react'
import * as m from 'motion/react-m'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulField } from './field'
import { formMotionPresets } from './form-motion'

export type PlayfulInputOTPProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'type'> & {
  length?: number
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  variant?: 'sticker' | 'bubble' | 'sketch'
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  invalid?: boolean
  separator?: ReactNode
  pattern?: string
}

export function InputOTPBase({ variant, length = 6, value, defaultValue = '', onChange, label, hint, error, invalid = false, separator, pattern = '[0-9]', className, disabled, ...props }: PlayfulInputOTPProps & { variant: 'sticker' | 'bubble' | 'sketch' }) {
  const [internal, setInternal] = React.useState(defaultValue.slice(0, length))
  const inputRef = React.useRef<HTMLInputElement>(null)
  const current = value ?? internal
  const update = (next: string) => { const filtered = [...next].filter((char) => new RegExp(pattern).test(char)).join('').slice(0, length); if (value === undefined) setInternal(filtered); onChange?.(filtered) }
  return <PlayfulField label={label} description={hint} error={error} invalid={invalid}><div className={cn('pc-input-otp', `pc-input-otp-${variant}`, className)} onClick={() => inputRef.current?.focus()}>{Array.from({ length }, (_, index) => <React.Fragment key={index}><m.span className={cn('pc-input-otp-slot', current[index] && 'is-filled')} animate={current[index] ? { y: -1, scale: 1.03 } : { y: 0, scale: 1 }} {...formMotionPresets[variant]} transition={{ type: 'spring', stiffness: 520, damping: 24 }}>{current[index] ?? ''}</m.span>{separator && index < length - 1 ? <span className="pc-input-otp-separator" aria-hidden>{separator}</span> : null}</React.Fragment>)}<input ref={inputRef} className="pc-input-otp-input" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={length} value={current} disabled={disabled} aria-invalid={invalid || undefined} onChange={(event) => update(event.target.value)} {...props} /></div></PlayfulField>
}
