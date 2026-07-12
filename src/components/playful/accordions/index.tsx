import * as React from 'react'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'
import { PlayfulChevronDownIcon } from '../icons'

export type AccordionItem = {
  value: string
  trigger: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export type PlayfulAccordionProps = {
  items: Array<AccordionItem>
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: any) => void
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
}

export function PlayfulAccordion({
  items,
  type = 'single',
  value,
  defaultValue = type === 'single' ? '' : [],
  onChange,
  variant = 'sticker',
  className,
}: PlayfulAccordionProps) {
  const instanceId = React.useId()
  const [activeValues, setActiveValues] = useControllableState<string | string[]>({
    value,
    defaultValue,
    onChange,
  })

  const toggleItem = (itemValue: string) => {
    if (type === 'single') {
      const current = activeValues as string
      setActiveValues(current === itemValue ? '' : itemValue)
    } else {
      const current = (activeValues as string[]) || []
      const next = current.includes(itemValue)
        ? current.filter((v) => v !== itemValue)
        : [...current, itemValue]
      setActiveValues(next)
    }
  }

  return (
    <div className={cn('pc-accordion', `pc-accordion-${variant}`, className)}>
      {items.map((item) => {
        const isOpen =
          type === 'single'
            ? activeValues === item.value
            : ((activeValues as string[]) || []).includes(item.value)
        const contentId = `${instanceId}-accordion-${item.value.replace(/[^a-zA-Z0-9_-]/g, '-')}`

        return (
          <div
            key={item.value}
            className={cn('pc-accordion-item', {
              'is-open': isOpen,
              'is-disabled': item.disabled,
            })}
          >
            <button
              type="button"
              className="pc-accordion-header"
              onClick={() => !item.disabled && toggleItem(item.value)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              disabled={item.disabled}
            >
              <span className="pc-accordion-trigger-text">{item.trigger}</span>
              <m.span
                className="pc-accordion-icon"
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
                  <div className="pc-accordion-content">{item.content}</div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export function StickerAccordion(props: Omit<PlayfulAccordionProps, 'variant'>) {
  return <PlayfulAccordion {...props} variant="sticker" />
}

export function BubbleAccordion(props: Omit<PlayfulAccordionProps, 'variant'>) {
  return <PlayfulAccordion {...props} variant="bubble" />
}

export function SketchAccordion(props: Omit<PlayfulAccordionProps, 'variant'>) {
  return <PlayfulAccordion {...props} variant="sketch" />
}
