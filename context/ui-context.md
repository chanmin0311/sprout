# UI Context — Sprout

## Product Summary

Sprout is a calm, minimal habit tracking application focused on daily consistency, streak visualization, and low-friction check-ins.

## Design Philosophy

### Core Principles

1. Calm over stimulation.
2. Clarity over density.
3. Progress over productivity pressure.
4. Consistency over decoration.
5. Reward through subtle feedback.

### Emotional Goals

Users should feel:

- Calm
- Encouraged
- In control
- Motivated
- Proud of steady progress

---

## Theme Overview

### Visual Style

- Minimal and serene
- Nature-inspired
- Premium but approachable
- Spacious and uncluttered

### Light Theme

- Warm ivory backgrounds
- Botanical green accents
- Charcoal text
- Soft borders

### Dark Theme

- Deep forest backgrounds
- Muted sage accents
- Warm gray text
- Low-contrast surfaces

---

## Semantic Color Tokens

| Role                 | CSS Variable           | Light   | Dark    | Usage                 |
| -------------------- | ---------------------- | ------- | ------- | --------------------- |
| Background           | --background           | #FAF8F3 | #111714 | App background        |
| Foreground           | --foreground           | #1F2937 | #F3F4F6 | Primary text          |
| Surface              | --card                 | #FFFFFF | #18201C | Cards and panels      |
| Surface Foreground   | --card-foreground      | #1F2937 | #F3F4F6 | Card text             |
| Muted Surface        | --muted                | #F4F1EA | #1E2823 | Secondary backgrounds |
| Muted Foreground     | --muted-foreground     | #6B7280 | #A1A8A3 | Secondary text        |
| Border               | --border               | #E7E1D8 | #2A342E | Borders               |
| Primary              | --primary              | #5D8A67 | #78A783 | Primary actions       |
| Primary Foreground   | --primary-foreground   | #FFFFFF | #0F1512 | Text on primary       |
| Secondary            | --secondary            | #EAF3EC | #223028 | Secondary actions     |
| Secondary Foreground | --secondary-foreground | #24412D | #DDE7E0 | Text on secondary     |
| Accent               | --accent               | #AFC5B5 | #355040 | Interactive highlight |
| Accent Foreground    | --accent-foreground    | #17301F | #F5F8F6 | Text on accent        |
| Success              | --success              | #4F8A5B | #6EA878 | Completed state       |
| Warning              | --warning              | #D49A3A | #E3B65C | Attention             |
| Destructive          | --destructive          | #D65C5C | #E57A7A | Errors and delete     |
| Ring                 | --ring                 | #5D8A67 | #78A783 | Focus outline         |

---

## Typography System

### Font Families

- Primary: Inter
- Alternative: Geist
- Monospace: JetBrains Mono

### Type Scale

| Role       | Size | Weight | Line Height | Usage              |
| ---------- | ---- | ------ | ----------- | ------------------ |
| Display    | 48px | 700    | 1.1         | Hero headings      |
| H1         | 36px | 700    | 1.2         | Page titles        |
| H2         | 30px | 600    | 1.25        | Section titles     |
| H3         | 24px | 600    | 1.3         | Card titles        |
| H4         | 20px | 600    | 1.4         | Subsections        |
| Body Large | 18px | 400    | 1.7         | Intro text         |
| Body       | 16px | 400    | 1.6         | Default text       |
| Body Small | 14px | 400    | 1.5         | Supporting text    |
| Label      | 14px | 500    | 1.4         | Buttons and inputs |
| Caption    | 12px | 500    | 1.4         | Metadata           |
| Code       | 13px | 400    | 1.5         | Monospace content  |

---

## Spacing Scale

| Token | Value | Usage                  |
| ----- | ----- | ---------------------- |
| xs    | 4px   | Tight spacing          |
| sm    | 8px   | Inline spacing         |
| md    | 12px  | Small groups           |
| lg    | 16px  | Standard spacing       |
| xl    | 24px  | Section padding        |
| 2xl   | 32px  | Large groups           |
| 3xl   | 48px  | Section gaps           |
| 4xl   | 64px  | Major vertical spacing |

---

## Radius Scale

| Token | Value  | Usage            |
| ----- | ------ | ---------------- |
| sm    | 6px    | Inputs           |
| md    | 10px   | Buttons          |
| lg    | 16px   | Cards            |
| xl    | 24px   | Dialogs          |
| full  | 9999px | Pills and badges |

---

## Shadow System

| Token | Usage              |
| ----- | ------------------ |
| sm    | Subtle hover       |
| md    | Default cards      |
| lg    | Dialogs            |
| xl    | Prominent overlays |

Guideline: Shadows must remain soft and low contrast.

---

## Component Rules

### Buttons

Variants:

- Primary
- Secondary
- Ghost
- Outline
- Destructive

States:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading

### Cards

- Primary surface for habit information
- Large radius
- Generous padding
- Optional subtle elevation

### Inputs

- Clear labels
- Support helper and error text
- High contrast focus state

### Badges

- Used for streaks, status, and frequency
- Compact and rounded

### Dialogs

- Used for create/edit flows
- Single primary action
- Optional destructive secondary action

### Skeleton Loaders

- Preserve layout dimensions
- Use muted surfaces

---

## Layout Patterns

### Container Widths

- Narrow: 640px
- Default: 960px
- Wide: 1200px

### Dashboard Layout

- Header with greeting and actions
- Summary cards
- Habit list
- Calendar section

### Mobile Layout

- Single column
- Sticky action button
- Bottom-safe spacing

---

## Interaction Principles

### Motion

- Duration: 150–250ms
- Ease-out timing
- Subtle scale and opacity changes only

### Feedback

- Completed state uses gentle color transition
- Success animations should be understated

### Focus

- Visible ring on all keyboard-focusable elements

---

## Accessibility Constraints

- Minimum text contrast: WCAG AA
- Keyboard accessible for all interactions
- Minimum touch target: 44×44px
- Labels required for all controls
- Focus indicators must never be removed

---

## Domain-Specific UI Rules

### Habit Status Colors

- Not Started → Muted
- In Progress → Accent
- Completed → Success

### Streak Display

- Flame icon plus numeric value
- Highlight only when streak > 0

### Frequency Labels

- Daily
- Weekly N Times

### Calendar Cells

- Empty
- Partial
- Completed
- Today highlighted

### Weekly Progress

- Show current count versus target
- Example: 2 / 3 this week

### Empty State Messaging

- Encouraging and non-judgmental
- Emphasize starting small

---

## Iconography

Icon Set: Lucide

Standard Sizes:

- 16px inline
- 20px controls
- 24px key actions

Common Icons:

- Sprout
- Flame
- Calendar
- Check
- Plus
- Edit
- Trash
- Settings

---

## Tailwind + shadcn/ui Integration Guidelines

- Use semantic CSS variables only.
- Never hardcode hex values in components.
- Extend existing shadcn/ui components.
- Preserve variant patterns.
- Support light and dark themes.

---

## Implementation Constraints

### Rules for AI Coding Agents

1. Always use semantic tokens.
2. Reuse existing components.
3. Avoid duplicate UI patterns.
4. Preserve accessibility.
5. Prefer composition over customization.
6. Keep interactions subtle.
7. Maintain calm visual hierarchy.

---

## Design QA Checklist

- All colors use semantic tokens.
- Typography matches defined roles.
- Spacing follows scale.
- Radius is consistent.
- Focus states are visible.
- Mobile layout is usable.
- Empty states are supportive.
- Completed states feel rewarding but understated.
