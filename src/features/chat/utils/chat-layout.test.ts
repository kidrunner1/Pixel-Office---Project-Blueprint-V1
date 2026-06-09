import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  COLLAPSED_DESKTOP_CHAT_WIDTH,
  EXPANDED_DESKTOP_CHAT_WIDTH,
  getDesktopChatWidth,
} from "./chat-layout.ts";

describe("chat layout", () => {
  it("uses compact expanded and collapsed desktop widths", () => {
    assert.equal(EXPANDED_DESKTOP_CHAT_WIDTH, 304);
    assert.equal(COLLAPSED_DESKTOP_CHAT_WIDTH, 44);
    assert.equal(getDesktopChatWidth(true), 304);
    assert.equal(getDesktopChatWidth(false), 44);
  });
});
