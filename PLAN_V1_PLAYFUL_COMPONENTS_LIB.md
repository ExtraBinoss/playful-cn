# Playful Components Lib — Plan V1 React

> Objectif : construire une librairie open-source React de composants très **playful**, animés, fun, mais quand même propres, accessibles et performants.  
> Stack de départ : **TanStack Start + React + file-router + npm + Nitro + Biome + Query/Table/Form/Compiler**.  
> Animation V1 : **Motion** via `motion/react`, avec **LazyMotion dès le début**.

---

## 1. Vision produit

La lib doit devenir une grosse collection de composants React avec plusieurs variations visuelles : boutons, inputs, color picker fait main, badges, cards, toggles, tabs, tooltips, etc.

La différence par rapport à une lib classique :

- des composants très expressifs visuellement ;
- des couleurs fun, contrastées, presque “bonbon / sticker / mascot UI” ;
- des animations open-source intégrées via Motion, sans GSAP ;
- une API React simple, typée, documentée automatiquement ;
- un site de documentation qui sert aussi de vitrine et de playground ;
- une future CLI type shadcn pour télécharger les composants à la carte.

La V1 ne doit pas essayer de tout faire. Elle doit prouver le concept avec une base solide, des premiers composants propres, une doc automatique et une direction artistique claire.

---

## 2. Direction artistique

Référence d’inspiration : `https://www.creem.io/pricing`

À reprendre comme inspiration générale, sans copier exactement :

- gros CTA arrondis ;
- couleurs très visibles ;
- boutons qui donnent envie de cliquer ;
- ombres marquées mais propres ;
- mascotte / stickers / petits éléments décoratifs ;
- cards lisibles avec hiérarchie forte ;
- feeling SaaS moderne mais plus fun qu’une UI enterprise classique.

### Mots-clés visuels

- playful ;
- squishy ;
- sticker ;
- candy ;
- soft brutalism ;
- cartoon SaaS ;
- rounded, bouncy, colorful ;
- “fun but still production-ready”.

### Règle importante

La lib doit être inspirée par des sites fun, mais elle ne doit pas copier un design existant pixel par pixel. Il faut transformer les références en système : tokens, variantes, animations, règles d’usage.

---

## 3. Stack V1

### Déjà installé

Projet : `playful-components-lib`

- React
- TanStack Start
- file-router
- npm
- Nitro agnostic
- Biome
- TanStack Query
- TanStack Table
- TanStack Form
- React Compiler

### Doc auto

```bash
(fait par l'utilisateur) npm install react-docgen-typescript tsx
```

Optionnel plus tard :

```bash
npm install -D tsup vite-plugin-dts
```

Pour la V1, le site peut vivre directement dans TanStack Start. La partie package npm propre peut arriver après, quand les premiers composants sont stables.

---

## 4. Principe d’architecture

Le repo doit être organisé comme un site + une librairie interne exportable.

```txt
src/
  components/
    playful/
      button/
        button.tsx
        button.types.ts
        button.styles.ts
        button.docs.ts
        button.demo.tsx
        index.ts
      icon-button/
      badge/
      card/
      input/
      search-input/
      switch/
      checkbox/
      color-picker/
      tabs/
      tooltip/
      toast/
    docs/
      component-preview.tsx
      props-table.tsx
      component-grid.tsx
      search-components.tsx
    site/
      lp/
        hero.tsx
        component-wall.tsx
        playful-palette.tsx
        featured-buttons.tsx
      layout/
        header.tsx
        sidebar.tsx
        footer.tsx
  generated/
    components.docs.json
    components.search.json
  lib/
    animation/
      playful-motion-provider.tsx
      transitions.ts
      variants.ts
    colors/
      color-utils.ts
      palettes.ts
    docs/
      registry.ts
      types.ts
    react/
      compose-refs.ts
      use-controllable-state.ts
      use-event.ts
    styling/
      cn.ts
      recipes.ts
  routes/
    __root.tsx
    index.tsx
    components/
      index.tsx
      $slug.tsx
  styles/
    globals.css
    tokens.css
    themes.css
scripts/
  generate-component-docs.ts
  generate-search-index.ts
```

### Règle de séparation

Les composants de la lib ne doivent pas dépendre de TanStack Query, Table ou Form. Ces libs peuvent servir au site de doc, mais les composants exportés doivent rester le plus agnostiques possible.

Pour les composants V1, les dépendances acceptées sont :

- `react`
- `react-dom`
- `motion`

