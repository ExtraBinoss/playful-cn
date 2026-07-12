# Playful Components

A React component library for playful, animated, accessible UI primitives.

The V1 goal is to prove the visual system and API shape with a TanStack Start
documentation site, Motion-powered interactions, CSS tokens, and a first set of
components that can later become a package.

## Stack

- React
- TanStack Start and file routing for the documentation site
- Motion with `LazyMotion`
- CSS variables and plain class names, no required Tailwind dependency for the
  exported components
- Biome, TypeScript, and generated route files

## Project Shape

```txt
src/
  components/
    playful/      # library components
    site/         # documentation/marketing UI
  generated/      # docs and search metadata
  lib/            # reusable library helpers
  routes/         # TanStack Start routes
  styles.css      # global tokens and component CSS
```

## Current V1 Components

- Button
- IconButton
- Badge
- Card
- Input
- SearchInput
- Switch
- Checkbox
- Tabs
- Tooltip
- ColorPicker
- Toast

## Commands

```bash
npm run generate-routes
npm run check
npm run build
npm run build:cli
```

## CLI

The experimental CLI lives in `packages/cli` and installs components from the
GitHub Raw registry.

```bash
npm run build:cli
npx ./packages/cli add buttons/sticker-pop --registry-url "file://$PWD/registry/index.json"
```

The dev server is intentionally left to the local workflow:

```bash
npm run dev
```
