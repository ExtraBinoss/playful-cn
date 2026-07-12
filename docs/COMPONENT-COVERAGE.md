# Component coverage checklist

Working inventory for functional parity with shadcn. A component needs both a
behavioral/API primitive and the three canonical visual variations below.

## Canonical variations

| Slug | Direction |
| --- | --- |
| `sticker` | chunky surface, offset shadow, candy accents |
| `bubble` | rounded glossy/pill surface with pressure feedback |
| `sketch` | hand-drawn outline with bold offset shadow |

`3/3` means all three skins share the same public API and behavior. Extra skins
such as `soft-candy` do not replace a canonical skin.

## Current snapshot (2026-07-12)

- [x] **Button — 3/3**: sticker-pop, bubble-gum, sketch-outline (plus
  soft-candy and quiet-ghost).
- [x] **Input — 3/3**: sticker-field, bubble-field, sketch-field (plus
  candy-field).
- [x] **Checkbox, Radio Group, Switch**: 4/4 canonical skins with shared
  behavior, keyboard support, loading/error states, and docs registration.
- [x] **Textarea, Input Group, Input OTP**: 3/3 canonical skins with shared
  APIs, character limits, counters, and docs registration.
- [x] **Label, Field**: shared accessible form composition primitives.
- [x] **Card, Badge, Alert, Empty, Skeleton, Spinner, Progress**: 3/3 canonical
  skins, shared primitives, pure SVG defaults, motion, and docs registration.
- [x] **Dialog, Alert Dialog, Drawer, Sheet, Popover, Hover Card, Menus**: 3/3
  canonical skins with shared overlay behavior, keyboard dismissal, and docs registration.
- [~] **Extensions**: IconButton, SearchInput, and ColorPicker exist but are
  outside the shadcn list and are not yet 3/3.

Legend: `[x]` complete; `[~]` implementation exists but needs 3/3/parity;
`[ ]` not implemented.

## New components

- [ ] Attachment
- [ ] Bubble
- [ ] Marker
- [ ] Message
- [ ] Message Scroller

## All components

- [x] Accordion — 3/3
- [x] Alert — 3/3
- [x] Alert Dialog — 3/3
- [ ] Aspect Ratio
- [ ] Attachment
- [ ] Avatar
- [x] Badge — 3/3
- [x] Breadcrumb — 3/3
- [ ] Bubble
- [x] Button — 4/4
- [ ] Button Group
- [x] Calendar — 3/3
- [x] Card — 3/3
- [x] Carousel — 3/3
- [ ] Chart
- [x] Checkbox — 4/4
- [x] Collapsible — 3/3
- [ ] Combobox
- [ ] Command
- [ ] Context Menu
- [x] Data Table — 3/3
- [x] Date Picker — 3/3
- [x] Dialog — 3/3
- [ ] Direction
- [x] Drawer — 3/3
- [x] Dropdown Menu — 3/3
- [x] Empty — 3/3
- [x] Field
- [x] Hover Card — 3/3
- [x] Input — 4/4
- [x] Input Group — 3/3
- [x] Input OTP — 3/3
- [ ] Item
- [ ] Kbd
- [x] Label
- [ ] Marker
- [ ] Menubar
- [ ] Message
- [ ] Message Scroller
- [ ] Native Select
- [x] Navigation Menu — 3/3
- [x] Pagination — 3/3
- [x] Popover — 3/3
- [x] Progress — 3/3
- [x] Radio Group — 4/4
- [ ] Resizable
- [ ] Scroll Area
- [ ] Select
- [ ] Separator
- [x] Sheet — 3/3
- [ ] Sidebar
- [x] Skeleton — 3/3
- [ ] Slider
- [ ] Sonner
- [x] Spinner — 3/3
- [x] Switch — 4/4
- [x] Table — 3/3
- [x] Tabs — 3/3
- [x] Textarea — 3/3
- [~] Toast
- [ ] Toggle
- [ ] Toggle Group
- [~] Tooltip
- [ ] Typography

## Definition of done

- [ ] Match shadcn reference semantics, keyboard/focus behavior, ARIA,
  disabled/loading/error states, and controlled/uncontrolled usage.
- [ ] Implement sticker, bubble, and sketch on the shared primitive.
- [ ] Export and register all three variations.
- [ ] Document/demo every variation with representative props.
- [ ] Add interaction/type tests; `npm run check` and `npm run build` pass.
- [ ] Change this entry to `[x]` only after every item above is true.

## Recommended focus order

4. Dialog, Alert Dialog, Drawer, Sheet, Popover, Hover Card, menus.
5. Tabs, Accordion, Collapsible, Carousel, Calendar, Date Picker, navigation/data.
6. Attachment, Bubble, Marker, Message, Message Scroller.
