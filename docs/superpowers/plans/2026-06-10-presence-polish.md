# EP6 Presence Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show translated presence badges and subtle status treatments in the office room while sorting and summarizing the sidebar roster.

**Architecture:** Add a pure member-presence utility for ordering, summaries, and semantic visual state. Reuse one small translated status badge in both room players and member cards, leaving the existing room store and realtime data flow unchanged.

**Tech Stack:** React, TypeScript, Tailwind CSS, existing i18n utilities, Node test runner

---

### Task 1: Define Member Presence Behavior

**Files:**
- Create: `src/features/office/utils/member-presence.ts`
- Create: `src/features/office/utils/member-presence.test.ts`

- [ ] **Step 1: Write failing tests**

Test the Active-to-Away rank order, current-user-first stable sorting,
non-zero summaries, and the dimmed away visual state.

- [ ] **Step 2: Run the focused test**

Run: `npx.cmd tsx --test src/features/office/utils/member-presence.test.ts`

Expected: FAIL because `member-presence.ts` does not exist.

- [ ] **Step 3: Implement the pure helper**

Export `getStatusRank`, `sortMembersByPresence`,
`summarizeMembersByStatus`, and `getMemberPresenceVisual`.

- [ ] **Step 4: Re-run the focused test**

Expected: all member presence utility tests pass.

### Task 2: Create A Shared Status Badge

**Files:**
- Create: `src/features/office/components/office-status-badge.tsx`
- Modify: `src/features/office/components/office-member-card.tsx`

- [ ] **Step 1: Render translated icon and label**

Use `getStatusPresentation` and a stable tone-to-class mapping.

- [ ] **Step 2: Support room and card density**

Keep both variants one line and no wider than their local container.

- [ ] **Step 3: Replace the member-card badge**

Preserve mini avatar, role, task clamp, presence light, and current-user marker.

### Task 3: Add Stacked Room Presence

**Files:**
- Modify: `src/features/office/components/office-player.tsx`

- [ ] **Step 1: Reorder the overlay stack**

Keep speech at the highest z-index, followed by name and status.

- [ ] **Step 2: Add subtle status visuals**

Use semantic visual state for focus, meeting, break, and away. Apply away
opacity/desaturation only to the avatar.

- [ ] **Step 3: Preserve movement and bubbles**

Keep the existing transform, 160ms movement transition, walking class, bubble
lifetime, and player z-index calculations unchanged.

### Task 4: Sort And Summarize The Sidebar

**Files:**
- Modify: `src/features/office/components/office-member-list.tsx`

- [ ] **Step 1: Derive the sorted member list**

Place the current user first, then Active, Focus, Meeting, Break, and Away
while retaining stable order inside each status.

- [ ] **Step 2: Render compact status summary**

Display only non-zero status counts using translated labels and existing
status icons.

- [ ] **Step 3: Preserve empty state**

Keep the current friendly no-members state and seat count.

### Task 5: Verify The Complete Change

**Files:**
- Review all EP6 files

- [ ] **Step 1:** Run `npm.cmd run typecheck`
- [ ] **Step 2:** Run `npm.cmd run lint`
- [ ] **Step 3:** Run `npm.cmd run typecheck:server`
- [ ] **Step 4:** Run `npx.cmd tsx --test`
- [ ] **Step 5:** Run `npm.cmd run build`
- [ ] **Step 6:** Confirm auth, Prisma, database, socket events, movement, collision, room capacity, idle behavior, and chat behavior are unchanged
