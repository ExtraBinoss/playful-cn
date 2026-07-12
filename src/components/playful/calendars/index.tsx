import * as React from 'react'
import * as m from 'motion/react-m'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'
import { PlayfulChevronLeftIcon, PlayfulChevronRightIcon } from '../icons'

export type PlayfulCalendarProps = {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
}

export function PlayfulCalendar({
  value,
  defaultValue = new Date(),
  onChange,
  variant = 'sticker',
  className,
}: PlayfulCalendarProps) {
  const [selectedDate, setSelectedDate] = useControllableState<Date>({
    value,
    defaultValue,
    onChange,
  })

  const [currentMonth, setCurrentMonth] = React.useState(() => {
    const initial = selectedDate || new Date()
    return new Date(initial.getFullYear(), initial.getMonth(), 1)
  })

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // First day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayIndex = new Date(year, month, 1).getDay()

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const nextDate = new Date(year, month, day)
    setSelectedDate(nextDate)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    )
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    )
  }

  // Generate calendar days
  const calendarCells = []
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="pc-calendar-cell is-empty" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(
      <button
        key={`day-${day}`}
        type="button"
        className={cn('pc-calendar-cell pc-calendar-day', {
          'is-today': isToday(day),
          'is-selected': isSelected(day),
        })}
        onClick={() => handleDateClick(day)}
      >
        {day}
      </button>
    )
  }

  return (
    <div className={cn('pc-calendar', `pc-calendar-${variant}`, className)} role="application" aria-label="Calendar">
      <div className="pc-calendar-header">
        <button type="button" className="pc-calendar-nav" onClick={handlePrevMonth} aria-label="Previous month">
          <PlayfulChevronLeftIcon className="w-4 h-4" />
        </button>
        <span className="pc-calendar-title">
          {monthNames[month]} {year}
        </span>
        <button type="button" className="pc-calendar-nav" onClick={handleNextMonth} aria-label="Next month">
          <PlayfulChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      <m.div key={`${year}-${month}`} className="pc-calendar-grid" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.16 }} role="grid" aria-label={`${monthNames[month]} ${year}`}>
        {dayNames.map((name) => (
          <div key={name} className="pc-calendar-weekday" role="columnheader">
            {name}
          </div>
        ))}
        {calendarCells}
      </m.div>
    </div>
  )
}

export function StickerCalendar(props: Omit<PlayfulCalendarProps, 'variant'>) {
  return <PlayfulCalendar {...props} variant="sticker" />
}

export function BubbleCalendar(props: Omit<PlayfulCalendarProps, 'variant'>) {
  return <PlayfulCalendar {...props} variant="bubble" />
}

export function SketchCalendar(props: Omit<PlayfulCalendarProps, 'variant'>) {
  return <PlayfulCalendar {...props} variant="sketch" />
}