Tout le reste doit être évité ou gardé côté site.

---

## 5. Motion + LazyMotion dès la V1

Même si tu as vu des exemples avec :

```tsx
import { motion } from "motion/react"
```

avec `LazyMotion`, la bonne stratégie dans les composants de la lib est d’utiliser `m` depuis `motion/react-m`.

### Provider global

Créer ce fichier :

```tsx
// src/lib/animation/playful-motion-provider.tsx
import { LazyMotion, MotionConfig, domAnimation } from "motion/react"
import type { PropsWithChildren } from "react"

export function PlayfulMotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{
          type: "spring",
          stiffness: 520,
          damping: 32,
          mass: 0.8,
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
```

### Exemple d’usage dans un composant

```tsx
import * as m from "motion/react-m"

export function PlayfulBox() {
  return (
    <m.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 1, scale: 0.98 }}
    />
  )
}
```

### Pourquoi `strict` ?

`strict` permet d’éviter d’utiliser par erreur `motion.div` à l’intérieur de `LazyMotion`, ce qui casserait une partie du bénéfice bundle-size. Dans la lib : utiliser `m.div`, `m.button`, `m.span`, etc.

### Règles d’animation

- Animer surtout `transform` et `opacity`.
- Éviter d’animer `width`, `height`, `top`, `left` si ce n’est pas nécessaire.
- Toujours respecter `reducedMotion="user"`.
- Les animations doivent être courtes : 120ms à 260ms pour les micro-interactions.
- Les ressorts doivent être fun mais pas mous.
- Pas d’animation bloquante pour les composants de formulaire.

---

## 6. Tokens design V1

Créer des tokens CSS simples, pas un système trop complexe.

```css
/* src/styles/tokens.css */
:root {
  --pc-radius-xs: 0.5rem;
  --pc-radius-sm: 0.75rem;
  --pc-radius-md: 1rem;
  --pc-radius-lg: 1.35rem;
  --pc-radius-xl: 1.75rem;
  --pc-radius-full: 999px;

  --pc-shadow-sticker: 0 4px 0 rgb(0 0 0 / 0.9);
  --pc-shadow-soft: 0 18px 40px rgb(20 20 43 / 0.12);
  --pc-shadow-pop: 0 12px 0 rgb(0 0 0 / 0.12);

  --pc-border-strong: 2px solid rgb(24 24 27);

  --pc-ease-pop: cubic-bezier(.2, .9, .2, 1.2);
  --pc-ease-soft: cubic-bezier(.22, 1, .36, 1);
}
```

### Palettes V1

```ts
// src/lib/colors/palettes.ts
export const playfulPalettes = {
  candy: {
    name: "Candy",
    background: "#fff7fb",
    foreground: "#18181b",
    primary: "#ff4ecd",
    secondary: "#7c3aed",
    accent: "#00d9ff",
    success: "#3ee98f",
    warning: "#ffd166",
    danger: "#ff5a5f",
  },
  sunny: {
    name: "Sunny",
    background: "#fff8dc",
    foreground: "#1f1b14",
    primary: "#ffb703",
    secondary: "#fb8500",
    accent: "#219ebc",
    success: "#06d6a0",
    warning: "#ffd166",
    danger: "#ef476f",
  },
  mint: {
    name: "Mint",
    background: "#effdf7",
    foreground: "#10231c",
    primary: "#2dd4bf",
    secondary: "#14b8a6",
    accent: "#a3e635",
    success: "#22c55e",
    warning: "#facc15",
    danger: "#fb7185",
  },
  grape: {
    name: "Grape",
    background: "#faf5ff",
    foreground: "#1e102f",
    primary: "#a855f7",
    secondary: "#ec4899",
    accent: "#38bdf8",
    success: "#4ade80",
    warning: "#fbbf24",
    danger: "#f43f5e",
  },
} as const
```

### Règle de theming

Chaque composant doit pouvoir fonctionner avec :

- CSS variables globales ;
- variantes locales ;
- `className` pour laisser l’utilisateur customiser ;
- pas de dépendance obligatoire à Tailwind.

---

## 7. API générale des composants

Tous les composants doivent suivre les mêmes conventions.

```ts
type BasePlayfulProps = {
  className?: string
  playful?: boolean
  motionPreset?: "none" | "pop" | "squish" | "float" | "wiggle"
}
```

### Conventions

