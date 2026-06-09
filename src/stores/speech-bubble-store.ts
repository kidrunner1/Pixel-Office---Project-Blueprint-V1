"use client";

import { create } from "zustand";

export type SpeechBubble = {
  expiresAt: number;
  message: string;
};

type SpeechBubbleState = {
  bubblesByUserId: Record<string, SpeechBubble>;
  clearExpiredBubbles: (now?: number) => void;
  showBubble: (userId: string, message: string) => void;
};

const SPEECH_BUBBLE_DURATION_MS = 4_000;

function removeExpiredBubbles(
  bubblesByUserId: Record<string, SpeechBubble>,
  now: number,
): Record<string, SpeechBubble> {
  return Object.fromEntries(
    Object.entries(bubblesByUserId).filter(
      ([, bubble]) => bubble.expiresAt > now,
    ),
  );
}

export const useSpeechBubbleStore = create<SpeechBubbleState>((set) => ({
  bubblesByUserId: {},
  clearExpiredBubbles: (now = Date.now()) => {
    set((state) => ({
      bubblesByUserId: removeExpiredBubbles(
        state.bubblesByUserId,
        now,
      ),
    }));
  },
  showBubble: (userId, message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    set((state) => ({
      bubblesByUserId: {
        ...state.bubblesByUserId,
        [userId]: {
          expiresAt: Date.now() + SPEECH_BUBBLE_DURATION_MS,
          message: trimmedMessage,
        },
      },
    }));

    const cleanupTimer = setTimeout(() => {
      set((state) => ({
        bubblesByUserId: removeExpiredBubbles(
          state.bubblesByUserId,
          Date.now(),
        ),
      }));
    }, SPEECH_BUBBLE_DURATION_MS);

    if (typeof cleanupTimer === "object") {
      cleanupTimer.unref();
    }
  },
}));
