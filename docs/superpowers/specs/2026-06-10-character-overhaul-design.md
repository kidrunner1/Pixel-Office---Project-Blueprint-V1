# EP2 Character Overhaul Design

## Goal

Make Pixel Office avatars read as small pixel-art office workers that visually
belong beside the room furniture while preserving the current avatar settings,
direction system, movement behavior, and realtime contracts.

## Visual Structure

The avatar remains CSS and React only. A single renderer composes focused pixel
parts for hair, face, torso, arms, legs, shoes, and accessories. Each part uses
a four-pixel visual rhythm, a dark outline, a lit edge, and a shaded edge so the
character has the same dimensional language as the office scene.

The base character uses a compact 72 by 112 pixel stage. The office version is
scaled into a 64 by 96 pixel footprint, while the customizer uses the same
renderer at a larger scale. The head remains expressive, but the torso and legs
gain enough height to read as an office worker rather than a block figure.

## Hair And Direction

- `short`: compact cap with a clipped fringe and short sideburn.
- `bob`: wider rounded silhouette with long side panels and a back-hair panel.
- `spiky`: asymmetric top spikes with a shorter side profile.
- `down`: both eyes or glasses and the configured mouth are visible.
- `up`: the face is hidden and the back hair covers more of the head.
- `left` and `right`: one eye, nose pixel, side hair, and offset arm create a
  clear side profile. The right view mirrors the left view.

## Clothing And Accessories

Shirt, pants, skin, face, hair, and accessory configuration continues to use
the existing `AvatarConfig` fields. Shirt types retain recognizable details:
basic has a collar highlight, hoodie has a hood/collar shape, and jacket has a
center seam with small buttons. Pants remain visibly separate from the shirt,
with shorts exposing a small leg pixel. Shoes have a toe extension and deep
shadow.

## Office Integration

`OfficePlayer` keeps the existing 160 ms position transition and z-index
behavior. The floor shadow remains outside the animated body so it stays fixed
to the floor. While `isWalking` is true, the body uses a two-frame vertical bob
and the legs alternate by two pixels. Name tags and speech bubbles retain their
existing overlay layer and remain above the player.

Reduced-motion users receive the existing position update without body bobbing
or alternating legs.

## Testing

A small pure avatar-pose utility describes direction mirroring, face
visibility, and hair silhouette. Unit tests verify all directions and ensure
the three hair styles produce distinct silhouettes. Existing movement tests
continue to protect direction mapping and movement logic.

