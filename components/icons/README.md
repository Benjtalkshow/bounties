# Design-system icons

React components generated from the Boundless Figma icon library
(Iconography page: Documentation - Linear / Bold Icons). These are the
source of truth for icons in product UI; prefer them over lucide-react,
which remains only in marketing/discover/auth surfaces that predate this
system.

Every icon exists in two styles, mirroring the library:

- **Linear** (default): `svg/linear/<name>.svg` -> `<Name>Icon`
- **Bold** (filled, for active/emphasis states): `svg/bold/<name>.svg` ->
  `<Name>BoldIcon`

## Adding or updating an icon

1. In Figma, select the `icon / <name>` component on the Linear or Bold
   sheet and export it as SVG (a raw sheet export with the backdrop is
   fine; the generator strips it).
2. Save it as `svg/linear/<name>.svg` and/or `svg/bold/<name>.svg`
   (kebab-case; the file name becomes the component name, e.g.
   `chat-alt.svg` -> `ChatAltIcon` / `ChatAltBoldIcon`).
3. Run `npm run icons`.

The generator extracts the icon group, drops backdrop rectangles,
normalizes all paints to `currentColor`, regenerates the `index.ts`
barrel, and formats/lints the output. Generated `.tsx` files are never
edited by hand.

## Usage

Identical ergonomics to lucide: color comes from `currentColor`, size
from Tailwind classes.

```tsx
import { BellIcon, BellBoldIcon } from '@/components/icons';

<BellIcon className='size-5 text-white/80' aria-hidden />;
// Bold style for active/selected states:
<BellBoldIcon className='size-5 text-primary-500' aria-hidden />;
```

## Coverage

The full library (~410 icons per style: 409 linear, 410 bold) is
vendored; see svg/linear and svg/bold. The only exclusion is the icon
named "3d", whose name cannot form a valid JavaScript identifier.

All app-shell surfaces (navbar, profile menu, mobile drawer,
notifications, credits, messages, wallet chip) use them exclusively.
The only intentional lucide holdout in those surfaces is `UserRound`
(the Explorer placeholder avatar glyph, which has no library
equivalent). Marketing, discover, auth, and onboarding still use lucide
and can migrate the same way as icons are needed.
