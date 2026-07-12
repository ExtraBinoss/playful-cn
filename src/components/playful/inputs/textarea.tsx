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
  resizeIcon?: ReactNode
}

export function TextareaBase({ variant, textareaSize = 'md', tone = 'default', invalid = false, loading = false, label, hint, error, showCount = true, resizeIcon, id, className, disabled, maxLength, value, defaultValue, onChange, style, ...props }: PlayfulTextareaProps & { variant: 'sticker' | 'bubble' | 'sketch' }) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const resizeSession = React.useRef({ active: false, startY: 0, startHeight: 0, pendingHeight: 0 })
  const resizeFrame = React.useRef<number | null>(null)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(String(defaultValue ?? ''))
  const currentValue = value !== undefined ? String(value) : uncontrolledValue
  const message = invalid ? error : hint
  const messageId = id && message ? `${id}-message` : undefined
  React.useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (!resizeSession.current.active) return
      const nextHeight = Math.min(480, Math.max(112, resizeSession.current.startHeight + event.clientY - resizeSession.current.startY))
      resizeSession.current.pendingHeight = nextHeight
      if (resizeFrame.current === null) {
        resizeFrame.current = requestAnimationFrame(() => {
          if (textareaRef.current) textareaRef.current.style.height = `${resizeSession.current.pendingHeight}px`
          resizeFrame.current = null
        })
      }
    }
    const handleUp = () => { resizeSession.current.active = false; document.body.style.cursor = ''; if (resizeFrame.current !== null) { cancelAnimationFrame(resizeFrame.current); resizeFrame.current = null } }
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    return () => { window.removeEventListener('pointermove', handleMove); window.removeEventListener('pointerup', handleUp); if (resizeFrame.current !== null) cancelAnimationFrame(resizeFrame.current) }
  }, [])

  const startResize = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.preventDefault()
    const height = textareaRef.current?.getBoundingClientRect().height ?? 112
    resizeSession.current = { active: true, startY: event.clientY, startHeight: height, pendingHeight: height }
    document.body.style.cursor = 'ns-resize'
  }

  return <PlayfulField label={label} invalid={invalid} description={hint} error={error}><span className="pc-textarea-wrap"><m.textarea ref={textareaRef} id={id} disabled={disabled || loading} aria-busy={loading || undefined} aria-invalid={invalid || undefined} aria-describedby={messageId} data-tone={invalid ? 'error' : tone} className={cn('pc-textarea', `pc-textarea-${variant}`, `pc-textarea-${textareaSize}`, className)} maxLength={maxLength} value={value} defaultValue={defaultValue} style={style} onChange={(event) => { setUncontrolledValue(event.currentTarget.value); onChange?.(event) }} {...formMotionPresets[variant]} transition={{ type: 'spring', stiffness: 420, damping: 30 }} {...props} /><span className="pc-textarea-resize-icon" role="button" tabIndex={disabled || loading ? -1 : 0} aria-label="Resize text area" onPointerDown={disabled || loading ? undefined : startResize}>{resizeIcon ?? <DefaultResizeIcon />}</span></span>{showCount && maxLength !== undefined ? <span className="pc-input-counter pc-textarea-counter">{currentValue.length}/{maxLength}</span> : null}</PlayfulField>
}

function DefaultResizeIcon() {
  return <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M4 14 14 4M9 14l5-5" /></svg>
}
