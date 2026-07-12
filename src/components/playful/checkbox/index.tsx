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
  checkedIcon?: ReactNode
}

export function PlayfulCheckbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  variant = 'sticker',
  checkedIcon,
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
        {isChecked ? (checkedIcon ?? <DefaultCheckIcon />) : null}
      </span>
      {label ? <span className="pc-checkbox-label">{label}</span> : null}
    </label>
  )
}

function DefaultCheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <path d="M3 8.5 6.5 12 13 4" />
    </svg>
  )
}