- `variant` pour le style.
- `size` pour la taille.
- `tone` pour la couleur sémantique.
- `motionPreset` pour l’animation.
- `asChild` seulement plus tard si tu ajoutes Radix Slot ou ton propre Slot.
- `className` toujours disponible.
- Les composants de formulaire doivent supporter `disabled`, `required`, `name`, `value`, `defaultValue`, `onChange`.

---

## 8. Performance et rerenders

### Règles V1

- Pas de store global pour les composants.
- Pas de context par composant sauf nécessité réelle.
- Les variantes d’animation doivent être déclarées hors render.
- Les calculs couleur doivent être memoïsés.
- Les callbacks exposés doivent être stables quand c’est utile.
- Les composants contrôlés doivent utiliser un hook `useControllableState`.
- Les animations doivent surtout toucher `transform` et `opacity`.
- Pas de `React.memo` partout par défaut : seulement sur les composants lourds ou très répétés.
- Les previews du site peuvent utiliser `memo`, mais la lib doit rester simple.

### Hook utile

```tsx
// src/lib/react/use-controllable-state.ts
import * as React from "react"

type UseControllableStateParams<T> = {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const setValue = React.useCallback(
    (nextValue: T | ((previous: T) => T)) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (previous: T) => T)(currentValue)
          : nextValue

      if (!isControlled) {
        setInternalValue(resolvedValue)
      }

      onChange?.(resolvedValue)
    },
    [currentValue, isControlled, onChange],
  )

  return [currentValue, setValue] as const
}
```

---

## 9. Utilitaire `cn`

Pour éviter une dépendance au début, tu peux créer un petit helper.

```ts
// src/lib/styling/cn.ts
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}
```

Plus tard, si besoin, tu peux remplacer par `clsx` ou `tailwind-merge`, mais ne commence pas avec trop de dépendances.

---

## 10. Composants V1

### Priorité 1 — indispensables pour la vitrine

1. `Button`
2. `IconButton`
3. `Badge`
4. `Card`
5. `Input`
6. `SearchInput`
7. `Switch`
8. `Checkbox`
9. `Tabs`
10. `Tooltip`
11. `ColorPicker`
12. `Toast`

### Priorité 2 — après la première release

13. `RadioGroup`
14. `SegmentedControl`
15. `Slider`
16. `Popover`
17. `Dialog`
18. `Select`
19. `CommandMenu`
20. `Progress`
21. `Avatar`
22. `Kbd`
23. `EmptyState`
24. `PricingCard`

---

## 11. Premier composant : Button

### Objectif

Le Button doit être la star de la V1. C’est lui qui donne le ton de la lib.

### Variants V1

```ts
export type ButtonVariant =
  | "solid"
  | "sticker"
  | "bubble"
  | "soft"
  | "outline"
  | "ghost"
  | "gradient"

export type ButtonTone =
  | "pink"
  | "purple"
  | "blue"
  | "mint"
  | "yellow"
  | "orange"
  | "neutral"

export type ButtonSize = "sm" | "md" | "lg" | "xl"
```

### API

```ts
// src/components/playful/button/button.types.ts
import type { ButtonHTMLAttributes, ReactNode } from "react"

export type PlayfulButtonVariant =
  | "solid"
  | "sticker"
  | "bubble"
  | "soft"
  | "outline"
  | "ghost"
  | "gradient"

export type PlayfulButtonTone =
  | "pink"
  | "purple"
  | "blue"
  | "mint"
  | "yellow"
  | "orange"
  | "neutral"

export type PlayfulButtonSize = "sm" | "md" | "lg" | "xl"
export type PlayfulButtonMotion = "none" | "pop" | "squish" | "wiggle"

export type PlayfulButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: PlayfulButtonVariant
  tone?: PlayfulButtonTone
  size?: PlayfulButtonSize
  motionPreset?: PlayfulButtonMotion
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}
```

### Styles simples

