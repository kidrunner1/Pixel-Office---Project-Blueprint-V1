# EP5 Status And Idle System Design

## Goal

Make office presence useful at a glance while preserving the current REST-first
room architecture. Joined users can choose an explicit work status, and users
who stop interacting with Pixel Office are marked away after five minutes.

## Status Model

`RoomMemberStatus` and the existing Zod enum gain `away`. Prisma already stores
the value as a string, so this requires no schema change or migration.

The supported values are:

- `online`: Active / พร้อมใช้งาน
- `focus`: Focus / โฟกัส
- `meeting`: Meeting / ประชุม
- `break`: Break / พัก
- `away`: Away / ไม่อยู่

The shared status presentation helper remains the source of icon, translation
key, and visual tone metadata.

## Status Selector

The Today panel replaces the plain select with a compact five-option visual
control. Each option shows the existing status icon and translated label.
Saving continues through `updateMyMember`, preserves the member position and
today task, and reports the existing success or failure messages.

A manual status selection is reported to the idle hook. Selecting `away`
records a manual-away state, while selecting any other option updates the last
restorable non-away status.

## Idle State Machine

`use-idle-status.ts` owns the client-only idle lifecycle while the user is
joined:

- `IDLE_TIMEOUT_MS` is `5 * 60 * 1000`.
- Keyboard, pointer movement, pointer clicks, and input events count as
  activity.
- After the timeout, a non-away member is updated to `away`.
- The most recent non-away status is remembered before automatic away.
- Activity after automatic away restores that remembered status.
- Activity never restores a status that the user manually set to `away`.
- A member loaded from REST with `away` is treated as manually away because
  the client cannot safely infer how that persisted value was produced.
- Leaving the room or unmounting clears the timer and event listeners.

A pure idle transition utility contains the manual-versus-automatic rules so
they can be tested without React timers or browser mocks.

## REST And Realtime Flow

REST remains the source of truth. Every status transition first calls the
existing `updateMyMember` action with the current position and task.

After REST succeeds, the client re-emits the existing `join_room` event with
the updated member payload. The socket server already replaces an existing
in-memory member and broadcasts `room_state`, so other browser sessions receive
the status change without adding or changing any socket event.

Failed REST updates do not emit socket updates. Idle failures leave the client
eligible to retry on later activity or timeout cycles without changing room,
chat, movement, or collision behavior.

## UX Copy

The Today panel and Profile section show subtle bilingual guidance:

`Auto-away after 5 minutes idle` /
`เปลี่ยนเป็นไม่อยู่เมื่อไม่มีการใช้งาน 5 นาที`

## Testing

Unit tests cover:

- active status becoming automatically away after timeout
- manual away remaining away after activity
- activity restoring the previous non-away status
- manual non-away selections updating the restorable status
- all status presentation labels, including away

The existing complete test, lint, typecheck, server typecheck, and production
build commands remain the release gate.
