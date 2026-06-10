# EP5 Status And Idle System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add bilingual visual presence controls and a client-only five-minute automatic-away lifecycle without changing the database schema or Socket.io event contract.

**Architecture:** Extend the existing string status contract with `away`, isolate manual-versus-automatic transitions in a pure utility, and let a small office hook own browser activity listeners and timers. REST remains authoritative; successful status updates reuse `join_room` to refresh the socket room state.

**Tech Stack:** React, TypeScript, Zustand, Zod, Socket.io client, Tailwind CSS, Node test runner

---

### Task 1: Define Idle Status Transitions

**Files:**
- Create: `src/features/office/utils/idle-status.ts`
- Create: `src/features/office/utils/idle-status.test.ts`

- [ ] **Step 1: Write failing transition tests**

Cover automatic away, manual away, activity restore, and manual non-away
selection using a small serializable state object.

- [ ] **Step 2: Run the focused test**

Run: `npx.cmd tsx --test src/features/office/utils/idle-status.test.ts`

Expected: FAIL because the utility does not exist.

- [ ] **Step 3: Implement minimal pure transitions**

Export `IDLE_TIMEOUT_MS`, `createIdleStatusState`,
`applyManualStatusSelection`, `applyIdleTimeout`, and `applyUserActivity`.

- [ ] **Step 4: Re-run the focused test**

Expected: all idle status transition tests pass.

### Task 2: Expand The Shared Status Contract

**Files:**
- Modify: `src/types/room.ts`
- Modify: `src/lib/validations/room.ts`
- Modify: `src/features/office/utils/status-label.ts`
- Modify: `src/features/office/utils/status-label.test.ts`

- [ ] **Step 1: Add `away` to the room status union and Zod options**

Keep Prisma unchanged because `RoomMember.status` is a string.

- [ ] **Step 2: Simplify the presentation helper**

Use `RoomMemberStatus` directly now that away is a supported room value.

- [ ] **Step 3: Run status and validation-related tests**

Run: `npx.cmd tsx --test src/features/office/utils/status-label.test.ts`

Expected: all status mappings pass.

### Task 3: Add Socket Presence Resync

**Files:**
- Create: `src/features/office/utils/sync-socket-presence.ts`
- Modify: `src/features/office/hooks/use-office-socket.ts`

- [ ] **Step 1: Extract the existing join payload builder**

Create a helper that accepts the user name and current room member and emits
the existing `join_room` event only when the socket is connected.

- [ ] **Step 2: Reuse the helper during initial socket join**

Keep all event names and server behavior unchanged.

### Task 4: Implement The Idle Hook

**Files:**
- Create: `src/features/office/hooks/use-idle-status.ts`
- Modify: `src/features/office/components/office-shell.tsx`

- [ ] **Step 1: Add browser activity listeners**

Listen for `keydown`, `pointermove`, `pointerdown`, and `input` while joined.
Reset one five-minute timer and clean up all listeners on disable or unmount.

- [ ] **Step 2: Apply automatic and restored statuses**

Call `updateMyMember` with current position and task. Emit socket presence only
after the REST action succeeds.

- [ ] **Step 3: Expose manual selection notification**

Return a callback that records manual status choices without duplicating room
state.

- [ ] **Step 4: Pass the callback through the sidebar**

Wire OfficeShell to OfficeSidebar and OfficeStatusPanel.

### Task 5: Polish Status Controls And Copy

**Files:**
- Modify: `src/features/office/components/office-status-panel.tsx`
- Modify: `src/features/office/components/office-sidebar.tsx`
- Modify: `src/features/i18n/translations.ts`

- [ ] **Step 1: Render five visual status buttons**

Use `getStatusPresentation` for icons and translated labels, with a clear
selected state and keyboard-accessible buttons.

- [ ] **Step 2: Preserve the existing save workflow**

Save status and today task together, then notify the idle hook and sync socket
presence after REST succeeds.

- [ ] **Step 3: Add bilingual auto-away guidance**

Show subtle guidance in Today and Profile without increasing panel height
significantly.

- [ ] **Step 4: Run i18n parity tests**

Run: `npx.cmd tsx --test src/features/i18n/i18n.test.ts`

Expected: English and Thai dictionaries remain in parity.

### Task 6: Verify The Complete Change

**Files:**
- Review all modified EP5 files

- [ ] **Step 1:** Run `npm.cmd run typecheck`
- [ ] **Step 2:** Run `npm.cmd run lint`
- [ ] **Step 3:** Run `npm.cmd run typecheck:server`
- [ ] **Step 4:** Run `npx.cmd tsx --test`
- [ ] **Step 5:** Run `npm.cmd run build`
- [ ] **Step 6:** Confirm Prisma, auth, chat, room capacity, movement, collision, and socket event definitions are unchanged
