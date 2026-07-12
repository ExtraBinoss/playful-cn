import * as m from 'motion/react-m'
import * as React from 'react'
import { cn } from '../../../lib/styling/cn'
import { inputMotionPresets } from './input-motion'
import type { PlayfulInputBaseProps, PlayfulInputSize } from './input.types'

const sizeClasses: Record<PlayfulInputSize, string> = {
  sm: 'h-10 px-3 text-sm rounded-xl',
  md: 'h-12 px-4 text-base rounded-2xl',
  lg: 'h-14 px-5 text-lg rounded-2xl',
  xl: 'h-16 px-6 text-xl rounded-[1.4rem]',
}

type InputBaseProps = PlayfulInputBaseProps & {
  variationClassName: string
}

export function InputBase({
  inputSize = 'md',
  tone = 'default',
  motionPreset = 'lift',
  invalid = false,
  icon,
  iconPosition = 'left',
  leftIcon,
  rightIcon,
  label,
  hint,
  error,
  maxLength,
  showCount = true,
  onChange,
  value,
  defaultValue,
  className,
  variationClassName,
  id,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...props
}: InputBaseProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(String(defaultValue ?? ''))
  const inputValue = value !== undefined ? String(value) : uncontrolledValue
  const message = invalid ? error : hint
  const messageId = id && message ? `${id}-message` : undefined
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(' ')
  const resolvedLeftIcon = leftIcon ?? (iconPosition === 'left' ? icon : null)
  const resolvedRightIcon = rightIcon ?? (iconPosition === 'right' ? icon : null)
  const hasLeftIcon = Boolean(resolvedLeftIcon)
  const hasRightIcon = Boolean(resolvedRightIcon)
  const hasIcon = hasLeftIcon || hasRightIcon

  const input = (
    <span className="pc-input-control">
      {resolvedLeftIcon ? (
        <span className="pc-input-icon pc-input-icon-left" aria-hidden>
          {resolvedLeftIcon}
        </span>
      ) : null}
      <m.input
        id={id}
        className={cn(
          'pc-input w-full font-bold outline-none disabled:cursor-not-allowed disabled:opacity-55',
          sizeClasses[inputSize],
          hasIcon && 'pc-input-has-icon',
          hasLeftIcon && 'pc-input-has-left-icon',
          hasRightIcon && 'pc-input-has-right-icon',
          variationClassName,
          className,
        )}
        data-tone={invalid ? 'error' : tone}
        data-invalid={invalid ? 'true' : undefined}
        aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
        aria-describedby={describedBy || undefined}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => { setUncontrolledValue(event.currentTarget.value); onChange?.(event) }}
        {...inputMotionPresets[motionPreset]}
        {...props}
      />
      {resolvedRightIcon ? (
        <span className="pc-input-icon pc-input-icon-right" aria-hidden>
          {resolvedRightIcon}
        </span>
      ) : null}
    </span>
  )

  if (!label && !message && !(showCount && maxLength !== undefined)) {
    return input
  }

  return (
    <label className="pc-input-field">
      {label ? <span className="pc-input-label">{label}</span> : null}
      {input}
      {message || (showCount && maxLength !== undefined) ? (
        <span className="pc-input-message-row">
        {message ? (
        <span
          id={messageId}
          className="pc-input-message"
          data-tone={invalid ? 'error' : tone}
        >
          {message}
        </span>
        ) : <span />}
        {showCount && maxLength !== undefined ? <span className="pc-input-counter">{inputValue.length}/{maxLength}</span> : null}
        </span>
      ) : null}
    </label>
  )
}
