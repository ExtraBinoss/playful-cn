import * as React from 'react'
import * as m from 'motion/react-m'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'

export type PlayfulCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked' | 'onChange' | 'type' | 'value'
> & {
  checked?: boolean
  defaultChecked?: boolean
  indeterminate?: boolean
  invalid?: boolean
  loading?: boolean
  label?: ReactNode
  description?: ReactNode
  checkedIcon?: ReactNode
  icon?: ReactNode
  onChange?: (checked: boolean) => void
}

export function CheckboxBase({
  variant = 'sticker',
  checked,
  defaultChecked = false,
  indeterminate = false,
  invalid = false,
  loading = false,
  label,
  description,
  checkedIcon,
  icon,
  className,
  id,
  disabled,
  onChange,
  ...props
}: PlayfulCheckboxProps & { variant: 'sticker' | 'bubble' | 'glow' | 'sketch' }) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  })
  const isDisabled = disabled || loading

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label className={cn('pc-checkbox', `pc-checkbox-${variant}`, isDisabled && 'is-disabled', invalid && 'is-invalid', className)}>
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        checked={isChecked}
        disabled={isDisabled}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        onChange={(event) => setChecked(event.target.checked)}
        {...props}
      />
      <m.span className="pc-checkbox-box" aria-hidden whileTap={{ scale: 0.88 }} transition={{ type: 'spring', stiffness: 600, damping: 24 }}>
        {loading ? <span className="pc-control-loader" /> : indeterminate ? <span className="pc-checkbox-minus" /> : isChecked ? (checkedIcon ?? <DefaultCheckIcon />) : null}
      </m.span>
      {icon ? <span className="pc-checkbox-icon" aria-hidden>{icon}</span> : null}
      {label ? (
        <span className="pc-checkbox-copy">
          <span className="pc-checkbox-label">{label}</span>
          {description ? <span className="pc-checkbox-description">{description}</span> : null}
        </span>
      ) : null}
    </label>
  )
}

function DefaultCheckIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5"><path d="M3 8.5 6.5 12 13 4" /></svg>
}
