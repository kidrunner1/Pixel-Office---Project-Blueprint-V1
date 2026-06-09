# EP2 Public Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Pixel Office's public landing and auth pages around an immersive static office scene while preserving all existing application behavior.

**Architecture:** Public copy lives in a small typed data module. Reusable server-rendered presentation components compose existing office sprites and CSS avatars without reading authenticated state. Existing client auth forms keep their handlers and state, receiving visual-only markup and class changes.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, existing office assets and avatar components

---

### Task 1: Public Content Contract

**Files:**
- Create: `src/features/public/data/public-content.test.ts`
- Create: `src/features/public/data/public-content.ts`

- [ ] Write a test that imports the public CTAs, features, and workflow steps and asserts their exact count, order, labels, and destinations.
- [ ] Run `npx.cmd tsx --test src/features/public/data/public-content.test.ts` and verify it fails because the module does not exist.
- [ ] Add typed readonly collections for the three CTA links, four feature cards, and three workflow steps.
- [ ] Re-run the focused test and verify it passes.

### Task 2: Shared Public Presentation

**Files:**
- Create: `src/features/public/components/public-shell.tsx`
- Create: `src/features/public/components/public-hero-preview.tsx`
- Create: `src/features/public/components/public-feature-card.tsx`
- Create: `src/features/public/components/public-auth-layout.tsx`

- [ ] Build a semantic public shell with a compact navigation bar, skip link, and concise footer.
- [ ] Build a static office preview from `OfficeAsset` and `AvatarPreview`, with no stores, API calls, or authenticated state.
- [ ] Add hero and compact auth variants so one visual system serves all three pages.
- [ ] Build a compact feature card and a shared split auth layout with responsive stacking.

### Task 3: Landing Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] Replace the outdated scaffold with an immersive full-bleed office hero and exact approved product copy.
- [ ] Add the four feature cards, three workflow steps, larger dashboard mockup, and footer navigation.
- [ ] Ensure the office scene is the first-viewport signal and the next section remains partially visible.
- [ ] Verify all CTA destinations match the tested content contract.

### Task 4: Auth Pages and Forms

**Files:**
- Modify: `src/app/auth/login/page.tsx`
- Modify: `src/app/auth/register/page.tsx`
- Modify: `src/features/auth/components/login-form.tsx`
- Modify: `src/features/auth/components/register-form.tsx`

- [ ] Wrap each page in `PublicAuthLayout` with page-specific pitch copy.
- [ ] Restyle the forms with dark pixel surfaces, visible labels, clear focus states, and branded errors.
- [ ] Add a landing-page link while preserving the existing register/login cross-link.
- [ ] Confirm handlers, validation attributes, API calls, Zustand updates, and redirects are unchanged.

### Task 5: Shared Styling and Verification

**Files:**
- Modify: `src/app/globals.css`

- [ ] Add reusable public-scene texture, stepped shadow, and reduced-motion-safe ambient animation styles.
- [ ] Run `npm.cmd run typecheck`.
- [ ] Run `npm.cmd run lint`.
- [ ] Run `npm.cmd run typecheck:server`.
- [ ] Run `npx.cmd tsx --test`.
- [ ] Run `npm.cmd run build`.
- [ ] Review the final file list and confirm no backend or office application logic changed.
