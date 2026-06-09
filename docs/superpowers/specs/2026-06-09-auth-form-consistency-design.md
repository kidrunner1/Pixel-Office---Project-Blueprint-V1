# Auth Form Consistency Design

## Goal

Make login and registration read as one Pixel Office authentication system.

## Approved Direction

Use the registration form's emerald treatment for both forms:

- identical card surface, border, padding, and shadow
- identical label and body typography
- identical input background, border, focus border, and focus ring
- identical primary button treatment
- identical cross-link treatment

Only page copy, field count, button text, autocomplete values, and submission behavior differ.

## Constraints

- Keep the shared public auth layout unchanged.
- Keep login and registration API calls, Zustand updates, validation attributes, errors, loading states, and redirects unchanged.
- Add no dependencies.
