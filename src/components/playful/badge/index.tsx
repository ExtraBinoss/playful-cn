import { cn } from '../../../lib/styling/cn'
import type { PlayfulButtonTone } from '../buttons'

export type PlayfulBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'pill' | 'sticker' | 'dot' | 'soft' | 'outline'
  tone?: PlayfulButtonTone
}

export function PlayfulBadge({
  variant = 'pill',
  tone = 'pink',
  className,
  children,
  ...props
}: PlayfulBadgeProps) {
  return (
    <span
      className={cn(
        'pc-badge inline-flex items-center gap-1.5 text-xs font-extrabold uppercase',
        `pc-tone-${tone}`,
        `pc-badge-${variant}`,
        className,
      )}
      {...props}
    >
      {variant === 'dot' ? <span className="pc-badge-dot" aria-hidden /> : null}
      {children}
    </span>
  )
}
