import * as React from 'react'
import * as m from 'motion/react-m'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'

export type PlayfulTabItem = {
  value: string
  label: React.ReactNode
  content: React.ReactNode
}

export type PlayfulTabsProps = {
  items: Array<PlayfulTabItem>
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
}

export function PlayfulTabs({
  items,
  value,
  defaultValue = items[0]?.value ?? '',
  onChange,
  variant = 'sticker',
  className,
}: PlayfulTabsProps) {
  const [selectedValue, setSelectedValue] = useControllableState({
    value,
    defaultValue,
    onChange,
  })
  const selectedItem = items.find((item) => item.value === selectedValue)
  const instanceId = React.useId()
  const tabId = (value: string) => `${instanceId}-tab-${value.replace(/[^a-zA-Z0-9_-]/g, '-')}`
  const selectByOffset = (currentIndex: number, offset: number) => {
    if (!items.length) return
    setSelectedValue(items[(currentIndex + offset + items.length) % items.length].value)
  }

  return (
    <div className={cn('pc-tabs', `pc-tabs-${variant}`, className)}>
      <div className="pc-tabs-list" role="tablist" aria-orientation="horizontal">
        {items.map((item) => {
          const selected = item.value === selectedValue
          const index = items.indexOf(item)
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tabId(item.value)}-panel`}
              id={tabId(item.value)}
              tabIndex={selected ? 0 : -1}
              className="pc-tabs-trigger"
              onClick={() => setSelectedValue(item.value)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') { event.preventDefault(); selectByOffset(index, 1) }
                if (event.key === 'ArrowLeft') { event.preventDefault(); selectByOffset(index, -1) }
                if (event.key === 'Home') { event.preventDefault(); setSelectedValue(items[0]?.value ?? '') }
                if (event.key === 'End') { event.preventDefault(); setSelectedValue(items.at(-1)?.value ?? '') }
              }}
            >
              {selected ? (
                <m.span
                  className="pc-tabs-indicator"
                  layoutId={`pc-tabs-indicator-${variant}`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              ) : null}
              <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
            </button>
          )
        })}
      </div>
      <m.div
        key={selectedValue}
        className="pc-tabs-panel"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        id={selectedItem ? `${tabId(selectedItem.value)}-panel` : undefined}
        aria-labelledby={selectedItem ? tabId(selectedItem.value) : undefined}
        role="tabpanel"
        tabIndex={0}
      >
        {selectedItem?.content}
      </m.div>
    </div>
  )
}

export function StickerTabs(props: Omit<PlayfulTabsProps, 'variant'>) {
  return <PlayfulTabs {...props} variant="sticker" />
}

export function BubbleTabs(props: Omit<PlayfulTabsProps, 'variant'>) {
  return <PlayfulTabs {...props} variant="bubble" />
}

export function SketchTabs(props: Omit<PlayfulTabsProps, 'variant'>) {
  return <PlayfulTabs {...props} variant="sketch" />
}
