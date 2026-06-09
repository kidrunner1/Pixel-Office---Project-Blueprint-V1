# Phase 16: Art Polish and Room Composition

## Direction

The office becomes an Asymmetric Studio Hub: a compact, believable developer
studio with clustered workstations, an informal meeting area, a small lounge,
and admin equipment pushed toward the east wall.

## Composition

- Work zone: two staggered desks and chairs occupy the north-west without
  blocking the four existing join positions.
- Meeting zone: the table sits below the main walking bend, with offset chairs
  and enough surrounding floor to keep the area readable.
- Printer/admin zone: printer, dispenser, filing cabinet, and shelf form a
  compact service edge on the right.
- Lounge zone: sofa, coffee table, coffee machine, lamp, and plant create a
  dense lower-right corner without expanding into the central path.
- Storage/decor: wall art and plants soften boundaries and fill visual gaps.

The main route bends from the upper room through the open center and around the
meeting and lounge clusters. It should feel organic rather than corridor-like.

## Depth And Rendering

Object depth uses each object's floor contact point. Player depth uses the
player's tile footprint. Furniture contact shadows sit below sprites, while
name tags and speech bubbles remain in a dedicated high UI layer.

The floor uses nearly invisible tile seams, subtle alternating tone, and warm
ambient overlays. The perimeter wall receives stronger top and bottom edges so
the room reads as an enclosed interior.

## Character Integration

The current directional avatar remains unchanged. A compact contact shadow
anchors each character to the floor. During a pending movement, the character
gets a two-pixel stepping motion while the existing 160ms transform carries it
between tile coordinates. Reduced-motion users receive the transform update
without the stepping animation.

## Constraints

Auth, database, Prisma, room capacity, Socket.io events, chat behavior,
movement authority, and collision algorithms remain unchanged. Only layout
data, visual metadata, and presentation styles change.

## Verification

Automated tests cover clear join positions, a readable central route, zone
placement, collision behavior, and Y-based depth ordering. Existing type,
lint, server, test, and production build checks remain required.
