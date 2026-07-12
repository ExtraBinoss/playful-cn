import * as React from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'

export type PlayfulRadioOption = { value: string; label: ReactNode; description?: ReactNode; icon?: ReactNode; disabled?: boolean }
export type PlayfulRadioGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  options: Array<PlayfulRadioOption>
  value?: string
  defaultValue?: string
  name?: string
  orientation?: 'horizontal' | 'vertical'
  invalid?: boolean
  loading?: boolean
  onChange?: (value: string) => void
}

export function RadioGroupBase({ variant, options, value, defaultValue, name, orientation = 'vertical', invalid = false, loading = false, className, onChange, ...props }: PlayfulRadioGroupProps & { variant: 'sticker' | 'bubble' | 'glow' | 'sketch' }) {
  const [selected, setSelected] = useControllableState({ value, defaultValue: defaultValue ?? options[0]?.value ?? '', onChange })
  const itemRefs = React.useRef<Array<HTMLInputElement | null>>([])
  const groupName = name ?? React.useId()

  const move = (index: number, direction: 1 | -1) => {
    const enabled = options.map((option, optionIndex) => ({ option, optionIndex })).filter(({ option }) => !option.disabled)
    const current = enabled.findIndex(({ optionIndex }) => optionIndex === index)
    const next = enabled[(current + direction + enabled.length) % enabled.length]
    if (!next) return
    setSelected(next.option.value)
    itemRefs.current[next.optionIndex]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-invalid={invalid || undefined}
      aria-busy={loading || undefined}
      data-orientation={orientation}
      className={cn('pc-radio-group', `pc-radio-group-${variant}`, loading && 'is-loading', invalid && 'is-invalid', className)}
      {...props}
    >
      {options.map((option, index) => {
        const isSelected = selected === option.value
        const isDisabled = loading || option.disabled
        return (
          <label key={option.value} className={cn('pc-radio-item', isSelected && 'is-selected', isDisabled && 'is-disabled')}>
            <input
              ref={(element) => { itemRefs.current[index] = element }}
              type="radio"
              name={groupName}
              value={option.value}
              checked={isSelected}
              disabled={isDisabled}
              onChange={() => setSelected(option.value)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') { event.preventDefault(); move(index, 1) }
                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') { event.preventDefault(); move(index, -1) }
                if (event.key === 'Home') { event.preventDefault(); move(index, -options.length) }
                if (event.key === 'End') { event.preventDefault(); move(index, options.length) }
              }}
            />
            <span className="pc-radio-dot" aria-hidden>{loading && isSelected ? <span className="pc-control-loader" /> : option.icon ?? null}</span>
            <span className="pc-radio-copy"><span className="pc-radio-label">{option.label}</span>{option.description ? <span className="pc-radio-description">{option.description}</span> : null}</span>
          </label>
        )
      })}
    </div>
  )
}
