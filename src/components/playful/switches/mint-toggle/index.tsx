import * as m from 'motion/react-m'
import type { ButtonHTMLAttributes } from 'react'
import { useControllableState } from '../../../../lib/react/use-controllable-state'
import { cn } from '../../../../lib/styling/cn'

export type MintToggleSwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'value'
> & {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export function MintToggleSwitch({
  checked,
  defaultChecked = false,
  onChange,
  className,
  disabled,
  ...props
}: MintToggleSwitchProps) {
  const [isChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  })

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      className={cn('pc-switch pc-switch-mint-toggle', className)}
      onClick={() => setChecked((current) => !current)}
      {...props}
    >
      <m.span className="pc-switch-thumb" layout />
    </button>
  )
}
