"use client";

import { create } from "zustand";

import type { SocketChatMessage } from "@/types/socket";

type ChatState = {
  messages: SocketChatMessage[];
  unreadCount: number;
  isOpen: boolean;
  addMessage: (message: SocketChatMessage) => void;
  clearMessages: () => void;
  setOpen: (isOpen: boolean) => void;
  resetUnread: () => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  unreadCount: 0,
  isOpen: false,
  addMessage: (message) => {
    const { isOpen, messages, unreadCount } = get();
    const messageExists = messages.some(
      (existingMessage) => existingMessage.id === message.id,
    );

    if (messageExists) {
      return;
    }

    set({
      messages: [...messages, message],
      unreadCount: isOpen ? unreadCount : unreadCount + 1,
    });
  },
  clearMessages: () => {
    set({
      messages: [],
      unreadCount: 0,
    });
  },
  setOpen: (isOpen) => {
    set({
      isOpen,
      unreadCount: isOpen ? 0 : get().unreadCount,
    });
  },
  resetUnread: () => {
    set({ unreadCount: 0 });
  },
}));
