import { randomUUID } from "node:crypto";

import {
  MAIN_OFFICE_HEIGHT,
  MAIN_OFFICE_WIDTH,
} from "../src/features/office/maps/main-office-map.ts";
import { isBlockedOfficePosition } from "../src/features/office/utils/movement.ts";
import type {
  JoinRoomPayload,
  LeaveRoomPayload,
  PlayerMovePayload,
  SendMessagePayload,
  SocketChatMessage,
  SocketRoomMember,
  SocketRoomState,
} from "./socket-types.ts";

export const SOCKET_ROOM_MAX_USERS = 4;
export const SOCKET_ROOM_WIDTH = MAIN_OFFICE_WIDTH;
export const SOCKET_ROOM_HEIGHT = MAIN_OFFICE_HEIGHT;

type StoredRoomMember = SocketRoomMember & {
  socketId: string;
};

export type JoinRoomInput = JoinRoomPayload & {
  socketId: string;
};

export type JoinRoomResult =
  | {
      ok: true;
      isNewMember: boolean;
      member: SocketRoomMember;
      roomState: SocketRoomState;
    }
  | {
      ok: false;
      reason: "room_full";
      message: string;
    };

export type LeaveRoomResult = {
  member: SocketRoomMember;
  roomState: SocketRoomState;
};

export type MovePlayerResult =
  | {
      ok: true;
      member: SocketRoomMember;
      roomState: SocketRoomState;
    }
  | {
      ok: false;
      reason:
        | "blocked_tile"
        | "invalid_position"
        | "not_in_room"
        | "position_occupied";
      message: string;
    };

export type CreateMessageResult =
  | {
      ok: true;
      message: SocketChatMessage;
    }
  | {
      ok: false;
      reason: "invalid_message" | "not_in_room";
      message: string;
    };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function isWithinRoomBounds(positionX: number, positionY: number): boolean {
  return (
    positionX >= 0 &&
    positionX < SOCKET_ROOM_WIDTH &&
    positionY >= 0 &&
    positionY < SOCKET_ROOM_HEIGHT
  );
}

function toPublicMember(member: StoredRoomMember): SocketRoomMember {
  return {
    userId: member.userId,
    name: member.name,
    roomId: member.roomId,
    positionX: member.positionX,
    positionY: member.positionY,
    avatar: member.avatar ?? null,
    status: member.status,
    todayTask: member.todayTask,
  };
}

export function createSocketRoomState() {
  const rooms = new Map<string, Map<string, StoredRoomMember>>();
  const socketMembers = new Map<string, LeaveRoomPayload>();

  function getOrCreateRoom(roomId: string): Map<string, StoredRoomMember> {
    const existingRoom = rooms.get(roomId);

    if (existingRoom) {
      return existingRoom;
    }

    const room = new Map<string, StoredRoomMember>();
    rooms.set(roomId, room);

    return room;
  }

  function getRoomState(roomId: string): SocketRoomState {
    const room = rooms.get(roomId);

    return {
      roomId,
      members: room ? Array.from(room.values()).map(toPublicMember) : [],
    };
  }

  function joinRoom(input: JoinRoomInput): JoinRoomResult {
    const room = getOrCreateRoom(input.roomId);
    const existingMember = room.get(input.userId);
    const isNewMember = !existingMember;

    if (isNewMember && room.size >= SOCKET_ROOM_MAX_USERS) {
      return {
        ok: false,
        reason: "room_full",
        message: "Office is full",
      };
    }

    if (existingMember) {
      socketMembers.delete(existingMember.socketId);
    }

    const member: StoredRoomMember = {
      socketId: input.socketId,
      userId: input.userId,
      name: input.name.trim() || "Guest",
      roomId: input.roomId,
      positionX: clamp(input.positionX, 0, SOCKET_ROOM_WIDTH - 1),
      positionY: clamp(input.positionY, 0, SOCKET_ROOM_HEIGHT - 1),
      avatar: input.avatar ?? null,
      status: input.status,
      todayTask: input.todayTask,
    };

    room.set(input.userId, member);
    socketMembers.set(input.socketId, {
      roomId: input.roomId,
      userId: input.userId,
    });

    return {
      ok: true,
      isNewMember,
      member: toPublicMember(member),
      roomState: getRoomState(input.roomId),
    };
  }

  function leaveRoom(input: LeaveRoomPayload): LeaveRoomResult | null {
    const room = rooms.get(input.roomId);
    const member = room?.get(input.userId);

    if (!room || !member) {
      return null;
    }

    room.delete(input.userId);
    socketMembers.delete(member.socketId);

    const roomState = getRoomState(input.roomId);

    if (room.size === 0) {
      rooms.delete(input.roomId);
    }

    return {
      member: toPublicMember(member),
      roomState,
    };
  }

  function removeSocketMember(socketId: string): LeaveRoomResult | null {
    const member = socketMembers.get(socketId);

    if (!member) {
      return null;
    }

    return leaveRoom(member);
  }

  function removeSocket(socketId: string): SocketRoomState[] {
    const result = removeSocketMember(socketId);

    return result ? [result.roomState] : [];
  }

  function movePlayer(input: PlayerMovePayload): MovePlayerResult {
    const room = rooms.get(input.roomId);
    const member = room?.get(input.userId);

    if (!room || !member) {
      return {
        ok: false,
        reason: "not_in_room",
        message: "Join the room before moving.",
      };
    }

    if (!isWithinRoomBounds(input.positionX, input.positionY)) {
      return {
        ok: false,
        reason: "invalid_position",
        message: "Position is outside the office map.",
      };
    }

    if (isBlockedOfficePosition({ x: input.positionX, y: input.positionY })) {
      return {
        ok: false,
        reason: "blocked_tile",
        message: "That path is blocked.",
      };
    }

    const isOccupied = Array.from(room.values()).some(
      (roomMember) =>
        roomMember.userId !== input.userId &&
        roomMember.positionX === input.positionX &&
        roomMember.positionY === input.positionY,
    );

    if (isOccupied) {
      return {
        ok: false,
        reason: "position_occupied",
        message: "That tile is occupied.",
      };
    }

    const updatedMember: StoredRoomMember = {
      ...member,
      positionX: input.positionX,
      positionY: input.positionY,
    };

    room.set(input.userId, updatedMember);

    return {
      ok: true,
      member: toPublicMember(updatedMember),
      roomState: getRoomState(input.roomId),
    };
  }

  function createMessage(input: SendMessagePayload): CreateMessageResult {
    const content = input.content.trim();
    const room = rooms.get(input.roomId);

    if (!room?.has(input.userId)) {
      return {
        ok: false,
        reason: "not_in_room",
        message: "Join the room before sending a message.",
      };
    }

    if (!content || content.length > 500) {
      return {
        ok: false,
        reason: "invalid_message",
        message: "Message must be between 1 and 500 characters.",
      };
    }

    return {
      ok: true,
      message: {
        id: randomUUID(),
        roomId: input.roomId,
        userId: input.userId,
        userName: input.userName.trim() || "Guest",
        content,
        createdAt: new Date().toISOString(),
      },
    };
  }

  return {
    createMessage,
    getRoomState,
    joinRoom,
    leaveRoom,
    movePlayer,
    removeSocket,
    removeSocketMember,
  };
}
