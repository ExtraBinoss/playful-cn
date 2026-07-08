const HEX_COLOR = /^#(?:[0-9a-fA-F]{3}){1,2}$/

export function isHexColor(value: string) {
  return HEX_COLOR.test(value)
}

export function normalizeHexColor(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return '#000000'
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`
  return withHash.toLowerCase()
}
