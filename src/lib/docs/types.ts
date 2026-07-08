export type ComponentStatus = 'ready' | 'beta' | 'planned'

export type ComponentPropDoc = {
  name: string
  type: string
  defaultValue?: string
  description: string
}

export type ComponentVariationDoc = {
  slug: string
  name: string
  description: string
  componentName: string
  importPath: string
  tags: Array<string>
  status: ComponentStatus
  tokens: Array<string>
  props: Array<ComponentPropDoc>
}

export type ComponentFamilyDoc = {
  familySlug: string
  familyName: string
  description: string
  tags: Array<string>
  variations: Array<ComponentVariationDoc>
}
