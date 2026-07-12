import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/playful-cn/' : '/',
  resolve: { tsconfigPaths: true },
  build: process.env.GITHUB_PAGES === 'true' ? { outDir: 'dist' } : undefined,
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(process.env.GITHUB_PAGES === 'true' ? { prerender: { enabled: true, crawlLinks: true } } : undefined),
    ...(process.env.GITHUB_PAGES === 'true' ? [] : [nitro({ rollupConfig: { external: [/^@sentry\//] } })]),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
