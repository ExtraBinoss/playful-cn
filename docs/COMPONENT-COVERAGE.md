# Component coverage checklist

Working inventory for functional parity with shadcn. A component needs both a
behavioral/API primitive and the four canonical visual variations below.

## Canonical variations

| Slug | Direction |
| --- | --- |
| `sticker` | chunky surface, offset shadow, candy accents |
| `bubble` | rounded glossy/pill surface with pressure feedback |
| `glow` | energetic gradient and glow treatment |
| `sketch` | hand-drawn outline with bold offset shadow |

`4/4` means all four skins share the same public API and behavior. Extra skins
such as `soft-candy` do not replace a canonical skin.

## Current snapshot (2026-07-12)

- [x] **Button — 4/4**: sticker-pop, bubble-gum, neon-gradient,
  sketch-outline (plus soft-candy and quiet-ghost).
- [x] **Input — 4/4**: sticker-field, bubble-field, glow-field,
  sketch-field (plus candy-field).
- [~] **Checkbox, Card, Badge, Switch, Tabs, Tooltip, Toast**: base behavior
  exists, but the four canonical skins and/or parity audit are incomplete.
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
- [~] Checkbox
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
- [ ] Field
- [ ] Hover Card
- [x] Input — 4/4
- [ ] Input Group
- [ ] Input OTP
- [ ] Item
- [ ] Kbd
- [ ] Label
- [ ] Marker
- [ ] Menubar
- [ ] Message
- [ ] Message Scroller
- [ ] Native Select
- [ ] Navigation Menu
- [ ] Pagination
- [ ] Popover
- [ ] Progress
- [ ] Radio Group
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
- [~] Switch
- [ ] Table
- [~] Tabs
- [ ] Textarea
- [~] Toast
- [ ] Toggle
- [ ] Toggle Group
- [~] Tooltip
- [ ] Typography

## Definition of done

- [ ] Match shadcn reference semantics, keyboard/focus behavior, ARIA,
  disabled/loading/error states, and controlled/uncontrolled usage.
- [ ] Implement sticker, bubble, glow, and sketch on the shared primitive.
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
