# OrdeX Design System

## 1. Purpose

The OrdeX Design System is the single visual contract for the OrdeX Stock Manager application.

Every developer working on the application should follow this document so that all screens and components feel like one consistent product.

The UI should feel:

- Professional
- Clean
- Minimal
- Modern
- Dense but readable
- Consistent
- Enterprise-ready
- Easy to scan
- Functional rather than decorative

Avoid:

- Excessive rounded corners
- Excessive shadows
- Gradients unless explicitly requested
- Random colors
- Random font sizes
- Random spacing
- Excessive animations
- Large decorative elements
- Inconsistent component styles
- Different styles for the same UI pattern

---

# 2. Brand Colors

Use the following colors throughout the application.

```css
:root {
  /* ========================================
     BRAND
     ======================================== */

  --color-brand: #f97316;
  --color-brand-hover: #ea580c;
  --color-brand-active: #c2410c;
  --color-brand-soft: #fff7ed;
  --color-brand-border: #fed7aa;


  /* ========================================
     BACKGROUND
     ======================================== */

  --color-background: #ffffff;
  --color-background-subtle: #f8fafc;
  --color-background-muted: #f1f5f9;


  /* ========================================
     TEXT
     ======================================== */

  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-text-subtle: #94a3b8;
  --color-text-disabled: #cbd5e1;


  /* ========================================
     BORDERS
     ======================================== */

  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  --color-border-strong: #cbd5e1;


  /* ========================================
     SIDEBAR
     ======================================== */

  --color-sidebar: #191919;
  --color-sidebar-hover: rgba(255, 255, 255, 0.06);
  --color-sidebar-border: rgba(255, 255, 255, 0.06);
  --color-sidebar-text: #cbd5e1;
  --color-sidebar-text-active: #0f172a;


  /* ========================================
     STATUS
     ======================================== */

  --color-success: #16a34a;
  --color-success-soft: #f0fdf4;

  --color-warning: #d97706;
  --color-warning-soft: #fffbeb;

  --color-danger: #dc2626;
  --color-danger-soft: #fef2f2;

  --color-info: #2563eb;
  --color-info-soft: #eff6ff;
}
```

---

# 3. Typography

Use one font throughout the application.

Recommended font:

**Inter**

```css
:root {
  --font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}
```

## Typography Scale

```css
:root {
  --text-page-title: 22px;
  --text-section-title: 16px;
  --text-body: 14px;
  --text-body-small: 13px;
  --text-label: 12px;
  --text-caption: 11px;
}
```

### Standard usage

| Element | Size | Weight |
|---|---:|---:|
| Page title | 22px | 600 |
| Section title | 16px | 600 |
| Body | 14px | 400 |
| Small text | 13px | 400 |
| Label | 12px | 500 |
| Caption | 11px | 400 |

Do not introduce random typography values such as 17px, 19px, 21px, 23px, etc. unless there is a specific design reason.

---

# 4. Spacing System

Use a 4px-based spacing system.

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

### Preferred usage

| Spacing | Typical use |
|---:|---|
| 4px | Tiny internal spacing |
| 8px | Icon/text spacing |
| 12px | Compact component spacing |
| 16px | Normal component spacing |
| 20px | Medium spacing |
| 24px | Section spacing |
| 28px | Page spacing |
| 32px | Major section spacing |
| 40px | Large spacing |
| 48px | Large section spacing |
| 64px | Structural spacing |

---

# 5. Border Radius

Keep the application relatively sharp and professional.

```css
:root {
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-full: 9999px;
}
```

### Standard usage

| Component | Radius |
|---|---:|
| Buttons | 8px |
| Inputs | 8px |
| Selects | 8px |
| Cards | 10px |
| Dialogs | 12px |
| Badges | Full |
| Avatars | Full |

Avoid making everything `rounded-2xl`.

---

# 6. Shadows

Keep shadows subtle.

