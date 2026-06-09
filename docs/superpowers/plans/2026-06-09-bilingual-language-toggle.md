# Thai and English Language Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an instant, persistent Thai and English language toggle across Pixel Office's public, authentication, and office interfaces.

**Architecture:** A root client provider owns locale detection and persistence. Flat typed dictionaries provide stable translation keys, interpolation, and compile-time Thai/English parity. Existing presentation components call a small translation hook; backend contracts and user-created content remain unchanged.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Node test runner

---

### Task 1: Locale Resolution and Dictionaries

**Files:**
- Create: `src/features/i18n/i18n.test.ts`
- Create: `src/features/i18n/i18n.ts`
- Create: `src/features/i18n/translations.ts`

- [ ] Write failing tests for stored-locale precedence, Thai browser detection, English fallback, interpolation, key parity, and representative translations.
- [ ] Run `npx.cmd tsx --test src/features/i18n/i18n.test.ts` and confirm failure because the modules do not exist.
- [ ] Implement `Locale`, `TranslationKey`, `resolveInitialLocale`, and `translate`.
- [ ] Add complete English and Thai flat dictionaries with identical keys.
- [ ] Re-run the focused tests and confirm they pass.

### Task 2: Provider and Language Control

**Files:**
- Create: `src/features/i18n/i18n-provider.tsx`
- Create: `src/features/i18n/use-translation.ts`
- Create: `src/features/i18n/language-toggle.tsx`
- Modify: `src/app/layout.tsx`

- [ ] Add a client provider that detects and persists locale after hydration.
- [ ] Update `document.documentElement.lang` when locale changes.
- [ ] Expose `locale`, `setLocale`, and typed `t`.
- [ ] Build an accessible compact `ไทย | EN` segmented control.
- [ ] Wrap the application in the provider.

### Task 3: Public and Authentication Surfaces

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/auth/login/page.tsx`
- Modify: `src/app/auth/register/page.tsx`
- Modify: `src/features/public/components/public-shell.tsx`
- Modify: `src/features/public/components/public-auth-layout.tsx`
- Modify: `src/features/public/components/public-feature-card.tsx`
- Modify: `src/features/public/components/public-hero-preview.tsx`
- Modify: `src/features/public/data/public-content.ts`
- Modify: `src/features/public/data/public-content.test.ts`
- Modify: `src/features/auth/components/login-form.tsx`
- Modify: `src/features/auth/components/register-form.tsx`
- Modify: `src/features/auth/components/logout-button.tsx`

- [ ] Convert public content records from English text to translation keys.
- [ ] Translate navigation, hero, CTAs, feature cards, workflow, preview labels, and footer.
- [ ] Place the shared language control in public navigation and auth layouts.
- [ ] Translate auth page pitches, labels, placeholders, loading text, buttons, links, and generic errors.
- [ ] Keep all API calls, validation attributes, Zustand updates, and redirects unchanged.

### Task 4: Office Workspace Surfaces

**Files:**
- Modify: `src/features/office/components/office-topbar.tsx`
- Modify: `src/features/office/components/office-sidebar.tsx`
- Modify: `src/features/office/components/office-main-stage.tsx`
- Modify: `src/features/office/components/office-status-panel.tsx`
- Modify: `src/features/office/components/office-member-list.tsx`
- Modify: `src/features/office/components/office-member-card.tsx`
- Modify: `src/features/office/components/office-daily-notes-panel.tsx`
- Modify: `src/features/office/components/office-map.tsx`
- Modify: `src/features/office/components/office-player.tsx`
- Modify: `src/features/chat/components/chat-panel.tsx`
- Modify: `src/features/chat/components/chat-input.tsx`
- Modify: `src/features/chat/components/chat-message-list.tsx`
- Modify: `src/features/avatar/components/avatar-customizer.tsx`

- [ ] Add the language control to the office top bar.
- [ ] Translate sidebar tabs, profile state, focus controls, members, room controls, and movement hints.
- [ ] Translate chat chrome, placeholders, connection state, and empty state while preserving message content.
- [ ] Translate avatar field labels, option names, actions, and feedback.
- [ ] Translate visible status labels without changing stored status values.

### Task 5: Verification

**Files:**
- Modify only files required by verification findings.

- [ ] Run `npm.cmd run typecheck`.
- [ ] Run `npm.cmd run lint`.
- [ ] Run `npm.cmd run typecheck:server`.
- [ ] Run `npx.cmd tsx --test`.
- [ ] Run `npm.cmd run build`.
- [ ] Confirm no auth, database, Socket.io, movement, collision, room, chat-message, or avatar behavior changed.
