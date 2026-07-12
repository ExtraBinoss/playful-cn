# Component coverage checklist

Working inventory for functional parity with shadcn. A component needs both a
behavioral/API primitive and the four canonical visual variations below.

## Canonical variations

| Slug | Direction |
| --- | --- |
| `sticker` | chunky surface, offset shadow, candy accents |
| `bubble` | rounded glossy/pill surface with pressure feedback |
| `sketch` | hand-drawn outline with bold offset shadow |

`4/4` means all four skins share the same public API and behavior. Extra skins
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
- [~] **Card, Badge, Tabs, Tooltip, Toast**: base behavior exists, but the four
  canonical skins and/or parity audit are incomplete.
- [~] **Extensions**: IconButton, SearchInput, and ColorPicker exist but are
  outside the shadcn list and are not yet 4/4.

Legend: `[x]` complete; `[~]` implementation exists but needs 4/4/parity;
`[ ]` not implemented.

## New components

- [ ] Attachment
- [ ] Bubble
- [ ] Marker
- [ ] Message
- [ ] Message Scroller

## All components

- [ ] Accordion
- [ ] Alert
- [ ] Alert Dialog
- [ ] Aspect Ratio
- [ ] Attachment
- [ ] Avatar
- [~] Badge
- [ ] Breadcrumb
- [ ] Bubble
- [x] Button — 4/4
- [ ] Button Group
- [ ] Calendar
- [~] Card
- [ ] Carousel
- [ ] Chart
- [x] Checkbox — 4/4
- [ ] Collapsible
- [ ] Combobox
- [ ] Command
- [ ] Context Menu
- [ ] Data Table
- [ ] Date Picker
- [ ] Dialog
- [ ] Direction
- [ ] Drawer
- [ ] Dropdown Menu
- [ ] Empty
- [x] Field
- [ ] Hover Card
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
- [ ] Navigation Menu
- [ ] Pagination
- [ ] Popover
- [ ] Progress
- [x] Radio Group — 4/4
- [ ] Resizable
- [ ] Scroll Area
- [ ] Select
- [ ] Separator
- [ ] Sheet
- [ ] Sidebar
- [ ] Skeleton
- [ ] Slider
- [ ] Sonner
- [ ] Spinner
- [x] Switch — 4/4
- [ ] Table
- [~] Tabs
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
- [ ] Export and register all four variations.
- [ ] Document/demo every variation with representative props.
- [ ] Add interaction/type tests; `npm run check` and `npm run build` pass.
- [ ] Change this entry to `[x]` only after every item above is true.

## Recommended focus order

1. Checkbox, Switch, Radio Group.
2. Label, Field, Textarea, Input Group, Input OTP.
3. Card, Badge, Alert, Empty, Skeleton, Spinner, Progress.
4. Dialog, Alert Dialog, Drawer, Sheet, Popover, Hover Card, menus.
5. Tabs, Accordion, Collapsible, Carousel, Calendar, Date Picker, navigation/data.
6. Attachment, Bubble, Marker, Message, Message Scroller.
