# EP1 UI Refinement Design

## Goal

Increase the office room's visual priority while making the surrounding
workspace chrome denser, clearer, and easier to scan.

## Top Bar

Reduce the desktop bar from 64px to 52px. Keep the Pixel Office identity, room
name, seat count, realtime state, signed-in user, and logout action. Status
indicators use shorter labels and reduced padding.

## Sidebar

Reduce the desktop sidebar from 280px to 252px. Tabs use compact CSS icons and
a quieter selected state.

The Profile tab contains two cards:

1. One summary card with name, role, status, office state, and position
2. One Today’s Focus card with the current task

The Today, Members, and Customize tabs retain their existing behavior with
tighter spacing.

## Center Stage

The center remains flexible and receives the width reclaimed from both side
panels. Outer padding decreases slightly so the room dominates the workspace.

## Chat

Expanded desktop chat is 304px wide. It has a compact header, a larger message
viewport, and a slightly taller composer.

Collapsed desktop chat becomes a 44px rail. The rail remains visible and shows
a chat symbol, connection state, and unread count. Selecting the rail restores
the full panel and expands unread messages.

Mobile chat remains the existing bottom drawer.

## Constraints

This is presentation-only. Auth, Socket.io behavior, database access,
movement, collision, speech bubbles, avatar updates, status updates, and room
capacity remain unchanged.
