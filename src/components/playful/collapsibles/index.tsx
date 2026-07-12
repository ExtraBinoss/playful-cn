import * as React from 'react'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'
import { PlayfulChevronDownIcon } from '../icons'

export type PlayfulCollapsibleProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: React.ReactNode
  children: React.ReactNode
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
  disabled?: boolean
}

export function PlayfulCollapsible({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  variant = 'sticker',
  className,
  disabled = false,
}: PlayfulCollapsibleProps) {
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const contentId = React.useId()

  return (
    <div
      className={cn(
        'pc-collapsible',
        `pc-collapsible-${variant}`,
        { 'is-open': isOpen, 'is-disabled': disabled },
        className
      )}
    >
      <button
        type="button"
        className="pc-collapsible-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
      >
        <span className="pc-collapsible-trigger-text">{trigger}</span>
        <m.span
          className="pc-collapsible-icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <PlayfulChevronDownIcon className="w-[18px] h-[18px]" />
        </m.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pc-collapsible-content">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function StickerCollapsible(props: Omit<PlayfulCollapsibleProps, 'variant'>) {
  return <PlayfulCollapsible {...props} variant="sticker" />
}

export function BubbleCollapsible(props: Omit<PlayfulCollapsibleProps, 'variant'>) {
  return <PlayfulCollapsible {...props} variant="bubble" />
}

export function SketchCollapsible(props: Omit<PlayfulCollapsibleProps, 'variant'>) {
  return <PlayfulCollapsible {...props} variant="sketch" />
}
