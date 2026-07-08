import { CheckCircle2, Info, TriangleAlert, XCircle } from 'lucide-react'
import * as m from 'motion/react-m'
import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'

export type PlayfulToastProps = {
  tone?: 'success' | 'info' | 'warning' | 'danger'
  title: ReactNode
  description?: ReactNode
  className?: string
}

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: TriangleAlert,
  danger: XCircle,
}

export function PlayfulToast({
  tone = 'success',
  title,
  description,
  className,
}: PlayfulToastProps) {
  const Icon = icons[tone]

  return (
    <m.div
      className={cn('pc-toast', `pc-toast-${tone}`, className)}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
    >
      <Icon size={22} aria-hidden />
      <div>
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
    </m.div>
  )
}