```css
:root {
  --shadow-sm:
    0 1px 2px rgba(15, 23, 42, 0.05);

  --shadow-md:
    0 4px 12px rgba(15, 23, 42, 0.08);

  --shadow-lg:
    0 12px 32px rgba(15, 23, 42, 0.12);
}
```

Most components should use no shadow or `shadow-sm`.

Dialogs and popovers may use `shadow-lg`.

Avoid heavy shadows.

---

# 7. Layout

## Application structure

The application uses:

```text
Sidebar
├── Open: 252px
└── Collapsed: 64px

Navbar
└── Height: 76px

Main Content
└── Width: 100%
```

```css
:root {
  --sidebar-open-width: 252px;
  --sidebar-collapsed-width: 64px;
  --navbar-height: 76px;

  --page-padding-desktop: 28px;
  --page-padding-tablet: 24px;
  --page-padding-mobile: 16px;
}
```

### Page padding

- Desktop: 28px
- Tablet: 24px
- Mobile: 16px

The main content should automatically resize when the sidebar opens or collapses.

Do not use fixed page widths that fight the sidebar layout.

---

# 8. Buttons

## Primary Button

```text
Background: #f97316
Text: white
Height: 40px
Radius: 8px
Font: 14px / 600
```

Tailwind example:

```tsx
className="
  h-10
  rounded-lg
  border
  border-orange-600
  bg-orange-600
  px-4
  text-sm
  font-semibold
  text-white
  shadow-sm
  transition-colors
  hover:border-orange-700
  hover:bg-orange-700
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-orange-500/30
  focus-visible:ring-offset-2
"
```

## Secondary Button

```tsx
className="
  h-10
  rounded-lg
  border
  border-slate-200
  bg-white
  px-4
  text-sm
  font-medium
  text-slate-700
  transition-colors
  hover:bg-slate-50
  hover:text-slate-900
"
```

## Danger Button

```tsx
className="
  h-10
  rounded-lg
  border
  border-red-600
  bg-red-600
  px-4
  text-sm
  font-semibold
  text-white
  transition-colors
  hover:bg-red-700
"
```

---

# 9. Inputs

All inputs must follow the same structure.

```text
Height: 40px
Radius: 8px
Border: slate-200
Font: 14px
```

```tsx
className="
  h-10
  w-full
  rounded-lg
  border
  border-slate-200
  bg-white
  px-3
  text-sm
  text-slate-900
  outline-none
  transition-colors
  placeholder:text-slate-400
  focus:border-orange-500
  focus:ring-2
  focus:ring-orange-500/10
"
```

---

# 10. Labels

```tsx
className="
  mb-1.5
  block
  text-xs
  font-medium
  text-slate-700
"
```

Required fields should use the same visual language:

```text
Name *
Category *
Supplier *
```

Do not create different label styles between pages.

---

# 11. Selects

Selects should use the same dimensions as inputs.

```tsx
className="
  h-10
  w-full
  rounded-lg
  border
  border-slate-200
  bg-white
  px-3
  text-sm
  text-slate-900
  transition-colors
  hover:border-slate-300
  focus:border-orange-500
  focus:ring-2
  focus:ring-orange-500/10
"
```

---

# 12. Cards

Default card:

```tsx
className="
  rounded-xl
  border
  border-slate-200
  bg-white
"
```

Elevated card:

```tsx
className="
  rounded-xl
  border
  border-slate-200
  bg-white
  shadow-sm
"
```

Do not automatically add shadows to every card.

---

# 13. Tables

Tables are one of the most important components of OrdeX.

## Header

```text
Background: #f8fafc
Text: #64748b
Font: 12px / 600
```

Example:

```tsx
<thead className="bg-slate-50">
  <tr>
    <th
      className="
        px-5
        py-3
        text-left
        text-xs
        font-semibold
        text-slate-500
      "
    >
      Name
    </th>
  </tr>
</thead>
```

## Body

```tsx
<tbody className="divide-y divide-slate-100">
```

## Row

```tsx
className="
  transition-colors
  hover:bg-slate-50/70
"
```

