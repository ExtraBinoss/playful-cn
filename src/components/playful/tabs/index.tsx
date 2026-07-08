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
  variant?: 'bubble' | 'underline-pop' | 'sticker'
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

  return (
    <div className={cn('pc-tabs', `pc-tabs-${variant}`, className)}>
      <div className="pc-tabs-list" role="tablist">
        {items.map((item) => {
          const selected = item.value === selectedValue
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={selected}
              className="pc-tabs-trigger"
              onClick={() => setSelectedValue(item.value)}
            >
              {selected ? <m.span className="pc-tabs-indicator" layoutId="pc-tabs-indicator" /> : null}
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
      <m.div
        key={selectedValue}
        className="pc-tabs-panel"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.16 }}
        role="tabpanel"
      >
        {selectedItem?.content}
      </m.div>
    </div>
  )
}
