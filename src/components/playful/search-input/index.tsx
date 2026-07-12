import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulIconButton } from '../icon-button'

export type PlayfulSearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string
  onChange: (value: string) => void
  searchIcon?: ReactNode
  clearIcon?: ReactNode
}

export function PlayfulSearchInput({
  value,
  onChange,
  searchIcon,
  clearIcon,
  className,
  ...props
}: PlayfulSearchInputProps) {
  return (
    <label className={cn('pc-search-input', className)}>
      <span aria-hidden>{searchIcon ?? <DefaultSearchIcon />}</span>
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
          {clearIcon ?? <DefaultClearIcon />}
        </PlayfulIconButton>
      ) : null}
    </label>
  )
}

function DefaultSearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <circle cx="8" cy="8" r="5" />
      <path d="m12 12 3.5 3.5" />
    </svg>
  )
}

function DefaultClearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  )
}
