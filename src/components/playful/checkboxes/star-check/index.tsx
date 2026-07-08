import { Star } from 'lucide-react'
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
}

export function StarCheckCheckbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
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
        {isChecked ? <Star size={15} fill="currentColor" strokeWidth={3} /> : null}
      </span>
      {label ? <span className="pc-checkbox-label">{label}</span> : null}
    </label>
  )
}
