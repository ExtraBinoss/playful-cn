import type { ButtonHTMLAttributes, ReactNode } from 'react'
import * as m from 'motion/react-m'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'

export type PlayfulSwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'checked' | 'defaultChecked' | 'onChange' | 'value'> & {
  checked?: boolean
  defaultChecked?: boolean
  loading?: boolean
  label?: ReactNode
  icon?: ReactNode
  onChange?: (checked: boolean) => void
}

export function SwitchBase({ variant, checked, defaultChecked = false, loading = false, label, icon, className, disabled, onChange, onClick, children, ...props }: PlayfulSwitchProps & { variant: 'sticker' | 'bubble' | 'glow' | 'sketch' }) {
  const [isChecked, setChecked] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange })
  const isDisabled = disabled || loading

  return (
    <span className={cn('pc-switch-field', isDisabled && 'is-disabled')}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        className={cn('pc-switch', `pc-switch-${variant}`, className)}
        onClick={(event) => { setChecked((current) => !current); onClick?.(event) }}
        {...props}
      >
        <m.span className="pc-switch-thumb" aria-hidden whileTap={{ scale: 0.84 }} transition={{ type: 'spring', stiffness: 600, damping: 24 }}>{loading ? <span className="pc-control-loader" /> : icon ?? null}</m.span>
        {children}
      </button>
      {label ? <span className="pc-switch-label">{label}</span> : null}
    </span>
  )
}
