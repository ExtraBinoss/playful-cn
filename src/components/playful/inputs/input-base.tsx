import * as m from 'motion/react-m'
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
  label,
  hint,
  error,
  className,
  variationClassName,
  id,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...props
}: InputBaseProps) {
  const message = invalid ? error : hint
  const messageId = id && message ? `${id}-message` : undefined
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(' ')

  const input = (
    <m.input
      id={id}
      className={cn(
        'pc-input w-full font-bold outline-none disabled:cursor-not-allowed disabled:opacity-55',
        sizeClasses[inputSize],
        variationClassName,
        className,
      )}
      data-tone={invalid ? 'error' : tone}
      data-invalid={invalid ? 'true' : undefined}
      aria-invalid={ariaInvalid ?? (invalid ? true : undefined)}
      aria-describedby={describedBy || undefined}
      {...inputMotionPresets[motionPreset]}
      {...props}
    />
  )

  if (!label && !message) {
    return input
  }

  return (
    <label className="pc-input-field">
      {label ? <span className="pc-input-label">{label}</span> : null}
      {input}
      {message ? (
        <span
          id={messageId}
          className="pc-input-message"
          data-tone={invalid ? 'error' : tone}
        >
          {message}
        </span>
      ) : null}
    </label>
  )
}