### Table rules

- Rows should generally be around 56px high.
- Keep borders subtle.
- Keep text readable.
- Align numeric values consistently.
- Keep action buttons compact.
- Tables should scroll horizontally on small screens instead of breaking the layout.

---

# 14. Status Badges

## In Stock

```tsx
className="
  inline-flex
  items-center
  rounded-full
  bg-green-50
  px-2.5
  py-1
  text-xs
  font-medium
  text-green-700
"
```

## Low Stock

```tsx
className="
  inline-flex
  items-center
  rounded-full
  bg-amber-50
  px-2.5
  py-1
  text-xs
  font-medium
  text-amber-700
"
```

## Out Of Stock

```tsx
className="
  inline-flex
  items-center
  rounded-full
  bg-red-50
  px-2.5
  py-1
  text-xs
  font-medium
  text-red-700
"
```

## Expired

```tsx
className="
  inline-flex
  items-center
  rounded-full
  bg-red-50
  px-2.5
  py-1
  text-xs
  font-medium
  text-red-700
"
```

---

# 15. Icons

Use only:

```text
lucide-react
```

Default:

```tsx
className="h-[18px] w-[18px]"
strokeWidth={1.8}
```

Small:

```tsx
className="h-4 w-4"
```

Large:

```tsx
className="h-5 w-5"
```

Do not mix multiple icon libraries in the same application.

---

# 16. Sidebar

The OrdeX sidebar:

```text
Open width:      252px
Collapsed width: 64px
Background:      #191919
Transition:      200ms ease-out
```

Navigation items:

```text
Height: 40px
Radius: 6px
```

Active item:

```text
Background: white
Text: #0f172a
```

Inactive item:

```text
Text: #cbd5e1
```

Hover:

```text
rgba(255,255,255,0.06)
```

### User profile behavior

The user profile area must remain structurally fixed at the bottom.

When collapsed:

```text
MA
```

When expanded:

```text
MA   Msaq Amine
     Administrator
```

The avatar must stay in the same vertical position when opening/closing the sidebar.

Only the user information should expand beside the avatar.

Do not allow the profile section to jump vertically when the sidebar width changes.

---

# 17. Navbar

Navbar:

```text
Height: 76px
Background: white
Border bottom: #e2e8f0
```

Example:

```tsx
<header
  className="
    sticky
    top-0
    z-30
    h-[76px]
    border-b
    border-slate-200
    bg-white
  "
>
```

---

# 18. Dialogs

Recommended widths:

```text
Small: 400px
Medium: 520px
Large: 720px
```

Dialog radius:

```text
12px
```

Dialog title:

```text
16px / 600
```

Dialog description:

```text
13px / 400
```

Dialog footer:

```text
display: flex
justify-content: flex-end
gap: 8px
```

---

# 19. Animation

OrdeX should feel smooth without excessive animation.

Normal interactions:

```text
150ms
```

Structural transitions:

```text
200ms
```

Preferred easing:

```text
ease-out
```

Use animation for:

- Hover states
- Sidebar width
- Dialog appearance
- Dropdown appearance
- Small state transitions

Avoid:

- Bounce
- Elastic effects
- Large transforms
- Long animations
- Animations that cause layout jumps

Never animate an element in a way that makes the layout jump.

---

# 20. Responsive Behavior

## Desktop

```text
>= 1024px
```

- Sidebar visible
- Navbar full width
- Tables use available width
- Full desktop spacing

## Tablet

```text
768px - 1023px
```

- Reduce page padding
- Allow horizontal table scrolling
- Preserve readable controls

## Mobile

```text
< 768px
```

- Sidebar becomes mobile navigation
- Filters stack
- Buttons may become full width
- Tables may scroll horizontally
- Dialogs use almost the full screen width
- Reduce page padding to 16px

---

# 21. Global Design System CSS

Create:

```text
src/styles/design-system.css
```

Use:

