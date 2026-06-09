# Auth Form Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align login with registration through one shared emerald form style contract.

**Architecture:** Export immutable auth form class names from one small module and consume them in both client forms. Keep all form state and submission behavior local and unchanged.

**Tech Stack:** React, TypeScript, Tailwind CSS, Node test runner

---

### Task 1: Shared Style Contract

**Files:**
- Create: `src/features/auth/components/auth-form-styles.test.ts`
- Create: `src/features/auth/components/auth-form-styles.ts`

- [ ] Add a failing test requiring emerald accent classes and rejecting amber accent classes.
- [ ] Add the shared card, eyebrow, input, button, and link class constants.
- [ ] Run the focused test and confirm it passes.

### Task 2: Form Alignment

**Files:**
- Modify: `src/features/auth/components/login-form.tsx`
- Modify: `src/features/auth/components/register-form.tsx`

- [ ] Replace duplicated presentation classes with the shared style contract.
- [ ] Keep all behavioral code and field attributes unchanged.
- [ ] Run typecheck, lint, all tests, and the production build.
