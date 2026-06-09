# Office Workspace Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the vertically stacked office page with a viewport workspace that keeps the room and chat visible together.

**Architecture:** Keep room fetching, keyboard movement, and socket setup in the
client office shell. Pass derived state into focused top bar, sidebar, stage,
and chat components. Use responsive CSS and local drawer state only.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Zustand

---

### Task 1: Build Workspace Structure

**Files:**
- Create: `src/features/office/components/office-shell.tsx`
- Create: `src/features/office/components/office-topbar.tsx`
- Create: `src/features/office/components/office-sidebar.tsx`
- Create: `src/features/office/components/office-main-stage.tsx`
- Modify: `src/features/office/components/office-room.tsx`

- [ ] Move room, movement, and socket orchestration into `OfficeShell`.
- [ ] Render the viewport grid and responsive sidebar drawer.
- [ ] Keep join, leave, errors, and movement feedback in the center stage.
- [ ] Keep the map mounted only when the current user has joined.

### Task 2: Dock Chat

**Files:**
- Modify: `src/features/chat/components/chat-panel.tsx`
- Modify: `src/features/chat/components/chat-message-list.tsx`
- Modify: `src/features/chat/components/chat-input.tsx`

- [ ] Make desktop chat a full-height flex column.
- [ ] Give the message list `min-height: 0`, flex growth, and internal scrolling.
- [ ] Pin the composer at the panel bottom.
- [ ] Add a mobile bottom drawer and unread-count trigger.

### Task 3: Compact Sidebar Tools

**Files:**
- Modify: `src/features/avatar/components/avatar-customizer.tsx`
- Modify: `src/features/office/components/office-status-panel.tsx`
- Modify: `src/features/office/components/office-member-list.tsx`

- [ ] Add compact presentation variants.
- [ ] Preserve fetch, update, validation, and save behavior.
- [ ] Keep form controls readable in a narrow sidebar.

### Task 4: Replace Page Layout

**Files:**
- Modify: `src/app/office/page.tsx`

- [ ] Remove the old page header and lower avatar customizer.
- [ ] Pass the safe authenticated user into the workspace shell.
- [ ] Keep server-side redirect protection unchanged.

### Task 5: Verify

- [ ] Run `npm.cmd run typecheck`.
- [ ] Run `npm.cmd run lint`.
- [ ] Run `npm.cmd run typecheck:server`.
- [ ] Run `npx.cmd tsx --test`.
- [ ] Run `npm.cmd run build`.
