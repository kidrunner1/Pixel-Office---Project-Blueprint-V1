import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

import { useChatStore } from "./chat-store.ts";
import type { SocketChatMessage } from "@/types/socket";

function createMessage(id: string): SocketChatMessage {
  return {
    id,
    roomId: "room-1",
    userId: `user-${id}`,
    userName: `User ${id}`,
    content: `Message ${id}`,
    createdAt: "2026-01-01T00:00:00.000Z",
  };
}

describe("chat store", () => {
  beforeEach(() => {
    useChatStore.setState({
      messages: [],
      unreadCount: 0,
      isOpen: false,
    });
  });

  it("adds incoming messages and counts unread messages while closed", () => {
    useChatStore.getState().addMessage(createMessage("1"));
    useChatStore.getState().addMessage(createMessage("2"));

    const state = useChatStore.getState();

    assert.equal(state.messages.length, 2);
    assert.equal(state.unreadCount, 2);
  });

  it("does not add duplicate message ids", () => {
    useChatStore.getState().addMessage(createMessage("1"));
    useChatStore.getState().addMessage(createMessage("1"));

    const state = useChatStore.getState();

    assert.equal(state.messages.length, 1);
    assert.equal(state.unreadCount, 1);
  });

  it("resets unread count when opened", () => {
    useChatStore.getState().addMessage(createMessage("1"));
    useChatStore.getState().setOpen(true);
    useChatStore.getState().addMessage(createMessage("2"));

    const state = useChatStore.getState();

    assert.equal(state.isOpen, true);
    assert.equal(state.unreadCount, 0);
    assert.equal(state.messages.length, 2);
  });

  it("counts unread messages after chat is collapsed", () => {
    useChatStore.getState().setOpen(true);
    useChatStore.getState().setOpen(false);
    useChatStore.getState().addMessage(createMessage("1"));

    const state = useChatStore.getState();

    assert.equal(state.isOpen, false);
    assert.equal(state.unreadCount, 1);
  });

  it("can clear messages", () => {
    useChatStore.getState().addMessage(createMessage("1"));
    useChatStore.getState().clearMessages();

    const state = useChatStore.getState();

    assert.equal(state.messages.length, 0);
    assert.equal(state.unreadCount, 0);
  });
});
