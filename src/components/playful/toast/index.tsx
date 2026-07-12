import * as m from 'motion/react-m'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'

export type PlayfulToastProps = {
  tone?: 'success' | 'info' | 'warning' | 'danger'
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  className?: string
}

export function PlayfulToast({
  tone = 'success',
  title,
  description,
  icon,
  className,
}: PlayfulToastProps) {
  return (
    <m.div
      className={cn('pc-toast', `pc-toast-${tone}`, className)}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
    >
      <span className="pc-toast-icon" data-tone={tone} aria-hidden>
        {icon ?? <DefaultToastIcon tone={tone} />}
      </span>
      <div>
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
    </m.div>
  )
}

function DefaultToastIcon({ tone }: { tone: NonNullable<PlayfulToastProps['tone']> }) {
  if (tone === 'warning') return <span>!</span>
  if (tone === 'danger') return <span>x</span>
  if (tone === 'info') return <span>i</span>
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    >
      <path d="M3 8.5 6.5 12 13 4" />
    </svg>
  )
}
