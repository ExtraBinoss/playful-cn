import * as React from 'react'
import { cn } from '../lib/styling/cn'

type SideScrollProps = React.HTMLAttributes<HTMLDivElement> & {
  viewportClassName?: string
}

export function SideScroll({
  children,
  className,
  viewportClassName,
  ...props
}: SideScrollProps) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const updateScrollState = React.useCallback(() => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth
    setCanScrollLeft(viewport.scrollLeft > 1)
    setCanScrollRight(viewport.scrollLeft < maxScrollLeft - 1)
  }, [])

  React.useEffect(() => {
    const viewport = viewportRef.current

    if (!viewport) {
      return
    }

    updateScrollState()

    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(viewport)

    for (const child of Array.from(viewport.children)) {
      resizeObserver.observe(child)
    }

    viewport.addEventListener('scroll', updateScrollState, { passive: true })

    return () => {
      viewport.removeEventListener('scroll', updateScrollState)
      resizeObserver.disconnect()
    }
  }, [updateScrollState])

  return (
    <div
      className={cn('pc-side-scroll', className)}
      data-can-scroll-left={canScrollLeft ? 'true' : undefined}
      data-can-scroll-right={canScrollRight ? 'true' : undefined}
      {...props}
    >
      <div
        className={cn('pc-side-scroll-viewport', viewportClassName)}
        ref={viewportRef}
      >
        {children}
      </div>
    </div>
  )
}

