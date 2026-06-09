import type { RoomMemberView, RoomView } from "@/types/room";
import type { SocketRoomMember, SocketRoomState } from "@/types/socket";

const REALTIME_USER_EMAIL = "";
const REALTIME_USER_ROLE = "MEMBER";
const REALTIME_USER_CREATED_AT = new Date(0);

function getRealtimeMemberId(roomId: string, userId: string): string {
  return `realtime:${roomId}:${userId}`;
}

function dedupeSocketMembers(
  members: SocketRoomMember[],
): Map<string, SocketRoomMember> {
  const membersByUserId = new Map<string, SocketRoomMember>();

  for (const member of members) {
    if (!membersByUserId.has(member.userId)) {
      membersByUserId.set(member.userId, member);
    }
  }

  return membersByUserId;
}

function createRealtimeRoomMember(
  roomId: string,
  member: SocketRoomMember,
): RoomMemberView {
  return {
    id: getRealtimeMemberId(roomId, member.userId),
    userId: member.userId,
    roomId,
    positionX: member.positionX,
    positionY: member.positionY,
    status: member.status,
    todayTask: member.todayTask,
    isOnline: true,
    avatar: member.avatar ?? null,
    user: {
      id: member.userId,
      name: member.name,
      email: REALTIME_USER_EMAIL,
      role: REALTIME_USER_ROLE,
      createdAt: REALTIME_USER_CREATED_AT,
    },
  };
}

function applyRealtimeMember(
  member: RoomMemberView,
  realtimeMember: SocketRoomMember,
): RoomMemberView {
  return {
    ...member,
    positionX: realtimeMember.positionX,
    positionY: realtimeMember.positionY,
    status: realtimeMember.status,
    todayTask: realtimeMember.todayTask,
    isOnline: true,
    avatar: realtimeMember.avatar ?? member.avatar,
    user: {
      ...member.user,
      name: realtimeMember.name || member.user.name,
    },
  };
}

function dedupeRoomMembers(members: RoomMemberView[]): RoomMemberView[] {
  const seenUserIds = new Set<string>();
  const dedupedMembers: RoomMemberView[] = [];

  for (const member of members) {
    if (seenUserIds.has(member.userId)) {
      continue;
    }

    seenUserIds.add(member.userId);
    dedupedMembers.push(member);
  }

  return dedupedMembers;
}

export function applyRealtimeRoomStateToRoom(
  room: RoomView,
  currentUserId: string,
  socketRoomState: SocketRoomState,
): RoomView {
  if (socketRoomState.roomId !== room.id) {
    return room;
  }

  const realtimeMembersByUserId = dedupeSocketMembers(socketRoomState.members);
  const updatedMembers = room.roomMembers.map((member) => {
    const realtimeMember = realtimeMembersByUserId.get(member.userId);

    if (member.userId === currentUserId) {
      return member;
    }

    if (!realtimeMember) {
      return {
        ...member,
        isOnline: false,
      };
    }

    return applyRealtimeMember(member, realtimeMember);
  });

  const existingUserIds = new Set(updatedMembers.map((member) => member.userId));
  const newRealtimeMembers = Array.from(realtimeMembersByUserId.values())
    .filter(
      (realtimeMember) =>
        realtimeMember.userId !== currentUserId &&
        !existingUserIds.has(realtimeMember.userId),
    )
    .map((realtimeMember) =>
      createRealtimeRoomMember(room.id, realtimeMember),
    );

  return {
    ...room,
    roomMembers: dedupeRoomMembers([
      ...updatedMembers,
      ...newRealtimeMembers,
    ]),
  };
}

export function applyRealtimeMemberToRoom(
  room: RoomView,
  currentUserId: string,
  realtimeMember: SocketRoomMember,
): RoomView {
  if (realtimeMember.roomId !== room.id || realtimeMember.userId === currentUserId) {
    return room;
  }

  const existingMember = room.roomMembers.find(
    (member) => member.userId === realtimeMember.userId,
  );

  if (!existingMember) {
    return {
      ...room,
      roomMembers: dedupeRoomMembers([
        ...room.roomMembers,
        createRealtimeRoomMember(room.id, realtimeMember),
      ]),
    };
  }

  return {
    ...room,
    roomMembers: dedupeRoomMembers(
      room.roomMembers.map((member) =>
        member.userId === realtimeMember.userId
          ? applyRealtimeMember(member, realtimeMember)
          : member,
      ),
    ),
  };
}
