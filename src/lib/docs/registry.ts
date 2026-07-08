import type { ComponentDoc } from './types'

export const componentRegistry: Array<ComponentDoc> = [
  {
    slug: 'button',
    name: 'Button',
    description: 'Primary playful CTA with sticker, bubble, soft and gradient variants.',
    tags: ['button', 'cta', 'motion', 'form'],
    status: 'ready',
    props: [
      { name: 'variant', type: 'solid | sticker | bubble | soft | outline | ghost | gradient', defaultValue: 'sticker', description: 'Visual treatment.' },
      { name: 'tone', type: 'pink | purple | blue | mint | yellow | orange | neutral', defaultValue: 'pink', description: 'Semantic color family.' },
      { name: 'size', type: 'sm | md | lg | xl', defaultValue: 'md', description: 'Button size.' },
      { name: 'motionPreset', type: 'none | pop | squish | wiggle', defaultValue: 'pop', description: 'Interaction animation.' },
    ],
  },
  {
    slug: 'color-picker',
    name: 'ColorPicker',
    description: 'Swatch based custom color picker with HEX input and animated preview.',
    tags: ['color', 'picker', 'swatch', 'form'],
    status: 'ready',
    props: [
      { name: 'value', type: 'string', description: 'Controlled HEX value.' },
      { name: 'defaultValue', type: 'string', defaultValue: '#ff4ecd', description: 'Initial HEX value.' },
      { name: 'onChange', type: '(color: string) => void', description: 'Called when the color changes.' },
    ],
  },
]