```css
:root {
  /* Brand */
  --color-brand: #f97316;
  --color-brand-hover: #ea580c;
  --color-brand-active: #c2410c;
  --color-brand-soft: #fff7ed;
  --color-brand-border: #fed7aa;

  /* Background */
  --color-background: #ffffff;
  --color-background-subtle: #f8fafc;
  --color-background-muted: #f1f5f9;

  /* Text */
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-text-subtle: #94a3b8;
  --color-text-disabled: #cbd5e1;

  /* Borders */
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  --color-border-strong: #cbd5e1;

  /* Sidebar */
  --color-sidebar: #191919;
  --color-sidebar-hover: rgba(255, 255, 255, 0.06);
  --color-sidebar-border: rgba(255, 255, 255, 0.06);
  --color-sidebar-text: #cbd5e1;

  /* Status */
  --color-success: #16a34a;
  --color-success-soft: #f0fdf4;

  --color-warning: #d97706;
  --color-warning-soft: #fffbeb;

  --color-danger: #dc2626;
  --color-danger-soft: #fef2f2;

  --color-info: #2563eb;
  --color-info-soft: #eff6ff;

  /* Typography */
  --font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  --text-page-title: 22px;
  --text-section-title: 16px;
  --text-body: 14px;
  --text-body-small: 13px;
  --text-label: 12px;
  --text-caption: 11px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm:
    0 1px 2px rgba(15, 23, 42, 0.05);

  --shadow-md:
    0 4px 12px rgba(15, 23, 42, 0.08);

  --shadow-lg:
    0 12px 32px rgba(15, 23, 42, 0.12);

  /* Layout */
  --sidebar-open-width: 252px;
  --sidebar-collapsed-width: 64px;
  --navbar-height: 76px;

  --page-padding-desktop: 28px;
  --page-padding-tablet: 24px;
  --page-padding-mobile: 16px;
}
```

Import it globally:

```tsx
import "./styles/design-system.css";
```

---

# 22. Most Important Team Rule

> **Do not create a new visual style when an existing design-system pattern can be reused.**

If a primary button already exists, do not create another button with a different color.

If an input style already exists, do not create another input with a different height.

If a table style already exists, reuse it.

The same applies to:

- Inputs
- Selects
- Buttons
- Tables
- Badges
- Dialogs
- Cards
- Navigation
- Typography
- Spacing
- Icons
- Colors
- Status indicators

The goal is for the entire application to look like one product rather than several developers' different designs.

---

# 23. Developer Rules

Every developer should follow these rules:

1. Preserve existing functionality.
2. Do not change API logic unless explicitly requested.
3. Do not change backend behavior when working on frontend styling.
4. Do not change component architecture unless necessary.
5. Do not introduce random colors.
6. Do not introduce random font sizes.
7. Do not introduce random spacing.
8. Do not introduce excessive rounded corners.
9. Do not introduce gradients unless explicitly requested.
10. Do not introduce excessive shadows.
11. Reuse existing UI components whenever possible.
12. Keep responsive behavior professional.
13. Keep spacing consistent with the design system.
14. Keep typography consistent.
15. Use Lucide icons consistently.
16. Preserve existing page functionality while redesigning.
17. Avoid layout jumps.
18. Avoid unnecessary animations.
19. When modifying an existing component, prefer updating its styles instead of rebuilding its architecture.
20. When a component already follows the design system, do not restyle it unnecessarily.

---

# 24. Prompt for ChatGPT / AI Development

Use the following prompt whenever asking an AI to create or modify OrdeX UI.

