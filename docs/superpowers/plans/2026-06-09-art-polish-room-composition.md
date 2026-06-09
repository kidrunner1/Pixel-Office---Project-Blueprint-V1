# Art Polish and Room Composition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose the single Pixel Office room as a warm asymmetric startup studio while preserving all gameplay and backend behavior.

**Architecture:** Keep the existing tile background, object layer, player layer,
and UI label layer. Change object coordinates and collision rectangles as one
layout dataset, then refine presentation through the existing map, tile, and
player components.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Zustand, Node test runner

---

### Task 1: Lock Layout Intent With Tests

**Files:**
- Modify: `src/features/office/data/office-objects.test.ts`
- Modify: `src/features/office/utils/movement.test.ts`

- [ ] Assert the work, meeting, admin, and lounge anchor objects occupy their
  intended regions.
- [ ] Assert all four join positions remain walkable.
- [ ] Assert the central bent route remains walkable.
- [ ] Run `npx.cmd tsx --test` and confirm the new assertions fail against the
  previous layout.

### Task 2: Recompose Room Data

**Files:**
- Modify: `src/features/office/data/office-objects.ts`
- Modify: `src/features/office/maps/main-office-map.ts`

- [ ] Move furniture into the approved asymmetric clusters.
- [ ] Tune collision boxes to the visible floor footprint of each sprite.
- [ ] Align visual zone metadata with the new furniture placement.
- [ ] Use floor contact points for object and player depth.
- [ ] Run `npx.cmd tsx --test` and confirm all layout and movement tests pass.

### Task 3: Polish Room And Character Rendering

**Files:**
- Modify: `src/features/office/components/office-map.tsx`
- Modify: `src/features/office/components/office-tile.tsx`
- Modify: `src/features/office/components/office-player.tsx`
- Modify: `src/features/office/components/office-room.tsx`
- Modify: `src/app/globals.css`

- [ ] Add consistent contact and sprite shadows to floor objects.
- [ ] Reduce floor seams and strengthen wall boundaries.
- [ ] Add restrained warm ambient lighting and vignette.
- [ ] Pass movement state to the current player and apply a reduced-motion-safe
  stepping animation.
- [ ] Keep name tags and speech bubbles above all depth-sorted objects.

### Task 4: Verify

**Files:**
- No production file changes expected.

- [ ] Run `npm.cmd run typecheck`.
- [ ] Run `npm.cmd run lint`.
- [ ] Run `npm.cmd run typecheck:server`.
- [ ] Run `npx.cmd tsx --test`.
- [ ] Run `npm.cmd run build`.
