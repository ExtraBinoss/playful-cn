import * as React from 'react'
import * as m from 'motion/react-m'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'
import { PlayfulChevronLeftIcon, PlayfulChevronRightIcon } from '../icons'

export type PlayfulCarouselProps = {
  items: Array<React.ReactNode>
  activeIndex?: number
  defaultActiveIndex?: number
  onActiveIndexChange?: (index: number) => void
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
}

export function PlayfulCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  variant = 'sticker',
  className,
}: PlayfulCarouselProps) {
  const hasItems = items.length > 0
  const [index, setIndex] = useControllableState<number>({
    value: activeIndex,
    defaultValue: defaultActiveIndex,
    onChange: onActiveIndexChange,
  })

  const next = () => {
    if (!hasItems) return
    setIndex((index + 1) % items.length)
  }

  const prev = () => {
    if (!hasItems) return
    setIndex((index - 1 + items.length) % items.length)
  }

  if (!hasItems) {
    return <section className={cn('pc-carousel', `pc-carousel-${variant}`, className)} aria-label="Content carousel"><div className="pc-carousel-empty">No slides available.</div></section>
  }

  return (
    <section className={cn('pc-carousel', `pc-carousel-${variant}`, className)} aria-roledescription="carousel" aria-label="Content carousel">
      <div className="pc-carousel-viewport">
        <m.div
          className="pc-carousel-track"
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
          {items.map((item, idx) => (
            <div key={idx} className="pc-carousel-slide" role="group" aria-roledescription="slide" aria-label={`${idx + 1} of ${items.length}`} aria-hidden={idx !== index}>
              {item}
            </div>
          ))}
        </m.div>
      </div>

      <button type="button" className="pc-carousel-nav-btn pc-carousel-prev" onClick={prev} aria-label="Previous slide">
        <PlayfulChevronLeftIcon className="w-5 h-5" />
      </button>
      <button type="button" className="pc-carousel-nav-btn pc-carousel-next" onClick={next} aria-label="Next slide">
        <PlayfulChevronRightIcon className="w-5 h-5" />
      </button>

      <div className="pc-carousel-dots">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={cn('pc-carousel-dot', { 'is-active': idx === index })}
            onClick={() => setIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export function StickerCarousel(props: Omit<PlayfulCarouselProps, 'variant'>) {
  return <PlayfulCarousel {...props} variant="sticker" />
}

export function BubbleCarousel(props: Omit<PlayfulCarouselProps, 'variant'>) {
  return <PlayfulCarousel {...props} variant="bubble" />
}

export function SketchCarousel(props: Omit<PlayfulCarouselProps, 'variant'>) {
  return <PlayfulCarousel {...props} variant="sketch" />
}
