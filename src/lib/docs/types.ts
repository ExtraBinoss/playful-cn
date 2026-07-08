export type ComponentStatus = 'ready' | 'beta' | 'planned'

export type ComponentDoc = {
  slug: string
  name: string
  description: string
  tags: Array<string>
  status: ComponentStatus
  props: Array<{
    name: string
    type: string
    defaultValue?: string
    description: string
  }>
}