```ts
// src/components/playful/button/button.styles.ts
import { cn } from "../../../lib/styling/cn"
import type {
  PlayfulButtonSize,
  PlayfulButtonTone,
  PlayfulButtonVariant,
} from "./button.types"

const base =
  "pc-button inline-flex items-center justify-center gap-2 font-bold outline-none select-none disabled:opacity-50 disabled:pointer-events-none"

const sizes: Record<PlayfulButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-5 text-sm rounded-2xl",
  lg: "h-13 px-6 text-base rounded-2xl",
  xl: "h-15 px-8 text-lg rounded-[1.4rem]",
}

const tones: Record<PlayfulButtonTone, string> = {
  pink: "pc-tone-pink",
  purple: "pc-tone-purple",
  blue: "pc-tone-blue",
  mint: "pc-tone-mint",
  yellow: "pc-tone-yellow",
  orange: "pc-tone-orange",
  neutral: "pc-tone-neutral",
}

const variants: Record<PlayfulButtonVariant, string> = {
  solid: "pc-button-solid",
  sticker: "pc-button-sticker",
  bubble: "pc-button-bubble",
  soft: "pc-button-soft",
  outline: "pc-button-outline",
  ghost: "pc-button-ghost",
  gradient: "pc-button-gradient",
}

export function getButtonClassName({
  size,
  tone,
  variant,
  className,
}: {
  size: PlayfulButtonSize
  tone: PlayfulButtonTone
  variant: PlayfulButtonVariant
  className?: string
}) {
  return cn(base, sizes[size], tones[tone], variants[variant], className)
}
```

### Composant

```tsx
// src/components/playful/button/button.tsx
import * as m from "motion/react-m"
import { getButtonClassName } from "./button.styles"
import type { PlayfulButtonProps } from "./button.types"

const motionPresets = {
  none: {},
  pop: {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { y: 1, scale: 0.97 },
  },
  squish: {
    whileHover: { scaleX: 1.04, scaleY: 0.96 },
    whileTap: { scaleX: 0.96, scaleY: 1.04 },
  },
  wiggle: {
    whileHover: { rotate: [-1, 1, -1, 0] },
    whileTap: { scale: 0.96 },
  },
} as const

export function PlayfulButton({
  variant = "sticker",
  tone = "pink",
  size = "md",
  motionPreset = "pop",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props
}: PlayfulButtonProps) {
  return (
    <m.button
      className={getButtonClassName({ variant, tone, size, className })}
      disabled={disabled || loading}
      {...motionPresets[motionPreset]}
      {...props}
    >
      {loading ? <span className="pc-button-loader" aria-hidden /> : leftIcon}
      <span>{children}</span>
      {rightIcon}
    </m.button>
  )
}
```

### CSS recommandé

```css
.pc-button {
  border: 2px solid rgb(24 24 27);
  transform-origin: center;
  will-change: transform;
}

.pc-button:focus-visible {
  box-shadow: 0 0 0 4px rgb(255 255 255), 0 0 0 7px rgb(24 24 27);
}

.pc-button-sticker {
  background: var(--pc-button-bg);
  color: var(--pc-button-fg);
  box-shadow: 0 4px 0 rgb(24 24 27);
}

.pc-button-sticker:active {
  box-shadow: 0 2px 0 rgb(24 24 27);
}

.pc-button-bubble {
  background: var(--pc-button-bg);
  color: var(--pc-button-fg);
  border-radius: 999px;
  box-shadow: inset 0 -4px 0 rgb(0 0 0 / 0.16), 0 12px 24px rgb(0 0 0 / 0.12);
}

.pc-button-soft {
  background: color-mix(in srgb, var(--pc-button-bg) 18%, white);
  color: rgb(24 24 27);
  border-color: color-mix(in srgb, var(--pc-button-bg) 42%, black);
}

.pc-tone-pink {
  --pc-button-bg: #ff4ecd;
  --pc-button-fg: #18181b;
}

.pc-tone-purple {
  --pc-button-bg: #a855f7;
  --pc-button-fg: #ffffff;
}

.pc-tone-blue {
  --pc-button-bg: #38bdf8;
  --pc-button-fg: #082f49;
}

.pc-tone-mint {
  --pc-button-bg: #5eead4;
  --pc-button-fg: #042f2e;
}

.pc-tone-yellow {
  --pc-button-bg: #fde047;
  --pc-button-fg: #422006;
}

.pc-tone-orange {
  --pc-button-bg: #fb923c;
  --pc-button-fg: #431407;
}

.pc-tone-neutral {
  --pc-button-bg: #f4f4f5;
  --pc-button-fg: #18181b;
}
```

---

## 12. Deuxième composant : IconButton

### Objectif

Bouton carré/rond pour icônes, très utile sur la LP, les cards et les toolbars.

### Variants

- `round`
- `square`
- `sticker`
- `ghost`
- `soft`

### API

```ts
export type PlayfulIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "round" | "square" | "sticker" | "ghost" | "soft"
  tone?: "pink" | "purple" | "blue" | "mint" | "yellow" | "orange" | "neutral"
  size?: "sm" | "md" | "lg"
  label: string
  motionPreset?: "none" | "pop" | "squish" | "wiggle"
}
```

