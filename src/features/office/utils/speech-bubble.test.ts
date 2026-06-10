import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatSpeechBubbleMessage,
  SPEECH_BUBBLE_MAX_GRAPHEMES,
} from "./speech-bubble.ts";

describe("speech bubble formatting", () => {
  it("normalizes whitespace into one readable line", () => {
    assert.equal(
      formatSpeechBubbleMessage("  Ready\n  for\t review  "),
      "Ready for review",
    );
  });

  it("keeps messages within the display limit unchanged", () => {
    const message = "Deploy is ready";

    assert.equal(formatSpeechBubbleMessage(message), message);
  });

  it("limits long messages to 40 graphemes including the ellipsis", () => {
    const message = "a".repeat(SPEECH_BUBBLE_MAX_GRAPHEMES + 5);
    const formattedMessage = formatSpeechBubbleMessage(message);

    assert.equal(
      formattedMessage,
      `${"a".repeat(SPEECH_BUBBLE_MAX_GRAPHEMES - 1)}…`,
    );
    assert.equal(Array.from(formattedMessage).length, 40);
  });

  it("does not split Thai combining marks from their base character", () => {
    const thaiGrapheme = "ก้";
    const message = thaiGrapheme.repeat(
      SPEECH_BUBBLE_MAX_GRAPHEMES + 1,
    );

    assert.equal(
      formatSpeechBubbleMessage(message),
      `${thaiGrapheme.repeat(SPEECH_BUBBLE_MAX_GRAPHEMES - 1)}…`,
    );
  });
});
