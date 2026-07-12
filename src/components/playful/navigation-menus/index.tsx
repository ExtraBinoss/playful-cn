import type { ReactNode } from 'react'
import { cn } from '../../../lib/styling/cn'

export type PlayfulNavigationItem = { label: ReactNode; href: string; icon?: ReactNode; active?: boolean }
export type PlayfulNavigationMenuProps = { items: Array<PlayfulNavigationItem>; label?: string; variant?: 'sticker' | 'bubble' | 'sketch'; className?: string }

export function PlayfulNavigationMenu({ items, label = 'Main navigation', variant = 'sticker', className }: PlayfulNavigationMenuProps) {
  return <nav className={cn('pc-navigation-menu', `pc-navigation-menu-${variant}`, className)} aria-label={label}><ul>{items.map((item, index) => <li key={`${item.href}-${index}`}><a href={item.href} aria-current={item.active ? 'page' : undefined} className={cn({ 'is-active': item.active })}>{item.icon ? <span className="pc-navigation-icon" aria-hidden>{item.icon}</span> : null}<span>{item.label}</span></a></li>)}</ul></nav>
}

export function StickerNavigationMenu(props: Omit<PlayfulNavigationMenuProps, 'variant'>) { return <PlayfulNavigationMenu {...props} variant="sticker" /> }
export function BubbleNavigationMenu(props: Omit<PlayfulNavigationMenuProps, 'variant'>) { return <PlayfulNavigationMenu {...props} variant="bubble" /> }
export function SketchNavigationMenu(props: Omit<PlayfulNavigationMenuProps, 'variant'>) { return <PlayfulNavigationMenu {...props} variant="sketch" /> }
