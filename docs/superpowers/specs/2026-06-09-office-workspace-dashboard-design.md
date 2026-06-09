# Office Workspace Dashboard Design

## Goal

Keep the office room and chat visible together so conversation feels embedded
in the shared space instead of living below it.

## Desktop Layout

The authenticated office fills `100dvh` and does not use document scrolling.
A compact top bar spans the viewport. Below it, a three-column workspace uses:

- A 280px left tool sidebar with internally scrollable tabs
- A flexible center stage that gives the office map priority
- A 340px right chat dock with an internal message scroller and pinned input

The center stage may scroll horizontally and vertically inside its own region
when the map is larger than the available viewport.

## Left Sidebar

The sidebar has four tabs:

- Profile: name, role, room status, and current position
- Today: status and task controls
- Members: current online members and seat count
- Customize: compact avatar preview and controls

Only one tool is visible at a time to control density.

## Chat

On desktop, chat remains open as a dock. Its message list grows into the
available height and scrolls internally. Its composer remains at the bottom.

On smaller screens, chat becomes a bottom drawer capped below half the
viewport. The office remains visible behind and above it. A persistent chat
button controls the drawer and displays unread count.

## Responsive Behavior

Below the desktop breakpoint, the left sidebar becomes an overlay drawer
opened from the top bar. The center stage remains the primary content.
Backdrop buttons close drawers without changing room or chat state.

## Constraints

No API, auth, database, Prisma, socket event, room capacity, collision, or
movement behavior changes. Existing Zustand stores remain the state source.

## Verification

Run TypeScript, ESLint, server TypeScript, all existing tests, and the
production build. Manually verify two-browser movement/chat when a database and
socket server are available.