Règle accessibilité : `label` obligatoire et rendu dans `aria-label`.

---

## 13. Troisième composant : Badge

### Objectif

Créer des petits labels fun pour tags, statuts, catégories et versions.

### Variants

- `pill`
- `sticker`
- `dot`
- `soft`
- `outline`

### Idées de rendu

- `New`
- `Beta`
- `Fun`
- `Animated`
- `Accessible`
- `React`

---

## 14. Quatrième composant : Card

### Objectif

Base pour les previews, les pricing cards, les feature cards et les composants showcase.

### Variants

- `plain`
- `sticker`
- `glass`
- `gradient`
- `dashed`

### API

```ts
export type PlayfulCardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "plain" | "sticker" | "glass" | "gradient" | "dashed"
  interactive?: boolean
  motionPreset?: "none" | "pop" | "float"
}
```

---

## 15. Input + SearchInput

### Objectif

Avoir une base propre pour les formulaires et la recherche du site.

### Input variants

- `sticker`
- `soft`
- `underline`
- `bubble`

### SearchInput spécifique au site

Le `SearchInput` doit permettre de rechercher les composants disponibles depuis la LP et la page Components.

```tsx
<SearchInput
  placeholder="Search buttons, color picker, tabs..."
  value={query}
  onChange={setQuery}
/>
```

### Performance recherche

- L’index est statique : `components.search.json`.
- Pas besoin de TanStack Query.
- Utiliser `useDeferredValue` si la liste devient grosse.
- Le filtre peut matcher `name`, `description`, `tags`, `props`.

---

## 16. Switch + Checkbox

### Objectif

Des inputs fun mais accessibles.

### Règles

- Utiliser un vrai `button role="switch"` pour Switch ou un vrai `input type="checkbox"` visuellement custom.
- Garder clavier, focus visible, disabled.
- Animation du thumb avec transform.
- Pas d’animation obligatoire si reduced motion.

### Variants

- `bubble`
- `sticker`
- `soft`

---

## 17. Tabs

### Objectif

Tabs pour la doc : Preview / Code / Props / Tokens.

### Variants

- `bubble`
- `underline-pop`
- `sticker`

### Animation

- Indicateur animé avec `layoutId`.
- Les panels peuvent fade/slide légèrement.
- Ne pas ré-animer tout le contenu à chaque render.

---

## 18. Tooltip

### Objectif

Petit composant pédagogique pour expliquer les tokens, les props ou les variantes.

### V1 simple

- `TooltipProvider` non nécessaire au début.
- `Tooltip` contrôlé par hover/focus.
- Portal plus tard.
- Attention mobile : pas trop critique V1, mais prévoir `aria-describedby`.

---

## 19. ColorPicker fait main

### Objectif

Le ColorPicker doit être un composant signature. Il peut être simple en V1, mais il doit donner l’impression d’un outil fun et custom.

### V1 réaliste

Ne commence pas par un ColorPicker HSV ultra complet. Fais d’abord :

- grille de swatches ;
- input HEX ;
- preview couleur ;
- palettes playful ;
- favoris optionnels ;
- callbacks propres.

### V1.1

Ensuite ajouter :

- zone saturation/lightness ;
- hue slider ;
- alpha slider ;
- conversion HEX/RGB/HSL ;
- copie CSS variable ;
- génération de palette.

### API V1

```ts
export type PlayfulColor = {
  hex: string
  name?: string
}

export type PlayfulColorPickerProps = {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  palette?: PlayfulColor[]
  allowCustom?: boolean
  showHexInput?: boolean
  showPreview?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "sticker" | "soft" | "bubble"
  className?: string
}
```

### Exemple de composant V1

