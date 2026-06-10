# EP3 Better Speech Bubble Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the in-room speech bubble with pixel styling, one-line grapheme-aware truncation, and a four-second reduced-motion-safe lifecycle animation.

**Architecture:** Add a pure formatter under office utilities, render the formatted message in the existing `OfficePlayer` overlay, and keep animation declarations in global CSS. Leave the Zustand timer, Socket.io listener, chat store, and payloads unchanged.

**Tech Stack:** React, TypeScript, Tailwind CSS, CSS keyframes, Node test runner

---

### Task 1: Add Speech Bubble Formatting

**Files:**
- Create: `src/features/office/utils/speech-bubble.ts`
- Create: `src/features/office/utils/speech-bubble.test.ts`

- [ ] **Step 1: Write failing formatter tests**

Cover one-line whitespace normalization, messages below the limit, Latin text
over 40 graphemes, and Thai text with combining marks.

- [ ] **Step 2: Verify the tests fail**

Run: `npx.cmd tsx --test src/features/office/utils/speech-bubble.test.ts`

Expected: FAIL because `speech-bubble.ts` does not exist.

- [ ] **Step 3: Implement grapheme-aware formatting**

Export `formatSpeechBubbleMessage(message)` and
`SPEECH_BUBBLE_MAX_GRAPHEMES`. Use `Intl.Segmenter` with an `Array.from`
fallback and reserve the final grapheme for the ellipsis.

- [ ] **Step 4: Verify the focused tests pass**

Run: `npx.cmd tsx --test src/features/office/utils/speech-bubble.test.ts`

Expected: all formatter tests pass.

### Task 2: Build The Pixel Toast Bubble

**Files:**
- Modify: `src/features/office/components/office-player.tsx`

- [ ] **Step 1: Format display text only**

Call `formatSpeechBubbleMessage(bubble.message)` inside `OfficePlayer`. Do not
modify the stored or chat-panel message.

- [ ] **Step 2: Separate positioning from animation**

Keep the outer wrapper centered with `translateX(-50%)`, and place the lifecycle
class on an inner bubble keyed by `bubble.expiresAt`.

- [ ] **Step 3: Apply pixel styling**

Use a warm surface, two-pixel dark border, inset edge, strong text contrast,
stepped pointer tail, `whitespace-nowrap`, and a maximum width of 160 pixels.
Keep the existing high overlay z-index and leave the name tag visible.

### Task 3: Add Lifecycle Motion

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add the four-second lifecycle**

Create an opacity and transform keyframe that fades in, settles upward, stays
readable, then fades upward before the store removes the element.

- [ ] **Step 2: Add reduced-motion behavior**

Replace transform/scale movement with an opacity-only four-second lifecycle
inside `prefers-reduced-motion: reduce`.

### Task 4: Verify The Change

**Files:**
- Review all modified files

- [ ] **Step 1: Run `npm.cmd run typecheck`**
- [ ] **Step 2: Run `npm.cmd run lint`**
- [ ] **Step 3: Run `npm.cmd run typecheck:server`**
- [ ] **Step 4: Run `npx.cmd tsx --test`**
- [ ] **Step 5: Run `npm.cmd run build`**
- [ ] **Step 6: Confirm the diff does not alter socket, chat, database, auth, or room behavior**

