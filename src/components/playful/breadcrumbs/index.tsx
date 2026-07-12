import * as React from 'react'
import { cn } from '../../../lib/styling/cn'
import { PlayfulChevronRightIcon } from '../icons'

export type BreadcrumbItem = {
  label: React.ReactNode
  href?: string
}

export type PlayfulBreadcrumbProps = {
  items: Array<BreadcrumbItem>
  separator?: React.ReactNode
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
}

export function PlayfulBreadcrumb({
  items,
  separator = <PlayfulChevronRightIcon className="w-[14px] h-[14px]" />,
  variant = 'sticker',
  className,
}: PlayfulBreadcrumbProps) {
  return (
    <nav className={cn('pc-breadcrumb', `pc-breadcrumb-${variant}`, className)} aria-label="Breadcrumb">
      <ol className="pc-breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="pc-breadcrumb-item">
              {item.href && !isLast ? (
                <a href={item.href} className="pc-breadcrumb-link">
                  {item.label}
                </a>
              ) : (
                <span className="pc-breadcrumb-current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span className="pc-breadcrumb-separator" aria-hidden>{separator}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function StickerBreadcrumb(props: Omit<PlayfulBreadcrumbProps, 'variant'>) {
  return <PlayfulBreadcrumb {...props} variant="sticker" />
}

export function BubbleBreadcrumb(props: Omit<PlayfulBreadcrumbProps, 'variant'>) {
  return <PlayfulBreadcrumb {...props} variant="bubble" />
}

export function SketchBreadcrumb(props: Omit<PlayfulBreadcrumbProps, 'variant'>) {
  return <PlayfulBreadcrumb {...props} variant="sketch" />
}
