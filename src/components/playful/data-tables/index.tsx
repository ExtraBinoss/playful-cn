import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'

export type PlayfulDataTableColumn<Row> = { key: string; header: ReactNode; cell?: (row: Row) => ReactNode }
export type PlayfulDataTableProps<Row extends Record<string, ReactNode>> = { columns: Array<PlayfulDataTableColumn<Row>>; rows: Array<Row>; caption?: ReactNode; variant?: 'sticker' | 'bubble' | 'sketch'; className?: string }

export function PlayfulDataTable<Row extends Record<string, ReactNode>>({ columns, rows, caption, variant = 'sticker', className }: PlayfulDataTableProps<Row>) {
  return <div className={cn('pc-data-table-container', `pc-data-table-container-${variant}`, className)}><table className="pc-data-table"><caption>{caption}</caption><thead><tr>{columns.map((column) => <th scope="col" key={column.key}>{column.header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{columns.map((column) => <td key={column.key}>{column.cell ? column.cell(row) : row[column.key]}</td>)}</tr>)}</tbody></table></div>
}

export function StickerDataTable<Row extends Record<string, ReactNode>>(props: PlayfulDataTableProps<Row>) { return <PlayfulDataTable {...props} variant="sticker" /> }
export function BubbleDataTable<Row extends Record<string, ReactNode>>(props: PlayfulDataTableProps<Row>) { return <PlayfulDataTable {...props} variant="bubble" /> }
export function SketchDataTable<Row extends Record<string, ReactNode>>(props: PlayfulDataTableProps<Row>) { return <PlayfulDataTable {...props} variant="sketch" /> }