```tsx
import * as React from "react"
import * as m from "motion/react-m"
import { useControllableState } from "../../../lib/react/use-controllable-state"
import { cn } from "../../../lib/styling/cn"
import type { PlayfulColorPickerProps } from "./color-picker.types"

const defaultPalette = [
  { hex: "#ff4ecd", name: "Candy Pink" },
  { hex: "#a855f7", name: "Grape" },
  { hex: "#38bdf8", name: "Sky Pop" },
  { hex: "#5eead4", name: "Mint" },
  { hex: "#fde047", name: "Lemon" },
  { hex: "#fb923c", name: "Orange" },
]

export function PlayfulColorPicker({
  value,
  defaultValue = "#ff4ecd",
  onChange,
  palette = defaultPalette,
  allowCustom = true,
  showHexInput = true,
  showPreview = true,
  size = "md",
  variant = "sticker",
  className,
}: PlayfulColorPickerProps) {
  const [selectedColor, setSelectedColor] = useControllableState({
    value,
    defaultValue,
    onChange,
  })

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedColor(event.target.value)
    },
    [setSelectedColor],
  )

  return (
    <div className={cn("pc-color-picker", `pc-color-picker-${variant}`, className)}>
      {showPreview ? (
        <div className="pc-color-picker-preview-row">
          <m.div
            className="pc-color-picker-preview"
            style={{ backgroundColor: selectedColor }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 0.18 }}
          />
          <span>{selectedColor}</span>
        </div>
      ) : null}

      <div className={cn("pc-color-picker-grid", `pc-color-picker-grid-${size}`)}>
        {palette.map((color) => {
          const isSelected = color.hex.toLowerCase() === selectedColor.toLowerCase()

          return (
            <m.button
              key={color.hex}
              type="button"
              aria-label={color.name ?? color.hex}
              aria-pressed={isSelected}
              className="pc-color-swatch"
              style={{ backgroundColor: color.hex }}
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.92 }}
              data-selected={isSelected ? "true" : undefined}
              onClick={() => setSelectedColor(color.hex)}
            />
          )
        })}
      </div>

      {allowCustom && showHexInput ? (
        <input
          className="pc-color-picker-input"
          value={selectedColor}
          onChange={handleInputChange}
          aria-label="Custom HEX color"
        />
      ) : null}
    </div>
  )
}
```

### CSS V1

```css
.pc-color-picker {
  display: grid;
  gap: 0.9rem;
  padding: 1rem;
  border: 2px solid rgb(24 24 27);
  border-radius: 1.25rem;
  background: white;
}

.pc-color-picker-sticker {
  box-shadow: 0 5px 0 rgb(24 24 27);
}

.pc-color-picker-preview-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
}

.pc-color-picker-preview {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  border: 2px solid rgb(24 24 27);
  box-shadow: 0 3px 0 rgb(24 24 27);
}

.pc-color-picker-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.55rem;
}

.pc-color-swatch {
  aspect-ratio: 1;
  border-radius: 999px;
  border: 2px solid rgb(24 24 27);
  box-shadow: 0 3px 0 rgb(24 24 27);
  cursor: pointer;
}

.pc-color-swatch[data-selected="true"] {
  outline: 3px solid white;
  box-shadow: 0 0 0 5px rgb(24 24 27), 0 5px 0 rgb(24 24 27);
}

.pc-color-picker-input {
  height: 2.75rem;
  border: 2px solid rgb(24 24 27);
  border-radius: 0.9rem;
  padding: 0 0.9rem;
  font-weight: 700;
}
```

---

## 20. Toast

### Objectif

Composant fun pour notifications du site et de la lib.

### Variants

- `success`
- `info`
- `warning`
- `danger`
- `party`

### Animation

- Entrée : slide + pop.
- Sortie : fade + scale down.
- Pas de gros déplacement si reduced motion.

V1 peut être simple : un composant `Toast` stateless + une démo. Le système global `Toaster` peut venir en V1.1.

---

## 21. Documentation auto-générée

Tu veux que les paramètres soient générés automatiquement sur le site. La meilleure V1 : générer un JSON au build.

### Source de vérité

Chaque composant a :

1. ses types TypeScript ;
2. un fichier `.docs.ts` pour les métadonnées humaines ;
3. une ou plusieurs demos ;
4. un script qui extrait les props et écrit du JSON.

Exemple :

```ts
// src/components/playful/button/button.docs.ts
export const buttonDocs = {
  name: "Button",
  slug: "button",
  status: "ready",
  description: "A squishy, colorful button with playful variants and Motion animations.",
  tags: ["actions", "cta", "motion", "form"],
  importPath: "@playful/components/button",
  examples: [
    {
      name: "Sticker CTA",
      description: "Best for primary playful actions.",
      code: `<PlayfulButton variant="sticker" tone="pink">Get started</PlayfulButton>`,
    },
  ],
} as const
```

### Script docgen

