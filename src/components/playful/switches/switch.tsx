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

export function SwitchBase({ variant, checked, defaultChecked = false, loading = false, label, icon, className, disabled, onChange, onClick, children, ...props }: PlayfulSwitchProps & { variant: 'sticker' | 'bubble' | 'sketch' }) {
  const [isChecked, setChecked] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange })
  const isDisabled = disabled || loading

  return (
    <span className={cn('pc-switch-field', isDisabled && 'is-disabled')}>
      <m.button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        className={cn('pc-switch', `pc-switch-${variant}`, className)}
        onClick={(event) => {
          if (!isDisabled) setChecked(!isChecked)
          onClick?.(event)
        }}
        whileHover={variant === 'bubble' ? { scaleX: 1.04, scaleY: 0.96 } : variant === 'sketch' ? { rotate: 1 } : { y: -2 }}
        whileTap={variant === 'bubble' ? { scaleX: 0.94, scaleY: 1.06 } : { scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 520, damping: 30 }}
        {...props}
      >
        <m.span className="pc-switch-thumb" aria-hidden animate={{ x: isChecked ? 30.4 : 0 }} transition={{ type: 'spring', stiffness: 600, damping: 24 }}>{loading ? <span className="pc-control-loader" /> : icon ?? null}</m.span>
        {children}
      </m.button>
      {label ? <span className="pc-switch-label">{label}</span> : null}
    </span>
  )
}
