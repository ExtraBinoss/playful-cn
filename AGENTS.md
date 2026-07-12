# Agent instructions

Before adding or declaring a component complete, consult
[`docs/COMPONENT-COVERAGE.md`](docs/COMPONENT-COVERAGE.md).

- The three canonical visual variations are `sticker`, `bubble` and
  `sketch`.
- The canonical variations needs to live inside their subfolders (buttons/sticker/, buttons/bubble/, etc).
- Mark a component **3/3** only when all three variations exist, are exported,
  documented, registered, and share the same behavior/API.
- Keep shadcn-compatible semantics: keyboard interaction, focus management,
  ARIA, disabled/loading/error states, controlled/uncontrolled behavior, and
  composition patterns.
- Prefer one shared behavioral primitive/base; variation files should select
  styles, tokens, and motion presets rather than fork behavior.
- Keep family ownership explicit: every component, sub-variation, primitive,
  type, demo, and helper related to a family must live under that family's
  directory (`buttons/`, `inputs/`, etc.). For example, `IconButton` belongs
  in `buttons/` and `SearchInput` belongs in `inputs/`; do not create parallel
  top-level `button/`, `input/`, or sibling family folders.
- Update the checklist and component docs in the same change.
- Every component family must be visible in the component wall with every
  canonical variation as a linked preview card. A variation is not complete
  until it is exported, registered in `src/lib/docs/registry.ts`, rendered by
  `src/components/docs/variation-preview.tsx`, and appears in the collection
  filters on `/components`.

The target is functional parity with the current shadcn component behavior,
while preserving this library's playful visual language and motion system.
