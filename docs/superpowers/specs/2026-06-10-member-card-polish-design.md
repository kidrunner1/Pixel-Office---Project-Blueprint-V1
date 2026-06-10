# EP4 Member Card Polish Design

## Goal

Make the Members tab readable at a glance so a four-person team can understand
who is present, each person's current mode, and today's focus without leaving
the office view.

## Compact Identity Stack

Each member uses one compact pixel card with three visual levels:

1. A mini version of the shared avatar renderer with a small presence light.
2. Identity details containing the display name, translated role, and a `You`
   marker for the current user.
3. Work context containing a colored status badge and a one-to-two-line focus
   summary.

The current user's card uses an emerald outline and slightly brighter surface.
Other cards use the existing navy sidebar surfaces. Cards remain compact enough
for all four room members to fit naturally inside the sidebar scroll area.

## Status Presentation

A pure status helper maps supported room statuses to translation keys, icons,
and semantic tones:

- `online`: green dot and Active
- `focus`: laptop and Focus
- `meeting`: conversation icon and Meeting
- `break`: coffee and Break
- `away`: moon and Away

`away` remains presentation-only preparation. It is not added to Prisma,
validation, the room model, API payloads, or Socket.io events.

## Avatar And Realtime Data

`AvatarPreview` gains a `mini` size that scales the same `PixelCharacter`
renderer used by the room and customizer. No separate avatar implementation is
introduced.

The Members tab continues receiving the active member array from
`OfficeShell`, which derives from the existing Zustand room state. Realtime
presence and member updates therefore flow through the current room-store merge
without new subscriptions or events.

## Empty And Missing Focus States

An empty roster displays the existing friendly no-members message in a compact
pixel panel. A member without `todayTask` displays the new translated phrase
`No focus set` / `ยังไม่ได้ตั้งโฟกัส`.

## Testing

Unit tests verify every status mapping, including the presentation-only away
state. Existing i18n parity tests ensure all new English keys also exist in the
Thai dictionary.

