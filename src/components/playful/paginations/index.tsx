import { cn } from '../../../lib/styling/cn'
import { PlayfulChevronLeftIcon, PlayfulChevronRightIcon } from '../icons'

export type PlayfulPaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
}

export function PlayfulPagination({
  totalPages,
  currentPage,
  onPageChange,
  variant = 'sticker',
  className,
}: PlayfulPaginationProps) {
  const getPages = () => {
    const pages: Array<number | string> = []
    const range = 1 // number of pages to show on either side of current page

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      const start = Math.max(2, currentPage - range)
      const end = Math.min(totalPages - 1, currentPage + range)

      if (start > 2) {
        pages.push('...')
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages - 1) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className={cn('pc-pagination', `pc-pagination-${variant}`, className)} aria-label="Pagination">
      <button
        type="button"
        className="pc-pagination-nav pc-pagination-prev"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <PlayfulChevronLeftIcon className="w-4 h-4" />
      </button>

      <div className="pc-pagination-pages">
        {getPages().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="pc-pagination-ellipsis">
                ...
              </span>
            )
          }

          const isCurrent = page === currentPage
          return (
            <button
              key={`page-${page}`}
              type="button"
              className={cn('pc-pagination-page', { 'is-active': isCurrent })}
              onClick={() => onPageChange(page as number)}
              aria-current={isCurrent ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className="pc-pagination-nav pc-pagination-next"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <PlayfulChevronRightIcon className="w-4 h-4" />
      </button>
    </nav>
  )
}

export function StickerPagination(props: Omit<PlayfulPaginationProps, 'variant'>) {
  return <PlayfulPagination {...props} variant="sticker" />
}

export function BubblePagination(props: Omit<PlayfulPaginationProps, 'variant'>) {
  return <PlayfulPagination {...props} variant="bubble" />
}

export function SketchPagination(props: Omit<PlayfulPaginationProps, 'variant'>) {
  return <PlayfulPagination {...props} variant="sketch" />
}
