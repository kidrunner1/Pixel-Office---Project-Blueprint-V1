# Thai and English Language Toggle Design

## Goal

Let users switch the complete Pixel Office interface between Thai and English at any time without reloading the page.

## Approved Experience

- Show a compact `ไทย | EN` segmented language control on:
  - the landing-page navigation
  - login and registration pages
  - the office top bar
- Switch visible interface text immediately.
- Store the selected language in `localStorage`.
- On the first visit, use Thai when the browser language begins with `th`; otherwise use English.
- Keep route URLs unchanged.
- Add no internationalization dependency.

## Architecture

Create a lightweight client-side localization layer under `src/features/i18n`:

- `translations.ts` contains the typed English and Thai dictionaries.
- `i18n-provider.tsx` owns the current locale, browser detection, persistence, and document language.
- `use-translation.ts` exposes a typed `t(key)` helper and locale controls.
- `language-toggle.tsx` renders the shared compact segmented control.

The provider wraps the application in the root layout. Components with user-facing copy use the translation hook. Server pages continue handling authentication and data loading, while their interactive presentation components translate client-side.

## Translation Scope

Translate user-facing text across:

- landing page navigation, hero, CTAs, feature descriptions, workflow, product preview, and footer
- login and registration layouts, labels, placeholders, buttons, loading text, links, and client-side errors
- office top bar, sidebar tabs, profile, focus controls, members, customization, room controls, movement hints, realtime state, chat, and empty/loading/error states
- avatar customization labels and option names
- user-visible status names such as online, focus, meeting, and break

User-created content remains unchanged:

- names
- room names returned from the database
- chat messages
- today-task text

Backend response messages remain unchanged. The frontend maps known messages to translation keys where practical and uses translated generic fallbacks for unknown failures.

## Locale Behavior

- Supported locales: `en` and `th`.
- Default before hydration: English, to keep server and client output stable.
- After hydration:
  1. use a valid stored preference when present
  2. otherwise detect `navigator.language`
  3. persist the resulting choice
- Update `<html lang>` to `en` or `th` whenever the locale changes.
- The toggle uses real buttons, `aria-pressed`, clear accessible labels, and visible focus treatment.

## Typography and Layout

- Keep the existing Pixel Office visual system.
- Use the current font stack, which supports browser fallback for Thai.
- Allow Thai labels to wrap where needed instead of shrinking text below readable sizes.
- Keep compact controls dimensionally stable in both languages.

## Testing

Add focused tests for:

- browser-language locale resolution
- stored-preference precedence
- translation key parity between English and Thai
- representative English and Thai strings

Run the existing complete typecheck, lint, server typecheck, tests, and production build.

## Constraints

- Do not change authentication behavior.
- Do not change database or Prisma.
- Do not change Socket.io events.
- Do not change movement, collision, chat, room capacity, or avatar behavior.
- Do not add locale-prefixed routes or external dependencies.
