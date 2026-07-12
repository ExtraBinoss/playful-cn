# Agent instructions

Before adding or declaring a component complete, consult
[`docs/COMPONENT-COVERAGE.md`](docs/COMPONENT-COVERAGE.md).

- The four canonical visual variations are `sticker`, `bubble`, `glow`, and
  `sketch`.
- The canonical variations needs to live inside their subfolders (buttons/sticker/, buttons/bubble/, etc).
- Mark a component **4/4** only when all four variations exist, are exported,
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

The target is functional parity with the current shadcn component behavior,
while preserving this library's playful visual language and motion system.
