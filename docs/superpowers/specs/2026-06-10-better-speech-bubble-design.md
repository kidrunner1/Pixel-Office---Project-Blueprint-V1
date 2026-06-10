# EP3 Better Speech Bubble Design

## Goal

Turn the existing speech bubble into a recognizable Pixel Office interaction
without changing how chat messages arrive, how long bubbles live, or how room
state works.

## Bubble Composition

The bubble uses a warm paper surface, a dark two-pixel outline, an inset pixel
edge, and a stepped pointer tail. It remains a single line and is capped at 160
pixels so it stays secondary to the room. Padding is increased enough for Thai
and English text to remain readable at the existing map scale.

The positioning wrapper keeps horizontal centering separate from the animated
bubble. This prevents the lifecycle animation from overriding the transform
used to center the bubble above the character. The existing overlay layer stays
above furniture, players, name tags, and room objects.

## Message Formatting

Bubble display text is normalized to one line by collapsing whitespace. It is
limited to 40 visible grapheme clusters, including the ellipsis. Grapheme-aware
segmentation avoids cutting Thai vowel and tone-mark combinations in the
middle. The chat panel and socket payload retain the complete original message.

## Motion

Each bubble runs one four-second CSS lifecycle matching the existing store
duration. It fades in with a short upward settle, remains readable, then fades
and rises slightly before the store removes it. The bubble uses `expiresAt` as
its React key so a new message restarts the lifecycle animation.

Reduced-motion mode removes translation and scale while retaining a restrained
opacity-only lifecycle.

## Testing

Unit tests cover whitespace normalization, the one-line 40-grapheme limit,
ellipsis behavior, and Thai grapheme preservation. Existing speech bubble store
tests continue to protect the four-second lifetime.

