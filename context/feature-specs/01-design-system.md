# UI Implementation Prompt

You are a senior product designer, design systems architect, and frontend engineer.

Your task is to design and implement the complete user interface for this project by using the existing `ui-context.md` document as the single source of truth.

---

## Required Context

Before starting, read `context/AGENTS.md`
This documents define:

---

## Objective

Create a production-quality UI that fully implements the design system and visual language defined in `context/ui-context.md`.

The resulting interface should:

- Match the calm, minimal aesthetic inspired by My Calm Site
- Use the existing Tailwind CSS + shadcn/ui design system
- Be fully responsive
- Support light and dark themes
- Be accessible
- Be modular and maintainable
- Be ready for immediate production use

---

## Design Goals

The UI should feel:

- Calm
- Minimal
- Premium
- Encouraging
- Focused
- Emotionally supportive

Key visual characteristics:

- Warm ivory backgrounds
- Botanical green accents
- Soft rounded corners
- Generous whitespace
- Gentle shadows
- Clear typography
- Subtle animations

---

## Technical Constraints

You must follow these rules:

1. Use only semantic tokens defined in `ui-context.md`.
2. Never hardcode colors, spacing, radius, or typography values.
3. Use shadcn/ui components as the foundation.
4. Extend components through composition rather than duplication.
5. Maintain strict TypeScript compatibility.
6. Preserve WCAG AA accessibility.
7. Support keyboard navigation.
8. Support both desktop and mobile layouts.
9. Support light and dark themes.
10. Keep components small and single-purpose.

---

## Implementation Scope

Design and implement all screens required by the project, including:

### Marketing

- Landing page

### Authentication

- Sign in
- Sign up

### Core Application

- Dashboard
- Habit list
- Habit card
- Create habit dialog
- Edit habit dialog
- Daily check-in controls
- Weekly progress indicators
- Monthly calendar
- Habit detail page
- Settings page

### UI States

- Empty states
- Loading skeletons
- Error states
- Success states

---

## UX Requirements

### Dashboard

- Users must be able to complete daily check-ins in under five seconds.
- Current streaks should be immediately visible.
- Today's status should be obvious.
- Quick actions should require minimal clicks.

### Habit Cards

- Show habit name, frequency, current streak, and today's status.
- Clearly differentiate `not_started`, `in_progress`, and `completed`.

### Calendar

- Display historical consistency with calm, low-noise visuals.
- Highlight today.
- Show completion intensity without visual clutter.

### Empty States

- Encourage users to start small.
- Avoid guilt-inducing language.

### Success Feedback

- Use subtle animations and color changes.
- Avoid overly gamified effects.

---

## Implementation Strategy

1. Review `ui-context.md` and extract design tokens and component rules.
2. Audit existing components and reuse them when possible.
3. Build missing reusable components first.
4. Implement page layouts.
5. Add loading, empty, and error states.
6. Verify responsiveness.
7. Verify accessibility.
8. Refine spacing, hierarchy, and motion for consistency.

---

## Quality Standards

Before finishing, verify:

- All colors use semantic tokens.
- Typography follows defined roles.
- Spacing follows the design scale.
- Radius and shadows are consistent.
- Focus states are visible.
- Keyboard navigation works.
- Mobile layouts are polished.
- Dark mode is fully supported.
- Components are reusable.
- No duplicated UI logic.
- The interface feels calm and premium.

---

## Deliverables

Produce:

- Reusable components
- Responsive page layouts
- Supporting states
- Consistent theming
- Production-ready UI code

---

## Final Instruction

Use `ui-context.md` as the authoritative design system.

Implement a cohesive, production-quality interface that faithfully reflects the design language and interaction principles defined in that document.
