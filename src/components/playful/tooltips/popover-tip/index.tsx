import * as React from 'react'
import * as m from 'motion/react-m'
import { cn } from '../../../../lib/styling/cn'

export type PopoverTipTooltipProps = {
  content: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function PopoverTipTooltip({
  content,
  children,
  className,
}: PopoverTipTooltipProps) {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <span
      className={cn('pc-tooltip pc-tooltip-popover-tip', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      {open ? (
        <m.span
          id={id}
          role="tooltip"
          className="pc-tooltip-content"
          initial={{ opacity: 0, y: 4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.14 }}
        >
          {content}
        </m.span>
      ) : null}
    </span>
  )
}
