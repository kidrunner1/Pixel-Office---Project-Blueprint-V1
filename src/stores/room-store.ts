"use client";

import { create } from "zustand";

import {
  getDefaultRoom,
  joinDefaultRoom,
  leaveDefaultRoom,
  RoomApiError,
  updateMyRoomMember,
} from "@/features/room/api/room-api";
import {
  applyRealtimeMemberToRoom,
  applyRealtimeRoomStateToRoom,
} from "@/features/room/utils/realtime-room-state";
import type { UpdateRoomMemberInput } from "@/lib/validations/room";
import type { RoomMemberView, RoomView } from "@/types/room";
import type { SocketRoomMember, SocketRoomState } from "@/types/socket";

type RoomState = {
  room: RoomView | null;
  myMember: RoomMemberView | null;
  isLoading: boolean;
  error: string | null;
  isFull: boolean;
  fetchRoom: (currentUserId: string) => Promise<void>;
  joinRoom: (currentUserId: string) => Promise<void>;
  leaveRoom: (currentUserId: string) => Promise<void>;
  updateMyMember: (
    currentUserId: string,
    input: UpdateRoomMemberInput,
  ) => Promise<void>;
  applyRealtimeRoomState: (
    currentUserId: string,
    roomState: SocketRoomState,
  ) => void;
  updateRealtimeMemberPosition: (
    currentUserId: string,
    member: SocketRoomMember,
  ) => void;
  setRoom: (room: RoomView, currentUserId: string) => void;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Unable to load the office room.";
}

function getMyActiveMember(
  room: RoomView,
  currentUserId: string,
): RoomMemberView | null {
  return (
    room.roomMembers.find(
      (member) => member.userId === currentUserId && member.isOnline,
    ) ?? null
  );
}

function replaceRoomMember(
  room: RoomView,
  updatedMember: RoomMemberView,
): RoomView {
  const memberExists = room.roomMembers.some(
    (member) => member.id === updatedMember.id,
  );

  return {
    ...room,
    roomMembers: memberExists
      ? room.roomMembers.map((member) =>
          member.id === updatedMember.id ? updatedMember : member,
        )
      : [...room.roomMembers, updatedMember],
  };
}

export const useRoomStore = create<RoomState>((set, get) => ({
  room: null,
  myMember: null,
  isLoading: false,
  error: null,
  isFull: false,
  fetchRoom: async (currentUserId) => {
    set({ isLoading: true, error: null, isFull: false });

    try {
      const room = await getDefaultRoom();
      set({
        room,
        myMember: getMyActiveMember(room, currentUserId),
      });
    } catch (error) {
      set({ error: getErrorMessage(error) });
    } finally {
      set({ isLoading: false });
    }
  },
  joinRoom: async (currentUserId) => {
    set({ isLoading: true, error: null, isFull: false });

    try {
      await joinDefaultRoom();
      const room = await getDefaultRoom();
      set({
        room,
        myMember: getMyActiveMember(room, currentUserId),
      });
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isFull: error instanceof RoomApiError && error.status === 409,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  leaveRoom: async (currentUserId) => {
    set({ isLoading: true, error: null, isFull: false });

    try {
      await leaveDefaultRoom();
      const room = await getDefaultRoom();
      set({
        room,
        myMember: getMyActiveMember(room, currentUserId),
      });
    } catch (error) {
      set({ error: getErrorMessage(error) });
    } finally {
      set({ isLoading: false });
    }
  },
  updateMyMember: async (currentUserId, input) => {
    set({ isLoading: true, error: null });

    try {
      const updatedMember = await updateMyRoomMember(input);
      const currentRoom = get().room;
      const room = currentRoom
        ? replaceRoomMember(currentRoom, updatedMember)
        : await getDefaultRoom();

      set({
        room,
        myMember: getMyActiveMember(room, currentUserId),
      });
    } catch (error) {
      set({ error: getErrorMessage(error) });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  applyRealtimeRoomState: (currentUserId, roomState) => {
    const currentRoom = get().room;

    if (!currentRoom) {
      return;
    }

    const room = applyRealtimeRoomStateToRoom(
      currentRoom,
      currentUserId,
      roomState,
    );

    set({
      room,
      myMember: getMyActiveMember(room, currentUserId),
    });
  },
  updateRealtimeMemberPosition: (currentUserId, member) => {
    const currentRoom = get().room;

    if (!currentRoom) {
      return;
    }

    const room = applyRealtimeMemberToRoom(
      currentRoom,
      currentUserId,
      member,
    );

    set({
      room,
      myMember: getMyActiveMember(room, currentUserId),
    });
  },
  setRoom: (room, currentUserId) => {
    set({
      room,
      myMember: getMyActiveMember(room, currentUserId),
      error: null,
      isFull: false,
    });
  },
}));
