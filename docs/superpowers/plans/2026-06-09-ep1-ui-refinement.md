# EP1 UI Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine workspace proportions and controls so the office room dominates while tools and chat remain discoverable.

**Architecture:** Preserve the existing viewport shell and Zustand state.
Change component presentation and add a tiny chat layout utility for the
expanded and collapsed desktop widths.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Zustand, Node test runner

---

### Task 1: Define Chat Rail Layout

**Files:**
- Create: `src/features/chat/utils/chat-layout.ts`
- Create: `src/features/chat/utils/chat-layout.test.ts`

- [ ] Write a failing test expecting expanded chat to be 304px and collapsed
  chat to be 44px.
- [ ] Run `npx.cmd tsx --test src/features/chat/utils/chat-layout.test.ts` and
  confirm the module is missing.
- [ ] Add `getDesktopChatWidth(isExpanded)` and the two width constants.
- [ ] Run the focused test and confirm it passes.

### Task 2: Compact Workspace Chrome

**Files:**
- Modify: `src/features/office/components/office-topbar.tsx`
- Modify: `src/features/auth/components/logout-button.tsx`
- Modify: `src/features/office/components/office-sidebar.tsx`

- [ ] Reduce top bar height and control padding.
- [ ] Reduce sidebar width and content spacing.
- [ ] Add CSS icons to tabs with accessible text labels.
- [ ] Merge profile metadata into one summary card and keep Today’s Focus in a
  second card.

### Task 3: Add Desktop Chat Rail

**Files:**
- Modify: `src/features/chat/components/chat-panel.tsx`
- Modify: `src/features/chat/components/chat-input.tsx`

- [ ] Use the tested width utility for 304px expanded and 44px collapsed states.
- [ ] Add a collapse control to the desktop chat header.
- [ ] Render a persistent narrow rail with chat symbol, connection dot, and
  unread badge.
- [ ] Preserve the mobile bottom drawer behavior.
- [ ] Increase composer height while reducing surrounding padding.

### Task 4: Emphasize Center Stage

**Files:**
- Modify: `src/features/office/components/office-main-stage.tsx`
- Modify: `src/features/office/components/office-shell.tsx`

- [ ] Reduce stage padding.
- [ ] Confirm the flexible center grows when chat collapses.
- [ ] Keep all movement and room state wiring unchanged.

### Task 5: Verify

- [ ] Run `npm.cmd run typecheck`.
- [ ] Run `npm.cmd run lint`.
- [ ] Run `npm.cmd run typecheck:server`.
- [ ] Run `npx.cmd tsx --test`.
- [ ] Run `npm.cmd run build`.
