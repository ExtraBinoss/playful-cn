import * as React from 'react'
import { createPortal } from 'react-dom'
import * as m from 'motion/react-m'
import { cn } from '../../../lib/styling/cn'
import { PlayfulArrowIcon } from '../icons'

export type PlayfulOverlayProps = {
  trigger?: React.ReactElement<any>
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
  const [mounted, setMounted] = React.useState(false)
  const open = openProp ?? uncontrolledOpen
  const setOpen = React.useCallback((value: boolean) => { setUncontrolledOpen(value); onOpenChange?.(value) }, [onOpenChange])
  const contentRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const id = React.useId()
  const modal = mode === 'dialog' || mode === 'alert-dialog' || mode === 'drawer' || mode === 'sheet'
  const hover = mode === 'hover-card'
  const floating = mode === 'popover' || mode === 'hover-card' || mode === 'menu'
  const [floatingStyle, setFloatingStyle] = React.useState<React.CSSProperties>(() => floating ? { visibility: 'hidden' } : {})

  React.useEffect(() => { setMounted(true) }, [])

  React.useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); setOpen(false) } }
    document.addEventListener('keydown', onKeyDown)
    if (modal) requestAnimationFrame(() => contentRef.current?.focus())
    if (floating && !hover) {
      const onPointerDown = (event: PointerEvent) => { if (!event.composedPath().includes(triggerRef.current as EventTarget) && !event.composedPath().includes(contentRef.current as EventTarget)) setOpen(false) }
      document.addEventListener('pointerdown', onPointerDown)
      return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown); if (modal) previous?.focus() }
    }
    return () => { document.removeEventListener('keydown', onKeyDown); if (modal) previous?.focus() }
  }, [open, modal, floating, hover, setOpen])

  React.useLayoutEffect(() => {
    if (!open || !floating) { setFloatingStyle(floating ? { visibility: 'hidden' } : {}); return }
    let frame = 0
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max))
    const getPosition = (placement: 'top' | 'right' | 'bottom' | 'left', triggerRect: DOMRect, panelRect: DOMRect) => {
      const gap = 12
      if (placement === 'top') return { left: triggerRect.left + (triggerRect.width - panelRect.width) / 2, top: triggerRect.top - panelRect.height - gap }
      if (placement === 'right') return { left: triggerRect.right + gap, top: triggerRect.top + (triggerRect.height - panelRect.height) / 2 }
      if (placement === 'left') return { left: triggerRect.left - panelRect.width - gap, top: triggerRect.top + (triggerRect.height - panelRect.height) / 2 }
      return { left: triggerRect.left + (triggerRect.width - panelRect.width) / 2, top: triggerRect.bottom + gap }
    }
    const fits = (position: { left: number; top: number }, panelRect: DOMRect) => position.left >= 8 && position.top >= 8 && position.left + panelRect.width <= window.innerWidth - 8 && position.top + panelRect.height <= window.innerHeight - 8
    const update = () => {
      const triggerNode = triggerRef.current
      const panelNode = contentRef.current
      if (!triggerNode || !panelNode) return
      const triggerRect = triggerNode.getBoundingClientRect()
      const panelRect = panelNode.getBoundingClientRect()
      const candidates = [side, side === 'top' ? 'bottom' : 'top', side === 'left' ? 'right' : 'left'] as const
      const position = candidates.map((candidate) => getPosition(candidate, triggerRect, panelRect)).find((candidate) => fits(candidate, panelRect)) ?? getPosition(side, triggerRect, panelRect)
      setFloatingStyle({ left: clamp(position.left, 8, window.innerWidth - panelRect.width - 8), top: clamp(position.top, 8, window.innerHeight - panelRect.height - 8), visibility: 'visible' })
    }
    frame = requestAnimationFrame(update)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true) }
  }, [open, floating, side])

  const triggerElement = trigger ? React.cloneElement(trigger, {
    ref: (node: HTMLElement | null) => { triggerRef.current = node; const ref = (trigger as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref; if (typeof ref === 'function') ref(node); else if (ref && typeof ref === 'object') ref.current = node },
    'aria-haspopup': mode === 'menu' ? 'menu' : mode === 'popover' || hover ? 'dialog' : undefined,
    'aria-expanded': mode === 'menu' || mode === 'popover' || hover ? open : undefined,
    onClick: (event: React.MouseEvent) => { event.preventDefault(); event.stopPropagation(); trigger.props.onClick?.(event); setOpen(!open) },
  }) : null

  const body = <m.div ref={contentRef} style={floating ? floatingStyle : undefined} tabIndex={-1} id={id} role={mode === 'alert-dialog' ? 'alertdialog' : mode === 'menu' ? 'menu' : 'dialog'} aria-modal={modal || undefined} aria-labelledby={title ? `${id}-title` : undefined} aria-describedby={description ? `${id}-description` : undefined} className={cn('pc-overlay-panel', floating && 'pc-overlay-floating', `pc-overlay-${mode}`, `pc-overlay-${variation}`, `pc-overlay-side-${side}`, className)} initial={{ opacity: 0, y: modal ? 10 : 4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: modal ? 8 : 2, scale: 0.98 }}>
    <div className="pc-overlay-heading">{title ? <h2 id={`${id}-title`}>{title}</h2> : null}{modal ? <button type="button" className="pc-overlay-close" aria-label={closeLabel} onClick={() => setOpen(false)}>×</button> : null}</div>
    {description ? <p id={`${id}-description`} className="pc-overlay-description">{description}</p> : null}
    <div className="pc-overlay-body">{children}</div>
  </m.div>

  if (hover) return <span className={cn('pc-overlay-anchor', className)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>{triggerElement}{open ? body : null}</span>
  if (modal) return <span className="pc-overlay-anchor">{triggerElement}{open && mounted ? createPortal(<><m.button type="button" aria-label="Close overlay" className="pc-overlay-backdrop" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />{body}</>, document.body) : null}</span>
  return <span className="pc-overlay-anchor">{triggerElement}{open ? body : null}</span>
}

export type PlayfulMenuItem = { label: React.ReactNode; icon?: React.ReactNode; onSelect?: () => void; disabled?: boolean }
export type PlayfulMenuProps = Omit<PlayfulOverlayProps, 'children'> & { items: Array<PlayfulMenuItem> }
export function MenuBase({ variation, items, ...props }: PlayfulMenuProps & { variation: 'sticker' | 'bubble' | 'sketch' }) { return <OverlayBase mode="menu" variation={variation} {...props}>{items.map((item, index) => <button key={index} type="button" role="menuitem" disabled={item.disabled} onClick={() => { item.onSelect?.(); props.onOpenChange?.(false) }}><span className="pc-menu-item-icon" aria-hidden>{item.icon ?? <PlayfulArrowIcon />}</span><span>{item.label}</span></button>)}</OverlayBase> }
