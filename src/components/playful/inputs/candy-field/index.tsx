import type { InputHTMLAttributes } from 'react'
import { cn } from '../../../../lib/styling/cn'

export type CandyFieldInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  inputSize?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-10 px-3 text-sm',
  md: 'h-12 px-4 text-base',
  lg: 'h-14 px-5 text-lg',
}

export function CandyFieldInput({
  inputSize = 'md',
  className,
  ...props
}: CandyFieldInputProps) {
  return (
    <input
      className={cn('pc-input pc-input-candy-field', sizes[inputSize], className)}
      {...props}
    />
  )
}
