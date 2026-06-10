"use client";

import { getSocketClient } from "@/lib/socket/socket-client";
import type { JoinRoomPayload } from "@/types/socket";
import type { RoomMemberView } from "@/types/room";

export function buildSocketPresencePayload(
  currentUserName: string,
  member: RoomMemberView,
): JoinRoomPayload {
  return {
    roomId: member.roomId,
    userId: member.userId,
    name: currentUserName,
    positionX: member.positionX,
    positionY: member.positionY,
    avatar: member.avatar,
    status: member.status,
    todayTask: member.todayTask,
  };
}

export function syncSocketPresence(
  currentUserName: string,
  member: RoomMemberView,
): boolean {
  const socket = getSocketClient();

  if (!socket?.connected) {
    return false;
  }

  socket.emit(
    "join_room",
    buildSocketPresencePayload(currentUserName, member),
  );

  return true;
}
