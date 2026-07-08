import * as m from 'motion/react-m'
import { cn } from '../../../lib/styling/cn'
import { buttonMotionPresets } from './button-motion'
import type { PlayfulButtonBaseProps, PlayfulButtonSize } from './button.types'

const sizeClasses: Record<PlayfulButtonSize, string> = {
  sm: 'h-9 px-3 text-sm rounded-xl',
  md: 'h-11 px-5 text-sm rounded-2xl',
  lg: 'h-13 px-6 text-base rounded-2xl',
  xl: 'h-15 px-8 text-lg rounded-[1.4rem]',
}

type ButtonBaseProps = PlayfulButtonBaseProps & {
  variationClassName: string
}

export function ButtonBase({
  size = 'md',
  tone = 'default',
  motionPreset = 'pop',
  loading = false,
  icon,
  iconPosition = 'left',
  leftIcon,
  rightIcon,
  className,
  variationClassName,
  children,
  disabled,
  ...props
}: ButtonBaseProps) {
  const resolvedLeftIcon = leftIcon ?? (iconPosition === 'left' ? icon : null)
  const resolvedRightIcon = rightIcon ?? (iconPosition === 'right' ? icon : null)

  return (
    <m.button
      className={cn(
        'pc-button inline-flex items-center justify-center gap-2 font-bold outline-none select-none disabled:pointer-events-none disabled:opacity-50',
        sizeClasses[size],
        variationClassName,
        className,
      )}
      disabled={disabled || loading}
      data-tone={tone}
      {...buttonMotionPresets[motionPreset]}
      {...props}
    >
      {loading ? (
        <span className="pc-button-loader" aria-hidden />
      ) : (
        resolvedLeftIcon
      )}
      <span>{children}</span>
      {resolvedRightIcon}
    </m.button>
  )
}
