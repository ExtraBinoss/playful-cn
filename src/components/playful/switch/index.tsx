import * as m from 'motion/react-m'
import type { ButtonHTMLAttributes } from 'react'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'

export type PlayfulSwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'value'
> & {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  variant?: 'bubble' | 'sticker' | 'soft'
}

export function PlayfulSwitch({
  checked,
  defaultChecked = false,
  onChange,
  variant = 'sticker',
  className,
  disabled,
  ...props
}: PlayfulSwitchProps) {
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
      className={cn('pc-switch', `pc-switch-${variant}`, className)}
      onClick={() => setChecked((current) => !current)}
      {...props}
    >
      <m.span className="pc-switch-thumb" layout />
    </button>
  )
}
