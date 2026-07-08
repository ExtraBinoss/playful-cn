export type PlayfulVisualVariant = 'sticker' | 'bubble' | 'glow' | 'sketch'

export type PlayfulVisualVariantMeta = {
  slug: PlayfulVisualVariant
  label: string
  description: string
  buttonComponent: string
  inputComponent: string
  buttonClassName: `pc-button-${PlayfulVisualVariant}`
  inputClassName: `pc-input-${PlayfulVisualVariant}`
  buttonMotionPreset: 'pop' | 'squish' | 'wiggle'
  inputMotionPreset: 'lift' | 'squish' | 'glow'
  tokens: Array<string>
}

export const playfulVisualVariants = [
  {
    slug: 'sticker',
    label: 'Sticker',
    description: 'Chunky sticker surfaces with hard shadows and candy-pink accents.',
    buttonComponent: 'StickerPopButton',
    inputComponent: 'StickerFieldInput',
    buttonClassName: 'pc-button-sticker',
    inputClassName: 'pc-input-sticker',
    buttonMotionPreset: 'pop',
    inputMotionPreset: 'lift',
    tokens: ['--pc-color-pink', '--pc-button-shadow', '--pc-input-shadow'],
  },
  {
    slug: 'bubble',
    label: 'Bubble',
    description: 'Rounded pill controls with glossy pressure and soft blue surfaces.',
    buttonComponent: 'BubbleGumButton',
    inputComponent: 'BubbleFieldInput',
    buttonClassName: 'pc-button-bubble',
    inputClassName: 'pc-input-bubble',
    buttonMotionPreset: 'squish',
    inputMotionPreset: 'squish',
    tokens: ['--pc-color-blue', '--pc-button-inset-shadow', '--pc-radius-full'],
  },
  {
    slug: 'glow',
    label: 'Glow',
    description: 'High-energy gradient controls for expressive search and upgrade flows.',
    buttonComponent: 'NeonGradientButton',
    inputComponent: 'GlowFieldInput',
    buttonClassName: 'pc-button-glow',
    inputClassName: 'pc-input-glow',
    buttonMotionPreset: 'pop',
    inputMotionPreset: 'glow',
    tokens: ['--pc-color-pink', '--pc-color-purple', '--pc-color-blue'],
  },
  {
    slug: 'sketch',
    label: 'Sketch',
    description: 'Hand-cut white controls with bold offset shadows.',
    buttonComponent: 'SketchOutlineButton',
    inputComponent: 'SketchFieldInput',
    buttonClassName: 'pc-button-sketch',
    inputClassName: 'pc-input-sketch',
    buttonMotionPreset: 'pop',
    inputMotionPreset: 'lift',
    tokens: ['--pc-color-background-soft', '--pc-border-color', '--pc-radius-lg'],
  },
] as const satisfies Array<PlayfulVisualVariantMeta>