```text
ORDEX DESIGN SYSTEM PROMPT

You are working on the OrdeX Stock Manager application.

You MUST follow the OrdeX Design System provided in this document.

Do not invent a new visual style.

The application style must remain:

- Professional
- Clean
- Minimal
- Modern
- Enterprise-ready
- Functional
- Consistent
- Dense but readable

DESIGN RULES:

Brand:
- Orange: #f97316
- Hover orange: #ea580c
- Active orange: #c2410c

Sidebar:
- Background: #191919
- Open width: 252px
- Collapsed width: 64px
- Transition: 200ms ease-out

Navbar:
- Height: 76px
- White background
- Bottom border #e2e8f0

Background:
- Main: #ffffff
- Subtle: #f8fafc
- Muted: #f1f5f9

Text:
- Primary: #0f172a
- Secondary: #475569
- Muted: #64748b
- Subtle: #94a3b8

Borders:
- Normal: #e2e8f0
- Light: #f1f5f9
- Strong: #cbd5e1

Typography:
- Use Inter/system-ui
- Page title: 22px / 600
- Section title: 16px / 600
- Body: 14px
- Small: 13px
- Label: 12px / 500
- Caption: 11px

Spacing:
Use a 4px spacing system:
4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64px.

Radius:
- Small: 6px
- Default: 8px
- Card: 10px
- Dialog: 12px
- Badge/avatar: full

Buttons:
- Height: 40px
- Radius: 8px
- Primary: orange #f97316
- Secondary: white with slate border
- Danger: red

Inputs:
- Height: 40px
- Radius: 8px
- Border: #e2e8f0
- Focus: orange
- Font: 14px

Tables:
- Header background: #f8fafc
- Header text: #64748b
- Header font: 12px / 600
- Rows approximately 56px
- Border: #f1f5f9
- Hover: subtle #f8fafc

Icons:
- Use lucide-react
- Default size: 18px
- Stroke width: 1.8

Animations:
- 150ms for normal interactions
- 200ms for structural transitions
- ease-out
- Never make the layout jump

IMPORTANT:

1. Preserve existing functionality.
2. Do not change API logic unless explicitly requested.
3. Do not change backend behavior.
4. Do not change component architecture unless necessary.
5. Do not introduce random colors.
6. Do not introduce random typography.
7. Do not introduce random spacing.
8. Do not introduce excessive rounded corners.
9. Do not introduce gradients unless explicitly requested.
10. Do not use excessive shadows.
11. Reuse existing UI components whenever possible.
12. Keep responsive behavior professional.
13. Keep the UI visually consistent with the existing OrdeX dashboard.
14. If I give you an existing component, update its styling rather than rebuilding the entire architecture.
15. Preserve existing functionality.
16. Avoid layout jumps.
17. When updating a component, give me the COMPLETE updated file unless I specifically ask for only a section.

MY REQUEST:

[PASTE REQUEST HERE]

MY CURRENT CODE:

[PASTE CODE HERE]
```

---

# 25. Short Everyday Prompt

For quick requests, this shorter version is sufficient:

```text
Use the OrdeX Design System for this entire task.

Keep the existing OrdeX visual language:
#191919 sidebar, #f97316 orange accent, white/slate content,
Inter/system-ui typography, 4px spacing system, 8px default radius,
subtle borders, minimal shadows, 40px controls, Lucide icons,
professional enterprise dashboard style.

Do not invent new colors, typography, spacing, radius, shadows,
or component styles.

Preserve all existing functionality and architecture.

Keep the design consistent across the entire application.

When updating a component, give me the COMPLETE updated file.

My request:
[YOUR REQUEST]

My current code:
[YOUR CODE]
```

---

# 26. Design System Checklist

Before submitting a UI change, verify:

- [ ] Correct OrdeX orange
- [ ] Correct sidebar color
- [ ] Correct typography
- [ ] Correct spacing
- [ ] Correct border radius
- [ ] Correct input height
- [ ] Correct button height
- [ ] Correct table styling
- [ ] Correct status colors
- [ ] Lucide icons only
- [ ] No unnecessary shadows
- [ ] No unnecessary gradients
- [ ] No random colors
- [ ] No random font sizes
- [ ] Responsive behavior works
- [ ] No layout jump
- [ ] Existing functionality preserved
- [ ] Existing components reused where possible
- [ ] Design matches the rest of OrdeX

---

## Final Principle

**OrdeX should look designed by one team, not assembled by several developers.**

Consistency is more important than adding visual complexity.
