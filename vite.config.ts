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
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
    nitro({ preset: process.env.GITHUB_PAGES === 'true' ? 'github-pages' : undefined, rollupConfig: { external: [/^@sentry\//] } }),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})

export default config
