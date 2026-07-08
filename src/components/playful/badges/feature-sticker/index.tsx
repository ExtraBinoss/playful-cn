import { cn } from '../../../../lib/styling/cn'

export type FeatureStickerBadgeProps =
  React.HTMLAttributes<HTMLSpanElement> & {
    dot?: boolean
  }

export function FeatureStickerBadge({
  dot = true,
  className,
  children,
  ...props
}: FeatureStickerBadgeProps) {
  return (
    <span className={cn('pc-badge pc-badge-feature-sticker', className)} {...props}>
      {dot ? <span className="pc-badge-feature-dot" aria-hidden /> : null}
      {children}
    </span>
  )
}
