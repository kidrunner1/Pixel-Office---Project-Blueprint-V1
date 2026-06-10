# EP2 Character Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the CSS avatar as a dimensional pixel office worker with distinct hair, directional poses, and a reduced-motion-safe two-frame walk.

**Architecture:** Keep `AvatarPreview` as the shared public renderer used by the office and customizer. Add a pure pose helper for direction and silhouette decisions, compose private pixel-part components inside the preview, and keep floor positioning plus labels inside `OfficePlayer`.

**Tech Stack:** React, TypeScript, Tailwind CSS, CSS keyframes, Node test runner

---

### Task 1: Define Testable Avatar Poses

**Files:**
- Create: `src/features/avatar/utils/avatar-pose.ts`
- Create: `src/features/avatar/utils/avatar-pose.test.ts`

- [ ] **Step 1: Write failing tests for direction and hair silhouettes**

Test that down shows a face, up hides it, right mirrors the left pose, and each
hair option returns a different silhouette identifier.

- [ ] **Step 2: Verify the tests fail**

Run: `npx.cmd tsx --test src/features/avatar/utils/avatar-pose.test.ts`

Expected: FAIL because `avatar-pose.ts` does not exist.

- [ ] **Step 3: Implement the pose helper**

Export `getAvatarPose(direction, hair)` with typed fields for `showFace`,
`isBack`, `isSide`, `mirror`, and `hairSilhouette`.

- [ ] **Step 4: Verify the focused tests pass**

Run: `npx.cmd tsx --test src/features/avatar/utils/avatar-pose.test.ts`

Expected: all avatar pose tests pass.

### Task 2: Rebuild The Shared Avatar Renderer

**Files:**
- Modify: `src/features/avatar/components/avatar-preview.tsx`

- [ ] **Step 1: Split the character into private pixel-part components**

Create focused renderers for hair, face, torso, arms, legs, shoes, and
accessories while preserving the `AvatarPreview` props and `AvatarConfig`
lookups.

- [ ] **Step 2: Apply the new pixel proportions**

Use a 72 by 112 pixel base stage, stronger dark outlines, separated shirt and
pants, lit left edges, shaded right edges, and clearly shaped shoes.

- [ ] **Step 3: Render distinct direction and hair variants**

Use `getAvatarPose` so front, back, and side profiles remain consistent and the
right profile mirrors the left profile.

- [ ] **Step 4: Keep customizer and office sizing consistent**

Scale the same character renderer for `large` and `small`; do not duplicate
avatar markup or configuration logic.

### Task 3: Polish Office Grounding And Walking

**Files:**
- Modify: `src/features/office/components/office-player.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Tune the player footprint**

Adjust the player visual container and vertical offset only as needed for the
new 64 by 96 pixel office avatar. Keep tile coordinates, transform duration,
z-index calculation, name tags, and speech bubbles unchanged.

- [ ] **Step 2: Add two-frame visual movement**

Animate the body by two pixels and alternate the leg groups using `steps(2,
end)` during the existing `isWalking` window.

- [ ] **Step 3: Keep the shadow grounded**

Render the oval floor shadow outside the animated body and tune it to the
character footprint.

- [ ] **Step 4: Respect reduced motion**

Disable body bob and leg offsets inside `prefers-reduced-motion: reduce`.

### Task 4: Verify The Complete Change

**Files:**
- Review all modified files

- [ ] **Step 1: Run TypeScript checks**

Run: `npm.cmd run typecheck`

Run: `npm.cmd run typecheck:server`

- [ ] **Step 2: Run lint**

Run: `npm.cmd run lint`

- [ ] **Step 3: Run the complete test suite**

Run: `npx.cmd tsx --test`

- [ ] **Step 4: Run the production build**

Run: `npm.cmd run build`

- [ ] **Step 5: Inspect the final diff**

Confirm no auth, database, Prisma, Socket.io event, chat, movement, collision,
or room-capacity behavior changed. Preserve unrelated `.env.example` and
`next-env.d.ts` working-tree edits.