```ts
// scripts/generate-component-docs.ts
import fs from "node:fs/promises"
import path from "node:path"
import { withCustomConfig } from "react-docgen-typescript"

const parser = withCustomConfig("./tsconfig.json", {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
})

const components = [
  {
    slug: "button",
    source: "src/components/playful/button/button.tsx",
    docs: "src/components/playful/button/button.docs.ts",
  },
  {
    slug: "color-picker",
    source: "src/components/playful/color-picker/color-picker.tsx",
    docs: "src/components/playful/color-picker/color-picker.docs.ts",
  },
]

const output = []

for (const component of components) {
  const parsed = parser.parse(component.source)

  output.push({
    slug: component.slug,
    props: parsed[0]?.props ?? {},
  })
}

await fs.mkdir(path.join(process.cwd(), "src/generated"), { recursive: true })
await fs.writeFile(
  path.join(process.cwd(), "src/generated/components.docs.json"),
  JSON.stringify(output, null, 2),
)
```

### Scripts package.json

```json
{
  "scripts": {
    "docs:generate": "tsx scripts/generate-component-docs.ts",
    "predev": "npm run docs:generate",
    "prebuild": "npm run docs:generate"
  }
}
```

### Page Props

La page d’un composant lit `components.docs.json` et affiche :

- prop name ;
- type ;
- required ;
- default value si disponible ;
- description JSDoc.

### Important

Pour que la doc auto soit belle, il faut écrire des commentaires JSDoc dans les types.

```ts
export type PlayfulButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual style of the button. */
  variant?: PlayfulButtonVariant

  /** Color family used by the button. */
  tone?: PlayfulButtonTone

  /** Button height and padding scale. */
  size?: PlayfulButtonSize
}
```

---

## 22. Registry des composants

Créer un registry manuel pour la navigation, la recherche, les statuts et les catégories.

```ts
// src/lib/docs/registry.ts
export const componentRegistry = [
  {
    name: "Button",
    slug: "button",
    category: "Actions",
    status: "ready",
    tags: ["cta", "action", "motion", "form"],
  },
  {
    name: "IconButton",
    slug: "icon-button",
    category: "Actions",
    status: "planned",
    tags: ["icon", "action", "motion"],
  },
  {
    name: "ColorPicker",
    slug: "color-picker",
    category: "Inputs",
    status: "ready",
    tags: ["color", "input", "palette", "custom"],
  },
] as const
```

Le registry sert à :

- générer la page `/components` ;
- générer la recherche ;
- afficher les statuts ;
- préparer la future CLI.

---

## 23. Routes du site

TanStack Start utilise les routes dans `src/routes`.

```txt
src/routes/
  __root.tsx
  index.tsx
  components/
    index.tsx
    $slug.tsx
```

### `/`

Landing page.

Sections :

1. Hero avec headline et CTA.
2. Mur de boutons interactifs.
3. Search input globale.
4. Palettes playful.
5. Featured components.
6. Pourquoi la lib existe.
7. Roadmap open-source.

### `/components`

Liste des composants.

Fonctions :

- recherche ;
- filtre par catégorie ;
- filtre par statut ;
- preview courte ;
- lien vers detail page.

### `/components/$slug`

Page détail.

Sections :

1. Header du composant.
2. Preview interactive.
3. Variants.
4. Code.
5. Props auto-générées.
6. Accessibility notes.
7. Animation notes.

---

## 24. Landing page V1

### Hero copy

```txt
Playful React components that bounce, pop, wiggle and still behave properly.
```

Sous-texte :

```txt
A colorful open-source component library for React, powered by Motion and built for delightful product interfaces.
```

CTA :

- `Browse components`
- `View on GitHub`
- `Copy install command`

### Hero visuel

Un grand playground avec :

- 4 boutons différents ;
- un color picker ;
- un switch ;
- une card ;
- un petit badge `MIT Open Source` ;
- une mini search input.

### Search globale

Sur la LP :

```tsx
<SearchInput placeholder="Search button, color picker, tabs..." />
```

Quand l’utilisateur tape, afficher une petite liste de résultats statiques.

---

## 25. Page Components

### Layout

```txt
Components
  Search input
  Filters: All / Actions / Inputs / Display / Feedback / Navigation
  Grid
    Card Button
    Card ColorPicker
    Card Badge
    Card Switch
```

### Filtres V1

Catégories :

- Actions
- Inputs
- Display
- Feedback
- Navigation
- Layout

Statuts :

- Ready
- Beta
- Planned

---

## 26. Future CLI, mais pas en V1

Le futur objectif :

```bash
npx playful-components add button
npx playful-components add color-picker
npx playful-components add button color-picker tabs
```

Mais en V1, ne fais pas encore la CLI. Prépare seulement le registry pour que ce soit possible plus tard.

### Préparer la CLI maintenant

Chaque composant doit avoir :

```txt
component.json
```

