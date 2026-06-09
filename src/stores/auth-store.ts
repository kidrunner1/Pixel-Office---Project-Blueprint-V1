"use client";

import { create } from "zustand";

import { getCurrentUser, logoutUser } from "@/features/auth/api/auth-api";
import type { SafeUser } from "@/types/user";

type AuthState = {
  user: SafeUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: SafeUser) => void;
  clearUser: () => void;
  fetchCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: (user) => {
    set({
      user,
      isAuthenticated: true,
    });
  },
  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
  fetchCurrentUser: async () => {
    set({ isLoading: true });

    try {
      const user = await getCurrentUser();

      set({
        user,
        isAuthenticated: Boolean(user),
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true });

    try {
      await logoutUser();
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
