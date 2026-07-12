import * as React from 'react'
import * as m from 'motion/react-m'
import { cn } from '../../../lib/styling/cn'

export type PlayfulOverlayProps = {
  trigger?: React.ReactElement
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  closeLabel?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

type OverlayMode = 'dialog' | 'alert-dialog' | 'drawer' | 'sheet' | 'popover' | 'hover-card' | 'menu'

export function OverlayBase({ mode, variation, trigger, title, description, children, open: openProp, defaultOpen = false, onOpenChange, className, closeLabel = 'Close', side = mode === 'drawer' ? 'right' : 'bottom' }: PlayfulOverlayProps & { mode: OverlayMode; variation: 'sticker' | 'bubble' | 'sketch' }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen
  const setOpen = React.useCallback((value: boolean) => { setUncontrolledOpen(value); onOpenChange?.(value) }, [onOpenChange])
  const contentRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const id = React.useId()
  const modal = mode === 'dialog' || mode === 'alert-dialog' || mode === 'drawer' || mode === 'sheet'
  const hover = mode === 'hover-card'

  React.useEffect(() => {
    if (!open || !modal) return
    const previous = document.activeElement as HTMLElement | null
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); setOpen(false) } }
    document.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => contentRef.current?.focus())
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus() }
  }, [open, modal, setOpen])

  const triggerElement = trigger ? React.cloneElement(trigger, {
    ref: (node: HTMLElement | null) => { triggerRef.current = node; const ref = (trigger as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref; if (typeof ref === 'function') ref(node); else if (ref && typeof ref === 'object') ref.current = node },
    'aria-haspopup': mode === 'menu' ? 'menu' : mode === 'popover' || hover ? 'dialog' : undefined,
    'aria-expanded': mode === 'menu' || mode === 'popover' || hover ? open : undefined,
    onClick: (event: React.MouseEvent) => { trigger.props.onClick?.(event); setOpen(!open) },
  }) : null

  const body = <m.div ref={contentRef} tabIndex={-1} id={id} role={mode === 'alert-dialog' ? 'alertdialog' : mode === 'menu' ? 'menu' : 'dialog'} aria-modal={modal || undefined} aria-labelledby={title ? `${id}-title` : undefined} aria-describedby={description ? `${id}-description` : undefined} className={cn('pc-overlay-panel', `pc-overlay-${mode}`, `pc-overlay-${variation}`, `pc-overlay-side-${side}`, className)} initial={{ opacity: 0, y: modal ? 10 : 4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: modal ? 8 : 2, scale: 0.98 }}>
    <div className="pc-overlay-heading">{title ? <h2 id={`${id}-title`}>{title}</h2> : null}{modal ? <button type="button" className="pc-overlay-close" aria-label={closeLabel} onClick={() => setOpen(false)}>×</button> : null}</div>
    {description ? <p id={`${id}-description`} className="pc-overlay-description">{description}</p> : null}
    <div className="pc-overlay-body">{children}</div>
  </m.div>

  if (hover) return <span className={cn('pc-overlay-anchor', className)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>{triggerElement}{open ? body : null}</span>
  return <span className="pc-overlay-anchor">{triggerElement}{open ? <>{modal ? <m.button type="button" aria-label="Close overlay" className="pc-overlay-backdrop" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /> : null}{body}</> : null}</span>
}

export type PlayfulMenuItem = { label: React.ReactNode; onSelect?: () => void; disabled?: boolean }
export type PlayfulMenuProps = Omit<PlayfulOverlayProps, 'children'> & { items: Array<PlayfulMenuItem> }
export function MenuBase({ variation, items, ...props }: PlayfulMenuProps & { variation: 'sticker' | 'bubble' | 'sketch' }) { return <OverlayBase mode="menu" variation={variation} {...props}>{items.map((item, index) => <button key={index} type="button" role="menuitem" disabled={item.disabled} onClick={() => { item.onSelect?.(); props.onOpenChange?.(false) }}>{item.label}</button>)}</OverlayBase> }
