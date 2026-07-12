import type { InputHTMLAttributes, ReactNode } from 'react'
import { useControllableState } from '../../../../lib/react/use-controllable-state'
import { cn } from '../../../../lib/styling/cn'

export type StarCheckCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'onChange' | 'type'
> & {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: ReactNode
  checkedIcon?: ReactNode
}

export function StarCheckCheckbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  checkedIcon,
  className,
  ...props
}: StarCheckCheckboxProps) {
  const [isChecked, setChecked] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  })

  return (
    <label className={cn('pc-checkbox pc-checkbox-star-check', className)}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(event) => setChecked(event.target.checked)}
        {...props}
      />
      <span className="pc-checkbox-box" aria-hidden>
        {isChecked ? (checkedIcon ?? <DefaultStarIcon />) : null}
      </span>
      {label ? <span className="pc-checkbox-label">{label}</span> : null}
    </label>
  )
}

function DefaultStarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="currentColor"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M8 1.5 10 5.6l4.5.65-3.25 3.15.75 4.45L8 11.75l-4 2.1.75-4.45L1.5 6.25 6 5.6 8 1.5Z" />
    </svg>
  )
}
