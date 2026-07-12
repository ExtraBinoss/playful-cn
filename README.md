# Playful Components

A React component library for playful, animated, accessible UI primitives.

Documentation: [extrabinoss.github.io/playful-cn](https://extrabinoss.github.io/playful-cn/)

The documentation site is deployed automatically to GitHub Pages after every
push to `master` through [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions** once; after that, pushes to `master` publish the site.

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

## Coverage status

The current completed block includes the three canonical skins (`sticker`,
`bubble`, `sketch`) for Tabs, Accordion, Collapsible, Carousel, Calendar, Date
Picker, Breadcrumb, Pagination, Table, Navigation Menu, and Data Table. The
remaining work is tracked in [`docs/COMPONENT-COVERAGE.md`](docs/COMPONENT-COVERAGE.md).

Still missing or requiring a parity pass:

- Attachment, Bubble, Marker, Message, Message Scroller
- Aspect Ratio, Avatar, Button Group, Chart, Combobox, Command, Context Menu
- Direction, Item, Kbd, Menubar, Native Select, Resizable, Scroll Area
- Select, Separator, Sidebar, Slider, Sonner, Toggle, Toggle Group, Typography
- Toast and Tooltip still need their final parity/3-skin audit
- Extension components (IconButton, SearchInput, ColorPicker) still need 3/3 coverage

## Commands

```bash
npm run generate-routes
npm run check
npm run build
npm run build:cli
npm run check:registry
```

## CLI

The experimental CLI lives in `packages/cli` and installs components from the
GitHub Raw registry.

```bash
npm run build:cli
npx ./packages/cli add buttons/sticker-pop --registry-url "file://$PWD/registry/index.json"
```

The registry validator and CI also verify that every registry file exists:

```bash
npm run check:registry
npm run build:cli
node packages/cli/dist/index.js list --registry-url "file://$PWD/registry/index.json"
node packages/cli/dist/index.js diff buttons --registry-url "file://$PWD/registry/index.json"
```

The dev server is intentionally left to the local workflow:

```bash
npm run dev
```
