import type { InputHTMLAttributes } from 'react'
import { cn } from '../../../lib/styling/cn'

export type PlayfulInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  variant?: 'sticker' | 'soft' | 'underline' | 'bubble'
  inputSize?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-10 px-3 text-sm',
  md: 'h-12 px-4 text-base',
  lg: 'h-14 px-5 text-lg',
}

export function PlayfulInput({
  variant = 'sticker',
  inputSize = 'md',
  className,
  ...props
}: PlayfulInputProps) {
  return (
    <input
      className={cn(
        'pc-input w-full font-bold outline-none disabled:cursor-not-allowed disabled:opacity-55',
        sizes[inputSize],
        `pc-input-${variant}`,
        className,
      )}
      {...props}
    />
  )
}
