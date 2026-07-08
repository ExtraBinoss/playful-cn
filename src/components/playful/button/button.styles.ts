import { cn } from '../../../lib/styling/cn'
import type {
  PlayfulButtonSize,
  PlayfulButtonTone,
  PlayfulButtonVariant,
} from './button.types'

const base =
  'pc-button inline-flex items-center justify-center gap-2 font-bold outline-none select-none disabled:opacity-50 disabled:pointer-events-none'

const sizes: Record<PlayfulButtonSize, string> = {
  sm: 'h-9 px-3 text-sm rounded-xl',
  md: 'h-11 px-5 text-sm rounded-2xl',
  lg: 'h-13 px-6 text-base rounded-2xl',
  xl: 'h-15 px-8 text-lg rounded-[1.4rem]',
}

const tones: Record<PlayfulButtonTone, string> = {
  pink: 'pc-tone-pink',
  purple: 'pc-tone-purple',
  blue: 'pc-tone-blue',
  mint: 'pc-tone-mint',
  yellow: 'pc-tone-yellow',
  orange: 'pc-tone-orange',
  neutral: 'pc-tone-neutral',
}

const variants: Record<PlayfulButtonVariant, string> = {
  solid: 'pc-button-solid',
  sticker: 'pc-button-sticker',
  bubble: 'pc-button-bubble',
  soft: 'pc-button-soft',
  outline: 'pc-button-outline',
  ghost: 'pc-button-ghost',
  gradient: 'pc-button-gradient',
}

export function getButtonClassName({
  size,
  tone,
  variant,
  className,
}: {
  size: PlayfulButtonSize
  tone: PlayfulButtonTone
  variant: PlayfulButtonVariant
  className?: string
}) {
  return cn(base, sizes[size], tones[tone], variants[variant], className)
}
