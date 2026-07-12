import { access, readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const registry = JSON.parse(await readFile(path.join(root, 'registry/index.json'), 'utf8'))
const files = [...registry.styles.files, ...registry.items.flatMap((item) => item.files)]
const missing = []

for (const file of new Set(files)) {
  try { await access(path.join(root, file)) } catch { missing.push(file) }
}

if (missing.length) {
  console.error(`Registry references ${missing.length} missing file(s):`)
  for (const file of missing) console.error(`- ${file}`)
  process.exit(1)
}

console.log(`Registry OK: ${registry.items.length} item(s), ${registry.styles.files.length} style source(s).`)
