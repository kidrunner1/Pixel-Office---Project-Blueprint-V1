# EP4 Member Card Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a compact member roster with shared mini avatars, translated status metadata, focus summaries, presence indicators, and current-user emphasis.

**Architecture:** Add a pure status presentation helper, extend the shared avatar preview with a mini scale, and keep the member list/card components responsible only for rendering room-store data already passed by the sidebar. Preserve all room, socket, auth, and backend contracts.

**Tech Stack:** React, TypeScript, Tailwind CSS, existing i18n utilities, Node test runner

---

### Task 1: Define Status Presentation Metadata

**Files:**
- Create: `src/features/office/utils/status-label.ts`
- Create: `src/features/office/utils/status-label.test.ts`

- [ ] **Step 1: Write failing tests**

Verify the icon, translation key, and semantic tone for online, focus, meeting,
break, and the presentation-only away state.

- [ ] **Step 2: Run the focused test**

Run: `npx.cmd tsx --test src/features/office/utils/status-label.test.ts`

Expected: FAIL because `status-label.ts` does not exist.

- [ ] **Step 3: Implement the helper**

Export `MemberPresenceStatus`, `StatusTone`, `StatusPresentation`, and
`getStatusPresentation(status)`. Keep away outside `RoomMemberStatus`.

- [ ] **Step 4: Re-run the focused test**

Expected: all status presentation tests pass.

### Task 2: Add Bilingual Roster Copy

**Files:**
- Modify: `src/features/i18n/translations.ts`

- [ ] **Step 1: Add English keys**

Add `status.active`, `status.away`, and `office.noFocusSet`.

- [ ] **Step 2: Add matching Thai keys**

Use `กำลังใช้งาน`, `ไม่อยู่`, and `ยังไม่ได้ตั้งโฟกัส`.

- [ ] **Step 3: Run i18n parity tests**

Run: `npx.cmd tsx --test src/features/i18n/i18n.test.ts`

Expected: dictionary parity and representative translations pass.

### Task 3: Add Shared Mini Avatar Rendering

**Files:**
- Modify: `src/features/avatar/components/avatar-preview.tsx`

- [ ] **Step 1: Extend the size prop**

Add `mini` beside `small` and `large`.

- [ ] **Step 2: Scale the shared pixel character**

Render a 42 by 58 pixel footprint using the existing `PixelCharacter`; do not
duplicate avatar parts or configuration handling.

### Task 4: Rebuild Member Card And List

**Files:**
- Modify: `src/features/office/components/office-member-card.tsx`
- Modify: `src/features/office/components/office-member-list.tsx`

- [ ] **Step 1: Compose identity and presence**

Render the mini avatar, presence light, display name, translated role, and
current-user badge.

- [ ] **Step 2: Render status metadata**

Use `getStatusPresentation`, translated labels, stable tone classes, and the
requested icons.

- [ ] **Step 3: Render focus summary**

Clamp todayTask to two lines and display `office.noFocusSet` when empty.

- [ ] **Step 4: Polish list density and empty state**

Use compact gaps, square pixel borders, a seat counter, and the existing
translated no-members message.

### Task 5: Verify The Complete Change

**Files:**
- Review all modified files

- [ ] **Step 1:** Run `npm.cmd run typecheck`
- [ ] **Step 2:** Run `npm.cmd run lint`
- [ ] **Step 3:** Run `npm.cmd run typecheck:server`
- [ ] **Step 4:** Run `npx.cmd tsx --test`
- [ ] **Step 5:** Run `npm.cmd run build`
- [ ] **Step 6:** Confirm no socket events, room logic, movement, collision, auth, database, or Prisma files changed

