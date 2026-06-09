"use client";

import { create } from "zustand";

import {
  getMyAvatar,
  updateMyAvatar,
} from "@/features/avatar/api/avatar-api";
import type { AvatarConfig, UpdateAvatarInput } from "@/types/avatar";

type AvatarState = {
  avatar: AvatarConfig | null;
  isLoading: boolean;
  error: string | null;
  fetchAvatar: () => Promise<AvatarConfig | null>;
  updateAvatar: (input: UpdateAvatarInput) => Promise<AvatarConfig>;
  setAvatar: (avatar: AvatarConfig) => void;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Unable to load avatar settings.";
}

export const useAvatarStore = create<AvatarState>((set) => ({
  avatar: null,
  isLoading: false,
  error: null,
  fetchAvatar: async () => {
    set({ isLoading: true, error: null });

    try {
      const avatar = await getMyAvatar();
      set({ avatar });
      return avatar;
    } catch (error) {
      set({ error: getErrorMessage(error) });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  updateAvatar: async (input) => {
    set({ isLoading: true, error: null });

    try {
      const avatar = await updateMyAvatar(input);
      set({ avatar });
      return avatar;
    } catch (error) {
      const message = getErrorMessage(error);
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },
  setAvatar: (avatar) => {
    set({ avatar, error: null });
  },
}));
