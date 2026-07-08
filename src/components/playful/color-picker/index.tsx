import * as React from 'react'
import * as m from 'motion/react-m'
import { isHexColor, normalizeHexColor } from '../../../lib/colors/color-utils'
import { useControllableState } from '../../../lib/react/use-controllable-state'
import { cn } from '../../../lib/styling/cn'
import type { PlayfulColor, PlayfulColorPickerProps } from './color-picker.types'

export const defaultPlayfulPalette: Array<PlayfulColor> = [
  { hex: '#ff4ecd', name: 'Candy Pink' },
  { hex: '#a855f7', name: 'Grape' },
  { hex: '#38bdf8', name: 'Sky Pop' },
  { hex: '#5eead4', name: 'Mint' },
  { hex: '#fde047', name: 'Lemon' },
  { hex: '#fb923c', name: 'Orange' },
  { hex: '#3ee98f', name: 'Lime' },
  { hex: '#18181b', name: 'Ink' },
]

export function PlayfulColorPicker({
  value,
  defaultValue = '#ff4ecd',
  onChange,
  palette = defaultPlayfulPalette,
  allowCustom = true,
  showHexInput = true,
  showPreview = true,
  size = 'md',
  variant = 'sticker',
  className,
}: PlayfulColorPickerProps) {
  const [selectedColor, setSelectedColor] = useControllableState({
    value,
    defaultValue,
    onChange,
  })

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = normalizeHexColor(event.target.value)
      setSelectedColor(nextValue)
    },
    [setSelectedColor],
  )

  return (
    <div className={cn('pc-color-picker', `pc-color-picker-${variant}`, className)}>
      {showPreview ? (
        <div className="pc-color-picker-preview-row">
          <m.div
            className="pc-color-picker-preview"
            style={{ backgroundColor: selectedColor }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 0.18 }}
          />
          <span>{selectedColor}</span>
        </div>
      ) : null}

      <div className={cn('pc-color-picker-grid', `pc-color-picker-grid-${size}`)}>
        {palette.map((color) => {
          const isSelected =
            color.hex.toLowerCase() === selectedColor.toLowerCase()

          return (
            <m.button
              key={color.hex}
              type="button"
              aria-label={color.name ?? color.hex}
              aria-pressed={isSelected}
              className="pc-color-swatch"
              style={{ backgroundColor: color.hex }}
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.92 }}
              data-selected={isSelected ? 'true' : undefined}
              onClick={() => setSelectedColor(color.hex)}
            />
          )
        })}
      </div>

      {allowCustom && showHexInput ? (
        <input
          className="pc-color-picker-input"
          value={selectedColor}
          onChange={handleInputChange}
          aria-invalid={!isHexColor(selectedColor)}
          aria-label="Custom HEX color"
          spellCheck={false}
        />
      ) : null}
    </div>
  )
}

export type { PlayfulColor, PlayfulColorPickerProps }
