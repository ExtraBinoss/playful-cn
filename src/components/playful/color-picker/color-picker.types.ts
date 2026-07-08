export type PlayfulColor = {
  hex: string
  name?: string
}

export type PlayfulColorPickerProps = {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  palette?: Array<PlayfulColor>
  allowCustom?: boolean
  showHexInput?: boolean
  showPreview?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'sticker' | 'soft' | 'bubble'
  className?: string
}
