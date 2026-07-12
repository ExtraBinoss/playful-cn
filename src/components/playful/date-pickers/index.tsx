import * as React from 'react'
import { OverlayBase } from '../overlays/overlay-base'
import { PlayfulCalendar } from '../calendars'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { PlayfulCalendarIcon } from '../icons'
import { cn } from '../../../lib/styling/cn'

export type PlayfulDatePickerProps = {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
  placeholder?: string
}

export function PlayfulDatePicker({
  value,
  defaultValue,
  onChange,
  variant = 'sticker',
  className,
  placeholder = 'Select date...',
}: PlayfulDatePickerProps) {
  const [selectedDate, setSelectedDate] = useControllableState<Date | undefined>({
    value,
    defaultValue,
    onChange: onChange ? (d) => d && onChange(d) : undefined,
  })

  const [isOpen, setIsOpen] = React.useState(false)

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ''

  const inputClassNames = {
    sticker: 'pc-input pc-input-sticker pc-input-candy-field',
    bubble: 'pc-input pc-input-bubble pc-input-bubble-field',
    sketch: 'pc-input pc-input-sketch pc-input-sketch-field',
  }

  const trigger = (
    <button
      type="button"
      className={cn(
        'pc-input-control pc-datepicker-trigger w-full font-bold text-left outline-none flex items-center justify-between cursor-pointer',
        inputClassNames[variant],
        variant === 'bubble' ? 'h-12 px-4 rounded-full' : 'h-12 px-4 rounded-2xl',
        className
      )}
    >
      <span className={cn('flex-1', !selectedDate && 'text-[color-mix(in_srgb,var(--pc-color-ink)_52%,transparent)]')}>
        {formattedDate || placeholder}
      </span>
      <span className="pc-input-icon pc-input-icon-right ml-2" aria-hidden>
        <PlayfulCalendarIcon className="w-[18px] h-[18px]" />
      </span>
    </button>
  )

  return (
    <div className={cn('pc-datepicker', `pc-datepicker-${variant}`)}>
      <OverlayBase
        mode="popover"
        variation={variant}
        trigger={trigger}
        open={isOpen}
        onOpenChange={setIsOpen}
        side="bottom"
      >
        <div className="pc-datepicker-calendar-wrapper">
          <PlayfulCalendar
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date)
              setIsOpen(false)
            }}
            variant={variant}
          />
        </div>
      </OverlayBase>
    </div>
  )
}

export function StickerDatePicker(props: Omit<PlayfulDatePickerProps, 'variant'>) {
  return <PlayfulDatePicker {...props} variant="sticker" />
}

export function BubbleDatePicker(props: Omit<PlayfulDatePickerProps, 'variant'>) {
  return <PlayfulDatePicker {...props} variant="bubble" />
}

export function SketchDatePicker(props: Omit<PlayfulDatePickerProps, 'variant'>) {
  return <PlayfulDatePicker {...props} variant="sketch" />
}
