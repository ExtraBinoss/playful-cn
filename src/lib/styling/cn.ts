export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: any }
  | ClassValue[]

export function cn(...classes: ClassValue[]): string {
  const result: string[] = []

  for (const value of classes) {
    if (!value) continue

    if (typeof value === 'string' || typeof value === 'number') {
      result.push(value.toString())
    } else if (Array.isArray(value)) {
      const inner = cn(...value)
      if (inner) result.push(inner)
    } else if (typeof value === 'object') {
      for (const key in value) {
        if (value[key]) {
          result.push(key)
        }
      }
    }
  }

  return result.join(' ')
}