Exemple futur :

```json
{
  "name": "button",
  "files": [
    "button.tsx",
    "button.types.ts",
    "button.styles.ts"
  ],
  "dependencies": ["motion"],
  "internalDependencies": ["cn"]
}
```

Pas besoin de l’utiliser maintenant, mais ça évite de refaire toute l’architecture plus tard.

---

## 27. Roadmap V1 concrète

### Phase 1 — Foundation

- Créer `tokens.css`.
- Créer `themes.css`.
- Créer `PlayfulMotionProvider`.
- Créer `cn`.
- Créer `useControllableState`.
- Créer `componentRegistry`.
- Brancher le provider dans `__root.tsx`.

### Phase 2 — Premiers composants

- `Button`
- `IconButton`
- `Badge`
- `Card`
- `Input`
- `SearchInput`
- `ColorPicker` V1

Objectif : la LP doit déjà avoir l’air fun avec seulement ces composants.

### Phase 3 — Composants de doc

- `ComponentPreview`
- `PropsTable`
- `ComponentGrid`
- `ComponentStatusBadge`
- `CodeBlock`

### Phase 4 — Page Components

- Search statique.
- Filtres catégorie.
- Cards avec preview.
- Detail page dynamique par slug.

### Phase 5 — Docs auto

- Installer `react-docgen-typescript`.
- Générer `components.docs.json`.
- Afficher les props sur les pages composants.
- Ajouter JSDoc sur les props.

### Phase 6 — Polish V1

- Accessibilité focus/keyboard.
- Reduced motion.
- Responsive LP.
- README.
- License MIT.
- Contribution guide.
- Premier tag GitHub.

---

## 28. Definition of Done V1

La V1 est prête quand :

- la landing page est jolie et montre clairement l’ADN playful ;
- `/components` liste les composants avec recherche et filtres ;
- au moins 7 composants sont utilisables ;
- `Button` et `ColorPicker` sont solides ;
- chaque composant a une preview ;
- chaque composant a une table de props auto-générée ;
- les animations respectent reduced motion ;
- les composants ne dépendent pas de TanStack Query ;
- le repo a un README clair ;
- le projet build sans erreur.

---

## 29. README initial

```md
# Playful Components

Playful, animated React components for delightful product interfaces.

Built with React and Motion. Designed to be colorful, accessible and easy to copy into any React app.

## Install

\`\`\`bash
npm install motion
\`\`\`

## Example

\`\`\`tsx
import { PlayfulButton } from "@playful/components/button"

export function Example() {
  return (
    <PlayfulButton variant="sticker" tone="pink">
      Get started
    </PlayfulButton>
  )
}
\`\`\`

## Goals

- Playful by default
- Accessible interactions
- Motion-powered animations
- Copy-paste friendly components
- Future CLI support

## License

MIT
```

---

## 30. Checklist immédiate

À faire maintenant dans ton projet :

```txt
[ ] Installer motion
[ ] Installer react-docgen-typescript + tsx
[ ] Créer src/styles/tokens.css
[ ] Créer src/styles/themes.css
[ ] Créer PlayfulMotionProvider
[ ] Brancher PlayfulMotionProvider dans __root.tsx
[ ] Créer cn.ts
[ ] Créer useControllableState.ts
[ ] Créer componentRegistry
[ ] Créer Button
[ ] Créer ColorPicker V1
[ ] Créer LP avec hero + button wall + search
[ ] Créer /components
[ ] Créer /components/$slug
[ ] Créer script docs:generate
```

---

## 31. Ordre conseillé de développement

Ne commence pas par le ColorPicker complet. Fais d’abord le système autour.

Ordre recommandé :

1. `PlayfulMotionProvider`
2. tokens CSS
3. `Button`
4. LP hero
5. `Badge`
6. `Card`
7. `SearchInput`
8. `ColorPicker` simple
9. registry
10. `/components`
11. docgen props
12. polish

---

## 32. Nom possible pour la lib

Idées :

- `playful-ui`
- `wiggly-ui`
- `popkit`
- `bouncy-ui`
- `squishy-ui`
- `candy-components`
- `jolly-ui`
- `boop-ui`
- `popcorn-ui`
- `funhouse-ui`

Le meilleur compromis open-source : **Popkit** ou **Playful UI**.

---

## 33. Règle produit finale

Chaque composant doit répondre à cette phrase :

> “Est-ce que ce composant donne envie de cliquer, sans devenir inutilisable en production ?”

Si oui, il rentre dans la lib.

