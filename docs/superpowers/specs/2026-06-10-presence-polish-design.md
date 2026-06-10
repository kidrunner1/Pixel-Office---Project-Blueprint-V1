# EP6 Presence Polish Design

## Goal

Make each teammate's current mode readable directly inside the shared room and
make the compact member roster easier to scan without adding new product
features or visual companions.

## Stacked Presence Label

Each room character uses one overlay stack:

1. Speech bubble at the highest visual priority.
2. Name tag.
3. Compact translated status badge.
4. Character and floor shadow.

The status badge uses the existing icon and translation metadata from
`status-label.ts`. It remains one line, uses a narrow pixel border, and stays
small enough not to obscure the office scene. Speech bubbles are moved above
the complete identity stack so they never sit behind the name or status.

## Presence Visuals

Presence effects apply only to the avatar and its floor glow. Name tags and
speech bubbles remain fully readable.

- Active: neutral character treatment.
- Focus: subtle cyan floor glow.
- Meeting: subtle violet-blue floor glow.
- Break: subtle warm amber floor glow.
- Away: reduced avatar opacity, light desaturation, and moon status badge.

Effects are static and restrained. They do not add animation or change player
movement.

## Shared Presence Metadata

`member-presence.ts` provides pure, testable presence behavior:

- status rank: Active, Focus, Meeting, Break, Away
- current-user-first stable member sorting
- compact non-zero status summaries
- semantic avatar visual state, including whether the avatar is dimmed

Members with the same rank retain their incoming order to prevent visual
jitter during realtime updates.

## Sidebar

The member list sorts the current user first, then uses status rank. A compact
summary appears below the list heading, for example:

`2 Active · 1 Focus · 1 Away`

Only statuses with at least one member appear. Labels use the existing
Thai/English translation system. Member cards keep their mini avatar, role,
focus text, current-user marker, and two-line task clamp.

The room badge and card badge share one small status-badge component so their
icons, labels, and tones remain consistent.

## Scope

No companions, pets, backend changes, Prisma changes, database migrations,
Socket.io event changes, room capacity changes, or movement/collision changes
are included.

## Testing

Unit tests cover status rank, current-user-first stable sorting, non-zero
summaries in status order, and the away dimmed visual state. Existing room,
realtime, movement, chat, idle, localization, lint, typecheck, server
typecheck, and production build checks remain required.
