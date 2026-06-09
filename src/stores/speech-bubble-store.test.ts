import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import { useSpeechBubbleStore } from "./speech-bubble-store.ts";

describe("speech bubble store", () => {
  beforeEach(() => {
    useSpeechBubbleStore.setState({
      bubblesByUserId: {},
    });
  });

  it("shows the latest message for a user", () => {
    useSpeechBubbleStore.getState().showBubble("user-1", "Hello team");
    useSpeechBubbleStore.getState().showBubble("user-1", "New update");

    const bubble =
      useSpeechBubbleStore.getState().bubblesByUserId["user-1"];

    assert.equal(bubble.message, "New update");
    assert.equal(bubble.expiresAt > Date.now(), true);
  });

  it("clears only expired bubbles", () => {
    useSpeechBubbleStore.setState({
      bubblesByUserId: {
        expired: {
          message: "Old message",
          expiresAt: 100,
        },
        active: {
          message: "Current message",
          expiresAt: 300,
        },
      },
    });

    useSpeechBubbleStore.getState().clearExpiredBubbles(200);

    const bubbles = useSpeechBubbleStore.getState().bubblesByUserId;

    assert.equal(bubbles.expired, undefined);
    assert.equal(bubbles.active?.message, "Current message");
  });
});
