import { Check } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'

export type PlayfulCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'type' | 'checked'
> & {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: ReactNode
  variant?: 'bubble' | 'sticker' | 'soft'
}

export function PlayfulCheckbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  variant = 'sticker',
  className,
  ...props
}: PlayfulCheckboxProps) {
  const [isChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  })

  return (
    <label className={cn('pc-checkbox', `pc-checkbox-${variant}`, className)}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(event) => setChecked(event.target.checked)}
        {...props}
      />
      <span className="pc-checkbox-box" aria-hidden>
        {isChecked ? <Check size={16} strokeWidth={4} /> : null}
      </span>
      {label ? <span className="pc-checkbox-label">{label}</span> : null}
    </label>
  )
}
