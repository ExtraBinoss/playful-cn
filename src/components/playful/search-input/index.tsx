import { Search, X } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulIconButton } from '../icon-button'

export type PlayfulSearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string
  onChange: (value: string) => void
}

export function PlayfulSearchInput({
  value,
  onChange,
  className,
  ...props
}: PlayfulSearchInputProps) {
  return (
    <label className={cn('pc-search-input', className)}>
      <Search size={18} aria-hidden />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
      {value ? (
        <PlayfulIconButton
          label="Clear search"
          type="button"
          variant="ghost"
          tone="neutral"
          size="sm"
          onClick={() => onChange('')}
        >
          <X size={16} />
        </PlayfulIconButton>
      ) : null}
    </label>
  )
}
