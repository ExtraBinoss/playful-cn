import * as React from 'react'
import { cn } from '../../../lib/styling/cn'

export type PlayfulTableProps = {
  headers?: Array<React.ReactNode>
  rows: Array<Array<React.ReactNode>>
  variant?: 'sticker' | 'bubble' | 'sketch'
  className?: string
}

export function PlayfulTable({
  headers,
  rows,
  variant = 'sticker',
  className,
}: PlayfulTableProps) {
  return (
    <div className={cn('pc-table-container', `pc-table-container-${variant}`, className)}>
      <table className="pc-table">
        {headers && headers.length > 0 ? (
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="pc-table-th">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="pc-table-tr">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="pc-table-td">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StickerTable(props: Omit<PlayfulTableProps, 'variant'>) {
  return <PlayfulTable {...props} variant="sticker" />
}

export function BubbleTable(props: Omit<PlayfulTableProps, 'variant'>) {
  return <PlayfulTable {...props} variant="bubble" />
}

export function SketchTable(props: Omit<PlayfulTableProps, 'variant'>) {
  return <PlayfulTable {...props} variant="sketch" />
}
